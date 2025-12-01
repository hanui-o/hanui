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
        description="HANUI는 shadcn/ui처럼 소스 코드를 복사하는 방식입니다. CLI로 초기 설정하고, 필요한 컴포넌트만 가져가세요."
      />

      {/* 핵심 개념 */}
      <Section>
        <Heading level="h2" id="how-it-works" title="어떻게 작동하나요?" />

        <Card variant="filled" className="mb-6">
          <Body className="leading-relaxed">
            HANUI는 npm 패키지 의존성이 아닌{' '}
            <strong>소스 코드 복사 방식</strong>입니다. 컴포넌트 코드가 내
            프로젝트에 직접 복사되어, 자유롭게 수정할 수 있습니다.
          </Body>
        </Card>

        <List variant="check" className="mb-4">
          <ListItem>
            <Code>npm install -D @hanui/cli</Code> — CLI 설치 (1회)
          </ListItem>
          <ListItem>
            <Code>npx hanui init</Code> — KRDS 디자인 토큰 + Tailwind 설정
          </ListItem>
          <ListItem>
            <Code>npx hanui add button</Code> — 컴포넌트 소스 코드 복사
          </ListItem>
          <ListItem>
            <Code>
              import {'{ Button }'} from &apos;@/components/hanui&apos;
            </Code>{' '}
            — 바로 사용
          </ListItem>
        </List>
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

      {/* 설치 방법 */}
      <Section>
        <Heading level="h2" id="installation" title="설치" />

        <Subsection level="h3">
          <Heading level="h3" title="빠른 시작 (한 번에 설치)" />
          <Body className="mb-4 text-krds-gray-70">
            CLI 설치, 초기화, 버튼 컴포넌트 추가를 한 번에 실행합니다:
          </Body>

          <Tabs defaultValue="npm" className="mt-4">
            <TabsList>
              <TabsTrigger value="npm">npm</TabsTrigger>
              <TabsTrigger value="pnpm">pnpm</TabsTrigger>
              <TabsTrigger value="yarn">yarn</TabsTrigger>
            </TabsList>
            <TabsContent value="npm">
              <Code variant="block" language="bash" showLineNumbers={false}>
                {`npm install -D @hanui/cli && npx hanui init -y && npx hanui add button -y`}
              </Code>
            </TabsContent>
            <TabsContent value="pnpm">
              <Code variant="block" language="bash" showLineNumbers={false}>
                {`pnpm add -D @hanui/cli && pnpm hanui init -y && pnpm hanui add button -y`}
              </Code>
            </TabsContent>
            <TabsContent value="yarn">
              <Code variant="block" language="bash" showLineNumbers={false}>
                {`yarn add -D @hanui/cli && yarn hanui init -y && yarn hanui add button -y`}
              </Code>
            </TabsContent>
          </Tabs>

          <Alert variant="info" className="mt-4" title="자동 의존성 설치">
            CLI가 컴포넌트별 필요한 의존성을 자동으로 설치합니다. (lucide-react,
            @radix-ui/* 등)
          </Alert>
        </Subsection>

        <Subsection level="h3">
          <Heading level="h3" title="단계별 설치" />
          <Body className="mb-4 text-krds-gray-70">
            각 단계를 확인하며 설치하려면 아래 순서를 따르세요:
          </Body>
        </Subsection>

        <Subsection level="h4">
          <Heading level="h4" title="Step 1. CLI 설치" />
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

          <Alert
            variant="info"
            className="mt-4"
            title="devDependency 설치의 장점"
          >
            <List variant="check" className="mt-2 text-sm">
              <ListItem>
                짧은 명령어: <Code>npx hanui add button</Code>
              </ListItem>
              <ListItem>팀원 모두 동일한 CLI 버전 사용</ListItem>
              <ListItem>
                <Code>npm install</Code> 시 CLI도 함께 설치됨
              </ListItem>
            </List>
          </Alert>
        </Subsection>

        <Subsection level="h4">
          <Heading level="h4" title="Step 2. 프로젝트 초기화" />
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
                <strong>v4 전용:</strong> <Code>@theme</Code> 블록 자동 생성
                (Tailwind 유틸리티 매핑)
              </ListItem>
              <ListItem>
                <strong>v3 전용:</strong> <Code>hanui.preset.js</Code> 생성 및{' '}
                <Code>tailwind.config</Code> 수정
              </ListItem>
            </List>
          </Alert>
        </Subsection>

        <Subsection level="h4">
          <Heading level="h4" title="Step 3. 컴포넌트 추가" />
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
npx hanui add button card input`}
              </Code>
            </TabsContent>
            <TabsContent value="pnpm">
              <Code variant="block" language="bash" showLineNumbers={false}>
                {`# 단일 컴포넌트
pnpm hanui add button

# 여러 컴포넌트
pnpm hanui add button card input`}
              </Code>
            </TabsContent>
            <TabsContent value="yarn">
              <Code variant="block" language="bash" showLineNumbers={false}>
                {`# 단일 컴포넌트
yarn hanui add button

# 여러 컴포넌트
yarn hanui add button card input`}
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

        <Subsection level="h4">
          <Heading level="h4" title="Step 4. 사용하기" />
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
  /* ... 전체 색상 팔레트 */

  /* Gray Scale */
  --krds-color-light-gray-0: #ffffff;
  --krds-color-light-gray-90: #1e2124;
  /* ... */

  /* Semantic Colors */
  --krds-primary-base: var(--krds-color-light-primary-50);
  --krds-danger-base: var(--krds-color-light-danger-50);
  /* ... */

  /* Typography */
  --krds-body-md: 17px;
  --krds-title-md: 24px;
  /* ... */
}

