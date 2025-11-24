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
  Breadcrumb,
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

export default function BreadcrumbPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Breadcrumb"
        description="사용자의 현재 위치를 표시하고 상위 페이지로 쉽게 이동할 수 있게 하는 탐색 컴포넌트입니다."
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
              <Breadcrumb
                items={[
                  { label: '홈', href: '/' },
                  { label: 'Components', href: '/components' },
                  { label: 'Breadcrumb', isCurrent: true },
                ]}
              />
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<Breadcrumb
  items={[
    { label: '홈', href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'Breadcrumb', isCurrent: true }
  ]}
/>`}
            </Code>
          </Section>

          {/* 설치 */}
          <Installation componentName="breadcrumb" />

          {/* 사용법 */}
          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { Breadcrumb } from '@/components/hanui/breadcrumb'
import Link from 'next/link'

// Next.js에서는 LinkComponent를 지정하여 클라이언트 사이드 네비게이션 활성화
<Breadcrumb
  items={[
    { label: '홈', href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'Breadcrumb', isCurrent: true }
  ]}
  LinkComponent={Link}
/>`}
            </Code>
          </Section>

          {/* 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            {/* Separator */}
            <Subsection level="h3">
              <Heading level="h3" title="Separator" />
              <ComponentPreview>
                <div className="flex flex-col gap-6">
                  <Breadcrumb
                    items={[
                      { label: '홈', href: '/' },
                      { label: 'Docs', href: '/docs' },
                      { label: 'Installation', isCurrent: true },
                    ]}
                  />
                  <Breadcrumb
                    items={[
                      { label: '홈', href: '/' },
                      { label: 'Docs', href: '/docs' },
                      { label: 'Installation', isCurrent: true },
                    ]}
                    separator=">"
                  />
                  <Breadcrumb
                    items={[
                      { label: '홈', href: '/' },
                      { label: 'Docs', href: '/docs' },
                      { label: 'Installation', isCurrent: true },
                    ]}
                    separator="→"
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`// 기본 구분자 (/)
<Breadcrumb items={items} />

// 꺽쇠 구분자 (>)
<Breadcrumb items={items} separator=">" />

// 화살표 구분자 (→)
<Breadcrumb items={items} separator="→" />`}
              </Code>
            </Subsection>

            {/* Max Items */}
            <Subsection level="h3">
              <Heading level="h3" title="Max Items" />
              <ComponentPreview>
                <Breadcrumb
                  items={[
                    { label: '홈', href: '/' },
                    { label: 'Products', href: '/products' },
                    {
                      label: 'Electronics',
                      href: '/products/electronics',
                    },
                    {
                      label: 'Computers',
                      href: '/products/electronics/computers',
                    },
                    { label: 'Laptops', isCurrent: true },
                  ]}
                  maxItems={4}
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`// maxItems={4}: '...'를 포함해서 총 4개 항목 표시
// 결과: 홈 / ... / Computers / Laptops
<Breadcrumb
  items={[
    { label: '홈', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Computers', href: '/products/electronics/computers' },
    { label: 'Laptops', isCurrent: true }
  ]}
  maxItems={4}
/>`}
              </Code>
            </Subsection>

            {/* Custom Link Component */}
            <Subsection level="h3">
              <Heading level="h3" title="Custom Link Component" />
              <Code variant="block" language="tsx">
                {`// Next.js Link 사용 (클라이언트 사이드 네비게이션)
import Link from 'next/link'

<Breadcrumb
  items={items}
  LinkComponent={Link}
/>

// React Router Link 사용
import { Link } from 'react-router-dom'

<Breadcrumb
  items={items}
  LinkComponent={Link}
/>`}
              </Code>
            </Subsection>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="Breadcrumb" />
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
                      <Code>items</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">BreadcrumbItem[]</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>Breadcrumb 항목 배열</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>separator</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">ReactNode</Code>
                    </TableCell>
                    <TableCell>'/'</TableCell>
                    <TableCell>항목 사이의 구분자</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>maxItems</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>표시할 최대 항목 수</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>itemsBeforeCollapse</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>생략 표시 전 표시할 항목 수</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>itemsAfterCollapse</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>생략 표시 후 표시할 항목 수</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>LinkComponent</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">ComponentType</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>커스텀 링크 컴포넌트</TableCell>
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
                      <Code>ariaLabel</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>'Breadcrumb'</TableCell>
                    <TableCell>ARIA 레이블</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="BreadcrumbItem" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>label</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>표시할 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>href</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>링크 URL (선택)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>isCurrent</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>현재 페이지 여부 (선택)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Body', href: '/components/body' }}
        next={{ title: 'Button', href: '/components/button' }}
      />
    </>
  );
}
