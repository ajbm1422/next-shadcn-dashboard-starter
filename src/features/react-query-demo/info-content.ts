import type { InfobarContent } from '@/components/ui/infobar';

export const reactQueryInfoContent: InfobarContent = {
  title: 'React Query Pattern',
  sections: [
    {
      title: 'Server Prefetch',
      description:
        'Data is prefetched on the server using getQueryClient().prefetchQuery(). The dehydrated state is passed to HydrationBoundary so the client starts with cached data — no loading spinners on first load.',
      links: [
        {
          title: 'React Query guide',
          url: '/guide'
        }
      ]
    },
    {
      title: 'Query Options',
      description:
        'Query keys and fetch functions are defined in a shared queryOptions() object. This is reused across server prefetch and client hooks, keeping them in sync.',
      links: [
        {
          title: 'Dashboard data pattern',
          url: '/dashboard/react-query'
        }
      ]
    },
    {
      title: 'Suspense Query',
      description:
        'The client uses useSuspenseQuery() which integrates with React Suspense. Combined with server prefetch, data is available immediately — Suspense only shows the fallback on subsequent navigations if the cache is stale.',
      links: []
    },
    {
      title: 'Optimistic Mutations',
      description:
        'Mutations use onMutate to optimistically update the cache before the request completes. On error, the previous state is rolled back. On settle, the query is invalidated to refetch fresh data.',
      links: [
        {
          title: 'Users table pattern',
          url: '/dashboard/users'
        }
      ]
    }
  ]
};
