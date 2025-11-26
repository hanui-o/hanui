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
  Textarea as TextareaComponent,
  FormField,
  FormLabel,
  FormError,
  FormHelperText,
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
} from '@hanui/react';

export default function TextareaPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Textarea"
        description="다양한 스타일과 크기를 지원하는 여러 줄 입력 필드 컴포넌트입니다. 자동 높이 조절 기능과 FormField 자동 통합을 제공하며, KRDS 표준을 준수합니다."
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
              <div className="flex flex-col gap-4 max-w-md">
                <TextareaComponent placeholder="기본 텍스트 영역" />
                <TextareaComponent readOnly value="읽기 전용 텍스트입니다." />
                <TextareaComponent disabled placeholder="비활성화 상태" />
              </div>
            </ComponentPreview>

            <Code variant="block" language="tsx">
              {`import { Textarea } from '@hanui/react'

// 기본
<Textarea placeholder="내용을 입력하세요" />

// 읽기 전용
<Textarea readOnly value="읽기 전용 텍스트" />

// 비활성화
<Textarea disabled placeholder="비활성화 상태" />`}
            </Code>
          </Section>

          <Installation componentName="textarea" />

          {/* Usage */}
          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { Textarea } from '@hanui/react'

<Textarea placeholder="내용을 입력하세요" rows={4} />`}
            </Code>
          </Section>

          {/* Examples */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading level="h3" title="Size" />
              <ComponentPreview>
                <div className="flex flex-col gap-4 max-w-md">
                  <TextareaComponent
                    size="sm"
                    placeholder="Small (min-h: 80px)"
                  />
                  <TextareaComponent
                    size="md"
                    placeholder="Medium (min-h: 96px)"
                  />
                  <TextareaComponent
                    size="lg"
                    placeholder="Large (min-h: 128px)"
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Textarea size="sm" placeholder="Small" />
<Textarea size="md" placeholder="Medium" />
<Textarea size="lg" placeholder="Large" />`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Variant" />
              <ComponentPreview>
                <div className="flex flex-col gap-4 max-w-md">
                  <TextareaComponent
                    variant="default"
                    placeholder="Default (테두리)"
                  />
                  <TextareaComponent
                    variant="filled"
                    placeholder="Filled (배경)"
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Textarea variant="default" placeholder="Default" />
<Textarea variant="filled" placeholder="Filled" />`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="자동 높이 조절 (Auto Resize)" />
              <Body className="mb-4">
                autoResize prop을 사용하면 입력 내용에 따라 높이가 자동으로
                조절됩니다. maxRows로 최대 높이를 제한할 수 있습니다.
              </Body>
              <ComponentPreview>
                <div className="flex flex-col gap-4 max-w-md">
                  <TextareaComponent
                    autoResize
                    placeholder="입력하면 높이가 자동으로 늘어납니다"
                  />
                  <TextareaComponent
                    autoResize
                    maxRows={5}
                    placeholder="최대 5줄까지만 늘어납니다"
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`// 자동 높이 조절 (무제한)
<Textarea autoResize placeholder="높이 자동 조절" />

