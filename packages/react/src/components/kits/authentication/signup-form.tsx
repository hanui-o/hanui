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
import {
  FormField,
  FormLabel,
  FormError,
  FormHelperText,
} from '@/components/form-field';

/**
 * 비밀번호 강도 계산
 */
const calculatePasswordStrength = (
  password: string
): {
  score: number;
  label: string;
  color: string;
} => {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;

  if (score <= 2) {
    return { score, label: '약함', color: 'bg-krds-danger-50' };
  }
  if (score <= 4) {
    return { score, label: '보통', color: 'bg-krds-warning-50' };
  }
  return { score, label: '강함', color: 'bg-krds-success-50' };
};

/**
 * 회원가입 폼 Zod 스키마
 */
const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, '이름을 입력해주세요')
      .min(2, '이름은 2자 이상이어야 합니다')
      .max(50, '이름은 50자 이내로 입력해주세요'),
    email: z
      .string()
      .min(1, '이메일을 입력해주세요')
      .email('올바른 이메일 형식이 아닙니다'),
    password: z
      .string()
      .min(1, '비밀번호를 입력해주세요')
      .min(8, '비밀번호는 8자 이상이어야 합니다')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        '영문 대/소문자와 숫자를 포함해야 합니다'
      ),
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요'),
    agreeTerms: z.literal(true, {
      errorMap: () => ({ message: '이용약관에 동의해주세요' }),
    }),
    agreePrivacy: z.literal(true, {
      errorMap: () => ({ message: '개인정보 처리방침에 동의해주세요' }),
    }),
    agreeMarketing: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

type SignupFormData = z.infer<typeof signupSchema>;

/**
 * SignupForm 스타일 variants
 */
const signupFormVariants = cva('w-full', {
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

export interface SignupFormProps extends VariantProps<typeof signupFormVariants> {
  /** 폼 제출 핸들러 */
  onSubmit: (data: Omit<SignupFormData, 'confirmPassword'>) => void | Promise<void>;
  /** 로딩 상태 */
  loading?: boolean;
  /** 서버 에러 메시지 */
  error?: string;
  /** 로그인 링크 URL */
  loginUrl?: string;
  /** 이용약관 링크 URL */
  termsUrl?: string;
  /** 개인정보 처리방침 링크 URL */
  privacyUrl?: string;
  /** 마케팅 동의 체크박스 표시 */
  showMarketingConsent?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 폼 제목 */
  title?: string;
  /** 폼 설명 */
  description?: string;
}

/**
 * PasswordStrengthIndicator - 비밀번호 강도 표시기
 */
const PasswordStrengthIndicator = ({ password }: { password: string }) => {
  const strength = calculatePasswordStrength(password);
  const barCount = 4;
  const filledBars = Math.ceil((strength.score / 6) * barCount);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1">
      {/* 시각적 강도 표시 바 */}
      <div className="flex gap-1" aria-hidden="true">
        {Array.from({ length: barCount }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-1 flex-1 rounded-full transition-colors',
              i < filledBars ? strength.color : 'bg-krds-gray-20'
            )}
          />
        ))}
      </div>
      {/* 텍스트로 강도 표시 (접근성) */}
      <p className="text-krds-body-sm text-krds-gray-60">
        비밀번호 강도:{' '}
        <span
          className={cn(
            'font-medium',
            strength.label === '약함' && 'text-krds-danger-60',
            strength.label === '보통' && 'text-krds-warning-60',
            strength.label === '강함' && 'text-krds-success-60'
          )}
        >
          {strength.label}
        </span>
      </p>
    </div>
  );
};

/**
 * SignupForm - 회원가입 폼 컴포넌트
 *
 * @example
 * ```tsx
 * <SignupForm
 *   onSubmit={handleSignup}
 *   loginUrl="/login"
 *   termsUrl="/terms"
 *   privacyUrl="/privacy"
 * />
 * ```
 */
