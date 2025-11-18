import { Body } from '@hanui/react';
import {
  Section,
  SectionHeading,
  Subsection,
} from '@/components/hanui/section';
import { List, ListItem } from '@/components/hanui/list';
import { Code } from '@/components/hanui/code';

export default function ListPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="List"
        description="KRDS 준수 리스트 컴포넌트입니다. Unordered와 Ordered 리스트를 지원하며, 다양한 간격 옵션을 제공합니다."
      />

      {/* Installation */}
      <Section level="h2">
        <SectionHeading level="h2" id="installation" title="설치">
          <Body className="leading-relaxed">
            다음 명령어로 List 컴포넌트를 설치합니다:
          </Body>
        </SectionHeading>

        <div className="bg-krds-gray-5 rounded-lg p-4 border border-krds-gray-20">
          <code className="text-sm">npx @hanui/cli add list</code>
        </div>
      </Section>

      {/* What is it */}
      <Section level="h2">
        <SectionHeading
          level="h2"
          id="what-is-it"
          title="무엇인가요?"
          description="List는 항목들을 깔끔하게 나열하기 위한 컴포넌트입니다."
        />

        <div className="bg-krds-gray-5 rounded-lg p-6 border border-krds-gray-20">
          <List variant="check" className="text-krds-gray-90">
            <ListItem>
              <div>
                <strong>4가지 Variant:</strong> unordered (•), ordered (1, 2,
                3), dash (−), check (✓) 리스트를 지원합니다.
              </div>
            </ListItem>
            <ListItem>
              <div>
                <strong>간격 옵션:</strong> tight, default, loose 3가지 간격을
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
                <strong>접근성:</strong> 시맨틱 HTML 요소를 사용하여 스크린 리더
                지원이 완벽합니다.
              </div>
            </ListItem>
          </List>
        </div>
      </Section>

      {/* Usage */}
      <Section level="h2">
        <SectionHeading level="h2" id="usage" title="사용 방법" />

        <Subsection level="h3">
          <SectionHeading level="h3" title="기본 사용">
            <Body className="leading-relaxed">
              <Code>List</Code>와 <Code>ListItem</Code>을 조합하여 사용합니다:
            </Body>
          </SectionHeading>

          <div className="bg-krds-gray-5 rounded-lg p-4 border border-krds-gray-20 mb-4">
            <pre className="overflow-x-auto">
              <code>{`import { List, ListItem } from '@/components/hanui/list';

<List>
  <ListItem>첫 번째 항목</ListItem>
  <ListItem>두 번째 항목</ListItem>
  <ListItem>세 번째 항목</ListItem>
</List>`}</code>
            </pre>
          </div>

          <div className="p-6 border border-krds-gray-20 rounded-lg">
            <List>
              <ListItem>첫 번째 항목</ListItem>
              <ListItem>두 번째 항목</ListItem>
              <ListItem>세 번째 항목</ListItem>
            </List>
          </div>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="Ordered List">
            <Body className="leading-relaxed">
              <Code>variant="ordered"</Code>로 번호 리스트를 만들 수 있습니다:
            </Body>
          </SectionHeading>

          <div className="bg-krds-gray-5 rounded-lg p-4 border border-krds-gray-20 mb-4">
            <pre className="overflow-x-auto">
              <code>{`<List variant="ordered">
  <ListItem>단계 1</ListItem>
  <ListItem>단계 2</ListItem>
  <ListItem>단계 3</ListItem>
</List>`}</code>
            </pre>
          </div>

          <div className="p-6 border border-krds-gray-20 rounded-lg">
            <List variant="ordered">
              <ListItem>단계 1</ListItem>
              <ListItem>단계 2</ListItem>
              <ListItem>단계 3</ListItem>
            </List>
          </div>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="Dash List">
            <Body className="leading-relaxed">
              <Code>variant="dash"</Code>로 대시(−) 리스트를 만들 수 있습니다:
            </Body>
          </SectionHeading>

          <div className="bg-krds-gray-5 rounded-lg p-4 border border-krds-gray-20 mb-4">
            <pre className="overflow-x-auto">
              <code>{`<List variant="dash">
  <ListItem>대시 항목 1</ListItem>
  <ListItem>대시 항목 2</ListItem>
  <ListItem>대시 항목 3</ListItem>
</List>`}</code>
            </pre>
          </div>

          <div className="p-6 border border-krds-gray-20 rounded-lg">
            <List variant="dash">
              <ListItem>대시 항목 1</ListItem>
              <ListItem>대시 항목 2</ListItem>
              <ListItem>대시 항목 3</ListItem>
            </List>
          </div>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="Check List">
            <Body className="leading-relaxed">
              <Code>variant="check"</Code>로 체크(✓) 리스트를 만들 수 있습니다:
            </Body>
          </SectionHeading>

          <div className="bg-krds-gray-5 rounded-lg p-4 border border-krds-gray-20 mb-4">
            <pre className="overflow-x-auto">
              <code>{`<List variant="check">
  <ListItem>완료된 항목 1</ListItem>
  <ListItem>완료된 항목 2</ListItem>
  <ListItem>완료된 항목 3</ListItem>
</List>`}</code>
            </pre>
          </div>

          <div className="p-6 border border-krds-gray-20 rounded-lg">
            <List variant="check">
              <ListItem>완료된 항목 1</ListItem>
              <ListItem>완료된 항목 2</ListItem>
              <ListItem>완료된 항목 3</ListItem>
            </List>
          </div>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="Spacing 옵션">
            <Body className="leading-relaxed">
              <Code>spacing</Code> prop으로 항목 간 간격을 조절할 수 있습니다:
            </Body>
          </SectionHeading>

          <div className="space-y-6">
            <div>
              <Body className="font-medium mb-2">Tight (space-y-1)</Body>
              <div className="p-6 border border-krds-gray-20 rounded-lg">
                <List spacing="tight">
                  <ListItem>항목 1</ListItem>
                  <ListItem>항목 2</ListItem>
                  <ListItem>항목 3</ListItem>
                </List>
              </div>
            </div>

            <div>
              <Body className="font-medium mb-2">Default (space-y-3)</Body>
              <div className="p-6 border border-krds-gray-20 rounded-lg">
                <List spacing="default">
                  <ListItem>항목 1</ListItem>
                  <ListItem>항목 2</ListItem>
                  <ListItem>항목 3</ListItem>
                </List>
              </div>
            </div>

            <div>
              <Body className="font-medium mb-2">Loose (space-y-4)</Body>
              <div className="p-6 border border-krds-gray-20 rounded-lg">
                <List spacing="loose">
                  <ListItem>항목 1</ListItem>
                  <ListItem>항목 2</ListItem>
                  <ListItem>항목 3</ListItem>
                </List>
              </div>
            </div>
          </div>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="커스텀 Indicator">
            <Body className="leading-relaxed">
              <Code>showIndicator=false</Code>로 기본 불릿을 숨기고 커스텀
              아이콘을 사용할 수 있습니다:
            </Body>
          </SectionHeading>

          <div className="bg-krds-gray-5 rounded-lg p-4 border border-krds-gray-20 mb-4">
            <pre className="overflow-x-auto">
              <code>{`<List>
  <ListItem showIndicator={false}>
    <span className="text-green-600">✓</span>
    <span>완료된 항목</span>
  </ListItem>
  <ListItem showIndicator={false}>
    <span className="text-yellow-600">⚠</span>
    <span>경고 항목</span>
  </ListItem>
</List>`}</code>
            </pre>
          </div>

          <div className="p-6 border border-krds-gray-20 rounded-lg">
            <List>
              <ListItem showIndicator={false}>
                <span className="text-green-600 font-bold">✓</span>
                <span>완료된 항목</span>
              </ListItem>
              <ListItem showIndicator={false}>
                <span className="text-yellow-600 font-bold">⚠</span>
                <span>경고 항목</span>
              </ListItem>
              <ListItem showIndicator={false}>
                <span className="text-red-600 font-bold">✗</span>
                <span>에러 항목</span>
              </ListItem>
            </List>
          </div>
        </Subsection>
      </Section>

      {/* API Reference */}
      <Section level="h2">
        <SectionHeading level="h2" id="api" title="API Reference" />

        <Subsection level="h3">
          <SectionHeading level="h3" title="List Props" />

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
                    &apos;unordered&apos; | &apos;ordered&apos; |
                    &apos;dash&apos; | &apos;check&apos;
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono">
                    &apos;unordered&apos;
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20">
                    리스트 타입
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono">
                    spacing
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono">
                    &apos;tight&apos; | &apos;default&apos; | &apos;loose&apos;
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono">
                    &apos;default&apos;
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20">
                    항목 간 간격
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="ListItem Props" />

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
                    showIndicator
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono">
                    boolean
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono">
                    true
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20">
                    불릿/번호 표시 여부
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>
    </>
  );
}
