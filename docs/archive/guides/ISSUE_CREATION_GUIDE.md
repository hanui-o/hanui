# HANUI GitHub Issues 자동 생성 가이드

> **Phase 1 개발을 위한 23개 이슈를 자동으로 생성합니다**
> 작성일: 2025-01-08

---

## 🚀 빠른 시작

### 1단계: 미리보기 (실제 생성 없이 확인)

```bash
# 어떤 이슈가 생성될지 미리 확인
./scripts/preview-issues.sh
```

### 2단계: 실제 이슈 생성

```bash
# 23개 이슈를 실제로 생성
./scripts/create-issues.sh
```

**주의: 스크립트를 여러 번 실행하면 중복 이슈가 생성됩니다!**

---

## 🎯 핵심 기술 스택

### 스타일링 & 컴포넌트

- **Tailwind CSS** - KRDS 디자인 시스템 통합 ⭐
- **Headless UI** - 접근성 자동 보장 (Modal, Select 등) ⭐
- **React 18** - UI 라이브러리
- **TypeScript 5** - 타입 안정성

### 빌드 & 개발 도구

- **Turborepo** - 모노레포 관리
- **Vite** - 빠른 빌드
- **pnpm** - 패키지 관리
- **ESLint + Prettier** - 코드 품질

자세한 내용: [TECH_STACK.md](TECH_STACK.md)

---

## 📋 생성되는 이슈 목록

### Epic 1: 프로젝트 기반 설정 (3개)

- **Issue #1**: [Setup] Turborepo + pnpm Monorepo 설정 (4h)
- **Issue #2**: [Setup] TypeScript + Tailwind CSS + 빌드 설정 (5h) ⭐ 업데이트
- **Issue #3**: [Setup] ESLint + Prettier + Husky 설정 (2h)

### Epic 2: 디자인 시스템 기초 (3개)

- **Issue #4**: [Core] KRDS 컬러 토큰 시스템 구현 (6h)
- **Issue #5**: [Core] 타이포그래피 시스템 구현 (4h)
- **Issue #6**: [Core] Spacing 및 Layout 시스템 구현 (5h)

### Epic 3: 핵심 컴포넌트 개발 (9개)

- **Issue #7**: [Component] Button 컴포넌트 구현 (8h)
- **Issue #8**: [Component] Input 컴포넌트 구현 (8h)
- **Issue #9**: [Component] Card 컴포넌트 구현 (6h)
- **Issue #10**: [Component] Table 컴포넌트 구현 (10h) ⭐ 공공 필수
- **Issue #11**: [Component] Modal 컴포넌트 구현 (8h) - Headless UI ⭐ 업데이트
- **Issue #12**: [Component] Pagination 컴포넌트 구현 (6h) ⭐ 공공 필수
- **Issue #13**: [Component] Breadcrumb 컴포넌트 구현 (4h) ⭐ 공공 필수
- **Issue #14**: [Component] FileUpload 컴포넌트 구현 (12h) ⭐ 공공 필수
- **Issue #15**: [Component] Select 컴포넌트 구현 (8h) - Headless UI ⭐ 업데이트

### Epic 4: CLI 도구 (2개)

- **Issue #16**: [CLI] create-hanui-app 기본 구현 (12h)
- **Issue #17**: [CLI] 공공 프로젝트 특화 템플릿 2개 개발 (27h) 🔥 핵심 차별화
  - Portal Template (Next.js) - 13h
  - Admin Template (React + Vite) - 14h

### Epic 5: 문서 사이트 (3개)

- **Issue #18**: [Docs] Next.js 문서 사이트 초기 설정 (12h)
- **Issue #19**: [Docs] 컴포넌트 API 자동 생성 (10h)
- **Issue #20**: [Docs] 메인 페이지 구현 (8h)

### Epic 6: NPM 배포 (3개)

- **Issue #21**: [Release] NPM 배포 준비 (4h)
- **Issue #22**: [Release] GitHub Actions CI/CD 설정 (6h)
- **Issue #23**: [Release] v0.1.0 First Release 🚀 (4h)

---

## 📊 개발 시간 예상

| Epic                   | 이슈 수  | 예상 시간 | 변경              |
| ---------------------- | -------- | --------- | ----------------- |
| Epic 1 (프로젝트 설정) | 3개      | 11h       | +2h (Tailwind)    |
| Epic 2 (디자인 시스템) | 3개      | 15h       | -                 |
| Epic 3 (컴포넌트)      | 9개      | 70h       | -4h (Headless UI) |
| Epic 4 (CLI + 템플릿)  | 2개      | 39h       | -                 |
| Epic 5 (문서)          | 3개      | 30h       | -                 |
| Epic 6 (배포)          | 3개      | 14h       | -                 |
| **총합**               | **23개** | **179h**  | **-2h**           |

