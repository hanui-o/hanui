# 페이지 구조 가이드 (Page Structure Guide)

> HANUI 문서 사이트의 일관된 페이지 구조와 레이아웃 패턴

---

## 📖 개요

HANUI 문서 사이트는 **컨텍스트 기반 간격 시스템**을 활용하여 일관된 페이지 구조를 제공합니다. 모든 페이지는 동일한 패턴을 따르며, KRDS 접근성 지침을 준수합니다.

---

## 🏗️ 기본 페이지 구조

### 1. 최상위 구조

모든 페이지는 **React Fragment**(`<>`)로 시작합니다:

```tsx
export default function ComponentPage() {
  return (
    <>
      {/* 페이지 헤더 */}
      <PageHeader title="페이지 제목" description="페이지 설명" />

      {/* 섹션들 */}
      <PageSection>{/* 섹션 내용 */}</PageSection>

      <PageSection>{/* 섹션 내용 */}</PageSection>
    </>
  );
}
```

**핵심 원칙:**

- 최상위는 빈 `<>` 태그 (Fragment) 사용
- 섹션 구분은 `PageSection` 컴포넌트로 분리
- 추가 컨테이너 래퍼 불필요

---

## 📦 핵심 컴포넌트

### PageHeader

**목적:** 페이지의 제목과 설명 제공

**위치:** 페이지 최상단 (Fragment 바로 아래)

**Props:**

```typescript
interface PageHeaderProps {
  title: string; // 페이지 제목 (h1)
  description: string; // 페이지 설명
}
```

**예시:**

```tsx
<PageHeader
  title="Button (버튼)"
  description="사용자 액션을 트리거하는 인터랙티브 컴포넌트입니다."
/>
```

**자동 제공:**

- h1 제목의 시맨틱 구조
- 일관된 상단 여백
- 제목-설명 간격 (Stack 내부 사용)

---

### PageSection

**목적:** 페이지의 주요 섹션 구분 및 자동 간격 제공

**위치:** 각 독립적인 콘텐츠 블록

**자동 간격:**

```css
/* Tailwind 클래스: mb-10 md:mb-20 */
margin-bottom: 40px; /* Mobile */
margin-bottom: 80px; /* Desktop (768px+) */
```

**예시:**

```tsx
{
  /* 섹션 1: 개요 */
}
<PageSection>
  <Stack spacing="heading-content">
    <Heading level="h2">개요</Heading>
    <Body>컴포넌트 설명...</Body>
  </Stack>
</PageSection>;

{
  /* 섹션 2: 설치 */
}
<PageSection>
  <Installation componentName="button" />
</PageSection>;

{
  /* 섹션 3: 사용법 */
}
<PageSection>
  <Stack spacing="heading-content">
    <Heading level="h2">Usage</Heading>
    <CodeBlock code="..." />
  </Stack>
</PageSection>;
```

**특징:**

- 섹션 간 일관된 수직 간격 (40px/80px)
- 반응형 간격 자동 처리
- 추가 마진 불필요

---

### Stack

**목적:** 컨텍스트 기반 컴포넌트 간격 제공

**주요 간격 유형:**

| spacing 값        | 모바일 | 데스크톱 | 사용 예시                         |
| ----------------- | ------ | -------- | --------------------------------- |
| `heading-content` | 12px   | 20px     | 제목 + 본문/코드                  |
| `heading-tight`   | 8px    | 12px     | 소제목 + 설명                     |
| `content`         | 16px   | 24px     | 본문 단락 간                      |
| `content-loose`   | 24px   | 32px     | 큰 콘텐츠 블록 간                 |
| `compact`         | 8px    | 8px      | 밀집된 항목들                     |
| `section`         | 40px   | 80px     | 대형 섹션 간 (PageSection과 동일) |

**예시:**

```tsx
{
  /* 제목 + 콘텐츠 */
}
<Stack spacing="heading-content">
  <Heading level="h2">제목</Heading>
  <Body>내용...</Body>
</Stack>;

{
  /* 소제목 + 예시 */
}
<Stack spacing="heading-tight">
  <Heading level="h3">예시</Heading>
  <ComponentPreview>
    <Button>버튼</Button>
  </ComponentPreview>
</Stack>;

{
  /* 여러 콘텐츠 블록 */
}
<Stack spacing="content">
  <GuidelineSection type="do">...</GuidelineSection>
  <GuidelineSection type="dont">...</GuidelineSection>
</Stack>;
```

