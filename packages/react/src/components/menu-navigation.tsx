'use client';

import * as React from 'react';
import * as RadixNavigationMenu from '@radix-ui/react-navigation-menu';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Navigation Menu Link Item (메뉴 링크 항목)
 */
export interface NavigationMenuLink {
  label: string; // 링크 라벨
  href: string; // 링크 URL
  description?: string; // 설명 (선택)
  active?: boolean; // 활성 상태
}

/**
 * Navigation Menu Section (드롭다운 섹션)
 */
export interface NavigationMenuSection {
  title?: string; // 섹션 제목
  links: NavigationMenuLink[]; // 섹션 내 링크 목록
  utilityLinks?: NavigationMenuLink[]; // 유틸리티 링크 (예: "모두 보기")
}

/**
 * Navigation Menu Item (메뉴 항목)
 */
export interface NavigationMenuItem {
  label: string; // 메뉴 라벨
  href?: string; // 메뉴 URL (드롭다운 없는 단순 링크용)
  active?: boolean; // 활성 상태
  sections?: NavigationMenuSection[]; // 드롭다운 섹션 목록
  children?: NavigationMenuLink[]; // 간단한 자식 링크 (sections 대신 사용)
  dropdownWidth?: string; // 드롭다운 너비 (예: "w-[400px]", "w-96", 기본값: "w-[200px]")
}

/**
 * Navigation Menu Props (메뉴 속성)
 */
export interface NavigationMenuProps {
  items: NavigationMenuItem[]; // 메뉴 항목 배열
  currentPath?: string; // 현재 활성 경로 (aria-current 설정용)
  className?: string; // 추가 CSS 클래스
  orientation?: 'horizontal' | 'vertical'; // 메뉴 방향 (기본값: "horizontal")
}

/**
 * 메뉴 아이템 공통 스타일 생성 함수
 */
const getMenuItemStyles = (isActive: boolean, hasDropdown: boolean) =>
  cn(
    // 공통 스타일
    'relative h-full px-4 rounded-md',
    'transition-colors duration-200',
    'hover:bg-krds-gray-5',
    'pt-3 pb-4 font-bold text-krds-body-lg',
    'focus:outline-none focus:ring-2 focus:ring-krds-primary-60 focus:ring-offset-2',
    // 드롭다운 여부에 따른 스타일
    hasDropdown
      ? [
          'group inline-flex items-center gap-1',
          'data-[state=open]:bg-krds-gray-5',
        ]
      : ['block'],
    // 활성 상태 스타일
    isActive && [
      'before:absolute before:left-0 before:w-full before:h-1 before:bg-krds-secondary-70',
      hasDropdown ? 'before:bottom-0' : 'before:bottom-0 text-krds-primary-60',
    ]
  );

/**
 * Navigation Menu Component (네비게이션 메뉴 컴포넌트)
 *
 * Radix UI Navigation Menu 기반의 접근성 완벽 지원 메뉴 컴포넌트
 *
 * **주요 기능:**
 * - 자동 접근성 처리 (WCAG 2.1 / KWCAG 2.2 준수)
 * - 키보드 네비게이션 완벽 지원 (Tab, Enter, Esc, Arrow keys)
 * - 단순 링크 및 다단계 드롭다운 지원
 * - 수평/수직 방향 설정 가능
 *
 * **자세한 사용법:** /components/navigation 문서 참고
 */
export const NavigationMenu = React.forwardRef<
  HTMLElement,
  NavigationMenuProps
