'use client';

import { useState } from 'react';

// Docs layout
import { PageSection as Section, Heading } from '@/components/content';

// Docs helper
import { PreviewBox } from '@/components/helpers';

// UI Components
import {
  DateInput,
  DateInputMultiple,
  DateInputRange,
  Body,
  Stack,
  Label,
  Code,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@hanui/react';

// ============================================================================
// 코드 예제
// ============================================================================

const installCode = `npm install @hanui/react`;

const importCode = `import {
  DateInput,
  DateInputMultiple,
  DateInputRange
} from '@/components/hanui/date-input';`;

const singleFieldCode = `const [date, setDate] = useState('');

<DateInput
  value={date}
  onChange={setDate}
  placeholder="YYYY-MM-DD"
/>`;

const withCalendarCode = `<DateInput
  value={date}
  onChange={setDate}
  showCalendarButton
  onCalendarClick={() => {
    // 달력 모달 열기 로직
    console.log('달력 열기');
  }}
/>`;

const multipleFieldsCode = `const [year, setYear] = useState('');
const [month, setMonth] = useState('');
const [day, setDay] = useState('');

<DateInputMultiple
  year={year}
  month={month}
  day={day}
  onYearChange={setYear}
  onMonthChange={setMonth}
  onDayChange={setDay}
/>`;

const monthOnlyCode = `// 년/월만 입력 (일 필드 숨김)
<DateInputMultiple
  year={year}
  month={month}
  onYearChange={setYear}
  onMonthChange={setMonth}
  hideDay
/>`;

const rangeFieldCode = `const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');

<DateInputRange
  startDate={startDate}
  endDate={endDate}
  onStartDateChange={setStartDate}
  onEndDateChange={setEndDate}
  showCalendarButton
/>`;

const errorStateCode = `<DateInput
  value={invalidDate}
  onChange={setInvalidDate}
  hasError
/>`;

// ============================================================================
// 페이지 컴포넌트
// ============================================================================

export default function DateInputPage() {
  // 단일 필드
  const [singleDate, setSingleDate] = useState('');

  // 다중 필드
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  // 범위 필드
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // 에러 상태
  const [errorDate, setErrorDate] = useState('잘못된 날짜');

  return (
    <>
      {/* 헤더 */}
      <Heading
        level="h1"
        title="Date Input"
        description="사용자가 특정 날짜 또는 기간을 입력하거나 선택하는 컴포넌트입니다."
        links={[
          {
            label: 'KRDS 날짜 입력 필드',
            href: 'https://www.krds.go.kr/html/site/component/component_09_01.html',
          },
        ]}
      />

      {/* 개요 */}
      <Section>
        <Heading level="h2" title="개요" id="overview" />
        <Body>
          날짜 입력 필드(Date Input)는 사용자가 특정 날짜 또는 기간을 입력하거나
          선택하는 데 사용됩니다. 단일 필드, 다중 필드(년/월/일 분리), 범위 필드
          세 가지 유형을 제공합니다.
        </Body>
        <PreviewBox>
          <div className="space-y-4 w-full max-w-md">
            <div>
              <Label className="mb-2 block">생년월일</Label>
              <DateInput
                value={singleDate}
                onChange={setSingleDate}
                showCalendarButton
                onCalendarClick={() => alert('달력 열기')}
              />
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* 설치 */}
      <Section>
        <Heading level="h2" title="설치" id="installation" />
        <Code variant="block" language="bash" showLineNumbers={false}>
          {installCode}
        </Code>
      </Section>

      {/* Import */}
      <Section>
        <Heading level="h2" title="Import" id="import" />
        <Code variant="block" language="typescript" showLineNumbers={false}>
          {importCode}
        </Code>
      </Section>

      {/* 단일 필드 */}
      <Section>
        <Heading level="h2" title="단일 필드" id="single-field" />
        <Body>
          하나의 입력 필드에 전체 날짜 데이터를 입력하는 방식입니다. 사용자가
          이미 알고 있는 날짜를 입력받는 데 유용합니다.
        </Body>
        <PreviewBox>
          <div className="w-full max-w-xs">
            <DateInput
              value={singleDate}
              onChange={setSingleDate}
              placeholder="YYYY-MM-DD"
            />
          </div>
        </PreviewBox>
        <Code variant="block" language="tsx" showLineNumbers={false}>
          {singleFieldCode}
        </Code>
      </Section>

      {/* 달력 버튼 */}
      <Section>
        <Heading level="h2" title="달력 버튼" id="with-calendar" />
        <Body>
          showCalendarButton을 사용하여 달력 아이콘 버튼을 표시할 수 있습니다.
          기억하지 못하는 과거나 미래의 날짜를 입력받을 때 유용합니다.
        </Body>
        <PreviewBox>
          <div className="w-full max-w-xs">
            <DateInput
              value={singleDate}
              onChange={setSingleDate}
              showCalendarButton
              onCalendarClick={() => alert('달력 컴포넌트와 연결하세요')}
            />
          </div>
        </PreviewBox>
        <Code variant="block" language="tsx" showLineNumbers={false}>
          {withCalendarCode}
        </Code>
      </Section>

      {/* 다중 필드 */}
      <Section>
        <Heading level="h2" title="다중 필드" id="multiple-fields" />
        <Body>
          년, 월, 일 정보를 개별 입력 필드를 통해 입력하는 방식입니다.
        </Body>
        <PreviewBox>
          <DateInputMultiple
            year={year}
            month={month}
            day={day}
            onYearChange={setYear}
            onMonthChange={setMonth}
            onDayChange={setDay}
          />
        </PreviewBox>
        <Code variant="block" language="tsx" showLineNumbers={false}>
          {multipleFieldsCode}
        </Code>
      </Section>

      {/* 년월만 입력 */}
      <Section>
        <Heading level="h2" title="년/월만 입력" id="month-only" />
        <Body>
          hideDay를 사용하여 일 필드를 숨기고 년/월만 입력받을 수 있습니다.
        </Body>
        <PreviewBox>
          <DateInputMultiple
            year={year}
            month={month}
            onYearChange={setYear}
            onMonthChange={setMonth}
            hideDay
          />
        </PreviewBox>
        <Code variant="block" language="tsx" showLineNumbers={false}>
          {monthOnlyCode}
        </Code>
      </Section>

      {/* 범위 필드 */}
      <Section>
        <Heading level="h2" title="범위 필드" id="range-field" />
        <Body>
          시작일과 종료일을 입력할 때 사용합니다. 날짜의 범위 정보가 필요하거나
          사용자가 대략적인 날짜만 알고 있는 상황에서 유용합니다.
        </Body>
        <PreviewBox>
          <div className="w-full max-w-md">
            <DateInputRange
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              showCalendarButton
            />
          </div>
        </PreviewBox>
        <Code variant="block" language="tsx" showLineNumbers={false}>
          {rangeFieldCode}
        </Code>
      </Section>

      {/* 에러 상태 */}
      <Section>
        <Heading level="h2" title="에러 상태" id="error-state" />
        <Body>
          hasError 속성을 사용하여 유효성 검사 실패 상태를 표시합니다.
        </Body>
        <PreviewBox>
          <div className="w-full max-w-xs">
            <DateInput value={errorDate} onChange={setErrorDate} hasError />
            <p className="mt-1 text-sm text-krds-functional-error">
              올바른 날짜 형식을 입력해주세요 (YYYY-MM-DD)
            </p>
          </div>
        </PreviewBox>
        <Code variant="block" language="tsx" showLineNumbers={false}>
          {errorStateCode}
        </Code>
      </Section>

      {/* 비활성화 상태 */}
      <Section>
        <Heading level="h2" title="비활성화 상태" id="disabled" />
        <Body>disabled 속성을 사용하여 입력을 비활성화합니다.</Body>
        <PreviewBox>
          <Stack gap="md" className="w-full max-w-md">
            <DateInput value="2024-01-15" disabled />
            <DateInputMultiple year="2024" month="01" day="15" disabled />
            <DateInputRange
              startDate="2024-01-01"
              endDate="2024-12-31"
              disabled
            />
          </Stack>
        </PreviewBox>
      </Section>

      {/* 사용 가이드라인 */}
      <Section>
        <Heading level="h2" title="사용 가이드라인" id="guidelines" />
        <Body>KRDS 가이드라인에 따른 권장 사항:</Body>
        <ul className="list-disc pl-6 space-y-2 text-krds-gray-80">
          <li>
            입력 필드에 레이블을 제공하고 어떤 날짜를 입력해야 하는지 명확하게
            설명
          </li>
          <li>
            도움말 텍스트를 사용하여 입력 양식을 안내 (플레이스홀더는 보조 수단)
          </li>
          <li>날짜 선택기 사용 시에도 직접 입력 가능하도록 유지</li>
          <li>키보드를 이용하여 날짜를 선택하거나 입력할 수 있도록 제공</li>
        </ul>
      </Section>

      {/* 접근성 */}
      <Section>
        <Heading level="h2" title="접근성" id="accessibility" />
        <Body>Date Input은 다음과 같은 접근성 기능을 제공합니다:</Body>
        <ul className="list-disc pl-6 space-y-2 text-krds-gray-80">
          <li>
            각 입력 필드에 <code>aria-label</code> 제공
          </li>
          <li>
            <code>inputMode=&quot;numeric&quot;</code>으로 모바일에서 숫자
            키패드 활성화
          </li>
          <li>Tab/Shift+Tab으로 필드 간 이동 가능</li>
          <li>
            달력 버튼에 적절한 <code>aria-label</code> 제공
          </li>
          <li>에러 상태를 시각적으로 명확하게 표시</li>
        </ul>
      </Section>

      {/* API Reference */}
      <Section>
        <Heading level="h2" title="API Reference" id="api" />

        <Heading level="h3" title="DateInput Props" id="date-input-props" />
        <Table small>
          <TableHeader>
            <TableRow>
              <TableHead>속성</TableHead>
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
                <Code className="text-xs">string</Code>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>입력 값</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>onChange</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">(value: string) =&gt; void</Code>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>값 변경 핸들러</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>placeholder</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">string</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">&quot;YYYY-MM-DD&quot;</Code>
              </TableCell>
              <TableCell>플레이스홀더 텍스트</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>hasError</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">boolean</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">false</Code>
              </TableCell>
              <TableCell>에러 상태</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>showCalendarButton</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">boolean</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">false</Code>
              </TableCell>
              <TableCell>달력 아이콘 버튼 표시</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>onCalendarClick</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">() =&gt; void</Code>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>달력 버튼 클릭 핸들러</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>disabled</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">boolean</Code>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>비활성화 상태</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Heading
          level="h3"
          title="DateInputMultiple Props"
          id="date-input-multiple-props"
        />
        <Table small>
          <TableHeader>
            <TableRow>
              <TableHead>속성</TableHead>
              <TableHead>타입</TableHead>
              <TableHead>기본값</TableHead>
              <TableHead>설명</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Code>year</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">string</Code>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>년도 값</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>month</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">string</Code>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>월 값</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>day</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">string</Code>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>일 값</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>onYearChange</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">(value: string) =&gt; void</Code>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>년도 변경 핸들러</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>onMonthChange</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">(value: string) =&gt; void</Code>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>월 변경 핸들러</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>onDayChange</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">(value: string) =&gt; void</Code>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>일 변경 핸들러</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>hideYear</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">boolean</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">false</Code>
              </TableCell>
              <TableCell>년도 필드 숨김</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>hideDay</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">boolean</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">false</Code>
              </TableCell>
              <TableCell>일 필드 숨김</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>hasError</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">boolean</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">false</Code>
              </TableCell>
              <TableCell>에러 상태</TableCell>
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
          </TableBody>
        </Table>

        <Heading
          level="h3"
          title="DateInputRange Props"
          id="date-input-range-props"
        />
        <Table small>
          <TableHeader>
            <TableRow>
              <TableHead>속성</TableHead>
              <TableHead>타입</TableHead>
              <TableHead>기본값</TableHead>
              <TableHead>설명</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Code>startDate</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">string</Code>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>시작일 값</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>endDate</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">string</Code>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>종료일 값</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>onStartDateChange</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">(value: string) =&gt; void</Code>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>시작일 변경 핸들러</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>onEndDateChange</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">(value: string) =&gt; void</Code>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>종료일 변경 핸들러</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>startPlaceholder</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">string</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">&quot;YYYY-MM-DD&quot;</Code>
              </TableCell>
              <TableCell>시작일 플레이스홀더</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>endPlaceholder</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">string</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">&quot;YYYY-MM-DD&quot;</Code>
              </TableCell>
              <TableCell>종료일 플레이스홀더</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>showCalendarButton</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">boolean</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">false</Code>
              </TableCell>
              <TableCell>달력 버튼 표시</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>hasError</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">boolean</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">false</Code>
              </TableCell>
              <TableCell>에러 상태</TableCell>
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
          </TableBody>
        </Table>
      </Section>
    </>
  );
}
