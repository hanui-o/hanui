import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Container Max Width Classes
 *
 * Based on KRDS Breakpoints:
 * - xs: 360px (extra small - mobile)
 * - sm: 640px (small breakpoint)
 * - md: 768px (medium breakpoint)
 * - lg: 1024px (large breakpoint)
 * - xl: 1280px (xlarge breakpoint - default)
 * - 2xl: 1536px (xxlarge breakpoint - Tailwind standard)
 * - full: 100% (no max-width constraint)
 *
 * Note: Uses custom KRDS max-width classes defined in tailwind.config.ts
 * because Tailwind's standard max-w-xl is only 576px, but KRDS requires 1280px.
 */
const maxWidthClasses = {
  xs: 'max-w-krds-xs',
  sm: 'max-w-krds-sm',
  md: 'max-w-krds-md',
  lg: 'max-w-krds-lg',
  xl: 'max-w-krds-xl',
  '2xl': 'max-w-krds-2xl',
  full: 'max-w-full',
} as const;

/**
 * Container Props Interface
 *
 * Provides flexible layout container with KRDS-compliant responsive behavior
 */
export interface ContainerProps {
  /**
   * Maximum width of the container
   *
   * @default 'xl'
   *
   * Size mapping:
   * - xs: 320px - Extra small (mobile-first)
   * - sm: 640px - Compact content
   * - md: 768px - Medium content
   * - lg: 1024px - Large content
   * - xl: 1280px - Default content (recommended)
   * - 2xl: 1536px - Extra wide content
   * - full: 100% - Full width with padding
   * - false: No max-width (padding only)
   */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | false;

  /**
   * Remove horizontal padding (gutters)
   *
   * When true, content extends to the edges.
   * Useful for full-bleed images or backgrounds.
   *
   * @default false
   */
  disableGutters?: boolean;

  /**
   * HTML element type to render
   *
   * Use semantic HTML for better accessibility:
   * - 'main': Primary page content
   * - 'section': Thematic grouping
   * - 'article': Self-contained content
   * - 'div': Generic container (default)
   *
   * @default 'div'
   */
  as?: 'div' | 'section' | 'article' | 'main' | 'aside' | 'header' | 'footer';

  /**
   * Content to render inside the container
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   *
   * For layout adjustments (margin, etc.)
   */
  className?: string;
}

/**
 * Container Component
 *
 * KRDS-compliant layout container with:
 * - Responsive max-width based on KRDS breakpoints
 * - Automatic horizontal centering
 * - Screen margins (16px mobile, 24px desktop)
 * - Semantic HTML support
 * - Full accessibility
 *
 * Screen Margins (KRDS Standards):
 * - Mobile (sm): 16px (px-4)
 * - Tablet (md): 24px (px-6)
 * - Desktop (lg+): 32px (px-8)
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Container>
 *   <h1>페이지 제목</h1>
 *   <p>콘텐츠</p>
 * </Container>
 *
 * // Custom max-width
 * <Container maxWidth="xl">
 *   <Dashboard />
 * </Container>
 *
 * // Full width with padding
 * <Container maxWidth="full">
 *   <HeroSection />
 * </Container>
 *
 * // No gutters (full bleed)
 * <Container disableGutters>
 *   <FullWidthImage />
 * </Container>
 *
 * // Semantic HTML
 * <Container as="main">
 *   <MainContent />
 * </Container>
 *
 * // With Grid system
 * <Container>
 *   <Grid container spacing={3}>
 *     <Grid item xs={12} md={6}>
 *       <Card />
 *     </Grid>
 *   </Grid>
 * </Container>
 * ```
 */
export const Container = React.forwardRef<
  HTMLElement,
  ContainerProps & React.HTMLAttributes<HTMLElement>
>(
  (
    {
      maxWidth = 'xl',
      disableGutters = false,
      as: Component = 'div',
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref as any}
        className={cn(
          // Center horizontally and set full width
          'mx-auto w-full',
          // Apply max-width if not false
          maxWidth !== false && maxWidthClasses[maxWidth],
          // Apply horizontal padding (screen margins) unless disabled
          // KRDS Standards:
          // - sm: 1rem (px-4)
          // - md: 1.5rem (px-6)
          // - lg+: 2rem (px-8)
          !disableGutters && 'px-4 sm:px-6 lg:px-8',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';
