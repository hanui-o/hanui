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
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  List,
  ListItem,
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
    features: ['CRUD', '페이지네이션', '검색', '댓글'],
  },
  {
    name: 'Auth Kit',
    description: '인증 기능 키트 (로그인, 회원가입, 비밀번호 찾기)',
    href: '/kits/auth',
    status: 'available',
    files: 10,
    dependencies: ['zustand', 'react-query', 'axios', 'react-hook-form', 'zod'],
    features: ['로그인/로그아웃', '회원가입', '비밀번호 재설정', '토큰 갱신'],
  },
  {
    name: 'Table Kit',
    description: '데이터 테이블 키트 (정렬, 필터, 페이지네이션, CSV 내보내기)',
    href: '/kits/table',
    status: 'available',
    files: 8,
    dependencies: ['zustand', 'react-query', 'axios'],
    features: ['정렬', '필터', '페이지네이션', 'CSV 내보내기'],
  },
  {
    name: 'Form Kit',
    description: '폼 키트 (기본 폼, 다단계 폼, 파일 업로드, 동적 필드)',
    href: '/kits/form',
    status: 'available',
    files: 9,
    dependencies: ['zustand', 'react-hook-form', 'zod'],
    features: ['다단계 폼', '파일 업로드', '동적 필드', '유효성 검증'],
  },
  {
    name: 'Dashboard Kit',
    description: '대시보드 키트 (통계 카드, 차트, 최근 활동)',
    href: '/kits/dashboard',
    status: 'available',
    files: 10,
    dependencies: ['zustand', 'react-query', 'recharts'],
    features: ['통계 카드', '차트', '활동 피드', '실시간 업데이트'],
  },
];

