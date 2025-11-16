'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * Identifier Variant Types
 */
export type IdentifierVariant = 'light' | 'dark';

/**
 * Identifier Props
 */
export interface IdentifierProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Organization name to display
   */
  organizationName: string;

  /**
   * Organization logo (image URL or React element)
   */
  logo?: string | React.ReactNode;

  /**
   * Alt text for logo image (required if logo is string URL)
   */
  logoAlt?: string;

  /**
   * Visual variant
   * @default "light"
   */
  variant?: IdentifierVariant;

  /**
   * Custom text format
   * Use {organization} placeholder for organization name
   * @default "이 누리집은 {organization}에서 운영합니다"
   */
  text?: string;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Identifier Component (운영기관 식별자)
 *
 * **Foundation Layer Features:**
 * - Required CSS Class: .krds-identifier (KRDS mandatory)
 * - Semantic HTML: section/article element for proper nesting
 * - WCAG 2.1 / KWCAG 2.2 Compliance: Info and Relationships (Level A)
 * - Alternative Text: Logo images include alt text for screen readers
 * - Dark Mode Support: Light and dark variants
 *
 * **KRDS Standards:**
 * - Establishes credibility by identifying managing organization
 * - Must be nested within footer as final content section
 * - Logo represents operating agency (not service logo)
 * - Maintains subtle presentation to avoid excessive visual emphasis
 * - Only for official government digital services
 * - Two variants: light (default) and dark
 *
 * **Structure:**
 * - Container: .krds-identifier section
 * - Organization Logo: Agency branding with alt text
 * - Guidance Text: Service operation information
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Identifier
 *   organizationName="행정안전부"
 *   logo="/path/to/logo.png"
 *   logoAlt="행정안전부 로고"
 * />
 *
 * // Dark variant
 * <Identifier
 *   organizationName="행정안전부"
 *   logo="/path/to/logo.png"
 *   logoAlt="행정안전부 로고"
 *   variant="dark"
 * />
 *
 * // Custom logo element
 * <Identifier
 *   organizationName="행정안전부"
 *   logo={<CustomLogoSVG />}
 * />
 *
 * // In footer structure (recommended)
 * <footer>
 *   <!-- Other footer content -->
 *   <Identifier
 *     organizationName="행정안전부"
 *     logo="/logo.png"
 *     logoAlt="행정안전부 로고"
 *   />
 * </footer>
 * ```
 */
export const Identifier = React.forwardRef<HTMLElement, IdentifierProps>(
  (
    {
      organizationName,
      logo,
      logoAlt,
      variant = 'light',
      text = '이 누리집은 {organization}에서 운영합니다',
      className,
      ...props
    },
    ref
  ) => {
    const displayText = text.replace('{organization}', organizationName);

    // Validate logoAlt when logo is a string URL
    React.useEffect(() => {
      if (typeof logo === 'string' && !logoAlt) {
        console.warn(
          'Identifier: logoAlt is required when logo is a string URL for accessibility compliance.'
        );
      }
    }, [logo, logoAlt]);

    const variantStyles = {
      light: 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800',
      dark: 'bg-gray-900 border-gray-800',
    };

    const textStyles = {
      light: 'text-gray-700 dark:text-gray-300',
      dark: 'text-gray-300',
    };

    return (
      <section
        ref={ref}
        className={cn(
          'krds-identifier',
          'w-full',
          'border-t',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 min-h-[60px] py-4">
            {/* Logo */}
            {logo && (
              <div className="flex-shrink-0">
                {typeof logo === 'string' ? (
                  <img
                    src={logo}
                    alt={logoAlt || ''}
                    className="h-8 w-auto"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-8 flex items-center">{logo}</div>
                )}
              </div>
            )}

            {/* Text */}
            <p className={cn('text-sm font-medium', textStyles[variant])}>
              {displayText}
            </p>
          </div>
        </div>
      </section>
    );
  }
);

Identifier.displayName = 'Identifier';
