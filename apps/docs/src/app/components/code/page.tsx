'use client';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';
import { ComponentPreview } from '@/components/content/ComponentPreview';

// UI components - from @hanui/react
import {
  Code,
  Body,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@hanui/react';

export default function CodePage() {
  return (
    <>
      <Heading
        level="h1"
        title="Code"
        description="인라인 및 블록 코드를 표시하는 컴포넌트"
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview">
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />
            <ComponentPreview>
              <div className="flex flex-col gap-4">
                <Body>
                  파일을 저장하려면 <Code>Ctrl+S</Code>를 누르세요.
                </Body>
                <Code variant="block" language="typescript">
                  {`function hello() {
  console.log("Hello, World!");
}`}
                </Code>
              </div>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<Body>
  파일을 저장하려면 <Code>Ctrl+S</Code>를 누르세요.
</Body>

<Code variant="block" language="typescript">
  {\`function hello() {
    console.log("Hello, World!");
  }\`}
</Code>`}
            </Code>
          </Section>

          <Section level="h2">
            <Installation componentName="code" />
          </Section>

          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { Code } from '@/components/hanui/code'

// Inline code
<Code>npm install</Code>

// Block code
<Code variant="block">
  npm install @hanui/react
</Code>

// With syntax highlighting
<Code variant="block" language="typescript">
  const hello = 'world';
</Code>`}
            </Code>
          </Section>

          {/* 예제 섹션 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading level="h3" title="Inline Code" />
              <ComponentPreview>
                <div className="flex flex-col gap-3">
                  <Body>
                    React에서 상태를 관리하려면 <Code>useState</Code> 훅을
                    사용하세요.
                  </Body>
                  <Body>
                    환경 변수는 <Code>process.env.NODE_ENV</Code>로 접근할 수
                    있습니다.
                  </Body>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Body>
  React에서 상태를 관리하려면 <Code>useState</Code> 훅을 사용하세요.
</Body>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Size" />
              <ComponentPreview>
                <div className="flex flex-col gap-3">
                  <Body>
                    작은 크기: <Code size="sm">npm install</Code>
                  </Body>
                  <Body>
                    기본 크기: <Code>npm install</Code>
                  </Body>
                  <Body>
                    큰 크기: <Code size="lg">npm install</Code>
                  </Body>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Code size="sm">npm install</Code>
<Code>npm install</Code>
<Code size="lg">npm install</Code>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Block Code (Simple)" />
              <ComponentPreview>
                <Code variant="block">
                  {`npm install @hanui/react
npm run dev`}
                </Code>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Code variant="block">
  {\`npm install @hanui/react
npm run dev\`}
</Code>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="With Syntax Highlighting" />
              <ComponentPreview>
                <Code variant="block" language="typescript">
                  {`function greet(name: string) {
  return \`Hello, \${name}!\`;
}

const message = greet('World');
console.log(message);`}
                </Code>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Code variant="block" language="typescript">
  {\`function greet(name: string) {
    return \\\`Hello, \\\${name}!\\\`;
  }

  const message = greet('World');
  console.log(message);\`}
</Code>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="With Filename" />
              <ComponentPreview>
                <Code
                  variant="block"
                  language="typescript"
                  fileName="example.ts"
                >
                  {`export function add(a: number, b: number) {
  return a + b;
}`}
                </Code>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Code
  variant="block"
  language="typescript"
  fileName="example.ts"
>
  {\`export function add(a: number, b: number) {
    return a + b;
  }\`}
</Code>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Without Line Numbers" />
              <ComponentPreview>
                <Code variant="block" language="bash" showLineNumbers={false}>
                  npx hanui add code
                </Code>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Code
  variant="block"
  language="bash"
  showLineNumbers={false}
>
  npx hanui add code
</Code>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Custom Styling" />
              <ComponentPreview>
                <Body>
                  Primary 색상:{' '}
                  <Code className="text-krds-primary-base bg-krds-primary-5 border-krds-primary-20">
                    primary code
                  </Code>
                </Body>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Code className="text-krds-primary-base bg-krds-primary-5 border-krds-primary-20">
  primary code
</Code>`}
              </Code>
            </Subsection>
          </Section>
        </TabsContent>

        {/* API 레퍼런스 탭 */}
        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API Reference" />

            <Subsection level="h3">
              <Heading level="h3" title="Code Props" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>variant</Code>
                    </TableCell>
                    <TableCell>
                      <Code>&apos;inline&apos; | &apos;block&apos;</Code>
                    </TableCell>
                    <TableCell>
                      <Code>&apos;inline&apos;</Code>
                    </TableCell>
                    <TableCell>코드 표시 방식</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>size</Code>
                    </TableCell>
                    <TableCell>
                      <Code>
                        &apos;sm&apos; | &apos;default&apos; | &apos;lg&apos;
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code>&apos;default&apos;</Code>
                    </TableCell>
                    <TableCell>크기 (inline만 적용)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>language</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>
                      <Code>undefined</Code>
                    </TableCell>
                    <TableCell>
                      프로그래밍 언어 (block variant에서 syntax highlighting
                      활성화)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>showLineNumbers</Code>
                    </TableCell>
                    <TableCell>
                      <Code>boolean</Code>
                    </TableCell>
                    <TableCell>
                      <Code>true</Code>
                    </TableCell>
                    <TableCell>
                      줄 번호 표시 여부 (block with language만 적용)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>fileName</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>
                      <Code>undefined</Code>
                    </TableCell>
                    <TableCell>
                      파일명 표시 (block with language만 적용)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>theme</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>
                      <Code>&apos;github-dark&apos;</Code>
                    </TableCell>
                    <TableCell>
                      Shiki 테마 (block with language만 적용)
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Checkbox', href: '/components/checkbox' }}
        next={{ title: 'Container', href: '/components/container' }}
      />
    </>
  );
}
