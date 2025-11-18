'use client';

import * as React from 'react';
import styles from './header.module.scss';

/**
 * Header Navigation Link
 */
export interface HeaderNavLink {
  label: string;
  href: string;
  active?: boolean;
  children?: HeaderNavLink[];
}

/**
 * Header Utility Link
 */
export interface HeaderUtilityLink {
  label: string;
  href: string;
  icon?: React.ReactElement;
}

/**
 * Header Props
 */
export interface HeaderProps {
  /**
   * Service name
   */
  serviceName: string;

  /**
   * Service logo
   */
  logo?: string | React.ReactElement;

  /**
   * Logo alt text (required if logo is string)
   */
  logoAlt?: string;

  /**
   * Home link href
   * @default "/"
   */
  homeHref?: string;

  /**
   * Utility navigation links (login, signup, etc.)
   */
  utilityLinks?: HeaderUtilityLink[];

  /**
   * Main navigation links
   */
  navLinks?: HeaderNavLink[];

  /**
   * Show search
   * @default false
   */
  showSearch?: boolean;

  /**
   * Search placeholder
   * @default "검색어를 입력하세요"
   */
  searchPlaceholder?: string;

  /**
   * Search submit handler
   */
  onSearch?: (query: string) => void;

  /**
   * Additional className
   */
  className?: string;

  /**
   * Sticky header
   * @default true
   */
  sticky?: boolean;
}

/**
 * Header Component
 *
 * **Foundation Layer Features:**
 * - Required ID: #krds-header (KRDS mandatory)
 * - KRDS Layout Structure: Utility Nav + Branding + Main Nav + Mobile Menu
 * - WCAG 2.1 / KWCAG 2.2 Compliance
 * - Responsive Design: Desktop/Tablet/Mobile
 * - Keyboard Navigation & Focus Management
 *
 * **KRDS Standards:**
 * - Government website header with official branding
 * - Contains service identity, utility links, and main navigation
 * - Supports multi-level navigation menus
 * - Mobile-responsive with hamburger menu
 * - Sticky positioning on scroll
 *
 * @example
 * ```tsx
 * <Header
 *   serviceName="국민건강보험공단"
 *   logo="/logo.svg"
 *   logoAlt="국민건강보험공단 로고"
 *   utilityLinks={[
 *     { label: '로그인', href: '/login' },
 *     { label: '회원가입', href: '/signup' }
 *   ]}
 *   navLinks={[
 *     { label: '소개', href: '/about' },
 *     {
 *       label: '서비스',
 *       href: '/services',
 *       children: [
 *         { label: '건강검진', href: '/services/checkup' },
 *         { label: '보험료 조회', href: '/services/premium' }
 *       ]
 *     }
 *   ]}
 *   showSearch
 * />
 * ```
 */
