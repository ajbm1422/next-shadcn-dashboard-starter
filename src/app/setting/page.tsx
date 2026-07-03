import { FeaturePage } from '@/features/marketing/components/marketing-pages';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '플레이어 설정 - 플러',
  description: '재생바, 자동 재생, 반복 재생, 크기 설정을 관리합니다.'
};

export default function Page() {
  return <FeaturePage slug='setting' />;
}
