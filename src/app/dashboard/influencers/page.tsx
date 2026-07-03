import PageContainer from '@/components/layout/page-container';
import { InfluencersPage } from '@/features/infinder/components/influencers-page';

export const metadata = {
  title: 'Dashboard: Influencers'
};

export default function Page() {
  return (
    <PageContainer
      pageTitle='인플루언서'
      pageDescription='운영 DB의 후보 채널을 검색하고 조건별로 필터링합니다.'
    >
      <InfluencersPage />
    </PageContainer>
  );
}
