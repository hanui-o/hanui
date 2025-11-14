# TOC (Table of Contents) 기능 가이드

## 개요

HANUI 문서 사이트의 TOC(목차) 기능은 페이지의 제목 구조를 자동으로 추출하여 우측 사이드바에 표시하는 네비게이션 기능입니다. 사용자가 긴 문서를 빠르게 탐색할 수 있도록 돕습니다.

## 핵심 구성 요소

### 1. Heading 컴포넌트

**위치**: `packages/react/src/components/Heading/Heading.tsx`

Heading 컴포넌트는 TOC 기능의 기반이 되는 컴포넌트입니다.

#### 주요 기능

1. **자동 ID 생성**
   - `id` prop이 제공되지 않으면 children 텍스트로부터 자동으로 URL-friendly ID 생성
   - 한글, 영문, 숫자를 지원하며 공백은 하이픈(-)으로 변환

```typescript
function generateId(text: React.ReactNode): string {
  if (typeof text === 'string') {
    return text
      .toLowerCase()
      .replace(/[^\w\s가-힣-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  return '';
}
```

2. **시맨틱 HTML 렌더링**
   - `level` prop에 따라 실제 `<h1>` ~ `<h6>` 태그로 렌더링
   - SEO와 접근성을 보장

```tsx
<Heading level="h2" id="overview">
  개요
</Heading>
// 렌더링 결과: <h2 id="overview">개요</h2>
```

### 2. PageNav 컴포넌트

**위치**: `apps/docs/src/components/navigation/PageNav.tsx`

페이지 우측에 표시되는 TOC 네비게이션 컴포넌트입니다.

#### 주요 기능

1. **헤딩 추출**
   - `h2[id]` 태그만 추출하여 TOC 구성
   - 페이지의 주요 섹션만 표시하여 깔끔한 네비게이션 제공

```typescript
const elements = document.querySelectorAll('h2[id]');
const items: NavItem[] = Array.from(elements).map((element) => ({
  id: element.id,
  title: element.textContent || '',
  level: parseInt(element.tagName.substring(1)),
}));
```

2. **활성 섹션 하이라이팅**
   - Intersection Observer API를 사용하여 현재 뷰포트에 보이는 섹션 감지
   - 활성 섹션은 파란색으로 강조 표시

```typescript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveId(entry.target.id);
      }
    });
  },
  {
    rootMargin: '-80px 0px -80% 0px',
  }
);
```

3. **스무스 스크롤**
   - TOC 링크 클릭 시 해당 섹션으로 부드럽게 스크롤

```typescript
document.getElementById(heading.id)?.scrollIntoView({
  behavior: 'smooth',
  block: 'start',
});
```

4. **반응형 표시**
   - XL 화면 이상(`xl:block`)에서만 표시
   - 모바일/태블릿에서는 숨김 처리

## 사용 방법

### 페이지에서 TOC 사용하기

1. **Heading 컴포넌트 사용**

```tsx
import { Heading } from '@hanui/react';

export default function MyPage() {
  return (
    <>
      {/* h2 제목 - TOC에 표시됨 */}
      <Heading level="h2" id="section-1">
        첫 번째 섹션
      </Heading>

      {/* id를 생략하면 자동 생성 */}
      <Heading level="h2">두 번째 섹션</Heading>

      {/* h3 제목 - TOC에 표시되지 않음 (h2만 표시) */}
      <Heading level="h3">세부 항목</Heading>
    </>
  );
}
```

2. **PageNav 컴포넌트 포함**

PageNav는 DocsLayout에서 자동으로 포함되므로 별도로 추가할 필요가 없습니다.

```tsx
// apps/docs/src/app/layout.tsx
<DocsLayout>
  <PageContent />
  <PageNav /> {/* 자동으로 포함됨 */}
</DocsLayout>
```

### ID 명명 규칙

1. **명시적 ID 제공**
   - 영문 소문자와 하이픈 사용
   - 의미있고 간결한 이름 사용

```tsx
<Heading level="h2" id="overview">개요</Heading>
<Heading level="h2" id="getting-started">시작하기</Heading>
<Heading level="h2" id="api-reference">API 참조</Heading>
```

