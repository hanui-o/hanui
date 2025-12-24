// Notification Kit - Types
// 알림 관련 타입 정의

// 알림 타입
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

// 알림 우선순위
export type NotificationPriority = 'low' | 'normal' | 'high' | 'urgent';

// 알림 상태
export type NotificationStatus = 'unread' | 'read' | 'archived';

// 알림 액션
export interface NotificationAction {
  id: string;
  label: string;
  type: 'primary' | 'secondary' | 'danger';
  href?: string;
  onClick?: () => void;
}

// 알림 아이템
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  status: NotificationStatus;
  timestamp: string;
  readAt?: string;
  category?: string;
  sender?: {
    id: string;
    name: string;
    avatar?: string;
  };
  actions?: NotificationAction[];
  link?: string;
  metadata?: Record<string, unknown>;
}

// 알림 필터
export interface NotificationFilter {
  type?: NotificationType[];
  status?: NotificationStatus[];
  priority?: NotificationPriority[];
  category?: string[];
  startDate?: string;
  endDate?: string;
}

// 알림 목록 파라미터
export interface NotificationListParams {
  page?: number;
  limit?: number;
  filter?: NotificationFilter;
  sortBy?: 'timestamp' | 'priority';
  sortOrder?: 'asc' | 'desc';
}

// 알림 목록 응답
export interface NotificationListResponse {
  notifications: Notification[];
  total: number;
  unreadCount: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// 알림 설정
export interface NotificationSettings {
  enabled: boolean;
  email: boolean;
  push: boolean;
  sound: boolean;
  categories: {
    [key: string]: {
      enabled: boolean;
      email: boolean;
      push: boolean;
    };
  };
  quietHours?: {
    enabled: boolean;
    start: string; // HH:mm
    end: string; // HH:mm
  };
}

// 토스트 알림 (클라이언트 전용)
export interface ToastNotification {
  id: string;
  title?: string;
  message: string;
  type: NotificationType;
  duration?: number;
  dismissible?: boolean;
  action?: NotificationAction;
}

// 알림 스토어 상태
export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;
  filter: NotificationFilter;

  // 토스트
  toasts: ToastNotification[];

  // 설정
  settings: NotificationSettings;

  // 패널 상태
  isPanelOpen: boolean;
}
