import PageContainer from '@/components/layout/page-container';
import { ChannelDetailPage } from '@/features/infinder/components/channel-detail-page';

export const metadata = {
  title: 'Dashboard: Influencer Detail'
};

type PageProps = { params: Promise<{ id: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  const id = decodeURIComponent(params.id);

  return (
    <PageContainer
      pageTitle='인플루언서 상세'
      pageDescription='채널 단위 성과, 분석 커버리지, 상위 영상을 확인합니다.'
    >
      <ChannelDetailPage id={id} />
    </PageContainer>
  );
}
