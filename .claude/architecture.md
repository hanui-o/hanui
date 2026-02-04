# HANUI 아키텍처

## 설계 원칙

### 1. 복사-붙여넣기 우선 (shadcn/ui 방식)

```
❌ node_modules 의존성
- npm install @hanui/react
- import { Button } from '@hanui/react'
- 커스터마이징 어려움

✅ 코드 복사 방식
- npx hanui add button
- 프로젝트에 직접 복사됨
- 완전한 커스터마이징 가능
```

### 2. 제로 런타임 의존성

컴포넌트는 다음만 의존:
- React/Vue (peer dependency)
- Radix UI (접근성 primitives)
- Tailwind CSS (스타일링)

### 3. 타입 안전성 우선

모든 컴포넌트는 완전한 TypeScript 타입 정의 포함:
- Props 인터페이스
- Variants 타입
- Ref 타입
- Event 핸들러 타입

### 4. 접근성 우선 (Accessibility First)

모든 컴포넌트는 기본적으로:
- ARIA 속성 포함
- 키보드 네비게이션 지원
- 포커스 관리 자동화
- 스크린 리더 최적화

## 컴포넌트 아키텍처

### React 컴포넌트 구조

```tsx
// 1. Imports
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// 2. Variants (CVA)
const buttonVariants = cva(
  // Base styles (KRDS 기본 스타일)
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-60',
  {
    variants: {
      variant: {
        default: 'bg-krds-gray-90 text-white hover:bg-krds-gray-80',
        primary: 'bg-krds-primary-60 text-white hover:bg-krds-primary-70',
        outline: 'border-2 border-krds-gray-30 hover:bg-krds-gray-5',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-13 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// 3. Props Interface
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// 4. Component (forwardRef)
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

// 5. DisplayName
Button.displayName = 'Button';

// 6. Export
export { Button, buttonVariants };
```

### Vue 컴포넌트 구조

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';

// Props with defaults
const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'primary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    class?: string;
  }>(),
  {
    variant: 'default',
    size: 'md',
  }
);

// Emits
const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

// Computed classes
const classes = computed(() =>
  cn(
    // Base styles
    'inline-flex items-center justify-center rounded-md font-medium transition-colors',
    // Variants
    props.variant === 'default' && 'bg-krds-gray-90 text-white hover:bg-krds-gray-80',
    props.variant === 'primary' && 'bg-krds-primary-60 text-white hover:bg-krds-primary-70',
    // Sizes
    props.size === 'sm' && 'h-9 px-3 text-sm',
    props.size === 'md' && 'h-11 px-6 text-base',
    // Custom class
    props.class
  )
);
</script>

<template>
  <button :class="classes" @click="emit('click', $event)">
    <slot />
  </button>
</template>
```

## 디자인 토큰 시스템

### CSS Variables (variables.css)

```css
/* KRDS 2.2 Color Tokens */
:root {
  /* Primary Colors */
  --krds-primary-10: #e8f4ff;
  --krds-primary-60: #0070cc; /* Base */
  --krds-primary-90: #001933;

  /* Gray Scale */
  --krds-gray-5: #f9f9f9;
  --krds-gray-90: #1a1a1a;

  /* Semantic Colors */
  --krds-success: #008a00;
  --krds-error: #d32f2f;
}

/* Dark Mode */
[data-theme='dark'] {
  --krds-gray-5: #1a1a1a;
  --krds-gray-90: #f9f9f9;
}
```

### Tailwind CSS Preset

```ts
// tailwind.preset.ts
import type { Config } from 'tailwindcss';

export default {
  theme: {
    extend: {
      colors: {
        krds: {
          primary: {
            10: 'var(--krds-primary-10)',
            60: 'var(--krds-primary-60)',
            // ...
          },
          gray: {
            5: 'var(--krds-gray-5)',
            90: 'var(--krds-gray-90)',
            // ...
          },
        },
      },
      fontSize: {
        'krds-body-sm': '0.875rem', // 14px
        'krds-body-md': '1rem',     // 17px (KRDS 기준)
        'krds-heading-lg': '1.875rem', // 32px
      },
      spacing: {
        'krds-1': '4px',
        'krds-4': '16px',
        'krds-8': '32px',
      },
    },
  },
} satisfies Config;
```

## CLI 아키텍처

### 컴포넌트 설치 플로우

```
1. npx hanui add button
   ↓
2. 레지스트리에서 컴포넌트 정보 fetch
   packages/registry/src/react/button.json
   ↓
3. 의존성 확인 및 설치
   - class-variance-authority
   - clsx
   - tailwind-merge
   ↓
4. 파일 복사
   src/components/ui/button.tsx
   ↓
5. Tailwind 설정 병합
   tailwind.config.ts
   ↓
