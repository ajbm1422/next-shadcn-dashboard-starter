'use client';

import { create, fromJson, toJsonString, type JsonValue } from '@bufbuild/protobuf';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ChatRequestSchema,
  ChatResponseSchema,
  type Channel,
  type ChatResponse,
  type ChatSnapshot,
  type Content
} from '@/gen/infinder/v1/infinder_pb';
import { loadChatRoom, loadChatSnapshot } from '@/lib/infinder-client';
import { assistantEventSchema } from '../schemas/assistant-event.schema';
import type {
  ArtifactState,
  AssistantEvent,
  AssistantStreamStatus,
  ChatMessage as UIChatMessage,
  ToolCallState
} from '../types/assistant.types';
import type { AppArtifact, CreatorRow, VideoItem } from '../schemas/artifact.schema';

const DEFAULT_ASSISTANT_ENDPOINT =
  process.env.NEXT_PUBLIC_ASSISTANT_STREAM_ENDPOINT || '/api/ai/chat-stream';
const MOCK_ASSISTANT_ENDPOINT = '/api/assistant/mock-chat';
const ROOM_STORAGE_KEY = 'fler_assistant_room_id';
const CLIENT_STORAGE_KEY = 'fler_assistant_client_id';

type RawSseEvent = {
  event: string;
  data: string;
};

type LegacyChatStreamPayload = {
  type?: 'status' | 'delta' | 'final' | 'error';
  message?: string;
  delta?: string;
  response?: JsonValue;
};

function createId(prefix: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}_${crypto.randomUUID()}`;
  }

  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function getStoredValue(key: string) {
  if (typeof window === 'undefined') return '';
  return window.localStorage.getItem(key) || '';
}

function setStoredValue(key: string, value: string) {
  if (typeof window === 'undefined') return;
  if (value) {
    window.localStorage.setItem(key, value);
    return;
  }
  window.localStorage.removeItem(key);
}

function getOrCreateClientId() {
  const stored = getStoredValue(CLIENT_STORAGE_KEY);
  if (stored) return stored;
  const next = createId('client');
  setStoredValue(CLIENT_STORAGE_KEY, next);
  return next;
}

function parseSseBlock(block: string): RawSseEvent | undefined {
  let event = 'message';
  const dataLines: string[] = [];

  for (const line of block.split(/\r?\n/)) {
    if (!line || line.startsWith(':')) continue;

    if (line.startsWith('event:')) {
      event = line.slice(6).trim();
      continue;
    }

    if (line.startsWith('data:')) {
      dataLines.push(line.slice(5).trimStart());
    }
  }

  if (dataLines.length === 0) {
    return undefined;
  }

  return {
    event,
    data: dataLines.join('\n')
  };
}

function parseAssistantEvent(rawEvent: RawSseEvent): AssistantEvent | undefined {
  try {
    const payload = rawEvent.data ? (JSON.parse(rawEvent.data) as unknown) : {};
    const result = assistantEventSchema.safeParse({
      type: rawEvent.event,
      ...(typeof payload === 'object' && payload !== null ? payload : {})
    });

    if (!result.success) {
      console.warn('Invalid assistant stream event', rawEvent.event, result.error.flatten());
      return undefined;
    }

    return result.data;
  } catch (error) {
    console.warn('Failed to parse assistant stream event', rawEvent.event, error);
    return undefined;
  }
}

function parseLegacyPayload(rawEvent: RawSseEvent): LegacyChatStreamPayload | undefined {
  try {
    const payload = rawEvent.data ? (JSON.parse(rawEvent.data) as unknown) : {};
    if (typeof payload !== 'object' || payload === null) return undefined;
    const candidate = payload as LegacyChatStreamPayload;
    if (
      candidate.type === 'status' ||
      candidate.type === 'delta' ||
      candidate.type === 'final' ||
      candidate.type === 'error'
    ) {
      return candidate;
    }
    return undefined;
  } catch (error) {
    console.warn('Failed to parse legacy chat stream payload', rawEvent.event, error);
    return undefined;
  }
}

function numeric(value: bigint | number | string | undefined) {
  return Number(value ?? 0);
}

function safeUrl(value: string | undefined) {
  if (!value) return undefined;

  try {
    return new URL(value).toString();
  } catch {
    return undefined;
  }
}

function cleanSuggestions(suggestions: readonly string[]) {
  return Array.from(
    new Set(
      suggestions
        .map((suggestion) => suggestion.trim())
        .filter(Boolean)
        .map((suggestion) => suggestion.replace(/^[*-]\s*/, ''))
    )
  ).slice(0, 3);
}

function channelTags(channel: Channel) {
  const tags = [
    channel.category || '미분류',
    ...channel.topics
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
  ];

  if (numeric(channel.paidAdvertisingCount) > 0) {
    tags.push('광고 이력');
  }

  return Array.from(new Set(tags)).slice(0, 5);
}

function channelToCreatorRow(channel: Channel): CreatorRow {
  const views = numeric(channel.viewCount);
  const likes = numeric(channel.likeCount);
  const comments = numeric(channel.commentCount);
  const videoCount = Math.max(numeric(channel.videoCount), 1);
  const engagementRate = views > 0 ? ((likes + comments) / views) * 100 : undefined;
  const avgViews = videoCount > 0 ? Math.round(views / videoCount) : undefined;
  const id = channel.id || channel.channelId || channel.name;

  return {
    id,
    name: channel.name || '이름 없음',
    platform: 'youtube',
    handle: channel.channelId ? `@${channel.channelId}` : undefined,
    followers: numeric(channel.subscriberCount),
    avgViews,
    engagementRate,
    score: Math.max(0, Math.min(100, Math.round((numeric(channel.viewCountIncrease7) + 100) / 2))),
    tags: channelTags(channel),
    url: safeUrl(channel.profileUrl)
  };
}

function contentToVideoItem(content: Content): VideoItem {
  return {
    id: content.id,
    title: content.title || '제목 없음',
    thumbnailUrl: safeUrl(content.thumbnailUrl) || 'https://i.ytimg.com/vi/0/hqdefault.jpg',
    channelName: content.channelName || '-',
    views: numeric(content.views),
    publishedAt: content.publishedAt,
    url: `https://www.youtube.com/watch?v=${encodeURIComponent(content.id)}`,
    score: content.velocityScore
  };
}

