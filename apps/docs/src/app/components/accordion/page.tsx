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
  Stack,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  PageNavigation,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  DoCard,
  DontCard,
} from '@/components/hanui';

export default function AccordionPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Accordion"
        description="관련된 여러 콘텐츠 섹션을 하나의 페이지에서 확인하고, 헤더를 선택하여 하위 콘텐츠를 표시하거나 숨길 수 있는 컴포넌트입니다."
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
                다음 명령어로 Accordion 컴포넌트를 설치합니다:
              </Body>
            </SectionHeading>

            <Code variant="block" language="bash" showLineNumbers={false}>
              npx @hanui/cli add accordion
            </Code>
          </Section>

          {/* What is it */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="what-is-it"
              title="무엇인가요?"
              description="Accordion은 콘텐츠를 접었다 펼칠 수 있는 인터랙티브 컴포넌트입니다."
            />

            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>단일/다중 모드:</strong> type prop으로 한 번에 하나만
                  열거나(single) 여러 개를 동시에 열 수 있습니다(multiple).
                </ListItem>
                <ListItem>
                  <strong>접근성 자동화:</strong> ARIA 속성과 키보드
                  네비게이션이 자동으로 적용됩니다.
                </ListItem>
                <ListItem>
                  <strong>시맨틱 구조:</strong> AccordionTrigger를 h1-h6로
                  감싸서 문서 계층 구조를 표현합니다.
                </ListItem>
                <ListItem>
                  <strong>스타일 변형:</strong> default(박스형)와 line(구분선)
                  두 가지 스타일을 제공합니다.
                </ListItem>
                <ListItem>
                  <strong>KRDS 준수:</strong> WCAG 2.1 및 KWCAG 2.2 접근성
                  기준을 충족합니다.
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* Usage */}
          <Section level="h2">
            <SectionHeading level="h2" id="usage" title="사용 방법" />

            <Subsection level="h3">
              <SectionHeading level="h3" title="기본 사용">
                <Body className="leading-relaxed">
                  기본 Accordion은 한 번에 하나의 패널만 열 수
                  있으며(type="single"), collapsible을 true로 설정하면 열린
                  패널을 다시 닫을 수 있습니다:
                </Body>
              </SectionHeading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <h3>
      <AccordionTrigger>접근성이란 무엇인가요?</AccordionTrigger>
    </h3>
    <AccordionContent>
      <Body>접근성은 모든 사람이 웹 콘텐츠와 서비스를 동등하게...</Body>
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
              </Code>

              <Card variant="outlined" className="mt-3">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <h3>
                      <AccordionTrigger>
                        접근성이란 무엇인가요?
                      </AccordionTrigger>
                    </h3>
                    <AccordionContent>
                      <Body>
                        접근성은 모든 사람이 웹 콘텐츠와 서비스를 동등하게
                        이용할 수 있도록 보장하는 것입니다. 이는 장애가 있는
                        사람뿐만 아니라 노인, 일시적 장애가 있는 사람 등 모든
                        사용자에게 중요합니다.
                      </Body>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <h3>
                      <AccordionTrigger>KRDS는 무엇인가요?</AccordionTrigger>
                    </h3>
                    <AccordionContent>
                      <Body>
                        KRDS(Korean Government Design System)는 대한민국 정부
                        웹사이트의 일관된 사용자 경험을 제공하기 위한 디자인
                        시스템입니다. WCAG 2.1과 KWCAG 2.2 표준을 준수합니다.
                      </Body>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <h3>
                      <AccordionTrigger>
                        시맨틱 HTML이 왜 중요한가요?
                      </AccordionTrigger>
                    </h3>
                    <AccordionContent>
                      <Body>
                        시맨틱 HTML은 스크린 리더 사용자가 페이지 구조를 빠르게
                        파악하고 원하는 섹션으로 쉽게 이동할 수 있게 합니다.
                        제목 태그(h1-h6)는 문서 계층 구조를 나타냅니다.
                      </Body>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Multiple Open">
                <Body className="leading-relaxed">
                  type="multiple"로 설정하면 여러 패널을 동시에 열 수 있습니다:
                </Body>
              </SectionHeading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Accordion type="multiple">
  <AccordionItem value="item-1">
    <h3>
      <AccordionTrigger>개인정보</AccordionTrigger>
    </h3>
    <AccordionContent>
      <Body>이름, 이메일, 전화번호 등을 관리합니다.</Body>
    </AccordionContent>
  </AccordionItem>
  {/* ... 더 많은 아이템 */}
