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
          <Stack gap="lg" align="center" className="text-center pt-20 pb-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-krds-primary-border bg-krds-primary-surface px-4 py-1.5 text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-krds-primary-base opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-krds-primary-base"></span>
                </span>
                <span className="text-krds-primary-text font-semibold">
                  v0.2.0 Preview
                </span>
              </span>
              <span className="h-3 w-px bg-krds-gray-20"></span>
              <span className="text-krds-gray-70">
                테스트 기간 · KRDS 2.2 · WCAG 2.1 AA
              </span>
            </div>

            {/* Title */}
            <Display as="h1" className="tracking-tight !text-[60px] py-2">
              KRDS 컴포넌트, 그냥 가져다 쓰세요
            </Display>

            {/* Description */}
            <Body size="lg" className="max-w-2xl">
              KRDS 2.2 표준, 접근성은 이미 챙겼습니다
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
