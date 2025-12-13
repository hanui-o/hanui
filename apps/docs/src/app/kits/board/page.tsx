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
} from '@hanui/react';

// Board Kit 코드들
const typeCode = `/**
 * Board Kit - Type Definitions
 * 게시판 기능에 필요한 타입 정의
 */

// 게시글 타입
export interface Post {
  id: number
  title: string
  content: string
  author: string
  createdAt: string
  updatedAt: string
  viewCount: number
  attachments?: Attachment[]
}

// 첨부파일 타입
export interface Attachment {
  id: number
  name: string
  url: string
  size: number
  type: string
}

// 게시글 목록 응답
export interface PostListResponse {
  data: Post[]
  pagination: Pagination
}

// 페이지네이션 타입
export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

// 게시글 작성/수정 폼 데이터
export interface PostFormData {
  title: string
  content: string
  attachments?: File[]
}

// 게시글 목록 조회 파라미터
export interface PostListParams {
  page?: number
  limit?: number
  search?: string
  sortBy?: 'latest' | 'oldest' | 'views'
}`;

const apiCode = `/**
 * Board Kit - API Functions
 * API 주소만 변경하면 바로 사용 가능
 */

import axios from 'axios'
import type {
  Post,
  PostListResponse,
  PostDetailResponse,
  PostFormData,
  PostListParams,
  ApiResponse,
} from '../types/board'

// ============================================
// API 주소 설정 (이 부분만 수정하세요)
// ============================================
const API_URL = 'https://your-api.com/api'

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터 (토큰 추가 등)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`
  }
  return config
})

// 응답 인터셉터 (에러 처리)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API 함수들
export async function getPosts(params?: PostListParams): Promise<PostListResponse> {
  const { data } = await api.get<PostListResponse>('/posts', { params })
  return data
}

