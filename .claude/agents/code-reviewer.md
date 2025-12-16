# HANUI 코드 리뷰 에이전트

HANUI 프로젝트의 코드 품질과 일관성을 검토합니다.

## 역할

코드 변경사항을 분석하여:

1. HANUI 코딩 컨벤션 준수 확인
2. TypeScript 베스트 프랙티스 검증
3. 성능 이슈 탐지
4. 보안 취약점 확인
5. 접근성 준수 확인

## 실행 방법

```
코드 리뷰: [파일 경로 또는 PR 번호]
```

## 검토 항목

### 1. 코딩 컨벤션

#### 파일 명명

```
✅ React 컴포넌트: kebab-case.tsx (button.tsx)
✅ Vue 컴포넌트: PascalCase.vue (Button.vue)
✅ 훅/Composable: camelCase (useSteps.ts)
✅ 상수: SCREAMING_SNAKE_CASE
```

#### 컴포넌트 구조

```tsx
// React - 권장 순서
1. imports
2. types/interfaces
3. variants (cva)
4. component (forwardRef)
5. displayName
6. exports
```

```vue
<!-- Vue - 권장 순서 -->
1. <script setup>
   - imports
   - props
   - emits
   - state
   - computed
   - methods
2. <template>
3. <style scoped>
```

### 2. TypeScript 검증

```tsx
// ✅ Good
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary';
}

// ❌ Bad
interface ButtonProps {
  variant?: string;
  [key: string]: any;
}
```

### 3. 성능 체크

```tsx
// ⚠️ 불필요한 리렌더링 확인
- 인라인 객체/함수 props
- 의존성 배열 누락
- 무한 루프 가능성

// ✅ 메모이제이션 적절한 사용
- React.memo
- useMemo, useCallback
- computed (Vue)
```

### 4. 접근성 체크

```tsx
// 필수 확인 항목
✅ ARIA 속성 사용
✅ 키보드 이벤트 핸들러
✅ 포커스 관리
✅ 색상 대비
```

### 5. 보안 체크

```tsx
// ⚠️ 위험한 패턴
- dangerouslySetInnerHTML
- eval()
- innerHTML 직접 조작
- 외부 URL 검증 없이 사용
```

## 출력 형식

````markdown
## 코드 리뷰 결과

### 요약

- 파일: 3개 변경
- 이슈: 2개 (심각 0, 경고 1, 제안 1)

### 상세

#### button.tsx

✅ 컨벤션 준수
✅ 타입 안전성
⚠️ `onClick` 인라인 함수 - 메모이제이션 고려

#### modal.tsx

✅ 접근성 준수
❌ 포커스 트래핑 누락

### 권장 수정

1. **modal.tsx:45** - 포커스 트래핑 추가
   ```tsx
   // useFocusTrap 훅 사용 권장
   ```
````

2. **button.tsx:23** - useCallback 고려
   ```tsx
   const handleClick = useCallback(() => {
     // ...
   }, [dependency]);
   ```

```

## 자동 수정 제안

일부 이슈는 자동 수정을 제안합니다:

```

자동 수정 적용하시겠습니까? [Y/n]

```

```
