// Settings Kit - LanguageSelector Component
// 언어 선택 컴포넌트

'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@hanui/react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../hooks/useSettings';
import type { Language } from '../types/settings';

interface LanguageSelectorProps {
  variant?: 'dropdown' | 'list' | 'compact';
  showIcon?: boolean;
  showNativeLabel?: boolean;
  className?: string;
}

export function LanguageSelector({
  variant = 'dropdown',
  showIcon = true,
  showNativeLabel = true,
  className,
}: LanguageSelectorProps) {
  const { language, setLanguage, languageOptions, currentLanguageLabel } =
    useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'list') {
    return (
      <div className={`space-y-2 ${className}`}>
        {languageOptions.map((option) => {
          const isActive = language === option.value;
          return (
            <button
              key={option.value}
              onClick={() => setLanguage(option.value)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-colors ${
                isActive
                  ? 'border-krds-primary-base bg-krds-primary-5'
                  : 'border-krds-gray-20 hover:border-krds-gray-40'
              }`}
              aria-pressed={isActive}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{getFlagEmoji(option.value)}</span>
                <div className="text-left">
                  <p
                    className={`font-medium ${
                      isActive ? 'text-krds-primary-base' : 'text-krds-gray-90'
                    }`}
                  >
                    {option.nativeLabel}
                  </p>
                  <p className="text-sm text-krds-gray-50">{option.label}</p>
                </div>
              </div>
              {isActive && <Check className="w-5 h-5 text-krds-primary-base" />}
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex gap-1 ${className}`}>
        {languageOptions.map((option) => {
          const isActive = language === option.value;
          return (
            <Button
              key={option.value}
              variant={isActive ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setLanguage(option.value)}
              aria-pressed={isActive}
            >
              {option.value.toUpperCase()}
            </Button>
          );
        })}
      </div>
    );
  }

  // Dropdown variant
  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {showIcon && <Globe className="w-4 h-4" />}
        <span>
          {showNativeLabel ? currentLanguageLabel : language.toUpperCase()}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </Button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute z-50 w-48 mt-1 py-1 bg-white border border-krds-gray-20 rounded-lg shadow-lg"
          aria-label="언어 선택"
        >
          {languageOptions.map((option) => {
            const isActive = language === option.value;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  setLanguage(option.value);
                  setIsOpen(false);
                }}
                className={`flex items-center justify-between px-4 py-2 cursor-pointer ${
                  isActive
                    ? 'bg-krds-primary-5 text-krds-primary-base'
                    : 'hover:bg-krds-gray-5'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{getFlagEmoji(option.value)}</span>
                  <span>{option.nativeLabel}</span>
                </div>
                {isActive && <Check className="w-4 h-4" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// 언어 코드에서 국기 이모지 가져오기
function getFlagEmoji(langCode: Language): string {
  const flags: Record<Language, string> = {
    ko: '🇰🇷',
    en: '🇺🇸',
    ja: '🇯🇵',
    zh: '🇨🇳',
  };
  return flags[langCode] ?? '🌐';
}
