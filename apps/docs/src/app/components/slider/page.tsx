'use client';

import React, { useState } from 'react';
import {
  Slider,
  Body,
  Code,
  Heading,
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
  const [value3, setValue3] = useState<number[]>([20, 80]);
  const [value4, setValue4] = useState<number>(50);

  return (
    <>
      <Heading level="h1">Slider</Heading>
      <Body className="text-krds-gray-60 mb-8">
        범위 내에서 값을 선택할 수 있는 슬라이더 컴포넌트입니다. 단일 값 또는
        범위 선택을 지원합니다.
      </Body>

      {/* 기본 사용 */}
      <section className="space-y-4">
        <Heading level="h2">기본 사용</Heading>
        <Body className="mb-4">기본 슬라이더입니다.</Body>
        <div className="p-6 border border-krds-gray-20 rounded-lg flex flex-col items-center justify-center min-h-[200px]">
          <div className="w-full max-w-md">
            <Slider
              value={value1}
              onValueChange={(v) => setValue1(v as number)}
              showValue
              label="볼륨"
            />
          </div>
        </div>
        <Code
          variant="block"
          language="tsx"
        >{`const [value, setValue] = useState(50);

<Slider
  value={value}
  onValueChange={setValue}
  showValue
  label="볼륨"
/>`}</Code>
      </section>

      {/* 크기 */}
      <section className="space-y-4">
        <Heading level="h2">크기</Heading>
        <Body className="mb-4">sm, md, lg 세 가지 크기를 지원합니다.</Body>
        <div className="p-6 border border-krds-gray-20 rounded-lg flex items-center justify-center min-h-[200px]">
          <div className="w-full max-w-md space-y-6">
            <Slider defaultValue={30} size="sm" label="Small" showValue />
            <Slider defaultValue={50} size="md" label="Medium" showValue />
            <Slider defaultValue={70} size="lg" label="Large" showValue />
          </div>
        </div>
        <Code
          variant="block"
          language="tsx"
        >{`<Slider defaultValue={30} size="sm" label="Small" showValue />
<Slider defaultValue={50} size="md" label="Medium" showValue />
<Slider defaultValue={70} size="lg" label="Large" showValue />`}</Code>
      </section>

      {/* 색상 */}
      <section className="space-y-4">
        <Heading level="h2">색상</Heading>
        <Body className="mb-4">
          primary, secondary, success, danger 네 가지 색상을 지원합니다.
        </Body>
        <div className="p-6 border border-krds-gray-20 rounded-lg flex items-center justify-center min-h-[280px]">
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
            <Slider defaultValue={50} color="danger" label="Danger" showValue />
          </div>
        </div>
        <Code
          variant="block"
          language="tsx"
        >{`<Slider defaultValue={50} color="primary" label="Primary" showValue />
<Slider defaultValue={50} color="secondary" label="Secondary" showValue />
<Slider defaultValue={50} color="success" label="Success" showValue />
<Slider defaultValue={50} color="danger" label="Danger" showValue />`}</Code>
      </section>

      {/* 범위 선택 */}
      <section className="space-y-4">
        <Heading level="h2">범위 선택</Heading>
        <Body className="mb-4">
          배열 값을 사용하여 범위를 선택할 수 있습니다.
        </Body>
        <div className="p-6 border border-krds-gray-20 rounded-lg flex flex-col items-center justify-center min-h-[200px]">
          <div className="w-full max-w-md">
            <Slider
              value={value3}
              onValueChange={(v) => setValue3(v as number[])}
              showValue
              label="가격 범위"
              formatValue={(v) => `${v.toLocaleString()}원`}
            />
          </div>
        </div>
        <Code
          variant="block"
          language="tsx"
        >{`const [range, setRange] = useState([20, 80]);

<Slider
  value={range}
  onValueChange={setRange}
  showValue
  label="가격 범위"
  formatValue={(v) => \`\${v.toLocaleString()}원\`}
/>`}</Code>
      </section>

      {/* 값 포맷팅 */}
      <section className="space-y-4">
        <Heading level="h2">값 포맷팅</Heading>
        <Body className="mb-4">
          formatValue prop으로 표시되는 값을 포맷할 수 있습니다.
        </Body>
        <div className="p-6 border border-krds-gray-20 rounded-lg flex flex-col items-center justify-center min-h-[200px]">
          <div className="w-full max-w-md">
            <Slider
              value={value2}
              onValueChange={(v) => setValue2(v as number)}
              showValue
              label="할인율"
              formatValue={(v) => `${v}%`}
            />
          </div>
        </div>
        <Code variant="block" language="tsx">{`<Slider
  value={value}
  onValueChange={setValue}
  showValue
  label="할인율"
  formatValue={(v) => \`\${v}%\`}
/>`}</Code>
      </section>

      {/* Step */}
      <section className="space-y-4">
        <Heading level="h2">단계 설정</Heading>
        <Body className="mb-4">step prop으로 값의 증가 단위를 설정합니다.</Body>
        <div className="p-6 border border-krds-gray-20 rounded-lg flex flex-col items-center justify-center min-h-[200px]">
          <div className="w-full max-w-md">
            <Slider
              value={value4}
              onValueChange={(v) => setValue4(v as number)}
              step={10}
              showValue
              label="10 단위"
            />
          </div>
        </div>
        <Code variant="block" language="tsx">{`<Slider
  value={value}
  onValueChange={setValue}
  step={10}
  showValue
  label="10 단위"
/>`}</Code>
      </section>

      {/* 비활성화 */}
      <section className="space-y-4">
        <Heading level="h2">비활성화</Heading>
        <Body className="mb-4">
          disabled prop으로 슬라이더를 비활성화합니다.
        </Body>
        <div className="p-6 border border-krds-gray-20 rounded-lg flex items-center justify-center min-h-[200px]">
          <div className="w-full max-w-md">
            <Slider defaultValue={50} disabled showValue label="비활성화됨" />
          </div>
        </div>
        <Code
          variant="block"
          language="tsx"
        >{`<Slider defaultValue={50} disabled showValue label="비활성화됨" />`}</Code>
      </section>

      {/* Props 테이블 */}
      <section className="space-y-4">
        <Heading level="h2">Props</Heading>
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
                <Code>value</Code>
              </TableCell>
              <TableCell>
                <Code>number | number[]</Code>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>현재 값 (제어 컴포넌트)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>defaultValue</Code>
              </TableCell>
              <TableCell>
                <Code>number | number[]</Code>
              </TableCell>
              <TableCell>min</TableCell>
              <TableCell>기본 값 (비제어 컴포넌트)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>onValueChange</Code>
              </TableCell>
              <TableCell>
                <Code>(value: number | number[]) =&gt; void</Code>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>값 변경 콜백</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>min</Code>
              </TableCell>
              <TableCell>
                <Code>number</Code>
              </TableCell>
              <TableCell>0</TableCell>
              <TableCell>최소값</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>max</Code>
              </TableCell>
              <TableCell>
                <Code>number</Code>
              </TableCell>
              <TableCell>100</TableCell>
              <TableCell>최대값</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>step</Code>
              </TableCell>
              <TableCell>
                <Code>number</Code>
              </TableCell>
              <TableCell>1</TableCell>
              <TableCell>증가 단위</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>size</Code>
              </TableCell>
              <TableCell>
                <Code>&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</Code>
              </TableCell>
              <TableCell>&quot;md&quot;</TableCell>
              <TableCell>크기</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>color</Code>
              </TableCell>
              <TableCell>
                <Code>
                  &quot;primary&quot; | &quot;secondary&quot; |
                  &quot;success&quot; | &quot;danger&quot;
                </Code>
              </TableCell>
              <TableCell>&quot;primary&quot;</TableCell>
              <TableCell>색상</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>showValue</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>false</TableCell>
              <TableCell>값 표시 여부</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>formatValue</Code>
              </TableCell>
              <TableCell>
                <Code>(value: number) =&gt; string</Code>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>값 포맷터</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>label</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>라벨</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>disabled</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>false</TableCell>
              <TableCell>비활성화</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      {/* 접근성 */}
      <section className="space-y-4">
        <Heading level="h2">접근성</Heading>
        <Body>Slider 컴포넌트는 WCAG 2.2 AA 기준을 준수합니다:</Body>
        <ul className="list-disc list-inside space-y-2 text-krds-gray-70">
          <li>
            <Code>role=&quot;slider&quot;</Code> 역할이 자동으로 적용됩니다.
          </li>
          <li>
            <Code>aria-valuenow</Code>, <Code>aria-valuemin</Code>,{' '}
            <Code>aria-valuemax</Code>가 자동으로 설정됩니다.
          </li>
          <li>키보드로 조작할 수 있습니다 (화살표 키).</li>
          <li>포커스 시 시각적 피드백이 제공됩니다.</li>
          <li>label과 연결하여 스크린 리더 지원이 가능합니다.</li>
        </ul>
      </section>
    </>
  );
}
