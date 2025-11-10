# HANUI

> Korean Government Design System (KRDS) based React Component Library

공공 웹사이트 개발을 위한 React 컴포넌트 라이브러리입니다.

## 📦 Packages

이 저장소는 [Turborepo](https://turbo.build/repo)와 [pnpm workspace](https://pnpm.io/workspaces)를 사용하는 모노레포입니다.

### packages/

- `@hanui/react` - React 컴포넌트 라이브러리
- `create-hanui-app` - CLI 도구

### apps/

- `docs` - 문서 사이트 (Next.js)

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

문서 사이트: [https://hanui.kr](https://hanui.kr) (준비 중)

## 🤝 기여

Issue와 PR을 환영합니다!

## 📄 라이선스

MIT

## 📮 문의

GitHub Issues: https://github.com/odada-o/hanui/issues
