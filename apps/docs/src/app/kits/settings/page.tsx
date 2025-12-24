'use client';

import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import {
  Code,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Badge,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  List,
  ListItem,
} from '@hanui/react';

// 타입 정의 코드
const typeCode = `// 테마 타입
export type Theme = 'light' | 'dark' | 'system'

// 언어 타입
export type Language = 'ko' | 'en' | 'ja' | 'zh'

// 폰트 크기
export type FontSize = 'small' | 'medium' | 'large'

// 접근성 설정
export interface AccessibilitySettings {
  fontSize: FontSize
  highContrast: boolean
  reduceMotion: boolean
  screenReader: boolean
}

// 알림 설정
export interface NotificationPreferences {
  email: boolean
  push: boolean
  sms: boolean
  marketing: boolean
}

// 개인정보 설정
export interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends'
  activityStatus: boolean
  searchable: boolean
  dataCollection: boolean
}

// 프로필 정보
export interface ProfileInfo {
  displayName: string
  email: string
  phone?: string
  avatar?: string
  bio?: string
}

// 앱 설정
export interface AppSettings {
  theme: Theme
  language: Language
  accessibility: AccessibilitySettings
  notifications: NotificationPreferences
  privacy: PrivacySettings
}`;

// Store 코드
const storeCode = `import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useSettingsStore = create(
  persist(
    (set, get) => ({
      // 상태
      theme: 'system',
      language: 'ko',
      accessibility: { fontSize: 'medium', highContrast: false, reduceMotion: false },
      notifications: { email: true, push: true, sms: false, marketing: false },
      privacy: { profileVisibility: 'public', activityStatus: true, searchable: true },
      hasUnsavedChanges: false,

      // 테마
      setTheme: (theme) => {
        set({ theme, hasUnsavedChanges: true })
        applyTheme(theme)
      },

      toggleTheme: () => {
        const { theme } = get()
        const newTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
        get().setTheme(newTheme)
      },

      // 언어
      setLanguage: (language) => {
        set({ language, hasUnsavedChanges: true })
        document.documentElement.lang = language
      },

      // 접근성
      setFontSize: (fontSize) => {
        set((state) => ({
          accessibility: { ...state.accessibility, fontSize },
          hasUnsavedChanges: true,
        }))
        applyFontSize(fontSize)
      },

      toggleHighContrast: () => set((state) => {
        const newValue = !state.accessibility.highContrast
        document.documentElement.classList.toggle('high-contrast', newValue)
        return { accessibility: { ...state.accessibility, highContrast: newValue } }
      }),

      // 초기화
      resetToDefaults: () => set({ theme: 'system', language: 'ko', hasUnsavedChanges: false }),
    }),
    { name: 'app-settings', partialize: (state) => ({ theme: state.theme, language: state.language }) }
  )
)

function applyTheme(theme) {
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', isDark)
}

function applyFontSize(size) {
  const sizes = { small: '14px', medium: '16px', large: '18px' }
  document.documentElement.style.fontSize = sizes[size]
}`;

// Hooks 코드
const hooksCode = `import { useSettingsStore } from './stores/settingsStore'
import { useEffect } from 'react'

// 테마 훅
export function useTheme() {
  const { theme, setTheme, toggleTheme } = useSettingsStore()

  // 시스템 테마 변경 감지
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme === 'system') {
        document.documentElement.classList.toggle('dark', mediaQuery.matches)
      }
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const isDark = theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  return { theme, isDark, setTheme, toggleTheme }
}

// 언어 훅
export function useLanguage() {
  const { language, setLanguage } = useSettingsStore()

  const languageOptions = [
    { value: 'ko', label: 'Korean', nativeLabel: '한국어' },
    { value: 'en', label: 'English', nativeLabel: 'English' },
    { value: 'ja', label: 'Japanese', nativeLabel: '日本語' },
    { value: 'zh', label: 'Chinese', nativeLabel: '中文' },
  ]

  return { language, setLanguage, languageOptions }
}

// 접근성 훅
export function useAccessibility() {
  const { accessibility, setFontSize, toggleHighContrast, toggleReduceMotion } = useSettingsStore()
  return { ...accessibility, setFontSize, toggleHighContrast, toggleReduceMotion }
}

// 미디어 쿼리 훅
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)
    const handleChange = (e) => setMatches(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [query])

  return matches
}

export const useIsMobile = () => useMediaQuery('(max-width: 768px)')
export const usePrefersDarkMode = () => useMediaQuery('(prefers-color-scheme: dark)')
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')`;

