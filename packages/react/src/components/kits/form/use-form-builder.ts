'use client';

/**
 * Form Kit - useFormBuilder Hook
 * react-hook-form과 Zod를 통합한 폼 빌더 훅
 */

import * as React from 'react';
import {
  useForm,
  type UseFormProps,
  type UseFormReturn,
  type FieldValues,
  type Path,
  type PathValue,
  type FieldErrors,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodType, ZodTypeDef } from 'zod';

// ============================================================================
// 타입 정의
// ============================================================================

/**
 * 폼 필드 설정
 */
export interface FormFieldConfig<T extends FieldValues> {
  /** 필드 이름 */
  name: Path<T>;
  /** 레이블 텍스트 */
  label: string;
  /** 필드 타입 */
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'tel'
    | 'number'
    | 'date'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'file';
  /** 플레이스홀더 */
  placeholder?: string;
  /** 도움말 텍스트 */
  helperText?: string;
  /** 필수 여부 */
  required?: boolean;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 읽기 전용 여부 */
  readOnly?: boolean;
  /** Select 옵션 */
  options?: Array<{ value: string; label: string; disabled?: boolean }>;
  /** 기본값 */
  defaultValue?: PathValue<T, Path<T>>;
  /** 추가 className */
  className?: string;
  /** 숨김 조건 */
  hidden?: boolean | ((values: T) => boolean);
  /** 컴포넌트 크기 */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * 폼 빌더 옵션
 */
export interface UseFormBuilderOptions<T extends FieldValues> {
  /** Zod 스키마 */
  schema: ZodType<T, ZodTypeDef, unknown>;
  /** 기본값 */
  defaultValues?: UseFormProps<T>['defaultValues'];
  /** 제출 핸들러 */
  onSubmit?: (data: T) => void | Promise<void>;
  /** 에러 핸들러 */
  onError?: (errors: FieldErrors<T>) => void;
  /** 유효성 검사 모드 */
  mode?: UseFormProps<T>['mode'];
  /** 리셋 옵션 */
  resetOnSubmit?: boolean;
}

/**
 * 폼 빌더 반환 타입
 */
export interface UseFormBuilderReturn<T extends FieldValues>
  extends UseFormReturn<T> {
  /** 필드 등록 헬퍼 (aria 속성 포함) */
  registerField: (
    name: Path<T>,
    options?: { required?: boolean }
  ) => ReturnType<UseFormReturn<T>['register']> & {
    'aria-invalid'?: boolean;
    'aria-describedby'?: string;
    'aria-required'?: boolean;
  };
  /** 필드 에러 가져오기 */
  getFieldError: (name: Path<T>) => string | undefined;
  /** 필드 상태 가져오기 */
  getFieldStatus: (name: Path<T>) => 'error' | 'success' | undefined;
  /** 폼 제출 핸들러 */
  handleFormSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  /** 폼 제출 중 여부 */
  isSubmitting: boolean;
  /** 폼 유효 여부 */
  isValid: boolean;
  /** 폼 변경 여부 */
  isDirty: boolean;
  /** 모든 필드 터치 처리 */
  touchAllFields: () => void;
  /** 폼 리셋 */
  resetForm: () => void;
}

// ============================================================================
// useFormBuilder Hook
// ============================================================================

/**
 * 폼 빌더 훅
 *
 * react-hook-form과 Zod를 통합하여 타입 안전한 폼 빌더 기능을 제공합니다.
 *
 * @example
 * ```tsx
 * const formSchema = z.object({
 *   email: z.string().email(),
 *   password: z.string().min(8),
 * });
 *
 * function LoginForm() {
 *   const form = useFormBuilder({
 *     schema: formSchema,
 *     defaultValues: { email: '', password: '' },
 *     onSubmit: async (data) => {
 *       await login(data);
 *     },
 *   });
 *
 *   return (
 *     <form onSubmit={form.handleFormSubmit}>
 *       <Input {...form.registerField('email')} />
 *       <Input {...form.registerField('password')} type="password" />
 *       <Button type="submit" disabled={form.isSubmitting}>
 *         로그인
 *       </Button>
 *     </form>
 *   );
 * }
 * ```
 */
export function useFormBuilder<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  onError,
  mode = 'onBlur',
  resetOnSubmit = false,
}: UseFormBuilderOptions<T>): UseFormBuilderReturn<T> {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty, touchedFields },
    reset,
    trigger,
    getValues,
  } = form;

  /**
   * 필드 에러 메시지 가져오기
   */
  const getFieldError = React.useCallback(
    (name: Path<T>): string | undefined => {
      const error = errors[name];
      if (!error) return undefined;
      return (error as { message?: string }).message;
    },
    [errors]
  );

  /**
   * 필드 상태 가져오기
   */
  const getFieldStatus = React.useCallback(
    (name: Path<T>): 'error' | 'success' | undefined => {
      const hasError = !!errors[name];
      const isTouched = touchedFields[name as keyof typeof touchedFields];
      if (hasError) return 'error';
      if (isTouched && !hasError) return 'success';
      return undefined;
    },
    [errors, touchedFields]
  );

  /**
   * 접근성 속성이 포함된 필드 등록
   */
  const registerField = React.useCallback(
    (name: Path<T>, options?: { required?: boolean }) => {
      const registration = register(name);
      const error = getFieldError(name);
      const hasError = !!error;

      return {
        ...registration,
        'aria-invalid': hasError ? true : undefined,
        'aria-describedby': hasError ? `${name}-error` : undefined,
        'aria-required': options?.required ? true : undefined,
      };
    },
    [register, getFieldError]
  );

  /**
   * 폼 제출 핸들러
   */
  const handleFormSubmit = React.useCallback(
    async (e?: React.BaseSyntheticEvent) => {
      e?.preventDefault();
      await handleSubmit(
        async (data) => {
          if (onSubmit) {
            await onSubmit(data);
            if (resetOnSubmit) {
              reset();
            }
          }
        },
        (formErrors) => {
          if (onError) {
            onError(formErrors);
          }
        }
      )(e);
    },
    [handleSubmit, onSubmit, onError, reset, resetOnSubmit]
  );

  /**
   * 모든 필드 터치 처리
   */
  const touchAllFields = React.useCallback(() => {
    const values = getValues();
    const fieldNames = Object.keys(values) as Path<T>[];
    trigger(fieldNames);
  }, [getValues, trigger]);

  /**
   * 폼 리셋
   */
  const resetForm = React.useCallback(() => {
    reset();
  }, [reset]);

  return {
    ...form,
    registerField,
    getFieldError,
    getFieldStatus,
    handleFormSubmit,
    isSubmitting,
    isValid,
    isDirty,
    touchAllFields,
    resetForm,
  };
}

