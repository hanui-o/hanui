'use client';

import { useState } from 'react';
import {
  Heading,
  PageSection,
  Subsection,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';
import { ComponentPreview } from '@/components/content/ComponentPreview';

import {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupItem,
  ChipCheckbox,
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

export default function CheckboxPage() {
  const [termsChecked, setTermsChecked] = useState(false);
  const [basicSelected, setBasicSelected] = useState<string[]>(['option2']);
  const [horizontalSelected, setHorizontalSelected] = useState<string[]>([]);
  const [errorGroupValue, setErrorGroupValue] = useState<string[]>([]);

  return (
    <>
      <Heading
        level="h1"
        id="checkbox"
        title="Checkbox"
        description="사용자가 여러 옵션 중 하나 이상을 선택할 수 있는 컴포넌트입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview">
          {/* 1. 개요 */}
          <PageSection level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              description="Checkbox는 단일 선택(동의/비동의) 및 다중 선택을 지원합니다. CheckboxGroup으로 여러 체크박스를 그룹화하고, FormField와 통합하여 폼 검증 및 접근성을 제공합니다."
              className="sr-only"
            />
            <ComponentPreview>
              <div className="flex flex-col gap-4">
                <Checkbox
                  label="이용약관에 동의합니다"
                  checked={termsChecked}
                  onCheckedChange={(checked) =>
                    setTermsChecked(checked as boolean)
                  }
                />
                <CheckboxGroup
                  value={basicSelected}
                  onValueChange={setBasicSelected}
                  orientation="horizontal"
                >
                  <CheckboxGroupItem value="option1" label="옵션 1" />
                  <CheckboxGroupItem value="option2" label="옵션 2" />
                  <CheckboxGroupItem value="option3" label="옵션 3" />
                </CheckboxGroup>
              </div>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<Checkbox
  label="이용약관에 동의합니다"
  checked={checked}
  onCheckedChange={setChecked}
/>

<CheckboxGroup value={selected} onValueChange={setSelected}>
  <CheckboxGroupItem value="option1" label="옵션 1" />
  <CheckboxGroupItem value="option2" label="옵션 2" />
</CheckboxGroup>`}
            </Code>
          </PageSection>

          {/* 2. 설치 */}
          <PageSection level="h2">
            <Installation componentName="checkbox" />
          </PageSection>

          {/* 3. 사용법 */}
          <PageSection level="h2">
            <Heading
              level="h2"
              id="usage"
              title="사용법"
              description="Checkbox, CheckboxGroup, CheckboxGroupItem을 import하여 사용합니다. FormField와 함께 사용하면 접근성과 폼 검증을 자동으로 처리합니다."
            />
            <Code variant="block" language="tsx">
              {`import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@hanui/react'

// 단일 체크박스 (label prop 사용)
<Checkbox label="동의합니다" checked={checked} onCheckedChange={setChecked} />

// 그룹 체크박스
<CheckboxGroup value={selected} onValueChange={setSelected}>
  <CheckboxGroupItem value="a" label="옵션 A" />
  <CheckboxGroupItem value="b" label="옵션 B" />
</CheckboxGroup>`}
            </Code>
          </PageSection>

          {/* 4. 예제 */}
          <PageSection level="h2">
            <Heading level="h2" id="examples" title="예제" />

            {/* 기본 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="기본"
                description="체크박스의 기본 상태와 설명 텍스트를 표시합니다."
              />
              <ComponentPreview>
                <div className="flex flex-col gap-6">
                  {/* 상태 표시 */}
                  <div className="flex flex-wrap items-center gap-4">
                    <Checkbox label="기본" />
                    <Checkbox label="선택됨" defaultChecked />
                    <Checkbox label="비활성화" disabled />
                    <Checkbox label="선택된 비활성화" disabled defaultChecked />
                  </div>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Checkbox label="기본" />
<Checkbox label="선택됨" defaultChecked />
<Checkbox label="비활성화" disabled />
<Checkbox label="선택된 비활성화" disabled defaultChecked />`}
              </Code>
            </Subsection>

            {/* 사이즈 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="사이즈"
                description="md(20px), lg(24px) 두 가지 크기를 지원합니다."
              />
              <ComponentPreview>
                <div className="flex flex-wrap items-center gap-6">
                  <Checkbox size="md" label="사이즈 : medium" />
                  <Checkbox size="lg" label="사이즈 : large" />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Checkbox size="md" label="Medium" />  {/* 20px - 기본값 */}
<Checkbox size="lg" label="Large" />   {/* 24px */}`}
              </Code>
            </Subsection>

            {/* chip */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="chip"
                description="칩 스타일의 체크박스로, 필터나 태그 선택에 적합합니다."
              />
              <ComponentPreview>
                <div className="flex flex-wrap items-center gap-3">
                  <ChipCheckbox
                    label={
                      <span>
                        chip 상태 :<br />
                        default
                      </span>
                    }
                  />
                  <ChipCheckbox
                    label={
                      <span>
                        chip 상태 :<br />
                        checked
                      </span>
                    }
                    defaultChecked
                  />
                  <ChipCheckbox
                    label={
                      <span>
                        chip 상태 :<br />
                        disabled
                      </span>
                    }
                    disabled
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`import { ChipCheckbox } from '@hanui/react'

<ChipCheckbox label="기본" />
<ChipCheckbox label="선택됨" defaultChecked />
<ChipCheckbox label="비활성화" disabled />`}
              </Code>
            </Subsection>

            {/* CheckboxGroup */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="CheckboxGroup"
                description="여러 체크박스를 그룹화하여 다중 선택을 관리합니다."
              />
              <ComponentPreview>
                <CheckboxGroup
                  value={basicSelected}
                  onValueChange={setBasicSelected}
                >
                  <CheckboxGroupItem value="option1" label="옵션 1" />
                  <CheckboxGroupItem value="option2" label="옵션 2" />
                  <CheckboxGroupItem value="option3" label="옵션 3" />
                  <CheckboxGroupItem
                    value="option4"
                    label="옵션 4 (비활성화)"
                    disabled
                  />
                </CheckboxGroup>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`const [selected, setSelected] = useState<string[]>(['option2']);

<CheckboxGroup value={selected} onValueChange={setSelected}>
  <CheckboxGroupItem value="option1" label="옵션 1" />
  <CheckboxGroupItem value="option2" label="옵션 2" />
  <CheckboxGroupItem value="option3" label="옵션 3" />
  <CheckboxGroupItem value="option4" label="옵션 4" disabled />
</CheckboxGroup>`}
              </Code>
            </Subsection>

            {/* 방향 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="방향"
                description="orientation prop으로 수직(vertical) 또는 수평(horizontal) 배치를 선택합니다."
              />
              <ComponentPreview>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-krds-gray-60 mb-2">
                      수평 (horizontal)
                    </p>
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
                  </div>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<CheckboxGroup orientation="horizontal">
  <CheckboxGroupItem value="mon" label="월" />
  <CheckboxGroupItem value="tue" label="화" />
  <CheckboxGroupItem value="wed" label="수" />
</CheckboxGroup>`}
              </Code>
            </Subsection>

            {/* FormField 통합 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="FormField 통합"
                description="FormField와 함께 사용하면 레이블, 도움말, 에러 메시지가 자동으로 연결됩니다."
              />
              <ComponentPreview>
                <div className="space-y-6 w-full max-w-sm">
                  <FormField id="interests" required>
                    <FormLabel>관심 분야 *</FormLabel>
                    <CheckboxGroup
                      value={basicSelected}
                      onValueChange={setBasicSelected}
                    >
                      <CheckboxGroupItem value="design" label="디자인" />
                      <CheckboxGroupItem value="development" label="개발" />
                      <CheckboxGroupItem value="marketing" label="마케팅" />
                    </CheckboxGroup>
                    <FormHelperText>최소 1개 이상 선택하세요</FormHelperText>
                  </FormField>

                  <FormField id="required-group" required status="error">
                    <FormLabel>필수 선택 *</FormLabel>
                    <CheckboxGroup
                      value={errorGroupValue}
                      onValueChange={setErrorGroupValue}
                    >
                      <CheckboxGroupItem value="item1" label="항목 1" />
                      <CheckboxGroupItem value="item2" label="항목 2" />
                    </CheckboxGroup>
                    <FormError>필수 항목입니다</FormError>
                  </FormField>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<FormField id="interests" required>
  <FormLabel>관심 분야 *</FormLabel>
  <CheckboxGroup value={selected} onValueChange={setSelected}>
    <CheckboxGroupItem value="design" label="디자인" />
    <CheckboxGroupItem value="development" label="개발" />
  </CheckboxGroup>
  <FormHelperText>최소 1개 이상 선택하세요</FormHelperText>
</FormField>

<FormField id="required" required status="error">
  <FormLabel>필수 선택 *</FormLabel>
  <CheckboxGroup value={value} onValueChange={setValue}>
    <CheckboxGroupItem value="item1" label="항목 1" />
  </CheckboxGroup>
  <FormError>필수 항목입니다</FormError>
</FormField>`}
              </Code>
            </Subsection>
          </PageSection>

          {/* 5. 접근성 */}
          <PageSection level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="Checkbox는 WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다."
            />
            <List variant="check">
              <ListItem>
                <strong>키보드 지원:</strong> Space로 선택/해제, Tab으로 포커스
                이동이 가능합니다.
              </ListItem>
              <ListItem>
                <strong>스크린리더:</strong> 체크박스 상태(선택됨/해제됨)를
                정확히 전달합니다.
              </ListItem>
              <ListItem>
                <strong>FormField 통합:</strong> aria-describedby로 도움말 및
                에러 메시지가 자동 연결됩니다.
              </ListItem>
              <ListItem>
                명도 대비 4.5:1 이상을 준수하여 시각적 접근성을 보장합니다.
              </ListItem>
            </List>
          </PageSection>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
          <PageSection level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="Checkbox Props" />
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
                    <TableCell className="font-mono">
                      <Code>label</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">React.ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      레이블 텍스트 (제공 시 label과 함께 렌더링)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>labelPosition</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">'right' | 'left'</Code>
                    </TableCell>
                    <TableCell>'right'</TableCell>
                    <TableCell>레이블 위치</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>size</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">'sm' | 'md' | 'lg'</Code>
                    </TableCell>
                    <TableCell>'md'</TableCell>
                    <TableCell>체크박스 크기</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>status</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'error' | 'success' | 'info'
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>상태 표시</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>checked</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>선택 상태 (제어)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>defaultChecked</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>초기 선택 상태 (비제어)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>onCheckedChange</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        (checked: boolean) =&gt; void
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>상태 변경 콜백</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>disabled</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>비활성화</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="CheckboxGroup Props" />
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
                    <TableCell className="font-mono">
                      <Code>value</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string[]</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>선택된 값 배열 (제어)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>defaultValue</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string[]</Code>
                    </TableCell>
                    <TableCell>[]</TableCell>
                    <TableCell>초기 선택 값 (비제어)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>onValueChange</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        (value: string[]) =&gt; void
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>값 변경 콜백</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>orientation</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">'vertical' | 'horizontal'</Code>
                    </TableCell>
                    <TableCell>'vertical'</TableCell>
                    <TableCell>배치 방향</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>size</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">'sm' | 'md' | 'lg'</Code>
                    </TableCell>
                    <TableCell>'md'</TableCell>
                    <TableCell>그룹 내 체크박스 크기</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>disabled</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>전체 그룹 비활성화</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="CheckboxGroupItem Props" />
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
                    <TableCell className="font-mono">
                      <Code>value</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>체크박스 값 (필수)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>label</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">React.ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>라벨 텍스트 (필수)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>disabled</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>개별 항목 비활성화</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="ChipCheckbox Props" />
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
                    <TableCell className="font-mono">
                      <Code>label</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">React.ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>체크박스 레이블 (필수)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>checked</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>선택 상태 (제어)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>defaultChecked</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>기본 선택 상태 (비제어)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>onCheckedChange</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        (checked: boolean) =&gt; void
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>상태 변경 콜백</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>disabled</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>비활성화</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>value</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>폼 제출용 값</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="키보드 접근성" />
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
                      <Code>Space</Code>
                    </TableCell>
                    <TableCell>체크박스 선택/해제</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>Tab</Code>
                    </TableCell>
                    <TableCell>다음 요소로 포커스 이동</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>Shift + Tab</Code>
                    </TableCell>
                    <TableCell>이전 요소로 포커스 이동</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </PageSection>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Center', href: '/components/center' }}
        next={{ title: 'Code', href: '/components/code' }}
      />
    </>
  );
}
