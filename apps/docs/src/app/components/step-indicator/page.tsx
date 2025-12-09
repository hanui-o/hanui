'use client';

import { useState } from 'react';

// Docs layout
import {
  PageSection as Section,
  Heading,
  Subsection,
} from '@/components/content';

// Docs helper
import { PreviewBox } from '@/components/helpers';

// UI Components
import {
  StepIndicator,
  SAMPLE_STEPS,
  Button,
  Stack,
  Body,
  Code,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@hanui/react';
import type { StepItem } from '@hanui/react';

// ============================================================================
// 샘플 데이터
// ============================================================================

const basicSteps: StepItem[] = [
  { label: '약관 동의' },
  { label: '정보 입력' },
  { label: '본인 인증' },
  { label: '가입 완료' },
];

const detailedSteps: StepItem[] = [
  { label: '약관 동의', description: '이용약관에 동의해주세요' },
  { label: '정보 입력', description: '기본 정보를 입력해주세요' },
  { label: '본인 인증', description: '본인 인증을 진행해주세요' },
  { label: '가입 완료' },
];

const optionalSteps: StepItem[] = [
  { label: '필수 단계 1' },
  { label: '필수 단계 2' },
  { label: '선택 단계', optional: true },
  { label: '완료' },
];

// ============================================================================
// 페이지 컴포넌트
// ============================================================================

export default function StepIndicatorPage() {
  const [currentStep, setCurrentStep] = useState(2);
  const [interactiveStep, setInteractiveStep] = useState(0);

  const handleNext = () => {
    if (interactiveStep < basicSteps.length - 1) {
      setInteractiveStep(interactiveStep + 1);
    }
  };

  const handlePrev = () => {
    if (interactiveStep > 0) {
      setInteractiveStep(interactiveStep - 1);
    }
  };

  return (
    <>
      {/* 헤더 */}
      <Heading
        level="h1"
        title="Step Indicator"
        description="사용자가 거쳐야 하는 일련의 단계를 시각화하여 진행 상태에 대한 피드백을 제공합니다."
      />

      {/* 개요 */}
      <Section>
        <Heading level="h2" title="개요" id="overview" />
        <Body>
          단계 표시기(Step Indicator)는 회원가입, 결제, 신청서 작성 등 여러
          단계를 거쳐야 하는 프로세스에서 사용자의 현재 위치와 진행 상황을
          시각적으로 보여줍니다.
        </Body>
        <PreviewBox>
          <StepIndicator steps={basicSteps} currentStep={1} />
        </PreviewBox>
      </Section>

      {/* 설치 */}
      <Section>
        <Heading level="h2" title="설치" id="installation" />
        <Code variant="block" language="bash" showLineNumbers={false}>
          {`npm install @hanui/react`}
        </Code>
      </Section>

      {/* Import */}
      <Section>
        <Heading level="h2" title="Import" id="import" />
        <Code variant="block" language="typescript" showLineNumbers={false}>
          {`import { StepIndicator } from '@hanui/react';
import type { StepItem } from '@hanui/react';`}
        </Code>
      </Section>

      {/* 기본 사용법 */}
      <Section>
        <Heading level="h2" title="기본 사용법" id="basic-usage" />
        <Body>
          steps 배열과 currentStep 인덱스를 전달하여 기본 단계 표시기를
          렌더링합니다. currentStep은 0부터 시작합니다.
        </Body>
        <PreviewBox>
          <StepIndicator steps={basicSteps} currentStep={1} />
        </PreviewBox>
        <Code variant="block" language="tsx" showLineNumbers={false}>
          {`const steps: StepItem[] = [
  { label: '약관 동의' },
  { label: '정보 입력' },
  { label: '본인 인증' },
  { label: '가입 완료' },
];

<StepIndicator steps={steps} currentStep={1} />`}
        </Code>
      </Section>

      {/* 설명 포함 */}
      <Section>
        <Heading level="h2" title="설명 포함" id="with-description" />
        <Body>
          각 단계에 description을 추가하여 상세 설명을 표시할 수 있습니다.
        </Body>
        <PreviewBox>
          <StepIndicator steps={detailedSteps} currentStep={2} />
        </PreviewBox>
      </Section>

      {/* 수직 방향 */}
      <Section>
        <Heading level="h2" title="수직 방향" id="vertical" />
        <Body>
          orientation=&quot;vertical&quot;을 사용하여 수직 방향으로 표시할 수
          있습니다.
        </Body>
        <PreviewBox>
          <div className="max-w-xs">
            <StepIndicator
              steps={detailedSteps}
              currentStep={1}
              orientation="vertical"
            />
          </div>
        </PreviewBox>
      </Section>

      {/* 크기 */}
      <Section>
        <Heading level="h2" title="크기" id="sizes" />
        <Body>sm, md, lg 세 가지 크기를 지원합니다.</Body>
        <PreviewBox>
          <Stack gap="xl">
            <div>
              <Body className="text-sm text-krds-gray-60 mb-2">Small</Body>
              <StepIndicator steps={basicSteps} currentStep={1} size="sm" />
            </div>
            <div>
              <Body className="text-sm text-krds-gray-60 mb-2">
                Medium (기본)
              </Body>
              <StepIndicator steps={basicSteps} currentStep={1} size="md" />
            </div>
            <div>
              <Body className="text-sm text-krds-gray-60 mb-2">Large</Body>
              <StepIndicator steps={basicSteps} currentStep={1} size="lg" />
            </div>
          </Stack>
        </PreviewBox>
      </Section>

      {/* 클릭 가능한 단계 */}
      <Section>
        <Heading level="h2" title="클릭 가능한 단계" id="clickable" />
        <Body>
          clickable prop을 사용하면 완료된 단계를 클릭하여 이전 단계로 돌아갈 수
          있습니다.
        </Body>
        <PreviewBox>
          <StepIndicator
            steps={basicSteps}
            currentStep={currentStep}
            clickable
            onStepClick={(index) => setCurrentStep(index)}
          />
          <Body className="text-sm text-krds-gray-60 mt-4 text-center">
            완료된 단계(체크 아이콘)를 클릭해보세요
          </Body>
        </PreviewBox>
      </Section>

      {/* 인터랙티브 예제 */}
      <Section>
        <Heading level="h2" title="인터랙티브 예제" id="interactive" />
        <Body>버튼을 클릭하여 단계를 이동해보세요.</Body>
        <PreviewBox>
          <Stack gap="lg" className="w-full">
            <StepIndicator
              steps={detailedSteps}
              currentStep={interactiveStep}
            />
            <div className="flex justify-center gap-3">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={interactiveStep === 0}
              >
                이전
              </Button>
              <Button
                onClick={handleNext}
                disabled={interactiveStep === detailedSteps.length - 1}
              >
                {interactiveStep === detailedSteps.length - 1 ? '완료' : '다음'}
              </Button>
            </div>
          </Stack>
        </PreviewBox>
      </Section>

      {/* 접근성 */}
      <Section>
        <Heading level="h2" title="접근성" id="accessibility" />
        <Body>Step Indicator는 다음과 같은 접근성 기능을 제공합니다:</Body>
        <ul className="list-disc pl-6 space-y-2 text-krds-gray-80">
          <li>순서가 있는 목록이므로 ol 태그로 마크업</li>
          <li>현재 단계에 aria-current=&quot;step&quot; 속성 적용</li>
          <li>스크린리더를 위한 &quot;현재 단계&quot; 텍스트 제공</li>
          <li>색상 외에도 체크 아이콘, 링 효과 등 시각적 구분 요소 제공</li>
        </ul>
      </Section>

      {/* API Reference */}
      <Section>
        <Heading level="h2" title="API Reference" id="api" />

        <Subsection level="h3">
          <Heading level="h3" title="StepIndicator Props" />
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
                  <Code>steps</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">StepItem[]</Code>
                </TableCell>
                <TableCell>필수</TableCell>
                <TableCell>단계 목록</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>currentStep</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">number</Code>
                </TableCell>
                <TableCell>필수</TableCell>
                <TableCell>현재 단계 인덱스 (0부터)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>orientation</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">
                    &apos;horizontal&apos; | &apos;vertical&apos;
                  </Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">&apos;horizontal&apos;</Code>
                </TableCell>
                <TableCell>표시 방향</TableCell>
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
                  <Code>clickable</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">boolean</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">false</Code>
                </TableCell>
                <TableCell>완료된 단계 클릭 가능 여부</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>onStepClick</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">(index: number) =&gt; void</Code>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>단계 클릭 시 콜백</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Subsection>

        <Subsection level="h3">
          <Heading level="h3" title="StepItem Type" />
          <Table small>
            <TableHeader>
              <TableRow>
                <TableHead>속성</TableHead>
                <TableHead>타입</TableHead>
                <TableHead>필수</TableHead>
                <TableHead>설명</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Code>label</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">string</Code>
                </TableCell>
                <TableCell>O</TableCell>
                <TableCell>단계 레이블</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>description</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">string</Code>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>단계 설명</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>optional</Code>
                </TableCell>
                <TableCell>
                  <Code className="text-xs">boolean</Code>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>선택적 단계 여부</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Subsection>
      </Section>
    </>
  );
}
