'use client';

import * as React from 'react';
import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';
import { workspacesInfoContent } from '@/config/infoconfig';
import { useAccount } from '@/lib/account-context';
import { useRouter } from 'next/navigation';

export default function WorkspacesPage() {
  const router = useRouter();
  const { activeOrganizationId, organizations, setActiveOrganization, createOrganization } =
    useAccount();
  const [open, setOpen] = React.useState(false);
  const [workspaceName, setWorkspaceName] = React.useState('');

  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!workspaceName.trim()) {
      return;
    }

    createOrganization(workspaceName);
    setWorkspaceName('');
    setOpen(false);
  };

  return (
    <PageContainer
      pageTitle='Workspaces'
      pageDescription='Manage your workspaces and switch between them'
      infoContent={workspacesInfoContent}
      pageHeaderAction={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Icons.add className='size-4' />
              Create organization
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleCreate} className='space-y-4'>
              <DialogHeader>
                <DialogTitle>Create organization</DialogTitle>
                <DialogDescription>
                  Add a workspace shell for team, billing, and policy settings.
                </DialogDescription>
              </DialogHeader>
              <div className='space-y-2'>
                <Label htmlFor='workspace-name'>Organization name</Label>
                <Input
                  id='workspace-name'
                  value={workspaceName}
                  onChange={(event) => setWorkspaceName(event.target.value)}
                  placeholder='Campaign Operations'
                />
              </div>
              <DialogFooter>
                <Button type='button' variant='outline' onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type='submit'>Create</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      }
    >
      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {organizations.map((organization) => {
          const isActive = organization.id === activeOrganizationId;

          return (
            <Card key={organization.id} className={isActive ? 'border-primary min-w-0' : 'min-w-0'}>
              <CardHeader className='space-y-3'>
                <div className='flex min-w-0 items-start justify-between gap-3'>
                  <div className='flex min-w-0 items-center gap-3'>
                    <div className='bg-primary text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold'>
                      {organization.initials}
                    </div>
                    <div className='min-w-0'>
                      <CardTitle className='break-words text-base'>{organization.name}</CardTitle>
                      <CardDescription className='break-words'>{organization.slug}</CardDescription>
                    </div>
                  </div>
                  {isActive && <Badge>Active</Badge>}
                </div>
                <CardDescription className='break-words'>
                  {organization.description}
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid grid-cols-3 gap-3 text-sm'>
                  <div>
                    <div className='text-muted-foreground'>Plan</div>
                    <div className='font-medium'>{organization.plan}</div>
                  </div>
                  <div>
                    <div className='text-muted-foreground'>Seats</div>
                    <div className='font-medium'>
                      {organization.seatsUsed}/{organization.seatsLimit}
                    </div>
                  </div>
                  <div>
                    <div className='text-muted-foreground'>Events</div>
                    <div className='font-medium'>{organization.monthlyEvents}</div>
                  </div>
                </div>
                <div className='flex flex-wrap gap-2'>
                  <Button
                    variant={isActive ? 'secondary' : 'outline'}
                    size='sm'
                    onClick={() => setActiveOrganization(organization.id)}
                  >
                    {isActive ? 'Selected' : 'Switch'}
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => router.push('/dashboard/workspaces/team')}
                  >
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
}
