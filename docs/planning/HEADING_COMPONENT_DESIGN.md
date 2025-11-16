# Heading 컴포넌트 설계 문서

## 현재 상황 분석

### 사용 패턴

- **PageHeader**: h1 + description (페이지 최상단)
- **PageSection 내부**: h2, h3 사용하지만 설명이 일관되지 않음
  - h2: 때때로 설명 있음
  - h3: 설명 없음 (mb-3만 적용)

### KRDS 타이포그래피 가이드 기준

이미지 가이드에 따르면:

- **H1**: `title-body-large` (24px 간격)
- **H2**: `title-body-medium` (20px 간격)
- **H3**: `h3-h4` (24px 간격) - 설명 없음, 다음 heading까지
- **H4**: `title-body-medium` (20px 간격)
- **H5**: `title-body-small` (16px 간격)

## 설계 질문에 대한 답변

### 1. h3도 설명을 만들어야 하는가?

**결론: 네, 일관성을 위해 h3도 설명을 지원해야 합니다.**

**이유:**

- 현재 코드에서 h3도 설명이 필요한 경우가 있음 (예: breakpoints 페이지)
- 일관된 API를 제공하면 개발자 경험이 향상됨
- KRDS 가이드에서 h3는 설명 없이 다음 heading으로 가지만, 실제 사용에서는 설명이 필요한 경우가 많음
- 선택적으로 사용할 수 있도록 하면 유연성 확보

**제안:**

- h3도 `description` prop을 선택적으로 받을 수 있도록 설계
- description이 없으면 KRDS 가이드대로 `h3-h4` 간격 적용
- description이 있으면 `title-body-medium` 간격 적용

### 2. 컴포넌트 이름 패턴

**추천 옵션:**

#### 옵션 A: `SectionHeader` (추천)

```tsx
<SectionHeader level="h2" title="개요" description="..." />
```

- **장점**:
  - PageHeader와 대응되는 명확한 네이밍
  - 섹션 내부에서 사용한다는 의미가 명확
  - 간결하고 직관적
- **단점**: 없음

#### 옵션 B: `ContentHeader`

```tsx
<ContentHeader level="h2" title="개요" description="..." />
```

- **장점**: 콘텐츠 영역의 헤더라는 의미
- **단점**: SectionHeader보다 덜 구체적

#### 옵션 C: `HeadingWithDescription`

```tsx
<HeadingWithDescription level="h2" title="개요" description="..." />
```

- **장점**: 기능이 명확함
- **단점**: 이름이 길고, description이 선택적일 때 혼란 가능

**최종 추천: `SectionHeader`**

- PageHeader와의 대응 관계가 명확
- 간결하고 직관적
- 섹션 내부 사용이라는 컨텍스트가 명확

### 3. 각각 만들지 vs 한 곳에 몰아서?

**결론: 한 컴포넌트로 통합 (level prop 사용)**

**이유:**

- 코드 중복 방지
- 일관된 API 제공
- 유지보수 용이
- 타입 안정성 확보 (level을 union type으로 제한)

**구조:**

```tsx
<SectionHeader
  level="h1" | "h2" | "h3" | "h4" | "h5"
  title: string
  description?: string
  id?: string
/>
```

## 컴포넌트 설계

### API 설계

```tsx
interface SectionHeaderProps {
  /**
   * Heading 레벨 (h1-h5)
   */
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

  /**
   * 제목 텍스트
   */
  title: string;

  /**
   * 설명 텍스트 (선택사항)
   * 제공되면 title-body-* 간격 적용
   * 없으면 heading-* 간격 적용
   */
  description?: string;

  /**
   * HTML id 속성 (선택사항)
   * 앵커 링크 및 목차 생성에 사용
   */
  id?: string;

  /**
   * 커스텀 설명 콘텐츠 (description 대신 사용 가능)
   */
  children?: ReactNode;
}
```

### 간격 로직

