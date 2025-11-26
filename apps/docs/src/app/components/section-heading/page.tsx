'use client';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';
import { ComponentPreview } from '@/components/content/ComponentPreview';

// UI components - from @hanui/react
import {
  Heading as HeadingComponent,
  Body,
  Stack,
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
} from '@hanui/react';

export default function HeadingPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Heading"
        description="페이지 제목과 섹션 제목을 표시하는 컴포넌트"
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />
            <ComponentPreview>
              <Stack gap="lg">
                <HeadingComponent
                  level="h1"
                  title="페이지 제목"
                  description="페이지에 대한 설명을 함께 표시할 수 있습니다."
                />
                <HeadingComponent level="h2" title="섹션 제목" />
                <HeadingComponent level="h3" title="서브섹션 제목" />
              </Stack>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<Heading
  level="h1"
  title="페이지 제목"
  description="페이지에 대한 설명"
/>

<Heading level="h2" title="섹션 제목" />
<Heading level="h3" title="서브섹션 제목" />`}
            </Code>
          </Section>

          <Installation componentName="section-heading" />

          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />

            <Card variant="filled">
              <Body className="font-bold mb-3">
                ⚠️ 중요: Heading vs Display
              </Body>
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>Heading:</strong> 페이지 제목 (h1, h2, h3) - 일반적인
                  사용
                </ListItem>
                <ListItem>
                  <strong>Display:</strong> 마케팅, 프로모션, 배너용 대형 텍스트
                </ListItem>
              </List>
              <Body className="text-krds-gray-70 mt-3">
                페이지 구조의 제목에는 Heading을 사용하세요. Display는 마케팅
                콘텐츠 전용입니다.
              </Body>
            </Card>

            <Code variant="block" language="tsx">
              {`import { Heading } from '@hanui/react'

// ✅ 올바른 사용
<Heading level="h1" title="페이지 제목" />
<Heading level="h2" title="섹션 제목" />

// ✅ 설명과 함께
<Heading
  level="h1"
  title="개요"
  description="컴포넌트에 대한 설명입니다."
/>

// ❌ 잘못된 사용 - Display를 사용하세요
<Heading level="h1" title="환영합니다" />
<Heading level="h2" title="봄맞이 특별 할인" />`}
            </Code>
          </Section>

          {/* 예제 섹션 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading level="h3" title="헤딩 레벨" />
              <ComponentPreview>
                <Stack gap="lg">
                  <div>
                    <HeadingComponent level="h1" title="H1 - 페이지 제목" />
                    <Body size="sm" className="text-krds-gray-70 mt-2">
                      28px (Mobile) / 40px (PC) · 700 (Bold) · 150% 줄 간격
                    </Body>
                  </div>

                  <div>
                    <HeadingComponent level="h2" title="H2 - 주요 섹션" />
                    <Body size="sm" className="text-krds-gray-70 mt-2">
                      24px (Mobile) / 32px (PC) · 700 (Bold) · 150% 줄 간격
                    </Body>
                  </div>

                  <div>
                    <HeadingComponent level="h3" title="H3 - 서브섹션" />
                    <Body size="sm" className="text-krds-gray-70 mt-2">
                      22px (Mobile) / 24px (PC) · 700 (Bold) · 150% 줄 간격
                    </Body>
                  </div>

                  <div>
                    <HeadingComponent level="h4" title="H4 - 항목" />
                    <Body size="sm" className="text-krds-gray-70 mt-2">
                      19px · 700 (Bold) · 150% 줄 간격
                    </Body>
                  </div>

                  <div>
                    <HeadingComponent level="h5" title="H5 - 하위 항목" />
                    <Body size="sm" className="text-krds-gray-70 mt-2">
                      17px · 700 (Bold) · 150% 줄 간격
                    </Body>
                  </div>
                </Stack>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Heading level="h1" title="H1 - 페이지 제목" />
<Heading level="h2" title="H2 - 주요 섹션" />
<Heading level="h3" title="H3 - 서브섹션" />
<Heading level="h4" title="H4 - 항목" />
<Heading level="h5" title="H5 - 하위 항목" />`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="설명과 함께" />
              <ComponentPreview>
                <HeadingComponent
                  level="h2"
                  title="설치 방법"
                  description="다음 명령어를 사용하여 컴포넌트를 설치할 수 있습니다."
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Heading
  level="h2"
  title="설치 방법"
  description="다음 명령어를 사용하여 컴포넌트를 설치할 수 있습니다."
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="커스텀 ID" />
              <ComponentPreview>
                <HeadingComponent
                  level="h2"
                  id="custom-anchor"
                  title="앵커 링크용 제목"
                  description="id prop으로 커스텀 앵커 ID를 지정할 수 있습니다."
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Heading
  level="h2"
  id="custom-anchor"
  title="앵커 링크용 제목"
  description="id prop으로 커스텀 앵커 ID를 지정할 수 있습니다."
