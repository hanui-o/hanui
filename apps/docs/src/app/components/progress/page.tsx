'use client';

import { useState, useEffect } from 'react';
import { PageSection as Section, Heading } from '@/components/content';
import { PreviewBox } from '@/components/helpers';
import {
  Progress,
  CircularProgress,
  Button,
  Stack,
  Body,
  Code,
} from '@hanui/react';

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
    <Stack gap="md" className="w-full max-w-md">
      <Progress value={value} showValue label="진행률" />
      <Stack gap="sm" direction="row">
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
      </Stack>
    </Stack>
  );
}

export default function ProgressPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Progress"
        description="작업의 진행 상태를 시각적으로 표시하는 컴포넌트입니다."
        badge="New"
      />

      {/* 기본 사용법 */}
      <Section>
        <Heading level="h2" id="default" title="기본 사용법">
          <Body>
            <Code>value</Code> prop으로 진행률(0-100)을 지정합니다.
          </Body>
        </Heading>

        <PreviewBox
          preview={
            <Stack gap="lg" className="w-full max-w-md">
              <Progress value={25} />
              <Progress value={50} />
              <Progress value={75} />
              <Progress value={100} />
            </Stack>
          }
          code={`<Progress value={25} />
<Progress value={50} />
<Progress value={75} />
<Progress value={100} />`}
        />
      </Section>

      {/* 인터랙티브 예시 */}
      <Section>
        <Heading level="h2" id="interactive" title="인터랙티브 예시">
          <Body>버튼으로 진행률을 조절해보세요.</Body>
        </Heading>

        <PreviewBox
          preview={<ProgressDemo />}
          code={`const [value, setValue] = useState(60);

<Progress value={value} showValue label="진행률" />
<Button onClick={() => setValue(value + 10)}>+10%</Button>`}
        />
      </Section>

      {/* 크기 */}
      <Section>
        <Heading level="h2" id="sizes" title="크기">
          <Body>
            <Code>size</Code> prop으로 높이를 조절합니다.
          </Body>
        </Heading>

        <PreviewBox
          preview={
            <Stack gap="lg" className="w-full max-w-md">
              <Progress value={60} size="sm" label="Small" />
              <Progress value={60} size="md" label="Medium (기본)" />
              <Progress value={60} size="lg" label="Large" />
              <Progress value={60} size="xl" label="Extra Large" />
            </Stack>
          }
          code={`<Progress value={60} size="sm" />
<Progress value={60} size="md" />
<Progress value={60} size="lg" />
<Progress value={60} size="xl" />`}
        />
      </Section>

      {/* 색상 변형 */}
      <Section>
        <Heading level="h2" id="variants" title="색상 변형">
          <Body>
            <Code>variant</Code> prop으로 색상을 지정합니다.
          </Body>
        </Heading>

        <PreviewBox
          preview={
            <Stack gap="lg" className="w-full max-w-md">
              <Progress value={60} variant="default" label="Default" />
              <Progress value={60} variant="primary" label="Primary" />
              <Progress value={60} variant="success" label="Success" />
              <Progress value={60} variant="warning" label="Warning" />
              <Progress value={60} variant="error" label="Error" />
            </Stack>
          }
          code={`<Progress value={60} variant="default" />
<Progress value={60} variant="primary" />
<Progress value={60} variant="success" />
<Progress value={60} variant="warning" />
<Progress value={60} variant="error" />`}
        />
      </Section>

      {/* 값 표시 */}
      <Section>
        <Heading level="h2" id="show-value" title="값 표시">
          <Body>
            <Code>showValue</Code> prop으로 진행률 텍스트를 표시합니다.
          </Body>
        </Heading>

        <PreviewBox
          preview={
            <Stack gap="lg" className="w-full max-w-md">
              <Progress value={45} showValue label="파일 업로드" />
              <Progress
                value={7}
                max={10}
                showValue
                label="단계"
                formatValue={(v, m) => `${v}/${m}`}
              />
            </Stack>
          }
          code={`<Progress value={45} showValue label="파일 업로드" />
<Progress
  value={7}
  max={10}
  showValue
  label="단계"
  formatValue={(v, m) => \`\${v}/\${m}\`}
/>`}
        />
      </Section>

      {/* 불확정 상태 */}
      <Section>
        <Heading level="h2" id="indeterminate" title="불확정 상태">
          <Body>
            <Code>value</Code>를 생략하면 불확정(indeterminate) 상태로
            표시됩니다. 진행률을 알 수 없는 로딩 상태에 사용합니다.
          </Body>
        </Heading>

        <PreviewBox
          preview={
            <Stack gap="lg" className="w-full max-w-md">
              <Progress label="로딩 중..." />
              <Progress variant="success" />
              <Progress variant="warning" size="lg" />
            </Stack>
          }
          code={`// value를 생략하면 indeterminate 상태
<Progress label="로딩 중..." />
<Progress variant="success" />
<Progress variant="warning" size="lg" />`}
        />
      </Section>

      {/* 원형 Progress */}
      <Section>
        <Heading level="h2" id="circular" title="원형 Progress">
          <Body>
            <Code>CircularProgress</Code>는 원형으로 진행 상태를 표시합니다.
          </Body>
        </Heading>

        <PreviewBox
          preview={
            <Stack gap="lg" direction="row" className="flex-wrap items-center">
              <CircularProgress value={25} showValue />
              <CircularProgress value={50} variant="success" showValue />
              <CircularProgress value={75} variant="warning" showValue />
              <CircularProgress value={100} variant="error" showValue />
            </Stack>
          }
          code={`<CircularProgress value={25} showValue />
<CircularProgress value={50} variant="success" showValue />
<CircularProgress value={75} variant="warning" showValue />
<CircularProgress value={100} variant="error" showValue />`}
        />
      </Section>

      {/* 원형 크기 조절 */}
      <Section>
        <Heading level="h2" id="circular-sizes" title="원형 크기 조절">
          <Body>
            <Code>size</Code>와 <Code>strokeWidth</Code>로 크기를 조절합니다.
          </Body>
        </Heading>

        <PreviewBox
          preview={
            <Stack gap="lg" direction="row" className="flex-wrap items-center">
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
            </Stack>
          }
          code={`<CircularProgress value={60} size={32} strokeWidth={3} />
<CircularProgress value={60} size={48} strokeWidth={4} showValue />
<CircularProgress value={60} size={64} strokeWidth={5} showValue />
<CircularProgress value={60} size={80} strokeWidth={6} showValue />`}
        />
      </Section>

      {/* 원형 불확정 상태 */}
      <Section>
        <Heading
          level="h2"
          id="circular-indeterminate"
          title="원형 불확정 상태"
        >
          <Body>원형 Progress도 불확정 상태를 지원합니다.</Body>
        </Heading>

        <PreviewBox
          preview={
            <Stack gap="lg" direction="row" className="flex-wrap items-center">
              <CircularProgress />
              <CircularProgress variant="success" size={56} />
              <CircularProgress variant="warning" size={64} />
            </Stack>
          }
          code={`<CircularProgress />
<CircularProgress variant="success" size={56} />
<CircularProgress variant="warning" size={64} />`}
        />
      </Section>

      {/* 실제 사용 예시 */}
      <Section>
        <Heading level="h2" id="examples" title="실제 사용 예시">
          <Body>파일 업로드, 스텝 진행 등 실제 사용 사례입니다.</Body>
        </Heading>

        <PreviewBox
          preview={
            <Stack gap="xl" className="w-full max-w-md">
              {/* 파일 업로드 */}
              <div className="rounded-lg border border-krds-gray-20 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded bg-krds-gray-10 flex items-center justify-center text-sm">
                    📄
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">document.pdf</p>
                    <p className="text-xs text-krds-gray-60">2.4 MB</p>
                  </div>
                </div>
                <AnimatedProgress />
              </div>

              {/* 스텝 진행 */}
              <div className="rounded-lg border border-krds-gray-20 p-4">
                <h4 className="text-sm font-medium mb-3">회원가입 진행</h4>
                <Progress
                  value={2}
                  max={4}
                  showValue
                  formatValue={(v, m) => `Step ${v} of ${m}`}
                  variant="primary"
                />
                <div className="flex justify-between mt-2 text-xs text-krds-gray-60">
                  <span>기본 정보</span>
                  <span>인증</span>
                  <span>약관</span>
                  <span>완료</span>
                </div>
              </div>
            </Stack>
          }
          code={`{/* 파일 업로드 */}
<Progress value={uploadProgress} showValue label="파일 업로드" />

{/* 스텝 진행 */}
<Progress
  value={2}
  max={4}
  showValue
  formatValue={(v, m) => \`Step \${v} of \${m}\`}
/>`}
        />
      </Section>

      {/* 접근성 */}
      <Section>
        <Heading level="h2" id="accessibility" title="접근성">
          <Body>Progress 컴포넌트는 KWCAG 2.2 AA 기준을 준수합니다.</Body>
        </Heading>

        <Stack gap="md" className="mt-4">
          <div className="rounded-lg border border-krds-gray-20 p-4">
            <h3 className="font-semibold text-krds-gray-95 mb-2">ARIA 속성</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-krds-gray-70">
              <li>
                <Code>role=&quot;progressbar&quot;</Code>: 진행률 표시기임을
                명시
              </li>
              <li>
                <Code>aria-valuenow</Code>: 현재 값
              </li>
              <li>
                <Code>aria-valuemin</Code>: 최소값 (0)
              </li>
              <li>
                <Code>aria-valuemax</Code>: 최대값 (기본 100)
              </li>
              <li>
                <Code>aria-busy=&quot;true&quot;</Code>: 불확정 상태일 때
              </li>
              <li>
                <Code>aria-label</Code>: 스크린리더용 레이블
              </li>
            </ul>
          </div>
        </Stack>
      </Section>

      {/* API Reference */}
      <Section>
        <Heading level="h2" id="api" title="API Reference" />

        <div className="space-y-6">
          {/* Progress */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Progress (Linear)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-krds-gray-20">
                    <th className="text-left py-3 px-4 font-semibold">Prop</th>
                    <th className="text-left py-3 px-4 font-semibold">Type</th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Default
                    </th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="text-krds-gray-70">
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>value</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>number | null</Code>
                    </td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">
                      진행률 (null/undefined: 불확정)
                    </td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>max</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>number</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>100</Code>
                    </td>
                    <td className="py-3 px-4">최대값</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>size</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>
                        &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; |
                        &quot;xl&quot;
                      </Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>&quot;md&quot;</Code>
                    </td>
                    <td className="py-3 px-4">높이</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>variant</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>
                        &quot;default&quot; | &quot;primary&quot; |
                        &quot;success&quot; | ...
                      </Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>&quot;primary&quot;</Code>
                    </td>
                    <td className="py-3 px-4">색상 변형</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>label</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>string</Code>
                    </td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">레이블 텍스트</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>showValue</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>boolean</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>false</Code>
                    </td>
                    <td className="py-3 px-4">진행률 텍스트 표시</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>formatValue</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>(v, max) =&gt; string</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>{`\${percentage}%`}</Code>
                    </td>
                    <td className="py-3 px-4">값 포맷 함수</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* CircularProgress */}
          <div>
            <h3 className="text-lg font-semibold mb-3">CircularProgress</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-krds-gray-20">
                    <th className="text-left py-3 px-4 font-semibold">Prop</th>
                    <th className="text-left py-3 px-4 font-semibold">Type</th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Default
                    </th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="text-krds-gray-70">
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>value</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>number | null</Code>
                    </td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">진행률</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>size</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>number</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>48</Code>
                    </td>
                    <td className="py-3 px-4">원 크기 (px)</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>strokeWidth</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>number</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>4</Code>
                    </td>
                    <td className="py-3 px-4">선 두께 (px)</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>variant</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>
                        &quot;default&quot; | &quot;primary&quot; | ...
                      </Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>&quot;primary&quot;</Code>
                    </td>
                    <td className="py-3 px-4">색상 변형</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>showValue</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>boolean</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>false</Code>
                    </td>
                    <td className="py-3 px-4">중앙에 값 표시</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
