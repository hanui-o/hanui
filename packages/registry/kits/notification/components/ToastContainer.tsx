// Notification Kit - ToastContainer Component
// 토스트 알림 컨테이너 컴포넌트

'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@hanui/react';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';
import { useNotificationStore } from '../stores/notificationStore';
import type { ToastNotification } from '../types/notification';

interface ToastContainerProps {
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  maxToasts?: number;
}

const positionClasses = {
  'top-left': 'top-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
};

const typeIcons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

const typeColors = {
  info: {
    bg: 'bg-krds-primary-base',
    icon: 'text-white',
    border: 'border-krds-primary-base',
  },
  success: {
    bg: 'bg-krds-success-base',
    icon: 'text-white',
    border: 'border-krds-success-base',
  },
  warning: {
    bg: 'bg-krds-warning-base',
    icon: 'text-white',
    border: 'border-krds-warning-base',
  },
  error: {
    bg: 'bg-krds-danger-base',
    icon: 'text-white',
    border: 'border-krds-danger-base',
  },
};

function Toast({
  toast,
  onDismiss,
}: {
  toast: ToastNotification;
  onDismiss: (id: string) => void;
}) {
  const [isExiting, setIsExiting] = useState(false);
  const Icon = typeIcons[toast.type];
  const colors = typeColors[toast.type];

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => onDismiss(toast.id), 200);
  };

  return (
    <div
      className={`flex items-start gap-3 w-80 p-4 bg-white rounded-lg shadow-lg border-l-4 ${colors.border} transition-all duration-200 ${
        isExiting ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
      }`}
      role="alert"
      aria-live="polite"
    >
      <div
        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${colors.bg}`}
      >
        <Icon className={`w-4 h-4 ${colors.icon}`} />
      </div>
      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className="text-sm font-medium text-krds-gray-90">{toast.title}</p>
        )}
        <p className="text-sm text-krds-gray-70 mt-0.5">{toast.message}</p>
        {toast.action && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              toast.action?.onClick?.();
              if (toast.action?.href) {
                window.location.href = toast.action.href;
              }
              handleDismiss();
            }}
            className="mt-2 text-xs"
          >
            {toast.action.label}
          </Button>
        )}
      </div>
      {toast.dismissible && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDismiss}
          className="flex-shrink-0 h-6 w-6"
          aria-label="닫기"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}

export function ToastContainer({
  position = 'top-right',
  maxToasts = 5,
}: ToastContainerProps) {
  const { toasts, removeToast } = useNotificationStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const displayToasts = toasts.slice(-maxToasts);
  const isTop = position.startsWith('top');

  return createPortal(
    <div
      className={`fixed ${positionClasses[position]} z-[100] flex flex-col gap-2 ${
        isTop ? '' : 'flex-col-reverse'
      }`}
      aria-live="polite"
      aria-atomic="false"
    >
      {displayToasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={removeToast} />
      ))}
    </div>,
    document.body
  );
}
