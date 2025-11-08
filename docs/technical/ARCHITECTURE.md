# KRDS Platform - 기술 아키텍처

> **"확장 가능하고, 유지보수 쉬운, 모던한 아키텍처"**

---

## 📋 목차
1. [시스템 개요](#시스템-개요)
2. [전체 아키텍처](#전체-아키텍처)
3. [Phase별 기술 스택](#phase별-기술-스택)
4. [핵심 컴포넌트 설계](#핵심-컴포넌트-설계)
5. [인프라 및 배포](#인프라-및-배포)

---

## 1. 시스템 개요

### 1.1 아키텍처 원칙

```
① Monorepo 구조
   - 여러 패키지를 하나의 저장소에서 관리
   - 코드 공유 쉬움
   - 일관된 버전 관리

② 모듈화
   - 각 기능은 독립적 패키지
   - 필요한 것만 설치 가능
   - 의존성 최소화

③ TypeScript First
   - 모든 코드 TypeScript
   - 타입 안정성 보장
   - 개발자 경험(DX) 향상

④ 접근성 우선
   - 모든 컴포넌트 WCAG 2.1 AA 준수
   - Headless UI 패턴 활용
   - 자동 테스트

⑤ 성능 최적화
   - Tree-shaking 지원
   - 번들 사이즈 최소화 (< 100KB)
   - Code Splitting
   - SSR 지원

⑥ 개발자 경험
   - 직관적 API
   - 풍부한 문서
   - Live Playground
   - 빠른 피드백
```

### 1.2 기술 선택 기준

| 항목 | 선택 | 이유 |
|------|------|------|
| **모노레포** | Turborepo | 빠른 빌드, 간단한 설정 |
| **번들러** | Vite | 빠른 HMR, ESM 네이티브 |
| **패키지 매니저** | pnpm | 디스크 효율, workspace 지원 |
| **컴포넌트 베이스** | Headless UI | 접근성 기본 탑재 |
| **스타일** | Tailwind CSS | 커스터마이징 쉬움, KRDS 토큰 매핑 |
| **문서** | Next.js 14 | SSR, MDX, SEO |
| **테스트** | Vitest + Playwright | 빠름, 모던 |
| **CI/CD** | GitHub Actions | 무료, 통합 쉬움 |

---

## 2. 전체 아키텍처

### 2.1 System Diagram

```
┌─────────────────────────────────────────────────────────┐
│                  KRDS Platform Ecosystem                │
└─────────────────────────────────────────────────────────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
         ▼                 ▼                 ▼

┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│   CLI Tool   │   │  Component   │   │  VS Code     │
│              │   │  Libraries   │   │  Extension   │
├──────────────┤   ├──────────────┤   ├──────────────┤
│ create-krds  │   │ @krds/react  │   │ KRDS         │
│ -app         │   │ @krds/vue    │   │ Validator    │
│              │   │ @krds/icons  │   │              │
└──────┬───────┘   └──────┬───────┘   └──────┬───────┘
       │                  │                  │
       │                  │                  │
       └──────────────────┼──────────────────┘
                          │
                          ▼
              ┌──────────────────────┐
              │   Documentation      │
              │   Website            │
              ├──────────────────────┤
              │   - Docs             │
              │   - Playground       │
              │   - Templates        │
              └──────┬───────────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │   KRDS Marketplace    │
         ├───────────────────────┤
         │   - Templates         │
         │   - Components        │
         │   - Themes            │
         └───────┬───────────────┘
                 │
                 ▼
       ┌─────────────────────┐
       │   AI Generator      │
       ├─────────────────────┤
       │   - GPT-4 API       │
       │   - Code Generation │
       │   - Figma Converter │
       └─────────────────────┘
```

### 2.2 Monorepo 구조

```
krds-platform/
├── packages/                # 공개 패키지
│   ├── cli/                # @krds/cli
│   │   ├── src/
│   │   │   ├── commands/
│   │   │   │   ├── create.ts
│   │   │   │   ├── check.ts
│   │   │   │   └── update.ts
│   │   │   ├── templates/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── react/              # @krds/react
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Button/
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Button.test.tsx
│   │   │   │   │   ├── Button.stories.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Input/
│   │   │   │   ├── Select/
│   │   │   │   └── ...
│   │   │   ├── theme/
│   │   │   │   ├── tokens.ts
│   │   │   │   ├── provider.tsx
│   │   │   │   └── useTheme.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useColorMode.ts
│   │   │   │   ├── useBreakpoint.ts
│   │   │   │   └── ...
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── icons/              # @krds/icons
│   │   ├── src/
│   │   │   ├── Icon.tsx
│   │   │   ├── icons/
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── utils/              # @krds/utils
│   │   ├── src/
│   │   │   ├── a11y/
│   │   │   ├── validation/
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── templates/          # @krds/templates
│       ├── react-basic/
│       ├── nextjs-app/
│       └── vue-basic/
│
├── apps/                   # 애플리케이션
│   ├── docs/              # 문서 사이트
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── docs/
│   │   │   ├── components/
│   │   │   └── templates/
│   │   ├── components/
│   │   ├── content/       # MDX 문서
│   │   └── package.json
│   │
│   ├── marketplace/       # 마켓플레이스 (Phase 3)
│   │   ├── app/
│   │   ├── components/
│   │   └── package.json
│   │
│   └── ai-generator/      # AI 생성기 (Phase 4)
│       ├── app/
│       ├── lib/
│       └── package.json
│
├── tooling/               # 내부 도구
│   ├── vscode-extension/  # VSCode Extension
│   ├── eslint-config/     # 공유 ESLint 설정
│   └── tsconfig/          # 공유 TS 설정
│
├── examples/              # 예제 프로젝트
│   ├── react-basic/
│   ├── nextjs-dashboard/
│   └── vue-admin/
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── publish.yml
│       └── deploy.yml
│
├── package.json           # 루트 package.json
├── pnpm-workspace.yaml
├── turbo.json            # Turborepo 설정
└── README.md
```

---

## 3. Phase별 기술 스택

### Phase 1: Starter Kit (1-2개월)

#### 핵심 기술 스택
```typescript
// packages/react/package.json
{
  "name": "@krds/react",
  "version": "0.1.0",
  "dependencies": {
    "react": "^18.2.0",
    "@headlessui/react": "^1.7.0",  // 접근성
    "clsx": "^2.0.0",                // className 관리
    "tailwind-merge": "^2.0.0"       // Tailwind 충돌 방지
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "vite": "^5.0.0",
    "vitest": "^1.0.0",
    "@types/react": "^18.2.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

#### 빌드 설정
```typescript
// packages/react/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'KRDSReact',
      fileName: (format) => `krds-react.${format}.js`,
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true
      }
    }
  }
})
```

#### Tailwind 설정
```javascript
// packages/react/tailwind.config.js
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // KRDS 디자인 토큰 매핑
        primary: {
          50: '#E6F0FF',
          100: '#CCE0FF',
          // ...
          900: '#001A3D'
        },
        // ...
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif']
      },
      // KRDS 가이드에 맞는 spacing, fontSize 등
    }
  },
  plugins: []
}
```

### Phase 2: 접근성 도구 (3-4개월)

#### VSCode Extension 기술 스택
```json
// tooling/vscode-extension/package.json
{
  "name": "krds-validator",
  "displayName": "KRDS Validator",
  "engines": {
    "vscode": "^1.85.0"
  },
  "dependencies": {
    "axe-core": "^4.8.0",          // 접근성 검사
    "@typescript-eslint/parser": "^6.0.0",
    "typescript": "^5.0.0"
  },
  "activationEvents": [
    "onLanguage:typescript",
    "onLanguage:typescriptreact"
  ]
}
```

#### 린트 규칙
```typescript
// tooling/eslint-config/index.js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended'  // 접근성 린트
  ],
  rules: {
    // KRDS 커스텀 규칙
    'krds/button-aria-label': 'error',
    'krds/color-contrast': 'warn',
    'krds/keyboard-accessible': 'error'
  }
}
```

### Phase 3: Marketplace (5-8개월)

#### 백엔드 기술 스택
```typescript
// apps/marketplace/package.json
{
  "dependencies": {
    "next": "^14.0.0",
    "@prisma/client": "^5.0.0",     // ORM
    "next-auth": "^4.24.0",         // 인증
    "stripe": "^14.0.0",            // 결제
    "uploadthing": "^6.0.0",        // 파일 업로드
    "react-query": "^3.39.0"        // 데이터 페칭
  }
}
```

#### 데이터베이스 스키마
```prisma
// apps/marketplace/prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  createdAt     DateTime  @default(now())
  templates     Template[]
  purchases     Purchase[]
}

