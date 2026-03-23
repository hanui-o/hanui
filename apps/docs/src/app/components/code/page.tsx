import type { Metadata } from 'next';
import CodePage from './content';

export const metadata: Metadata = {
  title: 'Code 코드 표시 컴포넌트',
  description:
    'KRDS 기반 Code 컴포넌트. 인라인 및 블록 코드를 표시하는 UI. 구문 강조 지원. React.',
  alternates: {
    canonical: '/components/code',
  },
};

export default function Page() {
  return <CodePage />;
}
