'use client';

import {
  Section,
  SectionHeading,
  Subsection,
  Button,
  Stack,
  Body,
  Code,
  DoCard,
  DontCard,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  PageNavigation,
} from '@/components/hanui';
import { ComponentPreview } from '@/components/content/ComponentPreview';

export default function ButtonPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Button"
        description="다양한 스타일과 크기를 지원하는 버튼 컴포넌트"
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview">
          <Section level="h2">
            <ComponentPreview>
              <div className="flex items-center gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
              </div>
            </ComponentPreview>
          </Section>

          {/* Overview */}
          <Section level="h2">
            <SectionHeading level="h2" id="overview" title="개요">
              <Body className="leading-relaxed">
                버튼은 사용자가 서비스를 이용하는 과정에서 어떤 행동이 중요한지
                알려주는 핵심 인터랙션 요소입니다. HANUI Button은{' '}
                <strong>KRDS(한국형 웹 콘텐츠 접근성 지침)</strong>를 준수하여
                공공 웹사이트에 최적화된 접근성과 사용성을 제공합니다.
              </Body>
            </SectionHeading>
          </Section>

          <Section level="h2">
            <SectionHeading
              level="h2"
              id="installation"
              title="설치"
              description="CLI 명령어로 Button 컴포넌트를 프로젝트에 추가합니다."
            />
            <Code variant="block" language="bash">
              {`npx @hanui/cli add button`}
            </Code>
          </Section>

          <Section level="h2">
            <SectionHeading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { Button } from '@/components/hanui/button'

