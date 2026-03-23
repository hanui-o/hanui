'use client';

import { useState, useEffect } from 'react';

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
  Progress,
  CircularProgress,
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
import { ComponentPreview } from '@/components/content/ComponentPreview';

function AnimatedProgress() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setValue((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return <Progress value={value} showValue label="파일 업로드" />;
}

function ProgressDemo() {
  const [value, setValue] = useState(60);

  return (
    <div className="w-full max-w-md space-y-4">
      <Progress value={value} showValue label="진행률" />
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="tertiary"
          onClick={() => setValue(Math.max(0, value - 10))}
        >
          -10%
        </Button>
        <Button
          size="sm"
          variant="tertiary"
          onClick={() => setValue(Math.min(100, value + 10))}
        >
          +10%
        </Button>
        <Button size="sm" variant="tertiary" onClick={() => setValue(0)}>
          Reset
        </Button>
      </div>
    </div>
  );
}

export default function ProgressPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Progress"
        description="작업의 진행 상태를 시각적으로 표시하는 컴포넌트입니다."
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
              <div className="w-full max-w-md space-y-4">
                <Progress value={25} />
                <Progress value={50} />
                <Progress value={75} />
              </div>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<Progress value={25} />
<Progress value={50} />
<Progress value={75} />`}
            </Code>
          </Section>

          <Section level="h2">
            <Installation componentName="progress" />
          </Section>

          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { Progress } from '@/components/hanui/progress'

<Progress value={60} />
<Progress value={60} showValue label="진행률" />`}
            </Code>
          </Section>

          {/* 예제 섹션 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Interactive"
                description="버튼을 클릭하여 진행률을 조절할 수 있습니다."
              />
              <ComponentPreview>
                <ProgressDemo />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`const [value, setValue] = useState(60);

<Progress value={value} showValue label="진행률" />
<Button onClick={() => setValue(value + 10)}>+10%</Button>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Size"
                description="sm, md, lg, xl 4가지 크기를 지원합니다."
              />
              <ComponentPreview>
                <div className="w-full max-w-md space-y-4">
                  <Progress value={60} size="sm" label="Small" />
                  <Progress value={60} size="md" label="Medium" />
                  <Progress value={60} size="lg" label="Large" />
                  <Progress value={60} size="xl" label="Extra Large" />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Progress value={60} size="sm" />
<Progress value={60} size="md" />
<Progress value={60} size="lg" />
<Progress value={60} size="xl" />`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Variant"
                description="default, primary, success, warning, error 5가지 색상 변형을 지원합니다."
              />
              <ComponentPreview>
                <div className="w-full max-w-md space-y-4">
                  <Progress value={60} variant="default" label="Default" />
                  <Progress value={60} variant="primary" label="Primary" />
                  <Progress value={60} variant="success" label="Success" />
                  <Progress value={60} variant="warning" label="Warning" />
                  <Progress value={60} variant="error" label="Error" />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Progress value={60} variant="default" />
<Progress value={60} variant="primary" />
<Progress value={60} variant="success" />
<Progress value={60} variant="warning" />
<Progress value={60} variant="error" />`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Show Value"
                description="showValue prop을 사용하여 진행률 텍스트를 표시합니다. formatValue로 커스텀 포맷도 가능합니다."
              />
              <ComponentPreview>
                <div className="w-full max-w-md space-y-4">
                  <Progress value={45} showValue label="파일 업로드" />
                  <Progress
                    value={7}
                    max={10}
                    showValue
                    label="단계"
                    formatValue={(v, m) => `${v}/${m}`}
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Progress value={45} showValue label="파일 업로드" />
<Progress
  value={7}
  max={10}
  showValue
  label="단계"
  formatValue={(v, m) => \`\${v}/\${m}\`}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Indeterminate"
                description="value를 생략하면 불확정(indeterminate) 상태로 애니메이션이 반복됩니다."
              />
              <ComponentPreview>
                <div className="w-full max-w-md space-y-4">
                  <Progress label="로딩 중..." />
                  <Progress variant="success" />
                  <Progress variant="warning" size="lg" />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`// value를 생략하면 indeterminate 상태
<Progress label="로딩 중..." />
<Progress variant="success" />
<Progress variant="warning" size="lg" />`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Circular"
                description="원형 진행 표시기입니다. showValue로 중앙에 값을 표시할 수 있습니다."
              />
              <ComponentPreview>
                <div className="flex flex-wrap items-center gap-6">
                  <CircularProgress value={25} showValue />
                  <CircularProgress value={50} variant="success" showValue />
                  <CircularProgress value={75} variant="warning" showValue />
                  <CircularProgress value={100} variant="error" showValue />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<CircularProgress value={25} showValue />
<CircularProgress value={50} variant="success" showValue />
<CircularProgress value={75} variant="warning" showValue />
<CircularProgress value={100} variant="error" showValue />`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Circular Size"
                description="size와 strokeWidth prop으로 원의 크기와 선 두께를 조절할 수 있습니다."
              />
              <ComponentPreview>
                <div className="flex flex-wrap items-center gap-6">
                  <CircularProgress value={60} size={32} strokeWidth={3} />
                  <CircularProgress
                    value={60}
                    size={48}
                    strokeWidth={4}
                    showValue
                  />
                  <CircularProgress
                    value={60}
                    size={64}
                    strokeWidth={5}
                    showValue
                  />
                  <CircularProgress
                    value={60}
                    size={80}
                    strokeWidth={6}
                    showValue
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<CircularProgress value={60} size={32} strokeWidth={3} />
<CircularProgress value={60} size={48} strokeWidth={4} showValue />
<CircularProgress value={60} size={64} strokeWidth={5} showValue />
<CircularProgress value={60} size={80} strokeWidth={6} showValue />`}
              </Code>
            </Subsection>
          </Section>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="Progress Props" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>value</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number | null</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>진행률 (null/undefined: 불확정)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>max</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>100</TableCell>
                    <TableCell>최대값</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>size</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">'sm' | 'md' | 'lg' | 'xl'</Code>
                    </TableCell>
                    <TableCell>'md'</TableCell>
                    <TableCell>높이</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>variant</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'default' | 'primary' | 'success' | 'warning' | 'error'
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
                    <TableCell>-</TableCell>
                    <TableCell>레이블 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>showValue</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>진행률 텍스트 표시</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>formatValue</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">(v, max) =&gt; string</Code>
                    </TableCell>
                    <TableCell>percentage%</TableCell>
                    <TableCell>값 포맷 함수</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="CircularProgress Props" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>value</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number | null</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>진행률</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>size</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>48</TableCell>
                    <TableCell>원 크기 (px)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>strokeWidth</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>4</TableCell>
                    <TableCell>선 두께 (px)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>variant</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'default' | 'primary' | 'success' | 'warning' | 'error'
                      </Code>
                    </TableCell>
                    <TableCell>'primary'</TableCell>
                    <TableCell>색상 변형</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>showValue</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>중앙에 값 표시</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="접근성"
                description="Progress 컴포넌트는 Radix UI Progress primitive를 기반으로 ARIA 속성이 자동 적용됩니다."
              />
              <List>
                <ListItem>
                  <Code>role=&quot;progressbar&quot;</Code>: 진행률 표시기임을
                  명시
                </ListItem>
                <ListItem>
                  <Code>aria-valuenow</Code>: 현재 값
                </ListItem>
                <ListItem>
                  <Code>aria-valuemin</Code>: 최소값 (0)
                </ListItem>
                <ListItem>
                  <Code>aria-valuemax</Code>: 최대값 (기본 100)
                </ListItem>
                <ListItem>
                  <Code>aria-busy=&quot;true&quot;</Code>: 불확정 상태일 때
                </ListItem>
                <ListItem>
                  <Code>aria-label</Code>: 스크린리더용 레이블
                </ListItem>
              </List>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Pagination', href: '/components/pagination' }}
        next={{ title: 'Radio', href: '/components/radio' }}
      />
    </>
  );
}
