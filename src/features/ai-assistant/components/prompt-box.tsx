'use client';

import { type FormEvent, type KeyboardEvent } from 'react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { AssistantStreamStatus } from '../types/assistant.types';

export function PromptBox({
  value,
  status,
  onChange,
  onSubmit,
  onStop
}: {
  value: string;
  status: AssistantStreamStatus;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onStop: () => void;
}) {
  const isWorking = status === 'submitted' || status === 'streaming';

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isWorking) onSubmit();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter' || event.shiftKey || event.nativeEvent.isComposing) return;

    event.preventDefault();
    if (!isWorking && value.trim()) onSubmit();
  };

  return (
    <div className='space-y-0.5'>
      <form
        onSubmit={submit}
        className='border-border/70 rounded-2xl border bg-transparent p-2 shadow-none'
      >
        <div className='flex items-end gap-2'>
          <Textarea
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder='어떤 인플루언서를 찾을지 조건을 입력해 주세요'
            className='placeholder:text-muted-foreground/55 max-h-40 min-h-8 resize-none border-none bg-transparent px-3 py-1.5 text-sm leading-5 shadow-none focus-visible:ring-0 dark:bg-transparent'
            aria-label='AI에게 보낼 메시지'
          />
          {isWorking ? (
            <Button
              type='button'
              variant='outline'
              size='icon'
              className='size-8 shrink-0 rounded-full'
              onClick={onStop}
              aria-label='응답 중지'
            >
              <Icons.close className='size-3.5' />
            </Button>
          ) : (
            <Button
              type='submit'
              size='icon'
              className='size-8 shrink-0 rounded-full'
              disabled={!value.trim()}
              aria-label='메시지 보내기'
            >
              <Icons.arrowUp className='size-4 stroke-[2.6]' />
            </Button>
          )}
        </div>
      </form>
      <p className='text-muted-foreground px-3 text-[11px] leading-4'>Shift+Enter 줄바꿈</p>
    </div>
  );
}
