# HANUI Playground

HANUI 컴포넌트를 직접 테스트하고 실험할 수 있는 Next.js 앱입니다.

## 🚀 시작하기

### 1. 개발 서버 실행

```bash
# 루트 디렉토리에서
pnpm dev:playground

# 또는 playground 디렉토리에서
cd apps/playground
pnpm dev
```

Playground가 [http://localhost:3001](http://localhost:3001)에서 실행됩니다.

### 2. 문서 사이트 함께 실행

문서와 Playground를 동시에 실행하려면:

```bash
# 터미널 1 - 문서 사이트 (포트 3000)
pnpm --filter docs dev

# 터미널 2 - Playground (포트 3001)
pnpm dev:playground
```

- 📚 문서: [http://localhost:3000](http://localhost:3000)
- 🎮 Playground: [http://localhost:3001](http://localhost:3001)

## 📝 사용 방법

### Get Started 따라하기

1. **문서 사이트에서 컴포넌트 API 확인**
   - [http://localhost:3000/components](http://localhost:3000/components)에서 사용하고 싶은 컴포넌트 선택
   - API 탭에서 Props와 사용 예시 확인

2. **Playground에서 코드 작성**
   - `src/app/page.tsx` 파일을 수정
   - 자동으로 Hot Reload됨

3. **브라우저에서 즉시 확인**
   - [http://localhost:3001](http://localhost:3001)에서 결과 확인

### 예제

```tsx
'use client';

import { Button, Card, Stack, Body } from '@hanui/react';

export default function Home() {
  return (
    <div className="p-8">
      <Stack gap="lg">
        <Card>
          <Body size="lg">HANUI 컴포넌트 테스트</Body>
          <Button variant="primary">Primary Button</Button>
        </Card>
      </Stack>
    </div>
  );
}
```

## 🎯 테스트 가능한 컴포넌트

### 레이아웃

- `Container`, `Stack`, `Section`, `Wrap`, `SimpleGrid`

### 타이포그래피

- `Display`, `Heading`, `Body`, `Label`, `NavText`

### 입력

- `Button`, `Input`, `Select`, `FileUpload`

### 표시

- `Card`, `Table`, `Modal`, `Tooltip`, `Tabs`, `Accordion`

### 네비게이션

- `Breadcrumb`, `Pagination`, `Link`

더 많은 컴포넌트는 [문서 사이트](http://localhost:3000/components)에서 확인하세요!

## 💡 팁

1. **TypeScript 자동완성 활용**
   - VS Code에서 컴포넌트를 import하면 Props 자동완성이 제공됩니다

2. **KRDS 색상 시스템 사용**

   ```tsx
   <div className="bg-krds-primary-base text-white">KRDS 색상 사용 예시</div>
   ```

3. **반응형 디자인 테스트**
   - 브라우저 개발자 도구에서 모바일/태블릿 뷰 확인

4. **에러 확인**
   - 터미널과 브라우저 콘솔에서 에러 메시지 확인

## 🔧 문제 해결

### 컴포넌트를 import할 수 없어요

```bash
# 패키지 재설치
pnpm install
```

### 스타일이 적용되지 않아요

- `src/app/globals.css`에 `@import '@hanui/react/styles.css';`가 있는지 확인
- 브라우저 캐시 클리어 (Cmd+Shift+R 또는 Ctrl+Shift+R)

### Hot Reload가 작동하지 않아요

- 개발 서버 재시작: `pnpm dev:playground`

## 📚 더 알아보기

- [HANUI 문서](http://localhost:3000)
- [Get Started](http://localhost:3000/docs/quick-start)
- [Components](http://localhost:3000/components)
- [Design System](http://localhost:3000/design-system/colors)
