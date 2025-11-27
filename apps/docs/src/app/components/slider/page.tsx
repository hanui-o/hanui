'use client';

import { useState } from 'react';
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';
import { ComponentPreview } from '@/components/content/ComponentPreview';

import {
  Slider,
  Body,
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

export default function SliderPage() {
  const [value1, setValue1] = useState<number>(50);
  const [value2, setValue2] = useState<number>(30);
  const [rangeValue, setRangeValue] = useState<number[]>([20, 80]);
  const [stepValue, setStepValue] = useState<number>(50);

  return (
    <>
      <Heading
        level="h1"
        title="Slider"
        description="범위 내에서 값을 선택할 수 있는 슬라이더 컴포넌트입니다. 단일 값 또는 범위 선택을 지원합니다."
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
            <Body className="mb-3">
              Slider는 Radix UI를 기반으로 구축되어 완전한 키보드 접근성과 ARIA
              속성을 자동으로 지원합니다. 볼륨, 밝기, 가격 범위 등 다양한 값
              선택에 활용됩니다.
            </Body>
            <ComponentPreview>
              <div className="w-full max-w-md">
                <Slider
                  value={value1}
                  onValueChange={(v) => setValue1(v as number)}
                  showValue
                  label="볼륨"
                />
              </div>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`const [value, setValue] = useState(50);

<Slider
  value={value}
  onValueChange={setValue}
  showValue
  label="볼륨"
/>`}
            </Code>
          </Section>

          {/* 2. 설치 */}
          <Section level="h2">
            <Installation componentName="slider" />
          </Section>

          {/* 3. 사용법 */}
          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Body className="mb-3">
              Slider 컴포넌트를 import하여 사용합니다. value와 onValueChange로
              제어하거나 defaultValue로 비제어 모드로 사용합니다.
            </Body>
            <Code variant="block" language="tsx">
              {`import { Slider } from '@hanui/react';

// 제어 컴포넌트
const [value, setValue] = useState(50);
<Slider value={value} onValueChange={setValue} />

// 비제어 컴포넌트
<Slider defaultValue={50} />

// 범위 선택
const [range, setRange] = useState([20, 80]);
<Slider value={range} onValueChange={setRange} />`}
            </Code>
          </Section>

          {/* 4. 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            {/* 크기 */}
            <Subsection level="h3">
              <Heading level="h3" title="크기" />
              <Body className="mb-3">
                sm, md, lg 세 가지 크기를 지원합니다. 기본값은 md입니다.
              </Body>
              <ComponentPreview>
                <div className="w-full max-w-md space-y-6">
                  <Slider defaultValue={30} size="sm" label="Small" showValue />
                  <Slider
                    defaultValue={50}
                    size="md"
                    label="Medium"
                    showValue
                  />
                  <Slider defaultValue={70} size="lg" label="Large" showValue />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Slider defaultValue={30} size="sm" label="Small" showValue />
<Slider defaultValue={50} size="md" label="Medium" showValue />
<Slider defaultValue={70} size="lg" label="Large" showValue />`}
              </Code>
            </Subsection>

            {/* 색상 */}
            <Subsection level="h3">
              <Heading level="h3" title="색상" />
              <Body className="mb-3">
                primary, secondary, success, danger 네 가지 색상을 지원합니다.
              </Body>
              <ComponentPreview>
                <div className="w-full max-w-md space-y-6">
                  <Slider
                    defaultValue={50}
                    color="primary"
                    label="Primary"
                    showValue
                  />
                  <Slider
                    defaultValue={50}
                    color="secondary"
                    label="Secondary"
                    showValue
                  />
                  <Slider
                    defaultValue={50}
                    color="success"
                    label="Success"
                    showValue
                  />
                  <Slider
                    defaultValue={50}
                    color="danger"
                    label="Danger"
                    showValue
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Slider defaultValue={50} color="primary" label="Primary" showValue />
<Slider defaultValue={50} color="secondary" label="Secondary" showValue />
<Slider defaultValue={50} color="success" label="Success" showValue />
<Slider defaultValue={50} color="danger" label="Danger" showValue />`}
              </Code>
            </Subsection>

            {/* 범위 선택 */}
            <Subsection level="h3">
              <Heading level="h3" title="범위 선택" />
              <Body className="mb-3">
                배열 값을 사용하여 시작과 끝 두 지점의 범위를 선택할 수
                있습니다.
              </Body>
              <ComponentPreview>
                <div className="w-full max-w-md">
                  <Slider
                    value={rangeValue}
                    onValueChange={(v) => setRangeValue(v as number[])}
                    showValue
                    label="가격 범위"
                    formatValue={(v) => `${v.toLocaleString()}원`}
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`const [range, setRange] = useState([20, 80]);

<Slider
  value={range}
  onValueChange={setRange}
  showValue
  label="가격 범위"
  formatValue={(v) => \`\${v.toLocaleString()}원\`}
/>`}
              </Code>
            </Subsection>

            {/* 값 포맷팅 */}
            <Subsection level="h3">
              <Heading level="h3" title="값 포맷팅" />
              <Body className="mb-3">
                formatValue prop으로 표시되는 값을 커스텀 포맷할 수 있습니다.
              </Body>
              <ComponentPreview>
                <div className="w-full max-w-md">
                  <Slider
                    value={value2}
                    onValueChange={(v) => setValue2(v as number)}
                    showValue
                    label="할인율"
                    formatValue={(v) => `${v}%`}
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Slider
  value={value}
  onValueChange={setValue}
  showValue
  label="할인율"
  formatValue={(v) => \`\${v}%\`}
/>`}
              </Code>
            </Subsection>

            {/* 단계 설정 */}
            <Subsection level="h3">
              <Heading level="h3" title="단계 설정" />
              <Body className="mb-3">
                step prop으로 값의 증가 단위를 설정합니다. 기본값은 1입니다.
              </Body>
              <ComponentPreview>
                <div className="w-full max-w-md">
                  <Slider
                    value={stepValue}
                    onValueChange={(v) => setStepValue(v as number)}
                    step={10}
                    showValue
                    label="10 단위 조절"
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Slider
  value={value}
  onValueChange={setValue}
  step={10}
  showValue
  label="10 단위 조절"
