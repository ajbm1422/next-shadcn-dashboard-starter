import { LandingPage } from '@/features/marketing/components/marketing-pages';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '플러 - 온라인 쇼핑몰 숏폼 솔루션',
  description: '쇼핑몰 상세페이지와 상품 경험에 숏폼 플레이어, 위젯, 통계를 연결합니다.'
};

export default function Page() {
  return <LandingPage />;
}
