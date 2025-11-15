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
 * - 기본 색상:
 *   - Title (tit-*): gray-95 (bolder, 강한 대비)
 *   - Depth (depth-*): gray-90 (basic, 중간 대비)
 *   - KRDS 명도 대비 4.5:1 준수, 다크 모드 자동 전환
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
   * 네비게이션 텍스트 스타일
   * @default "depth-md"
   */
  variant?: 'tit-lg' | 'tit-sm' | 'depth-md' | 'depth-sm';

  /**
   * 글자 굵기 (tit-* 에는 자동 적용)
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
 * KRDS 타이포그래피 - 네비게이션 텍스트
 * 메뉴, 탭, 브레드크럼 등 네비게이션 요소에 사용
 *
 * @example
 * ```tsx
 * // 메인 타이틀
 * <NavText variant="tit-lg">주 메뉴</NavText>
 *
 * // 서브 타이틀
 * <NavText variant="tit-sm">카테고리</NavText>
 *
 * // 뎁스 메뉴
 * <NavText variant="depth-md">메뉴 항목</NavText>
 * <NavText variant="depth-md" weight="bold">현재 페이지</NavText>
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
    // tit-* variants는 bold가 강제됨
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
