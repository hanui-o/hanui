# @hanui/react 테스트 결과

> 실행일: 2026-04-10 | vitest v4.0.15 | jsdom | 145 tests passed

## 요약

| 항목          | 결과       |
| ------------- | ---------- |
| 테스트 파일   | 22개 통과  |
| 테스트 케이스 | 145개 통과 |
| 실패          | 0개        |
| 실행 시간     | 2.0s       |

## 컴포넌트별 상세

### Badge (20 tests)

| 테스트                                                    | 분류   | 시간 |
| --------------------------------------------------------- | ------ | ---- |
| span 요소로 렌더링되어야 합니다                           | 렌더링 | 10ms |
| children이 올바르게 렌더링되어야 합니다                   | 렌더링 | 2ms  |
| 아이콘은 aria-hidden="true"를 가져야 합니다               | 접근성 | 2ms  |
| 아이콘 위치가 right일 때 올바르게 렌더링되어야 합니다     | 렌더링 | 1ms  |
| ref가 전달되어야 합니다                                   | API    | 1ms  |
| 추가 className이 병합되어야 합니다                        | API    | 1ms  |
| 기본 Badge는 접근성 위반이 없어야 합니다                  | axe    | 51ms |
| 다양한 variant도 접근성 위반이 없어야 합니다              | axe    | 76ms |
| NumberBadge: 숫자를 올바르게 표시해야 합니다              | 렌더링 | 1ms  |
| NumberBadge: max를 초과하면 max+ 형식으로 표시해야 합니다 | 렌더링 | 1ms  |
| NumberBadge: count가 0이면 렌더링되지 않아야 합니다       | 렌더링 | 0ms  |
| NumberBadge: showZero가 true면 0도 표시해야 합니다        | 렌더링 | 0ms  |
| NumberBadge: aria-label이 올바르게 설정되어야 합니다      | 접근성 | 1ms  |
| NumberBadge: 접근성 위반이 없어야 합니다                  | axe    | 11ms |
| DotBadge: 기본적으로 렌더링되어야 합니다                  | 렌더링 | 0ms  |
| DotBadge: show가 false면 렌더링되지 않아야 합니다         | 렌더링 | 0ms  |
| DotBadge: aria-hidden="true"를 가져야 합니다              | 접근성 | 0ms  |
| DotBadge: 접근성 위반이 없어야 합니다                     | axe    | 9ms  |
| BadgeGroup: 자식 요소들을 올바르게 렌더링해야 합니다      | 렌더링 | 1ms  |
| BadgeGroup: 접근성 위반이 없어야 합니다                   | axe    | 10ms |

### Button (13 tests)

| 테스트                                                             | 분류     | 시간 |
| ------------------------------------------------------------------ | -------- | ---- |
| button 요소로 렌더링되어야 합니다                                  | 렌더링   | 53ms |
| children이 올바르게 렌더링되어야 합니다                            | 렌더링   | 1ms  |
| 클릭 이벤트가 동작해야 합니다                                      | 인터랙션 | 19ms |
| disabled일 때 클릭이 동작하지 않아야 합니다                        | 인터랙션 | 11ms |
| loading일 때 aria-busy="true"여야 합니다                           | 접근성   | 6ms  |
| loading일 때 aria-disabled="true"여야 합니다                       | 접근성   | 4ms  |
| href가 제공되면 a 태그로 렌더링되어야 합니다                       | 렌더링   | 7ms  |
| ref가 전달되어야 합니다                                            | API      | 1ms  |
| 추가 className이 병합되어야 합니다                                 | API      | 3ms  |
| type의 기본값은 button이어야 합니다                                | API      | 4ms  |
| 기본 Button은 접근성 위반이 없어야 합니다                          | axe      | 19ms |
| 다양한 variant도 접근성 위반이 없어야 합니다                       | axe      | 60ms |
| 아이콘 전용 버튼에 aria-label이 있으면 접근성 위반이 없어야 합니다 | axe      | 9ms  |

### Input (11 tests)

| 테스트                                                     | 분류     | 시간 |
| ---------------------------------------------------------- | -------- | ---- |
| input 요소로 렌더링되어야 합니다                           | 렌더링   | 53ms |
| placeholder가 올바르게 표시되어야 합니다                   | 렌더링   | 2ms  |
| 값을 입력할 수 있어야 합니다                               | 인터랙션 | 28ms |
| disabled일 때 입력이 불가능해야 합니다                     | 인터랙션 | 6ms  |
| error 상태일 때 aria-invalid="true"여야 합니다             | 접근성   | 3ms  |
| ref가 전달되어야 합니다                                    | API      | 1ms  |
| 추가 className이 병합되어야 합니다                         | API      | 4ms  |
| clearable일 때 값이 있으면 지우기 버튼이 표시되어야 합니다 | 인터랙션 | 21ms |
| password 타입일 때 토글 버튼이 있어야 합니다               | 렌더링   | 2ms  |
| 기본 Input은 접근성 위반이 없어야 합니다                   | axe      | 24ms |
| 다양한 variant도 접근성 위반이 없어야 합니다               | axe      | 29ms |

