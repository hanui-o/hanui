# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[unreleased]: https://github.com/odada-o/hanui/compare/v0.1.0-alpha.1...HEAD
[0.1.0-alpha.1]: https://github.com/odada-o/hanui/releases/tag/v0.1.0-alpha.1
