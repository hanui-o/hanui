'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { useHeaderLogic } from './useHeaderLogic';
import styles from './header.module.scss';

/**
 * Header Props Interface
 */
export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Service logo source
   */
  logoSrc: string;

  /**
   * Service logo alt text (required for accessibility)
   */
  logoAlt: string;

  /**
   * Service logo link href
   * @default "/"
   */
  logoHref?: string;

  /**
   * Service slogan text (optional)
   */
  slogan?: string;

  /**
   * Utility links (login, signup, etc.)
   */
  utilityLinks?: Array<{
    href: string;
    label: string;
  }>;

  /**
   * Main navigation menu items
   */
  menuItems?: Array<{
    href: string;
    label: string;
    submenu?: Array<{
      href: string;
      label: string;
    }>;
  }>;

  /**
   * Additional className for header element
   */
  className?: string;

  /**
   * Children for custom header content
   */
  children?: React.ReactNode;
}

/**
 * Header Component (헤더)
 *
 * **Foundation Layer Features:**
 * - Required ID: #krds-header (KRDS mandatory)
 * - Semantic HTML: header element with proper ARIA attributes
 * - WCAG 2.1 / KWCAG 2.2 Compliance: Keyboard navigation, focus management
 * - Screen Reader Support: Proper ARIA labels and semantic structure
 * - Visual Hierarchy: Consistent spacing and color system
 *
 * **KRDS Standards:**
 * - Provides consistent navigation and branding across government websites
 * - Contains service branding, utility links, search, and main navigation
 * - Responsive design for desktop and mobile
 * - Required positioning at top of page
 * - Supports multi-level navigation menus
 *
 * @example
 * ```tsx
 * <Header
 *   logoSrc="/logo.svg"
 *   logoAlt="정부 서비스"
 *   logoHref="/"
 *   slogan="국민을 위한 서비스"
 *   utilityLinks={[
 *     { href: '/login', label: '로그인' },
 *     { href: '/signup', label: '회원가입' },
 *   ]}
 *   menuItems={[
 *     { href: '/about', label: '소개' },
 *     { href: '/services', label: '서비스' },
 *     {
 *       href: '/support',
 *       label: '지원',
 *       submenu: [
 *         { href: '/support/faq', label: 'FAQ' },
 *         { href: '/support/contact', label: '문의' },
 *       ],
 *     },
 *   ]}
 * />
 * ```
 */
export const Header = React.forwardRef<HTMLElement, HeaderProps>(
  (
    {
      logoSrc,
      logoAlt,
      logoHref = '/',
      slogan,
      utilityLinks = [],
      menuItems = [],
      className,
      children,
      ...props
    },
    ref
  ) => {
    const {
      isMobileMenuOpen,
      mobileNavRef,
      mobileMenuButtonRef,
      toggleMobileMenu,
      closeMobileMenu,
      handleOverlayClick,
      toggleSubmenu,
      isSubmenuOpen,
      getAriaAttributes,
    } = useHeaderLogic();

    const ariaAttrs = getAriaAttributes();

    // Custom children이 제공되면 사용자 정의 헤더 렌더링
    if (children) {
      return (
        <header
          id="krds-header"
          ref={ref}
          className={cn(styles.header, className)}
          {...props}
        >
          {children}
        </header>
      );
    }

    // KRDS 표준 헤더 구조 렌더링
    return (
      <header
        id="krds-header"
        ref={ref}
        className={cn(styles.header, className)}
        {...props}
      >
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className={styles.skipLink}>
          본문으로 바로가기
        </a>

        <div className={styles.headerContainer}>
          {/* Utility Area (상단 유틸리티 영역) */}
          {utilityLinks.length > 0 && (
            <div className={styles.headerUtility}>
              {utilityLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className={styles.headerUtilityLink}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {/* Branding & Actions Row */}
          <div className={styles.headerBrandingRow}>
            {/* Branding (로고 + 슬로건) */}
            <div className={styles.headerBranding}>
              <a href={logoHref} className={styles.headerLogo}>
                <img src={logoSrc} alt={logoAlt} />
              </a>
              {slogan && <span className={styles.headerSlogan}>{slogan}</span>}
            </div>

            {/* Actions (검색, 햄버거 버튼 등) */}
            <div className={styles.headerActions}>
              {/* Mobile Menu Button */}
              <button
                ref={mobileMenuButtonRef}
                type="button"
                className={styles.mobileMenuButton}
                onClick={toggleMobileMenu}
                {...ariaAttrs.mobileMenuButton}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
                <span className={styles.srOnly}>
                  {ariaAttrs.mobileMenuButton['aria-label']}
                </span>
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          {menuItems.length > 0 && (
            <nav className={styles.headerNav} {...ariaAttrs.desktopNav}>
              <ul>
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <a href={item.href}>{item.label}</a>
                    {item.submenu && item.submenu.length > 0 && (
                      <ul className={styles.submenu}>
                        {item.submenu.map((subitem, subindex) => (
                          <li key={subindex}>
                            <a href={subitem.href}>{subitem.label}</a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        {/* Mobile Navigation */}
        <div
          ref={mobileNavRef}
          className={cn(styles.mobileNav, {
            [styles.isOpen]: isMobileMenuOpen,
          })}
          {...ariaAttrs.mobileNav}
        >
          <div
            className={styles.mobileNavOverlay}
            onClick={handleOverlayClick}
          />
          <div className={styles.mobileNavPanel} data-mobile-panel>
            {/* Mobile Nav Header */}
            <div className={styles.mobileNavHeader}>
              <span className={styles.headerSlogan}>{slogan || logoAlt}</span>
              <button
                type="button"
                className={styles.mobileNavClose}
                onClick={closeMobileMenu}
                aria-label="메뉴 닫기"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Mobile Nav Menu */}
            <div className={styles.mobileNavMenu}>
              <ul>
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <a href={item.href} onClick={closeMobileMenu}>
                      {item.label}
                    </a>
                    {item.submenu && item.submenu.length > 0 && (
                      <ul className={styles.submenu}>
                        {item.submenu.map((subitem, subindex) => (
                          <li key={subindex}>
                            <a href={subitem.href} onClick={closeMobileMenu}>
                              {subitem.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>
    );
  }
);

Header.displayName = 'Header';
