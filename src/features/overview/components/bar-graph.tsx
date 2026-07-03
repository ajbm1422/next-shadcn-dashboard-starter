'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import {
  useDashboardOverview,
  type MetricChartDatum
} from '@/features/overview/lib/use-dashboard-overview';
import { Skeleton } from '@/components/ui/skeleton';

const chartConfig = {
  normalized: {
    label: '상대 규모',
    color: 'var(--chart-1)'
  }
} satisfies ChartConfig;

export function BarGraph() {
  const { overview, isLoading } = useDashboardOverview();

  return (
    <Card className='flex h-full flex-col'>
      <CardHeader>
        <CardTitle>
          운영 지표 상대 규모
          <Badge variant='outline' className='ml-2 align-middle'>
            <Icons.trendingUp />
            Log scale
          </Badge>
        </CardTitle>
        <CardDescription>서로 다른 단위의 집계값을 로그 스케일로 정규화합니다.</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-1 flex-col'>
        {isLoading ? (
          <Skeleton className='min-h-[280px] flex-1 xl:min-h-[420px]' />
        ) : (
          <ChartContainer
            config={chartConfig}
            className='aspect-auto min-h-[280px] flex-1 xl:min-h-[420px]'
          >
            <BarChart accessibilityLayer data={overview.metricChartData} margin={{ left: -24 }}>
              <CartesianGrid vertical={false} strokeDasharray='3 3' />
              <XAxis
                dataKey='label'
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                interval={0}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
                domain={[0, 100]}
              />
              <ChartTooltip cursor={false} content={<MetricTooltip />} />
              <Bar dataKey='normalized' fill='var(--color-normalized)' radius={4} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

function MetricTooltip({
  active,
  payload
}: {
  active?: boolean;
  payload?: ReadonlyArray<{ payload?: MetricChartDatum }>;
}) {
  const item = payload?.[0]?.payload;
  if (!active || !item) return null;

  return (
    <div className='border-border/50 bg-background rounded-lg border px-2.5 py-1.5 text-xs shadow-xl'>
      <div className='font-medium'>{item.label}</div>
      <div className='text-muted-foreground mt-1'>실제 값 {item.displayValue}</div>
      <div className='text-muted-foreground mt-1'>정규화 {item.normalized}%</div>
    </div>
  );
}
