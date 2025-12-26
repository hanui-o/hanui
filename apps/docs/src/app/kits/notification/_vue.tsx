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
const typeCode = `// src/types/notification.ts
// 알림 타입
export type NotificationType = 'info' | 'success' | 'warning' | 'error'
export type NotificationPriority = 'low' | 'normal' | 'high' | 'urgent'
export type NotificationStatus = 'unread' | 'read' | 'archived'

// 알림 아이템
export interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  priority: NotificationPriority
  status: NotificationStatus
  timestamp: string
  readAt?: string
  category?: string
  sender?: {
    id: string
    name: string
    avatar?: string
  }
  actions?: NotificationAction[]
  link?: string
}

// 알림 액션
export interface NotificationAction {
  id: string
  label: string
  type: 'primary' | 'secondary' | 'danger'
  href?: string
  onClick?: () => void
}

// 토스트 알림
export interface ToastNotification {
  id: string
  title?: string
  message: string
  type: NotificationType
  duration?: number
  dismissible?: boolean
  action?: NotificationAction
}

// 알림 설정
export interface NotificationSettings {
  enabled: boolean
  email: boolean
  push: boolean
  sound: boolean
  categories: Record<string, { enabled: boolean; email: boolean; push: boolean }>
  quietHours?: { enabled: boolean; start: string; end: string }
}`;

// API 코드 (DummyJSON 사용)
const apiCode = `// src/api/notification.ts
import axios from 'axios'
import type { Notification } from '@/types/notification'

// 🔗 DummyJSON 무료 API (테스트용)
// 실제 프로젝트에서는 환경변수로 관리: import.meta.env.VITE_API_URL
const API_URL = 'https://dummyjson.com'
const api = axios.create({ baseURL: API_URL })

// 알림 목록 조회 (댓글 데이터로 시뮬레이션)
export async function getNotifications(limit = 10, skip = 0) {
  const { data } = await api.get(\`/comments?limit=\${limit}&skip=\${skip}\`)

  const notifications: Notification[] = data.comments.map((c) => ({
    id: String(c.id),
    title: '새 댓글',
    message: c.body,
    type: 'info',
    priority: 'normal',
    status: Math.random() > 0.5 ? 'unread' : 'read',
    timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    sender: { id: String(c.user.id), name: c.user.fullName },
  }))

  return {
    notifications,
    total: data.total,
    hasMore: skip + limit < data.total,
    page: Math.floor(skip / limit) + 1,
  }
}

// 읽지 않은 개수 (로컬 상태에서 계산)
export function getUnreadCount(): number {
  const stored = localStorage.getItem('notifications-read') || '[]'
  const read = JSON.parse(stored)
  return Math.max(0, 10 - read.length)
}

// 알림 읽음 처리 (로컬 저장)
export function markAsRead(id: string): void {
  const stored = localStorage.getItem('notifications-read') || '[]'
  const read = JSON.parse(stored)
  if (!read.includes(id)) {
    read.push(id)
    localStorage.setItem('notifications-read', JSON.stringify(read))
  }
}

// 모든 알림 읽음 처리
export function markAllAsRead(): void {
  const allIds = Array.from({ length: 100 }, (_, i) => String(i + 1))
  localStorage.setItem('notifications-read', JSON.stringify(allIds))
}

// 알림 삭제 (로컬 저장)
export function deleteNotification(id: string): void {
  const stored = localStorage.getItem('notifications-deleted') || '[]'
  const deleted = JSON.parse(stored)
  deleted.push(id)
  localStorage.setItem('notifications-deleted', JSON.stringify(deleted))
}`;

