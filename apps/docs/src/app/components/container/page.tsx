'use client';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';
import { ComponentPreview } from '@/components/content/ComponentPreview';

// UI components - from @hanui/react
import {
  Container as ContainerComponent,
  Body,
  Stack,
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
  List,
  ListItem,
} from '@hanui/react';

export default function ContainerPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Container"
        description="KRDS 레이아웃 시스템을 기반으로 한 반응형 컨테이너 컴포넌트"
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />
            <ComponentPreview>
              <div className="border-2 border-dashed border-krds-gray-20">
                <ContainerComponent className="bg-krds-primary-10 py-8">
                  <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">Container</h2>
                    <Body className="text-krds-gray-70">
                      콘텐츠가 중앙에 정렬되고 최대 너비가 제한됩니다
                    </Body>
                  </div>
                </ContainerComponent>
              </div>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<Container>
  <h1>페이지 제목</h1>
  <p>콘텐츠</p>
</Container>`}
            </Code>
          </Section>

          <Section level="h2">
            <Installation componentName="container" />
          </Section>

          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { Container } from '@/components/hanui/container'

<Container>
  <h1>페이지 제목</h1>
  <p>콘텐츠</p>
</Container>`}
            </Code>
          </Section>

          {/* 예제 섹션 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading level="h3" title="최대 너비 설정" />
              <Stack gap="md">
                {/* Default (xl) */}
                <div>
                  <Body className="font-medium mb-2">
                    Default (xl - 1280px) - 일반적인 페이지
                  </Body>
                  <ComponentPreview>
                    <div className="border-2 border-dashed border-krds-gray-20 w-full">
                      <ContainerComponent className="bg-krds-success-10 py-8">
                        <Body className="text-center text-krds-gray-90">
                          Default Container (max-width: 1280px)
                        </Body>
                      </ContainerComponent>
                    </div>
                  </ComponentPreview>
                </div>

                {/* Small */}
                <div>
                  <Body className="font-medium mb-2">
                    Small (sm - 640px) - 로그인 폼, 회원가입
                  </Body>
                  <ComponentPreview>
                    <div className="border-2 border-dashed border-krds-gray-20 w-full">
                      <ContainerComponent
                        maxWidth="sm"
                        className="bg-krds-accent-10 py-8"
                      >
                        <Body className="text-center text-krds-gray-90">
                          Small Container (max-width: 640px)
                        </Body>
                      </ContainerComponent>
                    </div>
                  </ComponentPreview>
                </div>

                {/* Full Width */}
                <div>
                  <Body className="font-medium mb-2">
                    Full Width - 전체 너비 + 여백 유지
                  </Body>
                  <ComponentPreview>
                    <div className="border-2 border-dashed border-krds-gray-20 w-full">
                      <ContainerComponent
                        maxWidth="full"
                        className="bg-krds-information-10 py-8"
                      >
                        <Body className="text-center text-krds-gray-90">
                          Full Width Container (max-width: 100%)
                        </Body>
                      </ContainerComponent>
                    </div>
                  </ComponentPreview>
                </div>
              </Stack>
              <Code variant="block" language="tsx">
                {`// Default (xl - 1280px)
<Container>
  <h1>페이지 제목</h1>
  <p>일반적인 콘텐츠</p>
</Container>

// Small (sm - 640px)
<Container maxWidth="sm">
  <form>
    <h2>로그인</h2>
    {/* 폼 필드 */}
  </form>
</Container>

// Full Width
<Container maxWidth="full">
  <HeroSection />
</Container>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="스크린 마진 (Screen Margin)" />
              <Body className="mb-4">
                Container는 화면 크기에 따라 자동으로 좌우 패딩을 적용하여
                콘텐츠가 화면 가장자리에 닿지 않도록 합니다. 이는 KRDS 디자인
                시스템의 스크린 마진 표준을 따릅니다:
              </Body>
              <List spacing="tight" className="mb-6">
                <ListItem>
                  <Body size="sm" weight="bold" as="span">
                    모바일 (~640px)
                  </Body>
                  <Body size="sm" as="span">
                    : 16px (px-4)
                  </Body>
                </ListItem>
                <ListItem>
                  <Body size="sm" weight="bold" as="span">
                    태블릿 (640px~)
                  </Body>
                  <Body size="sm" as="span">
                    : 24px (px-6)
                  </Body>
                </ListItem>
                <ListItem>
                  <Body size="sm" weight="bold" as="span">
                    데스크톱 (1024px~)
                  </Body>
                  <Body size="sm" as="span">
                    : 32px (px-8)
                  </Body>
                </ListItem>
              </List>

              <div className="my-6">
                <img
                  src="https://www.krds.go.kr/resources/img/guide/contents/style/layout_grid_04.png"
                  alt="Container 스크린 마진 예시 - 화면 크기별 패딩 적용"
                  className="w-full rounded-lg border border-krds-gray-20"
                />
              </div>

              <Body className="mt-4">
                이 패딩은 반응형 디자인을 위해 자동으로 적용되며, 화면 크기가
                변경되면 자연스럽게 조정됩니다.
              </Body>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="패딩 제거" />
              <Body className="mb-4">
                전체 너비 이미지나 배경이 필요한 경우{' '}
                <Code>disablePadding</Code> 속성을 사용하여 좌우 패딩을 제거할
                수 있습니다.
              </Body>
              <ComponentPreview>
                <div className="border-2 border-dashed border-krds-gray-20">
                  <ContainerComponent
                    disablePadding
                    className="bg-krds-secondary-10 py-8"
                  >
                    <Body className="text-center text-krds-gray-90">
                      No Padding Container (패딩 없음)
                    </Body>
                  </ContainerComponent>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Container disablePadding>
  <img src="/hero.jpg" alt="히어로 이미지" className="w-full" />
</Container>`}
              </Code>
            </Subsection>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API Reference" />

            <Subsection level="h3">
              <Heading level="h3" title="Container Props" />

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
                    <TableCell className="font-mono">maxWidth</TableCell>
                    <TableCell className="text-krds-gray-70">
                      &apos;sm&apos; | &apos;md&apos; | &apos;lg&apos; |
                      &apos;xl&apos; | &apos;2xl&apos; | &apos;full&apos; |
                      false
                    </TableCell>
                    <TableCell className="font-mono">&apos;lg&apos;</TableCell>
                    <TableCell>최대 너비 설정</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">disablePadding</TableCell>
                    <TableCell className="text-krds-gray-70">boolean</TableCell>
                    <TableCell className="font-mono">false</TableCell>
                    <TableCell>좌우 패딩 제거 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">as</TableCell>
                    <TableCell className="text-krds-gray-70">
                      &apos;div&apos; | &apos;section&apos; |
                      &apos;article&apos; | &apos;main&apos; | ...
                    </TableCell>
                    <TableCell className="font-mono">&apos;div&apos;</TableCell>
                    <TableCell>렌더링할 HTML 요소</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">className</TableCell>
                    <TableCell className="text-krds-gray-70">string</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Max Width 값" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>값</TableHead>
                    <TableHead>최대 너비</TableHead>
                    <TableHead>용도</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">sm</TableCell>
                    <TableCell>640px</TableCell>
                    <TableCell>로그인 폼, 간단한 콘텐츠</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">md</TableCell>
                    <TableCell>768px</TableCell>
                    <TableCell>블로그 포스트, 기사</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">lg</TableCell>
                    <TableCell>1024px</TableCell>
                    <TableCell>일반 페이지 (기본값, 권장)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">xl</TableCell>
                    <TableCell>1280px</TableCell>
                    <TableCell>대시보드, 데이터 테이블</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">2xl</TableCell>
                    <TableCell>1440px</TableCell>
                    <TableCell>매우 넓은 레이아웃</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">full</TableCell>
                    <TableCell>100%</TableCell>
                    <TableCell>전체 너비 + 여백 유지</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="KRDS 스크린 마진 (Screen Margin)" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>브레이크포인트</TableHead>
                    <TableHead>화면 크기</TableHead>
                    <TableHead>좌우 패딩</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Mobile (기본)</TableCell>
                    <TableCell>~640px</TableCell>
                    <TableCell className="font-mono">16px (px-4)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tablet (sm)</TableCell>
                    <TableCell>640px~</TableCell>
                    <TableCell className="font-mono">24px (px-6)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Desktop (lg)</TableCell>
                    <TableCell>1024px~</TableCell>
                    <TableCell className="font-mono">32px (px-8)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Code', href: '/components/code' }}
        next={{ title: 'Critical Alerts', href: '/components/critical-alerts' }}
      />
    </>
  );
}
