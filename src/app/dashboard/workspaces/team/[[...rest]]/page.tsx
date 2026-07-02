'use client';

import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Icons } from '@/components/icons';
import { teamInfoContent } from '@/config/infoconfig';
import { useAccount } from '@/lib/account-context';

export default function TeamPage() {
  const { activeOrganization } = useAccount();

  return (
    <PageContainer
      pageTitle='Team Management'
      pageDescription='Manage your workspace team, members, roles, security and more.'
      infoContent={teamInfoContent}
      access={!!activeOrganization}
      accessFallback={
        <div className='space-y-2 text-center'>
          <h2 className='text-2xl font-semibold'>No Organization Selected</h2>
          <p className='text-muted-foreground'>
            Select or create an organization before managing a team.
          </p>
        </div>
      }
    >
      {activeOrganization && (
        <Tabs defaultValue='members' className='space-y-4'>
          <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
            <div className='flex items-center gap-3'>
              <div className='bg-primary text-primary-foreground flex size-11 items-center justify-center rounded-lg text-sm font-semibold'>
                {activeOrganization.initials}
              </div>
              <div>
                <div className='flex items-center gap-2'>
                  <h2 className='text-xl font-semibold'>{activeOrganization.name}</h2>
                  <Badge variant='secondary'>{activeOrganization.plan}</Badge>
                </div>
                <p className='text-muted-foreground text-sm'>{activeOrganization.description}</p>
              </div>
            </div>
            <TabsList>
              <TabsTrigger value='members'>Members</TabsTrigger>
              <TabsTrigger value='settings'>Settings</TabsTrigger>
              <TabsTrigger value='security'>Security</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value='members'>
            <Card>
              <CardHeader className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
                <div>
                  <CardTitle>Members</CardTitle>
                  <CardDescription>
                    Invite teammates and review workspace access levels.
                  </CardDescription>
                </div>
                <Button size='sm'>
                  <Icons.add className='size-4' />
                  Invite member
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last active</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeOrganization.members.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className='font-medium'>{member.name}</div>
                          <div className='text-muted-foreground text-xs'>{member.email}</div>
                        </TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell>
                          <Badge variant={member.status === 'Active' ? 'secondary' : 'outline'}>
                            {member.status}
                          </Badge>
                        </TableCell>
                        <TableCell className='text-muted-foreground'>{member.lastActive}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='settings'>
            <div className='grid gap-4 lg:grid-cols-[1.2fr_0.8fr]'>
              <Card>
                <CardHeader>
                  <CardTitle>Organization profile</CardTitle>
                  <CardDescription>
                    Keep the workspace name and public slug aligned.
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid gap-4 md:grid-cols-2'>
                    <div className='space-y-2'>
                      <Label htmlFor='org-name'>Name</Label>
                      <Input id='org-name' defaultValue={activeOrganization.name} />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='org-slug'>Slug</Label>
                      <Input id='org-slug' defaultValue={activeOrganization.slug} />
                    </div>
                  </div>
                  <Separator />
                  <div className='grid gap-3 text-sm md:grid-cols-3'>
                    <div>
                      <div className='text-muted-foreground'>Created</div>
                      <div className='font-medium'>{activeOrganization.createdAt}</div>
                    </div>
                    <div>
                      <div className='text-muted-foreground'>Seats</div>
                      <div className='font-medium'>
                        {activeOrganization.seatsUsed}/{activeOrganization.seatsLimit}
                      </div>
                    </div>
                    <div>
                      <div className='text-muted-foreground'>Monthly events</div>
                      <div className='font-medium'>{activeOrganization.monthlyEvents}</div>
                    </div>
                  </div>
                  <Button>Save changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Roles</CardTitle>
                  <CardDescription>Local role presets for the dashboard shell.</CardDescription>
                </CardHeader>
                <CardContent className='space-y-3'>
                  {['Owner', 'Admin', 'Analyst', 'Member'].map((role) => (
                    <div
                      key={role}
                      className='flex items-center justify-between rounded-md border p-3'
                    >
                      <div className='font-medium'>{role}</div>
                      <Badge variant='outline'>Preset</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value='security'>
            <div className='grid gap-4 md:grid-cols-2'>
              <Card>
                <CardHeader>
                  <CardTitle>Session policy</CardTitle>
                  <CardDescription>Design placeholder for future auth integration.</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='flex items-center justify-between rounded-md border p-3'>
                    <div>
                      <div className='font-medium'>Require two-step verification</div>
                      <div className='text-muted-foreground text-sm'>Recommended for admins.</div>
                    </div>
                    <Badge variant='outline'>Ready</Badge>
                  </div>
                  <div className='flex items-center justify-between rounded-md border p-3'>
                    <div>
                      <div className='font-medium'>Session timeout</div>
                      <div className='text-muted-foreground text-sm'>12 hours for operators.</div>
                    </div>
                    <Badge variant='secondary'>Default</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Access review</CardTitle>
                  <CardDescription>Audit-ready ownership and invitation controls.</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='flex items-center gap-3 rounded-md border p-3'>
                    <Icons.check className='text-primary size-4' />
                    <span className='text-sm'>Owner account is active</span>
                  </div>
                  <div className='flex items-center gap-3 rounded-md border p-3'>
                    <Icons.warning className='text-muted-foreground size-4' />
                    <span className='text-sm'>One pending invitation needs review</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </PageContainer>
  );
}
