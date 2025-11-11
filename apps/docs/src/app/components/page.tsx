'use client';

import Link from 'next/link';

const components = [
  {
    name: 'Button',
    description: '다양한 스타일과 크기를 지원하는 버튼 컴포넌트',
    href: '/components/button',
  },
  {
    name: 'Input',
    description: '폼 입력을 위한 텍스트 필드 컴포넌트',
    href: '/components/input',
  },
  {
    name: 'Card',
    description: '콘텐츠를 담는 카드 레이아웃 컴포넌트',
    href: '/components/card',
  },
  {
    name: 'Table',
    description: '데이터 테이블 컴포넌트',
    href: '/components/table',
  },
  {
    name: 'Pagination',
    description: '페이지네이션 컴포넌트',
    href: '/components/pagination',
  },
  {
    name: 'Breadcrumb',
    description: '현재 위치를 표시하는 네비게이션 컴포넌트',
    href: '/components/breadcrumb',
  },
  {
    name: 'Modal',
    description: '모달 다이얼로그 컴포넌트',
    href: '/components/modal',
  },
  {
    name: 'Select',
    description: '드롭다운 선택 컴포넌트',
    href: '/components/select',
  },
  {
    name: 'FileUpload',
    description: '파일 업로드 컴포넌트',
    href: '/components/file-upload',
  },
];

export default function ComponentsPage() {
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
          <h1 className="text-4xl font-bold mb-4">컴포넌트</h1>
          <p className="text-xl text-gray-60 dark:text-gray-40 mb-12">
            KRDS 디자인 시스템을 준수하는 9개의 React 컴포넌트
          </p>

          <div className="grid gap-6">
            {components.map((component) => (
              <Link
                key={component.name}
                href={component.href}
                className="block p-6 rounded-lg border border-gray-20 dark:border-gray-80 hover:border-primary-60 dark:hover:border-primary-60 transition-colors"
              >
                <h2 className="text-2xl font-bold mb-2">{component.name}</h2>
                <p className="text-gray-60 dark:text-gray-40">
                  {component.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-12 p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
            <h2 className="text-xl font-bold mb-4">설치</h2>
            <pre className="bg-white dark:bg-gray-95 p-4 rounded overflow-x-auto">
              <code>pnpm add @hanui/react</code>
            </pre>
          </div>

          <div className="mt-8 p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
            <h2 className="text-xl font-bold mb-4">기본 사용법</h2>
            <pre className="bg-white dark:bg-gray-95 p-4 rounded overflow-x-auto text-sm">
              <code>{`import { Button } from '@hanui/react';

function App() {
  return (
    <Button variant="primary">
      클릭하세요
    </Button>
  );
}`}</code>
            </pre>
          </div>
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
