/**
 * Authentication Kit - React Query Hooks
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  login,
  logout,
  signup,
  verifyOtp,
  resendOtp,
  forgotPassword,
  resetPassword,
  getCurrentUser,
} from '../api/auth';
import { useAuthStore } from '../store/authStore';
import type {
  LoginRequest,
  SignupRequest,
  OtpVerifyRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from '../types/auth';

export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
};

/** 현재 사용자 정보 */
export function useCurrentUser() {
  const { isAuthenticated } = useAuthStore();
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: getCurrentUser,
    enabled: isAuthenticated,
  });
}

/** 로그인 */
export function useLogin() {
  const qc = useQueryClient();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: (req: LoginRequest) => login(req),
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken, data.refreshToken);
      qc.invalidateQueries({ queryKey: authKeys.user() });
    },
  });
}

/** 로그아웃 */
export function useLogout() {
  const qc = useQueryClient();
  const { clearAuth } = useAuthStore();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearAuth();
      qc.clear();
    },
  });
}

/** 회원가입 */
export function useSignup() {
  return useMutation({
    mutationFn: (req: SignupRequest) => signup(req),
  });
}

/** OTP 인증 */
export function useVerifyOtp() {
  const qc = useQueryClient();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: (req: OtpVerifyRequest) => verifyOtp(req),
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken, data.refreshToken);
      qc.invalidateQueries({ queryKey: authKeys.user() });
    },
  });
}

/** OTP 재전송 */
export function useResendOtp() {
  return useMutation({
    mutationFn: (sessionId: string) => resendOtp(sessionId),
  });
}

/** 비밀번호 찾기 */
export function useForgotPassword() {
  return useMutation({
    mutationFn: (req: ForgotPasswordRequest) => forgotPassword(req),
  });
}

/** 비밀번호 재설정 */
export function useResetPassword() {
  return useMutation({
    mutationFn: (req: ResetPasswordRequest) => resetPassword(req),
  });
}
