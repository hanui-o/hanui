'use client';

import * as React from 'react';
import { Table2, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ChartDatum } from './chart-types';

/**
 * 차트 기본 색상 팔레트 (KRDS 토큰 기반)
 *
 * `colors` prop이 없을 때 fallback. 차트 데이터 항목 수만큼 순환 적용.
 */
export const CHART_COLORS = [
  'var(--krds-primary-base)',
  'var(--krds-info-base)',
  'var(--krds-success-base)',
  'var(--krds-warning-base)',
  'var(--krds-danger-base)',
  'var(--krds-secondary-base)',
] as const;

/**
 * 한국어 로케일 숫자 포매팅
 */
export function formatNumber(value: number, locale = 'ko-KR'): string {
  return value.toLocaleString(locale);
}

/**
 * 축 눈금 자동 생성 (균등 분할)
 */
export function getAxisTicks(max: number, count = 5): number[] {
  if (max <= 0) return [0];
  const step = max / count;
  return Array.from({ length: count + 1 }, (_, i) => Math.round(step * i));
}

/**
 * 인덱스 기준 데이터 색상 선택
 */
export function pickColor(
  index: number,
  datumColor: string | undefined,
  colors: readonly string[]
): string {
  if (datumColor) return datumColor;
  return colors[index % colors.length]!;
}

// ============================================================================
// ChartA11yTable — 차트 대체 데이터 테이블
// ============================================================================

interface ChartA11yTableProps {
  data: ChartDatum[];
  title?: string;
  unit?: string;
}

function ChartA11yTable({ data, title, unit }: ChartA11yTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        {title && <caption className="sr-only">{title} 데이터 표</caption>}
        <thead>
          <tr className="border-b border-krds-gray-20">
            <th
              scope="col"
              className="text-left py-2 px-3 font-medium text-krds-gray-70"
            >
              항목
            </th>
            <th
              scope="col"
              className="text-right py-2 px-3 font-medium text-krds-gray-70"
            >
              값{unit && ` (${unit})`}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((point, index) => (
            <tr
              key={point.label}
              className={cn(
                'border-b border-krds-gray-10',
                index % 2 === 0 ? 'bg-krds-gray-5' : 'bg-white'
              )}
            >
              <td className="py-2 px-3 text-krds-gray-80">{point.label}</td>
              <td className="py-2 px-3 text-right tabular-nums text-krds-gray-90 font-medium">
                {formatNumber(point.value)}
                {unit}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-krds-gray-10">
            <td className="py-2 px-3 font-medium text-krds-gray-80">합계</td>
            <td className="py-2 px-3 text-right tabular-nums font-bold text-krds-gray-90">
              {formatNumber(data.reduce((sum, d) => sum + d.value, 0))}
              {unit}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// ============================================================================
// ChartContainer — 차트 + 테이블 토글 래퍼
// ============================================================================

interface ChartContainerProps {
  data: ChartDatum[];
  title?: string;
  unit?: string;
  showTableToggle?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function ChartContainer({
  data,
  title,
  unit,
  showTableToggle = false,
  className,
  children,
}: ChartContainerProps) {
  const [viewMode, setViewMode] = React.useState<'chart' | 'table'>('chart');

  const toggleView = () => {
    setViewMode((prev) => (prev === 'chart' ? 'table' : 'chart'));
  };

  return (
    <div className={cn('w-full', className)}>
      {showTableToggle && (
        <div className="flex justify-end mb-2">
          <button
            type="button"
            onClick={toggleView}
            className={cn(
              'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md',
              'text-xs text-krds-gray-70 border border-krds-gray-20',
              'hover:bg-krds-gray-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-krds-blue-60',
              'transition-colors cursor-pointer'
            )}
            aria-pressed={viewMode === 'table'}
            aria-label={
              viewMode === 'chart' ? '데이터 표로 보기' : '차트로 보기'
            }
          >
            {viewMode === 'chart' ? (
              <>
                <Table2 className="h-3.5 w-3.5" aria-hidden="true" /> 표
              </>
            ) : (
              <>
                <BarChart3 className="h-3.5 w-3.5" aria-hidden="true" /> 차트
              </>
            )}
          </button>
        </div>
      )}
      {viewMode === 'chart' ? (
        children
      ) : (
        <ChartA11yTable data={data} title={title} unit={unit} />
      )}
    </div>
  );
}
