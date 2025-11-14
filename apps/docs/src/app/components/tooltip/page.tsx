'use client';

import { Tooltip, Button, Stack, Heading, Body } from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';
import { Installation } from '@/components/content/Installation';
import { GuidelineSection } from '@/components/content/GuidelineSection';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

export default function TooltipPage() {
  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Tooltip (툴팁)"
        description="활성화 버튼에 마우스 오버 또는 포커스 시 추가 정보를 제공하는 팝오버 컴포넌트입니다."
      />

      {/* Preview */}
      <PageSection>
        <ComponentPreview>
          <Tooltip content="저장 버튼을 클릭하여 변경사항을 저장하세요">
            <Button>저장</Button>
          </Tooltip>
          <Tooltip content="삭제하면 복구할 수 없습니다">
            <Button variant="danger">삭제</Button>
          </Tooltip>
          <Tooltip content="이 기능은 곧 제공될 예정입니다" position="bottom">
            <Button variant="ghost">미리보기</Button>
          </Tooltip>
        </ComponentPreview>
      </PageSection>

      {/* Overview */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="overview">
            개요
          </Heading>
          <Body className="leading-relaxed">
            툴팁은 사용자가 UI 요소에 마우스를 올리거나 키보드로 포커스할 때
            간단한 도움말이나 부가 설명을 제공하는 컴포넌트입니다. HANUI
            Tooltip은 <strong>KRDS 2.2 접근성 지침</strong>을 완벽하게 준수하며,
            Foundation Layer의 자동화된 접근성 기능을 제공합니다.
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
              <GuidelineSection type="do" title="툴팁을 사용하기 적합한 경우">
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>아이콘 버튼의 기능 설명</strong> - 텍스트 레이블이
                    없는 아이콘 버튼의 용도를 설명할 때
                  </li>
                  <li>
                    <strong>추가 컨텍스트 제공</strong> - 버튼이나 링크에 대한
                    간단한 부가 정보를 제공할 때
                  </li>
                  <li>
                    <strong>짧은 도움말</strong> - 1-2문장 이내의 간결한
                    도움말을 표시할 때
                  </li>
                  <li>
                    <strong>비활성화된 요소 설명</strong> - 왜 특정 기능이
                    비활성화되었는지 설명할 때
                  </li>
                </ul>
              </GuidelineSection>

              <GuidelineSection
                type="dont"
                title="툴팁을 사용하지 말아야 하는 경우"
              >
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>중요한 정보 표시</strong> - 사용자가 반드시 알아야
                    하는 정보는 본문에 직접 표시
                  </li>
                  <li>
                    <strong>긴 설명문</strong> - 여러 문단의 긴 설명은 Modal이나
                    별도 페이지 사용
                  </li>
                  <li>
                    <strong>상호작용 요소 포함</strong> - 툴팁 내부에 버튼이나
                    링크를 넣지 마세요
                  </li>
                  <li>
                    <strong>터치 전용 인터페이스</strong> - 모바일에서는 다른 UI
                    패턴 고려
                  </li>
                </ul>
              </GuidelineSection>
            </div>
          </Stack>

          {/* Accessibility */}
          <Stack spacing="heading-tight">
            <Heading level="h3">접근성</Heading>
            <Body>
              HANUI Tooltip은 KRDS 2.2 접근성 가이드라인을 준수합니다:
            </Body>

            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>aria-labelledby 자동 연결</strong> - 활성화 버튼과 툴팁
                콘텐츠를 ARIA로 자동 연결
              </li>
              <li>
                <strong>키보드 네비게이션</strong> - Tab 키로 포커스 이동,
                Shift+Tab으로 역방향 이동
              </li>
              <li>
                <strong>ESC 키 지원</strong> - ESC 키로 툴팁을 닫고 활성화
                버튼으로 포커스 복원
              </li>
              <li>
                <strong>충분한 명암비</strong> - 다크 배경(gray-900)과 흰색
                텍스트로 7:1 이상 명암비 보장
              </li>
              <li>
                <strong>WCAG 2.2 준수</strong> - 1.4.13 Content on Hover or
                Focus 성공 기준 충족
              </li>
            </ul>
          </Stack>

          {/* Interaction patterns */}
          <Stack spacing="heading-tight">
            <Heading level="h3">상호작용 패턴</Heading>
            <Body>KRDS 2.2에서 정의한 툴팁 상호작용 패턴:</Body>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 dark:border-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-4 py-2 text-left border-b border-gray-200 dark:border-gray-800">
                      상호작용
                    </th>
                    <th className="px-4 py-2 text-left border-b border-gray-200 dark:border-gray-800">
                      동작
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-medium">
                      Mouseover
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                      활성화 버튼에 마우스를 올리면 툴팁 표시
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-medium">
                      Focus
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                      키보드로 버튼에 포커스하면 툴팁 표시
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-medium">
                      Mouseleave
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                      마우스가 버튼을 벗어나면 툴팁 숨김
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-medium">
                      Blur (Tab/Shift+Tab)
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                      포커스가 버튼에서 이동하면 툴팁 숨김
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-medium">
                      ESC
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                      툴팁을 닫고 활성화 버튼으로 포커스 복원
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
        <Installation componentName="tooltip" />
      </PageSection>

      {/* Usage */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="usage">
            Usage
          </Heading>
          <CodeBlock
            code={`import { Tooltip, Button } from '@hanui/react'

export default function MyComponent() {
  return (
    <Tooltip content="저장 버튼입니다">
      <Button>저장</Button>
    </Tooltip>
  )
}`}
          />
        </Stack>
      </PageSection>

      {/* Examples */}
      <PageSection>
        <Heading level="h2" id="examples">
          Examples
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* Default */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Default</Heading>
            <div>
              <ComponentPreview>
                <Tooltip content="기본 툴팁입니다">
                  <Button>Hover me</Button>
                </Tooltip>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Tooltip content="기본 툴팁입니다">
  <Button>Hover me</Button>
</Tooltip>`}
                />
              </div>
            </div>
          </Stack>

          {/* Position */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Position</Heading>
            <Body>
              툴팁의 위치를 <code>position</code> prop으로 지정할 수 있습니다.
            </Body>
            <div>
              <ComponentPreview>
                <Tooltip content="상단 툴팁" position="top">
                  <Button>Top</Button>
                </Tooltip>
                <Tooltip content="우측 툴팁" position="right">
                  <Button>Right</Button>
                </Tooltip>
                <Tooltip content="하단 툴팁" position="bottom">
                  <Button>Bottom</Button>
                </Tooltip>
                <Tooltip content="좌측 툴팁" position="left">
                  <Button>Left</Button>
                </Tooltip>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Tooltip content="상단 툴팁" position="top">
  <Button>Top</Button>
</Tooltip>

<Tooltip content="우측 툴팁" position="right">
  <Button>Right</Button>
</Tooltip>

<Tooltip content="하단 툴팁" position="bottom">
  <Button>Bottom</Button>
</Tooltip>

<Tooltip content="좌측 툴팁" position="left">
  <Button>Left</Button>
</Tooltip>`}
                />
              </div>
            </div>
          </Stack>

          {/* Variants */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Variants</Heading>
            <Body>
              <code>variant</code> prop으로 툴팁 스타일을 변경할 수 있습니다.
            </Body>
            <div>
              <ComponentPreview>
                <Tooltip content="기본 다크 툴팁" variant="default">
                  <Button>Dark (Default)</Button>
                </Tooltip>
                <Tooltip content="라이트 툴팁" variant="light">
                  <Button>Light</Button>
                </Tooltip>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Tooltip content="기본 다크 툴팁" variant="default">
  <Button>Dark (Default)</Button>
</Tooltip>

<Tooltip content="라이트 툴팁" variant="light">
  <Button>Light</Button>
</Tooltip>`}
                />
              </div>
            </div>
          </Stack>

          {/* Delay */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Delay</Heading>
            <Body>
              <code>delay</code> prop으로 툴팁이 나타나는 지연 시간을 밀리초
              단위로 설정할 수 있습니다. 기본값은 200ms입니다.
            </Body>
            <div>
              <ComponentPreview>
                <Tooltip content="즉시 표시" delay={0}>
                  <Button>No Delay</Button>
                </Tooltip>
                <Tooltip content="기본 지연 (200ms)">
                  <Button>Default (200ms)</Button>
                </Tooltip>
                <Tooltip content="긴 지연 (1000ms)" delay={1000}>
                  <Button>Long Delay (1s)</Button>
                </Tooltip>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Tooltip content="즉시 표시" delay={0}>
  <Button>No Delay</Button>
</Tooltip>

<Tooltip content="기본 지연 (200ms)">
  <Button>Default (200ms)</Button>
</Tooltip>

<Tooltip content="긴 지연 (1000ms)" delay={1000}>
  <Button>Long Delay (1s)</Button>
</Tooltip>`}
                />
              </div>
            </div>
          </Stack>

          {/* With Icon Button */}
          <Stack spacing="heading-tight">
            <Heading level="h3">아이콘 버튼과 함께 사용</Heading>
            <Body>
              텍스트 레이블이 없는 아이콘 버튼의 기능을 설명할 때 툴팁을
              사용하세요.
            </Body>
            <div>
              <ComponentPreview>
                <Tooltip content="설정">
                  <Button variant="ghost" size="sm">
                    ⚙️
                  </Button>
                </Tooltip>
                <Tooltip content="알림">
                  <Button variant="ghost" size="sm">
                    🔔
                  </Button>
                </Tooltip>
                <Tooltip content="프로필">
                  <Button variant="ghost" size="sm">
                    👤
                  </Button>
                </Tooltip>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Tooltip content="설정">
  <Button variant="ghost" size="sm">⚙️</Button>
</Tooltip>

<Tooltip content="알림">
  <Button variant="ghost" size="sm">🔔</Button>
</Tooltip>

<Tooltip content="프로필">
  <Button variant="ghost" size="sm">👤</Button>
</Tooltip>`}
                />
              </div>
            </div>
          </Stack>

          {/* Disabled */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Disabled</Heading>
            <Body>
              <code>disabled</code> prop으로 툴팁을 비활성화할 수 있습니다.
            </Body>
            <div>
              <ComponentPreview>
                <Tooltip content="활성화된 툴팁">
                  <Button>Enabled</Button>
                </Tooltip>
                <Tooltip content="이 툴팁은 표시되지 않습니다" disabled>
                  <Button>Disabled Tooltip</Button>
                </Tooltip>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Tooltip content="활성화된 툴팁">
  <Button>Enabled</Button>
</Tooltip>

<Tooltip content="이 툴팁은 표시되지 않습니다" disabled>
  <Button>Disabled Tooltip</Button>
</Tooltip>`}
                />
              </div>
            </div>
          </Stack>

          {/* Custom Styling */}
          <Stack spacing="heading-tight">
            <Heading level="h3">커스텀 스타일링</Heading>
            <Body>
              <code>className</code>과 <code>wrapperClassName</code> prop으로
              툴팁을 커스터마이징할 수 있습니다.
            </Body>
            <div>
              <ComponentPreview>
                <Tooltip
                  content="커스텀 스타일 툴팁"
                  className="bg-purple-600 text-white font-bold"
                >
                  <Button>Custom Tooltip</Button>
                </Tooltip>
                <Tooltip
                  content="큰 툴팁"
                  className="text-base px-4 py-3 max-w-md"
                >
                  <Button>Large Tooltip</Button>
                </Tooltip>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Tooltip
  content="커스텀 스타일 툴팁"
  className="bg-purple-600 text-white font-bold"
>
  <Button>Custom Tooltip</Button>
</Tooltip>

<Tooltip
  content="큰 툴팁"
  className="text-base px-4 py-3 max-w-md"
>
  <Button>Large Tooltip</Button>
</Tooltip>`}
                />
              </div>
            </div>
          </Stack>
        </Stack>
      </PageSection>

      {/* API Reference */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="api">
            API Reference
          </Heading>

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
                    content
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono text-xs">
                    React.ReactNode
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                    -
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                    툴팁에 표시할 콘텐츠 (필수)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono">
                    children
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono text-xs">
                    React.ReactElement
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                    -
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                    툴팁을 트리거할 활성화 버튼 요소 (필수)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono">
                    variant
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono text-xs">
                    &quot;default&quot; | &quot;light&quot;
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                    &quot;default&quot;
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                    툴팁 스타일 변형
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono">
                    position
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono text-xs">
                    &quot;top&quot; | &quot;right&quot; | &quot;bottom&quot; |
                    &quot;left&quot;
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                    &quot;top&quot;
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                    툴팁 표시 위치
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono">
                    delay
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono text-xs">
                    number
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                    200
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                    툴팁이 나타나기 전 지연 시간 (밀리초)
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
                    툴팁 비활성화 여부
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono">
                    className
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono text-xs">
                    string
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                    -
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                    툴팁 컨테이너에 적용할 추가 CSS 클래스
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono">
                    wrapperClassName
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-mono text-xs">
                    string
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                    -
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                    래퍼에 적용할 추가 CSS 클래스
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Stack>
      </PageSection>

      {/* Foundation Layer Features */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="foundation-layer">
            Foundation Layer 기능
          </Heading>
          <Body className="leading-relaxed">
            HANUI Tooltip은 Foundation Layer의 자동화된 접근성 기능을
            제공합니다. 개발자가 별도로 ARIA 속성이나 이벤트 핸들러를 작성할
            필요 없이, 컴포넌트가 모든 접근성 기능을 자동으로 처리합니다.
          </Body>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Stack spacing="heading-tight">
            <Heading level="h3">1. ARIA Automation</Heading>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <code>aria-labelledby</code> 속성을 활성화 버튼에 자동 연결
                (KRDS 2.2 요구사항)
              </li>
              <li>고유한 ID를 자동 생성하여 ARIA 관계 설정</li>
              <li>
                <code>role=&quot;tooltip&quot;</code> 속성 자동 적용
              </li>
            </ul>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">2. Focus Management</Heading>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>마우스 호버와 키보드 포커스를 모두 감지</li>
              <li>
                Blur 이벤트 자동 처리 (Tab/Shift+Tab으로 포커스 이동 시 툴팁
                숨김)
              </li>
              <li>ESC 키로 툴팁 닫기 후 활성화 버튼으로 포커스 자동 복원</li>
            </ul>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">3. Keyboard Navigation</Heading>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Tab 키로 활성화 버튼에 포커스 → 툴팁 자동 표시</li>
              <li>Shift + Tab으로 역방향 이동 → 툴팁 자동 숨김</li>
              <li>ESC 키로 툴팁 닫기 및 포커스 복원</li>
            </ul>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">4. Event Cleanup</Heading>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>컴포넌트 언마운트 시 모든 이벤트 리스너 자동 제거</li>
              <li>타이머 자동 정리로 메모리 누수 방지</li>
              <li>React useEffect cleanup 함수로 안전한 정리 보장</li>
            </ul>
          </Stack>
        </Stack>
      </PageSection>
    </>
  );
}
