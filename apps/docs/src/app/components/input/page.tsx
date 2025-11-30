'use client';

// Docs layout components
import {
  PageSection as Section,
  Subsection,
  Heading,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';
import { ComponentPreview } from '@/components/content/ComponentPreview';

// UI components - from @hanui/react
import {
  Input as InputComponent,
  FormField,
  FormLabel,
  FormError,
  FormHelperText,
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

// Example icons
const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.7419 10.3419C12.7095 9.13119 13.25 7.62 13.25 6C13.25 2.54822 10.4518 -0.25 7 -0.25C3.54822 -0.25 0.75 2.54822 0.75 6C0.75 9.45178 3.54822 12.25 7 12.25C8.62 12.25 10.1312 11.7095 11.3419 10.7419L14.2929 13.6929C14.6834 14.0834 15.3166 14.0834 15.7071 13.6929C16.0976 13.3024 16.0976 12.6692 15.7071 12.2787L12.7561 9.32787C12.4306 9.65342 12.0819 9.95516 11.7419 10.3419ZM7 10.75C4.37665 10.75 2.25 8.62335 2.25 6C2.25 3.37665 4.37665 1.25 7 1.25C9.62335 1.25 11.75 3.37665 11.75 6C11.75 8.62335 9.62335 10.75 7 10.75Z"
      fill="currentColor"
    />
  </svg>
);

const EmailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.5 3C1.67157 3 1 3.67157 1 4.5V11.5C1 12.3284 1.67157 13 2.5 13H13.5C14.3284 13 15 12.3284 15 11.5V4.5C15 3.67157 14.3284 3 13.5 3H2.5ZM2.5 4.5H13.5L8 8.5L2.5 4.5ZM2.5 6.20711L8 10.2071L13.5 6.20711V11.5H2.5V6.20711Z"
      fill="currentColor"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.4697 4.46967C13.7626 4.17678 14.2374 4.17678 14.5303 4.46967C14.8232 4.76256 14.8232 5.23744 14.5303 5.53033L6.53033 13.5303C6.23744 13.8232 5.76256 13.8232 5.46967 13.5303L1.46967 9.53033C1.17678 9.23744 1.17678 8.76256 1.46967 8.46967C1.76256 8.17678 2.23744 8.17678 2.53033 8.46967L6 11.9393L13.4697 4.46967Z"
      fill="currentColor"
    />
  </svg>
);

export default function InputPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Input"
        description="다양한 스타일과 크기를 지원하는 입력 필드 컴포넌트입니다. 타입별 최적화 기능(비밀번호 토글, 숫자 키보드 등)과 FormField 자동 통합을 제공하며, KRDS 표준을 준수합니다."
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
              <div className="flex flex-col gap-4 max-w-md">
                <InputComponent placeholder="기본 입력 필드" />
                <InputComponent readOnly value="읽기 전용 (ReadOnly)" />
                <InputComponent disabled placeholder="비활성화 (Disabled)" />
              </div>
            </ComponentPreview>

            <Code variant="block" language="tsx">
              {`import { Input } from '@/components/hanui'

// 기본
<Input placeholder="기본 입력 필드" />

// 읽기 전용 (수정 불가, 값 보기만 가능)
<Input readOnly value="읽기 전용 (ReadOnly)" />

// 비활성화 (입력 불가)
<Input disabled placeholder="비활성화 (Disabled)" />`}
            </Code>
          </Section>

          <Section>
            <Installation componentName="input" />
          </Section>

          {/* Usage */}
          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { Input } from '@/components/hanui'

