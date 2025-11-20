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
  DoCard,
  DontCard,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  PageNavigation,
} from '@/components/hanui';

export default function CardPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Card"
        description="관련 콘텐츠를 그룹화하여 표시하는 유연한 컨테이너 컴포넌트입니다. 다양한 변형과 compound component 패턴을 제공합니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview">
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
                  Description, Body, Footer로 구조화된 콘텐츠를 작성할 수
                  있습니다.
                </ListItem>
                <ListItem>
                  <strong>8가지 변형:</strong> outlined (기본), shadow, filled,
                  elevated + semantic variants (info, success, warning, error)
                  스타일을 제공합니다.
                </ListItem>
                <ListItem>
                  <strong>패딩 옵션:</strong> none, sm, md, lg 4가지 패딩 크기를
                  제공합니다.
                </ListItem>
                <ListItem>
                  <strong>인터랙티브:</strong> hoverable prop으로 클릭 가능한
                  카드를 만들 수 있습니다.
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
                  <CardDescription>
                    카드에 대한 간단한 설명입니다.
                  </CardDescription>
                </CardHeader>
                <CardBody>
                  <Body>카드의 주요 콘텐츠가 여기에 들어갑니다.</Body>
                </CardBody>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="기본 변형 (Variants)">
                <Body className="leading-relaxed">
                  Card는 4가지 기본 시각적 변형을 제공합니다:
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
              <SectionHeading
                level="h3"
                title="시맨틱 변형 (Semantic Variants)"
              >
                <Body className="leading-relaxed">
                  의미에 따른 4가지 색상 변형을 제공합니다. 알림, 상태 표시 등에
                  적합합니다:
                </Body>
              </SectionHeading>

              <div className="space-y-6">
                <div>
                  <Code variant="block" language="tsx" showLineNumbers={false}>
                    {`<Card variant="info">
  <CardBody>정보 카드 - 일반적인 정보나 도움말에 사용</CardBody>
</Card>`}
                  </Code>
                  <Card variant="info" className="mt-3">
                    <CardBody>
                      정보 카드 - 일반적인 정보나 도움말에 사용
                    </CardBody>
                  </Card>
                </div>

                <div>
                  <Code variant="block" language="tsx" showLineNumbers={false}>
                    {`<Card variant="success">
  <CardBody>성공 카드 - 성공적인 작업 완료 표시</CardBody>
</Card>`}
                  </Code>
                  <Card variant="success" className="mt-3">
                    <CardBody>성공 카드 - 성공적인 작업 완료 표시</CardBody>
                  </Card>
                </div>

                <div>
                  <Code variant="block" language="tsx" showLineNumbers={false}>
                    {`<Card variant="warning">
  <CardBody>경고 카드 - 주의가 필요한 정보</CardBody>
</Card>`}
                  </Code>
                  <Card variant="warning" className="mt-3">
                    <CardBody>경고 카드 - 주의가 필요한 정보</CardBody>
                  </Card>
                </div>

                <div>
                  <Code variant="block" language="tsx" showLineNumbers={false}>
                    {`<Card variant="error">
  <CardBody>오류 카드 - 오류나 실패 상태 표시</CardBody>
</Card>`}
                  </Code>
                  <Card variant="error" className="mt-3">
                    <CardBody>오류 카드 - 오류나 실패 상태 표시</CardBody>
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
                  <Code>hoverable</Code> prop을 사용하면 클릭 가능한 카드를 만들
                  수 있습니다. 호버 시 그림자가 강조되고 약간 위로 올라가며,
                  키보드로도 접근 가능합니다 (Enter, Space):
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

          {/* Best Practices */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="best-practices"
              title="Best Practices"
            />

            <Subsection level="h3">
              <SectionHeading level="h3" title="언제 사용하나요?" />
              <DoCard title="Card를 사용하기 적합한 경우">
                <List variant="check">
                  <ListItem>관련 정보를 시각적으로 그룹화할 때</ListItem>
                  <ListItem>여러 콘텐츠 항목을 구별해서 표시할 때</ListItem>
                  <ListItem>클릭 가능한 콘텐츠 블록이 필요할 때</ListItem>
                  <ListItem>계층적 정보를 구조화할 때</ListItem>
                </List>
              </DoCard>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="언제 사용하지 말아야 하나요?" />
              <DontCard title="Card 사용을 피해야 하는 경우">
                <List variant="dash">
                  <ListItem>
                    단일 텍스트 블록만 표시할 때 (<Code>Body</Code> 컴포넌트
                    사용)
                  </ListItem>
                  <ListItem>
                    복잡한 폼을 담을 때 (<Code>Form</Code> 컴포넌트 사용)
                  </ListItem>
                  <ListItem>
                    데이터 테이블을 표시할 때 (<Code>Table</Code> 컴포넌트 사용)
                  </ListItem>
                  <ListItem>너무 많은 카드를 한 화면에 배치할 때</ListItem>
                </List>
              </DontCard>
            </Subsection>
          </Section>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
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
                      &apos;outlined&apos; | &apos;shadow&apos; |
                      &apos;filled&apos; | &apos;elevated&apos; |
                      &apos;info&apos; | &apos;success&apos; |
                      &apos;warning&apos; | &apos;error&apos;
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
                  <Code>CardTitle</Code>: 카드 제목 (h3 요소, 24px,
                  font-semibold).
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
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Button', href: '/components/button' }}
        next={{ title: 'Code', href: '/components/code' }}
      />
    </>
  );
}
