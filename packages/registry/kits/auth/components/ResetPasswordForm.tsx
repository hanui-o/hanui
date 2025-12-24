// Auth Kit - ResetPasswordForm Component
// 비밀번호 재설정 폼 컴포넌트

'use client';

import { useSearchParams } from 'next/navigation';
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
import { Lock, Save } from 'lucide-react';
import { useConfirmPasswordReset, useGuestOnly } from '../hooks/useAuth';

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)/,
        '비밀번호는 영문과 숫자를 포함해야 합니다'
      ),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
  const { isLoading } = useGuestOnly();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const confirmReset = useConfirmPasswordReset();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) return;
    await confirmReset.mutateAsync({
      token,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    });
  };

  if (isLoading) {
    return null;
  }

  if (!token) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardBody className="text-center py-8">
          <p className="text-krds-danger-base">
            유효하지 않은 링크입니다. 비밀번호 찾기를 다시 시도해주세요.
          </p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">새 비밀번호 설정</CardTitle>
        <CardDescription>새로운 비밀번호를 입력해주세요</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody className="space-y-4">
          {confirmReset.error && (
            <div className="p-3 text-sm text-krds-danger-base bg-krds-danger-5 rounded-md">
              비밀번호 재설정 중 오류가 발생했습니다. 링크가 만료되었을 수
              있습니다.
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="password">새 비밀번호</Label>
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
            <Label htmlFor="passwordConfirm">새 비밀번호 확인</Label>
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
        </CardBody>

        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || confirmReset.isPending}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting || confirmReset.isPending
              ? '처리 중...'
              : '비밀번호 변경'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
