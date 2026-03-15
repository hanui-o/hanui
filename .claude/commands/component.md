새 컴포넌트를 생성해줘.

## Arguments

- `$ARGUMENTS`: 컴포넌트 이름 (예: `Button`, `Modal`, `DataTable`)

## Instructions

1. **프로젝트 구조 파악:**
   - 기존 컴포넌트 디렉토리 구조 확인 (src/components/ 등)
   - 사용 중인 스타일링 방식 확인 (CSS Modules, Tailwind, styled-components, vanilla CSS 등)
   - 기존 컴포넌트 파일 패턴 확인 (index.ts barrel export 여부, 테스트 파일 위치 등)

2. **파일 생성 (기존 패턴에 맞게):**
   - 컴포넌트 파일 (tsx/ts)
   - 스타일 파일 (프로젝트 스타일링 방식에 맞게)
   - 타입 정의 (Props interface)
   - index.ts (barrel export, 프로젝트에서 사용 중일 때만)

3. **컴포넌트 작성 원칙:**
   - Props는 명시적 interface로 정의
   - boolean prop 남용 금지 → 명시적 variant 사용
   - children prop 우선 (render prop보다)
   - forwardRef 대신 ref prop 직접 전달 (React 19+)
   - 기본값은 destructuring default로 처리

4. **기존 패턴과 다른 점이 있으면 사용자에게 확인 후 진행**
