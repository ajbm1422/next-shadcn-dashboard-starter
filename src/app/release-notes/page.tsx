import { ReleaseNotesPage } from '@/features/marketing/components/marketing-pages';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '업데이트 소식 - 찰나',
  description: '찰나 서비스 릴리즈 노트입니다.'
};

export default function Page() {
  return <ReleaseNotesPage />;
}
