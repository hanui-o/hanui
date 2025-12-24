// Notification Kit - Entry Point
// 알림 기능 키트

// Types
export type {
  Notification,
  NotificationType,
  NotificationPriority,
  NotificationStatus,
  NotificationAction,
  NotificationFilter,
  NotificationListParams,
  NotificationListResponse,
  NotificationSettings,
  ToastNotification,
  NotificationState,
} from './types/notification';

// API
export {
  getNotifications,
  getNotification,
  markAsRead,
  markMultipleAsRead,
  markAllAsRead,
  archiveNotification,
  deleteNotification,
  deleteMultipleNotifications,
  getUnreadCount,
  getNotificationSettings,
  updateNotificationSettings,
  subscribePush,
  unsubscribePush,
  connectToNotificationStream,
} from './api/notification';

// Store
export { useNotificationStore } from './stores/notificationStore';

// Hooks
export {
  notificationKeys,
  useNotifications,
  useNotification,
  useUnreadCount,
  useMarkAsRead,
  useMarkAllAsRead,
  useDeleteNotification,
  useNotificationSettings,
  useUpdateNotificationSettings,
  useNotificationStream,
  useToast,
} from './hooks/useNotification';

// Components
export { NotificationBell } from './components/NotificationBell';
export { NotificationItem } from './components/NotificationItem';
export { NotificationCenter } from './components/NotificationCenter';
export { ToastContainer } from './components/ToastContainer';
