import {
  Section as SectionComponent,
  SectionHeading,
  Subsection,
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
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  PageNavigation,
  DoCard,
  DontCard,
} from '@/components/hanui';

export default function SectionPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Section"
        description="KRDS 수직 간격을 준수하는 의미론적 섹션 컴포넌트입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview">
          {/* Installation */}
          <SectionComponent level="h2">
            <SectionHeading level="h2" id="installation" title="설치">
              <Body className="leading-relaxed">
                다음 명령어로 Section 컴포넌트를 설치합니다:
              </Body>
            </SectionHeading>

            <Code variant="block" language="bash" showLineNumbers={false}>
              npx @hanui/cli add section
            </Code>
          </SectionComponent>

          {/* What is it */}
          <SectionComponent level="h2">
            <SectionHeading
              level="h2"
              id="what-is-it"
              title="무엇인가요?"
              description="Section은 페이지의 논리적 구역을 나타내는 의미론적 컴포넌트입니다."
            />

            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>KRDS 준수:</strong> KRDS(한국형 웹 콘텐츠 접근성
                  지침)의 수직 간격 기준을 준수합니다.
                </ListItem>
                <ListItem>
                  <strong>패딩 프리셋:</strong> page-section, content-area,
                  card-large, card-medium, card-small 5가지 패딩 프리셋을
                  제공합니다.
                </ListItem>
                <ListItem>
                  <strong>배경색 옵션:</strong> white, gray, primary,
                  transparent 4가지 배경색 옵션을 제공합니다.
                </ListItem>
                <ListItem>
                  <strong>시맨틱 HTML:</strong> as prop으로 section, div,
                  header, main 등 다양한 시맨틱 태그로 렌더링할 수 있습니다.
                </ListItem>
                <ListItem>
                  <strong>반응형:</strong> 모바일과 데스크탑에서 자동으로 적절한
                  패딩을 적용합니다.
                </ListItem>
              </List>
            </Card>
          </SectionComponent>

          {/* Preview */}
          <SectionComponent level="h2">
            <SectionHeading level="h2" id="preview" title="미리보기" />
            <Card variant="outlined">
              <SectionComponent padding="page-section" background="gray">
                <h2 className="text-xl font-semibold mb-4">섹션 제목</h2>
                <p className="text-krds-gray-70">
                  Section 컴포넌트는 KRDS 기준에 따라 일관된 패딩을 제공합니다.
                </p>
              </SectionComponent>
            </Card>
          </SectionComponent>

          {/* Usage */}
          <SectionComponent level="h2">
            <SectionHeading level="h2" id="usage" title="사용 방법" />

            <Subsection level="h3">
              <SectionHeading level="h3" title="기본 사용">
                <Body className="leading-relaxed">
                  기본적인 Section 사용 예시입니다:
                </Body>
              </SectionHeading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`import { Section } from '@/components/hanui';

<Section padding="page-section">
  <h2>섹션 제목</h2>
  <p>섹션 내용</p>
</Section>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="패딩 프리셋">
                <Body className="leading-relaxed">
                  다양한 패딩 프리셋을 사용할 수 있습니다:
                </Body>
              </SectionHeading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`// 메인 페이지 섹션용
<Section padding="page-section">
  <h2>주요 기능</h2>
</Section>

// 일반 콘텐츠 영역용
<Section padding="content-area">
  <h3>소개</h3>
</Section>

// 카드용 (large, medium, small)
<Section padding="card-medium">
  <h4>카드 제목</h4>
</Section>`}
              </Code>

              <Card variant="outlined" className="mt-3">
                <SectionComponent padding="page-section" background="white">
                  <h3 className="text-xl font-bold mb-2">Page Section</h3>
                  <p className="text-krds-gray-70">
                    메인 페이지 섹션용 넉넉한 패딩
                  </p>
                </SectionComponent>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="배경색">
                <Body className="leading-relaxed">
                  4가지 배경색 옵션을 사용할 수 있습니다:
                </Body>
              </SectionHeading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Section background="white">...</Section>
<Section background="gray">...</Section>
<Section background="primary">...</Section>
<Section background="transparent">...</Section>`}
              </Code>

              <Card variant="outlined" className="mt-3">
                <div className="space-y-4">
                  <SectionComponent padding="card-small" background="white">
                    <p className="text-center font-semibold">
                      White Background
                    </p>
                  </SectionComponent>
                  <SectionComponent padding="card-small" background="gray">
                    <p className="text-center font-semibold">Gray Background</p>
                  </SectionComponent>
                  <SectionComponent padding="card-small" background="primary">
                    <p className="text-center font-semibold text-white">
                      Primary Background
                    </p>
                  </SectionComponent>
                </div>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="여러 섹션 조합">
                <Body className="leading-relaxed">
                  여러 섹션을 조합하여 페이지를 구성할 수 있습니다:
                </Body>
              </SectionHeading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Section padding="content-area" background="white">
  <h2>소개</h2>
  <p>내용</p>
</Section>

<Section padding="content-area" background="gray">
  <h2>기능</h2>
  <p>내용</p>
</Section>

<Section padding="content-area" background="white">
  <h2>연락처</h2>
  <p>내용</p>
