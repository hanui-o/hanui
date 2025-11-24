'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import * as Slot from '@radix-ui/react-slot';
import { Loader2 } from 'lucide-react';
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
          'bg-krds-primary-base text-krds-white hover:bg-krds-primary-70 active:bg-krds-primary-80 focus-visible:ring-krds-primary-base',
        secondary:
          'bg-krds-gray-20 text-krds-gray-95 hover:bg-krds-gray-30 active:bg-krds-gray-40 focus-visible:ring-krds-gray-40',
        success:
          'bg-krds-success-base text-krds-white hover:bg-krds-success-70 active:bg-krds-success-80 focus-visible:ring-krds-success-base',
        danger:
          'bg-krds-danger-base text-krds-white hover:bg-krds-danger-70 active:bg-krds-danger-80 focus-visible:ring-krds-danger-base',
        ghost:
          'bg-transparent text-krds-gray-95 hover:bg-krds-gray-5 active:bg-krds-gray-10 focus-visible:ring-krds-gray-95',
        'ghost-primary':
          'bg-transparent text-krds-primary-base hover:bg-krds-primary-5 active:bg-krds-primary-10 focus-visible:ring-krds-primary-base',
        outline:
          'border-2 border-krds-primary-base bg-transparent text-krds-primary-base hover:bg-krds-primary-5 active:bg-krds-primary-10 focus-visible:ring-krds-primary-base',
        black:
          'bg-krds-gray-95 text-krds-white hover:bg-krds-gray-90 active:bg-krds-gray-80 focus-visible:ring-krds-gray-95',
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
 * Uses lucide-react Loader2 icon with spin animation
 * Hidden from screen readers with aria-hidden
 */
const LoadingSpinner = () => (
  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
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
