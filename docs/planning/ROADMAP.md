# KRDS Platform - 개발 로드맵

> **"4단계로 완성하는 KRDS 생태계"**

---

## 📋 목차
1. [전체 타임라인](#전체-타임라인)
2. [Phase 1: Starter Kit](#phase-1-starter-kit-1-2개월)
3. [Phase 2: 접근성 도구](#phase-2-접근성-도구-3-4개월)
4. [Phase 3: Marketplace](#phase-3-marketplace-5-8개월)
5. [Phase 4: AI Generator](#phase-4-ai-generator-9-12개월)

---

## 1. 전체 타임라인

```
Month 1-2   Phase 1: Starter Kit ⭐ 최우선
│           └─ create-krds-app, 컴포넌트 라이브러리, 문서 사이트
│           └─ 목표: "오, 이거 편한데!" 반응
│
Month 3-4   Phase 2: 접근성 도구
│           └─ VSCode Extension, CI/CD 통합
│           └─ 목표: "이거 없으면 못 써" 수준
│
Month 5-8   Phase 3: Marketplace
│           └─ 템플릿 마켓, 수익 분배, 커뮤니티
│           └─ 목표: "KRDS는 여기서 다 구하네"
│
Month 9-12  Phase 4: AI Generator
            └─ 프롬프트 → 코드, Figma 연동
            └─ 목표: "미래다..."
```

---

## 2. Phase 1: Starter Kit (1-2개월)

### 🎯 목표
```
✅ 공공 프로젝트를 30초 안에 시작 가능하게
✅ NPM 다운로드 500회/주
✅ GitHub Stars 300개
✅ 실제 프로젝트 사용 10개
```

### Week 1: 프로젝트 초기 설정

#### Day 1-2: Monorepo 세팅
```bash
□ Turborepo + pnpm workspace 설정
□ 폴더 구조 생성 (packages/, apps/, tooling/)
□ 공유 설정 파일 (ESLint, TypeScript, Prettier)
□ GitHub 저장소 생성 및 README 작성
```

**산출물**:
- 초기 프로젝트 구조
- 빌드 시스템 작동 확인

#### Day 3-5: 핵심 컴포넌트 5개
```tsx
□ Button (primary, secondary, outline, ghost variants)
□ Input (text, password, email types + validation)
□ Select (드롭다운, 검색 가능)
□ Modal (다이얼로그)
□ Table (기본 테이블)
```

**체크리스트 (각 컴포넌트마다)**:
- [ ] TypeScript 타입 정의
- [ ] Tailwind 스타일링 (KRDS 토큰 사용)
- [ ] 접근성 (aria 속성, 키보드 네비게이션)
- [ ] Storybook 스토리 작성
- [ ] 단위 테스트 (Vitest)

#### Day 6-7: 테마 시스템
```typescript
□ ThemeProvider 구현
□ useColorMode 훅 (다크모드)
□ KRDS 디자인 토큰 → Tailwind 매핑
□ CSS 변수 정의
```

---

### Week 2: CLI 도구 개발

#### Day 1-3: create-krds-app CLI
```bash
npx create-krds-app my-project
```

**기능**:
```typescript
□ 대화형 프롬프트 (inquirer)
  - Framework? (React / Next.js)
  - Styling? (Tailwind / SCSS)
  - Templates? (Yes / No)

□ 템플릿 다운로드 및 설정
  - package.json 생성
  - 의존성 설치
  - Git 초기화

□ 성공 메시지 및 다음 단계 안내
```

**테스트**:
```bash
# 실제로 프로젝트 생성해보기
npx create-krds-app test-project
cd test-project
npm run dev
# → 정상 작동 확인
```

#### Day 4-5: 템플릿 3개 제작

**템플릿 1: 로그인/회원가입**
```
pages/
├── Login.tsx        # 로그인 폼
├── Signup.tsx       # 회원가입 폼
└── ForgotPassword.tsx  # 비밀번호 찾기

features:
✓ 폼 validation (이메일, 비밀번호)
✓ 에러 처리
✓ 반응형 디자인
✓ 접근성 완벽
```

**템플릿 2: 관리자 대시보드**
```
pages/
├── Dashboard.tsx    # 통계 대시보드
│   ├── StatsCard    # 통계 카드
│   ├── Chart        # 차트 (recharts)
│   └── RecentTable  # 최근 활동
└── Layout.tsx       # 사이드바 + 헤더

features:
✓ 사이드바 네비게이션
✓ 반응형 (모바일에서 햄버거 메뉴)
✓ 다크모드 전환 버튼
```

**템플릿 3: 게시판**
```
pages/
├── BoardList.tsx    # 목록 (Table + Pagination)
├── BoardDetail.tsx  # 상세
└── BoardForm.tsx    # 등록/수정

features:
✓ CRUD 기능 완비
✓ 검색/필터
✓ 페이지네이션
✓ 첨부파일 (드래그앤드롭)
```

#### Day 6-7: 통합 테스트
```bash
□ 각 템플릿 프로젝트 생성 테스트
□ 빌드 테스트 (npm run build)
□ E2E 테스트 (Playwright)
□ 접근성 테스트 (axe-core)
```

---

### Week 3: 문서 사이트 개발

#### Day 1-2: Next.js 문서 사이트 기본 구조
```
apps/docs/
├── app/
│   ├── layout.tsx
│   ├── page.tsx         # 랜딩 페이지
│   ├── docs/
│   │   ├── page.tsx     # Getting Started
│   │   └── components/  # 컴포넌트 문서
│   └── templates/
│       └── page.tsx     # 템플릿 쇼케이스
└── components/
    ├── Navigation.tsx
    ├── CodeBlock.tsx    # 코드 하이라이팅
    └── LiveDemo.tsx     # 인터랙티브 데모
```

#### Day 3-4: 랜딩 페이지 (중요!)

**Hero Section**:
```tsx
<section className="bg-gradient-to-br from-blue-600 to-blue-800">
  <div className="container mx-auto px-4 py-20">
    <h1 className="text-5xl font-bold text-white">
      KRDS Platform
    </h1>
    <p className="text-xl text-blue-100 mt-4">
      대한민국 정부 표준 디자인 시스템
      <br />
      이제 30초 안에 시작하세요
    </p>

    <div className="mt-8 flex gap-4">
      <Button size="lg">시작하기 →</Button>
      <Button size="lg" variant="outline">
        템플릿 보기
      </Button>
    </div>

    {/* 인터랙티브 데모 */}
    <div className="mt-12 bg-white rounded-lg shadow-2xl p-8">
      <LiveCodeEditor />
    </div>
  </div>
</section>
```

**Features Section**:
```
- ⚡ 즉시 시작 (npx create-krds-app)
- 🎨 프리미엄 디자인
- ♿ 접근성 인증
- 🌓 다크모드 지원
- 📱 반응형 디자인
- 🔧 완벽한 TypeScript
```

**Templates Showcase**:
```tsx
<div className="grid grid-cols-3 gap-8">
  {templates.map(template => (
    <TemplateCard
      key={template.id}
      title={template.title}
      preview={template.preview}
      liveDemo={template.liveDemo}
    />
  ))}
</div>
```

#### Day 5-7: 컴포넌트 문서 페이지

**구조**:
```markdown
# Button

KRDS 가이드를 준수하는 버튼 컴포넌트입니다.

## Preview
[인터랙티브 데모]

## Usage
[코드 예시 + Copy 버튼]

## Props
[Props 테이블]

## Accessibility
[접근성 가이드]

## Examples
[다양한 사용 예시]
```

**필수 기능**:
- [ ] 코드 복사 버튼
- [ ] 다크모드 토글
- [ ] 반응형 미리보기
- [ ] 검색 기능 (Algolia DocSearch)

---

### Week 4: 배포 및 홍보

#### Day 1-2: NPM 배포
```bash
□ @krds/react 패키지 배포
  - npm login
  - npm publish --access public

□ @krds/cli 패키지 배포

□ 버전 관리 (Changesets)
  - CHANGELOG.md 자동 생성
```

#### Day 3-4: 문서 사이트 배포
```bash
□ Vercel 배포
  - krds.dev 도메인 연결
  - 환경 변수 설정
  - Preview 배포 확인

□ SEO 최적화
  - meta 태그
  - sitemap.xml
  - robots.txt
  - Open Graph 이미지
```

#### Day 5: 런칭 준비
```markdown
□ README.md 최종 검토
  - 설치 방법
  - Quick Start
  - 기여 가이드
  - 스크린샷 10장+

□ GitHub 꾸미기
  - Shields.io 배지
  - Topics 태그
  - About 설정

□ Demo 영상 제작 (3분)
  - npx create-krds-app 실행
  - 템플릿 선택
  - 개발 서버 실행
  - 컴포넌트 사용
```

#### Day 6-7: 커뮤니티 런칭 🚀

**OKKY 포스트**:
```markdown
제목: [오픈소스] KRDS Platform - 공공 프로젝트 30초 만에 시작하기

내용:
안녕하세요! 공공 SI 프로젝트 하시는 분들께 도움이 될 만한
오픈소스를 만들어서 공유합니다.

문제:
- KRDS 가이드 따라 컴포넌트 매번 새로 구현
- 프로젝트 세팅에만 1~2주

해결:
npx create-krds-app my-project
→ 30초 후 KRDS 준수 프로젝트 완성!

[스크린샷]
[Demo 영상 링크]
[GitHub 링크]

피드백 환영합니다!
```

**GeekNews 제출**:
```markdown
KRDS Platform - 한국 공공 프로젝트용 React 컴포넌트 라이브러리
https://github.com/[username]/krds-platform

설명: KRDS(대한민국 정부 표준 디자인 시스템)를 React로 구현한
컴포넌트 라이브러리 + 프로젝트 Starter Kit입니다.
```

**Product Hunt**:
```
Tagline: React components for Korean government projects

Description:
KRDS Platform makes it easy to build government websites
that comply with Korean Design System standards.

Features:
- 30-second project setup
- 20+ accessible components
- Dark mode support
- Government-approved design
```

---

### 📊 Phase 1 완료 체크리스트

#### 기술적 완성도
- [ ] NPM 패키지 배포 (@krds/react, @krds/cli)
- [ ] 문서 사이트 배포 (krds.dev)
- [ ] CI/CD 파이프라인 구축
- [ ] 테스트 커버리지 80% 이상
- [ ] 번들 사이즈 < 100KB (gzipped)
- [ ] 접근성 테스트 100% 통과

#### 사용성
- [ ] create-krds-app 정상 작동
- [ ] 템플릿 3개 완성 (로그인, 대시보드, 게시판)
- [ ] Storybook 배포
- [ ] 문서 완비 (Getting Started, API Reference)

#### 커뮤니티
- [ ] GitHub Stars 100개 이상
- [ ] OKKY 포스트 조회수 1000+
- [ ] Discord 서버 개설 (50명 목표)
- [ ] 첫 외부 기여자 (PR)

#### 실사용
- [ ] 본인 프로젝트 적용 (dogfooding)
- [ ] 지인 2~3명 테스트
- [ ] 피드백 수집 및 반영

---

## 3. Phase 2: 접근성 도구 (3-4개월)

### 🎯 목표
```
✅ "이거 없으면 못 써" 수준의 도구
✅ VSCode Extension 설치 1,000개
✅ 공공 프로젝트 필수 도구화
✅ 접근성 검증 시간 2주 → 1일
```

### Month 3: VSCode Extension 개발

#### Week 1-2: 기본 기능

**Extension 구조**:
```
tooling/vscode-extension/
├── src/
│   ├── extension.ts          # 진입점
│   ├── linter.ts             # 접근성 린트
│   ├── quickfix.ts           # 자동 수정
│   └── diagnostics.ts        # 문제 진단
├── package.json
└── README.md
```

**핵심 기능**:
```typescript
□ 실시간 린팅
  - aria 속성 누락 감지
  - 색상 대비 검사
  - 키보드 접근성 체크

□ Quick Fix
  - aria-label 자동 추가
  - role 속성 제안
  - tabIndex 최적화

□ Hover 정보
  - 접근성 가이드 링크
  - 올바른 사용 예시
```

**개발 체크리스트**:
- [ ] VS Code API 학습
- [ ] TypeScript AST 파싱
- [ ] axe-core 통합
- [ ] 테스트 작성
- [ ] 문서 작성

#### Week 3: 고급 기능

```typescript
□ 코드 액션
  - "Fix all accessibility issues"
  - "Add ARIA labels to all buttons"

□ 설정
  - 검사 강도 (strict / normal / relaxed)
  - 무시할 규칙 선택

□ 리포트
  - 파일별 접근성 점수
  - 프로젝트 전체 통계
```

#### Week 4: VS Code Marketplace 배포

```bash
□ Extension 패키징 (vsce)
□ Marketplace 계정 생성
□ 배포
□ README 작성 (스크린샷, GIF)
□ 홍보 (OKKY, GeekNews)
```

---

### Month 4: CI/CD 통합

#### Week 1-2: GitHub Action 개발

```yaml
# .github/workflows/krds-check.yml
name: KRDS Accessibility Check

on: [pull_request]

jobs:
  a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3

      - name: Install dependencies
        run: npm install

      - name: Run KRDS Check
        run: npx @krds/cli check

      - name: Comment PR
        if: failure()
        uses: actions/github-script@v6
        with:
          script: |
            // PR에 접근성 위반 사항 코멘트
```

#### Week 3: CLI 도구 확장

```bash
npx @krds/cli check
npx @krds/cli fix
npx @krds/cli report
npx @krds/cli export (PDF/HTML 리포트)
```

#### Week 4: 파일럿 프로젝트

```
□ 실제 공공 프로젝트에 적용
□ 접근성 검수 프로세스 문서화
□ Before/After 비교 데이터 수집
□ 케이스 스터디 작성
```

---

## 4. Phase 3: Marketplace (5-8개월)

### 🎯 목표
```
✅ 등록 개발자 100명
✅ 업로드 템플릿 200개
✅ 월 거래액 ₩5,000,000
✅ 커뮤니티 자율 성장
```

### Month 5-6: 플랫폼 개발

#### 기본 기능
```
□ 회원가입/로그인 (NextAuth)
□ 템플릿 업로드 (파일 + 메타데이터)
□ 템플릿 목록/검색/필터
□ 결제 (토스페이먼츠)
□ 다운로드 시스템
□ 개발자 프로필
```

#### 인증 시스템
```
자동 검증:
□ KRDS 가이드 준수 (ESLint)
□ 접근성 테스트 (axe-core)
□ 코드 품질 (SonarQube)
□ 보안 스캔 (npm audit)
□ 번들 사이즈 체크

통과하면:
✅ KRDS 인증 배지
```

### Month 7: 초기 콘텐츠 확보

```
□ 직접 제작 프리미엄 템플릿 10개
  - 관리자 대시보드 3종
  - CRM 시스템
  - 이커머스 백오피스
  - 예약 시스템
  - 설문조사 시스템
  - ...

□ 무료 공개 (품질 시연)
□ 개발자 초대 (100명 목표)
```

### Month 8: 커뮤니티 활성화

```
□ 템플릿 공모전 (상금 ₩1,000,000)
□ 베스트 크리에이터 프로그램
□ 월간 뉴스레터 발행
□ Discord 이벤트 (라이브 코딩)
```

---

## 5. Phase 4: AI 협업 & 공식화 추진 (9-12개월)

> **전략 변경: AI 시대 대응**
>
> 기존: AI Generator를 킬러 피처로
>
> 변경: ① 검증 도구 강화 ② 공식 인증 추진 ③ AI는 보조 기능

### 🎯 새로운 목표
```
✅ HANUI Validator 사용: 10,000회/월
✅ 공공기관 공식 인정 또는 파트너십 1개
✅ "AI + HANUI" 워크플로우 확립
✅ Pro 구독자 100명 (검증 도구로)
```

### Month 9: 검증 도구 고도화

#### AI 생성 코드 검증 시스템
```
□ AI 코드 분석 엔진
  - ChatGPT, v0.dev 등에서 생성된 코드 인식
  - KRDS 준수 여부 자동 체크
  - 한국 접근성 기준 검증

□ Quick Fix 자동화
  - AI 코드 → KRDS 변환 규칙
  - 원클릭 수정 기능
  - Before/After 비교 UI

□ 검증 리포트
  - PDF 출력 (납품용)
  - HANUI 인증 마크 발급
  - 공공기관 제출 가능 형식
```

#### VSCode Extension 업그레이드
```
□ AI 통합
  - Copilot, Cursor 등과 호환
  - AI 제안 코드 실시간 검증
  - "HANUI 기준으로 수정" 기능

□ 성능 개선
  - 검증 속도 3초 → 1초
  - 백그라운드 검증
```

### Month 10: 공식화 추진 & 파트너십

#### 정부/공공기관 접촉
```
□ 행안부 접근
  - KRDS 공식 인정 협의
  - 또는 "준공식" 지위 협상
  - 공공 프로젝트 추천 도구화

□ 파일럿 프로젝트
  - 지자체 1개 선정
  - 실제 프로젝트 전체 적용
  - 사례 연구 작성
  - 접근성 검수 통과율 입증

□ 공공 발주 기준 반영 추진
  - "HANUI 인증" 가점 제도
  - 입찰 평가 항목 제안
```

#### AI 플랫폼 파트너십
```
□ v0.dev, Cursor 등과 협력
  - HANUI 검증 통합
  - "Export to HANUI" 기능
  - 크로스 프로모션

□ ChatGPT Plugin (선택)
  - "HANUI 기준으로 코드 생성"
  - GPT Store 등록
```

### Month 11: AI 보조 기능 (선택적 구현)

> **중요:** 주력이 아닌 부가 기능

#### HANUI Assistant (최소 구현)
```
□ 기본 AI 어시스턴트
  - 컴포넌트 추천
  - 코드 스니펫 삽입
  - 간단한 질의응답

□ 프롬프트 기반 생성 (매우 제한적)
  - 단순한 컴포넌트만
  - 복잡한 페이지는 AI + 검증 권장
  - "생성보다 검증"이 메인 메시지
```

#### Figma 플러그인 (우선순위 낮음)
```
□ 간단한 변환 도구
  - Figma → HANUI 컴포넌트 매핑
  - 수동 검증 필수
```

### Month 12: 포지셔닝 확립

#### 마케팅 메시지 재정의
```
❌ 기존 메시지:
"AI로 KRDS 코드를 생성합니다"

✅ 새로운 메시지:
"AI가 만든 코드를 HANUI가 검증합니다"
"공공기관이 믿을 수 있는 유일한 KRDS 플랫폼"
```

#### 성과 발표
```
□ 검증 실적 공개
  - 검증 횟수: 10,000+
  - 접근성 통과율: 95%+
  - 시간 절감: 평균 2주 → 1일
  - 비용 절감: 500만원 → 50만원

□ 공식 인정 발표 (성공 시)
  - 프레스 릴리스
  - 컨퍼런스 발표
  - "공공 프로젝트 표준"

□ Product Hunt 재런칭
  - "AI 시대의 필수 검증 도구"
  - 케이스 스터디 강조
```

---

## 📊 전체 KPI 트래킹

### 기술 지표
```
Month 1-2:
- NPM 다운로드: 500/주
- GitHub Stars: 300

Month 3-4:
- Extension 설치: 1,000
- NPM 다운로드: 2,000/주
- GitHub Stars: 1,000

Month 5-8:
- Marketplace 템플릿: 200
- 등록 개발자: 100
- 월 거래액: ₩5,000,000

Month 9-12:
- **HANUI Validator 사용: 10,000회/월** ⭐
- **공공기관 파트너십: 1개** ⭐
- Pro 구독자: 100 (검증 도구로)
- MRR: ₩5,000,000
- AI 플랫폼 통합: 2개 (v0.dev, Cursor 등)
```

### 커뮤니티 지표
```
Month 2: Discord 50명
Month 4: Discord 200명
Month 8: Discord 500명
Month 12: Discord 1,000명
```

---

## 🎯 다음 액션 아이템

### 지금 바로 시작하기

#### This Week:
- [ ] Turborepo 프로젝트 생성
- [ ] Button 컴포넌트 1개 완성
- [ ] Storybook 설정

#### Next Week:
- [ ] 컴포넌트 5개 완성
- [ ] create-krds-app 프로토타입
- [ ] 문서 사이트 랜딩 페이지

#### This Month:
- [ ] Phase 1 완료
- [ ] NPM 배포
- [ ] 커뮤니티 런칭

---

**다음 문서**: [경쟁 분석](../competition/ANALYSIS.md)
