'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Wrap Variants
 * flexbox 기반 자동 줄바꿈 레이아웃
 */
const wrapVariants = cva('flex flex-wrap', {
  variants: {
    /** 아이템 간 간격 */
    gap: {
      none: 'gap-0',
      xs: 'gap-1', // 4px
      sm: 'gap-2', // 8px
      md: 'gap-4', // 16px
      lg: 'gap-6', // 24px
      xl: 'gap-8', // 32px
      '2xl': 'gap-12', // 48px
    },
    /** 교차축(cross-axis) 정렬 */
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    /** 주축(main-axis) 정렬 */
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
   * 아이템 간 간격
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

  /** 추가 CSS 클래스 */
  className?: string;

  /** 자식 요소 */
  children?: React.ReactNode;
}

/**
 * Wrap - 자동 줄바꿈 레이아웃 컴포넌트
 *
 * 공간이 부족할 때 자동으로 줄바꿈되는 flexbox 레이아웃입니다.
 * 태그 목록, 버튼 그룹, 카드 배열 등에 적합합니다.
 *
 * @example
 * // 기본 사용
 * <Wrap gap="md">
 *   <Button>버튼 1</Button>
 *   <Button>버튼 2</Button>
 *   <Button>버튼 3</Button>
 * </Wrap>
 *
 * @example
 * // 가운데 정렬
 * <Wrap gap="lg" justify="center" align="center">
 *   <Badge>태그 1</Badge>
 *   <Badge>태그 2</Badge>
 * </Wrap>
 *
 * @example
 * // 태그 목록
 * <Wrap gap="sm">
 *   {tags.map(tag => (
 *     <Badge key={tag}>{tag}</Badge>
 *   ))}
 * </Wrap>
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
