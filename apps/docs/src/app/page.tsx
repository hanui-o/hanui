'use client';

import { Button } from '@hanui/react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const components = [
  {
    name: 'Button',
    description: '다양한 스타일과 크기를 지원하는 버튼',
    icon: '🔘',
  },
  {
    name: 'Input',
    description: '폼 입력 필드와 유효성 검사',
    icon: '📝',
  },
  { name: 'Card', description: '콘텐츠 카드 컨테이너', icon: '🗂️' },
  {
    name: 'Table',
    description: '정렬과 페이징을 지원하는 데이터 테이블',
    icon: '📊',
  },
  {
    name: 'Pagination',
    description: '페이지 네비게이션 컴포넌트',
    icon: '📄',
  },
  {
    name: 'Breadcrumb',
    description: '네비게이션 경로 표시',
    icon: '🔗',
  },
  { name: 'Modal', description: '모달 다이얼로그', icon: '🪟' },
  {
    name: 'Select',
    description: '드롭다운 선택 컴포넌트',
    icon: '▼',
  },
  {
    name: 'FileUpload',
    description: '드래그 앤 드롭 파일 업로드',
    icon: '📎',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-20 pb-16 md:pt-32 md:pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-800 px-4 py-1.5 text-sm font-medium">
                <span className="mr-2">✨</span>
                <span className="text-gray-700 dark:text-gray-300">
                  KRDS 디자인 시스템 기반
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                공공 웹을 위한
                <br />
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-gray-100 dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
                  React 컴포넌트 라이브러리
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
                접근성과 사용성을 갖춘 React 컴포넌트.
                <br className="hidden sm:block" />
                KRDS를 완벽히 준수하는 공공기관 웹사이트 개발의 시작.
              </p>

              {/* CTA Buttons */}
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

              {/* Install Command */}
              <div className="pt-6">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    $
                  </span>
                  <code className="text-sm font-mono text-gray-900 dark:text-gray-100">
                    pnpm create hanui-app
                  </code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Components Grid */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                9개의 핵심 컴포넌트
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                즉시 사용 가능한 KRDS 준수 컴포넌트
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {components.map((component) => (
                <Link
                  key={component.name}
                  href={`/components/${component.name.toLowerCase()}`}
                  className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all bg-white dark:bg-gray-950"
                >
                  <div className="flex flex-col space-y-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-900 text-2xl group-hover:scale-110 transition-transform">
                      {component.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg group-hover:text-primary-60 transition-colors">
                        {component.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {component.description}
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-400"
                    >
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-y border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-6xl mx-auto">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-60/10 text-2xl">
                    📦
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">
                      Portal + Admin 템플릿
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      공공 포털과 관리자 페이지 템플릿을 모두 제공하여 빠른
                      프로젝트 시작이 가능합니다
                    </p>
                  </div>
                </div>

                <div className="flex flex-col space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-60/10 text-2xl">
                    🎨
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">KRDS 100% 준수</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      대한민국 공공 웹 디자인 시스템을 완벽히 준수하여 일관된
                      UX를 제공합니다
                    </p>
                  </div>
                </div>

                <div className="flex flex-col space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-60/10 text-2xl">
                    ♿️
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">접근성 AA 등급</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      WCAG 2.1 AA 기준을 준수하고 스크린 리더를 지원하여 모두가
                      사용할 수 있습니다
                    </p>
                  </div>
                </div>

                <div className="flex flex-col space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-60/10 text-2xl">
                    ⚡️
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">즉시 사용 가능</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      TypeScript 완전 지원, Tree-shaking 최적화로 30초 만에
                      프로젝트를 시작하세요
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Code Example Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                30초 만에 시작하기
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                CLI로 프로젝트를 생성하고 바로 개발을 시작하세요
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 overflow-hidden shadow-lg">
              <div className="border-b border-gray-200 dark:border-gray-800 px-4 py-3 bg-gray-100 dark:bg-gray-950">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-4 font-medium">
                    Terminal
                  </span>
                </div>
              </div>
              <div className="p-6">
                <pre className="text-sm sm:text-base text-gray-900 dark:text-gray-100 font-mono">
                  <code>{`# HANUI 프로젝트 생성
$ pnpm create hanui-app my-project

# 개발 서버 시작
$ cd my-project
$ pnpm dev

# 컴포넌트 사용
import { Button } from '@hanui/react';

function App() {
  return <Button>클릭하세요</Button>;
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4 py-20 md:py-28">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                지금 바로 시작하세요
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                공공기관 웹사이트 개발을 위한 모든 것이 준비되어 있습니다.
                <br className="hidden sm:block" />
                HANUI와 함께 더 나은 사용자 경험을 만들어보세요.
              </p>
              <div className="flex items-center gap-4 flex-wrap justify-center pt-4">
                <Link href="/components">
                  <Button variant="primary" size="large">
                    컴포넌트 보기
                  </Button>
                </Link>
                <Link
                  href="https://github.com/odada-o/hanui"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" size="large">
                    GitHub에서 보기 →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
