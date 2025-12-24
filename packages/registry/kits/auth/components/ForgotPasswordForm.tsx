// Auth Kit - ForgotPasswordForm Component
// 비밀번호 찾기 폼 컴포넌트

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Button,
  Input,
  Label,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
} from '@hanui/react';
import { Mail, ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { useRequestPasswordReset, useGuestOnly } from '../hooks/useAuth';

const forgotPasswordSchema = z.object({
  email: z.string().email('올바른 이메일 형식을 입력해주세요'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
  loginPath?: string;
}

export function ForgotPasswordForm({
  loginPath = '/login',
}: ForgotPasswordFormProps) {
  const { isLoading } = useGuestOnly();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const requestReset = useRequestPasswordReset();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    await requestReset.mutateAsync(data);
    setIsSubmitted(true);
  };

  if (isLoading) {
    return null;
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardBody className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-krds-success-base mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">이메일을 확인해주세요</h2>
          <p className="text-krds-gray-60 mb-6">
            입력하신 이메일로 비밀번호 재설정 링크를 발송했습니다.
            <br />
            이메일이 도착하지 않았다면 스팸함을 확인해주세요.
          </p>
          <Button asChild variant="outline">
            <Link href={loginPath}>로그인 페이지로</Link>
          </Button>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">비밀번호 찾기</CardTitle>
        <CardDescription>
          가입하신 이메일로 비밀번호 재설정 링크를 보내드립니다
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody className="space-y-4">
          {requestReset.error && (
            <div className="p-3 text-sm text-krds-danger-base bg-krds-danger-5 rounded-md">
              이메일 발송 중 오류가 발생했습니다. 다시 시도해주세요.
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
        </CardBody>

        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || requestReset.isPending}
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting || requestReset.isPending
              ? '발송 중...'
              : '재설정 링크 보내기'}
          </Button>

          <Button asChild variant="ghost" className="w-full">
            <Link href={loginPath}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              로그인으로 돌아가기
            </Link>
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
