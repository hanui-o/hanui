# KRDS 공식 리소스 활용 가이드

> KRDS 공식 GitHub 저장소 및 디자인 토큰 활용법

**업데이트**: 2025-11-11

---

## 🎯 KRDS 공식 리소스

### 1. 공식 웹사이트

**URL**: https://www.krds.go.kr/

**용도**:

- 디자인 시스템 가이드라인 확인
- 접근성 표준 문서
- UI/UX 원칙
- 사용 사례 및 템플릿

### 2. GitHub 저장소 ⭐ **메인 참고**

**URL**: https://github.com/KRDS-uiux/krds-uiux

**용도**:

- **실제 디자인 토큰** (컬러, 타이포그래피)
- **HTML 컴포넌트 구현 예제**
- **공식 패키지 설치**

**최신 릴리즈**: v1.0.6 (2025-09-05)

**언어 구성**:

- CSS: 67.4%
- SCSS: 18.2%
- HTML: 9.3%
- JavaScript: 5.1%

---

## 📁 저장소 구조

```
KRDS-uiux/
├── tokens/
│   ├── figma_token.json         ⭐ Figma 디자인 토큰 (원본)
│   └── transformed_tokens.json  변환된 토큰 (CSS Variables용)
│
├── html/
│   └── code/                    HTML 컴포넌트 구현
│       ├── button/
│       ├── input/
│       ├── modal/
│       └── ...
│
├── resources/                   리소스 파일
│   ├── fonts/
│   ├── icons/
│   └── images/
│
└── package.json                 KRDS HTML Component Kit
```

---

## 🎨 디자인 토큰 활용

### 1. Figma 토큰 파일

**파일**: `tokens/figma_token.json`

**구조**:

```json
{
  "color": {
    "primary": {
      "5": { "value": "#ecf2fe", "type": "color" },
      "10": { "value": "#d8e5fd", "type": "color" },
      "20": { "value": "#b1cefb", "type": "color" },
      "30": { "value": "#86aff9", "type": "color" },
      "40": { "value": "#4c87f6", "type": "color" },
      "50": { "value": "#256ef4", "type": "color" },
      "60": { "value": "#0b50d0", "type": "color" },
      "70": { "value": "#083891", "type": "color" },
      "80": { "value": "#052561", "type": "color" },
      "90": { "value": "#03163a", "type": "color" },
      "95": { "value": "#020f27", "type": "color" }
    },
    "secondary": { ... },
    "gray": { ... },
    "success": { ... },
    "warning": { ... },
    "danger": { ... },
    "info": { ... }
  },
  "typography": { ... },
  "spacing": { ... },
  "radius": { ... }
}
```

### 2. 토큰 추출 방법

#### 방법 1: 직접 확인 (권장)

```bash
# 1. 저장소 클론
git clone https://github.com/KRDS-uiux/krds-uiux.git

# 2. 토큰 파일 확인
cd KRDS-uiux
cat tokens/figma_token.json | jq '.color.primary'
```

#### 방법 2: Raw 파일 URL

```
https://raw.githubusercontent.com/KRDS-uiux/krds-uiux/main/tokens/figma_token.json
```

#### 방법 3: WebFetch (개발 중)

```typescript
import { WebFetch } from '@hanui/tools';

const tokens = await WebFetch(
  'https://raw.githubusercontent.com/KRDS-uiux/krds-uiux/main/tokens/figma_token.json',
  'Extract all color tokens'
);
```

### 3. HANUI에서의 활용

