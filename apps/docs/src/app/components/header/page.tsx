'use client';

// Docs layout components
import {
  PageSection as Section,
  Subsection,
  SectionHeading,
  PageNavigation,
} from '@/components/content';

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
      <SectionHeading
        level="h1"
        title="Header"
        description="KRDS 표준을 따르는 정부 서비스 헤더 컴포넌트입니다. CSS Modules 방식으로 구현되어 복잡한 네비게이션과 반응형 디자인을 효과적으로 관리합니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Installation */}
          <Section>
            <SectionHeading
              level="h2"
              id="installation"
              title="설치"
              description="Header 컴포넌트를 프로젝트에 추가합니다."
            />

            <Code variant="block" language="bash" showLineNumbers={false}>
              npx hanui add header
            </Code>

            <Card variant="info" className="mt-6">
              <Body className="mb-3">설치 시 다음 파일이 추가됩니다:</Body>
              <List className="text-krds-gray-90">
                <ListItem>
                  <Code>components/hanui/header.tsx</Code> - Header 컴포넌트
                </ListItem>
                <ListItem>
                  <Code>components/hanui/header.module.scss</Code> - CSS Modules
                  스타일
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* What is it */}
          <Section>
            <SectionHeading
              level="h2"
              id="what-is-it"
              title="Header란?"
              description="KRDS 표준에 따라 구조화된 정부 서비스 헤더입니다."
            />

            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>CSS Modules 방식:</strong> SCSS를 활용한 명확한 스타일
                  구조
                </ListItem>
                <ListItem>
                  <strong>3단계 구조:</strong> Utility Bar / Branding / Main
                  Menu
                </ListItem>
                <ListItem>
                  <strong>반응형 디자인:</strong> Desktop(1024px+) / Mobile 자동
                  대응 및 햄버거 메뉴
                </ListItem>
                <ListItem>
                  <strong>2단계 메뉴:</strong> 주요 메뉴와 서브메뉴(드롭다운)
                  지원
                </ListItem>
                <ListItem>
                  <strong>모바일 상태 관리:</strong> React useState를 활용한
                  메뉴 토글
                </ListItem>
                <ListItem>
                  <strong>접근성:</strong> ARIA 레이블, 키보드 네비게이션 지원
                </ListItem>
                <ListItem>
                  <strong>KRDS 디자인 토큰:</strong> CSS 변수를 통한 일관된
                  스타일 적용
                </ListItem>
              </List>
            </Card>
          </Section>

          <Section className="overflow-x-scroll h-[540px] border border-krds-gray-10">
            <Header className="w-[1280px]" />
          </Section>

          {/* Usage */}
          <Section>
            <SectionHeading
              level="h2"
              id="usage"
              title="사용 예제"
              description="Header 컴포넌트의 기본 사용법입니다."
            />

            <Subsection level="h3">
              <SectionHeading level="h3" title="기본 사용" />
              <Body className="mb-4 text-krds-gray-70">
                Header 컴포넌트는 KRDS 표준 레이아웃을 그대로 제공합니다.
                레이아웃의 최상단에 배치하세요.
              </Body>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`

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
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="커스터마이징" />
              <Body className="mb-4 text-krds-gray-70">
                내용을 변경하려면 <Code>header.tsx</Code> 파일을 직접
                수정하세요. CSS Modules 방식이므로{' '}
                <Code>header.module.scss</Code>에서 스타일을 조정할 수 있습니다.
              </Body>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`// components/hanui/header.tsx
