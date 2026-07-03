import { FeaturePage } from '@/features/marketing/components/marketing-pages';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '숏폼 위젯 - 플러',
  description: '쇼핑몰에 영상 위젯을 배치하고 상품 연결 흐름을 구성합니다.'
};

export default function Page() {
  return <FeaturePage slug='widget' />;
}
