'use client';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';

// UI components - from @hanui/react
import {
  List,
  ListItem,
  Code,
  Body,
  Card,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Alert,
} from '@hanui/react';

export default function InstallationPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Installation"
        description="HANUI 컴포넌트를 프로젝트에 설치하고 설정하는 방법을 안내합니다."
      />

      {/* Prerequisites */}
      <Section>
        <Heading
          level="h2"
          id="prerequisites"
          title="요구사항"
          description="HANUI를 사용하기 전에 다음 요구사항을 확인하세요:"
        />

        <div className="grid gap-4 md:grid-cols-3 mt-6">
          <Card className="p-4">
            <Body className="font-semibold mb-2">React</Body>
            <Code>18.0.0</Code> 이상
          </Card>
          <Card className="p-4">
            <Body className="font-semibold mb-2">Node.js</Body>
            <Code>18.0.0</Code> 이상
          </Card>
          <Card className="p-4">
            <Body className="font-semibold mb-2">Tailwind CSS</Body>
            <Code>v3</Code> 또는 <Code>v4</Code>
          </Card>
        </div>
      </Section>

      {/* Installation Methods */}
      <Section>
        <Heading
          level="h2"
          id="installation-methods"
          title="설치 방법"
          description="프로젝트 상황에 맞는 방법을 선택하세요:"
        />

        <Tabs defaultValue="existing-project" className="mt-6">
          <TabsList>
            <TabsTrigger value="existing-project">
              기존 프로젝트에 추가
            </TabsTrigger>
            <TabsTrigger value="new-project">새 프로젝트 시작</TabsTrigger>
          </TabsList>

          {/* 기존 프로젝트에 추가 */}
          <TabsContent value="existing-project">
            <Card className="mt-6">
              <Body className="font-semibold mb-4 text-xl">
                Step 1. 패키지 설치
              </Body>
              <Body className="mb-4 text-krds-gray-70">
                @hanui/react 패키지를 설치합니다:
              </Body>

              <Tabs defaultValue="pnpm" className="mt-4">
                <TabsList>
                  <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                  <TabsTrigger value="npm">npm</TabsTrigger>
                  <TabsTrigger value="yarn">yarn</TabsTrigger>
                </TabsList>
                <TabsContent value="pnpm">
                  <Code variant="block" language="bash" showLineNumbers={false}>
                    pnpm add @hanui/react
                  </Code>
                </TabsContent>
                <TabsContent value="npm">
                  <Code variant="block" language="bash" showLineNumbers={false}>
                    npm install @hanui/react
                  </Code>
                </TabsContent>
                <TabsContent value="yarn">
                  <Code variant="block" language="bash" showLineNumbers={false}>
                    yarn add @hanui/react
                  </Code>
                </TabsContent>
              </Tabs>

              <Body className="font-semibold mb-4 mt-8 text-xl">
                Step 2. CSS 변수 설정
              </Body>
              <Body className="mb-4 text-krds-gray-70">
                globals.css 최상단에 KRDS CSS 변수를 import합니다. 이 파일에는
                색상, 타이포그래피, 간격 등 모든 디자인 토큰이 정의되어
                있습니다:
              </Body>

              <Code variant="block" language="css" showLineNumbers={false}>
                {`/* app/globals.css 또는 src/app/globals.css */
@import '@hanui/react/variables.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

/* 기존 스타일... */`}
              </Code>

              <Alert variant="warning" className="mt-4" title="CSS import 순서">
                <Code>@import '@hanui/react/variables.css'</Code>는 반드시{' '}
                <Code>@tailwind</Code> 지시어보다 먼저 선언해야 합니다.
              </Alert>

              <Body className="font-semibold mb-4 mt-8 text-xl">
                Step 3. Tailwind 색상 설정
              </Body>
              <Body className="mb-4 text-krds-gray-70">
                CSS 변수를 Tailwind 유틸리티 클래스로 사용하려면{' '}
                <Code>tailwind.config.ts</Code>에 색상을 매핑해야 합니다. 이렇게
                하면 <Code>bg-krds-primary-50</Code>,{' '}
                <Code>text-krds-gray-90</Code> 같은 클래스를 사용할 수 있습니다:
              </Body>

              <Code
                variant="block"
                language="typescript"
                showLineNumbers={false}
              >
                {`// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // HANUI 컴포넌트 스타일 포함
    './node_modules/@hanui/react/dist/**/*.{js,mjs}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary
        'krds-primary': {
          5: 'var(--krds-color-light-primary-5)',
          10: 'var(--krds-color-light-primary-10)',
          20: 'var(--krds-color-light-primary-20)',
          30: 'var(--krds-color-light-primary-30)',
          40: 'var(--krds-color-light-primary-40)',
          50: 'var(--krds-color-light-primary-50)',
          60: 'var(--krds-color-light-primary-60)',
          70: 'var(--krds-color-light-primary-70)',
          80: 'var(--krds-color-light-primary-80)',
          90: 'var(--krds-color-light-primary-90)',
          95: 'var(--krds-color-light-primary-95)',
        },
        // Gray
        'krds-gray': {
          0: 'var(--krds-color-light-gray-0)',
          5: 'var(--krds-color-light-gray-5)',
          10: 'var(--krds-color-light-gray-10)',
          20: 'var(--krds-color-light-gray-20)',
          30: 'var(--krds-color-light-gray-30)',
          40: 'var(--krds-color-light-gray-40)',
          50: 'var(--krds-color-light-gray-50)',
          60: 'var(--krds-color-light-gray-60)',
          70: 'var(--krds-color-light-gray-70)',
          80: 'var(--krds-color-light-gray-80)',
          90: 'var(--krds-color-light-gray-90)',
          95: 'var(--krds-color-light-gray-95)',
        },
        // Danger
        'krds-danger': {
          5: 'var(--krds-color-light-danger-5)',
          10: 'var(--krds-color-light-danger-10)',
          20: 'var(--krds-color-light-danger-20)',
          50: 'var(--krds-color-light-danger-50)',
          60: 'var(--krds-color-light-danger-60)',
        },
        // Success
        'krds-success': {
          5: 'var(--krds-color-light-success-5)',
          10: 'var(--krds-color-light-success-10)',
          20: 'var(--krds-color-light-success-20)',
          50: 'var(--krds-color-light-success-50)',
          60: 'var(--krds-color-light-success-60)',
        },
        // Warning
        'krds-warning': {
          5: 'var(--krds-color-light-warning-5)',
          10: 'var(--krds-color-light-warning-10)',
          20: 'var(--krds-color-light-warning-20)',
          30: 'var(--krds-color-light-warning-30)',
          50: 'var(--krds-color-light-warning-50)',
          60: 'var(--krds-color-light-warning-60)',
        },
        // Info
        'krds-info': {
          5: 'var(--krds-color-light-information-5)',
          10: 'var(--krds-color-light-information-10)',
          20: 'var(--krds-color-light-information-20)',
          50: 'var(--krds-color-light-information-50)',
          60: 'var(--krds-color-light-information-60)',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
    },
  },
};

export default config;`}
              </Code>

              <Alert variant="info" className="mt-4" title="전체 색상 정의">
                위 예시는 주요 색상만 포함합니다. 전체 색상 정의는{' '}
                <a href="/docs/colors" className="underline">
                  Colors 문서
                </a>
                를 참고하세요.
              </Alert>

              <Body className="font-semibold mb-4 mt-8 text-xl">
                Step 4. 컴포넌트 사용
              </Body>
              <Body className="mb-4 text-krds-gray-70">
                이제 HANUI 컴포넌트를 import하여 사용할 수 있습니다:
              </Body>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`import { Button, Card, CardBody } from '@hanui/react';

export default function Page() {
  return (
    <Card>
      <CardBody>
        <h2>Welcome to HANUI</h2>
        <Button variant="primary">시작하기</Button>
      </CardBody>
    </Card>
  );
}`}
              </Code>

              <Body className="font-semibold mb-4 mt-8 text-xl">
                Step 5. 개발 서버 재시작
              </Body>
              <Code variant="block" language="bash" showLineNumbers={false}>
                pnpm dev
              </Code>
            </Card>
          </TabsContent>

          {/* 새 프로젝트 시작 */}
          <TabsContent value="new-project">
            <Card className="mt-6">
              <Body className="font-semibold mb-4 text-xl">
                Step 1. Next.js 프로젝트 생성
              </Body>
              <Body className="mb-4 text-krds-gray-70">
                Next.js 프로젝트를 생성합니다. Tailwind CSS를 포함하도록
                선택하세요:
              </Body>

              <Code variant="block" language="bash" showLineNumbers={false}>
                {`npx create-next-app@latest my-hanui-app

# 프롬프트에서 다음을 선택:
# ✔ Would you like to use TypeScript? Yes
# ✔ Would you like to use ESLint? Yes
# ✔ Would you like to use Tailwind CSS? Yes
# ✔ Would you like to use src/ directory? Yes
# ✔ Would you like to use App Router? Yes`}
              </Code>

              <Body className="font-semibold mb-4 mt-8 text-xl">
                Step 2. HANUI 패키지 설치
              </Body>
              <Code variant="block" language="bash" showLineNumbers={false}>
                {`cd my-hanui-app
pnpm add @hanui/react`}
              </Code>

              <Body className="font-semibold mb-4 mt-8 text-xl">
                Step 3. globals.css 설정
              </Body>
              <Body className="mb-4 text-krds-gray-70">
                <Code>src/app/globals.css</Code> 파일을 다음과 같이 수정합니다:
              </Body>

              <Code variant="block" language="css" showLineNumbers={false}>
                {`/* src/app/globals.css */
@import '@hanui/react/variables.css';

@tailwind base;
@tailwind components;
@tailwind utilities;`}
              </Code>

              <Body className="font-semibold mb-4 mt-8 text-xl">
                Step 4. Tailwind 설정
              </Body>
              <Body className="mb-4 text-krds-gray-70">
                <Code>tailwind.config.ts</Code> 파일에 KRDS 색상을 추가합니다.
                "기존 프로젝트에 추가" 탭의 Step 3을 참고하세요.
              </Body>

              <Body className="font-semibold mb-4 mt-8 text-xl">
                Step 5. 페이지 작성
              </Body>
              <Body className="mb-4 text-krds-gray-70">
                <Code>src/app/page.tsx</Code>를 수정하여 HANUI 컴포넌트를
                사용합니다:
              </Body>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`// src/app/page.tsx
import {
  Button,
  Container,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Body,
} from '@hanui/react';

export default function Home() {
  return (
    <Container className="py-20">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>HANUI에 오신 것을 환영합니다</CardTitle>
        </CardHeader>
        <CardBody>
          <Body className="mb-4">
            KRDS 기반 React 컴포넌트 라이브러리입니다.
          </Body>
          <Button variant="primary">시작하기</Button>
        </CardBody>
      </Card>
    </Container>
  );
}`}
              </Code>

              <Body className="font-semibold mb-4 mt-8 text-xl">
                Step 6. 개발 서버 실행
              </Body>
              <Code variant="block" language="bash" showLineNumbers={false}>
                pnpm dev
              </Code>

              <Alert variant="success" className="mt-4" title="설정 완료">
                <Code>http://localhost:3000</Code>에서 HANUI 컴포넌트가 적용된
                페이지를 확인할 수 있습니다.
              </Alert>
            </Card>
          </TabsContent>
        </Tabs>
      </Section>

      {/* CLI Installation */}
      <Section>
        <Heading
          level="h2"
          id="cli-installation"
          title="CLI로 컴포넌트 추가"
          description="개별 컴포넌트를 프로젝트에 추가하려면 CLI를 사용하세요:"
        />

        <Tabs defaultValue="pnpm" className="mt-6">
          <TabsList>
            <TabsTrigger value="pnpm">pnpm</TabsTrigger>
            <TabsTrigger value="npm">npm</TabsTrigger>
            <TabsTrigger value="yarn">yarn</TabsTrigger>
            <TabsTrigger value="bun">bun</TabsTrigger>
          </TabsList>
          <TabsContent value="pnpm">
            <Code variant="block" language="bash" showLineNumbers={false}>
              pnpm dlx @hanui/cli add button
            </Code>
          </TabsContent>
          <TabsContent value="npm">
            <Code variant="block" language="bash" showLineNumbers={false}>
              npx @hanui/cli add button
            </Code>
          </TabsContent>
          <TabsContent value="yarn">
            <Code variant="block" language="bash" showLineNumbers={false}>
              npx @hanui/cli add button
            </Code>
          </TabsContent>
          <TabsContent value="bun">
            <Code variant="block" language="bash" showLineNumbers={false}>
              bunx @hanui/cli add button
            </Code>
          </TabsContent>
        </Tabs>

        <Alert variant="info" className="mt-4" title="설치 경로">
          컴포넌트는 <Code>@/components/hanui</Code>에 설치됩니다.
          <br />
          <span className="text-krds-gray-60">
            (프로젝트 구조에 따라 src/components/hanui 또는 components/hanui)
          </span>
        </Alert>

        <Code
          variant="block"
          language="tsx"
          className="mt-4"
          showLineNumbers={false}
        >
          {`// 설치 후 import
import { Button } from '@/components/hanui';

export default function Page() {
  return <Button variant="primary">시작하기</Button>;
}`}
        </Code>
      </Section>

      {/* Framework-specific paths */}
      <Section>
        <Heading
          level="h2"
          id="framework-paths"
          title="프레임워크별 파일 경로"
          description="프레임워크에 따라 설정 파일 경로가 다를 수 있습니다:"
        />

        <div className="overflow-x-auto mt-6">
          <table className="w-full border-collapse border border-krds-gray-20 text-sm">
            <thead>
              <tr className="bg-krds-gray-5">
                <th className="border border-krds-gray-20 px-4 py-2 text-left">
                  프레임워크
                </th>
                <th className="border border-krds-gray-20 px-4 py-2 text-left">
                  globals.css 경로
                </th>
                <th className="border border-krds-gray-20 px-4 py-2 text-left">
                  tailwind.config 경로
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-krds-gray-20 px-4 py-2">
                  Next.js (App Router + src)
                </td>
                <td className="border border-krds-gray-20 px-4 py-2">
                  <Code>src/app/globals.css</Code>
                </td>
                <td className="border border-krds-gray-20 px-4 py-2">
                  <Code>tailwind.config.ts</Code>
                </td>
              </tr>
              <tr>
                <td className="border border-krds-gray-20 px-4 py-2">
                  Next.js (App Router)
                </td>
                <td className="border border-krds-gray-20 px-4 py-2">
                  <Code>app/globals.css</Code>
                </td>
                <td className="border border-krds-gray-20 px-4 py-2">
                  <Code>tailwind.config.ts</Code>
                </td>
              </tr>
              <tr>
                <td className="border border-krds-gray-20 px-4 py-2">
                  Next.js (Pages Router)
                </td>
                <td className="border border-krds-gray-20 px-4 py-2">
                  <Code>styles/globals.css</Code>
                </td>
                <td className="border border-krds-gray-20 px-4 py-2">
                  <Code>tailwind.config.ts</Code>
                </td>
              </tr>
              <tr>
                <td className="border border-krds-gray-20 px-4 py-2">
                  Vite + React
                </td>
                <td className="border border-krds-gray-20 px-4 py-2">
                  <Code>src/index.css</Code>
                </td>
                <td className="border border-krds-gray-20 px-4 py-2">
                  <Code>tailwind.config.ts</Code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Brand Customization */}
      <Section>
        <Heading
          level="h2"
          id="customization"
          title="브랜드 색상 커스터마이징"
          description="조직의 브랜드 색상을 적용하려면 CSS 변수를 오버라이드하세요:"
        />

        <Code variant="block" language="css" showLineNumbers={false}>
          {`/* globals.css 하단에 추가 */
:root {
  /* Primary 색상을 조직 브랜드 컬러로 변경 */
  --krds-color-light-primary-50: #0066cc;
  --krds-color-light-primary-60: #0052a3;
  --krds-color-light-primary-70: #003d7a;
  /* 필요한 색상만 선택적으로 오버라이드 */
}`}
        </Code>

        <Alert variant="info" className="mt-4" title="색상 오버라이드 순서">
          커스텀 CSS 변수는 <Code>@import '@hanui/react/variables.css'</Code>{' '}
          이후에 선언해야 적용됩니다.
        </Alert>
      </Section>

      {/* Troubleshooting */}
      <Section>
        <Heading level="h2" id="troubleshooting" title="문제 해결" />

        <Subsection level="h3">
          <Heading
            level="h3"
            title="Module not found: '@hanui/react/variables.css'"
          />
          <Body className="mb-4 text-krds-gray-70">
            패키지가 올바르게 설치되지 않았을 수 있습니다:
          </Body>
          <Code variant="block" language="bash" showLineNumbers={false}>
            {`# 패키지 재설치
pnpm remove @hanui/react
pnpm add @hanui/react

# node_modules 정리 후 재설치
rm -rf node_modules pnpm-lock.yaml
pnpm install`}
          </Code>
        </Subsection>

        <Subsection level="h3">
          <Heading level="h3" title="KRDS 색상 클래스가 적용되지 않음" />
          <List className="mt-4">
            <ListItem>
              <Code>tailwind.config.ts</Code>의 <Code>theme.extend.colors</Code>
              에 KRDS 색상이 정의되어 있는지 확인
            </ListItem>
            <ListItem>
              <Code>content</Code> 배열에{' '}
              <Code>
                ./node_modules/@hanui/react/dist/**/*.{'{'}js,mjs{'}'}
              </Code>{' '}
              경로가 포함되어 있는지 확인
            </ListItem>
            <ListItem>
              <Code>globals.css</Code>에{' '}
              <Code>@import '@hanui/react/variables.css'</Code>가 최상단에
              있는지 확인
            </ListItem>
            <ListItem>개발 서버를 재시작</ListItem>
          </List>
        </Subsection>

        <Subsection level="h3">
          <Heading level="h3" title="Tailwind IntelliSense 자동완성 안됨" />
          <Body className="mb-4 text-krds-gray-70">
            VSCode에서 KRDS 클래스 자동완성이 되지 않는 경우:
          </Body>
          <List>
            <ListItem>VSCode를 재시작</ListItem>
            <ListItem>
              Tailwind CSS IntelliSense 확장이 설치되어 있는지 확인
            </ListItem>
            <ListItem>
              <Code>tailwind.config.ts</Code> 파일에 문법 오류가 없는지 확인
            </ListItem>
          </List>
        </Subsection>

        <Subsection level="h3">
          <Heading level="h3" title="다크 모드가 작동하지 않음" />
          <Body className="mb-4 text-krds-gray-70">
            HANUI는 <Code>.dark</Code> 클래스 기반 다크 모드를 지원합니다:
          </Body>
          <Code variant="block" language="html" showLineNumbers={false}>
            {`<!-- html 태그에 dark 클래스 추가 -->
<html class="dark">
  ...
</html>`}
          </Code>
        </Subsection>
      </Section>

      {/* What's Included */}
      <Section>
        <Heading
          level="h2"
          id="whats-included"
          title="포함된 파일"
          description="@hanui/react 패키지에서 제공하는 파일들:"
        />

        <div className="grid gap-4 md:grid-cols-2 mt-6">
          <Card className="p-4">
            <Body className="font-semibold mb-2">
              <Code>@hanui/react</Code>
            </Body>
            <Body className="text-sm text-krds-gray-70">
              React 컴포넌트 (Button, Card, Input 등)
            </Body>
          </Card>
          <Card className="p-4">
            <Body className="font-semibold mb-2">
              <Code>@hanui/react/variables.css</Code>
            </Body>
            <Body className="text-sm text-krds-gray-70">
              KRDS CSS 변수 (색상, 타이포그래피, 간격)
            </Body>
          </Card>
          <Card className="p-4">
            <Body className="font-semibold mb-2">
              <Code>@hanui/react/styles.css</Code>
            </Body>
            <Body className="text-sm text-krds-gray-70">
              컴포넌트 기본 스타일 (선택적)
            </Body>
          </Card>
        </div>
      </Section>

      {/* Next Steps */}
      <PageNavigation
        prev={{ title: 'Introduction', href: '/docs/introduction' }}
        next={{ title: 'Quick Start', href: '/docs/quick-start' }}
      />
    </>
  );
}
