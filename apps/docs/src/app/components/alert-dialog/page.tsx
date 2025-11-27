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
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  SimpleAlertDialog,
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

function ControlledAlertDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>삭제</Button>
      <SimpleAlertDialog
        open={open}
        onOpenChange={setOpen}
        variant="danger"
        title="정말 삭제하시겠습니까?"
        description="삭제된 데이터는 복구할 수 없습니다."
        confirmText="삭제"
        cancelText="취소"
        onConfirm={() => {
          console.log('삭제됨');
          setOpen(false);
        }}
      />
    </>
  );
}

export default function AlertDialogPage() {
  return (
    <>
      <Heading
        level="h1"
        title="AlertDialog"
        description="사용자 확인이 필요한 중요한 작업에 사용하는 모달 다이얼로그입니다."
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
              <SimpleAlertDialog
                trigger={<Button>파일 삭제</Button>}
                title="파일을 삭제하시겠습니까?"
                description="삭제된 파일은 휴지통으로 이동됩니다."
                confirmText="삭제"
                cancelText="취소"
                onConfirm={() => console.log('삭제됨')}
              />
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<SimpleAlertDialog
  trigger={<Button>파일 삭제</Button>}
  title="파일을 삭제하시겠습니까?"
  description="삭제된 파일은 휴지통으로 이동됩니다."
  confirmText="삭제"
  cancelText="취소"
  onConfirm={() => console.log('삭제됨')}
/>`}
            </Code>
          </Section>

          <Section level="h2">
            <Installation componentName="alert-dialog" />
          </Section>

          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { SimpleAlertDialog, Button } from '@hanui/react'

<SimpleAlertDialog
  trigger={<Button>삭제</Button>}
  title="삭제하시겠습니까?"
  description="이 작업은 되돌릴 수 없습니다."
  confirmText="삭제"
  onConfirm={() => handleDelete()}
/>`}
            </Code>
          </Section>

          {/* 예제 섹션 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading level="h3" title="Variant" />
              <ComponentPreview>
                <div className="flex flex-wrap gap-3">
                  <SimpleAlertDialog
                    trigger={<Button variant="tertiary">Info</Button>}
                    variant="info"
                    title="정보"
                    description="이 기능은 새로운 버전에서 업데이트됩니다."
                  />
                  <SimpleAlertDialog
                    trigger={<Button variant="success">Success</Button>}
                    variant="success"
                    title="성공"
                    description="작업이 완료되었습니다."
                    confirmText="확인"
                  />
                  <SimpleAlertDialog
                    trigger={<Button variant="tertiary">Warning</Button>}
                    variant="warning"
                    title="경고"
                    description="이 작업은 되돌릴 수 없습니다."
                    confirmText="계속"
                  />
                  <SimpleAlertDialog
                    trigger={<Button variant="danger">Danger</Button>}
                    variant="danger"
                    title="삭제 확인"
                    description="정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
                    confirmText="삭제"
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<SimpleAlertDialog
  variant="danger"
  title="삭제 확인"
  description="정말 삭제하시겠습니까?"
  confirmText="삭제"
/>
<SimpleAlertDialog
  variant="warning"
  title="경고"
  description="이 작업은 되돌릴 수 없습니다."
/>
<SimpleAlertDialog
  variant="info"
  title="정보"
  description="이 기능은 업데이트됩니다."
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Controlled" />
              <ComponentPreview>
                <ControlledAlertDialog />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>삭제</Button>
<SimpleAlertDialog
  open={open}
  onOpenChange={setOpen}
  variant="danger"
  title="정말 삭제하시겠습니까?"
  onConfirm={() => {
    handleDelete();
    setOpen(false);
  }}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Composition" />
              <ComponentPreview>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button>계정 삭제</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent variant="danger">
                    <AlertDialogHeader variant="danger">
                      <AlertDialogTitle>
                        계정을 삭제하시겠습니까?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        계정 삭제 시 다음 데이터가 영구적으로 삭제됩니다:
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <ul className="list-disc pl-6 text-sm text-krds-gray-70 space-y-1">
                      <li>모든 프로필 정보</li>
                      <li>저장된 파일 및 문서</li>
                      <li>결제 내역</li>
                    </ul>
                    <AlertDialogFooter>
                      <AlertDialogCancel>취소</AlertDialogCancel>
                      <AlertDialogAction variant="danger">
                        계정 삭제
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button>계정 삭제</Button>
  </AlertDialogTrigger>
  <AlertDialogContent variant="danger">
    <AlertDialogHeader variant="danger">
      <AlertDialogTitle>계정을 삭제하시겠습니까?</AlertDialogTitle>
      <AlertDialogDescription>
        계정 삭제 시 다음 데이터가 영구적으로 삭제됩니다:
      </AlertDialogDescription>
    </AlertDialogHeader>
    <ul className="list-disc pl-6">
      <li>모든 프로필 정보</li>
      <li>저장된 파일</li>
    </ul>
    <AlertDialogFooter>
      <AlertDialogCancel>취소</AlertDialogCancel>
      <AlertDialogAction variant="danger">계정 삭제</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Without Icon" />
              <ComponentPreview>
                <SimpleAlertDialog
                  trigger={<Button variant="tertiary">로그아웃</Button>}
                  title="로그아웃 하시겠습니까?"
                  description="저장하지 않은 변경사항은 사라집니다."
                  confirmText="로그아웃"
                  showIcon={false}
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<SimpleAlertDialog
  trigger={<Button>로그아웃</Button>}
  title="로그아웃 하시겠습니까?"
  description="저장하지 않은 변경사항은 사라집니다."
  confirmText="로그아웃"
  showIcon={false}
/>`}
              </Code>
            </Subsection>
          </Section>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="SimpleAlertDialog Props" />
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
                      <Code>trigger</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>트리거 요소</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>variant</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'default' | 'warning' | 'danger' | 'info' | 'success'
                      </Code>
                    </TableCell>
                    <TableCell>'default'</TableCell>
                    <TableCell>다이얼로그 유형</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>title</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>필수</TableCell>
                    <TableCell>제목</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>description</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>설명</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>confirmText</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>'확인'</TableCell>
                    <TableCell>확인 버튼 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>cancelText</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>'취소'</TableCell>
                    <TableCell>취소 버튼 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>onConfirm</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">() =&gt; void</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>확인 버튼 클릭 콜백</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>onCancel</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">() =&gt; void</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>취소 버튼 클릭 콜백</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>showIcon</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>true</TableCell>
                    <TableCell>아이콘 표시 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>open</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>제어 모드: 열림 상태</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>onOpenChange</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        (open: boolean) =&gt; void
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>열림 상태 변경 콜백</TableCell>
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
                      <Code>role="alertdialog"</Code>: 중요한 알림
                      다이얼로그임을 명시
                    </li>
                    <li>
                      <Code>aria-modal="true"</Code>: 모달 다이얼로그임을 명시
                    </li>
                    <li>
                      <Code>aria-labelledby</Code>: 제목과 연결
                    </li>
                    <li>
                      <Code>aria-describedby</Code>: 설명과 연결
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg border border-krds-gray-20 p-4">
                  <h4 className="font-semibold text-krds-gray-95 mb-2">
                    키보드 접근성
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-krds-gray-70">
                    <li>
                      <Code>Tab</Code>: 버튼 간 이동
                    </li>
                    <li>
                      <Code>Shift + Tab</Code>: 역방향 이동
                    </li>
                    <li>
                      <Code>Escape</Code>: 다이얼로그 닫기
                    </li>
                    <li>
                      <Code>Enter</Code>/<Code>Space</Code>: 버튼 활성화
                    </li>
                    <li>포커스 트래핑: 다이얼로그 외부로 포커스 이동 방지</li>
                  </ul>
                </div>
              </div>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Alert', href: '/components/alert' }}
        next={{ title: 'Badge', href: '/components/badge' }}
      />
    </>
  );
}
