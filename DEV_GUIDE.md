# 개발 가이드

## 🚀 개발 서버 실행 방법

### 방법 1: 모든 앱 한 번에 실행 (추천 ⭐)

```bash
pnpm dev
```

이 명령어 하나로:

- 📚 **Docs** (문서 사이트) → http://localhost:3000
- 🎮 **Playground** (테스트 앱) → http://localhost:3001

두 개가 동시에 실행됩니다!

### 방법 2: 개별적으로 실행

각각 따로 실행하고 싶을 때:

```bash
# 문서 사이트만 실행 (포트 3000)
pnpm dev:docs

# Playground만 실행 (포트 3001)
pnpm dev:playground
```

### 방법 3: 터미널 2개로 실행 (기존 방식)

```bash
# 터미널 1
cd apps/docs
pnpm dev

# 터미널 2
cd apps/playground
pnpm dev
```

## 📝 각 방법의 장단점

### `pnpm dev` (추천)

✅ 한 번에 모두 실행 - 편리함!
✅ Turborepo가 자동으로 관리
✅ 로그가 한 곳에 모임
❌ 한 앱만 보고 싶을 때 로그가 섞임

### `pnpm dev:docs` / `pnpm dev:playground`

✅ 원하는 앱만 실행 가능
✅ 로그가 깔끔함
❌ 둘 다 필요할 때 명령어 2개 실행

### 직접 폴더 이동 방식

✅ 어떤 폴더에서 뭘 하는지 명확
❌ 매번 cd 명령어 입력
❌ 터미널 여러 개 필요

## 💡 추천 워크플로우

### 문서 작성할 때

```bash
pnpm dev:docs
```

→ 문서 사이트만 보면 되니까 이것만 실행

### 컴포넌트 테스트할 때

```bash
pnpm dev
```

→ 문서(API 확인) + Playground(테스트) 둘 다 필요하니까 함께 실행

### Playground만 실험할 때

```bash
pnpm dev:playground
```

→ 빠른 실험만 할 때

## 🛠 기타 유용한 명령어

### 빌드

```bash
pnpm build              # 모든 패키지 빌드
```

### 린트

```bash
pnpm lint               # 모든 패키지 린트
```

### 클린

```bash
pnpm clean              # node_modules, .next 등 삭제
pnpm install            # 다시 설치
```

## 📦 프로젝트 구조

```
HANUI/
├── apps/
│   ├── docs/           # 문서 사이트 (포트 3000)
│   └── playground/     # 테스트 앱 (포트 3001)
├── packages/
│   ├── react/          # @hanui/react 패키지
│   ├── cli/            # @hanui/cli 패키지
│   └── core/           # @hanui/core 패키지
└── package.json        # 루트 설정
```

## 🎯 빠른 참조

| 하고 싶은 것   | 명령어                       |
| -------------- | ---------------------------- |
| 둘 다 실행     | `pnpm dev`                   |
| 문서만         | `pnpm dev:docs`              |
| Playground만   | `pnpm dev:playground`        |
| 빌드           | `pnpm build`                 |
| 클린 후 재설치 | `pnpm clean && pnpm install` |