// Vue Query Composables
const composablesCode = `// src/composables/useNotification.ts
import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { useNotificationStore } from '@/store/notificationStore'
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount,
} from '@/api/notification'

// Query Keys
export const notificationKeys = {
  all: ['notification'] as const,
  lists: () => [...notificationKeys.all, 'list'] as const,
  unreadCount: () => [...notificationKeys.all, 'unreadCount'] as const,
}

// 알림 목록 (무한 스크롤)
export function useNotifications(limit = 10) {
  const store = useNotificationStore()

  return useInfiniteQuery({
    queryKey: notificationKeys.lists(),
    queryFn: ({ pageParam = 0 }) => getNotifications(limit, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page * limit : undefined,
    onSuccess: (data) => {
      const allNotifications = data.pages.flatMap((p) => p.notifications)
      store.setNotifications(allNotifications)
    },
  })
}

// 읽지 않은 개수
export function useUnreadCount() {
  const store = useNotificationStore()

  return useQuery({
    queryKey: notificationKeys.unreadCount(),
    queryFn: getUnreadCount,
    refetchInterval: 60 * 1000, // 1분마다
    onSuccess: (count) => {
      store.unreadCount = count
    },
  })
}

// 읽음 처리
export function useMarkAsRead() {
  const queryClient = useQueryClient()
  const store = useNotificationStore()

  return useMutation({
    mutationFn: markAsRead,
    onSuccess: (_, id) => {
      store.markAsRead(id)
      queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount() })
    },
  })
}

// 모두 읽음 처리
export function useMarkAllAsRead() {
  const queryClient = useQueryClient()
  const store = useNotificationStore()

  return useMutation({
    mutationFn: markAllAsRead,
    onSuccess: () => {
      store.markAllAsRead()
      queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount() })
    },
  })
}

// 알림 삭제
export function useDeleteNotification() {
  const queryClient = useQueryClient()
  const store = useNotificationStore()

  return useMutation({
    mutationFn: deleteNotification,
    onSuccess: (_, id) => {
      store.removeNotification(id)
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() })
    },
  })
}`;

// Pinia Store 코드
const storeCode = `// src/store/notificationStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Notification, ToastNotification } from '@/types/notification'

export const useNotificationStore = defineStore('notification', () => {
  // State
  const notifications = ref<Notification[]>([])
  const unreadCount = ref(0)
  const isPanelOpen = ref(false)
  const toasts = ref<ToastNotification[]>([])

  // Getters
  const unreadNotifications = computed(() =>
    notifications.value.filter((n) => n.status === 'unread')
  )

  // Actions
  function setNotifications(items: Notification[]) {
    notifications.value = items
    unreadCount.value = items.filter((n) => n.status === 'unread').length
  }

  function addNotification(notification: Notification) {
    notifications.value.unshift(notification)
    if (notification.status === 'unread') {
      unreadCount.value++
    }
  }

  function markAsRead(id: string) {
    const notification = notifications.value.find((n) => n.id === id)
    if (notification && notification.status === 'unread') {
      notification.status = 'read'
      unreadCount.value = Math.max(0, unreadCount.value - 1)
    }
  }

  function markAllAsRead() {
    notifications.value.forEach((n) => (n.status = 'read'))
    unreadCount.value = 0
  }

  function removeNotification(id: string) {
    const index = notifications.value.findIndex((n) => n.id === id)
    if (index > -1) {
      if (notifications.value[index].status === 'unread') {
        unreadCount.value = Math.max(0, unreadCount.value - 1)
      }
      notifications.value.splice(index, 1)
    }
  }

  function togglePanel() {
    isPanelOpen.value = !isPanelOpen.value
  }

  function closePanel() {
    isPanelOpen.value = false
  }

  // 토스트 관련
  function addToast(toast: Omit<ToastNotification, 'id'>) {
    const id = \`toast-\${Date.now()}\`
    const newToast = { ...toast, id, duration: toast.duration ?? 5000 }
    toasts.value.push(newToast)

    // 자동 제거
    if (newToast.duration > 0) {
      setTimeout(() => removeToast(id), newToast.duration)
    }
    return id
  }

  function removeToast(id: string) {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  function clearToasts() {
    toasts.value = []
  }

  return {
    notifications,
    unreadCount,
    isPanelOpen,
    toasts,
    unreadNotifications,
    setNotifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    togglePanel,
    closePanel,
    addToast,
    removeToast,
    clearToasts,
  }
})`;

