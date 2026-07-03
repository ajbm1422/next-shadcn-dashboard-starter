import PageContainer from '@/components/layout/page-container';
import { DashboardKpiGrid } from '@/features/overview/components/dashboard-kpi-grid';
import React from 'react';

export default function OverViewLayout({
  sales,
  pie_stats,
  bar_stats,
  area_stats
}: {
  sales: React.ReactNode;
  pie_stats: React.ReactNode;
  bar_stats: React.ReactNode;
  area_stats: React.ReactNode;
}) {
  return (
    <PageContainer
      pageTitle='운영 대시보드'
      pageDescription='채널 풀, 저장 영상, 백로그, 후보 점수 흐름을 백엔드 집계 기준으로 확인합니다.'
    >
      <div className='flex flex-1 flex-col space-y-4'>
        <DashboardKpiGrid />
        <div className='grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <div className='col-span-4 h-full'>{bar_stats}</div>
          <div className='col-span-4 h-full md:col-span-3'>
            {/* sales arallel routes */}
            {sales}
          </div>
          <div className='col-span-4'>{area_stats}</div>
          <div className='col-span-4 min-h-0 md:col-span-3'>{pie_stats}</div>
        </div>
      </div>
    </PageContainer>
  );
}
