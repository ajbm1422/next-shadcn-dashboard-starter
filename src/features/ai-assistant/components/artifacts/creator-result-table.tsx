'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  type Column,
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable
} from '@tanstack/react-table';
import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import type { CreatorRow } from '../../schemas/artifact.schema';
import {
  formatCompactNumber,
  formatDateLabel,
  formatPercent,
  formatScore,
  platformLabel
} from '../../utils/formatters';

function SortHeader<TData>({ column, title }: { column: Column<TData, unknown>; title: string }) {
  const sorted = column.getIsSorted();

  return (
    <Button
      type='button'
      variant='ghost'
      size='sm'
      className='-ml-2 h-8 px-2'
      onClick={() => column.toggleSorting(sorted === 'asc')}
    >
      {title}
      <Icons.chevronsDown className='text-muted-foreground ml-1 size-3.5' />
    </Button>
  );
}

const creatorColumns: ColumnDef<CreatorRow>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortHeader column={column} title='크리에이터' />,
    cell: ({ row }) => {
      const creator = row.original;
      return (
        <div className='flex min-w-56 items-center gap-3'>
          <Avatar className='size-9 rounded-lg'>
            <AvatarImage src={creator.profileImageUrl} alt='' />
            <AvatarFallback className='rounded-lg'>{creator.name.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div className='min-w-0'>
            <div className='truncate font-medium'>{creator.name}</div>
            <div className='text-muted-foreground truncate text-xs'>
              {creator.handle || platformLabel(creator.platform)}
            </div>
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: 'platform',
    header: '플랫폼',
    cell: ({ row }) => <Badge variant='outline'>{platformLabel(row.original.platform)}</Badge>
  },
  {
    accessorKey: 'followers',
    header: ({ column }) => <SortHeader column={column} title='팔로워' />,
    cell: ({ row }) => formatCompactNumber(row.original.followers)
  },
  {
    accessorKey: 'avgViews',
    header: ({ column }) => <SortHeader column={column} title='평균 조회' />,
    cell: ({ row }) => formatCompactNumber(row.original.avgViews)
  },
  {
    accessorKey: 'engagementRate',
    header: ({ column }) => <SortHeader column={column} title='참여율' />,
    cell: ({ row }) => formatPercent(row.original.engagementRate)
  },
  {
    accessorKey: 'recentPostAt',
    header: '최근 업로드',
    cell: ({ row }) => formatDateLabel(row.original.recentPostAt)
  },
  {
    accessorKey: 'score',
    header: ({ column }) => <SortHeader column={column} title='점수' />,
    cell: ({ row }) => (
      <span className='font-mono font-medium tabular-nums'>{formatScore(row.original.score)}</span>
    )
  },
  {
    accessorKey: 'tags',
    header: '태그',
    cell: ({ row }) => (
      <div className='flex max-w-64 flex-wrap gap-1'>
        {row.original.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant='secondary' className='text-[11px]'>
            {tag}
          </Badge>
        ))}
      </div>
    )
  }
];

export function CreatorResultTable({ rows }: { rows: CreatorRow[] }) {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'score',
      desc: true
    }
  ]);

  const table = useReactTable({
    data: rows,
    columns: creatorColumns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            tabIndex={0}
            role='button'
            className='cursor-pointer'
            onClick={() =>
              router.push(`/dashboard/influencers/${encodeURIComponent(row.original.id)}`)
            }
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                router.push(`/dashboard/influencers/${encodeURIComponent(row.original.id)}`);
              }
            }}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
