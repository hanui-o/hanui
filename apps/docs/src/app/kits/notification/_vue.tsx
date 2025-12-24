'use client';

import { PageSection as Section, Heading } from '@/components/content';
import { CodeBlock } from '@/components/content/CodeBlock';
import {
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  List,
  ListItem,
} from '@hanui/react';

// Pinia Store
const storeCode = `// src/features/notification/stores/notificationStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  status: 'unread' | 'read'
  timestamp: string
  sender?: { id: string; name: string }
}

export const useNotificationStore = defineStore('notification', () => {
  // State
  const notifications = ref<Notification[]>([])
  const unreadCount = ref(0)
  const isPanelOpen = ref(false)

  // Getters
  const unreadNotifications = computed(() =>
    notifications.value.filter(n => n.status === 'unread')
  )

  // Actions
  function setNotifications(items: Notification[]) {
    notifications.value = items
    unreadCount.value = items.filter(n => n.status === 'unread').length
  }

  function markAsRead(id: string) {
    const notification = notifications.value.find(n => n.id === id)
    if (notification && notification.status === 'unread') {
      notification.status = 'read'
      unreadCount.value = Math.max(0, unreadCount.value - 1)
    }
  }

  function markAllAsRead() {
    notifications.value.forEach(n => n.status = 'read')
    unreadCount.value = 0
  }

  function removeNotification(id: string) {
    const index = notifications.value.findIndex(n => n.id === id)
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

  return {
    notifications,
    unreadCount,
    isPanelOpen,
    unreadNotifications,
    setNotifications,
    markAsRead,
    markAllAsRead,
    removeNotification,
    togglePanel,
    closePanel,
  }
})`;

// Composables
const composablesCode = `// src/features/notification/composables/useNotification.ts
import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { computed } from 'vue'
import { useNotificationStore } from '../stores/notificationStore'
import { getNotifications, markAsRead, markAllAsRead, deleteNotification, getUnreadCount } from '../api/notificationApi'

// 알림 목록 (무한 스크롤)
export function useNotifications(limit = 10) {
  const store = useNotificationStore()

  return useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: ({ pageParam = 0 }) => getNotifications(limit, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page * limit : undefined,
    onSuccess: (data) => {
      const allNotifications = data.pages.flatMap(p => p.notifications)
      store.setNotifications(allNotifications)
    },
  })
}

// 읽지 않은 개수
export function useUnreadCount() {
  const store = useNotificationStore()

  return useQuery({
    queryKey: ['notifications', 'unreadCount'],
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
      queryClient.invalidateQueries(['notifications', 'unreadCount'])
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
      queryClient.invalidateQueries(['notifications', 'unreadCount'])
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
      queryClient.invalidateQueries(['notifications'])
    },
  })
}`;

// 알림 벨 컴포넌트
const bellComponent = `<!-- src/components/notification/NotificationBell.vue -->
<script setup lang="ts">
import { useNotificationStore } from '@/features/notification/stores/notificationStore'
import { useUnreadCount } from '@/features/notification/composables/useNotification'

const store = useNotificationStore()
useUnreadCount()
</script>

<template>
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
</template>`;

// 알림 센터 패널
const centerComponent = `<!-- src/components/notification/NotificationCenter.vue -->
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useNotificationStore } from '@/features/notification/stores/notificationStore'
import { useNotifications, useMarkAllAsRead } from '@/features/notification/composables/useNotification'
import NotificationItem from './NotificationItem.vue'

const store = useNotificationStore()
const { data, fetchNextPage, hasNextPage, isLoading } = useNotifications()
const { mutate: markAllRead } = useMarkAllAsRead()

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
</script>

<template>
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
        aria-label="알림 센터"
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
        <div
          class="flex-1 overflow-y-auto"
          @scroll="handleScroll"
        >
          <div v-if="isLoading" class="p-4 text-center text-gray-500">
            로딩 중...
          </div>
          <template v-else-if="store.notifications.length">
            <NotificationItem
              v-for="notification in store.notifications"
              :key="notification.id"
              :notification="notification"
            />
          </template>
          <div v-else class="p-8 text-center text-gray-500">
            새로운 알림이 없습니다
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>`;

