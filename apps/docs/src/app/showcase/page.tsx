'use client';

import Link from 'next/link';
import { PageSection, Heading } from '@/components/content';
import { Card, CardBody, Badge, Button, Body } from '@hanui/react';
import {
  ExternalLink,
  Github,
  Globe,
  Sparkles,
  Layers,
  Package,
} from 'lucide-react';

interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  url?: string;
  github?: string;
  tags: string[];
  featured?: boolean;
  kits?: string[];
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: 'hanui-starter',
    title: 'HANUI Starter Kit',
    description:
      'Next.js와 HANUI를 사용한 정부 웹사이트 스타터 킷. KRDS 준수, 접근성, 반응형 디자인이 적용된 기본 레이아웃을 제공합니다.',
    github: 'https://github.com/hanui-o/hanui-starter',
    tags: ['Next.js', 'TypeScript', 'KRDS'],
    featured: true,
  },
  {
    id: 'admin-dashboard',
    title: '관리자 대시보드',
    description:
      'HANUI 컴포넌트와 Dashboard Kit으로 구축한 관리자 대시보드. 통계 카드, 차트, 테이블, 활동 피드를 포함합니다.',
    tags: ['Dashboard', 'Admin', 'Recharts'],
    kits: ['Dashboard Kit', 'Table Kit', 'Auth Kit'],
    featured: true,
  },
  {
    id: 'community-board',
    title: '커뮤니티 게시판',
    description:
      'Board Kit을 활용한 게시판 서비스. 글 목록, 상세 보기, 작성, 수정, 삭제, 댓글 기능을 제공합니다.',
    tags: ['Community', 'Board', 'Social'],
    kits: ['Board Kit', 'Auth Kit', 'Notification Kit'],
    featured: true,
  },
  {
    id: 'gov-portal',
    title: '정부24 스타일 포털',
    description:
      'KRDS 표준을 준수하는 정부 포털 사이트 템플릿. 마스트헤드, 헤더, 푸터, 사이드 네비게이션을 포함합니다.',
    tags: ['Government', 'Portal', 'KRDS'],
    kits: ['Auth Kit', 'Search Kit'],
  },
  {
    id: 'settings-demo',
    title: '설정 페이지 데모',
    description:
      'Settings Kit을 활용한 설정 페이지. 테마, 언어, 알림, 개인정보 설정을 관리합니다.',
    tags: ['Settings', 'Dark Mode', 'i18n'],
    kits: ['Settings Kit', 'Notification Kit'],
  },
  {
    id: 'search-demo',
    title: '통합 검색 데모',
    description:
      'Search Kit을 활용한 검색 페이지. 자동완성, 인기검색어, 최근검색어, 검색결과를 제공합니다.',
    tags: ['Search', 'Autocomplete'],
    kits: ['Search Kit'],
  },
];

