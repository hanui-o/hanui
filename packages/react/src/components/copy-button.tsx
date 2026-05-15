'use client';

import * as React from 'react';
import { Copy, Check } from 'lucide-react';
import { Button, type ButtonProps } from './button';
import { cn } from '@/lib/utils';

export interface CopyButtonProps
  extends Omit<ButtonProps, 'onClick' | 'children'> {
  /**
   * 클립보드에 복사할 문자열.
   *
   * @security 비밀번호, API 키 등 민감 데이터를 복사할 경우 클립보드에
   * 데이터가 남아 다른 앱에서 접근할 수 있습니다.
   */
  value: string;
  /** 복사 성공 후 원래 상태로 돌아가는 시간 (ms) */
  resetDelay?: number;
  /** 복사 성공 콜백 */
  onCopy?: (value: string) => void;
  /** 복사 실패 콜백 */
  onError?: (error: Error) => void;
  /** 기본 아이콘 (기본값: Copy) */
  icon?: React.ReactNode;
  /** 복사 완료 아이콘 (기본값: Check) */
  copiedIcon?: React.ReactNode;
}

export const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      value,
      resetDelay = 2000,
      onCopy,
      onError,
      icon,
      copiedIcon,
      className,
      variant = 'ghost',
      size = 'sm',
      disabled,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = React.useState(false);
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    const handleCopy = async () => {
      if (!value) return;

      if (!navigator?.clipboard?.writeText) {
        onError?.(
          new Error(
            'Clipboard API를 사용할 수 없습니다. HTTPS 환경 또는 Permissions Policy를 확인하세요.'
          )
        );
        return;
      }

      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        onCopy?.(value);

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          setCopied(false);
        }, resetDelay);
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error('클립보드 복사 실패');
        onError?.(error);
      }
    };

    const isDisabled = disabled || !value;

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn('inline-flex items-center gap-1.5', className)}
        disabled={isDisabled}
        onClick={handleCopy}
        aria-label={copied ? '복사됨' : '복사'}
        {...props}
      >
        {copied
          ? (copiedIcon ?? (
              <Check
                className="h-4 w-4 text-krds-success-60"
                aria-hidden="true"
              />
            ))
          : (icon ?? <Copy className="h-4 w-4" aria-hidden="true" />)}
      </Button>
    );
  }
);
CopyButton.displayName = 'CopyButton';
