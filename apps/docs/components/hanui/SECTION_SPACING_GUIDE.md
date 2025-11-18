# KRDS 섹션 간격 시스템 가이드 v2

## 핵심 구조 이해

### 헤딩 레벨별 역할

```tsx
// h2, h3: 섹션 헤더 - 항상 description과 함께
<SectionHeading
  level="h2"
  title="제목"
  description="설명..." // 필수!
/>

// h4, h5: 섹션 내부 항목 - description 없음
<SectionHeading level="h4" title="세부 항목" />
```

### 기본 패턴

```tsx
<Section level="h2">
  {/* 섹션 헤더 */}
  <SectionHeading level="h2" title="개요" description="이 섹션의 설명입니다." />

  {/* 본문 */}
  <p>섹션 내용...</p>

  {/* 서브 섹션 헤더 */}
  <SectionHeading
    level="h3"
    title="주요 기능"
    description="다음 기능을 제공합니다."
  />
  <p>서브 섹션 내용...</p>

  {/* 섹션 내부 항목 */}
  <SectionHeading level="h4" title="설치 방법" />
  <CodeBlock code="npm install" />

  <SectionHeading level="h5" title="추가 옵션" />
  <p>옵션 설명...</p>
</Section>;

{
  /* 다음 섹션 - 자동으로 간격 생김! */
}
<Section level="h2">
  <SectionHeading level="h2" title="설치" description="..." />
  <p>...</p>
</Section>;
```

## 해결 방법: Section + CSS 인접 선택자 ✅

**핵심 아이디어**:

1. **Section 컴포넌트**로 의미있는 단위 묶기
2. **h2, h3**는 항상 description 포함 (섹션 구분)
3. **h4, h5**는 섹션 내부 항목
4. CSS가 자동으로 간격 계산

## 사용 방법

### 1. Import

```tsx
import { Section, SectionHeading } from '@/components/hanui/section-system-v2';
```

### 2. 전형적인 페이지 구조

```tsx
export default function ComponentPage() {
  return (
    <div>
      {/* 섹션 1: 개요 */}
      <Section level="h2">
        <SectionHeading
          level="h2"
          title="개요"
          description="이 컴포넌트의 기본 사용법을 소개합니다."
        />
        <p>컴포넌트 설명...</p>
        <CodeBlock code="import { Button } from '@hanui/react'" />
      </Section>

      {/* 섹션 2: 설치 */}
      <Section level="h2">
        <SectionHeading
          level="h2"
          title="설치"
          description="프로젝트에 컴포넌트를 추가하는 방법입니다."
        />

        {/* 서브 섹션: npm */}
        <SectionHeading
          level="h3"
          title="npm 사용"
          description="npm 패키지 매니저를 사용한 설치 방법입니다."
        />
        <CodeBlock code="npm install @hanui/react" />

        {/* 서브 섹션: yarn */}
        <SectionHeading
          level="h3"
          title="yarn 사용"
          description="yarn 패키지 매니저를 사용한 설치 방법입니다."
        />
        <CodeBlock code="yarn add @hanui/react" />
      </Section>

      {/* 섹션 3: Props */}
      <Section level="h2">
        <SectionHeading
          level="h2"
          title="Props"
          description="사용 가능한 모든 Props를 설명합니다."
        />

        {/* h4 세부 항목들 */}
        <SectionHeading level="h4" title="variant" />
        <p>버튼의 스타일을 결정합니다.</p>
        <CodeBlock code='<Button variant="primary">' />

        <SectionHeading level="h4" title="size" />
        <p>버튼의 크기를 결정합니다.</p>

        <SectionHeading level="h5" title="추가 옵션" />
        <p>더 작은 항목...</p>
      </Section>
    </div>
  );
}
```

### 3. 간단한 사용 (Section 없이)

Section 없이도 사용 가능하지만, 섹션 간 간격이 자동으로 조정되지 않습니다:

```tsx
{/* 이렇게 해도 동작하지만 권장하지 않음 */}
<SectionHeading level="h2" title="제목" description="..." />
<p>내용...</p>
<SectionHeading level="h2" title="제목2" description="..." />
```

## 간격 명세

### Section 간 간격

- **Section 사이**: 32px (모바일) / 48px (데스크톱)

### h2 섹션 헤더 (description 포함)

