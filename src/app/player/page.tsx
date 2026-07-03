import { FeaturePage } from '@/features/marketing/components/marketing-pages';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '다용도 플레이어 - 플러',
  description: '상세페이지용 디스플레이어와 구매 연결형 샵 플레이어를 제공합니다.'
};

export default function Page() {
  return <FeaturePage slug='player' />;
}
