import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * Display Variants Definition
 *
 * KRDS Typography - Display 스타일 (배너/마케팅)
 * - Large: 60px(PC) / 44px(Mobile) - 최대 강조
 * - Medium: 44px(PC) / 32px(Mobile) - 주요 제목
 * - Small: 36px(PC) / 28px(Mobile) - 보조 제목
 * - 모든 레벨 굵기 700(bold), 줄 간격 150%
 * - 기본 색상: gray-95 (bolder) - KRDS 명도 대비 4.5:1 준수, 다크 모드 자동 전환
 */
const displayVariants = cva(
  // Base styles - KRDS 명도 대비 4.5:1 이상을 만족하는 기본 색상
  ['font-bold', 'leading-[150%]', 'text-krds-gray-95'].join(' '),
  {
    variants: {
      size: {
        lg: ['text-[44px]', 'md:text-[60px]'].join(' '),
        md: ['text-[32px]', 'md:text-[44px]'].join(' '),
        sm: ['text-[28px]', 'md:text-[36px]'].join(' '),
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

/**
 * Display Component Props
 */
export interface DisplayProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof displayVariants> {
  /**
   * Display 크기
   * @default "md"
   */
  size?: 'lg' | 'md' | 'sm';

  /**
   * HTML 태그 (기본값: h1)
   * @default "h1"
   */
  as?: 'h1' | 'h2' | 'h3' | 'div' | 'p';

  /**
   * 텍스트 내용
   */
  children: React.ReactNode;
}

/**
 * Display Component
 *
 * KRDS 타이포그래피 - 배너/마케팅용 대형 텍스트
 * 가장 큰 크기의 텍스트로 주목을 끌어야 하는 곳에 사용
 *
 * @example
 * ```tsx
 * <Display size="lg">환영합니다</Display>
 * <Display size="md">공공서비스 플랫폼</Display>
 * <Display size="sm" as="h2">부제목</Display>
 * ```
 */
export const Display = React.forwardRef<HTMLHeadingElement, DisplayProps>(
  (
    { className, size = 'md', as: Component = 'h1', children, ...props },
    ref
  ) => {
    return (
      <Component
        ref={ref as any}
        className={cn(displayVariants({ size }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Display.displayName = 'Display';
