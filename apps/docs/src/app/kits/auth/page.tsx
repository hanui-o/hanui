'use client';

import { Heading, PageNavigation } from '@/components/content';
import { FrameworkContent } from '@/components/content/FrameworkCodeBlock';
import { ReactAuthContent } from './_react';
import { VueAuthContent } from './_vue';

export default function AuthKitPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Auth Kit"
        description="인증 기능 키트. 로그인, 회원가입, 비밀번호 찾기를 지원합니다."
      />

      <FrameworkContent react={<ReactAuthContent />} vue={<VueAuthContent />} />

      <PageNavigation
        prev={{ title: 'Board Kit', href: '/kits/board' }}
        next={{ title: 'Table Kit', href: '/kits/table' }}
      />
    </>
  );
}
