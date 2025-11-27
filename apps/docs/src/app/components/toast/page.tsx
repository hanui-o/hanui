'use client';

import { PageSection as Section, Heading } from '@/components/content';
import { PreviewBox } from '@/components/helpers';
import {
  ToastProvider,
  Toast,
  ToastAction,
  Toaster,
  useToast,
  Button,
  Stack,
  Body,
  Code,
} from '@hanui/react';

function ToastDemo() {
  const { toast } = useToast();

  return (
    <Stack gap="md" direction="row" className="flex-wrap">
      <Button
        variant="tertiary"
        onClick={() =>
          toast({
            title: '기본 알림',
            description: '일반적인 알림 메시지입니다.',
          })
        }
      >
        기본
      </Button>
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
    </Stack>
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
    <Stack gap="md" direction="row">
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
      <Button
        variant="tertiary"
        onClick={() =>
          toast({
            variant: 'warning',
            title: '무한 알림',
            description: '직접 닫아야 합니다.',
            duration: Infinity,
          })
        }
      >
        무한
      </Button>
    </Stack>
  );
}

export default function ToastPage() {
  return (
    <ToastProvider>
      <Heading
        level="h1"
        title="Toast"
        description="사용자에게 일시적인 알림 메시지를 표시하는 컴포넌트입니다."
        badge="New"
      />

      {/* 기본 사용법 */}
      <Section>
        <Heading level="h2" id="default" title="기본 사용법">
          <Body>
            <Code>useToast</Code> 훅의 <Code>toast</Code> 함수로 알림을
            표시합니다. <Code>variant</Code>로 알림 유형을 지정할 수 있습니다.
          </Body>
        </Heading>

        <PreviewBox
          preview={<ToastDemo />}
          code={`import { ToastProvider, Toaster, useToast, Button } from '@hanui/react';

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
        />
      </Section>

      {/* 액션 버튼 */}
      <Section>
        <Heading level="h2" id="action" title="액션 버튼">
          <Body>
            <Code>action</Code> prop으로 Toast에 액션 버튼을 추가할 수 있습니다.
          </Body>
        </Heading>

        <PreviewBox
          preview={<ToastWithActionDemo />}
          code={`import { ToastAction, useToast } from '@hanui/react';

const { toast } = useToast();

toast({
  variant: 'info',
  title: '새 메시지',
  description: '홍길동님이 메시지를 보냈습니다.',
  action: (
    <ToastAction altText="보기">보기</ToastAction>
  ),
});`}
        />
      </Section>

      {/* 지속 시간 */}
      <Section>
        <Heading level="h2" id="duration" title="지속 시간">
          <Body>
            <Code>duration</Code> prop으로 Toast가 표시되는 시간을 밀리초 단위로
            지정합니다. 기본값은 5000ms(5초)입니다.
          </Body>
        </Heading>

        <PreviewBox
          preview={<ToastDurationDemo />}
          code={`toast({
  title: '짧은 알림',
  description: '3초 후 사라집니다.',
  duration: 3000,
});

toast({
  title: '무한 알림',
  description: '직접 닫아야 합니다.',
  duration: Infinity,
});`}
        />
      </Section>

      {/* 정적 Toast */}
      <Section>
        <Heading level="h2" id="static" title="정적 Toast">
          <Body>JSX로 직접 Toast를 렌더링할 수도 있습니다.</Body>
        </Heading>

        <PreviewBox
          preview={
            <Stack gap="md" className="w-full max-w-md">
              <Toast variant="info" title="정보" open>
                새로운 버전이 출시되었습니다.
              </Toast>
              <Toast variant="success" title="성공" open>
                파일이 저장되었습니다.
              </Toast>
            </Stack>
          }
          code={`<Toast variant="info" title="정보" open>
  새로운 버전이 출시되었습니다.
</Toast>
<Toast variant="success" title="성공" open>
  파일이 저장되었습니다.
</Toast>`}
        />
      </Section>

      {/* 위치 설정 */}
      <Section>
        <Heading level="h2" id="position" title="위치 설정">
          <Body>
            <Code>ToastProvider</Code>의 <Code>position</Code> prop으로 Toast
            표시 위치를 설정합니다.
          </Body>
        </Heading>

        <div className="rounded-lg border border-krds-gray-20 p-4 mt-4">
          <h3 className="font-semibold text-krds-gray-95 mb-2">
            사용 가능한 위치
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-krds-gray-70">
            <li>
              <Code>top-left</Code>: 왼쪽 상단
            </li>
            <li>
              <Code>top-center</Code>: 중앙 상단
            </li>
            <li>
              <Code>top-right</Code>: 오른쪽 상단
            </li>
            <li>
              <Code>bottom-left</Code>: 왼쪽 하단
            </li>
            <li>
              <Code>bottom-center</Code>: 중앙 하단
            </li>
            <li>
              <Code>bottom-right</Code>: 오른쪽 하단 (기본값)
            </li>
          </ul>
        </div>

        <PreviewBox
          preview={null}
          code={`// 오른쪽 상단에 Toast 표시
<ToastProvider position="top-right">
  <App />
  <Toaster />
</ToastProvider>

// 중앙 하단에 Toast 표시
<ToastProvider position="bottom-center">
  <App />
  <Toaster />
</ToastProvider>`}
        />
      </Section>

      {/* 접근성 */}
      <Section>
        <Heading level="h2" id="accessibility" title="접근성">
          <Body>Toast 컴포넌트는 KWCAG 2.2 AA 기준을 준수합니다.</Body>
        </Heading>

        <Stack gap="md" className="mt-4">
          <div className="rounded-lg border border-krds-gray-20 p-4">
            <h3 className="font-semibold text-krds-gray-95 mb-2">ARIA 속성</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-krds-gray-70">
              <li>
                <Code>aria-live=&quot;polite&quot;</Code>: 스크린리더에 변경
                사항 알림
              </li>
              <li>
                <Code>role=&quot;status&quot;</Code>: 상태 메시지임을 명시
              </li>
              <li>
                닫기 버튼에 <Code>aria-label=&quot;닫기&quot;</Code> 적용
              </li>
            </ul>
          </div>
          <div className="rounded-lg border border-krds-gray-20 p-4">
            <h3 className="font-semibold text-krds-gray-95 mb-2">
              사용자 제어
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-krds-gray-70">
              <li>마우스 호버 시 타이머 일시 정지</li>
              <li>스와이프로 닫기 지원 (모바일)</li>
              <li>키보드로 닫기 버튼 접근 가능</li>
              <li>
                <Code>duration: Infinity</Code>로 자동 닫힘 비활성화 가능
              </li>
            </ul>
          </div>
        </Stack>
      </Section>

      {/* Alert vs Toast */}
      <Section>
        <Heading level="h2" id="vs-alert" title="Alert vs Toast">
          <Body>Alert와 Toast의 사용 시나리오를 비교합니다.</Body>
        </Heading>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-krds-gray-20">
                <th className="text-left py-3 px-4 font-semibold">특성</th>
                <th className="text-left py-3 px-4 font-semibold">Alert</th>
                <th className="text-left py-3 px-4 font-semibold">Toast</th>
              </tr>
            </thead>
            <tbody className="text-krds-gray-70">
              <tr className="border-b border-krds-gray-10">
                <td className="py-3 px-4 font-medium">표시 방식</td>
                <td className="py-3 px-4">페이지 내 고정</td>
                <td className="py-3 px-4">화면 모서리에 팝업</td>
              </tr>
              <tr className="border-b border-krds-gray-10">
                <td className="py-3 px-4 font-medium">지속 시간</td>
                <td className="py-3 px-4">영구적</td>
                <td className="py-3 px-4">일시적 (자동 사라짐)</td>
              </tr>
              <tr className="border-b border-krds-gray-10">
                <td className="py-3 px-4 font-medium">사용 사례</td>
                <td className="py-3 px-4">폼 검증, 중요 공지</td>
                <td className="py-3 px-4">작업 완료, 새 알림</td>
              </tr>
              <tr className="border-b border-krds-gray-10">
                <td className="py-3 px-4 font-medium">긴급도</td>
                <td className="py-3 px-4">높음</td>
                <td className="py-3 px-4">중간/낮음</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* API Reference */}
      <Section>
        <Heading level="h2" id="api" title="API Reference" />

        <div className="space-y-6">
          {/* ToastProvider */}
          <div>
            <h3 className="text-lg font-semibold mb-3">ToastProvider</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-krds-gray-20">
                    <th className="text-left py-3 px-4 font-semibold">Prop</th>
                    <th className="text-left py-3 px-4 font-semibold">Type</th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Default
                    </th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="text-krds-gray-70">
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>position</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>
                        &quot;top-left&quot; | &quot;top-center&quot; | ...
                      </Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>&quot;bottom-right&quot;</Code>
                    </td>
                    <td className="py-3 px-4">Toast 표시 위치</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Toast */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Toast</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-krds-gray-20">
                    <th className="text-left py-3 px-4 font-semibold">Prop</th>
                    <th className="text-left py-3 px-4 font-semibold">Type</th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Default
                    </th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="text-krds-gray-70">
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>variant</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>
                        &quot;default&quot; | &quot;info&quot; |
                        &quot;success&quot; | &quot;warning&quot; |
                        &quot;error&quot;
                      </Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>&quot;default&quot;</Code>
                    </td>
                    <td className="py-3 px-4">알림 유형</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>title</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>ReactNode</Code>
                    </td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">알림 제목</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>description</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>ReactNode</Code>
                    </td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">알림 설명</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>icon</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>ReactNode | false</Code>
                    </td>
                    <td className="py-3 px-4">variant별 기본</td>
                    <td className="py-3 px-4">커스텀 아이콘</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>action</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>ReactNode</Code>
                    </td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">액션 버튼</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>duration</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>number</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>5000</Code>
                    </td>
                    <td className="py-3 px-4">표시 시간 (ms)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* useToast */}
          <div>
            <h3 className="text-lg font-semibold mb-3">useToast</h3>
            <div className="rounded-lg border border-krds-gray-20 p-4">
              <p className="text-sm text-krds-gray-70 mb-2">
                Toast 상태를 관리하고 알림을 표시하는 훅입니다.
              </p>
              <pre className="bg-krds-gray-5 p-3 rounded text-sm overflow-x-auto">
                {`const { toast, toasts, dismiss } = useToast();

// Toast 표시
const { id, dismiss, update } = toast({
  variant: 'success',
  title: '제목',
  description: '설명',
});

// Toast 닫기
dismiss(id);`}
              </pre>
            </div>
          </div>
        </div>
      </Section>

      <Toaster />
    </ToastProvider>
  );
}
