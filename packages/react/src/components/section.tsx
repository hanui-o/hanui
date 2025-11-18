import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Section Variants Definition
 *
 * KRDS padding-layout semantic spacing (responsive PC/Mobile)
 */
const sectionVariants = cva(['w-full'].join(' '), {
  variants: {
    /**
     * Padding - Semantic padding values based on KRDS
     */
    padding: {
      // KRDS Card padding (responsive)
      'card-large': 'p-6 md:p-10', // 24px (Mobile) / 40px (PC)
      'card-medium': 'p-6 md:p-8', // 24px (Mobile) / 32px (PC)
      'card-small': 'p-5 md:p-6', // 20px (Mobile) / 24px (PC)
      'card-xsmall': 'p-3 md:p-4', // 12px (Mobile) / 16px (PC)

      // Page sections (responsive)
      'page-section': 'px-4 py-10 md:px-6 md:py-16', // 16px/40px (Mobile) / 24px/64px (PC)
      'content-area': 'px-4 py-8 md:px-6 md:py-12', // 16px/32px (Mobile) / 24px/48px (PC)

      // Form sections
      'form-section': 'p-6', // 24px
      'input-container': 'p-4', // 16px

      // Navigation/Header (responsive)
      header: 'px-4 py-4 md:px-6', // 16px (Mobile) / 24px (PC)
      footer: 'px-4 py-10 md:px-6 md:py-16', // 16px/40px (Mobile) / 24px/64px (PC)

      // Legacy aliases (backwards compatibility)
      'card-sm': 'p-4', // 16px (alias for card-xsmall)
      'card-md': 'p-6', // 24px (alias for card-small/medium mobile)
      'card-lg': 'p-8', // 32px (alias for card-medium PC)

      // Generic padding (fallback)
      xs: 'p-2', // 8px
      sm: 'p-3', // 12px
      md: 'p-4', // 16px
      lg: 'p-6', // 24px
      xl: 'p-8', // 32px
      '2xl': 'p-10', // 40px
      '3xl': 'p-16', // 64px

      // No padding
      none: 'p-0',
    },
    /**
     * Background variant
     */
    background: {
      white: 'bg-white dark:bg-gray-95',
      gray: 'bg-gray-5 dark:bg-gray-90',
      primary: 'bg-primary-5 dark:bg-primary-95',
      transparent: 'bg-transparent',
    },
  },
  defaultVariants: {
    padding: 'page-section',
    background: 'transparent',
  },
});

/**
 * Section Props Interface
 */
export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  /**
   * Semantic padding preset or generic size
   * @default "page-section"
   */
  padding?:
    | 'card-large'
    | 'card-medium'
    | 'card-small'
    | 'card-xsmall'
    | 'page-section'
    | 'content-area'
    | 'form-section'
    | 'input-container'
    | 'header'
    | 'footer'
    | 'card-sm'
    | 'card-md'
    | 'card-lg'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | 'none';

  /**
   * Background color variant
   * @default "transparent"
   */
  background?: 'white' | 'gray' | 'primary' | 'transparent';

  /**
   * Element to render as
   * @default "section"
   */
  as?:
    | 'div'
    | 'section'
    | 'article'
    | 'main'
    | 'aside'
    | 'header'
    | 'footer'
    | 'nav';
}

/**
 * Section Component
 *
 * KRDS-compliant padding component with semantic presets
 *
 * @example
 * ```tsx
 * // Page section
 * <Section padding="page-section">
 *   <h1>Page Title</h1>
 *   <p>Content</p>
 * </Section>
 *
 * // Card
 * <Section padding="card-md" background="white">
 *   <h3>Card Title</h3>
 *   <p>Card content</p>
 * </Section>
 * ```
 */
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      padding,
      background,
      as: Component = 'section',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref as any}
        className={cn(sectionVariants({ padding, background }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Section.displayName = 'Section';

/**
 * Export sectionVariants for extending
 */
export { sectionVariants };
