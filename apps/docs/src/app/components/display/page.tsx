import type { Metadata } from 'next';
import DisplayPage from './content';

export const metadata: Metadata = {
  title: 'Display 대형 텍스트 컴포넌트',
  description:
    'KRDS 기반 Display 컴포넌트. 배너와 마케팅용 대형 텍스트 UI. React.',
  alternates: {
    canonical: '/components/display',
  },
};

export default function Page() {
  return <DisplayPage />;
}
