'use client';

// Docs layout components
import {
  PageSection as Section,
  SectionHeading,
  Subsection,
  PageNavigation,
} from '@/components/content';

// Docs helper components
import { DoCard, DontCard } from '@/components/helpers';

// UI components - from @hanui/react
import {
  Body,
  Code,
  Card,
  Stack,
  List,
  ListItem,
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
// Docs helper components (moved above)

export default function BodyPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Body"
        description="본문 텍스트를 위한 컴포넌트입니다. KRDS 타이포그래피 시스템을 준수하며 다양한 크기와 굵기를 제공합니다."
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
              description="Body 컴포넌트는 @hanui/react 패키지에 포함되어 있습니다."
            />

            <Code variant="block" language="bash" showLineNumbers={false}>
              {`npx @hanui/cli add body`}
            </Code>
          </Section>

          {/* What is it */}
          <Section>
            <SectionHeading
              level="h2"
              id="what-is-it"
              title="무엇인가요?"
              description="Body는 KRDS 타이포그래피 시스템의 본문 텍스트 스타일입니다."
            />

            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>4가지 크기:</strong> Large(19px), Medium(17px),
                  Small(15px), XSmall(13px)를 제공합니다.
                </ListItem>
                <ListItem>
                  <strong>2가지 굵기:</strong> Regular(400)와 Bold(700)를
                  지원합니다.
                </ListItem>
                <ListItem>
                  <strong>150% 줄 간격:</strong> KRDS 기준에 따라 가독성을
                  보장합니다.
                </ListItem>
                <ListItem>
                  <strong>Polymorphic:</strong> p, span, div 등 다양한 HTML
                  태그로 렌더링할 수 있습니다.
                </ListItem>
                <ListItem>
                  <strong>Pretendard GOV:</strong> 한국 정부 웹사이트 최적화
                  폰트를 사용합니다.
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* Preview */}
          <Section>
            <SectionHeading
              level="h2"
              id="preview"
              title="미리보기"
              description="Body 컴포넌트의 다양한 크기를 확인할 수 있습니다."
            />

            <Card variant="outlined" className="p-6">
              <Stack gap="lg">
                <Body size="lg">Large - 본문 텍스트입니다</Body>
                <Body size="md">Medium - 본문 텍스트입니다</Body>
                <Body size="sm">Small - 본문 텍스트입니다</Body>
                <Body size="xs">XSmall - 본문 텍스트입니다</Body>
              </Stack>
            </Card>
          </Section>

          {/* Sizes */}
          <Section>
            <SectionHeading
              level="h2"
              id="sizes"
              title="크기 (Size)"
              description="4가지 크기를 제공하여 다양한 콘텐츠 요구사항을 충족합니다."
            />

            <Stack gap="lg">
              <Card variant="outlined" className="p-6">
                <Stack gap="sm">
                  <Body size="lg">
                    Large - 주요 본문이나 중요한 설명에 사용하는 텍스트입니다.
                    가독성이 높아 중요한 정보 전달에 적합합니다.
                  </Body>
                  <Body size="sm" className="text-krds-gray-70">
                    19px · 400 (Regular) · 150% 줄 간격
                  </Body>
                  <Code variant="block" language="tsx" showLineNumbers={false}>
                    {`<Body size="lg">주요 본문 텍스트</Body>`}
                  </Code>
                </Stack>
              </Card>

              <Card variant="outlined" className="p-6">
                <Stack gap="sm">
                  <Body size="md">
                    Medium - 일반적인 본문 텍스트에 사용합니다. 가장 기본이 되는
                    크기로 대부분의 콘텐츠에 적용됩니다.
                  </Body>
                  <Body size="sm" className="text-krds-gray-70">
                    17px · 400 (Regular) · 150% 줄 간격
                  </Body>
                  <Code variant="block" language="tsx" showLineNumbers={false}>
                    {`<Body size="md">일반 본문 텍스트</Body>`}
                  </Code>
                </Stack>
              </Card>

              <Card variant="outlined" className="p-6">
                <Stack gap="sm">
                  <Body size="sm">
                    Small - 보조 설명이나 부가 정보에 사용합니다. 작지만 여전히
                    읽기 편한 크기입니다.
                  </Body>
                  <Body size="sm" className="text-krds-gray-70">
                    15px · 400 (Regular) · 150% 줄 간격
                  </Body>
                  <Code variant="block" language="tsx" showLineNumbers={false}>
                    {`<Body size="sm">보조 설명 텍스트</Body>`}
                  </Code>
                </Stack>
              </Card>

              <Card variant="outlined" className="p-6">
                <Stack gap="sm">
                  <Body size="xs">
                    XSmall - 캡션, 각주, 메타 정보 등에 사용합니다. 가장 작은
                    크기입니다.
                  </Body>
                  <Body size="sm" className="text-krds-gray-70">
                    13px · 400 (Regular) · 150% 줄 간격
                  </Body>
                  <Code variant="block" language="tsx" showLineNumbers={false}>
                    {`<Body size="xs">캡션 텍스트</Body>`}
                  </Code>
                </Stack>
              </Card>
            </Stack>
          </Section>

          {/* Weights */}
          <Section>
            <SectionHeading
              level="h2"
              id="weights"
              title="굵기 (Weight)"
              description="Regular와 Bold 두 가지 굵기를 제공합니다."
            />

            <Stack gap="lg">
              <Card variant="outlined" className="p-6">
                <Stack gap="sm">
                  <Body size="md" weight="regular">
                    Regular (400) - 일반적인 본문 텍스트에 사용하는 기본
                    굵기입니다.
                  </Body>
                  <Code variant="block" language="tsx" showLineNumbers={false}>
                    {`<Body size="md" weight="regular">일반 텍스트</Body>`}
                  </Code>
                </Stack>
              </Card>

              <Card variant="outlined" className="p-6">
                <Stack gap="sm">
                  <Body size="md" weight="bold">
                    Bold (700) - 강조가 필요한 본문 텍스트에 사용합니다.
                  </Body>
                  <Code variant="block" language="tsx" showLineNumbers={false}>
                    {`<Body size="md" weight="bold">강조 텍스트</Body>`}
                  </Code>
                </Stack>
              </Card>
            </Stack>
          </Section>

          {/* Examples */}
          <Section>
            <SectionHeading
              level="h2"
              id="examples"
              title="예제"
              description="Body 컴포넌트의 실제 사용 예제입니다."
            />

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                title="문서 콘텐츠"
                description="다양한 크기를 조합하여 문서 콘텐츠를 구성하는 예제입니다."
              />

              <Card variant="outlined" className="p-6">
                <Stack gap="md">
                  <Body size="lg" weight="bold">
                    공공서비스의 디지털 전환
                  </Body>
                  <Body size="md">
                    공공 분야의 디지털 전환은 시민들에게 더 나은 서비스를
                    제공하기 위한 중요한 과제입니다. KRDS는 이러한 디지털 전환을
                    지원하는 디자인 시스템입니다.
                  </Body>
                  <Body size="sm">
                    * 본 내용은 예시이며 실제 서비스와 다를 수 있습니다.
                  </Body>
                </Stack>
              </Card>

              <Code variant="block" language="tsx">
                {`<Body size="lg" weight="bold">공공서비스의 디지털 전환</Body>
<Body size="md">
  공공 분야의 디지털 전환은 시민들에게 더 나은 서비스를 제공하기 위한
  중요한 과제입니다.
</Body>
<Body size="sm">
  * 본 내용은 예시이며 실제 서비스와 다를 수 있습니다.
</Body>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                title="다양한 HTML 태그"
                description="as 속성을 사용하여 다양한 HTML 태그로 렌더링할 수 있습니다."
              />

              <Card variant="outlined" className="p-6">
                <Stack gap="sm">
                  <Body as="p" size="md">
                    p 태그로 렌더링된 문단
                  </Body>
                  <Body as="span" size="sm">
                    span 태그로 렌더링된 인라인 텍스트
                  </Body>
                  <Body as="div" size="md">
                    div 태그로 렌더링된 블록
                  </Body>
                </Stack>
              </Card>

              <Code variant="block" language="tsx">
                {`<Body as="p" size="md">p 태그로 렌더링</Body>
<Body as="span" size="sm">span 태그로 렌더링</Body>
<Body as="div" size="md">div 태그로 렌더링</Body>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                title="커스텀 스타일"
                description="className을 통해 추가 스타일을 적용할 수 있습니다."
              />

              <Card variant="outlined" className="p-6">
                <Body size="md" className="text-krds-primary-base">
                  브랜드 컬러가 적용된 텍스트
                </Body>
              </Card>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Body size="md" className="text-krds-primary-base">
  브랜드 컬러가 적용된 텍스트
</Body>`}
              </Code>
            </Subsection>
          </Section>

          {/* Guidelines */}
          <Section>
            <SectionHeading
              level="h2"
              id="guidelines"
              title="사용 가이드라인"
              description="Body 컴포넌트를 효과적으로 사용하기 위한 가이드입니다."
            />

            <Stack gap="lg">
              <DoCard>
                <ListItem>일반 문단과 본문 콘텐츠</ListItem>
                <ListItem>설명 텍스트</ListItem>
                <ListItem>리스트 항목</ListItem>
                <ListItem>카드 내용</ListItem>
                <ListItem>캡션 및 메타 정보</ListItem>
              </DoCard>

              <DontCard>
                <ListItem>페이지 제목 (Heading 사용 권장)</ListItem>
                <ListItem>배너 텍스트 (Display 사용 권장)</ListItem>
                <ListItem>폼 라벨 (Label 사용 권장)</ListItem>
                <ListItem>네비게이션 메뉴 (NavText 사용 권장)</ListItem>
              </DontCard>
            </Stack>
          </Section>

          {/* KRDS Compliance */}
          <Section>
            <SectionHeading
              level="h2"
              id="krds"
              title="KRDS 준수사항"
              description="Body 컴포넌트가 준수하는 KRDS 기준입니다."
            />

            <Card
              variant="outlined"
              className="bg-krds-primary-5 border-krds-primary-20"
            >
              <List variant="check" className="text-krds-gray-90">
                <ListItem>150% 줄 간격으로 가독성 확보</ListItem>
                <ListItem>
                  4단계 크기 시스템 (Large, Medium, Small, XSmall)
                </ListItem>
                <ListItem>2단계 굵기 시스템 (Regular, Bold)</ListItem>
                <ListItem>Pretendard GOV 폰트 적용</ListItem>
              </List>
            </Card>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          {/* API Reference */}
          <Section>
            <SectionHeading level="h2" id="api" title="API Reference" />

            <Subsection level="h3">
              <SectionHeading level="h3" title="Props" />

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
                    <TableCell className="font-mono">size</TableCell>
                    <TableCell className="font-mono">
                      "lg" | "md" | "sm" | "xs"
                    </TableCell>
                    <TableCell className="font-mono">"md"</TableCell>
                    <TableCell>텍스트 크기</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">weight</TableCell>
                    <TableCell className="font-mono">
                      "regular" | "bold"
                    </TableCell>
                    <TableCell className="font-mono">"regular"</TableCell>
                    <TableCell>폰트 굵기</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">as</TableCell>
                    <TableCell className="font-mono">
                      "p" | "span" | "div"
                    </TableCell>
                    <TableCell className="font-mono">"p"</TableCell>
                    <TableCell>렌더링할 HTML 태그</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">className</TableCell>
                    <TableCell className="font-mono">string</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">children</TableCell>
                    <TableCell className="font-mono">ReactNode</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>텍스트 내용</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Size Values" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Value</TableHead>
                    <TableHead>Font Size</TableHead>
                    <TableHead>Line Height</TableHead>
                    <TableHead>Usage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">lg</TableCell>
                    <TableCell>19px</TableCell>
                    <TableCell>150%</TableCell>
                    <TableCell>큰 본문 텍스트, 강조 문단</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">md</TableCell>
                    <TableCell>17px</TableCell>
                    <TableCell>150%</TableCell>
                    <TableCell>기본 본문 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">sm</TableCell>
                    <TableCell>15px</TableCell>
                    <TableCell>150%</TableCell>
                    <TableCell>보조 설명, 부가 정보</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">xs</TableCell>
                    <TableCell>13px</TableCell>
                    <TableCell>150%</TableCell>
                    <TableCell>캡션, 각주, 메타 정보</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Weight Values" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Value</TableHead>
                    <TableHead>Font Weight</TableHead>
                    <TableHead>Usage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">regular</TableCell>
                    <TableCell>400</TableCell>
                    <TableCell>일반 본문 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">bold</TableCell>
                    <TableCell>700</TableCell>
                    <TableCell>강조가 필요한 텍스트</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      {/* Page Navigation */}
      <PageNavigation
        prev={{ title: 'Accordion', href: '/components/accordion' }}
        next={{ title: 'Border Radius', href: '/components/border-radius' }}
      />
    </>
  );
}
