// Auth Kit - LoginForm Component
// 로그인 폼 컴포넌트

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
import { Mail, Lock, LogIn } from 'lucide-react';
import { useLogin, useGuestOnly } from '../hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email('올바른 이메일 형식을 입력해주세요'),
  password: z.string().min(1, '비밀번호를 입력해주세요'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  signupPath?: string;
  forgotPasswordPath?: string;
}

export function LoginForm({
  signupPath = '/signup',
  forgotPasswordPath = '/forgot-password',
}: LoginFormProps) {
  const { isLoading } = useGuestOnly();
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    await login.mutateAsync(data);
  };

  if (isLoading) {
    return null;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">로그인</CardTitle>
        <CardDescription>계정에 로그인하여 서비스를 이용하세요</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody className="space-y-4">
          {login.error && (
            <div className="p-3 text-sm text-krds-danger-base bg-krds-danger-5 rounded-md">
              이메일 또는 비밀번호가 올바르지 않습니다.
            </div>
          )}

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
                placeholder="••••••••"
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

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="rememberMe" {...register('rememberMe')} />
              <Label htmlFor="rememberMe" className="text-sm font-normal">
                로그인 상태 유지
              </Label>
            </div>
            <Link
              href={forgotPasswordPath}
              className="text-sm text-krds-primary-base hover:underline"
            >
              비밀번호 찾기
            </Link>
          </div>
        </CardBody>

        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || login.isPending}
          >
            <LogIn className="w-4 h-4 mr-2" />
            {isSubmitting || login.isPending ? '로그인 중...' : '로그인'}
          </Button>

          <p className="text-center text-sm text-krds-gray-60">
            계정이 없으신가요?{' '}
            <Link
              href={signupPath}
              className="text-krds-primary-base hover:underline"
            >
              회원가입
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
