# HANUI - GitHub Issue 전체 정리

> **프로젝트 시작 전 전략적 결정사항 및 이슈 로드맵**
> 작성일: 2025-01-08

---

## 🎯 핵심 전략적 결정사항 (먼저 결정 필요)

### Decision 1: 개발 우선순위

#### 옵션 A: Starter Kit 우선 🚀
```
장점:
✅ 빠른 검증 가능 (2주 내 MVP)
✅ 실사용 피드백 즉시 수집
✅ 개발자 커뮤니티 조기 확보
✅ npx create-hanui-app 임팩트 큼

단점:
❌ 컴포넌트 문서가 없어서 사용자 혼란
❌ 완성도 낮아 보일 수 있음
❌ 커뮤니티 질문 대응 부담

타임라인:
Week 1-2: 기본 컴포넌트 5개
Week 3: CLI 도구
Week 4: NPM 배포
→ 1개월 내 실사용 가능
```

#### 옵션 B: 컴포넌트 문서 사이트 우선 📚
```
장점:
✅ 완성도 높은 첫인상
✅ PrimeVue처럼 전문적인 이미지
✅ 컴포넌트 API 명확히 정의
✅ 사용자 셀프 서비스 가능

단점:
❌ 실제 사용까지 시간 소요 (1.5개월)
❌ 피드백 수집 늦어짐
❌ 문서만 보고 떠날 수 있음

타임라인:
Week 1-3: 컴포넌트 + Docs 사이트
Week 4-5: 완성도 높이기
Week 6: 런칭
→ 1.5개월 후 런칭
```

#### 옵션 C: 병행 (절충안) ⚖️
```
Week 1-2: 핵심 컴포넌트 5개 + 기본 문서
Week 3: CLI 도구 + 간단한 Docs 사이트
Week 4: NPM 배포 + 문서 보완
Week 5-6: 피드백 받으며 문서 확장

장점:
✅ 빠른 검증 + 적절한 완성도
✅ 점진적 개선 가능

단점:
❌ 리소스 분산
❌ 둘 다 중간 완성도
```

**추천: 옵션 A (Starter Kit 우선)** ⭐
```
이유:
1. Lean Startup 원칙 (빠른 검증)
2. 문서는 피드백 받으며 작성하는 게 효율적
3. 실사용 사례가 있어야 문서도 현실적
4. 초기 adopter는 문서 없어도 씀

단, 조건:
- README에 기본 사용법 명시
- 각 컴포넌트에 간단한 JSDoc 주석
- GitHub Discussions 활성화 (질문 대응)
```

---

### Decision 2: 프레임워크 우선순위

#### 현황 분석:
```
한국 공공 SI 시장 프레임워크 점유율 (추정):

React: 60%
├─ 대기업 SI (삼성SDS, LG CNS 등)
├─ 스타트업 출신 개발자들
└─ 최신 프로젝트 트렌드

Vue: 30%
├─ 중소 SI 업체
├─ 기존 프로젝트 유지보수
└─ 러닝 커브 낮음 (SI 특성상 선호)

Angular: 8%
└─ 레거시 프로젝트

Svelte/기타: 2%
```

#### 옵션 A: React 먼저 🔷
```
장점:
✅ 시장 점유율 높음
✅ 생태계 방대 (참고 자료 많음)
✅ 개발자 구인 쉬움
✅ Next.js 연계 (Docs 사이트도 React)

단점:
❌ Vue 사용자 이탈 위험
❌ 경쟁 라이브러리 많음 (차별화 어려움)

타깃:
- 대기업 SI 프론트엔드
- 최신 프로젝트 투입 개발자
```

#### 옵션 B: Vue 먼저 🟢
```
장점:
✅ 경쟁자 적음 (@krds.ui/vue 정도)
✅ 중소 SI 업체 타깃 (블루오션)
✅ 러닝 커브 낮아 빠른 채택
✅ 한국 개발자 선호도 높음

단점:
❌ 시장 규모 작음
❌ 생태계 상대적으로 작음
❌ Docs 사이트를 Nuxt로? (복잡도 증가)

타깃:
- 중소 SI 업체
- Vue 전문 개발자
```

