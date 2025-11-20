import Link from 'next/link';
import { Section, SectionHeading, Body, Wrap } from '@/components/hanui';

// KRDS 분류 체계에 따른 컴포넌트 정리

// 타이포그래피 (HANUI 독자 분류) - 알파벳 순
const typographyComponents = [
  {
    name: 'Body',
    description: '본문 텍스트',
    href: '/components/body',
    updated: true,
  },
  {
    name: 'Display',
    description: '대형 텍스트',
    href: '/components/display',
    updated: true,
  },
  {
    name: 'Heading',
    description: '제목',
    href: '/components/heading',
    updated: true,
  },
  {
    name: 'NavText',
    description: '네비게이션 텍스트',
    href: '/components/navtext',
    updated: true,
  },
];

// 1. 아이덴티티 (Identity) - 알파벳 순
const identityComponents = [
  {
    name: 'Footer',
    description: '푸터 (CSS Module)',
    href: '/components/identity/footer',
    updated: true,
  },
  {
    name: 'Header',
    description: '헤더 (CSS Module)',
    href: '/components/identity/header',
    updated: true,
  },
  {
    name: 'Identifier',
    description: '운영기관 식별자',
    href: '/components/identity/identifier',
    updated: true,
  },
  {
    name: 'Masthead',
    description: '공식 배너',
    href: '/components/identity/masthead',
    updated: true,
  },
];

// 2. 탐색 (Navigation) - 하위 분류
const navigationMainComponents = [
  {
    name: 'Main Menu',
    description: '주 메뉴',
    href: '/components/navigation/mainmenu',
    updated: true,
  },
  {
    name: 'Side Navigation',
    description: '사이드 메뉴',
    href: '/components/navigation/sidenavigation',
    updated: true,
  },
  {
    name: 'Tab Bars',
    description: '하단 고정 탭바',
    href: '/components/navigation/tabbars',
    updated: true,
  },
];

const navigationContentComponents = [
  {
    name: 'Breadcrumb',
    description: '브레드크럼',
    href: '/components/navigation/breadcrumb',
    updated: true,
  },
  {
    name: 'In-page Navigation',
    description: '콘텐츠 내 탐색',
    href: '/components/navigation/inpagenavigation',
    updated: true,
  },
  {
    name: 'Pagination',
    description: '페이지네이션',
    href: '/components/navigation/pagination',
    updated: true,
  },
];

const navigationLinkComponents = [
  {
    name: 'Link',
    description: 'Next.js 통합 링크',
    href: '/components/navigation/link',
    updated: true,
  },
  {
    name: 'SkipLink',
    description: '건너뛰기 링크 (접근성)',
    href: '/components/navigation/skiplink',
    updated: true,
  },
];

// 3. 레이아웃 및 표현 (Layout & Presentation)
const presentationComponents = [
  // Layout 컴포넌트들
  {
    name: 'Container',
    description: '컨테이너',
    href: '/components/container',
    updated: true,
  },
  {
    name: 'Stack',
    description: '스택 레이아웃',
    href: '/components/stack',
    updated: true,
  },
  {
    name: 'Wrap',
    description: '자동 줄바꿈 레이아웃',
    href: '/components/wrap',
    updated: true,
  },
  {
    name: 'SimpleGrid',
    description: '간단한 그리드 레이아웃',
    href: '/components/simple-grid',
    updated: true,
  },
  {
    name: 'Section',
    description: '섹션',
    href: '/components/section',
    updated: true,
  },
  {
    name: 'Section Heading System',
    description: 'KRDS Gap-layout 자동 간격 시스템',
    href: '/components/section-heading-system',
    updated: true,
  },
  {
    name: 'List',
    description: '리스트',
    href: '/components/list',
    updated: true,
  },
  {
    name: 'Code',
    description: '인라인/블록 코드',
    href: '/components/code',
    updated: true,
  },
  // Presentation 컴포넌트들
  {
    name: 'Structured List',
    description: '구조화 목록',
    href: '/components/structured-list',
    updated: true,
  },
  {
    name: 'Modal',
    description: '모달',
    href: '/components/modal',
    updated: true,
  },
  {
    name: 'Accordion',
    description: '아코디언',
    href: '/components/accordion',
    updated: true,
  },
  { name: 'Tab', description: '탭', href: '/components/tabs', updated: true },
  {
    name: 'Table',
    description: '표',
    href: '/components/table',
    updated: true,
  },
  {
    name: 'Card',
    description: '카드',
    href: '/components/card',
    updated: true,
  },
];

// 4. 액션 (Action)
const actionComponents = [
  {
    name: 'Button',
    description: '버튼',
    href: '/components/action/button',
    updated: true,
  },
];

