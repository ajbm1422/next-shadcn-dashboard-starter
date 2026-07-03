'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { AppArtifact } from '../../schemas/artifact.schema';
import { formatCompactNumber, formatPercent, platformLabel } from '../../utils/formatters';

export function CampaignSummaryCards({
  artifact
}: {
  artifact: Extract<AppArtifact, { kind: 'campaign_summary' }>;
}) {
  return (
    <div className='space-y-4'>
      <div className='grid gap-3 sm:grid-cols-2 xl:grid-cols-3'>
        {artifact.summaryCards.map((card) => (
          <Card key={card.label}>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-medium'>{card.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-semibold'>{card.value}</div>
              {card.description && (
                <p className='text-muted-foreground mt-1 text-xs'>{card.description}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {artifact.recommendedCreators && artifact.recommendedCreators.length > 0 && (
        <div className='rounded-lg border'>
          <div className='border-b px-4 py-3 text-sm font-medium'>추천 후보</div>
          <div className='divide-y'>
            {artifact.recommendedCreators.map((creator) => (
              <div key={creator.id} className='flex items-center gap-3 px-4 py-3 text-sm'>
                <div className='min-w-0 flex-1'>
                  <div className='truncate font-medium'>{creator.name}</div>
                  <div className='text-muted-foreground text-xs'>
                    {platformLabel(creator.platform)} · {formatCompactNumber(creator.followers)} ·{' '}
                    {formatPercent(creator.engagementRate)}
                  </div>
                </div>
                <Badge variant='outline'>{creator.score?.toFixed(1) ?? '-'}</Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