#### 옵션 C: Mono-framework (React + Vue Wrapper) 🎯
```
구조:
@hanui/core (Vanilla TS) ← 핵심 로직
├── @hanui/react (React Wrapper)
└── @hanui/vue (Vue Wrapper)

장점:
✅ 한 번 개발로 두 프레임워크 지원
✅ 시장 전체 커버
✅ 유지보수 효율적

단점:
❌ 초기 구조 설계 복잡
❌ 첫 출시 늦어짐
❌ 각 프레임워크 특성 활용 어려움

참고:
- Headless UI (Tailwind)가 이 방식
- Radix UI도 React 전용 후 Vue 추가
```

**추천: 옵션 A (React 먼저)** ⭐
```
이유:
1. 시장 규모가 크고, 초기 사용자 확보 쉬움
2. Next.js로 Docs 사이트 개발 시 통일성
3. Vue는 Phase 1.5 (2개월차)에 추가
4. Radix UI, Headless UI 등 참고 자료 많음

로드맵:
Month 1-2: React 라이브러리 + Docs
Month 2-3: Vue 버전 추가 (React 경험 기반)
Month 4+: Svelte 등 고려 (수요 있을 시)

마케팅 메시지:
"React 먼저, Vue도 곧 나옵니다"
→ Vue 사용자 이탈 방지
```

---

### Decision 3: 프로젝트 구조

#### 옵션 A: Simple Monorepo (추천) 🏗️
```
hanui/
├── packages/
│   ├── core/              # @hanui/core (공통 유틸)
│   ├── react/             # @hanui/react
│   ├── vue/               # @hanui/vue (Phase 1.5)
│   └── cli/               # create-hanui-app
├── apps/
│   ├── docs/              # 문서 사이트 (Next.js)
│   └── playground/        # 개발용 테스트 앱
├── templates/
│   ├── portal/            # 포털 템플릿 (Next.js) ⭐
│   │   ├── app/           # Next.js App Router
│   │   ├── components/    # 포털용 컴포넌트
│   │   └── public/        # 정적 파일
│   ├── admin/             # 어드민 템플릿 (React + Vite) ⭐
│   │   ├── src/
│   │   │   ├── pages/     # 대시보드, 관리 페이지
│   │   │   ├── components/
│   │   │   └── layouts/   # Sidebar 레이아웃
│   │   └── vite.config.ts
│   └── monorepo-template/ # Both 선택 시 (Turborepo)
│       ├── apps/
│       │   ├── portal/
│       │   └── admin/
│       └── packages/
│           └── shared/    # 공통 컴포넌트
└── docs/                  # 기획 문서 (현재 폴더)

도구: Turborepo + pnpm
```

#### 옵션 B: Mega Monorepo
```
모든 것을 하나의 리포지토리에
(Docs, Marketplace, VSCode Extension까지)

장점: 통합 관리
단점: 초기 설정 복잡, 빌드 느림
→ Phase 1엔 과함
```

**추천: 옵션 A (Simple Monorepo)**

---

## 📋 Phase 1 이슈 전체 목록

### Epic 1: 프로젝트 기반 설정 (Week 1: Day 1-2)

#### Issue #1: Monorepo 초기 설정
```markdown
Title: [Setup] Turborepo + pnpm Monorepo 설정

Description:
- [ ] Turborepo 설정
- [ ] pnpm workspace 설정
- [ ] packages/ 폴더 구조 생성
- [ ] 공통 설정 파일 (tsconfig, eslint)
- [ ] package.json scripts 정의

Labels: setup, phase-1
Assignee: @odada-o
Priority: P0 (Blocker)
Estimate: 4h
```

#### Issue #2: TypeScript 및 빌드 설정
```markdown
Title: [Setup] TypeScript 및 빌드 설정

Description:
- [ ] tsconfig.json (base, packages, apps)
- [ ] Vite 설정 (@hanui/react 빌드용)
- [ ] tsup 설정 (CLI 빌드용)
- [ ] d.ts 타입 정의 생성 설정

Labels: setup, phase-1
Priority: P0
Estimate: 3h
```

