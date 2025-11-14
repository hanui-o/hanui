'use client';

import { Container, Heading, Stack, Body } from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';
import { Installation } from '@/components/content/Installation';
import { GuidelineSection } from '@/components/content/GuidelineSection';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

export default function ContainerPage() {
  return (
    <>
      <PageHeader
        title="Container"
        description="KRDS 레이아웃 시스템을 기반으로 한 반응형 컨테이너"
      />

      <PageSection>
        <ComponentPreview>
          <div className="w-full border-2 border-dashed border-gray-300 dark:border-gray-700">
            <Container className="bg-blue-50 dark:bg-blue-950/30 py-8">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">Container</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  콘텐츠가 중앙에 정렬되고 최대 너비가 제한됩니다
                </p>
              </div>
            </Container>
          </div>
        </ComponentPreview>
      </PageSection>

      {/* Overview */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="overview">
            개요
          </Heading>
          <Body className="leading-relaxed">
            Container는 페이지의 콘텐츠를 제한된 너비 내에 정렬하고, 반응형
            레이아웃을 구성하는 기본 레이아웃 컴포넌트입니다. HANUI Container는{' '}
            <strong>KRDS(한국형 웹 콘텐츠 접근성 지침)</strong>의 그리드
            시스템을 준수하여 모든 화면 크기에서 일관된 여백과 정렬을
            제공합니다.
          </Body>
        </Stack>
      </PageSection>

      {/* Usage Guidelines */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="guidelines">
            사용 가이드라인
          </Heading>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* When to use */}
          <Stack spacing="heading-tight">
            <Heading level="h3">언제 사용해야 하나요?</Heading>
            <div className="grid grid-cols-1 gap-4">
              <GuidelineSection
                type="do"
                title="Container를 사용하기 적합한 경우"
              >
                <ul className="list-disc list-inside space-y-2">
                  <li>페이지의 메인 콘텐츠를 감싸는 경우</li>
                  <li>섹션별 콘텐츠를 일관되게 정렬해야 하는 경우</li>
                  <li>넓은 화면에서 콘텐츠가 너무 퍼지지 않도록 제한</li>
                  <li>그리드 시스템의 래퍼로 사용하는 경우</li>
                </ul>
              </GuidelineSection>

              <GuidelineSection
                type="dont"
                title="Container를 사용하지 말아야 하는 경우"
              >
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    전체 화면을 사용해야 하는 히어로 이미지 →
                    maxWidth=&quot;full&quot; 사용
                  </li>
                  <li>Container 안에 Container 중첩 → 하나만 사용</li>
                  <li>이미 크기가 제한된 컴포넌트 내부 (Card, Modal 등)</li>
                </ul>
              </GuidelineSection>
            </div>
          </Stack>

          {/* Max Width Guidelines */}
          <Stack spacing="heading-tight">
            <Heading level="h3">최대 너비 선택</Heading>
            <GuidelineSection type="do" title="콘텐츠에 맞는 너비 사용">
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>sm (640px)</strong>: 짧은 텍스트, 간단한 폼
                </li>
                <li>
                  <strong>md (768px)</strong>: 블로그 포스트, 기사
                </li>
                <li>
                  <strong>lg (1024px)</strong>: 일반적인 페이지
                </li>
                <li>
                  <strong>xl (1280px)</strong>: 대시보드, 넓은 콘텐츠 (기본값,
                  권장)
                </li>
                <li>
                  <strong>2xl (1440px)</strong>: 매우 넓은 레이아웃
                </li>
                <li>
                  <strong>full</strong>: 전체 너비 + 여백만 적용
                </li>
              </ul>
            </GuidelineSection>
          </Stack>

          {/* Semantic HTML */}
          <Stack spacing="heading-tight">
            <Heading level="h3">시맨틱 HTML (선택사항)</Heading>
            <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>as</strong> prop을 사용하면 접근성을 향상시킬 수 있지만,
                필수는 아닙니다. 두 가지 패턴 모두 권장됩니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <GuidelineSection type="do" title="방법 1: as prop 사용">
                <p className="mb-3 text-sm">
                  Container에 직접 시맨틱 요소를 지정합니다.
                </p>
                <ComponentPreview>
                  <div className="text-sm">
                    <CodeBlock
                      code={`<Container as="main" maxWidth="xl">
  <h1>페이지 제목</h1>
  <p>주요 콘텐츠</p>
</Container>`}
                      language="tsx"
                      showLineNumbers={false}
                    />
                  </div>
                </ComponentPreview>
              </GuidelineSection>

              <GuidelineSection type="do" title="방법 2: 시맨틱 요소로 감싸기">
                <p className="mb-3 text-sm">
                  Container를 시맨틱 요소로 감쌉니다. (일반적인 패턴)
                </p>
                <ComponentPreview>
                  <div className="text-sm">
                    <CodeBlock
                      code={`<main>
  <Container maxWidth="xl">
    <h1>페이지 제목</h1>
    <p>주요 콘텐츠</p>
  </Container>
</main>`}
                      language="tsx"
                      showLineNumbers={false}
                    />
                  </div>
                </ComponentPreview>
              </GuidelineSection>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                <strong>시맨틱 요소 참고:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs">
                    main
                  </code>
                  : 페이지의 주요 콘텐츠
                </li>
                <li>
                  <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs">
                    section
                  </code>
                  : 관련된 콘텐츠 그룹
                </li>
                <li>
                  <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs">
                    article
                  </code>
                  : 독립적인 콘텐츠 (블로그 글, 뉴스 기사 등)
                </li>
              </ul>
            </div>
          </Stack>

          {/* KRDS Layout System */}
          <Stack spacing="heading-tight">
            <Heading level="h3">KRDS 레이아웃 시스템</Heading>
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-6 border border-blue-200 dark:border-blue-900">
              <h4 className="font-semibold mb-3 text-blue-900 dark:text-blue-100">
                그리드 요소
              </h4>
              <ul className="space-y-2 text-sm text-blue-900 dark:text-blue-100">
                <li>
                  <strong>Screen Margin (스크린 마진)</strong>: 화면 양쪽
                  가장자리의 여백 (16-24px)
                </li>
                <li>
                  <strong>Column (칼럼)</strong>: UI 요소를 수직으로 정렬하는
                  분할 영역 (4-16개)
                </li>
                <li>
                  <strong>Gutter (거터)</strong>: 칼럼 사이의 간격 (16-24px)
                </li>
              </ul>
            </div>
          </Stack>
        </Stack>
      </PageSection>

      <PageSection>
        <Installation componentName="container" />
      </PageSection>

      {/* Usage */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="usage">
            Usage
          </Heading>
          <CodeBlock
            code={`import { Container } from '@hanui/react'

<Container>
  <h1>페이지 제목</h1>
  <p>콘텐츠</p>
</Container>`}
            language="tsx"
            showLineNumbers={false}
          />
        </Stack>
      </PageSection>

      {/* Examples */}
      <PageSection>
        <Heading level="h2" id="examples">
          Examples
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* Default */}
          <Stack spacing="heading-tight">
            <Heading level="h3" id="default">
              Default (xl)
            </Heading>
            <div>
              <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>언제 사용하나요?</strong> 일반적인 페이지 콘텐츠에
                  사용합니다. 최대 너비 1280px로 제한되어 넓은 화면에서도
                  가독성이 유지됩니다.
                </p>
              </div>
              <ComponentPreview>
                <div className="w-full border-2 border-dashed border-gray-300 dark:border-gray-700">
                  <Container className="bg-green-50 dark:bg-green-950/30 py-8">
                    <p className="text-center text-gray-700 dark:text-gray-300">
                      Default Container (max-width: 1280px)
                    </p>
                  </Container>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Container>
  <h1>페이지 제목</h1>
  <p>일반적인 콘텐츠</p>
</Container>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Small Width */}
          <Stack spacing="heading-tight">
            <Heading level="h3" id="small">
              Small Width
            </Heading>
            <div>
              <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>언제 사용하나요?</strong> 로그인 폼, 회원가입 폼 등
                  좁은 콘텐츠에 적합합니다. 최대 너비 640px입니다.
                </p>
              </div>
              <ComponentPreview>
                <div className="w-full border-2 border-dashed border-gray-300 dark:border-gray-700">
                  <Container
                    maxWidth="sm"
                    className="bg-purple-50 dark:bg-purple-950/30 py-8"
                  >
                    <p className="text-center text-gray-700 dark:text-gray-300">
                      Small Container (max-width: 640px)
                    </p>
                  </Container>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Container maxWidth="sm">
  <form>
    <h2>로그인</h2>
    {/* 폼 필드 */}
  </form>
</Container>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Extra Large Width */}
          <Stack spacing="heading-tight">
            <Heading level="h3" id="extra-large">
              Extra Large Width
            </Heading>
            <div>
              <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>언제 사용하나요?</strong> 대시보드, 데이터 테이블 등
                  넓은 레이아웃이 필요한 경우 사용합니다. 최대 너비
                  1280px입니다.
                </p>
              </div>
              <ComponentPreview>
                <div className="w-full border-2 border-dashed border-gray-300 dark:border-gray-700">
                  <Container
                    maxWidth="xl"
                    className="bg-orange-50 dark:bg-orange-950/30 py-8"
                  >
                    <p className="text-center text-gray-700 dark:text-gray-300">
                      Extra Large Container (max-width: 1280px)
                    </p>
                  </Container>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Container maxWidth="xl">
  <Dashboard />
</Container>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Full Width */}
          <Stack spacing="heading-tight">
            <Heading level="h3" id="full-width">
              Full Width
            </Heading>
            <div>
              <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>언제 사용하나요?</strong> 전체 너비를 사용하되 양쪽
                  여백은 유지하고 싶을 때 사용합니다. 히어로 섹션이나 배경이
                  있는 영역에 적합합니다.
                </p>
              </div>
              <ComponentPreview>
                <div className="w-full border-2 border-dashed border-gray-300 dark:border-gray-700">
                  <Container
                    maxWidth="full"
                    className="bg-pink-50 dark:bg-pink-950/30 py-8"
                  >
                    <p className="text-center text-gray-700 dark:text-gray-300">
                      Full Width Container (max-width: 100%)
                    </p>
                  </Container>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Container maxWidth="full">
  <HeroSection />
