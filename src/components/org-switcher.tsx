'use client';

import { Icons } from '@/components/icons';
import { useAccount } from '@/lib/account-context';
import { useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar';

function planLabel(plan: string) {
  if (plan === 'Free') return '무료';
  if (plan === 'Pro') return '프로';
  if (plan === 'Team') return '팀';
  return plan;
}

function roleLabel(role: string) {
  if (role === 'Admin') return '관리자';
  if (role === 'Member') return '멤버';
  return role;
}

export function OrgSwitcher() {
  const { isMobile, state } = useSidebar();
  const router = useRouter();
  const { activeOrganization, activeOrganizationId, organizations, setActiveOrganization } =
    useAccount();

  const handleOrganizationSwitch = (organizationId: string) => {
    if (activeOrganizationId === organizationId) {
      return;
    }
    setActiveOrganization(organizationId);
  };

  if (organizations.length === 0) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size='lg'
            onClick={() => router.push('/dashboard/workspaces')}
            className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
          >
            <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg'>
              <Icons.add className='size-4' />
            </div>
            <div
              className={`grid flex-1 text-left text-sm leading-tight transition-all duration-200 ease-in-out ${
                state === 'collapsed'
                  ? 'invisible max-w-0 overflow-hidden opacity-0'
                  : 'visible max-w-full opacity-100'
              }`}
            >
              <span className='truncate font-medium'>조직 만들기</span>
              <span className='text-muted-foreground truncate text-xs'>시작하기</span>
            </div>
            <Icons.chevronsUpDown
              className={`ml-auto transition-all duration-200 ease-in-out ${
                state === 'collapsed'
                  ? 'invisible max-w-0 opacity-0'
                  : 'visible max-w-full opacity-100'
              }`}
            />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  const displayOrganization = activeOrganization || organizations[0];

  if (!displayOrganization) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg'>
                <span className='text-xs font-semibold'>{displayOrganization.initials}</span>
              </div>
              <div
                className={`grid flex-1 text-left text-sm leading-tight transition-all duration-200 ease-in-out ${
                  state === 'collapsed'
                    ? 'invisible max-w-0 overflow-hidden opacity-0'
                    : 'visible max-w-full opacity-100'
                }`}
              >
                <span className='truncate font-medium'>{displayOrganization.name}</span>
                <span className='text-muted-foreground truncate text-xs'>
                  {roleLabel(displayOrganization.roleLabel)}
                </span>
              </div>
              <Icons.chevronsUpDown
                className={`ml-auto transition-all duration-200 ease-in-out ${
                  state === 'collapsed'
                    ? 'invisible max-w-0 opacity-0'
                    : 'visible max-w-full opacity-100'
                }`}
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-muted-foreground text-xs'>조직</DropdownMenuLabel>
            {organizations.map((organization, index) => {
              const isActive = organization.id === activeOrganizationId;
              return (
                <DropdownMenuItem
                  key={organization.id}
                  onClick={() => handleOrganizationSwitch(organization.id)}
                  className='gap-2 p-2'
                >
                  <div className='flex size-6 items-center justify-center overflow-hidden rounded-md border'>
                    <span className='text-[10px] font-semibold'>{organization.initials}</span>
                  </div>
                  <div className='grid'>
                    <span>{organization.name}</span>
                    <span className='text-muted-foreground text-xs'>
                      {planLabel(organization.plan)}
                    </span>
                  </div>
                  {isActive && <Icons.check className='ml-auto size-4' />}
                  {!isActive && <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>}
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='gap-2 p-2'
              onClick={() => {
                router.push('/dashboard/workspaces');
              }}
            >
              <div className='flex size-6 items-center justify-center rounded-md border bg-transparent'>
                <Icons.add className='size-4' />
              </div>
              <div className='text-muted-foreground font-medium'>조직 추가</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
