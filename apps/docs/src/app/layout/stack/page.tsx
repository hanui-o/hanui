'use client';

import { Heading, Body } from '@hanui/react';

import { Stack, VStack, HStack } from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';
import { Installation } from '@/components/content/Installation';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

export default function StackPage() {
  return (
    <>
      <PageHeader
        title="Stack, VStack, HStack"
        description="KRDS 간격 시스템을 준수하는 유연한 레이아웃 컴포넌트. 수직(VStack), 수평(HStack) 스택을 제공합니다."
      />

      <PageSection>
        <ComponentPreview>
          <div className="w-full">
            <Stack spacing="md">
              <div className="bg-krds-primary-surface p-4 rounded">
                첫 번째 아이템
              </div>
              <div className="bg-krds-primary-surface p-4 rounded">
                두 번째 아이템
              </div>
              <div className="bg-krds-primary-surface p-4 rounded">
                세 번째 아이템
              </div>
            </Stack>
          </div>
        </ComponentPreview>
      </PageSection>

      {/* Overview */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="overview">
            개요
          </Heading>
          <Body className="text-krds-gray-90 leading-relaxed">
            Stack 계열 컴포넌트는 요소들을 수직 또는 수평으로 정렬하고{' '}
            <strong>KRDS(한국형 웹 콘텐츠 접근성 지침)</strong>의 간격 기준을
            준수하는 레이아웃 컴포넌트입니다.
          </Body>
          <ul className="list-disc list-inside space-y-2 text-krds-gray-90">
            <li>
              <strong>Stack</strong>: 기본 수직 레이아웃 (
              <code>direction="row"</code>로 수평 방향 변경 가능)
            </li>
            <li>
              <strong>VStack</strong>: Stack의 별칭 (항상 수직 방향)
            </li>
            <li>
              <strong>HStack</strong>: 수평 레이아웃 (항상 수평 방향)
            </li>
          </ul>
        </Stack>
      </PageSection>

      {/* Installation */}
      <PageSection>
        <Installation componentName="stack" />
      </PageSection>

      {/* Why Context-Based Spacing */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="why-context-based">
            왜 맥락 기반 간격 시스템인가?
          </Heading>
          <Body>
            KRDS Gap-layout 가이드는 매우 세밀한 간격 체계를 제공합니다 (h1-h2,
            h2-h2, h2-h3, h3-h3, h3-h4, h4-h4, h4-h5, h5-h5, title-body-small,
            title-body-medium, title-body-large 등). 하지만 이 모든 간격을 개별
            컴포넌트로 제공하면 <strong>오히려 사용이 어려워집니다</strong>.
          </Body>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Stack spacing="heading-tight">
            <Heading level="h3">문제점: HTML 구조에 종속</Heading>
            <Body>
              기존 KRDS 간격 이름(h2-h3, h3-h4 등)은 특정 HTML 태그에
              종속되어있어:
            </Body>
            <ul className="list-disc list-inside space-y-2 text-krds-gray-90 ml-4">
              <li>HTML 구조가 바뀌면 spacing도 변경해야 함</li>
              <li>
                같은 관계(제목→내용)여도 태그에 따라 다른 spacing을 찾아야 함
              </li>
              <li>개발자가 12가지 이상의 간격 이름을 외워야 함</li>
              <li>잘못된 spacing을 선택할 가능성이 높음</li>
            </ul>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">해결책: 관계 중심 패턴 발견</Heading>
            <Body>
              KRDS의 모든 간격을 분석한 결과, 실제로는{' '}
              <strong>4가지 관계 패턴</strong>으로 단순화할 수 있습니다:
            </Body>
            <div className="bg-krds-primary-surface p-6 rounded-lg">
              <Stack spacing="content-tight">
                <div>
                  <strong className="text-krds-primary-text">
                    1. Section Level
                  </strong>{' '}
                  - 큰 블록 간 구분 (40px/80px, 32px/64px)
                </div>
                <div>
                  <strong className="text-krds-primary-text">
                    2. Heading-Content
                  </strong>{' '}
                  - 제목과 내용의 긴밀한 관계 (8px/16px ~ 20px/24px)
                </div>
                <div>
                  <strong className="text-krds-primary-text">
                    3. Content Level
                  </strong>{' '}
                  - 동등한 콘텐츠 요소 간격 (12px/16px ~ 24px/40px)
                </div>
                <div>
                  <strong className="text-krds-primary-text">
                    4. Inline/Compact
                  </strong>{' '}
                  - 작은 요소 나열 (4px/8px, 8px/12px)
                </div>
              </Stack>
            </div>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">실무적 이점</Heading>
            <ul className="list-disc list-inside space-y-2 text-krds-gray-90 ml-4">
              <li>
                <strong>배우기 쉬움:</strong> 7개 핵심 이름만 기억 (vs 12개
                이상)
              </li>
              <li>
                <strong>HTML 독립적:</strong> 구조 변경해도 spacing 유지
              </li>
              <li>
                <strong>의미 명확:</strong> 관계로 생각하니 실수가 적음
              </li>
              <li>
                <strong>KRDS 준수:</strong> 실제 간격 값은 모두 KRDS 기준 유지
              </li>
              <li>
                <strong>GS 인증 대비:</strong> KRDS의 의도(관계 기반 간격)를
                정확히 반영하면서도 실용적
              </li>
            </ul>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">하위 호환성</Heading>
            <Body>
              기존 KRDS 이름(h1-h2, h2-h3, title-body-medium 등)도{' '}
              <strong>모두 지원</strong>합니다. 레거시 코드는 그대로 작동하며,
              새 코드에서는 맥락 기반 이름 사용을 권장합니다.
            </Body>
          </Stack>
        </Stack>
      </PageSection>

      {/* Spacing Guide */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="spacing-guide">
            Spacing 선택 가이드
          </Heading>
          <Body>
            요소 간 <strong>관계</strong>에 따라 spacing을 선택하세요. HTML
            태그가 아닌 맥락으로 생각하면 쉽습니다.
          </Body>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Stack spacing="heading-tight">
            <Heading level="h3">
              1. Section Level - 큰 블록 구분 (40px/80px, 32px/64px)
            </Heading>
            <Body>
              주요 섹션을 구분할 때 사용합니다. KRDS의 h2-h2, h3-h3 간격에
              해당합니다.
            </Body>
            <div className="bg-krds-primary-surface p-4 rounded-lg">
              <Stack spacing="compact">
                <div>
                  <code className="text-sm font-mono">spacing="section"</code> →{' '}
                  <strong>40px (Mobile) / 80px (PC)</strong> - KRDS h2-h2 간격
                </div>
                <div>
                  <code className="text-sm font-mono">
                    spacing="section-tight"
                  </code>{' '}
                  → <strong>32px (Mobile) / 64px (PC)</strong> - KRDS h3-h3 간격
                </div>
              </Stack>
            </div>
            <ComponentPreview>
              <div className="w-full">
                <Stack spacing="section" className="w-full">
                  <div className="bg-krds-primary-surface p-6 rounded">
                    <h2 className="font-bold text-lg mb-2">첫 번째 섹션</h2>
                    <p>주요 내용...</p>
                  </div>
                  <div className="bg-krds-primary-surface p-6 rounded">
                    <h2 className="font-bold text-lg mb-2">두 번째 섹션</h2>
                    <p>주요 내용...</p>
                  </div>
                </Stack>
              </div>
            </ComponentPreview>
            <CodeBlock
              code={`<Stack spacing="section">  {/* 40px/80px - h2-h2 간격 */}
  <Section1 />
  <Section2 />
</Stack>

<Stack spacing="section-tight">  {/* 32px/64px - h3-h3 간격 */}
  <SubSection1 />
  <SubSection2 />
</Stack>`}
              language="tsx"
              showLineNumbers={false}
            />
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">
              2. Heading-Content - 제목과 설명 (8px/16px ~ 20px/24px)
            </Heading>
            <Body>
              제목과 바로 아래 설명/내용이 긴밀할 때 사용합니다. KRDS의
              title-body-* 간격에 해당합니다.
            </Body>
            <div className="bg-krds-success-surface p-4 rounded-lg">
              <Stack spacing="compact">
                <div>
                  <code className="text-sm font-mono">
                    spacing="heading-tight"
                  </code>{' '}
                  → <strong>8px (Mobile) / 16px (PC)</strong> - KRDS h2-h3,
                  title-body-small
                </div>
                <div>
                  <code className="text-sm font-mono">
                    spacing="heading-content"
                  </code>{' '}
                  → <strong>12px (Mobile) / 20px (PC)</strong> - KRDS
                  title-body-medium
                </div>
                <div>
                  <code className="text-sm font-mono">
                    spacing="heading-loose"
                  </code>{' '}
                  → <strong>20px (Mobile) / 24px (PC)</strong> - KRDS h1-h2,
                  title-body-large
                </div>
              </Stack>
            </div>
            <ComponentPreview>
              <div className="w-full">
                <Stack spacing="heading-content">
                  <h3 className="font-bold text-lg">제품 소개</h3>
                  <p className="text-krds-gray-70">
                    이 제품은 KRDS 기반으로 설계된 디자인 시스템입니다.
                  </p>
                </Stack>
              </div>
            </ComponentPreview>
            <CodeBlock
              code={`<Stack spacing="heading-tight">  {/* 8px/16px - 제목→매우 가까운 내용 */}
  <Heading>제목</Heading>
  <Body>바로 붙는 설명...</Body>
</Stack>

<Stack spacing="heading-content">  {/* 12px/20px - 제목→설명 (기본) */}
  <Heading>제목</Heading>
  <Body>설명...</Body>
</Stack>

<Stack spacing="heading-loose">  {/* 20px/24px - 제목→여유있는 내용 */}
  <Heading level="h1">메인 제목</Heading>
  <Heading level="h2">서브 제목</Heading>
</Stack>`}
              language="tsx"
              showLineNumbers={false}
            />
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">
              3. Content Level - 같은 레벨 요소 (12px/16px ~ 24px/40px)
            </Heading>
            <Body>
              문단, 카드, 리스트 아이템 등 동등한 요소들 사이에 사용합니다.
              KRDS의 h3-h4, h3-content 간격에 해당합니다.
            </Body>
            <div className="bg-krds-accent-surface p-4 rounded-lg">
              <Stack spacing="compact">
                <div>
                  <code className="text-sm font-mono">
                    spacing="content-tight"
                  </code>{' '}
                  → <strong>12px (Mobile) / 16px (PC)</strong> - 가까운 콘텐츠
                  블록
                </div>
                <div>
                  <code className="text-sm font-mono">spacing="content"</code> →{' '}
                  <strong>16px (Mobile) / 24px (PC)</strong> - KRDS h3-h4, 카드
                  리스트
                </div>
                <div>
                  <code className="text-sm font-mono">
                    spacing="content-loose"
                  </code>{' '}
                  → <strong>24px (Mobile) / 40px (PC)</strong> - KRDS
                  h3-content, 여유있는 콘텐츠
                </div>
              </Stack>
            </div>
            <ComponentPreview>
              <div className="w-full">
                <Stack spacing="content">
                  <div className="bg-krds-accent-surface p-4 rounded">
                    카드 1
                  </div>
                  <div className="bg-krds-accent-surface p-4 rounded">
                    카드 2
                  </div>
                  <div className="bg-krds-accent-surface p-4 rounded">
                    카드 3
                  </div>
                </Stack>
              </div>
            </ComponentPreview>
            <CodeBlock
              code={`<Stack spacing="content-tight">  {/* 12px/16px - 가까운 블록 */}
  <Paragraph>...</Paragraph>
  <Paragraph>...</Paragraph>
</Stack>

<Stack spacing="content">  {/* 16px/24px - 카드, 리스트 (기본) */}
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</Stack>

<Stack spacing="content-loose">  {/* 24px/40px - 여유있는 콘텐츠 */}
  <Article>...</Article>
  <Article>...</Article>
</Stack>`}
              language="tsx"
              showLineNumbers={false}
            />
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">
              4. Inline/Compact - 작은 요소 (4px/8px, 8px/12px)
            </Heading>
            <Body>
              태그, 칩, 배지 같은 작은 요소들을 나열할 때 사용합니다. KRDS의
              input-group 등 조밀한 레이아웃에 해당합니다.
            </Body>
            <div className="bg-krds-warning-surface p-4 rounded-lg">
              <Stack spacing="compact">
                <div>
                  <code className="text-sm font-mono">spacing="compact"</code> →{' '}
                  <strong>4px (Mobile) / 8px (PC)</strong> - KRDS input-group,
                  매우 조밀한 요소
                </div>
                <div>
                  <code className="text-sm font-mono">spacing="inline"</code> →{' '}
                  <strong>8px (Mobile) / 12px (PC)</strong> - 태그, 칩, 배지
                </div>
              </Stack>
            </div>
            <ComponentPreview>
              <div className="w-full">
                <HStack spacing="inline" className="flex-wrap">
                  <span className="bg-krds-warning-surface px-3 py-1 rounded-full text-sm">
                    React
                  </span>
                  <span className="bg-krds-warning-surface px-3 py-1 rounded-full text-sm">
                    TypeScript
                  </span>
                  <span className="bg-krds-warning-surface px-3 py-1 rounded-full text-sm">
                    Tailwind
                  </span>
                </HStack>
              </div>
            </ComponentPreview>
            <CodeBlock
              code={`<HStack spacing="compact">  {/* 4px/8px - 폼 필드 그룹 */}
  <Input />
  <Button>확인</Button>
</HStack>

<HStack spacing="inline">  {/* 8px/12px - 태그, 칩, 배지 */}
  <Tag>React</Tag>
  <Tag>TypeScript</Tag>
  <Tag>Tailwind</Tag>
</HStack>`}
              language="tsx"
              showLineNumbers={false}
            />
          </Stack>
        </Stack>
      </PageSection>

      {/* Usage */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="usage">
            사용법
          </Heading>
          <Body>Stack, VStack, HStack 세 가지 컴포넌트를 제공합니다:</Body>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Stack spacing="heading-tight">
            <Heading level="h3">Stack - 기본 수직 레이아웃</Heading>
            <CodeBlock
              code={`import { Stack } from '@hanui/react'

// 기본값: 수직
<Stack spacing="content">
  <div>첫 번째</div>
  <div>두 번째</div>
</Stack>

// direction="row"로 수평 방향
<Stack direction="row" spacing="md">
  <div>왼쪽</div>
  <div>오른쪽</div>
</Stack>`}
              language="tsx"
              showLineNumbers={false}
            />
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">VStack - 명시적 수직 레이아웃</Heading>
            <CodeBlock
              code={`import { VStack } from '@hanui/react'

<VStack spacing="content">
  <div>위</div>
  <div>아래</div>
</VStack>`}
              language="tsx"
              showLineNumbers={false}
            />
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">HStack - 수평 레이아웃</Heading>
            <CodeBlock
              code={`import { HStack } from '@hanui/react'

<HStack spacing="inline">
  <div>왼쪽</div>
  <div>오른쪽</div>
</HStack>`}
              language="tsx"
              showLineNumbers={false}
            />
          </Stack>
        </Stack>
      </PageSection>

      {/* Examples */}
      <PageSection>
        <Heading level="h2" id="examples">
          예제
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* VStack */}
          <Stack spacing="heading-tight">
            <Heading level="h3">VStack - 수직 스택</Heading>
            <div>
              <ComponentPreview>
                <div className="w-full">
                  <VStack spacing="md">
                    <div className="bg-krds-success-surface p-4 rounded w-full">
                      첫 번째 아이템
                    </div>
                    <div className="bg-krds-success-surface p-4 rounded w-full">
                      두 번째 아이템
                    </div>
                    <div className="bg-krds-success-surface p-4 rounded w-full">
                      세 번째 아이템
                    </div>
                  </VStack>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<VStack spacing="md">
  <div>첫 번째 아이템</div>
  <div>두 번째 아이템</div>
  <div>세 번째 아이템</div>
</VStack>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* HStack */}
          <Stack spacing="heading-tight">
            <Heading level="h3">HStack - 수평 스택</Heading>
            <div>
              <ComponentPreview>
                <div className="w-full">
                  <HStack spacing="md">
                    <div className="bg-krds-primary-surface px-4 py-2 rounded">
                      왼쪽
                    </div>
                    <div className="bg-krds-primary-surface px-4 py-2 rounded">
                      중앙
                    </div>
                    <div className="bg-krds-primary-surface px-4 py-2 rounded">
                      오른쪽
                    </div>
                  </HStack>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<HStack spacing="md">
  <div>왼쪽</div>
  <div>중앙</div>
  <div>오른쪽</div>
</HStack>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Stack with direction="row" */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Stack direction="row" - 수평 방향</Heading>
            <div>
              <ComponentPreview>
                <div className="w-full">
                  <Stack direction="row" spacing="md" justify="center">
                    <div className="bg-krds-success-surface px-4 py-2 rounded">
                      버튼 1
                    </div>
                    <div className="bg-krds-success-surface px-4 py-2 rounded">
                      버튼 2
                    </div>
                    <div className="bg-krds-success-surface px-4 py-2 rounded">
                      버튼 3
                    </div>
                  </Stack>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Stack direction="row" spacing="md" justify="center">
  <div>버튼 1</div>
  <div>버튼 2</div>
  <div>버튼 3</div>
</Stack>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Heading Spacing */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Heading Spacing (heading-loose)</Heading>
            <div>
              <ComponentPreview>
                <div className="w-full">
                  <Stack spacing="heading-loose">
                    <h1 className="text-3xl font-bold">메인 제목</h1>
                    <h2 className="text-2xl font-semibold text-krds-gray-70">
                      부제목
                    </h2>
                  </Stack>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Stack spacing="heading-loose">  {/* 20px/24px */}
  <h1>메인 제목</h1>
  <h2>부제목</h2>
</Stack>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Form */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Form</Heading>
            <div>
              <ComponentPreview>
                <div className="w-full">
                  <Stack spacing="form">
                    <HStack>
                      <label className="block text-sm font-medium mb-1">
                        이름
                      </label>
                      <div className="border border-krds-gray-20 rounded px-3 py-2">
                        Input
                      </div>
                    </HStack>
                    <HStack>
                      <label className="block text-sm font-medium mb-1">
                        이메일
                      </label>
                      <div className="border border-krds-gray-20 rounded px-3 py-2">
                        Input
                      </div>
                    </HStack>
                  </Stack>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Stack spacing="form">
  <div>
    <label>이름</label>
    <input type="text" />
  </div>
  <div>
    <label>이메일</label>
    <input type="email" />
  </div>
</Stack>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Alignment */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Alignment</Heading>
            <div>
              <ComponentPreview>
                <div className="w-full space-y-6">
                  <div>
                    <p className="text-sm font-semibold mb-2">
                      Center Alignment
                    </p>
                    <Stack
                      spacing="sm"
                      align="center"
                      className="border border-krds-gray-20 rounded p-4"
                    >
                      <div className="bg-krds-accent-surface px-4 py-2 rounded">
                        중앙 정렬
                      </div>
                      <div className="bg-krds-accent-surface px-4 py-2 rounded">
                        아이템
                      </div>
                    </Stack>
                  </div>

                  <div>
                    <p className="text-sm font-semibold mb-2">
                      Space Between (HStack)
                    </p>
                    <HStack
                      justify="between"
                      className="border border-krds-gray-20 rounded p-4"
                    >
                      <div className="bg-krds-warning-surface px-4 py-2 rounded">
                        왼쪽
                      </div>
                      <div className="bg-krds-warning-surface px-4 py-2 rounded">
                        오른쪽
                      </div>
                    </HStack>
                  </div>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`// 중앙 정렬
<VStack align="center">
  <div>중앙 정렬</div>
  <div>아이템</div>
</VStack>

// Space Between (수평)
<HStack justify="between">
  <div>왼쪽</div>
  <div>오른쪽</div>
</HStack>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>
        </Stack>
      </PageSection>

      {/* API Reference */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="api-reference">
            API 레퍼런스
          </Heading>

          <Body>
            <strong>Stack</strong>은 기본적으로 수직 방향이며,{' '}
            <code>direction="row"</code> prop으로 수평 방향으로 변경할 수
            있습니다. <strong>VStack</strong>은 Stack의 별칭으로 항상 수직
            방향입니다. <strong>HStack</strong>은 항상 수평 방향이며{' '}
            <code>direction</code> prop을 사용하지 않습니다.
          </Body>
        </Stack>

        <div className="overflow-x-auto mt-2 md:mt-4">
          <table className="min-w-full border border-krds-gray-20">
            <thead className="bg-krds-gray-5">
              <tr>
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
                <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                  spacing
                </td>
                <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                  StackSpacing
                </td>
                <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                  &apos;md&apos;
                </td>
                <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                  간격 프리셋
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                  direction
                </td>
                <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                  &apos;row&apos;
                </td>
                <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                  undefined (수직)
                </td>
                <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                  스택 방향 (Stack만 사용 가능). <code>direction="row"</code>일
                  때 수평 방향. VStack/HStack은 이 prop을 사용하지 않습니다.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                  align
                </td>
                <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                  &apos;start&apos; | &apos;center&apos; | &apos;end&apos; |
                  &apos;stretch&apos;
                </td>
                <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                  - (HStack: &apos;center&apos;)
                </td>
                <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                  교차축 정렬
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                  justify
                </td>
                <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                  &apos;start&apos; | &apos;center&apos; | &apos;end&apos; |
                  &apos;between&apos; | &apos;around&apos;
                </td>
                <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                  -
                </td>
                <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                  주축 정렬
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                  as
                </td>
                <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                  &apos;div&apos; | &apos;section&apos; | &apos;nav&apos; |
                  &apos;ul&apos; | ...
                </td>
                <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                  &apos;div&apos;
                </td>
                <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                  렌더링할 HTML 요소
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 md:mt-16">
          <Stack spacing="heading-content">
            <Heading level="h3">Spacing Options</Heading>
            <Body className="text-krds-gray-90">
              맥락 기반 KRDS 간격 시스템 (Context-based Spacing)
            </Body>
          </Stack>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-krds-gray-20">
              <thead className="bg-krds-gray-5">
                <tr>
                  <th className="px-4 py-2 text-left border-b border-krds-gray-20">
                    값
                  </th>
                  <th className="px-4 py-2 text-left border-b border-krds-gray-20">
                    간격
                  </th>
                  <th className="px-4 py-2 text-left border-b border-krds-gray-20">
                    용도
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-krds-gray-5">
                  <td
                    colSpan={3}
                    className="px-4 py-2 border-b border-krds-gray-20 font-semibold text-sm"
                  >
                    Header & Navigation
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    header-breadcrumb
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    16px (Mobile) / 24px (PC)
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    헤더와 브레드크럼 간격
                  </td>
                </tr>
                <tr className="bg-krds-gray-5">
                  <td
                    colSpan={3}
                    className="px-4 py-2 border-b border-krds-gray-20 font-semibold text-sm"
                  >
                    Layout Spacing
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    left-contents
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    0px (Mobile) / 64px (PC)
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    왼쪽 사이드바와 콘텐츠
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    contents-right
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    0px (Mobile) / 40px (PC)
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    콘텐츠와 오른쪽 사이드바
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    contents-footer
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    40px (Mobile) / 64px (PC)
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    콘텐츠와 푸터
                  </td>
                </tr>
                <tr className="bg-krds-gray-5">
                  <td
                    colSpan={3}
                    className="px-4 py-2 border-b border-krds-gray-20 font-semibold text-sm"
                  >
                    Heading Hierarchy
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    h1-h2
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    32px (Mobile) / 48px (PC)
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    H1과 H2 사이
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    h2-h2
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    40px (Mobile) / 80px (PC)
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    H2와 H2 사이
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    h2-h3
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    24px (Mobile) / 40px (PC)
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    H2와 H3 사이
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    h3-h3
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    32px (Mobile) / 64px (PC)
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    H3과 H3 사이
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    h3-h4
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    16px (Mobile) / 24px (PC)
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    H3과 H4 사이
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    h4-h4
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    24px (Mobile) / 40px (PC)
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    H4와 H4 사이
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    h4-h5
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    12px (Mobile) / 16px (PC)
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    H4와 H5 사이
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    h5-h5
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    16px (Mobile) / 32px (PC)
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    H5와 H5 사이
                  </td>
                </tr>
                <tr className="bg-krds-gray-5">
                  <td
                    colSpan={3}
                    className="px-4 py-2 border-b border-krds-gray-20 font-semibold text-sm"
                  >
                    Title to Body Spacing
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    title-body-small
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    8px (Mobile) / 16px (PC)
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    제목과 본문 (작은 간격)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    title-body-medium
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    12px (Mobile) / 20px (PC)
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    제목과 본문 (중간 간격)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    title-body-large
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    20px (Mobile) / 24px (PC)
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    제목과 본문 (큰 간격)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    breadcrumb
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    32px (Mobile) / 40px (PC)
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    브레드크럼과 H1
                  </td>
                </tr>
                <tr className="bg-krds-gray-5">
                  <td
                    colSpan={3}
                    className="px-4 py-2 border-b border-krds-gray-20 font-semibold text-sm"
                  >
                    Text Spacing
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    text-text-large
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    16px (Mobile) / 20px (PC)
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    텍스트 단락 (큰 간격)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    text-text-medium
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    12px (Mobile) / 16px (PC)
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    텍스트 단락 (중간 간격)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    text-text-small
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    10px (Mobile) / 12px (PC)
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    텍스트 단락 (작은 간격)
                  </td>
                </tr>
                <tr className="bg-krds-gray-5">
                  <td
                    colSpan={3}
                    className="px-4 py-2 border-b border-krds-gray-20 font-semibold text-sm"
                  >
                    Image to Text Spacing
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    image-text-small
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    16px (Mobile) / 20px (PC)
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    이미지와 텍스트 (작은 간격)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    image-text-medium
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    20px (Mobile) / 24px (PC)
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    이미지와 텍스트 (중간 간격)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    image-text-large
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    24px (Mobile) / 32px (PC)
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    이미지와 텍스트 (큰 간격)
                  </td>
                </tr>
                <tr className="bg-krds-gray-5">
                  <td
                    colSpan={3}
                    className="px-4 py-2 border-b border-krds-gray-20 font-semibold text-sm"
                  >
                    Component Spacing
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    form
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    16px
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    폼 필드 간격
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    card-list
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    24px
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    카드 리스트
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    input-group
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    8px
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    인풋 그룹 (라벨-입력)
                  </td>
                </tr>
                <tr className="bg-krds-gray-5">
                  <td
                    colSpan={3}
                    className="px-4 py-2 border-b border-krds-gray-20 font-semibold text-sm"
                  >
                    Generic Spacing
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    xs
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    8px
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    매우 작은 간격
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    sm
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    12px
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    작은 간격
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    md
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    16px
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    중간 간격 (기본값)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    lg
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    24px
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    큰 간격
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    xl
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    32px
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    매우 큰 간격
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    2xl
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    40px
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    2배 큰 간격
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 font-mono text-sm">
                    3xl
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    64px
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 text-sm">
                    3배 큰 간격
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </PageSection>
    </>
  );
}
