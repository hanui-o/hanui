'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';
import { File, Copy, Check } from 'lucide-react';
import { cn } from '../lib/utils';

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
   * Size variant (inline only)
   * @default 'default'
   */
  size?: 'sm' | 'default' | 'lg';

  /**
   * Programming language for syntax highlighting (block only)
   */
  language?: string;

  /**
   * Show line numbers (block with language only)
   * @default true
   */
  showLineNumbers?: boolean;

  /**
   * File name to display (block with language only)
   */
  fileName?: string;

  /**
   * Shiki theme (block with language only)
   * @default 'github-dark'
   */
  theme?: string;
}

const sizeStyles = {
  sm: 'text-xs px-1 py-0.5',
  default: 'px-1.5 py-0.5',
  lg: 'text-base px-2 py-1',
} as const;

/**
 * Code - KRDS 준수 코드 컴포넌트
 *
 * ## Features
 * - 인라인 및 블록 코드 표시
 * - 선택적 Syntax highlighting (Shiki)
 * - 블록 코드 복사 버튼 (hover 시 표시)
 * - 3가지 크기 옵션 (inline)
 * - 줄 번호 표시 옵션 (block with language)
 * - 파일명 표시 옵션 (block with language)
 * - KRDS 색상 시스템 준수
 *
 * @example
 * ```tsx
 * // Inline code
 * <Code>const greeting = "Hello"</Code>
 *
 * // Block code (simple)
 * <Code variant="block">
 *   npm install @hanui/react
 * </Code>
 *
 * // Block code with syntax highlighting
 * <Code variant="block" language="typescript">
 *   const hello = 'world';
 * </Code>
 *
 * // With file name
 * <Code variant="block" language="javascript" fileName="example.js">
 *   console.log('Hello');
 * </Code>
 *
 * // Without line numbers
 * <Code variant="block" language="bash" showLineNumbers={false}>
 *   npm install @hanui/react
 * </Code>
 * ```
 */
export const Code = React.forwardRef<HTMLElement, CodeProps>(
  (
    {
      variant = 'inline',
      size = 'default',
      language,
      showLineNumbers = true,
      fileName,
      theme = 'github-dark',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = React.useState(false);
    const [html, setHtml] = useState('');

    const code = typeof children === 'string' ? children : '';

    // Syntax highlighting for block variant with language
    useEffect(() => {
      if (variant === 'block' && language) {
        const highlightCode = async () => {
          const highlighted = await codeToHtml(code, {
            lang: language,
            theme: theme,
          });
          setHtml(highlighted);
        };

        highlightCode();
      }
    }, [code, language, theme, variant]);

    const handleCopy = async () => {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    // Block variant with syntax highlighting
    if (variant === 'block' && language) {
      if (!html) {
        return (
          <div className={cn('relative group', className)}>
            <div className="overflow-x-auto rounded-lg bg-krds-gray-90 p-5">
              <div className="animate-pulse">
                <div className="h-4 bg-krds-gray-70 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-krds-gray-70 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className={cn('relative group', className)}>
          {fileName && (
            <div className="flex items-center gap-2 px-4 py-2 bg-krds-gray-90 border-b border-krds-gray-70 rounded-t-lg">
              <File className="w-3.5 h-3.5 text-krds-gray-40" />
              <span className="text-xs text-krds-gray-40 font-mono">
                {fileName}
              </span>
            </div>
          )}
          <div className="relative">
            <button
              onClick={handleCopy}
              className={cn(
                'absolute top-3 right-3 p-2 rounded-md transition-all z-10',
                'bg-krds-gray-70 hover:bg-krds-gray-60',
                'text-krds-gray-10 opacity-0 group-hover:opacity-100'
              )}
              aria-label="Copy code"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
            <div
              className={cn(
                'overflow-x-auto',
                fileName ? 'rounded-b-lg' : 'rounded-lg',
                showLineNumbers ? 'code-with-line-numbers' : ''
              )}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      );
    }

    // Block variant (simple, no syntax highlighting)
    if (variant === 'block') {
      return (
        <div className="relative group">
          <pre
            ref={ref as React.Ref<HTMLPreElement>}
            className={cn(
              'font-mono bg-krds-gray-5 rounded-lg p-4 overflow-x-auto',
              'text-krds-gray-95 border border-krds-gray-20',
              className
            )}
            {...props}
          >
            <code>{children}</code>
          </pre>
          <button
            onClick={handleCopy}
            className={cn(
              'absolute top-3 right-3 p-2 rounded-md transition-all z-10',
              'bg-krds-gray-10 hover:bg-krds-gray-20 border border-krds-gray-30',
              'text-krds-gray-95 opacity-0 group-hover:opacity-100'
            )}
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      );
    }

    // Inline variant
    return (
      <code
        ref={ref}
        className={cn(
          'font-mono bg-krds-gray-5 text-krds-gray-95 rounded border border-krds-gray-20',
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
