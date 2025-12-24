// Notification Kit - NotificationBell Component
// 알림 벨 아이콘 컴포넌트

'use client';

import { forwardRef } from 'react';
import { Button, Badge } from '@hanui/react';
import { Bell } from 'lucide-react';
import { useNotificationStore } from '../stores/notificationStore';

interface NotificationBellProps {
  onClick?: () => void;
  showBadge?: boolean;
  maxCount?: number;
  className?: string;
}

export const NotificationBell = forwardRef<
  HTMLButtonElement,
  NotificationBellProps
>(function NotificationBell(
  { onClick, showBadge = true, maxCount = 99, className },
  ref
) {
  const { unreadCount, togglePanel } = useNotificationStore();

  const handleClick = () => {
    togglePanel();
    onClick?.();
  };

  const displayCount = unreadCount > maxCount ? `${maxCount}+` : unreadCount;

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className={`relative ${className}`}
      aria-label={`알림 ${unreadCount > 0 ? `(${unreadCount}개의 읽지 않은 알림)` : ''}`}
    >
      <Bell className="w-5 h-5" />
      {showBadge && unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-medium text-white bg-krds-danger-base rounded-full">
          {displayCount}
        </span>
      )}
    </Button>
  );
});
