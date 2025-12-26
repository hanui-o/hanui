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

// 타입 정의 코드 (React와 동일)
const typeCode = `// 게시글 타입 (DummyJSON 응답 형식)
export interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: { likes: number; dislikes: number }
  views: number
  userId: number
}

// 게시글 목록 응답 (DummyJSON 형식)
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

// 게시글 목록 조회 파라미터
export interface PostListParams {
  skip?: number
  limit?: number
  search?: string
  sortBy?: 'latest' | 'views'
}`;

// API 코드 (React와 동일)
const apiCode = `import axios from 'axios'
import type { Post, PostListResponse, PostFormData, PostListParams } from './types'

// 🔗 DummyJSON 무료 API (테스트용)
// 실제 프로젝트에서는 환경변수로 관리: import.meta.env.VITE_API_URL
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

// 게시글 작성 (DummyJSON은 실제 저장 안 됨, 응답만 반환)
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

// Vue Query Composables 코드
const composablesCode = `import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { computed, type Ref } from 'vue'
import { useBoardStore } from '../store/boardStore'
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

// Pinia Store 코드
const storeCode = `import { defineStore } from 'pinia'
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

// 사용 예시 코드
const usageCode = `<script setup lang="ts">
import { useBoardStore } from '@/store/boardStore'
import { usePosts } from '@/composables/useBoard'

const store = useBoardStore()
const { data, isLoading } = usePosts()
</script>

<template>
  <div class="p-4">
    <!-- 검색 -->
    <input
      type="text"
      :value="store.searchKeyword"
      @input="store.setSearchKeyword(($event.target as HTMLInputElement).value)"
      placeholder="검색..."
      class="w-full p-2 border rounded mb-4"
    />

    <!-- 로딩 -->
    <div v-if="isLoading" class="text-center py-8">로딩 중...</div>

    <!-- 게시글 목록 -->
    <div v-else class="space-y-4">
      <article
        v-for="post in data?.posts"
        :key="post.id"
        class="p-4 border rounded"
      >
        <h2 class="font-bold">{{ post.title }}</h2>
        <p class="text-gray-600 text-sm mt-1">
          {{ post.body.slice(0, 100) }}...
        </p>
        <div class="flex gap-4 mt-2 text-xs text-gray-500">
          <span>👁 {{ post.views }}</span>
          <span>👍 {{ post.reactions.likes }}</span>
        </div>
      </article>

      <!-- 페이지네이션 -->
      <div class="flex gap-2 mt-4">
        <button @click="store.prevPage" :disabled="store.skip === 0">
          이전
        </button>
        <span>
          총 {{ data?.total }}개 중
          {{ store.skip + 1 }}-{{ store.skip + (data?.posts.length || 0) }}
        </span>
        <button
          @click="store.nextPage"
          :disabled="store.skip + store.limit >= (data?.total || 0)"
        >
          다음
        </button>
      </div>
    </div>
  </div>
</template>`;

export function VueBoardContent() {
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
            <Badge variant="outline-gray">Pinia</Badge>
            <Badge variant="outline-gray">Vue Query</Badge>
            <Badge variant="outline-gray">Axios</Badge>
            <Badge variant="outline-gray">VeeValidate</Badge>
            <Badge variant="outline-gray">Zod</Badge>
            <Badge variant="outline-gray">TypeScript</Badge>
          </div>
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

        {/* 파일 구조 */}
        <Section level="h2">
          <Heading level="h2" id="file-structure" title="파일 구조" />
          <Code variant="block" language="bash">
            {`src/
├── api/
│   └── board.ts          # API 함수 (CRUD)
├── composables/
│   └── useBoard.ts       # Vue Query 훅
├── store/
│   └── boardStore.ts     # Pinia (UI 상태)
├── components/board/
│   ├── BoardList.vue     # 목록
│   ├── BoardItem.vue     # 목록 아이템
│   ├── BoardDetail.vue   # 상세
│   ├── BoardForm.vue     # 작성/수정 폼
│   └── DeleteModal.vue   # 삭제 확인 모달
└── types/
    └── board.ts          # 타입 정의`}
          </Code>
        </Section>

        {/* 설치 */}
        <Section level="h2">
          <Heading level="h2" id="installation" title="설치" />

          <Subsection level="h3">
            <Heading level="h3" title="1. 의존성 설치" />
            <Code variant="block" language="bash">
              {`npm install axios pinia @tanstack/vue-query vee-validate @vee-validate/zod zod`}
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
              {`// api/board.ts
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
              게시글 목록은 시맨틱 마크업(<Code>article</Code>, <Code>h2</Code>)
              사용 권장
            </ListItem>
            <ListItem>
              페이지네이션에 <Code>aria-label</Code> 및{' '}
              <Code>aria-current</Code> 속성 적용
            </ListItem>
            <ListItem>
              삭제 모달은 <Code>Teleport</Code>와 함께 키보드 트랩 및 포커스
              관리 구현
            </ListItem>
            <ListItem>
              폼 유효성 검사 오류 메시지는 <Code>aria-describedby</Code>로 연결
            </ListItem>
            <ListItem>
              로딩 상태는 <Code>aria-busy</Code> 속성으로 스크린 리더에 전달
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
                  <Code>getPosts</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">PostListParams?</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">PostListResponse</Code>
                </TableCell>
                <TableCell>게시글 목록 조회</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>getPost</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">id: number</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">Post</Code>
                </TableCell>
                <TableCell>게시글 상세 조회</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>createPost</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">PostFormData</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">Post</Code>
                </TableCell>
                <TableCell>게시글 작성</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>updatePost</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">id, PostFormData</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">Post</Code>
                </TableCell>
                <TableCell>게시글 수정</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>deletePost</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">id: number</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">void</Code>
                </TableCell>
                <TableCell>게시글 삭제</TableCell>
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
                <TableHead>설명</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Code>usePosts</Code>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  게시글 목록 조회 (Store 연동, 자동 리페치)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>usePost</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">
                    id: Ref&lt;number&gt; | number
                  </Code>
                </TableCell>
                <TableCell>게시글 상세 조회</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>useCreatePost</Code>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>게시글 작성 뮤테이션</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>useUpdatePost</Code>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>게시글 수정 뮤테이션</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>useDeletePost</Code>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>게시글 삭제 뮤테이션</TableCell>
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
                    <Code>searchKeyword</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">Ref&lt;string&gt;</Code>
                  </TableCell>
                  <TableCell>검색어</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>sortBy</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">
                      Ref&lt;'latest' | 'views'&gt;
                    </Code>
                  </TableCell>
                  <TableCell>정렬 기준</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>skip</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">Ref&lt;number&gt;</Code>
                  </TableCell>
                  <TableCell>페이지 오프셋</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>selectedIds</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">Ref&lt;number[]&gt;</Code>
                  </TableCell>
                  <TableCell>선택된 게시글 ID 목록</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>isDeleteModalOpen</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">Ref&lt;boolean&gt;</Code>
                  </TableCell>
                  <TableCell>삭제 모달 표시 여부</TableCell>
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
                    <Code>setSearchKeyword</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">keyword: string</Code>
                  </TableCell>
                  <TableCell>검색어 설정 (skip 리셋)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>setSortBy</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">sortBy</Code>
                  </TableCell>
                  <TableCell>정렬 기준 설정</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>nextPage</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>다음 페이지</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>prevPage</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>이전 페이지</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>toggleSelect</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">id: number</Code>
                  </TableCell>
                  <TableCell>게시글 선택 토글</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>openDeleteModal</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">id: number</Code>
                  </TableCell>
                  <TableCell>삭제 모달 열기</TableCell>
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
