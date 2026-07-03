import { SamplePage } from '@/features/marketing/components/marketing-pages';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '샘플페이지 - 찰나',
  description: '찰나 숏폼 플레이어 샘플 페이지입니다.'
};

export default function Page() {
  return <SamplePage />;
}
