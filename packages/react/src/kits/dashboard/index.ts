/**
 * Dashboard Kit
 * 대시보드 기능 키트 - API 주소만 바꾸면 바로 사용 가능
 */

// Hooks
export {
  useDashboardData,
  useVisitorStats,
  useExportReport,
  dashboardKeys,
} from './hooks/useDashboard';

// Store
export { useDashboardStore, useDashboardParams } from './store/dashboardStore';

// API
export {
  getDashboardData,
  getVisitorStats,
  exportReport,
  api,
} from './api/dashboard';

// Types
export type {
  DashboardStat,
  VisitorStat,
  PageView,
  ContentStat,
  CivilStat,
  A11yTrend,
  DashboardData,
  DashboardParams,
  DashboardResponse,
  ReportFormat,
} from './types/dashboard';
