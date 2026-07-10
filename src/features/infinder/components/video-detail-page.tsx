'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ComponentType } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import type { ChannelVideo, MetricBucket, VideoReport } from '@/gen/infinder/v1/infinder_pb';
import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { getVideoReport } from '@/lib/infinder-client';
import { formatCompact, formatDate } from '@/lib/format';
import {
  bucketLabel,
  bucketPercent,
  formatDuration,
  formatPercent,
  formatPublishedAt,
  insightToneClass,
  metricDisplay
} from '@/features/infinder/detail-utils';
import {
  getVideoFallback,
  type VideoFallback,
  youtubeEmbedUrl
} from '@/features/infinder/video-fallback';

type VideoMetricLike = {
  date: string;
  viewCount: bigint | number;
  likeCount: bigint | number;
  commentCount: bigint | number;
  engagementRate: number;
  viewDelta?: bigint | number;
  likeDelta?: bigint | number;
  commentDelta?: bigint | number;
};

type VideoMetricSummary = {
  viewCount?: bigint | number;
  likeCount?: bigint | number;
  commentCount?: bigint | number;
  adSlots?: number;
};

const volumeChartConfig = {
  views: {
    label: '조회수',
    color: 'var(--chart-1)'
  },
  likes: {
    label: '좋아요',
    color: 'var(--chart-2)'
  },
  comments: {
    label: '댓글',
    color: 'var(--chart-3)'
  }
} satisfies ChartConfig;

const engagementChartConfig = {
  engagement: {
    label: '참여율',
    color: 'var(--chart-4)'
  }
} satisfies ChartConfig;

const deltaChartConfig = {
  viewDelta: {
    label: '조회수 증감',
    color: 'var(--chart-1)'
  },
  likeDelta: {
    label: '좋아요 증감',
    color: 'var(--chart-2)'
  },
  commentDelta: {
    label: '댓글 증감',
    color: 'var(--chart-3)'
  }
} satisfies ChartConfig;

