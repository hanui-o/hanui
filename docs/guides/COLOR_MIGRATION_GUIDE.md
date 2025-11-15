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
<div className="bg-white">배경</div>
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

---

## 🔍 체크리스트

마이그레이션 시 다음 항목을 확인하세요:

- [ ] 모든 `gray-*` 색상을 `krds-gray-*`로 변경
- [ ] 모든 `blue-*` 색상을 `krds-primary-*`로 변경
- [ ] 모든 `red-*` 색상을 `krds-danger-*`로 변경
- [ ] 모든 `yellow-*` 색상을 `krds-warning-*`로 변경
- [ ] 모든 `green-*` 색상을 `krds-success-*`로 변경
- [ ] 모든 `dark:*` 클래스 제거
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

2. **일괄 검색/교체**: VS Code의 "Find and Replace" 기능을 사용하여 일괄 변경할 수 있습니다:
   - `text-gray-700 dark:text-gray-300` → `text-krds-gray-90`
   - `bg-gray-50 dark:bg-gray-900` → `bg-krds-gray-5`
   - `border-gray-200 dark:border-gray-800` → `border-krds-gray-20`

3. **단계별 마이그레이션**: 한 번에 모든 파일을 변경하지 말고, 페이지 단위로 순차적으로 마이그레이션하세요.

---

**작성자**: HANUI Team  
**업데이트**: 2025-01-XX
