'use client';

import { MainMenu } from '@hanui/react';
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
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  PageNavigation,
  DoCard,
  DontCard,
} from '@/components/hanui';

export default function MainMenuPage() {
  return (
    <Section>
      <SectionHeading
        level="h1"
        id="mainmenu"
        title="MainMenu"
        description="서비스의 정보 구조를 탐색할 때 사용하는 주요 네비게이션 컴포넌트입니다. 헤더에 표시되며 드롭다운, 섹션, 설명, 유틸리티 링크를 지원합니다."
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
              <Code language="bash">npx @hanui/cli add mainmenu</Code>
            </Card>
          </Subsection>

          {/* What is it */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="what-is-it" title="MainMenu란?" />
            <Body>
              MainMenu(주 메뉴)는 웹사이트의 주요 네비게이션을 제공하는
              컴포넌트로, 일반적으로 헤더에 배치됩니다.
            </Body>
            <Body>
              정부 기관 웹사이트에서 GNB(Global Navigation Bar)로 불리며,
              사용자가 서비스의 주요 섹션으로 빠르게 이동할 수 있도록 돕습니다.
            </Body>
          </Subsection>

          {/* Preview */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="preview" title="미리보기" />

            <Subsection level="h3">
              <SectionHeading level="h3" id="basic" title="기본 수평 메뉴" />
              <Body>
                간단한 링크들로 구성된 수평 메뉴입니다. 드롭다운 없이 직접
                링크만 제공합니다.
              </Body>
              <Card>
                <MainMenu
                  items={[
                    { label: '홈', href: '/', active: true },
                    { label: '소개', href: '/about' },
                    { label: '서비스', href: '/services' },
                    { label: '고객지원', href: '/support' },
                  ]}
                />
              </Card>
              <Card>
                <Code language="tsx">
                  {`<MainMenu
  items={[
    { label: '홈', href: '/', active: true },
    { label: '소개', href: '/about' },
    { label: '서비스', href: '/services' },
    { label: '고객지원', href: '/support' },
  ]}
/>`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="dropdown-simple"
                title="드롭다운 메뉴 (간단한 서브메뉴)"
              />
              <Body>
                children 속성을 사용하여 간단한 드롭다운 메뉴를 만들 수
                있습니다.
              </Body>
              <Card>
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
              </Card>
              <Card>
                <Code language="tsx">
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
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="dropdown-sections"
                title="섹션별 드롭다운 (설명 및 유틸리티 링크 포함)"
              />
              <Body>
                sections를 사용하여 섹션 제목, 링크 설명, 유틸리티 링크를 포함한
                풍부한 드롭다운을 만들 수 있습니다.
              </Body>
              <Card>
                <MainMenu
                  items={[
                    { label: '홈', href: '/' },
                    {
                      label: '서비스',
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
              </Card>
              <Card>
                <Code language="tsx">
                  {`<MainMenu
  items={[
    { label: '홈', href: '/' },
    {
      label: '서비스',
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
              </Card>
            </Subsection>
          </Subsection>

          {/* Usage */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="usage" title="사용 방법" />
            <Body>
              MainMenu는 일반적으로 Header 컴포넌트 내부에 배치합니다.
            </Body>
            <Card>
              <Code language="tsx">
                {`import { Header, MainMenu } from '@hanui/react';

export default function Layout() {
  return (
    <Header>
      <MainMenu
        items={[
          { label: '홈', href: '/', active: true },
          { label: '소개', href: '/about' },
          {
            label: '서비스',
            children: [
              { label: '건강검진', href: '/services/checkup' },
              { label: '보험료 조회', href: '/services/premium' },
            ],
          },
        ]}
      />
    </Header>
  );
}`}
              </Code>
            </Card>
          </Subsection>

          {/* Best Practices */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="best-practices" title="모범 사례" />

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="when-to-use"
                title="언제 사용하나요?"
              />
              <DoCard>
                <List variant="check">
                  <ListItem>
                    웹사이트의 주요 섹션으로 이동하는 전역 네비게이션이 필요한
                    경우
                  </ListItem>
                  <ListItem>
                    모든 페이지에서 일관된 네비게이션을 제공해야 하는 경우
                  </ListItem>
                  <ListItem>
                    서비스의 계층 구조를 드롭다운으로 보여줘야 하는 경우
                  </ListItem>
                  <ListItem>
                    정부 기관 웹사이트의 KRDS 표준을 준수해야 하는 경우
                  </ListItem>
                </List>
              </DoCard>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="implementation-tips"
                title="구현 팁"
              />
              <List variant="disc">
                <ListItem>
                  <strong>메뉴 개수 제한:</strong> 최대 5-7개의 주요 메뉴
                  항목으로 제한하세요
                </ListItem>
                <ListItem>
                  <strong>우선순위 배치:</strong> 중요한 메뉴를 왼쪽에
                  배치하세요
                </ListItem>
                <ListItem>
                  <strong>명확한 라벨:</strong> 간결하고 이해하기 쉬운 라벨을
                  사용하세요
                </ListItem>
                <ListItem>
                  <strong>설명 활용:</strong> sections를 사용할 때는
                  description으로 링크의 목적을 명확히 하세요
                </ListItem>
                <ListItem>
                  <strong>유틸리티 링크:</strong> "모두 보기" 등의 유틸리티
                  링크로 추가 탐색을 지원하세요
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" id="avoid" title="피해야 할 사항" />
              <DontCard>
                <List variant="cross">
                  <ListItem>
                    3단계를 초과하는 깊은 메뉴 구조 (복잡도 증가)
                  </ListItem>
                  <ListItem>너무 많은 링크로 인한 선택의 과부하</ListItem>
                  <ListItem>
                    마우스 호버에만 의존하는 인터랙션 (키보드 접근성 필수)
                  </ListItem>
                  <ListItem>모호하거나 전문 용어가 많은 레이블</ListItem>
                </List>
              </DontCard>
            </Subsection>
          </Subsection>

          {/* Accessibility */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="accessibility" title="접근성" />
            <Body>
              이 컴포넌트는 WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다.
            </Body>

            <List variant="disc">
              <ListItem>
                <strong>Semantic HTML:</strong> nav 요소와 계층적 리스트 구조
                (ul, li)를 사용합니다
              </ListItem>
              <ListItem>
                <strong>ARIA 속성:</strong> aria-label="Main navigation",
                aria-expanded, aria-haspopup, aria-current="page" 제공
              </ListItem>
              <ListItem>
                <strong>키보드 네비게이션:</strong> Tab, Enter, Space, Esc,
                Arrow keys를 완벽하게 지원합니다
              </ListItem>
              <ListItem>
                <strong>포커스 관리:</strong> 명확한 포커스 순서 및 시각적
                포커스 표시를 제공합니다
              </ListItem>
              <ListItem>
                <strong>외부 클릭 처리:</strong> 드롭다운 외부 클릭 시 자동으로
                닫힙니다
              </ListItem>
            </List>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="keyboard-navigation"
                title="키보드 네비게이션"
              />
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
          </Subsection>

          {/* Foundation Layer */}
          <Subsection level="h2">
            <SectionHeading
              level="h2"
              id="foundation-layer"
              title="Foundation Layer"
            />
            <Body>MainMenu 컴포넌트는 다음 기능들을 자동으로 처리합니다:</Body>

            <Card variant="info">
              <List variant="check">
                <ListItem>
                  <strong>KRDS 필수 클래스:</strong>{' '}
                  <Code>.krds-main-menu</Code> 클래스가 자동으로 적용됩니다
                </ListItem>
                <ListItem>
                  <strong>드롭다운 상태 관리:</strong> useState를 사용하여
                  드롭다운 열림/닫힘 상태를 자동으로 관리합니다
                </ListItem>
                <ListItem>
                  <strong>외부 클릭 감지:</strong> 드롭다운 외부 클릭 시
                  자동으로 닫힙니다
                </ListItem>
                <ListItem>
                  <strong>ESC 키 처리:</strong> ESC 키 입력 시 모든 드롭다운이
                  닫힙니다
                </ListItem>
                <ListItem>
                  <strong>애니메이션:</strong> fade-in과 zoom-in 효과로 부드러운
                  드롭다운 전환을 제공합니다
                </ListItem>
                <ListItem>
                  <strong>다크 모드:</strong> 라이트/다크 모드를 자동으로
                  지원합니다
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
                  <strong>필수 CSS 클래스:</strong> <Code>.krds-main-menu</Code>{' '}
                  클래스 사용 필수
                </ListItem>
                <ListItem>
                  <strong>서비스 정보 구조:</strong> 서비스의 정보 구조 탐색의
                  주요 수단으로 사용
                </ListItem>
                <ListItem>
                  <strong>일관된 위치:</strong> 모든 페이지에서 헤더에 일관되게
                  표시
                </ListItem>
                <ListItem>
                  <strong>메뉴 깊이:</strong> 최대 3단계 메뉴 구조 권장
                </ListItem>
                <ListItem>
                  <strong>드롭다운 정렬:</strong> 레이블 좌측 정렬로 일관된 스캔
                  가능
                </ListItem>
                <ListItem>
                  <strong>키보드 네비게이션:</strong> 마우스 호버에만 의존하지
                  않고 키보드 단독 네비게이션 가능
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
              <SectionHeading level="h3" id="props" title="Props" />
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
                    <TableCell>-</TableCell>
                    <TableCell>메뉴 항목 배열 (필수)</TableCell>
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
                      <Code>&apos;horizontal&apos; | &apos;vertical&apos;</Code>
                    </TableCell>
                    <TableCell>
                      <Code>&apos;horizontal&apos;</Code>
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
              <SectionHeading
                level="h3"
                id="mainmenuitem"
                title="MainMenuItem Type"
              />
              <Card>
                <Code language="tsx">
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
}`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="mainmenusection"
                title="MainMenuSection Type"
              />
              <Card>
                <Code language="tsx">
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
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="mainmenulink"
                title="MainMenuLink Type"
              />
              <Card>
                <Code language="tsx">
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
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" id="example" title="고급 사용 예제" />
              <Body>다중 섹션을 활용한 복잡한 드롭다운 메뉴 예제:</Body>
              <Card>
                <Code language="tsx">
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
              </Card>
            </Subsection>
          </Subsection>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'List', href: '/components/list' }}
        next={{ title: 'Masthead', href: '/components/masthead' }}
      />
    </Section>
  );
}
