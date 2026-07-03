export function formatCompactNumber(value: number | undefined) {
  if (value === undefined) return '-';

  return new Intl.NumberFormat('ko-KR', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(value);
}

export function formatPercent(value: number | undefined) {
  if (value === undefined) return '-';

  return `${value.toFixed(value >= 10 ? 0 : 1)}%`;
}

export function formatScore(value: number | undefined) {
  if (value === undefined) return '-';

  return value.toFixed(1);
}

export function formatDateLabel(value: string | undefined) {
  if (!value) return '-';

  try {
    return new Intl.DateTimeFormat('ko-KR', {
      month: 'short',
      day: 'numeric'
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function platformLabel(platform: 'youtube' | 'naver_blog' | 'instagram') {
  const labels = {
    youtube: '유튜브',
    naver_blog: '네이버 블로그',
    instagram: '인스타그램'
  } as const;

  return labels[platform];
}
