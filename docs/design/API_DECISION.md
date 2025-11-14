# HANUI 컴포넌트 API 방식 결정

> **Props 기반 (Radix UI) vs className 기반 (shadcn/ui)**  
> 최종 결정: **Props 기반 + className Escape Hatch**  
> 결정일: 2025-11-10

---

## 🤔 배경: 두 가지 방식의 차이

### 방식 1: Radix UI 스타일 (Props 기반)

```tsx
<Box py="8" px="4" bg="blue">
  <Button size="2" variant="solid" color="blue">
    클릭
  </Button>
</Box>
```

**특징**: 모든 스타일 속성을 Props로 제공

### 방식 2: shadcn/ui 스타일 (className 기반)

```tsx
<Card className="w-full max-w-sm p-6 bg-primary-50">
  <Button className="h-10 px-4 bg-primary-600">클릭</Button>
</Card>
```

**특징**: 컴포넌트만 제공, 스타일은 Tailwind className으로 자유롭게

---

## ⚖️ 장단점 비교

### Radix UI 방식 (Props)

#### 장점 ✅

1. **일관성 보장**
   - `size="2"` 같은 정해진 값만 사용 가능
   - 팀원 모두가 동일한 스타일 작성
2. **타입 안전성**
   - TypeScript가 허용된 값만 자동완성
   - 잘못된 값 입력 시 컴파일 에러
3. **접근성 자동 보장**
   - `size="2"` → 자동으로 최소 터치 영역 보장
   - 개발자가 실수로 접근성 위반 불가능
4. **KRDS 표준 강제**
   - 정부 표준 컬러/크기만 Props로 제공
   - 임의로 비표준 값 사용 불가
5. **문서화 용이**
   - Props 목록만 보면 사용법 명확
   - Storybook 자동 생성 쉬움

#### 단점 ❌

1. **유연성 부족**
   - KRDS에 없는 특수 케이스 대응 어려움
2. **Props 폭발**
   - `py`, `px`, `bg`, `color` 등 수많은 props
3. **러닝 커브**
   - 각 컴포넌트의 props 체계 학습 필요

---

### shadcn/ui 방식 (className)

#### 장점 ✅

1. **최대 유연성**
   - Tailwind의 모든 유틸리티 사용 가능
   - 즉시 스타일 변경 가능
2. **러닝 커브 낮음**
   - Tailwind만 알면 됨
   - 별도 Props 학습 불필요
3. **빠른 프로토타이핑**
   - 즉시 원하는 스타일 적용
4. **컴포넌트 코드 간결**
   - Props 처리 로직 불필요

#### 단점 ❌

1. **일관성 위험**
   - `h-10` vs `h-11` 혼용 가능
   - 개인마다 다른 스타일링
2. **접근성 우회 가능**
   - `h-6` (24px)로 터치 영역 부족 가능
   - 명도 대비 부족 색상 사용 가능
3. **KRDS 이탈 가능**
   - `bg-purple-500` 같은 비표준 색상 사용
4. **문서화 어려움**
   - "어떤 className 조합이 올바른가?" 불명확

---

## 🎯 최종 결정: Props 기반 + Escape Hatch

### 결정 내용

```tsx
// ✅ 기본: Props로 KRDS 표준 강제
<Button size="medium" variant="primary">
  신청하기
</Button>

// ✅ 특수 케이스: className으로 레이아웃 확장
<Button
  size="medium"
  variant="primary"
  className="mt-4 w-full"  // 레이아웃만 추가
>
  신청하기
</Button>

// ❌ 금지: 핵심 스타일 우회 불가
<Button
  size="medium"
  className="h-6 px-2 bg-purple-500"  // 에러 또는 무시됨
>
```

### 핵심 원칙 3가지

1. **KRDS 표준은 Props로 강제**
   - size, variant, color → Props만
2. **레이아웃/간격은 className 허용**
   - margin, width, grid/flex → className
3. **Props가 항상 우선**
   - 충돌 시 Props가 우선, className 무시

---

## 📊 결정 근거

### 1. 공공 프로젝트의 특수성

```
공공 웹사이트는 "개발 자유도"보다 "표준 준수"가 더 중요
```

**법적 의무**

- 접근성: 장애인차별금지법 준수 의무
- KRDS: 정부 웹사이트 표준 준수 의무
- 유지보수: 담당자 자주 교체 (일관성 필수)

**예시**:

```tsx
// ✅ Props로 접근성 자동 보장
<Button size="medium">  // → 40px (터치 영역 충분)

// ❌ className으로 접근성 위반 가능
<Button className="h-6">  // → 24px (터치 영역 부족, 위법)
```

### 2. 초보 개발자도 사용

공공 프로젝트는 경력이 다양한 개발자가 참여:

- 신입 개발자
- 비전문 SI 개발자
- 유지보수 담당자

**Props 기반의 장점**:

```tsx
// Props 목록만 보면 사용법 명확
<Button
  size="medium"        // ← IDE 자동완성으로 선택
  variant="primary"    // ← 허용된 값만 표시
>
```

### 3. 장기 유지보수

공공 프로젝트는 5년, 10년 이상 유지보수:

```tsx
// 2025년 개발자 A
<Button size="medium" variant="primary" />

// 2030년 개발자 B (담당자 교체)
<Button size="medium" variant="primary" />
// ✅ 동일한 코드, 동일한 스타일
```

vs

