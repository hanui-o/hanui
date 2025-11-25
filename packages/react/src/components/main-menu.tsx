'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Main Menu Link Item
 */
export interface MainMenuLink {
  /**
   * Link label
   */
  label: string;

  /**
   * Link URL
   */
  href: string;

  /**
   * Description (optional)
   */
  description?: string;

  /**
   * Active state
   */
  active?: boolean;
}

/**
 * Main Menu Section (for dropdown with sections)
 */
export interface MainMenuSection {
  /**
   * Section title
   */
  title?: string;

  /**
   * Links in this section
   */
  links: MainMenuLink[];

  /**
   * Utility links (e.g., "View All")
   */
  utilityLinks?: MainMenuLink[];
}

/**
 * Main Menu Item
 */
export interface MainMenuItem {
  /**
   * Menu label
   */
  label: string;

  /**
   * Menu URL (for simple link without dropdown)
   */
  href?: string;

  /**
   * Active state
   */
  active?: boolean;

  /**
   * Sub-menu sections (for dropdown)
   */
  sections?: MainMenuSection[];

  /**
   * Simple children links (alternative to sections)
   */
  children?: MainMenuLink[];
}

/**
 * Main Menu Props
 */
export interface MainMenuProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Menu items
   */
  items: MainMenuItem[];

  /**
   * Current active path (for aria-current)
   */
  currentPath?: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Orientation
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical';
}

/**
 * Main Menu Component
 *
 * **Foundation Layer Features:**
 * - Required CSS Class: .krds-main-menu (KRDS mandatory)
 * - Keyboard Navigation: Tab, Enter, Esc
 * - WCAG 2.1 / KWCAG 2.2 Compliance
 * - Hierarchical structure with proper ARIA
 * - Focus management
 *
 * **KRDS Standards:**
 * - Primary navigation for service information structure
 * - Supports simple links and multi-level dropdowns
 * - Maximum 3 levels recommended
 * - Dropdown with titles and descriptions
 * - Utility links for related pages
 *
 * @example
 * ```tsx
 * // Simple horizontal menu
 * <MainMenu
 *   items={[
 *     { label: 'Home', href: '/', active: true },
 *     { label: 'About', href: '/about' },
 *     {
 *       label: 'Services',
 *       sections: [
 *         {
 *           title: 'Popular Services',
 *           links: [
 *             { label: 'Service A', href: '/services/a', description: 'Description' }
 *           ],
 *           utilityLinks: [
 *             { label: 'View All Services', href: '/services' }
 *           ]
 *         }
 *       ]
 *     }
 *   ]}
 * />
 * ```
 */
