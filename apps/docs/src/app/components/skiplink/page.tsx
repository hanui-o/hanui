import { Stack, Heading, Body } from '@hanui/react';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';
import { CodeBlock } from '@/components/content/CodeBlock';
import { GuidelineSection } from '@/components/content/GuidelineSection';

export default function SkipLinkPage() {
  return (
    <>
      {/* Header */}
      <PageHeader
        title="SkipLink (건너뛰기 링크)"
        description="키보드 및 스크린 리더 사용자가 반복적인 콘텐츠를 건너뛰고 주요 콘텐츠로 바로 이동할 수 있도록 돕는 내부 페이지 탐색 도구입니다."
      />

      {/* Usage Examples */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="usage" className="text-2xl font-semibold">
            사용 예제
          </Heading>

          <Stack spacing="heading-tight">
            <Heading
              level="h3"
              id="usage-basic"
              className="text-lg font-medium"
            >
              기본 사용 (Hidden Variant)
            </Heading>
            <Body color="secondary">
              기본적으로 숨겨진 상태로, Tab 키를 눌러 포커스를 받으면 화면에
              나타납니다.
            </Body>
            <CodeBlock
              code={`import { SkipLink } from '@hanui/react';

export default function Page() {
  return (
    <SkipLink
      links={[
        { href: '#main-content', label: '본문 바로가기' },
        { href: '#main-navigation', label: '주 메뉴 바로가기' },
      ]}
    />
  );
}`}
              language="tsx"
            />
          </Stack>

          <Stack spacing="heading-tight">
            <Heading
              level="h3"
              id="usage-visible"
              className="text-lg font-medium"
            >
              항상 표시 (Visible Variant)
            </Heading>
            <Body color="secondary">
              variant를 &quot;visible&quot;로 설정하면 항상 화면에 표시됩니다.
            </Body>
            <CodeBlock
              code={`import { SkipLink } from '@hanui/react';

export default function Page() {
  return (
    <SkipLink
      variant="visible"
      links={[
        { href: '#main-content', label: '본문 바로가기' },
        { href: '#main-navigation', label: '주 메뉴 바로가기' },
        { href: '#footer', label: '하단 메뉴 바로가기' },
      ]}
    />
  );
}`}
              language="tsx"
            />
          </Stack>

          <Stack spacing="heading-tight">
            <Heading
              level="h3"
              id="usage-single-link"
              className="text-lg font-medium"
            >
              단일 링크 (권장)
            </Heading>
            <Body color="secondary">
              대부분의 경우 본문으로 바로가기 링크 하나만 제공하는 것이
              권장됩니다.
            </Body>
            <CodeBlock
              code={`import { SkipLink } from '@hanui/react';

export default function Page() {
  return (
    <SkipLink
      links={[{ href: '#main-content', label: '본문 바로가기' }]}
    />
  );
}`}
              language="tsx"
            />
          </Stack>

          <Stack spacing="heading-tight">
            <Heading
              level="h3"
              id="usage-page-structure"
              className="text-lg font-medium"
            >
              페이지 구조 내 위치 (권장)
            </Heading>
            <Body color="secondary">
              SkipLink는 페이지의 첫 번째 요소로 배치되어야 합니다 (쿠키
              배너/모달 제외). 대상 요소에는 tabIndex=-1을 설정해야 합니다.
            </Body>
            <CodeBlock
              code={`import { SkipLink, Masthead } from '@hanui/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SkipLink
          links={[
            { href: '#main-content', label: '본문 바로가기' },
            { href: '#main-navigation', label: '주 메뉴 바로가기' },
          ]}
        />
        <Masthead />
        <header id="main-navigation" tabIndex={-1}>
          <!-- Navigation content -->
        </header>
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <footer>
          <!-- Footer content -->
        </footer>
      </body>
    </html>
  );
}`}
              language="tsx"
            />
          </Stack>
        </Stack>
      </PageSection>

      {/* Guidelines */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading
            level="h2"
            id="guidelines"
            className="text-2xl font-semibold"
          >
            사용 가이드라인
          </Heading>

          <GuidelineSection title="언제 사용하나요?" type="do">
            <ul className="list-disc list-inside space-y-2">
              <li>모든 정부 디지털 서비스의 첫 번째 요소로 사용</li>
              <li>키보드 사용자의 접근성을 개선하고자 할 때</li>
              <li>스크린 리더 사용자가 반복 콘텐츠를 건너뛸 수 있도록 할 때</li>
              <li>헤더, 네비게이션, 사이드바 등 반복적인 영역이 있을 때</li>
            </ul>
          </GuidelineSection>

          <GuidelineSection title="언제 사용하지 않나요?" type="dont">
            <ul className="list-disc list-inside space-y-2">
              <li>페이지에 반복적인 콘텐츠가 없을 때</li>
              <li>
                단일 페이지 앱에서 콘텐츠가 동적으로 변경될 때 (대체 방법 필요)
              </li>
              <li>외부 링크로 이동할 때 (내부 앵커 링크만 사용)</li>
              <li>3개 이상의 링크를 제공할 때 (최대 3개 권장)</li>
            </ul>
          </GuidelineSection>
        </Stack>
      </PageSection>

      {/* Accessibility */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading
            level="h2"
            id="accessibility"
            className="text-2xl font-semibold"
          >
            접근성
          </Heading>

          <Stack spacing="content-tight">
            <Heading level="h3" id="wcag-compliance" className="text-lg">
              WCAG 2.1 / KWCAG 2.2 준수
            </Heading>
            <Body>
              이 컴포넌트는 다음 접근성 기준을 준수합니다:
              <br />
              <br />
              <strong>Bypass Blocks (Level A):</strong> 키보드 사용자가 반복
              콘텐츠를 건너뛸 수 있는 메커니즘을 제공합니다.
              <br />
              <br />
              <strong>Focus Visible (Level AA):</strong> 포커스를 받은 링크는
              시각적으로 명확하게 구분됩니다.
              <br />
              <br />
              <strong>Keyboard Accessible (Level A):</strong> Tab 키로 이동하고
              Enter 키로 활성화할 수 있습니다.
            </Body>
          </Stack>

          <Stack spacing="content-tight">
            <Heading level="h3" id="keyboard-navigation" className="text-lg">
              키보드 내비게이션
            </Heading>
            <Body>
              <strong>Tab:</strong> SkipLink로 포커스 이동 (hidden variant의
              경우 포커스를 받으면 화면에 나타남)
              <br />
              <strong>Enter:</strong> 링크 활성화 및 대상 위치로 스크롤
              <br />
              <strong>Shift + Tab:</strong> 이전 포커스 가능 요소로 이동
            </Body>
          </Stack>

          <Stack spacing="content-tight">
            <Heading level="h3" id="screen-reader" className="text-lg">
              스크린 리더 지원
            </Heading>
            <Body>
              - 스크린 리더는 &quot;Skip navigation&quot; 내비게이션 랜드마크로
              인식합니다
              <br />
              - 각 링크의 label이 명확하게 읽힙니다
              <br />- 대상 요소로 이동 시 포커스가 자동으로 설정됩니다
            </Body>
          </Stack>

          <Stack spacing="content-tight">
            <Heading level="h3" id="target-element-setup" className="text-lg">
              대상 요소 설정
            </Heading>
            <Body>
              SkipLink의 대상 요소는 다음 요구사항을 만족해야 합니다:
              <br />
              <br />
              1. <strong>ID 속성:</strong> href에 지정된 ID를 가져야 합니다 (예:
              id=&quot;main-content&quot;)
              <br />
              2. <strong>tabIndex:</strong> tabIndex=-1을 설정하여 프로그래밍
              방식의 포커스를 받을 수 있어야 합니다
              <br />
              3. <strong>의미 있는 요소:</strong> main, nav, header, footer 등
              시맨틱 HTML 요소를 사용하는 것이 권장됩니다
            </Body>
          </Stack>
        </Stack>
      </PageSection>

      {/* Design Principles */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading
            level="h2"
            id="design-principles"
            className="text-2xl font-semibold"
          >
            디자인 원칙
          </Heading>

          <Stack spacing="content-tight">
            <Heading level="h3" id="first-element" className="text-lg">
              1. 첫 번째 요소 배치
            </Heading>
            <Body>
              SkipLink는 페이지의 첫 번째 요소로 배치되어야 합니다. 쿠키 배너나
              모달과 같은 임시 요소를 제외하고, body 태그의 첫 번째 자식으로
              위치해야 합니다.
            </Body>
          </Stack>

          <Stack spacing="content-tight">
            <Heading level="h3" id="link-limit" className="text-lg">
              2. 링크 개수 제한
            </Heading>
            <Body>
              최대 3개의 링크를 제공하는 것이 권장됩니다. 너무 많은 링크는
              오히려 사용성을 저하시킬 수 있습니다. 가장 중요한 영역(일반적으로
              본문)으로의 링크를 우선적으로 제공하세요.
            </Body>
          </Stack>

          <Stack spacing="content-tight">
            <Heading level="h3" id="focus-indicator" className="text-lg">
              3. 명확한 포커스 표시
            </Heading>
            <Body>
              포커스를 받은 링크는 시각적으로 명확하게 구분되어야 합니다.
              기본적으로 흰색 링 스타일의 포커스 인디케이터가 제공되며, 파란색
              배경 위에서 잘 보입니다.
            </Body>
          </Stack>

          <Stack spacing="content-tight">
            <Heading level="h3" id="smooth-scroll" className="text-lg">
              4. 부드러운 스크롤
            </Heading>
            <Body>
              링크 클릭 시 대상 위치로 부드럽게 스크롤되며, 대상 요소에 자동으로
              포커스가 설정됩니다. 이는 사용자가 현재 위치를 명확하게 인식할 수
              있도록 돕습니다.
            </Body>
          </Stack>
        </Stack>
      </PageSection>

      {/* API Reference */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="api" className="text-2xl font-semibold">
            API Reference
          </Heading>

          <Stack spacing="heading-tight">
            <Heading level="h3" id="skiplink-props" className="text-lg">
              SkipLink Props
            </Heading>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-2 px-4">Prop</th>
                    <th className="text-left py-2 px-4">Type</th>
                    <th className="text-left py-2 px-4">Default</th>
                    <th className="text-left py-2 px-4">Description</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  <tr className="border-b border-gray-100 dark:border-gray-900">
                    <td className="py-2 px-4 font-mono">links</td>
                    <td className="py-2 px-4 font-mono">SkipLinkItem[]</td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">
                      Skip link 항목 배열 (최대 3개 권장, 필수)
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-900">
                    <td className="py-2 px-4 font-mono">variant</td>
                    <td className="py-2 px-4 font-mono">
                      &quot;visible&quot; | &quot;hidden&quot;
                    </td>
                    <td className="py-2 px-4 font-mono">&quot;hidden&quot;</td>
                    <td className="py-2 px-4">
                      시각적 변형. &quot;hidden&quot;은 포커스 시에만 표시,
                      &quot;visible&quot;은 항상 표시
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-900">
                    <td className="py-2 px-4 font-mono">className</td>
                    <td className="py-2 px-4 font-mono">string</td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">추가 CSS 클래스</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Body className="mt-2">
              <strong>중요:</strong> SkipLink는 자동으로 #krds-skip-link ID를
              적용하여 KRDS 표준을 준수합니다.
            </Body>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3" id="skiplinkitem-type" className="text-lg">
              SkipLinkItem Type
            </Heading>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-2 px-4">Property</th>
                    <th className="text-left py-2 px-4">Type</th>
                    <th className="text-left py-2 px-4">Description</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  <tr className="border-b border-gray-100 dark:border-gray-900">
                    <td className="py-2 px-4 font-mono">href</td>
                    <td className="py-2 px-4 font-mono">string</td>
                    <td className="py-2 px-4">
                      링크 대상 (예: &quot;#main-content&quot;, 필수)
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-900">
                    <td className="py-2 px-4 font-mono">label</td>
                    <td className="py-2 px-4 font-mono">string</td>
                    <td className="py-2 px-4">
                      링크 레이블 텍스트 (예: &quot;본문 바로가기&quot;, 필수)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Stack>
        </Stack>
      </PageSection>

      {/* Foundation Layer */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading
            level="h2"
            id="foundation-layer"
            className="text-2xl font-semibold"
          >
            Foundation Layer
          </Heading>

          <Body>
            SkipLink 컴포넌트는 HANUI의 Foundation Layer를 통해 다음 5가지 핵심
            기능을 자동으로 제공합니다:
          </Body>

          <Stack spacing="content-tight">
            <Heading level="h3" id="fl-required-id" className="text-lg">
              1. Required CSS ID (#krds-skip-link)
            </Heading>
            <Body>
              KRDS 표준에서 요구하는 #krds-skip-link ID가 자동으로 적용됩니다.
              개발자가 수동으로 ID를 추가할 필요가 없습니다.
            </Body>
          </Stack>

          <Stack spacing="content-tight">
            <Heading level="h3" id="fl-keyboard" className="text-lg">
              2. Keyboard Navigation
            </Heading>
            <Body>
              Tab 키로 링크 간 이동, Enter 키로 링크 활성화가 자동으로
              처리됩니다. 별도의 키보드 이벤트 핸들러를 구현할 필요가 없습니다.
            </Body>
          </Stack>

          <Stack spacing="content-tight">
            <Heading level="h3" id="fl-wcag" className="text-lg">
              3. WCAG 2.1 / KWCAG 2.2 Compliance
            </Heading>
            <Body>
              Bypass Blocks (Level A)와 Focus Visible (Level AA) 기준이 자동으로
              충족됩니다. 포커스 스타일과 키보드 접근성이 내장되어 있습니다.
            </Body>
          </Stack>

          <Stack spacing="content-tight">
            <Heading level="h3" id="fl-focus-management" className="text-lg">
              4. Focus Management
            </Heading>
            <Body>
              링크 클릭 시 대상 요소로 자동 스크롤되며, 대상 요소에 포커스가
              설정됩니다. tabIndex 설정과 스크롤 동작이 자동으로 처리됩니다.
            </Body>
          </Stack>

          <Stack spacing="content-tight">
            <Heading level="h3" id="fl-screen-reader" className="text-lg">
              5. Screen Reader Support
            </Heading>
            <Body>
              aria-label=&quot;Skip navigation&quot;을 통해 스크린 리더가
              내비게이션 랜드마크로 인식합니다. 시맨틱 nav 요소를 사용하여
              보조기술과의 호환성을 보장합니다.
            </Body>
          </Stack>

          <Body color="secondary" className="mt-4">
            이러한 자동화된 기능들은 개발자가 접근성 구현에 대한 깊은 지식
            없이도 KRDS 표준을 준수하는 컴포넌트를 쉽게 사용할 수 있도록
            돕습니다.
          </Body>
        </Stack>
      </PageSection>
    </>
  );
}