function artifactsFromChatResponse(response: ChatResponse): AppArtifact[] {
  const artifacts: AppArtifact[] = [];
  const snapshotId = response.resultSnapshot?.id || createId('chat_result');

  if (response.recommendedChannels.length > 0) {
    artifacts.push({
      id: `${snapshotId}_creators`,
      kind: 'creator_table',
      title: response.resultSnapshot?.title || '추천 인플루언서 후보',
      description:
        response.interpretedSearch ||
        response.interpretedCategory ||
        '요청 조건을 기준으로 정리한 후보입니다.',
      rows: response.recommendedChannels.map(channelToCreatorRow)
    });
  }

  if (response.recommendedContents.length > 0) {
    artifacts.push({
      id: `${snapshotId}_videos`,
      kind: 'video_grid',
      title: response.resultSnapshot?.title || '추천 콘텐츠 후보',
      description: '요청 조건과 관련도가 높은 영상입니다.',
      items: response.recommendedContents.map(contentToVideoItem)
    });
  }

  return artifacts;
}

function artifactStatesFromArtifacts(items: AppArtifact[]): ArtifactState[] {
  return items.map((artifact) => ({
    id: artifact.id,
    kind: artifact.kind,
    title: artifact.title,
    description: artifact.description,
    status: 'completed',
    artifact
  }));
}

function artifactsFromSnapshot(snapshot: ChatSnapshot): AppArtifact[] {
  const artifacts: AppArtifact[] = [];
  const snapshotId = snapshot.id || createId('snapshot');

  if (snapshot.channels.length > 0) {
    artifacts.push({
      id: `${snapshotId}_creators`,
      kind: 'creator_table',
      title: snapshot.title || '추천 인플루언서 후보',
      description: snapshot.search || snapshot.category || '저장된 후보 테이블입니다.',
      rows: snapshot.channels.map(channelToCreatorRow)
    });
  }

  if (snapshot.contents.length > 0) {
    artifacts.push({
      id: `${snapshotId}_videos`,
      kind: 'video_grid',
      title: snapshot.title || '추천 콘텐츠 후보',
      description: snapshot.search || '저장된 영상 후보입니다.',
      items: snapshot.contents.map(contentToVideoItem)
    });
  }

  return artifacts;
}