---

## 🎯 페이지 구조 패턴

HANUI 문서 사이트의 모든 페이지는 **3가지 핵심 패턴**으로 구성됩니다.

---

### 패턴 1: h2 단독 섹션

**언제 사용:** h2 제목과 설명만 있는 간단한 섹션

```tsx
<PageSection>
  <Stack spacing="heading-content">
    {' '}
    {/* 12px/20px */}
    <Heading level="h2">개요</Heading>
    <Body>컴포넌트 설명...</Body>
  </Stack>
</PageSection>
```

**간격:**

- h2 → Body: `heading-content` (12px/20px)

**사용 예:**

- 개요 (Overview)
- 설치 (Installation)
- 사용법 (Usage) - 코드만 있는 경우

---

### 패턴 2: h2 + 여러 h3 (설명형)

**언제 사용:** h2 아래 여러 h3 소제목이 있고, 각각 설명/리스트가 있는 경우

```tsx
<PageSection>
  {/* h2 + 소개글 */}
  <Stack spacing="heading-content">
    {' '}
    {/* 12px/20px */}
    <Heading level="h2">사용 가이드라인</Heading>
    <Body>가이드 소개...</Body>
  </Stack>

  {/* h3 그룹 */}
  <Stack spacing="content-loose" className="mt-2 md:mt-4">
    {' '}
    {/* 24px/40px */}
    <Stack spacing="heading-tight">
      {' '}
      {/* 8px/16px */}
      <Heading level="h3">언제 사용해야 하나요?</Heading>
      <GuidelineSection type="do">...</GuidelineSection>
      <GuidelineSection type="dont">...</GuidelineSection>
    </Stack>
    <Stack spacing="heading-tight">
      <Heading level="h3">버튼 위계</Heading>
      <Body>시각적 강조도는...</Body>
      <ul>리스트...</ul>
    </Stack>
    <Stack spacing="heading-tight">
      <Heading level="h3">접근성</Heading>
      <Body>KRDS 접근성...</Body>
    </Stack>
  </Stack>
</PageSection>
```

**간격:**

- h2 → 소개글: `heading-content` (12px/20px)
- 소개글 → 첫 h3: `mt-2 md:mt-4` (8px/16px)
- h3 → 설명: `heading-tight` (8px/16px)
- h3 → h3 (형제): `content-loose` (24px/40px)

**핵심 구조:**

```
<Stack spacing="heading-content">
  h2 + 소개글
</Stack>
  ↓ mt-2 md:mt-4
<Stack spacing="content-loose">
  ├─ <Stack spacing="heading-tight"> h3 + 설명 </Stack>
  ├─ <Stack spacing="heading-tight"> h3 + 설명 </Stack>
  └─ <Stack spacing="heading-tight"> h3 + 설명 </Stack>
</Stack>
```

**사용 예:**

- 사용 가이드라인
- 디자인 원칙
- 주의사항
- FAQ

#### 패턴 2 변형: h3 + CodeBlock

**언제 사용:** h2 아래 여러 h3가 있고, 각 h3에 바로 CodeBlock이 오는 경우 (설명 없이 코드만)

```tsx
<PageSection>
  <Heading level="h2">스타일 커스터마이징</Heading>

  <Stack spacing="content-loose" className="mt-2 md:mt-4">
    <Body>
      Tailwind CSS 클래스를 사용하여 컴포넌트를 쉽게 커스터마이징할 수 있습니다:
    </Body>

    <Stack spacing="heading-tight">
      <Heading level="h3">className prop 사용</Heading>
      <CodeBlock code="..." />
    </Stack>

    <Stack spacing="heading-tight">
      <Heading level="h3">다크 모드 지원</Heading>
      <CodeBlock code="..." />
    </Stack>
  </Stack>
</PageSection>
```

**간격:**

