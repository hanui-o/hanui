'use client';

/**
 * Form Kit - AutoSaveForm Component
 * 자동 저장 폼 컴포넌트
 */

import * as React from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Check, AlertCircle, Loader2, Cloud, CloudOff } from 'lucide-react';

// ============================================================================
// 타입 정의
// ============================================================================

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error' | 'offline';

export interface AutoSaveFormProps<T extends FieldValues> {
  /** react-hook-form 인스턴스 */
  form: UseFormReturn<T>;
  /** 저장 함수 */
  onSave: (data: T) => Promise<void>;
  /** 자식 요소 */
  children: React.ReactNode;
  /** 디바운스 시간 (ms) */
  debounceMs?: number;
  /** 활성화 여부 */
  enabled?: boolean;
  /** 추가 className */
  className?: string;
  /** 상태 표시 위치 */
  statusPosition?: 'top' | 'bottom' | 'none';
  /** 커스텀 상태 표시 렌더링 */
  renderStatus?: (props: {
    status: SaveStatus;
    lastSavedAt: Date | null;
    error: string | null;
  }) => React.ReactNode;
  /** 저장 성공 콜백 */
  onSaveSuccess?: () => void;
  /** 저장 실패 콜백 */
  onSaveError?: (error: Error) => void;
  /** 폼 속성 */
  formProps?: React.FormHTMLAttributes<HTMLFormElement>;
}

export interface AutoSaveStatusProps {
  /** 저장 상태 */
  status: SaveStatus;
  /** 마지막 저장 시간 */
  lastSavedAt: Date | null;
  /** 에러 메시지 */
  error: string | null;
  /** 추가 className */
  className?: string;
  /** 컴팩트 모드 */
  compact?: boolean;
}

// ============================================================================
// AutoSaveStatus 컴포넌트
// ============================================================================

/**
 * 자동 저장 상태 표시 컴포넌트
 *
 * 접근성:
 * - 저장 상태는 aria-live="polite"로 스크린리더에 알림
 * - 에러 상태는 role="alert"로 긴급 알림
 */
export function AutoSaveStatus({
  status,
  lastSavedAt,
  error,
  className,
  compact = false,
}: AutoSaveStatusProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 상태별 렌더링
  const renderStatusContent = () => {
    switch (status) {
      case 'saving':
        return (
          <div
            className="flex items-center gap-2 text-krds-gray-60"
            aria-live="polite"
            aria-busy="true"
          >
            <Loader2
              size={compact ? 14 : 16}
              className="animate-spin"
              aria-hidden="true"
            />
            <span className={compact ? 'text-xs' : 'text-sm'}>저장 중...</span>
          </div>
        );

      case 'saved':
        return (
          <div
            className="flex items-center gap-2 text-krds-success-60"
            aria-live="polite"
          >
            <Check size={compact ? 14 : 16} aria-hidden="true" />
            <span className={compact ? 'text-xs' : 'text-sm'}>
              {compact
                ? '저장됨'
                : `저장됨 ${lastSavedAt ? formatTime(lastSavedAt) : ''}`}
            </span>
          </div>
        );

      case 'error':
        return (
          <div
            className="flex items-center gap-2 text-krds-danger-60"
            role="alert"
            aria-live="assertive"
          >
            <AlertCircle size={compact ? 14 : 16} aria-hidden="true" />
            <span className={compact ? 'text-xs' : 'text-sm'}>
              {compact ? '저장 실패' : error || '저장 중 오류가 발생했습니다'}
            </span>
          </div>
        );

      case 'offline':
        return (
          <div
            className="flex items-center gap-2 text-krds-gray-50"
            aria-live="polite"
          >
            <CloudOff size={compact ? 14 : 16} aria-hidden="true" />
            <span className={compact ? 'text-xs' : 'text-sm'}>
              오프라인 모드
            </span>
          </div>
        );

      case 'idle':
      default:
        if (lastSavedAt && !compact) {
          return (
            <div
              className="flex items-center gap-2 text-krds-gray-50"
              aria-live="off"
            >
              <Cloud size={16} aria-hidden="true" />
              <span className="text-sm">
                마지막 저장: {formatTime(lastSavedAt)}
              </span>
            </div>
          );
        }
        return null;
    }
  };

  const content = renderStatusContent();

  if (!content) return null;

  return <div className={cn('transition-opacity', className)}>{content}</div>;
}

AutoSaveStatus.displayName = 'AutoSaveStatus';

