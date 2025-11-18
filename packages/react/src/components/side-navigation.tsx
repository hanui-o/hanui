'use client';

import React, { useState } from 'react';
import styles from './side-navigation.module.scss';

/**
 * Side Navigation Link Item
 */
export interface SideNavLink {
  /**
   * Link label
   */
  label: string;

  /**
   * Link URL
   */
  href: string;

  /**
   * Active state
   */
  active?: boolean;

  /**
   * Child links (3rd depth)
   */
  children?: SideNavLink[];
}

/**
 * Side Navigation Section (2nd depth)
 */
export interface SideNavSection {
  /**
   * Section label
   */
  label: string;

  /**
   * Section URL (optional, for toggle buttons)
   */
  href?: string;

  /**
   * Active state
   */
  active?: boolean;

  /**
   * Child links or nested sections
   */
  children?: SideNavLink[];
}

/**
 * Side Navigation Props
 */
export interface SideNavigationProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Navigation title (1st depth)
   */
  title: string;

  /**
   * Navigation sections (2nd depth)
   */
  sections: SideNavSection[];

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Side Navigation Component
 *
 * **KRDS Standards:**
 * - Side navigation for multi-level content structure
 * - Supports up to 4 depth levels
 * - Toggle buttons for expandable sections
 * - Active state indicators
 * - WCAG 2.1 / KWCAG 2.2 Compliance
 *
 * **Features:**
 * - Props-based API
 * - Self-contained CSS Module (SCSS)
 * - Keyboard navigation
 * - ARIA attributes
 * - Smooth animations
 *
 * @example
 * ```tsx
 * <SideNavigation
 *   title="주요 서비스"
 *   sections={[
 *     {
 *       label: '건강보험',
 *       children: [
 *         { label: '보험료 조회', href: '/insurance/fee', active: true },
 *         { label: '자격 득실 확인', href: '/insurance/status' }
 *       ]
 *     }
 *   ]}
 * />
 * ```
 */
export function SideNavigation({
  title,
  sections,
  className = '',
  ...props
}: SideNavigationProps) {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(
    new Set(
      sections
        .map((section, index) =>
          section.active || section.children?.some((child) => child.active)
            ? index
            : -1
        )
        .filter((index) => index >= 0)
    )
  );

  const [expandedSubItems, setExpandedSubItems] = useState<Set<string>>(
    new Set()
  );

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const toggleSubItem = (key: string) => {
    setExpandedSubItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      callback();
    }
  };

  return (
    <nav
      className={`${styles['krds-side-navigation']} ${className}`}
      {...props}
    >
      {/* 1st Depth: Title */}
      <h2 className={styles['lnb-tit']}>{title}</h2>

      {/* 2nd Depth: Sections */}
      <ul className={styles['lnb-list']} role="menubar">
        {sections.map((section, sectionIndex) => {
          const isExpanded = expandedSections.has(sectionIndex);
          const isActive =
            section.active || section.children?.some((child) => child.active);
          const hasChildren = section.children && section.children.length > 0;

          return (
            <li
              key={sectionIndex}
              className={`${styles['lnb-item']} ${isActive ? styles.active : ''}`}
              role="none"
            >
              {hasChildren ? (
                <>
                  {/* Toggle button for sections with children */}
                  <button
                    type="button"
                    className={`${styles['lnb-btn']} ${styles['lnb-toggle']}`}
                    onClick={() => toggleSection(sectionIndex)}
                    onKeyDown={(e) =>
                      handleKeyDown(e, () => toggleSection(sectionIndex))
                    }
                    aria-expanded={isExpanded}
                    aria-controls={`submenu-${sectionIndex}`}
                    role="menuitem"
                  >
                    {section.label}
                  </button>

                  {/* Submenu */}
                  <div
                    id={`submenu-${sectionIndex}`}
                    className={styles['lnb-submenu']}
                    style={{
                      display: isExpanded ? 'grid' : 'none',
                    }}
                  >
                    <ul role="menu">
                      {section.children!.map((child, childIndex) => {
                        const childKey = `${sectionIndex}-${childIndex}`;
                        const hasGrandChildren =
                          child.children && child.children.length > 0;
                        const isChildExpanded = expandedSubItems.has(childKey);

                        return (
                          <li
                            key={childIndex}
                            className={`${styles['lnb-subitem']} ${
                              child.active ? styles.active : ''
                            }`}
                            role="none"
                          >
                            {hasGrandChildren ? (
                              <>
                                {/* 3rd depth with toggle */}
                                <button
                                  type="button"
                                  className={`${styles['lnb-btn']} ${styles['lnb-toggle']} ${styles['lnb-btn-tit']}`}
                                  onClick={() => toggleSubItem(childKey)}
                                  onKeyDown={(e) =>
                                    handleKeyDown(e, () =>
                                      toggleSubItem(childKey)
                                    )
                                  }
                                  aria-expanded={isChildExpanded}
                                  aria-controls={`submenu-lv2-${childKey}`}
                                  aria-haspopup="true"
                                  role="menuitem"
                                >
                                  {child.label}
                                </button>

                                {/* 4th depth submenu */}
                                <div
                                  id={`submenu-lv2-${childKey}`}
                                  className={styles['lnb-submenu-lv2']}
                                  style={{
                                    display: isChildExpanded ? 'grid' : 'none',
                                  }}
                                >
                                  <ul role="menu">
                                    {child.children!.map(
                                      (grandChild, grandChildIndex) => (
                                        <li
                                          key={grandChildIndex}
                                          className={`${styles['lnb-subitem']} ${
                                            grandChild.active
                                              ? styles.active
                                              : ''
                                          }`}
                                          role="none"
                                        >
                                          <a
                                            href={grandChild.href}
                                            className={`${styles['lnb-btn']} ${styles['lnb-link']}`}
                                            aria-current={
                                              grandChild.active
                                                ? 'page'
                                                : undefined
                                            }
                                            role="menuitem"
                                          >
                                            {grandChild.label}
                                          </a>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </>
                            ) : (
                              /* 3rd depth link */
                              <a
                                href={child.href}
                                className={`${styles['lnb-btn']} ${styles['lnb-link']}`}
                                aria-current={child.active ? 'page' : undefined}
                                role="menuitem"
                              >
                                {child.label}
                              </a>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </>
              ) : (
                /* Section without children (simple link) */
                <a
                  href={section.href}
                  className={`${styles['lnb-btn']} ${styles['lnb-link']}`}
                  aria-current={section.active ? 'page' : undefined}
                  role="menuitem"
                >
                  {section.label}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
