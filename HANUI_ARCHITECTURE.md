# HANUI 아키텍처 - CLI 방식

> **⚠️ 중요: 이 프로젝트는 CLI 방식입니다 (shadcn/ui와 동일)**
>
> - ✅ 사용자는 `npx hanui add button`으로 컴포넌트를 프로젝트에 복사
> - ✅ 컴포넌트 파일이 사용자 프로젝트에 복사되어 자유롭게 수정 가능

## 📁 프로젝트 구조

```
HANUI/
├── packages/
│   ├── cli/                    # CLI 도구 (메인)
│   │   ├── src/
│   │   │   ├── commands/
│   │   │   │   ├── init.ts    # hanui init (프로젝트 초기화)
│   │   │   │   └── add.ts     # hanui add (컴포넌트 추가)
│   │   │   ├── utils/
│   │   │   │   └── get-project-info.ts  # src 폴더 유무 자동 감지
│   │   │   ├── index.ts       # create-hanui-app (프로젝트 생성)
│   │   │   └── hanui.ts       # hanui CLI 진입점
│   │   ├── templates/
│   │   │   └── nextjs/
│   │   │       └── default/   # Next.js 템플릿 (clsx, tailwind-merge만 포함)
│   │   └── package.json       # bin: create-hanui-app, hanui
│   │
│   ├── react/                  # 컴포넌트 소스 (CLI가 이것을 복사함)
│   │   └── src/
│   │       └── components/
│   │           ├── Button/
│   │           ├── Card/
│   │           └── ...
│   │
│   └── registry/               # 컴포넌트 레지스트리
│       └── registry.json      # 컴포넌트 메타데이터 (15개 등록됨)
│
└── apps/
    └── docs/                   # 문서 사이트
        └── src/app/docs/
            └── installation/   # CLI 사용법 안내
                └── page.tsx
```

## 🎯 사용자 워크플로우

### 1. 새 프로젝트 생성

```bash
npx create-hanui-app my-app
cd my-app
```

**생성되는 것:**

- Next.js 15 + React 19
- Tailwind CSS 4 + KRDS preset
- clsx, tailwind-merge 기본 포함

### 2. 프로젝트 초기화

```bash
npx hanui init
```

**하는 일:**

- ✅ 프로젝트 타입 감지 (Next.js/Vite)
- ✅ **src 폴더 유무 자동 감지** ← 핵심!
- ✅ `components/hanui/` 또는 `src/components/hanui/` 디렉토리 생성
- ✅ `lib/utils.ts` 또는 `src/lib/utils.ts` 생성 (cn 함수)
- ✅ `hanui.json` 설정 파일 생성

### 3. 컴포넌트 추가

```bash
npx hanui add button card
```

**하는 일:**

- ✅ `packages/react/src/components/Button/Button.tsx` 파일을 프로젝트에 복사
- ✅ **import 경로 자동 변환**: `from '../../lib/utils'` → `from '@/lib/utils'`
- ✅ dependencies 자동 설치 (clsx, tailwind-merge, class-variance-authority 등)
- ✅ registryDependencies 자동 해결 (예: input → label 자동 추가)

### 4. 사용

```tsx
import { Button } from '@/components/hanui/button';
import { Card } from '@/components/hanui/card';
```

## 🔧 CLI 핵심 기능

### 1. src 폴더 감지 (get-project-info.ts)

```typescript
// src 폴더가 있으면
components/hanui/ → src/components/hanui/
lib/utils.ts → src/lib/utils.ts

// src 폴더가 없으면
components/hanui/
lib/utils.ts
```

### 2. import 경로 자동 변환 (add.ts)

```typescript
// packages/react의 컴포넌트:
import { cn } from '../../lib/utils';

// CLI가 복사하면서 자동 변환:
import { cn } from '@/lib/utils';
```

### 3. registry.json (15개 컴포넌트 등록)

```json
{
  "button": { ... },
  "card": { ... },
  "input": { "registryDependencies": ["label"] },
  "label": { ... },
  "container": { ... },
  "stack": { ... },
  "box": { ... },
  "display": { ... },
  "body": { ... },
  "heading": { ... },
  "link": { ... },
  "breadcrumb": { ... },
  "accordion": { ... },
  "list": { ... },
  "tabs": { ... }
}
```

## 📝 문서 페이지

### /docs/installation (완료)

- **기본 탭**: "기존 프로젝트에 추가" (defaultValue="existing-project")
- ✅ CLI 사용법 안내
- ✅ src 폴더 유무 자동 감지 설명
- ✅ import 경로 안내 (`@/components/hanui/button`)

## ✅ 항상 확인할 것

### 1. CLI 빌드 상태

```bash
cd packages/cli
pnpm build
# → dist/index.mjs, dist/hanui.mjs 생성 확인
```

### 2. 템플릿 package.json

```json
{
  "dependencies": {
    "clsx": "^2.1.1", // ✅ 필수
    "tailwind-merge": "^2.5.5", // ✅ 필수
    "next": "^15.5.6", // ✅
    "react": "^19.0.0" // ✅
  }
}
```

### 3. registry.json

- 15개 컴포넌트 등록됨
- button에 class-variance-authority 포함
- input에 label registryDependency 설정

### 4. add.ts import 변환

```typescript
// 228-232번 줄 확인
content = content.replace(
  /from ['"]\.\.\/\.\.\/lib\/utils['"]/g,
  "from '@/lib/utils'"
);
```

## 🚀 다음 작업

1. **CLI 테스트**: 새 프로젝트 생성 → init → add 테스트
2. **npm publish**: @hanui/cli 패키지 배포

## 📚 참고 자료

- [packages/cli/CLI_TESTING.md](packages/cli/CLI_TESTING.md) - CLI 테스트 가이드
- [apps/docs/src/app/docs/installation/page.tsx](apps/docs/src/app/docs/installation/page.tsx) - 설치 문서
- [packages/registry/registry.json](packages/registry/registry.json) - 컴포넌트 레지스트리

---

**마지막 업데이트**: 2025-01-21
**현재 상태**: CLI 방식 완성
