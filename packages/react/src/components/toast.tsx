'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cn } from '@/lib/utils';
import { Info, CircleCheck, AlertTriangle, CircleX, X } from 'lucide-react';

/**
 * Toast 스타일 variants
 */
const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-lg border p-4 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'border-krds-gray-20 bg-white text-krds-gray-95',
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
      variant: 'default',
    },
  }
);

/**
 * 닫기 버튼 스타일
 */
const toastCloseVariants = cva(
  'absolute right-3 top-3 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 group-hover:opacity-100',
  {
    variants: {
      variant: {
        default: 'hover:bg-krds-gray-10 focus:ring-krds-gray-40',
        info: 'hover:bg-krds-info-10 focus:ring-krds-info-base',
        success: 'hover:bg-krds-success-10 focus:ring-krds-success-base',
        warning: 'hover:bg-krds-warning-10 focus:ring-krds-warning-base',
        error: 'hover:bg-krds-danger-10 focus:ring-krds-danger-base',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * 기본 아이콘 매핑
 */
const defaultIcons = {
  default: Info,
  info: Info,
  success: CircleCheck,
  warning: AlertTriangle,
  error: CircleX,
};

// ============================================================================
// Toast Provider
// ============================================================================

export interface ToastProviderProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Provider> {
  /**
   * Toast가 표시되는 위치
   * @default 'bottom-right'
   */
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  /**
   * Toast 영역으로 포커스를 이동하는 단축키
   * @default ['F8']
   */
  hotkey?: string[];
}

const positionStyles = {
  'top-left': 'top-0 left-0 flex-col',
  'top-center': 'top-0 left-1/2 -translate-x-1/2 flex-col items-center',
  'top-right': 'top-0 right-0 flex-col items-end',
  'bottom-left': 'bottom-0 left-0 flex-col-reverse',
  'bottom-center':
    'bottom-0 left-1/2 -translate-x-1/2 flex-col-reverse items-center',
  'bottom-right': 'bottom-0 right-0 flex-col-reverse items-end',
};

/**
 * ToastProvider 컴포넌트
 *
 * Toast 알림을 사용하기 위해 앱 루트에 감싸야 합니다.
 */
export function ToastProvider({
  children,
  position = 'bottom-right',
  hotkey = ['F8'],
  ...props
}: ToastProviderProps) {
  return (
    <ToastPrimitives.Provider {...props}>
      {children}
      <ToastPrimitives.Viewport
        className={cn(
          'fixed z-[100] flex max-h-screen w-full flex-col gap-2 p-4 sm:max-w-[420px]',
          positionStyles[position]
        )}
        label="알림"
        hotkey={hotkey}
      />
    </ToastPrimitives.Provider>
  );
}

// ============================================================================
// Toast Root
// ============================================================================

export interface ToastProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>,
      'title'
    >,
    VariantProps<typeof toastVariants> {
  /** Toast 제목 */
  title?: React.ReactNode;
  /** Toast 설명 */
  description?: React.ReactNode;
  /** 커스텀 아이콘 (false로 설정 시 아이콘 숨김) */
  icon?: React.ReactNode | false;
  /** 액션 버튼 */
  action?: React.ReactNode;
}

/**
 * Toast 컴포넌트
 *
 * 일시적인 알림 메시지를 표시합니다.
 *
 * @example
 * ```tsx
 * <ToastProvider>
 *   <Toast variant="success" title="저장 완료">
 *     파일이 성공적으로 저장되었습니다.
 *   </Toast>
 * </ToastProvider>
 * ```
 */
export const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  ToastProps
>(
  (
    {
      className,
      variant = 'default',
      title,
      description,
      children,
      icon,
      action,
      ...props
    },
    ref
  ) => {
    // 기본 아이콘 또는 커스텀 아이콘
    const DefaultIcon =
      icon === false ? null : defaultIcons[variant || 'default'];
    const customIcon = icon === false ? null : icon;

    // error variant는 즉시 알림 (aria-live="assertive")
    const toastType = variant === 'error' ? 'foreground' : 'background';

    // 아이콘 렌더링
    const renderIcon = () => {
      if (icon === false) return null;

      // 커스텀 아이콘이 ReactElement인 경우
      if (customIcon && React.isValidElement(customIcon)) {
        return (
          <span className="h-5 w-5 mt-0.5 shrink-0" aria-hidden="true">
            {customIcon}
          </span>
        );
      }

      // 기본 lucide 아이콘 사용
      if (DefaultIcon) {
        return (
          <DefaultIcon className="h-5 w-5 mt-0.5 shrink-0" aria-hidden="true" />
        );
      }

      return null;
    };

    return (
      <ToastPrimitives.Root
        ref={ref}
        type={toastType}
        className={cn(toastVariants({ variant }), className)}
        {...props}
      >
        {renderIcon()}
        <div className="flex-1 min-w-0 pr-6">
          {title && <ToastTitle>{title}</ToastTitle>}
          {(description || children) && (
            <ToastDescription>{description || children}</ToastDescription>
          )}
          {action && <div className="mt-2">{action}</div>}
        </div>
        <ToastClose variant={variant} />
      </ToastPrimitives.Root>
    );
  }
);

Toast.displayName = 'Toast';

// ============================================================================
// Toast Title
// ============================================================================

export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn('font-semibold leading-tight', className)}
    {...props}
  />
));

ToastTitle.displayName = 'ToastTitle';

// ============================================================================
// Toast Description
// ============================================================================

export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn('text-sm opacity-90 mt-1', className)}
    {...props}
  />
));

