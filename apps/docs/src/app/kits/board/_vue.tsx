'use client';

import {
  PageSection as Section,
  Heading,
  Subsection,
} from '@/components/content';
import { CodeBlock } from '@/components/content/CodeBlock';
import {
  Code,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Alert,
  List,
  ListItem,
} from '@hanui/react';

// 타입 정의 (React와 동일)
const typeCode = `// src/features/board/types/board.ts

// 게시글 타입 (DummyJSON 응답 형식)
export interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: { likes: number; dislikes: number }
  views: number
  userId: number
}

// 게시글 목록 응답
export interface PostListResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

// 게시글 작성/수정 폼 데이터
export interface PostFormData {
  title: string
  body: string
  userId: number
  tags?: string[]
}

// 목록 조회 파라미터
export interface PostListParams {
  skip?: number
  limit?: number
  search?: string
}`;

// API 코드 (React와 동일)
const apiCode = `// src/features/board/api/boardApi.ts
import axios from 'axios'
import type { Post, PostListResponse, PostFormData, PostListParams } from '../types/board'

const API_URL = 'https://dummyjson.com'

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

// 게시글 목록 조회
export async function getPosts(params?: PostListParams): Promise<PostListResponse> {
  if (params?.search) {
    const { data } = await api.get('/posts/search', {
      params: { q: params.search, limit: params.limit, skip: params.skip }
    })
    return data
  }
  const { data } = await api.get('/posts', {
    params: { limit: params?.limit || 10, skip: params?.skip || 0 }
  })
  return data
}

// 게시글 상세 조회
export async function getPost(id: number): Promise<Post> {
  const { data } = await api.get(\`/posts/\${id}\`)
  return data
}

// 게시글 작성
export async function createPost(formData: PostFormData): Promise<Post> {
  const { data } = await api.post('/posts/add', formData)
  return data
}

// 게시글 수정
export async function updatePost(id: number, formData: PostFormData): Promise<Post> {
  const { data } = await api.put(\`/posts/\${id}\`, formData)
  return data
}

// 게시글 삭제
export async function deletePost(id: number): Promise<Post & { isDeleted: boolean }> {
  const { data } = await api.delete(\`/posts/\${id}\`)
  return data
}`;

// Pinia Store
const storeCode = `// src/features/board/stores/boardStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useBoardStore = defineStore('board', () => {
  // State
  const searchKeyword = ref('')
  const sortBy = ref<'latest' | 'views'>('latest')
  const skip = ref(0)
  const limit = ref(10)
  const selectedIds = ref<number[]>([])
  const isDeleteModalOpen = ref(false)
  const deleteTargetId = ref<number | null>(null)

  // Getters
  const currentPage = computed(() => Math.floor(skip.value / limit.value) + 1)
  const hasSelection = computed(() => selectedIds.value.length > 0)

  // Actions
  function setSearchKeyword(keyword: string) {
    searchKeyword.value = keyword
    skip.value = 0
  }

  function setSortBy(sort: 'latest' | 'views') {
    sortBy.value = sort
    skip.value = 0
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

  function selectAll(ids: number[]) {
    selectedIds.value = ids
  }

  function clearSelection() {
    selectedIds.value = []
  }

  function openDeleteModal(id: number) {
    deleteTargetId.value = id
    isDeleteModalOpen.value = true
  }

  function closeDeleteModal() {
    deleteTargetId.value = null
    isDeleteModalOpen.value = false
  }

  function resetFilters() {
    searchKeyword.value = ''
    sortBy.value = 'latest'
    skip.value = 0
    clearSelection()
  }

  return {
    // State
    searchKeyword,
    sortBy,
    skip,
    limit,
    selectedIds,
    isDeleteModalOpen,
    deleteTargetId,
    // Getters
    currentPage,
    hasSelection,
    // Actions
    setSearchKeyword,
    setSortBy,
    nextPage,
    prevPage,
    toggleSelect,
    selectAll,
    clearSelection,
    openDeleteModal,
    closeDeleteModal,
    resetFilters,
  }
})`;

