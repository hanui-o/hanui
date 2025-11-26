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
  Flex,
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
  Center,
  Square,
  Card,
  List,
  ListItem,
} from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';

export default function FlexPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Flex"
        description="Flexbox 레이아웃을 쉽게 구성할 수 있는 컴포넌트"
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
              <Flex className="text-white" gap="4">
                <Center className="w-[100px] h-[100px] bg-green-500 rounded-md">
                  Box 1
                </Center>
                <Center className="w-[100px] h-[100px] bg-blue-500 rounded-md">
                  Box 2
                </Center>
                <Center className="w-[100px] h-[100px] bg-red-500 rounded-md">
                  Box 3
                </Center>
              </Flex>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<Flex gap="4">
  <Box>Box 1</Box>
  <Box>Box 2</Box>
  <Box>Box 3</Box>
</Flex>`}
            </Code>
          </Section>

          <Section level="h2">
            <Installation componentName="flex" />
          </Section>

          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { Flex } from '@/components/hanui/flex'

<Flex align="center" justify="space-between">
  <div>Logo</div>
  <div>Menu</div>
</Flex>`}
            </Code>
          </Section>

          {/* 예제 섹션 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading level="h3" title="Spacer 사용 (Justify Content)" />
              <ComponentPreview>
                <Flex
                  className="w-full border p-4 rounded-md"
                  justify="between"
                  align="center"
                >
                  <div className="font-bold">Logo</div>
                  <Flex gap="4">
                    <div>Home</div>
                    <div>About</div>
                    <div>Contact</div>
                  </Flex>
                </Flex>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Flex justify="between" align="center">
  <Box>Logo</Box>
  <Flex gap="4">
    <Box>Home</Box>
    <Box>About</Box>
    <Box>Contact</Box>
  </Flex>
</Flex>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Wrap" />
              <ComponentPreview>
                <Flex wrap="wrap" gap="2" className="w-[300px] border p-2">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <Square
                      key={i}
                      size="50px"
                      className="bg-blue-100 text-blue-600 rounded"
                    >
                      {i + 1}
                    </Square>
                  ))}
                </Flex>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Flex wrap="wrap" gap="2">
  {items.map(item => <Box />)}
</Flex>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Direction" />
              <ComponentPreview>
                <Flex
                  direction="column"
                  gap="2"
                  className="bg-gray-50 p-4 rounded-md"
                >
                  <div className="bg-white p-2 shadow-sm rounded">Item 1</div>
                  <div className="bg-white p-2 shadow-sm rounded">Item 2</div>
                  <div className="bg-white p-2 shadow-sm rounded">Item 3</div>
                </Flex>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Flex direction="column" gap="2">
  <Box>Item 1</Box>
  <Box>Item 2</Box>
  <Box>Item 3</Box>
</Flex>`}
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
                  <strong>시맨틱 마크업:</strong> Flex는 의미론적으로 중립적인{' '}
                  <Code>&lt;div&gt;</Code> 요소를 사용합니다. 필요시 적절한
                  시맨틱 태그나 ARIA 역할을 추가하세요.
                </ListItem>
                <ListItem>
                  <strong>키보드 네비게이션:</strong> Flex 내부 요소들의 Tab
                  순서가 시각적 배치와 일치하도록 주의하세요.
                  <Code>flex-direction: column-reverse</Code>나{' '}
                  <Code>row-reverse</Code> 사용 시 Tab 순서 고려 필요
                </ListItem>
                <ListItem>
                  <strong>반응형 레이아웃:</strong> 다양한 화면 크기에서
                  콘텐츠가 적절히 배치되어 모든 사용자가 접근 가능
                </ListItem>
                <ListItem>
                  <strong>포커스 관리:</strong> 인터랙티브 요소들이 논리적인
                  순서로 포커스를 받을 수 있도록 구성
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
                      <Code>direction</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'row' | 'column' | 'row-reverse' | 'column-reverse'
                      </Code>
                    </TableCell>
                    <TableCell>'row'</TableCell>
                    <TableCell>flex-direction 속성</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>align</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'start' | 'center' | 'end' | 'stretch' | 'baseline'
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>align-items 속성</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>justify</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'start' | 'center' | 'end' | 'between' | 'around' |
                        'evenly'
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>justify-content 속성</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>wrap</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'nowrap' | 'wrap' | 'wrap-reverse'
                      </Code>
                    </TableCell>
                    <TableCell>'nowrap'</TableCell>
                    <TableCell>flex-wrap 속성</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>gap</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string | number</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>아이템 간격</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'File Upload', href: '/components/file-upload' }}
        next={{ title: 'Footer', href: '/components/footer' }}
      />
    </>
  );
}
