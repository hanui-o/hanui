// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';

// Docs helper components
import { DoCard, DontCard } from '@/components/helpers';

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
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@hanui/react';

export default function ListPage() {
  return (
    <>
      <Heading
        level="h1"
        title="List"
        description="KRDS 준수 리스트 컴포넌트입니다. Unordered와 Ordered 리스트를 지원하며, 다양한 간격 옵션을 제공합니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview">
          {/* Installation */}
          <Section>
            <Heading level="h2" id="installation" title="설치">
              <Body className="leading-relaxed">
                다음 명령어로 List 컴포넌트를 설치합니다:
              </Body>
            </Heading>

            <Code variant="block" language="bash" showLineNumbers={false}>
              npx @hanui/cli add list
            </Code>
          </Section>

          {/* What is it */}
          <Section>
            <Heading
              level="h2"
              id="what-is-it"
              title="무엇인가요?"
              description="List는 항목들을 깔끔하게 나열하기 위한 컴포넌트입니다."
            />

            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>4가지 Variant:</strong> unordered (•), ordered (1, 2,
                  3), dash (−), check (✓) 리스트를 지원합니다.
                </ListItem>
                <ListItem>
                  <strong>2depth 중첩 리스트:</strong> ListItem 안에 List를
                  넣으면 자동으로 2depth 중첩 리스트가 됩니다.
                </ListItem>
                <ListItem>
                  <strong>간격 옵션:</strong> tight, default, loose 3가지 간격을
                  제공합니다.
                </ListItem>
                <ListItem>
                  <strong>KRDS 색상:</strong> KRDS 디자인 시스템의 색상을
                  준수합니다.
                </ListItem>
                <ListItem>
                  <strong>접근성:</strong> 시맨틱 HTML 요소를 사용하여 스크린
                  리더 지원이 완벽합니다.
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* Preview */}
          <Section>
            <Heading level="h2" id="preview" title="미리보기" />
            <Card variant="outlined">
              <List>
                <ListItem>첫 번째 항목</ListItem>
                <ListItem>두 번째 항목</ListItem>
                <ListItem>세 번째 항목</ListItem>
              </List>
            </Card>
          </Section>

          {/* Usage */}
          <Section>
            <Heading level="h2" id="usage" title="사용 방법" />

            <Subsection level="h3">
              <Heading level="h3" title="기본 사용">
                <Body className="leading-relaxed">
                  <Code>List</Code>와 <Code>ListItem</Code>을 조합하여
                  사용합니다:
                </Body>
              </Heading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`import { List, ListItem } from '@/components/hanui';

<List>
  <ListItem>첫 번째 항목</ListItem>
  <ListItem>두 번째 항목</ListItem>
  <ListItem>세 번째 항목</ListItem>
</List>`}
              </Code>

              <Card variant="outlined" className="mt-3">
                <List>
                  <ListItem>첫 번째 항목</ListItem>
                  <ListItem>두 번째 항목</ListItem>
                  <ListItem>세 번째 항목</ListItem>
                </List>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Ordered List">
                <Body className="leading-relaxed">
                  <Code>variant="ordered"</Code>로 번호 리스트를 만들 수
                  있습니다:
                </Body>
              </Heading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<List variant="ordered">
  <ListItem>단계 1</ListItem>
  <ListItem>단계 2</ListItem>
  <ListItem>단계 3</ListItem>
</List>`}
              </Code>

              <Card variant="outlined" className="mt-3">
                <List variant="ordered">
                  <ListItem>단계 1</ListItem>
                  <ListItem>단계 2</ListItem>
                  <ListItem>단계 3</ListItem>
                </List>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Dash List">
                <Body className="leading-relaxed">
                  <Code>variant="dash"</Code>로 대시(−) 리스트를 만들 수
                  있습니다:
                </Body>
              </Heading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<List variant="dash">
  <ListItem>대시 항목 1</ListItem>
  <ListItem>대시 항목 2</ListItem>
  <ListItem>대시 항목 3</ListItem>
</List>`}
              </Code>

              <Card variant="outlined" className="mt-3">
                <List variant="dash">
                  <ListItem>대시 항목 1</ListItem>
                  <ListItem>대시 항목 2</ListItem>
                  <ListItem>대시 항목 3</ListItem>
                </List>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Check List">
                <Body className="leading-relaxed">
                  <Code>variant="check"</Code>로 체크(✓) 리스트를 만들 수
                  있습니다:
                </Body>
              </Heading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<List variant="check">
  <ListItem>완료된 항목 1</ListItem>
  <ListItem>완료된 항목 2</ListItem>
  <ListItem>완료된 항목 3</ListItem>
