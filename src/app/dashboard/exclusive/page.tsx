'use client';

import PageContainer from '@/components/layout/page-container';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { useAccount } from '@/lib/account-context';
import Link from 'next/link';

export default function ExclusivePage() {
  const { activeOrganization } = useAccount();
  const hasProAccess = activeOrganization?.plan === 'Pro' || activeOrganization?.plan === 'Team';

  return (
    <PageContainer>
      {!hasProAccess ? (
        <div className='flex h-full items-center justify-center'>
          <Alert>
            <Icons.lock className='h-5 w-5 text-yellow-600' />
            <AlertDescription>
              <div className='mb-1 text-lg font-semibold'>Pro Plan Required</div>
              <div className='text-muted-foreground'>
                This page is only available to organizations on the{' '}
                <span className='font-semibold'>Pro</span> plan.
                <br />
                Upgrade your subscription in&nbsp;
                <Link className='underline' href='/dashboard/billing'>
                  Billing &amp; Plans
                </Link>
                .
              </div>
            </AlertDescription>
          </Alert>
        </div>
      ) : (
        <div className='space-y-6'>
          <div>
            <h1 className='flex items-center gap-2 text-3xl font-bold tracking-tight'>
              <Icons.badgeCheck className='h-7 w-7 text-green-600' />
              Exclusive Area
            </h1>
            <p className='text-muted-foreground'>
              Welcome, <span className='font-semibold'>{activeOrganization?.name}</span>. This page
              contains exclusive features for Pro plan organizations.
            </p>
          </div>
          <div className='grid gap-4 md:grid-cols-3'>
            {['Priority reports', 'Advanced exports', 'Policy automation'].map((feature) => (
              <Card key={feature}>
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <CardTitle className='text-base'>{feature}</CardTitle>
                    <Badge variant='secondary'>{activeOrganization?.plan}</Badge>
                  </div>
                  <CardDescription>
                    Organization-level premium workspace capability.
                  </CardDescription>
                </CardHeader>
                <CardContent className='text-muted-foreground text-sm'>
                  Ready for your real product logic once the billing provider is connected.
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </PageContainer>
  );
}