// 최대 행 수 제한
<Textarea autoResize maxRows={5} placeholder="최대 5줄" />`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Status (상태)" />
              <Body className="mb-4">
                입력 필드의 상태를 시각적으로 표시합니다. 에러, 성공, 정보
                상태를 지원하며, 각 상태에 맞는 border 색상이 적용됩니다.
              </Body>
              <ComponentPreview>
                <div className="flex flex-col gap-4 max-w-md">
                  <TextareaComponent
                    status="error"
                    placeholder="에러 상태"
                    defaultValue="잘못된 입력"
                  />
                  <TextareaComponent
                    status="success"
                    placeholder="성공 상태"
                    defaultValue="유효한 입력"
                  />
                  <TextareaComponent
                    status="info"
                    placeholder="정보 상태"
                    defaultValue="추가 정보"
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Textarea status="error" placeholder="에러 상태" />
<Textarea status="success" placeholder="성공 상태" />
<Textarea status="info" placeholder="정보 상태" />`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="FormField와 함께 사용 (권장)" />
              <Body className="mb-4">
                FormField 컴포넌트와 함께 사용하면 레이블, 에러 메시지, 도움말이
                자동으로 연결됩니다.
              </Body>
              <ComponentPreview>
                <div className="flex flex-col gap-6 max-w-md">
                  <FormField id="description" required>
                    <FormLabel>설명</FormLabel>
                    <TextareaComponent
                      placeholder="상세한 설명을 입력하세요"
                      rows={4}
                    />
                    <FormHelperText>최소 10자 이상 작성해주세요</FormHelperText>
                  </FormField>

                  <FormField id="comment" required status="error">
                    <FormLabel>코멘트</FormLabel>
                    <TextareaComponent
                      placeholder="코멘트를 입력하세요"
                      autoResize
                      maxRows={6}
                    />
                    <FormError>필수 입력 항목입니다</FormError>
                  </FormField>

                  <FormField id="feedback">
                    <FormLabel>피드백</FormLabel>
                    <TextareaComponent
                      placeholder="피드백을 남겨주세요"
                      autoResize
                    />
                    <FormHelperText>
                      자유롭게 의견을 작성해주세요
                    </FormHelperText>
                  </FormField>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`import { FormField, FormLabel, FormError, FormHelperText, Textarea } from '@hanui/react'

// 기본 사용
<FormField id="description" required>
  <FormLabel>설명</FormLabel>
  <Textarea placeholder="상세한 설명을 입력하세요" rows={4} />
  <FormHelperText>최소 10자 이상 작성해주세요</FormHelperText>
</FormField>

// 에러 상태
<FormField id="comment" required status="error">
  <FormLabel>코멘트</FormLabel>
  <Textarea placeholder="코멘트를 입력하세요" autoResize maxRows={6} />
  <FormError>필수 입력 항목입니다</FormError>
</FormField>

// 자동 높이 조절
<FormField id="feedback">
  <FormLabel>피드백</FormLabel>
  <Textarea placeholder="피드백을 남겨주세요" autoResize />
  <FormHelperText>자유롭게 의견을 작성해주세요</FormHelperText>
</FormField>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="사용 가이드" />
              <Body className="mb-4">
                Textarea를 효과적으로 사용하기 위한 가이드입니다:
              </Body>

              <Card variant="filled" className="mb-4">
                <Body weight="bold" className="mb-2">
                  Textarea를 사용하기 적합한 경우:
                </Body>
                <List variant="unordered" spacing="tight">
                  <ListItem>여러 줄의 텍스트 입력이 필요한 경우</ListItem>
                  <ListItem>댓글, 리뷰, 피드백 작성</ListItem>
                  <ListItem>상세한 설명이나 내용 입력</ListItem>
                  <ListItem>메모, 노트 작성</ListItem>
                </List>
              </Card>

              <Card variant="outlined" className="mb-4">
                <Body weight="bold" className="mb-2">
                  Textarea를 사용하지 말아야 하는 경우:
                </Body>
                <List variant="unordered" spacing="tight">
                  <ListItem>한 줄의 짧은 텍스트 입력 (Input 사용)</ListItem>
                  <ListItem>
                    이메일, 전화번호, URL 등 형식이 정해진 입력 (Input 사용)
                  </ListItem>
                  <ListItem>
                    선택 목록이 있는 경우 (Select, Radio 사용)
                  </ListItem>
                </List>
              </Card>

              <Card variant="filled">
                <Body weight="bold" className="mb-2">
                  주의사항:
                </Body>
                <List variant="unordered" spacing="tight">
                  <ListItem>
                    <strong>적절한 크기:</strong> rows 속성으로 초기 높이를
                    설정하세요 (기본 3-5줄 권장)
                  </ListItem>
                  <ListItem>
                    <strong>자동 높이 조절:</strong> 긴 텍스트가 예상되면
                    autoResize를 사용하고 maxRows로 제한하세요
                  </ListItem>
                  <ListItem>
                    <strong>명확한 레이블:</strong> FormLabel로 입력 목적을
                    명확히 표시하세요
                  </ListItem>
                  <ListItem>
                    <strong>글자 수 제한:</strong> maxLength와 FormHelperText로
                    제한 사항을 알려주세요
                  </ListItem>
                </List>
              </Card>
            </Subsection>
          </Section>

          {/* Accessibility */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="Textarea 컴포넌트는 WCAG 2.1 AA 기준을 준수하며 완전한 접근성을 제공합니다."
            />

            <Subsection level="h3">
              <Heading level="h3" title="키보드 지원" />
              <List variant="check" spacing="default">
                <ListItem>
                  <Code>Tab</Code> - 입력 필드로 포커스 이동
                </ListItem>
                <ListItem>
                  <Code>Enter</Code> - 새 줄 추가
                </ListItem>
                <ListItem>
                  <Code>Escape</Code> - 입력 취소 (브라우저 기본 동작)
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="스크린 리더 지원" />
              <List variant="check" spacing="default">
                <ListItem>
                  <Code>aria-invalid</Code> - 에러 상태를 자동으로 전달 (
                  <Code>status=&quot;error&quot;</Code> 사용 시)
                </ListItem>
                <ListItem>
                  <Code>aria-required</Code> - 필수 입력 표시 지원
                </ListItem>
                <ListItem>
                  <Code>aria-describedby</Code> - 에러 메시지 및 도움말 연결
                  지원
                </ListItem>
                <ListItem>
                  모든 HTML textarea 속성 지원 (<Code>id</Code>,{' '}
                  <Code>name</Code>, <Code>disabled</Code>,{' '}
                  <Code>readOnly</Code> 등)
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="폼 통합 예제" />
              <Body className="mb-4">
                <strong>권장 방법:</strong> FormField 컴포넌트를 사용하면 접근성
                속성이 자동으로 연결됩니다.
              </Body>
              <Code variant="block" language="tsx">
                {`// ✅ 권장: FormField 사용 (자동 접근성)
