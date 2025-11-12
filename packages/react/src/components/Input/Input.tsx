import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * Input Variants Definition
 *
 * Uses class-variance-authority (cva) for type-safe variant management
 */
const inputVariants = cva(
  [
    'flex',
    'w-full',
    'rounded-md',
    'font-medium',
    'transition-colors',
    'placeholder:text-gray-400',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed',
    'disabled:opacity-60',
    'disabled:bg-gray-100',
  ].join(' '),
  {
    variants: {
      /**
       * Variant - Visual style
       */
      variant: {
        default: [
          'border',
          'border-gray-300',
          'bg-white',
          'focus-visible:ring-[#256ef4]',
        ].join(' '),
        filled: [
          'border-0',
          'bg-gray-100',
          'focus-visible:ring-[#256ef4]',
        ].join(' '),
      },
      /**
       * Size - Height and padding
       */
      size: {
        sm: ['h-8', 'px-3', 'text-sm'].join(' '), // 32px
        md: ['h-10', 'px-4', 'text-base'].join(' '), // 40px - default
        lg: ['h-12', 'px-4', 'text-lg'].join(' '), // 48px
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

/**
 * Input Props Interface
 */
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /**
   * Input size
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Input variant (visual style)
   * @default "default"
   */
  variant?: 'default' | 'filled';

  /**
   * Error state
   * Shows error styling and sets aria-invalid
   */
  error?: boolean;

  /**
   * Left addon element (icon, prefix, etc.)
   */
  leftAddon?: React.ReactNode;

  /**
   * Right addon element (icon, suffix, etc.)
   */
  rightAddon?: React.ReactNode;

  /**
   * Additional className for layout adjustments
   *
   * ⚠️ Warning: Props take precedence over className
   * - Allowed: margin, width, max-width
   * - Ignored: height, padding, border (use size/variant props)
   */
  className?: string;
}

/**
 * Input Component
 *
 * KRDS-compliant input component with:
 * - Props-based API (size, variant)
 * - Full accessibility support
 * - Error state handling
 * - Addon support (left/right)
 * - className escape hatch for layout
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Input placeholder="이름 입력" />
 *
 * // With variants
 * <Input variant="default" />
 * <Input variant="filled" />
 *
 * // With sizes
 * <Input size="small" />
 * <Input size="large" />
 *
 * // With error
 * <Input error />
 *
 * // With addons
 * <Input leftAddon={<SearchIcon />} placeholder="검색" />
 * <Input rightAddon={<CheckIcon />} />
 *
 * // With layout className
 * <Input className="w-full max-w-md" />
 *
 * // Form integration
 * <label htmlFor="email">이메일</label>
 * <Input
 *   id="email"
 *   type="email"
 *   placeholder="example@email.com"
 *   aria-describedby="email-error"
 * />
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      variant,
      size,
      error = false,
      disabled = false,
      leftAddon,
      rightAddon,
      ...props
    },
    ref
  ) => {
    // If there are addons, wrap in container
    if (leftAddon || rightAddon) {
      return (
        <div className={cn('relative flex items-center', className)}>
          {leftAddon && (
            <div className="pointer-events-none absolute left-3 flex items-center text-gray-500">
              {leftAddon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ variant, size }),
              error &&
                'border-[#DC3545] focus-visible:ring-[#DC3545] focus-visible:ring-offset-0',
              leftAddon && 'pl-10',
              rightAddon && 'pr-10'
            )}
            ref={ref}
            disabled={disabled}
            aria-invalid={error}
            {...props}
          />
          {rightAddon && (
            <div className="pointer-events-none absolute right-3 flex items-center text-gray-500">
              {rightAddon}
            </div>
          )}
        </div>
      );
    }

    // Simple input without addons
    return (
      <input
        type={type}
        className={cn(
          inputVariants({ variant, size }),
          error &&
            'border-[#DC3545] focus-visible:ring-[#DC3545] focus-visible:ring-offset-0',
          className
        )}
        ref={ref}
        disabled={disabled}
        aria-invalid={error}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

/**
 * Export inputVariants for extending
 */
export { inputVariants };
