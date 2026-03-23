import type { Metadata } from 'next';
import SkipLinkPage from './content';

export const metadata: Metadata = {
  title: 'SkipLink 건너뛰기 링크',
  description:
    'KRDS 기반 SkipLink 컴포넌트. 키보드/스크린 리더 사용자가 주요 콘텐츠로 바로 이동하는 접근성 필수 UI. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/skiplink',
  },
};

export default function Page() {
  return <SkipLinkPage />;
}
