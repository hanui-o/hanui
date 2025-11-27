'use client';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
} from '@/components/content';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';

// UI components - from @hanui/react
import {
  Badge,
  NumberBadge,
  DotBadge,
  BadgeGroup,
  Button,
  Body,
  Code,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@hanui/react';
import { Bell, Check, Star, Mail, User } from 'lucide-react';

export default function BadgePage() {
  return (
    <>
      <Heading
        level="h1"
        title="Badge"
        description="상태, 카테고리, 알림 개수 등을 표시하는 작은 라벨 컴포넌트입니다."
      />

      {/* 기본 Badge */}
      <Section level="h2">
        <Heading level="h2" id="basic" title="기본 Badge" />
        <Body className="mb-4">
          상태나 카테고리를 표시하는 기본 뱃지입니다.
        </Body>
        <ComponentPreview>
          <div className="flex flex-wrap gap-2">
            <Badge>기본</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">성공</Badge>
            <Badge variant="warning">경고</Badge>
            <Badge variant="error">오류</Badge>
            <Badge variant="info">정보</Badge>
          </div>
        </ComponentPreview>
        <CodeBlock
          code={`<Badge>기본</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">성공</Badge>
<Badge variant="warning">경고</Badge>
<Badge variant="error">오류</Badge>
<Badge variant="info">정보</Badge>`}
          language="tsx"
        />
      </Section>

      {/* Outline Badge */}
      <Section level="h2">
        <Heading level="h2" id="outline" title="Outline Badge" />
        <Body className="mb-4">외곽선만 있는 뱃지입니다.</Body>
        <ComponentPreview>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Outline</Badge>
            <Badge variant="outline-primary">Primary Outline</Badge>
          </div>
        </ComponentPreview>
        <CodeBlock
          code={`<Badge variant="outline">Outline</Badge>
<Badge variant="outline-primary">Primary Outline</Badge>`}
          language="tsx"
        />
      </Section>

      {/* 크기 */}
      <Section level="h2">
        <Heading level="h2" id="size" title="크기" />
        <Body className="mb-4">
          뱃지는 sm, md, lg 세 가지 크기를 지원합니다.
        </Body>
        <ComponentPreview>
          <div className="flex flex-wrap items-center gap-2">
            <Badge size="sm" variant="primary">
              Small
            </Badge>
            <Badge size="md" variant="primary">
              Medium
            </Badge>
            <Badge size="lg" variant="primary">
              Large
            </Badge>
          </div>
        </ComponentPreview>
        <CodeBlock
          code={`<Badge size="sm" variant="primary">Small</Badge>
<Badge size="md" variant="primary">Medium</Badge>
<Badge size="lg" variant="primary">Large</Badge>`}
          language="tsx"
        />
      </Section>

      {/* 모양 */}
      <Section level="h2">
        <Heading level="h2" id="shape" title="모양" />
        <Body className="mb-4">
          rounded, pill, square 세 가지 모양을 지원합니다.
        </Body>
        <ComponentPreview>
          <div className="flex flex-wrap items-center gap-2">
            <Badge shape="rounded" variant="success">
              Rounded
            </Badge>
            <Badge shape="pill" variant="success">
              Pill
            </Badge>
            <Badge shape="square" variant="success">
              Square
            </Badge>
          </div>
        </ComponentPreview>
        <CodeBlock
          code={`<Badge shape="rounded" variant="success">Rounded</Badge>
<Badge shape="pill" variant="success">Pill</Badge>
<Badge shape="square" variant="success">Square</Badge>`}
          language="tsx"
        />
      </Section>

      {/* 아이콘 포함 */}
      <Section level="h2">
        <Heading level="h2" id="with-icon" title="아이콘 포함" />
        <Body className="mb-4">뱃지에 아이콘을 추가할 수 있습니다.</Body>
        <ComponentPreview>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="success" icon={<Check className="h-3 w-3" />}>
              완료
            </Badge>
            <Badge variant="warning" icon={<Star className="h-3 w-3" />}>
              즐겨찾기
            </Badge>
            <Badge
              variant="info"
              icon={<Mail className="h-3 w-3" />}
              iconPosition="right"
            >
              메일
            </Badge>
          </div>
        </ComponentPreview>
        <CodeBlock
          code={`import { Check, Star, Mail } from 'lucide-react';

<Badge variant="success" icon={<Check className="h-3 w-3" />}>
  완료
</Badge>
<Badge variant="warning" icon={<Star className="h-3 w-3" />}>
  즐겨찾기
</Badge>
<Badge
  variant="info"
  icon={<Mail className="h-3 w-3" />}
  iconPosition="right"
>
  메일
</Badge>`}
          language="tsx"
        />
      </Section>

      {/* NumberBadge */}
      <Section level="h2">
        <Heading level="h2" id="number-badge" title="NumberBadge" />
        <Body className="mb-4">
          알림 개수 등 숫자를 표시하는 뱃지입니다. max 값을 초과하면
          &quot;99+&quot;와 같이 표시됩니다.
        </Body>
        <ComponentPreview>
          <div className="flex flex-wrap items-center gap-4">
            <NumberBadge count={5} />
            <NumberBadge count={42} variant="primary" />
            <NumberBadge count={100} max={99} />
            <NumberBadge count={0} showZero />
            <NumberBadge count={8} size="sm" />
            <NumberBadge count={8} size="lg" />
          </div>
        </ComponentPreview>
        <CodeBlock
          code={`<NumberBadge count={5} />
<NumberBadge count={42} variant="primary" />
<NumberBadge count={100} max={99} />  {/* 99+로 표시 */}
<NumberBadge count={0} showZero />
<NumberBadge count={8} size="sm" />
<NumberBadge count={8} size="lg" />`}
          language="tsx"
        />
      </Section>

      {/* DotBadge */}
      <Section level="h2">
        <Heading level="h2" id="dot-badge" title="DotBadge" />
        <Body className="mb-4">새 알림이 있음을 표시하는 작은 점입니다.</Body>
        <ComponentPreview>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <DotBadge />
              <span className="text-sm">기본</span>
            </div>
            <div className="flex items-center gap-2">
              <DotBadge variant="success" />
              <span className="text-sm">성공</span>
            </div>
            <div className="flex items-center gap-2">
              <DotBadge variant="warning" pulse />
              <span className="text-sm">펄스</span>
            </div>
            <div className="flex items-center gap-2">
              <DotBadge size="lg" variant="primary" />
              <span className="text-sm">Large</span>
            </div>
          </div>
        </ComponentPreview>
        <CodeBlock
          code={`<DotBadge />
<DotBadge variant="success" />
<DotBadge variant="warning" pulse />
<DotBadge size="lg" variant="primary" />`}
          language="tsx"
        />
      </Section>

      {/* BadgeGroup */}
      <Section level="h2">
        <Heading level="h2" id="badge-group" title="BadgeGroup" />
        <Body className="mb-4">
          아이콘이나 버튼에 뱃지를 오버레이할 때 사용합니다.
        </Body>
        <ComponentPreview>
          <div className="flex flex-wrap items-center gap-8">
            {/* 아이콘 + NumberBadge */}
            <BadgeGroup>
              <div className="p-2 bg-krds-gray-10 rounded-full">
                <Bell className="h-6 w-6 text-krds-gray-70" />
              </div>
              <NumberBadge count={5} size="sm" />
            </BadgeGroup>

            {/* 아이콘 + DotBadge */}
            <BadgeGroup>
              <div className="p-2 bg-krds-gray-10 rounded-full">
                <Mail className="h-6 w-6 text-krds-gray-70" />
              </div>
              <DotBadge variant="error" pulse />
            </BadgeGroup>

            {/* 아바타 + NumberBadge */}
            <BadgeGroup>
              <div className="h-10 w-10 bg-krds-primary-20 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-krds-primary-base" />
              </div>
              <NumberBadge count={3} variant="primary" size="sm" />
            </BadgeGroup>

            {/* 다른 위치 */}
            <BadgeGroup position="bottom-right">
              <div className="p-2 bg-krds-gray-10 rounded-full">
                <Bell className="h-6 w-6 text-krds-gray-70" />
              </div>
              <DotBadge variant="success" />
            </BadgeGroup>
          </div>
        </ComponentPreview>
        <CodeBlock
          code={`import { Bell, Mail, User } from 'lucide-react';

{/* 아이콘 + NumberBadge */}
<BadgeGroup>
  <div className="p-2 bg-krds-gray-10 rounded-full">
    <Bell className="h-6 w-6 text-krds-gray-70" />
  </div>
  <NumberBadge count={5} size="sm" />
</BadgeGroup>

{/* 아이콘 + DotBadge */}
<BadgeGroup>
  <div className="p-2 bg-krds-gray-10 rounded-full">
    <Mail className="h-6 w-6 text-krds-gray-70" />
  </div>
  <DotBadge variant="error" pulse />
</BadgeGroup>

{/* 다른 위치 */}
<BadgeGroup position="bottom-right">
  <div className="p-2 bg-krds-gray-10 rounded-full">
    <Bell className="h-6 w-6 text-krds-gray-70" />
  </div>
  <DotBadge variant="success" />
</BadgeGroup>`}
          language="tsx"
        />
      </Section>

      {/* 활용 예시 */}
      <Section level="h2">
        <Heading level="h2" id="examples" title="활용 예시" />
        <Body className="mb-4">버튼과 함께 사용하는 예시입니다.</Body>
        <ComponentPreview>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="outline">
              알림
              <Badge variant="error" size="sm" shape="pill" className="ml-2">
                3
              </Badge>
            </Button>

            <Button variant="outline">
              <BadgeGroup>
                <Bell className="h-4 w-4 mr-2" />
                <DotBadge size="sm" />
              </BadgeGroup>
              알림
            </Button>

            <Button>
              메시지
              <Badge
                variant="outline"
                size="sm"
                className="ml-2 bg-white/20 border-white/50 text-white"
              >
                NEW
              </Badge>
            </Button>
          </div>
        </ComponentPreview>
        <CodeBlock
          code={`<Button variant="outline">
  알림
  <Badge variant="error" size="sm" shape="pill" className="ml-2">3</Badge>
</Button>

<Button variant="outline">
  <BadgeGroup>
    <Bell className="h-4 w-4 mr-2" />
    <DotBadge size="sm" />
  </BadgeGroup>
  알림
</Button>

<Button>
  메시지
  <Badge variant="outline" size="sm" className="ml-2 bg-white/20 border-white/50 text-white">
    NEW
  </Badge>
</Button>`}
          language="tsx"
        />
      </Section>

      {/* Props 테이블 */}
      <Section level="h2">
        <Heading level="h2" id="badge-props" title="Badge Props" />
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
                <Code>variant</Code>
              </TableCell>
              <TableCell>
                <Code>
                  &quot;default&quot; | &quot;primary&quot; |
                  &quot;secondary&quot; | &quot;success&quot; |
                  &quot;warning&quot; | &quot;error&quot; | &quot;info&quot; |
                  &quot;outline&quot; | &quot;outline-primary&quot;
                </Code>
              </TableCell>
              <TableCell>
                <Code>&quot;default&quot;</Code>
              </TableCell>
              <TableCell>뱃지 스타일</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>size</Code>
              </TableCell>
              <TableCell>
                <Code>&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</Code>
              </TableCell>
              <TableCell>
                <Code>&quot;md&quot;</Code>
              </TableCell>
              <TableCell>뱃지 크기</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>shape</Code>
              </TableCell>
              <TableCell>
                <Code>
                  &quot;rounded&quot; | &quot;pill&quot; | &quot;square&quot;
                </Code>
              </TableCell>
              <TableCell>
                <Code>&quot;rounded&quot;</Code>
              </TableCell>
              <TableCell>뱃지 모양</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>icon</Code>
              </TableCell>
              <TableCell>
                <Code>React.ReactNode</Code>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>아이콘</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>iconPosition</Code>
              </TableCell>
              <TableCell>
                <Code>&quot;left&quot; | &quot;right&quot;</Code>
              </TableCell>
              <TableCell>
                <Code>&quot;left&quot;</Code>
              </TableCell>
              <TableCell>아이콘 위치</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Section>

      <Section level="h2">
        <Heading level="h2" id="number-badge-props" title="NumberBadge Props" />
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
                <Code>count</Code>
              </TableCell>
              <TableCell>
                <Code>number</Code>
              </TableCell>
              <TableCell>필수</TableCell>
              <TableCell>표시할 숫자</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>max</Code>
              </TableCell>
              <TableCell>
                <Code>number</Code>
              </TableCell>
              <TableCell>
                <Code>99</Code>
              </TableCell>
              <TableCell>최대 표시 숫자 (초과 시 max+ 표시)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>showZero</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>
                <Code>false</Code>
              </TableCell>
              <TableCell>0일 때도 표시할지 여부</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Section>

      <Section level="h2">
        <Heading level="h2" id="dot-badge-props" title="DotBadge Props" />
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
                <Code>show</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>
                <Code>true</Code>
              </TableCell>
              <TableCell>표시 여부</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>pulse</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>
                <Code>false</Code>
              </TableCell>
              <TableCell>펄스 애니메이션</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Section>

      <Section level="h2">
        <Heading level="h2" id="badge-group-props" title="BadgeGroup Props" />
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
                <Code>position</Code>
              </TableCell>
              <TableCell>
                <Code>
                  &quot;top-right&quot; | &quot;top-left&quot; |
                  &quot;bottom-right&quot; | &quot;bottom-left&quot;
                </Code>
              </TableCell>
              <TableCell>
                <Code>&quot;top-right&quot;</Code>
              </TableCell>
              <TableCell>뱃지 위치</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Section>
    </>
  );
}
