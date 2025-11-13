import type { ReactNode } from 'react';
import { DocsLayout } from '@/components/DocsLayout';
import { PageNav } from '@/components/docs/PageNav';

export default function LayoutDocsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DocsLayout>
      <div className="flex gap-8 max-w-7xl mx-auto px-4 py-12">
        <div className="flex-1 max-w-4xl">{children}</div>
        <PageNav />
      </div>
    </DocsLayout>
  );
}
