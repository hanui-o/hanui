import Link from 'next/link';
import { Stack, Heading, Body } from '@hanui/react';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

// KRDS 분류 체계에 따른 컴포넌트 정리

// 타이포그래피 (HANUI 독자 분류)
const typographyComponents = [
  {
    name: 'Display',
    description: '대형 텍스트',
    href: '/typography/display',
    updated: true,
  },
  {
    name: 'Heading',
    description: '제목',
    href: '/typography/heading',
    updated: true,
  },
  {
    name: 'Body',
    description: '본문 텍스트',
    href: '/typography/body',
    updated: true,
  },
  {
    name: 'NavText',
    description: '네비게이션 텍스트',
    href: '/typography/navtext',
    updated: true,
  },
];

// 1. 아이덴티티 (Identity)
const identityComponents = [
  {
    name: 'Masthead',
    description: '공식 배너',
    href: '/components/identity/masthead',
    updated: true,
  },
  {
    name: 'Identifier',
    description: '운영기관 식별자',
    href: '/components/identity/identifier',
    updated: true,
  },
  {
    name: 'Header',
    description: '헤더 (CSS Module)',
    href: '/components/identity/header',
    updated: true,
  },
  {
    name: 'Footer',
    description: '푸터 (CSS Module)',
    href: '/components/identity/footer',
    updated: true,
  },
];

