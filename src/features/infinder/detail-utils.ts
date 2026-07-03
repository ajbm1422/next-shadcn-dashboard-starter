import type { ChannelVideo, MetricBucket, ReportInsight } from '@/gen/infinder/v1/infinder_pb';
import { formatCompact, formatDate, formatNumber } from '@/lib/format';

export function videoDetailHref(video: Pick<ChannelVideo, 'id' | 'videoId'>) {
  const id = video.videoId || video.id;
  return id ? `/dashboard/videos/${encodeURIComponent(id)}` : '/dashboard/contents';
}

export function formatPercent(value: number, digits = 1) {
  if (!Number.isFinite(value)) return '-';
  return `${value.toFixed(digits)}%`;
}

export function formatScore(value: number) {
  if (!Number.isFinite(value)) return '-';
  return value.toFixed(1);
}

export function scoreLabel(value: number) {
  if (value >= 70) return '좋음';
  if (value >= 45) return '보통';
  return '주의';
}

export function scoreToneClass(value: number) {
  if (value >= 70) return 'text-emerald-600 dark:text-emerald-400';
  if (value >= 45) return 'text-amber-600 dark:text-amber-400';
  return 'text-rose-600 dark:text-rose-400';
}

export function coverage(done: number, total: number) {
  if (!total) return '-';
  return formatPercent((done / total) * 100, 0);
}

export function formatDuration(seconds: bigint | number) {
  const total = Number(seconds ?? 0);
  if (!Number.isFinite(total) || total <= 0) return '-';
  const minutes = Math.floor(total / 60);
  const remainingSeconds = Math.floor(total % 60);
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}:${String(remainingMinutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

export function formatPublishedAt(value: string) {
  return (
    formatDate(value, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }) || '-'
  );
}

export function metricDisplay(value: bigint | number | string | undefined, exact = false) {
  return exact ? formatNumber(value) : formatCompact(value);
}

export function bucketLabel(label: string) {
  const labels: Record<string, string> = {
    positive: '긍정',
    neutral: '중립',
    negative: '부정',
    male: '남성',
    female: '여성',
    unknown: '미상'
  };
  return labels[label] ?? (label || '미분류');
}

export function bucketPercent(bucket: MetricBucket) {
  return Number.isFinite(bucket.value) ? bucket.value : 0;
}

export function insightToneClass(tone: ReportInsight['tone']) {
  if (tone === 'positive')
    return 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20';
  if (tone === 'warning')
    return 'border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/20';
  if (tone === 'negative')
    return 'border-rose-200 bg-rose-50/50 dark:border-rose-900 dark:bg-rose-950/20';
  return 'bg-muted/30';
}