#### Issue #3: Linting 및 포매팅 설정
```markdown
Title: [Setup] ESLint + Prettier + Husky 설정

Description:
- [ ] ESLint 설정 (React, TS)
- [ ] Prettier 설정
- [ ] Husky pre-commit hook
- [ ] lint-staged 설정

Labels: setup, phase-1
Priority: P1
Estimate: 2h
```

---

### Epic 2: 디자인 시스템 기초 (Week 1: Day 3-5)

#### Issue #4: KRDS 컬러 토큰 시스템
```markdown
Title: [Core] KRDS 컬러 토큰 시스템 구현

Description:
KRDS 가이드 기반 컬러 팔레트 구현

- [ ] colors.ts 파일 생성
- [ ] 기본 컬러 (Primary, Secondary, Gray)
- [ ] 시맨틱 컬러 (Success, Error, Warning)
- [ ] 접근성 대비 검증 (4.5:1)
- [ ] 다크모드 컬러 매핑
- [ ] CSS Variables 생성 유틸

참고:
- [KRDS 컬러 가이드](https://www.kads.or.kr/)
- WCAG 2.1 AA 기준

Labels: core, design-system, phase-1
Priority: P0
Estimate: 6h
```

#### Issue #5: 타이포그래피 시스템
```markdown
Title: [Core] 타이포그래피 시스템 구현

Description:
- [ ] 폰트 스택 정의 (Pretendard, Noto Sans KR)
- [ ] Type Scale (Display, H1-H6, Body, Caption)
- [ ] Line Height, Letter Spacing
- [ ] Font Weight 정의
- [ ] CSS Classes 생성

Labels: core, design-system, phase-1
Priority: P0
Estimate: 4h
```

#### Issue #6: Spacing 및 Layout 시스템
```markdown
Title: [Core] Spacing 및 Layout 시스템 구현

Description:
- [ ] 8px Grid 기반 Spacing Scale
- [ ] Container 유틸리티
- [ ] Grid System (12 column)
- [ ] Breakpoints (sm, md, lg, xl)
- [ ] Responsive 유틸리티

Labels: core, design-system, phase-1
Priority: P1
Estimate: 5h
```

---

### Epic 3: 핵심 컴포넌트 개발 (Week 1: Day 6-7 + Week 2)

#### Issue #7: Button 컴포넌트
```markdown
Title: [Component] Button 컴포넌트 구현

Description:
KRDS 기준 Button 컴포넌트

Features:
- [ ] Variants (primary, secondary, outline, ghost)
- [ ] Sizes (sm, md, lg)
- [ ] States (default, hover, active, disabled)
- [ ] 접근성 (aria-label, role, disabled)
- [ ] 로딩 상태 (isLoading)
- [ ] 아이콘 버튼 지원 (leftIcon, rightIcon)
- [ ] 명도 대비 4.5:1 검증

API:
```tsx
<Button
  variant="primary"
  size="md"
  disabled={false}
  isLoading={false}
  leftIcon={<Icon />}
  onClick={() => {}}
>
  버튼
</Button>
```

Labels: component, react, phase-1
Priority: P0
Estimate: 8h
```

#### Issue #8: Input 컴포넌트
```markdown
Title: [Component] Input 컴포넌트 구현

Description:
- [ ] 기본 Input
- [ ] Variants (filled, outline)
- [ ] Sizes (sm, md, lg)
- [ ] States (default, focus, error, disabled)
- [ ] Label 지원
- [ ] Helper Text / Error Message
- [ ] 접근성 (aria-describedby, aria-invalid)
- [ ] 아이콘 지원 (leftIcon, rightIcon)

Labels: component, react, phase-1
Priority: P0
Estimate: 8h
```

#### Issue #9: Card 컴포넌트
```markdown
Title: [Component] Card 컴포넌트 구현

Description:
- [ ] 기본 Card
- [ ] CardHeader, CardBody, CardFooter
- [ ] Variants (elevated, outlined, filled)
- [ ] Hover Effect
- [ ] 접근성 (시맨틱 마크업)

Labels: component, react, phase-1
Priority: P1
Estimate: 6h
```

