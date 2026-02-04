'use client';

import * as React from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/tabs';
import { cn } from '@/lib/utils';

/**
 * 설정 탭 아이템 타입
 */
export interface SettingsTabItem {
  /** 탭 고유 식별자 */
  value: string;
  /** 탭 레이블 */
  label: string;
  /** 탭 아이콘 (선택) */
  icon?: React.ReactNode;
  /** 탭 콘텐츠 */
  content: React.ReactNode;
  /** 비활성화 여부 */
  disabled?: boolean;
}

/**
 * 설정 탭 컴포넌트 Props
 */
export interface SettingsTabsProps {
  /** 탭 목록 */
  tabs: SettingsTabItem[];
  /** 초기 선택 탭 (비제어) */
  defaultValue?: string;
  /** 현재 선택 탭 (제어) */
  value?: string;
  /** 탭 변경 콜백 */
  onValueChange?: (value: string) => void;
  /** 탭 스타일 변형 */
  variant?: 'default' | 'pills';
  /** 탭 크기 */
  size?: 'sm' | 'default';
  /** 세로 방향 레이아웃 여부 */
  vertical?: boolean;
  /** 탭 목록 스크롤 가능 여부 */
  scrollable?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 탭 목록 추가 CSS 클래스 */
  tabsListClassName?: string;
  /** 탭 콘텐츠 추가 CSS 클래스 */
  tabsContentClassName?: string;
}

/**
 * SettingsTabs - 설정 탭 레이아웃 컴포넌트
 *
 * 기존 Tabs 컴포넌트를 재사용하여 설정 페이지용 탭 레이아웃을 제공합니다.
 *
 * 접근성:
 * - Tabs 컴포넌트의 접근성 기능을 그대로 상속
 * - Arrow 키 네비게이션
 * - 포커스 관리
 * - role="tablist", "tab", "tabpanel" 자동 적용
 *
 * @example
 * ```tsx
 * <SettingsTabs
 *   tabs={[
 *     {
 *       value: 'profile',
 *       label: '프로필',
 *       content: <ProfileSettings />,
 *     },
 *     {
 *       value: 'security',
 *       label: '보안',
 *       content: <SecuritySettings />,
 *     },
 *     {
 *       value: 'notifications',
 *       label: '알림',
 *       content: <NotificationPreferences />,
 *     },
 *   ]}
 *   defaultValue="profile"
 * />
 * ```
 */
export function SettingsTabs({
  tabs,
  defaultValue,
  value,
  onValueChange,
  variant = 'default',
  size = 'default',
  vertical = false,
  scrollable = false,
  className,
  tabsListClassName,
  tabsContentClassName,
}: SettingsTabsProps) {
  // 첫 번째 탭을 기본값으로 설정
  const initialValue = defaultValue || (tabs.length > 0 ? tabs[0].value : '');

  // 수직 레이아웃 렌더링
  if (vertical) {
    return (
      <Tabs
        defaultValue={value === undefined ? initialValue : undefined}
        value={value}
        onValueChange={onValueChange}
        variant={variant}
        size={size}
        className={cn('flex gap-8', className)}
      >
        {/* 세로 탭 목록 */}
        <div className="shrink-0 w-48">
          <nav aria-label="설정 메뉴">
            <TabsList
              className={cn(
                'flex-col h-auto items-stretch border-b-0 border-r border-krds-gray-20',
                tabsListClassName
              )}
              scrollable={scrollable}
            >
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  disabled={tab.disabled}
                  className={cn(
                    'justify-start border-b-0 border-r-2 -mr-px',
                    'data-[state=active]:border-r-krds-secondary-80',
                    'data-[state=inactive]:border-r-transparent'
                  )}
                >
                  {tab.icon && (
                    <span className="mr-2 shrink-0" aria-hidden="true">
                      {tab.icon}
                    </span>
                  )}
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </nav>
        </div>

        {/* 탭 콘텐츠 영역 */}
        <div className="flex-1 min-w-0">
          {tabs.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className={cn('pt-0', tabsContentClassName)}
            >
              {tab.content}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    );
  }

  // 기본 가로 레이아웃 렌더링
  return (
    <Tabs
      defaultValue={value === undefined ? initialValue : undefined}
      value={value}
      onValueChange={onValueChange}
      variant={variant}
      size={size}
      className={className}
    >
      <TabsList className={tabsListClassName} scrollable={scrollable}>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
          >
            {tab.icon && (
              <span className="mr-2 shrink-0" aria-hidden="true">
                {tab.icon}
              </span>
            )}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className={tabsContentClassName}
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}

SettingsTabs.displayName = 'SettingsTabs';

/**
 * useSettingsTabs - 설정 탭 상태 관리 훅
 *
 * URL 해시나 로컬 스토리지와 동기화된 탭 상태를 관리할 때 사용합니다.
 *
 * @example
 * ```tsx
 * const { activeTab, setActiveTab } = useSettingsTabs('profile', {
 *   syncWithHash: true,
 * });
 *
 * <SettingsTabs
 *   tabs={tabs}
 *   value={activeTab}
 *   onValueChange={setActiveTab}
 * />
 * ```
 */
export interface UseSettingsTabsOptions {
  /** URL 해시와 동기화 */
  syncWithHash?: boolean;
  /** 로컬 스토리지 키 (지정 시 상태 저장) */
  storageKey?: string;
}

export function useSettingsTabs(
  initialValue: string,
  options: UseSettingsTabsOptions = {}
) {
  const { syncWithHash = false, storageKey } = options;

  // 초기값 결정
  const getInitialValue = React.useCallback(() => {
    if (typeof window === 'undefined') return initialValue;

    if (syncWithHash && window.location.hash) {
      return window.location.hash.slice(1) || initialValue;
    }

    if (storageKey) {
      const stored = localStorage.getItem(storageKey);
      if (stored) return stored;
    }

    return initialValue;
  }, [initialValue, syncWithHash, storageKey]);

  const [activeTab, setActiveTabState] = React.useState(getInitialValue);

  // 탭 변경 핸들러
  const setActiveTab = React.useCallback(
    (value: string) => {
      setActiveTabState(value);

      if (syncWithHash) {
        window.history.replaceState(null, '', `#${value}`);
      }

      if (storageKey) {
        localStorage.setItem(storageKey, value);
      }
    },
    [syncWithHash, storageKey]
  );

  // URL 해시 변경 감지
  React.useEffect(() => {
    if (!syncWithHash) return;

    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setActiveTabState(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [syncWithHash]);

  return { activeTab, setActiveTab };
}
