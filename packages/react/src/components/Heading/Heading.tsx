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
 * - 기본 색상: gray-95 (bolder) - KRDS 명도 대비 4.5:1 준수, 다크 모드 자동 전환
 */
const headingVariants = cva(
  // Base styles - KRDS 명도 대비 4.5:1 이상을 만족하는 기본 색상
  ['font-bold', 'leading-[150%]', 'text-krds-gray-95'].join(' '),
  {
    variants: {
      level: {
        h1: ['text-[28px] md:text-[40px] mb-4 md:mb-6'].join(' '),
        h2: ['text-[24px] md:text-[32px] mb-3 md:mb-5'].join(' '),
        h3: ['text-[22px] md:text-[24px] mb-5 md:mb-6'].join(' '),
        h4: 'text-[19px] mb-3 md:mb-5',
        h5: 'text-[17px] mb-2 md:mb-4',
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
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

  /**
   * 텍스트 내용
   */
  children: React.ReactNode;
}

/**
 * Generate a URL-friendly ID from text
 */
function generateId(text: React.ReactNode): string {
  if (typeof text === 'string') {
    return text
      .toLowerCase()
      .replace(/[^\w\s가-힣-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  return '';
}

/**
 * Heading Component
 *
 * KRDS 타이포그래피 - 페이지/섹션 제목
 * 시맨틱 HTML 태그(h1-h6)와 함께 사용되어 SEO와 접근성을 보장
 * 자동으로 id를 생성하여 TOC 링크를 지원
 *
 * @example
 * ```tsx
 * <Heading level="h1">페이지 제목</Heading>
 * <Heading level="h2">섹션 제목</Heading>
 * <Heading level="h3">세부 제목</Heading>
 * ```
 */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 'h2', children, id, ...props }, ref) => {
    const Tag = level;

    // Generate id from children if not provided
    const headingId = id || generateId(children);

    const headingProps = {
      ref,
      id: headingId,
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
      default:
        return <h2 {...headingProps}>{children}</h2>;
    }
  }
);

Heading.displayName = 'Heading';
