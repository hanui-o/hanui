# HANUI 문서 사이트 디자인 가이드

> **Radix UI + shadcn/ui 스타일 적용**
> 작성일: 2025-01-08

---

## 🎯 디자인 레퍼런스

### 1순위: shadcn/ui

**URL**: https://ui.shadcn.com/

```
왜 shadcn/ui인가?
Radix UI + Tailwind CSS (HANUI와 동일 스택)
복사-붙여넣기 철학 (실용적)
심플하고 세련된 디자인
개발자 경험 최고
다크모드 완벽 지원
```

### 2순위: Radix UI

**URL**: https://www.radix-ui.com/

```
왜 Radix UI인가?
접근성 중심 문서화
API Reference 매우 상세
Props Table 구조 명확
Accessibility 섹션 별도
```

---

## 🏗️ 전체 사이트 구조

### Phase 1 (v0.1.0) 범위

```
hanui.dev/
├── / (메인 페이지)
├── /docs
│   ├── /getting-started
│   │   ├── /installation
│   │   ├── /theming
│   │   └── /accessibility
│   ├── /components
│   │   ├── /button
│   │   ├── /input
│   │   ├── /card
│   │   ├── /table
│   │   ├── /modal
│   │   ├── /pagination
│   │   ├── /breadcrumb
│   │   ├── /file-upload
│   │   └── /select
│   └── /templates
│       ├── /portal
│       ├── /admin
│       └── /monorepo
├── /examples (Phase 2)
└── /blog (Phase 2)
```

---

## 📐 레이아웃 구조

### shadcn/ui 스타일 레이아웃

```
┌─────────────────────────────────────────────────┐
│ Header (Fixed, Backdrop Blur)                   │
│ ┌────────┬──────────┬──────────┬───────────────┐│
│ │ Logo   │ Docs     │ Examples │ [Search] [🌙]││
│ └────────┴──────────┴──────────┴───────────────┘│
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────────────┬─────────────────┬───────────┐ │
│  │             │                 │           │ │
│  │  Sidebar    │    Content      │  On This  │ │
│  │  (240px)    │    (Max 800px)  │   Page    │ │
│  │             │                 │  (200px)  │ │
│  │  Navigation │  Article        │  Anchors  │ │
│  │             │                 │           │ │
│  │             │                 │           │ │
│  └─────────────┴─────────────────┴───────────┘ │
│                                                 │
└─────────────────────────────────────────────────┘
```

#### 핵심 특징

**1. Header (shadcn/ui 스타일)**

```tsx
- Fixed position (top-0)
- Backdrop blur (backdrop-blur-lg)
- Border bottom (border-b)
- 높이: 64px
- Z-index: 50
- 반투명 배경 (bg-background/95)
```

**2. Sidebar (Radix UI 스타일)**

```tsx
- Fixed position (left-0)
- Scroll 가능 (overflow-y-auto)
- 계층 구조 (Collapsible 섹션)
- Active 상태 강조 (border-l-2)
- Hover 효과 명확
```

**3. Content (shadcn/ui 스타일)**

```tsx
- Max-width: 800px
- Prose 스타일 (typography)
- 여백 넉넉 (py-10 px-8)
- Line height: 1.7
```

**4. On This Page (Radix UI 스타일)**

```tsx
- Sticky position (top-24)
- 현재 섹션 하이라이트
- Smooth scroll
- Text-sm (14px)
```

---

## 🎨 디자인 토큰 (Tailwind Config)

### shadcn/ui 스타일 컬러 시스템

```ts
// tailwind.config.ts (Docs 사이트용)
export default {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // shadcn/ui 스타일 컬러 (KRDS 기반)
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
```

### CSS Variables (globals.css)

