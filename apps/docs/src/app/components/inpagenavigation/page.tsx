'use client';

import { useState } from 'react';

// Docs layout components
import {
  PageSection,
  SectionHeading,
  PageNavigation,
} from '@/components/content';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';

// UI components - from @hanui/react
import {
  InPageNavigation,
  InPageNavigationProps,
  InPageNavLink,
  Body,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@hanui/react';

export default function InPageNavigationPage() {
  const [activeExample, setActiveExample] = useState('basic');

  // Basic example
  const basicLinks: InPageNavLink[] = [
    { label: '서비스 개요', href: '#section_01', active: true },
    { label: '서비스 상세', href: '#section_02' },
    { label: '신청 방법 및 절차', href: '#section_03' },
    { label: '제출 서류', href: '#section_04' },
  ];

  // With action button example
  const actionLinks: InPageNavLink[] = [
    { label: '지원 대상', href: '#target', active: true },
    { label: '지원 내용', href: '#content' },
    { label: '신청 방법', href: '#apply' },
    { label: '문의처', href: '#contact' },
  ];

  const handleApply = () => {
    alert('온라인 신청하기 클릭됨');
  };

  return (
    <>
      <SectionHeading
        level="h1"
        title="In-page Navigation"
        description="페이지 내 콘텐츠 탐색을 위한 고정 사이드바 네비게이션 컴포넌트입니다."
      />

      <PageSection>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <PageSection>
              <ComponentPreview>
                <InPageNavigation
                  caption="이 페이지의 구성"
                  title="장애아동수당"
                  links={basicLinks}
                  className="!static !w-full"
                />
              </ComponentPreview>
            </PageSection>

            <SectionHeading level="h2" id="overview" title="개요">
              <Body className="leading-relaxed">
                In-page Navigation은 페이지 내 콘텐츠를 탐색하기 위한 고정
                사이드바 네비게이션 컴포넌트입니다. 스크롤 위치에 따라 자동으로
                활성 링크가 업데이트되며,{' '}
                <strong>KRDS(한국형 웹 콘텐츠 접근성 지침)</strong>을 준수하여
                공공 웹사이트에 최적화된 접근성과 사용성을 제공합니다.
              </Body>
            </SectionHeading>

            <SectionHeading level="h2" id="installation" title="설치" />
            <CodeBlock
              code="npx hanui add in-page-navigation"
              language="bash"
            />
            <Body className="text-krds-gray-70 mt-2">
              이 명령은 컴포넌트 파일(TSX)과 스타일 파일(SCSS Module)을 자동으로
              설치합니다.
            </Body>

            <SectionHeading level="h2" id="examples" title="예제" />

            <SectionHeading
              level="h3"
              id="basic-example"
              title="기본 In-page Navigation"
            >
              <Body>
                기본적인 In-page Navigation입니다. 스크롤 위치에 따라 자동으로
                활성 링크가 업데이트됩니다.
              </Body>
            </SectionHeading>
            <CodeBlock
              code={`import { InPageNavigation } from '@hanui/react';

const links = [
  { label: '서비스 개요', href: '#section_01', active: true },
  { label: '서비스 상세', href: '#section_02' },
  { label: '신청 방법 및 절차', href: '#section_03' },
  { label: '제출 서류', href: '#section_04' },
];

<InPageNavigation
  caption="이 페이지의 구성"
  title="장애아동수당"
  links={links}
/>`}
              language="tsx"
            />
            <div className="mt-6 p-6 border border-krds-gray-20 rounded-lg bg-krds-gray-5">
              <InPageNavigation
                caption="이 페이지의 구성"
                title="장애아동수당"
                links={basicLinks}
                className="!static !w-full"
              />
            </div>

            <SectionHeading
              level="h3"
              id="with-action-button"
              title="액션 버튼 포함"
            >
              <Body>
                액션 버튼과 추가 정보를 포함한 In-page Navigation입니다.
              </Body>
            </SectionHeading>
            <CodeBlock
              code={`import { InPageNavigation } from '@hanui/react';

const links = [
  { label: '지원 대상', href: '#target', active: true },
  { label: '지원 내용', href: '#content' },
  { label: '신청 방법', href: '#apply' },
  { label: '문의처', href: '#contact' },
];

<InPageNavigation
  caption="이 페이지의 구성"
  title="청년 주거지원 사업"
  links={links}
  action={{
    label: '온라인 신청하기',
    onClick: () => console.log('Apply'),
    info: '청년 주거지원 외 2건',
  }}
/>`}
              language="tsx"
            />
            <div className="mt-6 p-6 border border-krds-gray-20 rounded-lg bg-krds-gray-5">
              <InPageNavigation
                caption="이 페이지의 구성"
                title="청년 주거지원 사업"
                links={actionLinks}
                action={{
                  label: '온라인 신청하기',
                  onClick: handleApply,
                  info: '청년 주거지원 외 2건',
                }}
                className="!static !w-full"
              />
            </div>

            <SectionHeading
              level="h2"
              id="technical-background"
              title="기술적 배경"
            >
              <Body>
                In-page Navigation 컴포넌트는 KRDS(Korean Design System)의
                In-page Navigation 가이드라인을 기반으로 구현되었습니다.
              </Body>
            </SectionHeading>

            <SectionHeading level="h3" id="key-features" title="주요 기능" />
            <ul className="list-disc pl-6 space-y-2 text-base text-krds-gray-90">
              <li>
                <strong>Fixed Positioning:</strong> 데스크탑에서는 fixed
                사이드바로 표시되며, 모바일에서는 static으로 전환됩니다
              </li>
              <li>
                <strong>Auto-tracking:</strong> 스크롤 위치를 자동으로 추적하여
                현재 보고 있는 섹션의 링크를 활성화합니다
              </li>
              <li>
                <strong>Smooth Scrolling:</strong> 앵커 링크 클릭 시 부드러운
                스크롤 애니메이션을 제공합니다
              </li>
              <li>
                <strong>CSS Module:</strong> Self-contained SCSS로 구현되어 외부
                의존성이 없습니다
              </li>
              <li>
                <strong>Optional Action:</strong> 페이지 관련 액션 버튼을
                선택적으로 표시할 수 있습니다
              </li>
            </ul>

            <SectionHeading
              level="h3"
              id="scroll-tracking"
              title="스크롤 추적 로직"
            >
              <Body>
                컴포넌트는 `useEffect` 훅을 사용하여 스크롤 이벤트를 리스닝하고,
                각 섹션의 `getBoundingClientRect().top` 값을 계산하여 현재
                뷰포트 상단에 가장 가까운 섹션을 활성화합니다.
              </Body>
            </SectionHeading>
            <CodeBlock
              code={`useEffect(() => {
  const handleScroll = () => {
    const sections = links
      .map((link) => {
        const id = link.href.replace('#', '');
        const element = document.getElementById(id);
        return element
          ? { id: link.href, top: element.getBoundingClientRect().top }
          : null;
      })
      .filter(Boolean);

    const current = sections.find((section) => section.top >= 0) ||
                   sections[sections.length - 1];

    if (current) setActiveLink(current.id);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [links]);`}
              language="tsx"
            />

            <SectionHeading
              level="h3"
              id="responsive-behavior"
              title="반응형 동작"
            >
              <Body>
                In-page Navigation은 화면 크기에 따라 다르게 동작합니다:
              </Body>
            </SectionHeading>
            <ul className="list-disc pl-6 space-y-2 text-base text-krds-gray-90">
              <li>
                <strong>Desktop (1024px+):</strong> Fixed 사이드바로 표시되며,
                화면 우측에 고정됩니다
              </li>
              <li>
                <strong>Mobile (&lt;1024px):</strong> Static positioning으로
                전환되어 일반 블록 요소처럼 표시됩니다
              </li>
            </ul>

            <SectionHeading level="h2" id="accessibility" title="접근성">
              <Body>
                In-page Navigation 컴포넌트는 WCAG 2.1 / KWCAG 2.2 AA 레벨
                준수를 목표로 합니다:
              </Body>
            </SectionHeading>
            <ul className="list-disc pl-6 space-y-2 text-base text-krds-gray-90">
              <li>
                <strong>Semantic HTML:</strong> `&lt;nav&gt;` 요소를 사용하여
                네비게이션 영역을 명확히 표시합니다
              </li>
              <li>
                <strong>ARIA Labels:</strong> `aria-label="In-page
                navigation"`으로 네비게이션 목적을 명시합니다
              </li>
              <li>
                <strong>Current Location:</strong> `aria-current="location"`으로
                현재 보고 있는 섹션을 표시합니다
              </li>
              <li>
                <strong>Keyboard Navigation:</strong> Tab 키로 모든 링크에 접근
                가능하며, Enter 키로 활성화할 수 있습니다
              </li>
              <li>
                <strong>Focus Visible:</strong> 키보드 포커스 시 명확한
                아웃라인을 표시합니다
              </li>
              <li>
                <strong>High Contrast Mode:</strong> Windows 고대비 모드를
                지원합니다
              </li>
            </ul>
          </TabsContent>

          <TabsContent value="api">
            <SectionHeading
              level="h2"
              id="in-page-navigation-props"
              title="InPageNavigation Props"
            />
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-krds-gray-30">
                    <th className="text-left p-3 font-semibold">Prop</th>
                    <th className="text-left p-3 font-semibold">Type</th>
                    <th className="text-left p-3 font-semibold">Default</th>
                    <th className="text-left p-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-krds-gray-20">
                    <td className="p-3 font-mono">caption</td>
                    <td className="p-3 font-mono">string</td>
                    <td className="p-3 font-mono">-</td>
                    <td className="p-3">
                      Caption text (위 작은 텍스트). 예: "이 페이지의 구성"
                    </td>
                  </tr>
                  <tr className="border-b border-krds-gray-20">
                    <td className="p-3 font-mono">title</td>
                    <td className="p-3 font-mono">string</td>
                    <td className="p-3 font-mono">-</td>
                    <td className="p-3">Title text (주요 제목)</td>
                  </tr>
                  <tr className="border-b border-krds-gray-20">
                    <td className="p-3 font-mono">links</td>
                    <td className="p-3 font-mono">InPageNavLink[]</td>
                    <td className="p-3 font-mono">-</td>
                    <td className="p-3">
                      Navigation links 배열. 각 링크는 label과 href를 포함합니다
                    </td>
                  </tr>
                  <tr className="border-b border-krds-gray-20">
                    <td className="p-3 font-mono">action?</td>
                    <td className="p-3 font-mono">
                      {`{ label: string; onClick: () => void; info?: string }`}
                    </td>
                    <td className="p-3 font-mono">-</td>
                    <td className="p-3">
                      Optional action button 설정. label(버튼 텍스트),
                      onClick(클릭 핸들러), info(버튼 아래 설명 텍스트)를
                      포함합니다
                    </td>
                  </tr>
                  <tr className="border-b border-krds-gray-20">
                    <td className="p-3 font-mono">className?</td>
                    <td className="p-3 font-mono">string</td>
                    <td className="p-3 font-mono">''</td>
                    <td className="p-3">
                      Additional CSS classes for custom styling
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <SectionHeading
              level="h2"
              id="in-page-nav-link-type"
              title="InPageNavLink Type"
            >
              <Body>In-page Navigation 링크 아이템의 타입입니다:</Body>
            </SectionHeading>
            <CodeBlock
              code={`export interface InPageNavLink {
  label: string;   // Link label (표시 텍스트)
  href: string;    // Link URL (앵커, 예: '#section_01')
  active?: boolean; // 초기 활성 상태 (optional)
}`}
              language="tsx"
            />

            <SectionHeading
              level="h2"
              id="usage-notes"
              title="사용 시 주의사항"
            />
            <ul className="list-disc pl-6 space-y-2 text-base text-krds-gray-90">
              <li>
                `links` 배열의 `href`는 반드시 `#` + ID 형식이어야 합니다 (예:
                `#section_01`)
              </li>
              <li>
                연결하려는 섹션 요소에 해당 ID가 설정되어 있어야 스크롤 추적 및
                이동이 정상 작동합니다
              </li>
              <li>
                `active` 속성은 초기 활성 링크를 지정하는 용도이며, 이후 스크롤
                추적에 의해 자동으로 업데이트됩니다
              </li>
              <li>
                데스크탑 환경에서 fixed positioning을 사용하므로, 레이아웃 설계
                시 이를 고려해야 합니다
              </li>
              <li>
                액션 버튼의 `info` 속성은 HTML을 지원합니다
                (dangerouslySetInnerHTML 사용)
              </li>
            </ul>
          </TabsContent>
        </Tabs>
      </PageSection>

      <PageNavigation
        prev={{ title: 'Identifier', href: '/components/identifier' }}
        next={{ title: 'Input', href: '/components/input' }}
      />
    </>
  );
}
