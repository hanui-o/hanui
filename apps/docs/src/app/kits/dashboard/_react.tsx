'use client';

import {
  PageSection as Section,
  Heading,
  Subsection,
} from '@/components/content';
import {
  Code,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Badge,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  List,
  ListItem,
} from '@hanui/react';

// 타입 정의 코드
const typeCode = `// 통계 카드 타입
export interface StatCard {
  id: string
  title: string
  value: number | string
  change?: number
  changeType?: 'increase' | 'decrease' | 'neutral'
  icon?: string
  format?: 'number' | 'currency' | 'percent'
}

// 차트 데이터 타입
export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string
    borderColor?: string
  }[]
}

// 최근 활동 타입
export interface Activity {
  id: string
  type: 'create' | 'update' | 'delete' | 'login'
  message: string
  user: string
  timestamp: string
}

// 대시보드 설정
export interface DashboardConfig {
  refreshInterval?: number
  layout: 'grid' | 'list'
  visibleWidgets: string[]
}`;

// API 코드 (DummyJSON 사용 - 상품/댓글 데이터로 통계 생성)
const apiCode = `import axios from 'axios'
import type { StatCard, ChartData, Activity } from './types'

// 🔗 DummyJSON 무료 API (테스트용)
// 실제 프로젝트에서는 환경변수로 관리: process.env.NEXT_PUBLIC_API_URL
const API_URL = 'https://dummyjson.com'

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

// 통계 카드 데이터 조회 (상품 데이터에서 계산)
export async function getStats(): Promise<StatCard[]> {
  const { data } = await api.get('/products?limit=100')
  const products = data.products

  const totalProducts = data.total
  const totalRevenue = products.reduce((sum, p) => sum + p.price * p.stock, 0)
  const avgRating = products.reduce((sum, p) => sum + p.rating, 0) / products.length
  const lowStock = products.filter((p) => p.stock < 20).length

  return [
    { id: '1', title: '총 상품', value: totalProducts, change: 12, changeType: 'increase' },
    { id: '2', title: '예상 매출', value: '$' + totalRevenue.toLocaleString(), change: 8, changeType: 'increase' },
    { id: '3', title: '평균 평점', value: avgRating.toFixed(1), change: 0.3, changeType: 'increase' },
    { id: '4', title: '재고 부족', value: lowStock, change: -5, changeType: 'decrease' },
  ]
}

// 차트 데이터 조회 (카테고리별 상품 수)
export async function getChartData(): Promise<ChartData> {
  const { data } = await api.get('/products/category-list')
  const categories = data.slice(0, 6)

  // 각 카테고리별 상품 수 조회
  const counts = await Promise.all(
    categories.map(async (cat: string) => {
      const { data: catData } = await api.get(\`/products/category/\${cat}?limit=1\`)
      return catData.total
    })
  )

  return {
    labels: categories,
    datasets: [{
      label: '카테고리별 상품 수',
      data: counts,
      backgroundColor: '#3b82f6',
    }]
  }
}

// 최근 활동 조회 (댓글 데이터 활용)
export async function getActivities(limit = 5): Promise<Activity[]> {
  const { data } = await api.get(\`/comments?limit=\${limit}\`)

  return data.comments.map((comment: { id: number; body: string; user: { fullName: string } }) => ({
    id: String(comment.id),
    type: 'create',
    message: comment.body.slice(0, 50) + '...',
    user: comment.user.fullName,
    timestamp: new Date().toISOString(),
  }))
}`;

