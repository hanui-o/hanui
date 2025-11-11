'use client';

import { Button } from '@hanui/react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-20 dark:border-gray-80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-primary-60">HANUI</h1>
          </div>
          <nav className="flex items-center space-x-6">
            <Link
              href="/docs"
              className="text-gray-70 dark:text-gray-30 hover:text-primary-60 transition"
            >
              문서
            </Link>
            <Link
              href="/components"
              className="text-gray-70 dark:text-gray-30 hover:text-primary-60 transition"
            >
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

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold">
              KRDS 기반 공공 웹{' '}
              <span className="text-primary-60">UI 컴포넌트 라이브러리</span>
            </h1>

            <p className="text-xl text-gray-60 dark:text-gray-40">
              공공기관 웹사이트를 위한 접근성과 사용성을 갖춘 React 컴포넌트.
              <br />
              KRDS(Korea Republic Design System)를 완벽히 준수합니다.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button variant="primary" size="large">
                시작하기
              </Button>
              <Button variant="secondary" size="large">
                컴포넌트 보기
              </Button>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 pt-16">
              <div className="p-6 rounded-lg border border-gray-20 dark:border-gray-80 hover:border-primary-60 dark:hover:border-primary-60 transition">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-bold mb-2">KRDS 준수</h3>
                <p className="text-gray-60 dark:text-gray-40">
                  공공 웹 디자인 시스템을 완벽히 따르는 컴포넌트
                </p>
              </div>

              <div className="p-6 rounded-lg border border-gray-20 dark:border-gray-80 hover:border-primary-60 dark:hover:border-primary-60 transition">
                <div className="text-4xl mb-4">♿️</div>
                <h3 className="text-xl font-bold mb-2">접근성 우선</h3>
                <p className="text-gray-60 dark:text-gray-40">
                  WCAG 2.1 AA 준수 및 스크린 리더 완벽 지원
                </p>
              </div>

              <div className="p-6 rounded-lg border border-gray-20 dark:border-gray-80 hover:border-primary-60 dark:hover:border-primary-60 transition">
                <div className="text-4xl mb-4">⚡️</div>
                <h3 className="text-xl font-bold mb-2">빠른 개발</h3>
                <p className="text-gray-60 dark:text-gray-40">
                  즉시 사용 가능한 9개의 핵심 컴포넌트
                </p>
              </div>
            </div>

            {/* Quick Start */}
            <div className="pt-16">
              <h2 className="text-2xl font-bold mb-6">빠른 시작</h2>
              <div className="bg-gray-10 dark:bg-gray-90 rounded-lg p-6 text-left max-w-2xl mx-auto">
                <pre className="text-sm overflow-x-auto">
                  <code>{`# 프로젝트 생성\npnpm create hanui-app my-project\n\n# 개발 서버 실행\ncd my-project\npnpm dev`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-20 dark:border-gray-80 py-8">
        <div className="container mx-auto px-4 text-center text-gray-60 dark:text-gray-40">
          <p>
            Built with ❤️ by{' '}
            <a
              href="https://github.com/odada-o"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-60 hover:underline"
            >
              @odada-o
            </a>
          </p>
          <p className="mt-2 text-sm">
            MIT License · KRDS 기반 공공 웹 UI 컴포넌트 라이브러리
          </p>
        </div>
      </footer>
    </div>
  );
}
