React 성능 최적화 이슈를 점검해줘.

## Arguments

- `$ARGUMENTS`: 점검할 파일 또는 디렉토리 (없으면 src/ 전체)

## 점검 항목

### 1. 번들 최적화 (CRITICAL)
- barrel import (`index.ts`에서 전체 re-export) 사용 여부 → 직접 import 권장
- 동적 import (`React.lazy`, `next/dynamic`) 활용 여부
- 무거운 라이브러리 조건부 로딩 여부
- tree-shaking이 안 되는 import 패턴

### 2. 리렌더 방지 (HIGH)
- 불필요한 리렌더 유발 패턴:
  - 인라인 객체/배열/함수를 prop으로 전달
  - useEffect 의존성 배열 누락 또는 과다
  - 매 렌더마다 새로 생성되는 참조값
- useMemo/useCallback 적절한 사용 (과도한 사용도 지적)
- 상태를 필요한 컴포넌트에 가깝게 배치했는지

### 3. 비동기 최적화 (HIGH)
- waterfall 패턴 (순차 fetch) → 병렬 실행 (`Promise.all`)
- Suspense boundary 적절한 배치
- 불필요한 await (사용하지 않는 분기에서의 await)

### 4. 렌더링 최적화 (MEDIUM)
- 조건부 렌더링에서 불필요한 마운트/언마운트
- 리스트 렌더링 시 적절한 key 사용
- 큰 리스트 가상화(virtualization) 적용 여부
- CSS `content-visibility: auto` 활용 가능 여부

### 5. 이벤트 핸들링 (MEDIUM)
- scroll/resize 이벤트 throttle/debounce
- passive event listener 사용
- 이벤트 리스너 정리 (cleanup)

## Output

- 심각도별 정렬 (CRITICAL → HIGH → MEDIUM)
- 각 이슈에 Before/After 코드 제시
- 예상 개선 효과 설명
