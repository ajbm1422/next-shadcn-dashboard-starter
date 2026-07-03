export function formatDate(
  date: Date | string | number | undefined,
  opts: Intl.DateTimeFormatOptions = {}
) {
  if (!date) return '';

  try {
    return new Intl.DateTimeFormat('en-US', {
      month: opts.month ?? 'long',
      day: opts.day ?? 'numeric',
      year: opts.year ?? 'numeric',
      ...opts
    }).format(new Date(date));
  } catch {
    return '';
  }
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

function toNumber(value: bigint | number | string | undefined) {
  return Number(value ?? 0);
}
