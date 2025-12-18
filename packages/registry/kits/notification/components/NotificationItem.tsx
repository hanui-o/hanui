// Notification Kit - NotificationItem Component
// 개별 알림 아이템 컴포넌트

'use client';

import { Button } from '@hanui/react';
import {
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  X,
  Clock,
  MoreHorizontal,
} from 'lucide-react';
import type { Notification } from '../types/notification';

interface NotificationItemProps {
  notification: Notification;
  onRead?: (id: string) => void;
  onDelete?: (id: string) => void;
  onClick?: (notification: Notification) => void;
  showActions?: boolean;
  compact?: boolean;
}

const typeIcons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

const typeColors = {
  info: 'text-krds-primary-base',
  success: 'text-krds-success-base',
  warning: 'text-krds-warning-base',
  error: 'text-krds-danger-base',
};

const typeBgColors = {
  info: 'bg-krds-primary-5',
  success: 'bg-krds-success-5',
  warning: 'bg-krds-warning-5',
  error: 'bg-krds-danger-5',
};

export function NotificationItem({
  notification,
  onRead,
  onDelete,
  onClick,
  showActions = true,
  compact = false,
}: NotificationItemProps) {
  const Icon = typeIcons[notification.type];
  const isUnread = notification.status === 'unread';

  const handleClick = () => {
    if (isUnread) {
      onRead?.(notification.id);
    }
    onClick?.(notification);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(notification.id);
  };

  // 상대 시간 계산
  const getRelativeTime = (timestamp: string) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return '방금 전';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}시간 전`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)}일 전`;
    return date.toLocaleDateString('ko-KR');
  };

  if (compact) {
    return (
      <div
        onClick={handleClick}
        className={`flex items-start gap-3 p-3 cursor-pointer transition-colors ${
          isUnread
            ? 'bg-krds-primary-5 hover:bg-krds-primary-10'
            : 'hover:bg-krds-gray-5'
        }`}
        role="article"
        aria-label={`${notification.title}: ${notification.message}`}
      >
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${typeBgColors[notification.type]}`}
        >
          <Icon className={`w-4 h-4 ${typeColors[notification.type]}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-krds-gray-90 truncate">
            {notification.title}
          </p>
          <p className="text-xs text-krds-gray-60 truncate mt-0.5">
            {notification.message}
          </p>
        </div>
        <span className="flex-shrink-0 text-xs text-krds-gray-40">
          {getRelativeTime(notification.timestamp)}
        </span>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className={`group relative p-4 cursor-pointer transition-colors border-b border-krds-gray-10 last:border-b-0 ${
        isUnread
          ? 'bg-krds-primary-5 hover:bg-krds-primary-10'
          : 'hover:bg-krds-gray-5'
      }`}
      role="article"
      aria-label={`${notification.title}: ${notification.message}`}
    >
      <div className="flex items-start gap-3">
        {/* 아이콘 또는 아바타 */}
        {notification.sender?.avatar ? (
          <img
            src={notification.sender.avatar}
            alt={notification.sender.name}
            className="w-10 h-10 rounded-full flex-shrink-0"
          />
        ) : (
          <div
            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${typeBgColors[notification.type]}`}
          >
            <Icon className={`w-5 h-5 ${typeColors[notification.type]}`} />
          </div>
        )}

        {/* 내용 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-medium text-krds-gray-90">
                {notification.title}
              </p>
              {notification.sender && (
                <p className="text-xs text-krds-gray-50 mt-0.5">
                  {notification.sender.name}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="flex items-center gap-1 text-xs text-krds-gray-40">
                <Clock className="w-3 h-3" />
                {getRelativeTime(notification.timestamp)}
              </span>
              {isUnread && (
                <span className="w-2 h-2 rounded-full bg-krds-primary-base" />
              )}
            </div>
          </div>

          <p className="text-sm text-krds-gray-70 mt-2 line-clamp-2">
            {notification.message}
          </p>

          {/* 액션 버튼 */}
          {notification.actions && notification.actions.length > 0 && (
            <div className="flex items-center gap-2 mt-3">
              {notification.actions.map((action) => (
                <Button
                  key={action.id}
                  variant={action.type === 'primary' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    action.onClick?.();
                    if (action.href) {
                      window.location.href = action.href;
                    }
                  }}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}

          {/* 카테고리 */}
          {notification.category && (
            <span className="inline-block mt-2 text-xs text-krds-gray-50 bg-krds-gray-10 px-2 py-0.5 rounded">
              {notification.category}
            </span>
          )}
        </div>

        {/* 삭제 버튼 */}
        {showActions && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 h-7 w-7"
            aria-label="알림 삭제"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
