'use client';

import {
  Section,
  SectionHeading,
  Subsection,
  List,
  ListItem,
  Code,
  Body,
  Card,
  PageNavigation,
} from '@/components/hanui';

export default function InstallationPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Installation"
        description="HANUI는 소스 코드 복사 방식으로 배포됩니다. CLI 도구를 사용하여 필요한 컴포넌트만 프로젝트에 추가하세요."
      />

      {/* Prerequisites */}
      <Section level="h2">
        <SectionHeading
          level="h2"
          id="prerequisites"
          title="필수 요구사항"
          description="HANUI를 사용하기 전에 다음 요구사항을 확인하세요:"
        />

        <Card variant="info">
          <List>
            <ListItem>
              <Code>React</Code> 18.0.0 이상
            </ListItem>
            <ListItem>
              <Code>Node.js</Code> 18.0.0 이상
            </ListItem>
            <ListItem>
              <Code>Tailwind CSS</Code> 3.0.0 이상
            </ListItem>
          </List>
        </Card>
      </Section>

      {/* Step 1: Initialize */}
      <Section level="h2">
        <SectionHeading
          level="h2"
          id="initialize"
          title="1. 프로젝트 초기화"
          description="HANUI CLI를 사용하여 프로젝트를 초기화합니다. 이 과정은 한 번만 수행하면 됩니다."
        />

        <Code variant="block" language="bash" showLineNumbers={false}>
          npx @hanui/cli init
        </Code>

        <Card variant="info" className="mt-6">
          <Body className="font-semibold mb-3">이 명령어가 수행하는 작업:</Body>
          <List variant="check" className="text-krds-gray-90">
            <ListItem>
              <Code>components/hanui/</Code> 디렉토리 생성
            </ListItem>
            <ListItem>
              <Code>lib/utils.ts</Code> 생성 (cn 유틸리티 함수)
            </ListItem>
            <ListItem>
              <Code>hanui.json</Code> 설정 파일 생성
            </ListItem>
            <ListItem>Tailwind CSS 설정 안내</ListItem>
          </List>
        </Card>
      </Section>

      {/* Step 2: Add Components */}
      <Section level="h2">
        <SectionHeading level="h2" id="add-components" title="2. 컴포넌트 추가">
          <Body className="leading-relaxed">
            필요한 컴포넌트를 <Code>npx @hanui/cli add</Code> 명령어로
            추가합니다.
          </Body>
        </SectionHeading>

        <Subsection level="h3">
          <SectionHeading level="h3" title="단일 컴포넌트 추가" />
          <Code variant="block" language="bash" showLineNumbers={false}>
            npx @hanui/cli add button
          </Code>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="여러 컴포넌트 한 번에 추가" />
          <Code variant="block" language="bash" showLineNumbers={false}>
            npx @hanui/cli add button modal select
          </Code>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="인터랙티브 선택">
            <Body className="text-krds-gray-70">
              명령어만 실행하면 사용 가능한 컴포넌트 목록이 표시되어 선택할 수
              있습니다.
            </Body>
          </SectionHeading>
          <Code variant="block" language="bash" showLineNumbers={false}>
            npx @hanui/cli add
          </Code>
        </Subsection>
      </Section>

      {/* Tailwind CSS Setup */}
      <Section level="h2">
        <SectionHeading
          level="h2"
          id="tailwind-setup"
          title="3. Tailwind CSS 설정"
          description="HANUI는 Tailwind CSS를 사용합니다. 프로젝트에 Tailwind CSS가 설치되어 있지 않다면 먼저 설치하세요."
        />

        <Subsection level="h3">
          <SectionHeading level="h3" title="Tailwind CSS 설치" />
          <Code variant="block" language="bash" showLineNumbers={false}>
            {`npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`}
          </Code>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading
            level="h3"
            title="tailwind.config.js 설정"
            description="HANUI 컴포넌트를 위해 content 경로를 추가하세요:"
          />
          <Code variant="block" language="javascript" showLineNumbers={false}>
            {`/** @type {import('tailwindcss').Config} */
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
          </Code>
        </Subsection>
      </Section>

      {/* Framework Setup */}
      <Section level="h2">
        <SectionHeading
          level="h2"
          id="framework-setup"
          title="4. 프레임워크별 추가 설정"
        />

        <Subsection level="h3">
          <SectionHeading level="h3" title="Next.js">
            <Body className="text-krds-gray-70">
              Next.js 13+ (App Router)를 사용하는 경우 추가 설정이 필요하지
              않습니다.
            </Body>
          </SectionHeading>

          <Card variant="info">
            <Body>
              <strong>Tip:</strong> HANUI 컴포넌트는 Radix UI 기반으로 이미{' '}
              <Code>use client</Code> 지시어가 포함되어 있습니다.
            </Body>
          </Card>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading
            level="h3"
            title="Vite"
            description="Vite 프로젝트에서는 별도 설정 없이 바로 사용 가능합니다."
          />

          <Code variant="block" language="typescript" showLineNumbers={false}>
            {`// main.tsx
import './index.css';
import { Button } from '@/components/hanui/button';`}
          </Code>
        </Subsection>
      </Section>

      {/* Verification */}
      <Section level="h2">
        <SectionHeading
          level="h2"
          id="verification"
          title="5. 설치 확인"
          description="간단한 컴포넌트를 import하여 설치가 정상적으로 완료되었는지 확인하세요:"
        />

        <Code variant="block" language="tsx" showLineNumbers={false}>
          {`import { Button } from '@/components/hanui/button';

function App() {
  return (
    <div>
      <Button>안녕하세요 HANUI!</Button>
    </div>
  );
}

export default App;`}
        </Code>
      </Section>

      {/* Troubleshooting */}
      <Section level="h2">
        <SectionHeading level="h2" id="troubleshooting" title="문제 해결" />

        <Subsection level="h3">
          <SectionHeading
            level="h3"
            title="스타일이 적용되지 않는 경우"
            description="tailwind.config.js의 content 경로에 HANUI 컴포넌트 경로가 포함되어 있는지 확인하세요."
          />

          <Code>
            ./components/hanui/**/*.{'{'}js,ts,jsx,tsx{'}'}
          </Code>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading
            level="h3"
            title="TypeScript 타입 에러"
            description="@types/react 버전이 18 이상인지 확인하세요. 필요시 업데이트:"
          />
          <Code variant="block" language="bash" showLineNumbers={false}>
            npm install -D @types/react@latest @types/react-dom@latest
          </Code>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading
            level="h3"
            title="import 경로 에러"
            description="tsconfig.json에 경로 alias가 설정되어 있는지 확인하세요:"
          />
          <Code variant="block" language="json" showLineNumbers={false}>
            {`{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`}
          </Code>
        </Subsection>
      </Section>

      {/* Next Steps */}
      <PageNavigation
        prev={{ title: 'Introduction', href: '/docs/introduction' }}
        next={{ title: 'Quick Start', href: '/docs/quick-start' }}
      />
    </>
  );
}
