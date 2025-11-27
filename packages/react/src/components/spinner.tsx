'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Spinner 스타일 variants
 */
const spinnerVariants = cva('animate-spin', {
  variants: {
    size: {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
    },
    variant: {
      default: 'text-krds-gray-40',
      primary: 'text-krds-primary-base',
      secondary: 'text-krds-gray-60',
      white: 'text-white',
      inherit: 'text-current',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
});

export interface SpinnerProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {
  /**
   * 스크린리더용 레이블
   * @default '로딩 중'
   */
  label?: string;
  /**
   * 선 두께
   * @default 2
   */
  strokeWidth?: number;
}

/**
 * Spinner 컴포넌트
 *
 * 로딩 상태를 표시하는 회전 애니메이션 컴포넌트입니다.
 *
 * 접근성:
 * - role="status" 적용
 * - aria-live="polite" 적용
 * - 시각 장애인을 위한 대체 텍스트 제공
 *
 * @example
 * ```tsx
 * <Spinner />
 * <Spinner size="lg" variant="primary" />
 * <Spinner label="데이터 로딩 중" />
 * ```
 */
export const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  (
    { className, size, variant, label = '로딩 중', strokeWidth = 2, ...props },
    ref
  ) => {
    return (
      <span
        role="status"
        aria-live="polite"
        className="inline-flex items-center justify-center"
      >
        <svg
          ref={ref}
          className={cn(spinnerVariants({ size, variant }), className)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
          {...props}
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span className="sr-only">{label}</span>
      </span>
    );
  }
);

Spinner.displayName = 'Spinner';

/**
 * 전체 화면 로딩 오버레이용 Spinner
 */
export interface SpinnerOverlayProps extends SpinnerProps {
  /**
   * 표시 여부
   */
  show?: boolean;
  /**
   * 로딩 메시지
   */
  message?: string;
  /**
   * 오버레이 배경색
   * @default 'light'
   */
  backdrop?: 'light' | 'dark' | 'blur';
}

/**
 * SpinnerOverlay 컴포넌트
 *
 * 전체 화면 또는 컨테이너를 덮는 로딩 오버레이입니다.
 *
 * @example
 * ```tsx
 * <SpinnerOverlay show={isLoading} message="처리 중..." />
 * ```
 */
export const SpinnerOverlay = React.forwardRef<
  HTMLDivElement,
  SpinnerOverlayProps
>(
  (
    {
      show = true,
      message,
      backdrop = 'light',
      size = 'lg',
      variant = 'primary',
      label,
      ...props
    },
    ref
  ) => {
    if (!show) return null;

    const backdropStyles = {
      light: 'bg-white/80',
      dark: 'bg-krds-gray-95/80',
      blur: 'bg-white/60 backdrop-blur-sm',
    };

    const textColor = backdrop === 'dark' ? 'text-white' : 'text-krds-gray-70';
    const spinnerVariant = backdrop === 'dark' ? 'white' : variant;

    return (
      <div
        ref={ref}
        className={cn(
          'fixed inset-0 z-50 flex flex-col items-center justify-center',
          backdropStyles[backdrop]
        )}
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <Spinner
          size={size}
          variant={spinnerVariant}
          label={label || message || '로딩 중'}
          {...props}
        />
        {message && (
          <p className={cn('mt-4 text-sm font-medium', textColor)}>{message}</p>
        )}
      </div>
    );
  }
);

SpinnerOverlay.displayName = 'SpinnerOverlay';

/**
 * 버튼 등에서 사용할 인라인 로딩 스피너
 */
export interface SpinnerInlineProps extends SpinnerProps {
  /**
   * 텍스트
   */
  children?: React.ReactNode;
  /**
   * 스피너 위치
   * @default 'left'
   */
  position?: 'left' | 'right';
}

/**
 * SpinnerInline 컴포넌트
 *
 * 텍스트와 함께 인라인으로 표시되는 로딩 스피너입니다.
 *
 * @example
 * ```tsx
 * <SpinnerInline>저장 중...</SpinnerInline>
 * <SpinnerInline position="right">처리 중</SpinnerInline>
 * ```
 */
export const SpinnerInline = React.forwardRef<
  HTMLSpanElement,
  SpinnerInlineProps
>(
  (
    {
      children,
      position = 'left',
      size = 'sm',
      variant = 'inherit',
      label,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-2',
          position === 'right' && 'flex-row-reverse'
        )}
      >
        <Spinner
          size={size}
          variant={variant}
          label={label || (typeof children === 'string' ? children : '로딩 중')}
          {...props}
        />
        {children && <span>{children}</span>}
      </span>
    );
  }
);

SpinnerInline.displayName = 'SpinnerInline';

export { spinnerVariants };
