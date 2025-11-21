'use client';

import {
  Section,
  SectionHeading,
  Subsection,
  Code,
  Body,
  Card,
  Link,
  PageNavigation,
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
} from '@/components/hanui';
import { ComponentPreview } from '@/components/content/ComponentPreview';

export default function BreakpointsPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Breakpoints"
        description="KRDS 기반 반응형 브레이크포인트 시스템입니다. 다양한 화면 크기에 맞춰 인터페이스가 자연스럽게 적응할 수 있게 합니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="api">API Reference</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* What is it */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="what-is-it"
              title="무엇인가요?"
              description="Breakpoints는 화면 크기에 따라 레이아웃이 변경되는 지점을 정의합니다."
            />

            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>하이브리드 시스템:</strong> Tailwind 기본값과 KRDS
                  브레이크포인트를 모두 지원합니다.
                </ListItem>
                <ListItem>
                  <strong>모바일 우선:</strong> Mobile First 접근 방식을
                  따릅니다.
                </ListItem>
                <ListItem>
                  <strong>유연한 단계:</strong> 최소 3단계에서 6단계로 설정하여
                  사용할 수 있습니다.
                </ListItem>
                <ListItem>
                  <strong>그리드 통합:</strong> 그리드 시스템과 함께 사용되어
                  일관된 레이아웃을 제공합니다.
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* Breakpoint Scale */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="breakpoint-scale"
              title="브레이크포인트 스케일"
              description="HANUI는 Tailwind 기본값과 KRDS 브레이크포인트를 모두 지원하는 하이브리드 방식을 사용합니다."
            />

            <Card
              variant="outlined"
              className="bg-krds-primary-5 border-krds-primary-20"
            >
              <SectionHeading
                level="h3"
                title="하이브리드 브레이크포인트 시스템"
                description="국제 표준과의 호환성을 유지하면서 KRDS 요구사항도 충족합니다."
              />

              <List className="text-krds-gray-70 mt-3">
                <ListItem>
                  <strong className="text-krds-primary-text">
                    xs (360px):
                  </strong>{' '}
                  KRDS small 기준으로 추가. 국제 표준과의 호환성을 위해 기존{' '}
                  <Code>sm</Code>을 640px로 유지하고, KRDS 요구사항인 360px는{' '}
                  <Code>xs</Code>로 추가했습니다.
                </ListItem>
                <ListItem>
                  <strong className="text-krds-primary-text">
                    sm, md, lg, xl:
                  </strong>{' '}
                  Tailwind 기본값을 그대로 유지 (640px, 768px, 1024px, 1280px).
                  국제 표준과 외부 라이브러리와의 호환성을 보장합니다.
                </ListItem>
                <ListItem>
                  <strong className="text-krds-primary-text">
                    2xl (1440px):
                  </strong>{' '}
                  Tailwind 기본값(1536px)을 KRDS xxlarge 기준인 1440px로 변경.
                  KRDS 권장 최대 너비와 일치합니다.
                </ListItem>
              </List>
            </Card>

            <Subsection level="h3">
              <SectionHeading level="h3" title="브레이크포인트 상세 표" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>브레이크포인트</TableHead>
                    <TableHead>뷰포트</TableHead>
                    <TableHead>칼럼 수 (적정-최대)</TableHead>
                    <TableHead>가터 너비 (최소-적정)</TableHead>
                    <TableHead>최소 스크린 마진</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>xs</Code>
                      <Body size="xs" className="text-krds-gray-70 ml-1">
                        (KRDS)
                      </Body>
                    </TableCell>
                    <TableCell>360px-</TableCell>
                    <TableCell>4-6</TableCell>
                    <TableCell>16px - 16px</TableCell>
                    <TableCell>16px</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>sm</Code>
                      <Body size="xs" className="text-krds-gray-70 ml-1">
                        (Tailwind)
                      </Body>
                    </TableCell>
                    <TableCell>640px-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>md</Code>
                      <Body size="xs" className="text-krds-gray-70 ml-1">
                        (KRDS/Tailwind)
                      </Body>
                    </TableCell>
                    <TableCell>768px-</TableCell>
                    <TableCell>8-12</TableCell>
                    <TableCell>16px - 24px</TableCell>
                    <TableCell>24px</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>lg</Code>
                      <Body size="xs" className="text-krds-gray-70 ml-1">
                        (KRDS/Tailwind)
                      </Body>
                    </TableCell>
                    <TableCell>1024px-</TableCell>
                    <TableCell>12-16</TableCell>
                    <TableCell>16px - 24px</TableCell>
                    <TableCell>24px</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>xl</Code>
                      <Body size="xs" className="text-krds-gray-70 ml-1">
                        (KRDS/Tailwind)
                      </Body>
                    </TableCell>
                    <TableCell>1280px-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>2xl</Code>
                      <Body size="xs" className="text-krds-gray-70 ml-1">
                        (KRDS)
                      </Body>
                    </TableCell>
                    <TableCell>1440px-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="브레이크포인트 선택 가이드" />

              <Card
                variant="outlined"
                className="bg-krds-warning-5 border-krds-warning-20"
              >
                <List className="text-krds-gray-70">
                  <ListItem>
                    브레이크포인트 단계가 적을수록 관리와 개발이 용이하지만
                    세분화가 어려울 수 있습니다.
                  </ListItem>
                  <ListItem>
                    단계가 많아질수록 디자인 세분화가 가능하지만 복잡성은
                    증가합니다.
                  </ListItem>
                  <ListItem>
                    프로젝트의 요구사항에 따라 최소 3단계에서 6단계로 설정하여
                    사용합니다.
                  </ListItem>
                </List>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="사용 가이드" />

              <Card
                variant="outlined"
                className="bg-krds-success-5 border-krds-success-20"
              >
                <List className="text-krds-gray-70">
                  <ListItem>
                    <strong>KRDS 정부 사이트:</strong> <Code>xs:</Code>를
                    사용하여 360px 이상의 모바일 기기를 지원합니다.
                  </ListItem>
                  <ListItem>
                    <strong>일반 웹사이트:</strong> <Code>sm:</Code>부터
                    사용하여 Tailwind 표준을 따릅니다.
                  </ListItem>
                  <ListItem>
                    <strong>공통 브레이크포인트:</strong> <Code>md:</Code>,{' '}
                    <Code>lg:</Code>, <Code>xl:</Code>는 KRDS와 Tailwind가
                    동일하므로 어느 프로젝트에서나 사용 가능합니다.
                  </ListItem>
                </List>
              </Card>
            </Subsection>
          </Section>

          {/* Usage */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="usage"
              title="사용 방법"
              description="Breakpoints를 사용하여 반응형 레이아웃을 만드는 방법입니다."
            />

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                title="기본 사용"
                description="Tailwind CSS의 브레이크포인트 접두사를 사용하여 반응형 스타일을 적용합니다"
              />

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`// 모바일 우선 접근 방식
<div className="text-sm md:text-base lg:text-lg">
  모바일: 14px, 태블릿: 16px, 데스크톱: 18px
</div>

// 그리드 레이아웃
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 모바일: 1열, 태블릿: 2열, 데스크톱: 3열 */}
</div>

// 조건부 표시/숨김
<div className="hidden md:block">
  태블릿 이상에서만 표시
</div>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                title="반응형 그리드 예시"
                description="화면 크기에 따라 열의 개수가 변경되는 그리드 레이아웃입니다"
              />

              <ComponentPreview>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-krds-primary-surface rounded-lg text-center">
                    1
                  </div>
                  <div className="p-4 bg-krds-primary-surface rounded-lg text-center">
                    2
                  </div>
                  <div className="p-4 bg-krds-primary-surface rounded-lg text-center">
                    3
                  </div>
                </div>
              </ComponentPreview>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 모바일: 1열, 태블릿: 2열, 데스크톱: 3열 */}
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                title="KRDS xs 브레이크포인트 사용"
                description="정부 사이트에서 360px 이상의 작은 모바일 기기를 지원할 때 사용합니다"
              />

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`// 360px 이상에서 스타일 적용
<div className="xs:px-4 md:px-6 lg:px-8">
  360px 이상: 16px, 768px 이상: 24px, 1024px 이상: 32px 패딩
</div>

// 작은 모바일 기기 대응
<div className="text-xs xs:text-sm md:text-base">
  작은 모바일에서도 읽기 쉬운 크기
</div>`}
              </Code>
            </Subsection>
          </Section>

          {/* Best Practices */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="best-practices"
              title="Best Practices"
            />

            <List>
              <ListItem>
                <strong>모바일 우선:</strong> 기본 스타일을 모바일용으로
                작성하고 브레이크포인트로 확장하세요.
              </ListItem>
              <ListItem>
                <strong>필요한 단계만 사용:</strong> 모든 브레이크포인트를
                사용할 필요는 없습니다. 프로젝트에 맞게 선택하세요.
              </ListItem>
              <ListItem>
                <strong>일관성 유지:</strong> 프로젝트 전체에서 동일한
                브레이크포인트를 사용하세요.
              </ListItem>
              <ListItem>
                <strong>테스트:</strong> 각 브레이크포인트에서 레이아웃이 제대로
                작동하는지 확인하세요.
              </ListItem>
              <ListItem>
                <strong>접근성 고려:</strong> 모든 화면 크기에서 콘텐츠가 접근
                가능하고 사용 가능한지 확인하세요.
              </ListItem>
            </List>
          </Section>

          {/* Reference */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="reference"
              title="참고 자료"
              description="KRDS Breakpoints 관련 문서입니다."
            />

            <Link
              href="https://www.krds.go.kr/html/site/style/style_05.html"
              external
              className="block p-4 bg-krds-white border border-krds-gray-20 rounded-lg hover:border-krds-primary-base transition-colors"
            >
              <strong className="font-semibold mb-1">
                KRDS 레이아웃 가이드
              </strong>
              <Body size="sm" className="text-krds-gray-70">
                간격, 그리드, 브레이크포인트 기준
              </Body>
            </Link>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          {/* API Reference */}
          <Section level="h2">
            <SectionHeading level="h2" id="api" title="API Reference" />

            <Subsection level="h3">
              <SectionHeading level="h3" title="Breakpoint Prefixes" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prefix</TableHead>
                    <TableHead>Min Width</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Usage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">xs:</TableCell>
                    <TableCell>360px</TableCell>
                    <TableCell>KRDS</TableCell>
                    <TableCell>작은 모바일 기기 (정부 사이트)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">sm:</TableCell>
                    <TableCell>640px</TableCell>
                    <TableCell>Tailwind</TableCell>
                    <TableCell>모바일 가로/작은 태블릿</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">md:</TableCell>
                    <TableCell>768px</TableCell>
                    <TableCell>KRDS/Tailwind</TableCell>
                    <TableCell>태블릿</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">lg:</TableCell>
                    <TableCell>1024px</TableCell>
                    <TableCell>KRDS/Tailwind</TableCell>
                    <TableCell>데스크톱</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">xl:</TableCell>
                    <TableCell>1280px</TableCell>
                    <TableCell>KRDS/Tailwind</TableCell>
                    <TableCell>큰 데스크톱</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">2xl:</TableCell>
                    <TableCell>1440px</TableCell>
                    <TableCell>KRDS</TableCell>
                    <TableCell>매우 큰 화면 (KRDS 최대 너비)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Common Patterns" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pattern</TableHead>
                    <TableHead>Example</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">
                      display:value md:value
                    </TableCell>
                    <TableCell className="font-mono">hidden md:block</TableCell>
                    <TableCell>
                      모바일에서 숨기고 태블릿 이상에서 표시
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      grid-cols-n md:grid-cols-m
                    </TableCell>
                    <TableCell className="font-mono">
                      grid-cols-1 md:grid-cols-2
                    </TableCell>
                    <TableCell>반응형 그리드 열 개수 조정</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      text-size md:text-size
                    </TableCell>
                    <TableCell className="font-mono">
                      text-sm md:text-base
                    </TableCell>
                    <TableCell>화면 크기에 따른 폰트 크기 조정</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      p-size md:p-size
                    </TableCell>
                    <TableCell className="font-mono">p-4 md:p-6</TableCell>
                    <TableCell>반응형 패딩 조정</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      flex-direction md:flex-direction
                    </TableCell>
                    <TableCell className="font-mono">
                      flex-col md:flex-row
                    </TableCell>
                    <TableCell>모바일에서 세로, 데스크톱에서 가로</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                title="Configuration (tailwind.config.ts)"
              />

              <Code
                variant="block"
                language="typescript"
                showLineNumbers={false}
              >
                {`// HANUI의 브레이크포인트 설정
module.exports = {
  theme: {
    screens: {
      xs: '360px',    // KRDS small
      sm: '640px',    // Tailwind default
      md: '768px',    // KRDS medium / Tailwind default
      lg: '1024px',   // KRDS large / Tailwind default
      xl: '1280px',   // KRDS xlarge / Tailwind default
      '2xl': '1440px' // KRDS xxlarge (modified from Tailwind 1536px)
    }
  }
}`}
              </Code>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      {/* Page Navigation */}
      <PageNavigation
        prev={{ title: 'Breadcrumb', href: '/components/breadcrumb' }}
        next={{ title: 'Button', href: '/components/button' }}
      />
    </>
  );
}
