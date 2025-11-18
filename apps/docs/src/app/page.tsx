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
  Heading,
} from '@hanui/react';
import { HomeLayout } from '@/components/HomeLayout';
import { ExampleShowcase } from '@/components/ExampleShowcase';

export default function Home() {
  return (
    <HomeLayout>
      <Container>
        {/* Hero Section */}
        <Section padding="page-section" as="section">
          <Stack spacing="heading-loose" align="center" className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-krds-primary-border bg-krds-primary-surface px-4 py-1.5 text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-krds-primary-base opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-krds-primary-base"></span>
                </span>
                <span className="text-krds-primary-text font-semibold">
                  v0.1.0 Beta
                </span>
              </span>
              <span className="h-3 w-px bg-krds-gray-20"></span>
              <span className="text-krds-gray-70">KRDS 2.2 준수</span>
            </div>

            {/* Title */}
            <Display size="lg" as="h1" className="tracking-tight">
              WCAG 2.1 AA와 KRDS를 <br /> 준수하는 시맨틱 React 컴포넌트
            </Display>

            {/* Description */}
            <Body size="md" className="max-w-2xl">
              접근성과 사용성을 갖춘 React 컴포넌트.
              <br className="hidden sm:block" />
              KRDS를 완벽히 준수하는 공공기관 웹사이트 개발의 시작.
            </Body>

            {/* CTA Buttons */}
            <HStack spacing="md" justify="center" className="flex-wrap">
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

        {/* Code Example Section */}
        <Section padding="content-area" as="section">
          <Stack spacing="content-loose" align="center">
            <Stack spacing="heading-tight" align="center">
              <Heading level="h2">30초 만에 시작하기</Heading>
              <Body size="md">
                CLI로 프로젝트를 생성하고 바로 개발을 시작하세요
              </Body>
            </Stack>

            <div className="rounded-lg border border-krds-gray-20 bg-krds-gray-95 overflow-hidden shadow-2xl w-full">
              <div className="border-b border-krds-gray-80 px-4 py-2.5 bg-krds-gray-90">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-krds-danger-50" />
                    <div className="w-3 h-3 rounded-full bg-krds-warning-30" />
                    <div className="w-3 h-3 rounded-full bg-krds-success-50" />
                  </div>
                  <span className="text-xs text-krds-gray-60 ml-3 font-medium">
                    Terminal
                  </span>
                </div>
              </div>
              <div className="p-6 bg-krds-gray-95">
                <pre className="text-sm text-krds-gray-10 font-mono leading-relaxed">
                  <code>
                    <span className="text-krds-gray-50">
                      # HANUI 프로젝트 생성
                    </span>
                    {'\n'}
                    <span className="text-krds-success-50">$</span>{' '}
                    <span className="text-krds-primary-60">pnpm</span> create
                    hanui-app my-project
                    {'\n\n'}
                    <span className="text-krds-gray-50"># 개발 서버 시작</span>
                    {'\n'}
                    <span className="text-krds-success-50">$</span>{' '}
                    <span className="text-krds-primary-60">cd</span> my-project
                    {'\n'}
                    <span className="text-krds-success-50">$</span>{' '}
                    <span className="text-krds-primary-60">pnpm</span> dev
                    {'\n\n'}
                    <span className="text-krds-gray-50"># 컴포넌트 사용</span>
                    {'\n'}
                    <span className="text-krds-accent-50">import</span> {'{ '}
                    <span className="text-krds-warning-30">Button</span>
                    {' }'} <span className="text-krds-accent-50">from</span>{' '}
                    <span className="text-krds-success-50">
                      &apos;@hanui/react&apos;
                    </span>
                    ;{'\n\n'}
                    <span className="text-krds-accent-50">function</span>{' '}
                    <span className="text-krds-warning-30">App</span>() {'{'}
                    {'\n  '}
                    <span className="text-krds-accent-50">return</span> {'<'}
                    <span className="text-krds-primary-60">Button</span>
                    {'>클릭하세요</'}
                    <span className="text-krds-primary-60">Button</span>
                    {'>'};{'\n}'}
                  </code>
                </pre>
              </div>
            </div>
          </Stack>
        </Section>
      </Container>
    </HomeLayout>
  );
}
