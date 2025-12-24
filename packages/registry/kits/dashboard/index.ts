// Dashboard Kit - Entry Point
// 대시보드 기능 키트

// Types
export type {
  StatCard,
  ChartDataPoint,
  ChartConfig,
  Activity,
  DashboardStats,
  DashboardFilter,
} from './types/dashboard';

// API
export {
  getDashboardStats,
  getStatCards,
  getChartData,
  getActivities,
  subscribeToUpdates,
} from './api/dashboard';

// Store
export { useDashboardStore } from './stores/dashboardStore';

// Hooks
export {
  useDashboardStats,
  useStatCards,
  useChartData,
  useActivities,
  useRealtimeUpdates,
  useDashboardFilter,
} from './hooks/useDashboard';

// Components
export { StatCardGrid } from './components/StatCardGrid';
export { ActivityFeed } from './components/ActivityFeed';
export { DashboardChart } from './components/DashboardChart';
