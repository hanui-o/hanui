'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/input';
import { Switch } from '@/components/switch';
import {
  FormField,
  FormLabel,
  FormError,
  FormHelperText,
} from '@/components/form-field';
import { Button } from '@/components/button';
import { cn } from '@/lib/utils';

/**
 * 비밀번호 변경 폼 데이터 타입
 */
export interface PasswordChangeFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * 보안 설정 상태 타입
 */
export interface SecurityState {
  twoFactorEnabled: boolean;
  loginNotificationEnabled: boolean;
  sessionTimeoutEnabled: boolean;
}

/**
 * 보안 설정 컴포넌트 Props
 */
export interface SecuritySettingsProps {
  /** 초기 보안 설정 상태 */
  defaultSecurityState?: Partial<SecurityState>;
  /** 마지막 비밀번호 변경일 */
  lastPasswordChange?: Date;
  /** 활성 세션 수 */
  activeSessionCount?: number;
  /** 비밀번호 변경 콜백 */
  onPasswordChange?: (data: PasswordChangeFormData) => void | Promise<void>;
  /** 2단계 인증 토글 콜백 */
  onTwoFactorToggle?: (enabled: boolean) => void | Promise<void>;
  /** 로그인 알림 토글 콜백 */
  onLoginNotificationToggle?: (enabled: boolean) => void | Promise<void>;
  /** 세션 타임아웃 토글 콜백 */
  onSessionTimeoutToggle?: (enabled: boolean) => void | Promise<void>;
  /** 모든 세션 로그아웃 콜백 */
  onLogoutAllSessions?: () => void | Promise<void>;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * SecuritySettings - 보안 설정 컴포넌트
 *
 * 계정 보안과 관련된 설정을 관리하는 컴포넌트입니다.
 *
 * 접근성:
 * - Toggle(Switch) 상태가 명확하게 전달됨
 * - 비밀번호 변경 결과 role="status" 제공
 * - 모든 인터랙티브 요소에 적절한 레이블
 *
 * @example
 * ```tsx
 * <SecuritySettings
 *   defaultSecurityState={{
 *     twoFactorEnabled: false,
 *     loginNotificationEnabled: true,
 *   }}
 *   onPasswordChange={async (data) => { await changePassword(data); }}
 *   onTwoFactorToggle={async (enabled) => { await toggle2FA(enabled); }}
 * />
 * ```
 */
export function SecuritySettings({
  defaultSecurityState,
  lastPasswordChange,
  activeSessionCount = 1,
  onPasswordChange,
  onTwoFactorToggle,
  onLoginNotificationToggle,
  onSessionTimeoutToggle,
  onLogoutAllSessions,
  disabled = false,
  className,
}: SecuritySettingsProps) {
  // 보안 설정 상태
  const [securityState, setSecurityState] = React.useState<SecurityState>({
    twoFactorEnabled: defaultSecurityState?.twoFactorEnabled ?? false,
    loginNotificationEnabled:
      defaultSecurityState?.loginNotificationEnabled ?? false,
    sessionTimeoutEnabled:
      defaultSecurityState?.sessionTimeoutEnabled ?? false,
  });

  // 비밀번호 변경 상태
  const [isChangingPassword, setIsChangingPassword] = React.useState(false);
  const [passwordChangeStatus, setPasswordChangeStatus] = React.useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [passwordChangeMessage, setPasswordChangeMessage] = React.useState('');

  // 토글 상태 메시지
  const [toggleMessages, setToggleMessages] = React.useState<
    Record<string, string>
  >({});

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PasswordChangeFormData>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const newPassword = watch('newPassword');

  // 비밀번호 변경 핸들러
  const onPasswordSubmit = async (data: PasswordChangeFormData) => {
    if (!onPasswordChange) return;

    setIsChangingPassword(true);
    setPasswordChangeStatus('idle');
    setPasswordChangeMessage('');

    try {
      await onPasswordChange(data);
      setPasswordChangeStatus('success');
      setPasswordChangeMessage('비밀번호가 성공적으로 변경되었습니다.');
      reset();
    } catch (error) {
      setPasswordChangeStatus('error');
      setPasswordChangeMessage(
        error instanceof Error
          ? error.message
          : '비밀번호 변경에 실패했습니다.'
      );
    } finally {
      setIsChangingPassword(false);
    }
  };

  // 토글 핸들러 헬퍼
  const handleToggle = async (
    key: keyof SecurityState,
    value: boolean,
    callback?: (enabled: boolean) => void | Promise<void>,
    successMessage?: string
  ) => {
    if (!callback) {
      setSecurityState((prev) => ({ ...prev, [key]: value }));
      return;
    }

    try {
      await callback(value);
      setSecurityState((prev) => ({ ...prev, [key]: value }));
      if (successMessage) {
        setToggleMessages((prev) => ({ ...prev, [key]: successMessage }));
        setTimeout(() => {
          setToggleMessages((prev) => ({ ...prev, [key]: '' }));
        }, 3000);
      }
    } catch {
      // 실패 시 상태 유지
    }
  };

  // 마지막 비밀번호 변경일 포맷
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className={cn('space-y-8', className)}>
      {/* 비밀번호 변경 섹션 */}
      <section aria-labelledby="password-change-heading">
        <div className="flex items-center justify-between mb-4">
          <h3
            id="password-change-heading"
            className="text-krds-heading-md font-semibold text-krds-gray-95"
          >
            비밀번호 변경
          </h3>
          {lastPasswordChange && (
            <span className="text-krds-body-sm text-krds-gray-60">
              마지막 변경: {formatDate(lastPasswordChange)}
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit(onPasswordSubmit)} className="space-y-4">
          {/* 현재 비밀번호 */}
          <FormField
            id="currentPassword"
            required
            status={errors.currentPassword ? 'error' : undefined}
          >
            <FormLabel>현재 비밀번호</FormLabel>
            <Input
              {...register('currentPassword', {
                required: '현재 비밀번호를 입력해주세요.',
              })}
              type="password"
              placeholder="현재 비밀번호"
              disabled={disabled || isChangingPassword}
            />
            {errors.currentPassword && (
              <FormError>{errors.currentPassword.message}</FormError>
            )}
          </FormField>

          {/* 새 비밀번호 */}
          <FormField
            id="newPassword"
            required
            status={errors.newPassword ? 'error' : undefined}
          >
            <FormLabel>새 비밀번호</FormLabel>
            <Input
              {...register('newPassword', {
                required: '새 비밀번호를 입력해주세요.',
                minLength: {
                  value: 8,
                  message: '비밀번호는 8자 이상이어야 합니다.',
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                  message:
                    '대문자, 소문자, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다.',
                },
              })}
              type="password"
              placeholder="새 비밀번호"
              disabled={disabled || isChangingPassword}
            />
            <FormHelperText>
              8자 이상, 대소문자/숫자/특수문자 포함
            </FormHelperText>
            {errors.newPassword && (
              <FormError>{errors.newPassword.message}</FormError>
            )}
          </FormField>

          {/* 비밀번호 확인 */}
          <FormField
            id="confirmPassword"
            required
            status={errors.confirmPassword ? 'error' : undefined}
          >
            <FormLabel>비밀번호 확인</FormLabel>
            <Input
              {...register('confirmPassword', {
                required: '비밀번호 확인을 입력해주세요.',
                validate: (value) =>
                  value === newPassword || '비밀번호가 일치하지 않습니다.',
              })}
              type="password"
              placeholder="새 비밀번호 확인"
              disabled={disabled || isChangingPassword}
            />
            {errors.confirmPassword && (
              <FormError>{errors.confirmPassword.message}</FormError>
            )}
          </FormField>

          {/* 비밀번호 변경 버튼 및 상태 */}
          <div className="flex items-center gap-4 pt-2">
            <Button
              type="submit"
              variant="primary"
              disabled={disabled || isChangingPassword}
            >
              {isChangingPassword ? '변경 중...' : '비밀번호 변경'}
            </Button>

            {/* 비밀번호 변경 결과 (접근성: role="status") */}
            <div role="status" aria-live="polite" aria-atomic="true">
              {passwordChangeStatus === 'success' && (
                <span className="text-krds-success-60 text-krds-body-md">
                  {passwordChangeMessage}
                </span>
              )}
              {passwordChangeStatus === 'error' && (
                <span className="text-krds-danger-60 text-krds-body-md">
                  {passwordChangeMessage}
                </span>
              )}
            </div>
          </div>
        </form>
      </section>

      {/* 보안 옵션 섹션 */}
      <section aria-labelledby="security-options-heading">
        <h3
          id="security-options-heading"
          className="text-krds-heading-md font-semibold text-krds-gray-95 mb-4"
        >
          보안 옵션
        </h3>

        <div className="space-y-6">
          {/* 2단계 인증 */}
          <div className="flex items-start justify-between gap-4 p-4 bg-krds-gray-5 rounded-lg">
            <div className="flex-1">
              <p className="text-krds-body-md font-medium text-krds-gray-90">
                2단계 인증
              </p>
              <p className="text-krds-body-sm text-krds-gray-60 mt-1">
                로그인 시 추가 인증을 요구하여 계정을 더 안전하게 보호합니다.
              </p>
              {toggleMessages.twoFactorEnabled && (
                <p
                  className="text-krds-body-sm text-krds-success-60 mt-1"
                  role="status"
                  aria-live="polite"
                >
                  {toggleMessages.twoFactorEnabled}
                </p>
              )}
            </div>
            <Switch
              id="twoFactorEnabled"
              checked={securityState.twoFactorEnabled}
              onCheckedChange={(checked) =>
                handleToggle(
                  'twoFactorEnabled',
                  checked,
                  onTwoFactorToggle,
                  checked ? '2단계 인증이 활성화되었습니다.' : '2단계 인증이 비활성화되었습니다.'
                )
              }
              disabled={disabled}
              aria-describedby="twoFactorEnabled-desc"
            />
            <span id="twoFactorEnabled-desc" className="sr-only">
              {securityState.twoFactorEnabled
                ? '현재 활성화됨. 끄려면 클릭하세요.'
                : '현재 비활성화됨. 켜려면 클릭하세요.'}
            </span>
          </div>

          {/* 로그인 알림 */}
          <div className="flex items-start justify-between gap-4 p-4 bg-krds-gray-5 rounded-lg">
            <div className="flex-1">
              <p className="text-krds-body-md font-medium text-krds-gray-90">
                로그인 알림
              </p>
              <p className="text-krds-body-sm text-krds-gray-60 mt-1">
                새로운 기기에서 로그인할 때 이메일 알림을 받습니다.
              </p>
              {toggleMessages.loginNotificationEnabled && (
                <p
                  className="text-krds-body-sm text-krds-success-60 mt-1"
                  role="status"
                  aria-live="polite"
                >
                  {toggleMessages.loginNotificationEnabled}
                </p>
              )}
            </div>
            <Switch
              id="loginNotificationEnabled"
              checked={securityState.loginNotificationEnabled}
              onCheckedChange={(checked) =>
                handleToggle(
                  'loginNotificationEnabled',
                  checked,
                  onLoginNotificationToggle,
                  checked ? '로그인 알림이 활성화되었습니다.' : '로그인 알림이 비활성화되었습니다.'
                )
              }
              disabled={disabled}
              aria-describedby="loginNotificationEnabled-desc"
            />
            <span id="loginNotificationEnabled-desc" className="sr-only">
              {securityState.loginNotificationEnabled
                ? '현재 활성화됨. 끄려면 클릭하세요.'
                : '현재 비활성화됨. 켜려면 클릭하세요.'}
            </span>
          </div>

          {/* 세션 타임아웃 */}
          <div className="flex items-start justify-between gap-4 p-4 bg-krds-gray-5 rounded-lg">
            <div className="flex-1">
              <p className="text-krds-body-md font-medium text-krds-gray-90">
                자동 로그아웃
              </p>
              <p className="text-krds-body-sm text-krds-gray-60 mt-1">
                30분간 활동이 없으면 자동으로 로그아웃됩니다.
              </p>
              {toggleMessages.sessionTimeoutEnabled && (
                <p
                  className="text-krds-body-sm text-krds-success-60 mt-1"
                  role="status"
                  aria-live="polite"
                >
                  {toggleMessages.sessionTimeoutEnabled}
                </p>
              )}
            </div>
            <Switch
              id="sessionTimeoutEnabled"
              checked={securityState.sessionTimeoutEnabled}
              onCheckedChange={(checked) =>
                handleToggle(
                  'sessionTimeoutEnabled',
                  checked,
                  onSessionTimeoutToggle,
                  checked ? '자동 로그아웃이 활성화되었습니다.' : '자동 로그아웃이 비활성화되었습니다.'
                )
              }
              disabled={disabled}
              aria-describedby="sessionTimeoutEnabled-desc"
            />
            <span id="sessionTimeoutEnabled-desc" className="sr-only">
              {securityState.sessionTimeoutEnabled
                ? '현재 활성화됨. 끄려면 클릭하세요.'
                : '현재 비활성화됨. 켜려면 클릭하세요.'}
            </span>
          </div>
        </div>
      </section>

      {/* 세션 관리 섹션 */}
      <section aria-labelledby="session-management-heading">
        <h3
          id="session-management-heading"
          className="text-krds-heading-md font-semibold text-krds-gray-95 mb-4"
        >
          세션 관리
        </h3>

        <div className="p-4 bg-krds-gray-5 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-krds-body-md font-medium text-krds-gray-90">
                활성 세션
              </p>
              <p className="text-krds-body-sm text-krds-gray-60 mt-1">
                현재 {activeSessionCount}개의 기기에서 로그인되어 있습니다.
              </p>
            </div>
            {onLogoutAllSessions && (
              <Button
                variant="tertiary"
                onClick={onLogoutAllSessions}
                disabled={disabled || activeSessionCount <= 1}
              >
                모든 세션 로그아웃
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

SecuritySettings.displayName = 'SecuritySettings';