export const Header = React.forwardRef<HTMLElement, HeaderProps>(
  (
    {
      serviceName,
      logo,
      logoAlt,
      homeHref = '/',
      utilityLinks = [],
      navLinks = [],
      showSearch = false,
      searchPlaceholder = '검색어를 입력하세요',
      onSearch,
      className,
      sticky = true,
    },
    ref
  ) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [activeSubMenu, setActiveSubMenu] = React.useState<number | null>(
      null
    );
    const [isScrolled, setIsScrolled] = React.useState(false);

    // Handle scroll for sticky header
    React.useEffect(() => {
      if (!sticky) return;

      const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [sticky]);

    // Handle search submit
    const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (onSearch && searchQuery.trim()) {
        onSearch(searchQuery);
      }
    };

    // Toggle mobile menu
    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
      if (!isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    // Close mobile menu
    React.useEffect(() => {
      return () => {
        document.body.style.overflow = '';
      };
    }, []);

    return (
      <header
        id="krds-header"
        ref={ref}
        className={`${styles.krdsHeader} ${sticky ? styles.sticky : ''} ${
          isScrolled ? styles.scrolled : ''
        } ${className || ''}`}
      >
        {/* Utility Navigation */}
        {utilityLinks.length > 0 && (
          <div className={styles.headerUtil}>
            <div className={styles.inner}>
              <nav className={styles.utilNav}>
                <ul>
                  {utilityLinks.map((link, index) => (
                    <li key={index}>
                      <a href={link.href}>
                        {link.icon}
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        )}

        {/* Main Header */}
        <div className={styles.headerMain}>
          <div className={styles.inner}>
            {/* Branding */}
            <div className={styles.headerBrand}>
              <a href={homeHref} className={styles.logo}>
                <span className="sr-only">{serviceName}</span>
                {typeof logo === 'string' ? (
                  <img src={logo} alt={logoAlt || serviceName} />
                ) : (
                  logo
                )}
              </a>
            </div>

            {/* Desktop Navigation */}
            {navLinks.length > 0 && (
              <nav className={styles.headerNav} aria-label="주 메뉴">
                <ul className={styles.gnb}>
                  {navLinks.map((link, index) => (
                    <li
                      key={index}
                      className={link.children ? styles.hasSubmenu : ''}
                      onMouseEnter={() =>
                        link.children && setActiveSubMenu(index)
                      }
                      onMouseLeave={() => setActiveSubMenu(null)}
                    >
                      <a
                        href={link.href}
                        className={link.active ? styles.active : ''}
                        aria-expanded={
                          link.children ? activeSubMenu === index : undefined
                        }
                      >
                        {link.label}
                      </a>

                      {/* Sub Menu */}
                      {link.children && (
                        <ul
                          className={`${styles.subMenu} ${
                            activeSubMenu === index ? styles.show : ''
                          }`}
                        >
                          {link.children.map((subLink, subIndex) => (
                            <li key={subIndex}>
                              <a
                                href={subLink.href}
                                className={subLink.active ? styles.active : ''}
                              >
                                {subLink.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {/* Search */}
            {showSearch && (
              <div className={styles.headerSearch}>
                <form onSubmit={handleSearchSubmit}>
                  <input
                    type="search"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="검색"
                  />
                  <button type="submit" aria-label="검색 실행">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className={styles.mobileMenuToggle}
              onClick={toggleMobileMenu}
              aria-label="메뉴 열기"
              aria-expanded={isMobileMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuHeader}>
              <h2>{serviceName}</h2>
              <button
                onClick={toggleMobileMenu}
                aria-label="메뉴 닫기"
                className={styles.closeBtn}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <nav className={styles.mobileNav}>
              {/* Utility Links */}
              {utilityLinks.length > 0 && (
                <div className={styles.mobileUtil}>
                  <ul>
                    {utilityLinks.map((link, index) => (
                      <li key={index}>
                        <a href={link.href}>
                          {link.icon}
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Main Nav */}
              {navLinks.length > 0 && (
                <ul className={styles.mobileMainNav}>
                  {navLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className={link.active ? styles.active : ''}
                      >
                        {link.label}
                      </a>
                      {link.children && (
                        <ul className={styles.mobileSubNav}>
                          {link.children.map((subLink, subIndex) => (
                            <li key={subIndex}>
                              <a
                                href={subLink.href}
                                className={subLink.active ? styles.active : ''}
                              >
                                {subLink.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              {/* Mobile Search */}
              {showSearch && (
                <div className={styles.mobileSearchWrap}>
                  <form onSubmit={handleSearchSubmit}>
                    <input
                      type="search"
                      placeholder={searchPlaceholder}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      aria-label="검색"
                    />
                    <button type="submit" aria-label="검색 실행">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
              )}
            </nav>
          </div>
        )}

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className={styles.mobileOverlay}
            onClick={toggleMobileMenu}
            aria-hidden="true"
          />
        )}
      </header>
    );
  }
);

Header.displayName = 'Header';
