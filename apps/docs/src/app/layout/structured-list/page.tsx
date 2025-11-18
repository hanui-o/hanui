'use client';

import { StructuredList, StructuredListItem, Body } from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';
import { PageSection } from '@/components/content/PageSection';
import { SectionHeading } from '@/components/hanui/section-header';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/hanui/tabs';

export default function StructuredListPage() {
  // Basic example items
  const basicItems: StructuredListItem[] = [
    {
      id: '1',
      badge: { text: '진행중', variant: 'primary' },
      title: '청년 주거 지원 사업',
      description:
        '만 19세~34세 무주택 청년에게 월세를 지원합니다. 소득 및 자산 요건을 충족하는 경우 최대 20만원까지 지원받을 수 있습니다.',
      date: { label: '신청 기간', value: '2024.01.01-2024.12.31' },
      tags: ['청년', '주거지원', '복지'],
      href: '#',
      action: { label: '신청하기' },
      showShare: true,
      showLike: true,
    },
    {
      id: '2',
      badge: { text: '마감임박', variant: 'success' },
      title: '중소기업 지원 프로그램',
      description:
        '중소기업의 기술 개발과 사업화를 지원하는 프로그램입니다. R&D 비용, 인력 채용, 마케팅 등 다양한 분야에서 지원을 받으실 수 있습니다.',
      date: { label: '신청 기간', value: '2024.03.01-2024.03.31' },
      tags: ['중소기업', '기술개발'],
      href: '#',
      action: { label: '신청하기' },
      showShare: true,
      showLike: true,
    },
    {
      id: '3',
      badge: { text: '상시모집', variant: 'secondary' },
      title: '장애인 일자리 지원 사업',
      description:
        '장애인의 안정적인 일자리 제공을 위한 지원 사업입니다. 취업 지원금, 직업 훈련, 근로 지원 등을 제공합니다.',
      date: { label: '신청 기간', value: '2024.01.01-2024.12.31' },
      tags: ['장애인', '일자리', '복지'],
      href: '#',
      action: { label: '신청하기' },
      showShare: true,
      showLike: true,
    },
  ];

  return (
    <>
      <SectionHeading
        level="h1"
        title="Structured List"
        description="복잡한 콘텐츠를 카드 형식으로 정리하여 표시하는 구조화 목록 컴포넌트입니다."
      />

      <PageSection>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <PageSection>
              <ComponentPreview>
                <StructuredList items={basicItems} variant="default" />
              </ComponentPreview>
            </PageSection>

            <SectionHeading level="h2" id="overview" title="개요">
              <Body className="leading-relaxed">
                Structured List는 배지, 타이틀, 설명, 날짜, 태그, 액션 버튼 등
                다양한 정보를 포함하는 복잡한 콘텐츠를 카드 형식으로 정리하여
                표시하는 컴포넌트입니다.{' '}
                <strong>KRDS(한국형 웹 콘텐츠 접근성 지침)</strong>을 준수하여
                공공 웹사이트에 최적화된 접근성과 사용성을 제공합니다.
              </Body>
            </SectionHeading>

            <SectionHeading level="h2" id="installation" title="설치" />
            <CodeBlock code="npx hanui add structured-list" language="bash" />
            <Body className="text-sm text-krds-gray-70 mt-2">
              이 명령은 컴포넌트 파일(TSX)과 스타일 파일(SCSS Module)을 자동으로
              설치합니다.
            </Body>

            <SectionHeading level="h2" id="examples" title="예제" />

            <SectionHeading
              level="h3"
              id="basic-example"
              title="기본 Structured List"
            >
              <Body>
                기본적인 Structured List입니다. 3열 그리드 레이아웃으로
                표시되며, 태블릿에서는 2열, 모바일에서는 1열로 자동 조정됩니다.
              </Body>
            </SectionHeading>
            <CodeBlock
              code={`import { StructuredList } from '@hanui/react';

const items = [
  {
    id: '1',
    badge: { text: '진행중', variant: 'primary' },
    title: '청년 주거 지원 사업',
    description: '만 19세~34세 무주택 청년에게 월세를 지원합니다...',
    date: { label: '신청 기간', value: '2024.01.01-2024.12.31' },
    tags: ['청년', '주거지원', '복지'],
    href: '#',
    action: { label: '신청하기' },
    showShare: true,
    showLike: true,
  },
  // ... more items
];

<StructuredList items={items} variant="default" />`}
              language="tsx"
            />

            <SectionHeading
              level="h3"
              id="full-variant"
              title="가로형 레이아웃"
            >
              <Body>
                `variant="full"` 속성을 사용하면 가로형 레이아웃으로 표시됩니다.
                콘텐츠가 많을 때 유용합니다.
              </Body>
            </SectionHeading>
            <CodeBlock
              code={`<StructuredList items={items} variant="full" />`}
              language="tsx"
            />
            <div className="mt-6">
              <ComponentPreview>
                <StructuredList items={basicItems} variant="full" />
              </ComponentPreview>
            </div>

            <SectionHeading level="h3" id="sizes" title="카드 크기">
              <Body>
                `size` 속성으로 카드 크기를 조절할 수 있습니다. (sm, md, lg)
              </Body>
            </SectionHeading>
            <CodeBlock
              code={`// Small size
<StructuredList items={items} size="sm" />

// Medium size (default)
<StructuredList items={items} size="md" />

// Large size
<StructuredList items={items} size="lg" />`}
              language="tsx"
            />

            <SectionHeading level="h2" id="key-features" title="주요 기능" />
            <ul className="list-disc pl-6 space-y-2 text-base text-krds-gray-90">
              <li>
                <strong>반응형 그리드:</strong> 데스크탑 3열, 태블릿 2열, 모바일
                1열로 자동 조정
              </li>
              <li>
                <strong>배지 표시:</strong> primary, success, secondary 3가지
                배지 스타일 지원
              </li>
              <li>
                <strong>3줄 설명 말줄임:</strong> 설명 텍스트는 최대 3줄까지
                표시하고 나머지는 말줄임 처리
              </li>
              <li>
                <strong>날짜 정보:</strong> 신청 기간 등 날짜 정보를 key-value
                형식으로 표시
              </li>
              <li>
                <strong>태그 시스템:</strong> 해시태그 형식의 태그 표시
              </li>
              <li>
                <strong>액션 버튼:</strong> 신청하기 등의 주요 액션 버튼 지원
              </li>
              <li>
                <strong>공유/찜 기능:</strong> 공유하기, 찜하기 버튼 지원
              </li>
              <li>
                <strong>카드 크기:</strong> sm, md, lg 3가지 크기 옵션
              </li>
            </ul>

            <SectionHeading
              level="h2"
              id="design-guidelines"
              title="디자인 가이드라인"
            />
            <Body>KRDS Structured List 가이드라인을 준수합니다:</Body>
            <ul className="list-disc pl-6 space-y-2 text-base text-krds-gray-90 mt-2">
              <li>타이틀은 한 줄 말줄임 처리</li>
              <li>설명은 최대 3줄까지 표시</li>
              <li>배지는 카드 상단에 배치</li>
              <li>태그는 카드 하단에 경계선과 함께 표시</li>
              <li>공유/찜 버튼은 카드 우측 상단에 절대 위치</li>
              <li>액션 버튼은 본문 영역 우측에 배치</li>
            </ul>

            <SectionHeading level="h2" id="accessibility" title="접근성" />
            <Body>
              Structured List 컴포넌트는 WCAG 2.1 / KWCAG 2.2 AA 레벨 준수를
              목표로 합니다:
            </Body>
            <ul className="list-disc pl-6 space-y-2 text-base text-krds-gray-90 mt-2">
              <li>
                <strong>Semantic HTML:</strong> `&lt;ul&gt;`, `&lt;li&gt;`
                요소를 사용한 시맨틱 마크업
              </li>
              <li>
                <strong>Keyboard Navigation:</strong> 모든 링크와 버튼에 키보드
                접근 가능
              </li>
              <li>
                <strong>Focus Visible:</strong> 키보드 포커스 시 명확한 아웃라인
                표시
              </li>
              <li>
                <strong>Color Contrast:</strong> WCAG AA 기준 색상 대비 준수
              </li>
              <li>
                <strong>Responsive:</strong> 모바일 환경에서 터치 친화적인
                레이아웃
              </li>
            </ul>
          </TabsContent>

          <TabsContent value="api">
            <SectionHeading
              level="h2"
              id="structured-list-props"
              title="StructuredList Props"
            />
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-krds-gray-30">
                    <th className="text-left p-3 font-semibold">Prop</th>
                    <th className="text-left p-3 font-semibold">Type</th>
                    <th className="text-left p-3 font-semibold">Default</th>
                    <th className="text-left p-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-krds-gray-20">
                    <td className="p-3 font-mono text-sm">items</td>
                    <td className="p-3 font-mono text-sm">
                      StructuredListItem[]
                    </td>
                    <td className="p-3 font-mono text-sm">-</td>
                    <td className="p-3">표시할 아이템 배열</td>
                  </tr>
                  <tr className="border-b border-krds-gray-20">
                    <td className="p-3 font-mono text-sm">variant?</td>
                    <td className="p-3 font-mono text-sm">
                      'default' | 'full'
                    </td>
                    <td className="p-3 font-mono text-sm">'default'</td>
                    <td className="p-3">
                      레이아웃 타입 (default: 세로형, full: 가로형)
                    </td>
                  </tr>
                  <tr className="border-b border-krds-gray-20">
                    <td className="p-3 font-mono text-sm">size?</td>
                    <td className="p-3 font-mono text-sm">
                      'sm' | 'md' | 'lg'
                    </td>
                    <td className="p-3 font-mono text-sm">'md'</td>
                    <td className="p-3">카드 크기</td>
                  </tr>
                  <tr className="border-b border-krds-gray-20">
                    <td className="p-3 font-mono text-sm">onShare?</td>
                    <td className="p-3 font-mono text-sm">(item) =&gt; void</td>
                    <td className="p-3 font-mono text-sm">-</td>
                    <td className="p-3">공유 버튼 클릭 핸들러</td>
                  </tr>
                  <tr className="border-b border-krds-gray-20">
                    <td className="p-3 font-mono text-sm">onLike?</td>
                    <td className="p-3 font-mono text-sm">(item) =&gt; void</td>
                    <td className="p-3 font-mono text-sm">-</td>
                    <td className="p-3">찜 버튼 클릭 핸들러</td>
                  </tr>
                  <tr className="border-b border-krds-gray-20">
                    <td className="p-3 font-mono text-sm">className?</td>
                    <td className="p-3 font-mono text-sm">string</td>
                    <td className="p-3 font-mono text-sm">''</td>
                    <td className="p-3">추가 CSS 클래스</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <SectionHeading
              level="h2"
              id="structured-list-item-type"
              title="StructuredListItem Type"
            >
              <Body>Structured List 아이템의 타입입니다:</Body>
            </SectionHeading>
            <CodeBlock
              code={`export interface StructuredListItem {
  /** 아이템 ID */
  id: string;
  /** 배지 텍스트 (선택사항) */
  badge?: {
    text: string;
    variant?: 'primary' | 'success' | 'secondary';
  };
  /** 타이틀 */
  title: string;
  /** 설명 (최대 3줄) */
  description: string;
  /** 날짜 정보 (선택사항) */
  date?: {
    label: string;  // 예: "신청 기간"
    value: string;  // 예: "2024.01.01-2024.12.31"
  };
  /** 태그 배열 (선택사항) */
  tags?: string[];
  /** 링크 URL */
  href: string;
  /** 액션 버튼 (선택사항) */
  action?: {
    label: string;
    onClick?: () => void;
  };
  /** 공유 버튼 활성화 (선택사항) */
  showShare?: boolean;
  /** 찜 버튼 활성화 (선택사항) */
  showLike?: boolean;
}`}
              language="tsx"
            />

            <SectionHeading
              level="h2"
              id="usage-notes"
              title="사용 시 주의사항"
            />
            <ul className="list-disc pl-6 space-y-2 text-base text-krds-gray-90">
              <li>타이틀은 가능한 한 간결하게 작성하세요 (1줄 권장)</li>
              <li>
                설명은 최대 3줄까지 표시되므로 핵심 내용을 먼저 작성하세요
              </li>
              <li>
                태그는 3-5개 정도가 적절하며, 너무 많으면 레이아웃이 깨질 수
                있습니다
              </li>
              <li>
                배지는 사용자의 주의를 끌기 위한 용도이므로 중요한 정보에만
                사용하세요
              </li>
              <li>
                `variant="full"`은 콘텐츠가 많을 때 유용하지만, 모바일에서는
                자동으로 세로형으로 전환됩니다
              </li>
              <li>
                공유/찜 버튼은 절대 위치로 배치되므로, 카드 높이가 충분한지
                확인하세요
              </li>
            </ul>
          </TabsContent>
        </Tabs>
      </PageSection>
    </>
  );
}
