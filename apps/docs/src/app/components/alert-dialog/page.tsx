import type { Metadata } from 'next';
import AlertDialogPage from './content';

export const metadata: Metadata = {
  title: 'AlertDialog 확인 다이얼로그',
  description:
    'KRDS 기반 AlertDialog 컴포넌트. 사용자 확인이 필요한 중요한 작업용 모달 다이얼로그. Radix UI 기반. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/alert-dialog',
  },
};

export default function Page() {
  return <AlertDialogPage />;
}
