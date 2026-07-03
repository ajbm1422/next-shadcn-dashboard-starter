'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { InstagramItem } from '../../schemas/artifact.schema';
import { formatCompactNumber, formatPercent, formatScore } from '../../utils/formatters';

export function InstagramResultGrid({ items }: { items: InstagramItem[] }) {
  return (
    <div className='grid gap-3 sm:grid-cols-2 xl:grid-cols-3'>
      {items.map((item) => (
        <a
          key={item.id}
          href={item.url || '#'}
          target={item.url ? '_blank' : undefined}
          rel={item.url ? 'noreferrer' : undefined}
          className='rounded-lg border p-4 transition-colors hover:bg-muted/30'
        >
          <div className='flex items-center gap-3'>
            <Avatar className='size-11 rounded-lg'>
              <AvatarImage src={item.profileImageUrl} alt='' />
              <AvatarFallback className='rounded-lg'>{item.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <div className='min-w-0'>
              <h3 className='truncate text-sm font-medium'>{item.name}</h3>
              <p className='text-muted-foreground truncate text-xs'>{item.handle}</p>
            </div>
            <Badge variant='outline' className='ml-auto'>
              {formatScore(item.score)}
            </Badge>
          </div>
          <div className='mt-4 grid grid-cols-3 gap-2 text-xs'>
            <Metric label='팔로워' value={formatCompactNumber(item.followers)} />
            <Metric label='참여율' value={formatPercent(item.engagementRate)} />
            <Metric label='댓글' value={formatCompactNumber(item.avgComments)} />
          </div>
          <div className='mt-3 flex flex-wrap gap-1'>
            {item.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant='secondary' className='text-[11px]'>
                {tag}
              </Badge>
            ))}
          </div>
        </a>
      ))}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className='bg-muted/50 rounded-md px-2 py-1.5'>
      <div className='text-muted-foreground'>{label}</div>
      <div className='font-medium'>{value}</div>
    </div>
  );
}
