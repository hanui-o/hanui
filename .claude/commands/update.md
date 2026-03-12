# Update Command (Multi-Repo)

변경사항을 커밋하고 main 브랜치와 동기화한다.

## Instructions

1. **대상 레포 판단:**
   - 두 레포의 `git status`를 확인하여 변경이 있는 레포 식별
   - 변경이 있는 레포에서만 실행

2. **브랜치 확인:**
   - `git -C [repo] branch --show-current` 실행
   - **main 또는 master 브랜치면 중단** — 사용자에게 브랜치 전환 요청

3. **커밋 (해당 레포에서):**
   - `git status`로 변경사항 확인
   - `git diff`로 변경 내용 리뷰
   - Conventional Commits 형식으로 커밋 메시지 생성
   - **한 줄로만 작성. 본문 없음. Co-Authored-By 없음.**
   - 커밋 금지 파일 확인 후 `git add` & `git commit`

4. **main과 동기화 (해당 레포에서):**
   - `git fetch origin main`
   - `git rebase origin/main`
   - 충돌 발생 시 사용자에게 알리고 대기
   - 성공 시 완료 확인

## Notes

- 두 레포 모두 변경이 있으면 각각 따로 실행
- pre-commit hook이 실패하면 문제를 수정하고 재시도
- rebase 중 충돌은 사용자의 판단이 필요하므로 자동으로 해결하지 않음
