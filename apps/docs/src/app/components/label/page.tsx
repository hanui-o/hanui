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
  Label as LabelComponent,
  Input,
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

export default function LabelPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Label"
        description="폼 요소를 위한 라벨 컴포넌트입니다."
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
                다음 명령어로 Label 컴포넌트를 설치합니다:
              </Body>
            </SectionHeading>
            <Code variant="block" language="bash" showLineNumbers={false}>
              npx @hanui/cli add label
            </Code>
          </Section>

          {/* What is it */}
          <Section>
            <SectionHeading
              level="h2"
              id="what-is-it"
              title="무엇인가요?"
              description="Label은 KRDS 타이포그래피 시스템의 폼 라벨 스타일입니다. 입력 필드, 체크박스, 라디오 버튼 등 폼 요소와 함께 사용되어 접근성을 향상시킵니다."
            />
            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>시맨틱 HTML:</strong> label 태그를 사용하여 스크린
                  리더를 지원합니다.
                </ListItem>
                <ListItem>
                  <strong>htmlFor 연결:</strong> htmlFor 속성으로 입력 요소와
                  명시적으로 연결됩니다.
                </ListItem>
                <ListItem>
                  <strong>4단계 크기:</strong> lg, md, sm, xs로 다양한 크기를
                  제공합니다.
                </ListItem>
                <ListItem>
                  <strong>클릭 영역 확장:</strong> 라벨 클릭 시 연결된 입력
                  요소에 포커스가 이동합니다.
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* Preview */}
          <Section>
            <SectionHeading level="h2" id="preview" title="미리보기" />
            <Card>
              <Stack gap="md" className="max-w-md">
                <div>
                  <LabelComponent size="lg" htmlFor="input-large">
                    Large Label
                  </LabelComponent>
                  <Input id="input-large" type="text" className="mt-1" />
                </div>
                <div>
                  <LabelComponent size="md" htmlFor="input-medium">
                    Medium Label
                  </LabelComponent>
                  <Input id="input-medium" type="text" className="mt-1" />
                </div>
                <div>
                  <LabelComponent size="sm" htmlFor="input-small">
                    Small Label
                  </LabelComponent>
                  <Input id="input-small" type="text" className="mt-1" />
                </div>
              </Stack>
            </Card>
            <Code variant="block" language="tsx">
              {`<Label size="lg" htmlFor="input-large">Large Label</Label>
<Input id="input-large" type="text" />

<Label size="md" htmlFor="input-medium">Medium Label</Label>
<Input id="input-medium" type="text" />

<Label size="sm" htmlFor="input-small">Small Label</Label>
<Input id="input-small" type="text" />`}
            </Code>
          </Section>

          {/* Usage */}
          <Section>
            <SectionHeading level="h2" id="usage" title="사용 방법" />

            {/* Sizes */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="sizes"
                title="크기 (Size)"
                description="4단계 크기 시스템을 제공합니다."
              />
              <Card>
                <Stack gap="lg">
                  <Stack gap="sm">
                    <LabelComponent size="lg" htmlFor="demo-lg">
                      Large (19px) - 중요한 폼 필드
                    </LabelComponent>
                    <Body size="sm" className="text-krds-gray-70">
                      19px · 400 (Regular) · 150% 줄 간격
                    </Body>
                  </Stack>

                  <Stack gap="sm">
                    <LabelComponent size="md" htmlFor="demo-md">
                      Medium (17px) - 일반 폼 필드
                    </LabelComponent>
                    <Body size="sm" className="text-krds-gray-70">
                      17px · 400 (Regular) · 150% 줄 간격
                    </Body>
                  </Stack>

                  <Stack gap="sm">
                    <LabelComponent size="sm" htmlFor="demo-sm">
                      Small (15px) - 보조 필드
                    </LabelComponent>
                    <Body size="sm" className="text-krds-gray-70">
                      15px · 400 (Regular) · 150% 줄 간격
                    </Body>
                  </Stack>

                  <Stack gap="sm">
                    <LabelComponent size="xs" htmlFor="demo-xs">
                      XSmall (13px) - 인라인 옵션
                    </LabelComponent>
                    <Body size="sm" className="text-krds-gray-70">
                      13px · 400 (Regular) · 150% 줄 간격
                    </Body>
                  </Stack>
                </Stack>
              </Card>
              <Code variant="block" language="tsx">
                {`<Label size="lg" htmlFor="input-id">Large Label</Label>
<Label size="md" htmlFor="input-id">Medium Label</Label>
<Label size="sm" htmlFor="input-id">Small Label</Label>
<Label size="xs" htmlFor="input-id">XSmall Label</Label>`}
              </Code>
            </Subsection>

            {/* Form Fields */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="form-fields"
                title="폼 필드"
                description="입력 필드와 함께 사용합니다."
              />
              <Card>
                <Stack gap="md" className="max-w-md">
                  <div>
                    <LabelComponent size="md" htmlFor="name">
                      이름 *
                    </LabelComponent>
                    <Input id="name" type="text" required className="mt-1" />
                  </div>
                  <div>
                    <LabelComponent size="md" htmlFor="email">
                      이메일
                    </LabelComponent>
                    <Input id="email" type="email" className="mt-1" />
                  </div>
                </Stack>
              </Card>
              <Code variant="block" language="tsx">
                {`<Label size="md" htmlFor="name">이름 *</Label>
<Input id="name" type="text" required />

<Label size="md" htmlFor="email">이메일</Label>
<Input id="email" type="email" />`}
              </Code>
            </Subsection>

            {/* Checkbox & Radio */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="checkbox-radio"
                title="체크박스 & 라디오"
                description="인라인 요소와 함께 사용할 때는 flex로 배치합니다."
              />
              <Card>
                <Stack gap="md">
                  <div className="flex items-center gap-2">
                    <input id="agree" type="checkbox" />
                    <LabelComponent size="md" htmlFor="agree" className="mb-0">
                      이용약관에 동의합니다
                    </LabelComponent>
                  </div>
                  <Stack gap="sm">
                    <div className="flex items-center gap-2">
                      <input id="option1" type="radio" name="option" />
                      <LabelComponent
                        size="sm"
                        htmlFor="option1"
                        className="mb-0"
                      >
                        옵션 1
                      </LabelComponent>
                    </div>
                    <div className="flex items-center gap-2">
                      <input id="option2" type="radio" name="option" />
                      <LabelComponent
                        size="sm"
                        htmlFor="option2"
                        className="mb-0"
                      >
                        옵션 2
                      </LabelComponent>
                    </div>
                  </Stack>
                </Stack>
              </Card>
              <Code variant="block" language="tsx">
                {`<input id="agree" type="checkbox" />
<Label size="md" htmlFor="agree">이용약관에 동의합니다</Label>

<input id="option1" type="radio" name="option" />
<Label size="sm" htmlFor="option1">옵션 1</Label>`}
              </Code>
            </Subsection>

            {/* Required Fields */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="required-fields"
                title="필수 필드 표시"
                description="필수 필드는 * 또는 (필수) 텍스트로 명확히 표시합니다."
              />
              <Card>
                <div className="max-w-md">
                  <LabelComponent size="md" htmlFor="required-field">
                    필수 입력 항목{' '}
                    <span className="text-krds-danger-text">*</span>
                  </LabelComponent>
                  <Input
                    id="required-field"
                    type="text"
                    required
                    className="mt-1"
                  />
                </div>
              </Card>
              <Code variant="block" language="tsx">
                {`<Label size="md" htmlFor="required-field">
  필수 입력 항목 <span className="text-krds-danger-text">*</span>
</Label>
<Input id="required-field" type="text" required />`}
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
                <div className="max-w-md">
                  <LabelComponent
                    size="md"
                    htmlFor="custom"
                    className="text-krds-primary-base font-bold"
                  >
                    브랜드 컬러 라벨
                  </LabelComponent>
                  <Input id="custom" type="text" className="mt-1" />
                </div>
              </Card>
              <Code variant="block" language="tsx">
                {`<Label
  size="md"
  htmlFor="custom"
  className="text-krds-primary-base font-bold"
>
  브랜드 컬러 라벨
</Label>`}
              </Code>
            </Subsection>
          </Section>

          {/* Best Practices */}
          <Section>
            <SectionHeading level="h2" id="best-practices" title="모범 사례" />
            <Stack gap="md">
              <DoCard title="Label을 사용하기 적합한 경우">
                <List variant="check">
                  <ListItem>텍스트 입력 필드</ListItem>
                  <ListItem>체크박스와 라디오 버튼</ListItem>
                  <ListItem>셀렉트 박스</ListItem>
                  <ListItem>텍스트 영역 (textarea)</ListItem>
                  <ListItem>모든 폼 요소의 설명</ListItem>
                </List>
              </DoCard>

              <Card variant="warning">
                <SectionHeading level="h3" id="caution" title="주의사항" />
                <List variant="check" className="text-krds-gray-90">
                  <ListItem>
                    <strong>htmlFor 필수:</strong> 항상 htmlFor 속성으로 입력
                    요소와 연결하세요.
                  </ListItem>
                  <ListItem>
                    <strong>필수 필드 표시:</strong> 필수 필드는 명확하게 표시
                    (*, 필수 등)하세요.
                  </ListItem>
                  <ListItem>
                    <strong>간결한 텍스트:</strong> 라벨 텍스트는 간결하고
                    명확하게 작성하세요.
                  </ListItem>
                </List>
              </Card>

              <DontCard title="Label을 사용하지 말아야 하는 경우">
                <List variant="cross">
                  <ListItem>일반 본문 텍스트 (Body 사용 권장)</ListItem>
                  <ListItem>페이지 제목 (Heading 사용 권장)</ListItem>
                  <ListItem>버튼 텍스트 (Button 컴포넌트 사용)</ListItem>
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
              description="Label은 WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다."
            />
            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>label 태그 사용:</strong> 스크린 리더가 폼 요소를
                  정확히 식별합니다.
                </ListItem>
                <ListItem>
                  <strong>htmlFor 연결:</strong> 입력 요소와 명시적으로
                  연결됩니다.
                </ListItem>
                <ListItem>
                  <strong>클릭 영역:</strong> 라벨 클릭 시 연결된 입력 요소에
                  포커스가 이동합니다.
                </ListItem>
                <ListItem>
                  <strong>필수 필드 표시:</strong> 시각적/의미적으로 명확히
                  표시됩니다.
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
                        &quot;lg&quot; | &quot;md&quot; | &quot;sm&quot; |
                        &quot;xs&quot;
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code>&quot;md&quot;</Code>
                    </TableCell>
                    <TableCell>라벨 크기 (19px / 17px / 15px / 13px)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>htmlFor</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>연결할 입력 요소의 id</TableCell>
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
                    <TableCell>라벨 내용</TableCell>
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
                    <TableHead>Font Size</TableHead>
                    <TableHead>Font Weight</TableHead>
                    <TableHead>Line Height</TableHead>
                    <TableHead>Use Case</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>lg</Code>
                    </TableCell>
                    <TableCell>19px</TableCell>
                    <TableCell>400 (Regular)</TableCell>
                    <TableCell>150%</TableCell>
                    <TableCell>중요한 폼 필드</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>md</Code>
                    </TableCell>
                    <TableCell>17px</TableCell>
                    <TableCell>400 (Regular)</TableCell>
                    <TableCell>150%</TableCell>
                    <TableCell>일반 폼 필드 (기본)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>sm</Code>
                    </TableCell>
                    <TableCell>15px</TableCell>
                    <TableCell>400 (Regular)</TableCell>
                    <TableCell>150%</TableCell>
                    <TableCell>보조 필드</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>xs</Code>
                    </TableCell>
                    <TableCell>13px</TableCell>
                    <TableCell>400 (Regular)</TableCell>
                    <TableCell>150%</TableCell>
                    <TableCell>인라인 옵션</TableCell>
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
                  <ListItem>모든 Label은 Regular (400) 폰트 굵기 사용</ListItem>
                  <ListItem>150% 줄 간격으로 가독성 확보</ListItem>
                  <ListItem>
                    4단계 크기 시스템 (Large, Medium, Small, XSmall)
                  </ListItem>
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
        prev={{ title: 'Input', href: '/components/input' }}
        next={{ title: 'Link', href: '/components/link' }}
      />
    </>
  );
}
