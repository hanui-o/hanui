'use client';

import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
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
const typeCode = `// 검색 결과 타입
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
const apiCode = `import axios from 'axios'
import type { SearchResponse, AutocompleteItem, PopularSearch } from './types'

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
}

// 검색 로깅 (DummyJSON은 미지원, 로컬 저장)
export function logSearch(query: string): void {
  const searches = JSON.parse(localStorage.getItem('searchLog') || '[]')
  searches.unshift({ query, timestamp: Date.now() })
  localStorage.setItem('searchLog', JSON.stringify(searches.slice(0, 100)))
}`;

// React Query Hooks 코드
const hooksCode = `import { useQuery } from '@tanstack/react-query'
import { useState, useEffect, useCallback } from 'react'
import { search, getAutocomplete, getPopularSearches, logSearch } from './api'
import { useSearchStore } from './stores/searchStore'
import type { SearchParams, AutocompleteItem } from './types'

// 디바운스 Hook
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

// 검색 Hook
export function useSearch<T = unknown>(params?: Partial<SearchParams>) {
  const { query, setResults, addRecentSearch } = useSearchStore()
  const debouncedQuery = useDebounce(query, 300)

  const result = useQuery({
    queryKey: ['search', debouncedQuery, params],
    queryFn: async () => {
      if (!debouncedQuery.trim()) return null
      const data = await search<T>({ query: debouncedQuery, ...params })
      setResults(data.results, data.total)
      return data
    },
    enabled: !!debouncedQuery.trim(),
    staleTime: 30 * 1000,
  })

  const executeSearch = useCallback(async () => {
    if (!query.trim()) return
    addRecentSearch(query, params?.category)
    await logSearch(query, params?.category).catch(() => {})
  }, [query, params?.category, addRecentSearch])

  return { ...result, executeSearch }
}

