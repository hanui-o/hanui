'use client';

import {
  Tabs as TabsComponent,
  TabsList,
  TabsTrigger,
  TabsContent,
  Section,
  SectionHeading,
  Subsection,
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
  PageNavigation,
  DoCard,
  DontCard,
} from '@/components/hanui';

export default function TabsPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Tabs"
        description="여러 콘텐츠 영역을 효율적으로 구성하고 전환할 수 있는 탭 네비게이션 컴포넌트입니다."
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
                다음 명령어로 Tabs 컴포넌트를 설치합니다:
              </Body>
            </SectionHeading>

            <Code variant="block" language="bash" showLineNumbers={false}>
              npx @hanui/cli add tabs
            </Code>
          </Section>

          {/* What is it */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="what-is-it"
              title="무엇인가요?"
              description="Tabs는 관련된 콘텐츠를 여러 패널로 나누어 공간을 효율적으로 활용하는 네비게이션 컴포넌트입니다."
            />

            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>ARIA 자동화:</strong> role, aria-selected,
                  aria-controls 등이 자동으로 적용됩니다.
                </ListItem>
                <ListItem>
                  <strong>키보드 네비게이션:</strong> Arrow 키, Home, End 키로
                  탭 간 이동이 가능합니다.
                </ListItem>
                <ListItem>
                  <strong>2가지 variant:</strong> default (밑줄), pills (배경색)
                  스타일을 제공합니다.
                </ListItem>
                <ListItem>
                  <strong>제어/비제어 모드:</strong> defaultValue 또는
                  value/onValueChange로 사용할 수 있습니다.
                </ListItem>
                <ListItem>
                  <strong>KRDS 준수:</strong> 색상만으로 선택 상태를 구별하지
                  않습니다.
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* Preview */}
          <Section level="h2">
            <SectionHeading level="h2" id="preview" title="미리보기" />

            <Card variant="outlined">
              <TabsComponent defaultValue="tab1">
                <TabsList>
                  <TabsTrigger value="tab1">Overview</TabsTrigger>
                  <TabsTrigger value="tab2">Details</TabsTrigger>
                  <TabsTrigger value="tab3">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                  <Card>
                    <div className="p-6">
                      <Body className="font-semibold mb-2">
                        Overview Content
                      </Body>
                      <Body className="text-krds-gray-70">
                        이것은 Overview 탭의 콘텐츠입니다.
                      </Body>
                    </div>
                  </Card>
                </TabsContent>
                <TabsContent value="tab2">
                  <Card>
                    <div className="p-6">
                      <Body className="font-semibold mb-2">
                        Details Content
                      </Body>
                      <Body className="text-krds-gray-70">
                        이것은 Details 탭의 콘텐츠입니다.
                      </Body>
                    </div>
                  </Card>
                </TabsContent>
                <TabsContent value="tab3">
                  <Card>
                    <div className="p-6">
                      <Body className="font-semibold mb-2">
                        Settings Content
                      </Body>
                      <Body className="text-krds-gray-70">
                        이것은 Settings 탭의 콘텐츠입니다.
                      </Body>
                    </div>
                  </Card>
                </TabsContent>
              </TabsComponent>
            </Card>

            <Code variant="block" language="tsx" showLineNumbers={false}>
              {`import { Tabs, TabsList, TabsTrigger, TabsContent } from '@hanui/react';

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>`}
            </Code>
          </Section>

          {/* Usage */}
          <Section level="h2">
            <SectionHeading level="h2" id="usage" title="사용법" />

            <Subsection level="h3">
              <SectionHeading level="h3" title="Pills Variant">
                <Body className="leading-relaxed">
                  Pills 스타일은 둥근 배경으로 선택된 탭을 강조합니다:
                </Body>
              </SectionHeading>

              <Card variant="outlined">
                <TabsComponent defaultValue="account" variant="pills">
                  <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                    <TabsTrigger value="notifications">
                      Notifications
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="account">
                    <Body>Account settings content...</Body>
                  </TabsContent>
                  <TabsContent value="password">
                    <Body>Password settings content...</Body>
                  </TabsContent>
                  <TabsContent value="notifications">
                    <Body>Notification settings content...</Body>
                  </TabsContent>
                </TabsComponent>
              </Card>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Tabs defaultValue="account" variant="pills">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="notifications">Notifications</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings...</TabsContent>
  <TabsContent value="password">Password settings...</TabsContent>
  <TabsContent value="notifications">Notification settings...</TabsContent>
</Tabs>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="비활성화된 탭">
                <Body className="leading-relaxed">
                  disabled prop으로 특정 탭을 비활성화할 수 있습니다:
                </Body>
              </SectionHeading>

              <Card variant="outlined">
                <TabsComponent defaultValue="general">
                  <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    <TabsTrigger value="admin" disabled>
                      Admin (Disabled)
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="general">
                    <Body>General settings...</Body>
                  </TabsContent>
                  <TabsContent value="advanced">
                    <Body>Advanced settings...</Body>
                  </TabsContent>
                  <TabsContent value="admin">
                    <Body>Admin settings...</Body>
                  </TabsContent>
                </TabsComponent>
              </Card>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Tabs defaultValue="general">
  <TabsList>
    <TabsTrigger value="general">General</TabsTrigger>
    <TabsTrigger value="advanced">Advanced</TabsTrigger>
    <TabsTrigger value="admin" disabled>Admin (Disabled)</TabsTrigger>
  </TabsList>
  <TabsContent value="general">General settings...</TabsContent>
  <TabsContent value="advanced">Advanced settings...</TabsContent>
  <TabsContent value="admin">Admin settings...</TabsContent>
