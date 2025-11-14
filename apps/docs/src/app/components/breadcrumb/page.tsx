'use client';

import { Breadcrumb, BreadcrumbItem, Heading, Body, Stack } from '@hanui/react';
import Link from 'next/link';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

// Example icons using SVG
const HomeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 1L1 6V15H6V11H10V15H15V6L8 1Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const FolderIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 4C2 3.44772 2.44772 3 3 3H6.58579C6.851 3 7.10536 3.10536 7.29289 3.29289L8.70711 4.70711C8.89464 4.89464 9.149 5 9.41421 5H13C13.5523 5 14 5.44772 14 6V12C14 12.5523 13.5523 13 13 13H3C2.44772 13 2 12.5523 2 12V4Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export default function BreadcrumbPage() {
  return (
    <>
      <PageHeader
        title="Breadcrumb"
        description="현재 페이지의 위치를 나타내는 KRDS 기반 브레드크럼 네비게이션 컴포넌트"
      />

      {/* Quick Start */}
      <PageSection>
        <ComponentPreview>
          <Breadcrumb>
            <BreadcrumbItem href="/">홈</BreadcrumbItem>
            <BreadcrumbItem href="/products">제품</BreadcrumbItem>
            <BreadcrumbItem href="/products/electronics">
              전자제품
            </BreadcrumbItem>
            <BreadcrumbItem current>노트북</BreadcrumbItem>
          </Breadcrumb>
        </ComponentPreview>
        <div className="mt-4">
          <CodeBlock
            code={`import { Breadcrumb, BreadcrumbItem } from '@hanui/react';

<Breadcrumb>
  <BreadcrumbItem href="/">홈</BreadcrumbItem>
  <BreadcrumbItem href="/products">제품</BreadcrumbItem>
  <BreadcrumbItem href="/products/electronics">
    전자제품
  </BreadcrumbItem>
  <BreadcrumbItem current>노트북</BreadcrumbItem>
</Breadcrumb>`}
            language="tsx"
            showLineNumbers={false}
          />
        </div>
      </PageSection>

      {/* Examples */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="examples">
            Examples
          </Heading>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* Basic Breadcrumb */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Basic Breadcrumb</Heading>
            <Body className="mb-4">
              기본 브레드크럼입니다. 마지막 항목에 current prop을 설정합니다.
            </Body>
            <div>
              <ComponentPreview>
                <Breadcrumb>
                  <BreadcrumbItem href="/">홈</BreadcrumbItem>
                  <BreadcrumbItem href="/docs">문서</BreadcrumbItem>
                  <BreadcrumbItem current>컴포넌트</BreadcrumbItem>
                </Breadcrumb>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Breadcrumb>
  <BreadcrumbItem href="/">홈</BreadcrumbItem>
  <BreadcrumbItem href="/docs">문서</BreadcrumbItem>
  <BreadcrumbItem current>컴포넌트</BreadcrumbItem>
</Breadcrumb>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Custom Separator */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Custom Separator</Heading>
            <Body className="mb-4">
              separator prop으로 구분자를 커스터마이징할 수 있습니다. 기본값은
              &apos;&gt;&apos;입니다.
            </Body>
            <div>
              <ComponentPreview>
                <div className="space-y-4">
                  <Breadcrumb separator="/">
                    <BreadcrumbItem href="/">홈</BreadcrumbItem>
                    <BreadcrumbItem href="/users">사용자</BreadcrumbItem>
                    <BreadcrumbItem current>프로필</BreadcrumbItem>
                  </Breadcrumb>

                  <Breadcrumb separator="-">
                    <BreadcrumbItem href="/">홈</BreadcrumbItem>
                    <BreadcrumbItem href="/settings">설정</BreadcrumbItem>
                    <BreadcrumbItem current>계정</BreadcrumbItem>
                  </Breadcrumb>

                  <Breadcrumb separator="·">
                    <BreadcrumbItem href="/">홈</BreadcrumbItem>
                    <BreadcrumbItem href="/blog">블로그</BreadcrumbItem>
                    <BreadcrumbItem current>게시글</BreadcrumbItem>
                  </Breadcrumb>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Breadcrumb separator="/">
  <BreadcrumbItem href="/">홈</BreadcrumbItem>
  <BreadcrumbItem href="/users">사용자</BreadcrumbItem>
  <BreadcrumbItem current>프로필</BreadcrumbItem>
</Breadcrumb>

<Breadcrumb separator="-">
  <BreadcrumbItem href="/">홈</BreadcrumbItem>
  <BreadcrumbItem href="/settings">설정</BreadcrumbItem>
  <BreadcrumbItem current>계정</BreadcrumbItem>
</Breadcrumb>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* With Icons */}
          <Stack spacing="heading-tight">
            <Heading level="h3">With Icons</Heading>
            <Body className="mb-4">아이콘을 포함한 브레드크럼입니다.</Body>
            <div>
              <ComponentPreview>
                <Breadcrumb>
                  <BreadcrumbItem href="/">
                    <span className="flex items-center gap-1">
                      <HomeIcon />
                      <span>홈</span>
                    </span>
                  </BreadcrumbItem>
                  <BreadcrumbItem href="/projects">
                    <span className="flex items-center gap-1">
                      <FolderIcon />
                      <span>프로젝트</span>
                    </span>
                  </BreadcrumbItem>
                  <BreadcrumbItem current>디자인 시스템</BreadcrumbItem>
                </Breadcrumb>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Breadcrumb>
  <BreadcrumbItem href="/">
    <span className="flex items-center gap-1">
      <HomeIcon />
      <span>홈</span>
    </span>
  </BreadcrumbItem>
  <BreadcrumbItem href="/projects">
    <span className="flex items-center gap-1">
      <FolderIcon />
      <span>프로젝트</span>
    </span>
  </BreadcrumbItem>
  <BreadcrumbItem current>디자인 시스템</BreadcrumbItem>
</Breadcrumb>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Icon Only */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Icon Only</Heading>
            <Body className="mb-4">
              첫 번째 항목을 아이콘만으로 표시할 수 있습니다.
            </Body>
            <div>
              <ComponentPreview>
                <Breadcrumb>
                  <BreadcrumbItem href="/">
                    <HomeIcon />
                  </BreadcrumbItem>
                  <BreadcrumbItem href="/library">라이브러리</BreadcrumbItem>
                  <BreadcrumbItem href="/library/components">
                    컴포넌트
                  </BreadcrumbItem>
                  <BreadcrumbItem current>Breadcrumb</BreadcrumbItem>
                </Breadcrumb>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Breadcrumb>
  <BreadcrumbItem href="/">
    <HomeIcon />
  </BreadcrumbItem>
  <BreadcrumbItem href="/library">라이브러리</BreadcrumbItem>
  <BreadcrumbItem href="/library/components">
    컴포넌트
  </BreadcrumbItem>
  <BreadcrumbItem current>Breadcrumb</BreadcrumbItem>
</Breadcrumb>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Deep Navigation */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Deep Navigation</Heading>
            <Body className="mb-4">
              깊은 계층 구조의 네비게이션 예제입니다.
            </Body>
            <div>
              <ComponentPreview>
                <Breadcrumb>
                  <BreadcrumbItem href="/">홈</BreadcrumbItem>
                  <BreadcrumbItem href="/admin">관리</BreadcrumbItem>
                  <BreadcrumbItem href="/admin/settings">설정</BreadcrumbItem>
                  <BreadcrumbItem href="/admin/settings/users">
                    사용자
                  </BreadcrumbItem>
                  <BreadcrumbItem href="/admin/settings/users/permissions">
                    권한
                  </BreadcrumbItem>
                  <BreadcrumbItem current>역할 관리</BreadcrumbItem>
                </Breadcrumb>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Breadcrumb>
  <BreadcrumbItem href="/">홈</BreadcrumbItem>
  <BreadcrumbItem href="/admin">관리</BreadcrumbItem>
  <BreadcrumbItem href="/admin/settings">설정</BreadcrumbItem>
  <BreadcrumbItem href="/admin/settings/users">
    사용자
  </BreadcrumbItem>
  <BreadcrumbItem href="/admin/settings/users/permissions">
    권한
  </BreadcrumbItem>
  <BreadcrumbItem current>역할 관리</BreadcrumbItem>
</Breadcrumb>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* With Next.js Link */}
          <Stack spacing="heading-tight">
            <Heading level="h3">With Next.js Link</Heading>
            <Body className="mb-4">
              Next.js Link 컴포넌트와 함께 사용할 수 있습니다.
            </Body>
            <div>
              <ComponentPreview>
                <Breadcrumb>
                  <BreadcrumbItem href="/">
                    <Link href="/">홈</Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem href="/components">
                    <Link href="/components">컴포넌트</Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem current>Breadcrumb</BreadcrumbItem>
                </Breadcrumb>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`import Link from 'next/link';

<Breadcrumb>
  <BreadcrumbItem href="/">
    <Link href="/">홈</Link>
  </BreadcrumbItem>
  <BreadcrumbItem href="/components">
    <Link href="/components">컴포넌트</Link>
  </BreadcrumbItem>
  <BreadcrumbItem current>Breadcrumb</BreadcrumbItem>
</Breadcrumb>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>
        </Stack>
      </PageSection>

      {/* API Reference */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="api">
            API Reference
          </Heading>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* Breadcrumb */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Breadcrumb</Heading>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <th className="text-left py-3 px-4 font-semibold w-1/5">
                      Prop
                    </th>
                    <th className="text-left py-3 px-4 font-semibold w-2/5">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 font-semibold w-1/6">
                      Default
                    </th>
                    <th className="text-left py-3 px-4 font-semibold w-1/4">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">separator</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      string | React.ReactNode
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">
                      &quot;&gt;&quot;
                    </td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      항목 간 구분자
                    </td>
                  </tr>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">children</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      React.ReactNode
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">-</td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      BreadcrumbItem 컴포넌트들
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Stack>

          {/* BreadcrumbItem */}
          <Stack spacing="heading-tight">
            <Heading level="h3">BreadcrumbItem</Heading>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <th className="text-left py-3 px-4 font-semibold w-1/5">
                      Prop
                    </th>
                    <th className="text-left py-3 px-4 font-semibold w-2/5">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 font-semibold w-1/6">
                      Default
                    </th>
                    <th className="text-left py-3 px-4 font-semibold w-1/4">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">href</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      string
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">-</td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      링크 URL (current가 false일 때 필수)
                    </td>
                  </tr>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">current</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      boolean
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">false</td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      현재 페이지 여부
                    </td>
                  </tr>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">children</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      React.ReactNode
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">-</td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      표시할 내용
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Stack>
        </Stack>
      </PageSection>

      {/* Best Practices */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="best-practices">
            Best Practices
          </Heading>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>현재 페이지 표시:</strong> 마지막 항목에는 항상 current
              prop을 설정하세요
            </li>
            <li>
              <strong>홈 링크:</strong> 첫 번째 항목은 일반적으로 홈 페이지로
              연결합니다
            </li>
            <li>
              <strong>간결성:</strong> 항목 이름은 짧고 명확하게 유지하세요
            </li>
            <li>
              <strong>모바일 대응:</strong> 깊은 계층에서는 중간 항목을
              생략하거나 드롭다운으로 처리하는 것을 고려하세요
            </li>
            <li>
              <strong>일관성:</strong> 사이트 전체에서 동일한 구분자와 스타일을
              사용하세요
            </li>
          </ul>
        </Stack>
      </PageSection>

      {/* Accessibility */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="accessibility">
            Accessibility
          </Heading>
          <Body>이 컴포넌트는 WCAG 2.1 AA 기준을 준수합니다:</Body>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>시맨틱 마크업:</strong> nav 태그와 적절한 ARIA 레이블 사용
            </li>
            <li>
              <strong>구조화된 데이터:</strong> ol/li 태그로 순서 있는 목록 표현
            </li>
            <li>
              <strong>ARIA 속성:</strong> aria-label=&quot;breadcrumb&quot;로
              네비게이션 유형 명시
            </li>
            <li>
              <strong>현재 페이지:</strong> aria-current=&quot;page&quot;로 현재
              위치 표시
            </li>
            <li>
              <strong>키보드 네비게이션:</strong> Tab 키로 링크 간 이동 가능
            </li>
            <li>
              <strong>스크린 리더:</strong> 구분자는 aria-hidden으로 숨김 처리
            </li>
          </ul>
        </Stack>
      </PageSection>
    </>
  );
}
