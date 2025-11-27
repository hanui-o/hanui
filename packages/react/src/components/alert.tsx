'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Info, CircleCheck, AlertTriangle, CircleX, X } from 'lucide-react';

/**
 * Alert 스타일 variants
 * - info: 정보성 메시지
 * - success: 성공 메시지
 * - warning: 경고 메시지
 * - error: 오류 메시지
 */
const alertVariants = cva(
  'relative flex items-start gap-3 rounded-lg border p-4 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        info: 'border-krds-info-20 bg-krds-info-5 text-krds-info-70 [&>svg]:text-krds-info-base',
        success:
          'border-krds-success-20 bg-krds-success-5 text-krds-success-70 [&>svg]:text-krds-success-base',
        warning:
          'border-krds-warning-20 bg-krds-warning-5 text-krds-warning-70 [&>svg]:text-krds-warning-base',
        error:
          'border-krds-danger-20 bg-krds-danger-5 text-krds-danger-70 [&>svg]:text-krds-danger-base',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

/**
 * Alert 타이틀 스타일
 */
const alertTitleVariants = cva('font-semibold leading-tight tracking-tight', {
  variants: {
    variant: {
      info: 'text-krds-info-70',
      success: 'text-krds-success-70',
      warning: 'text-krds-warning-70',
      error: 'text-krds-danger-70',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

/**
 * Alert 설명 스타일
 */
const alertDescriptionVariants = cva('text-sm [&_p]:leading-relaxed', {
  variants: {
    variant: {
      info: 'text-krds-info-60',
      success: 'text-krds-success-60',
      warning: 'text-krds-warning-60',
      error: 'text-krds-danger-60',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

/**
 * 닫기 버튼 스타일
 */
const closeButtonVariants = cva(
  'absolute right-3 top-3 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        info: 'hover:bg-krds-info-10 focus:ring-krds-info-base',
        success: 'hover:bg-krds-success-10 focus:ring-krds-success-base',
        warning: 'hover:bg-krds-warning-10 focus:ring-krds-warning-base',
        error: 'hover:bg-krds-danger-10 focus:ring-krds-danger-base',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

/**
 * 기본 아이콘 매핑
 */
const defaultIcons = {
  info: Info,
  success: CircleCheck,
  warning: AlertTriangle,
  error: CircleX,
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /** Alert 타이틀 */
  title?: React.ReactNode;
  /** 닫기 가능 여부 */
  closable?: boolean;
  /** 닫기 버튼 클릭 콜백 */
  onClose?: () => void;
  /** 커스텀 아이콘 (false로 설정 시 아이콘 숨김) */
  icon?: React.ReactNode | false;
  /**
   * role 속성
   * - 'alert': 중요/긴급한 메시지 (스크린리더가 즉시 읽음)
   * - 'status': 일반 상태 메시지
   * @default 'alert'
   */
  role?: 'alert' | 'status';
}

/**
 * Alert 컴포넌트
 *
 * 사용자에게 중요한 정보를 알리는 정적 메시지 컴포넌트입니다.
 *
 * 접근성:
 * - role="alert" 또는 role="status" 적용
 * - 스크린리더 호환
 * - 키보드 네비게이션 지원
 *
 * @example
 * ```tsx
 * <Alert variant="info" title="알림">
 *   새로운 업데이트가 있습니다.
 * </Alert>
 *
 * <Alert variant="error" title="오류" closable onClose={() => {}}>
 *   처리 중 오류가 발생했습니다.
 * </Alert>
 * ```
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = 'info',
      title,
      children,
      closable = false,
      onClose,
      icon,
      role = 'alert',
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(true);

    const handleClose = React.useCallback(() => {
      setIsVisible(false);
      onClose?.();
    }, [onClose]);

    if (!isVisible) {
      return null;
    }

    // Get the icon - either custom icon, default icon, or null
    const DefaultIcon = defaultIcons[variant || 'info'];
    const showIcon = icon !== false;

    // Render the icon element
    const renderIcon = () => {
      if (!showIcon) return null;

      // Custom icon provided (React element)
      if (icon && React.isValidElement(icon)) {
        return (
          <span
            className="h-5 w-5 mt-0.5 [&>svg]:h-full [&>svg]:w-full"
            aria-hidden="true"
          >
            {icon}
          </span>
        );
      }

      // Default icon (lucide-react component)
      if (DefaultIcon) {
        return <DefaultIcon className="h-5 w-5 mt-0.5" aria-hidden="true" />;
      }

      return null;
    };

    return (
      <div
        ref={ref}
        role={role}
        aria-live={role === 'alert' ? 'assertive' : 'polite'}
        aria-atomic="true"
        className={cn(
          alertVariants({ variant }),
          closable && 'pr-10',
          className
        )}
        {...props}
      >
        {renderIcon()}
        <div className="flex-1 min-w-0">
          {title && <AlertTitle variant={variant}>{title}</AlertTitle>}
          {children && (
            <AlertDescription variant={variant} hasTitle={!!title}>
              {children}
            </AlertDescription>
          )}
        </div>
        {closable && (
          <button
            type="button"
            className={cn(closeButtonVariants({ variant }))}
            onClick={handleClose}
            aria-label="닫기"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

/**
 * AlertTitle Props
 */
interface AlertTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof alertTitleVariants> {}

/**
 * AlertTitle 컴포넌트
 */
const AlertTitle = React.forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, variant, children, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn(alertTitleVariants({ variant }), className)}
      {...props}
    >
      {children}
    </h5>
  )
);

AlertTitle.displayName = 'AlertTitle';

/**
 * AlertDescription Props
 */
interface AlertDescriptionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertDescriptionVariants> {
  hasTitle?: boolean;
}

/**
 * AlertDescription 컴포넌트
 */
const AlertDescription = React.forwardRef<
  HTMLDivElement,
  AlertDescriptionProps
>(({ className, variant, hasTitle, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      alertDescriptionVariants({ variant }),
      hasTitle && 'mt-1',
      className
    )}
    {...props}
  >
    {children}
  </div>
));

AlertDescription.displayName = 'AlertDescription';

export { alertVariants, AlertTitle, AlertDescription };
