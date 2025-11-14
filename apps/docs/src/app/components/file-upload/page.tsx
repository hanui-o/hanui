'use client';

import {
  FileUpload,
  type UploadedFile,
  Heading,
  Body,
  Stack,
} from '@hanui/react';
import { useState } from 'react';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

export default function FileUploadPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleUpload = (files: File[]) => {
    console.log('Uploading files:', files);
    // 실제 업로드 로직
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
      <PageHeader
        title="FileUpload"
        description="파일 업로드 기능을 제공하는 KRDS 기반 파일 업로드 컴포넌트"
      />

      {/* Quick Start */}
      <PageSection>
        <ComponentPreview>
          <div className="max-w-md">
            <FileUpload
              onUpload={handleUpload}
              onChange={handleChange}
              onError={handleError}
            />
          </div>
        </ComponentPreview>
        <div className="mt-4">
          <CodeBlock
            code={`import { FileUpload } from '@hanui/react';

export default () => {
  const handleUpload = (files: File[]) => {
    console.log('Uploading:', files);
  };

  return (
    <FileUpload
      onUpload={handleUpload}
      onChange={(files) => console.log(files)}
      onError={(error) => console.error(error)}
    />
  );
};`}
            language="tsx"
            showLineNumbers={false}
          />
        </div>
      </PageSection>

      {/* Examples */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="examples">
            Examples
          </Heading>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* With Label */}
          <Stack spacing="heading-tight">
            <Heading level="h3">With Label</Heading>
            <Body className="mb-4">
              라벨을 표시하여 업로드 영역의 의미를 명확히 합니다.
            </Body>
            <div>
              <ComponentPreview>
                <div className="max-w-md">
                  <FileUpload
                    label="프로필 이미지 업로드"
                    onUpload={handleUpload}
                    onChange={handleChange}
                    onError={handleError}
                  />
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<FileUpload
  label="프로필 이미지 업로드"
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
/>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Accept Types */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Accept Types</Heading>
            <Body className="mb-4">
              accept prop으로 허용할 파일 유형을 제한할 수 있습니다.
            </Body>
            <div>
              <ComponentPreview>
                <div className="space-y-6">
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
              <div className="mt-4">
                <CodeBlock
                  code={`<FileUpload
  label="이미지만 업로드"
  accept="image/*"
  onUpload={handleUpload}
/>

<FileUpload
  label="PDF만 업로드"
  accept=".pdf"
  onUpload={handleUpload}
/>

<FileUpload
  label="문서 파일 업로드"
  accept=".doc,.docx,.pdf,.txt"
  onUpload={handleUpload}
/>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* File Size Limit */}
          <Stack spacing="heading-tight">
            <Heading level="h3">File Size Limit</Heading>
            <Body className="mb-4">
              maxSize prop으로 파일 크기 제한을 설정할 수 있습니다. (바이트
              단위)
            </Body>
            <div>
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
              <div className="mt-4">
                <CodeBlock
                  code={`<FileUpload
  label="최대 5MB 파일 업로드"
  maxSize={5 * 1024 * 1024} // 5MB
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
/>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Multiple Files */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Multiple Files</Heading>
            <Body className="mb-4">
              multiple prop으로 여러 파일을 동시에 업로드할 수 있습니다.
            </Body>
            <div>
              <ComponentPreview>
                <div className="max-w-md">
                  <FileUpload
                    label="여러 파일 업로드"
                    multiple
                    maxFiles={5}
                    onUpload={handleUpload}
                    onChange={handleChange}
                    onError={handleError}
                  />
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<FileUpload
  label="여러 파일 업로드"
  multiple
  maxFiles={5}
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
/>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* With File List */}
          <Stack spacing="heading-tight">
            <Heading level="h3">With File List</Heading>
            <Body className="mb-4">
              showFileList prop으로 업로드된 파일 목록을 표시할 수 있습니다.
              기본값은 true입니다.
            </Body>
            <div>
              <ComponentPreview>
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
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<FileUpload
  label="파일 목록 표시"
  multiple
  showFileList
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
/>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Without File List */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Without File List</Heading>
            <Body className="mb-4">파일 목록을 숨길 수 있습니다.</Body>
            <div>
              <ComponentPreview>
                <div className="max-w-md">
                  <FileUpload
                    label="파일 목록 숨김"
                    showFileList={false}
                    onUpload={handleUpload}
                    onChange={handleChange}
                    onError={handleError}
                  />
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<FileUpload
  label="파일 목록 숨김"
  showFileList={false}
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
/>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Disabled */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Disabled</Heading>
            <Body className="mb-4">비활성화된 파일 업로드 컴포넌트입니다.</Body>
            <div>
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
              <div className="mt-4">
                <CodeBlock
                  code={`<FileUpload
  label="비활성화된 업로드"
  disabled
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
/>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Complete Example */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Complete Example</Heading>
            <Body className="mb-4">
              모든 기능을 사용하는 완전한 예제입니다.
            </Body>
            <div>
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
                  <p className="mt-2 text-sm text-gray-60 dark:text-gray-40">
                    이미지, PDF, 문서 파일만 업로드 가능합니다. (최대 10MB, 3개)
                  </p>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<FileUpload
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
<p className="mt-2 text-sm text-gray-500">
  이미지, PDF, 문서 파일만 업로드 가능합니다. (최대 10MB, 3개)
</p>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>
        </Stack>
      </PageSection>

      {/* API Reference */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="api">
            API Reference
          </Heading>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-20 dark:border-gray-80">
                  <th className="text-left py-3 px-4 font-semibold w-1/5">
                    Prop
                  </th>
                  <th className="text-left py-3 px-4 font-semibold w-2/5">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 font-semibold w-1/6">
                    Default
                  </th>
                  <th className="text-left py-3 px-4 font-semibold w-1/4">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-20 dark:border-gray-80">
                  <td className="py-3 px-4 font-mono text-sm">accept</td>
                  <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                    string
                  </td>
                  <td className="py-3 px-4 font-mono text-sm">-</td>
                  <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                    허용할 파일 유형
                  </td>
                </tr>
                <tr className="border-b border-gray-20 dark:border-gray-80">
                  <td className="py-3 px-4 font-mono text-sm">maxSize</td>
                  <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                    number
                  </td>
                  <td className="py-3 px-4 font-mono text-sm">-</td>
                  <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                    최대 파일 크기 (바이트)
                  </td>
                </tr>
                <tr className="border-b border-gray-20 dark:border-gray-80">
                  <td className="py-3 px-4 font-mono text-sm">maxFiles</td>
                  <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                    number
                  </td>
                  <td className="py-3 px-4 font-mono text-sm">-</td>
                  <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                    최대 파일 개수
                  </td>
                </tr>
                <tr className="border-b border-gray-20 dark:border-gray-80">
                  <td className="py-3 px-4 font-mono text-sm">multiple</td>
                  <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                    boolean
                  </td>
                  <td className="py-3 px-4 font-mono text-sm">false</td>
                  <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                    다중 파일 업로드 허용
                  </td>
                </tr>
                <tr className="border-b border-gray-20 dark:border-gray-80">
                  <td className="py-3 px-4 font-mono text-sm">onUpload</td>
                  <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                    (files: File[]) =&gt; void
                  </td>
                  <td className="py-3 px-4 font-mono text-sm">-</td>
                  <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                    업로드 버튼 클릭 시 호출
                  </td>
                </tr>
                <tr className="border-b border-gray-20 dark:border-gray-80">
                  <td className="py-3 px-4 font-mono text-sm">onChange</td>
                  <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                    (files: File[]) =&gt; void
                  </td>
                  <td className="py-3 px-4 font-mono text-sm">-</td>
                  <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                    파일 선택 시 호출
                  </td>
                </tr>
                <tr className="border-b border-gray-20 dark:border-gray-80">
                  <td className="py-3 px-4 font-mono text-sm">onError</td>
                  <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                    (error: string) =&gt; void
                  </td>
                  <td className="py-3 px-4 font-mono text-sm">-</td>
                  <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                    에러 발생 시 호출
                  </td>
                </tr>
                <tr className="border-b border-gray-20 dark:border-gray-80">
                  <td className="py-3 px-4 font-mono text-sm">disabled</td>
                  <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                    boolean
                  </td>
                  <td className="py-3 px-4 font-mono text-sm">false</td>
                  <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                    비활성화 상태
                  </td>
                </tr>
                <tr className="border-b border-gray-20 dark:border-gray-80">
                  <td className="py-3 px-4 font-mono text-sm">label</td>
                  <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                    string
                  </td>
                  <td className="py-3 px-4 font-mono text-sm">-</td>
                  <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                    라벨 텍스트
                  </td>
                </tr>
                <tr className="border-b border-gray-20 dark:border-gray-80">
                  <td className="py-3 px-4 font-mono text-sm">showFileList</td>
                  <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                    boolean
                  </td>
                  <td className="py-3 px-4 font-mono text-sm">true</td>
                  <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                    파일 목록 표시 여부
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Stack>
      </PageSection>

      {/* Best Practices */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="best-practices">
            Best Practices
          </Heading>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>파일 유형 제한:</strong> accept prop으로 필요한 파일
              유형만 허용하세요
            </li>
            <li>
              <strong>크기 제한 안내:</strong> 사용자에게 파일 크기 제한을
              명확히 안내하세요
            </li>
            <li>
              <strong>에러 처리:</strong> onError 핸들러로 사용자 친화적인 에러
              메시지를 표시하세요
            </li>
            <li>
              <strong>진행 상태:</strong> 업로드 중 진행 상태를 표시하면 사용자
              경험이 향상됩니다
            </li>
            <li>
              <strong>드래그 앤 드롭:</strong> 가능하면 드래그 앤 드롭 기능을
              지원하세요
            </li>
            <li>
              <strong>미리보기:</strong> 이미지 파일의 경우 업로드 전 미리보기를
              제공하세요
            </li>
          </ul>
        </Stack>
      </PageSection>

      {/* Accessibility */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="accessibility">
            Accessibility
          </Heading>
          <Body>이 컴포넌트는 WCAG 2.1 AA 기준을 준수합니다:</Body>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>레이블 연결:</strong> label과 input이 적절히 연결되어
              스크린 리더 지원
            </li>
            <li>
              <strong>키보드 접근:</strong> Tab 키로 포커스 이동, Enter/Space로
              파일 선택 대화상자 열기
            </li>
            <li>
              <strong>포커스 표시:</strong> 포커스 시 명확한 시각적 표시
            </li>
            <li>
              <strong>ARIA 속성:</strong> 적절한 role과 aria-label 제공
            </li>
            <li>
              <strong>에러 메시지:</strong> 에러 발생 시 스크린 리더가 읽을 수
              있도록 구현
            </li>
            <li>
              <strong>상태 알림:</strong> 업로드 진행, 완료, 실패 상태를 스크린
              리더에 전달
            </li>
          </ul>
        </Stack>
      </PageSection>
    </>
  );
}
