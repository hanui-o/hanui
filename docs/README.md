# KRDS Platform - 기획 문서

> **"공공 프로젝트 개발의 모든 것"**
> KRDS(대한민국 정부 표준 디자인 시스템) 생태계 플랫폼 기획

---

## 📚 문서 목차

### 1. 기획 문서 ([planning/](./planning))

#### [PRD.md](./planning/PRD.md) - 제품 요구사항 정의서
```
프로젝트의 모든 것이 담긴 핵심 문서

포함 내용:
├─ 프로젝트 개요 (비전, 미션)
├─ 문제 정의 (현재 상황, 페인 포인트)
├─ 솔루션 (핵심 가치 제안)
├─ 타깃 고객 (Persona, 시장 규모)
├─ 경쟁 분석 (직접/간접 경쟁자)
├─ 차별화 전략 (4가지 핵심)
├─ 핵심 기능 (Phase 1~4)
├─ 비즈니스 모델 (Freemium + Marketplace)
├─ 성공 지표 (KPI)
└─ Go-to-Market 전략

👉 가장 먼저 읽어야 할 문서
```

#### [DIFFERENTIATION.md](./planning/DIFFERENTIATION.md) - 차별화 전략
```
"이미 있는데 왜 또 만들어?"에 대한 답

4가지 차별화 전략:
① 실무형 Starter Kit
   └─ npx create-krds-app (30초 프로젝트 생성)

② KRDS + 접근성 자동 검수 도구
   └─ VSCode Extension (실시간 검사 + 자동 수정)

③ KRDS Marketplace
   └─ 템플릿 판매 + 수익 분배 + 생태계

④ KRDS x AI Generator
   └─ 프롬프트 → 코드 (GPT-4)

👉 경쟁자와의 차이점이 궁금하다면
```

#### [ROADMAP.md](./planning/ROADMAP.md) - 개발 로드맵
```
4단계 12개월 계획 (주차별 상세)

Phase 1 (1-2개월): Starter Kit
├─ Week 1: Monorepo 설정 + 컴포넌트 5개
├─ Week 2: create-krds-app CLI + 템플릿 3개
├─ Week 3: 문서 사이트 (Next.js)
└─ Week 4: NPM 배포 + 커뮤니티 런칭

Phase 2 (3-4개월): 접근성 도구
├─ Month 3: VSCode Extension
└─ Month 4: CI/CD 통합

Phase 3 (5-8개월): Marketplace
└─ 플랫폼 개발 + 커뮤니티 활성화

Phase 4 (9-12개월): AI Generator
└─ GPT-4 연동 + 베타 런칭

👉 "언제 뭘 만들지" 구체적 계획
```

---

### 2. 기술 문서 ([technical/](./technical))

#### [ARCHITECTURE.md](./technical/ARCHITECTURE.md) - 시스템 아키텍처
```
기술 설계의 모든 것

포함 내용:
├─ 시스템 개요 (아키텍처 원칙)
├─ 전체 구조도 (System Diagram)
├─ Monorepo 구조 (Turborepo)
├─ Phase별 기술 스택
│  ├─ Phase 1: Vite, Tailwind, Headless UI
│  ├─ Phase 2: VS Code Extension API
│  ├─ Phase 3: Next.js, Prisma, Stripe
│  └─ Phase 4: OpenAI API, Langchain
├─ 핵심 컴포넌트 설계 (Button, Input...)
├─ 테마 시스템 (다크모드, 테마 Provider)
├─ 접근성 유틸리티
└─ 인프라 및 배포 (Vercel, GitHub Actions)

👉 개발자라면 필수로 읽어야 할 문서
```

---

### 3. 경쟁 분석 ([competition/](./competition))

#### [ANALYSIS.md](./competition/ANALYSIS.md) - 경쟁사 분석
```
"이미 있는데..." 걱정 해소

직접 경쟁자:
├─ KRDS-community/krds-react (Star ~50)
├─ @krds.ui/vue (Vue 3)
└─ @gracefullight/krds (MUI 기반)

간접 경쟁자:
├─ PrimeVue/PrimeReact
├─ Chakra UI
└─ shadcn/ui

SWOT 분석:
├─ Strengths (KRDS 전문화, 통합 솔루션)
├─ Weaknesses (후발주자, 리소스 부족)
├─ Opportunities (공공 SI 성장, AI 혁명)
└─ Threats (경쟁자 모방, 공식 라이브러리)

승리 전략:
├─ 단기: 품질로 압도
├─ 중기: 생태계 구축
└─ 장기: 표준화/공식화

👉 "왜 우리가 이길 수 있는지" 논리
```

---

## 🎯 문서 읽기 가이드

### 역할별 추천 순서

#### 👨‍💼 기획자 / PM
```
1. PRD.md (전체 이해)
   → 프로젝트 비전, 타깃 고객, 비즈니스 모델

2. DIFFERENTIATION.md
   → 경쟁 우위, 차별화 전략

3. ROADMAP.md
   → 개발 일정, 마일스톤

4. ANALYSIS.md
   → 시장 분석, SWOT
```

#### 👨‍💻 개발자
```
1. ARCHITECTURE.md (기술 설계)
   → 시스템 구조, 기술 스택

2. ROADMAP.md
   → Phase별 개발 계획

3. PRD.md
   → 기능 명세, 요구사항

4. DIFFERENTIATION.md
   → 차별화 기능 (접근성 도구, AI 등)
```

