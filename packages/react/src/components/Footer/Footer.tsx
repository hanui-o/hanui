'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { Identifier, type IdentifierProps } from '../Identifier';

/**
 * Footer Context
 */
interface FooterContextValue {
  variant?: 'default' | 'compact';
}

const FooterContext = React.createContext<FooterContextValue>({
  variant: 'default',
});

/**
 * Footer Props Interface
 */
export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Footer variant
   * @default "default"
   */
  variant?: 'default' | 'compact';

  /**
   * Footer content (compound components)
   */
  children?: React.ReactNode;

  /**
   * Additional className
   */
  className?: string;
}

/**
 * Footer Component (푸터)
 *
 * **Foundation Layer Features:**
 * - Required ID: #krds-footer (KRDS mandatory)
 * - Semantic HTML: footer element with proper ARIA attributes
 * - WCAG 2.1 / KWCAG 2.2 Compliance: Info and Relationships (Level A)
 * - Screen Reader Support: Proper ARIA labels and semantic structure
 * - Visual Hierarchy: Consistent spacing and color system
 *
 * **KRDS Standards:**
 * - Provides consistent footer structure across government websites
 * - Contains service logo, contact info, utility links, policy links, and copyright
 * - Responsive design for desktop and mobile
 * - Required positioning at bottom of page
 * - Information order: Logo → Contact → Utility Links → Policy Links → Copyright → Identifier
 *
 * @example
 * ```tsx
 * <Footer>
 *   <Footer.QuickLinks
 *     links={[
 *       { label: '관련 사이트 1', href: '/site1' },
 *     ]}
 *   />
 *   <Footer.Logo src="/logo.svg" alt="서비스 로고" />
 *   <Footer.Content>
 *     <Footer.Info address="주소" />
 *     <Footer.Links>...</Footer.Links>
 *   </Footer.Content>
 *   <Footer.Bottom>
 *     <Footer.PolicyLinks links={[...]} />
 *     <Footer.Copyright>© 2023</Footer.Copyright>
 *   </Footer.Bottom>
 * </Footer>
 * ```
 */
const FooterBase = React.forwardRef<HTMLElement, FooterProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    return (
      <FooterContext.Provider value={{ variant }}>
        <footer
          id="krds-footer"
          ref={ref}
          className={cn(
            'relative z-50',
            'bg-gray-50 dark:bg-gray-900',
            'transition-colors duration-200',
            className
          )}
          {...props}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </footer>
      </FooterContext.Provider>
    );
  }
);
FooterBase.displayName = 'Footer';

/**
 * Footer.QuickLinks Props Interface
 */
export interface FooterQuickLinksProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Quick links array
   */
  links?: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
    'aria-label'?: string;
  }>;

  /**
   * Additional className
   */
  className?: string;

  /**
   * Children (alternative to links prop)
   */
  children?: React.ReactNode;
}

/**
 * Footer.QuickLinks Component
 *
 * Related site links section (.foot-quick)
 * KRDS compliant with border and responsive layout
 */
const FooterQuickLinks = React.forwardRef<
  HTMLDivElement,
  FooterQuickLinksProps
>(({ links, className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'foot-quick',
        'border-t border-b border-gray-200 dark:border-gray-800',
        'bg-white dark:bg-gray-900',
        className
      )}
      {...props}
    >
      <div className="inner flex flex-col md:flex-row">
        {links?.map((link, index) => (
          <FooterQuickLink key={index} {...link} />
        ))}
        {children}
      </div>
    </div>
  );
});
FooterQuickLinks.displayName = 'Footer.QuickLinks';

/**
 * Footer.QuickLink Props Interface
 */
export interface FooterQuickLinkProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Link label
   */
  label?: string;

  /**
   * Link href (if provided, renders as anchor)
   */
  href?: string;

  /**
   * Click handler (if provided without href, renders as button)
   */
  onClick?: () => void;

  /**
   * Additional className
   */
  className?: string;

  /**
   * Children (alternative to label)
   */
  children?: React.ReactNode;
}

