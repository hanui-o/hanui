'use client';

import { Tooltip, Button } from '@hanui/react';
// Docs layout components
import {
  PageSection as Section,
  Subsection,
  SectionHeading,
  PageNavigation,
} from '@/components/content';

// Docs helper components
import { DoCard, DontCard } from '@/components/helpers';

// UI components - from @hanui/react
import {
  Body,
  Card,
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
    <Section>
      <SectionHeading
        level="h1"
        id="tooltip"
        title="Tooltip"
        description="활성화 버튼에 마우스 오버 또는 포커스 시 추가 정보를 제공하는 팝오버 컴포넌트입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Installation */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="installation" title="설치" />
            <Body>
              CLI를 사용하여 컴포넌트를 프로젝트에 설치할 수 있습니다.
            </Body>
            <Card>
              <Code language="bash">npx @hanui/cli add tooltip</Code>
            </Card>
          </Subsection>

          {/* What is it */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="what-is-it" title="Tooltip이란?" />
            <Body>
              Tooltip은 사용자가 UI 요소에 마우스를 올리거나 키보드로 포커스할
              때 간단한 도움말이나 부가 설명을 제공하는 컴포넌트입니다.
            </Body>
            <Body>
              HANUI Tooltip은 <strong>KRDS 2.2 접근성 지침</strong>을 완벽하게
              준수하며, Foundation Layer의 자동화된 접근성 기능을 제공합니다.
              WCAG 2.1 / KWCAG 2.2 AA 기준을 충족합니다.
            </Body>
          </Subsection>

          {/* Preview */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="preview" title="미리보기" />

            <Subsection level="h3">
              <SectionHeading level="h3" id="basic" title="기본" />
              <Card>
                <div className="flex gap-4">
                  <Tooltip content="저장 버튼을 클릭하여 변경사항을 저장하세요">
                    <Button>저장</Button>
                  </Tooltip>
                  <Tooltip content="삭제하면 복구할 수 없습니다">
                    <Button variant="danger">삭제</Button>
                  </Tooltip>
                  <Tooltip
                    content="이 기능은 곧 제공될 예정입니다"
                    position="bottom"
                  >
                    <Button variant="ghost">미리보기</Button>
                  </Tooltip>
                </div>
              </Card>
              <Card>
                <Code language="tsx">
                  {`<Tooltip content="저장 버튼을 클릭하여 변경사항을 저장하세요">
  <Button>저장</Button>
</Tooltip>

<Tooltip content="삭제하면 복구할 수 없습니다">
  <Button variant="danger">삭제</Button>
</Tooltip>`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" id="position" title="위치" />
              <Body>position prop으로 툴팁의 위치를 지정할 수 있습니다.</Body>
              <Card>
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
              </Card>
              <Card>
                <Code language="tsx">
                  {`<Tooltip content="상단 툴팁" position="top">
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
</Tooltip>`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" id="variants" title="변형" />
              <Body>variant prop으로 툴팁 스타일을 변경할 수 있습니다.</Body>
              <Card>
                <div className="flex gap-4">
                  <Tooltip content="기본 다크 툴팁" variant="default">
                    <Button>Dark (Default)</Button>
                  </Tooltip>
                  <Tooltip content="라이트 툴팁" variant="light">
                    <Button>Light</Button>
                  </Tooltip>
                </div>
              </Card>
              <Card>
                <Code language="tsx">
                  {`<Tooltip content="기본 다크 툴팁" variant="default">
  <Button>Dark (Default)</Button>
</Tooltip>

<Tooltip content="라이트 툴팁" variant="light">
  <Button>Light</Button>
</Tooltip>`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" id="delay" title="지연 시간" />
              <Body>
                delay prop으로 툴팁이 나타나는 지연 시간을 밀리초 단위로 설정할
                수 있습니다. 기본값은 200ms입니다.
              </Body>
              <Card>
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
              </Card>
              <Card>
                <Code language="tsx">
                  {`<Tooltip content="즉시 표시" delay={0}>
  <Button>No Delay</Button>
</Tooltip>

<Tooltip content="기본 지연 (200ms)">
  <Button>Default (200ms)</Button>
</Tooltip>

<Tooltip content="긴 지연 (1000ms)" delay={1000}>
  <Button>Long Delay (1s)</Button>
</Tooltip>`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="icon-button"
                title="아이콘 버튼과 함께 사용"
              />
              <Body>
                텍스트 레이블이 없는 아이콘 버튼의 기능을 설명할 때 툴팁을
                사용하세요.
              </Body>
              <Card>
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
              </Card>
              <Card>
                <Code language="tsx">
                  {`<Tooltip content="설정">
  <Button variant="ghost" size="sm">⚙️</Button>
</Tooltip>

<Tooltip content="알림">
  <Button variant="ghost" size="sm">🔔</Button>
</Tooltip>

<Tooltip content="프로필">
  <Button variant="ghost" size="sm">👤</Button>
</Tooltip>`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" id="disabled" title="비활성화" />
              <Body>disabled prop으로 툴팁을 비활성화할 수 있습니다.</Body>
              <Card>
                <div className="flex gap-4">
                  <Tooltip content="활성화된 툴팁">
                    <Button>Enabled</Button>
                  </Tooltip>
                  <Tooltip content="이 툴팁은 표시되지 않습니다" disabled>
                    <Button>Disabled Tooltip</Button>
                  </Tooltip>
                </div>
              </Card>
              <Card>
                <Code language="tsx">
                  {`<Tooltip content="활성화된 툴팁">
  <Button>Enabled</Button>
</Tooltip>

<Tooltip content="이 툴팁은 표시되지 않습니다" disabled>
  <Button>Disabled Tooltip</Button>
</Tooltip>`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="custom-styling"
                title="커스텀 스타일링"
              />
              <Body>
                className과 wrapperClassName prop으로 툴팁을 커스터마이징할 수
                있습니다.
              </Body>
              <Card>
                <div className="flex gap-4">
                  <Tooltip
                    content="커스텀 스타일 툴팁"
                    className="bg-purple-600 text-white font-bold"
                  >
                    <Button>Custom Tooltip</Button>
                  </Tooltip>
                  <Tooltip
                    content="큰 툴팁"
                    className="text-base px-4 py-3 max-w-md"
                  >
                    <Button>Large Tooltip</Button>
                  </Tooltip>
                </div>
              </Card>
              <Card>
                <Code language="tsx">
                  {`<Tooltip
  content="커스텀 스타일 툴팁"
  className="bg-purple-600 text-white font-bold"
>
  <Button>Custom Tooltip</Button>
</Tooltip>

<Tooltip
  content="큰 툴팁"
  className="text-base px-4 py-3 max-w-md"
>
  <Button>Large Tooltip</Button>
</Tooltip>`}
                </Code>
              </Card>
            </Subsection>
          </Subsection>

          {/* Usage */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="usage" title="사용 방법" />
            <Card>
              <Code language="tsx">
                {`import { Tooltip, Button } from '@hanui/react';

export default function MyComponent() {
  return (
    <Tooltip content="저장 버튼입니다">
      <Button>저장</Button>
    </Tooltip>
  );
}`}
              </Code>
            </Card>
          </Subsection>

          {/* Best Practices */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="best-practices" title="모범 사례" />

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="when-to-use"
                title="언제 사용하나요?"
              />
              <DoCard>
                <List variant="check">
                  <ListItem>
                    <strong>아이콘 버튼의 기능 설명:</strong> 텍스트 레이블이
                    없는 아이콘 버튼의 용도를 설명할 때
                  </ListItem>
                  <ListItem>
                    <strong>추가 컨텍스트 제공:</strong> 버튼이나 링크에 대한
                    간단한 부가 정보를 제공할 때
                  </ListItem>
                  <ListItem>
                    <strong>짧은 도움말:</strong> 1-2문장 이내의 간결한 도움말을
                    표시할 때
                  </ListItem>
                  <ListItem>
                    <strong>비활성화된 요소 설명:</strong> 왜 특정 기능이
                    비활성화되었는지 설명할 때
                  </ListItem>
                </List>
              </DoCard>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="when-not-to-use"
                title="언제 사용하지 말아야 하나요?"
              />
              <DontCard>
                <List variant="xmark">
                  <ListItem>
                    <strong>중요한 정보 표시:</strong> 사용자가 반드시 알아야
                    하는 정보는 본문에 직접 표시
                  </ListItem>
                  <ListItem>
                    <strong>긴 설명문:</strong> 여러 문단의 긴 설명은 Modal이나
                    별도 페이지 사용
                  </ListItem>
                  <ListItem>
                    <strong>상호작용 요소 포함:</strong> 툴팁 내부에 버튼이나
                    링크를 넣지 마세요
                  </ListItem>
                  <ListItem>
                    <strong>터치 전용 인터페이스:</strong> 모바일에서는 다른 UI
                    패턴 고려
                  </ListItem>
                </List>
              </DontCard>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="interaction-patterns"
                title="상호작용 패턴"
              />
              <Body>KRDS 2.2에서 정의한 툴팁 상호작용 패턴:</Body>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>상호작용</TableHead>
                    <TableHead>동작</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>Mouseover</Code>
                    </TableCell>
                    <TableCell>
                      활성화 버튼에 마우스를 올리면 툴팁 표시
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>Focus</Code>
                    </TableCell>
                    <TableCell>키보드로 버튼에 포커스하면 툴팁 표시</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>Mouseleave</Code>
                    </TableCell>
                    <TableCell>마우스가 버튼을 벗어나면 툴팁 숨김</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>Blur (Tab/Shift+Tab)</Code>
                    </TableCell>
                    <TableCell>포커스가 버튼에서 이동하면 툴팁 숨김</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>ESC</Code>
                    </TableCell>
                    <TableCell>
                      툴팁을 닫고 활성화 버튼으로 포커스 복원
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Subsection>

          {/* Accessibility */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="accessibility" title="접근성" />
            <Body>
              이 컴포넌트는 WCAG 2.1 / KWCAG 2.2 AA 기준을 준수하며 KRDS 2.2
              접근성 가이드라인을 충족합니다.
            </Body>

            <List variant="disc">
              <ListItem>
                <strong>aria-labelledby 자동 연결:</strong> 활성화 버튼과 툴팁
                콘텐츠를 ARIA로 자동 연결
              </ListItem>
              <ListItem>
                <strong>키보드 네비게이션:</strong> Tab 키로 포커스 이동,
                Shift+Tab으로 역방향 이동
              </ListItem>
              <ListItem>
                <strong>ESC 키 지원:</strong> ESC 키로 툴팁을 닫고 활성화
                버튼으로 포커스 복원
              </ListItem>
              <ListItem>
                <strong>충분한 명암비:</strong> 다크 배경(gray-900)과 흰색
                텍스트로 7:1 이상 명암비 보장
              </ListItem>
              <ListItem>
                <strong>WCAG 2.2 준수:</strong> 1.4.13 Content on Hover or Focus
                성공 기준 충족
              </ListItem>
            </List>
          </Subsection>

          {/* Foundation Layer */}
          <Subsection level="h2">
            <SectionHeading
              level="h2"
              id="foundation-layer"
              title="Foundation Layer"
            />
            <Body>
              HANUI Tooltip은 Foundation Layer의 자동화된 접근성 기능을
              제공합니다. 개발자가 별도로 ARIA 속성이나 이벤트 핸들러를 작성할
              필요 없이, 컴포넌트가 모든 접근성 기능을 자동으로 처리합니다.
            </Body>

            <Card variant="info">
              <List variant="check">
                <ListItem>
                  <strong>ARIA Automation:</strong> <Code>aria-labelledby</Code>{' '}
                  속성을 활성화 버튼에 자동 연결하고,{' '}
                  <Code>role="tooltip"</Code> 속성을 자동 적용합니다.
                </ListItem>
                <ListItem>
                  <strong>Focus Management:</strong> 마우스 호버와 키보드
                  포커스를 모두 감지하고, Blur 이벤트 자동 처리, ESC 키로 툴팁
                  닫기 후 활성화 버튼으로 포커스 자동 복원합니다.
                </ListItem>
                <ListItem>
                  <strong>Keyboard Navigation:</strong> Tab 키로 활성화 버튼에
                  포커스 시 툴팁 자동 표시, Shift+Tab으로 역방향 이동 시 툴팁
                  자동 숨김, ESC 키로 툴팁 닫기 및 포커스 복원합니다.
                </ListItem>
                <ListItem>
                  <strong>Event Cleanup:</strong> 컴포넌트 언마운트 시 모든
                  이벤트 리스너 자동 제거, 타이머 자동 정리로 메모리 누수
                  방지합니다.
                </ListItem>
              </List>
            </Card>
          </Subsection>
        </TabsContent>

        <TabsContent value="api">
          {/* API Reference */}
          <Subsection level="h2">
            <SectionHeading
              level="h2"
              id="api-reference"
              title="API Reference"
            />

            <Subsection level="h3">
              <SectionHeading level="h3" id="props" title="Props" />
              <Table>
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
                    <TableCell>
                      툴팁을 트리거할 활성화 버튼 요소 (필수)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>variant</Code>
                    </TableCell>
                    <TableCell>
                      <Code>"default" | "light"</Code>
                    </TableCell>
                    <TableCell>
                      <Code>"default"</Code>
                    </TableCell>
                    <TableCell>툴팁 스타일 변형</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>position</Code>
                    </TableCell>
                    <TableCell>
                      <Code>"top" | "right" | "bottom" | "left"</Code>
                    </TableCell>
                    <TableCell>
                      <Code>"top"</Code>
                    </TableCell>
                    <TableCell>툴팁 표시 위치</TableCell>
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
                    <TableCell>툴팁이 나타나기 전 지연 시간 (밀리초)</TableCell>
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
                    <TableCell>
                      <Code>undefined</Code>
                    </TableCell>
                    <TableCell>
                      툴팁 컨테이너에 적용할 추가 CSS 클래스
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>wrapperClassName</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>
                      <Code>undefined</Code>
                    </TableCell>
                    <TableCell>래퍼에 적용할 추가 CSS 클래스</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Subsection>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Tabs', href: '/components/tabs' }}
        next={{ title: 'Typography', href: '/components/typography' }}
      />
    </Section>
  );
}