// 사용 예시 코드
const usageCode = `<!-- src/views/NotificationDemo.vue -->
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useNotificationStore } from '@/store/notificationStore'
import {
  useNotifications,
  useUnreadCount,
  useMarkAllAsRead,
} from '@/composables/useNotification'

const store = useNotificationStore()
const { data, fetchNextPage, hasNextPage, isLoading } = useNotifications()
const { mutate: markAllRead } = useMarkAllAsRead()

// 읽지 않은 개수 폴링
useUnreadCount()

// ESC 키로 닫기
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') store.closePanel()
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

// 무한 스크롤
function handleScroll(e: Event) {
  const target = e.target as HTMLElement
  if (target.scrollHeight - target.scrollTop <= target.clientHeight + 100) {
    if (hasNextPage.value) fetchNextPage()
  }
}

// 시간 포맷
function formatTime(timestamp: string) {
  const diff = Date.now() - new Date(timestamp).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return \`\${minutes}분 전\`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return \`\${hours}시간 전\`
  return \`\${Math.floor(hours / 24)}일 전\`
}

// 토스트 헬퍼
function toast(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') {
  store.addToast({ message, type })
}
</script>

<template>
  <div class="p-4">
    <!-- 알림 벨 -->
    <button
      class="relative p-2 rounded-full hover:bg-gray-100"
      :aria-label="\`알림 \${store.unreadCount}개\`"
      @click="store.togglePanel"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      <span
        v-if="store.unreadCount > 0"
        class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
      >
        {{ store.unreadCount > 99 ? '99+' : store.unreadCount }}
      </span>
    </button>

    <!-- 토스트 버튼 -->
    <div class="mt-4 space-x-2">
      <button @click="toast('저장되었습니다', 'success')" class="px-3 py-1 bg-green-100 rounded">성공</button>
      <button @click="toast('오류 발생', 'error')" class="px-3 py-1 bg-red-100 rounded">오류</button>
    </div>

    <!-- 알림 센터 패널 -->
    <Teleport to="body">
      <div
        v-if="store.isPanelOpen"
        class="fixed inset-0 z-50"
        @click="store.closePanel"
      >
        <div
          class="absolute right-4 top-16 w-96 max-h-[80vh] bg-white rounded-lg shadow-xl flex flex-col"
          role="dialog"
          aria-modal="true"
          @click.stop
        >
          <!-- 헤더 -->
          <div class="flex items-center justify-between p-4 border-b">
            <h2 class="text-lg font-semibold">알림</h2>
            <button
              v-if="store.unreadCount > 0"
              class="text-sm text-blue-600 hover:underline"
              @click="markAllRead"
            >
              모두 읽음
            </button>
          </div>

          <!-- 알림 목록 -->
          <div class="flex-1 overflow-y-auto" @scroll="handleScroll">
            <div v-if="isLoading" class="p-4 text-center text-gray-500">
              로딩 중...
            </div>
            <template v-else-if="store.notifications.length">
              <div
                v-for="notification in store.notifications"
                :key="notification.id"
                class="p-4 border-b hover:bg-gray-50 cursor-pointer"
                :class="{ 'bg-blue-50': notification.status === 'unread' }"
              >
                <p class="font-medium text-sm">{{ notification.title }}</p>
                <p class="text-gray-600 text-sm">{{ notification.message }}</p>
                <p class="text-xs text-gray-400 mt-1">{{ formatTime(notification.timestamp) }}</p>
              </div>
            </template>
            <div v-else class="p-8 text-center text-gray-500">
              새로운 알림이 없습니다
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- 토스트 컨테이너 -->
    <div class="fixed top-4 right-4 space-y-2 z-50">
      <div
        v-for="t in store.toasts"
        :key="t.id"
        class="p-4 rounded-lg shadow-lg"
        :class="{
          'bg-green-100': t.type === 'success',
          'bg-red-100': t.type === 'error',
          'bg-yellow-100': t.type === 'warning',
          'bg-blue-100': t.type === 'info',
        }"
        role="alert"
      >
        {{ t.message }}
        <button @click="store.removeToast(t.id)" class="ml-2">×</button>
      </div>
    </div>
  </div>
</template>`;

