'use client';

import React, { useState } from 'react';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';

// UI components - from @hanui/react
import {
  Combobox,
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
  type ComboboxOption,
} from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import {
  Palette,
  Code as CodeIcon,
  FileText,
  Settings,
  Users,
} from 'lucide-react';

// 기본 옵션
const basicOptions: ComboboxOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'SolidJS' },
];

// 아이콘 포함 옵션
const iconOptions: ComboboxOption[] = [
  { value: 'design', label: '디자인', icon: <Palette className="h-4 w-4" /> },
  {
    value: 'development',
    label: '개발',
    icon: <CodeIcon className="h-4 w-4" />,
  },
  { value: 'document', label: '문서', icon: <FileText className="h-4 w-4" /> },
  { value: 'settings', label: '설정', icon: <Settings className="h-4 w-4" /> },
  { value: 'team', label: '팀', icon: <Users className="h-4 w-4" /> },
];

// 그룹화된 옵션
const groupedOptions: ComboboxOption[] = [
  { value: 'seoul', label: '서울', group: '수도권' },
  { value: 'incheon', label: '인천', group: '수도권' },
  { value: 'gyeonggi', label: '경기', group: '수도권' },
  { value: 'busan', label: '부산', group: '영남권' },
  { value: 'daegu', label: '대구', group: '영남권' },
  { value: 'ulsan', label: '울산', group: '영남권' },
];

// 설명 포함 옵션
const descriptionOptions: ComboboxOption[] = [
  {
    value: 'standard',
    label: '표준 요금제',
    description: '월 10,000원, 기본 기능 제공',
  },
  {
    value: 'pro',
    label: '프로 요금제',
    description: '월 30,000원, 추가 기능 및 우선 지원',
  },
  {
    value: 'enterprise',
    label: '엔터프라이즈',
    description: '맞춤 가격, 전담 지원 및 SLA',
  },
];

export default function ComboboxPage() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [value5, setValue5] = useState('');
  const [value6, setValue6] = useState('');

  return (
    <>
      <Heading
        level="h1"
        title="Combobox"
        description="검색 가능한 드롭다운 선택 컴포넌트입니다. 많은 옵션 중에서 빠르게 검색하여 선택할 수 있습니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview">
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />
            <ComponentPreview>
              <div className="max-w-xs">
                <Combobox
                  options={basicOptions}
                  value={value1}
                  onValueChange={setValue1}
                  placeholder="프레임워크 선택"
                />
              </div>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<Combobox
  options={options}
  value={value}
  onValueChange={setValue}
  placeholder="프레임워크 선택"
/>`}
            </Code>
          </Section>

          <Section level="h2">
            <Installation componentName="combobox" />
          </Section>

          <Section level="h2">
            <Heading
              level="h2"
              id="usage"
              title="사용법"
              description="Combobox와 ComboboxOption 타입을 import하여 사용합니다. options 배열과 value/onValueChange로 상태를 관리합니다."
            />
            <Code variant="block" language="tsx">
              {`import { Combobox, type ComboboxOption } from '@/components/hanui'

const options: ComboboxOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
];

<Combobox
  options={options}
  value={value}
  onValueChange={setValue}
  placeholder="프레임워크 선택"
/>`}
            </Code>
          </Section>

          {/* 예제 섹션 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading
                level="h3"
                title="크기"
                description="sm, md, lg 세 가지 크기를 제공합니다."
              />
              <ComponentPreview>
                <div className="max-w-xs space-y-3">
                  <Combobox
                    options={basicOptions}
                    placeholder="Small"
                    size="sm"
                  />
                  <Combobox
                    options={basicOptions}
                    placeholder="Medium"
                    size="md"
                  />
                  <Combobox
                    options={basicOptions}
                    placeholder="Large"
                    size="lg"
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Combobox options={options} placeholder="Small" size="sm" />
<Combobox options={options} placeholder="Medium" size="md" />
<Combobox options={options} placeholder="Large" size="lg" />`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="아이콘"
                description="옵션에 아이콘을 추가하여 시각적 구분을 제공합니다."
              />
              <ComponentPreview>
                <div className="max-w-xs">
                  <Combobox
                    options={iconOptions}
                    value={value2}
                    onValueChange={setValue2}
                    placeholder="카테고리 선택"
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`import { Palette, Code, FileText } from 'lucide-react';

const options = [
  { value: 'design', label: '디자인', icon: <Palette className="h-4 w-4" /> },
  { value: 'development', label: '개발', icon: <Code className="h-4 w-4" /> },
];

<Combobox
  options={options}
  value={value}
  onValueChange={setValue}
  placeholder="카테고리 선택"
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="그룹"
                description="옵션을 그룹별로 분류하여 표시합니다."
              />
              <ComponentPreview>
                <div className="max-w-xs">
                  <Combobox
                    options={groupedOptions}
                    value={value3}
                    onValueChange={setValue3}
                    placeholder="지역 선택"
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`const options = [
  { value: 'seoul', label: '서울', group: '수도권' },
  { value: 'busan', label: '부산', group: '영남권' },
];

