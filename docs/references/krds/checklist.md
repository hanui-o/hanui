# KRDS 접근성 체크리스트

> HANUI 컴포넌트 개발 및 Inspector 검증 시 사용하는 전체 접근성 검사 항목

---

## 📋 체크리스트 사용 방법

### 용도별 활용

**1. 컴포넌트 개발 시:**

- 각 항목을 개발 중 체크
- 표시는 HANUI가 자동 처리
- 표시는 개발자 수동 확인 필요

**2. Inspector 검증 규칙:**

- 각 항목을 자동 검증 규칙으로 구현
- 우선순위별로 검사 수행
- 오류 메시지 및 수정 방법 제시

**3. 블로그 글 작성 시:**

- 주제 관련 항목 참조
- WCAG/KRDS 기준 정확히 인용

---

## 🎨 1. 색상 및 명도 (Color & Contrast)

### 1.1 명도 대비 - 텍스트

**WCAG:** 1.4.3 (Level AA), 1.4.6 (Level AAA)
**KWCAG:** 1.3.3

| 항목                              | 기준           | 자동화 | 우선순위 |
| --------------------------------- | -------------- | ------ | -------- |
| 본문 텍스트 (14px 이상)           | 4.5:1          |        | Critical |
| 큰 텍스트 (18px+ 또는 Bold 14px+) | 3:1            |        | High     |
| 비활성 텍스트                     | 대비 요구 없음 |        | -        |

**검사 방법:**

```typescript
function checkTextContrast(
  foreground: string,
  background: string,
  fontSize: number
): boolean {
  const ratio = calculateContrastRatio(foreground, background);
  const largeText = fontSize >= 18 || (fontSize >= 14 && isBold);

  return largeText ? ratio >= 3 : ratio >= 4.5;
}
```

---

### 1.2 명도 대비 - UI 컴포넌트

**WCAG:** 1.4.11 (Level AA)
**KWCAG:** 1.3.3

| 항목                 | 기준 | 자동화 | 우선순위 |
| -------------------- | ---- | ------ | -------- |
| 버튼 경계선          | 3:1  |        | High     |
| 입력 필드 경계선     | 3:1  |        | High     |
| 초점 표시            | 3:1  |        | Critical |
| 아이콘 (정보 전달용) | 3:1  |        | High     |
| 차트/그래프          | 3:1  |        | Medium   |

---

### 1.3 색상으로만 정보 전달 금지

**WCAG:** 1.4.1 (Level A)
**KWCAG:** 1.3.1

| 항목           | 해결 방법       | 자동화 | 우선순위 |
| -------------- | --------------- | ------ | -------- |
| 필수 입력 필드 | `*` 기호 + 색상 |        | High     |
| 오류 상태      | 아이콘 + 색상   |        | Critical |
| 그래프 범례    | 패턴 + 색상     |        | Medium   |
| 링크 구분      | 밑줄 + 색상     |        | Medium   |

---

## ⌨️ 2. 키보드 접근성 (Keyboard Accessibility)

### 2.1 키보드 사용 보장

**WCAG:** 2.1.1 (Level A)
**KWCAG:** 2.1.1

| 항목            | 요구사항             | 자동화 | 우선순위 |
| --------------- | -------------------- | ------ | -------- |
| 모든 버튼       | `Tab` 키로 접근 가능 |        | Critical |
| 모든 링크       | `Tab` 키로 접근 가능 |        | Critical |
| 폼 요소         | `Tab` 키로 접근 가능 |        | Critical |
| 커스텀 컴포넌트 | `tabIndex={0}` 설정  |        | Critical |
| 비활성 요소     | `tabIndex={-1}` 설정 |        | High     |

**검사 방법:**

```typescript
function isKeyboardAccessible(element: HTMLElement): boolean {
  // 기본 포커스 가능 요소
  const focusableTags = ['button', 'a', 'input', 'select', 'textarea'];
  if (focusableTags.includes(element.tagName.toLowerCase())) {
    return !element.hasAttribute('disabled');
  }

  // 커스텀 요소는 tabIndex 확인
  const tabIndex = element.getAttribute('tabindex');
  return tabIndex !== null && parseInt(tabIndex) >= 0;
}
```

