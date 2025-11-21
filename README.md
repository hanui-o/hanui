# HANUI

<div align="center">

> **🇰🇷 KRDS 준수 React 컴포넌트 라이브러리**

[![npm version](https://img.shields.io/npm/v/@hanui/react.svg)](https://www.npmjs.com/package/@hanui/react)
[![license](https://img.shields.io/npm/l/@hanui/react.svg)](./LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/hanui-o/hanui)](https://github.com/hanui-o/hanui/stargazers)

[문서](https://hanui.io) · [컴포넌트](https://hanui.io/components) · [가이드](https://hanui.io/docs/introduction) · [블로그](https://velog.io/@hanui/)

[한국어](#한국어) | [English](#english)

</div>

---

## 한국어

### 소개

HANUI는 [KRDS(Korea Republic Design System)](https://github.com/korea-design-system/krds)를 완벽히 준수하는 React 컴포넌트 라이브러리입니다. 공공기관 웹사이트 개발을 위한 접근성(WCAG 2.1 AA)과 사용성을 갖춘 컴포넌트를 제공합니다.

> **🚧 개발 진행 중**
>
> HANUI는 현재 활발히 개발 중입니다. 피드백과 기여를 환영합니다!
> [이슈 남기기](https://github.com/hanui-o/hanui/issues) · [디스커션 참여](https://github.com/hanui-o/hanui/discussions)

### ✨ 왜 HANUI인가?

HANUI는 한국 공공기관 웹사이트 개발의 고질적인 문제를 해결합니다:

- ❌ **문제**: KRDS 준수를 위해 매번 컴포넌트를 처음부터 개발
- ❌ **문제**: 접근성 요구사항을 일일이 구현하는 번거로움
- ❌ **문제**: 디자인 시스템과 코드의 불일치

→ ✅ **HANUI 솔루션**: KRDS를 완벽히 준수하는 즉시 사용 가능한 컴포넌트 제공

### 🎯 특징

- 🎨 **KRDS 100% 준수**: 공공 웹 디자인 시스템 완벽 준수
- ♿️ **접근성 AA 등급**: WCAG 2.1 AA 준수 및 스크린 리더 지원
- 🛠️ **CLI 도구**: shadcn/ui 스타일의 간편한 컴포넌트 설치
- 📦 **TypeScript**: 완전한 타입 지원으로 안전한 개발
- 🎯 **Tree-shaking**: ESM 지원으로 최적화된 번들 크기
- 🎨 **커스터마이징**: Tailwind CSS 기반으로 쉬운 스타일 수정

### 📦 컴포넌트

#### 현재 제공 중 (13개)

- **Button, Input, Textarea** - 기본 폼 요소
- **Select, Radio, Checkbox** - 선택 컴포넌트
- **Card, Badge** - 콘텐츠 표시
- **Table, Pagination** - 데이터 표시
- **Modal, Tabs** - 인터랙션
- **Breadcrumb** - 네비게이션

#### 개발 예정

- **Form** - 폼 검증 및 관리
- **Toast** - 알림 메시지
- **Dropdown** - 드롭다운 메뉴
- **Accordion** - 접을 수 있는 콘텐츠
- **더 많은 컴포넌트 추가 예정...**

→ [전체 컴포넌트 보기](https://hanui.io/components)

### 🚀 빠른 시작

#### 새 프로젝트 생성

```bash
# HANUI 프로젝트 생성
npx create-hanui-app my-project

# 프로젝트 디렉토리 이동
cd my-project

# 프로젝트 초기화
npx hanui init

# 컴포넌트 추가
npx hanui add button card input

# 개발 서버 실행
npm run dev
```

#### 기존 프로젝트에 추가

```bash
# 프로젝트 초기화
npx hanui init

# 컴포넌트 추가
npx hanui add button card
```

```tsx
// 컴포넌트 사용 예제
import { Button } from '@/components/hanui/button';
import { Input } from '@/components/hanui/input';
import { Card } from '@/components/hanui/card';

export default function MyPage() {
  return (
    <Card>
      <h2>로그인</h2>
      <Input placeholder="이메일" type="email" />
      <Input placeholder="비밀번호" type="password" />
      <Button>로그인</Button>
    </Card>
  );
}
```

→ [자세한 설치 가이드 보기](https://hanui.io/docs/installation)

### 📦 패키지

이 저장소는 [Turborepo](https://turbo.build/repo)와 [pnpm workspace](https://pnpm.io/workspaces)를 사용하는 모노레포입니다.

#### packages/

- **[@hanui/cli](./packages/cli)** - CLI 도구 ([NPM](https://www.npmjs.com/package/@hanui/cli))
- **[@hanui/react](./packages/react)** - React 컴포넌트 소스
- **[@hanui/registry](./packages/registry)** - 컴포넌트 레지스트리

#### apps/

- **[docs](./apps/docs)** - 문서 사이트 (Next.js)

## 🚀 시작하기

### 필수 요구사항

- Node.js >= 20.0.0
- pnpm >= 9.0.0

### 설치

```bash
pnpm install
```

### 개발

```bash
# 전체 패키지 개발 모드
pnpm dev

# 특정 패키지만 개발
pnpm --filter @hanui/react dev
pnpm --filter docs dev
```

### 빌드

```bash
# 전체 빌드
pnpm build

# 특정 패키지만 빌드
pnpm --filter @hanui/react build
```

### Lint

```bash
pnpm lint
```

### Format

```bash
pnpm format
```

## 📚 문서

- **시작하기**: [설치 가이드](https://hanui.io/docs/installation) · [빠른 시작](https://hanui.io/docs/quick-start)
- **컴포넌트**: [전체 목록](https://hanui.io/components) · [사용 예제](https://hanui.io/components)
- **디자인 시스템**: [Typography](https://hanui.io/design-system/typography) · [Colors](https://hanui.io/design-system/colors) · [Spacing](https://hanui.io/design-system/spacing)
- **개발 블로그**: [Velog @hanui](https://velog.io/@hanui/)

## 🗺️ 로드맵

### v0.2.0 (진행 중)

- [ ] 스타터 킷 (Portal/Admin 템플릿)
- [ ] Form 컴포넌트 + 검증
- [ ] Toast 알림
- [ ] Dropdown 메뉴

### v0.3.0 (계획)

- [ ] DataGrid 고급 테이블
- [ ] 차트 컴포넌트
- [ ] 파일 업로드 고도화
- [ ] 다국어 지원

### v1.0.0 (목표)

- [ ] 모든 KRDS 컴포넌트 완성
- [ ] 프리미엄 템플릿
- [ ] Figma 플러그인
- [ ] Storybook 문서

## 🤝 기여하기

HANUI는 오픈소스 프로젝트입니다. 기여를 환영합니다!

- 🐛 **버그 제보**: [이슈 생성하기](https://github.com/hanui-o/hanui/issues/new)
- 💡 **기능 제안**: [디스커션 시작하기](https://github.com/hanui-o/hanui/discussions/new)
- 📝 **문서 개선**: [PR 보내기](https://github.com/hanui-o/hanui/pulls)
- ⭐ **프로젝트 응원**: [Star 주기](https://github.com/hanui-o/hanui)

## 💬 커뮤니티

- **GitHub Discussions**: [토론 참여하기](https://github.com/hanui-o/hanui/discussions)
- **Blog**: [개발 과정 공유](https://velog.io/@hanui/)
- **Email**: odada@oddodd.io

## 📄 라이선스

MIT © [hanui-o](https://github.com/hanui-o)

---

<div align="center">

**HANUI로 더 나은 공공 웹을 만들어가요 🇰🇷**

[시작하기](https://hanui.io/docs/quick-start) · [컴포넌트 보기](https://hanui.io/components) · [Star 주기 ⭐](https://github.com/hanui-o/hanui)

</div>

---

## English

### Introduction

HANUI is a React component library that fully complies with [KRDS (Korea Republic Design System)](https://github.com/korea-design-system/krds). It provides accessible (WCAG 2.1 AA) and user-friendly components for Korean government websites.

> **🚧 Under Active Development**
>
> HANUI is currently in active development. Feedback and contributions are welcome!

### ✨ Why HANUI?

HANUI solves common pain points in Korean public website development:

- ❌ **Problem**: Building KRDS-compliant components from scratch every time
- ❌ **Problem**: Tedious accessibility implementation
- ❌ **Problem**: Design system and code inconsistency

→ ✅ **HANUI Solution**: Ready-to-use components with perfect KRDS compliance

### Features

- 🎨 **100% KRDS Compliant**: Perfect adherence to Korean public web design system
- ♿️ **AA Accessibility**: WCAG 2.1 AA compliant with screen reader support
- 🛠️ **CLI Tool**: shadcn/ui-style easy component installation
- 📦 **TypeScript**: Full type support for safe development
- 🎯 **Tree-shaking**: Optimized bundle size with ESM support
- 🎨 **Customizable**: Easy styling with Tailwind CSS

### Quick Start

```bash
# Initialize project
npx hanui init my-project

# Navigate to project
cd my-project

# Add components
npx hanui add button input

# Start dev server
npm run dev
```

Or install in existing project:

```bash
npm install @hanui/react

# Tailwind CSS setup (required)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Documentation

- **Getting Started**: [Installation Guide](https://hanui.io/docs/installation)
- **Components**: [Full List](https://hanui.io/components)
- **Design System**: [Typography](https://hanui.io/design-system/typography) · [Colors](https://hanui.io/design-system/colors)

### Community

- **GitHub Discussions**: [Join Discussion](https://github.com/hanui-o/hanui/discussions)
- **Blog**: [Development Stories](https://velog.io/@hanui/)
- **Email**: odada@oddodd.io

### License

MIT © [hanui-o](https://github.com/hanui-o)

---

<div align="center">

**Building better public web with HANUI 🇰🇷**

[Get Started](https://hanui.io/docs/quick-start) · [View Components](https://hanui.io/components) · [Star ⭐](https://github.com/hanui-o/hanui)

</div>
