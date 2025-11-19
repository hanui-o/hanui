'use client';

import {
  Section,
  SectionHeading,
  Subsection,
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
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
} from '@/components/hanui';

export default function CardPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Card"
        description="관련 콘텐츠를 그룹화하여 표시하는 유연한 컨테이너 컴포넌트입니다. 다양한 변형과 compound component 패턴을 제공합니다."
      />

      {/* Installation */}
      <Section level="h2">
        <SectionHeading level="h2" id="installation" title="설치">
          <Body className="leading-relaxed">
            다음 명령어로 Card 컴포넌트를 설치합니다:
          </Body>
        </SectionHeading>

        <Code variant="block" language="bash" showLineNumbers={false}>
          npx @hanui/cli add card
        </Code>
      </Section>

      {/* What is it */}
      <Section level="h2">
        <SectionHeading
          level="h2"
          id="what-is-it"
          title="무엇인가요?"
          description="Card는 Compound Component 패턴을 사용하여 구조화된 콘텐츠를 담을 수 있습니다."
        />

        <div className="bg-krds-gray-5 rounded-lg p-6 border border-krds-gray-20">
          <List variant="check" className="text-krds-gray-90">
            <ListItem>
              <strong>Compound Component 패턴:</strong> Header, Title,
              Description, Body, Footer로 구조화된 콘텐츠를 작성할 수 있습니다.
            </ListItem>
            <ListItem>
              <strong>4가지 변형:</strong> outlined (기본), shadow, filled,
              elevated 스타일을 제공합니다.
            </ListItem>
            <ListItem>
              <strong>패딩 옵션:</strong> none, sm, md, lg 4가지 패딩 크기를
              제공합니다.
            </ListItem>
            <ListItem>
              <strong>인터랙티브:</strong> hoverable prop으로 클릭 가능한 카드를
              만들 수 있습니다.
            </ListItem>
            <ListItem>
              <strong>접근성:</strong> WCAG 2.1 및 KWCAG 2.2 준수, 키보드
              네비게이션 지원.
            </ListItem>
            <ListItem>
              <strong>다크 모드:</strong> 자동 다크 모드 지원.
            </ListItem>
          </List>
        </div>
      </Section>

      {/* Usage */}
      <Section level="h2">
        <SectionHeading level="h2" id="usage" title="사용 방법" />

        <Subsection level="h3">
          <SectionHeading level="h3" title="기본 카드">
            <Body className="leading-relaxed">
              Compound Component 패턴을 사용하여 구조화된 카드를 만들 수
              있습니다:
            </Body>
          </SectionHeading>

          <Code variant="block" language="tsx" showLineNumbers={false}>
            {`import { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter, Button } from '@/components/hanui';

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
          </Code>

          <Card variant="outlined" className="mt-3">
            <CardHeader>
              <CardTitle>카드 제목</CardTitle>
              <CardDescription>카드에 대한 간단한 설명입니다.</CardDescription>
            </CardHeader>
            <CardBody>
              <Body>카드의 주요 콘텐츠가 여기에 들어갑니다.</Body>
            </CardBody>
          </Card>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="변형 (Variants)">
            <Body className="leading-relaxed">
              Card는 4가지 시각적 변형을 제공합니다:
            </Body>
          </SectionHeading>

          <div className="space-y-6">
            <div>
              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Card>
  <CardBody>기본 카드 스타일 (테두리)</CardBody>
</Card>`}
              </Code>
              <Card className="mt-3">
                <CardBody>기본 카드 스타일 (테두리)</CardBody>
              </Card>
            </div>

            <div>
              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Card variant="shadow">
  <CardBody>그림자 + 테두리 카드</CardBody>
</Card>`}
              </Code>
              <Card variant="shadow" className="mt-3">
                <CardBody>그림자 + 테두리 카드</CardBody>
              </Card>
            </div>

            <div>
              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Card variant="filled">
  <CardBody>배경색 스타일 카드</CardBody>
</Card>`}
              </Code>
              <Card variant="filled" className="mt-3">
                <CardBody>배경색 스타일 카드</CardBody>
              </Card>
            </div>

            <div>
              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Card variant="elevated">
  <CardBody>강조된 그림자 카드</CardBody>
