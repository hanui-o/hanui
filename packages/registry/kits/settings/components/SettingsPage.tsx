// Settings Kit - SettingsPage Component
// 설정 페이지 레이아웃 컴포넌트

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@hanui/react';
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Accessibility,
  Download,
  Upload,
  RotateCcw,
  Save,
  ChevronRight,
} from 'lucide-react';
import { useSettingsStore } from '../stores/settingsStore';
import {
  useUnsavedChangesWarning,
  useSettingsExport,
} from '../hooks/useSettings';
import type { SettingsSection } from '../types/settings';

interface SettingsPageProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showNavigation?: boolean;
  sections?: SettingsSection[];
  activeSection?: string;
  onSectionChange?: (sectionId: string) => void;
  onSave?: () => Promise<void>;
  className?: string;
}

const defaultSections: SettingsSection[] = [
  { id: 'profile', title: '프로필', icon: User },
  { id: 'notifications', title: '알림', icon: Bell },
  { id: 'privacy', title: '개인정보', icon: Shield },
  { id: 'appearance', title: '테마', icon: Palette },
  { id: 'language', title: '언어', icon: Globe },
  { id: 'accessibility', title: '접근성', icon: Accessibility },
];

export function SettingsPage({
  children,
  title = '설정',
  description,
  showNavigation = true,
  sections = defaultSections,
  activeSection,
  onSectionChange,
  onSave,
  className,
}: SettingsPageProps) {
  const { isSaving, hasUnsavedChanges, setHasUnsavedChanges, setSaving } =
    useSettingsStore();
  const { confirmNavigation } = useUnsavedChangesWarning();
  const { downloadSettings, uploadSettings, resetToDefaults } =
    useSettingsExport();

  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!onSave) return;

    setSaving(true);
    try {
      await onSave();
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('설정 저장 실패:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSectionClick = (sectionId: string) => {
    if (!confirmNavigation()) return;
    onSectionChange?.(sectionId);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await uploadSettings(file);
      setUploadError(null);
    } catch (error) {
      setUploadError((error as Error).message);
    }

    // Reset input
    e.target.value = '';
  };

  const handleReset = () => {
    if (window.confirm('모든 설정을 기본값으로 되돌리시겠습니까?')) {
      resetToDefaults();
    }
  };

  return (
    <div className={`min-h-screen bg-krds-gray-5 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-krds-gray-90">{title}</h1>
            {description && (
              <p className="text-krds-gray-60 mt-1">{description}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {hasUnsavedChanges && onSave && (
              <Button onClick={handleSave} disabled={isSaving}>
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? '저장 중...' : '저장'}
              </Button>
            )}
          </div>
        </div>

        <div className="flex gap-8">
          {/* 사이드 네비게이션 */}
          {showNavigation && (
            <aside className="w-64 flex-shrink-0">
              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => handleSectionClick(section.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-krds-primary-base text-white'
                          : 'text-krds-gray-70 hover:bg-white hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {Icon && <Icon className="w-5 h-5" />}
                        <span className="font-medium">{section.title}</span>
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  );
                })}
              </nav>

              {/* 하단 액션 */}
              <div className="mt-8 pt-8 border-t border-krds-gray-20 space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={downloadSettings}
                >
                  <Download className="w-4 h-4 mr-2" />
                  설정 내보내기
                </Button>

                <label className="block">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      설정 가져오기
                    </span>
                  </Button>
                </label>

                {uploadError && (
                  <p className="text-xs text-krds-danger-base px-4">
                    {uploadError}
                  </p>
                )}

                <Button
                  variant="ghost"
                  className="w-full justify-start text-krds-danger-base hover:text-krds-danger-base"
                  onClick={handleReset}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  기본값으로 복원
                </Button>
              </div>
            </aside>
          )}

          {/* 메인 콘텐츠 */}
          <main className="flex-1 space-y-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
