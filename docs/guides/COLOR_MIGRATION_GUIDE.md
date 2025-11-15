# KRDS 컬러 시스템 마이그레이션 가이드

> **Tailwind 기본 색상에서 KRDS 색상 시스템으로 전환하는 가이드**  
> 작성일: 2025-01-XX

---

## 📋 개요

HANUI는 KRDS(대한민국 디자인 시스템) 색상 시스템을 사용합니다. 기존 Tailwind 기본 색상(`gray-*`, `red-*` 등)을 KRDS 색상(`krds-gray-*`, `krds-primary-*` 등)으로 전환하는 방법을 안내합니다.

---

## 🎯 마이그레이션 원칙

1. **`krds-` 접두사 사용**: 모든 KRDS 색상은 `krds-` 접두사를 붙입니다.
2. **다크 모드 제거**: 다크 모드 관련 클래스(`dark:*`)를 제거합니다.
3. **의미 기반 선택**: Semantic 변수(`text`, `surface`, `base`)를 우선 사용합니다.
4. **숫자 스케일 매핑**: Tailwind 기본 색상을 적절한 KRDS 숫자 스케일로 매핑합니다.

---

## 🔄 색상 매핑 가이드

### Base Colors (흰색/검은색)

| Tailwind 기본  | KRDS 색상    | 용도                                     |
| -------------- | ------------ | ---------------------------------------- |
| `white`        | `krds-white` | 배경 색상 (다크 모드 자동 전환, 권장)    |
| `black`        | `krds-black` | 텍스트 색상 (다크 모드 자동 전환, 권장)  |
| `white` (순수) | `white`      | 항상 흰색이 필요한 경우 (로고, 아이콘)   |
| `black` (순수) | `black`      | 항상 검은색이 필요한 경우 (로고, 아이콘) |

**예시**:

```diff
- <div className="bg-white text-black">
+ <div className="bg-krds-white text-krds-black">
  {/* 다크 모드 자동 전환 */}
</div>
```

### Gray 색상

| Tailwind 기본 | KRDS 색상                          | 용도               |
| ------------- | ---------------------------------- | ------------------ |
| `gray-50`     | `krds-gray-5`                      | 매우 밝은 배경     |
| `gray-100`    | `krds-gray-5` 또는 `krds-gray-10`  | 밝은 배경          |
| `gray-200`    | `krds-gray-20`                     | 테두리, 구분선     |
| `gray-300`    | `krds-gray-30`                     | 테두리 (더 진함)   |
| `gray-400`    | `krds-gray-40` 또는 `krds-gray-50` | 비활성 텍스트      |
| `gray-500`    | `krds-gray-50` 또는 `krds-gray-60` | 보조 텍스트        |
| `gray-600`    | `krds-gray-60` 또는 `krds-gray-70` | 보조 텍스트        |
| `gray-700`    | `krds-gray-70` 또는 `krds-gray-80` | 본문 텍스트        |
| `gray-800`    | `krds-gray-80` 또는 `krds-gray-90` | 본문 텍스트 (진함) |
| `gray-900`    | `krds-gray-90` 또는 `krds-gray-95` | 강조 텍스트        |
| `gray-950`    | `krds-gray-95`                     | 매우 어두운 배경   |

### Primary 색상

| Tailwind 기본 | KRDS 색상                                | 용도               |
| ------------- | ---------------------------------------- | ------------------ |
| `blue-*`      | `krds-primary-*`                         | 주요 상호작용 색상 |
| `blue-400`    | `krds-primary-40` 또는 `krds-primary-50` | 기본 Primary       |
| `blue-500`    | `krds-primary-50`                        | 기본 Primary       |
| `blue-600`    | `krds-primary-60`                        | Hover 상태         |

### System Colors

