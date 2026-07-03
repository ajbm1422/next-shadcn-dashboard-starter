import { SupportPage } from '@/features/marketing/components/marketing-pages';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '고객센터 - 플러',
  description: '플러 고객센터 문의 페이지입니다.'
};

export default function Page() {
  return <SupportPage />;
}
