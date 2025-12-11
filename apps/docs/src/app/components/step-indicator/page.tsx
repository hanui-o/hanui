'use client';

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
  StepIndicator,
  useSteps,
  Steps,
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
import { useState } from 'react';

// 샘플 데이터
const sampleSteps = [
  { label: '약관 동의', description: '이용약관에 동의해주세요' },
  { label: '정보 입력', description: '기본 정보를 입력해주세요' },
  { label: '본인 인증', description: '본인 인증을 진행해주세요' },
  { label: '가입 완료' },
];

const simpleSteps = [
  { label: '시작' },
  { label: '진행 중' },
  { label: '검토' },
  { label: '완료' },
];

const compoundSteps = [
  { title: '약관 동의' },
  { title: '정보 입력' },
  { title: '본인 인증' },
  { title: '가입 완료' },
];

// Steps Compound Component 예제
function StepsExample() {
  const [step, setStep] = useState(1);

  return (
    <ComponentPreview>
      <Steps.Root
        step={step}
        onStepChange={(e) => setStep(e.step)}
        count={compoundSteps.length}
      >
        <Steps.List>
          {compoundSteps.map((s, i) => (
            <Steps.Item key={i} index={i}>
              <div className="flex items-center w-full">
                <Steps.Indicator />
                {i < compoundSteps.length - 1 && <Steps.Separator />}
              </div>
              <div className="mt-2">
                <span className="text-krds-gray-50 text-krds-body-xs hidden md:block">
                  {i + 1}단계
                </span>
                <Steps.Title>{s.title}</Steps.Title>
              </div>
            </Steps.Item>
          ))}
        </Steps.List>

        <div className="mt-6 p-4 bg-krds-gray-5 rounded-lg">
          <Steps.Content index={0}>
            <p className="text-krds-body-sm">
              이용약관 및 개인정보 처리방침에 동의해주세요.
            </p>
          </Steps.Content>
          <Steps.Content index={1}>
            <p className="text-krds-body-sm">
              이름, 이메일 등 기본 정보를 입력해주세요.
            </p>
          </Steps.Content>
          <Steps.Content index={2}>
            <p className="text-krds-body-sm">
              휴대폰 인증 또는 본인 인증을 진행합니다.
            </p>
          </Steps.Content>
          <Steps.Content index={3}>
            <p className="text-krds-body-sm">🎉 회원가입이 완료되었습니다!</p>
          </Steps.Content>
        </div>

        <div className="flex gap-2 mt-4 justify-center">
          <Steps.PrevTrigger asChild>
            <Button variant="secondary" size="sm">
              이전
            </Button>
          </Steps.PrevTrigger>
          <Steps.NextTrigger asChild>
            <Button size="sm">다음</Button>
          </Steps.NextTrigger>
        </div>
      </Steps.Root>
    </ComponentPreview>
  );
}

