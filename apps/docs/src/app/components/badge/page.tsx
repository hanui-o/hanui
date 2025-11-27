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
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
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

          <Section level="h2">
            <Installation componentName="badge" />
          </Section>

          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { Badge, NumberBadge, DotBadge, BadgeGroup } from '@hanui/react'

<Badge variant="success">완료</Badge>
<NumberBadge count={5} />
<DotBadge variant="error" pulse />`}
            </Code>
          </Section>

          {/* 예제 섹션 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading level="h3" title="Variant" />
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

            <Subsection level="h3">
              <Heading level="h3" title="Outline" />
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

            <Subsection level="h3">
              <Heading level="h3" title="Size" />
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

            <Subsection level="h3">
              <Heading level="h3" title="Shape" />
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

            <Subsection level="h3">
              <Heading level="h3" title="Icon" />
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

            <Subsection level="h3">
              <Heading level="h3" title="NumberBadge" />
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

            <Subsection level="h3">
              <Heading level="h3" title="DotBadge" />
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

            <Subsection level="h3">
              <Heading level="h3" title="BadgeGroup" />
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