<Input placeholder="이름 입력" />`}
            </Code>
          </Section>

          {/* Examples */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading level="h3" title="Size" />
              <ComponentPreview>
                <div className="flex flex-col gap-4 max-w-md">
                  <InputComponent size="sm" placeholder="Small (40px)" />
                  <InputComponent size="md" placeholder="Medium (48px)" />
                  <InputComponent size="lg" placeholder="Large (56px)" />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Input size="sm" placeholder="Small (40px)" />
<Input size="md" placeholder="Medium (48px)" />
<Input size="lg" placeholder="Large (56px)" />`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Variant" />
              <ComponentPreview>
                <div className="flex flex-col gap-4 max-w-md">
                  <InputComponent
                    variant="default"
                    placeholder="Default (테두리)"
                  />
                  <InputComponent
                    variant="filled"
                    placeholder="Filled (배경)"
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Input variant="default" placeholder="Default (테두리)" />
<Input variant="filled" placeholder="Filled (배경)" />`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Status (상태)"
                description="입력 필드의 상태를 시각적으로 표시합니다. 에러, 성공, 정보 상태를 지원하며, 각 상태에 맞는 border 색상이 적용됩니다."
              />
              <ComponentPreview>
                <div className="flex flex-col gap-4 max-w-md">
                  <InputComponent
                    status="error"
                    placeholder="에러 상태"
                    defaultValue="잘못된 입력"
                  />
                  <InputComponent
                    status="success"
                    placeholder="성공 상태"
                    defaultValue="유효한 입력"
                  />
                  <InputComponent
                    status="info"
                    placeholder="정보 상태"
                    defaultValue="추가 정보"
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Input status="error" placeholder="에러 상태" />
<Input status="success" placeholder="성공 상태" />
<Input status="info" placeholder="정보 상태" />

// 이전 error prop (deprecated, status="error" 권장)
<Input error placeholder="에러 (deprecated)" />`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="ReadOnly (읽기 전용)" />
              <ComponentPreview>
                <div className="flex flex-col gap-4 max-w-md">
                  <InputComponent readOnly value="읽기 전용 값" />
                  <InputComponent readOnly placeholder="수정할 수 없습니다" />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Input readOnly value="읽기 전용 값" />
<Input readOnly placeholder="수정할 수 없습니다" />`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Clearable (지우기 버튼)"
                description="입력값이 있을 때 X 버튼을 표시하여 빠르게 지울 수 있습니다. 비밀번호 입력에서는 보안상 표시되지 않습니다."
              />
              <ComponentPreview>
                <div className="flex flex-col gap-4 max-w-md">
                  <InputComponent
                    clearable
                    placeholder="입력하면 X 버튼이 나타납니다"
                  />
                  <InputComponent
                    clearable
                    defaultValue="지우기 버튼 클릭 가능"
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`'use client';
import { Input } from '@hanui/react';
import { useState } from 'react';

function SearchInput() {
  const [value, setValue] = useState('');

  return (
    <Input
      clearable
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue('')}
      placeholder="검색어 입력"
    />
  );
}`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="아이콘 (Addon)" />
              <Code variant="block" language="tsx">
                {`<Input
  leftAddon={<SearchIcon />}
  placeholder="검색어를 입력하세요"
/>
<Input
  leftAddon={<EmailIcon />}
  type="email"
  placeholder="example@email.com"
