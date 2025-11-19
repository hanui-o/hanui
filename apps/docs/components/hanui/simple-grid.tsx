'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * SimpleGrid Variants Definition
 */
const simpleGridVariants = cva(['grid', 'w-full'].join(' '), {
  variants: {
    gap: {
      none: 'gap-0',
      xs: 'gap-2', // 8px
      sm: 'gap-4', // 16px
      md: 'gap-6', // 24px
      lg: 'gap-8', // 32px
      xl: 'gap-10', // 40px
    },
    columns: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      7: 'grid-cols-7',
      8: 'grid-cols-8',
      9: 'grid-cols-9',
      10: 'grid-cols-10',
      11: 'grid-cols-11',
      12: 'grid-cols-12',
    },
  },
  defaultVariants: {
    gap: 'md',
    columns: 1,
  },
});

/**
 * SimpleGrid Props Interface
 */
export interface SimpleGridProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    Omit<VariantProps<typeof simpleGridVariants>, 'columns'> {
  /**
   * Number of columns in the grid
   * Can be a single number or responsive object
   * @default 1
   */
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

  /**
   * Minimum width of each child element
   * When set, columns prop is ignored and grid auto-fits
   * @example "200px", "15rem"
   */
  minChildWidth?: string;

  /**
   * Gap between grid items
   * @default "md"
   */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Additional className for custom styling
   */
  className?: string;

  /**
   * Grid children elements
   */
  children?: React.ReactNode;
}

/**
 * SimpleGrid Component (간단한 그리드)
 *
 * **Foundation Layer Features:**
 * - Semantic HTML: div with grid layout
 * - Responsive Design: Auto-fitting columns based on minChildWidth
 * - Flexible Layout: Multiple column configurations
 * - Consistent Spacing: Predefined gap sizes
 *
 * **Design Principles:**
 * - Simplifies responsive grid layouts
 * - Auto-calculates columns when minChildWidth is set
 * - Uniform spacing between items
 * - Works with any child components
 *
 * @example
 * ```tsx
 * // Fixed columns
 * <SimpleGrid columns={3} gap="md">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </SimpleGrid>
 *
 * // Auto-fit with minimum width
 * <SimpleGrid minChildWidth="200px" gap="lg">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </SimpleGrid>
 *
 * // Different gap sizes
 * <SimpleGrid columns={2} gap="sm">
 *   <Box>Content 1</Box>
 *   <Box>Content 2</Box>
 * </SimpleGrid>
 * ```
 */
export const SimpleGrid = React.forwardRef<HTMLDivElement, SimpleGridProps>(
  (
    {
      className,
      columns = 1,
      minChildWidth,
      gap = 'md',
      children,
      style,
      ...props
    },
    ref
  ) => {
    // If minChildWidth is provided, use auto-fit
    const gridStyle = minChildWidth
      ? {
          ...style,
          gridTemplateColumns: `repeat(auto-fit, minmax(${minChildWidth}, 1fr))`,
        }
      : style;

    // Only apply columns class if minChildWidth is not provided
    const gridClass = minChildWidth
      ? simpleGridVariants({ gap })
      : simpleGridVariants({ columns, gap });

    return (
      <div
        ref={ref}
        className={cn(gridClass, className)}
        style={gridStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SimpleGrid.displayName = 'SimpleGrid';

/**
 * Export simpleGridVariants for extending
 */
export { simpleGridVariants };
