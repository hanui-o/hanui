'use client';

import React, { useState } from 'react';
import { cn } from '../lib/utils';

/**
 * 사이드 네비게이션 메뉴 아이템 (3/4단계)
 */
export interface SideNavigationMenuItem {
  /** 메뉴 라벨 */
  label: string;
  /** 링크 URL */
  href?: string;
  /** 활성화 상태 */
  active?: boolean;
  /** 하위 메뉴 (4단계) */
  children?: SideNavigationMenuItem[];
}

/**
 * 사이드 네비게이션 섹션 (2단계)
 */
export interface SideNavigationSection {
  /** 섹션 라벨 */
  label: string;
  /** 섹션 URL (선택사항, 토글 버튼용) */
  href?: string;
  /** 활성화 상태 */
  active?: boolean;
  /** 하위 메뉴 */
  children?: SideNavigationMenuItem[];
}

// Legacy aliases for backward compatibility
export type SideNavLink = SideNavigationMenuItem;
export type SideNavSection = SideNavigationSection;

/**
 * 사이드 네비게이션 Props
 */
export interface SideNavigationProps extends React.HTMLAttributes<HTMLElement> {
  /** 네비게이션 제목 (1단계) */
  title: string;
  /** 네비게이션 메뉴 (2단계 섹션 배열) */
  menuItems: SideNavigationSection[];
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * 사이드 네비게이션 컴포넌트
 *
 * KRDS 표준을 따르는 다단계 사이드 네비게이션
 * - 최대 4단계 깊이 지원
 * - 토글 버튼으로 확장 가능한 섹션
 * - 활성 상태 표시
 * - 올바른 ul > li 시맨틱 HTML 구조
 * - WCAG 2.1 / KWCAG 2.2 준수
 */
export function SideNavigation({
  title,
  menuItems,
  className = '',
  ...props
}: SideNavigationProps) {
  // 2단계 섹션 열림 상태 (활성 상태 기반으로 초기화)
  const [openSections, setOpenSections] = useState<Set<number>>(() => {
    const initial = new Set<number>();
    menuItems.forEach((section, index) => {
      if (section.active || section.children?.some((child) => child.active)) {
        initial.add(index);
      }
    });
    return initial;
  });

  // 3단계 메뉴 열림 상태 (활성 상태 기반으로 초기화)
  const [openChildren, setOpenChildren] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    menuItems.forEach((section, sectionIndex) => {
      section.children?.forEach((child, childIndex) => {
        if (child.active || child.children?.some((c) => c.active)) {
          initial.add(`${sectionIndex}-${childIndex}`);
        }
      });
    });
    return initial;
  });

  const toggleSection = (index: number) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const toggleChild = (sectionIndex: number, childIndex: number) => {
    const key = `${sectionIndex}-${childIndex}`;
    setOpenChildren((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <nav
      className={cn('w-full max-w-[296px] py-10 pr-10 bg-white', className)}
      aria-labelledby="side-nav-title"
      {...props}
    >
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1Depth-title: 네비게이션 최상단 제목
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        id="side-nav-title"
        className="px-2 pb-4 m-0 border-b border-krds-gray-40 text-2xl font-bold leading-[1.4] text-krds-gray-90"
      >
        {title}
      </div>

      {/* 메뉴 리스트 - 순수 ul > li 구조 */}
      <ul role="menubar" className="list-none p-0 m-0">
        {menuItems.map((section, sectionIndex) => {
          const isActive =
            section.active || section.children?.some((child) => child.active);
          const hasChildren = section.children && section.children.length > 0;
          const isSectionOpen = openSections.has(sectionIndex);

          return (
            <li
              key={sectionIndex}
              role="none"
              className={cn(
                'relative border-b border-krds-gray-20',
                isActive && 'active border-krds-gray-30'
              )}
            >
              {hasChildren ? (
                <>
                  {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                      2Depth-title: 섹션 토글 버튼 (하위 메뉴 있음)
                      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                  <button
                    type="button"
                    onClick={() => toggleSection(sectionIndex)}
                    className={cn(
                      'flex items-center justify-between w-full px-2 py-4 border-0 bg-transparent',
                      'text-krds-body-md font-bold leading-[1.5] text-krds-gray-90 text-left cursor-pointer',
                      'transition-all duration-200 ease-in-out',
                      'relative',
                      // 하단 밑줄 효과
                      'before:content-[""] before:absolute before:bottom-[-1px] before:left-0 before:w-0 before:h-[3px] before:bg-[#063a74] before:transition-all before:duration-[400ms]',
                      // 호버
                      'hover:bg-krds-primary-5 hover:before:w-full',
                      // 포커스
                      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-krds-blue-60 focus-visible:outline-offset-[-2px]',
                      // 셰브론 아이콘
                      'after:content-[""] after:inline-block after:w-5 after:h-5 after:flex-shrink-0',
                      'after:bg-[url("https://www.krds.go.kr/resources/img/component/icon/ico_angle.svg")]',
                      'after:bg-no-repeat after:bg-center after:bg-contain',
                      'after:transition-transform after:duration-200',
                      isSectionOpen && 'after:rotate-180'
                    )}
                    role="menuitem"
                    aria-expanded={isSectionOpen}
                    aria-haspopup="true"
                    aria-controls={`section-menu-${sectionIndex}`}
                  >
                    {section.label}
                  </button>

                  {/* 3단계 하위 메뉴 */}
                  {isSectionOpen && (
                    <ul
                      role="menu"
                      id={`section-menu-${sectionIndex}`}
                      className="list-none p-0 pb-2 m-0"
                    >
                      {section.children!.map((child, childIndex) => {
                        const hasGrandChildren =
                          child.children && child.children.length > 0;
                        const isChildOpen = openChildren.has(
                          `${sectionIndex}-${childIndex}`
                        );

                        return (
                          <li
                            key={childIndex}
                            role="none"
                            className={cn('relative', child.active && 'active')}
                          >
                            {hasGrandChildren ? (
                              <>
                                {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                    3Depth-menu: 토글 버튼 (4단계 하위 있음)
                                    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    toggleChild(sectionIndex, childIndex)
                                  }
                                  className={cn(
                                    'overflow-hidden',
                                    'flex items-center gap-2 w-full py-2 px-4 border-0 bg-transparent rounded-md',
                                    'text-krds-body-md font-normal leading-[1.5] text-krds-gray-90 text-left cursor-pointer',
                                    'transition-all duration-200',
                                    // 불릿
                                    'before:content-["•"] before:inline-block',
                                    // 호버
                                    'hover:bg-krds-primary-5',
                                    // 포커스
                                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-krds-blue-60 focus-visible:outline-offset-[-2px]',
                                    // 셰브론 아이콘
                                    'after:content-[""] after:inline-block after:w-5 after:h-5 after:flex-shrink-0 after:ml-auto',
                                    'after:bg-[url("https://www.krds.go.kr/resources/img/component/icon/ico_angle.svg")]',
                                    'after:bg-no-repeat after:bg-center after:bg-contain',
                                    'after:transition-transform after:duration-200',
                                    isChildOpen && 'after:rotate-180'
                                  )}
                                  role="menuitem"
                                  aria-expanded={isChildOpen}
                                  aria-haspopup="true"
                                  aria-controls={`child-menu-${sectionIndex}-${childIndex}`}
                                >
                                  {child.label}
                                </button>

                                {/* 4단계 하위 메뉴 */}
                                {isChildOpen && (
                                  <ul
                                    role="menu"
                                    id={`child-menu-${sectionIndex}-${childIndex}`}
                                    className="list-none p-0 m-0"
                                  >
                                    {child.children!.map(
                                      (grandChild, grandChildIndex) => (
                                        <li
                                          key={grandChildIndex}
                                          role="none"
                                          className={cn(
                                            'relative',
                                            grandChild.active && 'active'
                                          )}
                                        >
                                          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                              4Depth-menu: 최하위 링크
                                              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                                          <a
                                            href={grandChild.href}
                                            className={cn(
                                              'flex items-center gap-2 w-full py-2 px-4 pl-13 bg-transparent rounded-md',
                                              'text-krds-body-md font-normal leading-[1.5] text-krds-gray-90 text-left no-underline cursor-pointer',
                                              // 불릿
                                              'before:content-["•"] before:inline-block before:text-krds-gray-60',
                                              // 호버
                                              'hover:bg-krds-primary-5',
                                              // 포커스
                                              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-krds-blue-60 focus-visible:outline-offset-[-2px]',
                                              // 활성 상태 - ring outline 스타일
                                              grandChild.active &&
                                                'font-bold text-krds-blue-60 ring-2 ring-krds-blue-60 rounded-md before:text-krds-blue-60'
                                            )}
                                            role="menuitem"
                                            aria-current={
                                              grandChild.active
                                                ? 'page'
                                                : undefined
                                            }
                                          >
                                            {grandChild.label}
                                          </a>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                )}
                              </>
                            ) : (
                              /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                  3Depth-menu: 링크 (하위 메뉴 없음)
                                  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
                              <a
                                href={child.href}
                                className={cn(
                                  'flex items-center gap-2 w-full py-2 px-4 border-0 bg-transparent rounded-md',
                                  'text-krds-body-md font-normal leading-[1.5] text-krds-gray-90 text-left no-underline cursor-pointer',
                                  // 불릿
                                  'before:content-["•"] before:inline-block',
                                  // 호버
                                  'hover:bg-krds-primary-5',
                                  // 포커스
                                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-krds-blue-60 focus-visible:outline-offset-[-2px]',
                                  // 활성 상태 - ring outline 스타일
                                  child.active &&
                                    'font-bold text-krds-blue-60 ring-2 ring-krds-blue-60 rounded-md before:text-krds-blue-60'
                                )}
                                aria-current={child.active ? 'page' : undefined}
                                role="menuitem"
                              >
                                {child.label}
                              </a>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </>
              ) : (
                /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    2Depth: 섹션 링크 (하위 메뉴 없음)
                    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
                <a
                  href={section.href}
                  className={cn(
                    'flex items-center justify-between w-full py-3 px-3 border-0 bg-transparent',
                    'text-krds-body-md font-normal leading-[1.5] text-krds-gray-90 text-left no-underline cursor-pointer',
                    'transition-all duration-200',
                    // 하단 밑줄 효과
                    'relative before:content-[""] before:absolute before:bottom-[-1px] before:left-0 before:w-0 before:h-[3px] before:bg-[#063a74] before:transition-all before:duration-[400ms]',
                    // 호버
                    'hover:bg-krds-gray-10 hover:before:w-full',
                    // 포커스
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-krds-blue-60 focus-visible:outline-offset-[-2px]',
                    // 활성 상태
                    section.active && 'font-bold text-krds-blue-60'
                  )}
                  aria-current={section.active ? 'page' : undefined}
                  role="menuitem"
                >
                  {section.label}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/**
 * 샘플 사이드 네비게이션 메뉴 데이터
 */
export const SAMPLE_SIDE_NAVIGATION_MENU: SideNavigationSection[] = [
  {
    label: '2Depth-menu',
    children: [
      {
        label: '3Depth-menu',
        children: [
          { label: '4Depth', href: '#' },
          { label: '4Depth', href: '#' },
          { label: '4Depth', href: '#' },
        ],
      },
      { label: '3Depth-link', href: '#' },
      { label: '3Depth-link', href: '#' },
    ],
  },
  {
    label: '2Depth-menu',
    children: [
      {
        label: '3Depth-menu',
        children: [
          { label: '4Depth', href: '#' },
          { label: '4Depth', href: '#' },
          { label: '4Depth', href: '#' },
        ],
      },
      { label: '3Depth-link', href: '#' },
      { label: '3Depth-link', href: '#' },
    ],
  },
  {
    label: '2Depth-menu',
    children: [
      {
        label: '3Depth-menu',
        children: [
          { label: '4Depth', href: '#' },
          { label: '4Depth', href: '#' },
          { label: '4Depth', href: '#' },
        ],
      },
      { label: '3Depth-link', href: '#' },
      { label: '3Depth-link', href: '#' },
    ],
  },
];

// Legacy alias
export const SAMPLE_SIDE_NAVIGATION = SAMPLE_SIDE_NAVIGATION_MENU;