/>
<Input
  rightAddon={<CheckIcon />}
  placeholder="확인 완료"
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Input Types"
                description="Input 컴포넌트는 다양한 입력 타입을 지원하며, 각 타입에 최적화된 기능을 제공합니다."
              />
              <List variant="check" spacing="default" className="mb-4">
                <ListItem>
                  <strong>Password</strong>: 자동으로 비밀번호 표시/숨김 토글
                  버튼 제공 (lucide-react Eye/EyeOff 아이콘)
                </ListItem>
                <ListItem>
                  <strong>Number</strong>: 모바일에서 숫자 키보드 자동 활성화
                  (inputMode=&quot;numeric&quot;)
                </ListItem>
                <ListItem>
                  <strong>Text/Email/Tel/URL</strong>: 표준 브라우저 동작 지원
                </ListItem>
                <ListItem>
                  <strong>ReadOnly</strong>: 값을 볼 수는 있지만 수정할 수 없는
                  상태 (readOnly prop)
                </ListItem>
                <ListItem>
                  <strong>Clearable</strong>: 입력값이 있을 때 X 버튼으로 빠르게
                  지우기 (clearable prop, password 제외)
                </ListItem>
              </List>
              <Code variant="block" language="tsx">
                {`// 텍스트 입력
<Input type="text" placeholder="이름" />

// 비밀번호 입력 (자동 visibility toggle)
<Input type="password" placeholder="비밀번호" />

// 숫자 입력 (모바일 숫자 키보드)
<Input type="number" placeholder="나이" min={0} max={120} />

// 이메일 입력
<Input type="email" placeholder="example@email.com" />

// 전화번호 입력
<Input type="tel" placeholder="010-1234-5678" />

// URL 입력
<Input type="url" placeholder="https://example.com" />

// 날짜 선택
<Input type="date" />`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="FormField와 함께 사용 (권장)"
                description="FormField 컴포넌트와 함께 사용하면 레이블, 에러 메시지, 도움말이 자동으로 연결됩니다."
              />
              <ComponentPreview>
                <div className="flex flex-col gap-6 max-w-md">
                  <FormField id="username" required>
                    <FormLabel>사용자명</FormLabel>
                    <InputComponent
                      type="text"
                      placeholder="영문, 숫자 4-20자"
                    />
                    <FormHelperText>
                      4-20자의 영문자와 숫자만 사용 가능합니다
                    </FormHelperText>
                  </FormField>

                  <FormField id="password" required>
                    <FormLabel>비밀번호</FormLabel>
                    <InputComponent
                      type="password"
                      placeholder="8자 이상 입력"
                    />
                    <FormHelperText>
                      영문, 숫자, 특수문자 포함 8자 이상
                    </FormHelperText>
                  </FormField>

                  <FormField id="age">
                    <FormLabel>나이</FormLabel>
                    <InputComponent
                      type="number"
                      min={0}
                      max={120}
                      placeholder="0-120"
                    />
                  </FormField>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`import { FormField, FormLabel, FormError, FormHelperText, Input } from '@/components/hanui'

// 기본 사용
<FormField id="username" required>
  <FormLabel>사용자명</FormLabel>
  <Input type="text" placeholder="영문, 숫자 4-20자" />
  <FormHelperText>4-20자의 영문자와 숫자만 사용 가능합니다</FormHelperText>
</FormField>

// 비밀번호 (자동 visibility toggle)
<FormField id="password" required>
  <FormLabel>비밀번호</FormLabel>
  <Input type="password" placeholder="8자 이상 입력" />
  <FormHelperText>영문, 숫자, 특수문자 포함 8자 이상</FormHelperText>
</FormField>

// 숫자 입력
<FormField id="age">
  <FormLabel>나이</FormLabel>
  <Input type="number" min={0} max={120} />
</FormField>

// 에러 상태
<FormField id="email" error={!!errors.email} required>
  <FormLabel>이메일</FormLabel>
  <Input type="email" placeholder="example@email.com" />
  {errors.email && <FormError>{errors.email}</FormError>}
</FormField>`}
              </Code>
            </Subsection>
          </Section>

          {/* Accessibility */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="Input 컴포넌트는 WCAG 2.1 AA 기준을 준수하며 완전한 접근성을 제공합니다."
            />

            <Subsection level="h3">
              <Heading level="h3" title="키보드 지원" />
              <List variant="check" spacing="default">
                <ListItem>
                  <Code>Tab</Code> - 입력 필드로 포커스 이동
                </ListItem>
                <ListItem>
                  <Code>Enter</Code> - 폼 제출 (form 내부인 경우)
                </ListItem>
                <ListItem>
                  <Code>Escape</Code> - 입력 취소 (브라우저 기본 동작)
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="스크린 리더 지원" />
              <List variant="check" spacing="default">
                <ListItem>
                  <Code>aria-invalid</Code> - 에러 상태를 자동으로 전달 (
                  <Code>status=&quot;error&quot;</Code> 또는 <Code>error</Code>{' '}
                  prop 사용 시)
                </ListItem>
                <ListItem>
                  <Code>aria-required</Code> - 필수 입력 표시 지원
                </ListItem>
                <ListItem>
                  <Code>aria-describedby</Code> - 에러 메시지 및 도움말 연결
                  지원
                </ListItem>
                <ListItem>
                  <Code>aria-label</Code> - 아이콘 버튼에 자동 적용 (비밀번호
                  토글: &quot;비밀번호 보기/숨기기&quot;, 지우기 버튼:
                  &quot;입력 지우기&quot;)
                </ListItem>
                <ListItem>
                  모든 HTML input 속성 지원 (<Code>id</Code>, <Code>name</Code>,{' '}
                  <Code>disabled</Code>, <Code>readOnly</Code> 등)
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="폼 통합 예제"
                description="권장 방법: FormField 컴포넌트를 사용하면 접근성 속성이 자동으로 연결됩니다."
              />
              <Code variant="block" language="tsx">
                {`// ✅ 권장: FormField 사용 (자동 접근성)
import { FormField, FormLabel, FormError, Input } from '@hanui/react'

<FormField id="email" error={!!errors.email} required>
  <FormLabel>이메일</FormLabel>
  <Input type="email" placeholder="example@email.com" />
  {errors.email && <FormError>{errors.email}</FormError>}
</FormField>

// ⚠️  수동 방법 (직접 aria 속성 관리)
<form>
  <label htmlFor="email" className="block mb-2 font-medium">
    이메일 <span className="text-krds-danger-60">*</span>
  </label>
  <Input
    id="email"
    type="email"
    placeholder="example@email.com"
    aria-required="true"
    aria-describedby="email-error"
    error={!!errors.email}
  />
  {errors.email && (
    <p id="email-error" className="mt-1 text-krds-danger-60">
      {errors.email}
    </p>
  )}
</form>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="모범 사례" />
              <List variant="check">
                <ListItem>
                  <strong>권장:</strong> FormField 컴포넌트와 함께 사용하여
                  접근성 속성을 자동으로 연결하세요
                </ListItem>
                <ListItem>
                  항상 레이블을 제공하여 입력 필드의 목적을 명확하게 표시하세요
                  (FormLabel 또는 <Code>&lt;label&gt;</Code>)
                </ListItem>
                <ListItem>
                  필수 입력 필드는 시각적(<Code>*</Code>)과 프로그래밍적(
                  <Code>required</Code> prop) 표시를 모두 제공하세요
                </ListItem>
                <ListItem>
                  에러 메시지는 FormError를 사용하거나{' '}
                  <Code>aria-describedby</Code>로 연결하세요
                </ListItem>
                <ListItem>
                  <Code>placeholder</Code>는 힌트로만 사용하고, 레이블을
                  대체하지 마세요
                </ListItem>
                <ListItem>
                  상태별로 적절한 prop을 사용하세요:
                  <List variant="dash" className="mt-2 ml-4">
                    <ListItem>
                      <Code>status=&quot;error/success/info&quot;</Code> - 입력
                      상태 시각화
                    </ListItem>
                    <ListItem>
                      <Code>disabled</Code> - 입력 불가능한 상태 (시각적 +
                      기능적)
                    </ListItem>
                    <ListItem>
                      <Code>readOnly</Code> - 읽기 전용 (수정 불가, 값 보기만
                      가능)
                    </ListItem>
                  </List>
                </ListItem>
                <ListItem>
                  적절한 <Code>type</Code> 속성을 사용하세요:
                  <List variant="dash" className="mt-2 ml-4">
                    <ListItem>
                      <Code>password</Code> - 자동 visibility toggle 제공
                      (lucide-react 아이콘)
                    </ListItem>
                    <ListItem>
                      <Code>number</Code> - 모바일 숫자 키보드 활성화
                      (inputMode=&quot;numeric&quot;)
                    </ListItem>
                    <ListItem>
                      <Code>email/tel/url</Code> - 브라우저 자동완성 활용
                    </ListItem>
                  </List>
                </ListItem>
                <ListItem>
                  <Code>clearable</Code> prop으로 사용자 경험 향상 (검색 필드,
                  필터 등)
                </ListItem>
              </List>
            </Subsection>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          {/* Props */}
          <Section level="h2">
            <Heading level="h2" id="props" title="Props" />

            <Table>
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
                    <Code>type</Code>
                  </TableCell>
                  <TableCell>
                    <Code>
                      &quot;text&quot; | &quot;email&quot; |
                      &quot;password&quot; | ...
                    </Code>
                  </TableCell>
                  <TableCell>
                    <Code>&quot;text&quot;</Code>
                  </TableCell>
                  <TableCell>입력 필드 타입</TableCell>
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
                  <TableCell>입력 필드 크기 (32px / 40px / 48px)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>variant</Code>
                  </TableCell>
                  <TableCell>
                    <Code>&quot;default&quot; | &quot;filled&quot;</Code>
                  </TableCell>
                  <TableCell>
                    <Code>&quot;default&quot;</Code>
                  </TableCell>
                  <TableCell>입력 필드 스타일</TableCell>
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
                  <TableCell>입력 상태 표시 (border 색상 변경)</TableCell>
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
                  <TableCell>
                    <strong>(Deprecated)</strong> 에러 상태 표시.{' '}
                    <Code>status=&quot;error&quot;</Code> 사용 권장
                  </TableCell>
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
                    <Code>readOnly</Code>
                  </TableCell>
                  <TableCell>
                    <Code>boolean</Code>
                  </TableCell>
                  <TableCell>
                    <Code>false</Code>
                  </TableCell>
                  <TableCell>읽기 전용 상태 (값 수정 불가)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>clearable</Code>
                  </TableCell>
                  <TableCell>
                    <Code>boolean</Code>
                  </TableCell>
                  <TableCell>
                    <Code>false</Code>
                  </TableCell>
                  <TableCell>
                    입력값이 있을 때 지우기(X) 버튼 표시 (password 제외)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>onClear</Code>
                  </TableCell>
                  <TableCell>
                    <Code>() =&gt; void</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>지우기 버튼 클릭 시 콜백</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>leftAddon</Code>
                  </TableCell>
                  <TableCell>
                    <Code>ReactNode</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>왼쪽에 표시할 아이콘/요소</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>rightAddon</Code>
                  </TableCell>
                  <TableCell>
                    <Code>ReactNode</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>오른쪽에 표시할 아이콘/요소</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>placeholder</Code>
                  </TableCell>
                  <TableCell>
                    <Code>string</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>플레이스홀더 텍스트</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>className</Code>
                  </TableCell>
                  <TableCell>
                    <Code>string</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>추가 CSS 클래스 (layout only)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Section>

          {/* Size Variants */}
          <Section level="h2">
            <Heading level="h2" id="size-variants" title="Size Variants" />

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>크기</TableHead>
                  <TableHead>높이</TableHead>
                  <TableHead>폰트 크기</TableHead>
                  <TableHead>패딩</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Code>sm</Code>
                  </TableCell>
                  <TableCell>40px</TableCell>
                  <TableCell>15px (body-sm)</TableCell>
                  <TableCell>16px (horizontal)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>md</Code>
                  </TableCell>
                  <TableCell>48px</TableCell>
                  <TableCell>17px (body-md)</TableCell>
                  <TableCell>16px (horizontal)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>lg</Code>
                  </TableCell>
                  <TableCell>56px</TableCell>
                  <TableCell>19px (body-lg)</TableCell>
                  <TableCell>16px (horizontal)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Section>

          {/* CSS Classes */}
          <Section level="h2">
            <Heading level="h2" id="css-classes" title="CSS 클래스" />

            <Code variant="block" language="css">
              {`/* KRDS 색상 변수 */
--krds-color-light-gray-5     /* ReadOnly background */
--krds-color-light-gray-10    /* Disabled background */
--krds-color-light-gray-50    /* Placeholder text */
--krds-color-light-gray-60    /* Default border, Addon icon color */
--krds-color-light-primary-base   /* Focus border */
--krds-color-light-danger-60      /* Error border */
--krds-color-light-success-60     /* Success border */
--krds-color-light-info-60        /* Info border */

/* Tailwind 클래스 */
.border-krds-gray-60              /* Default border (1px) */
.bg-krds-white                    /* Default background */
.bg-krds-gray-10                  /* Filled background */
.bg-krds-gray-5                   /* ReadOnly background */
.focus-visible:border-2           /* Focus border (2px) */
.focus-visible:border-krds-primary-base  /* Focus border color */
.placeholder:text-krds-gray-50    /* Placeholder */

/* Status별 border */
.border-krds-danger-60            /* Error status */
.border-krds-success-60           /* Success status */
.border-krds-info-60              /* Info status */`}
            </Code>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{
          title: 'In-page Navigation',
          href: '/components/inpagenavigation',
        }}
        next={{ title: 'Label', href: '/components/label' }}
      />
    </>
  );
}
