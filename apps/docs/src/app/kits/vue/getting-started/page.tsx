'use client';

import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import { CodeBlock } from '@/components/content/CodeBlock';
import {
  Code,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  List,
  ListItem,
  Alert,
} from '@hanui/react';

// 프로젝트 구조
const projectStructure = `src/
├── features/
│   └── board/
│       ├── api/
│       │   └── boardApi.ts
│       ├── composables/
│       │   └── useBoard.ts      # Vue Query 훅
│       ├── stores/
│       │   └── boardStore.ts    # Pinia 스토어
│       └── types/
│           └── board.ts
├── plugins/
│   └── vue-query.ts
└── views/
    └── board/
        └── BoardView.vue`;

// Vue Query 플러그인 설정
const vueQuerySetup = `// src/plugins/vue-query.ts
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import type { App } from 'vue'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
})

export function setupVueQuery(app: App) {
  app.use(VueQueryPlugin, { queryClient })
}`;

// Pinia 설정
const piniaSetup = `// src/stores/index.ts
import { createPinia } from 'pinia'
import type { App } from 'vue'

export function setupPinia(app: App) {
  const pinia = createPinia()
  app.use(pinia)
}`;

// main.ts 설정
const mainSetup = `// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { setupPinia } from './stores'
import { setupVueQuery } from './plugins/vue-query'

const app = createApp(App)

setupPinia(app)
setupVueQuery(app)

app.mount('#app')`;

// Pinia Store 예시
const piniaStoreExample = `// src/features/board/stores/boardStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useBoardStore = defineStore('board', () => {
  // State
  const searchKeyword = ref('')
  const sortBy = ref<'latest' | 'views'>('latest')
  const skip = ref(0)
  const limit = ref(10)
  const selectedIds = ref<number[]>([])

  // Getters
  const currentPage = computed(() => Math.floor(skip.value / limit.value) + 1)
  const hasSelection = computed(() => selectedIds.value.length > 0)

  // Actions
  function setSearch(keyword: string) {
    searchKeyword.value = keyword
    skip.value = 0  // 검색 시 첫 페이지로
  }

  function nextPage() {
    skip.value += limit.value
  }

  function prevPage() {
    skip.value = Math.max(0, skip.value - limit.value)
  }

  function toggleSelect(id: number) {
    const index = selectedIds.value.indexOf(id)
    if (index > -1) {
      selectedIds.value.splice(index, 1)
    } else {
      selectedIds.value.push(id)
    }
  }

  function resetFilters() {
    searchKeyword.value = ''
    sortBy.value = 'latest'
    skip.value = 0
  }

  return {
    // State
    searchKeyword,
    sortBy,
    skip,
    limit,
    selectedIds,
    // Getters
    currentPage,
    hasSelection,
    // Actions
    setSearch,
    nextPage,
    prevPage,
    toggleSelect,
    resetFilters,
  }
})`;

// Vue Query Composable 예시
const composableExample = `// src/features/board/composables/useBoard.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { computed } from 'vue'
import { useBoardStore } from '../stores/boardStore'
import { getPosts, getPost, createPost, deletePost } from '../api/boardApi'
import type { PostFormData } from '../types/board'

// Query Keys
export const boardKeys = {
  all: ['board'] as const,
  lists: () => [...boardKeys.all, 'list'] as const,
  list: (params: object) => [...boardKeys.lists(), params] as const,
  details: () => [...boardKeys.all, 'detail'] as const,
  detail: (id: number) => [...boardKeys.details(), id] as const,
}

// 게시글 목록 조회
export function usePosts() {
  const store = useBoardStore()

  const params = computed(() => ({
    skip: store.skip,
    limit: store.limit,
    search: store.searchKeyword || undefined,
  }))

  return useQuery({
    queryKey: computed(() => boardKeys.list(params.value)),
    queryFn: () => getPosts(params.value),
  })
}

// 게시글 상세 조회
export function usePost(id: number) {
  return useQuery({
    queryKey: boardKeys.detail(id),
    queryFn: () => getPost(id),
  })
}

// 게시글 작성
export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PostFormData) => createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: boardKeys.lists() })
    },
  })
}

// 게시글 삭제
export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: boardKeys.lists() })
    },
  })
}`;

