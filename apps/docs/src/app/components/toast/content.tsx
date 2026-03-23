'use client';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';
import { ComponentPreview } from '@/components/content/ComponentPreview';

// UI components - from @hanui/react
import {
  ToastProvider,
  Toast,
  ToastAction,
  Toaster,
  useToast,
  Button,
  Code,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  List,
  ListItem,
} from '@hanui/react';

function ToastDemo() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="tertiary"
        onClick={() =>
          toast({
            variant: 'info',
            title: '정보',
            description: '새로운 업데이트가 있습니다.',
          })
        }
      >
        Info
      </Button>
      <Button
        variant="success"
        onClick={() =>
          toast({
            variant: 'success',
            title: '성공',
            description: '파일이 저장되었습니다.',
          })
        }
      >
        Success
      </Button>
      <Button
        variant="tertiary"
        onClick={() =>
          toast({
            variant: 'warning',
            title: '경고',
            description: '저장 공간이 부족합니다.',
          })
        }
      >
        Warning
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          toast({
            variant: 'error',
            title: '오류',
            description: '작업을 완료할 수 없습니다.',
          })
        }
      >
        Error
      </Button>
    </div>
  );
}

function ToastWithActionDemo() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() =>
        toast({
          variant: 'info',
          title: '새 메시지',
          description: '홍길동님이 메시지를 보냈습니다.',
          action: <ToastAction altText="보기">보기</ToastAction>,
        })
      }
    >
      액션 버튼 Toast
    </Button>
  );
}

function ToastDurationDemo() {
  const { toast } = useToast();

  return (
    <div className="flex gap-3">
      <Button
        variant="tertiary"
        onClick={() =>
          toast({
            variant: 'success',
            title: '짧은 알림',
            description: '3초 후 사라집니다.',
            duration: 3000,
          })
        }
      >
        3초
      </Button>
      <Button
        variant="tertiary"
        onClick={() =>
          toast({
            variant: 'info',
            title: '긴 알림',
            description: '10초 동안 표시됩니다.',
            duration: 10000,
          })
        }
      >
        10초
      </Button>
    </div>
  );
}

