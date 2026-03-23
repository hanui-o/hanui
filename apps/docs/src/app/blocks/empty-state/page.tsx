import type { Metadata } from 'next';
import EmptyStatePage from './content';

export const metadata: Metadata = {
  title: 'Empty State 빈 상태 블록',
  description:
    '데이터가 없을 때 표시하는 빈 상태 UI 블록. 아이콘, 메시지, CTA 버튼 포함. KRDS, React.',
  alternates: {
    canonical: '/blocks/empty-state',
  },
};

export default function Page() {
  return <EmptyStatePage />;
}
