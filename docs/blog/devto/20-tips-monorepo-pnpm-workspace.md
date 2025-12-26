# Setting Up a Monorepo with pnpm Workspaces

---

monorepo, pnpm, javascript, webdev, typescript

Managing multiple packages across different repos gets tedious - version syncing, code sharing, context switching.

A monorepo solves these problems. pnpm workspaces are the easiest to set up.

## Why pnpm

|                   | npm  | yarn   | pnpm                        |
| ----------------- | ---- | ------ | --------------------------- |
| Disk space        | High | High   | Low (hard links)            |
| Install speed     | Slow | Medium | Fast                        |
| Workspace support | Yes  | Yes    | Better                      |
| Strict mode       | No   | No     | Yes (prevents phantom deps) |

pnpm saves disk space and is faster.

## Basic Structure

```
my-monorepo/
├── package.json
├── pnpm-workspace.yaml
├── apps/
│   ├── web/            # Next.js app
│   └── admin/          # Admin app
├── packages/
│   ├── ui/             # Shared UI components
│   ├── utils/          # Utility functions
│   └── config/         # Shared config (ESLint, TSConfig)
└── pnpm-lock.yaml
```

## Step 1: Initial Setup

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

The `-r` flag runs scripts in all packages.

## Step 2: Shared UI Package

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

## Step 3: Using Package in App

```bash
mkdir -p apps/web
cd apps/web
pnpm create next-app . --typescript
```

```bash
# Add workspace package
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

`workspace:*` links to the local package. Changes reflect immediately.

## Step 4: Shared Config Package

Share ESLint and TypeScript configs:

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

Using in apps:

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

## Useful Commands

```bash
# Run only in specific package
pnpm --filter @my/web dev

# Build with dependencies
pnpm --filter @my/web... build

# Add dependency to specific package
pnpm add lodash --filter @my/utils

# Add dev dependency to root
pnpm add -Dw eslint
```

## Inter-Package Dependencies

```bash
# @my/ui uses @my/utils
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

## Adding Turborepo (Optional)

Build caching and parallel execution optimization:

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

Build results get cached, making subsequent builds much faster.

## Common Issues

### 1. Phantom Dependencies

```bash
# pnpm is strict by default
# Can't use packages not explicitly added
pnpm add lodash  # Must add directly
```

### 2. Next.js Transpile Config

```js
// apps/web/next.config.js
module.exports = {
  transpilePackages: ['@my/ui', '@my/utils'],
};
```

### 3. TypeScript Paths

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

## Final Structure

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

## Summary

1. Define workspaces with `pnpm-workspace.yaml`
2. Link local packages with `workspace:*`
3. Put shared configs in packages/config
4. Add Turborepo for build caching
5. Use `--filter` to run in specific packages

Looks complex at first, but once set up, package management becomes much easier.
