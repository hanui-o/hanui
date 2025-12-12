import type { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function A11yLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-krds-gray-0">
      <Header />
      <main className="flex-1 pt-[56px]">{children}</main>
      <Footer />
    </div>
  );
}
