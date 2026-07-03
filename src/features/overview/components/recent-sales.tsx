'use client';

import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  toneBadgeClass,
  useDashboardOverview
} from '@/features/overview/lib/use-dashboard-overview';

export function RecentSales() {
  const { overview, isLoading } = useDashboardOverview();

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>운영 큐</CardTitle>
        <CardDescription>단계별 상태와 원천 지표를 확인합니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-5'>
          <div className='grid gap-2 md:hidden'>
            {overview.operations.map((item) => (
              <div key={item.name} className='bg-muted/25 rounded-lg border p-3'>
                <div className='flex items-start justify-between gap-3'>
                  <div className='min-w-0'>
                    <p className='text-sm font-medium'>{item.name}</p>
                    <p className='text-muted-foreground mt-1 truncate text-xs'>{item.source}</p>
                  </div>
                  <Badge variant='outline' className={toneBadgeClass(item.tone)}>
                    {item.status}
                  </Badge>
                </div>
                <div className='mt-3 text-right text-sm font-semibold tabular-nums'>
                  {isLoading ? <Skeleton className='ml-auto h-5 w-16' /> : item.value}
                </div>
              </div>
            ))}
          </div>

          <div className='hidden md:block'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>단계</TableHead>
                  <TableHead>원천</TableHead>
                  <TableHead className='text-right'>값</TableHead>
                  <TableHead className='text-right'>상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {overview.operations.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell className='font-medium'>{item.name}</TableCell>
                    <TableCell className='text-muted-foreground'>{item.source}</TableCell>
                    <TableCell className='text-right font-medium tabular-nums'>
                      {isLoading ? <Skeleton className='ml-auto h-5 w-14' /> : item.value}
                    </TableCell>
                    <TableCell className='text-right'>
                      <Badge variant='outline' className={toneBadgeClass(item.tone)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className='grid gap-2'>
            {overview.sources.map((source) => (
              <div key={source.label} className='bg-muted/25 rounded-lg border p-3'>
                <div className='flex items-center justify-between gap-3'>
                  <p className='text-sm font-medium'>{source.label}</p>
                  <p className='text-muted-foreground truncate text-xs'>{source.value}</p>
                </div>
                <p className='text-muted-foreground mt-1 text-xs leading-5'>{source.description}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
