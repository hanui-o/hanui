import Link from 'next/link';

const components = [
  {
    name: 'Button',
    description: '다양한 스타일과 크기를 지원하는 버튼 컴포넌트',
    href: '/components/button',
    icon: '🔘',
  },
  {
    name: 'Input',
    description: '폼 입력 필드와 유효성 검사',
    href: '/components/input',
    icon: '📝',
  },
  {
    name: 'Card',
    description: '콘텐츠 카드 컨테이너',
    href: '/components/card',
    icon: '🗂️',
  },
  {
    name: 'Table',
    description: '정렬과 페이징을 지원하는 데이터 테이블',
    href: '/components/table',
    icon: '📊',
  },
  {
    name: 'Pagination',
    description: '페이지 네비게이션 컴포넌트',
    href: '/components/pagination',
    icon: '📄',
  },
  {
    name: 'Breadcrumb',
    description: '네비게이션 경로 표시',
    href: '/components/breadcrumb',
    icon: '🔗',
  },
  {
    name: 'Modal',
    description: '모달 다이얼로그',
    href: '/components/modal',
    icon: '🪟',
  },
  {
    name: 'Select',
    description: '드롭다운 선택 컴포넌트',
    href: '/components/select',
    icon: '▼',
  },
  {
    name: 'FileUpload',
    description: '드래그 앤 드롭 파일 업로드',
    href: '/components/fileupload',
    icon: '📎',
  },
];

export default function ComponentsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Components</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          KRDS를 준수하는 재사용 가능한 컴포넌트 라이브러리
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {components.map((component) => (
          <Link
            key={component.name}
            href={component.href}
            className="group block p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{component.icon}</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-[#256ef4] transition-colors">
                  {component.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {component.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