model Template {
  id            String    @id @default(cuid())
  title         String
  description   String
  price         Int       // 원화 (0 = 무료)
  category      Category
  tags          String[]
  previewUrl    String
  downloadUrl   String
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  verified      Boolean   @default(false)
  a11yScore     Int?      // 접근성 점수
  downloads     Int       @default(0)
  rating        Float?
  createdAt     DateTime  @default(now())
  purchases     Purchase[]
}

enum Category {
  COMPONENT
  TEMPLATE
  PLUGIN
  THEME
}

model Purchase {
  id            String    @id @default(cuid())
  userId        String
  templateId    String
  amount        Int
  createdAt     DateTime  @default(now())
  user          User      @relation(fields: [userId], references: [id])
  template      Template  @relation(fields: [templateId], references: [id])
}
```

### Phase 4: AI Generator (9-12개월)

#### AI 기술 스택
```typescript
// apps/ai-generator/package.json
{
  "dependencies": {
    "openai": "^4.0.0",             // GPT-4 API
    "langchain": "^0.1.0",          // LLM 체인
    "@supabase/supabase-js": "^2.0.0", // 벡터 DB
    "html-to-image": "^1.11.0",     // 스크린샷
    "figma-api": "^1.11.0"          // Figma 연동
  }
}
```

#### 프롬프트 엔지니어링
```typescript
// apps/ai-generator/lib/prompts.ts
export const SYSTEM_PROMPT = `
당신은 KRDS(대한민국 정부 표준 디자인 시스템) 전문가입니다.
사용자의 요청을 KRDS 가이드를 100% 준수하는 React + TypeScript 코드로 변환합니다.

필수 규칙:
1. 모든 컴포넌트는 @krds/react 라이브러리 사용
2. 접근성 필수 (aria-label, role, tabIndex 등)
3. 반응형 디자인 (Tailwind 사용)
4. 다크모드 지원 (useColorMode 훅)
5. TypeScript 타입 완벽
6. 주석은 한국어로 작성

출력 형식:
\`\`\`tsx
// 파일명과 코드
\`\`\`
`