</List>`}
              </Code>

              <Card variant="outlined" className="mt-3">
                <List variant="check">
                  <ListItem>완료된 항목 1</ListItem>
                  <ListItem>완료된 항목 2</ListItem>
                  <ListItem>완료된 항목 3</ListItem>
                </List>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="2depth 중첩 리스트">
                <Body className="leading-relaxed">
                  <Code>ListItem</Code> 안에 <Code>List</Code>를 넣으면 자동으로
                  2depth 중첩 리스트가 됩니다. <Code>level=&#123;2&#125;</Code>
                  나 <Code>variant="dash"</Code>를 지정하지 않아도 자동으로
                  들여쓰기되고 dash(−) 아이콘을 사용합니다:
                </Body>
              </Heading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<List>
  <ListItem>
    사용자가 한 개의 항목을 선택할 수 있는 경우
    <List>
      <ListItem>라디오 버튼을 사용합니다</ListItem>
    </List>
  </ListItem>
  <ListItem>
    옵션을 선택하지마세요
    <List>
      <ListItem>토글 스위치를 사용합니다</ListItem>
      <ListItem>부분적으로 옵션을 활성화할 수 있습니다</ListItem>
    </List>
  </ListItem>
</List>`}
              </Code>

              <Card variant="outlined" className="mt-3">
                <List>
                  <ListItem>
                    사용자가 한 개의 항목을 선택할 수 있는 경우
                    <List>
                      <ListItem>라디오 버튼을 사용합니다</ListItem>
                    </List>
                  </ListItem>
                  <ListItem>
                    옵션을 선택하지마세요
                    <List>
                      <ListItem>토글 스위치를 사용합니다</ListItem>
                      <ListItem>
                        부분적으로 옵션을 활성화할 수 있습니다
                      </ListItem>
                    </List>
                  </ListItem>
                  <ListItem>
                    여러 개의 항목을 선택할 수 있는 경우
                    <List>
                      <ListItem>체크박스를 사용합니다</ListItem>
                      <ListItem>
                        선택된 항목의 개수를 표시할 수 있습니다
                      </ListItem>
                    </List>
                  </ListItem>
                </List>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Spacing 옵션">
                <Body className="leading-relaxed">
                  <Code>spacing</Code> prop으로 항목 간 간격을 조절할 수
                  있습니다:
                </Body>
              </Heading>

              <Stack gap="md">
                <div>
                  <Body className="font-medium mb-2">Tight (space-y-1)</Body>
                  <Card variant="outlined">
                    <List spacing="tight">
                      <ListItem>항목 1</ListItem>
                      <ListItem>항목 2</ListItem>
                      <ListItem>항목 3</ListItem>
                    </List>
                  </Card>
                </div>

                <div>
                  <Body className="font-medium mb-2">Default (space-y-3)</Body>
                  <Card variant="outlined">
                    <List spacing="default">
                      <ListItem>항목 1</ListItem>
                      <ListItem>항목 2</ListItem>
                      <ListItem>항목 3</ListItem>
                    </List>
                  </Card>
                </div>

                <div>
                  <Body className="font-medium mb-2">Loose (space-y-4)</Body>
                  <Card variant="outlined">
                    <List spacing="loose">
                      <ListItem>항목 1</ListItem>
                      <ListItem>항목 2</ListItem>
                      <ListItem>항목 3</ListItem>
                    </List>
                  </Card>
                </div>
              </Stack>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="커스텀 Indicator">
                <Body className="leading-relaxed">
                  <Code>showIndicator=&#123;false&#125;</Code>로 기본 불릿을
                  숨기고 커스텀 아이콘을 사용할 수 있습니다:
                </Body>
              </Heading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<List>
  <ListItem showIndicator={false}>
    <span className="text-green-600">✓</span>
    <span>완료된 항목</span>
  </ListItem>
  <ListItem showIndicator={false}>
    <span className="text-yellow-600">⚠</span>
    <span>경고 항목</span>
  </ListItem>
