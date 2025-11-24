'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import * as Slot from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

/**
 * Button Variants Definition
 *
 * Uses class-variance-authority (cva) for type-safe variant management
 * Radix UI Slot pattern for polymorphic components
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      /**
       * Visual style variants
       *
       * KRDS Primary Colors:
       * - base: #256ef4 (primary-60)
       * - hover: #0b50d0 (primary-70)
       * - active: #083891 (primary-80)
       */
      variant: {
        primary:
          'bg-[#256ef4] text-white hover:bg-[#0b50d0] active:bg-[#083891] focus-visible:ring-[#256ef4]',
        secondary:
          'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400 focus-visible:ring-gray-400',
        success:
          'bg-[#28A745] text-white hover:bg-[#218838] active:bg-[#1e7e34] focus-visible:ring-[#28A745]',
        danger:
          'bg-[#DC3545] text-white hover:bg-[#c82333] active:bg-[#bd2130] focus-visible:ring-[#DC3545]',
        ghost:
          'bg-transparent text-gray-900 hover:bg-gray-100 active:bg-gray-200 focus-visible:ring-gray-900 dark:text-gray-100 dark:hover:bg-gray-900 dark:active:bg-gray-800',
        'ghost-primary':
          'bg-transparent text-[#256ef4] hover:bg-[#ecf2fe] active:bg-[#d8e5fd] focus-visible:ring-[#256ef4]',
        outline:
          'border-2 border-[#256ef4] bg-transparent text-[#256ef4] hover:bg-[#ecf2fe] active:bg-[#d8e5fd] focus-visible:ring-[#256ef4]',
        black:
          'bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-700 focus-visible:ring-gray-900 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-100 dark:active:bg-gray-200',
      },
      /**
       * Size variants
       *
       * KRDS Typography Scale:
       * - sm: 15px (body-sm) - 32px height
       * - md: 17px (body-md) - 40px height (default)
       * - lg: 19px (body-lg) - 48px height
       * - icon: Square shape for icon-only buttons
       */
      size: {
        sm: 'h-8 px-4 text-[15px] leading-[150%]',
        md: 'h-10 px-4 text-[17px] leading-[150%]',
        lg: 'h-12 px-6 text-[19px] leading-[150%]',
        icon: 'h-10 w-10',
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
 * Supports Radix UI Slot pattern for polymorphic components
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Render as a child component (Radix Slot pattern)
   * Useful for rendering as Link or other interactive elements
   *
   * @example
   * ```tsx
   * <Button asChild>
   *   <Link href="/about">About</Link>
   * </Button>
   * ```
   */
  asChild?: boolean;

  /**
   * Loading state
   * Shows loading spinner and disables interaction
   * Sets aria-busy for screen readers
   */
  loading?: boolean;

  /**
   * Icon to display before children
   *
   * @example
   * ```tsx
   * <Button iconLeft={<ChevronLeftIcon />}>Previous</Button>
   * ```
   */
  iconLeft?: React.ReactNode;

  /**
   * Icon to display after children
   *
   * @example
   * ```tsx
   * <Button iconRight={<ChevronRightIcon />}>Next</Button>
   * ```
   */
  iconRight?: React.ReactNode;

  /**
   * URL for link button
   * When provided, renders as <a> tag instead of <button>
   *
   * @example
   * ```tsx
   * <Button href="/about">About</Button>
   * <Button href="https://example.com" target="_blank">External</Button>
   * ```
   */
  href?: string;

  /**
   * Link target attribute (only used with href)
   */
  target?: string;

  /**
   * Link rel attribute (only used with href)
   */
  rel?: string;
}

/**
 * Loading Spinner Component
 * Hidden from screen readers with aria-hidden
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
 * KRDS-compliant accessible button component with:
 * - Radix UI Slot pattern for polymorphic rendering
 * - Full ARIA support (aria-busy, aria-disabled)
 * - Loading state with spinner
 * - Icon support (left/right)
 * - WCAG 2.1 AA compliant focus indicators
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Button>확인</Button>
 *
 * // With variants
 * <Button variant="primary">주요 버튼</Button>
 * <Button variant="secondary">부차 버튼</Button>
 * <Button variant="danger">삭제</Button>
 *
 * // With sizes
 * <Button size="sm">작은 버튼</Button>
 * <Button size="lg">큰 버튼</Button>
 *
 * // With loading state
 * <Button loading>저장 중...</Button>
 *
 * // With icons
 * <Button iconLeft={<ChevronLeftIcon />}>이전</Button>
 * <Button iconRight={<ChevronRightIcon />}>다음</Button>
 *
 * // Icon-only (requires aria-label)
 * <Button size="icon" iconLeft={<SearchIcon />} aria-label="검색" />
 *
 * // As Link (Radix Slot pattern)
 * <Button asChild>
 *   <Link href="/about">소개</Link>
 * </Button>
 * ```
 */
export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
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
      asChild = false,
      href,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const isIconOnly = !children && (iconLeft || iconRight);

    // Development warning: icon-only buttons must have aria-label
    React.useEffect(() => {
      if (
        process.env.NODE_ENV === 'development' &&
        isIconOnly &&
        !props['aria-label'] &&
        !props['aria-labelledby']
      ) {
        console.warn(
          '[HANUI Button] Icon-only buttons must have an aria-label or aria-labelledby attribute for accessibility.\n' +
            'Example: <Button size="icon" iconLeft={<Icon />} aria-label="검색" />'
        );
      }
    }, [isIconOnly, props]);

    // Development warning: href and asChild cannot be used together
    React.useEffect(() => {
      if (
        typeof process !== 'undefined' &&
        process.env.NODE_ENV === 'development' &&
        href &&
        asChild
      ) {
        console.warn(
          '[HANUI Button] href and asChild props cannot be used together. Use either href or asChild, not both.'
        );
      }
    }, [href, asChild]);

    // Determine the component to render
    const Comp = asChild ? Slot.Root : href ? 'a' : 'button';

    // Common content
    const content = (
      <>
        {loading && <LoadingSpinner />}
        {!loading && iconLeft && (
          <span
            className="inline-flex"
            aria-hidden={isIconOnly ? 'true' : undefined}
          >
            {iconLeft}
          </span>
        )}
        {children}
        {!loading && iconRight && (
          <span
            className="inline-flex"
            aria-hidden={isIconOnly ? 'true' : undefined}
          >
            {iconRight}
          </span>
        )}
      </>
    );

    // Render as link
    if (href && !asChild) {
      return (
        <a
          className={cn(buttonVariants({ variant, size }), className)}
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          aria-disabled={isDisabled}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    // Render as button or Slot
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref as any}
        {...(!asChild && {
          type,
          disabled: isDisabled,
          'aria-busy': loading,
          'aria-disabled': isDisabled,
        })}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

/**
 * Export buttonVariants for extending or creating custom button-like components
 *
 * @example
 * ```tsx
 * import { buttonVariants } from '@hanui/react';
 *
 * function CustomButton() {
 *   return (
 *     <div className={buttonVariants({ variant: 'primary', size: 'lg' })}>
 *       Custom
 *     </div>
 *   );
 * }
 * ```
 */
export { buttonVariants };
