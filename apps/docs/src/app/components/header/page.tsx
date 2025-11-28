'use client';

// Docs layout components
import {
  PageSection as Section,
  Subsection,
  Heading,
  PageNavigation,
} from '@/components/content';
import { ComponentPreview } from '@/components/content/ComponentPreview';

// UI components - from @hanui/react
import {
  Body,
  Card,
  Code,
  List,
  ListItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  HeaderWithMegaMenu,
  HeaderWithNavigation,
  NavigationMenuItem,
  MegaMenuColumn,
} from '@hanui/react';

// Sample data for menu examples
const NAVIGATION_ITEMS: NavigationMenuItem[] = [
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
];

const MEGA_COLUMNS: MegaMenuColumn[] = [
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
  {
    title: '민원·증명서',
    href: '/civil-affairs',
    links: [
      { label: '민원신청', href: '/civil-affairs/apply' },
      { label: '증명서발급', href: '/civil-affairs/certificate' },
      { label: '민원처리결과', href: '/civil-affairs/result' },
    ],
  },
  {
    title: '건강정보',
    href: '/health-info',
    active: true,
    links: [
      { label: '건강정보', href: '/health-info/general' },
      { label: '질병정보', href: '/health-info/disease' },
      { label: '의학정보', href: '/health-info/medical' },
    ],
  },
];

