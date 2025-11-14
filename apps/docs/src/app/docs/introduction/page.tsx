import { Stack, Heading, Body } from '@hanui/react';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

export default function IntroductionPage() {
  return (
    <>
      <PageHeader
        title="Introduction"
        description="HANUI는 KRDS(Korea Republic Design System)를 기반으로 한 React 컴포넌트 라이브러리입니다."
      />

      {/* What is HANUI */}
      <PageSection>
        <Heading level="h2" id="what-is-hanui">
          HANUI란?
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Body className="leading-relaxed">
            HANUI는 한국 공공기관 웹사이트 개발을 위한 UI 컴포넌트
            라이브러리입니다. KRDS 디자인 시스템을 준수하며, 웹 접근성(WCAG 2.1
            AA)을 완벽히 지원합니다.
          </Body>

          <Stack spacing="heading-tight">
            <Heading level="h3">핵심 가치</Heading>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <Body>
                  <strong>KRDS 준수:</strong> 한국 정부 디자인 시스템 가이드라인
                  완벽 준수
                </Body>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <Body>
                  <strong>웹 접근성:</strong> WCAG 2.1 AA 수준 웹 접근성 기준
                  충족
                </Body>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <Body>
                  <strong>개발자 경험:</strong> TypeScript 완벽 지원 및 직관적인
                  API
                </Body>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <Body>
                  <strong>커스터마이징:</strong> Tailwind CSS 기반으로 쉬운 확장
                  가능
                </Body>
              </li>
            </ul>
          </Stack>
        </Stack>
      </PageSection>

      {/* Key Features */}
      <PageSection>
        <Heading level="h2" id="key-features">
          주요 기능
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Stack spacing="heading-tight">
            <Heading level="h3">KRDS 디자인 시스템</Heading>
            <Body className="leading-relaxed">
              한국 공공기관 표준 디자인 가이드라인을 준수하는 컴포넌트를
              제공합니다. 정부 및 공공기관 웹사이트 개발 시 필수적인 디자인
              표준을 손쉽게 적용할 수 있습니다.
            </Body>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">웹 접근성</Heading>
            <Body className="leading-relaxed">
              스크린 리더, 키보드 네비게이션, ARIA 속성 등 웹 접근성을 완벽하게
              지원합니다. 모든 사용자가 차별 없이 웹사이트를 이용할 수 있도록
              설계되었습니다.
            </Body>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">React + TypeScript</Heading>
            <Body className="leading-relaxed">
              타입 안정성과 자동완성 기능으로 개발 생산성을 높입니다. 컴포넌트의
              모든 Props와 이벤트 핸들러에 대한 완벽한 타입 정의를 제공합니다.
            </Body>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">Tailwind CSS</Heading>
            <Body className="leading-relaxed">
              유틸리티 클래스 기반으로 컴포넌트를 쉽게 커스터마이징할 수
              있습니다. 프로젝트의 디자인 시스템에 맞게 자유롭게 스타일을 조정할
              수 있습니다.
            </Body>
          </Stack>
        </Stack>
      </PageSection>

      {/* Who should use HANUI */}
      <PageSection>
        <Heading level="h2" id="who-should-use">
          누가 사용하나요?
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Stack spacing="heading-tight">
            <Heading level="h3">공공기관 웹 개발자</Heading>
            <Body>
              정부, 지자체, 공공기관 웹사이트 개발 시 KRDS 준수가 필수인
              프로젝트에 적합합니다.
            </Body>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">SI 개발사</Heading>
            <Body>
              공공 프로젝트를 수주하는 SI 업체에서 빠른 개발과 표준 준수가
              필요한 경우에 활용할 수 있습니다.
            </Body>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">접근성 중시 프로젝트</Heading>
            <Body>
              웹 접근성 준수가 중요한 모든 웹 애플리케이션 개발에 사용할 수
              있습니다.
            </Body>
          </Stack>
        </Stack>
      </PageSection>

      {/* Browser Support */}
      <PageSection>
        <Heading level="h2" id="browser-support">
          브라우저 지원
        </Heading>

        <Stack spacing="heading-content" className="mt-2 md:mt-4">
          <Body>HANUI는 최신 브라우저를 지원합니다:</Body>
          <ul className="space-y-2">
            <li className="flex items-center gap-3">
              <Body className="w-24 font-medium">Chrome</Body>
              <Body className="text-gray-600 dark:text-gray-400">
                최신 2개 버전
              </Body>
            </li>
            <li className="flex items-center gap-3">
              <Body className="w-24 font-medium">Firefox</Body>
              <Body className="text-gray-600 dark:text-gray-400">
                최신 2개 버전
              </Body>
            </li>
            <li className="flex items-center gap-3">
              <Body className="w-24 font-medium">Safari</Body>
              <Body className="text-gray-600 dark:text-gray-400">
                최신 2개 버전
              </Body>
            </li>
            <li className="flex items-center gap-3">
              <Body className="w-24 font-medium">Edge</Body>
              <Body className="text-gray-600 dark:text-gray-400">
                최신 2개 버전
              </Body>
            </li>
          </ul>
        </Stack>
      </PageSection>

      {/* Next Steps */}
      <PageSection>
        <Heading level="h2" id="next-steps">
          다음 단계
        </Heading>

        <Stack spacing="heading-content" className="mt-2 md:mt-4">
          <Body>설치부터 시작해보세요:</Body>
          <a
            href="/docs/installation"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            Installation
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </Stack>
      </PageSection>
    </>
  );
}
