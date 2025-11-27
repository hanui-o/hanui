'use client';

import { Body, Container } from '@hanui/react';
import { PageSection, Heading } from '@/components/content';
import Link from 'next/link';

export default function ShowcasePage() {
  return (
    <>
      <Heading
        level="h1"
        title="Showcase"
        description="HANUI로 만들어진 프로젝트들을 소개합니다. 실제 프로덕션 환경에서 사용되는 사례를 확인하세요."
      />

      <PageSection>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* HANUI Starter Kit */}
          <Link
            href="https://github.com/hanui-o/hanui-starter"
            target="_blank"
            rel="noopener noreferrer"
            className="group block overflow-hidden rounded-lg border border-krds-gray-20 hover:border-krds-primary-base transition-all hover:shadow-lg"
          >
            {/* 이미지 영역 - 추후 캡처 이미지로 교체 */}
            <div className="aspect-video bg-gradient-to-br from-krds-primary-light to-krds-primary-base flex items-center justify-center">
              <div className="text-white text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mx-auto mb-4"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M7 7h10" />
                  <path d="M7 12h10" />
                  <path d="M7 17h10" />
                </svg>
                <Body className="text-white font-semibold">
                  Screenshot Coming Soon
                </Body>
              </div>
            </div>

            {/* 콘텐츠 영역 */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <Heading
                  level="h3"
                  title="HANUI Starter Kit"
                  className="text-krds-gray-95 group-hover:text-krds-primary-base transition-colors"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-krds-gray-50 group-hover:text-krds-primary-base transition-colors flex-shrink-0"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </div>

              <Body size="sm" className="text-krds-gray-70 mb-4">
                Next.js와 HANUI를 사용한 정부 웹사이트 스타터 킷. KRDS 준수,
                접근성, 반응형 디자인이 적용된 기본 레이아웃을 제공합니다.
              </Body>

              {/* 기술 스택 태그 */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-krds-gray-10 text-krds-gray-70">
                  Next.js
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-krds-gray-10 text-krds-gray-70">
                  TypeScript
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-krds-primary-light text-krds-primary-dark">
                  HANUI
                </span>
              </div>
            </div>
          </Link>

          {/* 추후 추가될 프로젝트 카드 플레이스홀더 */}
          <div className="block overflow-hidden rounded-lg border border-krds-gray-20 opacity-50">
            <div className="aspect-video bg-krds-gray-10 flex items-center justify-center">
              <Body className="text-krds-gray-50">Coming Soon</Body>
            </div>
            <div className="p-6">
              <Heading
                level="h3"
                title="Your Project Here"
                className="text-krds-gray-70 mb-3"
              />
              <Body size="sm" className="text-krds-gray-50">
                HANUI를 사용한 프로젝트를 소개해주세요. GitHub에 이슈를
                남겨주시면 Showcase에 추가해드립니다.
              </Body>
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-krds-gray-5 rounded-lg border border-krds-gray-20">
          <Heading
            level="h3"
            title="프로젝트 등록하기"
            className="text-krds-gray-90 mb-3"
          />
          <Body className="text-krds-gray-70 mb-4">
            HANUI로 만든 프로젝트가 있으신가요? Showcase에 등록하고 다른
            개발자들과 공유해보세요.
          </Body>
          <Link
            href="https://github.com/hanui-o/hanui/issues/new?title=Showcase:%20[프로젝트명]&labels=showcase"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-krds-primary-base text-white rounded-md hover:bg-krds-primary-dark transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            프로젝트 제출하기
          </Link>
        </div>
      </PageSection>
    </>
  );
}
