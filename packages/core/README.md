# @hanui/core

> HANUI Design System Core Tokens

KRDS(Korean Government Design System) 기반의 디자인 토큰을 제공합니다.

## Installation

```bash
npm install @hanui/core
# or
pnpm add @hanui/core
```

## Usage

```typescript
import { colors, createCSSVariables } from '@hanui/core';

// Color tokens
console.log(colors.primary[500]); // #0066CC

// Generate CSS variables
const cssVars = createCSSVariables(colors);
```

## Features

- 🎨 KRDS 컬러 팔레트
- 🌗 다크모드 지원
- ♿ WCAG 2.1 AA 접근성 준수
- 📦 TypeScript 타입 정의
- 🎯 CSS Variables 생성 유틸리티
