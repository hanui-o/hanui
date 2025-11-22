# Container 컴포넌트 기획안

> 출처: KRDS 디자인 스타일 - 레이아웃 가이드라인
>
> URL: https://www.krds.go.kr/html/site/style/style_05.html

## 📋 개요

Container는 페이지의 콘텐츠를 제한된 너비 내에 정렬하고, 반응형 레이아웃을 구성하는 기본 레이아웃 컴포넌트입니다. KRDS의 그리드 시스템을 기반으로 다양한 화면 크기에서 일관된 사용자 경험을 제공합니다.

---

## 🎯 KRDS 레이아웃 핵심 개념

### 1. 그리드 요소 (Grid Elements)

KRDS 그리드 시스템은 3가지 핵심 요소로 구성됩니다:

#### 📐 **Screen Margin (스크린 마진)**

- 화면 양쪽 가장자리의 여백
- 콘텐츠와 화면 끝 사이의 공간을 제공
- 특히 터치 기반의 모바일 환경에서 요소를 오작동하지 않도록 함

**반응형 마진 값:**

- `large`: 최소 24px
- `medium`: 최소 24px
- `small`: 최소 16px

#### 📊 **Column (칼럼)**

- UI 내 요소를 수직으로 정렬할 수 있는 분할 영역
- 콘텐츠를 체계적으로 일관되게 배치
- 고정값 대신 백분율로 설정하여 다양한 화면 크기에 유연하게 반응

**반응형 칼럼 수:**

- `large`: 12-16개
- `medium`: 8-12개
- `small`: 4-6개

#### 📏 **Gutter (거터)**

- 칼럼 사이의 간격
- 요소 사이의 여백을 제공하여 시각적 혼잡을 줄임

**반응형 거터 값:**

- `large`: 최소 16px, 최적 24px
- `medium`: 최소 16px, 최적 24px
- `small`: 최소 16px, 최적 16px

---

### 2. 브레이크포인트 (Breakpoints)

화면 크기에 따라 레이아웃이 변경되는 지점으로, 인터페이스가 다양한 화면 크기에 맞춰 자연스럽게 적응할 수 있게 합니다.

| 브레이크포인트 | 너비 범위 | 칼럼 수 | 거터 너비 | 최소 스크린 마진 |
| -------------- | --------- | ------- | --------- | ---------------- |
| **xsmall**     | ~359px    | 4-6     | 16-16     | 16px             |
| **small**      | 360px~    | 4-6     | 16-16     | 16px             |
| **medium**     | 768px~    | 8-12    | 16-24     | 24px             |
| **large**      | 1024px~   | 12-16   | 16-24     | 24px             |
| **xlarge**     | 1280px~   | 12-16   | 16-24     | 24px             |
| **xxlarge**    | 1440px~   | 12-16   | 16-24     | 24px             |

**중요 원칙:**

- 브레이크포인트 단계는 **최소 3단계에서 6단계**로 설정
- 적을수록 관리와 개발이 용이하지만, 세분화가 어려움
- 많을수록 더 정교한 레이아웃 가능하지만 복잡성 증가

---

## 🏗️ Container 컴포넌트 구조

### 컴포넌트 특징

```
┌─────────────────────────────────────────┐
│          Screen Margin (24px)           │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │         Container Content         │  │
│  │      (max-width + centered)       │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│          Screen Margin (24px)           │
└─────────────────────────────────────────┘
```

### 주요 기능

1. **최대 너비 제한**: 콘텐츠가 너무 넓어지지 않도록 제한
2. **중앙 정렬**: 콘텐츠를 화면 중앙에 배치
3. **반응형 패딩**: 화면 크기에 따라 좌우 여백 자동 조정
4. **Grid 시스템 통합**: 내부에 Grid 컴포넌트를 사용할 수 있는 구조

---

## 💻 API 설계

### Container Props

```typescript
interface ContainerProps {
  /**
   * 최대 너비 설정
   * @default 'lg'
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | false;

  /**
   * 좌우 패딩 (screen margin) 제거 여부
   * @default false
   */
  disableGutters?: boolean;

  /**
   * 자식 요소
   */
  children: React.ReactNode;

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * HTML 요소 타입
   * @default 'div'
   */
  as?: 'div' | 'section' | 'article' | 'main';
}
```

### 최대 너비 매핑 (KRDS 브레이크포인트 기반)

```typescript
const maxWidths = {
  sm: '640px', // small 브레이크포인트
  md: '768px', // medium 브레이크포인트
  lg: '1024px', // large 브레이크포인트 (기본값)
  xl: '1280px', // xlarge 브레이크포인트
  '2xl': '1440px', // xxlarge 브레이크포인트
  full: '100%', // 제한 없음
};
```

---

## 🎨 사용 예시

### 1. 기본 사용

```tsx
<Container>
  <h1>공공 웹사이트</h1>
  <p>KRDS 가이드라인을 준수하는 레이아웃</p>
</Container>
```

### 2. 최대 너비 변경

```tsx
<Container maxWidth="xl">
  <Dashboard />
</Container>
```

### 3. 전체 너비 (패딩만 적용)

```tsx
<Container maxWidth="full">
  <HeroSection />
</Container>
```

### 4. 패딩 제거 (Full Bleed)

```tsx
<Container disableGutters>
  <FullWidthImage src="/hero.jpg" />
</Container>
```

### 5. Grid와 함께 사용

```tsx
<Container>
  <Grid container spacing={3}>
    <Grid item xs={12} md={6}>
      <Card>콘텐츠 1</Card>
    </Grid>
    <Grid item xs={12} md={6}>
      <Card>콘텐츠 2</Card>
    </Grid>
  </Grid>
</Container>
```