ToastDescription.displayName = 'ToastDescription';

// ============================================================================
// Toast Close
// ============================================================================

interface ToastCloseProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>,
    VariantProps<typeof toastCloseVariants> {}

export const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  ToastCloseProps
>(({ className, variant, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(toastCloseVariants({ variant }), className)}
    aria-label="닫기"
    {...props}
  >
    <X className="h-4 w-4" aria-hidden="true" />
  </ToastPrimitives.Close>
));

ToastClose.displayName = 'ToastClose';

// ============================================================================
// Toast Action
// ============================================================================

export const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
      'ring-offset-white focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'bg-krds-primary-base text-white hover:bg-krds-primary-60',
      className
    )}
    {...props}
  />
));

ToastAction.displayName = 'ToastAction';

// ============================================================================
// useToast Hook
// ============================================================================

type ToastType = {
  id: string;
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error';
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  icon?: React.ReactNode | false;
  duration?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

type ToastState = {
  toasts: ToastType[];
};

type ToastAction =
  | { type: 'ADD_TOAST'; toast: ToastType }
  | { type: 'UPDATE_TOAST'; toast: Partial<ToastType> & { id: string } }
  | { type: 'DISMISS_TOAST'; toastId: string }
  | { type: 'REMOVE_TOAST'; toastId: string };

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 1000;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: 'REMOVE_TOAST', toastId });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

const reducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case 'DISMISS_TOAST': {
      const { toastId } = action;

      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined ? { ...t, open: false } : t
        ),
      };
    }

    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return { ...state, toasts: [] };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

const listeners: Array<(state: ToastState) => void> = [];

let memoryState: ToastState = { toasts: [] };

function dispatch(action: ToastAction) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

type ToastOptions = Omit<ToastType, 'id'>;

/**
 * Toast를 프로그래밍 방식으로 표시하는 함수
 */
function toast(options: ToastOptions) {
  const id = genId();

  const update = (props: Partial<ToastType>) =>
    dispatch({ type: 'UPDATE_TOAST', toast: { ...props, id } });

  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id });

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...options,
      id,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) dismiss();
      },
    },
  });

  return { id, dismiss, update };
}

/**
 * useToast 훅
 *
 * Toast 상태를 구독하고 toast 함수를 반환합니다.
 *
 * @example
 * ```tsx
 * const { toast, toasts } = useToast();
 *
 * function handleClick() {
 *   toast({
 *     variant: 'success',
 *     title: '저장 완료',
 *     description: '파일이 성공적으로 저장되었습니다.',
 *   });
 * }
 * ```
 */
function useToast() {
  const [state, setState] = React.useState<ToastState>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) =>
      dispatch({ type: 'DISMISS_TOAST', toastId: toastId || '' }),
  };
}

// ============================================================================
// Toaster Component (렌더링용)
// ============================================================================

/**
 * Toaster 컴포넌트
 *
 * useToast 훅과 함께 사용하여 Toast를 렌더링합니다.
 */
function Toaster() {
  const { toasts } = useToast();

  return (
    <>
      {toasts.map(
        ({ id, title, description, action, icon, variant, ...props }) => (
          <Toast
            key={id}
            variant={variant}
            title={title}
            description={description}
            action={action}
            icon={icon}
            {...props}
          />
        )
      )}
    </>
  );
}

export { toastVariants, useToast, toast, Toaster };
