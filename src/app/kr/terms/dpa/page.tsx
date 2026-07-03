import { TermsPage } from '@/features/marketing/components/marketing-pages';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '데이터 처리 계약서 - 찰나',
  description: '찰나 서비스 데이터 처리 계약서 로컬 문서입니다.'
};

export default function Page() {
  return <TermsPage kind='dpa' />;
}
