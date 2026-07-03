import { GuideOverviewPage } from '@/features/marketing/components/marketing-pages';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용 가이드 - 찰나',
  description: '찰나 서비스 이용 가이드 홈입니다.'
};

export default function Page() {
  return <GuideOverviewPage />;
}