// 5. 선택 (Selection)
const selectionComponents = [
  {
    name: 'Select',
    description: '셀렉트',
    href: '/components/selection/select',
    updated: true,
  },
];

// 6. 피드백 (Feedback)
const feedbackComponents: Array<{
  name: string;
  description?: string;
  href: string;
  updated: boolean;
}> = [];

// 7. 도움 (Help)
const helpComponents = [
  {
    name: 'Tooltip',
    description: '툴팁',
    href: '/components/help/tooltip',
    updated: true,
  },
];

// 8. 입력 (Input)
const inputComponents = [
  {
    name: 'Label',
    description: '라벨',
    href: '/components/form/label',
    updated: true,
  },
  {
    name: 'Text Input',
    description: '텍스트 입력 필드',
    href: '/components/form/input',
    updated: true,
  },
  {
    name: 'File Upload',
    description: '파일 업로드',
    href: '/components/form/file-upload',
    updated: true,
  },
];

// 9. 설정 (Settings)
const settingsComponents: Array<{
  name: string;
  description?: string;
  href: string;
  updated: boolean;
}> = [];

// 10. 콘텐츠 (Content)
const contentComponents: Array<{
  name: string;
  description?: string;
  href: string;
  updated: boolean;
}> = [];

// 컴포넌트 섹션 렌더링 함수
function ComponentSection({
  title,
  description,
  components,
  id,
}: {
  title: string;
  description?: string;
  components: Array<{
    name: string;
    description?: string;
    href: string;
    updated: boolean;
  }>;
  id: string;
}) {
  if (components.length === 0) return null;

  return (
    <Section level="h2">
      <SectionHeading level="h2" id={id} title={title}>
        {description && (
          <Body className="text-krds-gray-70">{description}</Body>
        )}
      </SectionHeading>

      <Wrap gap="lg">
        {components.map((component) => (
          <Link
            key={component.name}
            href={component.href}
            className="relative rounded-lg transition-all group flex items-center gap-2 min-w-[200px]"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-base font-medium text-krds-gray-95 group-hover:underline transition-all">
                  {component.name}
                </span>
                {component.updated && (
                  <span className="w-2 h-2 rounded-full bg-krds-primary-base" />
                )}
              </div>
              {component.description && (
                <span className="text-sm text-krds-gray-70">
                  {component.description}
                </span>
              )}
            </div>
          </Link>
        ))}
      </Wrap>
    </Section>
  );
}

export default function ComponentsPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Components"
        description="HANUI 라이브러리에서 제공하는 모든 컴포넌트를 KRDS(Korean Design System) 분류 체계에 따라 정리했습니다."
      />

      {/* 타이포그래피 */}
      <ComponentSection
        title="타이포그래피"
        description="텍스트 스타일링을 위한 컴포넌트"
        components={typographyComponents}
        id="typography"
      />

      {/* KRDS 분류 체계 */}
      <ComponentSection
        title="아이덴티티"
        description="정부/공공기관의 공식 아이덴티티를 표현하는 컴포넌트"
        components={identityComponents}
        id="identity"
      />

      <Section level="h2">
        <SectionHeading
          level="h2"
          id="navigation"
          title="탐색"
          description="사용자가 콘텐츠를 탐색하고 이동하는 데 사용하는 컴포넌트"
        />

        <Wrap gap="lg">
          {[
            ...navigationMainComponents,
            ...navigationContentComponents,
            ...navigationLinkComponents,
          ].map((component) => (
            <Link
              key={component.name}
              href={component.href}
              className="relative rounded-lg transition-all group flex items-center gap-2 min-w-[200px]"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-base font-medium text-krds-gray-95 group-hover:underline transition-all">
                    {component.name}
                  </span>
                  {component.updated && (
                    <span className="w-2 h-2 rounded-full bg-krds-primary-base" />
                  )}
                </div>
                {component.description && (
                  <span className="text-sm text-krds-gray-70">
                    {component.description}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </Wrap>
      </Section>

      <ComponentSection
        title="레이아웃 및 표현"
        description="콘텐츠를 구조화하고 표현하는 컴포넌트"
        components={presentationComponents}
        id="presentation"
      />

      <ComponentSection
        title="액션"
        description="사용자 행동을 유도하는 상호작용 컴포넌트"
        components={actionComponents}
        id="action"
      />

      <ComponentSection
        title="선택"
        description="사용자가 옵션을 선택하는 데 사용하는 입력 컴포넌트"
        components={selectionComponents}
        id="selection"
      />

      <ComponentSection
        title="도움"
        description="사용자에게 도움말과 가이드를 제공하는 컴포넌트"
        components={helpComponents}
        id="help"
      />

      <ComponentSection
        title="입력"
        description="사용자로부터 데이터를 입력받는 폼 컴포넌트"
        components={inputComponents}
        id="input"
      />
    </>
  );
}
