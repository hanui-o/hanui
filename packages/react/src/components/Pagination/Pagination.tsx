import * as React from 'react';
import { cn } from '../../lib/utils';

export interface PaginationProps {
  /**
   * Current active page (1-indexed)
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
   * Number of page buttons to show
   * @default 5
   */
  siblingCount?: number;

  /**
   * Additional className
   */
  className?: string;
}

/**
 * Generate page numbers with ellipsis
 */
function generatePageNumbers(
  currentPage: number,
  totalPages: number,
  siblingCount: number = 1
): (number | string)[] {
  const totalNumbers = siblingCount * 2 + 3; // siblings + current + first + last
  const totalBlocks = totalNumbers + 2; // + 2 ellipsis

  if (totalPages <= totalBlocks) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftEllipsis = leftSiblingIndex > 2;
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, '...', totalPages];
  }

  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return [1, '...', ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i
  );
  return [1, '...', ...middleRange, '...', totalPages];
}

/**
 * Pagination Component (페이지네이션)
 *
 * **Foundation Layer Features:**
 * - Semantic HTML: nav element with proper ARIA attributes
 * - WCAG 2.1 / KWCAG 2.2 Compliance: Keyboard navigation and focus management
 * - Screen Reader Support: aria-label and aria-current attributes
 * - Visual Hierarchy: Clear active state and disabled states
 * - Dark Mode: Automatic dark mode support with optimized colors
 *
 * **Design Principles:**
 * - Clear current page indication
 * - Smart ellipsis for many pages
 * - Keyboard accessible navigation
 * - Responsive button sizing (minimum 40px touch target)
 *
 * @example
 * ```tsx
 * const [page, setPage] = useState(1);
 *
 * <Pagination
 *   currentPage={page}
 *   totalPages={10}
 *   onPageChange={setPage}
 * />
 * ```
 */
export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    { currentPage, totalPages, onPageChange, siblingCount = 1, className },
    ref
  ) => {
    const pages = generatePageNumbers(currentPage, totalPages, siblingCount);

    const handlePrevious = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };

    const handleNext = () => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };

    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLButtonElement>,
      action: () => void
    ) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        action();
      }
    };

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="pagination"
        className={cn('flex items-center justify-center gap-1', className)}
      >
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          onKeyDown={(e) => handleKeyDown(e, handlePrevious)}
          disabled={currentPage === 1}
          className={cn(
            'inline-flex h-10 min-w-[80px] items-center justify-center rounded-md px-3',
            'font-medium transition-colors',
            'text-gray-900 dark:text-gray-100',
            'hover:bg-gray-100 dark:hover:bg-gray-800',
            'focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-blue-600 dark:focus-visible:ring-blue-400',
            'disabled:pointer-events-none disabled:opacity-50'
          )}
          aria-label="Go to previous page"
        >
          ← 이전
        </button>

        {/* Page Numbers */}
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className={cn(
                  'inline-flex h-10 w-10 items-center justify-center',
                  'text-gray-600 dark:text-gray-400'
                )}
                aria-hidden="true"
              >
                ...
              </span>
            );
          }

          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;

          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              onKeyDown={(e) =>
                handleKeyDown(e, () => onPageChange(pageNumber))
              }
              aria-current={isActive ? 'page' : undefined}
              disabled={isActive}
              className={cn(
                'inline-flex h-10 w-10 items-center justify-center rounded-md',
                'font-medium transition-colors',
                !isActive && [
                  'text-gray-900 dark:text-gray-100',
                  'hover:bg-gray-100 dark:hover:bg-gray-800',
                  'focus-visible:outline-none focus-visible:ring-2',
                  'focus-visible:ring-blue-600 dark:focus-visible:ring-blue-400',
                ],
                isActive && [
                  'bg-blue-600 dark:bg-blue-500',
                  'text-white',
                  'cursor-default',
                ]
              )}
              aria-label={
                isActive
                  ? `Current page, page ${pageNumber}`
                  : `Go to page ${pageNumber}`
              }
            >
              {pageNumber}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          onClick={handleNext}
          onKeyDown={(e) => handleKeyDown(e, handleNext)}
          disabled={currentPage === totalPages}
          className={cn(
            'inline-flex h-10 min-w-[80px] items-center justify-center rounded-md px-3',
            'font-medium transition-colors',
            'text-gray-900 dark:text-gray-100',
            'hover:bg-gray-100 dark:hover:bg-gray-800',
            'focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-blue-600 dark:focus-visible:ring-blue-400',
            'disabled:pointer-events-none disabled:opacity-50'
          )}
          aria-label="Go to next page"
        >
          다음 →
        </button>
      </nav>
    );
  }
);
Pagination.displayName = 'Pagination';
