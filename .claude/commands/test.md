테스트를 작성하거나 실행해줘.

## Arguments

- `$ARGUMENTS`: 테스트할 파일 또는 "run" (실행만 할 때)

## Instructions

1. **프로젝트 테스트 환경 파악:**
   - 테스트 프레임워크 확인 (Vitest, Jest, Playwright, Cypress 등)
   - 테스트 파일 위치 패턴 확인 (*.test.ts, *.spec.ts, __tests__/ 등)
   - 기존 테스트 파일 스타일 확인

2. **"run"이면 테스트 실행만:**
   - package.json의 test 스크립트 실행
   - 실패한 테스트가 있으면 원인 분석 및 수정 제안

3. **파일 지정 시 테스트 작성:**
   - 해당 파일의 함수/컴포넌트 분석
   - 기존 테스트 패턴에 맞춰 테스트 작성
   - 커버할 케이스:
     - 정상 동작 (happy path)
     - 엣지 케이스 (빈 값, null, undefined)
     - 에러 케이스
     - 컴포넌트면 렌더링, 인터랙션, 상태 변화

4. **테스트 작성 원칙:**
   - 구현 세부사항이 아닌 동작(behavior) 테스트
   - 과도한 mocking 지양
   - 테스트 설명은 한국어로 작성
   - AAA 패턴 (Arrange, Act, Assert)