</Card>`}
              </Code>
              <Card variant="elevated" className="mt-3">
                <CardBody>강조된 그림자 카드</CardBody>
              </Card>
            </div>
          </div>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="패딩 옵션">
            <Body className="leading-relaxed">
              <Code>padding</Code> prop으로 패딩 크기를 조절할 수 있습니다:
            </Body>
          </SectionHeading>

          <Code variant="block" language="tsx" showLineNumbers={false}>
            {`// 패딩 없음 (0px)
<Card padding="none">
  <CardBody>패딩 없음</CardBody>
</Card>

// 작은 패딩 (16px)
<Card padding="sm">
  <CardBody>작은 패딩</CardBody>
</Card>

// 중간 패딩 (24px) - 기본값
<Card padding="md">
  <CardBody>중간 패딩</CardBody>
</Card>

// 큰 패딩 (32px)
<Card padding="lg">
  <CardBody>큰 패딩</CardBody>
</Card>`}
          </Code>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="인터랙티브 카드">
            <Body className="leading-relaxed">
              <Code>hoverable</Code> prop을 사용하면 클릭 가능한 카드를 만들 수
              있습니다. 호버 시 그림자가 강조되고 약간 위로 올라가며, 키보드로도
              접근 가능합니다 (Enter, Space):
            </Body>
          </SectionHeading>

          <Code variant="block" language="tsx" showLineNumbers={false}>
            {`<Card
  hoverable
  onClick={() => console.log('Card clicked')}
  aria-label="상세 정보 보기"
>
  <CardHeader>
    <CardTitle>클릭 가능한 카드</CardTitle>
    <CardDescription>
      이 카드를 클릭하거나 Enter/Space 키를 눌러보세요
    </CardDescription>
  </CardHeader>
  <CardBody>
    <p>카드 전체가 버튼처럼 작동합니다.</p>
  </CardBody>
</Card>`}
          </Code>

          <Card
            variant="outlined"
            hoverable
            onClick={() => alert('Card clicked!')}
            aria-label="데모 카드"
            className="mt-3"
          >
            <CardHeader>
              <CardTitle>클릭 가능한 카드</CardTitle>
              <CardDescription>
                이 카드를 클릭하거나 Enter/Space 키를 눌러보세요
              </CardDescription>
            </CardHeader>
            <CardBody>
              <Body>카드 전체가 버튼처럼 작동합니다.</Body>
            </CardBody>
          </Card>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="실제 사용 예시">
            <Body className="leading-relaxed">
              정보 카드와 그리드 레이아웃 예시입니다:
            </Body>
          </SectionHeading>

          <Code variant="block" language="tsx" showLineNumbers={false}>
            {`// 정보 카드
<Card>
  <CardHeader>
    <CardTitle>개인정보 처리방침</CardTitle>
    <CardDescription>최종 수정일: 2024년 1월 1일</CardDescription>
  </CardHeader>
  <CardBody>
    <p>귀하의 개인정보는 관련 법령에 따라 안전하게 보호됩니다.</p>
    <List>
      <ListItem>수집 항목: 이름, 이메일, 전화번호</ListItem>
      <ListItem>수집 목적: 서비스 제공 및 고객 지원</ListItem>
      <ListItem>보유 기간: 회원 탈퇴 시까지</ListItem>
    </List>
  </CardBody>
  <CardFooter>
    <Button size="sm">전체 보기</Button>
  </CardFooter>
</Card>

