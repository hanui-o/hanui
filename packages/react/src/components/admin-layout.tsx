'use client';

import * as React from 'react';
import { cva } from 'class-variance-authority';
import {
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// AdminLayout Types
// ============================================================================

/** 사이드바 메뉴 아이템 */
export interface AdminMenuItem {
  /** 메뉴 라벨 */
  label: string;
  /** 링크 URL */
  href?: string;
  /** 아이콘 */
  icon?: React.ReactNode;
  /** 활성화 상태 */
  active?: boolean;
  /** 하위 메뉴 */
  children?: AdminMenuItem[];
}

/** 사용자 정보 */
export interface AdminUser {
  /** 사용자 이름 */
  name: string;
  /** 역할 */
  role?: string;
  /** 프로필 이미지 URL */
  avatar?: string;
}

// ============================================================================
// AdminLayout Variants
// ============================================================================

const sidebarVariants = cva(
  'fixed top-0 left-0 h-screen bg-krds-white border-r border-krds-gray-20 transition-all duration-300 z-40 flex flex-col',
  {
    variants: {
      collapsed: {
        true: 'w-16',
        false: 'w-64',
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  }
);

// ============================================================================
// AdminLayout Props
// ============================================================================

export interface AdminLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 사이드바 메뉴 아이템 */
  menuItems: AdminMenuItem[];
  /** 로그인 사용자 정보 */
  user?: AdminUser;
  /** 로그아웃 핸들러 */
  onLogout?: () => void;
  /** 메뉴 클릭 핸들러 */
  onMenuClick?: (href: string) => void;
  /** 로고 (이미지 또는 텍스트) */
  logo?: React.ReactNode;
  /** 사이트 타이틀 */
  siteTitle?: string;
  /** 사이드바 초기 접힘 상태 */
  defaultCollapsed?: boolean;
  /** 하단 콘텐츠 (사이드바 하단) */
  sidebarFooter?: React.ReactNode;
}

// ============================================================================
// AdminLayout Component
// ============================================================================

/**
 * 어드민 레이아웃 컴포넌트
 *
 * CMS 어드민 페이지의 공통 레이아웃.
 * - 좌측 사이드바 (접기/펼치기)
 * - 상단바 (사용자 정보, 로그아웃)
 * - 메인 콘텐츠 영역
 * - KWCAG 2.2 접근성 준수
 */
export function AdminLayout({
  menuItems,
  user,
  onLogout,
  onMenuClick,
  logo,
  siteTitle = '관리자',
  defaultCollapsed = false,
  sidebarFooter,
  children,
  className,
  ...props
}: AdminLayoutProps) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);
  const [openMenus, setOpenMenus] = React.useState<Set<number>>(() => {
    const initial = new Set<number>();
    menuItems.forEach((item, index) => {
      if (item.active || item.children?.some((child) => child.active)) {
        initial.add(index);
      }
    });
    return initial;
  });

  const toggleMenu = (index: number) => {
    setOpenMenus((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleMenuClick = (href?: string) => {
    if (href && onMenuClick) {
      onMenuClick(href);
    }
  };

  return (
    <div className={cn('min-h-screen bg-krds-gray-5', className)} {...props}>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          사이드바
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <aside
        className={sidebarVariants({ collapsed })}
        aria-label="관리자 메뉴"
      >
        {/* 사이드바 헤더 */}
        <div className="flex items-center h-16 px-4 border-b border-krds-gray-20 flex-shrink-0">
          {!collapsed && (
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {logo && <div className="flex-shrink-0">{logo}</div>}
              <span className="text-krds-body-md font-bold text-krds-gray-90 truncate">
                {siteTitle}
              </span>
            </div>
          )}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              'p-2 rounded-md text-krds-gray-60 hover:bg-krds-gray-10 hover:text-krds-gray-90',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-krds-blue-60',
              'transition-colors cursor-pointer',
              collapsed && 'mx-auto'
            )}
            aria-label={collapsed ? '사이드바 펼치기' : '사이드바 접기'}
          >
            {collapsed ? (
              <PanelLeftOpen className="w-5 h-5" aria-hidden="true" />
            ) : (
              <PanelLeftClose className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* 사이드바 메뉴 */}
        <nav className="flex-1 overflow-y-auto py-2">
          <ul role="menubar" className="list-none p-0 m-0">
            {menuItems.map((item, index) => {
              const hasChildren = item.children && item.children.length > 0;
              const isOpen = openMenus.has(index);
              const isActive =
                item.active || item.children?.some((child) => child.active);

              return (
                <li key={index} role="none">
                  {hasChildren && !collapsed ? (
                    <>
                      <button
                        type="button"
                        onClick={() => toggleMenu(index)}
                        className={cn(
                          'flex items-center w-full px-4 py-3 gap-3',
                          'text-krds-body-md text-krds-gray-70 text-left',
                          'hover:bg-krds-primary-5 hover:text-krds-gray-90',
                          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-krds-blue-60 focus-visible:outline-offset-[-2px]',
                          'transition-colors cursor-pointer border-0 bg-transparent',
                          isActive && 'text-krds-primary-base font-bold'
                        )}
                        role="menuitem"
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                      >
                        {item.icon && (
                          <span
                            className="flex-shrink-0 w-5 h-5"
                            aria-hidden="true"
                          >
                            {item.icon}
                          </span>
                        )}
                        <span className="flex-1 truncate">{item.label}</span>
                        <ChevronDown
                          className={cn(
                            'w-4 h-4 flex-shrink-0 transition-transform duration-200',
                            isOpen && 'rotate-180'
                          )}
                          aria-hidden="true"
                        />
                      </button>
                      {isOpen && (
                        <ul role="menu" className="list-none p-0 m-0">
                          {item.children!.map((child, childIndex) => (
                            <li key={childIndex} role="none">
                              <a
                                href={child.href}
                                onClick={(e) => {
                                  if (onMenuClick && child.href) {
                                    e.preventDefault();
                                    handleMenuClick(child.href);
                                  }
                                }}
                                className={cn(
                                  'flex items-center w-full py-2 pl-12 pr-4 gap-3',
                                  'text-[14px] text-krds-gray-60 no-underline',
                                  'hover:bg-krds-primary-5 hover:text-krds-gray-90',
                                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-krds-blue-60 focus-visible:outline-offset-[-2px]',
                                  'transition-colors',
                                  child.active &&
                                    'text-krds-primary-base font-bold bg-krds-primary-5'
                                )}
                                role="menuitem"
                                aria-current={child.active ? 'page' : undefined}
                              >
                                {child.icon && (
                                  <span
                                    className="flex-shrink-0 w-4 h-4"
                                    aria-hidden="true"
                                  >
                                    {child.icon}
                                  </span>
                                )}
                                <span className="truncate">{child.label}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <a
                      href={item.href}
                      onClick={(e) => {
                        if (onMenuClick && item.href) {
                          e.preventDefault();
                          handleMenuClick(item.href);
                        }
                      }}
                      className={cn(
                        'flex items-center w-full px-4 py-3 gap-3',
                        'text-krds-body-md text-krds-gray-70 no-underline',
                        'hover:bg-krds-primary-5 hover:text-krds-gray-90',
                        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-krds-blue-60 focus-visible:outline-offset-[-2px]',
                        'transition-colors',
                        collapsed && 'justify-center px-0',
                        isActive &&
                          'text-krds-primary-base font-bold bg-krds-primary-5'
                      )}
                      role="menuitem"
                      aria-current={item.active ? 'page' : undefined}
                      title={collapsed ? item.label : undefined}
                    >
                      {item.icon && (
                        <span
                          className="flex-shrink-0 w-5 h-5"
                          aria-hidden="true"
                        >
                          {item.icon}
                        </span>
                      )}
                      {!collapsed && (
                        <span className="flex-1 truncate">{item.label}</span>
                      )}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* 사이드바 푸터 */}
        {sidebarFooter && !collapsed && (
          <div className="flex-shrink-0 border-t border-krds-gray-20 p-4">
            {sidebarFooter}
          </div>
        )}
      </aside>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          메인 영역
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        className={cn(
          'transition-all duration-300',
          collapsed ? 'ml-16' : 'ml-64'
        )}
      >
        {/* 상단바 */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-krds-white border-b border-krds-gray-20">
          <div />
          <div className="flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-2">
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
                <div className="hidden sm:block">
                  <span className="text-sm font-medium text-krds-gray-90">
                    {user.name}
                  </span>
                  {user.role && (
                    <span className="ml-2 text-xs text-krds-gray-50">
                      {user.role}
                    </span>
                  )}
                </div>
              </div>
            )}
            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-md',
                  'text-sm text-krds-gray-60 hover:text-krds-gray-90 hover:bg-krds-gray-10',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-krds-blue-60',
                  'transition-colors cursor-pointer border-0 bg-transparent'
                )}
                aria-label="로그아웃"
              >
                <LogOut className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">로그아웃</span>
              </button>
            )}
          </div>
        </header>

        {/* 메인 콘텐츠 */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

// ============================================================================
// 샘플 데이터
// ============================================================================

/** CMS 어드민 기본 메뉴 구조 */
export const ADMIN_CMS_MENU: AdminMenuItem[] = [
  { label: '대시보드', href: '/admin' },
  {
    label: '콘텐츠 관리',
    children: [
      { label: '고정 페이지', href: '/admin/pages' },
      { label: '메뉴 관리', href: '/admin/menus' },
    ],
  },
  {
    label: '게시판 관리',
    children: [
      { label: '게시글 관리', href: '/admin/posts' },
      { label: '게시판 설정', href: '/admin/boards' },
    ],
  },
  { label: '미디어 관리', href: '/admin/media' },
  { label: '사이트 설정', href: '/admin/settings' },
  { label: '계정 관리', href: '/admin/users' },
  { label: '휴지통', href: '/admin/trash' },
];

export { sidebarVariants };
