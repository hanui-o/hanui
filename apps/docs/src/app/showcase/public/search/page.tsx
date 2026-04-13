'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Breadcrumb,
  SearchBar,
  Pagination,
  EmptyState,
  Badge,
  Body,
} from '@hanui/react';
import * as React from 'react';

const mockResults = [
  {
    id: 1,
    title: '2026년 상반기 정보화 사업 계획 공고',
    board: '공지사항',
    date: '2026-04-10',
  },
  {
    id: 2,
    title: '홈페이지 시스템 정기점검 안내',
    board: '안내',
    date: '2026-04-08',
  },
  {
    id: 3,
    title: '개인정보처리방침 개정 안내',
    board: '공지사항',
    date: '2026-04-05',
  },
  {
    id: 4,
    title: '온라인 민원 접수 시스템 개선 안내',
    board: '안내',
    date: '2026-03-20',
  },
  {
    id: 5,
    title: '정보공개 사전정보공표 업데이트',
    board: '정보공개',
    date: '2026-03-15',
  },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [page, setPage] = React.useState(1);

  const results = query
    ? mockResults.filter((r) => r.title.includes(query))
    : [];

  return (
    <>
      <Breadcrumb
        items={[
          { label: '홈', href: '/showcase/public' },
          { label: '검색결과', isCurrent: true },
        ]}
      />

      <h1 className="text-2xl font-bold text-krds-gray-90 mt-6 mb-6">
        검색결과
      </h1>

      <div className="mb-6">
        <SearchBar
          placeholder="검색어를 입력하세요"
          onSearch={(q) => router.push(`/showcase/public/search?q=${q}`)}
        />
      </div>

      {query && (
        <div role="status" aria-live="polite" className="mb-6">
          <Body size="md" className="text-krds-gray-60">
            &quot;{query}&quot; 검색결과{' '}
            <strong className="text-krds-primary-base">{results.length}</strong>
            건
          </Body>
        </div>
      )}

      {results.length > 0 ? (
        <>
          <ul className="divide-y divide-krds-gray-10">
            {results.map((item) => (
              <li key={item.id}>
                <a
                  href={`/showcase/public/notice/${item.id}`}
                  className="flex items-center justify-between py-4 hover:bg-krds-gray-5 -mx-2 px-2 rounded transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="gray" size="md">
                      {item.board}
                    </Badge>
                    <span className="text-sm text-krds-gray-80">
                      {item.title}
                    </span>
                  </div>
                  <Body size="sm" className="text-krds-gray-40 tabular-nums">
                    {item.date}
                  </Body>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={page}
              totalPages={1}
              onPageChange={setPage}
            />
          </div>
        </>
      ) : query ? (
        <EmptyState
          title="검색결과가 없습니다"
          description={`"${query}"에 대한 검색결과를 찾을 수 없습니다. 다른 검색어로 다시 시도해 보세요.`}
        />
      ) : null}
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
