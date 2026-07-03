'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { getChannelReport } from '@/lib/infinder-client';
import { getVideoFallback } from '@/features/infinder/video-fallback';

type BreadcrumbItem = {
  title: string;
  link: string;
};

export function useBreadcrumbs() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [videoFallbackTitle, setVideoFallbackTitle] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const channelId = getDynamicSegment(pathname, '/dashboard/influencers/');
  const videoId = getDynamicSegment(pathname, '/dashboard/videos/');

  useEffect(() => {
    if (!videoId) {
      setVideoFallbackTitle('');
      return;
    }

    setVideoFallbackTitle(getVideoFallback(videoId)?.title ?? '');
  }, [videoId]);

  const channelQuery = useQuery({
    queryKey: ['infinder', 'channel-report', channelId],
    queryFn: () => getChannelReport(channelId),
    enabled: isMounted && Boolean(channelId),
    staleTime: 30_000,
    refetchOnWindowFocus: false
  });

  return useMemo<BreadcrumbItem[]>(() => {
    if (pathname === '/dashboard' || pathname === '/dashboard/overview') {
      return [{ title: '대시보드', link: '/dashboard/overview' }];
    }

    if (pathname === '/dashboard/influencers') {
      return [{ title: '인플루언서', link: '/dashboard/influencers' }];
    }

    if (channelId) {
      return [
        { title: '인플루언서', link: '/dashboard/influencers' },
        {
          title: channelQuery.data?.channel?.name || '채널 상세',
          link: `/dashboard/influencers/${encodeURIComponent(channelId)}`
        }
      ];
    }

    if (pathname === '/dashboard/contents') {
      return [{ title: '콘텐츠', link: '/dashboard/contents' }];
    }

    if (videoId) {
      return [
        { title: '콘텐츠', link: '/dashboard/contents' },
        {
          title: videoFallbackTitle || '영상 상세',
          link: `/dashboard/videos/${encodeURIComponent(videoId)}`
        }
      ];
    }

    if (pathname === '/dashboard/ai') {
      return [{ title: 'AI', link: '/dashboard/ai' }];
    }

    const segments = pathname
      .split('/')
      .filter(Boolean)
      .filter((segment) => segment !== 'dashboard');

    return segments.map((segment, index) => {
      const path = `/dashboard/${segments.slice(0, index + 1).join('/')}`;
      return {
        title: decodeURIComponent(segment),
        link: path
      };
    });
  }, [channelId, channelQuery.data?.channel?.name, pathname, videoFallbackTitle, videoId]);
}

function getDynamicSegment(pathname: string, prefix: string) {
  if (!pathname.startsWith(prefix)) return '';
  const segment = pathname.slice(prefix.length).split('/')[0];
  return segment ? decodeURIComponent(segment) : '';
}
