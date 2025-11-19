'use client';

import { Stack, Heading, Body } from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

export default function BreakpointsPage() {
  return (
    <>
      <PageHeader
        title="Breakpoints"
        description="KRDS 기반 반응형 브레이크포인트 시스템"
      />

      <PageSection>
        <Heading level="h2" id="overview">
          개요
        </Heading>

        <Stack gap="lg" className="mt-2 md:mt-4">
          <Body>
            브레이크포인트는 화면 크기에 따라 레이아웃이 변경되는 지점으로,
            인터페이스가 다양한 화면 크기에 맞춰 자연스럽게 적응할 수 있게
            합니다. 브레이크포인트의 단계는 최소 3단계에서 6단계로 설정하여
            사용합니다.
          </Body>

          <div className="p-4 bg-krds-primary-5 border border-krds-primary-20 rounded-lg">
            <h3 className="text-heading-sm font-semibold mb-2">
              KRDS 공식 가이드
            </h3>
            <Body size="sm">
              <a
                href="https://www.krds.go.kr/html/site/style/style_05.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-krds-primary-base hover:underline"
              >
                KRDS 레이아웃 가이드 →
              </a>
            </Body>
          </div>
        </Stack>
      </PageSection>

      <PageSection>
        <Heading level="h2" id="breakpoint-scale">
          브레이크포인트 스케일
        </Heading>

        <Stack gap="lg" className="mt-2 md:mt-4">
          <Body>
            KRDS는 모바일 우선(Mobile First) 접근 방식을 따릅니다. 각
            브레이크포인트는 그리드 시스템과 함께 사용되어 일관된 레이아웃을
            제공합니다.
          </Body>

          <div className="p-4 bg-krds-primary-5 border border-krds-primary-20 rounded-lg">
            <Heading level="h3" className="mb-2">
              하이브리드 브레이크포인트 시스템
            </Heading>
            <Body size="sm" className="text-krds-gray-70 mb-3">
              HANUI는 Tailwind 기본값과 KRDS 브레이크포인트를 모두 지원하는
              하이브리드 방식을 사용합니다. 국제 표준과의 호환성을 유지하면서
              KRDS 요구사항도 충족합니다.
            </Body>
            <div className="space-y-2 text-body-xs text-krds-gray-70">
              <div>
                <strong className="text-krds-primary-text">xs (360px):</strong>{' '}
                KRDS small 기준으로 추가되었습니다. 국제적인 표준(Tailwind
                기본값)과의 호환성을 위해 기존{' '}
                <code className="text-xs bg-krds-white px-1 py-0.5 rounded">
                  sm
                </code>
                을 640px로 유지하고, KRDS 요구사항인 360px는{' '}
                <code className="text-xs bg-krds-white px-1 py-0.5 rounded">
                  xs
                </code>
                로 추가했습니다.
              </div>
              <div>
                <strong className="text-krds-primary-text">
                  sm, md, lg, xl:
                </strong>{' '}
                Tailwind 기본값을 그대로 유지합니다 (640px, 768px, 1024px,
                1280px). 이는 국제 표준과의 호환성과 외부 라이브러리와의
                호환성을 보장합니다.
              </div>
              <div>
                <strong className="text-krds-primary-text">
                  2xl (1440px):
                </strong>{' '}
                Tailwind 기본값은 1536px이지만, KRDS xxlarge 기준인 1440px로
                변경했습니다. 이는 KRDS 권장 최대 너비와 일치하며, 정부 사이트
                표준을 준수합니다.
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-krds-gray-5">
                  <th className="border border-krds-gray-20 px-4 py-2 text-left text-body-sm font-semibold">
                    브레이크포인트
                  </th>
                  <th className="border border-krds-gray-20 px-4 py-2 text-left text-body-sm font-semibold">
                    뷰포트
                  </th>
                  <th className="border border-krds-gray-20 px-4 py-2 text-left text-body-sm font-semibold">
                    칼럼 수 (적정-최대)
                  </th>
                  <th className="border border-krds-gray-20 px-4 py-2 text-left text-body-sm font-semibold">
                    가터 너비 (최소-적정)
                  </th>
                  <th className="border border-krds-gray-20 px-4 py-2 text-left text-body-sm font-semibold">
                    최소 스크린 마진
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-krds-gray-20 px-4 py-2">
                    <code className="text-body-xs text-krds-primary-text">
                      xs
                    </code>
                    <span className="text-body-xs text-krds-gray-70 ml-1">
                      (KRDS)
                    </span>
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    360px-
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    4-6
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    16px - 16px
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    16px
                  </td>
                </tr>
                <tr>
                  <td className="border border-krds-gray-20 px-4 py-2">
                    <code className="text-body-xs text-krds-primary-text">
                      sm
                    </code>
                    <span className="text-body-xs text-krds-gray-70 ml-1">
                      (Tailwind)
                    </span>
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    640px-
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    -
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    -
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    -
                  </td>
                </tr>
                <tr>
                  <td className="border border-krds-gray-20 px-4 py-2">
                    <code className="text-body-xs text-krds-primary-text">
                      md
                    </code>
                    <span className="text-body-xs text-krds-gray-70 ml-1">
                      (KRDS/Tailwind)
                    </span>
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    768px-
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    8-12
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    16px - 24px
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    24px
                  </td>
                </tr>
                <tr>
                  <td className="border border-krds-gray-20 px-4 py-2">
                    <code className="text-body-xs text-krds-primary-text">
                      lg
                    </code>
                    <span className="text-body-xs text-krds-gray-70 ml-1">
                      (KRDS/Tailwind)
                    </span>
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    1024px-
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    12-16
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    16px - 24px
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    24px
                  </td>
                </tr>
                <tr>
                  <td className="border border-krds-gray-20 px-4 py-2">
                    <code className="text-body-xs text-krds-primary-text">
                      xl
                    </code>
                    <span className="text-body-xs text-krds-gray-70 ml-1">
                      (KRDS/Tailwind)
                    </span>
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    1280px-
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    -
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    -
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    -
                  </td>
                </tr>
                <tr>
                  <td className="border border-krds-gray-20 px-4 py-2">
                    <code className="text-body-xs text-krds-primary-text">
                      2xl
                    </code>
                    <span className="text-body-xs text-krds-gray-70 ml-1">
                      (KRDS)
                    </span>
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    1440px-
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    -
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    -
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    -
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-krds-warning-5 border border-krds-warning-20 rounded-lg">
            <Heading level="h3" className="mb-2 text-krds-warning-text">
              브레이크포인트 선택 가이드
            </Heading>
            <ul className="text-body-sm text-krds-gray-70 space-y-2">
              <li>
                브레이크포인트 단계가 적을수록 관리와 개발이 용이하지만 세분화가
                어려울 수 있습니다.
              </li>
              <li>
                단계가 많아질수록 디자인 세분화가 가능하지만 복잡성은
                증가합니다.
              </li>
              <li>
                프로젝트의 요구사항에 따라 최소 3단계에서 6단계로 설정하여
                사용합니다.
              </li>
            </ul>
          </div>

          <div className="p-4 bg-krds-success-5 border border-krds-success-20 rounded-lg">
            <Heading level="h3" className="mb-2 text-krds-success-text">
              사용 가이드
            </Heading>
            <div className="space-y-3 text-body-sm text-krds-gray-70">
              <div>
                <strong>KRDS 정부 사이트:</strong>{' '}
                <code className="text-xs bg-krds-white px-1 py-0.5 rounded">
                  xs:
                </code>
                를 사용하여 360px 이상의 모바일 기기를 지원합니다.
              </div>
              <div>
                <strong>일반 웹사이트:</strong>{' '}
                <code className="text-xs bg-krds-white px-1 py-0.5 rounded">
                  sm:
                </code>
                부터 사용하여 Tailwind 표준을 따릅니다.
              </div>
              <div>
                <strong>공통 브레이크포인트:</strong>{' '}
                <code className="text-xs bg-krds-white px-1 py-0.5 rounded">
                  md:
                </code>
                ,{' '}
                <code className="text-xs bg-krds-white px-1 py-0.5 rounded">
                  lg:
                </code>
                ,{' '}
                <code className="text-xs bg-krds-white px-1 py-0.5 rounded">
                  xl:
                </code>
                는 KRDS와 Tailwind가 동일하므로 어느 프로젝트에서나 사용
                가능합니다.
              </div>
            </div>
          </div>
        </Stack>
      </PageSection>

      <PageSection>
        <Heading level="h2" id="example">
          반응형 그리드 예시
        </Heading>

        <Stack gap="sm" className="mt-2 md:mt-4">
          <ComponentPreview>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-krds-primary-surface rounded-lg text-center">
                1
              </div>
              <div className="p-4 bg-krds-primary-surface rounded-lg text-center">
                2
              </div>
              <div className="p-4 bg-krds-primary-surface rounded-lg text-center">
                3
              </div>
            </div>
          </ComponentPreview>
          <div className="mt-4">
            <CodeBlock
              code={`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 모바일: 1열, 태블릿: 2열, 데스크톱: 3열 */}
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </Stack>
      </PageSection>

      {/* Reference */}
      <PageSection>
        <Heading level="h2" id="reference">
          참고 자료
        </Heading>

        <div className="space-y-3 mt-2 md:mt-4">
          <a
            href="https://www.krds.go.kr/html/site/style/style_05.html"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-krds-white border border-krds-gray-20 rounded-lg hover:border-krds-primary-base transition-colors"
          >
            <h4 className="font-semibold mb-1">KRDS 레이아웃 가이드</h4>
            <p className="text-krds-gray-70">
              간격, 그리드, 브레이크포인트 기준
            </p>
          </a>
        </div>
      </PageSection>
    </>
  );
}
