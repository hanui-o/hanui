'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
  Button,
  Container,
  Heading,
  Body,
  Stack,
} from '@hanui/react';
import Link from 'next/link';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

export default function CardPage() {
  return (
    <>
      <PageHeader
        title="Card"
        description="콘텐츠를 담는 KRDS 기반 카드 레이아웃 컴포넌트"
      />

      {/* Quick Start */}
      <PageSection>
        <ComponentPreview>
          <Card>
            <CardHeader>
              <CardTitle>카드 제목</CardTitle>
              <CardDescription>카드 설명입니다</CardDescription>
            </CardHeader>
            <CardBody>카드 본문 내용</CardBody>
            <CardFooter>
              <Button size="sm">확인</Button>
            </CardFooter>
          </Card>
        </ComponentPreview>
        <div className="mt-4">
          <CodeBlock
            code={`import { Card } from '@hanui/react';

<Card>
  <CardHeader>
    <CardTitle>카드 제목</CardTitle>
    <CardDescription>카드 설명</CardDescription>
  </CardHeader>
  <CardBody>내용</CardBody>
  <CardFooter>
    <Button>확인</Button>
  </CardFooter>
</Card>`}
            language="tsx"
            showLineNumbers={false}
          />
        </div>
      </PageSection>

      {/* Examples */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="examples">
            Examples
          </Heading>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* Variant */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Variant</Heading>
            <Body className="mb-4">세 가지 시각적 스타일을 지원합니다.</Body>
            <div>
              <ComponentPreview>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card variant="default">
                    <CardBody>Default (그림자)</CardBody>
                  </Card>
                  <Card variant="outlined">
                    <CardBody>Outlined (테두리)</CardBody>
                  </Card>
                  <Card variant="filled">
                    <CardBody>Filled (배경)</CardBody>
                  </Card>
                </div>
              </ComponentPreview>
            </div>
          </Stack>

          {/* Padding */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Padding</Heading>
            <div>
              <ComponentPreview>
                <div className="space-y-4">
                  <Card padding="sm">
                    <CardBody>Small Padding</CardBody>
                  </Card>
                  <Card padding="md">
                    <CardBody>Medium Padding</CardBody>
                  </Card>
                  <Card padding="lg">
                    <CardBody>Large Padding</CardBody>
                  </Card>
                </div>
              </ComponentPreview>
            </div>
          </Stack>

          {/* Hoverable */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Hoverable</Heading>
            <div>
              <ComponentPreview>
                <Card hoverable onClick={() => alert('클릭!')}>
                  <CardBody>클릭 가능한 카드 (마우스 올려보세요)</CardBody>
                </Card>
              </ComponentPreview>
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
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-20 dark:border-gray-80">
                  <th className="text-left py-3 px-4 font-semibold">Prop</th>
                  <th className="text-left py-3 px-4 font-semibold">Type</th>
                  <th className="text-left py-3 px-4 font-semibold">Default</th>
                  <th className="text-left py-3 px-4 font-semibold">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-20 dark:border-gray-80">
                  <td className="py-3 px-4 font-mono text-sm">variant</td>
                  <td className="py-3 px-4 font-mono text-sm">
                    &quot;default&quot; | &quot;outlined&quot; |
                    &quot;filled&quot;
                  </td>
                  <td className="py-3 px-4 font-mono text-sm">
                    &quot;default&quot;
                  </td>
                  <td className="py-3 px-4">카드의 시각적 스타일</td>
                </tr>
                <tr className="border-b border-gray-20 dark:border-gray-80">
                  <td className="py-3 px-4 font-mono text-sm">padding</td>
                  <td className="py-3 px-4 font-mono text-sm">
                    &quot;none&quot; | &quot;sm&quot; | &quot;md&quot; |
                    &quot;lg&quot;
                  </td>
                  <td className="py-3 px-4 font-mono text-sm">
                    &quot;md&quot;
                  </td>
                  <td className="py-3 px-4">패딩 크기</td>
                </tr>
                <tr className="border-b border-gray-20 dark:border-gray-80">
                  <td className="py-3 px-4 font-mono text-sm">hoverable</td>
                  <td className="py-3 px-4 font-mono text-sm">boolean</td>
                  <td className="py-3 px-4 font-mono text-sm">false</td>
                  <td className="py-3 px-4">호버 효과 활성화</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Stack>
      </PageSection>
    </>
  );
}
