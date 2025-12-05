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
  NavigationMenu,
  MegaMenu,
  PanelMenu,
  Alert,
  Body,
  Card,
  Code,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@hanui/react';
import type {
  PanelMenuItem,
  NavigationMenuItem,
  MegaMenuColumn,
} from '@hanui/react';

// 개발자 거짓말 시리즈 - "하기 싫어" 에디션
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

export default function MainMenuPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Main Menu"
        description="주요 네비게이션을 위한 3가지 독립적인 컴포넌트"
      />

      {/* 빠른 시작 팁 */}
      <Alert variant="info" className="mb-6">
        <Body>
          <strong>빠른 시작:</strong> 메뉴만 필요하면 아래 컴포넌트를 개별
          설치하세요. 하지만 대부분의 경우{' '}
          <a href="/components/header" className="underline font-medium">
            Header 컴포넌트
          </a>
          를 사용하면 로고, 검색, 유틸리티 링크까지 포함된 완성된 헤더를 바로
          적용할 수 있어 더 편리합니다.
        </Body>
      </Alert>

      {/* 컴포넌트 목록 */}
      <Section level="h2">
        <Heading level="h2" id="overview" title="컴포넌트 목록" />

        <Table className="mb-8">
          <TableHeader>
            <TableRow>
              <TableHead>컴포넌트</TableHead>
              <TableHead>특징</TableHead>
              <TableHead>설치</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <strong>PanelMenu</strong>
              </TableCell>
              <TableCell>KRDS 스타일, 클릭 기반, 3depth 서브콘텐츠</TableCell>
              <TableCell>
                <Code variant="inline">npx hanui add menu-panel</Code>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>NavigationMenu</strong>
              </TableCell>
              <TableCell>
                Radix UI 기반, 간단한 사이트, 접근성 자동 처리
              </TableCell>
              <TableCell>
                <Code variant="inline">npx hanui add menu-navigation</Code>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>MegaMenu</strong>
              </TableCell>
              <TableCell>hover 시 모든 서브메뉴 표시, 대규모 사이트</TableCell>
              <TableCell>
                <Code variant="inline">npx hanui add menu-mega</Code>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Section>

      {/* NavigationMenu */}
      <Section level="h2">
        <Heading level="h2" id="navigation-menu" title="NavigationMenu" />
        <Body className="mb-4">
          Radix UI 기반 네비게이션 메뉴. 일부 항목에만 드롭다운이 필요하거나
          간단한 메뉴 구조에 적합합니다.
        </Body>

        <ComponentPreview className="h-[300px] overflow-hidden">
          <div
            className="scale-[0.65] origin-top w-[1400px]"
            style={{ height: '460px' }}
          >
            <NavigationMenu items={navigationItems} />
          </div>
        </ComponentPreview>

        <Code variant="block" language="tsx" className="mt-4">
          {`import { NavigationMenu, NavigationMenuItem } from '@hanui/react'

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

<NavigationMenu items={navigationItems} />`}
        </Code>
      </Section>

      {/* MegaMenu */}
      <Section level="h2">
        <Heading level="h2" id="mega-menu" title="MegaMenu" />
        <Body className="mb-4">
          Tailwind CSS 기반 메가메뉴. 모든 서브메뉴가 hover 시 한번에
          표시됩니다.
        </Body>

        <ComponentPreview className="h-[350px] overflow-hidden">
          <div
            className="scale-[0.65] origin-top w-[1400px]"
            style={{ height: '540px' }}
          >
            <MegaMenu columns={megaColumns} />
          </div>
        </ComponentPreview>

        <Code variant="block" language="tsx" className="mt-4">
          {`import { MegaMenu, MegaMenuColumn } from '@hanui/react'

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

<MegaMenu columns={megaColumns} />`}
        </Code>
      </Section>

      {/* PanelMenu */}
      <Section level="h2">
        <Heading level="h2" id="panel-menu" title="PanelMenu" />
        <Body className="mb-4">
          KRDS 스타일 패널형 메뉴. 클릭 시 2depth 패널이 열리고 3depth
          서브콘텐츠를 지원합니다.
        </Body>

        <ComponentPreview className="h-[350px] overflow-hidden">
          <div
            className="scale-[0.65] origin-top w-[1400px]"
            style={{ height: '540px' }}
          >
            <PanelMenu items={panelItems} />
          </div>
        </ComponentPreview>

        <Code variant="block" language="tsx" className="mt-4">
          {`import { PanelMenu, PanelMenuItem } from '@hanui/react'

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

<PanelMenu items={panelItems} />`}
        </Code>
      </Section>

      {/* 공통 Props */}
      <Section level="h2">
        <Heading level="h2" id="common-props" title="공통 Props" />

        <Card className="p-4">
          <Code variant="block" language="tsx">
            {`// PanelMenu
interface PanelMenuProps {
  items: PanelMenuItem[];           // 1Depth 메뉴 항목 배열 (필수)
  panelMinHeight?: number;          // 패널 최소 높이 (기본: 262px)
  onOpenChange?: (isOpen: boolean) => void;
}

// NavigationMenu
interface NavigationMenuProps {
  items: NavigationMenuItem[];      // 메뉴 항목 배열 (필수)
  orientation?: 'horizontal' | 'vertical';  // 메뉴 방향
  currentPath?: string;             // 현재 활성 경로
}

// MegaMenu
interface MegaMenuProps {
  columns: MegaMenuColumn[];        // 메뉴 컬럼 배열 (필수)
  dropdownBgColor?: string;         // 드롭다운 배경색
  currentPath?: string;             // 현재 활성 경로
}`}
          </Code>
        </Card>
      </Section>

      <PageNavigation
        prev={{ title: 'List', href: '/components/list' }}
        next={{ title: 'Masthead', href: '/components/masthead' }}
      />
    </>
  );
}
