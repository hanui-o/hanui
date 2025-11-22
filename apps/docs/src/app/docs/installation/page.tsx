'use client';

// Docs layout components
import {
  PageSection as Section,
  SectionHeading,
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
  Button,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@hanui/react';

export default function InstallationPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Installation"
        description="CLI를 사용하여 HANUI 컴포넌트를 프로젝트에 추가하세요."
      />

      {/* Installation Methods */}
      <Section>
        <SectionHeading
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

          <TabsContent value="new-project">
            <Card className="mt-6">
              <Body className="font-semibold mb-4">
                1. CLI로 새 프로젝트 생성
              </Body>
              <Body className="mb-4 text-krds-gray-70">
                HANUI CLI를 사용하여 Next.js + Tailwind CSS + KRDS 프리셋이 모두
                설정된 새 프로젝트를 생성합니다.
              </Body>

              <Code variant="block" language="bash" showLineNumbers={false}>
                npx create-hanui-app
              </Code>

              <Card variant="info" className="mt-6">
                <Body className="font-semibold mb-3">
                  자동으로 설정되는 항목:
                </Body>
                <List variant="check" className="text-krds-gray-90">
                  <ListItem>Next.js 15 + React 19 프로젝트 구조</ListItem>
                  <ListItem>Tailwind CSS 4 + KRDS preset</ListItem>
                  <ListItem>TypeScript 설정</ListItem>
                  <ListItem>기본 레이아웃 및 예제 페이지</ListItem>
                </List>
              </Card>

              <Body className="font-semibold mb-4 mt-6">
                2. 프로젝트 초기화
              </Body>
              <Body className="mb-4 text-krds-gray-70">
                프로젝트로 이동하여 HANUI 컴포넌트를 사용할 준비를 합니다.
              </Body>

              <Code variant="block" language="bash" showLineNumbers={false}>
                {`cd my-hanui-app
npx hanui init`}
              </Code>

              <Card variant="info" className="mt-6">
                <Body className="mb-3">
                  <Code>hanui init</Code>은 다음을 자동으로 설정합니다:
                </Body>
                <List className="text-krds-gray-90">
                  <ListItem>
                    프로젝트 타입 감지 (Next.js/Vite, src 폴더 유무)
                  </ListItem>
                  <ListItem>컴포넌트 설치 경로 자동 설정</ListItem>
                  <ListItem>
                    <Code>hanui.css</Code> - KRDS 디자인 토큰 및 Pretendard 폰트
                  </ListItem>
                  <ListItem>cn() 유틸리티 함수 생성</ListItem>
                  <ListItem>hanui.json 설정 파일 생성</ListItem>
                </List>
              </Card>

              <Body className="font-semibold mb-4 mt-6">
                2-1. CSS 변수 Import (권장)
              </Body>
              <Body className="mb-4 text-krds-gray-70">
                KRDS 디자인 시스템의 모든 CSS 변수를 사용하려면 globals.css에
                추가하세요:
              </Body>
              <Code variant="block" language="css" showLineNumbers={false}>
                {`/* app/globals.css */
@import '@hanui/react/variables.css';`}
              </Code>

              <Card variant="info" className="mt-6">
                <Body className="mb-3">
                  variables.css는 모든 KRDS 표준 값을 제공하며, 조직의 브랜드
                  색상으로 쉽게 커스터마이징할 수 있습니다.
                </Body>
              </Card>

              <Body className="font-semibold mb-4 mt-6">3. 컴포넌트 추가</Body>
              <Body className="mb-4 text-krds-gray-70">
                필요한 컴포넌트를 프로젝트에 추가합니다.
              </Body>

              <Code variant="block" language="bash" showLineNumbers={false}>
                {`# 단일 컴포넌트 추가
npx hanui add button

# 여러 컴포넌트 추가
npx hanui add button card input

# 인터랙티브 선택
npx hanui add`}
              </Code>

              <Body className="font-semibold mb-4 mt-6">4. 개발 서버 실행</Body>
              <Code variant="block" language="bash" showLineNumbers={false}>
                npm run dev
              </Code>
            </Card>
          </TabsContent>

          <TabsContent value="existing-project">
            <Card className="mt-6">
              <Body className="font-semibold mb-4">1. 필수 요구사항 확인</Body>
              <Body className="mb-4 text-krds-gray-70">
                기존 프로젝트에 HANUI를 추가하기 전에 다음을 확인하세요:
              </Body>

              <List className="mb-6">
                <ListItem>
                  <Code>React</Code> 18.0.0 이상 또는 <Code>React</Code> 19.0.0
                </ListItem>
                <ListItem>
                  <Code>Node.js</Code> 18.0.0 이상
                </ListItem>
                <ListItem>
                  <Code>Tailwind CSS</Code> v3 또는 v4
                </ListItem>
              </List>

              <Body className="font-semibold mb-4">
                2. Tailwind CSS 설치 (없는 경우)
              </Body>

              <Tabs defaultValue="v3" className="mt-4">
                <TabsList>
                  <TabsTrigger value="v3">Tailwind CSS v3</TabsTrigger>
                  <TabsTrigger value="v4">Tailwind CSS v4</TabsTrigger>
                </TabsList>

                <TabsContent value="v3">
                  <Body className="mb-4 text-krds-gray-70">
                    대부분의 프로젝트에서 사용 중인 안정 버전입니다:
                  </Body>
                  <Code variant="block" language="bash" showLineNumbers={false}>
                    {`npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`}
                  </Code>
                </TabsContent>

                <TabsContent value="v4">
                  <Body className="mb-4 text-krds-gray-70">
                    최신 기능을 사용하려면 v4를 선택하세요:
                  </Body>
                  <Code variant="block" language="bash" showLineNumbers={false}>
                    {`npm install -D tailwindcss@next @tailwindcss/postcss@next`}
                  </Code>

                  <Body className="mb-4 text-krds-gray-70 mt-4">
                    postcss.config.mjs 파일 생성:
                  </Body>
                  <Code
                    variant="block"
                    language="javascript"
                    showLineNumbers={false}
                  >
                    {`export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};`}
                  </Code>

                  <Body className="mb-4 text-krds-gray-70 mt-4">
                    tailwind.config.ts 파일 생성:
                  </Body>
                  <Code
                    variant="block"
                    language="typescript"
                    showLineNumbers={false}
                  >
                    {`import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
};

export default config;`}
                  </Code>
                </TabsContent>
              </Tabs>

              <Body className="font-semibold mb-4 mt-6">3. HANUI 초기화</Body>
              <Body className="mb-4 text-krds-gray-70">
                프로젝트에 HANUI를 설정합니다. 프로젝트 타입과 src 폴더 유무를
                자동으로 감지합니다.
              </Body>
              <Code variant="block" language="bash" showLineNumbers={false}>
                npx hanui init
              </Code>

              <Card variant="info" className="mt-6">
                <Body className="mb-3">
                  초기화 시 다음 항목을 설정할 수 있습니다:
                </Body>
                <List className="text-krds-gray-90">
                  <ListItem>
                    컴포넌트 설치 경로 (기본: components/hanui)
                  </ListItem>
                  <ListItem>
                    <Code>hanui.css</Code> - KRDS 디자인 토큰, Pretendard 폰트,
                    SVG 아이콘 스타일
                  </ListItem>
                  <ListItem>유틸리티 함수 경로 (기본: lib/utils)</ListItem>
                  <ListItem>Tailwind CSS 설정 여부</ListItem>
                </List>
              </Card>

              <Body className="font-semibold mb-4 mt-6">
                4. CSS 변수 Import
              </Body>
              <Body className="mb-4 text-krds-gray-70">
                KRDS 디자인 시스템의 모든 CSS 변수를 사용하려면 globals.css 또는
                root layout에 variables.css를 import하세요:
              </Body>
              <Code variant="block" language="css" showLineNumbers={false}>
                {`/* app/globals.css 또는 styles/globals.css */
@import '@hanui/react/variables.css';`}
              </Code>

              <Card variant="info" className="mt-6">
                <Body className="mb-3">
                  variables.css에는 다음이 포함되어 있습니다:
                </Body>
                <List className="text-krds-gray-90">
                  <ListItem>색상 시스템 (Primary, Gray, Semantic)</ListItem>
                  <ListItem>간격 시스템 (Gap, Padding, Container)</ListItem>
                  <ListItem>
                    타이포그래피 (Font Size, Weight, Line Height)
                  </ListItem>
                  <ListItem>Border & Radius</ListItem>
                  <ListItem>Shadow, Z-Index, Transition</ListItem>
                  <ListItem>다크 모드 자동 지원</ListItem>
                </List>
              </Card>

              <Body className="font-semibold mb-4 mt-6">
                5. 조직 브랜드 색상 커스터마이징 (선택사항)
              </Body>
              <Body className="mb-4 text-krds-gray-70">
                조직의 브랜드 색상을 적용하려면 별도 파일에서 Primary 색상을
                오버라이드하세요:
              </Body>
              <Code variant="block" language="css" showLineNumbers={false}>
                {`/* styles/theme.css */
:root {
  /* 조직의 브랜드 컬러로 변경 */
  --krds-color-primary-500: #0066cc;
  --krds-color-primary-600: #0052a3;
  /* 필요한 색상만 오버라이드 */
}`}
              </Code>

              <Body className="mb-4 text-krds-gray-70 mt-4">
                그리고 globals.css에서 import:
              </Body>
              <Code variant="block" language="css" showLineNumbers={false}>
                {`/* app/globals.css */
@import '@hanui/react/variables.css';
@import './theme.css'; /* 커스텀 테마 */`}
              </Code>

              <Body className="font-semibold mb-4 mt-6">6. 컴포넌트 추가</Body>
              <Body className="mb-4 text-krds-gray-70">
                필요한 컴포넌트를 선택하여 프로젝트에 추가합니다. 필요한
                의존성(clsx, tailwind-merge 등)은 자동으로 설치됩니다:
              </Body>
              <Code variant="block" language="bash" showLineNumbers={false}>
                npx hanui add button card input
              </Code>
            </Card>
          </TabsContent>
        </Tabs>
      </Section>

      {/* Usage Example */}
      <Section>
        <SectionHeading
          level="h2"
          id="usage"
          title="사용 예제"
          description="추가한 컴포넌트를 import하여 바로 사용할 수 있습니다:"
        />

        <Code variant="block" language="tsx" showLineNumbers={false}>
          {`'use client';

// Button already imported from @hanui/react above
// Card already imported from @hanui/react above

export default function Page() {
  return (
    <div className="space-y-4">
      <Card>
        <h2 className="text-lg font-semibold mb-4">HANUI 컴포넌트</h2>
        <Button variant="primary">Primary Button</Button>
      </Card>
    </div>
  );
}`}
        </Code>

        <Card variant="info" className="mt-6">
          <Body className="mb-3">
            <strong>중요:</strong> CLI로 추가한 컴포넌트는 프로젝트 내부
            파일이므로:
          </Body>
          <List className="text-krds-gray-90">
            <ListItem>
              <Code>@/components/hanui/button</Code> 경로로 import (src 폴더가
              있는 경우 자동 적용)
            </ListItem>
            <ListItem>컴포넌트 소스 코드를 자유롭게 수정 가능</ListItem>
            <ListItem>
              Next.js 사용 시 <Code>'use client'</Code> 지시어 필요
            </ListItem>
          </List>
        </Card>
      </Section>

      {/* Troubleshooting */}
      <Section>
        <SectionHeading level="h2" id="troubleshooting" title="문제 해결" />

        <Subsection level="h3">
          <SectionHeading level="h3" title="컴포넌트를 찾을 수 없다는 에러" />
          <Body className="mb-4 text-krds-gray-70">
            import 경로 오류일 가능성이 높습니다:
          </Body>
          <List>
            <ListItem>
              <Code>hanui.json</Code> 파일의 aliases 설정 확인
            </ListItem>
            <ListItem>
              <Code>tsconfig.json</Code>의 paths 설정에 <Code>@/*</Code> 경로
              매핑 확인
            </ListItem>
            <ListItem>
              컴포넌트가 실제로 <Code>components/hanui/</Code> 또는{' '}
              <Code>src/components/hanui/</Code>에 있는지 확인
            </ListItem>
          </List>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="스타일이 적용되지 않는 경우" />
          <List>
            <ListItem>
              <Code>tailwind.config.ts</Code>의 content 경로에 컴포넌트 경로가
              포함되어 있는지 확인:
              <Code className="block mt-2">
                './components/**/*.{'{'}js,ts,jsx,tsx{'}'}
              </Code>
            </ListItem>
            <ListItem>
              KRDS 디자인 토큰 사용을 위해 preset 설정 확인:
              <Code className="block mt-2">
                presets: [require('@hanui/react/preset')]
              </Code>
            </ListItem>
            <ListItem>개발 서버를 재시작해보세요</ListItem>
          </List>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="hanui init 실패" />
          <Body className="mb-4 text-krds-gray-70">
            package.json이 있는 프로젝트 루트에서 실행하고 있는지 확인하세요:
          </Body>
          <Code variant="block" language="bash" showLineNumbers={false}>
            {`# package.json 확인
ls package.json

# 프로젝트 루트에서 실행
npx hanui init`}
          </Code>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="TypeScript 타입 에러" />
          <Body className="mb-4 text-krds-gray-70">
            React 타입 버전이 18 이상인지 확인하세요:
          </Body>
          <Code variant="block" language="bash" showLineNumbers={false}>
            npm install -D @types/react@latest @types/react-dom@latest
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
