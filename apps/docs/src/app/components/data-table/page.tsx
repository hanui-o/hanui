'use client';

import React from 'react';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';

// UI components - from @hanui/react
import {
  DataTable,
  SortableHeader,
  getSelectionColumn,
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
  Badge,
} from '@hanui/react';
import type { ColumnDef } from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';

// Sample data
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: '활성' | '대기' | '비활성';
}

const sampleData: User[] = [
  {
    id: '1',
    name: '김철수',
    email: 'kim@example.com',
    role: '개발자',
    status: '활성',
  },
  {
    id: '2',
    name: '이영희',
    email: 'lee@example.com',
    role: '디자이너',
    status: '활성',
  },
  {
    id: '3',
    name: '박민수',
    email: 'park@example.com',
    role: '기획자',
    status: '대기',
  },
  {
    id: '4',
    name: '정지원',
    email: 'jung@example.com',
    role: '개발자',
    status: '활성',
  },
  {
    id: '5',
    name: '최수현',
    email: 'choi@example.com',
    role: 'QA',
    status: '비활성',
  },
  {
    id: '6',
    name: '강민서',
    email: 'kang@example.com',
    role: '개발자',
    status: '활성',
  },
  {
    id: '7',
    name: '윤서준',
    email: 'yoon@example.com',
    role: '디자이너',
    status: '대기',
  },
  {
    id: '8',
    name: '임하늘',
    email: 'im@example.com',
    role: '기획자',
    status: '활성',
  },
];

// Column definitions
const basicColumns: ColumnDef<User, unknown>[] = [
  {
    accessorKey: 'name',
    header: '이름',
  },
  {
    accessorKey: 'email',
    header: '이메일',
  },
  {
    accessorKey: 'role',
    header: '역할',
  },
  {
    accessorKey: 'status',
    header: '상태',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const variant =
        status === '활성' ? 'success' : status === '대기' ? 'warning' : 'gray';
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
];

const sortableColumns: ColumnDef<User, unknown>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <SortableHeader column={column}>이름</SortableHeader>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <SortableHeader column={column}>이메일</SortableHeader>
    ),
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <SortableHeader column={column}>역할</SortableHeader>
    ),
  },
  {
    accessorKey: 'status',
    header: '상태',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const variant =
        status === '활성' ? 'success' : status === '대기' ? 'warning' : 'gray';
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
];

