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

// 타입 정의 코드 (DummyJSON /products 기준)
const typeCode = `// src/types/table.ts
// 상품 타입 (DummyJSON 응답 형식)
export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  thumbnail: string
}

// 상품 목록 응답
export interface ProductListResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

// 정렬 상태
export interface SortState {
  key: string
  direction: 'asc' | 'desc'
}

// 테이블 파라미터
export interface TableParams {
  skip?: number
  limit?: number
  sortBy?: string
  order?: 'asc' | 'desc'
  search?: string
}`;

// API 코드 (DummyJSON 사용)
const apiCode = `// src/api/table.ts
import axios from 'axios'
import type { ProductListResponse, TableParams } from '@/types/table'

// 🔗 DummyJSON 무료 API (테스트용)
// 실제 프로젝트에서는 환경변수로 관리: import.meta.env.VITE_API_URL
const API_URL = 'https://dummyjson.com'

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

// 상품 목록 조회 (테이블용)
export async function getProducts(params?: TableParams): Promise<ProductListResponse> {
  // 검색어가 있으면 검색 API 사용
  if (params?.search) {
    const { data } = await api.get('/products/search', {
      params: { q: params.search, limit: params.limit, skip: params.skip }
    })
    return data
  }

  // 정렬 지원
  const queryParams: Record<string, unknown> = {
    limit: params?.limit || 10,
    skip: params?.skip || 0,
  }
  if (params?.sortBy) {
    queryParams.sortBy = params.sortBy
    queryParams.order = params.order || 'asc'
  }

  const { data } = await api.get('/products', { params: queryParams })
  return data
}

// 카테고리별 상품 조회
export async function getProductsByCategory(
  category: string,
  params?: TableParams
): Promise<ProductListResponse> {
  const { data } = await api.get(\`/products/category/\${category}\`, {
    params: { limit: params?.limit || 10, skip: params?.skip || 0 }
  })
  return data
}

// 카테고리 목록 조회
export async function getCategories(): Promise<string[]> {
  const { data } = await api.get('/products/categories')
  return data
}`;

// Vue Query Composables
const composablesCode = `// src/composables/useTable.ts
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import { useTableStore } from '@/store/tableStore'
import { getProducts, getCategories } from '@/api/table'

// Query Keys
export const tableKeys = {
  all: ['table'] as const,
  products: () => [...tableKeys.all, 'products'] as const,
  productList: (params: object) => [...tableKeys.products(), params] as const,
  categories: () => [...tableKeys.all, 'categories'] as const,
}

// 상품 목록 조회
export function useProducts() {
  const store = useTableStore()

  const params = computed(() => ({
    skip: store.skip,
    limit: store.limit,
    search: store.search || undefined,
    sortBy: store.sort?.key,
    order: store.sort?.direction,
  }))

  return useQuery({
    queryKey: computed(() => tableKeys.productList(params.value)),
    queryFn: () => getProducts(params.value),
  })
}

// 카테고리 목록 조회
export function useCategories() {
  return useQuery({
    queryKey: tableKeys.categories(),
    queryFn: getCategories,
    staleTime: Infinity, // 카테고리는 자주 변경 안 됨
  })
}`;

// Pinia Store 코드
const storeCode = `// src/store/tableStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { SortState } from '@/types/table'

export const useTableStore = defineStore('table', () => {
  // State
  const sort = ref<SortState | null>(null)
  const search = ref('')
  const skip = ref(0)
  const limit = ref(10)
  const selectedRows = ref<string[]>([])

  // Getters
  const currentPage = computed(() => Math.floor(skip.value / limit.value) + 1)
  const hasSelection = computed(() => selectedRows.value.length > 0)

  // Actions
  function setSort(key: string) {
    if (sort.value?.key === key) {
      sort.value.direction = sort.value.direction === 'asc' ? 'desc' : 'asc'
    } else {
      sort.value = { key, direction: 'asc' }
    }
    skip.value = 0
  }

  function setSearch(keyword: string) {
    search.value = keyword
    skip.value = 0
  }

  function nextPage() {
    skip.value += limit.value
  }

  function prevPage() {
    skip.value = Math.max(0, skip.value - limit.value)
  }

  function toggleRow(id: string) {
    const index = selectedRows.value.indexOf(id)
    if (index > -1) {
      selectedRows.value.splice(index, 1)
    } else {
      selectedRows.value.push(id)
    }
  }

  function selectAll(ids: string[]) {
    selectedRows.value = ids
  }

  function clearSelection() {
    selectedRows.value = []
  }

  return {
    sort,
    search,
    skip,
    limit,
    selectedRows,
    currentPage,
    hasSelection,
    setSort,
    setSearch,
    nextPage,
    prevPage,
    toggleRow,
    selectAll,
    clearSelection,
  }
})`;