// React Query Hooks 코드
const hooksCode = `import { useQuery } from '@tanstack/react-query'
import { getStats, getChartData, getActivities, getDashboardSummary } from './api'

// Query Keys
export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: () => [...dashboardKeys.all, 'stats'] as const,
  chart: (type: string, period: string) =>
    [...dashboardKeys.all, 'chart', type, period] as const,
  activities: (limit?: number) =>
    [...dashboardKeys.all, 'activities', limit] as const,
  summary: () => [...dashboardKeys.all, 'summary'] as const,
}

// 통계 조회 훅
export function useStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: getStats,
    refetchInterval: 30000, // 30초마다 갱신
  })
}

// 차트 데이터 훅
export function useChartData(
  type: 'line' | 'bar' | 'pie',
  period: 'day' | 'week' | 'month' | 'year'
) {
  return useQuery({
    queryKey: dashboardKeys.chart(type, period),
    queryFn: () => getChartData(type, period),
  })
}

// 최근 활동 훅
export function useActivities(limit?: number) {
  return useQuery({
    queryKey: dashboardKeys.activities(limit),
    queryFn: () => getActivities(limit),
    refetchInterval: 60000, // 1분마다 갱신
  })
}

// 대시보드 요약 훅
export function useDashboardSummary() {
  return useQuery({
    queryKey: dashboardKeys.summary(),
    queryFn: getDashboardSummary,
  })
}`;

// Zustand Store 코드
const storeCode = `import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DashboardConfig } from './types'

interface DashboardState {
  // 설정
  config: DashboardConfig
  selectedPeriod: 'day' | 'week' | 'month' | 'year'
  chartType: 'line' | 'bar' | 'pie'

  // Actions
  setLayout: (layout: 'grid' | 'list') => void
  setPeriod: (period: 'day' | 'week' | 'month' | 'year') => void
  setChartType: (type: 'line' | 'bar' | 'pie') => void
  toggleWidget: (widgetId: string) => void
  setRefreshInterval: (interval: number) => void
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      config: {
        refreshInterval: 30000,
        layout: 'grid',
        visibleWidgets: ['stats', 'chart', 'activities'],
      },
      selectedPeriod: 'week',
      chartType: 'line',

      setLayout: (layout) =>
        set((state) => ({ config: { ...state.config, layout } })),
      setPeriod: (selectedPeriod) => set({ selectedPeriod }),
      setChartType: (chartType) => set({ chartType }),
      toggleWidget: (widgetId) =>
        set((state) => ({
          config: {
            ...state.config,
            visibleWidgets: state.config.visibleWidgets.includes(widgetId)
              ? state.config.visibleWidgets.filter((w) => w !== widgetId)
              : [...state.config.visibleWidgets, widgetId],
          },
        })),
      setRefreshInterval: (refreshInterval) =>
        set((state) => ({ config: { ...state.config, refreshInterval } })),
    }),
    { name: 'dashboard-config' }
  )
)`;

// 사용 예시 코드
const usageCode = `'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useDashboardSummary } from '@/hooks/useDashboard'
import { useDashboardStore } from '@/store/dashboardStore'

const queryClient = new QueryClient()

function StatCard({ title, value, change, changeType }: StatCard) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      {change && (
        <span className={\`text-sm \${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}\`}>
          {changeType === 'increase' ? '+' : '-'}{Math.abs(change)}%
        </span>
      )}
    </div>
  )
}

function Dashboard() {
  const { data, isLoading } = useDashboardSummary()
  const { config, selectedPeriod, setPeriod } = useDashboardStore()

  if (isLoading) return <div>로딩 중...</div>

  return (
    <div className="space-y-6">
      {/* 기간 선택 */}
      <div className="flex gap-2">
        {(['day', 'week', 'month', 'year'] as const).map((period) => (
          <button
            key={period}
            onClick={() => setPeriod(period)}
            className={\`px-3 py-1 rounded \${selectedPeriod === period ? 'bg-blue-600 text-white' : 'bg-gray-100'}\`}
          >
            {period}
          </button>
        ))}
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-4 gap-4">
        {data?.stats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      {/* 차트 영역 */}
      <div className="bg-white p-4 rounded-lg shadow">
        {/* Recharts 등 차트 라이브러리 사용 */}
      </div>

      {/* 최근 활동 */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-bold mb-4">최근 활동</h2>
        <ul className="space-y-2">
          {data?.activities.map((activity) => (
            <li key={activity.id} className="flex justify-between">
              <span>{activity.message}</span>
              <span className="text-gray-500 text-sm">{activity.timestamp}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  )
}`;

