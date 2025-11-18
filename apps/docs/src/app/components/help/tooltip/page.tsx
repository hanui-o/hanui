'use client';

import { Tooltip, Button, Body } from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';
import { GuidelineSection } from '@/components/content/GuidelineSection';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';
import { SectionHeading } from '@/components/hanui/section-header';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/hanui/tabs';

export default function TooltipPage() {
  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Tooltip"
        description="활성화 버튼에 마우스 오버 또는 포커스 시 추가 정보를 제공하는 팝오버 컴포넌트입니다."
      />

      <PageSection>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {/* Preview */}
            <PageSection>
              <ComponentPreview>
                <Tooltip content="저장 버튼을 클릭하여 변경사항을 저장하세요">
                  <Button>저장</Button>
                </Tooltip>
                <Tooltip content="삭제하면 복구할 수 없습니다">
                  <Button variant="danger">삭제</Button>
                </Tooltip>
                <Tooltip
                  content="이 기능은 곧 제공될 예정입니다"
                  position="bottom"
                >
                  <Button variant="ghost">미리보기</Button>
                </Tooltip>
              </ComponentPreview>
            </PageSection>

            <SectionHeading level="h2" id="overview" title="개요">
              <Body className="leading-relaxed">
                툴팁은 사용자가 UI 요소에 마우스를 올리거나 키보드로 포커스할 때
                간단한 도움말이나 부가 설명을 제공하는 컴포넌트입니다. HANUI
                Tooltip은 <strong>KRDS 2.2 접근성 지침</strong>을 완벽하게
                준수하며, Foundation Layer의 자동화된 접근성 기능을 제공합니다.
              </Body>
            </SectionHeading>

            <SectionHeading level="h2" id="installation" title="설치" />
            <CodeBlock
              code={`npx @hanui/cli add tooltip`}
              language="bash"
              showLineNumbers={false}
            />

            <SectionHeading level="h2" id="usage" title="사용법" />
            <CodeBlock
              code={`import { Tooltip, Button } from '@/components/hanui/tooltip'

export default function MyComponent() {
  return (
    <Tooltip content="저장 버튼입니다">
      <Button>저장</Button>
    </Tooltip>
  )
}`}
            />

            <SectionHeading
              level="h2"
              id="guidelines"
              title="사용 가이드라인"
            />

            <SectionHeading
              level="h3"
              id="when-to-use"
              title="언제 사용해야 하나요?"
            />

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
                  <strong>짧은 도움말</strong> - 1-2문장 이내의 간결한 도움말을
                  표시할 때
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

            <SectionHeading level="h3" id="accessibility" title="접근성">
              <Body>
                HANUI Tooltip은 KRDS 2.2 접근성 가이드라인을 준수합니다:
              </Body>

              <ul className="list-disc list-inside space-y-2 text-krds-gray-90 mt-4">
                <li>
                  <strong>aria-labelledby 자동 연결</strong> - 활성화 버튼과
                  툴팁 콘텐츠를 ARIA로 자동 연결
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
            </SectionHeading>

            <SectionHeading
              level="h3"
              id="interaction-patterns"
              title="상호작용 패턴"
            >
              <Body>KRDS 2.2에서 정의한 툴팁 상호작용 패턴:</Body>

              <div className="overflow-x-auto mt-4">
                <table className="min-w-full border border-krds-gray-20">
                  <thead className="bg-krds-gray-5">
                    <tr>
                      <th className="px-4 py-2 text-left border-b border-krds-gray-20">
                        상호작용
                      </th>
                      <th className="px-4 py-2 text-left border-b border-krds-gray-20">
                        동작
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 border-b border-krds-gray-20 font-medium">
                        Mouseover
                      </td>
                      <td className="px-4 py-2 border-b border-krds-gray-20">
                        활성화 버튼에 마우스를 올리면 툴팁 표시
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-b border-krds-gray-20 font-medium">
                        Focus
                      </td>
                      <td className="px-4 py-2 border-b border-krds-gray-20">
                        키보드로 버튼에 포커스하면 툴팁 표시
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-b border-krds-gray-20 font-medium">
                        Mouseleave
                      </td>
                      <td className="px-4 py-2 border-b border-krds-gray-20">
                        마우스가 버튼을 벗어나면 툴팁 숨김
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-b border-krds-gray-20 font-medium">
                        Blur (Tab/Shift+Tab)
                      </td>
                      <td className="px-4 py-2 border-b border-krds-gray-20">
                        포커스가 버튼에서 이동하면 툴팁 숨김
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-b border-krds-gray-20 font-medium">
                        ESC
                      </td>
                      <td className="px-4 py-2 border-b border-krds-gray-20">
                        툴팁을 닫고 활성화 버튼으로 포커스 복원
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </SectionHeading>

            <SectionHeading level="h2" id="examples" title="예제" />

            {/* Default */}
            <SectionHeading level="h3" id="default" title="기본" />
            <ComponentPreview>
              <Tooltip content="기본 툴팁입니다">
                <Button>Hover me</Button>
              </Tooltip>
            </ComponentPreview>
            <CodeBlock
              code={`<Tooltip content="기본 툴팁입니다">
  <Button>Hover me</Button>
</Tooltip>`}
            />

            {/* Position */}
            <SectionHeading level="h3" id="position" title="위치">
              <Body>
                툴팁의 위치를 <code>position</code> prop으로 지정할 수 있습니다.
              </Body>
            </SectionHeading>
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

            {/* Variants */}
            <SectionHeading level="h3" id="variants" title="변형">
              <Body>
                <code>variant</code> prop으로 툴팁 스타일을 변경할 수 있습니다.
              </Body>
            </SectionHeading>
            <ComponentPreview>
              <Tooltip content="기본 다크 툴팁" variant="default">
                <Button>Dark (Default)</Button>
              </Tooltip>
              <Tooltip content="라이트 툴팁" variant="light">
                <Button>Light</Button>
              </Tooltip>
            </ComponentPreview>
            <CodeBlock
              code={`<Tooltip content="기본 다크 툴팁" variant="default">
  <Button>Dark (Default)</Button>
</Tooltip>

<Tooltip content="라이트 툴팁" variant="light">
  <Button>Light</Button>
</Tooltip>`}
            />

            {/* Delay */}
            <SectionHeading level="h3" id="delay" title="Delay">
              <Body>
                <code>delay</code> prop으로 툴팁이 나타나는 지연 시간을 밀리초
                단위로 설정할 수 있습니다. 기본값은 200ms입니다.
              </Body>
            </SectionHeading>
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

            {/* With Icon Button */}
            <SectionHeading
              level="h3"
              id="icon-button"
              title="아이콘 버튼과 함께 사용"
            >
              <Body>
                텍스트 레이블이 없는 아이콘 버튼의 기능을 설명할 때 툴팁을
                사용하세요.
              </Body>
            </SectionHeading>
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

            {/* Disabled */}
            <SectionHeading level="h3" id="disabled" title="비활성화">
              <Body>
                <code>disabled</code> prop으로 툴팁을 비활성화할 수 있습니다.
              </Body>
            </SectionHeading>
            <ComponentPreview>
              <Tooltip content="활성화된 툴팁">
                <Button>Enabled</Button>
              </Tooltip>
              <Tooltip content="이 툴팁은 표시되지 않습니다" disabled>
                <Button>Disabled Tooltip</Button>
              </Tooltip>
            </ComponentPreview>
            <CodeBlock
              code={`<Tooltip content="활성화된 툴팁">
  <Button>Enabled</Button>
</Tooltip>

<Tooltip content="이 툴팁은 표시되지 않습니다" disabled>
  <Button>Disabled Tooltip</Button>
</Tooltip>`}
            />

            {/* Custom Styling */}
            <SectionHeading
              level="h3"
              id="custom-styling"
              title="커스텀 스타일링"
            >
              <Body>
                <code>className</code>과 <code>wrapperClassName</code> prop으로
                툴팁을 커스터마이징할 수 있습니다.
              </Body>
            </SectionHeading>
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

            <SectionHeading
              level="h2"
              id="foundation-layer"
              title="기반 레이어"
            >
              <Body className="leading-relaxed">
                HANUI Tooltip은 Foundation Layer의 자동화된 접근성 기능을
                제공합니다. 개발자가 별도로 ARIA 속성이나 이벤트 핸들러를 작성할
                필요 없이, 컴포넌트가 모든 접근성 기능을 자동으로 처리합니다.
              </Body>
            </SectionHeading>

            <SectionHeading
              level="h3"
              id="aria-automation"
              title="1. ARIA Automation"
            >
              <ul className="list-disc list-inside space-y-2 text-krds-gray-90">
                <li>
                  <code>aria-labelledby</code> 속성을 활성화 버튼에 자동 연결
                  (KRDS 2.2 요구사항)
                </li>
                <li>고유한 ID를 자동 생성하여 ARIA 관계 설정</li>
                <li>
                  <code>role=&quot;tooltip&quot;</code> 속성 자동 적용
                </li>
              </ul>
            </SectionHeading>

            <SectionHeading
              level="h3"
              id="focus-management"
              title="2. Focus Management"
            >
              <ul className="list-disc list-inside space-y-2 text-krds-gray-90">
                <li>마우스 호버와 키보드 포커스를 모두 감지</li>
                <li>
                  Blur 이벤트 자동 처리 (Tab/Shift+Tab으로 포커스 이동 시 툴팁
                  숨김)
                </li>
                <li>ESC 키로 툴팁 닫기 후 활성화 버튼으로 포커스 자동 복원</li>
              </ul>
            </SectionHeading>

            <SectionHeading
              level="h3"
              id="keyboard-navigation"
              title="3. Keyboard Navigation"
            >
              <ul className="list-disc list-inside space-y-2 text-krds-gray-90">
                <li>Tab 키로 활성화 버튼에 포커스 → 툴팁 자동 표시</li>
                <li>Shift + Tab으로 역방향 이동 → 툴팁 자동 숨김</li>
                <li>ESC 키로 툴팁 닫기 및 포커스 복원</li>
              </ul>
            </SectionHeading>

            <SectionHeading
              level="h3"
              id="event-cleanup"
              title="4. Event Cleanup"
            >
              <ul className="list-disc list-inside space-y-2 text-krds-gray-90">
                <li>컴포넌트 언마운트 시 모든 이벤트 리스너 자동 제거</li>
                <li>타이머 자동 정리로 메모리 누수 방지</li>
                <li>React useEffect cleanup 함수로 안전한 정리 보장</li>
              </ul>
            </SectionHeading>
          </TabsContent>

          <TabsContent value="api">
            <SectionHeading level="h2" id="props" title="Props" />

            <div className="overflow-x-auto">
              <table className="min-w-full border border-krds-gray-20">
                <thead className="bg-krds-gray-5">
                  <tr>
                    <th className="px-4 py-2 text-left border-b border-krds-gray-20">
                      Prop
                    </th>
                    <th className="px-4 py-2 text-left border-b border-krds-gray-20">
                      Type
                    </th>
                    <th className="px-4 py-2 text-left border-b border-krds-gray-20">
                      Default
                    </th>
                    <th className="px-4 py-2 text-left border-b border-krds-gray-20">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr>
                    <td className="px-4 py-2 border-b border-krds-gray-20 font-mono">
                      content
                    </td>
                    <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-xs">
                      React.ReactNode
                    </td>
                    <td className="px-4 py-2 border-b border-krds-gray-20">
                      -
                    </td>
                    <td className="px-4 py-2 border-b border-krds-gray-20">
                      툴팁에 표시할 콘텐츠 (필수)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-krds-gray-20 font-mono">
                      children
                    </td>
                    <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-xs">
                      React.ReactElement
                    </td>
                    <td className="px-4 py-2 border-b border-krds-gray-20">
                      -
                    </td>
                    <td className="px-4 py-2 border-b border-krds-gray-20">
                      툴팁을 트리거할 활성화 버튼 요소 (필수)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-krds-gray-20 font-mono">
                      variant
                    </td>
                    <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-xs">
                      &quot;default&quot; | &quot;light&quot;
                    </td>
                    <td className="px-4 py-2 border-b border-krds-gray-20">
                      &quot;default&quot;
                    </td>
                    <td className="px-4 py-2 border-b border-krds-gray-20">
                      툴팁 스타일 변형
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-krds-gray-20 font-mono">
                      position
                    </td>
                    <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-xs">
                      &quot;top&quot; | &quot;right&quot; | &quot;bottom&quot; |
                      &quot;left&quot;
                    </td>
                    <td className="px-4 py-2 border-b border-krds-gray-20">
                      &quot;top&quot;
                    </td>
                    <td className="px-4 py-2 border-b border-krds-gray-20">
                      툴팁 표시 위치
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-krds-gray-20 font-mono">
                      delay
                    </td>
                    <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-xs">
                      number
                    </td>
                    <td className="px-4 py-2 border-b border-krds-gray-20">
                      200
                    </td>
                    <td className="px-4 py-2 border-b border-krds-gray-20">
                      툴팁이 나타나기 전 지연 시간 (밀리초)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-krds-gray-20 font-mono">
                      disabled
                    </td>
                    <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-xs">
                      boolean
                    </td>
                    <td className="px-4 py-2 border-b border-krds-gray-20">
                      false
                    </td>
                    <td className="px-4 py-2 border-b border-krds-gray-20">
                      툴팁 비활성화 여부
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-krds-gray-20 font-mono">
                      className
                    </td>
                    <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-xs">
                      string
                    </td>
                    <td className="px-4 py-2 border-b border-krds-gray-20">
                      -
                    </td>
                    <td className="px-4 py-2 border-b border-krds-gray-20">
                      툴팁 컨테이너에 적용할 추가 CSS 클래스
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-krds-gray-20 font-mono">
                      wrapperClassName
                    </td>
                    <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-xs">
                      string
                    </td>
                    <td className="px-4 py-2 border-b border-krds-gray-20">
                      -
                    </td>
                    <td className="px-4 py-2 border-b border-krds-gray-20">
                      래퍼에 적용할 추가 CSS 클래스
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </PageSection>
    </>
  );
}
