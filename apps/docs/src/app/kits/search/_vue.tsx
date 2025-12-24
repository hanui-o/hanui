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
const typeCode = `// src/types/search.ts
// 검색 결과 타입
export interface SearchResult<T = unknown> {
  id: string | number
  title: string
  description?: string
  url?: string
  category?: string
  thumbnail?: string
  highlight?: {
    title?: string
    description?: string
  }
  data?: T
}

// 검색 파라미터
export interface SearchParams {
  query: string
  category?: string
  page?: number
  limit?: number
  filters?: Record<string, unknown>
}

// 검색 응답
export interface SearchResponse<T = unknown> {
  results: SearchResult<T>[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// 자동완성 아이템
export interface AutocompleteItem {
  id: string
  text: string
  type: 'recent' | 'popular' | 'suggestion'
  category?: string
}

// 최근 검색어
export interface RecentSearch {
  id: string
  query: string
  category?: string
  timestamp: number
}

// 인기 검색어
export interface PopularSearch {
  query: string
  count: number
  trend?: 'up' | 'down' | 'stable'
}`;

// API 코드 (DummyJSON 사용)
const apiCode = `// src/api/search.ts
import axios from 'axios'
import type { SearchResponse, AutocompleteItem, PopularSearch } from '@/types/search'

// 🔗 DummyJSON 무료 API (테스트용)
const API_URL = 'https://dummyjson.com'

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

// 검색 API (상품 검색)
export async function search(query: string, limit = 10, skip = 0): Promise<SearchResponse> {
  const { data } = await api.get('/products/search', {
    params: { q: query, limit, skip }
  })

  return {
    results: data.products.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      category: p.category,
      thumbnail: p.thumbnail,
      data: p,
    })),
    total: data.total,
    page: Math.floor(skip / limit) + 1,
    limit,
    hasMore: skip + limit < data.total,
  }
}

// 자동완성 API (상품 검색으로 시뮬레이션)
export async function getAutocomplete(query: string): Promise<AutocompleteItem[]> {
  if (!query.trim()) return []

  const { data } = await api.get('/products/search', {
    params: { q: query, limit: 5 }
  })

  return data.products.map((p) => ({
    id: String(p.id),
    text: p.title,
    type: 'suggestion' as const,
    category: p.category,
  }))
}

// 인기 검색어 (카테고리 목록으로 시뮬레이션)
export async function getPopularSearches(): Promise<PopularSearch[]> {
  const { data } = await api.get('/products/category-list')

  return data.slice(0, 10).map((cat: string, i: number) => ({
    query: cat,
    count: 100 - i * 10,
    trend: i < 3 ? 'up' : i < 6 ? 'stable' : 'down',
  }))
}`;

// Vue Query Composables
const composablesCode = `// src/composables/useSearch.ts
import { useQuery } from '@tanstack/vue-query'
import { computed, ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useSearchStore } from '@/stores/searchStore'
import { search, getAutocomplete, getPopularSearches } from '@/api/search'

// Query Keys
export const searchKeys = {
  all: ['search'] as const,
  results: (query: string) => [...searchKeys.all, 'results', query] as const,
  autocomplete: (query: string) => [...searchKeys.all, 'autocomplete', query] as const,
  popular: () => [...searchKeys.all, 'popular'] as const,
}

// 검색 결과
export function useSearch() {
  const store = useSearchStore()
  const debouncedQuery = ref('')

  // 300ms 디바운스
  const updateQuery = useDebounceFn((q: string) => {
    debouncedQuery.value = q
  }, 300)

  watch(() => store.query, updateQuery)

  return useQuery({
    queryKey: computed(() => searchKeys.results(debouncedQuery.value)),
    queryFn: () => search(debouncedQuery.value),
    enabled: computed(() => debouncedQuery.value.length >= 2),
    staleTime: 60 * 1000,
  })
}

// 자동완성
export function useAutocomplete() {
  const store = useSearchStore()
  const debouncedQuery = ref('')

  // 150ms 디바운스
  const updateQuery = useDebounceFn((q: string) => {
    debouncedQuery.value = q
  }, 150)

  watch(() => store.query, updateQuery)

  return useQuery({
    queryKey: computed(() => searchKeys.autocomplete(debouncedQuery.value)),
    queryFn: () => getAutocomplete(debouncedQuery.value),
    enabled: computed(() => debouncedQuery.value.length >= 1),
    staleTime: 30 * 1000,
  })
}

// 인기 검색어
export function usePopularSearches() {
  return useQuery({
    queryKey: searchKeys.popular(),
    queryFn: getPopularSearches,
    staleTime: 5 * 60 * 1000, // 5분
  })
}`;

