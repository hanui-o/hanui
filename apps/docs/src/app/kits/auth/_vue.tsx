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

// 타입 정의 코드
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

// API 코드
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

// Vue Query Composables 코드
const composablesCode = `import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/authStore'
import { login, getMe, refreshToken } from '../api/authApi'
import type { LoginRequest } from '../types/auth'

// 로그인
export function useLogin() {
  const store = useAuthStore()
  const router = useRouter()

  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (response) => {
      store.setTokens(response.accessToken, response.refreshToken)
      store.setUser(response)
      router.push('/dashboard')
    },
    onError: () => {
      store.error = '로그인에 실패했습니다.'
    },
  })
}

// 현재 사용자 조회
export function useCurrentUser() {
  const store = useAuthStore()

  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => getMe(store.accessToken!),
    enabled: () => !!store.accessToken,
    retry: false,
  })
}

// 로그아웃
export function useLogout() {
  const store = useAuthStore()
  const router = useRouter()
  const queryClient = useQueryClient()

  return () => {
    store.logout()
    queryClient.clear()
    router.push('/login')
  }
}`;

// Pinia Store 코드
const storeCode = `import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from './types'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const accessToken = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!accessToken.value)
  const userName = computed(() => {
    if (!user.value) return ''
    return \`\${user.value.firstName} \${user.value.lastName}\`
  })

  // Actions
  function setUser(userData: User) {
    user.value = userData
  }

  function setTokens(access: string, refresh: string) {
    accessToken.value = access
    localStorage.setItem('accessToken', access)
    localStorage.setItem('refreshToken', refresh)
  }

  function logout() {
    user.value = null
    accessToken.value = null
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  function initFromStorage() {
    const token = localStorage.getItem('accessToken')
    if (token) {
      accessToken.value = token
    }
  }

  return {
    user,
    accessToken,
    isLoading,
    error,
    isAuthenticated,
    userName,
    setUser,
    setTokens,
    logout,
    initFromStorage,
  }
}, {
  persist: {
    pick: ['user'],
  },
})`;

// 사용 예시 코드
const usageCode = `<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/store/authStore'
import { useLogin } from '@/composables/useAuth'

const store = useAuthStore()
const username = ref('')
const password = ref('')
const { mutate: login, isPending, error } = useLogin()

function handleSubmit() {
  login({ username: username.value, password: password.value })
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow">
      <h1 class="text-2xl font-bold text-center mb-6">로그인</h1>

      <!-- 테스트 계정 안내 -->
      <div class="mb-4 p-3 bg-blue-50 rounded text-sm text-blue-700">
        테스트 계정: emilys / emilyspass
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- 에러 메시지 -->
        <div v-if="error" class="p-3 bg-red-50 text-red-700 rounded">
          로그인에 실패했습니다.
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">사용자명</label>
          <input
            v-model="username"
            type="text"
            required
            class="w-full p-3 border rounded"
            placeholder="username"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">비밀번호</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full p-3 border rounded"
            placeholder="password"
          />
        </div>

        <button
          type="submit"
          :disabled="isPending"
          class="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {{ isPending ? '로그인 중...' : '로그인' }}
        </button>
      </form>
    </div>
  </div>
</template>`;

export function VueAuthContent() {
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
            <ListItem>로그인 (이메일/비밀번호)</ListItem>
            <ListItem>회원가입 (폼 유효성 검사)</ListItem>
            <ListItem>로그아웃</ListItem>
            <ListItem>비밀번호 찾기 (이메일 발송)</ListItem>
            <ListItem>비밀번호 재설정</ListItem>
            <ListItem>토큰 자동 갱신 (Refresh Token)</ListItem>
            <ListItem>인증 상태 유지 (Pinia Persist)</ListItem>
          </List>
        </Section>

        {/* 파일 구조 */}
        <Section level="h2">
          <Heading level="h2" id="file-structure" title="파일 구조" />
          <Code variant="block" language="bash">
            {`src/
├── api/
│   └── auth.ts           # API 함수
├── composables/
│   └── useAuth.ts        # Vue Query 훅
├── store/
│   └── authStore.ts      # Pinia (인증 상태)
├── components/auth/
│   ├── LoginForm.vue     # 로그인 폼
│   ├── SignupForm.vue    # 회원가입 폼
│   ├── ForgotPassword.vue # 비밀번호 찾기
│   └── ResetPassword.vue # 비밀번호 재설정
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
                  <Code>getMe</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">token: string</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">User</Code>
                </TableCell>
                <TableCell>현재 로그인 사용자 정보</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>refreshToken</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">token: string</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">AuthResponse</Code>
                </TableCell>
                <TableCell>토큰 갱신</TableCell>
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
                  <Code>useLogin</Code>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>로그인 뮤테이션 (성공 시 라우터 이동)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>useCurrentUser</Code>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>현재 사용자 조회 (토큰 있을 때만 실행)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>useLogout</Code>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>로그아웃 함수 반환</TableCell>
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
                    <Code>user</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">Ref&lt;User | null&gt;</Code>
                  </TableCell>
                  <TableCell>현재 로그인 사용자</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>accessToken</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">Ref&lt;string | null&gt;</Code>
                  </TableCell>
                  <TableCell>액세스 토큰</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>isAuthenticated</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">ComputedRef&lt;boolean&gt;</Code>
                  </TableCell>
                  <TableCell>인증 여부 (computed)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>isLoading</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">Ref&lt;boolean&gt;</Code>
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
                    <Code className="text-xs">user: User</Code>
                  </TableCell>
                  <TableCell>사용자 정보 설정</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>setTokens</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">access, refresh: string</Code>
                  </TableCell>
                  <TableCell>토큰 저장 (localStorage 포함)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>logout</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>로그아웃 (토큰 삭제)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>initFromStorage</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>localStorage에서 토큰 복원</TableCell>
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
