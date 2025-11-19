'use client';

import {
  Section,
  SectionHeading,
  Subsection,
  Code,
  Body,
  Card,
  Link,
  PageNavigation,
} from '@/components/hanui';

export default function DesignTokensPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Design Tokens"
        description="KRDS 기반 디자인 토큰을 Tailwind CSS로 사용하는 방법"
      />

      {/* Overview */}
      <Section level="h2">
        <SectionHeading level="h2" id="overview" title="개요">
          <Body className="leading-relaxed">
            디자인 토큰은 색상, 간격, 타이포그래피 등 디자인 시스템의 기본
            단위입니다. HANUI는{' '}
            <strong>KRDS(한국형 웹 콘텐츠 접근성 지침)</strong>를 따르는 디자인
            토큰을 제공하며, Tailwind CSS를 통해 쉽게 사용할 수 있습니다.
          </Body>
        </SectionHeading>

        <Card variant="info" className="mt-4">
          <Body size="sm">
            <strong>Tip:</strong> 모든 토큰은 CSS 변수로도 사용 가능하며,
            네임스페이스는 <Code>--krds</Code>로 시작합니다.
          </Body>
        </Card>

        <Card variant="info" className="mt-4">
          <Body size="sm">
            <strong>KRDS 공식 가이드:</strong> 더 자세한 내용은{' '}
            <a
              href="https://www.krds.go.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-krds-primary-base hover:underline font-semibold"
            >
              KRDS 공식 사이트
            </a>
            를 참고하세요.
          </Body>
        </Card>
      </Section>

      {/* KRDS Color System Integration */}
      <Section level="h2">
        <SectionHeading
          level="h2"
          id="krds-integration"
          title="KRDS 색상 시스템 통합"
        >
          <Body>
            HANUI는 KRDS(대한민국 디자인 시스템) 색상 시스템을 Tailwind CSS에서
            사용할 수 있도록 통합했습니다. Tailwind의 기본 색상(gray, red, blue
            등)과 충돌을 피하기 위해 <Code>krds-</Code> 접두사를 붙인 별도
            네임스페이스를 사용합니다.
          </Body>
        </SectionHeading>

        <Card variant="info" className="mt-4">
          <Body size="sm">
            <strong>📖 상세 내용:</strong> 색상 시스템의 자세한 사용법, Semantic
            변수, 다크 모드 등은{' '}
            <Link href="/design-system/colors">Design System → Colors</Link>
            페이지를 참고하세요.
          </Body>
        </Card>
      </Section>

      {/* Spacing */}
      <Section level="h2">
        <SectionHeading level="h2" id="spacing" title="간격 (Spacing)">
          <Body>
            KRDS는 8-point grid system을 기반으로 합니다. 일관된 간격 사용으로
            시각적 리듬과 정렬을 유지할 수 있습니다.
          </Body>
        </SectionHeading>

        <Card variant="info" className="mt-4">
          <Body size="sm">
            <strong>📖 상세 내용:</strong> 간격의 자세한 사용법은{' '}
            <Link href="/design-system/spacing">Design System → Spacing</Link>
            페이지를 참고하세요.
          </Body>
        </Card>
      </Section>

      {/* Typography */}
      <Section level="h2">
        <SectionHeading
          level="h2"
          id="typography"
          title="타이포그래피 (Typography)"
        >
          <Body>
            KRDS는 Pretendard GOV 폰트를 기본으로 하며, 최소 16px 크기와 150%
            line-height를 권장합니다.
          </Body>
        </SectionHeading>

        <Card variant="info" className="mt-4">
          <Body size="sm">
            <strong>📖 상세 내용:</strong> 타이포그래피의 자세한 사용법은{' '}
            <Link href="/design-system/typography">
              Design System → Typography
            </Link>
            페이지를 참고하세요.
          </Body>
        </Card>
      </Section>

      {/* Border Radius */}
      <Section level="h2">
        <SectionHeading
          level="h2"
          id="border-radius"
          title="모서리 둥글기 (Border Radius)"
        >
          <Body>
            KRDS는 5단계의 border-radius를 제공하며, 최대 12px를 권장합니다.
          </Body>
        </SectionHeading>

        <Card variant="info" className="mt-4">
          <Body size="sm">
            <strong>📖 상세 내용:</strong> Border Radius의 자세한 사용법은{' '}
            <Link href="/design-system/border-radius">
              Design System → Border Radius
            </Link>
            페이지를 참고하세요.
          </Body>
        </Card>
      </Section>

      {/* Breakpoints */}
      <Section level="h2">
        <SectionHeading
          level="h2"
          id="breakpoints"
          title="반응형 (Breakpoints)"
        >
          <Body>KRDS는 모바일 우선(Mobile First) 접근 방식을 따릅니다.</Body>
        </SectionHeading>

        <Card variant="info" className="mt-4">
          <Body size="sm">
            <strong>📖 상세 내용:</strong> 반응형 브레이크포인트의 자세한
            사용법은{' '}
            <Link href="/design-system/breakpoints">
              Design System → Breakpoints
            </Link>
            페이지를 참고하세요.
          </Body>
        </Card>
      </Section>

      {/* Page Navigation */}
      <PageNavigation
        next={{ title: 'Colors', href: '/design-system/colors' }}
      />
    </>
  );
}
