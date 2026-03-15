#!/bin/bash
# Claude Code Hook: PreToolUse (Bash matcher)
# 커밋 전 lint/type-check를 자동 실행하는 훅
#
# 설정 방법 (.claude/settings.json):
# {
#   "hooks": {
#     "PreToolUse": [
#       {
#         "matcher": "Bash",
#         "hooks": [
#           {
#             "type": "command",
#             "command": "./.claude/hooks/pre-commit-lint.sh"
#           }
#         ]
#       }
#     ]
#   }
# }

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# git commit 명령어가 아니면 패스
if ! echo "$COMMAND" | grep -q "git commit"; then
  exit 0
fi

# lint 실행
if [ -f "package.json" ]; then
  if grep -q '"lint"' package.json; then
    LINT_OUTPUT=$(npm run lint 2>&1)
    if [ $? -ne 0 ]; then
      echo "lint 실패. 커밋 전에 lint 에러를 수정하세요:" >&2
      echo "$LINT_OUTPUT" >&2
      exit 2
    fi
  fi
fi

exit 0
