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
  Display as DisplayComponent,
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

export default function DisplayPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Display"
        description="배너와 마케팅용 대형 텍스트 컴포넌트입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Installation */}
          <Section>
            <SectionHeading level="h2" id="installation" title="설치">
              <Body className="leading-relaxed">
                다음 명령어로 Display 컴포넌트를 설치합니다:
              </Body>
            </SectionHeading>
            <Code variant="block" language="bash" showLineNumbers={false}>
              npx @hanui/cli add display
            </Code>
          </Section>

          {/* What is it */}
          <Section>
            <SectionHeading
              level="h2"
              id="what-is-it"
              title="무엇인가요?"
              description="Display는 KRDS 타이포그래피 시스템에서 가장 큰 크기의 텍스트 스타일입니다. 배너, 히어로 섹션, 마케팅 메시지 등 사용자의 주목을 끌어야 하는 곳에 사용됩니다."
            />
            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>반응형 크기:</strong> PC와 모바일에서 최적의 가독성을
                  제공합니다.
                </ListItem>
                <ListItem>
                  <strong>KRDS 준수:</strong> Bold(700) 폰트 굵기와 150% 줄
                  간격으로 가독성을 확보합니다.
                </ListItem>
                <ListItem>
                  <strong>Polymorphic:</strong> as prop으로 다양한 HTML 태그로
                  렌더링할 수 있습니다.
                </ListItem>
                <ListItem>
                  <strong>접근성:</strong> 명도 대비 4.5:1 이상을 만족하여 WCAG
                  2.1 / KWCAG 2.2를 준수합니다.
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* Preview */}
          <Section>
            <SectionHeading level="h2" id="preview" title="미리보기" />
            <Card>
              <Stack gap="lg">
                <DisplayComponent size="lg">환영합니다</DisplayComponent>
                <DisplayComponent size="md">공공서비스 플랫폼</DisplayComponent>
                <DisplayComponent size="sm">
                  HANUI 디자인 시스템
                </DisplayComponent>
              </Stack>
            </Card>
            <Code variant="block" language="tsx">
              {`<Display size="lg">환영합니다</Display>
<Display size="md">공공서비스 플랫폼</Display>
<Display size="sm">HANUI 디자인 시스템</Display>`}
            </Code>
          </Section>

          {/* Usage */}
          <Section>
            <SectionHeading level="h2" id="usage" title="사용 방법" />

            {/* Sizes */}
            <Subsection level="h3">
              <SectionHeading level="h3" id="sizes" title="크기 (Size)" />
              <Card>
                <Stack gap="lg">
                  <Stack gap="sm">
                    <DisplayComponent size="lg">Large Display</DisplayComponent>
                    <Body size="sm" className="text-krds-gray-70">
                      60px (PC) / 44px (Mobile) · 700 (Bold) · 150% 줄 간격
                    </Body>
                  </Stack>

                  <Stack gap="sm">
                    <DisplayComponent size="md">
                      Medium Display
                    </DisplayComponent>
                    <Body size="sm" className="text-krds-gray-70">
                      44px (PC) / 32px (Mobile) · 700 (Bold) · 150% 줄 간격
                    </Body>
                  </Stack>

                  <Stack gap="sm">
                    <DisplayComponent size="sm">Small Display</DisplayComponent>
                    <Body size="sm" className="text-krds-gray-70">
                      36px (PC) / 28px (Mobile) · 700 (Bold) · 150% 줄 간격
                    </Body>
                  </Stack>
                </Stack>
              </Card>
              <Code variant="block" language="tsx">
                {`<Display size="lg">최대 강조 텍스트</Display>
<Display size="md">주요 제목</Display>
<Display size="sm">보조 제목</Display>`}
              </Code>
            </Subsection>

            {/* Polymorphic */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="polymorphic"
                title="다양한 HTML 태그"
                description="as prop을 사용하여 원하는 HTML 태그로 렌더링할 수 있습니다."
              />
              <Card>
                <Stack gap="md">
                  <DisplayComponent as="h1" size="lg">
                    h1 태그로 렌더링
                  </DisplayComponent>
                  <DisplayComponent as="h2" size="md">
                    h2 태그로 렌더링
                  </DisplayComponent>
                  <DisplayComponent as="div" size="sm">
                    div 태그로 렌더링
                  </DisplayComponent>
                </Stack>
              </Card>
              <Code variant="block" language="tsx">
                {`<Display as="h1" size="lg">h1 태그로 렌더링</Display>
<Display as="h2" size="md">h2 태그로 렌더링</Display>
<Display as="div" size="sm">div 태그로 렌더링</Display>`}
              </Code>
            </Subsection>

            {/* Custom Styling */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="custom-styling"
                title="커스텀 스타일"
                description="className prop으로 추가 스타일을 적용할 수 있습니다."
              />
              <Card>
                <DisplayComponent size="md" className="text-krds-primary-base">
                  브랜드 컬러 적용
                </DisplayComponent>
              </Card>
              <Code variant="block" language="tsx">
                {`<Display size="md" className="text-krds-primary-base">
  브랜드 컬러 적용
</Display>`}
              </Code>
            </Subsection>
          </Section>

          {/* Best Practices */}
          <Section>
            <SectionHeading level="h2" id="best-practices" title="모범 사례" />
            <Stack gap="md">
              <DoCard title="Display를 사용하기 적합한 경우">
                <List variant="check">
                  <ListItem>랜딩 페이지의 히어로 섹션</ListItem>
                  <ListItem>프로모션 배너의 핵심 메시지</ListItem>
                  <ListItem>서비스 소개 페이지의 대제목</ListItem>
                  <ListItem>강력한 시각적 임팩트가 필요한 곳</ListItem>
                </List>
              </DoCard>

              <DontCard title="Display를 사용하지 말아야 하는 경우">
                <List variant="cross">
                  <ListItem>일반 페이지 제목 (Heading 사용 권장)</ListItem>
                  <ListItem>본문 내용 (Body 사용 권장)</ListItem>
                  <ListItem>폼 라벨 (Label 사용 권장)</ListItem>
                  <ListItem>텍스트가 많은 콘텐츠 영역</ListItem>
                </List>
              </DontCard>
            </Stack>
          </Section>

          {/* Accessibility */}
          <Section>
            <SectionHeading
              level="h2"
              id="accessibility"
              title="접근성"
              description="Display는 WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다."
            />
            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>색상 대비:</strong> 기본 색상(gray-95)이 명도 대비
                  4.5:1 이상을 만족합니다.
                </ListItem>
                <ListItem>
                  <strong>의미론적 HTML:</strong> as prop으로 적절한 HTML 태그를
                  선택할 수 있습니다.
                </ListItem>
                <ListItem>
                  <strong>반응형 타이포그래피:</strong> 모든 기기에서 읽기 쉬운
                  크기를 유지합니다.
                </ListItem>
                <ListItem>
                  <strong>다크 모드:</strong> 자동으로 다크 모드를 지원합니다.
                </ListItem>
              </List>
            </Card>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section>
            <SectionHeading
              level="h2"
              id="api-reference"
              title="API 레퍼런스"
            />

            {/* Props */}
            <Subsection level="h3">
              <SectionHeading level="h3" id="props" title="Props" />
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
                      <Code>size</Code>
                    </TableCell>
                    <TableCell>
                      <Code>
                        &quot;lg&quot; | &quot;md&quot; | &quot;sm&quot;
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code>&quot;md&quot;</Code>
                    </TableCell>
                    <TableCell>Display 크기</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>as</Code>
                    </TableCell>
                    <TableCell>
                      <Code>
                        &quot;h1&quot; | &quot;h2&quot; | &quot;h3&quot; |
                        &quot;div&quot; | &quot;p&quot;
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code>&quot;h1&quot;</Code>
                    </TableCell>
                    <TableCell>렌더링할 HTML 태그</TableCell>
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
                  <TableRow>
                    <TableCell>
                      <Code>children</Code>
                    </TableCell>
                    <TableCell>
                      <Code>ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>텍스트 내용</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            {/* Size Variants */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="size-variants"
                title="Size Variants"
              />
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Size</TableHead>
                    <TableHead>PC</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Font Weight</TableHead>
                    <TableHead>Line Height</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>lg</Code>
                    </TableCell>
                    <TableCell>60px</TableCell>
                    <TableCell>44px</TableCell>
                    <TableCell>700 (Bold)</TableCell>
                    <TableCell>150%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>md</Code>
                    </TableCell>
                    <TableCell>44px</TableCell>
                    <TableCell>32px</TableCell>
                    <TableCell>700 (Bold)</TableCell>
                    <TableCell>150%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>sm</Code>
                    </TableCell>
                    <TableCell>36px</TableCell>
                    <TableCell>28px</TableCell>
                    <TableCell>700 (Bold)</TableCell>
                    <TableCell>150%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            {/* KRDS Compliance */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="krds-compliance"
                title="KRDS 준수사항"
              />
              <Card variant="info">
                <List variant="check" className="text-krds-gray-90">
                  <ListItem>모든 Display는 Bold (700) 폰트 굵기 사용</ListItem>
                  <ListItem>150% 줄 간격으로 가독성 확보</ListItem>
                  <ListItem>반응형 크기 (PC/모바일 최적화)</ListItem>
                  <ListItem>Pretendard GOV 폰트 적용</ListItem>
                  <ListItem>
                    명도 대비 4.5:1 이상 (WCAG 2.1 / KWCAG 2.2 Level AA)
                  </ListItem>
                </List>
              </Card>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Container', href: '/components/container' }}
        next={{ title: 'File Upload', href: '/components/file-upload' }}
      />
    </>
  );
}