#### Issue #10: Table 컴포넌트
```markdown
Title: [Component] Table 컴포넌트 구현

Description:
공공 프로젝트 필수 컴포넌트

- [ ] 기본 Table
- [ ] Thead, Tbody, Tr, Th, Td
- [ ] Striped Rows (접근성 대비 고려)
- [ ] Sortable Headers
- [ ] 접근성 (scope, headers)
- [ ] 반응형 (모바일 스택 레이아웃)

Labels: component, react, phase-1, high-priority
Priority: P0
Estimate: 10h
```

#### Issue #11: Modal 컴포넌트
```markdown
Title: [Component] Modal 컴포넌트 구현

Description:
- [ ] 기본 Modal
- [ ] Overlay (Backdrop)
- [ ] Sizes (sm, md, lg, xl, full)
- [ ] Close 버튼
- [ ] 접근성 (Focus Trap, ESC 닫기, aria-modal)
- [ ] 애니메이션 (Fade In/Out)

Labels: component, react, phase-1
Priority: P1
Estimate: 10h
```

#### Issue #11-1: Pagination 컴포넌트 (공공 필수) ⭐
```markdown
Title: [Component] Pagination 컴포넌트 구현

Description:
공공 게시판 필수 컴포넌트

Features:
- [ ] 기본 Pagination (1 2 3 ... 10)
- [ ] 이전/다음 버튼
- [ ] 첫 페이지/마지막 페이지 이동
- [ ] 현재 페이지 강조
- [ ] Compact 모드 (모바일)
- [ ] 페이지 크기 선택 (10, 20, 50, 100)
- [ ] 접근성 (aria-label, role="navigation")

API:
```tsx
<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={(page) => {}}
  pageSize={10}
  onPageSizeChange={(size) => {}}
/>
```

Labels: component, react, phase-1, public-essential
Priority: P0 (공공 프로젝트 필수)
Estimate: 6h
```

#### Issue #11-2: Breadcrumb 컴포넌트 (공공 필수) ⭐
```markdown
Title: [Component] Breadcrumb 컴포넌트 구현

Description:
공공 포털 필수 네비게이션

Features:
- [ ] 기본 Breadcrumb (홈 > 카테고리 > 현재 페이지)
- [ ] 링크 지원
- [ ] 현재 페이지 강조 (aria-current="page")
- [ ] Separator 커스터마이징
- [ ] 접근성 (nav, aria-label="breadcrumb")
- [ ] 모바일 반응형 (생략 표시)

API:
```tsx
<Breadcrumb>
  <BreadcrumbItem href="/">홈</BreadcrumbItem>
  <BreadcrumbItem href="/notice">공지사항</BreadcrumbItem>
  <BreadcrumbItem current>상세보기</BreadcrumbItem>
</Breadcrumb>
```

Labels: component, react, phase-1, public-essential
Priority: P0
Estimate: 4h
```

#### Issue #11-3: FileUpload 컴포넌트 (공공 필수) ⭐
```markdown
Title: [Component] FileUpload 컴포넌트 구현

Description:
공공 프로젝트 파일 업로드 (민원, 자료실 필수)

Features:
- [ ] 드래그 앤 드롭
- [ ] 파일 선택 (단일/복수)
- [ ] 파일 크기 제한 검증
- [ ] 확장자 제한 검증
- [ ] 업로드 진행률 표시
- [ ] 파일 목록 표시 (썸네일)
- [ ] 파일 삭제
- [ ] 접근성 (키보드 업로드, aria-label)
- [ ] 에러 메시지

API:
```tsx
<FileUpload
  accept=".pdf,.hwp,.jpg,.png"
  maxSize={10 * 1024 * 1024} // 10MB
  maxFiles={5}
  onUpload={(files) => {}}
  onError={(error) => {}}
/>
```

Labels: component, react, phase-1, public-essential, high-complexity
Priority: P0
Estimate: 12h
```

