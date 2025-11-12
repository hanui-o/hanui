import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * Button Variants Definition
 *
 * Uses class-variance-authority (cva) for type-safe variant management
 * Base styles + variant combinations
 */
const buttonVariants = cva(
  // Base styles (applied to all variants)
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded-md',
    'font-medium',
    'transition-colors',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-offset-2',
    'disabled:pointer-events-none',
    'disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      /**
       * Variant - Visual style
       *
       * KRDS Colors:
       * - Primary: #256ef4 (base), #0b50d0 (hover), #083891 (pressed)
       * - Uses @hanui/core color tokens
       */
      variant: {
        primary: [
          'bg-[#256ef4]',
          'text-white',
          'hover:bg-[#0b50d0]',
          'active:bg-[#083891]',
          'focus-visible:ring-[#256ef4]',
        ].join(' '),
        secondary: [
          'bg-gray-200',
          'text-gray-900',
          'hover:bg-gray-300',
          'active:bg-gray-400',
          'focus-visible:ring-gray-400',
        ].join(' '),
        success: [
          'bg-[#28A745]',
          'text-white',
          'hover:bg-[#218838]',
          'active:bg-[#1e7e34]',
          'focus-visible:ring-[#28A745]',
        ].join(' '),
        danger: [
          'bg-[#DC3545]',
          'text-white',
          'hover:bg-[#c82333]',
          'active:bg-[#bd2130]',
          'focus-visible:ring-[#DC3545]',
        ].join(' '),
        ghost: [
          'bg-transparent',
          'text-gray-900',
          'hover:bg-gray-100',
          'active:bg-gray-200',
          'focus-visible:ring-gray-900',
          'dark:text-gray-100',
          'dark:hover:bg-gray-900',
          'dark:active:bg-gray-800',
        ].join(' '),
        'ghost-primary': [
          'bg-transparent',
          'text-[#256ef4]',
          'hover:bg-[#ecf2fe]',
          'active:bg-[#d8e5fd]',
          'focus-visible:ring-[#256ef4]',
        ].join(' '),
        outline: [
          'border-2',
          'border-[#256ef4]',
          'bg-transparent',
          'text-[#256ef4]',
          'hover:bg-[#ecf2fe]',
          'active:bg-[#d8e5fd]',
          'focus-visible:ring-[#256ef4]',
        ].join(' '),
        black: [
          'bg-gray-900',
          'text-white',
          'hover:bg-gray-800',
          'active:bg-gray-700',
          'focus-visible:ring-gray-900',
          'dark:bg-gray-50',
          'dark:text-gray-900',
          'dark:hover:bg-gray-200',
          'dark:active:bg-gray-300',
        ].join(' '),
      },
      /**
       * Size - Height and padding
       *
       * KRDS Standards:
       * - Minimum touch target: 44x44px (WCAG 2.5.5)
       * - Recommended button height: 40px (md)
       */
      size: {
        sm: ['h-8', 'px-4', 'text-[15px]', 'leading-[150%]', 'gap-2'].join(' '), // 32px - KRDS body-sm
        md: ['h-10', 'px-4', 'text-[17px]', 'leading-[150%]', 'gap-2'].join(
          ' '
        ), // 40px - KRDS body-md (기본)
        lg: ['h-12', 'px-6', 'text-[19px]', 'leading-[150%]', 'gap-2'].join(
          ' '
        ), // 48px - KRDS body-lg
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

/**
 * Button Props Interface
 *
 * Extends native button attributes with HANUI-specific props
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Button size
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Button variant (visual style)
   * @default "primary"
   */
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'ghost'
    | 'ghost-primary'
    | 'outline'
    | 'black';

  /**
   * Loading state
   * Shows loading spinner and disables interaction
   */
  loading?: boolean;

  /**
   * Icon to display before children
   */
  iconLeft?: React.ReactNode;

  /**
   * Icon to display after children
   */
  iconRight?: React.ReactNode;

  /**
   * Additional className for layout adjustments
   *
   * ⚠️ Warning: Props take precedence over className
   * - Allowed: margin, width, alignment
   * - Ignored: height, background, padding (use size/variant props)
   */
  className?: string;
}

/**
 * Loading Spinner Component
 */
const LoadingSpinner = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

/**
 * Button Component
 *
 * KRDS-compliant button component with:
 * - Props-based API (size, variant)
 * - Full accessibility support
 * - Loading state
 * - Icon support
 * - className escape hatch for layout
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Button>확인</Button>
 *
 * // With variants
 * <Button variant="primary">주요 버튼</Button>
 * <Button variant="secondary">부차 버튼</Button>
 *
 * // With sizes
 * <Button size="sm">작은 버튼</Button>
 * <Button size="lg">큰 버튼</Button>
 *
 * // With loading
 * <Button loading>로딩 중...</Button>
 *
 * // With icons
 * <Button iconLeft={<Icon />}>왼쪽 아이콘</Button>
 * <Button iconRight={<Icon />}>오른쪽 아이콘</Button>
 *
 * // With layout className
 * <Button className="w-full mt-4">전체 너비</Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      disabled = false,
      iconLeft,
      iconRight,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        type={type}
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading && <LoadingSpinner />}
        {!loading && iconLeft && (
          <span className="inline-flex">{iconLeft}</span>
        )}
        {children}
        {!loading && iconRight && (
          <span className="inline-flex">{iconRight}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

/**
 * Export buttonVariants for extending
 * Useful for creating custom button-like components
 */
export { buttonVariants };
