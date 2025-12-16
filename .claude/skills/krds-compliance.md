# KRDS (한국 정부 디자인 시스템) 준수 가이드

## KRDS 2.2 핵심 요소

### 색상 체계

```css
/* Primary Colors */
--krds-primary-10: #e8f4ff;
--krds-primary-20: #b8ddff;
--krds-primary-30: #88c6ff;
--krds-primary-40: #58afff;
--krds-primary-50: #2897ff;
--krds-primary-60: #0070cc; /* 기본 Primary */
--krds-primary-70: #005299;
--krds-primary-80: #003566;
--krds-primary-90: #001933;

/* Gray Scale */
--krds-gray-5: #f9f9f9;
--krds-gray-10: #f2f2f2;
--krds-gray-20: #e5e5e5;
--krds-gray-30: #cccccc;
--krds-gray-40: #b3b3b3;
--krds-gray-50: #808080;
--krds-gray-60: #666666;
--krds-gray-70: #4d4d4d;
--krds-gray-80: #333333;
--krds-gray-90: #1a1a1a;
--krds-gray-95: #0d0d0d;

/* Semantic Colors */
--krds-success: #008a00;
--krds-warning: #ffa500;
--krds-error: #d32f2f;
--krds-info: #0070cc;
```

### 타이포그래피

```css
/* Font Family */
font-family:
  'Pretendard',
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  Roboto,
  sans-serif;

/* Font Sizes (KRDS 기준: 17px base) */
--krds-font-size-xs: 0.75rem; /* 12px */
--krds-font-size-sm: 0.875rem; /* 14px */
--krds-font-size-md: 1rem; /* 17px (KRDS 기준) */
--krds-font-size-lg: 1.125rem; /* 19px */
--krds-font-size-xl: 1.25rem; /* 21px */

/* Heading Sizes */
--krds-heading-xs: 1.125rem; /* 19px */
--krds-heading-sm: 1.25rem; /* 21px */
--krds-heading-md: 1.5rem; /* 25px */
--krds-heading-lg: 1.875rem; /* 32px */
--krds-heading-xl: 2.25rem; /* 38px */

/* Display Sizes */
--krds-display-sm: 2.5rem; /* 42px */
--krds-display-md: 3rem; /* 51px */
--krds-display-lg: 3.5rem; /* 60px */
```

### 간격 시스템

```css
/* KRDS Spacing (4px 단위) */
--krds-space-1: 4px;
--krds-space-2: 8px;
--krds-space-3: 12px;
--krds-space-4: 16px;
--krds-space-5: 20px;
--krds-space-6: 24px;
--krds-space-8: 32px;
--krds-space-10: 40px;
--krds-space-12: 48px;
--krds-space-16: 64px;
```

### 반경 (Border Radius)

```css
--krds-radius-none: 0;
--krds-radius-sm: 2px;
--krds-radius-md: 4px;
--krds-radius-lg: 8px;
--krds-radius-xl: 12px;
--krds-radius-full: 9999px;
```

## KWCAG 2.2 접근성 준수

### 필수 체크리스트

#### 1. 인식의 용이성

- [ ] **대체 텍스트**: 모든 이미지에 alt 속성 제공
- [ ] **색상 대비**: 텍스트 4.5:1 이상, 큰 텍스트 3:1 이상
- [ ] **텍스트 크기 조절**: 200% 확대 시 콘텐츠 손실 없음
- [ ] **명도 대비**: 색상만으로 정보 전달하지 않음

#### 2. 운용의 용이성

- [ ] **키보드 접근**: 모든 기능 키보드로 접근 가능
- [ ] **초점 이동**: 논리적 순서로 초점 이동
- [ ] **초점 표시**: 현재 초점 위치 시각적으로 표시
- [ ] **건너뛰기 링크**: 반복 영역 건너뛰기 제공

#### 3. 이해의 용이성

- [ ] **레이블 제공**: 모든 입력 필드에 레이블 연결
- [ ] **오류 정정**: 오류 발생 시 수정 방법 안내
- [ ] **일관된 네비게이션**: 동일한 기능은 동일한 방식으로

#### 4. 견고성

- [ ] **마크업 오류 방지**: 유효한 HTML 마크업
- [ ] **ARIA 사용**: 적절한 ARIA 역할과 속성 사용

### ARIA 패턴

#### 버튼

```tsx
<button
  type="button"
  role="button"
  aria-disabled={disabled}
  aria-pressed={pressed}
  aria-expanded={expanded}
>
```

#### 모달/다이얼로그

```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <h2 id="dialog-title">제목</h2>
  <p id="dialog-description">설명</p>
</div>
```

#### 탭

```tsx
<div role="tablist" aria-label="탭 목록">
  <button role="tab" aria-selected="true" aria-controls="panel-1">탭 1</button>
  <button role="tab" aria-selected="false" aria-controls="panel-2">탭 2</button>
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">내용 1</div>
<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>내용 2</div>
```

#### 알림

```tsx
<div role="alert" aria-live="polite">
  알림 메시지
</div>
```

#### 진행률

```tsx
<div
  role="progressbar"
  aria-valuenow={50}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label="로딩 중"
/>
```

### 키보드 네비게이션 패턴

| 컴포넌트 | 키보드           | 동작           |
| -------- | ---------------- | -------------- |
| Button   | Enter, Space     | 클릭           |
| Dialog   | Escape           | 닫기           |
| Tab      | Arrow Left/Right | 탭 전환        |
| Menu     | Arrow Up/Down    | 메뉴 항목 이동 |
| Combobox | Arrow Up/Down    | 옵션 이동      |
| Checkbox | Space            | 토글           |
| Radio    | Arrow Up/Down    | 선택 변경      |

### 포커스 관리

```tsx
// 모달 포커스 트래핑 예시
useEffect(() => {
  if (!isOpen) return;

  const focusableElements = modalRef.current?.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements?.[0] as HTMLElement;
  const lastElement = focusableElements?.[
    focusableElements.length - 1
  ] as HTMLElement;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  firstElement?.focus();

  return () => document.removeEventListener('keydown', handleKeyDown);
}, [isOpen]);
```

## KRDS 컴포넌트 체크리스트

### 필수 컴포넌트

- [x] Button
- [x] Input, Textarea
- [x] Checkbox, Radio, Switch
- [x] Select, Combobox
- [x] Alert, Toast
- [x] Modal, AlertDialog
- [x] Tabs
- [x] Accordion
- [x] Breadcrumb
- [x] Pagination
- [x] Table
- [x] Card
- [x] Badge
- [x] Progress, Spinner
- [x] Header, Footer
- [x] Masthead
- [x] MegaMenu, PanelMenu
- [x] StepIndicator
- [x] Carousel
- [x] Tag

### 검증 도구

```bash
# axe-core로 접근성 검사
npm install -D axe-core @axe-core/react

# 사용 예시
import { useEffect } from 'react';

useEffect(() => {
  if (process.env.NODE_ENV === 'development') {
    import('@axe-core/react').then(({ default: axe }) => {
      axe(React, ReactDOM, 1000);
    });
  }
}, []);
```
