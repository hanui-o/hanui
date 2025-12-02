'use client';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';

// UI components - from @hanui/react
import {
  Grid,
  GridItem,
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
import { ComponentPreview } from '@/components/content/ComponentPreview';

export default function GridPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Grid"
        description="CSS Grid 레이아웃을 구성하는 컴포넌트"
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview">
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />
            <ComponentPreview>
              <Grid templateColumns="repeat(5, 1fr)" gap="4">
                <GridItem
                  colSpan={2}
                  className="h-10 bg-krds-primary-50 text-white flex items-center justify-center rounded"
                >
                  Col Span 2
                </GridItem>
                <GridItem
                  colStart={4}
                  colEnd={6}
                  className="h-10 bg-krds-success-50 text-white flex items-center justify-center rounded"
                >
                  Col Start 4 End 6
                </GridItem>
                <GridItem
                  colSpan={5}
                  className="h-10 bg-krds-danger-50 text-white flex items-center justify-center rounded"
                >
                  Col Span 5
                </GridItem>
              </Grid>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<Grid templateColumns="repeat(5, 1fr)" gap="4">
  <GridItem colSpan={2}>Col Span 2</GridItem>
  <GridItem colStart={4} colEnd={6}>Col Start 4 End 6</GridItem>
  <GridItem colSpan={5}>Col Span 5</GridItem>
</Grid>`}
            </Code>
          </Section>

          <Section level="h2">
            <Installation componentName="grid" />
          </Section>

          <Section level="h2">
            <Heading
              level="h2"
              id="usage"
              title="사용법"
              description="Grid와 GridItem을 import하여 사용합니다."
            />
            <Code variant="block" language="tsx">
              {`import { Grid, GridItem } from '@/components/hanui'

<Grid templateColumns="repeat(3, 1fr)" gap="6">
  <GridItem className="bg-krds-primary-10 h-10" />
  <GridItem className="bg-krds-primary-10 h-10" />
  <GridItem className="bg-krds-primary-10 h-10" />
</Grid>`}
            </Code>
          </Section>

          {/* 예제 섹션 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Template Columns"
                description="templateColumns로 그리드 컬럼 템플릿을 정의합니다."
              />
              <ComponentPreview>
                <Grid templateColumns="repeat(3, 1fr)" gap="6">
                  <div className="w-full h-10 bg-krds-primary-10 rounded"></div>
                  <div className="w-full h-10 bg-krds-primary-10 rounded"></div>
                  <div className="w-full h-10 bg-krds-primary-10 rounded"></div>
                  <div className="w-full h-10 bg-krds-primary-10 rounded"></div>
                  <div className="w-full h-10 bg-krds-primary-10 rounded"></div>
                </Grid>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Grid templateColumns="repeat(3, 1fr)" gap="6">
  <div className="h-10 bg-krds-primary-10" />
  <div className="h-10 bg-krds-primary-10" />
  <div className="h-10 bg-krds-primary-10" />
  <div className="h-10 bg-krds-primary-10" />
  <div className="h-10 bg-krds-primary-10" />
</Grid>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Spanning Columns"
                description="colSpan, rowSpan으로 여러 셀에 걸친 아이템을 만들 수 있습니다."
              />
              <ComponentPreview>
                <Grid
                  templateRows="repeat(2, 1fr)"
                  templateColumns="repeat(5, 1fr)"
                  gap="4"
                >
                  <GridItem
                    rowSpan={2}
                    colSpan={1}
                    className="bg-krds-primary-60 text-white p-2 rounded flex items-center justify-center"
                  >
                    Row Span 2
                  </GridItem>
                  <GridItem
                    colSpan={2}
                    className="bg-krds-warning-50 text-white p-2 rounded flex items-center justify-center"
                  >
                    Col Span 2
                  </GridItem>
                  <GridItem
                    colSpan={2}
                    className="bg-krds-warning-50 text-white p-2 rounded flex items-center justify-center"
                  >
                    Col Span 2
                  </GridItem>
                  <GridItem
                    colSpan={4}
                    className="bg-krds-info-50 text-white p-2 rounded flex items-center justify-center"
                  >
                    Col Span 4
                  </GridItem>
                </Grid>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Grid
  templateRows="repeat(2, 1fr)"
  templateColumns="repeat(5, 1fr)"
  gap="4"
>
  <GridItem rowSpan={2} colSpan={1}>Row Span 2</GridItem>
  <GridItem colSpan={2}>Col Span 2</GridItem>
  <GridItem colSpan={2}>Col Span 2</GridItem>
  <GridItem colSpan={4}>Col Span 4</GridItem>
</Grid>`}
              </Code>
            </Subsection>
          </Section>

          {/* 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="WCAG 2.1 / KWCAG 2.2 AA 기준을 준수합니다."
            />
            <List variant="check" className="text-krds-gray-90">
              <ListItem>
                <strong>시맨틱 마크업:</strong> Grid는 의미론적으로 중립적인{' '}
                <Code>&lt;div&gt;</Code> 요소를 사용합니다. 필요시 적절한 시맨틱
                태그나 ARIA 역할을 추가하세요
              </ListItem>
              <ListItem>
                <strong>키보드 네비게이션:</strong> Grid 내부 요소들의 Tab
                순서가 시각적 배치와 일치하도록 구성
              </ListItem>
              <ListItem>
                <strong>반응형 레이아웃:</strong> 다양한 화면 크기에서 그리드가
                적절히 재배치되어 모든 사용자가 콘텐츠에 접근 가능
              </ListItem>
              <ListItem>
                <strong>복잡한 레이아웃:</strong> 복잡한 그리드 구조의 경우
                논리적인 읽기 순서를 유지하도록 주의
              </ListItem>
            </List>
          </Section>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="Grid Props" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>templateColumns</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>grid-template-columns 속성</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>templateRows</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>grid-template-rows 속성</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>gap</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string | number</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>그리드 아이템 간격</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>autoFlow</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>grid-auto-flow 속성</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>autoColumns</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>grid-auto-columns 속성</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>autoRows</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>grid-auto-rows 속성</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="GridItem Props" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>colSpan</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number | 'auto'</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>차지할 컬럼 수</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>rowSpan</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number | 'auto'</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>차지할 행 수</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>colStart</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number | 'auto'</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>시작 컬럼 라인</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>colEnd</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number | 'auto'</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>끝 컬럼 라인</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Footer', href: '/components/footer' }}
        next={{ title: 'Header', href: '/components/header' }}
      />
    </>
  );
}
