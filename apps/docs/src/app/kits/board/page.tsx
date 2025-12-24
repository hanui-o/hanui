'use client';

import { Heading, PageNavigation } from '@/components/content';
import { FrameworkContent } from '@/components/content/FrameworkCodeBlock';
import { ReactBoardContent } from './_react';
import { VueBoardContent } from './_vue';

export default function BoardKitPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Board Kit"
        description="게시판 기능 키트. API 주소만 바꾸면 바로 동작합니다."
      />

      <FrameworkContent
        react={<ReactBoardContent />}
        vue={<VueBoardContent />}
      />

      <PageNavigation
        prev={{ title: 'Getting Started', href: '/kits/getting-started' }}
        next={{ title: 'Auth Kit', href: '/kits/auth' }}
      />
    </>
  );
}
