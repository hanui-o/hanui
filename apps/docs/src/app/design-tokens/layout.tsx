import type { ReactNode } from 'react';
import { DocsLayout } from '@/components/DocsLayout';

export default function DesignTokensLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <DocsLayout>{children}</DocsLayout>;
}
