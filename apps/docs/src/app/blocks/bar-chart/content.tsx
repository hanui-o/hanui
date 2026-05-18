'use client';

import { PageSection as Section, Heading } from '@/components/content';
import { Installation } from '@/components/content/Installation';
import { FrameworkCodeBlock } from '@/components/content/FrameworkCodeBlock';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import {
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
} from '@hanui/react';
import { BarChart, type ChartDatum } from '@hanui/react/charts';

const sampleData: ChartDatum[] = [
  { label: '서울', value: 1000 },
  { label: '부산', value: 800 },
  { label: '대구', value: 600 },
  { label: '인천', value: 500 },
  { label: '광주', value: 400 },
];

const verticalCode = `import { BarChart, type ChartDatum } from '@hanui/react/charts';

const data: ChartDatum[] = [
  { label: '서울', value: 1000 },
  { label: '부산', value: 800 },
  { label: '대구', value: 600 },
];

<BarChart
  data={data}
  title="도시별 수치"
  unit="명"
  height={260}
/>`;

const horizontalCode = `<BarChart
  data={data}
  orientation="horizontal"
  title="도시별 수치 (가로)"
  unit="명"
  height={280}
/>`;

export default function BarChartPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Bar Chart"
        description="Visx 기반 바 차트. 수직·수평 방향, KRDS 색상 토큰, 반응형, 접근성 대체 테이블 지원."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Section level="h2">
            <Heading level="h2" id="vertical" title="수직 (기본)" />
            <ComponentPreview>
              <div className="w-full p-6">
                <BarChart
                  data={sampleData}
                  title="도시별 수치"
                  unit="명"
                  height={260}
                  showTableToggle
                />
              </div>
            </ComponentPreview>
            <FrameworkCodeBlock reactCode={verticalCode} />
          </Section>

          <Section level="h2">
            <Heading level="h2" id="horizontal" title="수평" />
            <ComponentPreview>
              <div className="w-full p-6">
                <BarChart
                  data={sampleData}
                  orientation="horizontal"
                  title="도시별 수치 (가로)"
                  unit="명"
                  height={280}
                />
              </div>
            </ComponentPreview>
            <FrameworkCodeBlock reactCode={horizontalCode} />
          </Section>

          <Installation componentName="bar-chart" />
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="props" title="Props" />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Prop</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Default</TableHead>
                  <TableHead>설명</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Code>data</Code>
                  </TableCell>
                  <TableCell>
                    <Code>ChartDatum[]</Code>
                  </TableCell>
                  <TableCell>—</TableCell>
                  <TableCell>
                    차트 데이터 (필수). 각 항목은 label과 value를 가짐.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>orientation</Code>
                  </TableCell>
                  <TableCell>
                    <Code>{"'vertical' | 'horizontal'"}</Code>
                  </TableCell>
                  <TableCell>
                    <Code>{"'vertical'"}</Code>
                  </TableCell>
                  <TableCell>막대 방향.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>padding</Code>
                  </TableCell>
                  <TableCell>
                    <Code>number</Code>
                  </TableCell>
                  <TableCell>
                    <Code>0.3</Code>
                  </TableCell>
                  <TableCell>막대 간격 (0~1).</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>height</Code>
                  </TableCell>
                  <TableCell>
                    <Code>number</Code>
                  </TableCell>
                  <TableCell>
                    <Code>240</Code>
                  </TableCell>
                  <TableCell>세로 픽셀.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>width</Code>
                  </TableCell>
                  <TableCell>
                    <Code>number</Code>
                  </TableCell>
                  <TableCell>—</TableCell>
                  <TableCell>
                    가로 픽셀. 미지정 시 부모 너비에 자동 맞춤.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>colors</Code>
                  </TableCell>
                  <TableCell>
                    <Code>string[]</Code>
                  </TableCell>
                  <TableCell>KRDS 토큰 6색</TableCell>
                  <TableCell>막대 색상 배열. 데이터별로 순환 적용.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>title</Code>
                  </TableCell>
                  <TableCell>
                    <Code>string</Code>
                  </TableCell>
                  <TableCell>—</TableCell>
                  <TableCell>SVG title. 스크린 리더가 읽음.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>unit</Code>
                  </TableCell>
                  <TableCell>
                    <Code>string</Code>
                  </TableCell>
                  <TableCell>—</TableCell>
                  <TableCell>
                    값 단위 (예: 명, %). aria-label과 테이블에 함께 표시.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>showTableToggle</Code>
                  </TableCell>
                  <TableCell>
                    <Code>boolean</Code>
                  </TableCell>
                  <TableCell>
                    <Code>false</Code>
                  </TableCell>
                  <TableCell>차트 ↔ 데이터 표 토글 버튼 노출.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Section>
        </TabsContent>
      </Tabs>
    </>
  );
}