### Checkbox (8 tests)

| 테스트                                           | 분류     | 시간 |
| ------------------------------------------------ | -------- | ---- |
| checkbox role로 렌더링되어야 합니다              | 렌더링   | 55ms |
| label이 올바르게 렌더링되어야 합니다             | 렌더링   | 4ms  |
| 클릭하면 체크 상태가 변경되어야 합니다           | 인터랙션 | 24ms |
| disabled일 때 클릭이 동작하지 않아야 합니다      | 인터랙션 | 13ms |
| error 상태일 때 aria-invalid="true"여야 합니다   | 접근성   | 4ms  |
| 기본 Checkbox는 접근성 위반이 없어야 합니다      | axe      | 24ms |
| CheckboxGroup: 여러 체크박스를 렌더링해야 합니다 | 렌더링   | 4ms  |
| CheckboxGroup: 접근성 위반이 없어야 합니다       | axe      | 19ms |

### Radio (6 tests)

| 테스트                                                                | 분류     | 시간 |
| --------------------------------------------------------------------- | -------- | ---- |
| radiogroup role로 렌더링되어야 합니다                                 | 렌더링   | 62ms |
| radio 항목들이 렌더링되어야 합니다                                    | 렌더링   | 11ms |
| 클릭하면 선택 상태가 변경되어야 합니다                                | 인터랙션 | 29ms |
| 기본 RadioGroup은 접근성 위반이 없어야 합니다                         | axe      | 25ms |
| Radio 편의 컴포넌트: label이 올바르게 렌더링되어야 합니다             | 렌더링   | 5ms  |
| Radio 편의 컴포넌트: label이 있는 Radio는 접근성 위반이 없어야 합니다 | axe      | 25ms |

## 테스트 분류별 통계

| 분류     | 개수 | 설명                                 |
| -------- | ---- | ------------------------------------ |
| 렌더링   | 45   | DOM 구조, 요소 타입, children 확인   |
| 접근성   | 18   | aria 속성, role, label 연결          |
| axe      | 38   | axe-core 자동 접근성 검사 (WCAG 2.1) |
| 인터랙션 | 30   | 클릭, 입력, 상태 변경, 키보드        |
| API      | 14   | ref, className, type 등 컴포넌트 API |

## 테스트 커버리지 현황

| 컴포넌트                                    | 테스트    | 비고                         |
| ------------------------------------------- | --------- | ---------------------------- |
| Badge / NumberBadge / DotBadge / BadgeGroup | ✅ 20개   |                              |
| Button                                      | ✅ 13개   | loading, href, icon 포함     |
| Input                                       | ✅ 11개   | clearable, password 포함     |
| Checkbox / CheckboxGroup                    | ✅ 8개    |                              |
| Radio / RadioGroup                          | ✅ 6개    |                              |
| Select                                      | ✅ 5개    |                              |
| Modal                                       | ✅ 7개    | ESC 닫기, 포커스 관리        |
| Alert                                       | ✅ 9개    | role, aria-live              |
| AlertDialog                                 | ✅ 4개    | Radix 기반                   |
| Accordion                                   | ✅ 6개    | single 모드                  |
| Pagination                                  | ✅ 7개    | 이전/다음, aria-current      |
| Switch                                      | ✅ 5개    |                              |
| Tabs                                        | ✅ 6개    | aria-selected                |
| Tooltip                                     | ✅ 4개    | 호버, disabled               |
| Breadcrumb                                  | ✅ 5개    | aria-current="page"          |
| Progress                                    | ✅ 5개    | indeterminate 포함           |
| Textarea                                    | ✅ 5개    |                              |
| Spinner                                     | ✅ 4개    | role="status"                |
| Disclosure                                  | ✅ 4개    |                              |
| Slider                                      | ✅ 4개    | aria-value\*                 |
| SkipLink                                    | ✅ 3개    | 접근성 건너뛰기              |
| DropdownMenu                                | ✅ 4개    |                              |
| 나머지 (~55개)                              | ❌ 미작성 | 레이아웃/텍스트 제외 시 적음 |

## 실행 방법

```bash
# 전체 테스트
pnpm test

# 워치 모드
pnpm test:watch

# 특정 파일만
npx vitest run src/components/button.test.tsx
```
