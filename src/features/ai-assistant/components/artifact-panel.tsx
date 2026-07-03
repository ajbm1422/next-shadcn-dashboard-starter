'use client';

import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { ArtifactRenderer } from './artifact-renderer';
import type { ArtifactState } from '../types/assistant.types';

export function ArtifactPanel({
  artifact,
  onClose,
  className
}: {
  artifact: ArtifactState;
  onClose: () => void;
  className?: string;
}) {
  return (
    <div className={cn('flex min-h-[560px] min-w-0 flex-1 flex-col overflow-hidden', className)}>
      <div className='flex flex-col gap-3 px-4 py-3 lg:flex-row lg:items-start lg:justify-between'>
        <div className='min-w-0'>
          {artifact.status === 'loading' && <Badge variant='secondary'>생성 중</Badge>}
          <h2 className='truncate text-lg font-semibold'>{artifact.title}</h2>
          {artifact.description && (
            <p className='text-muted-foreground mt-1 line-clamp-2 text-sm'>
              {artifact.description}
            </p>
          )}
        </div>
        <div className='flex shrink-0 flex-wrap items-center gap-2'>
          <Button type='button' variant='outline' size='sm' disabled>
            <Icons.fileTypeXls className='mr-1.5 size-3.5' />
            CSV
          </Button>
          <Button type='button' variant='outline' size='sm' disabled>
            <Icons.add className='mr-1.5 size-3.5' />
            캠페인 저장
          </Button>
          <Button
            type='button'
            variant='ghost'
            size='icon'
            onClick={onClose}
            aria-label='결과 닫기'
          >
            <Icons.close className='size-4' />
          </Button>
        </div>
      </div>
      <ScrollArea className='min-h-0 flex-1'>
        <div className='p-4'>
          {artifact.status === 'loading' ? (
            <ArtifactSkeleton />
          ) : (
            <ArtifactRenderer artifact={artifact.artifact} />
          )}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </div>
  );
}

function ArtifactSkeleton() {
  return (
    <div className='space-y-3'>
      <Skeleton className='h-10 w-full' />
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className='h-14 w-full' />
      ))}
    </div>
  );
}
