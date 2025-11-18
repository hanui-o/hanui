import { Body } from '@hanui/react';
import {
  Section,
  SectionHeading,
  Subsection,
  Item,
  SubItem,
} from '@/components/hanui/section';

export default function SectionHeadingSystemPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Section Heading System"
        description="KRDS Gap-layout을 자동으로 준수하는 섹션 헤딩 시스템입니다. 헤딩 간 간격, 헤딩-본문 간격을 CSS 인접 선택자를 통해 자동으로 관리합니다."
      />

      {/* Installation */}
      <Section level="h2">
        <SectionHeading level="h2" id="installation" title="설치">
          <Body className="leading-relaxed">
            다음 명령어로 Section Heading System 컴포넌트를 설치합니다. CSS는
            컴포넌트 import 시 자동으로 주입되므로 별도 설정이 필요없습니다.
          </Body>
        </SectionHeading>

        <div className="bg-krds-gray-5 rounded-lg p-4 border border-krds-gray-20">
          <code className="text-sm">
            npx @hanui/cli add section-heading-system
          </code>
        </div>
      </Section>

      {/* What is it */}
      <Section level="h2">
        <SectionHeading
          level="h2"
          id="what-is-it"
          title="무엇인가요?"
          description="Section Heading System은 KRDS Gap-layout 명세를 자동으로 준수하도록 설계된 섹션 구조 시스템입니다."
        />

        <div className="bg-krds-gray-5 rounded-lg p-6 border border-krds-gray-20">
          <ul className="space-y-3 text-krds-gray-90">
            <li className="flex items-start gap-3">
              <span className="mt-0.5">✓</span>
              <div>
                <strong>자동 CSS 주입:</strong> 컴포넌트 import 시 필요한 CSS가
                자동으로 주입됩니다. 별도 CSS 설정 불필요!
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5">✓</span>
              <div>
                <strong>자동 간격 관리:</strong> CSS 인접 선택자를 통해 헤딩 간
                간격(h1→h2: 48px, h2→h3: 40px 등)을 자동으로 적용합니다.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5">✓</span>
              <div>
                <strong>시맨틱 구조:</strong> Section, Subsection, Item,
                SubItem으로 명확한 문서 계층 구조를 표현합니다.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5">✓</span>
              <div>
                <strong>KRDS 준수:</strong> 공식 KRDS Gap-layout 명세(헤딩 간
                간격, 헤딩-본문 간격)를 100% 준수합니다.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5">✓</span>
              <div>
                <strong>유연한 API:</strong> 간단한 title prop 또는 커스텀
                SectionHeading 컴포넌트 모두 지원합니다.
              </div>
            </li>
          </ul>
        </div>
      </Section>

      {/* Components */}
      <Section level="h2">
        <SectionHeading level="h2" id="components" title="컴포넌트 구성" />

        <Subsection level="h3">
          <SectionHeading level="h3" title="SectionHeading">
            <Body className="leading-relaxed">
              헤딩과 설명을 포함하는 헤더 컴포넌트입니다. title prop과
              description prop을 통해 간단하게 사용하거나, children을 통해
              커스텀 설명 콘텐츠를 제공할 수 있습니다.
            </Body>
          </SectionHeading>

          <div className="bg-krds-gray-5 rounded-lg p-4 border border-krds-gray-20">
            <code className="whitespace-pre">{`<SectionHeading
  level="h2"
  title="제목"
  description="설명"
/>`}</code>
          </div>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="Section">
            <Body className="leading-relaxed">
              h2 또는 h3 레벨의 주요 섹션을 감싸는 컨테이너입니다. CSS 인접
              선택자를 통해 섹션 간 간격이 자동으로 조정됩니다.
            </Body>
          </SectionHeading>

          <div className="bg-krds-gray-5 rounded-lg p-4 border border-krds-gray-20">
            <code className="whitespace-pre">{`<Section level="h2">
  <SectionHeading level="h2" title="섹션 제목" />
  {/* 콘텐츠 */}
</Section>`}</code>
          </div>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="Subsection">
            <Body className="leading-relaxed">
              h3 또는 h4 레벨의 하위 섹션을 감싸는 컨테이너입니다. Subsection 간
              40px 간격이 자동으로 적용됩니다.
            </Body>
          </SectionHeading>

          <div className="bg-krds-gray-5 rounded-lg p-4 border border-krds-gray-20">
            <code className="whitespace-pre">{`<Subsection level="h3">
  <SectionHeading level="h3" title="서브섹션" />
  {/* 콘텐츠 */}
</Subsection>`}</code>
          </div>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="Item & SubItem">
            <Body className="leading-relaxed">
              h4/h5 레벨의 작은 항목들을 감싸는 컨테이너입니다. Item 간 24px,
              SubItem 간 16px 간격이 자동으로 적용됩니다.
            </Body>
          </SectionHeading>

          <div className="bg-krds-gray-5 rounded-lg p-4 border border-krds-gray-20">
            <code className="whitespace-pre">{`<Item level="h4">
  <SectionHeading level="h4" title="항목" />
</Item>

<SubItem level="h5">
  <SectionHeading level="h5" title="하위 항목" />
</SubItem>`}</code>
          </div>
        </Subsection>
      </Section>

      {/* Usage Examples */}
      <Section level="h2">
        <SectionHeading level="h2" id="usage" title="사용 예제" />

        <Subsection level="h3">
          <SectionHeading level="h3" title="기본 사용법">
            <Body className="leading-relaxed">
              title과 description prop을 사용한 가장 간단한 형태입니다:
            </Body>
          </SectionHeading>

          <div className="bg-krds-gray-5 rounded-lg p-4 border border-krds-gray-20">
            <code className="whitespace-pre">{`<Section level="h2">
  <SectionHeading
    level="h2"
    title="소개"
    description="이 섹션에 대한 설명입니다."
  />

  <Subsection level="h3">
    <SectionHeading level="h3" title="서브 섹션" />
    <p>본문 내용...</p>
  </Subsection>
</Section>`}</code>
          </div>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="커스텀 설명 콘텐츠">
            <Body className="leading-relaxed">
              children을 통해 설명 영역을 자유롭게 커스터마이징할 수 있습니다:
            </Body>
          </SectionHeading>

          <div className="bg-krds-gray-5 rounded-lg p-4 border border-krds-gray-20">
            <code className="whitespace-pre">{`<SectionHeading level="h2" title="고급 기능">
  <Body className="leading-relaxed">
    <strong>Radix UI Primitives</strong>를 기반으로
    접근성이 자동으로 보장됩니다.
  </Body>
</SectionHeading>`}</code>
          </div>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="복잡한 구조">
            <Body className="leading-relaxed">
              h1부터 시작하여 Section, Subsection, Item을 중첩한 복잡한 문서
              구조를 표현할 수 있습니다:
            </Body>
          </SectionHeading>

          <div className="bg-krds-gray-5 rounded-lg p-4 border border-krds-gray-20">
            <code className="whitespace-pre">{`{/* 페이지 제목 (h1) */}
<SectionHeading
  level="h1"
  title="컴포넌트 가이드"
  description="HANUI 컴포넌트 사용 가이드입니다."
/>

{/* 첫 번째 주요 섹션 (h2) */}
<Section level="h2">
  <SectionHeading level="h2" title="주요 기능" />

  <Subsection level="h3">
    <SectionHeading level="h3" title="접근성" />

    <Item level="h4">
      <SectionHeading level="h4" title="키보드 네비게이션" />
      <p>모든 키보드 조작 지원...</p>
    </Item>

    <Item level="h4">
      <SectionHeading level="h4" title="스크린 리더" />
      <p>ARIA 속성 자동 적용...</p>
    </Item>
  </Subsection>

  <Subsection level="h3">
    <SectionHeading level="h3" title="성능" />
    <p>본문...</p>
  </Subsection>
</Section>

{/* 두 번째 주요 섹션 (h2) */}
<Section level="h2">
  <SectionHeading level="h2" title="설치 방법" />
  <p>본문...</p>
</Section>`}</code>
          </div>
        </Subsection>
      </Section>

      {/* KRDS Specifications */}
      <Section level="h2">
        <SectionHeading
          level="h2"
          id="krds-specs"
          title="KRDS Gap-layout 명세"
        />

        <Subsection level="h3">
          <SectionHeading level="h3" title="헤딩 간 간격 (Heading-to-Heading)">
            <Body className="leading-relaxed">
              CSS 인접 선택자를 통해 자동으로 적용됩니다:
            </Body>
          </SectionHeading>

          <ul className="space-y-2">
            <li className="flex items-center gap-3">
              <Body className="w-24 font-medium">h1 → h2:</Body>
              <Body className="text-krds-gray-70">48px</Body>
            </li>
            <li className="flex items-center gap-3">
              <Body className="w-24 font-medium">h2 → h3:</Body>
              <Body className="text-krds-gray-70">40px</Body>
            </li>
            <li className="flex items-center gap-3">
              <Body className="w-24 font-medium">h3 → h4:</Body>
              <Body className="text-krds-gray-70">24px</Body>
            </li>
            <li className="flex items-center gap-3">
              <Body className="w-24 font-medium">h4 → h5:</Body>
              <Body className="text-krds-gray-70">16px</Body>
            </li>
          </ul>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="헤딩-본문 간격 (Title-Body Gap)">
            <Body className="leading-relaxed">
              SectionHeading 컴포넌트 내부에서 flex gap으로 관리됩니다:
            </Body>
          </SectionHeading>

          <ul className="space-y-2">
            <li className="flex items-center gap-3">
              <Body className="w-24 font-medium">h1 → body:</Body>
              <Body className="text-krds-gray-70">24px (title-body-large)</Body>
            </li>
            <li className="flex items-center gap-3">
              <Body className="w-24 font-medium">h2 → body:</Body>
              <Body className="text-krds-gray-70">
                20px (title-body-medium)
              </Body>
            </li>
            <li className="flex items-center gap-3">
              <Body className="w-24 font-medium">h3 → body:</Body>
              <Body className="text-krds-gray-70">
                20px (title-body-medium)
              </Body>
            </li>
            <li className="flex items-center gap-3">
              <Body className="w-24 font-medium">h4 → body:</Body>
              <Body className="text-krds-gray-70">
                20px (title-body-medium)
              </Body>
            </li>
            <li className="flex items-center gap-3">
              <Body className="w-24 font-medium">h5 → body:</Body>
              <Body className="text-krds-gray-70">16px (title-body-small)</Body>
            </li>
          </ul>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="래퍼 간 간격 (Wrapper Spacing)">
            <Body className="leading-relaxed">
              Wrapper 컴포넌트 간 자동 간격:
            </Body>
          </SectionHeading>

          <ul className="space-y-2">
            <li className="flex items-center gap-3">
              <Body className="w-32 font-medium">Section ↔ Section:</Body>
              <Body className="text-krds-gray-70">
                32px (모바일) / 48px (PC)
              </Body>
            </li>
            <li className="flex items-center gap-3">
              <Body className="w-32 font-medium">
                Subsection ↔ Subsection:
              </Body>
              <Body className="text-krds-gray-70">40px</Body>
            </li>
            <li className="flex items-center gap-3">
              <Body className="w-32 font-medium">Item ↔ Item:</Body>
              <Body className="text-krds-gray-70">24px</Body>
            </li>
            <li className="flex items-center gap-3">
              <Body className="w-32 font-medium">SubItem ↔ SubItem:</Body>
              <Body className="text-krds-gray-70">16px</Body>
            </li>
          </ul>
        </Subsection>
      </Section>

      {/* API Reference */}
      <Section level="h2">
        <SectionHeading level="h2" id="api" title="API Reference" />

        <Subsection level="h3">
          <SectionHeading level="h3" title="SectionHeading Props" />

          <div className="bg-krds-gray-5 rounded-lg p-6 border border-krds-gray-20">
            <table className="w-full">
              <thead>
                <tr className="border-b border-krds-gray-20">
                  <th className="text-left py-2 pr-4">Prop</th>
                  <th className="text-left py-2 pr-4">Type</th>
                  <th className="text-left py-2 pr-4">Required</th>
                  <th className="text-left py-2">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-krds-gray-10">
                <tr>
                  <td className="py-3 pr-4 font-mono">level</td>
                  <td className="py-3 pr-4 text-krds-gray-70">
                    &apos;h1&apos; | &apos;h2&apos; | &apos;h3&apos; |
                    &apos;h4&apos; | &apos;h5&apos;
                  </td>
                  <td className="py-3 pr-4">✓</td>
                  <td className="py-3">헤딩 레벨</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-mono">title</td>
                  <td className="py-3 pr-4 text-krds-gray-70">string</td>
                  <td className="py-3 pr-4">✓</td>
                  <td className="py-3">제목 텍스트</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-mono">description</td>
                  <td className="py-3 pr-4 text-krds-gray-70">string</td>
                  <td className="py-3 pr-4">-</td>
                  <td className="py-3">설명 텍스트 (선택사항)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-mono">id</td>
                  <td className="py-3 pr-4 text-krds-gray-70">string</td>
                  <td className="py-3 pr-4">-</td>
                  <td className="py-3">
                    HTML id (미제공 시 title에서 자동 생성)
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-mono">children</td>
                  <td className="py-3 pr-4 text-krds-gray-70">ReactNode</td>
                  <td className="py-3 pr-4">-</td>
                  <td className="py-3">커스텀 설명 콘텐츠</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading
            level="h3"
            title="Section / Subsection / Item / SubItem Props"
          />

          <div className="bg-krds-gray-5 rounded-lg p-6 border border-krds-gray-20">
            <table className="w-full">
              <thead>
                <tr className="border-b border-krds-gray-20">
                  <th className="text-left py-2 pr-4">Prop</th>
                  <th className="text-left py-2 pr-4">Type</th>
                  <th className="text-left py-2 pr-4">Required</th>
                  <th className="text-left py-2">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-krds-gray-10">
                <tr>
                  <td className="py-3 pr-4 font-mono">level</td>
                  <td className="py-3 pr-4 text-krds-gray-70">
                    &apos;h2&apos; | &apos;h3&apos; | &apos;h4&apos; |
                    &apos;h5&apos;
                  </td>
                  <td className="py-3 pr-4">-</td>
                  <td className="py-3">
                    섹션 레벨 (기본값: Section=h2, 나머지=h3)
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-mono">children</td>
                  <td className="py-3 pr-4 text-krds-gray-70">ReactNode</td>
                  <td className="py-3 pr-4">✓</td>
                  <td className="py-3">섹션 콘텐츠</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>

      {/* Best Practices */}
      <Section level="h2">
        <SectionHeading level="h2" id="best-practices" title="Best Practices" />

        <Subsection level="h3">
          <SectionHeading level="h3" title="CSS 파일에 스타일 추가 필수">
            <Body className="leading-relaxed">
              컴포넌트 설치 후 반드시 컴포넌트 파일 하단의 CSS 주석을 복사하여
              globals.css에 추가해야 합니다. CSS가 없으면 자동 간격 시스템이
              동작하지 않습니다.
            </Body>
          </SectionHeading>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="올바른 헤딩 계층 구조 사용">
            <Body className="leading-relaxed">
              h1 → h2 → h3 → h4 → h5 순서를 건너뛰지 말고 순차적으로 사용하세요.
              이는 웹 접근성과 SEO에 중요합니다.
            </Body>
          </SectionHeading>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="wrapper 컴포넌트 적극 활용">
            <Body className="leading-relaxed">
              Section, Subsection, Item, SubItem을 사용하면 CSS가 자동으로
              간격을 조정해주므로, 수동으로 margin을 추가할 필요가 없습니다.
            </Body>
          </SectionHeading>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="ID 자동 생성 활용">
            <Body className="leading-relaxed">
              id prop을 생략하면 title에서 자동으로 URL-friendly ID가 생성되어
              앵커 링크와 TOC(Table of Contents)에 사용할 수 있습니다.
            </Body>
          </SectionHeading>
        </Subsection>
      </Section>

      {/* See Also */}
      <Section level="h2">
        <SectionHeading level="h2" id="see-also" title="관련 문서" />

        <ul className="space-y-2">
          <li>
            <a
              href="/docs/introduction"
              className="text-krds-primary-60 hover:underline"
            >
              Introduction - KRDS 소개
            </a>
          </li>
          <li>
            <a
              href="/docs/installation"
              className="text-krds-primary-60 hover:underline"
            >
              Installation - 설치 가이드
            </a>
          </li>
        </ul>
      </Section>
    </>
  );
}