```css
/* app/globals.css */

@layer base {
  :root {
    /* KRDS 기반 Light Theme */
    --background: 0 0% 100%; /* 흰색 */
    --foreground: 222.2 84% 4.9%; /* 진한 회색 */

    --muted: 210 40% 96.1%; /* 연한 회색 배경 */
    --muted-foreground: 215.4 16.3% 46.9%;

    --card: 0 0% 100%; /* 카드 배경 */
    --card-foreground: 222.2 84% 4.9%;

    --border: 214.3 31.8% 91.4%; /* 테두리 */
    --input: 214.3 31.8% 91.4%;

    --primary: 214 100% 40%; /* KRDS Primary (#0066CC) */
    --primary-foreground: 0 0% 100%;

    --secondary: 174 100% 33%; /* KRDS Secondary (#00A896) */
    --secondary-foreground: 0 0% 100%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --ring: 214 100% 40%;

    --radius: 0.5rem; /* 8px */
  }

  .dark {
    /* KRDS 기반 Dark Theme */
    --background: 222.2 84% 4.9%; /* 진한 배경 */
    --foreground: 210 40% 98%; /* 연한 텍스트 */

    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;

    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;

    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;

    --primary: 214 100% 50%; /* 밝은 Primary */
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 174 100% 40%; /* 밝은 Secondary */
    --secondary-foreground: 222.2 47.4% 11.2%;

    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;

    --ring: 214 100% 50%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings:
      'rlig' 1,
      'calt' 1;
  }
}
```

---

## 📄 페이지별 상세 디자인

### 1. 메인 페이지 (/)

#### shadcn/ui 스타일 Hero Section

```tsx
// app/page.tsx

export default function HomePage() {
  return (
    <div className="container relative">
      {/* Hero Section */}
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
        {/* Badge (shadcn/ui 스타일) */}
        <a
          href="/docs"
          className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
        >
          🎉 <Separator className="mx-2 h-4" orientation="vertical" />{' '}
          <span className="sm:hidden">v0.1.0 출시</span>
          <span className="hidden sm:inline">
            v0.1.0이 출시되었습니다. 지금 바로 사용해보세요.
          </span>
          <ArrowRight className="ml-1 h-4 w-4" />
        </a>

        {/* Main Heading */}
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          공공 웹사이트, <br className="hidden sm:inline" />
          30초 만에 시작하세요
        </h1>

        {/* Subheading */}
        <p className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
          KRDS 기반 React 컴포넌트 라이브러리. <br />
          접근성 AA 등급, Portal + Admin 템플릿 제공.
        </p>

        {/* CTA Buttons */}
        <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
          <Button size="lg" asChild>
            <a href="/docs">시작하기</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="https://github.com/hanui-o/hanui">GitHub</a>
          </Button>
        </div>
      </section>

      {/* Code Preview (shadcn/ui 스타일) */}
      <section className="mx-auto max-w-[980px]">
        <div className="overflow-hidden rounded-lg border bg-background shadow-2xl">
          <pre className="language-bash">
            <code>{`npx create-hanui-app my-app
cd my-app
pnpm dev`}</code>
          </pre>
        </div>
      </section>

      {/* Features Section */}
      <section className="container space-y-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2">
          {/* Feature Card 1 */}
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg className="h-12 w-12" /* ... */ />
              <div className="space-y-2">
                <h3 className="font-bold">KRDS 100% 준수</h3>
                <p className="text-sm text-muted-foreground">
                  한국 정부 표준 디자인 시스템 완벽 구현
                </p>
              </div>
            </div>
          </div>

          {/* Feature Card 2, 3, 4 ... */}
        </div>
      </section>
    </div>
  );
}
```

---

### 2. 컴포넌트 문서 페이지 (/docs/components/button)

#### Radix UI + shadcn/ui 조합 스타일

```tsx
// app/docs/components/button/page.tsx

export default function ButtonPage() {
  return (
    <div className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      {/* Main Content */}
      <div className="mx-auto w-full min-w-0">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <a href="/docs">Docs</a>
          <ChevronRight className="h-4 w-4" />
          <a href="/docs/components">Components</a>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-foreground">Button</span>
        </div>

        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
            Button
          </h1>
          <p className="text-lg text-muted-foreground">
            KRDS 기준을 준수하는 버튼 컴포넌트입니다.
          </p>
        </div>

        <Separator className="my-4" />

        {/* Preview Section (shadcn/ui 스타일) */}
        <div className="space-y-4">
          <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            미리보기
          </h2>

          {/* Preview Container */}
          <div className="preview relative mt-2 flex min-h-[350px] w-full items-center justify-center rounded-md border p-10">
            {/* Component Preview */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button>기본 버튼</Button>
              <Button variant="secondary">보조 버튼</Button>
              <Button variant="outline">아웃라인 버튼</Button>
              <Button variant="ghost">고스트 버튼</Button>
            </div>
          </div>

          {/* Code Toggle (shadcn/ui 스타일) */}
          <Tabs defaultValue="preview" className="relative mr-auto w-full">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger value="preview">미리보기</TabsTrigger>
              <TabsTrigger value="code">코드</TabsTrigger>
            </TabsList>
            <TabsContent value="code">
              <div className="relative rounded-md border">
                <CodeBlock>{`import { Button } from '@hanui/react'

