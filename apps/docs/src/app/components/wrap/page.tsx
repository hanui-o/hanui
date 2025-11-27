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

// Docs helper components
import { DoCard, DontCard } from '@/components/helpers';

// UI components - from @hanui/react
import {
  Body,
  Stack,
  Wrap,
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
          <Section level="h2">
            <Installation
              packageName="wrap"
              description="CLI를 사용하여 컴포넌트를 프로젝트에 설치할 수 있습니다."
            />
          </Section>

          {/* What is it */}
          <Section level="h2">
            <Heading
              level="h2"
              id="what-is-it"
              title="Wrap이란?"
              description="Wrap은 요소들에 간격을 추가하고 공간이 부족할 때 자동으로 줄바꿈하는 레이아웃 컴포넌트입니다."
            />

            <ComponentPreview variant="muted">
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
            </ComponentPreview>
          </Section>

          {/* Preview */}
          <Section level="h2">
            <Heading level="h2" id="preview" title="미리보기" />
            <ComponentPreview>
              <Wrap gap="md">
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
              </Wrap>
            </ComponentPreview>
          </Section>

          {/* Usage */}
          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />

            <Code variant="block" language="tsx">
              {`import { Wrap } from '@hanui/react';

<Wrap gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Wrap>`}
            </Code>
          </Section>

          {/* Examples */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading
                level="h3"
                title="기본 사용"
                description="Wrap 컴포넌트는 자식 요소들을 자동으로 줄바꿈합니다."
              />
              <ComponentPreview>
                <Wrap gap="md">
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
                </Wrap>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Wrap gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Wrap>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="간격 조절 (Gap)"
                description="gap prop으로 요소 간 간격을 조절합니다."
              />

              <Stack gap="md">
                <div>
                  <Body className="font-medium mb-2">작은 간격 (sm - 8px)</Body>
                  <ComponentPreview>
                    <Wrap gap="sm">
                      <div className="px-4 py-2 bg-krds-accent-10 rounded">
                        Item 1
                      </div>
                      <div className="px-4 py-2 bg-krds-accent-10 rounded">
                        Item 2
                      </div>
                      <div className="px-4 py-2 bg-krds-accent-10 rounded">
                        Item 3
                      </div>
                    </Wrap>
                  </ComponentPreview>
                </div>

                <div>
                  <Body className="font-medium mb-2">큰 간격 (lg - 24px)</Body>
                  <ComponentPreview>
                    <Wrap gap="lg">
                      <div className="px-4 py-2 bg-krds-warning-10 rounded">
                        Item 1
                      </div>
                      <div className="px-4 py-2 bg-krds-warning-10 rounded">
                        Item 2
                      </div>
                      <div className="px-4 py-2 bg-krds-warning-10 rounded">
                        Item 3
                      </div>
                    </Wrap>
                  </ComponentPreview>
                </div>
              </Stack>
              <Code variant="block" language="tsx">
                {`<Wrap gap="sm">...</Wrap>  {/* 8px */}
<Wrap gap="md">...</Wrap>  {/* 16px - 기본값 */}
<Wrap gap="lg">...</Wrap>  {/* 24px */}`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="정렬 (Align & Justify)"
                description="align과 justify로 요소를 정렬합니다."
              />

              <Stack gap="md">
                <div>
                  <Body className="font-medium mb-2">가운데 정렬</Body>
                  <ComponentPreview>
                    <Wrap gap="md" justify="center" align="center">
                      <div className="px-4 py-2 bg-krds-primary-10 text-krds-primary-base rounded">
                        Center 1
                      </div>
                      <div className="px-4 py-2 bg-krds-primary-10 text-krds-primary-base rounded">
                        Center 2
                      </div>
                      <div className="px-4 py-2 bg-krds-primary-10 text-krds-primary-base rounded">
                        Center 3
                      </div>
                    </Wrap>
                  </ComponentPreview>
                </div>

                <div>
                  <Body className="font-medium mb-2">균등 분배</Body>
                  <ComponentPreview>
                    <Wrap gap="md" justify="between">
                      <div className="px-4 py-2 bg-krds-gray-10 rounded">
                        Start
                      </div>
                      <div className="px-4 py-2 bg-krds-gray-10 rounded">
                        Middle
                      </div>
                      <div className="px-4 py-2 bg-krds-gray-10 rounded">
                        End
                      </div>
                    </Wrap>
                  </ComponentPreview>
                </div>
              </Stack>
              <Code variant="block" language="tsx">
                {`// 가운데 정렬
<Wrap gap="md" justify="center" align="center">
  <div>Center 1</div>
  <div>Center 2</div>
</Wrap>

// 균등 분배
<Wrap gap="md" justify="between">
  <div>Start</div>
  <div>End</div>
</Wrap>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="실제 사용 예시"
                description="태그 목록과 버튼 그룹 예시입니다."
              />

              <Stack gap="md">
                <div>
                  <Body className="font-medium mb-2">태그 목록</Body>
                  <ComponentPreview>
                    <Wrap gap="sm">
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
                    </Wrap>
                  </ComponentPreview>
                </div>

                <div>
                  <Body className="font-medium mb-2">버튼 그룹</Body>
                  <ComponentPreview>
                    <Wrap gap="md">
                      <Button variant="primary">저장</Button>
                      <Button variant="secondary">취소</Button>
                      <Button variant="outline">삭제</Button>
                    </Wrap>
                  </ComponentPreview>
                </div>
              </Stack>
              <Code variant="block" language="tsx">
                {`// 태그 목록
<Wrap gap="sm">
  {tags.map(tag => (
    <span key={tag} className="px-3 py-1 text-sm rounded-full">
      {tag}
    </span>
  ))}
</Wrap>

// 버튼 그룹
<Wrap gap="md">
  <Button variant="primary">저장</Button>
  <Button variant="secondary">취소</Button>
</Wrap>`}
              </Code>
            </Subsection>
          </Section>

          {/* Best Practices */}
          <Section level="h2">
            <Heading level="h2" id="best-practices" title="사용 가이드" />

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
                    항상 한 줄로 표시되어야 할 때 (<Code>Stack</Code> 사용)
                  </ListItem>
                  <ListItem>
                    복잡한 2차원 레이아웃이 필요할 때 (CSS Grid 직접 사용)
                  </ListItem>
                </List>
              </DontCard>
            </Subsection>
          </Section>

          {/* Accessibility */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="Wrap 컴포넌트는 WCAG 2.1 / KWCAG 2.2 기준을 준수합니다."
            />

            <List variant="check">
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
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API Reference" />

            <Subsection level="h3">
              <Heading level="h3" title="Wrap Props" />

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
                      <Code>gap</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        &apos;none&apos; | &apos;xs&apos; | &apos;sm&apos; |
                        &apos;md&apos; | &apos;lg&apos; | &apos;xl&apos; |
                        &apos;2xl&apos;
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">&apos;md&apos;</Code>
                    </TableCell>
                    <TableCell>아이템 간 간격</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>align</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        &apos;start&apos; | &apos;center&apos; | &apos;end&apos;
                        | &apos;stretch&apos; | &apos;baseline&apos;
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">&apos;start&apos;</Code>
                    </TableCell>
                    <TableCell>교차축 정렬</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>justify</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        &apos;start&apos; | &apos;center&apos; | &apos;end&apos;
                        | &apos;between&apos; | &apos;around&apos; |
                        &apos;evenly&apos;
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">&apos;start&apos;</Code>
                    </TableCell>
                    <TableCell>주축 정렬</TableCell>
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
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Gap 옵션" />

              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>값</TableHead>
                    <TableHead>간격</TableHead>
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
                    <TableCell>4px</TableCell>
                    <TableCell>
                      <Code>gap-1</Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>sm</Code>
                    </TableCell>
                    <TableCell>8px</TableCell>
                    <TableCell>
                      <Code>gap-2</Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>md</Code>
                    </TableCell>
                    <TableCell>16px</TableCell>
                    <TableCell>
                      <Code>gap-4</Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>lg</Code>
                    </TableCell>
                    <TableCell>24px</TableCell>
                    <TableCell>
                      <Code>gap-6</Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>xl</Code>
                    </TableCell>
                    <TableCell>32px</TableCell>
                    <TableCell>
                      <Code>gap-8</Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>2xl</Code>
                    </TableCell>
                    <TableCell>48px</TableCell>
                    <TableCell>
                      <Code>gap-12</Code>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Tooltip', href: '/components/tooltip' }}
      />
    </>
  );
}
