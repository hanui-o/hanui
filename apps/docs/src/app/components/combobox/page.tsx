import type { Metadata } from 'next';
import ComboboxPage from './content';

export const metadata: Metadata = {
  title: 'Combobox 콤보박스 - 검색 드롭다운 UI 컴포넌트',
  description:
    'KRDS 기반 Combobox(콤보박스) 컴포넌트. 검색 가능한 드롭다운 선택 UI. 그룹화, 아이콘, 설명 옵션 지원. React, 접근성 AA 준수.',
  keywords: [
    '콤보박스',
    'combobox',
    'combobox ui',
    '검색 드롭다운',
    'autocomplete',
    'React combobox',
    'KRDS',
  ],
  alternates: {
    canonical: '/components/combobox',
  },
};

export default function Page() {
  return <ComboboxPage />;
}