function resultLinkFromSnapshot(snapshot: ChatSnapshot | undefined) {
  if (!snapshot?.id) return undefined;

  return {
    snapshotId: snapshot.id,
    title: snapshot.title || fallbackResultTitle(snapshot.kind),
    kind: snapshot.kind || 'result'
  };
}

function fallbackResultTitle(kind: string) {
  if (kind === 'contents') return '영상 결과';
  if (kind === 'channels') return '후보 결과';
  return '결과 보기';
}

type ChatRequestContext = {
  roomId: string;
  activeSnapshotId: string;
  clientId: string;
  currentCandidates: Channel[];
  currentContents: Content[];
};

function buildChatRequestBody(
  message: string,
  history: UIChatMessage[],
  endpoint: string,
  context: ChatRequestContext
) {
  if (endpoint === MOCK_ASSISTANT_ENDPOINT) {
    return JSON.stringify({ message });
  }

  return toJsonString(
    ChatRequestSchema,
    create(ChatRequestSchema, {
      message,
      roomId: context.roomId,
      clientId: context.clientId,
      activeSnapshotId: context.activeSnapshotId,
      history: history
        .filter((item) => item.content.trim())
        .map((item) => ({
          role: item.role,
          content: item.content
        })),
      currentCandidates: context.currentCandidates,
      currentContents: context.currentContents
    })
  );
}

function updateMessage(
  messages: UIChatMessage[],
  messageId: string,
  updater: (message: UIChatMessage) => UIChatMessage
) {
  return messages.map((message) => (message.id === messageId ? updater(message) : message));
}

function upsertToolCall(toolCalls: ToolCallState[], nextTool: ToolCallState) {
  const index = toolCalls.findIndex((tool) => tool.id === nextTool.id);

  if (index === -1) {
    return [...toolCalls, nextTool];
  }

  return toolCalls.map((tool) =>
    tool.id === nextTool.id
      ? {
          ...tool,
          ...nextTool
        }
      : tool
  );
}

