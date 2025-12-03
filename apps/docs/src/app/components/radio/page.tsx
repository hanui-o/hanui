'use client';

import React, { useState } from 'react';

// Docs layout components
import {
  PageSection as Section,
  Subsection,
  Heading,
  PageNavigation,
  Installation,
  ComponentPreview,
} from '@/components/content';

// Docs helper components
import { DoCard, DontCard } from '@/components/helpers';

// UI components - from @hanui/react
import {
  RadioGroup,
  RadioGroupItem,
  Radio,
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
  List,
  ListItem,
  FormField,
  FormLabel,
  FormHelperText,
  FormError,
} from '@hanui/react';

export default function RadioPage() {
  const [basicValue, setBasicValue] = useState('option1');
  const [sizeValue, setSizeValue] = useState('md');
  const [orientationValue, setOrientationValue] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [errorValue, setErrorValue] = useState('');

  return (
    <>
      <Heading
        level="h1"
        title="Radio"
        description="KRDS 기반의 라디오 버튼 컴포넌트입니다. 여러 옵션 중 하나만 선택할 수 있는 단일 선택에 사용되며 FormField와 통합되어 폼 검증 및 접근성을 제공합니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Overview */}
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />

            <ComponentPreview>
              <RadioGroup value={basicValue} onValueChange={setBasicValue}>
                <Radio value="option1" label="옵션 1" />
                <Radio value="option2" label="옵션 2" />
                <Radio value="option3" label="옵션 3" />
              </RadioGroup>
            </ComponentPreview>

            <Code variant="block" language="tsx">
              {`<RadioGroup value={value} onValueChange={setValue}>
  <Radio value="option1" label="옵션 1" />
  <Radio value="option2" label="옵션 2" />
  <Radio value="option3" label="옵션 3" />
</RadioGroup>`}
            </Code>
          </Section>

          <Installation componentName="radio" />

          {/* Usage */}
          <Section level="h2">
            <Heading
              level="h2"
              id="usage"
              title="사용법"
              description="RadioGroup과 Radio 컴포넌트를 사용하여 단일 선택 옵션을 구현합니다."
            />

            <Code variant="block" language="tsx">
              {`import { RadioGroup, Radio } from '@/components/hanui';

const [value, setValue] = useState('option1');

<RadioGroup value={value} onValueChange={setValue}>
  <Radio value="option1" label="옵션 1" />
  <Radio value="option2" label="옵션 2" />
  <Radio value="option3" label="옵션 3" />
</RadioGroup>`}
            </Code>
          </Section>

          {/* Examples */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            {/* Basic Usage */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="기본 사용"
                description="RadioGroup과 Radio 컴포넌트를 사용한 기본 예제입니다."
              />
              <ComponentPreview>
                <RadioGroup value={basicValue} onValueChange={setBasicValue}>
                  <Radio value="option1" label="옵션 1" />
                  <Radio value="option2" label="옵션 2" />
                  <Radio value="option3" label="옵션 3" />
                </RadioGroup>
                <p className="text-sm text-krds-gray-70 mt-4">
                  선택된 값: {basicValue}
                </p>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`const [value, setValue] = useState('option1');

<RadioGroup value={value} onValueChange={setValue}>
  <Radio value="option1" label="옵션 1" />
  <Radio value="option2" label="옵션 2" />
  <Radio value="option3" label="옵션 3" />
</RadioGroup>`}
              </Code>
            </Subsection>

            {/* Custom Label */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="RadioGroupItem (커스텀 라벨)"
                description="더 복잡한 라벨이나 커스텀 스타일이 필요한 경우 RadioGroupItem을 직접 사용할 수 있습니다."
              />
              <ComponentPreview>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="card" id="card" />
                    <label htmlFor="card" className="cursor-pointer">
                      <span className="text-base font-semibold">신용카드</span>
                      <span className="text-sm text-krds-gray-70 block">
                        VISA, Mastercard, 국내 카드
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="bank" id="bank" />
                    <label htmlFor="bank" className="cursor-pointer">
                      <span className="text-base font-semibold">계좌이체</span>
                      <span className="text-sm text-krds-gray-70 block">
                        실시간 계좌이체
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="phone" id="phone" />
                    <label htmlFor="phone" className="cursor-pointer">
                      <span className="text-base font-semibold">
                        휴대폰 결제
                      </span>
                      <span className="text-sm text-krds-gray-70 block">
                        통신사 결제
                      </span>
                    </label>
                  </div>
                </RadioGroup>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<RadioGroup value={value} onValueChange={setValue}>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="card" id="card" />
    <label htmlFor="card" className="cursor-pointer">
      <span className="text-base font-semibold">신용카드</span>
      <span className="text-sm text-krds-gray-70 block">
        VISA, Mastercard, 국내 카드
      </span>
    </label>
  </div>
  {/* ... */}
</RadioGroup>`}
              </Code>
            </Subsection>

            {/* Sizes */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="Size"
                description="sm (16px), md (20px), lg (24px) 3가지 크기를 지원합니다."
              />
              <ComponentPreview>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-semibold mb-2">Small (sm)</p>
                    <RadioGroup
                      value={sizeValue}
                      onValueChange={setSizeValue}
                      size="sm"
                    >
                      <Radio value="sm" label="Small" />
                    </RadioGroup>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2">
                      Medium (md) - 기본값
                    </p>
                    <RadioGroup
                      value={sizeValue}
                      onValueChange={setSizeValue}
                      size="md"
                    >
                      <Radio value="md" label="Medium" />
                    </RadioGroup>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2">Large (lg)</p>
                    <RadioGroup
                      value={sizeValue}
                      onValueChange={setSizeValue}
                      size="lg"
                    >
                      <Radio value="lg" label="Large" />
                    </RadioGroup>
                  </div>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<RadioGroup size="sm">
  <Radio value="option1" label="옵션 1" />
</RadioGroup>

<RadioGroup size="md"> {/* 기본값 */}
  <Radio value="option1" label="옵션 1" />
</RadioGroup>

<RadioGroup size="lg">
  <Radio value="option1" label="옵션 1" />
</RadioGroup>`}
              </Code>
            </Subsection>

            {/* Orientation */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="Orientation"
                description="orientation prop으로 가로(기본값) 또는 세로 배치를 선택할 수 있습니다."
              />
              <ComponentPreview>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-semibold mb-2">
                      Horizontal (기본값)
                    </p>
                    <RadioGroup
                      value={orientationValue}
                      onValueChange={setOrientationValue}
                    >
                      <Radio value="yes" label="예" />
                      <Radio value="no" label="아니오" />
                      <Radio value="maybe" label="모름" />
                    </RadioGroup>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2">Vertical</p>
                    <RadioGroup
                      value={orientationValue}
                      onValueChange={setOrientationValue}
                      orientation="vertical"
                    >
                      <Radio value="yes" label="예" />
                      <Radio value="no" label="아니오" />
                      <Radio value="maybe" label="모름" />
                    </RadioGroup>
                  </div>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`// 가로 배치 (기본값)
<RadioGroup value={value} onValueChange={setValue}>
  <Radio value="yes" label="예" />
  <Radio value="no" label="아니오" />
</RadioGroup>

// 세로 배치
<RadioGroup orientation="vertical" value={value} onValueChange={setValue}>
  <Radio value="yes" label="예" />
  <Radio value="no" label="아니오" />
</RadioGroup>`}
              </Code>
            </Subsection>

            {/* Status */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="상태 (Status)"
                description="status prop으로 에러 상태를 표시할 수 있습니다."
              />
              <ComponentPreview>
                <RadioGroup status="error">
                  <Radio value="opt1" label="에러 상태 옵션 1" />
                  <Radio value="opt2" label="에러 상태 옵션 2" />
                </RadioGroup>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<RadioGroup status="error">
  <Radio value="opt1" label="에러 상태 옵션 1" />
  <Radio value="opt2" label="에러 상태 옵션 2" />
</RadioGroup>`}
              </Code>
            </Subsection>

            {/* FormField Integration */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="FormField 통합"
                description="FormField와 함께 사용하면 자동으로 접근성 속성이 연결되며 폼 검증을 쉽게 구현할 수 있습니다."
              />
              <ComponentPreview>
                <div className="space-y-6">
                  <FormField id="gender" required>
                    <FormLabel>성별 *</FormLabel>
                    <RadioGroup
                      value={basicValue}
                      onValueChange={setBasicValue}
                    >
                      <Radio value="male" label="남성" />
                      <Radio value="female" label="여성" />
                      <Radio value="other" label="기타" />
                    </RadioGroup>
                    <FormHelperText>
                      서비스 이용 통계에 활용됩니다
                    </FormHelperText>
                  </FormField>

                  <FormField id="subscription" required status="error">
                    <FormLabel>구독 플랜 *</FormLabel>
                    <RadioGroup
                      value={errorValue}
                      onValueChange={setErrorValue}
                    >
                      <Radio value="free" label="무료" />
                      <Radio value="basic" label="베이직 (월 9,900원)" />
                      <Radio value="premium" label="프리미엄 (월 19,900원)" />
                    </RadioGroup>
                    <FormError>구독 플랜을 선택해주세요</FormError>
                  </FormField>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<FormField id="gender" required>
  <FormLabel>성별 *</FormLabel>
  <RadioGroup value={value} onValueChange={setValue}>
    <Radio value="male" label="남성" />
    <Radio value="female" label="여성" />
  </RadioGroup>
  <FormHelperText>서비스 이용 통계에 활용됩니다</FormHelperText>
</FormField>

<FormField id="subscription" required status="error">
  <FormLabel>구독 플랜 *</FormLabel>
  <RadioGroup value={value} onValueChange={setValue}>
    <Radio value="free" label="무료" />
    <Radio value="basic" label="베이직" />
  </RadioGroup>
  <FormError>구독 플랜을 선택해주세요</FormError>
</FormField>`}
              </Code>
            </Subsection>
          </Section>

          {/* Usage Guidelines */}
          <Section level="h2">
            <Heading level="h2" id="usage-guidelines" title="사용 가이드" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <DoCard title="라디오 버튼을 사용하는 경우">
                <List>
                  <ListItem>상호 배타적인 옵션 중 하나 선택</ListItem>
                  <ListItem>2~7개 사이의 옵션</ListItem>
                  <ListItem>모든 옵션을 한눈에 보여줄 때</ListItem>
                  <ListItem>옵션 간 비교가 필요한 경우</ListItem>
                  <ListItem>기본값이 있는 단일 선택</ListItem>
                </List>
              </DoCard>
              <DontCard title="라디오 버튼을 사용하지 않는 경우">
                <List>
                  <ListItem>다중 선택이 필요한 경우 (Checkbox 사용)</ListItem>
                  <ListItem>옵션이 7개 이상인 경우 (Select 사용)</ListItem>
                  <ListItem>예/아니오만 있는 경우 (Switch 고려)</ListItem>
                  <ListItem>옵션이 동적으로 변하는 경우</ListItem>
                </List>
              </DontCard>
            </div>
          </Section>

          {/* Checkbox vs Radio */}
          <Section level="h2">
            <Heading
              level="h2"
              id="checkbox-vs-radio"
              title="Checkbox vs Radio"
              description="Checkbox와 Radio의 차이점을 이해하고 적절히 사용하세요."
            />

            <Table small>
              <TableHeader>
                <TableRow>
                  <TableHead>구분</TableHead>
                  <TableHead>Checkbox</TableHead>
                  <TableHead>Radio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>선택 방식</TableCell>
                  <TableCell>다중 선택 가능</TableCell>
                  <TableCell>단일 선택만 가능</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>선택 해제</TableCell>
                  <TableCell>개별 해제 가능</TableCell>
                  <TableCell>다른 옵션 선택으로만 변경</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>기본 상태</TableCell>
                  <TableCell>선택 안 됨이 가능</TableCell>
                  <TableCell>보통 하나가 선택됨</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>사용 예</TableCell>
                  <TableCell>관심사 선택, 동의 항목</TableCell>
                  <TableCell>성별, 결제 방법, 플랜 선택</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Section>

          {/* Accessibility */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="WCAG 2.1 / KWCAG 2.2 AA 기준을 준수합니다."
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
                    <TableCell>라디오 그룹으로 포커스 이동</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>↑</Code> / <Code>↓</Code>
                    </TableCell>
                    <TableCell>수직 그룹에서 이전/다음 옵션 선택</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>←</Code> / <Code>→</Code>
                    </TableCell>
                    <TableCell>수평 그룹에서 이전/다음 옵션 선택</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>Space</Code>
                    </TableCell>
                    <TableCell>현재 포커스된 옵션 선택</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="스크린 리더 지원" />
              <List variant="unordered">
                <ListItem>라디오 그룹의 역할과 현재 선택된 옵션 안내</ListItem>
                <ListItem>
                  <Code>FormField</Code>와 함께 사용 시 label, error, helperText
                  자동 연결
                </ListItem>
                <ListItem>
                  필수 필드 여부를 <Code>aria-required</Code>로 전달
                </ListItem>
                <ListItem>
                  에러 상태를 <Code>aria-invalid</Code>로 전달
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="ARIA 속성" />
              <List variant="unordered">
                <ListItem>
                  <Code>role=&quot;radiogroup&quot;</Code>: 라디오 그룹 역할
                  명시
                </ListItem>
                <ListItem>
                  <Code>role=&quot;radio&quot;</Code>: 개별 라디오 버튼 역할
                </ListItem>
                <ListItem>
                  <Code>aria-checked</Code>: 선택 상태 전달
                </ListItem>
                <ListItem>
                  <Code>aria-invalid</Code>: 에러 상태 전달
                </ListItem>
                <ListItem>
                  <Code>aria-describedby</Code>: helper text, error 메시지 연결
                </ListItem>
              </List>
            </Subsection>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          {/* RadioGroup Props */}
          <Section level="h2">
            <Heading
              level="h2"
              id="radiogroup-props"
              title="RadioGroup Props"
            />

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
                  <TableCell>
                    <Code>value</Code>
                  </TableCell>
                  <TableCell>
                    <Code>string</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>선택된 값 (제어 컴포넌트)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>defaultValue</Code>
                  </TableCell>
                  <TableCell>
                    <Code>string</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>초기 선택 값 (비제어 컴포넌트)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>onValueChange</Code>
                  </TableCell>
                  <TableCell>
                    <Code>(value: string) =&gt; void</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>값 변경 시 호출</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>orientation</Code>
                  </TableCell>
                  <TableCell>
                    <Code>&quot;horizontal&quot; | &quot;vertical&quot;</Code>
                  </TableCell>
                  <TableCell>
                    <Code>&quot;horizontal&quot;</Code>
                  </TableCell>
                  <TableCell>배치 방향</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>size</Code>
                  </TableCell>
                  <TableCell>
                    <Code>
                      &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;
                    </Code>
                  </TableCell>
                  <TableCell>
                    <Code>&quot;md&quot;</Code>
                  </TableCell>
                  <TableCell>라디오 크기</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>status</Code>
                  </TableCell>
                  <TableCell>
                    <Code>
                      &quot;error&quot; | &quot;success&quot; | &quot;info&quot;
                    </Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>상태 표시</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>disabled</Code>
                  </TableCell>
                  <TableCell>
                    <Code>boolean</Code>
                  </TableCell>
                  <TableCell>false</TableCell>
                  <TableCell>전체 그룹 비활성화</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Section>

          {/* Radio Props */}
          <Section level="h2">
            <Heading level="h2" id="radio-props" title="Radio Props" />

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
                  <TableCell>
                    <Code>value</Code>
                  </TableCell>
                  <TableCell>
                    <Code>string</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>라디오 값 (필수)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>label</Code>
                  </TableCell>
                  <TableCell>
                    <Code>React.ReactNode</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>라벨 텍스트 (필수)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>disabled</Code>
                  </TableCell>
                  <TableCell>
                    <Code>boolean</Code>
                  </TableCell>
                  <TableCell>false</TableCell>
                  <TableCell>개별 항목 비활성화</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Section>

          {/* RadioGroupItem Props */}
          <Section level="h2">
            <Heading
              level="h2"
              id="radiogroupitem-props"
              title="RadioGroupItem Props"
              description="커스텀 라벨이 필요한 경우 사용하는 저수준 컴포넌트입니다."
            />

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
                  <TableCell>
                    <Code>value</Code>
                  </TableCell>
                  <TableCell>
                    <Code>string</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>라디오 값 (필수)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>id</Code>
                  </TableCell>
                  <TableCell>
                    <Code>string</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>라디오 ID (label 연결용)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>size</Code>
                  </TableCell>
                  <TableCell>
                    <Code>
                      &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;
                    </Code>
                  </TableCell>
                  <TableCell>그룹 상속</TableCell>
                  <TableCell>개별 크기 설정</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>status</Code>
                  </TableCell>
                  <TableCell>
                    <Code>
                      &quot;error&quot; | &quot;success&quot; | &quot;info&quot;
                    </Code>
                  </TableCell>
                  <TableCell>그룹 상속</TableCell>
                  <TableCell>개별 상태 설정</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>disabled</Code>
                  </TableCell>
                  <TableCell>
                    <Code>boolean</Code>
                  </TableCell>
                  <TableCell>false</TableCell>
                  <TableCell>개별 항목 비활성화</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Progress', href: '/components/progress' }}
        next={{
          title: 'Section Heading System',
          href: '/components/section-heading-system',
        }}
      />
    </>
  );
}
