'use client';

// Docs layout components
import {
  PageSection as Section,
  Subsection,
  Heading,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';
import { ComponentPreview } from '@/components/content/ComponentPreview';

// UI components - from @hanui/react
import {
  Body,
  Card,
  Code,
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
  Identifier,
} from '@hanui/react';

export default function IdentifierPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Identifier"
        description="정부 디지털 서비스의 운영 기관을 식별하여 신뢰성을 구축하는 컴포넌트입니다. Footer 내 최종 콘텐츠 섹션으로 배치되어 서비스의 일관성과 브랜드를 확인할 수 있게 합니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Overview */}
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />

            <ComponentPreview>
              <Identifier organizationName="행정안전부" />
            </ComponentPreview>

            <Code variant="block" language="tsx">
              {`import { Identifier } from '@hanui/react'

<Identifier
  organizationName="행정안전부"
  logo="/path/to/logo.svg"
  logoAlt="기관 로고"
/>`}
            </Code>
          </Section>

          <Installation componentName="identifier" />

          {/* What is it */}
          <Section level="h2">
            <Heading level="h2" id="what-is-it" title="Identifier란?" />

            <Body className="text-krds-gray-70">
              Identifier(운영기관 식별자)는 정부 디지털 서비스를 운영하는 기관을
              명시하여 서비스의 신뢰성을 구축하는 컴포넌트입니다.
            </Body>

            <Body className="text-krds-gray-70 mt-4">
              KRDS 표준에 따라 Footer의 최종 섹션에 배치되며, 서비스 로고가 아닌
              운영 기관의 로고를 사용하여 정부 서비스 전체의 일관된 브랜드
              경험을 제공합니다.
            </Body>

            <Card variant="info" className="mt-4">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>KRDS 표준 준수:</strong> 자동으로 .krds-identifier
                  클래스 적용
                </ListItem>
                <ListItem>
                  <strong>접근성:</strong> 로고 이미지 alt 텍스트 필수 제공
                </ListItem>
                <ListItem>
                  <strong>유연한 로고 지원:</strong> 이미지 URL 또는 React
                  엘리먼트 모두 지원
                </ListItem>
                <ListItem>
                  <strong>텍스트 커스터마이징:</strong> {'{organization}'}{' '}
                  플레이스홀더 사용 가능
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* Usage Examples */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="사용 예제" />

            <Subsection level="h3">
              <Heading level="h3" title="기본 사용 (Light Variant)" />
              <Body className="mb-4 text-krds-gray-70">
                기본 Identifier는 라이트 배경에 기관 이름을 표시합니다. Footer
                내 최종 섹션으로 배치해야 합니다.
              </Body>

              <ComponentPreview>
                <Identifier organizationName="행정안전부" />
              </ComponentPreview>

              <Code variant="block" language="tsx">
                {`<Identifier organizationName="행정안전부" />`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="로고와 함께 사용 (권장)" />
              <Body className="mb-4 text-krds-gray-70">
                운영 기관의 로고를 포함하여 시각적 식별성을 강화합니다. 로고
                이미지는 반드시 alt 텍스트를 제공해야 합니다.
              </Body>

              <ComponentPreview>
                <Identifier organizationName="행정안전부" />
              </ComponentPreview>

              <Code variant="block" language="tsx">
                {`<Identifier
  organizationName="행정안전부"
  logo="/path/to/logo.svg"
  logoAlt="행정안전부 로고"
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Dark Variant" />
              <Body className="mb-4 text-krds-gray-70">
                다크 배경 테마에 맞춘 variant를 사용할 수 있습니다.
              </Body>

              <ComponentPreview className="bg-krds-gray-90 p-4">
                <Identifier organizationName="행정안전부" variant="dark" />
              </ComponentPreview>

              <Code variant="block" language="tsx">
                {`<Identifier
  organizationName="행정안전부"
  logo="/logo.svg"
  logoAlt="행정안전부 로고"
  variant="dark"
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Footer 구조 내 배치 (권장)" />
              <Body className="mb-4 text-krds-gray-70">
                실제 정부 누리집에서 Identifier를 Footer의 최종 섹션으로
                배치하는 예시입니다.
              </Body>

              <ComponentPreview>
                <div className="border border-krds-gray-20 rounded-lg overflow-hidden">
                  <footer className="bg-krds-white">
                    <div className="p-6 border-b border-krds-gray-20">
                      <Body className="font-bold mb-2">정부 누리집 Footer</Body>
                      <Body className="text-sm text-krds-gray-70">
                        관련 링크, 저작권 정보, 연락처 등
                      </Body>
                    </div>
                    <div className="p-6">
                      <Identifier organizationName="행정안전부" />
                    </div>
                  </footer>
                </div>
              </ComponentPreview>

              <Code variant="block" language="tsx">
                {`import { Identifier } from '@hanui/react';

<footer>
  <div>
    {/* Footer 콘텐츠: 링크, 저작권, 연락처 등 */}
  </div>

  {/* Identifier를 최종 섹션으로 배치 */}
  <Identifier
    organizationName="행정안전부"
    logo="/logo.svg"
    logoAlt="행정안전부 로고"
  />
</footer>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="커스텀 텍스트" />
              <Body className="mb-4 text-krds-gray-70">
                text prop을 사용하여 표시 텍스트를 커스터마이징할 수 있습니다.{' '}
                {'{organization}'} 플레이스홀더를 사용하면 자동으로 기관명으로
                치환됩니다.
              </Body>

              <ComponentPreview>
                <Identifier
                  organizationName="행정안전부"
                  text="이 서비스는 {organization}의 공식 누리집입니다"
                />
              </ComponentPreview>

              <Code variant="block" language="tsx">
                {`<Identifier
  organizationName="행정안전부"
  logo="/logo.svg"
  logoAlt="행정안전부 로고"
  text="이 서비스는 {organization}의 공식 누리집입니다"
/>`}
              </Code>
            </Subsection>
          </Section>

          {/* Best Practices */}
          <Section level="h2">
            <Heading level="h2" id="best-practices" title="모범 사례" />

            <Subsection level="h3">
              <Heading level="h3" title="언제 사용하나요?" />

              <Card variant="info">
                <List variant="check" className="text-krds-gray-90">
                  <ListItem>
                    정부 공식 디지털 서비스 - 대한민국 정부 기관의 공식 웹사이트
                  </ListItem>
                  <ListItem>
                    Footer 최종 섹션 - Footer 내 마지막 콘텐츠 영역으로 배치
                  </ListItem>
                  <ListItem>
                    운영 기관 명시 - 서비스를 운영하는 기관을 명확히 표시
                  </ListItem>
                  <ListItem>
                    브랜드 일관성 - 정부 서비스 전체의 일관된 브랜드 경험 제공
                  </ListItem>
                </List>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="피해야 할 사항" />

              <Card variant="warning">
                <List variant="cross" className="text-krds-gray-90">
                  <ListItem>
                    비정부 웹사이트 - 정부 기관이 아닌 민간 사이트
                  </ListItem>
                  <ListItem>
                    서비스 로고 대체 - 운영 기관 로고 영역에 서비스 로고 사용
                    금지
                  </ListItem>
                  <ListItem>
                    Footer 외 배치 - Header나 본문에 배치하면 안됨
                  </ListItem>
                </List>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="디자인 원칙" />

              <List variant="unordered">
                <ListItem>
                  <strong>시각적 절제:</strong> 지나치게 주의를 끌지 않는
                  subtle한 표현을 사용합니다
                </ListItem>
                <ListItem>
                  <strong>일관된 배치:</strong> Footer 최종 섹션에 일관되게
                  위치합니다
                </ListItem>
                <ListItem>
                  <strong>운영 기관 로고:</strong> 서비스 로고가 아닌 운영 기관
                  로고를 사용합니다
                </ListItem>
                <ListItem>
                  <strong>두 가지 Variant:</strong> Light/Dark 배경 테마를
                  지원합니다
                </ListItem>
              </List>
            </Subsection>
          </Section>

          {/* Accessibility */}
          <Section level="h2">
            <Heading level="h2" id="accessibility" title="접근성" />

            <Body className="mb-4 text-krds-gray-70">
              이 컴포넌트는 WCAG 2.1 / KWCAG 2.2 Level A 기준을 준수합니다.
            </Body>

            <List variant="unordered">
              <ListItem>
                <strong>대체 텍스트:</strong> 로고 이미지에 alt 텍스트 필수 제공
                (logoAlt prop)
              </ListItem>
              <ListItem>
                <strong>시맨틱 HTML:</strong> div 요소로 구조화된 콘텐츠 영역을
                제공합니다
              </ListItem>
              <ListItem>
                <strong>정보 관계:</strong> WCAG 2.1 Level A Info and
                Relationships (1.3.1) 준수
              </ListItem>
              <ListItem>
                <strong>스크린 리더:</strong> 로고와 텍스트가 명확하게 읽히며
                운영 기관 정보를 정확하게 전달합니다
              </ListItem>
              <ListItem>
                <strong>성능 최적화:</strong> 로고 이미지에 lazy loading이
                자동으로 적용됩니다
              </ListItem>
            </List>
          </Section>

          {/* Foundation Layer */}
          <Section level="h2">
            <Heading
              level="h2"
              id="foundation-layer"
              title="Foundation Layer"
            />

            <Body className="mb-4 text-krds-gray-70">
              Identifier 컴포넌트는 다음 기능들을 자동으로 처리합니다:
            </Body>

            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>KRDS 필수 클래스:</strong>{' '}
                  <Code>.krds-identifier</Code> 클래스가 자동으로 적용됩니다
                  (KRDS 필수 요구사항)
                </ListItem>
                <ListItem>
                  <strong>Alt 텍스트 검증:</strong> logo가 string일 때 logoAlt
                  누락 시 자동으로 경고를 표시합니다
                </ListItem>
                <ListItem>
                  <strong>플레이스홀더 치환:</strong> text prop의{' '}
                  <Code>{'{organization}'}</Code> 플레이스홀더를 자동으로
                  organizationName으로 치환합니다
                </ListItem>
                <ListItem>
                  <strong>유연한 로고 지원:</strong> 이미지 URL 또는 React
                  엘리먼트(SVG 컴포넌트 등)를 모두 지원합니다
                </ListItem>
                <ListItem>
                  <strong>성능 최적화:</strong> 로고 이미지에 lazy loading이
                  자동으로 적용됩니다
                </ListItem>
                <ListItem>
                  <strong>반응형 디자인:</strong> 모든 화면 크기에서 최적화된
                  표시를 제공합니다
                </ListItem>
              </List>
            </Card>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          {/* Props */}
          <Section level="h2">
            <Heading level="h2" id="props" title="Props" />

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
                  <TableCell>
                    <Code>organizationName</Code>
                  </TableCell>
                  <TableCell>
                    <Code>string</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>운영 기관 이름 (필수)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>logo</Code>
                  </TableCell>
                  <TableCell>
                    <Code>string | ReactNode</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    기관 로고 (이미지 URL 또는 React 엘리먼트)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>logoAlt</Code>
                  </TableCell>
                  <TableCell>
                    <Code>string</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    로고 alt 텍스트 (logo가 string일 때 필수)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>variant</Code>
                  </TableCell>
                  <TableCell>
                    <Code>&apos;light&apos; | &apos;dark&apos;</Code>
                  </TableCell>
                  <TableCell>
                    <Code>&apos;light&apos;</Code>
                  </TableCell>
                  <TableCell>시각적 테마 변형</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>text</Code>
                  </TableCell>
                  <TableCell>
                    <Code>string</Code>
                  </TableCell>
                  <TableCell>
                    <Code>
                      &quot;이 누리집은 {'{organization}'} 누리집입니다.&quot;
                    </Code>
                  </TableCell>
                  <TableCell>
                    커스텀 텍스트 (<Code>{'{organization}'}</Code> 플레이스홀더
                    사용 가능)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>className</Code>
                  </TableCell>
                  <TableCell>
                    <Code>string</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>추가 CSS 클래스</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Section>

          {/* Usage Examples */}
          <Section level="h2">
            <Heading level="h2" id="usage-examples" title="사용 예제" />

            <Subsection level="h3">
              <Heading level="h3" title="기본 사용" />
              <Code variant="block" language="tsx">
                {`<Identifier
  organizationName="행정안전부"
  logo="/path/to/logo.svg"
  logoAlt="행정안전부 로고"
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Dark variant" />
              <Code variant="block" language="tsx">
                {`<Identifier
  organizationName="행정안전부"
  logo="/path/to/logo.svg"
  logoAlt="행정안전부 로고"
  variant="dark"
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="커스텀 로고 엘리먼트" />
              <Code variant="block" language="tsx">
                {`<Identifier
  organizationName="행정안전부"
  logo={<CustomLogoSVG />}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="커스텀 텍스트" />
              <Code variant="block" language="tsx">
                {`<Identifier
  organizationName="행정안전부"
  logo="/logo.svg"
  logoAlt="행정안전부 로고"
  text="이 서비스는 {organization}의 공식 누리집입니다"
/>`}
              </Code>
            </Subsection>
          </Section>

          {/* KRDS Standards */}
          <Section level="h2">
            <Heading level="h2" id="krds-standards" title="KRDS 표준" />

            <Card variant="info">
              <Body className="font-semibold mb-3">준수하는 KRDS 표준:</Body>
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>필수 클래스:</strong> <Code>.krds-identifier</Code>{' '}
                  클래스 자동 적용 (KRDS 필수 요구사항)
                </ListItem>
                <ListItem>
                  <strong>Footer 배치:</strong> Footer 내 최종 섹션으로 배치
                  (KRDS 레이아웃 표준)
                </ListItem>
                <ListItem>
                  <strong>운영 기관 로고:</strong> 서비스 로고가 아닌 운영 기관
                  로고 사용
                </ListItem>
                <ListItem>
                  <strong>KRDS 색상 시스템:</strong> var(--krds-color-*) CSS
                  변수 사용
                </ListItem>
                <ListItem>
                  <strong>접근성:</strong> alt 텍스트 필수 제공으로 WCAG 2.1
                  준수
                </ListItem>
                <ListItem>
                  <strong>반응형:</strong> 모바일에서 텍스트 줄바꿈 최적화
                </ListItem>
              </List>
            </Card>

            <Card variant="warning" className="mt-4">
              <Body className="font-medium mb-2">중요사항:</Body>
              <List variant="unordered">
                <ListItem>
                  Identifier는 자동으로 <Code>.krds-identifier</Code> 클래스를
                  적용하여 KRDS 표준을 준수합니다
                </ListItem>
                <ListItem>
                  반드시 Footer 내 최종 섹션으로 배치해야 합니다
                </ListItem>
                <ListItem>
                  운영 기관 로고를 사용하며, 서비스 로고를 사용하면 안됩니다
                </ListItem>
                <ListItem>정부 공식 디지털 서비스에만 사용해야 합니다</ListItem>
              </List>
            </Card>
          </Section>

          {/* CSS Classes */}
          <Section level="h2">
            <Heading level="h2" id="css-classes" title="CSS 클래스" />

            <Subsection level="h3">
              <Heading level="h3" title="주요 클래스" />
              <List variant="unordered">
                <ListItem>
                  <Code>.identifier</Code> - 메인 컨테이너
                </ListItem>
                <ListItem>
                  <Code>.logo</Code> - 로고 영역
                </ListItem>
                <ListItem>
                  <Code>.text</Code> - 텍스트 영역
                </ListItem>
                <ListItem>
                  <Code>.dark</Code> - Dark variant 클래스
                </ListItem>
              </List>
            </Subsection>
          </Section>

          {/* CSS Variables */}
          <Section level="h2">
            <Heading level="h2" id="css-variables" title="CSS 변수" />

            <Subsection level="h3">
              <Heading level="h3" title="사용되는 KRDS 변수" />
              <Code variant="block" language="css">
                {`/* 간격 */
--krds-gap-3              /* 0.75rem - 로고와 텍스트 간격 */

/* 색상 - Light Variant */
--krds-color-light-gray-70   /* 텍스트 색상 */

/* 색상 - Dark Variant */
--krds-color-light-gray-30   /* 텍스트 색상 */`}
              </Code>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Heading', href: '/components/section-heading' }}
        next={{
          title: 'In-page Navigation',
          href: '/components/inpagenavigation',
        }}
      />
    </>
  );
}
