# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2025-11-12

### 🎉 First Official Release

This is the first official stable release of HANUI, a KRDS-compliant component library for public sector web applications.

#### @hanui/react

**Core Components (9)**

- Button - Multiple variants (primary, secondary, success, danger, ghost, outline) and sizes
- Input - Form input field with validation states
- Card - Content card container
- Table - Data table with sorting and pagination support
- Pagination - Page navigation component
- Breadcrumb - Navigation path indicator
- Modal - Modal dialog with overlay
- Select - Dropdown selection component
- FileUpload - File upload with drag & drop support

**Design System**

- Complete KRDS color token system (Primary, Gray scales)
- KRDS typography token system
- Dark mode support with automatic system detection
- Accessibility compliance (WCAG 2.1 AA)

**Developer Experience**

- Full TypeScript support with type definitions
- ESM and CJS bundles
- Tree-shaking optimization
- Comprehensive JSDoc documentation
- Zero dependencies (except peer deps)

#### create-hanui-app

**Project Creation CLI**

- Interactive project setup wizard
- Three template options:
  - Portal Template - Customer-facing web portal
  - Admin Template - Administrative dashboard
  - Both Templates - Combined setup
- Automatic dependency installation
- Git initialization option
- Ready-to-use Vite + React + TypeScript setup

#### Documentation Site

**Features**

- Next.js 15 App Router based documentation
- Comprehensive component documentation with:
  - Live examples
  - API reference tables
  - Accessibility guidelines
  - Usage best practices
- Dark mode support
- Responsive design
- MDX support for rich content
- Deployed at hanui.io (pending)

**Infrastructure**

- GitHub Actions CI/CD pipeline
- Changesets for version management
- Automated NPM publishing workflow
- Vercel deployment configuration

### Migration from Alpha

If you're upgrading from v0.1.0-alpha.1:

1. Update your dependencies:

```bash
pnpm update @hanui/react
```

2. No breaking changes - all alpha APIs are stable

### What's Next (v0.2.0)

- Additional components (Tooltip, Tabs, Accordion, etc.)
- Component API auto-generation system
- Figma design kit
- Storybook integration
- Enhanced testing coverage

## [0.1.0-alpha.1] - 2024-11-11

### Added

#### @hanui/react

- Initial alpha release
- 9 core components:
  - Button (다양한 variant와 size 지원)
  - Input (폼 입력 필드)
  - Card (콘텐츠 카드)
  - Table (데이터 테이블)
  - Pagination (페이지네이션)
  - Breadcrumb (네비게이션 경로)
  - Modal (모달 다이얼로그)
  - Select (드롭다운 선택)
  - FileUpload (파일 업로드)
- KRDS 색상 토큰 시스템 (Primary, Gray 전체 스케일)
- KRDS 타이포그래피 토큰 시스템
- TypeScript 완전 지원
- Dark mode 지원
- ESM 및 CJS 번들 제공
- Tree-shaking 지원

#### create-hanui-app

- CLI 도구 첫 배포
- 인터랙티브 프로젝트 생성 프롬프트
- React Portal 템플릿 제공
- Vite + TypeScript 설정
- 자동 dependencies 설치
- Git 초기화 옵션

#### Documentation

- Next.js 15 기반 문서 사이트 구축
- 홈페이지 및 컴포넌트 목록 페이지
- Button 컴포넌트 상세 문서
- Dark mode 지원
- KRDS 디자인 시스템 적용

### Infrastructure

- Turborepo + pnpm monorepo 설정
- ESLint, Prettier 설정
- Husky pre-commit hooks
- GitHub repository 초기 설정

[unreleased]: https://github.com/odada-o/hanui/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/odada-o/hanui/releases/tag/v0.1.0
[0.1.0-alpha.1]: https://github.com/odada-o/hanui/releases/tag/v0.1.0-alpha.1
