# HANUI 개발 가이드

> **shadcn/ui 방식의 CLI 복붙 설치 디자인 시스템**

---

## 목차

1. [프로젝트 개요](#프로젝트-개요)
2. [CLI 복붙 설치 방식](#cli-복붙-설치-방식)
3. [KRDS 변수 시스템](#krds-변수-시스템)
4. [컴포넌트 개발 가이드](#컴포넌트-개발-가이드)
5. [문서 페이지 마이그레이션](#문서-페이지-마이그레이션)
6. [참고 자료](#참고-자료)

---

## 프로젝트 개요

### HANUI란?

HANUI는 **대한민국 디자인 시스템(KRDS)**을 기반으로 한 React 컴포넌트 라이브러리입니다.

**핵심 특징:**

- 🎨 **KRDS 표준 준수**: 대한민국 디자인 시스템 가이드 완벽 준수
- 📦 **CLI 복붙 방식**: shadcn/ui처럼 소스 코드를 프로젝트에 복사
- ⚡ **Tailwind CSS**: KRDS 변수를 Tailwind 클래스로 매핑
- ♿ **접근성 우선**: WCAG 2.1 / KWCAG 2.2 Level AA 기준 준수
- 🎯 **TypeScript**: 완벽한 타입 안정성

### 왜 CLI 복붙 방식인가?

**npm 패키지 vs CLI 복붙:**

```bash
# ❌ npm 패키지 방식 (일반적)
npm install @hanui/react

# ✅ CLI 복붙 방식 (HANUI)
hanui add button
```

**CLI 복붙 방식의 장점:**

1. **완전한 커스터마이징**: 소스 코드를 직접 수정 가능
2. **번들 사이즈 최적화**: 사용하는 컴포넌트만 프로젝트에 포함
3. **의존성 최소화**: 외부 패키지 의존성 없음
4. **프로젝트 통제권**: 컴포넌트 동작을 완전히 제어

---

## CLI 복붙 설치 방식

### 작동 원리

```
┌─────────────────────────────────────────────────────────┐
│              CLI 복붙 설치 프로세스                      │
└─────────────────────────────────────────────────────────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
         ▼                 ▼                 ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│  사용자 실행  │   │  소스 파일   │   │  Tailwind    │
│  hanui add   │──▶│  복사        │──▶│  빌드        │
│  button      │   │              │   │              │
└──────────────┘   └──────────────┘   └──────────────┘
```

**단계별 설명:**

1. **사용자가 CLI 실행**: `hanui add button`
2. **소스 파일 복사**: `button.tsx`가 사용자 프로젝트의 `src/components/hanui/` 폴더로 복사됨
3. **Tailwind 빌드**: 복사된 파일의 클래스를 스캔하여 필요한 CSS만 생성

### 왜 Tailwind 클래스를 사용해야 하는가?

**문제 상황 (CSS 변수 문법):**

```tsx
// ❌ CSS 변수 문법 (안 됨!)
<button className="bg-[var(--krds-color-light-primary-50)]">버튼</button>
```

**문제점:**

- 사용자 프로젝트에 복사되면 → Tailwind가 이 문법을 스캔 못함
- Tailwind가 스캔 못하면 → CSS가 생성 안 됨
- 결과: 버튼에 스타일이 안 먹힘 ❌

**해결 방법 (Tailwind 클래스):**

```tsx
// ✅ Tailwind 클래스 (정상 작동!)
<button className="bg-krds-primary-50">버튼</button>
```

**작동 원리:**

1. 사용자가 `tailwind.config.ts`에서 KRDS 변수를 Tailwind 클래스로 매핑
2. 사용자가 `hanui add button` 실행 → 소스 파일 복사
3. Tailwind가 복사된 파일 스캔 → `bg-krds-primary-50` 발견
4. Tailwind가 해당 클래스의 CSS 생성 ✅

### 기술적 배경

```
┌─────────────────────────────────────────────────────────┐
│              Tailwind 빌드 타임 프로세스                 │
└─────────────────────────────────────────────────────────┘

1. globals.css: CSS 변수 정의
   --krds-color-light-primary-50: #256ef4

2. tailwind.config.ts: CSS 변수를 Tailwind 클래스로 매핑
   'krds-primary': {
     50: 'var(--krds-color-light-primary-50)'
   }

3. 컴포넌트: Tailwind 클래스 사용
   <button className="bg-krds-primary-50">

4. Tailwind 빌드: 필요한 CSS만 생성
   .bg-krds-primary-50 {
     background-color: var(--krds-color-light-primary-50);
   }
```

---

## KRDS 변수 시스템

### 색상 변수 구조

HANUI는 KRDS 색상 시스템을 Tailwind CSS와 통합하여 사용합니다.

**3단계 구조:**

1. **CSS 변수 정의** (`globals.css`)
2. **Tailwind 매핑** (`tailwind.config.ts`)
3. **컴포넌트 사용**

### 1. CSS 변수 정의 (globals.css)

```css
/* apps/docs/src/app/globals.css */

:root {
  /* KRDS 색상 토큰 */
  --krds-color-light-primary-50: #256ef4;
  --krds-color-light-primary-60: #0052cc;
  --krds-color-light-primary-70: #003d99;

  --krds-color-light-gray-5: #f9fafb;
  --krds-color-light-gray-10: #f3f4f6;
  --krds-color-light-gray-90: #1f2937;

  /* 기타 색상들... */
}
```

### 2. Tailwind 매핑 (tailwind.config.ts)

```typescript
// apps/docs/tailwind.config.ts

export default {
  theme: {
    extend: {
      colors: {
        // KRDS Primary
        'krds-primary': {
          50: 'var(--krds-color-light-primary-50)',
          60: 'var(--krds-color-light-primary-60)',
          70: 'var(--krds-color-light-primary-70)',
        },

        // KRDS Gray
        'krds-gray': {
          5: 'var(--krds-color-light-gray-5)',
          10: 'var(--krds-color-light-gray-10)',
          90: 'var(--krds-color-light-gray-90)',
        },

        // 기타 색상들...
      },

      // KRDS 폰트 크기
      fontSize: {
        'krds-body-xs': ['13px', { lineHeight: '1.5' }],
        'krds-body-sm': ['15px', { lineHeight: '1.5' }],
        'krds-body-md': ['17px', { lineHeight: '1.5' }],
        'krds-heading-md': ['24px', { lineHeight: '1.3' }],
        'krds-heading-lg': ['32px', { lineHeight: '1.3' }],
      },
    },
  },
};
```

### 3. 컴포넌트 사용

```tsx
// ✅ 올바른 사용법
<div className="bg-krds-primary-50 text-krds-gray-90">
  <h2 className="text-krds-heading-md">제목</h2>
  <p className="text-krds-body-md">본문</p>
</div>

// ❌ 잘못된 사용법
<div className="bg-[var(--krds-color-light-primary-50)]">
  CSS 변수 문법은 Tailwind 빌드가 안 됨!
</div>
```

### 주요 KRDS 색상 변수

| 색상           | 용도                       | Tailwind 클래스 예시   |
| -------------- | -------------------------- | ---------------------- |
| `krds-primary` | 주요 상호작용 (버튼, 링크) | `bg-krds-primary-50`   |
| `krds-gray`    | 중립 색상 (배경, 텍스트)   | `text-krds-gray-90`    |
| `krds-danger`  | 위험/에러                  | `text-krds-danger-60`  |
| `krds-success` | 성공                       | `text-krds-success-60` |
| `krds-warning` | 경고                       | `text-krds-warning-60` |

**숫자 스케일**: 모든 색상은 `5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95` 스케일 제공

### 주요 KRDS 폰트 변수

| 용도        | Tailwind 클래스        | 크기 |
| ----------- | ---------------------- | ---- |
| 본문 (작음) | `text-krds-body-sm`    | 15px |
| 본문 (중간) | `text-krds-body-md`    | 17px |
| 제목 (중간) | `text-krds-heading-md` | 24px |
| 제목 (큰)   | `text-krds-heading-lg` | 32px |

---

## 컴포넌트 개발 가이드

> 이슈 [#25: Convert components from CSS variables to Tailwind classes](https://github.com/hanui-o/hanui/issues/25) 참고

### 핵심 원칙

**모든 컴포넌트는 Tailwind 클래스를 사용해야 합니다.**

```tsx
// ❌ CSS 변수 문법 (사용 금지!)
<button className="bg-[var(--krds-color-light-primary-50)]">

// ✅ Tailwind 클래스 (올바름!)
<button className="bg-krds-primary-50">
```

### 컴포넌트 작성 체크리스트

#### 1. KRDS 디자인 시스템 준수

- [ ] KRDS 가이드라인에 맞는 스타일 적용
- [ ] Tailwind 클래스 사용 (`bg-krds-primary-50` 등)
- [ ] KRDS 폰트 크기 사용 (`text-krds-body-md` 등)

#### 2. 다크 모드

- [ ] 다크 모드 분기 제거 (현재 HANUI는 다크 모드 미지원)
- [ ] `dark:` 접두사가 있다면 모두 삭제

#### 3. Radix UI 통합

- [ ] 접근성이 중요한 컴포넌트인지 확인
- [ ] 필요하다면 Radix UI Primitives 적용

#### 4. 코드 정리

- [ ] 사용하지 않는 변수 삭제
- [ ] 주석을 한글로 작성
- [ ] 불필요한 주석 제거

### 컴포넌트 예시

```tsx
// packages/react/src/components/button.tsx

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ✅ Tailwind 클래스 사용
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-krds-body-md font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-krds-primary-50 text-white hover:bg-krds-primary-60',
        secondary: 'bg-krds-gray-10 text-krds-gray-90 hover:bg-krds-gray-20',
        outline:
          'border border-krds-gray-30 bg-transparent hover:bg-krds-gray-5',
      },
      size: {
        sm: 'h-8 px-3 text-krds-body-sm',
        md: 'h-10 px-4 text-krds-body-md',
        lg: 'h-12 px-6 text-krds-body-md',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
```

---

## 문서 페이지 마이그레이션

> 이슈 [#24: 컴포넌트 페이지 마이그레이션](https://github.com/hanui-o/hanui/issues/24) 참고

### 페이지 구조 (필수 순서)

**개요 탭 섹션:**

1. **개요** - 기본 예제 (미리보기 + 코드)
2. **설치** - Installation 컴포넌트
3. **사용법** - import + 기본 사용 코드
4. **예제** - Variant, Size 등
5. **접근성** (선택적)

### 기본 템플릿

```tsx
// apps/docs/src/app/components/[component]/page.tsx

'use client';

import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import {
  Code,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  List,
  ListItem,
} from '@hanui/react';

export default function ComponentPage() {
  return (
    <>
      {/* 1. 페이지 제목 */}
      <Heading
        level="h1"
        title="컴포넌트명"
        description="컴포넌트 한 줄 설명"
      />

      {/* 2. Tabs */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview">
          {/* 1) 개요 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only" // ⚠️ 필수!
            />
            <ComponentPreview>{/* 기본 미리보기 */}</ComponentPreview>
            <Code variant="block" language="tsx">
              {`<Component>Example</Component>`}
            </Code>
          </Section>

          {/* 2) 설치 */}
          <Section level="h2">
            <Installation componentName="component-name" />
          </Section>

          {/* 3) 사용법 */}
          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { Component } from '@/components/hanui/component'

<Component variant="primary">Example</Component>`}
            </Code>
          </Section>

          {/* 4) 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading level="h3" title="Variant" />
              <ComponentPreview>{/* 모든 variant 한 번에 */}</ComponentPreview>
              <Code variant="block" language="tsx">
                {/* 코드 */}
              </Code>
            </Subsection>
          </Section>

          {/* 5) 접근성 (선택적) */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다."
            />
            <List variant="check">
              <ListItem>
                <strong>접근성 기능 1:</strong> 설명
              </ListItem>
            </List>
          </Section>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="Props" />
              <Table small>
                {' '}
                {/* ⚠️ small prop 필수 */}
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>{/* Props 내용 */}</TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      {/* 3. 페이지 네비게이션 */}
      <PageNavigation
        prev={{ title: '이전', href: '/components/prev' }}
        next={{ title: '다음', href: '/components/next' }}
      />
    </>
  );
}
```

### 중요 주의사항

**✅ Do:**

- `className="sr-only"` - 개요 섹션 제목에 필수
- `<Table small>` - API 레퍼런스에서 small prop 사용
- KRDS 변수 사용 (`text-krds-gray-90`, `bg-krds-primary-50`)
- HANUI 컴포넌트 사용 (Section, Heading, Code, Table 등)

**❌ Don't:**

- `dark:` 접두사 사용 (다크 모드 미지원)
- 하드코딩된 색상 (`text-gray-900`, `bg-blue-50`)
- CSS 변수 문법 (`bg-[var(--krds-color-light-primary-50)]`)

---

## 참고 자료

### GitHub Issues

- [#24: 컴포넌트 페이지 마이그레이션](https://github.com/hanui-o/hanui/issues/24)
- [#25: Tailwind 클래스 변환](https://github.com/hanui-o/hanui/issues/25)

### 참고 페이지

- `/components/button` - 기본 마이그레이션 패턴
- `/components/accordion` - 비교 패턴 예시
- `/components/label` - 접근성 섹션 예시

### 외부 문서

- [KRDS 공식 사이트](https://www.krds.go.kr/)
- [shadcn/ui](https://ui.shadcn.com/) - CLI 복붙 방식 참고
- [Tailwind CSS](https://tailwindcss.com/) - 커스텀 색상 설정

---

**작성일**: 2025-11-26
**관련 이슈**: #24, #25
