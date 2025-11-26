# KRDS 디지털 포용 (Digital Inclusion)

> 모든 사용자를 포용하는 접근 가능한 디지털 서비스 설계

---

## 📖 핵심 목표

**"모든 사용자가 동등하게 이용할 수 있는 디지털 정부 서비스"**

장애인, 고령자, 어린이, 외국인을 포함한 모든 사용자가 정부 서비스에 차별 없이 접근하고 이용할 수 있어야 합니다.

---

## 🎯 설계 원칙

### 1. 다양한 사용자 우선 고려

접근성은 "장애인만을 위한 것"이 아닙니다. 다음 모든 사용자를 고려해야 합니다:

#### 장애 유형별 고려사항

| 장애 유형     | 특성                 | 필요 지원                      |
| ------------- | -------------------- | ------------------------------ |
| **시각 장애** | 전맹, 저시력         | 스크린 리더, 확대, 고대비      |
| **청각 장애** | 난청, 전농           | 자막, 수어 영상                |
| **신체 장애** | 지체 장애, 손 떨림   | 키보드 전용 탐색, 큰 터치 영역 |
| **인지 장애** | 학습 장애, 언어 장애 | 명확한 언어, 단순한 구조       |

#### 기타 디지털 취약계층

- **고령자**: 작은 글씨, 복잡한 UI에 어려움
- **어린이**: 추상적 개념 이해 어려움
- **외국인**: 한국어 비능숙자
- **일시적 장애**: 한 손 사용, 밝은 햇빛 아래 사용 등

---

## 🌟 KRDS의 포용적 구성 요소

### 1. 선명한 화면 모드 (High Contrast Mode)

**목적:** 저시력 사용자 및 저조도 환경 사용자의 가독성 향상

**구현:**

```css
/* 어두운 배경 + 밝은 전경 */
background: #000000;
color: #ffffff;

/* 최소 대비 비율 */
contrast-ratio: 7:1; /* WCAG AAA 기준 */
```

**적용 대상:**

- 텍스트 콘텐츠
- 버튼 및 링크
- 폼 요소 경계선
- 아이콘

---

### 2. 언어 변경 (Language Selector)

**목적:** 한국어 비능숙 사용자의 서비스 접근성 보장

**필수 요구사항:**

- 언어 변경 버튼 명확한 위치 (헤더 영역)
- 언어 코드 표시 (예: `KO`, `EN`, `中`)
- `lang` 속성 올바른 설정

```html
<html lang="ko">
  <button aria-label="언어 변경">
    <span lang="en">EN</span>
  </button>
</html>
```

---

### 3. 화면 크기 조정 (Text Zoom)

**목적:** 저시력 사용자 및 고령자의 가독성 향상

**구현 방식:**

```typescript
// 텍스트 크기 단계
const textSizeOptions = {
  small: '0.875rem', // 14px
  normal: '1rem', // 16px (기본)
  larger: '1.125rem', // 18px
  large: '1.25rem', // 20px
  largest: '1.5rem', // 24px
};
```

**주의사항:**

- 디바이스 브라우저 설정과 독립적으로 작동
- 레이아웃 깨짐 없이 200%까지 확대 가능
- `rem` 단위 사용 필수

---

### 4. 접근 가능한 미디어

#### 정지 이미지

**정보 전달용 이미지:**

```html
<!-- 올바른 예 -->
<img src="chart.png" alt="2024년 월별 매출 현황: 1월 100만원, 2월 120만원..." />

<!-- 잘못된 예 -->
<img src="chart.png" alt="차트" />
```

**장식용 이미지:**

```html
<!-- 올바른 예 -->
<img src="decoration.png" alt="" role="presentation" />

<!-- 잘못된 예 -->
<img src="decoration.png" alt="장식 이미지" />
```

#### 멀티미디어

**필수 제공 항목:**

1. **자막 (Captions)**: 모든 음성 내용을 텍스트로 제공
2. **오디오 설명 (Audio Description)**: 시각적 정보를 음성으로 설명
3. **컨트롤 제공**: 재생, 일시정지, 음량 조절
4. **자동 재생 금지**: 사용자 동의 없이 재생 불가

```html
<video controls>
  <source src="video.mp4" type="video/mp4" />
  <track
    kind="captions"
    src="captions-ko.vtt"
    srclang="ko"
    label="한국어 자막"
  />
  <track
    kind="descriptions"
    src="descriptions-ko.vtt"
    srclang="ko"
    label="오디오 설명"
  />
</video>
```

