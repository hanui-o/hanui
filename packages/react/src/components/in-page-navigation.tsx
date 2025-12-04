'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';

/**
 * In-page Navigation Link Item
 */
export interface InPageNavLink {
  /**
   * Link label
   */
  label: string;

  /**
   * Link URL (anchor)
   */
  href: string;

  /**
   * Active state
   */
  active?: boolean;
}

/**
 * In-page Navigation Props
 */
export interface InPageNavigationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Caption text (위 작은 텍스트)
   */
  caption: string;

  /**
   * Title text (주요 제목)
   */
  title: string;

  /**
   * Navigation links
   */
  links: InPageNavLink[];

  /**
   * Action button configuration (optional)
   */
  action?: {
    /**
     * Button label
     */
    label: string;

    /**
     * Button click handler
     */
    onClick: () => void;

    /**
     * Info text below button (optional)
     */
    info?: string;
  };

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * In-page Navigation Component
 *
 * **KRDS Standards:**
 * - Fixed sidebar navigation for long-form content
 * - Anchor-based in-page navigation
 * - Active state tracking based on scroll position
 * - Responsive: fixed on desktop, static on mobile
 * - WCAG 2.1 / KWCAG 2.2 Compliance
 *
 * **Features:**
 * - Props-based API
 * - Self-contained CSS Module (SCSS)
 * - Automatic active state based on scroll
 * - Optional action button
 * - Keyboard navigation
 * - ARIA attributes
 *
 * @example
 * ```tsx
 * <InPageNavigation
 *   caption="이 페이지의 구성"
 *   title="장애아동수당"
 *   links={[
 *     { label: '서비스 개요', href: '#section_01', active: true },
 *     { label: '서비스 상세', href: '#section_02' },
 *     { label: '신청 방법 및 절차', href: '#section_03' }
 *   ]}
 *   action={{
 *     label: '온라인 신청하기',
 *     onClick: () => console.log('Apply'),
 *     info: '장애아동수당 외 1건'
 *   }}
 * />
 * ```
 */
export function InPageNavigation({
  caption,
  title,
  links,
  action,
  className = '',
  ...props
}: InPageNavigationProps) {
  const [activeLink, setActiveLink] = useState<string>(
    links.find((link) => link.active)?.href || links[0]?.href || ''
  );

  // Track scroll position and update active link
  useEffect(() => {
    const handleScroll = () => {
      const sections = links
        .map((link) => {
          const id = link.href.replace('#', '');
          const element = document.getElementById(id);
          return element
            ? {
                id: link.href,
                top: element.getBoundingClientRect().top,
              }
            : null;
        })
        .filter(Boolean) as { id: string; top: number }[];

      // Find the section closest to the top of the viewport
      const current =
        sections.find((section) => section.top >= 0) ||
        sections[sections.length - 1];

      if (current) {
        setActiveLink(current.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [links]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setActiveLink(href);

    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update URL hash without triggering scroll
      window.history.pushState(null, '', href);
    }
  };

  return (
    <div
      className={cn(
        'relative w-full mb-8',
        'lg:fixed lg:top-[120px] lg:right-0 lg:w-[280px] lg:z-[100] lg:mb-0',
        'xl:w-[320px]',
        'print:hidden',
        className
      )}
      {...props}
    >
      <div className="bg-krds-white p-6">
        {/* Header */}
        <div className="mb-5 pb-4 border-b border-krds-gray-20">
          <p className="text-krds-body-sm font-medium text-krds-gray-70 m-0 mb-2 tracking-tight">
            {caption}
          </p>
          <p className="text-lg font-bold text-krds-gray-90 m-0 leading-[1.4] tracking-tight">
            {title}
          </p>
        </div>

        {/* Navigation List */}
        <nav className="mb-5" aria-label="In-page navigation">
          <ul className="list-none p-0 m-0">
            {links.map((link, index) => (
              <li key={index} className="m-0 p-0 last:mb-0 mb-1">
                <a
                  href={link.href}
                  className={cn(
                    'block py-2.5 px-3 text-[15px] font-medium text-krds-gray-70 no-underline rounded-md transition-all leading-[1.5] tracking-tight relative',
                    'hover:text-krds-primary-60 hover:bg-krds-primary-5',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-krds-primary-60 focus-visible:outline-offset-2',
                    activeLink === link.href &&
                      'text-krds-primary-80 bg-krds-primary-5 font-bold'
                  )}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  aria-current={
                    activeLink === link.href ? 'location' : undefined
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action */}
        {action && (
          <div className="pt-4 border-t border-krds-gray-20">
            <button
              type="button"
              className="w-full inline-flex items-center justify-center px-4 py-3 text-[15px] font-semibold text-white bg-krds-primary-60 rounded-md hover:bg-krds-primary-70 active:bg-krds-primary-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-krds-primary-60 focus-visible:outline-offset-2 transition-all tracking-tight"
              onClick={action.onClick}
            >
              {action.label}
            </button>
            {action.info && (
              <p
                className="text-krds-body-sm text-krds-gray-70 mt-2 mb-0 text-center leading-[1.4]"
                dangerouslySetInnerHTML={{ __html: action.info }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