export function useAssistantStream(endpoint = DEFAULT_ASSISTANT_ENDPOINT) {
  const [messages, setMessages] = useState<UIChatMessage[]>([]);
  const [artifacts, setArtifacts] = useState<ArtifactState[]>([]);
  const [activeArtifactId, setActiveArtifactId] = useState<string>();
  const [roomId, setRoomId] = useState('');
  const [activeSnapshotId, setActiveSnapshotId] = useState('');
  const [clientId, setClientId] = useState('');
  const [currentCandidates, setCurrentCandidates] = useState<Channel[]>([]);
  const [currentContents, setCurrentContents] = useState<Content[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [status, setStatus] = useState<AssistantStreamStatus>('idle');
  const [error, setError] = useState<string>();
  const abortRef = useRef<AbortController | null>(null);
  const activeAssistantMessageIdRef = useRef<string | undefined>(undefined);
  const toolOwnerMessageRef = useRef<Record<string, string>>({});

  const activeArtifact = artifacts.find((artifact) => artifact.id === activeArtifactId);

  useEffect(() => {
    const nextClientId = getOrCreateClientId();
    setClientId(nextClientId);
    setRoomId(getStoredValue(ROOM_STORAGE_KEY));
  }, []);

  useEffect(() => {
    setStoredValue(ROOM_STORAGE_KEY, roomId);
  }, [roomId]);

  useEffect(() => {
    if (!roomId || !clientId || endpoint === MOCK_ASSISTANT_ENDPOINT) return;
    let cancelled = false;

    loadChatRoom({ roomId, limit: 60, clientId })
      .then((room) => {
        if (cancelled) return;
        if (room.messages.length > 0) {
          setMessages(
            room.messages.map((message) => ({
              id: message.id || createId(message.role || 'message'),
              role: message.role === 'user' ? 'user' : 'assistant',
              content: message.content,
              createdAt: message.createdAt
                ? Date.parse(message.createdAt) || Date.now()
                : Date.now(),
              status: 'completed',
              toolCalls: [],
              result: message.snapshotId
                ? {
                    snapshotId: message.snapshotId,
                    title: message.snapshotTitle || fallbackResultTitle(message.snapshotKind),
                    kind: message.snapshotKind || 'result'
                  }
                : undefined
            }))
          );
        }
        setActiveSnapshotId(room.activeSnapshotId);
        if (room.activeSnapshot) {
          setCurrentCandidates(room.activeSnapshot.channels);
          setCurrentContents(room.activeSnapshot.contents);
          const restoredArtifacts = artifactsFromSnapshot(room.activeSnapshot);
          setArtifacts(artifactStatesFromArtifacts(restoredArtifacts));
          setActiveArtifactId(restoredArtifacts[0]?.id);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setRoomId('');
        setActiveSnapshotId('');
      });

    return () => {
      cancelled = true;
    };
  }, [clientId, endpoint, roomId]);

  const ensureAssistantMessage = useCallback(() => {
    if (activeAssistantMessageIdRef.current) {
      return activeAssistantMessageIdRef.current;
    }

    const messageId = createId('assistant');
    activeAssistantMessageIdRef.current = messageId;
    setMessages((current) => [
      ...current,
      {
        id: messageId,
        role: 'assistant',
        content: '',
        createdAt: Date.now(),
        status: 'streaming',
        toolCalls: []
      }
    ]);
    return messageId;
  }, []);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStatus((current) => (current === 'submitted' || current === 'streaming' ? 'idle' : current));
  }, []);

  const selectArtifact = useCallback((id: string) => {
    setActiveArtifactId(id);
  }, []);

  const closeArtifact = useCallback(() => {
    setActiveArtifactId(undefined);
  }, []);

  const selectResultSnapshot = useCallback(
    async (snapshotId: string) => {
      const id = snapshotId.trim();
      if (!id || endpoint === MOCK_ASSISTANT_ENDPOINT) return;

      try {
        setError(undefined);
        const effectiveClientId = clientId || getOrCreateClientId();
        if (!clientId) {
          setClientId(effectiveClientId);
        }

        const snapshot = await loadChatSnapshot({
          snapshotId: id,
          clientId: effectiveClientId
        });
        const nextArtifacts = artifactsFromSnapshot(snapshot);
        if (nextArtifacts.length === 0) return;

        setRoomId(snapshot.roomId || roomId);
        setActiveSnapshotId(snapshot.id);
        setCurrentCandidates(snapshot.channels);
        setCurrentContents(snapshot.contents);
        setArtifacts(artifactStatesFromArtifacts(nextArtifacts));
        setActiveArtifactId(nextArtifacts[0].id);
      } catch (snapshotError) {
        setError(
          snapshotError instanceof Error
            ? snapshotError.message
            : '결과를 다시 불러오지 못했습니다.'
        );
      }
    },
    [clientId, endpoint, roomId]
  );

  const applyEvent = useCallback((event: AssistantEvent) => {
    const now = Date.now();

    switch (event.type) {
      case 'thread.started':
        setStatus('streaming');
        return;
      case 'message.started': {
        activeAssistantMessageIdRef.current = event.messageId;
        setMessages((current) => [
          ...current,
          {
            id: event.messageId,
            role: 'assistant',
            content: '',
            createdAt: now,
            status: 'streaming',
            toolCalls: []
          }
        ]);
        return;
      }
      case 'message.delta':
        activeAssistantMessageIdRef.current = event.messageId;
        setMessages((current) =>
          updateMessage(current, event.messageId, (message) => ({
            ...message,
            content: `${message.content}${event.delta}`,
            status: 'streaming'
          }))
        );
        return;
      case 'tool.started': {
        const ownerMessageId = activeAssistantMessageIdRef.current;
        if (!ownerMessageId) return;

        toolOwnerMessageRef.current[event.toolCallId] = ownerMessageId;
        setMessages((current) =>
          updateMessage(current, ownerMessageId, (message) => ({
            ...message,
            toolCalls: upsertToolCall(message.toolCalls, {
              id: event.toolCallId,
              name: event.name,
              label: event.label,
              status: 'started',
              updatedAt: now
            })
          }))
        );
        return;
      }
      case 'tool.progress': {
        const ownerMessageId = toolOwnerMessageRef.current[event.toolCallId];
        if (!ownerMessageId) return;

        setMessages((current) =>
          updateMessage(current, ownerMessageId, (message) => ({
            ...message,
            toolCalls: message.toolCalls.map((tool) =>
              tool.id === event.toolCallId
                ? {
                    ...tool,
                    status: 'progress',
                    message: event.message,
                    updatedAt: now
                  }
                : tool
            )
          }))
        );
        return;
      }
      case 'tool.completed': {
        const ownerMessageId = toolOwnerMessageRef.current[event.toolCallId];
        if (!ownerMessageId) return;

        setMessages((current) =>
          updateMessage(current, ownerMessageId, (message) => ({
            ...message,
            toolCalls: message.toolCalls.map((tool) =>
              tool.id === event.toolCallId
                ? {
                    ...tool,
                    status: 'completed',
                    message: event.message,
                    updatedAt: now
                  }
                : tool
            )
          }))
        );
        return;
      }
      case 'artifact.started':
        setArtifacts((current) => {
          const pending: ArtifactState = {
            id: event.artifactId,
            kind: event.kind,
            title: event.title,
            description: event.description,
            status: 'loading'
          };
          const exists = current.some((artifact) => artifact.id === pending.id);
          return exists
            ? current.map((artifact) => (artifact.id === pending.id ? pending : artifact))
            : [...current, pending];
        });
        setActiveArtifactId(event.artifactId);
        return;
      case 'artifact.completed':
        setArtifacts((current) => {
          const completed: ArtifactState = {
            id: event.artifact.id,
            kind: event.artifact.kind,
            title: event.artifact.title,
            description: event.artifact.description,
            status: 'completed',
            artifact: event.artifact
          };
          const exists = current.some((artifact) => artifact.id === completed.id);
          return exists
            ? current.map((artifact) => (artifact.id === completed.id ? completed : artifact))
            : [...current, completed];
        });
        setActiveArtifactId(event.artifact.id);
        return;
      case 'suggestions.updated':
        setSuggestions(cleanSuggestions(event.suggestions));
        return;
      case 'message.completed':
        setMessages((current) =>
          updateMessage(current, event.messageId, (message) => ({
            ...message,
            status: 'completed'
          }))
        );
        return;
      case 'done':
        setStatus('idle');
        abortRef.current = null;
        return;
      case 'error':
        setError(event.message);
        setStatus('error');
        return;
      default:
        return;
    }
  }, []);

  const applyLegacyPayload = useCallback(
    (payload: LegacyChatStreamPayload) => {
      const messageId = ensureAssistantMessage();

      if (payload.type === 'status') {
        setMessages((current) =>
          updateMessage(current, messageId, (message) => ({
            ...message,
            status: 'streaming'
          }))
        );
        return;
      }

      if (payload.type === 'delta') {
        setMessages((current) =>
          updateMessage(current, messageId, (message) => ({
            ...message,
            content: `${message.content}${payload.delta ?? ''}`,
            status: 'streaming'
          }))
        );
        return;
      }

      if (payload.type === 'error') {
        setError(payload.message || 'assistant stream failed');
        setStatus('error');
        setMessages((current) =>
          updateMessage(current, messageId, (message) => ({
            ...message,
            status: 'error'
          }))
        );
        return;
      }

      if (payload.type === 'final' && payload.response) {
        const response = fromJson(ChatResponseSchema, payload.response);
        const nextArtifacts = artifactsFromChatResponse(response);
        const resultLink = resultLinkFromSnapshot(response.resultSnapshot);
        setSuggestions(cleanSuggestions(response.suggestions));
        if (response.roomId) {
          setRoomId(response.roomId);
        }
        if (response.resultSnapshot?.id) {
          setActiveSnapshotId(response.resultSnapshot.id);
          setCurrentCandidates(response.resultSnapshot.channels);
          setCurrentContents(response.resultSnapshot.contents);
        } else {
          if (response.recommendedChannels.length > 0) {
            setCurrentCandidates(response.recommendedChannels);
          }
          if (response.recommendedContents.length > 0) {
            setCurrentContents(response.recommendedContents);
          }
        }

        setMessages((current) =>
          updateMessage(current, messageId, (message) => ({
            ...message,
            content: response.message.trim() ? response.message : message.content,
            status: 'completed',
            toolCalls: [],
            result: resultLink ?? message.result
          }))
        );

        if (nextArtifacts.length > 0) {
          setArtifacts(artifactStatesFromArtifacts(nextArtifacts));
          setActiveArtifactId(nextArtifacts[0].id);
        }
      }
    },
    [ensureAssistantMessage]
  );

  const handleRawEvent = useCallback(
    (rawEvent: RawSseEvent) => {
      if (rawEvent.event === 'status' || rawEvent.event === 'delta' || rawEvent.event === 'final') {
        const legacyPayload = parseLegacyPayload(rawEvent);
        if (legacyPayload) applyLegacyPayload(legacyPayload);
        return;
      }

      const event = parseAssistantEvent(rawEvent);
      if (event) applyEvent(event);
    },
    [applyEvent, applyLegacyPayload]
  );

  const sendMessage = useCallback(
    async (input: string) => {
      const message = input.trim();
      if (!message) return;

      stop();
      const controller = new AbortController();
      abortRef.current = controller;
      activeAssistantMessageIdRef.current = undefined;
      setError(undefined);
      setSuggestions([]);
      setStatus('submitted');

      const userMessage: UIChatMessage = {
        id: createId('user'),
        role: 'user',
        content: message,
        createdAt: Date.now(),
        status: 'completed',
        toolCalls: []
      };

      const nextHistory = [...messages, userMessage];
      setMessages(nextHistory);

      try {
        const effectiveClientId = clientId || getOrCreateClientId();
        if (!clientId) {
          setClientId(effectiveClientId);
        }
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            Accept: 'text/event-stream',
            'Content-Type': 'application/json'
          },
          body: buildChatRequestBody(message, nextHistory, endpoint, {
            roomId,
            activeSnapshotId,
            clientId: effectiveClientId,
            currentCandidates,
            currentContents
          }),
          signal: controller.signal
        });

        if (!response.ok || !response.body) {
          throw new Error(`assistant stream failed: ${response.status}`);
        }

        setStatus('streaming');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const blocks = buffer.split(/\r?\n\r?\n/);
          buffer = blocks.pop() ?? '';

          for (const block of blocks) {
            const rawEvent = parseSseBlock(block);
            if (!rawEvent) continue;

            handleRawEvent(rawEvent);
          }
        }

        if (buffer.trim()) {
          const rawEvent = parseSseBlock(buffer);
          if (rawEvent) handleRawEvent(rawEvent);
        }

        setStatus((current) =>
          current === 'streaming' || current === 'submitted' ? 'idle' : current
        );
        abortRef.current = null;
      } catch (streamError) {
        if (controller.signal.aborted) {
          return;
        }

        const message =
          streamError instanceof Error ? streamError.message : 'assistant stream failed';
        setError(message);
        setStatus('error');

        const failedMessageId = activeAssistantMessageIdRef.current;
        if (failedMessageId) {
          setMessages((current) =>
            updateMessage(current, failedMessageId, (chatMessage) => ({
              ...chatMessage,
              status: 'error'
            }))
          );
        }
      }
    },
    [
      activeSnapshotId,
      clientId,
      currentCandidates,
      currentContents,
      endpoint,
      handleRawEvent,
      messages,
      roomId,
      stop
    ]
  );

  return {
    messages,
    artifacts,
    activeArtifact,
    activeArtifactId,
    suggestions,
    status,
    error,
    sendMessage,
    stop,
    selectArtifact,
    selectResultSnapshot,
    closeArtifact
  };
}
