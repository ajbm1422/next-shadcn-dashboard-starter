import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function AiPlaceholderPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Icons.sparkles className='size-5' />
          AI
          <Badge variant='outline'>준비 중</Badge>
        </CardTitle>
        <CardDescription>
          AI 추천/대화 기능은 다음 단계에서 기존 기능을 검토한 뒤 연결합니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='bg-muted/30 text-muted-foreground rounded-lg border px-4 py-10 text-sm'>
          현재는 라우트와 메뉴만 연결된 상태입니다.
        </div>
      </CardContent>
    </Card>
  );
}
