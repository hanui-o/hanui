'use client';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';
import { FrameworkCodeBlock } from '@/components/content/FrameworkCodeBlock';

// UI components - from @hanui/react
import {
  Button,
  Code,
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
} from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';

export default function ButtonPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Button"
        description="다양한 스타일과 크기를 지원하는 버튼 컴포넌트"
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview">
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />
            <ComponentPreview>
              <Button>Button</Button>
            </ComponentPreview>
            <FrameworkCodeBlock
              reactCode={`<Button>Button</Button>`}
              vueCode={`<Button>Button</Button>`}
            />
          </Section>

          <Section level="h2">
            <Installation componentName="button" />
          </Section>

          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <FrameworkCodeBlock
              reactCode={`import { Button } from '@/components/hanui/button'

<Button variant="primary">Click me</Button>`}
              vueCode={`<script setup>
import { Button } from '@/components/hanui/Button.vue'
</script>

<template>
  <Button variant="primary">Click me</Button>
</template>`}
            />
          </Section>

          {/* 예제 섹션 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading level="h3" title="Variant" />
              <ComponentPreview>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="tertiary">Tertiary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="ghost-primary">Ghost Primary</Button>
                </div>
              </ComponentPreview>
              <FrameworkCodeBlock
                reactCode={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="ghost-primary">Ghost Primary</Button>`}
                vueCode={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="ghost-primary">Ghost Primary</Button>`}
              />
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Size" />
              <ComponentPreview>
                <div className="flex items-center gap-4">
                  <Button size="xs">x-Small</Button>
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">x-Large</Button>
                </div>
              </ComponentPreview>
              <FrameworkCodeBlock
                reactCode={`<Button size="xs">x-Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">x-Large</Button>`}
                vueCode={`<Button size="xs">x-Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">x-Large</Button>`}
              />
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Icon" />
              <ComponentPreview>
                <div className="flex flex-wrap items-center gap-3">
                  <Button iconLeft={<span>←</span>}>이전</Button>
                  <Button iconRight={<span>→</span>}>다음</Button>
                  <Button
                    size="icon"
                    iconLeft={<span>✓</span>}
                    aria-label="확인"
                  />
                </div>
              </ComponentPreview>
              <FrameworkCodeBlock
                reactCode={`<Button iconLeft={<ChevronLeftIcon />}>이전</Button>
<Button iconRight={<ChevronRightIcon />}>다음</Button>
<Button size="icon" iconLeft={<CheckIcon />} aria-label="확인" />`}
                vueCode={`<Button aria-label="확인">
  <template #iconLeft><ChevronLeft /></template>
  이전
</Button>
<Button>
  다음
  <template #iconRight><ChevronRight /></template>
</Button>
<Button size="icon" aria-label="확인">
  <template #iconLeft><Check /></template>
</Button>`}
              />
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Link" />
              <ComponentPreview>
                <div className="flex flex-wrap items-center gap-3">
                  <Button href="/about">내부 링크</Button>
                  <Button
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    외부 링크
                  </Button>
                </div>
              </ComponentPreview>
              <FrameworkCodeBlock
                reactCode={`<Button href="/about">내부 링크</Button>
<Button href="https://github.com" target="_blank" rel="noopener noreferrer">
  외부 링크
</Button>`}
                vueCode={`<Button href="/about">내부 링크</Button>
<Button href="https://github.com" target="_blank" rel="noopener noreferrer">
  외부 링크
</Button>`}
              />
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Loading" />
              <ComponentPreview>
                <div className="flex flex-wrap items-center gap-3">
                  <Button loading>처리 중...</Button>
                  <Button loading disabled>
                    제출 중...
                  </Button>
                </div>
              </ComponentPreview>
              <FrameworkCodeBlock
                reactCode={`<Button loading>처리 중...</Button>
<Button loading disabled>제출 중...</Button>`}
                vueCode={`<Button loading>처리 중...</Button>
<Button loading disabled>제출 중...</Button>`}
              />
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Disabled" />
              <ComponentPreview>
                <div className="flex flex-wrap items-center gap-3">
                  <Button disabled>비활성화</Button>
                  <Button variant="outline" disabled>
                    비활성화
                  </Button>
                </div>
              </ComponentPreview>
              <FrameworkCodeBlock
                reactCode={`<Button disabled>비활성화</Button>
<Button variant="outline" disabled>비활성화</Button>`}
                vueCode={`<Button disabled>비활성화</Button>
<Button variant="outline" disabled>비활성화</Button>`}
              />
            </Subsection>
          </Section>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="Props" />
              <Table small>
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
                    <TableCell className="font-mono">
                      <Code>variant</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'primary' | 'secondary' | 'tertiary' | 'success' |
                        'danger' | 'ghost' | 'ghost-primary' | 'outline' |
                        'black'
                      </Code>
                    </TableCell>
                    <TableCell>'primary'</TableCell>
                    <TableCell>버튼의 시각적 스타일</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>size</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon'
                      </Code>
                    </TableCell>
                    <TableCell>'md'</TableCell>
                    <TableCell>버튼 크기</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>loading</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>로딩 상태 표시 및 상호작용 비활성화</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>disabled</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>버튼 비활성화</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>iconLeft</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">React.ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>버튼 텍스트 왼쪽에 표시할 아이콘</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>iconRight</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">React.ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>버튼 텍스트 오른쪽에 표시할 아이콘</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>href</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      제공 시 버튼이 <Code>&lt;a&gt;</Code> 태그로 렌더링됨
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>target</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>href 사용 시 링크의 target 속성</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>rel</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>href 사용 시 링크의 rel 속성</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>asChild</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>Radix Slot 패턴 사용</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>className</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>children</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">React.ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>버튼 텍스트</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Button', href: '/components/button' }}
        next={{ title: 'Card', href: '/components/card' }}
      />
    </>
  );
}
