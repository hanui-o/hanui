// Notification Kit - NotificationCenter Component
// 알림 센터 패널 컴포넌트

'use client';

import { useEffect, useRef } from 'react';
import { Button, Skeleton } from '@hanui/react';
import { X, Bell, Check, Trash2, Settings, RefreshCw } from 'lucide-react';
import { useNotificationStore } from '../stores/notificationStore';
import {
  useNotifications,
  useMarkAsRead,
  useMarkAllAsRead,
  useDeleteNotification,
} from '../hooks/useNotification';
import { NotificationItem } from './NotificationItem';
import type { Notification, NotificationFilter } from '../types/notification';

interface NotificationCenterProps {
  title?: string;
  emptyMessage?: string;
  showSettings?: boolean;
  onSettingsClick?: () => void;
  onNotificationClick?: (notification: Notification) => void;
  filter?: NotificationFilter;
  className?: string;
}

export function NotificationCenter({
  title = '알림',
  emptyMessage = '새로운 알림이 없습니다',
  showSettings = true,
  onSettingsClick,
  onNotificationClick,
  filter,
  className,
}: NotificationCenterProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { notifications, unreadCount, isPanelOpen, closePanel } =
    useNotificationStore();

  const { isLoading, isFetchingNextPage, hasMore, loadMore, refetch } =
    useNotifications({ filter });
  const markAsReadMutation = useMarkAsRead();
  const markAllAsReadMutation = useMarkAllAsRead();
  const deleteMutation = useDeleteNotification();

  // 외부 클릭 시 패널 닫기
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        closePanel();
      }
    };

    if (isPanelOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPanelOpen, closePanel]);

  // 무한 스크롤
  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 100 &&
        hasMore &&
        !isFetchingNextPage
      ) {
        loadMore();
      }
    };

    scrollElement.addEventListener('scroll', handleScroll);
    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, [hasMore, isFetchingNextPage, loadMore]);

  // ESC 키로 패널 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPanelOpen) {
        closePanel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isPanelOpen, closePanel]);

  if (!isPanelOpen) return null;

  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed inset-0 bg-black/20 z-40 transition-opacity"
        onClick={closePanel}
        aria-hidden="true"
      />

      {/* 패널 */}
      <div
        ref={panelRef}
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label="알림 센터"
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-krds-gray-10">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-krds-gray-70" />
            <h2 className="text-lg font-semibold text-krds-gray-90">{title}</h2>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-medium text-white bg-krds-primary-base rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => refetch()}
              disabled={isLoading}
              aria-label="새로고침"
            >
              <RefreshCw
                className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`}
              />
            </Button>
            {showSettings && onSettingsClick && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onSettingsClick}
                aria-label="알림 설정"
              >
                <Settings className="w-4 h-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={closePanel}
              aria-label="닫기"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* 빠른 액션 */}
        {notifications.length > 0 && (
          <div className="flex items-center justify-between px-4 py-2 border-b border-krds-gray-10 bg-krds-gray-5">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => markAllAsReadMutation.mutate()}
              disabled={unreadCount === 0 || markAllAsReadMutation.isPending}
              className="text-xs"
            >
              <Check className="w-3 h-3 mr-1" />
              모두 읽음 처리
            </Button>
          </div>
        )}

        {/* 알림 목록 */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          {isLoading && notifications.length === 0 ? (
            <div className="p-4 space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <Bell className="w-12 h-12 text-krds-gray-30 mb-4" />
              <p className="text-krds-gray-60">{emptyMessage}</p>
            </div>
          ) : (
            <>
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onRead={(id) => markAsReadMutation.mutate(id)}
                  onDelete={(id) => deleteMutation.mutate(id)}
                  onClick={onNotificationClick}
                />
              ))}

              {/* 더보기 로딩 */}
              {isFetchingNextPage && (
                <div className="p-4 text-center">
                  <span className="text-sm text-krds-gray-50">
                    불러오는 중...
                  </span>
                </div>
              )}

              {/* 모든 알림 로드 완료 */}
              {!hasMore && notifications.length > 0 && (
                <div className="p-4 text-center">
                  <span className="text-sm text-krds-gray-40">
                    모든 알림을 확인했습니다
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
