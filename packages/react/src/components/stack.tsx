'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

// Stack 스타일 변형 정의
const stackVariants = cva('flex', {
  variants: {
    // 간격 (Tailwind gap 유틸리티)
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
    // 방향 (flex direction)
    direction: {
      row: 'flex-row',
      column: 'flex-col',
    },
    // 교차축 정렬 (align-items)
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
    // 주축 정렬 (justify-content)
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

// Stack Props 인터페이스
export interface StackProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'gap'>,
    Omit<VariantProps<typeof stackVariants>, 'gap'> {
  /** 간격 @default "none" */
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

  /** 방향 @default "column" */
  direction?: 'row' | 'column';

  /** 교차축 정렬 */
  align?: 'start' | 'center' | 'end' | 'stretch';

  /** 주축 정렬 */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';

  /** 렌더링할 HTML 요소 @default "div" */
  as?: 'div' | 'section' | 'article' | 'main' | 'aside' | 'header' | 'footer';
}

/**
 * Stack 컴포넌트
 * gap 기반 간격을 가진 flex 컨테이너
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
    // 숫자 gap 값 처리 (예: 10 또는 "10" → gap-10)
    const isNumericGap =
      typeof gap === 'number' ||
      (typeof gap === 'string' &&
        /^\d+$/.test(gap) &&
        !['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'].includes(gap));

    const gapClass = isNumericGap ? `gap-${gap}` : undefined;

    // 숫자가 아닌 경우 variant gap 사용
    const variantGap = isNumericGap
      ? undefined
      : (gap as VariantProps<typeof stackVariants>['gap']);

    return (
      <Component
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as React.Ref<HTMLElement>}
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
 * VStack 컴포넌트 - 수직 스택
 * column 방향이 고정된 Stack
 */
export const VStack = React.forwardRef<
  HTMLDivElement,
  Omit<StackProps, 'direction'>
>((props, ref) => {
  return <Stack ref={ref} direction="column" {...props} />;
});
VStack.displayName = 'VStack';

/**
 * HStack 컴포넌트 - 수평 스택
 * row 방향이 고정된 Stack (기본 align="center")
 */
export const HStack = React.forwardRef<
  HTMLDivElement,
  Omit<StackProps, 'direction'>
>(({ align = 'center', ...props }, ref) => {
  return <Stack ref={ref} direction="row" align={align} {...props} />;
});
HStack.displayName = 'HStack';

// stackVariants 확장용 export
export { stackVariants };