export function Header({ className }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className={\`\${styles.header} \${className || ''}\`}>
      {/* Header Utility - 상단 유틸리티 바 */}
      <div className={styles.headerUtility}>
        <div className={styles.inner}>
          <ul className={styles.utilityList}>
            <li>
              <button type="button" className={styles.utilityLink}>
                로그인
              </button>
            </li>
            <li>
              <button type="button" className={styles.utilityLink}>
                회원가입
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Header Branding - 로고 및 검색 */}
      <div className={styles.headerBranding}>
        <div className={styles.inner}>
          <h1 className={styles.logo}>
            <a href="/">
              <img src="/logo.svg" alt="서비스명" />
            </a>
          </h1>

          <div className={styles.headerActions}>
            <button className={styles.searchBtn}>
              <Search />
            </button>
            <button
              className={styles.menuBtn}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Main Menu */}
      <nav className={styles.mainMenu}>
        {/* 메뉴 항목들 */}
      </nav>

      {/* Mobile Main Menu */}
      {isMobileMenuOpen && (
        <nav className={styles.mainMenuMobile}>
          {/* 모바일 메뉴 */}
        </nav>
      )}
    </header>
  );
}`}
              </Code>
            </Subsection>
          </Section>

          {/* Structure */}
          <Section>
            <SectionHeading
              level="h2"
              id="structure"
              title="레이아웃 구조"
              description="Header는 다음과 같은 KRDS 표준 구조로 구성됩니다."
            />

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                title="1. Utility Bar (headerUtility)"
              />
              <Body className="mb-4 text-krds-gray-70">
                상단 유틸리티 링크 영역입니다. 로그인, 회원가입, 언어 선택 등의
                버튼을 포함합니다. Desktop(1024px+)에서만 표시됩니다.
              </Body>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<div className={styles.headerUtility}>
  <div className={styles.inner}>
    <ul className={styles.utilityList}>
      <li>
        <button type="button" className={styles.utilityLink}>
          로그인
        </button>
      </li>
      <li>
        <button type="button" className={styles.utilityLink}>
          회원가입
        </button>
      </li>
      <li>
        <button type="button" className={styles.utilityLink}>
          ENGLISH
        </button>
      </li>
      <li>
        <button
          type="button"
          className={styles.utilityDropdownBtn}
          aria-haspopup="true"
        >
          관련사이트
          <ChevronDown className={styles.dropdownIcon} />
        </button>
        <ul className={styles.utilityDropdown}>
          <li><a href="#">건강iN</a></li>
          <li><a href="#">The건강보험</a></li>
        </ul>
      </li>
    </ul>
  </div>
</div>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="2. Branding (headerBranding)" />
              <Body className="mb-4 text-krds-gray-70">
                로고, 슬로건, 검색 및 모바일 메뉴 버튼 영역입니다.
              </Body>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<div className={styles.headerBranding}>
  <div className={styles.inner}>
    <h1 className={styles.logo}>
      <a href="/">
        <img src="/logo.svg" alt="대한민국정부" />
      </a>
    </h1>
    <span className={styles.slogan}>
      <span className={styles.srOnly}>슬로건</span>
    </span>

    <div className={styles.headerActions}>
      <button type="button" className={styles.searchBtn}>
        <Search />
      </button>
      <button
        type="button"
        className={styles.menuBtn}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X /> : <Menu />}
      </button>
    </div>
  </div>
</div>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="3. Main Menu (mainMenu)" />
              <Body className="mb-4 text-krds-gray-70">
                주요 네비게이션 메뉴입니다. Desktop(1024px+)에서만 표시되며,
                hover 시 서브메뉴가 드롭다운 형태로 나타납니다.
              </Body>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<nav className={styles.mainMenu}>
  <div className={styles.inner}>
    <ul className={styles.menuList}>
      <li className={styles.menuItem}>
        <button type="button" className={styles.menuLink}>
          건강보험
          <ChevronDown className={styles.menuIcon} />
        </button>
        <div className={styles.subMenuWrapper}>
          <div className={styles.subMenuInner}>
            <ul className={styles.subMenuList}>
              <li><a href="#" className={styles.subMenuLink}>보험료</a></li>
              <li><a href="#" className={styles.subMenuLink}>급여</a></li>
              <li><a href="#" className={styles.subMenuLink}>요양기관</a></li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </div>
