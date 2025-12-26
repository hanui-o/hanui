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
const typeCode = `// src/types/dashboard.ts
// 통계 카드 타입
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

// API 코드 (DummyJSON 사용)
const apiCode = `// src/api/dashboard.ts
import axios from 'axios'
import type { StatCard, ChartData, Activity } from '@/types/dashboard'

// 🔗 DummyJSON 무료 API (테스트용)
// 실제 프로젝트에서는 환경변수로 관리: import.meta.env.VITE_API_URL
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

  return data.comments.map((comment) => ({
    id: String(comment.id),
    type: 'create',
    message: comment.body.slice(0, 50) + '...',
    user: comment.user.fullName,
    timestamp: new Date().toISOString(),
  }))
}`;

// Vue Query Composables
const composablesCode = `// src/composables/useDashboard.ts
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import { useDashboardStore } from '@/store/dashboardStore'
import { getStats, getChartData, getActivities } from '@/api/dashboard'

// Query Keys
export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: () => [...dashboardKeys.all, 'stats'] as const,
  chart: (type: string, period: string) =>
    [...dashboardKeys.all, 'chart', type, period] as const,
  activities: (limit?: number) =>
    [...dashboardKeys.all, 'activities', limit] as const,
}

// 통계 조회
export function useStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: getStats,
    refetchInterval: 30000, // 30초마다 갱신
  })
}

// 차트 데이터
export function useChartData() {
  const store = useDashboardStore()

  return useQuery({
    queryKey: computed(() =>
      dashboardKeys.chart(store.chartType, store.selectedPeriod)
    ),
    queryFn: getChartData,
  })
}

// 최근 활동
export function useActivities(limit?: number) {
  return useQuery({
    queryKey: dashboardKeys.activities(limit),
    queryFn: () => getActivities(limit),
    refetchInterval: 60000, // 1분마다 갱신
  })
}`;

// Pinia Store 코드
const storeCode = `// src/store/dashboardStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DashboardConfig } from '@/types/dashboard'

export const useDashboardStore = defineStore('dashboard', () => {
  // State
  const config = ref<DashboardConfig>({
    refreshInterval: 30000,
    layout: 'grid',
    visibleWidgets: ['stats', 'chart', 'activities'],
  })
  const selectedPeriod = ref<'day' | 'week' | 'month' | 'year'>('week')
  const chartType = ref<'line' | 'bar' | 'pie'>('bar')

  // Actions
  function setLayout(layout: 'grid' | 'list') {
    config.value.layout = layout
  }

  function setPeriod(period: 'day' | 'week' | 'month' | 'year') {
    selectedPeriod.value = period
  }

  function setChartType(type: 'line' | 'bar' | 'pie') {
    chartType.value = type
  }

  function toggleWidget(widgetId: string) {
    const index = config.value.visibleWidgets.indexOf(widgetId)
    if (index > -1) {
      config.value.visibleWidgets.splice(index, 1)
    } else {
      config.value.visibleWidgets.push(widgetId)
    }
  }

  function setRefreshInterval(interval: number) {
    config.value.refreshInterval = interval
  }

  return {
    config,
    selectedPeriod,
    chartType,
    setLayout,
    setPeriod,
    setChartType,
    toggleWidget,
    setRefreshInterval,
  }
}, {
  persist: true, // pinia-plugin-persistedstate 사용
})`;

// 사용 예시 코드
const usageCode = `<!-- src/components/dashboard/DashboardView.vue -->
<script setup lang="ts">
import { useDashboardStore } from '@/store/dashboardStore'
import { useStats, useChartData, useActivities } from '@/composables/useDashboard'

const store = useDashboardStore()
const { data: stats, isLoading: statsLoading } = useStats()
const { data: chartData, isLoading: chartLoading } = useChartData()
const { data: activities, isLoading: activitiesLoading } = useActivities(5)