// Pinia Store 코드
const storeCode = `// src/stores/searchStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { SearchResult, AutocompleteItem, RecentSearch, PopularSearch } from '@/types/search'

const MAX_RECENT_SEARCHES = 20

export const useSearchStore = defineStore('search', () => {
  // State
  const query = ref('')
  const isOpen = ref(false)
  const isSearching = ref(false)
  const results = ref<SearchResult[]>([])
  const totalResults = ref(0)
  const autocompleteItems = ref<AutocompleteItem[]>([])
  const selectedIndex = ref(-1)
  const recentSearches = ref<RecentSearch[]>([])
  const popularSearches = ref<PopularSearch[]>([])

  // Actions
  function setQuery(value: string) {
    query.value = value
    selectedIndex.value = -1
  }

  function setOpen(open: boolean) {
    isOpen.value = open
  }

  function setResults(newResults: SearchResult[], total: number) {
    results.value = newResults
    totalResults.value = total
    isSearching.value = false
  }

  function setAutocompleteItems(items: AutocompleteItem[]) {
    autocompleteItems.value = items
  }

  function moveSelection(direction: 'up' | 'down') {
    const maxIndex = autocompleteItems.value.length - 1
    if (direction === 'down') {
      selectedIndex.value = Math.min(selectedIndex.value + 1, maxIndex)
    } else {
      selectedIndex.value = Math.max(selectedIndex.value - 1, -1)
    }
  }

  function addRecentSearch(searchQuery: string, category?: string) {
    const trimmed = searchQuery.trim()
    if (!trimmed) return

    // 중복 제거
    const filtered = recentSearches.value.filter(
      (s) => s.query.toLowerCase() !== trimmed.toLowerCase()
    )

    const newSearch: RecentSearch = {
      id: \`recent-\${Date.now()}\`,
      query: trimmed,
      category,
      timestamp: Date.now(),
    }

    recentSearches.value = [newSearch, ...filtered].slice(0, MAX_RECENT_SEARCHES)
    saveToStorage()
  }

  function removeRecentSearch(id: string) {
    recentSearches.value = recentSearches.value.filter((s) => s.id !== id)
    saveToStorage()
  }

  function clearRecentSearches() {
    recentSearches.value = []
    localStorage.removeItem('search-recent')
  }

  function setPopularSearches(searches: PopularSearch[]) {
    popularSearches.value = searches
  }

  function saveToStorage() {
    localStorage.setItem('search-recent', JSON.stringify(recentSearches.value))
  }

  function loadFromStorage() {
    const saved = localStorage.getItem('search-recent')
    if (saved) {
      recentSearches.value = JSON.parse(saved)
    }
  }

  function reset() {
    query.value = ''
    isOpen.value = false
    isSearching.value = false
    results.value = []
    totalResults.value = 0
    autocompleteItems.value = []
    selectedIndex.value = -1
  }

  return {
    query,
    isOpen,
    isSearching,
    results,
    totalResults,
    autocompleteItems,
    selectedIndex,
    recentSearches,
    popularSearches,
    setQuery,
    setOpen,
    setResults,
    setAutocompleteItems,
    moveSelection,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
    setPopularSearches,
    loadFromStorage,
    reset,
  }
})`;

