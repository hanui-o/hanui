'use client';

import { MainMenu } from '@hanui/react';
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
        description="Radix UI Navigation Menu 기반의 주요 네비게이션 컴포넌트입니다. 자동 접근성 처리, 키보드 네비게이션, 드롭다운 메뉴를 지원합니다."
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
              className="sr-only"
            />

            <ComponentPreview className="h-[400px]">
              <MainMenu
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
              {`import { MainMenu } from '@hanui/react'

<MainMenu
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
          </Section>

          <Section level="h2">
            <Installation componentName="main-menu" />
          </Section>

          {/* Usage */}
          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />

            <Body className="mb-4">
              <strong>Radix UI Navigation Menu 기반</strong>으로 제작된 주 메뉴
              컴포넌트입니다. 접근성(WCAG 2.1 / KWCAG 2.2), 키보드 네비게이션,
              포커스 관리가 자동으로 처리되며, 일반적으로 헤더에 배치하여
              GNB(Global Navigation Bar)로 사용합니다.
            </Body>

            <Code variant="block" language="tsx">
              {`import { Header, MainMenu } from '@hanui/react'

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
      <MainMenu items={menuItems} />
    </Header>
  )
}`}
            </Code>
          </Section>

          {/* Examples */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading level="h3" title="기본 사용" />
              <Body className="mb-4">
                items prop으로 메뉴 항목을 전달합니다.
              </Body>
              <ComponentPreview>
                <MainMenu
                  items={[
                    { label: '홈', href: '/', active: true },
                    { label: '소개', href: '/about' },
                    { label: '서비스', href: '/services' },
                    { label: '고객지원', href: '/support' },
                  ]}
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<MainMenu
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
              <Heading level="h3" title="드롭다운 메뉴 (간단한 서브메뉴)" />
              <Body className="mb-4">
                children 속성을 사용하여 간단한 드롭다운 메뉴를 만들 수
                있습니다.
              </Body>
              <ComponentPreview className="h-[400px]">
                <MainMenu
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
                {`<MainMenu
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
              />
              <Body className="mb-4">
                sections를 사용하여 섹션 제목, 링크 설명, 유틸리티 링크를 포함한
                풍부한 드롭다운을 만들 수 있습니다.
              </Body>
              <ComponentPreview className="h-[600px]">
                <MainMenu
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
                {`<MainMenu
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
              <Heading level="h3" title="다중 섹션 드롭다운" />
              <Body className="mb-4">
                여러 섹션으로 구분된 복잡한 드롭다운 메뉴를 만들 수 있습니다.
              </Body>
              <Code variant="block" language="tsx">
                {`<MainMenu
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
          {/* Props */}
          <Section level="h2">
            <Heading level="h2" id="props" title="Props" />

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
                  <TableCell>
                    <Code>items</Code>
                  </TableCell>
                  <TableCell>
                    <Code>MainMenuItem[]</Code>
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
          </Section>

          {/* MainMenuItem Type */}
          <Section level="h2">
            <Heading level="h2" id="mainmenuitem" title="MainMenuItem Type" />

            <Code variant="block" language="tsx">
              {`export interface MainMenuItem {
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
  sections?: MainMenuSection[];

  /**
   * 간단한 서브메뉴 링크 (sections 대신 사용)
   */
  children?: MainMenuLink[];

  /**
   * 드롭다운 너비 (Tailwind 클래스 또는 커스텀 값)
   * @default "w-[200px]"
   * @example "w-[400px]", "w-96", "min-w-[300px]"
   */
  dropdownWidth?: string;
}`}
            </Code>
          </Section>

          {/* MainMenuSection Type */}
          <Section level="h2">
            <Heading
              level="h2"
              id="mainmenusection"
              title="MainMenuSection Type"
            />

            <Code variant="block" language="tsx">
              {`export interface MainMenuSection {
  /**
   * 섹션 제목
   */
  title?: string;

  /**
   * 섹션 내 링크들
   */
  links: MainMenuLink[];

  /**
   * "모두 보기" 등 추가 링크
   */
  utilityLinks?: MainMenuLink[];
}`}
            </Code>
          </Section>

          {/* MainMenuLink Type */}
          <Section level="h2">
            <Heading level="h2" id="mainmenulink" title="MainMenuLink Type" />

            <Code variant="block" language="tsx">
              {`export interface MainMenuLink {
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
