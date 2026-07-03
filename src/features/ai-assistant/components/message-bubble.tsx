'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AssistantFormattedMessage } from './assistant-formatted-message';
import type { ChatMessage } from '../types/assistant.types';

export function MessageBubble({
  message,
  onSelectResult
}: {
  message: ChatMessage;
  onSelectResult?: (snapshotId: string) => void;
}) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex w-full gap-3', isUser && 'justify-end')}>
      {!isUser && (
        <Avatar className='mt-1 size-8 rounded-full ring-1 ring-border/70'>
          <AvatarImage src='/brand/flur-mark.svg' alt='' className='rounded-full' />
          <AvatarFallback className='bg-background rounded-full p-1'>
            <Icons.sparkles className='text-primary size-4' />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'min-w-0 text-sm leading-6',
          isUser
            ? 'max-w-[82%] rounded-2xl bg-muted px-4 py-3 text-foreground md:max-w-[72%]'
            : 'text-foreground flex-1 py-1 pr-2'
        )}
      >
        {message.content ? (
          isUser ? (
            <p className='whitespace-pre-wrap break-words'>{message.content}</p>
          ) : (
            <AssistantFormattedMessage content={message.content} />
          )
        ) : (
          <p className='text-muted-foreground flex items-center gap-2'>
            <Icons.spinner className='size-3.5 animate-spin' />
            답변을 준비하고 있습니다.
          </p>
        )}
        {!isUser && message.result && (
          <div className='mt-3'>
            <Button
              type='button'
              variant='outline'
              size='sm'
              className='h-auto max-w-full cursor-pointer justify-start rounded-full px-3 py-1.5 text-xs'
              onClick={() => onSelectResult?.(message.result?.snapshotId ?? '')}
            >
              <Icons.galleryVerticalEnd className='mr-1.5 size-3.5 shrink-0' />
              <span className='truncate'>{message.result.title}</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
