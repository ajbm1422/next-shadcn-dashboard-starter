import { z } from 'zod';
import type { AppArtifact } from '@/features/ai-assistant/schemas/artifact.schema';

export const runtime = 'nodejs';

const requestSchema = z.object({
  message: z.string().min(1)
});

const encoder = new TextEncoder();

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sse(event: string, data: unknown) {
  return encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}

const sampleCreatorArtifact: AppArtifact = {
  id: 'art_creator_beauty_001',
  kind: 'creator_table',
  title: '유튜브 뷰티 인플루언서 후보',
  description: '20대 여성 타깃 / 뷰티 / 쇼츠 중심 / 최근 업로드 활성 기준',
  rows: [
    {
      id: 'creator_001',
      name: 'Glow Day',
      platform: 'youtube',
      handle: '@glowday',
      profileImageUrl: 'https://i.pravatar.cc/128?img=32',
      followers: 428000,
      avgViews: 186000,
      engagementRate: 5.8,
      recentPostAt: '2026-06-30T09:00:00.000Z',
      score: 92.4,
      tags: ['뷰티', '쇼츠', '20대 여성', '스킨케어'],
      url: 'https://www.youtube.com/@glowday'
    },
    {
      id: 'creator_002',
      name: '미니멀 뷰티룸',
      platform: 'youtube',
      handle: '@minimalbeautyroom',
      profileImageUrl: 'https://i.pravatar.cc/128?img=47',
      followers: 218000,
      avgViews: 121000,
      engagementRate: 6.3,
      recentPostAt: '2026-07-01T12:30:00.000Z',
      score: 89.1,
      tags: ['메이크업', '학생', '가성비', '릴스재활용'],
      url: 'https://www.youtube.com/@minimalbeautyroom'
    },
    {
      id: 'creator_003',
      name: '오늘의 파우치',
      platform: 'youtube',
      handle: '@todaypouch',
      profileImageUrl: 'https://i.pravatar.cc/128?img=12',
      followers: 356000,
      avgViews: 164000,
      engagementRate: 4.9,
      recentPostAt: '2026-06-29T18:10:00.000Z',
      score: 86.7,
      tags: ['색조', '리뷰', '올리브영', '광고집행경험'],
      url: 'https://www.youtube.com/@todaypouch'
    },
    {
      id: 'creator_004',
      name: '틴트로그',
      platform: 'youtube',
      handle: '@tintlog',
      profileImageUrl: 'https://i.pravatar.cc/128?img=25',
      followers: 146000,
      avgViews: 97000,
      engagementRate: 7.2,
      recentPostAt: '2026-07-02T04:20:00.000Z',
      score: 84.8,
      tags: ['립제품', '쇼츠', '댓글반응높음'],
      url: 'https://www.youtube.com/@tintlog'
    },
    {
      id: 'creator_005',
      name: '윤슬 Beauty',
      platform: 'youtube',
      handle: '@yoonseulbeauty',
      profileImageUrl: 'https://i.pravatar.cc/128?img=5',
      followers: 512000,
      avgViews: 209000,
      engagementRate: 4.4,
      recentPostAt: '2026-06-28T15:40:00.000Z',
      score: 83.6,
      tags: ['럭셔리', '브랜드협업', '롱폼+쇼츠'],
      url: 'https://www.youtube.com/@yoonseulbeauty'
    }
  ]
};

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => undefined));

  if (!parsed.success) {
    return Response.json({ message: 'message is required' }, { status: 400 });
  }

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = async (event: string, data: unknown, delay = 260) => {
        controller.enqueue(sse(event, data));
        await sleep(delay);
      };

      try {
        await send('thread.started', { threadId: 'thread_mock_001' }, 180);
        await send('message.started', { messageId: 'msg_mock_001', role: 'assistant' }, 180);
        await send('message.delta', {
          messageId: 'msg_mock_001',
          delta: '좋아. 요청한 조건을 기준으로 후보군을 먼저 좁혀볼게. '
        });
        await send('message.delta', {
          messageId: 'msg_mock_001',
          delta: '타깃, 카테고리, 최근 업로드 활성도, 평균 조회수, 참여율을 같이 보겠습니다.\n\n'
        });
        await send('tool.started', {
          toolCallId: 'tool_mock_001',
          name: 'search_youtube_creators',
          label: '유튜브 후보 검색'
        });
        await send('tool.progress', {
          toolCallId: 'tool_mock_001',
          message: '최근 30일 영상 업로드와 쇼츠 반응 데이터를 확인 중...'
        });
        await send('artifact.started', {
          artifactId: sampleCreatorArtifact.id,
          kind: sampleCreatorArtifact.kind,
          title: sampleCreatorArtifact.title,
          description: sampleCreatorArtifact.description
        });
        await send(
          'artifact.completed',
          {
            artifact: sampleCreatorArtifact
          },
          340
        );
        await send('message.delta', {
          messageId: 'msg_mock_001',
          delta:
            '우선 5명을 샘플로 정리했어. 점수는 후보 적합도, 평균 조회수, 참여율, 최근 업로드 활성도를 합산한 내부 기준입니다. '
        });
        await send('message.delta', {
          messageId: 'msg_mock_001',
          delta:
            '오른쪽 결과 패널에서 후보 테이블을 확인하고, 이후 캠페인 저장이나 CSV 내보내기로 연결하면 됩니다.'
        });
        await send('suggestions.updated', {
          suggestions: [
            '후보별 최근 유튜브 쇼츠 조회수 추이를 비교해줘',
            '광고 이력이 있는 유튜브 채널만 다시 정렬해줘',
            '예산 500만원 기준으로 유튜브 후보 우선순위를 만들어줘'
          ]
        });
        await send('tool.completed', {
          toolCallId: 'tool_mock_001',
          message: '검색이 완료됐어.'
        });
        await send('message.completed', { messageId: 'msg_mock_001' }, 120);
        await send('done', {}, 0);
        controller.close();
      } catch (error) {
        controller.enqueue(
          sse('error', {
            message: error instanceof Error ? error.message : 'mock stream failed'
          })
        );
        controller.close();
      }
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive'
    }
  });
}
