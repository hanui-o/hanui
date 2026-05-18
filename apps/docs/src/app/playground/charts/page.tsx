'use client';

import {
  BarChart,
  LineChart,
  AreaChart,
  PieChart,
  DonutChart,
  type ChartDatum,
} from '@hanui/react/charts';

const cityData: ChartDatum[] = [
  { label: '서울', value: 1000 },
  { label: '부산', value: 800 },
  { label: '대구', value: 600 },
  { label: '인천', value: 500 },
  { label: '광주', value: 400 },
];

const monthData: ChartDatum[] = [
  { label: '1월', value: 120 },
  { label: '2월', value: 180 },
  { label: '3월', value: 150 },
  { label: '4월', value: 220 },
  { label: '5월', value: 280 },
  { label: '6월', value: 240 },
];

const deviceData: ChartDatum[] = [
  { label: '모바일', value: 540 },
  { label: '데스크톱', value: 320 },
  { label: '태블릿', value: 140 },
];

export default function ChartsPlayground() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12">
      <header>
        <h1 className="text-2xl font-bold mb-2">Visx Charts Gallery</h1>
        <p className="text-sm text-krds-gray-60">
          hanui의 Visx 기반 차트 4종을 한 화면에 모았어요. 자세한 사용법은 각
          차트의 데모 페이지를 참고하세요.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Bar Chart — 수직</h2>
        <div className="rounded-lg border border-krds-gray-20 bg-white p-6">
          <BarChart
            data={cityData}
            title="도시별 수치"
            unit="명"
            height={260}
          />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Bar Chart — 수평</h2>
        <div className="rounded-lg border border-krds-gray-20 bg-white p-6">
          <BarChart
            data={cityData}
            orientation="horizontal"
            title="도시별 수치 (가로)"
            unit="명"
            height={280}
          />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Line Chart</h2>
        <div className="rounded-lg border border-krds-gray-20 bg-white p-6">
          <LineChart
            data={monthData}
            curve="monotone"
            title="월별 추이"
            unit="건"
            height={260}
          />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Area Chart</h2>
        <div className="rounded-lg border border-krds-gray-20 bg-white p-6">
          <AreaChart
            data={monthData}
            title="월별 누적"
            unit="건"
            height={260}
          />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Pie Chart</h2>
          <div className="rounded-lg border border-krds-gray-20 bg-white p-6 flex justify-center">
            <PieChart
              data={deviceData}
              title="기기 비율"
              unit="명"
              width={260}
              height={260}
            />
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Donut Chart</h2>
          <div className="rounded-lg border border-krds-gray-20 bg-white p-6 flex justify-center">
            <DonutChart
              data={deviceData}
              title="기기 비율 (도넛)"
              unit="명"
              width={260}
              height={260}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
