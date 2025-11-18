'use client';

import { Body } from '@hanui/react';
import { CodeBlock } from '@/components/content/CodeBlock';
import { PageSection } from '@/components/content/PageSection';
import { SectionHeading } from '@/components/hanui/section-header';
import { ComponentPreview } from '@/components/content/ComponentPreview';

export default function BasicLayoutPage() {
  const layoutCode = `import {
  Header,
  Footer,
  SkipLink,
  MainMenu,
  Breadcrumb,
  Container,
  Body,
} from '@hanui/react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const skipLinks = [
    { text: '본문 바로가기', href: '#main-content' },
    { text: '메뉴 바로가기', href: '#main-menu' },
  ];

  const mainMenuItems = [
    {
      label: '기관소개',
      href: '/about',
      children: [
        { label: '인사말', href: '/about/greeting' },
        { label: '조직도', href: '/about/organization' },
        { label: '오시는 길', href: '/about/location' },
      ],
    },
    {
      label: '정책정보',
      href: '/policy',
      children: [
        { label: '주요정책', href: '/policy/main' },
        { label: '법령정보', href: '/policy/law' },
        { label: '예산정보', href: '/policy/budget' },
      ],
    },
    {
      label: '민원서비스',
      href: '/service',
      children: [
        { label: '민원신청', href: '/service/apply' },
        { label: '민원조회', href: '/service/check' },
        { label: '자주묻는질문', href: '/service/faq' },
      ],
    },
    {
      label: '알림마당',
      href: '/news',
      children: [
        { label: '공지사항', href: '/news/notice' },
        { label: '보도자료', href: '/news/press' },
        { label: '행사안내', href: '/news/event' },
      ],
    },
  ];

  const breadcrumbItems = [
    { label: '홈', href: '/' },
    { label: '알림마당', href: '/news' },
    { label: '공지사항', href: '/news/notice' },
  ];

  const headerNavLinks = [
    { label: '기관소개', href: '/about' },
    { label: '정책정보', href: '/policy' },
    { label: '민원서비스', href: '/service' },
    { label: '알림마당', href: '/news' },
  ];

  const headerUtilityLinks = [
    { label: '로그인', href: '/login' },
    { label: '회원가입', href: '/signup' },
    { label: '사이트맵', href: '/sitemap' },
  ];

  const footerQuickLinks = [
    { label: '개인정보처리방침', href: '/privacy' },
    { label: '이용약관', href: '/terms' },
    { label: '저작권정책', href: '/copyright' },
    { label: '이메일무단수집거부', href: '/email-protection' },
  ];

  const footerInfoItems = [
    { label: '주소', value: '서울특별시 종로구 세종대로 209' },
    { label: '전화', value: '02-1234-5678' },
    { label: '팩스', value: '02-1234-5679' },
    { label: '이메일', value: 'contact@example.go.kr' },
  ];

  return (
    <>
      <SkipLink items={skipLinks} />

      <Header
        logo={{
          text: '정부기관명',
          href: '/',
          imageUrl: '/logo.svg',
        }}
        navLinks={headerNavLinks}
        utilityLinks={headerUtilityLinks}
        searchEnabled
        onSearch={(query) => {
          console.log('Search:', query);
        }}
      />

      <MainMenu id="main-menu" items={mainMenuItems} />

      <main id="main-content">
        <Container>
          <Breadcrumb items={breadcrumbItems} className="my-4" />

          {/* Page Title */}
          <div className="py-8 border-b border-krds-gray-20">
            <h1 className="text-3xl font-bold text-krds-gray-90">
              페이지 제목
            </h1>
            <Body className="mt-2 text-krds-gray-70">
              페이지 설명이 여기에 들어갑니다.
            </Body>
          </div>

          {/* Main Content */}
          <div className="py-8">
            {children}
          </div>
        </Container>
      </main>

      <Footer
        logo={{
          text: '정부기관명',
          href: '/',
        }}
        quickLinks={footerQuickLinks}
        infoItems={footerInfoItems}
        copyright="Copyright © 2024 정부기관명. All rights reserved."
        socialLinks={[
          { type: 'facebook', href: 'https://facebook.com/example' },
          { type: 'twitter', href: 'https://twitter.com/example' },
          { type: 'youtube', href: 'https://youtube.com/example' },
        ]}
      />
    </>
  );
}`;

  const pageCode = `export default function NoticePage() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-semibold text-krds-gray-90 mb-4">
        공지사항 제목
      </h2>

      <div className="flex gap-4 text-krds-gray-70 border-b border-krds-gray-20 pb-4 mb-6">
        <span>작성자: 관리자</span>
        <span>작성일: 2024.01.15</span>
        <span>조회수: 123</span>
      </div>

      <div className="leading-relaxed text-krds-gray-90">
        <p>
          공지사항 내용이 여기에 들어갑니다. HANUI의 Typography 컴포넌트를
          사용하여 가독성 있는 콘텐츠를 작성할 수 있습니다.
        </p>
        <p className="mt-4">
          KRDS 가이드라인을 준수하여 접근성 높은 콘텐츠를 제공합니다.
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-krds-gray-20 flex gap-4">
        <button className="px-4 py-2 bg-krds-primary-base text-white rounded-md hover:bg-krds-primary-darker">
          목록
        </button>
        <button className="px-4 py-2 border border-krds-gray-30 text-krds-gray-90 rounded-md hover:bg-krds-gray-5">
          이전글
        </button>
        <button className="px-4 py-2 border border-krds-gray-30 text-krds-gray-90 rounded-md hover:bg-krds-gray-5">
          다음글
        </button>
      </div>
    </div>
  );
}`;

  return (
    <>
      <SectionHeading
        level="h1"
        title="Basic Layout"
        description="정부 웹사이트의 기본 레이아웃 템플릿입니다. Header, Footer, MainMenu, Breadcrumb, SkipLink를 포함합니다."
      />

      <PageSection>
        <SectionHeading level="h2" id="preview" title="미리보기">
          <Body className="leading-relaxed">
            이 템플릿은 KRDS 공식 샘플 페이지를 기반으로 제작되었으며, 실제 정부
            웹사이트에서 사용되는 표준 레이아웃 구조를 제공합니다.
          </Body>
        </SectionHeading>

        <div className="border border-krds-gray-20 rounded-lg p-4 bg-krds-gray-5 my-6">
          <Body className="text-krds-gray-70">
            이 템플릿은 다음 컴포넌트를 사용합니다:
          </Body>
          <ul className="list-disc pl-6 mt-2 text-krds-gray-90">
            <li>SkipLink - 접근성을 위한 건너뛰기 링크</li>
            <li>Header - 상단 헤더 (로고, 네비게이션, 검색)</li>
            <li>MainMenu - 주요 메뉴 (GNB)</li>
            <li>Breadcrumb - 경로 표시</li>
            <li>Footer - 하단 푸터 (정보, 링크, 저작권)</li>
            <li>Container - 콘텐츠 컨테이너</li>
          </ul>
        </div>

        <SectionHeading level="h2" id="installation" title="설치">
          <Body>필요한 컴포넌트를 한 번에 설치합니다:</Body>
        </SectionHeading>
        <CodeBlock code="npx hanui add layout" language="bash" />
        <Body className="text-krds-gray-70 mt-2">
          이 명령은 Header, Footer, SkipLink, MainMenu, Breadcrumb, Container를
          자동으로 설치합니다.
        </Body>

        <SectionHeading
          level="h2"
          id="layout-component"
          title="레이아웃 컴포넌트"
        >
          <Body>
            다음 코드를 <code>app/layout.tsx</code> 또는{' '}
            <code>components/Layout.tsx</code>에 복사하세요:
          </Body>
        </SectionHeading>
        <CodeBlock code={layoutCode} language="tsx" />

        <SectionHeading level="h2" id="page-component" title="페이지 컴포넌트">
          <Body>
            레이아웃 안에서 사용할 페이지 컴포넌트 예제입니다. 실제 콘텐츠로
            교체하여 사용하세요:
          </Body>
        </SectionHeading>
        <CodeBlock code={pageCode} language="tsx" />

        <SectionHeading level="h2" id="structure" title="구조 설명" />

        <div className="space-y-4 mt-4">
          <div>
            <h4 className="font-semibold text-krds-gray-90 mb-2">
              1. SkipLink (접근성)
            </h4>
            <Body className="text-sm">
              시각 장애인 사용자를 위한 건너뛰기 링크입니다. 키보드 포커스
              시에만 표시됩니다.
            </Body>
          </div>

          <div>
            <h4 className="font-semibold text-krds-gray-90 mb-2">
              2. Header (상단 영역)
            </h4>
            <Body className="text-sm">
              로고, 주요 네비게이션, 유틸리티 링크(로그인, 회원가입 등), 검색
              기능을 포함합니다.
            </Body>
          </div>

          <div>
            <h4 className="font-semibold text-krds-gray-90 mb-2">
              3. MainMenu (주요 메뉴)
            </h4>
            <Body className="text-sm">
              2단계 메뉴 구조를 지원하는 전체 너비 메뉴입니다. 마우스 호버와
              키보드 네비게이션을 모두 지원합니다.
            </Body>
          </div>

          <div>
            <h4 className="font-semibold text-krds-gray-90 mb-2">
              4. Main Content (본문)
            </h4>
            <Body className="text-sm">
              Breadcrumb으로 시작하며, 페이지 제목과 설명, 실제 콘텐츠 영역으로
              구성됩니다. Container 컴포넌트로 적절한 여백을 유지합니다.
            </Body>
          </div>

          <div>
            <h4 className="font-semibold text-krds-gray-90 mb-2">
              5. Footer (하단 영역)
            </h4>
            <Body className="text-sm">
              빠른 링크(개인정보처리방침 등), 기관 정보(주소, 전화번호 등), 소셜
              미디어 링크, 저작권 정보를 포함합니다.
            </Body>
          </div>
        </div>

        <SectionHeading level="h2" id="customization" title="커스터마이징" />
        <Body>템플릿을 프로젝트에 맞게 수정하는 방법:</Body>

        <div className="space-y-4 mt-4">
          <div>
            <h4 className="font-semibold text-krds-gray-90 mb-2">
              메뉴 구조 변경
            </h4>
            <Body className="text-sm">
              <code>mainMenuItems</code> 배열을 수정하여 메뉴 항목을 추가하거나
              제거할 수 있습니다. 각 항목은 <code>label</code>,{' '}
              <code>href</code>, <code>children</code>(서브메뉴) 속성을
              가집니다.
            </Body>
          </div>

          <div>
            <h4 className="font-semibold text-krds-gray-90 mb-2">
              로고 및 기관명 변경
            </h4>
            <Body className="text-sm">
              Header와 Footer의 <code>logo</code> 속성에서 <code>text</code>와{' '}
              <code>imageUrl</code>을 수정하여 기관명과 로고를 변경할 수
              있습니다.
            </Body>
          </div>

          <div>
            <h4 className="font-semibold text-krds-gray-90 mb-2">
              푸터 정보 수정
            </h4>
            <Body className="text-sm">
              <code>footerInfoItems</code>에서 주소, 전화번호 등의 기관 정보를
              수정하고, <code>footerQuickLinks</code>에서 하단 링크를 관리할 수
              있습니다.
            </Body>
          </div>

          <div>
            <h4 className="font-semibold text-krds-gray-90 mb-2">
              검색 기능 구현
            </h4>
            <Body className="text-sm">
              Header의 <code>onSearch</code> 콜백에서 검색 로직을 구현하세요.
              예제에서는 콘솔 로그만 출력하지만, 실제로는 검색 API 호출이나 검색
              페이지로의 이동을 구현해야 합니다.
            </Body>
          </div>
        </div>

        <SectionHeading level="h2" id="accessibility" title="접근성 고려사항" />
        <Body>이 템플릿은 KRDS 및 WCAG 2.1 AA 레벨을 준수합니다:</Body>
        <ul className="list-disc pl-6 space-y-2 text-base text-krds-gray-90 mt-2">
          <li>
            <strong>SkipLink:</strong> 키보드 사용자가 반복되는 네비게이션을
            건너뛸 수 있습니다
          </li>
          <li>
            <strong>Semantic HTML:</strong> header, nav, main, footer 등
            의미있는 HTML 요소 사용
          </li>
          <li>
            <strong>Keyboard Navigation:</strong> Tab, Enter, Escape 키를 사용한
            전체 네비게이션 가능
          </li>
          <li>
            <strong>ARIA Labels:</strong> 스크린 리더를 위한 적절한 ARIA 속성
            사용
          </li>
          <li>
            <strong>Focus Management:</strong> 명확한 포커스 표시와 논리적인
            포커스 순서
          </li>
        </ul>

        <SectionHeading level="h2" id="responsive" title="반응형 디자인" />
        <Body>모든 컴포넌트는 반응형으로 설계되었습니다:</Body>
        <ul className="list-disc pl-6 space-y-2 text-base text-krds-gray-90 mt-2">
          <li>
            <strong>Desktop (1024px+):</strong> 전체 메뉴와 네비게이션 표시
          </li>
          <li>
            <strong>Tablet (768px-1023px):</strong> 간소화된 네비게이션, 햄버거
            메뉴
          </li>
          <li>
            <strong>Mobile (&lt;768px):</strong> 모바일 최적화 레이아웃, 터치
            친화적인 UI
          </li>
        </ul>

        <SectionHeading level="h2" id="next-steps" title="다음 단계" />
        <Body>기본 레이아웃을 설치했다면, 다음 작업을 진행하세요:</Body>
        <ol className="list-decimal pl-6 space-y-2 text-base text-krds-gray-90 mt-2">
          <li>메뉴 구조를 프로젝트에 맞게 수정</li>
          <li>로고와 기관명 변경</li>
          <li>푸터 정보 업데이트</li>
          <li>검색 기능 구현</li>
          <li>페이지별 콘텐츠 작성</li>
          <li>
            필요에 따라 <code>SideNavigation</code>,{' '}
            <code>InPageNavigation</code> 등 추가 컴포넌트 설치
          </li>
        </ol>
      </PageSection>
    </>
  );
}
