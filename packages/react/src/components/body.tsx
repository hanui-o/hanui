'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Body Variants Definition
 *
 * KRDS Typography - Body 스타일 (본문/기본 콘텐츠)
 * - Large: 19px
 * - Medium: 17px (표준 본문 크기)
 * - Small: 15px
 * - Xsmall: 13px
 * - 가중치: Normal(400) / Bold(700)
 * - 모든 레벨 줄 간격 150%
 * - 기본 색상: gray-90 (normal weight) / gray-95 (bold weight)
 * - 다크 모드 자동 전환 (CSS 변수 기반)
 */
const bodyVariants = cva(
  // Base styles - KRDS 명도 대비 4.5:1 이상을 만족하는 기본 색상
  'leading-[var(--krds-line-height-body)]',
  {
    variants: {
      size: {
        lg: '[font-size:var(--krds-font-size-body-lg)]',
        md: '[font-size:var(--krds-font-size-body-md)]',
        sm: '[font-size:var(--krds-font-size-body-sm)]',
        xs: '[font-size:var(--krds-font-size-body-xs)]',
      },
      weight: {
        normal: 'font-normal text-krds-gray-90', // 400 = normal
        bold: 'font-bold text-krds-gray-95', // 700 = bold
      },
    },
    defaultVariants: {
      size: 'md',
      weight: 'normal',
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
   * @default "normal"
   */
  weight?: 'normal' | 'bold';

  /**
   * HTML 태그
   * @default "p"
   */
  as?: 'p' | 'span' | 'div' | 'article' | 'section' | 'strong';

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
 * <Body as="strong">강조된 텍스트 (자동으로 bold 적용)</Body>
 * <Body size="sm" as="span">작은 텍스트</Body>
 * ```
 */
export const Body = React.forwardRef<HTMLElement, BodyProps>(
  (
    { className, size = 'md', weight, as: Component = 'p', children, ...props },
    ref
  ) => {
    // strong 태그일 때는 자동으로 bold weight 적용
    const finalWeight = weight ?? (Component === 'strong' ? 'bold' : 'normal');

    return (
      <Component
        ref={ref as any}
        className={cn(bodyVariants({ size, weight: finalWeight }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Body.displayName = 'Body';
