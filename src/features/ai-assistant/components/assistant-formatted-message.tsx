'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type MarkdownBlock =
  | {
      type: 'heading';
      level: number;
      content: string;
    }
  | {
      type: 'paragraph';
      lines: string[];
    }
  | {
      type: 'list';
      ordered: boolean;
      items: string[];
    };

const INLINE_PATTERN = /(\*\*[^*]+?\*\*|`[^`]+?`|\[[^\]]+?\]\([^)]+?\))/g;

export function AssistantFormattedMessage({
  content,
  className
}: {
  content: string;
  className?: string;
}) {
  const blocks = parseMarkdownBlocks(content);

  return (
    <div
      className={cn('space-y-4 break-words text-[15px] leading-7 text-foreground/95', className)}
    >
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
}

function parseMarkdownBlocks(markdown: string): MarkdownBlock[] {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks: MarkdownBlock[] = [];
  let paragraph: string[] = [];
  let index = 0;

  const flushParagraph = () => {
    if (paragraph.length === 0) return;

    blocks.push({
      type: 'paragraph',
      lines: paragraph
    });
    paragraph = [];
  };

  while (index < lines.length) {
    const line = lines[index]?.trim() ?? '';

    if (!line) {
      flushParagraph();
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      blocks.push({
        type: 'heading',
        level: heading[1]?.length ?? 3,
        content: heading[2]?.trim() ?? ''
      });
      index += 1;
      continue;
    }

    const unorderedItem = line.match(/^[-*+]\s+(.+)$/);
    if (unorderedItem) {
      flushParagraph();
      const items: string[] = [];

      while (index < lines.length) {
        const item = (lines[index]?.trim() ?? '').match(/^[-*+]\s+(.+)$/);
        if (!item) break;

        items.push(item[1]?.trim() ?? '');
        index += 1;
      }

      blocks.push({
        type: 'list',
        ordered: false,
        items
      });
      continue;
    }

    const orderedItem = line.match(/^\d+[.)]\s+(.+)$/);
    if (orderedItem) {
      flushParagraph();
      const items: string[] = [];

      while (index < lines.length) {
        const item = (lines[index]?.trim() ?? '').match(/^\d+[.)]\s+(.+)$/);
        if (!item) break;

        items.push(item[1]?.trim() ?? '');
        index += 1;
      }

      blocks.push({
        type: 'list',
        ordered: true,
        items
      });
      continue;
    }

    paragraph.push(line);
    index += 1;
  }

  flushParagraph();

  return blocks;
}

function renderBlock(block: MarkdownBlock, index: number) {
  if (block.type === 'heading') {
    const Heading = block.level <= 2 ? 'h2' : 'h3';

    return (
      <Heading
        key={`${block.type}-${index}`}
        className='mt-5 text-[15px] font-semibold tracking-normal text-foreground first:mt-0'
      >
        {renderInline(block.content)}
      </Heading>
    );
  }

  if (block.type === 'list') {
    const List = block.ordered ? 'ol' : 'ul';

    return (
      <List
        key={`${block.type}-${index}`}
        className={cn(
          'space-y-2 pl-5 text-sm leading-7 text-foreground/90 marker:text-muted-foreground',
          block.ordered ? 'list-decimal' : 'list-disc'
        )}
      >
        {block.items.map((item, itemIndex) => (
          <li key={`${itemIndex}-${item.slice(0, 16)}`} className='pl-1'>
            {renderInlineWithBreaks(item)}
          </li>
        ))}
      </List>
    );
  }

  return (
    <p key={`${block.type}-${index}`} className='text-sm leading-7 text-foreground/90'>
      {renderInlineWithBreaks(block.lines.join('\n'))}
    </p>
  );
}

function renderInlineWithBreaks(text: string): ReactNode[] {
  const lines = text.split('\n');

  return lines.flatMap((line, index) => {
    const nodes = renderInline(line);
    if (index === 0) return nodes;

    return [<br key={`br-${index}`} />, ...nodes];
  });
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let tokenIndex = 0;

  for (const match of text.matchAll(INLINE_PATTERN)) {
    const matchedText = match[0];
    const matchIndex = match.index ?? 0;

    if (matchIndex > lastIndex) {
      nodes.push(text.slice(lastIndex, matchIndex));
    }

    nodes.push(renderInlineToken(matchedText, tokenIndex));
    lastIndex = matchIndex + matchedText.length;
    tokenIndex += 1;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function renderInlineToken(token: string, index: number): ReactNode {
  if (token.startsWith('**') && token.endsWith('**')) {
    return (
      <strong key={`strong-${index}`} className='font-semibold text-foreground'>
        {token.slice(2, -2)}
      </strong>
    );
  }

  if (token.startsWith('`') && token.endsWith('`')) {
    return (
      <code
        key={`code-${index}`}
        className='rounded bg-muted px-1.5 py-0.5 text-[0.85em] text-foreground'
      >
        {token.slice(1, -1)}
      </code>
    );
  }

  const link = token.match(/^\[([^\]]+?)\]\(([^)]+?)\)$/);
  if (link) {
    const label = link[1] ?? '';
    const href = link[2] ?? '';

    if (isSafeHref(href)) {
      return (
        <a
          key={`link-${index}`}
          href={href}
          target='_blank'
          rel='noreferrer'
          className='font-medium underline underline-offset-4'
        >
          {label}
        </a>
      );
    }

    return label;
  }

  return token;
}

function isSafeHref(href: string) {
  return href.startsWith('https://') || href.startsWith('http://') || href.startsWith('mailto:');
}