- h2 → 소개글: `heading-content` (12px/20px)
- 소개글 → 첫 h3: `mt-2 md:mt-4` (8px/16px)
- h3 → CodeBlock: `heading-tight` (8px/16px)
- h3 → h3 (형제): `content-loose` (24px/40px)

**핵심:**

- 각 h3는 `Stack spacing="heading-tight"`로 감싸기
- 소개글과 h3 그룹은 `Stack spacing="content-loose"`로 감싸기
- `div className="space-y-4"` 같은 Tailwind 클래스 대신 Stack 사용

---

### 패턴 3: h2 + 여러 h3 (예시+코드형)

**언제 사용:** h2 아래 여러 h3가 있고, 각각 ComponentPreview + CodeBlock이 있는 경우

```tsx
<PageSection>
  {/* h2만 (또는 h2 + 소개글) */}
  <Heading level="h2">Examples</Heading>
  {/* 소개글이 있다면: */}
  {/* <Stack spacing="heading-content">
    <Heading level="h2">Examples</Heading>
    <Body>예시 소개...</Body>
  </Stack> */}

  {/* h3 + 예시 그룹 */}
  <Stack spacing="content-loose" className="mt-2 md:mt-4">
    <Stack spacing="heading-tight">
      <Heading level="h3">Default</Heading>
      <div>
        {' '}
        {/* 예시+코드를 div로 묶기 */}
        <ComponentPreview>
          <Button>Button</Button>
        </ComponentPreview>
        <div className="mt-4">
          {' '}
          {/* Preview → Code 간격 */}
          <CodeBlock code="<Button>Button</Button>" />
        </div>
      </div>
    </Stack>

    <Stack spacing="heading-tight">
      <Heading level="h3">Sizes</Heading>
      <div>
        <ComponentPreview>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
        </ComponentPreview>
        <div className="mt-4">
          <CodeBlock code="..." />
        </div>
      </div>
    </Stack>

    {/* 추가 예시들... */}
  </Stack>
</PageSection>
```

**간격:**

- h2 → 첫 h3: `content-loose` + `mt-2 md:mt-4` (24px/40px)
- h3 → div(예시+코드): `heading-tight` (8px/16px)
- ComponentPreview → CodeBlock: `mt-4` (16px)
- h3 → h3 (형제): `content-loose` (24px/40px)

**핵심 구조:**

```
<Heading level="h2">
  ↓ mt-2 md:mt-4
<Stack spacing="content-loose">
  ├─ <Stack spacing="heading-tight">
  │    h3
  │    <div>
  │      ComponentPreview
  │      <div className="mt-4"> CodeBlock </div>
  │    </div>
  │  </Stack>
  └─ ... (반복)
</Stack>
```

**사용 예:**

- Examples 섹션
- Variants 섹션
- 사용 사례 (Use Cases)

---

### 전체 페이지 템플릿

위 3가지 패턴을 조합한 완전한 컴포넌트 문서 페이지:

