# HANUI Claude Code Skills

HANUI 프로젝트를 위한 Claude Code 스킬 모음입니다.

> **참고**: Skills는 조건에 따라 자동 활성화됩니다. 수동 호출이 필요한 Agents는 [../agents/](../agents/) 참조

## 사용 가능한 스킬

### 1. project-context ⚡ (최우선)

**프로젝트 핵심 컨텍스트**

HANUI의 정의, 포지셔닝, 구조, 개발 원칙을 제공합니다.

**자동 활성화 조건:**

- 대화 시작 시
- 프로젝트 관련 질문 ("프로젝트가 뭐야?", "구조가 어떻게 돼?")
- 모든 파일 작업 시 우선 참조

**핵심 내용:**

- HANUI = 중소기업용 KRDS 프론트엔드 컴포넌트 라이브러리
- 전자정부프레임워크 (백엔드) ↔ HANUI (프론트엔드)
- KRDS + 접근성 + 최적화

### 2. hanui-component-dev

**HANUI 컴포넌트 개발 가이드라인**

- React/Vue 컴포넌트 구조
- 파일 명명 규칙
- KRDS 디자인 토큰 사용법
- 접근성 필수 요소

**자동 활성화 조건:**

- 컴포넌트 파일 수정 시
- "컴포넌트 만들어줘" 등의 요청 시

### 3. krds-compliance

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
    "project-context": {
      "triggerPatterns": ["프로젝트", "project", "HANUI", "구조"],
      "autoActivate": true,
      "priority": 1
    },
    "hanui-component-dev": {
      "triggerPatterns": ["컴포넌트.*만들", "component.*create"],
      "filePatterns": ["packages/react/src/components/**"],
      "autoActivate": true,
      "priority": 2
    }
  },
  "globalRules": {
    "maxActiveSkills": 3,
    "priorityOrder": ["project-context", "hanui-component-dev", "krds-compliance"]
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