```tsx
// 2025년 개발자 A
<Button className="h-10 px-4 bg-blue-600" />

// 2030년 개발자 B (담당자 교체)
<Button className="h-11 px-5 bg-blue-500" />
// ❌ 미묘하게 다른 스타일, 일관성 무너짐
```

---

## 🛡️ 구현 방법

### 1. class-variance-authority 사용

```tsx
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  // Base (항상 적용)
  'inline-flex items-center justify-center rounded-md font-medium',
  {
    variants: {
      size: {
        small: 'h-8 px-3 text-sm',
        medium: 'h-10 px-4 text-base',
        large: 'h-12 px-6 text-lg',
      },
      variant: {
        primary: 'bg-primary-600 text-white',
        secondary: 'bg-gray-200 text-gray-900',
      },
    },
    defaultVariants: {
      size: 'medium',
      variant: 'primary',
    },
  }
);
```

### 2. className 허용 (레이아웃만)

```tsx
export const Button = ({ size, variant, className, ...props }) => {
  return (
    <button
      className={cn(
        buttonVariants({ size, variant }),
        className // 레이아웃만 추가
      )}
      {...props}
    />
  );
};
```

### 3. className 필터링 (선택 사항)

더 엄격한 제어가 필요한 경우:

```tsx
const FORBIDDEN_PATTERNS = [
  /^h-\d+$/, // 높이 금지
  /^bg-/, // 배경색 금지
  /^text-(?!left|center|right)/, // 텍스트 색상 금지
];

function filterClassName(className: string): string {
  // 금지된 패턴 필터링
  // 개발 모드에서 경고 출력
}
```

---

## 📋 허용/금지 패턴

### ✅ 허용: 레이아웃, 간격, 정렬

```tsx
// 여백
<Button className="mt-4 mb-2 mx-auto" />

// 너비
<Button className="w-full max-w-xs" />

// 그리드/플렉스
<div className="flex gap-2">
  <Button>취소</Button>
  <Button variant="primary">확인</Button>
</div>

// 반응형
<Button className="w-full md:w-auto" />
```

### ❌ 금지: 크기, 색상, 패딩

```tsx
// 높이 (size props 사용)
<Button className="h-6" />  // ❌

// 배경색 (variant props 사용)
<Button className="bg-purple-500" />  // ❌

// 패딩 (size에 포함)
<Button className="px-8" />  // ❌

// 텍스트 색상 (variant가 결정)
<Button className="text-green-500" />  // ❌
```

---

## 🎨 Size/Variant 정의

### Size 시스템

```tsx
type Size = 'small' | 'medium' | 'large';

const sizes = {
  small: 'h-8 px-3 text-sm', // 32px (최소)
  medium: 'h-10 px-4 text-base', // 40px (KRDS 권장)
  large: 'h-12 px-6 text-lg', // 48px (강조)
};
```

**KRDS 근거**:

- 최소 터치 영역: 44x44px (WCAG 2.5.5)
- KRDS 버튼 높이: 40px

### Variant 시스템

```tsx
type Variant =
  | 'primary' // #0066CC (정부 파란색)
  | 'secondary' // 중립 회색
  | 'success' // 성공 초록색
  | 'danger' // 위험 빨간색
  | 'ghost' // 텍스트만
  | 'outline'; // 테두리

const variants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  // ...
};
```

---

## 🔄 다른 라이브러리와 비교

### Material-UI (MUI)

```tsx
// MUI: Props 기반
<Button variant="contained" color="primary" size="medium">
```

**유사점**: Props 기반, 표준 강제  
**차이점**: HANUI는 className Escape Hatch 제공

### Chakra UI

```tsx
// Chakra: Props 기반 (더 많은 props)
<Button colorScheme="blue" size="md" mt={4} px={6}>
```

**유사점**: Props 기반  
**차이점**: HANUI는 spacing을 Props로 제공 안 함 (className 사용)

### Ant Design

```tsx
// Ant Design: Props 기반
<Button type="primary" size="middle">
```

**유사점**: Props 기반  
**차이점**: HANUI는 Tailwind 통합, className 허용

---

## ✅ 결론

**HANUI는 Props 기반 (Radix UI 스타일)을 채택합니다.**

### 채택 이유

1. ✅ 공공 프로젝트 특성 (표준 준수 > 자유도)
2. ✅ 접근성 법적 의무 자동화
3. ✅ KRDS 이탈 방지
4. ✅ 장기 유지보수 일관성
5. ✅ 초보 개발자도 쉽게 사용
6. ✅ className Escape Hatch로 유연성 확보

### Trade-off 수용

| 항목             | Trade-off                     |
| ---------------- | ----------------------------- |
| Props 러닝 커브  | ↑ 증가 → 대신 표준 준수 ↑     |
| 초기 구현 복잡도 | ↑ 증가 → 대신 장기 유지보수 ↓ |
| 개발 자유도      | ↓ 감소 → 대신 일관성 ↑        |

---

## 📚 관련 문서

- [COMPONENT_API_STRATEGY.md](./COMPONENT_API_STRATEGY.md) - 구현 상세 가이드
- [TECH_STACK.md](../../TECH_STACK.md) - 전체 기술 스택
- [Issue #7](https://github.com/hanui-o/hanui/issues/7) - Button 컴포넌트 (첫 적용)

---

**작성자**: @odada-o  
**결정일**: 2025-11-10  
**Status**: ✅ 최종 결정 완료  
**Next**: Issue #7 (Button) 구현 시 적용
