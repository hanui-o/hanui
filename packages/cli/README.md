# create-hanui-app

> KRDS 기반 공공 웹 프로젝트 생성 CLI

HANUI 기반 공공 웹사이트 프로젝트를 빠르게 생성하는 CLI 도구입니다.

## 사용법

```bash
# npm
npm create hanui-app

# pnpm
pnpm create hanui-app

# yarn
yarn create hanui-app

# 프로젝트명 직접 지정
pnpm create hanui-app my-portal-app
```

## 기능

- ✅ **인터랙티브 프롬프트**: 프로젝트 설정을 단계별로 안내
- ✅ **프레임워크 선택**: React (Vue 준비 중)
- ✅ **템플릿 선택**: Portal, Admin, Both
- ✅ **자동 설치**: Dependencies 자동 설치 (pnpm)
- ✅ **Git 초기화**: 선택적 Git 저장소 초기화
- ✅ **KRDS 디자인**: 공공 웹 디자인 시스템 완벽 지원

## 템플릿

### Portal (민원 포털)

시민 대상 민원 포털 템플릿

- React 18 + TypeScript
- Vite
- HANUI Components

### Admin (관리자)

관리자용 백오피스 템플릿 (Coming soon)

### Both (Portal + Admin)

포털 + 관리자 멀티 앱 (Coming soon)

## 기술 스택

- **빌드 도구**: Vite
- **언어**: TypeScript
- **패키지 매니저**: pnpm
- **컴포넌트**: @hanui/react

## 문서

- [HANUI Documentation](https://hanui.io)
- [KRDS Design System](https://uiux.egovframe.go.kr/)

## 라이선스

MIT © [odada-o](https://github.com/odada-o)