// 사용 예시 코드
const usageCode = `<!-- src/views/SearchView.vue -->
<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSearchStore } from '@/stores/searchStore'
import { useSearch, useAutocomplete, usePopularSearches } from '@/composables/useSearch'

const store = useSearchStore()
const router = useRouter()

const { data: searchResults, isLoading: searchLoading } = useSearch()
const { data: autocomplete, isLoading: autoLoading } = useAutocomplete()
const { data: popular } = usePopularSearches()

// 최근 검색어 로드
onMounted(() => {
  store.loadFromStorage()
})

// ESC 키로 닫기
function handleKeydown(e: KeyboardEvent) {
  switch (e.key) {
    case 'Escape':
      store.setOpen(false)
      break
    case 'ArrowDown':
      e.preventDefault()
      store.moveSelection('down')
      break
    case 'ArrowUp':
      e.preventDefault()
      store.moveSelection('up')
      break
    case 'Enter':
      e.preventDefault()
      if (store.selectedIndex >= 0) {
        handleSelect(store.autocompleteItems[store.selectedIndex])
      } else {
        handleSearch(store.query)
      }
      break
  }
}

// 검색 실행
function handleSearch(keyword: string) {
  if (!keyword.trim()) return
  store.addRecentSearch(keyword)
  store.setOpen(false)
  router.push({ path: '/search', query: { q: keyword } })
}

// 자동완성 선택
function handleSelect(item: AutocompleteItem) {
  store.setQuery(item.text)
  handleSearch(item.text)
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-4">
    <!-- 검색바 -->
    <div class="relative">
      <input
        v-model="store.query"
        type="text"
        placeholder="검색어를 입력하세요..."
        class="w-full p-3 border rounded-lg"
        @focus="store.setOpen(true)"
        @keydown="handleKeydown"
      />

      <!-- 자동완성 드롭다운 -->
      <div
        v-if="store.isOpen && (autocomplete?.length || store.recentSearches.length || popular?.length)"
        class="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
      >
        <!-- 자동완성 결과 -->
        <div v-if="store.query && autocomplete?.length" class="p-2">
          <p class="text-xs text-gray-500 px-3 py-1">추천 검색어</p>
          <button
            v-for="(item, index) in autocomplete"
            :key="item.id"
            :class="[
              'w-full text-left px-3 py-2 rounded flex items-center gap-2',
              store.selectedIndex === index ? 'bg-blue-50' : 'hover:bg-gray-100'
            ]"
            @click="handleSelect(item)"
          >
            <span>{{ item.text }}</span>
            <span class="text-xs text-gray-400 ml-auto">{{ item.category }}</span>
          </button>
        </div>

        <!-- 검색어 없을 때 -->
        <template v-else-if="!store.query">
          <!-- 최근 검색어 -->
          <div v-if="store.recentSearches.length" class="p-2 border-b">
            <div class="flex items-center justify-between px-3 py-1">
              <p class="text-xs text-gray-500">최근 검색어</p>
              <button class="text-xs text-blue-600" @click="store.clearRecentSearches">
                전체 삭제
              </button>
            </div>
            <button
              v-for="item in store.recentSearches.slice(0, 5)"
              :key="item.id"
              class="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-2"
              @click="handleSearch(item.query)"
            >
              <span class="text-gray-400">🕐</span>
              <span>{{ item.query }}</span>
              <button
                class="ml-auto text-gray-400 hover:text-gray-600"
                @click.stop="store.removeRecentSearch(item.id)"
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
              <span
                class="w-6 text-center font-bold"
                :class="index < 3 ? 'text-blue-600' : 'text-gray-400'"
              >
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

    <!-- 검색 결과 -->
    <div v-if="store.query && searchResults?.results.length" class="mt-6 space-y-4">
      <div
        v-for="result in searchResults.results"
        :key="result.id"
        class="p-4 border rounded-lg hover:shadow-md cursor-pointer"
      >
        <h3 class="font-bold">{{ result.title }}</h3>
        <p class="text-gray-600 text-sm mt-1">{{ result.description }}</p>
        <span class="text-xs text-gray-400">{{ result.category }}</span>
      </div>
    </div>
  </div>
</template>`;

