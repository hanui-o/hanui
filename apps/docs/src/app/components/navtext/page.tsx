'use client';

// Docs layout components
import {
  PageSection as Section,
  SectionHeading,
  Subsection,
  PageNavigation,
} from '@/components/content';

// Docs helper components
import { DoCard, DontCard } from '@/components/helpers';

// UI components - from @hanui/react
import {
  NavText as NavTextComponent,
  Body,
  Stack,
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

export default function NavTextPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="NavText"
        description="네비게이션 메뉴를 위한 텍스트 컴포넌트입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Installation */}
          <Section>
            <SectionHeading level="h2" id="installation" title="설치">
              <Body className="leading-relaxed">
                다음 명령어로 NavText 컴포넌트를 설치합니다:
              </Body>
            </SectionHeading>
            <Code variant="block" language="bash" showLineNumbers={false}>
              npx @hanui/cli add navtext
            </Code>
          </Section>

          {/* What is it */}
          <Section>
            <SectionHeading
              level="h2"
              id="what-is-it"
              title="무엇인가요?"
              description="NavText는 KRDS 타이포그래피 시스템의 네비게이션 전용 스타일입니다. 메뉴 제목과 하위 메뉴 항목을 구분하여 계층적인 네비게이션 구조를 명확히 표현합니다."
            />
            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>Title 변형:</strong> tit-lg, tit-sm으로 메뉴 제목을
                  표현합니다.
                </ListItem>
                <ListItem>
                  <strong>Depth 변형:</strong> depth-md, depth-sm으로 하위 메뉴
                  항목을 표현합니다.
                </ListItem>
                <ListItem>
                  <strong>Polymorphic:</strong> as prop으로 다양한 HTML 태그로
                  렌더링할 수 있습니다.
                </ListItem>
                <ListItem>
                  <strong>반응형:</strong> Title 변형은 PC와 모바일에서 최적의
                  크기로 조정됩니다.
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* Preview */}
          <Section>
            <SectionHeading level="h2" id="preview" title="미리보기" />
            <Card className="bg-krds-gray-5">
              <Stack gap="md">
                <NavTextComponent variant="tit-lg">
                  Title Large
                </NavTextComponent>
                <NavTextComponent variant="tit-sm">
                  Title Small
                </NavTextComponent>
                <NavTextComponent variant="depth-md">
                  Depth Medium
                </NavTextComponent>
                <NavTextComponent variant="depth-sm">
                  Depth Small
                </NavTextComponent>
              </Stack>
            </Card>
            <Code variant="block" language="tsx">
              {`<NavText variant="tit-lg">Title Large</NavText>
<NavText variant="tit-sm">Title Small</NavText>
<NavText variant="depth-md">Depth Medium</NavText>
<NavText variant="depth-sm">Depth Small</NavText>`}
            </Code>
          </Section>

          {/* Usage */}
          <Section>
            <SectionHeading level="h2" id="usage" title="사용 방법" />

            {/* Title Variants */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="title-variants"
                title="Title (메뉴 제목)"
                description="메뉴 제목이나 그룹명에 사용하는 Bold 스타일입니다."
              />
              <Card className="bg-krds-gray-5">
                <Stack gap="lg">
                  <Stack gap="sm">
                    <NavTextComponent
                      as="a"
                      href="#"
                      variant="tit-lg"
                      className="hover:text-krds-primary-base transition-colors"
                    >
                      Title Large
                    </NavTextComponent>
                    <Body size="sm" className="text-krds-gray-70">
                      24px (PC) / 22px (Mobile) · 700 (Bold) · 150% 줄 간격
                    </Body>
                  </Stack>

                  <Stack gap="sm">
                    <NavTextComponent
                      as="a"
                      href="#"
                      variant="tit-sm"
                      className="hover:text-krds-primary-base transition-colors"
                    >
                      Title Small
                    </NavTextComponent>
                    <Body size="sm" className="text-krds-gray-70">
                      19px (PC) / 17px (Mobile) · 700 (Bold) · 150% 줄 간격
                    </Body>
                  </Stack>
                </Stack>
              </Card>
              <Code variant="block" language="tsx">
                {`<NavText as="a" href="/menu" variant="tit-lg">
  메인 메뉴
</NavText>

<NavText as="a" href="/submenu" variant="tit-sm">
  서브 메뉴
</NavText>`}
              </Code>
            </Subsection>

            {/* Depth Variants */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="depth-variants"
                title="Depth (메뉴 항목)"
                description="실제 링크 항목에 사용하는 Regular 스타일입니다."
              />
              <Card className="bg-krds-gray-5">
                <Stack gap="lg">
                  <Stack gap="sm">
                    <NavTextComponent
                      as="a"
                      href="#"
                      variant="depth-md"
                      className="hover:text-krds-primary-base transition-colors"
                    >
                      Depth Medium
                    </NavTextComponent>
                    <Body size="sm" className="text-krds-gray-70">
                      17px · 400 (Regular) · 150% 줄 간격
                    </Body>
                  </Stack>

                  <Stack gap="sm">
                    <NavTextComponent
                      as="a"
                      href="#"
                      variant="depth-sm"
                      className="hover:text-krds-primary-base transition-colors"
                    >
                      Depth Small
                    </NavTextComponent>
                    <Body size="sm" className="text-krds-gray-70">
                      15px · 400 (Regular) · 150% 줄 간격
                    </Body>
                  </Stack>
                </Stack>
              </Card>
              <Code variant="block" language="tsx">
                {`<NavText as="a" href="/item" variant="depth-md">
  메뉴 항목
</NavText>

<NavText as="a" href="/subitem" variant="depth-sm">
  하위 항목
</NavText>`}
              </Code>
            </Subsection>

            {/* Main Navigation */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="main-navigation"
                title="메인 네비게이션"
                description="Title 변형으로 메인 네비게이션을 구성합니다."
              />
              <Card className="bg-krds-gray-5">
                <nav>
                  <Stack as="ul" gap="md">
                    <li>
                      <NavTextComponent
                        as="a"
                        href="#"
                        variant="tit-lg"
                        className="hover:text-krds-primary-base transition-colors"
                      >
                        서비스 소개
                      </NavTextComponent>
                    </li>
                    <li>
                      <NavTextComponent
                        as="a"
                        href="#"
                        variant="tit-lg"
                        className="hover:text-krds-primary-base transition-colors"
                      >
                        이용 안내
                      </NavTextComponent>
                    </li>
                    <li>
                      <NavTextComponent
                        as="a"
                        href="#"
                        variant="tit-lg"
                        className="hover:text-krds-primary-base transition-colors"
                      >
                        고객 지원
                      </NavTextComponent>
                    </li>
                  </Stack>
                </nav>
              </Card>
              <Code variant="block" language="tsx">
                {`<nav>
  <ul>
    <li>
      <NavText as="a" href="/about" variant="tit-lg">
        서비스 소개
      </NavText>
    </li>
    <li>
      <NavText as="a" href="/guide" variant="tit-lg">
        이용 안내
      </NavText>
    </li>
    <li>
      <NavText as="a" href="/support" variant="tit-lg">
        고객 지원
      </NavText>
    </li>
  </ul>
</nav>`}
              </Code>
            </Subsection>

            {/* Hierarchical Navigation */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="hierarchical"
                title="계층형 네비게이션"
                description="Title과 Depth 변형을 조합하여 계층 구조를 표현합니다."
              />
              <Card className="bg-krds-gray-5">
                <nav>
                  <Stack gap="md">
                    <NavTextComponent
                      as="a"
                      href="#"
                      variant="tit-sm"
                      className="hover:text-krds-primary-base transition-colors"
                    >
                      공지사항
                    </NavTextComponent>
                    <Stack as="ul" gap="sm" className="ml-4">
                      <li>
                        <NavTextComponent
                          as="a"
                          href="#"
                          variant="depth-md"
                          className="hover:text-krds-primary-base transition-colors"
                        >
                          시스템 공지
                        </NavTextComponent>
                      </li>
                      <li>
                        <NavTextComponent
                          as="a"
                          href="#"
                          variant="depth-md"
                          className="hover:text-krds-primary-base transition-colors"
                        >
                          이벤트 소식
                        </NavTextComponent>
                      </li>
                      <li>
                        <NavTextComponent
                          as="a"
                          href="#"
                          variant="depth-md"
                          className="hover:text-krds-primary-base transition-colors"
                        >
                          업데이트 내역
                        </NavTextComponent>
                      </li>
                    </Stack>
                  </Stack>
                </nav>
              </Card>
              <Code variant="block" language="tsx">
                {`<nav>
  <NavText as="a" href="/notice" variant="tit-sm">
    공지사항
  </NavText>
  <ul>
    <li>
      <NavText as="a" href="/notice/system" variant="depth-md">
        시스템 공지
      </NavText>
    </li>
    <li>
      <NavText as="a" href="/notice/event" variant="depth-md">
        이벤트 소식
      </NavText>
    </li>
    <li>
      <NavText as="a" href="/notice/update" variant="depth-md">
        업데이트 내역
      </NavText>
    </li>
  </ul>
</nav>`}
              </Code>
            </Subsection>

            {/* Active State */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="active-state"
                title="활성 상태 스타일링"
                description="현재 페이지는 색상으로 명확히 표시합니다."
              />
              <Card className="bg-krds-gray-5">
                <nav>
                  <Stack as="ul" gap="sm">
                    <li>
                      <NavTextComponent
                        as="a"
                        href="#"
                        variant="depth-md"
                        className="text-krds-primary-base"
                        aria-current="page"
                      >
                        현재 페이지
                      </NavTextComponent>
                    </li>
                    <li>
                      <NavTextComponent
                        as="a"
                        href="#"
                        variant="depth-md"
                        className="hover:text-krds-primary-base transition-colors"
                      >
                        다른 페이지
                      </NavTextComponent>
                    </li>
                  </Stack>
                </nav>
              </Card>
              <Code variant="block" language="tsx">
                {`{/* 현재 페이지 */}
<NavText
  as="a"
  href="/current"
  variant="depth-md"
  className="text-krds-primary-base"
  aria-current="page"
>
  현재 페이지
</NavText>

{/* 다른 페이지 */}
<NavText
  as="a"
  href="/other"
  variant="depth-md"
  className="hover:text-krds-primary-base"
>
  다른 페이지
</NavText>`}
              </Code>
            </Subsection>
          </Section>

          {/* Best Practices */}
          <Section>
            <SectionHeading level="h2" id="best-practices" title="모범 사례" />
            <Stack gap="md">
              <DoCard title="NavText를 사용하기 적합한 경우">
                <List variant="check">
                  <ListItem>헤더 네비게이션 메뉴</ListItem>
                  <ListItem>사이드바 메뉴</ListItem>
                  <ListItem>드롭다운 메뉴</ListItem>
                  <ListItem>탭 메뉴</ListItem>
                  <ListItem>브레드크럼(breadcrumb) 네비게이션</ListItem>
                </List>
              </DoCard>

              <Card variant="warning">
                <SectionHeading level="h3" id="caution" title="주의사항" />
                <List variant="check" className="text-krds-gray-90">
                  <ListItem>tit 변형은 메뉴 제목/그룹명에 사용</ListItem>
                  <ListItem>depth 변형은 실제 링크 항목에 사용</ListItem>
                  <ListItem>계층 구조가 명확히 드러나도록 구성</ListItem>
                  <ListItem>활성 상태는 색상이나 굵기로 명확히 표시</ListItem>
                </List>
              </Card>

              <DontCard title="NavText를 사용하지 말아야 하는 경우">
                <List variant="cross">
                  <ListItem>일반 본문 텍스트 (Body 사용 권장)</ListItem>
                  <ListItem>페이지 제목 (Heading 사용 권장)</ListItem>
                  <ListItem>버튼 텍스트 (Button 컴포넌트 사용)</ListItem>
                  <ListItem>폼 라벨 (Label 사용 권장)</ListItem>
                </List>
              </DontCard>
            </Stack>
          </Section>

          {/* Accessibility */}
          <Section>
            <SectionHeading
              level="h2"
              id="accessibility"
              title="접근성"
              description="NavText는 WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다."
            />
            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>시맨틱 HTML:</strong> nav 태그와 함께 사용하여 구조를
                  명확히 합니다.
                </ListItem>
                <ListItem>
                  <strong>적절한 태그:</strong> 링크는 a 태그로, 동작 트리거는
                  button 태그로 렌더링합니다.
                </ListItem>
                <ListItem>
                  <strong>현재 페이지 표시:</strong>{' '}
                  aria-current=&quot;page&quot; 속성으로 현재 페이지를
                  표시합니다.
                </ListItem>
                <ListItem>
                  <strong>키보드 네비게이션:</strong> Tab, Enter 키로 탐색할 수
                  있습니다.
                </ListItem>
                <ListItem>
                  <strong>명확한 계층:</strong> 계층 구조로 스크린 리더 탐색을
                  지원합니다.
                </ListItem>
              </List>
            </Card>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section>
            <SectionHeading
              level="h2"
              id="api-reference"
              title="API 레퍼런스"
            />

            {/* Props */}
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
                      <Code>variant</Code>
                    </TableCell>
                    <TableCell>
                      <Code>
                        &quot;tit-lg&quot; | &quot;tit-sm&quot; |
                        &quot;depth-md&quot; | &quot;depth-sm&quot;
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code>&quot;depth-md&quot;</Code>
                    </TableCell>
                    <TableCell>네비게이션 텍스트 스타일</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>weight</Code>
                    </TableCell>
                    <TableCell>
                      <Code>&quot;regular&quot; | &quot;bold&quot;</Code>
                    </TableCell>
                    <TableCell>
                      <Code>&quot;regular&quot;</Code>
                    </TableCell>
                    <TableCell>
                      글자 굵기 (tit-* 변형에는 자동으로 bold 적용)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>as</Code>
                    </TableCell>
                    <TableCell>
                      <Code>
                        &quot;span&quot; | &quot;a&quot; | &quot;button&quot; |
                        &quot;div&quot;
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code>&quot;span&quot;</Code>
                    </TableCell>
                    <TableCell>렌더링할 HTML 태그</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>href</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>링크 URL (as=&quot;a&quot;일 때)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>target</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>링크 타겟 (as=&quot;a&quot;일 때)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>rel</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>링크 관계 (as=&quot;a&quot;일 때)</TableCell>
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
                  <TableRow>
                    <TableCell>
                      <Code>children</Code>
                    </TableCell>
                    <TableCell>
                      <Code>ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>텍스트 내용</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            {/* Variant Styles */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="variant-styles"
                title="Variant Styles"
              />
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Variant</TableHead>
                    <TableHead>PC</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Font Weight</TableHead>
                    <TableHead>Color</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>tit-lg</Code>
                    </TableCell>
                    <TableCell>24px</TableCell>
                    <TableCell>22px</TableCell>
                    <TableCell>700 (Bold)</TableCell>
                    <TableCell>gray-95</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>tit-sm</Code>
                    </TableCell>
                    <TableCell>19px</TableCell>
                    <TableCell>17px</TableCell>
                    <TableCell>700 (Bold)</TableCell>
                    <TableCell>gray-95</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>depth-md</Code>
                    </TableCell>
                    <TableCell>17px</TableCell>
                    <TableCell>17px</TableCell>
                    <TableCell>400 (Regular)</TableCell>
                    <TableCell>gray-90</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>depth-sm</Code>
                    </TableCell>
                    <TableCell>15px</TableCell>
                    <TableCell>15px</TableCell>
                    <TableCell>400 (Regular)</TableCell>
                    <TableCell>gray-90</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            {/* KRDS Compliance */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="krds-compliance"
                title="KRDS 준수사항"
              />
              <Card variant="info">
                <List variant="check" className="text-krds-gray-90">
                  <ListItem>tit 변형은 Bold (700) 폰트 굵기</ListItem>
                  <ListItem>depth 변형은 Regular (400) 폰트 굵기</ListItem>
                  <ListItem>150% 줄 간격으로 가독성 확보</ListItem>
                  <ListItem>
                    반응형 크기 (tit 변형은 PC/모바일 최적화, depth 변형은 고정
                    크기)
                  </ListItem>
                  <ListItem>Pretendard GOV 폰트 적용</ListItem>
                  <ListItem>
                    명도 대비 4.5:1 이상 (WCAG 2.1 / KWCAG 2.2 Level AA)
                  </ListItem>
                </List>
              </Card>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Modal', href: '/components/modal' }}
        next={{ title: 'Pagination', href: '/components/pagination' }}
      />
    </>
  );
}
