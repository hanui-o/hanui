'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Table Props
 */
export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  className?: string;
  children: React.ReactNode;
  /**
   * Apply small text size to the table
   */
  small?: boolean;
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
   * Text alignment
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right';
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
  /**
   * Text alignment
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right';
  /**
   * Apply small text size to the cell
   */
  small?: boolean;
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
  ({ className, children, small, ...props }, ref) => {
    return (
      <div className="relative w-full overflow-auto">
        <table
          ref={ref}
          className={cn(
            'w-full caption-bottom border-collapse border-b border-krds-gray-20',
            small && 'text-sm',
            className
          )}
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
 * TableHeader 컴포넌트
 */
export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ className, children, ...props }, ref) => {
  return (
    <thead
      ref={ref}
      className={cn(
        'bg-krds-primary-5',
        '[&_tr]:border-b [&_tr]:border-krds-gray-20',
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
 * TableBody 컴포넌트
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
        '[&_tr]:border-b [&_tr]:border-krds-gray-20',
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
 * TableFooter 컴포넌트
 */
export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  TableFooterProps
>(({ className, children, ...props }, ref) => {
  return (
    <tfoot
      ref={ref}
      className={cn(
        'bg-krds-primary-5',
        'border-t border-krds-gray-20',
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
 * TableRow 컴포넌트
 */
export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn(
          'transition-colors',
          'hover:bg-krds-primary-5',
          'data-[state=selected]:bg-krds-primary-5',
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

const alignmentClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

/**
 * TableHead 컴포넌트
 */
export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  (
    {
      className,
      children,
      align = 'left',
      sortable,
      sortDirection,
      onSort,
      ...props
    },
    ref
  ) => {
    const content = (
      <>
        <span>{children}</span>
        {sortable && (
          <span className="ml-2 inline-flex flex-col">
            <svg
              className={cn(
                'h-3 w-3 -mb-1',
                sortDirection === 'asc'
                  ? 'text-krds-gray-90'
                  : 'text-krds-gray-40'
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
                  ? 'text-krds-gray-90'
                  : 'text-krds-gray-40'
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
          'px-4 py-2 align-middle text-[15px] font-bold text-krds-gray-95',
          alignmentClasses[align],
          '[&:has([role=checkbox])]:pr-0',
          sortable && 'cursor-pointer select-none hover:bg-krds-primary-5',
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
 * TableCell 컴포넌트
 */
export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, children, align = 'left', small, ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={cn(
          'py-2 px-4 align-middle text-krds-gray-70',
          alignmentClasses[align],
          '[&:has([role=checkbox])]:pr-0',
          small && 'text-sm',
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
 * TableCaption 컴포넌트
 */
export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <caption
      ref={ref}
      className={cn('mt-4 text-krds-gray-60', className)}
      {...props}
    >
      {children}
    </caption>
  );
});

TableCaption.displayName = 'TableCaption';

/**
 * TableAccordion Props for Single Type
 */
interface TableAccordionSingleProps {
  className?: string;
  children: React.ReactNode;
  type?: 'single';
  collapsible?: boolean;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

/**
 * TableAccordion Props for Multiple Type
 */
interface TableAccordionMultipleProps {
  className?: string;
  children: React.ReactNode;
  type: 'multiple';
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
}

/**
 * TableAccordion Props
 */
export type TableAccordionProps =
  | TableAccordionSingleProps
  | TableAccordionMultipleProps;

/**
 * TableAccordionItem Props
 */
export interface TableAccordionItemProps {
  className?: string;
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
}

/**
 * TableAccordionTrigger Props
 */
export interface TableAccordionTriggerProps {
  className?: string;
  children: React.ReactNode;
  /**
   * Column span for the trigger row
   */
  colSpan?: number;
}

/**
 * TableAccordionContent Props
 */
export interface TableAccordionContentProps {
  className?: string;
  children: React.ReactNode;
  /**
   * Column span for the content row
   */
  colSpan?: number;
}

/**
 * TableAccordion Component
 *
 * Accordion wrapper for expandable table rows using Radix UI
 *
 * @example
 * ```tsx
 * <Table>
 *   <TableBody>
 *     <TableAccordion type="single" collapsible>
 *       <TableAccordionItem value="item-1">
 *         <TableRow>
 *           <TableAccordionTrigger colSpan={3}>
 *             <TableCell>Main Row Content</TableCell>
 *           </TableAccordionTrigger>
 *         </TableRow>
 *         <TableAccordionContent colSpan={3}>
 *           <TableRow>
 *             <TableCell>Expanded Content</TableCell>
 *           </TableRow>
 *         </TableAccordionContent>
 *       </TableAccordionItem>
 *     </TableAccordion>
 *   </TableBody>
 * </Table>
 * ```
 */
export const TableAccordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  TableAccordionProps
>((props, ref) => {
  const { className, children, type = 'single' } = props;

  if (type === 'multiple') {
    const { defaultValue, value, onValueChange } =
      props as TableAccordionMultipleProps;
    return (
      <AccordionPrimitive.Root
        ref={ref}
        type="multiple"
        className={cn(className)}
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
      >
        {children}
      </AccordionPrimitive.Root>
    );
  }

  const { collapsible, defaultValue, value, onValueChange } =
    props as TableAccordionSingleProps;
  return (
    <AccordionPrimitive.Root
      ref={ref}
      type="single"
      collapsible={collapsible}
      className={cn(className)}
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
    >
      {children}
    </AccordionPrimitive.Root>
  );
});

TableAccordion.displayName = 'TableAccordion';

/**
 * TableAccordionItem Component
 *
 * Wrapper for each expandable row group
 */
export const TableAccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  TableAccordionItemProps
>(({ className, ...props }, ref) => {
  return (
    <AccordionPrimitive.Item ref={ref} className={cn(className)} {...props} />
  );
});

TableAccordionItem.displayName = 'TableAccordionItem';

/**
 * TableAccordionTrigger Component
 *
 * Trigger row that expands/collapses content.
 * Must be used within a TableRow component.
 */
export const TableAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  TableAccordionTriggerProps
>(({ className, children, colSpan, ...props }, ref) => {
  return (
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'group flex w-full items-center justify-between',
        'transition-colors',
        className
      )}
      asChild
      {...props}
    >
      <td colSpan={colSpan} className="p-0">
        <div className="flex w-full items-center px-4 py-2">
          <div className="flex-1">{children}</div>
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </div>
      </td>
    </AccordionPrimitive.Trigger>
  );
});

TableAccordionTrigger.displayName = 'TableAccordionTrigger';

/**
 * TableAccordionContent 컴포넌트
 *
 * 트리거 클릭 시 펼쳐지는 콘텐츠 영역입니다.
 * TableRow 컴포넌트 내부에서 사용합니다.
 */
export const TableAccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  TableAccordionContentProps
>(({ className, children, colSpan, ...props }, ref) => {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        'overflow-hidden',
        'transition-all',
        'data-[state=closed]:animate-accordion-up',
        'data-[state=open]:animate-accordion-down'
      )}
      asChild
      {...props}
    >
      <tr>
        <td colSpan={colSpan} className={cn('p-0', className)}>
          <div className="px-4 py-2 bg-krds-primary-5">{children}</div>
        </td>
      </tr>
    </AccordionPrimitive.Content>
  );
});

TableAccordionContent.displayName = 'TableAccordionContent';