// ============================================================================
// AutoSaveForm 컴포넌트
// ============================================================================

/**
 * 자동 저장 폼 컴포넌트
 *
 * 접근성 기능:
 * - 저장 상태 aria-live="polite"
 * - 에러 role="alert"
 *
 * @example
 * ```tsx
 * function DraftEditor() {
 *   const form = useForm<DraftData>({
 *     defaultValues: { title: '', content: '' },
 *   });
 *
 *   return (
 *     <AutoSaveForm
 *       form={form}
 *       onSave={async (data) => {
 *         await saveDraft(data);
 *       }}
 *       debounceMs={2000}
 *     >
 *       <Input {...form.register('title')} placeholder="제목" />
 *       <Textarea {...form.register('content')} placeholder="내용" />
 *     </AutoSaveForm>
 *   );
 * }
 * ```
 */
export function AutoSaveForm<T extends FieldValues>({
  form,
  onSave,
  children,
  debounceMs = 2000,
  enabled = true,
  className,
  statusPosition = 'top',
  renderStatus,
  onSaveSuccess,
  onSaveError,
  formProps,
}: AutoSaveFormProps<T>) {
  const [status, setStatus] = React.useState<SaveStatus>('idle');
  const [error, setError] = React.useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = React.useState<Date | null>(null);
  const [isOnline, setIsOnline] = React.useState(true);

  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = React.useRef(true);

  const { watch, getValues, formState } = form;
  const { isDirty, isValid } = formState;

  // 온라인 상태 감지
  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => {
      setIsOnline(false);
      setStatus('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 컴포넌트 언마운트 추적
  React.useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // 저장 함수
  const save = React.useCallback(async () => {
    if (!isValid || !isOnline) return;

    setStatus('saving');
    setError(null);

    try {
      const data = getValues();
      await onSave(data);

      if (isMountedRef.current) {
        setStatus('saved');
        setLastSavedAt(new Date());
        onSaveSuccess?.();

        // 2초 후 idle 상태로 전환
        setTimeout(() => {
          if (isMountedRef.current) {
            setStatus('idle');
          }
        }, 2000);
      }
    } catch (err) {
      if (isMountedRef.current) {
        const errorMessage =
          err instanceof Error ? err.message : '저장 중 오류가 발생했습니다';
        setStatus('error');
        setError(errorMessage);
        onSaveError?.(err instanceof Error ? err : new Error(errorMessage));
      }
    }
  }, [getValues, isValid, isOnline, onSave, onSaveSuccess, onSaveError]);

  // 폼 변경 감지 및 자동 저장
  React.useEffect(() => {
    if (!enabled || !isDirty || !isOnline) return;

    const subscription = watch(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(save, debounceMs);
    });

    return () => {
      subscription.unsubscribe();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [watch, enabled, isDirty, isOnline, debounceMs, save]);

  // 페이지 이탈 시 저장
  React.useEffect(() => {
    if (!enabled) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty && status !== 'saved') {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [enabled, isDirty, status]);

  // 상태 컴포넌트 렌더링
  const statusComponent = renderStatus ? (
    renderStatus({ status, lastSavedAt, error })
  ) : (
    <AutoSaveStatus
      status={status}
      lastSavedAt={lastSavedAt}
      error={error}
    />
  );

  return (
    <form
      className={cn('flex flex-col', className)}
      onSubmit={(e) => e.preventDefault()}
      {...formProps}
    >
      {statusPosition === 'top' && (
        <div className="mb-4">{statusComponent}</div>
      )}

      {children}

      {statusPosition === 'bottom' && (
        <div className="mt-4">{statusComponent}</div>
      )}
    </form>
  );
}

AutoSaveForm.displayName = 'AutoSaveForm';

// ============================================================================
// useAutoSaveIndicator Hook
// ============================================================================

export interface UseAutoSaveIndicatorOptions {
  /** 저장 상태 */
  status: SaveStatus;
  /** 마지막 저장 시간 */
  lastSavedAt: Date | null;
}

export interface UseAutoSaveIndicatorReturn {
  /** 상태 텍스트 */
  statusText: string;
  /** 상태 아이콘 컴포넌트 */
  StatusIcon: React.ComponentType<{ className?: string }>;
  /** 상태 색상 클래스 */
  colorClass: string;
  /** 저장 중 여부 */
  isSaving: boolean;
  /** 저장됨 여부 */
  isSaved: boolean;
  /** 에러 여부 */
  isError: boolean;
}

/**
 * 자동 저장 상태 표시 훅
 *
 * 상태에 따른 텍스트, 아이콘, 색상을 반환합니다.
 */
export function useAutoSaveIndicator({
  status,
  lastSavedAt,
}: UseAutoSaveIndicatorOptions): UseAutoSaveIndicatorReturn {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusInfo = (): Omit<
    UseAutoSaveIndicatorReturn,
    'isSaving' | 'isSaved' | 'isError'
  > => {
    switch (status) {
      case 'saving':
        return {
          statusText: '저장 중...',
          StatusIcon: ({ className }: { className?: string }) => (
            <Loader2 className={cn('animate-spin', className)} />
          ),
          colorClass: 'text-krds-gray-60',
        };
      case 'saved':
        return {
          statusText: lastSavedAt ? `저장됨 ${formatTime(lastSavedAt)}` : '저장됨',
          StatusIcon: Check,
          colorClass: 'text-krds-success-60',
        };
      case 'error':
        return {
          statusText: '저장 실패',
          StatusIcon: AlertCircle,
          colorClass: 'text-krds-danger-60',
        };
      case 'offline':
        return {
          statusText: '오프라인',
          StatusIcon: CloudOff,
          colorClass: 'text-krds-gray-50',
        };
      default:
        return {
          statusText: lastSavedAt ? `마지막 저장: ${formatTime(lastSavedAt)}` : '',
          StatusIcon: Cloud,
          colorClass: 'text-krds-gray-50',
        };
    }
  };

  const statusInfo = getStatusInfo();

  return {
    ...statusInfo,
    isSaving: status === 'saving',
    isSaved: status === 'saved',
    isError: status === 'error',
  };
}

// ============================================================================
// AutoSaveFormProvider 컴포넌트
// ============================================================================

interface AutoSaveContextValue {
  status: SaveStatus;
  lastSavedAt: Date | null;
  error: string | null;
  save: () => Promise<void>;
}

const AutoSaveContext = React.createContext<AutoSaveContextValue | null>(null);

export function useAutoSaveContext() {
  const context = React.useContext(AutoSaveContext);
  if (!context) {
    throw new Error(
      'useAutoSaveContext must be used within AutoSaveFormProvider'
    );
  }
  return context;
}

export interface AutoSaveFormProviderProps<T extends FieldValues> {
  /** react-hook-form 인스턴스 */
  form: UseFormReturn<T>;
  /** 저장 함수 */
  onSave: (data: T) => Promise<void>;
  /** 자식 요소 */
  children: React.ReactNode;
  /** 디바운스 시간 (ms) */
  debounceMs?: number;
  /** 활성화 여부 */
  enabled?: boolean;
}

/**
 * 자동 저장 컨텍스트 프로바이더
 *
 * 자식 컴포넌트에서 자동 저장 상태에 접근할 수 있게 합니다.
 */
export function AutoSaveFormProvider<T extends FieldValues>({
  form,
  onSave,
  children,
  debounceMs = 2000,
  enabled = true,
}: AutoSaveFormProviderProps<T>) {
  const [status, setStatus] = React.useState<SaveStatus>('idle');
  const [error, setError] = React.useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = React.useState<Date | null>(null);

  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = React.useRef(true);

  const { watch, getValues, formState } = form;
  const { isDirty, isValid } = formState;

  React.useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const save = React.useCallback(async () => {
    if (!isValid) return;

    setStatus('saving');
    setError(null);

    try {
      const data = getValues();
      await onSave(data);

      if (isMountedRef.current) {
        setStatus('saved');
        setLastSavedAt(new Date());
        setTimeout(() => {
          if (isMountedRef.current) {
            setStatus('idle');
          }
        }, 2000);
      }
    } catch (err) {
      if (isMountedRef.current) {
        setStatus('error');
        setError(
          err instanceof Error ? err.message : '저장 중 오류가 발생했습니다'
        );
      }
    }
  }, [getValues, isValid, onSave]);

  React.useEffect(() => {
    if (!enabled || !isDirty) return;

    const subscription = watch(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(save, debounceMs);
    });

    return () => {
      subscription.unsubscribe();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [watch, enabled, isDirty, debounceMs, save]);

  const contextValue: AutoSaveContextValue = {
    status,
    lastSavedAt,
    error,
    save,
  };

  return (
    <AutoSaveContext.Provider value={contextValue}>
      {children}
    </AutoSaveContext.Provider>
  );
}

AutoSaveFormProvider.displayName = 'AutoSaveFormProvider';
