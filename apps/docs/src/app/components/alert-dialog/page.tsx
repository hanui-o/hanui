'use client';

import { useState } from 'react';
import { PageSection as Section, Heading } from '@/components/content';
import { PreviewBox } from '@/components/helpers';
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
  Stack,
  Body,
  Code,
} from '@hanui/react';

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
        description="삭제된 데이터는 복구할 수 없습니다. 이 작업은 되돌릴 수 없으니 신중하게 결정해주세요."
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
        badge="New"
      />

      {/* 기본 사용법 */}
      <Section>
        <Heading level="h2" id="default" title="기본 사용법">
          <Body>
            <Code>SimpleAlertDialog</Code>를 사용하면 간편하게 AlertDialog를
            구현할 수 있습니다.
          </Body>
        </Heading>

        <PreviewBox
          preview={
            <SimpleAlertDialog
              trigger={<Button>파일 삭제</Button>}
              title="파일을 삭제하시겠습니까?"
              description="삭제된 파일은 휴지통으로 이동됩니다."
              confirmText="삭제"
              cancelText="취소"
              onConfirm={() => console.log('삭제됨')}
            />
          }
          code={`<SimpleAlertDialog
  trigger={<Button>파일 삭제</Button>}
  title="파일을 삭제하시겠습니까?"
  description="삭제된 파일은 휴지통으로 이동됩니다."
  confirmText="삭제"
  cancelText="취소"
  onConfirm={() => console.log('삭제됨')}
/>`}
        />
      </Section>

      {/* Variant */}
      <Section>
        <Heading level="h2" id="variants" title="Variant">
          <Body>
            <Code>variant</Code> prop으로 다이얼로그 유형을 지정합니다.
          </Body>
        </Heading>

        <PreviewBox
          preview={
            <Stack gap="md" direction="row" className="flex-wrap">
              <SimpleAlertDialog
                trigger={<Button variant="tertiary">기본</Button>}
                variant="default"
                title="알림"
                description="계속 진행하시겠습니까?"
                showIcon={false}
              />
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
            </Stack>
          }
          code={`<SimpleAlertDialog
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
        />
      </Section>

      {/* 제어 모드 */}
      <Section>
        <Heading level="h2" id="controlled" title="제어 모드">
          <Body>
            <Code>open</Code>과 <Code>onOpenChange</Code>로 열림 상태를
            제어합니다.
          </Body>
        </Heading>

        <PreviewBox
          preview={<ControlledAlertDialog />}
          code={`const [open, setOpen] = useState(false);

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
        />
      </Section>

      {/* 커스텀 컴포지션 */}
      <Section>
        <Heading level="h2" id="composition" title="커스텀 컴포지션">
          <Body>
            개별 컴포넌트를 조합하여 더 복잡한 다이얼로그를 만들 수 있습니다.
          </Body>
        </Heading>

        <PreviewBox
          preview={
            <AlertDialog>
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
                <ul className="list-disc pl-6 text-sm text-krds-gray-70 space-y-1">
                  <li>모든 프로필 정보</li>
                  <li>저장된 파일 및 문서</li>
                  <li>결제 내역</li>
                  <li>구독 서비스</li>
                </ul>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction variant="danger">
                    계정 삭제
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          }
          code={`<AlertDialog>
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
        />
      </Section>

      {/* 아이콘 없이 */}
      <Section>
        <Heading level="h2" id="no-icon" title="아이콘 없이">
          <Body>
            <Code>showIcon={'{false}'}</Code>로 아이콘을 숨길 수 있습니다.
          </Body>
        </Heading>

        <PreviewBox
          preview={
            <SimpleAlertDialog
              trigger={<Button variant="tertiary">로그아웃</Button>}
              title="로그아웃 하시겠습니까?"
              description="저장하지 않은 변경사항은 사라집니다."
              confirmText="로그아웃"
              showIcon={false}
            />
          }
          code={`<SimpleAlertDialog
  trigger={<Button>로그아웃</Button>}
  title="로그아웃 하시겠습니까?"
  description="저장하지 않은 변경사항은 사라집니다."
  confirmText="로그아웃"
  showIcon={false}
/>`}
        />
      </Section>

      {/* 실제 사용 예시 */}
      <Section>
        <Heading level="h2" id="examples" title="실제 사용 예시">
          <Body>
            삭제 확인, 변경 사항 저장, 로그아웃 등 실제 사용 사례입니다.
          </Body>
        </Heading>

        <PreviewBox
          preview={
            <Stack gap="md" direction="row" className="flex-wrap">
              {/* 파일 삭제 */}
              <SimpleAlertDialog
                trigger={<Button variant="danger">파일 삭제</Button>}
                variant="danger"
                title="파일을 삭제하시겠습니까?"
                description="선택한 5개의 파일이 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다."
                confirmText="삭제"
              />

              {/* 변경 사항 취소 */}
              <SimpleAlertDialog
                trigger={<Button variant="tertiary">변경 취소</Button>}
                variant="warning"
                title="변경 사항을 취소하시겠습니까?"
                description="저장하지 않은 변경 사항이 모두 사라집니다."
                confirmText="취소하고 나가기"
                cancelText="계속 편집"
              />

              {/* 구독 취소 */}
              <SimpleAlertDialog
                trigger={<Button variant="tertiary">구독 취소</Button>}
                variant="info"
                title="구독을 취소하시겠습니까?"
                description="현재 결제 기간이 끝날 때까지 서비스를 이용하실 수 있습니다."
                confirmText="구독 취소"
              />
            </Stack>
          }
          code={`{/* 파일 삭제 */}
<SimpleAlertDialog
  variant="danger"
  title="파일을 삭제하시겠습니까?"
  description="선택한 5개의 파일이 영구적으로 삭제됩니다."
  confirmText="삭제"
/>

{/* 변경 사항 취소 */}
<SimpleAlertDialog
  variant="warning"
  title="변경 사항을 취소하시겠습니까?"
  confirmText="취소하고 나가기"
  cancelText="계속 편집"
/>`}
        />
      </Section>

      {/* 접근성 */}
      <Section>
        <Heading level="h2" id="accessibility" title="접근성">
          <Body>AlertDialog 컴포넌트는 KWCAG 2.2 AA 기준을 준수합니다.</Body>
        </Heading>

        <Stack gap="md" className="mt-4">
          <div className="rounded-lg border border-krds-gray-20 p-4">
            <h3 className="font-semibold text-krds-gray-95 mb-2">ARIA 속성</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-krds-gray-70">
              <li>
                <Code>role=&quot;alertdialog&quot;</Code>: 중요한 알림
                다이얼로그임을 명시
              </li>
              <li>
                <Code>aria-modal=&quot;true&quot;</Code>: 모달 다이얼로그임을
                명시
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
            <h3 className="font-semibold text-krds-gray-95 mb-2">
              키보드 접근성
            </h3>
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
        </Stack>
      </Section>

      {/* Modal vs AlertDialog */}
      <Section>
        <Heading level="h2" id="vs-modal" title="Modal vs AlertDialog">
          <Body>Modal과 AlertDialog의 사용 시나리오를 비교합니다.</Body>
        </Heading>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-krds-gray-20">
                <th className="text-left py-3 px-4 font-semibold">특성</th>
                <th className="text-left py-3 px-4 font-semibold">Modal</th>
                <th className="text-left py-3 px-4 font-semibold">
                  AlertDialog
                </th>
              </tr>
            </thead>
            <tbody className="text-krds-gray-70">
              <tr className="border-b border-krds-gray-10">
                <td className="py-3 px-4 font-medium">목적</td>
                <td className="py-3 px-4">일반적인 콘텐츠 표시</td>
                <td className="py-3 px-4">확인/취소 액션 필요</td>
              </tr>
              <tr className="border-b border-krds-gray-10">
                <td className="py-3 px-4 font-medium">닫기 방법</td>
                <td className="py-3 px-4">X 버튼, 오버레이 클릭</td>
                <td className="py-3 px-4">취소/확인 버튼만</td>
              </tr>
              <tr className="border-b border-krds-gray-10">
                <td className="py-3 px-4 font-medium">ESC 키</td>
                <td className="py-3 px-4">닫힘</td>
                <td className="py-3 px-4">닫힘</td>
              </tr>
              <tr className="border-b border-krds-gray-10">
                <td className="py-3 px-4 font-medium">사용 사례</td>
                <td className="py-3 px-4">폼, 상세 정보</td>
                <td className="py-3 px-4">삭제 확인, 로그아웃</td>
              </tr>
              <tr className="border-b border-krds-gray-10">
                <td className="py-3 px-4 font-medium">ARIA role</td>
                <td className="py-3 px-4">dialog</td>
                <td className="py-3 px-4">alertdialog</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* API Reference */}
      <Section>
        <Heading level="h2" id="api" title="API Reference" />

        <div className="space-y-6">
          {/* SimpleAlertDialog */}
          <div>
            <h3 className="text-lg font-semibold mb-3">SimpleAlertDialog</h3>
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
                      <Code>trigger</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>ReactNode</Code>
                    </td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">트리거 요소</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>variant</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>
                        &quot;default&quot; | &quot;warning&quot; |
                        &quot;danger&quot; | &quot;info&quot; |
                        &quot;success&quot;
                      </Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>&quot;default&quot;</Code>
                    </td>
                    <td className="py-3 px-4">다이얼로그 유형</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>title</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>string</Code>
                    </td>
                    <td className="py-3 px-4">필수</td>
                    <td className="py-3 px-4">제목</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>description</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>string</Code>
                    </td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">설명</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>confirmText</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>string</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>&quot;확인&quot;</Code>
                    </td>
                    <td className="py-3 px-4">확인 버튼 텍스트</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>cancelText</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>string</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>&quot;취소&quot;</Code>
                    </td>
                    <td className="py-3 px-4">취소 버튼 텍스트</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>onConfirm</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>() =&gt; void</Code>
                    </td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">확인 버튼 클릭 콜백</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>onCancel</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>() =&gt; void</Code>
                    </td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">취소 버튼 클릭 콜백</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>showIcon</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>boolean</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>true</Code>
                    </td>
                    <td className="py-3 px-4">아이콘 표시 여부</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>open</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>boolean</Code>
                    </td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">제어 모드: 열림 상태</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>onOpenChange</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>(open: boolean) =&gt; void</Code>
                    </td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">열림 상태 변경 콜백</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