export default function StepIndicatorPage() {
  const stepper = useSteps({ count: sampleSteps.length, initialStep: 0 });

  return (
    <>
      <Heading
        level="h1"
        title="Step Indicator"
        description="사용자가 거쳐야 하는 일련의 단계를 시각화하는 컴포넌트입니다. 회원가입, 결제 등 다단계 프로세스에서 현재 위치를 안내합니다."
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
            <ComponentPreview>
              <Stack gap="md" className="w-full">
                <StepIndicator steps={sampleSteps} {...stepper.bind} />
                <div className="flex gap-2 justify-center">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={stepper.prev}
                    disabled={stepper.isFirst}
                  >
                    이전
                  </Button>
                  <Button
                    size="sm"
                    onClick={stepper.next}
                    disabled={stepper.isLast}
                  >
                    다음
                  </Button>
                </div>
              </Stack>
            </ComponentPreview>

            <Code variant="block" language="tsx">
              {`import { StepIndicator, useSteps, Button } from '@hanui/react';

const steps = [
  { label: '약관 동의', description: '이용약관에 동의해주세요' },
  { label: '정보 입력', description: '기본 정보를 입력해주세요' },
  { label: '본인 인증', description: '본인 인증을 진행해주세요' },
  { label: '가입 완료' },
];

const stepper = useSteps({ count: steps.length });

<StepIndicator steps={steps} {...stepper.bind} />

<Button onClick={stepper.prev} disabled={stepper.isFirst}>이전</Button>
<Button onClick={stepper.next} disabled={stepper.isLast}>다음</Button>`}
            </Code>
          </Section>

          {/* 설치 */}
          <Section level="h2">
            <Installation componentName="step-indicator" />
          </Section>

          {/* 사용법 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="usage"
              title="사용법"
              description="steps 배열과 currentStep 인덱스를 전달합니다. 인덱스는 0부터 시작합니다."
            />

            <Code variant="block" language="tsx">
              {`import { StepIndicator } from '@hanui/react';

const steps = [
  { label: '1단계' },
  { label: '2단계' },
  { label: '3단계' },
];

// currentStep: 0 = 첫 번째 단계, 1 = 두 번째 단계...
<StepIndicator steps={steps} currentStep={1} />`}
            </Code>
          </Section>

          {/* 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading
                level="h3"
                title="수직 방향"
                description="orientation='vertical'로 수직 레이아웃을 사용합니다."
              />
              <ComponentPreview>
                <StepIndicator
                  steps={simpleSteps}
                  currentStep={1}
                  orientation="vertical"
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<StepIndicator
  steps={steps}
  currentStep={1}
  orientation="vertical"
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="크기"
                description="size prop으로 크기를 조절합니다: sm, md(기본), lg"
              />
              <ComponentPreview>
                <Stack gap="lg" className="w-full">
                  <StepIndicator
                    steps={simpleSteps}
                    currentStep={1}
                    size="sm"
                  />
                  <StepIndicator
                    steps={simpleSteps}
                    currentStep={1}
                    size="md"
                  />
                  <StepIndicator
                    steps={simpleSteps}
                    currentStep={1}
                    size="lg"
                  />
                </Stack>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<StepIndicator steps={steps} currentStep={1} size="sm" />
<StepIndicator steps={steps} currentStep={1} size="md" />
<StepIndicator steps={steps} currentStep={1} size="lg" />`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="useSteps 훅"
                description="useSteps 훅으로 상태 관리를 간편하게 처리할 수 있습니다. 버튼과 함께 사용하면 단계 간 이동이 가능합니다."
              />
              <Code variant="block" language="tsx">
                {`import { StepIndicator, useSteps, Button } from '@hanui/react';

const stepper = useSteps({ count: steps.length });

// stepper.bind는 currentStep, onStepClick, clickable을 포함
<StepIndicator steps={steps} {...stepper.bind} />

// 이전/다음 버튼
<Button onClick={stepper.prev} disabled={stepper.isFirst}>이전</Button>
<Button onClick={stepper.next} disabled={stepper.isLast}>다음</Button>

// 기타 유용한 속성
stepper.goTo(2);       // 특정 단계로 이동
stepper.reset();       // 초기 상태로 리셋
stepper.isCompleted(0) // 해당 단계 완료 여부`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="체크 아이콘 숨김"
                description="showCheckIcon={false}로 완료 단계에서 숫자를 유지합니다."
              />
              <ComponentPreview>
                <StepIndicator
                  steps={simpleSteps}
                  currentStep={2}
                  showCheckIcon={false}
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<StepIndicator
  steps={steps}
  currentStep={2}
  showCheckIcon={false}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Steps (Compound Component)"
                description="Chakra UI 스타일의 유연한 Compound Component 패턴입니다. 버튼 위치를 자유롭게 커스텀할 수 있습니다."
              />
              <StepsExample />
              <Code variant="block" language="tsx">
                {`import { Steps, Button } from '@hanui/react';
import { useState } from 'react';

const [step, setStep] = useState(0);

const steps = [
  { title: '약관 동의' },
  { title: '정보 입력' },
  { title: '본인 인증' },
  { title: '가입 완료' },
];

<Steps.Root
  step={step}
  onStepChange={(e) => setStep(e.step)}
  count={steps.length}
>
  <Steps.List>
    {steps.map((s, i) => (
      <Steps.Item key={i} index={i}>
        <Steps.Indicator />
        <Steps.Title>{s.title}</Steps.Title>
        {i < steps.length - 1 && <Steps.Separator />}
      </Steps.Item>
    ))}
  </Steps.List>

  <Steps.Content index={0}>1단계 내용...</Steps.Content>
  <Steps.Content index={1}>2단계 내용...</Steps.Content>
  <Steps.Content index={2}>3단계 내용...</Steps.Content>
  <Steps.Content index={3}>4단계 내용...</Steps.Content>

  <div className="flex gap-2 mt-4">
    <Steps.PrevTrigger asChild>
      <Button variant="secondary" size="sm">이전</Button>
    </Steps.PrevTrigger>
    <Steps.NextTrigger asChild>
      <Button size="sm">다음</Button>
    </Steps.NextTrigger>
  </div>
</Steps.Root>`}
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
                      <Code>Tab</Code>
                    </TableCell>
                    <TableCell>클릭 가능한 단계로 포커스 이동</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>Enter</Code> / <Code>Space</Code>
                    </TableCell>
                    <TableCell>해당 단계로 이동 (clickable일 때)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="ARIA 속성" />
              <List>
                <ListItem>
                  <Code>&lt;ol&gt;</Code> 요소로 순서 있는 목록 구현
                </ListItem>
                <ListItem>
                  <Code>aria-label=&quot;진행 단계&quot;</Code>로 목록 설명
                </ListItem>
                <ListItem>
                  현재 단계에 <Code>aria-current=&quot;step&quot;</Code> 적용
                </ListItem>
                <ListItem>
                  스크린리더용 &quot;현재단계&quot; 텍스트 (sr-only)
                </ListItem>
                <ListItem>
                  클릭 가능 단계는 <Code>&lt;button&gt;</Code>으로 구현
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
              <Heading level="h3" title="StepIndicator Props" />
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
                      <Code>steps</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-krds-body-xs">StepItem[]</Code>
                    </TableCell>
                    <TableCell>필수</TableCell>
                    <TableCell>단계 목록</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>currentStep</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-krds-body-xs">number</Code>
                    </TableCell>
                    <TableCell>필수</TableCell>
                    <TableCell>현재 단계 인덱스 (0부터 시작)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>orientation</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-krds-body-xs">
                        &quot;horizontal&quot; | &quot;vertical&quot;
                      </Code>
                    </TableCell>
                    <TableCell>&quot;horizontal&quot;</TableCell>
                    <TableCell>레이아웃 방향</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>size</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-krds-body-xs">
                        &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;
                      </Code>
                    </TableCell>
                    <TableCell>&quot;md&quot;</TableCell>
                    <TableCell>크기</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>clickable</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-krds-body-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>완료된 단계 클릭 가능 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>onStepClick</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-krds-body-xs">
                        (index: number) =&gt; void
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>단계 클릭 핸들러</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>showCheckIcon</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-krds-body-xs">boolean</Code>
                    </TableCell>
                    <TableCell>true</TableCell>
                    <TableCell>완료 단계 체크 아이콘 표시</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="StepItem" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Required</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>label</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-krds-body-xs">string</Code>
                    </TableCell>
                    <TableCell>필수</TableCell>
                    <TableCell>단계 레이블</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>description</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-krds-body-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>단계 설명</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>optional</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-krds-body-xs">boolean</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>선택적 단계 여부</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="useSteps 훅"
                description="Step Indicator 상태 관리를 위한 훅"
              />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Option</TableHead>
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
                      <Code className="text-krds-body-xs">number</Code>
                    </TableCell>
                    <TableCell>필수</TableCell>
                    <TableCell>총 단계 수</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>initialStep</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-krds-body-xs">number</Code>
                    </TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>초기 단계 인덱스</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="useSteps 반환값" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>currentStep</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-krds-body-xs">number</Code>
                    </TableCell>
                    <TableCell>현재 단계 인덱스</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>goTo</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-krds-body-xs">
                        (step: number) =&gt; void
                      </Code>
                    </TableCell>
                    <TableCell>특정 단계로 이동</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>next</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-krds-body-xs">() =&gt; void</Code>
                    </TableCell>
                    <TableCell>다음 단계로 이동</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>prev</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-krds-body-xs">() =&gt; void</Code>
                    </TableCell>
                    <TableCell>이전 단계로 이동</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>isFirst</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-krds-body-xs">boolean</Code>
                    </TableCell>
                    <TableCell>첫 번째 단계 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>isLast</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-krds-body-xs">boolean</Code>
                    </TableCell>
                    <TableCell>마지막 단계 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>reset</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-krds-body-xs">() =&gt; void</Code>
                    </TableCell>
                    <TableCell>초기 단계로 리셋</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>bind</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-krds-body-xs">object</Code>
                    </TableCell>
                    <TableCell>StepIndicator에 전달할 props</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Stack', href: '/components/stack' }}
        next={{ title: 'Switch', href: '/components/switch' }}
      />
    </>
  );
}
