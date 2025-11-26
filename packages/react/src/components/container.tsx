import * as React from 'react';
import { cn } from '@/lib/utils';

const maxWidthClasses = {
  // KRDS Breakpoints 기반 max-width 클래스 (xs~2xl, full)
  xs: 'max-w-krds-xs',
  sm: 'max-w-krds-sm',
  md: 'max-w-krds-md',
  lg: 'max-w-krds-lg',
  xl: 'max-w-krds-xl',
  '2xl': 'max-w-krds-2xl',
  full: 'max-w-full',
} as const;

export interface ContainerProps {
  // Container Props
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | false; // 최대 너비 (기본값: xl)
  disablePadding?: boolean; // 수평 패딩 제거 (기본값: false)
  as?: 'div' | 'section' | 'article' | 'main' | 'aside' | 'header' | 'footer'; // 렌더링할 HTML 요소 (기본값: div)
  children: React.ReactNode;
  className?: string;
}

export const Container = React.forwardRef<
  // KRDS 레이아웃 Container (반응형 max-width, 자동 센터링, 화면 여백)
  HTMLElement,
  ContainerProps & React.HTMLAttributes<HTMLElement>
>(
  (
    {
      maxWidth = 'xl',
      disablePadding = false,
      as: Component = 'div',
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref as any}
        className={cn(
          'mx-auto w-full', // 수평 센터링, 전체 너비
          maxWidth !== false && maxWidthClasses[maxWidth], // max-width 적용
          !disablePadding && 'px-4 sm:px-6 lg:px-8', // 화면 여백 (KRDS 기준: 16px/24px/32px)
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';