.dark {
  /* 다크 모드 자동 지원 */
  --krds-color-light-gray-0: #000000;
  --krds-color-light-gray-90: #e6e8ea;
  /* ... */
}`}
          </Code>
        </Subsection>

        <Subsection level="h3">
          <Heading level="h3" title="globals.css" />
          <Body className="mb-4 text-krds-gray-70">
            기존 <Code>globals.css</Code> 파일이 있으면 CSS 변수 import가
            추가됩니다:
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
@import "./styles/variables.css";  /* ← 자동 추가됨 */

/* 기존 스타일... */

@theme {
  /* KRDS 색상을 Tailwind 유틸리티로 매핑 */
  --color-krds-primary-50: var(--krds-color-light-primary-50);
  --color-krds-gray-5: var(--krds-color-light-gray-5);
  /* ... 전체 색상 팔레트 자동 생성 */
}`}
              </Code>
              <Body className="mt-3 text-krds-gray-60 text-sm">
                v4는 <Code>@theme</Code> 블록으로 Tailwind 유틸리티를
                정의합니다.
                <Code>bg-krds-primary-50</Code>, <Code>text-krds-gray-90</Code>{' '}
                등 클래스를 사용할 수 있습니다.
              </Body>
            </TabsContent>
            <TabsContent value="v3">
              <Code variant="block" language="css" showLineNumbers={false}>
                {`/* globals.css - Tailwind v3 */
@import './styles/variables.css';  /* ← 자동 추가됨 */

@tailwind base;
@tailwind components;
@tailwind utilities;

/* 기존 스타일들은 그대로 유지... */`}
              </Code>
            </TabsContent>
          </Tabs>
        </Subsection>

        <Subsection level="h3">
          <Heading level="h3" title="tailwind.config.ts (v3 전용)" />
          <Body className="mb-4 text-krds-gray-70">
            Tailwind v3 사용 시, KRDS 색상이 Tailwind 유틸리티 클래스로
            매핑됩니다:
          </Body>

          <Code variant="block" language="typescript" showLineNumbers={false}>
            {`// tailwind.config.ts (v3 전용 - v4는 불필요)
import hanUIPreset from './hanui.preset.js'

export default {
  presets: [hanUIPreset],
  content: [
    './src/**/*.{ts,tsx}',
    './components/hanui/**/*.{ts,tsx}',
  ],
}

// 이제 이런 클래스를 사용할 수 있습니다:
// bg-krds-primary-50, text-krds-gray-90, border-krds-danger-60 등`}
          </Code>

          <Alert variant="info" className="mt-4" title="v4는 CSS 기반 설정">
            Tailwind v4는 <Code>tailwind.config.js</Code>가 필요 없습니다. CSS
            변수가 직접 <Code>globals.css</Code>에 import됩니다.
          </Alert>
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
                  Next.js (Pages Router)
                </td>
                <td className="border border-krds-gray-20 px-4 py-2">
                  <Code>components/hanui/</Code>
                </td>
                <td className="border border-krds-gray-20 px-4 py-2">
                  <Code>styles/globals.css</Code>
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
          커스텀 CSS 변수는 <Code>@import &apos;./variables.css&apos;</Code>{' '}
          이후에 선언해야 적용됩니다.
        </Alert>
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
              <Code>tailwind.config.ts</Code>에 <Code>hanUIPreset</Code>이
              추가되어 있는지 확인
            </ListItem>
            <ListItem>
              <Code>content</Code> 배열에 <Code>components/hanui/**/*.tsx</Code>{' '}
              경로가 포함되어 있는지 확인
            </ListItem>
            <ListItem>개발 서버를 재시작</ListItem>
          </List>
        </Subsection>

        <Subsection level="h3">
          <Heading level="h3" title="컴포넌트 import 에러" />
          <Body className="mb-4 text-krds-gray-70">
            <Code>@/components/hanui</Code> 경로를 인식하지 못하는 경우:
          </Body>
          <List>
            <ListItem>
              <Code>tsconfig.json</Code>에 <Code>@/*</Code> 경로 별칭이 설정되어
              있는지 확인
            </ListItem>
            <ListItem>
              <Code>components/hanui/index.ts</Code> 파일이 있고 export가 제대로
              되어 있는지 확인
            </ListItem>
          </List>

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
      "@/*": ["./src/*"]  // 또는 ["./*"]
    }
  }
}`}
          </Code>
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

      {/* Next Steps */}
      <PageNavigation
        prev={{ title: 'Introduction', href: '/docs/introduction' }}
        next={{ title: 'Quick Start', href: '/docs/quick-start' }}
      />
    </>
  );
}
