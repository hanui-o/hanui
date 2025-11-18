import React from 'react';
import { Metadata } from 'next';
import { PageHeader } from '@/components/content/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@hanui/react';
import { CodeBlock } from '@/components/content/CodeBlock';
import { SideNavigation } from '@hanui/react';

export const metadata: Metadata = {
  title: 'Side Navigation - HANUI',
  description:
    'KRDS 기반의 사이드 네비게이션 컴포넌트입니다. 최대 4단계 깊이의 계층 구조를 지원하며, 확장 가능한 메뉴와 활성 상태 표시를 제공합니다.',
};

export default function SideNavigationPage() {
  return (
    <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-5xl">
      <PageHeader
        title="Side Navigation"
        description="KRDS 기반의 사이드 네비게이션 컴포넌트입니다. 최대 4단계 깊이의 계층 구조를 지원하며, 확장 가능한 메뉴와 활성 상태 표시를 제공합니다."
      />

      <Tabs defaultValue="overview" className="mt-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Installation */}
          <section>
            <h2 className="text-2xl font-bold mb-4">설치</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">CLI 사용 (권장)</h3>
                <CodeBlock
                  code="npx hanui add side-navigation"
                  language="bash"
                />
                <p className="text-sm text-gray-600 mt-2">
                  컴포넌트 파일과 SCSS 스타일이 자동으로 설치됩니다.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">수동 설치</h3>
                <CodeBlock
                  code={`// 1. 패키지 설치
pnpm add sass

// 2. 컴포넌트 파일 복사
// - components/hanui/side-navigation.tsx
// - components/hanui/side-navigation.module.scss`}
                  language="bash"
                />
              </div>
            </div>
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-bold mb-4">기본 사용법</h2>
            <div className="space-y-4">
              <CodeBlock
                code={`import { SideNavigation } from '@hanui/react';

export default function MyPage() {
  return (
    <SideNavigation
      title="주요 서비스"
      sections={[
        {
          label: '건강보험',
          children: [
            { label: '보험료 조회', href: '/insurance/fee', active: true },
            { label: '자격 득실 확인', href: '/insurance/status' }
          ]
        },
        {
          label: '국민연금',
          children: [
            { label: '연금 조회', href: '/pension/check' },
            { label: '납부 내역', href: '/pension/payment' }
          ]
        }
      ]}
    />
  );
}`}
                language="tsx"
              />

              <div className="border rounded-lg p-6 bg-gray-50">
                <h3 className="text-lg font-semibold mb-4">미리보기</h3>
                <div className="max-w-xs">
                  <SideNavigation
                    title="주요 서비스"
                    sections={[
                      {
                        label: '건강보험',
                        children: [
                          {
                            label: '보험료 조회',
                            href: '#fee',
                            active: true,
                          },
                          { label: '자격 득실 확인', href: '#status' },
                        ],
                      },
                      {
                        label: '국민연금',
                        children: [
                          { label: '연금 조회', href: '#check' },
                          { label: '납부 내역', href: '#payment' },
                        ],
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 3-Depth Navigation */}
          <section>
            <h2 className="text-2xl font-bold mb-4">3단계 네비게이션</h2>
            <p className="text-gray-600 mb-4">
              하위 링크에 children을 추가하여 3단계 구조를 만들 수 있습니다.
            </p>
            <CodeBlock
              code={`<SideNavigation
  title="행정 서비스"
  sections={[
    {
      label: '민원 서비스',
      children: [
        {
          label: '증명서 발급',
          href: '/civil/certificate',
          children: [
            { label: '주민등록등본', href: '/civil/certificate/resident' },
            { label: '가족관계증명서', href: '/civil/certificate/family' },
            { label: '병적증명서', href: '/civil/certificate/military' }
          ]
        },
        {
          label: '신청/접수',
          href: '/civil/application'
        }
      ]
    }
  ]}
/>`}
              language="tsx"
            />

            <div className="border rounded-lg p-6 bg-gray-50 mt-4">
              <h3 className="text-lg font-semibold mb-4">미리보기</h3>
              <div className="max-w-xs">
                <SideNavigation
                  title="행정 서비스"
                  sections={[
                    {
                      label: '민원 서비스',
                      children: [
                        {
                          label: '증명서 발급',
                          href: '#certificate',
                          children: [
                            {
                              label: '주민등록등본',
                              href: '#resident',
                              active: true,
                            },
                            {
                              label: '가족관계증명서',
                              href: '#family',
                            },
                            { label: '병적증명서', href: '#military' },
                          ],
                        },
                        {
                          label: '신청/접수',
                          href: '#application',
                        },
                      ],
                    },
                  ]}
                />
              </div>
            </div>
          </section>

          {/* Without Children */}
          <section>
            <h2 className="text-2xl font-bold mb-4">단순 링크 섹션</h2>
            <p className="text-gray-600 mb-4">
              children이 없는 섹션은 단순 링크로 표시됩니다.
            </p>
            <CodeBlock
              code={`<SideNavigation
  title="퀵 링크"
  sections={[
    { label: '홈으로', href: '/', active: true },
    { label: '공지사항', href: '/notice' },
    { label: '문의하기', href: '/contact' }
  ]}
/>`}
              language="tsx"
            />

            <div className="border rounded-lg p-6 bg-gray-50 mt-4">
              <h3 className="text-lg font-semibold mb-4">미리보기</h3>
              <div className="max-w-xs">
                <SideNavigation
                  title="퀵 링크"
                  sections={[
                    { label: '홈으로', href: '#home', active: true },
                    { label: '공지사항', href: '#notice' },
                    { label: '문의하기', href: '#contact' },
                  ]}
                />
              </div>
            </div>
          </section>

          {/* Technical Background */}
          <section>
            <h2 className="text-2xl font-bold mb-4">기술적 배경</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  CSS Module 방식 선택 이유
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>
                    <strong>복잡한 계층 구조:</strong> 4단계 깊이의 중첩된 메뉴
                    구조
                  </li>
                  <li>
                    <strong>Grid 애니메이션:</strong> grid-template-rows를
                    활용한 부드러운 확장/축소
                  </li>
                  <li>
                    <strong>토글 아이콘:</strong> ::after 가상 요소로 회전
                    애니메이션
                  </li>
                  <li>
                    <strong>KRDS 원본 유지:</strong> 공식 SCSS 스타일과 동일한
                    클래스명 (.lnb-*)
                  </li>
                  <li>
                    <strong>Self-contained:</strong> 외부 mixin 의존성 없이
                    독립적 동작
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">파일 구조</h3>
                <CodeBlock
                  code={`components/hanui/
├── side-navigation.tsx           # React 컴포넌트 (Props API)
└── side-navigation.module.scss   # SCSS 스타일 (self-contained)`}
                  language="plaintext"
                />
              </div>
            </div>
          </section>

          {/* Accessibility */}
          <section>
            <h2 className="text-2xl font-bold mb-4">접근성</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>ARIA Roles:</strong> role="menubar", role="menu",
                role="menuitem"
              </li>
              <li>
                <strong>ARIA States:</strong> aria-expanded, aria-controls,
                aria-haspopup
              </li>
              <li>
                <strong>현재 페이지 표시:</strong> aria-current="page" 속성
              </li>
              <li>
                <strong>키보드 네비게이션:</strong> Enter와 Space 키로 토글 가능
              </li>
              <li>
                <strong>포커스 관리:</strong> :focus 상태에 outline 표시
              </li>
              <li>
                <strong>고대비 모드:</strong> prefers-contrast: high 지원
              </li>
            </ul>
          </section>

          {/* KRDS Compliance */}
          <section>
            <h2 className="text-2xl font-bold mb-4">KRDS 준수사항</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                최대 4단계 깊이 지원 (1st: 제목, 2nd: 섹션, 3rd: 링크, 4th:
                서브링크)
              </li>
              <li>확장 가능한 섹션은 토글 버튼 사용</li>
              <li>활성 페이지는 배경색과 테두리로 강조</li>
              <li>KRDS 디자인 토큰 사용 (--krds-spacing-*, --krds-color-*)</li>
              <li>부드러운 애니메이션 (0.2s ~ 0.3s transition)</li>
              <li>다크 모드 지원 (prefers-color-scheme: dark)</li>
            </ul>
          </section>

          {/* Best Practices */}
          <section>
            <h2 className="text-2xl font-bold mb-4">권장사항</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>활성 상태 관리:</strong> active 속성으로 현재 페이지
                자동 표시
              </li>
              <li>
                <strong>자동 확장:</strong> 활성 페이지가 포함된 섹션은 자동으로
                확장됨
              </li>
              <li>
                <strong>href 속성:</strong> 모든 링크에 유효한 href 제공
              </li>
              <li>
                <strong>라벨 명확성:</strong> 사용자가 이해하기 쉬운 라벨 사용
              </li>
              <li>
                <strong>깊이 제한:</strong> 4단계를 넘지 않도록 구조 설계
              </li>
            </ul>
          </section>
        </TabsContent>

        <TabsContent value="api" className="space-y-8">
          {/* Props Table */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Props</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Prop
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Default
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      title *
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      string
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      -
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      네비게이션 제목 (1단계)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      sections *
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      SideNavSection[]
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      -
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      네비게이션 섹션 배열 (2단계)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      className
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      string
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      &apos;&apos;
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      추가 CSS 클래스
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SideNavSection */}
          <section>
            <h2 className="text-2xl font-bold mb-4">SideNavSection</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Prop
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Default
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      label *
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      string
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      -
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      섹션 라벨
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      href
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      string
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      -
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      섹션 URL (children이 없는 경우 필수)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      active
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      boolean
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      -
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      활성 상태
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      children
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      SideNavLink[]
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      -
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      하위 링크 배열 (3단계)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SideNavLink */}
          <section>
            <h2 className="text-2xl font-bold mb-4">SideNavLink</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Prop
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Default
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      label *
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      string
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      -
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      링크 라벨
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      href *
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      string
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      -
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      링크 URL
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      active
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      boolean
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      -
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      활성 상태
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      children
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      SideNavLink[]
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      -
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      하위 링크 배열 (4단계)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Type Definitions */}
          <section>
            <h2 className="text-2xl font-bold mb-4">타입 정의</h2>
            <CodeBlock
              code={`export interface SideNavigationProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * 네비게이션 제목 (1st depth)
   */
  title: string;

  /**
   * 네비게이션 섹션 (2nd depth)
   */
  sections: SideNavSection[];

  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

export interface SideNavSection {
  /**
   * 섹션 라벨
   */
  label: string;

  /**
   * 섹션 URL (optional, for toggle buttons)
   */
  href?: string;

  /**
   * 활성 상태
   */
  active?: boolean;

  /**
   * 하위 링크 또는 중첩 섹션
   */
  children?: SideNavLink[];
}

export interface SideNavLink {
  /**
   * 링크 라벨
   */
  label: string;

  /**
   * 링크 URL
   */
  href: string;

  /**
   * 활성 상태
   */
  active?: boolean;

  /**
   * 하위 링크 (3rd depth)
   */
  children?: SideNavLink[];
}`}
              language="typescript"
            />
          </section>

          {/* Examples */}
          <section>
            <h2 className="text-2xl font-bold mb-4">고급 사용 예제</h2>
            <CodeBlock
              code={`// 최대 4단계 깊이 활용
<SideNavigation
  title="복지 서비스"
  sections={[
    {
      label: '아동/청소년',
      children: [
        {
          label: '보육지원',
          href: '/welfare/child/daycare',
          children: [
            {
              label: '어린이집 지원',
              href: '/welfare/child/daycare/kindergarten',
              active: true
            },
            {
              label: '유치원 지원',
              href: '/welfare/child/daycare/preschool'
            }
          ]
        },
        {
          label: '교육지원',
          href: '/welfare/child/education'
        }
      ]
    },
    {
      label: '노인복지',
      children: [
        {
          label: '연금',
          href: '/welfare/senior/pension'
        },
        {
          label: '의료지원',
          href: '/welfare/senior/medical'
        }
      ]
    }
  ]}
/>`}
              language="tsx"
            />
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
