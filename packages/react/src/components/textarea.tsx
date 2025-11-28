'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { useFormField } from './form-field';

// Textarea 스타일 variants
const textareaVariants = cva(
  [
    'flex w-full rounded-md font-medium',
    'min-h-36 px-4 py-2 text-[17px] leading-[150%]',
    'transition-colors resize-none',
    'placeholder:text-krds-gray-50',
    'focus-visible:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-krds-gray-10',
    'read-only:bg-krds-gray-5 read-only:cursor-default',
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'border border-krds-gray-60 bg-krds-white',
          'focus-visible:border-2 focus-visible:border-krds-primary-base',
        ].join(' '),
        filled: [
          'border border-transparent bg-krds-gray-10',
          'focus-visible:border-2 focus-visible:border-krds-primary-base',
        ].join(' '),
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {
  /** 시각적 스타일 */
  variant?: 'default' | 'filled';
  /** 상태 표시 */
  status?: 'error' | 'success' | 'info';
  /** @deprecated status="error" 사용 권장 */
  error?: boolean;
  /** 읽기 전용 */
  readOnly?: boolean;
  /** 자동 높이 조절 */
  autoResize?: boolean;
  /** 최대 행 수 (autoResize 사용 시) */
  maxRows?: number;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * Textarea - KRDS 텍스트 영역 컴포넌트
 *
 * autoResize, FormField 통합을 지원합니다.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      status,
      error = false,
      disabled = false,
      readOnly = false,
      autoResize = false,
      maxRows,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const internalRef = React.useRef<HTMLTextAreaElement>(null);
    const [internalValue, setInternalValue] = React.useState('');

    // FormField 컨텍스트 (선택적)
    let formField: ReturnType<typeof useFormField> | null = null;
    try {
      formField = useFormField();
    } catch {
      // FormField 없음
    }

    React.useImperativeHandle(ref, () => internalRef.current!);

    // 비제어 컴포넌트 값 동기화
    React.useEffect(() => {
      if (value == null && internalRef.current) {
        setInternalValue(internalRef.current.value);
      }
    }, [value]);

    // autoResize 기능
    React.useEffect(() => {
      if (!autoResize || !internalRef.current) return;

      const textarea = internalRef.current;
      const adjustHeight = () => {
        textarea.style.height = 'auto';
        const scrollHeight = textarea.scrollHeight;

        if (maxRows) {
          const lineHeight = parseInt(
            getComputedStyle(textarea).lineHeight,
            10
          );
          const maxHeight = lineHeight * maxRows;
          textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
          textarea.style.overflowY =
            scrollHeight > maxHeight ? 'auto' : 'hidden';
        } else {
          textarea.style.height = `${scrollHeight}px`;
          textarea.style.overflowY = 'hidden';
        }
      };

      adjustHeight();
      textarea.addEventListener('input', adjustHeight);
      return () => textarea.removeEventListener('input', adjustHeight);
    }, [autoResize, maxRows, value, internalValue]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInternalValue(e.target.value);
      onChange?.(e);
    };

    // 최종 status 결정
    const finalStatus =
      status || formField?.status || (error ? 'error' : undefined);
    const hasError = finalStatus === 'error';

    const mergedProps = {
      ...props,
      value,
      onChange: handleChange,
      id: formField?.id || props.id,
      disabled: formField?.disabled || disabled,
      readOnly: readOnly,
      'aria-invalid': hasError ? true : undefined,
      'aria-required': formField?.required || props['aria-required'],
      'aria-describedby':
        [formField?.errorId, formField?.helperId, props['aria-describedby']]
          .filter(Boolean)
          .join(' ') || undefined,
    };

    const getStatusClasses = () => {
      if (hasError) {
        return 'border-krds-danger-60 focus-visible:border-2 focus-visible:border-krds-danger-60';
      }
      return '';
    };

    return (
      <textarea
        className={cn(
          textareaVariants({ variant }),
          getStatusClasses(),
          className
        )}
        ref={internalRef}
        {...mergedProps}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { textareaVariants };
