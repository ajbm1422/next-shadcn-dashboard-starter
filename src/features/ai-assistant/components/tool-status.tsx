'use client';

import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { ToolCallState } from '../types/assistant.types';

const statusLabel = {
  started: '시작',
  progress: '진행 중',
  completed: '완료',
  error: '오류'
} as const;

export function ToolStatus({ tool }: { tool: ToolCallState }) {
  const isCompleted = tool.status === 'completed';

  return (
    <div className='bg-muted/40 mt-2 rounded-lg border px-3 py-2 text-xs'>
      <div className='flex items-center gap-2'>
        {isCompleted ? (
          <Icons.check className='text-emerald-600 size-3.5' />
        ) : (
          <Icons.spinner className='text-muted-foreground size-3.5 animate-spin' />
        )}
        <span className='font-medium'>{tool.label}</span>
        <Badge
          variant='outline'
          className={cn(
            'ml-auto text-[10px]',
            isCompleted && 'border-emerald-200 text-emerald-700'
          )}
        >
          {statusLabel[tool.status]}
        </Badge>
      </div>
      {tool.message && <p className='text-muted-foreground mt-1.5 leading-5'>{tool.message}</p>}
    </div>
  );
}