// 2. 탐색 (Navigation)
const navigationComponents = [
  {
    name: 'SkipLink',
    description: '건너뛰기 링크',
    href: '/components/navigation/skiplink',
    updated: true,
  },
  {
    name: 'Main Menu',
    description: '주 메뉴',
    href: '/components/navigation/mainmenu',
    updated: true,
  },
  {
    name: 'Breadcrumb',
    description: '브레드크럼',
    href: '/components/navigation/breadcrumb',
    updated: true,
  },
  {
    name: 'Side Navigation',
    description: '사이드 메뉴',
    href: '/components/navigation/sidenavigation',
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
  {
    name: 'Tab Bars',
    description: '하단 고정 탭바',
    href: '/components/navigation/tabbars',
    updated: true,
  },
];

// 3. 레이아웃 및 표현 (Layout & Presentation)
const presentationComponents = [
  // Layout 컴포넌트들
  {
    name: 'Container',
    description: '컨테이너',
    href: '/layout/container',
    updated: true,
  },
  { name: 'Box', description: '박스', href: '/layout/box', updated: true },
  {
    name: 'Stack',
    description: '스택 레이아웃',
    href: '/layout/stack',
    updated: true,
  },
  {
    name: 'Section',
    description: '섹션',
    href: '/layout/section',
    updated: true,
  },
  {
    name: 'Section Heading System',
    description: 'KRDS Gap-layout 자동 간격 시스템',
    href: '/layout/section-heading-system',
    updated: true,
  },
  { name: 'List', description: '리스트', href: '/layout/list', updated: true },
  {
    name: 'Code',
    description: '인라인/블록 코드',
    href: '/layout/code',
    updated: true,
  },
  // Presentation 컴포넌트들
  {
    name: 'Structured List',
    description: '구조화 목록',
    href: '/layout/structured-list',
    updated: true,
  },
  // { name: 'Critical Alerts', description: '긴급 공지', href: '/components/critical-alerts', updated: false },
  // { name: 'Calendar', description: '달력', href: '/components/calendar', updated: false },
  // { name: 'Disclosure', description: '디스클로저', href: '/components/disclosure', updated: false },
  {
    name: 'Modal',
    description: '모달',
    href: '/layout/modal',
    updated: true,
  },
  // { name: 'Badge', description: '배지', href: '/components/badge', updated: false },
  {
    name: 'Accordion',
    description: '아코디언',
    href: '/layout/accordion',
    updated: true,
  },
  // { name: 'Image', description: '이미지', href: '/components/image', updated: false },
  // { name: 'Carousel', description: '캐러셀', href: '/components/carousel', updated: false },
  { name: 'Tab', description: '탭', href: '/layout/tabs', updated: true },
  {
    name: 'Table',
    description: '표',
    href: '/layout/table',
    updated: true,
  },
  // { name: 'Splash Screen', description: '스플래시 스크린', href: '/components/splash-screen', updated: false },
  // { name: 'Text List', description: '텍스트 목록', href: '/components/text-list', updated: false },
  {
    name: 'Card',
    description: '카드',
    href: '/layout/card',
    updated: true,
  },
];

// 4. 액션 (Action)
const actionComponents = [
  // { name: 'Link', description: '링크', href: '/components/link', updated: false },
  {
    name: 'Button',
    description: '버튼',
    href: '/components/action/button',
    updated: true,
  },
];

// 5. 선택 (Selection)
const selectionComponents = [
  // { name: 'Radio Button', description: '라디오 버튼', href: '/components/radio-button', updated: false },
  // { name: 'Checkbox', description: '체크박스', href: '/components/checkbox', updated: false },
  {
    name: 'Select',
    description: '셀렉트',
    href: '/components/selection/select',
    updated: true,
  },
  // { name: 'Tag', description: '태그', href: '/components/tag', updated: false },
  // { name: 'Toggle Switch', description: '토글 스위치', href: '/components/toggle-switch', updated: false },
];

// 6. 피드백 (Feedback)
const feedbackComponents = [
  // { name: 'Step Indicator', description: '단계 표시기', href: '/components/step-indicator', updated: false },
  // { name: 'Spinner', description: '스피너', href: '/components/spinner', updated: false },
];

// 7. 도움 (Help)
const helpComponents = [
  // { name: 'Help Panel', description: '도움 패널', href: '/components/help-panel', updated: false },
  // { name: 'Tutorial Panel', description: '따라하기 패널', href: '/components/tutorial-panel', updated: false },
  // { name: 'Contextual Help', description: '맥락적 도움말', href: '/components/contextual-help', updated: false },
  // { name: 'Coach Mark', description: '코치마크', href: '/components/coach-mark', updated: false },
  {
    name: 'Tooltip',
    description: '툴팁',
    href: '/components/help/tooltip',
    updated: true,
  },
];

// 8. 입력 (Input)
const inputComponents = [
  // { name: 'Date Input', description: '날짜 입력 필드', href: '/components/date-input', updated: false },
  // { name: 'Textarea', description: '텍스트 영역', href: '/components/textarea', updated: false },
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
const settingsComponents = [
  // { name: 'Language Switcher', description: '언어 변경', href: '/components/language-switcher', updated: false },
  // { name: 'Resize', description: '화면 크기 조정', href: '/components/resize', updated: false },
];

// 10. 콘텐츠 (Content)
const contentComponents = [
  // { name: 'Accessible Multimedia', description: '접근 가능한 미디어', href: '/components/accessible-multimedia', updated: false },
  // { name: 'Visually Hidden', description: '숨긴 콘텐츠', href: '/components/visually-hidden', updated: false },
];

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
    <PageSection>
      <Stack gap="md">
        <div>
          <Heading level="h2" id={id} className="text-2xl font-semibold">
            {title}
          </Heading>
          {description && (
            <Body className="text-krds-gray-70 mt-2">{description}</Body>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {components.map((component) => (
            <Link
              key={component.name}
              href={component.href}
              className="relative rounded-lg transition-all group flex items-center gap-2"
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
                  <span className="text-krds-gray-70">
                    {component.description}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </Stack>
    </PageSection>
  );
}

export default function ComponentsPage() {
  return (
    <>
      <PageHeader
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

      <ComponentSection
        title="탐색"
        description="사용자가 콘텐츠를 탐색하고 이동하는 데 사용하는 컴포넌트"
        components={navigationComponents}
        id="navigation"
      />

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
