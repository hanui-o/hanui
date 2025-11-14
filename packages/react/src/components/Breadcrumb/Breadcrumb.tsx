'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * Breadcrumb Props Interface
 */
export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Custom separator between items
   * @default ">"
   */
  separator?: React.ReactNode;

  /**
   * Additional className for nav element
   */
  className?: string;

  /**
   * Breadcrumb items
   */
  children: React.ReactNode;
}

/**
 * Breadcrumb Item Props Interface
 */
export interface BreadcrumbItemProps
  extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * Link href (if not current page)
   */
  href?: string;

  /**
   * Whether this is the current page
   */
  current?: boolean;

  /**
   * Whether this is the home item (first item)
   */
  isHome?: boolean;

  /**
   * Additional className
   */
  className?: string;

  /**
   * Item content
   */
  children: React.ReactNode;
}

/**
 * Breadcrumb Context
 */
interface BreadcrumbContextValue {
  separator: React.ReactNode;
}

const BreadcrumbContext = React.createContext<BreadcrumbContextValue>({
  separator: '>',
});

/**
 * Breadcrumb Component (브레드크럼)
 *
 * **Foundation Layer Features:**
 * - ✅ Required CSS Class: .krds-breadcrumb-wrap (KRDS mandatory)
 * - ✅ Semantic HTML: nav with aria-label, ordered list structure
 * - ✅ WCAG 2.1 / KWCAG 2.2 Compliance: Keyboard navigation, focus management
 * - ✅ Screen Reader Support: Proper ARIA labels and separators hidden from screen readers
 * - ✅ Visual Hierarchy: Separators with 3:1 contrast ratio, hover effects
 *
 * **KRDS Standards:**
 * - Displays hierarchical navigation structure
 * - Enables users to identify current location and navigate to parent levels
 * - Always includes home link as first item
 * - Positioned above page titles, left-aligned
 * - Single-line layout with ellipsis for long paths
 * - Desktop: Up to 4 links with ellipsis
 * - Mobile: First and last path only with ellipsis
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Breadcrumb>
 *   <BreadcrumbItem href="/" isHome>홈</BreadcrumbItem>
 *   <BreadcrumbItem href="/notice">공지사항</BreadcrumbItem>
 *   <BreadcrumbItem current>상세보기</BreadcrumbItem>
 * </Breadcrumb>
 *
 * // Custom separator
 * <Breadcrumb separator="/">
 *   <BreadcrumbItem href="/" isHome>홈</BreadcrumbItem>
 *   <BreadcrumbItem href="/service">서비스 신청</BreadcrumbItem>
 *   <BreadcrumbItem current>서비스 신청2</BreadcrumbItem>
 * </Breadcrumb>
 * ```
 */
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ separator = '>', className, children, ...props }, ref) => {
    return (
      <BreadcrumbContext.Provider value={{ separator }}>
        <nav
          ref={ref}
          aria-label="브레드크럼"
          className={cn('text-[15px] leading-[150%]', className)}
          {...props}
        >
          <ol
            className={cn(
              'krds-breadcrumb-wrap',
              'flex items-center flex-wrap gap-2'
            )}
          >
            {children}
          </ol>
        </nav>
      </BreadcrumbContext.Provider>
    );
  }
);
Breadcrumb.displayName = 'Breadcrumb';

/**
 * Breadcrumb Item Component
 *
 * Individual breadcrumb item with optional link and home styling.
 * Automatically handles text overflow with ellipsis and tooltip.
 */
export const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  BreadcrumbItemProps
>(({ href, current, isHome, className, children, ...props }, ref) => {
  const { separator } = React.useContext(BreadcrumbContext);
  const [isOverflowing, setIsOverflowing] = React.useState(false);
  const textRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        setIsOverflowing(
          textRef.current.scrollWidth > textRef.current.clientWidth
        );
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [children]);

  const content = (
    <span
      ref={textRef}
      className={cn(
        'max-w-[200px] truncate inline-block align-middle',
        isOverflowing && 'cursor-help'
      )}
      title={isOverflowing ? String(children) : undefined}
    >
      {children}
    </span>
  );

  return (
    <li
      ref={ref}
      className={cn(
        'inline-flex items-center gap-2',
        isHome && 'home',
        className
      )}
      {...props}
    >
      {href && !current ? (
        <a
          href={href}
          className={cn(
            'text-gray-600 dark:text-gray-400',
            'hover:text-blue-600 dark:hover:text-blue-400',
            'hover:underline',
            'transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 rounded px-1'
          )}
        >
          {content}
        </a>
      ) : (
        <span
          className={cn(
            current
              ? 'text-gray-900 dark:text-gray-100 font-medium'
              : 'text-gray-600 dark:text-gray-400 cursor-default'
          )}
          aria-current={current ? 'page' : undefined}
        >
          {content}
        </span>
      )}

      {/* Separator - hide for last item */}
      <span
        className="text-gray-400 dark:text-gray-600 select-none last:hidden"
        aria-hidden="true"
      >
        {separator}
      </span>
    </li>
  );
});
BreadcrumbItem.displayName = 'BreadcrumbItem';