**→ 약 22일 (하루 8시간 기준)**
**→ 약 4.5주 (주 5일, 하루 8시간)**

### 기술 스택 효과

- **Tailwind CSS**: 설정 +2h, 하지만 컴포넌트 개발 속도 향상
- **Headless UI**: Modal, Select 개발 시간 -4h (접근성 자동 처리)
- **순 효과**: -2h 절감

---

## 🏷️ Labels (16개)

스크립트가 자동으로 생성하는 Labels:

| Label              | 색상           | 설명          |
| ------------------ | -------------- | ------------- |
| `phase-1`          | 🔵 Blue        | Phase 1 이슈  |
| `setup`            | 🟣 Purple      | 프로젝트 설정 |
| `core`             | 🟡 Yellow      | 코어 기능     |
| `design-system`    | 🟠 Orange      | 디자인 시스템 |
| `component`        | 🔵 Light Blue  | 컴포넌트      |
| `react`            | 🔵 Cyan        | React 관련    |
| `vue`              | 🟢 Green       | Vue 관련      |
| `cli`              | 🔵 Blue        | CLI 도구      |
| `templates`        | 🟡 Yellow      | 템플릿        |
| `docs`             | 🔵 Blue        | 문서          |
| `release`          | 🔴 Red         | 배포          |
| `devops`           | 🟣 Purple      | DevOps        |
| `public-essential` | 🔴 Dark Orange | 공공 필수     |
| `high-priority`    | 🔴 Red         | 높은 우선순위 |
| `high-complexity`  | 🟡 Yellow      | 높은 복잡도   |
| `critical`         | 🔴 Red         | 치명적        |

---

## 🎯 Milestone

**Milestone: v0.1.0**

- 설명: Phase 1 첫 배포
- 마감일: 2025-02-28
- 총 이슈: 23개

---

## 사전 요구사항

### 1. GitHub CLI 설치 (이미 완료 ✅)

```bash
# GitHub CLI 버전 확인
gh --version
# gh version 2.76.2 (2025-07-30)
```

### 2. GitHub CLI 인증 (이미 완료 ✅)

```bash
# 인증 상태 확인
gh auth status
# ✓ Logged in to github.com account odada-o
```

### 3. 올바른 디렉토리에서 실행

```bash
# 현재 위치 확인
pwd
# /Users/odada/jeongmiae/-github/hanui

# .git 폴더 확인
ls -la | grep .git
```

---

## 🎬 실행 방법

### Option 1: 미리보기만 (추천)

실제로 이슈를 생성하지 않고, 어떤 이슈가 생성될지 미리 확인합니다.

```bash
./scripts/preview-issues.sh
```

**출력 예시:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
생성 예정 이슈: 23개
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━ Epic 1: 프로젝트 기반 설정 (3개) ━━━

Issue #1
  Title: [Setup] Turborepo + pnpm Monorepo 설정
  Labels: setup, phase-1
  Estimate: 4h
...
```

### Option 2: 실제 생성 (신중하게!)

**주의: 한 번만 실행하세요! 중복 실행 시 같은 이슈가 여러 번 생성됩니다.**

```bash
./scripts/create-issues.sh
```

**출력 예시:**

```
========================================
HANUI GitHub Issues 자동 생성
========================================

[1/4] GitHub CLI 인증 확인 중...
✓ GitHub CLI 인증 완료

[2/4] Milestone 생성 중...
✓ Milestone 'v0.1.0' 생성 완료

[3/4] Labels 생성 중...
✓ Label 'phase-1' 생성 완료
✓ Label 'setup' 생성 완료
...

[4/4] Issues 생성 중...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Epic 1: 프로젝트 기반 설정 (3개)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Issue #1 생성: Monorepo 설정
✓ Issue #2 생성: TypeScript 설정
✓ Issue #3 생성: Linting 설정
...

========================================
모든 이슈 생성 완료!
========================================

생성된 이슈 수: 23개
Milestone: v0.1.0

다음 단계:
1. GitHub에서 이슈 확인: https://github.com/hanui-o/hanui/issues
2. Project Board 설정: https://github.com/hanui-o/hanui/projects
3. Week 1 Day 1 시작: Issue #1 (Monorepo 설정)

🚀 HANUI Phase 1 시작 준비 완료!
```

---

## 🔍 생성 후 확인

### GitHub 웹에서 확인

```bash
# 브라우저에서 이슈 페이지 열기
open https://github.com/hanui-o/hanui/issues
```

### CLI로 확인

```bash
# 생성된 이슈 목록 확인 (최근 30개)
gh issue list --limit 30