export function VueSearchContent() {
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
            <Badge variant="outline-gray">VueUse</Badge>
            <Badge variant="outline-gray">TypeScript</Badge>
          </div>
        </Section>

        {/* 기능 */}
        <Section level="h2">
          <Heading level="h2" id="features" title="기능" />
          <List className="mt-4">
            <ListItem>검색바 컴포넌트 (입력, 제출, 클리어)</ListItem>
            <ListItem>자동완성 드롭다운 (디바운스 적용)</ListItem>
            <ListItem>키보드 네비게이션 (화살표, Enter, Escape)</ListItem>
            <ListItem>최근 검색어 저장 (localStorage 영속화)</ListItem>
            <ListItem>인기 검색어 표시 (트렌드 표시)</ListItem>
            <ListItem>검색 결과 목록 (페이지네이션, 하이라이트)</ListItem>
          </List>
        </Section>

        {/* 파일 구조 */}
        <Section level="h2">
          <Heading level="h2" id="file-structure" title="파일 구조" />
          <Code variant="block" language="bash">
            {`src/
├── api/
│   └── search.ts          # API 함수 (DummyJSON)
├── composables/
│   └── useSearch.ts       # Vue Query 훅
├── stores/
│   └── searchStore.ts     # Pinia 스토어
├── views/
│   └── SearchView.vue     # 검색 페이지
├── components/search/
│   ├── SearchBar.vue      # 검색바 + 자동완성
│   ├── SearchResults.vue  # 검색 결과 목록
│   └── PopularSearches.vue # 인기 검색어
└── types/
    └── search.ts          # 타입 정의`}
          </Code>
        </Section>

        {/* 설치 */}
        <Section level="h2">
          <Heading level="h2" id="installation" title="설치" />

          <Subsection level="h3">
            <Heading level="h3" title="1. 의존성 설치" />
            <Code variant="block" language="bash">
              {`npm install pinia @tanstack/vue-query @vueuse/core axios`}
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
              {`// api/search.ts
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
              검색바에 <Code>aria-label</Code>, <Code>aria-expanded</Code>,{' '}
              <Code>aria-autocomplete</Code> 속성 적용
            </ListItem>
            <ListItem>
              자동완성 드롭다운은 <Code>role="listbox"</Code>와{' '}
              <Code>role="option"</Code> 사용
            </ListItem>
            <ListItem>
              키보드 네비게이션 지원 (화살표 키, Enter, Escape)
            </ListItem>
            <ListItem>
              선택된 항목은 <Code>aria-selected</Code>로 표시
            </ListItem>
            <ListItem>포커스 트랩 및 외부 클릭 시 드롭다운 닫기 지원</ListItem>
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
                  <Code>search</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">query, limit?, skip?</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">SearchResponse</Code>
                </TableCell>
                <TableCell>검색 실행</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>getAutocomplete</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">query</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">AutocompleteItem[]</Code>
                </TableCell>
                <TableCell>자동완성 조회</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>getPopularSearches</Code>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <Code className="text-xs">PopularSearch[]</Code>
                </TableCell>
                <TableCell>인기 검색어 조회</TableCell>
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
                  <Code>useSearch</Code>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <Code className="text-xs">UseQueryResult</Code>
                </TableCell>
                <TableCell>검색 실행 (디바운스 300ms)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>useAutocomplete</Code>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <Code className="text-xs">UseQueryResult</Code>
                </TableCell>
                <TableCell>자동완성 조회 (디바운스 150ms)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>usePopularSearches</Code>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <Code className="text-xs">UseQueryResult</Code>
                </TableCell>
                <TableCell>인기 검색어 (캐시 5분)</TableCell>
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
                    <Code>query</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">string</Code>
                  </TableCell>
                  <TableCell>현재 검색어</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>isOpen</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">boolean</Code>
                  </TableCell>
                  <TableCell>자동완성 드롭다운 열림 여부</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>results</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">SearchResult[]</Code>
                  </TableCell>
                  <TableCell>검색 결과 목록</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>autocompleteItems</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">AutocompleteItem[]</Code>
                  </TableCell>
                  <TableCell>자동완성 항목</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>selectedIndex</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">number</Code>
                  </TableCell>
                  <TableCell>선택된 자동완성 인덱스</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>recentSearches</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">RecentSearch[]</Code>
                  </TableCell>
                  <TableCell>최근 검색어 (영속화)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>popularSearches</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">PopularSearch[]</Code>
                  </TableCell>
                  <TableCell>인기 검색어</TableCell>
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
                    <Code>setQuery</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">value</Code>
                  </TableCell>
                  <TableCell>검색어 설정</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>setOpen</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">open</Code>
                  </TableCell>
                  <TableCell>드롭다운 열기/닫기</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>moveSelection</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">'up' | 'down'</Code>
                  </TableCell>
                  <TableCell>선택 이동</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>addRecentSearch</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">query, category?</Code>
                  </TableCell>
                  <TableCell>최근 검색어 추가</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>removeRecentSearch</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">id</Code>
                  </TableCell>
                  <TableCell>최근 검색어 삭제</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>clearRecentSearches</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>최근 검색어 전체 삭제</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>loadFromStorage</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>localStorage에서 불러오기</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>reset</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>상태 초기화</TableCell>
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
