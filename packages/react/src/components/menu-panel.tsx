'use client';

import * as React from 'react';
import {
  ChevronRight,
  ChevronDown,
  SquareArrowOutUpRight,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from './badge';

/**
 * Last depth 링크 항목
 */
export interface PanelMenuLink {
  label: string;
  href?: string;
  onClick?: () => void;
  /** 외부 링크 여부 */
  external?: boolean;
}

/**
 * 서브 콘텐츠 (오른쪽 패널)
 */
export interface PanelMenuSubContent {
  /** 서브 타이틀 */
  title: string;
  /** 바로가기 링크 (타이틀 옆) */
  titleLink?: {
    label: string;
    href: string;
  };
  /** Last depth 링크 목록 */
  links: PanelMenuLink[];
  /** 배너 영역 */
  banner?: {
    badge?: string;
    label: string;
    href: string;
  };
}

/**
 * 2Depth 메뉴 항목 (패널 내부)
 */
export interface PanelMenu2DepthItem {
  /** 메뉴 라벨 */
  label: string;
  /** 단순 링크 (subContent 없을 때) */
  href?: string;
  /** 외부 링크 여부 */
  external?: boolean;
  /** 서브 콘텐츠 (hover 시 오른쪽에 표시) */
  subContent?: PanelMenuSubContent;
  /** 활성 상태 */
  active?: boolean;
}

/**
 * 1Depth 메뉴 항목 (상단 네비게이션 바)
 */
export interface PanelMenuItem {
  /** 메뉴 라벨 */
  label: string;
  /** 단순 링크 (panel 없을 때) */
  href?: string;
  /** 활성 상태 */
  active?: boolean;
  /** 2Depth 패널 데이터 */
  panel?: PanelMenu2DepthItem[];
}

/**
 * PanelMenu Props
 */
export interface PanelMenuProps {
  /** 1Depth 메뉴 항목 배열 */
  items: PanelMenuItem[];
  /** 추가 CSS 클래스 */
  className?: string;
  /** 현재 경로 (aria-current 설정용) */
  currentPath?: string;
  /** 패널 최소 높이 (기본값: 262px) */
  panelMinHeight?: number;
}

/**
 * 1Depth 메뉴 아이템 스타일
 */
const get1DepthStyles = (
  isActive: boolean,
  hasPanel: boolean,
  isOpen: boolean = false
) =>
  cn(
    'relative h-full px-4',
    'transition-colors duration-200',
    'hover:bg-krds-primary-5',
    'pt-3 pb-4 font-bold text-krds-body-lg',
    'focus:outline-none focus:ring-2 focus:ring-krds-primary-60 focus:ring-offset-2',
    hasPanel ? ['group inline-flex items-center gap-1', ''] : ['block'],
    // 활성 상태 또는 열린 상태일 때 하단 인디케이터 표시
    (isActive || isOpen) && [
      'before:absolute before:left-0 before:w-full before:h-1 before:bg-krds-secondary-70',
      hasPanel ? 'before:bottom-0' : 'before:bottom-0 text-krds-primary-60',
    ]
  );

/**
 * 2Depth 메뉴 아이템 스타일 (일반 링크 & subContent 트리거 통합)
 */
const get2DepthStyles = (isActive: boolean, hasSubContent: boolean) =>
  cn(
    // 기본 레이아웃
    'flex items-center gap-2 w-full px-6 py-4',
    'text-krds-body-md',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-krds-secondary-80',
    'hover:bg-krds-white hover:text-krds-secondary-80 hover:font-bold',
    // 버튼 리셋 (subContent 트리거용)
    hasSubContent &&
      'bg-transparent border-none cursor-pointer text-left justify-between',
    // 상태별 스타일
    hasSubContent
      ? [
          // SubContent 트리거 상태
          isActive
            ? 'bg-white text-krds-secondary-80 font-bold'
            : 'text-krds-gray-90 font-medium',
        ]
      : [
          // 일반 링크 상태
          isActive
            ? 'text-krds-secondary-80 font-bold'
            : 'text-krds-gray-90 font-medium',
        ]
  );

/**
 * Panel Menu Component (KRDS 스타일 패널형 메뉴)
 *
 * NavigationMenu와 유사하게 사용 가능한 1Depth → 2Depth 패널형 메뉴
 *
 * **주요 기능:**
 * - 1Depth 호버 시 아래에 2Depth 패널 표시
 * - 2Depth 호버 시 오른쪽에 서브 콘텐츠 표시
 * - 키보드 네비게이션 지원
 * - 접근성 (ARIA) 지원
 */
export function PanelMenu({
  items,
  className,
  currentPath,
  panelMinHeight = 262,
}: PanelMenuProps) {
  const [open1Depth, setOpen1Depth] = React.useState<number | null>(null);
  const [active2Depth, setActive2Depth] = React.useState<number | null>(null);
  const menuRef = React.useRef<HTMLElement>(null);

  // 1Depth 클릭 토글
  const handleToggle1Depth = (index: number) => {
    if (open1Depth === index) {
      // 같은 메뉴 클릭 시 닫기
      setOpen1Depth(null);
      setActive2Depth(null);
    } else {
      // 다른 메뉴 클릭 시 열기
      setOpen1Depth(index);
      // 첫 번째 subContent 있는 항목 활성화
      const panelItems = items[index]?.panel;
      if (panelItems) {
        const firstWithSub = panelItems.findIndex((item) => item.subContent);
        setActive2Depth(firstWithSub >= 0 ? firstWithSub : null);
      }
    }
  };

  // 패널 닫기
  const handleClose = () => {
    setOpen1Depth(null);
    setActive2Depth(null);
  };

  // 외부 클릭 시 닫기
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (open1Depth !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open1Depth]);

  // ESC 키로 닫기
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (open1Depth !== null) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open1Depth]);

  const currentPanel = open1Depth !== null ? items[open1Depth]?.panel : null;
  const current2DepthItem =
    active2Depth !== null && currentPanel ? currentPanel[active2Depth] : null;

  return (
    <nav
      ref={menuRef}
      className={cn('krds-panel-menu', 'relative', className)}
      aria-label="주 메뉴"
    >
      {/* 1Depth 메뉴 바 */}
      <ul className="flex flex-row items-center gap-2 list-none m-0 p-0">
        {items.map((item, index) => {
          const hasPanel = Boolean(item.panel && item.panel.length > 0);
          const isActive =
            item.active || (item.href && item.href === currentPath);
          const isOpen = open1Depth === index;

          return (
            <li key={index} className="relative">
              {hasPanel ? (
                <button
                  type="button"
                  className={get1DepthStyles(!!isActive, true, isOpen)}
                  data-state={isOpen ? 'open' : 'closed'}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={() => handleToggle1Depth(index)}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      'relative top-[1px] transition-transform duration-200',
                      isOpen && 'rotate-180'
                    )}
                    size={20}
                    aria-hidden
                  />
                </button>
              ) : (
                <a
                  href={item.href}
                  className={get1DepthStyles(!!isActive, false)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ul>

      {/* Dimmed overlay */}
      {open1Depth !== null && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          aria-hidden="true"
          onClick={handleClose}
        />
      )}

      {/* 2Depth 패널 (드롭다운) - Full width backdrop */}
      {open1Depth !== null && currentPanel && (
        <div
          className={cn(
            'absolute top-full mt-0 z-50',
            // Full viewport width trick
            'left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen',
            'bg-white border-y border-krds-gray-20 shadow-lg',
            'animate-in fade-in-0 zoom-in-95 duration-200'
          )}
          role="menu"
        >
          {/* Centered content container */}
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex" style={{ minHeight: panelMinHeight }}>
              {/* 왼쪽: 2Depth 메뉴 리스트 */}
              <div className="w-[280px] flex-shrink-0 bg-krds-primary-5 border-r border-krds-gray-20">
                <ul className="list-none m-0 px-0 py-4" role="menubar">
                  {currentPanel.map((item2, index2) => {
                    const hasSubContent = Boolean(item2.subContent);
                    const is2DepthActive = active2Depth === index2;

                    // 단순 링크
                    if (!hasSubContent) {
                      return (
                        <li key={index2} role="none">
                          <a
                            href={item2.href}
                            className={get2DepthStyles(!!item2.active, false)}
                            role="menuitem"
                            {...(item2.external && {
                              target: '_blank',
                              rel: 'noopener noreferrer',
                            })}
                          >
                            {item2.label}
                            {item2.external ? (
                              <SquareArrowOutUpRight
                                className="w-4 h-4 flex-shrink-0"
                                aria-hidden="true"
                              />
                            ) : (
                              <ArrowRight
                                className="w-4 h-4 flex-shrink-0"
                                aria-hidden="true"
                              />
                            )}
                          </a>
                        </li>
                      );
                    }

                    // subContent 있는 트리거
                    return (
                      <li key={index2} role="none">
                        <button
                          type="button"
                          className={get2DepthStyles(is2DepthActive, true)}
                          role="menuitem"
                          aria-expanded={is2DepthActive}
                          onClick={() => setActive2Depth(index2)}
                          onFocus={() => setActive2Depth(index2)}
                        >
                          {item2.label}
                          <ChevronRight
                            className={cn(
                              'w-5 h-5 flex-shrink-0 transition-transform',
                              is2DepthActive && 'text-krds-secondary-80'
                            )}
                            aria-hidden="true"
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* 오른쪽: 서브 콘텐츠 */}
              <div className="flex-1 px-10 py-7">
                {current2DepthItem?.subContent && (
                  <div
                    role="menu"
                    aria-label={current2DepthItem.subContent.title}
                  >
                    {/* 서브 타이틀 */}
                    <div className="flex items-center gap-5 mb-5">
                      <h2 className="text-krds-heading-md font-bold text-krds-gray-90 m-0">
                        {current2DepthItem.subContent.title}
                      </h2>
                      {current2DepthItem.subContent.titleLink && (
                        <a
                          href={current2DepthItem.subContent.titleLink.href}
                          className="inline-flex items-center gap-1 text-krds-body-sm font-medium text-krds-gray-70 hover:text-krds-primary-60 hover:underline transition-colors"
                        >
                          <span className="underline">
                            {current2DepthItem.subContent.titleLink.label}
                          </span>
                          <ChevronRight
                            className="w-4 h-4"
                            aria-hidden="true"
                          />
                        </a>
                      )}
                    </div>

                    {/* Last depth 링크 목록 */}
                    <ul className="list-disc list-inside grid grid-cols-3 gap-x-7 gap-y-5 mb-6 marker:text-krds-gray-40">
                      {current2DepthItem.subContent.links.map(
                        (link, linkIndex) => (
                          <li key={linkIndex} role="none">
                            {link.href ? (
                              <a
                                href={link.href}
                                className={cn(
                                  'hover:text-krds-primary-60 hover:underline',
                                  'transition-colors',
                                  'focus:outline-none focus:ring-2 focus:ring-krds-primary-60 focus:ring-offset-2 rounded'
                                )}
                                role="menuitem"
                                {...(link.external && {
                                  target: '_blank',
                                  rel: 'noopener noreferrer',
                                })}
                              >
                                {link.label}
                                {link.external && (
                                  <SquareArrowOutUpRight
                                    className="inline-block w-3 h-3 ml-1"
                                    aria-hidden="true"
                                  />
                                )}
                              </a>
                            ) : (
                              <button
                                type="button"
                                className={cn(
                                  'hover:text-krds-primary-60 hover:underline',
                                  'transition-colors bg-transparent border-none cursor-pointer p-0',
                                  'focus:outline-none focus:ring-2 focus:ring-krds-primary-60 focus:ring-offset-2 rounded'
                                )}
                                role="menuitem"
                                onClick={link.onClick}
                              >
                                {link.label}
                              </button>
                            )}
                          </li>
                        )
                      )}
                    </ul>

                    {/* 배너 영역 */}
                    {current2DepthItem.subContent.banner && (
                      <div className="flex items-center gap-3 p-4 bg-krds-gray-5 rounded-lg">
                        {current2DepthItem.subContent.banner.badge && (
                          <Badge variant="secondary">
                            {current2DepthItem.subContent.banner.badge}
                          </Badge>
                        )}
                        <a
                          href={current2DepthItem.subContent.banner.href}
                          className="inline-flex items-center gap-1 text-krds-body-md font-medium text-krds-gray-90 hover:text-krds-primary-60 transition-colors"
                        >
                          {current2DepthItem.subContent.banner.label}
                          <ChevronRight
                            className="w-5 h-5"
                            aria-hidden="true"
                          />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

PanelMenu.displayName = 'PanelMenu';
