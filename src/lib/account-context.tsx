'use client';

import * as React from 'react';

export type AccountUser = {
  id: string;
  fullName: string;
  imageUrl?: string;
  title: string;
  timezone: string;
  emailAddresses: Array<{ emailAddress: string }>;
};

export type AccountMember = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Invited';
  lastActive: string;
};

export type AccountOrganization = {
  id: string;
  name: string;
  slug: string;
  initials: string;
  description: string;
  role: 'admin' | 'member';
  roleLabel: string;
  plan: 'Free' | 'Pro' | 'Team';
  status: 'Active' | 'Trial';
  seatsUsed: number;
  seatsLimit: number;
  monthlyEvents: string;
  createdAt: string;
  permissions: string[];
  members: AccountMember[];
};

const accountUser: AccountUser = {
  id: 'user_local_admin',
  fullName: 'Zbo Moon',
  title: 'Dashboard Owner',
  timezone: 'Asia/Seoul',
  emailAddresses: [{ emailAddress: 'admin@influence.local' }]
};

const initialOrganizations: AccountOrganization[] = [
  {
    id: 'org_influence_ops',
    name: 'Influence Ops',
    slug: 'influence-ops',
    initials: 'IO',
    description: 'Creator discovery, campaign intelligence, and operator workflows.',
    role: 'admin',
    roleLabel: 'Admin',
    plan: 'Pro',
    status: 'Active',
    seatsUsed: 8,
    seatsLimit: 20,
    monthlyEvents: '2.4M',
    createdAt: '2026-06-18',
    permissions: ['org:teams:manage', 'org:billing:manage', 'org:settings:manage'],
    members: [
      {
        id: 'mem_admin',
        name: 'Zbo Moon',
        email: 'admin@influence.local',
        role: 'Owner',
        status: 'Active',
        lastActive: 'Now'
      },
      {
        id: 'mem_ops',
        name: 'Ops Manager',
        email: 'ops@influence.local',
        role: 'Admin',
        status: 'Active',
        lastActive: '12m ago'
      },
      {
        id: 'mem_analyst',
        name: 'Data Analyst',
        email: 'analytics@influence.local',
        role: 'Analyst',
        status: 'Invited',
        lastActive: 'Pending'
      }
    ]
  },
  {
    id: 'org_creator_lab',
    name: 'Creator Lab',
    slug: 'creator-lab',
    initials: 'CL',
    description: 'Experimental creator lists and audience testing.',
    role: 'member',
    roleLabel: 'Member',
    plan: 'Free',
    status: 'Trial',
    seatsUsed: 3,
    seatsLimit: 5,
    monthlyEvents: '184K',
    createdAt: '2026-06-24',
    permissions: ['org:settings:view'],
    members: [
      {
        id: 'mem_creator_owner',
        name: 'Creator Lead',
        email: 'creator@influence.local',
        role: 'Owner',
        status: 'Active',
        lastActive: '1h ago'
      },
      {
        id: 'mem_creator_research',
        name: 'Researcher',
        email: 'research@influence.local',
        role: 'Member',
        status: 'Active',
        lastActive: '3h ago'
      }
    ]
  }
];

type AccountContextValue = {
  user: AccountUser;
  organizations: AccountOrganization[];
  activeOrganization: AccountOrganization | null;
  activeOrganizationId: string | null;
  setActiveOrganization: (organizationId: string) => void;
  createOrganization: (name: string) => string;
};

const AccountContext = React.createContext<AccountContextValue | null>(null);

function createSlug(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function createInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [organizations, setOrganizations] =
    React.useState<AccountOrganization[]>(initialOrganizations);
  const [activeOrganizationId, setActiveOrganizationId] = React.useState<string | null>(
    initialOrganizations[0]?.id ?? null
  );

  const activeOrganization = React.useMemo(
    () => organizations.find((organization) => organization.id === activeOrganizationId) ?? null,
    [activeOrganizationId, organizations]
  );

  const setActiveOrganization = React.useCallback(
    (organizationId: string) => {
      if (organizations.some((organization) => organization.id === organizationId)) {
        setActiveOrganizationId(organizationId);
      }
    },
    [organizations]
  );

  const createOrganization = React.useCallback((name: string) => {
    const normalizedName = name.trim();
    const slug = createSlug(normalizedName) || `workspace-${Date.now()}`;
    const organization: AccountOrganization = {
      id: `org_${slug}_${Date.now()}`,
      name: normalizedName,
      slug,
      initials: createInitials(normalizedName) || 'NW',
      description: 'New workspace ready for team, billing, and policy setup.',
      role: 'admin',
      roleLabel: 'Admin',
      plan: 'Free',
      status: 'Trial',
      seatsUsed: 1,
      seatsLimit: 5,
      monthlyEvents: '0',
      createdAt: new Date().toISOString().slice(0, 10),
      permissions: ['org:teams:manage', 'org:billing:manage', 'org:settings:manage'],
      members: [
        {
          id: 'mem_new_owner',
          name: accountUser.fullName,
          email: accountUser.emailAddresses[0].emailAddress,
          role: 'Owner',
          status: 'Active',
          lastActive: 'Now'
        }
      ]
    };

    setOrganizations((currentOrganizations) => [...currentOrganizations, organization]);
    setActiveOrganizationId(organization.id);
    return organization.id;
  }, []);

  const value = React.useMemo<AccountContextValue>(
    () => ({
      user: accountUser,
      organizations,
      activeOrganization,
      activeOrganizationId,
      setActiveOrganization,
      createOrganization
    }),
    [
      activeOrganization,
      activeOrganizationId,
      createOrganization,
      organizations,
      setActiveOrganization
    ]
  );

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount() {
  const context = React.useContext(AccountContext);

  if (!context) {
    throw new Error('useAccount must be used within AccountProvider');
  }

  return context;
}
