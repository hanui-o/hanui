'use client';

import { useState } from 'react';
import { PageSection as Section, Heading } from '@/components/content';
import { PreviewBox } from '@/components/helpers';
import { Alert, Button, Stack } from '@hanui/react';
import { Bell, ShieldCheck, Zap } from 'lucide-react';

export default function AlertPage() {
  const [showClosable, setShowClosable] = useState(true);

  return (
    <>
      <Heading
        level="h1"
        title="Alert"
        description="사용자에게 중요한 정보를 알리는 정적 메시지 컴포넌트입니다."
        badge="New"
      />

      {/* 기본 사용법 */}
      <Section>
        <Heading
          level="h2"
          id="default"
          title="기본 사용법"
          description="Alert 컴포넌트는 variant prop으로 메시지 유형을 지정합니다."
        />

        <PreviewBox
          preview={
            <Stack gap="md" className="w-full max-w-lg">
              <Alert variant="info" title="정보">
                새로운 버전이 출시되었습니다. 업데이트를 확인해주세요.
              </Alert>
              <Alert variant="success" title="성공">
                파일이 성공적으로 저장되었습니다.
              </Alert>
              <Alert variant="warning" title="경고">
                저장 공간이 부족합니다. 불필요한 파일을 삭제해주세요.
              </Alert>
              <Alert variant="error" title="오류">
                서버 연결에 실패했습니다. 네트워크 상태를 확인해주세요.
              </Alert>
            </Stack>
          }
          code={`<Alert variant="info" title="정보">
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
</Alert>`}
        />
      </Section>

      {/* 제목만 있는 Alert */}
      <Section>
        <Heading
          level="h2"
          id="title-only"
          title="제목만 있는 Alert"
          description="간단한 메시지는 title만 사용할 수 있습니다."
        />

        <PreviewBox
          preview={
            <Stack gap="md" className="w-full max-w-lg">
              <Alert variant="info" title="새로운 알림이 있습니다." />
              <Alert variant="success" title="작업이 완료되었습니다." />
            </Stack>
          }
          code={`<Alert variant="info" title="새로운 알림이 있습니다." />
<Alert variant="success" title="작업이 완료되었습니다." />`}
        />
      </Section>

      {/* 설명만 있는 Alert */}
      <Section>
        <Heading
          level="h2"
          id="description-only"
          title="설명만 있는 Alert"
          description="제목 없이 설명만 표시할 수도 있습니다."
        />

        <PreviewBox
          preview={
            <Stack gap="md" className="w-full max-w-lg">
              <Alert variant="info">
                이 페이지는 현재 베타 버전입니다. 피드백을 보내주세요.
              </Alert>
              <Alert variant="warning">
                비밀번호가 90일 후 만료됩니다. 미리 변경해주세요.
              </Alert>
            </Stack>
          }
          code={`<Alert variant="info">
  이 페이지는 현재 베타 버전입니다.
</Alert>
<Alert variant="warning">
  비밀번호가 90일 후 만료됩니다.
</Alert>`}
        />
      </Section>

      {/* 닫기 버튼 */}
      <Section>
        <Heading
          level="h2"
          id="closable"
          title="닫기 버튼"
          description="closable prop을 사용하면 닫기 버튼이 표시됩니다."
        />

        <PreviewBox
          preview={
            <Stack gap="md" className="w-full max-w-lg">
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
            </Stack>
          }
          code={`<Alert
  variant="info"
  title="닫을 수 있는 알림"
  closable
  onClose={() => console.log('closed')}
>
  이 알림은 닫기 버튼을 클릭하면 사라집니다.
</Alert>`}
        />
      </Section>

      {/* 커스텀 아이콘 */}
      <Section>
        <Heading
          level="h2"
          id="custom-icon"
          title="커스텀 아이콘"
          description="icon prop으로 커스텀 아이콘을 지정할 수 있습니다. icon={false}로 아이콘을 숨길 수도 있습니다."
        />

        <PreviewBox
          preview={
            <Stack gap="md" className="w-full max-w-lg">
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
            </Stack>
          }
          code={`import { Bell, ShieldCheck, Zap } from 'lucide-react';

<Alert variant="info" title="알림 설정" icon={<Bell />}>
  새로운 알림을 받으려면 설정에서 활성화하세요.
</Alert>
<Alert variant="success" title="보안 인증 완료" icon={<ShieldCheck />}>
  2단계 인증이 성공적으로 설정되었습니다.
</Alert>
<Alert variant="info" title="아이콘 없음" icon={false}>
  아이콘 없이 텍스트만 표시됩니다.
</Alert>`}
        />
      </Section>

      {/* role 속성 */}
      <Section>
        <Heading
          level="h2"
          id="role"
          title="접근성: role 속성"
          description="role prop으로 스크린리더 동작을 제어합니다."
        />

        <PreviewBox
          preview={
            <Stack gap="md" className="w-full max-w-lg">
              <Alert variant="error" title="긴급 알림" role="alert">
                시스템 점검이 5분 후 시작됩니다. 작업을 저장해주세요.
              </Alert>
              <Alert variant="info" title="상태 업데이트" role="status">
                백그라운드 동기화가 완료되었습니다.
              </Alert>
            </Stack>
          }
          code={`{/* role="alert": 긴급한 메시지, 스크린리더가 즉시 읽음 */}
<Alert variant="error" title="긴급 알림" role="alert">
  시스템 점검이 5분 후 시작됩니다.
</Alert>

{/* role="status": 일반 상태 메시지 */}
<Alert variant="info" title="상태 업데이트" role="status">
  백그라운드 동기화가 완료되었습니다.
</Alert>`}
        />
      </Section>

      {/* 실제 사용 예시 */}
      <Section>
        <Heading
          level="h2"
          id="examples"
          title="실제 사용 예시"
          description="폼 제출 결과, 시스템 알림 등 실제 사용 사례입니다."
        />

        <PreviewBox
          preview={
            <Stack gap="lg" className="w-full max-w-lg">
              <Alert variant="error" title="입력 오류">
                <ul className="list-disc pl-4 mt-2 space-y-1 text-sm">
                  <li>이메일 형식이 올바르지 않습니다.</li>
                  <li>비밀번호는 8자 이상이어야 합니다.</li>
                  <li>필수 항목을 모두 입력해주세요.</li>
                </ul>
              </Alert>

              <Alert variant="success" title="회원가입 완료" closable>
                환영합니다! 이메일로 인증 링크를 발송했습니다. 24시간 내에
                인증을 완료해주세요.
              </Alert>

              <Alert variant="warning" title="시스템 점검 안내">
                2024년 1월 15일 02:00 ~ 06:00 동안 서비스 점검이 예정되어
                있습니다. 이용에 참고해주세요.
              </Alert>
            </Stack>
          }
          code={`{/* 폼 검증 오류 */}
<Alert variant="error" title="입력 오류">
  <ul className="list-disc pl-4 mt-2 space-y-1 text-sm">
    <li>이메일 형식이 올바르지 않습니다.</li>
    <li>비밀번호는 8자 이상이어야 합니다.</li>
  </ul>
</Alert>

{/* 성공 메시지 */}
<Alert variant="success" title="회원가입 완료" closable>
  환영합니다! 이메일로 인증 링크를 발송했습니다.
</Alert>`}
        />
      </Section>

      {/* 접근성 */}
      <Section>
        <Heading
          level="h2"
          id="accessibility"
          title="접근성"
          description="Alert 컴포넌트는 KWCAG 2.2 AA 기준을 준수합니다."
        />

        <Stack gap="md" className="mt-4">
          <div className="rounded-lg border border-krds-gray-20 p-4">
            <h3 className="font-semibold text-krds-gray-95 mb-2">ARIA 속성</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-krds-gray-70">
              <li>
                <code className="bg-krds-gray-10 px-1 rounded">
                  role="alert"
                </code>
                : 긴급한 메시지 (기본값)
              </li>
              <li>
                <code className="bg-krds-gray-10 px-1 rounded">
                  role="status"
                </code>
                : 일반 상태 메시지
              </li>
              <li>
                <code className="bg-krds-gray-10 px-1 rounded">aria-live</code>:
                스크린리더에 변경 사항 알림
              </li>
              <li>
                <code className="bg-krds-gray-10 px-1 rounded">
                  aria-atomic="true"
                </code>
                : 전체 내용을 읽음
              </li>
            </ul>
          </div>
          <div className="rounded-lg border border-krds-gray-20 p-4">
            <h3 className="font-semibold text-krds-gray-95 mb-2">
              키보드 접근성
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-krds-gray-70">
              <li>닫기 버튼은 Tab으로 포커스 가능</li>
              <li>Enter/Space로 닫기 버튼 활성화</li>
              <li>포커스 링으로 시각적 피드백 제공</li>
            </ul>
          </div>
        </Stack>
      </Section>

      {/* API Reference */}
      <Section>
        <Heading level="h2" id="api" title="API Reference" />

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-krds-gray-20">
                <th className="text-left py-3 px-4 font-semibold">Prop</th>
                <th className="text-left py-3 px-4 font-semibold">Type</th>
                <th className="text-left py-3 px-4 font-semibold">Default</th>
                <th className="text-left py-3 px-4 font-semibold">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="text-krds-gray-70">
              <tr className="border-b border-krds-gray-10">
                <td className="py-3 px-4">
                  <code className="bg-krds-gray-10 px-1 rounded">variant</code>
                </td>
                <td className="py-3 px-4">
                  <code className="bg-krds-gray-10 px-1 rounded">
                    "info" | "success" | "warning" | "error"
                  </code>
                </td>
                <td className="py-3 px-4">
                  <code className="bg-krds-gray-10 px-1 rounded">"info"</code>
                </td>
                <td className="py-3 px-4">알림 유형</td>
              </tr>
              <tr className="border-b border-krds-gray-10">
                <td className="py-3 px-4">
                  <code className="bg-krds-gray-10 px-1 rounded">title</code>
                </td>
                <td className="py-3 px-4">
                  <code className="bg-krds-gray-10 px-1 rounded">
                    ReactNode
                  </code>
                </td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4">알림 제목</td>
              </tr>
              <tr className="border-b border-krds-gray-10">
                <td className="py-3 px-4">
                  <code className="bg-krds-gray-10 px-1 rounded">children</code>
                </td>
                <td className="py-3 px-4">
                  <code className="bg-krds-gray-10 px-1 rounded">
                    ReactNode
                  </code>
                </td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4">알림 설명/내용</td>
              </tr>
              <tr className="border-b border-krds-gray-10">
                <td className="py-3 px-4">
                  <code className="bg-krds-gray-10 px-1 rounded">closable</code>
                </td>
                <td className="py-3 px-4">
                  <code className="bg-krds-gray-10 px-1 rounded">boolean</code>
                </td>
                <td className="py-3 px-4">
                  <code className="bg-krds-gray-10 px-1 rounded">false</code>
                </td>
                <td className="py-3 px-4">닫기 버튼 표시 여부</td>
              </tr>
              <tr className="border-b border-krds-gray-10">
                <td className="py-3 px-4">
                  <code className="bg-krds-gray-10 px-1 rounded">onClose</code>
                </td>
                <td className="py-3 px-4">
                  <code className="bg-krds-gray-10 px-1 rounded">
                    {'() => void'}
                  </code>
                </td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4">닫기 버튼 클릭 콜백</td>
              </tr>
              <tr className="border-b border-krds-gray-10">
                <td className="py-3 px-4">
                  <code className="bg-krds-gray-10 px-1 rounded">icon</code>
                </td>
                <td className="py-3 px-4">
                  <code className="bg-krds-gray-10 px-1 rounded">
                    ReactNode | false
                  </code>
                </td>
                <td className="py-3 px-4">variant별 기본 아이콘</td>
                <td className="py-3 px-4">커스텀 아이콘 또는 아이콘 숨김</td>
              </tr>
              <tr className="border-b border-krds-gray-10">
                <td className="py-3 px-4">
                  <code className="bg-krds-gray-10 px-1 rounded">role</code>
                </td>
                <td className="py-3 px-4">
                  <code className="bg-krds-gray-10 px-1 rounded">
                    "alert" | "status"
                  </code>
                </td>
                <td className="py-3 px-4">
                  <code className="bg-krds-gray-10 px-1 rounded">"alert"</code>
                </td>
                <td className="py-3 px-4">ARIA role 속성</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}