</Accordion>`}
              </Code>

              <Card variant="outlined" className="mt-3">
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="item-1">
                    <h3>
                      <AccordionTrigger>개인정보</AccordionTrigger>
                    </h3>
                    <AccordionContent>
                      <Body>이름, 이메일, 전화번호 등을 관리합니다.</Body>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <h3>
                      <AccordionTrigger>보안 설정</AccordionTrigger>
                    </h3>
                    <AccordionContent>
                      <Body>비밀번호 변경, 2단계 인증 등을 설정합니다.</Body>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <h3>
                      <AccordionTrigger>알림 설정</AccordionTrigger>
                    </h3>
                    <AccordionContent>
                      <Body>이메일 및 푸시 알림 수신 여부를 관리합니다.</Body>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Line Variant">
                <Body className="leading-relaxed">
                  variant="line"으로 설정하면 구분선 스타일로 표시됩니다:
                </Body>
              </SectionHeading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Accordion type="single" collapsible variant="line">
  <AccordionItem value="item-1">
    <h3>
      <AccordionTrigger>배송 정책</AccordionTrigger>
    </h3>
    <AccordionContent>
      <Body>국내 배송은 주문 후 2-3일 소요되며...</Body>
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
              </Code>

              <Card variant="outlined" className="mt-3">
                <Accordion
                  type="single"
                  collapsible
                  variant="line"
                  className="w-full"
                >
                  <AccordionItem value="item-1">
                    <h3>
                      <AccordionTrigger>배송 정책</AccordionTrigger>
                    </h3>
                    <AccordionContent>
                      <Body>
                        국내 배송은 주문 후 2-3일 소요되며, 50,000원 이상 구매
                        시 무료배송입니다.
                      </Body>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <h3>
                      <AccordionTrigger>환불 정책</AccordionTrigger>
                    </h3>
                    <AccordionContent>
                      <Body>
                        제품 수령 후 7일 이내 미개봉 상태에서 환불이 가능합니다.
                      </Body>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <h3>
                      <AccordionTrigger>교환 정책</AccordionTrigger>
                    </h3>
                    <AccordionContent>
                      <Body>
                        불량 제품인 경우 무상으로 교환해드리며, 단순 변심인 경우
                        배송비가 발생할 수 있습니다.
                      </Body>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="기본값 설정">
                <Body className="leading-relaxed">
                  defaultValue로 초기에 열릴 패널을 지정할 수 있습니다:
                </Body>
              </SectionHeading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Accordion type="single" collapsible defaultValue="item-2">
  <AccordionItem value="item-2">
    <h3>
      <AccordionTrigger>Step 2: 프로필 작성</AccordionTrigger>
    </h3>
    <AccordionContent>
      <Body>이름, 프로필 사진, 자기소개를 입력합니다.</Body>
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="실제 사용 예시">
                <Body className="leading-relaxed">
                  AccordionContent 내부에 복잡한 콘텐츠를 포함할 수 있습니다:
                </Body>
              </SectionHeading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <h3>
      <AccordionTrigger>Basic Plan</AccordionTrigger>
    </h3>
    <AccordionContent>
      <Card>
        <CardBody>
          <Stack gap="sm">
            <Heading level="h4">월 9,900원</Heading>
            <Body>
              • 개인 사용자 1명<br />
              • 스토리지 10GB<br />
              • 이메일 지원
            </Body>
          </Stack>
        </CardBody>
      </Card>
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
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
              <DoCard title="Accordion을 사용하기 적합한 경우">
                <List variant="check">
                  <ListItem>
                    모바일 화면이나 사이드 패널처럼 제한된 공간에서 여러 섹션을
                    표시할 때
                  </ListItem>
                  <ListItem>
                    사용자가 여러 섹션 중 필요한 부분만 선택적으로 확인하면 될
                    때
                  </ListItem>
                  <ListItem>
                    관련된 여러 섹션의 개요를 빠르게 비교해야 할 때
                  </ListItem>
                  <ListItem>
                    FAQ, 정책 문서 등 여러 질문이나 항목을 카테고리별로 정리할
                    때
                  </ListItem>
                </List>
              </DoCard>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="언제 사용하지 말아야 하나요?" />
              <DontCard title="Accordion 사용을 피해야 하는 경우">
                <List variant="dash">
                  <ListItem>
                    사용자가 반드시 검토해야 하는 중요한 정보 (직접 표시 권장)
                  </ListItem>
                  <ListItem>
                    이미 아코디언이나 탭이 있는 곳에 추가하는 경우 (인지 부하
                    증가)
                  </ListItem>
                  <ListItem>
                    로딩 지연이 발생하는 무거운 콘텐츠를 포함하는 경우
                  </ListItem>
                  <ListItem>
                    일반 제목만으로도 충분히 구조화할 수 있는 간단한 콘텐츠
                  </ListItem>
                </List>
              </DontCard>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="접근성 가이드라인" />
              <List>
                <ListItem>
                  <strong>시맨틱 제목 구조:</strong> AccordionTrigger를 h1-h6로
                  감싸서 스크린 리더 사용자가 빠르게 탐색할 수 있도록 합니다.
                </ListItem>
                <ListItem>
                  <strong>키보드 네비게이션:</strong> Tab/Shift+Tab으로 헤더 간
                  이동, Enter/Space로 토글이 가능합니다.
                </ListItem>
                <ListItem>
                  <strong>시각적 방향성:</strong> 아이콘으로 펼침(∨)/접힘(∧)
                  상태를 명확히 표시합니다.
                </ListItem>
                <ListItem>
                  <strong>포커스 가시성:</strong> 키보드 포커스 시 명확한 포커스
                  링이 표시됩니다.
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="사용성 권장사항" />
              <List>
                <ListItem>
                  아이콘을 헤더 끝에 일관되게 배치하여 시선 피로를 줄입니다.
                </ListItem>
                <ListItem>
                  헤더 전체 영역을 클릭 가능하게 만들어 상호작용을 쉽게 합니다.
                </ListItem>
                <ListItem>
                  간격, 색상, 그림자, 테두리로 헤더-패널 관계를 명확히 합니다.
                </ListItem>
                <ListItem>
                  패널 내부에 별도 스크롤바를 만들지 말고 페이지 스크롤을
                  사용합니다.
                </ListItem>
              </List>
            </Subsection>
          </Section>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
          <Section level="h2">
            <SectionHeading level="h2" id="api" title="API Reference" />

            <Subsection level="h3">
              <SectionHeading level="h3" title="Accordion Props" />

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
                    <TableCell className="font-mono">type</TableCell>
                    <TableCell className="font-mono">
                      &apos;single&apos; | &apos;multiple&apos;
                    </TableCell>
                    <TableCell className="font-mono">
                      &apos;single&apos;
                    </TableCell>
                    <TableCell>
                      한 번에 하나만 열기(single) 또는 여러 개 열기(multiple)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">collapsible</TableCell>
                    <TableCell className="font-mono">boolean</TableCell>
                    <TableCell className="font-mono">false</TableCell>
                    <TableCell>
                      열린 패널을 다시 닫을 수 있는지 (type="single"일 때만)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">defaultValue</TableCell>
                    <TableCell className="font-mono">
                      string | string[]
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>기본으로 열릴 패널의 value</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">value</TableCell>
                    <TableCell className="font-mono">
                      string | string[]
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      제어 모드: 열린 패널의 value (controlled)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">onValueChange</TableCell>
                    <TableCell className="font-mono">
                      (value: string | string[]) =&gt; void
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>패널이 열리거나 닫힐 때 호출되는 콜백</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">variant</TableCell>
                    <TableCell className="font-mono">
                      &apos;default&apos; | &apos;line&apos;
                    </TableCell>
                    <TableCell className="font-mono">
                      &apos;default&apos;
                    </TableCell>
                    <TableCell>
                      스타일 변형 (default: 박스형, line: 구분선)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">className</TableCell>
                    <TableCell className="font-mono">string</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="AccordionItem Props" />

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
                    <TableCell className="font-mono">value</TableCell>
                    <TableCell className="font-mono">string</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>패널을 식별하는 고유 값 (required)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">className</TableCell>
                    <TableCell className="font-mono">string</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="AccordionTrigger Props" />

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
                    <TableCell className="font-mono">disabled</TableCell>
                    <TableCell className="font-mono">boolean</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>비활성화 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">className</TableCell>
                    <TableCell className="font-mono">string</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Card variant="info" className="mt-4">
                <Body>
                  <strong>중요:</strong> KRDS 접근성을 위해 AccordionTrigger는
                  반드시 시맨틱 제목 태그(h1-h6)로 감싸야 합니다.
                </Body>
                <Code variant="block" language="tsx" showLineNumbers={false}>
                  {`<h3>
  <AccordionTrigger>제목</AccordionTrigger>
