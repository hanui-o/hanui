'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * SimpleGrid Variants
 * 그리드 간격 및 열 개수 설정
 */
const simpleGridVariants = cva('grid w-full', {
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

export interface SimpleGridProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    Omit<VariantProps<typeof simpleGridVariants>, 'columns'> {
  /**
   * 그리드 열 개수 (1-12)
   * minChildWidth 설정 시 무시됨
   * @default 1
   */
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

  /**
   * 각 자식 요소의 최소 너비
   * 설정 시 auto-fit으로 자동 열 개수 조정
   * @example "200px", "15rem"
   */
  minChildWidth?: string;

  /**
   * 그리드 아이템 간 간격
   * @default "md"
   */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * 그리드 내부 요소
   */
  children?: React.ReactNode;
}

/**
 * SimpleGrid - 간단한 반응형 그리드 레이아웃
 *
 * CSS Grid 기반의 레이아웃 컴포넌트
 * - columns: 고정 열 개수 설정 (1-12)
 * - minChildWidth: 자동 반응형 그리드 (auto-fit)
 * - gap: 아이템 간 간격 (none, xs, sm, md, lg, xl)
 *
 * @example
 * // 고정 열 개수
 * <SimpleGrid columns={3} gap="md">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 * </SimpleGrid>
 *
 * // 자동 반응형
 * <SimpleGrid minChildWidth="200px" gap="lg">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 * </SimpleGrid>
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
    // minChildWidth 설정 시 auto-fit 사용
    const gridStyle = minChildWidth
      ? {
          ...style,
          gridTemplateColumns: `repeat(auto-fit, minmax(${minChildWidth}, 1fr))`,
        }
      : style;

    // minChildWidth 설정 시 columns 클래스 제외
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

export { simpleGridVariants };
