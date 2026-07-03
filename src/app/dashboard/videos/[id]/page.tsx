import PageContainer from '@/components/layout/page-container';
import { VideoDetailPage } from '@/features/infinder/components/video-detail-page';

export const metadata = {
  title: 'Dashboard: Video Detail'
};

type PageProps = { params: Promise<{ id: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  const id = decodeURIComponent(params.id);

  return (
    <PageContainer
      pageTitle='영상 상세'
      pageDescription='영상 단위 성과, 날짜별 지표, 태그와 인사이트를 확인합니다.'
    >
      <VideoDetailPage id={id} />
    </PageContainer>
  );
}
