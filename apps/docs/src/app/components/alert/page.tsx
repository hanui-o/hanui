'use client';

import { useState } from 'react';

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
  Alert,
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
import { Bell, ShieldCheck, Zap } from 'lucide-react';

export default function AlertPage() {
  const [showClosable, setShowClosable] = useState(true);

  return (
    <>
      <Heading
        level="h1"
        title="Alert"
        description="사용자에게 중요한 정보를 알리는 정적 메시지 컴포넌트입니다."
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
              <div className="w-full max-w-lg space-y-4">
                <Alert variant="info" title="정보">
                  새로운 버전이 출시되었습니다. 업데이트를 확인해주세요.
                </Alert>
                <Alert variant="success" title="성공">
                  파일이 성공적으로 저장되었습니다.
                </Alert>
              </div>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<Alert variant="info" title="정보">
  새로운 버전이 출시되었습니다.
</Alert>
<Alert variant="success" title="성공">
  파일이 성공적으로 저장되었습니다.
</Alert>`}
            </Code>
          </Section>

          <Section level="h2">
            <Installation componentName="alert" />
          </Section>

          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { Alert } from '@hanui/react'

<Alert variant="info" title="알림">
  중요한 메시지를 표시합니다.
</Alert>`}
            </Code>
          </Section>

          {/* 예제 섹션 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading level="h3" title="Variant" />
              <ComponentPreview>
                <div className="w-full max-w-lg space-y-4">
                  <Alert variant="info" title="정보">
                    새로운 버전이 출시되었습니다.
                  </Alert>
                  <Alert variant="success" title="성공">
                    파일이 성공적으로 저장되었습니다.
                  </Alert>
                  <Alert variant="warning" title="경고">
                    저장 공간이 부족합니다.
                  </Alert>
                  <Alert variant="error" title="오류">
                    서버 연결에 실패했습니다.
                  </Alert>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Alert variant="info" title="정보">새로운 버전이 출시되었습니다.</Alert>
<Alert variant="success" title="성공">파일이 성공적으로 저장되었습니다.</Alert>
<Alert variant="warning" title="경고">저장 공간이 부족합니다.</Alert>
<Alert variant="error" title="오류">서버 연결에 실패했습니다.</Alert>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Title Only" />
              <ComponentPreview>
                <div className="w-full max-w-lg space-y-4">
                  <Alert variant="info" title="새로운 알림이 있습니다." />
                  <Alert variant="success" title="작업이 완료되었습니다." />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Alert variant="info" title="새로운 알림이 있습니다." />
<Alert variant="success" title="작업이 완료되었습니다." />`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Description Only" />
              <ComponentPreview>
                <div className="w-full max-w-lg space-y-4">
                  <Alert variant="info">
                    이 페이지는 현재 베타 버전입니다. 피드백을 보내주세요.
                  </Alert>
                  <Alert variant="warning">
                    비밀번호가 90일 후 만료됩니다. 미리 변경해주세요.
                  </Alert>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Alert variant="info">
  이 페이지는 현재 베타 버전입니다.
</Alert>
<Alert variant="warning">
  비밀번호가 90일 후 만료됩니다.
</Alert>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Closable" />
              <ComponentPreview>
                <div className="w-full max-w-lg space-y-4">
                  {showClosable ? (
                    <Alert
                      variant="info"
                      title="닫을 수 있는 알림"
                      closable
                      onClose={() => setShowClosable(false)}
                    >
                      이 알림은 닫기 버튼을 클릭하면 사라집니다.
                    </Alert>
                  ) : (
                    <Button size="sm" onClick={() => setShowClosable(true)}>
                      알림 다시 보기
                    </Button>
                  )}
                  <Alert variant="warning" title="주의" closable>
                    이 작업은 되돌릴 수 없습니다.
                  </Alert>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Alert
  variant="info"
  title="닫을 수 있는 알림"
  closable
  onClose={() => console.log('closed')}
>
  이 알림은 닫기 버튼을 클릭하면 사라집니다.
</Alert>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Custom Icon" />
              <ComponentPreview>
                <div className="w-full max-w-lg space-y-4">
                  <Alert
                    variant="info"
                    title="알림 설정"
                    icon={<Bell className="h-5 w-5" />}
                  >
                    새로운 알림을 받으려면 설정에서 활성화하세요.
                  </Alert>
                  <Alert
                    variant="success"
                    title="보안 인증 완료"
                    icon={<ShieldCheck className="h-5 w-5" />}
                  >
                    2단계 인증이 성공적으로 설정되었습니다.
                  </Alert>
                  <Alert
                    variant="warning"
                    title="빠른 작업"
                    icon={<Zap className="h-5 w-5" />}
                  >
                    빠른 작업 모드가 활성화되었습니다.
                  </Alert>
                  <Alert variant="info" title="아이콘 없음" icon={false}>
                    아이콘 없이 텍스트만 표시됩니다.
                  </Alert>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`import { Bell, ShieldCheck, Zap } from 'lucide-react';

<Alert variant="info" title="알림 설정" icon={<Bell />}>
  새로운 알림을 받으려면 설정에서 활성화하세요.
</Alert>
<Alert variant="success" title="보안 인증 완료" icon={<ShieldCheck />}>
  2단계 인증이 성공적으로 설정되었습니다.
</Alert>
<Alert variant="info" title="아이콘 없음" icon={false}>
  아이콘 없이 텍스트만 표시됩니다.
</Alert>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Role" />
              <ComponentPreview>
                <div className="w-full max-w-lg space-y-4">
                  <Alert variant="error" title="긴급 알림" role="alert">
                    시스템 점검이 5분 후 시작됩니다. 작업을 저장해주세요.
                  </Alert>
                  <Alert variant="info" title="상태 업데이트" role="status">
                    백그라운드 동기화가 완료되었습니다.
                  </Alert>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`{/* role="alert": 긴급한 메시지, 스크린리더가 즉시 읽음 */}
<Alert variant="error" title="긴급 알림" role="alert">
  시스템 점검이 5분 후 시작됩니다.
</Alert>

{/* role="status": 일반 상태 메시지 */}
<Alert variant="info" title="상태 업데이트" role="status">
  백그라운드 동기화가 완료되었습니다.
</Alert>`}
              </Code>
            </Subsection>
          </Section>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="Props" />
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
                        'info' | 'success' | 'warning' | 'error'
                      </Code>
                    </TableCell>
                    <TableCell>'info'</TableCell>
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
                      <Code>children</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>알림 설명/내용</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>closable</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>닫기 버튼 표시 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>onClose</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">() =&gt; void</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>닫기 버튼 클릭 콜백</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>icon</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">ReactNode | false</Code>
                    </TableCell>
                    <TableCell>variant별 기본 아이콘</TableCell>
                    <TableCell>커스텀 아이콘 또는 아이콘 숨김</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>role</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">'alert' | 'status'</Code>
                    </TableCell>
                    <TableCell>'alert'</TableCell>
                    <TableCell>ARIA role 속성</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>className</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
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
                      <Code>role="alert"</Code>: 긴급한 메시지 (기본값)
                    </li>
                    <li>
                      <Code>role="status"</Code>: 일반 상태 메시지
                    </li>
                    <li>
                      <Code>aria-live</Code>: 스크린리더에 변경 사항 알림
                    </li>
                    <li>
                      <Code>aria-atomic="true"</Code>: 전체 내용을 읽음
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg border border-krds-gray-20 p-4">
                  <h4 className="font-semibold text-krds-gray-95 mb-2">
                    키보드 접근성
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-krds-gray-70">
                    <li>닫기 버튼은 Tab으로 포커스 가능</li>
                    <li>Enter/Space로 닫기 버튼 활성화</li>
                    <li>포커스 링으로 시각적 피드백 제공</li>
                  </ul>
                </div>
              </div>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Accordion', href: '/components/accordion' }}
        next={{ title: 'AlertDialog', href: '/components/alert-dialog' }}
      />
    </>
  );
}
