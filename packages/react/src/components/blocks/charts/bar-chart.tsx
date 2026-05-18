'use client';

import * as React from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { scaleBand, scaleLinear } from '@visx/scale';
import { ParentSize } from '@visx/responsive';
import { cn } from '@/lib/utils';
import type { BaseChartProps } from './chart-types';
import {
  CHART_COLORS,
  ChartContainer,
  formatNumber,
  pickColor,
} from './chart-utils';

export interface BarChartProps extends BaseChartProps {
  /** 막대 방향 (기본 vertical) */
  orientation?: 'vertical' | 'horizontal';
  /** 막대 간격 (0~1, 기본 0.3) */
  padding?: number;
}

const DEFAULT_MARGIN = { top: 16, right: 16, bottom: 40, left: 48 };

interface InnerProps
  extends Omit<
    BarChartProps,
    'width' | 'height' | 'className' | 'showTableToggle'
  > {
  width: number;
  height: number;
}

function BarChartInner({
  data,
  width,
  height,
  title,
  description,
  ariaLabel,
  unit,
  colors = CHART_COLORS as readonly string[] as string[],
  margin = DEFAULT_MARGIN,
  orientation = 'vertical',
  padding = 0.3,
}: InnerProps) {
  const xMax = Math.max(0, width - margin.left - margin.right);
  const yMax = Math.max(0, height - margin.top - margin.bottom);
  const maxValue = Math.max(...data.map((d) => d.value), 0);

  const labelScale = scaleBand<string>({
    domain: data.map((d) => d.label),
    range: orientation === 'vertical' ? [0, xMax] : [0, yMax],
    padding,
  });

  const valueScale = scaleLinear<number>({
    domain: [0, maxValue],
    range: orientation === 'vertical' ? [yMax, 0] : [0, xMax],
    nice: true,
  });

  return (
    <svg
      width={width}
      height={height}
      role="img"
      aria-label={ariaLabel ?? title ?? '바 차트'}
      className="bg-white"
    >
      {title && <title>{title}</title>}
      {description && <desc>{description}</desc>}
      <Group left={margin.left} top={margin.top}>
        <g role="list">
          {data.map((d, i) => {
            const fill = pickColor(i, d.color, colors);
            const a11yLabel = `${d.label}: ${formatNumber(d.value)}${unit ?? ''}`;
            if (orientation === 'vertical') {
              const barX = labelScale(d.label) ?? 0;
              const barY = valueScale(d.value);
              const barWidth = labelScale.bandwidth();
              const barHeight = yMax - barY;
              return (
                <g key={d.label} role="listitem" aria-label={a11yLabel}>
                  <Bar
                    x={barX}
                    y={barY}
                    width={barWidth}
                    height={barHeight}
                    fill={fill}
                    rx={2}
                  />
                </g>
              );
            }
            const barY = labelScale(d.label) ?? 0;
            const barWidth = valueScale(d.value);
            const barHeight = labelScale.bandwidth();
            return (
              <g key={d.label} role="listitem" aria-label={a11yLabel}>
                <Bar
                  x={0}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill={fill}
                  rx={2}
                />
              </g>
            );
          })}
        </g>
        {orientation === 'vertical' ? (
          <>
            <AxisLeft
              scale={valueScale}
              numTicks={5}
              stroke="var(--krds-gray-30)"
              tickStroke="var(--krds-gray-30)"
              tickLabelProps={{
                fill: 'var(--krds-gray-70)',
                fontSize: 11,
                textAnchor: 'end',
                dx: '-0.25em',
                dy: '0.25em',
              }}
              tickFormat={(v) => formatNumber(Number(v))}
            />
            <AxisBottom
              top={yMax}
              scale={labelScale}
              stroke="var(--krds-gray-30)"
              tickStroke="var(--krds-gray-30)"
              tickLabelProps={{
                fill: 'var(--krds-gray-70)',
                fontSize: 11,
                textAnchor: 'middle',
              }}
            />
          </>
        ) : (
          <>
            <AxisLeft
              scale={labelScale}
              stroke="var(--krds-gray-30)"
              tickStroke="var(--krds-gray-30)"
              tickLabelProps={{
                fill: 'var(--krds-gray-70)',
                fontSize: 11,
                textAnchor: 'end',
                dx: '-0.25em',
                dy: '0.25em',
              }}
            />
            <AxisBottom
              top={yMax}
              scale={valueScale}
              numTicks={5}
              stroke="var(--krds-gray-30)"
              tickStroke="var(--krds-gray-30)"
              tickLabelProps={{
                fill: 'var(--krds-gray-70)',
                fontSize: 11,
                textAnchor: 'middle',
              }}
              tickFormat={(v) => formatNumber(Number(v))}
            />
          </>
        )}
      </Group>
    </svg>
  );
}

/**
 * BarChart — Visx 기반 바 차트 (수직·수평)
 *
 * - `orientation`으로 방향 전환
 * - `width`/`height` 미지정 시 부모 너비에 맞춰 반응형 (height 기본 240)
 * - 색상은 `colors` 배열 또는 데이터별 `color` 필드로 지정 (미지정 시 KRDS 토큰 자동)
 * - `showTableToggle`로 대체 데이터 테이블 토글 노출
 */
export function BarChart({
  width,
  height = 240,
  className,
  showTableToggle = false,
  data,
  title,
  unit,
  ...rest
}: BarChartProps) {
  const chart = (w: number, h: number) => (
    <BarChartInner
      width={w}
      height={h}
      data={data}
      title={title}
      unit={unit}
      {...rest}
    />
  );

  return (
    <ChartContainer
      data={data}
      title={title}
      unit={unit}
      showTableToggle={showTableToggle}
      className={cn('w-full', className)}
    >
      {width !== undefined ? (
        chart(width, height)
      ) : (
        <ParentSize>{({ width: w }) => chart(w, height)}</ParentSize>
      )}
    </ChartContainer>
  );
}
