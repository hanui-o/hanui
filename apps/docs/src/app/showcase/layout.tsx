import type { ReactNode } from 'react';
import { SimpleDocsLayout } from '@/components/layout/SimpleDocsLayout';

export default function ShowcaseLayout({ children }: { children: ReactNode }) {
  return <SimpleDocsLayout>{children}</SimpleDocsLayout>;
}
