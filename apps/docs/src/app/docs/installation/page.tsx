'use client';

import { Stack, Heading, Body } from '@hanui/react';
import { CodeBlock } from '@/components/content/CodeBlock';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

export default function InstallationPage() {
  return (
    <>
      <PageHeader
        title="Installation"
        description="HANUI를 프로젝트에 설치하고 설정하는 방법을 안내합니다."
      />

      {/* Prerequisites */}
      <PageSection>
        <Heading level="h2" id="prerequisites">
          필수 요구사항
        </Heading>

        <Stack spacing="heading-content" className="mt-2 md:mt-4">
          <Body>HANUI를 사용하기 전에 다음 요구사항을 확인하세요:</Body>
          <div className="bg-krds-gray-5 rounded-lg p-6 border border-krds-gray-20">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <code className="bg-krds-gray-10 px-2 py-1 rounded text-sm">
                  React
                </code>
                <span className="text-krds-gray-70">18.0.0 이상</span>
              </li>
              <li className="flex items-center gap-2">
                <code className="bg-krds-gray-10 px-2 py-1 rounded text-sm">
                  Node.js
                </code>
                <span className="text-krds-gray-70">18.0.0 이상</span>
              </li>
              <li className="flex items-center gap-2">
                <code className="bg-krds-gray-10 px-2 py-1 rounded text-sm">
                  Tailwind CSS
                </code>
                <span className="text-krds-gray-70">3.0.0 이상</span>
              </li>
            </ul>
          </div>
        </Stack>
      </PageSection>

      {/* Package Installation */}
      <PageSection>
        <Heading level="h2" id="package-installation">
          1. 패키지 설치
        </Heading>

        <Stack spacing="heading-content" className="mt-2 md:mt-4">
          <Body>원하는 패키지 매니저를 사용하여 HANUI를 설치하세요:</Body>
          <div className="space-y-4">
            <div>
              <Body size="sm" weight="bold" className="mb-2">
                npm
              </Body>
              <CodeBlock
                code="npm install @hanui/react"
                language="bash"
                showLineNumbers={false}
              />
            </div>
            <div>
              <Body size="sm" weight="bold" className="mb-2">
                yarn
              </Body>
              <CodeBlock
                code="yarn add @hanui/react"
                language="bash"
                showLineNumbers={false}
              />
            </div>
            <div>
              <Body size="sm" weight="bold" className="mb-2">
                pnpm
              </Body>
              <CodeBlock
                code="pnpm add @hanui/react"
                language="bash"
                showLineNumbers={false}
              />
            </div>
          </div>
        </Stack>
      </PageSection>

      {/* Tailwind CSS Setup */}
      <PageSection>
        <Heading level="h2" id="tailwind-setup">
          2. Tailwind CSS 설정
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Body>
            HANUI는 Tailwind CSS를 사용합니다. 프로젝트에 Tailwind CSS가
            설치되어 있지 않다면 먼저 설치하세요.
          </Body>

          <Stack spacing="heading-tight">
            <Heading level="h3">Tailwind CSS 설치</Heading>
            <CodeBlock
              code={`npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`}
              language="bash"
              showLineNumbers={false}
            />
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">tailwind.config.js 설정</Heading>
            <div>
              <Body size="sm" className="text-krds-gray-70 mb-3">
                HANUI 컴포넌트를 위해 content 경로를 추가하세요:
              </Body>
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
          </Stack>
        </Stack>
      </PageSection>

      {/* CSS Import */}
      <PageSection>
        <Heading level="h2" id="css-import">
          3. CSS 파일 import
        </Heading>

        <Stack spacing="heading-content" className="mt-2 md:mt-4">
          <Body>메인 CSS 파일에 Tailwind directives를 추가하세요:</Body>
          <CodeBlock
            code={`@tailwind base;
@tailwind components;
@tailwind utilities;`}
            language="css"
            fileName="app/globals.css 또는 src/index.css"
            showLineNumbers={false}
          />
        </Stack>
      </PageSection>

      {/* Framework Setup */}
      <PageSection>
        <Heading level="h2" id="framework-setup">
          4. 프레임워크별 추가 설정
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* Next.js */}
          <div className="border border-krds-gray-20 rounded-lg p-6">
            <Stack spacing="heading-tight">
              <Heading level="h3">Next.js</Heading>
              <div>
                <Body size="sm" className="text-krds-gray-70 mb-3">
                  Next.js 13+ (App Router)를 사용하는 경우 추가 설정이 필요하지
                  않습니다.
                </Body>
                <div className="bg-krds-primary-surface rounded-lg p-4 border border-krds-primary-20">
                  <Body size="sm" className="text-krds-primary-text">
                    💡 <strong>Tip:</strong> 클라이언트 컴포넌트가 필요한 HANUI
                    컴포넌트는 자동으로 'use client' 지시어가 포함되어 있습니다.
                  </Body>
                </div>
              </div>
            </Stack>
          </div>

          {/* Vite */}
          <div className="border border-krds-gray-20 rounded-lg p-6">
            <Stack spacing="heading-tight">
              <Heading level="h3">Vite</Heading>
              <div>
                <Body size="sm" className="text-krds-gray-70 mb-3">
                  Vite 프로젝트에서는 별도 설정 없이 바로 사용 가능합니다.
                </Body>
                <CodeBlock
                  code={`// main.tsx
import './index.css';
import { Button } from '@hanui/react';`}
                  language="typescript"
                  showLineNumbers={false}
                />
              </div>
            </Stack>
          </div>

          {/* Create React App */}
          <div className="border border-krds-gray-20 rounded-lg p-6">
            <Stack spacing="heading-tight">
              <Heading level="h3">Create React App</Heading>
              <div>
                <Body size="sm" className="text-krds-gray-70 mb-3">
                  CRA에서 Tailwind CSS를 사용하려면 CRACO를 설치해야 합니다:
                </Body>
                <CodeBlock
                  code="npm install -D @craco/craco"
                  language="bash"
                  showLineNumbers={false}
                />
              </div>
            </Stack>
          </div>
        </Stack>
      </PageSection>

      {/* Verification */}
      <PageSection>
        <Heading level="h2" id="verification">
          5. 설치 확인
        </Heading>

        <Stack spacing="heading-content" className="mt-2 md:mt-4">
          <Body>
            간단한 컴포넌트를 import하여 설치가 정상적으로 완료되었는지
            확인하세요:
          </Body>
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
        </Stack>
      </PageSection>

      {/* Troubleshooting */}
      <PageSection>
        <Heading level="h2" id="troubleshooting">
          문제 해결
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <div className="border-l-4 border-krds-warning-base pl-4 py-2">
            <Stack spacing="heading-tight">
              <Heading level="h3">스타일이 적용되지 않는 경우</Heading>
              <div>
                <Body size="sm" className="text-krds-gray-70 mb-2">
                  tailwind.config.js의 content 경로에 HANUI 경로가 포함되어
                  있는지 확인하세요.
                </Body>
                <code className="text-xs bg-krds-gray-5 px-2 py-1 rounded">
                  ./node_modules/@hanui/react/**/*.{'{'}js,ts,jsx,tsx{'}'}
                </code>
              </div>
            </Stack>
          </div>

          <div className="border-l-4 border-krds-warning-base pl-4 py-2">
            <Stack spacing="heading-tight">
              <Heading level="h3">TypeScript 타입 에러</Heading>
              <div>
                <Body size="sm" className="text-krds-gray-70">
                  @types/react 버전이 18 이상인지 확인하세요. 필요시 업데이트:
                </Body>
                <div className="mt-2">
                  <CodeBlock
                    code="npm install -D @types/react@latest @types/react-dom@latest"
                    language="bash"
                    showLineNumbers={false}
                  />
                </div>
              </div>
            </Stack>
          </div>

          <div className="border-l-4 border-krds-warning-base pl-4 py-2">
            <Stack spacing="heading-tight">
              <Heading level="h3">모듈을 찾을 수 없는 경우</Heading>
              <div>
                <Body size="sm" className="text-krds-gray-70">
                  node_modules를 삭제하고 다시 설치해보세요:
                </Body>
                <div className="mt-2">
                  <CodeBlock
                    code="rm -rf node_modules package-lock.json && npm install"
                    language="bash"
                    showLineNumbers={false}
                  />
                </div>
              </div>
            </Stack>
          </div>
        </Stack>
      </PageSection>

      {/* Next Steps */}
      <PageSection>
        <Heading level="h2" id="next-steps">
          다음 단계
        </Heading>

        <Stack spacing="heading-content" className="mt-2 md:mt-4">
          <div className="bg-krds-gray-5 rounded-lg p-6 border border-krds-gray-20">
            <Body className="mb-4">
              설치가 완료되었습니다! 이제 HANUI를 사용할 준비가 되었습니다.
            </Body>
            <a
              href="/docs/quick-start"
              className="inline-flex items-center gap-2 px-4 py-2 bg-krds-primary-base text-krds-white rounded-md hover:bg-krds-primary-60 transition-colors"
            >
              Quick Start 가이드 보기 →
            </a>
          </div>
        </Stack>
      </PageSection>
    </>
  );
}
