import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HANUI Playground',
  description: 'Test HANUI components',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased bg-krds-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <header className="mb-8 pb-6 border-b border-krds-gray-200">
            <h1 className="text-3xl font-bold text-krds-gray-900">
              HANUI Playground
            </h1>
            <p className="mt-2 text-krds-gray-600">
              컴포넌트를 자유롭게 테스트해보세요
            </p>
          </header>

          <main className="pb-12">{children}</main>

          <footer className="mt-12 pt-6 border-t border-krds-gray-200 text-center text-sm text-krds-gray-500">
            <p>HANUI Component Library</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
