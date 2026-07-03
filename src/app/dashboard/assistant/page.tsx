import PageContainer from '@/components/layout/page-container';
import { AiWorkspace } from '@/features/ai-assistant/components/ai-workspace';

export const metadata = {
  title: 'Dashboard: AI Assistant'
};

export default function Page() {
  return (
    <PageContainer>
      <AiWorkspace />
    </PageContainer>
  );
}