// Vue 컴포넌트 예시
const vueComponentExample = `<!-- src/views/board/BoardView.vue -->
<script setup lang="ts">
import { useBoardStore } from '@/features/board/stores/boardStore'
import { usePosts } from '@/features/board/composables/useBoard'

const store = useBoardStore()
const { data, isLoading, error } = usePosts()
</script>

<template>
  <div class="p-4">
    <!-- 검색 -->
    <input
      type="text"
      :value="store.searchKeyword"
      @input="store.setSearch(($event.target as HTMLInputElement).value)"
      placeholder="검색..."
      class="w-full p-2 border rounded mb-4"
    />

    <!-- 로딩 -->
    <div v-if="isLoading" class="text-center py-8">
      로딩 중...
    </div>

    <!-- 에러 -->
    <div v-else-if="error" class="text-red-500">
      에러가 발생했습니다.
    </div>

    <!-- 게시글 목록 -->
    <div v-else class="space-y-4">
      <article
        v-for="post in data?.posts"
        :key="post.id"
        class="p-4 border rounded"
      >
        <h2 class="font-bold text-lg">{{ post.title }}</h2>
        <p class="text-gray-600 mt-2">
          {{ post.body.slice(0, 100) }}...
        </p>
        <div class="flex gap-4 mt-2 text-sm text-gray-500">
          <span>조회 {{ post.views }}</span>
          <span>좋아요 {{ post.reactions.likes }}</span>
        </div>
      </article>

      <!-- 페이지네이션 -->
      <div class="flex items-center gap-4 mt-6">
        <button
          @click="store.prevPage"
          :disabled="store.skip === 0"
          class="px-4 py-2 border rounded disabled:opacity-50"
        >
          이전
        </button>
        <span>
          {{ store.skip + 1 }} - {{ store.skip + (data?.posts.length || 0) }}
          / {{ data?.total }}
        </span>
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

// 기술 스택 비교
const techComparison = [
  { react: 'Zustand', vue: 'Pinia', purpose: '클라이언트 상태 관리' },
  {
    react: '@tanstack/react-query',
    vue: '@tanstack/vue-query',
    purpose: '서버 상태 관리',
  },
  { react: 'React Hook Form', vue: 'VeeValidate', purpose: '폼 상태 관리' },
  { react: 'Zod', vue: 'Zod / Yup', purpose: '스키마 검증' },
  { react: 'Axios', vue: 'Axios', purpose: 'HTTP 클라이언트' },
];

export default function VueGettingStartedPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Vue 시작하기"
        description="Vue 3 + Composition API로 HANUI Kits를 사용하는 방법을 안내합니다."
      />

      <Alert variant="info" className="mb-6">
        Vue Kits는 React Kits와 동일한 DummyJSON API를 사용합니다. API 코드는
        그대로 사용 가능하며, 상태관리만 Vue 방식으로 변환됩니다.
      </Alert>

      <Tabs defaultValue="setup" className="w-full">
        <TabsList>
          <TabsTrigger value="setup">프로젝트 설정</TabsTrigger>
          <TabsTrigger value="state">상태 관리</TabsTrigger>
          <TabsTrigger value="example">사용 예시</TabsTrigger>
        </TabsList>

        {/* 프로젝트 설정 탭 */}
        <TabsContent value="setup">
          <Section level="h2">
            <Heading level="h2" id="install" title="1. 패키지 설치" />
            <CodeBlock
              code={`# Vue 프로젝트 생성
npm create vue@latest my-hanui-vue
cd my-hanui-vue

# 필수 패키지 설치
pnpm add axios pinia @tanstack/vue-query