/>

{/* 자동 생성된 ID로 링크 */}
<a href="#custom-anchor">해당 섹션으로 이동</a>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="커스텀 설명 콘텐츠" />
              <ComponentPreview>
                <HeadingComponent level="h2" title="고급 기능">
                  <Body className="text-krds-gray-70">
                    <strong>Radix UI Primitives</strong>를 기반으로 접근성이
                    자동으로 보장됩니다. <Code>aria-*</Code> 속성이 자동으로
                    적용됩니다.
                  </Body>
                </HeadingComponent>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Heading level="h2" title="고급 기능">
  <Body className="text-krds-gray-70">
    <strong>Radix UI Primitives</strong>를 기반으로
    접근성이 자동으로 보장됩니다.
  </Body>
</Heading>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="sr-only로 숨기기" />
              <ComponentPreview>
                <HeadingComponent
                  level="h2"
                  title="시각적으로 숨겨진 제목"
                  className="sr-only"
                />
                <Body>
                  위의 제목은 스크린 리더에서만 읽히고 시각적으로는 보이지
                  않습니다.
                </Body>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Heading
  level="h2"
  title="시각적으로 숨겨진 제목"
  className="sr-only"
/>

{/* 접근성을 위한 제목이지만 디자인상 표시하지 않을 때 사용 */}`}
              </Code>
            </Subsection>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API Reference" />

            <Subsection level="h3">
              <Heading level="h3" title="Heading Props" />
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
                      <Code>level</Code>
                    </TableCell>
                    <TableCell>
                      <Code>
                        &quot;h1&quot; | &quot;h2&quot; | &quot;h3&quot; |
                        &quot;h4&quot; | &quot;h5&quot;
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>헤딩 레벨 (필수)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>title</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>제목 텍스트 (필수)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>description</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>설명 텍스트 (선택사항)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>id</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>자동 생성</TableCell>
                    <TableCell>
                      HTML id 속성 (미제공 시 title에서 자동 생성)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>children</Code>
                    </TableCell>
                    <TableCell>
                      <Code>ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      커스텀 설명 콘텐츠 (description 대신 사용 가능)
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
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Heading Sizes" />
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Level</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>PC</TableHead>
                    <TableHead>Font Weight</TableHead>
                    <TableHead>Line Height</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>h1</Code>
                    </TableCell>
                    <TableCell>28px</TableCell>
                    <TableCell>40px</TableCell>
                    <TableCell>700 (Bold)</TableCell>
                    <TableCell>150%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>h2</Code>
                    </TableCell>
                    <TableCell>24px</TableCell>
                    <TableCell>32px</TableCell>
                    <TableCell>700 (Bold)</TableCell>
                    <TableCell>150%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>h3</Code>
                    </TableCell>
                    <TableCell>22px</TableCell>
                    <TableCell>24px</TableCell>
                    <TableCell>700 (Bold)</TableCell>
                    <TableCell>150%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>h4</Code>
                    </TableCell>
                    <TableCell>19px</TableCell>
                    <TableCell>19px</TableCell>
                    <TableCell>700 (Bold)</TableCell>
                    <TableCell>150%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>h5</Code>
                    </TableCell>
                    <TableCell>17px</TableCell>
                    <TableCell>17px</TableCell>
                    <TableCell>700 (Bold)</TableCell>
                    <TableCell>150%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Spacing (with description)" />
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Level</TableHead>
                    <TableHead>Title-Body Gap (Mobile)</TableHead>
                    <TableHead>Title-Body Gap (PC)</TableHead>
                    <TableHead>Bottom Margin (Mobile)</TableHead>
                    <TableHead>Bottom Margin (PC)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>h1</Code>
                    </TableCell>
                    <TableCell>16px</TableCell>
                    <TableCell>24px</TableCell>
                    <TableCell>16px</TableCell>
                    <TableCell>24px</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>h2</Code>
                    </TableCell>
                    <TableCell>12px</TableCell>
                    <TableCell>20px</TableCell>
                    <TableCell>12px</TableCell>
                    <TableCell>20px</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>h3</Code>
                    </TableCell>
                    <TableCell>12px</TableCell>
                    <TableCell>20px</TableCell>
                    <TableCell>12px</TableCell>
                    <TableCell>20px</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>h4</Code>
                    </TableCell>
                    <TableCell>12px</TableCell>
                    <TableCell>20px</TableCell>
                    <TableCell>12px</TableCell>
                    <TableCell>20px</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>h5</Code>
                    </TableCell>
                    <TableCell>8px</TableCell>
                    <TableCell>16px</TableCell>
                    <TableCell>8px</TableCell>
                    <TableCell>16px</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Section', href: '/components/section' }}
        next={{ title: 'Select', href: '/components/select' }}
      />
    </>
  );
}