/**
 * Footer.QuickLink Component
 *
 * Individual quick link button
 * KRDS compliant styling with plus icon
 */
const FooterQuickLink = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  FooterQuickLinkProps
>(({ label, href, onClick, className, children, ...props }, ref) => {
  const content = label || children;

  const baseStyles = cn(
    'inline-flex items-center justify-between',
    'flex-1 gap-3',
    'h-[calc(2rem-0.2rem)]',
    'px-6 md:px-8',
    'bg-gray-100 dark:bg-gray-800',
    'transition-colors',
    'hover:bg-gray-200 dark:hover:bg-gray-700',
    'active:bg-gray-300 dark:active:bg-gray-600',
    'focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400',
    'text-sm md:text-base',
    className
  );

  const responsiveStyles = cn(
    // Desktop styles
    'hidden md:flex',
    'md:border-r md:border-gray-200 md:dark:border-gray-700',
    'md:first:border-l md:first:border-gray-200 md:dark:first:border-gray-700',
    // Mobile styles
    'flex md:hidden',
    'min-h-[calc(1.75rem-0.2rem)]',
    'border-0',
    '[&:not(:first-child)]:border-t [&:not(:first-child)]:border-gray-200 dark:[&:not(:first-child)]:border-gray-700'
  );

  const iconElement = (
    <span className="flex-shrink-0 w-4 h-4" aria-hidden="true">
      <svg
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
      >
        <path
          d="M8 3v10M3 8h10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={cn(baseStyles, responsiveStyles)}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        <span>{content}</span>
        {iconElement}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      className={cn(baseStyles, responsiveStyles)}
      {...props}
    >
      <span>{content}</span>
      {iconElement}
    </button>
  );
});
FooterQuickLink.displayName = 'Footer.QuickLink';

/**
 * Footer.Logo Props Interface
 */
export interface FooterLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Logo image source
   */
  src?: string;

  /**
   * Logo alt text (required for accessibility)
   */
  alt?: string;

  /**
   * Logo link href
   */
  href?: string;

  /**
   * Custom logo element (alternative to src)
   */
  children?: React.ReactNode;

  /**
   * Additional className
   */
  className?: string;
}

/**
 * Footer.Logo Component
 *
 * Service logo (.f-logo)
 * KRDS compliant with proper alt text for accessibility
 */
const FooterLogo = React.forwardRef<HTMLDivElement, FooterLogoProps>(
  ({ src, alt, href, className, children, ...props }, ref) => {
    const logoContent =
      children ||
      (src ? (
        <img
          src={src}
          alt={alt || '서비스 로고'}
          className="h-7 w-auto md:h-8 md:w-[13.7rem] object-contain"
          loading="lazy"
        />
      ) : null);

    if (href && logoContent) {
      return (
        <a
          href={href}
          className={cn(
            'f-logo',
            'block',
            'h-7 w-auto md:h-8 md:w-[13.7rem]',
            'focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 rounded',
            className
          )}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {logoContent}
        </a>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          'f-logo',
          'h-7 w-auto md:h-8 md:w-[13.7rem]',
          'bg-contain bg-center bg-no-repeat',
          className
        )}
        {...props}
      >
        {logoContent}
      </div>
    );
  }
);
FooterLogo.displayName = 'Footer.Logo';

/**
 * Footer.Content Props Interface
 */
export interface FooterContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content children
   */
  children: React.ReactNode;

  /**
   * Additional className
   */
  className?: string;
}

/**
 * Footer.Content Component
 *
 * Main content wrapper (.f-cnt)
 * Contains Info and Links sections
 */
const FooterContent = React.forwardRef<HTMLDivElement, FooterContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'f-cnt',
          'flex flex-col md:flex-row',
          'gap-7 md:gap-9',
          'py-8 md:py-10',
          'md:justify-between',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
