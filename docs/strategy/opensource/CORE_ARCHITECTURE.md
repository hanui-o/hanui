# HANUI 핵심 아키텍처 및 컴포넌트 전략

> "국내 최초 접근성 자동화 UI 엔진"으로 만들기 위한 완성도 높은 전략 설계

---

## 목차

1. [Q1. 핵심 컴포넌트 10개 우선순위](#q1-핵심-컴포넌트-10개-우선순위)
2. [Q2. 접근성 자동화 엔진 아키텍처](#q2-접근성-자동화-엔진-아키텍처)
3. [Q3. 경쟁사 대비 브랜드 메시지](#q3-경쟁사-대비-브랜드-메시지)
4. [MVP 로드맵](#mvp-로드맵)

---

## Q1. 핵심 컴포넌트 10개 우선순위

### 핵심 선정 기준

> **"많이 쓰이고, 접근성 난이도가 높고, 자동화 효과가 큰 컴포넌트"**부터 만든다.

전 세계 UI 라이브러리들(MUI, Radix, Chakra, Semi Design)이 공통적으로 이 순서로 성공했습니다.

---

### 우선순위 1단계 — 복잡도 높고 A11y 자동화 가치 큰 5개

> 이 5개는 먼저 만들면 **바로 시장에서 인정받는 컴포넌트**입니다.

---

#### 1) Dialog / Modal

**자동화 요소**:

- 포커스 트랩 (Focus Trap)
- `aria-modal` 자동 설정
- ESC 키로 닫기
- 스크린 리더 announcement

**시장 가치**:

- Radix Dialog처럼 "접근성 구현 난이도가 높은 대표 컴포넌트"
- 한 번 잘 만들면 경쟁 우위 확보

**구현 예시**:

```tsx
<Dialog>
  <DialogTrigger>열기</DialogTrigger>
  <DialogContent>
    {/* 포커스 트랩 자동 적용 */}
    {/* aria-modal="true" 자동 */}
    {/* ESC 닫기 자동 */}
  </DialogContent>
</Dialog>
```

---

#### 2) Dropdown / Popover

**자동화 요소**:

- 방향 자동 계산 (collision detection)
- Arrow key navigation
- `role="menu"` 자동 처리
- `aria-activedescendant` 자동 지정

**시장 가치**:

- Radix Popover + Menu를 대체할 **한국형 컴포넌트가 없음**
- 차별화 가능성 매우 높음

**구현 예시**:

```tsx
<Dropdown>
  <DropdownTrigger>메뉴</DropdownTrigger>
  <DropdownContent>
    {/* Arrow key 자동 지원 */}
    {/* role="menu" 자동 */}
    {/* 충돌 방지 자동 */}
  </DropdownContent>
</Dropdown>
```

---

#### 3) Tabs

**자동화 요소**:

- `role="tablist"` 자동 적용
- `aria-selected`, `aria-controls` 자동 연결
- 방향키 이동 지원 (Arrow keys)
- 키보드 포커스 관리

**시장 가치**:

- **KRDS에서 반복적으로 오류가 나는 요소**
- 한국 시장에서 바로 효용 발생

**구현 예시**:

```tsx
<Tabs>
  <TabsList>
    {/* role="tablist" 자동 */}
    <TabsTrigger value="tab1">탭 1</TabsTrigger>
    {/* aria-selected 자동 */}
  </TabsList>
  <TabsContent value="tab1">{/* aria-labelledby 자동 연결 */}</TabsContent>
</Tabs>
```

---

#### 4) Combobox / Select

**자동화 요소**:

- `aria-expanded` 자동 관리
- `aria-autocomplete` 자동 설정
- 검색 + 키보드 조작 통합
- 옵션 announcement 자동화

**시장 가치**:

- **기업 내부 시스템에서 사용량 폭발**
- 한 번 잘 만들면 시장 장악 가능

**구현 예시**:

```tsx
<Select>
  <SelectTrigger>{/* aria-expanded 자동 */}</SelectTrigger>
  <SelectContent>
    <SelectItem value="1">{/* aria-selected 자동 */}</SelectItem>
  </SelectContent>
</Select>
```

---

#### 5) Tooltip

**자동화 요소**:

- 포커스 접근성
- 마우스 hover + 키보드 방식 통합
- `aria-describedby` 자동 연결
- ESC 키로 닫기

**시장 가치**:

- 생각보다 **접근성 구현이 까다로운 컴포넌트**
- 자동화 가치 매우 높음

**구현 예시**:

```tsx
<Tooltip>
  <TooltipTrigger>{/* aria-describedby 자동 연결 */}</TooltipTrigger>
  <TooltipContent>{/* 키보드 포커스 자동 지원 */}</TooltipContent>
</Tooltip>
```

---

### 우선순위 2단계 — Form 전반 품질 자동화 5개

> Form 요소는 **KRDS 평가 중 가장 빈번하게 경고가 발생하는 영역**입니다.

---

#### 6) Input (텍스트)

**자동화 요소**:

- `label` ↔ `input` 자동 연결
- 오류 메시지 `aria-live` 자동 포함
- `placeholder` 대체 텍스트 검사
- 유효성 검사 상태 자동 전달

```tsx
<FormField>
  <Label>이름</Label>
  <Input />
  {/* label ↔ input 자동 연결 */}
  {/* aria-invalid 자동 */}
</FormField>
```

---

#### 7) Checkbox

**자동화 요소**:

- `role="checkbox"` 자동
- `aria-checked` 상태 자동 관리
- 키보드 Space 토글 지원

---

#### 8) Radio Group

**자동화 요소**:

- `role="radiogroup"` 자동
- Arrow key 그룹 내 이동
- `aria-checked` 자동 관리

---

#### 9) Switch

**자동화 요소**:

- `role="switch"` 자동
- `aria-checked` 자동
- 토글 상태 announcement

---

#### 10) Button

**자동화 요소**:

- `role="button"` 자동
- `disabled` ARIA 자동 처리
- `aria-pressed` 상태 자동 (토글 버튼)
- 로딩 상태 `aria-busy` 자동

---

### 📋 HANUI MVP 10개 컴포넌트

| 순위 | 컴포넌트     | 카테고리   | A11y 난이도 | 시장 가치 |
| ---- | ------------ | ---------- | ----------- | --------- |
| 1    | **Dialog**   | Overlay    | ⭐⭐⭐⭐⭐  | 매우 높음 |
| 2    | **Dropdown** | Navigation | ⭐⭐⭐⭐⭐  | 매우 높음 |
| 3    | **Tabs**     | Navigation | ⭐⭐⭐⭐    | 높음      |
| 4    | **Select**   | Form       | ⭐⭐⭐⭐⭐  | 매우 높음 |
| 5    | **Tooltip**  | Overlay    | ⭐⭐⭐⭐    | 높음      |
| 6    | **Input**    | Form       | ⭐⭐⭐      | 높음      |
| 7    | **Checkbox** | Form       | ⭐⭐        | 중간      |
| 8    | **Radio**    | Form       | ⭐⭐⭐      | 중간      |
| 9    | **Switch**   | Form       | ⭐⭐        | 중간      |
| 10   | **Button**   | Action     | ⭐⭐        | 높음      |

> 🎯 **결론**: 이 10개만 제대로 만들어도 **"한국 최초 접근성 자동 UI 컴포넌트 라이브러리"** 타이틀을 바로 가져올 수 있습니다.

---

## Q2. 접근성 자동화 엔진 아키텍처

### 핵심 설계 원칙

> **'접근성 엔진'을 HANUI 내부에서 분리해 레이어로 제공**

---

### 3단계 레이어 아키텍처

```
┌───────────────────────────────────────┐
│   Styling Layer                       │
│   (100% Customizable UI)              │
│   - CSS Variables                     │
│   - Tailwind Preset                   │
│   - Styled Components Adapter         │
└───────────────────────────────────────┘
                  ▲
                  │
┌───────────────────────────────────────┐
│   Component Layer                     │
│   (Logic + Structure)                 │
│   - HDialog, HSelect, HTabs           │
│   - No Design, Only Function          │
└───────────────────────────────────────┘
                  ▲
                  │
┌───────────────────────────────────────┐
│   Foundation Layer                    │
│   (A11y Engine)                       │
│   - Primitives + Role Auto            │
│   - ARIA Mapping                      │
│   - Focus Engine                      │
│   - Keyboard Navigation DSL           │
└───────────────────────────────────────┘
```

---

### 1) Foundation Layer — Primitive + Role 자동화 엔진

**역할**: Radix의 Primitives와 같은 역할

**포함 요소**:

| 기능                         | 설명                                  |
| ---------------------------- | ------------------------------------- |
| **role 자동 삽입**           | 컴포넌트에 적절한 ARIA role 자동 적용 |
| **aria-\* 자동 매핑**        | 상태에 따른 ARIA 속성 자동 연결       |
| **focus restoration + trap** | 포커스 관리 자동화                    |
| **keyboard navigation DSL**  | 키보드 조작 규칙 선언적 정의          |
| **유효성 검사 스키마**       | WCAG/KRDS 검증 자동화                 |

**특징**:

- 디자인과 완전히 분리
- 순수 접근성 엔진
- 재사용 가능한 primitives

**코드 예시**:

```tsx
// Foundation Layer
import { createA11yPrimitive } from '@hanui/foundation';

const DialogPrimitive = createA11yPrimitive({
  role: 'dialog',
  aria: {
    modal: true,
    labelledby: 'auto',
    describedby: 'auto',
  },
  focus: {
    trap: true,
    restore: true,
  },
  keyboard: {
    Escape: 'close',
  },
});
```

---

### 2) Component Layer — 디자인 없이 기능만 포함된 UI

**역할**: Foundation Layer를 조합해 완성된 컴포넌트 제공

**예시 컴포넌트**:

- `<HDialog>`
- `<HSelect>`
- `<HTabs>`

**내부 구성**:

```tsx
// Component Layer
export const Dialog = ({ children, ...props }) => {
  return (
    <DialogPrimitive
      // a11y role + aria 자동
      // interaction state 관리
      // focus engine 적용
      // keyboard DSL 실행
      {...props}
    >
      {children}
    </DialogPrimitive>
  );
};
```

**특징**:

- 디자인 전혀 포함하지 않음
- 100% 기능에만 집중
- 접근성 자동 보장

---

### 3) Styling Layer — 사용자 커스터마이징 100% 허용

**제공 방식**:

| 방식                           | 설명                            | 사용자            |
| ------------------------------ | ------------------------------- | ----------------- |
| **CSS 변수 기반 토큰**         | Design Token으로 전체 테마 변경 | 디자이너 + 개발자 |
| **Tailwind preset**            | Tailwind 기반 빠른 스타일링     | 프론트엔드 개발자 |
| **Styled Component / Emotion** | CSS-in-JS 선호 개발자           | React 개발자      |
| **Vanilla Extract adapter**    | Zero-runtime CSS                | 성능 최적화 팀    |

**코드 예시**:

```tsx
// Styling Layer - CSS Variables
<Dialog className="custom-theme">
  <DialogContent
    style={{
      '--dialog-bg': '#fff',
      '--dialog-radius': '8px'
    }}
  >
    {/* 완전한 스타일 자유도 */}
  </DialogContent>
</Dialog>

// Styling Layer - Tailwind
<Dialog>
  <DialogContent className="bg-white rounded-lg shadow-xl">
    {/* Tailwind 클래스 자유롭게 사용 */}
  </DialogContent>
</Dialog>
```

**효과**:

> ✨ **"기능은 견고하게, 디자인은 완전히 자유롭게"**가 여기서 실현됩니다.

---

### 🎯 아키텍처 핵심 결론

```
[Foundation: A11y Engine]
      ↓
[Components: Logic + Structure]
      ↓
[Styling Layer: 100% Customizable UI]
```

**이 구조가 되면**:

> **"KRDS + WCAG 모두 자동으로 처리되는 프리미티브 엔진"**
>
> 이라는 강력한 차별점이 생깁니다.

---

## Q3. 경쟁사 대비 브랜드 메시지

### 핵심 포지셔닝

> **HANUI는 "한국형 접근성 자동화 UI 엔진"이라는 완전한 블루오션 포지션을 차지할 수 있습니다.**

---

### 1) vs Radix UI — "접근성 + 한국 KRDS 지원"

| 항목        | Radix UI             | HANUI                           |
| ----------- | -------------------- | ------------------------------- |
| **A11y**    | WCAG only            | **WCAG + KRDS 동시 지원**       |
| **Styling** | 100% 자유            | 동일하게 자유                   |
| **시장**    | 글로벌 엔지니어 중심 | **한국 + 동남아 공공시장까지**  |
| **포커스**  | 접근성 구조 중심     | **접근성 자동화 + 디자인 엔진** |

**브랜드 메시지**:

> "Radix가 WCAG 표준이라면,
> HANUI는 KRDS까지 책임지는 한국형 UI 엔진."

**차별화 포인트**:

- 한국 공공기관 입찰 즉시 대응
- KRDS 자동 검증
- 한글 기반 접근성 최적화

---

### 2) vs MUI — "디자인 강제 없음"

| 항목       | MUI                    | HANUI                                |
| ---------- | ---------------------- | ------------------------------------ |
| **디자인** | 자체 테마 강함         | **디자인 완전 자유**                 |
| **접근성** | 기본 제공              | **자동화 수준 더 높음**              |
| **목적**   | React 앱 디자인 빠르게 | **컴포넌트 품질 + 표준 준수 자동화** |

**브랜드 메시지**:

> "MUI는 테마 기반,
> HANUI는 접근성 중심의 엔진 기반."

**차별화 포인트**:

- 브랜드 정체성 유지 가능
- 디자인 시스템 자유도
- 더 가벼운 번들 사이즈

---

### 3) vs Semi Design — "기업 내부 시스템 대비"

| 항목       | Semi Design     | HANUI                |
| ---------- | --------------- | -------------------- |
| **포커스** | 디자인·컴포넌트 | **접근성·표준**      |
| **스타일** | 정해진 디자인   | **100% 커스텀**      |
| **목표**   | 전사 시스템 UI  | **공공 + 민간 모두** |

**브랜드 메시지**:

> "Semi는 디자인 시스템,
> HANUI는 접근성 엔진."

**차별화 포인트**:

- 공공기관 특화
- 법적 요구사항 자동 충족
- 디자인 자유도

---

### ⭐ HANUI의 최종 브랜드 메시지 (3줄 요약)

```
1) 접근성은 기본이 아니라 자동화되어야 한다.

2) KRDS와 WCAG을 동시에 충족하는 최초의 한국형 UI 엔진.

3) 기능은 견고하게, 디자인은 완전히 자유롭게.
```

---

### 📊 경쟁 우위 매트릭스

| 요소               | Radix      | MUI    | Semi   | **HANUI**      |
| ------------------ | ---------- | ------ | ------ | -------------- |
| **WCAG 지원**      | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | **⭐⭐⭐⭐⭐** |
| **KRDS 지원**      |            |        |        | **✅**         |
| **디자인 자유도**  | ⭐⭐⭐⭐⭐ | ⭐⭐   | ⭐⭐   | **⭐⭐⭐⭐⭐** |
| **한국 시장 특화** |            |        |        | **✅**         |
| **자동화 수준**    | ⭐⭐⭐⭐   | ⭐⭐⭐ | ⭐⭐⭐ | **⭐⭐⭐⭐⭐** |

---

## MVP 로드맵

### Phase 1: Foundation Layer 구축 (0-3개월)

**목표**: 접근성 엔진 핵심 개발

- [ ] A11y Primitives 시스템 설계
- [ ] Focus Engine 개발
  - Focus Trap
  - Focus Restoration
  - Focus Scope
- [ ] Keyboard Navigation DSL 개발
- [ ] ARIA Auto-mapping 시스템
- [ ] WCAG/KRDS 검증 엔진

---

### Phase 2: 핵심 5개 컴포넌트 (3-6개월)

**목표**: 복잡도 높은 컴포넌트 완성

- [ ] Dialog / Modal
- [ ] Dropdown / Popover
- [ ] Tabs
- [ ] Select / Combobox
- [ ] Tooltip

**각 컴포넌트당**:

- WCAG 2.2 AA 준수
- KRDS 2.2 준수
- 자동화된 접근성 테스트
- 문서화 (한글 + 영문)

---

### Phase 3: Form 컴포넌트 완성 (6-9개월)

**목표**: Form 접근성 완벽 구현

- [ ] Input
- [ ] Checkbox
- [ ] Radio Group
- [ ] Switch
- [ ] Button

**추가 기능**:

- Form 유효성 검사 자동화
- 에러 메시지 자동 연결
- Label 자동 매핑

---

### Phase 4: Styling Layer & 생태계 (9-12개월)

**목표**: 디자인 자유도 극대화

- [ ] CSS Variables 시스템
- [ ] Tailwind Preset
- [ ] Styled Components Adapter
- [ ] Vanilla Extract Support
- [ ] Figma Plugin (Design Token 자동화)

---

### Phase 5: 글로벌 확장 (12개월+)

**목표**: 해외 시장 진출

- [ ] 영문 문서 완성
- [ ] ADA (미국) 지원
- [ ] EN 301 549 (EU) 지원
- [ ] 국제 컨퍼런스 발표
- [ ] 오픈소스 커뮤니티 성장

---

## 핵심 성공 지표

| 지표              | 6개월 목표 | 12개월 목표 |
| ----------------- | ---------- | ----------- |
| **컴포넌트 수**   | 10개       | 20개+       |
| **WCAG 준수율**   | 100%       | 100%        |
| **KRDS 준수율**   | 100%       | 100%        |
| **GitHub Stars**  | 1K         | 5K          |
| **NPM 다운로드**  | 10K/월     | 50K/월      |
| **공공기관 도입** | 3곳        | 10곳+       |
| **기업 도입**     | 5곳        | 20곳+       |

---

## 다음 단계

1. **Foundation Layer 프로토타입 개발**
2. **Dialog 컴포넌트 MVP 제작**
3. **KRDS/WCAG 검증 시스템 구축**
4. **커뮤니티 피드백 수집**

---

**작성일**: 2025-11-14
**버전**: 1.0
**담당**: HANUI 전략팀
**관련 문서**:

- [GLOBAL_POSITIONING.md](./GLOBAL_POSITIONING.md)
- [DESIGN_FLEXIBILITY.md](./DESIGN_FLEXIBILITY.md)
- [A11Y_IMPLEMENTATION.md](./A11Y_IMPLEMENTATION.md)
