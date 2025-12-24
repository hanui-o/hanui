# Tailwind CSS v4 마이그레이션 가이드

tags : TailwindCSS, Tailwindv4, CSS, 마이그레이션, 프론트엔드, React

Tailwind v4 나왔는데 마이그레이션 하셨어요?

v3에서 v4로 넘어가면서 바뀐 게 꽤 많아요. 설정 파일부터 문법까지.

## 뭐가 달라졌나

### 1. CSS-first 설정

가장 큰 변화예요. `tailwind.config.js` 안 써도 돼요.

```css
/* v3: tailwind.config.js 필수 */
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: '#3b82f6',
      },
    },
  },
};
```

```css
/* v4: CSS에서 바로 설정 */
@import 'tailwindcss';

@theme {
  --color-brand: #3b82f6;
}
```

CSS 파일 하나로 끝나요.

### 2. @tailwind → @import

```css
/* v3 */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* v4 */
@import 'tailwindcss';
```

한 줄로 줄었어요.

### 3. 네이티브 CSS 변수

v4는 모든 값을 CSS 변수로 생성해요:

```css
/* v4가 자동 생성하는 변수들 */
:root {
  --color-blue-500: #3b82f6;
  --spacing-4: 1rem;
  --font-size-lg: 1.125rem;
}
```

```css
/* 어디서든 바로 사용 가능 */
.custom-box {
  background: var(--color-blue-500);
  padding: var(--spacing-4);
}
```

Tailwind 클래스 안 쓰고 CSS에서 직접 변수 쓸 수 있어요.

## 마이그레이션 방법

### Step 1: 패키지 업그레이드

```bash
npm install tailwindcss@latest
```

### Step 2: CSS 파일 변경

```css
/* 기존 globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ↓ 변경 */
@import 'tailwindcss';
```

### Step 3: config 옮기기 (선택)

기존 설정이 있다면 CSS로 옮기거나 그대로 둬도 돼요:

```css
/* CSS로 옮기는 경우 */
@import 'tailwindcss';

@theme {
  /* 커스텀 색상 */
  --color-brand: #3b82f6;
  --color-brand-dark: #2563eb;

  /* 커스텀 폰트 */
  --font-family-sans: 'Pretendard', sans-serif;

  /* 커스텀 간격 */
  --spacing-18: 4.5rem;
}
```

```js
// JS config 유지하는 경우 (v4도 지원)
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        brand: '#3b82f6',
      },
    },
  },
};
```

둘 다 가능해요. 점진적으로 CSS로 옮겨도 되고요.

## 바뀐 문법들

### 1. opacity 문법

```html
<!-- v3 -->
<div class="bg-blue-500/50">
  <!-- v4 (동일) -->
  <div class="bg-blue-500/50"></div>
</div>
```

이건 그대로예요.

### 2. arbitrary 값

```html
<!-- v3 -->
<div class="w-[200px] bg-[#ff0000]">
  <!-- v4 (동일) -->
  <div class="w-[200px] bg-[#ff0000]"></div>
</div>
```

이것도 그대로.

### 3. container queries

v4에서 기본 지원돼요:

```html
<!-- v3: @tailwindcss/container-queries 플러그인 필요 -->
<!-- v4: 바로 사용 가능 -->
<div class="@container">
  <div class="@lg:grid-cols-2">컨테이너 크기에 따라 변경</div>
</div>
```

### 4. 3D transforms

```html
<!-- v4에서 새로 추가 -->
<div class="rotate-x-45 rotate-y-30 perspective-500">3D 변환</div>
```

## 자주 발생하는 오류

### 1. PostCSS 설정

```js
// postcss.config.js - v4용
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

`tailwindcss` 대신 `@tailwindcss/postcss` 써야 해요.

### 2. @apply 경고

```css
/* v4에서 @apply 쓰면 경고 날 수 있어요 */
.btn {
  @apply px-4 py-2 bg-blue-500;
}
```

v4는 `@apply` 사용을 권장하지 않아요. CSS 변수 쓰는 게 나아요:

```css
/* 권장 방식 */
.btn {
  padding: var(--spacing-2) var(--spacing-4);
  background: var(--color-blue-500);
}
```

### 3. 플러그인 호환성

일부 v3 플러그인이 v4에서 안 될 수 있어요. 확인 필요:

```bash
# 공식 플러그인은 대부분 지원
npm install @tailwindcss/forms@latest
npm install @tailwindcss/typography@latest
```

## 언제 마이그레이션할까

### 지금 해도 되는 경우

- 새 프로젝트
- 커스텀 설정 거의 없는 프로젝트
- CSS 변수 적극 활용하고 싶은 경우

### 좀 기다려야 하는 경우

- 레거시 플러그인 많이 쓰는 경우
- `@apply` 엄청 많이 쓰는 경우
- 안정성이 최우선인 프로덕션

## v4의 장점

1. **빌드 속도**: Oxide 엔진으로 훨씬 빨라짐
2. **설정 간소화**: CSS-first로 설정 파일 줄어듦
3. **CSS 변수 네이티브**: 디자인 토큰 활용 쉬워짐
4. **번들 크기**: 더 최적화됨

## 정리

v4 마이그레이션 체크리스트:

- [ ] `tailwindcss@latest` 설치
- [ ] `@tailwind` → `@import "tailwindcss"` 변경
- [ ] `postcss.config.js` 업데이트
- [ ] 커스텀 설정 `@theme`으로 옮기기 (선택)
- [ ] 플러그인 호환성 확인
- [ ] `@apply` 경고 확인

급하게 할 필요 없어요. v3도 당분간 유지보수될 거예요. 새 프로젝트부터 v4 쓰고, 기존 프로젝트는 천천히 마이그레이션하면 돼요.
