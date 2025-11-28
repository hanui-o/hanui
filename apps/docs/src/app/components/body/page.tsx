'use client';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';
import { ComponentPreview } from '@/components/content/ComponentPreview';

// UI components - from @hanui/react
import {
  Body,
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

export default function BodyPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Body"
        description="본문 텍스트를 위한 컴포넌트입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* 개요 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />
            <ComponentPreview>
              <Body size="md">
                본문 텍스트 컴포넌트입니다. KRDS 타이포그래피 시스템을
                준수합니다.
              </Body>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<Body size="md">본문 텍스트 컴포넌트입니다.</Body>`}
            </Code>
          </Section>

          {/* 설치 */}
          <Section level="h2">
            <Installation componentName="body" />
          </Section>

          {/* 사용법 */}
          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { Body } from '@/components/hanui/body'

<Body size="md">본문 텍스트</Body>`}
            </Code>
          </Section>

          {/* 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            {/* Size */}
            <Subsection level="h3">
              <Heading level="h3" title="Size" />
              <ComponentPreview>
                <div className="flex flex-col gap-4">
                  <Body size="lg">Large - 주요 본문 텍스트 (19px)</Body>
                  <Body size="md">Medium - 일반 본문 텍스트 (17px)</Body>
                  <Body size="sm">Small - 보조 설명 텍스트 (15px)</Body>
                  <Body size="xs">XSmall - 캡션 텍스트 (13px)</Body>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Body size="lg">Large - 주요 본문 텍스트 (19px)</Body>
<Body size="md">Medium - 일반 본문 텍스트 (17px)</Body>
<Body size="sm">Small - 보조 설명 텍스트 (15px)</Body>
<Body size="xs">XSmall - 캡션 텍스트 (13px)</Body>`}
              </Code>
            </Subsection>

            {/* Weight */}
            <Subsection level="h3">
              <Heading level="h3" title="Weight" />
              <ComponentPreview>
                <div className="flex flex-col gap-4">
                  <Body size="md" weight="normal">
                    Normal (400) - 일반 본문 텍스트
                  </Body>
                  <Body size="md" weight="bold">
                    Bold (700) - 강조 텍스트
                  </Body>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Body size="md" weight="normal">Normal (400) - 일반 본문 텍스트</Body>
<Body size="md" weight="bold">Bold (700) - 강조 텍스트</Body>`}
              </Code>
            </Subsection>

            {/* As (Polymorphic) */}
            <Subsection level="h3">
              <Heading level="h3" title="HTML 태그" />
              <ComponentPreview>
                <div className="flex flex-col gap-4">
                  <Body as="p" size="md">
                    p 태그로 렌더링
                  </Body>
                  <Body as="span" size="md">
                    span 태그로 렌더링
                  </Body>
                  <Body as="strong" size="md">
                    strong 태그로 렌더링
                  </Body>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Body as="p" size="md">p 태그로 렌더링</Body>
<Body as="span" size="md">span 태그로 렌더링</Body>
<Body as="strong" size="md">strong 태그로 렌더링</Body>`}
              </Code>
            </Subsection>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="Body" />
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
                      <Code>size</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">'lg' | 'md' | 'sm' | 'xs'</Code>
                    </TableCell>
                    <TableCell>'md'</TableCell>
                    <TableCell>텍스트 크기</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>weight</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">'normal' | 'bold'</Code>
                    </TableCell>
                    <TableCell>'normal'</TableCell>
                    <TableCell>폰트 굵기</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>as</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'p' | 'span' | 'div' | 'article' | 'section' | 'strong'
                      </Code>
                    </TableCell>
                    <TableCell>'p'</TableCell>
                    <TableCell>렌더링할 HTML 태그</TableCell>
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
                      <Code className="text-xs">ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>텍스트 내용</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Badge', href: '/components/badge' }}
        next={{ title: 'Breadcrumb', href: '/components/breadcrumb' }}
      />
    </>
  );
}
