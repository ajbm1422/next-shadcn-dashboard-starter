'use client';

import { useThemeConfig } from '@/components/themes/active-theme';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { Icons } from '../icons';
import { Kbd } from '@/components/ui/kbd';
import { THEMES } from './theme.config';
import { cn } from '@/lib/utils';

type ThemeSelectorProps = {
  className?: string;
  triggerClassName?: string;
  compact?: boolean;
  contentAlign?: 'start' | 'center' | 'end';
};

export function ThemeSelector({
  className,
  triggerClassName,
  compact = false,
  contentAlign = 'end'
}: ThemeSelectorProps) {
  const { activeTheme, setActiveTheme } = useThemeConfig();

  return (
    <div className={cn('flex min-w-0 items-center gap-2', className)}>
      <Label htmlFor='theme-selector' className='sr-only'>
        테마
      </Label>
      <Select value={activeTheme} onValueChange={setActiveTheme}>
        <SelectTrigger
          id='theme-selector'
          className={cn(
            'min-w-0 justify-start',
            compact
              ? 'h-8 flex-1 px-2 *:data-[slot=select-value]:w-16'
              : '*:data-[slot=select-value]:w-24',
            triggerClassName
          )}
        >
          <span className='text-muted-foreground hidden sm:block'>
            <Icons.palette />
          </span>
          <span className='text-muted-foreground block sm:hidden'>테마</span>
          <SelectValue placeholder='테마 선택' />
          {!compact && <Kbd>T T</Kbd>}
        </SelectTrigger>
        <SelectContent align={contentAlign}>
          {THEMES.length > 0 && (
            <>
              <SelectGroup>
                <SelectLabel>테마</SelectLabel>
                {THEMES.map((theme) => (
                  <SelectItem key={theme.name} value={theme.value}>
                    {theme.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