// ============================================================================
// useAutoSave Hook
// ============================================================================

export interface UseAutoSaveOptions<T extends FieldValues> {
  /** 폼 인스턴스 */
  form: UseFormReturn<T>;
  /** 저장 함수 */
  onSave: (data: T) => Promise<void>;
  /** 디바운스 시간 (ms) */
  debounceMs?: number;
  /** 활성화 여부 */
  enabled?: boolean;
}

export interface UseAutoSaveReturn {
  /** 저장 상태 */
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
  /** 에러 메시지 */
  saveError: string | null;
  /** 마지막 저장 시간 */
  lastSavedAt: Date | null;
  /** 수동 저장 */
  save: () => Promise<void>;
}

/**
 * 자동 저장 훅
 */
export function useAutoSave<T extends FieldValues>({
  form,
  onSave,
  debounceMs = 2000,
  enabled = true,
}: UseAutoSaveOptions<T>): UseAutoSaveReturn {
  const [saveStatus, setSaveStatus] = React.useState<
    'idle' | 'saving' | 'saved' | 'error'
  >('idle');
  const [saveError, setSaveError] = React.useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = React.useState<Date | null>(null);

  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = React.useRef(true);

  const { watch, getValues, formState } = form;
  const { isDirty, isValid } = formState;

  const save = React.useCallback(async () => {
    if (!isValid) return;

    setSaveStatus('saving');
    setSaveError(null);

    try {
      const data = getValues();
      await onSave(data);
      if (isMountedRef.current) {
        setSaveStatus('saved');
        setLastSavedAt(new Date());
        setTimeout(() => {
          if (isMountedRef.current) {
            setSaveStatus('idle');
          }
        }, 2000);
      }
    } catch (error) {
      if (isMountedRef.current) {
        setSaveStatus('error');
        setSaveError(
          error instanceof Error ? error.message : '저장 중 오류가 발생했습니다'
        );
      }
    }
  }, [getValues, isValid, onSave]);

  React.useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

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

  return {
    saveStatus,
    saveError,
    lastSavedAt,
    save,
  };
}

