'use client';

import React, { useState } from 'react';
import {
  Switch,
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

export default function SwitchPage() {
  const [basicChecked, setBasicChecked] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <Container className="py-8">
      <Heading level="h1" id="switch" title="Switch" className="mb-4" />
      <Body size="lg" className="mb-8">
        KRDS 기반의 스위치 컴포넌트입니다. 즉시 적용되는 켜기/끄기 상태 전환에
        사용되며 FormField와 통합되어 폼 검증 및 접근성을 제공합니다.
      </Body>

      {/* 기본 사용법 */}
      <Section level="h2">
        <Heading level="h2" id="basic-usage" title="기본 사용법" />
        <Body className="mb-4">
          기본 스위치는 라벨 없이 단독으로 사용할 수 있습니다.
        </Body>
        <Card className="p-6 mb-4">
          <div className="flex items-center gap-4">
            <Switch
              checked={basicChecked}
              onCheckedChange={setBasicChecked}
              id="basic"
            />
            <Body size="md">상태: {basicChecked ? '켜짐' : '꺼짐'}</Body>
          </div>
        </Card>
        <CodeBlock
          language="tsx"
          code={`const [checked, setChecked] = useState(false);

<Switch
  checked={checked}
  onCheckedChange={setChecked}
  id="basic"
/>`}
        />
      </Section>

      {/* 라벨 포함 */}
      <Section level="h2">
        <Heading level="h2" id="with-label" title="라벨 포함" />
        <Body className="mb-4">
          <Code>label</Code> prop을 사용하면 라벨이 포함된 스위치를 쉽게 만들 수
          있습니다. <Code>labelPosition</Code>으로 라벨 위치를 조정할 수
          있습니다.
        </Body>
        <Card className="p-6 mb-4">
          <div className="space-y-4">
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
              id="notifications"
              label="알림 받기"
              labelPosition="right"
            />
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
              id="darkMode"
              label="다크 모드"
              labelPosition="left"
            />
          </div>
        </Card>
        <CodeBlock
          language="tsx"
          code={`{/* 라벨이 오른쪽 (기본값) */}
<Switch
  checked={notifications}
  onCheckedChange={setNotifications}
  id="notifications"
  label="알림 받기"
  labelPosition="right"
/>

{/* 라벨이 왼쪽 */}
<Switch
  checked={darkMode}
  onCheckedChange={setDarkMode}
  id="darkMode"
  label="다크 모드"
  labelPosition="left"
/>`}
        />
      </Section>

      {/* 크기 변형 */}
      <Section level="h2">
        <Heading level="h2" id="sizes" title="크기" />
        <Body className="mb-4">
          3가지 크기를 제공합니다: <Code>sm</Code>, <Code>md</Code> (기본값),{' '}
          <Code>lg</Code>.
        </Body>
        <Card className="p-6 mb-4">
          <div className="space-y-4">
            <Switch size="sm" label="Small" id="size-sm" defaultChecked />
            <Switch
              size="md"
              label="Medium (기본값)"
              id="size-md"
              defaultChecked
            />
            <Switch size="lg" label="Large" id="size-lg" defaultChecked />
          </div>
        </Card>
        <CodeBlock
          language="tsx"
          code={`<Switch size="sm" label="Small" />
<Switch size="md" label="Medium (기본값)" />
<Switch size="lg" label="Large" />`}
        />
      </Section>

      {/* 비활성화 상태 */}
      <Section level="h2">
        <Heading level="h2" id="disabled" title="비활성화 상태" />
        <Body className="mb-4">
          <Code>disabled</Code> prop으로 스위치를 비활성화할 수 있습니다.
        </Body>
        <Card className="p-6 mb-4">
          <div className="space-y-4">
            <Switch disabled label="비활성화 (꺼짐)" id="disabled-off" />
            <Switch
              disabled
              defaultChecked
              label="비활성화 (켜짐)"
              id="disabled-on"
            />
          </div>
        </Card>
        <CodeBlock
          language="tsx"
          code={`<Switch disabled label="비활성화 (꺼짐)" />
<Switch disabled defaultChecked label="비활성화 (켜짐)" />`}
        />
      </Section>

      {/* Status prop */}
      <Section level="h2">
        <Heading level="h2" id="status" title="Status" />
        <Body className="mb-4">
          <Code>status</Code> prop으로 에러 상태를 표시할 수 있습니다.
        </Body>
        <Card className="p-6 mb-4">
          <div className="space-y-4">
            <Switch
              status="error"
              label="에러 상태"
              id="error-switch"
              defaultChecked
            />
          </div>
        </Card>
        <CodeBlock
          language="tsx"
          code={`<Switch status="error" label="에러 상태" defaultChecked />`}
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
          <FormField id="auto-save">
            <div className="flex items-center justify-between">
              <div>
                <FormLabel>자동 저장</FormLabel>
                <FormHelperText>변경사항을 자동으로 저장합니다</FormHelperText>
              </div>
              <Switch checked={autoSave} onCheckedChange={setAutoSave} />
            </div>
          </FormField>
        </Card>
        <CodeBlock
          language="tsx"
          code={`<FormField id="auto-save">
  <div className="flex items-center justify-between">
    <div>
      <FormLabel>자동 저장</FormLabel>
      <FormHelperText>변경사항을 자동으로 저장합니다</FormHelperText>
    </div>
    <Switch checked={autoSave} onCheckedChange={setAutoSave} />
  </div>
</FormField>`}
        />

        {/* 에러 상태 */}
        <Body size="md" weight="semibold" className="mb-2 mt-6">
          에러 상태
        </Body>
        <Card className="p-6 mb-4">
          <FormField id="marketing" status="error">
            <div className="flex items-center justify-between">
              <div>
                <FormLabel>마케팅 정보 수신</FormLabel>
                <FormError>필수 동의 항목입니다</FormError>
              </div>
              <Switch checked={marketing} onCheckedChange={setMarketing} />
            </div>
          </FormField>
        </Card>
        <CodeBlock
          language="tsx"
          code={`<FormField id="marketing" status="error">
  <div className="flex items-center justify-between">
    <div>
      <FormLabel>마케팅 정보 수신</FormLabel>
      <FormError>필수 동의 항목입니다</FormError>
    </div>
    <Switch checked={marketing} onCheckedChange={setMarketing} />
  </div>
</FormField>`}
        />
      </Section>

      {/* 설정 패널 예제 */}
      <Section level="h2">
        <Heading level="h2" id="settings-example" title="설정 패널 예제" />
        <Body className="mb-4">실제 설정 화면에서 사용되는 패턴입니다.</Body>
        <Card className="p-6 mb-4">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-krds-gray-20">
              <div>
                <Body size="md" weight="semibold">
                  푸시 알림
                </Body>
                <Body size="sm" className="text-krds-gray-70">
                  새로운 소식을 푸시 알림으로 받습니다
                </Body>
              </div>
              <Switch id="push" defaultChecked />
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-krds-gray-20">
              <div>
                <Body size="md" weight="semibold">
                  이메일 알림
                </Body>
                <Body size="sm" className="text-krds-gray-70">
                  주간 뉴스레터를 이메일로 받습니다
                </Body>
              </div>
              <Switch id="email" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Body size="md" weight="semibold">
                  SMS 알림
                </Body>
                <Body size="sm" className="text-krds-gray-70">
                  중요한 알림을 SMS로 받습니다
                </Body>
              </div>
              <Switch id="sms" />
            </div>
          </div>
        </Card>
      </Section>

      {/* 사용 가이드 */}
      <Section level="h2">
        <Heading level="h2" id="usage-guidelines" title="사용 가이드" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card className="p-4 border-l-4 border-krds-success-60">
            <Body size="md" weight="semibold" className="mb-2">
              ✓ 스위치를 사용하는 경우
            </Body>
            <ul className="list-disc list-inside space-y-1 text-krds-body-md">
              <li>즉시 적용되는 설정 변경</li>
              <li>켜기/끄기 토글</li>
              <li>기능 활성화/비활성화</li>
              <li>실시간으로 결과가 반영되는 옵션</li>
              <li>독립적인 설정 항목</li>
            </ul>
          </Card>
          <Card className="p-4 border-l-4 border-krds-danger-60">
            <Body size="md" weight="semibold" className="mb-2">
              ✗ 스위치를 사용하지 않는 경우
            </Body>
            <ul className="list-disc list-inside space-y-1 text-krds-body-md">
              <li>저장 버튼이 필요한 폼 (Checkbox 사용)</li>
              <li>여러 옵션 중 선택 (Radio 사용)</li>
              <li>다중 선택 (Checkbox 사용)</li>
              <li>약관 동의 (Checkbox 사용)</li>
            </ul>
          </Card>
        </div>
      </Section>

      {/* Switch vs Checkbox */}
      <Section level="h2">
        <Heading
          level="h2"
          id="switch-vs-checkbox"
          title="Switch vs Checkbox"
        />
        <Body className="mb-4">
          Switch와 Checkbox의 차이점을 이해하고 적절히 사용하세요.
        </Body>
        <Table>
          <thead>
            <tr>
              <th>구분</th>
              <th>Switch</th>
              <th>Checkbox</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>적용 시점</td>
              <td>즉시 적용</td>
              <td>저장 버튼 클릭 후 적용</td>
            </tr>
            <tr>
              <td>시각적 피드백</td>
              <td>명확한 켜짐/꺼짐 상태</td>
              <td>체크 표시</td>
            </tr>
            <tr>
              <td>사용 맥락</td>
              <td>설정, 환경설정</td>
              <td>폼, 동의, 다중 선택</td>
            </tr>
            <tr>
              <td>물리적 비유</td>
              <td>조명 스위치</td>
              <td>체크리스트</td>
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
                <Code>Space</Code>
              </td>
              <td>스위치 상태 전환</td>
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
          <li>스위치의 상태(켜짐/꺼짐)를 정확히 전달</li>
          <li>
            <Code>FormField</Code>와 함께 사용 시 label, error, helperText 자동
            연결
          </li>
          <li>상태 변경 시 변경된 상태를 즉시 안내</li>
        </ul>

        <Body size="md" weight="semibold" className="mb-2">
          ARIA 속성
        </Body>
        <ul className="list-disc list-inside space-y-1 text-krds-body-md">
          <li>
            <Code>role="switch"</Code>: 스위치 역할 명시
          </li>
          <li>
            <Code>aria-checked</Code>: 켜짐/꺼짐 상태 전달
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
          Switch Props
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
                <Code>size</Code>
              </td>
              <td>
                <Code>"sm" | "md" | "lg"</Code>
              </td>
              <td>
                <Code>"md"</Code>
              </td>
              <td>스위치 크기</td>
            </tr>
            <tr>
              <td>
                <Code>status</Code>
              </td>
              <td>
                <Code>"error" | "success" | "info"</Code>
              </td>
              <td>-</td>
              <td>스위치 상태</td>
            </tr>
            <tr>
              <td>
                <Code>checked</Code>
              </td>
              <td>
                <Code>boolean</Code>
              </td>
              <td>-</td>
              <td>켜짐 상태 (제어 컴포넌트)</td>
            </tr>
            <tr>
              <td>
                <Code>defaultChecked</Code>
              </td>
              <td>
                <Code>boolean</Code>
              </td>
              <td>-</td>
              <td>초기 켜짐 상태 (비제어 컴포넌트)</td>
            </tr>
            <tr>
              <td>
                <Code>onCheckedChange</Code>
              </td>
              <td>
                <Code>(checked: boolean) =&gt; void</Code>
              </td>
              <td>-</td>
              <td>상태 변경 시 호출</td>
            </tr>
            <tr>
              <td>
                <Code>label</Code>
              </td>
              <td>
                <Code>React.ReactNode</Code>
              </td>
              <td>-</td>
              <td>라벨 텍스트</td>
            </tr>
            <tr>
              <td>
                <Code>labelPosition</Code>
              </td>
              <td>
                <Code>"left" | "right"</Code>
              </td>
              <td>
                <Code>"right"</Code>
              </td>
              <td>라벨 위치</td>
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
              <td>스위치 ID (label 연결용)</td>
            </tr>
          </tbody>
        </Table>
      </Section>
    </Container>
  );
}
