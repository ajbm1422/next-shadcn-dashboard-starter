'use client';

import PageContainer from '@/components/layout/page-container';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { billingInfoContent } from '@/config/infoconfig';
import { useAccount } from '@/lib/account-context';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Starter workspace for early dashboard exploration.',
    features: ['5 seats', '100K monthly events', 'Basic reports']
  },
  {
    name: 'Pro',
    price: '$49',
    description: 'Operator-ready limits for active campaign analytics.',
    features: ['20 seats', '2.5M monthly events', 'Advanced reports', 'Pro pages']
  },
  {
    name: 'Team',
    price: '$149',
    description: 'Higher-volume workspace shell for larger teams.',
    features: ['Unlimited seats', '10M monthly events', 'Priority support', 'Audit exports']
  }
];

export default function BillingPage() {
  const { activeOrganization } = useAccount();

  return (
    <PageContainer
      access={!!activeOrganization}
      accessFallback={
        <div className='flex min-h-[400px] items-center justify-center'>
          <div className='space-y-2 text-center'>
            <h2 className='text-2xl font-semibold'>No Organization Selected</h2>
            <p className='text-muted-foreground'>
              Please select or create an organization to view billing information.
            </p>
          </div>
        </div>
      }
      infoContent={billingInfoContent}
      pageTitle='Billing & Plans'
      pageDescription={`Manage subscription and usage limits for ${activeOrganization?.name}`}
    >
      {activeOrganization && (
        <div className='space-y-6'>
          <Alert>
            <Icons.info className='h-4 w-4' />
            <AlertDescription>
              Billing is now a local dashboard shell. Connect your own billing provider later while
              keeping the organization-level plan design intact.
            </AlertDescription>
          </Alert>

          <div className='grid gap-4 md:grid-cols-3'>
            <Card>
              <CardHeader>
                <CardTitle>Current plan</CardTitle>
                <CardDescription>{activeOrganization.status}</CardDescription>
              </CardHeader>
              <CardContent className='space-y-2'>
                <div className='text-3xl font-bold'>{activeOrganization.plan}</div>
                <div className='text-muted-foreground text-sm'>
                  Workspace role: {activeOrganization.roleLabel}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Seats</CardTitle>
                <CardDescription>Used seats in this workspace</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='text-3xl font-bold'>
                  {activeOrganization.seatsUsed}/{activeOrganization.seatsLimit}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Monthly events</CardTitle>
                <CardDescription>Preview usage counter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='text-3xl font-bold'>{activeOrganization.monthlyEvents}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Available Plans</CardTitle>
              <CardDescription>Choose a plan that fits your organization's needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4 md:grid-cols-3'>
                {plans.map((plan) => {
                  const isCurrent = plan.name === activeOrganization.plan;

                  return (
                    <div
                      key={plan.name}
                      className={`rounded-lg border p-5 ${isCurrent ? 'border-primary' : ''}`}
                    >
                      <div className='flex items-center justify-between gap-3'>
                        <div className='text-lg font-semibold'>{plan.name}</div>
                        {isCurrent && <Badge>Current</Badge>}
                      </div>
                      <div className='mt-4 flex items-end gap-1'>
                        <span className='text-3xl font-bold'>{plan.price}</span>
                        <span className='text-muted-foreground text-sm'>/mo</span>
                      </div>
                      <p className='text-muted-foreground mt-3 text-sm'>{plan.description}</p>
                      <div className='mt-5 space-y-2'>
                        {plan.features.map((feature) => (
                          <div key={feature} className='flex items-center gap-2 text-sm'>
                            <Icons.check className='text-primary size-4' />
                            {feature}
                          </div>
                        ))}
                      </div>
                      <Button className='mt-5 w-full' variant={isCurrent ? 'secondary' : 'outline'}>
                        {isCurrent ? 'Selected' : 'Select plan'}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </PageContainer>
  );
}
