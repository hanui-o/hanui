'use client';

import { Select } from '@hanui/react';
import Link from 'next/link';
import { useState } from 'react';

export default function SelectPage() {
  const [selectedValue, setSelectedValue] = useState('');
  const [multipleValues, setMultipleValues] = useState<string[]>([]);

  const options = [
    { value: 'apple', label: '사과' },
    { value: 'banana', label: '바나나' },
    { value: 'orange', label: '오렌지' },
    { value: 'grape', label: '포도' },
    { value: 'strawberry', label: '딸기' },
  ];

  const categoryOptions = [
    { value: 'electronics', label: '전자제품' },
    { value: 'clothing', label: '의류' },
    { value: 'food', label: '식품' },
    { value: 'books', label: '도서' },
    { value: 'sports', label: '스포츠' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-20 dark:border-gray-80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-primary-60">HANUI</h1>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-70 dark:text-gray-30 hover:text-primary-60 transition"
            >
              홈
            </Link>
            <Link href="/components" className="text-primary-60 font-semibold">
              컴포넌트
            </Link>
            <Link
              href="https://github.com/odada-o/hanui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-70 dark:text-gray-30 hover:text-primary-60 transition"
            >
              GitHub
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-60 dark:text-gray-40 mb-4">
            <Link href="/components" className="hover:text-primary-60">
              컴포넌트
            </Link>
            {' / '}
            <span>Select</span>
          </div>

          <h1 className="text-4xl font-bold mb-4">Select</h1>
          <p className="text-xl text-gray-60 dark:text-gray-40 mb-8">
            Headless UI 기반의 접근성 높은 셀렉트 컴포넌트
          </p>

          {/* Quick Start */}
          <section className="mb-12">
            <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
              <div className="max-w-md">
                <Select
                  options={options}
                  value={selectedValue}
                  onChange={(value) =>
                    setSelectedValue(Array.isArray(value) ? value[0] : value)
                  }
                  placeholder="과일을 선택하세요"
                />
              </div>
            </div>
            <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
              <code>{`import { Select } from '@hanui/react';

const options = [
  { value: 'apple', label: '사과' },
  { value: 'banana', label: '바나나' },
  { value: 'orange', label: '오렌지' },
];

export default () => {
  const [value, setValue] = useState('');

  return (
    <Select
      options={options}
      value={value}
      onChange={setValue}
      placeholder="과일을 선택하세요"
    />
  );
};`}</code>
            </pre>
          </section>

          {/* Examples */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8">Examples</h2>

            <div className="space-y-12">
              {/* Basic Select */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Basic Select</h3>
                <p className="text-gray-60 dark:text-gray-40 mb-4">
                  기본 셀렉트 컴포넌트입니다.
                </p>
                <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
                  <div className="max-w-md">
                    <Select
                      options={categoryOptions}
                      value={selectedValue}
                      onChange={(value) =>
                        setSelectedValue(
                          Array.isArray(value) ? value[0] : value
                        )
                      }
                      placeholder="카테고리를 선택하세요"
                    />
                  </div>
                </div>
                <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
                  <code>{`<Select
  options={categoryOptions}
  value={value}
  onChange={setValue}
  placeholder="카테고리를 선택하세요"
/>`}</code>
                </pre>
              </div>

              {/* With Label */}
              <div>
                <h3 className="text-xl font-semibold mb-4">With Label</h3>
                <p className="text-gray-60 dark:text-gray-40 mb-4">
                  라벨을 표시하여 입력 필드의 의미를 명확히 합니다.
                </p>
                <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
                  <div className="max-w-md">
                    <Select
                      label="좋아하는 과일"
                      options={options}
                      value={selectedValue}
                      onChange={(value) =>
                        setSelectedValue(
                          Array.isArray(value) ? value[0] : value
                        )
                      }
                      placeholder="선택하세요"
                    />
                  </div>
                </div>
                <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
                  <code>{`<Select
  label="좋아하는 과일"
  options={options}
  value={value}
  onChange={setValue}
  placeholder="선택하세요"
/>`}</code>
                </pre>
              </div>

              {/* Searchable */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Searchable</h3>
                <p className="text-gray-60 dark:text-gray-40 mb-4">
                  검색 기능이 있는 셀렉트입니다. 많은 옵션이 있을 때 유용합니다.
                </p>
                <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
                  <div className="max-w-md">
                    <Select
                      label="검색 가능한 셀렉트"
                      options={options}
                      value={selectedValue}
                      onChange={(value) =>
                        setSelectedValue(
                          Array.isArray(value) ? value[0] : value
                        )
                      }
                      searchable
                      placeholder="검색하거나 선택하세요"
                    />
                  </div>
                </div>
                <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
                  <code>{`<Select
  label="검색 가능한 셀렉트"
  options={options}
  value={value}
  onChange={setValue}
  searchable
  placeholder="검색하거나 선택하세요"
/>`}</code>
                </pre>
              </div>

              {/* Multiple Selection */}
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Multiple Selection
                </h3>
                <p className="text-gray-60 dark:text-gray-40 mb-4">
                  여러 항목을 선택할 수 있는 셀렉트입니다.
                </p>
                <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
                  <div className="max-w-md">
                    <Select
                      label="좋아하는 과일들"
                      options={options}
                      value={multipleValues}
                      onChange={(value) =>
                        setMultipleValues(
                          Array.isArray(value) ? value : [value]
                        )
                      }
                      multiple
                      placeholder="여러 개를 선택하세요"
                    />
                  </div>
                </div>
                <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
                  <code>{`<Select
  label="좋아하는 과일들"
  options={options}
  value={multipleValues}
  onChange={(value) => setMultipleValues(Array.isArray(value) ? value : [value])}
  multiple
  placeholder="여러 개를 선택하세요"
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
                  <div className="max-w-md space-y-4">
                    <div>
                      <Select
                        label="카테고리"
                        options={categoryOptions}
                        value=""
                        onChange={() => {}}
                        error
                        placeholder="선택하세요"
                      />
                      <p className="mt-1 text-sm text-[#DC3545]">
                        카테고리를 선택해주세요
                      </p>
                    </div>
                  </div>
                </div>
                <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
                  <code>{`<Select
  label="카테고리"
  options={categoryOptions}
  value=""
  onChange={() => {}}
  error
  placeholder="선택하세요"
/>
<p className="mt-1 text-sm text-red-600">
  카테고리를 선택해주세요
</p>`}</code>
                </pre>
              </div>

              {/* Disabled */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Disabled</h3>
                <p className="text-gray-60 dark:text-gray-40 mb-4">
                  비활성화된 셀렉트는 선택할 수 없습니다.
                </p>
                <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
                  <div className="max-w-md">
                    <Select
                      label="비활성화된 셀렉트"
                      options={options}
                      value=""
                      onChange={() => {}}
                      disabled
                      placeholder="비활성화됨"
                    />
                  </div>
                </div>
                <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
                  <code>{`<Select
  label="비활성화된 셀렉트"
  options={options}
  value=""
  onChange={() => {}}
  disabled
  placeholder="비활성화됨"
/>`}</code>
                </pre>
              </div>

              {/* Custom Render Option */}
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Custom Render Option
                </h3>
                <p className="text-gray-60 dark:text-gray-40 mb-4">
                  renderOption을 사용하여 옵션의 렌더링을 커스터마이징할 수
                  있습니다.
                </p>
                <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
                  <div className="max-w-md">
                    <Select
                      label="커스텀 옵션"
                      options={options}
                      value={selectedValue}
                      onChange={(value) =>
                        setSelectedValue(
                          Array.isArray(value) ? value[0] : value
                        )
                      }
                      placeholder="선택하세요"
                      renderOption={(option) => (
                        <div className="flex items-center justify-between">
                          <span>{option.label}</span>
                          <span className="text-xs text-gray-50 dark:text-gray-50">
                            {option.value}
                          </span>
                        </div>
                      )}
                    />
                  </div>
                </div>
                <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
                  <code>{`<Select
  label="커스텀 옵션"
  options={options}
  value={value}
  onChange={setValue}
  renderOption={(option) => (
    <div className="flex items-center justify-between">
      <span>{option.label}</span>
      <span className="text-xs text-gray-500">
        {option.value}
      </span>
    </div>
  )}
/>`}</code>
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
                    <td className="py-3 px-4 font-mono text-sm">options</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      SelectOption[]
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">-</td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      선택 가능한 옵션 목록
                    </td>
                  </tr>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">value</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      string | string[]
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">-</td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      선택된 값
                    </td>
                  </tr>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">onChange</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      (value: string | string[]) =&gt; void
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">-</td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      값 변경 핸들러
                    </td>
                  </tr>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">searchable</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      boolean
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">false</td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      검색 기능 활성화
                    </td>
                  </tr>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">multiple</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      boolean
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">false</td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      다중 선택 허용
                    </td>
                  </tr>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">placeholder</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      string
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">-</td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      플레이스홀더 텍스트
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
                    <td className="py-3 px-4 font-mono text-sm">label</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      string
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">-</td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      라벨 텍스트
                    </td>
                  </tr>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">
                      renderOption
                    </td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      (option: SelectOption) =&gt; React.ReactNode
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">-</td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      옵션 커스텀 렌더 함수
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">SelectOption Type</h3>
              <pre className="p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
                <code>{`interface SelectOption {
  value: string;
  label: string;
}`}</code>
              </pre>
            </div>
          </section>

          {/* Accessibility */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Accessibility</h2>
            <div className="space-y-4 text-gray-70 dark:text-gray-30">
              <p>이 컴포넌트는 WCAG 2.1 AA 기준을 준수합니다:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Headless UI:</strong> 접근성 기능이 내장된 Headless UI
                  Listbox 사용
                </li>
                <li>
                  <strong>키보드 네비게이션:</strong> Arrow keys로 옵션 탐색,
                  Enter/Space로 선택
                </li>
                <li>
                  <strong>포커스 관리:</strong> 자동 포커스 트랩 및 복원
                </li>
                <li>
                  <strong>ARIA 속성:</strong> 적절한 role, aria-expanded,
                  aria-selected 자동 설정
                </li>
                <li>
                  <strong>스크린 리더:</strong> 선택된 옵션과 상태 정보 제공
                </li>
                <li>
                  <strong>에러 표시:</strong> aria-invalid로 에러 상태 전달
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
