'use client';

import { useRouter } from 'next/navigation';
import { NoticeList, Pagination, SearchBar, Breadcrumb } from '@hanui/react';
import * as React from 'react';

const allNotices = Array.from({ length: 50 }, (_, i) => ({
  id: 50 - i,
  title: `${50 - i}번째 공지사항 제목입니다`,
  date: `2026-${String(Math.floor(i / 30) + 3).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
  category: i % 3 === 0 ? '공지' : i % 3 === 1 ? '안내' : '보도',
  pinned: i < 2,
  isNew: i < 3,
}));

export default function NoticePage() {
  const router = useRouter();
  const [page, setPage] = React.useState(1);
  const perPage = 10;
  const totalPages = Math.ceil(allNotices.length / perPage);
  const items = allNotices.slice((page - 1) * perPage, page * perPage);

  return (
    <>
      <Breadcrumb
        items={[
          { label: '홈', href: '/showcase/public' },
          { label: '알림마당', href: '/showcase/public/notice' },
          { label: '공지사항', isCurrent: true },
        ]}
      />

      <h1 className="text-2xl font-bold text-krds-gray-90 mt-6 mb-6">
        공지사항
      </h1>

      <div className="mb-6">
        <SearchBar
          placeholder="공지사항 검색"
          onSearch={(q) => router.push(`/showcase/public/search?q=${q}`)}
        />
      </div>

      <NoticeList
        items={items}
        onItemClick={(item) =>
          router.push(`/showcase/public/notice/${item.id}`)
        }
      />

      <div className="mt-8 flex justify-center">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}
