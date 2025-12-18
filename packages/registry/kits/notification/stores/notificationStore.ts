// Notification Kit - Store
// Zustand 상태 관리

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Notification,
  NotificationFilter,
  NotificationSettings,
  ToastNotification,
  NotificationState,
} from '../types/notification';

interface NotificationActions {
  // 알림 관련
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  updateNotification: (id: string, updates: Partial<Notification>) => void;
  removeNotification: (id: string) => void;
  setUnreadCount: (count: number) => void;
  decrementUnreadCount: () => void;

  // 로딩/에러
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setHasMore: (hasMore: boolean) => void;
  setCurrentPage: (page: number) => void;

  // 필터
  setFilter: (filter: NotificationFilter) => void;
  resetFilter: () => void;

  // 토스트
  addToast: (toast: Omit<ToastNotification, 'id'>) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;

  // 설정
  setSettings: (settings: NotificationSettings) => void;
  updateSettings: (updates: Partial<NotificationSettings>) => void;

  // 패널
  togglePanel: () => void;
  openPanel: () => void;
  closePanel: () => void;

  // 일괄 처리
  markAllAsRead: () => void;
  clearAll: () => void;

  // 초기화
  reset: () => void;
}

type NotificationStore = NotificationState & NotificationActions;

const defaultSettings: NotificationSettings = {
  enabled: true,
  email: true,
  push: true,
  sound: true,
  categories: {},
  quietHours: {
    enabled: false,
    start: '22:00',
    end: '08:00',
  },
};

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
  hasMore: true,
  currentPage: 1,
  filter: {},
  toasts: [],
  settings: defaultSettings,
  isPanelOpen: false,
};

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // 알림 관련
      setNotifications: (notifications) => set({ notifications }),

      addNotification: (notification) =>
        set((state) => ({
          notifications: [notification, ...state.notifications],
          unreadCount:
            notification.status === 'unread'
              ? state.unreadCount + 1
              : state.unreadCount,
        })),

      updateNotification: (id, updates) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, ...updates } : n
          ),
        })),

      removeNotification: (id) =>
        set((state) => {
          const notification = state.notifications.find((n) => n.id === id);
          return {
            notifications: state.notifications.filter((n) => n.id !== id),
            unreadCount:
              notification?.status === 'unread'
                ? state.unreadCount - 1
                : state.unreadCount,
          };
        }),

      setUnreadCount: (unreadCount) => set({ unreadCount }),

      decrementUnreadCount: () =>
        set((state) => ({
          unreadCount: Math.max(0, state.unreadCount - 1),
        })),

      // 로딩/에러
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setHasMore: (hasMore) => set({ hasMore }),
      setCurrentPage: (currentPage) => set({ currentPage }),

      // 필터
      setFilter: (filter) => set({ filter, currentPage: 1 }),
      resetFilter: () => set({ filter: {}, currentPage: 1 }),

      // 토스트
      addToast: (toast) => {
        const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newToast: ToastNotification = {
          ...toast,
          id,
          duration: toast.duration ?? 5000,
          dismissible: toast.dismissible ?? true,
        };

        set((state) => ({
          toasts: [...state.toasts, newToast],
        }));

        // 자동 제거
        if (newToast.duration && newToast.duration > 0) {
          setTimeout(() => {
            get().removeToast(id);
          }, newToast.duration);
        }

        return id;
      },

      removeToast: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        })),

      clearToasts: () => set({ toasts: [] }),

      // 설정
      setSettings: (settings) => set({ settings }),

      updateSettings: (updates) =>
        set((state) => ({
          settings: { ...state.settings, ...updates },
        })),

      // 패널
      togglePanel: () => set((state) => ({ isPanelOpen: !state.isPanelOpen })),
      openPanel: () => set({ isPanelOpen: true }),
      closePanel: () => set({ isPanelOpen: false }),

      // 일괄 처리
      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({
            ...n,
            status: 'read' as const,
            readAt: new Date().toISOString(),
          })),
          unreadCount: 0,
        })),

      clearAll: () =>
        set({
          notifications: [],
          unreadCount: 0,
        }),

      // 초기화
      reset: () => set(initialState),
    }),
    {
      name: 'notification-storage',
      partialize: (state) => ({
        settings: state.settings,
      }),
    }
  )
);
