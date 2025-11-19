'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Table Component (테이블)
 *
 * **Foundation Layer Features:**
 * - Semantic HTML: Proper table structure with thead, tbody, tfoot
 * - WCAG 2.1 / KWCAG 2.2 Compliance: Proper scope attributes and keyboard navigation
 * - Screen Reader Support: Caption support and proper header associations
 * - Visual Hierarchy: Clear borders and spacing system
 * - Dark Mode: Automatic dark mode support with optimized colors
 *
 * **Design Principles:**
 * - Structured data presentation with clear hierarchy
 * - Compound component pattern for flexible composition
 * - Responsive design with horizontal scroll on small screens
 * - Sortable headers for interactive data tables
 * - Striped rows for improved readability
 *
 * @example
 * ```tsx
 * <Table>
 *   <TableCaption>사용자 목록</TableCaption>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>이름</TableHead>
 *       <TableHead>이메일</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>홍길동</TableCell>
 *       <TableCell>hong@example.com</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
export const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn(
        'w-full caption-bottom text-[15px] leading-[150%]',
        className
      )}
      {...props}
    />
  </div>
));
Table.displayName = 'Table';

/**
 * Table Header Component
 *
 * Container for table header rows with proper semantic markup
 */
export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      '[&_tr]:border-b [&_tr]:border-gray-200 dark:[&_tr]:border-gray-700',
      className
    )}
    {...props}
  />
));
TableHeader.displayName = 'TableHeader';

/**
 * Table Body Component
 *
 * Container for table data rows with optional striped styling
 *
 * @example
 * ```tsx
 * <TableBody striped>
 *   <TableRow>
 *     <TableCell>Data</TableCell>
 *   </TableRow>
 * </TableBody>
 * ```
 */
export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement> & {
    /**
     * Enable striped rows for better readability
     * @default false
     */
    striped?: boolean;
  }
>(({ className, striped = false, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      '[&_tr:last-child]:border-0',
      striped &&
        '[&_tr:nth-child(even)]:bg-gray-50 dark:[&_tr:nth-child(even)]:bg-gray-800/50',
      className
    )}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

/**
 * Table Footer Component
 *
 * Container for table footer rows (typically for totals or summaries)
 */
export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'border-t border-gray-200 dark:border-gray-700',
      'bg-gray-50 dark:bg-gray-800/50',
      'font-medium',
      '[&>tr]:last:border-b-0',
      className
    )}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

/**
 * Table Row Component
 *
 * Individual table row with hover effects and selection support
 */
export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b border-gray-200 dark:border-gray-700',
      'transition-colors',
      'hover:bg-gray-50 dark:hover:bg-gray-800/50',
      'data-[state=selected]:bg-gray-100 dark:data-[state=selected]:bg-gray-700',
      className
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

/**
 * Table Head Component
 *
 * Table header cell with proper accessibility and optional sorting
 *
 * @example
 * ```tsx
 * <TableHead sortable sortDirection="asc" onSort={handleSort}>
 *   이름
 * </TableHead>
 * ```
 */
export const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & {
    /**
     * Enable sorting functionality
     */
    sortable?: boolean;
    /**
     * Current sort direction
     */
    sortDirection?: 'asc' | 'desc' | null;
    /**
     * Sort handler
     */
    onSort?: () => void;
  }
>(
  (
    { className, sortable, sortDirection, onSort, children, scope, ...props },
    ref
  ) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTableCellElement>) => {
      if (sortable && onSort && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onSort();
      }
    };

    const content = (
      <>
        {children}
        {sortable && sortDirection && (
          <span className="ml-2 inline-block" aria-hidden="true">
            {sortDirection === 'asc' ? '↑' : '↓'}
          </span>
        )}
      </>
    );

    return (
      <th
        ref={ref}
        scope={scope || 'col'}
        className={cn(
          'h-10 px-4 text-left align-middle',
          'font-medium text-gray-600 dark:text-gray-300',
          '[&:has([role=checkbox])]:pr-0',
          sortable && [
            'cursor-pointer select-none',
            'hover:bg-gray-100 dark:hover:bg-gray-800',
            'focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400',
          ],
          className
        )}
        onClick={sortable ? onSort : undefined}
        onKeyDown={handleKeyDown}
        tabIndex={sortable ? 0 : undefined}
        role={sortable ? 'button' : undefined}
        aria-sort={
          sortable && sortDirection
            ? sortDirection === 'asc'
              ? 'ascending'
              : 'descending'
            : undefined
        }
        {...props}
      >
        {content}
      </th>
    );
  }
);
TableHead.displayName = 'TableHead';

/**
 * Table Cell Component
 *
 * Individual table data cell
 */
export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'p-4 align-middle',
      'text-gray-900 dark:text-gray-100',
      '[&:has([role=checkbox])]:pr-0',
      className
    )}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

/**
 * Table Caption Component
 *
 * Provides accessible description of table content
 *
 * @example
 * ```tsx
 * <TableCaption>2024년 매출 현황</TableCaption>
 * ```
 */
export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(
      'mt-4 text-[15px] leading-[150%]',
      'text-gray-600 dark:text-gray-400',
      className
    )}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';