| Tailwind 기본 | KRDS 색상                                | 용도         |
| ------------- | ---------------------------------------- | ------------ |
| `red-*`       | `krds-danger-*`                          | 오류, 삭제   |
| `red-500`     | `krds-danger-50`                         | 기본 Danger  |
| `yellow-*`    | `krds-warning-*`                         | 경고, 주의   |
| `yellow-500`  | `krds-warning-30` 또는 `krds-warning-40` | 기본 Warning |
| `green-*`     | `krds-success-*`                         | 성공, 완료   |
| `green-400`   | `krds-success-50`                        | 기본 Success |
| `green-500`   | `krds-success-50`                        | 기본 Success |

---

## 🎨 Semantic 변수 참조표

KRDS 색상 시스템은 Semantic 변수를 제공하여 모드에 따라 자동으로 적절한 색상을 사용합니다. 다음 표는 각 색상의 Semantic 변수와 모드별 값입니다.

### Gray Scale (회색 스케일)

| 스케일          | 용도                | 설명                         |
| --------------- | ------------------- | ---------------------------- |
| `krds-gray-0`   | background, surface | 흰색 (배경, 표면)            |
| `krds-gray-5`   | background, surface | 매우 밝은 배경, 표면         |
| `krds-gray-10`  | background, surface | 밝은 배경, 표면              |
| `krds-gray-20`  | -                   | 테두리, 구분선               |
| `krds-gray-30`  | -                   | 테두리 (더 진함)             |
| `krds-gray-40`  | disabled            | 비활성 텍스트                |
| `krds-gray-50`  | disabled            | 비활성 텍스트                |
| `krds-gray-60`  | -                   | 보조 텍스트                  |
| `krds-gray-70`  | subtle              | 미묘한 텍스트                |
| `krds-gray-80`  | -                   | 보조 텍스트                  |
| `krds-gray-90`  | basic               | 기본 텍스트 (Regular weight) |
| `krds-gray-95`  | bolder              | 강조 텍스트 (Bold weight)    |
| `krds-gray-100` | -                   | 검은색                       |

### Primary (주요 색상)

| Semantic 변수          | 기본 모드 | 선명한 화면 모드 | 용도                  |
| ---------------------- | --------- | ---------------- | --------------------- |
| `krds-primary-base`    | 50        | 50               | 기본 색상 (모드 무관) |
| `krds-primary-text`    | 60        | 20               | 텍스트 색상           |
| `krds-primary-surface` | 5         | 95               | 배경/표면 색상        |

**사용 예시**:

```tsx
<button className="bg-krds-primary-surface text-krds-primary-text">
  Primary 버튼
</button>
```

### Secondary (보조 색상)

| Semantic 변수            | 기본 모드 | 선명한 화면 모드 | 용도           |
| ------------------------ | --------- | ---------------- | -------------- |
| `krds-secondary-base`    | 70        | 60               | 기본 색상      |
| `krds-secondary-text`    | 80        | 20               | 텍스트 색상    |
| `krds-secondary-surface` | 5         | 95               | 배경/표면 색상 |

**사용 예시**:

```tsx
<div className="bg-krds-secondary-surface text-krds-secondary-text">
  Secondary 영역
</div>
```

### Accent (강조 색상)

> ⚠️ **주의**: 강조 색상은 5% 이하 비율로 제한적 사용

| Semantic 변수         | 기본 모드 | 선명한 화면 모드 | 용도                  |
| --------------------- | --------- | ---------------- | --------------------- |
| `krds-accent-base`    | 50        | 50               | 기본 색상 (모드 무관) |
| `krds-accent-text`    | 60        | 20               | 텍스트 색상           |
| `krds-accent-surface` | 5         | 95               | 배경/표면 색상        |

**사용 예시**:

```tsx
<div className="bg-krds-accent-surface text-krds-accent-text">강조 알림</div>
```

### Danger (위험/에러 색상)

| Semantic 변수         | 기본 모드 | 선명한 화면 모드 | 용도                  |
| --------------------- | --------- | ---------------- | --------------------- |
| `krds-danger-base`    | 50        | 50               | 기본 색상 (모드 무관) |
| `krds-danger-icon`    | 50        | 20               | 아이콘 색상           |
| `krds-danger-text`    | 60        | 20               | 텍스트 색상           |
| `krds-danger-surface` | 5         | 95               | 배경/표면 색상        |
| `krds-danger-border`  | 10        | 90               | 테두리 색상           |

