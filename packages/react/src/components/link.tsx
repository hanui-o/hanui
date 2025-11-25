import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { SquareArrowOutUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Link Variants Definition
 *
 * Uses KRDS color variables for consistent theming
 * Variant types:
 * - default: Gray text with underline, hover: primary
 * - primary: Primary color with underline, hover: darker primary
 * - plain: Gray text no underline, hover: primary
 */
const linkVariants = cva(
  [
    'inline-flex',
    'items-center',
    'gap-1',
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
       */
      variant: {
        default:
          '[color:var(--krds-color-light-gray-90)] underline underline-offset-4 hover:[color:var(--krds-color-light-primary-50)] active:text-krds-primary-60 focus-visible:ring-krds-gray-90',
        primary:
          '[color:var(--krds-color-light-primary-50)] underline underline-offset-4 hover:[color:var(--krds-color-light-primary-60)] active:text-krds-primary-70 focus-visible:ring-krds-primary-60',
        plain:
          '[color:var(--krds-color-light-gray-90)] hover:[color:var(--krds-color-light-primary-50)] active:text-krds-primary-60 focus-visible:ring-krds-gray-90',
      },
      /**
       * Size - Font size
       */
      size: {
        small: '[font-size:var(--krds-font-size-body-sm)]',
        medium: '[font-size:var(--krds-font-size-body-md)]',
        large: '[font-size:var(--krds-font-size-body-lg)]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  }
);

/**
 * Link Props Interface
 */
export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  /**
   * Link variant (visual style)
   * @default "default"
   */
  variant?: 'default' | 'primary' | 'plain';

  /**
   * Link size
   * @default "medium"
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Whether the link is external (opens in a new tab)
   * When true, automatically adds target="_blank" and rel="noopener noreferrer"
   */
  external?: boolean;

  /**
   * Additional className for custom styling
   *
   * Warning: Props take precedence over className
   */
  className?: string;
}

/**
 * Link Component
 *
 * KRDS-compliant link component with:
 * - Props-based API (variant)
 * - Full accessibility support
 * - External link handling
 * - className escape hatch
 *
 * @example
 * ```tsx
 * // Basic usage (Primary blue with underline)
 * <Link href="/docs">기본 링크</Link>
 *
 * // With variants
 * <Link variant="default" href="/home">검은색 링크 (밑줄, hover: primary)</Link>
 * <Link variant="primary" href="/about">Primary 파란색 링크 (밑줄)</Link>
 * <Link variant="plain" href="/nav">밑줄 없음 (검은색, hover: primary)</Link>
 *
 * // With sizes
 * <Link size="small" href="/small">Small 링크</Link>
 * <Link size="large" href="/large">Large 링크</Link>
 *
 * // External link
 * <Link href="https://example.com" external>
 *   외부 사이트
 * </Link>
 * ```
 */
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, size, external, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(linkVariants({ variant, size }), className)}
        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
        {...props}
      >
        {children}
        {external && (
          <SquareArrowOutUpRight
            className="inline-block ml-1"
            size={16}
            aria-label="새 창 열림"
          />
        )}
      </a>
    );
  }
);

Link.displayName = 'Link';

export { Link, linkVariants };
