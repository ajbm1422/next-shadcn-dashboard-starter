'use client';

import { useEffect, useRef } from 'react';
import { MessageBubble } from './message-bubble';
import type { ChatMessage } from '../types/assistant.types';

export function MessageList({
  messages,
  onSelectResult
}: {
  messages: ChatMessage[];
  onSelectResult: (snapshotId: string) => void;
}) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({
      block: 'end',
      behavior: 'smooth'
    });
  }, [messages]);

  return (
    <div className='px-3 pt-6 pb-44 md:px-5'>
      <div className='mx-auto flex w-full max-w-3xl flex-col gap-4'>
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} onSelectResult={onSelectResult} />
        ))}
        <div ref={endRef} aria-hidden='true' />
      </div>
    </div>
  );
}
