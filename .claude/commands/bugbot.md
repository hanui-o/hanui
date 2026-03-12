# Bugbot PR Review Handler

PR에 달린 Cursor Bugbot 리뷰 댓글을 확인하고 코드를 수정한다.

## Arguments

- `$ARGUMENTS`: PR 번호 (예: `#6724` 또는 `6724`). 없으면 현재 브랜치의 PR을 자동 탐색

## Instructions

1. **PR 확인:**
   - 인자가 있으면 해당 PR 번호 사용
   - 없으면 `gh pr view --json number` 으로 현재 브랜치의 PR 탐색
   - PR이 hc-frontend-mono에 있는지 확인 (`gh -R` 또는 디렉터리 이동)

2. **Bugbot 댓글 수집:**
   - `gh api repos/{owner}/{repo}/pulls/{pr_number}/reviews` 로 리뷰 확인
   - `gh api repos/{owner}/{repo}/pulls/{pr_number}/comments` 로 인라인 코멘트 확인
   - `cursor-bot` 또는 `cursorbot` 사용자의 댓글만 필터링
   - 이미 resolved 된 댓글은 제외

3. **댓글 분석:**
   - 각 Bugbot 댓글의 내용을 분석
   - 실제 코드 수정이 필요한 것과 단순 참고사항을 구분
   - 수정이 필요한 항목을 TODO 리스트로 정리하여 사용자에게 보여줌

4. **사용자 확인:**
   - 수정할 항목 목록을 보여주고 진행 여부를 확인
   - 사용자가 일부만 선택할 수도 있음

5. **코드 수정:**
   - 각 항목에 대해 해당 파일을 읽고 수정
   - Bugbot이 제안한 내용을 반영하되, 기존 코드 패턴/스타일 유지

6. **커밋 & 푸시:**
   - 수정 완료 후 `/commit` 스킬과 동일한 방식으로 커밋
   - 사용자에게 푸시 여부 확인 후 푸시

## Notes

- Bugbot 댓글 중 false positive(오탐)가 있을 수 있으므로 반드시 사용자 확인 후 수정
- 수정 불필요한 댓글은 이유를 설명하고 스킵
- hc-frontend-mono 레포 기준으로 동작
