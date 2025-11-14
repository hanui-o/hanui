'use client';

import {
  FileUpload,
  type UploadedFile,
  Heading,
  Body,
  Stack,
  SkipLink,
} from '@hanui/react';
import { useState } from 'react';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';
import { GuidelineSection } from '@/components/content/GuidelineSection';

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
      <SkipLink
        links={[{ href: '#file-upload-content', label: '본문 바로가기' }]}
      />

      <PageHeader
        title="FileUpload (파일 업로드)"
        description="드래그 앤 드롭과 파일 검증을 지원하는 KRDS 기반 파일 업로드 컴포넌트입니다. WCAG 2.1 / KWCAG 2.2 AA 기준을 준수합니다."
      />

      {/* Quick Start */}
      <PageSection>
        <Heading level="h2" id="file-upload-content">
          Quick Start
        </Heading>
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

      {/* Guidelines */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="guidelines">
            Guidelines (가이드라인)
          </Heading>

          <GuidelineSection title="언제 사용하나요?" type="do">
            <ul className="list-disc list-inside space-y-2">
              <li>
                사용자가 문서, 이미지, 또는 기타 파일을 시스템에 업로드해야 할
                때
              </li>
              <li>프로필 사진, 첨부 파일, 증빙 서류 등을 제출해야 할 때</li>
              <li>드래그 앤 드롭으로 편리한 파일 업로드를 제공하고 싶을 때</li>
              <li>파일 유형이나 크기 제한이 필요한 경우</li>
              <li>여러 파일을 한 번에 업로드해야 하는 경우</li>
            </ul>
          </GuidelineSection>

          <GuidelineSection title="언제 사용하지 말아야 하나요?" type="dont">
            <ul className="list-disc list-inside space-y-2">
              <li>간단한 텍스트 입력만 필요한 경우 (Input 컴포넌트 사용)</li>
              <li>
                단일 이미지 선택만 필요하고 미리보기가 주요 기능인 경우 (별도의
                이미지 선택기 사용)
              </li>
              <li>파일 업로드가 아닌 URL 입력을 받아야 하는 경우</li>
              <li>실시간 편집이 필요한 경우 (텍스트 에디터 사용)</li>
            </ul>
          </GuidelineSection>
        </Stack>
      </PageSection>

      {/* Design Principles */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="design-principles">
            Design Principles (디자인 원칙)
          </Heading>
          <div className="space-y-4">
            <div>
              <Heading level="h3" className="text-lg font-semibold mb-2">
                1. 명확한 인터랙션 표시
              </Heading>
              <Body>
                드래그 앤 드롭과 클릭 모두 가능하다는 것을 시각적으로 명확히
                표시합니다. 드래그 중일 때는 명확한 시각적 피드백을 제공합니다.
              </Body>
            </div>
            <div>
              <Heading level="h3" className="text-lg font-semibold mb-2">
                2. 사전 검증 및 명확한 에러 메시지
              </Heading>
              <Body>
                파일 유형, 크기, 개수를 미리 검증하고, 검증 실패 시 구체적이고
                이해하기 쉬운 에러 메시지를 제공합니다.
              </Body>
            </div>
            <div>
              <Heading level="h3" className="text-lg font-semibold mb-2">
                3. 업로드 상태 피드백
              </Heading>
              <Body>
                파일 목록과 함께 업로드 진행 상태를 표시하여 사용자가 현재
                상황을 파악할 수 있도록 합니다.
              </Body>
            </div>
            <div>
              <Heading level="h3" className="text-lg font-semibold mb-2">
                4. 접근성 우선
              </Heading>
              <Body>
                키보드만으로도 모든 기능에 접근 가능하며, 스크린 리더 사용자를
                위한 적절한 ARIA 속성을 제공합니다.
              </Body>
            </div>
          </div>
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
            Accessibility (접근성)
          </Heading>
          <Body>
            이 컴포넌트는 WCAG 2.1 / KWCAG 2.2 AA 기준을 준수하여 모든 사용자가
            파일 업로드 기능을 사용할 수 있도록 설계되었습니다:
          </Body>

          <div className="space-y-4 mt-4">
            <div>
              <Heading level="h3" className="text-base font-semibold mb-2">
                1. 키보드 내비게이션 (Keyboard Navigation)
              </Heading>
              <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                <li>
                  <strong>Tab:</strong> 업로드 영역과 파일 삭제 버튼 간 포커스
                  이동
                </li>
                <li>
                  <strong>Enter/Space:</strong> 파일 선택 대화상자 열기
                </li>
                <li>
                  <strong>Focus Ring:</strong> 포커스된 요소에 명확한 파란색 링
                  표시
                </li>
              </ul>
            </div>

            <div>
              <Heading level="h3" className="text-base font-semibold mb-2">
                2. 스크린 리더 지원 (Screen Reader Support)
              </Heading>
              <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                <li>
                  <strong>ARIA Labels:</strong> aria-label로 업로드 영역의 목적
                  설명
                </li>
                <li>
                  <strong>File List:</strong> 업로드된 파일 목록을 aria-label로
                  명시
                </li>
                <li>
                  <strong>Remove Buttons:</strong> 각 파일 삭제 버튼에 파일명
                  포함된 aria-label
                </li>
                <li>
                  <strong>Disabled State:</strong> aria-disabled로 비활성 상태
                  전달
                </li>
              </ul>
            </div>

            <div>
              <Heading level="h3" className="text-base font-semibold mb-2">
                3. 시각적 피드백 (Visual Feedback)
              </Heading>
              <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                <li>
                  <strong>Drag State:</strong> 드래그 중일 때 테두리와 배경색
                  변경
                </li>
                <li>
                  <strong>Progress Bar:</strong> 업로드 진행 상태를 시각적으로
                  표시
                </li>
                <li>
                  <strong>Error States:</strong> 에러 발생 시 빨간색으로 강조
                  표시
                </li>
                <li>
                  <strong>Dark Mode:</strong> 다크 모드에서도 충분한 대비율 유지
                </li>
              </ul>
            </div>

            <div>
              <Heading level="h3" className="text-base font-semibold mb-2">
                4. 에러 처리 (Error Handling)
              </Heading>
              <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                <li>
                  <strong>Validation:</strong> 파일 유형, 크기, 개수를 즉시 검증
                </li>
                <li>
                  <strong>Error Messages:</strong> 구체적이고 이해하기 쉬운 에러
                  메시지
                </li>
                <li>
                  <strong>Error Callback:</strong> onError로 커스텀 에러 처리
                  가능
                </li>
              </ul>
            </div>
          </div>
        </Stack>
      </PageSection>

      {/* Foundation Layer */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="foundation-layer">
            Foundation Layer (기초 레이어)
          </Heading>
          <Body>
            FileUpload 컴포넌트는 Foundation Layer에서 다음 기능들을 자동으로
            처리합니다:
          </Body>
          <div className="space-y-3 mt-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
              <Heading level="h3" className="text-sm font-semibold mb-1">
                ✅ 1. 드래그 앤 드롭 (Drag & Drop)
              </Heading>
              <Body className="text-sm">
                HTML5 드래그 앤 드롭 API를 사용하여 파일을 드래그하여 업로드할
                수 있습니다. 드래그 중 시각적 피드백을 자동으로 제공합니다.
              </Body>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
              <Heading level="h3" className="text-sm font-semibold mb-1">
                ✅ 2. 파일 검증 (File Validation)
              </Heading>
              <Body className="text-sm">
                파일 유형(accept), 크기(maxSize), 개수(maxFiles)를 자동으로
                검증하고 적절한 에러 메시지를 표시합니다.
              </Body>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
              <Heading level="h3" className="text-sm font-semibold mb-1">
                ✅ 3. 이미지 미리보기 (Image Preview)
              </Heading>
              <Body className="text-sm">
                이미지 파일은 자동으로 썸네일 미리보기를 생성하여 표시합니다.
                메모리 누수 방지를 위해 컴포넌트 언마운트 시 자동 정리합니다.
              </Body>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
              <Heading level="h3" className="text-sm font-semibold mb-1">
                ✅ 4. 키보드 접근성 (Keyboard Accessibility)
              </Heading>
              <Body className="text-sm">
                Tab 키로 포커스 이동, Enter/Space 키로 파일 선택 대화상자 열기
                등 완전한 키보드 지원을 제공합니다.
              </Body>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
              <Heading level="h3" className="text-sm font-semibold mb-1">
                ✅ 5. 다크 모드 (Dark Mode)
              </Heading>
              <Body className="text-sm">
                모든 상태(default, hover, dragging, disabled, error)에서
                라이트/다크 모드를 자동으로 지원합니다.
              </Body>
            </div>
          </div>
        </Stack>
      </PageSection>
    </>
  );
}