# Milestone 확인
gh api repos/:owner/:repo/milestones --jq '.[] | {title, open_issues, closed_issues}'

# Labels 확인
gh label list
```

---

## 🚨 문제 해결

### "permission denied" 에러

```bash
# 스크립트 실행 권한 부여
chmod +x scripts/create-issues.sh
chmod +x scripts/preview-issues.sh
```

### "authentication required" 에러

```bash
# GitHub CLI 재인증
gh auth login
```

### 중복 이슈 생성 시

스크립트를 여러 번 실행하면 같은 이슈가 중복 생성됩니다.

**해결 방법:**

1. **이슈 닫기** (삭제는 웹에서만 가능)

```bash
# 특정 이슈 닫기
gh issue close <issue-number>

# 여러 이슈 한번에 닫기
gh issue close 1 2 3 4 5
```

2. **웹에서 삭제**
   - GitHub 웹 → Issues → 해당 이슈 → Delete issue (하단)

---

## 📝 다음 단계

### 1. 이슈 확인

- [ ] GitHub Issues 페이지에서 23개 이슈 확인
- [ ] Milestone `v0.1.0`에 23개 이슈 할당 확인
- [ ] Labels가 올바르게 적용되었는지 확인

### 2. Project Board 설정 (선택 사항)

GitHub Projects로 칸반 보드를 만들어 이슈를 관리할 수 있습니다.

```bash
# 브라우저에서 Projects 페이지 열기
open https://github.com/hanui-o/hanui/projects
```

**추천 구조:**

- Column 1: Todo (P0 이슈만)
- Column 2: In Progress
- Column 3: In Review
- Column 4: Done

또는 Epic별로 구성:

- Column 1: Epic 1 (Setup)
- Column 2: Epic 2 (Design System)
- Column 3: Epic 3 (Components)
- ...

### 3. 개발 시작

#### Week 1 Day 1-2: 프로젝트 설정

**시작할 이슈:**

- [ ] Issue #1: Monorepo 설정 (4h)
- [ ] Issue #2: TypeScript 설정 (3h)
- [ ] Issue #3: Linting 설정 (2h)

**개발 워크플로우:**

```bash
# 1. Issue #1 브랜치 생성
git checkout -b feat/setup-monorepo

# 2. 개발 진행...
# (Acceptance Criteria 확인하며 개발)

# 3. 커밋 및 푸시
git add .
git commit -m "feat: Monorepo 초기 설정

- Turborepo 설치 및 설정
- pnpm workspace 설정
- packages 폴더 구조 생성

Closes #1"

git push origin feat/setup-monorepo

# 4. Pull Request 생성
gh pr create \
  --title "feat: Monorepo 초기 설정" \
  --body "Closes #1" \
  --base main

# 5. PR 머지 후 이슈 자동 닫힘
```

---

## 📂 스크립트 파일 위치

```
hanui/
├── scripts/
│   ├── create-issues.sh      # 실제 이슈 생성 스크립트
│   ├── preview-issues.sh     # 미리보기 스크립트
│   └── README.md             # 스크립트 설명서
└── ISSUE_CREATION_GUIDE.md   # 이 파일
```

---

## 🎯 핵심 포인트

### DO (해야 할 것)

1. **미리보기 먼저 실행**

   ```bash
   ./scripts/preview-issues.sh
   ```

2. **한 번만 실행**

   ```bash
   ./scripts/create-issues.sh  # 한 번만!
   ```

3. **생성 후 확인**
   ```bash
   gh issue list --limit 30
   ```

### DON'T (하지 말아야 할 것)

1. 스크립트를 여러 번 실행 (중복 이슈 생성됨)
2. GitHub CLI 인증 없이 실행
3. 다른 디렉토리에서 실행 (`.git` 폴더 필요)

---

## 🚀 준비 완료!

모든 계획이 완료되었습니다. 이제 개발을 시작할 준비가 되었습니다!

```bash
# 미리보기
./scripts/preview-issues.sh

# 실제 생성
./scripts/create-issues.sh

# 개발 시작
git checkout -b feat/setup-monorepo
```

**다음 문서:**

- [ISSUE_PLANNING.md](docs/planning/ISSUE_PLANNING.md) - 전체 이슈 상세 계획
- [DECISION_SUMMARY.md](docs/planning/DECISION_SUMMARY.md) - 전략적 결정 요약
- [TEMPLATE_PAGES.md](docs/planning/TEMPLATE_PAGES.md) - 템플릿 페이지 구성

---

**작성자**: @odada-o
**작성일**: 2025-01-08
**버전**: v1.0
**Status**: 준비 완료 → 🚀 이슈 생성 대기