export function VideoDetailPage({ id }: { id: string }) {
  const [isMounted, setIsMounted] = useState(false);
  const [fallback, setFallback] = useState<VideoFallback | null>(null);
  const [fallbackReady, setFallbackReady] = useState(false);
  const activeFallback =
    fallback && (fallback.id === id || fallback.videoId === id) ? fallback : null;

  const reportQuery = useQuery({
    queryKey: ['infinder', 'video-report', id],
    queryFn: () => getVideoReport(id),
    enabled: isMounted && fallbackReady && Boolean(id) && !activeFallback,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
    retry: false
  });

  useEffect(() => {
    setFallback(getVideoFallback(id));
    setFallbackReady(true);
    setIsMounted(true);
  }, [id]);

  if (!isMounted || !fallbackReady || reportQuery.isLoading) {
    return <VideoDetailSkeleton />;
  }

  if (reportQuery.isError || !reportQuery.data?.video) {
    if (activeFallback) {
      return <FallbackVideoReportView fallback={activeFallback} />;
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>영상 리포트를 불러오지 못했습니다.</CardTitle>
          <CardDescription>
            운영 API에서 해당 영상의 상세 분석 리포트를 찾지 못했습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant='outline' size='sm'>
            <Link href='/dashboard/contents'>콘텐츠 목록으로 돌아가기</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return <VideoReportView report={reportQuery.data} />;
}

function VideoReportView({ report }: { report: VideoReport }) {
  const video = report.video;
  if (!video) return null;

  const channelHref = report.channel?.id
    ? `/dashboard/influencers/${encodeURIComponent(report.channel.id)}`
    : '';

  return (
    <div className='space-y-4'>
      <div className='grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.65fr)]'>
        <VideoEmbedCard report={report} />
        <VideoSummaryCard report={report} video={video} channelHref={channelHref} />
      </div>
      <MetricCards video={video} />
      <TimelineCharts points={report.metricTimeline} />
      <div className='grid gap-4 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]'>
        <TagCard tags={report.tags} />
        <InsightsCard report={report} />
      </div>
      <div className='grid gap-4 xl:grid-cols-3'>
        <DistributionCard title='연령 분포' buckets={report.ageDistribution} />
        <DistributionCard title='국가 분포' buckets={report.countryDistribution} />
        <DistributionCard title='감성 분포' buckets={report.sentimentDistribution} />
      </div>
    </div>
  );
}

function FallbackVideoReportView({ fallback }: { fallback: VideoFallback }) {
  const embedUrl = youtubeEmbedUrl(fallback.videoId);
  const metrics = {
    viewCount: fallback.viewCount,
    likeCount: fallback.likeCount,
    commentCount: fallback.commentCount,
    adSlots: 0
  };
  const timeline = [
    {
      date: fallback.publishedAt || new Date().toISOString(),
      viewCount: fallback.viewCount ?? 0,
      likeCount: fallback.likeCount ?? 0,
      commentCount: fallback.commentCount ?? 0,
      engagementRate: fallback.engagementRate ?? 0,
      viewDelta: fallback.viewCount ?? 0,
      likeDelta: fallback.likeCount ?? 0,
      commentDelta: fallback.commentCount ?? 0
    }
  ];
  const channelHref = fallback.channelId
    ? `/dashboard/influencers/${encodeURIComponent(fallback.channelId)}`
    : '';

  return (
    <div className='space-y-4'>
      <div className='grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.65fr)]'>
        <VideoEmbedFrameCard
          embedUrl={embedUrl}
          title={fallback.title}
          thumbnail={fallback.thumbnail}
        />
        <FallbackVideoSummaryCard fallback={fallback} channelHref={channelHref} />
      </div>
      <MetricCards video={metrics} />
      <TimelineCharts points={timeline} />
      <div className='grid gap-4 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]'>
        <TagCard tags={fallback.topic ? [fallback.topic] : []} />
        <FallbackInsightCard />
      </div>
    </div>
  );
}

function VideoEmbedCard({ report }: { report: VideoReport }) {
  return (
    <VideoEmbedFrameCard
      embedUrl={report.embedUrl}
      title={report.video?.title || 'YouTube video'}
    />
  );
}

function VideoEmbedFrameCard({
  embedUrl,
  title,
  thumbnail
}: {
  embedUrl: string;
  title: string;
  thumbnail?: string;
}) {
  return (
    <Card>
      <CardContent className='p-3'>
        <div className='bg-muted relative aspect-video overflow-hidden rounded-md'>
          {embedUrl ? (
            // oxlint-disable-next-line react/iframe-missing-sandbox -- YouTube embeds break their player scripts when sandboxed.
            <iframe
              src={embedUrl}
              title={title}
              className='absolute inset-0 size-full'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
              allowFullScreen
            />
          ) : thumbnail ? (
            <span
              aria-hidden='true'
              className='absolute inset-0 bg-cover bg-center'
              style={{ backgroundImage: `url("${encodeURI(thumbnail)}")` }}
            />
          ) : (
            <div className='text-muted-foreground flex size-full items-center justify-center text-sm'>
              임베드 URL이 없습니다.
            </div>
          )}
          {!embedUrl && thumbnail && (
            <div className='bg-background/85 text-muted-foreground absolute inset-x-3 bottom-3 rounded-md border px-3 py-2 text-sm'>
              임베드 가능한 YouTube ID가 없어 썸네일만 표시합니다.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function VideoSummaryCard({
  report,
  video,
  channelHref
}: {
  report: VideoReport;
  video: ChannelVideo;
  channelHref: string;
}) {
  return (
    <Card>
      <CardHeader>
        <div className='flex flex-wrap gap-2'>
          <Badge variant='outline'>{video.topic || video.analyticsCategory || '미분류'}</Badge>
          {video.paidContent && <Badge variant='secondary'>유료광고 포함</Badge>}
          {video.hasAnalysis && <Badge variant='secondary'>분석 완료</Badge>}
        </div>
        <CardTitle className='line-clamp-3 text-xl leading-7'>
          {video.title || '제목 없음'}
        </CardTitle>
        <CardDescription>
          {report.channel?.name || '채널 정보 없음'} · {formatPublishedAt(video.publishedAt)}
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-3'>
        <div className='grid grid-cols-2 gap-3 text-sm'>
          <SummaryBox label='영상 길이' value={formatDuration(video.duration)} />
          <SummaryBox label='참여율' value={formatPercent(video.engagementRate)} />
          <SummaryBox label='좋아요율' value={formatPercent(video.likeRate)} />
          <SummaryBox label='댓글율' value={formatPercent(video.commentRate)} />
        </div>
        <div className='flex flex-wrap gap-2'>
          {channelHref && (
            <Button asChild variant='outline' size='sm'>
              <Link href={channelHref}>채널 상세</Link>
            </Button>
          )}
          {report.youtubeUrl && (
            <Button asChild variant='outline' size='sm'>
              <a href={report.youtubeUrl} target='_blank' rel='noreferrer'>
                <Icons.externalLink className='size-4' />
                YouTube
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function FallbackVideoSummaryCard({
  fallback,
  channelHref
}: {
  fallback: VideoFallback;
  channelHref: string;
}) {
  return (
    <Card>
      <CardHeader>
        <div className='flex flex-wrap gap-2'>
          <Badge variant='outline'>{fallback.topic || '미분류'}</Badge>
          <Badge variant='secondary'>목록 메트릭</Badge>
        </div>
        <CardTitle className='line-clamp-3 text-xl leading-7'>
          {fallback.title || '제목 없음'}
        </CardTitle>
        <CardDescription>
          {fallback.channelName || '채널 정보 없음'} ·{' '}
          {formatPublishedAt(fallback.publishedAt || '')}
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-3'>
        <div className='grid grid-cols-2 gap-3 text-sm'>
          <SummaryBox label='영상 길이' value={formatDuration(fallback.duration ?? 0)} />
          <SummaryBox label='참여율' value={formatPercent(fallback.engagementRate ?? 0)} />
          <SummaryBox label='좋아요율' value={formatPercent(fallback.likeRate ?? 0)} />
          <SummaryBox label='댓글율' value={formatPercent(fallback.commentRate ?? 0)} />
        </div>
        {channelHref && (
          <Button asChild variant='outline' size='sm'>
            <Link href={channelHref}>채널 상세</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function SummaryBox({ label, value }: { label: string; value: string }) {
  return (
    <div className='bg-muted/30 rounded-md border px-3 py-2'>
      <div className='text-muted-foreground text-xs'>{label}</div>
      <div className='mt-1 font-semibold tabular-nums'>{value}</div>
    </div>
  );
}

function MetricCards({ video }: { video: VideoMetricSummary }) {
  return (
    <div className='grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
      <MetricCard label='조회수' value={metricDisplay(video.viewCount)} icon={Icons.trendingUp} />
      <MetricCard label='좋아요' value={metricDisplay(video.likeCount)} icon={Icons.badgeCheck} />
      <MetricCard label='댓글' value={metricDisplay(video.commentCount)} icon={Icons.chat} />
      <MetricCard label='광고 슬롯' value={`${video.adSlots ?? 0}개`} icon={Icons.video} />
    </div>
  );
}

function MetricCard({
  label,
  value,
  icon: Icon
}: {
  label: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <Card>
      <CardContent className='flex items-center justify-between gap-3 p-4'>
        <div>
          <div className='text-muted-foreground text-sm'>{label}</div>
          <div className='mt-2 text-2xl font-semibold tabular-nums'>{value}</div>
        </div>
        <div className='bg-muted flex size-10 items-center justify-center rounded-md'>
          <Icon className='text-muted-foreground size-5' />
        </div>
      </CardContent>
    </Card>
  );
}

function TimelineCharts({ points }: { points: VideoMetricLike[] }) {
  const data = useMemo(
    () =>
      points.map((point) => ({
        label:
          formatDate(point.date, {
            month: 'short',
            day: 'numeric'
          }) || point.date,
        views: Number(point.viewCount),
        likes: Number(point.likeCount),
        comments: Number(point.commentCount),
        engagement: point.engagementRate,
        viewDelta: Number(point.viewDelta ?? point.viewCount),
        likeDelta: Number(point.likeDelta ?? point.likeCount),
        commentDelta: Number(point.commentDelta ?? point.commentCount)
      })),
    [points]
  );

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>날짜별 지표</CardTitle>
          <CardDescription>
            조회수, 좋아요, 댓글, 참여율의 날짜별 추이를 표시합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='text-muted-foreground rounded-md border px-4 py-10 text-center text-sm'>
            날짜별 메트릭 데이터가 없습니다.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='grid gap-4 xl:grid-cols-2'>
      <Card>
        <CardHeader>
          <CardTitle>날짜별 누적 반응</CardTitle>
          <CardDescription>조회수, 좋아요, 댓글 누적 추이입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={volumeChartConfig} className='aspect-auto h-[280px]'>
            <LineChart accessibilityLayer data={data} margin={{ left: -18, right: 12 }}>
              <CartesianGrid vertical={false} strokeDasharray='3 3' />
              <XAxis dataKey='label' tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => formatCompact(value)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type='monotone'
                dataKey='views'
                stroke='var(--color-views)'
                strokeWidth={2}
                dot={false}
              />
              <Line
                type='monotone'
                dataKey='likes'
                stroke='var(--color-likes)'
                strokeWidth={2}
                dot={false}
              />
              <Line
                type='monotone'
                dataKey='comments'
                stroke='var(--color-comments)'
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>날짜별 참여율</CardTitle>
          <CardDescription>좋아요와 댓글을 합산한 참여율 추이입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={engagementChartConfig} className='aspect-auto h-[280px]'>
            <LineChart accessibilityLayer data={data} margin={{ left: -18, right: 12 }}>
              <CartesianGrid vertical={false} strokeDasharray='3 3' />
              <XAxis dataKey='label' tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type='monotone'
                dataKey='engagement'
                stroke='var(--color-engagement)'
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className='xl:col-span-2'>
        <CardHeader>
          <CardTitle>날짜별 증감</CardTitle>
          <CardDescription>각 날짜에 새로 증가한 조회수, 좋아요, 댓글입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={deltaChartConfig} className='aspect-auto h-[300px]'>
            <BarChart accessibilityLayer data={data} margin={{ left: -18, right: 12 }}>
              <CartesianGrid vertical={false} strokeDasharray='3 3' />
              <XAxis dataKey='label' tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => formatCompact(value)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey='viewDelta' fill='var(--color-viewDelta)' radius={3} />
              <Bar dataKey='likeDelta' fill='var(--color-likeDelta)' radius={3} />
              <Bar dataKey='commentDelta' fill='var(--color-commentDelta)' radius={3} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

function TagCard({ tags }: { tags: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>태그</CardTitle>
        <CardDescription>영상에 연결된 키워드입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        {tags.length === 0 ? (
          <div className='text-muted-foreground rounded-md border px-4 py-8 text-center text-sm'>
            표시할 태그가 없습니다.
          </div>
        ) : (
          <div className='flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <Badge key={tag} variant='secondary'>
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function InsightsCard({ report }: { report: VideoReport }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>영상 인사이트</CardTitle>
        <CardDescription>영상 단위 분석에서 추출한 판단 포인트입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        {report.insights.length === 0 ? (
          <div className='text-muted-foreground rounded-md border px-4 py-8 text-center text-sm'>
            아직 생성된 인사이트가 없습니다.
          </div>
        ) : (
          <div className='grid gap-3'>
            {report.insights.map((insight, index) => (
              <div
                key={`${insight.title}-${index}`}
                className={`rounded-md border px-4 py-3 ${insightToneClass(insight.tone)}`}
              >
                <div className='font-medium'>{insight.title}</div>
                <p className='text-muted-foreground mt-1 text-sm leading-6'>{insight.body}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function FallbackInsightCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>영상 인사이트</CardTitle>
        <CardDescription>
          상세 리포트가 없는 영상은 목록 메트릭 기준으로 표시합니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='bg-muted/30 rounded-md border px-4 py-3'>
          <div className='font-medium'>리포트 API 대기</div>
          <p className='text-muted-foreground mt-1 text-sm leading-6'>
            백엔드 상세 리포트가 준비되면 태그, 분포, 날짜별 원본 시계열이 자동으로 대체됩니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function DistributionCard({ title, buckets }: { title: string; buckets: MetricBucket[] }) {
  const visibleBuckets = buckets.slice(0, 8);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>댓글과 분석 신호 기반 분포입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        {visibleBuckets.length === 0 ? (
          <div className='text-muted-foreground rounded-md border px-4 py-8 text-center text-sm'>
            표시할 분포 데이터가 없습니다.
          </div>
        ) : (
          <div className='grid gap-3'>
            {visibleBuckets.map((bucket) => (
              <div key={bucket.label}>
                <div className='mb-1 flex items-center justify-between gap-3 text-sm'>
                  <span className='truncate font-medium'>{bucketLabel(bucket.label)}</span>
                  <span className='text-muted-foreground shrink-0 tabular-nums'>
                    {formatPercent(bucketPercent(bucket), 1)}
                  </span>
                </div>
                <div className='bg-muted h-2 overflow-hidden rounded-full'>
                  <div
                    className='bg-primary h-full rounded-full'
                    style={{ width: `${Math.min(bucketPercent(bucket), 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function VideoDetailSkeleton() {
  return (
    <div className='space-y-4'>
      <div className='grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.65fr)]'>
        <Skeleton className='aspect-video w-full' />
        <Skeleton className='h-80 w-full' />
      </div>
      <div className='grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className='h-28 w-full' />
        ))}
      </div>
      <div className='grid gap-4 xl:grid-cols-2'>
        <Skeleton className='h-96 w-full' />
        <Skeleton className='h-96 w-full' />
      </div>
    </div>
  );
}
