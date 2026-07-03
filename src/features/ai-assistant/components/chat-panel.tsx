'use client';

import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AssistantEmptyState } from './assistant-empty-state';
import { MessageList } from './message-list';
import { PromptBox } from './prompt-box';
import type { AssistantStreamStatus, ChatMessage } from '../types/assistant.types';

export function ChatPanel({
  messages,
  status,
  error,
  hasArtifact,
  onSend,
  onStop
}: {
  messages: ChatMessage[];
  status: AssistantStreamStatus;
  error?: string;
  hasArtifact: boolean;
  onSend: (message: string) => Promise<void>;
  onStop: () => void;
}) {
  const [input, setInput] = useState('');

  const send = async (message = input) => {
    const nextMessage = message.trim();
    if (!nextMessage) return;

    setInput('');
    await onSend(nextMessage);
  };

  if (messages.length === 0) {
    return (
      <section className='mx-auto flex min-h-[calc(100dvh-2rem)] w-full max-w-3xl flex-col justify-center overflow-hidden px-3 py-8 md:px-5'>
        <div className='mx-auto flex w-full max-w-2xl -translate-y-3 flex-col gap-6 md:-translate-y-4 md:gap-7'>
          <AssistantEmptyState onSelectPrompt={(prompt) => void send(prompt)} />
          <PromptBox
            value={input}
            status={status}
            onChange={setInput}
            onSubmit={() => void send()}
            onStop={onStop}
          />
        </div>
      </section>
    );
  }

  return (
    <section
      className={
        hasArtifact
          ? 'flex min-h-[560px] min-w-0 flex-1 flex-col overflow-hidden md:h-[calc(100dvh-2rem)]'
          : 'mx-auto flex h-[calc(100dvh-2rem)] w-full max-w-3xl flex-col overflow-hidden'
      }
    >
      <MessageList messages={messages} />
      <div className='bg-background/95 sticky bottom-0 space-y-3 px-1 pt-3 pb-3 backdrop-blur md:pb-4'>
        {error && (
          <Alert variant='destructive'>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <PromptBox
          value={input}
          status={status}
          onChange={setInput}
          onSubmit={() => void send()}
          onStop={onStop}
        />
      </div>
    </section>
  );
}
