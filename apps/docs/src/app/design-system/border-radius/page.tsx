'use client';

import { Stack, Heading, Body } from '@hanui/react';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

export default function BorderRadiusPage() {
  return (
    <>
      <PageHeader
        title="Border Radius"
        description="KRDS 기반 모서리 둥글기 시스템"
      />

      <PageSection>
        <Heading level="h2" id="overview">
          개요
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Body>
            KRDS는 5단계의 border-radius를 제공하며, 최대 12px를 권장합니다.
          </Body>
        </Stack>
      </PageSection>

      <PageSection>
        <Heading level="h2" id="scale">
          Border Radius 스케일
        </Heading>

        <Stack spacing="heading-content" className="mt-2 md:mt-4">
          <div className="space-y-4">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-krds-primary-base rounded-sm"></div>
              <div>
                <code className="text-sm bg-krds-gray-5 px-2 py-1 rounded">
                  rounded-sm
                </code>
                <p className="text-sm text-krds-gray-70 mt-1">
                  4px - 작은 요소 (Badge, Tag)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-krds-primary-base rounded-md"></div>
              <div>
                <code className="text-sm bg-krds-gray-5 px-2 py-1 rounded">
                  rounded-md
                </code>
                <p className="text-sm text-krds-gray-70 mt-1">
                  6px - 기본값 (Button, Input)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-krds-primary-base rounded-lg"></div>
              <div>
                <code className="text-sm bg-krds-gray-5 px-2 py-1 rounded">
                  rounded-lg
                </code>
                <p className="text-sm text-krds-gray-70 mt-1">
                  10px - 큰 요소 (Card, Modal)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-krds-primary-base rounded-xl"></div>
              <div>
                <code className="text-sm bg-krds-gray-5 px-2 py-1 rounded">
                  rounded-xl
                </code>
                <p className="text-sm text-krds-gray-70 mt-1">12px - 최대값</p>
              </div>
            </div>
          </div>
        </Stack>
      </PageSection>
    </>
  );
}
