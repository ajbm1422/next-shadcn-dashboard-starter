'use client';

import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AssistantEmptyState } from './assistant-empty-state';
import { MessageList } from './message-list';
import { PromptBox } from './prompt-box';
import type { AssistantStreamStatus, ChatMessage } from '../types/assistant.types';

export function ChatPanel({
  messages,
  suggestions,
  status,
  error,
  hasArtifact,
  onSend,
  onStop,
  onSelectResult
}: {
  messages: ChatMessage[];
  suggestions: string[];
  status: AssistantStreamStatus;
  error?: string;
  hasArtifact: boolean;
  onSend: (message: string) => Promise<void>;
  onStop: () => void;
  onSelectResult: (snapshotId: string) => void;
}) {
  const [input, setInput] = useState('');

  const send = async (message = input) => {
    const nextMessage = message.trim();
    if (!nextMessage) return;

    setInput('');
    await onSend(nextMessage);
  };
  const isWorking = status === 'submitted' || status === 'streaming';

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
          ? 'relative flex min-h-[560px] min-w-0 flex-1 flex-col overflow-y-auto md:h-[calc(100dvh-1rem)]'
          : 'relative mx-auto flex h-[calc(100dvh-1rem)] w-full max-w-3xl flex-col overflow-y-auto'
      }
    >
      <MessageList messages={messages} onSelectResult={onSelectResult} />
      <div className='pointer-events-none sticky bottom-4 z-10 mx-auto mt-auto w-full max-w-3xl px-1'>
        <div className='pointer-events-auto space-y-3'>
          {error && (
            <Alert variant='destructive' className='bg-background/95 backdrop-blur'>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {suggestions.length > 0 && (
            <div className='flex flex-wrap gap-2 px-2'>
              {suggestions.map((suggestion) => (
                <Button
                  key={suggestion}
                  type='button'
                  variant='outline'
                  size='sm'
                  className='bg-background/95 h-auto min-h-8 max-w-full justify-start rounded-full px-3 py-1.5 text-left text-xs leading-5 whitespace-normal backdrop-blur'
                  disabled={isWorking}
                  onClick={() => void send(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          )}
          <PromptBox
            value={input}
            status={status}
            onChange={setInput}
            onSubmit={() => void send()}
            onStop={onStop}
          />
        </div>
      </div>
    </section>
  );
}
