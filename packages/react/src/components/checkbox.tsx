'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useFormField } from './form-field';

const checkboxVariants = cva(
  [
    'peer',
    'shrink-0',
    'rounded',
    'border',
    'border-krds-gray-60',
    'ring-offset-background',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-krds-primary-base',
    'focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed',
    'disabled:opacity-60',
    'data-[state=checked]:bg-krds-primary-base',
    'data-[state=checked]:border-krds-primary-base',
    'data-[state=checked]:text-krds-white',
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

export interface CheckboxProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
      'size'
    >,
    VariantProps<typeof checkboxVariants> {
  size?: 'sm' | 'md' | 'lg';
  status?: 'error' | 'success' | 'info';
  error?: boolean; // @deprecated status="error" 사용 권장
}

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, size, status, error = false, disabled, ...props }, ref) => {
  // FormField 컨텍스트 (선택적)
  let formField: ReturnType<typeof useFormField> | null = null;
  try {
    formField = useFormField();
  } catch {
    // FormField 없음, 독립 모드
  }

  const finalStatus =
    status || formField?.status || (error ? 'error' : undefined);
  const hasError = finalStatus === 'error';
  const finalDisabled = formField?.disabled || disabled;

  const getStatusClasses = () => {
    if (hasError) {
      return 'border-krds-danger-60 data-[state=checked]:bg-krds-danger-60 data-[state=checked]:border-krds-danger-60';
    }
    return '';
  };

  const getCheckIconSize = () => {
    switch (size) {
      case 'sm':
        return 12;
      case 'lg':
        return 16;
      case 'md':
      default:
        return 14;
    }
  };

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(checkboxVariants({ size }), getStatusClasses(), className)}
      disabled={finalDisabled}
      aria-invalid={hasError ? true : undefined}
      aria-describedby={
        [formField?.errorId, formField?.helperId, props['aria-describedby']]
          .filter(Boolean)
          .join(' ') || undefined
      }
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn('flex items-center justify-center text-current')}
      >
        <Check size={getCheckIconSize()} strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// CheckboxGroup Context
interface CheckboxGroupContextValue {
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  status?: 'error' | 'success' | 'info';
}

const CheckboxGroupContext = React.createContext<
  CheckboxGroupContextValue | undefined
>(undefined);

const useCheckboxGroup = () => {
  const context = React.useContext(CheckboxGroupContext);
  if (!context) {
    throw new Error('useCheckboxGroup must be used within CheckboxGroup');
  }
  return context;
};

export interface CheckboxGroupProps {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  status?: 'error' | 'success' | 'info';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  children: React.ReactNode;
}

export const CheckboxGroup = React.forwardRef<
  HTMLDivElement,
  CheckboxGroupProps
>(
  (
    {
      value: controlledValue,
      defaultValue = [],
      onValueChange,
      disabled,
      size = 'md',
      status,
      orientation = 'vertical',
      className,
      children,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] =
      React.useState<string[]>(defaultValue);

    // FormField 컨텍스트 (선택적)
    let formField: ReturnType<typeof useFormField> | null = null;
    try {
      formField = useFormField();
    } catch {
      // FormField 없음, 독립 모드
    }

    const finalStatus = status || formField?.status;
    const finalDisabled = formField?.disabled || disabled;

    const value = controlledValue ?? internalValue;

    const handleChange = (newValue: string[]) => {
      if (!controlledValue) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    const contextValue: CheckboxGroupContextValue = {
      value,
      onChange: handleChange,
      disabled: finalDisabled,
      size,
      status: finalStatus,
    };

    return (
      <CheckboxGroupContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            'flex',
            orientation === 'vertical' ? 'flex-col gap-3' : 'flex-row gap-4',
            className
          )}
          role="group"
          aria-invalid={finalStatus === 'error' ? true : undefined}
          aria-describedby={
            [formField?.errorId, formField?.helperId]
              .filter(Boolean)
              .join(' ') || undefined
          }
        >
          {children}
        </div>
      </CheckboxGroupContext.Provider>
    );
  }
);

CheckboxGroup.displayName = 'CheckboxGroup';

export interface CheckboxGroupItemProps {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const CheckboxGroupItem = React.forwardRef<
  HTMLDivElement,
  CheckboxGroupItemProps
>(({ value, label, disabled, className }, ref) => {
  const group = useCheckboxGroup();

  const isChecked = group.value.includes(value);

  const handleCheckedChange = (checked: boolean) => {
    if (checked) {
      group.onChange([...group.value, value]);
    } else {
      group.onChange(group.value.filter((v) => v !== value));
    }
  };

  return (
    <div ref={ref} className={cn('flex items-center gap-2', className)}>
      <Checkbox
        checked={isChecked}
        onCheckedChange={handleCheckedChange}
        disabled={group.disabled || disabled}
        size={group.size}
        status={group.status}
        id={value}
      />
      <label
        htmlFor={value}
        className="text-krds-body-md text-krds-gray-90 cursor-pointer select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-60"
      >
        {label}
      </label>
    </div>
  );
});

CheckboxGroupItem.displayName = 'CheckboxGroupItem';

export { checkboxVariants };
