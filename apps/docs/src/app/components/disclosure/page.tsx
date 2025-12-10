'use client';

import { useState } from 'react';

// Docs layout
import {
  PageSection as Section,
  Subsection,
  Heading,
  PageNavigation,
  Installation,
} from '@/components/content';
import { ComponentPreview } from '@/components/content/ComponentPreview';

// UI Components
import {
  Disclosure,
  Button,
  Code,
  List,
  ListItem,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Stack,
} from '@hanui/react';

export default function DisclosurePage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Heading
        level="h1"
        title="Disclosure"
        description="부가적인 정보를 표시하거나 숨기는 컴포넌트입니다. Accordion과 달리 단독으로 사용되며, 여러 개를 동시에 열 수 있습니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* 개요 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />
            <ComponentPreview align="start">
              <Disclosure trigger="참고 사항 보기">
                이 정보는 추가적인 설명을 제공합니다. 디스클로저는 기본적으로
                축소된 상태로 제공되어 사용자의 인지적 부담을 줄입니다.
              </Disclosure>
            </ComponentPreview>

            <Code variant="block" language="tsx">
              {`import { Disclosure } from '@/components/hanui/disclosure';

<Disclosure trigger="참고 사항 보기">
  이 정보는 추가적인 설명을 제공합니다.
</Disclosure>`}
            </Code>
          </Section>

          {/* 설치 */}
          <Section level="h2">
            <Installation componentName="disclosure" />
          </Section>

          {/* 사용법 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="usage"
              title="사용법"
              description="trigger와 children을 전달하여 디스클로저를 렌더링합니다. 기본적으로 축소된 상태로 시작합니다."
            />

            <Code variant="block" language="tsx">
              {`import { Disclosure } from '@/components/hanui/disclosure';

<Disclosure trigger="자세히 보기">
  이 정보는 부가적인 설명을 제공합니다.
  기본적으로 축소된 상태로 표시되며,
  사용자가 클릭하면 확장됩니다.
</Disclosure>`}
            </Code>
          </Section>

          {/* 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading
                level="h3"
                title="기본 열림 상태"
                description="defaultOpen prop으로 처음부터 열린 상태로 렌더링할 수 있습니다. (KRDS는 축소 상태를 권장)"
              />
              <ComponentPreview align="start">
                <Disclosure trigger="이미 열린 정보" defaultOpen>
                  기본적으로 열려 있는 상태로 시작합니다. 특수한 경우에만 사용을
                  권장합니다.
                </Disclosure>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Disclosure trigger="이미 열린 정보" defaultOpen>
  기본적으로 열려 있는 상태로 시작합니다.
</Disclosure>`}
              </Code>
            </Subsection>
          </Section>

          {/* 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다."
            />

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
                      <Code>Enter</Code> / <Code>Space</Code>
                    </TableCell>
                    <TableCell>디스클로저 열기/닫기</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>Tab</Code>
                    </TableCell>
                    <TableCell>다음 포커스 가능한 요소로 이동</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="ARIA 속성" />
              <List>
                <ListItem>
                  <Code>&lt;button&gt;</Code> 요소로 트리거 구현
                </ListItem>
                <ListItem>
                  <Code>aria-expanded</Code>: 확장/축소 상태 전달
                </ListItem>
                <ListItem>
                  <Code>aria-controls</Code>: 트리거와 콘텐츠 영역 연결
                </ListItem>
                <ListItem>
                  콘텐츠 영역에 <Code>role=&quot;region&quot;</Code> 적용
                </ListItem>
              </List>
            </Subsection>
          </Section>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="Disclosure Props" />
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
                      <Code>trigger</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">ReactNode</Code>
                    </TableCell>
                    <TableCell>필수</TableCell>
                    <TableCell>트리거 버튼에 표시할 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>children</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">ReactNode</Code>
                    </TableCell>
                    <TableCell>필수</TableCell>
                    <TableCell>확장 시 표시할 콘텐츠</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>defaultOpen</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>기본 열림 상태 (비제어)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>open</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>열림 상태 (제어 모드)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>onOpenChange</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        (open: boolean) =&gt; void
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>상태 변경 콜백</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Display', href: '/components/display' }}
        next={{ title: 'DropdownMenu', href: '/components/dropdown-menu' }}
      />
    </>
  );
}