---

### 2.2 키보드 동작

**WCAG:** 2.1.1 (Level A)
**KWCAG:** 2.1.1

| 컴포넌트 | 필수 키                      | 자동화 | 우선순위 |
| -------- | ---------------------------- | ------ | -------- |
| Button   | `Enter`, `Space`             |        | Critical |
| Link     | `Enter`                      |        | Critical |
| Checkbox | `Space`                      |        | Critical |
| Radio    | `Arrow keys`                 |        | High     |
| Dropdown | `Arrow keys`, `Enter`, `Esc` |        | High     |
| Dialog   | `Esc` (닫기)                 |        | Critical |
| Tab      | `Arrow keys`                 |        | High     |

---

### 2.3 초점 표시

**WCAG:** 2.4.7 (Level AA)
**KWCAG:** 2.1.2

| 항목             | 요구사항                        | 자동화 | 우선순위 |
| ---------------- | ------------------------------- | ------ | -------- |
| 초점 시각적 표시 | 명확한 outline 또는 border      |        | Critical |
| 초점 대비        | 3:1 이상                        |        | High     |
| 초점 순서        | 논리적 순서                     |        | High     |
| 키보드 트랩 방지 | `Tab`/`Shift+Tab`으로 탈출 가능 |        | Critical |

---

### 2.4 포커스 관리

**WCAG:** 2.4.3 (Level A)
**KWCAG:** 2.1.1

| 시나리오    | 요구사항                          | 자동화 | 우선순위 |
| ----------- | --------------------------------- | ------ | -------- |
| Dialog 열기 | Dialog 내부 첫 요소로 포커스 이동 |        | Critical |
| Dialog 닫기 | 트리거 요소로 포커스 복원         |        | Critical |
| Focus Trap  | Dialog 내부에서만 포커스 순환     |        | Critical |
| 페이지 이동 | 페이지 상단으로 포커스 이동       |        | Medium   |
| 오류 발생   | 첫 오류 필드로 포커스 이동        |        | High     |

---

## 🖼️ 3. 이미지 및 미디어 (Images & Media)

### 3.1 대체 텍스트

**WCAG:** 1.1.1 (Level A)
**KWCAG:** 1.1.1

| 이미지 유형   | 요구사항        | 예시                           | 자동화 | 우선순위 |
| ------------- | --------------- | ------------------------------ | ------ | -------- |
| 정보 전달     | 의미 있는 `alt` | `alt="2024년 1월 매출 그래프"` |        | Critical |
| 링크 이미지   | 링크 목적 설명  | `alt="홈으로 이동"`            |        | Critical |
| 장식용        | `alt=""`        | `alt=""`                       |        | Medium   |
| 복잡한 이미지 | 상세 설명 제공  | `longdesc` 또는 인접 텍스트    |        | High     |

**검사 방법:**

```typescript
function checkImageAlt(img: HTMLImageElement): {
  valid: boolean;
  message: string;
} {
  const alt = img.getAttribute('alt');

  // alt 속성 누락
  if (alt === null) {
    return { valid: false, message: 'Missing alt attribute' };
  }

  // 링크 내부 이미지
  if (img.closest('a')) {
    if (alt === '') {
      return { valid: false, message: 'Link image must have descriptive alt' };
    }
  }

  // 의미 없는 alt
  const meaningless = ['image', '이미지', 'picture', 'photo'];
  if (meaningless.includes(alt.toLowerCase())) {
    return { valid: false, message: 'Alt text is not descriptive' };
  }

  return { valid: true, message: 'OK' };
}
```

---

### 3.2 비디오 및 오디오

**WCAG:** 1.2.2, 1.2.3, 1.2.5 (Level A, AA)
**KWCAG:** 1.2.1, 1.2.2

| 항목            | 요구사항                  | 자동화 | 우선순위 |
| --------------- | ------------------------- | ------ | -------- |
| 자막 (Captions) | 모든 음성 내용            |        | Critical |
| 오디오 설명     | 시각적 정보 설명          |        | High     |
| 컨트롤 제공     | 재생, 일시정지, 음량      |        | Critical |
| 자동 재생 금지  | 사용자 동의 필요          |        | High     |
| 3초 규칙        | 3초 이하는 자동 재생 허용 |        | Medium   |

