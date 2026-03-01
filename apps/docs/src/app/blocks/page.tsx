import Link from 'next/link';
// Docs layout components
import { PageSection as Section, Heading } from '@/components/content';

// Docs helper components
import { Wrap } from '@/components/helpers';

// UI components - from @hanui/react
import { Body } from '@hanui/react';

// 인증 (Authentication)
const authBlocks = [
  {
    name: 'Login Form',
    description: '로그인 폼',
    href: '/blocks/login-form',
  },
  {
    name: 'Signup Form',
    description: '회원가입 폼',
    href: '/blocks/signup-form',
  },
  {
    name: 'Account Recovery',
    description: '아이디 찾기 / 비밀번호 찾기',
    href: '/blocks/account-recovery',
  },
  {
    name: 'OTP Verify',
    description: '인증번호 입력',
    href: '/blocks/otp-verify',
  },
];

// 결제 / 폼 (Payment & Forms)
const formBlocks = [
  {
    name: 'Payment Card',
    description: '카드 결제 폼',
    href: '/blocks/payment-card',
  },
  {
    name: 'Billing Address',
    description: '청구지/배송지 주소',
    href: '/blocks/billing-address',
  },
  {
    name: 'Contact Form',
    description: '문의 폼',
    href: '/blocks/contact-form',
  },
];

// 설정 / 프로필 (Settings & Profile)
const settingsBlocks = [
  {
    name: 'Profile Card',
    description: '프로필 카드',
    href: '/blocks/profile-card',
  },
  {
    name: 'Settings Section',
    description: '설정 패널',
    href: '/blocks/settings-section',
  },
  {
    name: 'Notification Settings',
    description: '알림 설정',
    href: '/blocks/notification-settings',
  },
];

// 데이터 / 정보 (Data Display)
const dataBlocks = [
  {
    name: 'Stats Card',
    description: '통계 카드 그리드',
    href: '/blocks/stats-card',
  },
  {
    name: 'Team Members',
    description: '팀원 목록/초대',
    href: '/blocks/team-members',
  },
  {
    name: 'Pricing Table',
    description: '가격표',
    href: '/blocks/pricing-table',
  },
];

// 검색 / 네비게이션 (Search & Navigation)
const navBlocks = [
  {
    name: 'Search Bar',
    description: '검색 바 + 필터',
    href: '/blocks/search-bar',
  },
  {
    name: 'Empty State',
    description: '빈 상태 화면',
    href: '/blocks/empty-state',
  },
  {
    name: 'Error Page',
    description: '에러 페이지 (404, 500)',
    href: '/blocks/error-page',
  },
];

// 공공기관 특화 (Government / KRDS)
const govBlocks = [
  {
    name: 'Gov Login',
    description: '정부24 스타일 로그인',
    href: '/blocks/gov-login',
  },
  {
    name: 'Application Form',
    description: '민원신청 폼',
    href: '/blocks/application-form',
  },
  {
    name: 'Service Card Grid',
    description: '서비스 카드 그리드',
    href: '/blocks/service-card-grid',
  },
];

function BlockSection({
  title,
  description,
  blocks,
  id,
}: {
  title: string;
  description?: string;
  blocks: Array<{
    name: string;
    description?: string;
    href: string;
    updated?: boolean;
  }>;
  id: string;
}) {
  if (blocks.length === 0) return null;

  return (
    <Section>
      <Heading level="h2" id={id} title={title}>
        {description && (
          <Body className="text-krds-gray-70">{description}</Body>
        )}
      </Heading>

      <Wrap gap="lg">
        {blocks.map((block) => (
          <Link
            key={block.name}
            href={block.href}
            className="relative rounded-lg transition-all group flex items-center gap-2 min-w-[200px]"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-base font-medium text-krds-gray-95 group-hover:underline transition-all">
                  {block.name}
                </span>
                {block.updated && (
                  <span className="w-2 h-2 rounded-full bg-krds-primary-base" />
                )}
              </div>
              {block.description && (
                <span className="text-sm text-krds-gray-70">
                  {block.description}
                </span>
              )}
            </div>
          </Link>
        ))}
      </Wrap>
    </Section>
  );
}

export default function BlocksPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Blocks"
        description="HANUI 컴포넌트를 조합한 복사-붙여넣기용 UI 섹션. 로그인 폼, 결제 폼, 설정 패널 등 자주 사용하는 UI를 바로 가져다 쓰세요."
      />

      <BlockSection
        title="인증"
        description="로그인, 회원가입 등 인증 관련 UI 블록"
        blocks={authBlocks}
        id="authentication"
      />

      <BlockSection
        title="결제 / 폼"
        description="결제, 주소 입력, 문의 등 폼 UI 블록"
        blocks={formBlocks}
        id="forms"
      />

      <BlockSection
        title="설정 / 프로필"
        description="프로필 카드, 설정 패널, 알림 설정 등 UI 블록"
        blocks={settingsBlocks}
        id="settings"
      />

      <BlockSection
        title="데이터 / 정보"
        description="통계 카드, 팀원 목록, 가격표 등 정보 표시 UI 블록"
        blocks={dataBlocks}
        id="data"
      />

      <BlockSection
        title="검색 / 네비게이션"
        description="검색, 빈 상태, 에러 페이지 등 UI 블록"
        blocks={navBlocks}
        id="navigation"
      />

      <BlockSection
        title="공공기관 특화"
        description="정부24 스타일 로그인, 민원신청 폼 등 공공기관용 UI 블록"
        blocks={govBlocks}
        id="government"
      />
    </>
  );
}
