'use client';

import { PageSection as Section, Heading } from '@/components/content';
import { CodeBlock } from '@/components/content/CodeBlock';
import { Badge, Tabs, TabsList, TabsTrigger, TabsContent } from '@hanui/react';

// Pinia Store
const storeCode = `// src/features/search/stores/searchStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSearchStore = defineStore('search', () => {
  // State
  const query = ref('')
  const recentSearches = ref<string[]>([])
  const isOpen = ref(false)

  // Actions
  function setQuery(value: string) {
    query.value = value
  }

  function addRecentSearch(keyword: string) {
    if (!keyword.trim()) return
    // 중복 제거 후 앞에 추가
    recentSearches.value = [
      keyword,
      ...recentSearches.value.filter(s => s !== keyword)
    ].slice(0, 10)
    // localStorage에 저장
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches.value))
  }

  function removeRecentSearch(keyword: string) {
    recentSearches.value = recentSearches.value.filter(s => s !== keyword)
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches.value))
  }

  function clearRecentSearches() {
    recentSearches.value = []
    localStorage.removeItem('recentSearches')
  }

  function loadRecentSearches() {
    const saved = localStorage.getItem('recentSearches')
    if (saved) {
      recentSearches.value = JSON.parse(saved)
    }
  }

  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
    query.value = ''
  }

  return {
    query,
    recentSearches,
    isOpen,
    setQuery,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
    loadRecentSearches,
    open,
    close,
  }
})`;

// Composables
const composablesCode = `// src/features/search/composables/useSearch.ts
import { useQuery } from '@tanstack/vue-query'
import { computed, ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useSearchStore } from '../stores/searchStore'
import { search, getAutocomplete, getPopularSearches } from '../api/searchApi'

// 검색 결과
export function useSearch() {
  const store = useSearchStore()

  return useQuery({
    queryKey: computed(() => ['search', store.query]),
    queryFn: () => search(store.query),
    enabled: computed(() => store.query.length >= 2),
    staleTime: 60 * 1000,
  })
}

// 자동완성
export function useAutocomplete() {
  const store = useSearchStore()
  const debouncedQuery = ref('')

  // 300ms 디바운스
  const updateQuery = useDebounceFn((q: string) => {
    debouncedQuery.value = q
  }, 300)

  watch(() => store.query, updateQuery)

  return useQuery({
    queryKey: computed(() => ['autocomplete', debouncedQuery.value]),
    queryFn: () => getAutocomplete(debouncedQuery.value),
    enabled: computed(() => debouncedQuery.value.length >= 1),
    staleTime: 30 * 1000,
  })
}

// 인기 검색어
export function usePopularSearches() {
  return useQuery({
    queryKey: ['popularSearches'],
    queryFn: getPopularSearches,
    staleTime: 5 * 60 * 1000, // 5분
  })
}`;

// 검색 컴포넌트
const searchComponent = `<!-- src/components/search/SearchModal.vue -->
<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSearchStore } from '@/features/search/stores/searchStore'
import { useAutocomplete, usePopularSearches } from '@/features/search/composables/useSearch'

const store = useSearchStore()
const router = useRouter()

const { data: autocomplete, isLoading: autoLoading } = useAutocomplete()
const { data: popular } = usePopularSearches()

// 최근 검색어 로드
onMounted(() => {
  store.loadRecentSearches()
})

// ESC 키로 닫기
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') store.close()
}

// 검색 실행
function handleSearch(keyword: string) {
  store.addRecentSearch(keyword)
  store.close()
  router.push({ path: '/search', query: { q: keyword } })
}

// 외부 클릭으로 닫기
function handleBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) store.close()
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="store.isOpen"
      class="fixed inset-0 bg-black/50 flex items-start justify-center pt-20 z-50"
      @click="handleBackdropClick"
      @keydown="handleKeydown"
    >
      <div class="w-full max-w-2xl bg-white rounded-lg shadow-xl">
        <!-- 검색 입력 -->
        <div class="p-4 border-b">
          <input
            v-model="store.query"
            type="text"
            placeholder="검색어를 입력하세요..."
            class="w-full text-lg p-2 outline-none"
            autofocus
            @keydown.enter="handleSearch(store.query)"
          />
        </div>

        <div class="max-h-96 overflow-y-auto">
          <!-- 자동완성 결과 -->
          <div v-if="store.query && autocomplete?.length" class="p-2">
            <p class="text-xs text-gray-500 px-3 py-1">추천 검색어</p>
            <button
              v-for="item in autocomplete"
              :key="item.id"
              class="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-2"
              @click="handleSearch(item.text)"
            >
              <span class="text-gray-400">🔍</span>
              <span>{{ item.text }}</span>
              <span class="text-xs text-gray-400 ml-auto">{{ item.category }}</span>
            </button>
          </div>

          <!-- 검색어가 없을 때: 최근 검색어 + 인기 검색어 -->
          <template v-else-if="!store.query">
            <!-- 최근 검색어 -->
            <div v-if="store.recentSearches.length" class="p-2 border-b">
              <div class="flex items-center justify-between px-3 py-1">
                <p class="text-xs text-gray-500">최근 검색어</p>
                <button
                  class="text-xs text-blue-600"
                  @click="store.clearRecentSearches"
                >
                  전체 삭제
                </button>
              </div>
              <button
                v-for="keyword in store.recentSearches"
                :key="keyword"
                class="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-2"
                @click="handleSearch(keyword)"
              >
                <span class="text-gray-400">🕐</span>
                <span>{{ keyword }}</span>
                <button
                  class="ml-auto text-gray-400 hover:text-gray-600"
                  @click.stop="store.removeRecentSearch(keyword)"
                >
                  ×
                </button>
              </button>
            </div>

            <!-- 인기 검색어 -->
            <div v-if="popular?.length" class="p-2">
              <p class="text-xs text-gray-500 px-3 py-1">인기 검색어</p>
              <button
                v-for="(item, index) in popular"
                :key="item.query"
                class="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-2"
                @click="handleSearch(item.query)"
              >
                <span class="w-6 text-center font-bold" :class="index < 3 ? 'text-blue-600' : 'text-gray-400'">
                  {{ index + 1 }}
                </span>
                <span>{{ item.query }}</span>
                <span v-if="item.trend === 'up'" class="text-red-500 text-xs ml-auto">↑</span>
                <span v-else-if="item.trend === 'down'" class="text-blue-500 text-xs ml-auto">↓</span>
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </Teleport>
</template>`;

export function VueSearchContent() {
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Badge variant="primary">Vue 3</Badge>
        <Badge variant="secondary">자동완성</Badge>
        <Badge variant="secondary">최근 검색어</Badge>
        <Badge variant="secondary">인기 검색어</Badge>
      </div>

      <Tabs defaultValue="store" className="w-full">
        <TabsList>
          <TabsTrigger value="store">Store</TabsTrigger>
          <TabsTrigger value="composables">Composables</TabsTrigger>
          <TabsTrigger value="component">컴포넌트</TabsTrigger>
        </TabsList>

        <TabsContent value="store">
          <Section level="h2">
            <Heading level="h2" id="store" title="Pinia Search Store" />
            <CodeBlock code={storeCode} language="typescript" />
          </Section>
        </TabsContent>

        <TabsContent value="composables">
          <Section level="h2">
            <Heading level="h2" id="composables" title="Search Composables" />
            <CodeBlock code={composablesCode} language="typescript" />
          </Section>
        </TabsContent>

        <TabsContent value="component">
          <Section level="h2">
            <Heading level="h2" id="search-modal" title="검색 모달" />
            <CodeBlock code={searchComponent} language="vue" />
          </Section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
