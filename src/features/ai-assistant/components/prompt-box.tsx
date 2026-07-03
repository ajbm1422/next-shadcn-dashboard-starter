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

  const keyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter' || event.shiftKey || event.nativeEvent.isComposing) return;
    event.preventDefault();
    if (!isWorking) onSubmit();
  };

  return (
    <form
      onSubmit={submit}
      className='border-border/70 bg-background/95 rounded-2xl border p-1.5 shadow-sm'
    >
      <div className='flex items-end gap-2'>
        <Textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={keyDown}
          rows={2}
          placeholder='어떤 인플루언서를 찾을지 조건을 입력해 주세요'
          className='placeholder:text-muted-foreground/55 max-h-40 min-h-12 resize-none border-none bg-transparent px-2 py-1.5 text-sm shadow-none focus-visible:ring-0'
          aria-label='AI에게 보낼 메시지'
        />
        {isWorking ? (
          <Button
            type='button'
            variant='outline'
            size='icon'
            className='mb-1 size-8 shrink-0 rounded-full'
            onClick={onStop}
            aria-label='응답 중지'
          >
            <Icons.close className='size-3.5' />
          </Button>
        ) : (
          <Button
            type='submit'
            size='icon'
            className='mb-1 size-8 shrink-0 rounded-full'
            disabled={!value.trim()}
            aria-label='메시지 보내기'
          >
            <Icons.arrowUp className='size-3.5' />
          </Button>
        )}
      </div>
      <div className='text-muted-foreground px-2 pb-1 text-[11px]'>
        <span>Enter 전송 · Shift+Enter 줄바꿈</span>
      </div>
    </form>
  );
}
