'use client';

import {
  Container,
  Body,
  Heading,
  HeaderWithMegaMenu,
  HeaderWithNavigation,
  Stack,
} from '@hanui/react';

// MegaMenu 예제 데이터
const megaMenuColumns = [
  {
    title: '국민서비스',
    href: '#',
    links: [
      { label: '건강보험 안내', href: '#' },
      { label: '보험료 조회/납부', href: '#' },
      { label: '자격득실 확인', href: '#' },
      { label: '보험급여 신청', href: '#' },
    ],
  },
  {
    title: '요양기관',
    href: '#',
    links: [
      { label: '요양기관 안내', href: '#' },
      { label: '청구/심사', href: '#' },
      { label: '현지조사', href: '#' },
    ],
  },
  {
    title: '건강정보',
    href: '#',
    links: [
      { label: '건강검진', href: '#' },
      { label: '질병정보', href: '#' },
      { label: '건강생활', href: '#' },
    ],
  },
  {
    title: '알림마당',
    href: '#',
    links: [
      { label: '공지사항', href: '#' },
      { label: '보도자료', href: '#' },
      { label: '채용정보', href: '#' },
    ],
  },
];

// NavigationMenu 예제 데이터
const navigationItems = [
  {
    label: '소개',
    href: '#',
    children: [
      { label: '기관소개', href: '#' },
      { label: '조직안내', href: '#' },
      { label: '찾아오시는 길', href: '#' },
    ],
  },
  {
    label: '서비스',
    href: '#',
    children: [
      { label: '민원신청', href: '#' },
      { label: '증명서 발급', href: '#' },
      { label: '상담예약', href: '#' },
    ],
  },
  {
    label: '정보공개',
    href: '#',
    children: [
      { label: '사전정보공표', href: '#' },
      { label: '정보공개청구', href: '#' },
    ],
  },
  {
    label: '소통참여',
    href: '#',
    children: [
      { label: '국민제안', href: '#' },
      { label: 'FAQ', href: '#' },
    ],
  },
];

export default function HeaderPage() {
  return (
    <Container className="py-10">
      <Heading level="h1">Header Component</Heading>
      <Body size="lg" className="text-krds-gray-70 mb-8">
        Header 컴포넌트는 HeaderWithMegaMenu와 HeaderWithNavigation 두 가지
        형태로 제공됩니다.
      </Body>

      <Stack gap="xl">
        {/* HeaderWithMegaMenu 예제 */}
        <section>
          <Heading level="h2">HeaderWithMegaMenu</Heading>
          <Body className="mb-4">
            MegaMenu가 포함된 헤더로, 로고와 메가메뉴가 한 줄에 배치됩니다. 호버
            시 전체 너비의 드롭다운 메뉴가 표시됩니다.
          </Body>
          <div className="border border-krds-gray-20 rounded-lg overflow-hidden">
            <HeaderWithMegaMenu
              megaColumns={megaMenuColumns}
              logo="https://www.krds.go.kr/resources/img/pattern/layout/head_logo.svg"
              logoAlt="대한민국정부"
              slogan="국민건강보험공단"
            />
          </div>
        </section>

        {/* HeaderWithNavigation 예제 */}
        <section>
          <Heading level="h2">HeaderWithNavigation</Heading>
          <Body className="mb-4">
            NavigationMenu가 포함된 헤더로, 2단 레이아웃으로 구성됩니다. 첫 번째
            줄에 로고와 액션 버튼, 두 번째 줄에 네비게이션 메뉴가 배치됩니다.
          </Body>
          <div className="border border-krds-gray-20 rounded-lg overflow-hidden">
            <HeaderWithNavigation
              navigationItems={navigationItems}
              logo="https://www.krds.go.kr/resources/img/pattern/layout/head_logo.svg"
              logoAlt="대한민국정부"
              slogan="공공기관명"
            />
          </div>
        </section>

        {/* Props 설명 */}
        <section>
          <Heading level="h2">Props</Heading>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Heading level="h3">HeaderWithMegaMenu</Heading>
              <ul className="list-disc list-inside space-y-2 text-krds-gray-70">
                <li>
                  <code className="bg-krds-gray-10 px-1.5 py-0.5 rounded text-sm">
                    megaColumns
                  </code>{' '}
                  - 메가메뉴 컬럼 배열 (필수)
                </li>
                <li>
                  <code className="bg-krds-gray-10 px-1.5 py-0.5 rounded text-sm">
                    utilityLinks
                  </code>{' '}
                  - 유틸리티 링크 배열
                </li>
                <li>
                  <code className="bg-krds-gray-10 px-1.5 py-0.5 rounded text-sm">
                    relatedSites
                  </code>{' '}
                  - 관련사이트 드롭다운 링크 배열
                </li>
                <li>
                  <code className="bg-krds-gray-10 px-1.5 py-0.5 rounded text-sm">
                    logo
                  </code>{' '}
                  - 로고 이미지 URL
                </li>
                <li>
                  <code className="bg-krds-gray-10 px-1.5 py-0.5 rounded text-sm">
                    slogan
                  </code>{' '}
                  - 슬로건 텍스트
                </li>
              </ul>
            </div>
            <div>
              <Heading level="h3">HeaderWithNavigation</Heading>
              <ul className="list-disc list-inside space-y-2 text-krds-gray-70">
                <li>
                  <code className="bg-krds-gray-10 px-1.5 py-0.5 rounded text-sm">
                    navigationItems
                  </code>{' '}
                  - 네비게이션 메뉴 항목 배열 (필수)
                </li>
                <li>
                  <code className="bg-krds-gray-10 px-1.5 py-0.5 rounded text-sm">
                    utilityLinks
                  </code>{' '}
                  - 유틸리티 링크 배열
                </li>
                <li>
                  <code className="bg-krds-gray-10 px-1.5 py-0.5 rounded text-sm">
                    relatedSites
                  </code>{' '}
                  - 관련사이트 드롭다운 링크 배열
                </li>
                <li>
                  <code className="bg-krds-gray-10 px-1.5 py-0.5 rounded text-sm">
                    logo
                  </code>{' '}
                  - 로고 이미지 URL
                </li>
                <li>
                  <code className="bg-krds-gray-10 px-1.5 py-0.5 rounded text-sm">
                    slogan
                  </code>{' '}
                  - 슬로건 텍스트
                </li>
              </ul>
            </div>
          </div>
        </section>
      </Stack>
    </Container>
  );
}
