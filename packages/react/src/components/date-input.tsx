'use client';

import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

// ============================================================================
// Date Input 컴포넌트
// KRDS 날짜 입력 필드 - 특정 날짜 또는 기간을 입력하거나 선택
// ============================================================================

// 개별 입력 필드 스타일
const dateFieldVariants = cva(
  // 기본 스타일
  [
    'calendar-input',
    'flex-1',
    'h-10',
    'rounded-md',
    'border',
    'border-krds-gray-30',
    'bg-white',
    'px-3',
    'text-sm',
    'text-krds-gray-90',
    'placeholder:text-krds-gray-50',
    'transition-colors',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-krds-primary-base',
    'focus:border-krds-primary-base',
    'disabled:cursor-not-allowed',
    'disabled:opacity-50',
    'disabled:bg-krds-gray-10',
  ],
  {
    variants: {
      // 에러 상태
      hasError: {
        true: 'border-krds-functional-error focus:ring-krds-functional-error focus:border-krds-functional-error',
        false: '',
      },
    },
    defaultVariants: {
      hasError: false,
    },
  }
);

// ============================================================================
// DateInput Props (단일 필드)
// ============================================================================

export interface DateInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'value' | 'onChange'
  > {
  /** 값 */
  value?: string;
  /** 값 변경 핸들러 */
  onChange?: (value: string) => void;
  /** 에러 상태 */
  hasError?: boolean;
  /** 달력 아이콘 버튼 표시 */
  showCalendarButton?: boolean;
  /** 달력 버튼 클릭 핸들러 */
  onCalendarClick?: () => void;
}

// ============================================================================
// DateInputMultiple Props (다중 필드)
// ============================================================================

export interface DateInputMultipleProps {
  /** 년도 값 */
  year?: string;
  /** 월 값 */
  month?: string;
  /** 일 값 */
  day?: string;
  /** 년도 변경 핸들러 */
  onYearChange?: (value: string) => void;
  /** 월 변경 핸들러 */
  onMonthChange?: (value: string) => void;
  /** 일 변경 핸들러 */
  onDayChange?: (value: string) => void;
  /** 에러 상태 */
  hasError?: boolean;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 년도 필드 숨김 */
  hideYear?: boolean;
  /** 일 필드 숨김 */
  hideDay?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

// ============================================================================
// DateInputRange Props (범위 필드)
// ============================================================================

export interface DateInputRangeProps {
  /** 시작일 값 */
  startDate?: string;
  /** 종료일 값 */
  endDate?: string;
  /** 시작일 변경 핸들러 */
  onStartDateChange?: (value: string) => void;
  /** 종료일 변경 핸들러 */
  onEndDateChange?: (value: string) => void;
  /** 에러 상태 */
  hasError?: boolean;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 시작일 플레이스홀더 */
  startPlaceholder?: string;
  /** 종료일 플레이스홀더 */
  endPlaceholder?: string;
  /** 달력 버튼 표시 */
  showCalendarButton?: boolean;
  /** 시작일 달력 클릭 핸들러 */
  onStartCalendarClick?: () => void;
  /** 종료일 달력 클릭 핸들러 */
  onEndCalendarClick?: () => void;
  /** 추가 CSS 클래스 */
  className?: string;
}

// ============================================================================
// 아이콘 컴포넌트
// ============================================================================

// 달력 아이콘
const CalendarIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
    />
  </svg>
);

// ============================================================================
// DateInput 컴포넌트 (단일 필드)
// ============================================================================

export const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  (
    {
      className,
      value,
      onChange,
      hasError = false,
      showCalendarButton = false,
      onCalendarClick,
      placeholder = 'YYYY-MM-DD',
      disabled,
      ...props
    },
    ref
  ) => {
    // 값 변경 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    return (
      <div className={cn('form-group relative flex items-center', className)}>
        <input
          ref={ref}
          type="text"
          inputMode="numeric"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            dateFieldVariants({ hasError }),
            showCalendarButton && 'pr-10'
          )}
          {...props}
        />

        {/* 달력 아이콘 버튼 */}
        {showCalendarButton && (
          <button
            type="button"
            className="form-btn-datepicker absolute right-3 text-krds-gray-50 hover:text-krds-gray-70 transition-colors disabled:opacity-50"
            onClick={onCalendarClick}
            disabled={disabled}
            aria-label="달력 열기"
          >
            <CalendarIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    );
  }
);

DateInput.displayName = 'DateInput';

// ============================================================================
// DateInputMultiple 컴포넌트 (다중 필드)
// ============================================================================

export const DateInputMultiple = React.forwardRef<
  HTMLDivElement,
  DateInputMultipleProps
