'use client';

import { NavigationMenu, MegaMenu } from '@hanui/react';
// Docs layout components
import {
  PageSection as Section,
  Subsection,
  Heading,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';
import { ComponentPreview } from '@/components/content/ComponentPreview';

// Docs helper components
import { DoCard, DontCard } from '@/components/helpers';

// UI components - from @hanui/react
import {
  Body,
  Card,
  Code,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@hanui/react';

export default function MainMenuPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Main Menu"
        description="주요 네비게이션을 위한 2가지 독립적인 컴포넌트를 제공합니다: NavigationMenu와 MegaMenu. 각각 다른 용도와 설치 방법을 가지고 있습니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Overview */}
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              description="용도에 따라 선택할 수 있는 2가지 독립적인 메인 메뉴 컴포넌트"
            />

            <Body className="mb-6">
              HANUI는 웹사이트의 주요 네비게이션을 위한{' '}
              <strong>2가지 독립적인 컴포넌트</strong>를 제공합니다:
            </Body>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Card>
                <div className="p-6">
                  <Heading level="h3" title="NavigationMenu" />
                  <Body className="mb-4">
                    <strong>Radix UI 기반</strong>의 일반적인 네비게이션 메뉴.
                    일부 항목에만 드롭다운이 필요하거나 간단한 메뉴 구조에
                    적합합니다.
                  </Body>
                  <Code variant="inline">npx hanui add navigation-menu</Code>
                </div>
              </Card>
              <Card>
                <div className="p-6">
                  <Heading level="h3" title="MegaMenu" />
                  <Body className="mb-4">
                    <strong>순수 React 기반</strong>의 메가메뉴 스타일
                    네비게이션. 모든 메뉴에 서브메뉴가 있고 복잡한 구조에
                    적합합니다.
                  </Body>
                  <Code variant="inline">npx hanui add mega-menu</Code>
                </div>
              </Card>
            </div>
          </Section>

          {/* NavigationMenu */}
          <Section level="h2">
            <Heading
              level="h2"
              id="navigation-menu"
              title="NavigationMenu"
              description="Radix UI 기반의 일반적인 네비게이션 메뉴"
            />

            <Body className="mb-4">
              <strong>NavigationMenu</strong>는 Radix UI Navigation Menu
              기반으로 자동 접근성 처리, 키보드 네비게이션, 드롭다운 메뉴를
              지원합니다. 일부 항목에만 드롭다운이 필요하거나 간단한 사이트
              구조에 적합합니다.
            </Body>

            <ComponentPreview className="h-[400px]">
              <NavigationMenu
                items={[
                  { label: '홈', href: '/', active: true },
                  { label: '소개', href: '/about' },
                  {
                    label: '서비스',
                    children: [
                      { label: '건강검진', href: '/services/checkup' },
                      { label: '보험료 조회', href: '/services/premium' },
                      {
                        label: '민원서류 발급',
                        href: '/services/documents',
                      },
                    ],
                  },
                  { label: '고객지원', href: '/support' },
                ]}
              />
            </ComponentPreview>

            <Code variant="block" language="tsx">
              {`import { NavigationMenu } from '@/components/hanui'

<NavigationMenu
  items={[
    { label: '홈', href: '/', active: true },
    { label: '소개', href: '/about' },
    {
      label: '서비스',
      children: [
        { label: '건강검진', href: '/services/checkup' },
        { label: '보험료 조회', href: '/services/premium' },
        { label: '민원서류 발급', href: '/services/documents' },
      ],
    },
    { label: '고객지원', href: '/support' },
  ]}
/>`}
            </Code>

            <Subsection level="h3">
              <Heading level="h3" title="설치" />
              <Installation componentName="navigation-menu" />
            </Subsection>
          </Section>

          {/* NavigationMenu Usage */}
          <Section level="h2">
            <Heading
              level="h2"
              id="navigation-menu-usage"
              title="NavigationMenu 사용법"
            />

            <Body className="mb-4">
              <strong>Radix UI Navigation Menu 기반</strong>으로 제작된 주 메뉴
              컴포넌트입니다. 접근성(WCAG 2.1 / KWCAG 2.2), 키보드 네비게이션,
              포커스 관리가 자동으로 처리되며, 일반적으로 헤더에 배치하여
              GNB(Global Navigation Bar)로 사용합니다.
            </Body>

            <Code variant="block" language="tsx">
              {`import { Header, MainMenu } from '@/components/hanui'

export default function Layout() {
  const menuItems = [
    { label: '홈', href: '/', active: true },
    { label: '소개', href: '/about' },
    {
      label: '서비스',
      children: [
        { label: '건강검진', href: '/services/checkup' },
        { label: '보험료 조회', href: '/services/premium' },
      ],
    },
  ];

  return (
    <Header>
      <NavigationMenu items={menuItems} />
    </Header>
  )
}`}
            </Code>
          </Section>

          {/* NavigationMenu Examples */}
          <Section level="h2">
            <Heading
              level="h2"
              id="navigation-menu-examples"
              title="NavigationMenu 예제"
            />

            <Subsection level="h3">
              <Heading
                level="h3"
                title="기본 사용"
                description="items prop으로 메뉴 항목을 전달합니다."
              />
              <ComponentPreview>
                <NavigationMenu
                  items={[
                    { label: '홈', href: '/', active: true },
                    { label: '소개', href: '/about' },
                    { label: '서비스', href: '/services' },
                    { label: '고객지원', href: '/support' },
                  ]}
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<NavigationMenu
  items={[
    { label: '홈', href: '/', active: true },
    { label: '소개', href: '/about' },
    { label: '서비스', href: '/services' },
    { label: '고객지원', href: '/support' },
  ]}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="드롭다운 메뉴 (간단한 서브메뉴)"
                description="children 속성을 사용하여 간단한 드롭다운 메뉴를 만들 수 있습니다."
              />
              <ComponentPreview className="h-[400px]">
                <NavigationMenu
                  items={[
                    { label: '홈', href: '/' },
                    {
                      label: '서비스',
                      children: [
                        { label: '건강검진', href: '/services/checkup' },
                        { label: '보험료 조회', href: '/services/premium' },
                        {
                          label: '민원서류 발급',
                          href: '/services/documents',
                        },
                      ],
                    },
                    { label: '고객지원', href: '/support' },
                  ]}
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<NavigationMenu
  items={[
    { label: '홈', href: '/' },
    {
      label: '서비스',
      children: [
        { label: '건강검진', href: '/services/checkup' },
        { label: '보험료 조회', href: '/services/premium' },
        { label: '민원서류 발급', href: '/services/documents' },
      ],
    },
    { label: '고객지원', href: '/support' },
  ]}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="섹션별 드롭다운 (설명 및 유틸리티 링크)"
                description="sections를 사용하여 섹션 제목, 링크 설명, 유틸리티 링크를 포함한 풍부한 드롭다운을 만들 수 있습니다."
              />
              <ComponentPreview className="h-[600px]">
                <NavigationMenu
                  items={[
                    { label: '홈', href: '/' },
                    {
                      label: '서비스',
                      dropdownWidth: 'w-[400px]',
                      sections: [
                        {
                          title: '인기 서비스',
                          links: [
                            {
                              label: '건강검진 예약',
                              href: '/services/checkup',
                              description:
                                '온라인으로 건강검진을 간편하게 예약하세요',
                            },
                            {
                              label: '보험료 조회',
                              href: '/services/premium',
                              description:
                                '나의 건강보험료를 실시간으로 확인하세요',
                            },
                          ],
                          utilityLinks: [
                            {
                              label: '모든 서비스 보기',
                              href: '/services',
                            },
                          ],
                        },
                      ],
                    },
                    { label: '고객지원', href: '/support' },
                  ]}
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<NavigationMenu
  items={[
    { label: '홈', href: '/' },
    {
      label: '서비스',
      dropdownWidth: 'w-[400px]',  // 드롭다운 너비 지정
      sections: [
        {
          title: '인기 서비스',
          links: [
            {
              label: '건강검진 예약',
              href: '/services/checkup',
              description: '온라인으로 건강검진을 간편하게 예약하세요',
            },
            {
              label: '보험료 조회',
              href: '/services/premium',
              description: '나의 건강보험료를 실시간으로 확인하세요',
            },
          ],
          utilityLinks: [
            { label: '모든 서비스 보기', href: '/services' },
          ],
        },
      ],
    },
    { label: '고객지원', href: '/support' },
  ]}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="다중 섹션 드롭다운"
                description="여러 섹션으로 구분된 복잡한 드롭다운 메뉴를 만들 수 있습니다."
              />
              <Code variant="block" language="tsx">
                {`<NavigationMenu
  items={[
    { label: '홈', href: '/', active: true },
    {
      label: '서비스',
      sections: [
        {
          title: '개인 서비스',
          links: [
            { label: '건강검진', href: '/services/individual/checkup' },
            { label: '보험료 납부', href: '/services/individual/payment' },
          ],
        },
        {
          title: '사업장 서비스',
          links: [
            { label: '직원 등록', href: '/services/business/register' },
            { label: '보험료 신고', href: '/services/business/report' },
          ],
          utilityLinks: [
            { label: '사업장 지원센터', href: '/business-center' },
          ],
        },
      ],
    },
    { label: '고객지원', href: '/support' },
  ]}
/>`}
              </Code>
            </Subsection>
          </Section>

          {/* Mega Menu */}
          <Section level="h2">
            <Heading
              level="h2"
              id="mega-menu"
              title="MegaMenu"
              description="순수 React 기반의 메가메뉴 스타일 네비게이션 (별도 설치)"
            />

            <Body className="mb-4">
              <strong>MegaMenu</strong>는 NavigationMenu와 완전히 독립적인
              컴포넌트로, 순수 React로 구현되어 있습니다. 모든 서브메뉴가 마우스
              호버 시 전체 너비 배경과 함께 한번에 표시되는 메가메뉴 스타일로,
              대규모 사이트나 복잡한 메뉴 구조를 가진 웹사이트에 적합합니다.
            </Body>

            <Body className="mb-4">
              <strong>별도 설치가 필요합니다:</strong>
            </Body>
            <Code variant="block" language="bash">
              {`npx hanui add mega-menu`}
            </Code>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="기본 메가메뉴"
                description="모든 메뉴에 서브메뉴가 있고, 호버 시 전체 너비로 모든 메뉴가 한번에 표시됩니다."
              />
              <ComponentPreview className="h-[500px]">
                <MegaMenu
                  columns={[
                    {
                      title: '건강보험',
                      href: '/insurance',
                      links: [
                        { label: '보험료', href: '/insurance/premium' },
                        { label: '급여', href: '/insurance/benefits' },
                        { label: '요양기관', href: '/insurance/medical' },
                        { label: '건강검진', href: '/insurance/checkup' },
                      ],
                    },
                    {
                      title: '장기요양',
                      href: '/long-term-care',
                      links: [
                        {
                          label: '장기요양보험',
                          href: '/long-term-care/insurance',
                        },
                        {
                          label: '장기요양인정',
                          href: '/long-term-care/certification',
                        },
                        {
                          label: '장기요양기관',
                          href: '/long-term-care/facility',
                        },
                        {
                          label: '장기요양급여',
                          href: '/long-term-care/benefits',
                        },
                      ],
                    },
                    {
                      title: '민원·증명서',
                      href: '/civil-affairs',
                      links: [
                        { label: '민원신청', href: '/civil-affairs/apply' },
                        {
                          label: '증명서발급',
                          href: '/civil-affairs/certificate',
                        },
                        {
                          label: '민원처리결과',
                          href: '/civil-affairs/result',
                        },
                      ],
                    },
                    {
                      title: '건강정보',
                      href: '/health-info',
                      links: [
                        { label: '건강정보', href: '/health-info/general' },
                        { label: '질병정보', href: '/health-info/disease' },
                        { label: '의학정보', href: '/health-info/medical' },
                      ],
                    },
                    {
                      title: '건강IN',
                      href: '/health-in',
                      active: true,
                      links: [
                        { label: '건강관리', href: '/health-in/management' },
                        { label: '건강검진', href: '/health-in/checkup' },
                        {
                          label: '진료내역',
                          href: '/health-in/medical-history',
                        },
                        { label: '약제비', href: '/health-in/medication' },
                      ],
                    },
                    {
                      title: '병원·약국',
                      href: '/medical',
                      links: [
                        { label: '병원찾기', href: '/medical/hospital' },
                        { label: '약국찾기', href: '/medical/pharmacy' },
                        { label: '응급실찾기', href: '/medical/emergency' },
                      ],
                    },
                    {
                      title: '소개',
                      href: '/about',
                      links: [
                        { label: '공단소개', href: '/about/overview' },
                        {
                          label: '조직·업무',
                          href: '/about/organization',
                        },
                        { label: '채용정보', href: '/about/careers' },
                        { label: '알림·소식', href: '/about/news' },
                      ],
                    },
                  ]}
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`import { MegaMenu } from '@/components/hanui'

<MegaMenu
  columns={[
    {
      title: '건강보험',
      href: '/insurance',
      links: [
        { label: '보험료', href: '/insurance/premium' },
        { label: '급여', href: '/insurance/benefits' },
        { label: '요양기관', href: '/insurance/medical' },
        { label: '건강검진', href: '/insurance/checkup' },
      ],
    },
    {
      title: '장기요양',
      href: '/long-term-care',
      links: [
        { label: '장기요양보험', href: '/long-term-care/insurance' },
        { label: '장기요양인정', href: '/long-term-care/certification' },
        { label: '장기요양기관', href: '/long-term-care/facility' },
        { label: '장기요양급여', href: '/long-term-care/benefits' },
      ],
    },
    // ... 더 많은 컬럼
  ]}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="어떤 컴포넌트를 선택해야 할까?" />
              <Body className="mb-4">
                NavigationMenu와 MegaMenu는{' '}
                <strong>완전히 독립적인 컴포넌트</strong>입니다. 프로젝트
                요구사항에 따라 하나를 선택하여 설치하세요.
              </Body>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <DoCard title="NavigationMenu를 선택하세요">
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>메뉴 항목이 5개 이하인 경우</li>
                    <li>일부 메뉴만 드롭다운이 필요한 경우</li>
                    <li>간단한 사이트 구조</li>
                    <li>모바일 우선 디자인</li>
                    <li>Radix UI 접근성 기능이 필요한 경우</li>
                  </ul>
                  <Code variant="block" language="bash" className="mt-4">
                    {`npx hanui add navigation-menu`}
                  </Code>
                </DoCard>
                <DoCard title="MegaMenu를 선택하세요">
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>메뉴 항목이 6개 이상인 경우</li>
                    <li>모든 메뉴에 서브메뉴가 있는 경우</li>
                    <li>복잡한 사이트 구조 (정부기관, 대학 등)</li>
                    <li>전체 메뉴를 한눈에 보여줘야 하는 경우</li>
                    <li>순수 React 구현이 필요한 경우</li>
                  </ul>
                  <Code variant="block" language="bash" className="mt-4">
                    {`npx hanui add mega-menu`}
                  </Code>
                </DoCard>
              </div>
            </Subsection>
          </Section>

          {/* Accessibility */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="Radix UI Navigation Menu 기반으로 WCAG 2.1 / KWCAG 2.2 Level AA 기준을 자동으로 준수합니다."
            />

            <Body className="mb-4">
              Radix UI Navigation Menu는 접근성, 키보드 네비게이션, 포커스
              관리를 자동으로 처리하며, 적절한 ARIA 속성(
              <Code>aria-expanded</Code>, <Code>aria-haspopup</Code>,{' '}
              <Code>aria-current</Code>)을 자동으로 설정합니다.
            </Body>

            <Subsection level="h3">
              <Heading level="h3" title="키보드 네비게이션" />
              <Body className="mb-4">
                <strong>Tab 키는 1depth 메뉴 항목들만 순회합니다.</strong>{' '}
                사용자가 의도적으로 Enter/Space/Arrow Down을 눌렀을 때만 2depth
                드롭다운으로 진입합니다. 이는 사용자가 메뉴를 빠르게 건너뛸 수
                있게 하여 접근성을 향상시킵니다.
              </Body>
              <Table>
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
                    <TableCell>다음 메뉴 항목으로 포커스 이동</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>Enter / Space</Code>
                    </TableCell>
                    <TableCell>드롭다운 열기/닫기</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>Esc</Code>
                    </TableCell>
                    <TableCell>모든 드롭다운 닫기</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>Arrow Down</Code>
                    </TableCell>
                    <TableCell>드롭다운 열기 (닫혀있을 때)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>Arrow Left/Right</Code>
                    </TableCell>
                    <TableCell>
                      이전/다음 메뉴 항목으로 이동 (수평 메뉴)
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Body className="mb-8">
            NavigationMenu와 MegaMenu는 <strong>독립적인 컴포넌트</strong>로
            각각 다른 Props를 가지고 있습니다.
          </Body>

          {/* NavigationMenu Props */}
          <Section level="h2">
            <Heading
              level="h2"
              id="navigation-menu-props"
              title="NavigationMenu"
              description="NavigationMenu 컴포넌트 API 레퍼런스"
            />

            <Subsection level="h3">
              <Heading level="h3" title="Props" />
              <Table>
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
                      <Code>items</Code>
                    </TableCell>
                    <TableCell>
                      <Code>NavigationMenuItem[]</Code>
                    </TableCell>
                    <TableCell>
                      <strong>필수</strong>
                    </TableCell>
                    <TableCell>메뉴 항목 배열</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>currentPath</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>현재 활성 경로 (aria-current 설정용)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>orientation</Code>
                    </TableCell>
                    <TableCell>
                      <Code>&quot;horizontal&quot; | &quot;vertical&quot;</Code>
                    </TableCell>
                    <TableCell>
                      <Code>&quot;horizontal&quot;</Code>
                    </TableCell>
                    <TableCell>메뉴 방향</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>className</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="NavigationMenuItem Type" />

              <Code variant="block" language="tsx">
                {`export interface NavigationMenuItem {
  /**
   * 메뉴 라벨
   */
  label: string;

  /**
   * 메뉴 URL (드롭다운 없는 경우 필수)
   */
  href?: string;

  /**
   * 활성 상태
   */
  active?: boolean;

  /**
   * 드롭다운 섹션 (제목, 설명, 유틸리티 링크 포함)
   */
  sections?: NavigationMenuSection[];

  /**
   * 간단한 서브메뉴 링크 (sections 대신 사용)
   */
  children?: NavigationMenuLink[];

  /**
   * 드롭다운 너비 (Tailwind 클래스 또는 커스텀 값)
   * @default "w-[200px]"
   * @example "w-[400px]", "w-96", "min-w-[300px]"
   */
  dropdownWidth?: string;
}`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="NavigationMenuSection Type" />

              <Code variant="block" language="tsx">
                {`export interface NavigationMenuSection {
  /**
   * 섹션 제목
   */
  title?: string;

  /**
   * 섹션 내 링크들
   */
  links: NavigationMenuLink[];

  /**
   * "모두 보기" 등 추가 링크
   */
  utilityLinks?: NavigationMenuLink[];
}`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="NavigationMenuLink Type" />

              <Code variant="block" language="tsx">
                {`export interface NavigationMenuLink {
  /**
   * 링크 텍스트
   */
  label: string;

  /**
   * 링크 URL
   */
  href: string;

  /**
   * 링크 설명 (선택)
   */
  description?: string;

  /**
   * 활성 상태
   */
  active?: boolean;
}`}
              </Code>
            </Subsection>
          </Section>

          {/* MegaMenu Props */}
          <Section level="h2">
            <Heading
              level="h2"
              id="mega-menu-api"
              title="MegaMenu"
              description="MegaMenu 컴포넌트 API 레퍼런스"
            />

            <Subsection level="h3">
              <Heading level="h3" title="Props" />

              <Table>
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
                      <Code>columns</Code>
                    </TableCell>
                    <TableCell>
                      <Code>MegaMenuColumn[]</Code>
                    </TableCell>
                    <TableCell>
                      <strong>필수</strong>
                    </TableCell>
                    <TableCell>메뉴 컬럼 배열</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>currentPath</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>현재 활성 경로 (aria-current 설정용)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>dropdownBgColor</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>
                      <Code>&quot;bg-krds-white&quot;</Code>
                    </TableCell>
                    <TableCell>드롭다운 배경색 (Tailwind 클래스)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>dropdownBorderColor</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>
                      <Code>&quot;border-krds-gray-20&quot;</Code>
                    </TableCell>
                    <TableCell>드롭다운 테두리색 (Tailwind 클래스)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>className</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="MegaMenuColumn Type" />

              <Code variant="block" language="tsx">
                {`export interface MegaMenuColumn {
  /**
   * 메인 메뉴 타이틀
   */
  title: string;

  /**
   * 메인 메뉴 링크 (선택)
   */
  href?: string;

  /**
   * 서브 메뉴 링크 목록
   */
  links: MegaMenuLink[];

  /**
   * 활성 상태
   */
  active?: boolean;
}`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="MegaMenuLink Type" />

              <Code variant="block" language="tsx">
                {`export interface MegaMenuLink {
  /**
   * 링크 텍스트
   */
  label: string;

  /**
   * 링크 URL
   */
  href: string;

  /**
   * 활성 상태
   */
  active?: boolean;
}`}
              </Code>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'List', href: '/components/list' }}
        next={{ title: 'Masthead', href: '/components/masthead' }}
      />
    </>
  );
}
