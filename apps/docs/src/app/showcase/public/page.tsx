'use client';

import { useRouter } from 'next/navigation';
import { PublicHero, NoticeList, SearchBar, Body } from '@hanui/react';

export default function PublicMainPage() {
  const router = useRouter();

  return (
    <>
      {/* 히어로 배너 */}
      <PublicHero
        title="○○기관 홈페이지"
        subtitle="국민과 함께하는 열린 행정 서비스"
        ctaLabel="주요 서비스 바로가기"
        ctaHref="/showcase/public/civil"
        className="-mx-4 sm:-mx-6 lg:-mx-8 -mt-8"
      >
        <div className="max-w-xl mx-auto">
          <SearchBar
            placeholder="검색어를 입력하세요"
            onSearch={(query) =>
              router.push(`/showcase/public/search?q=${query}`)
            }
          />
        </div>
      </PublicHero>

      {/* 공지사항 + 보도자료 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <NoticeList
          title="공지사항"
          moreHref="/showcase/public/notice"
          onItemClick={() => router.push('/showcase/public/notice')}
        />

        <NoticeList
          title="보도자료"
          moreHref="/showcase/public/notice"
          items={[
            {
              id: 1,
              title: '○○기관, 디지털 행정 혁신 추진계획 발표',
              date: '2026-04-10',
              category: '보도',
            },
            {
              id: 2,
              title: '제3차 정보화 전략 위원회 개최 결과',
              date: '2026-04-08',
              category: '보도',
            },
            {
              id: 3,
              title: '국민 편의 서비스 확대 방안 마련',
              date: '2026-04-03',
              category: '보도',
            },
            {
              id: 4,
              title: '○○기관-△△부 업무협약 체결',
              date: '2026-03-28',
              category: '보도',
            },
          ]}
          onItemClick={() => router.push('/showcase/public/notice')}
        />
      </div>

      {/* 바로가기 */}
      <section className="mt-12" aria-label="주요 서비스">
        <h3 className="text-lg font-bold text-krds-gray-90 mb-4">
          주요 서비스
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: '온라인 민원', href: '/showcase/public/civil' },
            { label: '자주 묻는 질문', href: '/showcase/public/faq' },
            { label: '정보공개', href: '/showcase/public' },
            { label: '사이트맵', href: '/showcase/public/sitemap' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center justify-center p-6 rounded-lg border border-krds-gray-20 hover:border-krds-primary-base hover:bg-krds-primary-5 transition-colors text-center"
            >
              <Body size="md" className="font-semibold text-krds-gray-80">
                {item.label}
              </Body>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