```tsx
// description이 있는 경우
h1 + description: spacing="title-body-large" (24px)
h2 + description: spacing="title-body-medium" (20px)
h3 + description: spacing="title-body-medium" (20px) // 일관성을 위해
h4 + description: spacing="title-body-medium" (20px)
h5 + description: spacing="title-body-small" (16px)

// description이 없는 경우
h1 → h2: spacing="h1-h2" (48px)
h2 → h3: spacing="h2-h3" (40px)
h3 → h4: spacing="h3-h4" (24px)
h4 → h5: spacing="h4-h5" (16px)
```

### 구현 예시

```tsx
export function SectionHeader({
  level,
  title,
  description,
  id,
  children,
}: SectionHeaderProps) {
  const spacing =
    description || children ? getTitleBodySpacing(level) : undefined;

  return (
    <Stack spacing={spacing}>
      <Heading level={level} id={id}>
        {title}
      </Heading>
      {description && <Body className="text-krds-gray-70">{description}</Body>}
      {children}
    </Stack>
  );
}

function getTitleBodySpacing(level: string): string {
  const spacingMap = {
    h1: 'title-body-large',
    h2: 'title-body-medium',
    h3: 'title-body-medium', // 일관성
    h4: 'title-body-medium',
    h5: 'title-body-small',
  };
  return spacingMap[level] || 'title-body-medium';
}
```

## 마이그레이션 계획

### 1단계: SectionHeader 컴포넌트 생성

- `apps/docs/src/components/content/SectionHeader.tsx` 생성
- 위 설계대로 구현

### 2단계: 기존 코드 마이그레이션

- spacing 페이지부터 시작
- h2, h3를 SectionHeader로 교체
- description이 없는 경우도 SectionHeader 사용 (description prop 없이)

### 3단계: 다른 페이지 확장

- breakpoints, border-radius, typography 페이지에도 적용
- 일관된 패턴 확립

### 4단계: PageHeader와의 관계 정리

- PageHeader는 페이지 최상단 전용으로 유지
- SectionHeader는 섹션 내부에서 사용

## 사용 예시

### Before (현재)

```tsx
<PageSection>
  <Heading level="h2" id="overview">
    개요
  </Heading>
  <Body className="mb-4">설명 텍스트...</Body>

  <Heading level="h3" className="mb-3">
    서브 섹션
  </Heading>
  {/* 설명 없음 */}
</PageSection>
```

### After (제안)

```tsx
<PageSection>
  <SectionHeader
    level="h2"
    id="overview"
    title="개요"
    description="설명 텍스트..."
  />

  <SectionHeader
    level="h3"
    title="서브 섹션"
    // description 없으면 자동으로 h3-h4 간격 적용
  />
</PageSection>
```

## 장점 요약

1. **일관성**: 모든 heading 레벨에 대해 동일한 API 제공
2. **유연성**: description 선택적 사용 가능
3. **유지보수성**: 한 곳에서 관리, 변경 시 모든 곳에 반영
4. **타입 안정성**: level을 union type으로 제한
5. **개발자 경험**: 간결하고 직관적인 API

## 구현 완료 ✅

### 완료된 작업

- ✅ `SectionHeader` 컴포넌트 생성 (`apps/docs/src/components/content/SectionHeader.tsx`)
- ✅ spacing 페이지에 적용 완료
  - 모든 h2, h3를 SectionHeader로 교체
  - description이 있는 경우 title-body-\* 간격 자동 적용
  - description이 없는 경우 Heading만 반환 (부모에서 간격 관리)

### 구현 세부사항

- description이 있으면: Stack으로 감싸서 title-body-\* 간격 적용
- description이 없으면: Stack 없이 Heading만 반환 (부모에서 heading-\* 간격 관리)
- KRDS 가이드 준수: description이 없을 때는 다음 요소와의 간격을 부모에서 관리

### 사용 예시

```tsx
// 설명과 함께
<SectionHeader
  level="h2"
  id="overview"
  title="개요"
  description="이 섹션에 대한 설명입니다."
/>

// 설명 없이
<SectionHeader
  level="h3"
  title="서브 섹션"
/>

// 커스텀 설명
<SectionHeader level="h2" title="고급 기능">
  <Body className="text-krds-gray-70">
    커스텀 내용 <strong>강조</strong> 가능
  </Body>
</SectionHeader>
```