```tsx
export default function ComponentPage() {
  return (
    <>
      {/* 페이지 헤더 */}
      <PageHeader
        title="Button (버튼)"
        description="사용자 액션을 트리거하는 인터랙티브 컴포넌트"
      />

      {/* 미리보기 (선택) */}
      <PageSection>
        <ComponentPreview>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
        </ComponentPreview>
      </PageSection>

      {/* 패턴 1: h2 단독 - 개요 */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2">개요</Heading>
          <Body>버튼은 사용자가 서비스를 이용하는...</Body>
        </Stack>
      </PageSection>

      {/* 패턴 2: h2 + 여러 h3 - 가이드라인 */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2">사용 가이드라인</Heading>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Stack spacing="heading-tight">
            <Heading level="h3">언제 사용해야 하나요?</Heading>
            <GuidelineSection type="do">...</GuidelineSection>
            <GuidelineSection type="dont">...</GuidelineSection>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">버튼 위계</Heading>
            <Body>시각적 강조도는...</Body>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">접근성</Heading>
            <Body>KRDS 접근성...</Body>
          </Stack>
        </Stack>
      </PageSection>

      {/* 패턴 1: h2 단독 - 설치 */}
      <PageSection>
        <Installation componentName="button" />
      </PageSection>

      {/* 패턴 1: h2 단독 - 사용법 */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2">Usage</Heading>
          <CodeBlock code="import { Button } from '@hanui/react'" />
        </Stack>
      </PageSection>

      {/* 패턴 3: h2 + 여러 h3 - 예시 */}
      <PageSection>
        <Stack spacing="content">
          <Heading level="h2">Examples</Heading>

          <Stack spacing="content-loose" className="mt-2 md:mt-4">
            <Stack spacing="heading-tight">
              <Heading level="h3">Default</Heading>
              <div>
                <ComponentPreview>
                  <Button>Button</Button>
                </ComponentPreview>
                <div className="mt-4">
                  <CodeBlock code="<Button>Button</Button>" />
                </div>
              </div>
            </Stack>

            <Stack spacing="heading-tight">
              <Heading level="h3">Sizes</Heading>
              <div>
                <ComponentPreview>
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </ComponentPreview>
                <div className="mt-4">
                  <CodeBlock code="..." />
                </div>
              </div>
            </Stack>

            {/* 추가 예시들... */}
          </Stack>
        </Stack>
      </PageSection>
    </>
  );
}
```

---

### 컴포넌트 목록 페이지

```tsx
export default function ComponentsListPage() {
  return (
    <>
      {/* 페이지 헤더 */}
      <PageHeader title="Components" description="모든 컴포넌트 목록" />

      {/* 카테고리 섹션들 */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2">카테고리명</Heading>

          {/* 반응형 그리드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((item) => (
              <Link key={item.name} href={item.href}>
                {item.name}
              </Link>
            ))}
          </div>
        </Stack>
      </PageSection>

      {/* 다른 카테고리 섹션들... */}
    </>
  );
}
```

---

## 🎨 그리드 레이아웃

### 반응형 그리드 패턴

컴포넌트 목록, 예시 그리드 등에 사용:

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {items.map((item) => (
    <div key={item.id}>{/* 그리드 항목 */}</div>
  ))}
</div>
```

**브레이크포인트:**

- Mobile (기본): 1열
- Small (640px+): 2열
- Medium (768px+): 3열
- Gap: 16px (고정)

### 2열 그리드 (가이드라인)

```tsx
<div className="grid grid-cols-1 gap-4">
  <GuidelineSection type="do">...</GuidelineSection>
  <GuidelineSection type="dont">...</GuidelineSection>
</div>
```

---

## ✅ 제목 구조 (Heading Hierarchy)

**HANUI 제목 작성 규칙:**

### 언어 사용 기준

| 레벨   | 언어 규칙            | 예시                                                                            |
| ------ | -------------------- | ------------------------------------------------------------------------------- |
| **h1** | 영어                 | `Button (버튼)`, `Typography`, `Design Tokens`                                  |
| **h2** | 한글 (영어)          | `사용 가이드라인 (Guidelines)`, `API 레퍼런스 (API Reference)`                  |
| **h3** | 맥락에 따라 자유롭게 | 영어: `Default`, `Sizes`, `Props`<br>한글: `언제 사용해야 하나요?`, `기본 사용` |

### 적용 예시

```tsx
{/* h1: 영어 (PageHeader 자동 처리) */}
<PageHeader title="Button (버튼)" description="..." />

{/* h2: 한글 (영어) */}
<Heading level="h2" id="guidelines">사용 가이드라인 (Guidelines)</Heading>
<Heading level="h2" id="api-reference">API 레퍼런스 (API Reference)</Heading>
<Heading level="h2" id="examples">사용 예시 (Examples)</Heading>

{/* h3: 맥락에 따라 영어 또는 한글 */}
{/* 기술 용어는 영어 */}
<Heading level="h3">Default</Heading>
<Heading level="h3">Sizes</Heading>
<Heading level="h3">Props</Heading>

{/* 설명형 제목은 한글 */}
<Heading level="h3">언제 사용해야 하나요?</Heading>
<Heading level="h3">버튼 위계</Heading>
<Heading level="h3">접근성 고려사항</Heading>

