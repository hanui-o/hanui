---
description: Git 변경사항 커밋 및 푸시 워크플로우
---

# Git 커밋 워크플로우

이 워크플로우는 변경사항을 체계적으로 커밋하고 푸시하는 과정을 안내합니다.

## 1. 변경사항 확인

```bash
git status
git diff
```

현재 변경된 파일들과 변경 내용을 확인합니다.

## 2. 변경사항 그룹화

변경사항이 많을 경우:

- **연관된 변경사항끼리 그룹화**하여 여러 개의 커밋으로 분리
- 각 커밋은 하나의 논리적 변경사항을 나타내야 함
- 예: "컴포넌트 추가", "문서 업데이트", "버그 수정" 등으로 분리

## 3. 관련 이슈 확인

// turbo

```bash
gh issue list --state open
```

현재 오픈된 이슈들을 확인합니다.

## 4. 스테이징 및 커밋

### 옵션 A: 모든 변경사항을 한 번에

```bash
git add -A
git commit -m "feat: 변경사항 요약

- 상세 내용 1
- 상세 내용 2
- 상세 내용 3

Closes #이슈번호"
```

### 옵션 B: 특정 파일만 선택적으로

```bash
git add 파일경로1 파일경로2
git commit -m "feat: 변경사항 요약"
```

## 5. 커밋 메시지 규칙

### 타입 (Type)

- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포맷팅, 세미콜론 누락 등
- `refactor`: 코드 리팩토링
- `test`: 테스트 추가
- `chore`: 빌드 업무, 패키지 매니저 설정 등

### 형식

```
<타입>: <제목>

<본문 (선택사항)>

<푸터 (선택사항)>
```

### 예시

```
feat: Add Lucide icons to Pagination component

- Add ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight icons
- Update navigation button layout
- Improve visual clarity for users

Closes #123
```

## 6. 푸시

```bash
git push
```

변경사항을 원격 저장소에 푸시합니다.

## 참고사항

- **이슈 연동**: 커밋 메시지에 `Closes #123`, `Fixes #123`, `Resolves #123` 등을 포함하면 자동으로 이슈가 닫힙니다
- **관련 이슈가 없는 경우**: 먼저 이슈를 생성한 후 커밋 메시지에 이슈 번호를 추가합니다
- **여러 커밋**: 논리적으로 관련 없는 변경사항은 별도의 커밋으로 분리합니다
