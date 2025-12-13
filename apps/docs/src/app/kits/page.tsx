'use client';

import {
  PageSection as Section,
  Heading,
  Subsection,
} from '@/components/content';
import {
  Code,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  Badge,
} from '@hanui/react';
import Link from 'next/link';

const kits = [
  {
    name: 'Board Kit',
    description: '게시판 기능 키트 (목록, 상세, 작성, 수정, 삭제)',
    href: '/kits/board',
    status: 'available',
    files: 9,
    dependencies: ['zustand', 'react-query', 'axios', 'react-hook-form', 'zod'],
  },
  {
    name: 'Auth Kit',
    description: '인증 기능 키트 (로그인, 회원가입, 비밀번호 찾기)',
    href: '/kits/auth',
    status: 'coming-soon',
    files: 9,
    dependencies: ['zustand', 'react-query', 'axios'],
  },
  {
    name: 'Table Kit',
    description: '데이터 테이블 키트 (정렬, 필터, 페이지네이션, CSV 내보내기)',
    href: '/kits/table',
    status: 'coming-soon',
    files: 9,
    dependencies: ['zustand', 'react-query'],
  },
  {
    name: 'Form Kit',
    description: '폼 키트 (기본 폼, 다단계 폼, 파일 업로드, 동적 필드)',
    href: '/kits/form',
    status: 'coming-soon',
    files: 10,
    dependencies: ['zustand', 'react-hook-form', 'zod'],
  },
  {
    name: 'Dashboard Kit',
    description: '대시보드 키트 (통계 카드, 차트, 최근 활동)',
    href: '/kits/dashboard',
    status: 'coming-soon',
    files: 11,
    dependencies: ['zustand', 'react-query', 'recharts'],
  },
];

export default function KitsPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Kits"
        description="실전에서 바로 사용 가능한 기능 키트. API 주소만 바꾸면 바로 동작합니다."
      />

      <Section level="h2">
        <Heading level="h2" id="concept" title="컨셉" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="p-4 border rounded-lg">
            <div className="text-2xl mb-2">🧱</div>
            <h3 className="font-bold">레고 블록</h3>
            <p className="text-sm text-gray-600">
              교과서가 아닌 조립 가능한 블록
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-2xl mb-2">📋</div>
            <h3 className="font-bold">Copy & Paste</h3>
            <p className="text-sm text-gray-600">
              npm install 없이 복사해서 사용
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-2xl mb-2">🔌</div>
            <h3 className="font-bold">API 연동</h3>
            <p className="text-sm text-gray-600">API 주소만 바꾸면 바로 동작</p>
          </div>
        </div>
      </Section>

      <Section level="h2">
        <Heading level="h2" id="tech-stack" title="기술 스택" />
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="outline">Zustand</Badge>
          <Badge variant="outline">React Query</Badge>
          <Badge variant="outline">Axios</Badge>
          <Badge variant="outline">React Hook Form</Badge>
          <Badge variant="outline">Zod</Badge>
          <Badge variant="outline">TypeScript</Badge>
        </div>
      </Section>

      <Section level="h2">
        <Heading level="h2" id="kits-list" title="Kits 목록" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {kits.map((kit) => (
            <Card
              key={kit.name}
              className={kit.status === 'coming-soon' ? 'opacity-60' : ''}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{kit.name}</CardTitle>
                  {kit.status === 'coming-soon' ? (
                    <Badge variant="secondary">Coming Soon</Badge>
                  ) : (
                    <Badge variant="primary">Available</Badge>
                  )}
                </div>
                <CardDescription>{kit.description}</CardDescription>
              </CardHeader>
              <CardBody>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{kit.files}개 파일</span>
                  {kit.status === 'available' ? (
                    <Link
                      href={kit.href}
                      className="text-blue-600 hover:underline"
                    >
                      자세히 보기 →
                    </Link>
                  ) : (
                    <span className="text-gray-400">준비 중</span>
                  )}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      <Section level="h2">
        <Heading level="h2" id="usage" title="사용 방법" />
        <div className="space-y-4 mt-4">
          <div className="flex items-start gap-4 p-4 border rounded-lg">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h3 className="font-bold">Kit 선택</h3>
              <p className="text-sm text-gray-600">
                필요한 Kit 페이지로 이동합니다.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 border rounded-lg">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h3 className="font-bold">코드 복사</h3>
              <p className="text-sm text-gray-600">
                필요한 파일들의 코드를 복사합니다.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 border rounded-lg">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h3 className="font-bold">API 주소 변경</h3>
              <p className="text-sm text-gray-600">
                <Code>api/*.ts</Code> 파일의 <Code>API_URL</Code>을 실제 서버
                주소로 변경합니다.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 border rounded-lg">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
              4
            </div>
            <div>
              <h3 className="font-bold">바로 사용</h3>
              <p className="text-sm text-gray-600">끝! 이제 바로 동작합니다.</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
