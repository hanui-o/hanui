'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import NextLink from 'next/link';
import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Link Variants Definition
 */
const linkVariants = cva(
  [
    'inline-flex',
    'items-center',
    'gap-1',
    'transition-colors',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'focus:ring-blue-600',
    'dark:focus:ring-blue-400',
  ].join(' '),
  {
    variants: {
      variant: {
        primary: [
          'text-blue-600 dark:text-blue-400',
          'hover:text-blue-700 dark:hover:text-blue-300',
          'underline',
          'underline-offset-2',
        ].join(' '),
        secondary: [
          'text-gray-700 dark:text-gray-300',
          'hover:text-gray-900 dark:hover:text-gray-100',
          'hover:underline',
          'underline-offset-2',
        ].join(' '),
        button: [
          'px-4',
          'py-2',
          'bg-blue-600 dark:bg-blue-500',
          'text-white',
          'rounded-md',
          'hover:bg-blue-700 dark:hover:bg-blue-600',
          'no-underline',
        ].join(' '),
        outline: [
          'px-4',
          'py-2',
          'border',
          'border-gray-300 dark:border-gray-600',
          'text-gray-700 dark:text-gray-300',
          'rounded-md',
          'hover:bg-gray-50 dark:hover:bg-gray-800',
          'no-underline',
        ].join(' '),
        none: '',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

/**
 * Link Props Interface
 */
export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    VariantProps<typeof linkVariants> {
  /**
   * Link URL (internal or external)
   */
  href: string;

  /**
   * Link variant
   * @default "primary"
   */
  variant?: 'primary' | 'secondary' | 'button' | 'outline' | 'none';

  /**
   * Link size
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Whether to open in new tab
   * @default false (auto-detected for external links)
   */
  external?: boolean;

  /**
   * Additional className
   */
  className?: string;

  /**
   * Link content
   */
  children: React.ReactNode;
}

/**
 * Link Component (링크)
 *
 * **Foundation Layer Features:**
 * - Next.js Link integration for internal navigation
 * - Auto-detection of external links
 * - WCAG 2.1 / KWCAG 2.2 Compliance
 * - Keyboard navigation support
 * - Screen reader friendly
 * - Dark mode support
 *
 * **Design Principles:**
 * - Semantic HTML with proper accessibility
 * - Multiple variants for different contexts
 * - Automatic external link handling
 * - Consistent focus states
 *
 * @example
 * ```tsx
 * // Internal link (Next.js routing)
 * <Link href="/components">컴포넌트 보기</Link>
 *
 * // External link (opens in new tab)
 * <Link href="https://example.com" external>
 *   외부 사이트
 * </Link>
 *
 * // Button style link
 * <Link href="/docs" variant="button">
 *   문서 보기
 * </Link>
 *
 * // Custom styling
 * <Link href="/about" variant="none" className="custom-class">
 *   회사 소개
 * </Link>
 * ```
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, size, href, external, children, ...props }, ref) => {
    // Auto-detect external links
    const isExternal =
      external !== undefined
        ? external
        : href.startsWith('http://') ||
          href.startsWith('https://') ||
          href.startsWith('//');

    // External link props
    const externalProps = isExternal
      ? {
          target: '_blank',
          rel: 'noopener noreferrer',
        }
      : {};

    const linkClassName = cn(linkVariants({ variant, size }), className);

    // Use Next.js Link for internal navigation
    if (!isExternal) {
      return (
        <NextLink ref={ref} href={href} className={linkClassName} {...props}>
          {children}
        </NextLink>
      );
    }

    // Use regular anchor for external links
    return (
      <a
        ref={ref}
        href={href}
        className={linkClassName}
        {...externalProps}
        {...props}
      >
        {children}
      </a>
    );
  }
);
Link.displayName = 'Link';

/**
 * Export linkVariants for extending
 */
export { linkVariants };
