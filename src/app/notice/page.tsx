import { NoticePage } from '@/features/marketing/components/marketing-pages';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '공지사항 - 플러',
  description: '플러 서비스 공지사항입니다.'
};

export default function Page() {
  return <NoticePage />;
}