export default function ToastPage() {
  return (
    <ToastProvider>
      <Heading
        level="h1"
        title="Toast"
        description="사용자에게 일시적인 알림 메시지를 표시하는 컴포넌트입니다. Radix UI 기반으로 접근성이 보장됩니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview">
          {/* 1. 개요 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              description="Toast는 작업 완료, 오류, 경고 등 사용자에게 일시적인 피드백을 제공합니다. useToast 훅을 통해 프로그래밍 방식으로 표시할 수 있습니다."
              className="sr-only"
            />
            <ComponentPreview>
              <ToastDemo />
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`const { toast } = useToast();

toast({
  variant: 'success',
  title: '성공',
  description: '파일이 저장되었습니다.',
});`}
            </Code>
          </Section>

          {/* 2. 설치 */}
          <Section level="h2">
            <Installation componentName="toast" />
          </Section>

          {/* 3. 사용법 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="usage"
              title="사용법"
              description="ToastProvider로 앱을 감싸고, useToast 훅으로 toast 함수를 호출합니다. Toaster 컴포넌트는 Toast를 렌더링합니다."
            />
            <Code variant="block" language="tsx">
              {`import { ToastProvider, Toaster, useToast } from '@/components/hanui/toast';
import { Button } from '@/components/hanui/button';

function App() {
  return (
    <ToastProvider>
      <MyComponent />
      <Toaster />
    </ToastProvider>
  );
}

function MyComponent() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() =>
        toast({
          variant: 'success',
          title: '성공',
          description: '파일이 저장되었습니다.',
        })
      }
    >
      알림 표시
    </Button>
  );
}`}
            </Code>
          </Section>

          {/* 4. 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Action"
                description="action prop으로 Toast에 버튼을 추가할 수 있습니다."
              />
              <ComponentPreview>
                <ToastWithActionDemo />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`import { ToastAction, useToast } from '@/components/hanui/toast';

const { toast } = useToast();

toast({
  variant: 'info',
  title: '새 메시지',
  description: '홍길동님이 메시지를 보냈습니다.',
  action: (
    <ToastAction altText="보기">보기</ToastAction>
  ),
});`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Duration"
                description="duration prop으로 Toast 표시 시간을 조절할 수 있습니다. 기본값은 5000ms입니다."
              />
              <ComponentPreview>
                <ToastDurationDemo />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`toast({
  title: '짧은 알림',
  description: '3초 후 사라집니다.',
  duration: 3000,
});

toast({
  title: '무한 알림',
  description: '직접 닫아야 합니다.',
  duration: Infinity,
});`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Static Toast"
                description="Toast 컴포넌트를 직접 렌더링하여 정적인 알림을 표시할 수 있습니다."
              />
              <ComponentPreview>
                <div className="w-full max-w-md space-y-4 text-center">
                  오른쪽 하단에 떠있는 toast 를 보시오.
                  <Toast variant="info" title="정보" open>
                    새로운 버전이 출시되었습니다.
                  </Toast>
                  <Toast variant="success" title="성공" open>
                    파일이 저장되었습니다.
                  </Toast>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Toast variant="info" title="정보" open>
  새로운 버전이 출시되었습니다.
</Toast>
<Toast variant="success" title="성공" open>
  파일이 저장되었습니다.
</Toast>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Position"
                description="ToastProvider의 position prop으로 Toast 표시 위치를 지정할 수 있습니다."
              />
              <ComponentPreview>
                <div className="w-full">
                  <p className="text-sm text-krds-gray-60 mb-4 text-center">
                    현재 페이지는 <Code>bottom-right</Code> 위치를 사용합니다.
                  </p>
                  <div className="relative w-full h-48 border border-krds-gray-20 rounded-lg bg-krds-gray-5">
                    {/* Top row */}
                    <div className="absolute top-2 left-2 px-2 py-1 text-xs bg-krds-gray-20 rounded">
                      top-left
                    </div>
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-krds-gray-20 rounded">
                      top-center
                    </div>
                    <div className="absolute top-2 right-2 px-2 py-1 text-xs bg-krds-gray-20 rounded">
                      top-right
                    </div>
                    {/* Bottom row */}
                    <div className="absolute bottom-2 left-2 px-2 py-1 text-xs bg-krds-gray-20 rounded">
                      bottom-left
                    </div>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-krds-gray-20 rounded">
                      bottom-center
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 text-xs bg-krds-primary-10 text-krds-primary-base rounded border border-krds-primary-base">
                      bottom-right (기본값)
                    </div>
                  </div>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`// 오른쪽 상단에 Toast 표시
<ToastProvider position="top-right">
  <App />
  <Toaster />
</ToastProvider>

// 중앙 하단에 Toast 표시
<ToastProvider position="bottom-center">
  <App />
  <Toaster />
</ToastProvider>`}
              </Code>
            </Subsection>
          </Section>

          {/* 5. 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다."
            />

            <Subsection level="h3">
              <Heading level="h3" title="ARIA 속성" />
              <List>
                <ListItem>
                  <Code>aria-live=&quot;polite&quot;</Code>: 스크린리더에 변경
                  사항 알림
                </ListItem>
                <ListItem>
                  <Code>role=&quot;status&quot;</Code>: 상태 메시지임을 명시
                </ListItem>
                <ListItem>
                  닫기 버튼에 <Code>aria-label=&quot;닫기&quot;</Code> 적용
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="사용자 제어" />
              <List>
                <ListItem>마우스 호버 시 타이머 일시 정지</ListItem>
                <ListItem>스와이프로 닫기 지원 (모바일)</ListItem>
                <ListItem>
                  <Code>F8</Code> 키로 Toast 영역에 포커스 → 액션 버튼 접근
                </ListItem>
                <ListItem>
                  <Code>duration: Infinity</Code>로 자동 닫힘 비활성화 가능
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="키보드 지원" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>키</TableHead>
                    <TableHead>동작</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>F8</Code>
                    </TableCell>
                    <TableCell>Toast 영역으로 포커스 이동</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>Tab</Code>
                    </TableCell>
                    <TableCell>
                      Toast 내 버튼으로 포커스 이동 (액션 → 닫기)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>Enter</Code> / <Code>Space</Code>
                    </TableCell>
                    <TableCell>버튼 활성화</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>Escape</Code>
                    </TableCell>
                    <TableCell>Toast 닫기</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p className="text-sm text-krds-gray-60 mt-3">
                <strong>키보드 접근 흐름:</strong> <Code>F8</Code> → Toast 영역
                포커스 → <Code>Tab</Code> → 액션/닫기 버튼 포커스. F8은
                브라우저와 충돌하지 않는 키로, <Code>hotkey</Code> prop으로 변경
                가능합니다.
              </p>
            </Subsection>
          </Section>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="ToastProvider Props" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>position</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'top-left' | 'top-center' | 'top-right' | 'bottom-left'
                        | 'bottom-center' | 'bottom-right'
                      </Code>
                    </TableCell>
                    <TableCell>'bottom-right'</TableCell>
                    <TableCell>Toast 표시 위치</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>hotkey</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string[]</Code>
                    </TableCell>
                    <TableCell>['F8']</TableCell>
                    <TableCell>Toast 영역으로 포커스 이동 단축키</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Toast Props" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>variant</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'default' | 'info' | 'success' | 'warning' | 'error'
                      </Code>
                    </TableCell>
                    <TableCell>'default'</TableCell>
                    <TableCell>알림 유형</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>title</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>알림 제목</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>description</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>알림 설명</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>icon</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">ReactNode | false</Code>
                    </TableCell>
                    <TableCell>variant별 기본</TableCell>
                    <TableCell>커스텀 아이콘</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>action</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>액션 버튼</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>duration</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>5000</TableCell>
                    <TableCell>표시 시간 (ms)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="useToast Hook" />
              <Code variant="block" language="typescript">
                {`const { toast, toasts, dismiss } = useToast();

// Toast 표시
const { id, dismiss, update } = toast({
  variant: 'success',
  title: '제목',
  description: '설명',
});

// Toast 닫기
dismiss(id);`}
              </Code>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Textarea', href: '/components/textarea' }}
        next={{ title: 'Tooltip', href: '/components/tooltip' }}
      />

      <Toaster />
    </ToastProvider>
  );
}
