import { Breadcrumb, Body, type BreadcrumbItem } from '@hanui/react';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';
import { CodeBlock } from '@/components/content/CodeBlock';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { GuidelineSection } from '@/components/content/GuidelineSection';
import { SectionHeading } from '@/components/hanui/section-header';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/hanui/tabs';

export default function BreadcrumbPage() {
  return (
    <>
      {/* Header */}
      <PageHeader
        title="Breadcrumb"
        description="탐색 계층 구조를 표시하여 사용자가 현재 위치를 파악하고 계층 구조의 수준을 이동할 수 있게 해주는 네비게이션 컴포넌트입니다."
      />

      <PageSection>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {/* Usage Examples */}
            <div className="space-y-8">
              <div>
                <SectionHeading level="h2" id="usage" title="사용 예제" />

                <div className="mt-2 md:mt-4 space-y-6">
                  <div className="space-y-2">
                    <SectionHeading
                      level="h3"
                      id="usage-basic"
                      title="기본 사용 (권장)"
                    />
                    <Body color="secondary">
                      items 배열을 통해 브레드크럼 경로를 정의합니다. 마지막
                      아이템에 isCurrent prop을 설정하여 현재 페이지를
                      나타냅니다.
                    </Body>
                    <div>
                      <ComponentPreview>
                        <Breadcrumb
                          items={[
                            { label: '홈', href: '/' },
                            { label: '공지사항', href: '/notice' },
                            { label: '상세보기', isCurrent: true },
                          ]}
                        />
                      </ComponentPreview>

                      <div className="mt-4">
                        <CodeBlock
                          language="tsx"
                          code={`import { Breadcrumb, type BreadcrumbItem } from '@hanui/react';

<Breadcrumb
  items={[
    { label: '홈', href: '/' },
    { label: '공지사항', href: '/notice' },
    { label: '상세보기', isCurrent: true }
  ]}
/>`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <SectionHeading
                      level="h3"
                      id="usage-service"
                      title="서비스 신청 경로"
                    />
                    <Body color="secondary">
                      정부 서비스 신청 흐름을 보여주는 브레드크럼 예제입니다.
                    </Body>
                    <div>
                      <ComponentPreview>
                        <Breadcrumb
                          items={[
                            { label: '홈', href: '/' },
                            { label: '서비스 신청', href: '/service' },
                            { label: '서비스 신청2', isCurrent: true },
                          ]}
                        />
                      </ComponentPreview>

                      <div className="mt-4">
                        <CodeBlock
                          language="tsx"
                          code={`import { Breadcrumb, type BreadcrumbItem } from '@hanui/react';

<Breadcrumb
  items={[
    { label: '홈', href: '/' },
    { label: '서비스 신청', href: '/service' },
    { label: '서비스 신청2', isCurrent: true }
  ]}
/>`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <SectionHeading
                      level="h3"
                      id="usage-separator"
                      title="커스텀 구분자"
                    />
                    <Body color="secondary">
                      separator prop으로 구분자를 커스터마이징할 수 있습니다.
                    </Body>
                    <div>
                      <ComponentPreview>
                        <Breadcrumb
                          separator="/"
                          items={[
                            { label: '홈', href: '/' },
                            { label: '제품', href: '/products' },
                            {
                              label: '전자제품',
                              href: '/products/electronics',
                            },
                            { label: '노트북', isCurrent: true },
                          ]}
                        />
                      </ComponentPreview>

                      <div className="mt-4">
                        <CodeBlock
                          language="tsx"
                          code={`import { Breadcrumb, type BreadcrumbItem } from '@hanui/react';

<Breadcrumb
  separator="/"
  items={[
    { label: '홈', href: '/' },
    { label: '제품', href: '/products' },
    { label: '전자제품', href: '/products/electronics' },
    { label: '노트북', isCurrent: true }
  ]}
/>`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <SectionHeading
                      level="h3"
                      id="usage-long-text"
                      title="긴 텍스트 자동 처리"
                    />
                    <Body color="secondary">
                      긴 텍스트는 자동으로 말줄임(ellipsis)으로 표시되며,
                      마우스를 올리면 전체 텍스트를 툴팁으로 확인할 수 있습니다.
                    </Body>
                    <div>
                      <ComponentPreview>
                        <Breadcrumb
                          items={[
                            { label: '홈', href: '/' },
                            { label: '정부 서비스', href: '/government' },
                            {
                              label: '디지털 정부혁신',
                              href: '/government/digital',
                            },
                            {
                              label:
                                '디지털 서비스 표준 가이드라인 및 적용 방안',
                              isCurrent: true,
                            },
                          ]}
                        />
                      </ComponentPreview>

                      <div className="mt-4">
                        <CodeBlock
                          language="tsx"
                          code={`import { Breadcrumb, type BreadcrumbItem } from '@hanui/react';

<Breadcrumb
  items={[
    { label: '홈', href: '/' },
    { label: '정부 서비스', href: '/government' },
    { label: '디지털 정부혁신', href: '/government/digital' },
    { label: '디지털 서비스 표준 가이드라인 및 적용 방안', isCurrent: true }
  ]}
/>`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Installation */}
              <div>
                <SectionHeading level="h2" id="installation" title="설치" />
                <div className="mt-2 md:mt-4">
                  <CodeBlock language="bash" code={`hanui add breadcrumb`} />
                </div>
              </div>

              {/* Guidelines */}
              <div>
                <SectionHeading
                  level="h2"
                  id="guidelines"
                  title="사용 가이드라인"
                />

                <div className="mt-2 md:mt-4 space-y-4">
                  <GuidelineSection title="언제 사용하나요?" type="do">
                    <ul className="list-disc list-inside space-y-2">
                      <li>다층 구조의 계층형 네비게이션이 있을 때</li>
                      <li>사용자가 현재 위치를 파악해야 할 때</li>
                      <li>상위 레벨로 빠르게 이동해야 할 때</li>
                      <li>정부 디지털 서비스의 표준 네비게이션 제공 시</li>
                    </ul>
                  </GuidelineSection>

                  <GuidelineSection title="언제 사용하지 않나요?" type="dont">
                    <ul className="list-disc list-inside space-y-2">
                      <li>단일 레벨 사이트 (계층 구조가 없을 때)</li>
                      <li>메인 페이지나 랜딩 페이지</li>
                      <li>
                        진행 단계 표시 (단계별 프로세스는 Step Indicator 사용
                        권장)
                      </li>
                      <li>메인 메뉴나 사이드바를 대체하는 용도</li>
                    </ul>
                  </GuidelineSection>
                </div>
              </div>

              {/* Accessibility */}
              <div>
                <SectionHeading level="h2" id="accessibility" title="접근성" />

                <div className="mt-2 md:mt-4 space-y-4">
                  <div className="space-y-2">
                    <SectionHeading
                      level="h3"
                      id="wcag-compliance"
                      title="WCAG 2.1 / KWCAG 2.2 준수"
                    />
                    <Body>
                      이 컴포넌트는 다음 접근성 기준을 준수합니다:
                      <br />
                      <br />
                      <strong>Semantic Structure:</strong> nav 요소와 ordered
                      list로 구조화되어 스크린 리더가 네비게이션 랜드마크로
                      인식합니다.
                      <br />
                      <br />
                      <strong>ARIA Labels:</strong>{' '}
                      aria-label=&quot;브레드크럼&quot;으로 네비게이션 목적을
                      명확히 전달합니다.
                      <br />
                      <br />
                      <strong>Visual Contrast:</strong> 구분자는 배경과 최소 3:1
                      명암비를 유지하며, 링크에는 밑줄과 호버 효과를 제공합니다.
                    </Body>
                  </div>

                  <div className="space-y-2">
                    <SectionHeading
                      level="h3"
                      id="keyboard-navigation"
                      title="키보드 내비게이션"
                    />
                    <Body>
                      <strong>Tab:</strong> 다음 브레드크럼 링크로 포커스 이동
                      <br />
                      <strong>Shift + Tab:</strong> 이전 브레드크럼 링크로
                      포커스 이동
                      <br />
                      <strong>Enter / Click:</strong> 링크된 페이지로 이동
                    </Body>
                  </div>

                  <div className="space-y-2">
                    <SectionHeading
                      level="h3"
                      id="screen-reader"
                      title="스크린 리더 지원"
                    />
                    <Body>
                      - 스크린 리더는 &quot;브레드크럼 네비게이션&quot;으로
                      인식합니다
                      <br />
                      - 구분자는 aria-hidden=&quot;true&quot;로 스크린 리더에서
                      숨겨집니다
                      <br />
                      - 현재 페이지는 aria-current=&quot;page&quot;로 명확히
                      표시됩니다
                      <br />- 각 링크의 텍스트가 명확하게 읽힙니다
                    </Body>
                  </div>
                </div>
              </div>

              {/* Design Principles */}
              <div>
                <SectionHeading
                  level="h2"
                  id="design-principles"
                  title="디자인 원칙"
                />

                <div className="mt-2 md:mt-4 space-y-4">
                  <div className="space-y-2">
                    <SectionHeading
                      level="h3"
                      id="home-first"
                      title="1. 홈 링크 우선"
                    />
                    <Body>
                      항상 메인 화면 링크를 첫 번째 아이템으로 포함합니다. items
                      배열의 첫 번째 요소가 홈 링크 역할을 합니다.
                    </Body>
                  </div>

                  <div className="space-y-2">
                    <SectionHeading
                      level="h3"
                      id="single-line"
                      title="2. 단일 라인 유지"
                    />
                    <Body>
                      브레드크럼은 항상 단일 라인으로 표시됩니다. 긴 경로는
                      자동으로 말줄임 처리되며, 데스크톱에서는 최대 4개 링크,
                      모바일에서는 첫 번째와 마지막 경로만 표시하고 중간은 생략
                      기호로 처리할 수 있습니다.
                    </Body>
                  </div>

                  <div className="space-y-2">
                    <SectionHeading
                      level="h3"
                      id="positioning"
                      title="3. 위치 및 정렬"
                    />
                    <Body>
                      페이지 제목 위에 배치하고 왼쪽 정렬합니다. 경로 링크 간
                      충분한 간격을 제공하여 가독성을 높입니다.
                    </Body>
                  </div>

                  <div className="space-y-2">
                    <SectionHeading
                      level="h3"
                      id="visual-hierarchy"
                      title="4. 시각적 계층 구조"
                    />
                    <Body>
                      구분자로 시각적 계층을 제공하며, 현재 페이지는 굵은 글씨로
                      강조됩니다. 링크에는 밑줄과 호버 효과로 클릭 가능함을
                      명확히 표시합니다.
                    </Body>
                  </div>
                </div>
              </div>

              {/* Foundation Layer */}
              <div>
                <SectionHeading
                  level="h2"
                  id="foundation-layer"
                  title="기반 레이어"
                />

                <Body>
                  Breadcrumb 컴포넌트는 HANUI의 Foundation Layer를 통해 다음
                  5가지 핵심 기능을 자동으로 제공합니다:
                </Body>

                <div className="mt-2 md:mt-4 space-y-4">
                  <div className="space-y-2">
                    <SectionHeading
                      level="h3"
                      id="fl-required-class"
                      title="1. Required CSS Class (.krds-breadcrumb-wrap)"
                    />
                    <Body>
                      KRDS 표준에서 요구하는 .krds-breadcrumb-wrap 클래스가
                      자동으로 적용됩니다. 개발자가 수동으로 클래스를 추가할
                      필요가 없습니다.
                    </Body>
                  </div>

                  <div className="space-y-2">
                    <SectionHeading
                      level="h3"
                      id="fl-semantic"
                      title="2. Semantic HTML"
                    />
                    <Body>
                      nav 요소와 ordered list(ol) 구조가 자동으로 생성되어
                      스크린 리더가 네비게이션 랜드마크로 인식합니다.
                      aria-label=&quot;브레드크럼&quot;이 자동으로 설정됩니다.
                    </Body>
                  </div>

                  <div className="space-y-2">
                    <SectionHeading
                      level="h3"
                      id="fl-wcag"
                      title="3. WCAG 2.1 / KWCAG 2.2 Compliance"
                    />
                    <Body>
                      키보드 네비게이션, 포커스 관리, ARIA 속성이 자동으로
                      처리됩니다. 구분자는 aria-hidden=&quot;true&quot;로 스크린
                      리더에서 숨겨지며, 현재 페이지는
                      aria-current=&quot;page&quot;로 명확히 표시됩니다.
                    </Body>
                  </div>

                  <div className="space-y-2">
                    <SectionHeading
                      level="h3"
                      id="fl-screen-reader"
                      title="4. Screen Reader Support"
                    />
                    <Body>
                      시맨틱 HTML과 적절한 ARIA 레이블로 보조 기술과의 호환성을
                      보장합니다. 구분자는 스크린 리더에서 숨겨지고, 경로 구조만
                      명확하게 전달됩니다.
                    </Body>
                  </div>

                  <div className="space-y-2">
                    <SectionHeading
                      level="h3"
                      id="fl-visual-hierarchy"
                      title="5. Visual Hierarchy"
                    />
                    <Body>
                      구분자는 배경과 3:1 명암비를 유지하며, 링크에는 밑줄과
                      호버 효과가 자동으로 적용됩니다. 긴 텍스트는 말줄임
                      처리되고 툴팁으로 전체 내용을 확인할 수 있습니다.
                    </Body>
                  </div>

                  <Body color="secondary" className="mt-4">
                    이러한 자동화된 기능들은 개발자가 접근성 구현에 대한 깊은
                    지식 없이도 KRDS 표준을 준수하는 컴포넌트를 쉽게 사용할 수
                    있도록 돕습니다.
                  </Body>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="api">
            {/* API Reference */}
            <div className="space-y-8">
              <div>
                <SectionHeading
                  level="h2"
                  id="api-reference"
                  title="API Reference"
                />

                <div className="mt-2 md:mt-4 space-y-6">
                  <div className="space-y-2">
                    <SectionHeading
                      level="h3"
                      id="breadcrumb-props"
                      title="Breadcrumb Props"
                    />
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
                            <td className="py-2 px-4 font-mono">items</td>
                            <td className="py-2 px-4 font-mono">
                              BreadcrumbItem[]
                            </td>
                            <td className="py-2 px-4">-</td>
                            <td className="py-2 px-4">
                              브레드크럼 아이템 배열 (필수)
                            </td>
                          </tr>
                          <tr className="border-b border-krds-gray-20">
                            <td className="py-2 px-4 font-mono">separator</td>
                            <td className="py-2 px-4 font-mono">ReactNode</td>
                            <td className="py-2 px-4 font-mono">
                              &quot;&gt;&quot;
                            </td>
                            <td className="py-2 px-4">
                              아이템 간 커스텀 구분자 (예: &quot;/&quot;,
                              &quot;&gt;&quot;)
                            </td>
                          </tr>
                          <tr className="border-b border-krds-gray-20">
                            <td className="py-2 px-4 font-mono">maxItems</td>
                            <td className="py-2 px-4 font-mono">number</td>
                            <td className="py-2 px-4">-</td>
                            <td className="py-2 px-4">
                              표시할 최대 아이템 개수 (선택사항)
                            </td>
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
                      <strong>중요:</strong> Breadcrumb는 자동으로
                      .krds-breadcrumb-wrap 클래스와
                      aria-label=&quot;브레드크럼&quot;을 적용하여 KRDS 표준을
                      준수합니다.
                    </Body>
                  </div>

                  <div className="space-y-2">
                    <SectionHeading
                      level="h3"
                      id="breadcrumbitem-interface"
                      title="BreadcrumbItem Interface"
                    />
                    <Body className="mb-2">
                      BreadcrumbItem은 컴포넌트가 아닌 TypeScript
                      인터페이스입니다. items 배열의 각 요소는 다음 속성을 가질
                      수 있습니다:
                    </Body>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-krds-gray-20">
                            <th className="text-left py-2 px-4">Property</th>
                            <th className="text-left py-2 px-4">Type</th>
                            <th className="text-left py-2 px-4">Default</th>
                            <th className="text-left py-2 px-4">Description</th>
                          </tr>
                        </thead>
                        <tbody className="text-krds-gray-90">
                          <tr className="border-b border-krds-gray-20">
                            <td className="py-2 px-4 font-mono">label</td>
                            <td className="py-2 px-4 font-mono">string</td>
                            <td className="py-2 px-4">-</td>
                            <td className="py-2 px-4">표시할 텍스트 (필수)</td>
                          </tr>
                          <tr className="border-b border-krds-gray-20">
                            <td className="py-2 px-4 font-mono">href</td>
                            <td className="py-2 px-4 font-mono">string</td>
                            <td className="py-2 px-4">-</td>
                            <td className="py-2 px-4">
                              링크 URL (현재 페이지가 아닐 때)
                            </td>
                          </tr>
                          <tr className="border-b border-krds-gray-20">
                            <td className="py-2 px-4 font-mono">isCurrent</td>
                            <td className="py-2 px-4 font-mono">boolean</td>
                            <td className="py-2 px-4">false</td>
                            <td className="py-2 px-4">
                              현재 페이지 여부 (aria-current=&quot;page&quot;
                              설정)
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </PageSection>
    </>
  );
}
