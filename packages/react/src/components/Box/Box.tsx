import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * Box Variants Definition
 *
 * 레이아웃 유틸리티 컴포넌트
 * Flexbox와 Grid를 쉽게 사용할 수 있도록 지원
 */
const boxVariants = cva('', {
  variants: {
    display: {
      flex: 'flex',
      'inline-flex': 'inline-flex',
      grid: 'grid',
      block: 'block',
      'inline-block': 'inline-block',
      none: 'hidden',
    },
    direction: {
      row: 'flex-row',
      'row-reverse': 'flex-row-reverse',
      column: 'flex-col',
      'column-reverse': 'flex-col-reverse',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    wrap: {
      wrap: 'flex-wrap',
      'wrap-reverse': 'flex-wrap-reverse',
      nowrap: 'flex-nowrap',
    },
    gap: {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      8: 'gap-8',
      10: 'gap-10',
      12: 'gap-12',
      16: 'gap-16',
    },
  },
  defaultVariants: {
    display: 'block',
  },
});

/**
 * Box Component Props
 */
export interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {
  /**
   * Display 타입
   * @default "block"
   */
  display?: 'flex' | 'inline-flex' | 'grid' | 'block' | 'inline-block' | 'none';

  /**
   * Flex direction (display가 flex일 때만 적용)
   */
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';

  /**
   * Align items (display가 flex일 때만 적용)
   */
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';

  /**
   * Justify content (display가 flex일 때만 적용)
   */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

  /**
   * Flex wrap (display가 flex일 때만 적용)
   */
  wrap?: 'wrap' | 'wrap-reverse' | 'nowrap';

  /**
   * Gap 크기 (Tailwind spacing scale: 1 = 0.25rem = 4px)
   */
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;

  /**
   * HTML 태그
   * @default "div"
   */
  as?:
    | 'div'
    | 'section'
    | 'article'
    | 'aside'
    | 'main'
    | 'nav'
    | 'header'
    | 'footer';

  /**
   * 자식 요소
   */
  children: React.ReactNode;
}

/**
 * Box Component
 *
 * 레이아웃을 위한 범용 컨테이너 컴포넌트
 * Flexbox와 Grid를 쉽게 사용할 수 있도록 props로 제공
 *
 * @example
 * ```tsx
 * // Flex 레이아웃
 * <Box display="flex" direction="column" gap={4}>
 *   <Heading level="h2">제목</Heading>
 *   <Body>내용</Body>
 * </Box>
 *
 * // 가로 정렬
 * <Box display="flex" align="center" gap={2}>
 *   <Label>이름:</Label>
 *   <Body>홍길동</Body>
 * </Box>
 *
 * // Grid 레이아웃
 * <Box display="grid" gap={4} className="grid-cols-3">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Box>
 * ```
 */
export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      className,
      display = 'block',
      direction,
      align,
      justify,
      wrap,
      gap,
      as: Component = 'div',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref as any}
        className={cn(
          boxVariants({
            display,
            direction,
            align,
            justify,
            wrap,
            gap,
          }),
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
