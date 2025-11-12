import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary-60 rounded-md" />
              <span className="font-bold text-lg">HANUI</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              KRDS 기반 공공 웹 UI 컴포넌트 라이브러리
            </p>
          </div>

          {/* Getting Started */}
          <div>
            <h3 className="font-semibold mb-3">시작하기</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/components"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  컴포넌트
                </Link>
              </li>
              <li>
                <Link
                  href="/components"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  설치 가이드
                </Link>
              </li>
              <li>
                <Link
                  href="/components"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  템플릿
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-3">리소스</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://github.com/odada-o/hanui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/odada-o/hanui/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  이슈 보고
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/korea-design-system/krds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  KRDS
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-3">커뮤니티</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://github.com/odada-o/hanui/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  토론
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/odada-o"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  개발자
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} HANUI. MIT License.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Built with ❤️ by{' '}
            <a
              href="https://github.com/odada-o"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors font-medium"
            >
              @odada-o
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
