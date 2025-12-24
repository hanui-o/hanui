'use client';

import {
  PageSection as Section,
  Heading,
  PageNavigation,
} from '@/components/content';
import { CodeBlock } from '@/components/content/CodeBlock';
import { Badge, Tabs, TabsList, TabsTrigger, TabsContent } from '@hanui/react';

// Pinia Store
const storeCode = `// src/features/table/stores/tableStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface SortState {
  key: string
  direction: 'asc' | 'desc'
}

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

// Composables
const composablesCode = `// src/features/table/composables/useProducts.ts
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import { useTableStore } from '../stores/tableStore'
import { getProducts, getCategories } from '../api/tableApi'

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
    queryKey: computed(() => ['products', params.value]),
    queryFn: () => getProducts(params.value),
  })
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: Infinity, // 카테고리는 자주 변경 안 됨
  })
}`;

// 테이블 컴포넌트
const tableComponent = `<!-- src/views/table/ProductTable.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useTableStore } from '@/features/table/stores/tableStore'
import { useProducts } from '@/features/table/composables/useProducts'

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
        총 {{ data?.total || 0 }}개 중 {{ store.skip + 1 }} - {{ store.skip + (data?.products.length || 0) }}
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

export default function VueTableKitPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Table Kit (Vue)"
        description="Vue 3로 구현한 데이터 테이블 키트"
      />

      <div className="flex gap-2 mb-6">
        <Badge variant="primary">Vue 3</Badge>
        <Badge variant="secondary">정렬</Badge>
        <Badge variant="secondary">검색</Badge>
        <Badge variant="secondary">선택</Badge>
      </div>

      <Tabs defaultValue="store" className="w-full">
        <TabsList>
          <TabsTrigger value="store">Store</TabsTrigger>
          <TabsTrigger value="composables">Composables</TabsTrigger>
          <TabsTrigger value="component">컴포넌트</TabsTrigger>
        </TabsList>

        <TabsContent value="store">
          <Section level="h2">
            <Heading level="h2" id="store" title="Pinia Table Store" />
            <CodeBlock code={storeCode} language="typescript" />
          </Section>
        </TabsContent>

        <TabsContent value="composables">
          <Section level="h2">
            <Heading level="h2" id="composables" title="Product Composables" />
            <CodeBlock code={composablesCode} language="typescript" />
          </Section>
        </TabsContent>

        <TabsContent value="component">
          <Section level="h2">
            <Heading level="h2" id="table" title="테이블 컴포넌트" />
            <CodeBlock code={tableComponent} language="vue" />
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Auth Kit (Vue)', href: '/kits/vue/auth' }}
        next={{ title: 'Dashboard Kit (Vue)', href: '/kits/vue/dashboard' }}
      />
    </>
  );
}
