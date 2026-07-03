import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
import type { NotificationStatus, NotificationAction } from '@/components/ui/notification-card';

export type Notification = {
  id: string;
  title: string;
  body: string;
  status: NotificationStatus;
  createdAt: string;
  actions?: NotificationAction[];
};

type NotificationState = {
  notifications: Notification[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'status'>) => void;
  unreadCount: () => number;
};

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: '새 팀원이 합류했습니다',
    body: '김서연님이 운영 워크스페이스에 합류했습니다.',
    status: 'unread',
    createdAt: '5분 전',
    actions: [
      {
        id: 'view',
        label: '워크스페이스 보기',
        type: 'redirect',
        style: 'primary'
      }
    ]
  },
  {
    id: '2',
    title: '새 콘텐츠가 추가되었습니다',
    body: '저장 콘텐츠 목록에 새 분석 대상 영상이 추가되었습니다.',
    status: 'unread',
    createdAt: '30분 전',
    actions: [
      {
        id: 'view-product',
        label: '콘텐츠 보기',
        type: 'redirect',
        style: 'primary'
      }
    ]
  },
  {
    id: '3',
    title: '결제 주기가 갱신되었습니다',
    body: '프로 플랜이 갱신되었습니다. 다음 청구 예정일은 2026년 4월 24일입니다.',
    status: 'unread',
    createdAt: '2시간 전',
    actions: [
      {
        id: 'billing',
        label: '결제 보기',
        type: 'redirect',
        style: 'primary'
      }
    ]
  },
  {
    id: '4',
    title: '작업이 배정되었습니다',
    body: '칸반 보드에 "대시보드 분석 업데이트" 작업이 배정되었습니다.',
    status: 'read',
    createdAt: '1일 전',
    actions: [
      {
        id: 'open',
        label: '칸반 열기',
        type: 'redirect',
        style: 'primary'
      }
    ]
  },
  {
    id: '5',
    title: '새 메시지가 도착했습니다',
    body: '운영 매니저가 메시지를 보냈습니다. "오버뷰 대시보드 기준으로 맞춰볼까요?"',
    status: 'read',
    createdAt: '3일 전',
    actions: [
      {
        id: 'open-chat',
        label: '채팅 열기',
        type: 'redirect',
        style: 'primary'
      }
    ]
  }
];

export const useNotificationStore = create<NotificationState>()(
  // To enable persistence across refreshes, uncomment the persist wrapper below:
  // persist(
  (set, get) => ({
    notifications: mockNotifications,

    markAsRead: (id) =>
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, status: 'read' as const } : n
        )
      })),

    markAllAsRead: () =>
      set((state) => ({
        notifications: state.notifications.map((n) => ({
          ...n,
          status: 'read' as const
        }))
      })),

    removeNotification: (id) =>
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id)
      })),

    addNotification: (notification) =>
      set((state) => ({
        notifications: [{ ...notification, status: 'unread' as const }, ...state.notifications]
      })),

    unreadCount: () => get().notifications.filter((n) => n.status === 'unread').length
  })
  //   ,
  //   { name: 'notifications' }
  // )
);
