/**
 * Dashboard Kit - React Query Hooks
 */

import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getDashboardData,
  getVisitorStats,
  exportReport,
} from '../api/dashboard';
import type { DashboardParams, ReportFormat } from '../types/dashboard';

export const dashboardKeys = {
  all: ['dashboard'] as const,
  data: (params?: DashboardParams) =>
    [...dashboardKeys.all, 'data', params] as const,
  visitors: (params?: DashboardParams) =>
    [...dashboardKeys.all, 'visitors', params] as const,
};

/** 대시보드 전체 데이터 */
export function useDashboardData(params?: DashboardParams) {
  return useQuery({
    queryKey: dashboardKeys.data(params),
    queryFn: () => getDashboardData(params),
  });
}

/** 방문자 통계 */
export function useVisitorStats(params?: DashboardParams) {
  return useQuery({
    queryKey: dashboardKeys.visitors(params),
    queryFn: () => getVisitorStats(params),
  });
}

/** 보고서 내보내기 */
export function useExportReport() {
  return useMutation({
    mutationFn: ({
      format,
      params,
    }: {
      format: ReportFormat;
      params?: DashboardParams;
    }) => exportReport(format, params),
    onSuccess: (blob, { format }) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `실적보고서.${format === 'pdf' ? 'pdf' : 'xlsx'}`;
      a.click();
      URL.revokeObjectURL(url);
    },
  });
}