// 사용 예시 코드
const usageCode = `<!-- src/components/table/ProductTable.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useTableStore } from '@/store/tableStore'
import { useProducts } from '@/composables/useTable'

const store = useTableStore()
const { data, isLoading } = useProducts()

// 전체 선택 체크박스 상태
const allSelected = computed(() => {
  if (!data.value?.products.length) return false
  return data.value.products.every(p =>
    store.selectedRows.includes(String(p.id))
  )
})

function toggleAll() {
  if (allSelected.value) {
    store.clearSelection()
  } else {
    const ids = data.value?.products.map(p => String(p.id)) || []
    store.selectAll(ids)
  }
}

// 정렬 아이콘
function getSortIcon(key: string) {
  if (store.sort?.key !== key) return '↕'
  return store.sort.direction === 'asc' ? '↑' : '↓'
}
</script>

<template>
  <div class="p-4">
    <!-- 검색 -->
    <input
      type="text"
      :value="store.search"
      @input="store.setSearch(($event.target as HTMLInputElement).value)"
      placeholder="상품 검색..."
      class="w-full p-3 border rounded mb-4"
    />

    <!-- 테이블 -->
    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead class="bg-gray-50">
          <tr>
            <th class="p-3 text-left">
              <input
                type="checkbox"
                :checked="allSelected"
                @change="toggleAll"
              />
            </th>
            <th
              class="p-3 text-left cursor-pointer hover:bg-gray-100"
              @click="store.setSort('title')"
            >
              상품명 {{ getSortIcon('title') }}
            </th>
            <th
              class="p-3 text-left cursor-pointer hover:bg-gray-100"
              @click="store.setSort('price')"
            >
              가격 {{ getSortIcon('price') }}
            </th>
            <th
              class="p-3 text-left cursor-pointer hover:bg-gray-100"
              @click="store.setSort('rating')"
            >
              평점 {{ getSortIcon('rating') }}
            </th>
            <th class="p-3 text-left">카테고리</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading">
            <td colspan="5" class="p-8 text-center">로딩 중...</td>
          </tr>
          <tr
            v-else
            v-for="product in data?.products"
            :key="product.id"
            class="border-t hover:bg-gray-50"
            :class="{ 'bg-blue-50': store.selectedRows.includes(String(product.id)) }"
          >
            <td class="p-3">
              <input
                type="checkbox"
                :checked="store.selectedRows.includes(String(product.id))"
                @change="store.toggleRow(String(product.id))"
              />
            </td>
            <td class="p-3">
              <div class="flex items-center gap-2">
                <img :src="product.thumbnail" class="w-10 h-10 object-cover rounded" />
                <span>{{ product.title }}</span>
              </div>
            </td>
            <td class="p-3">\${{ product.price }}</td>
            <td class="p-3">{{ product.rating.toFixed(1) }}</td>
            <td class="p-3">{{ product.category }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 페이지네이션 -->
    <div class="flex items-center justify-between mt-4">
      <span class="text-gray-600">
        총 {{ data?.total || 0 }}개 중
        {{ store.skip + 1 }} - {{ store.skip + (data?.products.length || 0) }}
      </span>
      <div class="flex gap-2">
        <button
          @click="store.prevPage"
          :disabled="store.skip === 0"
          class="px-4 py-2 border rounded disabled:opacity-50"
        >
          이전
        </button>
        <button
          @click="store.nextPage"
          :disabled="store.skip + store.limit >= (data?.total || 0)"
          class="px-4 py-2 border rounded disabled:opacity-50"
        >
          다음
        </button>
      </div>
    </div>
  </div>
</template>`;

