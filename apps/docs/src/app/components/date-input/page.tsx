'use client';

import { useState } from 'react';
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';
import { ComponentPreview } from '@/components/content/ComponentPreview';

import {
  DateInput,
  DateInputMultiple,
  DateInputRange,
  Stack,
  Code,
  List,
  ListItem,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@hanui/react';

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
      <Heading
        level="h1"
        title="Date Input"
        description="사용자가 특정 날짜 또는 기간을 입력하거나 선택하는 컴포넌트입니다. 단일 필드, 다중 필드(년/월/일 분리), 범위 필드 세 가지 유형을 제공합니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview">
          {/* 개요 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />
            <ComponentPreview>
              <div className="w-full max-w-md">
                <DateInput
                  label="생년월일"
                  helperText="YYYY-MM-DD 형식으로 입력해주세요"
                  value={singleDate}
                  onChange={setSingleDate}
                  showCalendarButton
                />
              </div>
            </ComponentPreview>
          </Section>

          {/* 설치 */}
          <Section level="h2">
            <Installation componentName="date-input" />
          </Section>

          {/* 사용법 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="usage"
              title="사용법"
              description="DateInput, DateInputMultiple, DateInputRange를 import하여 사용합니다."
            />
            <Code variant="block" language="tsx" showLineNumbers={false}>
              {`import { DateInput, DateInputMultiple, DateInputRange } from '@hanui/react';

// 단일 필드 (달력 버튼 포함)
<DateInput
  label="생년월일"
  helperText="YYYY-MM-DD 형식으로 입력해주세요"
  value={date}
  onChange={setDate}
  showCalendarButton
/>

// 다중 필드 (년/월/일 분리)
<DateInputMultiple
  label="유효기간"
  year={year} month={month} day={day}
  onYearChange={setYear} onMonthChange={setMonth} onDayChange={setDay}
/>

// 범위 필드
<DateInputRange
  label="검색 기간"
  startDate={startDate} endDate={endDate}
  onStartDateChange={setStartDate} onEndDateChange={setEndDate}
  showCalendarButton
/>`}
            </Code>
          </Section>

          {/* 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            {/* 단일 필드 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="단일 필드"
                description="하나의 입력 필드에 전체 날짜를 입력합니다. 사용자가 이미 알고 있는 날짜를 입력받을 때 유용합니다."
              />
              <ComponentPreview>
                <div className="w-full max-w-xs">
                  <DateInput
                    value={singleDate}
                    onChange={setSingleDate}
                    placeholder="YYYY-MM-DD"
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`const [date, setDate] = useState('');

<DateInput
  value={date}
  onChange={setDate}
  placeholder="YYYY-MM-DD"
/>`}
              </Code>
            </Subsection>

            {/* 달력 버튼 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="달력 버튼"
                description="showCalendarButton으로 달력 아이콘 버튼을 표시합니다. 클릭하면 내장 달력이 나타납니다."
              />
              <ComponentPreview>
                <div className="w-full max-w-xs">
                  <DateInput
                    label="예약 날짜"
                    value={singleDate}
                    onChange={setSingleDate}
                    showCalendarButton
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<DateInput
  label="예약 날짜"
  value={date}
  onChange={setDate}
  showCalendarButton
/>`}
              </Code>
            </Subsection>

            {/* 다중 필드 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="다중 필드"
                description="년, 월, 일 정보를 개별 입력 필드를 통해 입력합니다."
              />
              <ComponentPreview>
                <DateInputMultiple
                  label="여권 만료일"
                  helperText="여권에 표기된 만료일을 입력해주세요"
                  year={year}
                  month={month}
                  day={day}
                  onYearChange={setYear}
                  onMonthChange={setMonth}
                  onDayChange={setDay}
                />
              </ComponentPreview>
              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`const [year, setYear] = useState('');
const [month, setMonth] = useState('');
const [day, setDay] = useState('');

<DateInputMultiple
  label="여권 만료일"
  helperText="여권에 표기된 만료일을 입력해주세요"
  year={year}
  month={month}
  day={day}
  onYearChange={setYear}
  onMonthChange={setMonth}
  onDayChange={setDay}
/>`}
              </Code>
            </Subsection>

            {/* 년월만 입력 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="년/월만 입력"
                description="hideDay를 사용하여 일 필드를 숨기고 년/월만 입력받습니다."
              />
              <ComponentPreview>
                <DateInputMultiple
                  year={year}
                  month={month}
                  onYearChange={setYear}
                  onMonthChange={setMonth}
                  hideDay
                />
              </ComponentPreview>
              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<DateInputMultiple
  year={year}
  month={month}
  onYearChange={setYear}
  onMonthChange={setMonth}
  hideDay
/>`}
              </Code>
            </Subsection>

            {/* 범위 필드 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="범위 필드 (달력으로 범위 선택)"
                description="시작일과 종료일을 입력합니다. 달력 아이콘을 클릭하면 범위 선택 달력이 나타나며, 첫 번째 클릭으로 시작일, 두 번째 클릭으로 종료일을 선택할 수 있습니다."
              />
              <ComponentPreview>
                <div className="w-full max-w-md">
                  <DateInputRange
                    label="검색 기간"
                    helperText="조회하고자 하는 기간을 선택해주세요"
                    startDate={startDate}
                    endDate={endDate}
                    onStartDateChange={setStartDate}
                    onEndDateChange={setEndDate}
                    showCalendarButton
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');

<DateInputRange
  label="검색 기간"
  helperText="조회하고자 하는 기간을 선택해주세요"
  startDate={startDate}
  endDate={endDate}
  onStartDateChange={setStartDate}
  onEndDateChange={setEndDate}
  showCalendarButton
/>`}
              </Code>
            </Subsection>

            {/* 필수 입력 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="필수 입력"
                description="required 속성으로 필수 입력 필드임을 표시합니다."
              />
              <ComponentPreview>
                <div className="w-full max-w-xs">
                  <DateInput
                    label="예약 날짜"
                    required
                    helperText="예약 날짜는 필수입니다"
                    value={singleDate}
                    onChange={setSingleDate}
                    showCalendarButton
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<DateInput
  label="예약 날짜"
  required
  helperText="예약 날짜는 필수입니다"
  value={date}
  onChange={setDate}
  showCalendarButton
/>`}
              </Code>
            </Subsection>

            {/* 에러 상태 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="에러 상태"
                description="hasError와 errorMessage를 함께 사용하여 유효성 검사 실패를 표시합니다."
              />
              <ComponentPreview>
                <div className="w-full max-w-xs">
                  <DateInput
                    label="예약 날짜"
                    value={errorDate}
                    onChange={setErrorDate}
                    hasError
                    errorMessage="올바른 날짜 형식을 입력해주세요 (YYYY-MM-DD)"
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<DateInput
  label="예약 날짜"
  value={invalidDate}
  onChange={setInvalidDate}
  hasError
  errorMessage="올바른 날짜 형식을 입력해주세요 (YYYY-MM-DD)"
/>`}
              </Code>
            </Subsection>

            {/* 비활성화 상태 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="비활성화 상태"
                description="disabled 속성으로 입력을 비활성화합니다."
              />
              <ComponentPreview>
                <Stack gap="md" className="w-full max-w-md">
                  <DateInput value="2024-01-15" disabled />
                  <DateInputMultiple year="2024" month="01" day="15" disabled />
                  <DateInputRange
                    startDate="2024-01-01"
                    endDate="2024-12-31"
                    disabled
                  />
                </Stack>
              </ComponentPreview>
            </Subsection>
          </Section>

          {/* 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="Date Input은 WCAG 2.1 / KWCAG 2.2 기준을 준수합니다."
            />
            <List variant="check">
              <ListItem>
                <strong>aria-label:</strong> 각 입력 필드에 명확한 레이블 제공
              </ListItem>
              <ListItem>
                <strong>inputMode:</strong> 모바일에서 숫자 키패드 활성화
              </ListItem>
              <ListItem>
                <strong>키보드 탐색:</strong> Tab/Shift+Tab으로 필드 간 이동
              </ListItem>
              <ListItem>
                <strong>달력 접근성:</strong> 화살표 키로 날짜 이동, Enter로
                선택, Escape로 닫기
              </ListItem>
              <ListItem>
                <strong>에러 상태:</strong> 아이콘과 색상으로 명확하게 표시
              </ListItem>
            </List>
          </Section>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="DateInput Props" />
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
                      <Code className="text-xs">
                        (value: string) =&gt; void
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>값 변경 핸들러</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>label</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>라벨 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>helperText</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>도움말 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>errorMessage</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      에러 메시지 (hasError가 true일 때 표시)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>required</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>필수 입력 여부 (* 표시)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>placeholder</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>&quot;YYYY-MM-DD&quot;</TableCell>
                    <TableCell>플레이스홀더</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>hasError</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>에러 상태</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>showCalendarButton</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>달력 버튼 표시</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>onCalendarClick</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">() =&gt; void</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      달력 버튼 클릭 핸들러 (미설정 시 내장 달력 표시)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>disabled</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>비활성화 상태</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="DateInputMultiple Props" />
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
                      <Code className="text-xs">
                        (value: string) =&gt; void
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>년도 변경 핸들러</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>onMonthChange</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        (value: string) =&gt; void
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>월 변경 핸들러</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>onDayChange</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        (value: string) =&gt; void
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>일 변경 핸들러</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>label</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>라벨 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>helperText</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>도움말 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>errorMessage</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      에러 메시지 (hasError가 true일 때 표시)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>required</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>필수 입력 여부 (* 표시)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>hideYear</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>년도 필드 숨김</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>hideDay</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>일 필드 숨김</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>hasError</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>에러 상태</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>disabled</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>비활성화 상태</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="DateInputRange Props" />
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
                      <Code className="text-xs">
                        (value: string) =&gt; void
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>시작일 변경 핸들러</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>onEndDateChange</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        (value: string) =&gt; void
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>종료일 변경 핸들러</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>label</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>라벨 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>helperText</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>도움말 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>errorMessage</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      에러 메시지 (hasError가 true일 때 표시)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>required</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>필수 입력 여부 (* 표시)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>startPlaceholder</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>&quot;YYYY-MM-DD&quot;</TableCell>
                    <TableCell>시작일 플레이스홀더</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>endPlaceholder</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>&quot;YYYY-MM-DD&quot;</TableCell>
                    <TableCell>종료일 플레이스홀더</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>showCalendarButton</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>달력 버튼 표시</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>hasError</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>에러 상태</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>disabled</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>비활성화 상태</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'DataTable', href: '/components/data-table' }}
        next={{ title: 'Disclosure', href: '/components/disclosure' }}
      />
    </>
  );
}
