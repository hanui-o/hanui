'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import * as Slot from '@radix-ui/react-slot';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const isDev = () => {
  // 개발 모드 체크 헬퍼 함수
  try {
    return (
      typeof process !== 'undefined' &&
      (process.env as { NODE_ENV?: string }).NODE_ENV === 'development'
    );
  } catch {
    return false;
  }
};

const buttonVariants = cva(
  // Button 스타일 variants (cva로 타입 안전한 variant 관리)
  'inline-flex items-center justify-center gap-2 min-w-20 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-krds-primary-base focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        // 시각적 스타일 variants (primary, secondary, tertiary 등)
        primary:
          'bg-krds-primary-50 text-krds-white hover:bg-krds-primary-60 active:bg-krds-primary-70',
        secondary:
          'border border-krds-primary-50 bg-krds-primary-5 text-krds-primary-base hover:bg-krds-primary-10 active:bg-krds-primary-20',
        tertiary:
          'border border-krds-gray-40 bg-krds-gray-0 text-krds-gray-95 hover:bg-krds-gray-5 active:bg-krds-gray-10',
        success:
          'bg-krds-success-base text-krds-white hover:bg-krds-success-60 active:bg-krds-success-70',
        danger:
          'bg-krds-danger-base text-krds-white hover:bg-krds-danger-60 active:bg-krds-danger-70',
        ghost:
          'bg-transparent text-krds-gray-95 hover:bg-krds-gray-5 active:bg-krds-gray-10',
        'ghost-primary':
          'bg-transparent text-krds-primary-base hover:bg-krds-primary-5 active:bg-krds-primary-10',
        outline:
          'border border-krds-primary-base bg-transparent text-krds-primary-base hover:bg-krds-primary-5 active:bg-krds-primary-10',
        black:
          'bg-krds-gray-95 text-krds-white hover:bg-krds-gray-90 active:bg-krds-gray-80',
      },
      size: {
        // 크기 variants (xs~xl, icon)
        xs: 'h-8 px-3 [font-size:var(--krds-body-sm)] leading-[var(--krds-leading-body)]',
        sm: 'h-10 px-4 [font-size:var(--krds-body-sm)] leading-[var(--krds-leading-body)]',
        md: 'h-12 px-5 [font-size:var(--krds-body-md)] leading-[var(--krds-leading-body)]',
        lg: 'h-14 px-6 [font-size:var(--krds-body-lg)] leading-[var(--krds-leading-body)]',
        xl: 'h-16 px-8 [font-size:var(--krds-body-lg)] leading-[var(--krds-leading-body)]',
        icon: 'h-12 w-12 !min-w-12',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps // Button Props (네이티브 button 속성 + HANUI 확장 기능)
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean; // Radix Slot 패턴으로 자식 컴포넌트로 렌더링 (Link 등)

  loading?: boolean; // 로딩 상태 (스피너 표시, 상호작용 비활성화, aria-busy 설정)

  iconLeft?: React.ReactNode; // 왼쪽 아이콘

  iconRight?: React.ReactNode; // 오른쪽 아이콘

  href?: string; // 링크 URL (제공 시 <a> 태그로 렌더링)

  target?: string; // 링크 target 속성 (href와 함께 사용)

  rel?: string; // 링크 rel 속성 (href와 함께 사용)
}

const LoadingSpinner = () => (
  // 로딩 스피너 컴포넌트 (Loader2 아이콘, aria-hidden)
  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
);

export const Button = React.forwardRef<
  // KRDS 기반 Button 컴포넌트 (ARIA, 로딩, 아이콘, 링크 지원)
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      disabled = false,
      iconLeft,
      iconRight,
      children,
      type = 'button',
      asChild = false,
      href,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const isIconOnly = !children && (iconLeft || iconRight);

    React.useEffect(() => {
      // 개발 모드: 아이콘 전용 버튼 aria-label 경고
      if (
        isDev() &&
        isIconOnly &&
        !props['aria-label'] &&
        !props['aria-labelledby']
      ) {
        console.warn(
          '[HANUI Button] Icon-only buttons must have an aria-label or aria-labelledby attribute for accessibility.\n' +
            'Example: <Button size="icon" iconLeft={<Icon />} aria-label="검색" />'
        );
      }
    }, [isIconOnly, props]);

    React.useEffect(() => {
      // 개발 모드: href와 asChild 동시 사용 경고
      if (isDev() && href && asChild) {
        console.warn(
          '[HANUI Button] href and asChild props cannot be used together. Use either href or asChild, not both.'
        );
      }
    }, [href, asChild]);

    const Comp = asChild ? Slot.Root : href ? 'a' : 'button'; // 렌더링할 컴포넌트 결정

    const content = // 공통 콘텐츠 (로딩 스피너, 아이콘, children)
      (
        <>
          {loading && <LoadingSpinner />}
          {!loading && iconLeft && (
            <span
              className="inline-flex"
              aria-hidden={isIconOnly ? 'true' : undefined}
            >
              {iconLeft}
            </span>
          )}
          {children}
          {!loading && iconRight && (
            <span
              className="inline-flex"
              aria-hidden={isIconOnly ? 'true' : undefined}
            >
              {iconRight}
            </span>
          )}
        </>
      );

    if (href && !asChild) {
      // 링크로 렌더링
      return (
        <a
          className={cn(buttonVariants({ variant, size }), className)}
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          aria-disabled={isDisabled}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      // 버튼 또는 Slot으로 렌더링
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref as React.Ref<any>}
        {...(!asChild && {
          type,
          disabled: isDisabled,
          'aria-busy': loading,
          'aria-disabled': isDisabled,
        })}
        {...(props as any)}
      >
        {content}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { buttonVariants }; // buttonVariants 내보내기 (커스텀 버튼 스타일 확장용)