// 알림 아이템 컴포넌트
const itemComponent = `<!-- src/components/notification/NotificationItem.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useMarkAsRead, useDeleteNotification } from '@/features/notification/composables/useNotification'
import type { Notification } from '@/features/notification/stores/notificationStore'

const props = defineProps<{ notification: Notification }>()

const { mutate: markRead } = useMarkAsRead()
const { mutate: deleteNotification } = useDeleteNotification()

const isUnread = computed(() => props.notification.status === 'unread')

function formatTime(timestamp: string) {
  const diff = Date.now() - new Date(timestamp).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return \`\${minutes}분 전\`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return \`\${hours}시간 전\`
  return \`\${Math.floor(hours / 24)}일 전\`
}

function handleClick() {
  if (isUnread.value) {
    markRead(props.notification.id)
  }
}
</script>

<template>
  <div
    class="p-4 border-b hover:bg-gray-50 cursor-pointer flex gap-3"
    :class="{ 'bg-blue-50': isUnread }"
    @click="handleClick"
  >
    <!-- 아바타 -->
    <div
      class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600"
    >
      {{ notification.sender?.name.charAt(0) || '!' }}
    </div>

    <!-- 내용 -->
    <div class="flex-1 min-w-0">
      <p class="font-medium text-sm">{{ notification.title }}</p>
      <p class="text-gray-600 text-sm truncate">{{ notification.message }}</p>
      <p class="text-xs text-gray-400 mt-1">{{ formatTime(notification.timestamp) }}</p>
    </div>

    <!-- 삭제 버튼 -->
    <button
      class="text-gray-400 hover:text-red-500"
      aria-label="삭제"
      @click.stop="deleteNotification(notification.id)"
    >
      ×
    </button>
  </div>
</template>`;

export function VueNotificationContent() {
  return (
    <>
      <div className="flex gap-2 mb-6">
        <Badge variant="primary">Vue 3</Badge>
        <Badge variant="secondary">알림 센터</Badge>
        <Badge variant="secondary">무한 스크롤</Badge>
        <Badge variant="secondary">실시간</Badge>
      </div>

      {/* 기능 */}
      <Section level="h2">
        <Heading level="h2" id="features" title="기능" />
        <List className="mt-4">
          <ListItem>알림 벨 아이콘 (읽지 않은 개수 뱃지)</ListItem>
          <ListItem>알림 센터 패널 (슬라이드 패널)</ListItem>
          <ListItem>알림 아이템 (읽음/읽지않음, 삭제)</ListItem>
          <ListItem>무한 스크롤 목록</ListItem>
          <ListItem>모든 알림 읽음 처리</ListItem>
          <ListItem>ESC 키로 패널 닫기</ListItem>
        </List>
      </Section>

      <Tabs defaultValue="store" className="w-full mt-8">
        <TabsList>
          <TabsTrigger value="store">Store</TabsTrigger>
          <TabsTrigger value="composables">Composables</TabsTrigger>
          <TabsTrigger value="components">컴포넌트</TabsTrigger>
        </TabsList>

        <TabsContent value="store">
          <Section level="h2">
            <Heading level="h2" id="store" title="Pinia Notification Store" />
            <CodeBlock code={storeCode} language="typescript" />
          </Section>
        </TabsContent>

        <TabsContent value="composables">
          <Section level="h2">
            <Heading
              level="h2"
              id="composables"
              title="Notification Composables"
            />
            <CodeBlock code={composablesCode} language="typescript" />
          </Section>
        </TabsContent>

        <TabsContent value="components">
          <Section level="h2">
            <Heading level="h2" id="bell" title="NotificationBell" />
            <CodeBlock code={bellComponent} language="vue" />
          </Section>

          <Section level="h2">
            <Heading level="h2" id="center" title="NotificationCenter" />
            <CodeBlock code={centerComponent} language="vue" />
          </Section>

          <Section level="h2">
            <Heading level="h2" id="item" title="NotificationItem" />
            <CodeBlock code={itemComponent} language="vue" />
          </Section>
        </TabsContent>
      </Tabs>
    </>
  );
}
