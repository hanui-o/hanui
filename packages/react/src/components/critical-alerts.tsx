'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

// ============================================================================
// Critical Alerts 컴포넌트
// KRDS 긴급 공지 - 사용자에게 긴급하거나 중요한 정보를 전달하는 카드 리스트
// ============================================================================

// 뱃지 스타일
const criticalBadgeVariants = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'gap-1',
    'min-w-[4.5rem]',
    'px-2.5',
    'py-1',
    'rounded',
    'text-krds-body-sm',
    'font-semibold',
    'shrink-0',
  ],
  {
    variants: {
      variant: {
        // 긴급 (빨간색)
        danger: ['bg-krds-functional-error', 'text-white'],
        // 안전 (초록색)
        ok: ['bg-krds-functional-success', 'text-white'],
        // 안내 (파란색)
        info: ['bg-krds-primary-base', 'text-white'],
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

// ============================================================================
// 아이콘 컴포넌트
// ============================================================================

// 긴급 아이콘 (삼각형 경고)
const DangerIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
      clipRule="evenodd"
    />
  </svg>
);

// 안전 아이콘 (삼각형 + 느낌표)
const OkIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
      clipRule="evenodd"
    />
  </svg>
);

// 안내 아이콘 (원형 i)
const InfoIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
      clipRule="evenodd"
    />
  </svg>
);

// 화살표 아이콘 (chevron right)
const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
      clipRule="evenodd"
    />
  </svg>
);

// ============================================================================
// CriticalAlertItem Props
// ============================================================================

export interface CriticalAlertItemProps
  extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'children'>,
    VariantProps<typeof criticalBadgeVariants> {
  /** 뱃지 레이블 텍스트 (기본값: variant에 따라 자동 설정) */
  label?: string;
  /** 공지 내용 */
  message: string;
  /** 링크 URL */
  href?: string;
  /** 링크 텍스트 (기본값: "자세히 보기") */
  linkText?: string;
  /** 링크 클릭 핸들러 */
  onLinkClick?: () => void;
  /** 아이콘 숨김 여부 */
  hideIcon?: boolean;
}

// ============================================================================
// CriticalAlertItem 컴포넌트
// ============================================================================

export const CriticalAlertItem = React.forwardRef<
  HTMLLIElement,
  CriticalAlertItemProps
>(
  (
    {
      className,
      variant = 'info',
      label,
      message,
      href,
      linkText = '자세히 보기',
      onLinkClick,
      hideIcon = false,
      ...props
    },
    ref
  ) => {
    // 기본 레이블
    const defaultLabels = {
      danger: '긴급',
      ok: '안전',
      info: '안내',
    };

    // 아이콘 선택
    const IconComponent = {
      danger: DangerIcon,
      ok: OkIcon,
      info: InfoIcon,
    }[variant || 'info'];

    const displayLabel = label || defaultLabels[variant || 'info'];

    const linkClassName =
      'inline-flex items-center gap-0.5 text-krds-body-md text-krds-label-alternative hover:text-krds-label-normal shrink-0 focus:outline-none focus:ring-2 focus:ring-krds-primary-base focus:ring-offset-2 rounded';

    return (
      <li ref={ref} className={cn('critical-alert-item', className)} {...props}>
        <div className="flex items-center gap-3 py-3 px-4 sm:px-6">
          {/* 뱃지 */}
          <span className={cn(criticalBadgeVariants({ variant }))}>
            {!hideIcon && <IconComponent className="w-4 h-4" />}
            <span>{displayLabel}</span>
          </span>

          {/* 공지 내용 */}
          <p className="flex-1 text-krds-body-md text-krds-label-normal truncate sm:whitespace-normal">
            {message}
          </p>

          {/* 링크 */}
          {href ? (
            <a href={href} className={linkClassName}>
              <span className="hidden sm:inline">{linkText}</span>
              <ChevronRightIcon className="w-5 h-5" />
            </a>
          ) : onLinkClick ? (
            <button
              type="button"
              onClick={onLinkClick}
              className={linkClassName}
            >
              <span className="hidden sm:inline">{linkText}</span>
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          ) : null}
        </div>
      </li>
    );
  }
);

CriticalAlertItem.displayName = 'CriticalAlertItem';

// ============================================================================
// CriticalAlerts (Container) Props
// ============================================================================

export interface CriticalAlertsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 자식 요소 (CriticalAlertItem들) */
  children: React.ReactNode;
}

// ============================================================================
// CriticalAlerts 컴포넌트 (컨테이너)
// ============================================================================

export const CriticalAlerts = React.forwardRef<
  HTMLDivElement,
  CriticalAlertsProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'krds-critical-alerts',
        'w-full',
        'max-w-5xl',
        'mx-auto',
        'bg-white',
        'border',
        'border-krds-gray-20',
        'rounded-lg',
        'shadow-sm',
        'overflow-hidden',
        className
      )}
      {...props}
    >
      <ul
        role="list"
        aria-label="긴급 공지 목록"
        className="divide-y divide-krds-gray-20"
      >
        {children}
      </ul>
    </div>
  );
});

CriticalAlerts.displayName = 'CriticalAlerts';

// ============================================================================
// 단일 배너 스타일 (기존 호환용)
// ============================================================================

export interface CriticalAlertBannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof criticalBadgeVariants> {
  /** 뱃지 레이블 텍스트 */
  label?: string;
  /** 공지 내용 */
  message: string;
  /** 링크 URL */
  href?: string;
  /** 링크 텍스트 */
  linkText?: string;
  /** 링크 클릭 핸들러 */
  onLinkClick?: () => void;
}

// 배너 배경 스타일
const bannerVariants = cva(['w-full', 'py-3', 'px-4'], {
  variants: {
    variant: {
      danger: ['bg-krds-functional-error', 'text-white'],
      ok: ['bg-krds-functional-success', 'text-white'],
      info: ['bg-krds-primary-base', 'text-white'],
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

export const CriticalAlertBanner = React.forwardRef<
  HTMLDivElement,
  CriticalAlertBannerProps
>(
  (
    {
      className,
      variant = 'info',
      label,
      message,
      href,
      linkText = '자세히 보기',
      onLinkClick,
      ...props
    },
    ref
  ) => {
    const defaultLabels = {
      danger: '긴급',
      ok: '안전',
      info: '안내',
    };

    const IconComponent = {
      danger: DangerIcon,
      ok: OkIcon,
      info: InfoIcon,
    }[variant || 'info'];

    const displayLabel = label || defaultLabels[variant || 'info'];

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        className={cn(bannerVariants({ variant }), className)}
        {...props}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/20 rounded text-krds-body-sm font-semibold">
            <IconComponent className="w-4 h-4" />
            <span>{displayLabel}</span>
          </span>

          <p className="text-krds-body-sm font-medium flex-1 text-center">
            {message}
          </p>

          {(href || onLinkClick) && (
            <a
              href={href}
              onClick={onLinkClick}
              className="inline-flex items-center gap-0.5 text-krds-body-sm font-medium underline underline-offset-2 hover:no-underline"
            >
              {linkText}
              <ChevronRightIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    );
  }
);

CriticalAlertBanner.displayName = 'CriticalAlertBanner';

// Variants export
export { criticalBadgeVariants, bannerVariants };
