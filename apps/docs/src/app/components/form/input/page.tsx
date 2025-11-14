'use client';

import { Input, Heading, Body, Stack } from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';
import { Installation } from '@/components/content/Installation';
import { GuidelineSection } from '@/components/content/GuidelineSection';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

// Example icons using SVG
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
      <PageHeader
        title="Input"
        description="다양한 스타일과 크기를 지원하는 입력 필드 컴포넌트"
      />

      <PageSection>
        <ComponentPreview>
          <div className="flex flex-col gap-4 max-w-md">
            <Input placeholder="기본 입력 필드" />
            <Input leftAddon={<SearchIcon />} placeholder="검색어 입력" />
          </div>
        </ComponentPreview>
      </PageSection>

      {/* Overview */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="overview">
            개요
          </Heading>
          <Body className="leading-relaxed">
            입력 필드는 사용자로부터 정보를 받는 가장 기본적인 인터랙션
            요소입니다. HANUI Input은{' '}
            <strong>KRDS(한국형 웹 콘텐츠 접근성 지침)</strong>를 준수하여
            레이블 연결, 에러 처리, 키보드 네비게이션 등 웹 접근성을 보장합니다.
          </Body>
        </Stack>
      </PageSection>

      {/* Usage Guidelines */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="guidelines">
            사용 가이드라인
          </Heading>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* When to use */}
          <Stack spacing="heading-tight">
            <Heading level="h3">언제 사용해야 하나요?</Heading>
            <div className="grid grid-cols-1 gap-4">
              <GuidelineSection
                type="do"
                title="입력 필드를 사용하기 적합한 경우"
              >
                <ul className="list-disc list-inside space-y-2">
                  <li>이름, 주소, 이메일 등 자유 형식의 텍스트 수집</li>
                  <li>검색어를 입력받을 때</li>
                  <li>비밀번호, 전화번호 등 특수 형식의 데이터</li>
                  <li>숫자나 날짜 등 구조화된 데이터 입력</li>
                </ul>
              </GuidelineSection>

              <GuidelineSection
                type="dont"
                title="입력 필드를 사용하지 말아야 하는 경우"
              >
                <ul className="list-disc list-inside space-y-2">
                  <li>선택지가 5개 이하로 제한적인 경우 → Radio 사용</li>
                  <li>
                    여러 옵션 중 선택하는 경우 → Select 또는 Checkbox 사용
                  </li>
                  <li>Yes/No 이진 선택인 경우 → Checkbox 또는 Toggle 사용</li>
                </ul>
              </GuidelineSection>
            </div>
          </Stack>

          {/* Label Guidelines */}
          <Stack spacing="heading-tight">
            <Heading level="h3">레이블 가이드</Heading>
            <GuidelineSection type="do" title="레이블은 항상 제공">
              <p className="mb-3">
                모든 입력 필드에는 명확한 레이블이 필요합니다. 시각적으로 숨겨진
                경우에도 스크린 리더를 위한 레이블은 반드시 제공해야 합니다.
              </p>
              <ComponentPreview>
                <div className="max-w-md space-y-2">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium"
                  >
                    사용자명
                  </label>
                  <Input id="username" placeholder="홍길동" />
                </div>
              </ComponentPreview>
            </GuidelineSection>

            <div className="mt-4">
              <GuidelineSection
                type="dont"
                title="플레이스홀더만 사용하지 마세요"
              >
                <p>
                  플레이스홀더는 입력 예시를 보여주는 보조 수단일 뿐, 레이블을
                  대체할 수 없습니다. 입력을 시작하면 플레이스홀더가 사라지므로
                  별도 레이블이 필요합니다.
                </p>
              </GuidelineSection>
            </div>
          </Stack>

          {/* Input Type */}
          <Stack spacing="heading-tight">
            <Heading level="h3">적절한 Input Type 사용</Heading>
            <GuidelineSection type="do" title="HTML5 input type 활용">
              <p className="mb-3">
                email, tel, url, number, date 등을 사용하여 모바일 환경에서
                최적화된 키보드를 제공하고 브라우저 자동 검증을 활용하세요.
              </p>
              <ComponentPreview>
                <div className="max-w-md space-y-3">
                  <Input type="email" placeholder="example@email.com" />
                  <Input type="tel" placeholder="010-1234-5678" />
                  <Input type="number" placeholder="100" />
                </div>
              </ComponentPreview>
            </GuidelineSection>
          </Stack>

          {/* Error Messages */}
          <Stack spacing="heading-tight">
            <Heading level="h3">에러 메시지</Heading>
            <GuidelineSection type="do" title="명확하고 구체적인 에러 메시지">
              <p className="mb-3">
                &quot;잘못된 입력&quot;이 아닌 &quot;이메일 형식이 올바르지
                않습니다. &apos;@&apos;를 포함해주세요&quot;와 같이 해결 방법을
                제시합니다.
              </p>
              <ComponentPreview>
                <div className="max-w-md space-y-2">
                  <Input error type="email" defaultValue="invalid" />
                  <p className="text-sm text-red-600">
                    이메일 형식이 올바르지 않습니다. &apos;@&apos;를
                    포함해주세요.
                  </p>
                </div>
              </ComponentPreview>
            </GuidelineSection>
          </Stack>
        </Stack>
      </PageSection>

      <PageSection>
        <Installation componentName="input" />
      </PageSection>

      {/* Usage */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="usage">
            사용법
          </Heading>
          <CodeBlock
            code={`import { Input } from '@hanui/react'

<Input placeholder="내용을 입력하세요" />`}
            language="tsx"
            showLineNumbers={false}
          />
        </Stack>
      </PageSection>

      {/* Examples */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="examples">
            예제
          </Heading>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* Default */}
          <Stack spacing="heading-tight">
            <Heading level="h3" id="default">
              기본
            </Heading>
            <div>
              <ComponentPreview>
                <div className="max-w-md">
                  <Input placeholder="내용을 입력하세요" />
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Input placeholder="내용을 입력하세요" />`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Sizes */}
          <Stack spacing="heading-tight">
            <Heading level="h3" id="sizes">
              Size (크기)
            </Heading>
            <div>
              <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
                <Body size="sm" className="text-blue-900 dark:text-blue-100">
                  <strong>언제 사용하나요?</strong> 입력 필드 크기는 예상 입력
                  길이와 일치시킵니다. Small은 우편번호 등 짧은 입력, Large는
                  제목이나 주소 등 긴 입력에 적합합니다.
                </Body>
              </div>
              <ComponentPreview>
                <div className="max-w-md space-y-4">
                  <Input size="sm" placeholder="Small (32px)" />
                  <Input size="md" placeholder="Medium (40px)" />
                  <Input size="lg" placeholder="Large (48px)" />
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Input size="sm" placeholder="Small (32px)" />
<Input size="md" placeholder="Medium (40px)" />
<Input size="lg" placeholder="Large (48px)" />`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Variant */}
          <Stack spacing="heading-tight">
            <Heading level="h3" id="variant">
              Variant
            </Heading>
            <div>
              <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
                <Body size="sm" className="text-blue-900 dark:text-blue-100">
                  <strong>언제 사용하나요?</strong> Default는 일반적인 경우,
                  Filled는 배경이 있는 디자인에 적합합니다.
                </Body>
              </div>
              <ComponentPreview>
                <div className="max-w-md space-y-4">
                  <Input variant="default" placeholder="Default (테두리)" />
                  <Input variant="filled" placeholder="Filled (배경)" />
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Input variant="default" placeholder="Default (테두리)" />
<Input variant="filled" placeholder="Filled (배경)" />`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* With Icons */}
          <Stack spacing="heading-tight">
            <Heading level="h3" id="with-icons">
              With Icons
            </Heading>
            <div>
              <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
                <Body size="sm" className="text-blue-900 dark:text-blue-100">
                  <strong>언제 사용하나요?</strong> 입력 필드의 용도를
                  시각적으로 명확히 하고 싶을 때 사용합니다. 예: 검색(돋보기),
                  이메일(편지), 비밀번호(자물쇠)
                </Body>
              </div>
              <ComponentPreview>
                <div className="max-w-md space-y-4">
                  <Input
                    leftAddon={<SearchIcon />}
                    placeholder="검색어를 입력하세요"
                  />
                  <Input
                    leftAddon={<EmailIcon />}
                    type="email"
                    placeholder="example@email.com"
                  />
                  <Input rightAddon={<CheckIcon />} placeholder="확인 완료" />
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Input
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
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Error State */}
          <Stack spacing="heading-tight">
            <Heading level="h3" id="error">
              에러 상태
            </Heading>
            <div>
              <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
                <Body size="sm" className="text-blue-900 dark:text-blue-100">
                  <strong>언제 사용하나요?</strong> 입력값이 유효하지 않을 때
                  사용자에게 즉각적인 피드백을 제공합니다. 에러 메시지는
                  구체적인 해결 방법을 포함해야 합니다.
                </Body>
              </div>
              <ComponentPreview>
                <div className="max-w-md space-y-4">
                  <div>
                    <Input
                      error
                      placeholder="잘못된 입력"
                      defaultValue="invalid@"
                    />
                    <p className="mt-1 text-sm text-red-600">
                      이메일 형식이 올바르지 않습니다. &apos;@&apos;를
                      포함해주세요.
                    </p>
                  </div>
                  <div>
                    <Input
                      error
                      leftAddon={<EmailIcon />}
                      placeholder="example@email.com"
                    />
                    <p className="mt-1 text-sm text-red-600">
                      필수 입력 항목입니다.
                    </p>
                  </div>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Input error placeholder="잘못된 입력" defaultValue="invalid@" />
<p className="mt-1 text-sm text-red-600">
  이메일 형식이 올바르지 않습니다. '@'를 포함해주세요.
</p>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Disabled */}
          <Stack spacing="heading-tight">
            <Heading level="h3" id="disabled">
              비활성화
            </Heading>
            <div>
              <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
                <Body size="sm" className="text-blue-900 dark:text-blue-100">
                  <strong>언제 사용하나요?</strong> 특정 조건이 충족되지 않아
                  입력을 받을 수 없을 때 사용합니다. 예: 이전 단계 미완료, 권한
                  없음
                </Body>
              </div>
              <ComponentPreview>
                <div className="max-w-md space-y-4">
                  <Input disabled placeholder="비활성화된 입력 필드" />
                  <Input
                    disabled
                    variant="filled"
                    placeholder="비활성화된 Filled"
                  />
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Input disabled placeholder="비활성화된 입력 필드" />
<Input disabled variant="filled" placeholder="비활성화된 Filled" />`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Types */}
          <Stack spacing="heading-tight">
            <Heading level="h3" id="types">
              Input Types
            </Heading>
            <div>
              <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
                <Body size="sm" className="text-blue-900 dark:text-blue-100">
                  <strong>언제 사용하나요?</strong> 각 데이터 타입에 맞는 type을
                  사용하면 모바일에서 적절한 키보드가 표시되고, 브라우저의 자동
                  검증 기능을 활용할 수 있습니다.
                </Body>
              </div>
              <ComponentPreview>
                <div className="max-w-md space-y-4">
                  <Input type="text" placeholder="텍스트" />
                  <Input type="email" placeholder="이메일" />
                  <Input type="password" placeholder="비밀번호" />
                  <Input type="number" placeholder="숫자" />
                  <Input type="tel" placeholder="전화번호" />
                  <Input type="url" placeholder="URL" />
                  <Input type="date" />
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Input type="text" placeholder="텍스트" />
<Input type="email" placeholder="이메일" />
<Input type="password" placeholder="비밀번호" />
<Input type="number" placeholder="숫자" />
<Input type="tel" placeholder="전화번호" />
<Input type="url" placeholder="URL" />
<Input type="date" />`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>
        </Stack>
      </PageSection>
    </>
  );
}
