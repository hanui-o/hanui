import type { Metadata } from 'next';
import MediaGalleryPage from './content';

export const metadata: Metadata = {
  title: 'Media Gallery 미디어 관리 블록',
  description:
    '미디어 파일을 그리드/리스트로 관리하고 업로드/삭제/상세보기를 제공하는 CMS 블록. KRDS, React.',
  alternates: {
    canonical: '/blocks/media-gallery',
  },
};

export default function Page() {
  return <MediaGalleryPage />;
}
