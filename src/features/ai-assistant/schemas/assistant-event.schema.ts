import { z } from 'zod';
import { artifactSchema } from './artifact.schema';

const threadStartedEventSchema = z.object({
  type: z.literal('thread.started'),
  threadId: z.string()
});

const messageStartedEventSchema = z.object({
  type: z.literal('message.started'),
  messageId: z.string(),
  role: z.literal('assistant')
});

const messageDeltaEventSchema = z.object({
  type: z.literal('message.delta'),
  messageId: z.string(),
  delta: z.string()
});

const toolStartedEventSchema = z.object({
  type: z.literal('tool.started'),
  toolCallId: z.string(),
  name: z.string(),
  label: z.string()
});

const toolProgressEventSchema = z.object({
  type: z.literal('tool.progress'),
  toolCallId: z.string(),
  message: z.string()
});

const toolCompletedEventSchema = z.object({
  type: z.literal('tool.completed'),
  toolCallId: z.string(),
  message: z.string()
});

const artifactStartedEventSchema = z.object({
  type: z.literal('artifact.started'),
  artifactId: z.string(),
  kind: z.enum([
    'creator_table',
    'video_grid',
    'blog_table',
    'instagram_grid',
    'chart',
    'campaign_summary'
  ]),
  title: z.string(),
  description: z.string().optional()
});

const artifactCompletedEventSchema = z.object({
  type: z.literal('artifact.completed'),
  artifact: artifactSchema
});

const messageCompletedEventSchema = z.object({
  type: z.literal('message.completed'),
  messageId: z.string()
});

const doneEventSchema = z.object({
  type: z.literal('done')
});

const errorEventSchema = z.object({
  type: z.literal('error'),
  message: z.string()
});

export const assistantEventSchema = z.discriminatedUnion('type', [
  threadStartedEventSchema,
  messageStartedEventSchema,
  messageDeltaEventSchema,
  toolStartedEventSchema,
  toolProgressEventSchema,
  toolCompletedEventSchema,
  artifactStartedEventSchema,
  artifactCompletedEventSchema,
  messageCompletedEventSchema,
  doneEventSchema,
  errorEventSchema
]);

export type AssistantEvent = z.infer<typeof assistantEventSchema>;
