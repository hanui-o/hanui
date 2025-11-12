import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * Label Variants Definition
 *
 * KRDS Typography - Label 스타일 (버튼/입력 필드 라벨)
 * - Large: 19px
 * - Medium: 17px
 * - Small: 15px
 * - Xsmall: 13px
 * - 가중치: Regular(400) 기본
 * - 줄 간격 150%
 */
const labelVariants = cva(
  // Base styles
  ['font-normal', 'leading-[150%]'].join(' '),
  {
    variants: {
      size: {
        large: 'text-[19px]',
        medium: 'text-[17px]',
        small: 'text-[15px]',
        xsmall: 'text-[13px]',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }
);

/**
 * Label Component Props
 */
export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  /**
   * 라벨 크기
   * @default "medium"
   */
  size?: 'large' | 'medium' | 'small' | 'xsmall';

  /**
   * 연결할 input의 id
   */
  htmlFor?: string;

  /**
   * 텍스트 내용
   */
  children: React.ReactNode;
}

/**
 * Label Component
 *
 * KRDS 타이포그래피 - 폼 라벨
 * 입력 필드, 버튼, 체크박스 등의 라벨로 사용
 * htmlFor 속성으로 input과 연결하여 접근성 보장
 *
 * @example
 * ```tsx
 * <Label htmlFor="email">이메일</Label>
 * <input id="email" type="email" />
 *
 * <Label size="small" htmlFor="agree">
 *   약관에 동의합니다
 * </Label>
 * ```
 */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, size = 'medium', children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(labelVariants({ size }), className)}
        {...props}
      >
        {children}
      </label>
    );
  }
);

Label.displayName = 'Label';
