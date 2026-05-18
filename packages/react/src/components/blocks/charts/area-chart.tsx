'use client';

import * as React from 'react';
import { Group } from '@visx/group';
import { AreaClosed, LinePath } from '@visx/shape';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { scalePoint, scaleLinear } from '@visx/scale';
import { ParentSize } from '@visx/responsive';
import { curveLinear, curveMonotoneX } from '@visx/curve';
import { cn } from '@/lib/utils';
import type { BaseChartProps, ChartDatum } from './chart-types';
import {
  CHART_COLORS,
  ChartContainer,
  formatNumber,
  pickColor,
} from './chart-utils';

export interface AreaChartProps extends BaseChartProps {
  /** 곡선 형태 (기본 monotone) */
  curve?: 'linear' | 'monotone';
  /** 영역 투명도 0~1 (기본 0.2) */
  fillOpacity?: number;
}

const DEFAULT_MARGIN = { top: 16, right: 16, bottom: 40, left: 48 };

const curveMap = {
  linear: curveLinear,
  monotone: curveMonotoneX,
} as const;

interface InnerProps
  extends Omit<
    AreaChartProps,
    'width' | 'height' | 'className' | 'showTableToggle'
  > {
  width: number;
  height: number;
}

function AreaChartInner({
  data,
  width,
  height,
  title,
  description,
  ariaLabel,
  unit,
  colors = CHART_COLORS as readonly string[] as string[],
  margin = DEFAULT_MARGIN,
  curve = 'monotone',
  fillOpacity = 0.2,
}: InnerProps) {
  const xMax = Math.max(0, width - margin.left - margin.right);
  const yMax = Math.max(0, height - margin.top - margin.bottom);
  const maxValue = Math.max(...data.map((d) => d.value), 0);

  const xScale = scalePoint<string>({
    domain: data.map((d) => d.label),
    range: [0, xMax],
    padding: 0.5,
  });

  const yScale = scaleLinear<number>({
    domain: [0, maxValue],
    range: [yMax, 0],
    nice: true,
  });

  const lineColor = pickColor(0, undefined, colors);

  return (
    <svg
      width={width}
      height={height}
      role="img"
      aria-label={ariaLabel ?? title ?? '영역 차트'}
      className="bg-white"
    >
      {title && <title>{title}</title>}
      {description && <desc>{description}</desc>}
      <Group left={margin.left} top={margin.top}>
        <AreaClosed<ChartDatum>
          data={data}
          x={(d) => xScale(d.label) ?? 0}
          y={(d) => yScale(d.value)}
          yScale={yScale}
          fill={lineColor}
          fillOpacity={fillOpacity}
          stroke="transparent"
          curve={curveMap[curve]}
        />
        <LinePath<ChartDatum>
          data={data}
          x={(d) => xScale(d.label) ?? 0}
          y={(d) => yScale(d.value)}
          stroke={lineColor}
          strokeWidth={2}
          curve={curveMap[curve]}
        />
        <g role="list">
          {data.map((d) => (
            <g
              key={d.label}
              role="listitem"
              aria-label={`${d.label}: ${formatNumber(d.value)}${unit ?? ''}`}
            >
              <circle
                cx={xScale(d.label) ?? 0}
                cy={yScale(d.value)}
                r={3}
                fill={lineColor}
              />
            </g>
          ))}
        </g>
        <AxisLeft
          scale={yScale}
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
          scale={xScale}
          stroke="var(--krds-gray-30)"
          tickStroke="var(--krds-gray-30)"
          tickLabelProps={{
            fill: 'var(--krds-gray-70)',
            fontSize: 11,
            textAnchor: 'middle',
          }}
        />
      </Group>
    </svg>
  );
}

/**
 * AreaChart — Visx 기반 영역 차트
 *
 * - 선 차트 + 영역 채움 조합
 * - `curve`로 곡선 종류 (기본 monotone), `fillOpacity`로 영역 투명도
 */
export function AreaChart({
  width,
  height = 240,
  className,
  showTableToggle = false,
  data,
  title,
  unit,
  ...rest
}: AreaChartProps) {
  const chart = (w: number, h: number) => (
    <AreaChartInner
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
