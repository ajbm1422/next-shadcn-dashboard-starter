import { FeaturePage } from '@/features/marketing/components/marketing-pages';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '비디오 커머스 통계 - 찰나',
  description: '플레이어 로드, 전환, 참여 데이터를 날짜별로 확인합니다.'
};

export default function Page() {
  return <FeaturePage slug='statistic' />;
}
