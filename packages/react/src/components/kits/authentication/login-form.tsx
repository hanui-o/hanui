'use client';

import * as React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { Checkbox } from '@/components/checkbox';
import { Link } from '@/components/link';
import { FormField, FormLabel, FormError } from '@/components/form-field';

/**
 * 로그인 폼 Zod 스키마
 */
const loginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요')
    .email('올바른 이메일 형식이 아닙니다'),
  password: z
    .string()
    .min(1, '비밀번호를 입력해주세요')
    .min(8, '비밀번호는 8자 이상이어야 합니다'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

/**
 * LoginForm 스타일 variants
 */
const loginFormVariants = cva('w-full', {
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

export interface LoginFormProps extends VariantProps<typeof loginFormVariants> {
  /** 폼 제출 핸들러 */
  onSubmit: (data: LoginFormData) => void | Promise<void>;
  /** 로딩 상태 */
  loading?: boolean;
  /** 서버 에러 메시지 */
  error?: string;
  /** 회원가입 링크 URL */
  signupUrl?: string;
  /** 비밀번호 찾기 링크 URL */
  forgotPasswordUrl?: string;
  /** 이메일 기억하기 체크박스 표시 */
  showRememberMe?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 기본 이메일 값 */
  defaultEmail?: string;
  /** 폼 제목 */
  title?: string;
  /** 폼 설명 */
  description?: string;
}

/**
 * LoginForm - 로그인 폼 컴포넌트
 *
 * @example
 * ```tsx
 * <LoginForm
 *   onSubmit={handleLogin}
 *   signupUrl="/signup"
 *   forgotPasswordUrl="/forgot-password"
 * />
 * ```
 */
export const LoginForm = React.forwardRef<HTMLFormElement, LoginFormProps>(
  (
    {
      onSubmit,
      loading = false,
      error,
      signupUrl = '/signup',
      forgotPasswordUrl = '/forgot-password',
      showRememberMe = true,
      className,
      size,
      defaultEmail = '',
      title = '로그인',
      description,
    },
    ref
  ) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      watch,
    } = useForm<LoginFormData>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        email: defaultEmail,
        password: '',
        rememberMe: false,
      },
    });

    const rememberMe = watch('rememberMe');

    const handleFormSubmit: SubmitHandler<LoginFormData> = async (data) => {
      await onSubmit(data);
    };

    const formId = React.useId();

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit(handleFormSubmit)}
        className={cn(loginFormVariants({ size }), 'space-y-6', className)}
        aria-busy={loading}
        aria-describedby={error ? `${formId}-error` : undefined}
        noValidate
      >
        {/* 폼 제목 */}
        {title && (
          <div className="text-center mb-8">
            <h1 className="text-krds-heading-lg font-bold text-krds-gray-90">
              {title}
            </h1>
            {description && (
              <p className="mt-2 text-krds-body-md text-krds-gray-60">
                {description}
              </p>
            )}
          </div>
        )}

        {/* 서버 에러 메시지 */}
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

        {/* 이메일 필드 */}
        <FormField
          id={`${formId}-email`}
          status={errors.email ? 'error' : undefined}
          required
        >
          <FormLabel>이메일</FormLabel>
          <Input
            type="email"
            placeholder="example@email.com"
            autoComplete="email"
            aria-required="true"
            {...register('email')}
          />
          {errors.email && <FormError>{errors.email.message}</FormError>}
        </FormField>

        {/* 비밀번호 필드 */}
        <FormField
          id={`${formId}-password`}
          status={errors.password ? 'error' : undefined}
          required
        >
          <FormLabel>비밀번호</FormLabel>
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요"
            autoComplete="current-password"
            aria-required="true"
            {...register('password')}
          />
          {errors.password && <FormError>{errors.password.message}</FormError>}
        </FormField>

        {/* 이메일 기억하기 + 비밀번호 찾기 */}
        <div className="flex items-center justify-between">
          {showRememberMe ? (
            <Checkbox
              label="로그인 상태 유지"
              checked={rememberMe}
              onCheckedChange={(checked) =>
                setValue('rememberMe', checked === true)
              }
              size="sm"
            />
          ) : (
            <div />
          )}
          <Link href={forgotPasswordUrl} variant="primary" size="sm">
            비밀번호 찾기
          </Link>
        </div>

        {/* 로그인 버튼 */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          disabled={loading}
          className="w-full"
        >
          로그인
        </Button>

        {/* 회원가입 링크 */}
        <p className="text-center text-krds-body-md text-krds-gray-60">
          계정이 없으신가요?{' '}
          <Link href={signupUrl} variant="primary">
            회원가입
          </Link>
        </p>
      </form>
    );
  }
);

LoginForm.displayName = 'LoginForm';

export { loginSchema, type LoginFormData };
