import {
  Section,
  SectionHeading,
  Subsection,
  List,
  ListItem,
  Code,
  Body,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Card,
  Stack,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  PageNavigation,
  Box,
  DoCard,
  DontCard,
} from '@/components/hanui';

export default function BoxPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Box"
        description="유연한 레이아웃을 위한 범용 컨테이너 컴포넌트입니다. Flexbox와 Grid 레이아웃을 쉽게 구성할 수 있습니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview">
          {/* Installation */}
          <Section level="h2">
            <SectionHeading level="h2" id="installation" title="설치">
              <Body className="leading-relaxed">
                다음 명령어로 Box 컴포넌트를 설치합니다:
              </Body>
            </SectionHeading>

            <Code variant="block" language="bash" showLineNumbers={false}>
              npx @hanui/cli add box
            </Code>
          </Section>

          {/* What is it */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="what-is-it"
              title="무엇인가요?"
              description="Box는 레이아웃 구성을 위한 범용 컨테이너 컴포넌트입니다."
            />

            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>Flexbox & Grid 지원:</strong> display prop으로 flex,
                  grid, block 레이아웃을 지원합니다.
                </ListItem>
                <ListItem>
                  <strong>간편한 정렬:</strong> align, justify prop으로 요소를
                  쉽게 정렬할 수 있습니다.
                </ListItem>
                <ListItem>
                  <strong>간격 시스템:</strong> gap prop으로 KRDS 기반의 일관된
                  간격을 적용할 수 있습니다.
                </ListItem>
                <ListItem>
                  <strong>다형성 (Polymorphic):</strong> as prop으로 시맨틱한
                  HTML 태그로 렌더링할 수 있습니다.
                </ListItem>
                <ListItem>
                  <strong>간결한 API:</strong> CSS-in-JS나 복잡한 클래스 없이
                  props만으로 레이아웃 구성이 가능합니다.
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* Usage */}
          <Section level="h2">
            <SectionHeading level="h2" id="usage" title="사용 방법" />

            <Subsection level="h3">
              <SectionHeading level="h3" title="Display Types">
                <Body className="leading-relaxed">
                  Box는 flex, grid, block 세 가지 display 타입을 지원합니다:
                </Body>
              </SectionHeading>

              <Stack gap="md">
                <div>
                  <Body weight="semibold" className="mb-2">
                    Flex Layout
                  </Body>
                  <Code variant="block" language="tsx" showLineNumbers={false}>
                    {`<Box display="flex" direction="row" gap={4}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Box>`}
                  </Code>
                  <Card variant="outlined" className="mt-3">
                    <Box display="flex" direction="row" gap={4}>
                      <div className="w-20 h-20 bg-krds-primary-base rounded flex items-center justify-center text-krds-white">
                        1
                      </div>
                      <div className="w-20 h-20 bg-krds-primary-base rounded flex items-center justify-center text-krds-white">
                        2
                      </div>
                      <div className="w-20 h-20 bg-krds-primary-base rounded flex items-center justify-center text-krds-white">
                        3
                      </div>
                    </Box>
                  </Card>
                </div>

                <div>
                  <Body weight="semibold" className="mb-2">
                    Grid Layout
                  </Body>
                  <Code variant="block" language="tsx" showLineNumbers={false}>
                    {`<Box display="grid" gap={4} className="grid-cols-3">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Box>`}
                  </Code>
                  <Card variant="outlined" className="mt-3">
                    <Box display="grid" gap={4} className="grid-cols-3">
                      <div className="h-20 bg-krds-success-base rounded flex items-center justify-center text-krds-white">
                        1
                      </div>
                      <div className="h-20 bg-krds-success-base rounded flex items-center justify-center text-krds-white">
                        2
                      </div>
                      <div className="h-20 bg-krds-success-base rounded flex items-center justify-center text-krds-white">
                        3
                      </div>
                    </Box>
                  </Card>
                </div>

                <div>
                  <Body weight="semibold" className="mb-2">
                    Block Layout
                  </Body>
                  <Code variant="block" language="tsx" showLineNumbers={false}>
                    {`<Box display="block">
  <div>Block 1</div>
  <div>Block 2</div>
</Box>`}
                  </Code>
                  <Card variant="outlined" className="mt-3">
                    <Box display="block">
                      <div className="h-20 bg-krds-accent-base rounded flex items-center justify-center text-krds-white mb-4">
                        Block 1
                      </div>
                      <div className="h-20 bg-krds-accent-base rounded flex items-center justify-center text-krds-white">
                        Block 2
                      </div>
                    </Box>
                  </Card>
                </div>
              </Stack>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Flex Direction">
                <Body className="leading-relaxed">
                  Flex display에서 direction prop으로 방향을 조절할 수 있습니다:
                </Body>
              </SectionHeading>

              <Stack gap="md">
                <div>
                  <Body weight="semibold" className="mb-2">
                    Row (가로)
                  </Body>
                  <Code variant="block" language="tsx" showLineNumbers={false}>
                    {`<Box display="flex" direction="row" gap={3}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Box>`}
                  </Code>
                  <Card variant="outlined" className="mt-3">
                    <Box display="flex" direction="row" gap={3}>
                      <div className="w-16 h-16 bg-krds-warning-base rounded flex items-center justify-center text-krds-white">
                        1
                      </div>
                      <div className="w-16 h-16 bg-krds-warning-base rounded flex items-center justify-center text-krds-white">
                        2
                      </div>
                      <div className="w-16 h-16 bg-krds-warning-base rounded flex items-center justify-center text-krds-white">
                        3
                      </div>
                    </Box>
                  </Card>
                </div>

                <div>
                  <Body weight="semibold" className="mb-2">
                    Column (세로)
                  </Body>
                  <Code variant="block" language="tsx" showLineNumbers={false}>
                    {`<Box display="flex" direction="column" gap={3}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Box>`}
                  </Code>
                  <Card variant="outlined" className="mt-3">
                    <Box display="flex" direction="column" gap={3}>
                      <div className="w-full h-16 bg-krds-information-base rounded flex items-center justify-center text-krds-white">
                        1
                      </div>
                      <div className="w-full h-16 bg-krds-information-base rounded flex items-center justify-center text-krds-white">
                        2
                      </div>
                      <div className="w-full h-16 bg-krds-information-base rounded flex items-center justify-center text-krds-white">
                        3
                      </div>
                    </Box>
                  </Card>
                </div>
              </Stack>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Alignment">
                <Body className="leading-relaxed">
                  align과 justify prop으로 요소를 정렬할 수 있습니다:
                </Body>
              </SectionHeading>

              <Stack gap="md">
                <div>
                  <Body weight="semibold" className="mb-2">
                    Align Items (교차축 정렬)
                  </Body>
                  <Code variant="block" language="tsx" showLineNumbers={false}>
                    {`// start, center, end, stretch
<Box display="flex" align="center" className="h-32">
  <div>아이템</div>
</Box>`}
                  </Code>
                  <Card variant="outlined" className="mt-3">
                    <Stack gap="sm">
                      <Body size="sm" className="text-krds-gray-70">
                        align="start"
                      </Body>
                      <Box
                        display="flex"
                        direction="row"
                        gap={3}
                        align="start"
                        className="h-32 bg-krds-gray-5 p-3 rounded"
                      >
                        <div className="w-16 h-16 bg-krds-secondary-base rounded" />
                        <div className="w-16 h-20 bg-krds-secondary-base rounded" />
                        <div className="w-16 h-12 bg-krds-secondary-base rounded" />
                      </Box>

                      <Body size="sm" className="text-krds-gray-70 mt-4">
                        align="center"
                      </Body>
                      <Box
                        display="flex"
                        direction="row"
                        gap={3}
                        align="center"
                        className="h-32 bg-krds-gray-5 p-3 rounded"
                      >
                        <div className="w-16 h-16 bg-krds-secondary-base rounded" />
                        <div className="w-16 h-20 bg-krds-secondary-base rounded" />
                        <div className="w-16 h-12 bg-krds-secondary-base rounded" />
                      </Box>

                      <Body size="sm" className="text-krds-gray-70 mt-4">
                        align="end"
                      </Body>
                      <Box
                        display="flex"
                        direction="row"
                        gap={3}
                        align="end"
                        className="h-32 bg-krds-gray-5 p-3 rounded"
                      >
                        <div className="w-16 h-16 bg-krds-secondary-base rounded" />
                        <div className="w-16 h-20 bg-krds-secondary-base rounded" />
                        <div className="w-16 h-12 bg-krds-secondary-base rounded" />
                      </Box>
                    </Stack>
                  </Card>
                </div>

                <div>
                  <Body weight="semibold" className="mb-2">
                    Justify Content (주축 정렬)
                  </Body>
                  <Code variant="block" language="tsx" showLineNumbers={false}>
                    {`// start, center, end, between, around
<Box display="flex" justify="center">
  <div>아이템</div>
</Box>`}
                  </Code>
                  <Card variant="outlined" className="mt-3">
                    <Stack gap="sm">
                      <Body size="sm" className="text-krds-gray-70">
                        justify="start"
                      </Body>
                      <Box
                        display="flex"
                        direction="row"
                        gap={3}
                        justify="start"
                        className="bg-krds-gray-5 p-3 rounded"
                      >
                        <div className="w-16 h-16 bg-krds-primary-base rounded" />
                        <div className="w-16 h-16 bg-krds-primary-base rounded" />
                      </Box>

                      <Body size="sm" className="text-krds-gray-70 mt-4">
                        justify="center"
                      </Body>
                      <Box
                        display="flex"
                        direction="row"
                        gap={3}
                        justify="center"
                        className="bg-krds-gray-5 p-3 rounded"
                      >
                        <div className="w-16 h-16 bg-krds-primary-base rounded" />
                        <div className="w-16 h-16 bg-krds-primary-base rounded" />
                      </Box>

                      <Body size="sm" className="text-krds-gray-70 mt-4">
                        justify="between"
                      </Body>
                      <Box
                        display="flex"
                        direction="row"
                        gap={3}
                        justify="between"
                        className="bg-krds-gray-5 p-3 rounded"
                      >
                        <div className="w-16 h-16 bg-krds-primary-base rounded" />
                        <div className="w-16 h-16 bg-krds-primary-base rounded" />
                      </Box>
                    </Stack>
                  </Card>
                </div>
              </Stack>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Gap (간격)">
                <Body className="leading-relaxed">
                  gap prop으로 자식 요소 간의 간격을 조절할 수 있습니다. xs, sm,
                  md, lg, xl 크기를 지원합니다:
                </Body>
              </SectionHeading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Box display="flex" gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
