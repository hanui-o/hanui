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
        description="HANUI는 소스 코드 복사 방식으로 배포됩니다. CLI 도구를 사용하여 필요한 컴포넌트만 프로젝트에 추가하세요."
      />

      {/* Prerequisites */}
      <PageSection>
        <Heading level="h2" id="prerequisites">
          필수 요구사항
        </Heading>

        <Stack spacing="heading-content" className="mt-2 md:mt-4">
          <Body>HANUI를 사용하기 전에 다음 요구사항을 확인하세요:</Body>
          <div className="bg-krds-gray-5 rounded-lg p-6 border border-krds-gray-20">
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <code className="bg-krds-gray-10 px-2 py-1 rounded">React</code>
                <span className="text-krds-gray-70">18.0.0 이상</span>
              </li>
              <li className="flex items-center gap-2">
                <code className="bg-krds-gray-10 px-2 py-1 rounded">
                  Node.js
                </code>
                <span className="text-krds-gray-70">18.0.0 이상</span>
              </li>
              <li className="flex items-center gap-2">
                <code className="bg-krds-gray-10 px-2 py-1 rounded">
                  Tailwind CSS
                </code>
                <span className="text-krds-gray-70">3.0.0 이상</span>
              </li>
            </ul>
          </div>
        </Stack>
      </PageSection>

      {/* Step 1: Initialize */}
      <PageSection>
        <Heading level="h2" id="initialize">
          1. 프로젝트 초기화
        </Heading>

        <Stack spacing="heading-content" className="mt-2 md:mt-4">
          <Body>
            HANUI CLI를 사용하여 프로젝트를 초기화합니다. 이 과정은 한 번만
            수행하면 됩니다.
          </Body>
          <CodeBlock
            code="npx @hanui/cli init"
            language="bash"
            showLineNumbers={false}
          />

          <div className="bg-krds-primary-surface rounded-lg p-6 border border-krds-primary-border mt-4">
            <Body size="sm" weight="bold" className="mb-3">
              이 명령어가 수행하는 작업:
            </Body>
            <ul className="space-y-2 text-krds-primary-text">
              <li className="flex items-start gap-2">
                <span className="text-krds-primary-base">✓</span>
                <span>
                  <code className="bg-krds-gray-10 px-1 rounded">
                    components/hanui/
                  </code>{' '}
                  디렉토리 생성
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-krds-primary-base">✓</span>
                <span>
                  <code className="bg-krds-gray-10 px-1 rounded">
                    lib/utils.ts
                  </code>{' '}
                  생성 (cn 유틸리티 함수)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-krds-primary-base">✓</span>
                <span>
                  <code className="bg-krds-gray-10 px-1 rounded">
                    hanui.json
                  </code>{' '}
                  설정 파일 생성
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-krds-primary-base">✓</span>
                <span>Tailwind CSS 설정 안내</span>
              </li>
            </ul>
          </div>
        </Stack>
      </PageSection>

      {/* Step 2: Add Components */}
      <PageSection>
        <Heading level="h2" id="add-components">
          2. 컴포넌트 추가
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Body>
            필요한 컴포넌트를{' '}
            <code className="bg-krds-gray-5 px-1 rounded">
              npx @hanui/cli add
            </code>{' '}
            명령어로 추가합니다.
          </Body>

          <Stack spacing="heading-tight">
            <Heading level="h3">단일 컴포넌트 추가</Heading>
            <CodeBlock
              code="npx @hanui/cli add button"
              language="bash"
              showLineNumbers={false}
            />
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">여러 컴포넌트 한 번에 추가</Heading>
            <CodeBlock
              code="npx @hanui/cli add button modal select"
              language="bash"
              showLineNumbers={false}
            />
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">인터랙티브 선택</Heading>
            <CodeBlock
              code="npx @hanui/cli add"
              language="bash"
              showLineNumbers={false}
            />
            <Body size="sm" className="text-krds-gray-70">
              명령어만 실행하면 사용 가능한 컴포넌트 목록이 표시되어 선택할 수
              있습니다.
            </Body>
          </Stack>
        </Stack>
      </PageSection>

      {/* Tailwind CSS Setup */}
      <PageSection>
        <Heading level="h2" id="tailwind-setup">
          3. Tailwind CSS 설정
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
    './components/hanui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
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
                    <strong>Tip:</strong> HANUI 컴포넌트는 Radix UI 기반으로
                    이미{' '}
                    <code className="bg-krds-gray-10 px-1 rounded text-xs">
                      'use client'
                    </code>{' '}
                    지시어가 포함되어 있습니다.
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
import { Button } from '@/components/hanui/button';`}
                  language="typescript"
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
            code={`import { Button } from '@/components/hanui/button';

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
                  tailwind.config.js의 content 경로에 HANUI 컴포넌트 경로가
                  포함되어 있는지 확인하세요.
                </Body>
                <code className="text-xs bg-krds-gray-5 px-2 py-1 rounded">
                  ./components/hanui/**/*.{'{'}js,ts,jsx,tsx{'}'}
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
              <Heading level="h3">import 경로 에러</Heading>
              <div>
                <Body size="sm" className="text-krds-gray-70">
                  tsconfig.json에 경로 alias가 설정되어 있는지 확인하세요:
                </Body>
                <div className="mt-2">
                  <CodeBlock
                    code={`{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`}
                    language="json"
                    fileName="tsconfig.json"
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
