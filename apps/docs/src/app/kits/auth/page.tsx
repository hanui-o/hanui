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

// 타입 정의 코드 (DummyJSON 기준)
const typeCode = `// 사용자 타입 (DummyJSON 응답 형식)
export interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
}

// 로그인 요청 (DummyJSON은 username 사용)
export interface LoginRequest {
  username: string
  password: string
  expiresInMins?: number
}

// 인증 응답 (DummyJSON 형식)
export interface AuthResponse extends User {
  accessToken: string
  refreshToken: string
}

// 테스트 계정 (DummyJSON 제공)
// username: 'emilys', password: 'emilyspass'
// 전체 목록: https://dummyjson.com/users`;

// API 코드 (DummyJSON 사용)
const apiCode = `import axios from 'axios'
import type { LoginRequest, AuthResponse, User } from './types'

// 🔗 DummyJSON 무료 API (테스트용)
const API_URL = 'https://dummyjson.com'

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

// 로그인
// 테스트 계정: username: 'emilys', password: 'emilyspass'
export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await api.post('/auth/login', {
    username: data.username,
    password: data.password,
    expiresInMins: data.expiresInMins || 30,
  })
  return response.data
}

// 현재 사용자 정보 조회 (토큰 필요)
export async function getMe(token: string): Promise<User> {
  const { data } = await api.get('/auth/me', {
    headers: { Authorization: \`Bearer \${token}\` }
  })
  return data
}

// 토큰 갱신
export async function refreshToken(token: string): Promise<AuthResponse> {
  const { data } = await api.post('/auth/refresh', {
    refreshToken: token,
    expiresInMins: 30,
  })
  return data
}

// 로그아웃 (로컬에서 토큰 삭제)
export function logout(): void {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}`;

// Zustand Store 코드
const storeCode = `import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from './types'

interface AuthState {
  // 상태
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean

  // Actions
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        set({ user: null, isAuthenticated: false })
      },
    }),
    { name: 'auth-storage', partialize: (state) => ({ user: state.user }) }
  )
)`;

// 사용 예시 코드
const usageCode = `'use client'

import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { login } from '@/api/auth'
import { useRouter } from 'next/navigation'

function LoginForm() {
  const { setUser } = useAuthStore()
  const router = useRouter()
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    const formData = new FormData(e.currentTarget)

    try {
      // DummyJSON 테스트 계정: emilys / emilyspass
      const response = await login({
        username: formData.get('username') as string,
        password: formData.get('password') as string,
      })

      // 토큰 저장
      localStorage.setItem('accessToken', response.accessToken)
      localStorage.setItem('refreshToken', response.refreshToken)

      // 사용자 정보 저장 (응답에 포함됨)
      setUser(response)
      router.push('/dashboard')
    } catch (err) {
      setError('로그인 실패. 계정을 확인해주세요.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      {/* DummyJSON 테스트 계정 안내 */}
      <p className="text-sm text-gray-500">
        테스트: emilys / emilyspass
      </p>

      <input name="username" type="text" placeholder="사용자명" required />
      <input name="password" type="password" placeholder="비밀번호" required />
      <button type="submit">로그인</button>
    </form>
  )
}`;

export default function AuthKitPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Auth Kit"
        description="인증 기능 키트. 로그인, 회원가입, 비밀번호 찾기를 지원합니다."
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
              <ListItem>로그인 (이메일/비밀번호)</ListItem>
              <ListItem>회원가입 (폼 유효성 검사)</ListItem>
              <ListItem>로그아웃</ListItem>
              <ListItem>비밀번호 찾기 (이메일 발송)</ListItem>
              <ListItem>비밀번호 재설정</ListItem>
              <ListItem>토큰 자동 갱신 (Refresh Token)</ListItem>
              <ListItem>인증 상태 유지 (Zustand Persist)</ListItem>
            </List>
          </Section>

          {/* 파일 구조 */}
          <Section level="h2">
            <Heading level="h2" id="file-structure" title="파일 구조" />
            <Code variant="block" language="bash">
              {`src/
├── api/
│   └── auth.ts           # API 함수
├── store/
│   └── authStore.ts      # Zustand (인증 상태)
├── components/auth/
│   ├── LoginForm.tsx     # 로그인 폼
│   ├── SignupForm.tsx    # 회원가입 폼
│   ├── ForgotPassword.tsx # 비밀번호 찾기
│   └── ResetPassword.tsx # 비밀번호 재설정
├── hooks/
│   └── useAuth.ts        # 인증 훅
└── types/
    └── auth.ts           # 타입 정의`}
            </Code>
          </Section>

          {/* 설치 */}
          <Section level="h2">
            <Heading level="h2" id="installation" title="설치" />

            <Subsection level="h3">
              <Heading level="h3" title="1. 의존성 설치" />
              <Code variant="block" language="bash">
                {`npm install axios zustand react-hook-form @hookform/resolvers zod`}
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
                {`// api/auth.ts
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
                폼 필드에 <Code>label</Code> 연결 필수
              </ListItem>
              <ListItem>
                오류 메시지는 <Code>aria-describedby</Code>로 연결
              </ListItem>
              <ListItem>
                비밀번호 표시/숨기기 토글에 <Code>aria-pressed</Code> 적용
              </ListItem>
              <ListItem>
                로딩 상태에 <Code>aria-busy</Code> 속성 적용
              </ListItem>
              <ListItem>
                비밀번호 강도 표시기에 시각적 + 텍스트 피드백 제공
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
                    <Code>login</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">LoginRequest</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">AuthResponse</Code>
                  </TableCell>
                  <TableCell>로그인</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>signup</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">SignupRequest</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">AuthResponse</Code>
                  </TableCell>
                  <TableCell>회원가입</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>logout</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <Code className="text-xs">void</Code>
                  </TableCell>
                  <TableCell>로그아웃</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>forgotPassword</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">ForgotPasswordRequest</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">void</Code>
                  </TableCell>
                  <TableCell>비밀번호 찾기 이메일 발송</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>resetPassword</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">ResetPasswordRequest</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">void</Code>
                  </TableCell>
                  <TableCell>비밀번호 재설정</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>getMe</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <Code className="text-xs">User</Code>
                  </TableCell>
                  <TableCell>현재 로그인 사용자 정보</TableCell>
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
                      <Code>user</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">User | null</Code>
                    </TableCell>
                    <TableCell>현재 로그인 사용자</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>isAuthenticated</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>인증 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>isLoading</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>로딩 상태</TableCell>
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
                      <Code>setUser</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">user: User | null</Code>
                    </TableCell>
                    <TableCell>사용자 정보 설정</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>setLoading</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">loading: boolean</Code>
                    </TableCell>
                    <TableCell>로딩 상태 설정</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>logout</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>로그아웃 (토큰 삭제)</TableCell>
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
        prev={{ title: 'Board Kit', href: '/kits/board' }}
        next={{ title: 'Table Kit', href: '/kits/table' }}
      />
    </>
  );
}
