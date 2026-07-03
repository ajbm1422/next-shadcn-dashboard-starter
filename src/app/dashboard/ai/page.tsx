import PageContainer from '@/components/layout/page-container';
import { AiPlaceholderPage } from '@/features/infinder/components/ai-placeholder-page';

export const metadata = {
  title: 'Dashboard: AI'
};

export default function Page() {
  return (
    <PageContainer pageTitle='AI' pageDescription='AI 기능 연결을 위한 임시 페이지입니다.'>
      <AiPlaceholderPage />
    </PageContainer>
  );
}
