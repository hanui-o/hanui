// Auth Kit - Hooks
// React Query 기반 인증 hooks

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  login as loginApi,
  logout as logoutApi,
  signup as signupApi,
  getMe,
  requestPasswordReset,
  confirmPasswordReset,
  changePassword,
  updateProfile,
  checkEmailExists,
  tokenStorage,
} from '../api/auth';
import { useAuthStore } from '../stores/authStore';
import type {
  LoginInput,
  SignupInput,
  ResetPasswordInput,
  ResetPasswordConfirmInput,
  ChangePasswordInput,
  UpdateProfileInput,
} from '../types/auth';

// 현재 사용자 조회 hook
export function useUser() {
  const { setUser, setLoading, setInitialized, isInitialized } = useAuthStore();

  const query = useQuery({
    queryKey: ['user'],
    queryFn: getMe,
    enabled: !!tokenStorage.getAccessToken(),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    } else if (query.isError) {
      setUser(null);
    }
    setLoading(query.isLoading);
    if (!isInitialized && !query.isLoading) {
      setInitialized(true);
    }
  }, [
    query.data,
    query.isError,
    query.isLoading,
    setUser,
    setLoading,
    setInitialized,
    isInitialized,
  ]);

  return query;
}

// 로그인 mutation
export function useLogin() {
  const queryClient = useQueryClient();
  const { login: loginStore } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginInput) => loginApi(data),
    onSuccess: (data) => {
      loginStore(data.user);
      queryClient.setQueryData(['user'], data.user);
      router.push('/');
    },
  });
}

// 회원가입 mutation
export function useSignup() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignupInput) => signupApi(data),
    onSuccess: () => {
      router.push('/login?signup=success');
    },
  });
}

// 로그아웃 mutation
export function useLogout() {
  const queryClient = useQueryClient();
  const { logout: logoutStore } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      logoutStore();
      queryClient.clear();
      router.push('/login');
    },
  });
}

// 비밀번호 재설정 요청 mutation
export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: (data: ResetPasswordInput) => requestPasswordReset(data),
  });
}

// 비밀번호 재설정 확인 mutation
export function useConfirmPasswordReset() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ResetPasswordConfirmInput) => confirmPasswordReset(data),
    onSuccess: () => {
      router.push('/login?password=reset');
    },
  });
}

// 비밀번호 변경 mutation
export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordInput) => changePassword(data),
  });
}

// 프로필 업데이트 mutation
export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { updateUser } = useAuthStore();

  return useMutation({
    mutationFn: (data: UpdateProfileInput) => updateProfile(data),
    onSuccess: (user) => {
      updateUser(user);
      queryClient.setQueryData(['user'], user);
    },
  });
}

// 이메일 중복 확인 hook
export function useCheckEmail() {
  return useMutation({
    mutationFn: (email: string) => checkEmailExists(email),
  });
}

// 인증 필요 페이지 보호 hook
export function useRequireAuth(redirectTo = '/login') {
  const router = useRouter();
  const { isAuthenticated, isInitialized } = useAuthStore();

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isInitialized, router, redirectTo]);

  return { isAuthenticated, isLoading: !isInitialized };
}

// 게스트 전용 페이지 hook (로그인 시 리다이렉트)
export function useGuestOnly(redirectTo = '/') {
  const router = useRouter();
  const { isAuthenticated, isInitialized } = useAuthStore();

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isInitialized, router, redirectTo]);

  return { isAuthenticated, isLoading: !isInitialized };
}
