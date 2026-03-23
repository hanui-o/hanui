'use client';

// Docs layout components
import {
  PageSection as Section,
  Subsection,
  Heading,
  PageNavigation,
  Installation,
} from '@/components/content';
import { ComponentPreview } from '@/components/content/ComponentPreview';

// Docs helper components
import { DoCard, DontCard } from '@/components/helpers';

// UI components - from @hanui/react
import {
  Tooltip,
  Button,
  Code,
  List,
  ListItem,
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

export default function TooltipPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Tooltip"
        description="마우스 오버 또는 키보드 포커스 시 추가 정보를 제공하는 팝오버 컴포넌트입니다. KRDS 2.2 접근성 가이드라인을 준수합니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* 1. 개요 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />
            <ComponentPreview>
              <div className="flex justify-between gap-4 w-full">
                <Tooltip content="저장 버튼을 클릭하여 변경사항을 저장하세요">
                  <Button>저장</Button>
                </Tooltip>
                <Tooltip content="삭제하면 복구할 수 없습니다">
                  <Button variant="danger">삭제</Button>
                </Tooltip>
              </div>
            </ComponentPreview>

            <Code variant="block" language="tsx">
              {`import { Tooltip } from '@/components/hanui/tooltip';
import { Button } from '@/components/hanui/button';

<Tooltip content="저장 버튼을 클릭하여 변경사항을 저장하세요">
  <Button>저장</Button>
</Tooltip>`}
            </Code>
          </Section>

          {/* 2. 설치 */}
          <Section level="h2">
            <Installation componentName="tooltip" />
          </Section>

          {/* 3. 사용법 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="usage"
              title="사용법"
              description="Tooltip은 자식 요소에 마우스를 올리거나 키보드로 포커스할 때 간단한 도움말을 표시합니다."
            />

            <Code variant="block" language="tsx">
              {`import { Tooltip } from '@/components/hanui/tooltip';
import { Button } from '@/components/hanui/button';

<Tooltip content="저장 버튼입니다">
  <Button>저장</Button>
</Tooltip>`}
            </Code>
          </Section>

          {/* 4. 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Position"
                description="position prop으로 툴팁의 위치를 지정할 수 있습니다."
              />
              <ComponentPreview>
                <div className="flex gap-4">
                  <Tooltip content="상단 툴팁" position="top">
                    <Button>Top</Button>
                  </Tooltip>
                  <Tooltip content="우측 툴팁" position="right">
                    <Button>Right</Button>
                  </Tooltip>
                  <Tooltip content="하단 툴팁" position="bottom">
                    <Button>Bottom</Button>
                  </Tooltip>
                  <Tooltip content="좌측 툴팁" position="left">
                    <Button>Left</Button>
                  </Tooltip>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Tooltip content="상단 툴팁" position="top">
  <Button>Top</Button>
</Tooltip>

<Tooltip content="우측 툴팁" position="right">
  <Button>Right</Button>
</Tooltip>`}
              </Code>
            </Subsection>

            {/* <Subsection level="h3">
              <Heading
                level="h3"
                title="Variant"
                description="variant prop으로 툴팁 스타일을 변경할 수 있습니다."
              />
              <ComponentPreview>
                <div className="flex justify-between gap-4 w-full">
                  <Tooltip content="기본 다크 툴팁" variant="default">
                    <Button>Dark (Default)</Button>
                  </Tooltip>
                  <Tooltip content="라이트 툴팁" variant="light">
                    <Button>Light</Button>
                  </Tooltip>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Tooltip content="기본 다크 툴팁" variant="default">
  <Button>Dark (Default)</Button>
</Tooltip>

<Tooltip content="라이트 툴팁" variant="light">
  <Button>Light</Button>
</Tooltip>`}
              </Code>
            </Subsection> */}

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Delay"
                description="delay prop으로 툴팁이 나타나는 지연 시간을 밀리초 단위로 설정할 수 있습니다. 기본값은 200ms입니다."
              />
              <ComponentPreview>
                <div className="flex gap-4">
                  <Tooltip content="즉시 표시" delay={0}>
                    <Button>No Delay</Button>
                  </Tooltip>
                  <Tooltip content="기본 지연 (200ms)">
                    <Button>Default (200ms)</Button>
                  </Tooltip>
                  <Tooltip content="긴 지연 (1000ms)" delay={1000}>
                    <Button>Long Delay (1s)</Button>
                  </Tooltip>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Tooltip content="즉시 표시" delay={0}>
  <Button>No Delay</Button>
</Tooltip>

<Tooltip content="긴 지연 (1000ms)" delay={1000}>
  <Button>Long Delay (1s)</Button>
</Tooltip>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="아이콘 버튼과 함께 사용"
                description="텍스트 레이블이 없는 아이콘 버튼의 기능을 설명할 때 툴팁을 사용하세요."
              />
              <ComponentPreview>
                <div className="flex gap-4">
                  <Tooltip content="설정">
                    <Button variant="ghost" size="sm">
                      ⚙️
                    </Button>
                  </Tooltip>
                  <Tooltip content="알림">
                    <Button variant="ghost" size="sm">
                      🔔
                    </Button>
                  </Tooltip>
                  <Tooltip content="프로필">
                    <Button variant="ghost" size="sm">
                      👤
                    </Button>
                  </Tooltip>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Tooltip content="설정">
  <Button variant="ghost" size="sm">⚙️</Button>
</Tooltip>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Disabled"
                description="disabled prop으로 툴팁을 비활성화할 수 있습니다."
              />
              <ComponentPreview>
                <div className="flex gap-4">
                  <Tooltip content="활성화된 툴팁">
                    <Button>Enabled</Button>
                  </Tooltip>
                  <Tooltip content="이 툴팁은 표시되지 않습니다" disabled>
                    <Button>Disabled Tooltip</Button>
                  </Tooltip>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Tooltip content="이 툴팁은 표시되지 않습니다" disabled>
  <Button>Disabled Tooltip</Button>
</Tooltip>`}
              </Code>
            </Subsection>
          </Section>

          {/* 6. 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="WCAG 2.1 / KWCAG 2.2 AA 기준 및 KRDS 2.2 접근성 가이드라인을 준수합니다."
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
                      <Code>Tab</Code>
                    </TableCell>
                    <TableCell>버튼에 포커스하면 툴팁 표시</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>Shift + Tab</Code>
                    </TableCell>
                    <TableCell>포커스 이동 시 툴팁 숨김</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>ESC</Code>
                    </TableCell>
                    <TableCell>
                      툴팁 닫기 및 활성화 버튼으로 포커스 복원
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="ARIA 속성" />
              <List>
                <ListItem>
                  <Code>aria-describedby</Code>: 활성화 요소와 툴팁 콘텐츠 자동
                  연결 (추가 설명 제공)
                </ListItem>
                <ListItem>
                  <Code>role=&quot;tooltip&quot;</Code>: 툴팁 역할 명시
                </ListItem>
                <ListItem>
                  충분한 명암비 (다크 배경과 흰색 텍스트로 7:1 이상 보장)
                </ListItem>
              </List>
            </Subsection>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="Tooltip Props" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>속성</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>content</Code>
                    </TableCell>
                    <TableCell>
                      <Code>React.ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>툴팁에 표시할 콘텐츠 (필수)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>children</Code>
                    </TableCell>
                    <TableCell>
                      <Code>React.ReactElement</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>툴팁을 트리거할 요소 (필수)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>variant</Code>
                    </TableCell>
                    <TableCell>
                      <Code>&quot;default&quot; | &quot;light&quot;</Code>
                    </TableCell>
                    <TableCell>
                      <Code>&quot;default&quot;</Code>
                    </TableCell>
                    <TableCell>툴팁 스타일 변형</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>position</Code>
                    </TableCell>
                    <TableCell>
                      <Code>
                        &quot;top&quot; | &quot;right&quot; | &quot;bottom&quot;
                        | &quot;left&quot;
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code>&quot;right&quot;</Code>
                    </TableCell>
                    <TableCell>
                      툴팁 표시 위치 (autoPosition 시 자동 조절)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>autoPosition</Code>
                    </TableCell>
                    <TableCell>
                      <Code>boolean</Code>
                    </TableCell>
                    <TableCell>
                      <Code>true</Code>
                    </TableCell>
                    <TableCell>화면 위치에 따라 left/right 자동 선택</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>delay</Code>
                    </TableCell>
                    <TableCell>
                      <Code>number</Code>
                    </TableCell>
                    <TableCell>
                      <Code>200</Code>
                    </TableCell>
                    <TableCell>툴팁 표시 지연 시간 (ms)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>disabled</Code>
                    </TableCell>
                    <TableCell>
                      <Code>boolean</Code>
                    </TableCell>
                    <TableCell>
                      <Code>false</Code>
                    </TableCell>
                    <TableCell>툴팁 비활성화 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>className</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>툴팁 컨테이너 추가 CSS 클래스</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>wrapperClassName</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>래퍼 추가 CSS 클래스</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Toast', href: '/components/toast' }}
        next={{ title: 'Wrap', href: '/components/wrap' }}
      />
    </>
  );
}