export default function Example() {
  return (
    <div className="flex gap-4">
      <Button>기본 버튼</Button>
      <Button variant="secondary">보조 버튼</Button>
    </div>
  )
}`}</CodeBlock>
                <CopyButton />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Installation Section */}
        <div className="space-y-4 mt-12">
          <h2 className="font-heading scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            설치
          </h2>

          <Tabs defaultValue="cli">
            <TabsList>
              <TabsTrigger value="cli">CLI</TabsTrigger>
              <TabsTrigger value="manual">수동</TabsTrigger>
            </TabsList>
            <TabsContent value="cli">
              <CodeBlock language="bash">{`npx create-hanui-app@latest add button`}</CodeBlock>
            </TabsContent>
            <TabsContent value="manual">
              <CodeBlock language="bash">{`pnpm add @hanui/react`}</CodeBlock>
            </TabsContent>
          </Tabs>
        </div>

        {/* Usage Section */}
        <div className="space-y-4 mt-12">
          <h2 className="font-heading scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            사용법
          </h2>
          <CodeBlock language="tsx">{`import { Button } from '@hanui/react'

export default function MyComponent() {
  return <Button onClick={() => alert('클릭!')}>버튼</Button>
}`}</CodeBlock>
        </div>

        {/* API Reference (Radix UI 스타일) */}
        <div className="space-y-4 mt-12">
          <h2 className="font-heading scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            API Reference
          </h2>

          <div className="my-6 w-full overflow-y-auto">
            <table className="w-full">
              <thead>
                <tr className="m-0 border-t p-0 even:bg-muted">
                  <th className="border px-4 py-2 text-left font-bold">Prop</th>
                  <th className="border px-4 py-2 text-left font-bold">Type</th>
                  <th className="border px-4 py-2 text-left font-bold">
                    Default
                  </th>
                  <th className="border px-4 py-2 text-left font-bold">설명</th>
                </tr>
              </thead>
              <tbody>
                <tr className="m-0 border-t p-0 even:bg-muted">
                  <td className="border px-4 py-2 font-mono text-sm">
                    variant
                  </td>
                  <td className="border px-4 py-2 font-mono text-sm">
                    "default" | "secondary" | "outline" | "ghost"
                  </td>
                  <td className="border px-4 py-2">"default"</td>
                  <td className="border px-4 py-2">버튼 변형 스타일</td>
                </tr>
                <tr className="m-0 border-t p-0 even:bg-muted">
                  <td className="border px-4 py-2 font-mono text-sm">size</td>
                  <td className="border px-4 py-2 font-mono text-sm">
                    "sm" | "md" | "lg"
                  </td>
                  <td className="border px-4 py-2">"md"</td>
                  <td className="border px-4 py-2">
                    버튼 크기 (KRDS 기준: 32px/40px/48px)
                  </td>
                </tr>
                {/* ... more props */}
              </tbody>
            </table>
          </div>
        </div>

        {/* Examples Section */}
        <div className="space-y-4 mt-12">
          <h2 className="font-heading scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            예시
          </h2>

          {/* Example 1 */}
          <div className="space-y-4">
            <h3 className="font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight">
              로딩 상태
            </h3>
            <div className="preview relative mt-2 flex min-h-[150px] w-full items-center justify-center rounded-md border p-10">
              <Button isLoading>로딩 중...</Button>
            </div>
            <CodeBlock>{`<Button isLoading>로딩 중...</Button>`}</CodeBlock>
          </div>

          {/* Example 2, 3 ... */}
        </div>

        {/* Accessibility Section (Radix UI 스타일) */}
        <div className="space-y-4 mt-12">
          <h2 className="font-heading scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            접근성
          </h2>

          <div className="rounded-lg border bg-card p-6">
            <h3 className="font-semibold mb-3">키보드 네비게이션</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>
                <kbd className="px-2 py-1 rounded bg-muted">Tab</kbd> - 버튼으로
                포커스 이동
              </li>
              <li>
                <kbd className="px-2 py-1 rounded bg-muted">Space</kbd> 또는{' '}
                <kbd className="px-2 py-1 rounded bg-muted">Enter</kbd> - 버튼
                활성화
              </li>
            </ul>

            <h3 className="font-semibold mt-6 mb-3">스크린 리더</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>
                <code className="text-xs">role="button"</code> 자동 설정
              </li>
              <li>
                <code className="text-xs">aria-label</code> prop 지원
              </li>
              <li>disabled 상태 스크린 리더 전달</li>
            </ul>

            <h3 className="font-semibold mt-6 mb-3">WCAG 준수</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>명도 대비 4.5:1 이상 (WCAG AA)</li>
              <li>터치 영역 최소 44x44px (KRDS 기준 40px)</li>
              <li>포커스 인디케이터 명확</li>
            </ul>
          </div>
        </div>
      </div>

      {/* On This Page (우측 사이드바) */}
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 pt-4">
          <div className="space-y-2">
            <p className="font-medium">On This Page</p>
            <ul className="m-0 list-none">
              <li className="mt-0 pt-2">
                <a
                  href="#preview"
                  className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground"
                >
                  미리보기
                </a>
              </li>
              <li className="mt-0 pt-2">
                <a href="#installation" className="...">
                  설치
                </a>
              </li>
              <li className="mt-0 pt-2">
                <a href="#usage" className="...">
                  사용법
                </a>
              </li>
              <li className="mt-0 pt-2">
                <a href="#api" className="...">
                  API Reference
                </a>
              </li>
              <li className="mt-0 pt-2">
                <a href="#examples" className="...">
                  예시
                </a>
              </li>
              <li className="mt-0 pt-2">
                <a href="#accessibility" className="...">
                  접근성
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 🧩 주요 컴포넌트 구현

### 1. CodeBlock 컴포넌트 (shadcn/ui 스타일)

```tsx
// components/code-block.tsx

