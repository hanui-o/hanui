export default function IntroductionPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Introduction</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          HANUI는 KRDS(Korea Republic Design System)를 기반으로 한 React
          컴포넌트 라이브러리입니다.
        </p>
      </div>

      {/* What is HANUI */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">HANUI란?</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          HANUI는 한국 공공기관 웹사이트 개발을 위한 UI 컴포넌트
          라이브러리입니다. KRDS 디자인 시스템을 준수하며, 웹 접근성(WCAG 2.1
          AA)을 완벽히 지원합니다.
        </p>

        <h3 className="text-lg font-semibold mb-3">핵심 가치</h3>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
            <div>
              <strong>KRDS 준수:</strong> 한국 정부 디자인 시스템 가이드라인
              완벽 준수
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
            <div>
              <strong>웹 접근성:</strong> WCAG 2.1 AA 수준 웹 접근성 기준 충족
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
            <div>
              <strong>개발자 경험:</strong> TypeScript 완벽 지원 및 직관적인 API
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
            <div>
              <strong>커스터마이징:</strong> Tailwind CSS 기반으로 쉬운 확장
              가능
            </div>
          </li>
        </ul>
      </section>

      {/* Key Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">주요 기능</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">KRDS 디자인 시스템</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              한국 공공기관 표준 디자인 가이드라인을 준수하는 컴포넌트를
              제공합니다. 정부 및 공공기관 웹사이트 개발 시 필수적인 디자인
              표준을 손쉽게 적용할 수 있습니다.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">웹 접근성</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              스크린 리더, 키보드 네비게이션, ARIA 속성 등 웹 접근성을 완벽하게
              지원합니다. 모든 사용자가 차별 없이 웹사이트를 이용할 수 있도록
              설계되었습니다.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">React + TypeScript</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              타입 안정성과 자동완성 기능으로 개발 생산성을 높입니다. 컴포넌트의
              모든 Props와 이벤트 핸들러에 대한 완벽한 타입 정의를 제공합니다.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Tailwind CSS</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              유틸리티 클래스 기반으로 컴포넌트를 쉽게 커스터마이징할 수
              있습니다. 프로젝트의 디자인 시스템에 맞게 자유롭게 스타일을 조정할
              수 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Who should use HANUI */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">누가 사용하나요?</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">공공기관 웹 개발자</h3>
            <p className="text-gray-700 dark:text-gray-300">
              정부, 지자체, 공공기관 웹사이트 개발 시 KRDS 준수가 필수인
              프로젝트에 적합합니다.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">SI 개발사</h3>
            <p className="text-gray-700 dark:text-gray-300">
              공공 프로젝트를 수주하는 SI 업체에서 빠른 개발과 표준 준수가
              필요한 경우에 활용할 수 있습니다.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">접근성 중시 프로젝트</h3>
            <p className="text-gray-700 dark:text-gray-300">
              웹 접근성 준수가 중요한 모든 웹 애플리케이션 개발에 사용할 수
              있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Browser Support */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">브라우저 지원</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          HANUI는 최신 브라우저를 지원합니다:
        </p>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li className="flex items-center gap-3">
            <span className="w-24 font-medium">Chrome</span>
            <span className="text-gray-600 dark:text-gray-400">
              최신 2개 버전
            </span>
          </li>
          <li className="flex items-center gap-3">
            <span className="w-24 font-medium">Firefox</span>
            <span className="text-gray-600 dark:text-gray-400">
              최신 2개 버전
            </span>
          </li>
          <li className="flex items-center gap-3">
            <span className="w-24 font-medium">Safari</span>
            <span className="text-gray-600 dark:text-gray-400">
              최신 2개 버전
            </span>
          </li>
          <li className="flex items-center gap-3">
            <span className="w-24 font-medium">Edge</span>
            <span className="text-gray-600 dark:text-gray-400">
              최신 2개 버전
            </span>
          </li>
        </ul>
      </section>

      {/* Next Steps */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">다음 단계</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          설치부터 시작해보세요:
        </p>
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
      </section>
    </div>
  );
}
