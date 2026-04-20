/**
 * Dashboard Kit - API
 * 대시보드 데이터 조회 + 보고서 내보내기 API
 */

import axios from 'axios';
import type {
  DashboardData,
  DashboardParams,
  DashboardResponse,
  ReportFormat,
} from '../types/dashboard';

export const api = axios.create({
  baseURL: '/api/dashboard',
  headers: { 'Content-Type': 'application/json' },
});

/** 대시보드 데이터 조회 */
export async function getDashboardData(
  params?: DashboardParams
): Promise<DashboardData> {
  const { data } = await api.get<DashboardResponse>('/', { params });
  return data.data;
}

/** 방문자 통계 조회 */
export async function getVisitorStats(params?: DashboardParams) {
  const { data } = await api.get('/visitors', { params });
  return data.data;
}

/** 실적 보고서 내보내기 */
export async function exportReport(
  format: ReportFormat,
  params?: DashboardParams
): Promise<Blob> {
  const { data } = await api.get('/report/export', {
    params: { format, ...params },
    responseType: 'blob',
  });
  return data;
}
