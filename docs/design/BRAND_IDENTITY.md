# HANUI 브랜드 아이덴티티

**작성일**: 2025-11-15
**작성자**: @odada-o
**상태**: ✅ 작성 완료

---

## 📋 목차

1. [로고 시스템](#로고-시스템)
2. [심볼 디자인](#심볼-디자인)
3. [색상 의미](#색상-의미)
4. [사용 가이드](#사용-가이드)

---

## 🎨 로고 시스템

### 1. 심볼 구조

HANUI 로고는 2x2 그리드로 배열된 4개의 사각형으로 구성되어 있습니다.

```
┌─────────────┐
│  🔵  ⚫     │  (Top-left: Primary, Top-right: Black)
│  ⚫  ⚫     │  (Bottom-left: Black, Bottom-right: Black)
└─────────────┘
```

### 2. 각 요소의 의미

4개의 사각형은 HANUI의 핵심 가치를 상징합니다:

| 위치            | 색상              | 의미                              | 설명                                                                    |
| --------------- | ----------------- | --------------------------------- | ----------------------------------------------------------------------- |
| **왼쪽 위**     | Primary (#0b50d0) | **사용자** (People/Accessibility) | HANUI의 최우선 가치. 국민이 공공 서비스에 쉽게 접근할 수 있도록 돕는다. |
| **오른쪽 위**   | Black (#111827)   | **정부** (Government/Trust)       | 공공 서비스의 주체. 신뢰성과 공식성을 나타낸다.                         |
| **왼쪽 아래**   | Black (#111827)   | **디자인** (Design/Consistency)   | KRDS 디자인 시스템. 일관성 있는 사용자 경험을 제공한다.                 |
| **오른쪽 아래** | Black (#111827)   | **기술** (Technology/System)      | React 컴포넌트 라이브러리. 현대적인 웹 기술을 활용한다.                 |

### 3. 왜 왼쪽 위에 Primary 색상을 넣었나?

**핵심 메시지**: "사용자가 먼저다"

1. **가치 우선순위**
   - HANUI의 궁극적 목적은 사용자(국민)를 위한 것
   - 정부, 디자인, 기술은 모두 사용자를 돕기 위한 도구

2. **시각적 계층**
   - 왼쪽 위는 한글과 영문 모두에서 읽기 시작점 (F-pattern)
   - 가장 먼저 시선이 가는 위치에 핵심 가치를 배치

3. **접근성 AA 등급**
   - 사용자 중심 설계가 HANUI의 핵심 강점
   - 모든 사람이 쉽게 사용할 수 있는 UI 컴포넌트 제공

4. **KRDS 철학과의 일치**
   - 한국형 디자인 시스템의 핵심은 "국민을 위한 디지털 서비스"
   - 사용자 경험을 최우선으로 하는 설계 원칙

---

## 🎨 색상 의미

### Primary Blue (#0b50d0)

- **KRDS 공식 Primary 색상**
- **의미**: 신뢰, 안정성, 공공성
- **사용**: 사용자 중심 가치를 강조할 때

### Black (#111827)

- **의미**: 전문성, 공식성, 견고함
- **사용**: 정부, 디자인 시스템, 기술적 측면

---

## 🎨 심볼 디자인

### SVG 구조

```svg
<svg viewBox="0 0 24 24">
  <!-- 테두리 -->
  <rect x="1" y="1" width="22" height="22" rx="4" stroke="currentColor" />

  <!-- 왼쪽 위: 사용자 (Primary) -->
  <rect x="5" y="5" width="6" height="6" fill="#0b50d0" />

  <!-- 오른쪽 위: 정부 -->
  <rect x="13" y="5" width="6" height="6" fill="currentColor" />

  <!-- 왼쪽 아래: 디자인 -->
  <rect x="5" y="13" width="6" height="6" fill="currentColor" />

  <!-- 오른쪽 아래: 기술 -->
  <rect x="13" y="13" width="6" height="6" fill="currentColor" />
</svg>
```

### 파일 위치

- **컴포넌트**: `apps/docs/src/components/layout/Logo.tsx`
- **파비콘**: `apps/docs/public/favicon.svg`
- **OG 이미지**: `apps/docs/public/og-image.svg`

---

## 📐 사용 가이드

### 1. Logo 컴포넌트

```tsx
import { Logo } from '@/components/layout/Logo';

// 기본 사용
<Logo />

// 크기 조정
<Logo width={32} height={32} />

// 다크 모드 자동 대응
<Logo className="text-gray-900 dark:text-gray-100" />
```

### 2. 색상 변형

**라이트 모드**:

- Primary 사각형: `#0b50d0` (KRDS Primary 60)
- 나머지 사각형: `currentColor` (보통 검정)

**다크 모드**:

- Primary 사각형: `#4c87f6` (밝은 파란색, KRDS Primary 60 Dark)
- 나머지 사각형: `currentColor` (보통 흰색)

### 3. 최소 크기

- **웹**: 24px × 24px
- **모바일**: 32px × 32px
- **인쇄물**: 10mm × 10mm

### 4. 금지 사항

❌ Primary 색상을 다른 사각형에 적용
❌ 사각형의 순서나 배치 변경
❌ 로고 비율 왜곡
❌ Primary 색상을 임의의 색으로 변경 (KRDS 색상만 사용)

---

## 🎯 브랜드 메시지

### 핵심 가치

1. **사용자 중심** (User-First)
   - 모든 결정의 기준은 사용자 경험
   - 접근성과 사용성을 최우선으로

2. **공공성** (Public Service)
   - 정부 서비스를 위한 디자인 시스템
   - 국민 모두가 쉽게 사용할 수 있도록

3. **일관성** (Consistency)
   - KRDS 기반의 통일된 디자인
   - 예측 가능한 사용자 경험

4. **현대성** (Modern Technology)
   - React 기반 컴포넌트
   - 최신 웹 표준 준수

### 슬로건 (제안)

> **"사용자를 위한, 정부를 위한 디자인 시스템"**
>
> **"KRDS 기반 공공 웹 UI 컴포넌트 라이브러리"**

---

## 📚 참고 자료

### 관련 문서

- [KRDS 리소스 가이드](./KRDS_RESOURCES.md)
- [색상 시스템](./KRDS_RESOURCES.md#4-krdstailwind-색상-시스템-통합)
- [디자인 토큰](../../apps/docs/src/app/design-tokens/page.tsx)

### 구현 파일

- [Logo.tsx](../../apps/docs/src/components/layout/Logo.tsx)
- [favicon.svg](../../apps/docs/public/favicon.svg)
- [og-image.svg](../../apps/docs/public/og-image.svg)

---

**변경 이력**:

- 2025-11-15: 초안 작성, 로고 심볼 의미 정의
- 2025-11-15: Primary 색상 적용 (왼쪽 위 사각형)

**다음 작업**:

- [ ] 로고 사용 가이드 확장 (간격, 배치 등)
- [ ] 브랜드 컬러 팔레트 정의
- [ ] 타이포그래피 브랜드 가이드
- [ ] 일러스트레이션 스타일 가이드
