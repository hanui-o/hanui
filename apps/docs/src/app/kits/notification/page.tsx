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
const typeCode = `// 알림 타입
export type NotificationType = 'info' | 'success' | 'warning' | 'error'
export type NotificationPriority = 'low' | 'normal' | 'high' | 'urgent'
export type NotificationStatus = 'unread' | 'read' | 'archived'

// 알림 아이템
export interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  priority: NotificationPriority
  status: NotificationStatus
  timestamp: string
  readAt?: string
  category?: string
  sender?: {
    id: string
    name: string
    avatar?: string
  }
  actions?: NotificationAction[]
  link?: string
}

// 알림 액션
export interface NotificationAction {
  id: string
  label: string
  type: 'primary' | 'secondary' | 'danger'
  href?: string
  onClick?: () => void
}

// 토스트 알림
export interface ToastNotification {
  id: string
  title?: string
  message: string
  type: NotificationType
  duration?: number
  dismissible?: boolean
  action?: NotificationAction
}

// 알림 설정
export interface NotificationSettings {
  enabled: boolean
  email: boolean
  push: boolean
  sound: boolean
  categories: Record<string, { enabled: boolean; email: boolean; push: boolean }>
  quietHours?: { enabled: boolean; start: string; end: string }
}`;

// API 코드
const apiCode = `import axios from 'axios'

const API_URL = 'https://your-api.com/api'
const api = axios.create({ baseURL: API_URL })

// 토큰 인터셉터
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = \`Bearer \${token}\`
  return config
})

// 알림 목록 조회
export async function getNotifications(params?: NotificationListParams) {
  const { data } = await api.get('/notifications', { params })
  return data
}

// 알림 읽음 처리
export async function markAsRead(id: string) {
  const { data } = await api.patch(\`/notifications/\${id}/read\`)
  return data.notification
}

// 모든 알림 읽음 처리
export async function markAllAsRead() {
  await api.patch('/notifications/read-all')
}

// 알림 삭제
export async function deleteNotification(id: string) {
  await api.delete(\`/notifications/\${id}\`)
}

// 읽지 않은 개수 조회
export async function getUnreadCount(): Promise<number> {
  const { data } = await api.get('/notifications/unread-count')
  return data.count
}

// 실시간 알림 연결 (SSE)
export function connectToNotificationStream(
  onNotification: (notification: Notification) => void
): EventSource {
  const token = localStorage.getItem('token')
  const eventSource = new EventSource(
    \`\${API_URL}/notifications/stream?token=\${token}\`
  )

  eventSource.onmessage = (event) => {
    const notification = JSON.parse(event.data)
    onNotification(notification)
  }

  return eventSource
}`;

// Hooks 코드
const hooksCode = `import { useQuery, useMutation, useInfiniteQuery } from '@tanstack/react-query'
import { useNotificationStore } from './stores/notificationStore'
import * as api from './api/notification'

// 알림 목록 (무한 스크롤)
export function useNotifications(params?: Omit<NotificationListParams, 'page'>) {
  const { setNotifications, setUnreadCount } = useNotificationStore()

  return useInfiniteQuery({
    queryKey: ['notifications', params],
    queryFn: ({ pageParam = 1 }) =>
      api.getNotifications({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
  })
}

// 읽지 않은 개수
export function useUnreadCount() {
  const { setUnreadCount } = useNotificationStore()

  return useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: api.getUnreadCount,
    refetchInterval: 60 * 1000, // 1분마다 갱신
    select: (count) => {
      setUnreadCount(count)
      return count
    },
  })
}

// 알림 읽음 처리
export function useMarkAsRead() {
  const queryClient = useQueryClient()
  const { updateNotification, decrementUnreadCount } = useNotificationStore()

  return useMutation({
    mutationFn: api.markAsRead,
    onSuccess: (notification) => {
      updateNotification(notification.id, { status: 'read' })
      decrementUnreadCount()
      queryClient.invalidateQueries(['notifications', 'unread-count'])
    },
  })
}

// 토스트 훅
export function useToast() {
  const { addToast, removeToast, clearToasts } = useNotificationStore()

  return {
    toast: (options) => addToast(options),
    success: (message, title?) => addToast({ message, title, type: 'success' }),
    error: (message, title?) => addToast({ message, title, type: 'error' }),
    warning: (message, title?) => addToast({ message, title, type: 'warning' }),
    info: (message, title?) => addToast({ message, title, type: 'info' }),
    dismiss: removeToast,
    dismissAll: clearToasts,
  }
}`;

