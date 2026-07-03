'use client';

import { Button } from '@/components/ui/button';

const examplePrompts = [
  '20대 여성 타깃 뷰티 유튜브 쇼츠 인플루언서 30명 찾아줘',
  '네이버 블로그에서 육아 카테고리 상위 블로거를 정리해줘',
  '인스타그램에서 서울 맛집 릴스 계정 후보를 찾아줘',
  '최근 업로드가 활발한 크리에이터만 필터링해줘'
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
        <br />
        <span>후보 검색과 정리는 AI가 처리하고 결과는 작업 화면에서 바로 확인할 수 있습니다.</span>
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
