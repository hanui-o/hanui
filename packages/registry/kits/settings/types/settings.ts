// Settings Kit - Types
// 설정 관련 타입 정의

// 테마 타입
export type Theme = 'light' | 'dark' | 'system';

// 언어 타입
export type Language = 'ko' | 'en' | 'ja' | 'zh';

// 폰트 크기
export type FontSize = 'small' | 'medium' | 'large';

// 알림 설정
export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketing: boolean;
}

// 개인정보 설정
export interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends';
  activityStatus: boolean;
  searchable: boolean;
  dataCollection: boolean;
}

// 접근성 설정
export interface AccessibilitySettings {
  fontSize: FontSize;
  highContrast: boolean;
  reduceMotion: boolean;
  screenReader: boolean;
}

// 프로필 정보
export interface ProfileInfo {
  displayName: string;
  email: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  website?: string;
  location?: string;
}

// 앱 설정
export interface AppSettings {
  theme: Theme;
  language: Language;
  accessibility: AccessibilitySettings;
  notifications: NotificationPreferences;
  privacy: PrivacySettings;
}

// 전체 설정 상태
export interface SettingsState {
  // 앱 설정
  theme: Theme;
  language: Language;
  accessibility: AccessibilitySettings;
  notifications: NotificationPreferences;
  privacy: PrivacySettings;

  // 프로필
  profile: ProfileInfo | null;

  // 로딩/에러
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;

  // 변경 추적
  hasUnsavedChanges: boolean;
}

// 설정 섹션 정의
export interface SettingsSection {
  id: string;
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  href?: string;
}

// 설정 아이템 타입
export type SettingItemType =
  | 'toggle'
  | 'select'
  | 'radio'
  | 'text'
  | 'number'
  | 'color'
  | 'custom';

// 설정 아이템 옵션
export interface SettingOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

// 설정 아이템
export interface SettingItem {
  id: string;
  type: SettingItemType;
  label: string;
  description?: string;
  value: unknown;
  onChange: (value: unknown) => void;
  options?: SettingOption[];
  disabled?: boolean;
  required?: boolean;
  validation?: (value: unknown) => string | null;
}

// 설정 그룹
export interface SettingGroup {
  id: string;
  title: string;
  description?: string;
  items: SettingItem[];
}
