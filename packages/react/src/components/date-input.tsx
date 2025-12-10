'use client';

import * as React from 'react';
import { cva } from 'class-variance-authority';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { CalendarDays, CircleX } from 'lucide-react';
import { cn } from '../lib/utils';
import { Calendar } from './calendar';

// ============================================================================
// Date Input 컴포넌트
// KRDS 날짜 입력 필드 - 특정 날짜 또는 기간을 입력하거나 선택
// ============================================================================

// 날짜 문자열 파싱 (YYYY-MM-DD -> Date)
function parseDate(dateString: string | undefined): Date | null {
  if (!dateString) return null;
  const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  const [, year, month, day] = match;
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  if (isNaN(date.getTime())) return null;
  return date;
}

// 날짜 포맷팅 (Date -> YYYY-MM-DD)
function formatDate(date: Date | null): string {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 개별 입력 필드 스타일
const dateFieldVariants = cva(
  // 기본 스타일
  [
    'calendar-input',
    'flex-1',
    'h-14',
    'rounded-lg',
    'border',
    'border-krds-gray-60',
    'bg-white',
    'pl-4',
    'text-krds-body-md',
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
      // 달력 버튼 유무에 따른 오른쪽 패딩
      showCalendarButton: {
        true: 'pr-12',
        false: 'pr-4',
      },
    },
    defaultVariants: {
      hasError: false,
      showCalendarButton: false,
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
  /** 라벨 텍스트 */
  label?: string;
  /** 도움말 텍스트 */
  helperText?: string;
  /** 에러 메시지 (hasError가 true일 때 helperText 대신 표시) */
  errorMessage?: string;
  /** 필수 입력 여부 (* 표시) */
  required?: boolean;
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
  /** 라벨 텍스트 */
  label?: string;
  /** 도움말 텍스트 */
  helperText?: string;
  /** 에러 메시지 (hasError가 true일 때 helperText 대신 표시) */
  errorMessage?: string;
  /** 필수 입력 여부 (* 표시) */
  required?: boolean;
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
  /** 라벨 텍스트 */
  label?: string;
  /** 도움말 텍스트 */
  helperText?: string;
  /** 에러 메시지 (hasError가 true일 때 helperText 대신 표시) */
  errorMessage?: string;
  /** 필수 입력 여부 (* 표시) */
  required?: boolean;
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
// DateInput 컴포넌트 (단일 필드)
// ============================================================================

export const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  (
    {
      className,
      value,
      onChange,
      label,
      helperText,
      errorMessage,
      required = false,
      hasError = false,
      showCalendarButton = false,
      onCalendarClick,
      placeholder = 'YYYY-MM-DD',
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    // 고유 ID 생성
    const uniqueId = React.useId();
    const inputId = id || uniqueId;

    // 달력 팝오버 열림 상태
    const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);

    // 값 변경 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    // 달력에서 날짜 선택 시
    const handleDateSelect = (date: Date | null) => {
      if (date) {
        onChange?.(formatDate(date));
      }
    };

    // 달력 버튼 클릭 핸들러
    const handleCalendarButtonClick = () => {
      if (onCalendarClick) {
        // 외부 핸들러가 있으면 외부에서 처리
        onCalendarClick();
      } else {
        // 내장 달력 열기
        setIsCalendarOpen(true);
      }
    };

    // 달력 확인 버튼
    const handleCalendarConfirm = () => {
      setIsCalendarOpen(false);
    };

    // 달력 취소 버튼
    const handleCalendarCancel = () => {
      setIsCalendarOpen(false);
    };

    // aria-describedby에 사용할 ID들
    const helperTextId = helperText ? `${inputId}-helper` : undefined;
    const errorId = hasError && errorMessage ? `${inputId}-error` : undefined;
    const describedBy =
      [helperTextId, errorId].filter(Boolean).join(' ') || undefined;

    // 현재 값을 Date로 파싱
    const dateValue = parseDate(value);

    return (
      <div className={cn('form-group', className)}>
        {/* 라벨 */}
        {label && (
          <label
            htmlFor={inputId}
            className="form-tit block font-medium text-krds-gray-70 mb-2"
          >
            {label}
            {required && (
              <span className="text-krds-functional-error ml-0.5">*</span>
            )}
          </label>
        )}

        {/* 도움말 (입력 필드 위) */}
        {helperText && (
          <p
            id={helperTextId}
            className="form-hint text-krds-body-sm text-krds-gray-60 mb-2"
          >
            {helperText}
          </p>
        )}

        {/* 입력 필드 영역 */}
        <PopoverPrimitive.Root
          open={isCalendarOpen}
          onOpenChange={setIsCalendarOpen}
        >
          <PopoverPrimitive.Anchor asChild>
            <div className="relative flex items-center">
              <input
                ref={ref}
                id={inputId}
                type="text"
                inputMode="numeric"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                disabled={disabled}
                aria-describedby={describedBy}
                aria-invalid={hasError ? 'true' : undefined}
                aria-required={required ? 'true' : undefined}
                className={cn(
                  dateFieldVariants({ hasError, showCalendarButton })
                )}
                {...props}
              />

              {/* 달력 아이콘 버튼 */}
              {showCalendarButton && (
                <PopoverPrimitive.Trigger asChild>
                  <button
                    type="button"
                    className="form-btn-datepicker absolute right-3 text-krds-gray-50 hover:text-krds-gray-70 transition-colors disabled:opacity-50"
                    onClick={handleCalendarButtonClick}
                    disabled={disabled}
                    aria-label="달력 열기"
                  >
                    <CalendarDays className="w-5 h-5" aria-hidden="true" />
                  </button>
                </PopoverPrimitive.Trigger>
              )}
            </div>
          </PopoverPrimitive.Anchor>

          {/* 달력 팝오버 */}
          {!onCalendarClick && (
            <PopoverPrimitive.Portal>
              <PopoverPrimitive.Content
                role="dialog"
                aria-label="날짜 선택"
                aria-modal="true"
                className={cn(
                  'z-50',
                  'data-[state=open]:animate-in data-[state=closed]:animate-out',
                  'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                  'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                  'data-[side=bottom]:slide-in-from-top-2',
                  'data-[side=top]:slide-in-from-bottom-2'
                )}
                side="top"
                sideOffset={4}
                align="start"
              >
                <Calendar
                  mode="single"
                  value={dateValue}
                  onChange={handleDateSelect}
                  onConfirm={handleCalendarConfirm}
                  onCancel={handleCalendarCancel}
                  showTodayButton
                  showFooterActions
                />
              </PopoverPrimitive.Content>
            </PopoverPrimitive.Portal>
          )}
        </PopoverPrimitive.Root>

        {/* 에러 메시지 (입력 필드 아래) */}
        {hasError && errorMessage && (
          <p
            id={errorId}
            className="form-hint flex items-center gap-1 text-sm text-krds-danger mt-2"
          >
            <CircleX className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            {errorMessage}
          </p>
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
      label,
      helperText,
      errorMessage,
      required = false,
      hasError = false,
      disabled = false,
      hideYear = false,
      hideDay = false,
    },
    ref
  ) => {
    // 고유 ID 생성
    const uniqueId = React.useId();
    const labelId = `${uniqueId}-label`;
    const helperTextId = helperText ? `${uniqueId}-helper` : undefined;
    const errorId = hasError && errorMessage ? `${uniqueId}-error` : undefined;
    const describedBy =
      [helperTextId, errorId].filter(Boolean).join(' ') || undefined;

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
      <div ref={ref} className={cn('form-group', className)}>
        {/* 라벨 */}
        {label && (
          <label
            id={labelId}
            className="form-tit block text-sm font-medium text-krds-gray-90 mb-2"
          >
            {label}
            {required && (
              <span className="text-krds-functional-error ml-0.5">*</span>
            )}
          </label>
        )}

        {/* 도움말 (입력 필드 위) */}
        {helperText && (
          <p
            id={helperTextId}
            className="form-hint text-sm text-krds-gray-60 mb-2"
          >
            {helperText}
          </p>
        )}

        {/* 입력 필드 그룹 */}
        <div
          role="group"
          aria-labelledby={label ? labelId : undefined}
          aria-describedby={describedBy}
          className="flex items-center gap-2"
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
                aria-invalid={hasError ? 'true' : undefined}
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
              aria-invalid={hasError ? 'true' : undefined}
              className={cn(
                dateFieldVariants({ hasError }),
                'w-16 text-center'
              )}
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
                aria-invalid={hasError ? 'true' : undefined}
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

        {/* 에러 메시지 (입력 필드 아래) */}
        {hasError && errorMessage && (
          <p
            id={errorId}
            className="form-hint flex items-center gap-1 text-sm text-krds-danger mt-2"
          >
            <CircleX className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            {errorMessage}
          </p>
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
      label,
      helperText,
      errorMessage,
      required = false,
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
    // 고유 ID 생성
    const uniqueId = React.useId();
    const labelId = `${uniqueId}-label`;
    const helperTextId = helperText ? `${uniqueId}-helper` : undefined;
    const errorId = hasError && errorMessage ? `${uniqueId}-error` : undefined;
    const describedBy =
      [helperTextId, errorId].filter(Boolean).join(' ') || undefined;

    // 달력 팝오버 열림 상태
    const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);

    // 현재 값을 Date로 파싱
    const startDateValue = parseDate(startDate);
    const endDateValue = parseDate(endDate);

    // 달력에서 범위 선택 시
    const handleRangeChange = (range: {
      start: Date | null;
      end: Date | null;
    }) => {
      if (range.start) {
        onStartDateChange?.(formatDate(range.start));
      }
      if (range.end) {
        onEndDateChange?.(formatDate(range.end));
      }
    };

    // 달력 확인 버튼
    const handleCalendarConfirm = () => {
      setIsCalendarOpen(false);
    };

    // 달력 취소 버튼
    const handleCalendarCancel = () => {
      setIsCalendarOpen(false);
    };

    // 외부 핸들러 있는지 체크
    const hasExternalHandler = onStartCalendarClick || onEndCalendarClick;

    return (
      <div ref={ref} className={cn('form-group', className)}>
        {/* 라벨 */}
        {label && (
          <label
            id={labelId}
            className="form-tit block text-sm font-medium text-krds-gray-90 mb-2"
          >
            {label}
            {required && (
              <span className="text-krds-functional-error ml-0.5">*</span>
            )}
          </label>
        )}

        {/* 도움말 (입력 필드 위) */}
        {helperText && (
          <p
            id={helperTextId}
            className="form-hint text-sm text-krds-gray-60 mb-2"
          >
            {helperText}
          </p>
        )}

        {/* 입력 필드 그룹 */}
        <PopoverPrimitive.Root
          open={isCalendarOpen}
          onOpenChange={setIsCalendarOpen}
        >
          <PopoverPrimitive.Anchor asChild>
            <div
              role="group"
              aria-labelledby={label ? labelId : undefined}
              aria-describedby={describedBy}
              className="flex items-center gap-2"
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
                  aria-invalid={hasError ? 'true' : undefined}
                  className={cn(
                    dateFieldVariants({ hasError, showCalendarButton }),
                    'w-full'
                  )}
                  aria-label="시작일"
                />
                {showCalendarButton && (
                  <PopoverPrimitive.Trigger asChild>
                    <button
                      type="button"
                      className="form-btn-datepicker absolute right-3 top-1/2 -translate-y-1/2 text-krds-gray-50 hover:text-krds-gray-70 transition-colors disabled:opacity-50"
                      onClick={
                        hasExternalHandler ? onStartCalendarClick : undefined
                      }
                      disabled={disabled}
                      aria-label="시작일 달력 열기"
                    >
                      <CalendarDays className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </PopoverPrimitive.Trigger>
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
                  aria-invalid={hasError ? 'true' : undefined}
                  className={cn(
                    dateFieldVariants({ hasError, showCalendarButton }),
                    'w-full'
                  )}
                  aria-label="종료일"
                />
                {showCalendarButton && (
                  <PopoverPrimitive.Trigger asChild>
                    <button
                      type="button"
                      className="form-btn-datepicker absolute right-3 top-1/2 -translate-y-1/2 text-krds-gray-50 hover:text-krds-gray-70 transition-colors disabled:opacity-50"
                      onClick={
                        hasExternalHandler ? onEndCalendarClick : undefined
                      }
                      disabled={disabled}
                      aria-label="종료일 달력 열기"
                    >
                      <CalendarDays className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </PopoverPrimitive.Trigger>
                )}
              </div>
            </div>
          </PopoverPrimitive.Anchor>

          {/* 달력 팝오버 */}
          {!hasExternalHandler && (
            <PopoverPrimitive.Portal>
              <PopoverPrimitive.Content
                role="dialog"
                aria-label="기간 선택"
                aria-modal="true"
                className={cn(
                  'z-50',
                  'data-[state=open]:animate-in data-[state=closed]:animate-out',
                  'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                  'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                  'data-[side=bottom]:slide-in-from-top-2',
                  'data-[side=top]:slide-in-from-bottom-2'
                )}
                side="top"
                sideOffset={4}
                align="start"
              >
                <Calendar
                  mode="range"
                  range={{ start: startDateValue, end: endDateValue }}
                  onRangeChange={handleRangeChange}
                  onConfirm={handleCalendarConfirm}
                  onCancel={handleCalendarCancel}
                  showTodayButton
                  showFooterActions
                />
              </PopoverPrimitive.Content>
            </PopoverPrimitive.Portal>
          )}
        </PopoverPrimitive.Root>

        {/* 에러 메시지 (입력 필드 아래) */}
        {hasError && errorMessage && (
          <p
            id={errorId}
            className="form-hint flex items-center gap-1 text-sm text-krds-danger mt-2"
          >
            <CircleX className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

DateInputRange.displayName = 'DateInputRange';

// Variants export
export { dateFieldVariants };
