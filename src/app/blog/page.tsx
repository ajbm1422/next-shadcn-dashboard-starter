import { BlogPage } from '@/features/marketing/components/marketing-pages';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '블로그 - 찰나',
  description: '찰나 블로그의 인사이트, 고객사례, 업종별 숏폼 전략, 가이드북 콘텐츠를 제공합니다.'
};

export default function Page() {
  return <BlogPage />;
}
