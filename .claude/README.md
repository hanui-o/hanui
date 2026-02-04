# HANUI Claude Code 설정

HANUI 프로젝트를 위한 Claude Code 설정 및 가이드입니다.

## 프로젝트 핵심 정보

**HANUI**는 중소기업을 위한 **KRDS 기반 프론트엔드 컴포넌트 라이브러리**입니다.

- 전자정부프레임워크(eGovFrame) = 백엔드 표준
- **HANUI** = **프론트엔드 컴포넌트 표준**

### 핵심 가치
1. **KRDS 2.2 준수** - 한국 정부 디자인 시스템 100%
2. **접근성 내장** - KWCAG 2.2 / WCAG 2.1 AA 등급
3. **최적화** - Tree-shaking, 번들 최소화, 성능 최적화

### 기술 스택
- Monorepo: Turborepo + pnpm workspace
- React 18+ / Vue 3 + TypeScript
- Radix UI + Tailwind CSS 4.1
- Next.js 15 (문서 사이트)

## 📁 .claude 폴더 구조

```
.claude/
├── README.md                    # 👈 여기 (가이드 맵)
│
├── 📄 프로젝트 문서
│   ├── project-overview.md      # 프로젝트 전체 개요
│   ├── architecture.md          # 아키텍처 상세 설명
│   └── development-guide.md     # 개발 워크플로우 가이드
│
├── 🤖 Agents (명시적 호출)
│   ├── component-doc-generator.md  # 컴포넌트 문서 자동 생성
│   ├── a11y-auditor.md             # 접근성 감사
│   └── code-reviewer.md            # 코드 리뷰
│
├── 🎯 Skills (자동 활성화)
│   ├── project-context.md          # 프로젝트 컨텍스트 (자동)
│   ├── hanui-component-dev.md      # 컴포넌트 개발 가이드
│   ├── krds-compliance.md          # KRDS 준수 가이드
│   └── skill-rules.json            # 자동 활성화 규칙
│
└── 🪝 Hooks (이벤트 기반)
    ├── a11y-reminder.md            # 접근성 체크리스트
    └── tsc-check.sh                # TypeScript 타입 체크
```

## 📄 프로젝트 문서

상세한 프로젝트 정보는 다음 문서를 참조하세요:

### [project-overview.md](./project-overview.md)
프로젝트 정의, 포지셔닝, Monorepo 구조, 개발 환경 설정

**주요 내용:**
- HANUI = 중소기업을 위한 KRDS 프론트엔드 컴포넌트
- 7개 패키지 + 1개 앱 구조
- 55+ 컴포넌트 현황
- 개발 환경 설정 (Node 20+, pnpm 10.17.1)

### [architecture.md](./architecture.md)
설계 원칙, 컴포넌트 아키텍처, 디자인 토큰, CLI 구조

**주요 내용:**
- 복사-붙여넣기 우선 (shadcn/ui 방식)
- 접근성 우선 설계
- React/Vue 컴포넌트 구조 템플릿
- KRDS 디자인 토큰 시스템
- CLI 레지스트리 구조

### [development-guide.md](./development-guide.md)
개발 환경 설정, 새 컴포넌트 추가, 코딩 컨벤션, Git 워크플로우

**주요 내용:**
- 새 컴포넌트 개발 단계별 가이드
- 코딩 컨벤션 (파일 명명, KRDS 토큰 사용)
- 접근성 필수 요소
- Git 브랜치 전략 및 커밋 메시지 규칙
- Changesets 버전 관리

## 🤖 Agents

명시적으로 호출하여 사용하는 전문 에이전트들:

### component-doc-generator
컴포넌트 소스 코드를 분석하여 문서 페이지 자동 생성

```
컴포넌트 문서 생성: packages/react/src/components/button.tsx
```

### a11y-auditor
KWCAG 2.2 준수 여부 검사 및 개선사항 제안

```
접근성 검사: packages/react/src/components/
```

### code-reviewer
코드 품질, HANUI 컨벤션, 접근성 검토

```
코드 리뷰: packages/react/src/components/button.tsx
```

## 🎯 Skills

조건에 따라 자동 활성화되는 스킬들:

### project-context ⚡ (자동)
- **자동 활성화**: 대화 시작 시, 프로젝트 관련 질문 시
- **역할**: 핵심 프로젝트 컨텍스트 제공

### hanui-component-dev ⚡ (조건부)
- **자동 활성화**: 컴포넌트 개발 관련 작업 시
- **트리거**: "컴포넌트 만들어줘", "Button 추가", 컴포넌트 파일 수정
- **역할**: React/Vue 컴포넌트 구조, KRDS 토큰 사용법 제공

### krds-compliance ⚡ (조건부)
- **자동 활성화**: 접근성, KRDS, ARIA 관련 작업 시
- **트리거**: "접근성", "KRDS", "ARIA", "키보드 네비게이션"
- **역할**: KRDS 2.2 색상/타이포/간격, KWCAG 체크리스트

## 🪝 Hooks

특정 이벤트 발생 시 자동 실행:

### a11y-reminder
- **트리거**: 컴포넌트 파일 수정 시
- **역할**: 접근성 체크리스트 상기

### tsc-check.sh
- **트리거**: TypeScript 파일 수정 후
- **역할**: 패키지별 타입 체크 자동 실행

## 🚀 빠른 시작

### 개발 환경 설정

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev:docs

# 빌드
pnpm build
```

### 새 컴포넌트 추가

```bash
# 1. 컴포넌트 파일 생성
packages/react/src/components/tooltip.tsx

# 2. 레지스트리 등록
packages/registry/src/react/tooltip.json

# 3. 문서 페이지 생성
apps/docs/src/app/docs/components/tooltip/page.tsx

# 4. 빌드 및 테스트
pnpm --filter @hanui/react build
```

자세한 내용은 [development-guide.md](./development-guide.md) 참조

## 📝 코딩 컨벤션 요약

### 파일 명명
```
React: kebab-case.tsx (button.tsx)
Vue: PascalCase.vue (Button.vue)
```

### KRDS 토큰 사용
```tsx
✅ 'bg-krds-primary-60'
✅ 'text-krds-gray-90'
❌ 'bg-blue-600'
```

### 접근성 필수
```tsx
✅ ARIA 속성 (role, aria-label, aria-disabled)
✅ 키보드 네비게이션 (Enter, Space, Escape, Arrow)
✅ 포커스 스타일 (focus-visible:ring-2)
```

## 🔗 유용한 링크

- **문서 사이트**: https://hanui.io
- **GitHub**: https://github.com/hanui-o/hanui
- **NPM**: https://www.npmjs.com/package/@hanui/react
- **KRDS 가이드**: https://www.gov.kr/portal/krds

## 💡 팁

1. **컴포넌트 개발 시** → `hanui-component-dev` skill 자동 활성화
2. **접근성 검토 필요 시** → `a11y-auditor` agent 호출
3. **문서 생성 필요 시** → `component-doc-generator` agent 호출
4. **상세 아키텍처 필요 시** → [architecture.md](./architecture.md) 참조
5. **개발 워크플로우 확인** → [development-guide.md](./development-guide.md) 참조

---

**HANUI**: 중소기업을 위한 KRDS + 접근성 + 최적화 내장 프론트엔드 컴포넌트 라이브러리
