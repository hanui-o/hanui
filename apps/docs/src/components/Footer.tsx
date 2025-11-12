import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-20 dark:border-gray-80 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary-60 rounded-md" />
            <span className="font-bold">HANUI</span>
          </div>
          <p className="text-sm text-gray-60 dark:text-gray-40 max-w-md">
            KRDS 기반 공공 웹 UI 컴포넌트 라이브러리
          </p>
          <div className="flex items-center space-x-4 text-sm">
            <Link
              href="https://github.com/odada-o/hanui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-60 dark:text-gray-40 hover:text-gray-90 dark:hover:text-white transition-colors"
            >
              GitHub
            </Link>
            <span className="text-gray-30 dark:text-gray-70">•</span>
            <Link
              href="/components"
              className="text-gray-60 dark:text-gray-40 hover:text-gray-90 dark:hover:text-white transition-colors"
            >
              Components
            </Link>
          </div>
          <p className="text-xs text-gray-50 dark:text-gray-60 pt-4">
            MIT License © 2024{' '}
            <a
              href="https://github.com/odada-o"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-70 dark:hover:text-gray-40 transition-colors"
            >
              @odada-o
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