export function ReactDashboardContent() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">개요</TabsTrigger>
        <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
      </TabsList>

      {/* 개요 탭 */}
      <TabsContent value="overview">
        {/* 기술 스택 */}
        <Section level="h2">
          <Heading level="h2" id="tech-stack" title="기술 스택" />
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="outline-gray">Zustand</Badge>
            <Badge variant="outline-gray">React Query</Badge>
            <Badge variant="outline-gray">Axios</Badge>
            <Badge variant="outline-gray">Recharts</Badge>
            <Badge variant="outline-gray">TypeScript</Badge>
          </div>
        </Section>

        {/* 기능 */}
        <Section level="h2">
          <Heading level="h2" id="features" title="기능" />
          <List className="mt-4">
            <ListItem>통계 카드 (증감률, 아이콘, 포맷팅)</ListItem>
            <ListItem>차트 (라인, 바, 파이)</ListItem>
            <ListItem>최근 활동 피드</ListItem>
            <ListItem>기간 필터 (일/주/월/년)</ListItem>
            <ListItem>자동 데이터 갱신</ListItem>
            <ListItem>레이아웃 설정 저장</ListItem>
            <ListItem>위젯 표시/숨김</ListItem>
          </List>
        </Section>

        {/* 파일 구조 */}
        <Section level="h2">
          <Heading level="h2" id="file-structure" title="파일 구조" />
          <Code variant="block" language="bash">
            {`src/
├── api/
│   └── dashboard.ts      # API 함수
├── hooks/
│   └── useDashboard.ts   # React Query 훅
├── store/
│   └── dashboardStore.ts # Zustand (설정/상태)
├── components/dashboard/
│   ├── StatCard.tsx      # 통계 카드
│   ├── Chart.tsx         # 차트 래퍼
│   ├── ActivityFeed.tsx  # 최근 활동
│   ├── PeriodFilter.tsx  # 기간 필터
│   └── WidgetGrid.tsx    # 위젯 그리드
└── types/
    └── dashboard.ts      # 타입 정의`}
          </Code>
        </Section>

        {/* 설치 */}
        <Section level="h2">
          <Heading level="h2" id="installation" title="설치" />

          <Subsection level="h3">
            <Heading level="h3" title="1. 의존성 설치" />
            <Code variant="block" language="bash">
              {`npm install axios zustand @tanstack/react-query recharts`}
            </Code>
          </Subsection>

          <Subsection level="h3">
            <Heading level="h3" title="2. 코드 복사" />
            <p className="text-krds-gray-70">
              아래 코드 탭에서 필요한 파일들을 복사합니다.
            </p>
          </Subsection>

          <Subsection level="h3">
            <Heading level="h3" title="3. API 주소 변경" />
            <Code variant="block" language="typescript">
              {`// api/dashboard.ts
const API_URL = 'https://your-api.com/api'  // 실제 서버 주소로 변경`}
            </Code>
          </Subsection>
        </Section>

        {/* 코드 */}
        <Section level="h2">
          <Heading level="h2" id="code" title="코드" />
          <Tabs defaultValue="types">
            <TabsList>
              <TabsTrigger value="types">types.ts</TabsTrigger>
              <TabsTrigger value="api">api.ts</TabsTrigger>
              <TabsTrigger value="hooks">hooks.ts</TabsTrigger>
              <TabsTrigger value="store">store.ts</TabsTrigger>
            </TabsList>

            <TabsContent value="types">
              <Code variant="block" language="typescript">
                {typeCode}
              </Code>
            </TabsContent>
            <TabsContent value="api">
              <Code variant="block" language="typescript">
                {apiCode}
              </Code>
            </TabsContent>
            <TabsContent value="hooks">
              <Code variant="block" language="typescript">
                {hooksCode}
              </Code>
            </TabsContent>
            <TabsContent value="store">
              <Code variant="block" language="typescript">
                {storeCode}
              </Code>
            </TabsContent>
          </Tabs>
        </Section>

        {/* 사용 예시 */}
        <Section level="h2">
          <Heading level="h2" id="usage" title="사용 예시" />
          <Code variant="block" language="tsx">
            {usageCode}
          </Code>
        </Section>

        {/* 접근성 */}
        <Section level="h2">
          <Heading level="h2" id="accessibility" title="접근성" />
          <List className="mt-4">
            <ListItem>
              통계 카드에 <Code>role="region"</Code> 및 <Code>aria-label</Code>{' '}
              적용
            </ListItem>
            <ListItem>차트에 대체 텍스트 또는 데이터 테이블 제공</ListItem>
            <ListItem>
              증감률에 <Code>aria-label</Code>로 전체 맥락 제공
            </ListItem>
            <ListItem>
              자동 갱신 시 <Code>aria-live="polite"</Code>로 알림
            </ListItem>
            <ListItem>
              색상만으로 정보 전달하지 않음 (아이콘/텍스트 병행)
            </ListItem>
          </List>
        </Section>
      </TabsContent>

      {/* API 레퍼런스 탭 */}
      <TabsContent value="api">
        {/* API 함수 */}
        <Section level="h2">
          <Heading level="h2" id="api-functions" title="API 함수" />
          <Table small className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>함수</TableHead>
                <TableHead>파라미터</TableHead>
                <TableHead>반환값</TableHead>
                <TableHead>설명</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Code>getStats</Code>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <Code className="text-xs">StatCard[]</Code>
                </TableCell>
                <TableCell>통계 카드 데이터</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>getChartData</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">type, period</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">ChartData</Code>
                </TableCell>
                <TableCell>차트 데이터</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>getActivities</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">limit?</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">Activity[]</Code>
                </TableCell>
                <TableCell>최근 활동 목록</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>getDashboardSummary</Code>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <Code className="text-xs">Summary</Code>
                </TableCell>
                <TableCell>통합 요약 데이터</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Section>

        {/* React Query Hooks */}
        <Section level="h2">
          <Heading level="h2" id="hooks" title="React Query Hooks" />
          <Table small className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Hook</TableHead>
                <TableHead>파라미터</TableHead>
                <TableHead>설명</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Code>useStats</Code>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>통계 데이터 (30초 자동 갱신)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>useChartData</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">type, period</Code>
                </TableCell>
                <TableCell>차트 데이터</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>useActivities</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">limit?</Code>
                </TableCell>
                <TableCell>최근 활동 (1분 자동 갱신)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>useDashboardSummary</Code>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>통합 데이터 (병렬 요청)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Section>

        {/* Zustand Store */}
        <Section level="h2">
          <Heading level="h2" id="store" title="Zustand Store" />

          <Subsection level="h3">
            <Heading level="h3" title="State" />
            <Table small className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead>속성</TableHead>
                  <TableHead>타입</TableHead>
                  <TableHead>설명</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Code>config</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">DashboardConfig</Code>
                  </TableCell>
                  <TableCell>대시보드 설정</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>selectedPeriod</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">
                      'day' | 'week' | 'month' | 'year'
                    </Code>
                  </TableCell>
                  <TableCell>선택된 기간</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>chartType</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">'line' | 'bar' | 'pie'</Code>
                  </TableCell>
                  <TableCell>차트 유형</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Subsection>

          <Subsection level="h3">
            <Heading level="h3" title="Actions" />
            <Table small className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead>함수</TableHead>
                  <TableHead>파라미터</TableHead>
                  <TableHead>설명</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Code>setLayout</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">'grid' | 'list'</Code>
                  </TableCell>
                  <TableCell>레이아웃 변경</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>setPeriod</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">period</Code>
                  </TableCell>
                  <TableCell>기간 변경</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>setChartType</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">type</Code>
                  </TableCell>
                  <TableCell>차트 유형 변경</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>toggleWidget</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">widgetId</Code>
                  </TableCell>
                  <TableCell>위젯 표시/숨김</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Subsection>
        </Section>

        {/* 타입 정의 */}
        <Section level="h2">
          <Heading level="h2" id="types" title="타입 정의" />
          <Code variant="block" language="typescript">
            {typeCode}
          </Code>
        </Section>
      </TabsContent>
    </Tabs>
  );
}
