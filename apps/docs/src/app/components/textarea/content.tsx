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

// Docs helper components
import { DoCard, DontCard } from '@/components/helpers';

// UI components - from @hanui/react
import {
  Textarea as TextareaComponent,
  FormField,
  FormLabel,
  FormError,
  FormHelperText,
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
        description="다양한 스타일을 지원하는 여러 줄 입력 필드 컴포넌트입니다. 자동 높이 조절 기능과 FormField 자동 통합을 제공합니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* 1. 개요 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              description="Textarea는 여러 줄의 텍스트 입력에 사용됩니다. 자동 높이 조절, FormField 통합, 다양한 상태 표시를 지원합니다."
              className="sr-only"
            />

            <ComponentPreview>
              <div className="flex flex-col gap-4 max-w-lg ">
                <TextareaComponent placeholder="기본 텍스트 영역" />
                <TextareaComponent readOnly value="읽기 전용 텍스트입니다." />
                <TextareaComponent disabled placeholder="비활성화 상태" />
              </div>
            </ComponentPreview>

            <Code variant="block" language="tsx">
              {`import { Textarea } from '@/components/hanui/textarea'

// 기본
<Textarea placeholder="내용을 입력하세요" />

// 읽기 전용
<Textarea readOnly value="읽기 전용 텍스트" />

// 비활성화
<Textarea disabled placeholder="비활성화 상태" />`}
            </Code>
          </Section>

          {/* 2. 설치 */}
          <Section level="h2">
            <Installation componentName="textarea" />
          </Section>

          {/* 3. 사용법 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="usage"
              title="사용법"
              description="Textarea 컴포넌트를 import하여 사용합니다. rows 속성으로 초기 높이를 설정할 수 있습니다."
            />
            <Code variant="block" language="tsx">
              {`import { Textarea } from '@/components/hanui/textarea'

<Textarea placeholder="내용을 입력하세요" rows={4} />`}
            </Code>
          </Section>

          {/* 4. 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Variant"
                description="default(테두리)와 filled(배경) 스타일을 제공합니다."
              />
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
              <Heading
                level="h3"
                title="자동 높이 조절 (Auto Resize)"
                description="autoResize prop을 사용하면 입력 내용에 따라 높이가 자동으로 조절됩니다. maxRows로 최대 높이를 제한할 수 있습니다."
              />
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
              <Heading
                level="h3"
                title="Status (상태)"
                description="status prop으로 에러, 성공, 정보 상태를 시각적으로 표시합니다. 각 상태에 맞는 border 색상이 적용됩니다."
              />
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
              <Heading
                level="h3"
                title="FormField와 함께 사용"
                description="FormField 컴포넌트와 함께 사용하면 레이블, 에러 메시지, 도움말이 자동으로 연결됩니다."
              />
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
                {`import { FormField, FormLabel, FormError, FormHelperText } from '@/components/hanui/form-field';
import { Textarea } from '@/components/hanui/textarea'

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
</FormField>`}
              </Code>
            </Subsection>
          </Section>

          {/* 6. 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다."
            />

            <Subsection level="h3">
              <Heading level="h3" title="키보드 지원" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>키</TableHead>
                    <TableHead>동작</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>Tab</Code>
                    </TableCell>
                    <TableCell>입력 필드로 포커스 이동</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>Enter</Code>
                    </TableCell>
                    <TableCell>새 줄 추가</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>Escape</Code>
                    </TableCell>
                    <TableCell>입력 취소 (브라우저 기본 동작)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="ARIA 속성" />
              <List>
                <ListItem>
                  <Code>aria-invalid</Code>: 에러 상태를 자동으로 전달
                </ListItem>
                <ListItem>
                  <Code>aria-required</Code>: 필수 입력 표시 지원
                </ListItem>
                <ListItem>
                  <Code>aria-describedby</Code>: 에러 메시지 및 도움말 연결
                </ListItem>
                <ListItem>
                  FormField와 함께 사용 시 모든 접근성 속성 자동 연결
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="폼 통합 예제" />
              <Code variant="block" language="tsx">
                {`// ✅ 권장: FormField 사용 (자동 접근성)
import { FormField, FormLabel, FormError, Textarea } from '@hanui/react'

<FormField id="message" required status="error">
  <FormLabel>메시지</FormLabel>
  <Textarea placeholder="메시지를 입력하세요" />
  <FormError>메시지를 입력해주세요</FormError>
</FormField>

// ⚠️ 수동 방법 (직접 aria 속성 관리)
<form>
  <label htmlFor="message">메시지 *</label>
  <Textarea
    id="message"
    placeholder="메시지를 입력하세요"
    aria-required="true"
    aria-describedby="message-error"
    status="error"
  />
  <p id="message-error">메시지를 입력해주세요</p>
</form>`}
              </Code>
            </Subsection>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="props" title="Props" />

            <Subsection level="h3">
              <Heading level="h3" title="Textarea Props" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>속성</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>variant</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">'default' | 'filled'</Code>
                    </TableCell>
                    <TableCell>'default'</TableCell>
                    <TableCell>입력 필드 스타일</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>status</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'error' | 'success' | 'info'
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
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>입력 내용에 따라 높이 자동 조절</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>maxRows</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
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
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>비활성화 상태</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>readOnly</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>읽기 전용 상태 (값 수정 불가)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>rows</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>초기 행 수</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>placeholder</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>플레이스홀더 텍스트</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Tabs', href: '/components/tabs' }}
        next={{ title: 'Toast', href: '/components/toast' }}
      />
    </>
  );
}