#### Issue #11-4: Select 컴포넌트 ⭐
```markdown
Title: [Component] Select 컴포넌트 구현

Description:
폼에 필수적인 Select (공공 프로젝트 빈번히 사용)

Features:
- [ ] 기본 Select
- [ ] 검색 가능 Select
- [ ] 다중 선택 (Multi-select)
- [ ] 그룹화 (Grouped Options)
- [ ] 접근성 (aria-expanded, role="combobox")
- [ ] 키보드 네비게이션 (↑↓, Enter, ESC)
- [ ] 커스텀 옵션 렌더링

API:
```tsx
<Select
  options={[
    { value: '1', label: '서울' },
    { value: '2', label: '부산' }
  ]}
  value="1"
  onChange={(value) => {}}
  searchable
  multiple
/>
```

Labels: component, react, phase-1, high-priority
Priority: P0
Estimate: 10h
```

---

### Epic 4: CLI 도구 (Week 3: Day 1-3)

#### Issue #12: create-hanui-app CLI 구현
```markdown
Title: [CLI] create-hanui-app 기본 구현

Description:
npx create-hanui-app 명령어 구현

Features:
- [ ] CLI 프레임워크 (Commander.js)
- [ ] 인터랙티브 프롬프트 (Inquirer.js)
- [ ] 프로젝트 이름 입력
- [ ] 프레임워크 선택 (React / Vue)
- [ ] 템플릿 선택 (Basic / Dashboard / Form)
- [ ] 프로젝트 생성 로직
- [ ] Dependencies 자동 설치
- [ ] Git 초기화

Labels: cli, phase-1
Priority: P0
Estimate: 12h
```

#### Issue #13: 템플릿 2개 개발 (포털 + 어드민) ⭐ 중요 변경
```markdown
Title: [CLI] 공공 프로젝트 특화 템플릿 2개 개발

Description:
공공 웹사이트의 필수 구성: 포털 + 어드민

상세 페이지 구성: [TEMPLATE_PAGES.md](./TEMPLATE_PAGES.md) 참고

---

**1. Portal Template (Next.js 14 App Router) - 대국민 서비스**

기술 스택:
- Next.js 14 (App Router)
- SSR/SSG 지원
- SEO 최적화
- 접근성 강화 (대국민 서비스 특성)

**P0 페이지 (필수 - 6개):**
- [ ] 공통 레이아웃 (Header, Footer)
- [ ] 메인 페이지 (/)
- [ ] 공지사항 목록 (/notice)
- [ ] 공지사항 상세 (/notice/[id])
- [ ] 민원 신청 (/civil-complaint)
- [ ] 로그인 (/login)

**P1 페이지 (선택 - 3개):**
- [ ] 자료실 (/library)
- [ ] FAQ (/faq)
- [ ] 소개 (/about)

주요 기능:
- [ ] Header (GNB, 검색, 로그인, 반응형 햄버거)
- [ ] Footer (사이트맵, 저작권, 접근성 마크)
- [ ] Breadcrumb (모든 페이지)
- [ ] 프린트 최적화 CSS
- [ ] 반응형 디자인 (모바일 우선)

접근성:
- [ ] 건너뛰기 링크
- [ ] 웹 접근성 인증 마크 위치
- [ ] WCAG 2.1 AA 준수

개발 시간: 13h (P0), +4h (P1)

---

**2. Admin Template (React + Vite) - 관리자 페이지**

기술 스택:
- React 18
- Vite (빠른 개발 환경)
- React Router
- SPA (서버 부담 적음)

**P0 페이지 (필수 - 6개):**
- [ ] 공통 레이아웃 (Sidebar, TopBar)
- [ ] 로그인 (/admin/login)
- [ ] 대시보드 (/admin/dashboard) - 차트 포함
- [ ] 공지사항 목록 (/admin/notice)
- [ ] 공지사항 등록/수정 (/admin/notice/new, /edit)
- [ ] 사용자 관리 (/admin/users)

**P1 페이지 (선택 - 2개):**
- [ ] 파일 관리 (/admin/files)
- [ ] 설정 (/admin/settings)

주요 기능:
- [ ] Sidebar 네비게이션 (2-depth, 반응형)
- [ ] TopBar (페이지 제목, 알림, 사용자 드롭다운)
- [ ] Data Table (정렬, 필터, 페이징, 일괄 선택)
- [ ] CRUD Form (검증 포함)
- [ ] Modal (확인/삭제 다이얼로그)
- [ ] Toast 알림
- [ ] 차트 (Chart.js or Recharts)

접근성:
- [ ] 키보드 네비게이션
- [ ] 스크린 리더 대응
- [ ] ARIA 속성

개발 시간: 14h (P0), +3h (P1)

---

**템플릿 선택 시나리오:**
```bash
npx create-hanui-app my-project

