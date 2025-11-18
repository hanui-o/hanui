import { Body } from '@hanui/react';
import {
  Section,
  SectionHeading,
  Subsection,
} from '@/components/hanui/section';
import { List, ListItem } from '@/components/hanui/list';
import { Code } from '@/components/hanui/code';

export default function CodePage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Code"
        description="KRDS 준수 인라인 및 블록 코드 컴포넌트입니다. 모노스페이스 폰트로 코드를 명확하게 표시합니다."
      />

      {/* Installation */}
      <Section level="h2">
        <SectionHeading level="h2" id="installation" title="설치">
          <Body className="leading-relaxed">
            다음 명령어로 Code 컴포넌트를 설치합니다:
          </Body>
        </SectionHeading>

        <div className="bg-krds-gray-5 rounded-lg p-4 border border-krds-gray-20">
          <code className="text-sm">npx @hanui/cli add code</code>
        </div>
      </Section>

      {/* What is it */}
      <Section level="h2">
        <SectionHeading
          level="h2"
          id="what-is-it"
          title="무엇인가요?"
          description="Code는 인라인 코드와 블록 코드를 표시하기 위한 컴포넌트입니다."
        />

        <div className="bg-krds-gray-5 rounded-lg p-6 border border-krds-gray-20">
          <List variant="check" className="text-krds-gray-90">
            <ListItem>
              <div>
                <strong>Inline/Block 지원:</strong> 인라인 코드와 코드 블록 모두
                지원합니다.
              </div>
            </ListItem>
            <ListItem>
              <div>
                <strong>크기 옵션:</strong> sm, default, lg 3가지 크기를
                제공합니다.
              </div>
            </ListItem>
            <ListItem>
              <div>
                <strong>KRDS 색상:</strong> KRDS 디자인 시스템의 색상을
                준수합니다.
              </div>
            </ListItem>
            <ListItem>
              <div>
                <strong>모노스페이스 폰트:</strong> 코드 가독성을 위한 고정폭
                폰트를 사용합니다.
              </div>
            </ListItem>
          </List>
        </div>
      </Section>

      {/* Usage */}
      <Section level="h2">
        <SectionHeading level="h2" id="usage" title="사용 방법" />

        <Subsection level="h3">
          <SectionHeading level="h3" title="Inline Code">
            <Body className="leading-relaxed">
              텍스트 안에 코드를 표시할 때 사용합니다:
            </Body>
          </SectionHeading>

          <div className="bg-krds-gray-5 rounded-lg p-4 border border-krds-gray-20 mb-4">
            <pre className="overflow-x-auto">
              <code>{`import { Code } from '@/components/hanui/code';

<Body>
  파일을 저장하려면 <Code>Ctrl+S</Code>를 누르세요.
</Body>`}</code>
            </pre>
          </div>

          <div className="p-6 border border-krds-gray-20 rounded-lg">
            <Body>
              파일을 저장하려면 <Code>Ctrl+S</Code>를 누르세요.
            </Body>
          </div>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="Size 옵션">
            <Body className="leading-relaxed">
              <Code>size</Code> prop으로 크기를 조절할 수 있습니다:
            </Body>
          </SectionHeading>

          <div className="space-y-4">
            <div className="p-6 border border-krds-gray-20 rounded-lg">
              <Body className="mb-2 font-medium">Small</Body>
              <Body>
                작은 크기: <Code size="sm">npm install</Code>
              </Body>
            </div>

            <div className="p-6 border border-krds-gray-20 rounded-lg">
              <Body className="mb-2 font-medium">Default</Body>
              <Body>
                기본 크기: <Code>npm install</Code>
              </Body>
            </div>

            <div className="p-6 border border-krds-gray-20 rounded-lg">
              <Body className="mb-2 font-medium">Large</Body>
              <Body>
                큰 크기: <Code size="lg">npm install</Code>
              </Body>
            </div>
          </div>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="Block Code">
            <Body className="leading-relaxed">
              <Code>variant="block"</Code>으로 코드 블록을 만들 수 있습니다:
            </Body>
          </SectionHeading>

          <div className="bg-krds-gray-5 rounded-lg p-4 border border-krds-gray-20 mb-4">
            <pre className="overflow-x-auto">
              <code>{`<Code variant="block">
  {\`function hello() {
    console.log("Hello, World!");
  }\`}
</Code>`}</code>
            </pre>
          </div>

          <div className="p-6 border border-krds-gray-20 rounded-lg">
            <Code variant="block">
              {`function hello() {
  console.log("Hello, World!");
}`}
            </Code>
          </div>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="실제 사용 예시">
            <Body className="leading-relaxed">
              문서에서 코드를 설명할 때 활용할 수 있습니다:
            </Body>
          </SectionHeading>

          <div className="p-6 border border-krds-gray-20 rounded-lg space-y-3">
            <Body>
              React에서 상태를 관리하려면 <Code>useState</Code> 훅을 사용하세요.
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
          </div>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="커스텀 스타일링">
            <Body className="leading-relaxed">
              <Code>className</Code>을 사용하여 커스텀 스타일을 적용할 수
              있습니다:
            </Body>
          </SectionHeading>

          <div className="bg-krds-gray-5 rounded-lg p-4 border border-krds-gray-20 mb-4">
            <pre className="overflow-x-auto">
              <code>{`<Code className="text-krds-primary-text bg-krds-primary-surface">
  primary color code
</Code>`}</code>
            </pre>
          </div>

          <div className="p-6 border border-krds-gray-20 rounded-lg">
            <Body>
              Primary 색상:{' '}
              <Code className="text-krds-primary-text bg-krds-primary-surface">
                primary color code
              </Code>
            </Body>
          </div>
        </Subsection>
      </Section>

      {/* API Reference */}
      <Section level="h2">
        <SectionHeading level="h2" id="api" title="API Reference" />

        <Subsection level="h3">
          <SectionHeading level="h3" title="Code Props" />

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-krds-gray-5">
                  <th className="px-4 py-2 text-left border-b border-krds-gray-20">
                    Prop
                  </th>
                  <th className="px-4 py-2 text-left border-b border-krds-gray-20">
                    Type
                  </th>
                  <th className="px-4 py-2 text-left border-b border-krds-gray-20">
                    Default
                  </th>
                  <th className="px-4 py-2 text-left border-b border-krds-gray-20">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono">
                    variant
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono">
                    &apos;inline&apos; | &apos;block&apos;
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono">
                    &apos;inline&apos;
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20">
                    코드 표시 방식
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono">
                    size
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono">
                    &apos;sm&apos; | &apos;default&apos; | &apos;lg&apos;
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono">
                    &apos;default&apos;
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20">
                    크기 (inline만 적용)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>

      {/* Best Practices */}
      <Section level="h2">
        <SectionHeading level="h2" id="best-practices" title="Best Practices" />

        <List>
          <ListItem>
            <Body>
              <strong>인라인 코드</strong>는 짧은 명령어, 변수명, 파일명 등에
              사용하세요.
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              <strong>블록 코드</strong>는 여러 줄의 코드 예제에 사용하세요.
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              구문 강조가 필요한 경우 별도의 <Code>CodeBlock</Code> 컴포넌트를
              사용하세요.
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              과도한 인라인 코드 사용은 가독성을 해칠 수 있으니 적절히
              사용하세요.
            </Body>
          </ListItem>
        </List>
      </Section>
    </>
  );
}
