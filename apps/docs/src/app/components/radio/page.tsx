'use client';

import React, { useState } from 'react';
import {
  RadioGroup,
  RadioGroupItem,
  Radio,
  Heading,
  Body,
  Container,
  Section,
  Card,
  Code,
  Table,
  FormField,
  FormLabel,
  FormHelperText,
  FormError,
} from '@hanui/react';
import { CodeBlock } from '@/components/content/CodeBlock';

export default function RadioPage() {
  const [basicValue, setBasicValue] = useState('option1');
  const [sizeValue, setSizeValue] = useState('md');
  const [horizontalValue, setHorizontalValue] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [errorValue, setErrorValue] = useState('');

  return (
    <Container className="py-8">
      <Heading level="h1" id="radio" title="Radio" className="mb-4" />
      <Body size="lg" className="mb-8">
        KRDS 기반의 라디오 버튼 컴포넌트입니다. 여러 옵션 중 하나만 선택할 수
        있는 단일 선택에 사용되며 FormField와 통합되어 폼 검증 및 접근성을
        제공합니다.
      </Body>

      {/* 기본 사용법 */}
      <Section level="h2">
        <Heading level="h2" id="basic-usage" title="기본 사용법" />
        <Body className="mb-4">
          <Code>RadioGroup</Code>과 <Code>Radio</Code> 컴포넌트를 사용하여 단일
          선택 옵션을 구현합니다.
        </Body>
        <Card className="p-6 mb-4">
          <RadioGroup value={basicValue} onValueChange={setBasicValue}>
            <Radio value="option1" label="옵션 1" />
            <Radio value="option2" label="옵션 2" />
            <Radio value="option3" label="옵션 3" />
          </RadioGroup>
          <Body size="sm" className="text-krds-gray-70 mt-4">
            선택된 값: {basicValue}
          </Body>
        </Card>
        <CodeBlock
          language="tsx"
          code={`const [value, setValue] = useState('option1');

<RadioGroup value={value} onValueChange={setValue}>
  <Radio value="option1" label="옵션 1" />
  <Radio value="option2" label="옵션 2" />
  <Radio value="option3" label="옵션 3" />
</RadioGroup>`}
        />
      </Section>

      {/* RadioGroupItem 사용법 */}
      <Section level="h2">
        <Heading
          level="h2"
          id="radio-group-item"
          title="RadioGroupItem (커스텀 라벨)"
        />
        <Body className="mb-4">
          더 복잡한 라벨이나 커스텀 스타일이 필요한 경우{' '}
          <Code>RadioGroupItem</Code>을 직접 사용할 수 있습니다.
        </Body>
        <Card className="p-6 mb-4">
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="card" id="card" />
              <label htmlFor="card" className="cursor-pointer">
                <span className="text-krds-body-md font-semibold">
                  신용카드
                </span>
                <span className="text-krds-body-sm text-krds-gray-70 block">
                  VISA, Mastercard, 국내 카드
                </span>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="bank" id="bank" />
              <label htmlFor="bank" className="cursor-pointer">
                <span className="text-krds-body-md font-semibold">
                  계좌이체
                </span>
                <span className="text-krds-body-sm text-krds-gray-70 block">
                  실시간 계좌이체
                </span>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="phone" id="phone" />
              <label htmlFor="phone" className="cursor-pointer">
                <span className="text-krds-body-md font-semibold">
                  휴대폰 결제
                </span>
                <span className="text-krds-body-sm text-krds-gray-70 block">
                  통신사 결제
                </span>
              </label>
            </div>
          </RadioGroup>
        </Card>
        <CodeBlock
          language="tsx"
          code={`<RadioGroup value={value} onValueChange={setValue}>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="card" id="card" />
    <label htmlFor="card" className="cursor-pointer">
      <span className="text-krds-body-md font-semibold">신용카드</span>
      <span className="text-krds-body-sm text-krds-gray-70 block">
        VISA, Mastercard, 국내 카드
      </span>
    </label>
  </div>
  {/* ... */}
</RadioGroup>`}
        />
      </Section>

      {/* 크기 변형 */}
      <Section level="h2">
        <Heading level="h2" id="sizes" title="크기" />
        <Body className="mb-4">
          3가지 크기를 제공합니다: <Code>sm</Code> (16px), <Code>md</Code>{' '}
          (20px), <Code>lg</Code> (24px).
        </Body>
        <Card className="p-6 mb-4">
          <div className="space-y-6">
            <div>
              <Body size="sm" weight="semibold" className="mb-2">
                Small (sm)
              </Body>
              <RadioGroup
                value={sizeValue}
                onValueChange={setSizeValue}
                size="sm"
                orientation="horizontal"
              >
                <Radio value="sm" label="Small" />
              </RadioGroup>
            </div>
            <div>
              <Body size="sm" weight="semibold" className="mb-2">
                Medium (md) - 기본값
              </Body>
              <RadioGroup
                value={sizeValue}
                onValueChange={setSizeValue}
                size="md"
                orientation="horizontal"
              >
                <Radio value="md" label="Medium" />
              </RadioGroup>
            </div>
            <div>
              <Body size="sm" weight="semibold" className="mb-2">
                Large (lg)
              </Body>
              <RadioGroup
                value={sizeValue}
                onValueChange={setSizeValue}
                size="lg"
                orientation="horizontal"
              >
                <Radio value="lg" label="Large" />
              </RadioGroup>
            </div>
          </div>
        </Card>
        <CodeBlock
          language="tsx"
          code={`<RadioGroup size="sm"> {/* Small */}
  <Radio value="option1" label="옵션 1" />
</RadioGroup>

<RadioGroup size="md"> {/* Medium (기본값) */}
  <Radio value="option1" label="옵션 1" />
</RadioGroup>

<RadioGroup size="lg"> {/* Large */}
  <Radio value="option1" label="옵션 1" />
</RadioGroup>`}
        />
      </Section>

      {/* 방향 */}
      <Section level="h2">
        <Heading level="h2" id="orientation" title="방향" />
        <Body className="mb-4">
          <Code>orientation</Code> prop으로 수직 또는 수평 배치를 선택할 수
          있습니다.
        </Body>
        <Card className="p-6 mb-4">
          <Body size="md" weight="semibold" className="mb-2">
            수평 배치 (Horizontal)
          </Body>
          <RadioGroup
            value={horizontalValue}
            onValueChange={setHorizontalValue}
            orientation="horizontal"
          >
            <Radio value="yes" label="예" />
            <Radio value="no" label="아니오" />
            <Radio value="maybe" label="모름" />
          </RadioGroup>
        </Card>
        <CodeBlock
          language="tsx"
          code={`<RadioGroup
  value={value}
  onValueChange={setValue}
  orientation="horizontal" // "vertical" | "horizontal"
>
  <Radio value="yes" label="예" />
  <Radio value="no" label="아니오" />
  <Radio value="maybe" label="모름" />
</RadioGroup>`}
        />
      </Section>

      {/* Status prop */}
      <Section level="h2">
        <Heading level="h2" id="status" title="Status" />
        <Body className="mb-4">
          <Code>status</Code> prop으로 에러 상태를 표시할 수 있습니다.
        </Body>
        <Card className="p-6 mb-4">
          <RadioGroup status="error">
            <Radio value="opt1" label="에러 상태 옵션 1" />
            <Radio value="opt2" label="에러 상태 옵션 2" />
          </RadioGroup>
        </Card>
        <CodeBlock
          language="tsx"
          code={`<RadioGroup status="error">
  <Radio value="opt1" label="에러 상태 옵션 1" />
  <Radio value="opt2" label="에러 상태 옵션 2" />
</RadioGroup>`}
        />
      </Section>

      {/* FormField 통합 */}
      <Section level="h2">
        <Heading
          level="h2"
          id="formfield-integration"
          title="FormField 통합 (권장)"
        />
        <Body className="mb-4">
          <Code>FormField</Code>와 함께 사용하면 자동으로 접근성 속성이 연결되며
          폼 검증을 쉽게 구현할 수 있습니다.
        </Body>

        {/* 기본 FormField */}
        <Body size="md" weight="semibold" className="mb-2 mt-6">
          기본 사용
        </Body>
        <Card className="p-6 mb-4">
          <FormField id="gender" required>
            <FormLabel>성별 *</FormLabel>
            <RadioGroup value={basicValue} onValueChange={setBasicValue}>
              <Radio value="male" label="남성" />
              <Radio value="female" label="여성" />
              <Radio value="other" label="기타" />
            </RadioGroup>
            <FormHelperText>서비스 이용 통계에 활용됩니다</FormHelperText>
          </FormField>
        </Card>
        <CodeBlock
          language="tsx"
          code={`<FormField id="gender" required>
  <FormLabel>성별 *</FormLabel>
  <RadioGroup value={value} onValueChange={setValue}>
    <Radio value="male" label="남성" />
    <Radio value="female" label="여성" />
    <Radio value="other" label="기타" />
  </RadioGroup>
  <FormHelperText>서비스 이용 통계에 활용됩니다</FormHelperText>
</FormField>`}
        />

        {/* 에러 상태 */}
        <Body size="md" weight="semibold" className="mb-2 mt-6">
          에러 상태
        </Body>
        <Card className="p-6 mb-4">
          <FormField id="subscription" required status="error">
            <FormLabel>구독 플랜 *</FormLabel>
            <RadioGroup value={errorValue} onValueChange={setErrorValue}>
              <Radio value="free" label="무료" />
              <Radio value="basic" label="베이직 (월 9,900원)" />
              <Radio value="premium" label="프리미엄 (월 19,900원)" />
            </RadioGroup>
            <FormError>구독 플랜을 선택해주세요</FormError>
          </FormField>
        </Card>
        <CodeBlock
          language="tsx"
          code={`<FormField id="subscription" required status="error">
  <FormLabel>구독 플랜 *</FormLabel>
  <RadioGroup value={value} onValueChange={setValue}>
    <Radio value="free" label="무료" />
    <Radio value="basic" label="베이직 (월 9,900원)" />
    <Radio value="premium" label="프리미엄 (월 19,900원)" />
  </RadioGroup>
  <FormError>구독 플랜을 선택해주세요</FormError>
</FormField>`}
        />
      </Section>

      {/* 사용 가이드 */}
      <Section level="h2">
        <Heading level="h2" id="usage-guidelines" title="사용 가이드" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card className="p-4 border-l-4 border-krds-success-60">
            <Body size="md" weight="semibold" className="mb-2">
              ✓ 라디오 버튼을 사용하는 경우
            </Body>
            <ul className="list-disc list-inside space-y-1 text-krds-body-md">
              <li>상호 배타적인 옵션 중 하나 선택</li>
              <li>2~7개 사이의 옵션</li>
              <li>모든 옵션을 한눈에 보여줄 때</li>
              <li>옵션 간 비교가 필요한 경우</li>
              <li>기본값이 있는 단일 선택</li>
            </ul>
          </Card>
          <Card className="p-4 border-l-4 border-krds-danger-60">
            <Body size="md" weight="semibold" className="mb-2">
              ✗ 라디오 버튼을 사용하지 않는 경우
            </Body>
            <ul className="list-disc list-inside space-y-1 text-krds-body-md">
              <li>다중 선택이 필요한 경우 (Checkbox 사용)</li>
              <li>옵션이 7개 이상인 경우 (Select 사용)</li>
              <li>예/아니오만 있는 경우 (Switch 고려)</li>
              <li>옵션이 동적으로 변하는 경우</li>
            </ul>
          </Card>
        </div>
      </Section>

      {/* Checkbox vs Radio */}
      <Section level="h2">
        <Heading level="h2" id="checkbox-vs-radio" title="Checkbox vs Radio" />
        <Body className="mb-4">
          Checkbox와 Radio의 차이점을 이해하고 적절히 사용하세요.
        </Body>
        <Table>
          <thead>
            <tr>
              <th>구분</th>
              <th>Checkbox</th>
              <th>Radio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>선택 방식</td>
              <td>다중 선택 가능</td>
              <td>단일 선택만 가능</td>
            </tr>
            <tr>
              <td>선택 해제</td>
              <td>개별 해제 가능</td>
              <td>다른 옵션 선택으로만 변경</td>
            </tr>
            <tr>
              <td>기본 상태</td>
              <td>선택 안 됨이 가능</td>
              <td>보통 하나가 선택됨</td>
            </tr>
            <tr>
              <td>사용 예</td>
              <td>관심사 선택, 동의 항목</td>
              <td>성별, 결제 방법, 플랜 선택</td>
            </tr>
          </tbody>
        </Table>
      </Section>

      {/* 접근성 */}
      <Section level="h2">
        <Heading level="h2" id="accessibility" title="접근성" />
        <Body className="mb-4">WCAG 2.1 / KWCAG 2.2 AA 기준을 준수합니다.</Body>

        <Body size="md" weight="semibold" className="mb-2">
          키보드 지원
        </Body>
        <Table className="mb-6">
          <thead>
            <tr>
              <th>키</th>
              <th>동작</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Code>Tab</Code>
              </td>
              <td>라디오 그룹으로 포커스 이동</td>
            </tr>
            <tr>
              <td>
                <Code>↑</Code> / <Code>↓</Code>
              </td>
              <td>수직 그룹에서 이전/다음 옵션 선택</td>
            </tr>
            <tr>
              <td>
                <Code>←</Code> / <Code>→</Code>
              </td>
              <td>수평 그룹에서 이전/다음 옵션 선택</td>
            </tr>
            <tr>
              <td>
                <Code>Space</Code>
              </td>
              <td>현재 포커스된 옵션 선택</td>
            </tr>
          </tbody>
        </Table>

        <Body size="md" weight="semibold" className="mb-2">
          스크린 리더 지원
        </Body>
        <ul className="list-disc list-inside space-y-1 text-krds-body-md mb-6">
          <li>라디오 그룹의 역할과 현재 선택된 옵션 안내</li>
          <li>
            <Code>FormField</Code>와 함께 사용 시 label, error, helperText 자동
            연결
          </li>
          <li>필수 필드 여부를 aria-required로 전달</li>
          <li>에러 상태를 aria-invalid로 전달</li>
        </ul>

        <Body size="md" weight="semibold" className="mb-2">
          ARIA 속성
        </Body>
        <ul className="list-disc list-inside space-y-1 text-krds-body-md">
          <li>
            <Code>role="radiogroup"</Code>: 라디오 그룹 역할 명시
          </li>
          <li>
            <Code>role="radio"</Code>: 개별 라디오 버튼 역할
          </li>
          <li>
            <Code>aria-checked</Code>: 선택 상태 전달
          </li>
          <li>
            <Code>aria-invalid</Code>: 에러 상태 전달
          </li>
          <li>
            <Code>aria-describedby</Code>: helper text, error 메시지 연결
          </li>
        </ul>
      </Section>

      {/* API Reference */}
      <Section level="h2">
        <Heading level="h2" id="api-reference" title="API Reference" />

        <Body size="md" weight="semibold" className="mb-2 mt-6">
          RadioGroup Props
        </Body>
        <Table className="mb-6">
          <thead>
            <tr>
              <th>Prop</th>
              <th>타입</th>
              <th>기본값</th>
              <th>설명</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Code>value</Code>
              </td>
              <td>
                <Code>string</Code>
              </td>
              <td>-</td>
              <td>선택된 값 (제어 컴포넌트)</td>
            </tr>
            <tr>
              <td>
                <Code>defaultValue</Code>
              </td>
              <td>
                <Code>string</Code>
              </td>
              <td>-</td>
              <td>초기 선택 값 (비제어 컴포넌트)</td>
            </tr>
            <tr>
              <td>
                <Code>onValueChange</Code>
              </td>
              <td>
                <Code>(value: string) =&gt; void</Code>
              </td>
              <td>-</td>
              <td>값 변경 시 호출</td>
            </tr>
            <tr>
              <td>
                <Code>orientation</Code>
              </td>
              <td>
                <Code>"vertical" | "horizontal"</Code>
              </td>
              <td>
                <Code>"vertical"</Code>
              </td>
              <td>배치 방향</td>
            </tr>
            <tr>
              <td>
                <Code>size</Code>
              </td>
              <td>
                <Code>"sm" | "md" | "lg"</Code>
              </td>
              <td>
                <Code>"md"</Code>
              </td>
              <td>그룹 내 모든 라디오 크기</td>
            </tr>
            <tr>
              <td>
                <Code>status</Code>
              </td>
              <td>
                <Code>"error" | "success" | "info"</Code>
              </td>
              <td>-</td>
              <td>그룹 상태</td>
            </tr>
            <tr>
              <td>
                <Code>disabled</Code>
              </td>
              <td>
                <Code>boolean</Code>
              </td>
              <td>
                <Code>false</Code>
              </td>
              <td>전체 그룹 비활성화</td>
            </tr>
          </tbody>
        </Table>

        <Body size="md" weight="semibold" className="mb-2 mt-6">
          Radio Props
        </Body>
        <Table className="mb-6">
          <thead>
            <tr>
              <th>Prop</th>
              <th>타입</th>
              <th>기본값</th>
              <th>설명</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Code>value</Code>
              </td>
              <td>
                <Code>string</Code>
              </td>
              <td>-</td>
              <td>라디오 값 (필수)</td>
            </tr>
            <tr>
              <td>
                <Code>label</Code>
              </td>
              <td>
                <Code>React.ReactNode</Code>
              </td>
              <td>-</td>
              <td>라벨 텍스트 (필수)</td>
            </tr>
            <tr>
              <td>
                <Code>disabled</Code>
              </td>
              <td>
                <Code>boolean</Code>
              </td>
              <td>
                <Code>false</Code>
              </td>
              <td>개별 항목 비활성화</td>
            </tr>
          </tbody>
        </Table>

        <Body size="md" weight="semibold" className="mb-2 mt-6">
          RadioGroupItem Props
        </Body>
        <Table>
          <thead>
            <tr>
              <th>Prop</th>
              <th>타입</th>
              <th>기본값</th>
              <th>설명</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Code>value</Code>
              </td>
              <td>
                <Code>string</Code>
              </td>
              <td>-</td>
              <td>라디오 값 (필수)</td>
            </tr>
            <tr>
              <td>
                <Code>id</Code>
              </td>
              <td>
                <Code>string</Code>
              </td>
              <td>-</td>
              <td>라디오 ID (label 연결용)</td>
            </tr>
            <tr>
              <td>
                <Code>size</Code>
              </td>
              <td>
                <Code>"sm" | "md" | "lg"</Code>
              </td>
              <td>그룹 크기</td>
              <td>개별 라디오 크기 (그룹 설정 덮어쓰기)</td>
            </tr>
            <tr>
              <td>
                <Code>status</Code>
              </td>
              <td>
                <Code>"error" | "success" | "info"</Code>
              </td>
              <td>그룹 상태</td>
              <td>개별 라디오 상태 (그룹 설정 덮어쓰기)</td>
            </tr>
            <tr>
              <td>
                <Code>disabled</Code>
              </td>
              <td>
                <Code>boolean</Code>
              </td>
              <td>
                <Code>false</Code>
              </td>
              <td>개별 항목 비활성화</td>
            </tr>
          </tbody>
        </Table>
      </Section>
    </Container>
  );
}