export function VueTableContent() {
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
            <ListItem>컬럼별 정렬 (오름차순/내림차순)</ListItem>
            <ListItem>다중 필터 (포함, 일치, 시작, 끝)</ListItem>
            <ListItem>페이지네이션 (페이지 크기 변경)</ListItem>
            <ListItem>행 선택 (단일/다중/전체)</ListItem>
            <ListItem>CSV 내보내기</ListItem>
            <ListItem>커스텀 셀 렌더링</ListItem>
          </List>
        </Section>

        {/* 파일 구조 */}
        <Section level="h2">
          <Heading level="h2" id="file-structure" title="파일 구조" />
          <Code variant="block" language="bash">
            {`src/
├── api/
│   └── table.ts          # API 함수 (DummyJSON)
├── composables/
│   └── useTable.ts       # Vue Query 훅
├── store/
│   └── tableStore.ts     # Pinia (테이블 상태)
├── components/table/
│   └── ProductTable.vue  # 테이블 컴포넌트
└── types/
    └── table.ts          # 타입 정의`}
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
              테이블에 <Code>role="grid"</Code> 또는 시맨틱{' '}
              <Code>&lt;table&gt;</Code> 사용
            </ListItem>
            <ListItem>
              정렬 가능한 헤더에 <Code>aria-sort</Code> 속성 적용
            </ListItem>
            <ListItem>
              선택 가능한 행에 <Code>aria-selected</Code> 적용
            </ListItem>
            <ListItem>키보드로 정렬, 선택, 페이지 이동 지원</ListItem>
            <ListItem>
              페이지네이션에 <Code>aria-label</Code> 및{' '}
              <Code>aria-current</Code> 적용
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
                  <Code>getProducts</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">params?</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">ProductListResponse</Code>
                </TableCell>
                <TableCell>상품 목록 조회</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>getProductsByCategory</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">category, params?</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">ProductListResponse</Code>
                </TableCell>
                <TableCell>카테고리별 상품 조회</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>getCategories</Code>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <Code className="text-xs">string[]</Code>
                </TableCell>
                <TableCell>카테고리 목록 조회</TableCell>
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
                  <Code>useProducts</Code>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <Code className="text-xs">UseQueryResult</Code>
                </TableCell>
                <TableCell>상품 목록 조회 (스토어 연동)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>useCategories</Code>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <Code className="text-xs">UseQueryResult</Code>
                </TableCell>
                <TableCell>카테고리 목록 조회</TableCell>
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
                    <Code>sort</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">SortState | null</Code>
                  </TableCell>
                  <TableCell>현재 정렬 상태</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>search</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">string</Code>
                  </TableCell>
                  <TableCell>검색어</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>skip</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">number</Code>
                  </TableCell>
                  <TableCell>건너뛸 항목 수</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>limit</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">number</Code>
                  </TableCell>
                  <TableCell>페이지당 항목 수</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>selectedRows</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">string[]</Code>
                  </TableCell>
                  <TableCell>선택된 행 ID 목록</TableCell>
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
                    <Code>setSort</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">key</Code>
                  </TableCell>
                  <TableCell>정렬 토글 (같은 키면 방향 변경)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>setSearch</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">keyword</Code>
                  </TableCell>
                  <TableCell>검색어 설정</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>nextPage</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>다음 페이지로 이동</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>prevPage</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>이전 페이지로 이동</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>toggleRow</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">id</Code>
                  </TableCell>
                  <TableCell>행 선택 토글</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>selectAll</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">ids</Code>
                  </TableCell>
                  <TableCell>전체 선택</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>clearSelection</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>선택 해제</TableCell>
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
