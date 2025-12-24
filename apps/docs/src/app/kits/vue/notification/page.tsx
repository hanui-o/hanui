'use client';

import {
  PageSection as Section,
  Heading,
  PageNavigation,
} from '@/components/content';
import { CodeBlock } from '@/components/content/CodeBlock';
import { Badge, Tabs, TabsList, TabsTrigger, TabsContent } from '@hanui/react';

// Pinia Store
const storeCode = `// src/features/notification/stores/notificationStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNotificationStore = defineStore('notification', () => {
  // State
  const isOpen = ref(false)
  const readIds = ref<Set<string>>(new Set())
  const deletedIds = ref<Set<string>>(new Set())

  // Actions
  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  function toggle() {
    isOpen.value = !isOpen.value
  }

  function markAsRead(id: string) {
    readIds.value.add(id)
    saveToStorage()
  }

  function markAllAsRead(ids: string[]) {
    ids.forEach(id => readIds.value.add(id))
    saveToStorage()
  }

  function deleteNotification(id: string) {
    deletedIds.value.add(id)
    saveToStorage()
  }

  function isRead(id: string) {
    return readIds.value.has(id)
  }

  function isDeleted(id: string) {
    return deletedIds.value.has(id)
  }

  function saveToStorage() {
    localStorage.setItem('notifications-read', JSON.stringify([...readIds.value]))
    localStorage.setItem('notifications-deleted', JSON.stringify([...deletedIds.value]))
  }

  function loadFromStorage() {
    const read = localStorage.getItem('notifications-read')
    const deleted = localStorage.getItem('notifications-deleted')
    if (read) readIds.value = new Set(JSON.parse(read))
    if (deleted) deletedIds.value = new Set(JSON.parse(deleted))
  }

  return {
    isOpen,
    readIds,
    deletedIds,
    open,
    close,
    toggle,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    isRead,
    isDeleted,
    loadFromStorage,
  }
})`;

// Composables
const composablesCode = `// src/features/notification/composables/useNotifications.ts
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { computed } from 'vue'
import { useNotificationStore } from '../stores/notificationStore'
import { getNotifications, markAsRead, markAllAsRead, deleteNotification } from '../api/notificationApi'

export const notificationKeys = {
  all: ['notifications'] as const,
  list: () => [...notificationKeys.all, 'list'] as const,
}

// 알림 목록 (무한 스크롤)
export function useNotifications() {
  const store = useNotificationStore()

  return useInfiniteQuery({
    queryKey: notificationKeys.list(),
    queryFn: ({ pageParam = 0 }) => getNotifications(10, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page * 10 : undefined,
    select: (data) => ({
      pages: data.pages.map(page => ({
        ...page,
        notifications: page.notifications.filter(n => !store.isDeleted(n.id)),
      })),
      pageParams: data.pageParams,
    }),
  })
}

// 읽지 않은 알림 수
export function useUnreadCount() {
  const store = useNotificationStore()
  const { data } = useNotifications()

  return computed(() => {
    if (!data.value) return 0
    return data.value.pages
      .flatMap(page => page.notifications)
      .filter(n => !store.isRead(n.id))
      .length
  })
}

// 읽음 처리
export function useMarkAsRead() {
  const store = useNotificationStore()

  return (id: string) => {
    store.markAsRead(id)
  }
}

// 전체 읽음 처리
export function useMarkAllAsRead() {
  const store = useNotificationStore()
  const { data } = useNotifications()

  return () => {
    const ids = data.value?.pages
      .flatMap(page => page.notifications)
      .map(n => n.id) || []
    store.markAllAsRead(ids)
  }
}

// 삭제
export function useDeleteNotification() {
  const store = useNotificationStore()

  return (id: string) => {
    store.deleteNotification(id)
  }
}`;

// 알림 컴포넌트
const notificationComponent = `<!-- src/components/notification/NotificationDropdown.vue -->
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useNotificationStore } from '@/features/notification/stores/notificationStore'
import {
  useNotifications,
  useUnreadCount,
  useMarkAsRead,
  useMarkAllAsRead,
  useDeleteNotification
} from '@/features/notification/composables/useNotifications'

const store = useNotificationStore()
const dropdownRef = ref<HTMLElement | null>(null)

const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useNotifications()
const unreadCount = useUnreadCount()
const markAsRead = useMarkAsRead()
const markAllAsRead = useMarkAllAsRead()
const deleteNotification = useDeleteNotification()

// 외부 클릭 감지
function handleClickOutside(e: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    store.close()
  }
}

onMounted(() => {
  store.loadFromStorage()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

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
  <div ref="dropdownRef" class="relative">
    <!-- 알림 버튼 -->
    <button
      @click="store.toggle"
      class="relative p-2 hover:bg-gray-100 rounded-full"
    >
      <span class="text-xl">🔔</span>
      <span
        v-if="unreadCount > 0"
        class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
      >
        {{ unreadCount > 9 ? '9+' : unreadCount }}
      </span>
    </button>

    <!-- 드롭다운 -->
    <div
      v-if="store.isOpen"
      class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50"
    >
      <!-- 헤더 -->
      <div class="flex items-center justify-between p-3 border-b">
        <h3 class="font-semibold">알림</h3>
        <button
          v-if="unreadCount > 0"
          @click="markAllAsRead"
          class="text-sm text-blue-600 hover:underline"
        >
          모두 읽음
        </button>
      </div>

      <!-- 알림 목록 -->
      <div class="max-h-96 overflow-y-auto">
        <template v-for="page in data?.pages" :key="page.page">
          <div
            v-for="notification in page.notifications"
            :key="notification.id"
            class="p-3 border-b hover:bg-gray-50 flex items-start gap-3"
            :class="{ 'bg-blue-50': !store.isRead(notification.id) }"
            @click="markAsRead(notification.id)"
          >
            <div class="flex-1 min-w-0">
              <p class="font-medium text-sm">{{ notification.title }}</p>
              <p class="text-gray-600 text-sm line-clamp-2">
                {{ notification.message }}
              </p>
              <p class="text-xs text-gray-400 mt-1">
                {{ formatTime(notification.timestamp) }}
              </p>
            </div>
            <button
              @click.stop="deleteNotification(notification.id)"
              class="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </template>

        <!-- 더 보기 -->
        <button
          v-if="hasNextPage"
          @click="fetchNextPage"
          :disabled="isFetchingNextPage"
          class="w-full p-3 text-center text-blue-600 hover:bg-gray-50"
        >
          {{ isFetchingNextPage ? '로딩 중...' : '더 보기' }}
        </button>
      </div>
    </div>
  </div>
</template>`;

export default function VueNotificationKitPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Notification Kit (Vue)"
        description="Vue 3로 구현한 알림 기능 키트"
      />

      <div className="flex gap-2 mb-6">
        <Badge variant="primary">Vue 3</Badge>
        <Badge variant="secondary">무한 스크롤</Badge>
        <Badge variant="secondary">읽음 처리</Badge>
        <Badge variant="secondary">로컬 저장</Badge>
      </div>

      <Tabs defaultValue="store" className="w-full">
        <TabsList>
          <TabsTrigger value="store">Store</TabsTrigger>
          <TabsTrigger value="composables">Composables</TabsTrigger>
          <TabsTrigger value="component">컴포넌트</TabsTrigger>
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

        <TabsContent value="component">
          <Section level="h2">
            <Heading level="h2" id="notification" title="알림 드롭다운" />
            <CodeBlock code={notificationComponent} language="vue" />
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Search Kit (Vue)', href: '/kits/vue/search' }}
        next={{ title: 'Kits Overview', href: '/kits' }}
      />
    </>
  );
}
