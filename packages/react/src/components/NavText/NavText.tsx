import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * NavText Variants Definition
 *
 * KRDS Typography - Navigation 스타일
 * Title:
 *   - Large: 24px(PC) / 22px(Mobile) - Bold(700)
 *   - Small: 19px(PC) / 17px(Mobile) - Bold(700)
 * Depth:
 *   - Medium: 17px - Regular(400) / Bold(700)
 *   - Small: 15px - Regular(400) / Bold(700)
 * - 줄 간격 150%
 */
const navTextVariants = cva(
  // Base styles
  ['leading-[150%]'].join(' '),
  {
    variants: {
      variant: {
        'title-large': ['text-[22px]', 'md:text-[24px]', 'font-bold'].join(' '),
        'title-small': ['text-[17px]', 'md:text-[19px]', 'font-bold'].join(' '),
        'depth-medium': 'text-[17px]',
        'depth-small': 'text-[15px]',
      },
      weight: {
        regular: 'font-normal', // 400
        bold: 'font-bold', // 700
      },
    },
    defaultVariants: {
      variant: 'depth-medium',
      weight: 'regular',
    },
  }
);

/**
 * NavText Component Props
 */
export interface NavTextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navTextVariants> {
  /**
   * 네비게이션 텍스트 스타일
   * @default "depth-medium"
   */
  variant?: 'title-large' | 'title-small' | 'depth-medium' | 'depth-small';

  /**
   * 글자 굵기 (title-* 에는 자동 적용)
   * @default "regular"
   */
  weight?: 'regular' | 'bold';

  /**
   * HTML 태그
   * @default "span"
   */
  as?: 'span' | 'a' | 'button' | 'div';

  /**
   * 텍스트 내용
   */
  children: React.ReactNode;
}

/**
 * NavText Component
 *
 * KRDS 타이포그래피 - 네비게이션 텍스트
 * 메뉴, 탭, 브레드크럼 등 네비게이션 요소에 사용
 *
 * @example
 * ```tsx
 * // 메인 타이틀
 * <NavText variant="title-large">주 메뉴</NavText>
 *
 * // 서브 타이틀
 * <NavText variant="title-small">카테고리</NavText>
 *
 * // 뎁스 메뉴
 * <NavText variant="depth-medium">메뉴 항목</NavText>
 * <NavText variant="depth-medium" weight="bold">현재 페이지</NavText>
 * ```
 */
export const NavText = React.forwardRef<HTMLElement, NavTextProps>(
  (
    {
      className,
      variant = 'depth-medium',
      weight = 'regular',
      as: Component = 'span',
      children,
      ...props
    },
    ref
  ) => {
    // title-* variants는 bold가 강제됨
    const finalWeight = variant?.startsWith('title-') ? 'bold' : weight;

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
