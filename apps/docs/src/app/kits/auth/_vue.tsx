'use client';

import { PageSection as Section, Heading } from '@/components/content';
import { CodeBlock } from '@/components/content/CodeBlock';
import {
  Code,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Card,
  CardBody,
  List,
  ListItem,
} from '@hanui/react';

// Pinia Auth Store
const storeCode = `// src/features/auth/stores/authStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '../types/auth'

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
  // 페이지 새로고침 시 유지
  persist: {
    pick: ['user'],
  },
})`;

// Composables
const composablesCode = `// src/features/auth/composables/useAuth.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
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

// 로그인 컴포넌트
const loginComponent = `<!-- src/views/auth/LoginView.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useLogin } from '@/features/auth/composables/useAuth'

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

// 라우터 가드
const routerGuardCode = `// src/router/guards.ts
import type { NavigationGuard } from 'vue-router'
import { useAuthStore } from '@/features/auth/stores/authStore'

export const authGuard: NavigationGuard = (to, from, next) => {
  const store = useAuthStore()

  // 인증이 필요한 페이지
  if (to.meta.requiresAuth && !store.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  // 이미 로그인된 상태에서 로그인 페이지 접근
  if (to.name === 'login' && store.isAuthenticated) {
    next({ name: 'dashboard' })
    return
  }

  next()
}

// router/index.ts에서 사용
router.beforeEach(authGuard)`;

export function VueAuthContent() {
  return (
    <>
      <div className="flex gap-2 mb-6">
        <Badge variant="primary">Vue 3</Badge>
        <Badge variant="secondary">Pinia</Badge>
        <Badge variant="secondary">Vue Query</Badge>
      </div>

      <Card className="mb-6 border-blue-200 bg-blue-50">
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
        </CardBody>
      </Card>

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

      <Tabs defaultValue="store" className="w-full mt-8">
        <TabsList>
          <TabsTrigger value="store">Store</TabsTrigger>
          <TabsTrigger value="composables">Composables</TabsTrigger>
          <TabsTrigger value="component">컴포넌트</TabsTrigger>
          <TabsTrigger value="guard">라우터 가드</TabsTrigger>
        </TabsList>

        <TabsContent value="store">
          <Section level="h2">
            <Heading level="h2" id="store" title="Pinia Auth Store" />
            <CodeBlock code={storeCode} language="typescript" />
          </Section>
        </TabsContent>

        <TabsContent value="composables">
          <Section level="h2">
            <Heading level="h2" id="composables" title="Auth Composables" />
            <CodeBlock code={composablesCode} language="typescript" />
          </Section>
        </TabsContent>

        <TabsContent value="component">
          <Section level="h2">
            <Heading level="h2" id="login" title="로그인 컴포넌트" />
            <CodeBlock code={loginComponent} language="vue" />
          </Section>
        </TabsContent>

        <TabsContent value="guard">
          <Section level="h2">
            <Heading level="h2" id="guard" title="라우터 가드" />
            <CodeBlock code={routerGuardCode} language="typescript" />
          </Section>
        </TabsContent>
      </Tabs>
    </>
  );
}
