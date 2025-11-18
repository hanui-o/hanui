'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Masthead Props
 */
export interface MastheadProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Custom text for the masthead banner
   * @default "This is an official website of the Republic of Korea"
   */
  text?: string;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Masthead Component
 *
 * **Foundation Layer Features:**
 * - Required CSS Selector: #krds-masthead (KRDS mandatory identifier)
 * - Skip Link Compatibility: Designed to work with skip links that precede it
 * - WCAG 2.1 / KWCAG 2.2 Compliance: Bypass Blocks (Level A)
 * - Semantic HTML: Uses semantic elements for accessibility
 *
 * **KRDS Standards:**
 * - Must be positioned at the top of all government digital service pages
 * - Standard text: "This is an official website of the Republic of Korea"
 * - Visual design should not attract excessive attention
 * - Consistent styling across all government services
 * - Skip links must precede the masthead
 * - Required for official government digital services only
 *
 * @example
 * ```tsx
 * // Basic usage with default text
 * <Masthead />
 *
 * // With skip link (recommended)
 * <>
 *   <a href="#main-content" className="sr-only focus:not-sr-only">
 *     Skip to main content
 *   </a>
 *   <Masthead />
 *   <main id="main-content">...</main>
 * </>
 * ```
 */
export const Masthead = React.forwardRef<HTMLDivElement, MastheadProps>(
  (
    {
      text = 'This is an official website of the Republic of Korea',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        id="krds-masthead"
        className={cn(
          'w-full',
          'bg-gray-50 dark:bg-gray-900',
          'border-b border-gray-200 dark:border-gray-800',
          className
        )}
        {...props}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center min-h-[40px] py-2">
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">
              {text}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

Masthead.displayName = 'Masthead';
