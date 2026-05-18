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
import { AreaChart, type ChartDatum } from '@hanui/react/charts';

const sampleData: ChartDatum[] = [
  { label: 'Q1', value: 1200 },
  { label: 'Q2', value: 1800 },
  { label: 'Q3', value: 1600 },
  { label: 'Q4', value: 2200 },
];

const basicCode = `import { AreaChart, type ChartDatum } from '@hanui/react/charts';

const data: ChartDatum[] = [
  { label: 'Q1', value: 1200 },
  { label: 'Q2', value: 1800 },
];

<AreaChart data={data} title="분기별 매출" unit="만원" height={260} />`;

const opacityCode = `<AreaChart data={data} fillOpacity={0.4} curve="linear" />`;

export default function AreaChartPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Area Chart"
        description="Visx 기반 영역 차트. 선과 영역 채움으로 누적 수치·면적 비교에 적합."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Section level="h2">
            <Heading level="h2" id="basic" title="기본 (monotone)" />
            <ComponentPreview>
              <div className="w-full p-6">
                <AreaChart
                  data={sampleData}
                  title="분기별 매출"
                  unit="만원"
                  height={260}
                  showTableToggle
                />
              </div>
            </ComponentPreview>
            <FrameworkCodeBlock reactCode={basicCode} />
          </Section>

          <Section level="h2">
            <Heading level="h2" id="opacity" title="진한 영역 (linear)" />
            <ComponentPreview>
              <div className="w-full p-6">
                <AreaChart
                  data={sampleData}
                  curve="linear"
                  fillOpacity={0.4}
                  title="분기별 매출 (진한 영역)"
                  unit="만원"
                  height={260}
                />
              </div>
            </ComponentPreview>
            <FrameworkCodeBlock reactCode={opacityCode} />
          </Section>

          <Installation componentName="area-chart" />
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
                  <TableCell>차트 데이터 (필수).</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>curve</Code>
                  </TableCell>
                  <TableCell>
                    <Code>{"'linear' | 'monotone'"}</Code>
                  </TableCell>
                  <TableCell>
                    <Code>{"'monotone'"}</Code>
                  </TableCell>
                  <TableCell>곡선 종류.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>fillOpacity</Code>
                  </TableCell>
                  <TableCell>
                    <Code>number</Code>
                  </TableCell>
                  <TableCell>
                    <Code>0.2</Code>
                  </TableCell>
                  <TableCell>영역 투명도 (0~1).</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>height / width</Code>
                  </TableCell>
                  <TableCell>
                    <Code>number</Code>
                  </TableCell>
                  <TableCell>
                    <Code>240</Code> / auto
                  </TableCell>
                  <TableCell>크기. width 미지정 시 부모 너비.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>colors</Code>
                  </TableCell>
                  <TableCell>
                    <Code>string[]</Code>
                  </TableCell>
                  <TableCell>KRDS 토큰 6색</TableCell>
                  <TableCell>첫 색이 선·영역 색상.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Section>
        </TabsContent>
      </Tabs>
    </>
  );
}
