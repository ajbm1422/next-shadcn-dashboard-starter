'use client';

import type { ComponentType } from 'react';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Icons } from '@/components/icons';
import {
  toneBadgeClass,
  useDashboardOverview,
  type DashboardKpi
} from '@/features/overview/lib/use-dashboard-overview';

const kpiIcons = {
  teams: Icons.teams,
  video: Icons.video,
  warning: Icons.warning,
  adjustments: Icons.adjustments
} satisfies Record<DashboardKpi['icon'], ComponentType<{ className?: string }>>;

export function DashboardKpiGrid() {
  const { overview, isLoading, isError } = useDashboardOverview();

  return (
    <div className='space-y-3'>
      {isError && (
        <div className='border-destructive/30 bg-destructive/5 text-destructive rounded-lg border px-3 py-2 text-sm'>
          대시보드 API 연결을 확인하지 못했습니다. 백엔드 또는 프록시 설정을 확인해 주세요.
        </div>
      )}
      <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'>
        {overview.kpis.map((kpi) => (
          <KpiCard key={kpi.label} kpi={kpi} isLoading={isLoading} />
        ))}
      </div>
    </div>
  );
}

function KpiCard({ kpi, isLoading }: { kpi: DashboardKpi; isLoading: boolean }) {
  const Icon = kpiIcons[kpi.icon];

  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardDescription>{kpi.label}</CardDescription>
        <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
          {isLoading ? <Skeleton className='h-8 w-28' /> : kpi.value}
        </CardTitle>
        <CardAction>
          <Badge variant='outline' className={toneBadgeClass(kpi.tone)}>
            <Icon className='size-3.5' />
            {kpi.badge}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className='flex-col items-start gap-1.5 text-sm'>
        <div className='line-clamp-1 flex gap-2 font-medium'>
          {kpi.description}
          <Icon className='text-muted-foreground size-4' />
        </div>
        <div className='text-muted-foreground'>Infinder backend aggregate</div>
      </CardFooter>
    </Card>
  );
}
