'use client';

import { Button } from '@hanui/react';

// Example icons using SVG
const PlusIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1578L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

export default function ButtonPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Button</h1>
      <p className="text-xl text-gray-60 dark:text-gray-40 mb-8">
        다양한 스타일과 크기를 지원하는 KRDS 기반 버튼 컴포넌트
      </p>

      {/* Quick Start */}
      <section className="mb-12">
        <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
          <div className="flex flex-wrap gap-4">
            <Button>클릭하세요</Button>
          </div>
        </div>
        <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
          <code>{`import { Button } from '@hanui/react';

export default () => <Button>클릭하세요</Button>;`}</code>
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
              <div className="flex flex-wrap items-center gap-4">
                <Button size="small">Small</Button>
                <Button size="medium">Medium</Button>
                <Button size="large">Large</Button>
              </div>
            </div>
            <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
              <code>{`<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>`}</code>
            </pre>
          </div>

          {/* Variant */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Variant</h3>
            <p className="text-gray-60 dark:text-gray-40 mb-4">
              다양한 시각적 스타일을 지원합니다.
            </p>
            <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="success">Success</Button>
                <Button variant="danger">Danger</Button>
              </div>
            </div>
            <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
              <code>{`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="danger">Danger</Button>`}</code>
            </pre>
          </div>

          {/* Ghost */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Ghost</h3>
            <p className="text-gray-60 dark:text-gray-40 mb-4">
              배경이 투명한 버튼입니다. 덜 강조되는 액션에 사용합니다.
            </p>
            <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
              <div className="flex flex-wrap gap-4">
                <Button variant="ghost">Ghost</Button>
                <Button variant="ghost" size="small">
                  Small Ghost
                </Button>
                <Button variant="ghost" size="large">
                  Large Ghost
                </Button>
              </div>
            </div>
            <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
              <code>{`<Button variant="ghost">Ghost</Button>
<Button variant="ghost" size="small">Small Ghost</Button>
<Button variant="ghost" size="large">Large Ghost</Button>`}</code>
            </pre>
          </div>

          {/* Outline */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Outline</h3>
            <p className="text-gray-60 dark:text-gray-40 mb-4">
              테두리만 있는 버튼입니다. 부차적인 액션에 사용합니다.
            </p>
            <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
              <div className="flex flex-wrap gap-4">
                <Button variant="outline">Outline</Button>
                <Button variant="outline" size="small">
                  Small Outline
                </Button>
                <Button variant="outline" size="large">
                  Large Outline
                </Button>
              </div>
            </div>
            <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
              <code>{`<Button variant="outline">Outline</Button>
<Button variant="outline" size="small">Small Outline</Button>
<Button variant="outline" size="large">Large Outline</Button>`}</code>
            </pre>
          </div>

          {/* With Icons */}
          <div>
            <h3 className="text-xl font-semibold mb-4">With Icons</h3>
            <p className="text-gray-60 dark:text-gray-40 mb-4">
              아이콘을 텍스트 앞뒤에 배치할 수 있습니다.
            </p>
            <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
              <div className="flex flex-wrap gap-4">
                <Button iconLeft={<PlusIcon />}>새로 만들기</Button>
                <Button variant="secondary" iconRight={<ChevronRightIcon />}>
                  다음
                </Button>
                <Button variant="outline" iconLeft={<PlusIcon />} />
              </div>
            </div>
            <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
              <code>{`<Button iconLeft={<PlusIcon />}>새로 만들기</Button>
<Button variant="secondary" iconRight={<ChevronRightIcon />}>
  다음
</Button>
<Button variant="outline" iconLeft={<PlusIcon />} />`}</code>
            </pre>
          </div>

          {/* Loading */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Loading</h3>
            <p className="text-gray-60 dark:text-gray-40 mb-4">
              비동기 작업 중임을 나타냅니다. 로딩 중에는 자동으로
              비활성화됩니다.
            </p>
            <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
              <div className="flex flex-wrap gap-4">
                <Button loading>로딩 중...</Button>
                <Button variant="secondary" loading>
                  저장 중...
                </Button>
                <Button variant="outline" loading size="large">
                  처리 중...
                </Button>
              </div>
            </div>
            <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
              <code>{`<Button loading>로딩 중...</Button>
<Button variant="secondary" loading>저장 중...</Button>
<Button variant="outline" loading size="large">처리 중...</Button>`}</code>
            </pre>
          </div>

          {/* Disabled */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Disabled</h3>
            <p className="text-gray-60 dark:text-gray-40 mb-4">
              비활성화된 버튼은 클릭할 수 없고 시각적으로 구분됩니다.
            </p>
            <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" disabled>
                  비활성화
                </Button>
                <Button variant="secondary" disabled>
                  비활성화
                </Button>
                <Button variant="outline" disabled>
                  비활성화
                </Button>
                <Button variant="ghost" disabled>
                  비활성화
                </Button>
              </div>
            </div>
            <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
              <code>{`<Button variant="primary" disabled>비활성화</Button>
<Button variant="secondary" disabled>비활성화</Button>
<Button variant="outline" disabled>비활성화</Button>
<Button variant="ghost" disabled>비활성화</Button>`}</code>
            </pre>
          </div>

          {/* Full Width */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Full Width</h3>
            <p className="text-gray-60 dark:text-gray-40 mb-4">
              className을 사용하여 전체 너비 버튼을 만들 수 있습니다.
            </p>
            <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
              <div className="space-y-4">
                <Button className="w-full">전체 너비 버튼</Button>
                <Button variant="outline" className="w-full">
                  전체 너비 Outline
                </Button>
              </div>
            </div>
            <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
              <code>{`<Button className="w-full">전체 너비 버튼</Button>
<Button variant="outline" className="w-full">전체 너비 Outline</Button>`}</code>
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
                  &quot;primary&quot; | &quot;secondary&quot; |
                  &quot;success&quot; | &quot;danger&quot; | &quot;ghost&quot; |
                  &quot;outline&quot;
                </td>
                <td className="py-3 px-4 font-mono text-sm">
                  &quot;primary&quot;
                </td>
                <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                  버튼의 시각적 스타일
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
                  버튼 크기 (32px / 40px / 48px)
                </td>
              </tr>
              <tr className="border-b border-gray-20 dark:border-gray-80">
                <td className="py-3 px-4 font-mono text-sm">loading</td>
                <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                  boolean
                </td>
                <td className="py-3 px-4 font-mono text-sm">false</td>
                <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                  로딩 상태 표시
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
                <td className="py-3 px-4 font-mono text-sm">iconLeft</td>
                <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                  React.ReactNode
                </td>
                <td className="py-3 px-4 font-mono text-sm">-</td>
                <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                  왼쪽에 표시할 아이콘
                </td>
              </tr>
              <tr className="border-b border-gray-20 dark:border-gray-80">
                <td className="py-3 px-4 font-mono text-sm">iconRight</td>
                <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                  React.ReactNode
                </td>
                <td className="py-3 px-4 font-mono text-sm">-</td>
                <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                  오른쪽에 표시할 아이콘
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
              <strong>최소 터치 영역:</strong> 모든 버튼은 최소 32px 이상의
              높이를 가집니다
            </li>
            <li>
              <strong>키보드 네비게이션:</strong> Tab 키로 포커스 이동,
              Enter/Space로 활성화
            </li>
            <li>
              <strong>포커스 표시:</strong> 포커스 시 명확한 링 표시
            </li>
            <li>
              <strong>ARIA 속성:</strong> loading 상태 시{' '}
              <code className="text-sm bg-gray-10 dark:bg-gray-90 px-1.5 py-0.5 rounded">
                aria-busy
              </code>{' '}
              자동 설정
            </li>
            <li>
              <strong>색상 대비:</strong> KRDS 색상 팔레트로 충분한 대비 보장
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
