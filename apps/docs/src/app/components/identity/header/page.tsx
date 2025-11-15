import { Stack, Heading, Body } from '@hanui/react';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';
import { CodeBlock } from '@/components/content/CodeBlock';
import { GuidelineSection } from '@/components/content/GuidelineSection';

export default function HeaderPage() {
  return (
    <>
      <PageHeader
        title="Header"
        description="정부 서비스의 일관된 브랜딩과 네비게이션을 제공하는 헤더 컴포넌트입니다. KRDS 표준을 준수하며, 로고, 유틸리티 링크, 검색, 메인 메뉴 등을 포함할 수 있습니다. [Phase 1: 기본 구조 완료]"
      />

      {/* 기본 사용법 */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="basic-usage">
            기본 사용법
          </Heading>
          <Body size="md" className="text-krds-gray-70">
            Header는 Compound Component 패턴을 사용하여 유연하게 구성할 수
            있습니다. 필요한 부분만 선택적으로 사용할 수 있습니다.
          </Body>

          <Stack spacing="heading-tight">
            <Heading
              level="h3"
              id="basic-example"
              className="text-lg font-medium"
            >
              기본 헤더
            </Heading>
            <CodeBlock
              code={`import { Header } from '@hanui/react';

export default function Example() {
  return (
    <Header>
      <Header.Branding>
        <Header.Logo
          src="/logo.svg"
          alt="정부24"
          href="/"
        />
        <Header.Slogan>
          국민을 위한 전자정부 서비스
        </Header.Slogan>
      </Header.Branding>
      <Header.Utility>
        <Header.UtilityLink href="/login">
          로그인
        </Header.UtilityLink>
        <Header.UtilityLink href="/signup">
          회원가입
        </Header.UtilityLink>
      </Header.Utility>
    </Header>
  );
}`}
              language="tsx"
            />
          </Stack>
        </Stack>
      </PageSection>

      {/* 브랜딩만 */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="branding-only">
            브랜딩만 사용
          </Heading>
          <Body size="md" className="text-krds-gray-70">
            로고만 표시하는 간단한 헤더입니다.
          </Body>

          <Stack spacing="heading-tight">
            <Heading level="h3" id="logo-only" className="text-lg font-medium">
              로고만
            </Heading>
            <CodeBlock
              code={`import { Header } from '@hanui/react';

export default function Example() {
  return (
    <Header>
      <Header.Branding>
        <Header.Logo
          src="/logo.svg"
          alt="행정안전부"
          href="/"
        />
      </Header.Branding>
    </Header>
  );
}`}
              language="tsx"
            />
          </Stack>
        </Stack>
      </PageSection>

      {/* 여러 유틸리티 링크 */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="multiple-utility">
            여러 유틸리티 링크
          </Heading>
          <Body size="md" className="text-krds-gray-70">
            로그인, 회원가입 외에도 언어 선택, 고객센터 등 다양한 유틸리티
            링크를 추가할 수 있습니다.
          </Body>

          <Stack spacing="heading-tight">
            <Heading
              level="h3"
              id="multiple-links"
              className="text-lg font-medium"
            >
              다양한 유틸리티
            </Heading>
            <CodeBlock
              code={`import { Header } from '@hanui/react';

export default function Example() {
  return (
    <Header>
      <Header.Branding>
        <Header.Logo
          src="/logo.svg"
          alt="정부24"
          href="/"
        />
      </Header.Branding>
      <Header.Utility>
        <Header.UtilityLink href="/support">
          고객센터
        </Header.UtilityLink>
        <Header.UtilityLink href="/faq">
          자주 묻는 질문
        </Header.UtilityLink>
        <Header.UtilityLink href="/sitemap">
          사이트맵
        </Header.UtilityLink>
        <Header.UtilityLink href="/login">
          로그인
        </Header.UtilityLink>
      </Header.Utility>
    </Header>
  );
}`}
              language="tsx"
            />
          </Stack>
        </Stack>
      </PageSection>

      {/* Compact 변형 */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="compact-variant">
            Compact 변형
          </Heading>
          <Body size="md" className="text-krds-gray-70">
            더 작은 높이의 헤더가 필요한 경우 compact variant를 사용할 수
            있습니다.
          </Body>

          <Stack spacing="heading-tight">
            <Heading
              level="h3"
              id="compact-example"
              className="text-lg font-medium"
            >
              Compact 헤더
            </Heading>
            <CodeBlock
              code={`import { Header } from '@hanui/react';

export default function Example() {
  return (
    <Header variant="compact">
      <Header.Branding>
        <Header.Logo
          src="/logo.svg"
          alt="정부24"
          href="/"
          width={80}
          height={28}
        />
      </Header.Branding>
      <Header.Utility>
        <Header.UtilityLink href="/login">
          로그인
        </Header.UtilityLink>
      </Header.Utility>
    </Header>
  );
}`}
              language="tsx"
            />
          </Stack>
        </Stack>
      </PageSection>

      {/* 가이드라인 */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="guidelines">
            사용 가이드라인
          </Heading>

          <GuidelineSection title="언제 사용하나요?" type="do">
            <ul className="list-disc list-inside space-y-2">
              <li>모든 정부 웹사이트의 최상단에 일관된 헤더 제공</li>
              <li>서비스 브랜딩과 주요 네비게이션 표시</li>
              <li>로그인, 회원가입 등 주요 기능 접근 제공</li>
              <li>사이트 전체에서 동일한 헤더 유지 필요</li>
            </ul>
          </GuidelineSection>

          <GuidelineSection title="언제 사용하지 말아야 하나요?" type="dont">
            <ul className="list-disc list-inside space-y-2">
              <li>페이지 중간이나 하단에 헤더 배치</li>
              <li>페이지마다 다른 헤더 스타일 적용</li>
              <li>너무 많은 유틸리티 링크로 복잡하게 만들기</li>
              <li>비표준 색상이나 레이아웃으로 KRDS 표준 무시</li>
            </ul>
          </GuidelineSection>
        </Stack>
      </PageSection>

      {/* 접근성 */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="accessibility">
            접근성
          </Heading>
          <Body size="md" className="text-krds-gray-70">
            Header 컴포넌트는 WCAG 2.1 및 KWCAG 2.2 표준을 준수합니다.
          </Body>

          <div className="space-y-4">
            <div>
              <Heading level="h3" className="text-lg font-semibold mb-2">
                키보드 네비게이션
              </Heading>
              <ul className="list-disc list-inside space-y-1 text-sm text-krds-gray-90">
                <li>
                  <code className="text-xs bg-krds-gray-5 px-1 py-0.5 rounded">
                    Tab
                  </code>
                  : 다음 링크로 포커스 이동
                </li>
                <li>
                  <code className="text-xs bg-krds-gray-5 px-1 py-0.5 rounded">
                    Shift + Tab
                  </code>
                  : 이전 링크로 포커스 이동
                </li>
                <li>
                  <code className="text-xs bg-krds-gray-5 px-1 py-0.5 rounded">
                    Enter
                  </code>
                  : 링크 활성화
                </li>
              </ul>
            </div>

            <div>
              <Heading level="h3" className="text-lg font-semibold mb-2">
                스크린 리더
              </Heading>
              <ul className="list-disc list-inside space-y-1 text-sm text-krds-gray-90">
                <li>header 요소로 랜드마크 영역 정의</li>
                <li>로고 이미지에 필수 alt 텍스트 제공</li>
                <li>모든 링크에 명확한 텍스트 레이블</li>
                <li>포커스 시각적 표시 (focus ring)</li>
              </ul>
            </div>
          </div>
        </Stack>
      </PageSection>

      {/* 디자인 원칙 */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="design-principles">
            디자인 원칙
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Heading level="h3" className="text-lg font-semibold">
                일관성 (Consistency)
              </Heading>
              <Body size="sm" className="text-krds-gray-70">
                모든 정부 웹사이트에서 동일한 헤더 구조와 스타일을 유지하여
                사용자가 친숙하게 느낄 수 있도록 합니다.
              </Body>
            </div>

            <div className="space-y-2">
              <Heading level="h3" className="text-lg font-semibold">
                명확성 (Clarity)
              </Heading>
              <Body size="sm" className="text-krds-gray-70">
                로고와 서비스 이름을 명확히 표시하여 사용자가 현재 어떤 서비스를
                이용하고 있는지 즉시 파악할 수 있도록 합니다.
              </Body>
            </div>

            <div className="space-y-2">
              <Heading level="h3" className="text-lg font-semibold">
                접근성 (Accessibility)
              </Heading>
              <Body size="sm" className="text-krds-gray-70">
                키보드 네비게이션, 스크린 리더 지원 등 모든 사용자가 쉽게 이용할
                수 있는 인터페이스를 제공합니다.
              </Body>
            </div>

            <div className="space-y-2">
              <Heading level="h3" className="text-lg font-semibold">
                반응형 (Responsive)
              </Heading>
              <Body size="sm" className="text-krds-gray-70">
                데스크톱, 태블릿, 모바일 등 다양한 화면 크기에서 최적화된
                레이아웃을 제공합니다.
              </Body>
            </div>
          </div>
        </Stack>
      </PageSection>

      {/* API Reference */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="api-reference">
            API Reference
          </Heading>

          <div className="space-y-8">
            {/* Header Props */}
            <div>
              <Heading level="h3" className="text-xl font-semibold mb-4">
                Header
              </Heading>
              <Body size="md" className="text-krds-gray-70 mb-4">
                헤더 컨테이너 컴포넌트입니다. 모든 헤더 하위 컴포넌트를 감싸는
                최상위 요소입니다.
              </Body>
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
                      <td className="py-2 px-4">
                        <code>variant</code>
                      </td>
                      <td className="py-2 px-4">
                        <code>&quot;default&quot; | &quot;compact&quot;</code>
                      </td>
                      <td className="py-2 px-4">
                        <code>&quot;default&quot;</code>
                      </td>
                      <td className="py-2 px-4">헤더 변형</td>
                    </tr>
                    <tr className="border-b border-krds-gray-20">
                      <td className="py-2 px-4">
                        <code>className</code>
                      </td>
                      <td className="py-2 px-4">
                        <code>string</code>
                      </td>
                      <td className="py-2 px-4">-</td>
                      <td className="py-2 px-4">추가 CSS 클래스</td>
                    </tr>
                    <tr className="border-b border-krds-gray-20">
                      <td className="py-2 px-4">
                        <code>children</code>
                      </td>
                      <td className="py-2 px-4">
                        <code>ReactNode</code>
                      </td>
                      <td className="py-2 px-4">-</td>
                      <td className="py-2 px-4">헤더 내용 (하위 컴포넌트)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Header.Branding Props */}
            <div>
              <Heading level="h3" className="text-xl font-semibold mb-4">
                Header.Branding
              </Heading>
              <Body size="md" className="text-krds-gray-70 mb-4">
                로고와 슬로건을 포함하는 브랜딩 영역입니다.
              </Body>
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
                      <td className="py-2 px-4">
                        <code>className</code>
                      </td>
                      <td className="py-2 px-4">
                        <code>string</code>
                      </td>
                      <td className="py-2 px-4">-</td>
                      <td className="py-2 px-4">추가 CSS 클래스</td>
                    </tr>
                    <tr className="border-b border-krds-gray-20">
                      <td className="py-2 px-4">
                        <code>children</code>
                      </td>
                      <td className="py-2 px-4">
                        <code>ReactNode</code>
                      </td>
                      <td className="py-2 px-4">-</td>
                      <td className="py-2 px-4">브랜딩 내용 (로고, 슬로건)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Header.Logo Props */}
            <div>
              <Heading level="h3" className="text-xl font-semibold mb-4">
                Header.Logo
              </Heading>
              <Body size="md" className="text-krds-gray-70 mb-4">
                서비스 로고 이미지입니다. 클릭 시 홈페이지로 이동합니다.
              </Body>
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
                      <td className="py-2 px-4">
                        <code>src</code>
                        <span className="text-red-500">*</span>
                      </td>
                      <td className="py-2 px-4">
                        <code>string</code>
                      </td>
                      <td className="py-2 px-4">-</td>
                      <td className="py-2 px-4">로고 이미지 경로</td>
                    </tr>
                    <tr className="border-b border-krds-gray-20">
                      <td className="py-2 px-4">
                        <code>alt</code>
                        <span className="text-red-500">*</span>
                      </td>
                      <td className="py-2 px-4">
                        <code>string</code>
                      </td>
                      <td className="py-2 px-4">-</td>
                      <td className="py-2 px-4">로고 대체 텍스트 (필수)</td>
                    </tr>
                    <tr className="border-b border-krds-gray-20">
                      <td className="py-2 px-4">
                        <code>href</code>
                      </td>
                      <td className="py-2 px-4">
                        <code>string</code>
                      </td>
                      <td className="py-2 px-4">
                        <code>&quot;/&quot;</code>
                      </td>
                      <td className="py-2 px-4">로고 링크 경로</td>
                    </tr>
                    <tr className="border-b border-krds-gray-20">
                      <td className="py-2 px-4">
                        <code>width</code>
                      </td>
                      <td className="py-2 px-4">
                        <code>number</code>
                      </td>
                      <td className="py-2 px-4">
                        <code>120</code>
                      </td>
                      <td className="py-2 px-4">로고 너비 (px)</td>
                    </tr>
                    <tr className="border-b border-krds-gray-20">
                      <td className="py-2 px-4">
                        <code>height</code>
                      </td>
                      <td className="py-2 px-4">
                        <code>number</code>
                      </td>
                      <td className="py-2 px-4">
                        <code>40</code>
                      </td>
                      <td className="py-2 px-4">로고 높이 (px)</td>
                    </tr>
                    <tr className="border-b border-krds-gray-20">
                      <td className="py-2 px-4">
                        <code>className</code>
                      </td>
                      <td className="py-2 px-4">
                        <code>string</code>
                      </td>
                      <td className="py-2 px-4">-</td>
                      <td className="py-2 px-4">추가 CSS 클래스</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Header.Slogan Props */}
            <div>
              <Heading level="h3" className="text-xl font-semibold mb-4">
                Header.Slogan
              </Heading>
              <Body size="md" className="text-krds-gray-70 mb-4">
                선택적 서비스 슬로건 또는 설명 텍스트입니다. 모바일에서는
                숨겨집니다.
              </Body>
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
                      <td className="py-2 px-4">
                        <code>className</code>
                      </td>
                      <td className="py-2 px-4">
                        <code>string</code>
                      </td>
                      <td className="py-2 px-4">-</td>
                      <td className="py-2 px-4">추가 CSS 클래스</td>
                    </tr>
                    <tr className="border-b border-krds-gray-20">
                      <td className="py-2 px-4">
                        <code>children</code>
                      </td>
                      <td className="py-2 px-4">
                        <code>ReactNode</code>
                      </td>
                      <td className="py-2 px-4">-</td>
                      <td className="py-2 px-4">슬로건 텍스트</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Header.Utility Props */}
            <div>
              <Heading level="h3" className="text-xl font-semibold mb-4">
                Header.Utility
              </Heading>
              <Body size="md" className="text-krds-gray-70 mb-4">
                유틸리티 링크를 포함하는 컨테이너입니다. 헤더 오른쪽에 자동으로
                정렬됩니다.
              </Body>
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
                      <td className="py-2 px-4">
                        <code>className</code>
                      </td>
                      <td className="py-2 px-4">
                        <code>string</code>
                      </td>
                      <td className="py-2 px-4">-</td>
                      <td className="py-2 px-4">추가 CSS 클래스</td>
                    </tr>
                    <tr className="border-b border-krds-gray-20">
                      <td className="py-2 px-4">
                        <code>children</code>
                      </td>
                      <td className="py-2 px-4">
                        <code>ReactNode</code>
                      </td>
                      <td className="py-2 px-4">-</td>
                      <td className="py-2 px-4">유틸리티 링크들</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Header.UtilityLink Props */}
            <div>
              <Heading level="h3" className="text-xl font-semibold mb-4">
                Header.UtilityLink
              </Heading>
              <Body size="md" className="text-krds-gray-70 mb-4">
                개별 유틸리티 링크입니다. 일관된 스타일과 접근성을 제공합니다.
              </Body>
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
                      <td className="py-2 px-4">
                        <code>href</code>
                        <span className="text-red-500">*</span>
                      </td>
                      <td className="py-2 px-4">
                        <code>string</code>
                      </td>
                      <td className="py-2 px-4">-</td>
                      <td className="py-2 px-4">링크 경로</td>
                    </tr>
                    <tr className="border-b border-krds-gray-20">
                      <td className="py-2 px-4">
                        <code>className</code>
                      </td>
                      <td className="py-2 px-4">
                        <code>string</code>
                      </td>
                      <td className="py-2 px-4">-</td>
                      <td className="py-2 px-4">추가 CSS 클래스</td>
                    </tr>
                    <tr className="border-b border-krds-gray-20">
                      <td className="py-2 px-4">
                        <code>children</code>
                      </td>
                      <td className="py-2 px-4">
                        <code>ReactNode</code>
                      </td>
                      <td className="py-2 px-4">-</td>
                      <td className="py-2 px-4">링크 텍스트</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Stack>
      </PageSection>

      {/* Foundation Layer */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="foundation-layer">
            기반 레이어
          </Heading>
          <Body size="md" className="text-krds-gray-70">
            Header 컴포넌트는 다음과 같은 기능을 자동으로 적용합니다:
          </Body>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-krds-primary-surface flex items-center justify-center text-krds-primary-base font-semibold text-sm">
                1
              </div>
              <div>
                <Body size="md" weight="bold" className="text-krds-gray-95">
                  KRDS 필수 ID 자동 적용
                </Body>
                <Body size="sm" className="text-krds-gray-70">
                  <code className="text-xs bg-krds-gray-5 px-1 py-0.5 rounded">
                    #krds-header
                  </code>{' '}
                  ID가 자동으로 적용되어 KRDS 표준을 준수합니다.
                </Body>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-krds-primary-surface flex items-center justify-center text-krds-primary-base font-semibold text-sm">
                2
              </div>
              <div>
                <Body size="md" weight="bold" className="text-krds-gray-95">
                  KRDS 필수 클래스 자동 적용
                </Body>
                <Body size="sm" className="text-krds-gray-70">
                  <code className="text-xs bg-krds-gray-5 px-1 py-0.5 rounded">
                    .header-branding
                  </code>
                  ,{' '}
                  <code className="text-xs bg-krds-gray-5 px-1 py-0.5 rounded">
                    .header-utility
                  </code>{' '}
                  클래스가 자동으로 적용됩니다.
                </Body>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-krds-primary-surface flex items-center justify-center text-krds-primary-base font-semibold text-sm">
                3
              </div>
              <div>
                <Body size="md" weight="bold" className="text-krds-gray-95">
                  시맨틱 HTML 자동 적용
                </Body>
                <Body size="sm" className="text-krds-gray-70">
                  <code className="text-xs bg-krds-gray-5 px-1 py-0.5 rounded">
                    &lt;header&gt;
                  </code>{' '}
                  요소를 사용하여 시맨틱한 구조를 제공합니다.
                </Body>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-krds-primary-surface flex items-center justify-center text-krds-primary-base font-semibold text-sm">
                4
              </div>
              <div>
                <Body size="md" weight="bold" className="text-krds-gray-95">
                  키보드 접근성 자동 지원
                </Body>
                <Body size="sm" className="text-krds-gray-70">
                  Tab 키로 모든 링크에 접근 가능하며, focus ring이 자동으로
                  표시됩니다.
                </Body>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-krds-primary-surface flex items-center justify-center text-krds-primary-base font-semibold text-sm">
                5
              </div>
              <div>
                <Body size="md" weight="bold" className="text-krds-gray-95">
                  다크 모드 자동 지원
                </Body>
                <Body size="sm" className="text-krds-gray-70">
                  시스템 설정에 따라 다크 모드가 자동으로 적용되며, 모든 색상이
                  최적화됩니다.
                </Body>
              </div>
            </div>
          </div>
        </Stack>
      </PageSection>

      {/* Phase Information */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="phase-info">
            개발 단계
          </Heading>
          <Body size="md" className="text-krds-gray-70">
            현재 Header 컴포넌트는 Phase 1 (기본) 단계입니다.
          </Body>

          <div className="space-y-4">
            <div className="rounded-lg border-2 border-krds-primary-border bg-krds-primary-surface p-4">
              <Body
                size="md"
                weight="bold"
                className="text-krds-primary-text mb-2"
              >
                ✅ Phase 1 (기본) - 완료
              </Body>
              <ul className="list-disc list-inside space-y-1 text-sm text-krds-primary-text">
                <li>컨테이너 구조</li>
                <li>브랜딩 영역 (로고 + 슬로건)</li>
                <li>유틸리티 링크</li>
              </ul>
            </div>

            <div className="rounded-lg border border-krds-gray-20 bg-krds-gray-5 p-4">
              <Body size="md" weight="bold" className="text-krds-gray-95 mb-2">
                🔄 Phase 2 (검색) - 예정
              </Body>
              <ul className="list-disc list-inside space-y-1 text-sm text-krds-gray-90">
                <li>검색 입력 필드</li>
                <li>검색 버튼</li>
                <li>자동완성 기능</li>
              </ul>
            </div>

            <div className="rounded-lg border border-krds-gray-20 bg-krds-gray-5 p-4">
              <Body size="md" weight="bold" className="text-krds-gray-95 mb-2">
                🔄 Phase 3 (메인 네비게이션) - 예정
              </Body>
              <ul className="list-disc list-inside space-y-1 text-sm text-krds-gray-90">
                <li>데스크톱 메인 메뉴</li>
                <li>다단계 드롭다운 메뉴</li>
                <li>메뉴 항목 관리</li>
              </ul>
            </div>

            <div className="rounded-lg border border-krds-gray-20 bg-krds-gray-5 p-4">
              <Body size="md" weight="bold" className="text-krds-gray-95 mb-2">
                🔄 Phase 4 (모바일) - 예정
              </Body>
              <ul className="list-disc list-inside space-y-1 text-sm text-krds-gray-90">
                <li>모바일 네비게이션</li>
                <li>햄버거 메뉴</li>
                <li>반응형 레이아웃</li>
              </ul>
            </div>
          </div>
        </Stack>
      </PageSection>
    </>
  );
}
