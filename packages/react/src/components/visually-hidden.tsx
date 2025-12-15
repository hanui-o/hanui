'use client';

import * as React from 'react';
import { cn } from '../lib/utils';

// ============================================================================
// Visually Hidden 컴포넌트
// KRDS 시각적으로 숨김 - 화면에는 보이지 않지만 스크린리더가 읽을 수 있는 콘텐츠
// ============================================================================

/**
 * Visually Hidden 스타일
 * - 화면에서 시각적으로 숨김
 * - 스크린리더에서 읽을 수 있음
 * - visibility:hidden, display:none 사용 금지 (스크린리더가 무시함)
 */
const visuallyHiddenStyles = [
  // 시각적으로 1px 크기로 축소
  'absolute',
  'w-px',
  'h-px',
  // 콘텐츠 영역 밖으로 클리핑
  'overflow-hidden',
  'clip-path-[inset(50%)]',
  // 레이아웃에서 제외
  'm-[-1px]',
  'p-0',
  // 텍스트 줄바꿈 방지
  'whitespace-nowrap',
  // 테두리 제거
  'border-0',
].join(' ');

// ============================================================================
// VisuallyHidden Props
// ============================================================================

export interface VisuallyHiddenProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** 렌더링할 HTML 요소 */
  as?: 'span' | 'div';
  /** 포커스 시 표시할지 여부 (인터랙티브 요소용) */
  focusable?: boolean;
}

// ============================================================================
// VisuallyHidden 컴포넌트
// ============================================================================

export const VisuallyHidden = React.forwardRef<
  HTMLSpanElement,
  VisuallyHiddenProps
>(({ className, as: Component = 'span', focusable = false, ...props }, ref) => {
  return (
    <Component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as React.Ref<HTMLSpanElement>}
      className={cn(
        // 기본 숨김 스타일
        visuallyHiddenStyles,
        // focusable일 경우 포커스 시 표시
        focusable && [
          'focus:static',
          'focus:w-auto',
          'focus:h-auto',
          'focus:overflow-visible',
          'focus:clip-path-none',
          'focus:m-0',
          'focus:whitespace-normal',
        ],
        className
      )}
      {...props}
    />
  );
});

VisuallyHidden.displayName = 'VisuallyHidden';

// ============================================================================
// sr-only 유틸리티 클래스 (Tailwind CSS 호환)
// Tailwind의 sr-only 클래스와 동일한 스타일
// ============================================================================

/**
 * 스크린리더 전용 텍스트를 위한 CSS 클래스명
 * Tailwind CSS의 sr-only 클래스와 동일
 */
export const srOnlyClassName = 'sr-only';

/**
 * 포커스 시 표시되는 스크린리더 전용 텍스트를 위한 CSS 클래스명
 * Tailwind CSS의 sr-only focus:not-sr-only 조합과 동일
 */
export const srOnlyFocusableClassName = 'sr-only focus:not-sr-only';