2. **자동 생성 ID**
   - 한글 제목의 경우 자동 생성 활용
   - 한글은 로마자로 변환되지 않고 그대로 유지됨

```tsx
<Heading level="h2">사용 가이드라인</Heading>
// 생성되는 ID: "사용-가이드라인"
```

## 스타일링

### TOC 항목 스타일

- **h2**: 왼쪽 패딩 `pl-3` (12px)
- 왼쪽 보더로 시각적 구분
- 활성 항목은 파란색 강조

```tsx
<a className="block py-1 transition-colors border-l-2 pl-3">{heading.title}</a>
```

### 활성 상태 스타일

```tsx
{
  isActive
    ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-medium'
    : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400';
}
```

## 접근성

### WCAG 2.1 AA 준수

1. **시맨틱 HTML**
   - 실제 `<h2>`, `<h3>` 태그 사용
   - 스크린 리더가 문서 구조를 정확히 파악 가능

2. **키보드 네비게이션**
   - Tab 키로 TOC 링크 간 이동 가능
   - Enter 키로 섹션 이동

3. **포커스 표시**
   - 키보드 포커스 시 명확한 시각적 피드백

4. **명암비**
   - 텍스트와 배경 간 4.5:1 이상 명암비 유지

## 문제 해결

### TOC가 표시되지 않는 경우

1. **Heading 컴포넌트 사용 확인**

   ```tsx
   // ❌ 잘못된 방법
   <h2>제목</h2>

   // ✅ 올바른 방법
   <Heading level="h2">제목</Heading>
   ```

2. **ID 존재 확인**
   - Heading 컴포넌트는 자동으로 ID를 생성하므로 문제 없음
   - 하지만 명시적으로 `id=""` 빈 문자열을 전달하면 작동하지 않음

3. **화면 크기 확인**
   - TOC는 XL 화면 이상에서만 표시됨
   - 개발자 도구에서 뷰포트를 1280px 이상으로 설정

### 스크롤이 부드럽지 않은 경우

브라우저의 `scroll-behavior: smooth` 설정을 확인하세요.

```css
/* global.css */
html {
  scroll-behavior: smooth;
}
```

### Intersection Observer 작동 문제

1. **rootMargin 조정**
   - 헤더 높이에 따라 조정 필요
   - 현재 설정: `-80px 0px -80% 0px`

2. **브라우저 호환성**
   - 모던 브라우저에서만 지원
   - 필요 시 polyfill 추가

## 설계 결정

### h2만 TOC에 표시하는 이유

1. **가독성**: 너무 많은 항목은 오히려 네비게이션을 복잡하게 만듦
2. **일관성**: 주요 섹션(h2)만 표시하여 페이지 구조를 명확히 파악
3. **간결성**: XL 화면의 제한된 공간에서 효율적인 표시
4. **사용성**: h3는 페이지 내에서 스크롤로 탐색하는 것이 더 자연스러움

## 향후 개선 사항

### 1. h3 토글 옵션 추가

필요 시 h3를 접기/펼치기 형태로 표시하는 옵션 제공

```typescript
// 예시: h2 클릭 시 하위 h3 표시
const [expandedSections, setExpandedSections] = useState<string[]>([]);
```

### 2. TOC 접기/펼치기 기능

긴 문서의 경우 섹션별로 접기/펼치기 기능 추가 고려

### 3. 모바일 TOC

모바일에서도 사용할 수 있는 드롭다운 형태의 TOC 추가

### 4. 진행률 표시

스크롤 진행률을 TOC에 시각적으로 표시

## 참고 자료

- [Intersection Observer API - MDN](https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API)
- [Scroll-behavior - MDN](https://developer.mozilla.org/ko/docs/Web/CSS/scroll-behavior)
- [KRDS 접근성 가이드라인](https://www.krds.go.kr/)
- [WCAG 2.1 - W3C](https://www.w3.org/WAI/WCAG21/quickref/)

---

**작성일**: 2025-11-14
**관리**: HANUI 개발팀
**버전**: 1.0.0
