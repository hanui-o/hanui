'use client';

import * as React from 'react';
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PaginationProps {
  // Pagination Props
  variant?: 'default' | 'direct-input' | 'load-more'; // 페이지네이션 타입 (기본값: default)
  currentPage: number; // 현재 페이지 (1부터 시작)
  totalPages: number; // 전체 페이지 수
  onPageChange: (page: number) => void; // 페이지 변경 콜백
  siblingCount?: number; // 현재 페이지 양쪽에 표시할 페이지 수 (기본값: 1)
  showFirstLast?: boolean; // 처음/마지막 버튼 표시 여부 (기본값: true)
  showPreviousNext?: boolean; // 이전/다음 버튼 표시 여부 (기본값: true)
  className?: string; // 추가 CSS 클래스
  labels?: {
    // 접근성 레이블 커스터마이징
    first?: string;
    previous?: string;
    next?: string;
    last?: string;
    page?: string;
    goTo?: string;
    loadMore?: string;
    invalidInput?: string; // 잘못된 입력 에러 메시지
    loading?: string; // 로딩 중 메시지
  };
  onLoadMore?: () => void; // load-more variant용 로드 콜백
  hasMore?: boolean; // load-more variant용 더 보기 가능 여부
  isLoading?: boolean; // load-more variant용 로딩 상태
}

function generatePaginationRange( // 페이지 범위 생성 (생략 부호 포함)
  currentPage: number,
  totalPages: number,
  siblingCount: number = 1
): (number | 'ellipsis')[] {
  const totalPageNumbers = siblingCount + 5; // siblingCount + firstPage + lastPage + currentPage + 2*ellipsis

  if (totalPageNumbers >= totalPages) {
    // 페이지 수가 적으면 모두 표시
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftEllipsis = leftSiblingIndex > 2;
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    // 왼쪽 생략 부호 없음
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, 'ellipsis', totalPages];
  }

  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    // 오른쪽 생략 부호 없음
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return [firstPageIndex, 'ellipsis', ...rightRange];
  }

  if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    // 양쪽 생략 부호
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

interface PaginationButtonProps // PaginationButton Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean; // 활성 페이지 여부
  isDisabled?: boolean; // 비활성화 여부
  children: React.ReactNode;
}

const PaginationButton = React.forwardRef<
  // 페이지네이션 버튼 컴포넌트
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
        'font-medium',
        'rounded-md',
        'transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-50 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        isActive
          ? 'bg-krds-secondary-70 text-krds-white hover:bg-krds-secondary-60'
          : 'bg-krds-white text-krds-gray-90 hover:bg-krds-gray-5',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

