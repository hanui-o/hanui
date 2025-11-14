'use client';

import { Box, Body, Heading, Stack } from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

export default function BoxPage() {
  return (
    <>
      <PageHeader
        title="Box"
        description="유연한 레이아웃을 위한 컨테이너 컴포넌트"
      />

      <PageSection>
        <ComponentPreview>
          <Box display="flex" direction="row" gap={4} align="center">
            <div className="w-20 h-20 bg-primary-60 rounded" />
            <div className="w-20 h-20 bg-primary-50 rounded" />
            <div className="w-20 h-20 bg-primary-40 rounded" />
          </Box>
        </ComponentPreview>
      </PageSection>

      {/* Overview */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="overview">
            개요
          </Heading>
          <Body className="leading-relaxed">
            Box는 <strong>레이아웃 구성</strong>을 위한 범용 컨테이너
            컴포넌트입니다. Flexbox와 Grid 레이아웃을 쉽게 구성할 수 있는
            props를 제공합니다.
          </Body>
          <Body className="leading-relaxed">
            CSS-in-JS나 복잡한 클래스 조합 없이 간결한 props만으로 레이아웃을
            구성할 수 있습니다.
          </Body>
        </Stack>
      </PageSection>

      {/* Display Types */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="display">
            Display
          </Heading>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <Stack spacing="heading-tight">
              <Heading level="h3">Flex</Heading>
              <div>
                <ComponentPreview>
                  <Box display="flex" direction="row" gap={4}>
                    <div className="w-20 h-20 bg-blue-500 rounded flex items-center justify-center text-white">
                      1
                    </div>
                    <div className="w-20 h-20 bg-blue-500 rounded flex items-center justify-center text-white">
                      2
                    </div>
                    <div className="w-20 h-20 bg-blue-500 rounded flex items-center justify-center text-white">
                      3
                    </div>
                  </Box>
                </ComponentPreview>
                <div className="mt-4">
                  <CodeBlock
                    code={`<Box display="flex" direction="row" gap={4}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Box>`}
                    language="tsx"
                    showLineNumbers={false}
                  />
                </div>
              </div>
            </Stack>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <Stack spacing="heading-tight">
              <Heading level="h3">Grid</Heading>
              <div>
                <ComponentPreview>
                  <Box display="grid" gap={4} className="grid-cols-3">
                    <div className="h-20 bg-green-500 rounded flex items-center justify-center text-white">
                      1
                    </div>
                    <div className="h-20 bg-green-500 rounded flex items-center justify-center text-white">
                      2
                    </div>
                    <div className="h-20 bg-green-500 rounded flex items-center justify-center text-white">
                      3
                    </div>
                  </Box>
                </ComponentPreview>
                <div className="mt-4">
                  <CodeBlock
                    code={`<Box display="grid" gap={4} className="grid-cols-3">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Box>`}
                    language="tsx"
                    showLineNumbers={false}
                  />
                </div>
              </div>
            </Stack>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <Stack spacing="heading-tight">
              <Heading level="h3">Block</Heading>
              <div>
                <ComponentPreview>
                  <Box display="block">
                    <div className="h-20 bg-purple-500 rounded flex items-center justify-center text-white mb-4">
                      Block 1
                    </div>
                    <div className="h-20 bg-purple-500 rounded flex items-center justify-center text-white">
                      Block 2
                    </div>
                  </Box>
                </ComponentPreview>
                <div className="mt-4">
                  <CodeBlock
                    code={`<Box display="block">
  <div>Block 1</div>
  <div>Block 2</div>
</Box>`}
                    language="tsx"
                    showLineNumbers={false}
                  />
                </div>
              </div>
            </Stack>
          </div>
        </Stack>
      </PageSection>

      {/* Flex Direction */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="direction">
            방향 (Direction)
          </Heading>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <Stack spacing="heading-tight">
              <Heading level="h3">Row (가로)</Heading>
              <div>
                <ComponentPreview>
                  <Box display="flex" direction="row" gap={3}>
                    <div className="w-16 h-16 bg-orange-500 rounded flex items-center justify-center text-white text-sm">
                      1
                    </div>
                    <div className="w-16 h-16 bg-orange-500 rounded flex items-center justify-center text-white text-sm">
                      2
                    </div>
                    <div className="w-16 h-16 bg-orange-500 rounded flex items-center justify-center text-white text-sm">
                      3
                    </div>
                  </Box>
                </ComponentPreview>
                <div className="mt-4">
                  <CodeBlock
                    code={`<Box display="flex" direction="row" gap={3}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Box>`}
                    language="tsx"
                    showLineNumbers={false}
                  />
                </div>
              </div>
            </Stack>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <Stack spacing="heading-tight">
              <Heading level="h3">Column (세로)</Heading>
              <div>
                <ComponentPreview>
                  <Box display="flex" direction="column" gap={3}>
                    <div className="w-full h-16 bg-pink-500 rounded flex items-center justify-center text-white">
                      1
                    </div>
                    <div className="w-full h-16 bg-pink-500 rounded flex items-center justify-center text-white">
                      2
                    </div>
                    <div className="w-full h-16 bg-pink-500 rounded flex items-center justify-center text-white">
                      3
                    </div>
                  </Box>
                </ComponentPreview>
                <div className="mt-4">
                  <CodeBlock
                    code={`<Box display="flex" direction="column" gap={3}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Box>`}
                    language="tsx"
                    showLineNumbers={false}
                  />
                </div>
              </div>
            </Stack>
          </div>
        </Stack>
      </PageSection>

      {/* Alignment */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="alignment">
            정렬
          </Heading>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <Stack spacing="heading-tight">
              <Heading level="h3">Align Items</Heading>
              <div className="space-y-4">
                <div>
                  <Body
                    size="sm"
                    className="mb-2 text-gray-600 dark:text-gray-400"
                  >
                    align=&quot;start&quot;
                  </Body>
                  <ComponentPreview>
                    <Box
                      display="flex"
                      direction="row"
                      gap={3}
                      align="start"
                      className="h-32 bg-gray-100 dark:bg-gray-900"
                    >
                      <div className="w-16 h-16 bg-teal-500 rounded" />
                      <div className="w-16 h-20 bg-teal-500 rounded" />
                      <div className="w-16 h-12 bg-teal-500 rounded" />
                    </Box>
                  </ComponentPreview>
                </div>

                <div>
                  <Body
                    size="sm"
                    className="mb-2 text-gray-600 dark:text-gray-400"
                  >
                    align=&quot;center&quot;
                  </Body>
                  <ComponentPreview>
                    <Box
                      display="flex"
                      direction="row"
                      gap={3}
                      align="center"
                      className="h-32 bg-gray-100 dark:bg-gray-900"
                    >
                      <div className="w-16 h-16 bg-teal-500 rounded" />
                      <div className="w-16 h-20 bg-teal-500 rounded" />
                      <div className="w-16 h-12 bg-teal-500 rounded" />
                    </Box>
                  </ComponentPreview>
                </div>

                <div>
                  <Body
                    size="sm"
                    className="mb-2 text-gray-600 dark:text-gray-400"
                  >
                    align=&quot;end&quot;
                  </Body>
                  <ComponentPreview>
                    <Box
                      display="flex"
                      direction="row"
                      gap={3}
                      align="end"
                      className="h-32 bg-gray-100 dark:bg-gray-900"
                    >
                      <div className="w-16 h-16 bg-teal-500 rounded" />
                      <div className="w-16 h-20 bg-teal-500 rounded" />
                      <div className="w-16 h-12 bg-teal-500 rounded" />
                    </Box>
                  </ComponentPreview>
                </div>
              </div>
            </Stack>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <Stack spacing="heading-tight">
              <Heading level="h3">Justify Content</Heading>
              <div className="space-y-4">
                <div>
                  <Body
                    size="sm"
                    className="mb-2 text-gray-600 dark:text-gray-400"
                  >
                    justify=&quot;start&quot;
                  </Body>
                  <ComponentPreview>
                    <Box display="flex" direction="row" gap={3} justify="start">
                      <div className="w-16 h-16 bg-indigo-500 rounded" />
                      <div className="w-16 h-16 bg-indigo-500 rounded" />
                    </Box>
                  </ComponentPreview>
                </div>

                <div>
                  <Body
                    size="sm"
                    className="mb-2 text-gray-600 dark:text-gray-400"
                  >
                    justify=&quot;center&quot;
                  </Body>
                  <ComponentPreview>
                    <Box
                      display="flex"
                      direction="row"
                      gap={3}
                      justify="center"
                    >
                      <div className="w-16 h-16 bg-indigo-500 rounded" />
                      <div className="w-16 h-16 bg-indigo-500 rounded" />
                    </Box>
                  </ComponentPreview>
                </div>

                <div>
                  <Body
                    size="sm"
                    className="mb-2 text-gray-600 dark:text-gray-400"
                  >
                    justify=&quot;between&quot;
                  </Body>
                  <ComponentPreview>
                    <Box
                      display="flex"
                      direction="row"
                      gap={3}
                      justify="between"
                    >
                      <div className="w-16 h-16 bg-indigo-500 rounded" />
                      <div className="w-16 h-16 bg-indigo-500 rounded" />
                    </Box>
                  </ComponentPreview>
                </div>
              </div>
            </Stack>
          </div>
        </Stack>
      </PageSection>

      {/* Gap */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="gap">
            간격 (Gap)
          </Heading>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
            <div
              key={size}
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-6"
            >
              <Stack spacing="heading-tight">
                <Heading level="h3">gap=&quot;{size}&quot;</Heading>
                <div>
                  <ComponentPreview>
                    <Box display="flex" direction="row" gap={size as any}>
                      <div className="w-16 h-16 bg-cyan-500 rounded" />
                      <div className="w-16 h-16 bg-cyan-500 rounded" />
                      <div className="w-16 h-16 bg-cyan-500 rounded" />
                    </Box>
                  </ComponentPreview>
                  <div className="mt-4">
                    <CodeBlock
                      code={`<Box display="flex" direction="row" gap="${size}">
  <div>Item</div>
  <div>Item</div>
  <div>Item</div>
</Box>`}
                      language="tsx"
                      showLineNumbers={false}
                    />
                  </div>
                </div>
              </Stack>
            </div>
          ))}
        </Stack>
      </PageSection>

      {/* Usage */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="usage">
            사용 예시
          </Heading>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* Card Layout */}
          <Stack spacing="heading-tight">
            <Heading level="h3">카드 레이아웃</Heading>
            <div>
              <ComponentPreview>
                <Box display="flex" direction="row" gap={4} align="stretch">
                  <Box
                    display="flex"
                    direction="column"
                    gap={3}
                    className="flex-1 p-4 border border-gray-200 dark:border-gray-800 rounded"
                  >
                    <Body size="md" weight="bold">
                      카드 제목
                    </Body>
                    <Body size="sm">카드 내용입니다.</Body>
                  </Box>
                  <Box
                    display="flex"
                    direction="column"
                    gap={3}
                    className="flex-1 p-4 border border-gray-200 dark:border-gray-800 rounded"
                  >
                    <Body size="md" weight="bold">
                      카드 제목
                    </Body>
                    <Body size="sm">카드 내용입니다.</Body>
                  </Box>
                </Box>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Box display="flex" direction="row" gap={4}>
  <Box display="flex" direction="column" gap={3} className="flex-1 p-4 border rounded">
    <Body size="md" weight="bold">카드 제목</Body>
    <Body size="sm">카드 내용입니다.</Body>
  </Box>
  <Box display="flex" direction="column" gap={3} className="flex-1 p-4 border rounded">
    <Body size="md" weight="bold">카드 제목</Body>
    <Body size="sm">카드 내용입니다.</Body>
  </Box>
</Box>`}
                  language="tsx"
                />
              </div>
            </div>
          </Stack>

          {/* Centered Content */}
          <Stack spacing="heading-tight">
            <Heading level="h3">중앙 정렬 콘텐츠</Heading>
            <div>
              <ComponentPreview>
                <Box
                  display="flex"
                  direction="column"
                  align="center"
                  justify="center"
                  className="h-48 border border-gray-200 dark:border-gray-800 rounded"
                >
                  <Body size="lg" weight="bold">
                    중앙 정렬
                  </Body>
                  <Body size="sm">가로, 세로 모두 중앙에 위치</Body>
                </Box>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Box
  display="flex"
  direction="column"
  align="center"
  justify="center"
  className="h-48"
>
  <Body size="lg" weight="bold">중앙 정렬</Body>
  <Body size="sm">가로, 세로 모두 중앙에 위치</Body>
</Box>`}
                  language="tsx"
                />
              </div>
            </div>
          </Stack>

          {/* Polymorphic */}
          <Stack spacing="heading-tight">
            <Heading level="h3">다양한 HTML 태그</Heading>
            <div>
              <ComponentPreview>
                <div className="space-y-4">
                  <Box as="section" display="flex" direction="column" gap={3}>
                    <Body size="sm">section 태그로 렌더링</Body>
                  </Box>
                  <Box as="article" display="flex" direction="column" gap={3}>
                    <Body size="sm">article 태그로 렌더링</Body>
                  </Box>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Box as="section" display="flex" direction="column" gap={3}>
  <Body>section 태그로 렌더링</Body>
</Box>
<Box as="article" display="flex" direction="column" gap={3}>
  <Body>article 태그로 렌더링</Body>
</Box>`}
                  language="tsx"
                />
              </div>
            </div>
          </Stack>
        </Stack>
      </PageSection>

      {/* API */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="api">
            API
          </Heading>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-3 px-4">Prop</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Default</th>
                  <th className="text-left py-3 px-4">Description</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-300">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="py-3 px-4">
                    <code>display</code>
                  </td>
                  <td className="py-3 px-4">
                    <code>
                      &quot;flex&quot; | &quot;grid&quot; | &quot;block&quot;
                    </code>
                  </td>
                  <td className="py-3 px-4">
                    <code>&quot;flex&quot;</code>
                  </td>
                  <td className="py-3 px-4">Display 타입</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="py-3 px-4">
                    <code>direction</code>
                  </td>
                  <td className="py-3 px-4">
                    <code>&quot;row&quot; | &quot;col&quot;</code>
                  </td>
                  <td className="py-3 px-4">
                    <code>&quot;row&quot;</code>
                  </td>
                  <td className="py-3 px-4">
                    Flex 방향 (display=&quot;flex&quot;일 때)
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="py-3 px-4">
                    <code>align</code>
                  </td>
                  <td className="py-3 px-4">
                    <code>
                      &quot;start&quot; | &quot;center&quot; | &quot;end&quot; |
                      &quot;stretch&quot;
                    </code>
                  </td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">align-items (교차축 정렬)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="py-3 px-4">
                    <code>justify</code>
                  </td>
                  <td className="py-3 px-4">
                    <code>
                      &quot;start&quot; | &quot;center&quot; | &quot;end&quot; |
                      &quot;between&quot; | &quot;around&quot;
                    </code>
                  </td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">justify-content (주축 정렬)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="py-3 px-4">
                    <code>gap</code>
                  </td>
                  <td className="py-3 px-4">
                    <code>
                      &quot;xs&quot; | &quot;sm&quot; | &quot;md&quot; |
                      &quot;lg&quot; | &quot;xl&quot;
                    </code>
                  </td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">자식 요소 간 간격</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="py-3 px-4">
                    <code>as</code>
                  </td>
                  <td className="py-3 px-4">
                    <code>
                      &quot;div&quot; | &quot;section&quot; |
                      &quot;article&quot; | &quot;aside&quot; | &quot;main&quot;
                    </code>
                  </td>
                  <td className="py-3 px-4">
                    <code>&quot;div&quot;</code>
                  </td>
                  <td className="py-3 px-4">렌더링할 HTML 태그</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="py-3 px-4">
                    <code>className</code>
                  </td>
                  <td className="py-3 px-4">
                    <code>string</code>
                  </td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">추가 CSS 클래스</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">
                    <code>children</code>
                  </td>
                  <td className="py-3 px-4">
                    <code>ReactNode</code>
                  </td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">자식 요소</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Stack>
      </PageSection>

      {/* Guidelines */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="guidelines">
            사용 가이드라인
          </Heading>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <div className="rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/30 p-6">
            <Heading
              level="h3"
              className="text-green-900 dark:text-green-100 mb-3"
            >
              ✓ Box를 사용하기 적합한 경우
            </Heading>
            <ul className="list-disc list-inside space-y-2 text-green-800 dark:text-green-200">
              <li>Flex 또는 Grid 레이아웃 구성</li>
              <li>컴포넌트 내부 레이아웃 정리</li>
              <li>간단한 간격 조정</li>
              <li>정렬이 필요한 컨테이너</li>
            </ul>
          </div>

          <div className="rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 p-6">
            <Heading
              level="h3"
              className="text-amber-900 dark:text-amber-100 mb-3"
            >
              ⚠ 주의사항
            </Heading>
            <ul className="list-disc list-inside space-y-2 text-amber-800 dark:text-amber-200">
              <li>복잡한 레이아웃은 전용 컴포넌트 사용 권장</li>
              <li>시맨틱한 HTML 구조를 위해 as prop 적극 활용</li>
              <li>과도한 중첩은 피하고 간결하게 구성</li>
            </ul>
          </div>
        </Stack>
      </PageSection>

      {/* KRDS Compliance */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="krds">
            KRDS 준수사항
          </Heading>
          <div className="rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 p-6">
            <ul className="space-y-2 text-blue-900 dark:text-blue-100">
              <li>✓ KRDS Spacing 토큰 기반 간격 시스템</li>
              <li>✓ 일관된 레이아웃 구조 제공</li>
              <li>✓ 반응형 레이아웃 지원</li>
            </ul>
          </div>
        </Stack>
      </PageSection>
    </>
  );
}