**사용 예시**:

```tsx
<div className="border-krds-danger-border bg-krds-danger-surface">
  <Icon className="text-krds-danger-icon" />
  <p className="text-krds-danger-text">에러 메시지</p>
</div>
```

### Warning (주의 색상)

| Semantic 변수          | 기본 모드 | 선명한 화면 모드 | 용도                  |
| ---------------------- | --------- | ---------------- | --------------------- |
| `krds-warning-base`    | 30        | 30               | 기본 색상 (모드 무관) |
| `krds-warning-icon`    | 50        | 20               | 아이콘 색상           |
| `krds-warning-text`    | 60        | 20               | 텍스트 색상           |
| `krds-warning-surface` | 5         | 95               | 배경/표면 색상        |
| `krds-warning-border`  | 10        | 90               | 테두리 색상           |

**사용 예시**:

```tsx
<div className="border-krds-warning-border bg-krds-warning-surface">
  <Icon className="text-krds-warning-icon" />
  <p className="text-krds-warning-text">주의 메시지</p>
</div>
```

### Success (성공 색상)

| Semantic 변수          | 기본 모드 | 선명한 화면 모드 | 용도                  |
| ---------------------- | --------- | ---------------- | --------------------- |
| `krds-success-base`    | 50        | 50               | 기본 색상 (모드 무관) |
| `krds-success-icon`    | 50        | 20               | 아이콘 색상           |
| `krds-success-text`    | 60        | 20               | 텍스트 색상           |
| `krds-success-surface` | 5         | 95               | 배경/표면 색상        |
| `krds-success-border`  | 10        | 90               | 테두리 색상           |

**사용 예시**:

```tsx
<div className="border-krds-success-border bg-krds-success-surface">
  <Icon className="text-krds-success-icon" />
  <p className="text-krds-success-text">성공 메시지</p>
</div>
```

### Information (안내 색상)

| Semantic 변수              | 기본 모드 | 선명한 화면 모드 | 용도                  |
| -------------------------- | --------- | ---------------- | --------------------- |
| `krds-information-base`    | 50        | 50               | 기본 색상 (모드 무관) |
| `krds-information-icon`    | 50        | 20               | 아이콘 색상           |
| `krds-information-text`    | 60        | 20               | 텍스트 색상           |
| `krds-information-surface` | 5         | 95               | 배경/표면 색상        |
| `krds-information-border`  | 10        | 90               | 테두리 색상           |

**사용 예시**:

```tsx
<div className="border-krds-information-border bg-krds-information-surface">
  <Icon className="text-krds-information-icon" />
  <p className="text-krds-information-text">안내 메시지</p>
</div>
```

---

## 📝 변경 예시

### 1. 텍스트 색상

```tsx
// ❌ 이전 (Tailwind 기본 + 다크 모드)
<p className="text-gray-700 dark:text-gray-300">본문 텍스트</p>
<p className="text-gray-600 dark:text-gray-400">보조 텍스트</p>

// ✅ 이후 (KRDS 색상, 다크 모드 제거)
<p className="text-krds-gray-90">본문 텍스트</p>
<p className="text-krds-gray-70">보조 텍스트</p>
```

### 2. 배경 색상

```tsx
// ❌ 이전
<div className="bg-gray-50 dark:bg-gray-900">배경</div>
<div className="bg-white dark:bg-gray-950">배경</div>

// ✅ 이후
<div className="bg-krds-gray-5">배경</div>
<div className="bg-krds-white">배경</div>
```

### 3. 테두리 색상

```tsx
// ❌ 이전
<div className="border border-gray-200 dark:border-gray-800">테두리</div>

// ✅ 이후
<div className="border border-krds-gray-20">테두리</div>
```

### 4. 코드 블록 색상