</Container>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* No Gutters */}
          <Stack spacing="heading-tight">
            <Heading level="h3" id="no-gutters">
              No Gutters (disableGutters)
            </Heading>
            <div>
              <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>언제 사용하나요?</strong> 좌우 패딩을 제거하여
                  콘텐츠가 화면 끝까지 확장되도록 합니다. 전체 화면 이미지나
                  배경에 적합합니다.
                </p>
              </div>
              <ComponentPreview>
                <div className="w-full border-2 border-dashed border-gray-300 dark:border-gray-700">
                  <Container
                    disableGutters
                    className="bg-cyan-50 dark:bg-cyan-950/30 py-8"
                  >
                    <p className="text-center text-gray-700 dark:text-gray-300">
                      No Gutters Container (패딩 없음)
                    </p>
                  </Container>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Container disableGutters>
  <img src="/hero.jpg" alt="히어로 이미지" className="w-full" />
</Container>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Semantic HTML */}
          <Stack spacing="heading-tight">
            <Heading level="h3" id="semantic">
              Semantic HTML (as prop)
            </Heading>
            <div>
              <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>언제 사용하나요?</strong> 접근성 향상을 위해 콘텐츠의
                  의미에 맞는 시맨틱 HTML 요소를 사용합니다. 스크린 리더
                  사용자에게 더 나은 경험을 제공합니다.
                </p>
              </div>
              <ComponentPreview>
                <div className="space-y-4">
                  <Container
                    as="main"
                    className="bg-indigo-50 dark:bg-indigo-950/30 py-4"
                  >
                    <p className="text-sm text-center text-gray-700 dark:text-gray-300">
                      &lt;main&gt; - 페이지의 주요 콘텐츠
                    </p>
                  </Container>
                  <Container
                    as="section"
                    className="bg-emerald-50 dark:bg-emerald-950/30 py-4"
                  >
                    <p className="text-sm text-center text-gray-700 dark:text-gray-300">
                      &lt;section&gt; - 섹션 그룹
                    </p>
                  </Container>
                  <Container
                    as="article"
                    className="bg-amber-50 dark:bg-amber-950/30 py-4"
                  >
                    <p className="text-sm text-center text-gray-700 dark:text-gray-300">
                      &lt;article&gt; - 독립적인 콘텐츠
                    </p>
                  </Container>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`// 메인 콘텐츠
<Container as="main">
  <h1>페이지 제목</h1>
  <p>주요 콘텐츠</p>
</Container>

// 섹션
<Container as="section">
  <h2>소개</h2>
  <p>섹션 내용</p>
</Container>

// 아티클
<Container as="article">
  <h2>블로그 포스트</h2>
  <p>글 내용</p>
</Container>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Nested Sections */}
          <Stack spacing="heading-tight">
            <Heading level="h3" id="nested-sections">
              Multiple Sections
            </Heading>
            <div>
              <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>언제 사용하나요?</strong> 여러 섹션이 있는 페이지에서
                  각 섹션마다 Container를 사용하여 일관된 정렬을 유지합니다.
                  Container를 중첩하지 않도록 주의하세요.
                </p>
              </div>
              <ComponentPreview>
                <div className="space-y-4">
                  <div className="w-full border-2 border-dashed border-gray-300 dark:border-gray-700">
                    <Container className="bg-blue-50 dark:bg-blue-950/30 py-6">
                      <h3 className="text-lg font-semibold text-center mb-2">
                        Header Section
                      </h3>
                      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                        첫 번째 섹션
                      </p>
                    </Container>
                  </div>
                  <div className="w-full border-2 border-dashed border-gray-300 dark:border-gray-700">
                    <Container className="bg-green-50 dark:bg-green-950/30 py-6">
                      <h3 className="text-lg font-semibold text-center mb-2">
                        Main Section
                      </h3>
                      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                        두 번째 섹션
                      </p>
                    </Container>
                  </div>
                  <div className="w-full border-2 border-dashed border-gray-300 dark:border-gray-700">
                    <Container className="bg-purple-50 dark:bg-purple-950/30 py-6">
                      <h3 className="text-lg font-semibold text-center mb-2">
                        Footer Section
                      </h3>
                      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                        세 번째 섹션
                      </p>
                    </Container>
                  </div>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<div>
  <Container as="header">
    <Navigation />
  </Container>

  <Container as="main">
    <MainContent />
  </Container>

  <Container as="footer">
    <FooterContent />
  </Container>
</div>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>
        </Stack>
      </PageSection>

      {/* API Reference */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="api">
            API Reference
          </Heading>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left border-b border-gray-300 dark:border-gray-700">
                    Prop
                  </th>
                  <th className="px-4 py-2 text-left border-b border-gray-300 dark:border-gray-700">
                    Type
                  </th>
                  <th className="px-4 py-2 text-left border-b border-gray-300 dark:border-gray-700">
                    Default
                  </th>
                  <th className="px-4 py-2 text-left border-b border-gray-300 dark:border-gray-700">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                    maxWidth
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                    &apos;sm&apos; | &apos;md&apos; | &apos;lg&apos; |
                    &apos;xl&apos; | &apos;2xl&apos; | &apos;full&apos; | false
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                    &apos;lg&apos;
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                    최대 너비 설정
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                    disableGutters
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                    boolean
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                    false
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                    좌우 패딩 제거 여부
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                    as
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                    &apos;div&apos; | &apos;section&apos; | &apos;article&apos;
                    | &apos;main&apos; | ...
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                    &apos;div&apos;
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                    렌더링할 HTML 요소
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                    className
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                    string
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                    -
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                    추가 CSS 클래스
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <Heading level="h3" className="mb-3">
              Max Width 값
            </Heading>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 dark:border-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left border-b border-gray-300 dark:border-gray-700">
                      값
                    </th>
                    <th className="px-4 py-2 text-left border-b border-gray-300 dark:border-gray-700">
                      최대 너비
                    </th>
                    <th className="px-4 py-2 text-left border-b border-gray-300 dark:border-gray-700">
                      용도
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                      sm
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                      640px
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                      로그인 폼, 간단한 콘텐츠
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                      md
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                      768px
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                      블로그 포스트, 기사
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                      lg
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                      1024px
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                      일반 페이지 (기본값, 권장)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                      xl
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                      1280px
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                      대시보드, 데이터 테이블
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                      2xl
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                      1440px
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                      매우 넓은 레이아웃
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                      full
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                      100%
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                      전체 너비 + 여백 유지
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6">
            <Heading level="h3" className="mb-3">
              KRDS 스크린 마진 (Screen Margin)
            </Heading>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 dark:border-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left border-b border-gray-300 dark:border-gray-700">
                      브레이크포인트
                    </th>
                    <th className="px-4 py-2 text-left border-b border-gray-300 dark:border-gray-700">
                      화면 크기
                    </th>
                    <th className="px-4 py-2 text-left border-b border-gray-300 dark:border-gray-700">
                      좌우 패딩
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                      Mobile (기본)
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                      ~640px
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                      16px (px-4)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                      Tablet (sm)
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                      640px~
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                      24px (px-6)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                      Desktop (lg)
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                      1024px~
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                      32px (px-8)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Stack>
      </PageSection>
    </>
  );
}
