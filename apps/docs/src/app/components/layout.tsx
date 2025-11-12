import type { ReactNode } from 'react';
import { DocsLayout } from '@/components/DocsLayout';

export default function ComponentsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <DocsLayout>{children}</DocsLayout>;
}
