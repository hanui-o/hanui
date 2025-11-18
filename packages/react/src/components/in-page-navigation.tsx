'use client';

import React, { useState, useEffect } from 'react';
import styles from './in-page-navigation.module.scss';

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
      className={`${styles['krds-in-page-navigation-type']} ${className}`}
      {...props}
    >
      <div className={styles['krds-in-page-navigation-area']}>
        {/* Header */}
        <div className={styles['in-page-navigation-header']}>
          <p className={styles['quick-caption']}>{caption}</p>
          <p className={styles['quick-title']}>{title}</p>
        </div>

        {/* Navigation List */}
        <nav
          className={styles['in-page-navigation-list']}
          aria-label="In-page navigation"
        >
          <ul>
            {links.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className={activeLink === link.href ? styles.active : ''}
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
          <div className={styles['in-page-navigation-action']}>
            <button
              type="button"
              className="krds-btn medium"
              onClick={action.onClick}
            >
              {action.label}
            </button>
            {action.info && (
              <p
                className={styles['quick-info']}
                dangerouslySetInnerHTML={{ __html: action.info }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
