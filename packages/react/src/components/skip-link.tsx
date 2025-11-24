'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

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
 * Default skip link items
 */
const DEFAULT_LINKS: SkipLinkItem[] = [
  { href: '#gnb', label: '주메뉴 바로가기' },
  { href: '#breadcrumb', label: '본문 바로가기' },
];

/**
 * SkipLink Component
 *
 * **Foundation Layer Features:**
 * - Required CSS ID: #krds-skip-link (KRDS mandatory)
 * - Keyboard Navigation: Tab and Enter keys
 * - WCAG 2.1 / KWCAG 2.2 Compliance: Bypass Blocks (Level A), Focus Visible (Level AA)
 * - Focus Management: Automatic scroll to destination
 * - Screen Reader Support: Semantic navigation landmarks
 *
 * **KRDS Standards:**
 * - Allows keyboard and screen reader users to bypass repetitive content
 * - Must be the first element in page (except after cookie banners/modals)
 * - Maximum 3 links recommended
 * - Two variants: visible (always shown) and hidden (shows on focus)
 * - Focus must scroll to destination and be visually distinct
 * - Links must be keyboard accessible (Tab and Enter)
 */

export const SkipLink = React.forwardRef<HTMLDivElement, SkipLinkProps>(
  ({ variant = 'hidden', className, ...props }, ref) => {
    // Validate max 3 links
    React.useEffect(() => {
      if (process.env.NODE_ENV === 'development' && DEFAULT_LINKS.length > 3) {
        console.warn(
          'SkipLink: Maximum 3 links recommended for optimal accessibility. Current count:',
          DEFAULT_LINKS.length
        );
      }
    }, []);

    const handleClick = (
      e: React.MouseEvent<HTMLAnchorElement>,
      href: string
    ) => {
      e.preventDefault();

      // Find target element
      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Scroll to target element first
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        // Find first focusable element inside container
        const firstFocusable = targetElement.querySelector(
          'button:not([disabled]), [href]:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement;

        // Use setTimeout to ensure focus happens after scroll
        setTimeout(() => {
          if (firstFocusable) {
            firstFocusable.focus();
          } else {
            targetElement.setAttribute('tabindex', '-1');
            targetElement.focus();
          }
        }, 100);

        // Update URL hash without triggering scroll
        if (window.history.pushState) {
          window.history.pushState(null, '', href);
        } else {
          // eslint-disable-next-line
          window.location.hash = href;
        }
      }
    };

    return (
      <div
        ref={ref}
        id="krds-skip-link"
        className={cn(variant === 'visible' ? 'type2' : 'type1', className)}
        {...props}
      >
        {DEFAULT_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleClick(e, link.href)}
            className="fixed left-0 -top-full z-[9999] w-full bg-black text-white px-4 py-1 focus:top-0 text-sm text-center"
          >
            {link.label}
          </a>
        ))}
      </div>
    );
  }
);

SkipLink.displayName = 'SkipLink';
