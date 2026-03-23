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
              {`import { Identifier } from '@/components/hanui/identifier'

<Identifier
  organizationName="행정안전부"
  logo="/path/to/logo.svg"
  logoAlt="기관 로고"
/>`}
            </Code>
          </Section>

          <Section level="h2">
            <Installation componentName="identifier" />
          </Section>

          {/* Usage */}
          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />

            <Subsection level="h3">
              <Heading level="h3" title="기본 사용" />
              <Code variant="block" language="tsx">
                {`import { Identifier } from '@/components/hanui/identifier'

<Identifier organizationName="행정안전부" />`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="로고와 함께" />
              <Code variant="block" language="tsx">
                {`<Identifier
  organizationName="행정안전부"
  logo="/path/to/logo.svg"
  logoAlt="행정안전부 로고"
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="커스텀 텍스트" />
              <Code variant="block" language="tsx">
                {`<Identifier
  organizationName="행정안전부"
  text="이 서비스는 {organization}의 공식 누리집입니다"
/>`}
              </Code>
            </Subsection>
          </Section>

          {/* Accessibility */}
          <Section level="h2">
            <Heading level="h2" id="accessibility" title="접근성" />

            <List variant="unordered">
              <ListItem>
                <strong>대체 텍스트:</strong> 로고 이미지 alt 텍스트 필수
                (logoAlt prop)
              </ListItem>
              <ListItem>
                <strong>시맨틱 HTML:</strong> 명확한 구조로 스크린 리더 지원
              </ListItem>
              <ListItem>
                <strong>성능 최적화:</strong> 로고 이미지 lazy loading 자동 적용
              </ListItem>
              <ListItem>
                <strong>WCAG 2.1 준수:</strong> Level A 기준 완전 준수
              </ListItem>
            </List>
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

          {/* CSS Classes */}
          <Section level="h2">
            <Heading level="h2" id="css-classes" title="CSS 클래스" />

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
          </Section>

          {/* CSS Variables */}
          <Section level="h2">
            <Heading level="h2" id="css-variables" title="CSS 변수" />

            <Code variant="block" language="css">
              {`/* 간격 */
--krds-gap-3              /* 0.75rem */

/* 색상 - Light Variant */
--krds-color-light-gray-70

/* 색상 - Dark Variant */
--krds-color-light-gray-30`}
            </Code>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Heading', href: '/components/section-heading' }}
        next={{
          title: 'Image',
          href: '/components/image',
        }}
      />
    </>
  );
}
