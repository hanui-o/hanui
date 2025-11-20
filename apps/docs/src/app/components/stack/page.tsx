'use client';

import {
  Section,
  SectionHeading,
  Subsection,
  Stack as StackComponent,
  VStack,
  HStack,
  Code,
  Card,
  List,
  ListItem,
  Body,
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
  PageNavigation,
  DoCard,
  DontCard,
} from '@/components/hanui';

export default function StackPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Stack, VStack, HStack"
        description="요소들을 수직 또는 수평으로 정렬하고 간격을 관리하는 간단한 레이아웃 컴포넌트입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Installation */}
          <Section level="h2">
            <SectionHeading level="h2" id="installation" title="설치">
              <Body className="leading-relaxed">
                다음 명령어로 Stack 컴포넌트를 설치합니다:
              </Body>
            </SectionHeading>

            <Code variant="block" language="bash" showLineNumbers={false}>
              npx @hanui/cli add stack
            </Code>
          </Section>

          {/* What is it */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="what-is-it"
              title="무엇인가요?"
              description="Stack은 요소들을 수직 또는 수평으로 정렬하는 단순하고 직관적인 레이아웃 컴포넌트입니다."
            />

            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>Stack:</strong> 기본 수직 레이아웃 (direction="row"로
                  수평 변경 가능)
                </ListItem>
                <ListItem>
                  <strong>VStack:</strong> 항상 수직 방향
                </ListItem>
                <ListItem>
                  <strong>HStack:</strong> 항상 수평 방향 (기본 align="center")
                </ListItem>
                <ListItem>
                  <strong>간격 조절:</strong> gap prop으로 8px ~ 64px 간격 설정
                </ListItem>
                <ListItem>
                  <strong>정렬 옵션:</strong> align, justify로 자유로운 정렬
                  가능
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* Preview */}
          <Section level="h2">
            <SectionHeading level="h2" id="preview" title="미리보기" />
            <Card variant="outlined">
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
            </Card>
          </Section>

          {/* Usage */}
          <Section level="h2">
            <SectionHeading level="h2" id="usage" title="사용 방법" />

            <Subsection level="h3">
              <SectionHeading level="h3" title="VStack - 수직 레이아웃">
                <Body className="leading-relaxed">
                  요소를 수직으로 쌓아 올립니다:
                </Body>
              </SectionHeading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`import { VStack } from '@/components/hanui';

<VStack gap="md">
  <div>위</div>
  <div>중간</div>
  <div>아래</div>
</VStack>`}
              </Code>

              <Card variant="outlined" className="mt-3">
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
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="HStack - 수평 레이아웃">
                <Body className="leading-relaxed">
                  요소를 수평으로 나란히 배치합니다:
                </Body>
              </SectionHeading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`import { HStack } from '@/components/hanui';

<HStack gap="sm">
  <div>왼쪽</div>
  <div>중앙</div>
  <div>오른쪽</div>
</HStack>`}
              </Code>

              <Card variant="outlined" className="mt-3">
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
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Stack - 방향 전환 가능">
                <Body className="leading-relaxed">
                  Stack은 기본 수직이지만 direction="row"로 수평으로 변경할 수
                  있습니다:
                </Body>
              </SectionHeading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`import { Stack } from '@/components/hanui';

// 수직 (기본)
<Stack gap="md">
  <div>위</div>
  <div>아래</div>
</Stack>

// 수평
<Stack direction="row" gap="md">
  <div>왼쪽</div>
  <div>오른쪽</div>
</Stack>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="간격 조절 (Gap)">
                <Body className="leading-relaxed">
                  gap prop으로 요소 간 간격을 조절합니다:
                </Body>
              </SectionHeading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`// 간격 옵션
<VStack gap="xs">  {/* 8px */}
<VStack gap="sm">  {/* 12px */}
<VStack gap="md">  {/* 16px - 기본값 */}
<VStack gap="lg">  {/* 24px */}
<VStack gap="xl">  {/* 32px */}
<VStack gap="2xl"> {/* 40px */}
<VStack gap="3xl"> {/* 64px */}

