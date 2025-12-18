// Settings Kit - Hooks
// 설정 관련 React hooks

import { useEffect, useCallback } from 'react';
import { useSettingsStore } from '../stores/settingsStore';
import type { Theme, Language, FontSize } from '../types/settings';

/**
 * 테마 관리 훅
 */
export function useTheme() {
  const { theme, setTheme, toggleTheme } = useSettingsStore();

  // 시스템 테마 변경 감지
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        document.documentElement.classList.toggle('dark', mediaQuery.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
  };
}

/**
 * 언어 관리 훅
 */
export function useLanguage() {
  const { language, setLanguage } = useSettingsStore();

  const languageOptions: {
    value: Language;
    label: string;
    nativeLabel: string;
  }[] = [
    { value: 'ko', label: 'Korean', nativeLabel: '한국어' },
    { value: 'en', label: 'English', nativeLabel: 'English' },
    { value: 'ja', label: 'Japanese', nativeLabel: '日本語' },
    { value: 'zh', label: 'Chinese', nativeLabel: '中文' },
  ];

  return {
    language,
    setLanguage,
    languageOptions,
    currentLanguageLabel:
      languageOptions.find((l) => l.value === language)?.nativeLabel ??
      language,
  };
}

/**
 * 접근성 설정 훅
 */
export function useAccessibility() {
  const {
    accessibility,
    setAccessibility,
    setFontSize,
    toggleHighContrast,
    toggleReduceMotion,
  } = useSettingsStore();

  const fontSizeOptions: { value: FontSize; label: string }[] = [
    { value: 'small', label: '작게' },
    { value: 'medium', label: '보통' },
    { value: 'large', label: '크게' },
  ];

  return {
    ...accessibility,
    setAccessibility,
    setFontSize,
    toggleHighContrast,
    toggleReduceMotion,
    fontSizeOptions,
  };
}

/**
 * 알림 설정 훅
 */
export function useNotificationPreferences() {
  const { notifications, setNotifications, toggleNotification } =
    useSettingsStore();

  return {
    ...notifications,
    setNotifications,
    toggleNotification,
  };
}

/**
 * 개인정보 설정 훅
 */
export function usePrivacySettings() {
  const { privacy, setPrivacy } = useSettingsStore();

  const visibilityOptions = [
    { value: 'public', label: '공개', description: '누구나 볼 수 있음' },
    { value: 'friends', label: '친구 공개', description: '친구만 볼 수 있음' },
    { value: 'private', label: '비공개', description: '나만 볼 수 있음' },
  ];

  return {
    ...privacy,
    setPrivacy,
    visibilityOptions,
  };
}

/**
 * 프로필 관리 훅
 */
export function useProfile() {
  const { profile, setProfile, updateProfile, isSaving, setError } =
    useSettingsStore();

  return {
    profile,
    setProfile,
    updateProfile,
    isSaving,
    setError,
  };
}

/**
 * 설정 저장 확인 훅 (페이지 이탈 방지)
 */
export function useUnsavedChangesWarning() {
  const { hasUnsavedChanges, setHasUnsavedChanges } = useSettingsStore();

  useEffect(() => {
    if (!hasUnsavedChanges) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const confirmNavigation = useCallback(() => {
    if (!hasUnsavedChanges) return true;
    return window.confirm(
      '저장하지 않은 변경 사항이 있습니다. 페이지를 나가시겠습니까?'
    );
  }, [hasUnsavedChanges]);

  return {
    hasUnsavedChanges,
    setHasUnsavedChanges,
    confirmNavigation,
  };
}

/**
 * 설정 내보내기/가져오기 훅
 */
export function useSettingsExport() {
  const { exportSettings, importSettings, resetToDefaults } =
    useSettingsStore();

  const downloadSettings = useCallback(() => {
    const settings = exportSettings();
    const blob = new Blob([JSON.stringify(settings, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'settings.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [exportSettings]);

  const uploadSettings = useCallback(
    (file: File) => {
      return new Promise<void>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const settings = JSON.parse(e.target?.result as string);
            importSettings(settings);
            resolve();
          } catch (error) {
            reject(new Error('설정 파일을 읽을 수 없습니다.'));
          }
        };
        reader.onerror = () => reject(new Error('파일 읽기 실패'));
        reader.readAsText(file);
      });
    },
    [importSettings]
  );

  return {
    downloadSettings,
    uploadSettings,
    resetToDefaults,
  };
}

/**
 * 미디어 쿼리 훅
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}

import { useState } from 'react';

/**
 * 모바일 디바이스 감지 훅
 */
export function useIsMobile() {
  return useMediaQuery('(max-width: 768px)');
}

/**
 * 다크모드 선호 감지 훅
 */
export function usePrefersDarkMode() {
  return useMediaQuery('(prefers-color-scheme: dark)');
}

/**
 * 모션 감소 선호 감지 훅
 */
export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
