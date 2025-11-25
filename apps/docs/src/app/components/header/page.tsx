'use client';

// Docs layout components
import {
  PageSection as Section,
  Subsection,
  Heading,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';
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
  Header,
} from '@hanui/react';

export default function HeaderPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Header"
        description="KRDS 표준 3단계 구조(Utility Bar / Branding / Main Menu)를 따르는 정부 서비스 헤더 컴포넌트입니다."
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

            {/* Desktop */}
            <Body className="mb-2 font-semibold text-krds-gray-90">
              Desktop (1280px)
            </Body>
            <ComponentPreview className="h-[400px] overflow-hidden">
              <div
                className="scale-[0.7] origin-top w-[1280px]"
                style={{ height: '571px' }}
              >
                <Header className="w-[1280px]" />
              </div>
            </ComponentPreview>

            <Code variant="block" language="tsx">
              {`import { Header } from '@hanui/react'

<Header />`}
            </Code>
          </Section>

          <Section level="h2">
            <Installation componentName="header" />
          </Section>

          {/* Usage */}
          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { Header } from '@hanui/react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}`}
            </Code>
          </Section>

          {/* Examples */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            {/* 레이아웃 구조 */}
            <Subsection level="h3">
              <Heading level="h3" title="레이아웃 구조" />
              <Body className="mb-4">
                Header는 KRDS 표준에 따라 3단계 구조로 구성됩니다:
              </Body>

              <Card variant="info">
                <List variant="check" spacing="tight">
                  <ListItem>
                    <Body size="sm" weight="bold" as="span">
                      Utility Bar:
                    </Body>
                    <Body size="sm" as="span">
                      {' '}
                      로그인, 회원가입, 언어 선택 등 (Desktop만 표시)
                    </Body>
                  </ListItem>
                  <ListItem>
                    <Body size="sm" weight="bold" as="span">
                      Branding:
                    </Body>
                    <Body size="sm" as="span">
                      {' '}
                      로고, 슬로건, 검색 및 모바일 메뉴 버튼
                    </Body>
                  </ListItem>
                  <ListItem>
                    <Body size="sm" weight="bold" as="span">
                      Main Menu:
                    </Body>
                    <Body size="sm" as="span">
                      {' '}
                      주요 네비게이션 및 서브메뉴
                    </Body>
                  </ListItem>
                </List>
              </Card>

              <Code variant="block" language="tsx" className="mt-4">
                {`<header className={styles.header}>
  {/* 1. Utility Bar - Desktop만 표시 */}
  <div className={styles.headerUtility}>
    <ul className={styles.utilityList}>
      <li><button>로그인</button></li>
      <li><button>회원가입</button></li>
    </ul>
  </div>

  {/* 2. Branding - 로고 및 액션 */}
  <div className={styles.headerBranding}>
    <h1 className={styles.logo}>
      <a href="/"><img src="/logo.svg" alt="서비스명" /></a>
    </h1>
    <div className={styles.headerActions}>
      <button className={styles.searchBtn}><Search /></button>
      <button className={styles.menuBtn}><Menu /></button>
    </div>
  </div>

  {/* 3. Main Menu - Desktop: 드롭다운, Mobile: 전체화면 */}
  <nav className={styles.mainMenu}>
    <ul className={styles.menuList}>
      <li className={styles.menuItem}>
        <button className={styles.menuLink}>
          건강보험 <ChevronDown />
        </button>
        {/* 서브메뉴 */}
      </li>
    </ul>
  </nav>
</header>`}
              </Code>
            </Subsection>

            {/* 커스터마이징 */}
            <Subsection level="h3">
              <Heading level="h3" title="커스터마이징" />
              <Body className="mb-4">
                설치된 <Code>components/hanui/header.tsx</Code> 및{' '}
                <Code>header.module.scss</Code> 파일을 직접 수정하여
                커스터마이징할 수 있습니다.
              </Body>

              <Card variant="info">
                <Body className="mb-3">설치 시 추가되는 파일:</Body>
                <List spacing="tight">
                  <ListItem>
                    <Code>components/hanui/header.tsx</Code> - Header 컴포넌트
                  </ListItem>
                  <ListItem>
                    <Code>components/hanui/header.module.scss</Code> - CSS
                    Modules 스타일
                  </ListItem>
                </List>
              </Card>

              <Code variant="block" language="tsx" className="mt-4">
                {`// components/hanui/header.tsx
export function Header({ className }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className={\`\${styles.header} \${className || ''}\`}>
      {/* 로고 수정 */}
      <h1 className={styles.logo}>
        <a href="/">
          <img src="/your-logo.svg" alt="귀하의 서비스명" />
        </a>
      </h1>

      {/* 메뉴 항목 수정 */}
      <ul className={styles.menuList}>
        <li>
          <button className={styles.menuLink}>
            첫 번째 메뉴
          </button>
        </li>
      </ul>
    </header>
  );
}`}
              </Code>
            </Subsection>

            {/* 반응형 동작 */}
            <Subsection level="h3">
              <Heading level="h3" title="반응형 동작" />
              <Body className="mb-4">
                Desktop(1024px+)과 Mobile(1023px 이하) 두 가지 브레이크포인트로
                자동 대응합니다.
              </Body>

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
            <Heading level="h2" id="accessibility" title="접근성" />
            <Body className="mb-4">
              Header는 WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다.
            </Body>

            <Card variant="info">
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
            </Card>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          {/* Props */}
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="Header Props" />
              <List variant="unordered" spacing="tight">
                <ListItem>
                  <Code>className</Code> (optional): 추가 CSS 클래스명
                </ListItem>
              </List>

              <Code variant="block" language="tsx" className="mt-4">
                {`<Header className="custom-header-class" />`}
              </Code>
            </Subsection>
          </Section>

          {/* State Management */}
          <Section level="h2">
            <Heading level="h2" id="state-management" title="상태 관리" />

            <Subsection level="h3">
              <Heading level="h3" title="isMobileMenuOpen" />
              <Body className="mb-4">
                모바일 메뉴의 열림/닫힘 상태를 관리하는 React state입니다.
              </Body>

              <Code variant="block" language="tsx">
                {`const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

// 메뉴 버튼 클릭 시 토글
<button
  className={styles.menuBtn}
  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
>
  {isMobileMenuOpen ? <X /> : <Menu />}
</button>

// 조건부 렌더링
{isMobileMenuOpen && (
  <nav className={styles.mainMenuMobile}>
    {/* 모바일 메뉴 내용 */}
  </nav>
)}`}
              </Code>
            </Subsection>
          </Section>

          {/* KRDS 준수사항 */}
          <Section level="h2">
            <Heading level="h2" id="krds-standards" title="KRDS 준수사항" />

            <Card variant="info">
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
        prev={{ title: 'File Upload', href: '/components/file-upload' }}
        next={{ title: 'Heading', href: '/components/heading' }}
      />
    </>
  );
}