# 선택적 패키지 (폼 관련)
pnpm add vee-validate @vee-validate/zod zod`}
              language="bash"
            />
          </Section>

          <Section level="h2">
            <Heading level="h2" id="structure" title="2. 프로젝트 구조" />
            <CodeBlock code={projectStructure} language="plaintext" />
          </Section>

          <Section level="h2">
            <Heading level="h2" id="plugin-setup" title="3. 플러그인 설정" />

            <Subsection level="h3">
              <Heading level="h3" id="vue-query" title="Vue Query 설정" />
              <CodeBlock code={vueQuerySetup} language="typescript" />
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" id="pinia" title="Pinia 설정" />
              <CodeBlock code={piniaSetup} language="typescript" />
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" id="main" title="main.ts" />
              <CodeBlock code={mainSetup} language="typescript" />
            </Subsection>
          </Section>

          <Section level="h2">
            <Heading level="h2" id="tech-comparison" title="기술 스택 비교" />
            <p className="text-krds-gray-70 mt-4 mb-4">
              React와 Vue에서 사용하는 라이브러리 비교입니다.
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>용도</TableHead>
                  <TableHead>React</TableHead>
                  <TableHead>Vue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {techComparison.map((item) => (
                  <TableRow key={item.purpose}>
                    <TableCell className="text-krds-gray-70">
                      {item.purpose}
                    </TableCell>
                    <TableCell>
                      <Code>{item.react}</Code>
                    </TableCell>
                    <TableCell>
                      <Code>{item.vue}</Code>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Section>
        </TabsContent>

        {/* 상태 관리 탭 */}
        <TabsContent value="state">
          <Section level="h2">
            <Heading level="h2" id="pinia-store" title="Pinia Store" />
            <p className="text-krds-gray-70 mt-4 mb-4">
              Zustand 대신 Pinia를 사용합니다. Composition API 스타일로
              작성합니다.
            </p>
            <CodeBlock code={piniaStoreExample} language="typescript" />

            <Alert variant="info" className="mt-4">
              <strong>Zustand vs Pinia:</strong> 문법은 다르지만 개념은
              동일합니다.
              <br />- <Code>create()</Code> → <Code>defineStore()</Code>
              <br />- <Code>set()</Code> → <Code>ref()</Code> 값 직접 수정
              <br />- 선택자 함수 → <Code>storeToRefs()</Code>
            </Alert>
          </Section>

          <Section level="h2">
            <Heading
              level="h2"
              id="composables"
              title="Vue Query Composables"
            />
            <p className="text-krds-gray-70 mt-4 mb-4">
              React Query 훅을 Vue Composable로 변환합니다.
            </p>
            <CodeBlock code={composableExample} language="typescript" />

            <Alert variant="info" className="mt-4">
              <strong>React Query vs Vue Query:</strong> API는 거의 동일합니다.
              <br />- <Code>queryKey</Code>를 <Code>computed()</Code>로 감싸서
              반응형으로 만듭니다
              <br />- 스토어 값 변경 시 자동으로 쿼리가 다시 실행됩니다
            </Alert>
          </Section>
        </TabsContent>

        {/* 사용 예시 탭 */}
        <TabsContent value="example">
          <Section level="h2">
            <Heading level="h2" id="vue-component" title="Vue 컴포넌트 예시" />
            <p className="text-krds-gray-70 mt-4 mb-4">
              <Code>&lt;script setup&gt;</Code>을 사용한 Vue 3 컴포넌트입니다.
            </p>
            <CodeBlock code={vueComponentExample} language="vue" />
          </Section>

          <Section level="h2">
            <Heading level="h2" id="key-differences" title="주요 차이점" />
            <List className="mt-4">
              <ListItem>
                <strong>반응형:</strong> React의 <Code>useState</Code> 대신
                Vue의 <Code>ref()</Code> / <Code>reactive()</Code> 사용
              </ListItem>
              <ListItem>
                <strong>이벤트:</strong> <Code>onClick</Code> 대신{' '}
                <Code>@click</Code> 사용
              </ListItem>
              <ListItem>
                <strong>조건부 렌더링:</strong> 삼항 연산자 대신{' '}
                <Code>v-if</Code> / <Code>v-else</Code> 사용
              </ListItem>
              <ListItem>
                <strong>리스트 렌더링:</strong> <Code>.map()</Code> 대신{' '}
                <Code>v-for</Code> 사용
              </ListItem>
              <ListItem>
                <strong>양방향 바인딩:</strong> <Code>value</Code> +{' '}
                <Code>onChange</Code> 대신 <Code>v-model</Code> 사용
              </ListItem>
            </List>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{
          title: 'Getting Started (React)',
          href: '/kits/getting-started',
        }}
        next={{ title: 'Board Kit (Vue)', href: '/kits/vue/board' }}
      />
    </>
  );
}