---

## 🛠️ 스타일 기반 접근성

### 색상 및 명도 대비

**핵심 원칙:**

> 색상으로만 정보를 전달하지 않기

**필수 대비 비율:**

| 요소 유형               | 최소 대비 (AA) | 권장 대비 (AAA) |
| ----------------------- | -------------- | --------------- |
| 본문 텍스트 (14px 이상) | 4.5:1          | 7:1             |
| 큰 텍스트 (18px 이상)   | 3:1            | 4.5:1           |
| UI 컴포넌트 경계        | 3:1            | -               |
| 그래픽 요소             | 3:1            | -               |

**예시:**

```css
/* 충분한 대비 */
background: #ffffff; /* 흰색 */
color: #000000; /* 검정 - 21:1 대비 */

/* 불충분한 대비 */
background: #f0f0f0; /* 밝은 회색 */
color: #e0e0e0; /* 더 밝은 회색 - 1.2:1 대비 */
```

**색각이상자 고려:**

- 빨강-초록 구분 어려움 → 밝기 차이로도 구분 가능하게
- 파랑-노랑 구분 어려움 → 패턴이나 아이콘 병행

---

### 타이포그래피

**가독성 높은 설계:**

```css
body {
  font-family:
    'Pretendard',
    -apple-system,
    sans-serif;
  font-size: 1rem; /* 16px 기본 */
  line-height: 1.6; /* 줄 간격 160% */
  letter-spacing: -0.01em; /* 자간 약간 좁게 */
}

h1 {
  font-size: 2rem; /* 32px */
  font-weight: 700;
  line-height: 1.3;
}

p {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
  margin-bottom: 1rem;
}
```

---

### 레이아웃

**일관된 구조:**

- 논리적인 읽기 순서
- 예측 가능한 요소 배치
- 충분한 여백 (최소 8px 간격)

**반응형 그리드:**

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  padding: 16px;
}

@media (min-width: 1024px) {
  .container {
    padding: 24px;
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

---

## HANUI 자동화 항목

HANUI 컴포넌트는 다음 디지털 포용 요구사항을 자동으로 처리합니다:

### 자동 처리 ✅

- **색상 대비**: Color Token에서 4.5:1 이상 자동 보장
- **확대 지원**: `rem` 단위 사용으로 200% 확대 가능
- **키보드 접근**: 모든 인터랙티브 요소 키보드로 조작 가능
- **초점 표시**: 명확한 포커스 링 자동 표시
- **ARIA 레이블**: 아이콘 버튼에 자동 `aria-label` 추가

### 개발자 확인 필요 ⚠️

- **이미지 대체 텍스트**: 의미 있는 `alt` 작성
- **비디오 자막**: 자막 파일 제공
- **언어 속성**: `lang` 속성 설정
- **제목 구조**: `h1`~`h6` 올바른 사용

---

## 📋 체크리스트

### 디지털 포용 검증 항목

- [ ] 명도 대비 4.5:1 이상 (본문 텍스트)
- [ ] 명도 대비 3:1 이상 (UI 컴포넌트)
- [ ] 색상으로만 정보 전달하지 않음
- [ ] 모든 이미지에 적절한 `alt` 속성
- [ ] 장식용 이미지는 `alt=""` 또는 `role="presentation"`
- [ ] 비디오에 자막 제공
- [ ] 자동 재생 미디어 없음
- [ ] 텍스트 200% 확대 가능
- [ ] 키보드만으로 모든 기능 사용 가능
- [ ] 초점 표시 명확함
- [ ] 언어 속성 (`lang`) 올바르게 설정
- [ ] 논리적인 제목 구조 (`h1`~`h6`)

---

## 🔗 관련 문서

- [색상 및 명도 대비](./03-color-contrast.md)
- [타이포그래피](./04-typography.md)
- [이미지 및 미디어](./08-media.md)
- [전체 체크리스트](./checklist.md)

---

## 📚 참고 자료

- [KRDS 디지털 포용](https://www.krds.go.kr/html/site/utility/utility_04.html)
- [WCAG 2.1 Understanding](https://www.w3.org/WAI/WCAG21/Understanding/)
- [WebAIM Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

**작성일:** 2025-11-14
**출처:** KRDS 공식 사이트
**관리:** HANUI 개발팀
