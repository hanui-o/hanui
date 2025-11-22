'use client';

// Docs layout components
import {
  PageSection as Section,
  SectionHeading,
  Subsection,
  PageNavigation,
} from '@/components/content';

// Docs helper components
import { SimpleGrid, DoCard, DontCard } from '@/components/helpers';

// UI components - from @hanui/react
import {
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
  Button,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@hanui/react';

export default function SimpleGridPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="SimpleGrid"
        description="자동으로 반응형 그리드 레이아웃을 생성하는 간단한 그리드 컴포넌트입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview">
          {/* Installation */}
          <Section>
            <SectionHeading level="h2" id="installation" title="설치">
              <Body className="leading-relaxed">
                다음 명령어로 SimpleGrid 컴포넌트를 설치합니다:
              </Body>
            </SectionHeading>

            <Code variant="block" language="bash" showLineNumbers={false}>
              npx @hanui/cli add simple-grid
            </Code>
          </Section>

          {/* What is it */}
          <Section>
            <SectionHeading
              level="h2"
              id="what-is-it"
              title="무엇인가요?"
              description="SimpleGrid는 CSS Grid를 기반으로 반응형 레이아웃을 쉽게 만들 수 있는 유틸리티 컴포넌트입니다."
            />

            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>고정 열 개수:</strong> columns prop으로 1~12개의
                  고정된 열을 설정할 수 있습니다.
                </ListItem>
                <ListItem>
                  <strong>자동 반응형:</strong> minChildWidth로 최소 너비를
                  지정하면 자동으로 열 개수가 조정됩니다.
                </ListItem>
                <ListItem>
                  <strong>간격 옵션:</strong> none, xs, sm, md, lg, xl 6가지
                  간격 옵션을 제공합니다.
                </ListItem>
                <ListItem>
                  <strong>CSS Grid 기반:</strong> 모던 CSS Grid 레이아웃을
                  사용합니다.
                </ListItem>
                <ListItem>
                  <strong>접근성:</strong> 키보드 네비게이션과 스크린 리더를
                  지원합니다.
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* Preview */}
          <Section>
            <SectionHeading level="h2" id="preview" title="미리보기" />
            <Card variant="outlined">
              <SimpleGrid columns={3} gap="md">
                <Card padding="md">
                  <Body>Item 1</Body>
                </Card>
                <Card padding="md">
                  <Body>Item 2</Body>
                </Card>
                <Card padding="md">
                  <Body>Item 3</Body>
                </Card>
                <Card padding="md">
                  <Body>Item 4</Body>
                </Card>
                <Card padding="md">
                  <Body>Item 5</Body>
                </Card>
                <Card padding="md">
                  <Body>Item 6</Body>
                </Card>
              </SimpleGrid>
            </Card>
          </Section>

          {/* Usage */}
          <Section>
            <SectionHeading level="h2" id="usage" title="사용 방법" />

            <Subsection level="h3">
              <SectionHeading level="h3" title="고정된 열 개수">
                <Body className="leading-relaxed">
                  <Code>columns</Code> prop으로 그리드의 열 개수를 지정할 수
                  있습니다:
                </Body>
              </SectionHeading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`import { SimpleGrid } from '@/components/hanui';

<SimpleGrid columns={4} gap="md">
  {items.map((item, i) => (
    <div key={i}>{item}</div>
  ))}
</SimpleGrid>`}
              </Code>

              <Card variant="outlined" className="mt-3">
                <SimpleGrid columns={4} gap="md">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="px-4 py-8 bg-krds-gray-10 rounded text-center"
                    >
                      {i + 1}
                    </div>
                  ))}
                </SimpleGrid>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="자동 반응형 (minChildWidth)">
                <Body className="leading-relaxed">
                  <Code>minChildWidth</Code> prop으로 각 아이템의 최소 너비를
                  지정하면, 컨테이너 크기에 따라 자동으로 열 개수가 조정됩니다:
                </Body>
              </SectionHeading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<SimpleGrid minChildWidth="200px" gap="lg">
  {items.map((item, i) => (
    <Card key={i}>
      <Body>{item}</Body>
    </Card>
  ))}