// Store 코드
const storeCode = `import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface NotificationStore {
  notifications: Notification[]
  unreadCount: number
  isPanelOpen: boolean
  toasts: ToastNotification[]
  settings: NotificationSettings

  // Actions
  setNotifications: (notifications: Notification[]) => void
  addNotification: (notification: Notification) => void
  updateNotification: (id: string, updates: Partial<Notification>) => void
  removeNotification: (id: string) => void
  setUnreadCount: (count: number) => void
  decrementUnreadCount: () => void
  markAllAsRead: () => void

  // 토스트
  addToast: (toast: Omit<ToastNotification, 'id'>) => string
  removeToast: (id: string) => void
  clearToasts: () => void

  // 패널
  togglePanel: () => void
  openPanel: () => void
  closePanel: () => void
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      isPanelOpen: false,
      toasts: [],
      settings: { enabled: true, email: true, push: true, sound: true },

      addToast: (toast) => {
        const id = \`toast-\${Date.now()}\`
        const newToast = { ...toast, id, duration: toast.duration ?? 5000 }
        set((state) => ({ toasts: [...state.toasts, newToast] }))

        // 자동 제거
        if (newToast.duration > 0) {
          setTimeout(() => get().removeToast(id), newToast.duration)
        }
        return id
      },

      removeToast: (id) => set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id)
      })),

      // ... 다른 액션들
    }),
    { name: 'notification-storage', partialize: (state) => ({ settings: state.settings }) }
  )
)`;

// 사용 예시 코드
const usageCode = `'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  NotificationBell,
  NotificationCenter,
  ToastContainer,
  useToast,
  useNotificationStream,
} from '@/kits/notification'

const queryClient = new QueryClient()

function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <h1>My App</h1>
      <NotificationBell />
    </header>
  )
}

function NotificationDemo() {
  const { success, error, warning, info } = useToast()

  // 실시간 알림 연결
  useNotificationStream()

  return (
    <div className="space-x-2">
      <button onClick={() => success('저장되었습니다')}>성공</button>
      <button onClick={() => error('오류가 발생했습니다')}>오류</button>
      <button onClick={() => warning('주의가 필요합니다')}>경고</button>
      <button onClick={() => info('새로운 알림이 있습니다')}>정보</button>
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <NotificationDemo />

      {/* 알림 센터 패널 */}
      <NotificationCenter
        title="알림"
        onNotificationClick={(notification) => {
          console.log('클릭:', notification)
          if (notification.link) {
            window.location.href = notification.link
          }
        }}
      />

      {/* 토스트 컨테이너 */}
      <ToastContainer position="top-right" />
    </QueryClientProvider>
  )
}`;

