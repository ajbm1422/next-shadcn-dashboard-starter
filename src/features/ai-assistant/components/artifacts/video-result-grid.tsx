'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import type { VideoItem } from '../../schemas/artifact.schema';
import { formatCompactNumber, formatDateLabel, formatScore } from '../../utils/formatters';

export function VideoResultGrid({ items }: { items: VideoItem[] }) {
  return (
    <div className='grid gap-3 sm:grid-cols-2 xl:grid-cols-3'>
      {items.map((item) => (
        <a
          key={item.id}
          href={item.url}
          target='_blank'
          rel='noreferrer'
          aria-label={`영상 열기: ${item.title}`}
          className='group overflow-hidden rounded-lg border transition-colors hover:bg-muted/30'
        >
          <div className='bg-muted relative aspect-video overflow-hidden'>
            <Image
              src={item.thumbnailUrl}
              alt=''
              fill
              unoptimized
              sizes='(min-width: 1280px) 24vw, (min-width: 640px) 45vw, 100vw'
              className='object-cover transition-transform duration-200 group-hover:scale-[1.02]'
            />
          </div>
          <div className='space-y-2 p-3'>
            <div className='flex items-center justify-between gap-2'>
              <Badge variant='outline'>{formatScore(item.score)}점</Badge>
              <span className='text-muted-foreground text-xs'>
                {formatDateLabel(item.publishedAt)}
              </span>
            </div>
            <h3 className='line-clamp-2 text-sm font-medium'>{item.title}</h3>
            <div className='text-muted-foreground flex items-center justify-between gap-2 text-xs'>
              <span className='truncate'>{item.channelName}</span>
              <span>{formatCompactNumber(item.views)}</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
