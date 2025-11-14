# HANUI MVP, AI 통합 및 브랜딩 전략

> HANUI의 제품 방향 + 기술 전략 + 브랜딩 전략을 완성하는 핵심 축

---

## 목차

1. [Q1. HANUI Inspector (SaaS) MVP 구성](#q1-hanui-inspector-saas-mvp-구성)
2. [Q1-1. Inspector UI 구조 설계 (3페이지)](#q1-1-inspector-ui-구조-설계-3페이지)
3. [Q2. AI 기반 자동화 기능 12가지](#q2-ai-기반-자동화-기능-12가지)
4. [Q3. 글로벌 홍보 메시지 전략](#q3-글로벌-홍보-메시지-전략)
5. [Q4. 브랜드 신뢰도 확보 콘텐츠 전략](#q4-브랜드-신뢰도-확보-콘텐츠-전략)
6. [결론: HANUI의 방향성](#결론-hanui의-방향성)

---

## Q1. HANUI Inspector (SaaS) MVP 구성

### MVP 핵심 원칙

> **개발 5~7일 만에 "유료 가치가 있는 핵심 기능"만 구현**
>
> 절대 욕심내지 않고, **"문제 탐지 → 리포트 생성"** 두 단계에 집중

---

### 🟦 MVP 기능 구성 (최소 + 강력)

---

#### 1) URL 기반 자동 검사기

**구현 방식**:

- 브라우저 extension 또는 iframe 기반
- DOM 파싱 후 WCAG + KRDS rule 적용
- **크롤링 없음, 단일 페이지 검사**

**기술 스택 제안**:

```typescript
// Puppeteer 또는 Playwright 사용
const page = await browser.newPage();
await page.goto(url);
const accessibilityTree = await page.accessibility.snapshot();
```

**특징**:

- ✅ 빠른 개발 (5일 이내 가능)
- ✅ 서버 부담 최소화
- ✅ 결과 즉시 확인

---

#### 2) WCAG / KRDS 규칙 20~30개 선별 적용

**MVP에서 다 할 필요 없음. 중요도 기준으로만 검사**

**핵심 검사 항목 30개**:

| 카테고리       | 검사 항목                       | WCAG 기준 |
| -------------- | ------------------------------- | --------- |
| **이미지**     | alt 누락                        | 1.1.1     |
| **폼**         | label 누락                      | 1.3.1     |
| **폼**         | aria-required 누락              | 4.1.2     |
| **인터랙티브** | 버튼 role 오류                  | 4.1.2     |
| **구조**       | heading 구조 오류               | 1.3.1     |
| **색상**       | contrast 대비 부족              | 1.4.3     |
| **키보드**     | tabindex 오류                   | 2.1.1     |
| **키보드**     | focusable 요소 누락             | 2.4.7     |
| **구조**       | landmark 누락 (nav/main/footer) | 1.3.1     |
| **링크**       | 빈 링크 텍스트                  | 2.4.4     |
| **테이블**     | th 태그 누락                    | 1.3.1     |
| **언어**       | lang 속성 누락                  | 3.1.1     |
| **타이틀**     | 페이지 제목 누락                | 2.4.2     |
| **ARIA**       | aria-label 오류                 | 4.1.2     |
| **ARIA**       | aria-hidden 남용                | 4.1.2     |

> 💡 **이 30개만으로도 공공기관 WCAG 검사 항목의 60%를 커버합니다.**

---

#### 3) 자동 리포트 생성 (PDF or Web Report)

**리포트 구성**:

```
┌─────────────────────────────────────┐
│ HANUI Inspector Report              │
├─────────────────────────────────────┤
│ URL: https://example.com            │
│ Date: 2025-11-14                    │
│ Overall Score: 79/100               │
│                                     │
│ ✅ WCAG 2.2 AA: Pass                │
│ ⚠️  KRDS: 3 Warnings                │
│                                     │
├─────────────────────────────────────┤
│ Issues Found (12)                   │
├─────────────────────────────────────┤
│                                     │
│ 🔴 Critical (3)                     │
│ 1. Missing alt text (Logo image)   │
│    Location: header > img           │
│    Fix: Add alt="회사 로고"         │
│                                     │
│ 2. Low contrast (Submit button)    │
│    Current: 2.1:1 (Required: 4.5:1) │
│    Fix: Change color to #0066cc     │
│                                     │
│ 3. Missing label (Email input)     │
│    Location: form > input[type=email]│
│    Fix: Add <label for="email">    │
│                                     │
│ ⚠️  Warning (6)                     │
│ ℹ️  Info (3)                        │
│                                     │
├─────────────────────────────────────┤
│ [Download PDF] [Export JSON]        │
└─────────────────────────────────────┘
```

**리포트 포함 요소**:

- ✅ 문제 목록 (우선순위별)
- ✅ 위치 (CSS Selector)
- ✅ 해결 가이드 (코드 예시 포함)
- ✅ 점수화 (0~100점)

**효과**:

> 💼 **기업이 보고서로 바로 제출 가능해집니다.**

---

#### 4) 프로젝트 저장 + 히스토리 (버전 비교)

**핵심 기능**:

- 이전 검사 vs 최신 검사 비교
- 해결된 항목 자동 표시
- 점수 추이 그래프

**버전 비교 UI**:

```
┌──────────────────────────────────────┐
│ Version Comparison                   │
├──────────────────────────────────────┤
│ v1.0 (2025-11-01)  →  v1.1 (2025-11-14)│
│                                      │
│ Score: 67/100      →  79/100 (+12)  │
│                                      │
│ Fixed Issues (5):                    │
│ ✅ Logo alt text added               │
│ ✅ Form labels added                 │
│ ✅ Contrast improved                 │
│                                      │
│ New Issues (2):                      │
│ 🔴 Missing heading in footer         │
│                                      │
└──────────────────────────────────────┘
```

**시장 가치**:

> ⭐ **버전 비교가 들어가면 SI·공공기관 팀이 무조건 씁니다.**

---

#### 5) 가격 모델 (MVP)

| 플랜          | 가격        | 기능                    |
| ------------- | ----------- | ----------------------- |
| **Free**      | 무료        | 1회 검사                |
| **Basic**     | 9,900원/월  | 월 50회 검사 + 히스토리 |
| **Pro**       | 29,000원/월 | 무제한 검사 + CI/CD     |
| **연간 플랜** | 79,000원/년 | Basic 기능 (34% 할인)   |

**결제 전략**:

- 💳 토스페이먼츠 연동 (한국 시장)
- 💳 Stripe 연동 (글로벌 확장)

**효과**:

> 💰 **이 정도면 바로 결제가 나옵니다.**

---

### ⭐ MVP 핵심 요약

```
URL 입력 → 검사 실행 → 리포트 생성 → 점수화 → 저장

기술 난이도: 낮음
시장 반응: 즉시
개발 기간: 5~7일
```

**MVP 개발 우선순위**:

1. Week 1: URL 검사 + 30개 규칙 엔진
2. Week 2: 리포트 생성 (Web + PDF)
3. Week 3: 프로젝트 저장 + 히스토리
4. Week 4: 결제 연동 + 베타 런칭

---

## Q1-1. Inspector UI 구조 설계 (3페이지)

### 핵심 설계 원칙

> **"가장 빠르게 문제를 발견하고, 해결 가이드까지 연결되는 흐름"**
>
> 3페이지만으로 완벽한 UX 제공

---

### 📊 페이지 1: Dashboard — 전체 접근성 상태 한눈에 요약

#### 목적

**사용자가 다시 돌아오고 싶은 이유가 되는 페이지**

#### 필수 구성 요소

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  HANUI Inspector                    [Scan Now]  │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  📊 프로젝트별 A11y 점수                          │
│  ┌─────────────┬─────────────┬─────────────┐   │
│  │  Project A  │  Project B  │  Project C  │   │
│  │    85/100   │    72/100   │    91/100   │   │
│  │   ✅ 5 Pass │   ⚠️ 12 Warn│   ✅ 2 Pass │   │
│  │   ⚠️ 3 Warn │   🔴 3 Error│   ⚠️ 1 Warn │   │
│  │   🔴 2 Error│             │             │   │
│  └─────────────┴─────────────┴─────────────┘   │
│                                                 │
│  📈 최근 스캔 결과                               │
│  ┌───────────────────────────────────────────┐ │
│  │  Nov 14: 5 issues fixed (+12 score)      │ │
│  │  Nov 10: 3 new issues detected           │ │
│  │  Nov 08: First scan completed             │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  🔧 컴포넌트 레벨 이슈 개수                       │
│  ┌───────────────────────────────────────────┐ │
│  │  Dialog: 2 issues                         │ │
│  │  Form: 5 issues                           │ │
│  │  Navigation: 1 issue                      │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  📊 개선률 트래킹 그래프                         │
│  │                                ╱╲           │
│  │                            ╱╲ ╱  ╲          │
│  │                        ╱╲ ╱  ╲    ╲         │
│  │                    ╱╲ ╱  ╲    ╲            │
│  │  ────────────────╱──╲────╲──────╲──────   │
│  │  Oct    Nov 1  Nov 8   Nov 14              │
│  │  65     70      78      85                 │
│                                                 │
└─────────────────────────────────────────────────┘
```

#### 핵심 가치

- ✅ 들어오자마자 **"우리 프로젝트가 지금 어디가 문제인지"** 전체가 보임
- ✅ 이게 HANUI Inspector의 **첫 감동 포인트**
- ✅ 즉시 재스캔 가능 (빠른 재스캔 버튼)

---

### 🔍 페이지 2: Scan Results — 오류 탐지 & 컴포넌트별 상세 리포트

#### 목적

**Inspector의 핵심 화면 - 문제를 정확하게 진단**

#### 필수 구성 요소

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  Scan Results                        [Export]  │
│  https://example.com                            │
│  Scanned: 2025-11-14 15:30                     │
│  Score: 79/100                                  │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  📋 페이지 구조 트리 + 노드별 A11y 상태          │
│                                                 │
│  ▼ <html>                              ✅       │
│    ▼ <header>                          ⚠️       │
│      ▶ <nav>                           ✅       │
│      • <img> Logo                      🔴       │
│        └─ Missing alt text                     │
│    ▼ <main>                            ⚠️       │
│      ▼ <form>                          🔴       │
│        • <input type="email">          🔴       │
│          └─ Missing label                      │
│        • <button>                      ⚠️       │
│          └─ Low contrast (2.1:1)               │
│    ▶ <footer>                          ✅       │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  🔍 문제 요소 클릭 시 상세 패널                  │
│                                                 │
│  🔴 Missing alt text                            │
│  Element: <img src="/logo.png">                 │
│  Location: header > img                         │
│                                                 │
│  WCAG: 1.1.1 Non-text Content (Level A)        │
│  KRDS: 1.1.1 대체 텍스트 제공                   │
│                                                 │
│  Code Snippet:                                  │
│  ┌─────────────────────────────────────────┐   │
│  │ <header>                                │   │
│  │   <img src="/logo.png">  ← Issue here   │   │
│  │ </header>                               │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  💡 Auto Fix Suggestion (AI):                   │
│  ┌─────────────────────────────────────────┐   │
│  │ <img src="/logo.png" alt="회사 로고">   │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  [Copy Fixed Code]  [Apply with HANUI]         │
│                                                 │
└─────────────────────────────────────────────────┘
```

#### 핵심 가치

- ✅ WCAG / KRDS 기준 자동 매칭
- ✅ 코드 스니펫 자동 추출
- ✅ AI 기반 자동 수정 제안
- ✅ **"개발자가 바로 사용할 수 있는 해결 방법"** 제공
- ✅ 단순한 분석 도구가 아니라 **해결 도구**로 포지셔닝

---

### 🛠️ 페이지 3: Fix Assistant — 개선 가이드 + 코드 자동 리팩터링

#### 목적

**HANUI를 특별하게 만드는 구간 - 문제 해결 자동화**

#### 필수 구성 요소

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  Fix Assistant                    [Create PR]  │
│  12 issues ready to fix                         │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  🔧 HANUI 컴포넌트 기반 자동 리팩터링 제안       │
│                                                 │
│  Issue #1: Missing alt text                     │
│  Current Code:                                  │
│  ┌─────────────────────────────────────────┐   │
│  │ <img src="/logo.png">                   │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  Fixed Code:                                    │
│  ┌─────────────────────────────────────────┐   │
│  │ <img src="/logo.png" alt="회사 로고">   │   │
│  └─────────────────────────────────────────┘   │
│  [✓ Apply]  [Copy Code]                        │
│                                                 │
│  ─────────────────────────────────────────────  │
│                                                 │
│  Issue #2: Form missing labels                  │
│  Current Code:                                  │
│  ┌─────────────────────────────────────────┐   │
│  │ <input type="email" />                  │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  HANUI Component Solution:                      │
│  ┌─────────────────────────────────────────┐   │
│  │ import { Input } from '@hanui/react';   │   │
│  │                                         │   │
│  │ <Input                                  │   │
│  │   type="email"                          │   │
│  │   label="이메일"                         │   │
│  │   required                              │   │
│  │   aria-describedby="email-help"         │   │
│  │ />                                      │   │
│  └─────────────────────────────────────────┘   │
│  [✓ Apply]  [Copy Code]                        │
│                                                 │
│  ─────────────────────────────────────────────  │
│                                                 │
│  Issue #3: Button low contrast                  │
│  Current: #e0e0e0 on #f0f0f0 (1.2:1)          │
│  Required: 4.5:1 (WCAG AA)                     │
│                                                 │
│  AI Suggestion:                                 │
│  ┌─────────────────────────────────────────┐   │
│  │ background: #0066cc;  /* 4.6:1 ✅ */    │   │
│  │ color: #ffffff;                         │   │
│  └─────────────────────────────────────────┘   │
│  [✓ Apply]  [Copy Code]                        │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  🚀 Batch Actions                               │
│                                                 │
│  ☑ Apply all 12 fixes                          │
│  ☐ ARIA attributes (5 fixes)                   │
│  ☐ Contrast issues (3 fixes)                   │
│  ☐ Missing labels (4 fixes)                    │
│                                                 │
│  [Copy All Fixed Code]                          │
│  [Create GitHub PR Automatically]               │
│                                                 │
└─────────────────────────────────────────────────┘
```

#### 핵심 기능

1. **ARIA, role, keyboard nav 자동 추가**
2. **"수정된 코드 복사하기"** 버튼
3. **GitHub PR 자동 생성** (선택 기능)
4. **HANUI 컴포넌트 기반 리팩터링 제안**

#### 핵심 가치

- ✅ Radix·Storybook이 못하는 최종 단계
- ✅ **"오류 → 수정 → PR"까지 자동화**
- ✅ HANUI 브랜드 차별화의 **압도적 포인트**
- ✅ 개발자 경험(DX) 극대화

---

### 🎯 3페이지 화면 흐름 요약

```
1. Dashboard
   ↓
   "우리 프로젝트 상태가 한눈에"
   [Quick Scan] 클릭
   ↓

2. Scan Results
   ↓
   "어디에 문제가 있는지 정확히 진단"
   문제 클릭 → 상세 분석 + AI 수정 제안
   ↓

3. Fix Assistant
   ↓
   "수정 코드 자동 생성 + 복사/PR 생성"
   [Apply All] or [Create PR]
```

#### 핵심 차별화 포인트

| 경쟁사 도구      | HANUI Inspector      |
| ---------------- | -------------------- |
| 문제만 탐지      | 문제 + 해결 자동화   |
| 리포트 제공      | 리포트 + 코드 제공   |
| 수동 수정 필요   | AI 자동 수정 제안    |
| 단발성 검사      | 버전 비교 + 히스토리 |
| 개발자가 직접 PR | GitHub PR 자동 생성  |

---

### ⭐ UI 설계 핵심 요약

```
3페이지만으로 완벽한 접근성 검증 + 수정 자동화

Dashboard → Scan Results → Fix Assistant

이것이 HANUI Inspector의 핵심 경쟁력
```

**UX 설계 철학**:

> "클릭 3번 안에 문제 발견부터 해결까지"

---

## Q2. AI 기반 자동화 기능 12가지

### 핵심 컨셉

> **HANUI가 "한국 최초로 AI × UI 컴포넌트 엔진"이 되는 핵심**

---

### 🤖 AI 자동화 기능 12가지

---

#### 1) 코드 자동 보정 AI

**기능**:

- 컴포넌트에 접근성 누락된 코드 자동 탐지
- 자동 수정 제안

**예시**:

```tsx
// Before (접근성 문제)
<div onClick={handleClick}>클릭</div>

// AI 제안
⚠️ Interactive element without proper semantics
💡 Suggestion:
<button onClick={handleClick}>클릭</button>

// Or add ARIA:
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  클릭
</div>
```

---

#### 2) 자동 aria-label 생성

**기능**:

- 텍스트가 비어있는 버튼에 AI가 의미 추론
- 자동으로 aria-label 부여

**예시**:

```tsx
// Before
<button><XIcon /></button>

// AI 분석
- 아이콘: X (닫기 아이콘)
- 위치: 모달 우측 상단
- 맥락: Dialog 컴포넌트 내부

// AI 제안
<button aria-label="대화상자 닫기">
  <XIcon />
</button>
```

---

#### 3) 자동 대체텍스트 생성 (Image alt)

**기능**:

- 이미지 내용 분석 (GPT-4 Vision API 활용)
- 자동으로 적절한 alt 텍스트 생성

**예시**:

```tsx
// Before
<img src="/logo.png" />

// AI 분석 (이미지 내용 인식)
- 로고 이미지
- 텍스트: "행정안전부"
- 색상: 파란색

// AI 제안
<img src="/logo.png" alt="행정안전부 로고" />
```

---

#### 4) 디자인 토큰 자동 생성

**기능**:

- 색상, 여백, 타이포그래피 스캔
- Design Token 자동 생성

**예시**:

```css
/* AI가 스캔한 페이지 */
button { background: #0066cc; }
h1 { font-size: 32px; }
section { padding: 24px; }

/* 자동 생성된 Design Token */
{
  "colors": {
    "primary": "#0066cc"
  },
  "typography": {
    "h1": "32px"
  },
  "spacing": {
    "section": "24px"
  }
}
```

---

#### 5) 색 대비 자동 보정

**기능**:

- 대비가 낮으면 AI가 자동 제안
- WCAG AA 통과하는 색상 조합 제시

**예시**:

```
🔴 Contrast Issue Detected

Background: #f0f0f0
Text: #e0e0e0
Current Ratio: 1.2:1

Required: 4.5:1 (WCAG AA)

💡 AI Suggestions:
Option 1: Change text to #595959 (4.6:1) ✅
Option 2: Change background to #ffffff (3.1:1) ⚠️
Option 3: Change text to #000000 (15.8:1) ✅

[Apply Option 1] [Apply Option 3]
```

---

#### 6) 컴포넌트 코드 자동 리팩토링

**기능**:

- React/Vue 컴포넌트를 HANUI 규칙에 맞게 자동 변환

**예시**:

```tsx
// Before (일반 React 코드)
const MyButton = ({ children, onClick }) => (
  <div className="btn" onClick={onClick}>
    {children}
  </div>
);

// AI 리팩토링 제안
import { Button } from '@hanui/react';

const MyButton = ({ children, onClick }) => (
  <Button onClick={onClick}>{children}</Button>
);

// 변경 사항:
// ✅ Semantic HTML (button)
// ✅ Built-in accessibility
// ✅ Keyboard support
// ✅ ARIA attributes
```

---

#### 7) 스크린리더 읽기 흐름 최적화

**기능**:

- AI가 DOM 분석
- 읽기 순서 및 landmark 자동 정리

**예시**:

```html
<!-- Before (순서가 맞지 않음) -->
<div class="page">
  <div class="sidebar">...</div>
  <div class="header">...</div>
  <div class="content">...</div>
</div>

<!-- AI 제안 -->
<div class="page">
  <header role="banner">
    <!-- Header content -->
  </header>
  <nav role="navigation" aria-label="주 메뉴">
    <!-- Sidebar content -->
  </nav>
  <main role="main">
    <!-- Content -->
  </main>
</div>

<!-- 변경 사항:
✅ Landmark roles 추가
✅ 읽기 순서 재구성
✅ aria-label 추가
-->
```

---

#### 8) 공공기관 대응 자동 체크

**기능**:

- AI가 화면 스크린샷 분석
- KRDS 위반 요소 자동 감지

**예시**:

```
🔍 AI-Powered KRDS Analysis

Screenshot analyzed: homepage.png

Issues found:
🔴 Header lacks government standard logo position
🔴 Font size below 14px in footer
⚠️  Color scheme doesn't match KRDS palette
ℹ️  Missing "이용약관" in footer

💡 Suggestions:
1. Move logo to top-left corner
2. Increase footer font to 14px
3. Apply KRDS color palette
4. Add required footer links
```

---

#### 9) 문구 생성기 (공공기관 스타일)

**기능**:

- AI가 버튼, 타이틀, 표 텍스트 등을
- "공공 서비스 톤앤매너"로 자동 추천

**예시**:

```
Input: "Submit"

AI 제안 (공공기관 스타일):
1. "신청하기"
2. "제출하기"
3. "신청서 제출"

Context-aware:
- Form → "신청서 제출"
- Login → "로그인"
- Search → "검색하기"
```

---

#### 10) 다국어 변환 + 접근성 동시 보정

**기능**:

- 문구 번역 + aria-label 자동 생성

**예시**:

```tsx
// Before
<button>Submit</button>

// AI 처리 (한국어 + 접근성)
<button aria-label="신청서 제출">
  제출하기
</button>

// Supports multiple languages:
EN: Submit
KO: 제출하기
JA: 送信する
```

---

#### 11) Form 자동 오류 설명 생성

**기능**:

- 폼 유효성 실패 시 자동으로 명확한 설명 생성

**예시**:

```tsx
// Before
<Input type="tel" required />
// Error: "Invalid"

// AI 생성 메시지
{
  "ko": "전화번호 입력 형식은 010-1234-5678 형태입니다.",
  "en": "Phone number format: 010-1234-5678",
  "ariaLive": "polite",
  "example": "010-1234-5678"
}
```

---

#### 12) 컴포넌트 설명서 자동 생성

**기능**:

- 개발자가 컴포넌트 만들면
- AI가 문서화 자동 생성 + 예제 코드 생성

**예시**:

```tsx
// Component code
export const MyButton = ({ variant, onClick, children }) => {
  // ...
};

// AI-generated documentation
/**
 * MyButton Component
 *
 * 접근성을 갖춘 버튼 컴포넌트입니다.
 *
 * @param {string} variant - 버튼 스타일 (primary, secondary)
 * @param {function} onClick - 클릭 핸들러
 * @param {ReactNode} children - 버튼 내용
 *
 * @example
 * <MyButton variant="primary" onClick={handleClick}>
 *   클릭하세요
 * </MyButton>
 *
 * Accessibility:
 * - Keyboard: Enter, Space
 * - ARIA: role="button"
 * - Focus: Visible outline
 */
```

---

### ⭐ AI 기능 핵심 요약

```
HANUI = AI 기반 접근성 자동화 + 컴포넌트 엔진

한국 최초 + 시장 독점 가능
```

**AI 통합 로드맵**:

- **Phase 1**: 코드 보정 AI (3개월)
- **Phase 2**: 이미지/색상 분석 (6개월)
- **Phase 3**: 공공기관 특화 AI (9개월)
- **Phase 4**: 완전 자동화 (12개월)

---

## Q3. 글로벌 홍보 메시지 전략

### 핵심 컨셉

> **해외/국내 버전으로 각각 차별화된 메시지**

---

### 🌍 TechCrunch용 메시지 (영문)

#### Headline

```
"HANUI: The First Open-Source, AI-Powered UI Accessibility Engine
Built for Government-Grade Standards"
```

#### Subheadline

```
It merges WCAG, KRDS, and automated interaction logic to help teams
build compliant interfaces without manual work.
```

#### Pitch Deck 핵심 포인트

**Problem**:

- Accessibility is hard
- Developers struggle with WCAG compliance
- Government projects have strict requirements
- Manual testing is time-consuming

**Solution**:

- HANUI automates accessibility
- Built-in WCAG 2.2 + KRDS compliance
- AI-powered code suggestions
- Real-time validation

**Traction**:

- Open-source: 1K+ stars (projected)
- SaaS: 50+ paying customers (projected)
- Market: South Korea government + enterprise

**Why Now**:

- Accessibility lawsuits increasing (ADA in US)
- EU Accessibility Act 2025
- Asian markets need localized solutions

---

#### 핵심 키워드

| 키워드                   | 효과                 |
| ------------------------ | -------------------- |
| **First**                | 선점 효과            |
| **AI-powered**           | 기술 트렌드          |
| **Accessibility engine** | 제품 카테고리 명확화 |
| **WCAG + KRDS**          | 국제 + 로컬 표준     |
| **Government-grade**     | 신뢰성 강조          |

> 💡 **이 조합이 TechCrunch에서 먹힙니다.**

---

### 🇰🇷 NAVER D2용 메시지 (한글)

#### Headline

```
"HANUI: WCAG와 KRDS 기준을 자동으로 준수하는
한국 최초의 AI 기반 UI 접근성 엔진"
```

#### Subheadline

```
모든 컴포넌트가 포커스, 스크린리더, 키보드 네비게이션, ARIA 구조를 자동 처리하여
개발팀의 접근성 구현 부담을 획기적으로 줄입니다.
```

#### 발표 자료 핵심 구성

**문제 정의**:

- 공공기관 웹사이트 접근성 준수 의무화
- KRDS 요구사항 복잡성
- 개발자의 접근성 지식 부족
- 수동 검증의 비효율성

**해결 방안**:

- 접근성 자동화 엔진
- WCAG 2.2 + KRDS 동시 준수
- AI 기반 코드 제안
- 실시간 검증 시스템

**기술적 차별성**:

- Foundation Layer 아키텍처
- 20가지 자동화 기능
- Focus Trap / Restore 자동 처리
- Multi-Standard Checker

**비즈니스 모델**:

- 오픈소스 + SaaS 하이브리드
- 공공기관 특화
- 교육/인증 프로그램

---

#### 핵심 키워드

| 키워드               | 효과               |
| -------------------- | ------------------ |
| **한국 최초**        | 국내 시장 선점     |
| **KRDS + WCAG**      | 법적 요구사항 충족 |
| **자동화**           | 개발 효율성        |
| **개발팀 부담 감소** | 실용적 가치        |
| **AI 기반**          | 기술 혁신성        |

> 💡 **NAVER D2는 '기술적 차별성'을 좋아하므로 자동화·엔진·표준 준수가 핵심입니다.**

---

### 📊 메시지 비교표

| 요소       | TechCrunch                  | NAVER D2                |
| ---------- | --------------------------- | ----------------------- |
| **언어**   | 영문                        | 한글                    |
| **강조점** | 글로벌 트렌드               | 국내 시장 니즈          |
| **키워드** | First, AI, Government-grade | 한국 최초, KRDS, 자동화 |
| **타겟**   | 글로벌 VC, 개발자           | 국내 기업, 공공기관     |
| **메시지** | Innovation & Scale          | Practical Value         |

---

## Q4. 브랜드 신뢰도 확보 콘텐츠 전략

### 핵심 전략 원칙

> **"접근성×AI×자동화"라는 완전히 새로운 포지션을 위한 초기 신뢰도 확보**
>
> 최초 1년 안에 HANUI 브랜드를 시장에 확실하게 각인시키는 4가지 콘텐츠 전략

---

### 📝 전략 1: 실무자 중심 "A11y Deep Dive" 기술 블로그

#### 타겟

- 프론트엔드 개발자
- 공공기관 웹 담당자
- SI 회사 기술 리더

#### 콘텐츠 형태

**컴포넌트 단위 접근성 심층 분석**:

```markdown
시리즈 구성 예시:

1. "Button 접근성 완벽 가이드"
   - 잘못된 예: <div onClick={...}>클릭</div>
   - 문제점: role, tabIndex, 키보드 이벤트 누락
   - 올바른 예: <button> 사용 + ARIA 속성
   - HANUI Button으로 자동 해결되는 방법

2. "Modal 접근성의 6가지 함정"
   - Focus Trap이란?
   - ESC 키 처리
   - aria-modal, role="dialog"
   - 배경 스크롤 방지
   - 포커스 복원 (Focus Restore)
   - HANUI Dialog의 자동화 기능

3. "Select/Combobox의 ARIA 구조"
   - aria-expanded, aria-controls
   - 키보드 네비게이션 (↑↓)
   - 검색 기능 접근성
   - HANUI Select 컴포넌트 데모

4. "Form 접근성 체크리스트"
   - label 연결 방법
   - 에러 메시지 aria-live
   - required/aria-required
   - HANUI Form 컴포넌트 활용
```

#### 기술 블로그 특징

**실제 코드 비교 제공**:

```tsx
// ❌ 잘못된 예 (접근성 미준수)
<div className="button" onClick={handleClick}>
  제출하기
</div>

// ⚠️ 부분적으로 개선 (수동 구현 필요)
<button
  onClick={handleClick}
  aria-label="신청서 제출"
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  제출하기
</button>

// ✅ HANUI 컴포넌트 (자동 처리)
import { Button } from '@hanui/react';

<Button onClick={handleClick}>
  제출하기
</Button>
// 자동 포함:
// - role="button"
// - tabIndex={0}
// - Enter/Space 키 지원
// - ARIA 속성 자동 매핑
```

#### 발행 채널

- **HANUI 공식 블로그** (hanui.dev/blog)
- **Medium** - 영문 번역 버전
- **NAVER 블로그** - 한글 SEO 최적화
- **Dev.to** - 글로벌 개발자 커뮤니티

#### 기대 효과

- ✅ 전문성과 신뢰를 압도적으로 보여줌
- ✅ 블로그 하나만으로도 **TechCrunch와 D2가 주목**할 가능성이 높음
- ✅ SEO 최적화로 유기적 트래픽 확보
- ✅ 개발자 커뮤니티에서 자연스럽게 확산

---

### 🔬 전략 2: "HANUI Inspector" 베타 테스트 리포트 공개

#### 목적

**오픈소스가 아닌 SaaS의 존재감을 크게 끌어올리기**

#### 제공 자료 구성

**1. 50개 사이트 자동 스캔 결과 공개**

```markdown
# HANUI Inspector 베타 테스트 리포트

테스트 대상:

- 공공기관 사이트: 20개
- 대기업 사이트: 15개
- 스타트업 사이트: 15개

스캔 기간: 2025년 11월 1일 - 11월 30일
총 검사 항목: 30개 WCAG/KRDS 규칙
```

**2. 가장 많이 발생한 WCAG 오류 TOP 10**

| 순위 | 오류 유형                  | 발생률 | WCAG 기준 | 영향도   |
| ---- | -------------------------- | ------ | --------- | -------- |
| 1    | Missing alt text           | 87%    | 1.1.1     | Critical |
| 2    | Low contrast               | 76%    | 1.4.3     | High     |
| 3    | Missing form labels        | 68%    | 1.3.1     | Critical |
| 4    | Invalid ARIA attributes    | 54%    | 4.1.2     | High     |
| 5    | Missing page title         | 45%    | 2.4.2     | Medium   |
| 6    | Improper heading structure | 42%    | 1.3.1     | Medium   |
| 7    | Missing landmarks          | 38%    | 1.3.1     | Medium   |
| 8    | Empty links                | 33%    | 2.4.4     | High     |
| 9    | Missing lang attribute     | 29%    | 3.1.1     | Low      |
| 10   | Keyboard navigation issues | 24%    | 2.1.1     | Critical |

**3. 자동 수정 성공률 데이터**

```
자동 수정 가능 비율: 73%
수동 수정 필요: 27%

카테고리별 자동 수정률:
- 이미지 alt 속성: 95%
- 폼 레이블 연결: 89%
- ARIA 속성 보정: 78%
- 색상 대비 개선: 82%
- 키보드 네비게이션: 65%
```

**4. 산업별 평균 점수**

```
접근성 점수 (100점 만점)

공공기관: 평균 58점
- 최고: 82점 (행정안전부)
- 최저: 34점

대기업: 평균 64점
- 최고: 91점 (네이버)
- 최저: 42점

스타트업: 평균 47점
- 최고: 76점
- 최저: 23점
```

#### 리포트 활용 방안

**발표 채널**:

- NAVER D2 기고
- TechCrunch 영문 버전
- LinkedIn 전문가 네트워크
- HANUI 공식 웹사이트

**다운로드 제공**:

```
PDF 리포트 무료 다운로드
→ 이메일 수집 (잠재 고객 확보)
→ Inspector 베타 테스트 초대
```

#### 기대 효과

- ✅ HANUI가 **데이터 기반의 제품**이라는 신뢰도 확보
- ✅ 언론 매체의 자발적 보도 유도
- ✅ 공공기관/대기업 의사결정권자에게 어필
- ✅ Inspector SaaS 유료 전환율 증대

---

### 🎓 전략 3: 접근성 테크 세미나 + 실무 워크샵 운영

#### 세미나 기획

**테마**:

> "접근성 자동화 시대가 온다: HANUI의 기술적 접근"

**세미나 구성 (2시간)**:

```
1부: 접근성 자동화의 필요성 (30분)
├─ 국내외 접근성 법규 현황
├─ 공공기관 입찰의 접근성 요구사항
├─ 개발팀의 접근성 구현 어려움
└─ 자동화 솔루션의 시장 기회

2부: HANUI 기술 데모 (40분)
├─ 실시간 코드 수정 시연
│  ├─ 잘못된 Modal 코드 → HANUI Dialog로 변환
│  ├─ Form 접근성 자동 보정
│  └─ Inspector로 즉시 검증
├─ AI 기반 자동 수정 기능
└─ GitHub PR 자동 생성 시연

3부: Q&A + 네트워킹 (30분)
├─ 기술 질문 응답
├─ Inspector 베타 테스트 안내
└─ 무료 스캔 쿠폰 제공 (참가 기업 대상)

워크샵: 실습 세션 (20분)
├─ 참가자의 웹사이트 즉석 스캔
├─ 문제점 분석 + 해결 방안 제시
└─ HANUI 컴포넌트 적용 가이드
```

#### 참가 대상

**주요 타겟**:

- SI 회사 개발팀장 / CTO
- 대기업 웹 개발팀
- 공공기관 IT 담당자
- 웹 에이전시 대표
- 프론트엔드 개발자 커뮤니티

**모집 방법**:

- LinkedIn 광고
- 페이스북 개발자 그룹
- OKKY, 개발자스럽다 등 커뮤니티
- 공공기관 이메일 직접 발송

#### 참가 혜택

**무료 제공**:

```
1. Inspector 무료 스캔 쿠폰 (50회)
2. HANUI 기술 백서 PDF
3. 접근성 체크리스트 (Excel)
4. 1:1 기술 상담 (30분)
```

#### 개최 계획

**Phase 1 (1-3개월)**:

- 온라인 웨비나 (Zoom) - 월 1회
- 참가자 50명 목표

**Phase 2 (3-6개월)**:

- 오프라인 세미나 (강남/판교) - 분기 1회
- 참가자 100명 목표

**Phase 3 (6-12개월)**:

- 기업 맞춤 워크샵
- SI/대기업 대상 유료 교육

#### 기대 효과

- ✅ SI·대기업 담당자에게 강한 인지도 확보
- ✅ **나라장터 입찰에 강력한 포트폴리오**로 활용 가능
- ✅ Inspector 유료 전환의 핵심 채널
- ✅ 참가 기업의 레퍼런스 확보

---

### 🌐 전략 4: GitHub에 "HANUI A11y Ruleset" 공개

#### 전략 개요

**HANUI가 가진 규칙 기반 자동화 엔진의 일부를 오픈소스로 공개**

#### 공개 내용

**리포지토리 구성**:

```
hanui-a11y-ruleset/
├── README.md
├── rules/
│   ├── wcag-2.2/
│   │   ├── 1.1.1-non-text-content.json
│   │   ├── 1.3.1-info-and-relationships.json
│   │   ├── 1.4.3-contrast-minimum.json
│   │   ├── 2.1.1-keyboard.json
│   │   ├── 2.4.2-page-titled.json
│   │   └── ... (30개 규칙)
│   └── krds/
│       ├── 1.1.1-alternative-text.json
│       ├── 2.1.1-keyboard-operation.json
│       └── ... (20개 규칙)
├── validators/
│   ├── aria-validator.ts
│   ├── contrast-checker.ts
│   ├── keyboard-nav-checker.ts
│   └── semantic-validator.ts
├── examples/
│   ├── react-integration.tsx
│   ├── vue-integration.vue
│   └── vanilla-js-usage.js
└── docs/
    ├── api-reference.md
    ├── rule-customization.md
    └── contributing.md
```

**규칙 예시 (JSON 형식)**:

```json
{
  "id": "wcag-1.1.1",
  "name": "Non-text Content",
  "level": "A",
  "description": "All non-text content that is presented to the user has a text alternative",
  "validator": {
    "selector": "img, svg, canvas",
    "checks": [
      {
        "type": "attribute",
        "attribute": "alt",
        "required": true,
        "message": "Missing alt attribute on image"
      },
      {
        "type": "aria",
        "attribute": "aria-label",
        "fallback": true,
        "message": "Provide either alt or aria-label"
      }
    ]
  },
  "autofix": {
    "enabled": true,
    "suggestion": "Add alt=\"{{AI_GENERATED}}\" based on image content"
  }
}
```

#### 사용 예시

**React에서 사용**:

```tsx
import { validateA11y } from '@hanui/a11y-ruleset';

function MyComponent() {
  useEffect(() => {
    const results = validateA11y(document.body, {
      standards: ['wcag-2.2', 'krds'],
      level: 'AA',
    });

    console.log('Accessibility issues:', results.errors);
  }, []);

  return <div>...</div>;
}
```

**CLI 도구 제공**:

```bash
# NPM 패키지 설치
npm install -g @hanui/a11y-ruleset

# 웹사이트 스캔
hanui-a11y scan https://example.com

# 로컬 파일 검증
hanui-a11y check ./dist/index.html

# 커스텀 규칙 적용
hanui-a11y scan --config ./custom-rules.json
```

#### 라이선스 전략

**오픈소스 부분**:

- MIT License
- 기본 30개 규칙 무료 공개
- 커뮤니티 기여 환영

**프리미엄 부분** (Inspector SaaS):

- AI 기반 자동 수정
- 히스토리 비교
- PDF 리포트 생성
- CI/CD 통합

#### 기대 효과

**오픈소스 생태계 신뢰도 급상승**:

- ✅ GitHub Stars 빠른 증가
- ✅ 다른 개발자들이 **HANUI를 기준으로 접근성 학습**
- ✅ 개발자 커뮤니티에서 빠르게 확산
- ✅ 기업들의 자발적 도입 증가

**브랜드 포지셔닝**:

```
HANUI = 접근성 자동화의 표준

"접근성 검증이 필요해? HANUI Ruleset 써봐"
→ 자연스럽게 Inspector SaaS로 연결
```

**커뮤니티 성장**:

- 외부 개발자의 규칙 기여
- 다국어 접근성 표준 확장 (ADA, EN 301 549 등)
- 플러그인 생태계 형성 (Webpack, Vite, ESLint)

---

### 🎯 4대 콘텐츠 전략 통합 효과

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  전략 1: A11y Deep Dive 블로그                   │
│  → 기술 전문성 입증                             │
│  → 개발자 커뮤니티 신뢰 확보                     │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  전략 2: Inspector 베타 리포트                   │
│  → 데이터 기반 제품 신뢰성                       │
│  → 언론 매체 자발적 보도                         │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  전략 3: 테크 세미나 + 워크샵                    │
│  → 의사결정권자 직접 접촉                        │
│  → 유료 고객 전환 채널                          │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  전략 4: A11y Ruleset 오픈소스                   │
│  → 개발자 커뮤니티 확산                         │
│  → 표준 플랫폼 포지셔닝                         │
│                                                 │
└─────────────────────────────────────────────────┘

통합 시너지:
블로그 → 세미나 참가 → Ruleset 사용 → Inspector 구매
```

---

### 📊 1년 로드맵

| 월          | 블로그          | 리포트           | 세미나              | Ruleset            |
| ----------- | --------------- | ---------------- | ------------------- | ------------------ |
| **1-3월**   | 월 2편 발행     | 베타 테스트 진행 | 온라인 웨비나 1회   | GitHub 공개        |
| **4-6월**   | 월 4편 발행     | 리포트 공개      | 오프라인 세미나 1회 | 커뮤니티 기여 유도 |
| **7-9월**   | 영문 번역 시작  | 2차 리포트       | 기업 맞춤 워크샵    | CLI 도구 출시      |
| **10-12월** | TechCrunch 기고 | 연간 리포트      | 유료 교육 시작      | ESLint 플러그인    |

---

### ⭐ 콘텐츠 전략 핵심 요약

```
4대 콘텐츠 전략 = 브랜드 신뢰도 확보의 핵심

기술 블로그: 전문성 입증
베타 리포트: 데이터 기반 신뢰
테크 세미나: 직접 접촉 & 전환
오픈소스: 커뮤니티 확산

1년 안에 HANUI를 "접근성 자동화 = HANUI"로 각인
```

**최종 목표**:

> "접근성 자동화가 필요하면 HANUI"라는 인식을 시장에 확고하게 만들기

---

## 결론: HANUI의 방향성

### 🔥 완벽한 정렬

**당신의 강점**:

- ✅ 디자인 시스템 경험
- ✅ 프론트엔드 기술력
- ✅ SI/공공기관 경험

**한국 시장이 원하는 것**:

- ✅ KRDS 준수 자동화
- ✅ 공공기관 입찰 대응
- ✅ 개발 효율성 향상

**국제 표준의 흐름**:

- ✅ WCAG 2.2 강화
- ✅ EU Accessibility Act
- ✅ ADA 소송 증가

---

### ⭐ 핵심 전략 요약

```
HANUI = Radix의 접근성 + AI 자동화 + KRDS 특화

아직 한국에 없는 서비스
공공기관까지 커버하는 유일한 솔루션
```

---

### 🎯 HANUI가 될 수 있는 것

**지금 같은 방향으로 가면**:

1. **공공기관** - 입찰 필수 도구
2. **대기업** - 법적 리스크 최소화
3. **SI 회사** - 개발 생산성 향상
4. **스타트업** - 글로벌 진출 준비

> 💡 **한국 UI 생태계의 표준 플랫폼이 될 수 있습니다.**

---

### 📋 다음 단계

**즉시 실행 가능한 것**:

1. ✅ Inspector MVP 개발 시작 (Week 1)
2. ✅ 베타 테스터 모집 (공공기관 3곳)
3. ✅ GitHub 리포지토리 공개
4. ✅ NAVER D2 / Deview 발표 신청

**3개월 내 목표**:

1. ✅ Inspector SaaS 런칭
2. ✅ 핵심 10개 컴포넌트 완성
3. ✅ 첫 유료 고객 확보
4. ✅ GitHub Stars 1K

**6개월 내 목표**:

1. ✅ AI 기능 3개 통합
2. ✅ 파트너 프로그램 런칭
3. ✅ 교육 과정 개설
4. ✅ TechCrunch 기고

---

### 💬 마지막 메시지

```
HANUI는 단순한 UI 라이브러리가 아니라,
한국 웹 접근성 생태계를 바꾸는 플랫폼입니다.

지금 이 방향이 맞습니다.
실행하세요.
```

---

**작성일**: 2025-11-14
**버전**: 1.0
**담당**: HANUI 전략팀
**관련 문서**:

- [GLOBAL_POSITIONING.md](./GLOBAL_POSITIONING.md)
- [DESIGN_FLEXIBILITY.md](./DESIGN_FLEXIBILITY.md)
- [A11Y_IMPLEMENTATION.md](./A11Y_IMPLEMENTATION.md)
- [CORE_ARCHITECTURE.md](./CORE_ARCHITECTURE.md)
- [ENGINE_FEATURES_AND_BUSINESS.md](./ENGINE_FEATURES_AND_BUSINESS.md)
