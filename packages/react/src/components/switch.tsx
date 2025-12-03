'use client';

import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFormFieldOptional } from './form-field';

const switchVariants = cva(
  [
    'peer',
    'inline-flex',
    'shrink-0',
    'cursor-pointer',
    'items-center',
    'rounded-full',
    'border-2',
    'border-transparent',
    'transition-colors',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-krds-primary-base',
    'focus-visible:ring-offset-2',
    'focus-visible:ring-offset-background',
    'disabled:cursor-not-allowed',
    'disabled:opacity-60',
    'data-[state=checked]:bg-krds-primary-base',
    'data-[state=unchecked]:bg-krds-gray-50',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-5 w-9', // 20px height, 36px width
        md: 'h-6 w-10', // 24px height, 40px width
        lg: 'h-7 w-12', // 28px height, 48px width
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const thumbVariants = cva(
  [
    'pointer-events-none',
    'flex items-center justify-center',
    'rounded-full',
    'bg-white',
    'shadow-lg',
    'ring-0',
    'transition-transform',
    'data-[state=unchecked]:translate-x-0',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-4 w-4 data-[state=checked]:translate-x-full', // 16px, 36-16=20px
        md: 'h-5 w-5 data-[state=checked]:translate-x-[16px]', // 20px, 40-20-4(border)=16px
        lg: 'h-6 w-6 data-[state=checked]:translate-x-[20px]', // 24px, 48-24-4=20px
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// 아이콘 크기 매핑
const iconSizeMap = {
  sm: 10,
  md: 12,
  lg: 14,
};

export interface SwitchProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
      'size'
    >,
    VariantProps<typeof switchVariants> {
  size?: 'sm' | 'md' | 'lg';
  status?: 'error' | 'success' | 'info';
  error?: boolean; // @deprecated status="error" 사용 권장
  label?: React.ReactNode;
  labelPosition?: 'left' | 'right';
}

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(
  (
    {
      className,
      size = 'md',
      status,
      error = false,
      disabled,
      label,
      labelPosition = 'right',
      id,
      ...props
    },
    ref
  ) => {
    // FormField 컨텍스트 (선택적)
    const formField = useFormFieldOptional();

    const finalStatus =
      status || formField?.status || (error ? 'error' : undefined);
    const hasError = finalStatus === 'error';
    const finalDisabled = formField?.disabled || disabled;
    const finalId = formField?.id || id;

    const getStatusClasses = () => {
      if (hasError) {
        return 'data-[state=checked]:bg-krds-danger-50';
      }
      return '';
    };

    const getLabelSize = () => {
      switch (size) {
        case 'sm':
          return 'text-krds-body-sm';
        case 'lg':
          return 'text-krds-body-lg';
        case 'md':
        default:
          return 'text-krds-body-md';
      }
    };

    const iconSize = iconSizeMap[size || 'md'];

    const switchElement = (
      <SwitchPrimitive.Root
        className={cn(switchVariants({ size }), getStatusClasses(), className)}
        disabled={finalDisabled}
        id={finalId}
        aria-invalid={hasError ? true : undefined}
        aria-describedby={
          [formField?.errorId, formField?.helperId, props['aria-describedby']]
            .filter(Boolean)
            .join(' ') || undefined
        }
        {...props}
        ref={ref}
      >
        <SwitchPrimitive.Thumb className={cn(thumbVariants({ size }))}>
          {/* 체크 아이콘 (checked 상태) */}
          <Check
            size={iconSize}
            strokeWidth={3}
            className="text-krds-primary-base hidden [[data-state=checked]_&]:block"
            aria-hidden="true"
          />
          {/* X 아이콘 (unchecked 상태) */}
          <X
            size={iconSize}
            strokeWidth={3}
            className="text-krds-gray-40 absolute block [[data-state=checked]_&]:hidden"
            aria-hidden="true"
          />
        </SwitchPrimitive.Thumb>
      </SwitchPrimitive.Root>
    );

    if (label) {
      return (
        <div className="flex items-center gap-2">
          {labelPosition === 'left' && (
            <label
              htmlFor={finalId}
              className={cn(
                getLabelSize(),
                'text-krds-gray-90 cursor-pointer select-none',
                finalDisabled && 'cursor-not-allowed opacity-60'
              )}
            >
              {label}
            </label>
          )}
          {switchElement}
          {labelPosition === 'right' && (
            <label
              htmlFor={finalId}
              className={cn(
                getLabelSize(),
                'text-krds-gray-90 cursor-pointer select-none',
                finalDisabled && 'cursor-not-allowed opacity-60'
              )}
            >
              {label}
            </label>
          )}
        </div>
      );
    }

    return switchElement;
  }
);

Switch.displayName = SwitchPrimitive.Root.displayName;

export { switchVariants, thumbVariants };