// ============================================================================
// useMultiStepForm Hook
// ============================================================================

export interface UseMultiStepFormOptions {
  /** 총 단계 수 */
  totalSteps: number;
  /** 초기 단계 (1부터 시작) */
  initialStep?: number;
  /** 단계 변경 콜백 */
  onStepChange?: (step: number) => void;
}

export interface UseMultiStepFormReturn {
  /** 현재 단계 (1부터 시작) */
  currentStep: number;
  /** 총 단계 수 */
  totalSteps: number;
  /** 첫 번째 단계 여부 */
  isFirstStep: boolean;
  /** 마지막 단계 여부 */
  isLastStep: boolean;
  /** 진행률 (0-100) */
  progress: number;
  /** 다음 단계로 이동 */
  goToNextStep: () => void;
  /** 이전 단계로 이동 */
  goToPrevStep: () => void;
  /** 특정 단계로 이동 */
  goToStep: (step: number) => void;
  /** 첫 번째 단계로 리셋 */
  reset: () => void;
  /** 특정 단계 완료 여부 */
  isStepCompleted: (step: number) => boolean;
  /** 완료된 단계 목록 */
  completedSteps: number[];
  /** 단계 완료 처리 */
  completeStep: (step: number) => void;
}

/**
 * 다단계 폼 훅
 */
export function useMultiStepForm({
  totalSteps,
  initialStep = 1,
  onStepChange,
}: UseMultiStepFormOptions): UseMultiStepFormReturn {
  const [currentStep, setCurrentStep] = React.useState(initialStep);
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);

  const stepRef = React.useRef<HTMLDivElement>(null);

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;
  const progress = Math.round((currentStep / totalSteps) * 100);

  const focusStep = React.useCallback(() => {
    // 단계 변경 시 포커스 관리
    requestAnimationFrame(() => {
      const focusable = stepRef.current?.querySelector(
        'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable instanceof HTMLElement) {
        focusable.focus();
      }
    });
  }, []);

  const goToNextStep = React.useCallback(() => {
    if (!isLastStep) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      onStepChange?.(nextStep);
      focusStep();
    }
  }, [currentStep, isLastStep, onStepChange, focusStep]);

  const goToPrevStep = React.useCallback(() => {
    if (!isFirstStep) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      onStepChange?.(prevStep);
      focusStep();
    }
  }, [currentStep, isFirstStep, onStepChange, focusStep]);

  const goToStep = React.useCallback(
    (step: number) => {
      if (step >= 1 && step <= totalSteps) {
        setCurrentStep(step);
        onStepChange?.(step);
        focusStep();
      }
    },
    [totalSteps, onStepChange, focusStep]
  );

  const reset = React.useCallback(() => {
    setCurrentStep(1);
    setCompletedSteps([]);
    onStepChange?.(1);
    focusStep();
  }, [onStepChange, focusStep]);

  const isStepCompleted = React.useCallback(
    (step: number) => completedSteps.includes(step),
    [completedSteps]
  );

  const completeStep = React.useCallback((step: number) => {
    setCompletedSteps((prev) =>
      prev.includes(step) ? prev : [...prev, step].sort((a, b) => a - b)
    );
  }, []);

  return {
    currentStep,
    totalSteps,
    isFirstStep,
    isLastStep,
    progress,
    goToNextStep,
    goToPrevStep,
    goToStep,
    reset,
    isStepCompleted,
    completedSteps,
    completeStep,
  };
}
