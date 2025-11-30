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
 * 모든 depth2 메뉴가 한번에 표시되는 메가메뉴 스타일 네비게이션 컴포넌트
 *
 * **주요 기능:**
 * - 호버 시 전체 너비 배경과 함께 모든 서브메뉴 표시
 * - Grid 레이아웃으로 깔끔한 메뉴 구조
 * - 자동 접근성 처리 (WCAG 2.1 / KWCAG 2.2 준수)
 * - 키보드 네비게이션 지원
 *
 * **자세한 사용법:** /components/mainmenu 문서 참고
 */
export const MegaMenu = React.forwardRef<HTMLElement, MegaMenuProps>(
  (
    {
      columns,
      currentPath,
      className,
      dropdownBgColor = 'bg-krds-white',
      dropdownBorderColor = 'border-krds-gray-20',
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(true);
    const [activeColumn, setActiveColumn] = React.useState<number | null>(null);
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();
    const navRef = React.useRef<HTMLElement | null>(null);

    const handleMouseEnter = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsOpen(true);
    };

    const handleMouseLeave = () => {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
        setActiveColumn(null);
      }, 200);
    };

    const handleColumnMouseEnter = (index: number) => {
      setActiveColumn(index);
    };

    // 키보드 포커스 시 드롭다운 열기
    const handleColumnFocus = (index: number) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsOpen(true);
      setActiveColumn(index);
    };

    // 1depth 메뉴에서 키보드 이벤트 처리
    const handleColumnKeyDown = (e: React.KeyboardEvent, index: number) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();

        // 현재 컬럼에 링크가 없으면 첫 번째 링크가 있는 컬럼 찾기
        let targetColIndex = index;
        if (columns[index].links.length === 0) {
          // 오른쪽으로 링크가 있는 컬럼 찾기
          for (let i = index + 1; i < columns.length; i++) {
            if (columns[i].links.length > 0) {
              targetColIndex = i;
              break;
            }
          }
          // 오른쪽에 없으면 왼쪽으로 찾기
          if (targetColIndex === index && columns[index].links.length === 0) {
            for (let i = index - 1; i >= 0; i--) {
              if (columns[i].links.length > 0) {
                targetColIndex = i;
                break;
              }
            }
          }
        }

        setIsOpen(true);
        setActiveColumn(targetColIndex);

        // 첫 번째 2depth 링크로 포커스 이동
        setTimeout(() => {
          const firstLink = navRef.current?.querySelector(
            `[data-column="${targetColIndex}"] a[role="menuitem"]`
          ) as HTMLElement;
          if (firstLink) {
            firstLink.focus();
          }
        }, 50);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        setActiveColumn(null);
      }
    };

    // 2depth 메뉴에서 키보드 이벤트 처리
    const handleSubmenuKeyDown = (
      e: React.KeyboardEvent,
      colIndex: number,
      linkIndex: number
    ) => {
      const currentColumn = columns[colIndex];
      const totalLinks = currentColumn.links.length;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (linkIndex < totalLinks - 1) {
          // 같은 컬럼의 다음 링크로 이동
          const nextLink = navRef.current?.querySelector(
            `[data-column="${colIndex}"] [data-link="${linkIndex + 1}"]`
          ) as HTMLElement;
          nextLink?.focus();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (linkIndex > 0) {
          // 같은 컬럼의 이전 링크로 이동
          const prevLink = navRef.current?.querySelector(
            `[data-column="${colIndex}"] [data-link="${linkIndex - 1}"]`
          ) as HTMLElement;
          prevLink?.focus();
        } else {
          // 1depth 메뉴로 돌아가기
          const columnLink = navRef.current?.querySelector(
            `[data-column-trigger="${colIndex}"]`
          ) as HTMLElement;
          columnLink?.focus();
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        // 링크가 있는 다음 컬럼 찾기
        let nextColIndex = colIndex + 1;
        while (nextColIndex < columns.length) {
          if (columns[nextColIndex].links.length > 0) {
            setActiveColumn(nextColIndex);
            setTimeout(() => {
              const nextColumnFirstLink = navRef.current?.querySelector(
                `[data-column="${nextColIndex}"] [data-link="0"]`
              ) as HTMLElement;
              if (nextColumnFirstLink) {
                nextColumnFirstLink.focus();
              }
            }, 50);
            break;
          }
          nextColIndex++;
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        // 링크가 있는 이전 컬럼 찾기
        let prevColIndex = colIndex - 1;
        while (prevColIndex >= 0) {
          if (columns[prevColIndex].links.length > 0) {
            setActiveColumn(prevColIndex);
            setTimeout(() => {
              const prevColumnFirstLink = navRef.current?.querySelector(
                `[data-column="${prevColIndex}"] [data-link="0"]`
              ) as HTMLElement;
              if (prevColumnFirstLink) {
                prevColumnFirstLink.focus();
              }
            }, 50);
            break;
          }
          prevColIndex--;
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
        setActiveColumn(null);
        // 해당 컬럼의 1depth 메뉴로 포커스 복귀
        const columnLink = navRef.current?.querySelector(
          `[data-column-trigger="${colIndex}"]`
        ) as HTMLElement;
        columnLink?.focus();
      }
    };

    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    return (
      <nav
        ref={(node) => {
          navRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLElement | null>).current = node;
          }
        }}
        className={cn('krds-mega-menu', 'relative', className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="메인 메뉴"
      >
        {/* Main Menu Bar */}
        <ul className="flex items-center gap-2">
          {columns.map((column, index) => {
            const isActive =
              column.active ||
              (currentPath && column.href === currentPath) ||
              (currentPath &&
                column.links.some((link) => link.href === currentPath));

            return (
              <li key={index}>
                <a
                  href={column.href || '#'}
                  className={cn(
                    'flex items-center h-14 px-4 py-2 font-medium rounded-md',
                    'transition-colors duration-200',
                    'hover:bg-krds-gray-5',
                    'focus:outline-none focus:ring-2 focus:ring-krds-primary-60 focus:ring-offset-2',
                    isActive && 'bg-krds-gray-5 text-krds-primary-60',
                    activeColumn === index && isOpen && 'bg-krds-gray-5'
                  )}
                  onMouseEnter={() => handleColumnMouseEnter(index)}
                  onFocus={() => handleColumnFocus(index)}
                  onKeyDown={(e) => handleColumnKeyDown(e, index)}
                  aria-current={isActive ? 'page' : undefined}
                  aria-haspopup="true"
                  aria-expanded={isOpen && activeColumn === index}
                  data-column-trigger={index}
                >
                  {column.title}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mega Dropdown */}
        {isOpen && (
          <div
            className={cn(
              'absolute left-1/2 -translate-x-1/2 top-full mt-6 z-50',
              'w-screen',
              dropdownBgColor,
              'border-t border-krds-gray-10',
              'shadow-md',
              'animate-in fade-in slide-in-from-top-2 duration-200'
            )}
            role="menu"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div
                className={cn(
                  'grid gap-12',
                  columns.length === 2 && 'grid-cols-2',
                  columns.length === 3 && 'grid-cols-3',
                  columns.length === 4 && 'grid-cols-4',
                  columns.length === 5 && 'grid-cols-5',
                  columns.length === 6 && 'grid-cols-6',
                  columns.length === 7 && 'grid-cols-7',
                  columns.length >= 8 && 'grid-cols-4 lg:grid-cols-8'
                )}
              >
                {columns.map((column, colIndex) => (
                  <div
                    key={colIndex}
                    className={cn(
                      'space-y-3',
                      activeColumn === colIndex && 'opacity-100',
                      activeColumn !== null &&
                        activeColumn !== colIndex &&
                        'opacity-60'
                    )}
                    onMouseEnter={() => handleColumnMouseEnter(colIndex)}
                    data-column={colIndex}
                  >
                    {/* Column Title */}
                    <h3 className="font-bold text-krds-gray-90 pb-2">
                      {column.href ? (
                        <a
                          href={column.href}
                          className="hover:text-krds-primary-60 transition-colors focus:outline-none focus:ring-2 focus:ring-krds-primary-60 rounded"
                          role="menuitem"
                        >
                          {column.title}
                        </a>
                      ) : (
                        column.title
                      )}
                    </h3>

                    {/* Sub Links */}
                    <ul className="space-y-2" role="menu">
                      {column.links.map((link, linkIndex) => {
                        const isLinkActive =
                          link.active || link.href === currentPath;

                        return (
                          <li key={linkIndex}>
                            <a
                              href={link.href}
                              className={cn(
                                'block py-1.5 rounded-md',
                                'transition-colors',
                                'hover:bg-krds-gray-5 hover:text-krds-primary-60',
                                'focus:outline-none focus:ring-2 focus:ring-krds-primary-60',
                                isLinkActive
                                  ? 'bg-krds-gray-5 text-krds-primary-60 font-medium'
                                  : 'text-krds-gray-70'
                              )}
                              aria-current={isLinkActive ? 'page' : undefined}
                              role="menuitem"
                              data-link={linkIndex}
                              onKeyDown={(e) =>
                                handleSubmenuKeyDown(e, colIndex, linkIndex)
                              }
                            >
                              {link.label}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    );
  }
);

MegaMenu.displayName = 'MegaMenu';
