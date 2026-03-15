#!/bin/bash
# Claude Code Hook: PreToolUse (Bash matcher)
# 위험한 명령어를 차단하는 훅
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
#             "command": "./.claude/hooks/block-dangerous-commands.sh"
#           }
#         ]
#       }
#     ]
#   }
# }

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# 차단할 패턴 목록
BLOCKED_PATTERNS=(
  "rm -rf /"
  "rm -rf ~"
  "rm -rf \."
  "git push.*--force.*main"
  "git push.*--force.*master"
  "git reset --hard"
  "DROP TABLE"
  "DROP DATABASE"
)

for pattern in "${BLOCKED_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qE "$pattern"; then
    echo "차단됨: 위험한 명령어가 감지되었습니다 — $pattern" >&2
    exit 2
  fi
done

exit 0
