# Commit Command (Multi-Repo)

변경사항을 확인하고 해당 레포에서 커밋한다.

## Instructions

1. **대상 레포 판단:**
   - 사용자가 현재 IDE에서 열고 있는 파일의 경로를 확인하여 어떤 레포인지 판단
   - `hv-ui-components` 쪽 파일이 열려있으면 → hv-ui-components만 커밋
   - `hc-frontend-mono` 쪽 파일이 열려있으면 → hc-frontend-mono만 커밋
   - 판단이 어려우면 두 레포 모두 `git status --short` 확인 후 변경이 있는 레포만 커밋
   - 두 레포 모두 변경이 있고 판단이 어려우면 사용자에게 확인

2. **브랜치 확인 (커밋할 레포에서):**
   - `git -C [repo] branch --show-current` 실행
   - **main 또는 master 브랜치면 커밋 중단**
   - 사용자에게 물어본다:
     - 새 브랜치를 만들 것인지
     - 이미 있는 다른 브랜치로 전환할 것인지
   - 브랜치 전환 후 계속 진행

3. **변경사항 리뷰:**
   - `git -C [repo] diff` 실행하여 변경 내용 확인
   - `git -C [repo] log --oneline -5` 실행하여 최근 커밋 스타일 확인

4. **커밋 메시지 생성:**
   - Conventional Commits 형식: `feat:`, `fix:`, `refactor:`, `style:`, `chore:` 등
   - **한 줄로만 작성. 본문 없음. Co-Authored-By 없음.**

5. **커밋 실행:**
   - 해당 레포 디렉터리로 이동하여 `git add` (파일명 지정 선호)
   - `git commit -m "$(cat <<'EOF'
[commit message]
EOF
)"` 실행

6. **커밋 금지 파일 확인:**
   - hv-ui-components: `.yalc/`, `yalc.lock` 절대 커밋하지 않음
   - hc-frontend-mono: `.yalc/`, `yalc.lock`, `translations.xlsx`, `DynamicEnv.ts` 절대 커밋하지 않음

7. pre-commit hook 실패 시 문제를 수정하고 재시도

## Example

```
fix: improve component responsiveness
```
