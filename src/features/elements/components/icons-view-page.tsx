'use client';

import { useState } from 'react';
import { Icons } from '@/components/icons';
import PageContainer from '@/components/layout/page-container';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function IconsViewPage() {
  const [search, setSearch] = useState('');

  const iconEntries = Object.entries(Icons).filter(([name]) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageContainer
      pageTitle='Icons'
      pageHeaderAction={
        <Badge variant='secondary' className='h-9 px-3'>
          Local icon catalog
        </Badge>
      }
    >
      <div className='space-y-4'>
        <Input
          placeholder='Search icons...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='max-w-sm'
        />
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8'>
          {iconEntries.map(([name, IconComponent]) => (
            <div
              key={name}
              className='hover:bg-accent flex flex-col items-center gap-2 rounded-lg border p-4 text-center transition-colors'
            >
              <IconComponent className='h-6 w-6' />
              <span className='text-muted-foreground text-xs break-all'>{name}</span>
            </div>
          ))}
        </div>
        {iconEntries.length === 0 && (
          <p className='text-muted-foreground py-8 text-center'>
            No icons found matching &quot;{search}&quot;
          </p>
        )}
      </div>
    </PageContainer>
  );
}
