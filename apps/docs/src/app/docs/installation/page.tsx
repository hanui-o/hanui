'use client';

import { CodeBlock } from '@/components/docs/CodeBlock';

export default function InstallationPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Installation</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          HANUI를 프로젝트에 설치하고 설정하는 방법을 안내합니다.
        </p>
      </div>

      {/* Prerequisites */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">필수 요구사항</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          HANUI를 사용하기 전에 다음 요구사항을 확인하세요:
        </p>
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                React
              </code>
              <span className="text-gray-600 dark:text-gray-400">
                18.0.0 이상
              </span>
            </li>
            <li className="flex items-center gap-2">
              <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                Node.js
              </code>
              <span className="text-gray-600 dark:text-gray-400">
                18.0.0 이상
              </span>
            </li>
            <li className="flex items-center gap-2">
              <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                Tailwind CSS
              </code>
              <span className="text-gray-600 dark:text-gray-400">
                3.0.0 이상
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Package Installation */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">1. 패키지 설치</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          원하는 패키지 매니저를 사용하여 HANUI를 설치하세요:
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              npm
            </h3>
            <CodeBlock
              code="npm install @hanui/react"
              language="bash"
              showLineNumbers={false}
            />
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              yarn
            </h3>
            <CodeBlock
              code="yarn add @hanui/react"
              language="bash"
              showLineNumbers={false}
            />
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              pnpm
            </h3>
            <CodeBlock
              code="pnpm add @hanui/react"
              language="bash"
              showLineNumbers={false}
            />
          </div>
        </div>
      </section>

      {/* Tailwind CSS Setup */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">2. Tailwind CSS 설정</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          HANUI는 Tailwind CSS를 사용합니다. 프로젝트에 Tailwind CSS가 설치되어
          있지 않다면 먼저 설치하세요.
        </p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Tailwind CSS 설치</h3>
          <CodeBlock
            code={`npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`}
            language="bash"
            showLineNumbers={false}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">
            tailwind.config.js 설정
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            HANUI 컴포넌트를 위해 content 경로를 추가하세요:
          </p>
          <CodeBlock
            code={`/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    // HANUI 컴포넌트 경로 추가
    './node_modules/@hanui/react/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // KRDS Primary Colors
        primary: {
          5: '#f0f5ff',
          10: '#e0ebff',
          20: '#c2d7ff',
          30: '#a3c3ff',
          40: '#85afff',
          50: '#669bff',
          60: '#256ef4',
          70: '#0b50d0',
          80: '#0040a8',
          90: '#003080',
          95: '#002058',
        },
        // KRDS Gray Scale
        gray: {
          5: '#f9fafb',
          10: '#f3f4f6',
          20: '#e5e7eb',
          30: '#d1d5db',
          40: '#9ca3af',
          50: '#6b7280',
          60: '#4b5563',
          70: '#374151',
          80: '#1f2937',
          90: '#111827',
          95: '#030712',
        },
      },
    },
  },
  plugins: [],
};`}
            language="javascript"
            fileName="tailwind.config.js"
          />
        </div>
      </section>

      {/* CSS Import */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">3. CSS 파일 import</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          메인 CSS 파일에 Tailwind directives를 추가하세요:
        </p>
        <CodeBlock
          code={`@tailwind base;
@tailwind components;
@tailwind utilities;`}
          language="css"
          fileName="app/globals.css 또는 src/index.css"
          showLineNumbers={false}
        />
      </section>

      {/* Framework Setup */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          4. 프레임워크별 추가 설정
        </h2>

        <div className="space-y-6">
          {/* Next.js */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Next.js</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Next.js 13+ (App Router)를 사용하는 경우 추가 설정이 필요하지
              않습니다.
            </p>
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 border border-blue-200 dark:border-blue-900">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                💡 <strong>Tip:</strong> 클라이언트 컴포넌트가 필요한 HANUI
                컴포넌트는 자동으로 'use client' 지시어가 포함되어 있습니다.
              </p>
            </div>
          </div>

          {/* Vite */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Vite</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Vite 프로젝트에서는 별도 설정 없이 바로 사용 가능합니다.
            </p>
            <CodeBlock
              code={`// main.tsx
import './index.css';
import { Button } from '@hanui/react';`}
              language="typescript"
              showLineNumbers={false}
            />
          </div>

          {/* Create React App */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Create React App</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              CRA에서 Tailwind CSS를 사용하려면 CRACO를 설치해야 합니다:
            </p>
            <CodeBlock
              code="npm install -D @craco/craco"
              language="bash"
              showLineNumbers={false}
            />
          </div>
        </div>
      </section>

      {/* Verification */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">5. 설치 확인</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          간단한 컴포넌트를 import하여 설치가 정상적으로 완료되었는지
          확인하세요:
        </p>
        <CodeBlock
          code={`import { Button } from '@hanui/react';

function App() {
  return (
    <div>
      <Button>안녕하세요 HANUI!</Button>
    </div>
  );
}

export default App;`}
          language="tsx"
        />
      </section>

      {/* Troubleshooting */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">문제 해결</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-yellow-500 pl-4 py-2">
            <h3 className="font-semibold mb-1">스타일이 적용되지 않는 경우</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              tailwind.config.js의 content 경로에 HANUI 경로가 포함되어 있는지
              확인하세요.
            </p>
            <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
              ./node_modules/@hanui/react/**/*.{'{'}js,ts,jsx,tsx{'}'}
            </code>
          </div>

          <div className="border-l-4 border-yellow-500 pl-4 py-2">
            <h3 className="font-semibold mb-1">TypeScript 타입 에러</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              @types/react 버전이 18 이상인지 확인하세요. 필요시 업데이트:
            </p>
            <div className="mt-2">
              <CodeBlock
                code="npm install -D @types/react@latest @types/react-dom@latest"
                language="bash"
                showLineNumbers={false}
              />
            </div>
          </div>

          <div className="border-l-4 border-yellow-500 pl-4 py-2">
            <h3 className="font-semibold mb-1">모듈을 찾을 수 없는 경우</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              node_modules를 삭제하고 다시 설치해보세요:
            </p>
            <div className="mt-2">
              <CodeBlock
                code="rm -rf node_modules package-lock.json && npm install"
                language="bash"
                showLineNumbers={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">다음 단계</h2>
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <p className="mb-4">
            설치가 완료되었습니다! 이제 HANUI를 사용할 준비가 되었습니다.
          </p>
          <a
            href="/docs/quick-start"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Quick Start 가이드 보기 →
          </a>
        </div>
      </section>
    </div>
  );
}