// 카드 그리드
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
</div>`}
          </Code>
        </Subsection>
      </Section>

      {/* API Reference */}
      <Section level="h2">
        <SectionHeading level="h2" id="api" title="API Reference" />

        <Subsection level="h3">
          <SectionHeading level="h3" title="Card Props" />

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
                  &apos;outlined&apos; | &apos;shadow&apos; | &apos;filled&apos;
                  | &apos;elevated&apos;
                </TableCell>
                <TableCell className="font-mono">
                  &apos;outlined&apos;
                </TableCell>
                <TableCell>카드 시각적 변형</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">padding</TableCell>
                <TableCell className="font-mono">
                  &apos;none&apos; | &apos;sm&apos; | &apos;md&apos; |
                  &apos;lg&apos;
                </TableCell>
                <TableCell className="font-mono">&apos;md&apos;</TableCell>
                <TableCell>패딩 크기</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">hoverable</TableCell>
                <TableCell className="font-mono">boolean</TableCell>
                <TableCell className="font-mono">false</TableCell>
                <TableCell>호버 효과 및 클릭 가능 여부</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">className</TableCell>
                <TableCell className="font-mono">string</TableCell>
                <TableCell>-</TableCell>
                <TableCell>추가 CSS 클래스</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">aria-label</TableCell>
                <TableCell className="font-mono">string</TableCell>
                <TableCell>-</TableCell>
                <TableCell>접근성 레이블</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="하위 컴포넌트" />

          <List>
            <ListItem>
              <Code>CardHeader</Code>: 카드 헤더 영역. CardTitle과
              CardDescription을 포함합니다.
            </ListItem>
            <ListItem>
              <Code>CardTitle</Code>: 카드 제목 (h3 요소, 24px, font-semibold).
            </ListItem>
            <ListItem>
              <Code>CardDescription</Code>: 카드 설명 (p 요소, 15px,
              text-gray-600).
            </ListItem>
            <ListItem>
              <Code>CardBody</Code>: 카드 본문 콘텐츠 영역.
            </ListItem>
            <ListItem>
              <Code>CardFooter</Code>: 카드 푸터 영역. 주로 버튼 등 액션을
              배치합니다.
            </ListItem>
          </List>
        </Subsection>
      </Section>

      {/* Best Practices */}
      <Section level="h2">
        <SectionHeading level="h2" id="best-practices" title="Best Practices" />

        <Subsection level="h3">
          <SectionHeading level="h3" title="언제 사용하나요?">
            <Body className="leading-relaxed">
              다음과 같은 경우에 Card를 사용하세요:
            </Body>
          </SectionHeading>

          <List variant="check">
            <ListItem>관련 정보를 시각적으로 그룹화할 때</ListItem>
            <ListItem>여러 콘텐츠 항목을 구별해서 표시할 때</ListItem>
            <ListItem>클릭 가능한 콘텐츠 블록이 필요할 때</ListItem>
            <ListItem>계층적 정보를 구조화할 때</ListItem>
          </List>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="언제 사용하지 말아야 하나요?">
            <Body className="leading-relaxed">
              다음과 같은 경우에는 Card를 사용하지 마세요:
            </Body>
          </SectionHeading>

          <List variant="dash">
            <ListItem>
              단일 텍스트 블록만 표시할 때 (<Code>Body</Code> 컴포넌트 사용)
            </ListItem>
            <ListItem>
              복잡한 폼을 담을 때 (<Code>Form</Code> 컴포넌트 사용)
            </ListItem>
            <ListItem>
              데이터 테이블을 표시할 때 (<Code>Table</Code> 컴포넌트 사용)
            </ListItem>
            <ListItem>너무 많은 카드를 한 화면에 배치할 때</ListItem>
          </List>
        </Subsection>
      </Section>

      {/* Accessibility */}
      <Section level="h2">
        <SectionHeading
          level="h2"
          id="accessibility"
          title="접근성"
          description="Card 컴포넌트는 WCAG 2.1 및 KWCAG 2.2 표준을 준수합니다."
        />

        <Subsection level="h3">
          <SectionHeading
            level="h3"
            title="키보드 네비게이션 (hoverable 카드)"
          />

          <List>
            <ListItem>
              <Code>Tab</Code>: 카드로 포커스 이동
            </ListItem>
            <ListItem>
              <Code>Enter</Code> 또는 <Code>Space</Code>: 카드 활성화 (클릭)
            </ListItem>
            <ListItem>
              <Code>Shift + Tab</Code>: 이전 요소로 포커스 이동
            </ListItem>
          </List>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="스크린 리더" />

          <List>
            <ListItem>일반 카드는 article role로 인식됩니다</ListItem>
            <ListItem>hoverable 카드는 button role로 인식됩니다</ListItem>
            <ListItem>
              aria-label을 사용하여 카드 목적을 명확히 전달할 수 있습니다
            </ListItem>
            <ListItem>제목과 설명이 계층적으로 읽힙니다</ListItem>
          </List>
        </Subsection>
      </Section>

      {/* Design Principles */}
      <Section level="h2">
        <SectionHeading level="h2" id="design-principles" title="디자인 원칙" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="outlined">
            <CardHeader>
              <CardTitle>유연성 (Flexibility)</CardTitle>
            </CardHeader>
            <CardBody>
              <Body className="text-krds-gray-70">
                다양한 콘텐츠 타입과 레이아웃을 지원하며, 필요에 따라 구조를
                조정할 수 있습니다.
              </Body>
            </CardBody>
          </Card>

          <Card variant="outlined">
            <CardHeader>
              <CardTitle>일관성 (Consistency)</CardTitle>
            </CardHeader>
            <CardBody>
              <Body className="text-krds-gray-70">
                모든 카드가 동일한 시각적 언어를 사용하여 사용자에게 예측 가능한
                경험을 제공합니다.
              </Body>
            </CardBody>
          </Card>

          <Card variant="outlined">
            <CardHeader>
              <CardTitle>구조화 (Structure)</CardTitle>
            </CardHeader>
            <CardBody>
              <Body className="text-krds-gray-70">
                Header, Body, Footer로 명확히 구분된 구조를 통해 콘텐츠를
                체계적으로 조직합니다.
              </Body>
            </CardBody>
          </Card>

          <Card variant="outlined">
            <CardHeader>
              <CardTitle>인터랙션 (Interaction)</CardTitle>
            </CardHeader>
            <CardBody>
              <Body className="text-krds-gray-70">
                hoverable 옵션으로 카드를 인터랙티브하게 만들어 사용자 참여를
                유도합니다.
              </Body>
            </CardBody>
          </Card>
        </div>
      </Section>

      {/* Foundation Layer */}
      <Section level="h2">
        <SectionHeading
          level="h2"
          id="foundation-layer"
          title="기반 레이어"
          description="Card 컴포넌트는 다음과 같은 기능을 자동으로 적용합니다:"
        />

        <List spacing="loose">
          <ListItem>
            <strong>시맨틱 HTML 자동 적용</strong>
            <br />
            <Body className="text-krds-gray-70">
              일반 카드는 article role, hoverable 카드는 button role이 자동으로
              적용됩니다.
            </Body>
          </ListItem>
          <ListItem>
            <strong>키보드 접근성 자동 지원</strong>
            <br />
            <Body className="text-krds-gray-70">
              hoverable 카드는 Tab 키로 포커스 가능하며, Enter/Space 키로 클릭할
              수 있습니다.
            </Body>
          </ListItem>
          <ListItem>
            <strong>다크 모드 자동 지원</strong>
            <br />
            <Body className="text-krds-gray-70">
              시스템 설정에 따라 다크 모드가 자동으로 적용되며, 모든 색상과
              그림자가 최적화됩니다.
            </Body>
          </ListItem>
          <ListItem>
            <strong>시각적 피드백 자동 적용</strong>
            <br />
            <Body className="text-krds-gray-70">
              hoverable 카드는 호버 시 그림자 강조 및 약간의 위로 이동
              애니메이션이 자동으로 적용됩니다.
            </Body>
          </ListItem>
          <ListItem>
            <strong>포커스 관리 자동 지원</strong>
            <br />
            <Body className="text-krds-gray-70">
              hoverable 카드는 포커스 시 명확한 focus ring이 표시되어 현재
              위치를 쉽게 파악할 수 있습니다.
            </Body>
          </ListItem>
        </List>
      </Section>
    </>
  );
}