// 사용 예시 코드
const usageCode = `'use client'

import {
  ThemeSwitcher,
  LanguageSelector,
  SettingsPage,
  SettingsSection,
  SettingsToggle,
  SettingsSelect,
  useTheme,
  useAccessibility,
  useNotificationPreferences,
} from '@/kits/settings'

function AppearanceSettings() {
  const { fontSize, setFontSize, highContrast, toggleHighContrast, reduceMotion, toggleReduceMotion } = useAccessibility()

  return (
    <SettingsSection title="외관" description="테마와 표시 설정을 관리합니다">
      <div className="p-4">
        <span className="text-sm font-medium">테마</span>
        <ThemeSwitcher variant="toggle" className="mt-2" />
      </div>

      <SettingsSelect
        label="글꼴 크기"
        value={fontSize}
        onChange={setFontSize}
        options={[
          { value: 'small', label: '작게' },
          { value: 'medium', label: '보통' },
          { value: 'large', label: '크게' },
        ]}
      />

      <SettingsToggle
        label="고대비 모드"
        description="시인성을 높이기 위해 대비를 강화합니다"
        checked={highContrast}
        onChange={toggleHighContrast}
      />

      <SettingsToggle
        label="동작 줄이기"
        description="애니메이션과 전환 효과를 줄입니다"
        checked={reduceMotion}
        onChange={toggleReduceMotion}
      />
    </SettingsSection>
  )
}

function NotificationSettings() {
  const { email, push, marketing, toggleNotification } = useNotificationPreferences()

  return (
    <SettingsSection title="알림" description="알림 수신 설정을 관리합니다">
      <SettingsToggle
        label="이메일 알림"
        checked={email}
        onChange={() => toggleNotification('email')}
      />
      <SettingsToggle
        label="푸시 알림"
        checked={push}
        onChange={() => toggleNotification('push')}
      />
      <SettingsToggle
        label="마케팅 알림"
        description="프로모션 및 이벤트 정보를 받습니다"
        checked={marketing}
        onChange={() => toggleNotification('marketing')}
      />
    </SettingsSection>
  )
}

export default function SettingsPageExample() {
  return (
    <SettingsPage
      title="설정"
      description="앱 설정을 관리합니다"
      onSave={async () => {
        // 서버에 설정 저장
        await saveSettings()
      }}
    >
      <AppearanceSettings />
      <NotificationSettings />
    </SettingsPage>
  )
}`;

