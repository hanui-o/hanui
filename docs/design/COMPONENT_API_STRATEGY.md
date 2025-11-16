# HANUI 컴포넌트 API 전략

> **Props 기반 (Radix UI 스타일) + className Escape Hatch**  
> 작성일: 2025-11-10

---

## 🎯 핵심 원칙

### 원칙 1: KRDS 표준은 Props로 강제

```tsx
// 권장: Props로 KRDS 표준 사용
<Button size="medium" variant="primary">
  신청하기
</Button>

// 금지: className으로 핵심 스타일 우회
<Button className="h-6 bg-purple-500">
  신청하기
</Button>
```

### 원칙 2: 레이아웃/간격은 className 허용

```tsx
// 허용: 레이아웃, 간격, 여백
<Button size="medium" variant="primary" className="mt-4 w-full">
  신청하기
</Button>
```

### 원칙 3: Props가 항상 우선

```tsx
// className과 props 충돌 시 → props 우선
<Button
  size="medium"        // → h-10 (40px)
  className="h-6"      // → 무시됨
>
```

---

## 📐 Size 시스템

### Button 예시

```tsx
type ButtonSize = 'small' | 'medium' | 'large';

const buttonSizes = {
  small: 'h-8 px-3 text-sm', // 32px (최소 터치 영역)
  medium: 'h-10 px-4 text-base', // 40px (KRDS 권장)
  large: 'h-12 px-6 text-lg', // 48px (강조용)
};
```

**KRDS 근거**:

- 최소 터치 영역: 44x44px (WCAG 2.5.5)
- KRDS 버튼 높이: 40px (medium이 기본)

### Input 예시

```tsx
type InputSize = 'small' | 'medium' | 'large';

const inputSizes = {
  small: 'h-8 px-3 text-sm', // 32px (조밀한 폼)
  medium: 'h-10 px-4 text-base', // 40px (기본)
  large: 'h-12 px-4 text-lg', // 48px (강조)
};
```

---

## 🎨 Variant 시스템

### Button Variants

```tsx
type ButtonVariant =
  | 'primary' // 주요 액션 (파란색)
  | 'secondary' // 부차 액션 (회색)
  | 'success' // 성공 (초록색)
  | 'danger' // 위험 (빨간색)
  | 'ghost' // 텍스트만
  | 'outline'; // 테두리

const buttonVariants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  success: 'bg-success-600 text-white hover:bg-success-700',
  danger: 'bg-danger-600 text-white hover:bg-danger-700',
  ghost: 'bg-transparent text-primary-600 hover:bg-primary-50',
  outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
};
```

**KRDS 근거**:

- Primary: #0066CC (정부 공식 파란색)
- Secondary: 중립 회색
- Success/Danger: 사용자 피드백용

---

## 🛡️ Props vs className 충돌 방지

### 구현 예시 (Button)

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles (항상 적용)
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary-600 text-white hover:bg-primary-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        // ...
      },
      size: {
        small: 'h-8 px-3 text-sm',
        medium: 'h-10 px-4 text-base',
        large: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    // 중요: buttonVariants가 먼저, className은 나중
    // 하지만 Tailwind 특성상 나중에 오는 클래스가 우선됨
    // 따라서 className에서 size/variant 관련 클래스는 필터링 필요

    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
```

### className 필터링 (선택적 강화)

더 엄격한 제어가 필요하면:

```tsx
// 금지된 className 패턴
const FORBIDDEN_PATTERNS = [
  /^h-\d+$/, // 높이 (size props 사용해야 함)
  /^bg-(?!transparent)/, // 배경색 (variant props 사용해야 함)
  /^text-(?!left|center|right)/, // 텍스트 색상 (variant가 결정)
];

function filterClassName(className: string): string {
  const classes = className.split(' ');
  const filtered = classes.filter((cls) => {
    return !FORBIDDEN_PATTERNS.some((pattern) => pattern.test(cls));
  });

  if (
    filtered.length !== classes.length &&
    process.env.NODE_ENV === 'development'
  ) {
    console.warn(
      `[HANUI] 금지된 className이 제거되었습니다: ${className}\n` +
        `size, variant props를 사용하세요.`
    );
  }

  return filtered.join(' ');
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, size }),
          filterClassName(className || '')
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
```

---

## 📊 허용되는 className 패턴

### 허용 (레이아웃, 간격)

```tsx
// 여백 (margin)
<Button className="mt-4 mb-2 mx-auto" />

// 너비
<Button className="w-full max-w-xs" />

// 정렬
<Button className="text-left" />

// 플렉스 레이아웃
<div className="flex gap-2">
  <Button>취소</Button>
  <Button variant="primary">확인</Button>
</div>

// 그리드 레이아웃
<div className="grid grid-cols-2 gap-4">
  <Button>버튼 1</Button>
  <Button>버튼 2</Button>
</div>

// 반응형
<Button className="w-full md:w-auto" />
```

### 금지 (핵심 스타일)

```tsx
// 높이 (size props 사용)
<Button className="h-6" />  // ❌
<Button size="small" />     // ✅

// 배경색 (variant props 사용)
<Button className="bg-purple-500" />  // ❌
<Button variant="primary" />          // ✅

