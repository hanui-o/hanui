'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * CSS display property
   */
  display?: 'block' | 'flex' | 'grid' | 'inline-flex' | 'inline-block';

  /**
   * Flex direction
   */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';

  /**
   * Gap between items (Tailwind gap scale)
   */
  gap?: number | string;

  /**
   * Align items (flexbox)
   */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';

  /**
   * Justify content (flexbox)
   */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

  /**
   * Element to render as
   * @default "div"
   */
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Box - Flexible layout container component
 *
 * A versatile container for creating flexible layouts with flexbox and grid.
 *
 * @example
 * ```tsx
 * <Box display="flex" direction="row" gap={4} align="center">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Box>
 * ```
 */
export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      display = 'block',
      direction,
      gap,
      align,
      justify,
      as = 'div',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const displayClasses = {
      block: '',
      flex: 'flex',
      grid: 'grid',
      'inline-flex': 'inline-flex',
      'inline-block': 'inline-block',
    };

    const directionClasses = {
      row: 'flex-row',
      column: 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'column-reverse': 'flex-col-reverse',
    };

    const alignClasses = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    };

    const justifyClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    };

    const gapClass = gap ? `gap-${gap}` : undefined;

    const Component = as as any;

    return (
      <Component
        ref={ref}
        className={cn(
          displayClasses[display],
          direction && directionClasses[direction],
          align && alignClasses[align],
          justify && justifyClasses[justify],
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

Box.displayName = 'Box';
