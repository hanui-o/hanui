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
        description="다양한 스타일과 크기를 지원하는 입력 필드 컴포넌트입니다. KRDS 표준을 준수하며 완전한 접근성을 제공합니다."
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
                <InputComponent
                  leftAddon={<SearchIcon />}
                  placeholder="검색어 입력"
                />
              </div>
            </ComponentPreview>

            <Code variant="block" language="tsx">
              {`import { Input } from '@hanui/react'

<Input placeholder="기본 입력 필드" />
<Input leftAddon={<SearchIcon />} placeholder="검색어 입력" />`}
            </Code>
          </Section>

          <Installation componentName="input" />

          {/* Usage */}
          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { Input } from '@hanui/react'

<Input placeholder="이름 입력" />`}
            </Code>
          </Section>

          {/* Examples */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading level="h3" title="Size" />
              <Code variant="block" language="tsx">
                {`<Input size="sm" placeholder="Small (32px)" />
<Input size="md" placeholder="Medium (40px)" />
<Input size="lg" placeholder="Large (48px)" />`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Variant" />
              <Code variant="block" language="tsx">
                {`<Input variant="default" placeholder="Default (테두리)" />
<Input variant="filled" placeholder="Filled (배경)" />`}
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
              <Heading level="h3" title="에러 상태" />
              <Code variant="block" language="tsx">
                {`<Input error type="email" defaultValue="invalid@" />
<p className="mt-1 text-krds-danger-text">
  이메일 형식이 올바르지 않습니다.
</p>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Input Types" />
              <Code variant="block" language="tsx">
                {`<Input type="text" placeholder="텍스트" />
<Input type="email" placeholder="이메일" />
<Input type="password" placeholder="비밀번호" />
<Input type="number" placeholder="숫자" />
<Input type="tel" placeholder="전화번호" />
<Input type="url" placeholder="URL" />
<Input type="date" />`}
              </Code>
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
                  <TableHead>Type</TableHead>
                  <TableHead>Default</TableHead>
                  <TableHead>Description</TableHead>
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
                    <Code>error</Code>
                  </TableCell>
                  <TableCell>
                    <Code>boolean</Code>
                  </TableCell>
                  <TableCell>
                    <Code>false</Code>
                  </TableCell>
                  <TableCell>에러 상태 표시 (aria-invalid 자동 설정)</TableCell>
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
                  <TableHead>Size</TableHead>
                  <TableHead>Height</TableHead>
                  <TableHead>Font Size</TableHead>
                  <TableHead>Padding</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Code>sm</Code>
                  </TableCell>
                  <TableCell>32px</TableCell>
                  <TableCell>15px (body-sm)</TableCell>
                  <TableCell>16px (horizontal)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>md</Code>
                  </TableCell>
                  <TableCell>40px</TableCell>
                  <TableCell>17px (body-md)</TableCell>
                  <TableCell>16px (horizontal)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>lg</Code>
                  </TableCell>
                  <TableCell>48px</TableCell>
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
--krds-color-light-gray-10    /* Disabled background */
--krds-color-light-gray-30    /* Border color */
--krds-color-light-gray-50    /* Placeholder text */
--krds-color-light-gray-60    /* Addon icon color */
--krds-color-light-primary-60 /* Focus ring */
--krds-color-light-danger-50  /* Error border and ring */

/* Tailwind 클래스 */
.border-krds-gray-30          /* Default border */
.bg-krds-white                /* Default background */
.bg-krds-gray-10              /* Filled background */
.focus-visible:ring-krds-primary-60  /* Focus ring */
.placeholder:text-krds-gray-50       /* Placeholder */`}
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
