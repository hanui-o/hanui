'use client';

import { Input } from '@hanui/react';
import Link from 'next/link';

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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-20 dark:border-gray-80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-primary-60">HANUI</h1>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-60 dark:text-gray-40 mb-4">
            <Link href="/" className="hover:text-primary-60">
              홈
            </Link>
            {' / '}
            <Link href="/components" className="hover:text-primary-60">
              컴포넌트
            </Link>
            {' / '}
            <span>Input</span>
          </div>

          <h1 className="text-4xl font-bold mb-4">Input</h1>
          <p className="text-xl text-gray-60 dark:text-gray-40 mb-8">
            다양한 스타일과 크기를 지원하는 KRDS 기반 입력 필드 컴포넌트
          </p>

          {/* Quick Start */}
          <section className="mb-12">
            <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
              <Input placeholder="내용을 입력하세요" />
            </div>
            <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
              <code>{`import { Input } from '@hanui/react';

export default () => <Input placeholder="내용을 입력하세요" />;`}</code>
            </pre>
          </section>

          {/* Examples */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8">Examples</h2>

            <div className="space-y-12">
              {/* Size */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Size</h3>
                <p className="text-gray-60 dark:text-gray-40 mb-4">
                  세 가지 크기를 지원합니다. 기본값은{' '}
                  <code className="text-sm bg-gray-10 dark:bg-gray-90 px-1.5 py-0.5 rounded">
                    medium
                  </code>
                  입니다.
                </p>
                <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
                  <div className="space-y-4 max-w-md">
                    <Input size="sm" placeholder="Small (32px)" />
                    <Input size="md" placeholder="Medium (40px)" />
                    <Input size="lg" placeholder="Large (48px)" />
                  </div>
                </div>
                <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
                  <code>{`<Input size="sm" placeholder="Small (32px)" />
<Input size="md" placeholder="Medium (40px)" />
<Input size="lg" placeholder="Large (48px)" />`}</code>
                </pre>
              </div>

              {/* Variant */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Variant</h3>
                <p className="text-gray-60 dark:text-gray-40 mb-4">
                  두 가지 시각적 스타일을 지원합니다.
                </p>
                <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
                  <div className="space-y-4 max-w-md">
                    <Input variant="default" placeholder="Default (테두리)" />
                    <Input variant="filled" placeholder="Filled (배경)" />
                  </div>
                </div>
                <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
                  <code>{`<Input variant="default" placeholder="Default (테두리)" />
<Input variant="filled" placeholder="Filled (배경)" />`}</code>
                </pre>
              </div>

              {/* With Icons */}
              <div>
                <h3 className="text-xl font-semibold mb-4">With Icons</h3>
                <p className="text-gray-60 dark:text-gray-40 mb-4">
                  왼쪽과 오른쪽에 아이콘을 배치할 수 있습니다.
                </p>
                <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
                  <div className="space-y-4 max-w-md">
                    <Input
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
                      placeholder="확인 아이콘"
                    />
                  </div>
                </div>
                <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
                  <code>{`<Input
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
  placeholder="확인 아이콘"
/>`}</code>
                </pre>
              </div>

              {/* Error State */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Error State</h3>
                <p className="text-gray-60 dark:text-gray-40 mb-4">
                  에러 상태를 표시하여 사용자에게 피드백을 제공합니다.
                </p>
                <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
                  <div className="space-y-4 max-w-md">
                    <div>
                      <Input
                        error
                        placeholder="잘못된 입력"
                        defaultValue="invalid@"
                      />
                      <p className="mt-1 text-sm text-[#DC3545]">
                        올바른 이메일 형식이 아닙니다
                      </p>
                    </div>
                    <div>
                      <Input
                        error
                        leftAddon={<EmailIcon />}
                        placeholder="example@email.com"
                      />
                      <p className="mt-1 text-sm text-[#DC3545]">
                        필수 입력 항목입니다
                      </p>
                    </div>
                  </div>
                </div>
                <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
                  <code>{`<Input
  error
  placeholder="잘못된 입력"
  defaultValue="invalid@"
/>
<p className="mt-1 text-sm text-red-600">
  올바른 이메일 형식이 아닙니다
</p>`}</code>
                </pre>
              </div>

              {/* Disabled */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Disabled</h3>
                <p className="text-gray-60 dark:text-gray-40 mb-4">
                  비활성화된 입력 필드는 사용자가 입력할 수 없습니다.
                </p>
                <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
                  <div className="space-y-4 max-w-md">
                    <Input disabled placeholder="비활성화된 입력 필드" />
                    <Input
                      disabled
                      variant="filled"
                      placeholder="비활성화된 Filled"
                    />
                  </div>
                </div>
                <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
                  <code>{`<Input disabled placeholder="비활성화된 입력 필드" />
<Input disabled variant="filled" placeholder="비활성화된 Filled" />`}</code>
                </pre>
              </div>

              {/* Types */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Input Types</h3>
                <p className="text-gray-60 dark:text-gray-40 mb-4">
                  다양한 HTML5 input type을 지원합니다.
                </p>
                <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
                  <div className="space-y-4 max-w-md">
                    <Input type="text" placeholder="텍스트" />
                    <Input type="email" placeholder="이메일" />
                    <Input type="password" placeholder="비밀번호" />
                    <Input type="number" placeholder="숫자" />
                    <Input type="tel" placeholder="전화번호" />
                    <Input type="url" placeholder="URL" />
                    <Input type="date" />
                  </div>
                </div>
                <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
                  <code>{`<Input type="text" placeholder="텍스트" />
<Input type="email" placeholder="이메일" />
<Input type="password" placeholder="비밀번호" />
<Input type="number" placeholder="숫자" />
<Input type="tel" placeholder="전화번호" />
<Input type="url" placeholder="URL" />
<Input type="date" />`}</code>
                </pre>
              </div>

              {/* Full Width */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Full Width</h3>
                <p className="text-gray-60 dark:text-gray-40 mb-4">
                  기본적으로 전체 너비를 사용하며, className으로 조정할 수
                  있습니다.
                </p>
                <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
                  <div className="space-y-4">
                    <Input placeholder="전체 너비 (기본)" />
                    <Input
                      className="max-w-md"
                      placeholder="최대 너비 제한 (max-w-md)"
                    />
                    <Input
                      className="max-w-xs"
                      placeholder="작은 너비 (max-w-xs)"
                    />
                  </div>
                </div>
                <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
                  <code>{`<Input placeholder="전체 너비 (기본)" />
<Input className="max-w-md" placeholder="최대 너비 제한" />
<Input className="max-w-xs" placeholder="작은 너비" />`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* API Reference */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8">API Reference</h2>

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
                    <td className="py-3 px-4 font-mono text-sm">variant</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      &quot;default&quot; | &quot;filled&quot;
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">
                      &quot;default&quot;
                    </td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      입력 필드의 시각적 스타일
                    </td>
                  </tr>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">size</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      &quot;small&quot; | &quot;medium&quot; | &quot;large&quot;
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">
                      &quot;medium&quot;
                    </td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      입력 필드 크기 (32px / 40px / 48px)
                    </td>
                  </tr>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">type</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      string
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">
                      &quot;text&quot;
                    </td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      HTML input type (text, email, password 등)
                    </td>
                  </tr>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">error</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      boolean
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">false</td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      에러 상태 표시
                    </td>
                  </tr>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">disabled</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      boolean
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">false</td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      비활성화 상태
                    </td>
                  </tr>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">leftAddon</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      React.ReactNode
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">-</td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      왼쪽에 표시할 요소 (아이콘 등)
                    </td>
                  </tr>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">rightAddon</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      React.ReactNode
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">-</td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      오른쪽에 표시할 요소 (아이콘 등)
                    </td>
                  </tr>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">placeholder</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      string
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">-</td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      입력 힌트 텍스트
                    </td>
                  </tr>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">className</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      string
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">-</td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      추가 CSS 클래스 (레이아웃용)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Accessibility */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Accessibility</h2>
            <div className="space-y-4 text-gray-70 dark:text-gray-30">
              <p>이 컴포넌트는 WCAG 2.1 AA 기준을 준수합니다:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>최소 터치 영역:</strong> 모든 입력 필드는 최소 32px
                  이상의 높이를 가집니다
                </li>
                <li>
                  <strong>키보드 네비게이션:</strong> Tab 키로 포커스 이동
                </li>
                <li>
                  <strong>포커스 표시:</strong> 포커스 시 명확한 링 표시
                </li>
                <li>
                  <strong>ARIA 속성:</strong> error 상태 시{' '}
                  <code className="text-sm bg-gray-10 dark:bg-gray-90 px-1.5 py-0.5 rounded">
                    aria-invalid
                  </code>{' '}
                  자동 설정
                </li>
                <li>
                  <strong>레이블 연결:</strong> label의 htmlFor와 input의 id를
                  연결하여 스크린 리더 지원
                </li>
                <li>
                  <strong>에러 메시지:</strong> aria-describedby로 에러 메시지
                  연결 권장
                </li>
                <li>
                  <strong>색상 대비:</strong> KRDS 색상 팔레트로 충분한 대비
                  보장
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-20 dark:border-gray-80 py-8">
        <div className="container mx-auto px-4 text-center text-gray-60 dark:text-gray-40">
          <p>MIT License · KRDS 기반 공공 웹 UI 컴포넌트 라이브러리</p>
        </div>
      </footer>
    </div>
  );
}
