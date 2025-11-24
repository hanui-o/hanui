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
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Card,
  Stack,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@hanui/react';

export default function CodePage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Code"
        description="KRDS 준수 인라인 및 블록 코드 컴포넌트입니다. 모노스페이스 폰트로 코드를 명확하게 표시합니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Installation */}
          <Section>
            <SectionHeading
              level="h2"
              id="installation"
              title="설치"
              description="다음 명령어로 Code 컴포넌트를 설치합니다:"
            />

            <Code variant="block" language="bash" showLineNumbers={false}>
              npx @hanui/cli add code
            </Code>
          </Section>

          {/* What is it */}
          <Section>
            <SectionHeading
              level="h2"
              id="what-is-it"
              title="무엇인가요?"
              description="Code는 인라인 코드와 블록 코드를 표시하기 위한 컴포넌트입니다."
            />

            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>Inline/Block 지원:</strong> 인라인 코드와 코드 블록
                  모두 지원합니다.
                </ListItem>
                <ListItem>
                  <strong>크기 옵션:</strong> sm, default, lg 3가지 크기를
                  제공합니다.
                </ListItem>
                <ListItem>
                  <strong>KRDS 색상:</strong> KRDS 디자인 시스템의 색상을
                  준수합니다.
                </ListItem>
                <ListItem>
                  <strong>모노스페이스 폰트:</strong> 코드 가독성을 위한 고정폭
                  폰트를 사용합니다.
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* Usage */}
          <Section>
            <SectionHeading level="h2" id="usage" title="사용 방법" />

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                title="Inline Code"
                description="텍스트 안에 코드를 표시할 때 사용합니다:"
              />

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`// UI components - from @hanui/react
import {
  Code   PageNavigation,
  
} from '@hanui/react';

<Body>
  파일을 저장하려면 <Code>Ctrl+S</Code>를 누르세요.
</Body>`}
              </Code>

              <Card variant="outlined" className="mt-3">
                <Body>
                  파일을 저장하려면 <Code>Ctrl+S</Code>를 누르세요.
                </Body>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Size 옵션">
                <Body className="leading-relaxed">
                  <Code>size</Code> prop으로 크기를 조절할 수 있습니다:
                </Body>
              </SectionHeading>

              <Stack gap="md">
                <div>
                  <Code variant="block" language="tsx" showLineNumbers={false}>
                    {`<Code size="sm">npm install</Code>`}
                  </Code>
                  <Card variant="outlined" className="mt-3">
                    <Body>
                      작은 크기: <Code size="sm">npm install</Code>
                    </Body>
                  </Card>
                </div>

                <div>
                  <Code variant="block" language="tsx" showLineNumbers={false}>
                    {`<Code>npm install</Code>`}
                  </Code>
                  <Card variant="outlined" className="mt-3">
                    <Body>
                      기본 크기: <Code>npm install</Code>
                    </Body>
                  </Card>
                </div>

                <div>
                  <Code variant="block" language="tsx" showLineNumbers={false}>
                    {`<Code size="lg">npm install</Code>`}
                  </Code>
                  <Card variant="outlined" className="mt-3">
                    <Body>
                      큰 크기: <Code size="lg">npm install</Code>
                    </Body>
                  </Card>
                </div>
              </Stack>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Block Code">
                <Body className="leading-relaxed">
                  <Code>variant="block"</Code>으로 코드 블록을 만들 수 있습니다:
                </Body>
              </SectionHeading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Code variant="block">
  {\`function hello() {
    console.log("Hello, World!");
  }\`}
</Code>`}
              </Code>

              <Card variant="outlined" className="mt-3">
                {`function hello() {
  console.log("Hello, World!");
}`}
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="실제 사용 예시">
                <Body className="leading-relaxed">
                  문서에서 코드를 설명할 때 활용할 수 있습니다:
                </Body>
              </SectionHeading>

              <Card variant="outlined" className="space-y-3">
                <Body>
                  React에서 상태를 관리하려면 <Code>useState</Code> 훅을
                  사용하세요.
                </Body>
                <Body>
                  컴포넌트를 import할 때는{' '}
                  <Code>import &#123; Button &#125; from '@hanui/react'</Code>{' '}
                  형식을 사용합니다.
                </Body>
                <Body>
                  환경 변수는 <Code>process.env.NODE_ENV</Code>로 접근할 수
                  있습니다.
                </Body>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="커스텀 스타일링">
                <Body className="leading-relaxed">
                  <Code>className</Code>을 사용하여 커스텀 스타일을 적용할 수
                  있습니다:
                </Body>
              </SectionHeading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Code className="text-krds-primary-text bg-krds-primary-surface">
  primary color code
</Code>`}
              </Code>

              <Card variant="outlined" className="mt-3">
                <Body>
                  Primary 색상:{' '}
                  <Code className="text-krds-primary-text bg-krds-primary-surface">
                    primary color code
                  </Code>
                </Body>
              </Card>
            </Subsection>
          </Section>

          {/* Best Practices */}
          <Section>
            <SectionHeading
              level="h2"
              id="best-practices"
              title="Best Practices"
            />

            <List>
              <ListItem>
                <strong>인라인 코드</strong>는 짧은 명령어, 변수명, 파일명 등에
                사용하세요.
              </ListItem>
              <ListItem>
                <strong>블록 코드</strong>는 여러 줄의 코드 예제에 사용하세요.
              </ListItem>
              <ListItem>
                구문 강조가 필요한 경우 별도의 <Code>CodeBlock</Code> 컴포넌트를
                사용하세요.
              </ListItem>
              <ListItem>
                과도한 인라인 코드 사용은 가독성을 해칠 수 있으니 적절히
                사용하세요.
              </ListItem>
            </List>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          {/* API Reference */}
          <Section>
            <SectionHeading level="h2" id="api" title="API Reference" />

            <Subsection level="h3">
              <SectionHeading level="h3" title="Code Props" />

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
                    <TableCell className="font-mono">variant</TableCell>
                    <TableCell className="font-mono">
                      &apos;inline&apos; | &apos;block&apos;
                    </TableCell>
                    <TableCell className="font-mono">
                      &apos;inline&apos;
                    </TableCell>
                    <TableCell>코드 표시 방식</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">size</TableCell>
                    <TableCell className="font-mono">
                      &apos;sm&apos; | &apos;default&apos; | &apos;lg&apos;
                    </TableCell>
                    <TableCell className="font-mono">
                      &apos;default&apos;
                    </TableCell>
                    <TableCell>크기 (inline만 적용)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Card', href: '/components/card' }}
        next={{ title: 'Container', href: '/components/container' }}
      />
    </>
  );
}
