'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Body,
  Button,
} from '@hanui/react';
import { StatsCard } from '@hanui/react';
import {
  Users,
  FileText,
  Eye,
  TrendingUp,
  UserPlus,
  Clock,
  Plus,
  Megaphone,
  Upload,
  Settings,
  FileUp,
  MessageSquare,
  UserCheck,
  AlertCircle,
} from 'lucide-react';

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

const recentActivities = [
  {
    icon: <FileUp className="h-4 w-4" />,
    text: '홍길동님이 "2026년 상반기 사업계획 안내"를 발행했습니다.',
    time: '10분 전',
    color: 'text-krds-primary-base',
  },
  {
    icon: <MessageSquare className="h-4 w-4" />,
    text: '"신규 직원 채용 공고"에 새 댓글이 등록되었습니다.',
    time: '30분 전',
    color: 'text-krds-green-60',
  },
  {
    icon: <UserCheck className="h-4 w-4" />,
    text: '김영희님이 관리자로 로그인했습니다.',
    time: '1시간 전',
    color: 'text-krds-gray-60',
  },
  {
    icon: <AlertCircle className="h-4 w-4" />,
    text: '"개인정보 처리방침" 예약발행이 대기 중입니다.',
    time: '2시간 전',
    color: 'text-amber-500',
  },
  {
    icon: <FileUp className="h-4 w-4" />,
    text: '박철수님이 "3월 보도자료"를 임시저장했습니다.',
    time: '3시간 전',
    color: 'text-krds-gray-50',
  },
  {
    icon: <UserPlus className="h-4 w-4" />,
    text: '새 회원 최유진님이 가입했습니다.',
    time: '5시간 전',
    color: 'text-krds-primary-base',
  },
];

const quickActions = [
  {
    icon: <Plus className="h-5 w-5" />,
    label: '새 게시물 작성',
    href: '/showcase/cms/posts',
  },
  {
    icon: <Megaphone className="h-5 w-5" />,
    label: '공지사항 등록',
    href: '/showcase/cms/posts',
  },
  {
    icon: <Upload className="h-5 w-5" />,
    label: '미디어 업로드',
    href: '/showcase/cms',
  },
  {
    icon: <Settings className="h-5 w-5" />,
    label: '사이트 설정',
    href: '/showcase/cms',
  },
];

const pendingItems = [
  { label: '대기 중 게시물', count: 3, color: 'text-amber-500' },
  { label: '미확인 댓글', count: 7, color: 'text-krds-primary-base' },
  { label: '만료 예정 공고', count: 2, color: 'text-red-500' },
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

      {/* 빠른 작업 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickActions.map((action) => (
          <button
            key={action.label}
            className="flex flex-col items-center gap-2 rounded-lg border border-krds-gray-20 bg-white p-4 transition-colors hover:border-krds-primary-base hover:bg-krds-primary-5/30"
          >
            <div className="text-krds-primary-base">{action.icon}</div>
            <Body size="sm" className="text-krds-gray-70 font-medium">
              {action.label}
            </Body>
          </button>
        ))}
      </div>

      {/* 중간 3컬럼 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

        {/* 처리 필요 */}
        <Card>
          <CardHeader>
            <CardTitle>처리 필요</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {pendingItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between"
                >
                  <Body size="sm" className="text-krds-gray-70">
                    {item.label}
                  </Body>
                  <span className={`text-lg font-bold ${item.color}`}>
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* 최근 활동 */}
      <Card>
        <CardHeader>
          <CardTitle>최근 활동</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="divide-y divide-krds-gray-10">
            {recentActivities.map((activity, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className={`mt-0.5 ${activity.color}`}>
                  {activity.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <Body size="sm" className="text-krds-gray-70">
                    {activity.text}
                  </Body>
                </div>
                <Body
                  size="xs"
                  className="text-krds-gray-40 flex-shrink-0 whitespace-nowrap"
                >
                  {activity.time}
                </Body>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
