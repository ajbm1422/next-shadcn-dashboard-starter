'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import type { Channel } from '@/gen/infinder/v1/infinder_pb';
import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { listChannels } from '@/lib/infinder-client';
import { formatCompact, formatNumber } from '@/lib/format';
import {
  avgViewOptions,
  channelCategoryOptions,
  channelSortOptions,
  subscriberOptions
} from '@/features/infinder/options';
import {
  average,
  channelRole,
  deltaClassName,
  metric,
  signedCompact
} from '@/features/infinder/utils';

export function InfluencersPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('subscriber_count');
  const [minSubscribers, setMinSubscribers] = useState(0);
  const [minAvgViews, setMinAvgViews] = useState(0);
  const [paidOnly, setPaidOnly] = useState(false);
  const [videoSearch, setVideoSearch] = useState('');

  const channelsQuery = useQuery({
    queryKey: [
      'infinder',
      'channels',
      search,
      category,
      sort,
      minSubscribers,
      minAvgViews,
      paidOnly,
      videoSearch
    ],
    queryFn: () =>
      listChannels({
        search,
        category,
        sort,
        minSubscribers,
        minAvgViews,
        paidOnly,
        minPaidAdvertisingCount: paidOnly ? 1 : 0,
        videoSearch,
        pageSize: 30
      }),
    enabled: isMounted,
    staleTime: 30_000,
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const channels = isMounted ? (channelsQuery.data?.channels ?? []) : [];
  const total = isMounted ? channelsQuery.data?.total : 0;
  const isLoading = !isMounted || channelsQuery.isLoading;
  const openChannel = (channel: Channel) => {
    const id = channel.id || channel.channelId;
    if (id) router.push(`/dashboard/influencers/${encodeURIComponent(id)}`);
  };

  return (
    <div className='space-y-4'>
      <Card>
        <CardHeader>
          <CardTitle>필터</CardTitle>
          <CardDescription>
            채널명, 카테고리, 성장/광고 조건으로 운영 DB를 조회합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(240px,1fr)_repeat(4,minmax(132px,0.72fr))_auto]'>
            <InputGroup>
              <InputGroupAddon>
                <Icons.search />
              </InputGroupAddon>
              <InputGroupInput
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder='채널명, 핸들, 설명, 키워드 검색'
              />
            </InputGroup>

            <Select
              value={category || 'all'}
              onValueChange={(value) => setCategory(value === 'all' ? '' : value)}
            >
              <SelectTrigger className='w-full'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>전체 카테고리</SelectItem>
                {channelCategoryOptions.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className='w-full'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {channelSortOptions.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={String(minSubscribers)}
              onValueChange={(value) => setMinSubscribers(Number(value))}
            >
              <SelectTrigger className='w-full'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {subscriberOptions.map((item) => (
                  <SelectItem key={item.value} value={String(item.value)}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={String(minAvgViews)}
              onValueChange={(value) => setMinAvgViews(Number(value))}
            >
              <SelectTrigger className='w-full'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {avgViewOptions.map((item) => (
                  <SelectItem key={item.value} value={String(item.value)}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <label
              htmlFor='paid-only'
              className='border-input hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:hover:bg-input/50 flex h-9 w-fit cursor-pointer items-center gap-2 rounded-md border px-2.5 text-sm whitespace-nowrap shadow-xs transition-colors'
            >
              <Checkbox
                id='paid-only'
                checked={paidOnly}
                onCheckedChange={(value) => setPaidOnly(value === true)}
              />
              <span>광고 이력</span>
            </label>

            <InputGroup className='md:col-span-2 xl:col-span-2'>
              <InputGroupAddon>
                <Icons.search />
              </InputGroupAddon>
              <InputGroupInput
                value={videoSearch}
                onChange={(event) => setVideoSearch(event.target.value)}
                placeholder='광고 영상/주제 검색'
              />
            </InputGroup>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <CardTitle>운영 채널</CardTitle>
            <CardDescription>한국권 후보 채널을 백엔드 집계 기준으로 조회합니다.</CardDescription>
          </div>
          <Badge variant='outline' className='w-fit'>
            {formatNumber(total)}개
          </Badge>
        </CardHeader>
        <CardContent>
          <ChannelResult
            channels={channels}
            isLoading={isLoading}
            isError={channelsQuery.isError}
            onOpenChannel={openChannel}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function ChannelResult({
  channels,
  isLoading,
  isError,
  onOpenChannel
}: {
  channels: Channel[];
  isLoading: boolean;
  isError: boolean;
  onOpenChannel: (channel: Channel) => void;
}) {
  return (
    <>
      <div className='grid gap-3 md:hidden'>
        {isLoading &&
          Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className='h-32 w-full' />
          ))}
        {!isLoading && isError && (
          <StateMessage tone='error' message='운영 채널을 불러오지 못했습니다.' />
        )}
        {!isLoading && !isError && channels.length === 0 && (
          <StateMessage message='조건에 맞는 채널이 없습니다.' />
        )}
        {!isLoading &&
          !isError &&
          channels.map((channel) => (
            <ChannelMobileCard
              key={channel.id}
              channel={channel}
              onOpen={() => onOpenChannel(channel)}
            />
          ))}
      </div>

      <div className='hidden overflow-x-auto md:block'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='min-w-72'>채널</TableHead>
              <TableHead>카테고리</TableHead>
              <TableHead>역할</TableHead>
              <TableHead className='text-right'>구독자</TableHead>
              <TableHead className='text-right'>영상</TableHead>
              <TableHead className='text-right'>조회수</TableHead>
              <TableHead className='text-right'>7일 구독</TableHead>
              <TableHead className='text-right'>광고</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading &&
              Array.from({ length: 8 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={8}>
                    <Skeleton className='h-10 w-full' />
                  </TableCell>
                </TableRow>
              ))}
            {!isLoading && isError && (
              <TableRow>
                <TableCell colSpan={8} className='h-28 text-center text-sm text-destructive'>
                  운영 채널을 불러오지 못했습니다.
                </TableCell>
              </TableRow>
            )}
            {!isLoading && !isError && channels.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className='text-muted-foreground h-28 text-center text-sm'>
                  조건에 맞는 채널이 없습니다.
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              !isError &&
              channels.map((channel) => (
                <ChannelTableRow
                  key={channel.id}
                  channel={channel}
                  onOpen={() => onOpenChannel(channel)}
                />
              ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

function ChannelTableRow({ channel, onOpen }: { channel: Channel; onOpen: () => void }) {
  const avgViews = average(channel.viewCount, channel.videoCount);

  return (
    <TableRow
      role='link'
      tabIndex={0}
      className='hover:bg-muted/50 cursor-pointer'
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen();
        }
      }}
    >
      <TableCell>
        <div className='flex min-w-0 items-center gap-3'>
          <ChannelAvatar channel={channel} />
          <div className='min-w-0'>
            <p className='truncate font-medium'>{channel.name || '이름 없음'}</p>
            {channel.topics && (
              <p className='text-muted-foreground mt-1 max-w-[28rem] truncate text-xs'>
                {channel.topics}
              </p>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant='outline'>{channel.category || '미분류'}</Badge>
      </TableCell>
      <TableCell>
        <span className='bg-muted rounded-md px-2 py-1 text-xs font-medium'>
          {channelRole(channel.subscriberCount)}
        </span>
      </TableCell>
      <TableCell className='text-right font-medium tabular-nums'>
        {metric(channel.subscriberCount)}
      </TableCell>
      <TableCell className='text-right tabular-nums'>{metric(channel.videoCount)}</TableCell>
      <TableCell className='text-right'>
        <div className='font-medium tabular-nums'>{formatCompact(channel.viewCount)}</div>
        <div className='text-muted-foreground text-xs'>평균 {formatCompact(avgViews)}</div>
      </TableCell>
      <TableCell
        className={`text-right font-medium tabular-nums ${deltaClassName(
          channel.subscriberCountIncrease7
        )}`}
      >
        {signedCompact(channel.subscriberCountIncrease7)}
      </TableCell>
      <TableCell className='text-right tabular-nums'>
        {formatNumber(channel.paidAdvertisingCount)}
      </TableCell>
    </TableRow>
  );
}

function ChannelMobileCard({ channel, onOpen }: { channel: Channel; onOpen: () => void }) {
  const avgViews = average(channel.viewCount, channel.videoCount);

  return (
    <button
      type='button'
      className='hover:bg-muted/50 focus-visible:ring-ring w-full cursor-pointer rounded-lg border p-4 text-left transition-colors focus-visible:ring-2 focus-visible:outline-none'
      onClick={onOpen}
    >
      <div className='flex min-w-0 items-start gap-3'>
        <ChannelAvatar channel={channel} />
        <div className='min-w-0 flex-1'>
          <p className='line-clamp-2 font-medium leading-5'>{channel.name || '이름 없음'}</p>
          {channel.topics && (
            <p className='text-muted-foreground mt-1 line-clamp-1 text-xs'>{channel.topics}</p>
          )}
          <div className='mt-3 flex flex-wrap gap-1.5'>
            <Badge variant='outline'>{channel.category || '미분류'}</Badge>
            <span className='bg-muted rounded-md px-2 py-1 text-xs font-medium'>
              {channelRole(channel.subscriberCount)}
            </span>
          </div>
        </div>
      </div>

      <div className='mt-4 grid grid-cols-2 gap-2 text-xs'>
        <MobileMetric label='구독자' value={metric(channel.subscriberCount)} strong />
        <MobileMetric label='영상' value={metric(channel.videoCount)} />
        <MobileMetric
          label='조회수'
          value={formatCompact(channel.viewCount)}
          helper={`평균 ${formatCompact(avgViews)}`}
        />
        <MobileMetric label='광고' value={formatNumber(channel.paidAdvertisingCount)} />
        <MobileMetric
          label='7일 구독'
          value={signedCompact(channel.subscriberCountIncrease7)}
          tone={deltaClassName(channel.subscriberCountIncrease7)}
        />
      </div>
    </button>
  );
}

function ChannelAvatar({ channel }: { channel: Channel }) {
  return (
    <div className='bg-muted text-muted-foreground flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-md text-sm font-semibold'>
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

function MobileMetric({
  label,
  value,
  helper,
  tone,
  strong = false
}: {
  label: string;
  value: string;
  helper?: string;
  tone?: string;
  strong?: boolean;
}) {
  return (
    <div className='bg-muted/30 rounded-md border px-3 py-2'>
      <p className='text-muted-foreground text-[11px]'>{label}</p>
      <p
        className={`mt-1 truncate tabular-nums ${strong ? 'font-semibold' : 'font-medium'} ${tone ?? ''}`}
      >
        {value}
      </p>
      {helper && <p className='text-muted-foreground mt-0.5 truncate text-[11px]'>{helper}</p>}
    </div>
  );
}

function StateMessage({ message, tone }: { message: string; tone?: 'error' }) {
  return (
    <div
      className={`rounded-lg border px-4 py-8 text-center text-sm ${
        tone === 'error' ? 'text-destructive' : 'text-muted-foreground'
      }`}
    >
      {message}
    </div>
  );
}
