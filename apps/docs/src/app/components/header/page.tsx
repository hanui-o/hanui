'use client';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  PageNavigation,
} from '@/components/content';
import { ComponentPreview } from '@/components/content/ComponentPreview';

// UI components - from @hanui/react
import {
  Body,
  Card,
  Code,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  HeaderWithPanelMenu,
  HeaderWithNavigation,
  HeaderWithMegaMenu,
  NavigationMenuItem,
  MegaMenuColumn,
  PanelMenuItem,
} from '@hanui/react';

// 샘플 데이터 - 개발자 거짓말 시리즈
const panelItems: PanelMenuItem[] = [
  {
    label: '회의',
    panel: [
      {
        label: '회의하기 싫다',
        subContent: {
          title: '회의 거부 사유',
          titleLink: { label: '바로가기', href: '/meeting/all' },
          links: [
            { label: '줌 피로감', href: '/meeting/zoom-fatigue' },
            { label: '이메일로 대체 가능', href: '/meeting/email' },
            { label: '내 할 일도 바쁨', href: '/meeting/busy' },
          ],
          banner: {
            badge: 'NEW',
            label: '비동기 커뮤니케이션 가이드',
            href: '/guide/async',
          },
        },
      },
      { label: '나 왜 초대됨?', href: '/meeting/invited' },
      {
        label: '메일로 될 것 같은데',
        href: '/meeting/email-pls',
        external: true,
      },
    ],
  },
  {
    label: '코드리뷰',
    panel: [
      {
        label: 'LGTM (안봄)',
        subContent: {
          title: 'LGTM 유형',
          links: [
            { label: '진짜 괜찮아서', href: '/review/really-ok' },
            { label: '바빠서 대충', href: '/review/too-busy' },
            { label: '이해 못해서', href: '/review/dont-understand' },
          ],
        },
      },
      { label: '이거 누가 짠거야', href: '/review/who' },
      { label: '아 내가 짰네', href: '/review/me' },
    ],
  },
  {
    label: '배포',
    panel: [
      {
        label: '금요일 배포 ㄴㄴ',
        subContent: {
          title: '금요일 배포 금지',
          links: [
            { label: '주말에 장애나면?', href: '/deploy/weekend-incident' },
            { label: '온콜 담당자 불쌍', href: '/deploy/oncall' },
            { label: '월요일에 하자', href: '/deploy/monday' },
          ],
        },
      },
      { label: '롤백 각오하셈', href: '/deploy/rollback' },
    ],
  },
  { label: '문서화', href: '/docs' },
];

const navigationItems: NavigationMenuItem[] = [
  { label: '금방 돼', href: '/' },
  {
    label: '내 로컬에선 돼',
    children: [
      { label: '재부팅 해봐', href: '/lies/reboot' },
      { label: '캐시 지워봐', href: '/lies/cache' },
      { label: '브랜치 다시 받아봐', href: '/lies/branch' },
    ],
    active: true,
  },
  {
    label: '테스트 다 했어',
    children: [
      { label: '수동으로 확인함', href: '/lies/manual-test' },
      { label: '시간 없어서 스킵', href: '/lies/no-time' },
      { label: 'console.log만 찍음', href: '/lies/console-log' },
    ],
  },
  { label: '거의 다 됐어', href: '/lies/almost-done' },
];

const megaColumns: MegaMenuColumn[] = [
  {
    title: '회의',
    links: [
      { label: '회의하기 싫다', href: '/hate/meeting' },
      { label: '이 회의 왜 하는거지', href: '/meeting/why' },
      { label: '나 왜 초대됨?', href: '/meeting/invited' },
    ],
    active: true,
  },
  {
    title: '코드리뷰',
    links: [
      { label: '리뷰하기 싫다', href: '/hate/review' },
      { label: 'LGTM (안봄)', href: '/review/lgtm' },
      { label: '이거 누가 짠거야', href: '/review/who' },
      { label: '아 내가 짰네', href: '/review/me' },
    ],
  },
  {
    title: '배포',
    links: [
      { label: '배포하기 싫다', href: '/hate/deploy' },
      { label: '금요일 배포 ㄴㄴ', href: '/deploy/friday-no' },
      { label: '롤백 각오하셈', href: '/deploy/rollback' },
    ],
  },
  {
    title: '문서화',
    links: [
      { label: '문서 쓰기 싫다', href: '/hate/docs' },
      { label: '코드가 곧 문서', href: '/docs/code-is-doc' },
      { label: 'TODO: 나중에 작성', href: '/docs/todo' },
    ],
  },
];

