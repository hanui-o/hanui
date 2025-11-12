import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * Heading Variants Definition
 *
 * KRDS Typography - Heading 스타일 (페이지/섹션 타이틀)
 * - xlarge (h1): 40px(PC) / 28px(Mobile) - 페이지 주제
 * - large (h2): 32px(PC) / 24px(Mobile) - 주요 섹션
 * - medium (h3): 24px(PC) / 22px(Mobile) - 세부 섹션
 * - small (h4): 19px - 본문급 제목
 * - xsmall (h5): 17px - 부차 정보
 * - xxsmall (h6): 15px - 최소 제목
 * - 모든 레벨 굵기 700(bold), 줄 간격 150%
 */
const headingVariants = cva(
  // Base styles
  ['font-bold', 'leading-[150%]'].join(' '),
  {
    variants: {
      level: {
        h1: ['text-[28px]', 'md:text-[40px]'].join(' '),
        h2: ['text-[24px]', 'md:text-[32px]'].join(' '),
        h3: ['text-[22px]', 'md:text-[24px]'].join(' '),
        h4: 'text-[19px]',
        h5: 'text-[17px]',
        h6: 'text-[15px]',
      },
    },
    defaultVariants: {
      level: 'h2',
    },
  }
);

/**
 * Heading Component Props
 */
export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  /**
   * 제목 레벨 (h1~h6)
   * @default "h2"
   */
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  /**
   * 텍스트 내용
   */
  children: React.ReactNode;
}

/**
 * Heading Component
 *
 * KRDS 타이포그래피 - 페이지/섹션 제목
 * 시맨틱 HTML 태그(h1-h6)와 함께 사용되어 SEO와 접근성을 보장
 *
 * @example
 * ```tsx
 * <Heading level="h1">페이지 제목</Heading>
 * <Heading level="h2">섹션 제목</Heading>
 * <Heading level="h3">세부 제목</Heading>
 * ```
 */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 'h2', children, ...props }, ref) => {
    const Tag = level;

    const headingProps = {
      ref,
      className: cn(headingVariants({ level }), className),
      ...props,
    };

    switch (Tag) {
      case 'h1':
        return <h1 {...headingProps}>{children}</h1>;
      case 'h2':
        return <h2 {...headingProps}>{children}</h2>;
      case 'h3':
        return <h3 {...headingProps}>{children}</h3>;
      case 'h4':
        return <h4 {...headingProps}>{children}</h4>;
      case 'h5':
        return <h5 {...headingProps}>{children}</h5>;
      case 'h6':
        return <h6 {...headingProps}>{children}</h6>;
      default:
        return <h2 {...headingProps}>{children}</h2>;
    }
  }
);

Heading.displayName = 'Heading';
