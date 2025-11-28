'use client';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';

// Docs helper components
import { Wrap } from '@/components/helpers';

// UI components - from @hanui/react
import {
  List,
  ListItem,
  Code,
  Body,
  Card,
  Link,
  Stack,
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
import { CircleX, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function ColorsPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Colors"
        description="KRDS 색상 시스템을 Tailwind CSS로 사용하는 방법"
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* 핵심 요약 */}
          <Section>
            <Card variant="filled">
              <Body>
                <strong>핵심:</strong> <Code>krds-</Code> 접두사로 KRDS 색상을
                사용하고, <Code>html</Code>에 <Code>dark</Code> 클래스만
                추가하면 다크 모드가 자동 적용됩니다. <Code>dark:</Code>{' '}
                접두사가 필요 없습니다.
              </Body>
            </Card>

            <Stack
              direction="row"
              gap="md"
              className="flex-col md:flex-row mt-4"
            >
              <Card variant="outlined" className="flex-1">
                <Heading level="h4" title="Tailwind 기본 색상" />
                <Body size="sm" className="mt-2">
                  예: <Code>bg-gray-50</Code>
                </Body>
              </Card>
              <Card variant="outlined" className="flex-1">
                <Heading level="h4" title="KRDS 색상 (krds- 접두사)" />
                <Body size="sm" className="mt-2">
                  예: <Code>bg-krds-gray-50</Code>
                </Body>
              </Card>
            </Stack>
          </Section>

          {/* 색상 카테고리 */}
          <Section>
            <Heading
              level="h2"
              id="color-categories"
              title="색상 카테고리"
              description="KRDS 색상 시스템은 8가지 카테고리를 제공합니다."
            />

            <Subsection level="h3">
              <Heading level="h3" title="Base Colors (기본 색상)" />
              <Body className="mb-4">
                <Code>krds-white</Code>/<Code>krds-black</Code>는 모드에 따라
                자동 반전됩니다. 순수 색상이 필요하면 <Code>white</Code>/
                <Code>black</Code>를 사용하세요.
              </Body>

              <Wrap gap="md" className="mb-4">
                <div className="flex-1 min-w-[280px]">
                  <div className="p-4 bg-krds-white text-krds-black rounded-lg border border-krds-gray-20">
                    <code className="block mb-1">bg-krds-white</code>
                    <p className="text-sm">라이트: 흰색 → 다크: 검은색</p>
                  </div>
                </div>
                <div className="flex-1 min-w-[280px]">
                  <div className="p-4 bg-krds-black text-krds-white rounded-lg border border-krds-gray-20">
                    <code className="block mb-1">bg-krds-black</code>
                    <p className="text-sm">라이트: 검은색 → 다크: 흰색</p>
                  </div>
                </div>
              </Wrap>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Primary Colors" />
              <Wrap gap="md" className="mb-4">
                <div className="flex-1 min-w-[280px]">
                  <div className="p-4 bg-krds-primary-base text-white rounded-lg">
                    <code className="block mb-1">bg-krds-primary-base</code>
                    <p className="text-sm">주요 버튼, CTA</p>
                  </div>
                </div>
                <div className="flex-1 min-w-[280px]">
                  <div className="p-4 bg-krds-primary-surface text-krds-primary-text rounded-lg border border-krds-primary-border">
                    <code className="block mb-1">bg-krds-primary-surface</code>
                    <p className="text-sm">배경, 카드</p>
                  </div>
                </div>
              </Wrap>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Gray Scale" />
              <Stack gap="sm" className="mb-4">
                <div className="flex items-center gap-4 p-3 bg-krds-gray-surface rounded-lg border border-krds-gray-border">
                  <div className="w-12 h-12 bg-krds-gray-0 border border-krds-gray-border rounded"></div>
                  <div>
                    <code className="text-sm">bg-krds-gray-0</code>
                    <p className="text-xs text-krds-gray-70">
                      기본 배경 (white)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-krds-gray-5 rounded-lg border border-krds-gray-border">
                  <div className="w-12 h-12 bg-krds-gray-5 border border-krds-gray-border rounded"></div>
                  <div>
                    <code className="text-sm">bg-krds-gray-5</code>
                    <p className="text-xs text-krds-gray-70">보조 배경</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-krds-gray-10 rounded-lg border border-krds-gray-border">
                  <div className="w-12 h-12 bg-krds-gray-10 border border-krds-gray-border rounded"></div>
                  <div>
                    <code className="text-sm">bg-krds-gray-10</code>
                    <p className="text-xs text-krds-gray-70">강조 배경</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-krds-gray-surface rounded-lg border border-krds-gray-border">
                  <div className="w-12 h-12 bg-krds-gray-20 rounded"></div>
                  <div>
                    <code className="text-sm">bg-krds-gray-20</code>
                    <p className="text-xs text-krds-gray-70">구분선, 테두리</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-krds-gray-surface rounded-lg border border-krds-gray-border">
                  <div className="w-12 h-12 bg-krds-gray-50 rounded"></div>
                  <div>
                    <code className="text-sm">text-krds-gray-50</code>
                    <p className="text-xs text-krds-gray-70">비활성 텍스트</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-krds-gray-surface rounded-lg border border-krds-gray-border">
                  <div className="w-12 h-12 bg-krds-gray-90 rounded"></div>
                  <div>
                    <code className="text-sm">text-krds-gray-90</code>
                    <p className="text-xs text-krds-gray-70">본문 텍스트</p>
                  </div>
                </div>
              </Stack>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="System Colors (상태 색상)" />
              <Stack gap="md" className="mb-4">
                <div className="p-4 bg-krds-danger-surface border border-krds-danger-border rounded-lg">
                  <strong className="text-krds-danger-text flex items-center gap-2">
                    <CircleX className="w-4 h-4 text-krds-danger-icon" /> Danger
                  </strong>
                  <code className="text-sm block mt-1">
                    bg-krds-danger-surface / text-krds-danger-text /
                    border-krds-danger-border
                  </code>
                </div>

                <div className="p-4 bg-krds-warning-surface border border-krds-warning-border rounded-lg">
                  <strong className="text-krds-warning-text flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-krds-warning-icon" />{' '}
                    Warning
                  </strong>
                  <code className="text-sm block mt-1">
                    bg-krds-warning-surface / text-krds-warning-text /
                    border-krds-warning-border
                  </code>
                </div>

                <div className="p-4 bg-krds-success-surface border border-krds-success-border rounded-lg">
                  <strong className="text-krds-success-text flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-krds-success-icon" />{' '}
                    Success
                  </strong>
                  <code className="text-sm block mt-1">
                    bg-krds-success-surface / text-krds-success-text /
                    border-krds-success-border
                  </code>
                </div>

                <div className="p-4 bg-krds-info-surface border border-krds-info-border rounded-lg">
                  <strong className="text-krds-info-text flex items-center gap-2">
                    <Info className="w-4 h-4 text-krds-info-icon" /> Information
                  </strong>
                  <code className="text-sm block mt-1">
                    bg-krds-info-surface / text-krds-info-text /
                    border-krds-info-border
                  </code>
                </div>
              </Stack>
            </Subsection>
          </Section>

          {/* Semantic vs 숫자 스케일 */}
          <Section>
            <Heading
              level="h2"
              id="semantic-vs-scale"
              title="Semantic 변수 vs 숫자 스케일"
            />

            <Stack
              direction="row"
              gap="md"
              className="flex-col md:flex-row mb-4"
            >
              <Card variant="outlined" className="flex-1">
                <Heading level="h4" title="Semantic 변수 (권장)" />
                <Body size="sm" className="mb-2">
                  <Code>bg-krds-primary-surface</Code>,{' '}
                  <Code>text-krds-primary-text</Code>
                </Body>
                <List>
                  <ListItem>
                    의미 기반 이름 (surface, text, base, border)
                  </ListItem>
                  <ListItem>모드에 따라 적절한 값 자동 선택</ListItem>
                  <ListItem>라이트: surface=5 → 다크: surface=95</ListItem>
                </List>
              </Card>

              <Card variant="outlined" className="flex-1">
                <Heading level="h4" title="숫자 스케일" />
                <Body size="sm" className="mb-2">
                  <Code>bg-krds-gray-5</Code>, <Code>text-krds-gray-90</Code>
                </Body>
                <List>
                  <ListItem>직접 색상 값 지정 (5, 10, 50, 90 등)</ListItem>
                  <ListItem>CSS 변수로 자동 전환됨</ListItem>
                  <ListItem>디자인 시스템 정확한 값 필요 시 사용</ListItem>
                </List>
              </Card>
            </Stack>
          </Section>

          {/* 다크 모드 */}
          <Section>
            <Heading
              level="h2"
              id="dark-mode"
              title="다크 모드"
              description="html 요소에 dark 클래스만 추가하면 모든 KRDS 색상이 자동 전환됩니다."
            />

            <Code variant="block" language="tsx">
              {`// 다크 모드 활성화
document.documentElement.classList.add('dark');

// 다크 모드 비활성화
document.documentElement.classList.remove('dark');

// 사용 예시 - dark: 접두사 불필요!
<div className="bg-krds-gray-5 text-krds-gray-90">
  {/* 라이트 모드: 밝은 배경 + 어두운 텍스트 */}
  {/* 다크 모드: 어두운 배경 + 밝은 텍스트 (자동!) */}
</div>`}
            </Code>
          </Section>

          {/* 참고 자료 */}
          <Section>
            <Heading level="h2" id="reference" title="참고 자료" />
            <Link
              href="https://www.krds.go.kr/html/site/style/style_02.html"
              external
              className="block p-4 bg-krds-gray-surface border border-krds-gray-border rounded-lg hover:border-krds-primary-base transition-colors"
            >
              <h4 className="font-semibold mb-1">KRDS 색상 시스템</h4>
              <p className="text-krds-gray-70">색상 팔레트, 접근성 기준</p>
            </Link>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section>
            <Heading level="h2" id="api-reference" title="API 레퍼런스" />

            {/* 색상 카테고리 */}
            <Subsection level="h3">
              <Heading level="h3" title="색상 카테고리" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>카테고리</TableHead>
                    <TableHead>Tailwind 접두사</TableHead>
                    <TableHead>용도</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">Gray</TableCell>
                    <TableCell>
                      <Code className="text-xs">krds-gray-</Code>
                    </TableCell>
                    <TableCell>텍스트, 배경, 구분선, 비활성</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">Primary</TableCell>
                    <TableCell>
                      <Code className="text-xs">krds-primary-</Code>
                    </TableCell>
                    <TableCell>주요 버튼, 링크, CTA</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">Secondary</TableCell>
                    <TableCell>
                      <Code className="text-xs">krds-secondary-</Code>
                    </TableCell>
                    <TableCell>보조 버튼, 대안 강조</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">Accent</TableCell>
                    <TableCell>
                      <Code className="text-xs">krds-accent-</Code>
                    </TableCell>
                    <TableCell>특별 강조, 하이라이트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">Success</TableCell>
                    <TableCell>
                      <Code className="text-xs">krds-success-</Code>
                    </TableCell>
                    <TableCell>완료, 성공 알림</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">Warning</TableCell>
                    <TableCell>
                      <Code className="text-xs">krds-warning-</Code>
                    </TableCell>
                    <TableCell>주의, 경고 알림</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">Danger</TableCell>
                    <TableCell>
                      <Code className="text-xs">krds-danger-</Code>
                    </TableCell>
                    <TableCell>에러, 삭제 버튼</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">Info</TableCell>
                    <TableCell>
                      <Code className="text-xs">krds-info-</Code>
                    </TableCell>
                    <TableCell>안내, 정보 알림</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            {/* 숫자 스케일 */}
            <Subsection level="h3">
              <Heading level="h3" title="숫자 스케일 (5-95)" />
              <Body className="mb-4">
                각 카테고리는 밝기에 따라 11단계 스케일을 제공합니다. 숫자가
                작을수록 밝고, 클수록 어둡습니다.
              </Body>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>스케일</TableHead>
                    <TableHead>밝기</TableHead>
                    <TableHead>주요 용도</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">5</TableCell>
                    <TableCell>가장 밝음</TableCell>
                    <TableCell>Surface (배경)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">10</TableCell>
                    <TableCell>매우 밝음</TableCell>
                    <TableCell>Border (테두리)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">20-30</TableCell>
                    <TableCell>밝음</TableCell>
                    <TableCell>Hover, 구분선</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">40-50</TableCell>
                    <TableCell>중간</TableCell>
                    <TableCell>Base (버튼), Icon</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">60</TableCell>
                    <TableCell>약간 어두움</TableCell>
                    <TableCell>Text (텍스트)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">70-80</TableCell>
                    <TableCell>어두움</TableCell>
                    <TableCell>보조 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">90-95</TableCell>
                    <TableCell>가장 어두움</TableCell>
                    <TableCell>본문, 제목</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            {/* Semantic 변수 */}
            <Subsection level="h3">
              <Heading level="h3" title="Semantic 변수" />
              <Body className="mb-4">
                의미 기반 변수는 모드에 따라 자동으로 적절한 값으로 전환됩니다.
              </Body>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tailwind 클래스</TableHead>
                    <TableHead>라이트 모드</TableHead>
                    <TableHead>다크 모드</TableHead>
                    <TableHead>용도</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">-surface</Code>
                    </TableCell>
                    <TableCell className="text-krds-gray-70">5</TableCell>
                    <TableCell className="text-krds-gray-70">95</TableCell>
                    <TableCell>배경색</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">-text</Code>
                    </TableCell>
                    <TableCell className="text-krds-gray-70">60</TableCell>
                    <TableCell className="text-krds-gray-70">20</TableCell>
                    <TableCell>텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">-base</Code>
                    </TableCell>
                    <TableCell className="text-krds-gray-70">50</TableCell>
                    <TableCell className="text-krds-gray-70">50</TableCell>
                    <TableCell>버튼, 아이콘</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">-border</Code>
                    </TableCell>
                    <TableCell className="text-krds-gray-70">10-20</TableCell>
                    <TableCell className="text-krds-gray-70">80-90</TableCell>
                    <TableCell>테두리</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">-icon</Code>
                    </TableCell>
                    <TableCell className="text-krds-gray-70">50</TableCell>
                    <TableCell className="text-krds-gray-70">20</TableCell>
                    <TableCell>아이콘 (상태 색상)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Card variant="info" className="mt-4">
                <Body>
                  <strong>사용 예시:</strong>
                </Body>
                <Code variant="block" language="tsx" className="mt-2">
                  {`// Primary 색상
<div className="bg-krds-primary-surface text-krds-primary-text border-krds-primary-border">
  Primary 카드
</div>

// Danger 알림
<div className="bg-krds-danger-surface text-krds-danger-text border-krds-danger-border">
  <CircleX className="text-krds-danger-icon" /> 에러 발생
</div>

// Gray 배경
<div className="bg-krds-gray-surface text-krds-gray-text border-krds-gray-border">
  일반 콘텐츠
</div>`}
                </Code>
              </Card>
            </Subsection>

            {/* 베이스 색상 */}
            <Subsection level="h3">
              <Heading level="h3" title="베이스 색상" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tailwind 클래스</TableHead>
                    <TableHead>라이트 모드</TableHead>
                    <TableHead>다크 모드</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">krds-white</Code>
                    </TableCell>
                    <TableCell>#ffffff</TableCell>
                    <TableCell>#000000</TableCell>
                    <TableCell>자동 반전 (권장)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">krds-black</Code>
                    </TableCell>
                    <TableCell>#000000</TableCell>
                    <TableCell>#ffffff</TableCell>
                    <TableCell>자동 반전 (권장)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">white</Code>
                    </TableCell>
                    <TableCell>#ffffff</TableCell>
                    <TableCell>#ffffff</TableCell>
                    <TableCell>순수 흰색 (고정)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">black</Code>
                    </TableCell>
                    <TableCell>#000000</TableCell>
                    <TableCell>#000000</TableCell>
                    <TableCell>순수 검은색 (고정)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            {/* CSS 변수 */}
            <Subsection level="h3">
              <Heading level="h3" title="CSS 변수 참조" />
              <Body className="mb-4">
                Tailwind 외에 직접 CSS 변수를 사용할 수도 있습니다.
              </Body>

              <Body className="mb-2">
                모든 CSS 변수는 <Code>@hanui/react/variables.css</Code>에
                정의되어 있습니다.
              </Body>
              <Code variant="block" language="css">
                {`/* variables.css에서 정의됨 */

/* 숫자 스케일 */
--krds-color-light-primary-50  /* 라이트: #256ef4 */
--krds-color-light-gray-90     /* 라이트: #1e2124 */

/* Semantic 변수 */
--krds-primary-surface  /* 라이트: 5, 다크: 95 자동 */
--krds-primary-text     /* 라이트: 60, 다크: 20 자동 */
--krds-primary-base     /* 항상 50 */
--krds-primary-border   /* 라이트: 20, 다크: 80 자동 */

/* 베이스 색상 */
--krds-white  /* 라이트: #fff, 다크: #000 자동 반전 */
--krds-black  /* 라이트: #000, 다크: #fff 자동 반전 */
--color-white /* 항상 #fff */
--color-black /* 항상 #000 */`}
              </Code>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        next={{ title: 'Typography', href: '/design-system/typography' }}
      />
    </>
  );
}