FooterContent.displayName = 'Footer.Content';

/**
 * Footer.Info Props Interface
 */
export interface FooterInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Address text
   */
  address?: string;

  /**
   * Contact information array
   */
  contacts?: Array<{
    label: string;
    value: string;
    description?: string;
  }>;

  /**
   * Additional className
   */
  className?: string;

  /**
   * Children (alternative to address/contacts props)
   */
  children?: React.ReactNode;
}

/**
 * Footer.Info Component
 *
 * Contact information section (.f-info)
 * Contains address and contact details
 */
const FooterInfo = React.forwardRef<HTMLDivElement, FooterInfoProps>(
  ({ address, contacts, className, children, ...props }, ref) => {
    if (children) {
      return (
        <div
          ref={ref}
          className={cn(
            'f-info',
            'flex flex-col gap-5',
            'flex-1 md:flex-3',
            className
          )}
          {...props}
        >
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          'f-info',
          'flex flex-col gap-5',
          'flex-1 md:flex-3',
          'text-sm md:text-base',
          className
        )}
        {...props}
      >
        {address && <FooterAddress>{address}</FooterAddress>}
        {contacts && contacts.length > 0 && (
          <ul className="info-cs flex flex-col gap-3">
            {contacts.map((contact, index) => (
              <FooterContact key={index} {...contact} />
            ))}
          </ul>
        )}
      </div>
    );
  }
);
FooterInfo.displayName = 'Footer.Info';

/**
 * Footer.Address Props Interface
 */
export interface FooterAddressProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Address text
   */
  children: React.ReactNode;

  /**
   * Additional className
   */
  className?: string;
}

/**
 * Footer.Address Component
 *
 * Address text (.info-addr)
 */
const FooterAddress = React.forwardRef<
  HTMLParagraphElement,
  FooterAddressProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('info-addr', 'text-gray-700 dark:text-gray-300', className)}
      {...props}
    >
      {children}
    </p>
  );
});
FooterAddress.displayName = 'Footer.Address';

/**
 * Footer.Contact Props Interface
 */
export interface FooterContactProps
  extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * Contact label (e.g., "대표전화")
   */
  label: string;

  /**
   * Contact value (e.g., "1577-1000")
   */
  value: string;

  /**
   * Additional description (e.g., "유료, 평일 09시~18시")
   */
  description?: string;

  /**
   * Additional className
   */
  className?: string;
}

/**
 * Footer.Contact Component
 *
 * Individual contact item
 */
const FooterContact = React.forwardRef<HTMLLIElement, FooterContactProps>(
  ({ label, value, description, className, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn(
          'flex items-center flex-col md:flex-row md:items-start',
          'gap-2',
          'flex-wrap',
          className
        )}
        {...props}
      >
        <strong className="font-semibold text-gray-900 dark:text-gray-100">
          {label} {value}
        </strong>
        {description && (
          <span className="text-gray-600 dark:text-gray-400">
            {description}
          </span>
        )}
      </li>
    );
  }
);
FooterContact.displayName = 'Footer.Contact';

/**
 * Footer.Links Props Interface
 */
export interface FooterLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Additional className
   */
  className?: string;

  /**
   * Links content
   */
  children: React.ReactNode;
}

/**
 * Footer.Links Component
 *
 * Links wrapper (.f-link)
 * Contains utility links and social links
 */
const FooterLinks = React.forwardRef<HTMLDivElement, FooterLinksProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'f-link',
          'flex flex-col',
          'gap-9 md:gap-9',
          'flex-shrink-0',
          'md:w-[23.5%]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
FooterLinks.displayName = 'Footer.Links';

/**
 * Footer.UtilityLinks Props Interface
 */
export interface FooterUtilityLinksProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Utility links array
   */
  links?: Array<{
    label: string;
    href: string;
    icon?: React.ReactNode;
  }>;

  /**
   * Additional className
   */
  className?: string;

  /**
   * Children (alternative to links prop)
   */
  children?: React.ReactNode;
}

