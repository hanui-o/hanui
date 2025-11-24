import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Display Variants Definition
 *
 * KRDS Typography - Display style (for banners/marketing)
 * - Large: 60px(PC) / 44px(Mobile) - Maximum emphasis
 * - Medium: 44px(PC) / 32px(Mobile) - Main title
 * - Small: 36px(PC) / 28px(Mobile) - Subtitle
 * - All levels bold (700), line spacing 150%
 * - Default color: gray-95 (bolder) - KRDS contrast 4.5:1 compliant, auto dark mode
 */
const displayVariants = cva(
  // Base styles - Default color that meets KRDS contrast 4.5:1 or higher
  'font-bold leading-[150%] text-krds-gray-95',
  {
    variants: {
      size: {
        lg: 'text-[44px] md:text-[60px]',
        md: 'text-[32px] md:text-[44px]',
        sm: 'text-[28px] md:text-[36px]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

/**
 * Display Component Props
 */
export interface DisplayProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof displayVariants> {
  /**
   * Display size
   * @default "md"
   */
  size?: 'lg' | 'md' | 'sm';

  /**
   * HTML tag (default: h1)
   * @default "h1"
   */
  as?: 'h1' | 'h2' | 'h3' | 'div' | 'p';

  /**
   * Text content
   */
  children: React.ReactNode;
}

/**
 * Display Component
 *
 * KRDS Typography - Large text for banners/marketing
 *
 * **Important:**
 * - Use Display for marketing/promotional content ONLY
 * - DO NOT use Display for page headings (h1, h2, h3)
 * - For page headings, use SectionHeading component instead
 *
 * **Use cases:**
 * - Hero sections on landing pages
 * - Promotional banners
 * - Marketing messages
 * - Large visual impact text
 *
 * @example
 * ```tsx
 * // ✅ Correct usage
 * <Display size="lg">Welcome to Our Service</Display>
 * <Display size="md">Spring Sale 50% Off</Display>
 *
 * // ❌ Wrong usage - Use SectionHeading instead
 * <Display as="h1">Page Title</Display>
 * <Display as="h2">Section Title</Display>
 * ```
 */
export const Display = React.forwardRef<HTMLHeadingElement, DisplayProps>(
  (
    { className, size = 'md', as: Component = 'h1', children, ...props },
    ref
  ) => {
    return (
      <Component
        ref={ref as any}
        className={cn(displayVariants({ size }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Display.displayName = 'Display';