</List>`}
              </Code>

              <Card variant="outlined" className="mt-3">
                <List>
                  <ListItem showIndicator={false}>
                    <span className="text-green-600 font-bold">✓</span>
                    <span>완료된 항목</span>
                  </ListItem>
                  <ListItem showIndicator={false}>
                    <span className="text-yellow-600 font-bold">⚠</span>
                    <span>경고 항목</span>
                  </ListItem>
                  <ListItem showIndicator={false}>
                    <span className="text-red-600 font-bold">✗</span>
                    <span>에러 항목</span>
                  </ListItem>
                </List>
              </Card>
            </Subsection>
          </Section>

          {/* Best Practices */}
          <Section>
            <Heading level="h2" id="best-practices" title="Best Practices" />

            <Subsection level="h3">
              <Heading level="h3" title="언제 사용하나요?" />
              <DoCard title="List를 사용하기 적합한 경우">
                <List variant="check">
                  <ListItem>관련된 항목들을 순서대로 나열할 때</ListItem>
                  <ListItem>단계별 절차를 설명할 때 (ordered)</ListItem>
                  <ListItem>체크리스트를 표시할 때 (check)</ListItem>
                  <ListItem>기능이나 특징을 나열할 때</ListItem>
                  <ListItem>
                    계층 구조가 있는 정보를 표시할 때 (2depth)
                  </ListItem>
                </List>
              </DoCard>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="언제 사용하지 말아야 하나요?" />
              <DontCard title="List 사용을 피해야 하는 경우">
                <List variant="dash">
                  <ListItem>
                    표 형태의 데이터를 표시할 때 (<Code>Table</Code> 컴포넌트
                    사용)
                  </ListItem>
                  <ListItem>
                    복잡한 데이터 구조를 표시할 때 (<Code>StructuredList</Code>{' '}
                    컴포넌트 사용)
                  </ListItem>
                  <ListItem>
                    3depth 이상의 깊은 중첩이 필요할 때 (다른 구조 고려)
                  </ListItem>
                </List>
              </DontCard>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="사용 가이드라인" />
              <List>
                <ListItem>
                  순서가 중요한 경우 <Code>variant="ordered"</Code>를
                  사용하세요.
                </ListItem>
                <ListItem>
                  완료/체크 상태를 나타낼 때는 <Code>variant="check"</Code>를
                  사용하세요.
                </ListItem>
                <ListItem>
                  항목 간 간격은 콘텐츠의 밀도에 따라 적절히 조절하세요.
                </ListItem>
                <ListItem>
                  2depth 중첩 리스트는 자동으로 dash 아이콘을 사용하므로 별도
                  지정이 불필요합니다.
                </ListItem>
              </List>
            </Subsection>
          </Section>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
          <Section>
            <Heading level="h2" id="api" title="API Reference" />

            <Subsection level="h3">
              <Heading level="h3" title="List Props" />

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
                    <TableCell className="font-mono">variant</TableCell>
                    <TableCell className="font-mono">
                      &apos;unordered&apos; | &apos;ordered&apos; |
                      &apos;dash&apos; | &apos;check&apos;
                    </TableCell>
                    <TableCell className="font-mono">
                      &apos;unordered&apos;
                    </TableCell>
                    <TableCell>리스트 타입</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">spacing</TableCell>
                    <TableCell className="font-mono">
                      &apos;tight&apos; | &apos;default&apos; |
                      &apos;loose&apos;
                    </TableCell>
                    <TableCell className="font-mono">
                      &apos;default&apos;
                    </TableCell>
                    <TableCell>항목 간 간격</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">level</TableCell>
                    <TableCell className="font-mono">1 | 2</TableCell>
                    <TableCell className="font-mono">
                      1 (ListItem 안에서는 자동으로 2)
                    </TableCell>
                    <TableCell>
                      리스트 중첩 깊이 (ListItem 안에 넣으면 자동으로 2depth
                      적용)
                    </TableCell>
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
                    <TableCell>자식 요소 (ListItem)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="ListItem Props" />

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
                    <TableCell className="font-mono">showIndicator</TableCell>
                    <TableCell className="font-mono">boolean</TableCell>
                    <TableCell className="font-mono">true</TableCell>
                    <TableCell>불릿/번호 표시 여부</TableCell>
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
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Link', href: '/components/link' }}
        next={{ title: 'Main Menu', href: '/components/mainmenu' }}
      />
    </>
  );
}
