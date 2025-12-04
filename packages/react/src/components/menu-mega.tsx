'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Mega Menu Link Item (메가 메뉴 링크 항목)
 */
export interface MegaMenuLink {
  label: string; // 링크 라벨
  href: string; // 링크 URL
  active?: boolean; // 활성 상태
}

/**
 * Mega Menu Column (메가 메뉴 컬럼)
 */
export interface MegaMenuColumn {
  title: string; // 메인 메뉴 타이틀
  href?: string; // 메인 메뉴 링크 (선택)
  links: MegaMenuLink[]; // 서브 메뉴 링크 목록
  active?: boolean; // 활성 상태
}

/**
 * Mega Menu Props (메가 메뉴 속성)
 */
export interface MegaMenuProps {
  columns: MegaMenuColumn[]; // 메뉴 컬럼 배열
  currentPath?: string; // 현재 활성 경로 (aria-current 설정용)
  className?: string; // 추가 CSS 클래스
  dropdownBgColor?: string; // 드롭다운 배경색 (기본값: bg-krds-white)
  dropdownBorderColor?: string; // 드롭다운 테두리색 (기본값: border-krds-gray-20)
}

/**
 * Mega Menu Component (메가 메뉴 컴포넌트)
 *
 * CSS only hover로 동작하는 메가메뉴 스타일 네비게이션 컴포넌트
 * ul > li > ul > li 구조
 *
 * **주요 기능:**
 * - CSS hover로 서브메뉴 표시 (JS 불필요)
 * - Grid 레이아웃으로 깔끔한 메뉴 구조
 * - 자동 접근성 처리 (WCAG 2.1 / KWCAG 2.2 준수)
 * - 키보드 네비게이션 지원
 *
 * **자세한 사용법:** /components/mainmenu 문서 참고
 */
export const MegaMenu = React.forwardRef<HTMLElement, MegaMenuProps>(
  ({ columns, currentPath, className }, ref) => {
    return (
      <nav
        id="gnb"
        ref={ref}
        className={cn('krds-mega-menu', 'relative', className)}
        aria-label="메인 메뉴"
      >
        {/* 1Depth 메뉴 */}
        <ul className="depth1 group flex gap-2">
          {columns.map((column, colIndex) => {
            const isActive =
              column.active ||
              (currentPath && column.href === currentPath) ||
              (currentPath &&
                column.links.some((link) => link.href === currentPath));

            return (
              <li key={colIndex} className="relative flex-1">
                <a
                  href={column.href || '#'}
                  className={cn(
                    'relative flex items-center justify-center h-18 px-8',
                    'text-krds-body-lg font-bold text-krds-gray-70 whitespace-nowrap',
                    'transition-colors duration-200',
                    'hover:bg-krds-primary-5',
                    'focus:outline-none focus:ring-2 focus:ring-krds-primary-60 focus:ring-offset-2',
                    isActive &&
                      'text-krds-primary-90 before:absolute before:bottom-0 before:left-0 before:w-full before:h-1 before:bg-krds-secondary-70'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                  aria-haspopup="true"
                >
                  {column.title}
                </a>
              </li>
            );
          })}

          {/* Full-width dropdown backdrop - 호버 시 표시 */}
          <div
            className={cn(
              'absolute top-full left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen z-50',
              'bg-white border-y border-krds-gray-20 shadow-lg',
              'opacity-0 invisible group-hover:opacity-100 group-hover:visible',
              'transition-all duration-200'
            )}
            role="menu"
          >
            {/* Centered content container */}
            <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
              <div className="flex gap-2 py-4">
                {columns.map((column, colIndex) => (
                  <ul key={colIndex} className="depth2 flex-1">
                    {column.links.map((link, linkIdx) => {
                      const isLinkActive =
                        link.active || link.href === currentPath;
                      return (
                        <li key={linkIdx}>
                          <a
                            href={link.href}
                            className={cn(
                              'block py-2 transition-colors text-center rounded',
                              'hover:bg-krds-gray-5 hover:text-krds-primary-60',
                              'focus:outline-none focus:ring-2 focus:ring-krds-primary-60',
                              isLinkActive
                                ? 'bg-krds-gray-5 text-krds-primary-60 font-medium'
                                : 'text-krds-gray-70'
                            )}
                            aria-current={isLinkActive ? 'page' : undefined}
                            role="menuitem"
                          >
                            {link.label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </ul>
      </nav>
    );
  }
);

MegaMenu.displayName = 'MegaMenu';
