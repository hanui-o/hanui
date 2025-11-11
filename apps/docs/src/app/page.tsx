'use client';

import { Button } from '@hanui/react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-95">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-20/40 dark:border-gray-80/40 bg-white/95 dark:bg-gray-95/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-95/60">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary-60 rounded-md" />
              <span className="text-lg font-bold">HANUI</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-6 text-sm">
            <Link
              href="/components"
              className="text-gray-70 dark:text-gray-30 hover:text-gray-90 dark:hover:text-white transition-colors font-medium"
            >
              Components
            </Link>
            <Link
              href="https://github.com/odada-o/hanui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-70 dark:text-gray-30 hover:text-gray-90 dark:hover:text-white transition-colors font-medium"
            >
              GitHub
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="inline-flex items-center rounded-full border border-gray-20 dark:border-gray-80 px-3 py-1 text-sm">
                <span className="text-gray-70 dark:text-gray-30">
                  ✨ KRDS 디자인 시스템 기반
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                공공 웹을 위한
                <br />
                <span className="bg-gradient-to-r from-primary-60 to-primary-70 bg-clip-text text-transparent">
                  컴포넌트 라이브러리
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-60 dark:text-gray-40 max-w-2xl leading-relaxed">
                접근성과 사용성을 갖춘 React 컴포넌트.
                <br className="hidden sm:block" />
                KRDS를 완벽히 준수하는 공공기관 웹사이트 개발의 시작.
              </p>

              <div className="flex items-center gap-4 flex-wrap justify-center pt-4">
                <Link href="/components">
                  <Button variant="primary" size="large">
                    Get Started
                  </Button>
                </Link>
                <Link
                  href="https://github.com/odada-o/hanui"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="large">
                    GitHub
                  </Button>
                </Link>
              </div>

              <div className="pt-8 text-sm text-gray-60 dark:text-gray-40">
                <code className="px-3 py-1 bg-gray-10 dark:bg-gray-90 rounded-md">
                  pnpm create hanui-app
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="group relative overflow-hidden rounded-lg border border-gray-20 dark:border-gray-80 p-6 hover:border-primary-60 dark:hover:border-primary-60 transition-all">
                <div className="flex flex-col space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary-60/10 text-2xl">
                    📦
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold">Portal + Admin</h3>
                    <p className="text-sm text-gray-60 dark:text-gray-40">
                      공공 포털과 관리자 템플릿 모두 제공
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-lg border border-gray-20 dark:border-gray-80 p-6 hover:border-primary-60 dark:hover:border-primary-60 transition-all">
                <div className="flex flex-col space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary-60/10 text-2xl">
                    🎨
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold">KRDS 100% 준수</h3>
                    <p className="text-sm text-gray-60 dark:text-gray-40">
                      공공 웹 디자인 시스템 완벽 준수
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-lg border border-gray-20 dark:border-gray-80 p-6 hover:border-primary-60 dark:hover:border-primary-60 transition-all">
                <div className="flex flex-col space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary-60/10 text-2xl">
                    ♿️
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold">접근성 AA 등급</h3>
                    <p className="text-sm text-gray-60 dark:text-gray-40">
                      WCAG 2.1 AA 준수 및 스크린 리더 지원
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-lg border border-gray-20 dark:border-gray-80 p-6 hover:border-primary-60 dark:hover:border-primary-60 transition-all">
                <div className="flex flex-col space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary-60/10 text-2xl">
                    ⚡️
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold">즉시 사용 가능</h3>
                    <p className="text-sm text-gray-60 dark:text-gray-40">
                      30초 만에 시작하는 9개 컴포넌트
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Code Example Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-lg border border-gray-20 dark:border-gray-80 bg-gray-5 dark:bg-gray-90 overflow-hidden">
              <div className="border-b border-gray-20 dark:border-gray-80 px-4 py-3">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gray-30" />
                    <div className="w-3 h-3 rounded-full bg-gray-30" />
                    <div className="w-3 h-3 rounded-full bg-gray-30" />
                  </div>
                  <span className="text-sm text-gray-60 dark:text-gray-40 ml-4">
                    Terminal
                  </span>
                </div>
              </div>
              <div className="p-6">
                <pre className="text-sm text-gray-90 dark:text-gray-10">
                  <code>{`# Install HANUI
pnpm create hanui-app my-project

# Start development
cd my-project
pnpm dev`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-20 dark:border-gray-80 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary-60 rounded-md" />
              <span className="font-bold">HANUI</span>
            </div>
            <p className="text-sm text-gray-60 dark:text-gray-40 max-w-md">
              KRDS 기반 공공 웹 UI 컴포넌트 라이브러리
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <Link
                href="https://github.com/odada-o/hanui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-60 dark:text-gray-40 hover:text-gray-90 dark:hover:text-white transition-colors"
              >
                GitHub
              </Link>
              <span className="text-gray-30 dark:text-gray-70">•</span>
              <Link
                href="/components"
                className="text-gray-60 dark:text-gray-40 hover:text-gray-90 dark:hover:text-white transition-colors"
              >
                Components
              </Link>
            </div>
            <p className="text-xs text-gray-50 dark:text-gray-60 pt-4">
              MIT License © 2024{' '}
              <a
                href="https://github.com/odada-o"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-70 dark:hover:text-gray-40 transition-colors"
              >
                @odada-o
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