</nav>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                title="4. Mobile Menu (mainMenuMobile)"
              />
              <Body className="mb-4 text-krds-gray-70">
                모바일 전체 화면 메뉴입니다. <Code>isMobileMenuOpen</Code>{' '}
                상태에 따라 조건부 렌더링됩니다.
              </Body>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`{isMobileMenuOpen && (
  <nav className={styles.mainMenuMobile}>
    <div className={styles.mobileMenuInner}>
      <ul className={styles.mobileMenuList}>
        <li className={styles.mobileMenuItem}>
          <button type="button" className={styles.mobileMenuLink}>
            건강보험
            <ChevronDown className={styles.mobileMenuIcon} />
          </button>
          <ul className={styles.mobileSubMenuList}>
            <li><a href="#" className={styles.mobileSubMenuLink}>보험료</a></li>
            <li><a href="#" className={styles.mobileSubMenuLink}>급여</a></li>
          </ul>
        </li>
      </ul>

      {/* Mobile Utility */}
      <div className={styles.mobileUtility}>
        <button type="button" className={styles.mobileUtilityBtn}>
          로그인
        </button>
        <button type="button" className={styles.mobileUtilityBtn}>
          회원가입
        </button>
      </div>
    </div>
  </nav>
)}`}
              </Code>
            </Subsection>
          </Section>

          {/* Styling */}
          <Section>
            <SectionHeading
              level="h2"
              id="styling"
              title="스타일 커스터마이징"
              description="CSS Modules를 활용한 스타일 수정 방법입니다."
            />

            <Subsection level="h3">
              <SectionHeading level="h3" title="KRDS 디자인 토큰 활용" />
              <Body className="mb-4 text-krds-gray-70">
                header.module.scss에서 KRDS CSS 변수를 사용하여 일관된 디자인을
                유지합니다.
              </Body>

              <Code variant="block" language="scss" showLineNumbers={false}>
                {`.header {
  --krds-header--utility-gap: var(--krds-gap-4);
  --krds-header--container-gap: var(--krds-gap-2);
  --krds-header--navi-font-size-pc: var(--krds-pc-font-size-navigation-depth-medium-bold);

  position: sticky;
  top: 0;
  left: 0;
  z-index: 70;
  background-color: var(--krds-header--color-surface);
}`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="반응형 브레이크포인트" />
              <Body className="mb-4 text-krds-gray-70">
                Desktop(1024px+)과 Mobile(1023px 이하) 두 가지 브레이크포인트를
                사용합니다.
              </Body>

              <Code variant="block" language="scss" showLineNumbers={false}>
                {`// Desktop: 1024px 이상
@media (min-width: 1024px) {
  .mainMenu {
    display: block;
  }
  .menuBtn {
    display: none;
  }
}

// Mobile: 1023px 이하
@media (max-width: 1023px) {
  .headerUtility {
    display: none;
  }
  .mainMenu {
    display: none;
  }
}`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Sticky Header" />
              <Body className="mb-4 text-krds-gray-70">
                Header는 <Code>position: sticky</Code>를 사용하여 스크롤 시
                상단에 고정됩니다.
              </Body>

              <Code variant="block" language="scss" showLineNumbers={false}>
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

          {/* Best Practices */}
          <Section>
            <SectionHeading
              level="h2"
              id="best-practices"
              title="모범 사례"
              description="Header 컴포넌트를 효과적으로 사용하기 위한 가이드입니다."
            />

            <List variant="unordered">
              <ListItem>
                <strong>일관된 위치:</strong> 모든 페이지 최상단에 고정
                배치합니다
              </ListItem>
              <ListItem>
                <strong>로고 수정:</strong> header.tsx 파일에서 로고 이미지
                경로와 alt 텍스트를 수정하세요
              </ListItem>
              <ListItem>
                <strong>메뉴 항목 조정:</strong> 주요 메뉴는 7개 이내로 유지하는
                것을 권장합니다
              </ListItem>
              <ListItem>
                <strong>모바일 메뉴 관리:</strong> <Code>isMobileMenuOpen</Code>{' '}
                상태를 활용한 메뉴 토글이 자동으로 처리됩니다
              </ListItem>
              <ListItem>
                <strong>스타일 수정:</strong> header.module.scss에서 KRDS 디자인
                토큰을 활용하여 일관성을 유지하세요
              </ListItem>
              <ListItem>
                <strong>접근성 유지:</strong> 로고 이미지의 alt 텍스트, ARIA
                레이블을 반드시 제공하세요
              </ListItem>
            </List>
          </Section>

          {/* Accessibility */}
          <Section>
            <SectionHeading
              level="h2"
              id="accessibility"
              title="접근성"
              description="이 컴포넌트는 WCAG 2.1 / KWCAG 2.2 기준을 준수합니다."
            />

            <List variant="unordered">
              <ListItem>
                <strong>Semantic HTML:</strong> header 요소와 적절한 ARIA 속성을
                사용합니다
              </ListItem>
              <ListItem>
                <strong>키보드 네비게이션:</strong> 모든 링크와 버튼에 키보드로
                접근할 수 있습니다
              </ListItem>
              <ListItem>
                <strong>스크린 리더:</strong> 적절한 ARIA 레이블로 구조를 명확히
                전달합니다
              </ListItem>
              <ListItem>
                <strong>포커스 관리:</strong> 모바일 메뉴 포커스 트랩을 자동으로
                처리합니다
              </ListItem>
              <ListItem>
                <strong>Skip Link:</strong> 본문 바로가기 링크가 자동으로
                포함됩니다
              </ListItem>
            </List>
          </Section>

          {/* KRDS Standards */}
          <Section>
            <SectionHeading
              level="h2"
              id="krds-standards"
              title="KRDS 표준"
              description="Header 컴포넌트가 준수하는 KRDS 표준입니다."
            />

            <Card variant="info">
              <Body className="font-semibold mb-3">준수하는 KRDS 표준:</Body>
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>3단계 구조:</strong> Utility Bar / Branding / Main
                  Menu 순서의 표준 구조
                </ListItem>
                <ListItem>
                  <strong>시맨틱 HTML:</strong> header, nav, ul, li 등 시맨틱
                  요소 사용
                </ListItem>
                <ListItem>
                  <strong>반응형 디자인:</strong> Desktop(1024px+) /
                  Mobile(1023px 이하) 2단계 대응
                </ListItem>
                <ListItem>
                  <strong>Sticky Position:</strong> 스크롤 시 상단 고정
                  (z-index: 70)
                </ListItem>
                <ListItem>
                  <strong>CSS Variables:</strong> KRDS 디자인 토큰 활용
                  (--krds-header-*, --krds-color-*, --krds-gap-*)
                </ListItem>
                <ListItem>
                  <strong>모바일 메뉴:</strong> 햄버거 메뉴 및 전체 화면
                  네비게이션
                </ListItem>
                <ListItem>
                  <strong>드롭다운 메뉴:</strong> Desktop에서 hover 기반,
                  Mobile에서 아코디언 형태
                </ListItem>
                <ListItem>
                  <strong>아이콘:</strong> lucide-react 아이콘 사용 (Search,
                  Menu, X, ChevronDown)
                </ListItem>
              </List>
            </Card>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          {/* Props */}
          <Section>
            <SectionHeading
              level="h2"
              id="props"
              title="Props"
              description="Header 컴포넌트의 속성입니다."
            />

            <Subsection level="h3">
              <SectionHeading level="h3" title="className" />
              <List variant="unordered">
                <ListItem>
                  <strong>타입:</strong> <Code>string</Code>
                </ListItem>
                <ListItem>
                  <strong>필수:</strong> No
                </ListItem>
                <ListItem>
                  <strong>설명:</strong> 추가 CSS 클래스명
                </ListItem>
              </List>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Header className="custom-header-class" />`}
              </Code>
            </Subsection>
          </Section>

          {/* State Management */}
          <Section>
            <SectionHeading
              level="h2"
              id="state-management"
              title="상태 관리"
              description="Header 컴포넌트 내부의 상태 관리입니다."
            />

            <Subsection level="h3">
              <SectionHeading level="h3" title="isMobileMenuOpen" />
              <Body className="mb-4 text-krds-gray-70">
                모바일 메뉴의 열림/닫힘 상태를 관리하는 React state입니다.
              </Body>

              <Code variant="block" language="tsx" showLineNumbers={false}>
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

          {/* CSS Modules Classes */}
          <Section>
            <SectionHeading
              level="h2"
              id="css-modules"
              title="CSS Modules 클래스"
              description="header.module.scss에서 사용 가능한 클래스 목록입니다."
            />

            <Subsection level="h3">
              <SectionHeading level="h3" title="메인 구조" />
              <List variant="unordered">
                <ListItem>
                  <Code>.header</Code> - 메인 헤더 컨테이너 (sticky)
                </ListItem>
                <ListItem>
                  <Code>.inner</Code> - 내부 컨텐츠 래퍼 (max-width 적용)
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Utility Bar 클래스" />
              <List variant="unordered">
                <ListItem>
                  <Code>.headerUtility</Code> - 상단 유틸리티 바
                </ListItem>
                <ListItem>
                  <Code>.utilityList</Code> - 유틸리티 링크 리스트
                </ListItem>
                <ListItem>
                  <Code>.utilityLink</Code> - 유틸리티 링크/버튼
                </ListItem>
                <ListItem>
                  <Code>.utilityDropdownBtn</Code> - 드롭다운 버튼
                </ListItem>
                <ListItem>
                  <Code>.utilityDropdown</Code> - 드롭다운 메뉴
                </ListItem>
                <ListItem>
                  <Code>.dropdownIcon</Code> - 드롭다운 아이콘
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Branding 클래스" />
              <List variant="unordered">
                <ListItem>
                  <Code>.headerBranding</Code> - 브랜딩 영역
                </ListItem>
                <ListItem>
                  <Code>.logo</Code> - 로고
                </ListItem>
                <ListItem>
                  <Code>.slogan</Code> - 슬로건
                </ListItem>
                <ListItem>
                  <Code>.headerActions</Code> - 액션 버튼 컨테이너
                </ListItem>
                <ListItem>
                  <Code>.searchBtn</Code> - 검색 버튼
                </ListItem>
                <ListItem>
                  <Code>.menuBtn</Code> - 모바일 메뉴 버튼
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Desktop 메뉴 클래스" />
              <List variant="unordered">
                <ListItem>
                  <Code>.mainMenu</Code> - 메인 네비게이션
                </ListItem>
                <ListItem>
                  <Code>.menuList</Code> - 메뉴 리스트
                </ListItem>
                <ListItem>
                  <Code>.menuItem</Code> - 메뉴 아이템
                </ListItem>
                <ListItem>
                  <Code>.menuLink</Code> - 메뉴 링크/버튼
                </ListItem>
                <ListItem>
                  <Code>.menuIcon</Code> - 메뉴 아이콘
                </ListItem>
                <ListItem>
                  <Code>.subMenuWrapper</Code> - 서브메뉴 래퍼
                </ListItem>
                <ListItem>
                  <Code>.subMenuInner</Code> - 서브메뉴 내부
                </ListItem>
                <ListItem>
                  <Code>.subMenuList</Code> - 서브메뉴 리스트
                </ListItem>
                <ListItem>
                  <Code>.subMenuLink</Code> - 서브메뉴 링크
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Mobile 메뉴 클래스" />
              <List variant="unordered">
                <ListItem>
                  <Code>.mainMenuMobile</Code> - 모바일 전체화면 메뉴
                </ListItem>
                <ListItem>
                  <Code>.mobileMenuInner</Code> - 모바일 메뉴 내부
                </ListItem>
                <ListItem>
                  <Code>.mobileMenuList</Code> - 모바일 메뉴 리스트
                </ListItem>
                <ListItem>
                  <Code>.mobileMenuItem</Code> - 모바일 메뉴 아이템
                </ListItem>
                <ListItem>
                  <Code>.mobileMenuLink</Code> - 모바일 메뉴 링크/버튼
                </ListItem>
                <ListItem>
                  <Code>.mobileMenuIcon</Code> - 모바일 메뉴 아이콘
                </ListItem>
                <ListItem>
                  <Code>.mobileSubMenuList</Code> - 모바일 서브메뉴 리스트
                </ListItem>
                <ListItem>
                  <Code>.mobileSubMenuLink</Code> - 모바일 서브메뉴 링크
                </ListItem>
                <ListItem>
                  <Code>.mobileUtility</Code> - 모바일 유틸리티 영역
                </ListItem>
                <ListItem>
                  <Code>.mobileUtilityBtn</Code> - 모바일 유틸리티 버튼
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="유틸리티 클래스" />
              <List variant="unordered">
                <ListItem>
                  <Code>.srOnly</Code> - 스크린 리더 전용 텍스트
                </ListItem>
              </List>
            </Subsection>
          </Section>

          {/* CSS Variables */}
          <Section>
            <SectionHeading
              level="h2"
              id="css-variables"
              title="CSS 변수"
              description="사용되는 KRDS 디자인 토큰입니다."
            />

            <Subsection level="h3">
              <SectionHeading level="h3" title="Header 전용 변수" />
              <Code variant="block" language="css" showLineNumbers={false}>
                {`--krds-header--utility-gap
--krds-header--container-gap
--krds-header--container-padding-top
--krds-header--container-padding-bottom
--krds-header--navi-min-height
--krds-header--navi-gap
--krds-header--navi-padding
--krds-header--navi-border-radius
--krds-header--navi-font-size-pc
--krds-header--navi-font-size-mobile
--krds-header--color-surface
--krds-header--utility-color-divider
--krds-header--navi-color-text
--krds-header--navi-color-hover
--krds-header--navi-color-pressed`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="공통 KRDS 변수" />
              <Code variant="block" language="css" showLineNumbers={false}>
                {`/* Gap */
--krds-gap-2, --krds-gap-3, --krds-gap-4

/* Padding */
--krds-padding-2, --krds-padding-5, --krds-padding-6

/* Size */
--krds-size-height-2, --krds-size-height-6, --krds-size-height-7

/* Icon */
--krds-icon--size-medium

/* Color */
--krds-color-primary-60
--krds-color-gray-70
--krds-light-color-surface-white
--krds-light-color-divider-gray-light
--krds-light-color-text-basic
--krds-light-color-action-secondary-hover
--krds-light-color-action-secondary-pressed

/* Container */
--krds-container-max-width  /* 120rem */
--krds-container-padding    /* 2rem */`}
              </Code>
            </Subsection>
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
