'use client';

import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import styles from './side-navigation.module.scss';
import { cn } from '../../lib/utils';

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
  href?: string;

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
 * - Radix UI Accordion based
 * - Self-contained CSS Module (SCSS)
 * - Keyboard navigation
 * - ARIA attributes
 * - Smooth animations
 */
export function SideNavigation({
  title,
  sections,
  className = '',
  ...props
}: SideNavigationProps) {
  // Calculate default open items based on active state
  const defaultValue = sections
    .map((section, index) =>
      section.active || section.children?.some((child) => child.active)
        ? `section-${index}`
        : ''
    )
    .filter(Boolean);

  return (
    <nav className={cn(styles['krds-side-navigation'], className)} {...props}>
      {/* 1st Depth: Title */}
      <h2 className={styles['lnb-tit']}>{title}</h2>

      {/* 2nd Depth: Sections */}
      <ul role="menubar" className={styles['lnb-list']}>
        <Accordion.Root type="multiple" defaultValue={defaultValue}>
          {sections.map((section, sectionIndex) => {
            const isActive =
              section.active || section.children?.some((child) => child.active);
            const hasChildren = section.children && section.children.length > 0;
            const value = `section-${sectionIndex}`;

            return (
              <Accordion.Item
                key={sectionIndex}
                value={value}
                className={cn(styles['lnb-item'], isActive && styles.active)}
              >
                {hasChildren ? (
                  <>
                    {/* Toggle button for sections with children */}
                    <Accordion.Header asChild>
                      <Accordion.Trigger asChild>
                        <button
                          type="button"
                          className={cn(
                            styles['lnb-btn'],
                            styles['lnb-toggle']
                          )}
                          role="menuitem"
                        >
                          {section.label}
                        </button>
                      </Accordion.Trigger>
                    </Accordion.Header>

                    {/* Submenu */}
                    <Accordion.Content className={styles['lnb-submenu']}>
                      <ul role="menu">
                        {section.children!.map((child, childIndex) => {
                          const hasGrandChildren =
                            child.children && child.children.length > 0;
                          const childValue = `child-${sectionIndex}-${childIndex}`;

                          // For 3rd depth, we use a nested Accordion if it has children
                          if (hasGrandChildren) {
                            const isChildActive =
                              child.active ||
                              child.children?.some((c) => c.active);

                            return (
                              <li key={childIndex} role="none">
                                <Accordion.Root
                                  type="multiple"
                                  defaultValue={
                                    isChildActive ? [childValue] : []
                                  }
                                >
                                  <Accordion.Item
                                    value={childValue}
                                    className={cn(
                                      styles['lnb-subitem'],
                                      isChildActive && styles.active
                                    )}
                                  >
                                    <Accordion.Header asChild>
                                      <Accordion.Trigger asChild>
                                        <button
                                          type="button"
                                          className={cn(
                                            styles['lnb-btn'],
                                            styles['lnb-toggle-popup']
                                          )}
                                          role="menuitem"
                                          aria-haspopup="true"
                                        >
                                          {child.label}
                                        </button>
                                      </Accordion.Trigger>
                                    </Accordion.Header>

                                    <Accordion.Content
                                      className={styles['lnb-submenu-lv2']}
                                    >
                                      {/* 3Depth Title Button (Non-interactive visual title as per KRDS HTML) */}
                                      <button
                                        type="button"
                                        className={styles['lnb-btn-tit']}
                                      >
                                        {child.label}
                                      </button>
                                      <ul role="menu">
                                        {child.children!.map(
                                          (grandChild, grandChildIndex) => (
                                            <li
                                              key={grandChildIndex}
                                              role="none"
                                            >
                                              <a
                                                href={grandChild.href}
                                                className={cn(
                                                  styles['lnb-btn'],
                                                  grandChild.active &&
                                                    styles.active
                                                )}
                                                role="menuitem"
                                                aria-current={
                                                  grandChild.active
                                                    ? 'page'
                                                    : undefined
                                                }
                                              >
                                                {grandChild.label}
                                              </a>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </Accordion.Content>
                                  </Accordion.Item>
                                </Accordion.Root>
                              </li>
                            );
                          }

                          return (
                            <li
                              key={childIndex}
                              className={cn(
                                styles['lnb-subitem'],
                                child.active && styles.active
                              )}
                              role="none"
                            >
                              <a
                                href={child.href}
                                className={cn(
                                  styles['lnb-btn'],
                                  styles['lnb-link']
                                )}
                                aria-current={child.active ? 'page' : undefined}
                                role="menuitem"
                              >
                                {child.label}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </Accordion.Content>
                  </>
                ) : (
                  /* Section without children (simple link) */
                  <a
                    href={section.href}
                    className={cn(styles['lnb-btn'], styles['lnb-link'])}
                    aria-current={section.active ? 'page' : undefined}
                    role="menuitem"
                  >
                    {section.label}
                  </a>
                )}
              </Accordion.Item>
            );
          })}
        </Accordion.Root>
      </ul>
    </nav>
  );
}

/**
 * Sample Side Navigation Data
 */
export const SAMPLE_SIDE_NAVIGATION: SideNavSection[] = [
  {
    label: '2Depth-menu',
    children: [
      {
        label: '3Depth-menu',
        children: [
          { label: '4Depth', href: '#' },
          { label: '4Depth', href: '#' },
          { label: '4Depth', href: '#' },
        ],
      },
      { label: '3Depth-link', href: '#' },
      { label: '3Depth-link', href: '#' },
    ],
  },
  {
    label: '2Depth-menu',
    children: [
      {
        label: '3Depth-menu',
        children: [
          { label: '4Depth', href: '#' },
          { label: '4Depth', href: '#' },
          { label: '4Depth', href: '#' },
        ],
      },
      { label: '3Depth-link', href: '#' },
      { label: '3Depth-link', href: '#' },
    ],
  },
  {
    label: '2Depth-menu',
    children: [
      {
        label: '3Depth-menu',
        children: [
          { label: '4Depth', href: '#' },
          { label: '4Depth', href: '#' },
          { label: '4Depth', href: '#' },
        ],
      },
      { label: '3Depth-link', href: '#' },
      { label: '3Depth-link', href: '#' },
    ],
  },
];
