import { FaqPage } from '@/features/marketing/components/marketing-pages';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '자주 묻는 질문 - 플러 Guide',
  description: '플러 서비스 자주 묻는 질문입니다.'
};

export default function Page() {
  return <FaqPage />;
}
