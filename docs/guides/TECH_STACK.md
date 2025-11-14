# HANUI - 기술 스택

> **Phase 1 개발에 사용되는 핵심 기술 스택**
> 작성일: 2025-01-08

---

## 🎯 핵심 원칙

### 1. 공공 표준 우선

- **KRDS 규격 100% 준수**
- 접근성 WCAG 2.1 AA 등급
- 한국형 웹 접근성 가이드 준수

### 2. 개발자 경험 (DX) 최적화

- **Tailwind CSS**: 빠른 개발, 일관된 스타일링
- **Headless UI**: 접근성 자동 보장, 복잡한 인터랙션 간소화
- **TypeScript**: 타입 안정성, IDE 자동완성

### 3. 성능 우선

- **Vite**: 빠른 빌드, HMR
- **pnpm**: 효율적 패키지 관리
- **Turborepo**: 모노레포 빌드 최적화

---

## 📦 전체 기술 스택

### Core 기술

| 분류            | 기술       | 버전   | 용도            |
| --------------- | ---------- | ------ | --------------- |
| **언어**        | TypeScript | 5.x    | 타입 안정성     |
| **빌드**        | Vite       | 5.x    | 라이브러리 빌드 |
| **빌드**        | tsup       | latest | CLI 빌드        |
| **모노레포**    | Turborepo  | latest | 빌드 캐싱       |
| **패키지 관리** | pnpm       | 9.x    | Workspace 관리  |

### 프론트엔드 (React)

| 분류           | 기술          | 버전   | 용도                       |
| -------------- | ------------- | ------ | -------------------------- |
| **프레임워크** | React         | 18.x   | UI 라이브러리              |
| **스타일링**   | Tailwind CSS  | 3.x    | 유틸리티 우선 CSS ⭐       |
| **컴포넌트**   | Headless UI   | 2.x    | 접근성 보장 컴포넌트 ⭐    |
| **아이콘**     | Lucide React  | latest | 아이콘 라이브러리          |
| **애니메이션** | Framer Motion | latest | 부드러운 애니메이션 (선택) |

### 개발 도구

| 분류             | 기술            | 버전   | 용도                  |
| ---------------- | --------------- | ------ | --------------------- |
| **린터**         | ESLint          | 9.x    | 코드 품질             |
| **포매터**       | Prettier        | latest | 코드 포매팅           |
| **Git Hooks**    | Husky           | latest | Pre-commit 훅         |
| **Staged Files** | lint-staged     | latest | Staged 파일만 린트    |
| **테스트**       | Vitest          | latest | 단위 테스트           |
| **테스트**       | Testing Library | latest | React 컴포넌트 테스트 |

### CLI 도구

| 분류               | 기술         | 버전   | 용도                |
| ------------------ | ------------ | ------ | ------------------- |
| **CLI 프레임워크** | Commander.js | latest | 명령어 파싱         |
| **프롬프트**       | Inquirer.js  | latest | 인터랙티브 프롬프트 |
| **터미널**         | Chalk        | latest | 컬러 출력           |
| **스피너**         | Ora          | latest | 로딩 인디케이터     |

### 문서 사이트 (Docs)

| 분류                | 기술              | 버전   | 용도                   |
| ------------------- | ----------------- | ------ | ---------------------- |
| **프레임워크**      | Next.js           | 14.x   | 문서 사이트 프레임워크 |
| **스타일링**        | Tailwind CSS      | 3.x    | 문서 사이트 스타일링   |
| **MDX**             | Contentlayer      | latest | 마크다운 처리          |
| **검색**            | Algolia DocSearch | latest | 문서 검색 (선택)       |
| **코드 하이라이팅** | Shiki             | latest | 코드 블록 하이라이팅   |

### 배포 & DevOps

| 분류               | 기술           | 용도                    |
| ------------------ | -------------- | ----------------------- |
| **CI/CD**          | GitHub Actions | 자동 테스트, 빌드, 배포 |
| **NPM 레지스트리** | npmjs.com      | 패키지 배포             |
| **문서 호스팅**    | Vercel         | Docs 사이트 배포        |
| **모니터링**       | Sentry         | 에러 모니터링 (선택)    |

