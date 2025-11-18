'use client';

import { Body } from '@hanui/react';
import { CodeBlock } from '@/components/content/CodeBlock';
import { PageSection } from '@/components/content/PageSection';
import { SectionHeading } from '@/components/hanui/section-header';
import Link from 'next/link';

export default function TemplatesPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Templates"
        description="HANUI 컴포넌트를 조합한 실전 레이아웃 템플릿입니다. 복사해서 프로젝트에 바로 사용할 수 있습니다."
      />

      <PageSection>
        <SectionHeading level="h2" id="overview" title="개요">
          <Body className="leading-relaxed">
            Templates는 HANUI 컴포넌트들을 조합하여 실제 정부 웹사이트에서 자주
            사용되는 레이아웃 패턴을 제공합니다. shadcn/ui의 철학을 따라, 템플릿
            코드를 복사해서 프로젝트에 붙여넣고 필요에 따라 수정하여 사용할 수
            있습니다.
          </Body>
        </SectionHeading>

        <SectionHeading level="h2" id="how-to-use" title="사용 방법" />

        <SectionHeading level="h3" id="step1" title="1. 필요한 컴포넌트 설치">
          <Body>템플릿에 필요한 컴포넌트들을 한 번에 설치할 수 있습니다:</Body>
        </SectionHeading>
        <CodeBlock code="npx hanui add layout" language="bash" />
        <Body className="text-sm text-krds-gray-70 mt-2">
          이 명령은 Header, Footer, SkipLink, MainMenu, Breadcrumb 등 기본
          레이아웃에 필요한 모든 컴포넌트를 자동으로 설치합니다.
        </Body>

        <SectionHeading level="h3" id="step2" title="2. 템플릿 코드 복사">
          <Body>
            원하는 템플릿 페이지로 이동하여 예제 코드를 복사합니다. 각 템플릿은
            완성된 레이아웃 예제와 함께 설명을 제공합니다.
          </Body>
        </SectionHeading>

        <SectionHeading level="h3" id="step3" title="3. 프로젝트에 붙여넣기">
          <Body>
            복사한 코드를 프로젝트의 레이아웃 파일이나 페이지 컴포넌트에
            붙여넣고, 프로젝트에 맞게 수정하여 사용합니다.
          </Body>
        </SectionHeading>

        <SectionHeading
          level="h2"
          id="available-templates"
          title="사용 가능한 템플릿"
        />

        <div className="grid gap-6 md:grid-cols-2 mt-6">
          <Link
            href="/templates/basic-layout"
            className="block p-6 border border-krds-gray-20 rounded-lg hover:border-krds-primary-base transition-colors"
          >
            <h3 className="text-lg font-semibold text-krds-gray-90 mb-2">
              Basic Layout
            </h3>
            <Body className="text-sm text-krds-gray-70">
              정부 웹사이트의 기본 레이아웃입니다. Header, Footer, MainMenu,
              Breadcrumb, SkipLink를 포함합니다.
            </Body>
          </Link>

          <div className="block p-6 border border-krds-gray-20 rounded-lg opacity-50">
            <h3 className="text-lg font-semibold text-krds-gray-90 mb-2">
              Dashboard Layout
            </h3>
            <Body className="text-sm text-krds-gray-70">
              관리자 대시보드 레이아웃입니다. SideNavigation과 함께 사용됩니다.
              (준비 중)
            </Body>
          </div>
        </div>

        <SectionHeading level="h2" id="philosophy" title="디자인 철학" />
        <Body>HANUI Templates는 shadcn/ui의 철학을 따릅니다:</Body>
        <ul className="list-disc pl-6 space-y-2 text-base text-krds-gray-90 mt-2">
          <li>
            <strong>복사 & 붙여넣기:</strong> 템플릿 코드를 직접 소유하고 수정할
            수 있습니다
          </li>
          <li>
            <strong>완전한 커스터마이징:</strong> 프로젝트에 맞게 자유롭게
            수정하여 사용할 수 있습니다
          </li>
          <li>
            <strong>종속성 없음:</strong> 별도의 템플릿 라이브러리에 종속되지
            않습니다
          </li>
          <li>
            <strong>실전 예제:</strong> 실제 정부 웹사이트에서 검증된 패턴을
            제공합니다
          </li>
        </ul>

        <SectionHeading level="h2" id="krds-compliance" title="KRDS 준수" />
        <Body>
          모든 템플릿은 KRDS(한국형 웹 콘텐츠 접근성 지침) 및 WCAG 2.1 AA 레벨을
          준수하도록 설계되었습니다:
        </Body>
        <ul className="list-disc pl-6 space-y-2 text-base text-krds-gray-90 mt-2">
          <li>Semantic HTML 구조</li>
          <li>Keyboard Navigation 지원</li>
          <li>Screen Reader 호환성</li>
          <li>색상 대비 준수</li>
          <li>반응형 디자인</li>
        </ul>

        <SectionHeading level="h2" id="customization" title="커스터마이징 팁" />
        <Body>템플릿을 프로젝트에 맞게 수정할 때 다음 사항을 고려하세요:</Body>
        <ul className="list-disc pl-6 space-y-2 text-base text-krds-gray-90 mt-2">
          <li>
            <strong>색상:</strong> KRDS 색상 토큰을 사용하여 브랜드 색상으로
            변경할 수 있습니다
          </li>
          <li>
            <strong>레이아웃:</strong> Container, Stack, Section 컴포넌트를
            조합하여 레이아웃을 조정할 수 있습니다
          </li>
          <li>
            <strong>네비게이션:</strong> 메뉴 항목과 링크는 프로젝트 구조에 맞게
            수정하세요
          </li>
          <li>
            <strong>콘텐츠:</strong> 텍스트와 이미지는 프로젝트 콘텐츠로
            교체하세요
          </li>
        </ul>

        <SectionHeading level="h2" id="next-steps" title="다음 단계" />
        <Body>
          <Link
            href="/templates/basic-layout"
            className="text-krds-primary-base hover:underline font-medium"
          >
            Basic Layout 템플릿
          </Link>
          으로 시작해보세요. 기본 레이아웃을 이해하면 다른 템플릿도 쉽게 사용할
          수 있습니다.
        </Body>
      </PageSection>
    </>
  );
}
