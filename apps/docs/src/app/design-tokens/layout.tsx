import type { ReactNode } from 'react';
import { DocsContentLayout } from '@/components/DocsContentLayout';

export default function DesignTokensLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <DocsContentLayout>{children}</DocsContentLayout>;
}
