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
  List,
  ListItem,
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
          {/* 1. 개요 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              description="Alert는 사용자에게 중요한 정보를 전달하는 정적 메시지 컴포넌트입니다. 정보, 성공, 경고, 오류 네 가지 유형을 지원하며, role 속성으로 스크린리더 동작을 제어할 수 있습니다."
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

          {/* 2. 설치 */}
          <Section level="h2">
            <Installation componentName="alert" />
          </Section>

          {/* 3. 사용법 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="usage"
              title="사용법"
              description="Alert 컴포넌트를 import하고 variant와 title을 지정하여 사용합니다."
            />
            <Code variant="block" language="tsx">
              {`import { Alert } from '@hanui/react'

<Alert variant="info" title="알림">
  중요한 메시지를 표시합니다.
</Alert>`}
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
                description="info, success, warning, error 네 가지 유형을 지원합니다. 각 유형에 맞는 색상과 기본 아이콘이 적용됩니다."
              />
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

            {/* 제목만 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="제목만"
                description="간단한 메시지는 title만 사용하여 표시할 수 있습니다."
              />
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

            {/* 설명만 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="설명만"
                description="title 없이 children만 사용하여 상세 설명을 표시할 수 있습니다."
              />
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

            {/* 닫기 버튼 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="닫기 버튼"
                description="closable prop으로 닫기 버튼을 표시하고, onClose 콜백으로 닫기 이벤트를 처리합니다."
              />
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

            {/* 커스텀 아이콘 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="커스텀 아이콘"
                description="icon prop으로 커스텀 아이콘을 지정하거나 icon={false}로 아이콘을 숨길 수 있습니다."
              />
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

            {/* Role 속성 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="Role 속성"
                description="role prop으로 스크린리더의 동작을 제어합니다. alert는 즉시 읽히고, status는 대기 후 읽힙니다."
              />
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

          {/* 5. 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="Alert는 WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다."
            />
            <List variant="check">
              <ListItem>
                <strong>role 속성:</strong> role=&quot;alert&quot;는 긴급
                메시지에, role=&quot;status&quot;는 일반 상태 알림에 사용합니다.
              </ListItem>
              <ListItem>
                <strong>aria-live:</strong> alert는 assertive, status는 polite로
                설정되어 스크린리더가 적절히 읽습니다.
              </ListItem>
              <ListItem>
                <strong>aria-atomic:</strong> true로 설정되어 변경 시 전체
                내용을 읽습니다.
              </ListItem>
              <ListItem>
                <strong>키보드 접근성:</strong> 닫기 버튼은 Tab으로 포커스
                가능하고 Enter/Space로 활성화됩니다.
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
              <Heading level="h3" title="키보드 단축키" />
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
                    <TableCell>닫기 버튼으로 포커스 이동</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>Enter</Code> / <Code>Space</Code>
                    </TableCell>
                    <TableCell>닫기 버튼 활성화</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
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
