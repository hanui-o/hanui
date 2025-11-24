'use client';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';

// Docs helper components
import { DoCard, DontCard } from '@/components/helpers';

// UI components - from @hanui/react
import {
  List,
  ListItem,
  Code,
  Body,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Card,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@hanui/react';

// TODO: StructuredList component needs to be added via CLI or created locally
// This is a placeholder that will cause compilation errors until the component is added
const StructuredList: any = () => null;
type StructuredListItem = any;

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
      <Heading
        level="h1"
        title="Structured List"
        description="복잡한 콘텐츠를 카드 형식으로 정리하여 표시하는 구조화 목록 컴포넌트입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview">
          {/* Installation */}
          <Section>
            <Heading level="h2" id="installation" title="설치">
              <Body className="leading-relaxed">
                다음 명령어로 Structured List 컴포넌트를 설치합니다:
              </Body>
            </Heading>

            <Code variant="block" language="bash" showLineNumbers={false}>
              npx @hanui/cli add structured-list
            </Code>
          </Section>

          {/* What is it */}
          <Section>
            <Heading
              level="h2"
              id="what-is-it"
              title="무엇인가요?"
              description="Structured List는 배지, 타이틀, 설명, 날짜, 태그, 액션 버튼 등 다양한 정보를 포함하는 복잡한 콘텐츠를 카드 형식으로 정리하여 표시하는 컴포넌트입니다."
            />

            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>반응형 그리드:</strong> 데스크탑 3열, 태블릿 2열,
                  모바일 1열로 자동 조정됩니다.
                </ListItem>
                <ListItem>
                  <strong>배지 시스템:</strong> primary, success, secondary
                  3가지 배지 스타일을 지원합니다.
                </ListItem>
                <ListItem>
                  <strong>말줄임 처리:</strong> 타이틀은 1줄, 설명은 최대
                  3줄까지 표시하고 나머지는 말줄임 처리합니다.
                </ListItem>
                <ListItem>
                  <strong>날짜 정보:</strong> 신청 기간 등 날짜 정보를 key-value
                  형식으로 표시합니다.
                </ListItem>
                <ListItem>
                  <strong>태그 시스템:</strong> 해시태그 형식의 태그를
                  표시합니다.
                </ListItem>
                <ListItem>
                  <strong>액션 버튼:</strong> 신청하기 등의 주요 액션 버튼을
                  지원합니다.
                </ListItem>
                <ListItem>
                  <strong>공유/찜 기능:</strong> 공유하기, 찜하기 버튼을
                  지원합니다.
                </ListItem>
                <ListItem>
                  <strong>KRDS 준수:</strong> WCAG 2.1 및 KWCAG 2.2 접근성
                  기준을 충족합니다.
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* Preview */}
          <Section>
            <Heading level="h2" id="preview" title="미리보기" />
            <Card variant="outlined">
              <StructuredList items={basicItems} variant="default" />
            </Card>
          </Section>

          {/* Usage */}
          <Section>
            <Heading level="h2" id="usage" title="사용 방법" />

            <Subsection level="h3">
              <Heading level="h3" title="기본 사용">
                <Body className="leading-relaxed">
                  기본적인 Structured List입니다. 3열 그리드 레이아웃으로
                  표시되며, 태블릿에서는 2열, 모바일에서는 1열로 자동
                  조정됩니다:
                </Body>
              </Heading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`import { StructuredList } from '@/components/hanui';

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
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="가로형 레이아웃">
                <Body className="leading-relaxed">
                  variant="full" 속성을 사용하면 가로형 레이아웃으로 표시됩니다.
                  콘텐츠가 많을 때 유용합니다:
                </Body>
              </Heading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<StructuredList items={items} variant="full" />`}
              </Code>

              <Card variant="outlined" className="mt-3">
                <StructuredList items={basicItems} variant="full" />
              </Card>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="카드 크기">
                <Body className="leading-relaxed">
                  size 속성으로 카드 크기를 조절할 수 있습니다 (sm, md, lg):
                </Body>
              </Heading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`// Small size
<StructuredList items={items} size="sm" />

// Medium size (default)
<StructuredList items={items} size="md" />

// Large size
<StructuredList items={items} size="lg" />`}
              </Code>
            </Subsection>
          </Section>

          {/* Best Practices */}
          <Section>
            <Heading level="h2" id="best-practices" title="Best Practices" />

            <Subsection level="h3">
              <Heading level="h3" title="언제 사용하나요?" />
              <DoCard title="Structured List를 사용하기 적합한 경우">
                <List variant="check">
                  <ListItem>
                    공공 지원 사업, 프로그램 등 복잡한 정보를 카드 형식으로
                    보여줄 때
                  </ListItem>
                  <ListItem>
                    배지, 날짜, 태그 등 다양한 메타데이터가 필요할 때
                  </ListItem>
                  <ListItem>
                    사용자가 각 항목에 대해 공유하거나 찜할 수 있어야 할 때
                  </ListItem>
                  <ListItem>
                    반응형 그리드 레이아웃이 필요할 때 (데스크탑 3열, 태블릿
                    2열, 모바일 1열)
                  </ListItem>
                </List>
              </DoCard>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="언제 사용하지 말아야 하나요?" />
              <DontCard title="Structured List 사용을 피해야 하는 경우">
                <List variant="dash">
                  <ListItem>
                    간단한 목록만 필요할 때 (<Code>List</Code> 컴포넌트 사용)
                  </ListItem>
                  <ListItem>
                    테이블 형태의 데이터를 표시할 때 (<Code>Table</Code>{' '}
                    컴포넌트 사용)
                  </ListItem>
                  <ListItem>
                    단순한 카드 레이아웃만 필요할 때 (<Code>Card</Code> 컴포넌트
                    사용)
                  </ListItem>
                  <ListItem>
                    태그나 배지가 필요하지 않은 간단한 콘텐츠일 때
                  </ListItem>
                </List>
              </DontCard>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="디자인 가이드라인" />
              <List>
                <ListItem>타이틀은 한 줄 말줄임 처리합니다.</ListItem>
                <ListItem>설명은 최대 3줄까지 표시합니다.</ListItem>
                <ListItem>배지는 카드 상단에 배치합니다.</ListItem>
                <ListItem>
                  태그는 카드 하단에 경계선과 함께 표시합니다.
                </ListItem>
                <ListItem>
                  공유/찜 버튼은 카드 우측 상단에 절대 위치로 배치합니다.
                </ListItem>
                <ListItem>액션 버튼은 본문 영역 우측에 배치합니다.</ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="사용 시 주의사항" />
              <List>
                <ListItem>
                  타이틀은 가능한 한 간결하게 작성하세요 (1줄 권장).
                </ListItem>
                <ListItem>
                  설명은 최대 3줄까지 표시되므로 핵심 내용을 먼저 작성하세요.
                </ListItem>
                <ListItem>
                  태그는 3-5개 정도가 적절하며, 너무 많으면 레이아웃이 깨질 수
                  있습니다.
                </ListItem>
                <ListItem>
                  배지는 사용자의 주의를 끌기 위한 용도이므로 중요한 정보에만
                  사용하세요.
                </ListItem>
                <ListItem>
                  variant="full"은 콘텐츠가 많을 때 유용하지만, 모바일에서는
                  자동으로 세로형으로 전환됩니다.
                </ListItem>
                <ListItem>
                  공유/찜 버튼은 절대 위치로 배치되므로, 카드 높이가 충분한지
                  확인하세요.
                </ListItem>
              </List>
            </Subsection>
          </Section>

          {/* Accessibility */}
          <Section>
            <Heading level="h2" id="accessibility" title="접근성" />

            <Body className="mb-3">
              Structured List 컴포넌트는 WCAG 2.1 / KWCAG 2.2 AA 레벨 준수를
              목표로 합니다:
            </Body>

            <List variant="check">
              <ListItem>
                <strong>Semantic HTML:</strong> &lt;ul&gt;, &lt;li&gt; 요소를
                사용한 시맨틱 마크업
              </ListItem>
              <ListItem>
                <strong>Keyboard Navigation:</strong> 모든 링크와 버튼에 키보드
                접근 가능
              </ListItem>
              <ListItem>
                <strong>Focus Visible:</strong> 키보드 포커스 시 명확한 아웃라인
                표시
              </ListItem>
              <ListItem>
                <strong>Color Contrast:</strong> WCAG AA 기준 색상 대비 준수
              </ListItem>
              <ListItem>
                <strong>Responsive:</strong> 모바일 환경에서 터치 친화적인
                레이아웃
              </ListItem>
            </List>
          </Section>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
          <Section>
            <Heading level="h2" id="api" title="API Reference" />

            <Subsection level="h3">
              <Heading level="h3" title="StructuredList Props" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">items</TableCell>
                    <TableCell className="font-mono">
                      StructuredListItem[]
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>표시할 아이템 배열</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">variant</TableCell>
                    <TableCell className="font-mono">
                      &apos;default&apos; | &apos;full&apos;
                    </TableCell>
                    <TableCell className="font-mono">
                      &apos;default&apos;
                    </TableCell>
                    <TableCell>
                      레이아웃 타입 (default: 세로형, full: 가로형)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">size</TableCell>
                    <TableCell className="font-mono">
                      &apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;
                    </TableCell>
                    <TableCell className="font-mono">&apos;md&apos;</TableCell>
                    <TableCell>카드 크기</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">onShare</TableCell>
                    <TableCell className="font-mono">
                      (item) =&gt; void
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>공유 버튼 클릭 핸들러</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">onLike</TableCell>
                    <TableCell className="font-mono">
                      (item) =&gt; void
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>찜 버튼 클릭 핸들러</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">className</TableCell>
                    <TableCell className="font-mono">string</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="StructuredListItem Type" />

              <Body className="mb-3">Structured List 아이템의 타입입니다:</Body>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`export interface StructuredListItem {
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
              </Code>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Stack', href: '/components/stack' }}
        next={{ title: 'Tab Bars', href: '/components/tabbars' }}
      />
    </>
  );
}
