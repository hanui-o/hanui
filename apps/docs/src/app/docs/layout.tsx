import type { ReactNode } from 'react';
import { DocsLayout } from '@/components/DocsLayout';

export default function DocsLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <DocsLayout>{children}</DocsLayout>;
}