import { FormField, FormLabel, FormError, Textarea } from '@hanui/react'

<FormField id="message" required status="error">
  <FormLabel>메시지</FormLabel>
  <Textarea placeholder="메시지를 입력하세요" />
  <FormError>메시지를 입력해주세요</FormError>
</FormField>

// ⚠️  수동 방법 (직접 aria 속성 관리)
<form>
  <label htmlFor="message" className="block mb-2 font-medium">
    메시지 <span className="text-krds-danger-60">*</span>
  </label>
  <Textarea
    id="message"
    placeholder="메시지를 입력하세요"
    aria-required="true"
    aria-describedby="message-error"
    status="error"
  />
  <p id="message-error" className="mt-1 text-krds-danger-60">
    메시지를 입력해주세요
  </p>
</form>`}
              </Code>
            </Subsection>
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
                    <Code>size</Code>
                  </TableCell>
                  <TableCell>
                    <Code>
                      &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;
                    </Code>
                  </TableCell>
                  <TableCell>
                    <Code>&quot;md&quot;</Code>
                  </TableCell>
                  <TableCell>
                    입력 필드 크기 (min-h: 80px / 96px / 128px)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>variant</Code>
                  </TableCell>
                  <TableCell>
                    <Code>&quot;default&quot; | &quot;filled&quot;</Code>
                  </TableCell>
                  <TableCell>
                    <Code>&quot;default&quot;</Code>
                  </TableCell>
                  <TableCell>입력 필드 스타일</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>status</Code>
                  </TableCell>
                  <TableCell>
                    <Code>
                      &quot;error&quot; | &quot;success&quot; | &quot;info&quot;
                    </Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>입력 상태 표시 (border 색상 변경)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>autoResize</Code>
                  </TableCell>
                  <TableCell>
                    <Code>boolean</Code>
                  </TableCell>
                  <TableCell>
                    <Code>false</Code>
                  </TableCell>
                  <TableCell>입력 내용에 따라 높이 자동 조절</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>maxRows</Code>
                  </TableCell>
                  <TableCell>
                    <Code>number</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    최대 행 수 (autoResize 사용 시에만 적용)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>disabled</Code>
                  </TableCell>
                  <TableCell>
                    <Code>boolean</Code>
                  </TableCell>
                  <TableCell>
                    <Code>false</Code>
                  </TableCell>
                  <TableCell>비활성화 상태</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>readOnly</Code>
                  </TableCell>
                  <TableCell>
                    <Code>boolean</Code>
                  </TableCell>
                  <TableCell>
                    <Code>false</Code>
                  </TableCell>
                  <TableCell>읽기 전용 상태 (값 수정 불가)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>rows</Code>
                  </TableCell>
                  <TableCell>
                    <Code>number</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>초기 행 수</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>placeholder</Code>
                  </TableCell>
                  <TableCell>
                    <Code>string</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>플레이스홀더 텍스트</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>className</Code>
                  </TableCell>
                  <TableCell>
                    <Code>string</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>추가 CSS 클래스 (layout only)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Section>

          {/* Size Variants */}
          <Section level="h2">
            <Heading level="h2" id="size-variants" title="Size Variants" />

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Size</TableHead>
                  <TableHead>Min Height</TableHead>
                  <TableHead>Font Size</TableHead>
                  <TableHead>Padding</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Code>sm</Code>
                  </TableCell>
                  <TableCell>80px</TableCell>
                  <TableCell>15px (body-sm)</TableCell>
                  <TableCell>16px (horizontal), 8px (vertical)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>md</Code>
                  </TableCell>
                  <TableCell>96px</TableCell>
                  <TableCell>17px (body-md)</TableCell>
                  <TableCell>16px (horizontal), 8px (vertical)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>lg</Code>
                  </TableCell>
                  <TableCell>128px</TableCell>
                  <TableCell>19px (body-lg)</TableCell>
                  <TableCell>16px (horizontal), 12px (vertical)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Table', href: '/components/table' }}
        next={{ title: 'Tooltip', href: '/components/tooltip' }}
      />
    </>
  );
}
