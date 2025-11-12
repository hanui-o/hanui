'use client';

import { FileUpload, type UploadedFile } from '@hanui/react';
import Link from 'next/link';
import { useState } from 'react';

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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-20 dark:border-gray-80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-primary-60">HANUI</h1>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-70 dark:text-gray-30 hover:text-primary-60 transition"
            >
              홈
            </Link>
            <Link href="/components" className="text-primary-60 font-semibold">
              컴포넌트
            </Link>
            <Link
              href="https://github.com/odada-o/hanui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-70 dark:text-gray-30 hover:text-primary-60 transition"
            >
              GitHub
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-60 dark:text-gray-40 mb-4">
            <Link href="/components" className="hover:text-primary-60">
              컴포넌트
            </Link>
            {' / '}
            <span>FileUpload</span>
          </div>

          <h1 className="text-4xl font-bold mb-4">FileUpload</h1>
          <p className="text-xl text-gray-60 dark:text-gray-40 mb-8">
            파일 업로드 기능을 제공하는 KRDS 기반 파일 업로드 컴포넌트
          </p>

          {/* Quick Start */}
          <section className="mb-12">
            <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
              <div className="max-w-md">
                <FileUpload
                  onUpload={handleUpload}
                  onChange={handleChange}
                  onError={handleError}
                />
              </div>
            </div>
            <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
              <code>{`import { FileUpload } from '@hanui/react';

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
};`}</code>
            </pre>
          </section>

          {/* Examples */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8">Examples</h2>

            <div className="space-y-12">
              {/* With Label */}
              <div>
                <h3 className="text-xl font-semibold mb-4">With Label</h3>
                <p className="text-gray-60 dark:text-gray-40 mb-4">
                  라벨을 표시하여 업로드 영역의 의미를 명확히 합니다.
                </p>
                <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
                  <div className="max-w-md">
                    <FileUpload
                      label="프로필 이미지 업로드"
                      onUpload={handleUpload}
                      onChange={handleChange}
                      onError={handleError}
                    />
                  </div>
                </div>
                <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
                  <code>{`<FileUpload
  label="프로필 이미지 업로드"
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
/>`}</code>
                </pre>
              </div>

              {/* Accept Types */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Accept Types</h3>
                <p className="text-gray-60 dark:text-gray-40 mb-4">
                  accept prop으로 허용할 파일 유형을 제한할 수 있습니다.
                </p>
                <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
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
                </div>
                <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
                  <code>{`<FileUpload
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
/>`}</code>
                </pre>
              </div>

              {/* File Size Limit */}
              <div>
                <h3 className="text-xl font-semibold mb-4">File Size Limit</h3>
                <p className="text-gray-60 dark:text-gray-40 mb-4">
                  maxSize prop으로 파일 크기 제한을 설정할 수 있습니다. (바이트
                  단위)
                </p>
                <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
                  <div className="max-w-md">
                    <FileUpload
                      label="최대 5MB 파일 업로드"
                      maxSize={5 * 1024 * 1024}
                      onUpload={handleUpload}
                      onChange={handleChange}
                      onError={handleError}
                    />
                  </div>
                </div>
                <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
                  <code>{`<FileUpload
  label="최대 5MB 파일 업로드"
  maxSize={5 * 1024 * 1024} // 5MB
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
/>`}</code>
                </pre>
              </div>

              {/* Multiple Files */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Multiple Files</h3>
                <p className="text-gray-60 dark:text-gray-40 mb-4">
                  multiple prop으로 여러 파일을 동시에 업로드할 수 있습니다.
                </p>
                <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
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
                </div>
                <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
                  <code>{`<FileUpload
  label="여러 파일 업로드"
  multiple
  maxFiles={5}
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
/>`}</code>
                </pre>
              </div>

              {/* With File List */}
              <div>
                <h3 className="text-xl font-semibold mb-4">With File List</h3>
                <p className="text-gray-60 dark:text-gray-40 mb-4">
                  showFileList prop으로 업로드된 파일 목록을 표시할 수 있습니다.
                  기본값은 true입니다.
                </p>
                <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
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
                </div>
                <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
                  <code>{`<FileUpload
  label="파일 목록 표시"
  multiple
  showFileList
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
/>`}</code>
                </pre>
              </div>

              {/* Without File List */}
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Without File List
                </h3>
                <p className="text-gray-60 dark:text-gray-40 mb-4">
                  파일 목록을 숨길 수 있습니다.
                </p>
                <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
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
                <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
                  <code>{`<FileUpload
  label="파일 목록 숨김"
  showFileList={false}
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
/>`}</code>
                </pre>
              </div>

              {/* Disabled */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Disabled</h3>
                <p className="text-gray-60 dark:text-gray-40 mb-4">
                  비활성화된 파일 업로드 컴포넌트입니다.
                </p>
                <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
                  <div className="max-w-md">
                    <FileUpload
                      label="비활성화된 업로드"
                      disabled
                      onUpload={handleUpload}
                      onChange={handleChange}
                      onError={handleError}
                    />
                  </div>
                </div>
                <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
                  <code>{`<FileUpload
  label="비활성화된 업로드"
  disabled
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
/>`}</code>
                </pre>
              </div>

              {/* Complete Example */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Complete Example</h3>
                <p className="text-gray-60 dark:text-gray-40 mb-4">
                  모든 기능을 사용하는 완전한 예제입니다.
                </p>
                <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
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
                      이미지, PDF, 문서 파일만 업로드 가능합니다. (최대 10MB,
                      3개)
                    </p>
                  </div>
                </div>
                <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
                  <code>{`<FileUpload
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
</p>`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* API Reference */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8">API Reference</h2>

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
                    <td className="py-3 px-4 font-mono text-sm">
                      showFileList
                    </td>
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
          </section>

          {/* Best Practices */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Best Practices</h2>
            <div className="space-y-4 text-gray-70 dark:text-gray-30">
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
                  <strong>에러 처리:</strong> onError 핸들러로 사용자 친화적인
                  에러 메시지를 표시하세요
                </li>
                <li>
                  <strong>진행 상태:</strong> 업로드 중 진행 상태를 표시하면
                  사용자 경험이 향상됩니다
                </li>
                <li>
                  <strong>드래그 앤 드롭:</strong> 가능하면 드래그 앤 드롭
                  기능을 지원하세요
                </li>
                <li>
                  <strong>미리보기:</strong> 이미지 파일의 경우 업로드 전
                  미리보기를 제공하세요
                </li>
              </ul>
            </div>
          </section>

          {/* Accessibility */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Accessibility</h2>
            <div className="space-y-4 text-gray-70 dark:text-gray-30">
              <p>이 컴포넌트는 WCAG 2.1 AA 기준을 준수합니다:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>레이블 연결:</strong> label과 input이 적절히 연결되어
                  스크린 리더 지원
                </li>
                <li>
                  <strong>키보드 접근:</strong> Tab 키로 포커스 이동,
                  Enter/Space로 파일 선택 대화상자 열기
                </li>
                <li>
                  <strong>포커스 표시:</strong> 포커스 시 명확한 시각적 표시
                </li>
                <li>
                  <strong>ARIA 속성:</strong> 적절한 role과 aria-label 제공
                </li>
                <li>
                  <strong>에러 메시지:</strong> 에러 발생 시 스크린 리더가 읽을
                  수 있도록 구현
                </li>
                <li>
                  <strong>상태 알림:</strong> 업로드 진행, 완료, 실패 상태를
                  스크린 리더에 전달
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-20 dark:border-gray-80 py-8">
        <div className="container mx-auto px-4 text-center text-gray-60 dark:text-gray-40">
          <p>MIT License · KRDS 기반 공공 웹 UI 컴포넌트 라이브러리</p>
        </div>
      </footer>
    </div>
  );
}
