'use client';

import { LabelList, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import {
  useDashboardOverview,
  type CompositionDatum
} from '@/features/overview/lib/use-dashboard-overview';
import { Skeleton } from '@/components/ui/skeleton';

const chartConfig = {
  value: {
    label: '상대 규모'
  },
  channels: {
    label: '운영 채널',
    color: 'var(--chart-1)'
  },
  videos: {
    label: '저장 영상',
    color: 'var(--chart-2)'
  },
  backlog: {
    label: '백로그',
    color: 'var(--chart-3)'
  }
} satisfies ChartConfig;

export function PieGraph() {
  const { overview, isLoading } = useDashboardOverview();

  return (
    <Card className='flex h-full flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>
          데이터 구성
          <Badge variant='outline'>
            <Icons.trendingUp />
            Log scale
          </Badge>
        </CardTitle>
        <CardDescription>운영 채널, 저장 영상, 백로그 상대 비중</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-1 items-center justify-center pb-0'>
        {isLoading ? (
          <Skeleton className='h-[250px] w-[250px] rounded-full' />
        ) : (
          <ChartContainer
            config={chartConfig}
            className='[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[300px] min-h-[250px]'
          >
            <PieChart>
              <ChartTooltip content={<CompositionTooltip />} />
              <Pie
                data={overview.compositionData}
                innerRadius={42}
                dataKey='value'
                nameKey='label'
                cornerRadius={8}
                paddingAngle={4}
              >
                <LabelList
                  dataKey='label'
                  stroke='none'
                  fontSize={12}
                  fontWeight={500}
                  fill='currentColor'
                  formatter={(value) => `${value ?? ''}`}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

function CompositionTooltip({
  active,
  payload
}: {
  active?: boolean;
  payload?: ReadonlyArray<{ payload?: CompositionDatum }>;
}) {
  const item = payload?.[0]?.payload;
  if (!active || !item) return null;

  return (
    <div className='border-border/50 bg-background rounded-lg border px-2.5 py-1.5 text-xs shadow-xl'>
      <div className='font-medium'>{item.label}</div>
      <div className='text-muted-foreground mt-1'>실제 값 {item.displayValue}</div>
    </div>
  );
}
