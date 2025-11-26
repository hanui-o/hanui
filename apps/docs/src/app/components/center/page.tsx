'use client';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';

// UI components - from @hanui/react
import {
  Center,
  Circle,
  Square,
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
  Card,
  List,
  ListItem,
} from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';

export default function CenterPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Center"
        description="콘텐츠를 수평 및 수직 중앙에 배치하는 레이아웃 컴포넌트"
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
              <Center className="bg-blue-100 h-[100px] text-blue-800 rounded-md">
                This is the Center
              </Center>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<Center className="bg-blue-100 h-[100px]">
  This is the Center
</Center>`}
            </Code>
          </Section>

          <Section level="h2">
            <Installation componentName="center" />
          </Section>

          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { Center, Circle, Square } from '@/components/hanui/center'

<Center>Centered Content</Center>
<Circle size="40px">A</Circle>
<Square size="40px">B</Square>`}
            </Code>
          </Section>

          {/* 예제 섹션 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading level="h3" title="아이콘과 함께 사용" />
              <ComponentPreview>
                <div className="flex gap-4">
                  <Center className="w-10 h-10 bg-gray-200 rounded-full">
                    <span className="text-xl">★</span>
                  </Center>
                  <Center className="w-10 h-10 bg-blue-500 text-white rounded-md">
                    <span className="text-xl">✓</span>
                  </Center>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Center className="w-10 h-10 bg-gray-200 rounded-full">
  <Icon />
</Center>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Square와 Circle" />
              <ComponentPreview>
                <div className="flex gap-4">
                  <Circle size="40px" className="bg-red-500 text-white">
                    C
                  </Circle>
                  <Square size="40px" className="bg-purple-500 text-white">
                    S
                  </Square>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Circle size="40px" className="bg-red-500 text-white">
  C
</Circle>

<Square size="40px" className="bg-purple-500 text-white">
  S
</Square>`}
              </Code>
            </Subsection>
          </Section>

          {/* 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="WCAG 2.1 / KWCAG 2.2 AA 기준을 준수합니다."
            />
            <Card variant="filled">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>시맨틱 마크업:</strong> Center, Circle, Square는
                  의미론적으로 중립적인 <Code>&lt;div&gt;</Code> 요소를
                  사용합니다. 내부 콘텐츠에 적절한 시맨틱 태그 사용 권장
                </ListItem>
                <ListItem>
                  <strong>장식적 요소:</strong> Circle/Square를 장식 목적으로
                  사용할 경우 <Code>aria-hidden="true"</Code> 추가 고려
                </ListItem>
                <ListItem>
                  <strong>아이콘 접근성:</strong> 아이콘을 포함할 때는 적절한
                  레이블이나 대체 텍스트를 제공하여 스크린 리더 사용자가 의미를
                  이해할 수 있도록 함
                </ListItem>
                <ListItem>
                  <strong>키보드 네비게이션:</strong> 인터랙티브 요소를 포함할
                  경우 키보드로 접근 가능한지 확인
                </ListItem>
              </List>
            </Card>
          </Section>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="Center Props" />
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
                      <Code>inline</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>
                      true일 경우 inline-flex로 렌더링됩니다.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Circle & Square Props" />
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
                      <Code className="text-xs">string | number</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>너비와 높이를 동시에 설정합니다.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Card', href: '/components/card' }}
        next={{ title: 'Container', href: '/components/container' }}
      />
    </>
  );
}
