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
  Label as LabelComponent,
  Input,
  Code,
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
  ListItem,
  List,
} from '@hanui/react';

export default function LabelPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Label"
        description="폼 요소를 위한 라벨 컴포넌트"
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        {/* ========== 개요 탭 ========== */}
        <TabsContent value="overview">
          {/* 1) 개요 - 기본 예제 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />
            <ComponentPreview>
              <div className="flex flex-col gap-4 w-full max-w-md">
                <div className="flex flex-col gap-1">
                  <LabelComponent htmlFor="demo-name">이름</LabelComponent>
                  <Input
                    id="demo-name"
                    type="text"
                    placeholder="이름을 입력하세요"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <LabelComponent htmlFor="demo-email">이메일</LabelComponent>
                  <Input
                    id="demo-email"
                    type="email"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<Label htmlFor="name">이름</Label>
<Input id="name" type="text" />

<Label htmlFor="email">이메일</Label>
<Input id="email" type="email" />`}
            </Code>
          </Section>

          {/* 2) 설치 */}
          <Section level="h2">
            <Installation componentName="label" />
          </Section>

          {/* 3) 사용법 */}
          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { Label } from '@/components/hanui/label'

<Label htmlFor="input-id" size="md">라벨 텍스트</Label>
<Input id="input-id" type="text" />`}
            </Code>
          </Section>

          {/* 4) 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            {/* Size */}
            <Subsection level="h3">
              <Heading level="h3" title="Size" />
              <ComponentPreview>
                <div className="flex flex-col gap-6 w-full">
                  <div className="flex flex-col gap-2">
                    <LabelComponent size="lg" htmlFor="size-lg">
                      Large (19px) - 중요한 폼 필드
                    </LabelComponent>
                    <Input id="size-lg" type="text" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <LabelComponent size="md" htmlFor="size-md">
                      Medium (17px) - 일반 폼 필드
                    </LabelComponent>
                    <Input id="size-md" type="text" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <LabelComponent size="sm" htmlFor="size-sm">
                      Small (15px) - 보조 필드
                    </LabelComponent>
                    <Input id="size-sm" type="text" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <LabelComponent size="xs" htmlFor="size-xs">
                      XSmall (13px) - 인라인 옵션
                    </LabelComponent>
                    <Input id="size-xs" type="text" />
                  </div>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Label size="lg" htmlFor="input-id">Large Label</Label>
<Label size="md" htmlFor="input-id">Medium Label</Label>
<Label size="sm" htmlFor="input-id">Small Label</Label>
<Label size="xs" htmlFor="input-id">XSmall Label</Label>`}
              </Code>
            </Subsection>

            {/* 필수 필드 표시 */}
            <Subsection level="h3">
              <Heading level="h3" title="필수 필드 표시" />
              <ComponentPreview>
                <div className="max-w-md">
                  <LabelComponent htmlFor="required-field">
                    필수 입력 항목{' '}
                    <span className="text-krds-danger-60">*</span>
                  </LabelComponent>
                  <Input
                    id="required-field"
                    type="text"
                    required
                    className="mt-1"
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Label htmlFor="required-field">
  필수 입력 항목 <span className="text-krds-danger-60">*</span>
</Label>
<Input id="required-field" type="text" required />`}
              </Code>
            </Subsection>

            {/* 체크박스 & 라디오 */}
            <Subsection level="h3">
              <Heading level="h3" title="체크박스 & 라디오" />
              <ComponentPreview>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <input id="agree" type="checkbox" />
                    <LabelComponent size="md" htmlFor="agree" className="mb-0">
                      이용약관에 동의합니다
                    </LabelComponent>
                  </div>
                  <div className="flex flex-col gap-2">
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
                  </div>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<input id="agree" type="checkbox" />
<Label size="md" htmlFor="agree">이용약관에 동의합니다</Label>

<input id="option1" type="radio" name="option" />
<Label size="sm" htmlFor="option1">옵션 1</Label>`}
              </Code>
            </Subsection>
          </Section>

          {/* 5) 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="Label은 WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다."
            />
            <List variant="check">
              <ListItem>
                <strong>label 태그 사용:</strong> 스크린 리더가 폼 요소를 정확히
                식별합니다.
              </ListItem>
              <ListItem>
                <strong>htmlFor 연결:</strong> 입력 요소와 명시적으로
                연결됩니다.
              </ListItem>
              <ListItem>
                에러 메시지는 <Code>aria-describedby</Code>를 사용하여 입력
                필드와 연결하세요
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
          </Section>
        </TabsContent>

        {/* ========== API 탭 ========== */}
        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="Props" />
              <Table small>
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
                    <TableCell className="font-mono">
                      <Code>size</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        &quot;lg&quot; | &quot;md&quot; | &quot;sm&quot; |
                        &quot;xs&quot;
                      </Code>
                    </TableCell>
                    <TableCell>&quot;md&quot;</TableCell>
                    <TableCell>라벨 크기</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>htmlFor</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>연결할 입력 요소의 id</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>className</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>children</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>라벨 내용</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Size Variants" />
              <Table small>
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
