# HANUI Scripts

프로젝트 자동화 스크립트 모음

## 📋 Scripts

### 1. create-issues.sh - GitHub Issues 자동 생성

Phase 1 개발을 위한 23개 이슈를 자동으로 생성합니다.

#### 사전 요구사항

```bash
# GitHub CLI 설치 (이미 설치됨)
brew install gh

# GitHub CLI 인증
gh auth login
```

#### 실행 방법

```bash
# 1. 저장소 루트로 이동
cd /Users/odada/jeongmiae/-github/hanui

# 2. 스크립트 실행
./scripts/create-issues.sh
```

#### 생성되는 이슈 목록

**Epic 1: 프로젝트 기반 설정 (3개)**
- Issue #1: Monorepo 설정
- Issue #2: TypeScript 설정
- Issue #3: Linting 설정

**Epic 2: 디자인 시스템 기초 (3개)**
- Issue #4: KRDS 컬러 토큰 시스템
- Issue #5: 타이포그래피 시스템
- Issue #6: Spacing 시스템

**Epic 3: 핵심 컴포넌트 개발 (9개)**
- Issue #7: Button 컴포넌트
- Issue #8: Input 컴포넌트
- Issue #9: Card 컴포넌트
- Issue #10: Table 컴포넌트
- Issue #11: Modal 컴포넌트
- Issue #12: Pagination 컴포넌트
- Issue #13: Breadcrumb 컴포넌트
- Issue #14: FileUpload 컴포넌트
- Issue #15: Select 컴포넌트

**Epic 4: CLI 도구 (2개)**
- Issue #16: create-hanui-app CLI 구현
- Issue #17: 템플릿 2개 개발 (Portal + Admin)

**Epic 5: 문서 사이트 (3개)**
- Issue #18: Docs 사이트 기본 구조
- Issue #19: 컴포넌트 API 문서
- Issue #20: 메인 페이지 디자인

**Epic 6: NPM 배포 (3개)**
- Issue #21: NPM 배포 준비
- Issue #22: CI/CD 설정
- Issue #23: v0.1.0 배포

**총 23개 이슈**

#### 생성되는 Labels

- `phase-1` - Phase 1 이슈
- `setup` - 프로젝트 설정
- `core` - 코어 기능
- `design-system` - 디자인 시스템
- `component` - 컴포넌트
- `react` - React 관련
- `vue` - Vue 관련
- `cli` - CLI 도구
- `templates` - 템플릿
- `docs` - 문서
- `release` - 배포
- `devops` - DevOps
- `public-essential` - 공공 필수
- `high-priority` - 높은 우선순위
- `high-complexity` - 높은 복잡도
- `critical` - 치명적

#### 생성되는 Milestone

- `v0.1.0` - Phase 1 첫 배포 (2025-02-28)

---

## 🔍 확인 사항

### 이슈 생성 전 체크리스트

- [ ] GitHub CLI 인증 완료 (`gh auth status`)
- [ ] 올바른 저장소에서 실행 (`.git` 폴더 확인)
- [ ] 네트워크 연결 확인
- [ ] 저장소 쓰기 권한 확인

### 이슈 생성 후 확인

```bash
# 생성된 이슈 목록 확인
gh issue list --limit 30

# Milestone 확인
gh api repos/:owner/:repo/milestones --jq '.[] | {title, open_issues, closed_issues}'

# Labels 확인
gh label list
```

---

## 📝 문제 해결

### "gh: command not found"

```bash
# GitHub CLI 설치
brew install gh
```

### "authentication required"

```bash
# GitHub CLI 인증
gh auth login
```

### "permission denied"

```bash
# 스크립트 실행 권한 부여
chmod +x scripts/create-issues.sh
```

### 이슈 중복 생성 방지

스크립트는 **항상 새로운 이슈를 생성**합니다.
중복 실행 시 같은 이슈가 여러 번 생성되므로 주의하세요.

중복 생성된 이슈 삭제:
```bash
# 특정 이슈 닫기
gh issue close <issue-number>

# 이슈 삭제는 GitHub 웹에서만 가능
```

---

## 🎯 다음 단계

1. **이슈 생성 확인**
   - GitHub Issues 페이지에서 23개 이슈 확인
   - Milestone, Labels 확인

2. **Project Board 설정** (선택)
   - GitHub Projects로 칸반 보드 생성
   - Epic별로 컬럼 구성
   - 이슈 할당

3. **개발 시작**
   - Issue #1 (Monorepo 설정)부터 시작
   - 각 이슈의 Acceptance Criteria 확인
   - Branch 생성 후 개발 시작

---

**작성자**: @odada-o
**작성일**: 2025-01-08
**버전**: v1.0
