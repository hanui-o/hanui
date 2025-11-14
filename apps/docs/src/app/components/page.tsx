import Link from 'next/link';
import { Stack } from '@hanui/react';

const components = [
  {
    name: 'Button',
    href: '/components/button',
    updated: true,
  },
  {
    name: 'Input',
    href: '/components/input',
    updated: true,
  },
  {
    name: 'Select',
    href: '/components/select',
    updated: true,
  },
  {
    name: 'Card',
    href: '/components/card',
    updated: false,
  },
  {
    name: 'Table',
    href: '/components/table',
    updated: false,
  },
  {
    name: 'Modal',
    href: '/components/modal',
    updated: false,
  },
  {
    name: 'Breadcrumb',
    href: '/components/breadcrumb',
    updated: false,
  },
  {
    name: 'Pagination',
    href: '/components/pagination',
    updated: false,
  },
  {
    name: 'File Upload',
    href: '/components/file-upload',
    updated: false,
  },
];

const layoutComponents = [
  {
    name: 'Container',
    href: '/layout/container',
    updated: true,
  },
  {
    name: 'Box',
    href: '/layout/box',
    updated: true,
  },
  {
    name: 'Stack',
    href: '/layout/stack',
    updated: true,
  },
  {
    name: 'Section',
    href: '/layout/section',
    updated: true,
  },
];

const typographyComponents = [
  {
    name: 'Display',
    href: '/typography/display',
    updated: true,
  },
  {
    name: 'Heading',
    href: '/typography/heading',
    updated: true,
  },
  {
    name: 'Body',
    href: '/typography/body',
    updated: true,
  },
  {
    name: 'Label',
    href: '/typography/label',
    updated: true,
  },
  {
    name: 'NavText',
    href: '/typography/navtext',
    updated: true,
  },
];

export default function ComponentsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pb-32 relative">
      <Stack spacing="section">
        {/* Header */}
        <Stack spacing="heading-content">
          <h1 className="text-4xl font-bold">Components (컴포넌트)</h1>
          <p className="text-base text-gray-600 dark:text-gray-400">
            HANUI 라이브러리에서 제공하는 모든 컴포넌트를 확인할 수 있습니다. 더
            많은 컴포넌트를 추가하고 있습니다.
          </p>
        </Stack>

        {/* Typography Section */}
        <Stack spacing="heading-content">
          <h2 className="text-2xl font-semibold">타이포그래피</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {typographyComponents.map((component) => (
              <Link
                key={component.name}
                href={component.href}
                className="relative block rounded-lg transition-all group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base font-medium text-gray-900 dark:text-gray-100 group-hover:underline transition-all">
                    {component.name}
                  </span>
                  {component.updated && (
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                  )}
                </div>
              </Link>
            ))}
          </div>
        </Stack>

        {/* Layout Section */}
        <Stack spacing="heading-content">
          <h2 className="text-2xl font-semibold">레이아웃</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {layoutComponents.map((component) => (
              <Link
                key={component.name}
                href={component.href}
                className="relative block rounded-lg transition-all group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base font-medium text-gray-900 dark:text-gray-100 group-hover:underline transition-all">
                    {component.name}
                  </span>
                  {component.updated && (
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                  )}
                </div>
              </Link>
            ))}
          </div>
        </Stack>

        {/* Components Section */}
        <Stack spacing="heading-content">
          <h2 className="text-2xl font-semibold">Components</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {components.map((component) => (
              <Link
                key={component.name}
                href={component.href}
                className="relative block rounded-lg transition-all group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base font-medium text-gray-900 dark:text-gray-100 group-hover:underline transition-all">
                    {component.name}
                  </span>
                  {component.updated && (
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                  )}
                </div>
              </Link>
            ))}
          </div>
        </Stack>
      </Stack>
    </div>
  );
}
