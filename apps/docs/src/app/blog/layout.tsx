import type { ReactNode } from 'react';
import { SimpleDocsLayout } from '@/components/layout/SimpleDocsLayout';

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <SimpleDocsLayout>{children}</SimpleDocsLayout>;
}
