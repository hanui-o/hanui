'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * SkipLink Variant Types
 */
export type SkipLinkVariant = 'visible' | 'hidden';

/**
 * SkipLink Link Item
 */
export interface SkipLinkItem {
  /**
   * Link destination (href)
   */
  href: string;

  /**
   * Link label text
   */
  label: string;
}

/**
 * SkipLink Props
 */
export interface SkipLinkProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Array of skip link items (max 3 recommended)
   */
  links: SkipLinkItem[];

  /**
   * Visual variant
   * @default "hidden"
   */
  variant?: SkipLinkVariant;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * SkipLink Component (건너뛰기 링크)
 *
 * **Foundation Layer Features:**
 * - ✅ Required CSS ID: #krds-skip-link (KRDS mandatory)
 * - ✅ Keyboard Navigation: Tab and Enter keys
 * - ✅ WCAG 2.1 / KWCAG 2.2 Compliance: Bypass Blocks (Level A), Focus Visible (Level AA)
 * - ✅ Focus Management: Automatic scroll to destination
 * - ✅ Screen Reader Support: Semantic navigation landmarks
 *
 * **KRDS Standards:**
 * - Allows keyboard and screen reader users to bypass repetitive content
 * - Must be the first element in page (except after cookie banners/modals)
 * - Maximum 3 links recommended
 * - Two variants: visible (always shown) and hidden (shows on focus)
 * - Focus must scroll to destination and be visually distinct
 * - Links must be keyboard accessible (Tab and Enter)
 *
 * **Structure:**
 * - Container: #krds-skip-link navigation element
 * - Links: Anchor elements with focus indicators
 *
 * @example
 * ```tsx
 * // Basic usage (hidden variant)
 * <SkipLink
 *   links={[
 *     { href: '#main-content', label: '본문 바로가기' },
 *     { href: '#main-navigation', label: '주 메뉴 바로가기' },
 *   ]}
 * />
 *
 * // Visible variant
 * <SkipLink
 *   variant="visible"
 *   links={[
 *     { href: '#main-content', label: '본문 바로가기' },
 *     { href: '#main-navigation', label: '주 메뉴 바로가기' },
 *     { href: '#footer', label: '하단 메뉴 바로가기' },
 *   ]}
 * />
 *
 * // Recommended page structure
 * <body>
 *   <SkipLink links={[{ href: '#main-content', label: '본문 바로가기' }]} />
 *   <Masthead />
 *   <header>...</header>
 *   <main id="main-content" tabIndex={-1}>...</main>
 *   <footer>...</footer>
 * </body>
 * ```
 */
export const SkipLink = React.forwardRef<HTMLDivElement, SkipLinkProps>(
  ({ links, variant = 'hidden', className, ...props }, ref) => {
    // Validate max 3 links
    React.useEffect(() => {
      if (links.length > 3) {
        console.warn(
          'SkipLink: Maximum 3 links recommended for optimal accessibility. Current count:',
          links.length
        );
      }
    }, [links]);

    const handleClick = (
      e: React.MouseEvent<HTMLAnchorElement>,
      href: string
    ) => {
      e.preventDefault();

      // Find target element
      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Set focus on target element
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus();

        // Scroll to target element
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        // Update URL hash without triggering scroll
        if (window.history.pushState) {
          window.history.pushState(null, '', href);
        } else {
          window.location.hash = href;
        }
      }
    };

    const variantStyles = {
      visible: 'relative',
      hidden: 'absolute -top-full left-0 focus-within:top-0',
    };

    return (
      <nav
        ref={ref}
        id="krds-skip-link"
        aria-label="Skip navigation"
        className={cn(
          'w-full',
          'bg-blue-600',
          'z-50',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-4 min-h-[48px] py-2">
            {links.map((link, index) => (
              <li key={`${link.href}-${index}`}>
                <a
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={cn(
                    'inline-block',
                    'px-4 py-2',
                    'text-sm font-medium',
                    'text-white',
                    'bg-blue-700',
                    'rounded',
                    'transition-colors',
                    'hover:bg-blue-800',
                    'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600',
                    variant === 'hidden' &&
                      'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600'
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }
);

SkipLink.displayName = 'SkipLink';
