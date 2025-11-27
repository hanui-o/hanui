'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { cn } from '@/lib/utils';
import { AlertTriangle, Info, CircleCheck, CircleX } from 'lucide-react';

// ============================================================================
// AlertDialog Root & Trigger
// ============================================================================

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;

// ============================================================================
// AlertDialog Overlay
// ============================================================================

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
));
AlertDialogOverlay.displayName = 'AlertDialogOverlay';

// ============================================================================
// AlertDialog Content
// ============================================================================

const alertDialogContentVariants = cva(
  'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
  {
    variants: {
      variant: {
        default: 'border-krds-gray-20',
        warning: 'border-krds-warning-20',
        danger: 'border-krds-danger-20',
        info: 'border-krds-info-20',
        success: 'border-krds-success-20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface AlertDialogContentProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>,
    VariantProps<typeof alertDialogContentVariants> {}

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  AlertDialogContentProps
>(({ className, variant, children, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(alertDialogContentVariants({ variant }), className)}
      {...props}
    >
      {children}
    </AlertDialogPrimitive.Content>
  </AlertDialogPortal>
));
AlertDialogContent.displayName = 'AlertDialogContent';

// ============================================================================
// AlertDialog Header
// ============================================================================

const alertDialogHeaderVariants = cva(
  'flex flex-col gap-2 text-center sm:text-left',
  {
    variants: {
      variant: {
        default: '',
        warning: '',
        danger: '',
        info: '',
        success: '',
      },
      withIcon: {
        true: 'sm:flex-row sm:items-start sm:gap-4',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      withIcon: false,
    },
  }
);

export interface AlertDialogHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertDialogHeaderVariants> {
  /** 아이콘 표시 여부 (variant에 따라 자동) */
  showIcon?: boolean;
}

const iconMap = {
  default: null,
  warning: AlertTriangle,
  danger: CircleX,
  info: Info,
  success: CircleCheck,
};

const iconColorMap = {
  default: '',
  warning: 'text-krds-warning-base bg-krds-warning-10',
  danger: 'text-krds-danger-base bg-krds-danger-10',
  info: 'text-krds-info-base bg-krds-info-10',
  success: 'text-krds-success-base bg-krds-success-10',
};

const AlertDialogHeader = ({
  className,
  variant = 'default',
  showIcon = true,
  children,
  ...props
}: AlertDialogHeaderProps) => {
  const IconComponent = showIcon ? iconMap[variant || 'default'] : null;

  return (
    <div
      className={cn(
        alertDialogHeaderVariants({ variant, withIcon: !!IconComponent }),
        className
      )}
      {...props}
    >
      {IconComponent && (
        <div
          className={cn(
            'mx-auto sm:mx-0 flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
            iconColorMap[variant || 'default']
          )}
        >
          <IconComponent className="h-5 w-5" aria-hidden="true" />
        </div>
      )}
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
};
AlertDialogHeader.displayName = 'AlertDialogHeader';

// ============================================================================
// AlertDialog Footer
// ============================================================================

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
      className
    )}
    {...props}
  />
);
AlertDialogFooter.displayName = 'AlertDialogFooter';

// ============================================================================
// AlertDialog Title
// ============================================================================

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold text-krds-gray-95', className)}
    {...props}
  />
));
AlertDialogTitle.displayName = 'AlertDialogTitle';

// ============================================================================
// AlertDialog Description
// ============================================================================

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-krds-gray-70', className)}
    {...props}
  />
));
AlertDialogDescription.displayName = 'AlertDialogDescription';

// ============================================================================
// AlertDialog Action Button
// ============================================================================

const alertDialogActionVariants = cva(
  'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-krds-primary-base text-white hover:bg-krds-primary-60 focus:ring-krds-primary-base',
        danger:
          'bg-krds-danger-base text-white hover:bg-krds-danger-60 focus:ring-krds-danger-base',
        warning:
          'bg-krds-warning-base text-white hover:bg-krds-warning-60 focus:ring-krds-warning-base',
        success:
          'bg-krds-success-base text-white hover:bg-krds-success-60 focus:ring-krds-success-base',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface AlertDialogActionProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>,
    VariantProps<typeof alertDialogActionVariants> {}

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  AlertDialogActionProps
>(({ className, variant, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(alertDialogActionVariants({ variant }), className)}
    {...props}
  />
));
AlertDialogAction.displayName = 'AlertDialogAction';

// ============================================================================
// AlertDialog Cancel Button
// ============================================================================

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center rounded-md border border-krds-gray-30 bg-white px-4 py-2 text-sm font-medium text-krds-gray-95 transition-colors hover:bg-krds-gray-5 focus:outline-none focus:ring-2 focus:ring-krds-gray-40 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      className
    )}
    {...props}
  />
));
AlertDialogCancel.displayName = 'AlertDialogCancel';

// ============================================================================
// Composed AlertDialog (간편 사용)
// ============================================================================

export interface SimpleAlertDialogProps {
  /** 열림 상태 */
  open?: boolean;
  /** 열림 상태 변경 콜백 */
  onOpenChange?: (open: boolean) => void;
  /** 트리거 요소 */
  trigger?: React.ReactNode;
  /** 다이얼로그 variant */
  variant?: 'default' | 'warning' | 'danger' | 'info' | 'success';
  /** 제목 */
  title: string;
  /** 설명 */
  description?: string;
  /** 확인 버튼 텍스트 */
  confirmText?: string;
  /** 취소 버튼 텍스트 */
  cancelText?: string;
  /** 확인 버튼 클릭 콜백 */
  onConfirm?: () => void;
  /** 취소 버튼 클릭 콜백 */
  onCancel?: () => void;
  /** 아이콘 표시 여부 */
  showIcon?: boolean;
  /** 자식 요소 (커스텀 콘텐츠) */
  children?: React.ReactNode;
}

/**
 * SimpleAlertDialog 컴포넌트
 *
 * 간편하게 사용할 수 있는 AlertDialog입니다.
 *
 * @example
 * ```tsx
 * <SimpleAlertDialog
 *   trigger={<Button>삭제</Button>}
 *   variant="danger"
 *   title="정말 삭제하시겠습니까?"
 *   description="삭제된 데이터는 복구할 수 없습니다."
 *   confirmText="삭제"
 *   onConfirm={() => handleDelete()}
 * />
 * ```
 */
export function SimpleAlertDialog({
  open,
  onOpenChange,
  trigger,
  variant = 'default',
  title,
  description,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  showIcon = true,
  children,
}: SimpleAlertDialogProps) {
  const actionVariant =
    variant === 'danger'
      ? 'danger'
      : variant === 'warning'
        ? 'warning'
        : variant === 'success'
          ? 'success'
          : 'default';

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent variant={variant}>
        <AlertDialogHeader variant={variant} showIcon={showIcon}>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction variant={actionVariant} onClick={onConfirm}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  alertDialogContentVariants,
  alertDialogActionVariants,
};
