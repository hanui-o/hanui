'use client';

import { Button } from '@hanui/react';
import Link from 'next/link';

export default function ButtonPage() {
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
            <span>Button</span>
          </div>

          <h1 className="text-4xl font-bold mb-4">Button</h1>
          <p className="text-xl text-gray-60 dark:text-gray-40 mb-12">
            다양한 스타일과 크기를 지원하는 버튼 컴포넌트
          </p>

          {/* Examples */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">예제</h2>

            <div className="space-y-8">
              {/* Variants */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Variants</h3>
                <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
                  <div className="flex flex-wrap gap-4">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="danger">Danger</Button>
                  </div>
                </div>
                <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
                  <code>{`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`}</code>
                </pre>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Sizes</h3>
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

              {/* Disabled */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Disabled</h3>
                <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
                  <div className="flex flex-wrap gap-4">
                    <Button variant="primary" disabled>
                      Disabled
                    </Button>
                    <Button variant="secondary" disabled>
                      Disabled
                    </Button>
                  </div>
                </div>
                <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
                  <code>{`<Button variant="primary" disabled>
  Disabled
</Button>`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Props */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Props</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <th className="text-left py-3 px-4 font-semibold">Prop</th>
                    <th className="text-left py-3 px-4 font-semibold">Type</th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Default
                    </th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">variant</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      &apos;primary&apos; | &apos;secondary&apos; |
                      &apos;outline&apos; | &apos;ghost&apos; |
                      &apos;danger&apos;
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">
                      &apos;primary&apos;
                    </td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      버튼 스타일 variant
                    </td>
                  </tr>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">size</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      &apos;small&apos; | &apos;medium&apos; | &apos;large&apos;
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">
                      &apos;medium&apos;
                    </td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      버튼 크기
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
                    <td className="py-3 px-4 font-mono text-sm">fullWidth</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      boolean
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">false</td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      전체 너비 사용
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Import</h2>
            <pre className="p-4 bg-gray-5 dark:bg-gray-90 rounded overflow-x-auto">
              <code>{`import { Button } from '@hanui/react';`}</code>
            </pre>
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
