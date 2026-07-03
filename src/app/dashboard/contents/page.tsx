import PageContainer from '@/components/layout/page-container';
import { ContentsPage } from '@/features/infinder/components/contents-page';

export const metadata = {
  title: 'Dashboard: Contents'
};

export default function Page() {
  return (
    <PageContainer
      pageTitle='콘텐츠'
      pageDescription='저장 영상 풀을 검색하고 토픽별로 확인합니다.'
    >
      <ContentsPage />
    </PageContainer>
  );
}
