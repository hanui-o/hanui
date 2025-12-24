// Dashboard Kit - API
// 대시보드 API 호출 함수

import axios from 'axios';
import type {
  DashboardStats,
  DashboardFilter,
  Activity,
  StatCard,
} from '../types/dashboard';

// API 기본 URL - 실제 서버 주소로 변경하세요
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 인터셉터: 인증 토큰 추가
apiClient.interceptors.request.use((config) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 대시보드 통계 조회
export async function getDashboardStats(
  filter?: DashboardFilter
): Promise<DashboardStats> {
  const response = await apiClient.get<DashboardStats>('/dashboard/stats', {
    params: filter,
  });
  return response.data;
}

// 통계 카드 데이터 조회
export async function getStatCards(
  filter?: DashboardFilter
): Promise<StatCard[]> {
  const response = await apiClient.get<StatCard[]>('/dashboard/stats/cards', {
    params: filter,
  });
  return response.data;
}

// 차트 데이터 조회
export async function getChartData(
  chartId: string,
  filter?: DashboardFilter
): Promise<{ name: string; value: number }[]> {
  const response = await apiClient.get<{ name: string; value: number }[]>(
    `/dashboard/charts/${chartId}`,
    { params: filter }
  );
  return response.data;
}

// 활동 피드 조회
export async function getActivities(params?: {
  page?: number;
  limit?: number;
  type?: string;
}): Promise<{ data: Activity[]; total: number }> {
  const response = await apiClient.get<{ data: Activity[]; total: number }>(
    '/dashboard/activities',
    { params }
  );
  return response.data;
}

// 실시간 업데이트 (SSE)
export function subscribeToUpdates(
  onUpdate: (data: Partial<DashboardStats>) => void
): () => void {
  const eventSource = new EventSource(`${API_URL}/dashboard/stream`);

  eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onUpdate(data);
    } catch (error) {
      console.error('Failed to parse dashboard update:', error);
    }
  };

  eventSource.onerror = () => {
    eventSource.close();
  };

  return () => {
    eventSource.close();
  };
}
