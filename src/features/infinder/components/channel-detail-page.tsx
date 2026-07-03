'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import type {
  Channel,
  ChannelReport,
  ChannelVideo,
  MetricBucket
} from '@/gen/infinder/v1/infinder_pb';
import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { getChannelReport } from '@/lib/infinder-client';
import {
  bucketLabel,
  bucketPercent,
  coverage,
  formatDuration,
  formatPercent,
  formatPublishedAt,
  formatScore,
  insightToneClass,
  metricDisplay,
  scoreLabel,
  scoreToneClass,
  videoDetailHref
} from '@/features/infinder/detail-utils';
import { saveVideoFallback } from '@/features/infinder/video-fallback';

export function ChannelDetailPage({ id }: { id: string }) {
  const [isMounted, setIsMounted] = useState(false);

  const reportQuery = useQuery({
    queryKey: ['infinder', 'channel-report', id],
    queryFn: () => getChannelReport(id),
    enabled: isMounted && Boolean(id),
    staleTime: 30_000,
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || reportQuery.isLoading) {
    return <ChannelDetailSkeleton />;
  }

  if (reportQuery.isError || !reportQuery.data?.channel) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>채널 리포트를 불러오지 못했습니다.</CardTitle>
          <CardDescription>운영 API에서 해당 채널의 분석 리포트를 찾지 못했습니다.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return <ChannelReportView report={reportQuery.data} />;
}

function ChannelReportView({ report }: { report: ChannelReport }) {
  const channel = report.channel;
  if (!channel) return null;

  return (
    <div className='space-y-4'>
      <ChannelHero channel={channel} report={report} />
      <ScoreGrid report={report} />
      <div className='grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]'>
        <InsightsCard report={report} />
        <CoverageCard report={report} />
      </div>
      <div className='grid gap-4 xl:grid-cols-2'>
        <DistributionCard title='시청자 분포' buckets={report.countryDistribution} />
        <DistributionCard title='주제 분포' buckets={report.topicDistribution} />
      </div>
      <VideoListCard
        title='상위 영상'
        description='조회수 기준 상위 영상입니다.'
        videos={report.topVideos}
        channelName={channel.name}
        channelId={channel.id}
      />
      <VideoListCard
        title='최근 영상'
        description='최근 수집된 영상과 분석 준비 상태입니다.'
        videos={report.recentVideos}
        channelName={channel.name}
        channelId={channel.id}
      />
    </div>
  );
}

function ChannelHero({ channel, report }: { channel: Channel; report: ChannelReport }) {
  return (
    <Card>
      <CardContent className='flex flex-col gap-5 p-5 lg:flex-row lg:items-start lg:justify-between'>
        <div className='flex min-w-0 gap-4'>
          <ChannelAvatar channel={channel} />
          <div className='min-w-0'>
            <div className='flex flex-wrap items-center gap-2'>
              <h2 className='truncate text-xl font-semibold'>{channel.name || '이름 없음'}</h2>
              <Badge variant='outline'>{channel.category || '미분류'}</Badge>
              {report.country && <Badge variant='secondary'>{report.country}</Badge>}
            </div>
            <p className='text-muted-foreground mt-2 line-clamp-3 max-w-4xl text-sm'>
              {report.description || channel.topics || '채널 설명이 아직 수집되지 않았습니다.'}
            </p>
            <div className='text-muted-foreground mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs'>
              <span>구독자 {metricDisplay(channel.subscriberCount)}</span>
              <span>영상 {metricDisplay(channel.videoCount, true)}개</span>
              <span>샘플 {metricDisplay(report.videoSampleCount, true)}개</span>
              <span>최근 갱신 {formatPublishedAt(report.updatedAt)}</span>
            </div>
          </div>
        </div>

        {report.channelUrl && (
          <Button asChild variant='outline' size='sm' className='shrink-0'>
            <a href={report.channelUrl} target='_blank' rel='noreferrer'>
              <Icons.externalLink className='size-4' />
              YouTube
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function ChannelAvatar({ channel }: { channel: Channel }) {
  return (
    <div className='bg-muted text-muted-foreground flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg text-lg font-semibold'>
      {channel.profileUrl ? (
        <span
          aria-hidden='true'
          className='size-full bg-cover bg-center'
          style={{ backgroundImage: `url("${encodeURI(channel.profileUrl)}")` }}
        />
      ) : (
        channel.name.slice(0, 1)
      )}
    </div>
  );
}

function ScoreGrid({ report }: { report: ChannelReport }) {
  return (
    <div className='grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
      <ScoreCard label='브랜드 적합도' value={report.brandFitScore} />
      <ScoreCard label='성장성' value={report.growthScore} />
      <ScoreCard label='참여도' value={report.engagementScore} />
      <ScoreCard label='데이터 신뢰도' value={report.dataConfidenceScore} />
    </div>
  );
}

function ScoreCard({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardContent className='p-4'>
        <div className='text-muted-foreground text-sm'>{label}</div>
        <div className='mt-3 flex items-end justify-between gap-3'>
          <div className={`text-2xl font-semibold tabular-nums ${scoreToneClass(value)}`}>
            {formatScore(value)}
          </div>
          <Badge variant='outline'>{scoreLabel(value)}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

function CoverageCard({ report }: { report: ChannelReport }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>분석 커버리지</CardTitle>
        <CardDescription>샘플 영상 기준 분석 재료 확보 상태입니다.</CardDescription>
      </CardHeader>
      <CardContent className='grid gap-3'>
        <CoverageRow
          label='분석 완료'
          value={coverage(report.analyzedVideoCount, report.videoSampleCount)}
          helper={`${report.analyzedVideoCount}/${report.videoSampleCount}`}
        />
        <CoverageRow
          label='스크립트'
          value={coverage(report.transcriptVideoCount, report.videoSampleCount)}
          helper={`${report.transcriptVideoCount}/${report.videoSampleCount}`}
        />
        <CoverageRow
          label='댓글'
          value={coverage(report.commentVideoCount, report.videoSampleCount)}
          helper={`${report.commentVideoCount}/${report.videoSampleCount}`}
        />
        <div className='grid grid-cols-2 gap-3 pt-1 text-sm'>
          <MetricBox label='평균 조회수' value={metricDisplay(report.avgViewsPerVideo)} />
          <MetricBox label='참여율' value={formatPercent(report.engagementRate)} />
          <MetricBox label='광고 영상' value={`${report.paidVideoCount}개`} />
          <MetricBox label='광고 구간' value={`${report.adSlotTotal}개`} />
        </div>
      </CardContent>
    </Card>
  );
}

function CoverageRow({ label, value, helper }: { label: string; value: string; helper: string }) {
  const percent = Number(value.replace('%', ''));

  return (
    <div>
      <div className='flex items-center justify-between text-sm'>
        <span className='font-medium'>{label}</span>
        <span className='text-muted-foreground tabular-nums'>{helper}</span>
      </div>
      <div className='bg-muted mt-2 h-2 overflow-hidden rounded-full'>
        <div
          className='bg-primary h-full rounded-full'
          style={{ width: `${Number.isFinite(percent) ? Math.min(percent, 100) : 0}%` }}
        />
      </div>
      <div className='text-muted-foreground mt-1 text-xs'>{value}</div>
    </div>
  );
}

function MetricBox({ label, value }: { label: string; value: string }) {
  return (
    <div className='bg-muted/30 rounded-md border px-3 py-2'>
      <div className='text-muted-foreground text-xs'>{label}</div>
      <div className='mt-1 font-semibold tabular-nums'>{value}</div>
    </div>
  );
}

function InsightsCard({ report }: { report: ChannelReport }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>운영 인사이트</CardTitle>
        <CardDescription>리포트 엔진이 요약한 협업 판단 포인트입니다.</CardDescription>
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

function DistributionCard({ title, buckets }: { title: string; buckets: MetricBucket[] }) {
  const visibleBuckets = buckets.slice(0, 8);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>분석된 영상과 댓글 신호 기반의 분포입니다.</CardDescription>
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

function VideoListCard({
  title,
  description,
  videos,
  channelName,
  channelId
}: {
  title: string;
  description: string;
  videos: ChannelVideo[];
  channelName: string;
  channelId: string;
}) {
  const router = useRouter();

  const openVideo = (video: ChannelVideo) => {
    const href = videoDetailHref(video);
    const id = video.videoId || video.id;

    if (id) {
      saveVideoFallback({
        id,
        videoId: video.videoId || id,
        title: video.title,
        thumbnail: video.thumbnail,
        channelName,
        channelId,
        viewCount: Number(video.viewCount),
        likeCount: Number(video.likeCount),
        commentCount: Number(video.commentCount),
        duration: Number(video.duration),
        publishedAt: video.publishedAt,
        topic: video.topic || video.analyticsCategory,
        engagementRate: video.engagementRate,
        likeRate: video.likeRate,
        commentRate: video.commentRate,
        source: 'channel'
      });
    }

    if (href !== '/dashboard/contents') router.push(href);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {videos.length === 0 ? (
          <div className='text-muted-foreground rounded-md border px-4 py-8 text-center text-sm'>
            표시할 영상이 없습니다.
          </div>
        ) : (
          <>
            <div className='grid gap-3 md:hidden'>
              {videos.map((video) => (
                <button
                  key={video.id || video.videoId}
                  type='button'
                  className='hover:bg-muted/50 focus-visible:ring-ring w-full rounded-md border p-3 text-left transition-colors focus-visible:ring-2 focus-visible:outline-none'
                  onClick={() => openVideo(video)}
                >
                  <VideoTitleCell video={video} />
                  <div className='mt-3 grid grid-cols-3 gap-2 text-xs'>
                    <MetricBox label='조회수' value={metricDisplay(video.viewCount)} />
                    <MetricBox label='좋아요' value={metricDisplay(video.likeCount)} />
                    <MetricBox label='댓글' value={metricDisplay(video.commentCount)} />
                  </div>
                </button>
              ))}
            </div>

            <div className='hidden overflow-x-auto md:block'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='min-w-96'>영상</TableHead>
                    <TableHead>토픽</TableHead>
                    <TableHead className='text-right'>조회수</TableHead>
                    <TableHead className='text-right'>좋아요</TableHead>
                    <TableHead className='text-right'>댓글</TableHead>
                    <TableHead className='text-right'>참여율</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {videos.map((video) => (
                    <TableRow
                      key={video.id || video.videoId}
                      role='link'
                      tabIndex={0}
                      className='hover:bg-muted/50 cursor-pointer'
                      onClick={() => openVideo(video)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          openVideo(video);
                        }
                      }}
                    >
                      <TableCell>
                        <VideoTitleCell video={video} />
                      </TableCell>
                      <TableCell>
                        <Badge variant='outline'>
                          {video.topic || video.analyticsCategory || '미분류'}
                        </Badge>
                      </TableCell>
                      <TableCell className='text-right tabular-nums'>
                        {metricDisplay(video.viewCount)}
                      </TableCell>
                      <TableCell className='text-right tabular-nums'>
                        {metricDisplay(video.likeCount)}
                      </TableCell>
                      <TableCell className='text-right tabular-nums'>
                        {metricDisplay(video.commentCount)}
                      </TableCell>
                      <TableCell className='text-right tabular-nums'>
                        {formatPercent(video.engagementRate)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function VideoTitleCell({ video }: { video: ChannelVideo }) {
  return (
    <div className='flex min-w-0 items-center gap-3'>
      <div className='bg-muted text-muted-foreground relative flex h-14 w-24 shrink-0 items-center justify-center overflow-hidden rounded-md text-xs'>
        {video.thumbnail ? (
          <span
            aria-hidden='true'
            className='size-full bg-cover bg-center'
            style={{ backgroundImage: `url("${encodeURI(video.thumbnail)}")` }}
          />
        ) : (
          'No image'
        )}
        <span className='bg-background/85 absolute right-1 bottom-1 rounded px-1 py-0.5 text-[10px] font-medium'>
          {formatDuration(video.duration)}
        </span>
      </div>
      <div className='min-w-0'>
        <div className='line-clamp-2 font-medium leading-5'>{video.title || '제목 없음'}</div>
        <div className='text-muted-foreground mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs'>
          <span>{formatPublishedAt(video.publishedAt)}</span>
          {video.paidContent && <span>유료광고 포함</span>}
          {video.hasAnalysis && <span>분석 완료</span>}
        </div>
      </div>
    </div>
  );
}

function ChannelDetailSkeleton() {
  return (
    <div className='space-y-4'>
      <Skeleton className='h-36 w-full' />
      <div className='grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className='h-28 w-full' />
        ))}
      </div>
      <div className='grid gap-4 xl:grid-cols-2'>
        <Skeleton className='h-80 w-full' />
        <Skeleton className='h-80 w-full' />
      </div>
    </div>
  );
}
