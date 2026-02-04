/**
 * Authentication Kit
 * 인증 관련 컴포넌트 키트 - 로그인, 회원가입, 비밀번호 찾기, 2단계 인증
 *
 * @example
 * ```tsx
 * import {
 *   LoginForm,
 *   SignupForm,
 *   ForgotPasswordForm,
 *   TwoFactorSetup,
 * } from '@hanui/react/kits/authentication';
 *
 * // 로그인 폼
 * <LoginForm onSubmit={handleLogin} />
 *
 * // 회원가입 폼
 * <SignupForm onSubmit={handleSignup} />
 *
 * // 비밀번호 찾기
 * <ForgotPasswordForm
 *   onEmailSubmit={handleEmailRequest}
 *   onResetSubmit={handleResetPassword}
 * />
 *
 * // 2단계 인증 설정
 * <TwoFactorSetup
 *   qrCodeUrl="/api/2fa/qr"
 *   secretKey="ABCD1234"
 *   onVerify={handleVerify}
 * />
 * ```
 */

// Components
export {
  LoginForm,
  loginSchema,
  type LoginFormData,
  type LoginFormProps,
} from './login-form';

export {
  SignupForm,
  signupSchema,
  calculatePasswordStrength,
  type SignupFormData,
  type SignupFormProps,
} from './signup-form';

export {
  ForgotPasswordForm,
  emailRequestSchema,
  resetPasswordSchema,
  type EmailRequestFormData,
  type ResetPasswordFormData,
  type ForgotPasswordFormProps,
  type ForgotPasswordStep,
} from './forgot-password-form';

export {
  TwoFactorSetup,
  verifyCodeSchema,
  type VerifyCodeFormData,
  type TwoFactorSetupProps,
  type TwoFactorStep,
} from './two-factor-setup';
