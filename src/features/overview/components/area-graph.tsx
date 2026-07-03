'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { useDashboardOverview } from '@/features/overview/lib/use-dashboard-overview';

export function AreaGraph() {
  const { overview, isLoading } = useDashboardOverview();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          판단 스코어
          <Badge variant='outline' className='ml-2 align-middle'>
            <Icons.trendingUp />
            Backend
          </Badge>
        </CardTitle>
        <CardDescription>브랜드 적합도, 성장 지수, 백로그 안정성을 한 번에 봅니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4 md:grid-cols-3'>
          {overview.scoreItems.map((item) => (
            <div key={item.label} className='bg-muted/25 rounded-lg border p-4'>
              <div className='flex items-start justify-between gap-3'>
                <div className='min-w-0'>
                  <p className='text-sm font-medium'>{item.label}</p>
                  <p className='text-muted-foreground mt-1 line-clamp-2 text-xs'>
                    {item.description}
                  </p>
                </div>
                {isLoading ? (
                  <Skeleton className='h-6 w-12' />
                ) : (
                  <span className='text-lg font-semibold tabular-nums'>{item.display}</span>
                )}
              </div>
              <Progress className='mt-4' value={isLoading ? 0 : item.value} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
