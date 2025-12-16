# HANUI Claude Code Skills

HANUI 프로젝트를 위한 Claude Code 스킬 모음입니다.

## 사용 가능한 스킬

### 1. hanui-component-dev

**HANUI 컴포넌트 개발 가이드라인**

- React/Vue 컴포넌트 구조
- 파일 명명 규칙
- KRDS 디자인 토큰 사용법
- 접근성 필수 요소

**자동 활성화 조건:**

- 컴포넌트 파일 수정 시
- "컴포넌트 만들어줘" 등의 요청 시

### 2. krds-compliance

**KRDS 준수 가이드**

- KRDS 2.2 색상/타이포/간격 체계
- KWCAG 2.2 접근성 체크리스트
- ARIA 패턴
- 키보드 네비게이션

**자동 활성화 조건:**

- "접근성", "KRDS", "ARIA" 키워드 포함 시
- 컴포넌트 코드 작성 시

## 스킬 자동 활성화

`skill-rules.json`에서 스킬 활성화 규칙을 관리합니다:

```json
{
  "skills": {
    "hanui-component-dev": {
      "triggerPatterns": ["컴포넌트.*만들", "component.*create"],
      "filePatterns": ["packages/react/src/components/**"],
      "autoActivate": true
    }
  }
}
```

## 새 스킬 추가하기

1. `.claude/skills/` 폴더에 마크다운 파일 생성
2. `skill-rules.json`에 스킬 규칙 추가
3. 테스트 후 커밋

```bash
# 예시: CLI 개발 가이드 스킬 추가
touch .claude/skills/cli-dev-guide.md
```
