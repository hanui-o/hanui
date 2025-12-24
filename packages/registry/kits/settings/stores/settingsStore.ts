// Settings Kit - Store
// Zustand 상태 관리

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
  Theme,
  Language,
  FontSize,
  AccessibilitySettings,
  NotificationPreferences,
  PrivacySettings,
  ProfileInfo,
  SettingsState,
} from '../types/settings';

interface SettingsActions {
  // 테마
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;

  // 언어
  setLanguage: (language: Language) => void;

  // 접근성
  setAccessibility: (settings: Partial<AccessibilitySettings>) => void;
  setFontSize: (size: FontSize) => void;
  toggleHighContrast: () => void;
  toggleReduceMotion: () => void;

  // 알림
  setNotifications: (settings: Partial<NotificationPreferences>) => void;
  toggleNotification: (key: keyof NotificationPreferences) => void;

  // 개인정보
  setPrivacy: (settings: Partial<PrivacySettings>) => void;

  // 프로필
  setProfile: (profile: ProfileInfo | null) => void;
  updateProfile: (updates: Partial<ProfileInfo>) => void;

  // 상태
  setLoading: (loading: boolean) => void;
  setSaving: (saving: boolean) => void;
  setError: (error: string | null) => void;
  setHasUnsavedChanges: (hasChanges: boolean) => void;

  // 전체 설정
  resetToDefaults: () => void;
  importSettings: (settings: Partial<SettingsState>) => void;
  exportSettings: () => Partial<SettingsState>;
}

type SettingsStore = SettingsState & SettingsActions;

const defaultAccessibility: AccessibilitySettings = {
  fontSize: 'medium',
  highContrast: false,
  reduceMotion: false,
  screenReader: false,
};

const defaultNotifications: NotificationPreferences = {
  email: true,
  push: true,
  sms: false,
  marketing: false,
};

const defaultPrivacy: PrivacySettings = {
  profileVisibility: 'public',
  activityStatus: true,
  searchable: true,
  dataCollection: true,
};

const initialState: SettingsState = {
  theme: 'system',
  language: 'ko',
  accessibility: defaultAccessibility,
  notifications: defaultNotifications,
  privacy: defaultPrivacy,
  profile: null,
  isLoading: false,
  isSaving: false,
  error: null,
  hasUnsavedChanges: false,
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // 테마
      setTheme: (theme) => {
        set({ theme, hasUnsavedChanges: true });
        applyTheme(theme);
      },

      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme: Theme =
          currentTheme === 'light'
            ? 'dark'
            : currentTheme === 'dark'
              ? 'system'
              : 'light';
        get().setTheme(newTheme);
      },

      // 언어
      setLanguage: (language) => {
        set({ language, hasUnsavedChanges: true });
        // 언어 변경 시 html lang 속성 업데이트
        if (typeof document !== 'undefined') {
          document.documentElement.lang = language;
        }
      },

      // 접근성
      setAccessibility: (settings) =>
        set((state) => ({
          accessibility: { ...state.accessibility, ...settings },
          hasUnsavedChanges: true,
        })),

      setFontSize: (fontSize) => {
        set((state) => ({
          accessibility: { ...state.accessibility, fontSize },
          hasUnsavedChanges: true,
        }));
        applyFontSize(fontSize);
      },

      toggleHighContrast: () =>
        set((state) => {
          const newValue = !state.accessibility.highContrast;
          applyHighContrast(newValue);
          return {
            accessibility: { ...state.accessibility, highContrast: newValue },
            hasUnsavedChanges: true,
          };
        }),

      toggleReduceMotion: () =>
        set((state) => {
          const newValue = !state.accessibility.reduceMotion;
          applyReduceMotion(newValue);
          return {
            accessibility: { ...state.accessibility, reduceMotion: newValue },
            hasUnsavedChanges: true,
          };
        }),

      // 알림
      setNotifications: (settings) =>
        set((state) => ({
          notifications: { ...state.notifications, ...settings },
          hasUnsavedChanges: true,
        })),

      toggleNotification: (key) =>
        set((state) => ({
          notifications: {
            ...state.notifications,
            [key]: !state.notifications[key],
          },
          hasUnsavedChanges: true,
        })),

      // 개인정보
      setPrivacy: (settings) =>
        set((state) => ({
          privacy: { ...state.privacy, ...settings },
          hasUnsavedChanges: true,
        })),

      // 프로필
      setProfile: (profile) => set({ profile }),

      updateProfile: (updates) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : null,
          hasUnsavedChanges: true,
        })),

      // 상태
      setLoading: (isLoading) => set({ isLoading }),
      setSaving: (isSaving) => set({ isSaving }),
      setError: (error) => set({ error }),
      setHasUnsavedChanges: (hasUnsavedChanges) => set({ hasUnsavedChanges }),

      // 전체 설정
      resetToDefaults: () => {
        set(initialState);
        applyTheme('system');
        applyFontSize('medium');
        applyHighContrast(false);
        applyReduceMotion(false);
      },

      importSettings: (settings) =>
        set({ ...settings, hasUnsavedChanges: false }),

      exportSettings: () => {
        const state = get();
        return {
          theme: state.theme,
          language: state.language,
          accessibility: state.accessibility,
          notifications: state.notifications,
          privacy: state.privacy,
        };
      },
    }),
    {
      name: 'app-settings',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        accessibility: state.accessibility,
        notifications: state.notifications,
        privacy: state.privacy,
      }),
      onRehydrateStorage: () => (state) => {
        // 설정 복원 시 적용
        if (state) {
          applyTheme(state.theme);
          applyFontSize(state.accessibility.fontSize);
          applyHighContrast(state.accessibility.highContrast);
          applyReduceMotion(state.accessibility.reduceMotion);
          if (typeof document !== 'undefined') {
            document.documentElement.lang = state.language;
          }
        }
      },
    }
  )
);

// 헬퍼 함수들
function applyTheme(theme: Theme) {
  if (typeof window === 'undefined') return;

  const root = document.documentElement;
  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  root.classList.toggle('dark', isDark);
}

function applyFontSize(size: FontSize) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const sizes = { small: '14px', medium: '16px', large: '18px' };
  root.style.fontSize = sizes[size];
}

function applyHighContrast(enabled: boolean) {
  if (typeof document === 'undefined') return;

  document.documentElement.classList.toggle('high-contrast', enabled);
}

function applyReduceMotion(enabled: boolean) {
  if (typeof document === 'undefined') return;

  document.documentElement.classList.toggle('reduce-motion', enabled);
}
