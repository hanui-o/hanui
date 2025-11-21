# CLI Testing Guide

## ✅ 완료된 작업

### 1. Next.js 템플릿 생성

- 경로: `packages/cli/templates/nextjs/default/`
- Next.js 15 + React 19 + Tailwind CSS 4
- KRDS preset 통합
- TypeScript 설정 완료

### 2. CLI 코드 업데이트

- `src/types.ts`: `framework`에 'nextjs' 추가, `template`에 'default' 추가
- `src/prompts.ts`: Next.js 프레임워크 옵션 추가 (첫 번째 선택지로 설정)
- Next.js 선택 시 템플릿 선택 질문 생략 (자동으로 'default' 템플릿 사용)

### 3. 빌드 완료

```bash
pnpm --filter @hanui/cli build
```

✅ Build success

## 🧪 CLI 테스트 방법

### 방법 1: npx 사용 (로컬 테스트)

```bash
# 테스트 디렉토리 생성
mkdir -p /tmp/hanui-test
cd /tmp/hanui-test

# CLI 실행
npx /Users/jeongmiae/Library/Mobile\ Documents/com~apple~CloudDocs/odada/00-github/--git-odada/--HANUI/packages/cli
```

### 방법 2: 직접 node 실행

```bash
cd /tmp/hanui-test
node "/Users/jeongmiae/Library/Mobile Documents/com~apple~CloudDocs/odada/00-github/--git-odada/--HANUI/packages/cli/dist/index.mjs"
```

### 방법 3: 별도 폴더에서 테스트

```bash
# 원하는 위치로 이동
cd ~/Desktop

# CLI 실행
npx create-hanui-app
```

## 📋 인터랙티브 프롬프트 예상 흐름

1. **프로젝트 이름 입력**

   ```
   프로젝트 이름을 입력하세요: my-hanui-app
   ```

2. **프레임워크 선택**

   ```
   ✓ Next.js (Next.js 15 + React 19 + TypeScript) [기본값]
   - React (React 18 + Vite + TypeScript)
   - Vue (Coming soon) [비활성화]
   ```

3. **템플릿 선택** (Next.js 선택 시 자동 생략)
   - Next.js 선택 시: 자동으로 'default' 템플릿 사용
   - React 선택 시: Portal/Admin/Both 중 선택

4. **Dependencies 설치**

   ```
   Dependencies를 자동으로 설치하시겠습니까? (Y/n)
   ```

5. **Git 초기화**
   ```
   Git 저장소를 초기화하시겠습니까? (Y/n)
   ```

## 📦 생성되는 프로젝트 구조

```
my-hanui-app/
├── app/
│   ├── globals.css          # Tailwind + HANUI styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Example page with HANUI components
├── .gitignore
├── next.config.ts           # Next.js 설정
├── package.json             # 프로젝트명으로 업데이트됨
├── postcss.config.mjs       # @tailwindcss/postcss
├── README.md                # Getting started guide
├── tailwind.config.ts       # KRDS preset
└── tsconfig.json            # TypeScript 설정
```

## ✅ 검증 항목

### 1. 파일 생성 확인

```bash
cd my-hanui-app
ls -la
```

### 2. package.json 확인

```bash
cat package.json
# name이 "my-hanui-app"으로 변경되었는지 확인
# version이 "0.1.0"으로 변경되었는지 확인
```

### 3. Dependencies 설치 (수동으로 한 경우)

```bash
pnpm install
```

### 4. 개발 서버 실행

```bash
pnpm dev
```

- 예상 포트: 3000
- http://localhost:3000 접속
- HANUI 컴포넌트가 정상적으로 렌더링되는지 확인

### 5. 빌드 테스트

```bash
pnpm build
```

- 타입 에러 없이 빌드 성공하는지 확인

## 🎯 예상 결과

### CLI 실행 시 출력 예시

```
┌────────────────────────────────────┐
│                                    │
│   🎨 HANUI Project Generator       │
│                                    │
│   KRDS 기반 공공 웹 프로젝트 생성  │
│                                    │
└────────────────────────────────────┘

✓ 프로젝트 디렉토리 확인 완료
✓ 템플릿 파일 복사 완료
✓ 프로젝트 설정 완료
✓ Dependencies 설치 완료
✓ Git 저장소 초기화 완료

🎉 프로젝트가 성공적으로 생성되었습니다!

다음 단계:
  cd my-hanui-app
  pnpm dev

문서: https://hanui.io
```

