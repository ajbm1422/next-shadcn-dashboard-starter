import { InfoButton } from '@/components/ui/info-button';
import type { InfobarContent } from '@/components/ui/infobar';

interface HeadingProps {
  title: string;
  description: string;
  infoContent?: InfobarContent;
}

export function Heading({ title, description, infoContent }: HeadingProps) {
  return (
    <div className='min-w-0'>
      <div className='flex min-w-0 flex-wrap items-center gap-2'>
        <h2 className='min-w-0 break-words text-2xl font-bold tracking-tight sm:text-3xl'>
          {title}
        </h2>
        {infoContent && (
          <div className='pt-1'>
            <InfoButton content={infoContent} />
          </div>
        )}
      </div>
      <p className='text-muted-foreground break-words text-sm'>{description}</p>
    </div>
  );
}
