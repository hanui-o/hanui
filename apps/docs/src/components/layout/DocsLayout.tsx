'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { Container } from '@hanui/react';

interface DocsLayoutProps {
  children: ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-krds-gray-0">
      <Header />
      {/* KRDS: header 56px 아래부터 시작 */}
      <div className="flex-1 flex pt-14">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0">
          {/* KRDS small(~767px): 사이드바 토글 바 */}
          <div className="md:hidden sticky top-14 z-20 flex items-center gap-2 px-4 py-2 bg-krds-white border-b border-krds-gray-5">
            <button
              onClick={() => setIsSidebarOpen(true)}
              aria-label="메뉴 열기"
              className="flex items-center gap-1.5 text-sm text-krds-gray-70 hover:text-krds-gray-95 py-1 px-2 rounded-md hover:bg-krds-gray-5 transition-colors"
            >
              <Menu className="w-4 h-4" />
              메뉴
            </button>
          </div>

          <Container>{children}</Container>
        </main>
      </div>
      <Footer />
    </div>
  );
}