export default function HeaderPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Header"
        description="KRDS 표준 헤더 컴포넌트. 메뉴 타입에 따라 3가지 버전을 제공합니다."
      />

      {/* 컴포넌트 목록 */}
      <Section level="h2">
        <Heading level="h2" id="overview" title="컴포넌트 목록" />

        <Table className="mb-8">
          <TableHeader>
            <TableRow>
              <TableHead>컴포넌트</TableHead>
              <TableHead>메뉴 타입</TableHead>
              <TableHead>설치</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <strong>HeaderWithPanelMenu</strong>
              </TableCell>
              <TableCell>PanelMenu (KRDS 스타일, 클릭 기반)</TableCell>
              <TableCell>
                <Code variant="inline">npx hanui add header-panel</Code>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>HeaderWithNavigation</strong>
              </TableCell>
              <TableCell>NavigationMenu (Radix UI 기반)</TableCell>
              <TableCell>
                <Code variant="inline">npx hanui add header-navigation</Code>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>HeaderWithMegaMenu</strong>
              </TableCell>
              <TableCell>MegaMenu (hover 기반)</TableCell>
              <TableCell>
                <Code variant="inline">npx hanui add header-mega</Code>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Section>

      {/* HeaderWithPanelMenu */}
      <Section level="h2">
        <Heading level="h2" id="header-panel" title="HeaderWithPanelMenu" />
        <Body className="mb-4">
          KRDS 스타일 패널형 메뉴. 클릭 시 2depth 패널이 열리고 3depth
          서브콘텐츠를 지원합니다.
        </Body>

        <ComponentPreview className="h-[500px] overflow-hidden">
          <div
            className="scale-[0.65] origin-top w-[1400px]"
            style={{ height: '770px' }}
          >
            <HeaderWithPanelMenu
              className="w-[1400px]"
              panelItems={panelItems}
            />
          </div>
        </ComponentPreview>

        <Code variant="block" language="tsx" className="mt-4">
          {`import { HeaderWithPanelMenu, PanelMenuItem } from '@/components/hanui'

        const panelItems: PanelMenuItem[] = [
          {
            label: '회의',
            panel: [
              {
                label: '회의하기 싫다',
                subContent: {
                  title: '회의 거부 사유',
                  links: [
                    { label: '줌 피로감', href: '/meeting/zoom-fatigue' },
                    { label: '이메일로 대체 가능', href: '/meeting/email' },
                  ],
                },
              },
              { label: '나 왜 초대됨?', href: '/meeting/invited' },
            ],
          },
          { label: '문서화', href: '/docs' },
        ]

        <HeaderWithPanelMenu panelItems={panelItems} />`}
        </Code>
      </Section>

      {/* HeaderWithNavigation */}
      <Section level="h2">
        <Heading
          level="h2"
          id="header-navigation"
          title="HeaderWithNavigation"
        />
        <Body className="mb-4">
          Radix UI 기반 네비게이션 메뉴. 일부 항목에만 드롭다운이 필요하거나
          간단한 메뉴 구조에 적합합니다.
        </Body>

        <ComponentPreview className="h-[400px] overflow-hidden">
          <div
            className="scale-[0.65] origin-top w-[1400px]"
            style={{ height: '615px' }}
          >
            <HeaderWithNavigation
              className="w-[1400px]"
              navigationItems={navigationItems}
            />
          </div>
        </ComponentPreview>

        <Code variant="block" language="tsx" className="mt-4">
          {`import { HeaderWithNavigation, NavigationMenuItem } from '@/components/hanui'

const navigationItems: NavigationMenuItem[] = [
  { label: '금방 돼', href: '/' },
  {
    label: '내 로컬에선 돼',
    children: [
      { label: '재부팅 해봐', href: '/lies/reboot' },
      { label: '캐시 지워봐', href: '/lies/cache' },
    ],
    active: true,
  },
  { label: '거의 다 됐어', href: '/lies/almost-done' },
]

<HeaderWithNavigation navigationItems={navigationItems} />`}
        </Code>
      </Section>

      {/* HeaderWithMegaMenu */}
      <Section level="h2">
        <Heading level="h2" id="header-mega" title="HeaderWithMegaMenu" />
        <Body className="mb-4">
          Tailwind CSS 기반 메가메뉴. 모든 서브메뉴가 hover 시 한번에
          표시됩니다.
        </Body>

        <ComponentPreview className="h-[450px] overflow-hidden">
          <div
            className="scale-[0.65] origin-top w-[1400px]"
            style={{ height: '690px' }}
          >
            <HeaderWithMegaMenu
              className="w-[1400px]"
              megaColumns={megaColumns}
            />
          </div>
        </ComponentPreview>

        <Code variant="block" language="tsx" className="mt-4">
          {`import { HeaderWithMegaMenu, MegaMenuColumn } from '@/components/hanui'

const megaColumns: MegaMenuColumn[] = [
  {
    title: '회의',
    links: [
      { label: '회의하기 싫다', href: '/hate/meeting' },
      { label: '나 왜 초대됨?', href: '/meeting/invited' },
    ],
    active: true,
  },
  {
    title: '코드리뷰',
    links: [
      { label: 'LGTM (안봄)', href: '/review/lgtm' },
      { label: '아 내가 짰네', href: '/review/me' },
    ],
  },
]

<HeaderWithMegaMenu megaColumns={megaColumns} />`}
        </Code>
      </Section>

      {/* 공통 Props */}
      <Section level="h2">
        <Heading level="h2" id="common-props" title="공통 Props" />

        <Card className="p-4">
          <Code variant="block" language="tsx">
            {`// 모든 Header 컴포넌트에서 사용 가능한 공통 props
interface HeaderProps {
  logo?: string;                    // 로고 이미지 URL
  logoAlt?: string;                 // 로고 대체 텍스트 (기본: "대한민국정부")
  logoHref?: string;                // 로고 클릭 시 이동 URL (기본: "/")
  slogan?: React.ReactNode;         // 슬로건 내용
  utilityLinks?: UtilityLink[];     // 상단 유틸리티 링크
  stickyBehavior?: 'always' | 'auto' | 'never';  // 스크롤 시 헤더 동작
  className?: string;               // 추가 CSS 클래스
}`}
          </Code>
        </Card>
      </Section>

      <PageNavigation
        prev={{ title: 'Grid', href: '/components/grid' }}
        next={{ title: 'Heading', href: '/components/heading' }}
      />
    </>
  );
}
