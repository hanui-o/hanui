'use client';

import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { Container } from '@hanui/react';

interface DocsLayoutProps {
  children: ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1">
          <Container>
            <div className="flex gap-8">{children}</div>
          </Container>
        </main>
      </div>
      <Footer />
    </div>
  );
}
