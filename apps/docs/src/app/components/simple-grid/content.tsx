'use client';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';

// Docs helper components
import { DoCard, DontCard } from '@/components/helpers';
import { Installation } from '@/components/content/Installation';
import { ComponentPreview } from '@/components/content/ComponentPreview';

// UI components - from @hanui/react
import {
  SimpleGrid,
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
      <Heading
        level="h1"
        title="SimpleGrid"
        description="자동으로 반응형 그리드 레이아웃을 생성하는 간단한 그리드 컴포넌트입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview">
          {/* 개요 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />
            <Body className="mb-3">
              SimpleGrid는 CSS Grid를 기반으로 반응형 레이아웃을 쉽게 만들 수
              있는 유틸리티 컴포넌트입니다. columns로 고정 열 개수를 설정하거나
              minChildWidth로 자동 반응형 그리드를 구현할 수 있습니다.
            </Body>
            <ComponentPreview>
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
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<SimpleGrid columns={3} gap="md">
  <Card padding="md"><Body>Item 1</Body></Card>
  <Card padding="md"><Body>Item 2</Body></Card>
  <Card padding="md"><Body>Item 3</Body></Card>
</SimpleGrid>`}
            </Code>
          </Section>

          {/* 설치 */}
          <Section level="h2">
            <Installation componentName="simple-grid" />
          </Section>

          {/* 사용법 */}
          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />

            <Code variant="block" language="tsx">
              {`import { SimpleGrid } from '@/components/hanui/simple-grid';

<SimpleGrid columns={3} gap="md">
  {items.map((item) => (
    <Card key={item.id}>{item.name}</Card>
  ))}
</SimpleGrid>`}
            </Code>
          </Section>

          {/* 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading
                level="h3"
                title="고정된 열 개수"
                description="columns prop으로 그리드의 열 개수를 지정합니다. (1-12)"
              />
              <ComponentPreview>
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
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<SimpleGrid columns={4} gap="md">
  {items.map((item, i) => (
    <div key={i}>{item}</div>
  ))}
</SimpleGrid>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="자동 반응형 (minChildWidth)"
                description="minChildWidth로 각 아이템의 최소 너비를 지정하면, 컨테이너 크기에 따라 자동으로 열 개수가 조정됩니다."
              />
              <ComponentPreview>
                <SimpleGrid minChildWidth="200px" gap="lg">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} padding="lg">
                      <Body>Auto Item {i + 1}</Body>
                      <Body className="text-sm text-krds-gray-60 mt-2">
                        최소 200px 너비
                      </Body>
                    </Card>
                  ))}
                </SimpleGrid>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<SimpleGrid minChildWidth="200px" gap="lg">
  {items.map((item, i) => (
    <Card key={i} padding="lg">
      <Body>{item}</Body>
    </Card>
  ))}
</SimpleGrid>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="간격 (Gap)"
                description="gap prop으로 그리드 아이템 간 간격을 조절합니다."
              />

              <Stack gap="md">
                <div>
                  <Body className="font-medium mb-2">
                    작은 간격 (sm - 16px)
                  </Body>
                  <ComponentPreview>
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
                  </ComponentPreview>
                </div>

                <div>
                  <Body className="font-medium mb-2">
                    중간 간격 (md - 24px, 기본값)
                  </Body>
                  <ComponentPreview>
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
                  </ComponentPreview>
                </div>

                <div>
                  <Body className="font-medium mb-2">큰 간격 (lg - 32px)</Body>
                  <ComponentPreview>
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
                  </ComponentPreview>
                </div>
              </Stack>
              <Code variant="block" language="tsx">
                {`<SimpleGrid columns={3} gap="sm">...</SimpleGrid>
<SimpleGrid columns={3} gap="md">...</SimpleGrid>
<SimpleGrid columns={3} gap="lg">...</SimpleGrid>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="제품 카드 그리드"
                description="제품 목록을 그리드 레이아웃으로 표시하는 예시입니다."
              />
              <ComponentPreview>
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
              </ComponentPreview>
              <Code variant="block" language="tsx">
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
              <Heading
                level="h3"
                title="대시보드 위젯"
                description="통계 대시보드를 그리드로 구성하는 예시입니다."
              />
              <ComponentPreview>
                <SimpleGrid columns={3} gap="md">
                  <Card variant="shadow" padding="lg" gap="sm">
                    <Body className="text-sm text-krds-gray-60">총 방문자</Body>
                    <Body className="text-3xl font-bold">1,234</Body>
                    <Body className="text-sm text-krds-success-60">+12.5%</Body>
                  </Card>
                  <Card variant="shadow" padding="lg" gap="sm">
                    <Body className="text-sm text-krds-gray-60">신규 가입</Body>
                    <Body className="text-3xl font-bold">89</Body>
                    <Body className="text-sm text-krds-info-60">+8.3%</Body>
                  </Card>
                  <Card variant="shadow" padding="lg" gap="sm">
                    <Body className="text-sm text-krds-gray-60">매출</Body>
                    <Body className="text-3xl font-bold">456만원</Body>
                    <Body className="text-sm text-krds-danger-60">-3.2%</Body>
                  </Card>
                </SimpleGrid>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<SimpleGrid columns={3} gap="md">
  <Card variant="shadow" padding="lg">
    <Body className="text-sm text-krds-gray-60">총 방문자</Body>
    <Body className="text-3xl font-bold">1,234</Body>
    <Body className="text-sm text-krds-success-60">+12.5%</Body>
  </Card>
  {/* More widgets... */}
</SimpleGrid>`}
              </Code>
            </Subsection>
          </Section>

          {/* 사용 가이드 */}
          <Section level="h2">
            <Heading level="h2" id="best-practices" title="사용 가이드" />

            <Subsection level="h3">
              <Heading level="h3" title="언제 사용하나요?" />
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
              <Heading level="h3" title="언제 사용하지 말아야 하나요?" />
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
          </Section>

          {/* 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="SimpleGrid는 WCAG 2.1 / KWCAG 2.2 기준을 준수합니다."
            />
            <List variant="check">
              <ListItem>
                <strong>시맨틱 마크업:</strong> 의미론적으로 중립적인{' '}
                <Code>&lt;div&gt;</Code> 요소를 사용합니다. 필요시 적절한 ARIA
                역할을 추가하세요.
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
          </Section>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API Reference" />

            <Subsection level="h3">
              <Heading level="h3" title="SimpleGrid Props" />

              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>속성</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>columns</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">1-12</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">1</Code>
                    </TableCell>
                    <TableCell>
                      그리드 열 개수 (minChildWidth 설정 시 무시됨)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>minChildWidth</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      각 자식 요소의 최소 너비 (예: &quot;200px&quot;). 설정 시
                      auto-fit으로 자동 열 개수 조정
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>gap</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        &apos;none&apos; | &apos;xs&apos; | &apos;sm&apos; |
                        &apos;md&apos; | &apos;lg&apos; | &apos;xl&apos;
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">&apos;md&apos;</Code>
                    </TableCell>
                    <TableCell>그리드 아이템 간 간격</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>className</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>children</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>그리드 내부에 표시할 요소들</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Gap 크기" />

              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>크기</TableHead>
                    <TableHead>픽셀 값</TableHead>
                    <TableHead>Tailwind 클래스</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>none</Code>
                    </TableCell>
                    <TableCell>0px</TableCell>
                    <TableCell>
                      <Code>gap-0</Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>xs</Code>
                    </TableCell>
                    <TableCell>8px</TableCell>
                    <TableCell>
                      <Code>gap-2</Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>sm</Code>
                    </TableCell>
                    <TableCell>16px</TableCell>
                    <TableCell>
                      <Code>gap-4</Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>md</Code>
                    </TableCell>
                    <TableCell>24px</TableCell>
                    <TableCell>
                      <Code>gap-6</Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>lg</Code>
                    </TableCell>
                    <TableCell>32px</TableCell>
                    <TableCell>
                      <Code>gap-8</Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>xl</Code>
                    </TableCell>
                    <TableCell>40px</TableCell>
                    <TableCell>
                      <Code>gap-10</Code>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Side Navigation', href: '/components/side-navigation' }}
        next={{ title: 'Skeleton', href: '/components/skeleton' }}
      />
    </>
  );
}