### 브라우저에서 확인할 내용

- ✅ "HANUI로 시작하기" Display 컴포넌트
- ✅ KRDS 디자인 토큰 적용 (색상, 타이포그래피)
- ✅ Button, Card, Stack 등 HANUI 컴포넌트 정상 작동
- ✅ Tailwind CSS 스타일 적용
- ✅ 반응형 레이아웃

## 🐛 문제 해결

### 템플릿을 찾을 수 없다는 에러

```
템플릿을 찾을 수 없습니다: nextjs/default
```

**해결**: CLI 빌드 후 templates 폴더가 dist에 복사되었는지 확인

```bash
ls packages/cli/templates/nextjs/default/
```

### pnpm install 실패

**해결**:

- package.json에 필수 의존성 확인 (clsx, tailwind-merge)
- pnpm 캐시 삭제 후 재시도: `pnpm store prune && pnpm install`

### PostCSS 에러

```
It looks like you're trying to use `tailwindcss` directly...
```

**해결**: postcss.config.mjs에 '@tailwindcss/postcss' 플러그인 사용 확인

## 🎯 hanui add 명령어 사용법

### 1. 프로젝트 초기화

```bash
cd my-hanui-app
npx hanui init
```

**이 명령어가 하는 일:**

- ✅ 프로젝트 타입 자동 감지 (Next.js/Vite, src 폴더 유무)
- ✅ `components/hanui/` 디렉토리 생성
- ✅ `lib/utils.ts` (cn 유틸리티) 생성
- ✅ `hanui.json` 설정 파일 생성
- ✅ Tailwind 설정 안내

**생성되는 hanui.json 예시:**

```json
{
  "$schema": "https://hanui.io/schema.json",
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components/hanui",
    "utils": "@/lib/utils",
    "ui": "@/components/hanui",
    "lib": "@/lib"
  }
}
```

### 2. 컴포넌트 추가

```bash
# 단일 컴포넌트 추가
npx hanui add button

# 여러 컴포넌트 추가
npx hanui add button card input

# 인터랙티브 선택
npx hanui add
```

**프롬프트 예시:**

```
? Which components would you like to add? (Press <space> to select, <a> to toggle all)
 ◯ button - KRDS 디자인 시스템을 준수하는 버튼 컴포넌트
 ◯ card - 콘텐츠를 담는 카드 컴포넌트
 ◯ input - 폼 입력 컴포넌트
 ◯ label - 폼 레이블 컴포넌트
 ◯ container - 레이아웃 컨테이너 컴포넌트
```

**자동으로 처리되는 것들:**

- ✅ 컴포넌트 파일을 `components/hanui/` 에 복사
- ✅ 필요한 dependencies 자동 설치 (clsx, tailwind-merge 등)
- ✅ registryDependencies 자동 해결 (예: input → label 자동 설치)

### 3. src 폴더 지원

**src 폴더 있는 경우:**

```
my-app/
├── src/
│   ├── components/
│   │   └── hanui/
│   │       ├── button.tsx
│   │       └── card.tsx
│   └── lib/
│       └── utils.ts
```

**src 폴더 없는 경우:**

```
my-app/
├── components/
│   └── hanui/
│       ├── button.tsx
│       └── card.tsx
└── lib/
    └── utils.ts
```

### 4. 사용 예시

```tsx
// src 폴더가 있는 경우
import { Button } from '@/components/hanui/button';
import { Card } from '@/components/hanui/card';

// src 폴더가 없는 경우
import { Button } from '@/components/hanui/button';
import { Card } from '@/components/hanui/card';

export default function Page() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  );
}
```

## 📝 다음 단계

1. **CLI 로컬 테스트**
   - 새 프로젝트 생성 테스트
   - hanui init 명령어 테스트
   - hanui add 명령어 테스트

2. **CLI 패키지 publish**
   - @hanui/cli를 npm에 publish
   - `npx create-hanui-app` 글로벌 사용 가능
   - `npx hanui add` 글로벌 사용 가능