? 프로젝트 유형을 선택하세요:
  ❯ Portal (Next.js) - 대국민 포털 사이트
    Admin (React + Vite) - 관리자 페이지
    Both - 포털 + 어드민 (Monorepo)
```

**Both 선택 시 구조:**
```
my-project/
├── apps/
│   ├── portal/        # Next.js (포트 3000)
│   └── admin/         # React + Vite (포트 3001)
├── packages/
│   └── shared/        # 공통 컴포넌트
└── package.json       # Turborepo 설정
```

---

**Mock Data 제공:**
- [ ] notices.json (공지사항 샘플)
- [ ] users.json (사용자 샘플)
- [ ] files.json (파일 샘플)

**README 포함:**
- [ ] 페이지 구조 설명
- [ ] API 연동 방법
- [ ] 커스터마이징 가이드
- [ ] 배포 가이드

Labels: cli, templates, phase-1, critical
Priority: P0 (최우선)
Estimate: 27h (P0: Portal 13h + Admin 14h)
         +7h (P1 선택 시)
Dependencies: #12 (CLI 구현 필요)

Acceptance Criteria:
✅ npx create-hanui-app 실행 시 Portal/Admin/Both 선택 가능
✅ 선택한 템플릿이 30초 내 생성됨
✅ 생성된 프로젝트가 즉시 실행 가능 (npm run dev)
✅ 모든 P0 페이지가 동작함
✅ 9개 컴포넌트가 모두 사용됨
✅ Mock Data로 실제 동작하는 것처럼 보임
✅ README가 명확함
```

---

### Epic 5: 문서 사이트 (Week 3: Day 4-7)

#### Issue #14: Docs 사이트 기본 구조
```markdown
Title: [Docs] Next.js 문서 사이트 초기 설정

Description:
Vercel 디자인 레퍼런스 기반

- [ ] Next.js 14 (App Router) 설정
- [ ] Tailwind CSS 설정
- [ ] MDX 설정 (Contentlayer)
- [ ] 기본 레이아웃 (Header, Sidebar, Content)
- [ ] 다크모드 토글

Labels: docs, phase-1
Priority: P0
Estimate: 12h
```

#### Issue #15: 컴포넌트 API 문서
```markdown
Title: [Docs] 컴포넌트 API 자동 생성

Description:
- [ ] JSDoc → Markdown 변환 도구
- [ ] Props Table 생성
- [ ] 예제 코드 하이라이팅
- [ ] Live Preview (Sandpack)

Labels: docs, phase-1
Priority: P1
Estimate: 10h
```

#### Issue #16: 메인 페이지 디자인
```markdown
Title: [Docs] 메인 페이지 구현

Description:
Vercel 스타일 Hero Section

- [ ] Hero Section (main.png 참고)
- [ ] Features Section (4가지 차별화)
- [ ] Code Preview (Live Demo)
- [ ] CTA Buttons (Get Started, GitHub)

Labels: docs, design, phase-1
Priority: P1
Estimate: 8h
```

---

### Epic 6: NPM 배포 (Week 4)

#### Issue #17: NPM 배포 준비
```markdown
Title: [Release] NPM 배포 준비

Description:
- [ ] package.json 메타데이터 작성
- [ ] README.md 작성
- [ ] LICENSE (MIT)
- [ ] CHANGELOG.md
- [ ] .npmignore 설정
- [ ] NPM organization 생성 (@hanui)

Labels: release, phase-1
Priority: P0
Estimate: 4h
```

