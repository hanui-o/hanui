'use client';

import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupItem,
} from '@/components/checkbox';
import { Select, type SelectOption } from '@/components/select';
import { Switch } from '@/components/switch';
import { FormField, FormLabel, FormHelperText } from '@/components/form-field';
import { Button } from '@/components/button';
import { cn } from '@/lib/utils';

/**
 * 알림 채널 타입
 */
export type NotificationChannel = 'email' | 'push' | 'sms';

/**
 * 알림 빈도 타입
 */
export type NotificationFrequency = 'instant' | 'daily' | 'weekly' | 'never';

/**
 * 알림 카테고리 설정 타입
 */
export interface NotificationCategorySettings {
  marketing: NotificationChannel[];
  security: NotificationChannel[];
  updates: NotificationChannel[];
  reminders: NotificationChannel[];
}

/**
 * 알림 설정 폼 데이터 타입
 */
export interface NotificationFormData {
  emailNotificationsEnabled: boolean;
  pushNotificationsEnabled: boolean;
  smsNotificationsEnabled: boolean;
  emailFrequency: NotificationFrequency;
  categories: NotificationCategorySettings;
  quietHoursEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
}

/**
 * 알림 설정 컴포넌트 Props
 */
export interface NotificationPreferencesProps {
  /** 초기 알림 설정 데이터 */
  defaultValues?: Partial<NotificationFormData>;
  /** 저장 콜백 */
  onSave?: (data: NotificationFormData) => void | Promise<void>;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

const frequencyOptions: SelectOption<NotificationFrequency>[] = [
  { value: 'instant', label: '즉시' },
  { value: 'daily', label: '매일 요약' },
  { value: 'weekly', label: '매주 요약' },
  { value: 'never', label: '받지 않음' },
];

const timeOptions: SelectOption[] = Array.from({ length: 24 }, (_, i) => ({
  value: String(i).padStart(2, '0') + ':00',
  label: String(i).padStart(2, '0') + ':00',
}));

const defaultFormValues: NotificationFormData = {
  emailNotificationsEnabled: true,
  pushNotificationsEnabled: true,
  smsNotificationsEnabled: false,
  emailFrequency: 'instant',
  categories: {
    marketing: [],
    security: ['email'],
    updates: ['email', 'push'],
    reminders: ['email', 'push'],
  },
  quietHoursEnabled: false,
  quietHoursStart: '22:00',
  quietHoursEnd: '08:00',
};

/**
 * NotificationPreferences - 알림 설정 컴포넌트
 *
 * 다양한 알림 채널과 카테고리별 알림 설정을 관리하는 컴포넌트입니다.
 *
 * 접근성:
 * - Checkbox 그룹은 fieldset + legend로 묶음
 * - Select에 명확한 label 제공
 * - 저장 결과 안내 (aria-live)
 *
 * @example
 * ```tsx
 * <NotificationPreferences
 *   defaultValues={{
 *     emailNotificationsEnabled: true,
 *     pushNotificationsEnabled: true,
 *   }}
 *   onSave={async (data) => { await saveNotificationSettings(data); }}
 * />
 * ```
 */
export function NotificationPreferences({
  defaultValues,
  onSave,
  disabled = false,
  className,
}: NotificationPreferencesProps) {
  const [isSaving, setIsSaving] = React.useState(false);
  const [saveStatus, setSaveStatus] = React.useState<
    'idle' | 'success' | 'error'
  >('idle');

  const { handleSubmit, control, watch, setValue } =
    useForm<NotificationFormData>({
      defaultValues: {
        ...defaultFormValues,
        ...defaultValues,
        categories: {
          ...defaultFormValues.categories,
          ...defaultValues?.categories,
        },
      },
    });

  // 마스터 토글 상태 감시
  const emailEnabled = watch('emailNotificationsEnabled');
  const pushEnabled = watch('pushNotificationsEnabled');
  const smsEnabled = watch('smsNotificationsEnabled');
  const quietHoursEnabled = watch('quietHoursEnabled');

  // 마스터 토글 변경 시 카테고리에서 해당 채널 제거
  const handleMasterToggle = (
    channel: NotificationChannel,
    enabled: boolean
  ) => {
    if (!enabled) {
      const categories = watch('categories');
      const updatedCategories = Object.fromEntries(
        Object.entries(categories).map(([key, channels]) => [
          key,
          channels.filter((c) => c !== channel),
        ])
      ) as NotificationCategorySettings;
      setValue('categories', updatedCategories);
    }
  };

  const onSubmit = async (data: NotificationFormData) => {
    if (!onSave) return;

    setIsSaving(true);
    setSaveStatus('idle');

    try {
      await onSave(data);
      setSaveStatus('success');
    } catch {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  // 카테고리별 체크박스 렌더링 헬퍼
  const renderCategoryCheckboxes = (
    category: keyof NotificationCategorySettings,
    legend: string,
    description: string
  ) => {
    const availableChannels: { value: NotificationChannel; label: string }[] =
      [];
    if (emailEnabled) availableChannels.push({ value: 'email', label: '이메일' });
    if (pushEnabled) availableChannels.push({ value: 'push', label: '푸시 알림' });
    if (smsEnabled) availableChannels.push({ value: 'sms', label: 'SMS' });

    return (
      <fieldset className="p-4 bg-krds-gray-5 rounded-lg">
        <legend className="text-krds-body-md font-medium text-krds-gray-90 mb-1">
          {legend}
        </legend>
        <p className="text-krds-body-sm text-krds-gray-60 mb-3">{description}</p>

        {availableChannels.length > 0 ? (
          <Controller
            name={`categories.${category}`}
            control={control}
            render={({ field }) => (
              <CheckboxGroup
                value={field.value}
                onValueChange={field.onChange}
                orientation="horizontal"
                disabled={disabled}
              >
                {availableChannels.map((channel) => (
                  <CheckboxGroupItem
                    key={channel.value}
                    value={channel.value}
                    label={channel.label}
                  />
                ))}
              </CheckboxGroup>
            )}
          />
        ) : (
          <p className="text-krds-body-sm text-krds-gray-50 italic">
            알림 채널을 먼저 활성화해주세요.
          </p>
        )}
      </fieldset>
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('space-y-8', className)}
    >
      {/* 알림 채널 섹션 */}
      <section aria-labelledby="notification-channels-heading">
        <h3
          id="notification-channels-heading"
          className="text-krds-heading-md font-semibold text-krds-gray-95 mb-4"
        >
          알림 채널
        </h3>
        <p className="text-krds-body-sm text-krds-gray-60 mb-4">
          알림을 받을 채널을 선택하세요.
        </p>

        <div className="space-y-4">
          {/* 이메일 알림 */}
          <div className="flex items-center justify-between p-4 bg-krds-gray-5 rounded-lg">
            <div>
              <p className="text-krds-body-md font-medium text-krds-gray-90">
                이메일 알림
              </p>
              <p className="text-krds-body-sm text-krds-gray-60 mt-1">
                이메일로 알림을 받습니다.
              </p>
            </div>
            <Controller
              name="emailNotificationsEnabled"
              control={control}
              render={({ field }) => (
                <Switch
                  id="emailNotificationsEnabled"
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    handleMasterToggle('email', checked);
                  }}
                  disabled={disabled}
                />
              )}
            />
          </div>

          {/* 푸시 알림 */}
          <div className="flex items-center justify-between p-4 bg-krds-gray-5 rounded-lg">
            <div>
              <p className="text-krds-body-md font-medium text-krds-gray-90">
                푸시 알림
              </p>
              <p className="text-krds-body-sm text-krds-gray-60 mt-1">
                브라우저/앱 푸시 알림을 받습니다.
              </p>
            </div>
            <Controller
              name="pushNotificationsEnabled"
              control={control}
              render={({ field }) => (
                <Switch
                  id="pushNotificationsEnabled"
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    handleMasterToggle('push', checked);
                  }}
                  disabled={disabled}
                />
              )}
            />
          </div>

