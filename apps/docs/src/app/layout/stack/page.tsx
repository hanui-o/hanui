'use client';

import { Heading, Body } from '@hanui/react';

import { Stack, VStack, HStack } from '@hanui/react';
import { ComponentPreview } from '@/components/docs/ComponentPreview';
import { CodeBlock } from '@/components/docs/CodeBlock';
import { Installation } from '@/components/docs/Installation';

export default function StackPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Heading level="h1" className="mb-4">
          Stack, VStack, HStack
        </Heading>
        <Body className="text-lg text-gray-600 dark:text-gray-400">
          KRDS 간격 시스템을 준수하는 유연한 레이아웃 컴포넌트. 수직(VStack),
          수평(HStack) 스택을 제공합니다.
        </Body>
      </div>

      <div className="mb-12">
        <ComponentPreview>
          <Stack spacing="md">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded">
              첫 번째 아이템
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded">
              두 번째 아이템
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded">
              세 번째 아이템
            </div>
          </Stack>
        </ComponentPreview>
      </div>

      {/* Overview */}
      <div className="mb-12">
        <Heading level="h2" className="mb-4">
          개요
        </Heading>
        <Body className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Stack 계열 컴포넌트는 요소들을 수직 또는 수평으로 정렬하고{' '}
          <strong>KRDS(한국형 웹 콘텐츠 접근성 지침)</strong>의 간격 기준을
          준수하는 레이아웃 컴포넌트입니다.
        </Body>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            <strong>Stack</strong>: 기본 수직 레이아웃 (direction prop으로 제어
            가능)
          </li>
          <li>
            <strong>VStack</strong>: 명시적 수직 레이아웃
          </li>
          <li>
            <strong>HStack</strong>: 명시적 수평 레이아웃
          </li>
        </ul>
      </div>

      <div className="mb-12">
        <Installation componentName="stack" />
      </div>

      {/* Usage */}
      <div className="mb-12">
        <Heading level="h2" className="mb-4">
          Usage
        </Heading>
        <Body className="mb-4">
          Stack, VStack, HStack 세 가지 컴포넌트를 제공합니다:
        </Body>

        <div className="space-y-6">
          <div>
            <Heading level="h3" className="text-base mb-2">
              Stack - 기본 수직 레이아웃
            </Heading>
            <CodeBlock
              code={`import { Stack } from '@hanui/react'

<Stack spacing="md">
  <div>첫 번째</div>
  <div>두 번째</div>
</Stack>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>

          <div>
            <Heading level="h3" className="text-base mb-2">
              VStack - 명시적 수직 레이아웃
            </Heading>
            <CodeBlock
              code={`import { VStack } from '@hanui/react'

<VStack spacing="md">
  <div>위</div>
  <div>아래</div>
</VStack>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>

          <div>
            <Heading level="h3" className="text-base mb-2">
              HStack - 수평 레이아웃
            </Heading>
            <CodeBlock
              code={`import { HStack } from '@hanui/react'

<HStack spacing="md">
  <div>왼쪽</div>
  <div>오른쪽</div>
</HStack>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </div>
      </div>

      {/* Examples */}
      <div className="mb-12">
        <Heading level="h2" className="mb-6">
          Examples
        </Heading>

        {/* VStack */}
        <div className="mb-10">
          <Heading level="h3" className="mb-4">
            VStack - 수직 스택
          </Heading>
          <ComponentPreview>
            <VStack spacing="md">
              <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded w-full">
                첫 번째 아이템
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded w-full">
                두 번째 아이템
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded w-full">
                세 번째 아이템
              </div>
            </VStack>
          </ComponentPreview>
          <div className="mt-4">
            <CodeBlock
              code={`<VStack spacing="md">
  <div>첫 번째 아이템</div>
  <div>두 번째 아이템</div>
  <div>세 번째 아이템</div>
</VStack>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </div>

        {/* HStack */}
        <div className="mb-10">
          <Heading level="h3" className="mb-4">
            HStack - 수평 스택
          </Heading>
          <ComponentPreview>
            <HStack spacing="md">
              <div className="bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded">
                왼쪽
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded">
                중앙
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded">
                오른쪽
              </div>
            </HStack>
          </ComponentPreview>
          <div className="mt-4">
            <CodeBlock
              code={`<HStack spacing="md">
  <div>왼쪽</div>
  <div>중앙</div>
  <div>오른쪽</div>
</HStack>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </div>

        {/* Heading Spacing */}
        <div className="mb-10">
          <Heading level="h3" className="mb-4">
            Heading Spacing (h1-h2)
          </Heading>
          <ComponentPreview>
            <Stack spacing="h1-h2">
              <h1 className="text-3xl font-bold">메인 제목</h1>
              <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400">
                부제목
              </h2>
            </Stack>
          </ComponentPreview>
          <div className="mt-4">
            <CodeBlock
              code={`<Stack spacing="h1-h2">
  <h1>메인 제목</h1>
  <h2>부제목</h2>
</Stack>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </div>

        {/* Form */}
        <div className="mb-10">
          <Heading level="h3" className="mb-4">
            Form
          </Heading>
          <ComponentPreview>
            <Stack spacing="form">
              <HStack>
                <label className="block text-sm font-medium mb-1">이름</label>
                <div className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2">
                  Input
                </div>
              </HStack>
              <HStack>
                <label className="block text-sm font-medium mb-1">이메일</label>
                <div className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2">
                  Input
                </div>
              </HStack>
            </Stack>
          </ComponentPreview>
          <div className="mt-4">
            <CodeBlock
              code={`<Stack spacing="form">
  <div>
    <label>이름</label>
    <input type="text" />
  </div>
  <div>
    <label>이메일</label>
    <input type="email" />
  </div>
</Stack>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </div>

        {/* Alignment */}
        <div className="mb-10">
          <Heading level="h3" className="mb-4">
            Alignment
          </Heading>
          <ComponentPreview>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold mb-2">Center Alignment</p>
                <Stack
                  spacing="sm"
                  align="center"
                  className="border border-gray-300 dark:border-gray-700 rounded p-4"
                >
                  <div className="bg-purple-100 dark:bg-purple-900/30 px-4 py-2 rounded">
                    중앙 정렬
                  </div>
                  <div className="bg-purple-100 dark:bg-purple-900/30 px-4 py-2 rounded">
                    아이템
                  </div>
                </Stack>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">
                  Space Between (HStack)
                </p>
                <HStack
                  justify="between"
                  className="border border-gray-300 dark:border-gray-700 rounded p-4"
                >
                  <div className="bg-orange-100 dark:bg-orange-900/30 px-4 py-2 rounded">
                    왼쪽
                  </div>
                  <div className="bg-orange-100 dark:bg-orange-900/30 px-4 py-2 rounded">
                    오른쪽
                  </div>
                </HStack>
              </div>
            </div>
          </ComponentPreview>
          <div className="mt-4">
            <CodeBlock
              code={`// 중앙 정렬
<VStack align="center">
  <div>중앙 정렬</div>
  <div>아이템</div>
</VStack>

// Space Between (수평)
<HStack justify="between">
  <div>왼쪽</div>
  <div>오른쪽</div>
</HStack>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </div>
      </div>

      {/* API Reference */}
      <div className="mb-12">
        <Heading level="h2" className="mb-6">
          API Reference
        </Heading>

        <Body className="mb-6">
          <strong>Stack</strong>, <strong>VStack</strong>,{' '}
          <strong>HStack</strong> 모두 동일한 props를 지원합니다. VStack과
          HStack은 direction prop이 고정되어 있습니다.
        </Body>

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
                  spacing
                </td>
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                  StackSpacing
                </td>
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                  &apos;md&apos;
                </td>
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                  간격 프리셋
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                  align
                </td>
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                  &apos;start&apos; | &apos;center&apos; | &apos;end&apos; |
                  &apos;stretch&apos;
                </td>
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                  -
                </td>
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                  교차축 정렬
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                  justify
                </td>
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                  &apos;start&apos; | &apos;center&apos; | &apos;end&apos; |
                  &apos;between&apos; | &apos;around&apos;
                </td>
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                  -
                </td>
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                  주축 정렬
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                  as
                </td>
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                  &apos;div&apos; | &apos;section&apos; | &apos;nav&apos; |
                  &apos;ul&apos; | ...
                </td>
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 font-mono text-sm">
                  &apos;div&apos;
                </td>
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-sm">
                  렌더링할 HTML 요소
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
