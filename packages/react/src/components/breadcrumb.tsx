'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * BreadcrumbItem Interface
 */
export interface BreadcrumbItem {
  /**
   * Label to display
   */
  label: string;

  /**
   * URL to navigate to (optional for current page)
   */
  href?: string;

  /**
   * Whether this is the current page
   */
  isCurrent?: boolean;
}

/**
 * Breadcrumb Props
 */
export interface BreadcrumbProps {
  /**
   * Breadcrumb items
   */
  items: BreadcrumbItem[];

  /**
   * Separator element
   * @default '/'
   */
  separator?: React.ReactNode;

  /**
   * Maximum items to show before collapsing
   * @default undefined (show all)
   */
  maxItems?: number;

  /**
   * Number of items to show before collapse indicator
   * @default 1
   */
  itemsBeforeCollapse?: number;

  /**
   * Number of items to show after collapse indicator
   * @default 1
   */
  itemsAfterCollapse?: number;

  /**
   * Custom link component
   */
  LinkComponent?: React.ComponentType<{
    href: string;
    children: React.ReactNode;
    className?: string;
  }>;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * ARIA label for navigation
   */
  ariaLabel?: string;
}

/**
 * Default Link Component (uses anchor tag)
 */
const DefaultLink: React.FC<{
  href: string;
  children: React.ReactNode;
  className?: string;
}> = ({ href, children, className }) => (
  <a href={href} className={className}>
    {children}
  </a>
);

/**
 * Breadcrumb Component
 *
 * KRDS-compliant breadcrumb navigation with accessibility
 *
 * **Features:**
 * - Semantic nav + ol structure
 * - aria-label and aria-current
 * - Overflow handling with collapse
 * - Customizable separator
 * - Custom link component support
 *
 * @example
 * ```tsx
 * <Breadcrumb
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Products', href: '/products' },
 *     { label: 'Laptop', isCurrent: true }
 *   ]}
 * />
 * ```
 */
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      items,
      separator = '/',
      maxItems,
      itemsBeforeCollapse = 1,
      itemsAfterCollapse = 1,
      LinkComponent = DefaultLink,
      className,
      ariaLabel = 'Breadcrumb',
    },
    ref
  ) => {
    const displayedItems = React.useMemo(() => {
      if (!maxItems || items.length <= maxItems) {
        return items;
      }

      // maxItems는 '...'를 포함한 총 표시 개수
      // 예: maxItems={4} → [홈] + [...] + [Computers, Laptops] = 4개 표시
      const totalSlots = maxItems - 1; // '...' 자리를 위해 1개 제외
      const before = itemsBeforeCollapse;
      const after = Math.max(1, totalSlots - before); // 최소 1개는 뒤에 표시

      const beforeItems = items.slice(0, before);
      const afterItems = items.slice(items.length - after);

      return [
        ...beforeItems,
        { label: '...', isCollapsed: true } as BreadcrumbItem & {
          isCollapsed: boolean;
        },
        ...afterItems,
      ];
    }, [items, maxItems, itemsBeforeCollapse, itemsAfterCollapse]);

    return (
      <nav
        id="breadcrumb"
        ref={ref}
        aria-label={ariaLabel}
        className={cn('pt-6 mb-10', className)}
      >
        <ol className="flex items-center flex-wrap gap-2">
          {displayedItems.map((item, index) => {
            const isLast = index === displayedItems.length - 1;
            const isCurrent = item.isCurrent || isLast;
            const isCollapsed = 'isCollapsed' in item && item.isCollapsed;
            const key = item.href || `${item.label}-${index}`;

            return (
              <li key={key} className="flex items-center gap-2">
                {isCollapsed ? (
                  <span className="text-krds-gray-60" aria-hidden="true">
                    {item.label}
                  </span>
                ) : isCurrent ? (
                  <span
                    className="font-medium text-krds-gray-95"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <LinkComponent
                    href={item.href || '#'}
                    className={cn(
                      'text-krds-gray-70',
                      'hover:text-krds-gray-95',
                      'transition-colors',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-base focus-visible:ring-offset-2',
                      'rounded-sm'
                    )}
                  >
                    {item.label}
                  </LinkComponent>
                )}

                {!isLast && (
                  <span
                    className="text-krds-gray-50 select-none"
                    aria-hidden="true"
                  >
                    {separator}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';