'use client';

import { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({
  children,
  language = 'tsx',
  filename,
}: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(children);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg border bg-zinc-950 dark:bg-zinc-900">
      {filename && (
        <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2">
          <span className="text-sm text-zinc-400">{filename}</span>
        </div>
      )}

      <div className="relative">
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-4 top-4 h-8 w-8"
          onClick={copy}
        >
          {isCopied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>

        <Highlight
          theme={themes.nightOwl}
          code={children.trim()}
          language={language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} overflow-x-auto p-4 text-sm`}
              style={style}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  <span className="mr-4 inline-block w-8 select-none text-right text-zinc-600">
                    {i + 1}
                  </span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
```

### 2. ComponentPreview 컴포넌트

```tsx
// components/component-preview.tsx

'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeBlock } from './code-block';

interface ComponentPreviewProps {
  name: string;
  children: React.ReactNode;
  code: string;
}

export function ComponentPreview({
  name,
  children,
  code,
}: ComponentPreviewProps) {
  return (
    <div className="group relative my-4 flex flex-col space-y-2">
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="preview"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              미리보기
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              코드
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="preview" className="relative rounded-md border">
          <div className="flex min-h-[350px] items-center justify-center p-10">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {children}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code">
          <CodeBlock language="tsx">{code}</CodeBlock>
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

### 3. Sidebar 네비게이션

```tsx
// components/sidebar-nav.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SidebarNavProps {
  items: {
    title: string;
    href?: string;
    items?: {
      title: string;
      href: string;
    }[];
  }[];
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className="pb-4">
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
            {item.title}
          </h4>
          {item.items && (
            <div className="grid grid-flow-row auto-rows-max text-sm">
              {item.items.map((subItem, subIndex) => (
                <Link
                  key={subIndex}
                  href={subItem.href}
                  className={cn(
                    'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline',
                    pathname === subItem.href
                      ? 'font-medium text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {subItem.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

---

## 🎭 다크모드 구현 (shadcn/ui 스타일)

### Theme Provider

```tsx
// components/theme-provider.tsx

'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

### Theme Toggle 버튼

```tsx
// components/theme-toggle.tsx

'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
      <Moon className="hidden h-5 w-5 dark:block" />
      <span className="sr-only">테마 전환</span>
    </Button>
  );
}
```

---

## 📱 반응형 디자인

### Breakpoints (Tailwind Config)

```ts
// Docs 사이트 Breakpoints
screens: {
  sm: '640px',   // 모바일
  md: '768px',   // 태블릿
  lg: '1024px',  // 데스크탑 (Sidebar 표시)
  xl: '1280px',  // 큰 데스크탑 (On This Page 표시)
  '2xl': '1536px',
}
```

### 반응형 레이아웃

```tsx
{
  /* 모바일: Hamburger Menu */
}
<div className="lg:hidden">
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon">
        <Menu className="h-5 w-5" />
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="w-[240px] pr-0">
      <SidebarNav items={docsConfig.sidebarNav} />
    </SheetContent>
  </Sheet>
</div>;

{
  /* 데스크탑: Fixed Sidebar */
}
<aside className="hidden lg:block fixed top-14 z-30 h-[calc(100vh-3.5rem)] w-full shrink-0 border-r lg:sticky lg:block">
  <SidebarNav items={docsConfig.sidebarNav} />
</aside>;

{
  /* 큰 데스크탑: On This Page */
}
<div className="hidden text-sm xl:block">
  <OnThisPage />
</div>;
```

---

## 🔍 검색 기능 (Phase 1.5)

### Algolia DocSearch 통합

```tsx
// components/search.tsx

'use client';

import { DocSearch } from '@docsearch/react';
import '@docsearch/css';

export function Search() {
  return (
    <DocSearch
      appId="YOUR_APP_ID"
      apiKey="YOUR_SEARCH_API_KEY"
      indexName="hanui"
      placeholder="문서 검색..."
      translations={{
        button: {
          buttonText: '검색',
          buttonAriaLabel: '문서 검색',
        },
      }}
    />
  );
}
```

---

## 📦 패키지 및 Dependencies

```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "react-dom": "18.x",
    "@radix-ui/react-dialog": "^1.0.0",
    "@radix-ui/react-tabs": "^1.0.0",
    "@radix-ui/react-separator": "^1.0.0",
    "next-themes": "^0.2.1",
    "prism-react-renderer": "^2.3.0",
    "lucide-react": "latest"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "@tailwindcss/typography": "^0.5.10",
    "typescript": "^5.0.0"
  }
}
```

---

## Phase 1 체크리스트

### Issue #18: Docs 사이트 기본 구조

- [ ] Next.js 14 App Router 설정
- [ ] Tailwind CSS 설정 (shadcn/ui 컬러 시스템)
- [ ] 기본 레이아웃 구현
  - [ ] Header (Fixed, Backdrop Blur)
  - [ ] Sidebar (Collapsible Navigation)
  - [ ] Content (Max-width 800px)
  - [ ] On This Page (Sticky)
- [ ] 다크모드 구현
- [ ] MDX 설정 (Contentlayer)

### Issue #19: 컴포넌트 API 문서

- [ ] ComponentPreview 컴포넌트
- [ ] CodeBlock 컴포넌트 (복사 기능)
- [ ] Props Table 자동 생성
- [ ] API Reference 섹션
- [ ] Accessibility 섹션 템플릿

### Issue #20: 메인 페이지

- [ ] Hero Section (shadcn/ui 스타일)
- [ ] Features Section (카드 4개)
- [ ] Code Preview
- [ ] CTA Buttons

---

**작성자**: @odada-o
**작성일**: 2025-01-08
**버전**: v1.0
**Status**: 디자인 가이드 완료 → 🚀 Issue #18 시작 대기

**Next Action**: Issue #18 작업 시 이 문서 참고하여 개발
