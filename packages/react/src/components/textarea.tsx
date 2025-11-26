'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { useFormField } from './form-field';

const textareaVariants = cva(
  // Textarea 스타일 variants (cva로 타입 안전한 variant 관리)
  [
    'flex',
    'w-full',
    'rounded-md',
    'font-medium',
    'transition-colors',
    'placeholder:text-krds-gray-50',
    'focus-visible:outline-none',
    'disabled:cursor-not-allowed',
    'disabled:opacity-60',
    'disabled:bg-krds-gray-10',
    'read-only:bg-krds-gray-5',
    'read-only:cursor-default',
    'resize-y',
  ].join(' '),
  {
    variants: {
      variant: {
        // 시각적 스타일 (default, filled)
        default: [
          'border',
          'border-krds-gray-60',
          'bg-krds-white',
          'focus-visible:border-2',
          'focus-visible:border-krds-primary-base',
        ].join(' '),
        filled: [
          'border',
          'border-transparent',
          'bg-krds-gray-10',
          'focus-visible:border-2',
          'focus-visible:border-krds-primary-base',
        ].join(' '),
      },
      size: {
        // 크기 (sm, md, lg)
        sm: ['min-h-20', 'px-4', 'py-2', 'text-[15px]', 'leading-[150%]'].join(
          ' '
        ), // 80px min - KRDS body-sm
        md: ['min-h-24', 'px-4', 'py-2', 'text-[17px]', 'leading-[150%]'].join(
          ' '
        ), // 96px min - KRDS body-md (기본)
        lg: ['min-h-32', 'px-4', 'py-3', 'text-[19px]', 'leading-[150%]'].join(
          ' '
        ), // 128px min - KRDS body-lg
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface TextareaProps // Textarea Props
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {
  size?: 'sm' | 'md' | 'lg'; // 크기 (기본값: md)
  variant?: 'default' | 'filled'; // 시각적 스타일 (기본값: default)
  status?: 'error' | 'success' | 'info'; // 상태 (error: 에러, success: 성공, info: 정보)
  error?: boolean; // @deprecated status="error" 사용 권장 (하위 호환성)
  readOnly?: boolean; // 읽기 전용 상태
  autoResize?: boolean; // 자동 높이 조절 (기본값: false)
  maxRows?: number; // 최대 행 수 (autoResize 사용 시)
  className?: string; // 레이아웃 조정용 className (margin, width만 허용)
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>( // KRDS Textarea 컴포넌트 (autoResize, FormField 통합)
  (
    {
      className,
      variant,
      size,
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
    const internalRef = React.useRef<HTMLTextAreaElement>(null); // 내부 ref
    const [internalValue, setInternalValue] = React.useState(''); // 비제어 컴포넌트용 내부 값

    let formField: ReturnType<typeof useFormField> | null = null; // FormField 컨텍스트 (선택적)
    try {
      formField = useFormField();
    } catch {
      // FormField 없음, 독립 모드
    }

    React.useImperativeHandle(ref, () => internalRef.current!); // 외부/내부 ref 병합

    React.useEffect(() => {
      // 비제어 컴포넌트의 internalValue 동기화
      if (value == null && internalRef.current) {
        setInternalValue(internalRef.current.value);
      }
    }, [value]);

    // autoResize 기능 구현
    React.useEffect(() => {
      if (!autoResize || !internalRef.current) return;

      const textarea = internalRef.current;
      const adjustHeight = () => {
        textarea.style.height = 'auto'; // 높이 초기화
        const scrollHeight = textarea.scrollHeight;

        // maxRows 제한 적용
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

      adjustHeight(); // 초기 높이 조절
      textarea.addEventListener('input', adjustHeight);

      return () => {
        textarea.removeEventListener('input', adjustHeight);
      };
    }, [autoResize, maxRows, value, internalValue]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      // textarea 변경 처리 (내부 값 추적)
      setInternalValue(e.target.value);
      if (onChange) {
        onChange(e);
      }
    };

    const finalStatus =
      status || formField?.status || (error ? 'error' : undefined); // 최종 status 결정 (우선순위: Textarea status > FormField status > error prop)
    const hasError = finalStatus === 'error';

    const mergedProps = {
      // FormField 컨텍스트가 있으면 props 병합
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
      // status 기반 스타일링
      if (hasError) {
        return 'border-krds-danger-60 focus-visible:border-2 focus-visible:border-krds-danger-60';
      }
      return ''; // success/info는 helper text 색상만 영향
    };

    return (
      <textarea
        className={cn(
          textareaVariants({ variant, size }),
          getStatusClasses(),
          autoResize && 'resize-none', // autoResize 시 수동 resize 비활성화
          className
        )}
        ref={internalRef}
        {...mergedProps}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { textareaVariants }; // textareaVariants 내보내기 (커스텀 textarea 스타일 확장용)
