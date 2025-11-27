'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@/lib/utils';

// ============================================================================
// Linear Progress
// ============================================================================

/**
 * Linear Progress 스타일 variants
 */
const progressVariants = cva(
  'relative w-full overflow-hidden rounded-full bg-krds-gray-10',
  {
    variants: {
      size: {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
        xl: 'h-4',
      },
      variant: {
        default: '',
        primary: '',
        success: '',
        warning: '',
        error: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'primary',
    },
  }
);

/**
 * Progress Indicator 스타일
 */
const indicatorVariants = cva(
  'h-full rounded-full transition-all duration-300 ease-in-out',
  {
    variants: {
      variant: {
        default: 'bg-krds-gray-60',
        primary: 'bg-krds-primary-base',
        success: 'bg-krds-success-base',
        warning: 'bg-krds-warning-base',
        error: 'bg-krds-danger-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

/**
 * Indeterminate 애니메이션 스타일
 */
const indeterminateStyles: React.CSSProperties = {
  animation: 'progress-indeterminate 1.5s ease-in-out infinite',
};

/**
 * Indeterminate 애니메이션 keyframes
 * 컴포넌트 마운트 시 글로벌 스타일에 추가
 */
const injectIndeterminateAnimation = () => {
  if (typeof document === 'undefined') return;

  const styleId = 'hanui-progress-animation';
  if (document.getElementById(styleId)) return;

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    @keyframes progress-indeterminate {
      0% {
        transform: translateX(-100%);
      }
      50% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(300%);
      }
    }
  `;
  document.head.appendChild(style);
};

export interface ProgressProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
      'value'
    >,
    VariantProps<typeof progressVariants> {
  /**
   * 진행률 (0-100)
   * null 또는 undefined일 경우 indeterminate 상태
   */
  value?: number | null;
  /**
   * 최대값
   * @default 100
   */
  max?: number;
  /**
   * 레이블 (스크린리더용)
   */
  label?: string;
  /**
   * 진행률 텍스트 표시 여부
   */
  showValue?: boolean;
  /**
   * 커스텀 진행률 포맷터
   */
  formatValue?: (value: number, max: number) => string;
}

/**
 * Progress 컴포넌트 (Linear)
 *
 * 작업의 진행 상태를 시각적으로 표시합니다.
 *
 * 접근성:
 * - role="progressbar" 적용
 * - aria-valuenow, aria-valuemin, aria-valuemax 설정
 * - 불확정 상태 시 aria-busy="true"
 *
 * @example
 * ```tsx
 * // 확정 상태
 * <Progress value={60} />
 *
 * // 불확정 상태
 * <Progress />
 *
 * // 값 표시
 * <Progress value={75} showValue />
 * ```
 */
export const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      value,
      max = 100,
      size,
      variant,
      label,
      showValue = false,
      formatValue = (v, m) => `${Math.round((v / m) * 100)}%`,
      ...props
    },
    ref
  ) => {
    const isIndeterminate = value === null || value === undefined;
    const normalizedValue = isIndeterminate
      ? 0
      : Math.min(Math.max(value, 0), max);
    const percentage = (normalizedValue / max) * 100;

    // Inject animation styles on mount
    React.useEffect(() => {
      if (isIndeterminate) {
        injectIndeterminateAnimation();
      }
    }, [isIndeterminate]);

    return (
      <div className="w-full">
        {(label || showValue) && (
          <div className="flex justify-between mb-1.5 text-sm">
            {label && (
              <span className="text-krds-gray-70" id={`${props.id}-label`}>
                {label}
              </span>
            )}
            {showValue && !isIndeterminate && (
              <span className="text-krds-gray-60 tabular-nums">
                {formatValue(normalizedValue, max)}
              </span>
            )}
          </div>
        )}
        <ProgressPrimitive.Root
          ref={ref}
          className={cn(progressVariants({ size, variant }), className)}
          value={isIndeterminate ? null : normalizedValue}
          max={max}
          aria-label={label || '진행률'}
          aria-labelledby={label && props.id ? `${props.id}-label` : undefined}
          aria-busy={isIndeterminate}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className={cn(
              indicatorVariants({ variant }),
              isIndeterminate ? 'w-1/3' : ''
            )}
            style={
              isIndeterminate
                ? indeterminateStyles
                : { width: `${percentage}%` }
            }
          />
        </ProgressPrimitive.Root>
      </div>
    );
  }
);

Progress.displayName = 'Progress';

// ============================================================================
// Circular Progress
// ============================================================================

export interface CircularProgressProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof indicatorVariants> {
  /**
   * 진행률 (0-100)
   * null 또는 undefined일 경우 indeterminate 상태
   */
  value?: number | null;
  /**
   * 최대값
   * @default 100
   */
  max?: number;
  /**
   * 원의 크기 (px)
   * @default 48
   */
  size?: number;
  /**
   * 선 두께 (px)
   * @default 4
   */
  strokeWidth?: number;
  /**
   * 레이블 (스크린리더용)
   */
  label?: string;
  /**
   * 진행률 텍스트 표시 여부
   */
  showValue?: boolean;
  /**
   * 커스텀 진행률 포맷터
   */
  formatValue?: (value: number, max: number) => string;
}

/**
 * CircularProgress 컴포넌트
 *
 * 원형으로 진행 상태를 표시합니다.
 *
 * @example
 * ```tsx
 * <CircularProgress value={75} />
 * <CircularProgress showValue />
 * <CircularProgress variant="success" value={100} />
 * ```
 */
export const CircularProgress = React.forwardRef<
  SVGSVGElement,
  CircularProgressProps
>(
  (
    {
      className,
      value,
      max = 100,
      size = 48,
      strokeWidth = 4,
      variant = 'primary',
      label,
      showValue = false,
      formatValue = (v, m) => `${Math.round((v / m) * 100)}%`,
      ...props
    },
    ref
  ) => {
    const isIndeterminate = value === null || value === undefined;
    const normalizedValue = isIndeterminate
      ? 0
      : Math.min(Math.max(value, 0), max);
    const percentage = (normalizedValue / max) * 100;

    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const colorMap = {
      default: 'stroke-krds-gray-60',
      primary: 'stroke-krds-primary-base',
      success: 'stroke-krds-success-base',
      warning: 'stroke-krds-warning-base',
      error: 'stroke-krds-danger-base',
    };

    return (
      <div
        className="relative inline-flex items-center justify-center"
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : normalizedValue}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || '진행률'}
        aria-busy={isIndeterminate}
      >
        <svg
          ref={ref}
          className={cn(isIndeterminate && 'animate-spin', className)}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          {...props}
        >
          {/* Background circle */}
          <circle
            className="stroke-krds-gray-10"
            strokeWidth={strokeWidth}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
          />
          {/* Progress circle */}
          <circle
            className={cn(
              colorMap[variant || 'primary'],
              'transition-all duration-300 ease-in-out'
            )}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={
              isIndeterminate ? circumference * 0.75 : strokeDashoffset
            }
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
        {showValue && !isIndeterminate && (
          <span
            className="absolute text-xs font-medium text-krds-gray-70 tabular-nums"
            style={{ fontSize: size * 0.2 }}
          >
            {formatValue(normalizedValue, max)}
          </span>
        )}
      </div>
    );
  }
);

CircularProgress.displayName = 'CircularProgress';

export { progressVariants, indicatorVariants };
