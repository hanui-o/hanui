/**
 * Authentication Kit - Type Definitions
 * 인증 기능에 필요한 타입 정의
 */

// 사용자 정보
export interface AuthUser {
  id: number;
  username: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  lastLoginAt?: string;
}

// 로그인 요청
export interface LoginRequest {
  username: string;
  password: string;
  rememberMe?: boolean;
}

// 로그인 응답
export interface LoginResponse {
  success: boolean;
  data: {
    user: AuthUser;
    accessToken: string;
    refreshToken: string;
  };
}

// 회원가입 요청
export interface SignupRequest {
  username: string;
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

// OTP 인증 요청
export interface OtpVerifyRequest {
  code: string;
  sessionId: string;
}

// 비밀번호 찾기 요청
export interface ForgotPasswordRequest {
  email: string;
}

// 비밀번호 재설정 요청
export interface ResetPasswordRequest {
  token: string;
  password: string;
  passwordConfirm: string;
}

// 토큰 갱신 응답
export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

// 인증 에러
export interface AuthError {
  success: false;
  message: string;
  code?:
    | 'INVALID_CREDENTIALS'
    | 'ACCOUNT_LOCKED'
    | 'TOKEN_EXPIRED'
    | 'OTP_REQUIRED';
}
