import { formatCompact, formatNumber } from '@/lib/format';

export function numeric(value: bigint | number | string | undefined) {
  return Number(value ?? 0);
}

export function average(total: bigint | number, count: bigint | number) {
  const denominator = Number(count);
  if (!Number.isFinite(denominator) || denominator <= 0) return 0;
  return Math.round(Number(total) / denominator);
}

export function signedCompact(value: number) {
  if (!Number.isFinite(value) || value === 0) return '-';
  const sign = value > 0 ? '+' : '';
  return `${sign}${formatCompact(Math.round(value))}`;
}

export function deltaClassName(value: number) {
  if (value > 0) return 'text-emerald-600 dark:text-emerald-400';
  if (value < 0) return 'text-rose-600 dark:text-rose-400';
  return 'text-muted-foreground';
}

export function channelRole(subscriberCount: bigint | number) {
  const subscribers = numeric(subscriberCount);
  if (subscribers >= 1_000_000) return '인지도 확산';
  if (subscribers >= 100_000) return '핵심 리뷰';
  if (subscribers >= 10_000) return '니치 테스트';
  return 'UGC 시드';
}

export function metric(value: bigint | number | string | undefined, exact = false) {
  return exact ? formatNumber(value) : formatCompact(value);
}