function ShowcaseCard({ item }: { item: ShowcaseItem }) {
  return (
    <Card
      className={`group overflow-hidden transition-all hover:shadow-lg ${
        item.featured ? 'border-2 border-krds-primary-base' : ''
      }`}
    >
      {/* 이미지 영역 */}
      <div className="relative aspect-video bg-gradient-to-br from-krds-gray-10 to-krds-gray-20 overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <Globe className="w-12 h-12 text-krds-gray-30 mx-auto mb-2" />
              <span className="text-sm text-krds-gray-40">Preview</span>
            </div>
          </div>
        )}
        {item.featured && (
          <div className="absolute top-3 right-3">
            <Badge variant="primary" className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Featured
            </Badge>
          </div>
        )}
      </div>

      <CardBody>
        <h3 className="text-lg font-semibold text-krds-gray-90 mb-2 group-hover:text-krds-primary-base transition-colors">
          {item.title}
        </h3>
        <Body size="sm" className="text-krds-gray-60 mb-4 line-clamp-2">
          {item.description}
        </Body>

        {/* 태그 */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.tags.map((tag) => (
            <Badge key={tag} variant="outline-gray" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* 사용된 Kits */}
        {item.kits && item.kits.length > 0 && (
          <div className="mb-4 pt-3 border-t border-krds-gray-10">
            <p className="text-xs text-krds-gray-50 mb-2 flex items-center gap-1">
              <Package className="w-3 h-3" />
              사용된 Kits:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {item.kits.map((kit) => (
                <Badge key={kit} variant="secondary" className="text-xs">
                  {kit}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* 링크 버튼 */}
        <div className="flex items-center gap-2 pt-2">
          {item.url && (
            <Button variant="primary" size="sm" asChild>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-1" />
                방문하기
              </a>
            </Button>
          )}
          {item.github && (
            <Button variant="outline" size="sm" asChild>
              <a href={item.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-1" />
                GitHub
              </a>
            </Button>
          )}
          {!item.url && !item.github && (
            <span className="text-xs text-krds-gray-40 italic">
              Coming Soon
            </span>
          )}
        </div>
      </CardBody>
    </Card>
  );
}

export default function ShowcasePage() {
  const featuredItems = showcaseItems.filter((item) => item.featured);
  const otherItems = showcaseItems.filter((item) => !item.featured);

  return (
    <>
      <Heading
        level="h1"
        title="Showcase"
        description="HANUI로 만들어진 프로젝트들을 소개합니다. 컴포넌트와 Kits가 실제로 어떻게 활용되는지 확인하세요."
      />

      {/* Featured 프로젝트 */}
      <PageSection>
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-krds-primary-base" />
          <Heading level="h2" id="featured" title="Featured Projects" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredItems.map((item) => (
            <ShowcaseCard key={item.id} item={item} />
          ))}
        </div>
      </PageSection>

      {/* Kits 데모 프로젝트 */}
      <PageSection>
        <div className="flex items-center gap-2 mb-6">
          <Layers className="w-5 h-5 text-krds-primary-base" />
          <Heading level="h2" id="kits-demos" title="Kits Demos" />
        </div>
        <Body className="text-krds-gray-60 mb-6">
          HANUI Kits를 활용한 데모 프로젝트들입니다. 각 Kit이 어떻게 사용되는지
          확인하세요.
        </Body>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {otherItems.map((item) => (
            <ShowcaseCard key={item.id} item={item} />
          ))}
        </div>
      </PageSection>

      {/* Available Kits 소개 */}
      <PageSection>
        <div className="p-6 bg-krds-primary-5 rounded-lg border border-krds-primary-20">
          <Heading
            level="h3"
            title="Available Kits"
            className="text-krds-gray-90 mb-4"
          />
          <Body className="text-krds-gray-70 mb-6">
            HANUI Kits는 재사용 가능한 기능 단위 패키지입니다. API 주소만
            변경하면 바로 사용할 수 있습니다.
          </Body>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { name: 'Board Kit', desc: '게시판 기능', href: '/kits/board' },
              { name: 'Auth Kit', desc: '인증 기능', href: '/kits/auth' },
              { name: 'Table Kit', desc: '데이터 테이블', href: '/kits/table' },
              { name: 'Form Kit', desc: '폼 기능', href: '/kits/form' },
              {
                name: 'Dashboard Kit',
                desc: '대시보드',
                href: '/kits/dashboard',
              },
              { name: 'Search Kit', desc: '검색 기능', href: '/kits/search' },
              {
                name: 'Notification Kit',
                desc: '알림 기능',
                href: '/kits/notification',
              },
              {
                name: 'Settings Kit',
                desc: '설정 기능',
                href: '/kits/settings',
              },
            ].map((kit) => (
              <Link
                key={kit.name}
                href={kit.href}
                className="p-3 bg-white rounded-lg border border-krds-gray-20 hover:border-krds-primary-base hover:shadow-sm transition-all"
              >
                <p className="font-medium text-sm text-krds-gray-90">
                  {kit.name}
                </p>
                <p className="text-xs text-krds-gray-50">{kit.desc}</p>
              </Link>
            ))}
          </div>
          <Button asChild>
            <Link href="/kits">모든 Kits 보기</Link>
          </Button>
        </div>
      </PageSection>

      {/* 프로젝트 등록 CTA */}
      <PageSection>
        <div className="p-6 bg-krds-gray-5 rounded-lg border border-krds-gray-20">
          <Heading
            level="h3"
            title="프로젝트 등록하기"
            className="text-krds-gray-90 mb-3"
          />
          <Body className="text-krds-gray-70 mb-4">
            HANUI로 만든 프로젝트가 있으신가요? Showcase에 등록하고 다른
            개발자들과 공유해보세요.
          </Body>
          <Button variant="primary" asChild>
            <a
              href="https://github.com/hanui-o/hanui/issues/new?title=Showcase:%20[프로젝트명]&labels=showcase"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4 mr-2" />
              프로젝트 제출하기
            </a>
          </Button>
        </div>
      </PageSection>
    </>
  );
}
