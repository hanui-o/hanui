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

  const handleUpload = (files: File[]) => {
    console.log('Uploading files:', files);
  };

  const handleChange = (files: UploadedFile[]) => {
    setFiles(files);
    console.log('Files changed:', files);
  };

  const handleError = (error: string) => {
    console.error('Upload error:', error);
    alert(error);
  };

  return (
    <>
      <Heading
        level="h1"
        title="FileUpload"
        description="드래그 앤 드롭과 파일 검증을 지원하는 KRDS 기반 파일 업로드 컴포넌트입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* 개요 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />
            <ComponentPreview>
              <div className="max-w-md">
                <FileUpload
                  onUpload={handleUpload}
                  onChange={handleChange}
                  onError={handleError}
                />
              </div>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<FileUpload
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
/>`}
            </Code>
          </Section>

          {/* 설치 */}
          <Installation componentName="file-upload" />

          {/* 사용법 */}
          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { FileUpload, type UploadedFile } from '@hanui/react'
import { useState } from 'react'

export default function MyComponent() {
  const [files, setFiles] = useState<UploadedFile[]>([])

  const handleUpload = (files: File[]) => {
    console.log('Uploading:', files)
    // 실제 업로드 로직 구현
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

          {/* 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            {/* Accept Types */}
            <Subsection level="h3">
              <Heading level="h3" title="파일 타입 제한" />
              <ComponentPreview>
                <div className="flex flex-col gap-6">
                  <div className="max-w-md">
                    <FileUpload
                      label="이미지만 업로드"
                      accept="image/*"
                      onUpload={handleUpload}
                      onChange={handleChange}
                      onError={handleError}
                    />
                  </div>
                  <div className="max-w-md">
                    <FileUpload
                      label="PDF만 업로드"
                      accept=".pdf"
                      onUpload={handleUpload}
                      onChange={handleChange}
                      onError={handleError}
                    />
                  </div>
                  <div className="max-w-md">
                    <FileUpload
                      label="문서 파일 업로드"
                      accept=".doc,.docx,.pdf,.txt"
                      onUpload={handleUpload}
                      onChange={handleChange}
                      onError={handleError}
                    />
                  </div>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`// 이미지만 허용
<FileUpload
  label="이미지만 업로드"
  accept="image/*"
  onUpload={handleUpload}
/>

// PDF만 허용
<FileUpload
  label="PDF만 업로드"
  accept=".pdf"
  onUpload={handleUpload}
/>

// 특정 문서 파일만 허용
<FileUpload
  label="문서 파일 업로드"
  accept=".doc,.docx,.pdf,.txt"
  onUpload={handleUpload}
/>`}
              </Code>
            </Subsection>

            {/* File Size Limit */}
            <Subsection level="h3">
              <Heading level="h3" title="파일 크기 제한" />
              <ComponentPreview>
                <div className="max-w-md">
                  <FileUpload
                    label="최대 5MB 파일 업로드"
                    maxSize={5 * 1024 * 1024}
                    onUpload={handleUpload}
                    onChange={handleChange}
                    onError={handleError}
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<FileUpload
  label="최대 5MB 파일 업로드"
  maxSize={5 * 1024 * 1024} // 5MB
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
/>`}
              </Code>
            </Subsection>

            {/* Multiple Files */}
            <Subsection level="h3">
              <Heading level="h3" title="다중 파일 업로드" />
              <ComponentPreview>
                <div className="max-w-md">
                  <FileUpload
                    label="여러 파일 업로드 (최대 5개)"
                    multiple
                    maxFiles={5}
                    onUpload={handleUpload}
                    onChange={handleChange}
                    onError={handleError}
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<FileUpload
  label="여러 파일 업로드 (최대 5개)"
  multiple
  maxFiles={5}
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
/>`}
              </Code>
            </Subsection>

            {/* Show/Hide File List */}
            <Subsection level="h3">
              <Heading level="h3" title="파일 목록 표시/숨김" />
              <ComponentPreview>
                <div className="flex flex-col gap-6">
                  <div className="max-w-md">
                    <FileUpload
                      label="파일 목록 표시"
                      multiple
                      showFileList
                      onUpload={handleUpload}
                      onChange={handleChange}
                      onError={handleError}
                    />
                  </div>
                  <div className="max-w-md">
                    <FileUpload
                      label="파일 목록 숨김"
                      showFileList={false}
                      onUpload={handleUpload}
                      onChange={handleChange}
                      onError={handleError}
                    />
                  </div>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`// 파일 목록 표시 (기본값)
<FileUpload
  label="파일 목록 표시"
  multiple
  showFileList
  onUpload={handleUpload}
/>

// 파일 목록 숨김
<FileUpload
  label="파일 목록 숨김"
  showFileList={false}
  onUpload={handleUpload}
/>`}
              </Code>
            </Subsection>

            {/* Disabled */}
            <Subsection level="h3">
              <Heading level="h3" title="비활성화" />
              <ComponentPreview>
                <div className="max-w-md">
                  <FileUpload
                    label="비활성화된 업로드"
                    disabled
                    onUpload={handleUpload}
                    onChange={handleChange}
                    onError={handleError}
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<FileUpload
  label="비활성화된 업로드"
  disabled
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
/>`}
              </Code>
            </Subsection>

            {/* Complete Example */}
            <Subsection level="h3">
              <Heading level="h3" title="완전한 예제" />
              <ComponentPreview>
                <div className="max-w-md">
                  <FileUpload
                    label="프로젝트 파일 업로드"
                    accept="image/*,.pdf,.doc,.docx"
                    maxSize={10 * 1024 * 1024}
                    maxFiles={3}
                    multiple
                    showFileList
                    onUpload={handleUpload}
                    onChange={handleChange}
                    onError={handleError}
                  />
                  <p className="mt-2 text-[13px] text-krds-gray-60">
                    이미지, PDF, 문서 파일만 업로드 가능합니다. (최대 10MB, 3개)
                  </p>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<FileUpload
  label="프로젝트 파일 업로드"
  accept="image/*,.pdf,.doc,.docx"
  maxSize={10 * 1024 * 1024} // 10MB
  maxFiles={3}
  multiple
  showFileList
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
/>
<p className="mt-2 text-sm text-krds-gray-60">
  이미지, PDF, 문서 파일만 업로드 가능합니다. (최대 10MB, 3개)
</p>`}
              </Code>
            </Subsection>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="FileUpload" />
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
                      <Code>accept</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>허용할 파일 유형</TableCell>
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
                    <TableCell>파일 선택/드롭 시 호출</TableCell>
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
                    <TableCell>파일 추가/삭제 시 호출</TableCell>
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
                    <TableCell>검증 에러 발생 시 호출</TableCell>
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
                      <Code>label</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>'Drag files here or click to upload'</TableCell>
                    <TableCell>업로드 영역 라벨 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>showFileList</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>true</TableCell>
                    <TableCell>파일 목록 표시 여부</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="UploadedFile" />
              <Code variant="block" language="tsx">
                {`interface UploadedFile {
  file: File           // 네이티브 File 객체
  id: string           // 고유 식별자
  preview?: string     // 이미지 미리보기 URL (이미지 파일만)
  progress?: number    // 업로드 진행률 (0-100)
  error?: string       // 에러 메시지
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
