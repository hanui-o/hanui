# @hanui/react

> KRDS 기반 공공 웹사이트용 React 컴포넌트 라이브러리

[![npm version](https://img.shields.io/npm/v/@hanui/react.svg)](https://www.npmjs.com/package/@hanui/react)
[![license](https://img.shields.io/npm/l/@hanui/react.svg)](https://github.com/hanui-o/hanui/blob/main/LICENSE)

[한국어](#한국어) | [English](#english)

---

## 한국어

### 소개

HANUI는 [KRDS(Korea Republic Design System)](https://github.com/korea-design-system/krds)를 완벽히 준수하는 React 컴포넌트 라이브러리입니다. 공공기관 웹사이트 개발을 위한 접근성(WCAG 2.1 AA)과 사용성을 갖춘 컴포넌트를 제공합니다.

### 특징

- 🎨 **KRDS 100% 준수**: 공공 웹 디자인 시스템 완벽 준수
- ♿️ **접근성 AA 등급**: WCAG 2.1 AA 준수 및 스크린 리더 지원
- ⚡️ **즉시 사용 가능**: 9개의 핵심 컴포넌트 제공
- 🌙 **다크 모드**: 라이트/다크 테마 지원
- 📦 **TypeScript**: 완전한 타입 지원
- 🎯 **Tree-shaking**: ESM 지원으로 최적화된 번들 크기

### 설치

```bash
# pnpm (권장)
pnpm add @hanui/react

# npm
npm install @hanui/react

# yarn
yarn add @hanui/react

# bun
bun add @hanui/react
```

### 빠른 시작

```tsx
import { Button } from '@hanui/react';
import '@hanui/react/styles.css';

function App() {
  return (
    <Button variant="primary" size="medium">
      클릭하세요
    </Button>
  );
}
```

### 프로젝트 생성 (권장)

```bash
pnpm create hanui-app my-project
cd my-project
pnpm dev
```

### 컴포넌트 목록

- **Button**: 다양한 스타일의 버튼 컴포넌트
- **Input**: 폼 입력 필드
- **Card**: 콘텐츠 카드
- **Table**: 데이터 테이블
- **Pagination**: 페이지네이션
- **Breadcrumb**: 네비게이션 경로
- **Modal**: 모달 다이얼로그
- **Select**: 드롭다운 선택
- **FileUpload**: 파일 업로드

### 문서

전체 문서는 [https://hanui.io](https://hanui.io)에서 확인하세요.

### 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)

### 라이선스

MIT © [odada-o](https://github.com/odada-o)

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

### Installation

```bash
# pnpm (recommended)
pnpm add @hanui/react

# npm
npm install @hanui/react

# yarn
yarn add @hanui/react

# bun
bun add @hanui/react
```

### Quick Start

```tsx
import { Button } from '@hanui/react';
import '@hanui/react/styles.css';

function App() {
  return (
    <Button variant="primary" size="medium">
      Click me
    </Button>
  );
}
```

### Create Project (Recommended)

```bash
pnpm create hanui-app my-project
cd my-project
pnpm dev
```

### Components

- **Button**: Button component with various styles
- **Input**: Form input field
- **Card**: Content card
- **Table**: Data table
- **Pagination**: Pagination component
- **Breadcrumb**: Navigation breadcrumb
- **Modal**: Modal dialog
- **Select**: Dropdown select
- **FileUpload**: File upload

### Documentation

Visit [https://hanui.io](https://hanui.io) for full documentation.

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### License

MIT © [odada-o](https://github.com/odada-o)
