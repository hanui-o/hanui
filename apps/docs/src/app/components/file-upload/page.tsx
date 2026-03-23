import type { Metadata } from 'next';
import FileUploadPage from './content';

export const metadata: Metadata = {
  title: 'FileUpload 파일 업로드 컴포넌트',
  description:
    'KRDS 기반 FileUpload 컴포넌트. 드래그 앤 드롭, 파일 검증 지원. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/file-upload',
  },
};

export default function Page() {
  return <FileUploadPage />;
}
