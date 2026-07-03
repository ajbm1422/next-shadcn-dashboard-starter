import { TermsPage } from '@/features/marketing/components/marketing-pages';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '일본 고객 특약 - 플러',
  description: '플러 서비스 일본 고객 특약 로컬 문서입니다.'
};

export default function Page() {
  return <TermsPage kind='japan-addendum' />;
}
