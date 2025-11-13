import type { ReactNode } from 'react';
import { DocsContentLayout } from '@/components/DocsContentLayout';

export default function DesignSystemLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <DocsContentLayout>{children}</DocsContentLayout>;
}