// Vue Query Composables
const composablesCode = `// src/features/board/composables/useBoard.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { computed, type Ref } from 'vue'
import { useBoardStore } from '../stores/boardStore'
import { getPosts, getPost, createPost, updatePost, deletePost } from '../api/boardApi'
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

  // 반응형 파라미터 - store 값이 변경되면 자동으로 쿼리 재실행
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
export function usePost(id: Ref<number> | number) {
  const postId = computed(() => typeof id === 'number' ? id : id.value)

  return useQuery({
    queryKey: computed(() => boardKeys.detail(postId.value)),
    queryFn: () => getPost(postId.value),
    enabled: computed(() => postId.value > 0),
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

// 게시글 수정
export function useUpdatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PostFormData }) =>
      updatePost(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: boardKeys.lists() })
      queryClient.invalidateQueries({ queryKey: boardKeys.detail(id) })
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

// 게시글 목록 컴포넌트
const boardListComponent = `<!-- src/views/board/BoardListView.vue -->
<script setup lang="ts">
import { useBoardStore } from '@/features/board/stores/boardStore'
import { usePosts } from '@/features/board/composables/useBoard'
import PostCard from '@/components/board/PostCard.vue'
import Pagination from '@/components/common/Pagination.vue'

const store = useBoardStore()
const { data, isLoading, error } = usePosts()
</script>

<template>
  <div class="max-w-4xl mx-auto p-4">
    <!-- 헤더 -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">게시판</h1>
      <RouterLink to="/board/write" class="btn btn-primary">
        글쓰기
      </RouterLink>
    </div>

    <!-- 검색 -->
    <div class="mb-4">
      <input
        type="text"
        :value="store.searchKeyword"
        @input="store.setSearchKeyword(($event.target as HTMLInputElement).value)"
        placeholder="검색어를 입력하세요..."
        class="w-full p-3 border rounded-lg"
      />
    </div>

    <!-- 로딩 상태 -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <div class="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
    </div>

    <!-- 에러 상태 -->
    <div v-else-if="error" class="text-center py-12 text-red-500">
      데이터를 불러오는데 실패했습니다.
    </div>

    <!-- 게시글 목록 -->
    <template v-else>
      <div class="space-y-4">
        <PostCard
          v-for="post in data?.posts"
          :key="post.id"
          :post="post"
          :selected="store.selectedIds.includes(post.id)"
          @toggle-select="store.toggleSelect(post.id)"
        />
      </div>

      <!-- 페이지네이션 -->
      <Pagination
        :current-page="store.currentPage"
        :total="data?.total || 0"
        :limit="store.limit"
        @prev="store.prevPage"
        @next="store.nextPage"
        class="mt-6"
      />
    </template>
  </div>
</template>`;

// 게시글 카드 컴포넌트
const postCardComponent = `<!-- src/components/board/PostCard.vue -->
<script setup lang="ts">
import type { Post } from '@/features/board/types/board'

interface Props {
  post: Post
  selected?: boolean
}

defineProps<Props>()
defineEmits<{
  toggleSelect: []
}>()
</script>

<template>
  <article
    class="p-4 border rounded-lg hover:shadow-md transition-shadow"
    :class="{ 'border-blue-500 bg-blue-50': selected }"
  >
    <div class="flex items-start gap-3">
      <!-- 체크박스 -->
      <input
        type="checkbox"
        :checked="selected"
        @change="$emit('toggleSelect')"
        class="mt-1"
      />

      <div class="flex-1">
        <!-- 제목 -->
        <RouterLink
          :to="\`/board/\${post.id}\`"
          class="text-lg font-semibold hover:text-blue-600"
        >
          {{ post.title }}
        </RouterLink>

        <!-- 본문 미리보기 -->
        <p class="text-gray-600 mt-1 line-clamp-2">
          {{ post.body }}
        </p>

        <!-- 태그 -->
        <div class="flex gap-2 mt-2">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
          >
            #{{ tag }}
          </span>
        </div>

        <!-- 메타 정보 -->
        <div class="flex gap-4 mt-3 text-sm text-gray-500">
          <span class="flex items-center gap-1">
            <span>👁</span> {{ post.views }}
          </span>
          <span class="flex items-center gap-1">
            <span>👍</span> {{ post.reactions.likes }}
          </span>
          <span class="flex items-center gap-1">
            <span>👎</span> {{ post.reactions.dislikes }}
          </span>
        </div>
      </div>
    </div>
  </article>
