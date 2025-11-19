'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const wrapVariants = cva('flex flex-wrap', {
  variants: {
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
      '2xl': 'gap-12',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
  },
  defaultVariants: {
    gap: 'md',
    align: 'start',
    justify: 'start',
  },
});

export interface WrapProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof wrapVariants> {
  /**
   * Items 간 간격
   * @default "md"
   */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /**
   * 교차축 정렬
   * @default "start"
   */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  /**
   * 주축 정렬
   * @default "start"
   */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}

/**
 * Wrap Component
 *
 * 공간이 부족할 때 자동으로 줄바꿈되는 flexbox 레이아웃 컴포넌트
 *
 * @example
 * ```tsx
 * <Wrap gap="md">
 *   <Button>Item 1</Button>
 *   <Button>Item 2</Button>
 *   <Button>Item 3</Button>
 * </Wrap>
 * ```
 *
 * @example
 * ```tsx
 * // 가운데 정렬
 * <Wrap gap="lg" justify="center" align="center">
 *   <span>Centered 1</span>
 *   <span>Centered 2</span>
 * </Wrap>
 * ```
 *
 * @example
 * ```tsx
 * // 태그 목록
 * <Wrap gap="sm">
 *   {tags.map(tag => (
 *     <Badge key={tag}>{tag}</Badge>
 *   ))}
 * </Wrap>
 * ```
 */
export const Wrap = React.forwardRef<HTMLDivElement, WrapProps>(
  ({ className, gap, align, justify, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(wrapVariants({ gap, align, justify }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Wrap.displayName = 'Wrap';

export { wrapVariants };
