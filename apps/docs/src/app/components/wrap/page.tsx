'use client';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';

// Docs helper components
import { DoCard, DontCard, Wrap as WrapComponent } from '@/components/helpers';

// UI components - from @hanui/react
import {
  Body,
  Stack,
  Button,
  Card,
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

export default function WrapPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Wrap"
        description="공간이 부족할 때 자동으로 줄바꿈되는 flexbox 레이아웃 컴포넌트입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Installation */}
          <Section>
            <Heading level="h2" id="installation" title="설치">
              <Body className="leading-relaxed">
                다음 명령어로 Wrap 컴포넌트를 설치합니다:
              </Body>
            </Heading>

            <Code variant="block" language="bash" showLineNumbers={false}>
              npx @hanui/cli add wrap
            </Code>
          </Section>

          {/* What is it */}
          <Section>
            <Heading
              level="h2"
              id="what-is-it"
              title="무엇인가요?"
              description="Wrap은 요소들에 간격을 추가하고 공간이 부족할 때 자동으로 줄바꿈하는 레이아웃 컴포넌트입니다."
            />

            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>자동 줄바꿈:</strong> 공간이 부족하면 자동으로 다음
                  줄로 넘어갑니다
                </ListItem>
                <ListItem>
                  <strong>간격 조절:</strong> gap prop으로 요소 간 간격 설정
                </ListItem>
                <ListItem>
                  <strong>정렬 옵션:</strong> align, justify로 정렬 가능
                </ListItem>
                <ListItem>
                  <strong>반응형:</strong> 화면 크기에 따라 유연하게 배치
                </ListItem>
                <ListItem>
                  <strong>사용 사례:</strong> 태그, 버튼 그룹, 카드 그리드 등
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* Preview */}
          <Section>
            <Heading level="h2" id="preview" title="미리보기" />
            <Card variant="outlined">
              <WrapComponent gap="md">
                <div className="px-4 py-2 bg-krds-primary-10 rounded">
                  Item 1
                </div>
                <div className="px-4 py-2 bg-krds-primary-10 rounded">
                  Item 2
                </div>
                <div className="px-4 py-2 bg-krds-primary-10 rounded">
                  Item 3
                </div>
                <div className="px-4 py-2 bg-krds-primary-10 rounded">
                  Item 4
                </div>
                <div className="px-4 py-2 bg-krds-primary-10 rounded">
                  Item 5
                </div>
              </WrapComponent>
            </Card>
          </Section>

          {/* Usage */}
          <Section>
            <Heading level="h2" id="usage" title="사용 방법" />

            <Subsection level="h3">
              <Heading level="h3" title="기본 사용">
                <Body className="leading-relaxed">
                  Wrap 컴포넌트는 자식 요소들을 자동으로 줄바꿈합니다:
                </Body>
              </Heading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`import { Wrap } from '@/components/hanui';

<Wrap gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Wrap>`}
              </Code>

              <Card variant="outlined" className="mt-3">
                <WrapComponent gap="md">
                  <div className="px-4 py-2 bg-krds-gray-10 rounded">
                    Item 1
                  </div>
                  <div className="px-4 py-2 bg-krds-gray-10 rounded">
                    Item 2
                  </div>
                  <div className="px-4 py-2 bg-krds-gray-10 rounded">
                    Item 3
                  </div>
                  <div className="px-4 py-2 bg-krds-gray-10 rounded">
                    Item 4
                  </div>
                  <div className="px-4 py-2 bg-krds-gray-10 rounded">
                    Item 5
                  </div>
                </WrapComponent>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="간격 조절 (Gap)">
                <Body className="leading-relaxed">
                  gap prop으로 요소 간 간격을 조절합니다:
                </Body>
              </Heading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`// 간격 옵션
<Wrap gap="none"> {/* 0px */}
<Wrap gap="xs">   {/* 8px */}
<Wrap gap="sm">   {/* 12px */}
<Wrap gap="md">   {/* 16px - 기본값 */}
<Wrap gap="lg">   {/* 24px */}
<Wrap gap="xl">   {/* 32px */}
<Wrap gap="2xl">  {/* 40px */}`}
              </Code>

              <Stack gap="md" className="mt-3">
                <Card variant="outlined">
                  <Body className="font-medium mb-2">Small Gap (sm)</Body>
                  <WrapComponent gap="sm">
                    <div className="px-4 py-2 bg-krds-accent-10 rounded">
                      Item 1
                    </div>
                    <div className="px-4 py-2 bg-krds-accent-10 rounded">
                      Item 2
                    </div>
                    <div className="px-4 py-2 bg-krds-accent-10 rounded">
                      Item 3
                    </div>
                  </WrapComponent>
                </Card>

                <Card variant="outlined">
                  <Body className="font-medium mb-2">Large Gap (lg)</Body>
                  <WrapComponent gap="lg">
                    <div className="px-4 py-2 bg-krds-warning-10 rounded">
                      Item 1
                    </div>
                    <div className="px-4 py-2 bg-krds-warning-10 rounded">
                      Item 2
                    </div>
                    <div className="px-4 py-2 bg-krds-warning-10 rounded">
                      Item 3
                    </div>
                  </WrapComponent>
                </Card>
              </Stack>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="정렬 (Align & Justify)">
                <Body className="leading-relaxed">
                  align과 justify로 요소를 정렬합니다:
                </Body>
              </Heading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`// 가운데 정렬
<Wrap gap="md" justify="center" align="center">
  <div>Item 1</div>
  <div>Item 2</div>
</Wrap>

// 균등 분배
<Wrap gap="md" justify="between">
  <div>Start</div>
  <div>Middle</div>
  <div>End</div>
</Wrap>`}
              </Code>

              <Stack gap="md" className="mt-3">
                <Card variant="outlined">
                  <Body className="font-medium mb-2">Center Align</Body>
                  <WrapComponent gap="md" justify="center" align="center">
                    <div className="px-4 py-2 bg-krds-primary-10 text-krds-primary-base rounded">
                      Center 1
                    </div>
                    <div className="px-4 py-2 bg-krds-primary-10 text-krds-primary-base rounded">
                      Center 2
                    </div>
                    <div className="px-4 py-2 bg-krds-primary-10 text-krds-primary-base rounded">
                      Center 3
                    </div>
                  </WrapComponent>
                </Card>

                <Card variant="outlined">
                  <Body className="font-medium mb-2">Space Between</Body>
                  <WrapComponent gap="md" justify="between">
                    <div className="px-4 py-2 bg-krds-gray-10 rounded">
                      Start
                    </div>
                    <div className="px-4 py-2 bg-krds-gray-10 rounded">
                      Middle
                    </div>
                    <div className="px-4 py-2 bg-krds-gray-10 rounded">End</div>
                  </WrapComponent>
                </Card>
              </Stack>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="실제 사용 예시">
                <Body className="leading-relaxed">
                  태그 목록과 버튼 그룹 예시입니다:
                </Body>
              </Heading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`// 태그 목록
<Wrap gap="sm">
  {tags.map(tag => (
    <span key={tag} className="px-3 py-1 text-sm bg-krds-primary-10 rounded-full">
      {tag}
    </span>
  ))}
</Wrap>

// 버튼 그룹
<Wrap gap="md">
  <Button variant="primary">저장</Button>
  <Button variant="secondary">취소</Button>
  <Button variant="outline">삭제</Button>
</Wrap>`}
              </Code>

              <Stack gap="md" className="mt-3">
                <Card variant="outlined">
                  <Body className="font-medium mb-2">태그 목록</Body>
                  <WrapComponent gap="sm">
                    {['React', 'TypeScript', 'Tailwind', 'Next.js'].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-sm bg-krds-primary-10 text-krds-primary-base rounded-full"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </WrapComponent>
                </Card>

                <Card variant="outlined">
                  <Body className="font-medium mb-2">버튼 그룹</Body>
                  <WrapComponent gap="md">
                    <Button variant="primary">저장</Button>
                    <Button variant="secondary">취소</Button>
                    <Button variant="outline">삭제</Button>
                  </WrapComponent>
                </Card>
              </Stack>
            </Subsection>
          </Section>

          {/* Best Practices */}
          <Section>
            <Heading level="h2" id="best-practices" title="Best Practices" />

            <Subsection level="h3">
              <Heading level="h3" title="언제 사용하나요?" />
              <DoCard title="Wrap을 사용하기 적합한 경우">
                <List variant="check">
                  <ListItem>태그나 배지 목록을 표시할 때</ListItem>
                  <ListItem>버튼 그룹을 반응형으로 배치할 때</ListItem>
                  <ListItem>
                    카드나 아이템을 그리드처럼 배치하되 자동 줄바꿈이 필요할 때
                  </ListItem>
                  <ListItem>
                    화면 크기에 따라 유연하게 배치되어야 하는 요소들
                  </ListItem>
                </List>
              </DoCard>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="언제 사용하지 말아야 하나요?" />
              <DontCard title="Wrap 사용을 피해야 하는 경우">
                <List variant="dash">
                  <ListItem>
                    고정된 그리드 레이아웃이 필요할 때 (<Code>SimpleGrid</Code>{' '}
                    사용)
                  </ListItem>
                  <ListItem>
                    항상 한 줄로 표시되어야 할 때 (<Code>Stack</Code> 또는{' '}
                    <Code>HStack</Code> 사용)
                  </ListItem>
                  <ListItem>
                    복잡한 2차원 레이아웃이 필요할 때 (CSS Grid 직접 사용)
                  </ListItem>
                </List>
              </DontCard>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="사용 가이드라인" />
              <List>
                <ListItem>
                  간격은 콘텐츠의 밀도에 따라 sm, md, lg 중 선택하세요
                </ListItem>
                <ListItem>
                  태그나 배지 같은 작은 요소는 sm, 버튼이나 카드는 md 이상 권장
                </ListItem>
                <ListItem>
                  justify와 align을 활용하여 적절한 정렬을 구현하세요
                </ListItem>
              </List>
            </Subsection>
          </Section>

          {/* Accessibility */}
          <Section>
            <Heading level="h2" id="accessibility" title="접근성" />

            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>시맨틱 마크업:</strong> 의미론적으로 중립적인{' '}
                  <Code>&lt;div&gt;</Code> 요소 사용
                </ListItem>
                <ListItem>
                  <strong>반응형 레이아웃:</strong> 화면 크기에 관계없이 모든
                  아이템이 접근 가능
                </ListItem>
                <ListItem>
                  <strong>키보드 네비게이션:</strong> 내부 요소들의 Tab 순서가
                  자연스럽게 유지
                </ListItem>
              </List>
            </Card>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section>
            <Heading level="h2" id="api" title="API Reference" />

            <Subsection level="h3">
              <Heading level="h3" title="Wrap Props" />

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
                      WrapGap | number
                    </TableCell>
                    <TableCell className="font-mono">&apos;md&apos;</TableCell>
                    <TableCell>요소 간 간격</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">align</TableCell>
                    <TableCell className="font-mono">
                      &apos;start&apos; | &apos;center&apos; | &apos;end&apos; |
                      &apos;stretch&apos; | &apos;baseline&apos;
                    </TableCell>
                    <TableCell className="font-mono">
                      &apos;start&apos;
                    </TableCell>
                    <TableCell>교차축 정렬</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">justify</TableCell>
                    <TableCell className="font-mono">
                      &apos;start&apos; | &apos;center&apos; | &apos;end&apos; |
                      &apos;between&apos; | &apos;around&apos; |
                      &apos;evenly&apos;
                    </TableCell>
                    <TableCell className="font-mono">
                      &apos;start&apos;
                    </TableCell>
                    <TableCell>주축 정렬</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">className</TableCell>
                    <TableCell className="font-mono">string</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Gap Options" />

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
                    <TableCell>작은 간격 (태그, 배지)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">md</TableCell>
                    <TableCell>16px</TableCell>
                    <TableCell>중간 간격 (기본값)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">lg</TableCell>
                    <TableCell>24px</TableCell>
                    <TableCell>큰 간격 (버튼, 카드)</TableCell>
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
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Typography', href: '/components/typography' }}
      />
    </>
  );
}