---

## 🎨 스타일링: Tailwind CSS + KRDS

### 왜 Tailwind CSS인가?

```
✅ 빠른 개발
   - 유틸리티 클래스로 즉시 스타일링
   - CSS 파일 작성 최소화

✅ 일관성 유지
   - Design Token 시스템과 완벽 통합
   - KRDS 컬러, 간격을 Tailwind config에 정의

✅ 성능 최적화
   - PurgeCSS로 사용하지 않는 CSS 제거
   - 최종 CSS 파일 크기 최소화

✅ 개발자 경험
   - IDE 자동완성 지원
   - 클래스명 충돌 없음
```

### Tailwind Config (KRDS 통합)

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // KRDS 공식 컬러 팔레트
        primary: {
          DEFAULT: '#0066CC',
          50: '#E6F0FF',
          100: '#CCE0FF',
          // ... 나머지 shade
        },
        secondary: {
          DEFAULT: '#00A896',
          // ...
        },
        gray: {
          50: '#F7F8FA',
          100: '#E8EAED',
          // ...
          900: '#191F28',
        },
      },
      fontFamily: {
        sans: ['Noto Sans KR', 'Malgun Gothic', 'sans-serif'],
        mono: ['Fira Code', 'D2Coding', 'monospace'],
      },
      fontSize: {
        // KRDS Type Scale
        display: ['4rem', { lineHeight: '1.1' }],
        h1: ['3rem', { lineHeight: '1.2' }],
        h2: ['2rem', { lineHeight: '1.3' }],
        h3: ['1.5rem', { lineHeight: '1.4' }],
        body: ['1rem', { lineHeight: '1.6' }],
        small: ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        // KRDS 8px Grid
        xs: '0.25rem', // 4px
        sm: '0.5rem', // 8px
        md: '1rem', // 16px
        lg: '1.5rem', // 24px
        xl: '2rem', // 32px
        '2xl': '3rem', // 48px
      },
      screens: {
        // KRDS Breakpoints
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1440px',
      },
    },
  },
  plugins: [],
} satisfies Config;
```

---

## 🧩 컴포넌트: Headless UI

### 왜 Headless UI인가?

```
✅ 접근성 자동 보장
   - WCAG 2.1 AA 기준 자동 준수
   - ARIA 속성 자동 설정
   - 키보드 네비게이션 자동 구현
   - Focus Management 자동

✅ 복잡한 인터랙션 간소화
   - Modal: Focus Trap, ESC 닫기 자동
   - Select: 키보드 탐색, ARIA 자동
   - Combobox: 검색 + 선택 통합

✅ 완전한 스타일 자유도
   - Unstyled 컴포넌트 (Headless)
   - Tailwind CSS로 KRDS 스타일 100% 적용 가능

✅ React 생태계와 완벽 통합
   - React 18+ 지원
   - TypeScript 타입 완벽 지원
