'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Stack Variants Definition
 *
 * Simple directional spacing system with gap utilities
 */
const stackVariants = cva('flex', {
  variants: {
    /**
     * Gap spacing (Tailwind gap utilities)
     */
    gap: {
      none: 'gap-0', // 0px
      xs: 'gap-1', // 4px
      sm: 'gap-2', // 8px
      md: 'gap-4', // 16px
      lg: 'gap-6', // 24px
      xl: 'gap-8', // 32px
      '2xl': 'gap-10', // 40px
      '3xl': 'gap-12', // 48px
      '4xl': 'gap-16', // 64px
    },
    /**
     * Direction - flex direction
     */
    direction: {
      row: 'flex-row',
      column: 'flex-col',
    },
    /**
     * Align items
     */
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
    /**
     * Justify content
     */
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
    },
  },
  defaultVariants: {
    gap: 'none',
    direction: 'column',
  },
});

/**
 * Stack Props Interface
 */
export interface StackProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'gap'>,
    VariantProps<typeof stackVariants> {
  /**
   * Gap spacing
   * @default "none"
   */
  gap?:
    | 'none'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | `${number}`
    | number;

  /**
   * Flex direction
   * @default "column"
   */
  direction?: 'row' | 'column';

  /**
   * Align items
   */
  align?: 'start' | 'center' | 'end' | 'stretch';

  /**
   * Justify content
   */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';

  /**
   * Element to render as
   * @default "div"
   */
  as?: 'div' | 'section' | 'article' | 'main' | 'aside' | 'header' | 'footer';
}

/**
 * Stack Component
 *
 * Simple flex container with gap-based spacing
 *
 * @example
 * ```tsx
 * // Vertical stack (default)
 * <Stack gap="md">
 *   <div>First</div>
 *   <div>Second</div>
 * </Stack>
 *
 * // Horizontal stack
 * <Stack direction="row" gap="lg">
 *   <div>Left</div>
 *   <div>Right</div>
 * </Stack>
 *
 * // Custom numeric gap
 * <Stack gap="10">
 *   <div>Custom</div>
 * </Stack>
 * ```
 */
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      gap,
      direction,
      align,
      justify,
      as: Component = 'div',
      children,
      ...props
    },
    ref
  ) => {
    // Handle numeric gap values (e.g., 10 or "10" → gap-10)
    const isNumericGap =
      typeof gap === 'number' ||
      (typeof gap === 'string' &&
        /^\d+$/.test(gap) &&
        !['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'].includes(gap));

    const gapClass = isNumericGap ? `gap-${gap}` : undefined;

    // Use variant gap if not numeric
    const variantGap = isNumericGap
      ? undefined
      : (gap as VariantProps<typeof stackVariants>['gap']);

    return (
      <Component
        ref={ref as any}
        className={cn(
          stackVariants({ gap: variantGap, direction, align, justify }),
          gapClass,
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Stack.displayName = 'Stack';

/**
 * VStack Component - Vertical Stack
 *
 * Alias for Stack with column direction
 *
 * @example
 * ```tsx
 * <VStack gap="md">
 *   <div>First</div>
 *   <div>Second</div>
 * </VStack>
 * ```
 */
export const VStack = React.forwardRef<
  HTMLDivElement,
  Omit<StackProps, 'direction'>
>((props, ref) => {
  return <Stack ref={ref} direction="column" {...props} />;
});
VStack.displayName = 'VStack';

/**
 * HStack Component - Horizontal Stack
 *
 * Horizontal stack with row direction
 *
 * @example
 * ```tsx
 * <HStack gap="md">
 *   <div>Left</div>
 *   <div>Right</div>
 * </HStack>
 * ```
 */
export const HStack = React.forwardRef<
  HTMLDivElement,
  Omit<StackProps, 'direction'>
>(({ align = 'center', ...props }, ref) => {
  return <Stack ref={ref} direction="row" align={align} {...props} />;
});
HStack.displayName = 'HStack';

/**
 * Export stackVariants for extending
 */
export { stackVariants };
