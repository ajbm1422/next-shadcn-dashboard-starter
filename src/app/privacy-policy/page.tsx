import { TermsPage } from '@/features/marketing/components/marketing-pages';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침 - 플러',
  description: '플러 서비스 개인정보처리방침 로컬 문서입니다.'
};

export default function Page() {
  return <TermsPage kind='privacy' />;
}
