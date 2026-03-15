'use client';

import * as React from 'react';
import { PanelLeftClose, PanelLeftOpen, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// Types
// ============================================================================

/** 사이드바 메뉴 아이템 */
export interface AdminShellMenuItem {
  /** 메뉴 라벨 */
  label: string;
  /** 링크 URL */
  href?: string;
  /** 아이콘 */
  icon?: React.ReactNode;
  /** 활성화 상태 */
  active?: boolean;
  /** 하위 메뉴 */
  children?: AdminShellMenuItem[];
}

/** AdminShell Props */
export interface AdminShellProps {
  /** 사이드바 메뉴 아이템 */
  menuItems: AdminShellMenuItem[];
  /** 메뉴 클릭 핸들러 */
  onMenuClick?: (href: string) => void;
  /** 로고 (이미지 또는 텍스트) */
  logo?: React.ReactNode;
  /** 사이트 타이틀 */
  siteTitle?: string;
  /** 사이드바 초기 접힘 상태 */
  defaultCollapsed?: boolean;
  /** 사이드바 하단 콘텐츠 */
  sidebarFooter?: React.ReactNode;
  /** 상단 헤더 영역 (cms-header 블록 등) */
  header?: React.ReactNode;
  /** 메인 콘텐츠 */
  children?: React.ReactNode;
  /** 추가 className */
  className?: string;
}

// ============================================================================
// AdminShell Component
// ============================================================================

/**
 * 어드민 셸 블록
 *
 * CMS 관리자 페이지의 레이아웃 셸.
 * - 좌측 사이드바 (접기/펼치기, 2depth 메뉴)
 * - 상단 헤더 슬롯 (cms-header 등 외부 블록 삽입)
 * - 메인 콘텐츠 영역
 * - KWCAG 2.2 접근성 준수
 */
export function AdminShell({
  menuItems,
  onMenuClick,
  logo,
  siteTitle = '관리자',
  defaultCollapsed = false,
  sidebarFooter,
  header,
  children,
  className,
}: AdminShellProps) {
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
    <div className={cn('min-h-screen bg-krds-gray-5', className)}>
      {/* 건너뛰기 링크 */}
      <a
        href="#admin-main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-krds-primary-base focus:text-krds-white focus:rounded-md focus:text-sm focus:font-medium"
      >
        본문으로 건너뛰기
      </a>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          사이드바
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-screen bg-krds-white border-r border-krds-gray-20 transition-all duration-300 z-40 flex flex-col',
          collapsed ? 'w-16' : 'w-64'
        )}
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
          <ul role="list" className="list-none p-0 m-0">
            {menuItems.map((item, index) => {
              const hasChildren = item.children && item.children.length > 0;
              const isOpen = openMenus.has(index);
              const isActive =
                item.active || item.children?.some((child) => child.active);

              return (
                <li key={index}>
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
                        aria-expanded={isOpen}
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
                        <ul className="list-none p-0 m-0">
                          {item.children!.map((child, childIndex) => (
                            <li key={childIndex}>
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
                      aria-current={item.active ? 'page' : undefined}
                      aria-label={collapsed ? item.label : undefined}
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
        {/* 상단 헤더 슬롯 */}
        {header && (
          <header className="sticky top-0 z-30 bg-krds-white border-b border-krds-gray-20">
            {header}
          </header>
        )}

        {/* 메인 콘텐츠 */}
        <main id="admin-main-content" className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

// ============================================================================
// 기본 CMS 메뉴 (기획서 기반)
// ============================================================================

/** CMS 어드민 기본 메뉴 구조 (기획서 사이트맵 기반) */
export const CMS_MENU_ITEMS: AdminShellMenuItem[] = [
  { label: '대시보드', href: '/showcase/cms' },
  {
    label: '콘텐츠 관리',
    children: [
      { label: '고정 페이지', href: '/showcase/cms/pages' },
      { label: '메뉴 관리', href: '/showcase/cms/menus' },
      { label: '배너·팝업', href: '/showcase/cms/banners' },
    ],
  },
  {
    label: '게시판 관리',
    children: [
      { label: '공지사항', href: '/showcase/cms/posts/notice' },
      { label: '보도자료', href: '/showcase/cms/posts/press' },
      { label: '자료실', href: '/showcase/cms/posts/archive' },
      { label: '채용·입찰', href: '/showcase/cms/posts/recruit' },
    ],
  },
  { label: '미디어 관리', href: '/showcase/cms/media' },
  {
    label: '사이트 설정',
    children: [
      { label: '기본 정보', href: '/showcase/cms/settings' },
      { label: '계정 관리', href: '/showcase/cms/users' },
      { label: '휴지통', href: '/showcase/cms/trash' },
    ],
  },
];
