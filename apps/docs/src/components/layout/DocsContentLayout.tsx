import type { ReactNode } from 'react';
import { DocsLayout } from '@/components/DocsLayout';
import { PageNav } from '@/components/docs/PageNav';

interface DocsContentLayoutProps {
  children: ReactNode;
}

/**
 * Standard layout for documentation content pages
 * Includes DocsLayout wrapper with consistent max-width and PageNav
 */
export function DocsContentLayout({ children }: DocsContentLayoutProps) {
  return (
    <DocsLayout>
      <div className="flex gap-8 py-12">
        <div className="flex-1 max-w-4xl flex flex-col gap-12">{children}</div>
        <PageNav />
      </div>
    </DocsLayout>
  );
}
