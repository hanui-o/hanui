# pnpm workspace로 모노레포 세팅하기

tags : Monorepo, pnpm, workspace, 프론트엔드, React, 프로젝트구조

여러 패키지 관리하다 보면 각 레포에서 버전 맞추기, 코드 공유하기 점점 귀찮아지죠.

모노레포로 가면 이런 문제가 해결돼요. pnpm workspace가 가장 세팅하기 쉬워요.

## 왜 pnpm인가

|                | npm  | yarn | pnpm                    |
| -------------- | ---- | ---- | ----------------------- |
| 디스크 공간    | 높음 | 높음 | 낮음 (하드링크)         |
| 설치 속도      | 느림 | 보통 | 빠름                    |
| workspace 지원 | 있음 | 있음 | 더 좋음                 |
| Strict mode    | 없음 | 없음 | 있음 (유령 의존성 방지) |

pnpm은 디스크 공간 아끼면서 속도도 빨라요.

## 기본 구조

```
my-monorepo/
├── package.json
├── pnpm-workspace.yaml
├── apps/
│   ├── web/            # Next.js 앱
│   └── admin/          # 관리자 앱
├── packages/
│   ├── ui/             # 공통 UI 컴포넌트
│   ├── utils/          # 유틸 함수
│   └── config/         # 공통 설정 (ESLint, TSConfig)
└── pnpm-lock.yaml
```

## Step 1: 초기 설정

```bash
mkdir my-monorepo && cd my-monorepo
pnpm init
```

```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

```json
// package.json (root)
{
  "name": "my-monorepo",
  "private": true,
  "scripts": {
    "dev": "pnpm -r dev",
    "build": "pnpm -r build",
    "lint": "pnpm -r lint"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

`-r` 플래그가 모든 패키지에서 스크립트 실행해요.

## Step 2: 공통 UI 패키지

```bash
mkdir -p packages/ui
cd packages/ui
pnpm init
```

```json
// packages/ui/package.json
{
  "name": "@my/ui",
  "version": "0.0.1",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "dev": "tsc --watch",
    "build": "tsc"
  },
  "peerDependencies": {
    "react": "^18.0.0"
  }
}
```

```tsx
// packages/ui/src/index.ts
export { Button } from './Button';
export { Card } from './Card';

// packages/ui/src/Button.tsx
export function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {children}
    </button>
  );
}
```

## Step 3: 앱에서 패키지 사용

```bash
mkdir -p apps/web
cd apps/web
pnpm create next-app . --typescript
```

```bash
# 워크스페이스 패키지 추가
pnpm add @my/ui --workspace
```

```json
// apps/web/package.json
{
  "name": "@my/web",
  "dependencies": {
    "@my/ui": "workspace:*"
  }
}
```

```tsx
// apps/web/app/page.tsx
import { Button } from '@my/ui';

export default function Home() {
  return <Button onClick={() => alert('hi')}>Click me</Button>;
}
```

`workspace:*`가 로컬 패키지 연결해요. 변경 사항이 바로 반영돼요.

## Step 4: 공통 설정 패키지

ESLint, TypeScript 설정 공유하기:

```json
// packages/config/package.json
{
  "name": "@my/config",
  "version": "0.0.1",
  "main": "index.js"
}
```

```js
// packages/config/eslint.js
module.exports = {
  extends: ['next', 'prettier'],
  rules: {
    'no-console': 'warn',
  },
};
```

```json
// packages/config/tsconfig.base.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "react-jsx"
  }
}
```

앱에서 사용:

```js
// apps/web/.eslintrc.js
module.exports = {
  extends: [require.resolve('@my/config/eslint')],
};
```

```json
// apps/web/tsconfig.json
{
  "extends": "@my/config/tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 유용한 명령어

```bash
# 특정 패키지에서만 실행
pnpm --filter @my/web dev

# 의존성 있는 패키지까지 빌드
pnpm --filter @my/web... build

# 새 의존성 추가 (특정 패키지에)
pnpm add lodash --filter @my/utils

# 루트에 dev 의존성 추가
pnpm add -Dw eslint
```

## 패키지 간 의존성

```bash
# @my/ui가 @my/utils를 사용
cd packages/ui
pnpm add @my/utils --workspace
```

```json
// packages/ui/package.json
{
  "dependencies": {
    "@my/utils": "workspace:*"
  }
}
```

## Turborepo 추가 (선택)

빌드 캐싱, 병렬 실행 최적화:

```bash
pnpm add -Dw turbo
```

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {}
  }
}
```

```json
// package.json
{
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint"
  }
}
```

빌드 결과 캐싱되니까 두 번째부터 엄청 빨라요.

## 흔한 이슈

### 1. 유령 의존성

```bash
# pnpm은 기본적으로 strict
# 명시적으로 추가하지 않은 패키지 못 씀
pnpm add lodash  # 직접 추가해야 함
```

### 2. Next.js Transpile 설정

```js
// apps/web/next.config.js
module.exports = {
  transpilePackages: ['@my/ui', '@my/utils'],
};
```

### 3. TypeScript paths

```json
// apps/web/tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@my/ui": ["../../packages/ui/src"],
      "@my/utils": ["../../packages/utils/src"]
    }
  }
}
```

## 최종 구조

```
my-monorepo/
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── apps/
│   ├── web/
│   │   ├── package.json
│   │   └── next.config.js
│   └── admin/
├── packages/
│   ├── ui/
│   │   ├── package.json
│   │   └── src/
│   ├── utils/
│   └── config/
│       ├── eslint.js
│       └── tsconfig.base.json
└── pnpm-lock.yaml
```

## 정리

1. `pnpm-workspace.yaml`로 워크스페이스 정의
2. `workspace:*`로 로컬 패키지 연결
3. 공통 설정은 packages/config에
4. Turborepo 추가하면 빌드 캐싱
5. `--filter`로 특정 패키지만 실행

처음엔 복잡해 보이는데, 한번 세팅하면 패키지 관리가 훨씬 편해져요.
