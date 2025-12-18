// Notification Kit - Hooks
// 알림 관련 React hooks

import { useEffect, useCallback, useRef } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import {
  getNotifications,
  getNotification,
  markAsRead,
  markAllAsRead as markAllAsReadApi,
  deleteNotification,
  getUnreadCount,
  getNotificationSettings,
  updateNotificationSettings,
  connectToNotificationStream,
} from '../api/notification';
import { useNotificationStore } from '../stores/notificationStore';
import type {
  Notification,
  NotificationListParams,
  NotificationSettings,
  ToastNotification,
} from '../types/notification';

// Query Keys
export const notificationKeys = {
  all: ['notifications'] as const,
  lists: () => [...notificationKeys.all, 'list'] as const,
  list: (params: NotificationListParams) =>
    [...notificationKeys.lists(), params] as const,
  details: () => [...notificationKeys.all, 'detail'] as const,
  detail: (id: string) => [...notificationKeys.details(), id] as const,
  unreadCount: () => [...notificationKeys.all, 'unread-count'] as const,
  settings: () => [...notificationKeys.all, 'settings'] as const,
};

/**
 * 알림 목록 조회 (무한 스크롤)
 */
export function useNotifications(
  params?: Omit<NotificationListParams, 'page'>
) {
  const { setNotifications, setUnreadCount, setHasMore, setLoading, setError } =
    useNotificationStore();

  const query = useInfiniteQuery({
    queryKey: notificationKeys.list(params || {}),
    queryFn: async ({ pageParam = 1 }) => {
      const result = await getNotifications({ ...params, page: pageParam });
      return result;
    },
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
    staleTime: 30 * 1000,
    initialPageParam: 1,
  });

  useEffect(() => {
    setLoading(query.isLoading);
  }, [query.isLoading, setLoading]);

  useEffect(() => {
    if (query.error) {
      setError((query.error as Error).message);
    }
  }, [query.error, setError]);

  useEffect(() => {
    if (query.data) {
      const allNotifications = query.data.pages.flatMap((p) => p.notifications);
      setNotifications(allNotifications);

      const lastPage = query.data.pages[query.data.pages.length - 1];
      setUnreadCount(lastPage.unreadCount);
      setHasMore(lastPage.hasMore);
    }
  }, [query.data, setNotifications, setUnreadCount, setHasMore]);

  return {
    ...query,
    loadMore: query.fetchNextPage,
    hasMore: query.hasNextPage,
  };
}

/**
 * 알림 상세 조회
 */
export function useNotification(id: string) {
  return useQuery({
    queryKey: notificationKeys.detail(id),
    queryFn: () => getNotification(id),
    enabled: !!id,
  });
}

/**
 * 읽지 않은 알림 개수 조회
 */
export function useUnreadCount() {
  const { setUnreadCount } = useNotificationStore();

  return useQuery({
    queryKey: notificationKeys.unreadCount(),
    queryFn: getUnreadCount,
    refetchInterval: 60 * 1000, // 1분마다 갱신
    select: (count) => {
      setUnreadCount(count);
      return count;
    },
  });
}

/**
 * 알림 읽음 처리
 */
export function useMarkAsRead() {
  const queryClient = useQueryClient();
  const { updateNotification, decrementUnreadCount } = useNotificationStore();

  return useMutation({
    mutationFn: markAsRead,
    onSuccess: (notification) => {
      updateNotification(notification.id, {
        status: 'read',
        readAt: notification.readAt,
      });
      decrementUnreadCount();
      queryClient.invalidateQueries({
        queryKey: notificationKeys.unreadCount(),
      });
    },
  });
}

/**
 * 모든 알림 읽음 처리
 */
export function useMarkAllAsRead() {
  const queryClient = useQueryClient();
  const { markAllAsRead } = useNotificationStore();

  return useMutation({
    mutationFn: markAllAsReadApi,
    onSuccess: () => {
      markAllAsRead();
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: notificationKeys.unreadCount(),
      });
    },
  });
}

/**
 * 알림 삭제
 */
export function useDeleteNotification() {
  const queryClient = useQueryClient();
  const { removeNotification } = useNotificationStore();

  return useMutation({
    mutationFn: deleteNotification,
    onSuccess: (_, id) => {
      removeNotification(id);
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: notificationKeys.unreadCount(),
      });
    },
  });
}

/**
 * 알림 설정 조회
 */
export function useNotificationSettings() {
  const { setSettings } = useNotificationStore();

  return useQuery({
    queryKey: notificationKeys.settings(),
    queryFn: getNotificationSettings,
    staleTime: 5 * 60 * 1000, // 5분
    select: (settings) => {
      setSettings(settings);
      return settings;
    },
  });
}

/**
 * 알림 설정 업데이트
 */
export function useUpdateNotificationSettings() {
  const queryClient = useQueryClient();
  const { setSettings } = useNotificationStore();

  return useMutation({
    mutationFn: updateNotificationSettings,
    onSuccess: (settings) => {
      setSettings(settings);
      queryClient.invalidateQueries({ queryKey: notificationKeys.settings() });
    },
  });
}

/**
 * 실시간 알림 수신 (SSE)
 */
export function useNotificationStream() {
  const eventSourceRef = useRef<EventSource | null>(null);
  const { addNotification, addToast, settings } = useNotificationStore();

  const connect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    eventSourceRef.current = connectToNotificationStream(
      (notification) => {
        // 스토어에 알림 추가
        addNotification(notification);

        // 설정에 따라 토스트 표시
        if (settings.enabled) {
          addToast({
            title: notification.title,
            message: notification.message,
            type: notification.type,
          });

          // 소리 재생
          if (settings.sound && notification.priority === 'urgent') {
            playNotificationSound();
          }
        }
      },
      (error) => {
        console.error('Notification stream error:', error);
        // 재연결 시도
        setTimeout(connect, 5000);
      }
    );
  }, [addNotification, addToast, settings]);

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  }, []);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return { connect, disconnect };
}

/**
 * 토스트 알림 훅
 */
export function useToast() {
  const { addToast, removeToast, clearToasts, toasts } = useNotificationStore();

  const toast = useCallback(
    (options: Omit<ToastNotification, 'id'>) => {
      return addToast(options);
    },
    [addToast]
  );

  const success = useCallback(
    (message: string, title?: string) => {
      return addToast({ message, title, type: 'success' });
    },
    [addToast]
  );

  const error = useCallback(
    (message: string, title?: string) => {
      return addToast({ message, title, type: 'error' });
    },
    [addToast]
  );

  const warning = useCallback(
    (message: string, title?: string) => {
      return addToast({ message, title, type: 'warning' });
    },
    [addToast]
  );

  const info = useCallback(
    (message: string, title?: string) => {
      return addToast({ message, title, type: 'info' });
    },
    [addToast]
  );

  return {
    toast,
    success,
    error,
    warning,
    info,
    dismiss: removeToast,
    dismissAll: clearToasts,
    toasts,
  };
}

// 알림 소리 재생
function playNotificationSound() {
  try {
    const audio = new Audio('/sounds/notification.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {
      // 사용자 상호작용 없이는 재생 불가
    });
  } catch (error) {
    console.error('Failed to play notification sound:', error);
  }
}