export const generateComponentPrompt = (userInput: string) => {
  return `
${SYSTEM_PROMPT}

사용자 요청:
"${userInput}"

위 요청에 맞는 KRDS 준수 React 컴포넌트를 생성해주세요.
`
}
```

---

## 4. 핵심 컴포넌트 설계

### 4.1 컴포넌트 API 디자인

#### Button 컴포넌트 예시
```typescript
// packages/react/src/components/Button/Button.tsx
import { forwardRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼 변형
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'

  /**
   * 버튼 크기
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'

  /**
   * 전체 너비 사용 여부
   * @default false
   */
  fullWidth?: boolean

  /**
   * 로딩 상태
   * @default false
   */
  loading?: boolean

  /**
   * 좌측 아이콘
   */
  leftIcon?: React.ReactNode

  /**
   * 우측 아이콘
   */
  rightIcon?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50'

    const variantStyles = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:outline-primary-600',
      secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus-visible:outline-secondary-600',
      outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 focus-visible:outline-primary-600',
      ghost: 'bg-transparent hover:bg-gray-100 focus-visible:outline-primary-600'
    }

    const sizeStyles = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-6 text-lg'
    }

    const classes = twMerge(
      clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className
      )
    )

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Spinner className="mr-2 h-4 w-4" />}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'
```

### 4.2 테마 시스템

```typescript
// packages/react/src/theme/provider.tsx
import { createContext, useContext, useState, useEffect } from 'react'

