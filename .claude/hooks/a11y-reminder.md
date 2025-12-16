# 접근성 리마인더 훅

컴포넌트 파일 수정 시 자동으로 접근성 체크리스트를 상기시킵니다.

## 트리거 조건

- `packages/react/src/components/*.tsx` 파일 수정 시
- `packages/vue/src/components/*.vue` 파일 수정 시

## 체크 항목

### 필수 ARIA 속성

- [ ] `role` - 역할 정의
- [ ] `aria-label` 또는 `aria-labelledby` - 레이블 제공
- [ ] `aria-describedby` - 설명 연결 (필요 시)

### 키보드 지원

- [ ] `tabIndex` - 포커스 가능 여부
- [ ] `onKeyDown` - 키보드 이벤트 핸들러
- [ ] Enter/Space - 클릭 동작 트리거

### 시각적 피드백

- [ ] `:focus` 스타일 - 포커스 표시
- [ ] `:focus-visible` - 키보드 포커스만 표시
- [ ] `outline` 또는 `ring` - 포커스 링

### 상태 표시

- [ ] `aria-disabled` - 비활성화 상태
- [ ] `aria-busy` - 로딩 상태
- [ ] `aria-expanded` - 확장 상태
- [ ] `aria-selected` - 선택 상태