</SimpleGrid>`}
              </Code>

              <Card variant="outlined" className="mt-3">
                <SimpleGrid minChildWidth="200px" gap="lg">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} padding="lg">
                      <Body>Auto Item {i + 1}</Body>
                      <Body className="text-sm text-gray-600 mt-2">
                        최소 200px 너비
                      </Body>
                    </Card>
                  ))}
                </SimpleGrid>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="간격 조정">
                <Body className="leading-relaxed">
                  <Code>gap</Code> prop으로 그리드 아이템 간 간격을 조절할 수
                  있습니다:
                </Body>
              </SectionHeading>

              <Stack gap="md">
                <div>
                  <Body className="font-medium mb-2">
                    작은 간격 (sm - 16px)
                  </Body>
                  <Card variant="outlined">
                    <SimpleGrid columns={3} gap="sm">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="px-4 py-6 bg-krds-primary-10 rounded text-center"
                        >
                          {i + 1}
                        </div>
                      ))}
                    </SimpleGrid>
                  </Card>
                </div>

                <div>
                  <Body className="font-medium mb-2">
                    중간 간격 (md - 24px)
                  </Body>
                  <Card variant="outlined">
                    <SimpleGrid columns={3} gap="md">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="px-4 py-6 bg-krds-primary-10 rounded text-center"
                        >
                          {i + 1}
                        </div>
                      ))}
                    </SimpleGrid>
                  </Card>
                </div>

                <div>
                  <Body className="font-medium mb-2">큰 간격 (lg - 32px)</Body>
                  <Card variant="outlined">
                    <SimpleGrid columns={3} gap="lg">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="px-4 py-6 bg-krds-primary-10 rounded text-center"
                        >
                          {i + 1}
                        </div>
                      ))}
                    </SimpleGrid>
                  </Card>
                </div>
              </Stack>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="열 개수 변형">
                <Body className="leading-relaxed">
                  1~12개의 열을 자유롭게 설정할 수 있습니다:
                </Body>
              </SectionHeading>

              <Stack gap="md">
                <div>
                  <Body className="font-medium mb-2">2열 그리드</Body>
                  <Card variant="outlined">
                    <SimpleGrid columns={2} gap="md">
                      <Card padding="md">
                        <Body className="font-semibold">왼쪽 컨텐츠</Body>
                        <Body className="text-sm mt-2">
                          2열 그리드의 첫 번째 열
                        </Body>
                      </Card>
                      <Card padding="md">
                        <Body className="font-semibold">오른쪽 컨텐츠</Body>
                        <Body className="text-sm mt-2">
                          2열 그리드의 두 번째 열
                        </Body>
                      </Card>
                    </SimpleGrid>
                  </Card>
                </div>

                <div>
                  <Body className="font-medium mb-2">4열 그리드</Body>
                  <Card variant="outlined">
                    <SimpleGrid columns={4} gap="sm">
                      {['React', 'TypeScript', 'Tailwind', 'Next.js'].map(
                        (tech) => (
                          <Card key={tech} padding="sm">
                            <Body className="text-center text-sm">{tech}</Body>
                          </Card>
                        )
                      )}
                    </SimpleGrid>
                  </Card>
                </div>
              </Stack>
            </Subsection>
          </Section>

          {/* Examples */}
          <Section>
            <SectionHeading level="h2" id="examples" title="사용 예시" />

            <Subsection level="h3">
              <SectionHeading level="h3" title="제품 카드 그리드">
                <Body className="leading-relaxed">
                  제품 목록을 그리드 레이아웃으로 표시하는 예시입니다:
                </Body>
              </SectionHeading>

              <Card variant="outlined" className="mb-3">
                <SimpleGrid minChildWidth="250px" gap="lg">
                  {[
                    { name: '제품 A', price: '29,000원' },
                    { name: '제품 B', price: '39,000원' },
                    { name: '제품 C', price: '49,000원' },
                    { name: '제품 D', price: '59,000원' },
                  ].map((product) => (
                    <Card key={product.name} padding="lg" gap="sm">
                      <div className="w-full h-32 bg-krds-gray-10 rounded mb-4" />
                      <Body className="font-semibold">{product.name}</Body>
                      <Body className="text-krds-primary-base">
                        {product.price}
                      </Body>
                      <Button variant="primary" className="w-full mt-2">
                        장바구니
                      </Button>
                    </Card>
                  ))}
                </SimpleGrid>
              </Card>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<SimpleGrid minChildWidth="250px" gap="lg">
  {products.map(product => (
    <Card key={product.id} padding="lg">
      <Image src={product.image} />
      <Body className="font-semibold">{product.name}</Body>
      <Body className="text-krds-primary-base">{product.price}</Body>
      <Button variant="primary" className="w-full">장바구니</Button>
    </Card>
  ))}
</SimpleGrid>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="대시보드 위젯">
                <Body className="leading-relaxed">
                  통계 대시보드를 그리드로 구성하는 예시입니다:
                </Body>
              </SectionHeading>

              <Card variant="outlined" className="mb-3">
                <SimpleGrid columns={3} gap="md">
                  <Card variant="shadow" padding="lg" gap="sm">
                    <Body className="text-sm text-gray-600">총 방문자</Body>
                    <Body className="text-3xl font-bold">1,234</Body>
                    <Body className="text-sm text-green-600">+12.5%</Body>
                  </Card>
                  <Card variant="shadow" padding="lg" gap="sm">
                    <Body className="text-sm text-gray-600">신규 가입</Body>
                    <Body className="text-3xl font-bold">89</Body>
                    <Body className="text-sm text-blue-600">+8.3%</Body>
                  </Card>
                  <Card variant="shadow" padding="lg" gap="sm">
                    <Body className="text-sm text-gray-600">매출</Body>
                    <Body className="text-3xl font-bold">456만원</Body>
                    <Body className="text-sm text-red-600">-3.2%</Body>
                  </Card>
                </SimpleGrid>
              </Card>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<SimpleGrid columns={3} gap="md">
  <Card variant="shadow" padding="lg">
    <Body className="text-sm text-gray-600">총 방문자</Body>
    <Body className="text-3xl font-bold">1,234</Body>
    <Body className="text-sm text-green-600">+12.5%</Body>
  </Card>
  {/* More widgets... */}
</SimpleGrid>`}
              </Code>
            </Subsection>
          </Section>

          {/* Best Practices */}
          <Section>
            <SectionHeading
              level="h2"
              id="best-practices"
              title="Best Practices"
            />

            <Subsection level="h3">
              <SectionHeading level="h3" title="언제 사용하나요?" />
              <DoCard title="SimpleGrid를 사용하기 적합한 경우">
                <List variant="check">
                  <ListItem>카드 그리드를 만들 때</ListItem>
                  <ListItem>균등한 너비의 아이템을 정렬할 때</ListItem>
                  <ListItem>대시보드 레이아웃을 구성할 때</ListItem>
                  <ListItem>갤러리나 제품 목록을 표시할 때</ListItem>
                  <ListItem>반응형 그리드가 필요할 때</ListItem>
                </List>
              </DoCard>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="언제 사용하지 말아야 하나요?" />
              <DontCard title="SimpleGrid 사용을 피해야 하는 경우">
                <List variant="dash">
                  <ListItem>
                    아이템들이 자동 줄바꿈되어야 할 때 (<Code>Wrap</Code> 사용)
                  </ListItem>
                  <ListItem>
                    수직/수평 스택 레이아웃이 필요할 때 (<Code>Stack</Code>{' '}
                    사용)
                  </ListItem>
                  <ListItem>
                    복잡한 그리드 레이아웃이 필요할 때 (CSS Grid 직접 사용)
                  </ListItem>
                  <ListItem>
                    각 아이템의 크기가 불규칙할 때 (다른 레이아웃 방식 고려)
                  </ListItem>
                </List>
              </DontCard>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="사용 가이드라인" />
              <List>
                <ListItem>
                  고정된 레이아웃이 필요한 경우 <Code>columns</Code>를
                  사용하세요.
                </ListItem>
                <ListItem>
                  반응형 레이아웃이 필요한 경우 <Code>minChildWidth</Code>를
                  사용하세요.
                </ListItem>
                <ListItem>
                  간격은 콘텐츠의 밀도와 중요도에 따라 적절히 조절하세요.
                </ListItem>
                <ListItem>
                  모바일에서는 1~2열, 데스크탑에서는 3~4열 정도가 적절합니다.
                </ListItem>
              </List>
            </Subsection>
          </Section>

          {/* Accessibility */}
          <Section>
            <SectionHeading level="h2" id="accessibility" title="접근성" />

            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>시맨틱 마크업:</strong> SimpleGrid는 의미론적으로
                  중립적인 <Code>&lt;div&gt;</Code> 요소를 사용합니다. 필요시
                  적절한 ARIA 역할을 추가하세요.
                </ListItem>
                <ListItem>
                  <strong>반응형 레이아웃:</strong> minChildWidth를 사용하면
                  다양한 화면 크기에서 자동으로 최적화된 레이아웃을 제공합니다.
                </ListItem>
                <ListItem>
                  <strong>키보드 네비게이션:</strong> 그리드 내 요소들의 Tab
                  순서가 자연스럽게 유지됩니다.
                </ListItem>
              </List>
            </Card>
          </Section>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
          <Section>
            <SectionHeading level="h2" id="api" title="API Reference" />

            <Subsection level="h3">
              <SectionHeading level="h3" title="SimpleGrid Props" />

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
                    <TableCell className="font-mono">columns</TableCell>
                    <TableCell className="font-mono">
                      1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
                    </TableCell>
                    <TableCell className="font-mono">1</TableCell>
                    <TableCell>
                      그리드 열 개수 (minChildWidth가 설정되면 무시됨)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">minChildWidth</TableCell>
                    <TableCell className="font-mono">string</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      각 자식 요소의 최소 너비 (예: &quot;200px&quot;,
                      &quot;15rem&quot;). 설정 시 자동으로 열 개수 조정
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">gap</TableCell>
                    <TableCell className="font-mono">
                      &apos;none&apos; | &apos;xs&apos; | &apos;sm&apos; |
                      &apos;md&apos; | &apos;lg&apos; | &apos;xl&apos;
                    </TableCell>
                    <TableCell className="font-mono">&apos;md&apos;</TableCell>
                    <TableCell>그리드 아이템 간 간격</TableCell>
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
                    <TableCell>그리드 내부에 표시할 요소들</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Gap 크기" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Size</TableHead>
                    <TableHead>픽셀 값</TableHead>
                    <TableHead>Tailwind 클래스</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">none</TableCell>
                    <TableCell>0px</TableCell>
                    <TableCell className="font-mono">gap-0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">xs</TableCell>
                    <TableCell>8px</TableCell>
                    <TableCell className="font-mono">gap-2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">sm</TableCell>
                    <TableCell>16px</TableCell>
                    <TableCell className="font-mono">gap-4</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">md</TableCell>
                    <TableCell>24px</TableCell>
                    <TableCell className="font-mono">gap-6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">lg</TableCell>
                    <TableCell>32px</TableCell>
                    <TableCell className="font-mono">gap-8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">xl</TableCell>
                    <TableCell>40px</TableCell>
                    <TableCell className="font-mono">gap-10</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Side Navigation', href: '/components/sidenavigation' }}
        next={{ title: 'SkipLink', href: '/components/skiplink' }}
      />
    </>
  );
}
