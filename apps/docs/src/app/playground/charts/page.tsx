'use client';

import { scaleBand, scaleLinear } from '@visx/scale';
import { Group } from '@visx/group';

const data = [
  { name: '서울', value: 1000 },
  { name: '부산', value: 800 },
  { name: '대구', value: 600 },
  { name: '인천', value: 500 },
  { name: '광주', value: 400 },
];

// 전체 SVG 크기
const width = 500;
const height = 300;

// 여백 (축 라벨 공간 확보)
const margin = { top: 20, right: 20, bottom: 40, left: 50 };

// 차트 본체 영역 (여백 빼고 남는 공간)
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

const xScale = scaleBand({
  domain: data.map((d) => d.name),
  range: [0, xMax],
  padding: 0.3,
});

const yScale = scaleLinear({
  domain: [0, Math.max(...data.map((d) => d.value))],
  range: [yMax, 0],
});

export default function ChartsPlayground() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Visx 학습 Playground</h1>
      <p className="text-sm text-krds-gray-60 mb-8">
        5단계: Margin convention + Group
      </p>

      <svg
        width={width}
        height={height}
        role="img"
        aria-label="도시별 수치 현황 바 차트"
        className="border border-krds-gray-20 bg-white"
      >
        <title>도시별 수치 현황</title>
        <Group left={margin.left} top={margin.top}>
          {data.map((d) => {
            const x = xScale(d.name) ?? 0;
            const barY = yScale(d.value);
            const barWidth = xScale.bandwidth();
            const barHeight = yMax - barY;

            return (
              <g
                key={d.name}
                role="listitem"
                aria-label={`${d.name}: ${d.value}`}
              >
                <rect
                  x={x}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  className="fill-krds-primary-60"
                />
                <text
                  x={x + barWidth / 2}
                  y={yMax + 15}
                  textAnchor="middle"
                  fontSize="12"
                  className="fill-krds-gray-70"
                >
                  {d.name}
                </text>
              </g>
            );
          })}
        </Group>
      </svg>
    </div>
  );
}
