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
const typeCode = `// 게시글 타입
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

// API 코드
const apiCode = `import axios from 'axios'
import type { Post, PostListResponse, PostFormData, PostListParams } from './types'

// API 주소 설정 (이 부분만 수정)
const API_URL = 'https://your-api.com/api'

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

// 요청 인터셉터 (토큰 추가)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`
  }
  return config
})

// API 함수
export async function getPosts(params?: PostListParams): Promise<PostListResponse> {
  const { data } = await api.get('/posts', { params })
  return data
}

export async function getPost(id: number): Promise<Post> {
  const { data } = await api.get(\`/posts/\${id}\`)
  return data.data
}

export async function createPost(formData: PostFormData): Promise<Post> {
  const form = new FormData()
  form.append('title', formData.title)
  form.append('content', formData.content)
  formData.attachments?.forEach((file) => form.append('attachments', file))
  const { data } = await api.post('/posts', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data.data
}

export async function updatePost(id: number, formData: PostFormData): Promise<Post> {
  const form = new FormData()
  form.append('title', formData.title)
  form.append('content', formData.content)
  formData.attachments?.forEach((file) => form.append('attachments', file))
  const { data } = await api.put(\`/posts/\${id}\`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data.data
}

export async function deletePost(id: number): Promise<void> {
  await api.delete(\`/posts/\${id}\`)
}`;

// React Query Hooks 코드
const hooksCode = `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getPosts, getPost, createPost, updatePost, deletePost } from './api'
import type { PostListParams, PostFormData } from './types'

// Query Keys
export const boardKeys = {
  all: ['board'] as const,
  lists: () => [...boardKeys.all, 'list'] as const,
  list: (params: PostListParams) => [...boardKeys.lists(), params] as const,
  details: () => [...boardKeys.all, 'detail'] as const,
  detail: (id: number) => [...boardKeys.details(), id] as const,
}

// 게시글 목록 조회
export function usePosts(params?: PostListParams) {
  return useQuery({
    queryKey: boardKeys.list(params || {}),
    queryFn: () => getPosts(params),
  })
}

// 게시글 상세 조회
export function usePost(id: number) {
  return useQuery({
    queryKey: boardKeys.detail(id),
    queryFn: () => getPost(id),
    enabled: !!id,
  })
}

// 게시글 작성
export function useCreatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: boardKeys.lists() })
    },
  })
}

// 게시글 수정
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

// 게시글 삭제
export function useDeletePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: boardKeys.lists() })
    },
  })
}`;

// Zustand Store 코드
const storeCode = `import { create } from 'zustand'
import type { PostListParams } from './types'

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
  toggleSelect: (id: number) => void
  selectAll: (ids: number[]) => void
  clearSelection: () => void
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

// 사용 예시 코드
const usageCode = `'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { usePosts, useCreatePost } from '@/hooks/useBoard'
import { useBoardStore } from '@/store/boardStore'

const queryClient = new QueryClient()

function BoardList() {
  const { page, searchKeyword, sortBy, setPage } = useBoardStore()
  const { data, isLoading } = usePosts({ page, search: searchKeyword, sortBy })

  if (isLoading) return <div>로딩 중...</div>

  return (
    <div>
      {data?.data.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.author} · {post.createdAt}</p>
        </article>
      ))}
    </div>
  )
}

export default function BoardPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <BoardList />
    </QueryClientProvider>
  )
}`;

export default function BoardKitPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Board Kit"
        description="게시판 기능 키트. API 주소만 바꾸면 바로 동작합니다."
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
              <Badge variant="outline-gray">React Hook Form</Badge>
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
├── hooks/
│   └── useBoard.ts       # React Query 훅
├── store/
│   └── boardStore.ts     # Zustand (UI 상태)
├── components/board/
│   ├── BoardList.tsx     # 목록
│   ├── BoardItem.tsx     # 목록 아이템
│   ├── BoardDetail.tsx   # 상세
│   ├── BoardForm.tsx     # 작성/수정 폼
│   └── DeleteModal.tsx   # 삭제 확인 모달
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
                {`npm install axios zustand @tanstack/react-query react-hook-form @hookform/resolvers zod`}
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
                <TabsTrigger value="hooks">hooks.ts</TabsTrigger>
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
                게시글 목록은 시맨틱 마크업(<Code>article</Code>,{' '}
                <Code>h2</Code>) 사용 권장
              </ListItem>
              <ListItem>
                페이지네이션에 <Code>aria-label</Code> 및{' '}
                <Code>aria-current</Code> 속성 적용
              </ListItem>
              <ListItem>
                삭제 모달은 <Code>AlertDialog</Code> 컴포넌트 사용으로 키보드
                트랩 및 포커스 관리 자동 처리
              </ListItem>
              <ListItem>
                폼 유효성 검사 오류 메시지는 <Code>aria-describedby</Code>로
                연결
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
                    <Code>usePosts</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">PostListParams?</Code>
                  </TableCell>
                  <TableCell>게시글 목록 조회 (캐싱, 자동 리페치)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>usePost</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">id: number</Code>
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
                      <Code>searchKeyword</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>검색어</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>sortBy</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'latest' | 'oldest' | 'views'
                      </Code>
                    </TableCell>
                    <TableCell>정렬 기준</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>page</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>현재 페이지</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>selectedIds</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number[]</Code>
                    </TableCell>
                    <TableCell>선택된 게시글 ID 목록</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>isDeleteModalOpen</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
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
                    <TableCell>검색어 설정 (페이지 1로 리셋)</TableCell>
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
                      <Code>setPage</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">page: number</Code>
                    </TableCell>
                    <TableCell>페이지 변경</TableCell>
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

      <PageNavigation
        prev={{ title: 'Kits', href: '/kits' }}
        next={{ title: 'Auth Kit', href: '/kits/auth' }}
      />
    </>
  );
}
