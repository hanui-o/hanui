'use client';

import * as React from 'react';
import {
  Badge,
  Body,
  Breadcrumb,
  Button,
  Checkbox,
  ContentFilter,
  BulkActionsBar,
  Pagination,
  type FilterState,
} from '@hanui/react';
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react';

// ============================================================================
// 더미 데이터
// ============================================================================

interface Post {
  id: number;
  title: string;
  category: string;
  status: 'published' | 'draft' | 'private' | 'scheduled';
  author: string;
  date: string;
  views: number;
}

const STATUS_LABEL: Record<Post['status'], string> = {
  published: '발행됨',
  draft: '임시저장',
  private: '비공개',
  scheduled: '예약',
};

const STATUS_COLOR: Record<Post['status'], string> = {
  published: 'bg-krds-green-5 text-krds-green-70 border border-krds-green-20',
  draft: 'bg-krds-gray-5 text-krds-gray-60 border border-krds-gray-20',
  private: 'bg-red-50 text-red-700 border border-red-200',
  scheduled:
    'bg-krds-primary-5 text-krds-primary-base border border-krds-primary-20',
};

const DUMMY_POSTS: Post[] = [
  {
    id: 1,
    title: '2026년 상반기 주요 사업계획 안내',
    category: '소식',
    status: 'published',
    author: '홍길동',
    date: '2026-03-15',
    views: 342,
  },
  {
    id: 2,
    title: '제3차 정보화 전략계획 수립 공고',
    category: '정책',
    status: 'published',
    author: '김영희',
    date: '2026-03-14',
    views: 128,
  },
  {
    id: 3,
    title: '2026년 상반기 신규 직원 채용 공고',
    category: '채용',
    status: 'published',
    author: '박철수',
    date: '2026-03-13',
    views: 1205,
  },
  {
    id: 4,
    title: '개인정보 처리방침 개정 안내',
    category: '정책',
    status: 'published',
    author: '이민수',
    date: '2026-03-12',
    views: 89,
  },
  {
    id: 5,
    title: '홈페이지 시스템 점검 안내 (3/20)',
    category: '소식',
    status: 'scheduled',
    author: '최유진',
    date: '2026-03-20',
    views: 0,
  },
  {
    id: 6,
    title: '2025년 연간 사업보고서 발간',
    category: '사업안내',
    status: 'published',
    author: '홍길동',
    date: '2026-03-11',
    views: 456,
  },
  {
    id: 7,
    title: '지역사회 협력 프로그램 참여 안내',
    category: '사업안내',
    status: 'draft',
    author: '김영희',
    date: '2026-03-10',
    views: 0,
  },
  {
    id: 8,
    title: '정보공개 사전정보공표 업데이트',
    category: '정책',
    status: 'published',
    author: '이민수',
    date: '2026-03-09',
    views: 67,
  },
  {
    id: 9,
    title: '2026년 예산 편성 및 집행 현황',
    category: '정책',
    status: 'private',
    author: '박철수',
    date: '2026-03-08',
    views: 23,
  },
  {
    id: 10,
    title: '청년 인턴십 프로그램 안내',
    category: '채용',
    status: 'published',
    author: '최유진',
    date: '2026-03-07',
    views: 892,
  },
  {
    id: 11,
    title: '기관 로고 및 CI 가이드라인',
    category: '기타',
    status: 'published',
    author: '홍길동',
    date: '2026-03-06',
    views: 234,
  },
  {
    id: 12,
    title: '2026년 3월 보도자료 배포',
    category: '소식',
    status: 'draft',
    author: '김영희',
    date: '2026-03-05',
    views: 0,
  },
  {
    id: 13,
    title: '공공데이터 개방 계획 안내',
    category: '정책',
    status: 'published',
    author: '이민수',
    date: '2026-03-04',
    views: 156,
  },
  {
    id: 14,
    title: '시설물 안전점검 결과 보고',
    category: '사업안내',
    status: 'private',
    author: '박철수',
    date: '2026-03-03',
    views: 12,
  },
  {
    id: 15,
    title: '직원 교육 훈련 일정 안내',
    category: '기타',
    status: 'published',
    author: '최유진',
    date: '2026-03-02',
    views: 78,
  },
  {
    id: 16,
    title: '환경 보전 활동 참여 안내',
    category: '사업안내',
    status: 'scheduled',
    author: '홍길동',
    date: '2026-03-25',
    views: 0,
  },
  {
    id: 17,
    title: '2026년 상반기 입찰공고 안내',
    category: '사업안내',
    status: 'published',
    author: '김영희',
    date: '2026-03-01',
    views: 567,
  },
  {
    id: 18,
    title: '민원 처리 절차 안내',
    category: '정책',
    status: 'published',
    author: '이민수',
    date: '2026-02-28',
    views: 345,
  },
  {
    id: 19,
    title: '국민참여 설문조사 안내',
    category: '소식',
    status: 'draft',
    author: '박철수',
    date: '2026-02-27',
    views: 0,
  },
  {
    id: 20,
    title: '2026년 하반기 채용 예정 안내',
    category: '채용',
    status: 'draft',
    author: '최유진',
    date: '2026-02-26',
    views: 0,
  },
];

const PAGE_SIZE = 10;

// ============================================================================
// 게시물 관리 목록 페이지
// ============================================================================

