import { Stack, Heading, Body } from '@hanui/react';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';
import { CodeBlock } from '@/components/content/CodeBlock';
import { GuidelineSection } from '@/components/content/GuidelineSection';

export default function CardPage() {
  return (
    <>
      <PageHeader
        title="Card"
        description="관련 콘텐츠를 그룹화하여 표시하는 유연한 컨테이너 컴포넌트입니다. 다양한 변형과 compound component 패턴을 제공합니다."
      />

      {/* 기본 사용법 */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="basic-usage">
            개요
          </Heading>
          <Body size="md" className="text-krds-gray-70">
            Card는 Compound Component 패턴을 사용하여 구조화된 콘텐츠를 담을 수
            있습니다.
          </Body>

          <Stack spacing="heading-tight">
            <Heading
              level="h3"
              id="basic-example"
              className="text-lg font-medium"
            >
              기본 카드
            </Heading>
            <CodeBlock
              code={`import { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter, Button } from '@hanui/react';

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>카드 제목</CardTitle>
        <CardDescription>카드에 대한 간단한 설명입니다.</CardDescription>
      </CardHeader>
      <CardBody>
        <p>카드의 주요 콘텐츠가 여기에 들어갑니다.</p>
      </CardBody>
      <CardFooter>
        <Button size="sm">확인</Button>
        <Button size="sm" variant="outline">취소</Button>
      </CardFooter>
    </Card>
  );
}`}
              language="tsx"
            />
          </Stack>
        </Stack>
      </PageSection>

      {/* 변형 */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="variants">
            변형 (Variants)
          </Heading>
          <Body size="md" className="text-krds-gray-70">
            Card는 4가지 시각적 변형을 제공합니다.
          </Body>

          <Stack spacing="heading-tight">
            <Heading
              level="h3"
              id="variant-default"
              className="text-lg font-medium"
            >
              Default
            </Heading>
            <Body size="sm" className="text-krds-gray-70">
              그림자와 테두리가 있는 기본 스타일입니다.
            </Body>
            <CodeBlock
              code={`<Card variant="default">
  <CardBody>기본 카드 스타일</CardBody>
</Card>`}
              language="tsx"
            />
          </Stack>

          <Stack spacing="heading-tight">
            <Heading
              level="h3"
              id="variant-outlined"
              className="text-lg font-medium"
            >
              Outlined
            </Heading>
            <Body size="sm" className="text-krds-gray-70">
              강조된 테두리만 있는 스타일입니다.
            </Body>
            <CodeBlock
              code={`<Card variant="outlined">
  <CardBody>테두리 스타일 카드</CardBody>
</Card>`}
              language="tsx"
            />
          </Stack>

          <Stack spacing="heading-tight">
            <Heading
              level="h3"
              id="variant-filled"
              className="text-lg font-medium"
            >
              Filled
            </Heading>
            <Body size="sm" className="text-krds-gray-70">
              배경색이 있는 스타일입니다.
            </Body>
            <CodeBlock
              code={`<Card variant="filled">
  <CardBody>배경색 스타일 카드</CardBody>
</Card>`}
              language="tsx"
            />
          </Stack>

          <Stack spacing="heading-tight">
            <Heading
              level="h3"
              id="variant-elevated"
              className="text-lg font-medium"
            >
              Elevated
            </Heading>
            <Body size="sm" className="text-krds-gray-70">
              강한 그림자로 강조되는 스타일입니다.
            </Body>
            <CodeBlock
              code={`<Card variant="elevated">
  <CardBody>강조된 그림자 카드</CardBody>
</Card>`}
              language="tsx"
            />
          </Stack>
        </Stack>
      </PageSection>

      {/* 패딩 옵션 */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="padding">
            패딩 (Padding)
          </Heading>
          <Body size="md" className="text-krds-gray-70">
            Card는 다양한 패딩 크기를 지원합니다.
          </Body>

          <Stack spacing="heading-tight">
            <Heading
              level="h3"
              id="padding-options"
              className="text-lg font-medium"
            >
              패딩 크기
            </Heading>
            <CodeBlock
              code={`// 패딩 없음
<Card padding="none">
  <CardBody>패딩 없음 (0px)</CardBody>
</Card>

// 작은 패딩
<Card padding="sm">
  <CardBody>작은 패딩 (16px)</CardBody>
</Card>

// 중간 패딩 (기본)
<Card padding="md">
  <CardBody>중간 패딩 (24px)</CardBody>
</Card>

// 큰 패딩
<Card padding="lg">
  <CardBody>큰 패딩 (32px)</CardBody>
</Card>`}
              language="tsx"
            />
          </Stack>
        </Stack>
      </PageSection>

      {/* 인터랙티브 카드 */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="hoverable">
            인터랙티브 카드
          </Heading>
          <Body size="md" className="text-krds-gray-70">
            hoverable prop을 사용하면 클릭 가능한 카드를 만들 수 있습니다.
          </Body>

          <Stack spacing="heading-tight">
            <Heading
              level="h3"
              id="hoverable-example"
              className="text-lg font-medium"
            >
              클릭 가능한 카드
            </Heading>
            <Body size="sm" className="text-krds-gray-70">
              hoverable 카드는 호버 시 그림자가 강조되고 약간 위로 올라갑니다.
              키보드로도 접근 가능합니다 (Enter, Space).
            </Body>
            <CodeBlock
              code={`<Card
  hoverable
  onClick={() => console.log('Card clicked')}
  aria-label="상세 정보 보기"
>
  <CardHeader>
    <CardTitle>클릭 가능한 카드</CardTitle>
    <CardDescription>이 카드를 클릭하거나 Enter/Space 키를 눌러보세요</CardDescription>
  </CardHeader>
  <CardBody>
    <p>카드 전체가 버튼처럼 작동합니다.</p>
  </CardBody>
</Card>`}
              language="tsx"
            />
          </Stack>
        </Stack>
      </PageSection>

      {/* 예제 */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="real-examples">
            예제
          </Heading>

          <Stack spacing="heading-tight">
            <Heading
              level="h3"
              id="example-info"
              className="text-lg font-medium"
            >
              정보 카드
            </Heading>
            <CodeBlock
              code={`<Card>
  <CardHeader>
    <CardTitle>개인정보 처리방침</CardTitle>
    <CardDescription>최종 수정일: 2024년 1월 1일</CardDescription>
  </CardHeader>
  <CardBody>
    <p>귀하의 개인정보는 관련 법령에 따라 안전하게 보호됩니다.</p>
    <ul className="list-disc list-inside mt-2 space-y-1">
      <li>수집 항목: 이름, 이메일, 전화번호</li>
      <li>수집 목적: 서비스 제공 및 고객 지원</li>
      <li>보유 기간: 회원 탈퇴 시까지</li>
    </ul>
  </CardBody>
  <CardFooter>
    <Button size="sm">전체 보기</Button>
  </CardFooter>
</Card>`}
              language="tsx"
            />
          </Stack>

          <Stack spacing="heading-tight">
            <Heading
              level="h3"
              id="example-grid"
              className="text-lg font-medium"
            >
              카드 그리드
            </Heading>
            <Body size="sm" className="text-krds-gray-70">
              여러 카드를 그리드 레이아웃으로 배치할 수 있습니다.
            </Body>
            <CodeBlock
              code={`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card hoverable>
    <CardHeader>
      <CardTitle>서비스 1</CardTitle>
      <CardDescription>간단한 설명</CardDescription>
    </CardHeader>
    <CardBody>
      <p>서비스 상세 내용</p>
    </CardBody>
  </Card>

  <Card hoverable>
    <CardHeader>
      <CardTitle>서비스 2</CardTitle>
      <CardDescription>간단한 설명</CardDescription>
    </CardHeader>
    <CardBody>
      <p>서비스 상세 내용</p>
    </CardBody>
  </Card>

  <Card hoverable>
    <CardHeader>
      <CardTitle>서비스 3</CardTitle>
      <CardDescription>간단한 설명</CardDescription>
    </CardHeader>
    <CardBody>
      <p>서비스 상세 내용</p>
    </CardBody>
  </Card>
</div>`}
              language="tsx"
            />
          </Stack>
        </Stack>
      </PageSection>

      {/* 가이드라인 */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="guidelines">
            사용 가이드라인
          </Heading>

          <GuidelineSection title="언제 사용하나요?" type="do">
            <ul className="list-disc list-inside space-y-2">
              <li>관련 정보를 시각적으로 그룹화할 때</li>
              <li>여러 콘텐츠 항목을 구별해서 표시할 때</li>
              <li>클릭 가능한 콘텐츠 블록이 필요할 때</li>
              <li>계층적 정보를 구조화할 때</li>
            </ul>
          </GuidelineSection>

          <GuidelineSection title="언제 사용하지 말아야 하나요?" type="dont">
            <ul className="list-disc list-inside space-y-2">
              <li>단일 텍스트 블록만 표시할 때 (Body 컴포넌트 사용)</li>
              <li>복잡한 폼을 담을 때 (Form 컴포넌트 사용)</li>
              <li>데이터 테이블을 표시할 때 (Table 컴포넌트 사용)</li>
              <li>너무 많은 카드를 한 화면에 배치할 때</li>
            </ul>
          </GuidelineSection>
        </Stack>
      </PageSection>

      {/* 접근성 */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="accessibility">
            접근성
          </Heading>
          <Body size="md" className="text-krds-gray-70">
            Card 컴포넌트는 WCAG 2.1 및 KWCAG 2.2 표준을 준수합니다.
          </Body>

          <div className="space-y-4">
            <div>
              <Heading level="h3" className="text-lg font-semibold mb-2">
                키보드 네비게이션 (hoverable 카드)
              </Heading>
              <ul className="list-disc list-inside space-y-1 text-krds-gray-90">
                <li>
                  <code className="text-xs bg-krds-gray-5 px-1 py-0.5 rounded">
                    Tab
                  </code>
                  : 카드로 포커스 이동
                </li>
                <li>
                  <code className="text-xs bg-krds-gray-5 px-1 py-0.5 rounded">
                    Enter
                  </code>{' '}
                  또는{' '}
                  <code className="text-xs bg-krds-gray-5 px-1 py-0.5 rounded">
                    Space
                  </code>
                  : 카드 활성화 (클릭)
                </li>
                <li>
                  <code className="text-xs bg-krds-gray-5 px-1 py-0.5 rounded">
                    Shift + Tab
                  </code>
                  : 이전 요소로 포커스 이동
                </li>
              </ul>
            </div>

            <div>
              <Heading level="h3" className="text-lg font-semibold mb-2">
                스크린 리더
              </Heading>
              <ul className="list-disc list-inside space-y-1 text-krds-gray-90">
                <li>일반 카드는 article role로 인식됩니다</li>
                <li>hoverable 카드는 button role로 인식됩니다</li>
                <li>
                  aria-label을 사용하여 카드 목적을 명확히 전달할 수 있습니다
                </li>
                <li>제목과 설명이 계층적으로 읽힙니다</li>
              </ul>
            </div>
          </div>
        </Stack>
      </PageSection>

      {/* 디자인 원칙 */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="design-principles">
            디자인 원칙
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Heading level="h3" className="text-lg font-semibold">
                유연성 (Flexibility)
              </Heading>
              <Body size="sm" className="text-krds-gray-70">
                다양한 콘텐츠 타입과 레이아웃을 지원하며, 필요에 따라 구조를
                조정할 수 있습니다.
              </Body>
            </div>

            <div className="space-y-2">
              <Heading level="h3" className="text-lg font-semibold">
                일관성 (Consistency)
              </Heading>
              <Body size="sm" className="text-krds-gray-70">
                모든 카드가 동일한 시각적 언어를 사용하여 사용자에게 예측 가능한
                경험을 제공합니다.
              </Body>
            </div>

            <div className="space-y-2">
              <Heading level="h3" className="text-lg font-semibold">
                구조화 (Structure)
              </Heading>
              <Body size="sm" className="text-krds-gray-70">
                Header, Body, Footer로 명확히 구분된 구조를 통해 콘텐츠를
                체계적으로 조직합니다.
              </Body>
            </div>

            <div className="space-y-2">
              <Heading level="h3" className="text-lg font-semibold">
                인터랙션 (Interaction)
              </Heading>
              <Body size="sm" className="text-krds-gray-70">
                hoverable 옵션으로 카드를 인터랙티브하게 만들어 사용자 참여를
                유도합니다.
              </Body>
            </div>
          </div>
        </Stack>
      </PageSection>

      {/* API 레퍼런스 */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="api-reference">
            API 레퍼런스
          </Heading>

          <div className="space-y-8">
            {/* Card Props */}
            <div>
              <Heading level="h3" className="text-xl font-semibold mb-4">
                Card
              </Heading>
              <Body size="md" className="text-krds-gray-70 mb-4">
                카드 컨테이너 컴포넌트입니다.
              </Body>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-krds-gray-20">
                      <th className="text-left py-2 px-4">Prop</th>
                      <th className="text-left py-2 px-4">Type</th>
                      <th className="text-left py-2 px-4">Default</th>
                      <th className="text-left py-2 px-4">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-krds-gray-90">
                    <tr className="border-b border-krds-gray-20">
                      <td className="py-2 px-4">
                        <code>variant</code>
                      </td>
                      <td className="py-2 px-4">
                        <code>
                          &quot;default&quot; | &quot;outlined&quot; |
                          &quot;filled&quot; | &quot;elevated&quot;
                        </code>
                      </td>
                      <td className="py-2 px-4">
                        <code>&quot;default&quot;</code>
                      </td>
                      <td className="py-2 px-4">카드 시각적 변형</td>
                    </tr>
                    <tr className="border-b border-krds-gray-20">
                      <td className="py-2 px-4">
                        <code>padding</code>
                      </td>
                      <td className="py-2 px-4">
                        <code>
                          &quot;none&quot; | &quot;sm&quot; | &quot;md&quot; |
                          &quot;lg&quot;
                        </code>
                      </td>
                      <td className="py-2 px-4">
                        <code>&quot;md&quot;</code>
                      </td>
                      <td className="py-2 px-4">패딩 크기</td>
                    </tr>
                    <tr className="border-b border-krds-gray-20">
                      <td className="py-2 px-4">
                        <code>hoverable</code>
                      </td>
                      <td className="py-2 px-4">
                        <code>boolean</code>
                      </td>
                      <td className="py-2 px-4">
                        <code>false</code>
                      </td>
                      <td className="py-2 px-4">호버 효과 및 클릭 가능 여부</td>
                    </tr>
                    <tr className="border-b border-krds-gray-20">
                      <td className="py-2 px-4">
                        <code>className</code>
                      </td>
                      <td className="py-2 px-4">
                        <code>string</code>
                      </td>
                      <td className="py-2 px-4">-</td>
                      <td className="py-2 px-4">추가 CSS 클래스</td>
                    </tr>
                    <tr className="border-b border-krds-gray-20">
                      <td className="py-2 px-4">
                        <code>aria-label</code>
                      </td>
                      <td className="py-2 px-4">
                        <code>string</code>
                      </td>
                      <td className="py-2 px-4">-</td>
                      <td className="py-2 px-4">접근성 레이블</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sub-components */}
            <div>
              <Heading level="h3" className="text-xl font-semibold mb-4">
                하위 컴포넌트
              </Heading>
              <div className="space-y-4">
                <div>
                  <code className="font-semibold">CardHeader</code>
                  <Body size="sm" className="text-krds-gray-70 mt-1">
                    카드 헤더 영역. CardTitle과 CardDescription을 포함합니다.
                  </Body>
                </div>
                <div>
                  <code className="font-semibold">CardTitle</code>
                  <Body size="sm" className="text-krds-gray-70 mt-1">
                    카드 제목 (h3 요소, 24px, font-semibold).
                  </Body>
                </div>
                <div>
                  <code className="font-semibold">CardDescription</code>
                  <Body size="sm" className="text-krds-gray-70 mt-1">
                    카드 설명 (p 요소, 15px, text-gray-600).
                  </Body>
                </div>
                <div>
                  <code className="font-semibold">CardBody</code>
                  <Body size="sm" className="text-krds-gray-70 mt-1">
                    카드 본문 콘텐츠 영역.
                  </Body>
                </div>
                <div>
                  <code className="font-semibold">CardFooter</code>
                  <Body size="sm" className="text-krds-gray-70 mt-1">
                    카드 푸터 영역. 주로 버튼 등 액션을 배치합니다.
                  </Body>
                </div>
              </div>
            </div>
          </div>
        </Stack>
      </PageSection>

      {/* Foundation Layer */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="foundation-layer">
            기반 레이어
          </Heading>
          <Body size="md" className="text-krds-gray-70">
            Card 컴포넌트는 다음과 같은 기능을 자동으로 적용합니다:
          </Body>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-krds-primary-surface flex items-center justify-center text-krds-primary-base font-semibold">
                1
              </div>
              <div>
                <Body size="md" weight="bold" className="text-krds-gray-95">
                  시맨틱 HTML 자동 적용
                </Body>
                <Body size="sm" className="text-krds-gray-70">
                  일반 카드는 article role, hoverable 카드는 button role이
                  자동으로 적용됩니다.
                </Body>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-krds-primary-surface flex items-center justify-center text-krds-primary-base font-semibold">
                2
              </div>
              <div>
                <Body size="md" weight="bold" className="text-krds-gray-95">
                  키보드 접근성 자동 지원
                </Body>
                <Body size="sm" className="text-krds-gray-70">
                  hoverable 카드는 Tab 키로 포커스 가능하며, Enter/Space 키로
                  클릭할 수 있습니다.
                </Body>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-krds-primary-surface flex items-center justify-center text-krds-primary-base font-semibold">
                3
              </div>
              <div>
                <Body size="md" weight="bold" className="text-krds-gray-95">
                  다크 모드 자동 지원
                </Body>
                <Body size="sm" className="text-krds-gray-70">
                  시스템 설정에 따라 다크 모드가 자동으로 적용되며, 모든 색상과
                  그림자가 최적화됩니다.
                </Body>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-krds-primary-surface flex items-center justify-center text-krds-primary-base font-semibold">
                4
              </div>
              <div>
                <Body size="md" weight="bold" className="text-krds-gray-95">
                  시각적 피드백 자동 적용
                </Body>
                <Body size="sm" className="text-krds-gray-70">
                  hoverable 카드는 호버 시 그림자 강조 및 약간의 위로 이동
                  애니메이션이 자동으로 적용됩니다.
                </Body>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-krds-primary-surface flex items-center justify-center text-krds-primary-base font-semibold">
                5
              </div>
              <div>
                <Body size="md" weight="bold" className="text-krds-gray-95">
                  포커스 관리 자동 지원
                </Body>
                <Body size="sm" className="text-krds-gray-70">
                  hoverable 카드는 포커스 시 명확한 focus ring이 표시되어 현재
                  위치를 쉽게 파악할 수 있습니다.
                </Body>
              </div>
            </div>
          </div>
        </Stack>
      </PageSection>
    </>
  );
}
