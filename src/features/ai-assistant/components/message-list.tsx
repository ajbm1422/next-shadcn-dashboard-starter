'use client';

import { useEffect, useRef } from 'react';
import { MessageBubble } from './message-bubble';
import type { ChatMessage } from '../types/assistant.types';

export function MessageList({ messages }: { messages: ChatMessage[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages]);

  return (
    <div ref={viewportRef} className='min-h-0 flex-1 overflow-y-auto'>
      <div className='flex min-h-full flex-col justify-start px-3 py-6 md:px-5'>
        <div className='mx-auto flex w-full max-w-3xl flex-col gap-4'>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      </div>
    </div>
  );
}
