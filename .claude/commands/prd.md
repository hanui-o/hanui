# PR Description Generator (Multi-Repo)

현재 브랜치의 변경사항을 분석하여 PR 설명을 생성한다.

## Instructions

1. **대상 레포 판단:**
   - 사용자가 현재 IDE에서 열고 있는 파일의 경로를 확인하여 어떤 레포인지 판단
   - `hv-ui-components` 쪽 파일이 열려있으면 → hv-ui-components만 대상
   - `hc-frontend-mono` 쪽 파일이 열려있으면 → hc-frontend-mono만 대상
   - 판단이 어려우면 두 레포의 브랜치를 확인하여 main이 아닌 브랜치가 있는 레포를 대상으로 선택
   - 두 레포 모두 작업 브랜치이고 판단이 어려우면 사용자에게 확인

2. **브랜치 변경사항 분석 (해당 레포에서):**
   - `git -C [repo] branch --show-current`로 브랜치명 확인
   - `git -C [repo] log origin/main..HEAD --oneline`으로 커밋 목록 확인
   - `git -C [repo] diff origin/main...HEAD --stat`으로 변경 파일 확인
   - `git -C [repo] diff origin/main...HEAD`로 상세 변경 확인

3. **정보 추출:**
   - 변경된 컴포넌트/파일 식별
   - 변경 유형 판단 (Core/Bugfix/New component/Enhancement/Documentation/Test)
   - 브랜치명이나 커밋에서 Jira 이슈 키 추출 (예: CPD-6583)

4. **PR 설명 생성 및 표시:**

## PR Description Template

```markdown
## 추가/수정된 구성 요소 / Name of Component Added/Modified

<!--- 변경 사항을 간단히 작성해 주세요 / Describe your changes in detail here -->

[Component name and description]

### 변경 유형 / Types of Changes

<!--- 어떠한 유형의 변경이 이루어졌나요? / What types of changes does your code introduce? -->

- [ ] 핵심 / Core
- [ ] 버그 수정 / Bugfix
- [ ] 새 구성 요소 / New component
- [ ] 개선/최적화 / Enhancement/optimization
- [ ] 문서 / Documentation
- [ ] 테스트 / Test

### Related jira issues

- [KEY-123](https://htw-cloud.atlassian.net/browse/KEY-123)
```

## Notes

- hc-frontend-mono의 경우 `docs/pr-desc/[branch-name].md`에 저장
- hv-ui-components의 경우 `docs/pr-desc/[branch-name].md`에 저장
- Jira 이슈 키는 브랜치명에서 자동 추출 (KEY-NUMBER 형식)
