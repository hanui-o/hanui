'use client';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';
import { ComponentPreview } from '@/components/content/ComponentPreview';

// UI components - from @hanui/react
import {
  Select as SelectComponent,
  FormField,
  FormLabel,
  FormError,
  FormHelperText,
  Body,
  Card,
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
  Label,
} from '@hanui/react';
import { useState } from 'react';

export default function SelectPage() {
  const [selectedValue, setSelectedValue] = useState('');

  const options = [
    { value: 'apple', label: '사과' },
    { value: 'banana', label: '바나나' },
    { value: 'orange', label: '오렌지' },
    { value: 'grape', label: '포도' },
    { value: 'strawberry', label: '딸기' },
  ];

  return (
    <>
      <Heading
        level="h1"
        title="Select"
        description="Radix UI 기반의 접근성을 고려한 선택 목록 컴포넌트입니다. 키보드 네비게이션과 스크린 리더를 완전히 지원합니다."
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
              Select는 여러 옵션 중 하나를 선택할 수 있는 컴포넌트입니다. Radix
              UI를 기반으로 구축되어 완전한 접근성과 키보드 네비게이션을
              제공합니다.
            </Body>
            <ComponentPreview>
              <div className="max-w-md">
                <SelectComponent
                  options={options}
                  value={selectedValue}
                  onChange={setSelectedValue}
                  placeholder="과일을 선택하세요"
                />
              </div>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`const options = [
  { value: 'apple', label: '사과' },
  { value: 'banana', label: '바나나' },
  { value: 'orange', label: '오렌지' },
];

<Select
  options={options}
  value={value}
  onChange={setValue}
  placeholder="과일을 선택하세요"
/>`}
            </Code>
          </Section>

          {/* 2. 설치 */}
          <Section level="h2">
            <Installation componentName="select" />
          </Section>

          {/* 3. 사용법 */}
          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Body className="mb-3">
              Select 컴포넌트를 import하여 사용합니다. options prop으로 선택
              가능한 항목들을 전달하고, value와 onChange로 상태를 관리합니다.
            </Body>
            <Code variant="block" language="tsx">
              {`import { Select } from '@hanui/react'

const options = [
  { value: 'seoul', label: '서울' },
  { value: 'busan', label: '부산' },
  { value: 'daegu', label: '대구' },
];

<Select
  options={options}
  value={value}
  onChange={setValue}
  placeholder="도시를 선택하세요"
/>`}
            </Code>
          </Section>

          {/* 4. 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            {/* FormField와 함께 사용 (권장) */}
            <Subsection level="h3">
              <Heading level="h3" title="FormField와 함께 사용 (권장)" />
              <Body className="mb-3">
                FormField를 사용하면 label, error, helper text를 일관되게
                관리하고 접근성 속성이 자동으로 연결됩니다. 폼에서 Select를
                사용할 때 권장하는 방법입니다.
              </Body>
              <ComponentPreview>
                <div className="max-w-md">
                  <FormField id="fruit-field" required>
                    <FormLabel>좋아하는 과일</FormLabel>
                    <SelectComponent
                      options={options}
                      value={selectedValue}
                      onChange={(value) =>
                        setSelectedValue(
                          Array.isArray(value) ? value[0] : value
                        )
                      }
                      placeholder="과일을 선택하세요"
                    />
                    <FormHelperText>
                      가장 좋아하는 과일을 하나 선택해주세요.
                    </FormHelperText>
                  </FormField>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`import { Select, FormField, FormLabel, FormHelperText } from '@hanui/react';

<FormField id="fruit" required>
  <FormLabel>좋아하는 과일</FormLabel>
  <Select
    options={options}
    value={value}
    onChange={setValue}
    placeholder="과일을 선택하세요"
  />
  <FormHelperText>
    가장 좋아하는 과일을 하나 선택해주세요.
  </FormHelperText>
</FormField>`}
              </Code>
            </Subsection>

            {/* 에러 상태 */}
            <Subsection level="h3">
              <Heading level="h3" title="에러 상태" />
              <Body className="mb-3">
                FormField의 status prop과 FormError를 사용하여 필수 선택 항목이
                선택되지 않았거나 유효하지 않을 때 에러 상태를 표시할 수
                있습니다. 에러 메시지가 자동으로 aria-describedby에 연결되어
                스크린 리더가 읽을 수 있습니다.
              </Body>
              <ComponentPreview>
                <div className="max-w-md">
                  <FormField id="city-field" required status="error">
                    <FormLabel>도시</FormLabel>
                    <SelectComponent
                      options={[
                        { value: 'seoul', label: '서울' },
                        { value: 'busan', label: '부산' },
                        { value: 'daegu', label: '대구' },
                      ]}
                      value=""
                      onChange={() => {}}
                      placeholder="도시를 선택하세요"
                    />
                    <FormError>필수 선택 항목입니다.</FormError>
                  </FormField>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`import { Select, FormField, FormLabel, FormError } from '@hanui/react';

<FormField id="city" required status="error">
  <FormLabel>도시</FormLabel>
  <Select
    options={cities}
    value={value}
    onChange={setValue}
    placeholder="도시를 선택하세요"
  />
  <FormError>필수 선택 항목입니다.</FormError>
</FormField>`}
              </Code>
            </Subsection>

            {/* 크기 */}
            <Subsection level="h3">
              <Heading level="h3" title="크기" />
              <Body className="mb-3">
                size prop으로 Select의 높이를 조절할 수 있습니다. 기본값은
                lg(56px)입니다.
              </Body>
              <ComponentPreview>
                <div className="max-w-md space-y-4">
                  <div className="space-y-1">
                    <Label className="text-sm text-krds-gray-60">
                      Large (56px) - 기본
                    </Label>
                    <SelectComponent
                      options={options}
                      value=""
                      onChange={() => {}}
                      placeholder="lg 사이즈"
                      size="lg"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm text-krds-gray-60">
                      Medium (48px)
                    </Label>
                    <SelectComponent
                      options={options}
                      value=""
                      onChange={() => {}}
                      placeholder="md 사이즈"
                      size="md"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm text-krds-gray-60">
                      Small (40px)
                    </Label>
                    <SelectComponent
                      options={options}
                      value=""
                      onChange={() => {}}
                      placeholder="sm 사이즈"
                      size="sm"
                    />
                  </div>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Select options={options} size="lg" />  {/* 56px - 기본값 */}
