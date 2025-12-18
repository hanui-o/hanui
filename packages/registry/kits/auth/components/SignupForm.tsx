// Auth Kit - SignupForm Component
// 회원가입 폼 컴포넌트

'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Button,
  Input,
  Label,
  Checkbox,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
} from '@hanui/react';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import { useSignup, useCheckEmail, useGuestOnly } from '../hooks/useAuth';

const signupSchema = z
  .object({
    name: z.string().min(2, '이름은 2자 이상이어야 합니다'),
    email: z.string().email('올바른 이메일 형식을 입력해주세요'),
    password: z
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)/,
        '비밀번호는 영문과 숫자를 포함해야 합니다'
      ),
    passwordConfirm: z.string(),
    agreeTerms: z.literal(true, {
      errorMap: () => ({ message: '이용약관에 동의해주세요' }),
    }),
    agreeMarketing: z.boolean().optional(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  });

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupFormProps {
  loginPath?: string;
  termsPath?: string;
  privacyPath?: string;
}

export function SignupForm({
  loginPath = '/login',
  termsPath = '/terms',
  privacyPath = '/privacy',
}: SignupFormProps) {
  const { isLoading } = useGuestOnly();
  const signup = useSignup();
  const checkEmail = useCheckEmail();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      agreeTerms: false as unknown as true,
      agreeMarketing: false,
    },
  });

  const handleEmailBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const email = e.target.value;
    if (!email || errors.email) return;

    const exists = await checkEmail.mutateAsync(email);
    if (exists) {
      setError('email', { message: '이미 사용 중인 이메일입니다' });
    }
  };

  const onSubmit = async (data: SignupFormData) => {
    await signup.mutateAsync(data);
  };

  if (isLoading) {
    return null;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">회원가입</CardTitle>
        <CardDescription>계정을 만들어 서비스를 이용하세요</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody className="space-y-4">
          {signup.error && (
            <div className="p-3 text-sm text-krds-danger-base bg-krds-danger-5 rounded-md">
              회원가입 중 오류가 발생했습니다. 다시 시도해주세요.
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-krds-gray-40" />
              <Input
                id="name"
                type="text"
                placeholder="홍길동"
                className="pl-10"
                {...register('name')}
                aria-invalid={!!errors.name}
              />
            </div>
            {errors.name && (
              <p className="text-sm text-krds-danger-base">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-krds-gray-40" />
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                className="pl-10"
                {...register('email')}
                onBlur={handleEmailBlur}
                aria-invalid={!!errors.email}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-krds-danger-base">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-krds-gray-40" />
              <Input
                id="password"
                type="password"
                placeholder="8자 이상, 영문과 숫자 포함"
                className="pl-10"
                {...register('password')}
                aria-invalid={!!errors.password}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-krds-danger-base">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-krds-gray-40" />
              <Input
                id="passwordConfirm"
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                className="pl-10"
                {...register('passwordConfirm')}
                aria-invalid={!!errors.passwordConfirm}
              />
            </div>
            {errors.passwordConfirm && (
              <p className="text-sm text-krds-danger-base">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-2">
              <Checkbox
                id="agreeTerms"
                {...register('agreeTerms')}
                className="mt-1"
              />
              <Label htmlFor="agreeTerms" className="text-sm font-normal">
                <Link
                  href={termsPath}
                  className="text-krds-primary-base hover:underline"
                >
                  이용약관
                </Link>{' '}
                및{' '}
                <Link
                  href={privacyPath}
                  className="text-krds-primary-base hover:underline"
                >
                  개인정보처리방침
                </Link>
                에 동의합니다 (필수)
              </Label>
            </div>
            {errors.agreeTerms && (
              <p className="text-sm text-krds-danger-base">
                {errors.agreeTerms.message}
              </p>
            )}

            <div className="flex items-start gap-2">
              <Checkbox
                id="agreeMarketing"
                {...register('agreeMarketing')}
                className="mt-1"
              />
              <Label htmlFor="agreeMarketing" className="text-sm font-normal">
                마케팅 정보 수신에 동의합니다 (선택)
              </Label>
            </div>
          </div>
        </CardBody>

        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || signup.isPending}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            {isSubmitting || signup.isPending ? '가입 중...' : '회원가입'}
          </Button>

          <p className="text-center text-sm text-krds-gray-60">
            이미 계정이 있으신가요?{' '}
            <Link
              href={loginPath}
              className="text-krds-primary-base hover:underline"
            >
              로그인
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