type ColorMode = 'light' | 'dark'

interface ThemeContextType {
  colorMode: ColorMode
  toggleColorMode: () => void
  setColorMode: (mode: ColorMode) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorMode, setColorMode] = useState<ColorMode>('light')

  useEffect(() => {
    // localStorage에서 저장된 테마 불러오기
    const saved = localStorage.getItem('krds-color-mode') as ColorMode
    if (saved) {
      setColorMode(saved)
    }
  }, [])

  useEffect(() => {
    // HTML 클래스 업데이트
    document.documentElement.classList.toggle('dark', colorMode === 'dark')
    localStorage.setItem('krds-color-mode', colorMode)
  }, [colorMode])

  const toggleColorMode = () => {
    setColorMode(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ colorMode, toggleColorMode, setColorMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useColorMode() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useColorMode must be used within ThemeProvider')
  }
  return context
}
```

### 4.3 접근성 유틸리티

```typescript
// packages/utils/src/a11y/announcer.ts
/**
 * 스크린리더 전용 알림
 * 시각적으로는 보이지 않지만 스크린리더가 읽음
 */
export function announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcer = document.getElementById('krds-announcer')
  if (!announcer) {
    const el = document.createElement('div')
    el.id = 'krds-announcer'
    el.setAttribute('role', 'status')
    el.setAttribute('aria-live', priority)
    el.setAttribute('aria-atomic', 'true')
    el.className = 'sr-only'  // Tailwind의 screen-reader-only
    document.body.appendChild(el)

    setTimeout(() => {
      el.textContent = message
    }, 100)
  } else {
    announcer.textContent = ''
    setTimeout(() => {
      announcer.textContent = message
    }, 100)
  }
}

// 사용 예시
// 버튼 클릭 시 스크린리더에게 알림
onClick={() => {
  announce('파일이 업로드되었습니다')
}}
```

---

## 5. 인프라 및 배포

### 5.1 호스팅 전략

```
패키지:
└─ NPM Registry (공개)
   - @krds/react
   - @krds/vue
   - @krds/icons
   - @krds/cli

문서 사이트:
└─ Vercel (무료 → Pro)
   - krds.dev
   - 자동 배포 (main 브랜치)
   - Preview 배포 (PR마다)

Marketplace:
└─ Vercel (Pro)
   - krds.market
   - PostgreSQL (Supabase)
   - 파일 스토리지 (Uploadthing)

AI Generator:
└─ Vercel (Pro)
   - ai.krds.dev
   - Edge Functions
   - OpenAI API
```

### 5.2 CI/CD 파이프라인

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'

      - run: pnpm install
      - run: pnpm lint
      - run: pnpm typecheck

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'

      - run: pnpm install
      - run: pnpm test
      - run: pnpm test:e2e

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'

      - run: pnpm install
      - run: pnpm build

      # 번들 사이즈 체크
      - name: Check bundle size
        run: |
          SIZE=$(stat -f%z packages/react/dist/krds-react.es.js)
          if [ $SIZE -gt 102400 ]; then
            echo "Bundle too large: $SIZE bytes (max: 100KB)"
            exit 1
          fi
```

```yaml
# .github/workflows/publish.yml
name: Publish to NPM

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
          registry-url: 'https://registry.npmjs.org'

      - run: pnpm install
      - run: pnpm build
      - run: pnpm publish -r --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### 5.3 모니터링

```typescript
// apps/docs/lib/analytics.ts
import { Analytics } from '@vercel/analytics'
import { SpeedInsights } from '@vercel/speed-insights'

// 성능 모니터링
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Analytics />
      <SpeedInsights />
    </>
  )
}
```

---

**다음 문서**: [개발 로드맵](../planning/ROADMAP.md)