// 간격 없음
<VStack gap="none"> {/* 0px */}`}
              </Code>

              <StackComponent gap="md" className="mt-3">
                <Card variant="outlined">
                  <Body className="font-medium mb-2">
                    Small Gap (sm - 12px)
                  </Body>
                  <VStack gap="sm">
                    <div className="bg-krds-accent-10 p-3 rounded w-full">
                      Item 1
                    </div>
                    <div className="bg-krds-accent-10 p-3 rounded w-full">
                      Item 2
                    </div>
                  </VStack>
                </Card>

                <Card variant="outlined">
                  <Body className="font-medium mb-2">
                    Large Gap (lg - 24px)
                  </Body>
                  <VStack gap="lg">
                    <div className="bg-krds-warning-10 p-3 rounded w-full">
                      Item 1
                    </div>
                    <div className="bg-krds-warning-10 p-3 rounded w-full">
                      Item 2
                    </div>
                  </VStack>
                </Card>
              </StackComponent>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="정렬 (Align & Justify)">
                <Body className="leading-relaxed">
                  align과 justify로 요소를 정렬합니다:
                </Body>
              </SectionHeading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`// 가운데 정렬
<VStack align="center" gap="sm">
  <div>중앙 정렬</div>
</VStack>

// 양 끝 정렬
<HStack justify="between">
  <div>왼쪽</div>
  <div>오른쪽</div>
</HStack>

// 가운데 정렬 + 중앙 배치
<HStack justify="center" align="center" gap="md">
  <Button>취소</Button>
  <Button>확인</Button>
</HStack>`}
              </Code>

              <StackComponent gap="md" className="mt-3">
                <Card variant="outlined">
                  <Body className="font-medium mb-2">
                    VStack - Center Align
                  </Body>
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
                </Card>

                <Card variant="outlined">
                  <Body className="font-medium mb-2">
                    HStack - Space Between
                  </Body>
                  <HStack
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
                </Card>
              </StackComponent>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="실제 사용 예시">
                <Body className="leading-relaxed">
                  폼 레이아웃과 버튼 그룹 예시입니다:
                </Body>
              </SectionHeading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`// 폼 레이아웃
<VStack gap="md">
  <Input label="이름" />
  <Input label="이메일" />
  <Input label="비밀번호" type="password" />

  <HStack justify="end" gap="sm">
    <Button variant="outline">취소</Button>
    <Button>제출</Button>
  </HStack>
</VStack>

// 카드 리스트
<VStack gap="lg">
  <Card>카드 1</Card>
  <Card>카드 2</Card>
  <Card>카드 3</Card>
