'use client';

import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';
import { ComponentPreview } from '@/components/content/ComponentPreview';

import { DoCard, DontCard } from '@/components/helpers';

import {
  Tabs as TabsComponent,
  TabsList,
  TabsTrigger,
  TabsContent,
  Body,
  Stack,
  Card,
  Code,
  List,
  ListItem,
  Tabs,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@hanui/react';

export default function TabsPage() {
  return (
    <>
      <Heading
        level="h1"
        id="tabs"
        title="Tabs"
        description="여러 콘텐츠 영역을 효율적으로 구성하고 전환할 수 있는 탭 네비게이션 컴포넌트입니다."
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
            <Body className="mb-3">
              Tabs는 관련된 콘텐츠를 여러 패널로 나누어 공간을 효율적으로
              활용하는 네비게이션 컴포넌트입니다. ARIA 자동화, 키보드
              네비게이션, 포커스 관리를 기본 지원합니다.
            </Body>
            <ComponentPreview>
              <TabsComponent defaultValue="tab1">
                <TabsList>
                  <TabsTrigger value="tab1">개요</TabsTrigger>
                  <TabsTrigger value="tab2">상세</TabsTrigger>
                  <TabsTrigger value="tab3">설정</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                  <Card>
                    <div className="p-6">
                      <Body className="font-semibold mb-2">개요 콘텐츠</Body>
                      <Body className="text-krds-gray-70">
                        이것은 개요 탭의 콘텐츠입니다.
                      </Body>
                    </div>
                  </Card>
                </TabsContent>
                <TabsContent value="tab2">
                  <Card>
                    <div className="p-6">
                      <Body className="font-semibold mb-2">상세 콘텐츠</Body>
                      <Body className="text-krds-gray-70">
                        이것은 상세 탭의 콘텐츠입니다.
                      </Body>
                    </div>
                  </Card>
                </TabsContent>
                <TabsContent value="tab3">
                  <Card>
                    <div className="p-6">
                      <Body className="font-semibold mb-2">설정 콘텐츠</Body>
                      <Body className="text-krds-gray-70">
                        이것은 설정 탭의 콘텐츠입니다.
                      </Body>
                    </div>
                  </Card>
                </TabsContent>
              </TabsComponent>
            </ComponentPreview>
          </Section>

          {/* 설치 */}
          <Section level="h2">
            <Installation componentName="tabs" />
          </Section>

          {/* 사용법 */}
          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/hanui/tabs';

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">탭 1</TabsTrigger>
    <TabsTrigger value="tab2">탭 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">콘텐츠 1</TabsContent>
  <TabsContent value="tab2">콘텐츠 2</TabsContent>
</Tabs>`}
            </Code>
          </Section>

          {/* 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Pills 스타일"
                description="둥근 배경으로 선택된 탭을 강조합니다."
              />
              <ComponentPreview>
                <TabsComponent
                  defaultValue="account"
                  variant="pills"
                  className="w-full max-w-md"
                >
                  <TabsList>
                    <TabsTrigger value="account">계정</TabsTrigger>
                    <TabsTrigger value="password">비밀번호</TabsTrigger>
                    <TabsTrigger value="notifications">알림</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account">
                    <Body>계정 설정 콘텐츠...</Body>
                  </TabsContent>
                  <TabsContent value="password">
                    <Body>비밀번호 설정 콘텐츠...</Body>
                  </TabsContent>
                  <TabsContent value="notifications">
                    <Body>알림 설정 콘텐츠...</Body>
                  </TabsContent>
                </TabsComponent>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Tabs defaultValue="account" variant="pills">
  <TabsList>
    <TabsTrigger value="account">계정</TabsTrigger>
    <TabsTrigger value="password">비밀번호</TabsTrigger>
    <TabsTrigger value="notifications">알림</TabsTrigger>
  </TabsList>
  <TabsContent value="account">계정 설정...</TabsContent>
  <TabsContent value="password">비밀번호 설정...</TabsContent>
  <TabsContent value="notifications">알림 설정...</TabsContent>
</Tabs>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="크기 (Size)"
                description="size prop으로 탭의 크기를 조절합니다."
              />
              <ComponentPreview>
                <Stack gap="lg" className="w-full">
                  <div>
                    <Body className="text-sm text-krds-gray-60 mb-2">
                      Default (56px)
                    </Body>
                    <TabsComponent defaultValue="tab1" className="max-w-md">
                      <TabsList>
                        <TabsTrigger value="tab1">탭 1</TabsTrigger>
                        <TabsTrigger value="tab2">탭 2</TabsTrigger>
                        <TabsTrigger value="tab3">탭 3</TabsTrigger>
                      </TabsList>
                    </TabsComponent>
                  </div>
                  <div>
                    <Body className="text-sm text-krds-gray-60 mb-2">
                      Small (40px)
                    </Body>
                    <TabsComponent
                      defaultValue="tab1"
                      size="sm"
                      className="max-w-md"
                    >
                      <TabsList>
                        <TabsTrigger value="tab1">탭 1</TabsTrigger>
                        <TabsTrigger value="tab2">탭 2</TabsTrigger>
                        <TabsTrigger value="tab3">탭 3</TabsTrigger>
                      </TabsList>
                    </TabsComponent>
                  </div>
                </Stack>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`{/* Default 크기 */}
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">탭 1</TabsTrigger>
    <TabsTrigger value="tab2">탭 2</TabsTrigger>
  </TabsList>
</Tabs>

{/* Small 크기 */}
<Tabs defaultValue="tab1" size="sm">
  <TabsList>
    <TabsTrigger value="tab1">탭 1</TabsTrigger>
    <TabsTrigger value="tab2">탭 2</TabsTrigger>
  </TabsList>
</Tabs>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="제어 모드"
                description="value와 onValueChange props로 탭 상태를 외부에서 제어합니다."
              />
              <Code variant="block" language="tsx">
                {`const [activeTab, setActiveTab] = useState('home');

<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="home">홈</TabsTrigger>
    <TabsTrigger value="profile">프로필</TabsTrigger>
    <TabsTrigger value="messages">메시지</TabsTrigger>
  </TabsList>
  <TabsContent value="home">홈 콘텐츠</TabsContent>
  <TabsContent value="profile">프로필 콘텐츠</TabsContent>
  <TabsContent value="messages">메시지 콘텐츠</TabsContent>
</Tabs>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="스크롤 가능한 탭"
                description="탭이 많아 한 줄에 표시하기 어려운 경우, scrollable prop으로 좌우 스크롤 버튼을 활성화합니다."
              />
              <ComponentPreview>
                <div className="flex flex-col gap-2">
                  <TabsComponent
                    defaultValue="tab5"
                    className="w-full max-w-lg"
                  >
                    <TabsList scrollable>
                      <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                      <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                      <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                      <TabsTrigger value="tab4">Tab 4</TabsTrigger>
                      <TabsTrigger value="tab5">Tab 5</TabsTrigger>
                      <TabsTrigger value="tab6">Tab 6</TabsTrigger>
                      <TabsTrigger value="tab7">Tab 7</TabsTrigger>
                      <TabsTrigger value="tab8">Tab 8</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">
                      <Body>Tab 1 콘텐츠</Body>
                    </TabsContent>
                    <TabsContent value="tab2">
                      <Body>Tab 2 콘텐츠</Body>
                    </TabsContent>
                    <TabsContent value="tab3">
                      <Body>Tab 3 콘텐츠</Body>
                    </TabsContent>
                    <TabsContent value="tab4">
                      <Body>Tab 4 콘텐츠</Body>
                    </TabsContent>
                    <TabsContent value="tab5">
                      <Body>Tab 5 콘텐츠</Body>
                    </TabsContent>
                    <TabsContent value="tab6">
                      <Body>Tab 6 콘텐츠</Body>
                    </TabsContent>
                    <TabsContent value="tab7">
                      <Body>Tab 7 콘텐츠</Body>
                    </TabsContent>
                    <TabsContent value="tab8">
                      <Body>Tab 8 콘텐츠</Body>
                    </TabsContent>
                  </TabsComponent>

                  <TabsComponent
                    defaultValue="tab5"
                    size="sm"
                    className="w-full max-w-lg"
                  >
                    <TabsList scrollable>
                      <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                      <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                      <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                      <TabsTrigger value="tab4">Tab 4</TabsTrigger>
                      <TabsTrigger value="tab5">Tab 5</TabsTrigger>
                      <TabsTrigger value="tab6">Tab 6</TabsTrigger>
                      <TabsTrigger value="tab7">Tab 7</TabsTrigger>
                      <TabsTrigger value="tab8">Tab 8</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">
                      <Body>Tab 1 콘텐츠</Body>
                    </TabsContent>
                    <TabsContent value="tab2">
                      <Body>Tab 2 콘텐츠</Body>
                    </TabsContent>
                    <TabsContent value="tab3">
                      <Body>Tab 3 콘텐츠</Body>
                    </TabsContent>
                    <TabsContent value="tab4">
                      <Body>Tab 4 콘텐츠</Body>
                    </TabsContent>
                    <TabsContent value="tab5">
                      <Body>Tab 5 콘텐츠</Body>
                    </TabsContent>
                    <TabsContent value="tab6">
                      <Body>Tab 6 콘텐츠</Body>
                    </TabsContent>
                    <TabsContent value="tab7">
                      <Body>Tab 7 콘텐츠</Body>
                    </TabsContent>
                    <TabsContent value="tab8">
                      <Body>Tab 8 콘텐츠</Body>
                    </TabsContent>
                  </TabsComponent>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Tabs defaultValue="tab5" size="sm">
  <TabsList scrollable>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
    <TabsTrigger value="tab4">Tab 4</TabsTrigger>
    <TabsTrigger value="tab5">Tab 5</TabsTrigger>
    <TabsTrigger value="tab6">Tab 6</TabsTrigger>
    <TabsTrigger value="tab7">Tab 7</TabsTrigger>
    <TabsTrigger value="tab8">Tab 8</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Tab 1 콘텐츠</TabsContent>
  ...
</Tabs>`}
              </Code>
            </Subsection>
          </Section>

          {/* 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="WCAG 2.1 / KWCAG 2.2 AA 레벨을 준수합니다."
            />
            <List variant="check">
              <ListItem>
                <strong>ARIA 자동화:</strong> role=&quot;tablist&quot;,
                role=&quot;tab&quot;, role=&quot;tabpanel&quot;이 자동으로
                적용됩니다.
              </ListItem>
              <ListItem>
                <strong>선택 상태:</strong> aria-selected, aria-controls,
                aria-labelledby가 자동으로 연결됩니다.
              </ListItem>
              <ListItem>
                <strong>키보드 네비게이션:</strong> Arrow Left/Right로 탭 간
                이동, Home/End로 첫/마지막 탭 이동이 가능합니다.
              </ListItem>
              <ListItem>
                <strong>포커스 가시성:</strong> WCAG 2.1 Focus Visible (AA)
                기준을 충족하는 명확한 포커스 표시를 제공합니다.
              </ListItem>
              <ListItem>
                <strong>색상 독립성:</strong> 선택 상태를 색상만으로 구별하지
                않고 밑줄, 배경 등 시각적 요소를 추가합니다.
              </ListItem>
            </List>

            <Subsection level="h3">
              <Heading level="h3" title="키보드 단축키" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>키</TableHead>
                    <TableHead>동작</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>Tab</Code>
                    </TableCell>
                    <TableCell>탭 리스트로 포커스 진입</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>Enter</Code>
                    </TableCell>
                    <TableCell>포커스된 탭 선택 및 패널 전환</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>←</Code> / <Code>→</Code>
                    </TableCell>
                    <TableCell>이전/다음 탭으로 포커스 이동 (순환)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>Home</Code>
                    </TableCell>
                    <TableCell>첫 번째 탭으로 포커스 이동</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>End</Code>
                    </TableCell>
                    <TableCell>마지막 탭으로 포커스 이동</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API Reference" />

            <Subsection level="h3">
              <Heading level="h3" title="Tabs Props" />
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
                      <Code>defaultValue</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>초기 활성 탭 (비제어 모드)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>value</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>활성 탭 (제어 모드)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>onValueChange</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        (value: string) =&gt; void
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>탭 변경 시 호출되는 콜백</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>variant</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        &apos;default&apos; | &apos;pills&apos;
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">&apos;default&apos;</Code>
                    </TableCell>
                    <TableCell>탭 스타일 변형</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>size</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        &apos;sm&apos; | &apos;default&apos;
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">&apos;default&apos;</Code>
                    </TableCell>
                    <TableCell>탭 크기</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="TabsList Props" />
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
                      <Code>scrollable</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">false</Code>
                    </TableCell>
                    <TableCell>탭이 많을 때 좌우 스크롤 버튼 활성화</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>variant</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        &apos;default&apos; | &apos;pills&apos;
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>탭 리스트 스타일 (Tabs에서 상속)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="TabsTrigger Props" />
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
                      <Code>value</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>탭 식별자 (필수)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>disabled</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">false</Code>
                    </TableCell>
                    <TableCell>탭 비활성화 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>size</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        &apos;sm&apos; | &apos;default&apos;
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>탭 크기 (Tabs에서 상속)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="TabsContent Props" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>속성</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>value</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>연결된 탭 식별자 (필수)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Variant 옵션" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>default</Code>
                    </TableCell>
                    <TableCell>밑줄로 선택된 탭 표시 (기본값)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>pills</Code>
                    </TableCell>
                    <TableCell>둥근 배경색으로 선택된 탭 강조</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Size 옵션" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>값</TableHead>
                    <TableHead>높이</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>default</Code>
                    </TableCell>
                    <TableCell>56px (h-14)</TableCell>
                    <TableCell>기본 크기, 큰 폰트와 넉넉한 패딩</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>sm</Code>
                    </TableCell>
                    <TableCell>40px (h-10)</TableCell>
                    <TableCell>작은 크기, 좁은 공간에 적합</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'DataTable', href: '/components/data-table' }}
        next={{ title: 'Textarea', href: '/components/textarea' }}
      />
    </>
  );
}
