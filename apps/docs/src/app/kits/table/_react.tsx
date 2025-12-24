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
const typeCode = `// 상품 타입 (DummyJSON 응답 형식)
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
const apiCode = `import axios from 'axios'
import type { ProductListResponse, TableParams } from './types'

// 🔗 DummyJSON 무료 API (테스트용)
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

// Zustand Store 코드
const storeCode = `import { create } from 'zustand'
import type { SortState } from './types'

interface TableState {
  // 상태
  sort: SortState | null
  filters: FilterState[]
  pagination: PaginationState
  selectedRows: string[]

  // Actions
  setSort: (sort: SortState | null) => void
  addFilter: (filter: FilterState) => void
  removeFilter: (key: string) => void
  clearFilters: () => void
  setPage: (page: number) => void
  setPageSize: (size: number) => void
  toggleRowSelection: (id: string) => void
  selectAllRows: (ids: string[]) => void
  clearSelection: () => void
}

export const useTableStore = create<TableState>((set) => ({
  sort: null,
  filters: [],
  pagination: { page: 1, pageSize: 10, total: 0 },
  selectedRows: [],

  setSort: (sort) => set({ sort }),
  addFilter: (filter) =>
    set((state) => ({
      filters: [...state.filters.filter((f) => f.key !== filter.key), filter],
      pagination: { ...state.pagination, page: 1 },
    })),
  removeFilter: (key) =>
    set((state) => ({
      filters: state.filters.filter((f) => f.key !== key),
    })),
  clearFilters: () => set({ filters: [], pagination: { page: 1, pageSize: 10, total: 0 } }),
  setPage: (page) =>
    set((state) => ({ pagination: { ...state.pagination, page } })),
  setPageSize: (pageSize) =>
    set((state) => ({ pagination: { ...state.pagination, pageSize, page: 1 } })),
  toggleRowSelection: (id) =>
    set((state) => ({
      selectedRows: state.selectedRows.includes(id)
        ? state.selectedRows.filter((r) => r !== id)
        : [...state.selectedRows, id],
    })),
  selectAllRows: (ids) => set({ selectedRows: ids }),
  clearSelection: () => set({ selectedRows: [] }),
}))`;

// 유틸리티 코드
const utilsCode = `// 정렬 함수
export function sortData<T>(data: T[], sort: SortState | null): T[] {
  if (!sort) return data
  return [...data].sort((a, b) => {
    const aVal = a[sort.key as keyof T]
    const bVal = b[sort.key as keyof T]
    const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
    return sort.direction === 'asc' ? comparison : -comparison
  })
}

// 필터 함수
export function filterData<T>(data: T[], filters: FilterState[]): T[] {
  return data.filter((row) =>
    filters.every((filter) => {
      const value = String(row[filter.key as keyof T]).toLowerCase()
      const filterValue = filter.value.toLowerCase()
      switch (filter.operator) {
        case 'contains': return value.includes(filterValue)
        case 'equals': return value === filterValue
        case 'startsWith': return value.startsWith(filterValue)
        case 'endsWith': return value.endsWith(filterValue)
        default: return true
      }
    })
  )
}

// 페이지네이션 함수
export function paginateData<T>(
  data: T[],
  page: number,
  pageSize: number
): { data: T[]; total: number } {
  const start = (page - 1) * pageSize
  return {
    data: data.slice(start, start + pageSize),
    total: data.length,
  }
}

// CSV 내보내기
export function exportToCSV<T extends Record<string, unknown>>(
  data: T[],
  columns: { key: string; header: string }[],
  filename: string
): void {
  const headers = columns.map((c) => c.header).join(',')
  const rows = data.map((row) =>
    columns.map((c) => JSON.stringify(row[c.key] ?? '')).join(',')
  )
  const csv = [headers, ...rows].join('\\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = \`\${filename}.csv\`
  a.click()
  URL.revokeObjectURL(url)
}`;

// 사용 예시 코드
const usageCode = `'use client'

import { useTableStore } from '@/store/tableStore'
import { sortData, filterData, paginateData, exportToCSV } from '@/utils/table'
import { useMemo } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: string
}

const columns = [
  { key: 'name', header: '이름', sortable: true },
  { key: 'email', header: '이메일', sortable: true },
  { key: 'role', header: '역할', filterable: true },
]

function DataTable({ data }: { data: User[] }) {
  const { sort, filters, pagination, setSort, setPage, selectedRows } = useTableStore()

  const processedData = useMemo(() => {
    let result = filterData(data, filters)
    result = sortData(result, sort)
    return paginateData(result, pagination.page, pagination.pageSize)
  }, [data, sort, filters, pagination])

  return (
    <div>
      <button onClick={() => exportToCSV(data, columns, 'users')}>
        CSV 내보내기
      </button>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => col.sortable && setSort({
                  key: col.key,
                  direction: sort?.key === col.key && sort.direction === 'asc' ? 'desc' : 'asc'
                })}
              >
                {col.header}
                {sort?.key === col.key && (sort.direction === 'asc' ? ' ↑' : ' ↓')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {processedData.data.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}`;

export function ReactTableContent() {
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
            <Badge variant="outline-gray">Zustand</Badge>
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
├── store/
│   └── tableStore.ts     # Zustand (테이블 상태)
├── components/table/
│   ├── DataTable.tsx     # 메인 테이블
│   ├── TableHeader.tsx   # 헤더 (정렬)
│   ├── TableFilter.tsx   # 필터 UI
│   ├── TablePagination.tsx # 페이지네이션
│   └── ExportButton.tsx  # 내보내기 버튼
├── utils/
│   └── table.ts          # 유틸리티 함수
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
              {`npm install zustand`}
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
              <TabsTrigger value="store">store.ts</TabsTrigger>
              <TabsTrigger value="utils">utils.ts</TabsTrigger>
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
            <TabsContent value="store">
              <Code variant="block" language="typescript">
                {storeCode}
              </Code>
            </TabsContent>
            <TabsContent value="utils">
              <Code variant="block" language="typescript">
                {utilsCode}
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
        {/* 유틸리티 함수 */}
        <Section level="h2">
          <Heading level="h2" id="utils" title="유틸리티 함수" />
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
                  <Code>sortData</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">data, sort</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">T[]</Code>
                </TableCell>
                <TableCell>데이터 정렬</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>filterData</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">data, filters</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">T[]</Code>
                </TableCell>
                <TableCell>데이터 필터링</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>paginateData</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">data, page, pageSize</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">{`{ data, total }`}</Code>
                </TableCell>
                <TableCell>페이지네이션</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>exportToCSV</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">data, columns, filename</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">void</Code>
                </TableCell>
                <TableCell>CSV 파일 다운로드</TableCell>
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
                    <Code>sort</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">SortState | null</Code>
                  </TableCell>
                  <TableCell>현재 정렬 상태</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>filters</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">FilterState[]</Code>
                  </TableCell>
                  <TableCell>적용된 필터 목록</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>pagination</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">PaginationState</Code>
                  </TableCell>
                  <TableCell>페이지네이션 상태</TableCell>
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
                    <Code className="text-xs">sort</Code>
                  </TableCell>
                  <TableCell>정렬 설정</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>addFilter</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">filter</Code>
                  </TableCell>
                  <TableCell>필터 추가</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>removeFilter</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">key</Code>
                  </TableCell>
                  <TableCell>필터 제거</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>setPage</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">page</Code>
                  </TableCell>
                  <TableCell>페이지 변경</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>toggleRowSelection</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">id</Code>
                  </TableCell>
                  <TableCell>행 선택 토글</TableCell>
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