export function VueNotificationContent() {
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
            <Badge variant="outline-gray">TypeScript</Badge>
          </div>
        </Section>

        {/* 기능 */}
        <Section level="h2">
          <Heading level="h2" id="features" title="기능" />
          <List className="mt-4">
            <ListItem>알림 벨 아이콘 (읽지 않은 개수 뱃지)</ListItem>
            <ListItem>알림 센터 패널 (슬라이드 패널)</ListItem>
            <ListItem>알림 아이템 (읽음/읽지않음, 삭제, 액션 버튼)</ListItem>
            <ListItem>토스트 알림 (자동 닫기, 수동 닫기)</ListItem>
            <ListItem>무한 스크롤 목록</ListItem>
            <ListItem>알림 일괄 읽음 처리</ListItem>
            <ListItem>ESC 키로 패널 닫기</ListItem>
          </List>
        </Section>

        {/* 파일 구조 */}
        <Section level="h2">
          <Heading level="h2" id="file-structure" title="파일 구조" />
          <Code variant="block" language="bash">
            {`src/
├── api/
│   └── notification.ts       # API 함수 (DummyJSON)
├── composables/
│   └── useNotification.ts    # Vue Query 훅
├── store/
│   └── notificationStore.ts  # Pinia 스토어
├── components/notification/
│   ├── NotificationBell.vue    # 알림 벨 아이콘
│   ├── NotificationItem.vue    # 개별 알림 아이템
│   ├── NotificationCenter.vue  # 알림 센터 패널
│   └── ToastContainer.vue      # 토스트 컨테이너
└── types/
    └── notification.ts         # 타입 정의`}
          </Code>
        </Section>

        {/* 설치 */}
        <Section level="h2">
          <Heading level="h2" id="installation" title="설치" />

          <Subsection level="h3">
            <Heading level="h3" title="1. 의존성 설치" />
            <Code variant="block" language="bash">
              {`npm install pinia @tanstack/vue-query axios`}
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
              {`// api/notification.ts
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
              알림 벨에 <Code>aria-label</Code>로 읽지 않은 개수 표시
            </ListItem>
            <ListItem>
              알림 센터 패널은 <Code>role="dialog"</Code>,{' '}
              <Code>aria-modal</Code> 적용
            </ListItem>
            <ListItem>ESC 키로 패널 닫기 지원</ListItem>
            <ListItem>
              토스트는 <Code>role="alert"</Code> 적용
            </ListItem>
            <ListItem>삭제/읽음 처리 버튼에 적절한 라벨 제공</ListItem>
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
                  <Code>getNotifications</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">limit?, skip?</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">NotificationListResponse</Code>
                </TableCell>
                <TableCell>알림 목록 조회</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>markAsRead</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">id</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">void</Code>
                </TableCell>
                <TableCell>알림 읽음 처리</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>markAllAsRead</Code>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <Code className="text-xs">void</Code>
                </TableCell>
                <TableCell>모든 알림 읽음 처리</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>deleteNotification</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">id</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">void</Code>
                </TableCell>
                <TableCell>알림 삭제</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>getUnreadCount</Code>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <Code className="text-xs">number</Code>
                </TableCell>
                <TableCell>읽지 않은 개수</TableCell>
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
                  <Code>useNotifications</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">limit?</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">UseInfiniteQueryResult</Code>
                </TableCell>
                <TableCell>알림 목록 (무한 스크롤)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>useUnreadCount</Code>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <Code className="text-xs">UseQueryResult</Code>
                </TableCell>
                <TableCell>읽지 않은 개수 (1분 갱신)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>useMarkAsRead</Code>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <Code className="text-xs">UseMutationResult</Code>
                </TableCell>
                <TableCell>알림 읽음 처리</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>useMarkAllAsRead</Code>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <Code className="text-xs">UseMutationResult</Code>
                </TableCell>
                <TableCell>모든 알림 읽음 처리</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>useDeleteNotification</Code>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <Code className="text-xs">UseMutationResult</Code>
                </TableCell>
                <TableCell>알림 삭제</TableCell>
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
                    <Code>notifications</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">Notification[]</Code>
                  </TableCell>
                  <TableCell>알림 목록</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>unreadCount</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">number</Code>
                  </TableCell>
                  <TableCell>읽지 않은 알림 개수</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>isPanelOpen</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">boolean</Code>
                  </TableCell>
                  <TableCell>알림 패널 열림 여부</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>toasts</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">ToastNotification[]</Code>
                  </TableCell>
                  <TableCell>토스트 알림 목록</TableCell>
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
                    <Code>setNotifications</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">items</Code>
                  </TableCell>
                  <TableCell>알림 목록 설정</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>addNotification</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">notification</Code>
                  </TableCell>
                  <TableCell>알림 추가</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>markAsRead</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">id</Code>
                  </TableCell>
                  <TableCell>알림 읽음 처리</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>markAllAsRead</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>모든 알림 읽음 처리</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>removeNotification</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">id</Code>
                  </TableCell>
                  <TableCell>알림 삭제</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>togglePanel</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>패널 열기/닫기</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>addToast</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">toast</Code>
                  </TableCell>
                  <TableCell>토스트 추가</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>removeToast</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">id</Code>
                  </TableCell>
                  <TableCell>토스트 제거</TableCell>
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
