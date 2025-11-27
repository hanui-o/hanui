'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

// ============================================================================
// Slider Variants
// ============================================================================

const sliderVariants = cva(
  'relative flex w-full touch-none select-none items-center',
  {
    variants: {
      size: {
        sm: '[&_[data-slider-track]]:h-1 [&_[data-slider-thumb]]:h-3 [&_[data-slider-thumb]]:w-3',
        md: '[&_[data-slider-track]]:h-1.5 [&_[data-slider-thumb]]:h-4 [&_[data-slider-thumb]]:w-4',
        lg: '[&_[data-slider-track]]:h-2 [&_[data-slider-thumb]]:h-5 [&_[data-slider-thumb]]:w-5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const sliderTrackVariants = cva(
  'relative grow overflow-hidden rounded-full bg-krds-gray-20',
  {
    variants: {
      color: {
        primary: '',
        secondary: '',
        success: '',
        danger: '',
      },
    },
    defaultVariants: {
      color: 'primary',
    },
  }
);

const sliderRangeVariants = cva('absolute h-full', {
  variants: {
    color: {
      primary: 'bg-krds-primary-base',
      secondary: 'bg-krds-gray-60',
      success: 'bg-krds-func-success-base',
      danger: 'bg-krds-danger-base',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

const sliderThumbVariants = cva(
  [
    'block rounded-full border-2 bg-white shadow-md transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      color: {
        primary:
          'border-krds-primary-base focus-visible:ring-krds-primary-base',
        secondary: 'border-krds-gray-60 focus-visible:ring-krds-gray-60',
        success:
          'border-krds-func-success-base focus-visible:ring-krds-func-success-base',
        danger: 'border-krds-danger-base focus-visible:ring-krds-danger-base',
      },
    },
    defaultVariants: {
      color: 'primary',
    },
  }
);

// ============================================================================
// Slider Color Type
// ============================================================================

type SliderColor = 'primary' | 'secondary' | 'success' | 'danger';

// ============================================================================
// Slider Props
// ============================================================================

export interface SliderProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
      'value' | 'defaultValue' | 'onValueChange' | 'color'
    >,
    VariantProps<typeof sliderVariants> {
  /** 색상 */
  color?: SliderColor;
  /** 현재 값 (단일 값 또는 범위) */
  value?: number | number[];
  /** 기본 값 */
  defaultValue?: number | number[];
  /** 값 변경 콜백 */
  onValueChange?: (value: number | number[]) => void;
  /** 최소값 */
  min?: number;
  /** 최대값 */
  max?: number;
  /** 증가 단위 */
  step?: number;
  /** 값 표시 여부 */
  showValue?: boolean;
  /** 값 포맷터 */
  formatValue?: (value: number) => string;
  /** 비활성화 */
  disabled?: boolean;
  /** 라벨 */
  label?: string;
  /** 라벨 ID (접근성) */
  labelId?: string;
}

// ============================================================================
// Slider Component
// ============================================================================

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      className,
      size,
      color,
      value,
      defaultValue,
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      showValue = false,
      formatValue = (v) => String(v),
      disabled = false,
      label,
      labelId,
      ...props
    },
    ref
  ) => {
    // 단일 값을 배열로 정규화
    const normalizedValue = React.useMemo(() => {
      if (value === undefined) return undefined;
      return Array.isArray(value) ? value : [value];
    }, [value]);

    const normalizedDefaultValue = React.useMemo(() => {
      if (defaultValue === undefined) return [min];
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }, [defaultValue, min]);

    // 값 변경 핸들러
    const handleValueChange = React.useCallback(
      (newValue: number[]) => {
        if (onValueChange) {
          // 원래 형식에 맞게 반환
          if (
            Array.isArray(value) ||
            Array.isArray(defaultValue) ||
            newValue.length > 1
          ) {
            onValueChange(newValue);
          } else {
            onValueChange(newValue[0]);
          }
        }
      },
      [onValueChange, value, defaultValue]
    );

    const isRange =
      (normalizedValue && normalizedValue.length > 1) ||
      (normalizedDefaultValue && normalizedDefaultValue.length > 1);
    const currentValue = normalizedValue || normalizedDefaultValue || [min];

    return (
      <div className="w-full">
        {/* 라벨 및 값 표시 */}
        {(label || showValue) && (
          <div className="mb-2 flex items-center justify-between">
            {label && (
              <label
                id={labelId}
                className="text-sm font-medium text-krds-gray-70"
              >
                {label}
              </label>
            )}
            {showValue && (
              <span className="text-sm text-krds-gray-50">
                {isRange
                  ? `${formatValue(currentValue[0])} - ${formatValue(currentValue[currentValue.length - 1])}`
                  : formatValue(currentValue[0])}
              </span>
            )}
          </div>
        )}

        {/* 슬라이더 */}
        <SliderPrimitive.Root
          ref={ref}
          className={cn(sliderVariants({ size }), className)}
          value={normalizedValue}
          defaultValue={normalizedDefaultValue}
          onValueChange={handleValueChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          aria-labelledby={labelId}
          {...props}
        >
          <SliderPrimitive.Track
            data-slider-track
            className={cn(sliderTrackVariants({ color: color ?? 'primary' }))}
          >
            <SliderPrimitive.Range
              className={cn(sliderRangeVariants({ color: color ?? 'primary' }))}
            />
          </SliderPrimitive.Track>
          {currentValue.map((_, index) => (
            <SliderPrimitive.Thumb
              key={index}
              data-slider-thumb
              className={cn(sliderThumbVariants({ color: color ?? 'primary' }))}
            />
          ))}
        </SliderPrimitive.Root>
      </div>
    );
  }
);

Slider.displayName = 'Slider';

// ============================================================================
// Exports
// ============================================================================

export { Slider, sliderVariants };