export default function DataTablePage() {
  const [selectedRows, setSelectedRows] = React.useState<User[]>([]);

  return (
    <>
      <Heading
        level="h1"
        title="DataTable"
        description="TanStack Table 기반의 고급 데이터 테이블 컴포넌트입니다. 정렬, 필터링, 페이지네이션, 행 선택 기능을 제공합니다."
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
              description="DataTable은 TanStack Table(React Table v8)을 기반으로 KRDS 스타일을 적용한 고급 데이터 테이블입니다. 컬럼 정의만으로 정렬, 필터링, 페이지네이션을 쉽게 구현할 수 있습니다."
              className="sr-only"
            />
            <ComponentPreview>
              <DataTable
                columns={basicColumns}
                data={sampleData.slice(0, 5)}
                caption="팀원 목록"
              />
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`import { DataTable } from '@/components/hanui'
import type { ColumnDef } from '@/components/hanui'

const columns: ColumnDef<User>[] = [
  { accessorKey: 'name', header: '이름' },
  { accessorKey: 'email', header: '이메일' },
  { accessorKey: 'role', header: '역할' },
]

<DataTable columns={columns} data={users} />`}
            </Code>
          </Section>

          {/* 2. 설치 */}
          <Section level="h2">
            <Installation componentName="data-table" />
          </Section>

          {/* 3. 사용법 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="usage"
              title="사용법"
              description="DataTable과 관련 헬퍼 함수들을 import하여 사용합니다."
            />
            <Code variant="block" language="tsx">
              {`import {
  DataTable,
  SortableHeader,
  getSelectionColumn,
} from '@/components/hanui'
import type { ColumnDef, SortingState, ColumnFiltersState } from '@/components/hanui'

// 컬럼 정의
const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortableHeader column={column}>이름</SortableHeader>,
  },
  {
    accessorKey: 'email',
    header: '이메일',
  },
]

// 컴포넌트 사용
<DataTable
  columns={columns}
  data={users}
  enablePagination
  enableGlobalFilter
/>`}
            </Code>
          </Section>

          {/* 4. 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading
                level="h3"
                title="정렬"
                description="SortableHeader 헬퍼를 사용하여 정렬 가능한 컬럼을 쉽게 구현합니다."
              />
              <ComponentPreview>
                <DataTable
                  columns={sortableColumns}
                  data={sampleData.slice(0, 5)}
                  caption="정렬 가능한 테이블"
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`import { SortableHeader } from '@/components/hanui'

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <SortableHeader column={column}>이름</SortableHeader>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <SortableHeader column={column}>이메일</SortableHeader>
    ),
  },
]`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="페이지네이션"
                description="enablePagination으로 페이지네이션을 활성화합니다. 페이지 크기 옵션도 커스터마이징 가능합니다."
              />
              <ComponentPreview>
                <DataTable
                  columns={sortableColumns}
                  data={sampleData}
                  enablePagination
                  defaultPageSize={5}
                  pageSizeOptions={[5, 10, 20]}
                  caption="페이지네이션 테이블"
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<DataTable
  columns={columns}
  data={users}
  enablePagination
  defaultPageSize={5}
  pageSizeOptions={[5, 10, 20]}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="검색 필터"
                description="enableGlobalFilter로 전역 검색 기능을 활성화합니다. 모든 컬럼에서 검색합니다."
              />
              <ComponentPreview>
                <DataTable
                  columns={sortableColumns}
                  data={sampleData}
                  enableGlobalFilter
                  filterPlaceholder="이름, 이메일, 역할 검색..."
                  caption="검색 가능한 테이블"
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<DataTable
  columns={columns}
  data={users}
  enableGlobalFilter
  filterPlaceholder="이름, 이메일, 역할 검색..."
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="행 선택"
                description="enableRowSelection으로 체크박스 선택 기능을 활성화합니다. 선택된 행은 onRowSelectionChange 콜백으로 받을 수 있습니다."
              />
              <ComponentPreview>
                <div className="space-y-4">
                  <DataTable
                    columns={basicColumns}
                    data={sampleData.slice(0, 5)}
                    enableRowSelection
                    enableGlobalFilter
                    onRowSelectionChange={setSelectedRows}
                    caption="선택 가능한 테이블"
                  />
                  {selectedRows.length > 0 && (
                    <div className="p-3 rounded-lg bg-krds-primary-5 text-sm">
                      선택된 사용자:{' '}
                      {selectedRows.map((u) => u.name).join(', ')}
                    </div>
                  )}
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`const [selectedRows, setSelectedRows] = useState<User[]>([])

<DataTable
  columns={columns}
  data={users}
  enableRowSelection
  onRowSelectionChange={setSelectedRows}
/>

{selectedRows.length > 0 && (
  <div>선택됨: {selectedRows.map(u => u.name).join(', ')}</div>
)}`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="커스텀 셀 렌더링"
                description="컬럼 정의의 cell 속성을 사용하여 셀 내용을 커스터마이징합니다."
              />
              <ComponentPreview>
                <DataTable
                  columns={[
                    {
                      accessorKey: 'name',
                      header: ({ column }) => (
                        <SortableHeader column={column}>이름</SortableHeader>
                      ),
                      cell: ({ row }) => (
                        <span className="font-medium">
                          {row.getValue('name')}
                        </span>
                      ),
                    },
                    {
                      accessorKey: 'email',
                      header: '이메일',
                      cell: ({ row }) => (
                        <a
                          href={`mailto:${row.getValue('email')}`}
                          className="text-krds-func-info hover:underline"
                        >
                          {row.getValue('email')}
                        </a>
                      ),
                    },
                    {
                      accessorKey: 'status',
                      header: '상태',
                      cell: ({ row }) => {
                        const status = row.getValue('status') as string;
                        const variant =
                          status === '활성'
                            ? 'success'
                            : status === '대기'
                              ? 'warning'
                              : 'gray';
                        return <Badge variant={variant}>{status}</Badge>;
                      },
                    },
                  ]}
                  data={sampleData.slice(0, 4)}
                  caption="커스텀 셀 렌더링"
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortableHeader column={column}>이름</SortableHeader>,
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue('name')}</span>
    ),
  },
  {
    accessorKey: 'email',
    header: '이메일',
    cell: ({ row }) => (
      <a href={\`mailto:\${row.getValue('email')}\`} className="text-krds-func-info hover:underline">
        {row.getValue('email')}
      </a>
    ),
  },
  {
    accessorKey: 'status',
    header: '상태',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const variant = status === '활성' ? 'success' : status === '대기' ? 'warning' : 'gray'
      return <Badge variant={variant}>{status}</Badge>
    },
  },
]`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="전체 기능"
                description="정렬, 검색, 페이지네이션, 행 선택을 모두 조합한 완전한 데이터 테이블입니다."
              />
              <ComponentPreview>
                <DataTable
                  columns={sortableColumns}
                  data={sampleData}
                  enableRowSelection
                  enableGlobalFilter
                  enablePagination
                  defaultPageSize={5}
                  filterPlaceholder="검색..."
                  caption="전체 기능 테이블"
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<DataTable
  columns={columns}
  data={users}
  enableRowSelection
  enableGlobalFilter
  enablePagination
  defaultPageSize={5}
  filterPlaceholder="검색..."
  caption="전체 기능 테이블"
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="로딩 상태"
                description="loading prop으로 데이터 로딩 중임을 표시합니다."
              />
              <ComponentPreview>
                <DataTable
                  columns={basicColumns}
                  data={[]}
                  loading
                  caption="로딩 중인 테이블"
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<DataTable
  columns={columns}
  data={[]}
  loading
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="빈 상태"
                description="emptyMessage prop으로 데이터가 없을 때 표시할 메시지를 지정합니다."
              />
              <ComponentPreview>
                <DataTable
                  columns={basicColumns}
                  data={[]}
                  emptyMessage="등록된 사용자가 없습니다."
                  caption="빈 테이블"
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<DataTable
  columns={columns}
  data={[]}
  emptyMessage="등록된 사용자가 없습니다."
/>`}
              </Code>
            </Subsection>
          </Section>

          {/* 5. 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="DataTable은 WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다."
            />
            <List variant="check">
              <ListItem>
                <strong>시맨틱 HTML:</strong> 내부적으로 HANUI Table 컴포넌트를
                사용하여 올바른 테이블 구조를 유지합니다.
              </ListItem>
              <ListItem>
                <strong>Caption:</strong> caption prop으로 테이블의 목적을
                설명합니다. 스크린리더에서 sr-only로 숨겨져 있습니다.
              </ListItem>
              <ListItem>
                <strong>체크박스 레이블:</strong> 행 선택 체크박스에 적절한
                aria-label이 제공됩니다.
              </ListItem>
              <ListItem>
                <strong>정렬 상태 표시:</strong> 정렬 가능한 헤더는 시각적
                아이콘과 함께 정렬 상태를 전달합니다.
              </ListItem>
              <ListItem>
                <strong>페이지네이션 레이블:</strong> 페이지 이동 버튼에 적절한
                aria-label이 제공됩니다.
              </ListItem>
              <ListItem>
                <strong>키보드 탐색:</strong> Tab 키로 상호작용 요소에 접근하고,
                Enter/Space 키로 동작을 실행할 수 있습니다.
              </ListItem>
            </List>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="DataTable Props" />
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
                      <Code>columns</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        ColumnDef&lt;TData, TValue&gt;[]
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>컬럼 정의 배열 (필수)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>data</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">TData[]</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>테이블 데이터 배열 (필수)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>enableRowSelection</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>행 선택 기능 활성화</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>enableGlobalFilter</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>전역 검색 필터 활성화</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>enablePagination</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>페이지네이션 활성화</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>pageSizeOptions</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number[]</Code>
                    </TableCell>
                    <TableCell>[10, 20, 30, 50]</TableCell>
                    <TableCell>페이지당 행 수 옵션</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>defaultPageSize</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>기본 페이지 크기</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>emptyMessage</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>&apos;데이터가 없습니다.&apos;</TableCell>
                    <TableCell>데이터 없음 메시지</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>filterPlaceholder</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>&apos;검색...&apos;</TableCell>
                    <TableCell>검색 입력 플레이스홀더</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>onRowSelectionChange</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        (rows: TData[]) =&gt; void
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>행 선택 변경 콜백</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>loading</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>로딩 상태 표시</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>caption</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>테이블 캡션 (접근성)</TableCell>
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
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="SortableHeader Props" />
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
                      <Code>column</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">Column</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>TanStack Table 컬럼 객체 (필수)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>children</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>헤더 텍스트</TableCell>
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
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="getSelectionColumn" />
              <p className="text-krds-gray-70 mb-4">
                체크박스 선택 컬럼을 생성하는 헬퍼 함수입니다.
                enableRowSelection을 사용하면 자동으로 추가되지만, 커스텀 컬럼
                배열에서 선택 컬럼의 위치를 조정하고 싶을 때 직접 사용할 수
                있습니다.
              </p>
              <Code variant="block" language="tsx">
                {`import { getSelectionColumn } from '@/components/hanui'

const columns: ColumnDef<User>[] = [
  getSelectionColumn<User>(),
  { accessorKey: 'name', header: '이름' },
  { accessorKey: 'email', header: '이메일' },
]`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="ColumnDef" />
              <p className="text-krds-gray-70 mb-4">
                TanStack Table의 ColumnDef 타입을 re-export합니다. 주요 속성:
              </p>
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>속성</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>accessorKey</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>데이터 객체의 키</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>header</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        string | (props) =&gt; ReactNode
                      </Code>
                    </TableCell>
                    <TableCell>헤더 텍스트 또는 렌더 함수</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>cell</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">(props) =&gt; ReactNode</Code>
                    </TableCell>
                    <TableCell>셀 렌더링 함수</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>enableSorting</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>정렬 활성화 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>size</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>컬럼 너비</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>meta</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        {"{ align?: 'left' | 'center' | 'right' }"}
                      </Code>
                    </TableCell>
                    <TableCell>메타데이터 (정렬 등)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Container', href: '/components/container' }}
        next={{ title: 'Display', href: '/components/display' }}
      />
    </>
  );
}