---

## 📝 4. 폼 접근성 (Forms)

### 4.1 레이블 제공

**WCAG:** 1.3.1, 3.3.2 (Level A)
**KWCAG:** 3.3.1

| 항목             | 요구사항                    | 자동화 | 우선순위 |
| ---------------- | --------------------------- | ------ | -------- |
| 모든 입력 필드   | `<label>` 또는 `aria-label` |        | Critical |
| 레이블-필드 연결 | `for` 속성 또는 wrapping    |        | Critical |
| Placeholder 금지 | Label 대신 사용 불가        |        | High     |
| 필수 항목 표시   | `required` + 시각적 표시    |        | High     |

**검사 방법:**

```typescript
function checkFormLabel(input: HTMLInputElement): boolean {
  const id = input.getAttribute('id');
  const ariaLabel = input.getAttribute('aria-label');
  const ariaLabelledby = input.getAttribute('aria-labelledby');

  // aria-label 있음
  if (ariaLabel) return true;

  // aria-labelledby 있음
  if (ariaLabelledby) {
    const labelElement = document.getElementById(ariaLabelledby);
    return labelElement !== null;
  }

  // label 요소 연결
  if (id) {
    const label = document.querySelector(`label[for="${id}"]`);
    if (label) return true;
  }

  // label로 wrapping
  const parentLabel = input.closest('label');
  if (parentLabel) return true;

  return false;
}
```

---

### 4.2 오류 처리

**WCAG:** 3.3.1, 3.3.3 (Level A, AA)
**KWCAG:** 3.3.1, 3.3.2

| 항목             | 요구사항                    | 자동화 | 우선순위 |
| ---------------- | --------------------------- | ------ | -------- |
| 오류 식별        | 명확한 오류 메시지          |        | Critical |
| 오류 위치        | 해당 필드로 포커스 이동     |        | High     |
| 오류 수정 제안   | 올바른 형식 예시 제공       |        | High     |
| 입력값 유지      | 오류 발생 시 기존 입력 유지 |        | Medium   |
| aria-invalid     | `aria-invalid="true"` 설정  |        | High     |
| aria-describedby | 오류 메시지 연결            |        | High     |

---

### 4.3 자동완성

**WCAG:** 1.3.5 (Level AA)
**KWCAG:** 3.3.4

| 입력 유형 | autocomplete 값                     | 자동화 | 우선순위 |
| --------- | ----------------------------------- | ------ | -------- |
| 이름      | `name`                              |        | High     |
| 이메일    | `email`                             |        | High     |
| 전화번호  | `tel`                               |        | High     |
| 주소      | `street-address`                    |        | High     |
| 생년월일  | `bday`                              |        | Medium   |
| 비밀번호  | `new-password` / `current-password` |        | High     |

---

## 🧭 5. 네비게이션 (Navigation)

### 5.1 건너뛰기 링크

**WCAG:** 2.4.1 (Level A)
**KWCAG:** 2.4.1

| 항목      | 요구사항                       | 자동화 | 우선순위 |
| --------- | ------------------------------ | ------ | -------- |
| 위치      | 문서 최상단                    |        | Critical |
| 초점 표시 | 포커스 시 명확히 표시          |        | Critical |
| 대상      | 주요 콘텐츠 영역 (`main`)      |        | Critical |
| 텍스트    | "본문 바로가기" 등 명확한 표현 |        | High     |

**예시:**

```html
<!-- 올바른 예 -->
<a href="#main-content" class="skip-link"> 본문 바로가기 </a>

<main id="main-content">
  <!-- 주요 콘텐츠 -->
</main>
```

---

### 5.2 제목 구조

**WCAG:** 2.4.6 (Level AA)
**KWCAG:** 2.4.2

