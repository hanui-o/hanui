import type { ReactNode } from 'react';
import { DocsLayout } from '@/components/layout/DocsLayout';
import { PageNav } from '@/components/navigation/PageNav';

interface DocsContentLayoutProps {
  children: ReactNode;
}

/**
 * Standard layout for documentation content pages
 * Includes DocsLayout wrapper with consistent max-width and PageNav
 *
 * Spacing:
 * - h1-h2: 32px (Mobile) / 48px (PC) - controlled by PageHeader mb-8 lg:mb-12
 * - h2-h2: 40px (Mobile) / 80px (PC) - controlled by PageSection mb-10 md:mb-20
 */
export function DocsContentLayout({ children }: DocsContentLayoutProps) {
  return (
    <DocsLayout>
      <div className="flex justify-between gap-8 py-12">
        <div className="flex-1 max-w-4xl">{children}</div>
        <PageNav />
      </div>
    </DocsLayout>
  );
}
