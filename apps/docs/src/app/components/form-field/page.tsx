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
  FormField as FormFieldComponent,
  FormLabel,
  FormError,
  FormHelperText,
  Input,
  Textarea,
  Checkbox,
  CheckboxGroup,
  CheckboxGroupItem,
  RadioGroup,
  Radio,
  Switch,
  Select,
  Body,
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

export default function FormFieldPage() {
  return (
    <>
      <Heading
        level="h1"
        title="FormField"
        description="폼 필드를 구성하는 컴포넌트 그룹입니다. 레이블, 입력 필드, 에러 메시지, 도움말을 자동으로 연결하여 완전한 접근성을 제공합니다."
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
              <div className="flex flex-col gap-6 max-w-md">
                <FormFieldComponent id="email-basic">
                  <FormLabel>이메일 (기본)</FormLabel>
                  <Input type="email" placeholder="example@email.com" />
                </FormFieldComponent>
              </div>
            </ComponentPreview>

            <Code variant="block" language="tsx">
              {`import { FormField, FormLabel, FormHelperText, Input } from '@/components/hanui'

// 기본
<FormField id="email">
  <FormLabel>이메일</FormLabel>
  <Input type="email" placeholder="example@email.com" />
</FormField>`}
            </Code>
          </Section>

          <Installation componentName="form-field" />

          {/* Usage */}
          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Body className="mb-4">
              FormField는 4개의 컴포넌트로 구성됩니다:
            </Body>
            <List variant="ordered" spacing="default" className="mb-4">
              <ListItem>
                <Code>FormField</Code> - 컨테이너, Context 제공
              </ListItem>
              <ListItem>
                <Code>FormLabel</Code> - 레이블, 필수 표시 자동
              </ListItem>
              <ListItem>
                입력 컴포넌트 - Input, Textarea, Select, Checkbox, Radio, Switch
              </ListItem>
              <ListItem>
                <Code>FormError</Code> 또는 <Code>FormHelperText</Code> - 에러
                메시지 또는 도움말
              </ListItem>
            </List>
            <Code variant="block" language="tsx">
              {`import { FormField, FormLabel, FormError, FormHelperText, Input } from '@/components/hanui'

// 기본 구조
<FormField id="field-id">
  <FormLabel>레이블</FormLabel>
  <Input />
  <FormHelperText>도움말 (선택)</FormHelperText>
</FormField>`}
            </Code>
          </Section>

          {/* Supported Components */}
          <Section level="h2">
            <Heading
              level="h2"
              id="supported-components"
              title="지원 컴포넌트"
            />
            <Body className="mb-4">
              FormField는 다양한 폼 입력 컴포넌트와 함께 사용할 수 있습니다. 각
              컴포넌트는 <Code>useFormField</Code> 훅을 통해 자동으로
              FormField와 연결됩니다.
            </Body>

            <Subsection level="h3">
              <Heading level="h3" title="Textarea" />
              <ComponentPreview>
                <div className="flex flex-col gap-6 max-w-md">
                  <FormFieldComponent id="description" required>
                    <FormLabel>설명</FormLabel>
                    <Textarea placeholder="상세한 설명을 입력하세요" rows={4} />
                    <FormHelperText>최소 10자 이상 작성해주세요</FormHelperText>
                  </FormFieldComponent>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<FormField id="description" required>
  <FormLabel>설명</FormLabel>
  <Textarea placeholder="상세한 설명을 입력하세요" rows={4} />
  <FormHelperText>최소 10자 이상 작성해주세요</FormHelperText>
</FormField>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Select" />
              <ComponentPreview>
                <div className="flex flex-col gap-6 max-w-md">
                  <FormFieldComponent id="category" required>
                    <FormLabel>카테고리</FormLabel>
                    <Select
                      placeholder="카테고리를 선택하세요"
                      options={[
                        { value: 'tech', label: '기술' },
                        { value: 'design', label: '디자인' },
                        { value: 'business', label: '비즈니스' },
                      ]}
                    />
                    <FormHelperText>
                      적절한 카테고리를 선택해주세요
                    </FormHelperText>
                  </FormFieldComponent>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<FormField id="category" required>
  <FormLabel>카테고리</FormLabel>
  <Select
    placeholder="카테고리를 선택하세요"
    options={[
      { value: 'tech', label: '기술' },
      { value: 'design', label: '디자인' },
      { value: 'business', label: '비즈니스' },
    ]}
  />
  <FormHelperText>적절한 카테고리를 선택해주세요</FormHelperText>
</FormField>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Checkbox / CheckboxGroup" />
              <ComponentPreview>
                <div className="flex flex-col gap-6 max-w-md">
                  <FormFieldComponent id="terms" required>
                    <div className="flex items-center gap-2">
                      <Checkbox />
                      <FormLabel className="cursor-pointer">
                        이용약관에 동의합니다 *
                      </FormLabel>
                    </div>
                    <FormHelperText>
                      서비스 이용을 위해 필수 동의가 필요합니다
                    </FormHelperText>
                  </FormFieldComponent>

                  <FormFieldComponent id="interests" required>
                    <FormLabel>관심 분야</FormLabel>
                    <CheckboxGroup>
                      <CheckboxGroupItem value="frontend" label="프론트엔드" />
                      <CheckboxGroupItem value="backend" label="백엔드" />
                      <CheckboxGroupItem value="devops" label="DevOps" />
                    </CheckboxGroup>
                    <FormHelperText>최소 1개 이상 선택해주세요</FormHelperText>
                  </FormFieldComponent>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`// 단일 체크박스
<FormField id="terms" required>
  <div className="flex items-center gap-2">
    <Checkbox />
    <FormLabel className="cursor-pointer">이용약관에 동의합니다 *</FormLabel>
  </div>
  <FormHelperText>서비스 이용을 위해 필수 동의가 필요합니다</FormHelperText>
</FormField>

// 체크박스 그룹
<FormField id="interests" required>
  <FormLabel>관심 분야</FormLabel>
  <CheckboxGroup>
    <CheckboxGroupItem value="frontend" label="프론트엔드" />
    <CheckboxGroupItem value="backend" label="백엔드" />
    <CheckboxGroupItem value="devops" label="DevOps" />
  </CheckboxGroup>
  <FormHelperText>최소 1개 이상 선택해주세요</FormHelperText>
</FormField>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Radio / RadioGroup" />
              <ComponentPreview>
                <div className="flex flex-col gap-6 max-w-md">
                  <FormFieldComponent id="gender" required>
                    <FormLabel>성별</FormLabel>
                    <RadioGroup defaultValue="male">
                      <Radio value="male" label="남성" />
                      <Radio value="female" label="여성" />
                      <Radio value="other" label="기타" />
                    </RadioGroup>
                    <FormHelperText>
                      서비스 이용 통계에 활용됩니다
                    </FormHelperText>
                  </FormFieldComponent>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<FormField id="gender" required>
  <FormLabel>성별</FormLabel>
  <RadioGroup defaultValue="male">
    <Radio value="male" label="남성" />
    <Radio value="female" label="여성" />
    <Radio value="other" label="기타" />
  </RadioGroup>
  <FormHelperText>서비스 이용 통계에 활용됩니다</FormHelperText>
</FormField>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Switch" />
              <ComponentPreview>
                <div className="flex flex-col gap-6 max-w-md">
                  <FormFieldComponent id="notifications">
                    <div className="flex items-center justify-between">
                      <div>
                        <FormLabel>알림 설정</FormLabel>
                        <FormHelperText>
                          새로운 소식을 알림으로 받습니다
                        </FormHelperText>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </FormFieldComponent>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<FormField id="notifications">
  <div className="flex items-center justify-between">
    <div>
      <FormLabel>알림 설정</FormLabel>
      <FormHelperText>새로운 소식을 알림으로 받습니다</FormHelperText>
    </div>
    <Switch defaultChecked />
  </div>
</FormField>`}
              </Code>
            </Subsection>
          </Section>

          {/* Examples */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading level="h3" title="기본 사용" />
              <ComponentPreview>
                <div className="flex flex-col gap-6 max-w-md">
                  <FormFieldComponent id="username">
                    <FormLabel>사용자명</FormLabel>
                    <Input placeholder="4-20자의 영문, 숫자" />
                  </FormFieldComponent>

                  <FormFieldComponent id="email-readonly">
                    <FormLabel>이메일 (ReadOnly)</FormLabel>
                    <Input readOnly value="user@example.com" />
                    <FormHelperText>
                      읽기 전용 - 수정할 수 없습니다
                    </FormHelperText>
                  </FormFieldComponent>

                  <FormFieldComponent id="email-disabled" disabled>
                    <FormLabel>이메일 (Disabled)</FormLabel>
                    <Input placeholder="비활성화된 필드" />
                    <FormHelperText>입력할 수 없습니다</FormHelperText>
                  </FormFieldComponent>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<FormField id="username">
  <FormLabel>사용자명</FormLabel>
  <Input placeholder="4-20자의 영문, 숫자" />
</FormField>

// 읽기 전용 (수정 불가, 값 보기만 가능)
<FormField id="email-readonly">
  <FormLabel>이메일 (ReadOnly)</FormLabel>
  <Input readOnly value="user@example.com" />
  <FormHelperText>읽기 전용 - 수정할 수 없습니다</FormHelperText>
</FormField>

// 비활성화 (입력 불가)
<FormField id="email-disabled" disabled>
  <FormLabel>이메일 (Disabled)</FormLabel>
  <Input placeholder="비활성화된 필드" />
  <FormHelperText>입력할 수 없습니다</FormHelperText>
</FormField>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="필수 필드 (Required)" />
              <ComponentPreview>
                <div className="flex flex-col gap-6 max-w-md">
                  <FormFieldComponent id="email-required" required>
                    <FormLabel>이메일</FormLabel>
                    <Input type="email" placeholder="example@email.com" />
                  </FormFieldComponent>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<FormField id="email" required>
  <FormLabel>이메일</FormLabel>
  <Input type="email" placeholder="example@email.com" />
</FormField>

// FormLabel에 자동으로 * 표시가 추가되고
// Input에 aria-required="true"가 자동 설정됩니다`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="도움말 (Helper Text)" />
              <ComponentPreview>
                <div className="flex flex-col gap-6 max-w-md">
                  <FormFieldComponent id="password-helper">
                    <FormLabel>비밀번호</FormLabel>
                    <Input type="password" placeholder="비밀번호 입력" />
                    <FormHelperText>
                      영문, 숫자, 특수문자 포함 8자 이상
                    </FormHelperText>
                  </FormFieldComponent>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<FormField id="password">
  <FormLabel>비밀번호</FormLabel>
  <Input type="password" placeholder="비밀번호 입력" />
  <FormHelperText>영문, 숫자, 특수문자 포함 8자 이상</FormHelperText>
</FormField>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="상태" />
              <Body className="mb-4">
                FormField는 에러, 성공, 정보 상태를 지원하며, 자동으로 하위
                Input에 상태가 전달됩니다.
              </Body>
              <ComponentPreview>
                <div className="flex flex-col gap-6 max-w-md">
                  <FormFieldComponent id="email-error" status="error" required>
                    <FormLabel>이메일</FormLabel>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      defaultValue="invalid@"
                    />
                    <FormError>올바른 이메일 형식이 아닙니다</FormError>
                  </FormFieldComponent>

                  <FormFieldComponent
                    id="email-success"
                    status="success"
                    required
                  >
                    <FormLabel>이메일</FormLabel>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      defaultValue="user@example.com"
                    />
                    <FormHelperText>사용 가능한 이메일입니다</FormHelperText>
                  </FormFieldComponent>

                  <FormFieldComponent id="email-info" status="info">
                    <FormLabel>이메일</FormLabel>
                    <Input type="email" placeholder="example@email.com" />
                    <FormHelperText>회사 이메일을 사용하세요</FormHelperText>
                  </FormFieldComponent>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`// status prop으로 상태 지정
// - Input에 자동으로 상태별 스타일 적용
// - Input에 aria-invalid="true" 설정 (error인 경우)
// - FormError/FormHelperText의 id가 Input의 aria-describedby에 자동 연결

// 에러 상태
<FormField id="email" status="error" required>
  <FormLabel>이메일</FormLabel>
  <Input type="email" placeholder="example@email.com" />
  <FormError>올바른 이메일 형식이 아닙니다</FormError>
</FormField>

// 성공 상태
<FormField id="email" status="success" required>
  <FormLabel>이메일</FormLabel>
  <Input type="email" defaultValue="user@example.com" />
  <FormHelperText>사용 가능한 이메일입니다</FormHelperText>
</FormField>

// 정보 상태
<FormField id="email" status="info">
  <FormLabel>이메일</FormLabel>
  <Input type="email" placeholder="example@email.com" />
  <FormHelperText>회사 이메일을 사용하세요</FormHelperText>
</FormField>

// 이전 error prop (deprecated, status="error" 권장)
<FormField id="email" error={!!errors.email} required>
  <FormLabel>이메일</FormLabel>
  <Input type="email" placeholder="example@email.com" />
  {errors.email && <FormError>{errors.email}</FormError>}
</FormField>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="아이콘 버튼" />
              <Body className="mb-4">
                FormField의 <Code>clearable</Code> prop을 사용하면 입력값이 있을
                때 X 버튼이 자동으로 나타납니다. 비밀번호 필드는 추가로
                Eye/EyeOff 토글 버튼이 제공됩니다. 모든 아이콘 버튼은 마우스
                오버 시 primary-60 색상으로 변경되어 상호작용을 명확히
                표시합니다.
              </Body>
              <ComponentPreview>
                <form className="flex flex-col gap-6 max-w-md">
                  <FormFieldComponent id="form-username" required clearable>
                    <FormLabel>사용자명</FormLabel>
                    <Input
                      placeholder="4-20자의 영문, 숫자"
                      defaultValue="오다다"
                    />
                    <FormHelperText>
                      4-20자의 영문자와 숫자만 사용 가능합니다
                    </FormHelperText>
                  </FormFieldComponent>

                  <FormFieldComponent id="form-email" required clearable>
                    <FormLabel>이메일</FormLabel>
                    <Input type="email" placeholder="example@email.com" />
                  </FormFieldComponent>

                  <FormFieldComponent id="form-password" required clearable>
                    <FormLabel>비밀번호</FormLabel>
                    <Input
                      type="password"
                      placeholder="8자 이상"
                      defaultValue="12345678"
                    />
                    <FormHelperText>
                      영문, 숫자, 특수문자 포함 8자 이상
                    </FormHelperText>
                  </FormFieldComponent>

                  <FormFieldComponent id="form-age" clearable>
                    <FormLabel>나이</FormLabel>
                    <Input
                      type="number"
                      min={0}
                      max={120}
                      placeholder="0-120"
                    />
                  </FormFieldComponent>
                </form>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`// clearable prop으로 X 버튼 활성화
// - 입력값이 있을 때만 X 버튼 표시
// - password 필드는 X 버튼이 Eye 아이콘 왼쪽에 표시
// - 모든 아이콘 버튼은 hover 시 primary-60 색상으로 변경

<form>
  <FormField id="username" required clearable>
    <FormLabel>사용자명</FormLabel>
    <Input placeholder="4-20자의 영문, 숫자" />
    <FormHelperText>4-20자의 영문자와 숫자만 사용 가능합니다</FormHelperText>
  </FormField>

  <FormField id="email" required clearable>
    <FormLabel>이메일</FormLabel>
    <Input type="email" placeholder="example@email.com" />
  </FormField>

  <FormField id="password" required clearable>
    <FormLabel>비밀번호</FormLabel>
    <Input type="password" placeholder="8자 이상" />
    <FormHelperText>영문, 숫자, 특수문자 포함 8자 이상</FormHelperText>
  </FormField>

  <FormField id="age" clearable>
    <FormLabel>나이</FormLabel>
    <Input type="number" min={0} max={120} />
  </FormField>
</form>`}
              </Code>
            </Subsection>
          </Section>

          {/* Accessibility */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="FormField는 WCAG 2.1 AA 기준을 준수하며 자동으로 접근성 속성을 연결합니다."
            />

            <Subsection level="h3">
              <Heading level="h3" title="자동 연결되는 속성" />
              <List variant="check" spacing="default">
                <ListItem>
                  <Code>htmlFor</Code> - FormLabel이 자동으로 Input의 id와 연결
                </ListItem>
                <ListItem>
                  <Code>aria-required</Code> - required prop이 Input에 자동 전달
                </ListItem>
                <ListItem>
                  <Code>aria-invalid</Code> - error prop이 true일 때 Input에
                  자동 설정
                </ListItem>
                <ListItem>
                  <Code>aria-describedby</Code> - FormError와 FormHelperText의
                  id가 Input에 자동 연결
                </ListItem>
                <ListItem>
                  <Code>role=&quot;alert&quot;</Code> 및{' '}
                  <Code>aria-live=&quot;polite&quot;</Code> - FormError에 자동
                  설정
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="스크린 리더 지원" />
              <Body className="mb-4">
                FormField를 사용하면 스크린 리더 사용자에게 다음 정보가 자동으로
                전달됩니다:
              </Body>
              <List variant="ordered" spacing="default">
                <ListItem>레이블 텍스트와 필수 여부 (* 표시)</ListItem>
                <ListItem>입력 필드의 타입과 현재 값</ListItem>
                <ListItem>도움말 텍스트 (있는 경우)</ListItem>
                <ListItem>에러 메시지 (에러 상태일 때)</ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="모범 사례" />
              <List variant="check">
                <ListItem>
                  항상 FormLabel을 제공하여 필드의 목적을 명확하게 표시하세요
                </ListItem>
                <ListItem>
                  필수 필드는 <Code>required</Code> prop을 사용하여 표시하세요
                </ListItem>
                <ListItem>
                  에러 발생 시 FormError로 명확한 해결 방법을 제공하세요
                </ListItem>
                <ListItem>
                  복잡한 입력 규칙은 FormHelperText로 사전에 안내하세요
                </ListItem>
                <ListItem>
                  각 FormField에 고유한 id를 제공하세요 (자동 생성도 가능)
                </ListItem>
              </List>
            </Subsection>
          </Section>

          {/* How it works */}
          <Section level="h2">
            <Heading level="h2" id="how-it-works" title="작동 원리" />
            <Body className="mb-4">
              FormField는 React Context API를 사용하여 자식 컴포넌트들 간에
              상태를 공유합니다:
            </Body>
            <Code variant="block" language="tsx">
              {`// FormField가 Context를 통해 제공하는 값
interface FormFieldContextValue {
  id: string              // 필드 ID (자동 생성 또는 prop)
  status?: 'error' | 'success' | 'info'  // 상태 (error/success/info)
  error?: boolean         // 에러 상태 (deprecated, status 사용 권장)
  disabled?: boolean      // 비활성화 상태
  required?: boolean      // 필수 여부
  clearable?: boolean     // 지우기 버튼 표시 여부
  errorId?: string        // 에러 메시지 id (자동 생성)
  helperId?: string       // 도움말 id (자동 생성)
}

// 자식 컴포넌트들이 Context를 읽어 자동으로 연결
// - FormLabel: htmlFor={id}, required 표시
// - Input: id, status, clearable, aria-invalid, aria-required, aria-describedby
// - FormError: id={errorId}, role="alert", aria-live="polite", CircleX 아이콘
// - FormHelperText: id={helperId}, status별 색상/아이콘`}
            </Code>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          {/* FormField Props */}
          <Section level="h2">
            <Heading level="h2" id="formfield-props" title="FormField Props" />

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
                    <Code>id</Code>
                  </TableCell>
                  <TableCell>
                    <Code>string</Code>
                  </TableCell>
                  <TableCell>
                    <Code>auto-generated</Code>
                  </TableCell>
                  <TableCell>필드 고유 식별자 (자동 생성 가능)</TableCell>
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
                  <TableCell>
                    상태 표시 (Input border 및 FormHelperText 색상/아이콘 자동
                    변경)
                  </TableCell>
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
                    <strong>(Deprecated)</strong> 에러 상태.{' '}
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
                  <TableCell>비활성화 상태 (Input에 자동 전달)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>required</Code>
                  </TableCell>
                  <TableCell>
                    <Code>boolean</Code>
                  </TableCell>
                  <TableCell>
                    <Code>false</Code>
                  </TableCell>
                  <TableCell>
                    필수 필드 여부 (Label에 * 표시, Input에 aria-required 전달)
                  </TableCell>
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
                    입력값이 있을 때 지우기(X) 버튼 표시 (Input에 자동 전달)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>children</Code>
                  </TableCell>
                  <TableCell>
                    <Code>ReactNode</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    자식 컴포넌트 (FormLabel, Input, FormError, FormHelperText)
                  </TableCell>
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
          </Section>

          {/* FormLabel Props */}
          <Section level="h2">
            <Heading level="h2" id="formlabel-props" title="FormLabel Props" />

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
                    <Code>children</Code>
                  </TableCell>
                  <TableCell>
                    <Code>ReactNode</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>레이블 텍스트</TableCell>
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
                <TableRow>
                  <TableCell colSpan={4}>
                    <Body className="text-krds-gray-70">
                      + 모든 HTML label 속성 지원
                    </Body>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Body className="mt-4">
              <strong>자동 설정:</strong> <Code>htmlFor</Code>는 FormField의
              id로 자동 설정되며, required일 때 <Code>*</Code> 표시가 자동으로
              추가됩니다.
            </Body>
          </Section>

          {/* FormError Props */}
          <Section level="h2">
            <Heading level="h2" id="formerror-props" title="FormError Props" />

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
                    <Code>children</Code>
                  </TableCell>
                  <TableCell>
                    <Code>ReactNode</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>에러 메시지</TableCell>
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
                <TableRow>
                  <TableCell colSpan={4}>
                    <Body className="text-krds-gray-70">
                      + 모든 HTML div 속성 지원
                    </Body>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Body className="mt-4">
              <strong>자동 설정:</strong> <Code>id</Code>,{' '}
              <Code>role=&quot;alert&quot;</Code>,{' '}
              <Code>aria-live=&quot;polite&quot;</Code>가 자동으로 설정되며,{' '}
              <Code>&lt;CircleX /&gt;</Code> 아이콘 (lucide-react)이 자동으로
              추가됩니다.
            </Body>
          </Section>

          {/* FormHelperText Props */}
          <Section level="h2">
            <Heading
              level="h2"
              id="formhelpertext-props"
              title="FormHelperText Props"
            />

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
                    <Code>children</Code>
                  </TableCell>
                  <TableCell>
                    <Code>ReactNode</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>도움말 텍스트</TableCell>
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
                <TableRow>
                  <TableCell colSpan={4}>
                    <Body className="text-krds-gray-70">
                      + 모든 HTML div 속성 지원
                    </Body>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Body className="mt-4">
              <strong>자동 설정:</strong> <Code>id</Code>가 자동으로 설정되며,{' '}
              FormField의 <Code>status</Code> prop에 따라 색상과 아이콘이
              자동으로 변경됩니다 (success: <Code>&lt;Check /&gt;</Code>, info:{' '}
              <Code>&lt;Info /&gt;</Code>).
            </Body>
          </Section>

          {/* Styling */}
          <Section level="h2">
            <Heading level="h2" id="styling" title="스타일링" />

            <Subsection level="h3">
              <Heading level="h3" title="FormLabel 스타일" />
              <Code variant="block" language="css">
                {`/* 기본 스타일 */
font-size: 17px;           /* KRDS body-md */
font-weight: 500;          /* Medium */
color: var(--krds-gray-90);
line-height: 140%;

/* 필수 표시 (*) */
color: var(--krds-danger-50);
margin-left: 4px;`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="FormError 스타일" />
              <Code variant="block" language="css">
                {`/* 기본 스타일 */
font-size: 15px;           /* KRDS body-sm */
color: var(--krds-danger-60);
line-height: 150%;
display: flex;
align-items: center;
gap: 4px;

/* 아이콘 (lucide-react) */
<CircleX className="w-4 h-4" />
color: var(--krds-danger-60);`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="FormHelperText 스타일" />
              <Code variant="block" language="css">
                {`/* 기본 스타일 */
font-size: 15px;           /* KRDS body-sm */
line-height: 150%;

/* 상태별 색상 */
color: var(--krds-gray-70);        /* 기본 */
color: var(--krds-danger-60);      /* status="error" */
color: var(--krds-success-60);     /* status="success" */
color: var(--krds-info-60);        /* status="info" */

/* 상태별 아이콘 (lucide-react) */
<Check className="w-4 h-4" />      /* status="success" */
<Info className="w-4 h-4" />       /* status="info" */`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="FormField 레이아웃" />
              <Code variant="block" language="css">
                {`/* 기본 레이아웃 */
display: flex;
flex-direction: column;
gap: 8px;                  /* 요소 간 간격 */`}
              </Code>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Footer', href: '/components/footer' }}
        next={{ title: 'Grid', href: '/components/grid' }}
      />
    </>
  );
}
