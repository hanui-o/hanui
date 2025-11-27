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
  List,
  ListItem,
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
          {/* 1. 개요 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              description="Radix UI를 기반으로 구축되어 완전한 키보드 접근성, 포커스 트래핑, Escape 키 닫기를 지원합니다. 삭제, 로그아웃 등 사용자 확인이 필요한 중요한 작업에 사용합니다."
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

          {/* 2. 설치 */}
          <Section level="h2">
            <Installation componentName="alert-dialog" />
          </Section>

          {/* 3. 사용법 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="usage"
              title="사용법"
              description="SimpleAlertDialog로 간단히 사용하거나, 개별 컴포넌트를 조합하여 커스텀할 수 있습니다."
            />
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

          {/* 4. 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            {/* 유형 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="유형"
                description="info, success, warning, danger 등 다양한 유형을 지원합니다. variant에 따라 테두리 색상과 아이콘이 자동 적용됩니다."
              />
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

            {/* 제어 모드 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="제어 모드"
                description="open과 onOpenChange로 다이얼로그의 열림/닫힘 상태를 직접 제어할 수 있습니다."
              />
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

            {/* 컴포넌트 조합 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="컴포넌트 조합"
                description="개별 컴포넌트를 조합하여 리스트, 폼 등 복잡한 콘텐츠를 포함할 수 있습니다."
              />
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

            {/* 아이콘 없음 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="아이콘 없음"
                description="showIcon={false}로 아이콘 없이 텍스트만 표시할 수 있습니다."
              />
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

          {/* 5. 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="AlertDialog는 WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다."
            />
            <List variant="check">
              <ListItem>
                <strong>Radix UI 기반:</strong> role=&quot;alertdialog&quot;와
                aria-modal=&quot;true&quot;가 자동 적용됩니다.
              </ListItem>
              <ListItem>
                <strong>포커스 트래핑:</strong> 다이얼로그 열림 시 포커스가
                내부에 갇히고, 닫힘 시 트리거로 복귀합니다.
              </ListItem>
              <ListItem>
                <strong>키보드 접근:</strong> Escape로 닫기, Tab으로 버튼 간
                이동이 가능합니다.
              </ListItem>
              <ListItem>
                <strong>스크린리더:</strong> aria-labelledby와
                aria-describedby로 제목/설명이 연결됩니다.
              </ListItem>
              <ListItem>
                명도 대비 4.5:1 이상을 준수하여 시각적 접근성을 보장합니다.
              </ListItem>
            </List>
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
              <Heading level="h3" title="키보드 접근성" />
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
                      <Code>Tab</Code>
                    </TableCell>
                    <TableCell>버튼 간 이동</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>Shift + Tab</Code>
                    </TableCell>
                    <TableCell>역방향 이동</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>Escape</Code>
                    </TableCell>
                    <TableCell>다이얼로그 닫기</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>Enter</Code> / <Code>Space</Code>
                    </TableCell>
                    <TableCell>버튼 활성화</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="ARIA 속성" />
              <List variant="check">
                <ListItem>
                  <Code>role=&quot;alertdialog&quot;</Code> - 중요한 알림
                  다이얼로그임을 명시
                </ListItem>
                <ListItem>
                  <Code>aria-modal=&quot;true&quot;</Code> - 모달 다이얼로그임을
                  명시
                </ListItem>
                <ListItem>
                  <Code>aria-labelledby</Code> - 제목과 연결
                </ListItem>
                <ListItem>
                  <Code>aria-describedby</Code> - 설명과 연결
                </ListItem>
                <ListItem>
                  포커스 트래핑 - 다이얼로그 외부로 포커스 이동 방지
                </ListItem>
              </List>
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
