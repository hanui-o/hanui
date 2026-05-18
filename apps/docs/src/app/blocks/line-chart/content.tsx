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
import { LineChart, type ChartDatum } from '@hanui/react/charts';

const sampleData: ChartDatum[] = [
  { label: '1월', value: 120 },
  { label: '2월', value: 180 },
  { label: '3월', value: 150 },
  { label: '4월', value: 220 },
  { label: '5월', value: 280 },
  { label: '6월', value: 240 },
];

const linearCode = `import { LineChart, type ChartDatum } from '@hanui/react/charts';

const data: ChartDatum[] = [
  { label: '1월', value: 120 },
  { label: '2월', value: 180 },
  { label: '3월', value: 150 },
];

<LineChart data={data} title="월별 추이" unit="건" height={260} />`;

const monotoneCode = `<LineChart data={data} curve="monotone" height={260} />`;

export default function LineChartPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Line Chart"
        description="Visx 기반 선 차트. 시계열·추이 표현에 적합. linear/monotone/step 곡선 지원."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Section level="h2">
            <Heading level="h2" id="linear" title="기본 (linear)" />
            <ComponentPreview>
              <div className="w-full p-6">
                <LineChart
                  data={sampleData}
                  title="월별 추이"
                  unit="건"
                  height={260}
                  showTableToggle
                />
              </div>
            </ComponentPreview>
            <FrameworkCodeBlock reactCode={linearCode} />
          </Section>

          <Section level="h2">
            <Heading level="h2" id="monotone" title="곡선 (monotone)" />
            <ComponentPreview>
              <div className="w-full p-6">
                <LineChart
                  data={sampleData}
                  curve="monotone"
                  title="월별 추이 (곡선)"
                  unit="건"
                  height={260}
                />
              </div>
            </ComponentPreview>
            <FrameworkCodeBlock reactCode={monotoneCode} />
          </Section>

          <Installation componentName="line-chart" />
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
                    <Code>{"'linear' | 'monotone' | 'step'"}</Code>
                  </TableCell>
                  <TableCell>
                    <Code>{"'linear'"}</Code>
                  </TableCell>
                  <TableCell>선 곡선 종류.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>showDots</Code>
                  </TableCell>
                  <TableCell>
                    <Code>boolean</Code>
                  </TableCell>
                  <TableCell>
                    <Code>true</Code>
                  </TableCell>
                  <TableCell>데이터 포인트(점) 표시 여부.</TableCell>
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
                  <TableCell>
                    첫 색이 선 색상, 점은 각 데이터의 color 또는 colors 배열
                    순환.
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
                  <TableCell>대체 데이터 표 토글.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Section>
        </TabsContent>
      </Tabs>
    </>
  );
}
