'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Button,
  Input,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
  Tag,
  Switch,
  Checkbox,
  Alert,
  AlertTitle,
  AlertDescription,
  HStack,
  Stack,
  LoginForm,
  SignupForm,
  OtpVerify,
  GovLogin,
  ContactForm,
  StatsCard,
  BoardManagement,
} from '@hanui/react';

const tabs = [
  { id: 'components', label: '컴포넌트' },
  { id: 'gov-forms', label: '공공 서식' },
  { id: 'dashboard', label: '대시보드' },
  { id: 'auth', label: '인증' },
];

function ComponentsTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Column 1 - Buttons & Inputs */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Button</CardTitle>
            <CardDescription>다양한 스타일의 버튼</CardDescription>
          </CardHeader>
          <CardBody>
            <Stack gap="sm">
              <HStack gap="sm" className="flex-wrap">
                <Button variant="primary" size="sm">
                  Primary
                </Button>
                <Button variant="secondary" size="sm">
                  Secondary
                </Button>
                <Button variant="tertiary" size="sm">
                  Tertiary
                </Button>
              </HStack>
              <HStack gap="sm" className="flex-wrap">
                <Button variant="success" size="sm">
                  Success
                </Button>
                <Button variant="danger" size="sm">
                  Danger
                </Button>
                <Button variant="ghost" size="sm">
                  Ghost
                </Button>
              </HStack>
              <Button variant="black" size="md" className="w-full">
                Get Started
              </Button>
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
            <CardDescription>폼 입력 필드</CardDescription>
          </CardHeader>
          <CardBody>
            <Stack gap="sm">
              <Input placeholder="기본 입력" />
              <Input placeholder="성공 상태" status="success" />
              <Input placeholder="에러 상태" status="error" />
              <Input type="password" placeholder="비밀번호" />
            </Stack>
          </CardBody>
        </Card>
      </div>

      {/* Column 2 - Badge, Tag, Switch */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Badge & Tag</CardTitle>
            <CardDescription>상태 표시 라벨</CardDescription>
          </CardHeader>
          <CardBody>
            <Stack gap="md">
              <HStack gap="sm" className="flex-wrap">
                <Badge variant="primary">신규</Badge>
                <Badge variant="success">완료</Badge>
                <Badge variant="warning">대기</Badge>
                <Badge variant="error">오류</Badge>
                <Badge variant="info">정보</Badge>
              </HStack>
              <HStack gap="sm" className="flex-wrap">
                <Badge variant="outline-primary">v2.2</Badge>
                <Badge variant="outline-success">KRDS</Badge>
                <Badge variant="outline-info">AA</Badge>
              </HStack>
              <HStack gap="sm" className="flex-wrap">
                <Tag>React</Tag>
                <Tag>TypeScript</Tag>
                <Tag>Tailwind</Tag>
                <Tag>KRDS</Tag>
              </HStack>
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Form Controls</CardTitle>
            <CardDescription>체크박스, 스위치</CardDescription>
          </CardHeader>
          <CardBody>
            <Stack gap="md">
              <HStack gap="md">
                <Checkbox id="showcase-terms" />
                <label htmlFor="showcase-terms" className="text-sm">
                  이용약관 동의
                </label>
              </HStack>
              <HStack gap="md">
                <Checkbox id="showcase-privacy" />
                <label htmlFor="showcase-privacy" className="text-sm">
                  개인정보 수집 동의
                </label>
              </HStack>
              <HStack gap="md" className="justify-between">
                <span className="text-sm">알림 수신</span>
                <Switch />
              </HStack>
              <HStack gap="md" className="justify-between">
                <span className="text-sm">다크 모드</span>
                <Switch />
              </HStack>
            </Stack>
          </CardBody>
        </Card>
      </div>

      {/* Column 3 - Alert & Card variants */}
      <div className="space-y-6">
        <Alert variant="info">
          <AlertTitle>KRDS 2.2 준수</AlertTitle>
          <AlertDescription>
            모든 컴포넌트는 정부 디자인 시스템 표준을 따릅니다.
          </AlertDescription>
        </Alert>

        <Alert variant="success">
          <AlertTitle>접근성 AA 충족</AlertTitle>
          <AlertDescription>
            WCAG 2.1 AA 기준 색상 대비, 키보드 내비게이션을 지원합니다.
          </AlertDescription>
        </Alert>

        <Card variant="elevated">
          <CardHeader>
            <CardTitle>61+ 컴포넌트</CardTitle>
            <CardDescription>
              Button, Input, Card, Table, Modal, Tabs, Accordion 등 공공 웹에
              필요한 모든 UI
            </CardDescription>
          </CardHeader>
          <CardBody>
            <Stack gap="sm">
              <HStack gap="sm" className="flex-wrap">
                <Badge variant="gray" size="md">
                  Button
                </Badge>
                <Badge variant="gray" size="md">
                  Input
                </Badge>
                <Badge variant="gray" size="md">
                  Card
                </Badge>
                <Badge variant="gray" size="md">
                  Table
                </Badge>
                <Badge variant="gray" size="md">
                  Modal
                </Badge>
                <Badge variant="gray" size="md">
                  Tabs
                </Badge>
                <Badge variant="gray" size="md">
                  Form
                </Badge>
                <Badge variant="gray" size="md">
                  +54
                </Badge>
              </HStack>
            </Stack>
          </CardBody>
          <CardFooter>
            <Link href="/components">
              <Button variant="ghost-primary" size="sm">
                모든 컴포넌트 보기 &rarr;
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function GovFormsTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="rounded-lg border border-krds-gray-20 bg-white dark:bg-gray-950 overflow-hidden">
        <div className="px-4 py-3 border-b border-krds-gray-20 bg-krds-gray-5">
          <HStack gap="sm" className="items-center">
            <Badge variant="primary" size="md">
              Block
            </Badge>
            <span className="text-sm font-medium text-krds-gray-70">
              정부24 로그인
            </span>
          </HStack>
        </div>
        <div className="p-6">
          <GovLogin
            onLogin={() => {}}
            onSimpleAuth={() => {}}
            onCertAuth={() => {}}
          />
        </div>
      </div>

      <div className="rounded-lg border border-krds-gray-20 bg-white dark:bg-gray-950 overflow-hidden">
        <div className="px-4 py-3 border-b border-krds-gray-20 bg-krds-gray-5">
          <HStack gap="sm" className="items-center">
            <Badge variant="primary" size="md">
              Block
            </Badge>
            <span className="text-sm font-medium text-krds-gray-70">
              문의 폼
            </span>
          </HStack>
        </div>
        <div className="p-6">
          <ContactForm onSubmit={() => {}} />
        </div>
      </div>

      <div className="lg:col-span-2 flex justify-center pt-2">
        <Link href="/blocks">
          <Button variant="ghost-primary" size="sm">
            모든 블록 보기 &rarr;
          </Button>
        </Link>
      </div>
    </div>
  );
}

