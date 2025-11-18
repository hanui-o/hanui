'use client';

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
    const [copied, setCopied] = React.useState(false);

    const handleCopy = async () => {
      const text = typeof children === 'string' ? children : '';
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    if (variant === 'block') {
      return (
        <div className="relative group">
          <pre
            ref={ref as React.Ref<HTMLPreElement>}
            className={cn(
              'font-mono bg-krds-gray-90 rounded-lg p-4 overflow-x-auto',
              'text-krds-gray-10',
              className
            )}
            {...props}
          >
            <code>{children}</code>
          </pre>
          <button
            onClick={handleCopy}
            className={cn(
              'absolute top-3 right-3 p-2 rounded-md transition-all',
              'bg-krds-gray-70 hover:bg-krds-gray-60',
              'text-krds-gray-10 opacity-0 group-hover:opacity-100',
              'sticky'
            )}
            aria-label="Copy code"
          >
            {copied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            )}
          </button>
        </div>
      );
    }

    return (
      <code
        ref={ref}
        className={cn('font-mono', sizeStyles[size], className)}
        {...props}
      >
        {children}
      </code>
    );
  }
);

Code.displayName = 'Code';
