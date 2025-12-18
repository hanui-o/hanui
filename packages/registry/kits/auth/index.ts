// Auth Kit - Entry Point
// 인증 기능 키트

// Types
export type {
  User,
  LoginInput,
  LoginResponse,
  SignupInput,
  ResetPasswordInput,
  ResetPasswordConfirmInput,
  ChangePasswordInput,
  UpdateProfileInput,
  AuthState,
} from './types/auth';

// API
export {
  login,
  logout,
  signup,
  getMe,
  requestPasswordReset,
  confirmPasswordReset,
  changePassword,
  updateProfile,
  checkEmailExists,
  tokenStorage,
} from './api/auth';

// Store
export { useAuthStore } from './stores/authStore';

// Hooks
export {
  useUser,
  useLogin,
  useSignup,
  useLogout,
  useRequestPasswordReset,
  useConfirmPasswordReset,
  useChangePassword,
  useUpdateProfile,
  useCheckEmail,
  useRequireAuth,
  useGuestOnly,
} from './hooks/useAuth';

// Components
export { LoginForm } from './components/LoginForm';
export { SignupForm } from './components/SignupForm';
export { ForgotPasswordForm } from './components/ForgotPasswordForm';
export { ResetPasswordForm } from './components/ResetPasswordForm';
