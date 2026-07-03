import { PricingPage } from '@/features/marketing/components/marketing-pages';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '가격 안내 - 플러',
  description: '쇼핑몰 숏폼 플레이어와 위젯 플랜을 비교합니다.'
};

export default function Page() {
  return <PricingPage />;
}