</template>`;

// 게시글 상세 컴포넌트
const postDetailComponent = `<!-- src/views/board/BoardDetailView.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePost, useDeletePost } from '@/features/board/composables/useBoard'

const route = useRoute()
const router = useRouter()

const postId = computed(() => Number(route.params.id))
const { data: post, isLoading, error } = usePost(postId)

const deletePost = useDeletePost()
const showDeleteConfirm = ref(false)

async function handleDelete() {
  await deletePost.mutateAsync(postId.value)
  router.push('/board')
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-4">
    <!-- 로딩 -->
    <div v-if="isLoading" class="text-center py-12">
      로딩 중...
    </div>

    <!-- 에러 -->
    <div v-else-if="error" class="text-center py-12 text-red-500">
      게시글을 찾을 수 없습니다.
    </div>

    <!-- 게시글 상세 -->
    <article v-else-if="post">
      <header class="border-b pb-4 mb-4">
        <h1 class="text-2xl font-bold mb-2">{{ post.title }}</h1>
        <div class="flex gap-4 text-sm text-gray-500">
          <span>조회 {{ post.views }}</span>
          <span>좋아요 {{ post.reactions.likes }}</span>
        </div>
      </header>

      <div class="prose max-w-none mb-8">
        {{ post.body }}
      </div>

      <!-- 태그 -->
      <div class="flex gap-2 mb-8">
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="px-3 py-1 bg-gray-100 rounded-full text-sm"
        >
          #{{ tag }}
        </span>
      </div>

      <!-- 액션 버튼 -->
      <div class="flex gap-2">
        <RouterLink :to="\`/board/\${post.id}/edit\`" class="btn">
          수정
        </RouterLink>
        <button @click="showDeleteConfirm = true" class="btn btn-danger">
          삭제
        </button>
        <RouterLink to="/board" class="btn btn-outline">
          목록
        </RouterLink>
      </div>
    </article>

    <!-- 삭제 확인 모달 -->
    <Teleport to="body">
      <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg max-w-md">
          <h2 class="text-lg font-bold mb-4">삭제 확인</h2>
          <p class="mb-6">정말 이 게시글을 삭제하시겠습니까?</p>
          <div class="flex gap-2 justify-end">
            <button @click="showDeleteConfirm = false" class="btn">
              취소
            </button>
            <button
              @click="handleDelete"
              :disabled="deletePost.isPending.value"
              class="btn btn-danger"
            >
              {{ deletePost.isPending.value ? '삭제 중...' : '삭제' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>`;

export function VueBoardContent() {
  return (
    <>
      <div className="flex gap-2 mb-6">
        <Badge variant="primary">Vue 3</Badge>
        <Badge variant="secondary">Pinia</Badge>
        <Badge variant="secondary">Vue Query</Badge>
        <Badge variant="outline-gray">DummyJSON</Badge>
      </div>

      <Alert variant="info" className="mb-6">
        API 코드는 React 버전과 동일합니다. Pinia와 Vue Query로 상태관리만
        변환됩니다.
      </Alert>

      <Section level="h2">
        <Heading level="h2" id="file-structure" title="파일 구조" />
        <CodeBlock
          code={`src/features/board/
├── types/
│   └── board.ts          # 타입 정의
├── api/
│   └── boardApi.ts       # API 함수 (DummyJSON)
├── stores/
│   └── boardStore.ts     # Pinia 스토어 (UI 상태)
└── composables/
    └── useBoard.ts       # Vue Query 훅 (서버 상태)`}
          language="plaintext"
        />
      </Section>

      {/* 기능 */}
      <Section level="h2">
        <Heading level="h2" id="features" title="기능" />
        <List className="mt-4">
          <ListItem>목록 조회 (페이지네이션, 검색, 정렬)</ListItem>
          <ListItem>상세 조회 (조회수, 첨부파일)</ListItem>
          <ListItem>게시글 작성 (폼 유효성 검사)</ListItem>
          <ListItem>게시글 수정 (기존 데이터 불러오기)</ListItem>
          <ListItem>게시글 삭제 (확인 모달)</ListItem>
        </List>
      </Section>

      <Tabs defaultValue="types" className="w-full mt-8">
        <TabsList>
          <TabsTrigger value="types">타입</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="store">Store</TabsTrigger>
          <TabsTrigger value="composables">Composables</TabsTrigger>
          <TabsTrigger value="components">컴포넌트</TabsTrigger>
        </TabsList>

        <TabsContent value="types">
          <Section level="h2">
            <Heading level="h2" id="types" title="타입 정의" />
            <p className="text-krds-gray-70 mt-4 mb-4">
              타입 정의는 React 버전과 동일합니다.
            </p>
            <CodeBlock code={typeCode} language="typescript" />
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 코드" />
            <p className="text-krds-gray-70 mt-4 mb-4">
              API 코드도 React 버전과 동일합니다. DummyJSON <Code>/posts</Code>{' '}
              엔드포인트를 사용합니다.
            </p>
            <CodeBlock code={apiCode} language="typescript" />
          </Section>
        </TabsContent>

        <TabsContent value="store">
          <Section level="h2">
            <Heading level="h2" id="store" title="Pinia Store" />
            <p className="text-krds-gray-70 mt-4 mb-4">
              Zustand 대신 Pinia를 사용합니다. Composition API 스타일로
              작성합니다.
            </p>
            <CodeBlock code={storeCode} language="typescript" />

            <Subsection level="h3">
              <Heading level="h3" id="store-usage" title="Store 사용법" />
              <CodeBlock
                code={`<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBoardStore } from '@/features/board/stores/boardStore'

const store = useBoardStore()

// 반응형으로 사용하려면 storeToRefs 사용
const { searchKeyword, skip, limit } = storeToRefs(store)

// 액션은 직접 호출
store.setSearchKeyword('검색어')
store.nextPage()
</script>`}
                language="vue"
              />
            </Subsection>
          </Section>
        </TabsContent>

        <TabsContent value="composables">
          <Section level="h2">
            <Heading
              level="h2"
              id="composables"
              title="Vue Query Composables"
            />
            <p className="text-krds-gray-70 mt-4 mb-4">
              React Query 훅을 Vue Composable로 변환합니다.
            </p>
            <CodeBlock code={composablesCode} language="typescript" />

            <Alert variant="info" className="mt-4">
              <strong>핵심 차이점:</strong>
              <br />- <Code>queryKey</Code>를 <Code>computed()</Code>로 감싸서
              반응형으로 만듦
              <br />- Store 값이 변경되면 자동으로 쿼리가 다시 실행됨
            </Alert>
          </Section>
        </TabsContent>

        <TabsContent value="components">
          <Section level="h2">
            <Heading level="h2" id="list-component" title="게시글 목록" />
            <CodeBlock code={boardListComponent} language="vue" />
          </Section>

          <Section level="h2">
            <Heading level="h2" id="card-component" title="게시글 카드" />
            <CodeBlock code={postCardComponent} language="vue" />
          </Section>

          <Section level="h2">
            <Heading level="h2" id="detail-component" title="게시글 상세" />
            <CodeBlock code={postDetailComponent} language="vue" />
          </Section>
        </TabsContent>
      </Tabs>
    </>
  );
}
