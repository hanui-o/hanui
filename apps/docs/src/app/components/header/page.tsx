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
    <Section>
      <SectionHeading
        level="h1"
        id="header"
        title="Header"
        description="정부 서비스의 일관된 브랜딩과 네비게이션을 제공하는 헤더 레이아웃 컴포넌트입니다. KRDS 표준을 준수하며, 로고, 유틸리티 링크, 검색, 메인 메뉴를 포함합니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Installation */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="installation" title="설치" />
            <Body>
              CLI를 사용하여 컴포넌트를 프로젝트에 설치할 수 있습니다.
            </Body>
            <Card>
              <Code language="bash">npx @hanui/cli add header</Code>
            </Card>
            <Body size="sm" className="text-krds-gray-60 mt-2">
              설치 시 자동으로 sass 패키지가 devDependencies에 추가됩니다.
            </Body>
          </Subsection>

          {/* What is it */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="what-is-it" title="Header란?" />
            <Body>
              Header는 정부 디지털 서비스의 최상단에 위치하여 브랜딩,
              네비게이션, 유틸리티 기능을 제공하는 컴포넌트입니다.
            </Body>
            <Body>
              KRDS 표준에 따라 일관된 사용자 경험을 제공하며, 서비스 로고, 주요
              메뉴, 검색, 로그인 등의 기능을 포함합니다.
            </Body>
          </Subsection>

          {/* Preview */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="preview" title="미리보기" />
            <Body>
              Header는 Compound Component 패턴을 사용합니다. 아래는 기본
              구조입니다:
            </Body>
            <Card>
              <Code language="tsx">
                {`import { Header } from '@hanui/react';

<Header>
  <Header.Branding>
    <Header.Logo
      src="/logo.svg"
      alt="정부 서비스"
      href="/"
    />
    <Header.Slogan>국민을 위한 서비스</Header.Slogan>
  </Header.Branding>
  <Header.Utility>
    <Header.UtilityLink href="/login">로그인</Header.UtilityLink>
    <Header.UtilityLink href="/signup">회원가입</Header.UtilityLink>
  </Header.Utility>
</Header>`}
              </Code>
            </Card>
          </Subsection>

          {/* Best Practices */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="best-practices" title="모범 사례" />

            <List variant="disc">
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
                전환됩니다
              </ListItem>
            </List>
          </Subsection>

          {/* Accessibility */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="accessibility" title="접근성" />
            <Body>이 컴포넌트는 WCAG 2.1 / KWCAG 2.2 기준을 준수합니다.</Body>

            <List variant="disc">
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
                <strong>포커스 관리:</strong> 명확한 포커스 표시를 제공합니다
              </ListItem>
            </List>
          </Subsection>

          {/* Foundation Layer */}
          <Subsection level="h2">
            <SectionHeading
              level="h2"
              id="foundation-layer"
              title="Foundation Layer"
            />
            <Body>Header 컴포넌트는 다음 기능들을 자동으로 처리합니다:</Body>

            <Card variant="info">
              <List variant="check">
                <ListItem>
                  <strong>KRDS 필수 ID:</strong> <Code>#krds-header</Code> ID가
                  자동으로 적용됩니다 (KRDS 필수 요구사항)
                </ListItem>
                <ListItem>
                  <strong>시맨틱 HTML:</strong> header 요소를 사용하여 페이지
                  구조를 명확히 합니다
                </ListItem>
                <ListItem>
                  <strong>컨텍스트 제공:</strong> 하위 컴포넌트에 variant 정보를
                  전달합니다
                </ListItem>
                <ListItem>
                  <strong>다크 모드:</strong> 라이트/다크 모드를 자동으로
                  지원합니다
                </ListItem>
                <ListItem>
                  <strong>반응형 컨테이너:</strong> container 클래스로 일관된
                  너비를 유지합니다
                </ListItem>
              </List>
            </Card>
          </Subsection>

          {/* KRDS Standards */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="krds-standards" title="KRDS 표준" />

            <Card variant="warning">
              <List variant="disc">
                <ListItem>
                  <strong>필수 ID:</strong> <Code>#krds-header</Code> ID 사용
                  필수
                </ListItem>
                <ListItem>
                  <strong>최상단 배치:</strong> 페이지 최상단에 고정 위치
                </ListItem>
                <ListItem>
                  <strong>일관된 브랜딩:</strong> 모든 페이지에서 동일한 헤더
                  사용
                </ListItem>
                <ListItem>
                  <strong>주요 네비게이션:</strong> 서비스의 주요 섹션으로
                  이동하는 메뉴 제공
                </ListItem>
                <ListItem>
                  <strong>유틸리티 링크:</strong> 로그인, 회원가입 등 보조 기능
                  제공
                </ListItem>
              </List>
            </Card>
          </Subsection>
        </TabsContent>

        <TabsContent value="api">
          {/* API Reference */}
          <Subsection level="h2">
            <SectionHeading
              level="h2"
              id="api-reference"
              title="API Reference"
            />

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="header-props"
                title="Header Props"
              />
              <Body>
                Header는 Compound Component 패턴을 사용합니다. 주요 Props:
              </Body>
              <Card>
                <Code language="tsx">
                  {`export interface HeaderProps {
  /**
   * Header variant
   * @default "default"
   */
  variant?: 'default' | 'compact';

  /**
   * Additional className
   */
  className?: string;

  /**
   * Header content (compound components)
   */
  children: React.ReactNode;
}`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="compound-components"
                title="Compound Components"
              />
              <Body>Header는 다음의 하위 컴포넌트들로 구성됩니다:</Body>

              <List variant="disc">
                <ListItem>
                  <Code>Header.Branding</Code> - 로고와 슬로건을 포함하는 영역
                </ListItem>
                <ListItem>
                  <Code>Header.Logo</Code> - 서비스 로고 이미지
                </ListItem>
                <ListItem>
                  <Code>Header.Slogan</Code> - 서비스 슬로건 텍스트
                </ListItem>
                <ListItem>
                  <Code>Header.Utility</Code> - 유틸리티 링크 컨테이너
                </ListItem>
                <ListItem>
                  <Code>Header.UtilityLink</Code> - 개별 유틸리티 링크
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" id="example" title="전체 예제" />
              <Card>
                <Code language="tsx">
                  {`import { Header } from '@hanui/react';

export default function Layout() {
  return (
    <Header variant="default">
      <Header.Branding>
        <Header.Logo
          src="/logo.svg"
          alt="정부 서비스 로고"
          href="/"
        />
        <Header.Slogan>
          국민을 위한 디지털 서비스
        </Header.Slogan>
      </Header.Branding>

      <Header.Utility>
        <Header.UtilityLink href="/login">
          로그인
        </Header.UtilityLink>
        <Header.UtilityLink href="/signup">
          회원가입
        </Header.UtilityLink>
        <Header.UtilityLink href="/mypage">
          마이페이지
        </Header.UtilityLink>
      </Header.Utility>
    </Header>
  );
}`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="krds-note"
                title="KRDS 표준 준수"
              />
              <Card variant="warning">
                <Body className="font-medium mb-2">중요사항:</Body>
                <List variant="disc">
                  <ListItem>
                    Header는 자동으로 <Code>#krds-header</Code> ID를 적용하여
                    KRDS 표준을 준수합니다
                  </ListItem>
                  <ListItem>반드시 페이지 최상단에 배치해야 합니다</ListItem>
                  <ListItem>
                    모든 페이지에서 일관된 헤더를 사용해야 합니다
                  </ListItem>
                </List>
              </Card>
            </Subsection>
          </Subsection>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'File Upload', href: '/components/file-upload' }}
        next={{ title: 'Heading', href: '/components/heading' }}
      />
    </Section>
  );
}