- **h2 설명 → 본문**: 16px (모바일) / 40px (데스크톱)
- **본문 → 다음 h2**: Section 간격으로 처리

### h3 서브 섹션 헤더 (description 포함)

- **h3 설명 → 본문**: 12px (모바일) / 24px (데스크톱)
- **본문 → h3**: 24px (모바일) / 40px (데스크톱)

### h4 섹션 내부 항목

- **h4 → 본문**: 8px (모바일) / 16px (데스크톱)
- **본문 → h4**: 12px (모바일) / 24px (데스크톱)

### h5 섹션 내부 항목

- **h5 → 본문**: 8px (모바일) / 16px (데스크톱)
- **본문 → h5**: 8px (모바일) / 16px (데스크톱)

## 시각적 예시

```
┌─────────────────────────┐
│ <h2> 개요               │ ← .krds-heading-h2
├─────────────────────────┤
│ 16px (md: 40px) gap     │ ← CSS: .krds-heading-h2 + *
├─────────────────────────┤
│ <p> 콘텐츠...           │
│                         │
├─────────────────────────┤
│ 32px (md: 48px) gap     │ ← CSS: * + .krds-heading-h2
├─────────────────────────┤
│ <h2> 설치               │ ← .krds-heading-h2
├─────────────────────────┤
│ 16px (md: 40px) gap     │
├─────────────────────────┤
│ <p> 콘텐츠...           │
└─────────────────────────┘
```

## 장점

### ✅ 1. 간단한 사용

```tsx
// Section으로 감쌀 필요 없음!
<SectionHeading level="h2" title="제목" />
<p>콘텐츠</p>
```

### ✅ 2. 자동 간격 조절

```tsx
// h2 다음에 h3가 오면 적절한 간격 자동 적용
<SectionHeading level="h2" title="메인 섹션" />
<SectionHeading level="h3" title="서브 섹션" />
```

### ✅ 3. 마크다운 호환

```tsx
// MDX에서도 그대로 사용 가능
<SectionHeading level="h2" title="Overview" />

Lorem ipsum dolor sit amet...

<SectionHeading level="h2" title="Installation" />
```

### ✅ 4. 유지보수 용이

- 간격 수정이 필요하면 `globals.css`만 수정
- 컴포넌트 코드는 건드릴 필요 없음

## CSS 작동 원리

```css
/* h2 다음에 무엇이든 오면 16px 간격 */
.krds-heading-h2 + * {
  margin-top: 1rem;
}

/* h2 다음에 h2가 오면 32px 간격 (우선순위 높음) */
.krds-heading-h2 + .krds-heading-h2 {
  margin-top: 2rem;
}

/* 콘텐츠 다음에 h2가 오면 32px 간격 */
* + .krds-heading-h2 {
  margin-top: 2rem;
}
```

## 마이그레이션 가이드

### 1단계: 기존 컴포넌트 교체

```bash
# 기존 파일
apps/docs/components/hanui/section-header.tsx

# 개선된 파일로 교체
apps/docs/components/hanui/section-heading-improved.tsx
```

### 2단계: Import 경로 변경

```tsx
// Before
import { SectionHeading } from '@/components/hanui/section-header';

// After
import { SectionHeading } from '@/components/hanui/section-heading-improved';
```

### 3단계: 불필요한 wrapper 제거

```tsx
// Before
<div className="mb-8">
  <SectionHeading level="h2" title="제목" />
</div>

// After
<SectionHeading level="h2" title="제목" />
```

## 추가 커스터마이징

특정 케이스에서 간격을 override하고 싶다면:

```tsx
// 특정 섹션만 간격 조정
<SectionHeading
  level="h2"
  title="제목"
  className="!mt-0" // Tailwind의 !important 사용
/>
```

## 요약

| 방법                   | 장점                        | 단점                       |
| ---------------------- | --------------------------- | -------------------------- |
| **개별 margin** ❌     | 직관적                      | 섹션 구분 안됨, 코드 중복  |
| **Stack variant** ❌   | 타입 안전                   | 조합 폭발, 복잡함          |
| **Section wrapper** △  | 명확한 구조                 | 번거로움, 마크다운 호환성↓ |
| **CSS 인접 선택자** ✅ | 자동화, 간단, 유지보수 용이 | -                          |

**결론**: CSS 인접 선택자를 활용한 자동 간격 시스템이 가장 우수합니다! 🎉
