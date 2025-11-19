'use client';

import { Stack, Heading, Body } from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

export default function BorderRadiusPage() {
  return (
    <>
      <PageHeader
        title="Border Radius"
        description="KRDS 기반 모서리 둥글기 시스템 - 표준형 스타일과 확장형 스타일"
      />

      <PageSection>
        <Heading level="h2" id="overview">
          개요
        </Heading>

        <Stack gap="lg" className="mt-2 md:mt-4">
          <Body>
            형태는 브랜드의 시각적 아이덴티티를 표현하는 중요한 요소로, UI
            요소에 적용되는 둥글기 값인 radius를 통해 버튼, 카드, 컨테이너,
            이미지 등에 고유한 느낌과 분위기를 만들어냅니다.
          </Body>

          <div className="p-4 bg-krds-primary-5 border border-krds-primary-20 rounded-lg">
            <h3 className="text-heading-sm font-semibold mb-2">
              KRDS 공식 가이드
            </h3>
            <Body size="sm">
              <a
                href="https://www.krds.go.kr/html/site/style/style_04.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-krds-primary-base hover:underline"
              >
                KRDS 형태(Border Radius) 가이드 →
              </a>
            </Body>
          </div>
        </Stack>
      </PageSection>

      {/* 표준형 스타일 */}
      <PageSection>
        <Heading level="h2" id="standard-style">
          표준형 스타일
        </Heading>

        <Stack gap="lg" className="mt-2 md:mt-4">
          <Body>
            표준형 스타일은 Xsmall-Small-Medium-Large-Xlarge 5단계로 구성되며,
            각 레벨은 컴포넌트의 사이즈로 구분됩니다. 각 레벨은 함께 사용할
            빈도가 높은 컴포넌트의 묶음으로 같은 형태의 radius 적용이
            필요합니다.
          </Body>

          <Body size="sm">
            표준형 스타일은 2px~12px의 radius 값을 사용하며, 이는 정부가 주는
            신뢰감과 안정감, 친근함을 표현하기 위한 radius 값입니다. 과하게 둥근
            형태로 변형되는 것을 방지하기 위해 radius 최댓값을 12px로
            설정합니다.
          </Body>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-krds-gray-5">
                  <th className="border border-krds-gray-20 px-4 py-2 text-left text-body-sm font-semibold">
                    Level
                  </th>
                  <th className="border border-krds-gray-20 px-4 py-2 text-left text-body-sm font-semibold">
                    Radius
                  </th>
                  <th className="border border-krds-gray-20 px-4 py-2 text-left text-body-sm font-semibold">
                    Container Size
                  </th>
                  <th className="border border-krds-gray-20 px-4 py-2 text-left text-body-sm font-semibold">
                    적용 컴포넌트
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-krds-gray-20 px-4 py-2">
                    <code className="text-body-xs text-krds-primary-text">
                      Xsmall
                    </code>
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    2px
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    8×8, 12×12, 16×16
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    Element (인디케이터, 배지, 프로그레스 바)
                  </td>
                </tr>
                <tr>
                  <td className="border border-krds-gray-20 px-4 py-2">
                    <code className="text-body-xs text-krds-primary-text">
                      Small
                    </code>
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    4px
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    20×20, 24×24, 32×32
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    Chips, Checkbox, Radio button, Switch, Tag
                  </td>
                </tr>
                <tr>
                  <td className="border border-krds-gray-20 px-4 py-2">
                    <code className="text-body-xs text-krds-primary-text">
                      Medium
                    </code>
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    6px
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    40×40, 48×48
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    Button, Input, Select, Textarea
                  </td>
                </tr>
                <tr>
                  <td className="border border-krds-gray-20 px-4 py-2">
                    <code className="text-body-xs text-krds-primary-text">
                      Large
                    </code>
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    8px
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    56×56, 64×64
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    Card, Container, Image
                  </td>
                </tr>
                <tr>
                  <td className="border border-krds-gray-20 px-4 py-2">
                    <code className="text-body-xs text-krds-primary-text">
                      Xlarge
                    </code>
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    10px
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    72×72, 80×80
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    Large Card, Panel
                  </td>
                </tr>
                <tr>
                  <td className="border border-krds-gray-20 px-4 py-2">
                    <code className="text-body-xs text-krds-primary-text">
                      Max
                    </code>
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    12px
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    96×96, 120×120
                  </td>
                  <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                    Banner, Dialog, Bottom sheet
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4">
            <div>
              <Heading level="h3" className="mb-3">
                radius 시각적 예시
              </Heading>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 bg-krds-white border border-krds-gray-20 rounded-lg">
                  <div className="w-16 h-16 bg-krds-primary-base rounded-[2px] mb-2"></div>
                  <code className="text-body-xs text-krds-primary-text">
                    rounded-[2px]
                  </code>
                  <p className="text-body-xs text-krds-gray-70 mt-1">
                    Xsmall - 2px
                  </p>
                </div>
                <div className="p-4 bg-krds-white border border-krds-gray-20 rounded-lg">
                  <div className="w-16 h-16 bg-krds-primary-base rounded-sm mb-2"></div>
                  <code className="text-body-xs text-krds-primary-text">
                    rounded-sm
                  </code>
                  <p className="text-body-xs text-krds-gray-70 mt-1">
                    Small - 4px
                  </p>
                </div>
                <div className="p-4 bg-krds-white border border-krds-gray-20 rounded-lg">
                  <div className="w-16 h-16 bg-krds-primary-base rounded-md mb-2"></div>
                  <code className="text-body-xs text-krds-primary-text">
                    rounded-md
                  </code>
                  <p className="text-body-xs text-krds-gray-70 mt-1">
                    Medium - 6px
                  </p>
                </div>
                <div className="p-4 bg-krds-white border border-krds-gray-20 rounded-lg">
                  <div className="w-16 h-16 bg-krds-primary-base rounded-lg mb-2"></div>
                  <code className="text-body-xs text-krds-primary-text">
                    rounded-lg
                  </code>
                  <p className="text-body-xs text-krds-gray-70 mt-1">
                    Large - 8px
                  </p>
                </div>
                <div className="p-4 bg-krds-white border border-krds-gray-20 rounded-lg">
                  <div className="w-16 h-16 bg-krds-primary-base rounded-xl mb-2"></div>
                  <code className="text-body-xs text-krds-primary-text">
                    rounded-xl
                  </code>
                  <p className="text-body-xs text-krds-gray-70 mt-1">
                    Xlarge - 10px
                  </p>
                </div>
                <div className="p-4 bg-krds-white border border-krds-gray-20 rounded-lg">
                  <div className="w-16 h-16 bg-krds-primary-base rounded-2xl mb-2"></div>
                  <code className="text-body-xs text-krds-primary-text">
                    rounded-2xl
                  </code>
                  <p className="text-body-xs text-krds-gray-70 mt-1">
                    Max - 12px
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Stack>
      </PageSection>

      {/* 계산법 */}
      <PageSection>
        <Heading level="h2" id="calculation">
          표준형 스타일 radius 계산법
        </Heading>

        <Stack gap="lg" className="mt-2 md:mt-4">
          <Body>
            표준형 스타일의 radius는 컨테이너 높이에 비율을 적용하여 계산합니다.
          </Body>

          <div className="p-4 bg-krds-white border border-krds-gray-20 rounded-lg">
            <Heading level="h3" className="mb-3">
              계산 공식
            </Heading>
            <div className="space-y-2">
              <div className="p-3 bg-krds-gray-5 rounded">
                <code className="text-body-sm">
                  컨테이너 높이 × 비율 1/8 (0.125) = radius
                </code>
              </div>
              <div className="p-3 bg-krds-gray-5 rounded">
                <code className="text-body-sm">radius 결과값 반올림</code>
              </div>
            </div>
          </div>

          <div className="p-4 bg-krds-warning-5 border border-krds-warning-20 rounded-lg">
            <Heading level="h3" className="mb-2 text-krds-warning-text">
              계산 시 주의 사항
            </Heading>
            <ul className="text-body-sm text-krds-gray-70 space-y-2">
              <li>
                계산한 radius 값을 반올림했을 때 홀수인 경우, 숫자가 더 높은
                짝수로 변경합니다.
              </li>
              <li>
                높이(12) × 비율(0.125) = 1.5일 때 radius는 <strong>2</strong>로
                적용합니다.
              </li>
              <li>
                높이(20) × 비율(0.125) = 2.5일 때 radius는 <strong>4</strong>로
                적용합니다.
              </li>
              <li>
                높이(120) × 비율(0.125) = 15일 때 radius는 max 값인{' '}
                <strong>12</strong>로 적용합니다.
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <Heading level="h3">계산 예시</Heading>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-krds-gray-5">
                    <th className="border border-krds-gray-20 px-4 py-2 text-left text-body-sm font-semibold">
                      컨테이너 높이
                    </th>
                    <th className="border border-krds-gray-20 px-4 py-2 text-left text-body-sm font-semibold">
                      계산식
                    </th>
                    <th className="border border-krds-gray-20 px-4 py-2 text-left text-body-sm font-semibold">
                      결과
                    </th>
                    <th className="border border-krds-gray-20 px-4 py-2 text-left text-body-sm font-semibold">
                      적용 radius
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                      8px
                    </td>
                    <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                      8 × 0.125
                    </td>
                    <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                      1.0
                    </td>
                    <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                      2px (짝수로 조정)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                      20px
                    </td>
                    <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                      20 × 0.125
                    </td>
                    <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                      2.5
                    </td>
                    <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                      4px (짝수로 조정)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                      40px
                    </td>
                    <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                      40 × 0.125
                    </td>
                    <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                      5.0
                    </td>
                    <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                      6px (짝수로 조정)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                      64px
                    </td>
                    <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                      64 × 0.125
                    </td>
                    <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                      8.0
                    </td>
                    <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                      8px
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                      80px
                    </td>
                    <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                      80 × 0.125
                    </td>
                    <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                      10.0
                    </td>
                    <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                      10px
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                      120px
                    </td>
                    <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                      120 × 0.125
                    </td>
                    <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                      15.0
                    </td>
                    <td className="border border-krds-gray-20 px-4 py-2 text-body-sm">
                      12px (max 값)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Stack>
      </PageSection>

      {/* 확장형 스타일 */}
      <PageSection>
        <Heading level="h2" id="extended-style">
          확장형 스타일
        </Heading>

        <Stack gap="lg" className="mt-2 md:mt-4">
          <Body>
            각 기관의 아이덴티티에 맞게 커스터마이즈된 radius 값을 설정할 수
            있습니다. 1px 이상의 radius 값을 사용할 때는 표준형 스타일의 계층
            구조를 참고하여 일관성을 유지합니다.
          </Body>

          <div className="p-4 bg-krds-white border border-krds-gray-20 rounded-lg">
            <Heading level="h3" className="mb-3">
              radius 비율에 맞게 적용하는 방법
            </Heading>
            <div className="space-y-3">
              <Body size="sm">
                <strong>컨테이너 높이 × 비율 = radius 값</strong>
              </Body>
              <ol className="list-decimal list-inside space-y-2 text-body-sm text-krds-gray-70">
                <li>
                  기준이 되는 컴포넌트를 기관에 맞는 radius 값을 테스트하여 비율
                  값을 찾습니다.
                </li>
                <li>
                  그 비율로 사용되는 컴포넌트 높이 값 기준으로 radius 값을
                  적용합니다.
                </li>
              </ol>
            </div>
          </div>

          <div className="p-4 bg-krds-warning-5 border border-krds-warning-20 rounded-lg">
            <Heading level="h3" className="mb-2 text-krds-warning-text">
              주의 사항
            </Heading>
            <ul className="text-body-sm text-krds-gray-70 space-y-2">
              <li>
                디자인 시스템에서 radius 값은 짝수로 사용하는 것을 권장합니다.
              </li>
              <li>
                컨테이너와 비율을 계산 후 나온 수치가 홀수이거나 소수점으로 나올
                시 함께 사용될 컴포넌트를 고려하여 근사치에 맞게 올림 하여
                짝수의 값을 사용합니다.
              </li>
            </ul>
          </div>
        </Stack>
      </PageSection>

      {/* 표현 방법 */}
      <PageSection>
        <Heading level="h2" id="expression">
          표현 방법
        </Heading>

        <Stack gap="lg" className="mt-2 md:mt-4">
          <Body>radius 값은 px와 % 단위로 설정할 수 있습니다.</Body>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-krds-white border border-krds-gray-20 rounded-lg">
              <Heading level="h3" className="mb-2">
                px 값 사용
              </Heading>
              <Body size="sm" className="mb-3">
                버튼이나 입력 필드 같은 요소는 크기에 맞는 일관된 둥글기 설정이
                중요하므로 px 단위로 설정합니다.
              </Body>
              <CodeBlock
                code={`<button className="rounded-md">Button</button>
<input className="rounded-md" />
<div className="rounded-lg">Card</div>`}
                language="tsx"
                showLineNumbers={false}
              />
            </div>

            <div className="p-4 bg-krds-white border border-krds-gray-20 rounded-lg">
              <Heading level="h3" className="mb-2">
                % 값 사용
              </Heading>
              <Body size="sm" className="mb-3">
                프로필 사진처럼 완전한 원형이 필요한 경우 % 값을 사용하여 더
                직관적으로 설정할 수 있습니다.
              </Body>
              <CodeBlock
                code={`<img className="rounded-full" />
<div className="rounded-[50%]">Circle</div>`}
                language="tsx"
                showLineNumbers={false}
              />
            </div>
          </div>

          <div className="p-4 bg-krds-warning-5 border border-krds-warning-20 rounded-lg">
            <Heading level="h3" className="mb-2 text-krds-warning-text">
              전체 radius를 % 설정 시 주의 사항
            </Heading>
            <ul className="text-body-sm text-krds-gray-70 space-y-2">
              <li>
                <strong>비율 변동:</strong> 컴포넌트마다 크기 비율이 달라지므로
                radius 값 조정이 어려울 수 있습니다.
              </li>
              <li>
                <strong>텍스트 일관성 부족:</strong> % 단위로 설정하면 UI
                요소마다 radius 값이 일정하지 않아 디자인의 일관성을 유지하기
                어렵습니다.
              </li>
              <li>
                <strong>작은 컴포넌트:</strong> 작은 컴포넌트에 50%를 적용하면
                지나치게 둥글어져 의도와 다른 디자인 결과가 나올 수 있습니다.
              </li>
            </ul>
          </div>
        </Stack>
      </PageSection>

      {/* 사용 가이드 */}
      <PageSection>
        <Heading level="h2" id="usage-guide">
          사용 가이드
        </Heading>

        <Stack gap="lg" className="mt-2 md:mt-4">
          <div className="space-y-6">
            <div>
              <Heading level="h3" className="mb-3">
                비율
              </Heading>
              <Body className="mb-4">
                컨테이너 사이즈가 커지면 radius값도 비율에 맞게 적용합니다.
              </Body>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-krds-success-5 border border-krds-success-20 rounded-lg">
                  <Heading level="h4" className="mb-2 text-krds-success-text">
                    모범 사례
                  </Heading>
                  <ComponentPreview>
                    <div className="space-y-3">
                      <button className="h-10 px-4 bg-krds-primary-base text-white rounded-md">
                        작은 버튼 (6px)
                      </button>
                      <button className="h-16 px-6 bg-krds-primary-base text-white rounded-lg">
                        큰 버튼 (8px)
                      </button>
                    </div>
                  </ComponentPreview>
                </div>
                <div className="p-4 bg-krds-danger-5 border border-krds-danger-20 rounded-lg">
                  <Heading level="h4" className="mb-2 text-krds-danger-text">
                    피해야 할 사례
                  </Heading>
                  <ComponentPreview>
                    <div className="space-y-3">
                      <button className="h-10 px-4 bg-krds-primary-base text-white rounded-md">
                        작은 버튼 (6px)
                      </button>
                      <button className="h-16 px-6 bg-krds-primary-base text-white rounded-md">
                        큰 버튼 (동일한 6px)
                      </button>
                    </div>
                  </ComponentPreview>
                </div>
              </div>
            </div>

            <div>
              <Heading level="h3" className="mb-3">
                동일한 radius 적용
              </Heading>
              <Body className="mb-4">
                비슷한 크기의 구성 요소는 동일한 radius를 적용하면 디자인의
                통일성과 조화로움을 높일 수 있습니다.
              </Body>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-krds-success-5 border border-krds-success-20 rounded-lg">
                  <Heading level="h4" className="mb-2 text-krds-success-text">
                    모범 사례
                  </Heading>
                  <ComponentPreview>
                    <div className="flex gap-3">
                      <input
                        className="h-10 px-3 border border-krds-gray-20 rounded-md"
                        placeholder="Input"
                      />
                      <button className="h-10 px-4 bg-krds-primary-base text-white rounded-md">
                        Button
                      </button>
                    </div>
                  </ComponentPreview>
                </div>
                <div className="p-4 bg-krds-danger-5 border border-krds-danger-20 rounded-lg">
                  <Heading level="h4" className="mb-2 text-krds-danger-text">
                    피해야 할 사례
                  </Heading>
                  <ComponentPreview>
                    <div className="flex gap-3">
                      <input
                        className="h-10 px-3 border border-krds-gray-20 rounded-md"
                        placeholder="Input"
                      />
                      <button className="h-10 px-4 bg-krds-primary-base text-white rounded-lg">
                        Button (다른 radius)
                      </button>
                    </div>
                  </ComponentPreview>
                </div>
              </div>
            </div>

            <div>
              <Heading level="h3" className="mb-3">
                Tailwind 클래스 사용
              </Heading>
              <Body className="mb-4">
                HANUI는 KRDS 표준형 스타일을 Tailwind 클래스로 제공합니다.
              </Body>
              <CodeBlock
                code={`// 표준형 스타일
<div className="rounded-[2px]">Xsmall - 2px</div>
<div className="rounded-sm">Small - 4px</div>
<div className="rounded-md">Medium - 6px</div>
<div className="rounded-lg">Large - 8px</div>
<div className="rounded-xl">Xlarge - 10px</div>
<div className="rounded-2xl">Max - 12px</div>

// 완전한 원형
<div className="rounded-full">Circle</div>

// 커스텀 값
<div className="rounded-[14px]">Custom 14px</div>`}
                language="tsx"
                showLineNumbers={false}
              />
            </div>
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
            href="https://www.krds.go.kr/html/site/style/style_04.html"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-krds-white border border-krds-gray-20 rounded-lg hover:border-krds-primary-base transition-colors"
          >
            <h4 className="font-semibold mb-1">
              KRDS 형태(Border Radius) 가이드
            </h4>
            <p className="text-body-sm text-krds-gray-70">
              표준형 스타일, 확장형 스타일, 사용 가이드
            </p>
          </a>

          <a
            href="https://www.figma.com/@krds"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-krds-white border border-krds-gray-20 rounded-lg hover:border-krds-primary-base transition-colors"
          >
            <h4 className="font-semibold mb-1">KRDS Figma 라이브러리</h4>
            <p className="text-body-sm text-krds-gray-70">
              공식 디자인 토큰 및 컴포넌트
            </p>
          </a>

          <a
            href="https://github.com/KRDS-uiux/krds-uiux"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-krds-white border border-krds-gray-20 rounded-lg hover:border-krds-primary-base transition-colors"
          >
            <h4 className="font-semibold mb-1">KRDS GitHub</h4>
            <p className="text-body-sm text-krds-gray-70">
              공식 토큰 및 컴포넌트 소스코드
            </p>
          </a>
        </div>
      </PageSection>
    </>
  );
}
