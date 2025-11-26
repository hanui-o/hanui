'use client';

import React, { useState } from 'react';
import {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupItem,
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
import { CodeBlock } from '@/components/CodeBlock';

export default function CheckboxPage() {
  const [singleChecked, setSingleChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [basicSelected, setBasicSelected] = useState<string[]>(['option2']);
  const [horizontalSelected, setHorizontalSelected] = useState<string[]>([]);
  const [errorGroupValue, setErrorGroupValue] = useState<string[]>([]);

  return (
    <Container className="py-8">
      <Heading level="h1" id="checkbox" title="Checkbox" className="mb-4" />
      <Body size="lg" className="mb-8">
        KRDS 기반의 체크박스 컴포넌트입니다. 단일 선택 및 다중 선택을 지원하며
        FormField와 통합되어 폼 검증 및 접근성을 제공합니다.
      </Body>

      {/* 단일 체크박스 */}
      <Section level="h2">
        <Heading level="h2" id="single-checkbox" title="단일 체크박스" />
        <Body className="mb-4">
          단일 체크박스는 예/아니오 또는 동의/비동의와 같은 이진 선택에
          사용됩니다.
        </Body>
        <Card className="p-6 mb-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id="terms"
                checked={termsChecked}
                onCheckedChange={(checked) =>
                  setTermsChecked(checked as boolean)
                }
              />
              <label
                htmlFor="terms"
                className="text-krds-body-md text-krds-gray-90 cursor-pointer"
              >
                이용약관에 동의합니다
              </label>
            </div>
            <Body size="sm" className="text-krds-gray-70">
              현재 상태: {termsChecked ? '동의함' : '동의하지 않음'}
            </Body>
          </div>
        </Card>
        <CodeBlock
          language="tsx"
          code={`const [checked, setChecked] = useState(false);

<div className="flex items-center gap-2">
  <Checkbox
    id="terms"
    checked={checked}
    onCheckedChange={(checked) => setChecked(checked as boolean)}
  />
  <label htmlFor="terms" className="text-krds-body-md text-krds-gray-90 cursor-pointer">
    이용약관에 동의합니다
  </label>
</div>`}
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
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Checkbox size="sm" id="small" />
              <label htmlFor="small" className="text-krds-body-sm">
                Small (16px)
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox size="md" id="medium" />
              <label htmlFor="medium" className="text-krds-body-md">
                Medium (20px) - 기본값
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox size="lg" id="large" />
              <label htmlFor="large" className="text-krds-body-lg">
                Large (24px)
              </label>
            </div>
          </div>
        </Card>
        <CodeBlock
          language="tsx"
          code={`<Checkbox size="sm" id="small" />
<Checkbox size="md" id="medium" /> {/* 기본값 */}
<Checkbox size="lg" id="large" />`}
        />
      </Section>

      {/* CheckboxGroup - 기본 */}
      <Section level="h2">
        <Heading level="h2" id="checkbox-group" title="CheckboxGroup" />
        <Body className="mb-4">
          <Code>CheckboxGroup</Code>은 여러 체크박스를 그룹화하여 관리합니다.
          다중 선택이 가능합니다.
        </Body>
        <Card className="p-6 mb-4">
          <CheckboxGroup value={basicSelected} onValueChange={setBasicSelected}>
            <CheckboxGroupItem value="option1" label="옵션 1" />
            <CheckboxGroupItem value="option2" label="옵션 2" />
            <CheckboxGroupItem value="option3" label="옵션 3" />
            <CheckboxGroupItem value="option4" label="옵션 4" />
          </CheckboxGroup>
          <Body size="sm" className="text-krds-gray-70 mt-4">
            선택된 항목: {basicSelected.join(', ') || '없음'}
          </Body>
        </Card>
        <CodeBlock
          language="tsx"
          code={`const [selected, setSelected] = useState<string[]>(['option2']);

<CheckboxGroup value={selected} onValueChange={setSelected}>
  <CheckboxGroupItem value="option1" label="옵션 1" />
  <CheckboxGroupItem value="option2" label="옵션 2" />
  <CheckboxGroupItem value="option3" label="옵션 3" />
  <CheckboxGroupItem value="option4" label="옵션 4" />
</CheckboxGroup>`}
        />
      </Section>

      {/* CheckboxGroup - 방향 */}
      <Section level="h2">
        <Heading
          level="h2"
          id="checkbox-group-orientation"
          title="CheckboxGroup 방향"
        />
        <Body className="mb-4">
          <Code>orientation</Code> prop으로 수직 또는 수평 배치를 선택할 수
          있습니다.
        </Body>
        <Card className="p-6 mb-4">
          <Body size="md" weight="semibold" className="mb-2">
            수평 배치 (Horizontal)
          </Body>
          <CheckboxGroup
            value={horizontalSelected}
            onValueChange={setHorizontalSelected}
            orientation="horizontal"
          >
            <CheckboxGroupItem value="mon" label="월" />
            <CheckboxGroupItem value="tue" label="화" />
            <CheckboxGroupItem value="wed" label="수" />
            <CheckboxGroupItem value="thu" label="목" />
            <CheckboxGroupItem value="fri" label="금" />
          </CheckboxGroup>
          <Body size="sm" className="text-krds-gray-70 mt-4">
            선택된 요일: {horizontalSelected.join(', ') || '없음'}
          </Body>
        </Card>
        <CodeBlock
          language="tsx"
          code={`<CheckboxGroup
  value={selected}
  onValueChange={setSelected}
  orientation="horizontal" // "vertical" | "horizontal"
>
  <CheckboxGroupItem value="mon" label="월" />
  <CheckboxGroupItem value="tue" label="화" />
  <CheckboxGroupItem value="wed" label="수" />
</CheckboxGroup>`}
        />
      </Section>

      {/* Status prop */}
      <Section level="h2">
        <Heading level="h2" id="status" title="Status" />
        <Body className="mb-4">
          <Code>status</Code> prop으로 에러 상태를 표시할 수 있습니다.
        </Body>
        <Card className="p-6 mb-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Checkbox id="error" status="error" />
              <label htmlFor="error" className="text-krds-body-md">
                에러 상태
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="error-checked" status="error" checked />
              <label htmlFor="error-checked" className="text-krds-body-md">
                에러 상태 (선택됨)
              </label>
            </div>
          </div>
        </Card>
        <CodeBlock
          language="tsx"
          code={`<Checkbox id="error" status="error" />
<Checkbox id="error-checked" status="error" checked />`}
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

        {/* 단일 체크박스 with FormField */}
        <Body size="md" weight="semibold" className="mb-2 mt-6">
          단일 체크박스
        </Body>
        <Card className="p-6 mb-4">
          <FormField id="single-checkbox" required>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={singleChecked}
                onCheckedChange={(checked) =>
                  setSingleChecked(checked as boolean)
                }
              />
              <FormLabel className="cursor-pointer">
                개인정보 수집 및 이용에 동의합니다 *
              </FormLabel>
            </div>
            <FormHelperText>
              서비스 이용을 위해 필수적으로 동의해야 합니다
            </FormHelperText>
          </FormField>
        </Card>
        <CodeBlock
          language="tsx"
          code={`<FormField id="terms" required>
  <div className="flex items-center gap-2">
    <Checkbox
      checked={checked}
      onCheckedChange={(checked) => setChecked(checked as boolean)}
    />
    <FormLabel className="cursor-pointer">
      개인정보 수집 및 이용에 동의합니다 *
    </FormLabel>
  </div>
  <FormHelperText>
    서비스 이용을 위해 필수적으로 동의해야 합니다
  </FormHelperText>
</FormField>`}
        />

        {/* CheckboxGroup with FormField */}
        <Body size="md" weight="semibold" className="mb-2 mt-6">
          CheckboxGroup
        </Body>
        <Card className="p-6 mb-4">
          <FormField id="interests" required>
            <FormLabel>관심 분야를 선택하세요 *</FormLabel>
            <CheckboxGroup
              value={basicSelected}
              onValueChange={setBasicSelected}
            >
              <CheckboxGroupItem value="design" label="디자인" />
              <CheckboxGroupItem value="development" label="개발" />
              <CheckboxGroupItem value="marketing" label="마케팅" />
              <CheckboxGroupItem value="business" label="비즈니스" />
            </CheckboxGroup>
            <FormHelperText>최소 1개 이상 선택해주세요</FormHelperText>
          </FormField>
        </Card>
        <CodeBlock
          language="tsx"
          code={`<FormField id="interests" required>
  <FormLabel>관심 분야를 선택하세요 *</FormLabel>
  <CheckboxGroup value={selected} onValueChange={setSelected}>
    <CheckboxGroupItem value="design" label="디자인" />
    <CheckboxGroupItem value="development" label="개발" />
    <CheckboxGroupItem value="marketing" label="마케팅" />
    <CheckboxGroupItem value="business" label="비즈니스" />
  </CheckboxGroup>
  <FormHelperText>최소 1개 이상 선택해주세요</FormHelperText>
</FormField>`}
        />

        {/* 에러 상태 */}
        <Body size="md" weight="semibold" className="mb-2 mt-6">
          에러 상태
        </Body>
        <Card className="p-6 mb-4">
          <FormField id="error-group" required status="error">
            <FormLabel>필수 항목 선택 *</FormLabel>
            <CheckboxGroup
              value={errorGroupValue}
              onValueChange={setErrorGroupValue}
            >
              <CheckboxGroupItem value="item1" label="항목 1" />
              <CheckboxGroupItem value="item2" label="항목 2" />
              <CheckboxGroupItem value="item3" label="항목 3" />
            </CheckboxGroup>
            <FormError>최소 1개 이상 선택해야 합니다</FormError>
          </FormField>
        </Card>
        <CodeBlock
          language="tsx"
          code={`<FormField id="required" required status="error">
  <FormLabel>필수 항목 선택 *</FormLabel>
  <CheckboxGroup value={value} onValueChange={setValue}>
    <CheckboxGroupItem value="item1" label="항목 1" />
    <CheckboxGroupItem value="item2" label="항목 2" />
    <CheckboxGroupItem value="item3" label="항목 3" />
  </CheckboxGroup>
  <FormError>최소 1개 이상 선택해야 합니다</FormError>
</FormField>`}
        />
      </Section>

      {/* 사용 가이드 */}
      <Section level="h2">
        <Heading level="h2" id="usage-guidelines" title="사용 가이드" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card className="p-4 border-l-4 border-krds-success-60">
            <Body size="md" weight="semibold" className="mb-2">
              ✓ 체크박스를 사용하는 경우
            </Body>
            <ul className="list-disc list-inside space-y-1 text-krds-body-md">
              <li>다중 선택이 필요한 경우</li>
              <li>예/아니오 선택이 필요한 경우</li>
              <li>약관 동의나 옵션 설정</li>
              <li>목록에서 여러 항목 선택</li>
              <li>독립적인 선택 옵션들</li>
            </ul>
          </Card>
          <Card className="p-4 border-l-4 border-krds-danger-60">
            <Body size="md" weight="semibold" className="mb-2">
              ✗ 체크박스를 사용하지 않는 경우
            </Body>
            <ul className="list-disc list-inside space-y-1 text-krds-body-md">
              <li>단일 선택만 필요한 경우 (Radio 사용)</li>
              <li>즉시 실행되는 토글 (Switch 사용)</li>
              <li>너무 많은 옵션 (Select 사용)</li>
              <li>상호 배타적인 선택</li>
            </ul>
          </Card>
        </div>
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
                <Code>Space</Code>
              </td>
              <td>체크박스 선택/해제</td>
            </tr>
            <tr>
              <td>
                <Code>Tab</Code>
              </td>
              <td>다음 포커스 가능한 요소로 이동</td>
            </tr>
            <tr>
              <td>
                <Code>Shift + Tab</Code>
              </td>
              <td>이전 포커스 가능한 요소로 이동</td>
            </tr>
          </tbody>
        </Table>

        <Body size="md" weight="semibold" className="mb-2">
          스크린 리더 지원
        </Body>
        <ul className="list-disc list-inside space-y-1 text-krds-body-md mb-6">
          <li>체크박스의 상태(선택됨/선택 안됨)를 정확히 전달</li>
          <li>
            <Code>FormField</Code>와 함께 사용 시 자동으로 label, error,
            helperText 연결
          </li>
          <li>필수 필드 여부를 aria-required로 전달</li>
          <li>에러 상태를 aria-invalid로 전달</li>
        </ul>

        <Body size="md" weight="semibold" className="mb-2">
          ARIA 속성
        </Body>
        <ul className="list-disc list-inside space-y-1 text-krds-body-md">
          <li>
            <Code>role="checkbox"</Code>: 체크박스 역할 명시
          </li>
          <li>
            <Code>aria-checked</Code>: 선택 상태 전달
          </li>
          <li>
            <Code>aria-invalid</Code>: 에러 상태 전달
          </li>
          <li>
            <Code>aria-required</Code>: 필수 필드 여부 전달
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
          Checkbox Props
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
                <Code>size</Code>
              </td>
              <td>
                <Code>"sm" | "md" | "lg"</Code>
              </td>
              <td>
                <Code>"md"</Code>
              </td>
              <td>체크박스 크기</td>
            </tr>
            <tr>
              <td>
                <Code>status</Code>
              </td>
              <td>
                <Code>"error" | "success" | "info"</Code>
              </td>
              <td>-</td>
              <td>체크박스 상태</td>
            </tr>
            <tr>
              <td>
                <Code>checked</Code>
              </td>
              <td>
                <Code>boolean</Code>
              </td>
              <td>-</td>
              <td>선택 상태 (제어 컴포넌트)</td>
            </tr>
            <tr>
              <td>
                <Code>defaultChecked</Code>
              </td>
              <td>
                <Code>boolean</Code>
              </td>
              <td>-</td>
              <td>초기 선택 상태 (비제어 컴포넌트)</td>
            </tr>
            <tr>
              <td>
                <Code>onCheckedChange</Code>
              </td>
              <td>
                <Code>(checked: boolean) =&gt; void</Code>
              </td>
              <td>-</td>
              <td>선택 상태 변경 시 호출</td>
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
              <td>비활성화 상태</td>
            </tr>
            <tr>
              <td>
                <Code>id</Code>
              </td>
              <td>
                <Code>string</Code>
              </td>
              <td>-</td>
              <td>체크박스 ID (label 연결용)</td>
            </tr>
          </tbody>
        </Table>

        <Body size="md" weight="semibold" className="mb-2 mt-6">
          CheckboxGroup Props
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
                <Code>string[]</Code>
              </td>
              <td>-</td>
              <td>선택된 값 배열 (제어 컴포넌트)</td>
            </tr>
            <tr>
              <td>
                <Code>defaultValue</Code>
              </td>
              <td>
                <Code>string[]</Code>
              </td>
              <td>
                <Code>[]</Code>
              </td>
              <td>초기 선택된 값 배열</td>
            </tr>
            <tr>
              <td>
                <Code>onValueChange</Code>
              </td>
              <td>
                <Code>(value: string[]) =&gt; void</Code>
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
              <td>그룹 내 모든 체크박스 크기</td>
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
          </tbody>
        </Table>

        <Body size="md" weight="semibold" className="mb-2 mt-6">
          CheckboxGroupItem Props
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
              <td>체크박스 값 (필수)</td>
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
      </Section>
    </Container>
  );
}
