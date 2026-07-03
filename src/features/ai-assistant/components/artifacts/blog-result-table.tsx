'use client';

import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import type { BlogRow } from '../../schemas/artifact.schema';
import { formatCompactNumber, formatDateLabel, formatScore } from '../../utils/formatters';

export function BlogResultTable({ rows }: { rows: BlogRow[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>블로그</TableHead>
          <TableHead>카테고리</TableHead>
          <TableHead>방문자</TableHead>
          <TableHead>글 수</TableHead>
          <TableHead>최근 글</TableHead>
          <TableHead>점수</TableHead>
          <TableHead>태그</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              <a
                href={row.url}
                target='_blank'
                rel='noreferrer'
                className='font-medium hover:underline'
              >
                {row.title}
              </a>
              <div className='text-muted-foreground text-xs'>{row.bloggerName}</div>
            </TableCell>
            <TableCell>{row.category || '-'}</TableCell>
            <TableCell>{formatCompactNumber(row.visitors)}</TableCell>
            <TableCell>{formatCompactNumber(row.postCount)}</TableCell>
            <TableCell>{formatDateLabel(row.recentPostAt)}</TableCell>
            <TableCell>{formatScore(row.score)}</TableCell>
            <TableCell>
              <div className='flex flex-wrap gap-1'>
                {row.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant='secondary' className='text-[11px]'>
                    {tag}
                  </Badge>
                ))}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
