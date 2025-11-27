'use client';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';

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
} from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';

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
        description="사용자에게 일시적인 알림 메시지를 표시하는 컴포넌트입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview">
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
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

          <Section level="h2">
            <Installation componentName="toast" />
          </Section>

          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { ToastProvider, Toaster, useToast, Button } from '@hanui/react'

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

          {/* 예제 섹션 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading level="h3" title="Action" />
              <ComponentPreview>
                <ToastWithActionDemo />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`import { ToastAction, useToast } from '@hanui/react';

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
              <Heading level="h3" title="Duration" />
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
              <Heading level="h3" title="Static Toast" />
              <ComponentPreview>
                <div className="w-full max-w-md space-y-4">
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
              <Heading level="h3" title="Position" />
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
                    <TableCell className="font-mono">
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
                    <TableCell className="font-mono">
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
                    <TableCell className="font-mono">
                      <Code>title</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>알림 제목</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>description</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>알림 설명</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>icon</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">ReactNode | false</Code>
                    </TableCell>
                    <TableCell>variant별 기본</TableCell>
                    <TableCell>커스텀 아이콘</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>action</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>액션 버튼</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
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

            <Subsection level="h3">
              <Heading level="h3" title="Accessibility" />
              <div className="space-y-4 mt-4">
                <div className="rounded-lg border border-krds-gray-20 p-4">
                  <h4 className="font-semibold text-krds-gray-95 mb-2">
                    ARIA 속성
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-krds-gray-70">
                    <li>
                      <Code>aria-live="polite"</Code>: 스크린리더에 변경 사항
                      알림
                    </li>
                    <li>
                      <Code>role="status"</Code>: 상태 메시지임을 명시
                    </li>
                    <li>
                      닫기 버튼에 <Code>aria-label="닫기"</Code> 적용
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg border border-krds-gray-20 p-4">
                  <h4 className="font-semibold text-krds-gray-95 mb-2">
                    사용자 제어
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-krds-gray-70">
                    <li>마우스 호버 시 타이머 일시 정지</li>
                    <li>스와이프로 닫기 지원 (모바일)</li>
                    <li>키보드로 닫기 버튼 접근 가능</li>
                    <li>
                      <Code>duration: Infinity</Code>로 자동 닫힘 비활성화 가능
                    </li>
                  </ul>
                </div>
              </div>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Textarea', href: '/components/textarea' }}
        next={{ title: 'Toggle', href: '/components/toggle' }}
      />

      <Toaster />
    </ToastProvider>
  );
}
