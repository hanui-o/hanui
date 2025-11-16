'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * Header Context
 */
interface HeaderContextValue {
  variant?: 'default' | 'compact';
}

const HeaderContext = React.createContext<HeaderContextValue>({
  variant: 'default',
});

/**
 * Header Props Interface
 */
export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Header variant
   * @default "default"
   */
  variant?: 'default' | 'compact';

  /**
   * Additional className for header element
   */
  className?: string;

  /**
   * Header content (compound components)
   */
  children: React.ReactNode;
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
 * // Basic header with branding and utility
 * <Header>
 *   <Header.Branding>
 *     <Header.Logo
 *       src="/logo.svg"
 *       alt="정부 서비스"
 *       href="/"
 *     />
 *     <Header.Slogan>국민을 위한 서비스</Header.Slogan>
 *   </Header.Branding>
 *   <Header.Utility>
 *     <Header.UtilityLink href="/login">로그인</Header.UtilityLink>
 *     <Header.UtilityLink href="/signup">회원가입</Header.UtilityLink>
 *   </Header.Utility>
 * </Header>
 * ```
 */
export const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    return (
      <HeaderContext.Provider value={{ variant }}>
        <header
          id="krds-header"
          ref={ref}
          className={cn(
            'w-full bg-white dark:bg-gray-900',
            'border-b border-gray-200 dark:border-gray-800',
            'transition-colors duration-200',
            className
          )}
          {...props}
        >
          <div className="container mx-auto px-4">{children}</div>
        </header>
      </HeaderContext.Provider>
    );
  }
);
Header.displayName = 'Header';

/**
 * Header.Branding Props Interface
 */
export interface HeaderBrandingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Additional className
   */
  className?: string;

  /**
   * Branding content (Logo, Slogan)
   */
  children: React.ReactNode;
}

/**
 * Header.Branding Component
 *
 * Contains logo and optional slogan for service branding.
 * Automatically applies .header-branding class for KRDS compliance.
 */
const HeaderBranding = React.forwardRef<HTMLDivElement, HeaderBrandingProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'header-branding',
          'flex items-center gap-4 py-4',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
HeaderBranding.displayName = 'Header.Branding';

/**
 * Header.Logo Props Interface
 */
export interface HeaderLogoProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Logo image source
   */
  src: string;

  /**
   * Logo alt text (required for accessibility)
   */
  alt: string;

  /**
   * Logo link href
   * @default "/"
   */
  href?: string;

  /**
   * Logo image width
   * @default 120
   */
  width?: number;

  /**
   * Logo image height
   * @default 40
   */
  height?: number;

  /**
   * Additional className
   */
  className?: string;
}

/**
 * Header.Logo Component
 *
 * Service logo with link to home page.
 * Ensures proper accessibility with required alt text.
 */
const HeaderLogo = React.forwardRef<HTMLAnchorElement, HeaderLogoProps>(
  (
    { src, alt, href = '/', width = 120, height = 40, className, ...props },
    ref
  ) => {
    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          'flex items-center',
          'focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 rounded',
          className
        )}
        {...props}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="object-contain"
        />
      </a>
    );
  }
);
HeaderLogo.displayName = 'Header.Logo';

/**
 * Header.Slogan Props Interface
 */
export interface HeaderSloganProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Additional className
   */
  className?: string;

  /**
   * Slogan text
   */
  children: React.ReactNode;
}

/**
 * Header.Slogan Component
 *
 * Optional service slogan or description text.
 */
const HeaderSlogan = React.forwardRef<HTMLSpanElement, HeaderSloganProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'text-sm text-gray-600 dark:text-gray-400',
          'hidden md:inline-block',
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
HeaderSlogan.displayName = 'Header.Slogan';

/**
 * Header.Utility Props Interface
 */
export interface HeaderUtilityProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Additional className
   */
  className?: string;

  /**
   * Utility links
   */
  children: React.ReactNode;
}

/**
 * Header.Utility Component
 *
 * Container for utility links (login, signup, language selection, etc.).
 * Automatically applies .header-utility class for KRDS compliance.
 */
const HeaderUtility = React.forwardRef<HTMLDivElement, HeaderUtilityProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'header-utility',
          'flex items-center gap-4 ml-auto',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
HeaderUtility.displayName = 'Header.Utility';

/**
 * Header.UtilityLink Props Interface
 */
export interface HeaderUtilityLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Link href
   */
  href: string;

  /**
   * Additional className
   */
  className?: string;

  /**
   * Link text
   */
  children: React.ReactNode;
}

/**
 * Header.UtilityLink Component
 *
 * Individual utility link with consistent styling and accessibility.
 */
const HeaderUtilityLink = React.forwardRef<
  HTMLAnchorElement,
  HeaderUtilityLinkProps
>(({ href, className, children, ...props }, ref) => {
  return (
    <a
      ref={ref}
      href={href}
      className={cn(
        'text-sm text-gray-700 dark:text-gray-300',
        'hover:text-blue-600 dark:hover:text-blue-400',
        'hover:underline',
        'transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 rounded px-1',
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
});
HeaderUtilityLink.displayName = 'Header.UtilityLink';

/**
 * Compound component type
 */
interface HeaderComponent
  extends React.ForwardRefExoticComponent<
    HeaderProps & React.RefAttributes<HTMLElement>
  > {
  Branding: typeof HeaderBranding;
  Logo: typeof HeaderLogo;
  Slogan: typeof HeaderSlogan;
  Utility: typeof HeaderUtility;
  UtilityLink: typeof HeaderUtilityLink;
}

/**
 * Compound exports
 */
(Header as HeaderComponent).Branding = HeaderBranding;
(Header as HeaderComponent).Logo = HeaderLogo;
(Header as HeaderComponent).Slogan = HeaderSlogan;
(Header as HeaderComponent).Utility = HeaderUtility;
(Header as HeaderComponent).UtilityLink = HeaderUtilityLink;