---

## 🎯 사용 가이드라인

### Container를 사용하기 적합한 경우

1. **페이지 메인 콘텐츠를 감싸는 경우**
   - 본문 내용이 넓은 화면에서 너무 퍼지지 않도록 제한
   - 가독성 향상 (최적 줄 길이 유지)

2. **섹션별 콘텐츠 정렬**
   - 각 섹션의 콘텐츠를 일관되게 정렬
   - 여러 섹션이 있어도 수평 정렬 유지

3. **그리드 시스템의 래퍼로 사용**
   - Grid 컴포넌트의 부모 요소
   - 전체 레이아웃의 기준점 제공

### Container를 사용하지 말아야 하는 경우

1. **전체 화면을 사용해야 하는 경우**
   - 히어로 이미지, 배경 섹션
   - → `maxWidth="full"` 또는 `disableGutters` 사용

2. **중첩해서 사용하는 경우**
   - Container 안에 Container를 넣으면 불필요한 제약 발생
   - → 하나의 Container만 사용

3. **작은 컴포넌트 내부**
   - Card, Modal 등 이미 크기가 제한된 컴포넌트 내부
   - → 불필요한 중복

---

## ♿ 접근성 고려사항

### 시맨틱 HTML

```tsx
// 메인 콘텐츠
<Container as="main">
  <h1>페이지 제목</h1>
</Container>

// 섹션
<Container as="section">
  <h2>섹션 제목</h2>
</Container>

// 아티클
<Container as="article">
  <h2>글 제목</h2>
</Container>
```

### 반응형 접근성

1. **터치 영역 보장**: 모바일에서 최소 16px 마진으로 터치 오작동 방지
2. **가독성**: 텍스트 줄 길이를 적절히 제한하여 읽기 편하게 (50-75자)
3. **스크린 리더**: 적절한 시맨틱 요소 사용

---

## 🔧 구현 방향

### 1. Tailwind CSS 기반 구현

```tsx
// packages/react/src/components/Container/Container.tsx
import { forwardRef } from 'react';
import { cn } from '@hanui/utils';

const maxWidthClasses = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      maxWidth = 'lg',
      disableGutters = false,
      children,
      className,
      as: Component = 'div',
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'mx-auto w-full',
          maxWidth !== false && maxWidthClasses[maxWidth],
          !disableGutters && 'px-4 sm:px-6 lg:px-8', // KRDS 마진
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
```

### 2. Tailwind Config 커스터마이징

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      screens: {
        // KRDS 브레이크포인트
        xs: '360px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
      spacing: {
        // KRDS 스크린 마진
        'screen-margin-sm': '16px',
        'screen-margin-md': '24px',
        'screen-margin-lg': '24px',
      },
    },
  },
};
```

---

## 📚 문서화 구조 (docs/src/app/layout/container/page.tsx)

### 페이지 구성

1. **개요**
   - Container의 역할과 KRDS 레이아웃 시스템 소개

2. **사용 가이드라인**
   - 언제 사용하나?
   - 언제 사용하지 말아야 하나?
   - Grid System 통합 가이드

3. **Installation**

4. **Usage**

5. **Examples**
   - Default (maxWidth='lg')
   - Small Width (maxWidth='sm')
   - Extra Large Width (maxWidth='xl')
   - Full Width (maxWidth='full')
   - No Gutters (disableGutters)
   - With Grid System
   - Semantic HTML (as prop)
   - Nested Sections

6. **API Reference**
   - Props 상세 설명
   - 브레이크포인트 테이블
   - 마진/거터 값 가이드

---

## 🎨 시각적 예시

### Do: 일관된 정렬

```tsx
<div>
  <Container>
    <Header />
  </Container>

  <Container>
    <MainContent />
  </Container>

  <Container>
    <Footer />
  </Container>
</div>
```

### Don't: 중첩 사용

```tsx
잘못된 예시
<Container>
  <Container> {/* 불필요한 중첩 */}
    <Content />
  </Container>
</Container>
```

---

## 🚀 추가 고려사항

### Grid 컴포넌트와의 통합

Container 구현 후, Grid 컴포넌트도 함께 개발하여 완전한 KRDS 레이아웃 시스템 제공:

1. **Grid Container**: 칼럼을 포함하는 래퍼
2. **Grid Item**: 개별 칼럼 아이템
3. **Responsive Props**: xs, sm, md, lg, xl 브레이크포인트별 칼럼 수 지정

### 성능 최적화

- Tailwind의 JIT 모드로 사용하지 않는 클래스 제거
- CSS-in-JS 대신 Tailwind 사용으로 런타임 오버헤드 최소화

---

## 구현 체크리스트

- [ ] Container 컴포넌트 구현 (packages/react/src/components/Container/)
- [ ] KRDS 브레이크포인트 Tailwind Config 설정
- [ ] TypeScript 타입 정의
- [ ] Storybook 스토리 작성
- [ ] 단위 테스트 작성
- [ ] KRDS Container 가이드라인 문서 작성 (docs/krds-container-guidelines.md)
- [ ] Container 문서 페이지 작성 (docs/src/app/layout/container/page.tsx)
- [ ] 반응형 테스트 (모든 브레이크포인트)
- [ ] 접근성 테스트
- [ ] Grid 컴포넌트 연동 테스트

---

## 📖 참고 자료

- [KRDS 레이아웃 가이드라인](https://www.krds.go.kr/html/site/style/style_05.html)
- [Material-UI Container](https://mui.com/material-ui/react-container/)
- [Bootstrap Container](https://getbootstrap.com/docs/5.3/layout/containers/)
- [Tailwind CSS Container](https://tailwindcss.com/docs/container)