| 항목           | 요구사항                           | 자동화 | 우선순위 |
| -------------- | ---------------------------------- | ------ | -------- |
| `h1` 필수      | 페이지당 1개                       |        | High     |
| 순서 준수      | `h1` → `h2` → `h3` (건너뛰기 금지) |        | High     |
| 의미 있는 제목 | 섹션 내용 설명                     |        | Medium   |
| 시각적 스타일  | 제목 태그와 독립적                 |        | Low      |

---

### 5.3 랜드마크 (Landmarks)

**WCAG:** 1.3.1 (Level A)
**KWCAG:** 1.3.1

| 랜드마크 | 요소        | 필수 | 자동화 | 우선순위 |
| -------- | ----------- | ---- | ------ | -------- |
| Header   | `<header>`  |      |        | High     |
| Main     | `<main>`    |      |        | Critical |
| Nav      | `<nav>`     |      |        | High     |
| Footer   | `<footer>`  |      |        | High     |
| Aside    | `<aside>`   | -    |        | Medium   |
| Section  | `<section>` | -    |        | Low      |

---

## ♿ 6. ARIA 속성 (ARIA Attributes)

### 6.1 역할 (Roles)

**WCAG:** 4.1.2 (Level A)
**KWCAG:** 3.4.1

| 컴포넌트 | role      | 자동화 | 우선순위 |
| -------- | --------- | ------ | -------- |
| Button   | `button`  |        | Critical |
| Link     | `link`    |        | Critical |
| Dialog   | `dialog`  |        | Critical |
| Alert    | `alert`   |        | High     |
| Menu     | `menu`    |        | High     |
| Tablist  | `tablist` |        | High     |

---

### 6.2 상태 (States)

**WCAG:** 4.1.2 (Level A)
**KWCAG:** 3.4.1

| 속성            | 용도           | 자동화 | 우선순위 |
| --------------- | -------------- | ------ | -------- |
| `aria-expanded` | 확장/축소 상태 |        | High     |
| `aria-checked`  | 체크 상태      |        | Critical |
| `aria-selected` | 선택 상태      |        | High     |
| `aria-pressed`  | 토글 버튼 상태 |        | Medium   |
| `aria-disabled` | 비활성 상태    |        | High     |
| `aria-hidden`   | 숨김 상태      |        | High     |
| `aria-invalid`  | 유효성 오류    |        | High     |

---

### 6.3 관계 (Relationships)

**WCAG:** 1.3.1, 4.1.2 (Level A)
**KWCAG:** 3.4.1

| 속성               | 용도             | 자동화 | 우선순위 |
| ------------------ | ---------------- | ------ | -------- |
| `aria-label`       | 요소 레이블      |        | Critical |
| `aria-labelledby`  | 레이블 요소 참조 |        | High     |
| `aria-describedby` | 설명 요소 참조   |        | High     |
| `aria-controls`    | 제어 대상 참조   |        | Medium   |
| `aria-owns`        | 소유 관계        |        | Medium   |

---

## 📱 7. 반응형 및 터치 (Responsive & Touch)

### 7.1 터치 타겟 크기

**WCAG:** 2.5.5 (Level AAA)
**KWCAG:** 2.5.2

| 항목      | 최소 크기 | 권장 크기 | 자동화 | 우선순위 |
| --------- | --------- | --------- | ------ | -------- |
| 버튼      | 44×44px   | 48×48px   |        | High     |
| 링크      | 44×44px   | 48×48px   |        | High     |
| 체크박스  | 24×24px   | 32×32px   |        | Medium   |
| 라디오    | 24×24px   | 32×32px   |        | Medium   |
| 터치 간격 | 8px       | 16px      |        | Medium   |

---

### 7.2 화면 회전

**WCAG:** 1.3.4 (Level AA)
**KWCAG:** 1.3.2

| 항목           | 요구사항               | 자동화 | 우선순위 |
| -------------- | ---------------------- | ------ | -------- |
| 세로/가로 모드 | 둘 다 지원             |        | Medium   |
| 레이아웃 유지  | 회전 시 정보 손실 없음 |        | Medium   |

---

### 7.3 텍스트 크기 조정

**WCAG:** 1.4.4 (Level AA)
**KWCAG:** 1.3.4

