#!/bin/bash

# HANUI GitHub Issues 미리보기 스크립트
# 실제로 이슈를 생성하지 않고, 어떤 이슈가 생성될지 미리 확인합니다.
# 작성일: 2025-01-08

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}HANUI GitHub Issues 미리보기${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${YELLOW} 이 스크립트는 실제로 이슈를 생성하지 않습니다.${NC}"
echo -e "${YELLOW}   생성될 이슈 목록만 미리 확인합니다.${NC}"
echo ""

# 총 개수
TOTAL_ISSUES=23

echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}생성 예정 이슈: ${TOTAL_ISSUES}개${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Epic 1
echo -e "${BLUE}━━━ Epic 1: 프로젝트 기반 설정 (3개) ━━━${NC}"
echo ""
echo -e "${GREEN}Issue #1${NC}"
echo -e "  Title: [Setup] Turborepo + pnpm Monorepo 설정"
echo -e "  Labels: setup, phase-1"
echo -e "  Estimate: 4h"
echo ""

echo -e "${GREEN}Issue #2${NC}"
echo -e "  Title: [Setup] TypeScript + Tailwind CSS + 빌드 설정"
echo -e "  Labels: setup, phase-1"
echo -e "  Estimate: 5h (Tailwind 추가)"
echo ""

echo -e "${GREEN}Issue #3${NC}"
echo -e "  Title: [Setup] ESLint + Prettier + Husky 설정"
echo -e "  Labels: setup, phase-1"
echo -e "  Estimate: 2h"
echo ""

# Epic 2
echo -e "${BLUE}━━━ Epic 2: 디자인 시스템 기초 (3개) ━━━${NC}"
echo ""
echo -e "${GREEN}Issue #4${NC}"
echo -e "  Title: [Core] KRDS 컬러 토큰 시스템 구현"
echo -e "  Labels: core, design-system, phase-1"
echo -e "  Estimate: 6h"
echo ""

echo -e "${GREEN}Issue #5${NC}"
echo -e "  Title: [Core] 타이포그래피 시스템 구현"
echo -e "  Labels: core, design-system, phase-1"
echo -e "  Estimate: 4h"
echo ""

echo -e "${GREEN}Issue #6${NC}"
echo -e "  Title: [Core] Spacing 및 Layout 시스템 구현"
echo -e "  Labels: core, design-system, phase-1"
echo -e "  Estimate: 5h"
echo ""

# Epic 3
echo -e "${BLUE}━━━ Epic 3: 핵심 컴포넌트 개발 (9개) ━━━${NC}"
echo ""
echo -e "${GREEN}Issue #7${NC}"
echo -e "  Title: [Component] Button 컴포넌트 구현"
echo -e "  Labels: component, react, phase-1"
echo -e "  Estimate: 8h"
echo ""

echo -e "${GREEN}Issue #8${NC}"
echo -e "  Title: [Component] Input 컴포넌트 구현"
echo -e "  Labels: component, react, phase-1"
echo -e "  Estimate: 8h"
echo ""

echo -e "${GREEN}Issue #9${NC}"
echo -e "  Title: [Component] Card 컴포넌트 구현"
echo -e "  Labels: component, react, phase-1"
echo -e "  Estimate: 6h"
echo ""

echo -e "${GREEN}Issue #10${NC}"
echo -e "  Title: [Component] Table 컴포넌트 구현"
echo -e "  Labels: component, react, phase-1, public-essential, high-priority"
echo -e "  Estimate: 10h"
echo ""

echo -e "${GREEN}Issue #11${NC}"
echo -e "  Title: [Component] Modal 컴포넌트 구현 (Headless UI)"
echo -e "  Labels: component, react, phase-1"
echo -e "  Estimate: 8h (Headless UI 사용)"
echo ""

echo -e "${GREEN}Issue #12${NC}"
echo -e "  Title: [Component] Pagination 컴포넌트 구현"
echo -e "  Labels: component, react, phase-1, public-essential"
echo -e "  Estimate: 6h"
echo ""

echo -e "${GREEN}Issue #13${NC}"
echo -e "  Title: [Component] Breadcrumb 컴포넌트 구현"
echo -e "  Labels: component, react, phase-1, public-essential"
echo -e "  Estimate: 4h"
echo ""

echo -e "${GREEN}Issue #14${NC}"
echo -e "  Title: [Component] FileUpload 컴포넌트 구현"
echo -e "  Labels: component, react, phase-1, public-essential, high-complexity"
echo -e "  Estimate: 12h"
echo ""

echo -e "${GREEN}Issue #15${NC}"
echo -e "  Title: [Component] Select 컴포넌트 구현 (Headless UI)"
echo -e "  Labels: component, react, phase-1, high-priority"
echo -e "  Estimate: 8h (Headless UI 사용)"
echo ""

# Epic 4
echo -e "${BLUE}━━━ Epic 4: CLI 도구 (2개) ━━━${NC}"
echo ""
echo -e "${GREEN}Issue #16${NC}"
echo -e "  Title: [CLI] create-hanui-app 기본 구현"
echo -e "  Labels: cli, phase-1"
echo -e "  Estimate: 12h"
echo ""

echo -e "${GREEN}Issue #17${NC}"
echo -e "  Title: [CLI] 공공 프로젝트 특화 템플릿 2개 개발"
echo -e "  Labels: cli, templates, phase-1, critical"
echo -e "  Estimate: 27h (Portal 13h + Admin 14h)"
echo ""

# Epic 5
echo -e "${BLUE}━━━ Epic 5: 문서 사이트 (3개) ━━━${NC}"
echo ""
echo -e "${GREEN}Issue #18${NC}"
echo -e "  Title: [Docs] Next.js 문서 사이트 초기 설정"
echo -e "  Labels: docs, phase-1"
echo -e "  Estimate: 12h"
echo ""

echo -e "${GREEN}Issue #19${NC}"
echo -e "  Title: [Docs] 컴포넌트 API 자동 생성"
echo -e "  Labels: docs, phase-1"
echo -e "  Estimate: 10h"
echo ""

echo -e "${GREEN}Issue #20${NC}"
echo -e "  Title: [Docs] 메인 페이지 구현"
echo -e "  Labels: docs, design, phase-1"
echo -e "  Estimate: 8h"
echo ""

# Epic 6
echo -e "${BLUE}━━━ Epic 6: NPM 배포 (3개) ━━━${NC}"
echo ""
echo -e "${GREEN}Issue #21${NC}"
echo -e "  Title: [Release] NPM 배포 준비"
echo -e "  Labels: release, phase-1"
echo -e "  Estimate: 4h"
echo ""

echo -e "${GREEN}Issue #22${NC}"
echo -e "  Title: [Release] GitHub Actions CI/CD 설정"
echo -e "  Labels: devops, phase-1"
echo -e "  Estimate: 6h"
echo ""

echo -e "${GREEN}Issue #23${NC}"
echo -e "  Title: [Release] v0.1.0 First Release 🚀"
echo -e "  Labels: release, phase-1, critical"
echo -e "  Estimate: 4h"
echo ""

# 요약
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}요약${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}총 이슈 수: ${TOTAL_ISSUES}개${NC}"
echo ""
echo -e "Epic 1 (프로젝트 설정):    3개"
echo -e "Epic 2 (디자인 시스템):    3개"
echo -e "Epic 3 (컴포넌트):         9개"
echo -e "Epic 4 (CLI):              2개"
echo -e "Epic 5 (문서):             3개"
echo -e "Epic 6 (배포):             3개"
echo ""

