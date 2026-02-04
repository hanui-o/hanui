'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/card';

/**
 * 숫자를 한글로 변환하는 유틸리티 함수
 * 접근성을 위해 스크린 리더가 숫자를 자연스럽게 읽을 수 있도록 함
 */
const numberToKorean = (num: number): string => {
  if (num === 0) return '영';

  const units = ['', '만', '억', '조'];
  const digits = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  const subUnits = ['', '십', '백', '천'];

  const absNum = Math.abs(num);
  const numStr = Math.floor(absNum).toString();
  const groups: string[] = [];

  // 4자리씩 그룹화
  for (let i = numStr.length; i > 0; i -= 4) {
    const start = Math.max(0, i - 4);
    groups.unshift(numStr.slice(start, i));
  }

  let result = '';
  groups.forEach((group, groupIndex) => {
    const unitIndex = groups.length - 1 - groupIndex;
    let groupResult = '';

    for (let i = 0; i < group.length; i++) {
      const digit = parseInt(group[i], 10);
      const subUnitIndex = group.length - 1 - i;

      if (digit !== 0) {
        if (digit === 1 && subUnitIndex > 0) {
          groupResult += subUnits[subUnitIndex];
        } else {
          groupResult += digits[digit] + subUnits[subUnitIndex];
        }
      }
    }

    if (groupResult) {
      result += groupResult + units[unitIndex];
    }
  });

  if (num < 0) {
    result = '마이너스 ' + result;
  }

  return result || '영';
};

/**
 * 숫자를 포맷팅하는 유틸리티 함수
 */
const formatNumber = (
  value: number,
  format?: 'number' | 'currency' | 'percent' | 'compact'
): string => {
  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
      }).format(value);
    case 'percent':
      return new Intl.NumberFormat('ko-KR', {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(value / 100);
    case 'compact':
      return new Intl.NumberFormat('ko-KR', {
        notation: 'compact',
        maximumFractionDigits: 1,
      }).format(value);
    case 'number':
    default:
      return new Intl.NumberFormat('ko-KR').format(value);
  }
};

const statCardVariants = cva('relative overflow-hidden', {
  variants: {
    size: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const trendVariants = cva(
  'inline-flex items-center gap-1 text-sm font-medium rounded-full px-2 py-0.5',
  {
    variants: {
      direction: {
        up: 'text-krds-success-base bg-krds-success-5',
        down: 'text-krds-danger-base bg-krds-danger-5',
        neutral: 'text-krds-gray-60 bg-krds-gray-10',
      },
    },
    defaultVariants: {
      direction: 'neutral',
    },
  }
);

export interface StatCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof statCardVariants> {
  /** 통계 제목 */
  title: string;
  /** 통계 값 (숫자) */
  value: number;
  /** 숫자 포맷 형식 */
  format?: 'number' | 'currency' | 'percent' | 'compact';
  /** 단위 (예: "명", "건", "원") */
  unit?: string;
  /** 트렌드 방향 */
  trend?: 'up' | 'down' | 'neutral';
  /** 트렌드 값 (퍼센트) */
  trendValue?: number;
  /** 트렌드 설명 텍스트 */
  trendLabel?: string;
  /** 부가 설명 */
  description?: string;
  /** 왼쪽 아이콘 */
  icon?: React.ReactNode;
  /** 클릭 시 동작 */
  onClick?: () => void;
}

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      className,
      size,
      title,
      value,
      format = 'number',
      unit,
      trend,
      trendValue,
      trendLabel,
      description,
      icon,
      onClick,
      ...props
    },
    ref
  ) => {
    const formattedValue = formatNumber(value, format);
    const koreanValue = numberToKorean(value);

    // 접근성: 스크린 리더를 위한 전체 설명 생성
    const getAriaLabel = (): string => {
      let label = `${title}: ${koreanValue}`;
      if (unit) label += unit;
      if (trend && trendValue !== undefined) {
        const trendText =
          trend === 'up' ? '상승' : trend === 'down' ? '하락' : '변동 없음';
        label += `, ${trendText} ${Math.abs(trendValue)}퍼센트`;
      }
      if (trendLabel) label += `, ${trendLabel}`;
      return label;
    };

    const TrendIcon =
      trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

    return (
      <Card
        ref={ref}
        className={cn(statCardVariants({ size }), className)}
        onClick={onClick}
        hoverable={!!onClick}
        variant="outlined"
        padding="none"
        aria-label={getAriaLabel()}
        {...props}
      >
        <div className="flex items-start justify-between gap-4">
          {icon && (
            <div
              className="flex-shrink-0 p-3 rounded-lg bg-krds-primary-5 text-krds-primary-base"
              aria-hidden="true"
            >
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-krds-gray-60 truncate">
              {title}
            </p>
            <p
              className="mt-1 text-3xl font-bold text-krds-gray-90 tabular-nums"
              aria-hidden="true"
            >
              {formattedValue}
              {unit && (
                <span className="ml-1 text-lg font-medium text-krds-gray-60">
                  {unit}
                </span>
              )}
            </p>
          </div>
        </div>

        {(trend || description) && (
          <div className="mt-4 flex items-center justify-between gap-2">
            {trend && trendValue !== undefined && (
              <span
                className={cn(trendVariants({ direction: trend }))}
                aria-hidden="true"
              >
                <TrendIcon className="h-4 w-4" aria-hidden="true" />
                <span>{Math.abs(trendValue)}%</span>
                {trendLabel && (
                  <span className="text-krds-gray-50 ml-1">{trendLabel}</span>
                )}
              </span>
            )}
            {description && (
              <p className="text-xs text-krds-gray-50 truncate">{description}</p>
            )}
          </div>
        )}
      </Card>
    );
  }
);

StatCard.displayName = 'StatCard';

export { statCardVariants, trendVariants };
