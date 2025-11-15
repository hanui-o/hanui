import { Masthead, Stack, Heading, Body } from '@hanui/react';
import { CodeBlock } from '@/components/content/CodeBlock';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { GuidelineSection } from '@/components/content/GuidelineSection';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

export default function MastheadPage() {
  return (
    <>
      {/* Header */}
      <PageHeader
        title="Masthead (공식 배너)"
        description="정부 디지털 서비스의 공식성을 나타내는 배너 컴포넌트입니다. 모든 정부 누리집 페이지 상단에 일관되게 표시되어 사용자 신뢰를 구축합니다."
      />

      {/* Usage Examples */}
      <PageSection>
        <Heading level="h2" id="examples" className="text-2xl font-semibold">
          예제
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* Basic Example */}
          <Stack spacing="heading-tight">
            <Heading level="h3">기본 사용</Heading>
            <Body>
              기본 Masthead는 KRDS 표준 텍스트를 표시합니다. 반드시 페이지
              최상단에 배치해야 하며, Skip Link보다는 뒤에 위치해야 합니다.
            </Body>
            <div>
              <ComponentPreview>
                <div className="w-full">
                  <Masthead />
                </div>
              </ComponentPreview>

              <div className="mt-4">
                <CodeBlock
                  language="tsx"
                  code={`import { Masthead } from '@hanui/react';

<Masthead />`}
                />
              </div>
            </div>
          </Stack>

          {/* With Skip Link */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Skip Link와 함께 사용 (권장)</Heading>
            <Body>
              KRDS 접근성 기준에 따라 Skip Link는 Masthead 이전에 배치되어야
              합니다. Skip Link는 화면에 보이지 않다가 포커스를 받으면
              표시됩니다.
            </Body>
            <div>
              <ComponentPreview>
                <div className="w-full">
                  <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-krds-primary-base focus:text-krds-white focus:rounded"
                  >
                    본문으로 바로가기
                  </a>
                  <Masthead />
                  <div id="main-content" className="p-4 bg-krds-white mt-4">
                    <Body>여기가 본문 콘텐츠입니다.</Body>
                  </div>
                </div>
              </ComponentPreview>

              <div className="mt-4">
                <CodeBlock
                  language="tsx"
                  code={`import { Masthead } from '@hanui/react';

<>
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-krds-primary-base focus:text-krds-white focus:rounded"
  >
    본문으로 바로가기
  </a>
  <Masthead />
  <main id="main-content">
    {/* 페이지 본문 콘텐츠 */}
  </main>
</>`}
                />
              </div>
            </div>
          </Stack>

          {/* Custom Text */}
          <Stack spacing="heading-tight">
            <Heading level="h3">커스텀 텍스트</Heading>
            <Body>
              필요시 text prop으로 커스텀 텍스트를 사용할 수 있지만, KRDS 표준
              텍스트 사용을 권장합니다.
            </Body>
            <div>
              <ComponentPreview>
                <div className="w-full">
                  <Masthead text="이 누리집은 대한민국 공식 전자정부 누리집입니다" />
                </div>
              </ComponentPreview>

              <div className="mt-4">
                <CodeBlock
                  language="tsx"
                  code={`import { Masthead } from '@hanui/react';

<Masthead text="이 누리집은 대한민국 공식 전자정부 누리집입니다" />`}
                />
              </div>
            </div>
          </Stack>

          {/* Full Page Layout */}
          <Stack spacing="heading-tight">
            <Heading level="h3">전체 페이지 레이아웃 예시</Heading>
            <Body>
              실제 정부 누리집 페이지 구조에서 Masthead의 배치를 보여줍니다.
            </Body>
            <div>
              <ComponentPreview>
                <div className="w-full border border-krds-gray-20 rounded-lg overflow-hidden">
                  <Masthead />
                  <header className="bg-krds-primary-base text-krds-white p-4">
                    <Body className="text-krds-white font-bold">
                      정부 누리집 헤더
                    </Body>
                  </header>
                  <nav className="bg-krds-gray-5 p-4 border-b border-krds-gray-20">
                    <Body>네비게이션 메뉴</Body>
                  </nav>
                  <main className="p-4 bg-krds-white">
                    <Body>본문 콘텐츠</Body>
                  </main>
                  <footer className="bg-krds-gray-5 p-4">
                    <Body>푸터</Body>
                  </footer>
                </div>
              </ComponentPreview>

              <div className="mt-4">
                <CodeBlock
                  language="tsx"
                  code={`import { Masthead } from '@hanui/react';

<>
  <Masthead />
  <header>
    {/* 헤더 콘텐츠 */}
  </header>
  <nav>
    {/* 네비게이션 메뉴 */}
  </nav>
  <main>
    {/* 본문 콘텐츠 */}
  </main>
  <footer>
    {/* 푸터 */}
  </footer>
</>`}
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
              <GuidelineSection type="do" title="Masthead를 사용해야 하는 경우">
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>정부 공식 디지털 서비스</strong> - 대한민국 정부
                    기관의 공식 웹사이트
                  </li>
                  <li>
                    <strong>전자정부 서비스</strong> - 정부가 운영하는 온라인
                    민원 서비스
                  </li>
                  <li>
                    <strong>공공기관 누리집</strong> - 정부 산하 공공기관의 공식
                    웹사이트
                  </li>
                  <li>
                    <strong>모든 페이지</strong> - 누리집의 모든 페이지 상단에
                    일관되게 표시
                  </li>
                </ul>
              </GuidelineSection>

              <GuidelineSection
                type="dont"
                title="Masthead를 사용하지 말아야 하는 경우"
              >
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>민간 웹사이트</strong> - 정부 기관이 아닌 일반
                    기업이나 개인 사이트
                  </li>
                  <li>
                    <strong>비공식 서비스</strong> - 정부 승인을 받지 않은
                    서비스
                  </li>
                  <li>
                    <strong>내부 관리 시스템</strong> - 대외 공개되지 않는
                    내부용 시스템 (경우에 따라 다름)
                  </li>
                </ul>
              </GuidelineSection>
            </div>
          </Stack>

          {/* Accessibility */}
          <Stack spacing="heading-tight">
            <Heading level="h3">접근성</Heading>
            <Body>KRDS 및 WCAG 2.1 / KWCAG 2.2 접근성 기준을 준수합니다:</Body>
            <ul className="list-disc list-inside space-y-2 text-krds-gray-90">
              <li>
                <strong>Skip Link 선행</strong> - 공식 배너는 Skip Link 다음에
                배치되어야 함 (Bypass Blocks 준수)
              </li>
              <li>
                <strong>필수 CSS ID</strong> - #krds-masthead ID를 통해 일관된
                식별 가능
              </li>
              <li>
                <strong>시맨틱 HTML</strong> - 의미있는 HTML 구조 사용
              </li>
              <li>
                <strong>키보드 네비게이션</strong> - Skip Link를 통한 배너 우회
                가능
              </li>
              <li>
                <strong>스크린 리더</strong> - 텍스트가 명확하게 읽힘
              </li>
            </ul>
          </Stack>

          {/* Design Principles */}
          <Stack spacing="heading-tight">
            <Heading level="h3">디자인 원칙</Heading>
            <ul className="list-disc list-inside space-y-2 text-krds-gray-90">
              <li>
                <strong>시각적 절제</strong> - 배너가 지나치게 주의를 끌지
                않도록 표현
              </li>
              <li>
                <strong>일관성 유지</strong> - 모든 정부 누리집에서 동일한
                디자인 사용
              </li>
              <li>
                <strong>텍스트 고정</strong> - 표준 텍스트를 수정하지 않고 사용
              </li>
              <li>
                <strong>최상단 배치</strong> - 페이지의 맨 위에 위치 (Skip Link
                제외)
              </li>
            </ul>
          </Stack>

          {/* Usability */}
          <Stack spacing="heading-tight">
            <Heading level="h3">사용성 권장사항</Heading>
            <ul className="list-disc list-inside space-y-2 text-krds-gray-90">
              <li>
                <strong>반응형 디자인</strong> - 모바일/태블릿/데스크톱에서 모두
                잘 보이도록 구현
              </li>
              <li>
                <strong>다크 모드 지원</strong> - 다크 모드에서도 가독성 유지
              </li>
              <li>
                <strong>프린트 최적화</strong> - 인쇄 시에도 표시되도록 설정
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
            <Heading level="h3">Masthead Props</Heading>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-krds-gray-20">
                    <th className="text-left py-2 px-4">Prop</th>
                    <th className="text-left py-2 px-4">Type</th>
                    <th className="text-left py-2 px-4">Default</th>
                    <th className="text-left py-2 px-4">Description</th>
                  </tr>
                </thead>
                <tbody className="text-krds-gray-90">
                  <tr className="border-b border-krds-gray-20">
                    <td className="py-2 px-4 font-mono">text</td>
                    <td className="py-2 px-4 font-mono">string</td>
                    <td className="py-2 px-4 font-mono">
                      &quot;이 누리집은...&quot;
                    </td>
                    <td className="py-2 px-4">배너에 표시될 텍스트</td>
                  </tr>
                  <tr className="border-b border-krds-gray-20">
                    <td className="py-2 px-4 font-mono">className</td>
                    <td className="py-2 px-4 font-mono">string</td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">추가 CSS 클래스</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Body className="mt-2">
              <strong>중요:</strong> Masthead는 자동으로
              id=&quot;krds-masthead&quot;를 적용하여 KRDS 표준을 준수합니다.
            </Body>
          </Stack>
        </Stack>
      </PageSection>

      {/* Foundation Layer */}
      <PageSection>
        <Heading
          level="h2"
          id="foundation-layer"
          className="text-2xl font-semibold"
        >
          기반 레이어
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Body>
            Masthead 컴포넌트는 Foundation Layer 아키텍처를 통해 KRDS 접근성
            기준을 자동으로 충족합니다:
          </Body>

          <Stack spacing="heading-tight">
            <Heading level="h3">1. 필수 식별자 자동 적용</Heading>
            <ul className="list-disc list-inside space-y-2 text-krds-gray-90">
              <li>
                <strong>#krds-masthead ID</strong>: KRDS 표준에 따른 필수 CSS
                식별자 자동 설정
              </li>
              <li>개발자가 수동으로 ID를 관리할 필요 없음</li>
              <li>정부 누리집 전체에서 일관된 식별자 사용</li>
            </ul>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">2. Skip Link 호환성</Heading>
            <ul className="list-disc list-inside space-y-2 text-krds-gray-90">
              <li>
                <strong>Bypass Blocks 준수</strong>: WCAG 2.1 Level A / KWCAG
                2.2 기준
              </li>
              <li>Skip Link가 Masthead를 우회하여 본문으로 바로 이동 가능</li>
              <li>키보드 사용자의 반복 콘텐츠 우회 지원</li>
            </ul>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">3. 시맨틱 구조</Heading>
            <ul className="list-disc list-inside space-y-2 text-krds-gray-90">
              <li>
                <strong>의미있는 HTML</strong>: div 컨테이너 + p 텍스트 요소
              </li>
              <li>스크린 리더가 배너 내용을 명확하게 전달</li>
              <li>검색 엔진 최적화 (SEO) 지원</li>
            </ul>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">4. 반응형 & 다크 모드</Heading>
            <ul className="list-disc list-inside space-y-2 text-krds-gray-90">
              <li>
                <strong>모바일 우선</strong>: 모든 화면 크기에서 최적화된 표시
              </li>
              <li>
                <strong>다크 모드 자동 지원</strong>: 시스템 설정에 따라 자동
                전환
              </li>
              <li>텍스트 크기 조절 가능 (xs/sm 반응형)</li>
            </ul>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">5. 표준 텍스트 보장</Heading>
            <ul className="list-disc list-inside space-y-2 text-krds-gray-90">
              <li>
                <strong>기본값 제공</strong>: KRDS 표준 텍스트가 기본으로 설정됨
              </li>
              <li>모든 정부 누리집에서 일관된 메시지 표시</li>
              <li>사용자 신뢰 구축을 위한 통일된 표현</li>
            </ul>
          </Stack>
        </Stack>
      </PageSection>
    </>
  );
}