const mockStats = [
  { label: '총 방문자', value: '12,450', change: 12.5 },
  { label: '게시글 수', value: '1,234', change: 3.2 },
  { label: '민원 접수', value: '89', change: -5.1 },
  { label: '처리 완료', value: '76', change: 8.7 },
];

const mockBoards = [
  { id: 1, name: '공지사항', slug: 'notice', postCount: 45 },
  { id: 2, name: '자유게시판', slug: 'free', postCount: 123 },
  { id: 3, name: '민원접수', slug: 'civil', postCount: 89 },
];

const mockPosts = [
  {
    id: 1,
    boardId: 1,
    title: '2026년 상반기 운영 계획 안내',
    author: '관리자',
    status: 'PUBLISHED' as const,
    createdAt: '2026-03-18',
    isPinned: true,
    views: 342,
  },
  {
    id: 2,
    boardId: 1,
    title: '시스템 점검 안내 (3/25)',
    author: '관리자',
    status: 'PUBLISHED' as const,
    createdAt: '2026-03-17',
    isPinned: false,
    views: 128,
  },
  {
    id: 3,
    boardId: 1,
    title: '개인정보 처리방침 변경 사전 안내',
    author: '관리자',
    status: 'DRAFT' as const,
    createdAt: '2026-03-15',
    isPinned: false,
    views: 0,
  },
  {
    id: 4,
    boardId: 1,
    title: '신규 서비스 오픈 안내',
    author: '홍길동',
    status: 'PUBLISHED' as const,
    createdAt: '2026-03-14',
    isPinned: false,
    views: 87,
  },
];

