#!/bin/bash
# Claude Code Hook: PostToolUse (Edit|Write matcher)
# 파일 수정 후 자동으로 Prettier 포맷팅을 실행하는 훅
#
# 설정 방법 (.claude/settings.json):
# {
#   "hooks": {
#     "PostToolUse": [
#       {
#         "matcher": "Edit|Write",
#         "hooks": [
#           {
#             "type": "command",
#             "command": "./.claude/hooks/post-edit-format.sh"
#           }
#         ]
#       }
#     ]
#   }
# }

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# 파일 경로가 없으면 패스
if [ -z "$FILE_PATH" ] || [ ! -f "$FILE_PATH" ]; then
  exit 0
fi

# 포맷팅 대상 확장자만 처리
case "$FILE_PATH" in
  *.ts|*.tsx|*.js|*.jsx|*.json|*.css|*.md)
    if command -v npx &> /dev/null && [ -f "node_modules/.bin/prettier" ]; then
      npx prettier --write "$FILE_PATH" 2>/dev/null
    fi
    ;;
esac

exit 0
