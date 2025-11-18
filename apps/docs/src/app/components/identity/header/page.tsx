import { Body } from '@hanui/react';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';
import { CodeBlock } from '@/components/content/CodeBlock';
import { GuidelineSection } from '@/components/content/GuidelineSection';
import { SectionHeading } from '@/components/hanui/section-header';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/hanui/tabs';

export default function HeaderPage() {
  return (
    <>
      <PageHeader
        title="Header"
        description="정부 서비스의 일관된 브랜딩과 네비게이션을 제공하는 헤더 레이아웃 컴포넌트입니다. KRDS 표준을 준수하며, 로고, 유틸리티 링크, 검색, 메인 메뉴, 모바일 메뉴를 포함합니다."
      />

      <PageSection>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {/* Installation */}
            <SectionHeading level="h2" id="installation" title="설치" />

            <SectionHeading
              level="h3"
              id="cli-install"
              title="CLI를 통한 설치"
            />
            <CodeBlock
              code={`npx @hanui/cli add header`}
              language="bash"
              showLineNumbers={false}
            />
            <Body size="sm" className="text-krds-gray-60 mt-2">
              설치 시 자동으로 <code>sass</code> 패키지가 devDependencies에
              추가됩니다.
            </Body>

            <SectionHeading level="h3" id="manual-install" title="수동 설치">
              <Body size="md" className="text-krds-gray-70 mb-4">
                CLI 없이 수동으로 설치하는 경우:
              </Body>
            </SectionHeading>

            <ol className="list-decimal pl-6 space-y-2 text-krds-gray-70">
              <li>
                <strong>sass 패키지 설치:</strong>
                <CodeBlock
                  code={`npm install -D sass
# or
yarn add -D sass
# or
pnpm add -D sass`}
                  language="bash"
                  showLineNumbers={false}
                />
              </li>
              <li>
                <strong>파일 복사:</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>
                    <code>components/hanui/header.tsx</code>
                  </li>
                  <li>
                    <code>components/hanui/header.module.scss</code>
                  </li>
                </ul>
              </li>
            </ol>

            {/* Usage */}
            <SectionHeading level="h2" id="basic-usage" title="기본 사용법">
              <Body size="md" className="text-krds-gray-70">
                Header는 Props 기반 API를 사용하여 간편하게 구성할 수 있습니다.
                네비게이션 링크, 검색, 모바일 메뉴 등을 선택적으로 활성화할 수
                있습니다.
              </Body>
            </SectionHeading>

            <SectionHeading level="h3" id="basic-example" title="기본 헤더" />
            <CodeBlock
              code={`import { Header } from '@/components/hanui/header';

export default function Example() {
  return (
    <Header
      serviceName="국민건강보험공단"
      logo="/logo.svg"
      logoAlt="국민건강보험공단 로고"
      utilityLinks={[
        { label: '로그인', href: '/login' },
        { label: '회원가입', href: '/signup' },
        { label: '마이페이지', href: '/mypage' }
      ]}
      navLinks={[
        { label: '소개', href: '/about' },
        { label: '민원서비스', href: '/services' },
        { label: '정보공개', href: '/info' },
        { label: '알림·소식', href: '/news' }
      ]}
    />
  );
}`}
              language="tsx"
            />

            {/* Search */}
            <SectionHeading level="h2" id="with-search" title="검색 기능 추가">
              <Body size="md" className="text-krds-gray-70">
                <code>showSearch</code> prop을 사용하여 검색 기능을 활성화할 수
                있습니다.
              </Body>
            </SectionHeading>

            <CodeBlock
              code={`import { Header } from '@/components/hanui/header';

export default function Example() {
  const handleSearch = (query: string) => {
    console.log('검색어:', query);
    // 검색 로직 구현
  };

  return (
    <Header
      serviceName="정부24"
      logo="/logo.svg"
      navLinks={[
        { label: '민원서비스', href: '/services' },
        { label: '생활정보', href: '/info' }
      ]}
      showSearch
      searchPlaceholder="서비스, 민원 검색"
      onSearch={handleSearch}
    />
  );
}`}
              language="tsx"
            />

            {/* Multi-level Menu */}
            <SectionHeading
              level="h2"
              id="multi-level-menu"
              title="다단계 메뉴 (Submenu)"
            >
              <Body size="md" className="text-krds-gray-70">
                <code>children</code> 속성을 사용하여 2단계 메뉴를 구성할 수
                있습니다. 마우스 호버 시 서브메뉴가 표시됩니다.
              </Body>
            </SectionHeading>

            <CodeBlock
              code={`import { Header } from '@/components/hanui/header';

export default function Example() {
  return (
    <Header
      serviceName="행정안전부"
      logo="/logo.svg"
      navLinks={[
        {
          label: '민원·정보',
          href: '/services',
          children: [
            { label: '민원서비스', href: '/services/civil' },
            { label: '정보공개', href: '/services/info' },
            { label: '열린정부', href: '/services/open' }
          ]
        },
        {
          label: '정책·사업',
          href: '/policy',
          active: true, // 현재 페이지
          children: [
            { label: '주요정책', href: '/policy/main' },
            { label: '주요사업', href: '/policy/projects', active: true },
            { label: '법령·지침', href: '/policy/laws' }
          ]
        },
        {
          label: '알림·소식',
          href: '/news',
          children: [
            { label: '공지사항', href: '/news/notice' },
            { label: '보도자료', href: '/news/press' },
            { label: '행사·일정', href: '/news/events' }
          ]
        }
      ]}
    />
  );
}`}
              language="tsx"
            />

            {/* Full Features */}
            <SectionHeading
              level="h2"
              id="full-features"
              title="전체 기능 활용"
            >
              <Body size="md" className="text-krds-gray-70">
                유틸리티 링크, 검색, 다단계 메뉴를 모두 활용한 종합 예제입니다.
              </Body>
            </SectionHeading>

            <CodeBlock
              code={`import { Header } from '@/components/hanui/header';

export default function Example() {
  return (
    <Header
      serviceName="국민건강보험공단"
      logo="/logo.svg"
      logoAlt="국민건강보험공단"
      homeHref="/"

      // Utility Navigation
      utilityLinks={[
        { label: '로그인', href: '/login' },
        { label: '회원가입', href: '/signup' },
        { label: '마이페이지', href: '/mypage' },
        { label: 'English', href: '/en' }
      ]}

      // Main Navigation
      navLinks={[
        { label: '공단소개', href: '/about' },
        {
          label: '민원·업무',
          href: '/services',
          children: [
            { label: '건강검진', href: '/services/checkup' },
            { label: '보험료 조회·납부', href: '/services/premium' },
            { label: '요양급여', href: '/services/medical' }
          ]
        },
        {
          label: '건강정보',
          href: '/health',
          children: [
            { label: '건강iN', href: '/health/in' },
            { label: '건강검진정보', href: '/health/checkup' },
            { label: '질병정보', href: '/health/disease' }
          ]
        },
        { label: '알림·소식', href: '/news' },
        { label: '참여·소통', href: '/communication' }
      ]}

      // Search
      showSearch
      searchPlaceholder="검색어를 입력하세요"
      onSearch={(query) => console.log('검색:', query)}

      // Sticky Header
      sticky
    />
  );
}`}
              language="tsx"
            />

            {/* Technical Background */}
            <SectionHeading level="h2" id="technical" title="기술 배경" />

            <SectionHeading
              level="h3"
              id="why-css-module"
              title="왜 CSS Module (SCSS)을 사용했나요?"
            />

            {/* 1. KRDS 공식 코드의 복잡성 */}
            <div className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950 p-4 my-4 rounded-r">
              <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
                1. KRDS 공식 코드의 복잡성
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-blue-800 dark:text-blue-200">
                <li>
                  10개 이상의 커스텀 SCSS mixin 사용 (flex-layout,
                  size-large-more, hide-text 등)
                </li>
                <li>
                  복잡한 반응형 레이아웃 (Desktop/Tablet/Mobile 각각 다른 구조)
                </li>
                <li>
                  다단계 메뉴, 모바일 메뉴, 검색, 스크롤 동작 등 다양한 인터랙션
                </li>
                <li>고대비 모드 (High Contrast Mode) 및 다크 모드 지원</li>
              </ul>
            </div>

            {/* 2. Tailwind 변환의 시간 비용 */}
            <div className="border-l-4 border-green-500 bg-green-50 dark:bg-green-950 p-4 my-4 rounded-r">
              <h4 className="font-bold text-green-900 dark:text-green-100 mb-2">
                2. Tailwind 변환의 시간 비용
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-green-800 dark:text-green-200">
                <li>복잡한 SCSS 구조를 Tailwind로 변환 시 3-4일 소요 예상</li>
                <li>hover, focus, active 등 다양한 상태별 스타일 관리</li>
                <li>애니메이션 및 트랜지션 효과 재현</li>
                <li>KRDS 공식 디자인 100% 재현 보장 어려움</li>
              </ul>
            </div>

            {/* 3. Self-Contained CSS Module 방식 채택 */}
            <div className="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950 p-4 my-4 rounded-r">
              <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-2">
                3. Self-Contained CSS Module 방식 채택
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-purple-800 dark:text-purple-200">
                <li>
                  <strong>Mixin 제거:</strong> KRDS의 모든 SCSS mixin을 실제
                  CSS로 인라인 변환
                </li>
                <li>
                  <strong>CSS 변수 활용:</strong> <code>globals.css</code>의
                  KRDS 디자인 토큰 (color, spacing) 사용
                </li>
                <li>
                  <strong>단일 파일 설치:</strong> <code>header.tsx</code> +{' '}
                  <code>header.module.scss</code> 2개 파일만으로 완결
                </li>
                <li>
                  <strong>외부 의존성 제로:</strong> sass 패키지 외에 추가 mixin
                  파일 불필요
                </li>
              </ul>
            </div>

            {/* v2.0 Roadmap */}
            <SectionHeading
              level="h3"
              id="roadmap"
              title="v2.0 로드맵: Tailwind 마이그레이션"
            >
              <Body size="md" className="text-krds-gray-70 mb-4">
                향후 v2.0에서는 Tailwind로 완전히 변환된 버전을 제공할
                예정입니다. 사용자는 버전 선택을 통해 CSS Module 또는 Tailwind
                버전을 선택할 수 있습니다.
              </Body>
            </SectionHeading>

            <CodeBlock
              code={`# v1 (CSS Module - 기본)
npx @hanui/cli add header

# v2 (Tailwind - 선택)
npx @hanui/cli add header@tailwind`}
              language="bash"
              showLineNumbers={false}
            />

            {/* File Structure */}
            <SectionHeading level="h2" id="file-structure" title="파일 구조" />

            <CodeBlock
              code={`components/hanui/
├── header.tsx              # Header 컴포넌트 (Props-based API)
└── header.module.scss      # Self-contained SCSS styles`}
              language="plaintext"
              showLineNumbers={false}
            />

            {/* Accessibility */}
            <SectionHeading level="h2" id="accessibility" title="접근성">
              <Body size="md" className="text-krds-gray-70">
                Header 컴포넌트는 WCAG 2.1 및 KWCAG 2.2 지침을 준수합니다:
              </Body>
            </SectionHeading>

            <ul className="list-disc pl-6 space-y-2 text-krds-gray-70">
              <li>
                <strong>시맨틱 HTML:</strong> <code>&lt;header&gt;</code>,{' '}
                <code>&lt;nav&gt;</code> 태그 사용
              </li>
              <li>
                <strong>ARIA 속성:</strong> <code>aria-label</code>,{' '}
                <code>aria-expanded</code> 제공
              </li>
              <li>
                <strong>키보드 네비게이션:</strong> Tab, Enter 키로 모든 메뉴
                접근 가능
              </li>
              <li>
                <strong>포커스 관리:</strong> 명확한 포커스 인디케이터 제공
                (outline)
              </li>
              <li>
                <strong>스크린 리더 지원:</strong> <code>.sr-only</code>{' '}
                클래스로 숨김 텍스트 제공
              </li>
              <li>
                <strong>고대비 모드:</strong> 다크 모드 및 고대비 모드 스타일
                지원
              </li>
            </ul>

            {/* KRDS Compliance */}
            <div>
              <SectionHeading
                level="h3"
                id="krds-compliance"
                title="KRDS 준수사항"
              />

              <ul className="list-disc pl-6 space-y-2 text-krds-gray-70">
                <li>
                  <strong>필수 ID:</strong> Header 요소에{' '}
                  <code>id="krds-header"</code> 자동 적용
                </li>
                <li>
                  <strong>레이아웃 구조:</strong> Utility Nav + Branding + Main
                  Nav + Mobile Menu
                </li>
                <li>
                  <strong>반응형 디자인:</strong>
                  <ul className="list-circle pl-6 mt-1">
                    <li>Desktop (1024px+): 전체 메뉴 표시</li>
                    <li>Tablet (768px-1023px): 검색 표시, 햄버거 메뉴</li>
                    <li>Mobile (~767px): 햄버거 메뉴만 표시</li>
                  </ul>
                </li>
                <li>
                  <strong>색상 시스템:</strong> KRDS 디자인 토큰 사용 (CSS 변수)
                </li>
                <li>
                  <strong>타이포그래피:</strong> KRDS 폰트 크기 및 행간 준수
                </li>
              </ul>
            </div>

            {/* Mobile Menu */}
            <SectionHeading level="h2" id="mobile-menu" title="모바일 메뉴">
              <Body size="md" className="text-krds-gray-70">
                1024px 미만 화면에서는 자동으로 햄버거 메뉴로 전환됩니다:
              </Body>
            </SectionHeading>

            <ul className="list-disc pl-6 space-y-2 text-krds-gray-70">
              <li>햄버거 아이콘 클릭 시 우측에서 슬라이드 메뉴 표시</li>
              <li>백드롭 오버레이로 포커스 유도</li>
              <li>메뉴 열림 시 body 스크롤 방지</li>
              <li>닫기 버튼 또는 오버레이 클릭으로 닫기</li>
              <li>Utility 링크, Main 메뉴, 검색 모두 포함</li>
            </ul>

            {/* Related Components */}
            <SectionHeading level="h2" id="related" title="관련 컴포넌트" />

            <div className="grid gap-4 md:grid-cols-2">
              <a
                href="/components/identity/footer"
                className="block p-4 border border-krds-gray-20 rounded-lg hover:border-krds-primary-60 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-krds-gray-90 mb-1">Footer</h3>
                <p className="text-sm text-krds-gray-60">
                  정부 서비스 푸터 레이아웃
                </p>
              </a>

              <a
                href="/components/identity/masthead"
                className="block p-4 border border-krds-gray-20 rounded-lg hover:border-krds-primary-60 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-krds-gray-90 mb-1">
                  Masthead
                </h3>
                <p className="text-sm text-krds-gray-60">정부 공식 배너</p>
              </a>
            </div>
          </TabsContent>

          <TabsContent value="api">
            {/* Props */}
            <SectionHeading level="h2" id="props" title="Props" />

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-krds-gray-20">
                    <th className="text-left py-3 px-4 font-semibold text-krds-gray-90">
                      Prop
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-krds-gray-90">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-krds-gray-90">
                      Default
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-krds-gray-90">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-krds-gray-10">
                  <tr>
                    <td className="py-3 px-4 font-mono text-sm">serviceName</td>
                    <td className="py-3 px-4 font-mono text-sm">string</td>
                    <td className="py-3 px-4 text-sm">-</td>
                    <td className="py-3 px-4 text-sm">서비스명 (필수)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-sm">logo</td>
                    <td className="py-3 px-4 font-mono text-sm">
                      string | ReactElement
                    </td>
                    <td className="py-3 px-4 text-sm">-</td>
                    <td className="py-3 px-4 text-sm">
                      로고 이미지 경로 또는 컴포넌트
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-sm">logoAlt</td>
                    <td className="py-3 px-4 font-mono text-sm">string</td>
                    <td className="py-3 px-4 text-sm">-</td>
                    <td className="py-3 px-4 text-sm">
                      로고 대체 텍스트 (logo가 string일 때 필수)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-sm">homeHref</td>
                    <td className="py-3 px-4 font-mono text-sm">string</td>
                    <td className="py-3 px-4 text-sm">"/"</td>
                    <td className="py-3 px-4 text-sm">홈 링크 URL</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-sm">
                      utilityLinks
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">
                      HeaderUtilityLink[]
                    </td>
                    <td className="py-3 px-4 text-sm">[]</td>
                    <td className="py-3 px-4 text-sm">
                      유틸리티 링크 배열 (로그인, 회원가입 등)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-sm">navLinks</td>
                    <td className="py-3 px-4 font-mono text-sm">
                      HeaderNavLink[]
                    </td>
                    <td className="py-3 px-4 text-sm">[]</td>
                    <td className="py-3 px-4 text-sm">
                      메인 네비게이션 링크 배열
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-sm">showSearch</td>
                    <td className="py-3 px-4 font-mono text-sm">boolean</td>
                    <td className="py-3 px-4 text-sm">false</td>
                    <td className="py-3 px-4 text-sm">검색 기능 표시 여부</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-sm">
                      searchPlaceholder
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">string</td>
                    <td className="py-3 px-4 text-sm">"검색어를 입력하세요"</td>
                    <td className="py-3 px-4 text-sm">
                      검색 입력창 placeholder
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-sm">onSearch</td>
                    <td className="py-3 px-4 font-mono text-sm">
                      (query: string) ={'>'} void
                    </td>
                    <td className="py-3 px-4 text-sm">-</td>
                    <td className="py-3 px-4 text-sm">검색 제출 핸들러</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-sm">sticky</td>
                    <td className="py-3 px-4 font-mono text-sm">boolean</td>
                    <td className="py-3 px-4 text-sm">true</td>
                    <td className="py-3 px-4 text-sm">
                      스크롤 시 상단 고정 여부
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-sm">className</td>
                    <td className="py-3 px-4 font-mono text-sm">string</td>
                    <td className="py-3 px-4 text-sm">-</td>
                    <td className="py-3 px-4 text-sm">추가 CSS 클래스</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Types */}
            <SectionHeading level="h2" id="types" title="Types" />

            <SectionHeading
              level="h3"
              id="header-utility-link"
              title="HeaderUtilityLink"
            />
            <CodeBlock
              code={`interface HeaderUtilityLink {
  label: string;        // 링크 텍스트
  href: string;         // 링크 URL
  icon?: ReactElement;  // 선택: 아이콘
}`}
              language="typescript"
            />

            <SectionHeading
              level="h3"
              id="header-nav-link"
              title="HeaderNavLink"
            />
            <CodeBlock
              code={`interface HeaderNavLink {
  label: string;             // 메뉴명
  href: string;              // 링크 URL
  active?: boolean;          // 선택: 현재 페이지 여부
  children?: HeaderNavLink[]; // 선택: 서브메뉴
}`}
              language="typescript"
            />
          </TabsContent>
        </Tabs>
      </PageSection>
    </>
  );
}
