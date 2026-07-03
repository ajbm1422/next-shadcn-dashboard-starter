import Image from 'next/image';
import { cn } from '@/lib/utils';

type FlurLogoSize = 'xs' | 'sm' | 'md' | 'lg';

const logoSizes: Record<FlurLogoSize, { mark: string; text: string; gap: string }> = {
  xs: { mark: 'size-5 rounded-[6px]', text: 'text-base', gap: 'gap-1.5' },
  sm: { mark: 'size-6 rounded-md', text: 'text-lg', gap: 'gap-2' },
  md: { mark: 'size-7 rounded-lg', text: 'text-xl', gap: 'gap-2' },
  lg: { mark: 'size-9 rounded-xl', text: 'text-2xl', gap: 'gap-2.5' }
};

export function FlurLogo({
  size = 'md',
  className,
  markClassName,
  wordmarkClassName,
  hideWordmark = false
}: {
  size?: FlurLogoSize;
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  hideWordmark?: boolean;
}) {
  const logoSize = logoSizes[size];

  return (
    <span className={cn('inline-flex min-w-0 items-center', logoSize.gap, className)}>
      <Image
        src='/brand/flur-mark.svg'
        alt=''
        width={64}
        height={64}
        priority
        className={cn('shrink-0 shadow-sm', logoSize.mark, markClassName)}
      />
      {!hideWordmark && (
        <span
          style={{
            fontFamily:
              "var(--font-outfit), var(--font-inter), 'Apple SD Gothic Neo', 'Pretendard', system-ui, sans-serif"
          }}
          className={cn(
            'flur-wordmark truncate font-extrabold tracking-normal text-current',
            logoSize.text,
            wordmarkClassName
          )}
        >
          플러
        </span>
      )}
    </span>
  );
}