</VStack>`}
              </Code>
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
              <DoCard title="Stack을 사용하기 적합한 경우">
                <List variant="check">
                  <ListItem>여러 요소를 수직 또는 수평으로 나열할 때</ListItem>
                  <ListItem>요소 간 일관된 간격이 필요할 때</ListItem>
                  <ListItem>폼 레이아웃을 구성할 때</ListItem>
                  <ListItem>버튼 그룹을 정렬할 때</ListItem>
                  <ListItem>카드나 리스트 아이템을 배치할 때</ListItem>
                </List>
              </DoCard>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="언제 사용하지 말아야 하나요?" />
              <DontCard title="Stack 사용을 피해야 하는 경우">
                <List variant="dash">
                  <ListItem>
                    그리드 레이아웃이 필요할 때 (<Code>SimpleGrid</Code> 사용)
                  </ListItem>
                  <ListItem>
                    자동 줄바꿈이 필요할 때 (<Code>Wrap</Code> 사용)
                  </ListItem>
                  <ListItem>
                    복잡한 2차원 레이아웃일 때 (CSS Grid 직접 사용)
                  </ListItem>
                </List>
              </DontCard>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="사용 가이드라인" />
              <List>
                <ListItem>
                  VStack과 HStack은 명확한 의도 표현에 좋습니다
                </ListItem>
                <ListItem>
                  HStack은 기본적으로 align="center"가 적용되어 수평 정렬이
                  자연스럽습니다
                </ListItem>
                <ListItem>
                  복잡한 레이아웃은 Stack을 중첩하여 구성할 수 있습니다
                </ListItem>
                <ListItem>
                  간격은 콘텐츠의 밀도에 따라 sm, md, lg 중 선택하세요
                </ListItem>
              </List>
            </Subsection>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <SectionHeading level="h2" id="api" title="API Reference" />

            <Subsection level="h3">
              <SectionHeading level="h3" title="Stack Props" />

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
                    <TableCell className="font-mono">gap</TableCell>
                    <TableCell className="font-mono">
                      StackGap | number
                    </TableCell>
                    <TableCell className="font-mono">
                      &apos;none&apos;
                    </TableCell>
                    <TableCell>요소 간 간격</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">direction</TableCell>
                    <TableCell className="font-mono">
                      &apos;row&apos; | undefined
                    </TableCell>
                    <TableCell className="font-mono">
                      undefined (수직)
                    </TableCell>
                    <TableCell>
                      스택 방향 (Stack만 사용 가능, VStack/HStack은 고정)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">align</TableCell>
                    <TableCell className="font-mono">
                      &apos;start&apos; | &apos;center&apos; | &apos;end&apos; |
                      &apos;stretch&apos;
                    </TableCell>
                    <TableCell className="font-mono">
                      - (HStack: &apos;center&apos;)
                    </TableCell>
                    <TableCell>교차축 정렬</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">justify</TableCell>
                    <TableCell className="font-mono">
                      &apos;start&apos; | &apos;center&apos; | &apos;end&apos; |
                      &apos;between&apos; | &apos;around&apos;
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>주축 정렬</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">as</TableCell>
                    <TableCell className="font-mono">
                      &apos;div&apos; | &apos;section&apos; |
                      &apos;article&apos; | ...
                    </TableCell>
                    <TableCell className="font-mono">&apos;div&apos;</TableCell>
                    <TableCell>렌더링할 HTML 요소</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Gap Options" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>값</TableHead>
                    <TableHead>간격</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">none</TableCell>
                    <TableCell>0px</TableCell>
                    <TableCell>간격 없음</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">xs</TableCell>
                    <TableCell>8px</TableCell>
                    <TableCell>매우 작은 간격</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">sm</TableCell>
                    <TableCell>12px</TableCell>
                    <TableCell>작은 간격</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">md</TableCell>
                    <TableCell>16px</TableCell>
                    <TableCell>중간 간격 (권장)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">lg</TableCell>
                    <TableCell>24px</TableCell>
                    <TableCell>큰 간격</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">xl</TableCell>
                    <TableCell>32px</TableCell>
                    <TableCell>매우 큰 간격</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">2xl</TableCell>
                    <TableCell>40px</TableCell>
                    <TableCell>2배 큰 간격</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">3xl</TableCell>
                    <TableCell>64px</TableCell>
                    <TableCell>3배 큰 간격</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Component 비교" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Component</TableHead>
                    <TableHead>Direction</TableHead>
                    <TableHead>Default Align</TableHead>
                    <TableHead>사용 시점</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">Stack</TableCell>
                    <TableCell>수직 (direction="row"로 변경 가능)</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>방향이 동적으로 변경되어야 할 때</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">VStack</TableCell>
                    <TableCell>항상 수직</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>명확하게 수직 레이아웃임을 표현</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">HStack</TableCell>
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
        prev={{ title: 'SimpleGrid', href: '/components/simple-grid' }}
        next={{ title: 'Structured List', href: '/components/structured-list' }}
      />
    </>
  );
}
