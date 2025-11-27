'use client';

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
  Badge,
  NumberBadge,
  DotBadge,
  BadgeGroup,
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
import { Bell, Check, Star, Mail, User } from 'lucide-react';

export default function BadgePage() {
  return (
    <>
      <Heading
        level="h1"
        title="Badge"
        description="상태, 카테고리, 알림 개수 등을 표시하는 작은 라벨 컴포넌트입니다."
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
              description="Badge는 상태, 카테고리, 알림 개수를 표시하는 컴포넌트입니다. Badge, NumberBadge, DotBadge, BadgeGroup 네 가지 종류를 제공합니다."
              className="sr-only"
            />
            <ComponentPreview>
              <div className="flex flex-wrap gap-2">
                <Badge>기본</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">성공</Badge>
                <Badge variant="warning">경고</Badge>
                <Badge variant="error">오류</Badge>
              </div>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<Badge>기본</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">성공</Badge>
<Badge variant="warning">경고</Badge>
<Badge variant="error">오류</Badge>`}
            </Code>
          </Section>

          {/* 2. 설치 */}
          <Section level="h2">
            <Installation componentName="badge" />
          </Section>

          {/* 3. 사용법 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="usage"
              title="사용법"
              description="Badge, NumberBadge, DotBadge를 import하여 사용합니다. BadgeGroup으로 아이콘에 뱃지를 오버레이할 수 있습니다."
            />
            <Code variant="block" language="tsx">
              {`import { Badge, NumberBadge, DotBadge, BadgeGroup } from '@hanui/react'

<Badge variant="success">완료</Badge>
<NumberBadge count={5} />
<DotBadge variant="error" pulse />`}
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
                description="default, primary, secondary, success, warning, error, info 등 다양한 유형을 지원합니다."
              />
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
              <Code variant="block" language="tsx">
                {`<Badge>기본</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">성공</Badge>
<Badge variant="warning">경고</Badge>
<Badge variant="error">오류</Badge>
<Badge variant="info">정보</Badge>`}
              </Code>
            </Subsection>

            {/* 아웃라인 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="아웃라인"
                description="테두리만 있는 아웃라인 스타일을 지원합니다."
              />
              <ComponentPreview>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="outline-primary">Primary Outline</Badge>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Badge variant="outline">Outline</Badge>
<Badge variant="outline-primary">Primary Outline</Badge>`}
              </Code>
            </Subsection>

            {/* 크기 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="크기"
                description="sm, md, lg 세 가지 크기를 지원합니다. 기본값은 md입니다."
              />
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
              <Code variant="block" language="tsx">
                {`<Badge size="sm" variant="primary">Small</Badge>
<Badge size="md" variant="primary">Medium</Badge>
<Badge size="lg" variant="primary">Large</Badge>`}
              </Code>
            </Subsection>

            {/* 모양 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="모양"
                description="rounded(기본), pill(둥근), square(직각) 세 가지 모양을 지원합니다."
              />
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
              <Code variant="block" language="tsx">
                {`<Badge shape="rounded" variant="success">Rounded</Badge>
<Badge shape="pill" variant="success">Pill</Badge>
<Badge shape="square" variant="success">Square</Badge>`}
              </Code>
            </Subsection>

            {/* 아이콘 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="아이콘"
                description="icon prop으로 아이콘을 추가하고, iconPosition으로 위치를 지정할 수 있습니다."
              />
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
              <Code variant="block" language="tsx">
                {`import { Check, Star, Mail } from 'lucide-react';

<Badge variant="success" icon={<Check className="h-3 w-3" />}>완료</Badge>
<Badge variant="warning" icon={<Star className="h-3 w-3" />}>즐겨찾기</Badge>
<Badge variant="info" icon={<Mail className="h-3 w-3" />} iconPosition="right">메일</Badge>`}
              </Code>
            </Subsection>

            {/* 숫자 뱃지 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="숫자 뱃지 (NumberBadge)"
                description="알림 개수 등 숫자를 표시합니다. max prop으로 최대 표시 숫자를 제한할 수 있습니다."
              />
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
              <Code variant="block" language="tsx">
                {`<NumberBadge count={5} />
<NumberBadge count={42} variant="primary" />
<NumberBadge count={100} max={99} />  {/* 99+로 표시 */}
<NumberBadge count={0} showZero />
<NumberBadge count={8} size="sm" />
<NumberBadge count={8} size="lg" />`}
              </Code>
            </Subsection>

            {/* 도트 뱃지 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="도트 뱃지 (DotBadge)"
                description="새로운 알림이 있음을 표시하는 작은 점입니다. pulse prop으로 애니메이션을 추가할 수 있습니다."
              />
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
              <Code variant="block" language="tsx">
                {`<DotBadge />
<DotBadge variant="success" />
<DotBadge variant="warning" pulse />
<DotBadge size="lg" variant="primary" />`}
              </Code>
            </Subsection>

            {/* 뱃지 그룹 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="뱃지 그룹 (BadgeGroup)"
                description="아이콘이나 아바타에 뱃지를 오버레이합니다. position prop으로 위치를 지정할 수 있습니다."
              />
              <ComponentPreview>
                <div className="flex flex-wrap items-center gap-8">
                  <BadgeGroup>
                    <div className="p-2 bg-krds-gray-10 rounded-full">
                      <Bell className="h-6 w-6 text-krds-gray-70" />
                    </div>
                    <NumberBadge count={5} size="sm" />
                  </BadgeGroup>

                  <BadgeGroup>
                    <div className="p-2 bg-krds-gray-10 rounded-full">
                      <Mail className="h-6 w-6 text-krds-gray-70" />
                    </div>
                    <DotBadge variant="error" pulse />
                  </BadgeGroup>

                  <BadgeGroup>
                    <div className="h-10 w-10 bg-krds-primary-20 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-krds-primary-base" />
                    </div>
                    <NumberBadge count={3} variant="primary" size="sm" />
                  </BadgeGroup>

                  <BadgeGroup position="bottom-right">
                    <div className="p-2 bg-krds-gray-10 rounded-full">
                      <Bell className="h-6 w-6 text-krds-gray-70" />
                    </div>
                    <DotBadge variant="success" />
                  </BadgeGroup>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`import { Bell, Mail, User } from 'lucide-react';

<BadgeGroup>
  <div className="p-2 bg-krds-gray-10 rounded-full">
    <Bell className="h-6 w-6 text-krds-gray-70" />
  </div>
  <NumberBadge count={5} size="sm" />
</BadgeGroup>

<BadgeGroup>
  <div className="p-2 bg-krds-gray-10 rounded-full">
    <Mail className="h-6 w-6 text-krds-gray-70" />
  </div>
  <DotBadge variant="error" pulse />
</BadgeGroup>

<BadgeGroup position="bottom-right">
  <div className="p-2 bg-krds-gray-10 rounded-full">
    <Bell className="h-6 w-6 text-krds-gray-70" />
  </div>
  <DotBadge variant="success" />
</BadgeGroup>`}
              </Code>
            </Subsection>
          </Section>

          {/* 5. 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="Badge는 WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다."
            />
            <List variant="check">
              <ListItem>
                <strong>장식적 아이콘:</strong> Badge 내 아이콘은
                aria-hidden=&quot;true&quot;로 스크린리더가 무시합니다.
              </ListItem>
              <ListItem>
                <strong>NumberBadge:</strong> aria-label로 숫자 정보를
                제공합니다 (예: &quot;5개&quot;).
              </ListItem>
              <ListItem>
                <strong>DotBadge:</strong> 순수하게 장식적이므로
                aria-hidden=&quot;true&quot;가 적용됩니다.
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
              <Heading level="h3" title="Badge Props" />
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
                        'default' | 'primary' | 'secondary' | 'success' |
                        'warning' | 'error' | 'info' | 'outline' |
                        'outline-primary'
                      </Code>
                    </TableCell>
                    <TableCell>'default'</TableCell>
                    <TableCell>뱃지 스타일</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>size</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">'sm' | 'md' | 'lg'</Code>
                    </TableCell>
                    <TableCell>'md'</TableCell>
                    <TableCell>뱃지 크기</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>shape</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'rounded' | 'pill' | 'square'
                      </Code>
                    </TableCell>
                    <TableCell>'rounded'</TableCell>
                    <TableCell>뱃지 모양</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>icon</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">React.ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>아이콘</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>iconPosition</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">'left' | 'right'</Code>
                    </TableCell>
                    <TableCell>'left'</TableCell>
                    <TableCell>아이콘 위치</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="NumberBadge Props" />
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
                      <Code>count</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>필수</TableCell>
                    <TableCell>표시할 숫자</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>max</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>99</TableCell>
                    <TableCell>최대 표시 숫자 (초과 시 max+ 표시)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>showZero</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>0일 때도 표시할지 여부</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="DotBadge Props" />
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
                      <Code>pulse</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>펄스 애니메이션</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="BadgeGroup Props" />
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
                      <Code>position</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'top-right' | 'top-left' | 'bottom-right' |
                        'bottom-left'
                      </Code>
                    </TableCell>
                    <TableCell>'top-right'</TableCell>
                    <TableCell>뱃지 위치</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'AlertDialog', href: '/components/alert-dialog' }}
        next={{ title: 'Breadcrumb', href: '/components/breadcrumb' }}
      />
    </>
  );
}
