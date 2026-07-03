import type { AppArtifact } from '../schemas/artifact.schema';
import type { AssistantEvent } from '../schemas/assistant-event.schema';

export type AssistantStreamStatus = 'idle' | 'submitted' | 'streaming' | 'error';

export type ChatRole = 'user' | 'assistant';

export type ToolCallStatus = 'started' | 'progress' | 'completed' | 'error';

export type ToolCallState = {
  id: string;
  name: string;
  label: string;
  status: ToolCallStatus;
  message?: string;
  updatedAt: number;
};

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
  status?: 'streaming' | 'completed' | 'error';
  toolCalls: ToolCallState[];
};

export type PendingArtifact = {
  id: string;
  kind: AppArtifact['kind'];
  title: string;
  description?: string;
  status: 'loading';
};

export type CompletedArtifact = {
  id: string;
  kind: AppArtifact['kind'];
  title: string;
  description?: string;
  status: 'completed';
  artifact: AppArtifact;
};

export type ArtifactState = PendingArtifact | CompletedArtifact;

export type { AppArtifact, AssistantEvent };
