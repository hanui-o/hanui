'use client';

import * as React from 'react';
import { Group } from '@visx/group';
import { Pie } from '@visx/shape';
import { Text } from '@visx/text';
import { ParentSize } from '@visx/responsive';
import { cn } from '@/lib/utils';
import type { BaseChartProps, ChartDatum } from './chart-types';
import {
  CHART_COLORS,
  ChartContainer,
  formatNumber,
  pickColor,
} from './chart-utils';

export interface PieChartProps extends Omit<BaseChartProps, 'margin'> {
  /** 안쪽 반지름 (0이면 파이, >0이면 도넛). 기본 0 */
  innerRadius?: number;
  /** 슬라이스 간 각도 (기본 0.01) */
  padAngle?: number;
  /** 슬라이스 위에 라벨 표시 (기본 true) */
  showLabels?: boolean;
}

interface InnerProps
  extends Omit<
    PieChartProps,
    'width' | 'height' | 'className' | 'showTableToggle'
  > {
  width: number;
  height: number;
}

function PieChartInner({
  data,
  width,
  height,
  title,
  description,
  ariaLabel,
  unit,
  colors = CHART_COLORS as readonly string[] as string[],
  innerRadius = 0,
  padAngle = 0.01,
  showLabels = true,
}: InnerProps) {
  const radius = Math.min(width, height) / 2;
  const centerX = width / 2;
  const centerY = height / 2;
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <svg
      width={width}
      height={height}
      role="img"
      aria-label={ariaLabel ?? title ?? '파이 차트'}
      className="bg-white"
    >
      {title && <title>{title}</title>}
      {description && <desc>{description}</desc>}
      <Group top={centerY} left={centerX} role="list">
        <Pie<ChartDatum>
          data={data}
          pieValue={(d) => d.value}
          outerRadius={radius - 4}
          innerRadius={innerRadius}
          padAngle={padAngle}
        >
          {(pie) =>
            pie.arcs.map((arc, i) => {
              const [labelX, labelY] = pie.path.centroid(arc);
              const fill = pickColor(i, arc.data.color, colors);
              const percent = total > 0 ? (arc.data.value / total) * 100 : 0;
              const arcPath = pie.path(arc) ?? undefined;
              return (
                <g
                  key={arc.data.label}
                  role="listitem"
                  aria-label={`${arc.data.label}: ${formatNumber(arc.data.value)}${unit ?? ''} (${percent.toFixed(1)}%)`}
                >
                  <path d={arcPath} fill={fill} />
                  {showLabels && percent >= 5 && (
                    <Text
                      x={labelX}
                      y={labelY}
                      textAnchor="middle"
                      verticalAnchor="middle"
                      fill="var(--krds-white, #ffffff)"
                      fontSize={11}
                      fontWeight={600}
                    >
                      {`${percent.toFixed(0)}%`}
                    </Text>
                  )}
                </g>
              );
            })
          }
        </Pie>
      </Group>
    </svg>
  );
}

/**
 * PieChart — Visx 기반 파이 차트
 *
 * - `innerRadius > 0`이면 도넛으로 표시 (또는 `DonutChart` alias 사용)
 * - 슬라이스 5% 이상이면 퍼센트 라벨 자동 노출 (`showLabels=true`일 때)
 */
export function PieChart({
  width,
  height = 240,
  className,
  showTableToggle = false,
  data,
  title,
  unit,
  ...rest
}: PieChartProps) {
  const chart = (w: number, h: number) => (
    <PieChartInner
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

/**
 * DonutChart — PieChart의 도넛형 별칭 (`innerRadius` 기본값 부여).
 *
 * `innerRadius`를 명시적으로 넘기면 그대로 사용.
 */
export function DonutChart({ innerRadius = 60, ...props }: PieChartProps) {
  return <PieChart {...props} innerRadius={innerRadius} />;
}