export const SignupForm = React.forwardRef<HTMLFormElement, SignupFormProps>(
  (
    {
      onSubmit,
      loading = false,
      error,
      loginUrl = '/login',
      termsUrl = '/terms',
      privacyUrl = '/privacy',
      showMarketingConsent = true,
      className,
      size,
      title = '회원가입',
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
    } = useForm<SignupFormData>({
      resolver: zodResolver(signupSchema),
      defaultValues: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false as unknown as true,
        agreePrivacy: false as unknown as true,
        agreeMarketing: false,
      },
    });

    const password = watch('password');
    const agreeTerms = watch('agreeTerms');
    const agreePrivacy = watch('agreePrivacy');
    const agreeMarketing = watch('agreeMarketing');

    const handleFormSubmit: SubmitHandler<SignupFormData> = async (data) => {
      const { confirmPassword, ...submitData } = data;
      await onSubmit(submitData);
    };

    const formId = React.useId();

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit(handleFormSubmit)}
        className={cn(signupFormVariants({ size }), 'space-y-6', className)}
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

        {/* 이름 필드 */}
        <FormField
          id={`${formId}-name`}
          status={errors.name ? 'error' : undefined}
          required
        >
          <FormLabel>이름</FormLabel>
          <Input
            type="text"
            placeholder="이름을 입력하세요"
            autoComplete="name"
            aria-required="true"
            {...register('name')}
          />
          {errors.name && <FormError>{errors.name.message}</FormError>}
        </FormField>

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
            autoComplete="new-password"
            aria-required="true"
            {...register('password')}
          />
          <PasswordStrengthIndicator password={password || ''} />
          {errors.password ? (
            <FormError>{errors.password.message}</FormError>
          ) : (
            <FormHelperText>
              8자 이상, 영문 대/소문자와 숫자를 포함해주세요
            </FormHelperText>
          )}
        </FormField>

        {/* 비밀번호 확인 필드 */}
        <FormField
          id={`${formId}-confirmPassword`}
          status={errors.confirmPassword ? 'error' : undefined}
          required
        >
          <FormLabel>비밀번호 확인</FormLabel>
          <Input
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            autoComplete="new-password"
            aria-required="true"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <FormError>{errors.confirmPassword.message}</FormError>
          )}
        </FormField>

        {/* 약관 동의 */}
        <div className="space-y-3 pt-2">
          <div>
            <Checkbox
              label={
                <span>
                  <Link href={termsUrl} variant="primary" size="sm" external>
                    이용약관
                  </Link>
                  에 동의합니다 (필수)
                </span>
              }
              checked={agreeTerms === true}
              onCheckedChange={(checked) =>
                setValue('agreeTerms', checked === true ? true : (false as unknown as true))
              }
              status={errors.agreeTerms ? 'error' : undefined}
              size="sm"
            />
            {errors.agreeTerms && (
              <p className="mt-1 text-krds-body-sm text-krds-danger-60">
                {errors.agreeTerms.message}
              </p>
            )}
          </div>

          <div>
            <Checkbox
              label={
                <span>
                  <Link href={privacyUrl} variant="primary" size="sm" external>
                    개인정보 처리방침
                  </Link>
                  에 동의합니다 (필수)
                </span>
              }
              checked={agreePrivacy === true}
              onCheckedChange={(checked) =>
                setValue('agreePrivacy', checked === true ? true : (false as unknown as true))
              }
              status={errors.agreePrivacy ? 'error' : undefined}
              size="sm"
            />
            {errors.agreePrivacy && (
              <p className="mt-1 text-krds-body-sm text-krds-danger-60">
                {errors.agreePrivacy.message}
              </p>
            )}
          </div>

          {showMarketingConsent && (
            <Checkbox
              label="마케팅 정보 수신에 동의합니다 (선택)"
              checked={agreeMarketing}
              onCheckedChange={(checked) =>
                setValue('agreeMarketing', checked === true)
              }
              size="sm"
            />
          )}
        </div>

        {/* 회원가입 버튼 */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          disabled={loading}
          className="w-full"
        >
          회원가입
        </Button>

        {/* 로그인 링크 */}
        <p className="text-center text-krds-body-md text-krds-gray-60">
          이미 계정이 있으신가요?{' '}
          <Link href={loginUrl} variant="primary">
            로그인
          </Link>
        </p>
      </form>
    );
  }
);

SignupForm.displayName = 'SignupForm';

export { signupSchema, calculatePasswordStrength, type SignupFormData };
