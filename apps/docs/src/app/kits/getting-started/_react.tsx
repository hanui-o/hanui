'use client';

import {
  PageSection as Section,
  Heading,
  Subsection,
} from '@/components/content';
import { CodeBlock } from '@/components/content/CodeBlock';
import {
  Code,
  Card,
  CardBody,
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
import Link from 'next/link';

// 프로젝트 구조 코드
const projectStructure = `src/
├── features/
│   └── board/              # Kit별 폴더
│       ├── api/
│       │   └── boardApi.ts
│       ├── hooks/
│       │   └── useBoard.ts
│       ├── store/
│       │   └── boardStore.ts
│       └── types/
│           └── board.ts
├── providers/
│   └── QueryProvider.tsx
└── app/
    └── board/
        └── page.tsx`;

// React Query Provider 코드
const queryProviderCode = `// src/providers/QueryProvider.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}`;

// Layout 설정 코드
const layoutCode = `// src/app/layout.tsx
import { QueryProvider } from '@/providers/QueryProvider'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}`;

// Board 사용 예시 코드
const boardExampleCode = `// src/app/board/page.tsx
'use client'

import { usePosts } from '@/features/board/hooks/useBoard'
import { useBoardStore } from '@/features/board/store/boardStore'
import { Button, Card, Input } from '@hanui/react'

export default function BoardPage() {
  const { search, setSearch, skip, limit, nextPage, prevPage } = useBoardStore()
  const { data, isLoading } = usePosts({ search, limit, skip })

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="p-4">
      <Input
        placeholder="검색..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />

      <div className="space-y-4">
        {data?.posts.map(post => (
          <Card key={post.id}>
            <CardHeader>
              <h3 className="font-bold">{post.title}</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600">{post.body.slice(0, 100)}...</p>
              <div className="flex gap-4 mt-2 text-sm text-gray-500">
                <span>조회 {post.views}</span>
                <span>좋아요 {post.reactions.likes}</span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <Button onClick={prevPage} disabled={skip === 0}>이전</Button>
        <span className="py-2">
          {skip + 1} - {skip + (data?.posts.length || 0)} / {data?.total}
        </span>
        <Button onClick={nextPage} disabled={skip + limit >= (data?.total || 0)}>
          다음
        </Button>
      </div>
    </div>
  )
}`;

// API 엔드포인트 테이블 데이터
const apiEndpoints = [
  {
    kit: 'Board',
    endpoint: '/posts',
    description: '게시글 CRUD',
    testUrl: 'https://dummyjson.com/posts',
  },
  {
    kit: 'Auth',
    endpoint: '/auth/login',
    description: '로그인 (emilys / emilyspass)',
    testUrl: 'https://dummyjson.com/auth/login',
  },
  {
    kit: 'Table',
    endpoint: '/products',
    description: '상품 목록, 정렬, 검색',
    testUrl: 'https://dummyjson.com/products',
  },
  {
    kit: 'Dashboard',
    endpoint: '/products + /comments',
    description: '통계 데이터 계산',
    testUrl: 'https://dummyjson.com/products',
  },
  {
    kit: 'Search',
    endpoint: '/products/search',
    description: '검색, 자동완성',
    testUrl: 'https://dummyjson.com/products/search?q=phone',
  },
  {
    kit: 'Notification',
    endpoint: '/comments',
    description: '알림 시뮬레이션',
    testUrl: 'https://dummyjson.com/comments',
  },
];

// DummyJSON 특징
const dummyJsonFeatures = [
  {
    feature: 'Pagination',
    description: 'skip과 limit 파라미터 사용 (page 대신)',
    example: '?limit=10&skip=0',
  },
  {
    feature: 'Search',
    description: '/resource/search?q=keyword 형식',
    example: '/products/search?q=phone',
  },
  {
    feature: 'Sort',
    description: 'sortBy와 order 파라미터',
    example: '?sortBy=price&order=asc',
  },
  {
    feature: 'Filter',
    description: '카테고리별 필터링',
    example: '/products/category/smartphones',
  },
];

export function ReactGettingStartedContent() {
  return (
    <Tabs defaultValue="setup" className="w-full">
      <TabsList>
        <TabsTrigger value="setup">프로젝트 설정</TabsTrigger>
        <TabsTrigger value="api">API 연동</TabsTrigger>
        <TabsTrigger value="test">테스트 방법</TabsTrigger>
      </TabsList>

      {/* 프로젝트 설정 탭 */}
      <TabsContent value="setup">
        <Section level="h2">
          <Heading level="h2" id="create-project" title="1. 프로젝트 생성" />
          <p className="text-krds-gray-70 mt-4 mb-4">
            Next.js 프로젝트를 생성하고 필요한 패키지를 설치합니다.
          </p>
          <CodeBlock
            code={`# Next.js 프로젝트 생성
npx create-next-app@latest my-hanui-project
cd my-hanui-project

# 필수 패키지 설치
pnpm add @hanui/react axios @tanstack/react-query zustand

# 선택적 패키지 (폼 관련 Kit 사용 시)
pnpm add react-hook-form zod @hookform/resolvers`}
            language="bash"
          />
        </Section>

        <Section level="h2">
          <Heading level="h2" id="project-structure" title="2. 프로젝트 구조" />
          <p className="text-krds-gray-70 mt-4 mb-4">
            권장하는 폴더 구조입니다. Kit별로 기능을 분리합니다.
          </p>
          <CodeBlock code={projectStructure} language="plaintext" />
        </Section>

        <Section level="h2">
          <Heading level="h2" id="provider-setup" title="3. Provider 설정" />
          <p className="text-krds-gray-70 mt-4 mb-4">
            React Query Provider를 설정합니다.
          </p>

          <Subsection level="h3">
            <Heading level="h3" id="query-provider" title="QueryProvider.tsx" />
            <CodeBlock code={queryProviderCode} language="tsx" />
          </Subsection>

          <Subsection level="h3">
            <Heading level="h3" id="layout-setup" title="layout.tsx 수정" />
            <CodeBlock code={layoutCode} language="tsx" />
          </Subsection>
        </Section>

        <Section level="h2">
          <Heading level="h2" id="copy-kit-code" title="4. Kit 코드 복사" />
          <p className="text-krds-gray-70 mt-4 mb-4">
            사용할 Kit 페이지에서 코드를 복사합니다.
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-4 p-4 border border-krds-gray-20 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-krds-primary-5 text-krds-primary-base rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-krds-gray-90">types/ 폴더</h4>
                <p className="text-sm text-krds-gray-60">
                  타입 정의 코드를 <Code>src/features/[kit]/types/</Code>에 복사
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 border border-krds-gray-20 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-krds-primary-5 text-krds-primary-base rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-krds-gray-90">api/ 폴더</h4>
                <p className="text-sm text-krds-gray-60">
                  API 코드를 <Code>src/features/[kit]/api/</Code>에 복사
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 border border-krds-gray-20 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-krds-primary-5 text-krds-primary-base rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-krds-gray-90">hooks/ 폴더</h4>
                <p className="text-sm text-krds-gray-60">
                  React Query 훅을 <Code>src/features/[kit]/hooks/</Code>에 복사
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 border border-krds-gray-20 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-krds-primary-5 text-krds-primary-base rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h4 className="font-semibold text-krds-gray-90">store/ 폴더</h4>
                <p className="text-sm text-krds-gray-60">
                  Zustand 스토어를 <Code>src/features/[kit]/store/</Code>에 복사
                </p>
              </div>
            </div>
          </div>
        </Section>
      </TabsContent>

      {/* API 연동 탭 */}
      <TabsContent value="api">
        <Section level="h2">
          <Heading level="h2" id="dummyjson-intro" title="DummyJSON API" />
          <p className="text-krds-gray-70 mt-4 mb-4">
            모든 Kit은 <strong>DummyJSON</strong> 무료 API로 테스트할 수
            있습니다. 별도 설정 없이 바로 사용 가능합니다.
          </p>
          <Alert variant="info" className="mb-4">
            <strong>Base URL:</strong> https://dummyjson.com
          </Alert>
        </Section>

        <Section level="h2">
          <Heading level="h2" id="api-endpoints" title="Kit별 엔드포인트" />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kit</TableHead>
                <TableHead>엔드포인트</TableHead>
                <TableHead>용도</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiEndpoints.map((item) => (
                <TableRow key={item.kit}>
                  <TableCell>
                    <Link
                      href={`/kits/${item.kit.toLowerCase()}`}
                      className="text-krds-primary-base hover:underline"
                    >
                      {item.kit} Kit
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Code>{item.endpoint}</Code>
                  </TableCell>
                  <TableCell className="text-krds-gray-60">
                    {item.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>

        <Section level="h2">
          <Heading level="h2" id="pagination" title="페이지네이션 방식" />
          <p className="text-krds-gray-70 mt-4 mb-4">
            DummyJSON은 <Code>page</Code> 대신 <Code>skip</Code>과{' '}
            <Code>limit</Code>을 사용합니다.
          </p>
          <CodeBlock
            code={`// 일반적인 page 방식 (지원 안 함)
GET /posts?page=2&limit=10  ❌

// DummyJSON 방식 (skip 사용)
GET /posts?skip=10&limit=10  ✅

// 페이지 계산
const skip = (page - 1) * limit
// page 1: skip=0, page 2: skip=10, page 3: skip=20...`}
            language="typescript"
          />
        </Section>

        <Section level="h2">
          <Heading level="h2" id="api-features" title="지원 기능" />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>기능</TableHead>
                <TableHead>설명</TableHead>
                <TableHead>예시</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyJsonFeatures.map((item) => (
                <TableRow key={item.feature}>
                  <TableCell className="font-medium">{item.feature}</TableCell>
                  <TableCell className="text-krds-gray-70">
                    {item.description}
                  </TableCell>
                  <TableCell>
                    <Code>{item.example}</Code>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>

        <Section level="h2">
          <Heading level="h2" id="custom-api" title="실제 API로 변경하기" />
          <p className="text-krds-gray-70 mt-4 mb-4">
            테스트 후 실제 API로 전환하려면 API 파일의 <Code>API_URL</Code>만
            변경하면 됩니다.
          </p>
          <CodeBlock
            code={`// api/boardApi.ts

// 테스트용 (DummyJSON)
const API_URL = 'https://dummyjson.com'

// 실제 서버로 변경
const API_URL = 'https://your-api.com/api'

// 환경변수 사용 (권장)
const API_URL = process.env.NEXT_PUBLIC_API_URL`}
            language="typescript"
          />
          <Alert variant="warning" className="mt-4">
            <strong>주의:</strong> 실제 API로 전환 시 응답 형식이 다를 수
            있습니다. 타입 정의와 API 함수의 응답 변환 로직을 확인하세요.
          </Alert>
        </Section>
      </TabsContent>

      {/* 테스트 방법 탭 */}
      <TabsContent value="test">
        <Section level="h2">
          <Heading level="h2" id="test-account" title="테스트 계정" />
          <p className="text-krds-gray-70 mt-4 mb-4">
            Auth Kit 테스트에 사용할 수 있는 계정입니다.
          </p>
          <Card className="border-krds-primary-20 bg-krds-primary-5">
            <CardBody>
              <div className="space-y-2">
                <div className="flex gap-4">
                  <span className="font-semibold w-24">Username:</span>
                  <Code>emilys</Code>
                </div>
                <div className="flex gap-4">
                  <span className="font-semibold w-24">Password:</span>
                  <Code>emilyspass</Code>
                </div>
              </div>
              <p className="text-sm text-krds-gray-60 mt-4">
                전체 사용자 목록:{' '}
                <a
                  href="https://dummyjson.com/users"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-krds-primary-base hover:underline"
                >
                  https://dummyjson.com/users
                </a>
              </p>
            </CardBody>
          </Card>
        </Section>

        <Section level="h2">
          <Heading level="h2" id="example-usage" title="사용 예시" />
          <p className="text-krds-gray-70 mt-4 mb-4">
            Board Kit을 사용한 게시글 목록 페이지 예시입니다.
          </p>
          <CodeBlock code={boardExampleCode} language="tsx" />
        </Section>

        <Section level="h2">
          <Heading level="h2" id="important-notes" title="주의사항" />
          <List className="mt-4">
            <ListItem>
              <strong>데이터 영속성:</strong> DummyJSON의 수정/삭제는
              시뮬레이션입니다. 실제 데이터는 변경되지 않습니다.
            </ListItem>
            <ListItem>
              <strong>CORS:</strong> DummyJSON은 CORS가 허용되어 클라이언트에서
              직접 호출 가능합니다.
            </ListItem>
            <ListItem>
              <strong>Rate Limit:</strong> 무료 API이므로 과도한 요청은
              피해주세요.
            </ListItem>
            <ListItem>
              <strong>localStorage:</strong> 일부 기능(읽음 표시, 설정 저장)은
              localStorage에 저장됩니다.
            </ListItem>
          </List>
        </Section>

        <Section level="h2">
          <Heading level="h2" id="quick-test" title="빠른 테스트" />
          <p className="text-krds-gray-70 mt-4 mb-4">
            브라우저 콘솔에서 바로 API를 테스트해볼 수 있습니다.
          </p>
          <CodeBlock
            code={`// 게시글 목록 조회
fetch('https://dummyjson.com/posts?limit=5')
  .then(r => r.json())
  .then(console.log)

// 로그인 테스트
fetch('https://dummyjson.com/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'emilys',
    password: 'emilyspass'
  })
}).then(r => r.json()).then(console.log)

// 상품 검색
fetch('https://dummyjson.com/products/search?q=phone')
  .then(r => r.json())
  .then(console.log)`}
            language="javascript"
          />
        </Section>
      </TabsContent>
    </Tabs>
  );
}
