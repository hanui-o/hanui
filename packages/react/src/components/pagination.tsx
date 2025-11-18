'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Pagination Props
 */
export interface PaginationProps {
  /**
   * Current page (1-indexed)
   */
  currentPage: number;

  /**
   * Total number of pages
   */
  totalPages: number;

  /**
   * Callback when page changes
   */
  onPageChange: (page: number) => void;

  /**
   * Number of page buttons to show around current page
   * @default 1
   */
  siblingCount?: number;

  /**
   * Show first/last page buttons
   * @default true
   */
  showFirstLast?: boolean;

  /**
   * Show previous/next buttons
   * @default true
   */
  showPreviousNext?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Custom labels for accessibility
   */
  labels?: {
    first?: string;
    previous?: string;
    next?: string;
    last?: string;
    page?: string;
  };
}

/**
 * Generate pagination range with ellipsis
 */
function generatePaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number = 1
): (number | 'ellipsis')[] {
  const totalPageNumbers = siblingCount + 5; // siblingCount + firstPage + lastPage + currentPage + 2*ellipsis

  if (totalPageNumbers >= totalPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftEllipsis = leftSiblingIndex > 2;
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, 'ellipsis', totalPages];
  }

  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return [firstPageIndex, 'ellipsis', ...rightRange];
  }

  if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [
      firstPageIndex,
      'ellipsis',
      ...middleRange,
      'ellipsis',
      lastPageIndex,
    ];
  }

  return [];
}

/**
 * PaginationButton Component
 */
interface PaginationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  isDisabled?: boolean;
  children: React.ReactNode;
}

const PaginationButton = React.forwardRef<
  HTMLButtonElement,
  PaginationButtonProps
>(({ isActive, isDisabled, className, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      disabled={isDisabled}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'inline-flex items-center justify-center',
        'min-w-[2.5rem] h-10 px-3',
        'text-sm font-medium',
        'rounded-md',
        'transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        isActive
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

PaginationButton.displayName = 'PaginationButton';

/**
 * Pagination Component
 *
 * KRDS-compliant pagination with accessibility and smart ellipsis
 *
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={currentPage}
 *   totalPages={totalPages}
 *   onPageChange={setCurrentPage}
 *   siblingCount={1}
 * />
 * ```
 */
export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      onPageChange,
      siblingCount = 1,
      showFirstLast = true,
      showPreviousNext = true,
      className,
      labels = {},
    },
    ref
  ) => {
    const {
      first = '처음',
      previous = '이전',
      next = '다음',
      last = '마지막',
      page = '페이지',
    } = labels;

    const paginationRange = generatePaginationRange(
      currentPage,
      totalPages,
      siblingCount
    );

    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        onPageChange(page);
      }
    };

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Pagination Navigation"
        className={cn('flex items-center justify-center gap-1', className)}
      >
        {showFirstLast && (
          <PaginationButton
            onClick={() => handlePageChange(1)}
            isDisabled={isFirstPage}
            aria-label={`${first} ${page}`}
          >
            {first}
          </PaginationButton>
        )}

        {showPreviousNext && (
          <PaginationButton
            onClick={() => handlePageChange(currentPage - 1)}
            isDisabled={isFirstPage}
            aria-label={`${previous} ${page}`}
          >
            {previous}
          </PaginationButton>
        )}

        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="inline-flex items-center justify-center w-10 h-10 text-gray-500"
                aria-hidden="true"
              >
                ...
              </span>
            );
          }

          return (
            <PaginationButton
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber as number)}
              isActive={currentPage === pageNumber}
              aria-label={`${page} ${pageNumber}`}
            >
              {pageNumber}
            </PaginationButton>
          );
        })}

        {showPreviousNext && (
          <PaginationButton
            onClick={() => handlePageChange(currentPage + 1)}
            isDisabled={isLastPage}
            aria-label={`${next} ${page}`}
          >
            {next}
          </PaginationButton>
        )}

        {showFirstLast && (
          <PaginationButton
            onClick={() => handlePageChange(totalPages)}
            isDisabled={isLastPage}
            aria-label={`${last} ${page}`}
          >
            {last}
          </PaginationButton>
        )}
      </nav>
    );
  }
);

Pagination.displayName = 'Pagination';