export default function NotificationKitPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Notification Kit"
        description="알림 기능 키트. 알림 센터, 토스트, 실시간 알림, 푸시 알림을 포함합니다."
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
              <Badge variant="outline-gray">SSE (Server-Sent Events)</Badge>
              <Badge variant="outline-gray">TypeScript</Badge>
            </div>
          </Section>

          {/* 기능 */}
          <Section level="h2">
            <Heading level="h2" id="features" title="기능" />
            <List className="mt-4">
              <ListItem>알림 벨 아이콘 (읽지 않은 개수 뱃지)</ListItem>
              <ListItem>알림 센터 패널 (슬라이드 패널)</ListItem>
              <ListItem>알림 아이템 (읽음/읽지않음, 삭제, 액션 버튼)</ListItem>
              <ListItem>토스트 알림 (자동 닫기, 수동 닫기)</ListItem>
              <ListItem>실시간 알림 수신 (SSE 연결)</ListItem>
              <ListItem>알림 설정 (이메일, 푸시, 사운드, 방해금지)</ListItem>
              <ListItem>무한 스크롤 목록</ListItem>
              <ListItem>알림 일괄 읽음 처리</ListItem>
            </List>
          </Section>

          {/* 파일 구조 */}
          <Section level="h2">
            <Heading level="h2" id="file-structure" title="파일 구조" />
            <Code variant="block" language="bash">
              {`src/kits/notification/
├── types/
│   └── notification.ts      # 타입 정의
├── api/
│   └── notification.ts      # API 함수
├── hooks/
│   └── useNotification.ts   # React Query 훅
├── stores/
│   └── notificationStore.ts # Zustand 스토어
├── components/
│   ├── NotificationBell.tsx    # 알림 벨 아이콘
│   ├── NotificationItem.tsx    # 개별 알림 아이템
│   ├── NotificationCenter.tsx  # 알림 센터 패널
│   └── ToastContainer.tsx      # 토스트 컨테이너
└── index.ts                    # Entry point`}
            </Code>
          </Section>

          {/* 설치 */}
          <Section level="h2">
            <Heading level="h2" id="installation" title="설치" />

            <Subsection level="h3">
              <Heading level="h3" title="1. 의존성 설치" />
              <Code variant="block" language="bash">
                {`npm install axios zustand @tanstack/react-query lucide-react`}
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
                {`// api/notification.ts
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
                알림 벨에 <Code>aria-label</Code>로 읽지 않은 개수 표시
              </ListItem>
              <ListItem>
                알림 센터 패널은 <Code>role="dialog"</Code>,{' '}
                <Code>aria-modal</Code> 적용
              </ListItem>
              <ListItem>ESC 키로 패널 닫기 지원</ListItem>
              <ListItem>
                토스트는 <Code>role="alert"</Code>,{' '}
                <Code>aria-live="polite"</Code> 적용
              </ListItem>
              <ListItem>포커스 트랩으로 키보드 네비게이션 지원</ListItem>
              <ListItem>삭제/읽음 처리 버튼에 적절한 라벨 제공</ListItem>
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
                    <Code>getNotifications</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">params?</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">NotificationListResponse</Code>
                  </TableCell>
                  <TableCell>알림 목록 조회</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>markAsRead</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">id: string</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">Notification</Code>
                  </TableCell>
                  <TableCell>알림 읽음 처리</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>markAllAsRead</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <Code className="text-xs">void</Code>
                  </TableCell>
                  <TableCell>모든 알림 읽음 처리</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>deleteNotification</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">id: string</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">void</Code>
                  </TableCell>
                  <TableCell>알림 삭제</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>getUnreadCount</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <Code className="text-xs">number</Code>
                  </TableCell>
                  <TableCell>읽지 않은 개수</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>connectToNotificationStream</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">onNotification</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">EventSource</Code>
                  </TableCell>
                  <TableCell>실시간 알림 연결</TableCell>
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
                    <Code>useNotifications</Code>
                  </TableCell>
                  <TableCell>
                    <Code className="text-xs">params?</Code>
                  </TableCell>
                  <TableCell>알림 목록 (무한 스크롤)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>useUnreadCount</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>읽지 않은 개수 (1분 갱신)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>useMarkAsRead</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>알림 읽음 처리 뮤테이션</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>useMarkAllAsRead</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>모든 알림 읽음 처리</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>useDeleteNotification</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>알림 삭제 뮤테이션</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>useNotificationStream</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>실시간 알림 연결</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>useToast</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>토스트 알림 표시</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Section>

          {/* useToast 상세 */}
          <Section level="h2">
            <Heading level="h2" id="use-toast" title="useToast 사용법" />
            <Code variant="block" language="tsx">
              {`const { toast, success, error, warning, info, dismiss, dismissAll } = useToast()

// 기본 사용
toast({ type: 'success', message: '저장되었습니다' })

// 제목 포함
toast({ type: 'error', title: '오류', message: '저장에 실패했습니다' })

// 액션 버튼
toast({
  type: 'info',
  message: '새 버전이 있습니다',
  action: { label: '업데이트', onClick: () => updateApp() }
})

// 단축 메서드
success('저장되었습니다')
error('오류가 발생했습니다')
warning('주의가 필요합니다')
info('새로운 알림이 있습니다')

// 토스트 닫기
const id = success('저장 완료')
dismiss(id)  // 특정 토스트 닫기
dismissAll() // 모든 토스트 닫기`}
            </Code>
          </Section>

          {/* 컴포넌트 Props */}
          <Section level="h2">
            <Heading level="h2" id="components" title="컴포넌트 Props" />

            <Subsection level="h3">
              <Heading level="h3" title="NotificationBell" />
              <Table small className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>onClick</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">() =&gt; void</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>클릭 콜백</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>showBadge</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>true</TableCell>
                    <TableCell>뱃지 표시 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>maxCount</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>99</TableCell>
                    <TableCell>최대 표시 숫자</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="NotificationCenter" />
              <Table small className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>title</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>'알림'</TableCell>
                    <TableCell>패널 제목</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>emptyMessage</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>'새로운 알림이 없습니다'</TableCell>
                    <TableCell>빈 상태 메시지</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>showSettings</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>true</TableCell>
                    <TableCell>설정 버튼 표시</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>onNotificationClick</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">(n) =&gt; void</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>알림 클릭 콜백</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="ToastContainer" />
              <Table small className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>position</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'top-left' | 'top-center' | 'top-right' | ...
                      </Code>
                    </TableCell>
                    <TableCell>'top-right'</TableCell>
                    <TableCell>토스트 위치</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>maxToasts</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>최대 표시 개수</TableCell>
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
        prev={{ title: 'Search Kit', href: '/kits/search' }}
        next={{ title: 'Kits', href: '/kits' }}
      />
    </>
  );
}