/>`}
              </Code>
            </Subsection>

            {/* 비활성화 */}
            <Subsection level="h3">
              <Heading level="h3" title="비활성화" />
              <Body className="mb-3">
                disabled prop으로 슬라이더를 비활성화합니다.
              </Body>
              <ComponentPreview>
                <div className="w-full max-w-md">
                  <Slider
                    defaultValue={50}
                    disabled
                    showValue
                    label="비활성화됨"
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Slider defaultValue={50} disabled showValue label="비활성화됨" />`}
              </Code>
            </Subsection>
          </Section>

          {/* 5. 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="Slider는 WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다."
            />
            <List variant="check">
              <ListItem>
                <strong>Radix UI 기반:</strong> role=&quot;slider&quot;가 자동
                적용되고 aria-valuenow, aria-valuemin, aria-valuemax가 자동으로
                설정됩니다.
              </ListItem>
              <ListItem>
                <strong>키보드 네비게이션:</strong> 좌/우 화살표로 값을
                조절하고, Home/End로 최소/최대값으로 이동합니다.
              </ListItem>
              <ListItem>
                <strong>포커스 표시:</strong> focus-visible 시 링 스타일로
                명확한 시각적 피드백을 제공합니다.
              </ListItem>
              <ListItem>
                <strong>레이블 연결:</strong> label prop과 aria-labelledby로
                스크린 리더가 목적을 인식할 수 있습니다.
              </ListItem>
              <ListItem>
                명도 대비 4.5:1 이상을 준수하여 시각적 접근성을 보장합니다.
              </ListItem>
            </List>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API Reference" />

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
                    <TableCell>
                      <Code>value</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number | number[]</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>현재 값 (제어 컴포넌트)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>defaultValue</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number | number[]</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">min</Code>
                    </TableCell>
                    <TableCell>기본 값 (비제어 컴포넌트)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>onValueChange</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        (value: number | number[]) =&gt; void
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>값 변경 시 호출되는 콜백</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>min</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">0</Code>
                    </TableCell>
                    <TableCell>최소값</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>max</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">100</Code>
                    </TableCell>
                    <TableCell>최대값</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>step</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">1</Code>
                    </TableCell>
                    <TableCell>증가 단위</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>size</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        &apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">&apos;md&apos;</Code>
                    </TableCell>
                    <TableCell>크기</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>color</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        &apos;primary&apos; | &apos;secondary&apos; |
                        &apos;success&apos; | &apos;danger&apos;
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">&apos;primary&apos;</Code>
                    </TableCell>
                    <TableCell>색상</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>showValue</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">false</Code>
                    </TableCell>
                    <TableCell>값 표시 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>formatValue</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        (value: number) =&gt; string
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>값 표시 포맷 함수</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>label</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>슬라이더 라벨</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>disabled</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">false</Code>
                    </TableCell>
                    <TableCell>비활성화 상태</TableCell>
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
                      <Code>←</Code> / <Code>→</Code>
                    </TableCell>
                    <TableCell>값을 step만큼 감소/증가</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>Home</Code>
                    </TableCell>
                    <TableCell>최소값으로 이동</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>End</Code>
                    </TableCell>
                    <TableCell>최대값으로 이동</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>Page Up</Code> / <Code>Page Down</Code>
                    </TableCell>
                    <TableCell>값을 큰 단위로 증가/감소</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Skeleton', href: '/components/skeleton' }}
        next={{ title: 'Spinner', href: '/components/spinner' }}
      />
    </>
  );
}