**현재 적용 상태**: 완료 (Issue #4)

```typescript
// packages/core/src/tokens/colors.ts
// KRDS Figma 토큰 → HANUI 컬러 토큰 변환

export const primary: ColorScale = {
  5: '#ecf2fe', // ← figma_token.json에서 추출
  10: '#d8e5fd',
  20: '#b1cefb',
  30: '#86aff9',
  40: '#4c87f6',
  50: '#256ef4',
  60: '#0b50d0',
  70: '#083891',
  80: '#052561',
  90: '#03163a',
  95: '#020f27',
};
```

**소스 표기**:

```typescript
/**
 * KRDS (Korean Government Design System) Color Tokens
 *
 * Official color palette from KRDS Figma tokens
 * Source: https://github.com/KRDS-uiux/krds-uiux/blob/main/tokens/figma_token.json
 */
```

### 4. KRDS/Tailwind 색상 시스템 통합 ⭐ **중요**

**작성일**: 2025-11-15
**상태**: 완료

#### 배경: 색상 스케일 충돌 문제

KRDS와 Tailwind CSS는 서로 다른 색상 스케일을 사용합니다:

- **KRDS 스케일**: 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95
- **Tailwind 스케일**: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950

이로 인해 다음과 같은 문제가 발생했습니다:

1. `bg-gray-100`이 검정색(#000000)으로 렌더링됨
2. KRDS의 `gray-100`(검정)과 Tailwind의 `gray-100`(밝은 회색)이 충돌
3. 개발자가 예상한 색상과 다른 색상이 적용됨

#### 해결 방법: CSS 변수 브릿지

**1단계: globals.css에 CSS 변수 정의**

```css
/* apps/docs/src/app/globals.css */

:root {
  /* KRDS Color Tokens - Light Mode */
  --krds-color-light-primary-5: #ecf2fe;
  --krds-color-light-primary-10: #d8e5fd;
  --krds-color-light-primary-20: #b1cefb;
  /* ... 30-90 ... */
  --krds-color-light-primary-95: #020f27;

  /* Gray 스케일 - 0과 100 제거 */
  --krds-color-light-gray-5: #f4f5f6;
  --krds-color-light-gray-10: #e6e8ea;
  /* ... 20-90 ... */
  --krds-color-light-gray-95: #131416;

  /* Secondary, Danger, Warning, Success, Information, Point 동일 구조 */
}

.dark {
  /* Dark Mode - 밝기 반전 */
  --krds-color-light-primary-5: #020f27;
  --krds-color-light-primary-60: #4c87f6; /* 더 밝은 파란색 */
  --krds-color-light-primary-95: #ecf2fe;

  /* Gray - 완전 반전 */
  --krds-color-light-gray-5: #131416;
  --krds-color-light-gray-95: #f4f5f6;
}
```

**2단계: tailwind.config.ts에서 듀얼 스케일 매핑**

```typescript
// apps/docs/tailwind.config.ts

export default {
  theme: {
    extend: {
      colors: {
        primary: {
          // KRDS 스케일 (5-95)
          5: 'var(--krds-color-light-primary-5)',
          10: 'var(--krds-color-light-primary-10)',
          60: 'var(--krds-color-light-primary-60)',
          95: 'var(--krds-color-light-primary-95)',

          // Tailwind 호환 스케일 (100-950)
          100: 'var(--krds-color-light-primary-10)',
          200: 'var(--krds-color-light-primary-20)',
          600: 'var(--krds-color-light-primary-60)',
          950: 'var(--krds-color-light-primary-95)',
        },
        gray: {
          // KRDS 스케일 (5-95만 사용, 0과 100 제거)
          5: 'var(--krds-color-light-gray-5)',
          /* ... */
          95: 'var(--krds-color-light-gray-95)',

          // Tailwind 호환 스케일
          100: 'var(--krds-color-light-gray-10)', // ← 10에 매핑
          200: 'var(--krds-color-light-gray-20)',
          950: 'var(--krds-color-light-gray-95)',
        },
      },
    },
  },
};
```

#### 주요 결정 사항

1. **KRDS gray-0과 gray-100 제거**
   - 이유: Tailwind `gray-100`과 충돌 방지
   - 대신 `gray-5`부터 `gray-95`까지만 사용

2. **CSS 변수 네이밍 유지**
   - `--krds-color-light-*` 유지 (dark 모드에서도)
   - 이유: KRDS 공식 네이밍 규칙 준수

3. **다크 모드 색상 전략**
   - Primary/Secondary/Information: 밝기 반전
   - Gray: 완전 반전 (5↔95, 10↔90)
   - Danger/Warning/Success: 밝기 증가 (가독성)

4. **Tailwind 스케일 매핑 규칙**
   ```
   Tailwind 100 → KRDS 10
   Tailwind 200 → KRDS 20
   Tailwind 300 → KRDS 30
   Tailwind 600 → KRDS 60
   Tailwind 950 → KRDS 95
   ```

#### 사용 예시

```tsx
// KRDS 방식 (권장)
<div className="bg-primary-60 text-gray-10">KRDS 스케일 사용</div>

// Tailwind 방식 (호환)
<div className="bg-primary-600 text-gray-100">Tailwind 스케일 사용</div>

// 둘 다 같은 CSS 변수를 참조하므로 결과 동일
```

#### 다크 모드 자동 전환

```tsx
// 권장: CSS 변수가 자동으로 전환됨
<div className="bg-primary-60 text-gray-10">
  라이트 모드: 진한 파란색 배경 다크 모드: 밝은 파란색 배경
</div>

// 불필요: dark: 접두사 사용할 필요 없음
<div className="bg-primary-60 dark:bg-primary-40">
  CSS 변수가 자동 전환되므로 이렇게 할 필요 없음
</div>
```

**예외**: CSS 변수를 사용하지 않는 Tailwind 유틸리티(`opacity-50`, `shadow-lg`)는 여전히 `dark:` 접두사가 필요합니다.

#### 참고 문서

- 사용자 문서: [apps/docs/src/app/design-tokens/page.tsx](../../apps/docs/src/app/design-tokens/page.tsx) - "KRDS 색상 시스템 통합" 섹션
- 구현 파일:
  - [apps/docs/src/app/globals.css](../../apps/docs/src/app/globals.css)
  - [apps/docs/tailwind.config.ts](../../apps/docs/tailwind.config.ts)

#### 추가 작업 (향후)

- [ ] `@hanui/react` 패키지에도 동일한 색상 시스템 적용
- [ ] KRDS 공식 토큰 업데이트 시 자동 동기화 스크립트 작성
- [ ] 색상 접근성 검사 도구 추가 (WCAG 2.1 AA 준수)

---

## 🧩 HTML 컴포넌트 참고

### 1. 컴포넌트 위치

**경로**: `html/code/`

**구조**:

```
html/code/
├── button/
│   ├── default.html
│   ├── primary.html
│   ├── secondary.html
│   └── styles.css
│
├── input/
│   ├── text.html
│   ├── password.html
│   └── styles.css
│
├── modal/
│   └── ...
│
└── table/
    └── ...
```

### 2. 참고 방법

#### Button 컴포넌트 개발 시

```bash
# 1. KRDS Button HTML 확인
cat html/code/button/default.html

# 2. KRDS 스타일 확인
cat html/code/button/styles.css
```

**KRDS HTML 예시**:

```html
<!-- KRDS 공식 Button 마크업 -->
<button class="krds-button krds-button--primary">버튼</button>
```

**HANUI 변환**:

```tsx
// @hanui/react/src/components/Button.tsx
// KRDS HTML을 React로 변환

export const Button = ({ variant = 'primary', children }) => {
  return (
    <button
      className={cn(
        'krds-button', // KRDS 기본 클래스
        `krds-button--${variant}` // KRDS variant
      )}
    >
      {children}
    </button>
  );
};
```

### 3. 마크업 구조 참고

**KRDS의 접근성 마크업**을 그대로 활용:

```html
<!-- KRDS Modal 예시 -->
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">제목</h2>
  <div>내용</div>
  <button aria-label="닫기">×</button>
</div>
```

---

## 📦 KRDS 패키지 설치

### NPM 패키지 (선택사항)

KRDS HTML Component Kit을 직접 설치할 수도 있습니다:

```bash
# KRDS 공식 패키지 설치 (참고용)
npm install @krds/html-component-kit

# 또는 pnpm
pnpm add @krds/html-component-kit
```

**용도**:

- KRDS HTML 컴포넌트 직접 사용
- 스타일 가져오기
- 참고 자료

**주의**: HANUI는 React로 재구현하므로 직접 사용하지 않음

---

## 🔄 토큰 동기화 워크플로우

### 1. 정기적인 토큰 업데이트 확인

```bash
# 1. KRDS 저장소 최신 버전 확인
cd /path/to/KRDS-uiux
git pull origin main

# 2. 토큰 변경사항 확인
git diff HEAD@{1} tokens/figma_token.json

# 3. 변경사항이 있으면 HANUI 업데이트
```

### 2. HANUI 토큰 업데이트

```bash
# 1. HANUI 저장소로 이동
cd /path/to/hanui

# 2. 토큰 업데이트 브랜치 생성
git checkout -b update/krds-tokens

# 3. colors.ts 업데이트
# packages/core/src/tokens/colors.ts 수정

# 4. 빌드 및 테스트
pnpm build
pnpm lint

# 5. 커밋 및 PR
git commit -m "chore: Update KRDS color tokens to v1.0.x"
```

### 3. 자동화 스크립트 (향후)

```bash
# scripts/sync-krds-tokens.sh

#!/bin/bash
# KRDS Figma 토큰 자동 동기화

KRDS_TOKEN_URL="https://raw.githubusercontent.com/KRDS-uiux/krds-uiux/main/tokens/figma_token.json"

curl -s $KRDS_TOKEN_URL | \
  jq '.color' > /tmp/krds-colors.json

# colors.ts 자동 생성
node scripts/generate-colors.js /tmp/krds-colors.json
```

---

## 📚 작업별 참고 가이드

### Button 컴포넌트 (Issue #7)

1. **KRDS 토큰 확인**:
   - `tokens/figma_token.json` → color.primary, color.secondary
2. **KRDS HTML 확인**:
   - `html/code/button/` → 마크업 구조, 클래스명
3. **HANUI 구현**:
   - `packages/react/src/components/Button/` → React 변환

### Input 컴포넌트 (Issue #8)

1. **KRDS 토큰 확인**:
   - `tokens/figma_token.json` → color.gray, spacing
2. **KRDS HTML 확인**:
   - `html/code/input/` → 폼 요소 마크업
3. **HANUI 구현**:
   - `packages/react/src/components/Input/` → React 변환

### Typography (Issue #5)

1. **KRDS 토큰 확인**:
   - `tokens/figma_token.json` → typography
2. **HANUI 구현**:
   - `packages/core/src/tokens/typography.ts` → 토큰 정의

---

## 체크리스트

### 새 컴포넌트 개발 전

- [ ] KRDS 공식 웹사이트에서 가이드라인 확인
- [ ] `tokens/figma_token.json`에서 관련 토큰 확인
- [ ] `html/code/`에서 HTML 구현 예제 확인
- [ ] KRDS 접근성 요구사항 확인
- [ ] HANUI 컨벤션에 맞게 React 변환

### 토큰 업데이트 시

- [ ] KRDS 저장소 최신 버전 확인
- [ ] `figma_token.json` 변경사항 확인
- [ ] `packages/core/src/tokens/` 업데이트
- [ ] `tailwind.config.ts` 동기화
- [ ] 빌드 및 테스트 통과
- [ ] Breaking changes 문서화

---

## 🔗 유용한 링크

| 리소스            | URL                                                                                        | 용도             |
| ----------------- | ------------------------------------------------------------------------------------------ | ---------------- |
| KRDS 공식 사이트  | https://www.krds.go.kr/                                                                    | 가이드라인, 원칙 |
| KRDS GitHub       | https://github.com/KRDS-uiux/krds-uiux                                                     | 토큰, HTML 코드  |
| Figma 토큰 (Raw)  | [링크](https://raw.githubusercontent.com/KRDS-uiux/krds-uiux/main/tokens/figma_token.json) | 토큰 다운로드    |
| KRDS Releases     | [링크](https://github.com/KRDS-uiux/krds-uiux/releases)                                    | 버전 변경사항    |
| HANUI Core Tokens | [링크](../../packages/core/src/tokens/)                                                    | HANUI 토큰 구현  |

---

## 📝 참고 사항

### KRDS vs HANUI

| 항목        | KRDS            | HANUI              |
| ----------- | --------------- | ------------------ |
| 기술 스택   | HTML + CSS + JS | React + TypeScript |
| 토큰 형식   | JSON (Figma)    | TypeScript 객체    |
| 스타일링    | CSS Classes     | Tailwind CSS + CVA |
| 패키지 형태 | NPM (HTML Kit)  | NPM (@hanui/react) |
| 사용 대상   | 정부 웹사이트   | 정부 React 앱      |

### 라이선스

KRDS는 **공공 저작물**로, 자유롭게 사용 가능합니다.

---

**작성자**: @odada-o
**업데이트**: 2025-11-11
**Status**: KRDS 리소스 가이드 작성 완료

**Next**:

- [ ] KRDS 토큰 자동 동기화 스크립트 작성
- [ ] Typography 토큰 추출 (Issue #5)
- [ ] 컴포넌트별 KRDS HTML 참고 문서 작성
