// Settings Kit - ThemeSwitcher Component
// 테마 스위처 컴포넌트

'use client';

import { Button } from '@hanui/react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../hooks/useSettings';
import type { Theme } from '../types/settings';

interface ThemeSwitcherProps {
  variant?: 'icon' | 'toggle' | 'select';
  showLabel?: boolean;
  className?: string;
}

const themeIcons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

const themeLabels = {
  light: '라이트',
  dark: '다크',
  system: '시스템',
};

export function ThemeSwitcher({
  variant = 'icon',
  showLabel = false,
  className,
}: ThemeSwitcherProps) {
  const { theme, setTheme, toggleTheme, isDark } = useTheme();

  if (variant === 'icon') {
    const Icon = isDark ? Moon : Sun;
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className={className}
        aria-label={`테마 변경 (현재: ${themeLabels[theme]})`}
      >
        <Icon className="w-5 h-5" />
      </Button>
    );
  }

  if (variant === 'toggle') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {showLabel && (
          <span className="text-sm text-krds-gray-70">
            {themeLabels[theme]}
          </span>
        )}
        <div className="flex items-center gap-1 p-1 bg-krds-gray-10 rounded-lg">
          {(['light', 'dark', 'system'] as Theme[]).map((t) => {
            const Icon = themeIcons[t];
            const isActive = theme === t;
            return (
              <Button
                key={t}
                variant={isActive ? 'primary' : 'ghost'}
                size="icon"
                onClick={() => setTheme(t)}
                className={`h-8 w-8 ${isActive ? '' : 'hover:bg-krds-gray-20'}`}
                aria-label={`${themeLabels[t]} 모드`}
                aria-pressed={isActive}
              >
                <Icon className="w-4 h-4" />
              </Button>
            );
          })}
        </div>
      </div>
    );
  }

  // Select variant
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {(['light', 'dark', 'system'] as Theme[]).map((t) => {
        const Icon = themeIcons[t];
        const isActive = theme === t;
        return (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors ${
              isActive
                ? 'border-krds-primary-base bg-krds-primary-5'
                : 'border-krds-gray-20 hover:border-krds-gray-40'
            }`}
            aria-pressed={isActive}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isActive
                  ? 'bg-krds-primary-base text-white'
                  : 'bg-krds-gray-10 text-krds-gray-60'
              }`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <span
              className={`text-sm font-medium ${
                isActive ? 'text-krds-primary-base' : 'text-krds-gray-70'
              }`}
            >
              {themeLabels[t]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
