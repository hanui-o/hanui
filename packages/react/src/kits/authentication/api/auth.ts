/**
 * Authentication Kit - API
 * 인증 관련 API
 */

import axios from 'axios';
import type {
  AuthUser,
  LoginRequest,
  LoginResponse,
  SignupRequest,
  OtpVerifyRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  RefreshResponse,
} from '../types/auth';

export const api = axios.create({
  baseURL: '/api/auth',
  headers: { 'Content-Type': 'application/json' },
});

/** 로그인 */
export async function login(req: LoginRequest): Promise<LoginResponse['data']> {
  const { data } = await api.post<LoginResponse>('/login', req);
  return data.data;
}

/** 로그아웃 */
export async function logout(): Promise<void> {
  await api.post('/logout');
}

/** 회원가입 */
export async function signup(req: SignupRequest): Promise<AuthUser> {
  const { data } = await api.post('/signup', req);
  return data.data;
}

/** OTP 인증 */
export async function verifyOtp(
  req: OtpVerifyRequest
): Promise<LoginResponse['data']> {
  const { data } = await api.post('/otp/verify', req);
  return data.data;
}

/** OTP 재전송 */
export async function resendOtp(sessionId: string): Promise<void> {
  await api.post('/otp/resend', { sessionId });
}

/** 비밀번호 찾기 */
export async function forgotPassword(
  req: ForgotPasswordRequest
): Promise<void> {
  await api.post('/forgot-password', req);
}

/** 비밀번호 재설정 */
export async function resetPassword(req: ResetPasswordRequest): Promise<void> {
  await api.post('/reset-password', req);
}

/** 토큰 갱신 */
export async function refreshToken(
  refreshToken: string
): Promise<RefreshResponse> {
  const { data } = await api.post('/refresh', { refreshToken });
  return data.data;
}

/** 현재 사용자 정보 */
export async function getCurrentUser(): Promise<AuthUser> {
  const { data } = await api.get('/me');
  return data.data;
}