function DashboardTab() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-krds-gray-20 bg-white dark:bg-gray-950 overflow-hidden">
        <div className="px-4 py-3 border-b border-krds-gray-20 bg-krds-gray-5">
          <HStack gap="sm" className="items-center">
            <Badge variant="success" size="md">
              Block
            </Badge>
            <span className="text-sm font-medium text-krds-gray-70">
              통계 카드
            </span>
          </HStack>
        </div>
        <div className="p-6">
          <StatsCard items={mockStats} columns={4} />
        </div>
      </div>

      <div className="rounded-lg border border-krds-gray-20 bg-white dark:bg-gray-950 overflow-hidden">
        <div className="px-4 py-3 border-b border-krds-gray-20 bg-krds-gray-5">
          <HStack gap="sm" className="items-center">
            <Badge variant="success" size="md">
              Block
            </Badge>
            <span className="text-sm font-medium text-krds-gray-70">
              게시판 관리
            </span>
          </HStack>
        </div>
        <div className="p-6">
          <BoardManagement
            boards={mockBoards}
            posts={mockPosts}
            onNewPost={() => {}}
            onEditPost={() => {}}
            onDeletePost={() => {}}
            onTogglePin={() => {}}
          />
        </div>
      </div>

      <div className="flex justify-center pt-2">
        <Link href="/blocks">
          <Button variant="ghost-primary" size="sm">
            모든 블록 보기 &rarr;
          </Button>
        </Link>
      </div>
    </div>
  );
}

function AuthTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="rounded-lg border border-krds-gray-20 bg-white dark:bg-gray-950 overflow-hidden">
        <div className="px-4 py-3 border-b border-krds-gray-20 bg-krds-gray-5">
          <HStack gap="sm" className="items-center">
            <Badge variant="info" size="md">
              Block
            </Badge>
            <span className="text-sm font-medium text-krds-gray-70">
              로그인
            </span>
          </HStack>
        </div>
        <div className="p-6">
          <LoginForm onSubmit={() => {}} />
        </div>
      </div>

      <div className="rounded-lg border border-krds-gray-20 bg-white dark:bg-gray-950 overflow-hidden">
        <div className="px-4 py-3 border-b border-krds-gray-20 bg-krds-gray-5">
          <HStack gap="sm" className="items-center">
            <Badge variant="info" size="md">
              Block
            </Badge>
            <span className="text-sm font-medium text-krds-gray-70">
              회원가입
            </span>
          </HStack>
        </div>
        <div className="p-6">
          <SignupForm onSubmit={() => {}} />
        </div>
      </div>

      <div className="rounded-lg border border-krds-gray-20 bg-white dark:bg-gray-950 overflow-hidden">
        <div className="px-4 py-3 border-b border-krds-gray-20 bg-krds-gray-5">
          <HStack gap="sm" className="items-center">
            <Badge variant="info" size="md">
              Block
            </Badge>
            <span className="text-sm font-medium text-krds-gray-70">
              OTP 인증
            </span>
          </HStack>
        </div>
        <div className="p-6">
          <OtpVerify onSubmit={() => {}} onResend={() => {}} />
        </div>
      </div>

      <div className="md:col-span-2 lg:col-span-3 flex justify-center pt-2">
        <Link href="/blocks">
          <Button variant="ghost-primary" size="sm">
            모든 인증 블록 보기 &rarr;
          </Button>
        </Link>
      </div>
    </div>
  );
}

export function ExampleShowcase() {
  const [activeTab, setActiveTab] = useState('components');

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex items-center mb-6">
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-1 font-medium transition-colors relative whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-gray-900 dark:text-gray-100'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-gray-100" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'components' && <ComponentsTab />}
      {activeTab === 'gov-forms' && <GovFormsTab />}
      {activeTab === 'dashboard' && <DashboardTab />}
      {activeTab === 'auth' && <AuthTab />}
    </div>
  );
}