<Button variant="primary">Click me</Button>`}
            </Code>
          </Section>

          {/* 가이드라인 섹션 */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="guidelines"
              title="사용 가이드라인"
            />

            <Subsection level="h3">
              <SectionHeading level="h3" title="언제 사용해야 하나요?" />
              <Stack gap="md">
                <DoCard title="버튼을 사용하기 적합한 경우">
                  <ul className="list-disc list-inside space-y-2">
                    <li>입력폼 제출, 대화창 실행, 기능 취소 등</li>
                    <li>일반적인 기능을 실행할 때</li>
                    <li>상태를 전환할 때</li>
                    <li>도움말을 제공할 때</li>
                    <li>진행 중인 프로세스를 중단하거나 취소할 때</li>
                    <li>중요한 데이터를 완전히 삭제할 때</li>
                  </ul>
                </DoCard>

                <DoCard title="다른 페이지로 이동할 때">
                  <Body>
                    현재 화면에서 완전히 다른 화면이나 서비스로 이동하는
                    경우에는 <Code>href</Code> prop을 사용하거나 Link 컴포넌트를
                    사용하세요.
                  </Body>
                  <ComponentPreview className="mt-2">
                    <div className="flex items-center gap-3">
                      <Button {...({ href: '/about' } as any)}>
                        자세히 보기
                      </Button>
                      <Button
                        {...({ href: '/contact' } as any)}
                        variant="outline"
                      >
                        연락하기
                      </Button>
                    </div>
                  </ComponentPreview>
                </DoCard>
              </Stack>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                title="버튼 위계"
                description="버튼의 시각적 강조도는 액션의 중요도와 일치해야 합니다."
              />
              <Stack gap="xs">
                <div className="rounded-lg border border-krds-gray-20 bg-krds-white p-4">
                  <Stack gap="xs">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">
                        Primary - 가장 중요한 액션
                      </h4>
                      <Button variant="primary" size="sm">
                        제출
                      </Button>
                    </div>
                    <Body className="text-krds-gray-70">
                      페이지당 하나만 사용 권장. 주요 목표 달성 액션 (제출,
                      저장, 구매 등)
                    </Body>
                  </Stack>
                </div>

                <div className="rounded-lg border border-krds-gray-20 bg-krds-white p-4">
                  <Stack gap="xs">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Secondary - 보조 액션</h4>
                      <Button variant="secondary" size="sm">
                        취소
                      </Button>
                    </div>
                    <Body className="text-krds-gray-70">
                      Primary와 함께 사용. 취소, 이전 단계 등
                    </Body>
                  </Stack>
                </div>

                <div className="rounded-lg border border-krds-gray-20 bg-krds-white p-4">
                  <Stack gap="xs">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Outline - 낮은 강조</h4>
                      <Button variant="outline" size="sm">
                        옵션
                      </Button>
                    </div>
                    <Body className="text-krds-gray-70">
                      추가 옵션이나 덜 중요한 액션
                    </Body>
                  </Stack>
                </div>

                <div className="rounded-lg border border-krds-gray-20 bg-krds-white p-4">
                  <Stack gap="xs">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Ghost - 최소 강조</h4>
                      <Button variant="ghost" size="sm">
                        닫기
                      </Button>
                    </div>
                    <Body className="text-krds-gray-70">
                      인라인 액션, 닫기 버튼 등
                    </Body>
                  </Stack>
                </div>
              </Stack>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="버튼 배치" />
              <Stack gap="md">
                <DoCard title="올바른 배치">
                  <Body>가장 중요한 버튼을 오른쪽에 배치 (수평 배치 시)</Body>
                  <ComponentPreview>
                    <div className="flex items-center gap-3">
                      <Button variant="outline">취소</Button>
                      <Button variant="primary">확인</Button>
                    </div>
                  </ComponentPreview>
                </DoCard>

                <DoCard title="Primary 버튼이 여러 개 필요할 때">
                  <Body>
                    한 페이지에 Primary 버튼이 여러 개 필요한 경우, 하나는
                    Primary로, 나머지는 Secondary나 Outline로 사용하세요
                  </Body>
                  <ComponentPreview>
                    <div className="flex items-center gap-3">
                      <Button variant="outline">취소</Button>
                      <Button variant="primary">확인</Button>
                    </div>
                  </ComponentPreview>
                </DoCard>
              </Stack>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="접근성" />
              <DoCard title="중복 클릭 방지">
                <Body>
                  네트워크 지연 시 사용자가 버튼을 여러 번 클릭할 수 있습니다.
                  loading 상태를 활용하세요.
                </Body>
                <ComponentPreview>
                  <Button loading disabled>
                    처리 중...
                  </Button>
                </ComponentPreview>
              </DoCard>
            </Subsection>
          </Section>

          {/* 예제 섹션 */}
          <Section level="h2">
            <SectionHeading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <SectionHeading level="h3" title="기본" />
              <ComponentPreview>
                <Button>Button</Button>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Button>Button</Button>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Size (크기)" />
              <ComponentPreview>
                <div className="flex items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Primary" />
              <ComponentPreview>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary">회원가입</Button>
                  <Button variant="primary">결제하기</Button>
                  <Button variant="primary">제출</Button>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Button variant="primary">회원가입</Button>
<Button variant="primary">결제하기</Button>
<Button variant="primary">제출</Button>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Secondary" />
              <ComponentPreview>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="secondary">취소</Button>
                  <Button variant="secondary">뒤로가기</Button>
                  <Button variant="secondary">건너뛰기</Button>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Button variant="secondary">취소</Button>
<Button variant="secondary">뒤로가기</Button>
<Button variant="secondary">건너뛰기</Button>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Success & Danger" />
              <ComponentPreview>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="success">승인</Button>
                  <Button variant="danger">삭제</Button>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Button variant="success">승인</Button>
<Button variant="danger">삭제</Button>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Outline" />
              <ComponentPreview>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="outline">필터</Button>
                  <Button variant="outline">설정</Button>
                  <Button variant="outline">더보기</Button>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Button variant="outline">필터</Button>
<Button variant="outline">설정</Button>
<Button variant="outline">더보기</Button>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Ghost" />
              <ComponentPreview>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="ghost">닫기</Button>
                  <Button variant="ghost">접기</Button>
                  <Button variant="ghost">편집</Button>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Button variant="ghost">닫기</Button>
<Button variant="ghost">접기</Button>
<Button variant="ghost">편집</Button>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Ghost Primary" />
              <ComponentPreview>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="ghost-primary">자세히 보기</Button>
                  <Button variant="ghost-primary">더 알아보기</Button>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Button variant="ghost-primary">자세히 보기</Button>
<Button variant="ghost-primary">더 알아보기</Button>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Loading" />
              <ComponentPreview>
                <div className="flex flex-wrap items-center gap-3">
                  <Button loading>처리 중...</Button>
                  <Button loading disabled>
                    제출 중...
                  </Button>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Button loading>처리 중...</Button>
<Button loading disabled>제출 중...</Button>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="비활성화" />
              <ComponentPreview>
                <div className="flex flex-wrap items-center gap-3">
                  <Button disabled>제출 불가</Button>
                  <Button variant="outline" disabled>
                    권한 없음
                  </Button>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Button disabled>제출 불가</Button>
<Button variant="outline" disabled>권한 없음</Button>`}
              </Code>
            </Subsection>
          </Section>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
          <Section level="h2">
            <SectionHeading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <SectionHeading level="h3" title="Props" />
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-krds-gray-20">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">
                        Prop
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">
                        Type
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">
                        Default
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-[15px] leading-[150%]">
                    <tr className="border-b border-krds-gray-10">
                      <td className="py-3 px-4 font-mono">
                        <Code>variant</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        <Code className="text-xs">
                          'primary' | 'secondary' | 'success' | 'danger' |
                          'ghost' | 'ghost-primary' | 'outline' | 'black'
                        </Code>
                      </td>
                      <td className="py-3 px-4 text-gray-500">'primary'</td>
                      <td className="py-3 px-4 text-gray-700">
                        버튼의 시각적 스타일
                      </td>
                    </tr>
                    <tr className="border-b border-krds-gray-10">
                      <td className="py-3 px-4 font-mono">
                        <Code>size</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        <Code className="text-xs">'sm' | 'md' | 'lg'</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-500">'md'</td>
                      <td className="py-3 px-4 text-gray-700">버튼 크기</td>
                    </tr>
                    <tr className="border-b border-krds-gray-10">
                      <td className="py-3 px-4 font-mono">
                        <Code>loading</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        <Code className="text-xs">boolean</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-500">false</td>
                      <td className="py-3 px-4 text-gray-700">
                        로딩 상태 표시 및 상호작용 비활성화
                      </td>
                    </tr>
                    <tr className="border-b border-krds-gray-10">
                      <td className="py-3 px-4 font-mono">
                        <Code>disabled</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        <Code className="text-xs">boolean</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-500">false</td>
                      <td className="py-3 px-4 text-gray-700">버튼 비활성화</td>
                    </tr>
                    <tr className="border-b border-krds-gray-10">
                      <td className="py-3 px-4 font-mono">
                        <Code>iconLeft</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        <Code className="text-xs">React.ReactNode</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-500">-</td>
                      <td className="py-3 px-4 text-gray-700">
                        버튼 텍스트 왼쪽에 표시할 아이콘
                      </td>
                    </tr>
                    <tr className="border-b border-krds-gray-10">
                      <td className="py-3 px-4 font-mono">
                        <Code>iconRight</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        <Code className="text-xs">React.ReactNode</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-500">-</td>
                      <td className="py-3 px-4 text-gray-700">
                        버튼 텍스트 오른쪽에 표시할 아이콘
                      </td>
                    </tr>
                    <tr className="border-b border-krds-gray-10">
                      <td className="py-3 px-4 font-mono">
                        <Code>href</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        <Code className="text-xs">string</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-500">-</td>
                      <td className="py-3 px-4 text-gray-700">
                        제공 시 버튼이 <Code>&lt;a&gt;</Code> 태그로 렌더링됨.
                        다른 페이지나 서비스로 이동할 때 사용
                      </td>
                    </tr>
                    <tr className="border-b border-krds-gray-10">
                      <td className="py-3 px-4 font-mono">
                        <Code>target</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        <Code className="text-xs">string</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-500">-</td>
                      <td className="py-3 px-4 text-gray-700">
                        href 사용 시 링크의 target 속성 (예: '_blank')
                      </td>
                    </tr>
                    <tr className="border-b border-krds-gray-10">
                      <td className="py-3 px-4 font-mono">
                        <Code>rel</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        <Code className="text-xs">string</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-500">-</td>
                      <td className="py-3 px-4 text-gray-700">
                        href 사용 시 링크의 rel 속성 (예: 'noopener noreferrer')
                      </td>
                    </tr>
                    <tr className="border-b border-krds-gray-10">
                      <td className="py-3 px-4 font-mono">
                        <Code>asChild</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        <Code className="text-xs">boolean</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-500">false</td>
                      <td className="py-3 px-4 text-gray-700">
                        Radix Slot 패턴 사용. 자식 요소에 스타일 적용
                      </td>
                    </tr>
                    <tr className="border-b border-krds-gray-10">
                      <td className="py-3 px-4 font-mono">
                        <Code>className</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        <Code className="text-xs">string</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-500">-</td>
                      <td className="py-3 px-4 text-gray-700">
                        추가 CSS 클래스 (레이아웃 조정용)
                      </td>
                    </tr>
                    <tr className="border-b border-krds-gray-10">
                      <td className="py-3 px-4 font-mono">
                        <Code>children</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        <Code className="text-xs">React.ReactNode</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-500">-</td>
                      <td className="py-3 px-4 text-gray-700">버튼 텍스트</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Variants">
                <Body size="sm" className="text-krds-gray-70">
                  버튼의 시각적 스타일을 결정하는 variant 옵션입니다.
                </Body>
              </SectionHeading>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-krds-gray-20">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">
                        Value
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-[15px] leading-[150%]">
                    <tr className="border-b border-krds-gray-10">
                      <td className="py-3 px-4 font-mono">
                        <Code>primary</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        가장 중요한 액션에 사용 (기본값)
                      </td>
                    </tr>
                    <tr className="border-b border-krds-gray-10">
                      <td className="py-3 px-4 font-mono">
                        <Code>secondary</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        보조 액션에 사용
                      </td>
                    </tr>
                    <tr className="border-b border-krds-gray-10">
                      <td className="py-3 px-4 font-mono">
                        <Code>success</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        긍정적 결과 액션에 사용
                      </td>
                    </tr>
                    <tr className="border-b border-krds-gray-10">
                      <td className="py-3 px-4 font-mono">
                        <Code>danger</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        삭제나 위험한 액션에 사용
                      </td>
                    </tr>
                    <tr className="border-b border-krds-gray-10">
                      <td className="py-3 px-4 font-mono">
                        <Code>outline</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        테두리만 있는 스타일
                      </td>
                    </tr>
                    <tr className="border-b border-krds-gray-10">
                      <td className="py-3 px-4 font-mono">
                        <Code>ghost</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        배경 없는 최소 강조 스타일
                      </td>
                    </tr>
                    <tr className="border-b border-krds-gray-10">
                      <td className="py-3 px-4 font-mono">
                        <Code>ghost-primary</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        Ghost 스타일이지만 Primary 색상 사용
                      </td>
                    </tr>
                    <tr className="border-b border-krds-gray-10">
                      <td className="py-3 px-4 font-mono">
                        <Code>black</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        검은색 배경 스타일
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Sizes">
                <Body size="sm" className="text-krds-gray-70">
                  버튼의 크기를 결정하는 size 옵션입니다.
                </Body>
              </SectionHeading>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-krds-gray-20">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">
                        Value
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">
                        Height
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-[15px] leading-[150%]">
                    <tr className="border-b border-krds-gray-10">
                      <td className="py-3 px-4 font-mono">
                        <Code>sm</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-700">32px</td>
                      <td className="py-3 px-4 text-gray-700">작은 크기</td>
                    </tr>
                    <tr className="border-b border-krds-gray-10">
                      <td className="py-3 px-4 font-mono">
                        <Code>md</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-700">40px</td>
                      <td className="py-3 px-4 text-gray-700">
                        중간 크기 (기본값)
                      </td>
                    </tr>
                    <tr className="border-b border-krds-gray-10">
                      <td className="py-3 px-4 font-mono">
                        <Code>lg</Code>
                      </td>
                      <td className="py-3 px-4 text-gray-700">48px</td>
                      <td className="py-3 px-4 text-gray-700">큰 크기</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="href prop 사용">
                <Body size="sm" className="text-krds-gray-70">
                  <Code>href</Code> prop을 제공하면 Button 컴포넌트가 자동으로{' '}
                  <Code>&lt;a&gt;</Code> 태그로 렌더링됩니다.
                </Body>
              </SectionHeading>
              <Code variant="block" language="tsx">
                {`// href prop 사용 시 <a> 태그로 렌더링
<Button href="/about">자세히 보기</Button>
// 렌더링 결과: <a href="/about" class="...">자세히 보기</a>

// href 없이 사용 시 <button> 태그로 렌더링
<Button onClick={handleClick}>클릭</Button>
// 렌더링 결과: <button type="button" class="...">클릭</button>`}
              </Code>
              <Body size="sm" className="text-krds-gray-70">
                <strong>주의사항:</strong>
              </Body>
              <ul className="list-disc list-inside space-y-1 text-krds-gray-70 ml-4">
                <li>
                  <Code>href</Code>와 <Code>asChild</Code>는 함께 사용할 수
                  없습니다
                </li>
                <li>
                  <Code>href</Code> 사용 시 <Code>loading</Code>,{' '}
                  <Code>iconLeft</Code>, <Code>iconRight</Code> 기능은
                  정상적으로 작동합니다
                </li>
                <li>
                  외부 링크의 경우 <Code>target="_blank"</Code>와{' '}
                  <Code>rel="noopener noreferrer"</Code>를 함께 사용하는 것을
                  권장합니다
                </li>
              </ul>
              <ComponentPreview>
                <div className="flex items-center gap-3">
                  <Button {...({ href: '/about' } as any)}>내부 링크</Button>
                  <Button
                    {...({
                      href: 'https://github.com',
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    } as any)}
                  >
                    외부 링크
                  </Button>
                  <Button
                    variant="outline"
                    iconLeft={<span>→</span>}
                    {...({ href: '/contact' } as any)}
                  >
                    아이콘과 함께
                  </Button>
                </div>
              </ComponentPreview>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Breakpoints', href: '/components/breakpoints' }}
        next={{ title: 'Card', href: '/components/card' }}
      />
    </>
  );
}
