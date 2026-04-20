/**
 * Authentication Kit
 * 인증 기능 키트 - API 주소만 바꾸면 바로 사용 가능
 */

// Hooks
export {
  useCurrentUser,
  useLogin,
  useLogout,
  useSignup,
  useVerifyOtp,
  useResendOtp,
  useForgotPassword,
  useResetPassword,
  authKeys,
} from './hooks/useAuth';

// Store
export {
  useAuthStore,
  useCurrentAuthUser,
  useIsAuthenticated,
} from './store/authStore';

// API
export {
  login,
  logout,
  signup,
  verifyOtp,
  resendOtp,
  forgotPassword,
  resetPassword,
  refreshToken,
  getCurrentUser,
  api,
} from './api/auth';

// Types
export type {
  AuthUser,
  LoginRequest,
  LoginResponse,
  SignupRequest,
  OtpVerifyRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  RefreshResponse,
  AuthError,
} from './types/auth';
