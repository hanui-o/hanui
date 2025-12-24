// Notification Kit - API
// 알림 API 함수

import axios from 'axios';
import type {
  Notification,
  NotificationListParams,
  NotificationListResponse,
  NotificationSettings,
} from '../types/notification';

// API 기본 설정 (실제 서버 주소로 변경)
const API_URL = 'https://your-api.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// 요청 인터셉터 (토큰 추가)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * 알림 목록 조회
 */
export async function getNotifications(
  params?: NotificationListParams
): Promise<NotificationListResponse> {
  const { data } = await api.get('/notifications', { params });
  return data;
}

/**
 * 알림 상세 조회
 */
export async function getNotification(id: string): Promise<Notification> {
  const { data } = await api.get(`/notifications/${id}`);
  return data.notification;
}

/**
 * 알림 읽음 처리
 */
export async function markAsRead(id: string): Promise<Notification> {
  const { data } = await api.patch(`/notifications/${id}/read`);
  return data.notification;
}

/**
 * 여러 알림 읽음 처리
 */
export async function markMultipleAsRead(ids: string[]): Promise<void> {
  await api.patch('/notifications/read', { ids });
}

/**
 * 모든 알림 읽음 처리
 */
export async function markAllAsRead(): Promise<void> {
  await api.patch('/notifications/read-all');
}

/**
 * 알림 보관 처리
 */
export async function archiveNotification(id: string): Promise<void> {
  await api.patch(`/notifications/${id}/archive`);
}

/**
 * 알림 삭제
 */
export async function deleteNotification(id: string): Promise<void> {
  await api.delete(`/notifications/${id}`);
}

/**
 * 여러 알림 삭제
 */
export async function deleteMultipleNotifications(
  ids: string[]
): Promise<void> {
  await api.delete('/notifications', { data: { ids } });
}

/**
 * 읽지 않은 알림 개수 조회
 */
export async function getUnreadCount(): Promise<number> {
  const { data } = await api.get('/notifications/unread-count');
  return data.count;
}

/**
 * 알림 설정 조회
 */
export async function getNotificationSettings(): Promise<NotificationSettings> {
  const { data } = await api.get('/notifications/settings');
  return data.settings;
}

/**
 * 알림 설정 업데이트
 */
export async function updateNotificationSettings(
  settings: Partial<NotificationSettings>
): Promise<NotificationSettings> {
  const { data } = await api.patch('/notifications/settings', settings);
  return data.settings;
}

/**
 * 푸시 알림 구독
 */
export async function subscribePush(
  subscription: PushSubscription
): Promise<void> {
  await api.post('/notifications/push/subscribe', {
    subscription: subscription.toJSON(),
  });
}

/**
 * 푸시 알림 구독 해제
 */
export async function unsubscribePush(): Promise<void> {
  await api.post('/notifications/push/unsubscribe');
}

/**
 * SSE 연결 (실시간 알림)
 */
export function connectToNotificationStream(
  onNotification: (notification: Notification) => void,
  onError?: (error: Event) => void
): EventSource {
  const token = localStorage.getItem('token');
  const eventSource = new EventSource(
    `${API_URL}/notifications/stream?token=${token}`
  );

  eventSource.onmessage = (event) => {
    try {
      const notification = JSON.parse(event.data) as Notification;
      onNotification(notification);
    } catch (error) {
      console.error('Failed to parse notification:', error);
    }
  };

  eventSource.onerror = (error) => {
    onError?.(error);
  };

  return eventSource;
}