#### Issue #18: CI/CD 설정
```markdown
Title: [Release] GitHub Actions CI/CD 설정

Description:
- [ ] Test 워크플로우
- [ ] Build 워크플로우
- [ ] NPM 배포 워크플로우 (Release)
- [ ] Vercel 배포 (Docs)

Labels: devops, phase-1
Priority: P0
Estimate: 6h
```

#### Issue #19: v0.1.0 배포
```markdown
Title: [Release] v0.1.0 First Release

Description:
첫 번째 공식 배포

Checklist:
- [ ] 모든 컴포넌트 테스트 통과
- [ ] Docs 사이트 배포 완료
- [ ] NPM 배포 (@hanui/react)
- [ ] GitHub Release 생성
- [ ] Product Hunt 준비

Labels: release, phase-1, milestone
Priority: P0
Estimate: 4h
```

---

## 🚀 Phase 1.5 이슈 (Vue 지원, Month 2-3)

### Issue #20: Vue 3 컴포넌트 포팅
```markdown
Title: [Vue] React → Vue 3 포팅

Description:
React 컴포넌트를 Vue 3 Composition API로 포팅

- [ ] Button
- [ ] Input
- [ ] Card
- [ ] Table
- [ ] Modal

Labels: vue, phase-1.5
Priority: P1
Estimate: 30h
```

---

## 🎯 우선순위 요약

### P0 (Blocker - 반드시 해야 함)
```
Week 1 (프로젝트 기반 + 디자인 시스템 + 핵심 컴포넌트):
- #1: Monorepo 설정
- #2: TypeScript 설정
- #4: 컬러 토큰
- #5: 타이포그래피
- #7: Button
- #8: Input

Week 2 (공공 필수 컴포넌트):
- #10: Table (게시판 필수)
- #11-1: Pagination (게시판 필수)
- #11-2: Breadcrumb (포털 필수)
- #11-3: FileUpload (민원/자료실 필수)
- #11-4: Select (폼 필수)

Week 3 (CLI + 템플릿):
- #12: CLI 구현
- #13: 템플릿 2개 (Portal + Admin) ⭐ 중요
  - Portal (Next.js) - 15h
  - Admin (React + Vite) - 15h
- #14: Docs 사이트 기본

Week 4 (배포):
- #17: NPM 배포 준비
- #18: CI/CD
- #19: v0.1.0 배포

총 컴포넌트: 9개 (Button, Input, Table, Card, Modal, Pagination, Breadcrumb, FileUpload, Select)
→ 공공 프로젝트 실무 커버율 90%+
```

### P1 (High - 가능하면 해야 함)
```
- #3: Linting
- #6: Spacing 시스템
- #9: Card
- #11: Modal
- #15: API 문서 자동화
- #16: 메인 페이지
```

### P2 (Medium - 나중에)
```
- Vue 지원 (#20)
- 추가 컴포넌트
```

---

## 📊 예상 타임라인 (수정됨)

```
Week 1 (5일) - 프로젝트 기반 + 핵심 컴포넌트:
Day 1-2: 프로젝트 설정 (#1, #2, #3) - 9h
Day 3-5: 디자인 시스템 (#4, #5, #6) - 15h
Day 5-7: Button, Input (#7, #8) - 16h
총: 40h (하루 8시간)

Week 2 (5일) - 공공 필수 컴포넌트:
Day 1-2: Table (#10) - 10h
Day 2-3: Pagination + Breadcrumb (#11-1, #11-2) - 10h
Day 3-5: FileUpload (#11-3) - 12h
Day 5: Select 시작 (#11-4) - 4h
총: 36h

Week 2.5 (3일) - 컴포넌트 마무리:
Day 1-2: Select 완성 (#11-4) - 6h
Day 2: Card (#9) - 6h
Day 3: Modal (#11) - 10h
총: 22h

Week 3 (5일) - CLI + 템플릿:
Day 1-2: CLI 구현 (#12) - 12h
Day 3-4: Portal 템플릿 (Next.js) - 15h
Day 5: Admin 템플릿 시작 - 8h
총: 35h

Week 4 (5일) - 템플릿 완성 + Docs:
Day 1-2: Admin 템플릿 완성 - 7h
Day 2-3: Docs 사이트 기본 (#14) - 12h
Day 4-5: Docs 콘텐츠 작성 - 10h
총: 29h

Week 5 (5일) - 마무리 + 배포:
Day 1-2: 통합 테스트 및 버그 수정
Day 3: NPM 배포 준비 (#17) - 4h
Day 4: CI/CD (#18) - 6h
Day 5: v0.1.0 배포! (#19) - 4h
총: 14h + 테스트 시간
```