</Box>`}
              </Code>

              <Card variant="outlined" className="mt-3">
                <Stack gap="md">
                  {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                    <div key={size}>
                      <Body size="sm" className="mb-2 text-krds-gray-70">
                        gap="{size}"
                      </Body>
                      <Box display="flex" direction="row" gap={size}>
                        <div className="w-16 h-16 bg-krds-accent-base rounded" />
                        <div className="w-16 h-16 bg-krds-accent-base rounded" />
                        <div className="w-16 h-16 bg-krds-accent-base rounded" />
                      </Box>
                    </div>
                  ))}
                </Stack>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Polymorphic (다형성)">
                <Body className="leading-relaxed">
                  as prop을 사용하여 시맨틱한 HTML 태그로 렌더링할 수 있습니다:
                </Body>
              </SectionHeading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Box as="section" display="flex" direction="column" gap={3}>
  <Body>section 태그로 렌더링</Body>
</Box>

<Box as="article" display="flex" direction="column" gap={3}>
  <Body>article 태그로 렌더링</Body>
</Box>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="실제 사용 예시">
                <Body className="leading-relaxed">
                  Box를 활용한 다양한 레이아웃 예시입니다:
                </Body>
              </SectionHeading>

              <Stack gap="md">
                <div>
                  <Body weight="semibold" className="mb-2">
                    카드 레이아웃
                  </Body>
                  <Code variant="block" language="tsx" showLineNumbers={false}>
                    {`<Box display="flex" direction="row" gap={4}>
  <Box
    display="flex"
    direction="column"
    gap={3}
    className="flex-1 p-4 border rounded"
  >
    <Body weight="bold">카드 제목</Body>
    <Body size="sm">카드 내용입니다.</Body>
  </Box>
  <Box
    display="flex"
    direction="column"
    gap={3}
    className="flex-1 p-4 border rounded"
  >
    <Body weight="bold">카드 제목</Body>
    <Body size="sm">카드 내용입니다.</Body>
  </Box>
