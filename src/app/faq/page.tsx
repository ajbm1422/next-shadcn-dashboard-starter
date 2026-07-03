import { FaqPage } from '@/features/marketing/components/marketing-pages';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '자주 묻는 질문 - 찰나 Guide',
  description: '숏폼 플레이어, 위젯, 통계, 플랜과 결제 관련 질문을 문서형 레이아웃으로 정리합니다.'
};

export default function Page() {
  return <FaqPage />;
}