<Combobox
  options={options}
  value={value}
  onValueChange={setValue}
  placeholder="지역 선택"
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="설명"
                description="옵션에 추가 설명을 표시합니다."
              />
              <ComponentPreview>
                <div className="max-w-sm">
                  <Combobox
                    options={descriptionOptions}
                    value={value4}
                    onValueChange={setValue4}
                    placeholder="요금제 선택"
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`const options = [
  {
    value: 'standard',
    label: '표준 요금제',
    description: '월 10,000원, 기본 기능 제공',
  },
];

<Combobox options={options} placeholder="요금제 선택" />`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="선택 해제"
                description="clearable 속성으로 선택 해제 버튼을 표시합니다."
              />
              <ComponentPreview>
                <div className="max-w-xs">
                  <Combobox
                    options={basicOptions}
                    value={value5}
                    onValueChange={setValue5}
                    placeholder="프레임워크 선택"
                    clearable
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Combobox
  options={options}
  value={value}
  onValueChange={setValue}
  placeholder="프레임워크 선택"
  clearable
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="상태"
                description="에러, 비활성화, 로딩 등 다양한 상태를 표현합니다."
              />
              <ComponentPreview>
                <div className="max-w-xs space-y-3">
                  <Combobox
                    options={basicOptions}
                    placeholder="에러 상태"
                    variant="error"
                  />
                  <Combobox
                    options={basicOptions}
                    placeholder="비활성화"
                    disabled
                  />
                  <Combobox
                    options={basicOptions}
                    value={value6}
                    onValueChange={setValue6}
                    placeholder="로딩 상태"
                    loading
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Combobox options={options} placeholder="에러 상태" variant="error" />
<Combobox options={options} placeholder="비활성화" disabled />
<Combobox options={options} placeholder="로딩 상태" loading />`}
              </Code>
            </Subsection>
          </Section>

          {/* 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="WCAG 2.1 / KWCAG 2.2 AA 기준을 준수합니다."
            />
            <List variant="check" className="text-krds-gray-90">
              <ListItem>
                <strong>ARIA 속성:</strong> <Code>role="combobox"</Code>,{' '}
                <Code>aria-expanded</Code>, <Code>aria-haspopup</Code> 적용
              </ListItem>
              <ListItem>
                <strong>키보드 탐색:</strong> 화살표 키로 옵션 탐색, Enter로
                선택, Escape로 닫기
              </ListItem>
              <ListItem>
                <strong>검색 기능:</strong> 많은 옵션에서 빠르게 필터링하여 선택
                가능
              </ListItem>
              <ListItem>
                <strong>포커스 관리:</strong> 팝오버 열림/닫힘 시 적절한 포커스
                이동
              </ListItem>
              <ListItem>
                <strong>레이블 연결:</strong> <Code>aria-label</Code> 또는{' '}
                <Code>aria-labelledby</Code>로 레이블 연결 지원
              </ListItem>
            </List>
          </Section>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

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
                    <TableCell className="font-mono">
                      <Code>options</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">ComboboxOption[]</Code>
                    </TableCell>
                    <TableCell>필수</TableCell>
                    <TableCell>옵션 목록</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>value</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>선택된 값</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>onValueChange</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        (value: string) =&gt; void
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>값 변경 콜백</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>placeholder</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>'선택해주세요'</TableCell>
                    <TableCell>플레이스홀더</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>variant</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">'default' | 'error'</Code>
                    </TableCell>
                    <TableCell>'default'</TableCell>
                    <TableCell>스타일 variant</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>size</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">'sm' | 'md' | 'lg'</Code>
                    </TableCell>
                    <TableCell>'md'</TableCell>
                    <TableCell>크기</TableCell>
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
                      <Code>clearable</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>선택 해제 버튼 표시</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>loading</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>로딩 상태</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
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
              <Heading level="h3" title="ComboboxOption Interface" />
              <Code variant="block" language="typescript">
                {`interface ComboboxOption {
  value: string;        // 옵션 값
  label: string;        // 표시될 레이블
  disabled?: boolean;   // 비활성화 여부
  group?: string;       // 그룹 (선택적)
  icon?: React.ReactNode; // 아이콘 (선택적)
  description?: string; // 설명 (선택적)
}`}
              </Code>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Code', href: '/components/code' }}
        next={{ title: 'Container', href: '/components/container' }}
      />
    </>
  );
}