{/* h4: 필요시 (영어/한글 혼용 가능) */}
<Heading level="h4">Primary - 가장 중요한 액션</Heading>
```

**규칙:**

- **h1**: 항상 영어 (한글 병기 가능)
- **h2**: 항상 "한글 (영어)" 형식 (예외: 순수 한글 섹션)
- **h3**: 기술 용어는 영어, 설명형은 한글
- h1은 페이지당 1개 (PageHeader가 자동 생성)
- 레벨을 건너뛰지 않기 (h2 → h4 ❌)

**h2 ID 속성:**

SEO와 앵커 링크를 위해 h2에는 반드시 영어 kebab-case ID를 추가합니다:

```tsx
<Heading level="h2" id="api-reference">API 레퍼런스</Heading>
<Heading level="h2" id="guidelines">사용 가이드라인</Heading>
<Heading level="h2" id="examples">사용 예시</Heading>
<Heading level="h2" id="foundation-layer">기반 레이어</Heading>
```

---

## 🎨 타이포그래피 기본 색상

### KRDS 준수 기본 색상

모든 타이포그래피 컴포넌트는 기본 KRDS 색상을 제공합니다:

| 컴포넌트            | 라이트 모드 | 다크 모드 | 대비 비율       | 용도             |
| ------------------- | ----------- | --------- | --------------- | ---------------- |
| **Heading**         | gray-900    | gray-100  | 16.1:1 / 17.3:1 | 페이지/섹션 제목 |
| **Display**         | gray-900    | gray-100  | 16.1:1 / 17.3:1 | 배너/마케팅      |
| **NavText (Title)** | gray-900    | gray-100  | 16.1:1 / 17.3:1 | 네비게이션 제목  |
| **NavText (Depth)** | gray-700    | gray-300  | 10.7:1 / 13.5:1 | 네비게이션 항목  |
| **Body**            | gray-700    | gray-300  | 10.7:1 / 13.5:1 | 본문/콘텐츠      |
| **Label**           | gray-700    | gray-300  | 10.7:1 / 13.5:1 | 폼 라벨          |

**특징:**

- 모든 색상이 WCAG AAA 기준 (7:1) 초과
- 강조가 필요한 요소: gray-900/100 (강한 대비)
- 일반 콘텐츠: gray-700/300 (중간 대비)
- className으로 색상 오버라이드 가능

**예시:**

```tsx
{/* 기본 색상 사용 */}
<Heading level="h2">제목</Heading>
<Body>본문 텍스트</Body>

{/* 색상 오버라이드 */}
<Body className="text-blue-600 dark:text-blue-400">
  강조 텍스트
</Body>
```

---

## 📋 체크리스트

### 새 페이지 작성 시

- [ ] 최상위는 `<>` Fragment 사용
- [ ] `PageHeader`로 페이지 시작
- [ ] 각 섹션은 `PageSection`으로 감싸기
- [ ] 제목-콘텐츠 간격은 `Stack spacing="heading-content"` 사용
- [ ] 제목 구조는 h1 → h2 → h3 순서 지키기
- [ ] 타이포그래피 컴포넌트 기본 색상 활용 (오버라이드 최소화)
- [ ] 그리드는 반응형 클래스 사용 (`grid-cols-1 sm:grid-cols-2 md:grid-cols-3`)
- [ ] 코드 예시는 `ComponentPreview` + `CodeBlock` 조합

### 간격 확인

- [ ] 섹션 간: 40px/80px (PageSection 자동)
- [ ] 제목-콘텐츠: 12px/20px (`heading-content`)
- [ ] 소제목-예시: 8px/12px (`heading-tight`)
- [ ] 본문 블록 간: 16px/24px (`content`)

---

## 🔗 관련 문서

- [Stack 컴포넌트](../components/stack.md)
- [Heading 컴포넌트](../components/heading.md)
- [Body 컴포넌트](../components/body.md)
- [KRDS 간격 시스템](./spacing-system.md)
- [KRDS 디지털 포용](../references/krds/01-digital-inclusion.md)

---

**작성일:** 2025-11-14
**관리:** HANUI 개발팀
**버전:** 1.0.0
