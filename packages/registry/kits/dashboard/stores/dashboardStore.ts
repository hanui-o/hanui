// Dashboard Kit - Store
// Zustand 기반 대시보드 상태 관리

import { create } from 'zustand';
import type {
  StatCard,
  ChartConfig,
  Activity,
  DashboardFilter,
} from '../types/dashboard';

interface DashboardStore {
  // 상태
  stats: StatCard[];
  charts: Record<string, ChartConfig>;
  activities: Activity[];
  filter: DashboardFilter;
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;

  // 액션
  setStats: (stats: StatCard[]) => void;
  updateStat: (id: string, updates: Partial<StatCard>) => void;
  setCharts: (charts: Record<string, ChartConfig>) => void;
  updateChart: (id: string, data: ChartConfig) => void;
  setActivities: (activities: Activity[]) => void;
  addActivity: (activity: Activity) => void;
  setFilter: (filter: Partial<DashboardFilter>) => void;
  clearFilter: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setLastUpdated: (timestamp: string) => void;
  reset: () => void;
}

const initialState = {
  stats: [],
  charts: {},
  activities: [],
  filter: {},
  isLoading: false,
  error: null,
  lastUpdated: null,
};

export const useDashboardStore = create<DashboardStore>((set) => ({
  ...initialState,

  setStats: (stats) => set({ stats }),

  updateStat: (id, updates) =>
    set((state) => ({
      stats: state.stats.map((stat) =>
        stat.id === id ? { ...stat, ...updates } : stat
      ),
    })),

  setCharts: (charts) => set({ charts }),

  updateChart: (id, data) =>
    set((state) => ({
      charts: { ...state.charts, [id]: data },
    })),

  setActivities: (activities) => set({ activities }),

  addActivity: (activity) =>
    set((state) => ({
      activities: [activity, ...state.activities].slice(0, 50), // 최대 50개 유지
    })),

  setFilter: (filter) =>
    set((state) => ({
      filter: { ...state.filter, ...filter },
    })),

  clearFilter: () => set({ filter: {} }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  setLastUpdated: (timestamp) => set({ lastUpdated: timestamp }),

  reset: () => set(initialState),
}));
