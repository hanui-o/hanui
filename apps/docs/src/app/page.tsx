'use client';

import Link from 'next/link';
import {
  Button,
  Container,
  Stack,
  HStack,
  Section,
  Display,
  Body,
} from '@hanui/react';
import { HomeLayout } from '@/components/HomeLayout';
import { ExampleShowcase } from '@/components/ExampleShowcase';
import { useFramework } from '@/components/FrameworkTabs';

export default function Home() {
  const { framework } = useFramework();
  const isVue = framework === 'vue';

  return (
    <HomeLayout>
      <Container>
        {/* Hero Section */}
        <Section padding="page-section" as="section">
          <Stack gap="lg" align="center" className="text-center pt-20 pb-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-krds-primary-border bg-krds-primary-surface px-4 py-1.5 text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-krds-primary-base opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-krds-primary-base"></span>
                </span>
                <span className="text-krds-primary-text font-semibold">
                  {isVue ? 'v0.1.0 Preview' : 'v0.2.0 Preview'}
                </span>
              </span>
              <span className="h-3 w-px bg-krds-gray-20"></span>
              <span className="text-krds-gray-70">
                테스트 기간 · KRDS 2.2 · WCAG 2.1 AA
              </span>
            </div>

            {/* Title */}
            <Display as="h1" className="tracking-tight !text-[60px] py-2">
              {isVue ? (
                <>
                  Vue 3 / Nuxt 3를 위한
                  <br />
                  KRDS 기반 Vue 컴포넌트
                </>
              ) : (
                <>
                  전자정부프레임워크 v5를 위한
                  <br />
                  KRDS 기반 React 컴포넌트
                </>
              )}
            </Display>

            {/* Description */}
            <Body size="lg" className="text-krds-gray-70">
              {isVue ? (
                <>
                  Vue 3 + Nuxt 3 환경에 최적화.
                  <br />
                  KRDS 2.2 디자인 시스템과 WCAG 2.1 AA 접근성을 갖춘 125+
                  컴포넌트를 복사해서 바로 쓰세요.
                </>
              ) : (
                <>
                  eGovFrame 5.0 + Next.js 14 환경에 최적화.
                  <br />
                  KRDS 2.2 디자인 시스템과 WCAG 2.1 AA 접근성을 갖춘 50+
                  컴포넌트를 복사해서 바로 쓰세요.
                </>
              )}
            </Body>

            {/* CTA Buttons */}
            <HStack gap="md" justify="center" className="flex-wrap mt-8">
              <Link href="/docs/quick-start">
                <Button variant="black" size="md">
                  Get Started
                </Button>
              </Link>
              <Link href="/components">
                <Button variant="ghost" size="md">
                  View Components
                </Button>
              </Link>
            </HStack>
          </Stack>
        </Section>

        {/* Example Showcase Section */}
        <Section padding="content-area" as="section">
          <ExampleShowcase />
        </Section>
      </Container>
    </HomeLayout>
  );
}
