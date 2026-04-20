/**
 * Dashboard Kit - Zustand Store
 */

import { create } from 'zustand';
import type { DashboardParams, ReportFormat } from '../types/dashboard';

interface DashboardState {
  /** 조회 기간 */
  period: DashboardParams['period'];
  /** 커스텀 시작일 */
  startDate: string | null;
  /** 커스텀 종료일 */
  endDate: string | null;

  /** 기간 변경 */
  setPeriod: (period: DashboardParams['period']) => void;
  /** 커스텀 기간 설정 */
  setDateRange: (startDate: string, endDate: string) => void;
  /** 기간 초기화 */
  resetPeriod: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  period: 'month',
  startDate: null,
  endDate: null,

  setPeriod: (period) => set({ period, startDate: null, endDate: null }),
  setDateRange: (startDate, endDate) =>
    set({ period: undefined, startDate, endDate }),
  resetPeriod: () => set({ period: 'month', startDate: null, endDate: null }),
}));

/** 현재 기간 파라미터 셀렉터 */
export const useDashboardParams = (): DashboardParams => {
  const { period, startDate, endDate } = useDashboardStore();
  if (startDate && endDate) return { startDate, endDate };
  return { period: period ?? 'month' };
};
