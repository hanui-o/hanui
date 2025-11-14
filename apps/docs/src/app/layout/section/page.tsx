'use client';

import { Heading, Body, Stack } from '@hanui/react';

import { Section } from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';
import { Installation } from '@/components/content/Installation';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

export default function SectionPage() {
  return (
    <>
      <PageHeader
        title="Section"
        description="KRDS 수직 간격을 준수하는 의미론적 섹션 컴포넌트"
      />

      <PageSection>
        <ComponentPreview>
          <Section padding="page-section" background="gray">
            <h2 className="text-xl font-semibold mb-4">섹션 제목</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Section 컴포넌트는 KRDS 기준에 따라 일관된 패딩을 제공합니다.
            </p>
          </Section>
        </ComponentPreview>
      </PageSection>

      {/* Overview */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="overview">
            개요
          </Heading>
          <Body className="leading-relaxed">
            Section은 페이지의 논리적 구역을 나타내는 의미론적 컴포넌트입니다.{' '}
            <strong>KRDS(한국형 웹 콘텐츠 접근성 지침)</strong>의 수직 간격
            기준을 준수하며, 다양한 배경색 옵션과 시맨틱 HTML 요소를 지원합니다.
          </Body>
        </Stack>
      </PageSection>

      <PageSection>
        <Installation componentName="section" />
      </PageSection>

      {/* Usage */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="usage">
            Usage
          </Heading>
          <CodeBlock
            code={`import { Section } from '@hanui/react'

<Section padding="page-section">
  <h2>섹션 제목</h2>
  <p>섹션 내용</p>
</Section>`}
            language="tsx"
            showLineNumbers={false}
          />
        </Stack>
      </PageSection>

      {/* Examples */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="examples">
            Examples
          </Heading>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* Default */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Default</Heading>
            <div>
              <ComponentPreview>
                <Section background="gray">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">기본 섹션</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      패딩 없이 배경색만 적용된 섹션
                    </p>
                  </div>
                </Section>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Section background="gray">
  <div className="p-6">
    <h3>기본 섹션</h3>
    <p>내용</p>
  </div>
</Section>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Page Section */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Page Section</Heading>
            <div>
              <ComponentPreview>
                <Section padding="page-section" background="white">
                  <h3 className="text-xl font-bold mb-2">페이지 섹션</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    메인 페이지 섹션용 넉넉한 패딩
                  </p>
                </Section>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Section padding="page-section" background="white">
  <h2>주요 기능</h2>
  <p>페이지의 메인 콘텐츠</p>
</Section>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Content Area */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Content Area</Heading>
            <div>
              <ComponentPreview>
                <Section padding="content-area" background="gray">
                  <h3 className="text-xl font-bold mb-2">콘텐츠 영역</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    일반적인 콘텐츠에 적합한 패딩
                  </p>
                </Section>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Section padding="content-area" background="gray">
  <h3>소개</h3>
  <p>섹션 내용</p>
</Section>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Card Medium */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Card Section</Heading>
            <div>
              <ComponentPreview>
                <Section padding="card-medium" background="white">
                  <h3 className="text-xl font-bold mb-2">카드 섹션</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    카드 내부에 적합한 패딩
                  </p>
                </Section>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Section padding="card-medium" background="white">
  <h4>카드 제목</h4>
  <p>카드 내용</p>
</Section>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Background Variants */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Background Variants</Heading>
            <div>
              <ComponentPreview>
                <div className="space-y-4">
                  <Section padding="card-small" background="white">
                    <p className="text-center font-semibold">
                      White Background
                    </p>
                  </Section>
                  <Section padding="card-small" background="gray">
                    <p className="text-center font-semibold">Gray Background</p>
                  </Section>
                  <Section padding="card-small" background="primary">
                    <p className="text-center font-semibold text-white">
                      Primary Background
                    </p>
                  </Section>
                  <Section padding="card-small" background="transparent">
                    <p className="text-center font-semibold">
                      Transparent Background
                    </p>
                  </Section>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Section background="white">...</Section>
<Section background="gray">...</Section>
<Section background="primary">...</Section>
<Section background="transparent">...</Section>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Multiple Sections */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Multiple Sections</Heading>
            <div>
              <ComponentPreview>
                <div className="space-y-0">
                  <Section padding="content-area" background="white">
                    <h3 className="text-xl font-bold mb-2">첫 번째 섹션</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      White 배경
                    </p>
                  </Section>
                  <Section padding="content-area" background="gray">
                    <h3 className="text-xl font-bold mb-2">두 번째 섹션</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Gray 배경
                    </p>
                  </Section>
                  <Section padding="content-area" background="white">
                    <h3 className="text-xl font-bold mb-2">세 번째 섹션</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      White 배경
                    </p>
                  </Section>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Section padding="content-area" background="white">
  <h2>소개</h2>
  <p>내용</p>
</Section>

<Section padding="content-area" background="gray">
  <h2>기능</h2>
  <p>내용</p>
</Section>

<Section padding="content-area" background="white">
  <h2>연락처</h2>
  <p>내용</p>
</Section>`}
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
                    padding
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                    SectionPadding
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                    &apos;page-section&apos;
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                    패딩 프리셋
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                    background
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                    &apos;white&apos; | &apos;gray&apos; | &apos;primary&apos; |
                    &apos;transparent&apos;
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                    &apos;transparent&apos;
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                    배경색
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                    as
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                    &apos;section&apos; | &apos;div&apos; | &apos;header&apos; |
                    &apos;main&apos; | ...
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                    &apos;section&apos;
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                    렌더링할 HTML 요소
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <Heading level="h3">Padding Presets</Heading>
            <div className="overflow-x-auto mt-2 md:mt-4">
              <table className="min-w-full border border-gray-300 dark:border-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left border-b border-gray-300 dark:border-gray-700">
                      값
                    </th>
                    <th className="px-4 py-2 text-left border-b border-gray-300 dark:border-gray-700">
                      패딩
                    </th>
                    <th className="px-4 py-2 text-left border-b border-gray-300 dark:border-gray-700">
                      용도
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                      page-section
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                      반응형 (모바일/PC)
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                      메인 페이지 섹션
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                      content-area
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                      반응형 (모바일/PC)
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                      일반 콘텐츠 영역
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                      card-large
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                      반응형 (24px/40px)
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                      큰 카드
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                      card-medium
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                      반응형 (24px/32px)
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                      중간 카드
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                      card-small
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                      반응형 (20px/24px)
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                      작은 카드
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