</h3>`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Foundation Layer" />

              <Body className="mb-3">
                Accordion 컴포넌트는 Foundation Layer 아키텍처를 통해 개발자가
                직접 관리하지 않아도 KRDS 접근성 기준을 자동으로 충족합니다:
              </Body>

              <List>
                <ListItem>
                  <strong>ARIA Automation:</strong> aria-expanded,
                  aria-controls, aria-labelledby 속성이 자동으로 설정되며, 고유
                  ID 자동 생성으로 ARIA 속성 충돌을 방지합니다.
                </ListItem>
                <ListItem>
                  <strong>Keyboard Navigation:</strong> Tab/Shift+Tab으로
                  아코디언 헤더 간 순차적 접근, Enter/Space로 패널 토글이
                  가능합니다.
                </ListItem>
                <ListItem>
                  <strong>Semantic Heading Structure:</strong>{' '}
                  AccordionTrigger를 h1-h6로 감싸서 문서 계층 구조를 표현하고,
                  스크린 리더 사용자가 헤딩 목록으로 빠르게 원하는 섹션으로
                  이동할 수 있습니다.
                </ListItem>
                <ListItem>
                  <strong>Visual Direction:</strong> 아이콘이 펼침/접힘 상태에
                  따라 자동 회전하며(∨ ↔ ∧), 색상만으로 상태를 구별하지 않아
                  KRDS 색상 독립성을 준수합니다.
                </ListItem>
              </List>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation next={{ title: 'Card', href: '/components/card' }} />
    </>
  );
}