/**
 * Footer.UtilityLinks Component
 *
 * Utility links section (.link-go)
 * Contains links like "찾아오시는 길", "이용안내", etc.
 */
const FooterUtilityLinks = React.forwardRef<
  HTMLDivElement,
  FooterUtilityLinksProps
>(({ links, className, children, ...props }, ref) => {
  if (children) {
    return (
      <div
        ref={ref}
        className={cn('link-go', 'flex flex-col gap-2', className)}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn('link-go', 'flex flex-col gap-2', className)}
      {...props}
    >
      {links?.map((link, index) => (
        <a
          key={index}
          href={link.href}
          className={cn(
            'inline-flex items-center gap-2',
            'text-sm md:text-base',
            'text-gray-700 dark:text-gray-300',
            'hover:text-blue-600 dark:hover:text-blue-400',
            'hover:underline',
            'transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 rounded px-1'
          )}
        >
          <span>{link.label}</span>
          {link.icon || (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </a>
      ))}
    </div>
  );
});
FooterUtilityLinks.displayName = 'Footer.UtilityLinks';

/**
 * Footer.SocialLinks Props Interface
 */
export interface FooterSocialLinksProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Social links array
   */
  links?: Array<{
    platform: 'instagram' | 'youtube' | 'twitter' | 'facebook' | 'blog';
    href: string;
    'aria-label'?: string;
  }>;

  /**
   * Additional className
   */
  className?: string;

  /**
   * Children (alternative to links prop)
   */
  children?: React.ReactNode;
}

/**
 * Footer.SocialLinks Component
 *
 * Social media links section (.link-sns)
 * Contains SNS icon buttons
 */
const FooterSocialLinks = React.forwardRef<
  HTMLDivElement,
  FooterSocialLinksProps
>(({ links, className, children, ...props }, ref) => {
  const platformIcons = {
    instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    youtube: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    blog: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
  };

  if (children) {
    return (
      <div
        ref={ref}
        className={cn('link-sns', 'flex flex-wrap gap-3 md:gap-2', className)}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn('link-sns', 'flex flex-wrap gap-3 md:gap-2', className)}
      {...props}
    >
      {links?.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link['aria-label'] || `${link.platform} 새 창 열기`}
          className={cn(
            'inline-flex items-center justify-center',
            'w-10 h-10 md:w-12 md:h-12',
            'border border-gray-300 dark:border-gray-700',
            'rounded-md',
            'text-gray-700 dark:text-gray-300',
            'hover:bg-gray-100 dark:hover:bg-gray-800',
            'hover:border-gray-400 dark:hover:border-gray-600',
            'transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400'
          )}
        >
          <span className="sr-only">{link['aria-label'] || link.platform}</span>
          {platformIcons[link.platform]}
        </a>
      ))}
    </div>
  );
});
FooterSocialLinks.displayName = 'Footer.SocialLinks';

/**
 * Footer.Bottom Props Interface
 */
export interface FooterBottomProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Additional className
   */
  className?: string;

  /**
   * Bottom content
   */
  children: React.ReactNode;
}

/**
 * Footer.Bottom Component
 *
 * Bottom section wrapper (.f-btm)
 * Contains policy links, copyright, and identifier
 */
const FooterBottom = React.forwardRef<HTMLDivElement, FooterBottomProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'f-btm',
          'flex flex-col',
          'pt-6 md:pt-6',
          'gap-9 md:gap-9',
          'border-t border-gray-200 dark:border-gray-800',
          'text-sm md:text-base',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
FooterBottom.displayName = 'Footer.Bottom';

/**
 * Footer.PolicyLinks Props Interface
 */
