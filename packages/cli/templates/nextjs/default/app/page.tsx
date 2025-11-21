export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900">
              HANUI로 시작하기
            </h1>
            <p className="text-xl text-gray-600">
              KRDS 디자인 시스템을 준수하는 React 컴포넌트 라이브러리
            </p>
          </div>

          {/* Getting Started Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold mb-6">시작하기</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-gray-900">프로젝트 초기화</p>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                    npx hanui init
                  </code>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-gray-900">컴포넌트 추가</p>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                    npx hanui add button card
                  </code>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-gray-900">컴포넌트 사용</p>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                    import {`{Button}`} from '@/components/hanui/button'
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-8">
            <h3 className="text-lg font-semibold mb-4 text-blue-900">
              다음 단계
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-blue-600">•</span>
                <span>app/page.tsx 파일을 수정해보세요</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">•</span>
                <span>문서에서 더 많은 컴포넌트를 확인하세요</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">•</span>
                <span>KRDS 디자인 가이드를 참고하세요</span>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="https://hanui.io/docs/installation"
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-400 transition-colors"
            >
              <h4 className="font-semibold text-gray-900 mb-2">문서</h4>
              <p className="text-sm text-gray-600">설치 및 사용법 가이드</p>
            </a>
            <a
              href="https://hanui.io/components/button"
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-400 transition-colors"
            >
              <h4 className="font-semibold text-gray-900 mb-2">컴포넌트</h4>
              <p className="text-sm text-gray-600">모든 컴포넌트 둘러보기</p>
            </a>
            <a
              href="https://www.uiux.egovframe.go.kr/"
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-400 transition-colors"
            >
              <h4 className="font-semibold text-gray-900 mb-2">KRDS</h4>
              <p className="text-sm text-gray-600">한국형 웹 디자인 시스템</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
