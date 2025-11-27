'use client';

import React, { useState } from 'react';
import {
  Combobox,
  Body,
  Code,
  Heading,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  type ComboboxOption,
} from '@hanui/react';
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

// 비활성화 옵션 포함
const disabledOptions: ComboboxOption[] = [
  { value: 'option1', label: '선택 가능' },
  { value: 'option2', label: '선택 불가', disabled: true },
  { value: 'option3', label: '선택 가능' },
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
      <Heading level="h1">Combobox</Heading>
      <Body className="text-krds-gray-60 mb-8">
        검색 가능한 드롭다운 선택 컴포넌트입니다. 많은 옵션 중에서 빠르게
        검색하여 선택할 수 있습니다.
      </Body>

      {/* 기본 사용 */}
      <section className="space-y-4">
        <Heading level="h2">기본 사용</Heading>
        <Body className="mb-4">검색 가능한 드롭다운 선택 컴포넌트입니다.</Body>
        <div className="p-6 border border-krds-gray-20 rounded-lg flex flex-col items-center justify-center min-h-[200px]">
          <div className="max-w-xs">
            <Combobox
              options={basicOptions}
              value={value1}
              onValueChange={setValue1}
              placeholder="프레임워크 선택"
            />
          </div>
          <Body className="mt-2 text-sm text-krds-gray-50">
            선택된 값: {value1 || '없음'}
          </Body>
        </div>
        <Code variant="block" language="tsx">{`const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
];

<Combobox
  options={options}
  value={value}
  onValueChange={setValue}
  placeholder="프레임워크 선택"
/>`}</Code>
      </section>

      {/* 크기 */}
      <section className="space-y-4">
        <Heading level="h2">크기</Heading>
        <Body className="mb-4">sm, md, lg 세 가지 크기를 지원합니다.</Body>
        <div className="p-6 border border-krds-gray-20 rounded-lg flex items-center justify-center min-h-[200px]">
          <div className="max-w-xs space-y-3">
            <Combobox options={basicOptions} placeholder="Small" size="sm" />
            <Combobox options={basicOptions} placeholder="Medium" size="md" />
            <Combobox options={basicOptions} placeholder="Large" size="lg" />
          </div>
        </div>
        <Code
          variant="block"
          language="tsx"
        >{`<Combobox options={options} placeholder="Small" size="sm" />
<Combobox options={options} placeholder="Medium" size="md" />
<Combobox options={options} placeholder="Large" size="lg" />`}</Code>
      </section>

      {/* 아이콘 포함 */}
      <section className="space-y-4">
        <Heading level="h2">아이콘 포함</Heading>
        <Body className="mb-4">각 옵션에 아이콘을 추가할 수 있습니다.</Body>
        <div className="p-6 border border-krds-gray-20 rounded-lg flex items-center justify-center min-h-[200px]">
          <div className="max-w-xs">
            <Combobox
              options={iconOptions}
              value={value2}
              onValueChange={setValue2}
              placeholder="카테고리 선택"
            />
          </div>
        </div>
        <Code
          variant="block"
          language="tsx"
        >{`import { Palette, Code, FileText } from 'lucide-react';

const options = [
  { value: 'design', label: '디자인', icon: <Palette className="h-4 w-4" /> },
  { value: 'development', label: '개발', icon: <Code className="h-4 w-4" /> },
];

<Combobox
  options={options}
  value={value}
  onValueChange={setValue}
  placeholder="카테고리 선택"
/>`}</Code>
      </section>

      {/* 그룹화 */}
      <section className="space-y-4">
        <Heading level="h2">그룹화</Heading>
        <Body className="mb-4">
          옵션을 그룹별로 정리하여 표시할 수 있습니다.
        </Body>
        <div className="p-6 border border-krds-gray-20 rounded-lg flex items-center justify-center min-h-[200px]">
          <div className="max-w-xs">
            <Combobox
              options={groupedOptions}
              value={value3}
              onValueChange={setValue3}
              placeholder="지역 선택"
            />
          </div>
        </div>
        <Code variant="block" language="tsx">{`const options = [
  { value: 'seoul', label: '서울', group: '수도권' },
  { value: 'busan', label: '부산', group: '영남권' },
];

<Combobox
  options={options}
  value={value}
  onValueChange={setValue}
  placeholder="지역 선택"
/>`}</Code>
      </section>

      {/* 설명 포함 */}
      <section className="space-y-4">
        <Heading level="h2">설명 포함</Heading>
        <Body className="mb-4">각 옵션에 설명을 추가할 수 있습니다.</Body>
        <div className="p-6 border border-krds-gray-20 rounded-lg flex items-center justify-center min-h-[200px]">
          <div className="max-w-sm">
            <Combobox
              options={descriptionOptions}
              value={value4}
              onValueChange={setValue4}
              placeholder="요금제 선택"
            />
          </div>
        </div>
        <Code variant="block" language="tsx">{`const options = [
  {
    value: 'standard',
    label: '표준 요금제',
    description: '월 10,000원, 기본 기능 제공',
  },
];

<Combobox options={options} placeholder="요금제 선택" />`}</Code>
      </section>

      {/* Clearable */}
      <section className="space-y-4">
        <Heading level="h2">선택 해제 가능</Heading>
        <Body className="mb-4">
          clearable prop으로 선택 해제 버튼을 표시할 수 있습니다.
        </Body>
        <div className="p-6 border border-krds-gray-20 rounded-lg flex items-center justify-center min-h-[200px]">
          <div className="max-w-xs">
            <Combobox
              options={basicOptions}
              value={value5}
              onValueChange={setValue5}
              placeholder="프레임워크 선택"
              clearable
            />
          </div>
        </div>
        <Code variant="block" language="tsx">{`<Combobox
  options={options}
  value={value}
  onValueChange={setValue}
  placeholder="프레임워크 선택"
  clearable
/>`}</Code>
      </section>

      {/* 상태 */}
      <section className="space-y-4">
        <Heading level="h2">상태</Heading>
        <Body className="mb-4">
          에러, 비활성화, 로딩 상태를 표시할 수 있습니다.
        </Body>
        <div className="p-6 border border-krds-gray-20 rounded-lg flex items-center justify-center min-h-[200px]">
          <div className="max-w-xs space-y-3">
            <Combobox
              options={basicOptions}
              placeholder="에러 상태"
              variant="error"
            />
            <Combobox options={basicOptions} placeholder="비활성화" disabled />
            <Combobox
              options={basicOptions}
              value={value6}
              onValueChange={setValue6}
              placeholder="로딩 상태"
              loading
            />
          </div>
        </div>
        <Code
          variant="block"
          language="tsx"
        >{`<Combobox options={options} placeholder="에러 상태" variant="error" />
<Combobox options={options} placeholder="비활성화" disabled />
<Combobox options={options} placeholder="로딩 상태" loading />`}</Code>
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
                <Code>options</Code>
              </TableCell>
              <TableCell>
                <Code>ComboboxOption[]</Code>
              </TableCell>
              <TableCell>필수</TableCell>
              <TableCell>옵션 목록</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>value</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>선택된 값</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>onValueChange</Code>
              </TableCell>
              <TableCell>
                <Code>(value: string) =&gt; void</Code>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>값 변경 콜백</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>placeholder</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>&quot;선택해주세요&quot;</TableCell>
              <TableCell>플레이스홀더</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>variant</Code>
              </TableCell>
              <TableCell>
                <Code>&quot;default&quot; | &quot;error&quot;</Code>
              </TableCell>
              <TableCell>&quot;default&quot;</TableCell>
              <TableCell>스타일 variant</TableCell>
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
                <Code>disabled</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>false</TableCell>
              <TableCell>비활성화</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>clearable</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>false</TableCell>
              <TableCell>선택 해제 버튼 표시</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>loading</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>false</TableCell>
              <TableCell>로딩 상태</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      {/* ComboboxOption 인터페이스 */}
      <section className="space-y-4">
        <Heading level="h2">ComboboxOption 인터페이스</Heading>
        <Code variant="block" language="typescript">{`interface ComboboxOption {
  value: string;        // 옵션 값
  label: string;        // 표시될 레이블
  disabled?: boolean;   // 비활성화 여부
  group?: string;       // 그룹 (선택적)
  icon?: React.ReactNode; // 아이콘 (선택적)
  description?: string; // 설명 (선택적)
}`}</Code>
      </section>
    </>
  );
}
