import type { ReactNode } from 'react';
import { DocsContentLayout } from '@/components/DocsContentLayout';

export default function ComponentsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <DocsContentLayout>{children}</DocsContentLayout>;
}
