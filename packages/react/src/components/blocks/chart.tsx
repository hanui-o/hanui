'use client';

// ============================================================================
// Types
// ============================================================================

import * as React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
} from '../card';
import { Body } from '../body';
import { cn } from '@/lib/utils';

export interface ChartDataPoint {
  /** X축 라벨 */
  label: string;
  /** Y축 값 */
  value: number;
}

export interface ChartProps {
  /** 차트 데이터 */
  data: ChartDataPoint[];
  /** 차트 제목 */
  title?: string;
  /** 차트 설명 */
  description?: string;
  /** 차트 유형 */
  type?: 'bar' | 'line' | 'area';
  /** Y축 단위 (예: '명', '건', '%') */
  unit?: string;
  /** 차트 높이 (px) */
  height?: number;
  /** 바/포인트 색상 */
  color?: string;
  /** 추가 className */
  className?: string;
}

// ============================================================================
// Helpers
// ============================================================================

function formatValue(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toLocaleString();
}

function getYAxisTicks(max: number): number[] {
  if (max === 0) return [0];
  const step = Math.ceil(max / 4);
  const roundedStep =
    step <= 10
      ? step
      : step <= 100
        ? Math.ceil(step / 10) * 10
        : step <= 1000
          ? Math.ceil(step / 100) * 100
          : Math.ceil(step / 1000) * 1000;
  const ticks: number[] = [];
  for (let i = 0; i <= 4; i++) {
    ticks.push(roundedStep * i);
  }
  return ticks;
}

// ============================================================================
// Chart Component
// ============================================================================

export function Chart({
  data,
  title,
  description,
  type = 'bar',
  unit = '',
  height = 240,
  color = 'var(--color-krds-primary-base, #1A56DB)',
  className,
}: ChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const yTicks = getYAxisTicks(maxValue);
  const yMax = yTicks[yTicks.length - 1] || 1;

  const chartContent = (
    <div className="flex gap-2" style={{ height }}>
      {/* Y축 */}
      <div className="flex flex-col justify-between items-end shrink-0 py-1">
        {[...yTicks].reverse().map((tick) => (
          <Body
            key={tick}
            size="xs"
            className="text-krds-gray-50 leading-none whitespace-nowrap"
          >
            {formatValue(tick)}
            {unit}
          </Body>
        ))}
      </div>

      {/* 차트 영역 */}
      <div className="flex-1 relative border-l border-b border-krds-gray-20">
        {/* 그리드 라인 */}
        {yTicks.slice(0, -1).map((tick) => {
          const bottom = (tick / yMax) * 100;
          return (
            <div
              key={tick}
              className="absolute left-0 right-0 border-t border-krds-gray-10"
              style={{ bottom: `${bottom}%` }}
            />
          );
        })}

        {/* 데이터 */}
        <div className="absolute inset-0 flex items-end">
          {type === 'bar' && (
            <div className="flex items-end justify-around w-full h-full px-1 gap-1">
              {data.map((d, i) => {
                const h = (d.value / yMax) * 100;
                return (
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center justify-end h-full"
                  >
                    <div
                      className="w-full max-w-[40px] rounded-t-sm transition-all duration-300 hover:opacity-80"
                      style={{
                        height: `${h}%`,
                        backgroundColor: color,
                        minHeight: d.value > 0 ? 2 : 0,
                      }}
                      title={`${d.label}: ${d.value.toLocaleString()}${unit}`}
                    />
                  </div>
                );
              })}
            </div>
          )}

          {(type === 'line' || type === 'area') && (
            <svg
              viewBox={`0 0 ${data.length * 100} ${height}`}
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              {type === 'area' && (
                <polygon
                  points={`${data.map((d, i) => `${i * (100 / (data.length - 1 || 1)) * data.length},${height - (d.value / yMax) * height}`).join(' ')} ${(data.length - 1) * 100},${height} 0,${height}`}
                  fill={color}
                  opacity="0.1"
                />
              )}
              <polyline
                points={data
                  .map(
                    (d, i) =>
                      `${i * (100 / (data.length - 1 || 1)) * data.length},${height - (d.value / yMax) * height}`
                  )
                  .join(' ')}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {data.map((d, i) => (
                <circle
                  key={i}
                  cx={i * (100 / (data.length - 1 || 1)) * data.length}
                  cy={height - (d.value / yMax) * height}
                  r="4"
                  fill="white"
                  stroke={color}
                  strokeWidth="2"
                >
                  <title>
                    {d.label}: {d.value.toLocaleString()}
                    {unit}
                  </title>
                </circle>
              ))}
            </svg>
          )}
        </div>
      </div>
    </div>
  );

  const xLabels = (
    <div className="flex gap-2 mt-1">
      <div className="shrink-0" style={{ width: 40 }} />
      <div className="flex-1 flex justify-around">
        {data.map((d, i) => (
          <Body
            key={i}
            size="xs"
            className="text-krds-gray-50 text-center truncate"
          >
            {d.label}
          </Body>
        ))}
      </div>
    </div>
  );

  if (!title) {
    return (
      <div className={cn('w-full', className)}>
        {chartContent}
        {xLabels}
      </div>
    );
  }

  return (
    <Card variant="outlined" className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardBody>
        {chartContent}
        {xLabels}
      </CardBody>
    </Card>
  );
}