// 시간 포맷팅
function formatTime(timestamp: string) {
  const diff = Date.now() - new Date(timestamp).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return \`\${minutes}분 전\`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return \`\${hours}시간 전\`
  return \`\${Math.floor(hours / 24)}일 전\`
}
</script>

<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold">대시보드</h1>

    <!-- 기간 선택 -->
    <div class="flex gap-2">
      <button
        v-for="period in ['day', 'week', 'month', 'year']"
        :key="period"
        @click="store.setPeriod(period)"
        :class="[
          'px-3 py-1 rounded',
          store.selectedPeriod === period
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100'
        ]"
      >
        {{ period }}
      </button>
    </div>

    <!-- 통계 카드 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <template v-if="statsLoading">
        <div
          v-for="i in 4"
          :key="i"
          class="h-24 bg-gray-100 rounded-lg animate-pulse"
        />
      </template>
      <div
        v-else
        v-for="stat in stats"
        :key="stat.id"
        class="bg-white p-6 rounded-lg border"
      >
        <h3 class="text-gray-500 text-sm">{{ stat.title }}</h3>
        <p class="text-2xl font-bold mt-2">{{ stat.value }}</p>
        <div
          class="flex items-center mt-2 text-sm"
          :class="stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'"
        >
          <span>{{ stat.changeType === 'increase' ? '↑' : '↓' }}</span>
          <span class="ml-1">{{ Math.abs(stat.change || 0) }}%</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 차트 -->
      <div class="lg:col-span-2 bg-white p-6 rounded-lg border">
        <h2 class="text-lg font-semibold mb-4">카테고리별 상품 수</h2>
        <div v-if="chartLoading" class="h-64 bg-gray-100 animate-pulse rounded" />
        <!-- Chart.js 또는 vue-chartjs 사용 -->
        <div v-else class="h-64">
          <!-- 차트 렌더링 -->
        </div>
      </div>

      <!-- 최근 활동 -->
      <div class="bg-white p-6 rounded-lg border">
        <h2 class="text-lg font-semibold mb-4">최근 활동</h2>
        <ul v-if="!activitiesLoading" class="space-y-4">
          <li
            v-for="activity in activities"
            :key="activity.id"
            class="flex items-start gap-3"
          >
            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              {{ activity.user.charAt(0) }}
            </div>
            <div class="flex-1">
              <p class="text-sm">
                <span class="font-medium">{{ activity.user }}</span>
                {{ activity.message }}
              </p>
              <p class="text-xs text-gray-400">{{ formatTime(activity.timestamp) }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>`;

export function VueDashboardContent() {
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
            <Badge variant="outline-gray">Vue 3</Badge>
            <Badge variant="outline-gray">Pinia</Badge>
            <Badge variant="outline-gray">Vue Query</Badge>
            <Badge variant="outline-gray">Chart.js</Badge>
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
│   └── dashboard.ts       # API 함수 (DummyJSON)
├── composables/
│   └── useDashboard.ts    # Vue Query 훅
├── store/
│   └── dashboardStore.ts  # Pinia (설정/상태)
├── components/dashboard/
│   ├── StatCard.vue       # 통계 카드
│   ├── BarChart.vue       # 차트 래퍼
│   └── ActivityFeed.vue   # 최근 활동
└── types/
    └── dashboard.ts       # 타입 정의`}
          </Code>
        </Section>

        {/* 설치 */}
        <Section level="h2">
          <Heading level="h2" id="installation" title="설치" />

          <Subsection level="h3">
            <Heading level="h3" title="1. 의존성 설치" />
            <Code variant="block" language="bash">
              {`npm install pinia @tanstack/vue-query axios chart.js vue-chartjs`}
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
              <TabsTrigger value="composables">composables.ts</TabsTrigger>
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
            <TabsContent value="composables">
              <Code variant="block" language="typescript">
                {composablesCode}
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
          <Code variant="block" language="vue">
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
                <TableCell>-</TableCell>
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
            </TableBody>
          </Table>
        </Section>

        {/* Vue Query Composables */}
        <Section level="h2">
          <Heading level="h2" id="composables" title="Vue Query Composables" />
          <Table small className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Composable</TableHead>
                <TableHead>파라미터</TableHead>
                <TableHead>반환값</TableHead>
                <TableHead>설명</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Code>useStats</Code>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <Code className="text-xs">UseQueryResult</Code>
                </TableCell>
                <TableCell>통계 데이터 (30초 자동 갱신)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>useChartData</Code>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <Code className="text-xs">UseQueryResult</Code>
                </TableCell>
                <TableCell>차트 데이터 (스토어 연동)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>useActivities</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">limit?</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">UseQueryResult</Code>
                </TableCell>
                <TableCell>최근 활동 (1분 자동 갱신)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Section>

        {/* Pinia Store */}
        <Section level="h2">
          <Heading level="h2" id="store" title="Pinia Store" />

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
                <TableRow>
                  <TableCell>
                    <Code>setRefreshInterval</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">interval</Code>
                  </TableCell>
                  <TableCell>갱신 주기 변경</TableCell>
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
