'use client';

import { Card, CardHeader, CardTitle, CardBody, Body } from '@hanui/react';
import { StatsCard } from '@hanui/react';
import { Users, FileText, Eye, TrendingUp } from 'lucide-react';

const stats = [
  {
    label: '오늘 방문자',
    value: '1,234',
    change: '+12%',
    icon: <Users className="w-5 h-5" />,
  },
  {
    label: '총 게시글',
    value: '456',
    change: '+3',
    icon: <FileText className="w-5 h-5" />,
  },
  {
    label: '이번 달 등록',
    value: '28',
    change: '+15%',
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    label: '페이지 조회',
    value: '8,901',
    change: '+8%',
    icon: <Eye className="w-5 h-5" />,
  },
];

const recentPosts = [
  {
    id: 1,
    title: '2026년 상반기 사업계획 안내',
    board: '공지사항',
    date: '2026-03-13',
  },
  {
    id: 2,
    title: '신규 직원 채용 공고',
    board: '채용공고',
    date: '2026-03-12',
  },
  { id: 3, title: '3월 보도자료 배포', board: '보도자료', date: '2026-03-11' },
  {
    id: 4,
    title: '정보공개 사전정보공표 업데이트',
    board: '정보공개',
    date: '2026-03-10',
  },
  {
    id: 5,
    title: '시스템 점검 안내 (3/15)',
    board: '공지사항',
    date: '2026-03-09',
  },
];

const contentStatus = [
  { board: '공지사항', count: 142 },
  { board: '보도자료', count: 89 },
  { board: '자료실', count: 67 },
  { board: '채용공고', count: 23 },
  { board: '입찰공고', count: 15 },
];

export default function CmsDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-krds-gray-90">대시보드</h1>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardBody className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-krds-primary-5 text-krds-primary-base">
                {stat.icon}
              </div>
              <div>
                <Body size="sm" className="text-krds-gray-50">
                  {stat.label}
                </Body>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-krds-gray-90">
                    {stat.value}
                  </span>
                  <span className="text-sm text-krds-green-60">
                    {stat.change}
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* 하단 2컬럼 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 최신 게시글 */}
        <Card>
          <CardHeader>
            <CardTitle>최신 게시글</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="divide-y divide-krds-gray-10">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <Body
                      size="sm"
                      className="text-krds-gray-90 truncate font-medium"
                    >
                      {post.title}
                    </Body>
                    <Body size="xs" className="text-krds-gray-50">
                      {post.board}
                    </Body>
                  </div>
                  <Body
                    size="xs"
                    className="text-krds-gray-40 ml-4 flex-shrink-0"
                  >
                    {post.date}
                  </Body>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* 콘텐츠 현황 */}
        <Card>
          <CardHeader>
            <CardTitle>콘텐츠 현황</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {contentStatus.map((item) => (
                <div key={item.board} className="flex items-center gap-4">
                  <Body
                    size="sm"
                    className="text-krds-gray-70 w-24 flex-shrink-0"
                  >
                    {item.board}
                  </Body>
                  <div className="flex-1 bg-krds-gray-10 rounded-full h-2.5">
                    <div
                      className="bg-krds-primary-base h-2.5 rounded-full"
                      style={{
                        width: `${Math.min((item.count / 150) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <Body
                    size="sm"
                    className="text-krds-gray-90 font-medium w-12 text-right"
                  >
                    {item.count}건
                  </Body>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
