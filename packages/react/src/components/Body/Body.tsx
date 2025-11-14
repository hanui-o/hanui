import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * Body Variants Definition
 *
 * KRDS Typography - Body 스타일 (본문/기본 콘텐츠)
 * - Large: 19px
 * - Medium: 17px (표준 본문 크기)
 * - Small: 15px
 * - Xsmall: 13px
 * - 가중치: Regular(400) / Bold(700)
 * - 모든 레벨 줄 간격 150%
 * - 기본 색상: gray-700 (라이트) / gray-300 (다크) - KRDS 명도 대비 4.5:1 준수
 */
const bodyVariants = cva(
  // Base styles - KRDS 명도 대비 4.5:1 이상을 만족하는 기본 색상
  ['leading-[150%]', 'text-gray-700', 'dark:text-gray-300'].join(' '),
  {
    variants: {
      size: {
        lg: 'text-[19px]',
        md: 'text-[17px]',
        sm: 'text-[15px]',
        xs: 'text-[13px]',
      },
      weight: {
        regular: 'font-normal', // 400
        bold: 'font-bold', // 700
      },
    },
    defaultVariants: {
      size: 'md',
      weight: 'regular',
    },
  }
);

/**
 * Body Component Props
 */
export interface BodyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof bodyVariants> {
  /**
   * 텍스트 크기
   * @default "md"
   */
  size?: 'lg' | 'md' | 'sm' | 'xs';

  /**
   * 글자 굵기
   * @default "regular"
   */
  weight?: 'regular' | 'bold';

  /**
   * HTML 태그
   * @default "p"
   */
  as?: 'p' | 'span' | 'div' | 'article' | 'section';

  /**
   * 텍스트 내용
   */
  children: React.ReactNode;
}

/**
 * Body Component
 *
 * KRDS 타이포그래피 - 본문 텍스트
 * 일반적인 콘텐츠와 설명 텍스트에 사용
 * 기본 크기는 medium(17px)으로 KRDS 표준을 따름
 *
 * @example
 * ```tsx
 * <Body>기본 본문 텍스트입니다.</Body>
 * <Body size="lg">큰 본문 텍스트</Body>
 * <Body weight="bold">강조된 텍스트</Body>
 * <Body size="sm" as="span">작은 텍스트</Body>
 * ```
 */
export const Body = React.forwardRef<HTMLElement, BodyProps>(
  (
    {
      className,
      size = 'md',
      weight = 'regular',
      as: Component = 'p',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref as any}
        className={cn(bodyVariants({ size, weight }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Body.displayName = 'Body';
