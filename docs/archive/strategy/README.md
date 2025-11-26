# HANUI 전략 문서 개요

> HANUI 프로젝트의 전체 전략을 체계적으로 정리한 문서 모음

---

## 📋 목차

1. [문서 구조](#문서-구조)
2. [HANUI 오픈소스 전략](#hanui-오픈소스-전략)
3. [HANUI Inspector (SaaS) 전략](#hanui-inspector-saas-전략)
4. [읽는 순서](#읽는-순서)

---

## 폴더 구조

```
docs/strategy/
├── README.md                    (이 파일)
├── overview/                    # 전체 비전 & 포지셔닝
│   └── GLOBAL_POSITIONING.md
├── opensource/                  # HANUI 오픈소스 전략
│   ├── DESIGN_FLEXIBILITY.md
│   ├── A11Y_IMPLEMENTATION.md
│   └── CORE_ARCHITECTURE.md
└── saas/                        # HANUI Inspector SaaS 전략
    ├── ENGINE_FEATURES_AND_BUSINESS.md
    └── MVP_AI_AND_BRANDING.md
```

---

## 문서 구조

HANUI 프로젝트는 **2개의 독립적인 제품**으로 구성됩니다:

```
HANUI 생태계
├── 1. HANUI (오픈소스)
│   └── UI 컴포넌트 라이브러리
│       - Foundation Layer (A11y Engine)
│       - Component Layer (10+ components)
│       - Styling Layer (Theme System)
│
└── 2. HANUI Inspector (SaaS)
    └── 접근성 검증 도구
        - URL 기반 자동 검사
        - WCAG/KRDS 검증
        - 리포트 생성
```

---

## HANUI 오픈소스 전략

### 제품 정의

**"접근성 자동화 UI 컴포넌트 라이브러리"**

### 핵심 가치

- WCAG 2.2 + KRDS 자동 준수
- Radix 수준의 접근성 자동화
- 100% 디자인 자유도

### 관련 문서

| 문서                                                                      | 주제                 | 핵심 내용                                |
| ------------------------------------------------------------------------- | -------------------- | ---------------------------------------- |
| [GLOBAL_POSITIONING.md](./overview/GLOBAL_POSITIONING.md)                 | 글로벌 시장 포지셔닝 | 미국(Radix), 중국(AntD) 대비 차별화      |
| [DESIGN_FLEXIBILITY.md](./opensource/DESIGN_FLEXIBILITY.md)               | 디자인 자유도 전략   | Base Layer + Theme Layer 구조            |
| [A11Y_IMPLEMENTATION.md](./opensource/A11Y_IMPLEMENTATION.md)             | 접근성 구현 전략     | 우선순위, KRDS/WCAG 통합, 브랜드 메시지  |
| [CORE_ARCHITECTURE.md](./opensource/CORE_ARCHITECTURE.md)                 | 핵심 아키텍처        | 10개 컴포넌트, 3단계 레이어, 경쟁사 비교 |
| [ENGINE_FEATURES_AND_BUSINESS.md](./saas/ENGINE_FEATURES_AND_BUSINESS.md) | 엔진 기능 & 비즈니스 | 20가지 자동화 기능, 수익 모델            |

### 비즈니스 모델

```
오픈소스 (무료)
├── Foundation Layer
├── 10개 기본 컴포넌트
└── 커뮤니티 지원

Enterprise (유료)
├── Figma Kit ($299)
├── Design Token Builder ($99/월)
└── 멀티 프레임워크 지원 (+$49/월)

Partner/SI (프로젝트)
├── 커스텀 컴포넌트 개발
├── 접근성 컨설팅
└── 교육 & 인증
```

### 타겟 시장

- 🏢 **중견/대기업**: 디자인 시스템 구축
- 🚀 **스타트업**: 빠른 MVP 개발
- 🏛️ **공공기관**: KRDS 자동 준수
- 👨‍💻 **개발자**: 접근성 학습 & 적용

---

## HANUI Inspector (SaaS) 전략

### 제품 정의

**"WCAG/KRDS 자동 검증 SaaS"**

### 핵심 가치

- 5분 만에 접근성 검사
- KRDS + WCAG 동시 검증
- 버전 비교 & 히스토리
- PDF 리포트 자동 생성

### 관련 문서

| 문서                                                                      | 주제                 | 핵심 내용                              |
| ------------------------------------------------------------------------- | -------------------- | -------------------------------------- |
| [MVP_AI_AND_BRANDING.md](./saas/MVP_AI_AND_BRANDING.md)                   | MVP & AI & 브랜딩    | Inspector MVP 구성, AI 기능, 홍보 전략 |
| [ENGINE_FEATURES_AND_BUSINESS.md](./saas/ENGINE_FEATURES_AND_BUSINESS.md) | 엔진 기능 & 비즈니스 | 20가지 검사 규칙, SaaS 가격 모델       |

### 비즈니스 모델

```
Free
└── 1회 검사

Basic ($9,900/월 또는 $79,000/년)
├── 월 50회 검사
├── 히스토리 저장
└── PDF 리포트

Pro ($29,000/월)
├── 무제한 검사
├── CI/CD 통합
├── 팀 협업
└── 우선 지원

Enterprise (맞춤 견적)
├── 다중 프로젝트
├── 전담 지원
├── 커스텀 규칙
└── On-premise 옵션
```

### 타겟 시장

- 🏛️ **공공기관**: 입찰 전 접근성 검증
- 🏢 **SI 회사**: 납품 전 품질 검사
- 💼 **웹 에이전시**: 클라이언트 리포팅
- 🚀 **스타트업**: 글로벌 진출 준비

---

## 제품 간 시너지

```
┌─────────────────────────────────────┐
│                                     │
│   HANUI (오픈소스)                  │
│   "접근성 자동화 컴포넌트"           │
│                                     │
│   ✓ 개발자 커뮤니티 확보             │
│   ✓ 브랜드 인지도 상승               │
│   ✓ 기술력 증명                     │
│                                     │
└──────────┬──────────────────────────┘
           │
           │ 상호 보완
           │
┌──────────▼──────────────────────────┐
│                                     │
│   HANUI Inspector (SaaS)            │
│   "접근성 검증 도구"                 │
│                                     │
│   ✓ 즉각적인 수익 창출               │
│   ✓ 유료 고객 확보                  │
│   ✓ 시장 검증                       │
│                                     │
└─────────────────────────────────────┘
```

### 시너지 효과

1. **마케팅 시너지**
   - 오픈소스 → Inspector 유료 전환
   - Inspector → 오픈소스 인지도 상승

2. **기술 시너지**
   - 오픈소스 컴포넌트의 A11y 엔진 → Inspector 검증 규칙
   - Inspector 피드백 → 오픈소스 개선

3. **비즈니스 시너지**
   - 오픈소스 사용자 → Inspector 유료 고객
   - Inspector 고객 → 오픈소스 Enterprise 업그레이드

---

## 읽는 순서

### 1️⃣ 전체 비전 이해하기

**먼저 읽을 문서**:

1. [overview/GLOBAL_POSITIONING.md](./overview/GLOBAL_POSITIONING.md)
   - HANUI의 글로벌 포지셔닝
   - 경쟁사 대비 차별화
   - 시장 기회

**핵심 메시지**:

> "Radix의 접근성 + KRDS의 표준화 = HANUI"

---

### 2️⃣ 오픈소스 전략 깊이 이해하기

**순서대로 읽을 문서**:

1. [opensource/DESIGN_FLEXIBILITY.md](./opensource/DESIGN_FLEXIBILITY.md)
   - 디자인 자유도 vs 실무 생산성
   - Base + Theme Layer 구조

2. [opensource/A11Y_IMPLEMENTATION.md](./opensource/A11Y_IMPLEMENTATION.md)
   - 접근성 구현 우선순위
   - KRDS + WCAG 통합 전략
   - 브랜드 메시지 (3축)

3. [opensource/CORE_ARCHITECTURE.md](./opensource/CORE_ARCHITECTURE.md)
   - MVP 10개 컴포넌트
   - 3단계 레이어 아키텍처
   - 경쟁사 비교 (Radix, MUI, Semi)

**핵심 메시지**:

> "기능은 견고하게, 디자인은 완전히 자유롭게"

---

### 3️⃣ SaaS (Inspector) 전략 이해하기

**읽을 문서**:

1. [saas/MVP_AI_AND_BRANDING.md](./saas/MVP_AI_AND_BRANDING.md)
   - Inspector MVP (5-7일 개발)
   - AI 자동화 기능 12가지
   - 글로벌 홍보 메시지

**핵심 메시지**:

> "URL → 검사 → 리포트 → 저장"

---

### 4️⃣ 비즈니스 모델 & 수익화 이해하기

**읽을 문서**:

1. [saas/ENGINE_FEATURES_AND_BUSINESS.md](./saas/ENGINE_FEATURES_AND_BUSINESS.md)
   - 20가지 자동화 엔진 기능
   - 4가지 수익 모델
   - 수익 시뮬레이션

**핵심 메시지**:

> "오픈소스 + SaaS + Enterprise + Partner"

---

## 실행 로드맵 요약

### Phase 1: Foundation (0-3개월)

```
오픈소스
├── Foundation Layer 개발
├── Dialog, Dropdown 컴포넌트
└── GitHub 공개 (Stars 1K 목표)

Inspector
├── MVP 개발 (5-7일)
├── 베타 테스터 모집 (3곳)
└── 가격 모델 검증
```

### Phase 2: Growth (3-6개월)

```
오픈소스
├── 10개 컴포넌트 완성
├── 문서화 (한글 + 영문)
└── 커뮤니티 활성화

Inspector
├── 정식 런칭
├── 첫 유료 고객 10명
└── CI/CD 통합
```

### Phase 3: Scale (6-12개월)

```
오픈소스
├── AI 기능 통합 (3개)
├── Figma Kit 출시
└── 파트너 프로그램

Inspector
├── 유료 고객 50명
├── 월 매출 $10K
└── 기업 플랜 런칭
```

### Phase 4: Global (12-24개월)

```
오픈소스
├── 다국어 지원
├── 글로벌 컨퍼런스
└── Stars 10K+

Inspector
├── 글로벌 진출 (Stripe)
├── 월 매출 $50K
└── ADA/EN 301 549 지원
```

---

## 핵심 성공 지표

| 지표               | 6개월 | 12개월 | 24개월 |
| ------------------ | ----- | ------ | ------ |
| **오픈소스**       |
| GitHub Stars       | 1K    | 5K     | 10K+   |
| NPM 다운로드/월    | 10K   | 50K    | 100K+  |
| 컴포넌트 수        | 10    | 20     | 30+    |
| **Inspector SaaS** |
| 유료 고객          | 10    | 50     | 200+   |
| 월 매출            | $5K   | $30K   | $100K+ |
| 검사 횟수/월       | 1K    | 10K    | 50K+   |
| **전체**           |
| 팀 규모            | 2명   | 5명    | 10명+  |
| 파트너사           | 3     | 15     | 50+    |

---

## 최종 메시지

### HANUI 오픈소스

```
"접근성은 기본이 아니라 자동화되어야 한다"

WCAG + KRDS 자동 준수
Radix 수준의 접근성
100% 디자인 자유도
```

### HANUI Inspector

```
"5분 만에 KRDS + WCAG 검증 완료"

자동 검사 + 리포트 생성
버전 비교 + 히스토리
공공기관 입찰 필수 도구
```

### 함께 만드는 가치

```
한국 UI 생태계의 표준 플랫폼

공공기관 + 대기업 + 스타트업
모두가 사용하는 접근성 엔진
```

---

**작성일**: 2025-11-14
**버전**: 2.0
**담당**: HANUI 전략팀