| 항목           | 요구사항                 | 자동화 | 우선순위 |
| -------------- | ------------------------ | ------ | -------- |
| 200% 확대      | 레이아웃 깨짐 없음       |        | High     |
| `rem` 단위     | 텍스트 크기에 `rem` 사용 |        | High     |
| 고정 크기 금지 | `px` 단위 금지           |        | Medium   |

---

## 🏷️ 8. 의미론적 HTML (Semantic HTML)

### 8.1 기본 태그

**WCAG:** 1.3.1, 4.1.1 (Level A)
**KWCAG:** 3.3.1, 3.4.1

| 요소          | 올바른 사용     | 잘못된 사용         | 자동화 | 우선순위 |
| ------------- | --------------- | ------------------- | ------ | -------- |
| `<button>`    | 버튼 동작       | `<div>` + `onClick` |        | Critical |
| `<a>`         | 링크 (URL 이동) | 버튼 동작           |        | Critical |
| `<h1>`~`<h6>` | 제목 계층       | 스타일 목적         |        | High     |
| `<table>`     | 데이터 표       | 레이아웃 목적       |        | High     |
| `<ul>`/`<ol>` | 목록            | 일반 그룹핑         |        | Medium   |

---

### 8.2 언어 속성

**WCAG:** 3.1.1, 3.1.2 (Level A, AA)
**KWCAG:** 3.1.1

| 항목        | 요구사항           | 자동화 | 우선순위 |
| ----------- | ------------------ | ------ | -------- |
| 페이지 언어 | `<html lang="ko">` |        | Critical |
| 부분 언어   | `<span lang="en">` |        | Medium   |

---

## 📊 우선순위별 정리

### Critical (치명적 - 즉시 수정 필요)

- [ ] 모든 이미지에 `alt` 속성
- [ ] 키보드로 모든 기능 접근 가능
- [ ] 초점 명확히 표시
- [ ] 모든 폼 요소에 레이블
- [ ] 명도 대비 4.5:1 이상 (텍스트)
- [ ] 올바른 HTML 태그 사용
- [ ] 페이지 언어 속성 (`lang`)
- [ ] `<main>` 랜드마크 존재

### High (높음 - 빠른 시일 내 수정)

- [ ] 명도 대비 3:1 이상 (UI 컴포넌트)
- [ ] 건너뛰기 링크 제공
- [ ] 제목 구조 (`h1`~`h6`) 올바름
- [ ] 오류 메시지 명확
- [ ] Focus Trap 및 Restore
- [ ] ARIA 상태 속성 올바름
- [ ] 터치 타겟 크기 44px 이상

### Medium (중간 - 개선 권장)

- [ ] 장식용 이미지 `alt=""`
- [ ] 자동완성 속성 설정
- [ ] 링크 텍스트 명확
- [ ] 색상 외 정보 전달 수단
- [ ] 200% 텍스트 확대 지원

---

## 🔧 HANUI 자동화 현황

### 완전 자동화 (100%)

- 키보드 접근성
- 초점 관리 (Trap, Restore)
- ARIA 속성 (role, state, property)
- 의미론적 HTML
- 터치 타겟 크기
- 텍스트 확대 지원

### 부분 자동화 (개발자 확인 필요)

- 이미지 대체 텍스트 (의미 파악 필요)
- 제목 구조 (콘텐츠 의존)
- 랜드마크 배치 (레이아웃 의존)
- 언어 속성 (콘텐츠 의존)
- 복잡한 차트/그래프 설명

---

## 📚 관련 문서

- [디지털 포용](./01-digital-inclusion.md)
- [색상 및 명도 대비](./03-color-contrast.md)
- [네비게이션 접근성](./05-navigation.md)
- [상호작용 요소](./06-interactive.md)
- [폼 접근성](./07-forms.md)
- [이미지 및 미디어](./08-media.md)

---

**작성일:** 2025-11-14
**출처:** KRDS, WCAG 2.1, KWCAG 2.2
**관리:** HANUI 개발팀
**용도:** 컴포넌트 개발, Inspector 검증, 블로그 작성
