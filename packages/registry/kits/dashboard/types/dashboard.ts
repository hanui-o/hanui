// Dashboard Kit - Types
// 대시보드 관련 타입 정의

export interface StatCard {
  id: string;
  title: string;
  value: string | number;
  change?: number; // 변화율 (%)
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon?: string;
  description?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: unknown;
}

export interface ChartConfig {
  type: 'line' | 'bar' | 'area' | 'pie' | 'donut';
  data: ChartDataPoint[];
  xKey?: string;
  yKey?: string;
  colors?: string[];
}

export interface Activity {
  id: string;
  type: string;
  title: string;
  description?: string;
  timestamp: string;
  user?: {
    id: string;
    name: string;
    avatar?: string;
  };
  metadata?: Record<string, unknown>;
}

export interface DashboardStats {
  stats: StatCard[];
  charts: Record<string, ChartConfig>;
  activities: Activity[];
  lastUpdated: string;
}

export interface DashboardFilter {
  dateRange?: {
    from: string;
    to: string;
  };
  period?: 'day' | 'week' | 'month' | 'year';
  category?: string;
}