          {/* SMS 알림 */}
          <div className="flex items-center justify-between p-4 bg-krds-gray-5 rounded-lg">
            <div>
              <p className="text-krds-body-md font-medium text-krds-gray-90">
                SMS 알림
              </p>
              <p className="text-krds-body-sm text-krds-gray-60 mt-1">
                문자 메시지로 알림을 받습니다.
              </p>
            </div>
            <Controller
              name="smsNotificationsEnabled"
              control={control}
              render={({ field }) => (
                <Switch
                  id="smsNotificationsEnabled"
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    handleMasterToggle('sms', checked);
                  }}
                  disabled={disabled}
                />
              )}
            />
          </div>
        </div>
      </section>

      {/* 이메일 빈도 설정 */}
      {emailEnabled && (
        <section aria-labelledby="email-frequency-heading">
          <h3
            id="email-frequency-heading"
            className="text-krds-heading-md font-semibold text-krds-gray-95 mb-4"
          >
            이메일 수신 빈도
          </h3>

          <FormField id="emailFrequency">
            <FormLabel>알림 이메일 수신 주기</FormLabel>
            <Controller
              name="emailFrequency"
              control={control}
              render={({ field }) => (
                <Select
                  options={frequencyOptions}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="수신 빈도 선택"
                  disabled={disabled}
                  size="md"
                />
              )}
            />
            <FormHelperText>
              요약으로 선택하면 알림을 모아서 한 번에 보내드립니다.
            </FormHelperText>
          </FormField>
        </section>
      )}

      {/* 알림 카테고리 섹션 */}
      <section aria-labelledby="notification-categories-heading">
        <h3
          id="notification-categories-heading"
          className="text-krds-heading-md font-semibold text-krds-gray-95 mb-4"
        >
          알림 카테고리
        </h3>
        <p className="text-krds-body-sm text-krds-gray-60 mb-4">
          각 카테고리별로 알림 받을 채널을 선택하세요.
        </p>

        <div className="space-y-4">
          {renderCategoryCheckboxes(
            'security',
            '보안 알림',
            '로그인 시도, 비밀번호 변경 등 보안 관련 알림'
          )}

          {renderCategoryCheckboxes(
            'updates',
            '업데이트 알림',
            '서비스 업데이트, 새로운 기능 안내'
          )}

          {renderCategoryCheckboxes(
            'reminders',
            '리마인더',
            '예정된 이벤트, 마감일 알림'
          )}

          {renderCategoryCheckboxes(
            'marketing',
            '마케팅 알림',
            '프로모션, 이벤트, 뉴스레터'
          )}
        </div>
      </section>

      {/* 방해 금지 모드 섹션 */}
      <section aria-labelledby="quiet-hours-heading">
        <h3
          id="quiet-hours-heading"
          className="text-krds-heading-md font-semibold text-krds-gray-95 mb-4"
        >
          방해 금지 모드
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-krds-gray-5 rounded-lg">
            <div>
              <p className="text-krds-body-md font-medium text-krds-gray-90">
                방해 금지 모드 사용
              </p>
              <p className="text-krds-body-sm text-krds-gray-60 mt-1">
                설정된 시간 동안 푸시 알림을 받지 않습니다.
              </p>
            </div>
            <Controller
              name="quietHoursEnabled"
              control={control}
              render={({ field }) => (
                <Switch
                  id="quietHoursEnabled"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={disabled}
                />
              )}
            />
          </div>

          {quietHoursEnabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-krds-gray-5 rounded-lg">
              <FormField id="quietHoursStart">
                <FormLabel>시작 시간</FormLabel>
                <Controller
                  name="quietHoursStart"
                  control={control}
                  render={({ field }) => (
                    <Select
                      options={timeOptions}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="시작 시간"
                      disabled={disabled}
                      size="md"
                    />
                  )}
                />
              </FormField>

              <FormField id="quietHoursEnd">
                <FormLabel>종료 시간</FormLabel>
                <Controller
                  name="quietHoursEnd"
                  control={control}
                  render={({ field }) => (
                    <Select
                      options={timeOptions}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="종료 시간"
                      disabled={disabled}
                      size="md"
                    />
                  )}
                />
              </FormField>
            </div>
          )}
        </div>
      </section>

      {/* 저장 버튼 */}
      <div className="flex items-center gap-4 pt-4">
        <Button type="submit" variant="primary" disabled={disabled || isSaving}>
          {isSaving ? '저장 중...' : '변경사항 저장'}
        </Button>

        {/* 저장 결과 안내 (접근성: aria-live) */}
        <div aria-live="polite" aria-atomic="true">
          {saveStatus === 'success' && (
            <span className="text-krds-success-60 text-krds-body-md">
              알림 설정이 저장되었습니다.
            </span>
          )}
          {saveStatus === 'error' && (
            <span className="text-krds-danger-60 text-krds-body-md">
              저장에 실패했습니다. 다시 시도해주세요.
            </span>
          )}
        </div>
      </div>
    </form>
  );
}

NotificationPreferences.displayName = 'NotificationPreferences';