export const MainMenu = React.forwardRef<HTMLElement, MainMenuProps>(
  (
    { items, currentPath, className, orientation = 'horizontal', ...props },
    ref
  ) => {
    const [openDropdown, setOpenDropdown] = React.useState<number | null>(null);
    const menuRef = React.useRef<HTMLUListElement>(null);

    // Close dropdown on outside click
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target as Node)
        ) {
          setOpenDropdown(null);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle ESC key
    React.useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setOpenDropdown(null);
          setFocusedItem(-1);
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    const toggleDropdown = (index: number) => {
      setOpenDropdown(openDropdown === index ? null : index);
    };

    const handleKeyDown = (
      event: React.KeyboardEvent,
      index: number,
      hasDropdown: boolean
    ) => {
      switch (event.key) {
        case 'Enter':
        case ' ':
          if (hasDropdown) {
            event.preventDefault();
            toggleDropdown(index);
          }
          break;
        case 'ArrowDown':
          if (hasDropdown && openDropdown !== index) {
            event.preventDefault();
            setOpenDropdown(index);
          }
          break;
        case 'ArrowRight':
        case 'ArrowLeft':
          // Arrow key navigation for menu items
          // Future enhancement: focus management
          break;
      }
    };

    return (
      <nav
        ref={ref}
        className={cn('krds-main-menu', className)}
        aria-label="Main navigation"
        {...props}
      >
        <ul
          ref={menuRef}
          className={cn(
            'flex',
            orientation === 'horizontal'
              ? 'flex-row items-center gap-2'
              : 'flex-col gap-1'
          )}
        >
          {items.map((item, index) => {
            const hasDropdown = Boolean(item.sections || item.children);
            const isOpen = openDropdown === index;
            const isActive = item.active || item.href === currentPath;

            return (
              <li key={index} className="relative">
                {hasDropdown ? (
                  <>
                    {/* Dropdown trigger */}
                    <button
                      className={cn(
                        'gnb-main-trigger',
                        'px-4 py-2 font-medium rounded-md',
                        'transition-colors duration-200',
                        'hover:bg-krds-gray-10',
                        'focus:outline-none focus:ring-2 focus:ring-krds-primary-60 focus:ring-offset-2',
                        isActive && 'bg-krds-primary-10 text-krds-primary-60',
                        isOpen && 'bg-krds-gray-10'
                      )}
                      onClick={() => toggleDropdown(index)}
                      onKeyDown={(e) => handleKeyDown(e, index, true)}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span>{item.label}</span>
                      <svg
                        className={cn(
                          'inline-block ml-1 w-4 h-4 transition-transform',
                          isOpen && 'rotate-180'
                        )}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Dropdown content */}
                    {isOpen && (
                      <div
                        className={cn(
                          'absolute top-full left-0 mt-2 z-50',
                          'min-w-[280px] max-w-[400px]',
                          'bg-krds-white',
                          'border border-krds-gray-20',
                          'rounded-lg shadow-lg',
                          'animate-in fade-in-0 zoom-in-95 duration-200'
                        )}
                      >
                        {/* Render sections */}
                        {item.sections?.map((section, sIndex) => (
                          <div
                            key={sIndex}
                            className={cn(
                              'p-4',
                              sIndex > 0 && 'border-t border-krds-gray-20'
                            )}
                          >
                            {section.title && (
                              <h3 className="text-xs font-semibold text-krds-gray-60 uppercase tracking-wide mb-3">
                                {section.title}
                              </h3>
                            )}

                            <ul className="space-y-2">
                              {section.links.map((link, lIndex) => (
                                <li key={lIndex}>
                                  <a
                                    href={link.href}
                                    className={cn(
                                      'block px-3 py-2 rounded-md',
                                      'transition-colors',
                                      'hover:bg-krds-gray-5',
                                      link.active &&
                                        'bg-krds-primary-10 text-krds-primary-60'
                                    )}
                                    aria-current={
                                      link.active ? 'page' : undefined
                                    }
                                  >
                                    <div className="font-medium">
                                      {link.label}
                                    </div>
                                    {link.description && (
                                      <div className="text-xs text-krds-gray-60 mt-1">
                                        {link.description}
                                      </div>
                                    )}
                                  </a>
                                </li>
                              ))}
                            </ul>

                            {/* Utility links */}
                            {section.utilityLinks &&
                              section.utilityLinks.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-krds-gray-10">
                                  <ul className="space-y-1">
                                    {section.utilityLinks.map(
                                      (utilityLink, uIndex) => (
                                        <li key={uIndex}>
                                          <a
                                            href={utilityLink.href}
                                            className="block px-3 py-1.5 text-xs font-medium text-krds-primary-60 hover:underline"
                                          >
                                            {utilityLink.label} →
                                          </a>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}
                          </div>
                        ))}

                        {/* Simple children (alternative to sections) */}
                        {item.children && !item.sections && (
                          <div className="p-2">
                            <ul className="space-y-1">
                              {item.children.map((child, cIndex) => (
                                <li key={cIndex}>
                                  <a
                                    href={child.href}
                                    className={cn(
                                      'block px-3 py-2 rounded-md',
                                      'transition-colors',
                                      'hover:bg-krds-gray-5',
                                      child.active &&
                                        'bg-krds-primary-10 text-krds-primary-60'
                                    )}
                                    aria-current={
                                      child.active ? 'page' : undefined
                                    }
                                  >
                                    {child.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  /* Simple link */
                  <a
                    href={item.href}
                    className={cn(
                      'block px-4 py-2 font-medium rounded-md',
                      'transition-colors duration-200',
                      'hover:bg-krds-gray-10',
                      'focus:outline-none focus:ring-2 focus:ring-krds-primary-60 focus:ring-offset-2',
                      isActive && 'bg-krds-primary-10 text-krds-primary-60'
                    )}
                    onKeyDown={(e) => handleKeyDown(e, index, false)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
);

MainMenu.displayName = 'MainMenu';
