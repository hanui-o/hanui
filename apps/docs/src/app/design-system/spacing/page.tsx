'use client';

import {
  Stack,
  HStack,
  PageNavigation,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Code,
  Body,
  Card,
} from '@/components/hanui';
import { Section, Button, Input, Heading } from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';
import { PageSection } from '@/components/content/PageSection';
import { SectionHeading } from '@/components/hanui/section-header';

export default function SpacingPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        id="spacing"
        title="Spacing"
        description="HANUI의 Stack과 Section 컴포넌트는 시맨틱한 간격 시스템을 제공합니다. 의미 기반의 spacing prop을 사용하여 일관된 레이아웃을 쉽게 구성할 수 있습니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <PageSection>
            <SectionHeading
              level="h2"
              id="overview"
              title="개요"
              description="HANUI의 Stack과 Section 컴포넌트는 시맨틱한 간격 시스템을 제공합니다. 의미 기반의 spacing prop을 사용하여 일관된 레이아웃을 쉽게 구성할 수 있습니다."
            />
          </PageSection>

          {/* SectionHeading 사용 예시 */}
          <PageSection>
            <SectionHeading
              level="h2"
              id="section-header-usage"
              title="SectionHeading 컴포넌트 사용법"
              description="SectionHeading는 PageSection 내부에서 사용하는 제목과 설명을 일관되게 표시하는 컴포넌트입니다. 레벨별로 자동으로 적절한 간격과 margin-bottom이 적용됩니다."
            />

            <Stack gap="lg" className="mt-2 md:mt-4">
              <div className="bg-krds-gray-5 p-6 rounded-lg">
                <Heading level="h5" className="mb-4">
                  레벨별 margin-bottom 값:
                </Heading>
                <ul className="space-y-2 text-body-sm">
                  <li>h1: 48px (mb-12)</li>
                  <li>h2: 40px (mb-10)</li>
                  <li>h3: 24px (mb-6)</li>
                  <li>h4: 16px (mb-4)</li>
                  <li>h5: 16px (mb-4)</li>
                </ul>
              </div>

              <div>
                <Heading level="h5" className="mb-3">
                  사용 예시:
                </Heading>
                <ComponentPreview>
                  <Stack gap="sm">
                    <SectionHeading
                      level="h1"
                      title="h1 제목"
                      description="페이지의 주요 섹션을 나타내는 최상위 제목입니다. 가장 큰 간격(48px)이 적용됩니다."
                    />
                    <SectionHeading
                      level="h2"
                      title="h2 제목"
                      description="주요 섹션의 하위 제목으로, 40px의 간격이 적용됩니다."
                    />
                    <SectionHeading
                      level="h3"
                      title="h3 제목"
                      description="세부 섹션 제목으로, 24px의 간격이 적용됩니다."
                    />
                    <SectionHeading
                      level="h4"
                      title="h4 제목"
                      description="소제목으로, 16px의 간격이 적용됩니다."
                    />
                    <SectionHeading
                      level="h5"
                      title="h5 제목"
                      description="최소 단위 제목으로, 16px의 간격이 적용됩니다."
                    />
                  </Stack>
                </ComponentPreview>
                <CodeBlock
                  code={`import { SectionHeading } from '@/components/hanui/section-header';

// 설명과 함께 사용
<SectionHeading
  level="h2"
  id="overview"
  title="개요"
  description="이 섹션에 대한 설명입니다."
/>

// 설명 없이 사용 (레벨별 margin-bottom만 적용)
<SectionHeading
  level="h3"
  title="서브 섹션"
/>

// 커스텀 설명 콘텐츠
<SectionHeading level="h2" title="고급 기능">
  <Body className="text-krds-gray-70">
    커스텀 내용 <strong>강조</strong> 가능
  </Body>
</SectionHeading>`}
                  language="tsx"
                />
              </div>

              <div className="bg-krds-primary-5 border border-krds-primary-20 rounded-lg p-4">
                <Body size="sm">
                  <strong>팁:</strong> PageSection 내부에서 제목과 설명이 필요한
                  경우 항상 SectionHeading를 사용하세요. 레벨별로 자동으로
                  적절한 간격이 적용되므로 별도로 margin이나 spacing을 신경 쓸
                  필요가 없습니다.
                </Body>
              </div>
            </Stack>
          </PageSection>

          {/* 컴포넌트 간격 */}
          <PageSection>
            <SectionHeading
              level="h2"
              id="component-spacing"
              title="컴포넌트 간격"
            />

            <Stack gap="lg" className="mt-2 md:mt-4">
              <Body>
                함께 사용되는 비슷한 크기의 구성 요소는 동일한 간격을 적용하는
                것이 좋습니다. HANUI는 다양한 컴포넌트 조합에 대한 시맨틱한
                간격을 제공합니다.
              </Body>

              <Stack gap="xl">
                <div>
                  <SectionHeading
                    level="h3"
                    title="카드 리스트"
                    description="카드 세로형, 가로형, 모듈형 간격은 모두 gap-7(24px)을 사용합니다. 대체로 세로형 카드 리스트의 간격은 gutter 값으로 적용합니다."
                  />
                  <ComponentPreview>
                    <Stack gap="md">
                      <div className="p-6 bg-krds-white rounded-lg border border-krds-gray-20">
                        <h4 className="text-heading-sm font-semibold mb-2">
                          카드 1
                        </h4>
                        <p className="text-body-sm text-krds-gray-70">
                          카드 내용입니다.
                        </p>
                      </div>
                      <div className="p-6 bg-krds-white rounded-lg border border-krds-gray-20">
                        <h4 className="text-heading-sm font-semibold mb-2">
                          카드 2
                        </h4>
                        <p className="text-body-sm text-krds-gray-70">
                          카드 내용입니다.
                        </p>
                      </div>
                      <div className="p-6 bg-krds-white rounded-lg border border-krds-gray-20">
                        <h4 className="text-heading-sm font-semibold mb-2">
                          카드 3
                        </h4>
                        <p className="text-body-sm text-krds-gray-70">
                          카드 내용입니다.
                        </p>
                      </div>
                    </Stack>
                  </ComponentPreview>
                  <CodeBlock
                    code={`<Stack gap="md">
  <Card>카드 1</Card>
  <Card>카드 2</Card>
  <Card>카드 3</Card>
</Stack>
// gap-7 (24px) 적용`}
                    language="tsx"
                    showLineNumbers={false}
                  />
                </div>

                <div>
                  <SectionHeading
                    level="h3"
                    title="인풋 (Input)"
                    description="인풋 컴포넌트 간 간격은 'form' 프리셋을 사용합니다. 가로형은 'md', 세로형은 'form' spacing을 사용합니다."
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Heading level="h5" className="mb-2">
                        가로형 조합
                      </Heading>
                      <ComponentPreview>
                        <HStack gap="md">
                          <Input placeholder="이름" />
                          <Input placeholder="이메일" />
                        </HStack>
                      </ComponentPreview>
                      <CodeBlock
                        code={`<HStack gap="md">
  <Input placeholder="이름" />
  <Input placeholder="이메일" />
</HStack>
// gap-5 (16px) 적용`}
                        language="tsx"
                        showLineNumbers={false}
                      />
                    </div>
                    <div>
                      <Heading level="h5" className="mb-2">
                        세로형 조합
                      </Heading>
                      <ComponentPreview>
                        <Stack gap="md">
                          <Input placeholder="이름" />
                          <Input placeholder="이메일" />
                        </Stack>
                      </ComponentPreview>
                      <CodeBlock
                        code={`<Stack gap="md">
  <Input placeholder="이름" />
  <Input placeholder="이메일" />
</Stack>
// gap-5~gap-7 (16px~24px) 적용`}
                        language="tsx"
                        showLineNumbers={false}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <SectionHeading
                    level="h3"
                    title="체크박스, 라디오 버튼"
                    description="체크박스나 라디오 버튼 리스트는 'form' spacing을 사용합니다. 가로형은 'lg' spacing을 사용하여 충분한 간격을 유지합니다."
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Heading level="h5" className="mb-2">
                        리스트 형태
                      </Heading>
                      <ComponentPreview>
                        <Stack gap="md">
                          <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            <span className="text-body-sm">옵션 1</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            <span className="text-body-sm">옵션 2</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            <span className="text-body-sm">옵션 3</span>
                          </label>
                        </Stack>
                      </ComponentPreview>
                    </div>
                    <div>
                      <Heading level="h5" className="mb-2">
                        가로형
                      </Heading>
                      <ComponentPreview>
                        <HStack gap="lg">
                          <label className="flex items-center gap-2">
                            <input type="radio" name="option" />
                            <span className="text-body-sm">옵션 1</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="radio" name="option" />
                            <span className="text-body-sm">옵션 2</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="radio" name="option" />
                            <span className="text-body-sm">옵션 3</span>
                          </label>
                        </HStack>
                      </ComponentPreview>
                    </div>
                  </div>
                </div>
              </Stack>
            </Stack>
          </PageSection>

          {/* 컴포넌트 내 패딩 */}
          <PageSection>
            <SectionHeading
              level="h2"
              id="component-padding"
              title="컴포넌트 내 패딩"
              description="Section 컴포넌트의 padding prop을 사용하여 컴포넌트 내부 패딩을 일관되게 적용할 수 있습니다."
            />

            <Stack gap="lg" className="mt-2 md:mt-4">
              <Stack gap="xl">
                <div>
                  <SectionHeading
                    level="h3"
                    title="카드"
                    description="카드 패딩은 'card-md', 'card-lg', 'card-sm' 등의 프리셋을 사용합니다. 반응형으로 모바일과 PC에서 자동으로 조정됩니다."
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Heading level="h5" className="mb-2">
                        PC (24px / 32px)
                      </Heading>
                      <ComponentPreview>
                        <Section
                          padding="card-md"
                          background="white"
                          className="rounded-lg border"
                        >
                          <h4 className="text-heading-sm font-semibold mb-2">
                            카드 제목
                          </h4>
                          <p className="text-body-sm text-krds-gray-70">
                            카드 내용입니다. PC에서는 더 넉넉한 패딩이
                            적용됩니다.
                          </p>
                        </Section>
                      </ComponentPreview>
                    </div>
                    <div>
                      <Heading level="h5" className="mb-2">
                        Mobile (24px)
                      </Heading>
                      <ComponentPreview>
                        <Section
                          padding="card-md"
                          background="white"
                          className="rounded-lg border"
                        >
                          <h4 className="text-heading-sm font-semibold mb-2">
                            카드 제목
                          </h4>
                          <p className="text-body-sm text-krds-gray-70">
                            카드 내용입니다. 모바일에서는 공간을 효율적으로
                            사용합니다.
                          </p>
                        </Section>
                      </ComponentPreview>
                    </div>
                  </div>
                </div>

                <div>
                  <SectionHeading
                    level="h3"
                    title="텍스트 입력 필드"
                    description="입력 필드 그룹은 'input-group' spacing을 사용합니다. 레이블, 입력 박스, 설명 사이의 간격이 자동으로 적용됩니다."
                  />
                  <ComponentPreview>
                    <Stack gap="xs" className="max-w-md">
                      <label className="text-body-sm font-semibold text-krds-gray-95">
                        이름
                      </label>
                      <input
                        type="text"
                        className="px-4 py-2 border border-krds-gray-20 rounded-md text-body-md"
                        placeholder="홍길동"
                      />
                      <p className="text-body-xs text-krds-gray-70">
                        부가 설명 텍스트 (gap-3, 8px 간격)
                      </p>
                    </Stack>
                  </ComponentPreview>
                  <CodeBlock
                    code={`<Stack gap="xs">
  <label>이름</label>
  <input className="px-4 py-2" placeholder="홍길동" />
  <p>부가 설명</p>
</Stack>
// gap-3 (8px) 간격, padding-6 (16px) 패딩`}
                    language="tsx"
                    showLineNumbers={false}
                  />
                </div>
              </Stack>
            </Stack>
          </PageSection>

          <PageSection>
            <Stack gap="lg">
              <Stack gap="sm">
                <h2
                  id="why-semantic-spacing"
                  className="text-heading-lg font-bold"
                >
                  왜 시맨틱 스페이싱인가?
                </h2>

                <div className="bg-krds-gray-5 p-6 rounded-lg">
                  <Stack gap="content-loose">
                    <h3 className="text-heading-sm font-semibold text-krds-primary-text">
                      문제점
                    </h3>
                    <p className="text-body-md text-krds-gray-70">
                      기존 방식에서는 "폼에는 gap-5를 쓰고, 카드 리스트에는
                      gap-7을 쓴다"는 규칙을 모든 개발자가 외워야 했습니다. 바쁜
                      작업 중에 문서를 확인하며 작업하는 것은 비효율적입니다.
                    </p>
                  </Stack>

                  <Stack gap="content-loose" className="mt-6">
                    <h3 className="text-heading-sm font-semibold text-krds-primary-text">
                      해결책
                    </h3>
                    <p className="text-body-md text-krds-gray-70">
                      시맨틱 컴포넌트를 사용하면{' '}
                      <code className="bg-krds-gray-10 px-2 py-1 rounded">
                        gap="md"
                      </code>
                      처럼 의미를 명시하면 자동으로 올바른 간격이 적용됩니다.
                    </p>
                  </Stack>
                </div>
              </Stack>

              <Stack gap="sm">
                <SectionHeading
                  level="h2"
                  id="stack-gap-layout"
                  title="Stack - Gap Layout"
                  description="Stack은 수직/수평 방향으로 요소를 배치하고 간격을 관리하는 컴포넌트입니다. 시맨틱한 spacing prop을 사용하여 일관된 간격을 적용할 수 있습니다."
                />

                <Stack gap="content-loose">
                  <SectionHeading level="h3" title="폼 레이아웃" />
                  <ComponentPreview>
                    <Stack gap="md" className="max-w-md">
                      <div>
                        <label className="block font-medium mb-1.5">이름</label>
                        <Input placeholder="홍길동" />
                      </div>
                      <div>
                        <label className="block font-medium mb-1.5">
                          이메일
                        </label>
                        <Input type="email" placeholder="hong@example.com" />
                      </div>
                      <div>
                        <label className="block font-medium mb-1.5">
                          비밀번호
                        </label>
                        <Input type="password" placeholder="********" />
                      </div>
                      <Button className="w-full">제출</Button>
                    </Stack>
                  </ComponentPreview>
                  <CodeBlock
                    code={`<Stack gap="md">
  <div>
    <label>이름</label>
    <Input placeholder="홍길동" />
  </div>
  <div>
    <label>이메일</label>
    <Input type="email" placeholder="hong@example.com" />
  </div>
  <Button>제출</Button>
</Stack>`}
                    language="tsx"
                  />
                </Stack>

                <Stack gap="content-loose">
                  <h3 className="text-heading-md font-bold">카드 리스트</h3>
                  <ComponentPreview>
                    <Stack gap="md">
                      <div className="p-6 bg-krds-white rounded-lg border border-krds-gray-20">
                        <h4 className="text-heading-sm font-semibold mb-2">
                          카드 1
                        </h4>
                        <p className="text-body-sm text-krds-gray-70">
                          카드 내용입니다.
                        </p>
                      </div>
                      <div className="p-6 bg-krds-white rounded-lg border border-krds-gray-20">
                        <h4 className="text-heading-sm font-semibold mb-2">
                          카드 2
                        </h4>
                        <p className="text-body-sm text-krds-gray-70">
                          카드 내용입니다.
                        </p>
                      </div>
                      <div className="p-6 bg-krds-white rounded-lg border border-krds-gray-20">
                        <h4 className="text-heading-sm font-semibold mb-2">
                          카드 3
                        </h4>
                        <p className="text-body-sm text-krds-gray-70">
                          카드 내용입니다.
                        </p>
                      </div>
                    </Stack>
                  </ComponentPreview>
                  <CodeBlock
                    code={`<Stack gap="md">
  <Card>카드 1</Card>
  <Card>카드 2</Card>
  <Card>카드 3</Card>
</Stack>`}
                    language="tsx"
                  />
                </Stack>

                <Stack gap="content-loose">
                  <h3 className="text-heading-md font-bold">제목 계층</h3>
                  <ComponentPreview>
                    <Stack gap="lg">
                      <h1 className="text-heading-xl font-bold">메인 제목</h1>
                      <Stack gap="sm">
                        <h2 className="text-heading-lg font-bold">
                          서브 제목 1
                        </h2>
                        <Stack gap="content-loose">
                          <h3 className="text-heading-md font-bold">소제목</h3>
                          <p className="text-body-md text-krds-gray-70">
                            콘텐츠 내용입니다. 타이포그래피 계층에 맞춰 자동으로
                            간격이 조정됩니다.
                          </p>
                        </Stack>
                      </Stack>
                    </Stack>
                  </ComponentPreview>
                  <CodeBlock
                    code={`<Stack gap="lg">
  <h1>메인 제목</h1>
  <Stack gap="sm">
    <h2>서브 제목</h2>
    <Stack gap="content-loose">
      <h3>소제목</h3>
      <p>콘텐츠 내용</p>
    </Stack>
  </Stack>
</Stack>`}
                    language="tsx"
                  />
                </Stack>

                <Stack gap="content-loose">
                  <h3 className="text-heading-md font-bold">
                    가로 방향 레이아웃
                  </h3>
                  <ComponentPreview>
                    <HStack gap="md" align="center">
                      <Button variant="primary">저장</Button>
                      <Button variant="outline">취소</Button>
                      <Button variant="ghost">삭제</Button>
                    </HStack>
                  </ComponentPreview>
                  <CodeBlock
                    code={`<HStack gap="md" align="center">
  <Button variant="primary">저장</Button>
  <Button variant="outline">취소</Button>
  <Button variant="ghost">삭제</Button>
</HStack>`}
                    language="tsx"
                  />
                </Stack>

                <Stack gap="content-loose">
                  <h3 className="text-heading-md font-bold">
                    전체 스페이싱 프리셋
                  </h3>
                  <p className="text-body-md text-krds-gray-70">
                    모든 간격은 반응형으로 모바일과 PC에서 자동으로 조정됩니다.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">프리셋</th>
                          <th className="text-left py-3 px-4">모바일</th>
                          <th className="text-left py-3 px-4">PC</th>
                          <th className="text-left py-3 px-4">용도</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b bg-krds-gray-5">
                          <td colSpan={4} className="py-2 px-4 font-semibold">
                            Header & Navigation
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">
                            <code>header-breadcrumb</code>
                          </td>
                          <td className="py-3 px-4">16px</td>
                          <td className="py-3 px-4">24px</td>
                          <td className="py-3 px-4">헤더와 브레드크럼 사이</td>
                        </tr>

                        <tr className="border-b bg-krds-gray-5">
                          <td colSpan={4} className="py-2 px-4 font-semibold">
                            Layout Spacing
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">
                            <code>left-contents</code>
                          </td>
                          <td className="py-3 px-4">0px</td>
                          <td className="py-3 px-4">64px</td>
                          <td className="py-3 px-4">사이드바-콘텐츠 간격</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">
                            <code>page-inner</code>
                          </td>
                          <td className="py-3 px-4">24px</td>
                          <td className="py-3 px-4">32px</td>
                          <td className="py-3 px-4">페이지 내부 간격</td>
                        </tr>

                        <tr className="border-b bg-krds-gray-5">
                          <td colSpan={4} className="py-2 px-4 font-semibold">
                            Content Spacing
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">
                            <code>content-tight</code>
                          </td>
                          <td className="py-3 px-4">4px</td>
                          <td className="py-3 px-4">8px</td>
                          <td className="py-3 px-4">밀접한 콘텐츠 간격</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">
                            <code>content-normal</code>
                          </td>
                          <td className="py-3 px-4">8px</td>
                          <td className="py-3 px-4">12px</td>
                          <td className="py-3 px-4">일반 콘텐츠 간격</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">
                            <code>content-loose</code>
                          </td>
                          <td className="py-3 px-4">12px</td>
                          <td className="py-3 px-4">16px</td>
                          <td className="py-3 px-4">여유 있는 콘텐츠 간격</td>
                        </tr>

                        <tr className="border-b bg-krds-gray-5">
                          <td colSpan={4} className="py-2 px-4 font-semibold">
                            Form & Input
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">
                            <code>form</code>
                          </td>
                          <td className="py-3 px-4">16px</td>
                          <td className="py-3 px-4">24px</td>
                          <td className="py-3 px-4">폼 필드 간격</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">
                            <code>input-group</code>
                          </td>
                          <td className="py-3 px-4">8px</td>
                          <td className="py-3 px-4">8px</td>
                          <td className="py-3 px-4">
                            레이블-입력 박스-설명 간격
                          </td>
                        </tr>

                        <tr className="border-b bg-krds-gray-5">
                          <td colSpan={4} className="py-2 px-4 font-semibold">
                            Card & List
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">
                            <code>card-list</code>
                          </td>
                          <td className="py-3 px-4">24px</td>
                          <td className="py-3 px-4">24px</td>
                          <td className="py-3 px-4">카드 리스트 간격</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">
                            <code>list-tight</code>
                          </td>
                          <td className="py-3 px-4">8px</td>
                          <td className="py-3 px-4">12px</td>
                          <td className="py-3 px-4">밀집 리스트 항목 간격</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">
                            <code>list-normal</code>
                          </td>
                          <td className="py-3 px-4">12px</td>
                          <td className="py-3 px-4">16px</td>
                          <td className="py-3 px-4">일반 리스트 항목 간격</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Stack>
              </Stack>

              <Stack gap="sm">
                <SectionHeading
                  level="h2"
                  id="section-padding"
                  title="Section - Padding System"
                  description="Section 컴포넌트는 패딩과 배경을 함께 관리하여 일관된 내부 간격을 제공합니다."
                />

                <Stack gap="content-loose">
                  <h3 className="text-heading-md font-bold">
                    기본 사용법 (Padding Prop)
                  </h3>
                  <ComponentPreview>
                    <Section
                      padding="card-md"
                      background="white"
                      className="rounded-lg border"
                    >
                      <Stack gap="sm">
                        <h3 className="text-heading-sm font-semibold">
                          카드 제목
                        </h3>
                        <p className="text-body-sm text-krds-gray-70">
                          Section 컴포넌트의 padding prop을 사용하면 시맨틱한
                          프리셋이 자동 적용됩니다.
                        </p>
                      </Stack>
                    </Section>
                  </ComponentPreview>
                  <CodeBlock
                    code={`<Section padding="card-md" background="white" className="rounded-lg border">
  <Stack gap="sm">
    <h3>카드 제목</h3>
    <p>카드 내용</p>
  </Stack>
</Section>`}
                    language="tsx"
                  />
                </Stack>

                <Stack gap="content-loose">
                  <h3 className="text-heading-md font-bold">패딩 프리셋</h3>
                  <p className="text-body-md text-krds-gray-70">
                    Section은 다양한 상황에 맞는 패딩 프리셋을 제공합니다:
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">프리셋</th>
                          <th className="text-left py-3 px-4">모바일</th>
                          <th className="text-left py-3 px-4">PC</th>
                          <th className="text-left py-3 px-4">용도</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b bg-krds-gray-5">
                          <td colSpan={4} className="py-2 px-4 font-semibold">
                            Card Padding
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">
                            <code>card-sm</code>
                          </td>
                          <td className="py-3 px-4">16px</td>
                          <td className="py-3 px-4">24px</td>
                          <td className="py-3 px-4">작은 카드</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">
                            <code>card-md</code>
                          </td>
                          <td className="py-3 px-4">24px</td>
                          <td className="py-3 px-4">32px</td>
                          <td className="py-3 px-4">일반 카드</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">
                            <code>card-lg</code>
                          </td>
                          <td className="py-3 px-4">32px</td>
                          <td className="py-3 px-4">40px</td>
                          <td className="py-3 px-4">큰 카드</td>
                        </tr>

                        <tr className="border-b bg-krds-gray-5">
                          <td colSpan={4} className="py-2 px-4 font-semibold">
                            Layout Padding
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">
                            <code>page</code>
                          </td>
                          <td className="py-3 px-4">24px</td>
                          <td className="py-3 px-4">48px</td>
                          <td className="py-3 px-4">페이지 컨테이너</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">
                            <code>header</code>
                          </td>
                          <td className="py-3 px-4">16px</td>
                          <td className="py-3 px-4">24px</td>
                          <td className="py-3 px-4">헤더 영역</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">
                            <code>footer</code>
                          </td>
                          <td className="py-3 px-4">32px</td>
                          <td className="py-3 px-4">48px</td>
                          <td className="py-3 px-4">푸터 영역</td>
                        </tr>

                        <tr className="border-b bg-krds-gray-5">
                          <td colSpan={4} className="py-2 px-4 font-semibold">
                            Content Area Padding
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">
                            <code>content-tight</code>
                          </td>
                          <td className="py-3 px-4">12px</td>
                          <td className="py-3 px-4">16px</td>
                          <td className="py-3 px-4">밀집 콘텐츠 영역</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">
                            <code>content-area</code>
                          </td>
                          <td className="py-3 px-4">16px</td>
                          <td className="py-3 px-4">24px</td>
                          <td className="py-3 px-4">일반 콘텐츠 영역</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Stack>

                <Stack gap="content-loose">
                  <h3 className="text-heading-md font-bold">배경 스타일</h3>
                  <p className="text-body-md text-krds-gray-70">
                    background prop으로 배경을 간편하게 설정할 수 있습니다:
                  </p>
                  <Stack gap="md">
                    <ComponentPreview>
                      <Stack gap="md">
                        <Section
                          padding="card-md"
                          background="white"
                          className="rounded-lg"
                        >
                          <p className="text-body-sm">
                            background="white" - 흰색 배경
                          </p>
                        </Section>
                        <Section
                          padding="card-md"
                          background="gray"
                          className="rounded-lg"
                        >
                          <p className="text-body-sm">
                            background="gray" - 회색 배경
                          </p>
                        </Section>
                        <Section
                          padding="card-md"
                          background="primary"
                          className="rounded-lg"
                        >
                          <p className="text-body-sm text-krds-white">
                            background="primary" - 프라이머리 배경
                          </p>
                        </Section>
                      </Stack>
                    </ComponentPreview>
                  </Stack>
                </Stack>

                <Stack gap="content-loose">
                  <h3 className="text-heading-md font-bold">실전 예시</h3>
                  <ComponentPreview>
                    <Stack gap="sm">
                      {/* Header */}
                      <Section
                        padding="header"
                        background="white"
                        as="header"
                        className="rounded-lg border"
                      >
                        <Stack
                          direction="row"
                          gap="md"
                          align="center"
                          justify="between"
                        >
                          <h2 className="text-heading-md font-bold">
                            대시보드
                          </h2>
                          <Section
                            padding="card-xsmall"
                            background="gray"
                            as="div"
                            className="rounded-md"
                          >
                            <p className="text-body-xs">알림 3</p>
                          </Section>
                        </Stack>
                      </Section>

                      {/* Stats Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Section
                          padding="card-medium"
                          background="white"
                          className="rounded-lg border"
                        >
                          <Stack gap="xs">
                            <p className="text-body-sm text-krds-gray-70">
                              총 방문자
                            </p>
                            <p className="text-heading-lg font-bold">1,234</p>
                          </Stack>
                        </Section>
                        <Section
                          padding="card-medium"
                          background="white"
                          className="rounded-lg border"
                        >
                          <Stack gap="xs">
                            <p className="text-body-sm text-krds-gray-70">
                              신규 사용자
                            </p>
                            <p className="text-heading-lg font-bold">89</p>
                          </Stack>
                        </Section>
                        <Section
                          padding="card-medium"
                          background="white"
                          className="rounded-lg border"
                        >
                          <Stack gap="xs">
                            <p className="text-body-sm text-krds-gray-70">
                              전환율
                            </p>
                            <p className="text-heading-lg font-bold">3.2%</p>
                          </Stack>
                        </Section>
                      </div>

                      {/* Main Content */}
                      <Section
                        padding="content-area"
                        background="white"
                        className="rounded-lg border"
                      >
                        <Stack gap="content-loose">
                          <h3 className="text-heading-sm font-bold">
                            최근 활동
                          </h3>
                          <Stack gap="md">
                            <Section
                              padding="card-small"
                              background="gray"
                              className="rounded-md"
                            >
                              <p className="text-body-sm">
                                사용자 A가 로그인했습니다.
                              </p>
                            </Section>
                            <Section
                              padding="card-small"
                              background="gray"
                              className="rounded-md"
                            >
                              <p className="text-body-sm">
                                새로운 주문이 접수되었습니다.
                              </p>
                            </Section>
                          </Stack>
                        </Stack>
                      </Section>
                    </Stack>
                  </ComponentPreview>
                  <CodeBlock
                    code={`<Stack gap="sm">
  {/* Header */}
  <Section padding="header" background="white" as="header">
    <h2>대시보드</h2>
    <Section padding="card-xsmall" background="gray" as="div">
      알림 3
    </Section>
  </Section>

  {/* Stats Cards */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <Section padding="card-medium" background="white">
      <Stack gap="xs">
        <p>총 방문자</p>
        <p className="text-heading-lg">1,234</p>
      </Stack>
    </Section>
    {/* 다른 통계 카드들... */}
  </div>

  {/* Main Content */}
  <Section padding="content-area" background="white">
    <Stack gap="content-loose">
      <h3>최근 활동</h3>
      <Stack gap="md">
        <Section padding="card-small" background="gray">
          <p>사용자 A가 로그인했습니다.</p>
        </Section>
      </Stack>
    </Stack>
  </Section>
</Stack>`}
                    language="tsx"
                  />
                </Stack>
              </Stack>

              <Stack gap="sm">
                <h2 id="best-practices" className="text-heading-lg font-bold">
                  모범 사례
                </h2>

                <Stack gap="md">
                  <Section
                    padding="card-md"
                    background="white"
                    className="rounded-lg border"
                  >
                    <h3 className="text-heading-sm font-semibold mb-2">
                      1. 시맨틱 프리셋 우선 사용
                    </h3>
                    <p className="text-body-sm text-krds-gray-70">
                      가능하면 "form", "card-list" 같은 시맨틱 프리셋을
                      사용하세요. 코드의 의도가 명확해지고 일관된 간격이
                      자동으로 적용됩니다.
                    </p>
                  </Section>

                  <Section
                    padding="card-md"
                    background="white"
                    className="rounded-lg border"
                  >
                    <h3 className="text-heading-sm font-semibold mb-2">
                      2. 시맨틱 HTML 요소 활용
                    </h3>
                    <p className="text-body-sm text-krds-gray-70">
                      as prop을 사용하여 적절한 시맨틱 HTML 요소를 렌더링하세요.
                      접근성과 SEO에 도움이 됩니다.
                    </p>
                  </Section>

                  <Section
                    padding="card-md"
                    background="white"
                    className="rounded-lg border"
                  >
                    <h3 className="text-heading-sm font-semibold mb-2">
                      3. 일관된 간격 유지
                    </h3>
                    <p className="text-body-sm text-krds-gray-70">
                      직접 gap/padding 클래스를 사용하지 말고 Stack/Section을
                      사용하여 프로젝트 전체에서 일관된 간격을 유지하세요.
                    </p>
                  </Section>

                  <Section
                    padding="card-md"
                    background="white"
                    className="rounded-lg border"
                  >
                    <h3 className="text-heading-sm font-semibold mb-2">
                      4. 중첩 사용
                    </h3>
                    <p className="text-body-sm text-krds-gray-70">
                      복잡한 레이아웃은 Stack과 Section을 중첩하여 구성하세요.
                      각 레벨에서 적절한 시맨틱 프리셋을 사용하면 됩니다.
                    </p>
                  </Section>
                </Stack>
              </Stack>
            </Stack>
          </PageSection>
        </TabsContent>

        <TabsContent value="api">
          <Section>
            <SectionHeading
              level="h2"
              id="api-reference"
              title="API 레퍼런스"
            />

            {/* Spacing Scale */}
            <PageSection>
              <SectionHeading level="h3" title="간격 스케일 (Spacing Scale)">
                <Body>
                  HANUI는 Tailwind CSS 기본 간격 스케일을 사용합니다. 8px 기반의
                  일관된 간격 시스템을 제공합니다.
                </Body>
              </SectionHeading>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Token</TableHead>
                    <TableHead>Value (rem)</TableHead>
                    <TableHead>Value (px)</TableHead>
                    <TableHead>Use Case</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">none / 0</Code>
                    </TableCell>
                    <TableCell className="text-krds-gray-70">0rem</TableCell>
                    <TableCell className="text-krds-gray-70">0px</TableCell>
                    <TableCell>간격 없음</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">xs / 1</Code>
                    </TableCell>
                    <TableCell className="text-krds-gray-70">0.25rem</TableCell>
                    <TableCell className="text-krds-gray-70">4px</TableCell>
                    <TableCell>아주 밀접한 요소</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">sm / 2</Code>
                    </TableCell>
                    <TableCell className="text-krds-gray-70">0.5rem</TableCell>
                    <TableCell className="text-krds-gray-70">8px</TableCell>
                    <TableCell>
                      밀접한 요소 (레이블-입력박스, 아이콘-텍스트)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">md / 4</Code>
                    </TableCell>
                    <TableCell className="text-krds-gray-70">1rem</TableCell>
                    <TableCell className="text-krds-gray-70">16px</TableCell>
                    <TableCell>일반 요소 간격 (폼 필드, 버튼)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">lg / 6</Code>
                    </TableCell>
                    <TableCell className="text-krds-gray-70">1.5rem</TableCell>
                    <TableCell className="text-krds-gray-70">24px</TableCell>
                    <TableCell>카드 리스트, 섹션 간격</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">xl / 8</Code>
                    </TableCell>
                    <TableCell className="text-krds-gray-70">2rem</TableCell>
                    <TableCell className="text-krds-gray-70">32px</TableCell>
                    <TableCell>큰 섹션 간격</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">2xl / 10</Code>
                    </TableCell>
                    <TableCell className="text-krds-gray-70">2.5rem</TableCell>
                    <TableCell className="text-krds-gray-70">40px</TableCell>
                    <TableCell>매우 큰 섹션 간격</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">3xl / 12</Code>
                    </TableCell>
                    <TableCell className="text-krds-gray-70">3rem</TableCell>
                    <TableCell className="text-krds-gray-70">48px</TableCell>
                    <TableCell>페이지 레벨 간격</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">4xl / 16</Code>
                    </TableCell>
                    <TableCell className="text-krds-gray-70">4rem</TableCell>
                    <TableCell className="text-krds-gray-70">64px</TableCell>
                    <TableCell>레이아웃 레벨 간격</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </PageSection>

            {/* Tailwind Classes */}
            <PageSection>
              <SectionHeading level="h3" title="Tailwind 간격 유틸리티">
                <Body>
                  Tailwind CSS는 margin, padding, gap을 위한 유틸리티 클래스를
                  제공합니다.
                </Body>
              </SectionHeading>

              <Stack gap="lg">
                <div>
                  <SectionHeading level="h4" title="Margin 클래스" />
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Class Pattern</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Example</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Code className="text-xs">m-{'{size}'}</Code>
                        </TableCell>
                        <TableCell>모든 방향 margin</TableCell>
                        <TableCell>
                          <Code className="text-xs">m-4</Code> (16px)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Code className="text-xs">mt-{'{size}'}</Code>
                        </TableCell>
                        <TableCell>위쪽 margin</TableCell>
                        <TableCell>
                          <Code className="text-xs">mt-2</Code> (8px)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Code className="text-xs">mr-{'{size}'}</Code>
                        </TableCell>
                        <TableCell>오른쪽 margin</TableCell>
                        <TableCell>
                          <Code className="text-xs">mr-4</Code> (16px)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Code className="text-xs">mb-{'{size}'}</Code>
                        </TableCell>
                        <TableCell>아래쪽 margin</TableCell>
                        <TableCell>
                          <Code className="text-xs">mb-6</Code> (24px)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Code className="text-xs">ml-{'{size}'}</Code>
                        </TableCell>
                        <TableCell>왼쪽 margin</TableCell>
                        <TableCell>
                          <Code className="text-xs">ml-8</Code> (32px)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Code className="text-xs">mx-{'{size}'}</Code>
                        </TableCell>
                        <TableCell>좌우 margin</TableCell>
                        <TableCell>
                          <Code className="text-xs">mx-auto</Code>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Code className="text-xs">my-{'{size}'}</Code>
                        </TableCell>
                        <TableCell>상하 margin</TableCell>
                        <TableCell>
                          <Code className="text-xs">my-4</Code> (16px)
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div>
                  <SectionHeading level="h4" title="Padding 클래스" />
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Class Pattern</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Example</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Code className="text-xs">p-{'{size}'}</Code>
                        </TableCell>
                        <TableCell>모든 방향 padding</TableCell>
                        <TableCell>
                          <Code className="text-xs">p-6</Code> (24px)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Code className="text-xs">pt-{'{size}'}</Code>
                        </TableCell>
                        <TableCell>위쪽 padding</TableCell>
                        <TableCell>
                          <Code className="text-xs">pt-4</Code> (16px)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Code className="text-xs">pr-{'{size}'}</Code>
                        </TableCell>
                        <TableCell>오른쪽 padding</TableCell>
                        <TableCell>
                          <Code className="text-xs">pr-8</Code> (32px)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Code className="text-xs">pb-{'{size}'}</Code>
                        </TableCell>
                        <TableCell>아래쪽 padding</TableCell>
                        <TableCell>
                          <Code className="text-xs">pb-6</Code> (24px)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Code className="text-xs">pl-{'{size}'}</Code>
                        </TableCell>
                        <TableCell>왼쪽 padding</TableCell>
                        <TableCell>
                          <Code className="text-xs">pl-4</Code> (16px)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Code className="text-xs">px-{'{size}'}</Code>
                        </TableCell>
                        <TableCell>좌우 padding</TableCell>
                        <TableCell>
                          <Code className="text-xs">px-6</Code> (24px)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Code className="text-xs">py-{'{size}'}</Code>
                        </TableCell>
                        <TableCell>상하 padding</TableCell>
                        <TableCell>
                          <Code className="text-xs">py-4</Code> (16px)
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div>
                  <SectionHeading
                    level="h4"
                    title="Gap 클래스 (Flexbox/Grid)"
                  />
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Class Pattern</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Example</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Code className="text-xs">gap-{'{size}'}</Code>
                        </TableCell>
                        <TableCell>모든 방향 gap</TableCell>
                        <TableCell>
                          <Code className="text-xs">gap-4</Code> (16px)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Code className="text-xs">gap-x-{'{size}'}</Code>
                        </TableCell>
                        <TableCell>가로 방향 gap</TableCell>
                        <TableCell>
                          <Code className="text-xs">gap-x-6</Code> (24px)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Code className="text-xs">gap-y-{'{size}'}</Code>
                        </TableCell>
                        <TableCell>세로 방향 gap</TableCell>
                        <TableCell>
                          <Code className="text-xs">gap-y-8</Code> (32px)
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </Stack>
            </PageSection>

            {/* Usage Examples */}
            <PageSection>
              <SectionHeading level="h3" title="사용 예시">
                <Body>실제 사용 패턴과 권장 사항입니다.</Body>
              </SectionHeading>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Use Case</TableHead>
                    <TableHead>Recommended Class</TableHead>
                    <TableHead>Spacing</TableHead>
                    <TableHead>Example</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      버튼 그룹 간격
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">gap-4</Code>
                    </TableCell>
                    <TableCell className="text-krds-gray-70">16px</TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        {'<div className="flex gap-4">'}
                      </Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">폼 필드 간격</TableCell>
                    <TableCell>
                      <Code className="text-xs">gap-6</Code>
                    </TableCell>
                    <TableCell className="text-krds-gray-70">24px</TableCell>
                    <TableCell>
                      <Code className="text-xs">{'<Stack gap="md">'}</Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      카드 내부 패딩
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">p-6</Code>
                    </TableCell>
                    <TableCell className="text-krds-gray-70">24px</TableCell>
                    <TableCell>
                      <Code className="text-xs">{'<div className="p-6">'}</Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      카드 리스트 간격
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">gap-6</Code>
                    </TableCell>
                    <TableCell className="text-krds-gray-70">24px</TableCell>
                    <TableCell>
                      <Code className="text-xs">{'<Stack gap="lg">'}</Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      섹션 하단 여백
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">mb-12</Code>
                    </TableCell>
                    <TableCell className="text-krds-gray-70">48px</TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        {'<section className="mb-12">'}
                      </Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      레이블-입력 간격
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">gap-2</Code>
                    </TableCell>
                    <TableCell className="text-krds-gray-70">8px</TableCell>
                    <TableCell>
                      <Code className="text-xs">{'<Stack gap="sm">'}</Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      아이콘-텍스트 간격
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">gap-2</Code>
                    </TableCell>
                    <TableCell className="text-krds-gray-70">8px</TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        {'<div className="flex gap-2">'}
                      </Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      페이지 컨테이너
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">px-6 py-8</Code>
                    </TableCell>
                    <TableCell className="text-krds-gray-70">
                      24px / 32px
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        {'<main className="px-6 py-8">'}
                      </Code>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </PageSection>

            {/* Component Spacing Props */}
            <PageSection>
              <SectionHeading level="h3" title="컴포넌트 Spacing Props">
                <Body>HANUI 컴포넌트가 제공하는 spacing 관련 props입니다.</Body>
              </SectionHeading>

              <Stack gap="lg">
                <div>
                  <SectionHeading level="h4" title="Stack 컴포넌트" />
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Prop</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Default</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Code className="text-xs">gap</Code>
                        </TableCell>
                        <TableCell className="text-krds-gray-70">
                          xs | sm | md | lg | xl | 2xl | 3xl | 4xl
                        </TableCell>
                        <TableCell>
                          <Code className="text-xs">md</Code>
                        </TableCell>
                        <TableCell>자식 요소 간 간격</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Code className="text-xs">direction</Code>
                        </TableCell>
                        <TableCell className="text-krds-gray-70">
                          row | column
                        </TableCell>
                        <TableCell>
                          <Code className="text-xs">column</Code>
                        </TableCell>
                        <TableCell>레이아웃 방향</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Code className="text-xs">align</Code>
                        </TableCell>
                        <TableCell className="text-krds-gray-70">
                          start | center | end | stretch
                        </TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>정렬 방식</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Code className="text-xs">justify</Code>
                        </TableCell>
                        <TableCell className="text-krds-gray-70">
                          start | center | end | between | around
                        </TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>주축 정렬</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <Card className="mt-4">
                    <Body className="mb-2 font-semibold">사용 예시:</Body>
                    <Code variant="block" language="tsx">
                      {`<Stack gap="md" direction="column" align="start">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>

<HStack gap="lg" justify="between">
  <Button>저장</Button>
  <Button>취소</Button>
</HStack>`}
                    </Code>
                  </Card>
                </div>

                <div>
                  <SectionHeading level="h4" title="Section 컴포넌트" />
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Prop</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Default</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Code className="text-xs">padding</Code>
                        </TableCell>
                        <TableCell className="text-krds-gray-70">
                          card-sm | card-md | card-lg | page | header | footer |
                          content-tight | content-area
                        </TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>내부 패딩 프리셋</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Code className="text-xs">background</Code>
                        </TableCell>
                        <TableCell className="text-krds-gray-70">
                          white | gray | primary | transparent
                        </TableCell>
                        <TableCell>
                          <Code className="text-xs">transparent</Code>
                        </TableCell>
                        <TableCell>배경색</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Code className="text-xs">as</Code>
                        </TableCell>
                        <TableCell className="text-krds-gray-70">
                          ElementType
                        </TableCell>
                        <TableCell>
                          <Code className="text-xs">div</Code>
                        </TableCell>
                        <TableCell>렌더링될 HTML 요소</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Code className="text-xs">level</Code>
                        </TableCell>
                        <TableCell className="text-krds-gray-70">
                          h1 | h2 | h3 | h4 | h5 | h6
                        </TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>섹션 레벨 (시맨틱)</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <Card className="mt-4">
                    <Body className="mb-2 font-semibold">사용 예시:</Body>
                    <Code variant="block" language="tsx">
                      {`<Section padding="card-md" background="white" as="article">
  <h2>카드 제목</h2>
  <p>카드 내용</p>
</Section>

<Section padding="page" background="gray" as="main">
  <h1>페이지 제목</h1>
  <div>페이지 내용</div>
</Section>`}
                    </Code>
                  </Card>
                </div>
              </Stack>
            </PageSection>

            {/* Responsive Spacing */}
            <PageSection>
              <SectionHeading level="h3" title="반응형 간격">
                <Body>
                  Tailwind의 반응형 접두사를 사용하여 화면 크기별로 다른 간격을
                  적용할 수 있습니다.
                </Body>
              </SectionHeading>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Breakpoint</TableHead>
                    <TableHead>Prefix</TableHead>
                    <TableHead>Min Width</TableHead>
                    <TableHead>Example</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Mobile</TableCell>
                    <TableCell>
                      <Code className="text-xs">(none)</Code>
                    </TableCell>
                    <TableCell className="text-krds-gray-70">0px</TableCell>
                    <TableCell>
                      <Code className="text-xs">gap-4</Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Tablet</TableCell>
                    <TableCell>
                      <Code className="text-xs">md:</Code>
                    </TableCell>
                    <TableCell className="text-krds-gray-70">768px</TableCell>
                    <TableCell>
                      <Code className="text-xs">md:gap-6</Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Desktop</TableCell>
                    <TableCell>
                      <Code className="text-xs">lg:</Code>
                    </TableCell>
                    <TableCell className="text-krds-gray-70">1024px</TableCell>
                    <TableCell>
                      <Code className="text-xs">lg:gap-8</Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Large Desktop</TableCell>
                    <TableCell>
                      <Code className="text-xs">xl:</Code>
                    </TableCell>
                    <TableCell className="text-krds-gray-70">1280px</TableCell>
                    <TableCell>
                      <Code className="text-xs">xl:gap-12</Code>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Card className="mt-4">
                <Body className="mb-2 font-semibold">사용 예시:</Body>
                <Code variant="block" language="tsx">
                  {`// 모바일: 16px, 태블릿: 24px, 데스크톱: 32px
<div className="gap-4 md:gap-6 lg:gap-8">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// 모바일: 패딩 16px, 데스크톱: 패딩 32px
<div className="p-4 lg:p-8">
  Content
</div>

// Stack 컴포넌트와 함께
<Stack className="gap-4 md:gap-6 lg:gap-8">
  <Card>카드 1</Card>
  <Card>카드 2</Card>
</Stack>`}
                </Code>
              </Card>
            </PageSection>

            {/* Best Practices */}
            <PageSection>
              <SectionHeading level="h3" title="권장 사항">
                <Body>
                  일관된 간격 시스템을 유지하기 위한 가이드라인입니다.
                </Body>
              </SectionHeading>

              <Stack gap="md">
                <Card variant="outlined">
                  <SectionHeading level="h4" title="1. 8px 기반 배수 사용">
                    <Body size="sm" className="text-krds-gray-70">
                      4px (xs), 8px (sm), 16px (md), 24px (lg), 32px (xl) 등 8px
                      배수를 사용하여 일관성을 유지하세요.
                    </Body>
                  </SectionHeading>
                  <Code variant="block" language="tsx" className="mt-2">
                    {`// 좋은 예
<div className="gap-4 p-6 mb-8">

// 피해야 할 예
<div className="gap-3 p-5 mb-7"> // 불규칙한 값`}
                  </Code>
                </Card>

                <Card variant="outlined">
                  <SectionHeading level="h4" title="2. 시맨틱 컴포넌트 우선">
                    <Body size="sm" className="text-krds-gray-70">
                      가능하면 Stack, Section 같은 시맨틱 컴포넌트를 사용하여
                      의미를 명확히 하세요.
                    </Body>
                  </SectionHeading>
                  <Code variant="block" language="tsx" className="mt-2">
                    {`// 좋은 예
<Stack gap="md">
  <Input />
  <Input />
</Stack>

// 덜 권장
<div className="flex flex-col gap-4">
  <Input />
  <Input />
</div>`}
                  </Code>
                </Card>

                <Card variant="outlined">
                  <SectionHeading level="h4" title="3. 일관된 패딩 프리셋 사용">
                    <Body size="sm" className="text-krds-gray-70">
                      Section 컴포넌트의 padding 프리셋을 사용하여 카드, 페이지,
                      헤더 등의 패딩을 일관되게 유지하세요.
                    </Body>
                  </SectionHeading>
                  <Code variant="block" language="tsx" className="mt-2">
                    {`// 좋은 예
<Section padding="card-md">
  Content
</Section>

// 덜 권장
<div className="p-6 md:p-8">
  Content
</div>`}
                  </Code>
                </Card>

                <Card variant="outlined">
                  <SectionHeading
                    level="h4"
                    title="4. 반응형 간격은 명확한 의도로"
                  >
                    <Body size="sm" className="text-krds-gray-70">
                      모바일과 데스크톱에서 다른 간격이 필요한 경우에만 반응형
                      클래스를 사용하세요.
                    </Body>
                  </SectionHeading>
                  <Code variant="block" language="tsx" className="mt-2">
                    {`// 모바일: 좁은 간격, 데스크톱: 넓은 간격
<div className="gap-4 md:gap-8">

// 모든 화면에서 동일한 간격
<div className="gap-6">`}
                  </Code>
                </Card>

                <Card variant="info">
                  <Body>
                    <strong>핵심 원칙:</strong> 간격은 시각적 계층과 관계를
                    나타냅니다. 관련된 요소는 가깝게, 독립적인 요소는 멀리
                    배치하여 정보 구조를 명확히 전달하세요.
                  </Body>
                </Card>
              </Stack>
            </PageSection>
          </Section>
        </TabsContent>
      </Tabs>

      {/* Page Navigation */}
      <PageNavigation
        prev={{ title: 'Typography', href: '/design-system/typography' }}
        next={{ title: 'Breakpoints', href: '/design-system/breakpoints' }}
      />
    </>
  );
}
