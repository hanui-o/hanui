'use client';

import { Heading, PageNavigation } from '@/components/content';
import { FrameworkContent } from '@/components/content/FrameworkCodeBlock';
import { ReactGettingStartedContent } from './_react';
import { VueGettingStartedContent } from './_vue';

export default function GettingStartedPage() {
  return (
    <>
      <Heading
        level="h1"
        title="시작하기"
        description="HANUI Kits를 외부 프로젝트에서 사용하는 방법을 안내합니다."
      />

      <FrameworkContent
        react={<ReactGettingStartedContent />}
        vue={<VueGettingStartedContent />}
      />

      <PageNavigation
        prev={{ title: 'Kits', href: '/kits' }}
        next={{ title: 'Board Kit', href: '/kits/board' }}
      />
    </>
  );
}
