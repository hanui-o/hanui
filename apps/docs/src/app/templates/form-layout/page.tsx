'use client';

import {
  Container,
  Heading,
  Breadcrumb,
  Input,
  Select,
  FileUpload,
  Button,
  Card,
  FormField,
  FormLabel,
  FormHelperText,
} from '@hanui/react';

export default function FormLayoutTemplate() {
  return (
    <div className="min-h-screen">
      {/* Form Layout Example */}
      <Container className="py-8">
        <Breadcrumb
          items={[
            { label: '홈', href: '/' },
            { label: '민원 신청', isCurrent: true },
          ]}
        />

        <Heading level="h1" className="mb-8">
          민원 신청
        </Heading>

        <Card className="p-8">
          <form className="space-y-6">
            {/* 이름 */}
            <FormField required>
              <FormLabel>이름</FormLabel>
              <Input placeholder="이름을 입력하세요" />
            </FormField>

            {/* 연락처 */}
            <FormField required>
              <FormLabel>연락처</FormLabel>
              <Input type="tel" placeholder="010-0000-0000" />
              <FormHelperText>- (하이픈) 포함하여 입력해주세요</FormHelperText>
            </FormField>

            {/* 이메일 */}
            <FormField required>
              <FormLabel>이메일</FormLabel>
              <Input type="email" placeholder="example@email.com" />
            </FormField>

            {/* 민원 유형 */}
            <FormField required>
              <FormLabel>민원 유형</FormLabel>
              <Select
                options={[
                  { value: 'general', label: '일반 문의' },
                  { value: 'complaint', label: '불편 신고' },
                  { value: 'suggestion', label: '제안' },
                  { value: 'compliment', label: '칭찬' },
                ]}
                placeholder="선택하세요"
              />
            </FormField>

            {/* 내용 */}
            <FormField required>
              <FormLabel>내용</FormLabel>
              <textarea
                className="w-full px-4 py-3 border border-krds-gray-30 rounded-md text-krds-gray-90 placeholder:text-krds-gray-50 focus:outline-none focus:ring-2 focus:ring-krds-primary-base focus:border-transparent"
                placeholder="내용을 입력하세요"
                rows={6}
              />
              <FormHelperText>최소 10자 이상 입력해주세요</FormHelperText>
            </FormField>

            {/* 첨부파일 */}
            <FormField>
              <FormLabel>첨부파일</FormLabel>
              <FileUpload />
              <FormHelperText>
                최대 10MB, PDF, JPG, PNG 파일만 가능합니다
              </FormHelperText>
            </FormField>

            {/* 개인정보 수집 동의 */}
            <FormField required>
              <div className="flex items-start gap-3 p-4 bg-krds-gray-5 rounded-md">
                <input
                  type="checkbox"
                  id="agree"
                  className="mt-1 w-4 h-4 border-krds-gray-30 rounded text-krds-primary-base focus:ring-krds-primary-base"
                />
                <label htmlFor="agree" className="text-sm text-krds-gray-70">
                  개인정보 수집 및 이용에 동의합니다{' '}
                  <span className="text-krds-danger-60">*</span>
                </label>
              </div>
            </FormField>

            {/* 버튼 */}
            <div className="flex gap-3 justify-end pt-4">
              <Button variant="outline" type="button">
                취소
              </Button>
              <Button type="submit">신청하기</Button>
            </div>
          </form>
        </Card>
      </Container>

      {/* Documentation Section */}
      <Container className="py-12 border-t">
        <Heading level="h2" className="mb-6">
          Form Layout 예시
        </Heading>

        <div className="space-y-6">
          <div>
            <Heading level="h3" className="mb-3">
              사용 컴포넌트
            </Heading>
            <ul className="list-disc list-inside space-y-2 text-krds-gray-70">
              <li>Container - 콘텐츠 최대 너비 제한</li>
              <li>Breadcrumb - 페이지 경로 표시</li>
              <li>Heading - 제목 (h1)</li>
              <li>Card - 폼 컨테이너</li>
              <li>FormField - 폼 필드 래퍼</li>
              <li>FormLabel - 필드 레이블 (required 자동 표시)</li>
              <li>FormHelperText - 도움말 텍스트</li>
              <li>Input - 텍스트 입력</li>
              <li>Select - 선택 박스</li>
              <li>FileUpload - 파일 업로드</li>
              <li>Button - 폼 액션 버튼</li>
            </ul>
          </div>

          <div>
            <Heading level="h3" className="mb-3">
              코드 예시
            </Heading>
            <pre className="p-4 bg-krds-gray-5 rounded overflow-x-auto">
              <code className="text-sm">{`import {
  Container,
  Heading,
  Breadcrumb,
  Input,
  Select,
  FileUpload,
  Button,
  Card,
  FormField,
  FormLabel,
  FormHelperText,
} from '@hanui/react';

export function FormLayoutExample() {
  return (
    <Container className="py-8">
      <Breadcrumb
        items={[
          { label: '홈', href: '/' },
          { label: '민원 신청', isCurrent: true },
        ]}
      />

      <Heading level="h1" className="mb-8">
        민원 신청
      </Heading>

      <Card className="p-8">
        <form className="space-y-6">
          {/* 이름 */}
          <FormField required>
            <FormLabel>이름</FormLabel>
            <Input placeholder="이름을 입력하세요" />
          </FormField>

          {/* 연락처 */}
          <FormField required>
            <FormLabel>연락처</FormLabel>
            <Input type="tel" placeholder="010-0000-0000" />
            <FormHelperText>
              - (하이픈) 포함하여 입력해주세요
            </FormHelperText>
          </FormField>

          {/* 민원 유형 */}
          <FormField required>
            <FormLabel>민원 유형</FormLabel>
            <Select
              options={[
                { value: 'general', label: '일반 문의' },
                { value: 'complaint', label: '불편 신고' },
                { value: 'suggestion', label: '제안' },
              ]}
              placeholder="선택하세요"
            />
          </FormField>

          {/* 첨부파일 */}
          <FormField>
            <FormLabel>첨부파일</FormLabel>
            <FileUpload />
            <FormHelperText>
              최대 10MB, PDF, JPG, PNG 파일만 가능합니다
            </FormHelperText>
          </FormField>

          {/* 버튼 */}
          <div className="flex gap-3 justify-end">
            <Button variant="outline">취소</Button>
            <Button type="submit">신청하기</Button>
          </div>
        </form>
      </Card>
    </Container>
  );
}`}</code>
            </pre>
          </div>

          <div>
            <Heading level="h3" className="mb-3">
              사용 팁
            </Heading>
            <ul className="list-disc list-inside space-y-2 text-krds-gray-70">
              <li>
                FormField의{' '}
                <code className="px-2 py-1 bg-krds-gray-5 rounded">
                  required
                </code>{' '}
                prop으로 필수 표시 자동 추가
              </li>
              <li>
                FormLabel은 자동으로{' '}
                <code className="px-2 py-1 bg-krds-gray-5 rounded">
                  htmlFor
                </code>{' '}
                연결
              </li>
              <li>FormHelperText로 필드별 안내 메시지 제공</li>
              <li>
                폼 간격은{' '}
                <code className="px-2 py-1 bg-krds-gray-5 rounded">
                  space-y-6
                </code>
                으로 일관성 유지
              </li>
              <li>
                버튼은{' '}
                <code className="px-2 py-1 bg-krds-gray-5 rounded">
                  justify-end
                </code>
                로 우측 정렬
              </li>
              <li>Card로 폼 영역을 시각적으로 구분</li>
            </ul>
          </div>

          <div className="p-4 bg-krds-info-5 rounded-md border border-krds-info-30">
            <Heading level="h4" className="mb-2 text-krds-info-70">
              참고
            </Heading>
            <p className="text-sm text-krds-gray-70">
              Textarea 컴포넌트는 아직 개발 중입니다. 현재는 네이티브{' '}
              <code className="px-2 py-1 bg-white rounded">textarea</code>{' '}
              요소에 KRDS 스타일을 직접 적용하여 사용하세요.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