export default function HeaderPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Header"
        description="KRDS 표준 3단계 구조(Utility Bar / Branding / Main Menu)를 따르는 정부 서비스 헤더 컴포넌트입니다. 메뉴 타입에 따라 2가지 버전을 제공합니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Overview */}
          <Section level="h2">
            <Heading level="h2" id="overview" title="개요" />

            <Body className="mb-4">
              Header는 사용하는 메뉴 타입에 따라 <strong>2가지 버전</strong>을
              제공합니다:
            </Body>

            <Card variant="filled" className="mb-6">
              <List spacing="tight">
                <ListItem>
                  <Body size="sm" weight="bold" as="span">
                    HeaderWithMegaMenu:
                  </Body>
                  <Body size="sm" as="span">
                    {' '}
                    Inline 레이아웃 (logo | MegaMenu | Actions)
                  </Body>
                </ListItem>
                <ListItem>
                  <Body size="sm" weight="bold" as="span">
                    HeaderWithNavigation:
                  </Body>
                  <Body size="sm" as="span">
                    {' '}
                    Stacked 레이아웃 ((logo | Actions) / NavigationMenu)
                  </Body>
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* HeaderWithMegaMenu */}
          <Section level="h2">
            <Heading
              level="h2"
              id="header-with-megamenu"
              title="HeaderWithMegaMenu"
              description="Inline 레이아웃: logo | MegaMenu | Actions (한 줄)"
            />

            <Body className="mb-4">
              모든 메뉴에 서브메뉴가 있고, 로고와 메뉴, 액션이 한 줄에
              배치됩니다. 정부기관처럼 메뉴가 많은 사이트에 적합합니다.
            </Body>

            <ComponentPreview className="h-[500px] overflow-hidden">
              <div
                className="scale-[0.7] origin-top w-[1280px]"
                style={{ height: '714px' }}
              >
                <HeaderWithMegaMenu
                  className="w-[1280px]"
                  megaColumns={MEGA_COLUMNS}
                />
              </div>
            </ComponentPreview>

            <Code variant="block" language="tsx" className="mb-4">
              {`import { HeaderWithMegaMenu, MegaMenuColumn } from '@/components/hanui'

const megaColumns: MegaMenuColumn[] = [
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
  // ... more columns
]

<HeaderWithMegaMenu megaColumns={megaColumns} />`}
            </Code>

            <Subsection level="h3">
              <Heading level="h3" title="설치" />
              <Code variant="block" language="bash">
                {`npx hanui@latest add header-with-megamenu`}
              </Code>
            </Subsection>
          </Section>

          {/* HeaderWithNavigation */}
          <Section level="h2">
            <Heading
              level="h2"
              id="header-with-navigation"
              title="HeaderWithNavigation"
              description="Stacked 레이아웃: (logo | Actions) / NavigationMenu (두 줄)"
            />

            <Body className="mb-4">
              로고와 액션이 첫 번째 줄에, NavigationMenu가 두 번째 줄에
              배치됩니다. 메뉴가 적거나 간결한 헤더가 필요한 경우 적합합니다.
            </Body>

            <ComponentPreview className="h-[400px] overflow-hidden">
              <div
                className="scale-[0.7] origin-top w-[1280px]"
                style={{ height: '571px' }}
              >
                <HeaderWithNavigation
                  className="w-[1280px]"
                  navigationItems={NAVIGATION_ITEMS}
                />
              </div>
            </ComponentPreview>

            <Code variant="block" language="tsx" className="mb-4">
              {`import { HeaderWithNavigation, NavigationMenuItem } from '@/components/hanui'

const navigationItems: NavigationMenuItem[] = [
  { label: '홈', href: '/', active: true },
  { label: '소개', href: '/about' },
  {
    label: '서비스',
    children: [
      { label: '건강검진', href: '/services/checkup' },
      { label: '보험료 조회', href: '/services/premium' },
    ],
  },
  { label: '고객지원', href: '/support' },
]

<HeaderWithNavigation navigationItems={navigationItems} />`}
            </Code>

            <Subsection level="h3">
              <Heading level="h3" title="설치" />
              <Code variant="block" language="bash">
                {`npx hanui@latest add header-with-navigation`}
              </Code>
            </Subsection>
          </Section>

          {/* Customization */}
          <Section level="h2">
            <Heading level="h2" id="customization" title="Props 커스터마이징" />

            <Subsection level="h3">
              <Heading
                level="h3"
                title="로고 및 유틸리티 링크 변경"
                description="두 컴포넌트 모두 동일한 props로 로고, 유틸리티 링크 등을 커스터마이징할 수 있습니다."
              />

              <Code variant="block" language="tsx">
                {`<HeaderWithMegaMenu
  megaColumns={MEGA_COLUMNS}
  logo="/my-logo.svg"
  logoAlt="우리 기관"
  logoHref="/"
  utilityLinks={[
    { label: '로그인', href: '/login' },
    { label: '회원가입', href: '/signup' },
    { label: 'ENGLISH', href: '/en' },
  ]}
  relatedSites={[
    { label: '관련 사이트 1', href: 'https://example.com' },
    { label: '관련 사이트 2', href: 'https://example2.com' },
  ]}
/>

// HeaderWithNavigation도 동일한 props 사용
<HeaderWithNavigation
  navigationItems={NAVIGATION_ITEMS}
  logo="/my-logo.svg"
  logoAlt="우리 기관"
  utilityLinks={[...]}
  relatedSites={[...]}
/>`}
              </Code>
            </Subsection>

            {/* 반응형 동작 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="반응형 동작"
                description="Desktop(1024px+)과 Mobile(1023px 이하) 두 가지 브레이크포인트로 자동 대응합니다."
              />

              <Card variant="outlined">
                <List spacing="tight">
                  <ListItem>
                    <Body size="sm" weight="bold" as="span">
                      Desktop:
                    </Body>
                    <Body size="sm" as="span">
                      {' '}
                      Utility Bar + 드롭다운 메뉴 표시
                    </Body>
                  </ListItem>
                  <ListItem>
                    <Body size="sm" weight="bold" as="span">
                      Mobile:
                    </Body>
                    <Body size="sm" as="span">
                      {' '}
                      햄버거 메뉴 + 전체화면 네비게이션
                    </Body>
                  </ListItem>
                </List>
              </Card>

              <Code variant="block" language="scss" className="mt-4">
                {`// Desktop: 1024px 이상
@media (min-width: 1024px) {
  .mainMenu { display: block; }
  .menuBtn { display: none; }
}

// Mobile: 1023px 이하
@media (max-width: 1023px) {
  .headerUtility { display: none; }
  .mainMenu { display: none; }
}`}
              </Code>
            </Subsection>

            {/* Sticky Position */}
            <Subsection level="h3">
              <Heading level="h3" title="Sticky Position" />
              <Body className="mb-4">
                Header는 <Code>position: sticky</Code>를 사용하여 스크롤 시
                상단에 고정됩니다.
              </Body>

              <Code variant="block" language="scss">
                {`.header {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 70;
  background-color: var(--krds-header--color-surface);
}`}
              </Code>
            </Subsection>
          </Section>

          {/* 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="Header는 WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다."
            />

            <List variant="check" spacing="tight">
              <ListItem>
                <Body size="sm" weight="bold" as="span">
                  시맨틱 HTML:
                </Body>
                <Body size="sm" as="span">
                  {' '}
                  header, nav, ul, li 등 시맨틱 요소 사용
                </Body>
              </ListItem>
              <ListItem>
                <Body size="sm" weight="bold" as="span">
                  키보드 네비게이션:
                </Body>
                <Body size="sm" as="span">
                  {' '}
                  모든 링크와 버튼에 키보드로 접근 가능
                </Body>
              </ListItem>
              <ListItem>
                <Body size="sm" weight="bold" as="span">
                  ARIA 레이블:
                </Body>
                <Body size="sm" as="span">
                  {' '}
                  적절한 ARIA 속성으로 구조 명확화
                </Body>
              </ListItem>
              <ListItem>
                <Body size="sm" weight="bold" as="span">
                  포커스 관리:
                </Body>
                <Body size="sm" as="span">
                  {' '}
                  모바일 메뉴 포커스 트랩 자동 처리
                </Body>
              </ListItem>
              <ListItem>
                <Body size="sm" weight="bold" as="span">
                  로고 alt 텍스트:
                </Body>
                <Body size="sm" as="span">
                  {' '}
                  이미지 alt 속성 필수 제공
                </Body>
              </ListItem>
            </List>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          {/* Props */}
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="HeaderWithMegaMenu Props" />
              <List variant="unordered" spacing="tight">
                <ListItem>
                  <Code>megaColumns</Code> (필수): <Code>MegaMenuColumn[]</Code>{' '}
                  - MegaMenu 컬럼 데이터
                </ListItem>
                <ListItem>
                  <Code>utilityLinks</Code>: <Code>UtilityLink[]</Code> - 상단
                  유틸리티 링크 (기본값: 로그인, 회원가입, ENGLISH)
                </ListItem>
                <ListItem>
                  <Code>relatedSites</Code>: <Code>UtilityLink[]</Code> - 관련
                  사이트 드롭다운 (기본값: 건강iN 등 4개)
                </ListItem>
                <ListItem>
                  <Code>logo</Code>: <Code>string</Code> - 로고 이미지 URL
                  (기본값: KRDS 로고)
                </ListItem>
                <ListItem>
                  <Code>logoAlt</Code>: <Code>string</Code> - 로고 대체 텍스트
                  (기본값: "대한민국정부")
                </ListItem>
                <ListItem>
                  <Code>logoHref</Code>: <Code>string</Code> - 로고 클릭 시 이동
                  URL (기본값: "/")
                </ListItem>
                <ListItem>
                  <Code>slogan</Code>: <Code>React.ReactNode</Code> - 슬로건
                  내용
                </ListItem>
                <ListItem>
                  <Code>className</Code>: <Code>string</Code> - 추가 CSS
                  클래스명
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="HeaderWithNavigation Props" />
              <List variant="unordered" spacing="tight">
                <ListItem>
                  <Code>navigationItems</Code> (필수):{' '}
                  <Code>NavigationMenuItem[]</Code> - NavigationMenu 항목 데이터
                </ListItem>
                <ListItem>
                  <Code>utilityLinks</Code>: <Code>UtilityLink[]</Code> - 상단
                  유틸리티 링크 (기본값: 로그인, 회원가입, ENGLISH)
                </ListItem>
                <ListItem>
                  <Code>relatedSites</Code>: <Code>UtilityLink[]</Code> - 관련
                  사이트 드롭다운 (기본값: 건강iN 등 4개)
                </ListItem>
                <ListItem>
                  <Code>logo</Code>: <Code>string</Code> - 로고 이미지 URL
                  (기본값: KRDS 로고)
                </ListItem>
                <ListItem>
                  <Code>logoAlt</Code>: <Code>string</Code> - 로고 대체 텍스트
                  (기본값: "대한민국정부")
                </ListItem>
                <ListItem>
                  <Code>logoHref</Code>: <Code>string</Code> - 로고 클릭 시 이동
                  URL (기본값: "/")
                </ListItem>
                <ListItem>
                  <Code>slogan</Code>: <Code>React.ReactNode</Code> - 슬로건
                  내용
                </ListItem>
                <ListItem>
                  <Code>className</Code>: <Code>string</Code> - 추가 CSS
                  클래스명
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="UtilityLink Type" />
              <Code variant="block" language="tsx">
                {`interface UtilityLink {
  label: string;  // 링크 텍스트
  href: string;   // 링크 URL
}`}
              </Code>
            </Subsection>
          </Section>

          {/* KRDS 준수사항 */}
          <Section level="h2">
            <Heading level="h2" id="krds-standards" title="KRDS 준수사항" />

            <Card variant="filled">
              <List variant="check" spacing="tight">
                <ListItem>
                  3단계 구조: Utility Bar / Branding / Main Menu
                </ListItem>
                <ListItem>
                  CSS Modules 방식: SCSS 기반 명확한 스타일 구조
                </ListItem>
                <ListItem>
                  반응형 디자인: Desktop(1024px+) / Mobile(1023px 이하)
                </ListItem>
                <ListItem>
                  Sticky Position: 스크롤 시 상단 고정 (z-index: 70)
                </ListItem>
                <ListItem>
                  CSS Variables: KRDS 디자인 토큰 활용 (--krds-header-*,
                  --krds-color-*)
                </ListItem>
                <ListItem>
                  모바일 메뉴: 햄버거 메뉴 및 전체 화면 네비게이션
                </ListItem>
                <ListItem>
                  드롭다운 메뉴: Desktop hover 기반, Mobile 아코디언 형태
                </ListItem>
                <ListItem>
                  아이콘: lucide-react 사용 (Search, Menu, X, ChevronDown)
                </ListItem>
              </List>
            </Card>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Grid', href: '/components/grid' }}
        next={{ title: 'Heading', href: '/components/heading' }}
      />
    </>
  );
}