<Select options={options} size="md" />  {/* 48px */}
<Select options={options} size="sm" />  {/* 40px */}`}
              </Code>
            </Subsection>

            {/* 비활성화 */}
            <Subsection level="h3">
              <Heading level="h3" title="비활성화" />
              <Body className="mb-3">
                disabled prop으로 특정 조건이 충족되지 않아 선택을 받을 수 없을
                때 비활성화 상태를 표시할 수 있습니다.
              </Body>
              <ComponentPreview>
                <div className="max-w-md">
                  <SelectComponent
                    options={options}
                    value=""
                    onChange={() => {}}
                    placeholder="비활성화된 선택"
                    disabled
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Select
  options={options}
  value=""
  onChange={() => {}}
  placeholder="비활성화된 선택"
  disabled
/>`}
              </Code>
            </Subsection>

            {/* 사용 가이드 */}
            <Subsection level="h3">
              <Heading level="h3" title="사용 가이드" />
              <Body className="mb-4">
                Select를 효과적으로 사용하기 위한 가이드입니다:
              </Body>

              <Card variant="filled" className="mb-4">
                <Body weight="bold" className="mb-2">
                  Select를 사용하기 적합한 경우:
                </Body>
                <List variant="unordered" spacing="tight">
                  <ListItem>옵션이 5개 이상인 경우</ListItem>
                  <ListItem>국가, 도시 등 많은 선택지가 있는 경우</ListItem>
                  <ListItem>카테고리, 분류를 선택할 때</ListItem>
                  <ListItem>정렬 옵션 선택 (최신순, 인기순 등)</ListItem>
                </List>
              </Card>

              <Card variant="outlined" className="mb-4">
                <Body weight="bold" className="mb-2">
                  Select를 사용하지 말아야 하는 경우:
                </Body>
                <List variant="unordered" spacing="tight">
                  <ListItem>
                    선택지가 3개 이하인 경우 (Radio Button 사용)
                  </ListItem>
                  <ListItem>
                    모든 옵션을 한눈에 비교해야 하는 경우 (Radio Button 사용)
                  </ListItem>
                  <ListItem>
                    텍스트 입력이 필요한 경우 (Input with Autocomplete 사용)
                  </ListItem>
                </List>
              </Card>

              <Card variant="filled">
                <Body weight="bold" className="mb-2">
                  주의사항:
                </Body>
                <List variant="unordered" spacing="tight">
                  <ListItem>
                    <strong>논리적 순서:</strong> 알파벳순, 가나다순 등 예측
                    가능한 순서로 정렬하세요.
                  </ListItem>
                  <ListItem>
                    <strong>명확한 레이블:</strong> "선택하세요"가 아닌 "배송
                    국가를 선택하세요"처럼 구체적으로 작성하세요.
                  </ListItem>
                  <ListItem>
                    <strong>레이블 필수:</strong> label 요소로 명확한 레이블을
                    제공하세요.
                  </ListItem>
                </List>
              </Card>
            </Subsection>
          </Section>

          {/* 5. 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="Select는 WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다."
            />
            <List variant="check">
              <ListItem>
                <strong>Radix UI 기반:</strong> @radix-ui/react-select를
                사용하여 완전한 접근성과 ARIA 속성을 자동으로 제공합니다.
              </ListItem>
              <ListItem>
                <strong>FormField 통합:</strong> FormField와 함께 사용하면
                aria-invalid, aria-required, aria-describedby 속성이 자동으로
                연결되어 에러 메시지와 도움말을 스크린 리더가 읽을 수 있습니다.
              </ListItem>
              <ListItem>
                <strong>키보드 네비게이션:</strong> Arrow Up/Down (옵션 이동),
                Enter (선택), Escape (닫기), Space (열기) 키로 완전한 키보드
                탐색을 지원합니다.
              </ListItem>
              <ListItem>
                <strong>스크린 리더:</strong> role="combobox" 및 aria-expanded로
                드롭다운 상태를 전달하며, 선택된 옵션을 명확히 알립니다.
              </ListItem>
              <ListItem>
                <strong>Focus Management:</strong> 드롭다운 열기/닫기 시 자동
                포커스 관리 및 focus trap을 제공합니다.
              </ListItem>
              <ListItem>
                <strong>Type-ahead:</strong> 키보드 입력으로 옵션을 빠르게
                검색할 수 있습니다.
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
                      <Code>options</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        {`Array<{value: T, label: string}>`}
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>선택 가능한 옵션 목록 (필수)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>value</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">T</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>현재 선택된 값</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>onChange</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">{`(value: T) => void`}</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>값 변경 시 호출되는 함수</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>placeholder</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">&apos;선택하세요&apos;</Code>
                    </TableCell>
                    <TableCell>
                      값이 선택되지 않았을 때 표시되는 텍스트
                    </TableCell>
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
                  <TableRow>
                    <TableCell>
                      <Code>size</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        &apos;lg&apos; | &apos;md&apos; | &apos;sm&apos;
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">&apos;lg&apos;</Code>
                    </TableCell>
                    <TableCell>크기 (lg: 56px, md: 48px, sm: 40px)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>status</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        &apos;error&apos; | &apos;success&apos; |
                        &apos;info&apos;
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      상태 표시 (error: 에러, success: 성공, info: 정보)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>error</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">false</Code>
                    </TableCell>
                    <TableCell>
                      <span className="line-through opacity-60">
                        에러 상태 표시
                      </span>{' '}
                      <Code className="text-xs">deprecated</Code> -
                      status=&quot;error&quot; 사용 권장
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>label</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      <span className="line-through opacity-60">
                        선택 목록의 레이블
                      </span>{' '}
                      <Code className="text-xs">deprecated</Code> - FormLabel
                      컴포넌트 사용 권장
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>className</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="SelectOption Type" />
              <Code variant="block" language="tsx">
                {`interface SelectOption<T = string> {
  value: T;           // 옵션 값
  label: string;      // 표시될 텍스트
  disabled?: boolean; // 비활성화 여부
  group?: string;     // 그룹 이름 (선택사항)
}`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Radix UI 기능" />
              <Body className="mb-3">
                Select 컴포넌트는 @radix-ui/react-select를 기반으로 다음
                기능들을 자동으로 제공합니다:
              </Body>
              <List variant="unordered" spacing="tight">
                <ListItem>
                  <strong>자동 ARIA:</strong> role, aria-expanded, aria-controls
                  등이 자동으로 적용됩니다.
                </ListItem>
                <ListItem>
                  <strong>포커스 관리:</strong> 드롭다운 열기/닫기 시 자동
                  포커스 관리
                </ListItem>
                <ListItem>
                  <strong>키보드 단축키:</strong> Arrow Up/Down (옵션 이동),
                  Enter (선택), Escape (닫기), Space (열기)
                </ListItem>
                <ListItem>
                  <strong>Type-ahead:</strong> 키보드 입력으로 옵션 검색
                </ListItem>
                <ListItem>
                  <strong>Portal 렌더링:</strong> 드롭다운이 올바른 z-index로
                  표시됨
                </ListItem>
              </List>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{
          title: 'Section Heading System',
          href: '/components/section-heading-system',
        }}
        next={{ title: 'Side Navigation', href: '/components/side-navigation' }}
      />
    </>
  );
}
