# HANUI

<div align="center">

> **KRDS 기반 공공 웹사이트용 React 컴포넌트 라이브러리**

[![npm version](https://img.shields.io/npm/v/@hanui/react.svg)](https://www.npmjs.com/package/@hanui/react)
[![license](https://img.shields.io/npm/l/@hanui/react.svg)](./LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/hanui-o/hanui)](https://github.com/hanui-o/hanui/stargazers)

[한국어](#한국어) | [English](#english)

</div>

---

## 한국어

### 소개

HANUI는 [KRDS(Korea Republic Design System)](https://github.com/korea-design-system/krds)를 완벽히 준수하는 React 컴포넌트 라이브러리입니다. 공공기관 웹사이트 개발을 위한 접근성(WCAG 2.1 AA)과 사용성을 갖춘 컴포넌트를 제공합니다.

> **🎉 v0.1.0 First Stable Release (2025-11-12)**
>
> HANUI의 첫 번째 안정 버전이 출시되었습니다! 9개의 핵심 컴포넌트, 완전한 KRDS 준수, 그리고 즉시 사용 가능한 템플릿을 제공합니다.

### 특징

- 🎨 **KRDS 100% 준수**: 공공 웹 디자인 시스템 완벽 준수
- ♿️ **접근성 AA 등급**: WCAG 2.1 AA 준수 및 스크린 리더 지원
- ⚡️ **즉시 사용 가능**: 9개의 핵심 컴포넌트 제공
- 🌙 **다크 모드**: 라이트/다크 테마 지원
- 📦 **TypeScript**: 완전한 타입 지원
- 🎯 **Tree-shaking**: ESM 지원으로 최적화된 번들 크기

### 컴포넌트

현재 제공되는 9개 핵심 컴포넌트:

- **Button** - 다양한 variant와 size 지원
- **Input** - 폼 입력 필드
- **Card** - 콘텐츠 카드
- **Table** - 데이터 테이블
- **Pagination** - 페이지네이션
- **Breadcrumb** - 네비게이션 경로
- **Modal** - 모달 다이얼로그
- **Select** - 드롭다운 선택
- **FileUpload** - 파일 업로드

### 빠른 시작

#### 1. CLI로 새 프로젝트 생성

```bash
# Portal, Admin, 또는 Both 템플릿 중 선택
pnpm create hanui-app my-project

# 개발 서버 실행
cd my-project
pnpm dev
```

#### 2. 기존 프로젝트에 설치

```bash
# pnpm
pnpm add @hanui/react

# npm
npm install @hanui/react

# yarn
yarn add @hanui/react

# bun
bun add @hanui/react
```

```tsx
// 컴포넌트 사용
import { Button } from '@hanui/react';

function App() {
  return <Button>클릭하세요</Button>;
}
```

### 📦 패키지

이 저장소는 [Turborepo](https://turbo.build/repo)와 [pnpm workspace](https://pnpm.io/workspaces)를 사용하는 모노레포입니다.

#### packages/

- **[@hanui/react](./packages/react)** - React 컴포넌트 라이브러리 ([NPM](https://www.npmjs.com/package/@hanui/react))
- **[create-hanui-app](./packages/cli)** - CLI 도구 ([NPM](https://www.npmjs.com/package/create-hanui-app))

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

전체 문서는 [https://hanui.io](https://hanui.io)에서 확인하세요.

## 🤝 기여

이슈와 PR을 환영합니다! 기여하기 전에 이슈를 먼저 열어주세요.

## 📄 라이선스

MIT © [hanui-o](https://github.com/hanui-o)

## 📮 문의

- GitHub Issues: https://github.com/hanui-o/hanui/issues
- NPM: [@hanui/react](https://www.npmjs.com/package/@hanui/react)
- Documentation: https://hanui.io

---

## English

### Introduction

HANUI is a React component library that fully complies with [KRDS (Korea Republic Design System)](https://github.com/korea-design-system/krds). It provides accessible (WCAG 2.1 AA) and user-friendly components for Korean government websites.

### Features

- 🎨 **100% KRDS Compliant**: Perfect adherence to Korean public web design system
- ♿️ **AA Accessibility**: WCAG 2.1 AA compliant with screen reader support
- ⚡️ **Ready to Use**: 9 essential components provided
- 🌙 **Dark Mode**: Light/Dark theme support
- 📦 **TypeScript**: Full type support
- 🎯 **Tree-shaking**: Optimized bundle size with ESM support

### Quick Start

```bash
# Create project
pnpm create hanui-app my-project

# Start development
cd my-project
pnpm dev
```

Or install in existing project:

```bash
# pnpm
pnpm add @hanui/react

# npm
npm install @hanui/react

# yarn
yarn add @hanui/react

# bun
bun add @hanui/react
```

### Documentation

Visit [https://hanui.io](https://hanui.io) for full documentation.

### License

MIT © [hanui-o](https://github.com/hanui-o)
