import { GuideOverviewPage } from '@/features/marketing/components/marketing-pages';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용 가이드 - 플러',
  description: '플러 서비스 이용 가이드 홈입니다.'
};

export default function Page() {
  return <GuideOverviewPage />;
}
