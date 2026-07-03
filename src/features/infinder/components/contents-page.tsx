'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Content } from '@/gen/infinder/v1/infinder_pb';
import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { listContents } from '@/lib/infinder-client';
import { formatCompact, formatDate, formatNumber } from '@/lib/format';
import { topicOptions } from '@/features/infinder/options';

export function ContentsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [search, setSearch] = useState('');
  const [topic, setTopic] = useState('');

  const contentsQuery = useQuery({
    queryKey: ['infinder', 'contents', search, topic],
    queryFn: () => listContents({ search, topic, pageSize: 12 }),
    enabled: isMounted,
    staleTime: 30_000,
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const contents = isMounted ? (contentsQuery.data?.contents ?? []) : [];
  const total = isMounted ? contentsQuery.data?.total : 0;
  const isLoading = !isMounted || contentsQuery.isLoading;

  return (
    <div className='space-y-4'>
      <Card>
        <CardHeader>
          <CardTitle>필터</CardTitle>
          <CardDescription>
            영상 제목, 채널명, 토픽 기준으로 저장 콘텐츠를 조회합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-3 md:grid-cols-[minmax(0,1fr)_180px]'>
            <InputGroup>
              <InputGroupAddon>
                <Icons.search />
              </InputGroupAddon>
              <InputGroupInput
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder='영상 제목 또는 채널명 검색'
              />
            </InputGroup>
            <Select
              value={topic || 'all'}
              onValueChange={(value) => setTopic(value === 'all' ? '' : value)}
            >
              <SelectTrigger className='w-full'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>전체 토픽</SelectItem>
                {topicOptions.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <CardTitle>콘텐츠</CardTitle>
            <CardDescription>분석 가능한 저장 영상 풀을 확인합니다.</CardDescription>
          </div>
          <Badge variant='outline' className='w-fit'>
            {formatNumber(total)}개
          </Badge>
        </CardHeader>
        <CardContent>
          <ContentGrid contents={contents} isLoading={isLoading} isError={contentsQuery.isError} />
        </CardContent>
      </Card>
    </div>
  );
}

function ContentGrid({
  contents,
  isLoading,
  isError
}: {
  contents: Content[];
  isLoading: boolean;
  isError: boolean;
}) {
  if (isLoading) {
    return (
      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className='aspect-[4/3] w-full' />
        ))}
      </div>
    );
  }

  if (isError) {
    return <StateMessage tone='error' message='콘텐츠를 불러오지 못했습니다.' />;
  }

  if (contents.length === 0) {
    return <StateMessage message='조건에 맞는 콘텐츠가 없습니다.' />;
  }

  return (
    <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
      {contents.map((content) => (
        <ContentCard key={content.id} content={content} />
      ))}
    </div>
  );
}

function ContentCard({ content }: { content: Content }) {
  return (
    <article className='overflow-hidden rounded-lg border'>
      <div className='bg-muted relative aspect-video overflow-hidden'>
        {content.thumbnailUrl ? (
          <Image
            src={content.thumbnailUrl}
            alt=''
            fill
            unoptimized
            loader={passthroughImageLoader}
            sizes='(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw'
            className='object-cover'
          />
        ) : (
          <div className='text-muted-foreground flex size-full items-center justify-center text-sm'>
            No thumbnail
          </div>
        )}
      </div>
      <div className='p-4'>
        <div className='flex items-center justify-between gap-3'>
          <Badge variant='outline'>{content.topic || '미분류'}</Badge>
          <span className='text-muted-foreground text-xs'>
            {formatDate(content.publishedAt, {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>
        <h2 className='mt-3 line-clamp-2 min-h-12 font-medium leading-6'>
          {content.title || '제목 없음'}
        </h2>
        <p className='text-muted-foreground mt-2 truncate text-sm'>{content.channelName}</p>
        <div className='mt-4 grid grid-cols-3 gap-2 text-xs'>
          <MetricPill icon={Icons.trendingUp} value={formatCompact(content.views)} />
          <MetricPill icon={Icons.badgeCheck} value={formatCompact(content.likes)} />
          <MetricPill icon={Icons.chat} value={formatCompact(content.comments)} />
        </div>
        <div className='bg-muted/30 mt-3 rounded-md border px-3 py-2 text-xs'>
          <div className='text-muted-foreground'>Velocity score</div>
          <div className='mt-1 font-semibold tabular-nums'>{content.velocityScore.toFixed(1)}</div>
        </div>
      </div>
    </article>
  );
}

function passthroughImageLoader({ src }: { src: string }) {
  return src;
}

function MetricPill({
  icon: Icon,
  value
}: {
  icon: ComponentType<{ className?: string }>;
  value: string;
}) {
  return (
    <span className='bg-muted/40 inline-flex min-w-0 items-center gap-1 rounded-md border px-2 py-1.5'>
      <Icon className='text-muted-foreground size-3.5' />
      <span className='truncate font-medium tabular-nums'>{value}</span>
    </span>
  );
}

function StateMessage({ message, tone }: { message: string; tone?: 'error' }) {
  return (
    <div
      className={`rounded-lg border px-4 py-12 text-center text-sm ${
        tone === 'error' ? 'text-destructive' : 'text-muted-foreground'
      }`}
    >
      {message}
    </div>
  );
}