// 텍스트 색상 (variant가 결정)
<Button className="text-green-500" />  // ❌

// 패딩 (size에 포함됨)
<Button className="px-8" />  // ❌
```

---

## 🎨 Color 시스템

### KRDS 컬러만 Props로 제공

```tsx
type Color =
  | 'primary'    // #0066CC (정부 파란색)
  | 'secondary'  // #00A896 (보조 청록색)
  | 'success'    // #28A745 (성공 초록색)
  | 'warning'    // #FFC107 (경고 노란색)
  | 'danger'     // #DC3545 (위험 빨간색)
  | 'gray'       // 중립 회색

// 사용
<Badge color="primary">새 글</Badge>
<Alert color="warning">경고 메시지</Alert>

// KRDS에 없는 색상은 props로 제공 안 함
<Badge color="purple" />  // TypeScript 에러
```

**이유**: KRDS는 정부 표준 컬러만 정의. 임의의 색상 사용 방지.

---

## 📏 Spacing 시스템

### KRDS 8px Grid 기반

```tsx
// Tailwind Config에 KRDS spacing 정의
export default {
  theme: {
    extend: {
      spacing: {
        0: '0',
        1: '4px', // 0.25rem
        2: '8px', // 0.5rem (KRDS 기본 단위)
        3: '12px', // 0.75rem
        4: '16px', // 1rem
        6: '24px', // 1.5rem
        8: '32px', // 2rem
        12: '48px', // 3rem
        16: '64px', // 4rem
      },
    },
  },
};
```

**Props로 제공하지 않음**: 레이아웃은 개발자가 Tailwind로 자유롭게 조정.

```tsx
// 권장
<Button className="mt-4 mb-2">신청하기</Button>

// 비권장 (Props 폭발)
<Button mt={4} mb={2}>신청하기</Button>
```

---

## 🧩 복합 컴포넌트 패턴

### Card 예시

```tsx
// Props 기반 변형
<Card variant="outlined" padding="medium">
  <Card.Header>
    <Card.Title>제목</Card.Title>
  </Card.Header>
  <Card.Body>
    내용
  </Card.Body>
  <Card.Footer>
    <Button>확인</Button>
  </Card.Footer>
</Card>

// className으로 레이아웃 조정
<Card
  variant="outlined"
  padding="medium"
  className="w-full max-w-2xl mx-auto mt-8"
>
  ...
</Card>
```

### Variants

```tsx
type CardVariant =
  | 'default' // 기본 (그림자)
  | 'outlined' // 테두리만
  | 'filled'; // 배경색

type CardPadding =
  | 'none' // p-0
  | 'small' // p-4
  | 'medium' // p-6 (기본)
  | 'large'; // p-8
```

---

## 📚 타입 정의 예시

### Button 전체 타입

```tsx
import { type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(/* ... */);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * 버튼 크기
   * @default "medium"
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * 버튼 변형
   * @default "primary"
   */
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'ghost'
    | 'outline';

  /**
   * 로딩 상태
   */
  loading?: boolean;

  /**
   * 아이콘 (왼쪽)
   */
  iconLeft?: React.ReactNode;

  /**
   * 아이콘 (오른쪽)
   */
  iconRight?: React.ReactNode;

  /**
   * Radix Slot 패턴 활성화
   */
  asChild?: boolean;

  /**
   * 추가 className (레이아웃 조정용)
   * 주의: size, variant 관련 클래스는 무시됩니다.
   */
  className?: string;
}
```

---

## 장점 요약

### 1. KRDS 표준 강제

- Props로 제공되는 옵션만 사용 가능
- TypeScript가 자동으로 잘못된 값 방지
- 팀원 누구나 일관된 코드 작성

### 2. 접근성 자동 보장

- `size="small"` → 최소 32px (터치 영역 보장)
- `variant="primary"` → 명도 대비 4.5:1 이상 (자동)
- 개발자가 실수로 접근성 위반 불가능

### 3. 유연성 유지

- className으로 레이아웃 자유롭게 조정
- 특수 케이스 대응 가능
- Tailwind의 모든 유틸리티 사용 가능 (레이아웃만)

### 4. 문서화 용이

- Props 목록만 보면 사용법 명확
- Storybook에서 모든 조합 자동 생성 가능
- 초보 개발자도 쉽게 사용

---

## 🎯 결론

**HANUI는 Radix UI 스타일 (Props 기반)을 채택합니다.**

**이유**:

1. 공공 프로젝트는 "자유도"보다 "표준 준수"가 중요
2. 접근성 법적 의무 준수 자동화
3. KRDS 이탈 방지
4. 유지보수 담당자 교체 시에도 일관성 유지
5. className Escape Hatch로 필요한 유연성 확보

**Trade-off 수용**:

- Props 러닝 커브 ↑ → 대신 표준 준수 ↑
- 초기 구현 복잡도 ↑ → 대신 장기 유지보수 ↓

---

**작성자**: @odada-o  
**작성일**: 2025-11-10  
**Status**: API 전략 확정  
**Next**: Issue #7 (Button 컴포넌트) 구현 시 적용
