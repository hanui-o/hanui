import type { Metadata } from 'next';
import ErrorPagePage from './content';

export const metadata: Metadata = {
  title: 'Error Page 에러 페이지 블록',
  description:
    '404, 500, 403 등 HTTP 에러 페이지 UI 블록. KRDS, React, 접근성 AA.',
  alternates: {
    canonical: '/blocks/error-page',
  },
};

export default function Page() {
  return <ErrorPagePage />;
}