</Section>`}
              </Code>

              <Card variant="outlined" className="mt-3">
                <div className="space-y-0">
                  <SectionComponent padding="content-area" background="white">
                    <h3 className="text-xl font-bold mb-2">첫 번째 섹션</h3>
                    <p className="text-krds-gray-70">White 배경</p>
                  </SectionComponent>
                  <SectionComponent padding="content-area" background="gray">
                    <h3 className="text-xl font-bold mb-2">두 번째 섹션</h3>
                    <p className="text-krds-gray-70">Gray 배경</p>
                  </SectionComponent>
                  <SectionComponent padding="content-area" background="white">
                    <h3 className="text-xl font-bold mb-2">세 번째 섹션</h3>
                    <p className="text-krds-gray-70">White 배경</p>
                  </SectionComponent>
                </div>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="시맨틱 HTML">
                <Body className="leading-relaxed">
                  as prop으로 다양한 시맨틱 태그로 렌더링할 수 있습니다:
                </Body>
              </SectionHeading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Section as="header" padding="page-section">
  <h1>페이지 헤더</h1>
</Section>

<Section as="main" padding="content-area">
  <h2>메인 콘텐츠</h2>
</Section>

<Section as="footer" padding="content-area">
  <p>푸터 내용</p>
</Section>`}
              </Code>
            </Subsection>
          </SectionComponent>

          {/* Best Practices */}
          <SectionComponent level="h2">
            <SectionHeading
              level="h2"
              id="best-practices"
              title="Best Practices"
            />

            <Subsection level="h3">
              <SectionHeading level="h3" title="언제 사용하나요?" />
              <DoCard title="Section을 사용하기 적합한 경우">
                <List variant="check">
                  <ListItem>
                    페이지의 논리적 구역을 나타낼 때 (소개, 기능, 연락처 등)
                  </ListItem>
                  <ListItem>KRDS 수직 간격 기준을 준수해야 할 때</ListItem>
                  <ListItem>일관된 패딩이 필요할 때</ListItem>
                  <ListItem>배경색으로 섹션을 구분하고 싶을 때</ListItem>
                  <ListItem>시맨틱 HTML 구조를 유지하고 싶을 때</ListItem>
                </List>
              </DoCard>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="언제 사용하지 말아야 하나요?" />
              <DontCard title="Section 사용을 피해야 하는 경우">
                <List variant="dash">
                  <ListItem>
                    단순히 여백만 필요할 때 (<Code>Stack</Code> 컴포넌트 사용)
                  </ListItem>
                  <ListItem>
                    카드 형태의 콘텐츠가 필요할 때 (<Code>Card</Code> 컴포넌트
                    사용)
                  </ListItem>
                  <ListItem>
                    의미론적 구역이 아닌 단순 레이아웃용일 때 (<Code>Box</Code>{' '}
                    컴포넌트 사용)
                  </ListItem>
                </List>
              </DontCard>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="사용 가이드라인" />
              <List>
                <ListItem>
                  페이지의 의미론적 구조를 고려하여 적절한 <Code>as</Code>{' '}
                  prop을 사용하세요.
                </ListItem>
                <ListItem>
                  배경색을 번갈아 사용하여 섹션 간 시각적 구분을 명확히 하세요.
                </ListItem>
                <ListItem>
                  패딩 프리셋은 KRDS 기준에 맞게 설계되었으므로, 커스텀 패딩보다
                  프리셋 사용을 권장합니다.
                </ListItem>
              </List>
            </Subsection>
          </SectionComponent>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
          <SectionComponent level="h2">
            <SectionHeading level="h2" id="api" title="API Reference" />

            <Subsection level="h3">
              <SectionHeading level="h3" title="Section Props" />

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
                    <TableCell className="font-mono">padding</TableCell>
                    <TableCell className="font-mono">SectionPadding</TableCell>
                    <TableCell className="font-mono">
                      &apos;page-section&apos;
                    </TableCell>
                    <TableCell>패딩 프리셋</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">background</TableCell>
                    <TableCell className="font-mono">
                      &apos;white&apos; | &apos;gray&apos; | &apos;primary&apos;
                      | &apos;transparent&apos;
                    </TableCell>
                    <TableCell className="font-mono">
                      &apos;transparent&apos;
                    </TableCell>
                    <TableCell>배경색</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">as</TableCell>
                    <TableCell className="font-mono">
                      &apos;section&apos; | &apos;div&apos; | &apos;header&apos;
                      | &apos;main&apos; | ...
                    </TableCell>
                    <TableCell className="font-mono">
                      &apos;section&apos;
                    </TableCell>
                    <TableCell>렌더링할 HTML 요소</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">className</TableCell>
                    <TableCell className="font-mono">string</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">children</TableCell>
                    <TableCell className="font-mono">ReactNode</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>자식 요소</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Padding Presets" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>값</TableHead>
                    <TableHead>패딩</TableHead>
                    <TableHead>용도</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">page-section</TableCell>
                    <TableCell>반응형 (모바일/PC)</TableCell>
                    <TableCell>메인 페이지 섹션</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">content-area</TableCell>
                    <TableCell>반응형 (모바일/PC)</TableCell>
                    <TableCell>일반 콘텐츠 영역</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">card-large</TableCell>
                    <TableCell>반응형 (24px/40px)</TableCell>
                    <TableCell>큰 카드</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">card-medium</TableCell>
                    <TableCell>반응형 (24px/32px)</TableCell>
                    <TableCell>중간 카드</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">card-small</TableCell>
                    <TableCell>반응형 (20px/24px)</TableCell>
                    <TableCell>작은 카드</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </SectionComponent>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Modal', href: '/components/modal' }}
        next={{
          title: 'Section Heading System',
          href: '/components/section-heading-system',
        }}
      />
    </>
  );
}
