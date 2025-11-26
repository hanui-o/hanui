'use client';

import {
  Container,
  Heading,
  Breadcrumb,
  Input,
  Select,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Pagination,
} from '@hanui/react';

export default function ListTableTemplate() {
  return (
    <div className="min-h-screen">
      {/* List + Table Example */}
      <Container className="py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: '홈', href: '/' },
            { label: '공지사항', isCurrent: true },
          ]}
        />

        {/* Page Title */}
        <Heading level="h1" className="mb-8">
          공지사항
        </Heading>

        {/* Search Bar */}
        <div className="flex gap-3 mb-6">
          <Select className="w-32">
            <option>전체</option>
            <option>제목</option>
            <option>내용</option>
          </Select>
          <Input placeholder="검색어를 입력하세요" className="flex-1" />
          <Button>검색</Button>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>번호</TableHead>
              <TableHead>제목</TableHead>
              <TableHead>작성일</TableHead>
              <TableHead>조회</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>5</TableCell>
              <TableCell>2025년 정기 시스템 점검 안내</TableCell>
              <TableCell>2025-11-26</TableCell>
              <TableCell>234</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>4</TableCell>
              <TableCell>개인정보 처리방침 개정 안내</TableCell>
              <TableCell>2025-11-25</TableCell>
              <TableCell>189</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3</TableCell>
              <TableCell>서비스 이용약관 변경 사항</TableCell>
              <TableCell>2025-11-24</TableCell>
              <TableCell>156</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2</TableCell>
              <TableCell>신규 기능 업데이트 소식</TableCell>
              <TableCell>2025-11-23</TableCell>
              <TableCell>345</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>서비스 오픈 안내</TableCell>
              <TableCell>2025-11-22</TableCell>
              <TableCell>567</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Pagination */}
        <Pagination currentPage={1} totalPages={10} className="mt-6" />
      </Container>

      {/* Documentation Section */}
      <Container className="py-12 border-t">
        <Heading level="h2" className="mb-6">
          List + Table 예시
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
              <li>Input - 검색어 입력</li>
              <li>Select - 검색 필터</li>
              <li>Button - 검색 버튼</li>
              <li>Table - 목록 테이블</li>
              <li>Pagination - 페이지네이션</li>
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
  Button,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Pagination,
} from '@hanui/react';

export function ListTableExample() {
  return (
    <Container className="py-8">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: '홈', href: '/' },
          { label: '공지사항', isCurrent: true },
        ]}
      />

      {/* Page Title */}
      <Heading level="h1" className="mb-8">
        공지사항
      </Heading>

      {/* Search Bar */}
      <div className="flex gap-3 mb-6">
        <Select className="w-32">
          <option>전체</option>
          <option>제목</option>
          <option>내용</option>
        </Select>
        <Input placeholder="검색어를 입력하세요" className="flex-1" />
        <Button>검색</Button>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>번호</TableHead>
            <TableHead>제목</TableHead>
            <TableHead>작성일</TableHead>
            <TableHead>조회</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>시스템 점검 안내</TableCell>
            <TableCell>2025-11-26</TableCell>
            <TableCell>123</TableCell>
          </TableRow>
          {/* 더미 데이터 추가 */}
        </TableBody>
      </Table>

      {/* Pagination */}
      <Pagination currentPage={1} totalPages={10} className="mt-6" />
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
                Breadcrumb는 페이지 경로를{' '}
                <code className="px-2 py-1 bg-krds-gray-5 rounded">items</code>{' '}
                배열로 전달
              </li>
              <li>
                검색 영역은{' '}
                <code className="px-2 py-1 bg-krds-gray-5 rounded">
                  flex gap-3
                </code>
                으로 일관된 간격 유지
              </li>
              <li>
                Table은 시맨틱한 구조 (TableHeader, TableBody, TableRow,
                TableHead, TableCell)
              </li>
              <li>
                Pagination은{' '}
                <code className="px-2 py-1 bg-krds-gray-5 rounded">
                  currentPage
                </code>
                와{' '}
                <code className="px-2 py-1 bg-krds-gray-5 rounded">
                  totalPages
                </code>{' '}
                props 필수
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
