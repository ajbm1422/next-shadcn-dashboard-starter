'use client';

import PageContainer from '@/components/layout/page-container';
import { UserAvatarProfile } from '@/components/user-avatar-profile';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAccount } from '@/lib/account-context';

export default function ProfileViewPage() {
  const { user, activeOrganization } = useAccount();

  return (
    <PageContainer
      pageTitle='Profile'
      pageDescription='Manage account details, preferences, and local dashboard sessions.'
    >
      <Tabs defaultValue='profile' className='space-y-4'>
        <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
          <div className='flex items-center gap-3'>
            <UserAvatarProfile className='size-12 rounded-lg' user={user} />
            <div>
              <h2 className='text-xl font-semibold'>{user.fullName}</h2>
              <p className='text-muted-foreground text-sm'>{user.emailAddresses[0].emailAddress}</p>
            </div>
          </div>
          <TabsList>
            <TabsTrigger value='profile'>Profile</TabsTrigger>
            <TabsTrigger value='security'>Security</TabsTrigger>
            <TabsTrigger value='preferences'>Preferences</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value='profile'>
          <div className='grid gap-4 lg:grid-cols-[1.2fr_0.8fr]'>
            <Card>
              <CardHeader>
                <CardTitle>Account details</CardTitle>
                <CardDescription>Local profile shell for the admin dashboard.</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid gap-4 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='full-name'>Full name</Label>
                    <Input id='full-name' defaultValue={user.fullName} />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      type='email'
                      defaultValue={user.emailAddresses[0].emailAddress}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='title'>Title</Label>
                    <Input id='title' defaultValue={user.title} />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='timezone'>Timezone</Label>
                    <Input id='timezone' defaultValue={user.timezone} />
                  </div>
                </div>
                <Button>Save profile</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current organization</CardTitle>
                <CardDescription>Profile context used by the sidebar and pages.</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                {activeOrganization && (
                  <>
                    <div className='flex items-center gap-3'>
                      <div className='bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-lg text-sm font-semibold'>
                        {activeOrganization.initials}
                      </div>
                      <div>
                        <div className='font-medium'>{activeOrganization.name}</div>
                        <div className='text-muted-foreground text-sm'>
                          {activeOrganization.roleLabel}
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className='flex items-center justify-between'>
                      <span className='text-muted-foreground text-sm'>Plan</span>
                      <Badge>{activeOrganization.plan}</Badge>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-muted-foreground text-sm'>Status</span>
                      <Badge variant='secondary'>{activeOrganization.status}</Badge>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='security'>
          <div className='grid gap-4 md:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Placeholder controls for the later auth layer.</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='current-password'>Current password</Label>
                  <Input id='current-password' type='password' value='local-preview' readOnly />
                </div>
                <Button variant='outline'>Change password</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Sessions</CardTitle>
                <CardDescription>Local preview of active admin sessions.</CardDescription>
              </CardHeader>
              <CardContent className='space-y-3'>
                {['MacBook Pro - Seoul', 'Chrome - Localhost'].map((session) => (
                  <div
                    key={session}
                    className='flex items-center justify-between rounded-md border p-3'
                  >
                    <span className='text-sm font-medium'>{session}</span>
                    <Badge variant='secondary'>Active</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='preferences'>
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Default dashboard preferences for this account.</CardDescription>
            </CardHeader>
            <CardContent className='grid gap-4 md:grid-cols-3'>
              <div className='rounded-md border p-3'>
                <div className='text-sm font-medium'>Default view</div>
                <div className='text-muted-foreground text-sm'>Dashboard overview</div>
              </div>
              <div className='rounded-md border p-3'>
                <div className='text-sm font-medium'>Density</div>
                <div className='text-muted-foreground text-sm'>Comfortable</div>
              </div>
              <div className='rounded-md border p-3'>
                <div className='text-sm font-medium'>Notifications</div>
                <div className='text-muted-foreground text-sm'>Product and billing alerts</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
