import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * NavText Variants Definition
 *
 * KRDS Typography - Navigation style
 * Title:
 *   - Large: 24px(PC) / 22px(Mobile) - Bold(700)
 *   - Small: 19px(PC) / 17px(Mobile) - Bold(700)
 * Depth:
 *   - Medium: 17px - Regular(400) / Bold(700)
 *   - Small: 15px - Regular(400) / Bold(700)
 * - Line spacing 150%
 * - Default colors:
 *   - Title (tit-*): gray-95 (bolder, strong contrast)
 *   - Depth (depth-*): gray-90 (basic, medium contrast)
 *   - KRDS contrast 4.5:1 compliant, auto dark mode
 */
const navTextVariants = cva(
  // Base styles
  ['leading-[150%]'].join(' '),
  {
    variants: {
      variant: {
        'tit-lg': [
          'text-[22px]',
          'md:text-[24px]',
          'font-bold',
          'text-krds-gray-95',
        ].join(' '),
        'tit-sm': [
          'text-[17px]',
          'md:text-[19px]',
          'font-bold',
          'text-krds-gray-95',
        ].join(' '),
        'depth-md': ['text-[17px]', 'text-krds-gray-90'].join(' '),
        'depth-sm': ['text-[15px]', 'text-krds-gray-90'].join(' '),
      },
      weight: {
        regular: 'font-normal', // 400
        bold: 'font-bold', // 700
      },
    },
    defaultVariants: {
      variant: 'depth-md',
      weight: 'regular',
    },
  }
);

/**
 * NavText Component Props
 */
export interface NavTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'as'>,
    VariantProps<typeof navTextVariants> {
  /**
   * Navigation text style
   * @default "depth-md"
   */
  variant?: 'tit-lg' | 'tit-sm' | 'depth-md' | 'depth-sm';

  /**
   * Font weight (auto-applied for tit-*)
   * @default "regular"
   */
  weight?: 'regular' | 'bold';

  /**
   * HTML tag
   * @default "span"
   */
  as?: 'span' | 'a' | 'button' | 'div';

  /**
   * Text content
   */
  children: React.ReactNode;

  /**
   * href (when as="a")
   */
  href?: string;

  /**
   * target (when as="a")
   */
  target?: string;

  /**
   * rel (when as="a")
   */
  rel?: string;
}

/**
 * NavText Component
 *
 * KRDS Typography - Navigation text
 * Use for menus, tabs, breadcrumbs and other navigation elements
 *
 * @example
 * ```tsx
 * // Main title
 * <NavText variant="tit-lg">Main Menu</NavText>
 *
 * // Subtitle
 * <NavText variant="tit-sm">Category</NavText>
 *
 * // Depth menu
 * <NavText variant="depth-md">Menu Item</NavText>
 * <NavText variant="depth-md" weight="bold">Current Page</NavText>
 * ```
 */
export const NavText = React.forwardRef<HTMLElement, NavTextProps>(
  (
    {
      className,
      variant = 'depth-md',
      weight = 'regular',
      as: Component = 'span',
      children,
      ...props
    },
    ref
  ) => {
    // tit-* variants enforce bold
    const finalWeight = variant?.startsWith('tit-') ? 'bold' : weight;

    return (
      <Component
        ref={ref as any}
        className={cn(
          navTextVariants({ variant, weight: finalWeight }),
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

NavText.displayName = 'NavText';