</Tabs>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Controlled Mode">
                <Body className="leading-relaxed">
                  value와 onValueChange props로 탭 상태를 외부에서 제어할 수
                  있습니다:
                </Body>
              </SectionHeading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`const [activeTab, setActiveTab] = useState('home');

<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="home">Home</TabsTrigger>
    <TabsTrigger value="profile">Profile</TabsTrigger>
    <TabsTrigger value="messages">Messages</TabsTrigger>
  </TabsList>
  <TabsContent value="home">Home content</TabsContent>
  <TabsContent value="profile">Profile content</TabsContent>
  <TabsContent value="messages">Messages content</TabsContent>
</Tabs>`}
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

            <Stack gap="content">
              <DoCard
                title="관련 콘텐츠 그룹화"
                description="여러 관련된 콘텐츠를 하나의 영역에 구성할 때, 공간을 절약하면서 많은 정보를 제공할 때 사용하세요."
              />

              <DoCard
                title="탭은 5개 이하로 유지"
                description="너무 많은 탭은 사용자 경험을 해칩니다. 5개 이하로 유지하고, 그 이상은 다른 UI 패턴을 고려하세요."
              />

              <DoCard
                title="명확한 탭 레이블"
                description="탭 레이블은 짧고 명확하게 작성하여 사용자가 각 탭의 내용을 쉽게 예상할 수 있도록 하세요."
              />

              <DontCard
                title="순차적 프로세스에 사용하지 않기"
                description="단계별로 진행해야 하는 작업(회원가입, 결제 등)은 Stepper 컴포넌트를 사용하세요."
              />

              <DontCard
                title="중요한 콘텐츠 숨기지 않기"
                description="사용자가 반드시 봐야 하는 정보는 탭에 숨기지 말고 본문에 직접 표시하세요."
              />
            </Stack>
          </Section>

          {/* Accessibility */}
          <Section level="h2">
            <SectionHeading level="h2" id="accessibility" title="접근성" />

            <Card variant="info">
              <List variant="check">
                <ListItem>
                  <strong>ARIA 자동화:</strong> role="tablist", role="tab",
                  role="tabpanel"이 자동으로 적용됩니다.
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
            </Card>

            <Subsection level="h3">
              <SectionHeading level="h3" title="키보드 단축키" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>키</TableHead>
                    <TableHead>동작</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">Tab</TableCell>
                    <TableCell>탭 리스트로 포커스 진입</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">Enter</TableCell>
                    <TableCell>포커스된 탭 선택 및 패널 전환</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">Arrow Left</TableCell>
                    <TableCell>이전 탭으로 포커스 이동 (순환)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">Arrow Right</TableCell>
                    <TableCell>다음 탭으로 포커스 이동 (순환)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">Home</TableCell>
                    <TableCell>첫 번째 탭으로 포커스 이동</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">End</TableCell>
                    <TableCell>마지막 탭으로 포커스 이동</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="api-reference"
              title="API Reference"
            />

            <Subsection level="h3">
              <SectionHeading level="h3" title="Tabs Props" />

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
                    <TableCell className="font-mono">defaultValue</TableCell>
                    <TableCell className="text-krds-gray-70">string</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>초기 활성 탭 (비제어 모드)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">value</TableCell>
                    <TableCell className="text-krds-gray-70">string</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>활성 탭 (제어 모드)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">onValueChange</TableCell>
                    <TableCell className="text-krds-gray-70">
                      (value: string) =&gt; void
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>탭 변경 시 호출되는 콜백</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">variant</TableCell>
                    <TableCell className="text-krds-gray-70">
                      &apos;default&apos; | &apos;pills&apos;
                    </TableCell>
                    <TableCell className="font-mono">
                      &apos;default&apos;
                    </TableCell>
                    <TableCell>탭 스타일 변형</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="TabsTrigger Props" />

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
                    <TableCell className="font-mono">value</TableCell>
                    <TableCell className="text-krds-gray-70">string</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>탭 식별자 (필수)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">disabled</TableCell>
                    <TableCell className="text-krds-gray-70">boolean</TableCell>
                    <TableCell className="font-mono">false</TableCell>
                    <TableCell>탭 비활성화 여부</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="TabsContent Props" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">value</TableCell>
                    <TableCell className="text-krds-gray-70">string</TableCell>
                    <TableCell>연결된 탭 식별자 (필수)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Variant 옵션" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Variant</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">default</TableCell>
                    <TableCell>밑줄로 선택된 탭 표시 (기본값)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">pills</TableCell>
                    <TableCell>둥근 배경색으로 선택된 탭 강조</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Table', href: '/layout/table' }}
        next={{ title: 'Wrap', href: '/layout/wrap' }}
      />
    </>
  );
}