PaginationButton.displayName = 'PaginationButton';

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>( // KRDS 페이지네이션 컴포넌트 (접근성, 스마트 생략 부호)
  (
    {
      variant = 'default',
      currentPage,
      totalPages,
      onPageChange,
      siblingCount = 1,
      showFirstLast = true,
      showPreviousNext = true,
      className,
      labels = {},
      onLoadMore,
      hasMore = true,
      isLoading = false,
    },
    ref
  ) => {
    const {
      first = '처음',
      previous = '이전',
      next = '다음',
      last = '마지막',
      page = '페이지',
      goTo = '이동',
      loadMore = '더 보기',
      invalidInput = '유효하지 않은 페이지 번호입니다',
      loading = '콘텐츠를 불러오는 중',
    } = labels;

    const [directInputValue, setDirectInputValue] = React.useState(''); // direct-input variant용 입력 값
    const [inputError, setInputError] = React.useState(''); // direct-input variant용 에러 메시지
    const [announceMessage, setAnnounceMessage] = React.useState(''); // 스크린 리더 알림 메시지

    const paginationRange = generatePaginationRange(
      currentPage,
      totalPages,
      siblingCount
    );

    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        onPageChange(page);
        setAnnounceMessage(`${page} ${page}로 이동했습니다`); // 스크린 리더 알림
      }
    };

    const handleDirectInput = () => {
      // direct-input: 직접 입력한 페이지로 이동
      const pageNum = parseInt(directInputValue, 10);

      if (!directInputValue.trim()) {
        // 빈 입력값
        setInputError('');
        return;
      }

      if (isNaN(pageNum) || pageNum < 1 || pageNum > totalPages) {
        // 유효하지 않은 입력
        setInputError(invalidInput);
        setAnnounceMessage(invalidInput);
        return;
      }

      // 유효한 입력: 페이지 이동
      setInputError('');
      handlePageChange(pageNum);
      setDirectInputValue('');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // 입력값 변경 시 에러 초기화
      setDirectInputValue(e.target.value);
      if (inputError) {
        setInputError('');
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Enter 키로 이동
      if (e.key === 'Enter') {
        handleDirectInput();
      }
    };

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    // load-more variant: 더 보기 버튼만 표시
    if (variant === 'load-more') {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          className={cn('flex flex-col items-center gap-2', className)}
        >
          <button
            type="button"
            onClick={onLoadMore}
            disabled={!hasMore || isLoading}
            aria-busy={isLoading}
            className={cn(
              'inline-flex items-center justify-center gap-2',
              'px-6 h-12',
              'font-medium',
              'rounded-md',
              'transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-50 focus-visible:ring-offset-2',
              'disabled:pointer-events-none disabled:opacity-50',
              'bg-krds-white text-krds-gray-90 border border-krds-gray-30 hover:bg-krds-gray-5'
            )}
            aria-label={`${loadMore} (${currentPage}/${totalPages})`}
          >
            <span>{isLoading ? loading : loadMore}</span>
            <span className="text-krds-gray-60">
              ({currentPage}/{totalPages})
            </span>
          </button>
          {/* 스크린 리더용 aria-live 영역 */}
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          >
            {announceMessage}
          </div>
        </div>
      );
    }

    // direct-input variant: 페이지 번호 입력 + 이동 버튼
    if (variant === 'direct-input') {
      const inputId = 'pagination-input';
      const errorId = 'pagination-error';
      const helperId = 'pagination-helper';

      return (
        <nav
          ref={ref}
          role="navigation"
          aria-label="Pagination Navigation"
          className={cn('flex flex-col items-center gap-2', className)}
        >
          <div className="flex items-center gap-1">
            {showFirstLast && (
              <PaginationButton
                onClick={() => handlePageChange(1)}
                isDisabled={isFirstPage}
                aria-label={`${first} ${page}`}
              >
                <ChevronsLeft className="w-4 h-4 mr-1" />
                {first}
              </PaginationButton>
            )}

            {showPreviousNext && (
              <PaginationButton
                onClick={() => handlePageChange(currentPage - 1)}
                isDisabled={isFirstPage}
                aria-label={`${previous} ${page}`}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                {previous}
              </PaginationButton>
            )}

            <div className="flex items-center gap-2 mx-2">
              <div className="relative">
                <input
                  id={inputId}
                  type="number"
                  min={1}
                  max={totalPages}
                  value={directInputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder={String(currentPage)}
                  aria-label={`${page} 번호 입력`}
                  aria-describedby={`${helperId} ${inputError ? errorId : ''}`}
                  aria-invalid={!!inputError}
                  className={cn(
                    'w-16 h-10 px-3',
                    'text-center font-medium',
                    'rounded-md',
                    'border',
                    inputError
                      ? 'border-krds-red-50 focus-visible:ring-krds-red-50'
                      : 'border-krds-gray-30 focus-visible:ring-krds-primary-50',
                    'bg-krds-white text-krds-gray-90',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    'placeholder:text-krds-gray-50'
                  )}
                />
                {/* 현재 페이지 정보 (스크린 리더용) */}
                <span id={helperId} className="sr-only">
                  현재 {page} {currentPage}, 전체 {totalPages} {page}
                </span>
              </div>
              <span className="text-krds-gray-60">/ {totalPages}</span>
              <PaginationButton onClick={handleDirectInput} aria-label={goTo}>
                {goTo}
              </PaginationButton>
            </div>

            {showPreviousNext && (
              <PaginationButton
                onClick={() => handlePageChange(currentPage + 1)}
                isDisabled={isLastPage}
                aria-label={`${next} ${page}`}
              >
                {next}
                <ChevronRight className="w-4 h-4 ml-1" />
              </PaginationButton>
            )}

            {showFirstLast && (
              <PaginationButton
                onClick={() => handlePageChange(totalPages)}
                isDisabled={isLastPage}
                aria-label={`${last} ${page}`}
              >
                {last}
                <ChevronsRight className="w-4 h-4 ml-1" />
              </PaginationButton>
            )}
          </div>

          {/* 에러 메시지 (시각적 + 스크린 리더) */}
          {inputError && (
            <div
              id={errorId}
              role="alert"
              aria-live="assertive"
              className="text-krds-red-50 text-sm"
            >
              {inputError}
            </div>
          )}

          {/* 스크린 리더용 aria-live 영역 */}
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          >
            {announceMessage}
          </div>
        </nav>
      );
    }

    // default variant: 기본 페이지네이션
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn('flex flex-col items-center gap-2', className)}
      >
        <nav
          role="navigation"
          aria-label="Pagination Navigation"
          className="flex items-center justify-center gap-1"
        >
          {showFirstLast && (
            <PaginationButton
              onClick={() => handlePageChange(1)}
              isDisabled={isFirstPage}
              aria-label={`${first} ${page}`}
            >
              <ChevronsLeft className="w-4 h-4 mr-1" />
              {first}
            </PaginationButton>
          )}

          {showPreviousNext && (
            <PaginationButton
              onClick={() => handlePageChange(currentPage - 1)}
              isDisabled={isFirstPage}
              aria-label={`${previous} ${page}`}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {previous}
            </PaginationButton>
          )}

          {paginationRange.map((pageNumber, index) => {
            if (pageNumber === 'ellipsis') {
              // 생략 부호 (...)
              const prevPage = index > 0 ? paginationRange[index - 1] : 0; // 고유 key 생성용
              return (
                <span
                  key={`ellipsis-${prevPage}`}
                  className="inline-flex items-center justify-center w-10 h-10 text-krds-gray-60"
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
              <ChevronRight className="w-4 h-4 ml-1" />
            </PaginationButton>
          )}

          {showFirstLast && (
            <PaginationButton
              onClick={() => handlePageChange(totalPages)}
              isDisabled={isLastPage}
              aria-label={`${last} ${page}`}
            >
              {last}
              <ChevronsRight className="w-4 h-4 ml-1" />
            </PaginationButton>
          )}
        </nav>

        {/* 스크린 리더용 aria-live 영역 */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {announceMessage}
        </div>
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';
