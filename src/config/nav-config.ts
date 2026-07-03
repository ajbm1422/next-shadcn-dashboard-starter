import { NavGroup } from '@/types';

export const navGroups: NavGroup[] = [
  {
    label: '',
    items: [
      {
        title: '인플루언서',
        url: '/dashboard/influencers',
        icon: 'teams',
        isActive: false,
        shortcut: ['i', 'i'],
        items: []
      },
      {
        title: '콘텐츠',
        url: '/dashboard/contents',
        icon: 'video',
        isActive: false,
        shortcut: ['v', 'v'],
        items: []
      },
      {
        title: 'AI',
        url: '/dashboard/ai',
        icon: 'sparkles',
        isActive: false,
        shortcut: ['a', 'i'],
        items: []
      }
    ]
  }
];