6. 완료 메시지 출력
```

### 레지스트리 구조

```json
{
  "name": "button",
  "type": "ui",
  "description": "KRDS 버튼 컴포넌트",
  "dependencies": [
    "class-variance-authority",
    "clsx",
    "tailwind-merge"
  ],
  "devDependencies": [],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/button.tsx",
      "type": "component",
      "target": "src/components/ui/button.tsx"
    }
  ],
  "meta": {
    "krdsCompliant": true,
    "a11yLevel": "AA",
    "keywords": ["button", "action", "form"]
  }
}
```

## 문서 사이트 아키텍처

### Next.js App Router 구조

```
apps/docs/src/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # 홈페이지
│   │
│   ├── docs/
│   │   ├── layout.tsx          # 문서 레이아웃
│   │   ├── quick-start/
│   │   │   └── page.tsx        # 빠른 시작 가이드
│   │   │
│   │   └── components/
│   │       ├── [component]/
│   │       │   └── page.tsx    # 컴포넌트 문서 (동적)
│   │       └── page.tsx        # 컴포넌트 목록
│   │
│   └── design-system/
│       ├── colors/
│       ├── typography/
│       └── spacing/
│
├── components/
│   ├── content/                # 콘텐츠 컴포넌트
│   │   ├── Heading.tsx         # 제목
│   │   ├── Section.tsx         # 섹션
│   │   └── CodeBlock.tsx       # 코드 블록
│   │
│   ├── navigation/             # 네비게이션
│   │   ├── Sidebar.tsx
│   │   └── TableOfContents.tsx
│   │
│   └── examples/               # 컴포넌트 예제
│       ├── ButtonExamples.tsx
│       └── ModalExamples.tsx
│
└── styles/
    └── globals.css             # 전역 스타일
```

### 컴포넌트 문서 템플릿

```tsx
// apps/docs/src/app/docs/components/button/page.tsx
import { Metadata } from 'next';
import { Heading, Section } from '@/components/content';
import { PreviewBox, CodeBlock, PropsTable } from '@/components/helpers';
import { Button } from '@hanui/react';

export const metadata: Metadata = {
  title: 'Button - HANUI',
  description: 'KRDS 준수 버튼 컴포넌트',
};

export default function ButtonPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Button"
        description="사용자 액션을 트리거하는 클릭 가능한 버튼 컴포넌트"
      />

      {/* 미리보기 */}
      <Section>
        <Heading level="h2" id="preview" title="미리보기" />
        <PreviewBox>
          <Button variant="primary">클릭하세요</Button>
        </PreviewBox>
      </Section>

      {/* 설치 */}
      <Section>
        <Heading level="h2" id="installation" title="설치" />
        <CodeBlock code="npx hanui add button" language="bash" />
      </Section>

      {/* 사용법 */}
      <Section>
        <Heading level="h2" id="usage" title="사용법" />
        <CodeBlock
          code={`import { Button } from '@/components/ui/button';

<Button variant="primary">버튼</Button>`}
        />
      </Section>

      {/* API */}
      <Section>
        <Heading level="h2" id="api" title="API" />
        <PropsTable
          props={[
            {
              name: 'variant',
              type: "'default' | 'primary' | 'outline'",
              default: "'default'",
              description: '버튼 스타일 variant',
            },
            // ...
          ]}
        />
      </Section>

      {/* 접근성 */}
      <Section>
        <Heading level="h2" id="accessibility" title="접근성" />
        <ul>
          <li>키보드: Enter, Space로 클릭</li>
          <li>ARIA: role="button" 자동 적용</li>
          <li>포커스: 포커스 링 자동 표시</li>
        </ul>
      </Section>
    </>
  );
}
```

## 빌드 시스템

### Turborepo 태스크 파이프라인

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "dev": {
      "dependsOn": ["^build"],
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"]
    }
  }
}
```

### 빌드 순서

```
1. packages/core (공통 유틸리티)
   ↓
2. packages/react, packages/vue (컴포넌트)
   ↓
3. packages/registry (레지스트리)
   ↓
4. packages/cli (CLI 도구)
   ↓
5. apps/docs (문서 사이트)
```

## 접근성 아키텍처

### ARIA 패턴 적용

모든 인터랙티브 컴포넌트는 다음을 포함:

1. **Role**: 적절한 ARIA role
2. **Label**: aria-label 또는 aria-labelledby
3. **State**: aria-disabled, aria-expanded 등
4. **Keyboard**: onKeyDown 이벤트 핸들러

### 포커스 관리

```tsx
// 모달 포커스 트래핑 예시
import { useFocusTrap } from '@/hooks/useFocusTrap';

const Modal = ({ isOpen, children }) => {
  const modalRef = useFocusTrap(isOpen);

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  );
};
```

## 성능 최적화

### 1. Tree-shaking
- ESM 빌드 제공
- 개별 컴포넌트 import 지원

### 2. 번들 사이즈 최소화
- 불필요한 의존성 제거
- Radix UI primitives만 사용

### 3. 코드 스플리팅
- 문서 사이트: Next.js 동적 import
- 컴포넌트: 개별 파일로 분리

### 4. CSS 최적화
- Tailwind JIT 모드
- PurgeCSS로 미사용 스타일 제거

## 배포 파이프라인

```
1. 코드 변경
   ↓
2. Git commit & push
   ↓
3. GitHub Actions 트리거
   ↓
4. 테스트 실행
   - TypeScript 타입 체크
   - ESLint
   - Prettier
   ↓
5. 빌드
   - Turborepo build
   ↓
6. Changesets 확인
   ↓
7. NPM 퍼블리시 (자동)
   - @hanui/react
   - @hanui/cli
   ↓
8. Vercel 배포 (자동)
   - docs 사이트
```

## 확장 가능성

### 새 프레임워크 지원 추가

```
1. packages/svelte/ 생성
2. 컴포넌트 포팅
3. packages/svelte-cli/ 생성
4. registry에 svelte 추가
5. 문서 업데이트
```

### 새 디자인 시스템 지원

```
1. variables.css에 토큰 추가
2. tailwind.preset.ts 확장
3. variants 추가
4. 문서 업데이트
```
