'use client';

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Stack,
  Heading,
  Body,
  Card,
  CardBody,
  SkipLink,
} from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';
import { Installation } from '@/components/content/Installation';
import { GuidelineSection } from '@/components/content/GuidelineSection';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

export default function TabsPage() {
  return (
    <>
      {/* Skip Link */}
      <SkipLink links={[{ href: '#tabs-content', label: '본문 바로가기' }]} />

      {/* Page Header */}
      <PageHeader
        title="Tabs"
        description="여러 콘텐츠 영역을 효율적으로 구성하고 전환할 수 있는 탭 네비게이션 컴포넌트입니다."
      />

      {/* Preview */}
      <PageSection>
        <ComponentPreview>
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">Overview</TabsTrigger>
              <TabsTrigger value="tab2">Details</TabsTrigger>
              <TabsTrigger value="tab3">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <Card>
                <CardBody>
                  <Heading level="h3">Overview Content</Heading>
                  <Body>이것은 Overview 탭의 콘텐츠입니다.</Body>
                </CardBody>
              </Card>
            </TabsContent>
            <TabsContent value="tab2">
              <Card>
                <CardBody>
                  <Heading level="h3">Details Content</Heading>
                  <Body>이것은 Details 탭의 콘텐츠입니다.</Body>
                </CardBody>
              </Card>
            </TabsContent>
            <TabsContent value="tab3">
              <Card>
                <CardBody>
                  <Heading level="h3">Settings Content</Heading>
                  <Body>이것은 Settings 탭의 콘텐츠입니다.</Body>
                </CardBody>
              </Card>
            </TabsContent>
          </Tabs>
        </ComponentPreview>
      </PageSection>

      {/* Overview */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="tabs-content">
            개요
          </Heading>
          <Body className="leading-relaxed">
            탭은 관련된 콘텐츠를 여러 패널로 나누어 공간을 효율적으로 활용하는
            네비게이션 컴포넌트입니다. HANUI Tabs는{' '}
            <strong>KRDS 접근성 지침</strong>을 완벽하게 준수하며, Foundation
            Layer의 자동화된 ARIA 속성 및 키보드 네비게이션을 제공합니다.
          </Body>
        </Stack>
      </PageSection>

      {/* Usage Guidelines */}
      <PageSection>
        <Heading level="h2" id="guidelines">
          사용 가이드라인
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* When to use */}
          <Stack spacing="heading-tight">
            <Heading level="h3">언제 사용해야 하나요?</Heading>

            <div className="grid grid-cols-1 gap-4">
              <GuidelineSection type="do" title="탭을 사용하기 적합한 경우">
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>관련 콘텐츠 그룹화</strong> - 여러 관련된 콘텐츠를
                    하나의 영역에 구성할 때
                  </li>
                  <li>
                    <strong>공간 절약</strong> - 제한된 공간에서 많은 정보를
                    제공해야 할 때
                  </li>
                  <li>
                    <strong>순차적이지 않은 콘텐츠</strong> - 사용자가 원하는
                    순서로 콘텐츠를 탐색할 수 있을 때
                  </li>
                  <li>
                    <strong>설정 화면</strong> - 여러 설정 카테고리를 구분할 때
                  </li>
                </ul>
              </GuidelineSection>

              <GuidelineSection
                type="dont"
                title="탭을 사용하지 말아야 하는 경우"
              >
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>순차적 프로세스</strong> - 단계별로 진행해야 하는
                    작업은 Stepper 사용
                  </li>
                  <li>
                    <strong>비교가 필요한 콘텐츠</strong> - 여러 섹션을 동시에
                    봐야 하는 경우
                  </li>
                  <li>
                    <strong>탭이 너무 많을 때</strong> - 5개 이상의 탭은 다른 UI
                    패턴 고려
                  </li>
                  <li>
                    <strong>중요한 콘텐츠 숨김</strong> - 사용자가 반드시 봐야
                    하는 정보는 본문에 직접 표시
                  </li>
                </ul>
              </GuidelineSection>
            </div>
          </Stack>

          {/* Accessibility */}
          <Stack spacing="heading-tight">
            <Heading level="h3">접근성</Heading>
            <Body>HANUI Tabs는 KRDS 접근성 가이드라인을 준수합니다:</Body>

            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>색상 독립성</strong> - 선택 상태를 색상만으로 구별하지
                않고 밑줄, 배경 등 시각적 요소 추가
              </li>
              <li>
                <strong>키보드 네비게이션</strong> - Tab/Shift+Tab으로 탭 간
                이동, Enter로 선택, Arrow 키로 탭 순회
              </li>
              <li>
                <strong>포커스 가시성</strong> - WCAG 2.1 Focus Visible (AA)
                기준을 충족하는 명확한 포커스 표시
              </li>
              <li>
                <strong>스크린 리더 지원</strong> - role="tablist", role="tab",
                role="tabpanel" 자동 적용
              </li>
              <li>
                <strong>ARIA 자동화</strong> - aria-selected, aria-controls,
                aria-labelledby 자동 연결
              </li>
            </ul>
          </Stack>

          {/* Keyboard Navigation */}
          <Stack spacing="heading-tight">
            <Heading level="h3">키보드 네비게이션</Heading>
            <Body>KRDS에서 정의한 탭 키보드 상호작용:</Body>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 dark:border-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-4 py-2 text-left border-b border-gray-200 dark:border-gray-800">
                      키
                    </th>
                    <th className="px-4 py-2 text-left border-b border-gray-200 dark:border-gray-800">
                      동작
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono">
                      Tab
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                      탭 리스트로 포커스 진입
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono">
                      Enter
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                      포커스된 탭 선택 및 패널 전환
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono">
                      Arrow Left
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                      이전 탭으로 포커스 이동 (순환)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono">
                      Arrow Right
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                      다음 탭으로 포커스 이동 (순환)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono">
                      Home
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                      첫 번째 탭으로 포커스 이동
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono">
                      End
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                      마지막 탭으로 포커스 이동
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Stack>
        </Stack>
      </PageSection>

      {/* Installation */}
      <PageSection>
        <Installation componentName="tabs" />
      </PageSection>

      {/* Usage */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="usage">
            사용법
          </Heading>
          <CodeBlock
            code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from '@hanui/react'

export default function MyComponent() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content 1</TabsContent>
      <TabsContent value="tab2">Content 2</TabsContent>
    </Tabs>
  )
}`}
          />
        </Stack>
      </PageSection>

      {/* Examples */}
      <PageSection>
        <Heading level="h2" id="examples">
          예제
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* Default */}
          <Stack spacing="heading-tight">
            <Heading level="h3">기본 (밑줄)</Heading>
            <Body>기본 스타일은 밑줄로 선택된 탭을 표시합니다.</Body>
            <div>
              <ComponentPreview>
                <Tabs defaultValue="overview">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <Body>Overview content here...</Body>
                  </TabsContent>
                  <TabsContent value="analytics">
                    <Body>Analytics content here...</Body>
                  </TabsContent>
                  <TabsContent value="reports">
                    <Body>Reports content here...</Body>
                  </TabsContent>
                </Tabs>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="reports">Reports</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    Overview content here...
  </TabsContent>
  <TabsContent value="analytics">
    Analytics content here...
  </TabsContent>
  <TabsContent value="reports">
    Reports content here...
  </TabsContent>
</Tabs>`}
                />
              </div>
            </div>
          </Stack>

          {/* Pills Variant */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Pills Variant</Heading>
            <Body>Pills 스타일은 둥근 배경으로 선택된 탭을 강조합니다.</Body>
            <div>
              <ComponentPreview>
                <Tabs defaultValue="account" variant="pills">
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
                </Tabs>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Tabs defaultValue="account" variant="pills">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="notifications">Notifications</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    Account settings content...
  </TabsContent>
  <TabsContent value="password">
    Password settings content...
  </TabsContent>
  <TabsContent value="notifications">
    Notification settings content...
  </TabsContent>
</Tabs>`}
                />
              </div>
            </div>
          </Stack>

          {/* Controlled */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Controlled Mode</Heading>
            <Body>
              <code>value</code>와 <code>onValueChange</code> props로 탭 상태를
              외부에서 제어할 수 있습니다.
            </Body>
            <div>
              <ComponentPreview>
                <Tabs
                  value="home"
                  onValueChange={(value) =>
                    console.log('Tab changed to:', value)
                  }
                >
                  <TabsList>
                    <TabsTrigger value="home">Home</TabsTrigger>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="messages">Messages</TabsTrigger>
                  </TabsList>
                  <TabsContent value="home">
                    <Body>Home content (controlled)</Body>
                  </TabsContent>
                  <TabsContent value="profile">
                    <Body>Profile content (controlled)</Body>
                  </TabsContent>
                  <TabsContent value="messages">
                    <Body>Messages content (controlled)</Body>
                  </TabsContent>
                </Tabs>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`const [activeTab, setActiveTab] = useState('home')

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
                />
              </div>
            </div>
          </Stack>

          {/* Disabled Tab */}
          <Stack spacing="heading-tight">
            <Heading level="h3">비활성화된 탭</Heading>
            <Body>
              <code>disabled</code> prop으로 특정 탭을 비활성화할 수 있습니다.
            </Body>
            <div>
              <ComponentPreview>
                <Tabs defaultValue="general">
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
                </Tabs>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Tabs defaultValue="general">
  <TabsList>
    <TabsTrigger value="general">General</TabsTrigger>
    <TabsTrigger value="advanced">Advanced</TabsTrigger>
    <TabsTrigger value="admin" disabled>
      Admin (Disabled)
    </TabsTrigger>
  </TabsList>
  <TabsContent value="general">General settings...</TabsContent>
  <TabsContent value="advanced">Advanced settings...</TabsContent>
  <TabsContent value="admin">Admin settings...</TabsContent>
</Tabs>`}
                />
              </div>
            </div>
          </Stack>

          {/* With Cards */}
          <Stack spacing="heading-tight">
            <Heading level="h3">카드와 함께 사용</Heading>
            <Body>
              탭 콘텐츠를 Card로 감싸서 시각적 구분을 강화할 수 있습니다.
            </Body>
            <div>
              <ComponentPreview>
                <Tabs defaultValue="description">
                  <TabsList>
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="specifications">
                      Specifications
                    </TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description">
                    <Card>
                      <CardBody>
                        <Heading level="h4">Product Description</Heading>
                        <Body className="mt-2">
                          이 제품은 고품질 소재로 제작되었습니다...
                        </Body>
                      </CardBody>
                    </Card>
                  </TabsContent>
                  <TabsContent value="specifications">
                    <Card>
                      <CardBody>
                        <Heading level="h4">Technical Specifications</Heading>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>크기: 10 x 20 x 30 cm</li>
                          <li>무게: 500g</li>
                          <li>재질: 스테인리스 스틸</li>
                        </ul>
                      </CardBody>
                    </Card>
                  </TabsContent>
                  <TabsContent value="reviews">
                    <Card>
                      <CardBody>
                        <Heading level="h4">Customer Reviews</Heading>
                        <Body className="mt-2">별점: ⭐⭐⭐⭐⭐ (5.0)</Body>
                      </CardBody>
                    </Card>
                  </TabsContent>
                </Tabs>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Tabs defaultValue="description">
  <TabsList>
    <TabsTrigger value="description">Description</TabsTrigger>
    <TabsTrigger value="specifications">Specifications</TabsTrigger>
    <TabsTrigger value="reviews">Reviews</TabsTrigger>
  </TabsList>
  <TabsContent value="description">
    <Card>
      <CardBody>
        <Heading level="h4">Product Description</Heading>
        <Body>Product details...</Body>
      </CardBody>
    </Card>
  </TabsContent>
  {/* ... other tabs ... */}
</Tabs>`}
                />
              </div>
            </div>
          </Stack>
        </Stack>
      </PageSection>

      {/* API Reference */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="api-reference">
            API 레퍼런스
          </Heading>

          <Stack spacing="heading-tight">
            <Heading level="h3">Tabs</Heading>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 dark:border-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-4 py-2 text-left border-b border-gray-200 dark:border-gray-800">
                      Prop
                    </th>
                    <th className="px-4 py-2 text-left border-b border-gray-200 dark:border-gray-800">
                      Type
                    </th>
                    <th className="px-4 py-2 text-left border-b border-gray-200 dark:border-gray-800">
                      Default
                    </th>
                    <th className="px-4 py-2 text-left border-b border-gray-200 dark:border-gray-800">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono">
                      defaultValue
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono text-xs">
                      string
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                      -
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                      초기 활성 탭 (비제어 모드)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono">
                      value
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono text-xs">
                      string
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                      -
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                      활성 탭 (제어 모드)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono">
                      onValueChange
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono text-xs">
                      (value: string) =&gt; void
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                      -
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                      탭 변경 시 호출되는 콜백
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono">
                      variant
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono text-xs">
                      &quot;default&quot; | &quot;pills&quot;
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                      &quot;default&quot;
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                      탭 스타일 변형
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">TabsTrigger</Heading>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 dark:border-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-4 py-2 text-left border-b border-gray-200 dark:border-gray-800">
                      Prop
                    </th>
                    <th className="px-4 py-2 text-left border-b border-gray-200 dark:border-gray-800">
                      Type
                    </th>
                    <th className="px-4 py-2 text-left border-b border-gray-200 dark:border-gray-800">
                      Default
                    </th>
                    <th className="px-4 py-2 text-left border-b border-gray-200 dark:border-gray-800">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono">
                      value
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono text-xs">
                      string
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                      -
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                      탭 식별자 (필수)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono">
                      disabled
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono text-xs">
                      boolean
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                      false
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                      탭 비활성화 여부
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">TabsContent</Heading>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 dark:border-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-4 py-2 text-left border-b border-gray-200 dark:border-gray-800">
                      Prop
                    </th>
                    <th className="px-4 py-2 text-left border-b border-gray-200 dark:border-gray-800">
                      Type
                    </th>
                    <th className="px-4 py-2 text-left border-b border-gray-200 dark:border-gray-800">
                      Default
                    </th>
                    <th className="px-4 py-2 text-left border-b border-gray-200 dark:border-gray-800">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono">
                      value
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono text-xs">
                      string
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                      -
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                      연결된 탭 식별자 (필수)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Stack>
        </Stack>
      </PageSection>

      {/* Foundation Layer Features */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="foundation-layer">
            KRDS 준수사항
          </Heading>
          <Body className="leading-relaxed">
            HANUI Tabs는 Foundation Layer의 자동화된 접근성 기능을 제공합니다.
            개발자가 별도로 ARIA 속성이나 키보드 이벤트를 작성할 필요 없이,
            컴포넌트가 모든 접근성 기능을 자동으로 처리합니다.
          </Body>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Stack spacing="heading-tight">
            <Heading level="h3">1. ARIA Automation</Heading>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <code>role="tablist"</code> 탭 리스트 컨테이너에 자동 적용
              </li>
              <li>
                <code>role="tab"</code> 각 탭 버튼에 자동 적용
              </li>
              <li>
                <code>role="tabpanel"</code> 콘텐츠 영역에 자동 적용
              </li>
              <li>
                <code>aria-selected</code> 선택 상태 자동 관리 (true/false)
              </li>
              <li>
                <code>aria-controls</code> 탭과 패널 ID 자동 연결
              </li>
              <li>
                <code>aria-labelledby</code> 패널과 탭 ID 자동 연결
              </li>
            </ul>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">2. Keyboard Navigation</Heading>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Arrow Left/Right</strong>: 탭 간 순환 네비게이션
                (양방향)
              </li>
              <li>
                <strong>Home</strong>: 첫 번째 탭으로 즉시 이동
              </li>
              <li>
                <strong>End</strong>: 마지막 탭으로 즉시 이동
              </li>
              <li>
                <strong>Enter</strong>: 포커스된 탭 선택 및 패널 전환
              </li>
              <li>
                <strong>Tab/Shift+Tab</strong>: 탭 리스트 진입/탈출
              </li>
              <li>비활성화된 탭은 키보드 네비게이션에서 자동 제외</li>
            </ul>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">3. Focus Management</Heading>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>키보드 포커스 시 명확한 시각적 표시 (ring)</li>
              <li>WCAG 2.1 Focus Visible (AA) 기준 충족</li>
              <li>Arrow 키로 탭 전환 시 자동 포커스 이동</li>
              <li>선택된 탭으로 자동 포커스 관리</li>
            </ul>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">4. Color Independence</Heading>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Default variant</strong>: 밑줄 (border-bottom) + 색상
                변화
              </li>
              <li>
                <strong>Pills variant</strong>: 배경색 변화 + 둥근 모서리
              </li>
              <li>색상만으로 선택 상태를 구별하지 않음 (KRDS 준수)</li>
            </ul>
          </Stack>
        </Stack>
      </PageSection>
    </>
  );
}
