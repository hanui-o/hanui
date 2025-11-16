#!/usr/bin/env bash

# HANUI GitHub Issues 자동 생성 스크립트
# Phase 1 - 23개 이슈 생성
# 작성일: 2025-01-08

set -e  # 에러 발생 시 중단

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 현재 디렉토리 확인
if [ ! -d ".git" ]; then
  echo -e "${RED}Error: .git 디렉토리가 없습니다. Git 저장소 루트에서 실행해주세요.${NC}"
  exit 1
fi

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}HANUI GitHub Issues 자동 생성${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# GitHub CLI 인증 확인
echo -e "${YELLOW}[1/4] GitHub CLI 인증 확인 중...${NC}"
if ! gh auth status > /dev/null 2>&1; then
  echo -e "${RED}Error: GitHub CLI 인증이 필요합니다.${NC}"
  echo -e "${YELLOW}실행: gh auth login${NC}"
  exit 1
fi
echo -e "${GREEN}✓ GitHub CLI 인증 완료${NC}"
echo ""

# Milestone 생성
echo -e "${YELLOW}[2/4] Milestone 생성 중...${NC}"
if gh api repos/:owner/:repo/milestones --jq '.[] | select(.title=="v0.1.0")' | grep -q "v0.1.0"; then
  echo -e "${GREEN}✓ Milestone 'v0.1.0' 이미 존재${NC}"
else
  gh api repos/:owner/:repo/milestones -f title="v0.1.0" -f description="Phase 1 첫 배포" -f due_on="2025-02-28T23:59:59Z"
  echo -e "${GREEN}✓ Milestone 'v0.1.0' 생성 완료${NC}"
fi
echo ""

# Labels 생성
echo -e "${YELLOW}[3/4] Labels 생성 중...${NC}"

# Label name and color pairs
create_label() {
  local name=$1
  local color=$2
  if gh label list --json name --jq '.[] | .name' | grep -q "^${name}$"; then
    echo -e "${GREEN}✓ Label '${name}' 이미 존재${NC}"
  else
    gh label create "$name" --color "$color" --description "$name"
    echo -e "${GREEN}✓ Label '${name}' 생성 완료${NC}"
  fi
}

create_label "phase-1" "0052CC"
create_label "setup" "D4C5F9"
create_label "core" "FBCA04"
create_label "design-system" "F9D0C4"
create_label "component" "C5DEF5"
create_label "react" "61DAFB"
create_label "vue" "42B883"
create_label "cli" "BFD4F2"
create_label "templates" "FEF2C0"
create_label "docs" "0075CA"
create_label "release" "B60205"
create_label "devops" "5319E7"
create_label "public-essential" "D93F0B"
create_label "high-priority" "E99695"
create_label "high-complexity" "FBCA04"
create_label "critical" "B60205"

echo ""

# Issues 생성
echo -e "${YELLOW}[4/4] Issues 생성 중...${NC}"
echo -e "${BLUE}총 23개 이슈를 생성합니다...${NC}"
echo ""

# Epic 1: 프로젝트 기반 설정 (3개)
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}Epic 1: 프로젝트 기반 설정 (3개)${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Issue #1: Monorepo 초기 설정
gh issue create \
  --title "[Setup] Turborepo + pnpm Monorepo 설정" \
  --body "## Description
Turborepo와 pnpm을 이용한 Monorepo 초기 설정

## Tasks
- [ ] Turborepo 설치 및 설정
- [ ] pnpm workspace 설정
- [ ] \`packages/\` 폴더 구조 생성
  - [ ] \`packages/core/\`
  - [ ] \`packages/react/\`
  - [ ] \`packages/cli/\`
- [ ] 공통 설정 파일 작성
  - [ ] \`turbo.json\`
  - [ ] \`pnpm-workspace.yaml\`
- [ ] 루트 \`package.json\` scripts 정의

## Acceptance Criteria
- \`pnpm install\` 실행 시 모든 패키지 설치 성공
- \`pnpm build\` 실행 시 모든 패키지 빌드 성공
- Turborepo cache 동작 확인

## Estimate
4h

## References
- [Turborepo 공식 문서](https://turbo.build/repo/docs)
- [pnpm workspace](https://pnpm.io/workspaces)" \
  --label "setup,phase-1" \
  --milestone "v0.1.0"

echo -e "${GREEN}✓ Issue #1 생성: Monorepo 설정${NC}"

# Issue #2: TypeScript 및 빌드 설정
gh issue create \
  --title "[Setup] TypeScript + Tailwind CSS + 빌드 설정" \
  --body "## Description
TypeScript, Tailwind CSS 및 빌드 도구 설정

## Tasks

### TypeScript 설정
- [ ] \`tsconfig.base.json\` (공통)
- [ ] \`packages/*/tsconfig.json\` (개별)
- [ ] Path aliases 설정 (\`@/*\`)

### Tailwind CSS 설정 ⭐
- [ ] Tailwind CSS 설치
  - [ ] \`tailwindcss\`, \`postcss\`, \`autoprefixer\`
- [ ] \`tailwind.config.ts\` 작성
  - [ ] KRDS 컬러 팔레트 커스터마이징
  - [ ] KRDS 폰트 설정
  - [ ] KRDS 간격 시스템 (8px grid)
  - [ ] Breakpoints 설정
- [ ] PostCSS 설정
- [ ] 기본 스타일 파일 (\`globals.css\`)

### Vite 설정 (\`@hanui/react\` 빌드용)
- [ ] \`vite.config.ts\`
- [ ] Library mode 설정
- [ ] External dependencies
- [ ] CSS 번들링 설정

### tsup 설정 (CLI 빌드용)
- [ ] \`tsup.config.ts\`
- [ ] Entry points 정의

### d.ts 타입 정의
- [ ] \`declaration: true\`
- [ ] \`declarationMap: true\`

## Tailwind Config 예시
\`\`\`ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        // KRDS 컬러 팔레트
        primary: '#0066CC',
        secondary: '#00A896',
        // ...
      },
      fontFamily: {
        sans: ['Noto Sans KR', 'Malgun Gothic', 'sans-serif'],
        mono: ['Fira Code', 'D2Coding', 'monospace'],
      },
      spacing: {
        // KRDS 8px grid
        // ...
      },
    },
  },
}
\`\`\`

## Acceptance Criteria
- TypeScript 컴파일 에러 없음
- Tailwind CSS 클래스 사용 가능
- KRDS 컬러가 Tailwind에 적용됨
- \`pnpm build\` 실행 시 CSS 포함된 빌드 생성
- IDE에서 Tailwind 자동완성 동작

## Estimate
5h (Tailwind 설정 추가로 +2h)

## References
- [Vite Library Mode](https://vitejs.dev/guide/build.html#library-mode)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)
- [Tailwind with Vite](https://tailwindcss.com/docs/guides/vite)" \
  --label "setup,phase-1" \
  --milestone "v0.1.0"

echo -e "${GREEN}✓ Issue #2 생성: TypeScript 설정${NC}"

# Issue #3: Linting 및 포매팅 설정
gh issue create \
  --title "[Setup] ESLint + Prettier + Husky 설정" \
  --body "## Description
코드 품질 도구 설정

## Tasks
- [ ] ESLint 설정
  - [ ] \`eslint.config.js\` 작성
  - [ ] React plugin 추가
  - [ ] TypeScript plugin 추가
- [ ] Prettier 설정
  - [ ] \`.prettierrc\` 작성
  - [ ] ESLint와 통합
- [ ] Husky pre-commit hook
  - [ ] \`husky install\`
  - [ ] pre-commit 스크립트 작성
- [ ] lint-staged 설정
  - [ ] Staged 파일만 lint

## Acceptance Criteria
- \`pnpm lint\` 실행 시 에러 없음
- \`pnpm format\` 실행 시 코드 포매팅 적용
- Commit 시 자동으로 lint 실행

## Estimate
2h" \
  --label "setup,phase-1" \
  --milestone "v0.1.0"

echo -e "${GREEN}✓ Issue #3 생성: Linting 설정${NC}"
echo ""

# Epic 2: 디자인 시스템 기초 (3개)
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}Epic 2: 디자인 시스템 기초 (3개)${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Issue #4: KRDS 컬러 토큰 시스템
gh issue create \
  --title "[Core] KRDS 컬러 토큰 시스템 구현" \
  --body "## Description
KRDS 가이드 기반 컬러 팔레트 구현

## Tasks
- [ ] \`packages/core/src/tokens/colors.ts\` 파일 생성
- [ ] 기본 컬러 정의
  - [ ] Primary (\`#0066CC\`)
  - [ ] Secondary (\`#00A896\`)
  - [ ] Gray Scale (50-900)
- [ ] 시맨틱 컬러 정의
  - [ ] Success, Error, Warning, Info
- [ ] 접근성 대비 검증 (4.5:1)
  - [ ] 컬러 조합 테스트
- [ ] 다크모드 컬러 매핑
- [ ] CSS Variables 생성 유틸리티

## Acceptance Criteria
- 모든 컬러가 WCAG 2.1 AA 기준 통과
- TypeScript 타입 정의 완료
- CSS Variables로 변환 가능

## Estimate
6h

## References
- [KRDS 컬러 가이드](https://www.krds.go.kr/)
- [WCAG 2.1 AA](https://www.w3.org/WAI/WCAG21/quickref/)" \
  --label "core,design-system,phase-1" \
  --milestone "v0.1.0"

echo -e "${GREEN}✓ Issue #4 생성: 컬러 토큰 시스템${NC}"

# Issue #5: 타이포그래피 시스템
gh issue create \
  --title "[Core] 타이포그래피 시스템 구현" \
  --body "## Description
KRDS 기반 타이포그래피 시스템 구현

## Tasks
- [ ] 폰트 스택 정의
  - [ ] Primary: Noto Sans KR, Malgun Gothic
  - [ ] Monospace: Fira Code, D2Coding
- [ ] Type Scale 정의
  - [ ] Display, H1-H6, Body, Caption
  - [ ] 각 크기별 line-height
- [ ] Font Weight 정의
  - [ ] Regular (400), Medium (500), Bold (700)
- [ ] Letter Spacing 정의
- [ ] CSS Classes 생성
  - [ ] \`.text-display\`, \`.text-h1\`, etc.

## Acceptance Criteria
- 모든 타이포그래피가 KRDS 기준 준수
- 가독성 테스트 통과
- TypeScript 타입 정의 완료

## Estimate
4h" \
  --label "core,design-system,phase-1" \
  --milestone "v0.1.0"

echo -e "${GREEN}✓ Issue #5 생성: 타이포그래피 시스템${NC}"

# Issue #6: Spacing 및 Layout 시스템
gh issue create \
  --title "[Core] Spacing 및 Layout 시스템 구현" \
  --body "## Description
KRDS 기반 간격 및 레이아웃 시스템 구현

## Tasks
- [ ] 8px Grid 기반 Spacing Scale
  - [ ] xs (4px), sm (8px), md (16px), lg (24px), xl (32px)
- [ ] Container 유틸리티
  - [ ] Max-width: 1440px
  - [ ] Responsive padding
- [ ] Grid System (12 column)
  - [ ] Flexbox 기반
  - [ ] Grid gaps
- [ ] Breakpoints 정의
  - [ ] sm (640px), md (768px), lg (1024px), xl (1440px)
- [ ] Responsive 유틸리티 함수

## Acceptance Criteria
- KRDS 간격 기준 준수
- 반응형 테스트 통과
- TypeScript 타입 정의 완료

## Estimate
5h" \
  --label "core,design-system,phase-1" \
  --milestone "v0.1.0"

echo -e "${GREEN}✓ Issue #6 생성: Spacing 시스템${NC}"
echo ""

# Epic 3: 핵심 컴포넌트 개발 (9개)
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}Epic 3: 핵심 컴포넌트 개발 (9개)${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Issue #7: Button 컴포넌트
gh issue create \
  --title "[Component] Button 컴포넌트 구현" \
  --body "## Description
KRDS 기준 Button 컴포넌트 구현

## Features
- [ ] Variants 구현
  - [ ] primary, secondary, outline, ghost
- [ ] Sizes 구현
  - [ ] sm (32px), md (40px), lg (48px)
- [ ] States 구현
  - [ ] default, hover, active, disabled
- [ ] 접근성 구현
  - [ ] aria-label, role, disabled
  - [ ] 키보드 접근 (Enter, Space)
- [ ] 로딩 상태 (isLoading)
  - [ ] Spinner 아이콘
- [ ] 아이콘 버튼 지원
  - [ ] leftIcon, rightIcon props
- [ ] 명도 대비 4.5:1 검증

## API
\`\`\`tsx
<Button
  variant=\"primary\"
  size=\"md\"
  disabled={false}
  isLoading={false}
  leftIcon={<Icon />}
  onClick={() => {}}
>
  버튼
</Button>
\`\`\`

## Acceptance Criteria
- KRDS 버튼 규격 준수
- 접근성 테스트 통과
- 스토리북 스토리 작성
- Unit 테스트 작성

## Estimate
8h" \
  --label "component,react,phase-1" \
  --milestone "v0.1.0"

echo -e "${GREEN}✓ Issue #7 생성: Button 컴포넌트${NC}"

# Issue #8: Input 컴포넌트
gh issue create \
  --title "[Component] Input 컴포넌트 구현" \
  --body "## Description
KRDS 기준 Input 컴포넌트 구현

## Features
- [ ] 기본 Input 구현
- [ ] Variants 구현
  - [ ] filled, outline
- [ ] Sizes 구현
  - [ ] sm, md, lg
- [ ] States 구현
  - [ ] default, focus, error, disabled
- [ ] Label 지원
  - [ ] htmlFor 연결
- [ ] Helper Text / Error Message
  - [ ] aria-describedby 연결
- [ ] 접근성 구현
  - [ ] aria-invalid (에러 시)
  - [ ] aria-required (필수 입력)
- [ ] 아이콘 지원
  - [ ] leftIcon, rightIcon

## Acceptance Criteria
- KRDS Input 규격 준수
- 접근성 테스트 통과
- Form 통합 테스트
- Unit 테스트 작성

## Estimate
8h" \
  --label "component,react,phase-1" \
  --milestone "v0.1.0"

echo -e "${GREEN}✓ Issue #8 생성: Input 컴포넌트${NC}"

# Issue #9: Card 컴포넌트
gh issue create \
  --title "[Component] Card 컴포넌트 구현" \
  --body "## Description
KRDS 기준 Card 컴포넌트 구현

## Features
- [ ] 기본 Card 구현
- [ ] Compound Components
  - [ ] CardHeader
  - [ ] CardBody
  - [ ] CardFooter
- [ ] Variants 구현
  - [ ] elevated (그림자), outlined (테두리), filled (배경)
- [ ] Hover Effect
  - [ ] 마우스 오버 시 elevation 증가
- [ ] 접근성 구현
  - [ ] Semantic 마크업 (article, section)

## Acceptance Criteria
- KRDS 카드 규격 준수
- 반응형 테스트 통과
- 스토리북 스토리 작성
- Unit 테스트 작성

## Estimate
6h" \
  --label "component,react,phase-1" \
  --milestone "v0.1.0"

echo -e "${GREEN}✓ Issue #9 생성: Card 컴포넌트${NC}"

# Issue #10: Table 컴포넌트
gh issue create \
  --title "[Component] Table 컴포넌트 구현" \
  --body "## Description
공공 프로젝트 필수 Table 컴포넌트 구현

## Features
- [ ] 기본 Table 구현
  - [ ] Thead, Tbody, Tr, Th, Td
- [ ] Striped Rows
  - [ ] 접근성 대비 고려
- [ ] Sortable Headers
  - [ ] 클릭 시 정렬
  - [ ] 정렬 방향 표시 (아이콘)
- [ ] 접근성 구현
  - [ ] scope 속성 (col, row)
  - [ ] headers 속성
  - [ ] caption 지원
- [ ] 반응형 구현
  - [ ] 모바일: 스택 레이아웃
  - [ ] 가로 스크롤

## Acceptance Criteria
- KRDS Table 규격 준수
- 접근성 테스트 통과 (스크린 리더)
- 모바일 반응형 동작
- Unit 테스트 작성

## Estimate
10h" \
  --label "component,react,phase-1,public-essential,high-priority" \
  --milestone "v0.1.0"

echo -e "${GREEN}✓ Issue #10 생성: Table 컴포넌트${NC}"

# Issue #11: Modal 컴포넌트
gh issue create \
  --title "[Component] Modal 컴포넌트 구현 (Headless UI)" \
  --body "## Description
KRDS 기준 Modal (Dialog) 컴포넌트 구현

**기술 스택:** Headless UI Dialog + Tailwind CSS

## Features
- [ ] 기본 Modal 구현
  - [ ] Headless UI \`<Dialog>\` 사용
- [ ] Overlay (Backdrop)
  - [ ] \`<Dialog.Overlay>\`
  - [ ] 클릭 시 닫기 (옵션)
- [ ] Sizes 구현
  - [ ] sm, md, lg, xl, full
  - [ ] Tailwind 클래스로 크기 조절
- [ ] Close 버튼
  - [ ] 우측 상단 X 버튼
- [ ] 접근성 구현 (Headless UI 자동 처리)
  - [ ] Focus Trap (자동)
  - [ ] ESC 키로 닫기 (자동)
  - [ ] aria-modal, role=\"dialog\" (자동)
  - [ ] aria-labelledby, aria-describedby
- [ ] 애니메이션
  - [ ] Headless UI Transition 사용
  - [ ] Fade In/Out
  - [ ] Slide Down (옵션)

## API 예시
\`\`\`tsx
import { Modal } from '@hanui/react'

<Modal open={isOpen} onClose={setIsOpen} size=\"md\">
  <Modal.Title>제목</Modal.Title>
  <Modal.Body>
    내용
  </Modal.Body>
  <Modal.Footer>
    <Button onClick={handleConfirm}>확인</Button>
    <Button variant=\"secondary\" onClick={setIsOpen(false)}>취소</Button>
  </Modal.Footer>
</Modal>
\`\`\`

## Acceptance Criteria
- Headless UI Dialog 기반 구현
- 접근성 테스트 통과 (키보드, 스크린 리더)
- Focus Trap 자동 동작
- ESC 키 닫기 동작
- Tailwind로 KRDS 스타일 적용
- Unit 테스트 작성

## Estimate
8h (Headless UI 사용으로 -2h)

## References
- [Headless UI Dialog](https://headlessui.com/react/dialog)" \
  --label "component,react,phase-1" \
  --milestone "v0.1.0"

echo -e "${GREEN}✓ Issue #11 생성: Modal 컴포넌트${NC}"

# Issue #12: Pagination 컴포넌트
gh issue create \
  --title "[Component] Pagination 컴포넌트 구현" \
  --body "## Description
공공 게시판 필수 Pagination 컴포넌트 구현

## Features
- [ ] 기본 Pagination 구현
  - [ ] 페이지 번호 표시 (1 2 3 ... 10)
  - [ ] 말줄임 (...) 처리
- [ ] 이전/다음 버튼
- [ ] 첫 페이지/마지막 페이지 이동 버튼
- [ ] 현재 페이지 강조
  - [ ] aria-current=\"page\"
- [ ] Compact 모드
  - [ ] 모바일용 간소화 UI
- [ ] 페이지 크기 선택
  - [ ] 10, 20, 50, 100 옵션
- [ ] 접근성 구현
  - [ ] aria-label=\"pagination\"
  - [ ] role=\"navigation\"

## API
\`\`\`tsx
<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={(page) => {}}
  pageSize={10}
  onPageSizeChange={(size) => {}}
/>
\`\`\`

## Acceptance Criteria
- 접근성 테스트 통과
- 키보드 네비게이션 동작
- 모바일 반응형 동작
- Unit 테스트 작성

## Estimate
6h" \
  --label "component,react,phase-1,public-essential" \
  --milestone "v0.1.0"

echo -e "${GREEN}✓ Issue #12 생성: Pagination 컴포넌트${NC}"

# Issue #13: Breadcrumb 컴포넌트
gh issue create \
  --title "[Component] Breadcrumb 컴포넌트 구현" \
  --body "## Description
공공 포털 필수 Breadcrumb 네비게이션 컴포넌트 구현

## Features
- [ ] 기본 Breadcrumb 구현
  - [ ] 홈 > 카테고리 > 현재 페이지
- [ ] 링크 지원
  - [ ] BreadcrumbItem에 href prop
- [ ] 현재 페이지 강조
  - [ ] aria-current=\"page\"
  - [ ] 링크 비활성화
- [ ] Separator 커스터마이징
  - [ ] 기본: \`/\` 또는 \`>\`
  - [ ] 커스텀 아이콘 가능
- [ ] 접근성 구현
  - [ ] <nav> 태그 사용
  - [ ] aria-label=\"breadcrumb\"
- [ ] 모바일 반응형
  - [ ] 긴 경로 생략 (...)

## API
\`\`\`tsx
<Breadcrumb>
  <BreadcrumbItem href=\"/\">홈</BreadcrumbItem>
  <BreadcrumbItem href=\"/notice\">공지사항</BreadcrumbItem>
  <BreadcrumbItem current>상세보기</BreadcrumbItem>
</Breadcrumb>
\`\`\`

## Acceptance Criteria
- 접근성 테스트 통과
- 스크린 리더 읽기 테스트
- 모바일 반응형 동작
- Unit 테스트 작성

## Estimate
4h" \
  --label "component,react,phase-1,public-essential" \
  --milestone "v0.1.0"

echo -e "${GREEN}✓ Issue #13 생성: Breadcrumb 컴포넌트${NC}"

# Issue #14: FileUpload 컴포넌트
gh issue create \
  --title "[Component] FileUpload 컴포넌트 구현" \
  --body "## Description
공공 프로젝트 파일 업로드 컴포넌트 구현 (민원, 자료실 필수)

## Features
- [ ] 드래그 앤 드롭 구현
  - [ ] 파일 드래그 시 영역 강조
- [ ] 파일 선택 (단일/복수)
  - [ ] multiple prop
- [ ] 파일 크기 제한 검증
  - [ ] maxSize prop (bytes)
- [ ] 확장자 제한 검증
  - [ ] accept prop (.pdf, .hwp, .jpg 등)
- [ ] 업로드 진행률 표시
  - [ ] Progress bar
- [ ] 파일 목록 표시
  - [ ] 이미지 썸네일
  - [ ] 파일명, 크기 표시
- [ ] 파일 삭제 기능
  - [ ] 개별 삭제 버튼
- [ ] 접근성 구현
  - [ ] 키보드로 파일 선택
  - [ ] aria-label
- [ ] 에러 메시지 표시
  - [ ] 크기 초과, 확장자 불일치 등

## API
\`\`\`tsx
<FileUpload
  accept=\".pdf,.hwp,.jpg,.png\"
  maxSize={10 * 1024 * 1024} // 10MB
  maxFiles={5}
  onUpload={(files) => {}}
  onError={(error) => {}}
/>
\`\`\`

## Acceptance Criteria
- 드래그 앤 드롭 동작
- 파일 검증 통과
- 접근성 테스트 통과
- Unit 테스트 작성

## Estimate
12h" \
  --label "component,react,phase-1,public-essential,high-complexity" \
  --milestone "v0.1.0"

echo -e "${GREEN}✓ Issue #14 생성: FileUpload 컴포넌트${NC}"

# Issue #15: Select 컴포넌트
gh issue create \
  --title "[Component] Select 컴포넌트 구현 (Headless UI)" \
  --body "## Description
폼에 필수적인 Select 컴포넌트 구현 (공공 프로젝트 빈번히 사용)

**기술 스택:** Headless UI Listbox/Combobox + Tailwind CSS

## Features

### 기본 Select (Listbox 사용)
- [ ] Headless UI \`<Listbox>\` 사용
- [ ] 옵션 목록 표시
- [ ] 선택 상태 관리

### 검색 가능 Select (Combobox 사용)
- [ ] Headless UI \`<Combobox>\` 사용
- [ ] searchable prop
- [ ] 필터링 기능
- [ ] 검색어 하이라이팅

### 다중 선택
- [ ] Listbox multiple 모드
- [ ] 선택된 항목 태그 표시
- [ ] 태그 삭제 기능

### 그룹화
- [ ] optgroup 지원
- [ ] 시각적 구분

### 접근성 구현 (Headless UI 자동 처리)
- [ ] aria-expanded (자동)
- [ ] role=\"combobox\" (자동)
- [ ] aria-activedescendant (자동)

### 키보드 네비게이션 (Headless UI 자동)
- [ ] 위/아래 화살표로 이동 (자동)
- [ ] Enter로 선택 (자동)
- [ ] ESC로 닫기 (자동)

### 커스텀 렌더링
- [ ] renderOption prop
- [ ] 아이콘, 이미지 지원

## API 예시
\`\`\`tsx
import { Select } from '@hanui/react'

// 기본 Select
<Select
  options={[
    { value: '1', label: '서울' },
    { value: '2', label: '부산' }
  ]}
  value=\"1\"
  onChange={(value) => {}}
/>

// 검색 가능 Select
<Select
  options={cities}
  value={selected}
  onChange={setSelected}
  searchable
  placeholder=\"도시 검색...\"
/>

// 다중 선택
<Select
  options={cities}
  value={selectedCities}
  onChange={setSelectedCities}
  multiple
/>
\`\`\`

## Acceptance Criteria
- Headless UI Listbox/Combobox 기반 구현
- 접근성 테스트 통과
- 키보드 네비게이션 자동 동작
- 검색 기능 동작
- Tailwind로 KRDS 스타일 적용
- Unit 테스트 작성

## Estimate
8h (Headless UI 사용으로 -2h)

## References
- [Headless UI Listbox](https://headlessui.com/react/listbox)
- [Headless UI Combobox](https://headlessui.com/react/combobox)" \
  --label "component,react,phase-1,high-priority" \
  --milestone "v0.1.0"

echo -e "${GREEN}✓ Issue #15 생성: Select 컴포넌트${NC}"
echo ""

# Epic 4: CLI 도구 (2개)
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}Epic 4: CLI 도구 (2개)${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Issue #16: create-hanui-app CLI 구현
gh issue create \
  --title "[CLI] create-hanui-app 기본 구현" \
  --body "## Description
\`npx create-hanui-app\` 명령어 구현

## Features
- [ ] CLI 프레임워크 설정
  - [ ] Commander.js 설치
  - [ ] 명령어 구조 정의
- [ ] 인터랙티브 프롬프트
  - [ ] Inquirer.js 설치
  - [ ] 프로젝트 이름 입력
  - [ ] 프레임워크 선택 (React / Vue)
  - [ ] 템플릿 선택 (Portal / Admin / Both)
- [ ] 프로젝트 생성 로직
  - [ ] 템플릿 복사
  - [ ] package.json 수정 (프로젝트명)
  - [ ] 파일 치환 (변수)
- [ ] Dependencies 자동 설치
  - [ ] \`pnpm install\` 실행
  - [ ] 진행률 표시
- [ ] Git 초기화
  - [ ] \`git init\`
  - [ ] 초기 커밋 (옵션)
- [ ] 완료 메시지 및 Next Steps
  - [ ] \`cd <project-name>\`
  - [ ] \`pnpm dev\`

## Acceptance Criteria
- \`npx create-hanui-app\` 실행 시 프롬프트 표시
- 프로젝트 생성 성공
- \`pnpm dev\` 실행 시 개발 서버 시작
- Unit 테스트 작성

## Estimate
12h

## References
- [Commander.js](https://github.com/tj/commander.js)
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js)" \
  --label "cli,phase-1" \
  --milestone "v0.1.0"

echo -e "${GREEN}✓ Issue #16 생성: CLI 구현${NC}"

# Issue #17: 템플릿 2개 개발 (Portal + Admin)
gh issue create \
  --title "[CLI] 공공 프로젝트 특화 템플릿 2개 개발" \
  --body "## Description
공공 웹사이트의 필수 구성: Portal + Admin 템플릿 개발

상세 페이지 구성: [TEMPLATE_PAGES.md](../docs/planning/TEMPLATE_PAGES.md) 참고

---

## 1. Portal Template (Next.js 14 App Router)

### 기술 스택
- Next.js 14 (App Router)
- SSR/SSG 지원
- SEO 최적화
- 접근성 강화 (대국민 서비스 특성)

### P0 페이지 (필수 - 6개)
- [ ] 공통 레이아웃 (Header, Footer)
- [ ] 메인 페이지 (\`/\`)
- [ ] 공지사항 목록 (\`/notice\`)
- [ ] 공지사항 상세 (\`/notice/[id]\`)
- [ ] 민원 신청 (\`/civil-complaint\`)
- [ ] 로그인 (\`/login\`)

### 주요 기능
- [ ] Header (GNB, 검색, 로그인, 반응형 햄버거)
- [ ] Footer (사이트맵, 저작권, 접근성 마크)
- [ ] Breadcrumb (모든 페이지)
- [ ] 프린트 최적화 CSS
- [ ] 반응형 디자인 (모바일 우선)

### 접근성
- [ ] 건너뛰기 링크
- [ ] 웹 접근성 인증 마크 위치
- [ ] WCAG 2.1 AA 준수

---

## 2. Admin Template (React + Vite)

### 기술 스택
- React 18
- Vite (빠른 개발 환경)
- React Router
- SPA (서버 부담 적음)

### P0 페이지 (필수 - 6개)
- [ ] 공통 레이아웃 (Sidebar, TopBar)
- [ ] 로그인 (\`/admin/login\`)
- [ ] 대시보드 (\`/admin/dashboard\`) - 차트 포함
- [ ] 공지사항 목록 (\`/admin/notice\`)
- [ ] 공지사항 등록/수정 (\`/admin/notice/new\`, \`/edit\`)
- [ ] 사용자 관리 (\`/admin/users\`)

### 주요 기능
- [ ] Sidebar 네비게이션 (2-depth, 반응형)
- [ ] TopBar (페이지 제목, 알림, 사용자 드롭다운)
- [ ] Data Table (정렬, 필터, 페이징, 일괄 선택)
- [ ] CRUD Form (검증 포함)
- [ ] Modal (확인/삭제 다이얼로그)
- [ ] Toast 알림
- [ ] 차트 (Chart.js or Recharts)

### 접근성
- [ ] 키보드 네비게이션
- [ ] 스크린 리더 대응
- [ ] ARIA 속성

---

## 템플릿 선택 시나리오
\`\`\`bash
npx create-hanui-app my-project

? 프로젝트 유형을 선택하세요:
  ❯ Portal (Next.js) - 대국민 포털 사이트
    Admin (React + Vite) - 관리자 페이지
    Both - 포털 + 어드민 (Monorepo)
\`\`\`

## Both 선택 시 구조
\`\`\`
my-project/
├── apps/
│   ├── portal/        # Next.js (포트 3000)
│   └── admin/         # React + Vite (포트 3001)
├── packages/
│   └── shared/        # 공통 컴포넌트
└── package.json       # Turborepo 설정
\`\`\`

---

## Mock Data 제공
- [ ] \`/mock/notices.json\` (공지사항 샘플)
- [ ] \`/mock/users.json\` (사용자 샘플)
- [ ] \`/mock/files.json\` (파일 샘플)

## README 포함
- [ ] 페이지 구조 설명
- [ ] API 연동 방법
- [ ] 커스터마이징 가이드
- [ ] 배포 가이드

## Acceptance Criteria
- \`npx create-hanui-app\` 실행 시 Portal/Admin/Both 선택 가능
- 선택한 템플릿이 30초 내 생성됨
- 생성된 프로젝트가 즉시 실행 가능 (\`pnpm dev\`)
- 모든 P0 페이지가 동작함
- 9개 컴포넌트가 모두 사용됨
- Mock Data로 실제 동작하는 것처럼 보임
- README가 명확함

## Estimate
27h (P0: Portal 13h + Admin 14h)

## Dependencies
#16 (CLI 구현 필요)" \
  --label "cli,templates,phase-1,critical" \
  --milestone "v0.1.0"

echo -e "${GREEN}✓ Issue #17 생성: 템플릿 2개 개발${NC}"
echo ""

# Epic 5: 문서 사이트 (3개)
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}Epic 5: 문서 사이트 (3개)${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Issue #18: Docs 사이트 기본 구조
gh issue create \
  --title "[Docs] Next.js 문서 사이트 초기 설정" \
  --body "## Description
KRDS + Vercel 디자인 레퍼런스 기반 문서 사이트 초기 설정

## Tasks
- [ ] Next.js 14 (App Router) 설정
  - [ ] \`apps/docs/\` 폴더 생성
  - [ ] package.json 설정
- [ ] Tailwind CSS 설정
  - [ ] KRDS 컬러 팔레트 적용
  - [ ] 커스텀 타이포그래피
- [ ] MDX 설정
  - [ ] Contentlayer 또는 next-mdx-remote
  - [ ] 마크다운 파일 렌더링
- [ ] 기본 레이아웃 구현
  - [ ] Header (로고, 네비게이션, 검색, 다크모드)
  - [ ] Sidebar (TOC)
  - [ ] Content (본문)
  - [ ] Footer
- [ ] 다크모드 토글
  - [ ] next-themes 사용
  - [ ] KRDS 다크모드 컬러 적용

## Acceptance Criteria
- \`pnpm dev\` 실행 시 문서 사이트 로드
- MDX 파일 렌더링 확인
- 다크모드 토글 동작
- 반응형 레이아웃 동작

## Estimate
12h

## References
- [Next.js 문서](https://nextjs.org/docs)
- [Contentlayer](https://www.contentlayer.dev/)" \
  --label "docs,phase-1" \
  --milestone "v0.1.0"

echo -e "${GREEN}✓ Issue #18 생성: Docs 사이트 기본 구조${NC}"

# Issue #19: 컴포넌트 API 문서
gh issue create \
  --title "[Docs] 컴포넌트 API 자동 생성" \
  --body "## Description
컴포넌트 API 문서 자동 생성 시스템 구축

## Tasks
- [ ] JSDoc → Markdown 변환 도구
  - [ ] react-docgen 또는 typescript-json-schema
  - [ ] Props 추출
- [ ] Props Table 생성
  - [ ] 이름, 타입, 기본값, 설명
  - [ ] Required 표시
- [ ] 예제 코드 하이라이팅
  - [ ] Prism.js 또는 Shiki
  - [ ] 언어별 하이라이팅
- [ ] Live Preview (Sandpack)
  - [ ] 실시간 코드 편집기
  - [ ] 미리보기 창

## Acceptance Criteria
- 컴포넌트 JSDoc에서 자동으로 Props Table 생성
- 코드 하이라이팅 동작
- Live Preview 동작
- 모바일 반응형 동작

## Estimate
10h" \
  --label "docs,phase-1" \
  --milestone "v0.1.0"

echo -e "${GREEN}✓ Issue #19 생성: 컴포넌트 API 문서${NC}"

# Issue #20: 메인 페이지 디자인
gh issue create \
  --title "[Docs] 메인 페이지 구현" \
  --body "## Description
KRDS + Vercel 스타일 Hero Section 메인 페이지 구현

## Tasks
- [ ] Hero Section 구현
  - [ ] 대형 헤딩 (\`공공 웹사이트, 30초 만에 시작\`)
  - [ ] 서브헤딩
  - [ ] CTA 버튼 (Get Started, GitHub)
  - [ ] 코드 프리뷰 (애니메이션)
- [ ] Features Section
  - [ ] 4가지 차별화 포인트
    1. Portal + Admin 템플릿
    2. KRDS 100% 준수
    3. 접근성 AA 등급
    4. 즉시 사용 가능
  - [ ] 3-Column Grid
  - [ ] 아이콘 + 제목 + 설명
- [ ] Code Preview 섹션
  - [ ] Live Demo
  - [ ] npx create-hanui-app 예제
- [ ] Footer
  - [ ] GitHub 링크
  - [ ] Discord 링크
  - [ ] 저작권 정보

## Acceptance Criteria
- KRDS 디자인 규격 준수
- Vercel 스타일 미학 적용
- 반응형 디자인 (모바일, 태블릿, 데스크탑)
- Lighthouse 성능 90+ 점수

## Estimate
8h

## References
- [DESIGN_REFERENCE.md](../docs/design/DESIGN_REFERENCE.md)" \
  --label "docs,phase-1" \
  --milestone "v0.1.0"

echo -e "${GREEN}✓ Issue #20 생성: 메인 페이지 디자인${NC}"
echo ""

# Epic 6: NPM 배포 (3개)
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}Epic 6: NPM 배포 (3개)${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Issue #21: NPM 배포 준비
gh issue create \
  --title "[Release] NPM 배포 준비" \
  --body "## Description
NPM 배포를 위한 메타데이터 및 문서 작성

## Tasks
- [ ] package.json 메타데이터 작성
  - [ ] name: \`@hanui/react\`
  - [ ] description
  - [ ] keywords
  - [ ] repository, homepage
  - [ ] author, license (MIT)
- [ ] README.md 작성
  - [ ] 프로젝트 소개
  - [ ] Quick Start
  - [ ] 설치 방법
  - [ ] 기본 사용법
  - [ ] 라이선스
- [ ] LICENSE 파일 (MIT)
- [ ] CHANGELOG.md 작성
  - [ ] v0.1.0 첫 릴리스
- [ ] .npmignore 설정
  - [ ] 불필요한 파일 제외
- [ ] NPM organization 생성
  - [ ] \`@hanui\` 네임스페이스 등록

## Acceptance Criteria
- package.json 메타데이터 완료
- README가 명확하고 읽기 쉬움
- LICENSE 파일 존재
- NPM organization 등록 완료

## Estimate
4h" \
  --label "release,phase-1" \
  --milestone "v0.1.0"

echo -e "${GREEN}✓ Issue #21 생성: NPM 배포 준비${NC}"

# Issue #22: CI/CD 설정
gh issue create \
  --title "[Release] GitHub Actions CI/CD 설정" \
  --body "## Description
GitHub Actions를 이용한 CI/CD 파이프라인 구축

## Tasks
- [ ] Test 워크플로우
  - [ ] \`.github/workflows/test.yml\`
  - [ ] PR 시 자동 테스트 실행
  - [ ] Unit 테스트 + Lint
- [ ] Build 워크플로우
  - [ ] \`.github/workflows/build.yml\`
  - [ ] PR 시 자동 빌드 확인
- [ ] NPM 배포 워크플로우
  - [ ] \`.github/workflows/release.yml\`
  - [ ] Tag 푸시 시 자동 배포
  - [ ] NPM_TOKEN secret 설정
- [ ] Vercel 배포 (Docs)
  - [ ] Vercel 프로젝트 연결
  - [ ] main 브랜치 푸시 시 자동 배포

## Acceptance Criteria
- PR 시 자동 테스트 실행
- Tag 푸시 시 NPM 자동 배포
- Docs 사이트 Vercel 자동 배포
- 모든 워크플로우 통과

## Estimate
6h

## References
- [GitHub Actions](https://docs.github.com/en/actions)
- [Vercel GitHub Integration](https://vercel.com/docs/deployments/git)" \
  --label "devops,phase-1" \
  --milestone "v0.1.0"

echo -e "${GREEN}✓ Issue #22 생성: CI/CD 설정${NC}"

# Issue #23: v0.1.0 배포
gh issue create \
  --title "[Release] v0.1.0 First Release 🚀" \
  --body "## Description
첫 번째 공식 배포 v0.1.0

## Checklist
- [ ] 모든 P0 이슈 완료 확인
- [ ] 모든 컴포넌트 테스트 통과
- [ ] Docs 사이트 배포 완료
- [ ] NPM 배포 테스트
  - [ ] \`npm pack\` 확인
  - [ ] 로컬 테스트 설치
- [ ] NPM 배포 실행
  - [ ] \`@hanui/react\` 배포
  - [ ] \`create-hanui-app\` 배포
- [ ] GitHub Release 생성
  - [ ] Tag: \`v0.1.0\`
  - [ ] Release Notes 작성
  - [ ] CHANGELOG 첨부
- [ ] 커뮤니티 준비
  - [ ] GitHub Discussions 활성화
  - [ ] Discord 서버 개설
  - [ ] Twitter 공지
- [ ] Product Hunt 준비 (선택)
  - [ ] 제품 등록
  - [ ] 스크린샷 준비
  - [ ] 런칭 일정 확정

## Post-Release
- [ ] NPM 다운로드 모니터링
- [ ] GitHub Stars 확인
- [ ] 이슈/피드백 대응
- [ ] Phase 1.5 계획

## Acceptance Criteria
- NPM에서 \`@hanui/react\` 설치 가능
- \`npx create-hanui-app\` 실행 가능
- Docs 사이트 접속 가능
- GitHub Release 생성 완료

## Estimate
4h" \
  --label "release,phase-1,critical" \
  --milestone "v0.1.0"

echo -e "${GREEN}✓ Issue #23 생성: v0.1.0 배포${NC}"
echo ""

# 완료 메시지
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}모든 이슈 생성 완료!${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${YELLOW}생성된 이슈 수: 23개${NC}"
echo -e "${YELLOW}Milestone: v0.1.0${NC}"
echo ""
echo -e "${BLUE}다음 단계:${NC}"
echo -e "1. GitHub에서 이슈 확인: ${GREEN}https://github.com/$(gh repo view --json nameWithOwner -q .nameWithOwner)/issues${NC}"
echo -e "2. Project Board 설정: ${GREEN}https://github.com/$(gh repo view --json nameWithOwner -q .nameWithOwner)/projects${NC}"
echo -e "3. Week 1 Day 1 시작: ${GREEN}Issue #1 (Monorepo 설정)${NC}"
echo ""
echo -e "${GREEN}🚀 HANUI Phase 1 시작 준비 완료!${NC}"
