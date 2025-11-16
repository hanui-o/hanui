'use client';

import type { ReactNode } from 'react';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';

interface HomeLayoutProps {
  children: ReactNode;
}

export function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-krds-gray-5">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