```tsx
// ❌ 이전
<div className="bg-gray-900 dark:bg-gray-950">
  <pre className="text-gray-100 dark:text-gray-200">코드</pre>
</div>

// ✅ 이후
<div className="bg-krds-gray-95">
  <pre className="text-krds-gray-10">코드</pre>
</div>
```

### 5. 터미널 아이콘 색상

```tsx
// ❌ 이전
<div className="bg-red-500" />   {/* 닫기 */}
<div className="bg-yellow-500" /> {/* 최소화 */}
<div className="bg-green-500" />  {/* 최대화 */}

// ✅ 이후
<div className="bg-krds-danger-50" />   {/* 닫기 */}
<div className="bg-krds-warning-30" /> {/* 최소화 */}
<div className="bg-krds-success-50" />  {/* 최대화 */}
```

### 6. 코드 하이라이트 색상

```tsx
// ❌ 이전
<span className="text-green-400">$</span>
<span className="text-blue-400">pnpm</span>
<span className="text-purple-400">import</span>

// ✅ 이후
<span className="text-krds-success-50">$</span>
<span className="text-krds-primary-60">pnpm</span>
<span className="text-krds-accent-50">import</span>
```

### 7. 타이포그래피 컴포넌트 색상

HANUI 타이포그래피 컴포넌트는 기본 색상이 내장되어 있어 별도로 색상을 지정할 필요가 없습니다.

#### 기본 색상 시스템

| 컴포넌트            | Weight        | 기본 색상      | 설명                     |
| ------------------- | ------------- | -------------- | ------------------------ |
| **Display**         | Bold (700)    | `krds-gray-95` | bolder (최대 강조)       |
| **Heading**         | Bold (700)    | `krds-gray-95` | bolder (제목)            |
| **Body**            | Regular (400) | `krds-gray-90` | basic (본문)             |
| **Body**            | Bold (700)    | `krds-gray-95` | bolder (강조 본문)       |
| **NavText (Title)** | Bold (700)    | `krds-gray-95` | bolder (네비게이션 제목) |
| **NavText (Depth)** | Regular/Bold  | `krds-gray-90` | basic (네비게이션 항목)  |
| **Label**           | Regular (400) | `krds-gray-90` | basic (폼 라벨)          |

#### 색상 규칙

- **gray-90 (basic)**: Regular weight 텍스트의 기본 색상
- **gray-95 (bolder)**: Bold weight 텍스트의 기본 색상
- **다크 모드 자동 전환**: 모든 KRDS 색상은 CSS 변수를 통해 자동으로 다크 모드에 대응됩니다.

#### 사용 예시

```tsx
// ❌ 이전 (수동 색상 지정 + 다크 모드)
<h1 className="text-gray-900 dark:text-gray-100 font-bold">
  제목
</h1>
<p className="text-gray-700 dark:text-gray-300">
  본문 텍스트
</p>
<p className="text-gray-900 dark:text-gray-100 font-bold">
  강조 텍스트
</p>

// ✅ 이후 (컴포넌트 기본 색상 사용)
<Display size="lg">제목</Display>
<Body>본문 텍스트</Body>
<Body weight="bold">강조 텍스트</Body>

// 또는 Heading 사용
<Heading level="h1">페이지 제목</Heading>
<Heading level="h2">섹션 제목</Heading>
```

#### 타이포그래피 컴포넌트 마이그레이션

```tsx
// ❌ 이전 (수동 스타일링)
<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
  섹션 제목
</h2>
<p className="text-base text-gray-700 dark:text-gray-300">
  설명 텍스트
</p>

// ✅ 이후 (HANUI 컴포넌트 사용)
<Heading level="h2">섹션 제목</Heading>
<Body>설명 텍스트</Body>
```

#### 특정 색상이 필요한 경우

기본 색상을 오버라이드해야 하는 경우에만 `className`으로 색상을 지정합니다:

