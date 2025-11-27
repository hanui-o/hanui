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
      <Heading
        level="h1"
        title="Display"
        description="배너와 마케팅용 대형 텍스트 컴포넌트"
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
                <DisplayComponent size="xl">환영합니다</DisplayComponent>
                <DisplayComponent size="lg">공공서비스 플랫폼</DisplayComponent>
                <DisplayComponent size="md">
                  HANUI 디자인 시스템
                </DisplayComponent>
                <DisplayComponent size="sm">특별 할인</DisplayComponent>
              </Stack>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<Display size="xl">환영합니다</Display>
<Display size="lg">공공서비스 플랫폼</Display>
<Display size="md">HANUI 디자인 시스템</Display>
<Display size="sm">특별 할인</Display>`}
            </Code>
          </Section>

          <Section level="h2">
            <Installation componentName="display" />
          </Section>

          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />

            <Card variant="filled">
              <Body className="font-bold mb-3">
                ⚠️ 중요: Display vs Heading
              </Body>
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>Display:</strong> 마케팅, 프로모션, 배너용 대형 텍스트
                </ListItem>
                <ListItem>
                  <strong>Heading:</strong> 페이지 제목 (h1, h2, h3) - 일반적인
                  사용
                </ListItem>
              </List>
              <Body className="text-krds-gray-70 mt-3">
                일반 페이지의 제목에는 Display 대신 Heading을 사용하세요.
              </Body>
            </Card>

            <Code variant="block" language="tsx">
              {`import { Display } from '@hanui/react'

// ✅ 올바른 사용
<Display size="xl">환영합니다</Display>
<Display size="lg">봄맞이 특별 할인 50%</Display>
<Display size="md">신제품 출시</Display>
<Display size="sm">특별 프로모션</Display>

// ❌ 잘못된 사용 - Heading을 사용하세요
<Display as="h1">페이지 제목</Display>
<Display as="h2">섹션 제목</Display>`}
            </Code>
          </Section>

          {/* 예제 섹션 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading level="h3" title="크기" />
              <ComponentPreview>
                <Stack gap="lg">
                  <Stack gap="sm">
                    <DisplayComponent size="xl">
                      Extra Large Display
                    </DisplayComponent>
                    <Body size="sm" className="text-krds-gray-70">
                      32px (Mobile) / 48px (Desktop) · 700 (Bold) · 130% 줄 간격
                    </Body>
                  </Stack>

                  <Stack gap="sm">
                    <DisplayComponent size="lg">Large Display</DisplayComponent>
                    <Body size="sm" className="text-krds-gray-70">
                      28px (Mobile) / 42px (Desktop) · 700 (Bold) · 130% 줄 간격
                    </Body>
                  </Stack>

                  <Stack gap="sm">
                    <DisplayComponent size="md">
                      Medium Display
                    </DisplayComponent>
                    <Body size="sm" className="text-krds-gray-70">
                      24px (Mobile) / 36px (Desktop) · 700 (Bold) · 130% 줄 간격
                    </Body>
                  </Stack>

                  <Stack gap="sm">
                    <DisplayComponent size="sm">Small Display</DisplayComponent>
                    <Body size="sm" className="text-krds-gray-70">
                      20px (Mobile) / 32px (Desktop) · 700 (Bold) · 130% 줄 간격
                    </Body>
                  </Stack>
                </Stack>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Display size="xl">최대 강조 텍스트</Display>
<Display size="lg">큰 강조 텍스트</Display>
<Display size="md">중간 강조 텍스트</Display>
<Display size="sm">작은 강조 텍스트</Display>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="커스텀 스타일" />
              <ComponentPreview>
                <DisplayComponent size="md" className="text-krds-primary-base">
                  브랜드 컬러 적용
                </DisplayComponent>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Display size="md" className="text-krds-primary-base">
  브랜드 컬러 적용
</Display>`}
              </Code>
            </Subsection>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API Reference" />

            <Subsection level="h3">
              <Heading level="h3" title="Display Props" />
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
                        &quot;xl&quot; | &quot;lg&quot; | &quot;md&quot; |
                        &quot;sm&quot;
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

            <Subsection level="h3">
              <Heading level="h3" title="Size Variants" />
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Size</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Desktop (md+)</TableHead>
                    <TableHead>Font Weight</TableHead>
                    <TableHead>Line Height</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>xl</Code>
                    </TableCell>
                    <TableCell>32px</TableCell>
                    <TableCell>48px</TableCell>
                    <TableCell>700 (Bold)</TableCell>
                    <TableCell>130%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>lg</Code>
                    </TableCell>
                    <TableCell>28px</TableCell>
                    <TableCell>42px</TableCell>
                    <TableCell>700 (Bold)</TableCell>
                    <TableCell>130%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>md</Code>
                    </TableCell>
                    <TableCell>24px</TableCell>
                    <TableCell>36px</TableCell>
                    <TableCell>700 (Bold)</TableCell>
                    <TableCell>130%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>sm</Code>
                    </TableCell>
                    <TableCell>20px</TableCell>
                    <TableCell>32px</TableCell>
                    <TableCell>700 (Bold)</TableCell>
                    <TableCell>130%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Container', href: '/components/container' }}
        next={{ title: 'DropdownMenu', href: '/components/dropdown-menu' }}
      />
    </>
  );
}