export interface FooterPolicyLinksProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Policy links array
   */
  links?: Array<{
    label: string;
    href: string;
    highlight?: boolean; // 개인정보처리방침 강조
  }>;

  /**
   * Additional className
   */
  className?: string;

  /**
   * Children (alternative to links prop)
   */
  children?: React.ReactNode;
}

/**
 * Footer.PolicyLinks Component
 *
 * Policy links section (.f-menu)
 * Contains links like "개인정보처리방침", "저작권 정책", etc.
 */
const FooterPolicyLinks = React.forwardRef<
  HTMLDivElement,
  FooterPolicyLinksProps
>(({ links, className, children, ...props }, ref) => {
  if (children) {
    return (
      <div
        ref={ref}
        className={cn('f-menu', 'inline-flex flex-wrap gap-3', className)}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn('f-menu', 'inline-flex flex-wrap gap-3', className)}
      {...props}
    >
      {links?.map((link, index) => (
        <a
          key={index}
          href={link.href}
          className={cn(
            'text-gray-700 dark:text-gray-300',
            'hover:text-blue-600 dark:hover:text-blue-400',
            'hover:underline',
            'transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 rounded px-1',
            link.highlight && 'font-semibold text-gray-900 dark:text-gray-100'
          )}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
});
FooterPolicyLinks.displayName = 'Footer.PolicyLinks';

/**
 * Footer.Copyright Props Interface
 */
export interface FooterCopyrightProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Copyright text
   */
  children: React.ReactNode;

  /**
   * Additional className
   */
  className?: string;
}

/**
 * Footer.Copyright Component
 *
 * Copyright text (.f-copy)
 */
const FooterCopyright = React.forwardRef<
  HTMLParagraphElement,
  FooterCopyrightProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        'f-copy',
        'text-sm md:text-base',
        'text-gray-600 dark:text-gray-400',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
});
FooterCopyright.displayName = 'Footer.Copyright';

/**
 * Footer.Identifier Props Interface
 *
 * Wraps the existing Identifier component for Footer usage
 */
export type FooterIdentifierProps = IdentifierProps;

/**
 * Footer.Identifier Component
 *
 * Organization identifier wrapper
 * Uses the existing Identifier component internally
 */
const FooterIdentifier = React.forwardRef<HTMLElement, FooterIdentifierProps>(
  (props, ref) => {
    return <Identifier ref={ref} {...props} />;
  }
);
FooterIdentifier.displayName = 'Footer.Identifier';

/**
 * Compound component type
 */
interface FooterComponent
  extends React.ForwardRefExoticComponent<
    FooterProps & React.RefAttributes<HTMLElement>
  > {
  QuickLinks: typeof FooterQuickLinks;
  QuickLink: typeof FooterQuickLink;
  Logo: typeof FooterLogo;
  Content: typeof FooterContent;
  Info: typeof FooterInfo;
  Address: typeof FooterAddress;
  Contact: typeof FooterContact;
  Links: typeof FooterLinks;
  UtilityLinks: typeof FooterUtilityLinks;
  SocialLinks: typeof FooterSocialLinks;
  Bottom: typeof FooterBottom;
  PolicyLinks: typeof FooterPolicyLinks;
  Copyright: typeof FooterCopyright;
  Identifier: typeof FooterIdentifier;
}

/**
 * Compound exports
 */
export const Footer = FooterBase as FooterComponent;
Footer.QuickLinks = FooterQuickLinks;
Footer.QuickLink = FooterQuickLink;
Footer.Logo = FooterLogo;
Footer.Content = FooterContent;
Footer.Info = FooterInfo;
Footer.Address = FooterAddress;
Footer.Contact = FooterContact;
Footer.Links = FooterLinks;
Footer.UtilityLinks = FooterUtilityLinks;
Footer.SocialLinks = FooterSocialLinks;
Footer.Bottom = FooterBottom;
Footer.PolicyLinks = FooterPolicyLinks;
Footer.Copyright = FooterCopyright;
Footer.Identifier = FooterIdentifier;
