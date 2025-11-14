import { Identifier, Stack, Heading, Body } from '@hanui/react';
import { CodeBlock } from '@/components/content/CodeBlock';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { GuidelineSection } from '@/components/content/GuidelineSection';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

export default function IdentifierPage() {
  return (
    <>
      {/* Header */}
      <PageHeader
        title="Identifier (운영기관 식별자)"
        description="정부 디지털 서비스의 운영 기관을 식별하여 신뢰성을 구축하는 컴포넌트입니다. Footer 내 최종 콘텐츠 섹션으로 배치되어 서비스의 일관성과 브랜드를 확인할 수 있게 합니다."
      />

      {/* Usage Examples */}
      <PageSection>
        <Heading level="h2" id="examples" className="text-2xl font-semibold">
          예제
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* Basic Example */}
          <Stack spacing="heading-tight">
            <Heading level="h3">기본 사용 (Light Variant)</Heading>
            <Body>
              기본 Identifier는 라이트 배경에 기관 이름을 표시합니다. Footer 내
              최종 섹션으로 배치해야 합니다.
            </Body>
            <div>
              <ComponentPreview>
                <div className="w-full">
                  <Identifier organizationName="행정안전부" />
                </div>
              </ComponentPreview>

              <div className="mt-4">
                <CodeBlock
                  language="tsx"
                  code={`import { Identifier } from '@hanui/react';

<Identifier organizationName="행정안전부" />`}
                />
              </div>
            </div>
          </Stack>

          {/* With Logo */}
          <Stack spacing="heading-tight">
            <Heading level="h3">로고와 함께 사용 (권장)</Heading>
            <Body>
              운영 기관의 로고를 포함하여 시각적 식별성을 강화합니다. 로고
              이미지는 반드시 alt 텍스트를 제공해야 합니다.
            </Body>
            <div>
              <ComponentPreview>
                <div className="w-full">
                  <Identifier
                    organizationName="행정안전부"
                    logo="https://via.placeholder.com/120x32?text=Logo"
                    logoAlt="행정안전부 로고"
                  />
                </div>
              </ComponentPreview>

              <div className="mt-4">
                <CodeBlock
                  language="tsx"
                  code={`import { Identifier } from '@hanui/react';

<Identifier
  organizationName="행정안전부"
  logo="/path/to/logo.png"
  logoAlt="행정안전부 로고"
/>`}
                />
              </div>
            </div>
          </Stack>

          {/* Dark Variant */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Dark Variant</Heading>
            <Body>다크 배경 테마에 맞춘 variant를 사용할 수 있습니다.</Body>
            <div>
              <ComponentPreview>
                <div className="w-full">
                  <Identifier
                    organizationName="행정안전부"
                    logo="https://via.placeholder.com/120x32?text=Logo"
                    logoAlt="행정안전부 로고"
                    variant="dark"
                  />
                </div>
              </ComponentPreview>

              <div className="mt-4">
                <CodeBlock
                  language="tsx"
                  code={`import { Identifier } from '@hanui/react';

<Identifier
  organizationName="행정안전부"
  logo="/logo.png"
  logoAlt="행정안전부 로고"
  variant="dark"
/>`}
                />
              </div>
            </div>
          </Stack>

          {/* In Footer */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Footer 구조 내 배치 (권장)</Heading>
            <Body>
              실제 정부 누리집에서 Identifier를 Footer의 최종 섹션으로 배치하는
              예시입니다.
            </Body>
            <div>
              <ComponentPreview>
                <div className="w-full border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                  <footer className="bg-white dark:bg-gray-950">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                      <Body className="font-bold mb-2">정부 누리집 Footer</Body>
                      <Body className="text-sm">
                        관련 링크, 저작권 정보, 연락처 등
                      </Body>
                    </div>
                    <Identifier
                      organizationName="행정안전부"
                      logo="https://via.placeholder.com/120x32?text=Logo"
                      logoAlt="행정안전부 로고"
                    />
                  </footer>
                </div>
              </ComponentPreview>

              <div className="mt-4">
                <CodeBlock
                  language="tsx"
                  code={`import { Identifier } from '@hanui/react';

<footer>
  <div>
    {/* Footer 콘텐츠: 링크, 저작권, 연락처 등 */}
  </div>

  {/* Identifier를 최종 섹션으로 배치 */}
  <Identifier
    organizationName="행정안전부"
    logo="/logo.png"
    logoAlt="행정안전부 로고"
  />
</footer>`}
                />
              </div>
            </div>
          </Stack>
        </Stack>
      </PageSection>

      {/* Guidelines */}
      <PageSection>
        <Heading level="h2" id="guidelines" className="text-2xl font-semibold">
          사용 가이드라인
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* When to use */}
          <Stack spacing="heading-tight">
            <Heading level="h3">언제 사용해야 하나요?</Heading>

            <div className="grid grid-cols-1 gap-4">
              <GuidelineSection
                type="do"
                title="Identifier를 사용해야 하는 경우"
              >
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>정부 공식 디지털 서비스</strong> - 대한민국 정부
                    기관의 공식 웹사이트
                  </li>
                  <li>
                    <strong>Footer 최종 섹션</strong> - Footer 내 마지막 콘텐츠
                    영역으로 배치
                  </li>
                  <li>
                    <strong>운영 기관 명시</strong> - 서비스를 운영하는 기관을
                    명확히 표시
                  </li>
                  <li>
                    <strong>브랜드 일관성</strong> - 정부 서비스 전체의 일관된
                    브랜드 경험 제공
                  </li>
                </ul>
              </GuidelineSection>

              <GuidelineSection
                type="dont"
                title="Identifier를 사용하지 말아야 하는 경우"
              >
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>비정부 웹사이트</strong> - 정부 기관이 아닌 민간
                    사이트
                  </li>
                  <li>
                    <strong>서비스 로고 대체</strong> - 운영 기관 로고 영역에
                    서비스 로고 사용 금지
                  </li>
                  <li>
                    <strong>Footer 외 배치</strong> - Header나 본문에 배치하면
                    안됨
                  </li>
                </ul>
              </GuidelineSection>
            </div>
          </Stack>

          {/* Accessibility */}
          <Stack spacing="heading-tight">
            <Heading level="h3">접근성</Heading>
            <Body>KRDS 및 WCAG 2.1 / KWCAG 2.2 접근성 기준을 준수합니다:</Body>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>대체 텍스트</strong> - 로고 이미지에 alt 텍스트 필수
                제공
              </li>
              <li>
                <strong>시맨틱 HTML</strong> - section 요소로 구조화된 콘텐츠
                영역
              </li>
              <li>
                <strong>정보 관계</strong> - WCAG 2.1 Level A Info and
                Relationships 준수
              </li>
              <li>
                <strong>스크린 리더</strong> - 로고와 텍스트가 명확하게 읽힘
              </li>
            </ul>
          </Stack>

          {/* Design Principles */}
          <Stack spacing="heading-tight">
            <Heading level="h3">디자인 원칙</Heading>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>시각적 절제</strong> - 지나치게 주의를 끌지 않는
                subtle한 표현
              </li>
              <li>
                <strong>일관된 배치</strong> - Footer 최종 섹션에 일관되게 위치
              </li>
              <li>
                <strong>운영 기관 로고</strong> - 서비스 로고가 아닌 운영 기관
                로고 사용
              </li>
              <li>
                <strong>두 가지 Variant</strong> - Light/Dark 배경 테마 지원
              </li>
            </ul>
          </Stack>
        </Stack>
      </PageSection>

      {/* API Reference */}
      <PageSection>
        <Heading
          level="h2"
          id="api-reference"
          className="text-2xl font-semibold"
        >
          API 레퍼런스
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Stack spacing="heading-tight">
            <Heading level="h3">Identifier Props</Heading>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-2 px-4">Prop</th>
                    <th className="text-left py-2 px-4">Type</th>
                    <th className="text-left py-2 px-4">Default</th>
                    <th className="text-left py-2 px-4">Description</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  <tr className="border-b border-gray-100 dark:border-gray-900">
                    <td className="py-2 px-4 font-mono">organizationName</td>
                    <td className="py-2 px-4 font-mono">string</td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">운영 기관 이름 (필수)</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-900">
                    <td className="py-2 px-4 font-mono">logo</td>
                    <td className="py-2 px-4 font-mono">string | ReactNode</td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">
                      기관 로고 (이미지 URL 또는 React 엘리먼트)
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-900">
                    <td className="py-2 px-4 font-mono">logoAlt</td>
                    <td className="py-2 px-4 font-mono">string</td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">
                      로고 alt 텍스트 (logo가 string일 때 필수)
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-900">
                    <td className="py-2 px-4 font-mono">variant</td>
                    <td className="py-2 px-4 font-mono">
                      &quot;light&quot; | &quot;dark&quot;
                    </td>
                    <td className="py-2 px-4 font-mono">&quot;light&quot;</td>
                    <td className="py-2 px-4">시각적 테마 변형</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-900">
                    <td className="py-2 px-4 font-mono">text</td>
                    <td className="py-2 px-4 font-mono">string</td>
                    <td className="py-2 px-4 font-mono">
                      &quot;이 누리집은...&quot;
                    </td>
                    <td className="py-2 px-4">
                      커스텀 텍스트 ({'{'}organization{'}'} 플레이스홀더 사용)
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-900">
                    <td className="py-2 px-4 font-mono">className</td>
                    <td className="py-2 px-4 font-mono">string</td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">추가 CSS 클래스</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Body className="mt-2">
              <strong>중요:</strong> Identifier는 자동으로 .krds-identifier
              클래스를 적용하여 KRDS 표준을 준수합니다.
            </Body>
          </Stack>
        </Stack>
      </PageSection>

      {/* Foundation Layer */}
      <PageSection>
        <Heading level="h2" className="text-2xl font-semibold">
          기반 레이어
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Body>
            Identifier 컴포넌트는 Foundation Layer 아키텍처를 통해 KRDS 접근성
            기준을 자동으로 충족합니다:
          </Body>

          <Stack spacing="heading-tight">
            <Heading level="h3">1. 필수 CSS 클래스 자동 적용</Heading>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>.krds-identifier</strong>: KRDS 표준에 따른 필수 CSS
                클래스 자동 설정
              </li>
              <li>개발자가 수동으로 클래스를 관리할 필요 없음</li>
              <li>정부 누리집 전체에서 일관된 식별자 사용</li>
            </ul>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">2. 시맨틱 구조 & 접근성</Heading>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>section 요소</strong>: Footer 내 구조화된 콘텐츠 영역
              </li>
              <li>
                <strong>Alt 텍스트 자동 검증</strong>: logo가 string일 때
                logoAlt 누락 경고
              </li>
              <li>스크린 리더가 운영 기관 정보를 명확하게 전달</li>
            </ul>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">3. 반응형 & 다크 모드</Heading>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>모바일 우선</strong>: 모든 화면 크기에서 최적화된 표시
              </li>
              <li>
                <strong>Variant 지원</strong>: Light/Dark 배경 테마 선택 가능
              </li>
              <li>로고 크기 자동 조절 (h-8, w-auto)</li>
            </ul>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">4. 유연한 로고 지원</Heading>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>이미지 URL</strong>: 일반 이미지 파일 경로 지원
              </li>
              <li>
                <strong>React 엘리먼트</strong>: SVG 컴포넌트 등 커스텀 로고
                지원
              </li>
              <li>Lazy loading 자동 적용으로 성능 최적화</li>
            </ul>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">5. 커스터마이징 지원</Heading>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>텍스트 커스터마이징</strong>: text prop으로 문구 변경
                가능
              </li>
              <li>
                <strong>플레이스홀더</strong>: {'{'}organization{'}'} 자동 치환
              </li>
              <li>KRDS 표준 텍스트가 기본값으로 제공됨</li>
            </ul>
          </Stack>
        </Stack>
      </PageSection>
    </>
  );
}
