'use client';

import { Heading, PageNavigation } from '@/components/content';
import { FrameworkContent } from '@/components/content/FrameworkCodeBlock';
import { ReactDashboardContent } from './_react';
import { VueDashboardContent } from './_vue';

export default function DashboardKitPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Dashboard Kit"
        description="대시보드 키트. 통계 카드, 차트, 최근 활동 위젯을 제공합니다."
      />

      <FrameworkContent
        react={<ReactDashboardContent />}
        vue={<VueDashboardContent />}
      />

      <PageNavigation
        prev={{ title: 'Form Kit', href: '/kits/form' }}
        next={{ title: 'Search Kit', href: '/kits/search' }}
      />
    </>
  );
}