// 자동완성 Hook
export function useAutocomplete(category?: string) {
  const { query, setAutocompleteItems, recentSearches, popularSearches } = useSearchStore()
  const debouncedQuery = useDebounce(query, 150)

  const { isLoading, data } = useQuery({
    queryKey: ['autocomplete', debouncedQuery, category],
    queryFn: () => getAutocomplete(debouncedQuery, category),
    enabled: debouncedQuery.length >= 1,
    staleTime: 10 * 1000,
  })

  useEffect(() => {
    if (!query.trim()) {
      // 검색어 없으면 최근 + 인기 검색어 표시
      const items: AutocompleteItem[] = [
        ...recentSearches.slice(0, 5).map((s) => ({
          id: s.id,
          text: s.query,
          type: 'recent' as const,
          category: s.category,
        })),
        ...popularSearches.slice(0, 5).map((s, i) => ({
          id: \`popular-\${i}\`,
          text: s.query,
          type: 'popular' as const,
        })),
      ]
      setAutocompleteItems(items)
    } else if (data) {
      setAutocompleteItems(data)
    }
  }, [query, data, recentSearches, popularSearches, setAutocompleteItems])

  return { isLoading }
}

// 인기 검색어 Hook
export function usePopularSearches(limit = 10) {
  const { setPopularSearches } = useSearchStore()

  return useQuery({
    queryKey: ['popular-searches', limit],
    queryFn: () => getPopularSearches(limit),
    staleTime: 5 * 60 * 1000,
    select: (data) => {
      setPopularSearches(data)
      return data
    },
  })
}

// 키보드 네비게이션 Hook
export function useSearchKeyboard(onSelect: (item: AutocompleteItem) => void) {
  const { autocompleteItems, selectedIndex, moveSelection, setSelectedIndex, setOpen } =
    useSearchStore()

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          moveSelection('down')
          break
        case 'ArrowUp':
          e.preventDefault()
          moveSelection('up')
          break
        case 'Enter':
          e.preventDefault()
          if (selectedIndex >= 0 && autocompleteItems[selectedIndex]) {
            onSelect(autocompleteItems[selectedIndex])
          }
          break
        case 'Escape':
          e.preventDefault()
          setOpen(false)
          setSelectedIndex(-1)
          break
      }
    },
    [autocompleteItems, selectedIndex, moveSelection, setSelectedIndex, setOpen, onSelect]
  )

  return { handleKeyDown }
}`;

// Zustand Store 코드
const storeCode = `import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  SearchResult,
  AutocompleteItem,
  RecentSearch,
  PopularSearch
} from './types'

interface SearchState {
  // 검색 상태
  query: string
  isOpen: boolean
  isSearching: boolean
  results: SearchResult[]
  totalResults: number

  // 자동완성
  autocompleteItems: AutocompleteItem[]
  selectedIndex: number

  // 저장된 검색어
  recentSearches: RecentSearch[]
  popularSearches: PopularSearch[]

  // Actions
  setQuery: (query: string) => void
  setOpen: (open: boolean) => void
  setSearching: (searching: boolean) => void
  setResults: (results: SearchResult[], total: number) => void
  setAutocompleteItems: (items: AutocompleteItem[]) => void
  setSelectedIndex: (index: number) => void
  moveSelection: (direction: 'up' | 'down') => void
  addRecentSearch: (query: string, category?: string) => void
  removeRecentSearch: (id: string) => void
  clearRecentSearches: () => void
  setPopularSearches: (searches: PopularSearch[]) => void
  reset: () => void
}

const MAX_RECENT_SEARCHES = 20

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      query: '',
      isOpen: false,
      isSearching: false,
      results: [],
      totalResults: 0,
      autocompleteItems: [],
      selectedIndex: -1,
      recentSearches: [],
      popularSearches: [],

      setQuery: (query) => set({ query, selectedIndex: -1 }),
      setOpen: (isOpen) => set({ isOpen }),
      setSearching: (isSearching) => set({ isSearching }),
      setResults: (results, totalResults) =>
        set({ results, totalResults, isSearching: false }),
      setAutocompleteItems: (autocompleteItems) =>
        set({ autocompleteItems }),
      setSelectedIndex: (selectedIndex) => set({ selectedIndex }),

      moveSelection: (direction) => {
        const { autocompleteItems, selectedIndex } = get()
        const maxIndex = autocompleteItems.length - 1
        const newIndex = direction === 'down'
          ? Math.min(selectedIndex + 1, maxIndex)
          : Math.max(selectedIndex - 1, -1)
        set({ selectedIndex: newIndex })
      },

      addRecentSearch: (query, category) => {
        const trimmed = query.trim()
        if (!trimmed) return

        set((state) => {
          const filtered = state.recentSearches.filter(
            (s) => s.query.toLowerCase() !== trimmed.toLowerCase()
          )
          const newSearch: RecentSearch = {
            id: \`recent-\${Date.now()}\`,
            query: trimmed,
            category,
            timestamp: Date.now(),
          }
          return {
            recentSearches: [newSearch, ...filtered].slice(0, MAX_RECENT_SEARCHES),
          }
        })
      },

      removeRecentSearch: (id) =>
        set((state) => ({
          recentSearches: state.recentSearches.filter((s) => s.id !== id),
        })),

      clearRecentSearches: () => set({ recentSearches: [] }),
      setPopularSearches: (popularSearches) => set({ popularSearches }),

      reset: () =>
        set({
          query: '',
          isOpen: false,
          isSearching: false,
          results: [],
          totalResults: 0,
          autocompleteItems: [],
          selectedIndex: -1,
        }),
    }),
    {
      name: 'search-storage',
      partialize: (state) => ({ recentSearches: state.recentSearches }),
    }
  )
)`;

// 사용 예시 코드
const usageCode = `'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SearchBar, SearchResults, PopularSearches } from '@/kits/search'
import { useSearchStore } from '@/kits/search'

const queryClient = new QueryClient()

function SearchPage() {
  const { results, query } = useSearchStore()

  const handleSearch = (searchQuery: string) => {
    console.log('검색:', searchQuery)
    // 검색 결과 페이지로 이동 등
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* 검색바 */}
      <SearchBar
        placeholder="검색어를 입력하세요"
        onSearch={handleSearch}
      />

      {/* 검색어 없을 때 인기 검색어 표시 */}
      {!query && (
        <div className="mt-6">
          <PopularSearches
            limit={10}
            showTrend
            onSearchClick={handleSearch}
          />
        </div>
      )}

      {/* 검색 결과 */}
      {query && (
        <div className="mt-6">
          <SearchResults
            onResultClick={(result) => {
              // 결과 클릭 처리
              console.log('클릭:', result)
            }}
          />
        </div>
      )}
    </div>
  )
}

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchPage />
    </QueryClientProvider>
  )
}`;

// SearchBar 컴포넌트 코드
const searchBarCode = `'use client'

import { useRef, useCallback } from 'react'
import { Input, Button } from '@hanui/react'
import { Search, X, Clock, TrendingUp, Loader2 } from 'lucide-react'
import { useSearchStore } from '../stores/searchStore'
import { useSearch, useAutocomplete, useSearchKeyboard, useClickOutside } from '../hooks/useSearch'

interface SearchBarProps {
  placeholder?: string
  category?: string
  onSearch?: (query: string) => void
  className?: string
}

export function SearchBar({
  placeholder = '검색어를 입력하세요',
  category,
  onSearch,
  className,
}: SearchBarProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    query,
    isOpen,
    autocompleteItems,
    selectedIndex,
    setQuery,
    setOpen,
    setSelectedIndex,
    removeRecentSearch,
    clearRecentSearches,
    addRecentSearch,
  } = useSearchStore()

  const { executeSearch, isLoading } = useSearch({ category })
  const { isLoading: isAutocompleteLoading } = useAutocomplete(category)

  const handleSelect = useCallback((item) => {
    setQuery(item.text)
    setOpen(false)
    addRecentSearch(item.text, category)
    onSearch?.(item.text)
  }, [setQuery, setOpen, addRecentSearch, category, onSearch])

  const { handleKeyDown } = useSearchKeyboard(handleSelect)

  useClickOutside(containerRef, () => {
    setOpen(false)
    setSelectedIndex(-1)
  })

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    executeSearch()
    setOpen(false)
    onSearch?.(query)
  }, [query, executeSearch, setOpen, onSearch])

  return (
    <div ref={containerRef} className={\`relative \${className}\`}>
      <form onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          aria-label="검색"
          aria-expanded={isOpen}
          aria-autocomplete="list"
        />
        <Button type="submit" disabled={!query.trim() || isLoading}>
          {isLoading ? <Loader2 className="animate-spin" /> : '검색'}
        </Button>
      </form>

      {/* 자동완성 드롭다운 */}
      {isOpen && autocompleteItems.length > 0 && (
        <ul role="listbox" className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg">
          {autocompleteItems.map((item, index) => (
            <li
              key={item.id}
              role="option"
              aria-selected={selectedIndex === index}
              onClick={() => handleSelect(item)}
              className={\`px-4 py-3 cursor-pointer \${
                selectedIndex === index ? 'bg-krds-primary-5' : 'hover:bg-krds-gray-5'
              }\`}
            >
              {item.type === 'recent' && <Clock className="w-4 h-4" />}
              {item.type === 'popular' && <TrendingUp className="w-4 h-4" />}
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}`;

export default function SearchKitPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Search Kit"
        description="검색 기능 키트. 검색바, 자동완성, 인기검색어, 최근검색어를 포함합니다."
      />

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
              {`src/kits/search/
├── types/
│   └── search.ts          # 타입 정의
├── api/
│   └── search.ts          # API 함수
├── hooks/
│   └── useSearch.ts       # React Query 훅, 유틸 훅
├── stores/
│   └── searchStore.ts     # Zustand 스토어
├── components/
│   ├── SearchBar.tsx      # 검색바 + 자동완성
│   ├── SearchResults.tsx  # 검색 결과 목록
│   └── PopularSearches.tsx # 인기 검색어
└── index.ts               # Entry point`}
            </Code>
          </Section>

          {/* 설치 */}
          <Section level="h2">
            <Heading level="h2" id="installation" title="설치" />

            <Subsection level="h3">
              <Heading level="h3" title="1. 의존성 설치" />
              <Code variant="block" language="bash">
                {`npm install axios zustand @tanstack/react-query lucide-react`}
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
                <TabsTrigger value="hooks">hooks.ts</TabsTrigger>
                <TabsTrigger value="store">store.ts</TabsTrigger>
                <TabsTrigger value="searchbar">SearchBar.tsx</TabsTrigger>
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
              <TabsContent value="searchbar">
                <Code variant="block" language="tsx">
                  {searchBarCode}
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
              <ListItem>
                포커스 트랩 및 외부 클릭 시 드롭다운 닫기 지원
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
                    <Code>search</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">SearchParams</Code>
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
                    <Code className="text-xs">query, category?</Code>
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
                  <TableCell>
                    <Code className="text-xs">limit?: number</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">PopularSearch[]</Code>
                  </TableCell>
                  <TableCell>인기 검색어 조회</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>logSearch</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">query, category?</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">void</Code>
                  </TableCell>
                  <TableCell>검색 로그 기록</TableCell>
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
                    <Code>useSearch</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">SearchParams?</Code>
                  </TableCell>
                  <TableCell>검색 실행 (디바운스 300ms)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>useAutocomplete</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">category?: string</Code>
                  </TableCell>
                  <TableCell>자동완성 조회 (디바운스 150ms)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>usePopularSearches</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">limit?: number</Code>
                  </TableCell>
                  <TableCell>인기 검색어 조회 (캐시 5분)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>useSearchKeyboard</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">onSelect</Code>
                  </TableCell>
                  <TableCell>키보드 네비게이션 핸들러</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>useDebounce</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">value, delay</Code>
                  </TableCell>
                  <TableCell>값 디바운스</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>useClickOutside</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">ref, callback</Code>
                  </TableCell>
                  <TableCell>외부 클릭 감지</TableCell>
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
                      <Code className="text-xs">query: string</Code>
                    </TableCell>
                    <TableCell>검색어 설정</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>setOpen</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">open: boolean</Code>
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
                      <Code className="text-xs">id: string</Code>
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
                </TableBody>
              </Table>
            </Subsection>
          </Section>

          {/* 컴포넌트 Props */}
          <Section level="h2">
            <Heading level="h2" id="components" title="컴포넌트 Props" />

            <Subsection level="h3">
              <Heading level="h3" title="SearchBar" />
              <Table small className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>placeholder</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>'검색어를 입력하세요'</TableCell>
                    <TableCell>플레이스홀더 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>category</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>검색 카테고리</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>onSearch</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        (query: string) =&gt; void
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>검색 실행 콜백</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="SearchResults" />
              <Table small className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>results</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">SearchResult[]</Code>
                    </TableCell>
                    <TableCell>store에서 가져옴</TableCell>
                    <TableCell>검색 결과 (외부 주입 가능)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>onResultClick</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">(result) =&gt; void</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>결과 클릭 콜백</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>renderResult</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">(result) =&gt; ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>커스텀 렌더러</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>emptyMessage</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>'검색 결과가 없습니다'</TableCell>
                    <TableCell>빈 결과 메시지</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="PopularSearches" />
              <Table small className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>limit</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>표시할 개수</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>title</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>'인기 검색어'</TableCell>
                    <TableCell>섹션 제목</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>showRank</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>true</TableCell>
                    <TableCell>순위 표시 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>showTrend</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>true</TableCell>
                    <TableCell>트렌드 아이콘 표시</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>layout</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">'list' | 'inline'</Code>
                    </TableCell>
                    <TableCell>'list'</TableCell>
                    <TableCell>레이아웃 스타일</TableCell>
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

      <PageNavigation
        prev={{ title: 'Dashboard Kit', href: '/kits/dashboard' }}
        next={{ title: 'Kits', href: '/kits' }}
      />
    </>
  );
}
