'use client';

import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Container } from '@hanui/react';

interface SimpleDocsLayoutProps {
  children: ReactNode;
}

/**
 * Simple layout without sidebar for pages like Showcase and Community
 */
export function SimpleDocsLayout({ children }: SimpleDocsLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-krds-gray-0">
      <Header />
      <main className="flex-1 pt-[100px]">
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  );
}