export async function getPost(id: number): Promise<Post> {
  const { data } = await api.get<PostDetailResponse>(\`/posts/\${id}\`)
  return data.data
}

export async function createPost(formData: PostFormData): Promise<Post> {
  const form = new FormData()
  form.append('title', formData.title)
  form.append('content', formData.content)
  if (formData.attachments) {
    formData.attachments.forEach((file) => {
      form.append('attachments', file)
    })
  }
  const { data } = await api.post<ApiResponse<Post>>('/posts', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data.data
}

export async function updatePost(id: number, formData: PostFormData): Promise<Post> {
  const form = new FormData()
  form.append('title', formData.title)
  form.append('content', formData.content)
  if (formData.attachments) {
    formData.attachments.forEach((file) => {
      form.append('attachments', file)
    })
  }
  const { data } = await api.put<ApiResponse<Post>>(\`/posts/\${id}\`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data.data
}

export async function deletePost(id: number): Promise<void> {
  await api.delete(\`/posts/\${id}\`)
}`;

const hooksCode = `/**
 * Board Kit - React Query Hooks
 * 서버 데이터 관리 (캐싱, 리페치, 뮤테이션)
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  incrementViewCount,
} from '../api/board'
import type { PostListParams, PostFormData } from '../types/board'

// Query Keys
export const boardKeys = {
  all: ['board'] as const,
  lists: () => [...boardKeys.all, 'list'] as const,
  list: (params: PostListParams) => [...boardKeys.lists(), params] as const,
  details: () => [...boardKeys.all, 'detail'] as const,
  detail: (id: number) => [...boardKeys.details(), id] as const,
}

// 게시글 목록 조회 훅
export function usePosts(params?: PostListParams) {
  return useQuery({
    queryKey: boardKeys.list(params || {}),
    queryFn: () => getPosts(params),
  })
}

// 게시글 상세 조회 훅
export function usePost(id: number) {
  return useQuery({
    queryKey: boardKeys.detail(id),
    queryFn: async () => {
      await incrementViewCount(id)
      return getPost(id)
    },
    enabled: !!id,
  })
}

// 게시글 작성 훅
export function useCreatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: boardKeys.lists() })
    },
  })
}

// 게시글 수정 훅
export function useUpdatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PostFormData }) => updatePost(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: boardKeys.lists() })
      queryClient.invalidateQueries({ queryKey: boardKeys.detail(id) })
    },
  })
}

// 게시글 삭제 훅
export function useDeletePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: boardKeys.lists() })
    },
  })
}`;

const storeCode = `/**
 * Board Kit - Zustand Store
 * 클라이언트 UI 상태 관리 (검색, 필터, 선택 등)
 */

import { create } from 'zustand'
import type { PostListParams } from '../types/board'

interface BoardState {
  // 검색/필터 상태
  searchKeyword: string
  sortBy: PostListParams['sortBy']
  page: number
  limit: number

  // 선택된 항목
  selectedIds: number[]

  // 모달 상태
  isDeleteModalOpen: boolean
  deleteTargetId: number | null

  // Actions
  setSearchKeyword: (keyword: string) => void
  setSortBy: (sortBy: PostListParams['sortBy']) => void
  setPage: (page: number) => void
  resetFilters: () => void

  // 선택 관련
  toggleSelect: (id: number) => void
  selectAll: (ids: number[]) => void
  clearSelection: () => void

  // 삭제 모달 관련
  openDeleteModal: (id: number) => void
  closeDeleteModal: () => void
}

export const useBoardStore = create<BoardState>((set) => ({
  searchKeyword: '',
  sortBy: 'latest',
  page: 1,
  limit: 10,
  selectedIds: [],
  isDeleteModalOpen: false,
  deleteTargetId: null,

  setSearchKeyword: (keyword) => set({ searchKeyword: keyword, page: 1 }),
  setSortBy: (sortBy) => set({ sortBy, page: 1 }),
  setPage: (page) => set({ page }),
  resetFilters: () => set({ searchKeyword: '', sortBy: 'latest', page: 1 }),

  toggleSelect: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((i) => i !== id)
        : [...state.selectedIds, id],
    })),
  selectAll: (ids) => set({ selectedIds: ids }),
  clearSelection: () => set({ selectedIds: [] }),

  openDeleteModal: (id) => set({ isDeleteModalOpen: true, deleteTargetId: id }),
  closeDeleteModal: () => set({ isDeleteModalOpen: false, deleteTargetId: null }),
}))`;

const boardListCode = `/**
 * Board Kit - BoardList Component
 * 게시글 목록 (검색, 정렬, 페이지네이션)
 */

'use client'

import { usePosts } from '../hooks/useBoard'
import { useBoardStore } from '../store/boardStore'
import { BoardItem } from './BoardItem'
import type { Post } from '../types/board'

interface BoardListProps {
  onItemClick?: (post: Post) => void
  onWriteClick?: () => void
}

export function BoardList({ onItemClick, onWriteClick }: BoardListProps) {
  const { searchKeyword, sortBy, page, limit, selectedIds } = useBoardStore()
  const { setSearchKeyword, setSortBy, setPage, toggleSelect, selectAll, clearSelection } = useBoardStore()

  const { data, isLoading, error } = usePosts({
    page,
    limit,
    search: searchKeyword,
    sortBy,
  })

  const posts = data?.data || []
  const pagination = data?.pagination

  const handleSelectAll = () => {
    if (selectedIds.length === posts.length) {
      clearSelection()
    } else {
      selectAll(posts.map((p) => p.id))
    }
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">데이터를 불러오는 중 오류가 발생했습니다.</div>
  }

  return (
    <div className="space-y-4">
      {/* 검색 및 필터 */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="px-3 py-2 border rounded-md"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
            <option value="views">조회순</option>
          </select>
        </div>
        <button
          onClick={onWriteClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          글쓰기
        </button>
      </div>

      {/* 게시글 목록 */}
      <div className="border rounded-md">
        <div className="flex items-center gap-4 px-4 py-3 bg-gray-50 border-b font-medium">
          <input
            type="checkbox"
            checked={posts.length > 0 && selectedIds.length === posts.length}
            onChange={handleSelectAll}
            className="w-4 h-4"
          />
          <span className="flex-1">제목</span>
          <span className="w-24 text-center">작성자</span>
          <span className="w-24 text-center">작성일</span>
          <span className="w-16 text-center">조회</span>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-gray-500">로딩 중...</div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center text-gray-500">게시글이 없습니다.</div>
        ) : (
          posts.map((post) => (
            <BoardItem
              key={post.id}
              post={post}
              isSelected={selectedIds.includes(post.id)}
              onSelect={() => toggleSelect(post.id)}
              onClick={() => onItemClick?.(post)}
            />
          ))
        )}
      </div>

      {/* 페이지네이션 */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center">
          <nav className="flex items-center gap-1">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              이전
            </button>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={\`px-3 py-1 border rounded \${p === page ? 'bg-blue-600 text-white' : ''}\`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === pagination.totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              다음
            </button>
          </nav>
        </div>
      )}
    </div>
  )
}`;

const boardFormCode = `/**
 * Board Kit - BoardForm Component
 * 게시글 작성/수정 폼
 */

'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCreatePost, useUpdatePost } from '../hooks/useBoard'
import type { Post, PostFormData } from '../types/board'
import { useState } from 'react'

const postSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요').max(100, '제목은 100자 이내로 입력해주세요'),
  content: z.string().min(1, '내용을 입력해주세요').max(10000, '내용은 10000자 이내로 입력해주세요'),
})

type FormValues = z.infer<typeof postSchema>

interface BoardFormProps {
  post?: Post
  onSuccess?: () => void
  onCancel?: () => void
}

export function BoardForm({ post, onSuccess, onCancel }: BoardFormProps) {
  const isEdit = !!post
  const [files, setFiles] = useState<File[]>([])

  const createPost = useCreatePost()
  const updatePost = useUpdatePost()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
    },
  })

  const onSubmit = async (data: FormValues) => {
    try {
      const formData: PostFormData = {
        ...data,
        attachments: files.length > 0 ? files : undefined,
      }

      if (isEdit && post) {
        await updatePost.mutateAsync({ id: post.id, data: formData })
      } else {
        await createPost.mutateAsync(formData)
      }

      onSuccess?.()
    } catch (error) {
      console.error('저장 실패:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block font-medium mb-1">
          제목 <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          placeholder="제목을 입력하세요"
          className={\`w-full px-3 py-2 border rounded-md \${errors.title ? 'border-red-500' : 'border-gray-300'}\`}
          {...register('title')}
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="content" className="block font-medium mb-1">
          내용 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          placeholder="내용을 입력하세요"
          rows={10}
          className={\`w-full px-3 py-2 border rounded-md resize-none \${errors.content ? 'border-red-500' : 'border-gray-300'}\`}
          {...register('content')}
        />
        {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>}
      </div>

      <div>
        <label className="block font-medium mb-1">첨부파일</label>
        <input
          type="file"
          multiple
          onChange={(e) => e.target.files && setFiles(Array.from(e.target.files))}
          className="block w-full text-sm"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded-md hover:bg-gray-50">
          취소
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? '저장 중...' : isEdit ? '수정' : '등록'}
        </button>
      </div>
    </form>
  )
}`;

export default function BoardKitPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Board Kit"
        description="게시판 기능 키트 - API 주소만 바꾸면 바로 동작합니다."
      />

      <Section level="h2">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline">zustand</Badge>
          <Badge variant="outline">@tanstack/react-query</Badge>
          <Badge variant="outline">axios</Badge>
          <Badge variant="outline">react-hook-form</Badge>
          <Badge variant="outline">zod</Badge>
        </div>
      </Section>

      <Section level="h2">
        <Heading level="h2" id="features" title="기능" />
        <ul className="list-disc list-inside space-y-1 mt-4 text-gray-700">
          <li>목록 (페이지네이션, 검색, 정렬)</li>
          <li>상세 (조회수, 첨부파일)</li>
          <li>작성 (폼 + 유효성검사)</li>
          <li>수정 (기존 데이터 불러오기)</li>
          <li>삭제 (확인 모달)</li>
        </ul>
      </Section>

      <Section level="h2">
        <Heading level="h2" id="file-structure" title="파일 구조" />
        <Code variant="block" language="bash">
          {`src/
├── api/
│   └── board.ts              # API 함수 (CRUD)
├── hooks/
│   └── useBoard.ts           # React Query 훅
├── store/
│   └── boardStore.ts         # Zustand (UI 상태)
├── components/board/
│   ├── BoardList.tsx         # 목록
│   ├── BoardItem.tsx         # 목록 아이템
│   ├── BoardDetail.tsx       # 상세
│   ├── BoardForm.tsx         # 작성/수정 폼
│   └── BoardDeleteModal.tsx  # 삭제 모달
└── types/
    └── board.ts              # 타입 정의`}
        </Code>
      </Section>

      <Section level="h2">
        <Heading level="h2" id="installation" title="설치" />
        <Subsection level="h3">
          <Heading level="h3" title="1. 의존성 설치" />
          <Code variant="block" language="bash">
            {`npm install axios zustand @tanstack/react-query react-hook-form @hookform/resolvers zod`}
          </Code>
        </Subsection>
        <Subsection level="h3">
          <Heading level="h3" title="2. 파일 복사" />
          <p className="text-gray-600 mb-4">
            아래 코드 탭에서 필요한 파일들을 복사하세요.
          </p>
        </Subsection>
        <Subsection level="h3">
          <Heading level="h3" title="3. API 주소 변경" />
          <Code variant="block" language="typescript">
            {`// api/board.ts
const API_URL = 'https://your-api.com/api'  // ← 이 부분만 수정`}
          </Code>
        </Subsection>
      </Section>

      <Section level="h2">
        <Heading level="h2" id="code" title="코드" />
        <Tabs defaultValue="types">
          <TabsList>
            <TabsTrigger value="types">types/board.ts</TabsTrigger>
            <TabsTrigger value="api">api/board.ts</TabsTrigger>
            <TabsTrigger value="hooks">hooks/useBoard.ts</TabsTrigger>
            <TabsTrigger value="store">store/boardStore.ts</TabsTrigger>
            <TabsTrigger value="list">BoardList.tsx</TabsTrigger>
            <TabsTrigger value="form">BoardForm.tsx</TabsTrigger>
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
          <TabsContent value="list">
            <Code variant="block" language="typescript">
              {boardListCode}
            </Code>
          </TabsContent>
          <TabsContent value="form">
            <Code variant="block" language="typescript">
              {boardFormCode}
            </Code>
          </TabsContent>
        </Tabs>
      </Section>

      <Section level="h2">
        <Heading level="h2" id="usage-example" title="사용 예시" />
        <Code variant="block" language="tsx">
          {`// pages/board/index.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BoardList } from '@/components/board/BoardList'
import { useRouter } from 'next/navigation'

const queryClient = new QueryClient()

export default function BoardPage() {
  const router = useRouter()

  return (
    <QueryClientProvider client={queryClient}>
      <BoardList
        onItemClick={(post) => router.push(\`/board/\${post.id}\`)}
        onWriteClick={() => router.push('/board/write')}
      />
    </QueryClientProvider>
  )
}`}
        </Code>
      </Section>

      <PageNavigation
        prev={{ title: 'Kits', href: '/kits' }}
        next={{ title: 'Auth Kit', href: '/kits/auth' }}
      />
    </>
  );
}
