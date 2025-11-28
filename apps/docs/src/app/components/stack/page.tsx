'use client';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
  Installation,
} from '@/components/content';
import { ComponentPreview } from '@/components/content/ComponentPreview';

// Docs helper components
import { DoCard, DontCard } from '@/components/helpers';

// UI components - from @hanui/react
import {
  Stack as StackComponent,
  VStack,
  HStack,
  Code,
  List,
  ListItem,
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

export default function StackPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Stack, VStack, HStack"
        description="요소들을 수직 또는 수평으로 정렬하고 간격을 관리하는 레이아웃 컴포넌트입니다."
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
              <StackComponent gap="md">
                <div className="bg-krds-primary-10 p-4 rounded">
                  첫 번째 아이템
                </div>
                <div className="bg-krds-primary-10 p-4 rounded">
                  두 번째 아이템
                </div>
                <div className="bg-krds-primary-10 p-4 rounded">
                  세 번째 아이템
                </div>
              </StackComponent>
            </ComponentPreview>

            <Code variant="block" language="tsx">
              {`import { Stack, VStack, HStack } from '@/components/hanui';

<Stack gap="md">
  <div>첫 번째</div>
  <div>두 번째</div>
  <div>세 번째</div>
</Stack>`}
            </Code>
          </Section>

          {/* 설치 */}
          <Installation componentName="stack" />

          {/* 사용법 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="usage"
              title="사용법"
              description="Stack은 기본 수직 레이아웃, VStack은 항상 수직, HStack은 항상 수평 방향입니다."
            />

            <List variant="check" className="mb-4">
              <ListItem>
                <strong>Stack:</strong> 기본 수직 레이아웃
                (direction=&quot;row&quot;로 수평 변경 가능)
              </ListItem>
              <ListItem>
                <strong>VStack:</strong> 항상 수직 방향
              </ListItem>
              <ListItem>
                <strong>HStack:</strong> 항상 수평 방향 (기본
                align=&quot;center&quot;)
              </ListItem>
            </List>

            <Code variant="block" language="tsx">
              {`// 수직 스택 (기본)
<VStack gap="md">
  <div>위</div>
  <div>아래</div>
</VStack>

// 수평 스택
<HStack gap="md">
  <div>왼쪽</div>
  <div>오른쪽</div>
</HStack>

// Stack으로 방향 전환
<Stack direction="row" gap="md">
  <div>왼쪽</div>
  <div>오른쪽</div>
</Stack>`}
            </Code>
          </Section>

          {/* 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading
                level="h3"
                title="VStack - 수직 레이아웃"
                description="요소를 수직으로 쌓아 올립니다."
              />
              <ComponentPreview>
                <VStack gap="md">
                  <div className="bg-krds-success-10 p-4 rounded w-full text-center">
                    첫 번째
                  </div>
                  <div className="bg-krds-success-10 p-4 rounded w-full text-center">
                    두 번째
                  </div>
                  <div className="bg-krds-success-10 p-4 rounded w-full text-center">
                    세 번째
                  </div>
                </VStack>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<VStack gap="md">
  <div>첫 번째</div>
  <div>두 번째</div>
  <div>세 번째</div>
</VStack>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="HStack - 수평 레이아웃"
                description="요소를 수평으로 나란히 배치합니다."
              />
              <ComponentPreview>
                <HStack gap="md">
                  <div className="bg-krds-primary-10 px-4 py-2 rounded">
                    왼쪽
                  </div>
                  <div className="bg-krds-primary-10 px-4 py-2 rounded">
                    중앙
                  </div>
                  <div className="bg-krds-primary-10 px-4 py-2 rounded">
                    오른쪽
                  </div>
                </HStack>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<HStack gap="md">
  <div>왼쪽</div>
  <div>중앙</div>
  <div>오른쪽</div>
</HStack>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Gap"
                description="gap prop으로 요소 간 간격을 조절합니다. xs(4px)부터 4xl(64px)까지 지원합니다."
              />
              <ComponentPreview>
                <StackComponent gap="md">
                  <div>
                    <p className="text-sm font-medium mb-2 text-krds-gray-70">
                      sm (8px)
                    </p>
                    <VStack gap="sm">
                      <div className="bg-krds-accent-10 p-3 rounded w-full">
                        Item 1
                      </div>
                      <div className="bg-krds-accent-10 p-3 rounded w-full">
                        Item 2
                      </div>
                    </VStack>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2 text-krds-gray-70">
                      lg (24px)
                    </p>
                    <VStack gap="lg">
                      <div className="bg-krds-warning-10 p-3 rounded w-full">
                        Item 1
                      </div>
                      <div className="bg-krds-warning-10 p-3 rounded w-full">
                        Item 2
                      </div>
                    </VStack>
                  </div>
                </StackComponent>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<VStack gap="none"> {/* 0px */}
<VStack gap="xs">   {/* 4px */}
<VStack gap="sm">   {/* 8px */}
<VStack gap="md">   {/* 16px */}
<VStack gap="lg">   {/* 24px */}
<VStack gap="xl">   {/* 32px */}
<VStack gap="2xl">  {/* 40px */}
<VStack gap="3xl">  {/* 48px */}
<VStack gap="4xl">  {/* 64px */}`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Align & Justify"
                description="align과 justify로 요소를 정렬합니다."
              />
              <ComponentPreview>
                <StackComponent gap="lg">
                  <div>
                    <p className="text-sm font-medium mb-2 text-krds-gray-70">
                      VStack - Center Align
                    </p>
                    <VStack
                      align="center"
                      gap="sm"
                      className="border border-krds-gray-20 rounded p-4"
                    >
                      <div className="bg-krds-accent-10 px-4 py-2 rounded">
                        중앙 정렬
                      </div>
                      <div className="bg-krds-accent-10 px-4 py-2 rounded">
                        아이템
                      </div>
                    </VStack>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2 text-krds-gray-70">
                      HStack - Space Between
                    </p>
                    <HStack
                      gap="sm"
                      justify="between"
                      className="border border-krds-gray-20 rounded p-4"
                    >
                      <div className="bg-krds-warning-10 px-4 py-2 rounded">
                        왼쪽
                      </div>
                      <div className="bg-krds-warning-10 px-4 py-2 rounded">
                        오른쪽
                      </div>
                    </HStack>
                  </div>
                </StackComponent>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`// 가운데 정렬
<VStack align="center" gap="sm">
  <div>중앙 정렬</div>
</VStack>

// 양 끝 정렬
<HStack justify="between" gap="sm">
  <div>왼쪽</div>
  <div>오른쪽</div>
</HStack>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="실제 사용 예시"
                description="폼 레이아웃과 버튼 그룹 예시입니다."
              />
              <Code variant="block" language="tsx">
                {`// 폼 레이아웃
<VStack gap="md">
  <Input label="이름" />
  <Input label="이메일" />
  <HStack justify="end" gap="sm">
    <Button variant="outline">취소</Button>
    <Button>제출</Button>
  </HStack>
</VStack>

// 카드 리스트
<VStack gap="lg">
  <Card>카드 1</Card>
  <Card>카드 2</Card>
</VStack>`}
              </Code>
            </Subsection>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="Stack Props" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>gap</Code>
                    </TableCell>
                    <TableCell>
                      <Code>StackGap | number</Code>
                    </TableCell>
                    <TableCell>
                      <Code>&quot;none&quot;</Code>
                    </TableCell>
                    <TableCell>요소 간 간격</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>direction</Code>
                    </TableCell>
                    <TableCell>
                      <Code>&quot;row&quot; | &quot;column&quot;</Code>
                    </TableCell>
                    <TableCell>
                      <Code>&quot;column&quot;</Code>
                    </TableCell>
                    <TableCell>스택 방향</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>align</Code>
                    </TableCell>
                    <TableCell>
                      <Code>
                        &quot;start&quot; | &quot;center&quot; | &quot;end&quot;
                        | &quot;stretch&quot;
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>교차축 정렬</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>justify</Code>
                    </TableCell>
                    <TableCell>
                      <Code>
                        &quot;start&quot; | &quot;center&quot; | &quot;end&quot;
                        | &quot;between&quot; | &quot;around&quot;
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>주축 정렬</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>as</Code>
                    </TableCell>
                    <TableCell>
                      <Code>
                        &quot;div&quot; | &quot;section&quot; |
                        &quot;article&quot; | ...
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code>&quot;div&quot;</Code>
                    </TableCell>
                    <TableCell>렌더링할 HTML 요소</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Gap Options" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>값</TableHead>
                    <TableHead>간격</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>none</Code>
                    </TableCell>
                    <TableCell>0px</TableCell>
                    <TableCell>간격 없음</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>xs</Code>
                    </TableCell>
                    <TableCell>4px</TableCell>
                    <TableCell>매우 작은 간격</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>sm</Code>
                    </TableCell>
                    <TableCell>8px</TableCell>
                    <TableCell>작은 간격</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>md</Code>
                    </TableCell>
                    <TableCell>16px</TableCell>
                    <TableCell>중간 간격 (권장)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>lg</Code>
                    </TableCell>
                    <TableCell>24px</TableCell>
                    <TableCell>큰 간격</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>xl</Code>
                    </TableCell>
                    <TableCell>32px</TableCell>
                    <TableCell>매우 큰 간격</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>2xl</Code>
                    </TableCell>
                    <TableCell>40px</TableCell>
                    <TableCell>2배 큰 간격</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>3xl</Code>
                    </TableCell>
                    <TableCell>48px</TableCell>
                    <TableCell>3배 큰 간격</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>4xl</Code>
                    </TableCell>
                    <TableCell>64px</TableCell>
                    <TableCell>4배 큰 간격</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="컴포넌트 비교" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>컴포넌트</TableHead>
                    <TableHead>방향</TableHead>
                    <TableHead>기본 align</TableHead>
                    <TableHead>사용 시점</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>Stack</Code>
                    </TableCell>
                    <TableCell>수직 (변경 가능)</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>방향이 동적으로 변경될 때</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>VStack</Code>
                    </TableCell>
                    <TableCell>항상 수직</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>수직 레이아웃임을 명확히 표현</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>HStack</Code>
                    </TableCell>
                    <TableCell>항상 수평</TableCell>
                    <TableCell>center</TableCell>
                    <TableCell>버튼 그룹 등 수평 정렬</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Spinner', href: '/components/spinner' }}
        next={{ title: 'Switch', href: '/components/switch' }}
      />
    </>
  );
}