</Box>`}
                  </Code>
                  <Card variant="outlined" className="mt-3">
                    <Box display="flex" direction="row" gap={4} align="stretch">
                      <Box
                        display="flex"
                        direction="column"
                        gap={3}
                        className="flex-1 p-4 border border-krds-gray-20 rounded"
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
                        className="flex-1 p-4 border border-krds-gray-20 rounded"
                      >
                        <Body size="md" weight="bold">
                          카드 제목
                        </Body>
                        <Body size="sm">카드 내용입니다.</Body>
                      </Box>
                    </Box>
                  </Card>
                </div>

                <div>
                  <Body weight="semibold" className="mb-2">
                    중앙 정렬 콘텐츠
                  </Body>
                  <Code variant="block" language="tsx" showLineNumbers={false}>
                    {`<Box
  display="flex"
  direction="column"
  align="center"
  justify="center"
  className="h-48"
>
  <Body size="lg" weight="bold">중앙 정렬</Body>
  <Body size="sm">가로, 세로 모두 중앙에 위치</Body>
</Box>`}
                  </Code>
                  <Card variant="outlined" className="mt-3">
                    <Box
                      display="flex"
                      direction="column"
                      align="center"
                      justify="center"
                      className="h-48 border border-krds-gray-20 rounded"
                    >
                      <Body size="lg" weight="bold">
                        중앙 정렬
                      </Body>
                      <Body size="sm">가로, 세로 모두 중앙에 위치</Body>
                    </Box>
                  </Card>
                </div>
              </Stack>
            </Subsection>
          </Section>

          {/* Best Practices */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="best-practices"
              title="Best Practices"
            />

            <Subsection level="h3">
              <SectionHeading level="h3" title="언제 사용하나요?" />
              <DoCard title="Box를 사용하기 적합한 경우">
                <List variant="check">
                  <ListItem>Flex 또는 Grid 레이아웃을 구성할 때</ListItem>
                  <ListItem>컴포넌트 내부 레이아웃을 정리할 때</ListItem>
                  <ListItem>간단한 간격 조정이 필요할 때</ListItem>
                  <ListItem>요소의 정렬이 필요할 때</ListItem>
                  <ListItem>
                    시맨틱한 HTML 태그(section, article 등)로 렌더링해야 할 때
                  </ListItem>
                </List>
              </DoCard>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="언제 사용하지 말아야 하나요?" />
              <DontCard title="Box 사용을 피해야 하는 경우">
                <List variant="dash">
                  <ListItem>
                    세로 방향 간격만 필요할 때 (<Code>Stack</Code> 컴포넌트
                    사용)
                  </ListItem>
                  <ListItem>
                    균등한 그리드가 필요할 때 (<Code>SimpleGrid</Code> 컴포넌트
                    사용)
                  </ListItem>
                  <ListItem>
                    자동 줄바꿈이 필요할 때 (<Code>Wrap</Code> 컴포넌트 사용)
                  </ListItem>
                  <ListItem>
                    복잡한 레이아웃 구성 시 (전용 레이아웃 컴포넌트 사용 권장)
                  </ListItem>
                  <ListItem>과도한 Box 중첩 (코드 복잡도 증가)</ListItem>
                </List>
              </DontCard>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="추가 가이드라인" />
              <List>
                <ListItem>
                  시맨틱한 HTML 구조를 위해 <Code>as</Code> prop을 적극
                  활용하세요.
                </ListItem>
                <ListItem>과도한 중첩은 피하고 간결하게 구성하세요.</ListItem>
                <ListItem>
                  일관된 간격을 위해 <Code>gap</Code> prop을 사용하세요.
                </ListItem>
              </List>
            </Subsection>
          </Section>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
          <Section level="h2">
            <SectionHeading level="h2" id="api" title="API Reference" />

            <Subsection level="h3">
              <SectionHeading level="h3" title="Box Props" />

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
                    <TableCell className="font-mono">display</TableCell>
                    <TableCell className="font-mono">
                      &apos;flex&apos; | &apos;grid&apos; | &apos;block&apos;
                    </TableCell>
                    <TableCell className="font-mono">
                      &apos;flex&apos;
                    </TableCell>
                    <TableCell>Display 타입</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">direction</TableCell>
                    <TableCell className="font-mono">
                      &apos;row&apos; | &apos;column&apos;
                    </TableCell>
                    <TableCell className="font-mono">&apos;row&apos;</TableCell>
                    <TableCell>
                      Flex 방향 (display=&apos;flex&apos;일 때만 적용)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">align</TableCell>
                    <TableCell className="font-mono">
                      &apos;start&apos; | &apos;center&apos; | &apos;end&apos; |
                      &apos;stretch&apos;
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>align-items (교차축 정렬)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">justify</TableCell>
                    <TableCell className="font-mono">
                      &apos;start&apos; | &apos;center&apos; | &apos;end&apos; |
                      &apos;between&apos; | &apos;around&apos;
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>justify-content (주축 정렬)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">gap</TableCell>
                    <TableCell className="font-mono">
                      &apos;xs&apos; | &apos;sm&apos; | &apos;md&apos; |
                      &apos;lg&apos; | &apos;xl&apos; | number
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>자식 요소 간 간격</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">as</TableCell>
                    <TableCell className="font-mono">
                      &apos;div&apos; | &apos;section&apos; |
                      &apos;article&apos; | &apos;aside&apos; | &apos;main&apos;
                    </TableCell>
                    <TableCell className="font-mono">&apos;div&apos;</TableCell>
                    <TableCell>렌더링할 HTML 태그</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">className</TableCell>
                    <TableCell className="font-mono">string</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">children</TableCell>
                    <TableCell className="font-mono">ReactNode</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>자식 요소</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="KRDS 준수사항" />
              <List variant="check">
                <ListItem>KRDS Spacing 토큰 기반 간격 시스템 사용</ListItem>
                <ListItem>일관된 레이아웃 구조 제공</ListItem>
                <ListItem>반응형 레이아웃 지원</ListItem>
              </List>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Accordion', href: '/layout/accordion' }}
        next={{ title: 'Card', href: '/layout/card' }}
      />
    </>
  );
}
