'use client';

import { Breadcrumb, FaqList } from '@hanui/react';

export default function FaqPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: '홈', href: '/showcase/public' },
          { label: '민원안내', href: '/showcase/public/faq' },
          { label: '자주 묻는 질문', isCurrent: true },
        ]}
      />

      <h1 className="text-2xl font-bold text-krds-gray-90 mt-6 mb-6">
        자주 묻는 질문
      </h1>

      <FaqList showCategoryFilter />
    </>
  );
}
