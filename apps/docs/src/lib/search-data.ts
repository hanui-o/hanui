export interface SearchItem {
  title: string;
  description?: string;
  href: string;
  category:
    | 'get-started'
    | 'design-system'
    | 'components'
    | 'templates'
    | 'community'
    | 'showcase';
  keywords?: string[];
}

export const searchData: SearchItem[] = [
  // Get Started
  {
    title: 'Introduction',
    description:
      'HANUI는 Radix UI Primitives 기반의 KRDS 컴포넌트 라이브러리입니다.',
    href: '/docs/introduction',
    category: 'get-started',
    keywords: [
      '시작하기',
      '소개',
      'KRDS',
      'Radix UI',
      '접근성',
      'introduction',
    ],
  },
  {
    title: 'Installation',
    description: 'HANUI를 프로젝트에 설치하고 설정하는 방법을 안내합니다.',
    href: '/docs/installation',
    category: 'get-started',
    keywords: ['설치', 'install', 'setup', 'CLI', 'npm', 'pnpm', 'yarn'],
  },
  {
    title: 'Quick Start',
    description: '빠르게 HANUI를 시작하는 방법을 안내합니다.',
    href: '/docs/quick-start',
    category: 'get-started',
    keywords: ['빠른 시작', 'quick start', '튜토리얼', 'tutorial'],
  },
  {
    title: 'Strategy',
    description: 'HANUI의 전략과 방향성을 안내합니다.',
    href: '/docs/strategy',
    category: 'get-started',
    keywords: ['전략', 'strategy', '방향성', 'roadmap'],
  },

  // Design System
  {
    title: 'Colors',
    description: 'KRDS 컬러 시스템을 안내합니다.',
    href: '/design-system/colors',
    category: 'design-system',
    keywords: ['색상', 'colors', 'palette', '팔레트', 'KRDS'],
  },
  {
    title: 'Typography',
    description: 'KRDS 타이포그래피 시스템을 안내합니다.',
    href: '/design-system/typography',
    category: 'design-system',
    keywords: ['타이포그래피', 'typography', 'font', '폰트', '글꼴'],
  },

  // Layout Components
  {
    title: 'Container',
    description:
      '컨텐츠를 중앙 정렬하고 최대 너비를 제한하는 레이아웃 컴포넌트입니다.',
    href: '/components/container',
    category: 'components',
    keywords: ['컨테이너', 'container', 'layout', '레이아웃', 'wrapper'],
  },
  {
    title: 'Section',
    description: '페이지의 논리적 구획을 나타내는 시맨틱 컴포넌트입니다.',
    href: '/components/section',
    category: 'components',
    keywords: ['섹션', 'section', 'layout', '레이아웃'],
  },
  {
    title: 'Stack',
    description:
      '요소들을 수직 또는 수평으로 배치하는 레이아웃 컴포넌트입니다.',
    href: '/components/stack',
    category: 'components',
    keywords: ['스택', 'stack', 'layout', '레이아웃', 'flex'],
  },
  {
    title: 'Wrap',
    description: '요소들을 자동으로 줄바꿈하는 레이아웃 컴포넌트입니다.',
    href: '/components/wrap',
    category: 'components',
    keywords: ['랩', 'wrap', 'layout', '레이아웃', 'flex wrap'],
  },
  {
    title: 'Simple Grid',
    description: '반응형 그리드 레이아웃을 제공하는 컴포넌트입니다.',
    href: '/components/simple-grid',
    category: 'components',
    keywords: ['그리드', 'grid', 'layout', '레이아웃', 'responsive'],
  },

  // Typography Components
  {
    title: 'Heading',
    description: '제목을 표시하는 타이포그래피 컴포넌트입니다.',
    href: '/components/heading',
    category: 'components',
    keywords: [
      '제목',
      'heading',
      'h1',
      'h2',
      'h3',
      'typography',
      '타이포그래피',
    ],
  },
  {
    title: 'Body',
    description: '본문 텍스트를 표시하는 타이포그래피 컴포넌트입니다.',
    href: '/components/body',
    category: 'components',
    keywords: [
      '본문',
      'body',
      'text',
      'paragraph',
      'typography',
      '타이포그래피',
    ],
  },
  {
    title: 'Display',
    description:
      '대형 디스플레이 텍스트를 표시하는 타이포그래피 컴포넌트입니다.',
    href: '/components/display',
    category: 'components',
    keywords: [
      '디스플레이',
      'display',
      'large text',
      'typography',
      '타이포그래피',
    ],
  },
  {
    title: 'Label',
    description: '폼 요소의 레이블을 표시하는 컴포넌트입니다.',
    href: '/components/label',
    category: 'components',
    keywords: ['레이블', 'label', 'form', '폼'],
  },

  // Navigation Components
  {
    title: 'Link',
    description: '링크를 표시하는 컴포넌트입니다.',
    href: '/components/link',
    category: 'components',
    keywords: ['링크', 'link', 'anchor', 'navigation', '네비게이션'],
  },
  {
    title: 'Header',
    description: '페이지 상단 헤더 컴포넌트입니다.',
    href: '/components/header',
    category: 'components',
    keywords: ['헤더', 'header', 'navigation', '네비게이션', 'masthead'],
  },
  {
    title: 'Footer',
    description: '페이지 하단 푸터 컴포넌트입니다.',
    href: '/components/footer',
    category: 'components',
    keywords: ['푸터', 'footer', 'navigation', '네비게이션'],
  },
  {
    title: 'Side Navigation',
    description: '사이드 내비게이션 컴포넌트입니다.',
    href: '/components/side-navigation',
    category: 'components',
    keywords: ['사이드바', 'sidebar', 'side navigation', '네비게이션', 'menu'],
  },
  {
    title: 'Page Navigation',
    description: '페이지 네비게이션 컴포넌트입니다.',
    href: '/components/page-navigation',
    category: 'components',
    keywords: [
      '페이지 네비게이션',
      'page navigation',
      'prev',
      'next',
      'pagination',
    ],
  },
  {
    title: 'Breadcrumb',
    description: '현재 페이지의 위치를 보여주는 브레드크럼 컴포넌트입니다.',
    href: '/components/breadcrumb',
    category: 'components',
    keywords: ['브레드크럼', 'breadcrumb', 'navigation', '네비게이션', 'path'],
  },
  {
    title: 'Tab Bars',
    description: '탭 바 컴포넌트입니다.',
    href: '/components/tabbars',
    category: 'components',
    keywords: ['탭바', 'tab bars', 'tabs', '탭', 'navigation'],
  },
  {
    title: 'Tabs',
    description: '탭 컴포넌트입니다.',
    href: '/components/tabs',
    category: 'components',
    keywords: ['탭', 'tabs', 'tab panel', 'navigation'],
  },
  {
    title: 'Skip Link',
    description: '본문으로 바로가기 링크 컴포넌트입니다.',
    href: '/components/skiplink',
    category: 'components',
    keywords: ['스킵링크', 'skip link', '바로가기', 'accessibility', '접근성'],
  },

  // Form Components
  {
    title: 'Button',
    description: '버튼 컴포넌트입니다.',
    href: '/components/button',
    category: 'components',
    keywords: ['버튼', 'button', 'cta', 'action'],
  },
  {
    title: 'Input',
    description: '텍스트 입력 필드 컴포넌트입니다.',
    href: '/components/input',
    category: 'components',
    keywords: ['입력', 'input', 'text field', 'form', '폼'],
  },
  {
    title: 'Select',
    description: '선택 상자 컴포넌트입니다.',
    href: '/components/select',
    category: 'components',
    keywords: ['선택', 'select', 'dropdown', '드롭다운', 'form', '폼'],
  },
  {
    title: 'File Upload',
    description: '파일 업로드 컴포넌트입니다.',
    href: '/components/file-upload',
    category: 'components',
    keywords: ['파일 업로드', 'file upload', 'upload', 'form', '폼'],
  },

  // Data Display Components
  {
    title: 'Card',
    description: '카드 컴포넌트입니다.',
    href: '/components/card',
    category: 'components',
    keywords: ['카드', 'card', 'container', 'box'],
  },
  {
    title: 'Table',
    description: '테이블 컴포넌트입니다.',
    href: '/components/table',
    category: 'components',
    keywords: ['테이블', 'table', 'data', '데이터', 'grid'],
  },
  {
    title: 'List',
    description: '리스트 컴포넌트입니다.',
    href: '/components/list',
    category: 'components',
    keywords: ['리스트', 'list', 'ul', 'ol', 'menu'],
  },
  {
    title: 'Structured List',
    description: '구조화된 리스트 컴포넌트입니다.',
    href: '/components/structured-list',
    category: 'components',
    keywords: [
      '구조화된 리스트',
      'structured list',
      'data list',
      'definition list',
    ],
  },
  {
    title: 'Code',
    description: '코드를 표시하는 컴포넌트입니다.',
    href: '/components/code',
    category: 'components',
    keywords: ['코드', 'code', 'pre', 'syntax', '구문'],
  },

  // Feedback Components
  {
    title: 'Modal',
    description: '모달 대화상자 컴포넌트입니다.',
    href: '/components/modal',
    category: 'components',
    keywords: ['모달', 'modal', 'dialog', 'popup', '팝업'],
  },
  {
    title: 'Tooltip',
    description: '툴팁 컴포넌트입니다.',
    href: '/components/tooltip',
    category: 'components',
    keywords: ['툴팁', 'tooltip', 'hint', 'popover'],
  },
  {
    title: 'Accordion',
    description: '아코디언 컴포넌트입니다.',
    href: '/components/accordion',
    category: 'components',
    keywords: ['아코디언', 'accordion', 'collapse', 'expand', '접기', '펼치기'],
  },

  // Other Components
  {
    title: 'Pagination',
    description: '페이지네이션 컴포넌트입니다.',
    href: '/components/pagination',
    category: 'components',
    keywords: ['페이지네이션', 'pagination', 'paging', 'navigation'],
  },
  {
    title: 'Identifier',
    description: '식별자 컴포넌트입니다.',
    href: '/components/identifier',
    category: 'components',
    keywords: ['식별자', 'identifier', 'id', 'badge', '뱃지'],
  },
  {
    title: 'Border Radius',
    description: '테두리 반경 컴포넌트입니다.',
    href: '/components/border-radius',
    category: 'components',
    keywords: ['테두리', 'border radius', 'rounded', '둥근'],
  },

  // Section Heading System
  {
    title: 'Section Heading System',
    description: '섹션 제목 시스템 컴포넌트입니다.',
    href: '/components/section-heading-system',
    category: 'components',
    keywords: ['섹션 제목', 'section heading', 'heading system', '제목 시스템'],
  },

  // Templates
  {
    title: 'Templates',
    description: '템플릿 페이지입니다.',
    href: '/templates',
    category: 'templates',
    keywords: ['템플릿', 'templates', 'examples', '예제'],
  },
  {
    title: 'Basic Layout',
    description: '기본 레이아웃 템플릿입니다.',
    href: '/templates/basic-layout',
    category: 'templates',
    keywords: ['기본 레이아웃', 'basic layout', 'template', '템플릿'],
  },

  // Community
  {
    title: 'Community',
    description: '커뮤니티 페이지입니다.',
    href: '/community',
    category: 'community',
    keywords: ['커뮤니티', 'community', 'discord', 'github', 'support'],
  },

  // Showcase
  {
    title: 'Showcase',
    description: 'HANUI를 사용한 프로젝트 쇼케이스입니다.',
    href: '/showcase',
    category: 'showcase',
    keywords: ['쇼케이스', 'showcase', 'examples', '예제', 'projects'],
  },
];

export function searchDocumentation(query: string): SearchItem[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();

  return searchData
    .map((item) => {
      let score = 0;

      // Title exact match (highest priority)
      if (item.title.toLowerCase() === normalizedQuery) {
        score += 100;
      }
      // Title starts with query
      else if (item.title.toLowerCase().startsWith(normalizedQuery)) {
        score += 50;
      }
      // Title contains query
      else if (item.title.toLowerCase().includes(normalizedQuery)) {
        score += 30;
      }

      // Description contains query
      if (item.description?.toLowerCase().includes(normalizedQuery)) {
        score += 20;
      }

      // Keywords match
      if (item.keywords) {
        item.keywords.forEach((keyword) => {
          if (keyword.toLowerCase() === normalizedQuery) {
            score += 40;
          } else if (keyword.toLowerCase().includes(normalizedQuery)) {
            score += 15;
          }
        });
      }

      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}
