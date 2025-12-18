// Dashboard Kit - Hooks
// React Query 기반 대시보드 데이터 fetching hooks

import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getDashboardStats,
  getStatCards,
  getChartData,
  getActivities,
  subscribeToUpdates,
} from '../api/dashboard';
import { useDashboardStore } from '../stores/dashboardStore';
import type { DashboardFilter } from '../types/dashboard';

// 대시보드 전체 통계 조회 hook
export function useDashboardStats(filter?: DashboardFilter) {
  const {
    setStats,
    setCharts,
    setActivities,
    setLoading,
    setError,
    setLastUpdated,
  } = useDashboardStore();

  const query = useQuery({
    queryKey: ['dashboard', 'stats', filter],
    queryFn: () => getDashboardStats(filter),
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000, // 1분마다 갱신
  });

  useEffect(() => {
    if (query.data) {
      setStats(query.data.stats);
      setCharts(query.data.charts);
      setActivities(query.data.activities);
      setLastUpdated(query.data.lastUpdated);
    }
    if (query.error) {
      setError('대시보드 데이터를 불러오는 중 오류가 발생했습니다');
    }
    setLoading(query.isLoading);
  }, [
    query.data,
    query.error,
    query.isLoading,
    setStats,
    setCharts,
    setActivities,
    setLoading,
    setError,
    setLastUpdated,
  ]);

  return query;
}

// 통계 카드만 조회 hook
export function useStatCards(filter?: DashboardFilter) {
  const { setStats } = useDashboardStore();

  return useQuery({
    queryKey: ['dashboard', 'stat-cards', filter],
    queryFn: () => getStatCards(filter),
    staleTime: 30 * 1000,
    select: (data) => {
      setStats(data);
      return data;
    },
  });
}

// 특정 차트 데이터 조회 hook
export function useChartData(chartId: string, filter?: DashboardFilter) {
  const { updateChart } = useDashboardStore();

  return useQuery({
    queryKey: ['dashboard', 'chart', chartId, filter],
    queryFn: () => getChartData(chartId, filter),
    staleTime: 30 * 1000,
    select: (data) => {
      updateChart(chartId, {
        type: 'line', // 기본값
        data,
      });
      return data;
    },
  });
}

// 활동 피드 조회 hook
export function useActivities(params?: {
  page?: number;
  limit?: number;
  type?: string;
}) {
  const { setActivities } = useDashboardStore();

  return useQuery({
    queryKey: ['dashboard', 'activities', params],
    queryFn: () => getActivities(params),
    staleTime: 10 * 1000,
    select: (data) => {
      setActivities(data.data);
      return data;
    },
  });
}

// 실시간 업데이트 hook
export function useRealtimeUpdates(enabled = true) {
  const queryClient = useQueryClient();
  const { updateStat, addActivity, setLastUpdated } = useDashboardStore();

  useEffect(() => {
    if (!enabled) return;

    const unsubscribe = subscribeToUpdates((data) => {
      // 통계 업데이트
      if (data.stats) {
        data.stats.forEach((stat) => {
          updateStat(stat.id, stat);
        });
      }

      // 활동 추가
      if (data.activities) {
        data.activities.forEach((activity) => {
          addActivity(activity);
        });
      }

      // 마지막 업데이트 시간
      if (data.lastUpdated) {
        setLastUpdated(data.lastUpdated);
      }

      // 쿼리 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    });

    return () => {
      unsubscribe();
    };
  }, [enabled, queryClient, updateStat, addActivity, setLastUpdated]);
}

// 대시보드 필터 hook
export function useDashboardFilter() {
  const { filter, setFilter, clearFilter } = useDashboardStore();

  const setDateRange = (from: string, to: string) => {
    setFilter({ dateRange: { from, to } });
  };

  const setPeriod = (period: 'day' | 'week' | 'month' | 'year') => {
    setFilter({ period });
  };

  const setCategory = (category: string) => {
    setFilter({ category });
  };

  return {
    filter,
    setFilter,
    setDateRange,
    setPeriod,
    setCategory,
    clearFilter,
  };
}
