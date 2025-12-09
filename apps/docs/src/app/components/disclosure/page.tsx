'use client';

import { useState } from 'react';

// Docs layout
import { PageSection as Section, Heading } from '@/components/content';

// Docs helper
import { PreviewBox } from '@/components/helpers';

// UI Components
import {
  Disclosure,
  Body,
  Stack,
  Code,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@hanui/react';

// ============================================================================
// 코드 예제
// ============================================================================

const installCode = `npm install @hanui/react`;

const importCode = `import { Disclosure } from '@/components/hanui/disclosure';`;

const basicUsageCode = `<Disclosure trigger="자세히 보기">
  이 정보는 부가적인 설명을 제공합니다.
  기본적으로 축소된 상태로 표시되며,
  사용자가 클릭하면 확장됩니다.
</Disclosure>`;

const variantsCode = `// Default - 기본 스타일
<Disclosure trigger="자세히 보기" variant="default">
  기본 스타일의 디스클로저입니다.
</Disclosure>

// Bordered - 테두리 스타일
<Disclosure trigger="자세히 보기" variant="bordered">
  테두리가 있는 디스클로저입니다.
</Disclosure>

// Ghost - 투명 스타일
<Disclosure trigger="자세히 보기" variant="ghost">
  투명 스타일의 디스클로저입니다.
</Disclosure>`;

const defaultOpenCode = `<Disclosure trigger="이미 열린 정보" defaultOpen>
  기본적으로 열려 있는 상태로 시작합니다.
</Disclosure>`;

const controlledCode = `const [isOpen, setIsOpen] = useState(false);

<Disclosure
  trigger="제어 모드"
  open={isOpen}
  onOpenChange={setIsOpen}
>
  외부에서 상태를 제어할 수 있습니다.
</Disclosure>

<button onClick={() => setIsOpen(!isOpen)}>
  {isOpen ? '닫기' : '열기'}
</button>`;

// ============================================================================
// 페이지 컴포넌트
// ============================================================================

export default function DisclosurePage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 헤더 */}
      <Heading
        level="h1"
        title="Disclosure"
        description="부가적인 정보를 표시하거나 숨기는 데 사용하는 컴포넌트입니다."
        links={[
          {
            label: 'KRDS 디스클로저',
            href: 'https://www.krds.go.kr/html/site/component/component_04_04.html',
          },
        ]}
      />

      {/* 개요 */}
      <Section>
        <Heading level="h2" title="개요" id="overview" />
        <Body>
          디스클로저(Disclosure)는 특정 정보나 섹션과 관련된 부가적인 정보를
          표시하거나 숨기는 데 사용됩니다. 기본적으로 축소된 상태로 제공되어
          사용자의 인지적 부담을 줄이고, 필요한 경우에만 확장하여 상세 정보를
          확인할 수 있습니다.
        </Body>
        <PreviewBox>
          <Disclosure trigger="참고 사항 보기">
            이 정보는 추가적인 설명을 제공합니다. 디스클로저는 아코디언과 달리
            단독으로 사용되며, 부가적인 정보를 제공하는 데 적합합니다.
          </Disclosure>
        </PreviewBox>
      </Section>

      {/* 설치 */}
      <Section>
        <Heading level="h2" title="설치" id="installation" />
        <Code variant="block" language="bash" showLineNumbers={false}>
          {installCode}
        </Code>
      </Section>

      {/* Import */}
      <Section>
        <Heading level="h2" title="Import" id="import" />
        <Code variant="block" language="typescript" showLineNumbers={false}>
          {importCode}
        </Code>
      </Section>

      {/* 기본 사용법 */}
      <Section>
        <Heading level="h2" title="기본 사용법" id="basic-usage" />
        <Body>
          trigger와 children을 전달하여 기본 디스클로저를 렌더링합니다.
        </Body>
        <PreviewBox>
          <Disclosure trigger="자세히 보기">
            이 정보는 부가적인 설명을 제공합니다. 기본적으로 축소된 상태로
            표시되며, 사용자가 클릭하면 확장됩니다.
          </Disclosure>
        </PreviewBox>
        <Code variant="block" language="tsx" showLineNumbers={false}>
          {basicUsageCode}
        </Code>
      </Section>

      {/* 변형 */}
      <Section>
        <Heading level="h2" title="변형 (Variants)" id="variants" />
        <Body>세 가지 스타일 변형을 지원합니다.</Body>
        <PreviewBox>
          <Stack gap="lg">
            <div>
              <Body className="text-sm text-krds-gray-60 mb-2">Default</Body>
              <Disclosure trigger="자세히 보기" variant="default">
                기본 스타일의 디스클로저입니다. 파란색 링크 스타일로 표시됩니다.
              </Disclosure>
            </div>
            <div>
              <Body className="text-sm text-krds-gray-60 mb-2">Bordered</Body>
              <Disclosure trigger="자세히 보기" variant="bordered">
                테두리가 있는 디스클로저입니다. 카드 형태로 표시됩니다.
              </Disclosure>
            </div>
            <div>
              <Body className="text-sm text-krds-gray-60 mb-2">Ghost</Body>
              <Disclosure trigger="자세히 보기" variant="ghost">
                투명 스타일의 디스클로저입니다. 회색 텍스트로 표시됩니다.
              </Disclosure>
            </div>
          </Stack>
        </PreviewBox>
        <Code variant="block" language="tsx" showLineNumbers={false}>
          {variantsCode}
        </Code>
      </Section>

      {/* 기본 열림 */}
      <Section>
        <Heading level="h2" title="기본 열림 상태" id="default-open" />
        <Body>
          defaultOpen 속성을 사용하여 기본적으로 열린 상태로 렌더링할 수
          있습니다. (KRDS 가이드라인에서는 권장하지 않습니다)
        </Body>
        <PreviewBox>
          <Disclosure trigger="이미 열린 정보" defaultOpen>
            기본적으로 열려 있는 상태로 시작합니다. 일반적으로 디스클로저는
            축소된 상태로 제공하는 것이 권장되지만, 특수한 경우에 사용할 수
            있습니다.
          </Disclosure>
        </PreviewBox>
        <Code variant="block" language="tsx" showLineNumbers={false}>
          {defaultOpenCode}
        </Code>
      </Section>

      {/* 제어 모드 */}
      <Section>
        <Heading level="h2" title="제어 모드" id="controlled" />
        <Body>
          open과 onOpenChange를 사용하여 외부에서 상태를 제어할 수 있습니다.
        </Body>
        <PreviewBox>
          <Stack gap="md">
            <Disclosure
              trigger="제어 모드"
              open={isOpen}
              onOpenChange={setIsOpen}
            >
              외부에서 상태를 제어할 수 있습니다. 외부 버튼을 클릭하여 열고 닫을
              수 있습니다.
            </Disclosure>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-4 py-2 text-sm bg-krds-primary-base text-white rounded hover:bg-krds-primary-60"
            >
              {isOpen ? '닫기' : '열기'}
            </button>
          </Stack>
        </PreviewBox>
        <Code variant="block" language="tsx" showLineNumbers={false}>
          {controlledCode}
        </Code>
      </Section>

      {/* Accordion과의 차이점 */}
      <Section>
        <Heading level="h2" title="Accordion과의 차이점" id="vs-accordion" />
        <Body>Disclosure와 Accordion은 비슷해 보이지만 용도가 다릅니다:</Body>
        <ul className="list-disc pl-6 space-y-2 text-krds-gray-80">
          <li>
            <strong>Disclosure</strong>: 단독으로 사용되며, 부가적인 정보를
            제공하는 데 적합. 여러 개를 동시에 열 수 있음
          </li>
          <li>
            <strong>Accordion</strong>: 여러 섹션을 그룹화하여 하나만 열리도록
            관리. 주요 콘텐츠를 분류하는 데 적합
          </li>
        </ul>
      </Section>

      {/* 사용 가이드라인 */}
      <Section>
        <Heading level="h2" title="사용 가이드라인" id="guidelines" />
        <Body>KRDS 가이드라인에 따른 권장 사항:</Body>
        <ul className="list-disc pl-6 space-y-2 text-krds-gray-80">
          <li>부가적인 정보를 제공하는 데 사용</li>
          <li>기본적으로 축소된 상태로 제공</li>
          <li>관련 정보/컨트롤 아래에 배치</li>
          <li>가능한 한 하나의 섹션에 하나의 디스클로저만 사용</li>
          <li>여러 개 연속 배치 시 복잡성 증가에 주의</li>
        </ul>
      </Section>

      {/* 접근성 */}
      <Section>
        <Heading level="h2" title="접근성" id="accessibility" />
        <Body>Disclosure는 다음과 같은 접근성 기능을 제공합니다:</Body>
        <ul className="list-disc pl-6 space-y-2 text-krds-gray-80">
          <li>
            <code>&lt;button&gt;</code> 요소로 트리거 구현
          </li>
          <li>
            <code>aria-expanded</code> 속성으로 확장/축소 상태 전달
          </li>
          <li>
            <code>aria-controls</code>로 트리거와 콘텐츠 영역 연결
          </li>
          <li>
            콘텐츠 영역에 <code>role=&quot;region&quot;</code> 적용
          </li>
          <li>키보드 포커스 스타일 제공</li>
        </ul>
      </Section>

      {/* API Reference */}
      <Section>
        <Heading level="h2" title="API Reference" id="api" />
        <Table small>
          <TableHeader>
            <TableRow>
              <TableHead>속성</TableHead>
              <TableHead>타입</TableHead>
              <TableHead>기본값</TableHead>
              <TableHead>설명</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Code>trigger</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">React.ReactNode</Code>
              </TableCell>
              <TableCell>필수</TableCell>
              <TableCell>트리거 버튼에 표시할 텍스트 또는 요소</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>children</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">React.ReactNode</Code>
              </TableCell>
              <TableCell>필수</TableCell>
              <TableCell>확장 시 표시할 콘텐츠</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>variant</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">
                  &quot;default&quot; | &quot;bordered&quot; | &quot;ghost&quot;
                </Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">&quot;default&quot;</Code>
              </TableCell>
              <TableCell>디스클로저 스타일 변형</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>defaultOpen</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">boolean</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">false</Code>
              </TableCell>
              <TableCell>기본 열림 상태 (비제어 모드)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>open</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">boolean</Code>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>열림 상태 (제어 모드)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>onOpenChange</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">(open: boolean) =&gt; void</Code>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>열림 상태 변경 시 호출되는 콜백</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Section>
    </>
  );
}
