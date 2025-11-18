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
   * Position to show items when collapsed
   * @default 'end' (show last items)
   */
  itemsBeforeCollapse?: number;

  /**
   * Position to show items when collapsed
   * @default 'end' (show last items)
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

      const totalCollapsed = items.length - maxItems;
      const beforeItems = items.slice(0, itemsBeforeCollapse);
      const afterItems = items.slice(items.length - itemsAfterCollapse);

      return [
        ...beforeItems,
        { label: '...', isCollapsed: true } as BreadcrumbItem & {
          isCollapsed: boolean;
        },
        ...afterItems,
      ];
    }, [items, maxItems, itemsBeforeCollapse, itemsAfterCollapse]);

    return (
      <nav ref={ref} aria-label={ariaLabel} className={cn('', className)}>
        <ol className="flex items-center flex-wrap gap-2">
          {displayedItems.map((item, index) => {
            const isLast = index === displayedItems.length - 1;
            const isCurrent = item.isCurrent || isLast;
            const isCollapsed = 'isCollapsed' in item && item.isCollapsed;

            return (
              <li key={index} className="flex items-center gap-2">
                {isCollapsed ? (
                  <span
                    className="text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                  >
                    {item.label}
                  </span>
                ) : isCurrent ? (
                  <span
                    className="font-medium text-gray-900 dark:text-gray-100"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <LinkComponent
                    href={item.href || '#'}
                    className={cn(
                      'text-gray-600 dark:text-gray-400',
                      'hover:text-gray-900 dark:hover:text-gray-100',
                      'transition-colors',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                      'rounded-sm'
                    )}
                  >
                    {item.label}
                  </LinkComponent>
                )}

                {!isLast && (
                  <span
                    className="text-gray-400 dark:text-gray-600 select-none"
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
