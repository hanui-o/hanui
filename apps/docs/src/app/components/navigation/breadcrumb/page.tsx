import { Breadcrumb, BreadcrumbItem, Stack, Heading, Body } from '@hanui/react';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';
import { CodeBlock } from '@/components/content/CodeBlock';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { GuidelineSection } from '@/components/content/GuidelineSection';

export default function BreadcrumbPage() {
  return (
    <>
      {/* Header */}
      <PageHeader
        title="Breadcrumb"
        description="탐색 계층 구조를 표시하여 사용자가 현재 위치를 파악하고 계층 구조의 수준을 이동할 수 있게 해주는 네비게이션 컴포넌트입니다."
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
              기본 사용 (권장)
            </Heading>
            <Body color="secondary">
              첫 번째 아이템에 isHome prop을 설정하여 홈 링크를 표시합니다.
              마지막 아이템에 current prop을 설정하여 현재 페이지를 나타냅니다.
            </Body>
            <div>
              <ComponentPreview>
                <Breadcrumb>
                  <BreadcrumbItem href="/" isHome>
                    홈
                  </BreadcrumbItem>
                  <BreadcrumbItem href="/notice">공지사항</BreadcrumbItem>
                  <BreadcrumbItem current>상세보기</BreadcrumbItem>
                </Breadcrumb>
              </ComponentPreview>

              <div className="mt-4">
                <CodeBlock
                  language="tsx"
                  code={`import { Breadcrumb, BreadcrumbItem } from '@hanui/react';

<Breadcrumb>
  <BreadcrumbItem href="/" isHome>
    홈
  </BreadcrumbItem>
  <BreadcrumbItem href="/notice">공지사항</BreadcrumbItem>
  <BreadcrumbItem current>상세보기</BreadcrumbItem>
</Breadcrumb>`}
                />
              </div>
            </div>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading
              level="h3"
              id="usage-service"
              className="text-lg font-medium"
            >
              서비스 신청 경로
            </Heading>
            <Body color="secondary">
              정부 서비스 신청 흐름을 보여주는 브레드크럼 예제입니다.
            </Body>
            <div>
              <ComponentPreview>
                <Breadcrumb>
                  <BreadcrumbItem href="/" isHome>
                    홈
                  </BreadcrumbItem>
                  <BreadcrumbItem href="/service">서비스 신청</BreadcrumbItem>
                  <BreadcrumbItem current>서비스 신청2</BreadcrumbItem>
                </Breadcrumb>
              </ComponentPreview>

              <div className="mt-4">
                <CodeBlock
                  language="tsx"
                  code={`import { Breadcrumb, BreadcrumbItem } from '@hanui/react';

<Breadcrumb>
  <BreadcrumbItem href="/" isHome>
    홈
  </BreadcrumbItem>
  <BreadcrumbItem href="/service">서비스 신청</BreadcrumbItem>
  <BreadcrumbItem current>서비스 신청2</BreadcrumbItem>
</Breadcrumb>`}
                />
              </div>
            </div>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading
              level="h3"
              id="usage-separator"
              className="text-lg font-medium"
            >
              커스텀 구분자
            </Heading>
            <Body color="secondary">
              separator prop으로 구분자를 커스터마이징할 수 있습니다.
            </Body>
            <div>
              <ComponentPreview>
                <Breadcrumb separator="/">
                  <BreadcrumbItem href="/" isHome>
                    홈
                  </BreadcrumbItem>
                  <BreadcrumbItem href="/products">제품</BreadcrumbItem>
                  <BreadcrumbItem href="/products/electronics">
                    전자제품
                  </BreadcrumbItem>
                  <BreadcrumbItem current>노트북</BreadcrumbItem>
                </Breadcrumb>
              </ComponentPreview>

              <div className="mt-4">
                <CodeBlock
                  language="tsx"
                  code={`import { Breadcrumb, BreadcrumbItem } from '@hanui/react';

<Breadcrumb separator="/">
  <BreadcrumbItem href="/" isHome>
    홈
  </BreadcrumbItem>
  <BreadcrumbItem href="/products">제품</BreadcrumbItem>
  <BreadcrumbItem href="/products/electronics">
    전자제품
  </BreadcrumbItem>
  <BreadcrumbItem current>노트북</BreadcrumbItem>
</Breadcrumb>`}
                />
              </div>
            </div>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading
              level="h3"
              id="usage-long-text"
              className="text-lg font-medium"
            >
              긴 텍스트 자동 처리
            </Heading>
            <Body color="secondary">
              긴 텍스트는 자동으로 말줄임(ellipsis)으로 표시되며, 마우스를
              올리면 전체 텍스트를 툴팁으로 확인할 수 있습니다.
            </Body>
            <div>
              <ComponentPreview>
                <Breadcrumb>
                  <BreadcrumbItem href="/" isHome>
                    홈
                  </BreadcrumbItem>
                  <BreadcrumbItem href="/government">
                    정부 서비스
                  </BreadcrumbItem>
                  <BreadcrumbItem href="/government/digital">
                    디지털 정부혁신
                  </BreadcrumbItem>
                  <BreadcrumbItem current>
                    디지털 서비스 표준 가이드라인 및 적용 방안
                  </BreadcrumbItem>
                </Breadcrumb>
              </ComponentPreview>

              <div className="mt-4">
                <CodeBlock
                  language="tsx"
                  code={`import { Breadcrumb, BreadcrumbItem } from '@hanui/react';

<Breadcrumb>
  <BreadcrumbItem href="/" isHome>
    홈
  </BreadcrumbItem>
  <BreadcrumbItem href="/government">
    정부 서비스
  </BreadcrumbItem>
  <BreadcrumbItem href="/government/digital">
    디지털 정부혁신
  </BreadcrumbItem>
  <BreadcrumbItem current>
    디지털 서비스 표준 가이드라인 및 적용 방안
  </BreadcrumbItem>
</Breadcrumb>`}
                />
              </div>
            </div>
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
              <li>다층 구조의 계층형 네비게이션이 있을 때</li>
              <li>사용자가 현재 위치를 파악해야 할 때</li>
              <li>상위 레벨로 빠르게 이동해야 할 때</li>
              <li>정부 디지털 서비스의 표준 네비게이션 제공 시</li>
            </ul>
          </GuidelineSection>

          <GuidelineSection title="언제 사용하지 않나요?" type="dont">
            <ul className="list-disc list-inside space-y-2">
              <li>단일 레벨 사이트 (계층 구조가 없을 때)</li>
              <li>메인 페이지나 랜딩 페이지</li>
              <li>
                진행 단계 표시 (단계별 프로세스는 Step Indicator 사용 권장)
              </li>
              <li>메인 메뉴나 사이드바를 대체하는 용도</li>
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
              <strong>Semantic Structure:</strong> nav 요소와 ordered list로
              구조화되어 스크린 리더가 네비게이션 랜드마크로 인식합니다.
              <br />
              <br />
              <strong>ARIA Labels:</strong>{' '}
              aria-label=&quot;브레드크럼&quot;으로 네비게이션 목적을 명확히
              전달합니다.
              <br />
              <br />
              <strong>Visual Contrast:</strong> 구분자는 배경과 최소 3:1
              명암비를 유지하며, 링크에는 밑줄과 호버 효과를 제공합니다.
            </Body>
          </Stack>

          <Stack spacing="content-tight">
            <Heading level="h3" id="keyboard-navigation" className="text-lg">
              키보드 내비게이션
            </Heading>
            <Body>
              <strong>Tab:</strong> 다음 브레드크럼 링크로 포커스 이동
              <br />
              <strong>Shift + Tab:</strong> 이전 브레드크럼 링크로 포커스 이동
              <br />
              <strong>Enter / Click:</strong> 링크된 페이지로 이동
            </Body>
          </Stack>

          <Stack spacing="content-tight">
            <Heading level="h3" id="screen-reader" className="text-lg">
              스크린 리더 지원
            </Heading>
            <Body>
              - 스크린 리더는 &quot;브레드크럼 네비게이션&quot;으로 인식합니다
              <br />
              - 구분자는 aria-hidden=&quot;true&quot;로 스크린 리더에서
              숨겨집니다
              <br />
              - 현재 페이지는 aria-current=&quot;page&quot;로 명확히 표시됩니다
              <br />- 각 링크의 텍스트가 명확하게 읽힙니다
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
            <Heading level="h3" id="home-first" className="text-lg">
              1. 홈 링크 우선
            </Heading>
            <Body>
              항상 메인 화면 링크를 첫 번째 아이템으로 포함합니다. isHome prop을
              설정하여 KRDS 표준 &quot;home&quot; 클래스가 자동으로 적용됩니다.
            </Body>
          </Stack>

          <Stack spacing="content-tight">
            <Heading level="h3" id="single-line" className="text-lg">
              2. 단일 라인 유지
            </Heading>
            <Body>
              브레드크럼은 항상 단일 라인으로 표시됩니다. 긴 경로는 자동으로
              말줄임 처리되며, 데스크톱에서는 최대 4개 링크, 모바일에서는 첫
              번째와 마지막 경로만 표시하고 중간은 생략 기호로 처리할 수
              있습니다.
            </Body>
          </Stack>

          <Stack spacing="content-tight">
            <Heading level="h3" id="positioning" className="text-lg">
              3. 위치 및 정렬
            </Heading>
            <Body>
              페이지 제목 위에 배치하고 왼쪽 정렬합니다. 경로 링크 간 충분한
              간격을 제공하여 가독성을 높입니다.
            </Body>
          </Stack>

          <Stack spacing="content-tight">
            <Heading level="h3" id="visual-hierarchy" className="text-lg">
              4. 시각적 계층 구조
            </Heading>
            <Body>
              구분자로 시각적 계층을 제공하며, 현재 페이지는 굵은 글씨로
              강조됩니다. 링크에는 밑줄과 호버 효과로 클릭 가능함을 명확히
              표시합니다.
            </Body>
          </Stack>
        </Stack>
      </PageSection>

      {/* API Reference */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading
            level="h2"
            id="api-reference"
            className="text-2xl font-semibold"
          >
            API Reference
          </Heading>

          <Stack spacing="heading-tight">
            <Heading level="h3" id="breadcrumb-props" className="text-lg">
              Breadcrumb Props
            </Heading>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-krds-gray-20">
                    <th className="text-left py-2 px-4">Prop</th>
                    <th className="text-left py-2 px-4">Type</th>
                    <th className="text-left py-2 px-4">Default</th>
                    <th className="text-left py-2 px-4">Description</th>
                  </tr>
                </thead>
                <tbody className="text-krds-gray-90">
                  <tr className="border-b border-krds-gray-20">
                    <td className="py-2 px-4 font-mono">separator</td>
                    <td className="py-2 px-4 font-mono">ReactNode</td>
                    <td className="py-2 px-4 font-mono">&quot;&gt;&quot;</td>
                    <td className="py-2 px-4">
                      아이템 간 커스텀 구분자 (예: &quot;/&quot;,
                      &quot;&gt;&quot;)
                    </td>
                  </tr>
                  <tr className="border-b border-krds-gray-20">
                    <td className="py-2 px-4 font-mono">className</td>
                    <td className="py-2 px-4 font-mono">string</td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">추가 CSS 클래스</td>
                  </tr>
                  <tr className="border-b border-krds-gray-20">
                    <td className="py-2 px-4 font-mono">children</td>
                    <td className="py-2 px-4 font-mono">ReactNode</td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">
                      BreadcrumbItem 컴포넌트들 (필수)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Body className="mt-2">
              <strong>중요:</strong> Breadcrumb는 자동으로 .krds-breadcrumb-wrap
              클래스와 aria-label=&quot;브레드크럼&quot;을 적용하여 KRDS 표준을
              준수합니다.
            </Body>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3" id="breadcrumbitem-props" className="text-lg">
              BreadcrumbItem Props
            </Heading>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-krds-gray-20">
                    <th className="text-left py-2 px-4">Prop</th>
                    <th className="text-left py-2 px-4">Type</th>
                    <th className="text-left py-2 px-4">Default</th>
                    <th className="text-left py-2 px-4">Description</th>
                  </tr>
                </thead>
                <tbody className="text-krds-gray-90">
                  <tr className="border-b border-krds-gray-20">
                    <td className="py-2 px-4 font-mono">href</td>
                    <td className="py-2 px-4 font-mono">string</td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">
                      링크 URL (현재 페이지가 아닐 때)
                    </td>
                  </tr>
                  <tr className="border-b border-krds-gray-20">
                    <td className="py-2 px-4 font-mono">current</td>
                    <td className="py-2 px-4 font-mono">boolean</td>
                    <td className="py-2 px-4">false</td>
                    <td className="py-2 px-4">
                      현재 페이지 여부 (aria-current=&quot;page&quot; 설정)
                    </td>
                  </tr>
                  <tr className="border-b border-krds-gray-20">
                    <td className="py-2 px-4 font-mono">isHome</td>
                    <td className="py-2 px-4 font-mono">boolean</td>
                    <td className="py-2 px-4">false</td>
                    <td className="py-2 px-4">
                      홈 아이템 여부 (KRDS &quot;home&quot; 클래스 자동 적용)
                    </td>
                  </tr>
                  <tr className="border-b border-krds-gray-20">
                    <td className="py-2 px-4 font-mono">className</td>
                    <td className="py-2 px-4 font-mono">string</td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">추가 CSS 클래스</td>
                  </tr>
                  <tr className="border-b border-krds-gray-20">
                    <td className="py-2 px-4 font-mono">children</td>
                    <td className="py-2 px-4 font-mono">ReactNode</td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">
                      아이템 텍스트 또는 콘텐츠 (필수)
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
            기반 레이어
          </Heading>

          <Body>
            Breadcrumb 컴포넌트는 HANUI의 Foundation Layer를 통해 다음 5가지
            핵심 기능을 자동으로 제공합니다:
          </Body>

          <Stack spacing="content-tight">
            <Heading level="h3" id="fl-required-class" className="text-lg">
              1. Required CSS Class (.krds-breadcrumb-wrap)
            </Heading>
            <Body>
              KRDS 표준에서 요구하는 .krds-breadcrumb-wrap 클래스가 자동으로
              적용됩니다. 개발자가 수동으로 클래스를 추가할 필요가 없습니다.
            </Body>
          </Stack>

          <Stack spacing="content-tight">
            <Heading level="h3" id="fl-semantic" className="text-lg">
              2. Semantic HTML
            </Heading>
            <Body>
              nav 요소와 ordered list(ol) 구조가 자동으로 생성되어 스크린 리더가
              네비게이션 랜드마크로 인식합니다.
              aria-label=&quot;브레드크럼&quot;이 자동으로 설정됩니다.
            </Body>
          </Stack>

          <Stack spacing="content-tight">
            <Heading level="h3" id="fl-wcag" className="text-lg">
              3. WCAG 2.1 / KWCAG 2.2 Compliance
            </Heading>
            <Body>
              키보드 네비게이션, 포커스 관리, ARIA 속성이 자동으로 처리됩니다.
              구분자는 aria-hidden=&quot;true&quot;로 스크린 리더에서 숨겨지며,
              현재 페이지는 aria-current=&quot;page&quot;로 명확히 표시됩니다.
            </Body>
          </Stack>

          <Stack spacing="content-tight">
            <Heading level="h3" id="fl-screen-reader" className="text-lg">
              4. Screen Reader Support
            </Heading>
            <Body>
              시맨틱 HTML과 적절한 ARIA 레이블로 보조 기술과의 호환성을
              보장합니다. 구분자는 스크린 리더에서 숨겨지고, 경로 구조만
              명확하게 전달됩니다.
            </Body>
          </Stack>

          <Stack spacing="content-tight">
            <Heading level="h3" id="fl-visual-hierarchy" className="text-lg">
              5. Visual Hierarchy
            </Heading>
            <Body>
              구분자는 배경과 3:1 명암비를 유지하며, 링크에는 밑줄과 호버 효과가
              자동으로 적용됩니다. 긴 텍스트는 말줄임 처리되고 툴팁으로 전체
              내용을 확인할 수 있습니다.
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
