'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Table Props
 */
export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  className?: string;
  children: React.ReactNode;
}

/**
 * TableHeader Props
 */
export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
  children: React.ReactNode;
}

/**
 * TableBody Props
 */
export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
  children: React.ReactNode;
}

/**
 * TableFooter Props
 */
export interface TableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
  children: React.ReactNode;
}

/**
 * TableRow Props
 */
export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  className?: string;
  children: React.ReactNode;
}

/**
 * TableHead Props
 */
export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  className?: string;
  children: React.ReactNode;
  /**
   * Enable sortable functionality
   */
  sortable?: boolean;
  /**
   * Current sort direction
   */
  sortDirection?: 'asc' | 'desc' | null;
  /**
   * Sort click handler
   */
  onSort?: () => void;
}

/**
 * TableCell Props
 */
export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  className?: string;
  children: React.ReactNode;
}

/**
 * TableCaption Props
 */
export interface TableCaptionProps
  extends React.HTMLAttributes<HTMLTableCaptionElement> {
  className?: string;
  children: React.ReactNode;
}

/**
 * Table Component
 *
 * KRDS-compliant table with semantic structure and accessibility
 *
 * @example
 * ```tsx
 * <Table>
 *   <TableCaption>A list of recent invoices</TableCaption>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Invoice</TableHead>
 *       <TableHead>Status</TableHead>
 *       <TableHead>Amount</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>INV001</TableCell>
 *       <TableCell>Paid</TableCell>
 *       <TableCell>$250.00</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative w-full overflow-auto">
        <table
          ref={ref}
          className={cn('w-full caption-bottom border-collapse', className)}
          {...props}
        >
          {children}
        </table>
      </div>
    );
  }
);

Table.displayName = 'Table';

/**
 * TableHeader Component
 */
export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ className, children, ...props }, ref) => {
  return (
    <thead
      ref={ref}
      className={cn(
        'bg-gray-50 dark:bg-gray-800/50',
        '[&_tr]:border-b [&_tr]:border-gray-200 dark:[&_tr]:border-gray-800',
        className
      )}
      {...props}
    >
      {children}
    </thead>
  );
});

TableHeader.displayName = 'TableHeader';

/**
 * TableBody Component
 */
export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  TableBodyProps
>(({ className, children, ...props }, ref) => {
  return (
    <tbody
      ref={ref}
      className={cn(
        '[&_tr:last-child]:border-0',
        '[&_tr]:border-b [&_tr]:border-gray-200 dark:[&_tr]:border-gray-800',
        className
      )}
      {...props}
    >
      {children}
    </tbody>
  );
});

TableBody.displayName = 'TableBody';

/**
 * TableFooter Component
 */
export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  TableFooterProps
>(({ className, children, ...props }, ref) => {
  return (
    <tfoot
      ref={ref}
      className={cn(
        'bg-gray-50 dark:bg-gray-800/50',
        'border-t border-gray-200 dark:border-gray-800',
        'font-medium',
        '[&>tr]:last:border-b-0',
        className
      )}
      {...props}
    >
      {children}
    </tfoot>
  );
});

TableFooter.displayName = 'TableFooter';

/**
 * TableRow Component
 */
export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn(
          'transition-colors',
          'hover:bg-gray-50 dark:hover:bg-gray-800/50',
          'data-[state=selected]:bg-gray-100 dark:data-[state=selected]:bg-gray-800',
          className
        )}
        {...props}
      >
        {children}
      </tr>
    );
  }
);

TableRow.displayName = 'TableRow';

/**
 * TableHead Component
 */
export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, children, sortable, sortDirection, onSort, ...props }, ref) => {
    const content = (
      <>
        <span>{children}</span>
        {sortable && (
          <span className="ml-2 inline-flex flex-col">
            <svg
              className={cn(
                'h-3 w-3 -mb-1',
                sortDirection === 'asc'
                  ? 'text-gray-900 dark:text-gray-100'
                  : 'text-gray-400'
              )}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" />
            </svg>
            <svg
              className={cn(
                'h-3 w-3 -mt-1',
                sortDirection === 'desc'
                  ? 'text-gray-900 dark:text-gray-100'
                  : 'text-gray-400'
              )}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" />
            </svg>
          </span>
        )}
      </>
    );

    return (
      <th
        ref={ref}
        className={cn(
          'h-12 px-4 text-left align-middle font-medium text-gray-700 dark:text-gray-300',
          '[&:has([role=checkbox])]:pr-0',
          sortable &&
            'cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-700',
          className
        )}
        onClick={sortable ? onSort : undefined}
        {...props}
      >
        {sortable ? (
          <div className="flex items-center">{content}</div>
        ) : (
          children
        )}
      </th>
    );
  }
);

TableHead.displayName = 'TableHead';

/**
 * TableCell Component
 */
export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={cn(
          'p-4 align-middle',
          '[&:has([role=checkbox])]:pr-0',
          className
        )}
        {...props}
      >
        {children}
      </td>
    );
  }
);

TableCell.displayName = 'TableCell';

/**
 * TableCaption Component
 */
export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <caption
      ref={ref}
      className={cn('mt-4 text-gray-600 dark:text-gray-400', className)}
      {...props}
    >
      {children}
    </caption>
  );
});

TableCaption.displayName = 'TableCaption';
