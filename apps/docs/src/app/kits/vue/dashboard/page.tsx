'use client';

import {
  PageSection as Section,
  Heading,
  PageNavigation,
} from '@/components/content';
import { CodeBlock } from '@/components/content/CodeBlock';
import { Badge, Tabs, TabsList, TabsTrigger, TabsContent } from '@hanui/react';

// Composables
const composablesCode = `// src/features/dashboard/composables/useDashboard.ts
import { useQuery } from '@tanstack/vue-query'
import { getStats, getChartData, getActivities } from '../api/dashboardApi'

export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: () => [...dashboardKeys.all, 'stats'] as const,
  chart: () => [...dashboardKeys.all, 'chart'] as const,
  activities: () => [...dashboardKeys.all, 'activities'] as const,
}

export function useStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: getStats,
    staleTime: 60 * 1000, // 1분
  })
}

export function useChartData() {
  return useQuery({
    queryKey: dashboardKeys.chart(),
    queryFn: getChartData,
    staleTime: 60 * 1000,
  })
}

export function useActivities(limit = 5) {
  return useQuery({
    queryKey: [...dashboardKeys.activities(), limit],
    queryFn: () => getActivities(limit),
    refetchInterval: 30 * 1000, // 30초마다 갱신
  })
}`;

// 대시보드 컴포넌트
const dashboardComponent = `<!-- src/views/dashboard/DashboardView.vue -->
<script setup lang="ts">
import { useStats, useChartData, useActivities } from '@/features/dashboard/composables/useDashboard'
import StatCard from '@/components/dashboard/StatCard.vue'
import BarChart from '@/components/dashboard/BarChart.vue'
import ActivityFeed from '@/components/dashboard/ActivityFeed.vue'

const { data: stats, isLoading: statsLoading } = useStats()
const { data: chartData, isLoading: chartLoading } = useChartData()
const { data: activities, isLoading: activitiesLoading } = useActivities(5)
</script>

<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold">대시보드</h1>

    <!-- 통계 카드 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <template v-if="statsLoading">
        <div
          v-for="i in 4"
          :key="i"
          class="h-24 bg-gray-100 rounded-lg animate-pulse"
        />
      </template>
      <StatCard
        v-else
        v-for="stat in stats"
        :key="stat.id"
        :title="stat.title"
        :value="stat.value"
        :change="stat.change"
        :change-type="stat.changeType"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 차트 -->
      <div class="lg:col-span-2 bg-white p-6 rounded-lg border">
        <h2 class="text-lg font-semibold mb-4">카테고리별 상품 수</h2>
        <div v-if="chartLoading" class="h-64 bg-gray-100 animate-pulse rounded" />
        <BarChart v-else :data="chartData" />
      </div>

      <!-- 최근 활동 -->
      <div class="bg-white p-6 rounded-lg border">
        <h2 class="text-lg font-semibold mb-4">최근 활동</h2>
        <div v-if="activitiesLoading" class="space-y-4">
          <div
            v-for="i in 5"
            :key="i"
            class="h-12 bg-gray-100 animate-pulse rounded"
          />
        </div>
        <ActivityFeed v-else :activities="activities" />
      </div>
    </div>
  </div>
</template>`;

// StatCard 컴포넌트
const statCardComponent = `<!-- src/components/dashboard/StatCard.vue -->
<script setup lang="ts">
interface Props {
  title: string
  value: string | number
  change: number
  changeType: 'increase' | 'decrease'
}

defineProps<Props>()
</script>

<template>
  <div class="bg-white p-6 rounded-lg border">
    <h3 class="text-gray-500 text-sm">{{ title }}</h3>
    <p class="text-2xl font-bold mt-2">{{ value }}</p>
    <div
      class="flex items-center mt-2 text-sm"
      :class="changeType === 'increase' ? 'text-green-600' : 'text-red-600'"
    >
      <span>{{ changeType === 'increase' ? '↑' : '↓' }}</span>
      <span class="ml-1">{{ Math.abs(change) }}%</span>
    </div>
  </div>
</template>`;

// ActivityFeed 컴포넌트
const activityFeedComponent = `<!-- src/components/dashboard/ActivityFeed.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import type { Activity } from '@/features/dashboard/types/dashboard'

interface Props {
  activities: Activity[]
}

const props = defineProps<Props>()

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
  <ul class="space-y-4">
    <li
      v-for="activity in activities"
      :key="activity.id"
      class="flex items-start gap-3"
    >
      <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
        {{ activity.user.charAt(0) }}
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm">
          <span class="font-medium">{{ activity.user }}</span>
          <span class="text-gray-600">{{ activity.message }}</span>
        </p>
        <p class="text-xs text-gray-400 mt-1">
          {{ formatTime(activity.timestamp) }}
        </p>
      </div>
    </li>
  </ul>
</template>`;

export default function VueDashboardKitPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Dashboard Kit (Vue)"
        description="Vue 3로 구현한 대시보드 키트"
      />

      <div className="flex gap-2 mb-6">
        <Badge variant="primary">Vue 3</Badge>
        <Badge variant="secondary">통계 카드</Badge>
        <Badge variant="secondary">차트</Badge>
        <Badge variant="secondary">활동 피드</Badge>
      </div>

      <Tabs defaultValue="composables" className="w-full">
        <TabsList>
          <TabsTrigger value="composables">Composables</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="components">컴포넌트</TabsTrigger>
        </TabsList>

        <TabsContent value="composables">
          <Section level="h2">
            <Heading
              level="h2"
              id="composables"
              title="Dashboard Composables"
            />
            <CodeBlock code={composablesCode} language="typescript" />
          </Section>
        </TabsContent>

        <TabsContent value="dashboard">
          <Section level="h2">
            <Heading level="h2" id="dashboard" title="대시보드 페이지" />
            <CodeBlock code={dashboardComponent} language="vue" />
          </Section>
        </TabsContent>

        <TabsContent value="components">
          <Section level="h2">
            <Heading level="h2" id="stat-card" title="StatCard" />
            <CodeBlock code={statCardComponent} language="vue" />
          </Section>

          <Section level="h2">
            <Heading level="h2" id="activity-feed" title="ActivityFeed" />
            <CodeBlock code={activityFeedComponent} language="vue" />
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Table Kit (Vue)', href: '/kits/vue/table' }}
        next={{ title: 'Search Kit (Vue)', href: '/kits/vue/search' }}
      />
    </>
  );
}
