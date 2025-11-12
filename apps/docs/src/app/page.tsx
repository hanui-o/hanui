'use client';

import Link from 'next/link';
import { Button } from '@hanui/react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ExampleShowcase } from '@/components/ExampleShowcase';
import { PackageManagerTabs } from '@/components/PackageManagerTabs';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-16 pb-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-800 px-3 py-1 text-xs font-medium">
                <span className="mr-1.5">✨</span>
                <span className="text-gray-700 dark:text-gray-300">
                  KRDS 디자인 시스템 기반
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                공공 웹을 위한 React 컴포넌트 라이브러리
              </h1>

              {/* Description */}
              <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl">
                접근성과 사용성을 갖춘 React 컴포넌트.
                <br className="hidden sm:block" />
                KRDS를 완벽히 준수하는 공공기관 웹사이트 개발의 시작.
              </p>

              {/* CTA Buttons */}
              <div className="flex items-center gap-3 flex-wrap justify-center pt-2">
                <Link href="/components">
                  <Button variant="black" size="md">
                    Get Started
                  </Button>
                </Link>
                <Link href="/components">
                  <Button variant="ghost" size="md">
                    View Components
                  </Button>
                </Link>
              </div>

              {/* Install Command */}
              {/* <div className="pt-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    $
                  </span>
                  <code className="text-xs font-mono text-gray-900 dark:text-gray-100">
                    pnpm create hanui-app
                  </code>
                </div>
              </div> */}
            </div>
          </div>
        </section>

        {/* Installation Section */}
        <section className="container mx-auto px-4 py-12 md:py-16 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">설치</h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                원하는 패키지 매니저로 HANUI를 설치하세요
              </p>
            </div>
            <PackageManagerTabs />
          </div>
        </section>

        {/* Example Showcase Section */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-7xl mx-auto">
            <ExampleShowcase />
          </div>
        </section>

        {/* Code Example Section */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                30초 만에 시작하기
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                CLI로 프로젝트를 생성하고 바로 개발을 시작하세요
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-900 overflow-hidden shadow-2xl">
              <div className="border-b border-gray-800 px-4 py-2.5 bg-gray-800">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs text-gray-400 ml-3 font-medium">
                    Terminal
                  </span>
                </div>
              </div>
              <div className="p-6 bg-gray-950">
                <pre className="text-sm text-gray-100 font-mono leading-relaxed">
                  <code>
                    <span className="text-gray-500"># HANUI 프로젝트 생성</span>
                    {'\n'}
                    <span className="text-green-400">$</span>{' '}
                    <span className="text-blue-400">pnpm</span> create hanui-app
                    my-project
                    {'\n\n'}
                    <span className="text-gray-500"># 개발 서버 시작</span>
                    {'\n'}
                    <span className="text-green-400">$</span>{' '}
                    <span className="text-blue-400">cd</span> my-project
                    {'\n'}
                    <span className="text-green-400">$</span>{' '}
                    <span className="text-blue-400">pnpm</span> dev
                    {'\n\n'}
                    <span className="text-gray-500"># 컴포넌트 사용</span>
                    {'\n'}
                    <span className="text-purple-400">import</span> {'{ '}
                    <span className="text-yellow-300">Button</span>
                    {' }'} <span className="text-purple-400">from</span>{' '}
                    <span className="text-green-300">
                      &apos;@hanui/react&apos;
                    </span>
                    ;{'\n\n'}
                    <span className="text-purple-400">function</span>{' '}
                    <span className="text-yellow-300">App</span>() {'{'}
                    {'\n  '}
                    <span className="text-purple-400">return</span> {'<'}
                    <span className="text-blue-300">Button</span>
                    {'>클릭하세요</'}
                    <span className="text-blue-300">Button</span>
                    {'>'};{'\n}'}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
