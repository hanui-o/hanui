import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Code Props
 */
export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Code variant
   * @default 'inline'
   */
  variant?: 'inline' | 'block';

  /**
   * Size variant
   * @default 'default'
   */
  size?: 'sm' | 'default' | 'lg';
}

const sizeStyles = {
  sm: 'text-xs px-1 py-0.5',
  default: 'px-1.5 py-0.5',
  lg: 'text-base px-2 py-1',
} as const;

/**
 * Code - KRDS 준수 인라인 코드 컴포넌트
 *
 * ## Features
 * - 인라인 및 블록 코드 표시
 * - 3가지 크기 옵션
 * - KRDS 색상 시스템 준수
 * - 모노스페이스 폰트
 *
 * @example
 * ```tsx
 * // Inline code
 * <Code>const greeting = "Hello"</Code>
 *
 * // Small size
 * <Code size="sm">npm install</Code>
 *
 * // Custom styling
 * <Code className="text-krds-primary-text">
 *   customFunction()
 * </Code>
 * ```
 */
export const Code = React.forwardRef<HTMLElement, CodeProps>(
  (
    { variant = 'inline', size = 'default', className, children, ...props },
    ref
  ) => {
    if (variant === 'block') {
      return (
        <pre
          ref={ref as React.Ref<HTMLPreElement>}
          className={cn(
            'font-mono bg-krds-gray-5 rounded-lg p-4 overflow-x-auto border border-krds-gray-20',
            'text-krds-gray-95',
            className
          )}
          {...props}
        >
          <code>{children}</code>
        </pre>
      );
    }

    return (
      <code
        ref={ref}
        className={cn(
          'font-mono bg-krds-gray-5 rounded',
          'text-krds-gray-95',
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </code>
    );
  }
);

Code.displayName = 'Code';
