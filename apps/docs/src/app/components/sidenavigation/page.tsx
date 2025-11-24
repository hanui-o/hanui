'use client';

import { SideNavigation } from '@hanui/react';
// Docs layout components
import {
  PageSection as Section,
  Subsection,
  SectionHeading,
  PageNavigation,
} from '@/components/content';

// Docs helper components
import { DoCard } from '@/components/helpers';

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
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@hanui/react';

export default function SideNavigationPage() {
  return (
    <Section>
      <SectionHeading
        level="h1"
        id="sidenavigation"
        title="SideNavigation"
        description="최대 4단계 깊이의 계층 구조를 지원하는 사이드 네비게이션 컴포넌트입니다. 확장 가능한 메뉴와 활성 상태 표시를 제공합니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Installation */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="installation" title="설치" />
            <Body>
              CLI를 사용하여 컴포넌트를 프로젝트에 설치할 수 있습니다.
            </Body>
            <Card>
              <Code language="bash">npx @hanui/cli add sidenavigation</Code>
            </Card>
          </Subsection>

          {/* What is it */}
          <Subsection level="h2">
            <SectionHeading
              level="h2"
              id="what-is-it"
              title="SideNavigation이란?"
            />
            <Body>
              SideNavigation은 웹사이트나 애플리케이션의 측면에 배치되어
              콘텐츠의 계층 구조를 보여주는 네비게이션 컴포넌트입니다.
            </Body>
            <Body>
              정부 기관 웹사이트에서 많이 사용하는 LNB(Left Navigation Bar)
              패턴으로, 복잡한 정보 구조를 효과적으로 탐색할 수 있도록 돕습니다.
            </Body>
          </Subsection>

          {/* Preview */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="preview" title="미리보기" />

            <Subsection level="h3">
              <SectionHeading level="h3" id="basic" title="기본 사용" />
              <Body>
                2단계 구조의 기본적인 사이드 네비게이션입니다. 활성 페이지가
                포함된 섹션은 자동으로 확장됩니다.
              </Body>
              <Card>
                <div className="max-w-xs">
                  <SideNavigation
                    title="주요 서비스"
                    sections={[
                      {
                        label: '건강보험',
                        children: [
                          {
                            label: '보험료 조회',
                            href: '#fee',
                            active: true,
                          },
                          { label: '자격 득실 확인', href: '#status' },
                        ],
                      },
                      {
                        label: '국민연금',
                        children: [
                          { label: '연금 조회', href: '#check' },
                          { label: '납부 내역', href: '#payment' },
                        ],
                      },
                    ]}
                  />
                </div>
              </Card>
              <Card>
                <Code language="tsx">
                  {`<SideNavigation
  title="주요 서비스"
  sections={[
    {
      label: '건강보험',
      children: [
        { label: '보험료 조회', href: '/insurance/fee', active: true },
        { label: '자격 득실 확인', href: '/insurance/status' }
      ]
    },
    {
      label: '국민연금',
      children: [
        { label: '연금 조회', href: '/pension/check' },
        { label: '납부 내역', href: '/pension/payment' }
      ]
    }
  ]}
/>`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="3-depth"
                title="3단계 네비게이션"
              />
              <Body>
                하위 링크에 children을 추가하여 3단계 구조를 만들 수 있습니다.
              </Body>
              <Card>
                <div className="max-w-xs">
                  <SideNavigation
                    title="행정 서비스"
                    sections={[
                      {
                        label: '민원 서비스',
                        children: [
                          {
                            label: '증명서 발급',
                            href: '#certificate',
                            children: [
                              {
                                label: '주민등록등본',
                                href: '#resident',
                                active: true,
                              },
                              {
                                label: '가족관계증명서',
                                href: '#family',
                              },
                              { label: '병적증명서', href: '#military' },
                            ],
                          },
                          {
                            label: '신청/접수',
                            href: '#application',
                          },
                        ],
                      },
                    ]}
                  />
                </div>
              </Card>
              <Card>
                <Code language="tsx">
                  {`<SideNavigation
  title="행정 서비스"
  sections={[
    {
      label: '민원 서비스',
      children: [
        {
          label: '증명서 발급',
          href: '/civil/certificate',
          children: [
            { label: '주민등록등본', href: '/civil/certificate/resident' },
            { label: '가족관계증명서', href: '/civil/certificate/family' },
            { label: '병적증명서', href: '/civil/certificate/military' }
          ]
        },
        {
          label: '신청/접수',
          href: '/civil/application'
        }
      ]
    }
  ]}
/>`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="simple-links"
                title="단순 링크 섹션"
              />
              <Body>children이 없는 섹션은 단순 링크로 표시됩니다.</Body>
              <Card>
                <div className="max-w-xs">
                  <SideNavigation
                    title="퀵 링크"
                    sections={[
                      { label: '홈으로', href: '#home', active: true },
                      { label: '공지사항', href: '#notice' },
                      { label: '문의하기', href: '#contact' },
                    ]}
                  />
                </div>
              </Card>
              <Card>
                <Code language="tsx">
                  {`<SideNavigation
  title="퀵 링크"
  sections={[
    { label: '홈으로', href: '/', active: true },
    { label: '공지사항', href: '/notice' },
    { label: '문의하기', href: '/contact' }
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
              SideNavigation은 일반적으로 페이지 레이아웃의 왼쪽 영역에
              배치합니다.
            </Body>
            <Card>
              <Code language="tsx">
                {`import { SideNavigation } from '@hanui/react';

export default function MyPage() {
  return (
    <div className="flex">
      {/* 왼쪽: 사이드 네비게이션 */}
      <aside className="w-64 flex-shrink-0">
        <SideNavigation
          title="주요 서비스"
          sections={[
            {
              label: '건강보험',
              children: [
                { label: '보험료 조회', href: '/insurance/fee', active: true },
                { label: '자격 득실 확인', href: '/insurance/status' }
              ]
            }
          ]}
        />
      </aside>

      {/* 오른쪽: 메인 콘텐츠 */}
      <main className="flex-1">
        {/* 콘텐츠 */}
      </main>
    </div>
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
                    복잡한 콘텐츠 계층 구조를 가진 웹사이트 (정부 기관, 문서
                    사이트 등)
                  </ListItem>
                  <ListItem>
                    사용자가 현재 위치를 파악하고 관련 페이지로 쉽게 이동해야
                    하는 경우
                  </ListItem>
                  <ListItem>
                    3-4단계의 깊은 콘텐츠 구조를 효과적으로 보여줘야 하는 경우
                  </ListItem>
                  <ListItem>
                    페이지 새로고침 없이 클라이언트 사이드 네비게이션이 필요한
                    경우
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
                  <strong>활성 상태 자동 관리:</strong> active 속성을 설정하면
                  해당 항목이 포함된 섹션이 자동으로 확장됩니다
                </ListItem>
                <ListItem>
                  <strong>깊이 제한:</strong> 최대 4단계까지 지원하지만,
                  실제로는 3단계 이내로 유지하는 것이 좋습니다
                </ListItem>
                <ListItem>
                  <strong>명확한 라벨:</strong> 각 링크의 라벨은 사용자가
                  이해하기 쉬운 명확한 텍스트를 사용하세요
                </ListItem>
                <ListItem>
                  <strong>유효한 href:</strong> 모든 링크에는 유효한 href 속성을
                  제공해야 합니다
                </ListItem>
                <ListItem>
                  <strong>반응형 고려:</strong> 모바일 화면에서는 토글 버튼이나
                  드로어로 대체하는 것을 고려하세요
                </ListItem>
              </List>
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
                <strong>ARIA Roles:</strong> role="menubar", role="menu",
                role="menuitem" 속성을 사용하여 네비게이션 구조를 명확히 합니다
              </ListItem>
              <ListItem>
                <strong>ARIA States:</strong> aria-expanded, aria-controls,
                aria-haspopup 속성으로 확장 가능한 섹션의 상태를 전달합니다
              </ListItem>
              <ListItem>
                <strong>현재 페이지 표시:</strong> aria-current="page" 속성으로
                스크린 리더 사용자에게 현재 위치를 알립니다
              </ListItem>
              <ListItem>
                <strong>키보드 내비게이션:</strong> Enter와 Space 키로 섹션을
                토글할 수 있습니다
              </ListItem>
              <ListItem>
                <strong>포커스 관리:</strong> 명확한 포커스 아웃라인을 제공하여
                키보드 사용자가 현재 위치를 파악할 수 있습니다
              </ListItem>
              <ListItem>
                <strong>고대비 모드:</strong> prefers-contrast: high 미디어
                쿼리를 지원합니다
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
            <Body>
              SideNavigation 컴포넌트는 다음 기능들을 자동으로 처리합니다:
            </Body>

            <Card variant="info">
              <List variant="check">
                <ListItem>
                  <strong>자동 확장:</strong> 활성 페이지가 포함된 섹션은
                  자동으로 확장되어 사용자가 현재 위치를 쉽게 파악할 수 있습니다
                </ListItem>
                <ListItem>
                  <strong>부드러운 애니메이션:</strong> Grid 애니메이션을
                  활용하여 섹션 확장/축소 시 부드러운 전환 효과를 제공합니다
                </ListItem>
                <ListItem>
                  <strong>상태 관리:</strong> useState를 사용하여 확장된 섹션의
                  상태를 자동으로 관리합니다
                </ListItem>
                <ListItem>
                  <strong>다크 모드:</strong> prefers-color-scheme: dark 미디어
                  쿼리를 통해 다크 모드를 자동으로 지원합니다
                </ListItem>
                <ListItem>
                  <strong>KRDS 디자인 토큰:</strong> KRDS 디자인 시스템의
                  spacing, color 토큰을 사용하여 일관된 디자인을 유지합니다
                </ListItem>
              </List>
            </Card>
          </Subsection>

          {/* Technical Background */}
          <Subsection level="h2">
            <SectionHeading
              level="h2"
              id="technical-background"
              title="기술적 배경"
            />

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="css-module"
                title="CSS Module 방식 선택"
              />
              <Body>
                이 컴포넌트는 CSS Module (SCSS) 방식을 사용합니다. 그 이유는:
              </Body>
              <List variant="disc">
                <ListItem>
                  <strong>복잡한 계층 구조:</strong> 4단계 깊이의 중첩된 메뉴
                  구조를 효과적으로 스타일링하기 위해
                </ListItem>
                <ListItem>
                  <strong>Grid 애니메이션:</strong> grid-template-rows를 활용한
                  부드러운 확장/축소 애니메이션 구현
                </ListItem>
                <ListItem>
                  <strong>토글 아이콘:</strong> ::after 가상 요소를 사용한 회전
                  애니메이션
                </ListItem>
                <ListItem>
                  <strong>KRDS 원본 유지:</strong> 공식 SCSS 스타일과 동일한
                  클래스명 (.lnb-*) 사용
                </ListItem>
                <ListItem>
                  <strong>Self-contained:</strong> 외부 mixin 의존성 없이
                  독립적으로 동작
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="file-structure"
                title="파일 구조"
              />
              <Card>
                <Code language="plaintext">
                  {`components/hanui/
├── side-navigation.tsx           # React 컴포넌트 (Props API)
└── side-navigation.module.scss   # SCSS 스타일 (self-contained)`}
                </Code>
              </Card>
            </Subsection>
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
                      <Code>title</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>네비게이션 제목 (1단계, 필수)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>sections</Code>
                    </TableCell>
                    <TableCell>
                      <Code>SideNavSection[]</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>네비게이션 섹션 배열 (2단계, 필수)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>className</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>
                      <Code>&apos;&apos;</Code>
                    </TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="sidenavSection"
                title="SideNavSection Type"
              />
              <Card>
                <Code language="tsx">
                  {`export interface SideNavSection {
  /**
   * 섹션 라벨
   */
  label: string;

  /**
   * 섹션 URL (children이 없는 경우 필수)
   */
  href?: string;

  /**
   * 활성 상태
   */
  active?: boolean;

  /**
   * 하위 링크 배열 (3단계)
   */
  children?: SideNavLink[];
}`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="sidenavlink"
                title="SideNavLink Type"
              />
              <Card>
                <Code language="tsx">
                  {`export interface SideNavLink {
  /**
   * 링크 라벨
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

  /**
   * 하위 링크 (4단계)
   */
  children?: SideNavLink[];
}`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" id="example" title="고급 사용 예제" />
              <Body>최대 4단계 깊이를 활용한 복잡한 네비게이션 예제:</Body>
              <Card>
                <Code language="tsx">
                  {`<SideNavigation
  title="복지 서비스"
  sections={[
    {
      label: '아동/청소년',
      children: [
        {
          label: '보육지원',
          href: '/welfare/child/daycare',
          children: [
            {
              label: '어린이집 지원',
              href: '/welfare/child/daycare/kindergarten',
              active: true
            },
            {
              label: '유치원 지원',
              href: '/welfare/child/daycare/preschool'
            }
          ]
        },
        {
          label: '교육지원',
          href: '/welfare/child/education'
        }
      ]
    },
    {
      label: '노인복지',
      children: [
        {
          label: '연금',
          href: '/welfare/senior/pension'
        },
        {
          label: '의료지원',
          href: '/welfare/senior/medical'
        }
      ]
    }
  ]}
/>`}
                </Code>
              </Card>
            </Subsection>
          </Subsection>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Select', href: '/components/select' }}
        next={{ title: 'SimpleGrid', href: '/components/simple-grid' }}
      />
    </Section>
  );
}
