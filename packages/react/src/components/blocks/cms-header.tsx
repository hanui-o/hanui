'use client';

import * as React from 'react';
import { Bell, LogOut, User, Settings } from 'lucide-react';
import { NumberBadge } from '../badge';
import { Button } from '../button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '../dropdown-menu';
import { cn } from '@/lib/utils';

// ============================================================================
// Types
// ============================================================================

/** CMS 사용자 정보 */
export interface CmsUser {
  /** 사용자 이름 */
  name: string;
  /** 역할 */
  role?: string;
  /** 프로필 이미지 URL */
  avatar?: string;
}

/** CmsHeader Props */
export interface CmsHeaderProps {
  /** 로그인 사용자 정보 */
  user?: CmsUser;
  /** 미확인 알림 수 */
  notificationCount?: number;
  /** 알림 아이콘 클릭 핸들러 */
  onNotificationClick?: () => void;
  /** 프로필 클릭 핸들러 */
  onProfileClick?: () => void;
  /** 설정 클릭 핸들러 */
  onSettingsClick?: () => void;
  /** 로그아웃 핸들러 */
  onLogout?: () => void;
  /** 추가 className */
  className?: string;
}

// ============================================================================
// Helpers
// ============================================================================

const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: '최고관리자',
  EDITOR: '편집자',
  VIEWER: '뷰어',
};

// ============================================================================
// CmsHeader Component
// ============================================================================

/**
 * CMS 상단 헤더 블록
 *
 * 관리자 페이지 상단 헤더.
 * - 알림 아이콘 + 미확인 카운트 Badge
 * - 프로필 DropdownMenu (내 정보, 설정, 로그아웃)
 * - KWCAG 2.2 접근성 준수
 */
export function CmsHeader({
  user,
  notificationCount = 0,
  onNotificationClick,
  onProfileClick,
  onSettingsClick,
  onLogout,
  className,
}: CmsHeaderProps) {
  const roleLabel = user?.role ? ROLE_LABELS[user.role] || user.role : '';

  return (
    <div
      className={cn('flex items-center justify-between h-16 px-6', className)}
    >
      {/* 좌측 여백 (breadcrumb 등 확장 용도) */}
      <div />

      {/* 우측: 알림 + 프로필 */}
      <div className="flex items-center gap-2">
        {/* 알림 버튼 */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onNotificationClick}
          aria-label={
            notificationCount > 0 ? `알림 ${notificationCount}건` : '알림 없음'
          }
          className="relative"
        >
          <Bell className="w-5 h-5" aria-hidden="true" />
          {notificationCount > 0 && (
            <NumberBadge
              count={notificationCount}
              max={99}
              variant="error"
              className="absolute -top-1 -right-1"
            />
          )}
        </Button>

        {/* 프로필 드롭다운 */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-md',
                  'hover:bg-krds-gray-10',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-krds-blue-60',
                  'transition-colors cursor-pointer border-0 bg-transparent'
                )}
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`${user.name} 프로필`}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-krds-primary-10 flex items-center justify-center text-krds-primary-base text-sm font-bold">
                    {user.name.charAt(0)}
                  </div>
                )}
                <div className="hidden sm:block text-left">
                  <span className="text-sm font-medium text-krds-gray-90 block">
                    {user.name}
                  </span>
                  {roleLabel && (
                    <span className="text-xs text-krds-gray-50 block">
                      {roleLabel}
                    </span>
                  )}
                </div>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>
                <div>
                  <div className="font-medium">{user.name}</div>
                  {roleLabel && (
                    <div className="text-xs text-krds-gray-50 font-normal">
                      {roleLabel}
                    </div>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onProfileClick}
                icon={<User className="w-4 h-4" />}
              >
                내 정보
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onSettingsClick}
                icon={<Settings className="w-4 h-4" />}
              >
                설정
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onLogout}
                icon={<LogOut className="w-4 h-4" />}
                destructive
              >
                로그아웃
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