# 예상 시간 계산
echo -e "${YELLOW}예상 총 개발 시간:${NC}"
echo ""
echo -e "Epic 1:  11h  (Setup) ............... +2h (Tailwind 추가)"
echo -e "Epic 2:  15h  (Design System)"
echo -e "Epic 3:  70h  (Components) .......... -4h (Headless UI)"
echo -e "Epic 4:  39h  (CLI + Templates)"
echo -e "Epic 5:  30h  (Docs)"
echo -e "Epic 6:  14h  (Release)"
echo ""
echo -e "${GREEN}총합: 179h (약 22일, 하루 8시간 기준)${NC}"
echo -e "${CYAN}기술 스택 효과: -2h 절감 (Tailwind +2h, Headless UI -4h)${NC}"
echo ""

# Milestone 정보
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}Milestone${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "Title: ${GREEN}v0.1.0${NC}"
echo -e "Description: Phase 1 첫 배포"
echo -e "Due Date: ${YELLOW}2025-02-28${NC}"
echo ""

# Labels 정보
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}Labels (16개)${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "  • phase-1          (Phase 1 이슈)"
echo -e "  • setup            (프로젝트 설정)"
echo -e "  • core             (코어 기능)"
echo -e "  • design-system    (디자인 시스템)"
echo -e "  • component        (컴포넌트)"
echo -e "  • react            (React 관련)"
echo -e "  • vue              (Vue 관련)"
echo -e "  • cli              (CLI 도구)"
echo -e "  • templates        (템플릿)"
echo -e "  • docs             (문서)"
echo -e "  • release          (배포)"
echo -e "  • devops           (DevOps)"
echo -e "  • public-essential (공공 필수)"
echo -e "  • high-priority    (높은 우선순위)"
echo -e "  • high-complexity  (높은 복잡도)"
echo -e "  • critical         (치명적)"
echo ""

# 실행 안내
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}다음 단계${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}실제로 이슈를 생성하려면:${NC}"
echo -e "${GREEN}./scripts/create-issues.sh${NC}"
echo ""
echo -e "${YELLOW}생성 전 확인 사항:${NC}"
echo -e "  1. GitHub CLI 인증 완료 (${CYAN}gh auth status${NC})"
echo -e "  2. 올바른 저장소에서 실행"
echo -e "  3. 네트워크 연결 확인"
echo ""
echo -e "${RED} 주의: 스크립트를 여러 번 실행하면 중복 이슈가 생성됩니다!${NC}"
echo ""