```

### Headless UI 사용 컴포넌트

| HANUI 컴포넌트      | Headless UI 기반 | 이유                            |
| ------------------- | ---------------- | ------------------------------- |
| **Modal**           | `<Dialog>`       | Focus Trap, ARIA, ESC 닫기 자동 |
| **Select**          | `<Listbox>`      | 키보드 탐색, 다중 선택 자동     |
| **Combobox**        | `<Combobox>`     | 검색 + 선택 통합, ARIA 자동     |
| **Tabs** (P1)       | `<Tab>`          | 키보드 탐색, ARIA 자동          |
| **Disclosure** (P1) | `<Disclosure>`   | Accordion, 상태 관리 자동       |
| **Menu** (P1)       | `<Menu>`         | 드롭다운 메뉴, 키보드 탐색 자동 |

### 직접 구현 컴포넌트

| HANUI 컴포넌트 | 구현 방식 | 이유                  |
| -------------- | --------- | --------------------- |
| **Button**     | 직접 구현 | 단순, Tailwind로 충분 |
| **Input**      | 직접 구현 | 단순, 폼 통합 필요    |
| **Card**       | 직접 구현 | 레이아웃 컴포넌트     |
| **Table**      | 직접 구현 | 복잡한 데이터 표시    |
| **Pagination** | 직접 구현 | KRDS 특화 디자인      |
| **Breadcrumb** | 직접 구현 | 단순, 시맨틱 마크업   |
| **FileUpload** | 직접 구현 | 드래그 앤 드롭 커스텀 |

---

## 📊 개발 시간 영향

### Headless UI 사용 효과

| 컴포넌트        | 기존 예상 | Headless UI 사용 | 절감    |
| --------------- | --------- | ---------------- | ------- |
| Modal           | 10h       | 8h               | -2h     |
| Select          | 10h       | 8h               | -2h     |
| Combobox (검색) | 포함      | 포함             | -       |
| **총합**        | 20h       | 16h              | **-4h** |

### 업데이트된 총 개발 시간

```
Epic 1:  9h   (Setup)
Epic 2:  17h  (Design System + Tailwind: +2h)
Epic 3:  70h  (Components: -4h)
Epic 4:  39h  (CLI + Templates)
Epic 5:  30h  (Docs)
Epic 6:  14h  (Release)

총합: 179h (약 22일, 하루 8시간 기준)
```

---

## 🔧 개발 환경 설정

### 필수 설치

```bash
# Node.js 20+
node --version  # v20.x.x

# pnpm
npm install -g pnpm

# GitHub CLI (이슈 생성용)
brew install gh
gh auth login
```

### VSCode 확장

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss", // Tailwind CSS IntelliSense
    "dbaeumer.vscode-eslint", // ESLint
    "esbenp.prettier-vscode", // Prettier
    "bradlc.vscode-tailwindcss", // Tailwind 자동완성
    "gruntfuggly.todo-tree", // TODO 하이라이팅
    "github.copilot" // GitHub Copilot (선택)
  ]
}
```

### 프로젝트 설정

```bash
# 1. 저장소 클론
git clone https://github.com/hanui-o/hanui.git
cd hanui

# 2. Dependencies 설치
pnpm install

# 3. 빌드
pnpm build

# 4. 개발 서버 시작
pnpm dev
```

---

## 📚 학습 자료

### Tailwind CSS

- [공식 문서](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com/) - 프리미엄 컴포넌트 (참고용)
- [Tailwind Play](https://play.tailwindcss.com/) - 온라인 에디터

### Headless UI

- [공식 문서](https://headlessui.com/)
- [GitHub](https://github.com/tailwindlabs/headlessui)
- [Dialog 예제](https://headlessui.com/react/dialog)
- [Listbox 예제](https://headlessui.com/react/listbox)
- [Combobox 예제](https://headlessui.com/react/combobox)

### KRDS

- [KRDS 공식 사이트](https://www.krds.go.kr/)
- [KRDS 컬러 팔레트](https://www.krds.go.kr/color)
- [KRDS 컴포넌트 가이드](https://www.krds.go.kr/component)

---

## 🎯 다음 단계

### Issue #2 시작 시

```bash
# 1. 브랜치 생성
git checkout -b feat/setup-typescript-tailwind

# 2. Tailwind CSS 설치
pnpm add -D tailwindcss postcss autoprefixer
pnpm dlx tailwindcss init -p

# 3. Headless UI 설치
pnpm add @headlessui/react

# 4. Tailwind Config 작성 (KRDS 컬러 추가)
# tailwind.config.ts 참고

# 5. 개발 시작
pnpm dev
```

---

**작성자**: @odada-o
**작성일**: 2025-01-08
**버전**: v1.0
**Status**: ✅ 기술 스택 확정 → 🚀 개발 준비 완료

**Next Action**: Issue #1 (Monorepo 설정) 시작