```tsx
// 기본 색상 사용 (권장)
<Body>일반 텍스트</Body>

// 특정 색상이 필요한 경우에만 오버라이드
<Body className="text-krds-primary-60">링크 스타일 텍스트</Body>
<Body className="text-krds-danger-50">에러 메시지</Body>
```

---

## 🔍 체크리스트

마이그레이션 시 다음 항목을 확인하세요:

- [ ] 모든 `gray-*` 색상을 `krds-gray-*`로 변경
- [ ] 모든 `blue-*` 색상을 `krds-primary-*`로 변경
- [ ] 모든 `red-*` 색상을 `krds-danger-*`로 변경
- [ ] 모든 `yellow-*` 색상을 `krds-warning-*`로 변경
- [ ] 모든 `green-*` 색상을 `krds-success-*`로 변경
- [ ] 모든 `dark:*` 클래스 제거
- [ ] UI 요소의 `bg-white`가 `bg-krds-white`로 변경되었는가? (코드 블록, 카드 배경 등)
- [ ] UI 요소의 `text-black`이 `text-krds-black`로 변경되었는가?
- [ ] 타이포그래피 컴포넌트 사용: `<h1>`, `<p>` 대신 `<Heading>`, `<Body>` 사용
- [ ] 타이포그래피 컴포넌트에서 불필요한 색상 className 제거 (기본 색상 사용)
- [ ] Semantic 변수 사용 검토 (`text-krds-primary-text` 등)
- [ ] 접근성 확인 (색상 대비율)

---

## 📚 참고 자료

- **KRDS 색상 시스템 문서**: `/design-system/colors`
- **기술 문서**: `/docs/technical/ARCHITECTURE.md#43-컬러-시스템-color-system`
- **KRDS 공식**: https://www.krds.go.kr/

---

## 💡 팁

1. **Semantic 변수 우선 사용**: 일반적인 UI 컴포넌트에서는 Semantic 변수(`text-krds-primary-text`, `bg-krds-primary-surface`)를 사용하는 것이 좋습니다.

2. **UI 요소에서 KRDS 색상 사용**: 문서 사이트나 컴포넌트 내부 UI 요소에서는 Tailwind 기본 색상 대신 KRDS 색상을 사용하는 것을 권장합니다:
   - `bg-white` → `bg-krds-white` (다크 모드 자동 전환)
   - `text-black` → `text-krds-black` (다크 모드 자동 전환)
   - 코드 블록 배경, 카드 배경 등 모든 UI 요소에 적용

3. **일괄 검색/교체**: VS Code의 "Find and Replace" 기능을 사용하여 일괄 변경할 수 있습니다:
   - `text-gray-700 dark:text-gray-300` → `text-krds-gray-90`
   - `bg-gray-50 dark:bg-gray-900` → `bg-krds-gray-5`
   - `border-gray-200 dark:border-gray-800` → `border-krds-gray-20`
   - `bg-white dark:bg-krds-gray-95` → `bg-krds-white`
   - `text-black dark:text-krds-gray-10` → `text-krds-black`
   - `<h1 className="text-gray-900 dark:text-gray-100` → `<Display` 또는 `<Heading level="h1"`
   - `<p className="text-gray-700 dark:text-gray-300` → `<Body`
   - `text-gray-900 dark:text-gray-100 font-bold` → 컴포넌트 기본 색상 사용 (색상 제거)

4. **다크 모드 접두사 제거**: 모든 KRDS 색상은 CSS 변수를 통해 자동 전환되므로 `dark:` 접두사는 필요 없습니다. 모든 `dark:` 접두사를 제거하세요.

5. **단계별 마이그레이션**: 한 번에 모든 파일을 변경하지 말고, 페이지 단위로 순차적으로 마이그레이션하세요.

6. **타이포그래피 컴포넌트 활용**: HANUI의 타이포그래피 컴포넌트(`Display`, `Heading`, `Body`, `NavText`, `Label`)를 사용하면 기본 색상이 자동으로 적용됩니다. 수동으로 색상을 지정할 필요가 없습니다.

---

**작성자**: HANUI Team  
**업데이트**: 2025-01-XX
