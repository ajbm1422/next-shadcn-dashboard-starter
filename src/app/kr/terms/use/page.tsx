import { TermsPage } from '@/features/marketing/components/marketing-pages';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관 - 플러',
  description: '플러 서비스 표준이용약관입니다.'
};

export default function Page() {
  return <TermsPage kind='use' />;
}
