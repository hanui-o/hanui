// Auth Kit - Types
// 인증 관련 타입 정의

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: string;
}

export interface LoginInput {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface SignupInput {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  agreeTerms: boolean;
  agreeMarketing?: boolean;
}

export interface ResetPasswordInput {
  email: string;
}

export interface ResetPasswordConfirmInput {
  token: string;
  password: string;
  passwordConfirm: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export interface UpdateProfileInput {
  name?: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
