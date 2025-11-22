'use client';

// Docs layout components
import {
  PageSection as Section,
  SectionHeading,
  Subsection,
  PageNavigation,
} from '@/components/content';

// Docs helper components
import { DoCard, DontCard } from '@/components/helpers';

// UI components - from @hanui/react
import {
  Select as SelectComponent,
  Body,
  Stack,
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
} from '@hanui/react';
import { useState } from 'react';

export default function SelectPage() {
  const [selectedValue, setSelectedValue] = useState('');
  const [multipleValues, setMultipleValues] = useState<string[]>([]);

  const options = [
    { value: 'apple', label: '사과' },
    { value: 'banana', label: '바나나' },
    { value: 'orange', label: '오렌지' },
    { value: 'grape', label: '포도' },
    { value: 'strawberry', label: '딸기' },
  ];

  return (
    <>
      <SectionHeading
        level="h1"
        title="Select"
        description="접근성을 고려한 선택 목록 컴포넌트입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Installation */}
          <Section>
            <SectionHeading level="h2" id="installation" title="설치">
              <Body className="leading-relaxed">
                다음 명령어로 Select 컴포넌트를 설치합니다:
              </Body>
            </SectionHeading>
            <Code variant="block" language="bash" showLineNumbers={false}>
              npx @hanui/cli add select
            </Code>
          </Section>

          {/* What is it */}
          <Section>
            <SectionHeading
              level="h2"
              id="what-is-it"
              title="무엇인가요?"
              description="Select는 여러 옵션 중 하나 또는 여러 개를 선택할 수 있는 컴포넌트입니다. Radix UI를 기반으로 구축되어 완전한 접근성과 키보드 네비게이션을 제공합니다."
            />
            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>Radix UI 기반:</strong> @radix-ui/react-select를
                  사용하여 완전한 접근성을 보장합니다.
                </ListItem>
                <ListItem>
                  <strong>다중 선택:</strong> multiple prop으로 여러 항목을
                  동시에 선택할 수 있습니다.
                </ListItem>
                <ListItem>
                  <strong>키보드 네비게이션:</strong> Arrow, Enter, Escape 키로
                  완전한 키보드 탐색을 지원합니다.
                </ListItem>
                <ListItem>
                  <strong>에러 상태:</strong> error prop으로 유효성 검사 결과를
                  표시합니다.
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* Preview */}
          <Section>
            <SectionHeading level="h2" id="preview" title="미리보기" />
            <Card>
              <div className="max-w-md">
                <SelectComponent
                  options={options}
                  value={selectedValue}
                  onChange={(value) =>
                    setSelectedValue(Array.isArray(value) ? value[0] : value)
                  }
                  placeholder="과일을 선택하세요"
                />
              </div>
            </Card>
            <Code variant="block" language="tsx">
              {`const options = [
  { value: 'apple', label: '사과' },
  { value: 'banana', label: '바나나' },
];

<Select
  options={options}
  value={value}
  onChange={setValue}
  placeholder="과일을 선택하세요"
/>`}
            </Code>
          </Section>

          {/* Usage */}
          <Section>
            <SectionHeading level="h2" id="usage" title="사용 방법" />

            {/* With Label */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="with-label"
                title="라벨 포함"
                description="모든 선택 목록에는 명확한 레이블이 필요합니다."
              />
              <Card>
                <div className="max-w-md space-y-2">
                  <label htmlFor="fruit-select" className="block font-medium">
                    좋아하는 과일
                  </label>
                  <SelectComponent
                    options={options}
                    value=""
                    onChange={() => {}}
                    placeholder="과일을 선택하세요"
                  />
                </div>
              </Card>
              <Code variant="block" language="tsx">
                {`<label className="block font-medium">
  좋아하는 과일
</label>
<Select
  options={options}
  value={value}
  onChange={setValue}
  placeholder="과일을 선택하세요"
/>`}
              </Code>
            </Subsection>

            {/* Multiple Selection */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="multiple"
                title="다중 선택"
                description="여러 항목을 동시에 선택해야 할 때 사용합니다."
              />
              <Card>
                <div className="max-w-md">
                  <SelectComponent
                    options={options}
                    value={multipleValues}
                    onChange={(value) =>
                      setMultipleValues(Array.isArray(value) ? value : [value])
                    }
                    placeholder="여러 과일을 선택하세요"
                    multiple
                  />
                </div>
              </Card>
              <Code variant="block" language="tsx">
                {`<Select
  options={options}
  value={multipleValues}
  onChange={setMultipleValues}
  placeholder="여러 과일을 선택하세요"
  multiple
/>`}
              </Code>
            </Subsection>

            {/* Error State */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="error"
                title="에러 상태"
                description="필수 선택 항목이 선택되지 않았거나 유효하지 않을 때 표시합니다."
              />
              <Card>
                <div className="max-w-md space-y-2">
                  <SelectComponent
                    options={options}
                    value=""
                    onChange={() => {}}
                    placeholder="과일을 선택하세요"
                    error
                  />
                  <Body size="sm" className="text-krds-danger-text">
                    필수 선택 항목입니다.
                  </Body>
                </div>
              </Card>
              <Code variant="block" language="tsx">
                {`<Select
  options={options}
  value=""
  onChange={() => {}}
  placeholder="과일을 선택하세요"
  error
/>
<p className="text-krds-danger-text">필수 선택 항목입니다.</p>`}
              </Code>
            </Subsection>

            {/* Disabled */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="disabled"
                title="비활성화"
                description="특정 조건이 충족되지 않아 선택을 받을 수 없을 때 사용합니다."
              />
              <Card>
                <div className="max-w-md">
                  <SelectComponent
                    options={options}
                    value=""
                    onChange={() => {}}
                    placeholder="비활성화된 선택"
                    disabled
                  />
                </div>
              </Card>
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
          </Section>

          {/* Best Practices */}
          <Section>
            <SectionHeading level="h2" id="best-practices" title="모범 사례" />
            <Stack gap="md">
              <DoCard title="Select를 사용하기 적합한 경우">
                <List variant="check">
                  <ListItem>옵션이 5개 이상인 경우</ListItem>
                  <ListItem>국가, 도시 등 많은 선택지가 있는 경우</ListItem>
                  <ListItem>카테고리, 분류를 선택할 때</ListItem>
                  <ListItem>정렬 옵션 선택 (최신순, 인기순 등)</ListItem>
                </List>
              </DoCard>

              <Card variant="warning">
                <SectionHeading level="h3" id="caution" title="주의사항" />
                <List variant="check" className="text-krds-gray-90">
                  <ListItem>
                    <strong>논리적 순서:</strong> 알파벳순, 가나다순 등 예측
                    가능한 순서로 정렬하세요.
                  </ListItem>
                  <ListItem>
                    <strong>명확한 레이블:</strong> &quot;선택하세요&quot;가
                    아닌 &quot;배송 국가를 선택하세요&quot;처럼 구체적으로
                    작성하세요.
                  </ListItem>
                  <ListItem>
                    <strong>레이블 필수:</strong> label 요소로 명확한 레이블을
                    제공하세요.
                  </ListItem>
                </List>
              </Card>

              <DontCard title="Select를 사용하지 말아야 하는 경우">
                <List variant="cross">
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
              </DontCard>
            </Stack>
          </Section>

          {/* Accessibility */}
          <Section>
            <SectionHeading
              level="h2"
              id="accessibility"
              title="접근성"
              description="Select는 WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다."
            />
            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>Radix UI 기반:</strong> 완전한 접근성과 ARIA 속성을
                  자동으로 제공합니다.
                </ListItem>
                <ListItem>
                  <strong>키보드 네비게이션:</strong> Arrow, Enter, Escape,
                  Space 키로 탐색할 수 있습니다.
                </ListItem>
                <ListItem>
                  <strong>스크린 리더:</strong> role=&quot;combobox&quot; 및
                  aria-expanded로 상태를 전달합니다.
                </ListItem>
                <ListItem>
                  <strong>Focus Management:</strong> 자동 포커스 관리 및 focus
                  trap을 제공합니다.
                </ListItem>
              </List>
            </Card>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section>
            <SectionHeading
              level="h2"
              id="api-reference"
              title="API 레퍼런스"
            />

            {/* Props */}
            <Subsection level="h3">
              <SectionHeading level="h3" id="props" title="Props" />
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
                      <Code>options</Code>
                    </TableCell>
                    <TableCell>
                      <Code>{`Array<{value: T, label: string}>`}</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>선택 가능한 옵션 목록</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>value</Code>
                    </TableCell>
                    <TableCell>
                      <Code>T | T[]</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>현재 선택된 값 (단일 또는 다중)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>onChange</Code>
                    </TableCell>
                    <TableCell>
                      <Code>{`(value: T | T[]) => void`}</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>값 변경 시 호출되는 함수</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>placeholder</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      값이 선택되지 않았을 때 표시되는 텍스트
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>multiple</Code>
                    </TableCell>
                    <TableCell>
                      <Code>boolean</Code>
                    </TableCell>
                    <TableCell>
                      <Code>false</Code>
                    </TableCell>
                    <TableCell>다중 선택 가능 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>searchable</Code>
                    </TableCell>
                    <TableCell>
                      <Code>boolean</Code>
                    </TableCell>
                    <TableCell>
                      <Code>false</Code>
                    </TableCell>
                    <TableCell>검색/필터 기능 활성화</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>disabled</Code>
                    </TableCell>
                    <TableCell>
                      <Code>boolean</Code>
                    </TableCell>
                    <TableCell>
                      <Code>false</Code>
                    </TableCell>
                    <TableCell>비활성화 상태</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>error</Code>
                    </TableCell>
                    <TableCell>
                      <Code>boolean</Code>
                    </TableCell>
                    <TableCell>
                      <Code>false</Code>
                    </TableCell>
                    <TableCell>에러 상태 표시</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>label</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>선택 목록의 레이블</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>className</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            {/* Radix UI Features */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="radix-features"
                title="Radix UI 기능"
              />
              <Card variant="info">
                <List variant="check" className="text-krds-gray-90">
                  <ListItem>
                    <strong>@radix-ui/react-select:</strong> Radix UI Select
                    Primitive를 기반으로 구축되었습니다.
                  </ListItem>
                  <ListItem>
                    <strong>자동 ARIA:</strong> role, aria-expanded,
                    aria-controls 등이 자동으로 적용됩니다.
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
                </List>
              </Card>
            </Subsection>

            {/* KRDS Compliance */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="krds-compliance"
                title="KRDS 준수사항"
              />
              <Card variant="info">
                <List variant="check" className="text-krds-gray-90">
                  <ListItem>Radix UI 기반으로 완전한 접근성 보장</ListItem>
                  <ListItem>
                    키보드 네비게이션 완전 지원 (Arrow, Enter, Escape)
                  </ListItem>
                  <ListItem>
                    스크린 리더 완전 지원 (ARIA 속성 자동 적용)
                  </ListItem>
                  <ListItem>
                    Focus indicator로 현재 포커스 위치 명확히 표시
                  </ListItem>
                  <ListItem>
                    명도 대비 4.5:1 이상 (WCAG 2.1 / KWCAG 2.2 Level AA)
                  </ListItem>
                </List>
              </Card>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{
          title: 'Section Heading System',
          href: '/components/section-heading-system',
        }}
        next={{ title: 'Side Navigation', href: '/components/sidenavigation' }}
      />
    </>
  );
}