**현실적 예상: 5주**
(풀타임 기준, 하루 8시간)

**파트타임 기준: 8-10주**
(하루 4-5시간)

---

## 💡 전략적 권고사항 (업데이트)

### 0. 포털 + 어드민 템플릿 전략 ⭐ 핵심 차별화
```
기존 경쟁자들:
- KRDS-community/krds-react: 컴포넌트만 제공
- @krds.ui/vue: 컴포넌트만 제공
- shadcn/ui: 컴포넌트 복사만

HANUI의 차별화:
✅ Portal Template (Next.js)
   - 공공기관 대국민 포털 즉시 사용
   - SEO, 접근성, 게시판 기본 탑재

✅ Admin Template (React + Vite)
   - 내부 관리자 시스템 즉시 사용
   - 대시보드, CRUD, 권한 관리 기본 탑재

✅ Both 옵션 (Monorepo)
   - 포털 + 어드민 통합 프로젝트
   - 공통 컴포넌트 공유

실제 공공 프로젝트 시나리오:
1. SI 업체가 공공기관 프로젝트 수주
2. npx create-hanui-app 실행
3. Both 선택 (Portal + Admin)
4. 30초 만에 프로젝트 기본 구조 완성
5. 커스터마이징만 하면 됨

→ 개발 시간 2주 → 2일로 단축
→ 이게 진짜 차별화!
```

### 1. Starter Kit 우선 전략 채택 ✅
```
이유:
- 빠른 검증 (Lean Startup)
- 실사용 피드백 조기 수집
- 커뮤니티 조기 형성

실행:
Week 1-2: 컴포넌트 5개
Week 3: CLI
Week 4: 배포
→ 1개월 내 실사용 가능
```

### 2. React 먼저 개발 ✅
```
이유:
- 시장 규모 60% (Vue 30%)
- 참고 자료 풍부
- Next.js로 Docs 통일

로드맵:
Month 1-2: React
Month 2-3: Vue 추가
```

### 3. 최소 완성도 전략
```
Week 4 배포 시 반드시 포함:
✅ Button, Input, Table, Card, Modal
✅ create-hanui-app (템플릿 3개)
✅ 기본 문서 사이트
✅ README (Quick Start)

나중에:
⏳ 고급 컴포넌트 (Select, DatePicker 등)
⏳ 상세 문서
⏳ Vue 버전
```

### 4. 커뮤니티 준비
```
Week 4 배포 전 준비:
- [ ] GitHub Discussions 활성화
- [ ] Discord 서버 개설
- [ ] Twitter 계정 생성
- [ ] Product Hunt 프로필
```

---

## 📝 다음 단계

### 지금 바로 해야 할 일:
1. **전략 결정 확정**
   - ✅ Starter Kit 우선
   - ✅ React 먼저
   - ✅ Simple Monorepo

2. **GitHub Project 생성**
   - Project Board 만들기
   - Epic별 분류
   - Milestone 설정 (v0.1.0)

3. **Issue 생성 시작**
   - P0 이슈부터 생성
   - 상세 Acceptance Criteria 추가
   - 예상 시간 기록

4. **Week 1 Day 1 시작**
   - Issue #1: Monorepo 설정부터!

---

**작성자**: @odada-o
**버전**: v1.0
**Last Updated**: 2025-01-08
