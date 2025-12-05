'use client';

import { useState } from 'react';
import { Check, Sparkles, Zap } from 'lucide-react';

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
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Alert,
  Button,
} from '@hanui/react';

const AI_PROMPT_ALL = `HANUI 라이브러리를 설치하고 모든 컴포넌트를 추가해줘.

1. CLI 설치: npm install -D @hanui/cli
2. 초기화: npx hanui init -y
3. 모든 컴포넌트 설치: npx hanui add all -y

설치 후 사용법:
import { Button, Card, Header, Footer } from '@/components/hanui'

공식 문서: https://hanui.io/docs/installation`;

export default function InstallationPage() {
  const [aiCopied, setAiCopied] = useState(false);

  const handleAiCopy = async () => {
    await navigator.clipboard.writeText(AI_PROMPT_ALL);
    setAiCopied(true);
    setTimeout(() => setAiCopied(false), 2000);
  };

  return (
    <>
      <Heading
        level="h1"
        title="Installation"
        description="HANUI는 shadcn/ui처럼 소스 코드를 복사하는 방식입니다. CLI로 초기 설정하고, 필요한 컴포넌트만 가져가세요."
      />

      {/* AI로 설치하기 - 맨 위 */}
      <Section>
        <Card className="bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-violet-600" />
              AI로 설치하기
            </CardTitle>
            <CardDescription>
              Cursor, Claude, ChatGPT 등 AI에게 아래 프롬프트를 붙여넣으세요.
            </CardDescription>
          </CardHeader>
          <CardBody>
            <Code variant="block" language="text" className="text-sm">
              {AI_PROMPT_ALL}
            </Code>
          </CardBody>
          <CardFooter className="justify-end">
            <Button
              onClick={handleAiCopy}
              variant="secondary"
              iconLeft={
                aiCopied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )
              }
              className="bg-gradient-to-r from-violet-500 to-purple-500 text-white border-transparent hover:from-violet-600 hover:to-purple-600"
            >
              {aiCopied ? '복사됨!' : 'AI 프롬프트 복사'}
            </Button>
          </CardFooter>
        </Card>
      </Section>

      {/* 요구사항 */}
      <Section>
        <Heading level="h2" id="prerequisites" title="요구사항" />

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
            <Code>v4.x</Code> (권장) 또는 <Code>v3.x</Code>
          </Card>
        </div>

        <Alert variant="info" className="mt-6" title="Tailwind CSS 필수">
          HANUI CLI는 Tailwind가 설치된 프로젝트에서 실행해야 합니다. CLI가
          Tailwind 버전(v3/v4)을 자동 감지하여 적절한 설정을 적용합니다.
        </Alert>
      </Section>

      {/* 단계별 설치 */}
      <Section>
        <Heading level="h2" id="step-by-step" title="단계별 설치" />

        <Subsection level="h3">
          <Heading level="h3" title="Step 1. CLI 설치" />
          <Body className="mb-4 text-krds-gray-70">
            프로젝트에 CLI를 devDependency로 설치합니다:
          </Body>

          <Tabs defaultValue="npm" className="mt-4">
            <TabsList>
              <TabsTrigger value="npm">npm</TabsTrigger>
              <TabsTrigger value="pnpm">pnpm</TabsTrigger>
              <TabsTrigger value="yarn">yarn</TabsTrigger>
            </TabsList>
            <TabsContent value="npm">
              <Code variant="block" language="bash" showLineNumbers={false}>
                npm install -D @hanui/cli
              </Code>
            </TabsContent>
            <TabsContent value="pnpm">
              <Code variant="block" language="bash" showLineNumbers={false}>
                pnpm add -D @hanui/cli
              </Code>
            </TabsContent>
            <TabsContent value="yarn">
              <Code variant="block" language="bash" showLineNumbers={false}>
                yarn add -D @hanui/cli
              </Code>
            </TabsContent>
          </Tabs>
        </Subsection>

        <Subsection level="h3">
          <Heading level="h3" title="Step 2. 프로젝트 초기화" />
          <Body className="mb-4 text-krds-gray-70">
            CLI를 실행하면 KRDS 디자인 토큰이 자동으로 설정됩니다:
          </Body>

          <Tabs defaultValue="npm" className="mt-4">
            <TabsList>
              <TabsTrigger value="npm">npm</TabsTrigger>
              <TabsTrigger value="pnpm">pnpm</TabsTrigger>
              <TabsTrigger value="yarn">yarn</TabsTrigger>
            </TabsList>
            <TabsContent value="npm">
              <Code variant="block" language="bash" showLineNumbers={false}>
                npx hanui init
              </Code>
            </TabsContent>
            <TabsContent value="pnpm">
              <Code variant="block" language="bash" showLineNumbers={false}>
                pnpm hanui init
              </Code>
            </TabsContent>
            <TabsContent value="yarn">
              <Code variant="block" language="bash" showLineNumbers={false}>
                yarn hanui init
              </Code>
            </TabsContent>
          </Tabs>

          <Alert variant="info" className="mt-4" title="init이 하는 일">
            <List variant="check" className="mt-2 text-sm">
              <ListItem>
                <Code>variables.css</Code> 생성 — KRDS 색상, 타이포그래피, 간격
                CSS 변수
              </ListItem>
              <ListItem>
                <Code>globals.css</Code> 수정 — CSS 변수 import 추가
              </ListItem>
              <ListItem>
                <Code>components/hanui</Code> 디렉토리 생성
              </ListItem>
              <ListItem>
                <strong>v4:</strong> <Code>@theme</Code> 블록 자동 생성 /{' '}
                <strong>v3:</strong> <Code>hanui.preset.js</Code> 생성
              </ListItem>
            </List>
          </Alert>
        </Subsection>

        <Subsection level="h3">
          <Heading level="h3" title="Step 3. 컴포넌트 추가" />
          <Body className="mb-4 text-krds-gray-70">
            필요한 컴포넌트를 추가합니다. 소스 코드가{' '}
            <Code>components/hanui/</Code>에 복사됩니다:
          </Body>

          <Tabs defaultValue="npm" className="mt-4">
            <TabsList>
              <TabsTrigger value="npm">npm</TabsTrigger>
              <TabsTrigger value="pnpm">pnpm</TabsTrigger>
              <TabsTrigger value="yarn">yarn</TabsTrigger>
            </TabsList>
            <TabsContent value="npm">
              <Code variant="block" language="bash" showLineNumbers={false}>
                {`# 단일 컴포넌트
npx hanui add button

# 여러 컴포넌트
npx hanui add button card input

# 모든 컴포넌트
npx hanui add all`}
              </Code>
            </TabsContent>
            <TabsContent value="pnpm">
              <Code variant="block" language="bash" showLineNumbers={false}>
                {`# 단일 컴포넌트
pnpm hanui add button

# 여러 컴포넌트
pnpm hanui add button card input

# 모든 컴포넌트
pnpm hanui add all`}
              </Code>
            </TabsContent>
            <TabsContent value="yarn">
              <Code variant="block" language="bash" showLineNumbers={false}>
                {`# 단일 컴포넌트
yarn hanui add button

# 여러 컴포넌트
yarn hanui add button card input

# 모든 컴포넌트
yarn hanui add all`}
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
        </Subsection>

        <Subsection level="h3">
          <Heading level="h3" title="Step 4. 사용하기" />
          <Body className="mb-4 text-krds-gray-70">
            설치된 컴포넌트를 import하여 사용합니다:
          </Body>

          <Code variant="block" language="tsx" showLineNumbers={false}>
            {`import { Button, Card, CardBody } from '@/components/hanui'

export default function Page() {
  return (
    <Card>
      <CardBody>
        <h2>Welcome to HANUI</h2>
        <Button variant="primary">시작하기</Button>
      </CardBody>
    </Card>
  )
}`}
          </Code>
        </Subsection>
      </Section>

      {/* init이 생성하는 파일 */}
      <Section>
        <Heading level="h2" id="init-files" title="init이 생성하는 파일" />

        <Subsection level="h3">
          <Heading level="h3" title="variables.css" />
          <Body className="mb-4 text-krds-gray-70">
            KRDS 디자인 시스템의 CSS 변수가 정의되어 있습니다:
          </Body>

          <Code variant="block" language="css" showLineNumbers={false}>
            {`/* variables.css - KRDS 디자인 토큰 */
:root {
  /* Primary Colors */
  --krds-color-light-primary-50: #256ef4;
  --krds-color-light-primary-60: #0b50d0;

  /* Gray Scale */
  --krds-color-light-gray-0: #ffffff;
  --krds-color-light-gray-90: #1e2124;

  /* Semantic Colors */
  --krds-primary-base: var(--krds-color-light-primary-50);
  --krds-danger-base: var(--krds-color-light-danger-50);
}

.dark {
  /* 다크 모드 자동 지원 */
  --krds-color-light-gray-0: #000000;
  --krds-color-light-gray-90: #e6e8ea;
}`}
          </Code>
        </Subsection>

        <Subsection level="h3">
          <Heading level="h3" title="globals.css" />
          <Body className="mb-4 text-krds-gray-70">
            기존 <Code>globals.css</Code>에 CSS 변수 import가 추가됩니다:
          </Body>

          <Tabs defaultValue="v4" className="mt-4">
            <TabsList>
              <TabsTrigger value="v4">Tailwind v4</TabsTrigger>
              <TabsTrigger value="v3">Tailwind v3</TabsTrigger>
            </TabsList>
            <TabsContent value="v4">
              <Code variant="block" language="css" showLineNumbers={false}>
                {`/* globals.css - Tailwind v4 */
@import "tailwindcss";
@import "./styles/variables.css";

@theme {
  /* KRDS 색상을 Tailwind 유틸리티로 매핑 */
  --color-krds-primary-50: var(--krds-color-light-primary-50);
  --color-krds-gray-5: var(--krds-color-light-gray-5);
}`}
              </Code>
            </TabsContent>
            <TabsContent value="v3">
              <Code variant="block" language="css" showLineNumbers={false}>
                {`/* globals.css - Tailwind v3 */
@import './styles/variables.css';

@tailwind base;
@tailwind components;
@tailwind utilities;`}
              </Code>
            </TabsContent>
          </Tabs>
        </Subsection>
      </Section>

      {/* 프레임워크별 경로 */}
      <Section>
        <Heading
          level="h2"
          id="framework-paths"
          title="프레임워크별 파일 경로"
        />

        <div className="overflow-x-auto mt-6">
          <table className="w-full border-collapse border border-krds-gray-20 text-sm">
            <thead>
              <tr className="bg-krds-gray-5">
                <th className="border border-krds-gray-20 px-4 py-2 text-left">
                  프레임워크
                </th>
                <th className="border border-krds-gray-20 px-4 py-2 text-left">
                  컴포넌트 경로
                </th>
                <th className="border border-krds-gray-20 px-4 py-2 text-left">
                  globals.css 경로
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-krds-gray-20 px-4 py-2">
                  Next.js (App Router + src)
                </td>
                <td className="border border-krds-gray-20 px-4 py-2">
                  <Code>src/components/hanui/</Code>
                </td>
                <td className="border border-krds-gray-20 px-4 py-2">
                  <Code>src/app/globals.css</Code>
                </td>
              </tr>
              <tr>
                <td className="border border-krds-gray-20 px-4 py-2">
                  Next.js (App Router)
                </td>
                <td className="border border-krds-gray-20 px-4 py-2">
                  <Code>components/hanui/</Code>
                </td>
                <td className="border border-krds-gray-20 px-4 py-2">
                  <Code>app/globals.css</Code>
                </td>
              </tr>
              <tr>
                <td className="border border-krds-gray-20 px-4 py-2">
                  Vite + React
                </td>
                <td className="border border-krds-gray-20 px-4 py-2">
                  <Code>src/components/hanui/</Code>
                </td>
                <td className="border border-krds-gray-20 px-4 py-2">
                  <Code>src/index.css</Code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* 브랜드 커스터마이징 */}
      <Section>
        <Heading
          level="h2"
          id="customization"
          title="브랜드 색상 커스터마이징"
        />
        <Body className="mb-4 text-krds-gray-70">
          조직의 브랜드 색상을 적용하려면 CSS 변수를 오버라이드하세요:
        </Body>

        <Code variant="block" language="css" showLineNumbers={false}>
          {`/* globals.css 하단에 추가 */
:root {
  /* Primary 색상을 조직 브랜드 컬러로 변경 */
  --krds-color-light-primary-50: #0066cc;
  --krds-color-light-primary-60: #0052a3;
}`}
        </Code>
      </Section>

      {/* 문제 해결 */}
      <Section>
        <Heading level="h2" id="troubleshooting" title="문제 해결" />

        <Subsection level="h3">
          <Heading level="h3" title="KRDS 색상 클래스가 적용되지 않음" />
          <List className="mt-4">
            <ListItem>
              <Code>npx hanui init</Code>을 실행했는지 확인
            </ListItem>
            <ListItem>
              v3: <Code>tailwind.config.ts</Code>에 <Code>hanUIPreset</Code>이
              추가되어 있는지 확인
            </ListItem>
            <ListItem>개발 서버를 재시작</ListItem>
          </List>
        </Subsection>

        <Subsection level="h3">
          <Heading level="h3" title="컴포넌트 import 에러" />
          <Body className="mb-4 text-krds-gray-70">
            <Code>@/components/hanui</Code> 경로를 인식하지 못하는 경우:
          </Body>

          <Code
            variant="block"
            language="json"
            className="mt-4"
            showLineNumbers={false}
          >
            {`// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`}
          </Code>
        </Subsection>

        <Subsection level="h3">
          <Heading level="h3" title="다크 모드가 작동하지 않음" />
          <Code variant="block" language="html" showLineNumbers={false}>
            {`<!-- html 태그에 dark 클래스 추가 -->
<html class="dark">
  ...
</html>`}
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
