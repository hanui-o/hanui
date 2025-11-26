# HANUI 엔진 핵심 기능 및 비즈니스 모델

> HANUI의 비전·기술 방향·비즈니스 모델을 완전히 선명하게 정의하는 전략 문서

---

## 목차

1. [Q1. 접근성 자동화 엔진의 20가지 핵심 기능](#q1-접근성-자동화-엔진의-20가지-핵심-기능)
2. [Q2. HANUI 오픈소스 비즈니스 모델](#q2-hanui-오픈소스-비즈니스-모델)
3. [실행 전략](#실행-전략)

---

## Q1. 접근성 자동화 엔진의 20가지 핵심 기능

### 핵심 컨셉

> HANUI의 엔진은 단순히 aria-속성을 넣어주는 수준이 아니라,
> **WCAG + KRDS를 컴포넌트 수준에서 자동으로 보정해주는 로직 레이어**입니다.

**참조 분석 대상**:

- Radix UI
- Chakra UI
- Shopify Polaris
- Microsoft Fluent
- Adobe Spectrum

---

### Foundation Layer 핵심 20가지 기능

---

#### 1) 자동 ARIA Role 매퍼

**기능**:

- `<button>` → `role="button"` 자동 적용
- `<div>`로 버튼 만들면 자동 경고 or role 부여
- KRDS 준수 자동 적용

**구현 예시**:

```tsx
// 개발자 코드
<div onClick={handleClick}>클릭</div>

// HANUI 엔진 경고
Warning: Interactive element without proper role
Suggestion: Use <Button> or add role="button"

// 자동 보정 옵션
<div onClick={handleClick} role="button" tabIndex={0}>
  클릭
</div>
```

---

#### 2) 포커스 트래핑 (Focus Trap Engine)

**기능**:

- Dialog, Drawer, Modal에서 필수
- 탈출 불가 루프 자동 생성
- Tab 키 순환 처리

**적용 컴포넌트**: Dialog, Modal, Drawer, Popover

---

#### 3) 포커스 복구 (Focus Restore)

**기능**:

- Dialog 닫으면 이전 포커스 위치 자동 복구
- Radix도 강점으로 가져가는 영역

**동작 시나리오**:

```
1. 버튼에 포커스 → 클릭
2. Dialog 열림
3. Dialog 내부로 포커스 이동
4. Dialog 닫힘
5. 원래 버튼으로 포커스 자동 복귀 ✅
```

---

#### 4) 키보드 네비게이션 DSL

**기능**:

- `ArrowUp`, `ArrowDown`, `Home`, `End` 등
- 컴포넌트별 키보드 스키마 자동 생성

**DSL 예시**:

```tsx
const TabsKeyboardSchema = {
  ArrowLeft: 'previousTab',
  ArrowRight: 'nextTab',
  Home: 'firstTab',
  End: 'lastTab',
};
```

---

#### 5) aria-labelledby / aria-controls 자동 연결기

**기능**:

- Select, Tabs, Accordion 등에서 핵심
- ID 자동 생성 및 연결

**자동 생성 예시**:

```tsx
<Tabs>
  <TabsList>
    <TabsTrigger value="tab1">
      {/* id="tabs-trigger-1" 자동 생성 */}
      {/* aria-controls="tabs-content-1" 자동 연결 */}
    </TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    {/* id="tabs-content-1" 자동 생성 */}
    {/* aria-labelledby="tabs-trigger-1" 자동 연결 */}
  </TabsContent>
</Tabs>
```

---

#### 6) aria-live 지역 자동 생성

**적용 영역**:

- 에러 메시지
- 폼 validation
- 로딩 상태
- 알림 메시지

**자동 처리 예시**:

```tsx
<FormField error="필수 입력 항목입니다">
  {/* 자동 생성: */}
  <span role="alert" aria-live="polite">
    필수 입력 항목입니다
  </span>
</FormField>
```

---

#### 7) 포커스 비주얼 자동 보정

**기능**:

- WCAG 2.2에서 필수 기준으로 강화됨
- outline이 없는 경우 자동 보정
- 최소 명암비 보장

**CSS 자동 생성**:

```css
/* HANUI 엔진이 자동 추가 */
.hanui-button:focus-visible {
  outline: 2px solid var(--hanui-focus-color);
  outline-offset: 2px;
}
```

---

#### 8) ESC / Backdrop 클릭 상호작용 자동화

**기능**:

- Dialog, Popover에서 표준 패턴 준수
- ESC 키 자동 처리
- 바깥 영역 클릭 자동 감지

**적용 컴포넌트**: Dialog, Modal, Popover, Dropdown

---

#### 9) TabIndex 자동 보정

**기능**:

- `tabIndex="-1"` 자동 설정
- Interactive element 우선순위 자동 정렬
- 스크린리더 순서 최적화

**자동 처리 로직**:

```tsx
// Hidden element
<div aria-hidden="true" tabIndex={-1}>

// Interactive element
<button tabIndex={0}>
```

---

#### 10) 스크린리더 announce 엔진

**자동 announcement 시나리오**:

- Dialog open → "대화상자가 열렸습니다"
- Select open → "옵션 목록이 열렸습니다"
- Error 발생 → "오류: [메시지]"

**구현 방식**:

```tsx
// HANUI 내부 LiveRegion 자동 관리
<div role="status" aria-live="polite" aria-atomic="true">
  {/* 동적 메시지 자동 삽입 */}
</div>
```

---

#### 11) 색 대비 검증 (Color Contrast Checker)

**기능**:

- 버튼/텍스트 대비 자동 분석
- Console warning or dev overlay
- WCAG AA/AAA 준수 검사

**개발 모드 경고**:

```
Color Contrast Issue
Background: #f0f0f0
Text: #e0e0e0
Contrast Ratio: 1.2:1 (Minimum: 4.5:1)
```

---

#### 12) 구조적 시맨틱 강제

**기능**:

- `<nav>` + `<ul>` 조합 권장
- `<section>` + `<h*>` 필요 시 자동 안내
- KRDS 준수 로직

**자동 검증**:

```tsx
<nav>
  <div>메뉴</div> {/* Warning: nav should contain list */}
</nav>

// 권장 구조
<nav>
  <ul>
    <li>메뉴</li>
  </ul>
</nav>
```

---

#### 13) Dismissable Layer Engine

**기능**: Radix의 핵심 기능

- 바깥 클릭 감지
- ESC 감지
- 중첩 레이어 우선순위 관리

**중첩 레이어 처리**:

```
Dialog 1 (최상위)
  → Popover (중간)
    → Tooltip (하위)

ESC 키 → Tooltip 닫힘
ESC 키 → Popover 닫힘
ESC 키 → Dialog 닫힘
```

---

#### 14) Focus Ring Visibility Controller

**기능**:

- 마우스 클릭 시 포커스링 제거
- 키보드 사용 시 다시 표시
- WCAG "Keyboard only focus" 자동 충족

**구현 로직**:

```tsx
// 마우스 사용 감지
:focus:not(:focus-visible) {
  outline: none;
}

// 키보드 사용 감지
:focus-visible {
  outline: 2px solid var(--focus-color);
}
```

---

#### 15) Motion 감소 자동 대응

**기능**:

- `prefers-reduced-motion` 감지
- animation, transition 자동 감소
- 접근성 설정 존중

**자동 CSS 생성**:

```css
@media (prefers-reduced-motion: reduce) {
  .hanui-dialog {
    animation: none;
    transition: none;
  }
}
```

---

#### 16) Auto Direction Handling (LTR/RTL)

**기능**:

- 글로벌 대비 (아랍어 등)
- Layout direction 자동 변경
- 컴포넌트 미러링

**자동 처리**:

```tsx
<html dir="rtl">
  {/* 모든 HANUI 컴포넌트 자동 미러링 */}
  <Dropdown /> {/* 오른쪽에서 왼쪽으로 열림 */}
</html>
```

---

#### 17) Auto Positioning Engine

**기능**: Popover, Tooltip, Dropdown

- 화면 밖으로 튀어나오면 자동 reposition
- Radix Floating UI처럼 작동

**충돌 감지 및 재배치**:

```tsx
<Tooltip>
  {/* 기본: 위쪽 */}
  {/* 공간 부족 → 아래쪽으로 자동 이동 */}
  {/* 좌우 공간 부족 → 중앙 정렬 */}
</Tooltip>
```

---

#### 18) A11y DevTools Overlay

**기능**:

- 개발자 도구에서 접근성 오류 시각적 표시
- 문제 부분 하이라이트
- 해결 가이드 제시

**Dev Mode UI**:

```
┌─────────────────────────────────┐
│ HANUI A11y Inspector            │
├─────────────────────────────────┤
│ 3 Issues Found               │
│                                 │
│ 1. Missing label (Button #3)   │
│    → Add aria-label             │
│                                 │
│ 2. Low contrast (Text #7)      │
│    → Increase to 4.5:1          │
│                                 │
│ 3. Missing heading (Section)   │
│    → Add <h2> or aria-label     │
└─────────────────────────────────┘
```

---

#### 19) Auto Label Detection

**기능**:

- `<label>`이 빠진 경우 자동 경고
- `aria-label` 자동 보정 옵션

**자동 감지 및 경고**:

```tsx
<Input /> {/* Missing label */}

// 권장 수정
<FormField>
  <Label>이름</Label>
  <Input />
</FormField>
```

---

#### 20) Multi-Standard Checker

**검사 기준**:

- WCAG 2.1 / 2.2
- KRDS 접근성 가이드
- HANUI 내부 기준

**자동 리포트**:

```json
{
  "wcag": {
    "2.1.1": "pass",
    "2.4.7": "fail",
    "4.1.2": "pass"
  },
  "krds": {
    "perceivable": "pass",
    "operable": "warning",
    "understandable": "pass",
    "robust": "pass"
  },
  "hanui": {
    "focusManagement": "pass",
    "ariaLabels": "warning",
    "colorContrast": "fail"
  }
}
```

---

### 🎯 HANUI 엔진 4대 영역 요약

| 영역                 | 핵심 기능                 | 효과               |
| -------------------- | ------------------------- | ------------------ |
| **구조 자동화**      | Role, ARIA, Semantic 강제 | 표준 준수 자동화   |
| **상호작용 자동화**  | Focus, Keyboard, Dismiss  | UX 품질 보장       |
| **표준 준수 자동화** | WCAG/KRDS 검사            | 법적 요구사항 충족 |
| **DevTools 시스템**  | Inspector, Warning, Guide | 개발자 경험 향상   |

> ✨ **이걸 갖추면 대한민국 어디에도 없는 "AI 기반 접근성 자동화 UI 엔진"이 됩니다.**

---

## Q2. HANUI 오픈소스 비즈니스 모델

### 벤치마크 분석

**참조 모델**:

- Radix UI (Primitives + Themes)
- Clerk (오픈소스 + 유료 SaaS)
- Supabase (오픈소스 + 엔터프라이즈)
- Sentry (오픈소스 + 유료 서비스)
- Chakra UI (오픈소스 + Pro)

---

### 🟦 1) Enterprise 플랜: KRDS + WCAG 검증 자동화 SaaS

#### 핵심 가치

> HANUI의 가장 큰 강점은 **"표준 준수 자동화"**
>
> 이걸 SaaS로 만들면 한국 공공기관·대기업이 바로 돈을 냅니다.

---

#### 제품: HANUI Inspector (SaaS)

**기능**:

- 사이트 주소 입력 → KRDS + WCAG 자동 체크
- 문제 자동 리포트
- 해결 가이드
- 점수화
- 버전 비교
- CI/CD 통합

**UI 예시**:

```
┌──────────────────────────────────────┐
│ HANUI Inspector                      │
├──────────────────────────────────────┤
│ URL: https://example.com             │
│                                      │
│ Overall Score: 87/100                │
│ WCAG 2.2 AA: Pass                 │
│ KRDS: 3 Warnings                  │
│                                      │
│ Issues:                              │
│ 1. Missing alt text (3 images)      │
│ 2. Low contrast (2 buttons)         │
│ 3. Missing heading structure (1)    │
│                                      │
│ [Download Report] [Fix Guide]       │
└──────────────────────────────────────┘
```

---

#### 가격 모델

| 플랜           | 가격      | 기능                      |
| -------------- | --------- | ------------------------- |
| **Free**       | 무료      | 월 10회 검사              |
| **Pro**        | $49/월    | 무제한 검사 + CI/CD       |
| **Enterprise** | $499/월   | 다중 프로젝트 + 전담 지원 |
| **Government** | 맞춤 견적 | 공공기관 특화 + 인증      |

---

#### 시장 가치

> ⭐ **한국에서 유일한 서비스가 됩니다.**

**타겟 고객**:

- 공공기관 (나라장터 입찰 대응)
- 대기업 (법적 리스크 최소화)
- 웹 에이전시 (클라이언트 납품 전 검증)
- 스타트업 (글로벌 진출 준비)

---

### 🟦 2) Enterprise UI Kit (Multi-theme + Design Token Builder)

#### 제품 구성

**Radix Themes처럼 회사 전용 테마·디자인 키트 유료 판매**

**포함 요소**:

| 항목                        | 설명                           | 가격       |
| --------------------------- | ------------------------------ | ---------- |
| **Figma Kit**               | 전체 컴포넌트 Figma 라이브러리 | $299 (1회) |
| **React/Vue 테마 생성기**   | Design Token → Code 자동 변환  | $99/월     |
| **회사 전용 컴포넌트**      | 브랜드 맞춤 컴포넌트 패키지    | $199/월    |
| **Multi-framework Support** | React, Vue, Svelte, Solid      | +$49/월    |

---

#### Design Token Builder 예시

```json
// tokens.json
{
  "colors": {
    "primary": "#0066cc",
    "secondary": "#6c757d"
  },
  "spacing": {
    "sm": "8px",
    "md": "16px"
  }
}

// 자동 생성 →
// - CSS Variables
// - Tailwind Config
// - Figma Tokens
// - React Theme Object
```

---

#### 시장 가치

> **국내 기업은 Figma + React/Vue 통합을 매우 원합니다 → 시장 큰 편**

**타겟**:

- 디자인 시스템을 구축하는 중견기업
- 브랜드 통일성이 중요한 대기업
- 멀티 프레임워크 지원이 필요한 팀

---

### 🟦 3) Support 계약 (SI · 공공기관 대상)

#### 서비스 내용

**기업·공공기관이 필요한 것**:

- 접근성 검증
- 컴포넌트 확장 개발
- 맞춤형 UI 시스템
- KRDS 기반 리뉴얼

---

#### HANUI Partner 프로그램

**3단계 파트너십**:

| 등급          | 조건               | 혜택               |
| ------------- | ------------------ | ------------------ |
| **Certified** | HANUI 교육 이수    | 공식 인증 배지     |
| **Premier**   | 3개 프로젝트 경험  | 우선 지원 + 마케팅 |
| **Elite**     | 10개 프로젝트 경험 | 독점 프로젝트 배정 |

---

#### 수익 구조

**프로젝트 기반 수익**:

- 접근성 컨설팅: 500만원~
- 컴포넌트 개발: 1,000만원~
- 전체 시스템 구축: 3,000만원~
- 연간 유지보수: 500만원~

---

#### 시장 가치

> ✨ **이건 당신의 경력과 딱 맞는 영역입니다.**

**장점**:

- 공공기관 네트워크 활용
- 반복 수익 모델
- 브랜드 신뢰도 상승

---

### 🟦 4) 교육 + 인증 (공공기관용)

#### 프로그램 구성

**국내 최초 "HANUI 접근성 인증 교육"**

**커리큘럼**:

| 과정                    | 시간   | 가격    | 대상              |
| ----------------------- | ------ | ------- | ----------------- |
| **기초 과정**           | 4시간  | 30만원  | 디자이너, 기획자  |
| **컴포넌트 접근성**     | 8시간  | 60만원  | 프론트엔드 개발자 |
| **KRDS + Figma UI**     | 8시간  | 60만원  | 디자인 시스템 팀  |
| **React 접근성 워크숍** | 16시간 | 120만원 | 개발 팀 리드      |
| **인증 시험**           | 2시간  | 20만원  | 전체              |

---

#### 인증 제도

**HANUI Certified Professional (HCP)**

**등급**:

- HCP - Foundation (기초)
- HCP - Developer (개발자)
- HCP - Expert (전문가)

**인증 효과**:

- 이력서 차별화
- 프로젝트 입찰 가산점
- HANUI 커뮤니티 네트워킹

---

#### 시장 가치

> 💰 **수익성과 인지도 상승 둘 다 좋습니다.**

**B2B 판매**:

- 기업 단체 교육
- 공공기관 워크숍
- 대학교 특강

**B2C 판매**:

- 개인 개발자
- 프리랜서
- 취업 준비생

---

### ⭐ HANUI 비즈니스 모델 종합

```
┌─────────────────────────────────────────┐
│ HANUI Business Model                    │
├─────────────────────────────────────────┤
│                                         │
│ 오픈소스 (무료)                          │
│ ├─ Primitives (Foundation Layer)       │
│ └─ Components (10개 기본)               │
│                                         │
│ SaaS (유료)                             │
│ ├─ HANUI Inspector                     │
│ │  └─ KRDS/WCAG 자동 검사기             │
│ └─ CI/CD Integration                   │
│                                         │
│ Enterprise (유료)                       │
│ ├─ Figma Kit                           │
│ ├─ Design Token Builder                │
│ └─ Multi-framework Support             │
│                                         │
│ SI/Partner (프로젝트)                    │
│ ├─ 커스텀 컴포넌트 개발                  │
│ ├─ 접근성 컨설팅                        │
│ ├─ 교육 & 인증                          │
│ └─ 유지보수                             │
│                                         │
└─────────────────────────────────────────┘
```

---

### 💰 수익 시뮬레이션 (12개월 후)

| 수익원             | 월 수익  | 연 수익   |
| ------------------ | -------- | --------- |
| **Inspector SaaS** | $10K     | $120K     |
| **Enterprise Kit** | $15K     | $180K     |
| **Partner/SI**     | $20K     | $240K     |
| **교육/인증**      | $5K      | $60K      |
| **총계**           | **$50K** | **$600K** |

---

### 🎯 비즈니스 모델 핵심 전략

> **이 모델은 Radix + Chakra + Material Design + Shopify Polaris 모델을 조합한 가장 강력한 조합입니다.**

**차별화 포인트**:

1. **KRDS 특화** - 국내 유일
2. **SaaS + 오픈소스 결합** - 글로벌 모델
3. **교육 생태계** - 장기 브랜드 구축
4. **Partner 프로그램** - 확장성 극대화

---

## 실행 전략

### Phase 1: 오픈소스 기반 구축 (0-6개월)

- [ ] Foundation Layer 개발
- [ ] 핵심 10개 컴포넌트
- [ ] 문서화 (한글 + 영문)
- [ ] GitHub Stars 1K 목표

### Phase 2: SaaS 런칭 (6-12개월)

- [ ] HANUI Inspector 개발
- [ ] 베타 테스터 모집 (공공기관)
- [ ] 가격 모델 검증
- [ ] 첫 유료 고객 확보

### Phase 3: Enterprise 확장 (12-18개월)

- [ ] Figma Kit 출시
- [ ] Design Token Builder
- [ ] Partner 프로그램 런칭
- [ ] 교육 과정 개설

### Phase 4: 글로벌 진출 (18-24개월)

- [ ] 영문 마케팅
- [ ] 해외 컨퍼런스
- [ ] ADA/EN 301 549 지원
- [ ] 국제 파트너십

---

## 핵심 성공 지표

| 지표             | 6개월 | 12개월 | 24개월 |
| ---------------- | ----- | ------ | ------ |
| **GitHub Stars** | 1K    | 5K     | 10K+   |
| **유료 고객**    | 5     | 50     | 200+   |
| **월 매출**      | $5K   | $30K   | $100K+ |
| **파트너사**     | 3     | 15     | 50+    |
| **인증자**       | 20    | 200    | 1000+  |

---

**작성일**: 2025-11-14
**버전**: 1.0
**담당**: HANUI 전략팀
**관련 문서**:

- [GLOBAL_POSITIONING.md](./GLOBAL_POSITIONING.md)
- [DESIGN_FLEXIBILITY.md](./DESIGN_FLEXIBILITY.md)
- [A11Y_IMPLEMENTATION.md](./A11Y_IMPLEMENTATION.md)
- [CORE_ARCHITECTURE.md](./CORE_ARCHITECTURE.md)
