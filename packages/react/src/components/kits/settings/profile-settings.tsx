'use client';

import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '@/components/input';
import { Select, type SelectOption } from '@/components/select';
import { FileUpload, type UploadedFile } from '@/components/file-upload';
import {
  FormField,
  FormLabel,
  FormError,
  FormHelperText,
} from '@/components/form-field';
import { Button } from '@/components/button';
import { cn } from '@/lib/utils';

/**
 * 프로필 설정 폼 데이터 타입
 */
export interface ProfileFormData {
  displayName: string;
  email: string;
  bio: string;
  language: string;
  timezone: string;
}

/**
 * 프로필 설정 컴포넌트 Props
 */
export interface ProfileSettingsProps {
  /** 초기 프로필 데이터 */
  defaultValues?: Partial<ProfileFormData>;
  /** 현재 프로필 이미지 URL */
  profileImageUrl?: string;
  /** 언어 옵션 목록 */
  languageOptions?: SelectOption[];
  /** 타임존 옵션 목록 */
  timezoneOptions?: SelectOption[];
  /** 저장 성공 시 콜백 */
  onSave?: (data: ProfileFormData) => void | Promise<void>;
  /** 프로필 이미지 업로드 콜백 */
  onImageUpload?: (files: File[]) => void | Promise<void>;
  /** 프로필 이미지 삭제 콜백 */
  onImageRemove?: () => void;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

const defaultLanguageOptions: SelectOption[] = [
  { value: 'ko', label: '한국어' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
  { value: 'zh', label: '中文' },
];

const defaultTimezoneOptions: SelectOption[] = [
  { value: 'Asia/Seoul', label: '서울 (GMT+9)' },
  { value: 'America/New_York', label: '뉴욕 (GMT-5)' },
  { value: 'Europe/London', label: '런던 (GMT+0)' },
  { value: 'Asia/Tokyo', label: '도쿄 (GMT+9)' },
];

/**
 * ProfileSettings - 프로필 설정 컴포넌트
 *
 * 사용자 프로필 정보를 편집할 수 있는 설정 폼입니다.
 *
 * 접근성:
 * - 프로필 사진에 적절한 alt 텍스트 제공
 * - 파일 업로드 상태 안내 (aria-live)
 * - 저장 결과 안내 (aria-live="polite")
 *
 * @example
 * ```tsx
 * <ProfileSettings
 *   defaultValues={{ displayName: '홍길동', email: 'user@example.com' }}
 *   profileImageUrl="/avatar.jpg"
 *   onSave={async (data) => { await saveProfile(data); }}
 *   onImageUpload={async (files) => { await uploadImage(files[0]); }}
 * />
 * ```
 */
export function ProfileSettings({
  defaultValues,
  profileImageUrl,
  languageOptions = defaultLanguageOptions,
  timezoneOptions = defaultTimezoneOptions,
  onSave,
  onImageUpload,
  onImageRemove,
  disabled = false,
  className,
}: ProfileSettingsProps) {
  const [isSaving, setIsSaving] = React.useState(false);
  const [saveStatus, setSaveStatus] = React.useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [uploadStatus, setUploadStatus] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    defaultValues: {
      displayName: defaultValues?.displayName || '',
      email: defaultValues?.email || '',
      bio: defaultValues?.bio || '',
      language: defaultValues?.language || 'ko',
      timezone: defaultValues?.timezone || 'Asia/Seoul',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
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

  const handleImageUpload = async (files: File[]) => {
    if (!onImageUpload || files.length === 0) return;

    setUploadStatus('업로드 중...');
    try {
      await onImageUpload(files);
      setUploadStatus('이미지가 업로드되었습니다.');
    } catch {
      setUploadStatus('이미지 업로드에 실패했습니다.');
    }
  };

  const handleImageChange = (files: UploadedFile[]) => {
    if (files.length === 0 && onImageRemove) {
      onImageRemove();
      setUploadStatus('이미지가 삭제되었습니다.');
    }
  };

  return (
    <div className={cn('space-y-8', className)}>
      {/* 프로필 이미지 섹션 */}
      <section aria-labelledby="profile-image-heading">
        <h3
          id="profile-image-heading"
          className="text-krds-heading-md font-semibold text-krds-gray-95 mb-4"
        >
          프로필 사진
        </h3>

        <div className="flex items-start gap-6">
          {/* 현재 프로필 이미지 */}
          {profileImageUrl && (
            <div className="shrink-0">
              <img
                src={profileImageUrl}
                alt="현재 프로필 사진"
                className="w-24 h-24 rounded-full object-cover border border-krds-gray-20"
              />
            </div>
          )}

          {/* 이미지 업로드 */}
          <div className="flex-1">
            <FileUpload
              title="새 이미지 업로드"
              description="JPG, PNG 형식, 최대 5MB"
              accept=".jpg,.jpeg,.png"
              maxSize={5 * 1024 * 1024}
              maxFiles={1}
              onUpload={handleImageUpload}
              onChange={handleImageChange}
              disabled={disabled}
              uploadButtonText="이미지 선택"
              instructionText="이미지를 선택하거나 끌어다 놓으세요"
            />

            {/* 업로드 상태 안내 (접근성) */}
            {uploadStatus && (
              <p
                className="mt-2 text-krds-body-sm text-krds-gray-70"
                aria-live="polite"
              >
                {uploadStatus}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 기본 정보 폼 */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <section aria-labelledby="basic-info-heading">
          <h3
            id="basic-info-heading"
            className="text-krds-heading-md font-semibold text-krds-gray-95 mb-4"
          >
            기본 정보
          </h3>

          <div className="space-y-4">
            {/* 표시 이름 */}
            <FormField
              id="displayName"
              required
              status={errors.displayName ? 'error' : undefined}
            >
              <FormLabel>표시 이름</FormLabel>
              <Input
                {...register('displayName', {
                  required: '표시 이름을 입력해주세요.',
                  minLength: {
                    value: 2,
                    message: '표시 이름은 2자 이상이어야 합니다.',
                  },
                })}
                placeholder="홍길동"
                disabled={disabled}
              />
              {errors.displayName && (
                <FormError>{errors.displayName.message}</FormError>
              )}
            </FormField>

            {/* 이메일 */}
            <FormField
              id="email"
              required
              status={errors.email ? 'error' : undefined}
            >
              <FormLabel>이메일</FormLabel>
              <Input
                {...register('email', {
                  required: '이메일을 입력해주세요.',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: '올바른 이메일 형식이 아닙니다.',
                  },
                })}
                type="email"
                placeholder="example@email.com"
                disabled={disabled}
              />
              {errors.email && <FormError>{errors.email.message}</FormError>}
            </FormField>

            {/* 자기소개 */}
            <FormField id="bio" status={errors.bio ? 'error' : undefined}>
              <FormLabel>자기소개</FormLabel>
              <Input
                {...register('bio', {
                  maxLength: {
                    value: 200,
                    message: '자기소개는 200자 이내로 입력해주세요.',
                  },
                })}
                placeholder="간단한 자기소개를 입력하세요"
                disabled={disabled}
              />
              <FormHelperText>최대 200자까지 입력 가능합니다.</FormHelperText>
              {errors.bio && <FormError>{errors.bio.message}</FormError>}
            </FormField>
          </div>
        </section>

        <section aria-labelledby="locale-heading">
          <h3
            id="locale-heading"
            className="text-krds-heading-md font-semibold text-krds-gray-95 mb-4"
          >
            지역 설정
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 언어 */}
            <FormField id="language">
              <FormLabel>언어</FormLabel>
              <Controller
                name="language"
                control={control}
                render={({ field }) => (
                  <Select
                    options={languageOptions}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="언어 선택"
                    disabled={disabled}
                  />
                )}
              />
            </FormField>

            {/* 타임존 */}
            <FormField id="timezone">
              <FormLabel>타임존</FormLabel>
              <Controller
                name="timezone"
                control={control}
                render={({ field }) => (
                  <Select
                    options={timezoneOptions}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="타임존 선택"
                    disabled={disabled}
                  />
                )}
              />
            </FormField>
          </div>
        </section>

        {/* 저장 버튼 및 상태 안내 */}
        <div className="flex items-center gap-4 pt-4">
          <Button
            type="submit"
            variant="primary"
            disabled={disabled || isSaving || !isDirty}
          >
            {isSaving ? '저장 중...' : '변경사항 저장'}
          </Button>

          {/* 저장 결과 안내 (접근성: aria-live) */}
          <div aria-live="polite" aria-atomic="true">
            {saveStatus === 'success' && (
              <span className="text-krds-success-60 text-krds-body-md">
                저장되었습니다.
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
    </div>
  );
}

ProfileSettings.displayName = 'ProfileSettings';
