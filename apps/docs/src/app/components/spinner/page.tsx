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
  Spinner,
  SpinnerOverlay,
  SpinnerInline,
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

function SpinnerOverlayDemo() {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
    setTimeout(() => setShow(false), 2000);
  };

  return (
    <>
      <Button onClick={handleShow}>오버레이 표시 (2초)</Button>
      <SpinnerOverlay show={show} message="처리 중입니다..." />
    </>
  );
}

function ButtonLoadingDemo() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Button onClick={handleClick} disabled={loading}>
      {loading ? <SpinnerInline>저장 중...</SpinnerInline> : '저장하기'}
    </Button>
  );
}

export default function SpinnerPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Spinner"
        description="로딩 상태를 표시하는 회전 애니메이션 컴포넌트입니다."
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
              <div className="flex items-center gap-6">
                <Spinner />
                <Spinner variant="secondary" />
                <Spinner variant="default" />
              </div>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<Spinner />
<Spinner variant="secondary" />
<Spinner variant="default" />`}
            </Code>
          </Section>

          <Section level="h2">
            <Installation componentName="spinner" />
          </Section>

          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { Spinner, SpinnerInline, SpinnerOverlay } from '@hanui/react'

<Spinner />
<SpinnerInline>로딩 중...</SpinnerInline>
<SpinnerOverlay show={isLoading} message="처리 중..." />`}
            </Code>
          </Section>

          {/* 예제 섹션 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading level="h3" title="Size" />
              <ComponentPreview>
                <div className="flex items-center gap-6">
                  <Spinner size="xs" />
                  <Spinner size="sm" />
                  <Spinner size="md" />
                  <Spinner size="lg" />
                  <Spinner size="xl" />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Spinner size="xs" />
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Variant" />
              <ComponentPreview>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <Spinner variant="default" size="lg" />
                    <p className="text-xs mt-2">default</p>
                  </div>
                  <div className="text-center">
                    <Spinner variant="primary" size="lg" />
                    <p className="text-xs mt-2">primary</p>
                  </div>
                  <div className="text-center">
                    <Spinner variant="secondary" size="lg" />
                    <p className="text-xs mt-2">secondary</p>
                  </div>
                  <div className="text-center p-4 bg-krds-gray-95 rounded">
                    <Spinner variant="white" size="lg" />
                    <p className="text-xs mt-2 text-white">white</p>
                  </div>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Spinner variant="default" />
<Spinner variant="primary" />
<Spinner variant="secondary" />
<Spinner variant="white" />  {/* 어두운 배경에서 사용 */}
<Spinner variant="inherit" /> {/* 부모 색상 상속 */}`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Inline" />
              <ComponentPreview>
                <div className="space-y-4">
                  <SpinnerInline>로딩 중...</SpinnerInline>
                  <SpinnerInline position="right">데이터 처리 중</SpinnerInline>
                  <SpinnerInline size="xs">불러오는 중</SpinnerInline>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<SpinnerInline>로딩 중...</SpinnerInline>
<SpinnerInline position="right">데이터 처리 중</SpinnerInline>
<SpinnerInline size="xs">불러오는 중</SpinnerInline>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Button Loading" />
              <ComponentPreview>
                <ButtonLoadingDemo />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`const [loading, setLoading] = useState(false);

<Button onClick={handleClick} disabled={loading}>
  {loading ? <SpinnerInline>저장 중...</SpinnerInline> : '저장하기'}
</Button>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Overlay" />
              <ComponentPreview>
                <SpinnerOverlayDemo />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`const [show, setShow] = useState(false);

<SpinnerOverlay show={show} message="처리 중입니다..." />
<Button onClick={() => setShow(true)}>오버레이 표시</Button>`}
              </Code>
            </Subsection>
          </Section>

          {/* 5. 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="Spinner는 WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다."
            />
            <List variant="check">
              <ListItem>
                <strong>role=&quot;status&quot;:</strong> 로딩 상태임을
                스크린리더에 알립니다.
              </ListItem>
              <ListItem>
                <strong>aria-live=&quot;polite&quot;:</strong> 현재 작업을
                방해하지 않고 로딩 상태를 알립니다.
              </ListItem>
              <ListItem>
                <strong>aria-busy=&quot;true&quot;:</strong> SpinnerOverlay에서
                로딩 중임을 명시합니다.
              </ListItem>
              <ListItem>
                <strong>sr-only 텍스트:</strong> 시각 장애인을 위한 대체
                텍스트를 제공합니다.
              </ListItem>
              <ListItem>
                label prop으로 상황에 맞는 명확한 로딩 메시지를 제공하세요.
              </ListItem>
              <ListItem>
                긴 로딩 시에는 Progress 컴포넌트로 진행률을 표시하는 것을
                권장합니다.
              </ListItem>
            </List>
          </Section>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="Spinner Props" />
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
                      <Code>size</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'xs' | 'sm' | 'md' | 'lg' | 'xl'
                      </Code>
                    </TableCell>
                    <TableCell>'md'</TableCell>
                    <TableCell>크기</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>variant</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'default' | 'primary' | 'secondary' | 'white' |
                        'inherit'
                      </Code>
                    </TableCell>
                    <TableCell>'primary'</TableCell>
                    <TableCell>색상 변형</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>label</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>'로딩 중'</TableCell>
                    <TableCell>스크린리더 레이블</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>strokeWidth</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>선 두께</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="SpinnerOverlay Props" />
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
                      <Code>show</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>true</TableCell>
                    <TableCell>표시 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>message</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>로딩 메시지</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>backdrop</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">'light' | 'dark' | 'blur'</Code>
                    </TableCell>
                    <TableCell>'light'</TableCell>
                    <TableCell>배경 스타일</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="SpinnerInline Props" />
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
                      <Code>children</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>텍스트 내용</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>position</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">'left' | 'right'</Code>
                    </TableCell>
                    <TableCell>'left'</TableCell>
                    <TableCell>스피너 위치</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Slider', href: '/components/slider' }}
        next={{ title: 'Stack', href: '/components/stack' }}
      />
    </>
  );
}