#### 💼 투자자 / 파트너
```
1. PRD.md - "비즈니스 모델" 섹션
   → 수익 구조, 시장 규모

2. ANALYSIS.md - "SWOT 분석" 섹션
   → 경쟁 우위, 리스크

3. ROADMAP.md - "KPI 트래킹" 섹션
   → 성과 지표, 목표

4. DIFFERENTIATION.md
   → 독창성, 혁신성
```

---

## 📊 프로젝트 개요 (요약)

### 한 줄 요약
```
npx create-krds-app으로 시작하는 공공 웹사이트 개발 플랫폼
= 컴포넌트 라이브러리 + Starter Kit + 접근성 도구 + Marketplace + AI
```

### 핵심 가치 제안
```
Before (현재):
- KRDS 컴포넌트 직접 구현 (2주)
- 접근성 검수 수동 (2~4주, 500만원)
- 템플릿 없음 (매번 새로 만듦)

After (KRDS Platform):
- npx create-krds-app (30초)
- 접근성 자동 검사 + 수정 (1일)
- 템플릿 Marketplace (복붙)

→ 개발 시간 1/10, 비용 1/10
```

### 타깃 고객
```
Primary:
- 공공 SI 프론트엔드 개발자 (5,000명+)
- SI 업체 (500개사)
- 프리랜서 개발자 (1,000명)

Secondary:
- 공공기관 웹 담당자
- 디자이너, QA 담당자
```

### 비즈니스 모델
```
Free (오픈소스):
- create-krds-app
- @krds/react 라이브러리
- 기본 템플릿 3개

Pro (₩9,900/월):
- 프리미엄 템플릿 20+
- AI Generator (월 100회)
- VSCode Extension (Pro 기능)

Enterprise (₩500,000/년):
- 팀 계정
- 커스텀 테마
- 온사이트 교육

Marketplace (수수료 30%):
- 템플릿 판매
- 개발자 수익 분배
```

### 1년 목표
```
기술 지표:
- NPM 다운로드: 10,000/주
- GitHub Stars: 3,000
- VSCode Extension: 5,000 설치

사용자 지표:
- 실사용 프로젝트: 200개
- 공공기관 사례: 10개
- Discord 커뮤니티: 1,000명

수익 지표:
- MRR: ₩5,000,000
- Pro 구독자: 100명
- Marketplace 거래액: ₩10,000,000/월
```

---

## 🚀 다음 단계

### 지금 바로 시작하기

#### Step 1: 문서 정독
```bash
# 순서대로 읽기
1. docs-kit/planning/PRD.md
2. docs-kit/planning/DIFFERENTIATION.md
3. docs-kit/technical/ARCHITECTURE.md
4. docs-kit/planning/ROADMAP.md
```

#### Step 2: 프로젝트 세팅
```bash
# ROADMAP.md의 Week 1 Day 1-2 실행
- Turborepo 설정
- 폴더 구조 생성
- 첫 컴포넌트 (Button) 개발
```

#### Step 3: 검증
```bash
# 타깃 고객 인터뷰 (10명)
- "이런 거 있으면 쓸 것 같아?"
- "월 ₩9,900 낼 의향 있어?"
- 피드백 수집 및 기획 수정
```

#### Step 4: MVP 개발 시작
```bash
# ROADMAP.md의 Phase 1 실행
- 2개월 안에 배포
- 커뮤니티 런칭
- 첫 사용자 확보
```

---

## 📝 문서 업데이트 정책

### 버전 관리
```
v0.1 (2025-01-08): 초기 기획 완료
v0.2 (예정): MVP 개발 후 실사용 피드백 반영
v0.3 (예정): Phase 2 완료 후 접근성 도구 검증
v1.0 (예정): 정식 출시 시 확정
```

### 업데이트 기준
```
Major Update (v0.x → v1.x):
- Phase 완료 시
- 전략 대폭 수정 시

Minor Update (v1.x → v1.y):
- 새로운 기능 추가 시
- 중요한 피드백 반영 시

Patch Update (v1.1.x → v1.1.y):
- 오타 수정
- 문서 보완
```

---

## 🤝 기여 방법

### 문서 개선 제안
```
1. GitHub Issue 생성
   - 제목: [DOC] 문서명 - 제안 내용
   - 예: [DOC] PRD - 시장 규모 데이터 업데이트

2. Pull Request
   - 직접 수정 후 PR

3. Discord 토론
   - 문서 채널에서 의견 공유
```

### 피드백 환영
```
다음 사항에 대한 피드백 특히 환영:
✓ 시장 규모 추정이 맞는지
✓ 경쟁 분석이 정확한지
✓ 기술 스택 선택이 적절한지
✓ 일정이 현실적인지
✓ 차별화 전략이 유효한지
```

---

## 📞 연락처

- **프로젝트 리드**: odada-o
- **GitHub**: (추가 예정)
- **Email**: (추가 예정)
- **Discord**: (추가 예정)

---

## 📄 라이선스

기획 문서는 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 라이선스를 따릅니다.
자유롭게 참고하고 활용하되, 출처를 밝혀주세요.

---

**Last Updated**: 2025-01-08
**Status**: ✅ 기획 완료 → ⏳ 고객 검증 필요 → 🚀 개발 시작 대기

**Next Milestone**: 타깃 고객 10명 인터뷰 + Phase 1 Week 1 시작
