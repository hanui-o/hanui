// Dashboard Kit - DashboardChart Component
// 차트 컴포넌트 (Recharts 기반)

'use client';

import { Card, CardHeader, CardTitle, CardBody, Skeleton } from '@hanui/react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { ChartConfig } from '../types/dashboard';

interface DashboardChartProps {
  title: string;
  config: ChartConfig;
  isLoading?: boolean;
  height?: number;
}

const COLORS = [
  '#0066CC', // krds-primary
  '#00A86B', // krds-success
  '#FF6B35', // krds-warning
  '#DC3545', // krds-danger
  '#6C757D', // krds-gray
  '#8884d8',
  '#82ca9d',
  '#ffc658',
];

export function DashboardChart({
  title,
  config,
  isLoading = false,
  height = 300,
}: DashboardChartProps) {
  const { type, data, xKey = 'name', yKey = 'value', colors = COLORS } = config;

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
            <XAxis dataKey={xKey} tick={{ fontSize: 12 }} stroke="#6c757d" />
            <YAxis tick={{ fontSize: 12 }} stroke="#6c757d" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={yKey}
              stroke={colors[0]}
              strokeWidth={2}
              dot={{ fill: colors[0], strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
            <XAxis dataKey={xKey} tick={{ fontSize: 12 }} stroke="#6c757d" />
            <YAxis tick={{ fontSize: 12 }} stroke="#6c757d" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar dataKey={yKey} fill={colors[0]} radius={[4, 4, 0, 0]} />
          </BarChart>
        );

      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
            <XAxis dataKey={xKey} tick={{ fontSize: 12 }} stroke="#6c757d" />
            <YAxis tick={{ fontSize: 12 }} stroke="#6c757d" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey={yKey}
              stroke={colors[0]}
              fill={`${colors[0]}33`}
              strokeWidth={2}
            />
          </AreaChart>
        );

      case 'pie':
      case 'donut':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={type === 'donut' ? 60 : 0}
              outerRadius={80}
              paddingAngle={2}
              dataKey={yKey}
              nameKey={xKey}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
              }}
            />
            <Legend />
          </PieChart>
        );

      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardBody>
        {isLoading ? (
          <Skeleton className="w-full" style={{ height }} />
        ) : (
          <ResponsiveContainer width="100%" height={height}>
            {renderChart()}
          </ResponsiveContainer>
        )}
      </CardBody>
    </Card>
  );
}