>(({ items, currentPath, className, orientation = 'horizontal' }, ref) => {
  return (
    <RadixNavigationMenu.Root
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn('krds-navigation-menu', 'relative', className)}
      orientation={orientation}
    >
      <RadixNavigationMenu.List
        className={cn(
          'flex',
          orientation === 'horizontal'
            ? 'flex-row items-center gap-2'
            : 'flex-col gap-1'
        )}
      >
        {items.map((item: NavigationMenuItem, index: number) => {
          const hasDropdown = Boolean(item.sections || item.children);
          const isActive =
            item.active || (item.href && item.href === currentPath);

          return (
            <RadixNavigationMenu.Item key={index} className="relative">
              {hasDropdown ? (
                <>
                  {/* 드롭다운 트리거 */}
                  <RadixNavigationMenu.Trigger
                    className={getMenuItemStyles(!!isActive, true)}
                  >
                    {item.label}
                    <ChevronDown
                      className="relative top-[1px] transition-transform duration-200 group-data-[state=open]:rotate-180"
                      size={20}
                      aria-hidden
                    />
                  </RadixNavigationMenu.Trigger>

                  {/* 드롭다운 콘텐츠 - Item 내부에서 직접 렌더링 */}
                  <RadixNavigationMenu.Content
                    className={cn(
                      'absolute top-full left-1/2 -translate-x-1/2 mt-0',
                      item.dropdownWidth || 'w-[200px]',
                      'rounded-lg border border-krds-gray-20 bg-krds-white shadow-lg',
                      'data-[state=open]:animate-in data-[state=closed]:animate-out',
                      'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
                      'data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95'
                    )}
                  >
                    {/* 섹션 렌더링 */}
                    {item.sections?.map(
                      (section: NavigationMenuSection, sIndex: number) => (
                        <div
                          key={sIndex}
                          className={cn(
                            'p-4',
                            sIndex > 0 && 'border-t border-krds-gray-20'
                          )}
                        >
                          {section.title && (
                            <h3 className="text-xs font-semibold text-krds-gray-60 uppercase tracking-wide mb-3">
                              {section.title}
                            </h3>
                          )}

                          <ul className="space-y-2">
                            {section.links.map(
                              (link: NavigationMenuLink, lIndex: number) => (
                                <li key={lIndex} className="relative">
                                  <RadixNavigationMenu.Link asChild>
                                    <a
                                      href={link.href}
                                      className={cn(
                                        'block px-3 py-2 rounded-md',
                                        'transition-colors',
                                        'hover:bg-krds-gray-5',
                                        'focus:outline-none focus:ring-2 focus:ring-krds-primary-60',
                                        link.active &&
                                          'bg-krds-gray-5 text-krds-primary-60'
                                      )}
                                      aria-current={
                                        link.active ? 'page' : undefined
                                      }
                                    >
                                      <div className="font-medium text-krds-gray-90">
                                        {link.label}
                                      </div>
                                      {link.description && (
                                        <div className="text-xs text-krds-gray-60 mt-1">
                                          {link.description}
                                        </div>
                                      )}
                                    </a>
                                  </RadixNavigationMenu.Link>
                                </li>
                              )
                            )}
                          </ul>

                          {/* 유틸리티 링크 */}
                          {section.utilityLinks &&
                            section.utilityLinks.length > 0 && (
                              <div className="mt-3 pt-3 border-t border-krds-gray-10">
                                <ul className="space-y-1">
                                  {section.utilityLinks.map(
                                    (
                                      utilityLink: NavigationMenuLink,
                                      uIndex: number
                                    ) => (
                                      <li key={uIndex}>
                                        <RadixNavigationMenu.Link asChild>
                                          <a
                                            href={utilityLink.href}
                                            className="block px-3 py-1.5 text-krds-body-sm font-medium text-krds-primary-60 hover:text-krds-primary-70 hover:underline focus:outline-none focus:ring-2 focus:ring-krds-primary-60 rounded transition-colors"
                                          >
                                            {utilityLink.label} →
                                          </a>
                                        </RadixNavigationMenu.Link>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}
                        </div>
                      )
                    )}

                    {/* 간단한 자식 링크 (sections 대신) */}
                    {item.children && !item.sections && (
                      <div className="p-2">
                        <ul className="space-y-1">
                          {item.children.map(
                            (child: NavigationMenuLink, cIndex: number) => (
                              <li key={cIndex} className="relative">
                                <RadixNavigationMenu.Link asChild>
                                  <a
                                    href={child.href}
                                    className={cn(
                                      'block px-3 py-2 rounded-md',
                                      'text-krds-gray-90',
                                      'transition-colors',
                                      'hover:bg-krds-gray-5',
                                      'focus:outline-none focus:ring-2 focus:ring-krds-primary-60',
                                      child.active &&
                                        'bg-krds-gray-5 text-krds-primary-60'
                                    )}
                                    aria-current={
                                      child.active ? 'page' : undefined
                                    }
                                  >
                                    {child.label}
                                  </a>
                                </RadixNavigationMenu.Link>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </RadixNavigationMenu.Content>
                </>
              ) : (
                /* 단순 링크 */
                <RadixNavigationMenu.Link asChild>
                  <a
                    href={item.href}
                    className={getMenuItemStyles(!!isActive, false)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </RadixNavigationMenu.Link>
              )}
            </RadixNavigationMenu.Item>
          );
        })}
      </RadixNavigationMenu.List>
    </RadixNavigationMenu.Root>
  );
});

NavigationMenu.displayName = 'NavigationMenu';
