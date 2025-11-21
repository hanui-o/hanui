# @hanui/cli

> KRDS 기반 HANUI 프로젝트 CLI

HANUI 컴포넌트를 사용하는 프로젝트를 빠르게 생성하고 관리하는 CLI 도구입니다.

## 사용법

### 새 프로젝트 생성

```bash
npx create-hanui-app
```

### 프로젝트 초기화

```bash
npx hanui init
```

### 컴포넌트 추가

```bash
# 단일 컴포넌트
npx hanui add button

# 여러 컴포넌트
npx hanui add button card input

# 인터랙티브 선택
npx hanui add
```

## 주요 기능

- **프로젝트 생성**: Next.js + Tailwind CSS + KRDS preset 자동 설정
- **프로젝트 감지**: src 폴더 유무 자동 감지 및 경로 설정
- **컴포넌트 추가**: 필요한 컴포넌트만 선택하여 프로젝트에 복사
- **의존성 관리**: 컴포넌트별 필수 패키지 자동 설치
- **경로 변환**: import 경로 자동 변환 (@/ alias)

## 기술 스택

- **프레임워크**: Next.js 15
- **언어**: TypeScript
- **스타일**: Tailwind CSS 4 + KRDS preset
- **디자인 시스템**: KRDS (Korean Government Design System)

## 문서

- [HANUI Documentation](https://hanui.io)
- [Installation Guide](https://hanui.io/docs/installation)
- [KRDS Design System](https://uiux.egovframe.go.kr/)

## 라이선스

MIT © [hanui-o](https://github.com/hanui-o)
