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
import { PieChart, DonutChart, type ChartDatum } from '@hanui/react/charts';

const sampleData: ChartDatum[] = [
  { label: '모바일', value: 540 },
  { label: '데스크톱', value: 320 },
  { label: '태블릿', value: 140 },
];

const pieCode = `import { PieChart, type ChartDatum } from '@hanui/react/charts';

const data: ChartDatum[] = [
  { label: '모바일', value: 540 },
  { label: '데스크톱', value: 320 },
  { label: '태블릿', value: 140 },
];

<PieChart data={data} title="기기 비율" unit="명" height={260} />`;

const donutCode = `import { DonutChart } from '@hanui/react/charts';

<DonutChart data={data} innerRadius={60} title="기기 비율 (도넛)" />`;

export default function PieChartPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Pie Chart"
        description="Visx 기반 파이/도넛 차트. innerRadius로 도넛 전환, 슬라이스 라벨 자동."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Section level="h2">
            <Heading level="h2" id="pie" title="파이" />
            <ComponentPreview>
              <div className="w-full p-6 flex justify-center">
                <PieChart
                  data={sampleData}
                  title="기기 비율"
                  unit="명"
                  height={260}
                  width={260}
                  showTableToggle
                />
              </div>
            </ComponentPreview>
            <FrameworkCodeBlock reactCode={pieCode} />
          </Section>

          <Section level="h2">
            <Heading level="h2" id="donut" title="도넛 (DonutChart)" />
            <ComponentPreview>
              <div className="w-full p-6 flex justify-center">
                <DonutChart
                  data={sampleData}
                  title="기기 비율 (도넛)"
                  unit="명"
                  height={260}
                  width={260}
                />
              </div>
            </ComponentPreview>
            <FrameworkCodeBlock reactCode={donutCode} />
          </Section>

          <Installation componentName="pie-chart" />
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
                    <Code>innerRadius</Code>
                  </TableCell>
                  <TableCell>
                    <Code>number</Code>
                  </TableCell>
                  <TableCell>
                    <Code>0</Code> (Pie) / <Code>60</Code> (Donut)
                  </TableCell>
                  <TableCell>안쪽 반지름. 0 초과면 도넛.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>padAngle</Code>
                  </TableCell>
                  <TableCell>
                    <Code>number</Code>
                  </TableCell>
                  <TableCell>
                    <Code>0.01</Code>
                  </TableCell>
                  <TableCell>슬라이스 간 각도 (라디안).</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>showLabels</Code>
                  </TableCell>
                  <TableCell>
                    <Code>boolean</Code>
                  </TableCell>
                  <TableCell>
                    <Code>true</Code>
                  </TableCell>
                  <TableCell>
                    슬라이스가 5% 이상이면 퍼센트 라벨 노출.
                  </TableCell>
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
                  <TableCell>크기. 정사각형 권장.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>colors</Code>
                  </TableCell>
                  <TableCell>
                    <Code>string[]</Code>
                  </TableCell>
                  <TableCell>KRDS 토큰 6색</TableCell>
                  <TableCell>슬라이스별 색상 배열.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Section>
        </TabsContent>
      </Tabs>
    </>
  );
}
