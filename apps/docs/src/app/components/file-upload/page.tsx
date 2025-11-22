'use client';

import { FileUpload, type UploadedFile } from '@hanui/react';
import { useState } from 'react';
// Docs layout components
import {
  PageSection as Section,
  Subsection,
  SectionHeading,
  PageNavigation,
} from '@/components/content';

// Docs helper components
import { DoCard, DontCard } from '@/components/helpers';

// UI components - from @hanui/react
import {
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
    <Section>
      <SectionHeading
        level="h1"
        id="file-upload"
        title="FileUpload"
        description="드래그 앤 드롭과 파일 검증을 지원하는 KRDS 기반 파일 업로드 컴포넌트입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Installation */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="installation" title="설치" />
            <Body>
              CLI를 사용하여 컴포넌트를 프로젝트에 설치할 수 있습니다.
            </Body>
            <Card>
              <Code language="bash">npx @hanui/cli add file-upload</Code>
            </Card>
          </Subsection>

          {/* What is it */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="what-is-it" title="FileUpload란?" />
            <Body>
              FileUpload는 사용자가 파일을 시스템에 업로드할 수 있도록 하는
              인터페이스 컴포넌트입니다. 드래그 앤 드롭 기능, 파일 유형 및 크기
              검증, 업로드 진행 상태 표시 등의 기능을 제공합니다.
            </Body>
            <Body>
              WCAG 2.1 / KWCAG 2.2 AA 기준을 준수하여 키보드 내비게이션, 스크린
              리더 지원, 명확한 에러 메시지를 제공합니다.
            </Body>
          </Subsection>

          {/* Preview */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="preview" title="미리보기" />

            <Subsection level="h3">
              <SectionHeading level="h3" id="basic" title="기본" />
              <Card>
                <div className="max-w-md">
                  <FileUpload
                    onUpload={handleUpload}
                    onChange={handleChange}
                    onError={handleError}
                  />
                </div>
              </Card>
              <Card>
                <Code language="tsx">
                  {`<FileUpload
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
/>`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" id="with-label" title="라벨 포함" />
              <Body>라벨을 표시하여 업로드 영역의 의미를 명확히 합니다.</Body>
              <Card>
                <div className="max-w-md">
                  <FileUpload
                    label="프로필 이미지 업로드"
                    onUpload={handleUpload}
                    onChange={handleChange}
                    onError={handleError}
                  />
                </div>
              </Card>
              <Card>
                <Code language="tsx">
                  {`<FileUpload
  label="프로필 이미지 업로드"
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
/>`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="accept-types"
                title="파일 타입 제한"
              />
              <Body>
                accept prop으로 허용할 파일 유형을 제한할 수 있습니다.
              </Body>
              <Card>
                <Stack direction="vertical" spacing="lg">
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
                </Stack>
              </Card>
              <Card>
                <Code language="tsx">
                  {`<FileUpload
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
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="file-size-limit"
                title="파일 크기 제한"
              />
              <Body>
                maxSize prop으로 파일 크기 제한을 설정할 수 있습니다. (바이트
                단위)
              </Body>
              <Card>
                <div className="max-w-md">
                  <FileUpload
                    label="최대 5MB 파일 업로드"
                    maxSize={5 * 1024 * 1024}
                    onUpload={handleUpload}
                    onChange={handleChange}
                    onError={handleError}
                  />
                </div>
              </Card>
              <Card>
                <Code language="tsx">
                  {`<FileUpload
  label="최대 5MB 파일 업로드"
  maxSize={5 * 1024 * 1024} // 5MB
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
/>`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="multiple-files"
                title="다중 파일 업로드"
              />
              <Body>
                multiple prop으로 여러 파일을 동시에 업로드할 수 있습니다.
              </Body>
              <Card>
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
              </Card>
              <Card>
                <Code language="tsx">
                  {`<FileUpload
  label="여러 파일 업로드"
  multiple
  maxFiles={5}
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
/>`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="file-list-control"
                title="파일 목록 표시/숨김"
              />
              <Body>
                showFileList prop으로 업로드된 파일 목록을 표시하거나 숨길 수
                있습니다. 기본값은 true입니다.
              </Body>
              <Card>
                <Stack direction="vertical" spacing="lg">
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
                </Stack>
              </Card>
              <Card>
                <Code language="tsx">
                  {`<FileUpload
  label="파일 목록 표시"
  multiple
  showFileList
  onUpload={handleUpload}
/>

<FileUpload
  label="파일 목록 숨김"
  showFileList={false}
  onUpload={handleUpload}
/>`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" id="disabled" title="비활성화" />
              <Body>비활성화된 파일 업로드 컴포넌트입니다.</Body>
              <Card>
                <div className="max-w-md">
                  <FileUpload
                    label="비활성화된 업로드"
                    disabled
                    onUpload={handleUpload}
                    onChange={handleChange}
                    onError={handleError}
                  />
                </div>
              </Card>
              <Card>
                <Code language="tsx">
                  {`<FileUpload
  label="비활성화된 업로드"
  disabled
  onUpload={handleUpload}
  onChange={handleChange}
  onError={handleError}
/>`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="complete-example"
                title="완전한 예제"
              />
              <Body>모든 기능을 사용하는 완전한 예제입니다.</Body>
              <Card>
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
                  <Body className="mt-2 text-krds-gray-70">
                    이미지, PDF, 문서 파일만 업로드 가능합니다. (최대 10MB, 3개)
                  </Body>
                </div>
              </Card>
              <Card>
                <Code language="tsx">
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
<p className="mt-2 text-gray-500">
  이미지, PDF, 문서 파일만 업로드 가능합니다. (최대 10MB, 3개)
</p>`}
                </Code>
              </Card>
            </Subsection>
          </Subsection>

          {/* Usage */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="usage" title="사용 방법" />
            <Card>
              <Code language="tsx">
                {`import { FileUpload, type UploadedFile } from '@hanui/react';
import { useState } from 'react';

export default function MyComponent() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleUpload = (files: File[]) => {
    console.log('Uploading:', files);
    // 실제 업로드 로직 구현
  };

  const handleChange = (files: UploadedFile[]) => {
    setFiles(files);
  };

  const handleError = (error: string) => {
    console.error(error);
    alert(error);
  };

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
  );
}`}
              </Code>
            </Card>
          </Subsection>

          {/* Best Practices */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="best-practices" title="모범 사례" />

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="when-to-use"
                title="언제 사용하나요?"
              />
              <DoCard>
                <List variant="check">
                  <ListItem>
                    사용자가 문서, 이미지, 또는 기타 파일을 시스템에 업로드해야
                    할 때
                  </ListItem>
                  <ListItem>
                    프로필 사진, 첨부 파일, 증빙 서류 등을 제출해야 할 때
                  </ListItem>
                  <ListItem>
                    드래그 앤 드롭으로 편리한 파일 업로드를 제공하고 싶을 때
                  </ListItem>
                  <ListItem>파일 유형이나 크기 제한이 필요한 경우</ListItem>
                  <ListItem>여러 파일을 한 번에 업로드해야 하는 경우</ListItem>
                </List>
              </DoCard>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="when-not-to-use"
                title="언제 사용하지 말아야 하나요?"
              />
              <DontCard>
                <List variant="xmark">
                  <ListItem>
                    간단한 텍스트 입력만 필요한 경우 (Input 컴포넌트 사용)
                  </ListItem>
                  <ListItem>
                    단일 이미지 선택만 필요하고 미리보기가 주요 기능인 경우
                    (별도의 이미지 선택기 사용)
                  </ListItem>
                  <ListItem>
                    파일 업로드가 아닌 URL 입력을 받아야 하는 경우
                  </ListItem>
                  <ListItem>
                    실시간 편집이 필요한 경우 (텍스트 에디터 사용)
                  </ListItem>
                </List>
              </DontCard>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="implementation-tips"
                title="구현 팁"
              />
              <List variant="disc">
                <ListItem>
                  <strong>파일 유형 제한:</strong> accept prop으로 필요한 파일
                  유형만 허용하세요
                </ListItem>
                <ListItem>
                  <strong>크기 제한 안내:</strong> 사용자에게 파일 크기 제한을
                  명확히 안내하세요
                </ListItem>
                <ListItem>
                  <strong>에러 처리:</strong> onError 핸들러로 사용자 친화적인
                  에러 메시지를 표시하세요
                </ListItem>
                <ListItem>
                  <strong>진행 상태:</strong> 업로드 중 진행 상태를 표시하면
                  사용자 경험이 향상됩니다
                </ListItem>
                <ListItem>
                  <strong>드래그 앤 드롭:</strong> 가능하면 드래그 앤 드롭
                  기능을 지원하세요
                </ListItem>
                <ListItem>
                  <strong>미리보기:</strong> 이미지 파일의 경우 업로드 전
                  미리보기를 제공하세요
                </ListItem>
              </List>
            </Subsection>
          </Subsection>

          {/* Accessibility */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="accessibility" title="접근성" />
            <Body>
              이 컴포넌트는 WCAG 2.1 / KWCAG 2.2 AA 기준을 준수하여 모든
              사용자가 파일 업로드 기능을 사용할 수 있도록 설계되었습니다.
            </Body>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="keyboard-navigation"
                title="키보드 내비게이션"
              />
              <List variant="disc">
                <ListItem>
                  <Code>Tab</Code>: 업로드 영역과 파일 삭제 버튼 간 포커스 이동
                </ListItem>
                <ListItem>
                  <Code>Enter</Code> / <Code>Space</Code>: 파일 선택 대화상자
                  열기
                </ListItem>
                <ListItem>
                  포커스된 요소에 명확한 파란색 포커스 링 표시
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="screen-reader"
                title="스크린 리더 지원"
              />
              <List variant="disc">
                <ListItem>
                  <Code>aria-label</Code>로 업로드 영역의 목적 설명
                </ListItem>
                <ListItem>
                  업로드된 파일 목록을 <Code>aria-label</Code>로 명시
                </ListItem>
                <ListItem>
                  각 파일 삭제 버튼에 파일명 포함된 <Code>aria-label</Code>
                </ListItem>
                <ListItem>
                  <Code>aria-disabled</Code>로 비활성 상태 전달
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="visual-feedback"
                title="시각적 피드백"
              />
              <List variant="disc">
                <ListItem>
                  드래그 중일 때 테두리와 배경색 변경으로 명확한 시각적 피드백
                </ListItem>
                <ListItem>업로드 진행 상태를 프로그레스 바로 표시</ListItem>
                <ListItem>에러 발생 시 빨간색으로 강조 표시</ListItem>
                <ListItem>다크 모드에서도 충분한 대비율 유지</ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="error-handling"
                title="에러 처리"
              />
              <List variant="disc">
                <ListItem>파일 유형, 크기, 개수를 즉시 검증</ListItem>
                <ListItem>구체적이고 이해하기 쉬운 에러 메시지 제공</ListItem>
                <ListItem>onError 콜백으로 커스텀 에러 처리 가능</ListItem>
              </List>
            </Subsection>
          </Subsection>

          {/* Foundation Layer */}
          <Subsection level="h2">
            <SectionHeading
              level="h2"
              id="foundation-layer"
              title="Foundation Layer"
            />
            <Body>
              FileUpload 컴포넌트는 다음 기능들을 자동으로 처리합니다:
            </Body>

            <Card variant="info">
              <List variant="check">
                <ListItem>
                  <strong>드래그 앤 드롭:</strong> HTML5 드래그 앤 드롭 API를
                  사용하여 파일을 드래그하여 업로드할 수 있습니다. 드래그 중
                  시각적 피드백을 자동으로 제공합니다.
                </ListItem>
                <ListItem>
                  <strong>파일 검증:</strong> 파일 유형(accept), 크기(maxSize),
                  개수(maxFiles)를 자동으로 검증하고 적절한 에러 메시지를
                  표시합니다.
                </ListItem>
                <ListItem>
                  <strong>이미지 미리보기:</strong> 이미지 파일은 자동으로
                  썸네일 미리보기를 생성하여 표시합니다. 메모리 누수 방지를 위해
                  컴포넌트 언마운트 시 자동 정리합니다.
                </ListItem>
                <ListItem>
                  <strong>키보드 접근성:</strong> Tab 키로 포커스 이동,
                  Enter/Space 키로 파일 선택 대화상자 열기 등 완전한 키보드
                  지원을 제공합니다.
                </ListItem>
                <ListItem>
                  <strong>다크 모드:</strong> 모든 상태(default, hover,
                  dragging, disabled, error)에서 라이트/다크 모드를 자동으로
                  지원합니다.
                </ListItem>
              </List>
            </Card>
          </Subsection>
        </TabsContent>

        <TabsContent value="api">
          {/* API Reference */}
          <Subsection level="h2">
            <SectionHeading
              level="h2"
              id="api-reference"
              title="API Reference"
            />

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
                      <Code>accept</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>
                      <Code>undefined</Code>
                    </TableCell>
                    <TableCell>허용할 파일 유형</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>maxSize</Code>
                    </TableCell>
                    <TableCell>
                      <Code>number</Code>
                    </TableCell>
                    <TableCell>
                      <Code>undefined</Code>
                    </TableCell>
                    <TableCell>최대 파일 크기 (바이트)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>maxFiles</Code>
                    </TableCell>
                    <TableCell>
                      <Code>number</Code>
                    </TableCell>
                    <TableCell>
                      <Code>5</Code>
                    </TableCell>
                    <TableCell>최대 파일 개수</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>multiple</Code>
                    </TableCell>
                    <TableCell>
                      <Code>boolean</Code>
                    </TableCell>
                    <TableCell>
                      <Code>false</Code>
                    </TableCell>
                    <TableCell>다중 파일 업로드 허용</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>onUpload</Code>
                    </TableCell>
                    <TableCell>
                      <Code>{`(files: File[]) => void | Promise<void>`}</Code>
                    </TableCell>
                    <TableCell>
                      <Code>undefined</Code>
                    </TableCell>
                    <TableCell>파일 선택/드롭 시 호출</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>onChange</Code>
                    </TableCell>
                    <TableCell>
                      <Code>{`(files: UploadedFile[]) => void`}</Code>
                    </TableCell>
                    <TableCell>
                      <Code>undefined</Code>
                    </TableCell>
                    <TableCell>
                      파일 추가/삭제 시 호출 (메타데이터 포함)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>onError</Code>
                    </TableCell>
                    <TableCell>
                      <Code>{`(error: string) => void`}</Code>
                    </TableCell>
                    <TableCell>
                      <Code>undefined</Code>
                    </TableCell>
                    <TableCell>검증 에러 발생 시 호출</TableCell>
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
                      <Code>className</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>
                      <Code>undefined</Code>
                    </TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>label</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>
                      <Code>"파일을 드래그하거나 클릭하여 업로드하세요"</Code>
                    </TableCell>
                    <TableCell>업로드 영역 라벨 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>showFileList</Code>
                    </TableCell>
                    <TableCell>
                      <Code>boolean</Code>
                    </TableCell>
                    <TableCell>
                      <Code>true</Code>
                    </TableCell>
                    <TableCell>파일 목록 표시 여부</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="uploaded-file"
                title="UploadedFile Type"
              />
              <Body>onChange 콜백에서 반환되는 파일 객체의 타입입니다.</Body>
              <Card>
                <Code language="tsx">
                  {`interface UploadedFile {
  file: File;           // 네이티브 File 객체
  id: string;           // 고유 식별자
  preview?: string;     // 이미지 미리보기 URL (이미지 파일만)
  progress?: number;    // 업로드 진행률 (0-100)
  error?: string;       // 에러 메시지
}`}
                </Code>
              </Card>
            </Subsection>
          </Subsection>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Display', href: '/components/display' }}
        next={{ title: 'Header', href: '/components/header' }}
      />
    </Section>
  );
}
