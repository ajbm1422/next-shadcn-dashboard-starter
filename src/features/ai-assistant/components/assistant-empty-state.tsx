'use client';

import { Button } from '@/components/ui/button';

const examplePrompts = [
  '20대 여성 타깃 뷰티 유튜브 쇼츠 인플루언서 30명 찾아줘',
  '유튜브에서 서울 맛집 쇼츠 채널 후보를 찾아줘',
  '최근 30일 업로드가 활발한 유튜브 크리에이터만 필터링해줘',
  '광고 이력이 있는 유튜브 채널을 조회수 효율순으로 정리해줘'
];

export function AssistantEmptyState({
  onSelectPrompt
}: {
  onSelectPrompt: (prompt: string) => void;
}) {
  return (
    <div className='mx-auto flex max-w-2xl flex-col items-center px-2 text-center'>
      <h2 className='text-2xl font-semibold tracking-tight md:text-3xl'>
        찾고 싶은 인플루언서를 설명해 주세요
      </h2>
      <p className='text-muted-foreground mt-3 max-w-xl text-sm leading-6'>
        <span>타깃, 플랫폼, 예산, 제외 조건을 편하게 입력하세요.</span>
      </p>
      <div className='mt-6 grid w-full gap-2 sm:grid-cols-2'>
        {examplePrompts.map((prompt) => (
          <Button
            key={prompt}
            type='button'
            variant='outline'
            className='h-auto justify-start whitespace-normal px-3 py-3 text-left text-sm leading-5'
            onClick={() => onSelectPrompt(prompt)}
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
}
