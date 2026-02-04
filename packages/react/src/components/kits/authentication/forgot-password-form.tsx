'use client';

import * as React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { Link } from '@/components/link';
import {
  FormField,
  FormLabel,
  FormError,
  FormHelperText,
} from '@/components/form-field';
import { Mail, ArrowLeft, Check } from 'lucide-react';

/**
 * 이메일 요청 단계 스키마
 */
const emailRequestSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요')
    .email('올바른 이메일 형식이 아닙니다'),
});

/**
 * 비밀번호 재설정 단계 스키마
 */
const resetPasswordSchema = z
  .object({
    code: z
      .string()
      .min(1, '인증 코드를 입력해주세요')
      .length(6, '인증 코드는 6자리입니다'),
    newPassword: z
      .string()
      .min(1, '새 비밀번호를 입력해주세요')
      .min(8, '비밀번호는 8자 이상이어야 합니다')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        '영문 대/소문자와 숫자를 포함해야 합니다'
      ),
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

type EmailRequestFormData = z.infer<typeof emailRequestSchema>;
type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

/**
 * ForgotPasswordForm 스타일 variants
 */
const forgotPasswordFormVariants = cva('w-full', {
  variants: {
    size: {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      full: 'max-w-full',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type ForgotPasswordStep = 'email' | 'reset' | 'success';

export interface ForgotPasswordFormProps
  extends VariantProps<typeof forgotPasswordFormVariants> {
  /** 이메일 요청 핸들러 */
  onEmailSubmit: (email: string) => void | Promise<void>;
  /** 비밀번호 재설정 핸들러 */
  onResetSubmit: (data: {
    code: string;
    newPassword: string;
  }) => void | Promise<void>;
  /** 인증 코드 재전송 핸들러 */
  onResendCode?: () => void | Promise<void>;
  /** 로딩 상태 */
  loading?: boolean;
  /** 서버 에러 메시지 */
  error?: string;
  /** 현재 단계 (외부 제어) */
  step?: ForgotPasswordStep;
  /** 단계 변경 핸들러 */
  onStepChange?: (step: ForgotPasswordStep) => void;
  /** 로그인 링크 URL */
  loginUrl?: string;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 요청된 이메일 (reset 단계에서 표시용) */
  email?: string;
}

/**
 * ForgotPasswordForm - 비밀번호 찾기 폼 컴포넌트
 *
 * @example
 * ```tsx
 * <ForgotPasswordForm
 *   onEmailSubmit={handleEmailRequest}
 *   onResetSubmit={handleResetPassword}
 *   loginUrl="/login"
 * />
 * ```
 */
export const ForgotPasswordForm = React.forwardRef<
  HTMLFormElement,
  ForgotPasswordFormProps
>(
  (
    {
      onEmailSubmit,
      onResetSubmit,
      onResendCode,
      loading = false,
      error,
      step: controlledStep,
      onStepChange,
      loginUrl = '/login',
      className,
      size,
      email: controlledEmail,
    },
    ref
  ) => {
    const [internalStep, setInternalStep] =
      React.useState<ForgotPasswordStep>('email');
    const [internalEmail, setInternalEmail] = React.useState('');

    const step = controlledStep ?? internalStep;
    const email = controlledEmail ?? internalEmail;

    const handleStepChange = (newStep: ForgotPasswordStep) => {
      if (onStepChange) {
        onStepChange(newStep);
      } else {
        setInternalStep(newStep);
      }
    };

    // 이메일 요청 폼
    const emailForm = useForm<EmailRequestFormData>({
      resolver: zodResolver(emailRequestSchema),
      defaultValues: { email: '' },
    });

    // 비밀번호 재설정 폼
    const resetForm = useForm<ResetPasswordFormData>({
      resolver: zodResolver(resetPasswordSchema),
      defaultValues: {
        code: '',
        newPassword: '',
        confirmPassword: '',
      },
    });

    const handleEmailFormSubmit: SubmitHandler<EmailRequestFormData> = async (
      data
    ) => {
      setInternalEmail(data.email);
      await onEmailSubmit(data.email);
      handleStepChange('reset');
    };

    const handleResetFormSubmit: SubmitHandler<ResetPasswordFormData> = async (
      data
    ) => {
      await onResetSubmit({
        code: data.code,
        newPassword: data.newPassword,
      });
      handleStepChange('success');
    };

    const formId = React.useId();

    // 이메일 입력 단계
    if (step === 'email') {
      return (
        <form
          ref={ref}
          onSubmit={emailForm.handleSubmit(handleEmailFormSubmit)}
          className={cn(
            forgotPasswordFormVariants({ size }),
            'space-y-6',
            className
          )}
          aria-busy={loading}
          aria-describedby={error ? `${formId}-error` : undefined}
          noValidate
        >
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 rounded-full bg-krds-primary-5 flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-krds-primary-60" aria-hidden="true" />
            </div>
            <h1 className="text-krds-heading-lg font-bold text-krds-gray-90">
              비밀번호 찾기
            </h1>
            <p className="mt-2 text-krds-body-md text-krds-gray-60">
              가입하신 이메일로 비밀번호 재설정 링크를 보내드립니다.
            </p>
          </div>

          {error && (
            <div
              id={`${formId}-error`}
              role="alert"
              aria-live="polite"
              className="p-4 rounded-md bg-krds-danger-5 border border-krds-danger-30 text-krds-danger-60 text-krds-body-md"
            >
              {error}
            </div>
          )}

          <FormField
            id={`${formId}-email`}
            status={emailForm.formState.errors.email ? 'error' : undefined}
            required
          >
            <FormLabel>이메일</FormLabel>
            <Input
              type="email"
              placeholder="example@email.com"
              autoComplete="email"
              aria-required="true"
              {...emailForm.register('email')}
            />
            {emailForm.formState.errors.email && (
              <FormError>{emailForm.formState.errors.email.message}</FormError>
            )}
          </FormField>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            disabled={loading}
            className="w-full"
          >
            인증 코드 받기
          </Button>

          <p className="text-center">
            <Link
              href={loginUrl}
              variant="default"
              className="inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              로그인으로 돌아가기
            </Link>
          </p>
        </form>
      );
    }

    // 비밀번호 재설정 단계
    if (step === 'reset') {
      return (
        <form
          ref={ref}
          onSubmit={resetForm.handleSubmit(handleResetFormSubmit)}
          className={cn(
            forgotPasswordFormVariants({ size }),
            'space-y-6',
            className
          )}
          aria-busy={loading}
          aria-describedby={error ? `${formId}-error` : undefined}
          noValidate
        >
          <div className="text-center mb-8">
            <h1 className="text-krds-heading-lg font-bold text-krds-gray-90">
              비밀번호 재설정
            </h1>
            <p className="mt-2 text-krds-body-md text-krds-gray-60">
              <span className="font-medium text-krds-gray-90">{email}</span>으로
              전송된 인증 코드와 새 비밀번호를 입력하세요.
            </p>
          </div>

          {error && (
            <div
              id={`${formId}-error`}
              role="alert"
              aria-live="polite"
              className="p-4 rounded-md bg-krds-danger-5 border border-krds-danger-30 text-krds-danger-60 text-krds-body-md"
            >
              {error}
            </div>
          )}

          <FormField
            id={`${formId}-code`}
            status={resetForm.formState.errors.code ? 'error' : undefined}
            required
          >
            <FormLabel>인증 코드</FormLabel>
            <Input
              type="text"
              placeholder="6자리 인증 코드"
              autoComplete="one-time-code"
              inputMode="numeric"
              maxLength={6}
              aria-required="true"
              {...resetForm.register('code')}
            />
            {resetForm.formState.errors.code ? (
              <FormError>{resetForm.formState.errors.code.message}</FormError>
            ) : (
              <FormHelperText>
                이메일로 전송된 6자리 코드를 입력하세요
              </FormHelperText>
            )}
          </FormField>

          <FormField
            id={`${formId}-newPassword`}
            status={resetForm.formState.errors.newPassword ? 'error' : undefined}
            required
          >
            <FormLabel>새 비밀번호</FormLabel>
            <Input
              type="password"
              placeholder="새 비밀번호를 입력하세요"
              autoComplete="new-password"
              aria-required="true"
              {...resetForm.register('newPassword')}
            />
            {resetForm.formState.errors.newPassword ? (
              <FormError>
                {resetForm.formState.errors.newPassword.message}
              </FormError>
            ) : (
              <FormHelperText>
                8자 이상, 영문 대/소문자와 숫자를 포함해주세요
              </FormHelperText>
            )}
          </FormField>

          <FormField
            id={`${formId}-confirmPassword`}
            status={
              resetForm.formState.errors.confirmPassword ? 'error' : undefined
            }
            required
          >
            <FormLabel>새 비밀번호 확인</FormLabel>
            <Input
              type="password"
              placeholder="새 비밀번호를 다시 입력하세요"
              autoComplete="new-password"
              aria-required="true"
              {...resetForm.register('confirmPassword')}
            />
            {resetForm.formState.errors.confirmPassword && (
              <FormError>
                {resetForm.formState.errors.confirmPassword.message}
              </FormError>
            )}
          </FormField>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            disabled={loading}
            className="w-full"
          >
            비밀번호 변경
          </Button>

          <div className="flex items-center justify-between text-krds-body-sm">
            <button
              type="button"
              onClick={() => handleStepChange('email')}
              className="text-krds-gray-60 hover:text-krds-gray-90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 inline mr-1" aria-hidden="true" />
              이메일 다시 입력
            </button>
            {onResendCode && (
              <button
                type="button"
                onClick={onResendCode}
                disabled={loading}
                className="text-krds-primary-60 hover:text-krds-primary-70 transition-colors disabled:opacity-50"
              >
                인증 코드 재전송
              </button>
            )}
          </div>
        </form>
      );
    }

    // 성공 화면
    return (
      <div
        className={cn(
          forgotPasswordFormVariants({ size }),
          'text-center space-y-6',
          className
        )}
      >
        <div className="mx-auto w-20 h-20 rounded-full bg-krds-success-5 flex items-center justify-center">
          <Check
            className="w-10 h-10 text-krds-success-60"
            aria-hidden="true"
          />
        </div>

        <div>
          <h1 className="text-krds-heading-lg font-bold text-krds-gray-90">
            비밀번호 변경 완료
          </h1>
          <p className="mt-2 text-krds-body-md text-krds-gray-60">
            비밀번호가 성공적으로 변경되었습니다.
            <br />새 비밀번호로 로그인해주세요.
          </p>
        </div>

        <Button href={loginUrl} variant="primary" size="lg" className="w-full">
          로그인하기
        </Button>
      </div>
    );
  }
);

ForgotPasswordForm.displayName = 'ForgotPasswordForm';

export {
  emailRequestSchema,
  resetPasswordSchema,
  type EmailRequestFormData,
  type ResetPasswordFormData,
};
