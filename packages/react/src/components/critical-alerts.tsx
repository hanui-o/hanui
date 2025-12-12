'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import {
  Siren,
  AlertTriangle,
  Info,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';

// ============================================================================
// Critical Alerts 컴포넌트
// KRDS 긴급 공지 - 사용자에게 긴급하거나 중요한 정보를 전달하는 카드 리스트
// ============================================================================

// 뱃지 스타일 (KRDS: min-width 7.8rem, height from token, bold font)
const criticalBadgeVariants = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'gap-1.5',
    'min-w-[5rem]', // KRDS: 7.8rem but adjusted for our scale
    'h-8', // KRDS: var(--krds-size-height-7)
    'px-3',
    'rounded',
    'text-krds-label-sm',
    'font-bold',
    'shrink-0',
  ],
  {
    variants: {
      variant: {
        // 긴급 (빨간색)
        danger: ['bg-krds-danger-base', 'text-white'],
        // 안전 (초록색)
        ok: ['bg-krds-success-base', 'text-white'],
        // 안내 (파란색)
        info: ['bg-krds-info-base', 'text-white'],
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

// ============================================================================
// 아이콘 매핑 (Lucide React)
// ============================================================================

const iconMap: Record<string, LucideIcon> = {
  danger: Siren,
  ok: AlertTriangle,
  info: Info,
};

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

    // 아이콘 선택 (Lucide)
    const IconComponent = iconMap[variant || 'info'];
    const displayLabel = label || defaultLabels[variant || 'info'];

    const linkClassName = cn(
      'inline-flex items-center gap-0.5',
      'text-krds-body-md text-krds-gray-60',
      'hover:text-krds-gray-90',
      'shrink-0',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-base focus-visible:ring-offset-2 rounded'
    );

    return (
      <li
        ref={ref}
        className={cn(
          'critical-alert-item',
          'bg-white',
          'border border-krds-gray-20',
          'rounded-lg',
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-4 py-4 px-4 sm:px-6">
          {/* 뱃지 */}
          <span className={cn(criticalBadgeVariants({ variant }))}>
            {!hideIcon && (
              <IconComponent className="w-4 h-4" aria-hidden="true" />
            )}
            <span>{displayLabel}</span>
          </span>

          {/* 공지 내용 - 2줄 말줄임 */}
          <p className="flex-1 text-krds-body-md font-bold text-krds-gray-90 line-clamp-2">
            {message}
          </p>

          {/* 링크 버튼 */}
          {href ? (
            <a href={href} className={linkClassName}>
              <span className="hidden sm:inline">{linkText}</span>
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </a>
          ) : onLinkClick ? (
            <button
              type="button"
              onClick={onLinkClick}
              className={linkClassName}
            >
              <span className="hidden sm:inline">{linkText}</span>
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
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
        'main-urgent-wrap',
        'w-full',
        'max-w-[84.6rem]', // KRDS max-width
        'mx-auto',
        className
      )}
      {...props}
    >
      <ul
        aria-label="긴급 공지 목록"
        className="krds-critical-alerts space-y-3"
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
const bannerVariants = cva(['w-full', 'py-3', 'px-4', 'sm:py-4'], {
  variants: {
    variant: {
      danger: ['bg-krds-danger-base', 'text-white'],
      ok: ['bg-krds-success-base', 'text-white'],
      info: ['bg-krds-info-base', 'text-white'],
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

    // 아이콘 선택 (Lucide)
    const IconComponent = iconMap[variant || 'info'];
    const displayLabel = label || defaultLabels[variant || 'info'];

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        className={cn(bannerVariants({ variant }), className)}
        {...props}
      >
        <div className="max-w-[84.6rem] mx-auto flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/20 rounded text-krds-label-sm font-bold">
            <IconComponent className="w-4 h-4" aria-hidden="true" />
            <span>{displayLabel}</span>
          </span>

          <p className=" text-krds-body-md font-bold flex-1 text-center line-clamp-2">
            {message}
          </p>

          {(href || onLinkClick) && (
            <a
              href={href}
              onClick={onLinkClick}
              className="inline-flex items-center gap-0.5 text-krds-body-sm font-medium underline underline-offset-2 hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-current rounded"
            >
              {linkText}
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
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