const techStack = [
  {
    name: 'Zustand',
    description: '경량 상태관리',
    usage: '모든 Kit에서 전역 상태 관리',
  },
  {
    name: 'React Query',
    description: '서버 상태 관리',
    usage: 'API 호출 및 캐싱',
  },
  {
    name: 'Axios',
    description: 'HTTP 클라이언트',
    usage: 'REST API 통신',
  },
  {
    name: 'React Hook Form',
    description: '폼 상태 관리',
    usage: '폼 입력 및 유효성 검증',
  },
  {
    name: 'Zod',
    description: '스키마 검증',
    usage: '타입 안전한 데이터 검증',
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

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">설치 가이드</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Section level="h2">
            <Heading level="h2" id="overview" title="개요" />
            <p className="text-krds-gray-70 mt-4">
              <strong>Hanui Kits</strong>는 실무에서 자주 사용되는 기능을
              패턴화한 복사-붙여넣기 코드 모음입니다. shadcn/ui의 철학을 따라,
              코드를 직접 소유하고 필요에 맞게 수정할 수 있습니다.
            </p>
            <List className="mt-4">
              <ListItem>
                <strong>Zero-config</strong>: 의존성 설치 후 바로 사용
              </ListItem>
              <ListItem>
                <strong>Type-safe</strong>: TypeScript로 작성된 안전한 코드
              </ListItem>
              <ListItem>
                <strong>Accessible</strong>: WCAG 2.1 AA 기준 준수
              </ListItem>
              <ListItem>
                <strong>Customizable</strong>: 프로젝트에 맞게 자유롭게 수정
                가능
              </ListItem>
            </List>
          </Section>

          <Section level="h2">
            <Heading level="h2" id="tech-stack" title="기술 스택" />
            <p className="text-krds-gray-70 mt-4 mb-4">
              모든 Kit은 아래 기술 스택을 기반으로 구현되어 있습니다.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="outline-gray">Zustand</Badge>
              <Badge variant="outline-gray">React Query</Badge>
              <Badge variant="outline-gray">Axios</Badge>
              <Badge variant="outline-gray">React Hook Form</Badge>
              <Badge variant="outline-gray">Zod</Badge>
              <Badge variant="outline-gray">TypeScript</Badge>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>라이브러리</TableHead>
                  <TableHead>역할</TableHead>
                  <TableHead>사용처</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {techStack.map((tech) => (
                  <TableRow key={tech.name}>
                    <TableCell>
                      <Code>{tech.name}</Code>
                    </TableCell>
                    <TableCell>{tech.description}</TableCell>
                    <TableCell className="text-krds-gray-60">
                      {tech.usage}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Section>

          <Section level="h2">
            <Heading level="h2" id="kits-list" title="Kits 목록" />
            <p className="text-krds-gray-70 mt-4 mb-4">
              현재 제공되는 Kit 목록입니다. 각 Kit을 클릭하면 상세 페이지로
              이동합니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {kits.map((kit) => (
                <Link key={kit.name} href={kit.href} className="block group">
                  <Card className="h-full transition-shadow hover:shadow-md border-krds-gray-20">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg group-hover:text-krds-primary-base transition-colors">
                          {kit.name}
                        </CardTitle>
                        <Badge variant="primary">Available</Badge>
                      </div>
                      <CardDescription className="text-krds-gray-60">
                        {kit.description}
                      </CardDescription>
                    </CardHeader>
                    <CardBody>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {kit.features.map((feature) => (
                          <Badge key={feature} variant="secondary">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-krds-gray-50">
                          {kit.files}개 파일
                        </span>
                        <span className="text-krds-primary-base group-hover:underline">
                          자세히 보기 →
                        </span>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              ))}
            </div>
          </Section>

          <Section level="h2">
            <Heading level="h2" id="usage" title="사용 방법" />
            <p className="text-krds-gray-70 mt-4 mb-4">
              Kits는 두 가지 방법으로 설치할 수 있습니다.
            </p>

            <Subsection level="h3">
              <Heading
                level="h3"
                id="cli-install"
                title="방법 1: CLI로 설치 (권장)"
              />
              <Code
                language="bash"
                className="mt-2"
              >{`npx hanui add kit board`}</Code>
              <p className="text-krds-gray-60 text-sm mt-2">
                CLI가 자동으로 필요한 파일과 의존성을 설치합니다.
              </p>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                id="manual-install"
                title="방법 2: 수동 설치"
              />
              <div className="space-y-4 mt-4">
                <div className="flex items-start gap-4 p-4 border border-krds-gray-20 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-krds-primary-5 text-krds-primary-base rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-krds-gray-90">
                      Kit 선택
                    </h4>
                    <p className="text-sm text-krds-gray-60">
                      필요한 Kit 페이지로 이동합니다.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 border border-krds-gray-20 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-krds-primary-5 text-krds-primary-base rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-krds-gray-90">
                      의존성 설치
                    </h4>
                    <p className="text-sm text-krds-gray-60">
                      Kit에 필요한 패키지를 설치합니다.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 border border-krds-gray-20 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-krds-primary-5 text-krds-primary-base rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-krds-gray-90">
                      코드 복사
                    </h4>
                    <p className="text-sm text-krds-gray-60">
                      필요한 파일들의 코드를 복사합니다.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 border border-krds-gray-20 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-krds-primary-5 text-krds-primary-base rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-krds-gray-90">
                      API 주소 변경
                    </h4>
                    <p className="text-sm text-krds-gray-60">
                      <Code>api/*.ts</Code> 파일의 <Code>API_URL</Code>을 실제
                      서버 주소로 변경합니다.
                    </p>
                  </div>
                </div>
              </div>
            </Subsection>
          </Section>

          <Section level="h2">
            <Heading level="h2" id="cli-commands" title="CLI 명령어" />
            <p className="text-krds-gray-70 mt-4 mb-4">
              Hanui CLI를 사용하면 Kit을 더 편리하게 설치할 수 있습니다.
            </p>
            <Code language="bash" className="mt-2">
              {`# 단일 Kit 설치
npx hanui add kit board

# 여러 Kit 동시 설치
npx hanui add kit auth table form

# 모든 Kit 설치
npx hanui add kit --all`}
            </Code>
            <List className="mt-4">
              <ListItem>자동으로 필요한 의존성 설치</ListItem>
              <ListItem>파일 구조 자동 생성</ListItem>
              <ListItem>기존 파일 충돌 시 확인 프롬프트</ListItem>
            </List>
          </Section>

          <Section level="h2">
            <Heading level="h2" id="accessibility" title="접근성" />
            <p className="text-krds-gray-70 mt-4 mb-4">
              모든 Kit은 다음 접근성 기준을 준수합니다.
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>기준</TableHead>
                  <TableHead>설명</TableHead>
                  <TableHead>적용</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Code>WCAG 2.1 AA</Code>
                  </TableCell>
                  <TableCell>웹 접근성 지침</TableCell>
                  <TableCell className="text-krds-gray-60">
                    전체 Kit 적용
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>키보드 네비게이션</Code>
                  </TableCell>
                  <TableCell>키보드만으로 모든 기능 사용 가능</TableCell>
                  <TableCell className="text-krds-gray-60">
                    전체 Kit 적용
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>스크린 리더</Code>
                  </TableCell>
                  <TableCell>적절한 ARIA 레이블 제공</TableCell>
                  <TableCell className="text-krds-gray-60">
                    전체 Kit 적용
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>색상 대비</Code>
                  </TableCell>
                  <TableCell>최소 4.5:1 대비율 보장</TableCell>
                  <TableCell className="text-krds-gray-60">
                    KRDS 색상 시스템
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>폼 레이블</Code>
                  </TableCell>
                  <TableCell>모든 입력 필드에 레이블 연결</TableCell>
                  <TableCell className="text-krds-gray-60">
                    Form, Auth Kit
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="install-guide" title="설치 가이드" />

            <Subsection level="h3">
              <Heading level="h3" id="prerequisites" title="사전 요구사항" />
              <List className="mt-2">
                <ListItem>
                  <Code>Node.js</Code> 18.0 이상
                </ListItem>
                <ListItem>
                  <Code>pnpm</Code>, <Code>npm</Code>, 또는 <Code>yarn</Code>
                </ListItem>
                <ListItem>
                  <Code>@hanui/react</Code> 설치 필요
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" id="dependencies" title="전체 의존성 설치" />
              <Code language="bash" className="mt-2">
                {`# npm
npm install zustand @tanstack/react-query axios react-hook-form zod recharts

# pnpm
pnpm add zustand @tanstack/react-query axios react-hook-form zod recharts

# yarn
yarn add zustand @tanstack/react-query axios react-hook-form zod recharts`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" id="kit-deps" title="Kit별 필수 의존성" />
              <Table className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Kit</TableHead>
                    <TableHead>필수 의존성</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {kits.map((kit) => (
                    <TableRow key={kit.name}>
                      <TableCell>
                        <Code>{kit.name}</Code>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {kit.dependencies.map((dep) => (
                            <Badge key={dep} variant="secondary">
                              {dep}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                id="react-query-setup"
                title="React Query 설정"
              />
              <Code language="tsx" className="mt-2">
                {`// app/providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" id="api-config" title="API 설정" />
              <Code language="typescript" className="mt-2">
                {`// lib/api/config.ts
import axios from 'axios';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 인터셉터 설정 (선택)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" id="file-structure" title="파일 구조" />
              <Code language="text" className="mt-2">
                {`src/
├── components/
│   └── kits/
│       ├── board/          # Board Kit
│       ├── auth/           # Auth Kit
│       ├── table/          # Table Kit
│       ├── form/           # Form Kit
│       └── dashboard/      # Dashboard Kit
├── lib/
│   └── api/
│       └── config.ts       # API 설정
└── stores/
    └── index.ts            # Zustand 스토어`}
              </Code>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>
    </>
  );
}
