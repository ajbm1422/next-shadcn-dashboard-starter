'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import { useRouter } from 'next/navigation';
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
import { extractYoutubeVideoId, saveVideoFallback } from '@/features/infinder/video-fallback';

export function ContentsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [search, setSearch] = useState('');
  const [topic, setTopic] = useState('');

  const contentsQuery = useQuery({
    queryKey: ['infinder', 'contents', search, topic],
    queryFn: () => listContents({ search, topic, pageSize: 20 }),
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
  const router = useRouter();
  const openContent = (content: Content) => {
    if (!content.id) return;

    const views = Number(content.views);
    const likes = Number(content.likes);
    const comments = Number(content.comments);
    const videoId = extractYoutubeVideoId(content.thumbnailUrl);

    saveVideoFallback({
      id: content.id,
      videoId,
      title: content.title,
      thumbnail: content.thumbnailUrl,
      channelName: content.channelName,
      viewCount: views,
      likeCount: likes,
      commentCount: comments,
      publishedAt: content.publishedAt,
      topic: content.topic,
      engagementRate: views > 0 ? ((likes + comments) / views) * 100 : 0,
      likeRate: views > 0 ? (likes / views) * 100 : 0,
      commentRate: views > 0 ? (comments / views) * 100 : 0,
      source: 'content'
    });

    router.push(`/dashboard/videos/${encodeURIComponent(content.id)}`);
  };

  if (isLoading) {
    return (
      <div className='grid gap-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className='aspect-[5/4] w-full' />
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
    <div className='grid gap-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
      {contents.map((content) => (
        <ContentCard key={content.id} content={content} onOpen={() => openContent(content)} />
      ))}
    </div>
  );
}

function ContentCard({ content, onOpen }: { content: Content; onOpen: () => void }) {
  return (
    <button
      type='button'
      className='group hover:bg-muted/30 focus-visible:ring-ring cursor-pointer overflow-hidden rounded-lg border text-left transition-colors focus-visible:ring-2 focus-visible:outline-none'
      onClick={onOpen}
    >
      <div className='bg-muted relative aspect-video overflow-hidden'>
        {content.thumbnailUrl ? (
          <Image
            src={content.thumbnailUrl}
            alt=''
            fill
            unoptimized
            loader={passthroughImageLoader}
            sizes='(min-width: 1536px) 18vw, (min-width: 1280px) 23vw, (min-width: 768px) 30vw, 100vw'
            className='object-cover transition-transform duration-200 group-hover:scale-[1.02]'
          />
        ) : (
          <div className='text-muted-foreground flex size-full items-center justify-center text-sm'>
            No thumbnail
          </div>
        )}
      </div>
      <div className='p-3'>
        <div className='flex items-center justify-between gap-3'>
          <Badge variant='outline' className='max-w-[70%] truncate'>
            {content.topic || '미분류'}
          </Badge>
          <span className='bg-muted rounded-md px-1.5 py-0.5 text-[11px] font-medium tabular-nums'>
            V {content.velocityScore.toFixed(1)}
          </span>
        </div>
        <h2 className='mt-2 line-clamp-2 min-h-10 text-sm font-medium leading-5'>
          {content.title || '제목 없음'}
        </h2>
        <div className='text-muted-foreground mt-2 flex items-center justify-between gap-3 text-xs'>
          <span className='truncate'>{content.channelName}</span>
          <span className='text-muted-foreground text-xs'>
            {formatDate(content.publishedAt, {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>
        <div className='mt-3 grid grid-cols-3 gap-1.5 text-xs'>
          <MetricPill icon={Icons.trendingUp} value={formatCompact(content.views)} />
          <MetricPill icon={Icons.badgeCheck} value={formatCompact(content.likes)} />
          <MetricPill icon={Icons.chat} value={formatCompact(content.comments)} />
        </div>
      </div>
    </button>
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
    <span className='bg-muted/40 inline-flex min-w-0 items-center gap-1 rounded-md border px-1.5 py-1'>
      <Icon className='text-muted-foreground size-3' />
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
