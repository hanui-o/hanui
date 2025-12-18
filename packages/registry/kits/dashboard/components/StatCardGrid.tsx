// Dashboard Kit - StatCardGrid Component
// 통계 카드 그리드 컴포넌트

'use client';

import { Card, CardBody, Skeleton } from '@hanui/react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { StatCard } from '../types/dashboard';

interface StatCardGridProps {
  stats: StatCard[];
  isLoading?: boolean;
  columns?: 2 | 3 | 4;
}

export function StatCardGrid({
  stats,
  isLoading = false,
  columns = 4,
}: StatCardGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  if (isLoading) {
    return (
      <div className={`grid ${gridCols[columns]} gap-4`}>
        {Array.from({ length: columns }).map((_, i) => (
          <Card key={i}>
            <CardBody>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-32 mb-2" />
              <Skeleton className="h-4 w-20" />
            </CardBody>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-4`}>
      {stats.map((stat) => (
        <StatCardItem key={stat.id} stat={stat} />
      ))}
    </div>
  );
}

function StatCardItem({ stat }: { stat: StatCard }) {
  const changeIcon =
    stat.changeType === 'increase' ? (
      <TrendingUp className="w-4 h-4 text-krds-success-base" />
    ) : stat.changeType === 'decrease' ? (
      <TrendingDown className="w-4 h-4 text-krds-danger-base" />
    ) : (
      <Minus className="w-4 h-4 text-krds-gray-50" />
    );

  const changeColor =
    stat.changeType === 'increase'
      ? 'text-krds-success-base'
      : stat.changeType === 'decrease'
        ? 'text-krds-danger-base'
        : 'text-krds-gray-50';

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardBody>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-krds-gray-50 mb-1">{stat.title}</p>
            <p className="text-2xl font-bold text-krds-gray-90">{stat.value}</p>
          </div>
          {stat.icon && (
            <div className="w-10 h-10 rounded-full bg-krds-primary-5 flex items-center justify-center">
              <span className="text-xl">{stat.icon}</span>
            </div>
          )}
        </div>

        {stat.change !== undefined && (
          <div className="flex items-center gap-1 mt-3">
            {changeIcon}
            <span className={`text-sm font-medium ${changeColor}`}>
              {stat.change > 0 ? '+' : ''}
              {stat.change}%
            </span>
            {stat.description && (
              <span className="text-sm text-krds-gray-50 ml-1">
                {stat.description}
              </span>
            )}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
