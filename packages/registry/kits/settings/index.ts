// Settings Kit - Entry Point
// 설정 기능 키트

// Types
export type {
  Theme,
  Language,
  FontSize,
  NotificationPreferences,
  PrivacySettings,
  AccessibilitySettings,
  ProfileInfo,
  AppSettings,
  SettingsState,
  SettingsSection,
  SettingItemType,
  SettingOption,
  SettingItem,
  SettingGroup,
} from './types/settings';

// Store
export { useSettingsStore } from './stores/settingsStore';

// Hooks
export {
  useTheme,
  useLanguage,
  useAccessibility,
  useNotificationPreferences,
  usePrivacySettings,
  useProfile,
  useUnsavedChangesWarning,
  useSettingsExport,
  useMediaQuery,
  useIsMobile,
  usePrefersDarkMode,
  usePrefersReducedMotion,
} from './hooks/useSettings';

// Components
export { ThemeSwitcher } from './components/ThemeSwitcher';
export { LanguageSelector } from './components/LanguageSelector';
export {
  SettingsSection,
  SettingsRow,
  SettingsToggle,
  SettingsSelect,
  SettingsRadioGroup,
  SettingsInput,
} from './components/SettingsSection';
export { SettingsPage } from './components/SettingsPage';
