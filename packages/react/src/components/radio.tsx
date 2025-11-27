'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useFormField } from './form-field';

const radioVariants = cva(
  [
    'aspect-square',
    'rounded-full',
    'border',
    'border-krds-gray-60',
    'ring-offset-background',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-krds-primary-base',
    'focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed',
    'disabled:opacity-60',
    'data-[state=checked]:border-krds-primary-base',
    'data-[state=checked]:text-krds-primary-base',
    'transition-colors',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-4 w-4', // 16px
        md: 'h-5 w-5', // 20px
        lg: 'h-6 w-6', // 24px
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface RadioGroupProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
      'size'
    >,
    VariantProps<typeof radioVariants> {
  size?: 'sm' | 'md' | 'lg';
  status?: 'error' | 'success' | 'info';
  error?: boolean; // @deprecated status="error" 사용 권장
}

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(
  (
    {
      className,
      size = 'md',
      status,
      error = false,
      disabled,
      orientation = 'horizontal',
      ...props
    },
    ref
  ) => {
    // FormField 컨텍스트 (선택적)
    let formField: ReturnType<typeof useFormField> | null = null;
    try {
      formField = useFormField();
    } catch {
      // FormField 없음, 독립 모드
    }

    const finalStatus =
      status || formField?.status || (error ? 'error' : undefined);
    const finalDisabled = formField?.disabled || disabled;

    return (
      <RadioGroupContext.Provider value={{ size, status: finalStatus }}>
        <RadioGroupPrimitive.Root
          className={cn(
            'flex',
            orientation === 'vertical' ? 'flex-col gap-3' : 'flex-row gap-4',
            className
          )}
          disabled={finalDisabled}
          orientation={orientation}
          aria-invalid={finalStatus === 'error' ? true : undefined}
          aria-describedby={
            [formField?.errorId, formField?.helperId]
              .filter(Boolean)
              .join(' ') || undefined
          }
          {...props}
          ref={ref}
        />
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

// RadioGroup Context
interface RadioGroupContextValue {
  size?: 'sm' | 'md' | 'lg';
  status?: 'error' | 'success' | 'info';
}

const RadioGroupContext = React.createContext<RadioGroupContextValue>({});

const useRadioGroupContext = () => {
  return React.useContext(RadioGroupContext);
};

export interface RadioGroupItemProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    'size'
  > {
  size?: 'sm' | 'md' | 'lg';
  status?: 'error' | 'success' | 'info';
}

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, size: sizeProp, status: statusProp, ...props }, ref) => {
  const context = useRadioGroupContext();
  const size = sizeProp || context.size || 'md';
  const status = statusProp || context.status;
  const hasError = status === 'error';

  const getStatusClasses = () => {
    if (hasError) {
      return 'border-krds-danger-60 data-[state=checked]:border-krds-danger-60 data-[state=checked]:text-krds-danger-60';
    }
    return '';
  };

  const getIndicatorSize = () => {
    switch (size) {
      case 'sm':
        return 8;
      case 'lg':
        return 12;
      case 'md':
      default:
        return 10;
    }
  };

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(radioVariants({ size }), getStatusClasses(), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle
          size={getIndicatorSize()}
          className="fill-current"
          strokeWidth={0}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

// Radio - 라벨이 포함된 편의 컴포넌트
export interface RadioProps {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const Radio = React.forwardRef<HTMLDivElement, RadioProps>(
  ({ value, label, disabled, className }, ref) => {
    const context = useRadioGroupContext();
    const size = context.size || 'md';

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

    return (
      <div ref={ref} className={cn('flex items-center gap-2', className)}>
        <RadioGroupItem value={value} id={value} disabled={disabled} />
        <label
          htmlFor={value}
          className={cn(
            getLabelSize(),
            'text-krds-gray-90 cursor-pointer select-none',
            disabled && 'cursor-not-allowed opacity-60'
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);

Radio.displayName = 'Radio';

export { radioVariants };
