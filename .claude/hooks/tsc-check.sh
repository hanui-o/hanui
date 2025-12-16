#!/bin/bash

# HANUI TypeScript 컴파일 체크 훅
# PostToolUse 훅으로 사용 - 파일 수정 후 자동 실행

# 수정된 파일 확인
MODIFIED_FILES="$1"

# TypeScript 파일인지 확인
if echo "$MODIFIED_FILES" | grep -qE '\.(ts|tsx)$'; then
  echo "🔍 TypeScript 타입 체크 중..."

  # 패키지별 체크
  if echo "$MODIFIED_FILES" | grep -q "packages/react"; then
    cd packages/react && pnpm exec tsc --noEmit 2>&1
    if [ $? -ne 0 ]; then
      echo "❌ @hanui/react 타입 오류 발견"
      exit 1
    fi
    echo "✅ @hanui/react 타입 체크 통과"
  fi

  if echo "$MODIFIED_FILES" | grep -q "packages/vue"; then
    cd packages/vue && pnpm exec vue-tsc --noEmit 2>&1
    if [ $? -ne 0 ]; then
      echo "❌ @hanui/vue 타입 오류 발견"
      exit 1
    fi
    echo "✅ @hanui/vue 타입 체크 통과"
  fi

  if echo "$MODIFIED_FILES" | grep -q "packages/cli"; then
    cd packages/cli && pnpm exec tsc --noEmit 2>&1
    if [ $? -ne 0 ]; then
      echo "❌ @hanui/cli 타입 오류 발견"
      exit 1
    fi
    echo "✅ @hanui/cli 타입 체크 통과"
  fi

  if echo "$MODIFIED_FILES" | grep -q "apps/docs"; then
    cd apps/docs && pnpm exec tsc --noEmit 2>&1
    if [ $? -ne 0 ]; then
      echo "❌ docs 타입 오류 발견"
      exit 1
    fi
    echo "✅ docs 타입 체크 통과"
  fi
fi

echo "✅ 모든 타입 체크 완료"
