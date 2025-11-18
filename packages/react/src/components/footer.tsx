'use client';

import * as React from 'react';
import { Identifier } from './Identifier';
import styles from './footer.module.scss';

/**
 * Footer Quick Link
 */
export interface FooterQuickLink {
  label: string;
  href: string;
}

/**
 * Footer Info Item
 */
export interface FooterInfoItem {
  label: string;
  value: string;
}

/**
 * Footer Link
 */
export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

/**
 * Footer Social Link
 */
export interface FooterSocialLink {
  platform: 'instagram' | 'youtube' | 'x' | 'facebook' | 'blog';
  href: string;
  label?: string;
}

/**
 * Footer Props
 */
export interface FooterProps {
  /**
   * Organization name
   */
  organizationName: string;

  /**
   * Organization logo
   */
  logo?: string | React.ReactElement;

  /**
   * Logo alt text (required if logo is string)
   */
  logoAlt?: string;

  /**
   * Address
   */
  address: string;

  /**
   * Contact info items
   */
  contactInfo?: FooterInfoItem[];

  /**
   * Quick links (관련 사이트)
   */
  quickLinks?: FooterQuickLink[];

  /**
   * Utility links (오시는 길, 이용안내 등)
   */
  utilityLinks?: FooterLink[];

  /**
   * Social media links
   */
  socialLinks?: FooterSocialLink[];

  /**
   * Footer menu links (개인정보처리방침 등)
   */
  menuLinks?: FooterLink[];

  /**
   * Copyright text
   */
  copyright?: string;

  /**
   * Show identifier section
   * @default true
   */
  showIdentifier?: boolean;

  /**
   * Identifier variant
   * @default "light"
   */
  identifierVariant?: 'light' | 'dark';

  /**
   * Additional className
   */
  className?: string;
}

/**
 * Footer Component
 *
 * **Foundation Layer Features:**
 * - Required ID: #krds-footer (KRDS mandatory)
 * - KRDS Layout Structure: Quick Links + Logo + Info + Links + Bottom
 * - WCAG 2.1 / KWCAG 2.2 Compliance
 * - Responsive Design: Desktop/Tablet/Mobile
 *
 * **KRDS Standards:**
 * - Government website footer with official branding
 * - Contains organization info, contact, links, and identifier
 * - Consistent layout across all government services
 *
 * @example
 * ```tsx
 * <Footer
 *   organizationName="국민건강보험공단"
 *   address="(26464) 강원특별자치도 원주시 건강로 32(반곡동)"
 *   contactInfo={[
 *     { label: '대표전화', value: '1577-1000' },
 *     { label: '팩스', value: '033-811-2000' }
 *   ]}
 *   quickLinks={[
 *     { label: '건강iN', href: 'https://hi.nhis.or.kr' },
 *     { label: '사회보험통합징수포털', href: 'https://si4n.nhis.or.kr' }
 *   ]}
 * />
 * ```
 */
export const Footer = React.forwardRef<HTMLElement, FooterProps>(
  (
    {
      organizationName,
      logo,
      logoAlt,
      address,
      contactInfo = [],
      quickLinks = [],
      utilityLinks = [],
      socialLinks = [],
      menuLinks = [],
      copyright,
      showIdentifier = true,
      identifierVariant = 'light',
      className,
    },
    ref
  ) => {
    const [isQuickLinksExpanded, setIsQuickLinksExpanded] =
      React.useState(false);

    // Social platform icons map
    const socialIcons: Record<string, string> = {
      instagram:
        'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
      youtube:
        'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
      x: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
      facebook:
        'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
      blog: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    };

    return (
      <footer id="krds-footer" ref={ref} className={styles.krdsFooter}>
        {/* Quick Links Section */}
        {quickLinks.length > 0 && (
          <div className={styles.footQuick}>
            <div className={styles.inner}>
              <button
                className={styles.link}
                onClick={() => setIsQuickLinksExpanded(!isQuickLinksExpanded)}
                aria-expanded={isQuickLinksExpanded}
              >
                관련 사이트
              </button>
              {isQuickLinksExpanded && (
                <ul className={styles.quickList}>
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className={styles.inner}>
          {/* Logo */}
          {logo && (
            <div className={styles.fLogo}>
              <span className="sr-only">{organizationName}</span>
              {typeof logo === 'string' ? (
                <img src={logo} alt={logoAlt || organizationName} />
              ) : (
                logo
              )}
            </div>
          )}

          {/* Content Area */}
          <div className={styles.fCnt}>
            {/* Info Section */}
            <div className={styles.fInfo}>
              <p className={styles.infoAddr}>{address}</p>
              {contactInfo.length > 0 && (
                <ul className={styles.infoCs}>
                  {contactInfo.map((item, index) => (
                    <li key={index}>
                      <strong>{item.label}</strong>
                      <span>{item.value}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Links Section */}
            {(utilityLinks.length > 0 || socialLinks.length > 0) && (
              <div className={styles.fLink}>
                {/* Utility Links */}
                {utilityLinks.length > 0 && (
                  <div className={styles.linkGo}>
                    {utilityLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        className="krds-btn medium text"
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}

                {/* Social Links */}
                {socialLinks.length > 0 && (
                  <div className={styles.linkSns}>
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        className={`krds-btn xlarge icon border ${styles.snsBtn}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label || social.platform}
                      >
                        <svg
                          className={styles.svgIcon}
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d={socialIcons[social.platform]} />
                        </svg>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Section */}
          <div className={styles.fBtm}>
            <div className={styles.fBtmText}>
              {/* Footer Menu */}
              {menuLinks.length > 0 && (
                <ul className={styles.fMenu}>
                  {menuLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {/* Copyright */}
              {copyright && <p className={styles.fCopy}>{copyright}</p>}
            </div>

            {/* Identifier */}
            {showIdentifier && (
              <Identifier
                organizationName={organizationName}
                variant={identifierVariant}
              />
            )}
          </div>
        </div>
      </footer>
    );
  }
);

Footer.displayName = 'Footer';
