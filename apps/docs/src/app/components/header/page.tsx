'use client';

import {
  Section,
  Subsection,
  SectionHeading,
  Body,
  Card,
  Code,
  List,
  ListItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  PageNavigation,
} from '@/components/hanui';

export default function HeaderPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Header"
        description="정부 서비스의 일관된 브랜딩과 네비게이션을 제공하는 헤더 컴포넌트입니다. 현재는 CSS Modules 방식으로 제공되며, Tailwind 스타일은 추후 지원 예정입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Installation */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="installation"
              title="설치"
              description="Header 컴포넌트를 프로젝트에 추가합니다."
            />

            <Code variant="block" language="bash" showLineNumbers={false}>
              npx @hanui/cli add header
            </Code>
          </Section>

          {/* What is it */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="what-is-it"
              title="Header란?"
              description="KRDS 표준에 따라 일관된 사용자 경험을 제공하는 레이아웃 컴포넌트입니다."
            />

            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>KRDS 표준 준수:</strong> #krds-header ID 자동 적용 및
                  시맨틱 HTML 사용
                </ListItem>
                <ListItem>
                  <strong>반응형 디자인:</strong> 모바일/데스크톱 자동 대응 및
                  햄버거 메뉴 제공
                </ListItem>
                <ListItem>
                  <strong>접근성:</strong> ARIA 레이블, 키보드 네비게이션,
                  포커스 트랩 자동 처리
                </ListItem>
                <ListItem>
                  <strong>2단계 메뉴:</strong> 주요 메뉴와 하위 메뉴(submenu)
                  지원
                </ListItem>
                <ListItem>
                  <strong>유틸리티 링크:</strong> 로그인, 회원가입 등 상단 링크
                  지원
                </ListItem>
                <ListItem>
                  <strong>Skip Link:</strong> 본문 바로가기 링크 자동 포함
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* Usage */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="usage"
              title="사용 예제"
              description="Header 컴포넌트의 기본 사용법입니다."
            />

            <Code variant="block" language="tsx" showLineNumbers={false}>
              {`import { Header } from '@/components/hanui/header';

export default function Layout() {
  return (
    <Header
      logoSrc="/logo.svg"
      logoAlt="정부 서비스"
      logoHref="/"
      slogan="국민을 위한 서비스"
      utilityLinks={[
        { href: '/login', label: '로그인' },
        { href: '/signup', label: '회원가입' },
      ]}
      menuItems={[
        { href: '/about', label: '소개' },
        { href: '/services', label: '서비스' },
        { href: '/contact', label: '문의' },
      ]}
    />
  );
}`}
            </Code>
          </Section>

          {/* Examples */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="examples"
              title="예제"
              description="다양한 Header 구성 예제입니다."
            />

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                title="하위 메뉴 (Submenu)"
                description="2단계 네비게이션 메뉴를 추가할 수 있습니다."
              />

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Header
  logoSrc="/logo.svg"
  logoAlt="정부 서비스"
  menuItems={[
    { href: '/about', label: '소개' },
    {
      href: '/support',
      label: '지원',
      submenu: [
        { href: '/support/faq', label: 'FAQ' },
        { href: '/support/contact', label: '문의' },
        { href: '/support/guide', label: '이용 가이드' },
      ],
    },
  ]}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                title="전체 예제"
                description="모든 옵션을 포함한 완전한 Header 예제입니다."
              />

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`import { Header } from '@/components/hanui/header';

export default function Layout({ children }) {
  return (
    <>
      <Header
        logoSrc="/assets/logo.svg"
        logoAlt="정부 디지털 서비스"
        logoHref="/"
        slogan="국민을 위한 디지털 서비스"
        utilityLinks={[
          { href: '/login', label: '로그인' },
          { href: '/signup', label: '회원가입' },
          { href: '/language', label: '한국어' },
        ]}
        menuItems={[
          { href: '/about', label: '소개' },
          { href: '/services', label: '서비스' },
          {
            href: '/support',
            label: '지원',
            submenu: [
              { href: '/support/faq', label: 'FAQ' },
              { href: '/support/contact', label: '문의' },
              { href: '/support/guide', label: '이용 가이드' },
            ],
          },
          { href: '/news', label: '소식' },
          { href: '/contact', label: '문의' },
        ]}
      />
      <main id="main-content">{children}</main>
    </>
  );
}`}
              </Code>
            </Subsection>
          </Section>

          {/* Best Practices */}
          <Section level="h2">
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
                <strong>명확한 브랜딩:</strong> 서비스 로고와 슬로건을 명확하게
                표시합니다
              </ListItem>
              <ListItem>
                <strong>주요 메뉴 제한:</strong> 5-7개의 주요 메뉴 항목으로
                제한합니다
              </ListItem>
              <ListItem>
                <strong>반응형 디자인:</strong> 모바일 화면에서는 햄버거 메뉴로
                자동 전환됩니다
              </ListItem>
            </List>
          </Section>

          {/* Accessibility */}
          <Section level="h2">
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
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="krds-standards"
              title="KRDS 표준"
              description="Header 컴포넌트가 준수하는 KRDS 표준입니다."
            />

            <Card variant="info">
              <Body className="font-semibold mb-3">
                자동 처리되는 KRDS 표준:
              </Body>
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>필수 ID:</strong> <Code>#krds-header</Code> ID 자동
                  적용 (KRDS 필수 요구사항)
                </ListItem>
                <ListItem>
                  <strong>시맨틱 HTML:</strong> header 요소를 사용하여 페이지
                  구조를 명확히 합니다
                </ListItem>
                <ListItem>
                  <strong>반응형 컨테이너:</strong> 일관된 너비를 유지합니다
                </ListItem>
                <ListItem>
                  <strong>다크 모드:</strong> 라이트/다크 모드를 자동으로
                  지원합니다
                </ListItem>
                <ListItem>
                  <strong>CSS Variables:</strong> KRDS 디자인 토큰을 CSS
                  Variables로 제공합니다
                </ListItem>
              </List>
            </Card>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          {/* Props */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="props"
              title="Props"
              description="Header 컴포넌트의 속성입니다."
            />

            <Subsection level="h3">
              <SectionHeading level="h3" title="logoSrc" />
              <List variant="unordered">
                <ListItem>
                  <strong>타입:</strong> <Code>string</Code>
                </ListItem>
                <ListItem>
                  <strong>필수:</strong> Yes
                </ListItem>
                <ListItem>
                  <strong>설명:</strong> 서비스 로고 이미지 경로
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="logoAlt" />
              <List variant="unordered">
                <ListItem>
                  <strong>타입:</strong> <Code>string</Code>
                </ListItem>
                <ListItem>
                  <strong>필수:</strong> Yes
                </ListItem>
                <ListItem>
                  <strong>설명:</strong> 로고 이미지 대체 텍스트 (접근성 필수)
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="logoHref" />
              <List variant="unordered">
                <ListItem>
                  <strong>타입:</strong> <Code>string</Code>
                </ListItem>
                <ListItem>
                  <strong>기본값:</strong> <Code>"/"</Code>
                </ListItem>
                <ListItem>
                  <strong>설명:</strong> 로고 링크 URL
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="slogan" />
              <List variant="unordered">
                <ListItem>
                  <strong>타입:</strong> <Code>string</Code>
                </ListItem>
                <ListItem>
                  <strong>필수:</strong> No
                </ListItem>
                <ListItem>
                  <strong>설명:</strong> 서비스 슬로건 텍스트 (선택사항)
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="utilityLinks" />
              <List variant="unordered">
                <ListItem>
                  <strong>타입:</strong>{' '}
                  <Code>{`Array<{ href: string; label: string }>`}</Code>
                </ListItem>
                <ListItem>
                  <strong>기본값:</strong> <Code>[]</Code>
                </ListItem>
                <ListItem>
                  <strong>설명:</strong> 상단 유틸리티 링크 (로그인, 회원가입
                  등)
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="menuItems" />
              <List variant="unordered">
                <ListItem>
                  <strong>타입:</strong>{' '}
                  <Code>
                    {`Array<{ href: string; label: string; submenu?: Array<{ href: string; label: string }> }>`}
                  </Code>
                </ListItem>
                <ListItem>
                  <strong>기본값:</strong> <Code>[]</Code>
                </ListItem>
                <ListItem>
                  <strong>설명:</strong> 주요 네비게이션 메뉴 항목 (2단계 메뉴
                  지원)
                </ListItem>
              </List>
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