export default function CmsPostsPage() {
  const [filters, setFilters] = React.useState<FilterState>({
    status: 'all',
    category: 'all',
    startDate: '',
    endDate: '',
    query: '',
  });
  const [selectedIds, setSelectedIds] = React.useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = React.useState(1);

  // 필터링된 게시물
  const filteredPosts = React.useMemo(() => {
    return DUMMY_POSTS.filter((post) => {
      if (filters.status !== 'all' && post.status !== filters.status)
        return false;
      if (filters.category !== 'all') {
        const categoryMap: Record<string, string> = {
          news: '소식',
          policy: '정책',
          project: '사업안내',
          recruit: '채용',
          etc: '기타',
        };
        if (post.category !== categoryMap[filters.category]) return false;
      }
      if (filters.query && !post.title.includes(filters.query)) return false;
      if (filters.startDate && post.date < filters.startDate) return false;
      if (filters.endDate && post.date > filters.endDate) return false;
      return true;
    });
  }, [filters]);

  // 페이지네이션
  const totalPages = Math.ceil(filteredPosts.length / PAGE_SIZE);
  const pagedPosts = filteredPosts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // 선택 핸들러
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    setSelectedIds(new Set(pagedPosts.map((p) => p.id)));
  };

  const deselectAll = () => {
    setSelectedIds(new Set());
  };

  const isAllSelected =
    pagedPosts.length > 0 && pagedPosts.every((p) => selectedIds.has(p.id));

  const handleFilterChange = (f: FilterState) => {
    setFilters(f);
    setCurrentPage(1);
    setSelectedIds(new Set());
  };

  const handleBulkAction = (action: string) => {
    alert(`"${action}" 액션 실행 — 선택된 항목: ${selectedIds.size}개`);
    setSelectedIds(new Set());
  };

  return (
    <div className="space-y-4">
      {/* 브레드크럼 + 헤더 */}
      <Breadcrumb
        items={[
          { label: 'CMS', href: '/showcase/cms' },
          { label: '게시물 관리' },
        ]}
      />

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-krds-gray-90">게시물 관리</h1>
        <Button variant="primary" size="md">
          <Plus className="mr-1.5 h-4 w-4" />새 게시물
        </Button>
      </div>

      {/* 필터 */}
      <ContentFilter
        onFilterChange={handleFilterChange}
        initialFilters={filters}
      />

      {/* 일괄 작업 바 */}
      <BulkActionsBar
        selectedCount={selectedIds.size}
        onAction={handleBulkAction}
        onSelectAll={selectAll}
        onDeselectAll={deselectAll}
      />

      {/* 결과 요약 */}
      <Body size="sm" className="text-krds-gray-50">
        총 {filteredPosts.length}건
      </Body>

      {/* 테이블 */}
      <div className="overflow-x-auto rounded-lg border border-krds-gray-20">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-krds-gray-20 bg-krds-gray-5">
            <tr>
              <th className="w-10 px-4 py-3">
                <Checkbox
                  checked={isAllSelected}
                  onChange={() => (isAllSelected ? deselectAll() : selectAll())}
                />
              </th>
              <th className="px-4 py-3 font-medium text-krds-gray-70">제목</th>
              <th className="w-24 px-4 py-3 font-medium text-krds-gray-70">
                카테고리
              </th>
              <th className="w-24 px-4 py-3 font-medium text-krds-gray-70">
                상태
              </th>
              <th className="w-20 px-4 py-3 font-medium text-krds-gray-70">
                작성자
              </th>
              <th className="w-28 px-4 py-3 font-medium text-krds-gray-70">
                작성일
              </th>
              <th className="w-20 px-4 py-3 text-right font-medium text-krds-gray-70">
                조회수
              </th>
              <th className="w-24 px-4 py-3 text-center font-medium text-krds-gray-70">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-krds-gray-10">
            {pagedPosts.map((post) => (
              <tr
                key={post.id}
                className={`transition-colors hover:bg-krds-gray-5/50 ${
                  selectedIds.has(post.id) ? 'bg-krds-primary-5/30' : ''
                }`}
              >
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedIds.has(post.id)}
                    onChange={() => toggleSelect(post.id)}
                  />
                </td>
                <td className="px-4 py-3">
                  <span className="font-medium text-krds-gray-90 hover:text-krds-primary-base cursor-pointer">
                    {post.title}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Body size="sm" className="text-krds-gray-60">
                    {post.category}
                  </Body>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLOR[post.status]}`}
                  >
                    {STATUS_LABEL[post.status]}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Body size="sm" className="text-krds-gray-60">
                    {post.author}
                  </Body>
                </td>
                <td className="px-4 py-3">
                  <Body size="sm" className="text-krds-gray-50">
                    {post.date}
                  </Body>
                </td>
                <td className="px-4 py-3 text-right">
                  <Body size="sm" className="text-krds-gray-60">
                    {post.views.toLocaleString()}
                  </Body>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      className="rounded p-1.5 text-krds-gray-40 hover:bg-krds-gray-10 hover:text-krds-gray-70"
                      aria-label="보기"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      className="rounded p-1.5 text-krds-gray-40 hover:bg-krds-gray-10 hover:text-krds-gray-70"
                      aria-label="수정"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      className="rounded p-1.5 text-krds-gray-40 hover:bg-red-50 hover:text-red-600"
                      aria-label="삭제"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {pagedPosts.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-16 text-center">
                  <Body size="md" className="text-krds-gray-40">
                    검색 결과가 없습니다.
                  </Body>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
