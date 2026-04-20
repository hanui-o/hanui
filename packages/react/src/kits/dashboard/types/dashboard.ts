/**
 * Dashboard Kit - Type Definitions
 * 대시보드 기능에 필요한 타입 정의
 */

// 통계 항목
export interface DashboardStat {
  label: string;
  value: string | number;
  change?: number;
  icon?: string;
}

// 방문자 통계
export interface VisitorStat {
  date: string;
  count: number;
}

// 페이지 조회수
export interface PageView {
  url: string;
  title: string;
  views: number;
}

// 게시글 현황
export interface ContentStat {
  boardName: string;
  totalPosts: number;
  thisMonth: number;
}

// 민원 현황
export interface CivilStat {
  totalReceived: number;
  totalProcessed: number;
  pending: number;
  averageResponseDays: number;
}

// 접근성 점수 추이
export interface A11yTrend {
  date: string;
  score: number;
}

// 대시보드 전체 데이터
export interface DashboardData {
  stats: DashboardStat[];
  visitors: VisitorStat[];
  topPages: PageView[];
  contentStats: ContentStat[];
  civilStats?: CivilStat;
  a11yTrends?: A11yTrend[];
}

// 대시보드 조회 파라미터
export interface DashboardParams {
  period?: 'week' | 'month' | 'quarter' | 'year';
  startDate?: string;
  endDate?: string;
}

// 보고서 내보내기 형식
export type ReportFormat = 'pdf' | 'excel';

// API 응답
export interface DashboardResponse {
  success: boolean;
  data: DashboardData;
}
