# HANUI Claude Code Agents

HANUI 프로젝트를 위한 전문화된 에이전트 모음입니다.

## 사용 가능한 에이전트

### 1. component-doc-generator

**컴포넌트 문서 자동 생성**

컴포넌트 소스 코드를 분석하여 문서 페이지를 생성합니다.

```
컴포넌트 문서 생성: packages/react/src/components/button.tsx
```

**생성 항목:**

- Props 테이블
- 사용 예제
- Variants 예제
- 접근성 정보

### 2. a11y-auditor

**접근성 감사**

컴포넌트의 KWCAG 2.2 준수 여부를 검사합니다.

```
접근성 검사: packages/react/src/components/
```

**검사 항목:**

- ARIA 속성 사용
- 키보드 접근성
- 포커스 관리
- 시맨틱 마크업

### 3. code-reviewer

**코드 리뷰**

코드 품질과 HANUI 컨벤션 준수를 검토합니다.

```
코드 리뷰: packages/react/src/components/button.tsx
```

**검토 항목:**

- 코딩 컨벤션
- TypeScript 베스트 프랙티스
- 성능 이슈
- 보안 취약점

## 에이전트 사용 팁

1. **구체적인 경로 지정**: 전체 디렉토리보다 특정 파일 지정이 효율적
2. **조합 사용**: 코드 작성 후 `code-reviewer` → `a11y-auditor` 순서로 실행
3. **문서 생성**: 새 컴포넌트 완성 후 `component-doc-generator` 실행

## 새 에이전트 추가하기

1. `.claude/agents/` 폴더에 마크다운 파일 생성
2. 역할, 입력, 출력, 실행 방법 정의
3. 테스트 후 커밋
