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
  List,
  ListItem,
  Code,
  Body,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Card,
  Stack,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Link,
} from '@hanui/react';
// Docs helper components (moved above)
import { ComponentPreview } from '@/components/content/ComponentPreview';

export default function BreadcrumbPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Breadcrumb"
        description="사용자의 현재 위치를 표시하고 상위 페이지로 쉽게 이동할 수 있게 하는 탐색 컴포넌트입니다."
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
              description="CLI 명령어로 Breadcrumb 컴포넌트를 프로젝트에 추가합니다."
            />

            <Code variant="block" language="bash" showLineNumbers={false}>
              npx @hanui/cli add breadcrumb
            </Code>
          </Section>

          {/* What is it */}
          <Section>
            <SectionHeading
              level="h2"
              id="what-is-it"
              title="무엇인가요?"
              description="Breadcrumb은 사용자가 웹사이트 내에서 현재 위치를 파악하고, 상위 페이지로 쉽게 이동할 수 있도록 돕는 2차 탐색 컴포넌트입니다."
            />

            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>계층 구조 표시:</strong> 현재 페이지까지의 경로를
                  시각적으로 보여줍니다.
                </ListItem>
                <ListItem>
                  <strong>빠른 이동:</strong> 상위 페이지로 클릭 한 번에 이동할
                  수 있습니다.
                </ListItem>
                <ListItem>
                  <strong>접근성:</strong> 스크린 리더를 위한 aria-label과
                  구조화된 마크업을 제공합니다.
                </ListItem>
                <ListItem>
                  <strong>KRDS 준수:</strong> 한국형 웹 콘텐츠 접근성 지침을
                  따릅니다.
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* Usage */}
          <Section>
            <SectionHeading level="h2" id="usage" title="사용 방법" />

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                title="기본 사용"
                description="Breadcrumb 컴포넌트의 기본 사용법입니다:"
              />

              <ComponentPreview>
                <nav aria-label="breadcrumb">
                  <ol className="flex items-center gap-2 text-sm">
                    <li>
                      <Link
                        href="/"
                        className="text-krds-gray-70 hover:text-krds-primary-base transition-colors"
                      >
                        홈
                      </Link>
                    </li>
                    <li className="text-krds-gray-50">/</li>
                    <li>
                      <Link
                        href="/components"
                        className="text-krds-gray-70 hover:text-krds-primary-base transition-colors"
                      >
                        Components
                      </Link>
                    </li>
                    <li className="text-krds-gray-50">/</li>
                    <li>
                      <Link
                        href="/components/navigation"
                        className="text-krds-gray-70 hover:text-krds-primary-base transition-colors"
                      >
                        Navigation
                      </Link>
                    </li>
                    <li className="text-krds-gray-50">/</li>
                    <li
                      className="text-krds-gray-90 font-medium"
                      aria-current="page"
                    >
                      Breadcrumb
                    </li>
                  </ol>
                </nav>
              </ComponentPreview>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`import { Breadcrumb   PageNavigation,
} from '@/components/hanui';

<Breadcrumb>
  <BreadcrumbItem href="/">홈</BreadcrumbItem>
  <BreadcrumbItem href="/components">Components</BreadcrumbItem>
  <BreadcrumbItem href="/components/navigation">Navigation</BreadcrumbItem>
  <BreadcrumbItem current>Breadcrumb</BreadcrumbItem>
</Breadcrumb>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                title="아이콘과 함께 사용"
                description="홈 아이콘 등을 추가하여 시각적 표현을 강화할 수 있습니다:"
              />

              <ComponentPreview>
                <nav aria-label="breadcrumb">
                  <ol className="flex items-center gap-2 text-sm">
                    <li>
                      <Link
                        href="/"
                        className="text-krds-gray-70 hover:text-krds-primary-base transition-colors flex items-center gap-1"
                      >
                        <span>🏠</span>
                        <span>홈</span>
                      </Link>
                    </li>
                    <li className="text-krds-gray-50">&gt;</li>
                    <li>
                      <Link
                        href="/docs"
                        className="text-krds-gray-70 hover:text-krds-primary-base transition-colors"
                      >
                        문서
                      </Link>
                    </li>
                    <li className="text-krds-gray-50">&gt;</li>
                    <li
                      className="text-krds-gray-90 font-medium"
                      aria-current="page"
                    >
                      시작하기
                    </li>
                  </ol>
                </nav>
              </ComponentPreview>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Breadcrumb>
  <BreadcrumbItem href="/" icon={<HomeIcon />}>
    홈
  </BreadcrumbItem>
  <BreadcrumbItem href="/docs">문서</BreadcrumbItem>
  <BreadcrumbItem current>시작하기</BreadcrumbItem>
</Breadcrumb>`}
              </Code>
            </Subsection>
          </Section>

          {/* Guidelines */}
          <Section>
            <SectionHeading
              level="h2"
              id="guidelines"
              title="사용 가이드라인"
            />

            <Stack gap="md">
              <DoCard>
                <ListItem>
                  3단계 이상의 깊은 페이지 계층 구조를 가진 경우
                </ListItem>
                <ListItem>
                  사용자가 상위 페이지로 자주 이동해야 하는 경우
                </ListItem>
                <ListItem>
                  복잡한 카테고리 구조를 가진 전자상거래 사이트
                </ListItem>
                <ListItem>문서 사이트나 지식 베이스</ListItem>
              </DoCard>

              <DontCard>
                <ListItem>
                  단순한 2단계 구조 (홈 버튼만으로 충분할 수 있습니다)
                </ListItem>
                <ListItem>
                  선형적인 프로세스 (단계 표시기가 더 적합합니다)
                </ListItem>
                <ListItem>
                  모바일 화면에서 공간이 제한적인 경우 (생략 표시 고려)
                </ListItem>
              </DontCard>
            </Stack>
          </Section>

          {/* Best Practices */}
          <Section>
            <SectionHeading
              level="h2"
              id="best-practices"
              title="Best Practices"
            />

            <List spacing="default">
              <ListItem>
                <strong>현재 페이지는 링크로 만들지 마세요</strong> - 마지막
                항목은 텍스트만 표시하고 aria-current="page"를 추가하세요.
              </ListItem>
              <ListItem>
                <strong>간결한 레이블 사용</strong> - 각 항목은 짧고 명확하게
                작성하세요.
              </ListItem>
              <ListItem>
                <strong>일관된 구분자 사용</strong> - 슬래시(/) 또는
                화살표(&gt;)를 일관되게 사용하세요.
              </ListItem>
              <ListItem>
                <strong>모바일 대응</strong> - 긴 경로는 생략(...) 처리를
                고려하세요.
              </ListItem>
              <ListItem>
                <strong>접근성 마크업</strong> - nav와 aria-label="breadcrumb"을
                반드시 포함하세요.
              </ListItem>
            </List>
          </Section>

          {/* Accessibility */}
          <Section>
            <SectionHeading level="h2" id="accessibility" title="접근성" />

            <Card variant="info">
              <Stack gap="sm">
                <Body>
                  <strong>시맨틱 마크업:</strong> <Code>&lt;nav&gt;</Code>와{' '}
                  <Code>&lt;ol&gt;</Code>을 사용하여 구조를 명확하게 합니다.
                </Body>
                <Body>
                  <strong>ARIA 속성:</strong>{' '}
                  <Code>aria-label="breadcrumb"</Code>와{' '}
                  <Code>aria-current="page"</Code>를 사용합니다.
                </Body>
                <Body>
                  <strong>키보드 접근성:</strong> 모든 링크가 Tab 키로 접근
                  가능해야 합니다.
                </Body>
                <Body>
                  <strong>스크린 리더:</strong> 구분자는 aria-hidden 처리하거나
                  시각적으로만 표시합니다.
                </Body>
              </Stack>
            </Card>
          </Section>

          {/* Examples */}
          <Section>
            <SectionHeading level="h2" id="examples" title="다양한 예시" />

            <Subsection level="h3">
              <SectionHeading level="h3" title="전자상거래" />

              <ComponentPreview>
                <nav aria-label="breadcrumb">
                  <ol className="flex items-center gap-2 text-sm">
                    <li>
                      <Link
                        href="/"
                        className="text-krds-gray-70 hover:text-krds-primary-base transition-colors"
                      >
                        홈
                      </Link>
                    </li>
                    <li className="text-krds-gray-50">/</li>
                    <li>
                      <Link
                        href="/category/electronics"
                        className="text-krds-gray-70 hover:text-krds-primary-base transition-colors"
                      >
                        전자제품
                      </Link>
                    </li>
                    <li className="text-krds-gray-50">/</li>
                    <li>
                      <Link
                        href="/category/electronics/computers"
                        className="text-krds-gray-70 hover:text-krds-primary-base transition-colors"
                      >
                        컴퓨터
                      </Link>
                    </li>
                    <li className="text-krds-gray-50">/</li>
                    <li
                      className="text-krds-gray-90 font-medium"
                      aria-current="page"
                    >
                      노트북
                    </li>
                  </ol>
                </nav>
              </ComponentPreview>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="정부 웹사이트" />

              <ComponentPreview>
                <nav aria-label="breadcrumb">
                  <ol className="flex items-center gap-2 text-sm">
                    <li>
                      <Link
                        href="/"
                        className="text-krds-gray-70 hover:text-krds-primary-base transition-colors"
                      >
                        정책정보
                      </Link>
                    </li>
                    <li className="text-krds-gray-50">&gt;</li>
                    <li>
                      <Link
                        href="/policy"
                        className="text-krds-gray-70 hover:text-krds-primary-base transition-colors"
                      >
                        정책자료
                      </Link>
                    </li>
                    <li className="text-krds-gray-50">&gt;</li>
                    <li>
                      <Link
                        href="/policy/press"
                        className="text-krds-gray-70 hover:text-krds-primary-base transition-colors"
                      >
                        보도자료
                      </Link>
                    </li>
                    <li className="text-krds-gray-50">&gt;</li>
                    <li
                      className="text-krds-gray-90 font-medium"
                      aria-current="page"
                    >
                      2025년 디지털 정책 발표
                    </li>
                  </ol>
                </nav>
              </ComponentPreview>
            </Subsection>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section>
            <SectionHeading level="h2" id="api" title="API Reference" />

            <Subsection level="h3">
              <SectionHeading level="h3" title="Breadcrumb Props" />

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
                      <Code>separator</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string | ReactNode</Code>
                    </TableCell>
                    <TableCell>
                      <Code>&apos;/&apos;</Code>
                    </TableCell>
                    <TableCell>항목 사이의 구분자</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>maxItems</Code>
                    </TableCell>
                    <TableCell>
                      <Code>number</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>표시할 최대 항목 수 (초과시 생략)</TableCell>
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
              <SectionHeading level="h3" title="BreadcrumbItem Props" />

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
                      <Code>href</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>링크 URL (current가 true면 무시됨)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>current</Code>
                    </TableCell>
                    <TableCell>
                      <Code>boolean</Code>
                    </TableCell>
                    <TableCell>
                      <Code>false</Code>
                    </TableCell>
                    <TableCell>현재 페이지 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>icon</Code>
                    </TableCell>
                    <TableCell>
                      <Code>ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>아이콘 요소</TableCell>
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
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Border Radius', href: '/components/border-radius' }}
        next={{ title: 'Button', href: '/components/button' }}
      />
    </>
  );
}
