'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import type { AppArtifact } from '../schemas/artifact.schema';
import { BlogResultTable } from './artifacts/blog-result-table';
import { CampaignSummaryCards } from './artifacts/campaign-summary-cards';
import { CreatorResultTable } from './artifacts/creator-result-table';
import { InstagramResultGrid } from './artifacts/instagram-result-grid';
import { InsightChart } from './artifacts/insight-chart';
import { VideoResultGrid } from './artifacts/video-result-grid';

export function ArtifactRenderer({ artifact }: { artifact: AppArtifact }) {
  switch (artifact.kind) {
    case 'creator_table':
      return <CreatorResultTable rows={artifact.rows} />;
    case 'video_grid':
      return <VideoResultGrid items={artifact.items} />;
    case 'blog_table':
      return <BlogResultTable rows={artifact.rows} />;
    case 'instagram_grid':
      return <InstagramResultGrid items={artifact.items} />;
    case 'chart':
      return <InsightChart artifact={artifact} />;
    case 'campaign_summary':
      return <CampaignSummaryCards artifact={artifact} />;
    default:
      return (
        <Alert>
          <AlertDescription>지원하지 않는 결과 형식입니다.</AlertDescription>
        </Alert>
      );
  }
}