export default function SettingsKitPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Settings Kit"
        description="설정 기능 키트. 테마, 언어, 접근성, 알림 설정, 프로필 관리를 포함합니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview">
          {/* 기술 스택 */}
          <Section level="h2">
            <Heading level="h2" id="tech-stack" title="기술 스택" />
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="outline-gray">Zustand</Badge>
              <Badge variant="outline-gray">LocalStorage (persist)</Badge>
              <Badge variant="outline-gray">TypeScript</Badge>
            </div>
          </Section>

          {/* 기능 */}
          <Section level="h2">
            <Heading level="h2" id="features" title="기능" />
            <List className="mt-4">
              <ListItem>테마 스위처 (라이트/다크/시스템)</ListItem>
              <ListItem>언어 선택기 (한국어, 영어, 일본어, 중국어)</ListItem>
              <ListItem>접근성 설정 (폰트 크기, 고대비, 모션 감소)</ListItem>
              <ListItem>알림 설정 (이메일, 푸시, SMS, 마케팅)</ListItem>
              <ListItem>개인정보 설정 (프로필 공개, 활동 상태)</ListItem>
              <ListItem>설정 내보내기/가져오기 (JSON)</ListItem>
              <ListItem>미저장 변경사항 경고</ListItem>
              <ListItem>설정 초기화</ListItem>
            </List>
          </Section>

          {/* 파일 구조 */}
          <Section level="h2">
            <Heading level="h2" id="file-structure" title="파일 구조" />
            <Code variant="block" language="bash">
              {`src/kits/settings/
├── types/
│   └── settings.ts          # 타입 정의
├── hooks/
│   └── useSettings.ts       # 커스텀 훅
├── stores/
│   └── settingsStore.ts     # Zustand 스토어
├── components/
│   ├── ThemeSwitcher.tsx    # 테마 스위처
│   ├── LanguageSelector.tsx # 언어 선택기
│   ├── SettingsSection.tsx  # 설정 섹션/토글/셀렉트
│   └── SettingsPage.tsx     # 설정 페이지 레이아웃
└── index.ts                 # Entry point`}
            </Code>
          </Section>

          {/* 설치 */}
          <Section level="h2">
            <Heading level="h2" id="installation" title="설치" />

            <Subsection level="h3">
              <Heading level="h3" title="1. 의존성 설치" />
              <Code variant="block" language="bash">
                {`npm install zustand lucide-react`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="2. 코드 복사" />
              <p className="text-krds-gray-70">
                아래 코드 탭에서 필요한 파일들을 복사합니다.
              </p>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="3. 다크모드 CSS 추가" />
              <Code variant="block" language="css">
                {`/* globals.css */
.dark {
  --krds-gray-90: #ffffff;
  --krds-gray-70: #a0a0a0;
  /* ... 다크모드 변수들 */
}

.high-contrast {
  /* 고대비 스타일 */
}

.reduce-motion * {
  animation: none !important;
  transition: none !important;
}`}
              </Code>
            </Subsection>
          </Section>

          {/* 코드 */}
          <Section level="h2">
            <Heading level="h2" id="code" title="코드" />
            <Tabs defaultValue="types">
              <TabsList>
                <TabsTrigger value="types">types.ts</TabsTrigger>
                <TabsTrigger value="store">store.ts</TabsTrigger>
                <TabsTrigger value="hooks">hooks.ts</TabsTrigger>
              </TabsList>

              <TabsContent value="types">
                <Code variant="block" language="typescript">
                  {typeCode}
                </Code>
              </TabsContent>
              <TabsContent value="store">
                <Code variant="block" language="typescript">
                  {storeCode}
                </Code>
              </TabsContent>
              <TabsContent value="hooks">
                <Code variant="block" language="typescript">
                  {hooksCode}
                </Code>
              </TabsContent>
            </Tabs>
          </Section>

          {/* 사용 예시 */}
          <Section level="h2">
            <Heading level="h2" id="usage" title="사용 예시" />
            <Code variant="block" language="tsx">
              {usageCode}
            </Code>
          </Section>

          {/* 접근성 */}
          <Section level="h2">
            <Heading level="h2" id="accessibility" title="접근성" />
            <List className="mt-4">
              <ListItem>
                테마 스위처에 <Code>aria-pressed</Code>로 현재 상태 표시
              </ListItem>
              <ListItem>
                시스템 테마 선호도 자동 감지 (<Code>prefers-color-scheme</Code>)
              </ListItem>
              <ListItem>
                모션 감소 선호도 지원 (<Code>prefers-reduced-motion</Code>)
              </ListItem>
              <ListItem>폰트 크기 조절로 가독성 향상</ListItem>
              <ListItem>고대비 모드로 시인성 향상</ListItem>
              <ListItem>설정 변경 시 즉시 적용으로 피드백 제공</ListItem>
            </List>
          </Section>
        </TabsContent>

        {/* API 레퍼런스 탭 */}
        <TabsContent value="api">
          {/* Hooks */}
          <Section level="h2">
            <Heading level="h2" id="hooks" title="Hooks" />
            <Table small className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead>Hook</TableHead>
                  <TableHead>반환값</TableHead>
                  <TableHead>설명</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Code>useTheme</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">
                      theme, isDark, setTheme, toggleTheme
                    </Code>
                  </TableCell>
                  <TableCell>테마 관리</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>useLanguage</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">
                      language, setLanguage, languageOptions
                    </Code>
                  </TableCell>
                  <TableCell>언어 관리</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>useAccessibility</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">
                      fontSize, highContrast, reduceMotion, ...
                    </Code>
                  </TableCell>
                  <TableCell>접근성 설정</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>useNotificationPreferences</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">
                      email, push, sms, toggleNotification
                    </Code>
                  </TableCell>
                  <TableCell>알림 설정</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>usePrivacySettings</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">
                      profileVisibility, setPrivacy
                    </Code>
                  </TableCell>
                  <TableCell>개인정보 설정</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>useSettingsExport</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">
                      downloadSettings, uploadSettings, resetToDefaults
                    </Code>
                  </TableCell>
                  <TableCell>설정 내보내기/가져오기</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>useMediaQuery</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">boolean</Code>
                  </TableCell>
                  <TableCell>미디어 쿼리 감지</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>useIsMobile</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">boolean</Code>
                  </TableCell>
                  <TableCell>모바일 디바이스 감지</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Section>

          {/* 컴포넌트 Props */}
          <Section level="h2">
            <Heading level="h2" id="components" title="컴포넌트 Props" />

            <Subsection level="h3">
              <Heading level="h3" title="ThemeSwitcher" />
              <Table small className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>variant</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'icon' | 'toggle' | 'select'
                      </Code>
                    </TableCell>
                    <TableCell>'icon'</TableCell>
                    <TableCell>표시 스타일</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>showLabel</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>라벨 표시 여부</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="LanguageSelector" />
              <Table small className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>variant</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'dropdown' | 'list' | 'compact'
                      </Code>
                    </TableCell>
                    <TableCell>'dropdown'</TableCell>
                    <TableCell>표시 스타일</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>showIcon</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>true</TableCell>
                    <TableCell>아이콘 표시</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>showNativeLabel</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>true</TableCell>
                    <TableCell>현지어 라벨 표시</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="SettingsToggle" />
              <Table small className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>label</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>설정 라벨</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>description</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string?</Code>
                    </TableCell>
                    <TableCell>설명 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>checked</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>토글 상태</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>onChange</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">(checked) =&gt; void</Code>
                    </TableCell>
                    <TableCell>변경 콜백</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="SettingsPage" />
              <Table small className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>title</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>'설정'</TableCell>
                    <TableCell>페이지 제목</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>showNavigation</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>true</TableCell>
                    <TableCell>사이드 네비게이션 표시</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>sections</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">SettingsSection[]</Code>
                    </TableCell>
                    <TableCell>기본 섹션</TableCell>
                    <TableCell>네비게이션 섹션</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>onSave</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">() =&gt; Promise</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>저장 콜백</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>

          {/* 타입 정의 */}
          <Section level="h2">
            <Heading level="h2" id="types" title="타입 정의" />
            <Code variant="block" language="typescript">
              {typeCode}
            </Code>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Notification Kit', href: '/kits/notification' }}
        next={{ title: 'Kits', href: '/kits' }}
      />
    </>
  );
}
