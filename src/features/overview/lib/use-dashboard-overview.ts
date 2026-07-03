'use client';

import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDashboard } from '@/lib/infinder-client';
import type { DashboardResponse } from '@/gen/infinder/v1/infinder_pb';

export type DashboardTone = 'positive' | 'warning' | 'danger' | 'neutral';

export type DashboardKpi = {
  label: string;
  value: string;
  description: string;
  badge: string;
  tone: DashboardTone;
  icon: 'teams' | 'video' | 'warning' | 'adjustments';
};

export type MetricChartDatum = {
  label: string;
  value: number;
  displayValue: string;
  normalized: number;
  tone: DashboardTone;
};

export type ScoreItem = {
  label: string;
  value: number;
  display: string;
  description: string;
};

export type OperationItem = {
  name: string;
  source: string;
  value: string;
  status: string;
  tone: DashboardTone;
};

export type SourceItem = {
  label: string;
  value: string;
  description: string;
};

export type CompositionDatum = {
  label: string;
  value: number;
  displayValue: string;
  fill: string;
};

export function useDashboardOverview() {
  const [isMounted, setIsMounted] = useState(false);
  const query = useQuery({
    queryKey: ['infinder', 'dashboard'],
    queryFn: getDashboard,
    enabled: isMounted,
    staleTime: 30_000,
    refetchOnWindowFocus: false
  });

  const dashboardData = isMounted ? query.data : undefined;
  const overview = useMemo(() => createDashboardOverview(dashboardData), [dashboardData]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return {
    ...query,
    isLoading: !isMounted || query.isLoading,
    overview
  };
}

function createDashboardOverview(data?: DashboardResponse) {
  const influencerCount = toNumber(data?.influencerCount);
  const contentCount = toNumber(data?.contentCount);
  const alertCount = toNumber(data?.alertCount);
  const avgBrandScore = Number(data?.avgBrandScore ?? 0);
  const growthIndex = Number(data?.growthIndex ?? 0);
  const healthTone: DashboardTone =
    alertCount > 1000 ? 'danger' : alertCount > 0 ? 'warning' : 'positive';

  const kpis: DashboardKpi[] = [
    {
      label: '운영 채널',
      value: formatNumber(data?.influencerCount),
      icon: 'teams',
      tone: 'positive',
      badge: data?.metrics?.[0]?.delta || '실시간',
      description: 'skip 제외 수집 대상'
    },
    {
      label: '저장 영상',
      value: formatNumber(data?.contentCount),
      icon: 'video',
      tone: 'neutral',
      badge: data?.metrics?.[1]?.delta || 'DB',
      description: '분석 가능한 콘텐츠 풀'
    },
    {
      label: '확인할 백로그',
      value: formatNumber(data?.alertCount),
      icon: 'warning',
      tone: healthTone,
      badge: alertCount > 0 ? '확인 필요' : '정상',
      description: 'step backlog 합계'
    },
    {
      label: '평균 후보 점수',
      value: avgBrandScore.toFixed(1),
      icon: 'adjustments',
      tone: scoreTone(avgBrandScore),
      badge: 'proxy',
      description: '브랜드 적합도 평균'
    }
  ];

  const metrics = data?.metrics?.length
    ? data.metrics
    : [
        {
          label: '운영 채널',
          value: formatNumber(data?.influencerCount),
          delta: '실시간',
          tone: 'neutral'
        },
        {
          label: '저장 영상',
          value: formatNumber(data?.contentCount),
          delta: 'DB',
          tone: 'neutral'
        },
        {
          label: '확인할 백로그',
          value: formatNumber(data?.alertCount),
          delta: 'mart',
          tone: alertCount > 0 ? 'warning' : 'positive'
        },
        {
          label: '평균 후보 점수',
          value: avgBrandScore.toFixed(1),
          delta: 'proxy',
          tone: 'positive'
        }
      ];

  const parsedMetrics = metrics.map((metric) => ({
    label: metric.label,
    value: parseMetricValue(metric.value),
    displayValue: metric.value,
    tone: normalizeTone(metric.tone)
  }));
  const maxLog = Math.max(...parsedMetrics.map((item) => Math.log10(item.value + 1)), 1);
  const metricChartData: MetricChartDatum[] = parsedMetrics.map((item) => ({
    ...item,
    normalized:
      item.value > 0 ? Math.max(6, Math.round((Math.log10(item.value + 1) / maxLog) * 100)) : 0
  }));

  const scoreItems: ScoreItem[] = [
    {
      label: '브랜드',
      value: clampScore(avgBrandScore),
      display: avgBrandScore.toFixed(1),
      description: '후보군의 브랜드 적합도 평균'
    },
    {
      label: '성장',
      value: clampScore(growthIndex),
      display: growthIndex.toFixed(1),
      description: '채널 성장 흐름 proxy'
    },
    {
      label: '백로그 안정',
      value: backlogHealth(alertCount),
      display: `${backlogHealth(alertCount).toFixed(0)}%`,
      description: '미처리 큐가 낮을수록 높음'
    }
  ];

  const operations: OperationItem[] = [
    {
      name: '채널 수집',
      source: 'influencers',
      value: formatCompact(data?.influencerCount),
      status: influencerCount > 0 ? '운영' : '대기',
      tone: influencerCount > 0 ? 'positive' : 'warning'
    },
    {
      name: '영상 저장',
      source: 'youtube_web_step_mart',
      value: formatCompact(data?.contentCount),
      status: contentCount > 0 ? '적재' : '대기',
      tone: contentCount > 0 ? 'positive' : 'warning'
    },
    {
      name: '백로그 확인',
      source: 'step_backlog',
      value: formatCompact(data?.alertCount),
      status: alertCount > 0 ? '확인 필요' : '정상',
      tone: healthTone
    },
    {
      name: '후보 스코어링',
      source: 'brand proxy',
      value: avgBrandScore.toFixed(1),
      status: avgBrandScore >= 65 ? '양호' : '관찰',
      tone: scoreTone(avgBrandScore)
    }
  ];

  const sources: SourceItem[] = [
    {
      label: 'Primary DB',
      value: 'influencers',
      description: '채널 수, 후보 점수, 성장 지수'
    },
    {
      label: 'Stats mart',
      value: 'youtube_web_step_mart',
      description: '저장 영상 수와 백로그 합계'
    },
    {
      label: 'Refresh',
      value: 'React Query',
      description: '30초 stale time, 포커스 재요청 비활성'
    }
  ];

  const compositionData: CompositionDatum[] = [
    {
      label: '운영 채널',
      value: logScale(influencerCount),
      displayValue: formatNumber(data?.influencerCount),
      fill: 'var(--color-channels)'
    },
    {
      label: '저장 영상',
      value: logScale(contentCount),
      displayValue: formatNumber(data?.contentCount),
      fill: 'var(--color-videos)'
    },
    {
      label: '백로그',
      value: Math.max(1, logScale(alertCount)),
      displayValue: formatNumber(data?.alertCount),
      fill: 'var(--color-backlog)'
    }
  ];

  return {
    kpis,
    metricChartData,
    scoreItems,
    operations,
    sources,
    compositionData,
    healthTone,
    alertCount
  };
}

export function formatNumber(value: bigint | number | string | undefined) {
  return new Intl.NumberFormat('ko-KR').format(toNumber(value));
}

export function formatCompact(value: bigint | number | string | undefined) {
  return new Intl.NumberFormat('ko-KR', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(toNumber(value));
}

export function toneBadgeClass(tone: DashboardTone | string) {
  switch (tone) {
    case 'positive':
      return 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300';
    case 'warning':
      return 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300';
    case 'danger':
      return 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300';
    default:
      return 'border-border bg-background text-muted-foreground';
  }
}

function normalizeTone(tone: string): DashboardTone {
  if (tone === 'positive' || tone === 'warning' || tone === 'danger' || tone === 'neutral') {
    return tone;
  }
  if (tone === 'negative') return 'danger';
  return 'neutral';
}

function toNumber(value: bigint | number | string | undefined) {
  return Number(value ?? 0);
}

function parseMetricValue(value: string) {
  const parsed = Number(value.replace(/[^\d.-]/g, ''));
  return Number.isFinite(parsed) ? Math.max(parsed, 0) : 0;
}

function clampScore(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, value));
}

function backlogHealth(value: number) {
  if (value <= 0) return 100;
  return Math.max(0, Math.min(100, 100 - Math.log10(value + 1) * 20));
}

function logScale(value: number) {
  if (value <= 0) return 0;
  return Math.max(1, Math.round(Math.log10(value + 1) * 24));
}

function scoreTone(value: number): DashboardTone {
  if (value >= 65) return 'positive';
  if (value >= 45) return 'neutral';
  return 'warning';
}
