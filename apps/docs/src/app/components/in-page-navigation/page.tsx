'use client';

// Docs layout components
import {
  PageSection as Section,
  Subsection,
  Heading,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';
import { ComponentPreview } from '@/components/content/ComponentPreview';

// UI components - from @hanui/react
import {
  Body,
  Card,
  Code,
  List,
  ListItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  InPageNavigation,
} from '@hanui/react';

export default function InPageNavigationPage() {
  const basicLinks = [
    { label: '서비스 개요', href: '#section_01', active: true },
    { label: '서비스 상세', href: '#section_02' },
    { label: '신청 방법 및 절차', href: '#section_03' },
    { label: '제출 서류', href: '#section_04' },
  ];

  const actionLinks = [
    { label: '지원 대상', href: '#target', active: true },
    { label: '지원 내용', href: '#content' },
    { label: '신청 방법', href: '#apply' },
    { label: '문의처', href: '#contact' },
  ];

  const handleApply = () => {
    alert('온라인 신청하기 클릭됨');
  };

  return (
    <>
      <Heading
        level="h1"
        title="In-page Navigation"
        description="페이지 내 콘텐츠 탐색을 위한 고정 사이드바 네비게이션 컴포넌트입니다. 스크롤 위치에 따라 자동으로 활성 링크가 업데이트됩니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Overview */}
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />

            <ComponentPreview>
              <InPageNavigation
                caption="이 페이지의 구성"
                title="장애아동수당"
                links={basicLinks}
                className="!static"
              />
            </ComponentPreview>

            <Code variant="block" language="tsx">
              {`import { InPageNavigation } from '@hanui/react'

const links = [
  { label: '서비스 개요', href: '#section_01', active: true },
  { label: '서비스 상세', href: '#section_02' },
  { label: '신청 방법 및 절차', href: '#section_03' },
  { label: '제출 서류', href: '#section_04' },
];

<InPageNavigation
  caption="이 페이지의 구성"
  title="장애아동수당"
  links={links}
/>`}
            </Code>
          </Section>

          <Section level="h2">
            <Installation componentName="in-page-navigation" />
          </Section>

          {/* Usage */}
          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { InPageNavigation } from '@hanui/react'

const links = [
  { label: '서비스 개요', href: '#section_01', active: true },
  { label: '서비스 상세', href: '#section_02' },
  { label: '신청 방법 및 절차', href: '#section_03' },
];

<InPageNavigation
  caption="이 페이지의 구성"
  title="장애아동수당"
  links={links}
/>`}
            </Code>
          </Section>

          {/* Examples */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading level="h3" title="액션 버튼 포함" />
              <ComponentPreview>
                <InPageNavigation
                  caption="이 페이지의 구성"
                  title="장애아동수당"
                  links={actionLinks}
                  action={{
                    label: '온라인 신청하기',
                    onClick: handleApply,
                    info: '장애아동수당 외 <strong>1건</strong>',
                  }}
                  className="!static"
                />
              </ComponentPreview>

              <Code variant="block" language="tsx">
                {`<InPageNavigation
  caption="이 페이지의 구성"
  title="청년 주거지원 사업"
  links={links}
  action={{
    label: '온라인 신청하기',
    onClick: () => console.log('Apply'),
    info: '청년 주거지원 외 <strong>2건</strong>',
  }}
/>`}
              </Code>
            </Subsection>
          </Section>

          {/* Accessibility */}
          <Section level="h2">
            <Heading level="h2" id="accessibility" title="접근성" />

            <List variant="unordered">
              <ListItem>
                <strong>시맨틱 HTML:</strong> nav 요소로 네비게이션 영역을
                명확히 표시
              </ListItem>
              <ListItem>
                <strong>ARIA 레이블:</strong> aria-label과 aria-current로
                네비게이션 목적 명시
              </ListItem>
              <ListItem>
                <strong>키보드 네비게이션:</strong> Tab 키로 모든 링크 접근,
                Enter 키로 활성화
              </ListItem>
              <ListItem>
                <strong>고대비 모드:</strong> Windows 고대비 모드 지원
              </ListItem>
            </List>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          {/* Props */}
          <Section level="h2">
            <Heading level="h2" id="props" title="Props" />

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
                  <TableCell>
                    <Code>caption</Code>
                  </TableCell>
                  <TableCell>
                    <Code>string</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Caption text (위 작은 텍스트)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>title</Code>
                  </TableCell>
                  <TableCell>
                    <Code>string</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Title text (주요 제목)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>links</Code>
                  </TableCell>
                  <TableCell>
                    <Code>InPageNavLink[]</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    Navigation links 배열 (필수). 각 링크는 label, href,
                    active를 포함
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>action</Code>
                  </TableCell>
                  <TableCell>
                    <Code>
                      {`{ label: string; onClick: () => void; info?: string }`}
                    </Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    Optional action button 설정. label(버튼 텍스트),
                    onClick(클릭 핸들러), info(설명 텍스트)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>className</Code>
                  </TableCell>
                  <TableCell>
                    <Code>string</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>추가 CSS 클래스</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Section>

          {/* InPageNavLink Type */}
          <Section level="h2">
            <Heading level="h2" id="link-type" title="InPageNavLink Type" />

            <Code variant="block" language="tsx">
              {`export interface InPageNavLink {
  label: string;     // Link label (표시 텍스트)
  href: string;      // Link URL (앵커, 예: '#section_01')
  active?: boolean;  // 초기 활성 상태 (optional)
}`}
            </Code>
          </Section>

          {/* CSS Classes */}
          <Section level="h2">
            <Heading level="h2" id="css-classes" title="CSS 클래스" />

            <List variant="unordered">
              <ListItem>
                <Code>.krds-in-page-navigation-type</Code> - 메인 컨테이너
              </ListItem>
              <ListItem>
                <Code>.krds-in-page-navigation-area</Code> - 네비게이션 영역
              </ListItem>
              <ListItem>
                <Code>.in-page-navigation-header</Code> - 헤더 영역
              </ListItem>
              <ListItem>
                <Code>.in-page-navigation-list</Code> - 링크 리스트
              </ListItem>
              <ListItem>
                <Code>.in-page-navigation-action</Code> - 액션 버튼 영역
              </ListItem>
              <ListItem>
                <Code>.active</Code> - 활성 링크 클래스
              </ListItem>
            </List>
          </Section>

          {/* CSS Variables */}
          <Section level="h2">
            <Heading level="h2" id="css-variables" title="CSS 변수" />

            <Code variant="block" language="css">
              {`/* 색상 */
--krds-color-light-gray-0      /* 배경 (흰색) */
--krds-color-light-gray-10     /* 보조 배경, 스크롤바 */
--krds-color-light-gray-20     /* 구분선 */
--krds-color-light-gray-70     /* 보조 텍스트 */
--krds-color-light-gray-90     /* 주요 텍스트 */

--krds-color-light-primary-5   /* Primary 배경 (hover) */
--krds-color-light-primary-10  /* Primary 배경 (active) */
--krds-color-light-primary-60  /* Primary 색상 */
--krds-color-light-primary-70  /* Primary hover */
--krds-color-light-primary-80  /* Primary active */`}
            </Code>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Image', href: '/components/image' }}
        next={{ title: 'Input', href: '/components/input' }}
      />
    </>
  );
}