>(
  (
    {
      className,
      year,
      month,
      day,
      onYearChange,
      onMonthChange,
      onDayChange,
      hasError = false,
      disabled = false,
      hideYear = false,
      hideDay = false,
    },
    ref
  ) => {
    // 년도 입력 핸들러 (4자리 숫자만)
    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/\D/g, '').slice(0, 4);
      onYearChange?.(value);
    };

    // 월 입력 핸들러 (1-12)
    const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/\D/g, '').slice(0, 2);
      const numValue = parseInt(value, 10);
      if (value === '' || (numValue >= 0 && numValue <= 12)) {
        onMonthChange?.(value);
      }
    };

    // 일 입력 핸들러 (1-31)
    const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/\D/g, '').slice(0, 2);
      const numValue = parseInt(value, 10);
      if (value === '' || (numValue >= 0 && numValue <= 31)) {
        onDayChange?.(value);
      }
    };

    return (
      <div
        ref={ref}
        className={cn('form-group flex items-center gap-2', className)}
      >
        {/* 년도 필드 */}
        {!hideYear && (
          <div className="flex items-center gap-1">
            <input
              type="text"
              inputMode="numeric"
              value={year}
              onChange={handleYearChange}
              placeholder="YYYY"
              disabled={disabled}
              className={cn(
                dateFieldVariants({ hasError }),
                'w-20 text-center'
              )}
              aria-label="년도"
              maxLength={4}
            />
            <span className="text-sm text-krds-gray-70">년</span>
          </div>
        )}

        {/* 월 필드 */}
        <div className="flex items-center gap-1">
          <input
            type="text"
            inputMode="numeric"
            value={month}
            onChange={handleMonthChange}
            placeholder="MM"
            disabled={disabled}
            className={cn(dateFieldVariants({ hasError }), 'w-14 text-center')}
            aria-label="월"
            maxLength={2}
          />
          <span className="text-sm text-krds-gray-70">월</span>
        </div>

        {/* 일 필드 */}
        {!hideDay && (
          <div className="flex items-center gap-1">
            <input
              type="text"
              inputMode="numeric"
              value={day}
              onChange={handleDayChange}
              placeholder="DD"
              disabled={disabled}
              className={cn(
                dateFieldVariants({ hasError }),
                'w-14 text-center'
              )}
              aria-label="일"
              maxLength={2}
            />
            <span className="text-sm text-krds-gray-70">일</span>
          </div>
        )}
      </div>
    );
  }
);

DateInputMultiple.displayName = 'DateInputMultiple';

// ============================================================================
// DateInputRange 컴포넌트 (범위 필드)
// ============================================================================

export const DateInputRange = React.forwardRef<
  HTMLDivElement,
  DateInputRangeProps
>(
  (
    {
      className,
      startDate,
      endDate,
      onStartDateChange,
      onEndDateChange,
      hasError = false,
      disabled = false,
      startPlaceholder = 'YYYY-MM-DD',
      endPlaceholder = 'YYYY-MM-DD',
      showCalendarButton = false,
      onStartCalendarClick,
      onEndCalendarClick,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('form-group flex items-center gap-2', className)}
      >
        {/* 시작일 */}
        <div className="relative flex-1">
          <input
            type="text"
            inputMode="numeric"
            value={startDate}
            onChange={(e) => onStartDateChange?.(e.target.value)}
            placeholder={startPlaceholder}
            disabled={disabled}
            className={cn(
              dateFieldVariants({ hasError }),
              'w-full',
              showCalendarButton && 'pr-10'
            )}
            aria-label="시작일"
          />
          {showCalendarButton && (
            <button
              type="button"
              className="form-btn-datepicker absolute right-3 top-1/2 -translate-y-1/2 text-krds-gray-50 hover:text-krds-gray-70 transition-colors disabled:opacity-50"
              onClick={onStartCalendarClick}
              disabled={disabled}
              aria-label="시작일 달력 열기"
            >
              <CalendarIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* 구분자 */}
        <span className="text-sm text-krds-gray-70 shrink-0">~</span>

        {/* 종료일 */}
        <div className="relative flex-1">
          <input
            type="text"
            inputMode="numeric"
            value={endDate}
            onChange={(e) => onEndDateChange?.(e.target.value)}
            placeholder={endPlaceholder}
            disabled={disabled}
            className={cn(
              dateFieldVariants({ hasError }),
              'w-full',
              showCalendarButton && 'pr-10'
            )}
            aria-label="종료일"
          />
          {showCalendarButton && (
            <button
              type="button"
              className="form-btn-datepicker absolute right-3 top-1/2 -translate-y-1/2 text-krds-gray-50 hover:text-krds-gray-70 transition-colors disabled:opacity-50"
              onClick={onEndCalendarClick}
              disabled={disabled}
              aria-label="종료일 달력 열기"
            >
              <CalendarIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

DateInputRange.displayName = 'DateInputRange';

// Variants export
export { dateFieldVariants };
