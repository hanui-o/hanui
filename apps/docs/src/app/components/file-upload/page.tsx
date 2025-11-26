'use client';

import { FileUpload, type UploadedFile } from '@hanui/react';
import { useState } from 'react';

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
} from '@hanui/react';

export default function FileUploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleUpload = async (files: File[]) => {
    console.log('Uploading files:', files);
    // 실제 업로드 로직 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const handleChange = (files: UploadedFile[]) => {
    setFiles(files);
    console.log('Files changed:', files);
  };

  const handleError = (error: string) => {
    console.error('Upload error:', error);
    alert(error);
  };

  const handlePreview = (file: UploadedFile) => {
    console.log('Preview file:', file);
    // 이미지 미리보기 로직
    if (file.preview) {
      window.open(file.preview, '_blank');
    }
  };

  const handleDownload = (file: UploadedFile) => {
    console.log('Download file:', file);
    // 다운로드 로직
    const url = URL.createObjectURL(file.file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Heading
        level="h1"
        title="FileUpload"
        description="드래그 앤 드롭과 파일 검증을 지원하는 KRDS 기반 파일 업로드 컴포넌트"
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview">
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />
            <ComponentPreview>
              <FileUpload
                onUpload={handleUpload}
                onChange={handleChange}
                onError={handleError}
              />
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<FileUpload
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
/>`}
            </Code>
          </Section>

          <Section level="h2">
            <Installation componentName="file-upload" />
          </Section>

          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { FileUpload, type UploadedFile } from '@hanui/react'
import { useState } from 'react'

export default function MyComponent() {
  const [files, setFiles] = useState<UploadedFile[]>([])

  const handleUpload = async (files: File[]) => {
    // 실제 업로드 로직 구현
    console.log('Uploading:', files)
  }

  const handleChange = (files: UploadedFile[]) => {
    setFiles(files)
  }

  const handleError = (error: string) => {
    console.error(error)
    alert(error)
  }

  return (
    <FileUpload
      title="파일 첨부"
      description="최대 5개 파일, 각 10MB 이하"
      accept="image/*,.pdf"
      maxSize={10 * 1024 * 1024}
      maxFiles={5}
      multiple
      onUpload={handleUpload}
      onChange={handleChange}
      onError={handleError}
    />
  )
}`}
            </Code>
          </Section>

          {/* 예제 섹션 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading level="h3" title="기본 사용" />
              <ComponentPreview>
                <FileUpload
                  onUpload={handleUpload}
                  onChange={handleChange}
                  onError={handleError}
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<FileUpload
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="제목과 설명" />
              <ComponentPreview>
                <FileUpload
                  title="서류 첨부"
                  description="최대 5개 파일, 각 10MB 이하"
                  onUpload={handleUpload}
                  onChange={handleChange}
                  onError={handleError}
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<FileUpload
  title="서류 첨부"
  description="최대 5개 파일, 각 10MB 이하"
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="테두리 스타일" />
              <ComponentPreview>
                <FileUpload
                  bordered
                  title="테두리가 있는 파일 업로드"
                  onUpload={handleUpload}
                  onChange={handleChange}
                  onError={handleError}
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<FileUpload
  bordered
  title="테두리가 있는 파일 업로드"
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="파일 타입 제한" />
              <ComponentPreview>
                <div className="space-y-6">
                  <FileUpload
                    title="이미지만 업로드"
                    accept="image/*"
                    onUpload={handleUpload}
                    onChange={handleChange}
                    onError={handleError}
                  />
                  <FileUpload
                    title="문서 파일 업로드"
                    accept=".pdf,.doc,.docx,.hwp"
                    onUpload={handleUpload}
                    onChange={handleChange}
                    onError={handleError}
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`// 이미지만 허용
<FileUpload
  title="이미지만 업로드"
  accept="image/*"
  onUpload={handleUpload}
/>

// 특정 문서 파일만 허용
<FileUpload
  title="문서 파일 업로드"
  accept=".pdf,.doc,.docx,.hwp"
  onUpload={handleUpload}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="파일 크기 제한" />
              <ComponentPreview>
                <FileUpload
                  title="최대 5MB 파일 업로드"
                  maxSize={5 * 1024 * 1024}
                  onUpload={handleUpload}
                  onChange={handleChange}
                  onError={handleError}
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<FileUpload
  title="최대 5MB 파일 업로드"
  maxSize={5 * 1024 * 1024} // 5MB
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="다중 파일 업로드" />
              <ComponentPreview>
                <FileUpload
                  title="여러 파일 업로드"
                  description="최대 5개 파일"
                  multiple
                  maxFiles={5}
                  onUpload={handleUpload}
                  onChange={handleChange}
                  onError={handleError}
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<FileUpload
  title="여러 파일 업로드"
  description="최대 5개 파일"
  multiple
  maxFiles={5}
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="파일 액션 (미리보기, 다운로드)" />
              <ComponentPreview>
                <FileUpload
                  title="파일 미리보기 및 다운로드"
                  accept="image/*,.pdf"
                  multiple
                  onUpload={handleUpload}
                  onChange={handleChange}
                  onError={handleError}
                  onPreview={handlePreview}
                  onDownload={handleDownload}
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`const handlePreview = (file: UploadedFile) => {
  if (file.preview) {
    window.open(file.preview, '_blank')
  }
}

const handleDownload = (file: UploadedFile) => {
  const url = URL.createObjectURL(file.file)
  const a = document.createElement('a')
  a.href = url
  a.download = file.file.name
  a.click()
  URL.revokeObjectURL(url)
}

<FileUpload
  title="파일 미리보기 및 다운로드"
  accept="image/*,.pdf"
  multiple
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
  onPreview={handlePreview}
  onDownload={handleDownload}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="비활성화" />
              <ComponentPreview>
                <FileUpload
                  title="비활성화된 업로드"
                  disabled
                  onUpload={handleUpload}
                  onChange={handleChange}
                  onError={handleError}
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<FileUpload
  title="비활성화된 업로드"
  disabled
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="커스텀 텍스트" />
              <ComponentPreview>
                <FileUpload
                  title="프로젝트 파일"
                  uploadButtonText="파일 찾기"
                  instructionText="여기를 클릭하거나 파일을 드래그하세요"
                  deleteAllText="모두 삭제"
                  onUpload={handleUpload}
                  onChange={handleChange}
                  onError={handleError}
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<FileUpload
  title="프로젝트 파일"
  uploadButtonText="파일 찾기"
  instructionText="여기를 클릭하거나 파일을 드래그하세요"
  deleteAllText="모두 삭제"
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="완전한 예제" />
              <ComponentPreview>
                <FileUpload
                  bordered
                  title="프로젝트 서류 제출"
                  description="이미지, PDF, 문서 파일만 업로드 가능합니다"
                  accept="image/*,.pdf,.doc,.docx,.hwp"
                  maxSize={10 * 1024 * 1024}
                  maxFiles={3}
                  multiple
                  onUpload={handleUpload}
                  onChange={handleChange}
                  onError={handleError}
                  onPreview={handlePreview}
                  onDownload={handleDownload}
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<FileUpload
  bordered
  title="프로젝트 서류 제출"
  description="이미지, PDF, 문서 파일만 업로드 가능합니다"
  accept="image/*,.pdf,.doc,.docx,.hwp"
  maxSize={10 * 1024 * 1024} // 10MB
  maxFiles={3}
  multiple
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
  onPreview={handlePreview}
  onDownload={handleDownload}
/>`}
              </Code>
            </Subsection>
          </Section>

          {/* 접근성 섹션 */}
          <Section level="h2">
            <Heading level="h2" id="accessibility" title="접근성" />
            <p className="[font-size:var(--krds-size-body-md)] text-krds-gray-80 mb-4">
              FileUpload 컴포넌트는 WCAG 2.1 및 KWCAG 2.2 접근성 지침을
              준수합니다.
            </p>
            <ul className="list-disc list-inside space-y-2 [font-size:var(--krds-size-body-md)] text-krds-gray-80">
              <li>
                <strong>키보드 접근성:</strong> 파일 입력은 숨겨져 있지만{' '}
                <Code>sr-only</Code> 클래스를 사용하여 스크린 리더에 접근
                가능합니다
              </li>
              <li>
                <strong>드래그 앤 드롭:</strong> 마우스 없이도 버튼을 통해 파일
                선택이 가능합니다
              </li>
              <li>
                <strong>상태 표시:</strong> 업로드 중, 완료, 에러 상태가 시각적
                아이콘과 텍스트로 명확히 표시됩니다
              </li>
              <li>
                <strong>ARIA 속성:</strong> 진행률 표시줄에{' '}
                <Code>role=&quot;progressbar&quot;</Code>와 적절한 aria 속성이
                적용됩니다
              </li>
              <li>
                <strong>파일 정보:</strong> 각 파일의 이름, 크기, 상태가 명확히
                표시됩니다
              </li>
              <li>
                <strong>에러 처리:</strong> 검증 실패 시 명확한 에러 메시지를
                제공합니다
              </li>
            </ul>
          </Section>
        </TabsContent>

        {/* API 탭 */}
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
                      <Code>title</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>'파일 첨부'</TableCell>
                    <TableCell>파일 업로드 섹션의 제목</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>description</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>제목 아래 표시할 설명 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>accept</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      허용할 파일 유형 (예: &quot;image/*,.pdf&quot;)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>maxSize</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>최대 파일 크기 (바이트)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>maxFiles</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>최대 파일 개수</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>multiple</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>다중 파일 업로드 허용</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>onUpload</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        (files: File[]) =&gt; void | Promise&lt;void&gt;
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>파일 선택/드롭 시 호출되는 콜백</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>onChange</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        (files: UploadedFile[]) =&gt; void
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>파일 추가/삭제 시 호출되는 콜백</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>onError</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        (error: string) =&gt; void
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>검증 에러 발생 시 호출되는 콜백</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>onRemove</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        (file: UploadedFile) =&gt; void
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>파일 삭제 시 호출되는 콜백</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>onPreview</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        (file: UploadedFile) =&gt; void
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>파일 미리보기 시 호출되는 콜백</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>onDownload</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        (file: UploadedFile) =&gt; void
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>파일 다운로드 시 호출되는 콜백</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>disabled</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>비활성화 상태</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>bordered</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>테두리 스타일 표시 여부</TableCell>
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
                      <Code>uploadButtonText</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>'파일 선택'</TableCell>
                    <TableCell>업로드 버튼 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>instructionText</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>'파일을 선택하거나 끌어다 놓으세요'</TableCell>
                    <TableCell>업로드 영역 안내 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>showDeleteAll</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>true</TableCell>
                    <TableCell>전체 삭제 버튼 표시 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>deleteAllText</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>'전체 삭제'</TableCell>
                    <TableCell>전체 삭제 버튼 텍스트</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Types" />
              <Code variant="block" language="tsx">
                {`// 파일 업로드 상태
type FileUploadStatus = 'idle' | 'uploading' | 'complete' | 'error'

// 업로드된 파일 정보
interface UploadedFile {
  file: File                    // 네이티브 File 객체
  id: string                    // 고유 식별자
  status: FileUploadStatus      // 파일 상태
  progress?: number             // 업로드 진행률 (0-100)
  error?: string                // 에러 메시지
  preview?: string              // 이미지 미리보기 URL (이미지만)
}`}
              </Code>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Display', href: '/components/display' }}
        next={{ title: 'Header', href: '/components/header' }}
      />
    </>
  );
}
