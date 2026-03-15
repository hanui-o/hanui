React 컴포지션 패턴 기반으로 리팩토링을 제안해줘.

## Arguments

- `$ARGUMENTS`: 리팩토링할 파일 또는 컴포넌트 (없으면 변경된 파일 대상)

## 점검 패턴

1. **Boolean Prop 정리:**
   - boolean prop이 3개 이상이면 variant 패턴으로 전환 제안
   - 상호 배타적 boolean은 union type으로 변환

2. **Compound Component:**
   - 하나의 컴포넌트가 너무 많은 역할을 하면 분리 제안
   - 부모-자식 관계가 있는 UI는 compound component 패턴 적용

3. **상태 관리:**
   - props drilling이 3단계 이상이면 Context 또는 상태 관리 제안
   - 파생 상태(derived state)는 useMemo 또는 계산으로 대체
   - 불필요한 useState → useRef 또는 상수로 전환

4. **관심사 분리:**
   - 비즈니스 로직과 UI 로직 분리 (custom hook 추출)
   - 렌더링 로직이 복잡하면 서브 컴포넌트로 분리
   - 반복되는 패턴은 공통 컴포넌트/훅으로 추출

5. **코드 크기:**
   - 200줄 이상 컴포넌트는 분리 검토
   - 50줄 이상 useEffect는 custom hook 추출 검토

## Output

- Before/After 코드 비교
- 리팩토링 이유와 개선 효과 설명
- 단계적으로 적용 가능하도록 우선순위 제시
