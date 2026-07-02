# AGENTS.md - AI Coding Agent Reference

This is a Next.js 16 + shadcn/ui admin dashboard starter maintained as a local preview shell.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui with Radix UI primitives
- TanStack Query, TanStack Table, TanStack Form
- Recharts
- Sentry
- Bun

## Current Auth And Workspace Model

Authentication is intentionally not wired to an external provider in this local copy.

- Account, profile, organization, billing, and plan-gated pages use `src/lib/account-context.tsx`.
- The context provides local preview user data, organizations, roles, permissions, and plan metadata.
- Keep the organization switcher and profile/account UI visible unless the product requirement explicitly removes those concepts.
- Production auth, authorization, and billing should be connected behind the same UI surfaces later.

## Important Files

- `src/lib/account-context.tsx` - local user, organization, member, permission, and plan context
- `src/components/org-switcher.tsx` - sidebar organization switcher
- `src/components/layout/app-sidebar.tsx` - sidebar, nav, and account dropdown
- `src/hooks/use-nav.ts` - navigation filtering from local account context
- `src/app/dashboard/workspaces/page.tsx` - organization cards and create dialog
- `src/app/dashboard/workspaces/team/[[...rest]]/page.tsx` - team and organization settings shell
- `src/features/profile/components/profile-view-page.tsx` - profile/security/preferences shell
- `src/app/dashboard/billing/page.tsx` - local billing plan cards

## Conventions

- Use existing shadcn/ui components before adding new primitives.
- Import icons only from `@/components/icons`.
- Use `PageContainer` for dashboard page headers.
- Keep changes scoped; do not remove existing dashboard modules unless asked.
- UI visibility checks are for experience only. Real security belongs in backend/server checks when production auth is connected.

## Commands

```bash
bun install
bun run dev
bun run lint
bun run build
```
